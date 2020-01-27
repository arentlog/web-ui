'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addInquiryBaseState('kp', 'kpiw', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('kp', 'kpiw');

   $stateProvider.state('kpiw.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpiw/detail.json');
            },
            controller: 'KpiwDetailCtrl as dtl'
         }
      }
   });

   //Kit details states
   $stateProvider.state('kpiw.detail.kitComponentDetail', {
      url: '/kit-component',
      params: {
         component: null,
         componentType: null,
         matchedSubComponents: null
      },
      views: {
         kitComponentViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/line-kit-inquiry/kit-component-details.json');
            },
            controller: 'KpiwKitCompDetailsCtrl as ldKitCd'
         }
      }
   });
   $stateProvider.state('kpiw.detail.kitGroupComponent', {
      url: '/kit-group-component',
      params: {
         selectedComponent: null,
         matchedSubComponents: null
      },
      views: {
         kitComponentViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/line-kit-inquiry/kit-group-component.json');
            },
            controller: 'KpiwKitGroupCompCtrl as ldKitGc'
         }
      }
   });
   $stateProvider.state('kpiw.detail.kitOptionComponent', {
      url: '/kit-option-component',
      params: {
         selectedComponent: null,
         matchedSubComponents: null
      },
      views: {
         kitComponentViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/line-kit-inquiry/kit-option-component.json');
            },
            controller: 'KpiwKitOptionCompCtrl as ldKitOc'
         }
      }
   });
   $stateProvider.state('kpiw.detail.kitKeywordComponent', {
      url: '/kit-keyword-component',
      params: {
         component: null,
         groupName: null,
         kitCriteria: null
      },
      views: {
         kitComponentViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/line-kit-inquiry/kit-keyword-component.json');
            },
            controller: 'KpiwKitKeywordCompCtrl as ldKitKc'
         }
      }
   });

   BinAllocationStateProvider.addStates('kp', 'kpiw', 'kpiw.detail.kitComponentDetail');

});

