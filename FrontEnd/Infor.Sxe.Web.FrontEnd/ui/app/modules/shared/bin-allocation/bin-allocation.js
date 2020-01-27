'use strict';

/**
 * Steps to implement this Bin Allocation control.
 *
 * 1) In your calling view with WYSIWYG, create View Container and assign it with an exact name of:  'binAllocation'
 * 2) In the calling view controller:
 *    a) Config
 *        i) Inject: BinAllocationStateProvider
 *        ii) Wire in: BinAllocationStateProvider.addStates(MODULE, FUNCTION, PARENT)); (i.e. 'wm', 'wmea', 'wmea.master')
 *    b) Controller where the Bin Allocation is implemented
 *        i) Function: binAllocationSavedCallback - This will get called when Save is performed from Bin Allocation Control
 *        ii) Function: binAllocationActionsCallback - This will get called when Auto Allocate or DeAllocate is performed.
 *        iii) You then implement these features as required.  Each place this is consumed is unique and some might not
 *             even do anything.
          iv) Function: cancelCallback - There are some menu's where we need to display message on back/cancel button and needs to navigate different state instead parent state.
              This function call will fire when we hit back button and it is defined in respective menus
              Ex: From ICEU wjen user save unavialable details bin allocation will open and if user click on cancel from bin allocation
              it should navigate to ICEU master instead of details.

 */
app.provider('BinAllocationState', function BinAllocationStateProvider($stateProvider) {
   var self = this;

   /**
    * Provider access method
    */
   this.$get = [function () {
      return self;
   }];

   /**
    * These States are used to help make it easier to implement, and share code.  Having them in this control means
    * that it doesn't need these states in each place this ins called.
    */
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.bin-allocation', {
         url: '/bin-allocation',
         params: {
            criteria: null,
            binallocationRowId: null,
            binAllocationDisabled: null,
            submittedCallback: null,
            actionsCallback: null,
            cancelCallback: null
         },
         views: {
            binAllocation: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/bin-allocation/bin-allocation.json');
               },
               controller: 'BinAllocationCtrl as bac'
            }
         }
      });

      $stateProvider.state(parentState + '.bin-allocation.create', {
         url: '/create',
         views: {
            create: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/bin-allocation/bin-allocation-row-add.json');
               },
               controller: 'BinAllocationRowAddCtrl as baccrt'
            }
         }
      });
   };
});

//Separate View used for Add mode.
//Alias: baccrt
app.controller('BinAllocationRowAddCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var bac = $scope.bac;

   self.binallocationRow = angular.copy(bac.assignment);

   //Default in some values.
   self.buyselllabel = bac.criteria.wmadjtype.toLowerCase() === 'buy' ? MessageService.get('global.buy.qty') : MessageService.get('global.ship.qty');
   self.binallocationRow.prod = angular.copy(bac.criteria.prod);
   self.binallocationRow.wasStockQty = true;
   self.binallocationRow.buysellqty = 0;
   self.binallocationRow.whse = angular.copy(bac.assignment.whse);
   self.binallocationRow.stockqty = angular.copy(bac.assignment.proofqty);
   self.binallocationRow.useStockQty = true;
   self.binallocationRow.binloc = '';

   self.stockQtyLeave = function () {
      self.binallocationRow.useStockQty = true;

      //Build criteria object.
      var params = {
         pvWhse: self.binallocationRow.whse,
         pvProd: self.binallocationRow.prod,
         pvBuysellunit: self.binallocationRow.buysellunit,
         pvStockqty: self.binallocationRow.stockqty
      };

      if (self.binallocationRow.buysellqtyenabled) {
         DataService.get('api/wm/aswmentry/wmbinassignbuysellqtycalculate/' + params.pvWhse + '/' +
            params.pvProd + '/' + params.pvBuysellunit + '/' + params.pvStockqty.toString(), { busy: true }, function (data) {
               if (data) {
                  self.binallocationRow.buysellqty = data;
               }
            });
      }
   };

   self.buysellQtyLeave = function () {
      self.binallocationRow.useStockQty = false;

      //Build criteria object.
      var params = {
         pvWhse: self.binallocationRow.whse,
         pvProd: self.binallocationRow.prod,
         pvBuysellunit: self.binallocationRow.buysellunit,
         pvBuysellqty: self.binallocationRow.buysellqty
      };

      DataService.get('api/wm/aswmentry/wmbinassignstkqtycalculate/' + params.pvWhse + '/' +
      params.pvProd + '/' + params.pvBuysellunit + '/' + params.pvBuysellqty.toString(), { busy: true }, function (data) {
         if (data) {
            self.binallocationRow.stockqty = data;
         }
      });

   };

   self.cancel = function () {
      $state.go('^');
   };

   self.binLocationSelected = function () {
      var params = {
         whse: bac.assignment.whse,
         binloc: self.binallocationRow.binloc
      };

      DataService.get('api/wm/wmsb/existsbypk', { params: params, busy: true }, function (data) {
         if (!data) {
            MessageService.error('global.error', 'error.warehouse.manager.bin.invalid');
         } else {
            self.stockQtyLeave();
         }
      });
   };

   self.ok = function () {
      if (self.binallocationRow.binloc && self.binallocationRow.binloc.length > 0 && self.binallocationRow.stockqty > 0) {
         bac.createRow(self.binallocationRow.binloc,
                       (self.binallocationRow.useStockQty ? self.binallocationRow.stockqty : self.binallocationRow.buysellqty),
                       self.binallocationRow.useStockQty,
            function () {
               $state.go('^');
            });
      } else {
         if (self.binallocationRow.binloc.length === 0) {
            MessageService.error('global.error', 'global.bin.location.is.required');
         } else if (self.binallocationRow.stockqty <= 0) {
            MessageService.error('global.error', 'message.quantity.must.be.greater.than.0');
         }
      }
   };

});

