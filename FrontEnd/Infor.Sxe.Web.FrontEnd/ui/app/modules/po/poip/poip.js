'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('po', 'poip', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('po', 'poip');

   $stateProvider.state('poip.detail', {
      url: '/detail?id&{pk:int}&{pk2:int}',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poip/detail.json');
            },
            controller: 'PoipDetailCtrl as dtl'
         }
      },
      resolve: {
         accessTest: function ($q, $stateParams, DataService, MessageService, TabService) {
            var deferred = $q.defer();
            if ($stateParams.pk) {
               var crit = {
                  tablename: 'poeh',
                  pono: $stateParams.pk,
                  posuf: $stateParams.pk2
               };

               DataService.post('/web/api/shared/checkhyperlinkaccess', { data: crit, busy: true }, function (data) {
                  if (data.success) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                     MessageService.error('global.error', 'global.security.violations.hyperlink');
                     TabService.closeTab('poip');
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

   $stateProvider.state('poip.quick-view', {
      url: '/quick-view',
      params: {
         callingState: null,
         poDrillDown: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/shared/quickview/quickview.json');
            },
            controller: 'PoQuickViewCtrl as qv'
         }
      }
   });

   //Sub View for the quick-view
   $stateProvider.state('poip.quick-view.line-details', {
      url: '/line-details',
      params: {
         poDrillDown: null,
         loadPoQuickViewResult: null
      },
      views: {
         quickViewLineDetails: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/shared/quickview/quickview-line-details.json');
            },
            controller: 'PoQuickViewLineDetailsCtrl as qvld'
         }
      }
   });

   $stateProvider.state('poip.detail.history', {
      url: '/history',
      params: { pono: null, posuf: null },
      views: {
         historyDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poip/tabs/history-vendor-detail.json');
            },
            controller: 'PoipDetailHistoryVendorDetialCtrl as pdhvc'
         }
      }
   });

   $stateProvider.state('poip.detail.linedetail', {
      url: '/line-detail',
      params: { pono: null, posuf: null, selectedLine: null, callBack: null },
      views: {
         lineDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poip/line-detail/line-detail.json');
            },
            controller: 'PoipLineDetailCtrl as pldc'
         }
      }
   });
});

