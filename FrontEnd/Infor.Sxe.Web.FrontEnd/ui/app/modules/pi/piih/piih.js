'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('pi', 'piih', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('pi', 'piih');

   $stateProvider.state('piih.detail', {
      url: '/detail',
      params: { record: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piih/detail.json');
            },
            controller: 'PiihDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('piih.detail.product', {
      url: '/product-detail',
      params: { productDetails: null },
      views: {
         prod: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piih/product-detail.json');
            },
            controller: 'PiihProductDetailCtrl as dtl'
         }
      }
   });
});

app.controller('PiihBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('piih.master');
   };

   self.includesMaster = function () {
      return $state.includes('piih.master');
   };

   self.isDetail = function () {
      return $state.is('piih.detail');
   };

   self.includesDetail = function () {
      return $state.includes('piih.detail');
   };

   self.isProductDetail = function () {
      return $state.is('piih.detail.product');
   };

   // Default display
   self.criteria.display = 'B';

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {

      var params = { cImptype: self.criteria.importtype, cDisplayType: self.criteria.display, iRecordLimit: self.criteria.recordlimit };

      DataService.get('api/sl/asslsetup/slehgetheaderlist/{cImptype}/{cDisplayType}/{iRecordLimit}', { pathParams: params, busy: true }, function (data) {
         self.dataset = data.slehgetheadlistresults;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('PiihSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.display = 'B';
      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('piih.master');
      }

      // Get data
      base.search();
   };
});

app.controller('PiihMasterCtrl', function ($scope, $state) {
   var self = this;

   // Drill down
   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      $state.go('^.detail', { record: selectedRecord });
   };
});

app.controller('PiihDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.productstatus = true;

   self.getProducts = function () {

      var getprodcriteria = {
         sledgetprodlistcriteria: {
            cImptype: base.criteria.importtype,
            lStatusType: self.productstatus,
            cSLUpdtNo: $stateParams.record.slupdtno,
            recordlimit: base.criteria.recordlimit
         }

      };

      DataService.post('api/sl/asslsetup/sledgetprodlist', { data: getprodcriteria, busy: true }, function (data) {
         self.dataset = data;
         if (self.dataset[data.length - 1].morerecords) {
            MessageService.alert('global.warning', "global.record.count.limit.has.been.reached");
         }
      });
   };

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.record) {

      self.getProducts();

      self.selectedSlehHead = $stateParams.record;
      self.subTitle = MessageService.get('global.update.number') + ' : ' + $stateParams.record.slupdtno + Constants.SUB_TITLE_SEPARATOR + MessageService.get('global.seq.number') + ' : ' + $stateParams.record.seqno;

      // Drill down
      self.drilldown = function (e, args) {
         var selectedRecord = args[0].item;
         $state.go('^.detail.product', {
            productDetails: selectedRecord
         });
      };
   }
});
app.controller('PiihProductDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService, PiConverters) {
   var self = this;
   var base = $scope.base;

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.productDetails) {

      self.subTitle = MessageService.get('global.product') + ' : ' + $stateParams.productDetails.prod + Constants.SUB_TITLE_SEPARATOR + MessageService.get('global.warehouse') + ' : ' + $stateParams.productDetails.whse;

      var params = {
         cImptype: base.criteria.importtype,
         lStatusType: $stateParams.productDetails.statustype,
         cSLUpdtNo: $stateParams.record.slupdtno,
         cProd: $stateParams.productDetails.prod,
         cWhse: $stateParams.productDetails.whse
      };



      DataService.get('api/sl/asslsetup/sledgetproddetail', { params: params, busy: true }, function (data) {

         if (data) {
            self.sled = data;
            var updateDesc = PiConverters.StatusUpdateCode.convert(self.sled.statuscd);
            self.sled.statusCodeDesc = updateDesc;
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

      //Quantity Bricks data preparing for grid

      self.priceLabel = MessageService.get('global.price');
      self.costLabel = MessageService.get('global.cost');
      self.quantityBrealLabel = MessageService.get('global.qty.break');

      // Navigate to master page
      self.navigateToDetail = function () {
         $state.go('piih.detail');
      };
   }
});
