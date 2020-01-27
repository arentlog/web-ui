'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlail', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlail');

   $stateProvider.state('twlail.detail', {
      url: '/detail',
      params: { twlailtablelistRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlail/detail.json');
            },
            controller: 'TwlailDetailCtrl as dtl'
         }
      }
   });
});

app.controller('TwlailBaseCtrl', function ($state, DataService) {
   var self = this;

   self.criteria = {
      version: 45
   };

   self.criteriaUsed = {};


   self.isMaster = function () {
      return $state.is('twlail.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlail.master');
   };

   self.isDetail = function () {
      return $state.is('twlail.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlail.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      // Get data
      DataService.post('api/twl/commst/gettwlcommstinterfaces', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };
});

app.controller('TwlailSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      base.criteria = {
         version: 45
      };
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('^.master');
      }

      // Get data
      base.search();
   };
});

app.controller('TwlailMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { twlailtablelistRecord: record });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('TwlailDetailCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   self.record = $stateParams.twlailtablelistRecord;

   self.loadDetail = function () {
      DataService.get('api/twl/comdet/gettwlcomdetinterfaces/' + self.record.recordType.trim() + '/' + self.record.version + '/', {
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   };

   if (self.record) {
      self.loadDetail();
   }

   self.getSubTitle = function () {
      return MessageService.get('global.type') + ': ' + self.record.recordType;
   };
});