app.controller('PoipBaseCtrl', function ($state, $translate, ConfigService, DataService, Utils, Sasoo) {
   var self = this;
   self.criteria = {};

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'poip',
      rowIdField: 'rowID',
      stateRef: 'poip.detail',
      title: { label: 'global.purchase.order.number', valueFunction: 'base.getFullPurchaseOrderNumber' },
      description: { label: 'global.stage', valueFunction: 'base.getStageDescription' }
   };

   self.isMaster = function () {
      return $state.is('poip.master');
   };

   self.includesMaster = function () {
      return $state.includes('poip.master');
   };

   self.isDetail = function () {
      return $state.is('poip.detail');
   };

   self.includesDetail = function () {
      return $state.includes('poip.detail');
   };

   self.canSeeCost = function () {
      return Sasoo.seecostfl;
   };

   /**
    * Return the formatted order number and suffix
    */
   self.getFullPurchaseOrderNumber = function (poeh) {
      if (poeh) {
         return poeh.pono + '-' + Utils.pad(poeh.posuf, 2);
      } else {
         return '';
      }
   };

   self.getStageDescription = function (poeh) {
      if (poeh.stagecd) {
         switch (poeh.stagecd) {
            case 1: //ignore jslint - correct indentation
               return $translate.instant('global.ordered'); //ignore jslint - correct indentation
            case 2: //ignore jslint - correct indentation
               return $translate.instant('global.printed'); //ignore jslint - correct indentation
            case 3: //ignore jslint - correct indentation
               return $translate.instant('global.acknowledged'); //ignore jslint - correct indentation
            case 4: //ignore jslint - correct indentation
               return $translate.instant('global.pre.receiving'); //ignore jslint - correct indentation
            case 5: //ignore jslint - correct indentation
               return $translate.instant('global.received'); //ignore jslint - correct indentation
            case 6: //ignore jslint - correct indentation
               return $translate.instant('global.costed'); //ignore jslint - correct indentation
            case 7: //ignore jslint - correct indentation
               return $translate.instant('global.closed'); //ignore jslint - correct indentation
            case 9: //ignore jslint - correct indentation
               return $translate.instant('global.cancelled'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return ''; //ignore jslint - correct indentation
         }
      } else {
         return poeh.stagecd === 0 ? $translate.instant('global.entered') : '';
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
      if (self.criteria.purchaseOrderNumber) {
         // Find specific Order # when provided and navigate to detail view
         var purchaseOrderDetails = self.criteria.purchaseOrderNumber.split('-');
         var params = {
            pono: purchaseOrderDetails[0],
            posuf: purchaseOrderDetails[1],
            fillmode: false
         };
         DataService.get('api/po/poeh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               $state.go('poip.detail', { id: data.rowID });
            }
         });
      } else {
         // Otherwise search and build grid (header layout)
         self.isSimpleSearch = true;
         self.isHeaderSearch = false;
         self.isSrvOrdProdSearch = false;
         self.isSrvOrdSearch = false;
         self.isComponentSearch = false;
         self.isCompProdSearch = false;
         self.isProductSearch = false;
         var simpleCriteria = {
            iBatchSize: self.criteria.MaxResults,
            cSearchString: self.criteria.keyword ? self.criteria.keyword : ''
         };
         DataService.post('api/po/aspoinquiry/poipsimplesearchlist', { data: simpleCriteria, busy: true }, function (data) {
            if (data) {
               self.dataset = data.poipbuildpolistresults;
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('PoipSearchCtrl', function ($scope, $state, Utils) {
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
         $state.go('poip.master');
      }
      // Get data
      base.search();
   };
});

app.controller('PoipMasterCtrl', function ($scope, $state, $translate, ConfigService, DataService, GridService, Sasoo) {
   var self = this;
   var base = $scope.base;
   var DISPLAYTYPE_HEADER = '1';
   var DISPLAYTYPE_LINE = '2';

   self.advCriteria = {
      podisplay: '1',
      displayDisabled: false,
      irecordcountlimit: ConfigService.getDefaultRecordLimit(),
      transtypelist: [],
      stagelist: [],
      botypelist: [],
      compselect: 'O',
      whse: Sasoo.homewhsefl ? Sasoo.whse : ''
   };

   self.criteriaList = [
      { value: 'vendno', label: $translate.instant('global.vendor.number') },
      { value: 'vendtype', label: $translate.instant('global.vendor.type') },
      { value: 'shipfmno', label: $translate.instant('global.ship.from') },
      { value: 'prod', label: $translate.instant('global.product') },
      { value: 'whse', label: $translate.instant('global.warehouse') },
      { value: 'rcvinit', label: $translate.instant('global.receiver.initials') },
      { value: 'receiverno', label: $translate.instant('global.receiver.number') },
      { value: 'approval', label: $translate.instant('global.approval') },
      { value: 'repairordno', label: $translate.instant('global.repair.number') },
      { value: 'trackno', label: $translate.instant('global.tracking.number') },
      { value: 'contno', label: $translate.instant('global.container.number') },
      { value: 'buyer', label: $translate.instant('global.buyer') },
      { value: 'fromcosteddt', label: $translate.instant('global.costed.from') },
      { value: 'tocosteddt', label: $translate.instant('global.costed.to') },
      { value: 'frompaiddt', label: $translate.instant('global.paid.from') },
      { value: 'topaiddt', label: $translate.instant('global.paid.to') },
      { value: 'fromduedt', label: $translate.instant('global.due.from') },
      { value: 'toduedt', label: $translate.instant('global.due.to') },
      { value: 'fromprinteddt', label: $translate.instant('global.printed.from') },
      { value: 'toprinteddt', label: $translate.instant('global.printed.to') },
      { value: 'fromenterdt', label: $translate.instant('global.enter.from') },
      { value: 'toenterdt', label: $translate.instant('global.enter.to') },
      { value: 'fromreceiptdt', label: $translate.instant('global.receipt.from') },
      { value: 'toreceiptdt', label: $translate.instant('global.receipt.to') },
      { value: 'fromorderdt', label: $translate.instant('global.order.from') },
      { value: 'toorderdt', label: $translate.instant('global.order.to') },
      { value: 'fromreqshipdt', label: $translate.instant('global.request.ship.from') },
      { value: 'toreqshipdt', label: $translate.instant('global.request.ship.to') },
      { value: 'transtypelist', label: $translate.instant('global.transaction.types') },
      { value: 'stagelist', label: $translate.instant('global.stage') },
      { value: 'botypelist', label: $translate.instant('global.back.order.filter') },
      { value: 'display', label: $translate.instant('global.display') },
      { value: 'compselect', label: $translate.instant('global.component.type') },
      { value: 'irecordcountlimit', label: $translate.instant('global.record.limit') }
   ];

   self.defaultSelectedCriteria = ['vendno', 'prod', 'whse'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { pk: record.pono, pk2: record.posuf });
   };

   self.onrepairOrderChange = function (args) {
      // Set or clear the suffix value
      self.advCriteria.repairordsuf = args.value2;
   };

   self.setDisplayType = function () {
      if (self.advCriteria.trackno) {
         self.advCriteria.podisplay = DISPLAYTYPE_LINE;
         self.advCriteria.displayDisabled = true;
      } else if (self.advCriteria.prod) {
         self.advCriteria.podisplay = DISPLAYTYPE_LINE;
         self.advCriteria.displayDisabled = true;
      } else {
         self.advCriteria.podisplay = DISPLAYTYPE_HEADER;
         self.advCriteria.displayDisabled = false;
      }
   };

   self.setDisplayType();

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var criteria = angular.copy(self.advCriteria);

      // Apply record limit (if cleared by user)
      if (!criteria.irecordcountlimit) {
         criteria.irecordcountlimit = ConfigService.getDefaultRecordLimit();
      }

      // Load list of selected stages
      criteria.stage = criteria.stagelist ? criteria.stagelist.toString() : '';
      delete criteria.stagelist;

      // Load list of selected transaction types
      criteria.transtype = criteria.transtypelist ? criteria.transtypelist.toString() : '';
      delete criteria.transtypelist;

      // Load list of selected bo types
      criteria.botype = criteria.botypelist ? criteria.botypelist.toString() : '';
      delete criteria.botypelist;

      base.isSimpleSearch = false;
      base.isHeaderSearch = false;
      base.isSrvOrdProdSearch = false;
      base.isSrvOrdSearch = false;
      base.isComponentSearch = false;
      base.isCompProdSearch = false;
      base.isProductSearch = false;

      if (criteria.podisplay === '1') { // display Header Info rather than Line Detail
         base.isHeaderSearch = true;
      } else if (criteria.podisplay === '2') {
         base.isHeaderSearch = false;
      }

      if (criteria.repairordno && criteria.prod) {
         base.isSrvOrdProdSearch = true;
      } else if (criteria.repairordno) {
         base.isSrvOrdSearch = true;
      } else if (criteria.compselect && criteria.compselect.toUpperCase() === 'T' && criteria.prod) {
         base.isComponentSearch = true;
      } else if (criteria.compselect && criteria.compselect.toUpperCase() === 'B' && !criteria.prod) {
         base.isCompProdSearch = true;
      } else if (criteria.prod || criteria.trackno || criteria.contno) {
         base.isProductSearch = true;
      }

      DataService.post('api/po/aspoinquiry/poipbuildpolist', { data: criteria, busy: true }, function (data) {
         base.dataset = data.poipbuildpolistresults;
      });
   };

   self.fromDateChange = function () {
      if (self.advCriteria.fromcosteddt && !self.advCriteria.tocosteddt) {
         self.advCriteria.tocosteddt = self.advCriteria.fromcosteddt;
      }

      if (self.advCriteria.fromduedt && !self.advCriteria.toduedt) {
         self.advCriteria.toduedt = self.advCriteria.fromduedt;
      }

      if (self.advCriteria.fromenterdt && !self.advCriteria.toenterdt) {
         self.advCriteria.toenterdt = self.advCriteria.fromenterdt;
      }

      if (self.advCriteria.fromorderdt && !self.advCriteria.toorderdt) {
         self.advCriteria.toorderdt = self.advCriteria.fromorderdt;
      }

      if (self.advCriteria.frompaiddt && !self.advCriteria.topaiddt) {
         self.advCriteria.topaiddt = self.advCriteria.frompaiddt;
      }

      if (self.advCriteria.fromprinteddt && !self.advCriteria.toprinteddt) {
         self.advCriteria.toprinteddt = self.advCriteria.fromprinteddt;
      }

      if (self.advCriteria.fromreceiptdt && !self.advCriteria.toreceiptdt) {
         self.advCriteria.toreceiptdt = self.advCriteria.fromreceiptdt;
      }

      if (self.advCriteria.fromreqshipdt && !self.advCriteria.toreqshipdt) {
         self.advCriteria.toreqshipdt = self.advCriteria.fromreqshipdt;
      }
   };

   self.onVendorInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.vendno, pk2: currentRow.shipfmno });
      }
   };

   self.launchQuickView = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      if (selectedRow) {
         $state.go('^.quick-view', { callingState: '^.master', poDrillDown: selectedRow });
      }
   };
});

