'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlei', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlei');

   $stateProvider.state('twlei.master.build', {
      url: '/build',
      params: {
      },
      views: {
         buildContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlei/build.json');
            },
            controller: 'TwleiBuild as dtlbuild'
         }
      }
   });

   $stateProvider.state('twlei.master.results', {
      url: '/results',
      params: {
      },
      views: {
         resultsContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlei/results.json');
            },
            controller: 'TwleiResults as dtlresults'
         }
      }
   });

});

app.controller('TwleiBaseCtrl', function ($scope, $state, ConfigService, DataService, GridService, MessageService, UserService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.empNum = UserService.getTwlUserId();
   self.problemTypes = [
      { label: MessageService.get('global.all'), value: 'ALL' },
      { label: MessageService.get('global.location'), value: 'LOCATION' },
      { label: MessageService.get('global.pallet'), value: 'PALLET' },
      { label: MessageService.get('global.quantity'), value: 'QUANTITY' },
      { label: MessageService.get('global.lot'), value: 'LOT' },
      { label: MessageService.get('global.unknown'), value: 'UNKNOWN' }
   ];
   self.recordTypes = [
      { label: MessageService.get('global.data.related'), value: 1 },
      { label: MessageService.get('global.informational.only'), value: 2 }
   ];

   self.isMaster = function () {
      return $state.is('twlei.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlei.master');
   };

   self.isDetail = function () {
      return $state.is('twlei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlei.detail');
   };

   self.checkStandardCreate = function () {
      return ((!self.grid.isNoRowSelected()) && (self.criteriaUsed.recordType !== 2));
   };

   self.checkStandardCreateAll = function () {
      return (self.grid.isNoRowSelected() && self.datasetStandard && (self.criteriaUsed.recordType !== 2));
   };

   self.checkNegCreate = function () {
      return (!self.gridNeg.isNoRowSelected());
   };

   self.checkNegCreateAll = function () {
      return (self.gridNeg.isNoRowSelected() && self.datasetNeg);
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.problemType = "ALL";
      self.criteria.recordType = 1;
      self.criteria.showZeroNegInventory = false;
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwladmin/getinvdisclist', { data: self.criteria, busy: true }, function (data) {
         self.datasetNeg = data.invdiscneginv;
         self.datasetStandard = data.invdisclistresults;
         self.lowDate = data.invdisclistsummary.lowDate;
      });
   };

   self.delete = function () {
      var selectedRows = GridService.getSelectedRecords(self.grid);  // Negative does not have a delete option
      if (selectedRows) {
         DataService.post('api/twl/astwladmin/deleteinvdisc', { data: selectedRows, busy: true }, function () {
         });
      }
      $state.go('^.master', null, { reload: '^.master' });
   };

   self.build = function () {
      $state.go('twlei.master.build');
   };

   self.showResults = function () {
      $state.go('twlei.master.results');
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwleiSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlei.master');
      }

      base.search();
   };
});

