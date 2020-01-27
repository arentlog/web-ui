'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('wm', 'wmib', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('wm', 'wmib', { params: { whse: undefined, binloc: undefined } });

   $stateProvider.state('wmib.detail', {
      url: '/detail?whse&binloc',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wm/wmib/detail.json');
            },
            controller: 'WmibDetailCtrl as dtl'
         }
      }
   });
});

app.controller('WmibBaseCtrl', function ($state, ConfigService, DataService, $translate) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('wmib.master');
   };

   self.includesMaster = function () {
      return $state.includes('wmib.master');
   };

   self.isDetail = function () {
      return $state.is('wmib.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wmib.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('WmibSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      if (!base.isMaster()) {
         $state.go('wmib.master');
      }
   };

   // Perform search
   self.submit = function () {
      $state.go('^.detail', { whse: base.criteria.whse, binloc: base.criteria.binloc });
   };
});

//This is required as we are loading the sub title.
app.controller('WmibMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   if ($stateParams.binloc && $stateParams.whse) {
      $state.go('^.detail', { whse: $stateParams.whse, binloc: $stateParams.binloc });
   }
});


app.controller('WmibDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   var self = this;
   var base = $scope.base;
   self.replenish = 'Replenish';

   if ($stateParams.whse && $stateParams.binloc) {
      base.criteria.whse = $stateParams.whse;
      base.criteria.binloc = $stateParams.binloc;
      DataService.post('api/wm/aswminquiry/wmbinretrieve', { data: base.criteria, busy: true }, function (data) {
         if (data && data.wmbinproducts && data.wmbinproducts.length > 0) {
            data.wmbinproducts.forEach(function (item) {
               item.userfield = $translate.instant('global.replenish');
            });
            self.dataset = data.wmbinproducts;
         }
         if (data.wmbin) {
            self.wmbin = data.wmbin;
         }
      });
   }

   self.onProdInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('wmip.master', { whse: currentRow.whse, prod: currentRow.prod });
      }
   };

   self.onReplenishmentInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('wmis.master', { whse: currentRow.whse, binloc: currentRow.binloc, prod: currentRow.prod });
      }
   };

});

app.controller('WmibRowDetailCtrl', function ($scope) {
   var self = this;
   var dtl = $scope.dtl;
   self.wmwhsebin = dtl.rowParams.item;
});