app.controller('PoipDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, SecurityService) {
   var self = this;
   var base = $scope.base;

   self.isLineTabReadonly = SecurityService.getSubSecurityLevel('poip', 'Line Detail') < 3;

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.poeh = DataService.getResource('api/po/poeh/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         pono: $stateParams.pk,
         posuf: $stateParams.pk2,
         fillmode: true
      };
      base.criteria.purchaseOrderNumber = base.getFullPurchaseOrderNumber(params);
      self.poeh = DataService.getResource('api/po/poeh/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.poeh.$promise.then(function () {
      if (self.poeh) {
         self.subTitle = $translate.instant('global.purchase.order.number') + Constants.LABEL_DELIMITER + base.getFullPurchaseOrderNumber(self.poeh);

         //Hide-Unhide the WL Tab
         var params = { whse: self.poeh.whse, fillmode: true, fldlist: 'wlloc' };
         DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
            if (data) {
               self.wlTabVisible = data.wlloc ? true : false;
            }
         });

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.poeh);
      }
   });


   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: self.poeh.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: self.poeh.whse }, { reload: 'icia.detail' });
      }
   };
});

app.controller('PoipDetailHeaderCtrl', function ($scope, $state, $stateParams, $translate, DataService, Utils) {
   var self = this;
   self.poeh = $scope.dtl.poeh;

   self.getapsv = function (vendno) {
      if (vendno) {
         var params = {
            vendno: vendno,
            fillmode: true
         };
         DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (apsv) {
            if (apsv) {
               self.vendtype = apsv.vendtype;
               self.vendname = apsv.name;
            }
         });
      }
   };

   self.getfreightterms = function (freightcode) {
      if (freightcode) {
         var sastaParams = {
            codeiden: 'FT',
            codeval: freightcode,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               self.freightterms = sasta.descrip;
            }
         });
      }
   };

   self.getcurrencydescription = function (currencyty) {
      if (currencyty) {
         var params = {
            currencyty: currencyty,
            fldlist: 'descrip'
         };
         DataService.getResource('api/sa/sastc/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.currencyDescrip = data.descrip;
            }
         });
      }
   };
      
   self.loadpoheader = function (pono, posuf) {
      if (pono) {
         var poheaderCriteria = {
            pono: pono,
            posuf: posuf
         };
         DataService.post('api/po/aspoinquiry/loadpoheader', { data: poheaderCriteria, busy: true }, function (poheader) {
            if (poheader) {             
               self.poheader = poheader;
               self.oevanumber = self.poheader.orderaltno + '-' + Utils.pad(self.poheader.orderaltsuf, 2);
            }
         });
      }
   };

   self.loadpoheaderaddlwhse = function (pono, posuf) {
      if (pono) {
         var poheaderwhseCriteria = {
            pono: pono,
            posuf: posuf
         };
         DataService.post('api/po/aspoinquiry/loadpoheaderaddlwhse', { data: poheaderwhseCriteria, busy: true }, function (poheaderwhse) {
            if (poheaderwhse) {
               self.poheaderwhse = poheaderwhse;
            }
         });
      }
   };

   self.loadpoheaderaddlmisc = function (pono, posuf) {
      if (pono) {
         var poheadermiscCriteria = {
            pono: pono,
            posuf: posuf
         };
         DataService.post('api/po/aspoinquiry/loadpoheaderaddlmisc', { data: poheadermiscCriteria, busy: true }, function (poheadermisc) {
            if (poheadermisc) {
               self.poheadermisc = poheadermisc;
               self.quantities = [];
               var orderQuantity = {
                  type: $translate.instant('global.ordered'),
                  quantity: self.poheadermisc.totqtyord,
                  amount: self.poheadermisc.totlineamthidden ? null : self.poheadermisc.totlineamt,
                  operator: self.poheadermisc.operord,
                  date: self.poheadermisc.enterdt,
                  journal: null
               };
               var receivedQuantity = {
                  type: $translate.instant('global.received'),
                  quantity: (!self.poheadermisc.totqtyrcvhidden) ? self.poheadermisc.totqtyrcv : null,
                  amount: (!self.poheadermisc.totrcvamthidden) ? self.poheadermisc.totrcvamt : null,
                  operator: self.poheadermisc.operrcv,
                  date: self.poheadermisc.receiptdt,
                  journal: self.poheadermisc.jrnlrcv
               };
               var costedQuantity = {
                  type: $translate.instant('global.costed'),
                  quantity: self.poheadermisc.totqtycosthidden ? null : self.poheadermisc.totqtycost,
                  amount: self.poheadermisc.totcostamthidden ? null : self.poheadermisc.totcostamt,
                  operator: self.poheadermisc.opercost,
                  date: self.poheadermisc.costeddt,
                  journal: self.poheadermisc.jrnlcost
               };
               var uncostedQuantity = {
                  type: $translate.instant('global.uncosted'),
                  quantity: self.poheadermisc.totqtyuncosthidden ? null : self.poheadermisc.totqtyuncost,
                  amount: self.poheadermisc.totuncostamthidden ? null : self.poheadermisc.totuncostamt,
                  operator: null,
                  date: null,
                  journal: null
               };
               self.quantities.push(orderQuantity);
               self.quantities.push(receivedQuantity);
               self.quantities.push(costedQuantity);
               self.quantities.push(uncostedQuantity);
            }
         });
      }
   };

   // After record has resolved...
   self.poeh.$promise.then(function () {
      if (self.poeh) {
         self.loadpoheader(self.poeh.pono, self.poeh.posuf);
         self.loadpoheaderaddlwhse(self.poeh.pono, self.poeh.posuf);
         self.loadpoheaderaddlmisc(self.poeh.pono, self.poeh.posuf);
         self.getapsv(self.poeh.vendno);
         self.getfreightterms(self.poeh.frttermscd);
         self.getcurrencydescription(self.poeh.currencyty);
         if (self.poeh.correctionty && self.poeh.correctionty.toLowerCase() === 'c') {
            self.correctiontype = $translate.instant('global.corrected');
         } else if (self.poeh.correctionty && self.poeh.correctionty.toLowerCase() === 'rc') {
            self.correctiontype = $translate.instant('global.receipt.correction');
         }
         if (self.poeh.borelfl) {
            self.backorder = $translate.instant('global.back.order');
         }
         if (self.poeh.rushfl) {
            self.backorder = $translate.instant('global.rush');
         }
      }
   });
});