app.controller('KpiwBaseCtrl', function ($state, ConfigService, DataService, MessageService, Utils) {
   var self = this;
   self.criteria = {
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   self.criteria.wono = self.criteria.begwonosuf ? self.criteria.begwonosuf.split('-')[0] : 0;
   self.criteria.wosuf = self.criteria.begwonosuf ? self.criteria.begwonosuf.split('-')[1] : 0;

   self.masterGridType = 'Simple';

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'kpiw',
      rowIdField: 'rowID',
      stateRef: 'kpiw.detail',
      title: { label: 'global.work.order.number', valueFunction: 'base.getFullOrderNumber' },
      description: [{ label: 'global.warehouse', value: 'whse' }]
   };

   self.isMaster = function () {
      return $state.is('kpiw.master');
   };

   self.includesMaster = function () {
      return $state.includes('kpiw.master');
   };

   self.isDetail = function () {
      return $state.is('kpiw.detail');
   };

   self.includesDetail = function () {
      return $state.includes('kpiw.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      self.masterGridType = 'Simple';
      self.criteria.begwono = self.criteria.begwonosuf ? self.criteria.begwonosuf.split('-')[0] : 0;
      if (self.criteria.begwono) {
         var wosuf = self.criteria.begwonosuf.split('-')[1];
         var params = { wono: self.criteria.begwono, wosuf: wosuf };
         DataService.get('api/kp/kpet/existsbypk', { params: params, busy: true }, function (kpetExist) {
            if (kpetExist) {
               $state.go('^.detail', { pk: self.criteria.begwono, pk2: wosuf });
            }
         });
      } else {
         DataService.post('api/kp/askpinquiry/createwolisttt', { data: self.criteria, busy: true }, function (data) {
            self.dataset = data.createwolistttresults;
         });
      }
   };

   /**
    * Return the formatted order number and suffix
    */
   self.getFullOrderNumber = function (kpet) {
      if (kpet) {
         return kpet.wono + '-' + Utils.pad(kpet.wosuf, 2);
      } else {
         return '';
      }
   };

   self.productInquiryHyperlink = function (e, args) {
      if (args && args[0] && args[0].item) {
         var currentRow = args[0].item;
         // ICIP HyperLink
         if (currentRow && currentRow.shipprod) {
            $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
         }
      } else if (e) {
         $state.go('icip.detail', { pk: e, pk2: (args ? args : '') });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('KpiwSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('kpiw.master');
      }

      // Get data
      base.search();
   };
});

app.controller('KpiwMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.ordered = '0';
   self.printed = '1';
   self.built = '2';

   // Advanced search criteria object with initial values
   self.advCriteria = {
      prod: '',
      compprod: '',
      whse: '',
      enterdt: null,
      stagecd: '',
      botype: '',
      begwonosuf: 0,
      createdby: '',
      recordcountlimit: ConfigService.getDefaultRecordLimit(),
      verno: 0
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'prod', label: MessageService.get('global.kit.product') },
      { value: 'begwonosuf', label: MessageService.get('global.beginning.work.order.number') },
      { value: 'whse', label: MessageService.get('global.warehouse') },
      { value: 'compprod', label: MessageService.get('global.component.product') },
      { value: 'enterdt', label: MessageService.get('global.entered.date') },
      { value: 'stagecd', label: MessageService.get('global.stage') },
      { value: 'botype', label: MessageService.get('global.back.order.filter') },
      { value: 'createdby', label: MessageService.get('global.created.by') },
      { value: 'verno', label: MessageService.get('global.version.number') },
      { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   // TODO: any?
   self.defaultSelectedCriteria = ['prod', 'whse', 'compprod'];

   self.boTypeOptions = [
      { label: MessageService.get('global.all.types'), value: '' },
      { label: MessageService.get('global.include.back.orders.only'), value: 'include' },
      { label: MessageService.get('global.exclude.all.back.orders'), value: 'exclude' }
   ];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      // TODO: finish rowId param or pk param(s)
      $state.go('^.detail', { pk: record.wono, pk2: record.wosuf });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);
      advCriteria.begwono = advCriteria.begwonosuf ? advCriteria.begwonosuf.split('-')[0] : 0;

      base.masterGridType = advCriteria.compprod ? 'Component' : 'Simple';

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordcountlimit) {
         advCriteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      }

      switch (advCriteria.stagecd) {
         case '1':
            advCriteria.stagecd = self.ordered;
            break;
         case '2':
            advCriteria.stagecd = self.printed;
            break;
         case '3':
            advCriteria.stagecd = self.built;
            break;
      }

      DataService.post('api/kp/askpinquiry/createwolisttt', { data: advCriteria, busy: true }, function (data) {
         base.dataset = data.createwolistttresults;
      });
   };
});

app.controller('KpiwDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.corderaltno = '';

   self.isKitOrKitSubComponent = function () {
      if ($state.current.name.endsWith('.kitComponentDetail') ||
         $state.current.name.endsWith('.kitGroupComponent') ||
         $state.current.name.endsWith('.kitOptionComponent') ||
         $state.current.name.endsWith('.kitKeywordComponent') ||
         $state.current.name.endsWith('.bin-allocation')) {
         return true;
      } else {
         return false;
      }
   };

   self.isKitComponent = function () {
      if ($state.current.name.endsWith('.kitComponentDetail') ||
         $state.current.name.endsWith('.kitGroupComponent') ||
         $state.current.name.endsWith('.kitOptionComponent') ||
         $state.current.name.endsWith('.kitKeywordComponent')) {
         return true;
      } else {
         return false;
      }
   };

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.kpet = DataService.getResource('api/kp/kpet/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         wono: $stateParams.pk,
         wosuf: $stateParams.pk2,
         fillmode: true
      };
      base.criteria.begwonosuf = base.getFullOrderNumber(params);
      self.kpet = DataService.getResource('api/kp/kpet/getbypk', { params: params, busy: true });
   }

   self.getHeaderData = function () {
      if (self.kpet) {
         var params = { prod: self.kpet.shipprod, fillmode: true, fldlist: 'descrip' };
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (data) {
            if (data) {
               self.kpet.descrip = data.descrip1;
            }
         });
         DataService.post('api/kp/askpinquiry/kpiwloadheader', { data: self.kpet, busy: true }, function (data) {
            if (data) {
               self.kpethdr = data;
               if (self.kpethdr.corderaltno) {
                  var orderDetails = self.kpethdr.corderaltno.split('-');
                  if (orderDetails.length === 2) {
                     self.corderaltno = orderDetails[0] + '-' + Utils.pad(orderDetails[1], 2);
                  }
               }
            }
         });
      }
   };

   // After record has resolved...
   self.kpet.$promise.then(function () {
      if (self.kpet) {

         self.subTitle = MessageService.get('global.work.order.number') + ': ' + base.getFullOrderNumber(self.kpet);

         self.getHeaderData();

         //Hide-Unhide the WL Tab
         var params = { whse: self.kpet.whse, fillmode: true, fldlist: 'wlloc' };
         DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
            if (data) {
               self.wlTabVisible = data.wlloc ? true : false;
            }
         });

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.kpet);
      }
   });

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: self.kpet.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: self.kpet.whse }, { reload: 'icia.detail' });
      }
   };

});

