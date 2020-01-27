'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ic', 'icia', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icia');

   $stateProvider.state('icia.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icia/detail.json');
            },
            controller: 'IciaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('icia.detail.customerreservation', {
      url: '/customer-reservation',
      params: { prod: null, whse: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/customer-reservation/customer-reservation.json');
            },
            controller: 'CustomerReservationCtrl as cstres'
         }
      }
   });
});

app.controller('IciaBaseCtrl', function ($state, $scope, $stateParams, ConfigService, DataService, Sasoo, MessageService) {
   var self = this;
   self.criteria = { prod: '', whse: Sasoo.whse };
   self.prod = '';
   self.whse = '';
   self.activateWhseTab = false;
   self.icia = {};

   self.isMaster = function () {
      return $state.is('icia.master');
   };

   self.includesMaster = function () {
      return $state.includes('icia.master');
   };

   self.isDetail = function () {
      return $state.is('icia.detail');
   };

   self.includesDetail = function () {
      return $state.includes('icia.detail');
   };

   self.canSeeCost = function () {
      return Sasoo.seecostfl;
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   self.search = function () {
      self.prod = self.criteria.prod;
      self.whse = self.criteria.whse;

      //Make sure to clear residual Unit and other data from any previous search.  Re-assign it from the ICSP via backend call
      self.icia = {};
      self.unit = '';

      if (self.prod) {
         //Get Unit
         var params = { prod: self.prod, fillmode: true, fldlist: 'unitstock,kittype' };
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (data) {
            if (data) {
               self.unit = data.unitstock;
               self.activateWhseTab = !self.criteria.whse ? true : false;
               if (self.prod && self.whse) {
                  self.validateWhseProduct();
               }
               else {
                  $state.go('icia.detail', { pk: self.prod, pk2: self.whse }, { reload: 'icia.detail' });
               }
            }
         });
      }
   };

   self.validateWhseProduct = function () {
      if (self.prod && self.whse) {
         var params = { prod: self.prod, whse: self.whse };
         DataService.get('api/ic/icsw/existsbypk', { params: params, busy: true }, function (data) {
            if (!data) {
               MessageService.error('global.error', 'error.productwarehouse.not.set.up.in.warehouse.products');
               self.icia = {};
            }
            else {
               $state.go('icia.detail', { pk: self.prod, pk2: self.whse }, { reload: 'icia.detail' });
            }
         });
      }
   };

   self.productFilter = function () {
      if (self.criteria.prod && self.criteria.whse) {
         self.whse = self.criteria.whse;
         self.prod = self.criteria.prod;
         var criteria = { whse: self.criteria.whse, prod: self.criteria.prod };
         if (self.icia.unit) {
            criteria.unit = self.icia.unit;
         }
         DataService.post('api/ic/asicwhseprod/iciafetchproduct', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.icia = data;
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('IciaSearchCtrl', function ($scope, $state, DataService, Utils, Sasoo) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.whse = Sasoo.whse;
      base.unit = '';

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      base.search();
   };

   self.productChange = function () {
      if (base.criteria.prod) {
         base.search();
      }
   };

   // Hyperlink to ICIP
   self.navigateToIcip = function () {
      if (base.criteria.prod || base.criteria.whse) {
         $state.go('icip.detail', { pk: base.criteria.prod, pk2: base.criteria.whse });
      }
   };
});

app.controller('IciaMasterCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   self.custReservations = function () {
      if (base.prod && base.whse) {
         $state.go('.customerreservation', { prod: base.prod, whse: base.whse });
      }
   };
});

app.controller('IciaDetailCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.pk || $stateParams.pk2) {
      base.criteria.prod = $stateParams.pk;
      base.criteria.whse = $stateParams.pk2 ? $stateParams.pk2 : '';

      /* Reset the stateParams so we don't get in a loop with base.initCriteria which also searches causing UI flickering */
      $stateParams.pk = '';
      $stateParams.pk2 = '';

      base.productFilter();
   }

   // Set the title after search with stateParams so base information is set properly
   self.subTitle = MessageService.get('global.product') + ': ' + base.prod + ' | ' +
              MessageService.get('global.warehouse') + ': ' + base.whse;

   self.activeTab = function () {
      base.activateWhseTab = false;
   };

   self.trackingInquiry = function () {
      $state.go('otit.master', { prod: base.criteria.prod });
   };

   self.nextReceiptInquiry = function () {
      var orderType = base.icia.lblpo.substr(0, 2);
      var orderNum = base.icia.lblpo.substr(3, 7);
      var orderSuf = base.icia.lblpo.substr(11, 2);

      if (orderType === 'PO') {
         $state.go('poip.detail', { pk: orderNum, pk2: orderSuf });
      } else if (orderType === 'WT') {
         $state.go('wtit.detail', { pk: orderNum, pk2: orderSuf });
      }
   };

});