app.controller('PoipAdditionalDetailCtrl', function ($scope, $state, $translate, Constants, DataService, GridService, Sasoo) {
   var self = this;
   var base = $scope.base;
   self.FIELD_KEY_DELIMITER = '=';
   self.FIELD_SET_DELIMITER = '|';
   self.PARAM_PRIMARY_KEY_PURCHASE_ORDER = 'pono';
   self.PARAM_SECONDARY_KEY_PURCHASE_ORDER_SUFFIX = 'posuf';
   self.seecostfl = Sasoo.seecostfl;
   self.selectedRecord = GridService.getSelectedRecord(base.grid);

   self.buildContactsParamData = function () {
      var paramData = '';
      if (self.selectedRecord) {
         paramData = self.PARAM_PRIMARY_KEY_PURCHASE_ORDER + self.FIELD_KEY_DELIMITER +
            self.selectedRecord.pono.toString() + self.FIELD_SET_DELIMITER +
            self.PARAM_SECONDARY_KEY_PURCHASE_ORDER_SUFFIX + self.FIELD_KEY_DELIMITER +
            self.selectedRecord.posuf.toString();
      };
      return paramData;
   };

   //Only after the controls are initialized, can we set the key data to it so it can build out
   //the data in the Address Contact Controls.
   self.vendorContactsControlReady = function () {
      if (self.vendorContactsControl) {
         self.vendorContactsControl.initialize(self.buildContactsParamData());
      }
   };
   self.billToContactsControlReady = function () {
      if (self.billToContactsControl) {
         self.billToContactsControl.initialize(self.buildContactsParamData());
      }
   };
   self.shipFromContactsControlReady = function () {
      if (self.shipFromContactsControl) {
         self.shipFromContactsControl.initialize(self.buildContactsParamData());
      }
   };
   self.shipToContactsControlReady = function () {
      if (self.shipToContactsControl) {
         self.shipToContactsControl.initialize(self.buildContactsParamData());
      }
   };

   self.loadpoquickview = function () {
      var quickviewCriteria = {
         pono: self.selectedRecord.pono,
         posuf: self.selectedRecord.posuf
      };
      DataService.post('api/po/aspoinquiry/loadpoquickview', { data: quickviewCriteria, busy: true }, function (data) {
         if (data) {
            self.loadpoquickviewsingle = data.loadpoquickviewsingle;
            self.loadpoquickviewresults = data.loadpoquickviewresults;
         }
      });
   };

   if (self.selectedRecord) {
      var labelData = { pono: self.selectedRecord.pono, posuf: self.selectedRecord.posuf };
      self.subTitle = $translate.instant('global.purchase.order.number') + Constants.LABEL_DELIMITER + base.getFullPurchaseOrderNumber(labelData);
      self.loadpoquickview();
   }

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('poip.additionaldetail.quickview', { pono: self.selectedRecord.pono, posuf: self.selectedRecord.posuf, lineno: record.lineno });
   };
});

