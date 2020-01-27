'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saa-grantauth', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saa-grantauth');

});

app.controller('Saa-grantauthBaseCtrl', function ($state) {
   var self = this;
   // This allows for a deafult search
   self.criteria = {
      cRetrieveOperator: ''
   };

   self.isMaster = function () {
      return $state.is('saa-grantauth.master');
   };

   self.includesMaster = function () {
      return $state.includes('saa-grantauth.master');
   };

   self.dataset = [];
});

app.controller('Saa-grantauthSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var criteria = $scope.base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!$scope.base.isMaster()) {
         $state.go('saa-grantauth.master');
      }

      criteria.cRetrieveOperator = criteria.cRetrieveOperator !== null ? criteria.cRetrieveOperator : '';

      DataService.post('api/shared/assharedentry/authpointtransretrieve/', { data: criteria, busy: true}, function (data) {
         if (data) {
            $scope.base.dataset = data;
         }
      });
   };
});

app.controller('Saa-grantauthMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // This is only used for now eventually this method should go away.
   var search = function() {
      DataService.post('api/shared/assharedentry/authpointtransretrieve/', { data: criteria, busy: true }, function (data) {
        if (data) {
           $scope.base.dataset = data;
        }
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      search();
   }

   // Grant Authorization
   self.grantAuth = function() {
      var items = GridService.getSelectedRecords(base.grid);
      // Only run if there are selected items in the list
      if(items.length > 0){
         DataService.post('api/shared/assharedentry/authpointtransgrant', { data: items, busy: true }, function (data) {
            if (data) {
               // TODO: SI Review, refactor the search call to the SI layer
               search();
            }
         });
      }
   };

   // Deny Authorization
   self.denyAuth = function() {
     var items = GridService.getSelectedRecords(base.grid);
     // Only run if there are selected items in the list
     if(items.length > 0){
         DataService.post('api/shared/assharedentry/authpointtransdeny', { data: items, busy: true }, function (data) {
           if (data) {
              // TODO: SI Review, refactor the search call to the SI layer
             search();
           }
        });
      }
   };

   // Reset Status
   self.resetStatus = function() {
     var items = GridService.getSelectedRecords(base.grid);
     // Only run if there are selected items in the list
      if(items.length > 0){
         DataService.post('api/shared/assharedentry/authpointtransreset', { data: items, busy: true }, function (data) {
           if (data) {
              // TODO: SI Review, refactor the search call to the SI layer
              search();
           }
        });
      }
   };

});