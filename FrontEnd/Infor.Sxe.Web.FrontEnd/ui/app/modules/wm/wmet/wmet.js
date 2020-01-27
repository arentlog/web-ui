'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('wm', 'wmet', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('wm', 'wmet');
});

app.controller('WmetBaseCtrl', function ($state, DataService, Utils) {
   var self = this;
   self.criteria = null;
   self.wmtransaction = [];
   self.wmbinproducts = [];
   self.productsGrid = [];
   self.wmtransactionsprocessed = [];

   self.blank = '';
   self.zero = 0;

   self.isSearchEnabled = true;
   self.showBinProducts = false;

   self.isMaster = function () {
      return $state.is('wmet.master');
   };

   self.includesMaster = function () {
      return $state.includes('wmet.master');
   };

   self.search = function () {
      self.wmtransaction = null;
      self.wmbinproducts = null;
      DataService.post('api/wm/aswmentry/wmtransactioninitialize', { data: self.criteria, busy: true }, function (data) {
         self.wmtransaction = data.wmtransaction;
         self.wmbinproducts = data.wmbinproducts;
         self.showBinProducts = self.wmbinproducts.length > 0 ? true : false;
         self.isSearchEnabled = false;
      });
   };

   self.searchEnabled = function () {
      return self.isSearchEnabled;
   };

   self.clear = function () {
      Utils.clearObject(self.criteria);

      self.isSearchEnabled = true;
      self.showBinProducts = false;
   };
});

app.controller('WmetSearchCtrl', function ($scope, $state, Utils) {
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
      if (!base.isMaster()) {
         $state.go('wmet.master');
      }

      base.search();
   };
});

app.controller('WmetMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.cancel = function () {
      base.isSearchEnabled = true;
      base.showBinProducts = false;
      // Clear out the selected values
      base.wmtransaction.prod = base.blank;
      base.wmtransaction.tobinloc = base.blank;
      base.wmtransaction.quantity = base.zero;
      base.wmtransaction.quantityenabled = false;
      base.wmtransaction.tobinlocenabled = false;
   };

   self.update = function () {

      var AswmentryWMTransactionFinalizeRequestAPI = {
         wmtransactionsprocessed: base.wmtransactionsprocessed,
         wmtransaction: base.wmtransaction
      };

      DataService.post('api/wm/aswmentry/wmtransactionfinalize', { data: AswmentryWMTransactionFinalizeRequestAPI, busy: true }, function (data) {

         MessageService.info('global.information', 'message.saved.successfully');

         base.wmtransaction = data.wmtransaction;
         base.wmtransactionsprocessed = data.wmtransactionsprocessed;

         base.clear();
      });
   };

   self.onProductSelected = function () {
      var record = GridService.getSelectedRecord(base.productsGrid);

      if (record) {
         base.wmtransaction.prod = record.prod;
         base.wmtransaction.quantityenabled = true;
         self.onProductChanged();
      }
      else if (base.wmtransaction.prod) {
         self.onProductChanged();
      }
   };

   self.onProductChanged = function () {
      DataService.post('api/wm/aswmentry/wmtransactionleaveproduct', { data: base.wmtransaction, busy: true }, function (data) {

         if (data.messaging.length > 0) {
            MessageService.errorMessages(data.messaging);
         }
         else {
            base.wmtransaction = data.wmtransaction;
            base.wmtransaction.tobinloc = '';//SXWEB-23599 as per Jira no need to load the tobinLocation by default.
         }
      });
   };

   self.onBinLocChanged = function () {
      if (base.wmtransaction && base.wmtransaction.tobinloc) {
         DataService.post('api/wm/aswmentry/wmtransactionleavetobinloc', { data: base.wmtransaction, busy: true }, function (data) {

            base.wmtransaction = data;
         });
      }
   };

});
