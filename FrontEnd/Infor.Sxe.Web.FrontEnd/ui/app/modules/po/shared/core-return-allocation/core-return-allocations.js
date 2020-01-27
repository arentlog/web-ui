'use strict';

app.controller('PoCoreReturnAllocationsCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService, UserService, MessageService, GridService, SecurityService) {
   // alias => poCRA
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   self.functionName = '';
   self.purchaseOrderObject = {};
   self.purchaseOrderLine = {};
   self.poLineObject = {};

   self.LEAVEFIELD_PROD = "prod";
   self.LEAVEFIELD_WHSE = "whse";
   self.poCoreAllocationCriteria = {};
   self.poCoreAllocationSingle = {};
   self.poCoreAllocationResults = [];
   self.poCoreAllocationResultsFiltered = [];
   self.poCoreAllocationUpdate = [];
   self.origProofAmt = 0;
   self.SECURITYLEVEL_INQUIRY = 2;
   self.LINEADDCHANGEMODE_CHANGE = 'c';

   self.isShowExpiredAllocationsButton = true;
   self.isSelectEnabled = true;

   if (options.functionNameModel) {
      self.functionName = options.functionNameModel;
   }

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(self.functionName);

   if (options.submitCallbackModel) {
      self.submitCallback = Utils.getNestedValue($scope, options.submitCallbackModel);
   }

   if (options.cancelCallbackModel) {
      self.cancelCallback = Utils.getNestedValue($scope, options.cancelCallbackModel);
   }

   if (options.purchaseOrderModel) {
      self.purchaseOrderObject = Utils.getNestedValue($scope, options.purchaseOrderModel);
   }

   if (options.purchaseOrderLineModel) {
      self.purchaseOrderLine = Utils.getNestedValue($scope, options.purchaseOrderLineModel);
   }

   if (self.functionName === 'poei') {
      self.poLineObject.prod = self.purchaseOrderLine.shipprod;
      self.poLineObject.stkqtyord = self.purchaseOrderLine.qtyord;
      self.poLineObject.scrnprice = self.purchaseOrderLine.price;
      self.poLineObject.lWarrantyFl = false; //doesnt exist in the POEI record
      self.poLineObject.unitconv = self.purchaseOrderLine.unit;
   } else if (self.functionName === 'poet') {
      self.poLineObject.prod = self.purchaseOrderLine.prod;
      //If in Add mode, we want to assign the Qty Ordered (not the default 1).
      self.poLineObject.stkqtyord = self.purchaseOrderLine.maintL === self.LINEADDCHANGEMODE_CHANGE ? self.purchaseOrderLine.stkqtyord : self.purchaseOrderLine.qtyord;
      self.poLineObject.scrnprice = self.purchaseOrderLine.scrnprice;
      self.poLineObject.lWarrantyFl = self.purchaseOrderLine.lWarrantyFl;
      self.poLineObject.unitconv = self.purchaseOrderLine.unitconv;
   }
   self.poLineObject.lineno = self.purchaseOrderLine.lineno;
   self.poLineObject.qtyord = self.purchaseOrderLine.qtyord;
   self.poLineObject.speccostty = self.purchaseOrderLine.speccostty;

   self.getResultsLabel = function () {
      if (self.isShowExpiredAllocationsButton) {
         return $translate.instant('global.unexpired.cores');
      } else {
         return $translate.instant('global.expired.cores');
      }
   };

   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('poip.detail', { pk: currentRow.pono, pk2: currentRow.posuf });
      }
   };

   //If any rows are allocated, then we need to disable the banner fields.
   self.enableDisableBannerFields = function () {
      var lEnabled = true;
      if (self.poCoreAllocationResults) {
         //Try to find any rows that are allocated.
         var poCoreAllocationResultsAllocated = self.poCoreAllocationResults.filter(function (row) {
            return row.qtyalloc > 0;
         });

         //If any have been allocated, then they can't change the Product.
         if (poCoreAllocationResultsAllocated && poCoreAllocationResultsAllocated.length > 0) {
            lEnabled = false;
         }
      }

      if (self.poCoreAllocationSingle) {
         self.poCoreAllocationSingle.prodenabled = lEnabled;
         self.poCoreAllocationSingle.whseenabled = lEnabled;
      }
   };

   //The purpose of this function is to select the currently selected Core and de-select any others.  It's also responsible
   //for updating the proof.  NOTE:  Only one row can be selected at a time in the grid, and only 1 row can be allocated as
   //well.  This will toggle if others are selected.
   self.selectDeselectPO = function () {
      //Only can work with one row at a time.
      var selectedRow = GridService.getSelectedRecord(self.allocationsGrid);

      if (selectedRow) {

         //Only if we're viewing Non-Expired Cores should we be able to modify.
         if (self.poCoreAllocationCriteria && self.poCoreAllocationSingle &&
            self.poCoreAllocationCriteria.iSecure > self.SECURITYLEVEL_INQUIRY && self.isShowExpiredAllocationsButton) {

            var proof = self.poCoreAllocationSingle.dProofAmt;
            var isDeallocated = false;

            // If already allocated, de-allocate qty
            if (selectedRow.qtyalloc > 0) {
               proof += selectedRow.qtyalloc;
               self.poCoreAllocationSingle.dProofAmt = proof;
               selectedRow.qtyalloc = 0;
               selectedRow.modifyfl = true;
            } else {
               // If the current line is not allocated, remove any other allocations since only one line
               // can be allocated and then allocate the current line.
               self.poCoreAllocationResults.forEach(function (result) {
                  proof += result.qtyalloc;
                  result.qtyalloc = 0;
                  result.modifyfl = true;
                  isDeallocated = true;
               });

               if (isDeallocated) {
                  self.poCoreAllocationSingle.dProofAmt = proof;
               }

               if (selectedRow.qtyalloc < 0) {
                  MessageService.error('global.error', 'message.cannot.allocate.a.negative.quantity');
                  return;
               }

               // Allocate the Full Proof Amount or what is available
               selectedRow.qtyalloc = Math.min(self.poCoreAllocationSingle.dCoreQty, selectedRow.qty);
               selectedRow.modifyfl = true;
               proof -= selectedRow.qtyalloc;
               self.poCoreAllocationSingle.dProofAmt = proof;
            }

            self.enableDisableBannerFields();

            self.buildFilteredList();
            self.allocationsGrid.loadData(self.poCoreAllocationResultsFiltered);
         }
      }
   };

   //There's one collection from the backend call but we bind to a filtered collection based on what we're viewing.
   //If in "Unexpired" view (meaning they haven't been consumed), include if they have a date now in the future.
   //If in "Expired" view, include anything in the past.
   self.buildFilteredList = function () {
      self.poCoreAllocationResultsFiltered = self.poCoreAllocationResults.filter(function (row) {
         return self.isShowExpiredAllocationsButton && row.coreduedt >= Utils.getCurrentDate() || !self.isShowExpiredAllocationsButton && row.coreduedt < Utils.getCurrentDate();
      });
   };

   self.selectExpiredCores = function () {
      self.isSelectEnabled = false;
      self.isShowExpiredAllocationsButton = false;
      self.buildFilteredList();
   };

   self.selectUnexpiredCores = function () {
      self.isSelectEnabled = true;
      self.isShowExpiredAllocationsButton = true;
      self.buildFilteredList();
   };

   self.fieldChanged = function (fieldName) {
      var pocoreallocationleavefieldCriteria = {
         pocoreallocationcriteria: self.poCoreAllocationCriteria,
         pocoreallocationsingle: self.poCoreAllocationSingle,
         pocoreallocationresults: self.poCoreAllocationResults,
         cFieldName: fieldName
      };

      DataService.post('api/po/aspoline/pocoreallocationleavefield', { data: pocoreallocationleavefieldCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(self.poCoreAllocationSingle, data.pocoreallocationsingle);
               Utils.replaceObject(self.poCoreAllocationResults, data.pocoreallocationresults);

               self.enableDisableBannerFields();
               self.buildFilteredList();
            }
         }
      });
   };

   self.productChanged = function () {
      if (self.poCoreAllocationSingle && self.poCoreAllocationSingle.prodenabled &&
         self.poCoreAllocationSingle.cScrnProd !== self.poCoreAllocationSingle.cProd) {
         self.fieldChanged(self.LEAVEFIELD_PROD);
      }
   };

   self.warehouseChanged = function () {
      if (self.poCoreAllocationSingle && self.poCoreAllocationSingle.prodenabled &&
         self.poCoreAllocationSingle.cScrnWhse !== self.poCoreAllocationSingle.cWhse) {
         self.fieldChanged(self.LEAVEFIELD_WHSE);
      }
   };

   self.submitContinue = function () {
      var pocoreallocationupdateCriteria = {
         pocoreallocationsingle: self.poCoreAllocationSingle,
         pocoreallocationcriteria: self.poCoreAllocationCriteria,
         pocoreallocationresults: self.poCoreAllocationResults
      };

      DataService.post('api/po/aspoline/pocoreallocationupdate', { data: pocoreallocationupdateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(self.poCoreAllocationUpdate, data.pocoreallocationupdate);

               if (self.submitCallback) {
                  self.submitCallback(self.poCoreAllocationUpdate);
               } else {
                  $state.go('^');
               }
            }
         }
      });
   };

   self.submit = function () {
      if (self.poCoreAllocationSingle) {
         if (self.poCoreAllocationSingle.dCoreQty > self.poCoreAllocationSingle.dProofAmt &&
            self.poCoreAllocationSingle.dProofAmt !== 0) {
            MessageService.yesNo('global.question', 'question.quantity.is.not.fully.allocated.adjust.line.qty',
            // Yes processing
            function () {
               self.submitContinue();
            });
         } else {
            self.submitContinue();
         }
      }
   };

   self.cancel = function () {
      self.poCoreAllocationUpdate = {
         //NOTE: We're checking the Original Proof Amount here because if we're cancelling, we want the
         //original Allocations, not what they have Work in Process on the view.
         proofok: self.origProofAmt === 0
      };

      if (self.cancelCallback) {
         self.cancelCallback(self.poCoreAllocationUpdate);
      }

      $state.go('^');
   };

   self.initiate = function () {

      if (self.poLineObject.lineno && self.poLineObject.lineno > 0) {
         var pocoreallocationloadCriteria = {
            iPONo: self.purchaseOrderObject.pono,
            iPOSuf: self.purchaseOrderObject.posuf,
            iLineno: self.poLineObject.lineno,
            cProd: self.poLineObject.prod,
            dVendNo: self.purchaseOrderObject.vendno,
            cWhse: self.purchaseOrderObject.whse,
            iSecure: self.operatorMenuSecurity,
            cOurProc: self.functionName,
            lZeroProofReq: true,
            dQtyRcv: self.poLineObject.qtyord,
            dStkQtyRcv: self.poLineObject.stkqtyord,
            dPrice: self.poLineObject.scrnprice,
            lWarrantyFl: self.poLineObject.lWarrantyFl,
            cSpecCostTy: self.poLineObject.speccostty,
            dUnitConv: self.poLineObject.unitconv
         };

         DataService.post('api/po/aspoline/pocoreallocationload', { data: pocoreallocationloadCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  Utils.replaceObject(self.poCoreAllocationCriteria, data.pocoreallocationcriteria);
                  Utils.replaceObject(self.poCoreAllocationSingle, data.pocoreallocationsingle);
                  Utils.replaceObject(self.poCoreAllocationResults, data.pocoreallocationresults);

                  self.origProofAmt = self.poCoreAllocationSingle.dProofAmt;

                  self.enableDisableBannerFields();
                  self.buildFilteredList();
               }
            }
         });
      } else {
         self.poCoreAllocationCriteria = {};
         self.poCoreAllocationSingle = {};
         self.poCoreAllocationResults = [];
      }
   };

   self.initiate();

   self.back = function () {
      //Back needs to perform the same logic as Back.
      self.cancel();
   };
});