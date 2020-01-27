'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlecs', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlecs');
});

app.controller('TwlecsBaseCtrl', function ($state, DataService, MessageService, UserService) {
   var self = this;
   self.availableProdCats = [];
   self.selectedProdCats = [];

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();

   self.countTypes = [
      { label: MessageService.get('global.abc.rotation'), value: 'I' },
      { label: MessageService.get('global.maximum.daily.item.counts'), value: 'C' },
      { label: MessageService.get('global.maximum.daily.inventory.counts'), value: 'X' }
   ];

   self.isMaster = function () {
      return $state.is('twlecs.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlecs.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwlsetup/getccsetup', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.twlecs = data;
            self.selectedProdCats = data.excludeProdCat.split(',');
         }
      });
   };

   var params = {
      coNum: self.userCoNum,
      whNum: self.userWhNum
   };
   DataService.get('api/twl/prodcat/listbycowhpickseq/', { params: params, busy: true }, function (data) {
      if (data) {
         data.forEach(function (record) {
            self.availableProdCats.push({ value: record.prodcat, label: (record.description + ' (' + record.prodcat + ')') });
         });
      }
   });

});

app.controller('TwlecsSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;


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
         $state.go('twlecs.master');
      }

      base.search();
   };
});


app.controller('TwlecsMasterCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Save
   self.submit = function () {
      base.twlecs.excludeProdCat = base.selectedProdCats.join();
      DataService.post('api/twl/astwlsetup/updateccsetup', { data: base.twlecs, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

