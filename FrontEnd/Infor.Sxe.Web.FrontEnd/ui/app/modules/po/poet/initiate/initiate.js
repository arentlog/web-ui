'use strict';

app.controller('PoetMaintainCtrl', function ($state, $scope, $translate, $stateParams, DataService, MessageService, RecoveryService, UserService, AuthService, AodataService, Constants) {
   var self = this;
   var base = $scope.base;

   self.purchaseOrderNumber = '';

   base.sidebarCollapsed = true;
   base.isAddOrderMode = false;

   self.cancelRetrieve = function () {
      RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, base.delimitedPurchaseOrderNumber());
      self.forceReset();
   };

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         $scope.base.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'authPointPassed') {
         MessageService.alertOk($translate.instant('wl.order.in.process'), $translate.instant('message.you.have.authorization.to.make.changes.that.may.not.get.updated.in.wl'));
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'authPointFailed') {
         self.cancelRetrieve();
      }
   };

   self.isMaintain = function () {
      return $state.is(base.baseState + '.maintain');
   };

   self.includesMaintain = function () {
      return $state.includes(base.baseState + '.maintain');
   };

   //handle recovery records
   if ($stateParams.isRecovery) {
      if ($stateParams.recoveryId) {
         var recoveryPurchaseOrderNo = $stateParams.recoveryId;
         var recoveryPurchaseOrderSuf = $stateParams.recoverySuffix;
         var delimitedPurchaseOrderNo = recoveryPurchaseOrderNo + '-' + recoveryPurchaseOrderSuf;

         self.isPurchaseOrderVerified = true;
         self.purchaseOrderNumber = delimitedPurchaseOrderNo;

         var poheaderretrieveRequest = {
            pono: recoveryPurchaseOrderNo,
            posuf: recoveryPurchaseOrderSuf,
            maintmode: true,
            updatetype: ''
         };

         DataService.post('api/po/aspoheader/poheaderretrieve', { data: poheaderretrieveRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  $scope.base.pohdr = data.pohdr;
                  $scope.base.whseLogStatus = data.wlstatus;

                  base.setReturnType();
                  base.loadVendorAddress();

                  base.isManualAddressVisible = data.pohdr.vendno === base.MISC_VENDOR;

                  base.inDrillDownOperation = true;

                  if (base.pohdr.shipfmno > 0) {
                     base.getShipFrom();
                  } else {
                     base.getVendor();
                  }
               } else {
                  RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, delimitedPurchaseOrderNo);
                  self.forceReset();
               }
            } else {
               RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, delimitedPurchaseOrderNo);
               MessageService.alert($translate.instant('global.alert'),
                  $translate.instant('message.recovery.data.is.incomplete.could.not.recover.po') + delimitedPurchaseOrderNo);
            }
         });
      }
   } else {
      self.isPurchaseOrderVerified = false;
   }

   self.purchaseOrderChanged = function (selectedPurchaseOrder) {
      if (selectedPurchaseOrder.value > 0) {
         base.pohdr.pono = selectedPurchaseOrder.value;
         base.pohdr.posuf = selectedPurchaseOrder.value2;

         var headerRetrieveRequest = {
            pono: base.pohdr.pono,
            posuf: base.pohdr.posuf,
            maintmode: base.isAddOrderMode,
            updatetype: ""
         };
         DataService.post('api/po/aspoheader/poheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
            if (data) {
               if (data.messaging) {
                  MessageService.processMessaging(data.messaging);
               }

               var hardStop;
               var poipHyperlink = false;
               data.messaging.forEach(function (message) {
                  if (message.messagetype === 'e') {
                     hardStop = true;
                  }
                  /*Vend/Ship From Not Set Up in Ship From Setup - APSS (4302)*/
                  if (message.messagenum === 4302) {
                     poipHyperlink = true;
                  }
               });

               if (!hardStop) {
                  $scope.base.pohdr = data.pohdr;

                  //User Hook (do not rename)
                  if (self.purchaseOrderChangedContinue) {
                     self.purchaseOrderChangedContinue(data.pohdr);
                  }

                  base.setReturnType();
                  base.loadVendorAddress();
                  base.isManualAddressVisible = data.pohdr.vendno === base.MISC_VENDOR;
                  base.inDrillDownOperation = true;
               }

               if (poipHyperlink) {
                  MessageService.info('global.information', 'message.the.purchase.order.can.be.viewed.in.inquiry');
                  $state.go('poip.detail', { pk: base.pohdr.pono, pk2: base.pohdr.posuf });
               }
            }
         });
      }
   };

   self.continue = function () {
      if (base.pohdr.pono) {
         if ($scope.base.isRecovery || self.isPurchaseOrderVerified) {
            self.checkRecoveryExistsCallback(false);
         } else {
            RecoveryService.checkRecoveryExists(UserService.getUserName(), Constants.MENU_FUNCTION_POET, 0, base.delimitedPurchaseOrderNumber(), self.checkRecoveryExistsCallback);
         }
      } else {
         MessageService.error($translate.instant('global.error'), $translate.instant('message.please.enter.a.valid.purchase.order.number'));
      }
   };

   self.checkRecoveryExistsCallback = function (isRecoveryFound) {
      if (isRecoveryFound) {
         MessageService.info($translate.instant('global.information'), $translate.instant('message.purchase.order.is.currently.open.in.another.window'));
         base.resetPohdr();
      } else {
         if (self.isPurchaseOrderVerified || base.skipMaintainHeader) {
            if (base.skipMaintainHeader) {
               RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, base.delimitedPurchaseOrderNumber());
            }
            self.updatePohdr();
         } else {
            RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, base.delimitedPurchaseOrderNumber());

            var headerRetrieveRequest = {
               pono: base.pohdr.pono,
               posuf: base.pohdr.posuf,
               maintmode: false,
               updatetype: 'retrieve-withsoftlock'
            };
            DataService.post('api/po/aspoheader/poheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     base.pohdr = data.pohdr;
                     base.whseLogStatus = data.wlstatus;

                     base.setReturnType();
                     base.loadVendorAddress();

                     base.isManualAddressVisible = data.pohdr.vendno === base.MISC_VENDOR;

                     //NOTE: The PO must be for a TWL Warehouse and must be in the printed stage for this to fire.
                     if (base.pohdr.wlwhsefl && base.whseLogStatus.bannerfl && base.whseLogStatus.editorderfl) {
                        $state.go(base.baseState + '.maintain.orderStatus', { whseLogStatus: base.whseLogStatus, menuFunction: base.MENU_FUNCTION_POET, setWhseLogStatusCallback: self.setWhseLogStatusCallback });
                     }
                  } else {
                     self.cancelRetrieve();
                  }
               }
            });

            self.isPurchaseOrderVerified = true;
         }
      }
   };

   self.recoveryAuthPointPassed = function () {
      self.updatePohdr();
   };

   self.forceReset = function (callback) {
      var orderNumber = base.delimitedPurchaseOrderNumber();
      if (base.pohdr && base.pohdr.pono) {
         DataService.get('api/po/aspoheader/poremovesoftlock/' + base.pohdr.pono + '/' + base.pohdr.posuf, { busy: true }, function () {
            RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, orderNumber);
         });
      }

      base.resetPohdr();
      self.isPurchaseOrderVerified = false;
      base.inDrillDownOperation = false;

      //ForceReset is called from a lot of places.  It removes the soft lock.  If there's a callback
      //passed in, then this will take the user to their intended destination.
      if (callback) {
         callback();
      }
   };

   self.updatePohdr = function () {
      var headerUpdateRequest = {
         pohdr: base.pohdr,
         cType: base.POHEADERUPDATE_MODE_UPDATE
      };
      DataService.post('api/po/aspoheader/poheaderupdate', { data: headerUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               base.updateLineItems(function () {
                  //This gets called as the callback when updateLineItems completes.
                  $state.go(base.defaultLineEntryState);
               });
            }
         }
      });
   };

   self.cancelContinue = function () {
      self.purchaseOrderNumber = '';
      self.isPurchaseOrderVerified = false;
   };

   self.cancel = function () {
      self.forceReset(self.cancelContinue);
   };

   self.copyContinue = function () {
      $state.go(base.baseState + '.copy');
   };

   self.copy = function () {
      self.forceReset(self.copyContinue);
   };

   self.createContinue = function () {
      $state.go(base.baseState + '.initiate');
   };

   self.create = function () {
      self.forceReset(self.createContinue);
   };

   self.deleteContinue = function () {
      $state.go(base.baseState + '.delete');
   };

   self.delete = function () {
      self.forceReset(self.deleteContinue);
   };

   self.printContinue = function () {
      $state.go(base.baseState + '.print');
   };

   self.print = function () {
      self.forceReset(self.printContinue);
   };

   self.importFromExcelContinue = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.importFromExcel = function () {
      self.forceReset(self.importFromExcelContinue);
   };

   self.launchManualAcknowledgement = function () {
      $state.go('poea.master');
   };

   self.entryDefaultsClickedContinue = function () {
      if (self.isMaintain()) {
         $state.go(base.baseState + '.maintain.entryDefaults');
      } else {
         $state.go(base.baseState + '.initiate.entryDefaults');
      }
   };

   self.entryDefaultsClicked = function () {
      //Force a reset even from here since when they hit back from the Entry Default screen they are take
      //back into Initiate.
      self.forceReset(self.entryDefaultsClickedContinue);
   };

});

