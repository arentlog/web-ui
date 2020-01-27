'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlecc', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlecc');

   $stateProvider.state('twlecc.master.ccemployees', {
      url: '/cycle-count-employees?company&warehouse&waveID',
      params: {
         totalCount: null
      },
      views: {
         employeesContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlecc/ccemployees.json');
            },
            controller: 'TwleccCcEmployees as dtlemp'
         }
      }
   });

   $stateProvider.state('twlecc.master.cclots', {
      url: '/cycle-count-lots',
      params: {
         ccItems: [],
         ccImpact: null
      },
      views: {
         lotsContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlecc/cclots.json');
            },
            controller: 'TwleccCcLots as dtllot'
         }
      }
   });

});

app.controller('TwleccBaseCtrl', function ($state, $timeout, $translate, DataService, GridService, MessageService, UserService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.isMaster = function () {
      return $state.is('twlecc.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlecc.master');
   };

   self.manualEntryTypeLabel = MessageService.get('global.items');

   // Sets defaults
   self.setDefaults = function () {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.empNum = UserService.getTwlUserId();

      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.selectionType = 'I';
      self.criteria.abc = 'ALL';
      self.criteria.itemType = '';
      // self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit()
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + self.criteriaUsed.whNum;
   };

   self.clearScreen = function () {
      self.criteria = {};
      self.itemsDataset = [];
      self.locationsDataset = [];
      self.setDefaults();
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {

	  // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
	  // for more than just searching, and we need the used criteria (not the latest which the user might change)
	  self.criteriaUsed = angular.copy(self.criteria);

      if (self.criteria.selectionType === 'I') {
         DataService.post('api/twl/astwladmin/getccitems', { data: self.criteria, busy: true }, function (data) {
            self.itemsDataset = data.ccitems;
            self.manualSelectionAvailable = true;
         });
         self.manualEntryTypeLabel = MessageService.get('global.items');
      }
      else {
         DataService.post('api/twl/astwladmin/getcclocations', { data: self.criteria, busy: true }, function (data) {
            self.locationsDataset = data.cclocations;
            self.manualSelectionAvailable = true;
         });
         self.manualEntryTypeLabel = MessageService.get('global.locations');
      }
   };

   self.buildItems = function (ccItemLots, ccItems, ccImpact) {
      // records is exactly what we need
      DataService.post('api/twl/astwladmin/buildcyclecountsforitems', { data: { ccitemlots: ccItemLots, ccitems: ccItems, ccimpact: ccImpact }, busy: true }, function (data) {
         MessageService.yesNo('global.question', $translate.instant('message.created.cycle.count.wave') + '<br><br>' +
                       $translate.instant('global.wave') + ": " + data.wave + '<br>' +
                       $translate.instant('global.count') + ": " + data.count + '<br><br>' +
                       $translate.instant('question.do.you.want.to.assign.employees'), function () {
                          // Yes processing - send user to employee assignment
                           $state.go('twlecc.master.ccemployees', {
                              company: self.criteriaUsed.coNum,
                              warehouse: self.criteriaUsed.whNum,
                              waveID: data.wave,
                              totalCount: data.count
                           });
                        });
      });
      self.clearScreen();
      $state.go('twlecc.master', { refreshSearch: false });
   };

   self.buildLocations = function (ccLocations, ccImpact) {
      // records is exactly what we need
      DataService.post('api/twl/astwladmin/buildcyclecountsforlocations', { data: { cclocations: ccLocations, ccimpact: ccImpact }, busy: true }, function (data) {
         MessageService.yesNo('global.question', $translate.instant('message.created.cycle.count.wave') + '<br><br>' +
                       $translate.instant('global.wave') + ": " + data.wave + '<br>' +
                       $translate.instant('global.count') + ": " + data.count + '<br><br>' +
                       $translate.instant('question.do.you.want.to.assign.employees'), function () {
                           // Yes processing - send user to employee assignment
                           $state.go('twlecc.master.ccemployees', {
                              company: self.criteriaUsed.coNum,
                              warehouse: self.criteriaUsed.whNum,
                              waveID: data.wave,
                              totalCount: data.count
                           });
                        });
      });
      self.clearScreen();
      $state.go('twlecc.master', { refreshSearch: false });
   };

   self.generateDailyCycleCount = function () {
      MessageService.yesNo('global.question', $translate.instant('question.generate.daily.cycle.count'),
         function () {
            DataService.get('api/twl/astwladmin/rundailycccount/' + self.criteriaUsed.coNum.trim() + '/' + self.criteriaUsed.whNum, function (data) {
               if (data) {
                  MessageService.alert(data);
               }
            });
         });
   };
});

app.controller('TwleccSearchCtrl', function ($scope, $state, ConfigService, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   base.setDefaults();

   self.selectionTypes = [
      { label: MessageService.get('global.item'), value: 'I' },
      { label: MessageService.get('global.location'), value: 'L' }
   ];
   self.abcTypes = [
      { label: MessageService.get('global.all'), value: 'ALL' },
      { label: MessageService.get('global.abc.a'), value: 'A' },
      { label: MessageService.get('global.abc.b'), value: 'B' },
      { label: MessageService.get('global.abc.c'), value: 'C' },
      { label: MessageService.get('global.abc.d'), value: 'D' }
   ];
   self.itemTypes = [
      { label: MessageService.get('global.all'), value: '' },
      { label: MessageService.get('global.stock'), value: 'STOCK' }
   ];

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.setDefaults();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twlecc.master');
      }

      base.search();
   };
});

