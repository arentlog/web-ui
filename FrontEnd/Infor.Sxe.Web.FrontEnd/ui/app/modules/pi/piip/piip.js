'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('pi', 'piip', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('pi', 'piip');

   $stateProvider.state('piip.detail', {
      url: '/detail',
      params: { record: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piip/detail.json');
            },
            controller: 'PiipDetailCtrl as dtl'
         }
      }
   });
});

app.controller('PiipBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('piip.master');
   };

   self.includesMaster = function () {
      return $state.includes('piip.master');
   };

   self.isDetail = function () {
      return $state.is('piip.detail');
   };

   self.includesDetail = function () {
      return $state.includes('piip.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {

      if (self.criteria.prod && self.criteria.whse) {
         var params = { cProd: self.criteria.prod, cWhse: self.criteria.whse};
         DataService.get('api/sl/asslsetup/sledgetheadlist/{cProd}/{cWhse}', { pathParams: params, busy: true }, function (data) {
            self.dataset = data;
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('PiipSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('piip.master');
      }

      // Get data
      base.search();
   };
});

app.controller('PiipMasterCtrl', function ($scope, $state) {
   var self = this;

   // Drill down
   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      $state.go('^.detail', { record: selectedRecord });
   };
});

app.controller('PiipDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService, PiConverters) {
   var self = this;
   var base = $scope.base;
   self.sled = {};

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.record) {

      self.subTitle = MessageService.get('global.import') + ':' + $stateParams.record.imptype + Constants.SUB_TITLE_SEPARATOR + MessageService.get('global.warehouse') + ':' + $stateParams.record.whse;

      var params = {
         cImptype: $stateParams.record.imptype,
         lStatusType: $stateParams.record.statustype,
         cSLUpdtNo: $stateParams.record.slupdtno,
         cProd: base.criteria.prod,
         cWhse: $stateParams.record.whse
      };

      DataService.get('api/sl/asslsetup/sledgetproddetail', { params: params, busy: true }, function (data) {
         self.sled = data;
         var updateDesc = PiConverters.StatusUpdateCode.convert(self.sled.statuscd);
         self.sled.statusCodeDesc = updateDesc;
      });

      //Quantity Bricks data preparing for grid

      self.priceLabel = MessageService.get('global.price');
      self.costLabel = MessageService.get('global.cost');
      self.quantityBrealLabel = MessageService.get('global.qty.break');

      self.quantityBricks = [{ slpricebrk: self.sled.slpricebrk1 ? self.sled.slpricebrk1 : 0.00000, slcostbrk: self.sled.slcostbrk1 ? self.sled.slcostbrk1 : 0.00000, slqtybrk: self.sled.slqtybrk1 ? self.sled.slqtybrk1 : 0 },
           { slpricebrk: self.sled.slpricebrk2 ? self.sled.slpricebrk2 : 0.00000, slcostbrk: self.sled.slcostbrk2 ? self.sled.slcostbrk2 : 0.00000, slqtybrk: self.sled.slqtybrk2 ? self.sled.slqtybrk2 : 0 },
           { slpricebrk: self.sled.slpricebrk3 ? self.sled.slpricebrk3 : 0.00000, slcostbrk: self.sled.slcostbrk3 ? self.sled.slcostbrk3 : 0.00000, slqtybrk: self.sled.slqtybrk3 ? self.sled.slqtybrk3 : 0 },
           { slpricebrk: self.sled.slpricebrk4 ? self.sled.slpricebrk4 : 0.00000, slcostbrk: self.sled.slcostbrk4 ? self.sled.slcostbrk4 : 0.00000, slqtybrk: self.sled.slqtybrk4 ? self.sled.slqtybrk4 : 0 },
           { slpricebrk: self.sled.slpricebrk5 ? self.sled.slpricebrk5 : 0.00000, slcostbrk: self.sled.slcostbrk5 ? self.sled.slcostbrk5 : 0.00000, slqtybrk: self.sled.slqtybrk5 ? self.sled.slqtybrk5 : 0 },
           { slpricebrk: self.sled.slpricebrk6 ? self.sled.slpricebrk6 : 0.00000, slcostbrk: self.sled.slcostbrk6 ? self.sled.slcostbrk6 : 0.00000, slqtybrk: self.sled.slqtybrk6 ? self.sled.slqtybrk6 : 0 },
           { slpricebrk: self.sled.slpricebrk7 ? self.sled.slpricebrk7 : 0.00000, slcostbrk: self.sled.slcostbrk7 ? self.sled.slcostbrk7 : 0.00000, slqtybrk: self.sled.slqtybrk7 ? self.sled.slqtybrk7 : 0 },
           { slpricebrk: self.sled.slpricebrk8 ? self.sled.slpricebrk8 : 0.00000, slcostbrk: self.sled.slcostbrk8 ? self.sled.slcostbrk8 : 0.00000, slqtybrk: self.sled.slqtybrk8 ? self.sled.slqtybrk8 : 0 },
           { slpricebrk: self.sled.slpricebrk9 ? self.sled.slpricebrk9 : 0.00000, slcostbrk: self.sled.slcostbrk9 ? self.sled.slcostbrk9 : 0.00000, slqtybrk: self.sled.slqtybrk9 ? self.sled.slqtybrk9 : 0 }
      ];
   }
});
