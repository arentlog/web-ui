'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlerp', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlerp');
});

app.controller('TwlerpBaseCtrl', function ($state, DataService, MessageService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.isMaster = function () {
      return $state.is('twlerp.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlerp.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwladmin/replenishmentsloadpending', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };
});

app.controller('TwlerpSearchCtrl', function ($scope, $state, DataService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Sets defaults in search tab
   base.userCoNum = UserService.getTwlCompany();
   base.userWhNum = UserService.getTwlWarehouse();
   base.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();

   self.setDefaults = function () {
      base.criteria.coNum = base.userCoNum;
      base.criteria.whNum = base.userWhNum;
      base.criteria.showTopOffs = true;
      base.criteria.showConsolidations = true;
      base.criteria.showOther = false;
   };

   self.setDefaults();

   self.clear = function () {
      // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
      Utils.clearObject(criteria);

      self.setDefaults();
   };

   self.topOffChange = function () {
      if (!base.criteria.showTopOffs && !base.criteria.showOther) {
         base.criteria.showConsolidations = true;
      }
   };

   self.consolidateChange = function () {
      if (!base.criteria.showConsolidations && !base.criteria.showOther) {
         base.criteria.showTopOffs = true;
      }
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twlerp.master');
      }

      base.search();
   };
});

app.controller('TwlerpMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.statusFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) {
            case 'NON-STD':
               return $translate.instant('global.non.standard');
            case 'PUTAWAY':
               return $translate.instant('global.putaway');
            case 'STEP 2':
               return $translate.instant('global.step.2');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.typeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) {
            case 'TOP OFF':
               return $translate.instant('global.top.off');
            case 'CSLDTN':
               return $translate.instant('global.consolidation');
            case 'WORKORD':
               return $translate.instant('global.work.order');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.clearPending = function () {
      // You do not need the all versus selected from the Online because the user can easily select all records
      var iCountNonBlankStatus = 0;
      var clearCriteria = [];
      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         MessageService.yesNo('global.question', 'question.do.you.want.to.clear.selected.replenishments', function () {
            records.forEach(function (record) {
               clearCriteria.push({ movemstRowID: record.movemstRowID });
               if (record.currstatus) {
                  iCountNonBlankStatus++;
               }
            });
            if (clearCriteria) {
               if (iCountNonBlankStatus) {
                  MessageService.info('global.information', 'message.only.replenishments.with.a.blank.status.will.be.cleared');
               }
               DataService.post('api/twl/astwladmin/replenishmentsclear', { data: clearCriteria, busy: true }, function () {
                  MessageService.info('global.information', 'message.operation.completed.successfully');
               });
            }
            $state.go('twlerp.master', { refreshSearch: true }, { reload: 'twlerp.master' });
         });
      }
   };

});