app.controller('KpiwDetailWarehouseLogisticsCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var ORDERTYPE_ORDER = 'w';

   dtl.kpet.$promise.then(function () {
      var criteria = {
         orderno: dtl.kpet.wono,
         ordersuf: dtl.kpet.wosuf,
         seqno: 0,
         ordertype: ORDERTYPE_ORDER,
         whseview: dtl.kpet.whse,
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

app.controller('KpiwComponentCtrl', function ($scope, $stateParams, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   var ORDERTYPE_ORDER = 'w';

   self.expgrpfl = false;
   self.expoptfl = false;
   self.expkeywordsfl = false;
   self.reqonlyfl = false;

   dtl.kpet.$promise.then(function () {
      var criteria = {
         orderno: dtl.kpet.wono,
         ordersuf: dtl.kpet.wosuf,
         ordtype: ORDERTYPE_ORDER,
         whseview: dtl.kpet.whse,
         kitprod: dtl.kpet.shipprod,
         lineno: 0,
         stkqtyord: dtl.kpet.stkqtyord,
         inquiryfl: true,
         customparam: ''
      };

      // Load Component Details
      DataService.post('api/oe/asoeinquiry/loadtcomps', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.kitscriteria = data.kitscriteria;  // BoundKitCriteria
            self.expoptfl = self.kitscriteria.texpoptionschecked;
            self.loadtcompssingle = data.loadtcompssingle; //BoundKitSingle
            self.components = data.loadtcompsresults;
            self.subcomponents = data.loadtcompssubresults;
         }
      });

   });
});

/**
 * Line Detail Kit Lines Controller
 */
app.controller('KpiwDetailKitCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => oeLdKit
   var self = this;
   var dtl = $scope.dtl.kpet;
   $scope.line = $scope.dtl;  // So we can use the shared OE code

   self.kitSingle = {};

   // initialize kit
   self.kitCriteria = {
      orderno: dtl.wono,
      ordersuf: dtl.wosuf,
      ordtype: 'w',
      whse: dtl.whse,
      kitprod: dtl.shipprod,
      lineno: 0,
      stkqtyord: dtl.stkqtyord,
      inquiryfl: true
   };

   DataService.post('api/oe/asoeinquiry/loadtcomps', { data: self.kitCriteria, busy: true }, function (data) {
      if (data) {
         self.kitCriteria = data.kitscriteria;
         self.kitSingle = data.loadtcompssingle;
         self.kitResultsCollection = data.loadtcompsresults;
         self.kitSubResultsCollection = data.loadtcompssubresults;
      }
   });

   self.productSubTitle = function () {
      var subTitle = self.kitSingle.prod + ' - ' + self.kitSingle.proddesc;
      if (self.kitSingle.reqnsmsgvisible) {
         subTitle += " | " + self.kitSingle.reqnsmsg;
      }
      return subTitle;
   };

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // ICIP HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: dtl.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // ICIA HyperLink
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: dtl.whse }, { reload: 'icia.detail' });
      }
   };

   self.orderAltNoHyperlinkClicked = function (e, args) {
      var currentRow = args[0].item;

      switch (currentRow.orderalttype.toLowerCase()) {
         //need orderaltno & suffix is always 0 for each nav
         case "t":
            $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "p":
            $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "f":
            $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "w":
            $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
         case "o":
            $state.go('oeio.detail', { pk: currentRow.orderaltno, pk2: 0 });
            break;
      }
   };

   self.drilldownClicked = function (e, args) {
      // do not allow editing if modification is disabled
      if (false && !self.kitSingle.mmodifyaproductenabled) {
         MessageService.error('global.error', 'message.modification.of.this.component.is.not.allowed');
      } else {
         var selectedComponent = args[0].item;
         if (selectedComponent.fromoeelk) { // actual component - go to kit details screen
            $state.go('kpiw.detail.kitComponentDetail', { component: selectedComponent, componentType: 'details' });
         } else { // sub-component - go to sub screen
            if (selectedComponent.comptype.toLowerCase() === 'k') { //keyword
               $state.go('kpiw.detail.kitKeywordComponent', { component: selectedComponent, groupName: selectedComponent.groupname, kitCriteria: self.kitCriteria });
            } else { //sub-component
               var matchedSubComponents = [];
               self.kitSubResultsCollection.forEach(function (subComponent) {
                  if (selectedComponent.comptype === subComponent.comptype && selectedComponent.groupname === subComponent.groupname) {
                     matchedSubComponents.push(subComponent);
                  }
               });

               if (matchedSubComponents.length > 0) {
                  if (selectedComponent.comptype.toLowerCase() === 'g') { //group component
                     $state.go('kpiw.detail.kitGroupComponent', { selectedComponent: selectedComponent, matchedSubComponents: matchedSubComponents });
                  } else if (selectedComponent.comptype.toLowerCase() === 'o') { //option component
                     $state.go('kpiw.detail.kitOptionComponent', { selectedComponent: selectedComponent, matchedSubComponents: matchedSubComponents });
                  }
               } else {
                  //go to kit details screen
                  $state.go('kpiw.detail.kitComponentDetail', { component: selectedComponent, componentType: 'details' });
               }
            }
         }
      }
   };
});

