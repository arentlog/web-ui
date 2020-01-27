'use strict';

app.config(function ($stateProvider, StateProvider, OeLineDetailsStateProvider, OeCreditCardDetailsStateProvider, BinAllocationStateProvider) {
   StateProvider.addInquiryBaseState('oe', 'oeio', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('oe', 'oeio', { params: { keyword: undefined } });
   OeLineDetailsStateProvider.addStates('oe', 'oeio', 'oeio.detail');
   OeCreditCardDetailsStateProvider.addStates('oe', 'oeio', 'oeio.detail');

   $stateProvider.state('oeio.detail', {
      url: '/detail?id&{pk:int}&{pk2:int}',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeio/detail.json');
            },
            controller: 'OeioDetailCtrl as dtl'
         }
      },
      resolve: {
         accessTest: function ($q, $stateParams, DataService, MessageService, TabService) {
            var deferred = $q.defer();
            if ($stateParams.pk) {
               var crit = {
                  tablename: 'oeeh',
                  orderno: $stateParams.pk,
                  ordersuf: $stateParams.pk2
               };

               DataService.post('/web/api/shared/checkhyperlinkaccess', { data: crit, busy: true }, function (data) {
                  if (data.success) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                     MessageService.error('global.error', 'global.security.violations.hyperlink');
                     TabService.closeTab('oeio');
                  }
               });
            } else {
               // If no pk param passed (probably means we are using rowid from the grid), then bypass the check
               deferred.resolve();
            }
            return deferred.promise;
         }
      }
   });

   BinAllocationStateProvider.addStates('oe', 'oeio', 'oeio.detail.line.kitComponentDetail');
});

