'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saa-authsecurity', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saa-authsecurity');

   $stateProvider.state('saa-authsecurity.detail', {
      url: '/detail',
      params: { object: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saa-authsecurity/detail.json');
            },
            controller: 'Saa-authsecurityDetailCtrl as dtl'
         }
      }
   });
});

app.controller('Saa-authsecurityBaseCtrl', function ($state, $translate, DataService) {
   var self = this;
   self.criteria = {};

   //state methods:
   self.isMaster = function () {
      return $state.is('saa-authsecurity.master');
   };

   self.includesMaster = function () {
      return $state.includes('saa-authsecurity.master');
   };

   self.isDetail = function () {
      return $state.is('saa-authsecurity.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saa-authsecurity.detail');
   };

   self.search = function() {
      DataService.post('api/shared/assharedentry/authpointsecurityretrieve', {data: self.criteria, busy: true}, function (data) {
         self.selectedOper = self.criteria.oper2;
         self.dataset = data;
      });
   };

   self.setSecurity = function (securityCode, items, search) {
      if (items) {
         // loop through the items and add the security code passed in
         // securityCodes: 1 (unauthorized), 2 (Authorized), 3 (Grant Authority)
         items.forEach(function (item) {
            item.tosecurcd = securityCode;
         });

         DataService.post('api/shared/assharedentry/authpointsetsecurity', { data: items, busy: true }, search());
      }
   };

   self.levelToString = function (row, cell, value) {
      switch (value) {
         case 1:
            return $translate.instant('global.not.authorized');
         case 2:
            return $translate.instant('global.authorized');
         case 3:
            return $translate.instant('global.grant.authority');
         default:
            return value;
      }
   };

   self.dataset = []; //TODO: Is this really needed?
});

app.controller('Saa-authsecuritySearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var criteria = $scope.base.criteria;
   var base = $scope.base;
   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.oper2 = '';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!$scope.base.isMaster()) {
         $state.go('saa-authsecurity.master');
      }

      base.search();
   };

   //search with no operator to begin
   self.submit();
});

app.controller('Saa-authsecurityMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.isPointSecurityDisabled = function () {
      return !(base.grid.isOneRowSelected() && !base.selectedOper);
   };

   self.isSetSecurityDisabled = function () {
      return !(base.grid.isAnyRowSelected() && base.selectedOper);
   };

   self.setSecurity = function(securityCode) {
      // This will be used for all set secuity methods - authorize, not authorized, Grant Authority
      if (securityCode) {
         // Get selected items from grid
         var items = GridService.getSelectedRecords(base.grid);

         base.setSecurity(securityCode, items, base.search);
      }
   };

   self.toPointSecurity = function () {
      var record = GridService.getSelectedRecord(base.grid); // Should only be one record selected

      // This criteria object gets passed through to the search call in the detail controller.
      var criteria = {
         oper2 : '',
         functionname: record.functionname,
         modename: record.modename,
         pointname: record.pointname,
         sectionname: record.sectionname,
         transtype: record.transtype,
         userfield: record.userfield,
         descrip: record.descrip,
         searchcriteria: '1'
      };

      $state.go('^.detail', { object: criteria });
   };
});

app.controller('Saa-authsecurityDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   self.criteria = $stateParams.object;

   self.search = function() {
      DataService.post('api/shared/assharedentry/authpointsecurityretrieve', { data: self.criteria, busy: true }, function (data) {
         // Apply data to grid
         self.dataset = data;
      });
   };

   // On entry into the Detail Ctrl if criteria is not null run search
   if (self.criteria) {
      self.search();
   }

   self.setSecurity = function (securityCode) {
      // This will be used for all set secuity methods - authorize, not authorized, Grant Authority
      if (securityCode) {
         // Get selected items from grid
         var items = GridService.getSelectedRecords(self.grid);

         base.setSecurity(securityCode, items, self.search);
      }
   };
});