/**
 * Line Detail Kit Component Detail Controller
 */
app.controller('KpiwKitCompDetailsCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   //alias => ldKitCd
   var self = this;
   var dtl = $scope.dtl.kpet;
   $scope.line = $scope.dtl;  // So we can use the shared OE code

   self.component = $stateParams.component;
   self.matchedSubComponents = $stateParams.matchedSubComponents;
   self.componentType = $stateParams.componentType; //details or group
   self.componentDetails = {};
   self.stickyNonStockData = {};
   self.ordertype = 'w';
   self.orderno = dtl.wono;
   self.ordersuf = dtl.wosuf;

   self.setupComponentDetails = function () {
      self.componentDetailsCriteria = {
         orderno: dtl.wono,
         ordersuf: dtl.wosuf,
         wono: dtl.wono,
         wosuf: dtl.wosuf,
         ordtype: 'w',
         whse: dtl.whse,
         kitprod: dtl.shipprod,
         lineno: self.component.lineno,
         stkqtyord: self.component.qtyord,
         inquiryfl: true,
         ourproc: 'kpiw',  // yes, kpew
         seqno: self.component.seqno
      };

      DataService.post('api/oe/asoeinquiry/kitcreatedetailstt', { data: self.componentDetailsCriteria, busy: true }, function (data) {
         if (data) {
            self.componentDetails = data.kitcreatedetailsttresults;
            if (!self.componentDetails.unit) {
               self.componentDetails.unit = 'each';
            }
         }
      });
   };

   // initialize component details
   self.setupComponentDetails();

   self.getTitle = function () {
      switch (self.componentType.toLowerCase()) {
         case 'details':
            return $translate.instant('global.component.details');
         case 'group':
            return $translate.instant('global.group.component.details');
         case 'option':
            return $translate.instant('global.option.component.details');
         default:
            return $translate.instant('global.component.details');
      }
   };
   self.getSubTitle = function () {
      return dtl.shipprod + ' - ' + dtl.descrip;
   };

   self.prodCostLabel = function () {
      if (self.componentDetails.pdprodcosthidden) {
         return '';
      } else {
         return self.componentDetails.pdprodcost;
      }
   };

   self.prodCost = function () {
      var prodCost = '';
      if (!self.componentDetails.prodcosthidden && self.componentDetails.prodcost) {
         prodCost += self.componentDetails.prodcost;
      }
      if (!self.componentDetails.speccosttyhidden && self.componentDetails.speccostty) {
         prodCost += '(' + self.component.speccostty + ')';
      }
      return prodCost;
   };

   self.priceLabel = function () {
      if (self.componentDetails.pdpricehidden) {
         return '';
      } else {
         return self.componentDetails.pdprice;
      }
   };

   self.price = function () {
      var price = '';
      if (!self.componentDetails.pricehidden && self.componentDetails.price) {
         price += self.componentDetails.price;
      }
      if (!self.componentDetails.specpricetyhidden && self.componentDetails.specpricety) {
         price += '(' + self.component.specpricety + ')';
      }
      return price;
   };

   self.warehouseManagerClicked = function () {
      var wmBinAssignCriteria = {
         currproc: 'kpew',
         jrnlno: 0,
         kitfl: true,
         lineno: self.componentDetails.lineno,
         ourproc: 'kpew',
         ordertype: 'c',
         orderno: self.componentDetails.orderno,
         ordersuf: self.componentDetails.ordersuf,
         returnfl: self.componentDetails.returnfl,
         potype: '',
         prod: self.componentDetails.shipprod,
         seqno: self.componentDetails.seqnoOeelk,
         skipnonkitlogic: false,
         stkqtyship: dtl.qtyship,
         stkqtyrcv: 0,
         unit: self.componentDetails.unit,
         vamodule: '',
         wmadjtype: 'sell',
         wmqtyrcv: 0,
         whse: self.componentDetails.whse
      };

      $state.go('.bin-allocation', {
         criteria: wmBinAssignCriteria,
         binAllocationDisabled: true
      });

   };

   self.back = function () {
      switch (self.componentType.toLowerCase()) {
         case 'details':
            $state.go('^');
            break;
         case 'group':
            $state.go('^.kitGroupComponent', { selectedComponent: self.component, matchedSubComponents: self.matchedSubComponents });
            break;
      }
   };
});

