'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlert', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlert');
});

app.controller('TwlertBaseCtrl', function ($state, DataService, MessageService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.isMaster = function () {
      return $state.is('twlert.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlert.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwladmin/replenishmentsloadtopoffs', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

});

app.controller('TwlertSearchCtrl', function ($scope, $state, DataService, MessageService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Sets defaults in search tab
   base.userCoNum = UserService.getTwlCompany();
   base.userWhNum = UserService.getTwlWarehouse();
   base.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   base.twlUserId = UserService.getTwlUserId();

   self.setDefaults = function () {
      base.criteria.coNum = base.userCoNum;
      base.criteria.whNum = base.userWhNum;
      base.criteria.chStat = 'LOW';
   };

   self.setDefaults();

   self.clear = function () {
      // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
      Utils.clearObject(criteria);

      self.setDefaults();
   };

   self.statusTypes = [
      //{ label: MessageService.get('global.all'), value: '' },
      { label: MessageService.get('global.low'), value: 'LOW' },
      { label: MessageService.get('global.ok'), value: 'OK' },
      { label: MessageService.get('global.over'), value: 'OVER' }
   ];

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twlert.master');
      }

      base.search();
   };
});

app.controller('TwlertMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.statusFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) {
            case 'LOW':
               return $translate.instant('global.low');
            case 'OK':
               return $translate.instant('global.ok');
            case 'OVER':
               return $translate.instant('global.over');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.buildTopOffs = function () {

      // You do not need the all versus selected from the Online because the user can easily select all records
      var buildCriteria = [];
      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         MessageService.yesNo('global.question', 'question.do.you.want.to.build.top.off.replenishments', function () {
            records.forEach(function (record) {
               buildCriteria.push({
                  coNum: record.coNum,
                  whNum: record.whNum,
                  absNum: record.chAbs,
                  binNum: record.chBin,
                  maxLvl: record.dMax,
                  dOnhand: record.dOnhand,
                  currentTwlUser: base.twlUserId
               });
            });
            if (buildCriteria) {
               DataService.post('api/twl/astwladmin/replenishmentsbuildtopoffs', { data: buildCriteria, busy: true }, function () {
                  MessageService.info('global.information', 'message.operation.completed.successfully');
               });
            }
            $state.go('twlert.master', { refreshSearch: true }, { reload: 'twlert.master' });
         });
      }
   };

});