app.controller('PoipAdditionalDetailQuickViewCtrl', function ($scope, $stateParams, $translate, Constants, DataService) {
   var self = this;
   var base = $scope.base;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;
   var lineno = $stateParams.lineno;

   if (pono && lineno) {
      var quickviewTieCriteria = {
         pono: pono,
         posuf: posuf,
         lineno: lineno
      };
      self.subTitle = $translate.instant('global.purchase.order.number') + Constants.LABEL_DELIMITER + base.getFullPurchaseOrderNumber(quickviewTieCriteria) +
          Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.line.number') + Constants.LABEL_DELIMITER + quickviewTieCriteria.lineno;
      DataService.post('api/po/aspoinquiry/loadpoquickviewties', { data: quickviewTieCriteria, busy: true }, function (data) {
         if (data) {
            self.loadpoquickviewtiessingle = data.loadpoquickviewtiessingle;
            self.loadpoquickviewtiesresults = data.loadpoquickviewtiesresults;
         }
      });
   }
});

app.controller('PoipDetailWarehouseLogisticsCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var ORDERTYPE_PURCHASE = 'p';

   dtl.poeh.$promise.then(function () {
      var criteria = {
         orderno: dtl.poeh.pono,
         ordersuf: dtl.poeh.posuf,
         seqno: 0,
         ordertype: ORDERTYPE_PURCHASE,
         whseview: dtl.poeh.whse,
         customparam: ''
      };

      // Load WL Inquiry
      DataService.post('api/wl/aswlinquiry/loadwlinquiry', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.unavailableMessage = data.cUnavailableMessage;
            self.wldtlresults = data.loadwlinqdtlresults;

            if (data.loadwlinqhdrresults) {
               self.wlHeader = data.loadwlinqhdrresults[0];
            }
            self.wlSingle = data.loadwlinqsingle;
         }
      });
   });
});

