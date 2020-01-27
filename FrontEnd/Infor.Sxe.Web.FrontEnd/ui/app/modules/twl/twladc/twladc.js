'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twladc', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twladc');
});

app.controller('TwladcBaseCtrl', function ($state, DataService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.iTwlSessionCnt = 0;

   self.includesMaster = function () {
      return $state.includes('twladc.master');
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      // Get data
      DataService.get('api/twl/astwlinquiry/getdbconnections', { busy: true }, function (data) {
         self.iTwlSessionCnt = data.dbconnectsum.iTwlSessionCnt;
         self.dataset = data.dbconnectdtl;
      });
   };
});

app.controller('TwladcSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      // Get data
      base.search();
   };
});

app.controller('TwladcMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});