app.controller('PoetDeleteCtrl', function ($state, $scope, $translate, Utils, DataService, MessageService, RecoveryService, AuthService, SecurityService, Constants) {
   var self = this;
   var base = $scope.base;
   var bIsValidOrder = false;
   //Note:  We want separate order data for the delete.
   self.pohdr = {};
   self.whseLogStatus = {};
   self.purchaseOrderNumber = '';

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(base.MENU_FUNCTION_POET);

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         self.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'authPointPassed') {
         MessageService.alert($translate.instant('wl.order.in.process'), $translate.instant('message.you.have.authorization.to.make.changes.that.may.not.get.updated.in.wl'));
      }
      if (parameters.stage && parameters.stage === 'finish') {
         self.cancelPurchaseOrder();
      }
   };

   self.delimitedPurchaseOrderNumber = function () {
      if (self.pohdr.pono) {
         return self.pohdr.pono + '-' + Utils.pad(self.pohdr.posuf, 2);
      }
      return '';
   };

   self.isDelete = function () {
      return $state.is(base.baseState + '.delete');
   };

   self.includesDelete = function () {
      return $state.includes(base.baseState + '.delete');
   };

   self.forceReset = function () {
      self.pohdr = {};
      self.whseLogStatus = {};
      self.purchaseOrderNumber = '';
   };

   self.cancelPurchaseOrder = function () {
      if (bIsValidOrder) {
         MessageService.error('global.error', 'message.maintenance.with.this.stage.not.allowed.2202');
      } else {
         MessageService.yesNo('global.question', 'question.are.you.sure.you.wish.to.cancel.this.po',
            // Yes processing
            function () {
               var poordercancelCriteria = {
                  pono: self.pohdr.pono,
                  posuf: self.pohdr.posuf,
                  secure: self.operatorMenuSecurity
               };
               DataService.post('api/po/aspoheader/poordercancel', { data: poordercancelCriteria, busy: true }, function () {
                  RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_POET, 0, self.delimitedPurchaseOrderNumber());
                  base.resetPohdr();
                  $state.go(base.baseState + '.initiate');
               });

            }, // No processing
            function () {
               DataService.get('api/po/aspoheader/poremovesoftlock/' + self.pohdr.pono + '/' + self.pohdr.posuf, { busy: true }, function () {
                  RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, self.delimitedPurchaseOrderNumber());
                  self.forceReset();
               });
            });
      }
   };

   //User Hook (do not rename)
   self.purchaseOrderSelectedContinue = function (data) {
      self.whseLogStatus = data.wlstatus;
      base.setReturnType();
      base.isManualAddressVisible = data.pohdr.vendno === base.MISC_VENDOR;
   };

   self.purchaseOrderSelected = function (args) {

      if (args.value > 0) {
         self.pohdr.pono = args.value;
         self.pohdr.posuf = args.value2;
         bIsValidOrder = false;

         var headerRetrieveCriteria = {
            pono: self.pohdr.pono,
            posuf: self.pohdr.posuf,
            secure: self.operatorMenuSecurity,
            updatetype: base.POHEADERRETRIEVE_MODE_CHECKDELETE
         };
         DataService.post('api/po/aspoheader/poheaderretrieve', { data: headerRetrieveCriteria, busy: true }, function (data) {
            if (data) {
               if (data.messaging.length > 0) {
                  if (data.messaging[0].messagetxt.includes("2202")) {
                     bIsValidOrder = true;
                  }
               }
               if (!MessageService.processMessaging(data.messaging)) {
                  Utils.replaceObject(self.pohdr, data.pohdr);

                  //User Hook (do not rename)
                  self.purchaseOrderSelectedContinue(data);
               }
            }
         });
      }
   };

   self.continue = function () {
      //NOTE: The PO must be for a TWL Warehouse and must be in the printed stage for this to fire.
      if (self.pohdr.wlwhsefl && self.whseLogStatus.bannerfl && self.whseLogStatus.editorderfl) {
         $state.go(base.baseState + '.delete.orderStatus', { whseLogStatus: self.whseLogStatus, menuFunction: base.MENU_FUNCTION_POET, setWhseLogStatusCallback: self.setWhseLogStatusCallback });
      } else {
         self.cancelPurchaseOrder();
      }
   };

   self.back = function () {
      //Need to reset data
      if (self.pohdr && self.pohdr.pono) {
         DataService.get('api/po/aspoheader/poremovesoftlock/' + self.pohdr.pono + '/' + self.pohdr.posuf, { busy: true }, function () {
            RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_POET, 0, self.delimitedPurchaseOrderNumber());
            self.forceReset();
         });
      }

      $state.go(base.baseState + '.initiate');
   };
});