app.controller('PoipDetailHistoryCtrl', function ($scope, $state, DataService, ConfigService) {
   var self = this;
   var dtl = $scope.dtl;
      
   self.dataCriteria = [];
   self.isDataHeaderGridVisible = true;
   self.isDataLineGridVisible = false;
      
   dtl.poeh.$promise.then(function () {
      var params = {
         vendno: null,
         pono: dtl.poeh.pono,
         posuf: null,
         batchsize: ConfigService.getDefaultRecordLimit(),
         fldlist: ''
      };
      DataService.getList('api/po/poeh/listbyvendno', { params: params, busy: true }, function (poehlist) {
         if (poehlist) {
            self.poehlist = poehlist;
         }
      });
   });

   self.IsDataHeaderGridVisible = function () {
      return self.isDataHeaderGridVisible;
   };

   self.IsDataLineGridVisible = function () {
      return self.isDataLineGridVisible;
   };

   self.dataSectionChanged = function () {
      if (self.dataCriteria.section === 'header') {
         self.isDataHeaderGridVisible = true;
         self.isDataLineGridVisible = false;
      } else {
         self.isDataHeaderGridVisible = false;
         self.isDataLineGridVisible = true;         
      }
      self.buildPOAckDataResults();      
   };

   self.buildPOAckDataResults = function () {

      var comCriteria = {
         createdtend: '',
         createdtstart: '2015-01-01T00:00:00',
         hourfrom: 0,
         hourto: 0,
         minutefrom: 0,
         minuteto: 0,
         module: '',
         proctype: '',              // all 'edi' or 'ion-bod'
         recordcountlimit: 500,
         transid: 0,
         transstat: 'prc',
         transtype: '855i',
         transtypescreen: '855i',
         typefrom: '',
         typeto: '',
         updstat: 'a',
      };

      var poDataCriteria  = {
         pono: dtl.poeh.pono,
         posuf: dtl.poeh.posuf
      };

      DataService.post('api/edi/asedientry/etccgetdocumentlistpo', { data: { etccdoclistcomcriteria: comCriteria, etccdoclistpocriteria: poDataCriteria }, busy: true }, function (data) {
         if (data) {
            var ackListResults = data.etccdoclistresults;
            var latestDt = '';
            var latestTm = 0;
            var sxxmldocRowid = '';

            // Get the latest PO Acknowledgement
            ackListResults.forEach(function (document) {
               if (document.createdt >= latestDt) {
                  if (latestDt === document.createdt) {
                     if (latestTm < document.creattm) {
                        sxxmldocRowid = document.sxxmldocRowid;
                        latestTm = document.creattm;
                     }
                  } else {
                     latestDt = document.createdt;
                     latestTm = 0;
                     sxxmldocRowid = document.sxxmldocRowid;
                  }
               }
            });

            if (sxxmldocRowid) {
               self.dataPOAckCriteria = {
                  sxxmldocRowid: sxxmldocRowid,
                  section: self.dataCriteria.section,
                  rcvdfl: false,
                  processedfl: true,
                  origfl: false,
                  histfl: true
               };

               DataService.post('api/edi/asedientry/etccdetailgetdatalist', { data: self.dataPOAckCriteria, busy: true }, function (data) {
                  if (data) {
                     if (self.dataCriteria.section === 'header') {
                        self.dataHeaderResults = data.etccdetdata855ihdr;
                     } else {
                        self.dataLineResults = data.etccdetdata855iline;
                     }
                  }
               });
            }
         }
      });      
   };
 
   self.dataCriteria.section = 'header';
   self.buildPOAckDataResults();

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('poip.detail.history', { pono: record.pono, posuf: record.posuf });
   };
});

app.controller('PoipDetailHistoryVendorDetialCtrl', function ($scope, $translate, $stateParams, DataService, Constants) {
   var self = this;
   var base = $scope.base;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;

   if (pono) {
      var poapdetailCriteria = {
         pono: pono,
         posuf: posuf
      };
      self.subTitle = $translate.instant('global.purchase.order.number') + Constants.LABEL_DELIMITER + base.getFullPurchaseOrderNumber(poapdetailCriteria);
      DataService.post('api/po/aspoinquiry/loadpoapdetail', { data: poapdetailCriteria, busy: true }, function (poapdetails) {
         if (poapdetails) {
            self.poapdetails = poapdetails;
         }
      });
   }
});

app.controller('PoipDetailTotalsCtrl', function ($scope, $translate, DataService, Sasoo) {
   var self = this;
   var dtl = $scope.dtl;
   self.seecostfl = Sasoo.seecostfl;

   self.buildAddons = function () {
      if (self.pototals) {
         self.addons = [];
         if (!self.pototals.addon1hidden) {
            var addon1 = {
               addonno: 1,
               description: self.pototals.addondesc1,
               amount: self.pototals.addonamt1,
               type: self.pototals.addontype1,
               captype: self.pototals.btnAddOnCapFl1label.toUpperCase() === 'C' ? $translate.instant('global.capitalized') :
                  self.pototals.btnAddOnCapFl1label.toUpperCase() === 'E' ? $translate.instant('global.expensed') : '',
               net: self.pototals.addonnet1
            };
            self.addons.push(addon1);
         }
         if (!self.pototals.addon2hidden) {
            var addon2 = {
               addonno: 2,
               description: self.pototals.addondesc2,
               amount: self.pototals.addonamt2,
               type: self.pototals.addontype2,
               captype: self.pototals.btnAddOnCapFl2label.toUpperCase() === 'C' ? $translate.instant('global.capitalized') :
                  self.pototals.btnAddOnCapFl2label.toUpperCase() === 'E' ? $translate.instant('global.expensed') : '',
               net: self.pototals.addonnet2
            };
            self.addons.push(addon2);
         }
         if (!self.pototals.addon3hidden) {
            var addon3 = {
               addonno: 3,
               description: self.pototals.addondesc3,
               amount: self.pototals.addonamt3,
               type: self.pototals.addontype3,
               captype: self.pototals.btnAddOnCapFl3label.toUpperCase() === 'C' ? $translate.instant('global.capitalized') :
                  self.pototals.btnAddOnCapFl3label.toUpperCase() === 'E' ? $translate.instant('global.expensed') : '',
               net: self.pototals.addonnet3
            };
            self.addons.push(addon3);
         }
         if (!self.pototals.addon4hidden) {
            var addon4 = {
               addonno: 4,
               description: self.pototals.addondesc4,
               amount: self.pototals.addonamt4,
               type: self.pototals.addontype4,
               captype: self.pototals.btnAddOnCapFl4label.toUpperCase() === 'C' ? $translate.instant('global.capitalized') :
                  self.pototals.btnAddOnCapFl4label.toUpperCase() === 'E' ? $translate.instant('global.expensed') : '',
               net: self.pototals.addonnet4
            };
            self.addons.push(addon4);
         }
      }
   };

   dtl.poeh.$promise.then(function () {
      var pototalsCriteria = {
         pono: dtl.poeh.pono,
         posuf: dtl.poeh.posuf
      };
      DataService.post('api/po/aspoinquiry/loadpototals', { data: pototalsCriteria, busy: true }, function (pototals) {
         if (pototals) {
            self.pototals = pototals;
            self.discount = Locale.formatNumber(pototals.wodiscamt, { style: 'decimal', maximumFractionDigits: 2 }) + '  ' + pototals.wodisctype + '  ' +//ignore jslint - Locale not defined
               Locale.formatNumber(pototals.wodiscnet, { style: 'decimal', maximumFractionDigits: 2 });//ignore jslint - Locale not defined
            self.buildAddons();
         }
      });
   });
});

