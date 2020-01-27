'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('wm', 'wmis', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('wm', 'wmis', { params: { whse: undefined, prod: undefined, binloc: undefined } });

});

app.controller('WmisBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};
   self.isMaster = function () {
      return $state.is('wmis.master');
   };

   self.includesMaster = function () {
      return $state.includes('wmis.master');
   };

   self.initCriteria = function () {
      self.criteria.iRecordLimit = ConfigService.getDefaultRecordLimit();
   };

   self.initCriteria();

   self.search = function () {
      DataService.post('api/wm/aswminquiry/wmprimaryreplenishmentretrieve/', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.wmprimaryreplenishment;
         }
      });
   };

});

app.controller('WmisSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);

      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('wmis.master');
      }

      base.search();
   };
});

app.controller('WmisMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;
   self.replenish = 'Replenish';

   if ($stateParams.prod && $stateParams.whse) {
      base.criteria.cProduct = $stateParams.prod;
      base.criteria.cWarehouse = $stateParams.whse;
      base.criteria.cBinlocStart = $stateParams.binloc;
      base.search();
   }

   self.onProdInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('wmip.master', { whse: currentRow.whse, prod: currentRow.prod });
      }
   };

   self.onBinInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('wmib.detail', { whse: currentRow.whse, binloc: currentRow.binloc });
      }
   };

});


app.controller('WmisRowDetailCtrl', function ($scope) {
   var self = this;
   var dtl = $scope.dtl;

   self.wmisRow = dtl.rowParams.item;
});