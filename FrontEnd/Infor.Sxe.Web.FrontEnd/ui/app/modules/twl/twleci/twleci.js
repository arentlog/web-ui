'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twleci', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twleci');

   $stateProvider.state('twleci.master.cctransactions', {
      url: '/cycle-count-transactions',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twleci/cctransactions.json');
            },
            controller: 'TwleciTransactionsInquiryCtrl as dtlt'
         }
      }
   });

   $stateProvider.state('twleci.master.ccinvdisc', {
      url: '/cycle-count-inventory-discrepancy',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twleci/ccinvdisc.json');
            },
            controller: 'TwleciInvDiscInquiryCtrl as dtli'
         }
      }
   });

   $stateProvider.state('twleci.master.ccemployees', {
      url: '/cycle-count-employees?company&warehouse&waveID',
      params: {
      },
      views: {
         employeesContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twleci/ccemployees.json');
            },
            controller: 'twleciCcEmployees as dtlemp'
         }
      }
   });
});

app.controller('TwleciBaseCtrl', function ($scope, $state, DataService, MessageService, UserService) {
   var self = this;
   self.maxLabels = -9;
   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.empNum = UserService.getTwlUserId();

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.isMaster = function () {
      return $state.is('twleci.master');
   };

   self.includesMaster = function () {
      return $state.includes('twleci.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {

	   var isThereAlready = false;

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      self.criteria.cycleIdList = self.criteria.waveId;

      if (self.criteria.cycleList) {
         var str_array = self.criteria.cycleList.split(',');

         for (var i = 0; i < str_array.length; i++) {
            // Trim the excess whitespace.
            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
            // See if exists in the list already
            isThereAlready = ("," + self.criteria.cycleIdList + ",").match(("," + str_array[i] + ","));
            if (!isThereAlready) {
               self.criteria.cycleIdList = self.criteria.cycleIdList ? (self.criteria.cycleIdList + ',' + str_array[i]) : str_array[i];
            }
         }
      }
      DataService.post('api/twl/astwlinquiry/getccwavedetail', { data: self.criteria, busy: true }, function (outdata) {
         self.summary = outdata.ccinquirysummary;
         self.dataset = outdata.inventorylistresults;
         self.isSinglewave = outdata.ccinquirysummary.id ? true : false;
         if (outdata.lMoreRecords) {
            MessageService.alert('global.record.count.limit.has.been.reached');
         }
      });
   };
});

app.controller('TwleciSearchCtrl', function ($scope, $state, ConfigService, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.setDefaults = function () {
      base.criteria.coNum = base.userCoNum;
      base.criteria.whNum = base.userWhNum;
      base.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   self.setDefaults();

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      self.setDefaults();
      base.search();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twleci.master');
      }

      base.search();
   };

   // When customer lookup value is selected, redirect to detail screen since we have the desired customer
   self.inventorySelected = function (args) {
      if (args.rowId) {
         $state.go('twleci.detail', { id: args.rowId });
      }
   };
});

app.controller('TwleciMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.showTransactions = function () {
      $state.go('twleci.master.cctransactions');
   };

   self.showInvDisc = function () {
      $state.go('twleci.master.ccinvdisc');
   };

   self.setEmployees = function () {
      $state.go('twleci.master.ccemployees', { company: base.criteriaUsed.coNum, warehouse: base.criteriaUsed.whNum, waveID: base.summary.id });
   };

   self.clearCycleCounts = function () {
      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         MessageService.yesNo('global.question', 'question.do.you.want.to.clear.selected.cycle.counts', function () {
            DataService.post('api/twl/astwladmin/clearcyclecounts', { data: records, busy: true }, function () {
               MessageService.info('global.information', 'message.operation.completed.successfully');
            });
            $state.go('twleci.master', { refreshSearch: true }, { reload: 'twleci.master' });
         });
      }
   };

});