app.controller('OeioBaseCtrl', function ($state, AodataService, ConfigService, DataService, Sasoo, Utils) {
   var self = this;
   self.criteria = {};
   self.sasoo = Sasoo;

   self.isAOSalesWhseOn = AodataService.getValue("OE", "OESalesWarehouse").toLowerCase() === 'yes';
   self.isLSPMexicoOn = AodataService.getValue("Locally", "LocallyMexicoFl").toLowerCase() === 'yes';
   self.isOrderFulfillmentOn = AodataService.getValue("OE", "OEOrderFulfillment").toLowerCase() === 'yes';

   // Check if National Programs is turned on
   self.isNationalProgramsOn = AodataService.getValue('PD', 'PDNationalProgramsFl').toLowerCase() === 'yes';

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'oeio',
      rowIdField: 'rowID',
      stateRef: 'oeio.detail',
      title: { label: 'global.order.number', valueFunction: 'base.getFullOrderNumber' },
      description: [{ label: 'global.warehouse', value: 'whse' }, { label: 'global.division', value: 'divno' }]
   };

   // Default to header search for grid column layout
   self.isHeaderSearch = true;
   self.isLineSearch = false;
   self.isKitSearch = false;
   self.isKitAllSearch = false;
   self.isTallySearch = false;
   self.isCoreSearch = false;
   self.isSubmitSearch = false;

   self.isMaster = function () {
      return $state.is('oeio.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeio.master');
   };

   self.isDetail = function () {
      return $state.is('oeio.detail');
   };

   self.includesDetail = function () {
      return $state.includes('oeio.detail');
   };

   /**
    * Return the formatted order number and suffix
    */
   self.getFullOrderNumber = function (oeeh) {
      if (oeeh) {
         return oeeh.orderno + '-' + Utils.pad(oeeh.ordersuf, 2);
      } else {
         return '';
      }
   };

   /**
    * Initialize the search criteria object
    */
   self.initCriteria = function () {
      // Add default record limit to specified field on criteria
      self.criteria.MaxResults = ConfigService.getDefaultRecordLimit();
   };

   /**
    * Perform basic search and update data set for the grid
    */
   self.search = function () {

      if (self.criteria.orderNumber) {
         // Find specific Order # when provided and navigate to detail view
         var orderDetails = self.criteria.orderNumber.split('-');
         var params = {
            orderno: orderDetails[0],
            ordersuf: orderDetails[1],
            fillmode: false
         };

         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               $state.go('oeio.detail', { pk: data.orderno, pk2: data.ordersuf });
            }
         });
      } else {
         // Otherwise search and build grid (header layout)
         self.isHeaderSearch = true;
         self.isLineSearch = false;
         self.isKitSearch = false;
         self.isKitAllSearch = false;
         self.isTallySearch = false;
         self.isCoreSearch = false;
         self.isSubmitSearch = false;

         var simpleCriteria = {
            iBatchSize: self.criteria.MaxResults,
            cSearchString: self.criteria.keyword ? self.criteria.keyword : ''
         };

         DataService.post('api/oe/asoeheader/oeiosimplesearchlist', { data: simpleCriteria, busy: true }, function (data) {
            if (data) {
               self.dataset = data.oeiohdrlistresults;
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('OeioSearchCtrl', function ($scope, $state, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeio.master');
      }

      // Get data
      base.search();
   };
});

app.controller('OeioMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, Utils, UtilsData, MessageService) {
   var self = this;
   var base = $scope.base;
   var DISPLAYTYPE_HEADER = '1';
   var DISPLAYTYPE_LINE = '2';
   var LINETYPE_ALL = 'All';
   var PRODUCTTYPE_ON_ORDERS_ONLY = 'O';
   var PRODUCTTYPE_AS_KIT_COMPONENT = 'K';
   var PRODUCTTYPE_ALL_ORDERS_AND_KIT_COMPONENTS = 'A';
   var PRODUCTTYPE_AS_TALLY_COMPONENT = 'T';
   var PRODUCTTYPE_AS_IMPLIED_CORE = 'C';
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('oe', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   // Advanced search criteria object with initial values
   self.advCriteria = {
      botype: '',
      coresmonths: 12,
      coresselect: 'O',
      display: DISPLAYTYPE_HEADER,
      displayDisabled: false,
      orderdisp: 'A',
      prodstat: LINETYPE_ALL,
      prodtype: PRODUCTTYPE_ON_ORDERS_ONLY,
      stage: [],
      transtype: [''],
      wtbilled: '',
      recordlimit: ConfigService.getDefaultRecordLimit(),
      whse: base.sasoo.homewhsefl ? base.sasoo.whse : ''
   };

   // List of available search criteria fields
   self.criteriaList = [
      // The cores fields ('coresselect', 'coresmonths' and 'coreszerolines') are displayed with prodtype
      // when set to implied cores and thus are not listed separately here
      { value: 'approvty', label: MessageService.get('global.approval') },
      { value: 'botype', label: MessageService.get('global.backorder.filter') },
      { value: 'custno', label: MessageService.get('global.customer.number') },
      { value: 'custpo', label: MessageService.get('global.purchase.order') },
      { value: 'divno', label: MessageService.get('global.division') },
      { value: 'doonlyflag', label: MessageService.get('global.show.only.direct.order.lines') },
      { value: 'fromentered', label: MessageService.get('global.entered.from') },
      { value: 'frominvoiced', label: MessageService.get('global.invoiced.from') },
      { value: 'frompromised', label: MessageService.get('global.promised.from') },
      { value: 'fromreqship', label: MessageService.get('global.requested.ship.from') },
      { value: 'fromshipped', label: MessageService.get('global.shipped.from') },
      { value: 'frtoutreqonlyfl', label: MessageService.get('global.freight.out.required.only') },
      { value: 'orderdisp', label: MessageService.get('global.disposition') },
      { value: 'prod', label: MessageService.get('global.product') },
      { value: 'recordlimit', label: MessageService.get('global.record.limit') },
      { value: 'refer', label: MessageService.get('global.reference') },
      { value: 'shipto', label: MessageService.get('global.ship.to') },
      { value: 'slsrepin', label: MessageService.get('global.sales.rep.internal') },
      { value: 'slsrepout', label: MessageService.get('global.sales.rep.external') },
      { value: 'stage', label: MessageService.get('global.stage') },
      { value: 'susponlyfl', label: MessageService.get('global.suspended.only') },
      { value: 'takenby', label: MessageService.get('global.taken.by') },
      { value: 'toentered', label: MessageService.get('global.entered.to') },
      { value: 'toinvoiced', label: MessageService.get('global.invoiced.to') },
      { value: 'topromised', label: MessageService.get('global.promised.to') },
      { value: 'toreqship', label: MessageService.get('global.requested.ship.to') },
      { value: 'toshipped', label: MessageService.get('global.shipped.to') },
      { value: 'trackerno', label: MessageService.get('global.tracker.number') },
      { value: 'transtype', label: MessageService.get('global.transaction.types') },
      { value: 'whse', label: MessageService.get('global.warehouse') },
      { value: 'wtbilled', label: MessageService.get('wt.billed.orders') },
      { value: 'fromccsubmitd', label: MessageService.get('global.from.submit.date') },
      { value: 'toccsubmitd', label: MessageService.get('global.to.submit.date') },
      // The following are only used in line detail searches
      { value: 'certcode', label: MessageService.get('global.certificate.license.id') },
      { value: 'custreserveovrfl', label: MessageService.get('global.customer.reservations.override.only') },
      { value: 'prodstat', label: MessageService.get('global.line.type') },
      { value: 'prodtype', label: MessageService.get('global.product.type') },
      { value: 'restrictcd', label: MessageService.get('global.restriction.code') },
      { value: 'restrictovrfl', label: MessageService.get('global.restriction.override.only') },
      { value: 'custreservecontractno', label: MessageService.get('global.customer.reservations.contract') },
      { value: 'display', label: MessageService.get('global.display') }
   ];

   // Add Sales Whse if AO Setting is set to Allow
   if (base.isAOSalesWhseOn) {
      self.criteriaList.push({ value: 'saleswhse', label: MessageService.get('global.sales.warehouse') });
   }

   // Add Order Fulfillment if AO Setting is set to Allow
   if (base.isOrderFulfillmentOn) {
      self.criteriaList.push({ value: 'fulfillmentordty', label: MessageService.get('global.fulfillment.order') });
      self.criteriaList.push({ value: 'fulfillmenttiedty', label: MessageService.get('global.fulfillment.tied.order') });
   }

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['custno', 'whse'];

   /**
    * Component hyperlink
    */
   self.compHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.compprod) {
         $state.go('icip.detail', { pk: currentRow.compprod });
      }
   };

   /**
    * Customer hyperlink
    */
   self.custHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   // OEIF - Order Fulfillment hyperlink
   self.fulfillmentHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderno && currentRow.fulfillmentordfl) {
         $state.go('oeif.master', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
      }
   };

   // OEIF - Tied Order Fulfillment hyperlink
   self.fulfillmentTiedHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderno && currentRow.fulfillmenttiedfl) {
         $state.go('oeif.master', { pk3: currentRow.orderno, pk4: currentRow.ordersuf });
      }
   };

   /**
    * Drill down to detail
    */
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { pk: record.orderno, pk2: record.ordersuf });
   };

   /**
    * Entered From date changed
    */
   self.fromenteredChanged = function () {
      if (!self.advCriteria.toentered) {
         self.advCriteria.toentered = self.advCriteria.fromentered;
      }
   };

   /**
    * Invoiced From date changed
    */
   self.frominvoicedChanged = function () {
      if (!self.advCriteria.toinvoiced) {
         self.advCriteria.toinvoiced = self.advCriteria.frominvoiced;
      }
   };

   /**
    * Promised From date changed
    */
   self.frompromisedChanged = function () {
      if (!self.advCriteria.topromised) {
         self.advCriteria.topromised = self.advCriteria.frompromised;
      }
   };

   /**
    * Requested Ship From date changed
    */
   self.fromreqshipChanged = function () {
      if (!self.advCriteria.toreqship) {
         self.advCriteria.toreqship = self.advCriteria.fromreqship;
      }
   };

   /**
    * Shipped From date changed
    */
   self.fromshippedChanged = function () {
      if (!self.advCriteria.toshipped) {
         self.advCriteria.toshipped = self.advCriteria.fromshipped;
      }
   };

   /**
   * Entered Submit date changed
   */
   self.fromccsubmitdChanged = function () {
      if (!self.advCriteria.toccsubmitd) {
         self.advCriteria.toccsubmitd = self.advCriteria.fromccsubmitd;
      }
   };


   /**
    * Product hyperlink
    */
   self.prodHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod });
      }
   };

   /**
    * Product Type date changed
    */
   self.prodtypeChanged = function () {
      if (self.advCriteria.prodtype.toUpperCase() === 'T' || self.advCriteria.prodtype.toUpperCase() === 'C') {
         self.advCriteria.prodstat = LINETYPE_ALL;
      }
      self.setDisplayType();
   };

   /**
    * Perform advanced search and update data set for the grid
    */
   self.search = function () {
      var criteria = angular.copy(self.advCriteria);

      // Apply record limit (if cleared by user)
      if (!criteria.recordlimit) {
         criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      // Load list of selected stages
      criteria.stagelist = criteria.stage ? criteria.stage.toString() : '';
      delete criteria.stage;

      // Load list of selected transaction types
      criteria.transtypelist = criteria.transtype ? criteria.transtype.toString() : '';
      delete criteria.transtype;

      // Some of the search criteria use different property names.  Add them to the object
      // so they will be mapped propertly.
      criteria.irecordcountlimit = criteria.recordlimit;
      criteria.doonlyfl = criteria.doonlyflag;

      // DES NEW TEST BEGIN

      // Require other criteria for select fields - otherwise will time out
      if ((criteria.certcode || criteria.custreserveovrfl || criteria.custreservecontractno || criteria.restrictcd || criteria.restrictovrfl) &&
         (!criteria.approvty &&
            !criteria.botype &&
            !criteria.custno &&
            (!criteria.display || criteria.display === '1' || !criteria.displayDisabled) &&
            (!criteria.orderdisp || criteria.orderdisp === 'A') &&
            !criteria.divno &&
            !criteria.fromentered &&
            !criteria.toentered &&
            !criteria.frtoutreqonlyfl &&
            !criteria.fulfillmentordfl &&
            !criteria.fulfillmenttiedfl &&
            !criteria.frominvoiced &&
            !criteria.toinvoiced &&
            !criteria.lineType &&
            !criteria.prod &&
            (!criteria.prodtype || criteria.prodtype === 'O') &&
            !criteria.frompromised &&
            !criteria.topromised &&
            !criteria.custpo &&
            //            !criteria.recordlimit &&
            !criteria.refer &&
            !criteria.fromreqship &&
            !criteria.toreqship &&
            !criteria.slsrepout &&
            !criteria.slsrepin &&
            !criteria.saleswhse &&
            !criteria.shipto &&
            !criteria.fromshipped &&
            !criteria.toshipped &&
            !criteria.doonlyfl &&
            !criteria.stagelist &&
            !criteria.fromccsubmitd &&
            !criteria.toccsubmitd &&
            !criteria.susponlyfl &&
            !criteria.takenby &&
            !criteria.trackerno &&
            !criteria.transtypelist &&
            !criteria.whse &&
            !criteria.wtbilled)) {
         MessageService.error('global.error', 'message.insufficient.search.criteria.selected');
         return;
      }

      // DES NEW TEST END

      // Determine which search will be performed based on the entered criteria
      base.isHeaderSearch = false;
      base.isLineSearch = false;
      base.isKitSearch = false;
      base.isKitAllSearch = false;
      base.isTallySearch = false;
      base.isCoreSearch = false;
      base.isSubmitSearch = false;

      if (criteria.trackerno) {
         base.isHeaderSearch = true;
      } else if (criteria.fromccsubmitd || criteria.toccsubmitd) {
         base.isHeaderSearch = true;
         base.isSubmitSearch = true;
      } else if (criteria.prodtype.toUpperCase() === PRODUCTTYPE_ON_ORDERS_ONLY && criteria.prod) {
         base.isLineSearch = true;
      } else if (criteria.prodtype.toUpperCase() === PRODUCTTYPE_AS_KIT_COMPONENT && criteria.prod) {
         base.isKitSearch = true;
      } else if (criteria.prodtype.toUpperCase() === PRODUCTTYPE_ALL_ORDERS_AND_KIT_COMPONENTS && criteria.prod) {
         base.isKitAllSearch = true;
      } else if (criteria.prodtype.toUpperCase() === PRODUCTTYPE_AS_TALLY_COMPONENT && criteria.prod) {
         base.isTallySearch = true;
      } else if (criteria.prodtype.toUpperCase() === PRODUCTTYPE_AS_IMPLIED_CORE && criteria.prod) {
         base.isCoreSearch = true;
      } else if (criteria.restrictcd || criteria.restrictovrfl || criteria.certcode) {
         base.isLineSearch = true;
      } else if (criteria.display === DISPLAYTYPE_LINE) {
         base.isLineSearch = true;
      } else {
         base.isHeaderSearch = true;
      }

      if (base.isLineSearch) {
         DataService.post('api/oe/oeel/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.loadoeelttresults;
            }
         });
      } else if (base.isKitSearch) {
         DataService.post('api/oe/asoeinquiry/loadoeelktt', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.loadoeelkttresults;
            }
         });
      } else if (base.isKitAllSearch) {
         DataService.post('api/oe/asoeinquiry/loadoeelalltt', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.loadoeelallttresults;
            }
         });
      } else if (base.isTallySearch) {
         DataService.post('api/oe/asoeinquiry/loadoeelmtt', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.loadoeelmttresults;
            }
         });
      } else if (base.isCoreSearch) {
         DataService.post('api/oe/asoeinquiry/corescreateimpliedcorestt', { data: criteria, busy: true }, function (data) {
            if (data) {
               data.crtimplcoresttresults.forEach(function (record) {
                  record.oenotesfl = record.ordernotesfl;
                  record.shipprod = record.prod;
               });
               base.dataset = data.crtimplcoresttresults;
            }
         });
      } else {
         // Header/default search
         DataService.post('api/oe/asoeheader/oeioheaderlistfetch', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.oeiohdrlistresults;
            }
         });
      }
   };

   /**
    * Defaults the Display Type based on entered criteria and enables/disables
    */
   self.setDisplayType = function () {
      var lineType = self.advCriteria.prodtype.toUpperCase() === 'T' || self.advCriteria.prodtype.toUpperCase() === 'C' ? false : true;

      if (self.advCriteria.trackerno) {
         self.advCriteria.display = DISPLAYTYPE_HEADER;
         self.advCriteria.displayDisabled = true;
      } else if (self.advCriteria.prod) {
         self.advCriteria.display = DISPLAYTYPE_LINE;
         self.advCriteria.displayDisabled = true;
      } else if (self.advCriteria.prodstat !== LINETYPE_ALL && lineType) {
         self.advCriteria.display = DISPLAYTYPE_LINE;
         self.advCriteria.displayDisabled = true;
      } else {
         self.advCriteria.display = DISPLAYTYPE_HEADER;
         self.advCriteria.displayDisabled = false;
      }
   };

   /**
    * Ship To hyperlink
    */
   self.shipToHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };

   /**
    * Trans Type list changed
    */
   self.transtypeChanged = function () {
      // Reset to <All> when nothing checked
      if (self.advCriteria.transtype && !self.advCriteria.transtype.length) {
         self.advCriteria.transtype = [''];
      }
   };

   self.setDisplayType();

   if ($stateParams.keyword) {
      base.criteria.keyword = $stateParams.keyword;
      base.criteria.orderNumber = '';
      base.search();
   }

});

