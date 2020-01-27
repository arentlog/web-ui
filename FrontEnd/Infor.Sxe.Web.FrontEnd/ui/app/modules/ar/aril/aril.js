'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ar', 'aril', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ar', 'aril');

   $stateProvider.state('aril.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aril/detail.json');
            },
            controller: 'ArilDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('aril.transactions', {
      url: '/transactions',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aril/check-transactions.json');
            },
            controller: 'ArilDetailCheckTransactionsCtrl as tran'
         }
      }
   });

   $stateProvider.state('aril.transmission', {
      url: '/transmission',
      params: { transmissionCriteria: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aril/transmission.json');
            },
            controller: 'ArilDetailCheckTransmissionCtrl as ctm'
         }
      }
   });

   $stateProvider.state('aril.transactions.writeOff', {
      url: '/write-off',
      params: { arilWoCriteria: null },
      views: {
         writeOff: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aril/write-off.json');
            },
            controller: 'ArilWriteOffCtrl as wo'
         }
      }
   });
});

app.controller('ArilBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('aril.master');
   };

   self.includesMaster = function () {
      return $state.includes('aril.master');
   };

   self.isDetail = function () {
      return $state.is('aril.detail');
   };

   self.isTransactions = function () {
      return $state.is('aril.transactions');
   };

   self.isWriteOff = function () {
      return $state.is('aril.transactions.writeOff');
   };

   self.includesDetail = function () {
      return $state.includes('aril.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/ar/asarinquiry/arilbatchload', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.arilBatchSingle = data;
            $state.go('^.detail');
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('ArilSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('aril.master');
      }

      // Get data
      base.search();
   };
});

app.controller('ArilMasterCtrl', function ($scope, $state) {
   var self = this;
   // Perform advanced search and update data set for the grid
   self.search = function () {
      $state.go('^.detail');
   };
});

app.controller('ArilDetailCtrl', function ($scope, $state, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   self.canSelectTransactionTab = false;

   self.onRecordSelection = function () {
      var record = GridService.getSelectedRecord(self.arilCheckResultsGrid);
      if (record) {
         base.criteria.fibatch = record.fibatch;
         base.criteria.custno = record.custno;
         base.criteria.checkno = record.checkno;
      }
   };

   self.transmission = function () {
      var transmissionCriteria = { fibatch: base.criteria.fibatch, fitrans: '' };
      $state.go('^.transmission', { transmissionCriteria: transmissionCriteria });
   };

   self.loadChecks = function () {
      if (base.criteria && base.criteria.fibatch) {
         DataService.post('api/ar/asarinquiry/arilcheckload', { data: base.criteria, busy: true }, function (data) {
            if (data) {
               self.arilCheckResults = data;
            }
         });
      }
   };

   self.transactions = function () {
      $state.go('^.transactions');
   };

   self.loadChecks();

});

app.controller('ArilDetailCheckTransactionsCtrl', function ($scope, $state, $stateParams, Constants, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   self.isWriteOffEnable = false;

   self.loadTransactions = function () {
      if (base.criteria && base.criteria.checkno !== 0) {
         DataService.post('api/ar/asarinquiry/ariltransload', { data: base.criteria, busy: true }, function (data) {
            if (data) {
               self.arilTransactionResults = data;
            }
         });
      }
   };

   self.onTransSelection = function () {
      var record = GridService.getSelectedRecord(self.arilTransactionResultsGrid);
      if (record) {
         self.isWriteOffEnable = record.writeoffsenabled;
         base.criteria.invno = record.invno;
         base.criteria.invsuf = record.invsuf;
         base.criteria.seqno = record.seqno;
         base.criteria.userfield = record.userfield;
      }
   };

   self.writeOff = function () {
      var requestObj = {
         fibatch: base.criteria.fibatch,
         custno: base.criteria.custno,
         invno: base.criteria.invno,
         invsuf: base.criteria.invsuf,
         checkno: base.criteria.checkno,
         userfield: base.criteria.userfield,
         isInquiry: true
      };
      $state.go('aril.transactions.writeOff', { arilWoCriteria: requestObj });
   };


   self.loadTransactions();
});

app.controller('ArilDetailCheckTransmissionCtrl', function ($scope, $state, $stateParams, Constants, DataService) {
   var self = this;
   self.criteria = $stateParams.transmissionCriteria;

   self.loadTransmission = function () {
      if (self.criteria && self.criteria.fibatch) {
         DataService.post('api/ar/asarinquiry/ariltransmissionload', { data: self.criteria, busy: true }, function (data) {
            if (data) {
               self.arilTransmissionResults = data;
            }
         });
      }
   };
   self.loadTransmission();

   self.filterTransmission = function () {
      self.loadTransmission();
   };
});

app.controller('ArilWriteOffCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   self.deTotalWO = '';
   self.arilWoCriteria = $stateParams.arilWoCriteria;

   self.arilWOLoad = function () {
      if (self.arilWoCriteria) {
         DataService.post('api/ar/asarinquiry/arilwoload', { data: self.arilWoCriteria, busy: true }, function (data) {
            if (data) {
               self.deTotalWO = data.deTotalWO;
               self.arilWoResults = data.arilworesults;
            }
         });
      }
   };
   self.arilWOLoad();

});