app.controller('PoipDetailLineCtrl', function ($scope, $state, DataService, Sasoo) {
   var self = this;
   var dtl = $scope.dtl;
   self.seecostfl = Sasoo.seecostfl;

   self.getpoLineDetial = function () {
      var polinesCriteria = {
         pono: dtl.poeh.pono,
         posuf: dtl.poeh.posuf
      };
      DataService.post('api/po/aspoinquiry/loadpolinedetail', { data: polinesCriteria, busy: true }, function (lines) {
         if (lines) {
            self.lines = lines;
         }
      });
   };

   self.canSeeCost = function () {
      return Sasoo.seecostfl;
   };

   dtl.poeh.$promise.then(function () {
      self.getpoLineDetial();
   });

   self.productInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: dtl.poeh.whse });
      }
   };

   self.trackingInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         var record = { trackno: currentRow.trackno };
         $state.go('otit.detail', { record: record });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('poip.detail.linedetail', { pono: dtl.poeh.pono, posuf: dtl.poeh.posuf, selectedLine: record, callBack: self.callBack });
   };

   self.callBack = function () {
      self.getpoLineDetial();
      $state.go('^');
   };
});

app.controller('PoipLineDetailCtrl', function ($scope, $stateParams, $translate, Constants, DataService, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.pono = $stateParams.pono;
   self.posuf = $stateParams.posuf;
   self.selectedLine = $stateParams.selectedLine;
   self.poipsecurityLevel = 0;
   var MENU_FUNCTION_POIP = 'poip';

   self.checkBundleTally = function () {
      if (self.poel) {
         var params = {
            prod: self.selectedLine.shipprod,
            fldlist: 'memomixfl,tallyfl,reqbundleidfl'
         };
         DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (icsp) {
            if (icsp && (icsp.memomixfl || self.poel.tallyfl)) {
               if (icsp.reqbundleidfl) {
                  self.isBundleVisible = true;
                  self.isTallyVisible = false;
               } else {
                  self.isTallyVisible = true;
                  self.isBundleVisible = false;
               }
            }
         });
      }
   };

   if (self.pono && self.selectedLine && self.selectedLine.lineno) {
      var lineCriteria = {
         pono: self.pono,
         posuf: self.posuf
      };
      self.subTitle = $translate.instant('global.purchase.order.number') + Constants.LABEL_DELIMITER + base.getFullPurchaseOrderNumber(lineCriteria) +
          Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.line.number') + Constants.LABEL_DELIMITER + self.selectedLine.lineno;

      var params = {
         pono: self.pono,
         posuf: self.posuf,
         lineno: self.selectedLine.lineno,
         fillmode: true
      };
      DataService.get('api/po/poel/getbypk', { params: params, busy: true }, function (poel) {
         self.poel = poel;
         self.checkBundleTally();
      });

      self.poipsecurityLevel = SecurityService.getSecurityLevel(MENU_FUNCTION_POIP);
      if (self.selectedLine.mseriallot) {
         var icswParams = {
            prod: self.selectedLine.shipprod,
            whse: self.selectedLine.whse,
            fldlist: 'serlottype'
         };
         DataService.get('api/ic/icsw/getbypk', { params: icswParams, busy: true }, function (icsw) {
            if (icsw) {
               if (icsw.serlottype.toLowerCase() === Constants.LOT) {
                  self.isLotVisible = true;
                  self.isSerialVisible = false;
               } else if (icsw.serlottype.toLowerCase() === Constants.SERIAL) {
                  self.isSerialVisible = true;
                  self.isLotVisible = false;
               }
            }
         });
      }
   }
   self.back = function () {
      if ($stateParams.callBack) {
         $stateParams.callBack();
      }
   };
});

app.controller('PoipLineDetailExtendedCtrl', function ($scope, $stateParams, DataService, Sasoo) {
   var self = this;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;
   var lineno = $stateParams.selectedLine.lineno;
   if ($stateParams.selectedLine) {
      self.prod = $stateParams.selectedLine.shipprod;
   }
   self.seecostfl = Sasoo.seecostfl;
   self.pono = pono;
   self.posuf = posuf;

   if (pono && lineno) {
      var extendedCriteria = {
         pono: pono,
         posuf: posuf,
         lineno: lineno
      };

      DataService.post('api/po/aspoinquiry/loadpolineextended', { data: extendedCriteria, busy: true }, function (extendedResult) {
         if (extendedResult) {
            self.extendedResult = extendedResult;
         }
      });
   }
});

