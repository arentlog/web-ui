'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('sa', 'sasa');
   StateProvider.addMasterState('sa', 'sasa');
});

app.controller('SasaBaseCtrl', function ($state) {
   var self = this;

   self.sidebarCollapsed = true;

   self.includesMaster = function () {
      return $state.includes('sasa.master');
   };

   self.isMaster = function () {
      return $state.is('sasa.master');
   };
});

app.controller('SasaMasterCtrl', function ($scope, $state, DataService) {
   var self = this;

   // Clear form
   self.clear = function () {
      self.sasa = {};

      // Reload the initial values
      self.loadInitialValues();
   };

   self.loadInitialValues = function () {
      DataService.get('api/sa/assasetup/sasaretrieve', { params: null }, function (data) {
         if (data) {
            self.sasa = data;
         }
      });
   };

   // Load the initial values
   self.loadInitialValues();

   // Submit data
   self.submit = function () {
      DataService.post('api/sa/assasetup/sasaupdate', { data: self.sasa }, function (data) {
         if (data) {
            self.sasa = data;
         }
      }, function errorCallback() {
         self.loadInitialValues();
      });
   };
});
