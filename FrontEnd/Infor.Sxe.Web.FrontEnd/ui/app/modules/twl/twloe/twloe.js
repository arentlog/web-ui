'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('twl', 'twloe', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twloe');

   $stateProvider.state('twloe.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twloe/detail.json');
            },
            controller: 'TwloeDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('twloe.master.waveemployees', {
      url: '/wave-employees',
      params: {
         criteria: {},
         function: ''
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/shared/waveemployees/waveemployees.json');
            },
            controller: 'TwlWaveEmployeesCtrl as dtlwemp'
         }
      }
   });
});

app.controller('TwloeBaseCtrl', function ($state, ConfigService, DataService, GridService, MessageService, UserService) {
   var self = this;
   self.criteria = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.userId = UserService.getTwlUserId();

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twloe.master');
   };

   self.includesMaster = function () {
      return $state.includes('twloe.master');
   };

   self.isDetail = function () {
      return $state.is('twloe.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twloe.detail');
   };

   self.isAssignWaveEmployees = function () {
      return $state.is('twloe.master.waveemployees');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.batchid = 0;
      self.criteria.viewtype = 'both';
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);
      self.criteriaUsed.searchType = 'standard';

      self.searchGetData(self.criteria);

   };

   self.searchGetData = function (searchCriteria) {
      if (searchCriteria) {
         // Get settings needed throughout the order manager function
         DataService.post('api/twl/astwladmin/getwavepickassignments', { data: searchCriteria, busy: true }, function (data) {
            self.waveDataset = data.wavepickwaves;
            self.pickDataset = data.wavepickpicks;
         });
      }
   };

   self.setEmployeesWave = function () {
      self.setEmployees(GridService.getSelectedRecord(self.waveGrid));
   };

   self.setEmployees = function (e) {
      var criteria = {};
      var record = {};
      if (e) {
         record = e;
      }
      else {
         record = GridService.getSelectedRecord(self.pickGrid);
      }
      if (record && record.batchid) {
         criteria = {
            coNum: self.criteriaUsed.coNum,
            whNum: self.criteriaUsed.whNum,
            batchid: record.batchid
         };
         // Go to the employee assignment for the batch/wave
         $state.go('twloe.master.waveemployees', { criteria: criteria });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwloeSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twloe.master');
      }

      // Get data
      base.search();
   };
});

app.controller('TwloeMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.order) {
         $state.go('twlooi.detail', { pk: currentRow.order, pk2: currentRow.orderSuffix, pk3: base.criteriaUsed.coNum, pk4: base.criteriaUsed.whNum });
      }
   };

});