//Inquiry - Inv Discrepancies Detail
app.controller('TwleciInvDiscInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.summary) {
      $state.go('^');
   } else {
      self.subtitle = base.getSubTitle() + ' | ' + MessageService.get('global.id') + ': ' + base.summary.id;
      DataService.post('api/twl/astwlinquiry/getccinvdiscrepancies', {
         data: {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            cycleWaveId: base.summary.id
         },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailInvDisc = function () {
      return $state.is('twleci.master.ccinvdisc');
   };

   self.returnToMaster = function () {
      return $state.go('twleci.master');
   };

});

//Inquiry - Transaction Detail
app.controller('TwleciTransactionsInquiryCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.displayTypes = [
      //{ label: MessageService.get('global.all'), value: '' },
      { label: MessageService.get('global.matching'), value: 'match' },
      { label: MessageService.get('global.discrepancy'), value: 'disc' }
   ];

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.summary) {
      $state.go('^');
   } else {
      self.subtitle = base.getSubTitle() + ' | ' + MessageService.get('global.id') + ': ' + base.summary.id;
      DataService.post('api/twl/astwlinquiry/getcctransactions', {
         data: {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            cycleWaveId: base.summary.id
         },
         busy: true
      }, function (data) {
         self.dataset = data.ccinvtrans;
         self.fulldataset = data.ccinvtrans;
         self.summary = data.ccinvtranssummary;
      });
   }

   self.isDetailTransactions = function () {
      return $state.is('twleci.master.cctransactions');
   };

   self.returnToMaster = function () {
      return $state.go('twleci.master');
   };

   self.changeGridDisplay = function () {
      //Filter the dataset
      if (self.gridDisplay === 'match') {
         self.dataset = $filter('filter')(self.fulldataset, { 'isDisc': false });
      } else if (self.gridDisplay === 'disc') {
         self.dataset = $filter('filter')(self.fulldataset, { 'isDisc': true });
      } else {
         self.dataset = self.fulldataset;
      }
   };

});

app.controller('twleciCcEmployees', function ($filter, $scope, $state, $stateParams, $timeout, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   var company = $stateParams.company;
   var warehouse = $stateParams.warehouse;
   self.waveID = $stateParams.waveID;
   self.fullEmployeeDataset = [];
   self.availableEmployees = [];
   self.selectedEmployees = [];
   self.employeeList = '';

   //If the user hits refresh twleci will be null, go back to detail window
   if (!self.waveID) {
      $state.go('^');
   } else {
      DataService.get('api/twl/astwladmin/getccemployees/' + company.trim() + '/' + warehouse.trim() + '/' + self.waveID.toString(), { busy: true }, function (data) {
         if (data) {
            self.fullEmployeeDataset = data;
            self.fullEmployeeDataset.forEach(function (record) {
               self.availableEmployees.push({ value: record.empNum, label: record.name ? (record.name + ' (' + record.empNum + ')') : record.empNum });
               if (record.selected) {
                  self.employeeList = self.employeeList ? (self.employeeList + ',' + record.empNum) : record.empNum;
               }
            });
            self.selectedEmployees = self.employeeList.split(',');
         }
         $timeout(function () {
            self.availableEmployees = $filter('orderBy')(self.availableEmployees, 'label');
         });
      });
   }

   self.isCcEmployees = function () {
      return $state.is('twleci.master.ccemployees');
   };

   self.returnToMaster = function () {
      return $state.go('twleci.master');
   };

   self.assignEmployees = function () {
      self.fullEmployeeDataset.forEach(function (record) {
         var found = $filter('filter')(self.selectedEmployees, record.empNum, true);
         if (found && found.length > 0) {
            record.selected = true;
         } else {
            record.selected = false;
         }
      });
      DataService.post('api/twl/astwladmin/setccemployees', { data: { company: company, warehouse: warehouse, cyclewave: self.waveID, ccemployees: self.fullEmployeeDataset }, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };

});