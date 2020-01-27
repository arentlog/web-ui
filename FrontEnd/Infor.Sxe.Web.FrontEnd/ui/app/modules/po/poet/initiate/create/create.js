'use strict';

app.controller('PoetInitiateCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, MruService, GridService, RecoveryService, AodataService, ModalService, AuthService, Sasc, Sasoo, Utils, Constants) {
   var self = this;
   var base = $scope.base;

   base.sidebarCollapsed = true;
   base.isAddOrderMode = true;

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         $scope.base.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'finish') {
         self.getCurrentPohdrStep4();
      }
   };

   self.copy = function () {
      $state.go(base.baseState + '.copy');
   };

   self.maintain = function () {
      $state.go(base.baseState + '.maintain');
   };

   self.delete = function () {
      $state.go(base.baseState + '.delete');
   };

   self.print = function () {
      $state.go(base.baseState + '.print');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.launchManualAcknowledgement = function () {
      $state.go('poea.master');
   };

   self.entryDefaultsClicked = function () {
      $state.go(base.baseState + '.initiate.entryDefaults');
   };

   self.continue = function () {
      self.purchaseOrderTypeValidation();
   };

   self.vendorSelected = function (args) {
      if (args.value) {
         var params = { vendno: args.value };
         DataService.get('api/ap/apsv/getbypk', { params: params }, function (data) {
            if (data) {
               //set the Vendor in base for access throughout POET
               base.apsv = data;

               base.pohdr.vendname = data.name;
               base.pohdr.vendaddr1 = data.addr1;
               base.pohdr.vendaddr2 = data.addr2;
               base.pohdr.vendaddr3 = data.addr3;
               base.pohdr.vendcity = data.city;
               base.pohdr.vendstate = data.state;
               base.pohdr.vendzipcd = data.zipcd;

               if (data.shipviaty) {
                  base.pohdr.shipviaty = data.shipviaty;
               }
               if (base.pohdr.shipfmno) {
                  base.pohdr.shipfmno = data.shipfmno;
               } else {
                  base.pohdr.shipfmno = 0;
               }

               base.isManualAddressVisible = data.vendno === base.MISC_VENDOR;

               base.isShipViaLimited = data.limitshipvia;

               //User Hook (do not rename)
               if (self.vendorSelectedContinue) {
                  self.vendorSelectedContinue(data);
               }

               //NOTE: We are not calculating vendor claims at the time of Vendor selection.  Will do when they march
               //forward in the workflow.  No need to hit the backend at this point.

            } else {
               base.isShipViaLimited = false;
               base.isManualAddressVisible = false;

               //User Hook (do not rename)
               if (self.vendorSelectedNoneContinue) {
                  self.vendorSelectedNoneContinue();
               }
            }
         });
      } else {
         base.pohdr.vendname = "";
         base.pohdr.vendaddr1 = "";
         base.pohdr.vendaddr2 = "";
         base.pohdr.vendaddr3 = "";
         base.pohdr.vendcity = "";
         base.pohdr.vendstate = "";
         base.pohdr.vendzipcd = "";
         base.isShipViaLimited = false;
         base.isManualAddressVisible = false;

         //User Hook (do not rename)
         if (self.vendorSelectedNoneContinue) {
            self.vendorSelectedNoneContinue();
         }
      }
   };

   self.shipFromSelected = function (args) {
      if (args.value) {
         var fieldList = '';
         DataService.get('api/ap/apss/getbyrowpointer/' + args.rowPointer + '?fldlist=' + fieldList, function (data) {
            if (data) {
               base.isShipViaLimited = data.limitshipvia;

               //User Hook (do not rename)
               if (self.shipFromSelectedContinue) {
                  self.shipFromSelectedContinue(data);
               }
            } else {
               base.isShipViaLimited = false;

               //User Hook (do not rename)
               if (self.shipFromSelectedNoneContinue) {
                  self.shipFromSelectedNoneContinue();
               }
            }
         });
      } else {
         base.isShipViaLimited = false;

         //User Hook (do not rename)
         if (self.shipFromSelectedNoneContinue) {
            self.shipFromSelectedNoneContinue();
         }
      }
   };

   self.shipToWarehouseSelected = function (args) {
      if (args.value) {
         var params = { whse: args.value };
         DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
            if (data) {
               //set the warehouse in base for access throughout POET
               base.icsd = data;

               base.pohdr.shiptoaddr1 = data.addr1;
               base.pohdr.shiptoaddr2 = data.addr2;
               base.pohdr.shiptoaddr3 = data.addr3;
               base.pohdr.shiptocity = data.city;
               base.pohdr.shiptostate = data.state;
               base.pohdr.shiptozipcd = data.zipcd;
            }
         });
      } else {
         base.icsd = {};

         base.pohdr.shiptoaddr1 = '';
         base.pohdr.shiptoaddr2 = '';
         base.pohdr.shiptoaddr3 = '';
         base.pohdr.shiptocity = '';
         base.pohdr.shiptostate = '';
         base.pohdr.shiptozipcd = '';
      }
   };

   self.launchVendorClaims = function () {
      //When it releases, then continue on to the purchaseOrderValidationStep4ShowOrderType (initiated in the callback)
      MessageService.yesNo('global.question', 'question.vendor.contract.amount.found.want.to.claim',
         // Yes processing
         function () {
            //Regardless if they hit Submit or Cancel from Vendor Claims, we march forward in workflow.  If they hit 'Back' from the
            //control, we come back to this spot.
            $state.go(base.baseState + '.initiate.vendorClaims', { submitCallback: self.vendorClaimsCallback, cancelCallback: self.vendorClaimsCallback });
         }, // No processing
         function () {
            self.purchaseOrderValidationStep4ShowOrderType();
         });
   };

   self.purchaseOrderTypeValidation = function () {
      if (base.pohdr.vendno === base.MISC_VENDOR) {
         //"No Misc Vendor Security in POET"
         AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'banner', 'vendor', '', '', null, self.authPointCreatePoMiscVendPassed, null);
      } else {
         self.purchaseOrderValidationStep2FindVendorClaims();
      }
   };

   self.purchaseOrderValidationStep2FindVendorClaims = function () {
      if (base.pohdr.vendno) {
         var requestCriteria = {
            pvVendno: base.pohdr.vendno
         };

         DataService.get('api/po/aspoheader/povendorcreditretrieve/{pvVendno}', { pathParams: requestCriteria, busy: true }, function (data) {
            if (data) {
               base.calculateVendorClaims(data);
               self.purchaseOrderValidationStep3Validation();
            }
         });
      } else {
         MessageService.error('global.error', 'message.please.enter.a.valid.vendor');
      }
   };

   self.purchaseOrderValidationStep3Validation = function () {
      if (!base.pohdr.whse) {
         if (!base.pohdr.vendno) {
            MessageService.error('global.error', 'message.please.enter.a.valid.warehouse.and.vendor');
            return;
         } else {
            MessageService.error('global.error', 'message.please.enter.a.valid.warehouse');
            return;
         }
      }

      if (!base.pohdr.vendno) {
         MessageService.error('global.error', 'message.please.enter.a.valid.vendor');
         return;
      }

      if (base.isVendorContractClaimsAvailable) {
         self.launchVendorClaims();
      } else {
         self.purchaseOrderValidationStep4ShowOrderType();
      }
   };

   self.purchaseOrderValidationStep4ShowOrderType = function () {
      if (base.pohdr.potype === base.PURCHASEORDER_TYPE_RETURN) {
         //When it releases, then continue on to the purchaseOrderValidationStep5Create (initiated in the callback)
         $state.go(base.baseState + '.initiate.return', { submitCallback: self.orderTypeReturnCallback });
      } else {
         self.purchaseOrderValidationStep5Create();
      }
   };

   self.purchaseOrderValidationStep5Create = function () {
      DataService.post('api/po/aspoheader/poheadercreate', { data: base.pohdr, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               base.pohdr.pono = data.iNewPONo;

               if (base.pohdr.pono === 0) {
                  MessageService.error('global.error', 'message.an.error.occurred.while.creating.the.po');
               } else {

                  RecoveryService.createRecoveryRecord(base.MENU_FUNCTION_POET, 0, base.delimitedPurchaseOrderNumber());
                  self.getCurrentPohdr();
               }
            }
         }
      });
   };

   self.getCurrentPohdrStep4 = function () {
      //If the default currency type isn't set, set it.
      if (base.pohdr.currencyty && !base.isDefaultCurrencySymbolSet) {
         base.setDefaultCurrencySymbolForVendor(base.pohdr.currencyty);
      }

      //Set the ManualAddressVisible flag
      base.isManualAddressVisible = base.pohdr.vendno === base.MISC_VENDOR;

      //Get these so we have a count available while the user has the PO open, the "Claim Amount" button is available.
      base.findVendorContractsToClaim();

      base.inDrillDownOperation = true;

      //Navigate Forward
      $state.go(base.defaultLineEntryState);
   };

   //Determine if we need to show the WL Status View.  'Continue' from there onto line entry.
   self.getCurrentPohdrStep3 = function () {
      if (base.pohdr.wlwhsefl && base.pohdr.bannerfl && base.pohdr.editorderfl) {
         $state.go(base.baseState + '.maintain.orderStatus', { whseLogStatus: base.whseLogStatus, menuFunction: base.MENU_FUNCTION_POET, setWhseLogStatusCallback: self.setWhseLogStatusCallback });
      } else {
         self.getCurrentPohdrStep4();
      }
   };

   self.getCurrentPohdrStep2 = function () {
      base.updateLineItems();

      // Always suffix = zero and this point.
      var purchaseOrderNumber = base.pohdr.pono.toString() + '-00';
      MruService.addToList('POOrder', base.pohdr.rowpointer, purchaseOrderNumber, base.pohdr.pono, base.pohdr.posuf);

      if (base.pohdr.wlwhsefl && base.pohdr.stagecd >= self.PO_STAGE_PRINTED && base.pohdr.potype !== base.PURCHASEORDER_TYPE_DIRECTORDER) {
         //"Change a Printed TWL Warehouse Order"
         AuthService.createAuthPoint(
            base.MENU_FUNCTION_POET,
            'banner',
            'orderno',
            'c',
            '',
            null,
            self.authPointChangePrintedTwlOrderPassed,
            self.authPointChangePrintedTwlOrderFailed);
      } else {
         self.getCurrentPohdrStep3();
      }
   };

   self.getCurrentPohdr = function () {

      var poHeaderRetrieveCriteria = {
         pono: base.pohdr.pono,
         posuf: base.pohdr.posuf
      };

      DataService.post('api/po/aspoheader/poheaderretrieve', { data: poHeaderRetrieveCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {

               base.pohdr = data.pohdr;

               base.setReturnType();
               base.loadVendorAddress();

               base.isManualAddressVisible = data.pohdr.vendno === base.MISC_VENDOR;

               //Determine if there are Ship Via Limitations at Shipto or Vendor level.
               if (base.pohdr.shipfmno > 0) {
                  base.getShipFrom(self.getCurrentPohdrStep2);
               } else {
                  base.getVendor(self.getCurrentPohdrStep2);
               }
            }
         }
      });
   };

   self.forcedReset = function () {
      RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, base.delimitedPurchaseOrderNumber());
   };

   self.authPointCreatePoMiscVendPassed = function () {
      //Passed Misc Vendor Authorization, continue.
      self.purchaseOrderValidationStep2FindVendorClaims();
   };

   self.authPointChangePrintedTwlOrderPassed = function () {
      self.getCurrentPohdrStep3();
   };

   self.authPointChangePrintedTwlOrderFailed = function () {
      self.forcedReset();
      //At this point in the workflow, the PO had been created.  We need to clean up after ourselves.
      var poordercancelCriteria = {
         pono: base.pohdr.pono,
         posuf: base.pohdr.posuf,
         secure: base.operatorMenuSecurity
      };
      DataService.post('api/po/aspoheader/poordercancel', { data: poordercancelCriteria, busy: true }, function () {
         RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_POET, 0, base.delimitedPurchaseOrderNumber());
         base.resetPohdr();
         $state.go(base.baseState + '.initiate');
      });
   };

   self.orderTypeReturnCallback = function () {
      self.purchaseOrderValidationStep5Create();
   };

   self.vendorClaimsCallback = function () {
      self.purchaseOrderValidationStep4ShowOrderType();
   };

});

app.controller('PoetReturnCtrl', function ($state, $scope, $stateParams) {
   var self = this;
   var base = $scope.base;
   self.submitCallback = $stateParams.submitCallback;
   self.currentPohdr = {};

   self.submit = function () {
      base.pohdr.crreasonty = self.currentPohdr.crreasonty;
      base.pohdr.apinvno = self.currentPohdr.apinvno;
      if (self.submitCallback) {
         self.submitCallback();
      }
   };

   //By design there is no cancel here.  Force the user to Submit or hit Back.

   self.back = function () {
      $state.go('^');
   };
});
