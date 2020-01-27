'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ic', 'icir', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icir', { params: { custno: undefined, whse: undefined, prod: undefined } });

   $stateProvider.state('icir.detail', {
      url: '/detail',
      params: {
         records: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icir/detail.json');
            },
            controller: 'IcirDetailCtrl as dtl'
         }
      }
   });
});

app.controller('IcirBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = { custno: '', recoverydt: '', shipto: '' };

   self.isCreateOrdersButtonEnabled = '';

   self.isMaster = function () {
      return $state.is('icir.master');
   };

   self.includesMaster = function () {
      return $state.includes('icir.master');
   };

   self.isDetail = function () {
      return $state.is('icir.detail');
   };

   self.includesDetail = function () {
      return $state.includes('icir.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/ic/asicinquiry/icirretrieve', { data: self.criteria, busy: true }, function (data) {
         if (data.icirresults.length > 0) {
            self.dataset = data.icirresults;
            self.icirresults = data.icirresults;
            self.isCreateOrdersButtonEnabled = true;
         }
         else {
            self.icirresults = [];
            self.dataset = [];
            self.isCreateOrdersButtonEnabled = false;
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('IcirSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('icir.master');
      }

      // Get data
      base.search();
   };
});

app.controller('IcirMasterCtrl', function ($scope, $state, ConfigService, DataService) {
   var self = this;
   var base = $scope.base;
   self.icir = {};
   self.icirFilteredResults = [];
   self.icirQUOrdersTemp = [];
   self.icirQUOrders = [];

   self.filter = function () {
      if (self.icir.product && self.icir.warehouse) {
         self.icirFilteredResults = JSLINQ(base.dataset).Where(function (item1) { return item1.prod === self.icir.product && item1.whse === self.icir.warehouse; }).ToArray();
         self.getIcirResults();
      }
      else if (self.icir.product) {
         self.icirFilteredResults = JSLINQ(base.dataset).Where(function (item1) { return item1.prod === self.icir.product; }).ToArray();
         self.getIcirResults();
      }
      else if (self.icir.warehouse) {
         self.icirFilteredResults = JSLINQ(base.dataset).Where(function (item1) { return item1.whse === self.icir.warehouse; }).ToArray();
         self.getIcirResults();
      }
      else {
         base.icirresults = base.dataset;
      }
   };

   self.getIcirResults = function () {
      if (self.icirFilteredResults.length > 0) {
         base.isCreateOrdersButtonEnabled = true;
         base.icirresults = [];
         self.icirFilteredResults.forEach(function (icir) {
            base.icirresults.push(icir);
         });
      }
      else {
         base.icirresults = [];
         base.isCreateOrdersButtonEnabled = false;
      }
   };

   self.onProdInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk2: currentRow.whse, pk: currentRow.prod });
      }
   };

   self.onQuantityInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icia.detail', { pk2: currentRow.whse, pk: currentRow.prod }, { reload: 'icia.detail' });
      }
   };

   self.onPriceInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('oeip.detail', { pk: currentRow.custno, pk3: currentRow.prod, pk2: currentRow.whse });
      }
   };

   self.createOrders = function () {
      var icirQUOrders = new JSLINQ(base.icirresults).Where(function (icirresults) { return icirresults.displayfl === true; }).ToArray();
      if (icirQUOrders.length > 0) {
         self.icirQUOrdersTemp = [];
         icirQUOrders.forEach(function (quorders) {
            self.icirQUOrdersTemp.push(quorders);
         });
         var timeoutinMillSeconds = 60000;
         if (icirQUOrders.length > 20) {
            timeoutinMillSeconds = (Math.round(icirQUOrders.length / 20) + 1) * 60000;
         }
         DataService.post('api/ic/asicinquiry/icirquordersbatch', { timeout: timeoutinMillSeconds, data: self.icirQUOrdersTemp, busy: true }, function (data) {
            if (data.length > 0) {
               self.icirQUOrders = data;
               $state.go('^.detail', {
                  records: self.icirQUOrders
               });
            }
         });
      }
   };
});

app.controller('IcirDetailCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   self.icirquorders = [];

   self.dataset = $stateParams.records;
});