app.controller('OeioDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, MruService, Utils, SecurityService) {
   var self = this;
   var base = $scope.base;
   var orderNo = $stateParams.pk || 0;
   var orderSuf = $stateParams.pk2 || 0;
   self.isLineDetailsTabReadonly = SecurityService.getSubSecurityLevel('oeio', 'Line Details') < 3;

   // Get oeeh record (handle both id param and pk params)
   // Set fillmode to retrieve ARSC/ARSS records
   if ($stateParams.id) {
      self.oeeh = DataService.getResource('api/oe/oeeh/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      base.criteria.orderNumber = orderNo + '-' + Utils.pad(orderSuf, 2);

      var params = {
         orderno: orderNo,
         ordersuf: orderSuf,
         fillmode: true
      };

      self.oeeh = DataService.getResource('api/oe/oeeh/getbypk', { params: params, busy: true });
   }

   self.oeeh.$promise.then(function () {
      if (self.oeeh) {
         self.arsc = self.oeeh.arsces;
         self.arss = self.oeeh.arsses;
         self.subTitle = MessageService.get('global.order.number') + ': ' + base.getFullOrderNumber(self.oeeh);
         var fullOrderNo = self.oeeh.orderno + '-' + Utils.pad(self.oeeh.ordersuf, 2);
         MruService.addToList('OEOrder', self.oeeh.rowpointer, fullOrderNo, self.oeeh.orderno, self.oeeh.ordersuf);

         //Hide-Unhide the WL Tab
         var params = { whse: self.oeeh.whse, fillmode: true, fldlist: 'wlloc' };
         DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
            if (data) {
               self.wlTabVisible = data.wlloc ? true : false;
            }
         });

         //User Hook (do not rename)
         if (self.oeehPromiseContinue) {
            self.oeehPromiseContinue();
         }

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.oeeh);
      }
   });

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: self.oeeh.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: self.oeeh.whse }, { reload: 'icia.detail' });
      }
   };
});

