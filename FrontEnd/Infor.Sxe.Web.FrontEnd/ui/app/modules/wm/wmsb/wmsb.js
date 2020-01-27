'use strict';

app.config(function ($stateProvider, StateProvider) {

   StateProvider.addSetupStates({
      module: 'wm',
      menuFn: 'wmsb',
      recordName: 'wmsb',
      dataPath: 'api/wm/wmsb',
      searchMethod: 'POST',
      searchPath: 'api/wm/aswmentry/wmsbsearch',
      searchResultsField: 'wmsbsearchresults',
      searchDefaultWarehouseField: 'whse',
      passGridRecord: true,
      searchRecordLimitField: 'recordlimit',
      resultsRowIdField: 'rowid',
      primaryKeyParams: ['whse', 'binloc'],
      recentlyVisited: null
   });

   //DETAIL OF PRODUCTS
   $stateProvider.state('wmsb.detail.product', {
      url: '/product-detail',
      params: {
         wmsbp: null,
         productSearchFunction: null  // You can pass a pointer to a function in another control!
      },
      views: {
         productDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wm/wmsb/product-detail.json');
            },
            controller: 'WmsbProductDetailCtrl as proddtl'
         }
      }
   });

});

app.service('WmsbService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils, CommonConverters, Sasc, Sasoo) {

   this.extendBaseController = function (self) {
      self.isMultipleProductsAllowed = Sasc ? Sasc.wmmultfl : false;
   };

   this.extendDetailController = function (self, base, wmsb) {

      // Detail Level - Sub Title
      self.getSubTitle = function () {
         var currentTitle = '';
         if (self.wmsb) {
            currentTitle = self.wmsb.whse + ' | ' + CommonConverters.BinLoc.convert(self.wmsb.binloc);
         }
         return currentTitle;
      };

      wmsb.$promise.then(function () {
         wmsb.binlocFormatted = CommonConverters.BinLoc.convert(wmsb.binloc);
      });

   };

   this.extendSearchController = function (self, base) {
      base.criteria.whse = Sasoo.whse;
   };

   this.extendCreateController = function (self) {
      self.wmsb.whse = '';
      self.wmsb.binloc = '';
      self.wmsb.bintype = '';
      self.wmsb.sizetype = '';
      self.wmsb.assigncode = 'o'; //open
      self.wmsb.priority = 0; //pick last
      self.wmsb.statuscode = 'a'; //available
      self.wmsb.pounittype = 'b'; //buying
   };
});

// Products Tab with list of products
app.controller('WmsbDetailProductTabCtrl', function ($scope, $state, $stateParams, Sasoo, DataService, GridService, MessageService, UserService) {

   // self = cst
   var self = this;

   // Detail WMSB record
   self.wmsb = $scope.dtl.wmsb;

   self.keyData = {
      whse: self.wmsb.whse,
      binloc: self.wmsb.binloc
   };

   // Drill down - sub level
   self.drilldown = function (e, args) {

      DataService.get('api/wm/wmsbp/getbyrowid/' + args[0].item.rowidWmsbp + '?fillmode=true', { busy: true }, function (data) {
         var record = data;
         record.updatetype = 'View';
         record.unitstock = args[0].item.unitstock;
         record.minqtyenablefl = args[0].item.minqtyenablefl;
         record.maxqtyenablefl = args[0].item.maxqtyenablefl;
         record.qtyonhandenablefl = args[0].item.qtyonhandenablefl;
         record.qtycommittedenablefl = args[0].item.qtycommittedenablefl;
         record.qtyreceivedenablefl = args[0].item.qtyreceivedenablefl;
         $state.go('wmsb.detail.product', {
            wmsbp: record,
            productSearchFunction: self.search
         });
      });



   };

   // Create - Build default data
   self.create = function () {
      var record;

      record = {
         updatetype: 'Add',
         cono: UserService.getCono(),
         whse: self.wmsb.whse,
         binloc: self.wmsb.binloc,
         minqtyenablefl: (self.wmsb.assigncode.toUpperCase() === 'P'),
         maxqtyenablefl: (self.wmsb.assigncode.toUpperCase() === 'P'),
         qtyonhandenablefl: Sasoo.chgbalfl,
         qtycommittedenablefl: Sasoo.chgbalfl,
         qtyreceivedenablefl: Sasoo.chgbalfl,
         qtyonhand: 0,
         qtycommitted: 0,
         qtyreceived: 0,
         maxqty: 0,
         minqty: 0
      };

      $state.go('wmsb.detail.product', {
         wmsbp: record,
         productSearchFunction: self.search
      });
   };


   // Search Selection - Build Grid Data - productList
   self.search = function () {

      DataService.post('api/wm/aswmentry/wmsbpsearch', { data: self.keyData, busy: true }, function (data) {
         if (data) {
            // Load the Records into the Grid
            self.wmsbpList = data;
         }
      });
   };


   // Delete - Single Record
   self.delete = function () {
      // Proceed if any rows are selected
      var rowIds = GridService.getSelectedRowIds(self.grid, 'rowidWmsbp');
      if (rowIds && rowIds.length) {
         var message = 'question.are.you.sure.you.want.to.delete';

         MessageService.okCancel('global.delete.confirmation', message, function () {
            var deleteCallback = function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               self.search();
            };
            var deleteCallbackWithFails = function () {
               MessageService.info('global.information', 'message.delete.operation.attempted');
               self.search();
            };
            DataService.delete('api/wm/wmsbp/deletelistbyrowids', { data: rowIds, busy: true }, deleteCallback, deleteCallbackWithFails);
         });
      }
   };


   // Search when first enter the Detail Tab
   self.wmsb.$promise.then(function () {
      self.search();
   });

});

app.controller('WmsbProductDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {

   var self = this;
   self.prods = $scope.prods;
   self.wmsb = $scope.dtl.wmsb;

   // Single Grid Record Selected or New Record for Add
   self.wmsbp = $stateParams.wmsbp;
   if (!self.wmsbp) {
      $state.go('wmsb.master');
   }

   self.editSelected = function () {
      self.wmsbp.updatetype = 'Chg';
   };

   self.changeProduct = function (e) {
      if (e.value) {
         var params = {
            prod: e.value,
            fldlist: 'unitstock'
         };
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {
            if (icsp && icsp.unitstock) {
               self.wmsbp.unitstock = icsp.unitstock;
            }
         });
      }
   };

   // Sensitivity of Fields
   self.isChangeMode = function () {
      return self.wmsbp.updatetype === 'Chg';
   };

   // Sensitivity of Fields
   self.isAddMode = function () {
      return self.wmsbp.updatetype === 'Add';
   };


   // Save Button
   self.submit = function () {

      var saveCallback = function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         $stateParams.productSearchFunction();
      };

      // Perform custom save or standard
      if (self.isAddMode()) {
         DataService.create('api/wm/wmsbp', {data: self.wmsbp, busy: true}, saveCallback);
      } else {
         DataService.update('api/wm/wmsbp', { data: self.wmsbp, busy: true }, saveCallback);
      }
   };

});