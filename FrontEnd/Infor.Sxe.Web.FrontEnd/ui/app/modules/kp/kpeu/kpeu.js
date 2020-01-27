'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('kp', 'kpeu', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('kp', 'kpeu');

});

app.controller('KpeuBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('kpeu.master');
   };

   self.includesMaster = function () {
      return $state.includes('kpeu.master');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.get('api/kp/askpentry/kpeuloadtt/' + self.criteria.kitprod, { busy: true }, function (data) {
         self.dataset = data.kpeuupdate;
         self.criteria.version = data.iVerNo;
      });
   };
});

app.controller('KpeuSearchCtrl', function ($scope, $state, Utils) {

   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!$scope.base.isMaster()) {
         $state.go('kpeu.master');
      }

      if (criteria.kitprod) {
         base.search();
      }
   };
});

app.controller('KpeuMasterCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.modifyUpdateFlag = function (isUpdate) {
      var records = GridService.getSelectedRecords(base.grid);

      if (records) {
         records.forEach(function (record) {
            record.updatefl = (isUpdate === "true") ? true : false;
            base.grid.updateRow(base.dataset.indexOf(record));
         });
      }
   };

   self.update = function () {
      var modifiedRecords = base.dataset.filter(function (a) {
         return a.updatefl === true;
      });

      if (modifiedRecords.length > 0) {
         modifiedRecords.forEach(function (modifiedRecord) {
            DataService.post('api/kp/askpentry/kpeuupdate', { data: modifiedRecord, busy: true }, function () { });
         });

         base.search();
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         MessageService.info('global.information', 'message.final.update.completed.successfully');
      }
   };

});