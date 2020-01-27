'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('wm', 'wmip', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('wm', 'wmip', { params: { whse: undefined, prod: undefined } });
});

app.controller('WmipBaseCtrl', function ($state, $translate, DataService, Constants) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('wmip.master');
   };

   self.includesMaster = function () {
      return $state.includes('wmip.master');
   };

   self.isDetail = function () {
      return $state.is('wmip.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wmip.detail');
   };

   self.search = function () {
      self.subTitle = self.criteria.prod + Constants.SUB_TITLE_SEPARATOR + self.criteria.whse;
      DataService.post('api/wm/aswminquiry/wmproductretrieve', { data: self.criteria, busy: true }, function (data) {
         data.forEach(function (item) {
            item.userfield = $translate.instant('global.replenish');
         });
         self.dataset = data;
      });
   };
});

app.controller('WmipSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      base.subTitle = '';
      base.dataset = [];
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      base.search();
   };
});

app.controller('WmipMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;
   self.replenish = 'Replenish';

   if ($stateParams.prod && $stateParams.whse) {
      base.criteria.prod = $stateParams.prod;
      base.criteria.whse = $stateParams.whse;
      base.search();
   }

   self.onBinInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('wmib.master', { whse: currentRow.whse, binloc: currentRow.binloc });
      }
   };

   self.onReplenishmentInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('wmis.master', { whse: currentRow.whse, binloc: currentRow.binloc, prod: currentRow.prod });
      }
   };
});

app.controller('WmipRowDetailCtrl', function ($scope) {
   var self = this;
   var mst = $scope.mst;
   self.wmproductbin = mst.rowParams.item;
});