app.controller('TwleccMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.selectManualEntries = function () {
      var isInManualList = false;
      // Replace 'line feed' or 'spaces and comma' or 'comma and spaces' with comma before comparing
      base.manualEntries = base.manualEntries.replace("\n", ",").replace(/\s{1,},/gi, ",").replace(/,\s{1,}/gi, ",");
      if (base.criteria.selectionType === 'I') {
         base.itemGrid.settings.dataset.forEach(function (record) {
            // See if exists in the list already
            isInManualList = ("," + base.manualEntries.toLowerCase() + ",").match(("," + record.absNum.toLowerCase() + ","));
            if (isInManualList) {
               //Select if it exists in the list
               base.itemGrid.selectRow(base.itemsDataset.indexOf(record));
            }
         });
      }
      else {
         base.locationGrid.settings.dataset.forEach(function (record) {
            // See if exists in the list already
            isInManualList = ("," + base.manualEntries.toLowerCase() + ",").match(("," + record.binNum.toLowerCase() + ","));
            if (isInManualList) {
               //Select if it exists
               base.locationGrid.selectRow(base.locationsDataset.indexOf(record));
            }
         });
      }
   };

   self.build = function () {
      var impactCriteria = {
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         empNum: base.empNum
      };
      var selectedList = [];

      //Build Items
      if (base.criteriaUsed.selectionType === 'I') {
         var iRecords = GridService.getSelectedRecords(base.itemGrid);
         if (iRecords) {
            iRecords.forEach(function (record) {
               selectedList.push(record);
            });
            if (selectedList) {
               DataService.post('api/twl/astwladmin/getcyclecountimpactforitems', { data: { ccbuildimpactcriteria: impactCriteria, ccitems: selectedList }, busy: true }, function (impact) {
                  if (impact.iNumInv === 0 && impact.iNumItems === 0) {
                     MessageService.error('global.error', ($translate.instant('message.error.cycle.count.has.no.impact') + '.<br><br>' +
                         $translate.instant('message.please.select.alternate.items') + '.<br><br>' +
                         $translate.instant('message.counts.already.in.other.cycle.count.waves') + '<br>' +
                         '-' + $translate.instant('global.inventory') + ': ' + impact.iInvInWv + '<br>' +
                         '-' + $translate.instant('global.items') + ': ' + impact.iItmInWv + '<br><br>' +
                         $translate.instant('error.cycle.count.was.not.created.for.items')));
                  }
                  else {
                     MessageService.yesNo('global.question',
                         ($translate.instant('message.setting.the.cycle.count.as.you.have.entered.will.assign.cycle.counts.as.follows') +
                         ':<br><br>' +
                         $translate.instant('message.counts.not.currently.part.of.any.other.cycle.count.wave') + '<br>' +
                         '-' + $translate.instant('global.inventory') + ': ' + impact.iNumInv + '<br>' +
                         '-' + $translate.instant('global.items') + ': ' + impact.iNumItems + '<br><br>' +
                         $translate.instant('message.counts.already.in.other.cycle.count.waves') + '<br>' +
                         '-' + $translate.instant('global.inventory') + ': ' + impact.iInvInWv + '<br>' +
                         '-' + $translate.instant('global.items') + ': ' + impact.iItmInWv + '<br><br>' +
                         $translate.instant('message.do.you.want.to.continue.building.the.cycle.count')),
                     function () {
                        if (!impact.lotsExist) {
                           base.buildItems([], selectedList, impact);
                        }
                        else {
                           MessageService.yesNo('global.question',
                            ($translate.instant('message.lot.item.detected.for.cycle.count')),
                           function () {
                              // Yes processing - all lots selected by default - continue with the build
                              base.buildItems([], selectedList, impact);
                           }, function () {
                              // No processing - send user to lot selection screen to select individual lots
                              $state.go('twlecc.master.cclots', { ccItems: selectedList, ccImpact: impact });
                           });
                        }
                     });
                  }
               });
            }
         }
      }
      else { //if (base.criteriaUsed.selectionType === 'L')
         var lRecords = GridService.getSelectedRecords(base.locationGrid);
         if (lRecords) {
            lRecords.forEach(function (record) {
               selectedList.push(record);
            });
            if (selectedList) {
               DataService.post('api/twl/astwladmin/getcyclecountimpactforlocations', { data: { ccbuildimpactcriteria: impactCriteria, cclocations: selectedList }, busy: true }, function (impact) {
                  if (impact.iNumInv === 0 && impact.iNumItems === 0) {
                     MessageService.error('global.error', ($translate.instant('message.error.cycle.count.has.no.impact') + '.<br><br>' +
                         $translate.instant('message.please.select.alternate.items') + '.<br><br>' +
                         $translate.instant('message.counts.already.in.other.cycle.count.waves') + '<br>' +
                         '-' + $translate.instant('global.items') + ': ' + impact.iInvInWv + '<br>' +
                         '-' + $translate.instant('global.locations') + ': ' + impact.iBinInWv + '<br>' +
                         '-' + $translate.instant('global.empty.locations') + ': ' + impact.iEmptyInWave + '<br><br>' +
                         $translate.instant('error.cycle.count.was.not.created.for.locations')));
                  }
                  else if (!impact.lSerialOkay) {
                     MessageService.error('global.error', ($translate.instant('message.not.all.serial.selected.for.cycle.count') + '.<br><br>' +
                         $translate.instant('global.item') + ': ' + impact.cBadSerialItem + '<br><br>' +
                         $translate.instant('error.cycle.count.can.not.be.created.for.locations')));
                  }
                  else {
                     MessageService.yesNo('global.question',
                         ($translate.instant('message.setting.the.cycle.count.as.you.have.entered.will.assign.cycle.counts.as.follows') +
                          ':<br><br>' +
                          $translate.instant('message.counts.not.currently.part.of.any.other.cycle.count.wave') + '<br>' +
                          '-' + $translate.instant('global.inventory') + ': ' + impact.iNumInv + '<br>' +
                          '-' + $translate.instant('global.locations') + ': ' + impact.iNumItems + '<br>' +
                          '-' + $translate.instant('global.empty.locations') + ': ' + impact.iEmptyBins + '<br><br>' +
                          $translate.instant('message.counts.already.in.other.cycle.count.waves') + '<br>' +
                          '-' + $translate.instant('global.items') + ': ' + impact.iInvInWv + '<br>' +
                          '-' + $translate.instant('global.locations') + ': ' + impact.iBinInWv + '<br>' +
                          '-' + $translate.instant('global.empty.locations') + ': ' + impact.iEmptyInWave + '<br><br>' +
                          $translate.instant('message.do.you.want.to.continue.building.the.cycle.count')),
                         function () {
                              base.buildLocations(selectedList, impact);
                           }
                     );
                  }
               });
            }
         }
      }
   }; // end build

});