// The Main Controller for the Bin Allocation Controller
// Alias: bac
app.controller('BinAllocationCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;

   self.criteria = $stateParams.criteria;
   self.binAllocationDisabled = $stateParams.binAllocationDisabled;
   self.submittedCallback = $stateParams.submittedCallback;
   self.actionsCallback = $stateParams.actionsCallback;

   self.assignment = {};
   self.assignmenttrans = [];
   self.productlabel = MessageService.get('global.product');
   self.allocationActionLabel = '';
   self.isRowAddMode = false;

   //This is needed so we can hide other views appropriately.
   self.isBinAllocationMaster = function () {
      return $state.current.name.endsWith('.bin-allocation');
   };

   self.isWmadjtypeBuy = function () {
      if (self.assignment && self.assignment.wmadjtype) {
         return self.assignment.wmadjtype.toLowerCase() === 'buy';
      } else {
         return false;
      }
   };

   self.isSellQtyCellEditable = function (row, cell, value, column, item) {
      if (item.stockunit.toLowerCase() !== item.buysellunit.toLowerCase()) {
         return true;
      } else {
         return false;
      }
   };

   if (self.criteria) {
      DataService.post('api/wm/aswmentry/wmbinassigninit', { data: self.criteria, busy: true }, function (data) {
         if (data.messaging.length > 0) {
            MessageService.errorMessages(data.messaging);
         } else {
            self.assignment = data.wmbinassignment;
            self.assignmenttrans = data.wmbinassignmenttrans;
            if (self.assignment) {

               if (self.assignment.kprodty) {
                  switch (self.assignment.kprodty.toLowerCase()) {
                     case 'product':
                        self.productlabel = MessageService.get('global.product');
                        break;
                     case 'component':
                        self.productlabel = MessageService.get('global.component');
                        break;
                     case 'kit':
                        self.productlabel = MessageService.get('global.kit');
                        break;
                     default:
                        self.productlabel = MessageService.get('global.product');
                  }
               } else {
                  self.productLabel = MessageService.get('global.product');
               }

               if (self.assignment.formtitletype) {
                  switch (self.assignment.formtitletype.toLowerCase()) {
                     case 'add':
                        self.allocationActionLabel = MessageService.get('global.add.product.to.this.bin');
                        break;
                     case 'remove':
                        self.allocationActionLabel = MessageService.get('global.remove.product.from.this.bin');
                        break;
                     case 'assign':
                        self.allocationActionLabel = MessageService.get('global.whse.manager.bin.assignments');
                        break;
                     default:
                        self.allocationActionLabel = "";
                  }
               } else {
                  self.allocationActionLabel = "";
               }
            }
         }
      });
   }

   self.gridCellChange = function (e, args) {
      var record = self.assignmenttrans[args.row];

      var wmBinAssignQtyValidate = {
         wmbinassignment: self.assignment,
         wmbinassignmenttrans: record
      };
      if (args.column.field.toLowerCase() === 'stockqty') {
         DataService.post('api/wm/aswmentry/wmbinassignstkqtyvalidate', { data: wmBinAssignQtyValidate, busy: true }, function (data) {
            if (data) {
               if (data.cWarningMessage !== "") {
                  MessageService.info('global.information', data.cWarningMessage);
               }
               self.assignment = data.wmbinassignment;
               self.assignmenttrans[args.row] = data.wmbinassignmenttrans;
            }
         });
      } else {
         DataService.post('api/wm/aswmentry/wmbinassignbuysellqtyvalidate', { data: wmBinAssignQtyValidate, busy: true }, function (data) {
            if (data) {
               if (data.cWarningMessage !== "") {
                  MessageService.info('global.information', data.cWarningMessage);
               }
               self.assignment = data.wmbinassignment;
               self.assignmenttrans[args.row] = data.wmbinassignmenttrans;
            }
         });
      }
   };

   self.create = function () {
      $state.go('.create', { currentRow: null });
   };

   self.createRow = function (bin, qty, qtytype, callback) {

      var wmBinAssignRowCreateRequest = {
         wmbinassigncriteria: self.criteria,
         wmbinassignment: self.assignment,
         wmbinassignmenttrans: self.assignmenttrans,
         pvBinloc: bin,
         pvQty: qty,
         pvStockqtytype: qtytype
      };

      DataService.post('api/wm/aswmentry/wmbinassignrowcreate', { data: wmBinAssignRowCreateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               self.assignment = data.wmbinassignment;
               self.assignmenttrans = data.wmbinassignmenttrans;
               if (callback) {
                  callback(data.wmbinassignment);
               }
            }
         }
      });
   };

   self.save = function () {
      /* In ICEU menu function when proofqty is non zero no need to call update as it is returning invalid proofqty
         and SI call not returning any message so added this check condition */
      if (self.criteria.currproc === 'icet' && self.assignment && self.assignment.proofqty) {
         MessageService.info('global.information', 'error.warehouse.manager.bin.not.allocated');
      } else {
         var wmbinassignupdateRequest = {
            wmbinassignmenttrans: self.assignmenttrans,
            wmbinassigncriteria: self.criteria,
            wmbinassignment: self.assignment
         };

         DataService.post('api/wm/aswmentry/wmbinassignupdate', { data: wmbinassignupdateRequest, busy: true }, function (data) {
            if (data) {
               //Communicate to the calling places that we are done and have an updated Quantity they can use.
               var callback = Utils.getNestedValue($scope, $stateParams.submittedCallback);
               if (callback) {
                  callback(data.wmbinassignment);
               }
            }
         });
      }
   };

   self.autoAssign = function () {
      self.criteria = $stateParams.criteria;

      var wmbinassignautoallocateRequest = {
         wmbinassignmenttrans: self.assignmenttrans,
         wmbinassigncriteria: self.criteria,
         wmbinassignment: self.assignment
      };

      DataService.post('api/wm/aswmentry/wmbinassignautoallocate', { data: wmbinassignautoallocateRequest, busy: true }, function (data) {
         if (data.messaging.length > 0) {
            MessageService.errorMessages(data.messaging);
         } else {
            self.assignment = data.wmbinassignment;
            self.assignmenttrans = data.wmbinassignmenttrans;

            if (data) {
               //Communicate to the calling places that we are done and have an updated Quantity they can use.
               var callback = Utils.getNestedValue($scope, $stateParams.actionsCallback);
               if (callback) {
                  callback(data.wmbinassignment);
               }
            }
         }
      });
   };

   self.deAllocate = function () {
      var wmbinassigndeallocateRequest = {
         wmbinassignmenttrans: self.assignmenttrans,
         wmbinassigncriteria: self.criteria,
         wmbinassignment: self.assignment
      };
      DataService.post('api/wm/aswmentry/wmbinassigndeallocate', { data: wmbinassigndeallocateRequest, busy: true }, function (data) {
         if (data.messaging.length > 0) {
            MessageService.errorMessages(data.messaging);
         } else {
            self.assignment = data.wmbinassignment;
            self.assignmenttrans = data.wmbinassignmenttrans;

            if (data) {
               //Communicate to the calling places that we are done and have an updated Quantity they can use.
               var callback = Utils.getNestedValue($scope, $stateParams.actionsCallback);
               if (callback) {
                  callback(data.wmbinassignment);
               }
            }
         }
      });
   };

   self.cancel = function () {
      if ($stateParams.cancelCallback) {
         if (self.assignment.stkqtyship !== 0) {
            MessageService.yesNo('global.confirmation', 'question.warehouse.manager.bin.allocation.cancel.message', function () { //yes
               var callback = Utils.getNestedValue($scope, $stateParams.cancelCallback);
               if (callback) {
                  callback();
               }
            });
         } else {
            $state.go('^');
         }
      } else {
         $state.go('^');
      }
   };
});