app.controller('TwleiMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('TwleiBuild', function ($filter, $scope, $state, $stateParams, $timeout, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refresh) {
      base.search();
   }

   //Nothing in the dataset
   if (!base.datasetStandard && !base.datasetNet)
   {
      $state.go('twlei.master', null, { reload: 'twlei.master' });
   }

   self.invDiscIdList = [];
   self.locationOptions = [
      { label: MessageService.get('global.all.locations.for.discrepancy.item.recommended'), value: 1 },
      { label: MessageService.get('global.just.locations.where.discrepancy.occurred'), value: 2 }
   ];
   self.subtitle = base.getSubTitle() + (base.criteriaUsed.showZeroNegInventory ? (' | ' & MessageService.get('global.negative.and.zero.inventory')) : '');

   self.isBuild = function () {
      return $state.is('twlei.master.build');
   };

   self.initializeBuildCountCriteria = function () {
      self.invDiscBuildCountCriteria = {
         transTypeEnabled: false,
         selectedRowCount: 0,
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         inventoryDisc: base.criteriaUsed.showZeroNegInventory ? true : false,
         userId: base.empNum,
         endDate: new Date(),
         transType: 'ALL',
         dLowDate: base.lowDate,
         tgDelete: false,
         startDate: base.lowDate,
         rsCountItemorLoc: 1 // All locations for items
      };

      if (base.criteriaUsed.showZeroNegInventory) {
         self.buildCycleCountsFromNegStart();
      } else {
         self.buildCycleCountsStart();
      }

   };

   self.buildCycleCountsStart = function () {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      self.invDiscBuildCountCriteria.selectedRowCount = selectedRows.length;
      if (selectedRows && selectedRows.length > 0) {
         self.invDiscIdList = selectedRows;
      }
      else if (base.datasetStandard) {
         self.invDiscBuildCountCriteria.transType = base.criteriaUsed.problemType;
         self.invDiscBuildCountCriteria.transTypeEnabled = true;
         // The build call will redetermine the list
      }
   };

   self.buildCycleCountsFromNegStart = function () {
      var selectedRows = GridService.getSelectedRecords(base.gridNeg);
      self.invDiscBuildCountCriteria.selectedRowCount = selectedRows.length;
      if (selectedRows && selectedRows.length > 0) {
         DataService.post('api/twl/astwladmin/buildinvdisccountsnegprep', { data: selectedRows, busy: true }, function (data) {
            if (data) {
               self.invDiscIdList = data;
            }
         });
      }
      else if (base.datasetNeg) {
         DataService.post('api/twl/astwladmin/buildinvdisccountsnegprep', { data: base.datasetNeg, busy: true }, function (data) {
            if (data) {
               self.invDiscIdList = data;
               self.invDiscBuildCountCriteria.selectedRowCount = selectedRows.length;
            }
         });
      }
   };

   self.buildCycleCounts = function () {
      if (self.invDiscIdList) {
         DataService.post('api/twl/astwladmin/buildinvdisccounts', { data: { invdiscbuildcountcriteria: self.invDiscBuildCountCriteria, invdiscidlist: self.invDiscIdList }, busy: true }, function (data) {
            if (data) {
               base.invdiscbuildcounts = data.invdiscbuildcounts;
               base.invdiscbuildcreated = data.invdiscbuildcreated;
               base.invdiscbuildinvprob = data.invdiscbuildinvprob;
               base.showResults();
            }
            self.invDiscIdList = [];

         });
      }
   };

   self.cancelBuildCycleCounts = function () {
      //Right now the cancel only is necessary when dealing with negative inventory
      if (base.criteriaUsed.showZeroNegInventory && self.invDiscIdList && self.invDiscIdList.length) {
         DataService.post('api/twl/astwladmin/buildinvdisccountscancel', { data: self.invDiscIdList, busy: true }, function (data) {
         });
      };
      self.invDiscIdList = [];
      return $state.go('twlei.master');
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.initializeBuildCountCriteria();

});

app.controller('TwleiResults', function ($filter, $scope, $state, $stateParams, $timeout, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   base.invdiscbuildcounts = base.invdiscbuildcounts ? base.invdiscbuildcounts : [];
   base.invdiscbuildcreated = base.invdiscbuildcreated ? base.invdiscbuildcreated : [];
   base.invdiscbuildinvprob = base.invdiscbuildinvprob ? base.invdiscbuildinvprob : [];

   var totalCreatedCollection = $filter('filter')(base.invdiscbuildcreated, { lCreated: true });
   if (totalCreatedCollection && totalCreatedCollection.length > 0) {
      self.totalCreated = totalCreatedCollection.length;
   } else {
      self.totalCreated = 0;
   }

   if ($stateParams.refresh) {
      base.search();
   }

   self.returnToMaster = function () {
      $state.go('twlei.master', null, { reload: 'twlei.master' });
   };

   self.subtitle = base.getSubTitle();

   self.isResults = function () {
      return $state.is('twlei.master.results');
   };
});