app.controller('OeioDetailHeaderCtrl', function ($scope, $state, AodataService, DataService, Utils, MessageService) {
   var self = this;
   var dtl = $scope.dtl;

   dtl.oeeh.$promise.then(function () {
      var params;

      // Check if ISM is live
      self.isIsmLive = AodataService.getValue("SM", "ismlive");

      // Check for ISM logical ID
      self.ismLogicalId = AodataService.getValue("SM", "ismlogicalid");
      if (self.ismLogicalId && self.ismLogicalId.trim().substr(0, 6) !== 'lid://') {
         self.ismLogicalId = 'lid://' + self.ismLogicalId;
      }

      // Load Divno Description
      if (dtl.oeeh.divno) {
         params = {
            codeiden: 'V',
            codeval: dtl.oeeh.divno,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sastn/getbypk', { params: params }, function (data) {
            if (data) {
               self.divNoDescription = data.descrip;
            }
         });
      }

      // Load Freight Terms Description
      if (dtl.oeeh.frttermscd) {
         params = {
            codeiden: 'FT',
            codeval: dtl.oeeh.frttermscd,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: params }, function (data) {
            if (data) {
               self.freightTermsDescription = data.descrip;
            }
         });
      }

      // Load Origin Code Description
      if (dtl.oeeh.origincd) {
         params = {
            codeiden: 'OO',
            codeval: dtl.oeeh.origincd,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: params }, function (data) {
            if (data) {
               self.originCodeDescription = data.descrip;
            }
         });
      }

      // Load Ship Via Description
      if (dtl.oeeh.shipviaty) {
         params = {
            codeiden: 'S',
            codeval: dtl.oeeh.shipviaty,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: params }, function (data) {
            if (data) {
               self.shipViaDescription = data.descrip;
            }
         });
      }

      // Load Contact Name
      if (dtl.oeeh.contactid) {
         params = {
            contactid: dtl.oeeh.contactid,
            fldlist: 'firstnm,lastnm'
         };
         DataService.get('api/shared/contacts/getbypk', { params: params }, function (data) {
            if (data) {
               self.contactName = data.firstnm + ' ' + data.lastnm;
            }
         });
      }

      // Load Floorplan Customer Name
      if (dtl.oeeh.fpcustno) {
         self.floorPlan = dtl.oeeh.fpcustno;
         params = {
            custno: dtl.oeeh.fpcustno,
            fldlist: 'name',
            fillmode: false
         };
         DataService.get('api/ar/arsc/getbypk', { params: params }, function (data) {
            if (data) {
               self.floorPlan += ' - ' + data.name;
            }
         });
      }

      // Only display the first 24 characters of transfer location
      self.transferLocDisp = dtl.oeeh.transferloc.length > 24 ? dtl.oeeh.transferloc.substring(0, 24) : dtl.oeeh.transferloc;
      self.fullOriginOrderNumber = dtl.oeeh.originorderno + '-' + Utils.pad(dtl.oeeh.originordersuf, 2);
      self.isDocumentPrinted = dtl.oeeh.dlvcnt !== 0;
      self.jmJobId = dtl.oeeh.jmjobid ? dtl.oeeh.jmjobid + '-' + Utils.pad(dtl.oeeh.jmjobrevno, 3) : '';

      if (dtl.arss) {
         self.phoneNo = dtl.arss.phoneno;
         self.agentPhone = dtl.arss.pophoneno;
      } else if (dtl.arsc) {
         self.phoneNo = dtl.arsc.phoneno;
         self.agentPhone = dtl.arsc.pophoneno;
      }

      if (dtl.oeeh.updtype.toLowerCase() === 's') {
         self.errorMessage = MessageService.get('global.suspended');
      }
      else if (dtl.oeeh.autoaltwhsefl) {
         self.errorMessage = MessageService.get('wt.billed');
      }
      else {
         self.errorMessage = '';
      }

      // Load Tendering History
      //TODO: cm; Should only be visible and loaded when history exists
      DataService.post('api/oe/asoeinquiry/oetenderhistory', {
         data: {
            orderno: dtl.oeeh.orderno,
            ordersuf: dtl.oeeh.ordersuf
         },
         busy: true
      }, function (data) {
         if (data) {
            self.oetenderhistoryresults = data.oetenderhistoryresults;
            self.oetenderhistorysingle = data.oetenderhistorysingle;
         }
      });

      // Load Original Credit Card History
      var requestCriteria = {
         ttbloeirccorighistcriteria: {
            orderno: dtl.oeeh.orderno,
            ordersuf: dtl.oeeh.ordersuf
         }
      };
      DataService.post('/web/api/oe/oeirccorighist', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            self.ccorighistresults = data.ttbloeirccorighistresults;
         }
      });
   });

   // When the service order # is clicked on the screen, go directly to the service order in ISM
   self.redirectToIsm = function () {
      if (dtl.oeeh.servicekey) {
         if (dtl.oeeh.ordersource === 'ServiceOrder') {
            var href = '?LogicalId=' + self.ismLogicalId.trim() + '&page=formonly&form=ServiceOrders(FILTER(SroNum%3D%27' + dtl.oeeh.servicekey.trim() + '%27)SETVARVALUES(InitialCommand%3DRefresh))';
            infor.companyon.client.sendPrepareDrillbackMessage(href);
         } else {
            var href = '?LogicalId=' + self.ismLogicalId.trim() + '&page=formonly&form=Contracts(FILTER(Contract%3D%27' + dtl.oeeh.servicekey.trim() + '%27)SETVARVALUES(InitialCommand%3DRefresh))';
            infor.companyon.client.sendPrepareDrillbackMessage(href);
         }
      }
   };

   // Order Fulfillment hyperlink
   self.fulfillmentHyperlink = function () {
      if (dtl.oeeh.orderno && dtl.oeeh.fulfillmentordfl) {
         $state.go('oeif.master', { pk: dtl.oeeh.orderno, pk2: dtl.oeeh.ordersuf });
      }
   };

   // Tied Order Fulfillment hyperlink
   self.fulfillmentTiedHyperlink = function () {
      if (dtl.oeeh.orderno && dtl.oeeh.fulfillmenttiedfl) {
         $state.go('oeif.master', { pk3: dtl.oeeh.orderno, pk4: dtl.oeeh.ordersuf });
      }
   };

   // Drill down
   self.origccdrilldown = function (e, args) {
      var record = args[0].item;

      if (record) {
         // Drill down to card detail view
         $state.go('.card', { selectedCard: record, isEnabled: false, custno: dtl.oeeh.custno, shipto: dtl.oeeh.shipto });
      }
   };

});