app.controller('IciaMasterProductCtrl', function ($scope, $state, $stateParams, Constants, DataService) {
   var self = this;
   var base = $scope.base;

   base.productFilter();


   self.customerReservations = function () {
      if (base.prod && base.whse) {
         $state.go('.customerreservation', { prod: base.prod, whse: base.whse });
      }
   };
});

/* Alias: wha */
app.controller('IciaMasterWarehouseAvailabilityCtrl', function ($scope, $state, $stateParams, Constants, DataService, UserService) {
   var self = this;
   var base = $scope.base;
   self.whseAvailCriteria = { unit: base.unit, surplusonlyfl: false, cono: UserService.getCono(), whse: base.whse, prod: base.prod };

   self.getWarehouseAvailability = function () {
      DataService.post('api/ic/asicinquiry/icwhseavail', { data: self.whseAvailCriteria, busy: true }, function (data) {
         if (data) {
            self.whseAvailCollection = data;

            //User Hook (do not rename)
            if (self.getWarehouseAvailabilityContinue) {
               self.getWarehouseAvailabilityContinue();
            }
         }
      });
   };

   self.getWarehouseAvailability();

   self.whseAvailFilter = function () {
      self.getWarehouseAvailability();
   };

   self.navigateToCustomerInquiry = function (custno) {
      if (custno > 0) {
         $state.go('aric.detail', { pk: custno });
      }
   };

   self.gridConsignCustomerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         self.navigateToCustomerInquiry(currentRow.dConsignCustno);
      }
   };

   self.consignCustomerHyperlink = function () {
      self.navigateToCustomerInquiry(self.whseAvailCriteria.consigncustno);
   };
});

app.controller('IciaMasterFutureCtrl', function ($scope, $state, $stateParams, Constants, DataService, ConfigService) {
   var self = this;
   var base = $scope.base;
   self.doctypes = ['oe', 'ic', 'po', 'wt', 'kp', 'va', 'ap', 'pd'];
   self.selectedModules = 'oe,ic,po,wt,kp,va,ap,pd';
   self.icFutureTTCriteria = { doctypes: self.doctypes, prod: base.prod, whse: base.whse, recordcountlimit: ConfigService.getDefaultRecordLimit(), unit: base.unit };

   self.getIcFutureResutls = function (modules) {
      var criteria = { doctypes: modules, throughdt: self.icFutureTTCriteria.throughdt, prod: base.prod, whse: base.whse, recordcountlimit: self.icFutureTTCriteria.recordcountlimit, unit: self.icFutureTTCriteria.unit, backordonly: self.icFutureTTCriteria.backordonly };
      DataService.post('api/ic/asicwhseprod/createicfutureavailtt', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.icFutureCollection = data.createicfuturettresults;
            self.icFutureTTSingle = data.createicfuturettsingle;
            self.icFutureTTCriteria.unit = data.createicfuturettsingle.unit;
         }
      });
   };

   self.getIcFutureResutls(self.selectedModules);

   self.futureFilter = function () {
      self.selectedModules = '';
      if (self.doctypes.length > 0) {
         self.doctypes.forEach(function (mod) {
            self.selectedModules += mod + ',';
         });
      }
      if (self.doctypes.length === 0) {
         self.selectedModules = 'oe,ic,po,wt,kp,va,ap,pd';
         self.getIcFutureResutls(self.selectedModules);
      }
      else {
         self.getIcFutureResutls(self.selectedModules);
      }
   };

   self.orderNavigate = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.cModule) {
         switch (currentRow.cModule.toUpperCase()) { //ignore jslint - correct indentation
            case 'OE': //ignore jslint - correct indentation
            case 'AR': //ignore jslint - correct indentation
               $state.go('oeio.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'PO': //ignore jslint - correct indentation
            case 'AP': //ignore jslint - correct indentation
               $state.go('poip.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'WT': //ignore jslint - correct indentation
               $state.go('wtit.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'KP': //ignore jslint - correct indentation
               $state.go('kpiw.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'VA': //ignore jslint - correct indentation
               $state.go('vaif.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };
});