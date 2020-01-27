'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ic', 'icic', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icic');
});

app.controller('IcicBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('icic.master');
   };

   self.includesMaster = function () {
      return $state.includes('icic.master');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   self.prepareOrderFields = function () {
      if (self.criteria.orderno) {
         var order = self.criteria.orderno.split('-');

         if (order) {
            self.criteria.orderno = order[0];
            self.criteria.ordersuf = order[1];
         }
      }
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      self.prepareOrderFields();

      DataService.post('api/ic/asicinquiry/icicbuildmasterlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.masterDataset = data.icicmasterlist;
         }
      });

      DataService.post('api/ic/asicinquiry/icicbuildtransactionlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.transactionsDataset = data.icictransactionlist;
         }
      });

      DataService.post('api/ic/asicinquiry/icicbuildallocationlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.allocationDataset = data.icicallocationlist;
         }
      });

      DataService.post('api/ic/asicinquiry/icicbuildvendorlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.vendorDataset = data.icicvendorlist;
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('IcicSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   function initLookups() {
      self.isOrderLookupVisible = true;
      self.isPurchaseOrderLookupVisible = false;
      self.isWarehouseTransferLookupVisible = false;
   }

   initLookups();

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
      initLookups();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icic.master');
      }

      // Get data
      base.search();
   };

   self.orderTypeChanged = function () {
      if (criteria.transTy) {
         //Keeping this comment to show the indentation change in switch/case as VS ignores this change through 'Show changes' option.
         switch (criteria.transTy.toLowerCase()) {
         case 'o':
            initLookups();
            break;
         case 'p':
            self.isOrderLookupVisible = false;
            self.isPurchaseOrderLookupVisible = true;
            self.isWarehouseTransferLookupVisible = false;
            break;
         case 'w':
            self.isOrderLookupVisible = false;
            self.isPurchaseOrderLookupVisible = false;
            self.isWarehouseTransferLookupVisible = true;
            break;
         default:
            initLookups();
            break;
         }

         criteria.orderno = '';
      }
      else {
         initLookups();
      }
   };
});

app.controller('IcicMasterCtrl', function ($scope, $state) {
   var self = this;

   self.orderNumberClicked = function (e, args) {
       var currentRow = args[0].item;
       if (currentRow && currentRow.transty) {
           switch (currentRow.transty.toUpperCase()) {
               case 'O':
                   $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               case 'P':
                   $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               case 'W':
                   $state.go('wtit.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               default:
                   break;
           }
       }
   };

   self.originalProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.origprod, pk2: args[0].item.whse });
   };

   self.impliedProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.implyprod, pk2: args[0].item.whse });
   };

   self.coreProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.coreprod, pk2: args[0].item.whse });
   };

   self.customerNumberClicked = function (e, args) {
      $state.go('aric.detail', { pk: args[0].item.custno });
   };

   self.vendorNumberClicked = function (e, args) {
      $state.go('apiv.detail', { pk: args[0].item.vendno });
   };

   self.transactionOrderNumberClicked = function (e, args) {
       var currentRow = args[0].item;
       if (currentRow && currentRow.transty) {
           switch (currentRow.transty.toUpperCase()) {
               case 'O':
                   $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               case 'P':
                   $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               case 'W':
                   $state.go('wtit.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               default:
                   break;
           }
       }
   };

   self.transactionProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.prod, pk2: args[0].item.whse });
   };

   self.transactionImpliedProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.implyprod, pk2: args[0].item.whse });
   };

   self.transactionReturnOrderNumberClicked = function (e, args) {
       var currentRow = args[0].item;
       if (currentRow && currentRow.transty) {
           switch (currentRow.transty.toUpperCase()) {
               case 'O':
                   $state.go('oeio.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
                   break;
               case 'P':
                   $state.go('poip.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
                   break;
               case 'W':
                   $state.go('wtit.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
                   break;
               default:
                   break;
           }
       }
   };

   self.transactionVendorNumberClicked = function (e, args) {
      $state.go('apiv.detail', { pk: args[0].item.vendno });
   };

   self.allocationOrderNumberClicked = function (e, args) {
       var currentRow = args[0].item;
       if (currentRow && currentRow.transty) {
           switch (currentRow.transty.toUpperCase()) {
               case 'O':
                   $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               case 'P':
                   $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               case 'W':
                   $state.go('wtit.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                   break;
               default:
                   break;
           }
       }
   };

   self.allocationReturnOrderNumberClicked = function (e, args) {
       var currentRow = args[0].item;
       if (currentRow && currentRow.transty) {
           switch (currentRow.transty.toUpperCase()) {
               case 'O':
                   $state.go('oeio.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
                   break;
               case 'P':
                   $state.go('poip.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
                   break;
               case 'W':
                   $state.go('wtit.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
                   break;
               default:
                   break;
           }
       }
   };

   self.allocationProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.prod, pk2: args[0].item.whse });
   };

   self.vendorVendorNumberClicked = function (e, args) {
      $state.go('apiv.detail', { pk: args[0].item.vendno });
   };

   self.vendorOriginalProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.origprod, pk2: args[0].item.whse });
   };

   self.vendorCoreProductClicked = function (e, args) {
      $state.go('icip.detail', { pk: args[0].item.coreprod, pk2: args[0].item.whse });
   };
});