/**
 * Line Detail Kit Group Component Controller
 */
app.controller('KpiwKitGroupCompCtrl', function ($scope, $state, $stateParams, $translate) {
   //alias => ldKitGc
   var self = this;
   $scope.line = $scope.dtl;  // So we can use the shared OE code

   self.component = $stateParams.selectedComponent;
   self.subComponentsCollection = $stateParams.matchedSubComponents;

   self.getSubTitle = function () {
      return $translate.instant('global.product') + ': ' + self.component.prod + ' - ' + self.component.proddesc + ' | ' +
         $translate.instant('global.group') + ': ' + self.component.prodname;
   };

   self.drilldownClicked = function (e, args) {
      var selectedComponent = args[0].item;
      $state.go('kpiw.detail.kitComponentDetail', { component: selectedComponent, matchedSubComponents: self.subComponentsCollection, componentType: 'group' });
   };
});

/**
 * Line Detail Kit Option Component Controller
 */
app.controller('KpiwKitOptionCompCtrl', function ($scope, $state, $stateParams, $translate) {
   //alias => ldKitOc
   var self = this;

   self.component = $stateParams.selectedComponent;
   self.subComponentsCollection = $stateParams.matchedSubComponents;

   self.getSubTitle = function () {
      return $translate.instant('global.kit') + ': ' + self.component.prod + ' - ' + self.component.proddesc + ' | ' +
         $translate.instant('global.option') + ': ' + self.component.prodname;
   };
});

/**
 * Line Detail Kit Keyword Component Controller
 */
app.controller('KpiwKitKeywordCompCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   //alias => ldKitKc
   var self = this;
   $scope.line = $scope.dtl;  // So we can use the shared OE code

   self.component = $stateParams.component;
   self.groupName = $stateParams.groupName;

   var createKeywordsRequest = {
      kitscriteria: $stateParams.kitCriteria,
      cKeyWords: self.groupName,
      ourproc: 'kpiw'
   };
   DataService.post('api/oe/asoeinquiry/kitcreatekeywordstt', { data: createKeywordsRequest, busy: true }, function (data) {
      if (data) {
         self.keywordsCollection = data.kitcreatekwdsttresults;
      }
   });

   self.getSubTitle = function () {
      return $translate.instant('global.kit') + ': ' + self.component.shipprod + ' | ' +
         $translate.instant('global.keyword') + ': ' + self.groupName;
   };
});