app.controller('PoetCopyCtrl', function ($state, $scope, $stateParams, $translate, DataService, UserService, ReportService, MessageService, MruService) {
   var self = this;
   var base = $scope.base;
   self.PURCHASEORDERCOPY_FIELDLEAVE_PONO = "PoNo";
   self.PURCHASEORDERCOPY_FIELDLEAVE_CONTINUE = "BtnContinue";
   self.PURCHASEORDERCOPY_FIELDLEAVE_RETURNREASON = "CrReasonTy";

   self.poCopy = {};
   self.poeh = {};
   self.fullPurchaseOrderNumber = '';
   self.continueButtonEnabled = true;
   self.isConvertToReturn = false;
   self.isForcedLeaveTriggerRequired = false;
   self.copyCompleteMessage = '';

   self.initializeCopyObject = function () {
      var requestCriteria = {
         iSecure: base.operatorMenuSecurity
      };
      DataService.get('api/po/aspoheader/poordercopyinitiate/{iSecure}', { pathParams: requestCriteria, busy: true }, function (data) {
         if (data) {
            self.poCopy = data;
         }
      });
   };

   self.clear = function () {
      self.poCopy = {};
      self.fullPurchaseOrderNumber = '';

      self.initializeCopyObject();
   };

   self.isContinueButtonEnabled = function () {
      return self.continueButtonEnabled;
   };

   self.isCopyPurchaseOrderSelected = function () {
      if (self.poCopy.pono) {
         return true;
      } else {
         return false;
      }
   };

   self.vendorNumberLeave = function () {
      //If the Shipfrom is set, make sure to validate/clear and reset the new value
      //to reflect the other Vendor # changed.
      if (self.poCopy.shipfmno) {
         var requestCriteria = {
            vendno: self.poCopy.vendno,
            shipfmno: self.poCopy.shipfmno,
            fldlist: 'shipfmno'
         };

         self.poCopy.shipfmno = 0;
         DataService.get('api/ap/apss/getbypk', { params: requestCriteria, busy: true }, function (shipfromData) {
            if (shipfromData) {
               self.poCopy.shipfmno = shipfromData.shipfmno;
            }
         });
      }
   };

   self.leaveField = function (fieldName) {
      var poordercopyfieldleaveCriteria = {
         poordercopy: self.poCopy,
         cField: fieldName
      };
      DataService.post('api/po/aspoheader/poordercopyfieldleave', { data: poordercopyfieldleaveCriteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }
            self.poCopy = data.poordercopy;

            if (fieldName === self.PURCHASEORDERCOPY_FIELDLEAVE_CONTINUE) {
               self.continueButtonEnabled = false;
            }

            //If this Leave Trigger got forced (i.e. for Returns), then now run the Submit since it was delayed
            //until after we forced the leave trigger call.
            if (self.isForcedLeaveTriggerRequired) {
               self.submitContinue();
            }
         }
      });
   };

   self.convertToChanged = function () {
      if (self.poCopy && self.poCopy.convertto === base.PURCHASEORDER_TYPE_RETURN) {
         self.isConvertToReturn = true;
      } else {
         self.isConvertToReturn = false;
      }
   };

   self.returnReasonChanged = function () {
      self.leaveField(self.PURCHASEORDERCOPY_FIELDLEAVE_RETURNREASON);
   };

   //User Hook (do not rename)
   self.purchaseOrderChangedContinue = function (data) {
      self.leaveField(self.PURCHASEORDERCOPY_FIELDLEAVE_PONO);

      //clear message when a new copy is started
      self.copyCompleteMessage = '';
   };

   self.purchaseOrderChanged = function (args) {
      if (args.value) {
         if (args.value > 0) {
            self.poCopy.pono = args.value;
            self.poCopy.posuf = args.value2;

            var params = {
               pono: self.poCopy.pono,
               posuf: self.poCopy.posuf
            };

            DataService.get('api/po/poeh/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.poeh = data;

                  //User Hook (do not rename)
                  self.purchaseOrderChangedContinue(data);
               }
            });
         }
      }
   };

   self.continueButtonSelected = function () {
      self.leaveField(self.PURCHASEORDERCOPY_FIELDLEAVE_CONTINUE);
   };

   self.submitContinue = function () {
      self.isForcedLeaveTriggerRequired = false;
      DataService.post('api/po/aspoheader/poordercopyupdate', { data: self.poCopy, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.poCopy = data.poordercopy;
               self.continueButtonEnabled = true;
               // Always suffix = zero and this point.
               var purchaseOrderNumber = self.poCopy.newpono.toString() + '-00';
               var params = { fldlist: 'rowpointer,pono,posuf' };
               DataService.get('api/po/poeh/getbyrowid/' + self.poCopy.newponorowid, { params: params }, function (data) {
                  MruService.addToList('POOrder', data.rowpointer, purchaseOrderNumber, data.pono, data.posuf);
               });

               self.copyCompleteMessage = $translate.instant('global.copy.completed.successfully') + ' ' +
                  $translate.instant('global.new.po.number') + base.LABEL_DELIMITER + self.poCopy.newpono + '.';

               self.clear();
            }
         }
      });
   };

   self.submit = function () {
      self.isForcedLeaveTriggerRequired = true;
      //If this is a return, we need to call the Leave Trigger first before doing the update.
      if (self.poCopy.convertto === base.PURCHASEORDER_TYPE_RETURN) {
         self.leaveField(self.PURCHASEORDERCOPY_FIELDLEAVE_RETURNREASON);
      } else {
         self.submitContinue();
      }
   };

   // First time in here
   if (base) {
      self.initializeCopyObject();
   }

   self.reset = function () {
      self.continueButtonEnabled = true;

      //Clear PO and other fields.
      self.clear();

      //clear message when a new copy is started
      self.copyCompleteMessage = '';

      //If they reset then clear the last data
      self.poeh = {};
   };

   self.create = function () {
      $state.go(base.baseState + '.initiate');
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

});

