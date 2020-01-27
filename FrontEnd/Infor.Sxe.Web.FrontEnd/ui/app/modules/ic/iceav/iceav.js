'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'iceav', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'iceav');
});

app.controller('IceavBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('iceav.master');
   };

   self.includesMaster = function () {
      return $state.includes('iceav.master');
   };

   self.search = function () {
      DataService.post('api/ic/asicentry/iceavretrieve', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.iceavresults;
      });
   };
});

app.controller('IceavSearchCtrl', function ($scope, $state, Utils, ConfigService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();

   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   self.navigateToApiv = function () {
      $state.go('apiv.detail', { pk: base.criteria.vendno });
   };

   self.navigateToIcip = function () {
      $state.go('icip.detail', { pk: base.criteria.origprod });
   };

   self.navigateToCoreIcip = function () {
      $state.go('icip.detail', { pk: base.criteria.coreprod });
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('iceav.master');
      }
      base.search();
   };
});

app.controller('IceavMasterCtrl', function ($scope, $stateParams, $state) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.navigateToApiv = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.navigateToIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.origprod });
      }
   };

   self.navigateToCoreIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.coreprod });
      }
   };

});

app.controller('IceavAdjustCoreVendorUpdateCtrl', function ($scope, DataService, MessageService, Utils) {

   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   var item = mst.rowParams.item;
   var grid = mst.rowParams.grid;
   var row = mst.rowParams.row;

   self.iceav = angular.copy(item);

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {
      DataService.post('api/ic/asicentry/iceavdetailsave', { data: self.iceav, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.search();
      })
   };
});