app.controller('OeioDetailHistoryCtrl', function ($scope, $state, DataService) {
   var self = this;
   var dtl = $scope.dtl;

   dtl.oeeh.$promise.then(function () {
      // Load History
      var params = {
         iOrderNo: dtl.oeeh.orderno,
         iOrderSuf: dtl.oeeh.ordersuf
      };
      DataService.get('api/oe/asoeinquiry/oeioloadorderhistory/{iOrderNo}/{iOrderSuf}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   });

   /**
    * Ship To hyperlink
    */
   self.shipToHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };
});

app.controller('OeioDetailLineHistoryCtrl', function ($scope, $state, $translate, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var TIETYPE_KP = 'w';
   var TIETYPE_PO = 'p';
   var TIETYPE_VA = 'f';
   var TIETYPE_WT = 't';

   self.fromLineNo = 1;
   self.toLineNo = 999;

   dtl.oeeh.$promise.then(function () {
      self.loadLineHistory();
   });

   self.specnstypeConverter = function (row, cell, value) {
      switch (value.toLowerCase()) {
         case 'l':
            return $translate.instant('global.lost.business');
            break;
         case 'n':
            return $translate.instant('global.non.stock');
            break;
         case 's':
            return $translate.instant('global.special');
            break;
         default:
            return value.toUpperCase();
            break;
      }
   };

   /**
    * Loads line history data.  Called during initialization and from refresh.
    */
   self.loadLineHistory = function () {
      var criteria = {
         orderno: dtl.oeeh.orderno,
         fromlineno: self.fromLineNo,
         tolineno: self.toLineNo
      };

      // Load Line History
      DataService.post('api/oe/asoeinquiry/oeioloadlinehistory', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   /**
    * Order hyperlink
    */
   self.orderHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.orderaltno) {
         switch (currentRow.ordertype.toLowerCase()) {
            case TIETYPE_PO:
               $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case TIETYPE_WT:
               $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case TIETYPE_VA:
               $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;

            case TIETYPE_KP:
               $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: currentRow.orderaltsuf });
               break;
         }
      }
   };

   /**
    * Product hyperlink
    */
   self.prodHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: dtl.oeeh.whse });
      }
   };

   /**
    *  Refresh the grid based on new criteria
    */
   self.refresh = function () {
      self.loadLineHistory();
   };
});

