'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('xx', 'xxxx', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('xx', 'xxxx');

   $stateProvider.state('xxxx.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('xx/xxxx/detail.json');
            },
            controller: 'XxxxDetailCtrl as dtl'
         }
      }
   });
});

app.controller('XxxxBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'xxxx',
      rowIdField: 'rowID',
      stateRef: 'xxxx.detail',
      title: {label: 'global.CHANGE_ME', value: ''},
      description: {label: 'global.CHANGE_ME', value: ''}
   };

   self.isMaster = function () {
      return $state.is('xxxx.master');
   };

   self.includesMaster = function () {
      return $state.includes('xxxx.master');
   };

   self.isDetail = function () {
      return $state.is('xxxx.detail');
   };

   self.includesDetail = function () {
      return $state.includes('xxxx.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/xx/CHANGE_ME/TO/SEARCH/API', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.CHANGE_ME;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('XxxxSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('xxxx.master');
      }

      // Get data
      base.search();
   };
});

app.controller('XxxxMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Advanced search criteria object with initial values
   // TODO: default values
   self.advCriteria = {
      recordlimit: ConfigService.getDefaultRecordLimit()
   };

   // List of available search criteria fields
   // TODO: finish
   self.criteriaList = [
      { value: 'changeme', label: MessageService.get('global.CHANGE_ME') }
   ];

   // List of default selected criteria fields
   // TODO: any?
   self.defaultSelectedCriteria = ['changeme'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      // TODO: finish rowId param or pk param(s)
      $state.go('^.detail', { id: record.CHANGE_ME_ROW_ID });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordlimit) {
         advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/xx/CHANGE_ME/TO/SEARCH/API', { data: advCriteria, busy: true }, function (data) {
         base.dataset = data.CHANGE_ME;
      });
   };
});

app.controller('XxxxDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService) {
   var self = this;
   var base = $scope.base;

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.RECORD_NAME = DataService.getResource('api/xx/RECORD_NAME/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         CHANGE_ME_PK_FIELD: $stateParams.pk,
         fillmode: true
      };

      self.RECORD_NAME = DataService.getResource('api/xx/RECORD_NAME/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.RECORD_NAME.$promise.then(function () {
      if (self.RECORD_NAME) {
         self.subTitle = self.RECORD_NAME.CHANGE_FIELD + Constants.SUB_TITLE_SEPARATOR + self.RECORD_NAME.CHANGE_FIELD;

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.RECORD_NAME);
      }
   });
});
