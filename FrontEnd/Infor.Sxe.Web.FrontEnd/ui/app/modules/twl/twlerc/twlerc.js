'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlerc', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlerc');
});

app.controller('TwlercBaseCtrl', function ($state, $translate, DataService, MessageService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.lConsolidationType = false;
   self.infoMessage = '';

   self.isMaster = function () {
      return $state.is('twlerc.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlerc.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      self.criteria.optionType = 0;
      if (self.criteria.optionTypeText === '1') {
         self.criteria.optionType = 1;
      }
      DataService.post('api/twl/astwladmin/replenishmentsloadother', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.replother;
         self.lConsolidationType = data.lConsolidationType;
         self.infoMessage = ((self.lConsolidationType === true) ? $translate.instant('global.consolidation.using.group') : $translate.instant('global.consolidation.using.zone'));
      });
   };
});

app.controller('TwlercSearchCtrl', function ($scope, $state, DataService, MessageService, UserService, Utils) {
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
      base.criteria.optionTypeText = '0';
      base.criteria.optionType = 0;
   };

   /* Move Items Back to the Item's Area=0, Consolidate Multiple Inventory Records=1 */
   self.optionTypes = [
      { label: MessageService.get('global.move.items.back'), value: '0' },
      { label: MessageService.get('global.consolidate.multiple'), value: '1' }
   ];

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
         $state.go('twlerc.master');
      }

      base.search();
   };
});


app.controller('TwlercMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.buildOther = function () {

      // You do not need the all versus selected from the Online because the user can easily select all records
      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         MessageService.yesNo('global.question', 'question.do.you.want.to.build.consolidations.for.the.selected.rows', function () {
            // records is exactly what we need
            DataService.post('api/twl/astwladmin/replenishmentsbuildother', { data: records, busy: true }, function () {
               MessageService.info('global.information', 'message.operation.completed.successfully');
            });
            $state.go('twlerc.master', { refreshSearch: true }, { reload: 'twlerc.master' });
         });
      }
   };

});
