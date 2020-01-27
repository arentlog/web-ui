'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('xx', 'xxxx', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('xx', 'xxxx');

   /**
    * TODO: This detail state is a skeleton. Change it to what you need,
    * then remove this comment.
    */
   $stateProvider.state('xxxx.detail', {
      url: '/detail?id',
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

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/xx/CHANGE/TO/SEARCH/API', {data: self.criteria, busy: true}, function (data) {
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

      base.search();
   };
});

app.controller('XxxxMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('XxxxDetailCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;

   // The xxxx record
   // TODO: Implement the actual getting of the record, then remove this comment.
   self.xxxx = null;

   // Save
   self.submit = function () {
      DataService.post('api/xx/CHANGE/TO/SAVE/API', { data: self.xxxx, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };
});