app.controller('PoipLineDetailNonStockCtrl', function ($scope, $stateParams, DataService) {
   var self = this;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;
   var lineno = $stateParams.selectedLine.lineno;
   if (pono && lineno) {
      var nonstockCriteria = {
         pono: pono,
         posuf: posuf,
         lineno: lineno
      };
      DataService.post('api/po/aspoinquiry/loadpolinenonstock', { data: nonstockCriteria, busy: true }, function (nonstockResult) {
         if (nonstockResult) {
            self.nonstockResult = nonstockResult;
         }
      });
   }
});

app.controller('PoipLineDetailCostingActivityCtrl', function ($scope, $stateParams, DataService) {
   var self = this;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;
   var lineno = $stateParams.selectedLine.lineno;
   if (pono && lineno) {
      var costingActivityCriteria = {
         pono: pono,
         posuf: posuf,
         lineno: lineno
      };
      DataService.post('api/po/aspoinquiry/loadpocostact', { data: costingActivityCriteria, busy: true }, function (pocostResults) {
         if (pocostResults) {
            self.pocostResults = pocostResults;
         }
      });
   }
});

app.controller('PoipLineDetailReturnAllocationCtrl', function ($scope, $stateParams, DataService) {
   var self = this;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;
   var lineno = $stateParams.selectedLine.lineno;
   if (pono && lineno) {
      var returnAllocationCriteria = {
         pono: pono,
         posuf: posuf,
         lineno: lineno
      };
      DataService.post('api/po/aspoinquiry/loadporetnalloc', { data: returnAllocationCriteria, busy: true }, function (data) {
         if (data) {
            self.retnallocResults = data.loadporetnallocresults;
            self.retnallocSingle = data.loadporetnallocsingle;
         }
      });
   }
});

app.controller('PoipLineDetailLineHistoryCtrl', function ($scope, $stateParams, $translate, DataService, Utils) {
   var self = this;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;
   var lineno = $stateParams.selectedLine.lineno;   
   
   if (pono && lineno) {
      var lineHistoryCriteria = {
         pono: pono,
         lineno: lineno
      };
      DataService.post('api/po/aspoinquiry/loadpolinehistory', { data: lineHistoryCriteria, busy: true }, function (lineHistoryResults) {
         if (lineHistoryResults) {
            self.lineHistoryResults = lineHistoryResults;
         }
      });
   }

   self.stageFormatter = function (row, cell, value, column, item) {
      if (value) {
         if (value.toLowerCase() === 'ent') {
            return $translate.instant('global.entered');
         } else if (value.toLowerCase() === 'ord') {
            return $translate.instant('global.ordered');
         } else if (value.toLowerCase() === 'prt') {
            return $translate.instant('global.printed');
         } else if (value.toLowerCase() === 'ack') {
            return $translate.instant('global.acknowledged');
         } else if (value.toLowerCase() === 'pre') {
            return $translate.instant('global.pre.receiving');
         } else if (value.toLowerCase() === 'rcv') {
            return $translate.instant('global.received');
         } else if (value.toLowerCase() === 'cst') {
            return $translate.instant('global.costed');
         } else if (value.toLowerCase() === 'cls') {
            return $translate.instant('global.closed');
         } else {
            return $translate.instant('global.cancelled');
         }
      } else {
         return value;
      }
   };

   self.buildPOAckDataResults = function () {

      var comCriteria = {
         createdtend: '',
         createdtstart: '2015-01-01T00:00:00',
         hourfrom: 0,
         hourto: 0,
         minutefrom: 0,
         minuteto: 0,
         module: '',
         proctype: '',              // all 'edi' or 'ion-bod'
         recordcountlimit: 500,
         transid: 0,
         transstat: 'prc',
         transtype: '855i',
         transtypescreen: '855i',
         typefrom: '',
         typeto: '',
         updstat: 'a',
      };

      var poDataCriteria = {
         pono: pono,
         posuf: posuf
      };

      DataService.post('api/edi/asedientry/etccgetdocumentlistpo', { data: { etccdoclistcomcriteria: comCriteria, etccdoclistpocriteria: poDataCriteria }, busy: true }, function (data) {
         if (data) {
            var ackListResults = data.etccdoclistresults;
            var latestDt = '';
            var latestTm = 0;
            var sxxmldocRowid = '';

            // Get the latest PO Acknowledgement
            ackListResults.forEach(function (document) {
               if (document.createdt >= latestDt) {
                  if (latestDt === document.createdt) {
                     if (latestTm < document.creattm) {
                        sxxmldocRowid = document.sxxmldocRowid;
                        latestTm = document.creattm;
                     }
                  } else {
                     latestDt = document.createdt;
                     latestTm = 0;
                     sxxmldocRowid = document.sxxmldocRowid;
                  }
               }
            });

            if (sxxmldocRowid) {
               self.dataPOAckCriteria = {
                  sxxmldocRowid: sxxmldocRowid,
                  section: 'line',
                  rcvdfl: false,
                  processedfl: true,
                  origfl: false,
                  histfl: true
               };

               DataService.post('api/edi/asedientry/etccdetailgetdatalist', { data: self.dataPOAckCriteria, busy: true }, function (data) {
                  if (data) {
                     self.dataLineResults = [];
                     var dataResults = data.etccdetdata855iline;

                     dataResults.forEach(function (lineRecord) {
                        if (lineRecord.secseq === lineno) {
                           self.dataLineResults.push(lineRecord);
                        }
                     });            
                  }
               });
            }
         }
      });
   };

   self.buildPOAckDataResults();
});