app.controller('TwleccCcEmployees', function ($filter, $scope, $state, $stateParams, $timeout, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   var company = $stateParams.company;
   var warehouse = $stateParams.warehouse;
   self.waveID = $stateParams.waveID;
   self.totalCount = $stateParams.totalCount;
   self.fullEmployeeDataset = [];
   self.availableEmployees = [];
   self.defaultSelectedCriteria = [];
   self.selectedEmployees = [];
   self.employeeList = '';

   //If the user hits refresh twlecc will be null, go back to detail window
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
      return $state.is('twlecc.master.ccemployees');
   };

   self.returnToDetail = function () {
      $state.go('^');
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
      $state.go('twlecc.master');
   };

});

app.controller('TwleccCcLots', function ($scope, $state, $timeout, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   this.dataset = [];

   var ccItems = $stateParams.ccItems;
   var ccImpact = $stateParams.ccImpact;

   //If the user hits refresh ccitems will be empty, go back to master - there is no recovery
   if (ccItems.length === 0) {
      $state.go('twlecc.master', { refreshSearch: true }, { reload: 'twlecc.master' });
   } else {
      DataService.post('api/twl/astwladmin/getccitemlots', {
         data: ccItems,
         busy: true
      }, function (data) {
         self.dataset = data;

         // Wait until Angular's update cycle completes (which loads the data into the grid) before selecting all rows (select all rows)
         $timeout(function () {
            self.grid.selectAllRows();
         });
      });
   }

   self.isCcLots = function () {
      return $state.is('twlecc.master.cclots');
   };

   self.returnToMaster = function () {
      $state.go('twlecc.master', { refreshSearch: true }, { reload: 'twlecc.master' });
   };

   self.buildFromLots = function () {

      var selectedLots = [];

      ccImpact.buildTypeLot = 'Specified';  // The user manually selects the lots
      var records = GridService.getSelectedRecords(self.grid);
      if (records) {
         records.forEach(function (record) {
            selectedLots.push(record);
         });
         // Yes - we need to run even if no lots are selected because non-lot items need building
         base.buildItems(selectedLots, ccItems, ccImpact);
      }
   };

});