app.controller('PoetPrintCtrl', function ($state, $scope, $stateParams, DataService, GlobalValueService, UserService, ReportService, MessageService, Sasc) {
   var self = this;
   var base = $scope.base;
   self.PRINTTYPE_FAX = 'f';
   self.isPrintPurchaseOrderEnabled = true;
   self.useWhereAppropriate = false;
   self.autoPrintEnabled = true;
   self.printPurchaseOrder = true;
   self.fullPurchaseOrderNumber = 0;
   self.printerSettingsList = [];
   self.poetPrintReportList = [];
   self.poetPrintScreenSingle = {};
   self.poetPrintGlobals = {};
   self.poVendorNumber = 0;
   self.poetPrintLoadCriteria = {
      pono: 0,
      posuf: 0
   };

   if (!base.autoPrintData) {
      base.autoPrintData = { autoPrint: base.autoPrintDefault };
      self.useWhereAppropriate = base.useWhereAppropriateDefault;
   }

   if ($stateParams.purchaseOrderNumber) {
      self.fullPurchaseOrderNumber = $stateParams.purchaseOrderNumber;
   }

   self.autoPrintChanged = function () {
      if (base.autoPrintData) {
         GlobalValueService.set('Global.AutoPrint', base.autoPrintData.autoPrint);
      }
   };

   self.useWhereAppropriateChanged = function () {
      GlobalValueService.set('Global.UseWhereAppropriate', self.useWhereAppropriate);
   };

   self.purchaseOrderChanged = function (args) {
      //Pull specific defaults for this vendor.
      if (args.value) {
         if (args.value > 0) {
            self.poetPrintLoadCriteria.pono = args.value;
            self.poetPrintLoadCriteria.posuf = args.value2;

            self.poetPrintGlobals = {
               cono: UserService.getCono(),
               operinit: UserService.getUserName()
            };

            var poetprintloadchangeorderriteria = {
               poetprintreportlist: self.poetPrintReportList,
               poetprintscreensingle: self.poetPrintScreenSingle,
               poetprintglobals: self.poetPrintGlobals,
               poetprintloadcriteria: self.poetPrintLoadCriteria
            };

            DataService.post('api/po/aspoheader/poetprintloadchangeorder', { data: poetprintloadchangeorderriteria, busy: true }, function (data) {
               if (data) {
                  if (data.poetprintreportlist) {
                     //Just pull out the 1st row from the call.
                     var reportSetting = data.poetprintreportlist[0];
                     self.purchaseOrderSettings.emailaddr = reportSetting.emailaddr;
                     //Default print type always printer so no need to check print type as we are displaying fax only on selection of print type Fax.
                     self.purchaseOrderSettings.faxphoneno = reportSetting.faxphoneno;
                     self.purchaseOrderSettings.faxto1 = reportSetting.faxto1;
                     self.purchaseOrderSettings.faxto2 = reportSetting.faxto2;
                     self.purchaseOrderSettings.faxfrom = reportSetting.faxfrom;
                     //We don't want to overwrite the printer if it's not set as a Fax Type printer.
                     if (self.purchaseOrderSettings && self.purchaseOrderSettings.printtype && self.purchaseOrderSettings.printtype.toLowerCase() === self.PRINTTYPE_FAX) {
                        self.purchaseOrderSettings.printernm = reportSetting.faxprinternm;
                     }
                     //We need to set the default Fax Type printer name from SASC Menu instead of SASP
                     if (self.purchaseOrderSettings && self.purchaseOrderSettings.printtype && self.purchaseOrderSettings.printtype.toLowerCase() === self.PRINTTYPE_FAX) {
                        self.purchaseOrderSettings.printernm = Sasc.oifaxdev1;
                     }
                     //Setting the Faxpriority value only if the default value is empty.
                     if (!self.purchaseOrderSettings.faxpriority) {
                        self.purchaseOrderSettings.faxpriority = reportSetting.faxpriority;
                     }
                  }
                  var params = {
                     pono: self.poetPrintLoadCriteria.pono,
                     posuf: self.poetPrintLoadCriteria.posuf
                  };

                  DataService.get('api/po/poeh/getbypk', { params: params, busy: true }, function (poehData) {
                     if (poehData) {
                        self.printPoWarehouse = poehData.whse;
                        if (poehData.vendno) {
                           self.poVendorNumber = poehData.vendno;

                           //User Hook (do not rename)
                           if (self.purchaseOrderChangedContinue) {
                              self.purchaseOrderChangedContinue(poehData);
                           }
                        }
                     }
                  });
               }
            });
         }
      } else {
         self.poetPrintLoadCriteria.pono = '';
         self.poetPrintLoadCriteria.posuf = '';
      }
   };

   self.submitAfterValidate = function () {

      var poetPrintLaunchCriteria = {
         pono: self.poetPrintLoadCriteria.pono,
         posuf: self.poetPrintLoadCriteria.posuf,
         whereappfl: self.useWhereAppropriate
      };

      var printScreenSingle = {
         pono: self.poetPrintLoadCriteria.pono,
         posuf: self.poetPrintLoadCriteria.posuf
      };

      //Overwrite the User field so it flows down from the Load.
      if (self.poetPrintScreenSingle) {
         printScreenSingle.userfield = self.poetPrintScreenSingle.userfield;
      }

      var launchCriteria = {
         poetprintreportlist: self.poetPrintReportList,
         printersettings: self.printerSettingsList,
         poetprintscreensingle: printScreenSingle,
         poetprintlaunchcriteria: poetPrintLaunchCriteria
      };

      DataService.post('api/po/aspoheader/poetprintlaunch', { data: launchCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.your.print.request.has.been.sent');

         if (base.autoPrintData.autoPrint) {
            base.autoPrintData.printLaunchCriteria = poetPrintLaunchCriteria;
            base.autoPrintData.printSingle = printScreenSingle;
            base.autoPrintData.printReportList = self.poetPrintReportList;
            base.autoPrintData.printerSettingsList = self.printerSettingsList;
         } else {
            base.autoPrintData.launchCriteria = {};
            base.autoPrintData.printSingle = {};
            base.autoPrintData.printReportList = [];
            base.autoPrintData.printerSettings = [];
         }

         //User Hook (do not rename)
         if (self.submitAfterValidateContinue) {
            self.submitAfterValidateContinue();
         }
      });
   };

   self.buildPrinterSettings = function () {
      return {
         emailaddr: self.purchaseOrderSettings.emailaddr,
         faxcom: self.purchaseOrderSettings.faxcom,
         faxfrom: self.purchaseOrderSettings.faxfrom,
         faxphoneno: self.purchaseOrderSettings.faxphoneno,
         faxpriority: self.purchaseOrderSettings.faxpriority,
         faxto1: self.purchaseOrderSettings.faxto1,
         faxto2: self.purchaseOrderSettings.faxto2,
         flatfilenm: self.purchaseOrderSettings.flatfilenm,
         printerinstance: 'po',
         printernm: self.purchaseOrderSettings.printernm,
         printoptfl: self.purchaseOrderSettings.printoptfl,
         printtype: self.purchaseOrderSettings.printtype,
         queue: self.purchaseOrderSettings.queue,
         outputover: self.purchaseOrderSettings.outputover
      };
   };

   self.submit = function () {
      if (self.poetPrintLoadCriteria.pono === 0) {
         MessageService.error('global.error', 'message.please.enter.a.po.number.to.print');
         return;
      }

      self.poetPrintReportList.forEach(function (record) {
         record.poprintfl = true;
      });

      self.printerSettingsList = [];
      self.printerSettingsList.push(self.buildPrinterSettings());

      var printScreenSingle = {
         pono: self.poetPrintLoadCriteria.pono,
         posuf: self.poetPrintLoadCriteria.posuf
      };

      //Overwrite the User field so it flows down from the Load.
      if (self.poetPrintScreenSingle) {
         printScreenSingle.userfield = self.poetPrintScreenSingle.userfield;
      }

      //Faxes do not allow for auto-print.
      if (self.purchaseOrderSettings && self.purchaseOrderSettings.printtype && self.purchaseOrderSettings.printtype.toLowerCase() === self.PRINTTYPE_FAX) {
         base.autoPrintData.autoPrint = false;
      }

      var poetprintvalidateCriteria = {
         poetprintreportlist: self.poetPrintReportList,
         printersettings: self.printerSettingsList,
         poetprintscreensingle: self.poetPrintScreenSingle,
         iPoNo: self.poetPrintLoadCriteria.pono,
         iPoSuf: self.poetPrintLoadCriteria.posuf
      };

      DataService.post('api/po/aspoheader/poetprintvalidate', { data: poetprintvalidateCriteria, busy: true }, function (data) {
         if (data) {
            self.submitAfterValidate();
         }
      });
   };

   self.create = function () {
      $state.go(base.baseState + '.initiate');
   };

   self.maintain = function () {
      $state.go(base.baseState + '.maintain');
   };

   self.delete = function () {
      $state.go(base.baseState + '.delete');
   };

   self.copy = function () {
      $state.go(base.baseState + '.copy');
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

   $scope.$watch('poPrint.purchaseOrderControl.printTypeOptions', function (newValue, oldValue) {
      if (newValue !== oldValue && newValue && newValue.length > 0) {
         //Initialize default printer information when the control is finished rendering.
         self.poetPrintGlobals = {
            cono: UserService.getCono(),
            operinit: UserService.getUserName()
         };

         var printloadCriteria = {
            poetprintglobals: self.poetPrintGlobals,
            poetprintloadcriteria: self.poetPrintLoadCriteria
         };

         DataService.post('api/po/aspoheader/poetprintload', { data: printloadCriteria, busy: true }, function (data) {
            if (data) {
               self.poetPrintReportList = data.poetprintreportlist;
               self.poetPrintScreenSingle = data.poetprintscreensingle;
               //Commented this because the printtype is retrieving as "Fax" from poetprintload.p file.
               //But in POET the default printer type should always be default to "Print"

               //if (data.poetprintreportlist[0]) {
               //   self.purchaseOrderSettings.printtype = data.poetprintreportlist[0].type;
               //}
            }
         });
      }
   });
});

//Called from Initiate, this is the feature to import lines from an Excel spreadsheet to create PO's.
//The file layout is defined in help.  The 1st row is a header field and the next 8 rows are PO Header
//specific fields set in Columns A and B.  The next rows, up to 999 are the lines on the PO.
app.controller('PoetImportFromExcelCtrl', function ($state, $scope, Constants, DataService, MessageService, MruService, Utils) {
   // alias => ife
   var self = this;
   var base = $scope.base;

   // Parse and Update the Import Data in sections (200 records at a time)
   var parsedImportData1 = [];
   var parsedImportData2 = [];
   var parsedImportData3 = [];
   var parsedImportData4 = [];
   var parsedImportData5 = [];
   var importOrderNumber = 0;
   var previousOrderNumber = 0;
   var previousOrderBreak = '';
   var callImportCounter = 0;

   self.reset = function () {
      self.importedFile = null;
      self.maxLines = 50;
      self.importDataCollection = [];
      self.isFileImported = false;
   };
   self.reset();

   self.isImportFromExcel = function () {
      return $state.is(base.baseState + '.importFromExcel');
   };

   self.importFile = function () {
      if (self.importedFile) {
         Utils.readAsBinaryString(self.importedFile, self.fileReaderOnLoadCallback);
      } else {
         MessageService.error('global.error', 'global.input.file.is.required');
      }
   };

   self.fileReaderOnLoadCallback = function (data) {
      var workbook = XLSX.read(data, { type: 'binary' }); //ignore jslint - Defined in library.
      var sheets = [];
      $.each(workbook.Sheets, function (index, value) { //ignore jslint - Defined in library.
         sheets.push(value);
      });

      var importFiles = [];
      sheets.forEach(function (sheet, index) {
         var rowObjects = XLSX.utils.sheet_to_row_object_array(sheet); //ignore jslint - Defined in library.
         rowObjects.forEach(function (row) {
            if (row) {
               var newImportFile = {
                  cWorkSheet: index,
                  iRow: row.__rowNum__, //ignore jslint - correct
                  cColValues: ''
               };

               var primaryKey;
               var secondaryKey;
               if (newImportFile.iRow > 0 && newImportFile.iRow < 9) {
                  //Pull out the PO Header specific rows from Row 2-9.  The data is in the
                  //A and B columns and generically column labeled as Primary and Secondary.
                  primaryKey = row['Primary Key'];
                  secondaryKey = row['Secondary Key'];
                  if (primaryKey) {
                     newImportFile.cColValues += primaryKey;
                     if (secondaryKey) {
                        newImportFile.cColValues += ',' + secondaryKey;
                     }
                  }
               } else {                 
                  primaryKey = row['Primary Key']; //Vendor Product
                  secondaryKey = row['Secondary Key'] ? row['Secondary Key'] : ' '; //Distrubutor Product
                  var descrip = row['Product Description'] ? row['Product Description'] : ' ';
                  var quantity = row['Quantity'] ? row['Quantity'] : ' '; //ignore jslint - correct
                  var unit = row['Unit'] ? row['Unit'] : ' '; //ignore jslint - correct
                  var price = row['Price'] ? row['Price'] : ' '; //ignore jslint - correct
                  var notUsed1 = row['Not Used 1'] ? row['Not Used 1'] : ' '; //Placeholder the backend expects.
                  var notUsed2 = row['Not Used 2'] ? row['Not Used 2'] : ' '; //Placeholder the backend expects.
                  var notUsed3 = row['Not Used 3'] ? row['Not Used 3'] : ' '; //Placeholder the backend expects.
                  var netAmount = row['Net Amount'] ? row['Net Amount'] : ' '; //ignore jslint - correct
                  var substitute = row['Substitute Option'] ? row['Substitute Option'] : ' ';
                  var supercede = row['Supercede Option'] ? row['Supercede Option'] : ' ';
                  var expectedShipDate = row['Expected Ship Date'] ? row['Expected Ship Date'] : ' ';
                  var unavailableReason = row['Unavailable Reason'] ? row['Unavailable Reason'] : ' ';
                  var category = row['Product Category'] ? row['Product Category'] : ' ';
                  var line = row['Product Line'] ? row['Product Line'] : ' ';
                  var required = row['Required Option'] ? row['Required Option'] : ' ';
                  var print = row['Print Flag'] ? row['Print Flag'] : ' ';

                  if (primaryKey) {
                     newImportFile.cColValues += primaryKey;
                  }
                  newImportFile.cColValues += ',' + secondaryKey;
                  newImportFile.cColValues += ',' + descrip;
                  newImportFile.cColValues += ',' + quantity;
                  newImportFile.cColValues += ',' + unit;
                  newImportFile.cColValues += ',' + price;
                  newImportFile.cColValues += ',' + notUsed1;
                  newImportFile.cColValues += ',' + notUsed2;
                  newImportFile.cColValues += ',' + notUsed3;
                  newImportFile.cColValues += ',' + netAmount;
                  newImportFile.cColValues += ',' + substitute;
                  newImportFile.cColValues += ',' + supercede;
                  newImportFile.cColValues += ',' + expectedShipDate;
                  newImportFile.cColValues += ',' + unavailableReason;
                  newImportFile.cColValues += ',' + category;
                  newImportFile.cColValues += ',' + line;
                  newImportFile.cColValues += ',' + required;
                  newImportFile.cColValues += ',' + print;
               }

               if (newImportFile.cColValues) {
                  importFiles.push(newImportFile);
               }
            }
         });
      });

      if (importFiles.length > 0) {
         var importLoadRequest = {
            poimportfile: importFiles,
            iMaxLines: self.maxLines
         };
         
         DataService.post('api/po/aspoheader/poimportload', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: importLoadRequest, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);

               self.importDataCollection = data.poimportdata;
               self.isFileImported = true;
            }
         });
      } else {
         MessageService.error('global.error', 'message.imported.file.contained.no.lines.or.was.formatted.incorrectly');
      }
   };

   self.submit = function () {

      // Clear all fields on new submit
      parsedImportData1 = [];
      parsedImportData2 = [];
      parsedImportData3 = [];
      parsedImportData4 = [];
      parsedImportData5 = [];
      importOrderNumber = 0;
      previousOrderNumber = 0;
      previousOrderBreak = '';
      callImportCounter = 0;

      // Count out 200 Files at a time and Update - Time out error in H5
      var parsedImportData = [];
      var iImportLength = self.importDataCollection.length;
      var fullCounter = 0;

      self.importDataCollection.forEach(function (parseData) {

         // Build the Import Data off the full set of data
         parsedImportData.push(parseData);
         fullCounter++;

         // Max Import is 999 - Parse into Arrays of 200 for Back End to process
         if (fullCounter === 200) {
            parsedImportData1 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === 400) {
            parsedImportData2 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === 600) {
            parsedImportData3 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === 800) {
            parsedImportData4 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === iImportLength) {
            if (fullCounter < 200) {
               parsedImportData1 = parsedImportData;
            } else if (fullCounter < 400) {
               parsedImportData2 = parsedImportData;
            } else if (fullCounter < 600) {
               parsedImportData3 = parsedImportData;
            } else if (fullCounter < 800) {
               parsedImportData4 = parsedImportData;
            } else {
               parsedImportData5 = parsedImportData;
            }
            parsedImportData = [];
         }
      });

      // Create/Update the PO Order(s) Data
      callImportCounter = 1;
      if (parsedImportData1.length !== 0) {
         self.runOrderImportUpdate(parsedImportData1, self.importFinished);
      }

      self.reset();
   };

   self.cancel = function () {
      self.reset();
   };

   self.drilldown = function (e, args) {
      $state.go('.lineDetails', { selectedLine: args[0].item, row: args[0].row });
   };

   self.importFinished = function (isCompleted) {

      callImportCounter++;

      if (isCompleted) {

         // Create/Update the OE Order Data - save off Order# and WorkSheet# - next Array of data
         if (callImportCounter === 2 && parsedImportData2.length !== 0) {
            self.runOrderImportUpdate(parsedImportData2, self.importFinished);
         } else if (callImportCounter === 3 && parsedImportData3.length !== 0) {
            self.runOrderImportUpdate(parsedImportData3, self.importFinished);
         } else if (callImportCounter === 4 && parsedImportData4.length !== 0) {
            self.runOrderImportUpdate(parsedImportData4, self.importFinished);
         } else if (callImportCounter === 5 && parsedImportData5.length !== 0) {
            self.runOrderImportUpdate(parsedImportData5, self.importFinished);
         }
      }
   };

   self.runOrderImportUpdate = function (importRecord, callback) {

      var record = [];
      record = importRecord[importRecord.length - 1];
      var holdOrderBreak = record.orderbreak;

      var importRecordData = {
         poimportdata: importRecord,
         iOrderNo: previousOrderNumber,
         cOrderBreak: previousOrderBreak
      };

      DataService.post('api/po/aspoheader/poimportupdate', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: importRecordData, busy: true }, function (data) {
         if (data) {

            // Display the Order Number and any Errors
            MessageService.processMessaging(data);

            // Pull Order# from the Message
            data.forEach(function (message) {
               if (message.messagetxt.includes('Purchase Order#:')) {
                  var match = /\d+/.exec(message.messagetxt);
                  if (match[0]) {
                     importOrderNumber = match[0];
                  }
               }
            });

            // Add the newly created order(s) to the MRU
            if (importOrderNumber !== previousOrderNumber && importOrderNumber !== '') {
               self.getOrderAndAddToMru(data);
               previousOrderNumber = importOrderNumber;
            }

            previousOrderBreak = holdOrderBreak;
            self.importFinished(true);

         } else {
            self.importFinished(false);
         }
      });
   };

   self.getOrderAndAddToMru = function (messaging) {
      var orderNumber;
      messaging.forEach(function (message) {
         if (message.messagetxt.includes('Purchase Order#:')) {
            var match = /\d+/.exec(message.messagetxt);
            if (match[0]) {
               orderNumber = match[0];
            }
         }
      });

      var params = {
         pono: orderNumber,
         posuf: 0,
         fldlist: 'rowpointer,pono,posuf'
      };
      orderNumber += '-00';
      DataService.get('api/po/poeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            MruService.addToList('POOrder', data.rowpointer, orderNumber, data.pono, data.posuf);
         }
      });
   };

});

