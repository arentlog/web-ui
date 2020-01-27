'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlcabc', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlcabc');
});

app.controller('TwlcabcBaseCtrl', function ($state, DataService, MessageService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.classificationUsingMessage = '';

   self.recalcTypes = [
      { label: MessageService.get('global.item.activity'), value: 'Q' },
      { label: MessageService.get('global.bin.hits'), value: 'Z' }
   ];

   self.intervalTypes = [
      { label: MessageService.get('global.days'), value: 'D' },
      { label: MessageService.get('global.weeks'), value: 'W' },
      { label: MessageService.get('global.months'), value: 'M' }
   ];

   self.isMaster = function () {
      return $state.is('twlcabc.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlcabc.master');
   };

   self.setChangingLabels = function () {
      if (self.twlcabc.recalcType) {
         self.abcPercentLabel = self.twlcabc.recalcType.toUpperCase() === 'Q' ? MessageService.get('global.percent.by.item') : MessageService.get('global.percent.by.bin');
      }
   };

   self.changeReportSetting = function () {
      if (!self.twlcabc.toggleReport) {
         self.twlcabc.toggleInclude = false;
         self.twlcabc.toggleUpdate = false;
      }
   };

   self.calculatePercents = function () {
      self.abcTotalPercent = self.twlcabc.aCountPercent + self.twlcabc.bCountPercent + self.twlcabc.cCountPercent + self.twlcabc.dCountPercent;
   };

   self.hasChanged = function () {
      for (var propName in self.twlcabcbefore) {
         if (self.twlcabcbefore[propName] !== self.twlcabc[propName]) {
            return true;
         }
      }
      return false;
   };

   self.calculatePendingABC = function () {
      if (self.hasChanged()) {
         MessageService.error('global.error', 'error.please.save.changes.first');
      } else {
         $state.go('twlrinv-abcpending', { });
      }
   };

   self.applyPendingABC = function () {
      if (self.hasChanged()) {
         MessageService.error('global.error', 'error.please.save.changes.first');
      } else {
         MessageService.okCancel('global.question', 'question.are.you.sure.you.want.to.overwrite.abc.classification', function () {
            DataService.post('api/twl/astwlsetup/abcapplypending', { data: { coNum: self.criteriaUsed.coNum, whNum: self.criteriaUsed.whNum }, busy: true }, function () {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            });
         });
      }
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.setUsingMessage = function () {
      if (self.twlcabc.recalcType === 'Q') {
         self.classificationUsingMessage = '';
      } else {
         self.classificationUsingMessage = MessageService.get('message.classification.is.calculated.using.pick.activity.from.the.past.xxtimeframe') +
     ' ' + self.twlcabc.historyInterval + ' ' + self.historyIntervalToString;
      }
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwlsetup/getabcclassification', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.twlcabcbefore = JSON.parse(JSON.stringify(data));  // A copy rather than a pointer to the same dataset
            self.twlcabc = data;
            self.twlcabc.recalcType = self.twlcabc.recalcType.toUpperCase();
            self.twlcabc.recalcTimeframe = self.twlcabc.recalcTimeframe.toUpperCase();
            self.historyIntervalToString = '';
            switch (self.twlcabc.historyTimeframe.toUpperCase()) {
               case 'D':
                  self.historyIntervalToString = MessageService.get('global.days');
                  break;
               case 'W':
                  self.historyIntervalToString = MessageService.get('global.weeks');
                  break;
               case 'M':
                  self.historyIntervalToString = MessageService.get('global.months');
                  break;
               default:
                  self.historyIntervalToString = '';
            }
            self.setUsingMessage();
         } else {
            self.twlcabcbefore = [];
            self.twlcabc = [];
            self.setUsingMessage();
         }
         self.calculatePercents();
         self.setChangingLabels();
      });
   };

   self.calculateNextRunDate = function () {
      DataService.post('api/twl/astwlsetup/setabcrundate', { data: self.twlcabc, busy: true }, function (data) {
         if (data) {
            self.twlcabc.nextRecalcDate = data.nextRecalcDate;
         }
      });
   };

});

app.controller('TwlcabcSearchCtrl', function ($scope, $state, DataService, UserService, Utils) {
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
   };

   self.setDefaults();

   self.clear = function () {
      // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
      Utils.clearObject(criteria);
      self.setDefaults();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twlcabc.master');
      }

      base.search();
   };
});


app.controller('TwlcabcMasterCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Save
   self.submit = function () {

      DataService.post('api/twl/astwlsetup/updateabcclassification', { data: base.twlcabc, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