app.controller('OeioDetailTaxesCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var GST = 'g';
   var VAT = 'v';

   self.isGSTorVAT = function () {
      if (self.detail) {
         return self.detail.cTaxMethodTy.toLowerCase() === GST || self.detail.cTaxMethodTy.toLowerCase() === VAT;
      } else {
         return false;
      }
   };

   dtl.oeeh.$promise.then(function () {
      // Load Tax detail
      var params = {
         iOrderNo: dtl.oeeh.orderno,
         iOrderSuf: dtl.oeeh.ordersuf
      };
      DataService.get('api/oe/asoeinquiry/oeioloadordertaxes/{iOrderNo}/{iOrderSuf}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            self.detail = data.oeioloadordtax;
            self.dataset3 = data.oeioloadordtaxar;
         }
      });

      // Load Taxes Grid
      //TODO: cm; May be able to combine the two 'taxes' grids and just hide columns when that becomes available
      var criteria = {
         orderno: dtl.oeeh.orderno,
         ordersuf: dtl.oeeh.ordersuf
      };
      DataService.post('api/oe/asoeinquiry/oeiocreatetaxdisplaytt', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   });
});

app.controller('OeioDetailTotalsCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   dtl.oeeh.$promise.then(function () {
      // Load Order Totals
      var params = {
         iOrderNo: dtl.oeeh.orderno,
         iOrderSuf: dtl.oeeh.ordersuf
      };
      DataService.get('api/oe/asoeinquiry/oeioloadordertotals/{iOrderNo}/{iOrderSuf}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            self.totals = data.oeioloadordtot;
            self.image = data.lcImgSig;
         }
      });

      if (base.isNationalProgramsOn) {
         self.npLinesVisible = dtl.oeeh.stagecd === 4 || dtl.oeeh.stagecd === 5;

         params = {
            orderno: dtl.oeeh.orderno,
            ordersuf: dtl.oeeh.ordersuf,
            calcsob: 'b',
            maint: false
         };
         DataService.post('api/oe/asoeinquiry/oecalculateordshptotals', { data: params, busy: true }, function (data) {
            if (data) {
               self.npLineCount = data.nplinecount;
               self.npTotShipAmt = data.nptotshipamt;
               self.npMarginVisible = data.nplinecount > 0;
            }
         });

         params = {
            orderno: dtl.oeeh.orderno,
            ordersuf: dtl.oeeh.ordersuf,
            nptotfl: true
         };
         DataService.post('api/oe/asoeinquiry/oecalcordermargin', { data: params, busy: true }, function (data) {
            if (data) {
               self.npMarginAmount = data.calcmargin;
               self.npMarginPercent = data.calcmarginpct;

               if (dtl.oeeh.transtype === 'rm') {
                  self.npMarginAmount = self.npMarginAmount * -1;
               }
            }
         });
      }
   });
});

app.controller('OeioDetailWarehouseLogisticsCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var ORDERTYPE_ORDER = 'o';

   dtl.oeeh.$promise.then(function () {
      var criteria = {
         orderno: dtl.oeeh.orderno,
         ordersuf: dtl.oeeh.ordersuf,
         seqno: 0,
         ordertype: ORDERTYPE_ORDER,
         whseview: dtl.oeeh.whse,
         customparam: ''
      };

      // Load WL Inquiry
      DataService.post('api/wl/aswlinquiry/loadwlinquiry', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.unavailableMessage = data.cUnavailableMessage;
            self.dataset = data.loadwlinqdtlresults;

            if (data.loadwlinqhdrresults) {
               self.wLHeader = data.loadwlinqhdrresults[0];
            }
            self.single = data.loadwlinqsingle;
         }
      });
   });
});