app.controller('PoetImportFromExcelDetailsCtrl', function ($state, $stateParams, $scope, DataService, MessageService) {
   // alias => ifeD
   var self = this;
   var ife = $scope.ife;

   self.line = $stateParams.selectedLine;
   self.row = $stateParams.row;

   self.submit = function () {
      var importData = [];
      importData.push(self.line);
      DataService.post('api/po/aspoheader/poimportvalidate', { data: importData, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging) && data.poimportdata[0]) {
               ife.importDataCollection[self.row] = data.poimportdata[0];
               ife.grid.updateRow(self.row);

               $state.go('^');
            }
         }
      });
   };
});

app.controller('PoetEntryDefaultsCtrl', function ($state, $scope, DataService, UserService, ModalService) {
   //alias => poed
   var self = this;
   var base = $scope.base;
   self.SAVETO_USER = 'u';
   self.SAVETO_PROFILE = 'p';
   self.SAVETO_COMPANY = 'c';
   self.SAVETYPE_CURRENT = 'c';
   self.SAVETYPE_OTHER = 'o';
   self.purchaseOrderMode = '';
   self.purchaseOrderType = '';
   self.workflowSkipMaintainHeader = false;
   self.workflowLineEntryMode = '';
   self.lineType = '';
   self.easyQuantity = 0;

   self.setDefaults = function (webSettings) {
      webSettings.forEach(function (webSetting) {
         switch (webSetting.settingname) {
            case base.WEBSETTING_DEFAULTPURCHASEORDERMODE: //ignore jslint - correct indentation
               if (webSetting.settingvalue) { //ignore jslint - correct indentation
                  self.purchaseOrderMode = webSetting.settingvalue; //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.WEBSETTING_DEFAULTPURCHASEORDERTYPE: //ignore jslint - correct indentation
               if (webSetting.settingvalue) { //ignore jslint - correct indentation
                  self.purchaseOrderType = webSetting.settingvalue; //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.WEBSETTING_DEFAULTLINEENTRYMODE: //ignore jslint - correct indentation
               if (webSetting.settingvalue) { //ignore jslint - correct indentation
                  self.workflowLineEntryMode = webSetting.settingvalue; //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.WEBSETTING_SKIPMAINTAINHEADERFIELDS: //ignore jslint - correct indentation
               if (webSetting.settingvalue) { //ignore jslint - correct indentation
                  self.workflowSkipMaintainHeader = webSetting.settingvalue === 'true'; //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.WEBSETTING_DEFAULTLINETYPE: //ignore jslint - correct indentation
               if (webSetting.settingvalue) { //ignore jslint - correct indentation
                  self.lineType = webSetting.settingvalue; //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case base.WEBSETTING_EASYDEFAULTQUANTITY: //ignore jslint - correct indentation
               if (webSetting.settingvalue) { //ignore jslint - correct indentation
                  self.easyQuantity = webSetting.settingvalue; //ignore jslint - correct indentation
               } //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      });

      //once we've set all the settings that have been returned, set the ones that aren't already set
      if (!self.purchaseOrderMode) {
         self.purchaseOrderMode = base.PURCHASEORDER_MODE_ADD;
      }
      if (!self.purchaseOrderType) {
         self.purchaseOrderType = base.PURCHASEORDER_TYPE_PO;
      }
      if (!self.workflowLineEntryMode) {
         self.workflowLineEntryMode = base.DEFAULTLINEENTRYMODE_EASY;
      }
      if (!self.lineType) {
         self.lineType = base.NONSTOCKTYPE_STOCKED;
      }
      if (!self.easyQuantity && self.easyQuantity === 0) {
         self.easyQuantity = 1;
      }
   };

   //set the defaults
   self.setDefaults(base.defaultWebSettings);

   self.saveFromModal = function (saveTo, user, profile) {
      var webSettings; //ignore jslint - correct indentation
      switch (saveTo) { //ignore jslint - correct indentation
         case self.SAVETO_USER: //ignore jslint - correct indentation
         default: //ignore jslint - correct indentation
            webSettings = self.buildWebSettings(saveTo, user); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case self.SAVETO_PROFILE: //ignore jslint - correct indentation
            webSettings = self.buildWebSettings(saveTo, profile); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case self.SAVETO_COMPANY: //ignore jslint - correct indentation
            webSettings = self.buildWebSettings(saveTo); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
      DataService.post('api/shared/assharedentry/savewebsetting', { data: webSettings, busy: true }, function () {
         if (saveTo === self.SAVETO_USER && user === UserService.getUserName()) {
            base.defaultWebSettings = webSettings;
            base.setDefaultWebSettings();
         }
         self.destroyModal(true);
      });
   };

   self.loadFromModal = function (saveTo, user, profile) {
      var webSettingLoad = {
         functionname: base.MENU_FUNCTION_POET,
         screenname: base.DEFAULTS_SCREEN_NAME,
         settingname: ''
      };

      switch (saveTo) {
         case self.SAVETO_USER: //ignore jslint - correct indentation
         default: //ignore jslint - correct indentation
            webSettingLoad.operator = user; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case self.SAVETO_PROFILE: //ignore jslint - correct indentation
            webSettingLoad.profile = profile; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }

      DataService.post('api/shared/assharedentry/loadwebsetting', { data: webSettingLoad, busy: true }, function (data) {
         if (data) {
            self.setDefaults(data);

            self.destroyModal(false);
         }
      });
   };

   self.buildWebSettings = function (type, value) {
      var webSettings = [
         {
            functionname: base.MENU_FUNCTION_POET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_DEFAULTPURCHASEORDERMODE,
            settingvalue: self.purchaseOrderMode
         },
         {
            functionname: base.MENU_FUNCTION_POET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_DEFAULTPURCHASEORDERTYPE,
            settingvalue: self.purchaseOrderType
         },
         {
            functionname: base.MENU_FUNCTION_POET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_DEFAULTLINEENTRYMODE,
            settingvalue: self.workflowLineEntryMode
         },
         {
            functionname: base.MENU_FUNCTION_POET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_SKIPMAINTAINHEADERFIELDS,
            settingvalue: self.workflowSkipMaintainHeader ? 'true' : 'false'
         },
         {
            functionname: base.MENU_FUNCTION_POET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_DEFAULTLINETYPE,
            settingvalue: self.lineType
         },
         {
            functionname: base.MENU_FUNCTION_POET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_EASYDEFAULTQUANTITY,
            settingvalue: self.easyQuantity
         }
      ];

      webSettings.forEach(function (webSetting) {
         switch (type) {
            case self.SAVETO_USER: //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               webSetting.operator = value; //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case self.SAVETO_PROFILE: //ignore jslint - correct indentation
               webSetting.profile = value; //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      });

      return webSettings;
   };

   self.destroyModal = function (isSaveModal) {
      if (isSaveModal) {
         self.saveModal.destroy();
         self.isSaveModal = false;
      } else {
         self.loadModal.destroy();
         self.isLoadModal = false;
      }
   };

   self.save = function () {
      var webSettings = self.buildWebSettings(self.SAVETO_USER, UserService.getUserName());
      DataService.post('api/shared/assharedentry/savewebsetting', { data: webSettings, busy: true }, function () {
         base.defaultWebSettings = webSettings;
         base.setDefaultWebSettings();
      });
   };

   self.load = function () {
      self.isLoadModal = true;
      ModalService.showModal('shared/transaction-defaults/save-load-defaults-modal.json', 'PoetEntryDefaultsSaveLoadModalCtrl as sldmCtrl', $scope, function (modal) {
         self.loadModal = modal;
      });
   };

   self.saveFor = function () {
      self.isSaveModal = true;
      ModalService.showModal('shared/transaction-defaults/save-load-defaults-modal.json', 'PoetEntryDefaultsSaveLoadModalCtrl as sldmCtrl', $scope, function (modal) {
         self.saveModal = modal;
      });
   };
});

app.controller('PoetEntryDefaultsSaveLoadModalCtrl', function ($state, $scope, $translate, UserService, PvUser) {
   // alias => sldmCtrl
   var self = this;
   var poed = $scope.poed;

   self.saveTo = poed.SAVETO_USER;
   self.saveType = poed.SAVETYPE_CURRENT;
   self.user = UserService.getUserName();
   self.profile = PvUser.webprofilename;
   self.company = UserService.getCono();

   if (poed.isLoadModal) {
      self.title = $translate.instant('global.load.settings');
      self.isSaveMode = false;
   } else if (poed.isSaveModal) {
      self.title = $translate.instant('global.save.settings');
      self.isSaveMode = true;
   }

   self.submit = function () {
      var user = self.saveType === poed.SAVETYPE_CURRENT ? UserService.getUserName() : self.user;
      var profile = self.saveType === poed.SAVETYPE_CURRENT ? PvUser.webprofilename : self.profile;
      if (self.isSaveMode) {
         poed.saveFromModal(self.saveTo, user, profile);
      } else {
         poed.loadFromModal(self.saveTo, user, profile);
      }
   };

   self.cancel = function () {
      poed.destroyModal(self.isSaveMode);
   };
});