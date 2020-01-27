'use strict';

app.controller('OeetMaintainCtrl', function ($state, $scope, $translate, $stateParams, DataService, GlobalValueService, MessageService, RecoveryService, UserService, AuthService, CenPosService, AodataService, Constants, ModalService, Utils, LoggingService) {
   // alias => mo
   var self = this;
   var base = $scope.base;
   self.orderNumber = '';
   self.duplicateCustomerPoOrders = [];

   //need to clear out the base.oehdr
   base.oehdr = {};

   base.sidebarCollapsed = true;
   base.isAddOrderMode = false;

   var fulfillmentOrdNo = 0;
   var fulfillmentOrdSuf = 0;

   //handle recovery records
   if ($stateParams.isRecovery) {
      if ($stateParams.recoveryId) {
         var recoveryOrderNo = $stateParams.recoveryId;
         var recoveryOrderSuf = $stateParams.recoverySuffix;
         var delimitedOrderNo = recoveryOrderNo + '-' + recoveryOrderSuf;

         self.isOrderVerified = true;
         self.orderNumber = delimitedOrderNo;

         var headerRetrieveRequest = {
            orderno: recoveryOrderNo,
            ordersuf: recoveryOrderSuf,
            maintmode: true,
            updatetype: ''
         };
         DataService.post('api/oe/asoeheader/oeheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.oehdr.stagecd > 2 && data.oehdr.oetype.toLowerCase() !== 'cs') {
                     MessageService.alert('global.alert', $translate.instant('message.cannot.maintain.order.after.shipping') + ' (' + delimitedOrderNo + ')');
                     self.forceReset(null, true);
                  } else {
                     base.oehdr = data.oehdr;

                     base.inDrillDownOperation = true;

                     DataService.get('api/ic/icsd/getbypk', { params: { whse: data.oehdr.whse } }, function (data) {
                        if (data) {
                           base.icsd = data;
                        }
                     });

                     if (base.oehdr.oetype.toLowerCase() === 'do') {
                        base.orderTieHeader = {
                           orderdisp: base.oehdr.orderdisp,
                           orderno: base.oehdr.orderno,
                           ordersuf: base.oehdr.ordersuf,
                           ourproc: Constants.MENU_FUNCTION_OEET,
                           runmode: 'banner',
                           transtype: base.oehdr.oetype,
                           whse: base.oehdr.whse
                        };
                        var lineTieRetrieveRequest = {
                           oeline: {},
                           oelinelinetiehdr: base.orderTieHeader
                        };
                        DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
                           if (data) {
                              base.currentOrderTie = data[0];
                           }
                        });
                     }
                  }
               }
            } else {
               MessageService.alert('global.alert', $translate.instant('message.recovery.data.is.incomplete.could.not.recover.ord') + delimitedOrderNo);
               self.forceReset(null, true);
            }
         });
      }
      if ($stateParams.recoveryJournal) {
         base.journalOptions.criteria.jrnlno = $stateParams.recoveryJournal;
         if (base.journalControl) {
            base.recoverJournal();
         } else {
            base.isJournalRecovery = true;
         }
      }
   } else {
      self.isOrderVerified = false;
   }

   // Check if ISM is live
   self.isIsmLive = AodataService.getValue("SM", "ismlive");

   self.cancelOrderStatusRetrieve = function () {
      self.cancelRetrieve();
   }

   self.cancelRetrieve = function () {
      RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());
      self.forceReset();
   };

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         $scope.base.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Cancel update if the authorization point in the warehouse logistics status failed
      if (parameters.stage && parameters.stage === 'authPointFailed') {
         self.cancelRetrieve();
      }
   };

   //User Hook (do not rename)
   self.orderChangedContinue = function (data) {
      // Find the customer record for the customer placing the order
      // Determine if that customer requires customer product on each OE line
      if (data.oehdr.custno) {
         var arscparams = {
            custno: data.oehdr.custno
         };
         DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (data) {
            if (data) {
               //Always overwrite the Customer record when the Order # changes, so we have latest.
               $scope.base.arsc = data;

               if (data.custprodreqfl) {
                  base.isRequireCustomerProd = true;
               }
               else {
                  base.isRequireCustomerProd = false;
               }
            }
         });
      }
      if (data.oehdr.shipto) {
         var arssparams = {
            custno: data.oehdr.custno,
            shipto: data.oehdr.shipto
         };
         DataService.get('api/ar/arss/getbypk', { params: arssparams, busy: true }, function (data) {
            if (data) {
               //Always overwrite the Ship To record when the Order # changes, so we have latest.
               $scope.base.arss = data;
            }
         });
      }
   };

   self.orderChanged = function (selectedOrder) {
      if ($stateParams.orderno) {
         base.oehdr.orderno = $stateParams.orderno;
         base.oehdr.ordersuf = $stateParams.ordersuf;
      } else {
         if (selectedOrder.value > 0) {
            base.oehdr.orderno = selectedOrder.value;
            base.oehdr.ordersuf = selectedOrder.value2;
         } else {
            var orderParts = selectedOrder.value.split('-');
            if (orderParts[0]) {
               base.oehdr.orderno = orderParts[0];
               base.oehdr.ordersuf = orderParts[1];
            }
         }
      }
      var headerRetrieveRequest = {
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         maintmode: false,
         updatetype: ""
      };
      DataService.post('api/oe/asoeheader/oeheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               $scope.base.oehdr = data.oehdr;
               base.inDrillDownOperation = true;

               if ($stateParams.navState) {
                  self.continue();
               }

               //User Hook (do not rename)
               self.orderChangedContinue(data);
            }
         }
      });
   };

   self.signature = function () {
      // if order is shipped, oehdr only has orderno and ordersuf
      // customer is needed to save the signature
      if (!base.oehdr.custno) {
         var params = {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            fldlist: 'custno,stagecd'
         };
         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true },
            function (data) {
               if (data) {
                  base.oehdr.custno = data.custno;
                  if (data.stagecd > 2) {
                     AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'signature', 'stage-chk', '', '', null, self.gotoSignature, self.cancelContinue);
                  }
                  else {
                     self.gotoSignature();
                  }
               }
            });
      }
      else {
         self.gotoSignature();
      }
   };

   self.gotoSignature = function (iLoop) {
      if (!base.icsd) {
         DataService.get('api/ic/icsd/getbypk', { params: { whse: base.oehdr.whse } }, function (data) {
            if (data) {
               base.icsd = data;
               self.gotoSignature();
            }
         });
         return;
      }

      if (!base.icsd.cenpossigfl) {
         $state.go(base.baseState + '.signature', { navBackState: base.baseState + '.maintain' });
      } else {
         if (!iLoop) {
            iLoop = 0;
         }

         // payment type list is needed for CenPOS to connect properly
         if (!self.completePaymentTypeList) {
            var getsastnlistCriteria = {
               codeiden: 'p',
               fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,descrip,ccaddon,processor'
            };
            DataService.post('api/sa/sastn/getsastnlist', { data: getsastnlistCriteria, busy: true }, function (data) {
               if (data) {
                  self.completePaymentTypeList = data;
                  self.getMediaCode(iLoop);
               }
            });
         } else {
            self.getMediaCode(iLoop);
         }
      }
   };

   self.getMediaCode = function (iLoop) {
      var currentPaymentType = self.completePaymentTypeList[iLoop];
      if (currentPaymentType.processor && currentPaymentType.processor !== "0") {
         DataService.getResource('api/sa/assasetup/sastpretrieve/' + currentPaymentType.processor, { method: 'GET', busy: true }, function (data) {
            if (data.callingURLH5) {
               self.signaturePopup(currentPaymentType.codeval);
            } else {
               iLoop++;
               self.gotoSignature(iLoop);
            }
         });
      } else {
         iLoop++;
         self.gotoSignature(iLoop);
      }
   };

   self.signaturePopup = function (SigMediaCd) {
      CenPosService.showModal({
         type: 'signature',
         mediacd: SigMediaCd,
         invoiceno: base.oehdr.orderno + '-' + base.oehdr.ordersuf,
         successCallback: self.saveImage
      });
   };

   self.saveImage = function () {

      var pvImages = {
         cono: UserService.getCono(),
         keytype: 'oedlv',
         keyvalue1: base.oehdr.custno,
         keyvalue2: base.oehdr.orderno + '-' + Utils.pad(base.oehdr.ordersuf, 2),
         chunk: 1,
         descrip: 'Signature: ' + base.oehdr.custno,
         image64: 'cctrans',
         currproc: 'oeet',
         operinit: UserService.getUserName()
      };

      DataService.post('api/oe/asoeentry/oesignaturesave', { data: pvImages, busy: true }, function () {
         MessageService.info('global.information', 'global.signature.saved.successfully');
         if (self.navBackState) {
            $state.go(self.navBackState);
         } else {
            // no change in state
         }
      });
   };

   if ($stateParams.orderno) {
      self.orderNumber = $stateParams.orderno + '-' + $stateParams.ordersuf;
      self.orderChanged(self.orderNumber);
   }

   self.isMaintainOrder = function () {
      return $state.is(base.baseState + '.maintain');
   };

   self.continue = function () {
      if (base.oehdr.orderno) {
         if (base.oehdr.stagecd >= 3 && base.oehdr.oetype.toLowerCase() !== 'cs') { //if the order is shipped and is NOT a Counter Sale, then we cannot maintain it
            MessageService.error('global.error', 'message.cannot.maintain.order.after.shipping');
         } else {
            if ($scope.base.isRecovery || self.isOrderVerified) {
               self.checkRecoveryExistsCallback(false);
            } else {
               RecoveryService.checkRecoveryExists(UserService.getUserName(), Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber(), self.checkRecoveryExistsCallback);
            }
         }
      } else {
         MessageService.error('global.error', 'message.please.enter.a.valid.order.number');
      }
   };

   self.checkRecoveryExistsCallback = function (isRecoveryFound) {
      if (isRecoveryFound) {
         MessageService.info('global.information', 'message.order.is.currently.open.in.another.window');
         base.resetOehdr();
      } else {
         if (!self.isOrderVerified && base.isIsmLive.toLowerCase() === 'yes' && base.oehdr.servicekey !== '') {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'banner', 'orderno', 'c', 'sm', null, self.recoveryContinue, null);
         } else {
            self.recoveryContinue();
         }
      }
   };

   self.recoveryContinue = function () {
      if (self.isOrderVerified || base.skipMaintainHeader || $stateParams.navState) {
         if (base.skipMaintainHeader) {
            RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());
         }
         if (base.oehdr.stagecd === 2) {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'banner', 'orderno', 'c', '', null, self.recoveryAuthPointPassed, self.forceReset);
         } else if (base.oehdr.oetype === 'cs') {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'banner', 'orderno', 'c', 'cs', null, self.recoveryAuthPointPassed, self.forceReset);
         } else {
            self.duplicateCustomerPoCheck();
         }
      } else {
         RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());

         var headerRetrieveRequest = {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            maintmode: false,
            updatetype: 'retrieve-tot'
         };
         DataService.post('api/oe/asoeheader/oeheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.oehdr = data.oehdr;
                  base.whseLogStatus = data.wlstatus;

                  //User Hook (do not rename)
                  if (self.recoveryHeaderRetrieveContinue) {
                     self.recoveryHeaderRetrieveContinue(data.oehdr);
                  }

                  base.setCanFinishWithoutTendering();

                  if (base.oehdr.wlwhsefl && base.whseLogStatus.bannerfl && base.whseLogStatus.editorderfl) {
                     $state.go(base.baseState + '.maintain.orderStatus', { whseLogStatus: base.whseLogStatus, menuFunction: 'oeet', setWhseLogStatusCallback: self.setWhseLogStatusCallback, setFailCallback: self.cancelOrderStatusRetrieve});
                  }
               } else {
                  self.cancelRetrieve();
               }
            }
         });

         self.isOrderVerified = true;
      }
   };

   self.recoveryAuthPointPassed = function () {
      self.duplicateCustomerPoCheck();
   };

   self.forceReset = function (callback, isFromRecovery) {
      var orderNumber = base.delimitedOrderNumber();

      if (base.oehdr && base.oehdr.orderno) {
         if (base.oehdr.ordersuf === null) {
            LoggingService.logError('POS1 - base.oehdr.ordersuf was null for ' + base.oehdr.orderno, 'POS1');
         }
         DataService.get('api/oe/asoeheader/oeremovesoftlock/' + base.oehdr.orderno + '/' + base.oehdr.ordersuf, { busy: true }, function () {
            RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, orderNumber);
         });
      } else if (isFromRecovery) {
         if ($stateParams.recoverySuffix === null) {
            LoggingService.logError('POS2 - $stateParams.recoverySuffix was null for ' + $stateParams.recoveryId, 'POS2');
         }
         DataService.get('api/oe/asoeheader/oeremovesoftlock/' + $stateParams.recoveryId + '/' + $stateParams.recoverySuffix, { busy: true }, function () {
            RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, self.orderNumber);
         });
      }

      base.resetOehdr();
      self.isOrderVerified = false;

      base.inDrillDownOperation = false;

      //ForceReset is called from a lot of places.  It removes the soft lock.  If there's a callback
      //passed in, then this will take the user to their intended destination.
      if (callback) {
         callback();
      }
   };

   self.getDuplicateCustPoList = function (duplicateCustPoRequired) {
      if (duplicateCustPoRequired === 'w') {
         var dupCustPoCriteria = {
            custno: base.oehdr.custno,
            custpo: base.oehdr.custpo,
            transtype: base.oehdr.oetype,
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf
         };
         DataService.post('api/oe/asoeentry/oeetdupcustpogetlist', { data: dupCustPoCriteria, busy: true }, function (data) {
            if (data && data.length) {
               Utils.replaceArray(self.duplicateCustomerPoOrders, data);
               ModalService.showModal('oe/oeet/initiate/duplicate-customer-po-change.json', 'OeetMaintainDuplicatePoModalCtrl as dcpo', $scope, function (modal) {
                  self.duplicatePoModal = modal;
               });
            } else {
               self.updateOehdr();
            }
         });
      } else {
         self.updateOehdr();
      }
   };

   self.duplicateCustomerPoCheck = function () {
      if (base.oehdr.custpo) {
         var duplicateCustPoRequired = AodataService.getValue('OE', 'OEDupCustPo');
         if (duplicateCustPoRequired) {
            if (!self.duplicatePoModal) {
               self.getDuplicateCustPoList(duplicateCustPoRequired);
            } else {
               self.updateOehdr();
            }
         } else {
            self.updateOehdr();
         }
      } else {
         self.updateOehdr();
      }
   };

   self.updateOehdr = function () {
      base.oehdr.visiblelist = base.oehdrEditVisibleList;
      var headerUpdateRequest = {
         oehdr: base.oehdr,
         lMaintMode: false
      };
      DataService.post('api/oe/asoeheader/oeheaderupdate', { data: headerUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {

               // Retotal order based on (O)rdered, (S)hipped or (B)oth
               base.calcsob = 'o';
               base.updateLineItems(function () {
                  if ($stateParams.navState) {
                     $state.go(base.baseState + $stateParams.navState);
                  } else if (base.oehdr.oetype.toLowerCase() === 'rm' || base.oehdr.oetype.toLowerCase() === 'cr') {
                     $state.go(base.baseState + '.initiate.correctionReturn');
                  } else if (base.oehdr.oetype.toLowerCase() === 'bl') {
                     $state.go(base.baseState + '.initiate.blanket');
                  } else {
                     $state.go(base.defaultLineEntryState);
                  }
               });
               base.setCanFinishWithoutTendering();

               //User Hook (do not rename)
               if (self.oeHeaderUpdateContinue) {
                  self.oeHeaderUpdateContinue(data);
               }
            }
         }
      });
   };

   self.headerVisibleFieldChanged = function (fieldName) {
      if (fieldName === 'orderdisp') {
         if (!base.oehdrEditVisibleList.includes(fieldName)) {
            if (base.oehdrEditVisibleList) {
               base.oehdrEditVisibleList += base.DELIMITER_COMMA;
            }
            base.oehdrEditVisibleList += fieldName;
         }
      }
   };

   self.cancelContinue = function () {
      base.resetOehdr();
      self.orderNumber = '';
      self.isOrderVerified = false;
   };

   self.cancel = function () {
      self.forceReset(self.cancelContinue);
   };

   self.createContinue = function () {
      base.resetOehdr();
      $state.go(base.baseState + '.initiate');
   };

   self.create = function () {
      self.forceReset(self.createContinue);
   };

   self.deleteContinue = function () {
      base.resetOehdr();
      $state.go(base.baseState + '.delete');
   };

   self.delete = function () {
      self.forceReset(self.deleteContinue);
   };

   self.copyContinue = function () {
      base.resetOehdr();
      $state.go(base.baseState + '.copy');
   };

   self.copy = function () {
      self.forceReset(self.copyContinue);
   };

   self.printContinue = function () {
      base.resetOehdr();
      $state.go(base.baseState + '.print');
   };

   self.print = function () {
      self.forceReset(self.printContinue);
   };

   self.receiveOnAccountContinue = function () {
      base.resetOehdr();
      $state.go(base.baseState + '.receiveOnAccount');
   };

   self.receiveOnAccount = function () {
      self.forceReset(self.receiveOnAccountContinue);
   };

   self.counterSalesShippingContinue = function () {
      base.resetOehdr();
      $state.go(base.baseState + '.counterSalesShipping');
   };

   self.counterSalesShipping = function () {
      self.forceReset(self.counterSalesShippingContinue);
   };

   self.maintainPo = function () {
      $state.go(base.baseState + '.maintainPO');
   };

   self.billingOrdersContinue = function () {
      $state.go(base.baseState + '.billingOrders');
   };

   self.billingOrders = function () {
      self.forceReset(self.billingOrdersContinue);
   };

   self.importFromExcelContinue = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.importFromExcel = function () {
      self.forceReset(self.importFromExcelContinue);
   };

   self.orderEntryDefaultsClickedContinue = function () {
      $state.go(base.baseState + '.initiate.orderEntryDefaults');
   };

   self.orderEntryDefaultsClicked = function () {
      //Force a reset even from here since when they hit back from the Entry Default screen they are take
      //back into Initiate.
      self.forceReset(self.orderEntryDefaultsClickedContinue);
   };

   self.orderFulfillmentClicked = function () {

      // Save off to pass to Fulfillment Screen
      fulfillmentOrdNo = base.oehdr.orderno;
      fulfillmentOrdSuf = base.oehdr.ordersuf;

      // Clear Maintain values
      base.resetOehdr();

      // run Fulfillment Screen
      self.orderFulfillmentContinue();
   };

   self.orderFulfillmentContinue = function () {
      $state.go(base.baseState + '.orderFulfillment', {
         ofFunctionName: 'oeet-hdr',
         ofOrderNo: fulfillmentOrdNo,
         ofOrderSuf: fulfillmentOrdSuf,
         ofLineNo: '0'
      });
   };

   self.maintCustShipTo = function () {
      $state.go(base.baseState + '.editCustomerShipTo');
   };
});

app.controller('OeetMaintainDuplicatePoModalCtrl', function ($scope, $translate) {
   var self = this;
   var base = $scope.base;
   var mo = $scope.mo;

   self.messageAboveGrid = function () {
      return $translate.instant('message.the.following.orders.with.the.same.customer.po') + base.oehdr.custpo + $translate.instant('message.parenthesis.have.been.found');
   };

   self.messageBelowGrid = function () {
      return $translate.instant('question.proceed.with.duplicate.customer.purchase.order.num');
   };

   self.navigateToOrder = function (e, args) {
      var order = args[0].item;
      base.navToOrderInquiry(order.orderno, order.ordersuf);
      mo.duplicatePoModal.destroy();
   };

   self.ok = function () {
      mo.updateOehdr();
      mo.duplicatePoModal.destroy();
   };

   self.cancel = function () {
      mo.duplicatePoModal.destroy();
   };
});

app.controller('OeetDeleteCtrl', function ($state, $scope, $translate, DataService, MessageService, RecoveryService, AuthService, SecurityService, Constants, LoggingService) {
   // alias => del
   var self = this;
   var base = $scope.base;

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(Constants.MENU_FUNCTION_OEET);

   self.isDeleteOrder = function () {
      return $state.is(base.baseState + '.delete');
   };

   self.checkForAuthPoints = function () {
      self.pickAuthRequired = (self.oehdr.stagecd === 2 && self.oehdr.tendamt === 0 && self.operatorMenuSecurity <= 3);
      self.restrictAuthRequired = (self.oehdr.bpquoteno && self.oehdr.stagecd < 3 && (self.oehdr.restrictty === 'r' || self.oehdr.restrictty === 'a'));
      self.serviceAuthRequired = self.oehdr.servicekey ? true : false;
      self.pickAuthPointPassed = false;
      self.restrictAuthPointPassed = false;
      self.serviceAuthPointPassed = false;
      self.authPointExecution();
   };

   self.authPointExecution = function () {
      if (self.pickAuthRequired && !self.pickAuthPointPassed) { //if pick auth point is required but not yet passed
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'banner', 'pickstage', '', '', null, function () {
            self.pickAuthPointPassed = true;
            self.authPointExecution(); //check for other auth points
         }, null);
      } else if (self.restrictAuthRequired && !self.restrictAuthPointPassed) { //if restrict auth point is required but not yet passed
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'banner', 'restrictty', 'd', '', null, function () {
            self.restrictAuthPointPassed = true;
            self.authPointExecution(); //check for other auth points
         }, null);
      } else if (self.serviceAuthRequired && !self.serviceAuthPointPassed) { //if service auth point is required but not yet passed
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'banner', 'orderno', 'c', 'SM', null, function () {
            self.serviceAuthPointPassed = true;
            self.authPointExecution(); //check for other auth points
         }, null);
      } else { //if all the auth points are either not required or have passed
         self.checkForLineTies();
      }
   };

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         $scope.base.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Cancel update if the authorization point in the warehouse logistics status failed
      if (parameters.stage && parameters.stage === 'finishFullSuccess') {
         self.checkForAuthPoints();
      }
   };

   //we want a seperate order data for delete
   self.forceReset = function () {
      self.oehdr = {};
      self.orderTotals = {};
      self.whseLogStatus = {};
      self.selectedLostBusinessReason = '';
      self.isLostBusinessReasonVisible = false;
      self.orderNumber = '';
   };
   self.forceReset();

   self.orderSelected = function (args) {
      if (args.value > 0) {
         self.oehdr.orderno = args.value;
         self.oehdr.ordersuf = args.value2;

         var headerRetrieveRequest = {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            maintmode: false,
            updatetype: ""
         };
         DataService.post('api/oe/asoeheader/oeheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.oehdr = data.oehdr;
                  self.whseLogStatus = data.wlstatus;

                  //User Hook (do not rename)
                  if (self.orderSelectedContinue) {
                     self.orderSelectedContinue(data.oehdr);
                  }

                  var calculateTotalsCriteria = {
                     maint: false,
                     orderno: self.oehdr.orderno,
                     ordersuf: self.oehdr.ordersuf,
                     calcsob: "b" // Both ordered and shipped totals
                  };
                  DataService.post('api/oe/asoeinquiry/oecalculateordshptotals', { data: calculateTotalsCriteria, busy: true }, function (data) {
                     if (data) {
                        self.orderTotals = data;
                     }
                  });
               }
            }
         });
      }
   };

   self.oetypeDisplay = function () {
      switch (self.oehdr.oetype) {
         case 'rm': //return
            return $translate.instant('global.return');
         case 'cr': //correction
            return $translate.instant('global.correction');
         case 'do': //direct
            return $translate.instant('global.direct');
         case 'qu': //quote
            return $translate.instant('global.quote');
         case 'bl': //blanket
            return $translate.instant('global.blanket');
         case 'st': //standing
            return $translate.instant('global.standing');
         case 'fo': //future
            return $translate.instant('global.future');
         case 'so': //stock
            return $translate.instant('global.stock');
         case 'cs': //counter sale
            return $translate.instant('global.counter.sale');
      }
   };

   self.continue = function () {
      // The canccancelorderfl will allow the user to cancel (not delete - if you ever move this to GUI) the order if it was zero shipped in TWL with just
      // labor lines shipped
      if (self.oehdr.wlwhsefl && self.whseLogStatus.bannerfl && (self.whseLogStatus.editorderfl && !self.whseLogStatus.cancancelorderfl)) {
         $state.go(base.baseState + '.delete.orderStatus', { whseLogStatus: self.whseLogStatus, menuFunction: 'oeet', setWhseLogStatusCallback: self.setWhseLogStatusCallback });
      } else {
         self.checkForAuthPoints();
      }
   };

   self.checkForLineTies = function () {
      DataService.get('api/oe/asoeinquiry/oecheckcancelalllinestieauth/' + self.oehdr.orderno + '/' + self.oehdr.ordersuf, { busy: true }, function (data) {
         if (data) {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'lines', 'ordertype', '', '', null, self.lineTieAuthPointPassedCallback, null);
         } else {
            self.setupLostBusiness();
         }
      });
   };

   self.lineTieAuthPointPassedCallback = function () {
      self.setupLostBusiness();
   };

   //User Hook (do not rename)
   self.oeOrderCancelValidateContinue = function () {
      self.isLostBusinessReasonVisible = true;
   };

   self.setupLostBusiness = function () {
      var headerRetrieveRequest = {
         orderno: self.oehdr.orderno,
         ordersuf: self.oehdr.ordersuf,
         maintmode: false,
         updatetype: 'retrieve-tot'
      };
      DataService.post('api/oe/asoeheader/oeheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.whseLogStatus = data.wlstatus;

               var orderCancelValidateRequest = {
                  orderno: self.oehdr.orderno,
                  ordersuf: self.oehdr.ordersuf,
                  lostbusty: '',
                  secure: self.operatorMenuSecurity
               };
               DataService.post('api/oe/asoeheader/oeordercancelvalidate', { data: orderCancelValidateRequest, busy: true }, function () {
                  RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());

                  //User Hook (do not rename)
                  self.oeOrderCancelValidateContinue();

               }, function () {

                  DataService.get('api/oe/asoeheader/oeremovesoftlock/' + self.oehdr.orderno + '/' + self.oehdr.ordersuf, { busy: true }, function () {
                     RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());
                  });
               });
            } else {
               self.forceReset();
            }
         }
      });
   };

   self.delete = function () {
      if (self.oehdr.oetype === 'qu' && !self.selectedLostBusinessReason) {
         MessageService.error('global.error', 'message.a.lost.business.reason.must.be.selected.for.quote');
      } else if (base.orderEntrySettings.lostbusreasonfl && !self.selectedLostBusinessReason) {
         MessageService.error('global.error', 'global.lost.business.reason.required');
      } else {
         var orderCancelRequest = {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            lostbusty: self.selectedLostBusinessReason,
            secure: self.operatorMenuSecurity
         };
         DataService.post('api/oe/asoeheader/oeordercancel', { data: orderCancelRequest, busy: true }, function (data) {
            if (data) {
               MessageService.alert('global.warning', data);
            }

            RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());
            self.forceReset();
         });
      }
   };

   self.cancel = function () {
      if (self.oehdr.ordersuf === null) {
         LoggingService.logError('POS3 - self.oehdr.ordersuf was null for ' + self.oehdr.orderno, 'POS3');
      }
      DataService.get('api/oe/asoeheader/oeremovesoftlock/' + self.oehdr.orderno + '/' + self.oehdr.ordersuf, { busy: true }, function () {
         RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_OEET, 0, base.delimitedOrderNumber());
         self.forceReset();
      });
   };

   self.back = function () {
      $state.go(base.baseState + '.initiate');
   };
});

app.controller('OeetPrintCtrl', function ($state, $scope, $stateParams, AodataService, AuthService, DataService, GlobalValueService, UserService, ReportService, MessageService, Sasc, Sasoo) {
   var self = this;
   var base = $scope.base;

   //turn everything off, print load call will turn things back on
   self.isPrintAckEnabled = false;
   self.isPrintInvoiceEnabled = false;
   self.isPrintPickTicketEnabled = false;
   self.isPrintReceiptEnabled = false;
   self.isPrintDeliveryEnabled = false;
   self.oeCustomerNumber = 0;
   self.oeShipTo = '';
   self.autoPrintEnabled = true;

   if (!base.autoPrintData) {
      base.autoPrintData = { autoPrint: base.autoPrintDefault };
      self.useWhereAppropriate = base.useWhereAppropriateDefault;
   }

   var acknowledgementService = ReportService.getReportFunction('oeepa');
   var pickTicketService = ReportService.getReportFunction('oeepp');
   var demandInvoiceService = ReportService.getReportFunction('oerd');
   var deliveryNoticeService = ReportService.getReportFunction('oeepd');

   self.printLoadCriteria = {
      oeepasecure: acknowledgementService ? acknowledgementService.securitylevel : 0,
      oeeppsecure: pickTicketService ? pickTicketService.securitylevel : 0,
      oerdsecure: demandInvoiceService ? demandInvoiceService.securitylevel : 0,
      oeepdsecure: deliveryNoticeService ? deliveryNoticeService.securitylevel : 0
   };

   var printLoadRequest = {
      oeetprintglobals: {
         cono: UserService.getCono(),
         operinit: UserService.getUserName()
      },
      oeetprintloadcriteria: self.printLoadCriteria
   };
   DataService.post('api/oe/asoeentry/oeetprintload', { data: printLoadRequest, busy: true }, function (data) {
      if (data) {
         self.printLoadResponse = data;

         data.oeetprintreportlist.forEach(function (printReport) {
            switch (printReport.type) {
               case 'a':
                  self.isPrintAckEnabled = true;
                  break;
               case 'i':
                  self.isPrintInvoiceEnabled = true;
                  break;
               case 'p':
                  self.isPrintPickTicketEnabled = true;
                  break;
               case 'r':
                  self.isPrintReceiptEnabled = true;
                  break;
               case 'd':
                  self.isPrintDeliveryEnabled = true;
                  break;
            }
         });
      }
   });

   if ($stateParams.orderNumber) {
      self.fullOrderNumber = $stateParams.orderNumber;
   }

   self.autoPrintChanged = function () {
      if (base.autoPrintData) {
         GlobalValueService.set('Global.AutoPrint', base.autoPrintData.autoPrint);
      }
   };

   self.useWhereAppropriateChanged = function () {
      GlobalValueService.set('Global.UseWhereAppropriate', self.useWhereAppropriate);
   };

   self.orderChanged = function (args) {
      if (args.value) {
         if (args.value > 0) {
            self.printLoadCriteria.orderno = args.value;
            self.printLoadCriteria.ordersuf = args.value2;
            var orderNo = args.value;
            if (orderNo) {

               //User Hook (do not rename) (do not change scope of this from self)
               self.oeehParams = {
                  fillmode: true,
                  fldlist: 'shipto,custno'
               };

               //User Hook (do not rename)
               if (self.getbyrowpointerCriteria) {
                  self.getbyrowpointerCriteria();
               }

               DataService.get('api/oe/oeeh/getbyrowpointer/' + args.rowPointer, { params: self.oeehParams, busy: true }, function (data) {  //SI03
                  if (data) {
                     self.selectedOrder = data;
                     self.oeCustomerNumber = self.selectedOrder.custno;
                     self.oeShipTo = self.selectedOrder.shipto;
                     if (self.selectedOrder.shipto) {
                        var arssParams = {
                           custno: self.selectedOrder.custno,
                           shipto: self.selectedOrder.shipto,
                           fldlist: 'email,faxphoneno'
                        };
                        DataService.get('api/ar/arss/getbypk', { params: arssParams, busy: true }, function (shiptoData) {
                           if (data) {
                              if (shiptoData.faxphoneno) {
                                 self.ackSettings.faxphoneno = shiptoData.faxphoneno;
                              } else {
                                 self.getArscFaxphoneno();
                              }
                              if (data.email) {
                                 self.ackSettings.emailaddr = shiptoData.email;
                                 self.receiptSettings.emailaddr = shiptoData.email;
                                 self.invoiceSettings.emailaddr = shiptoData.email;
                                 self.pickTicketSettings.emailaddr = shiptoData.email;
                                 self.deliverySettings.emailaddr = shiptoData.email;

                                 //User Hook (do not rename)
                                 if (self.orderChangedContinue) {
                                    self.orderChangedContinue(self.selectedOrder);
                                 }
                              } else {
                                 self.getArscEmail(self.selectedOrder);
                              }
                           } else {
                              //User Hook (do not rename)
                              if (self.orderChangedContinue) {
                                 self.orderChangedContinue(self.selectedOrder);
                              }
                           }
                        });
                     } else {
                        self.getArscFaxphoneno();
                        self.getArscEmail(self.selectedOrder);
                     }
                     self.printLoadChangeOrder();
                  }
               });
            } else {
               self.clearFaxDefaults();
            }
         }
      } else {
         self.printLoadCriteria.orderno = '';
         self.printLoadCriteria.ordersuf = '';
         self.clearFaxDefaults();
      }
   };

   self.getArscFaxphoneno = function () {
      var arscParams = {
         custno: self.selectedOrder.custno,
         fillmode: false,
         fldlist: 'faxphoneno'
      };
      DataService.get('api/ar/arsc/getbypk', { params: arscParams, busy: true }, function (data) {
         if (data) {
            self.ackSettings.faxphoneno = data.faxphoneno;
         }
      });
   };

   self.getArscEmail = function (selectedOrder) {
      var arssParams = {
         custno: self.selectedOrder.custno,
         fillmode: false,
         fldlist: 'email'
      };
      DataService.get('api/ar/arsc/getbypk', { params: arssParams, busy: true }, function (data) {
         if (data) {
            self.ackSettings.emailaddr = data.email ? data.email : Sasoo.tqemailaddr;
            self.receiptSettings.emailaddr = data.email ? data.email : Sasoo.tqemailaddr;
            self.invoiceSettings.emailaddr = data.email ? data.email : Sasoo.tqemailaddr;
            self.pickTicketSettings.emailaddr = data.email ? data.email : Sasoo.tqemailaddr;
            self.deliverySettings.emailaddr = data.email ? data.email : Sasoo.tqemailaddr;

            //User Hook (do not rename)
            if (self.orderChangedContinue) {
               self.orderChangedContinue(self.selectedOrder);
            }
         } else {
            self.ackSettings.emailaddr = Sasoo.tqemailaddr;
            self.receiptSettings.emailaddr = Sasoo.tqemailaddr;
            self.invoiceSettings.emailaddr = Sasoo.tqemailaddr;
            self.pickTicketSettings.emailaddr = Sasoo.tqemailaddr;
            self.deliverySettings.emailaddr = Sasoo.tqemailaddr;
         }
      });
   };

   self.printLoadChangeOrder = function () {
      var loadChangeOrderRequest = {
         oeetprintreportlist: self.printLoadResponse.oeetprintreportlist,
         oeetprintscreensingle: self.printLoadResponse.oeetprintscreensingle,
         oeetprintglobals: self.printLoadResponse.oeetprintglobals,
         oeetprintloadcriteria: self.printLoadCriteria
      };
      DataService.post('api/oe/asoeentry/oeetprintloadchangeorder', { data: loadChangeOrderRequest, busy: true }, function (data) {
         if (data) {
            data.oeetprintreportlist.forEach(function (printReport) {
               switch (printReport.name.toLowerCase()) {
                  case 'acknowledgement':
                     self.ackSettings.faxphoneno = self.ackSettings.printtype === 'f' ? printReport.faxphoneno : self.ackSettings.faxphoneno;
                     self.ackSettings.faxto1 = printReport.faxto1;
                     self.ackSettings.faxto2 = printReport.faxto2;
                     self.ackSettings.faxfrom = printReport.faxfrom;
                     self.ackSettings.printernm = self.ackSettings.printtype === 'f' ? Sasc.oifaxdev2 : self.ackSettings.printernm;
                     self.ackSettings.emailaddr = self.ackSettings.printtype === 'e' ? printReport.emailaddr : self.ackSettings.emailaddr;
                     self.ackSettings.faxpriority = printReport.faxpriority;
                     break;
                  case 'receipt':
                     self.receiptSettings.faxphoneno = self.receiptSettings.printtype === 'f' ? printReport.faxphoneno : '';
                     self.receiptSettings.faxto1 = printReport.faxto1;
                     self.receiptSettings.faxto2 = printReport.faxto2;
                     self.receiptSettings.faxfrom = printReport.faxfrom;
                     self.receiptSettings.printernm = self.receiptSettings.printtype === 'f' ? printReport.faxprinternm : self.receiptSettings.printernm;
                     self.receiptSettings.emailaddr = self.receiptSettings.printtype === 'e' ? printReport.emailaddr : self.receiptSettings.emailaddr;
                     self.receiptSettings.faxpriority = printReport.faxpriority;
                     break;
                  case 'invoice':
                     self.invoiceSettings.faxphoneno = self.invoiceSettings.printtype === 'f' ? printReport.faxphoneno : '';
                     self.invoiceSettings.faxto1 = printReport.faxto1;
                     self.invoiceSettings.faxto2 = printReport.faxto2;
                     self.invoiceSettings.faxfrom = printReport.faxfrom;
                     self.invoiceSettings.printernm = self.invoiceSettings.printtype === 'f' ? Sasc.oifaxdev3 : self.invoiceSettings.printernm;
                     self.invoiceSettings.emailaddr = self.invoiceSettings.printtype === 'e' ? printReport.emailaddr : self.invoiceSettings.emailaddr;
                     self.invoiceSettings.faxpriority = printReport.faxpriority;
                     break;
                  case 'pick ticket':
                     self.pickTicketSettings.faxphoneno = self.pickTicketSettings.printtype === 'f' ? printReport.faxphoneno : '';
                     self.pickTicketSettings.faxto1 = printReport.faxto1;
                     self.pickTicketSettings.faxto2 = printReport.faxto2;
                     self.pickTicketSettings.faxfrom = printReport.faxfrom;
                     self.pickTicketSettings.printernm = self.pickTicketSettings.printtype === 'f' ? printReport.faxprinternm : self.pickTicketSettings.printernm;
                     self.pickTicketSettings.emailaddr = self.pickTicketSettings.printtype === 'e' ? printReport.emailaddr : self.pickTicketSettings.emailaddr;
                     self.pickTicketSettings.faxpriority = printReport.faxpriority;
                     break;
                  case 'delivery document':
                     self.deliverySettings.faxphoneno = self.deliverySettings.printtype === 'f' ? printReport.faxphoneno : '';
                     self.deliverySettings.faxto1 = printReport.faxto1;
                     self.deliverySettings.faxto2 = printReport.faxto2;
                     self.deliverySettings.faxfrom = printReport.faxfrom;
                     self.deliverySettings.printernm = self.deliverySettings.printtype === 'f' ? printReport.faxprinternm : self.deliverySettings.printernm;
                     self.deliverySettings.emailaddr = self.deliverySettings.printtype === 'e' ? printReport.emailaddr : self.deliverySettings.emailaddr;
                     self.deliverySettings.faxpriority = printReport.faxpriority;
                     break;
               }
            });

            //User Hook (do not rename)
            if (self.printLoadChangeOrderContinue) {
               self.printLoadChangeOrderContinue(data);
            }

         }
      });
      var params = {
         orderno: self.printLoadCriteria.orderno,
         ordersuf: self.printLoadCriteria.ordersuf
      };

      DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.printOeWarehouse = data.whse;
         }
      });
   };

   self.clearFaxDefaults = function () {
      self.ackSettings.faxphoneno = self.receiptSettings.faxphoneno = self.invoiceSettings.faxphoneno = '';
      self.ackSettings.faxto1 = self.receiptSettings.faxto1 = self.invoiceSettings.faxto1 = '';
      self.ackSettings.faxto2 = self.receiptSettings.faxto2 = self.invoiceSettings.faxto2 = '';
      self.ackSettings.faxfrom = self.receiptSettings.faxfrom = self.invoiceSettings.faxfrom = '';
      self.ackSettings.printernm = self.receiptSettings.printernm = self.invoiceSettings.printernm = '';
      self.ackSettings.faxpriority = self.receiptSettings.faxpriority = self.invoiceSettings.faxpriority = false;
   };
   
   self.onPrintOptionsCheckUncheck = function (printOption) {

      switch (printOption) {
         case 'isPrintAck':
            if (!self.isPrintAck && self.ackControl) {
               self.ackSettings.printtype = 'p';
               self.ackControl.isPrinterOptionsFlagVisible = false;
               self.ackControl.printerTypeChange(self.ackSettings.printtype);
            }
            break;
         case 'isPrintPickTicket':
            if (!self.isPrintPickTicket && self.pickTicketControl) {
               self.pickTicketSettings.printtype = 'p';
               self.pickTicketControl.isPrinterOptionsFlagVisible = false;
               self.pickTicketControl.printerTypeChange(self.pickTicketSettings.printtype);
            }
            break;
         case 'isPrintDelivery':
            if (!self.isPrintDelivery && self.deliveryControl) {
               self.deliverySettings.printtype = 'p';
               self.deliveryControl.isPrinterOptionsFlagVisible = false;
               self.deliveryControl.printerTypeChange(self.deliverySettings.printtype);
            }
            break;
         case 'isPrintInvoice':
            if (!self.isPrintInvoice && self.invoiceControl) {
               self.invoiceSettings.printtype = 'p';
               self.invoiceControl.isPrinterOptionsFlagVisible = false;
               self.invoiceControl.printerTypeChange(self.invoiceSettings.printtype);
            }
            break;
         case 'isPrintReceipt':
            if (!self.isPrintReceipt && self.receiptControl) {
               self.receiptSettings.printtype = 'p';
               self.receiptControl.isPrinterOptionsFlagVisible = false;
               self.receiptControl.printerTypeChange(self.receiptSettings.printtype);
            }
            break;
         default:
            break;
      }
   };

   self.submit = function () {

      var orderno = self.fullOrderNumber.substr(0, self.fullOrderNumber.indexOf('-'));
      var ordersuf = self.fullOrderNumber.substr(self.fullOrderNumber.indexOf('-') + 1);

      if ((self.isPrintInvoice || self.isPrintPickTicket) && AodataService.getValue('OE', 'ISMprint') === "yes") {
         DataService.get('api/oe/oeeh/getbypk?orderno=' + orderno + '&ordersuf=' + ordersuf + '&fldlist=servicekey', { busy: true }, function (data) {
            if (data) {
               if (data.servicekey && data.servicekey !== '') {
                  AuthService.createAuthPoint('oerd', '', 'print', '', 'SM', null, function () {
                     self.printPostAuthPoint();
                  }, function () {
                     self.isPrintInvoice = false;
                  });
               } else {
                  self.printPostAuthPoint();
               }
            }
         });
      } else if (self.isPrintInvoice && base.isAOConsolFulfillmentOn && base.isOrderFulfillmentOn) {
         DataService.get('api/oe/oeeh/getbypk?orderno=' + orderno + '&ordersuf=' + ordersuf + '&fldlist=fulfillmenttiedfl', { busy: true }, function (data) {
            if (data) {
               if (data.fulfillmenttiedfl) {
                  MessageService.yesNo('global.warning', 'message.order.to.be.billed.through.consolidated.invoicing', function () {
                     self.printPostAuthPoint();
                  });
               } else {
                  self.printPostAuthPoint();
               }
            }
         });
      } else {
         self.printPostAuthPoint();
      }
   };

   self.printPostAuthPoint = function () {
      self.printLoadResponse.oeetprintreportlist.forEach(function (printReport) {
         printReport.printfl = false;

         switch (printReport.type) {
            case 'a':
               if (self.isPrintAck) {
                  printReport.printfl = true;
               }
               break;
            case 'i':
               if (self.isPrintInvoice) {
                  printReport.printfl = true;
               }
               break;
            case 'p':
               if (self.isPrintPickTicket) {
                  printReport.printfl = true;
               }
               break;
            case 'r':
               if (self.isPrintReceipt) {
                  printReport.printfl = true;
               }
               break;
            case 'd':
               if (self.isPrintDelivery) {
                  printReport.printfl = true;
               }
               break;
         }
      });

      var printerSettings = [];
      if (self.isPrintAck) {
         printerSettings.push(self.ackSettings);
      }
      if (self.isPrintInvoice) {
         printerSettings.push(self.invoiceSettings);
      }
      if (self.isPrintPickTicket) {
         printerSettings.push(self.pickTicketSettings);
      }
      if (self.isPrintReceipt) {
         printerSettings.push(self.receiptSettings);
      }
      if (self.isPrintDelivery) {
         printerSettings.push(self.deliverySettings);
      }

      self.checkAutoPrint();

      var validateRequest = {
         oeetprintreportlist: self.printLoadResponse.oeetprintreportlist,
         printersettings: printerSettings,
         oeetprintscreensingle: self.printLoadResponse.oeetprintscreensingle,
         iOrderNo: self.printLoadCriteria.orderno,
         iOrderSuf: self.printLoadCriteria.ordersuf
      };
      DataService.post('api/oe/asoeentry/oeetprintvalidate', { data: validateRequest, busy: true }, function (data) {
         if (data) {
            var launchCriteria = {
               orderno: self.printLoadCriteria.orderno,
               ordersuf: self.printLoadCriteria.ordersuf,
               promomsg: self.promoMessage,
               whereappfl: self.useWhereAppropriate
            };
            var launchRequest = {
               oeetprintreportlist: self.printLoadResponse.oeetprintreportlist,
               printersettings: printerSettings,
               oeetprintscreensingle: self.printLoadResponse.oeetprintscreensingle,
               oeetprintlaunchcriteria: launchCriteria
            };
            DataService.post('api/oe/asoeentry/oeetprintlaunch', { data: launchRequest, busy: true }, function () {
               MessageService.info('global.information', 'message.your.print.request.has.been.sent');

               if (base.autoPrintData.autoPrint) {
                  //set new auto print data
                  base.autoPrintData.launchCriteria = launchCriteria;
                  base.autoPrintData.printReportList = self.printLoadResponse.oeetprintreportlist;

                  base.autoPrintData.isPrintAck = self.isPrintAck;
                  base.autoPrintData.isPrintInvoice = self.isPrintInvoice;
                  base.autoPrintData.isPrintPickTicket = self.isPrintPickTicket;
                  base.autoPrintData.isPrintReceipt = self.isPrintReceipt;
                  base.autoPrintData.isPrintDelivery = self.isPrintDelivery;

                  base.autoPrintData.ackSettings = self.ackSettings;
                  base.autoPrintData.invoiceSettings = self.invoiceSettings;
                  base.autoPrintData.pickTicketSettings = self.pickTicketSettings;
                  base.autoPrintData.receiptSettings = self.receiptSettings;
                  base.autoPrintData.deliverySettings = self.deliverySettings;
               } else {
                  //clear out old auto print data
                  base.autoPrintData.launchCriteria = {};
                  base.autoPrintData.printReportList = [];

                  base.autoPrintData.isPrintAck = false;
                  base.autoPrintData.isPrintInvoice = false;
                  base.autoPrintData.isPrintPickTicket = false;
                  base.autoPrintData.isPrintReceipt = false;
                  base.autoPrintData.isPrintDelivery = false;

                  base.autoPrintData.ackSettings = {};
                  base.autoPrintData.invoiceSettings = {};
                  base.autoPrintData.pickTicketSettings = {};
                  base.autoPrintData.receiptSettings = {};
                  base.autoPrintData.deliverySettings = {};
               }

               //User Hook (do not rename)
               if (self.oeetprintlaunchContinue) {
                  self.oeetprintlaunchContinue();
               }
            });
         }
      });
   };

   self.checkAutoPrint = function () {
      //auto print cannot be used with fax print type
      if (self.isPrintAck && self.ackSettings.printType === 'f') {
         base.autoPrintData.autoPrint = false;
         self.autoPrintEnabled = false;
      } else if (self.isPrintInvoice && self.invoiceSettings.printType === 'f') {
         base.autoPrintData.autoPrint = false;
         self.autoPrintEnabled = false;
      } else if (self.isPrintPickTicket && self.pickTicketSettings.printType === 'f') {
         base.autoPrintData.autoPrint = false;
         self.autoPrintEnabled = false;
      } else if (self.isPrintReceipt && self.receiptSettings.printType === 'f') {
         base.autoPrintData.autoPrint = false;
         self.autoPrintEnabled = false;
      } else if (self.isPrintDelivery && self.deliverySettings.printType === 'f') {
         base.autoPrintData.autoPrint = false;
         self.autoPrintEnabled = false;
      }
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

   self.poPrint = function () {
      $state.go('poet.print', { callingState: 'oeet' });
   };

   self.copy = function () {
      $state.go(base.baseState + '.copy');
   };

   self.orderEntryDefaultsClicked = function () {
      $state.go(base.baseState + '.initiate.orderEntryDefaults');
   };

   self.receiveOnAccount = function () {
      $state.go(base.baseState + '.receiveOnAccount');
   };

   self.wlCounterSalesShipping = function () {
      $state.go(base.baseState + '.counterSalesShipping');
   };

   self.maintainPo = function () {
      $state.go(base.baseState + '.maintainPO');
   };

   self.wtBillingOrders = function () {
      $state.go(base.baseState + '.billingOrders');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.orderFulfillmentClicked = function () {
      $state.go(base.baseState + '.orderFulfillment', {
         ofFunctionName: 'oeet-hdr',
         ofOrderNo: '',
         ofOrderSuf: '',
         ofLineNo: ''
      });
   };

   self.maintCustShipTo = function () {
      $state.go(base.baseState + '.editCustomerShipTo');
   };
});

app.controller('OeetReceiveOnAccountCtrl', function ($state, $scope, $translate, DataService, AodataService, MessageService, CenPosService, MruService, Utils, UtilsData) {
   // alias => roa
   var self = this;
   var base = $scope.base;

   self.isOneTimeVisible = false;
   self.banknoDropDownOptions = [];

   // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getBankNoDropDown(function (dropDownList) {
      self.banknoDropDownOptions = dropDownList;
   });

   self.paymentOptions = [];
   DataService.post('api/sa/sastn/getsastnlist', { data: { codeiden: 'p', fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,descrip,ccaddon,processor,ehffl' }, busy: true }, function (data) {
      if (data) {
         data.forEach(function (sastn) {
            if (!sastn.ehffl) {
               self.paymentOptions.push(sastn);
            }
         });
      }
   });
   // Initialize swipe device for ROA if set up for operator
   if (!base.ipAddress && base.sasoo.devloc) {
      var loadTableDataRequest = {
         sasttcodes: {
            codeid: 'DL',
            filename: 'A'
         },
         sasttsearchcriteria: {}
      };
      DataService.post('api/sa/assasetup/sasttloadtabledata', { data: loadTableDataRequest, busy: true }, function (loadData) {
         if (loadData) {
            var sasttMatch;
            loadData.forEach(function (sastt) {
               if (sastt.codechar === base.sasoo.devloc) {
                  sasttMatch = sastt;
               }
            });
            if (sasttMatch) {
               DataService.post('api/sa/assasetup/sasttloadsasta', { data: sasttMatch, busy: true }, function (matchData) {
                  if (matchData) {
                     base.ipAddress = matchData.iPAddress;
                     base.deviceLocation = base.sasoo.devloc;
                  }
               });
            }
         }
      });
   }


   DataService.get('api/oe/asoeheader/oeheaderroainitialize', { busy: true }, function (data) {
      if (data) {
         self.baseRoa = jQuery.extend({}, data);
         self.roa = data;
      }
   });

   self.assignDefaultWarehouse = function () {
      var params = {
         custno: self.roa.custno,
         shipto: self.roa.shipto || 0
      };
      DataService.get('api/oe/asoeheader/loadoebannerwarehouse/{custno}/{shipto}', { pathParams: params }, function (data) {
         if (data.cWhse && self.roa.whse !== data.cWhse) {
            self.roa.whse = data.cWhse;
            self.leaveFieldChanged('whse');
         }
      });
   };

   self.leaveFieldChanged = function (fieldName) {
      if (Utils.deepCompare(self.baseRoa, self.roa)) {
         if (fieldName === 'custno' && !self.roa.custno) {
            return;
         }
         if (fieldName === 'refer') {
            self.roa.cUnMaskCardNo = self.roa.refer;
         }
         var leaveFieldRequest = {
            oeheaderroa: self.roa,
            pvFieldname: fieldName
         };
         DataService.post('api/oe/asoeheader/oeheaderroaleavefield', { data: leaveFieldRequest, busy: true }, function (leaveFieldData) {
            if (leaveFieldData) {
               if (!MessageService.processMessaging(leaveFieldData.messaging)) {
                  self.roa = leaveFieldData.oeheaderroa;

                  var sastnParams = {
                     codeiden: 'p',
                     codeval: self.roa.mediacd,
                     fldlist: ''
                  };
                  DataService.get('api/sa/sastn/getbypk', { params: sastnParams, busy: true }, function (sastnData) {
                     if (sastnData) {
                        if (sastnData.addtaxfl) {
                           self.isOneTimeVisible = true;
                           self.isCheckVisible = false;
                           self.oneTimeLabel = $translate.instant('global.one.time.sale');
                        } else if (sastnData.chkauth) {
                           self.isOneTimeVisible = false;
                           self.isCheckVisible = true;
                           self.oneTimeLabel = $translate.instant('global.one.time.ach');
                        } else {
                           self.isOneTimeVisible = false;
                           self.isCheckVisible = true;
                        }
                     } else {
                        self.isOneTimeVisible = false;
                        self.isCheckVisible = true;
                     }
                  });

                  //if the customer changed, or ship to changed & conditions are met, go get the default warehouse
                  if (fieldName === 'custno' || (fieldName === 'shipto' && (base.defaultWarehouseSetting === 'Ship To' || !self.roa.whse))) {
                     self.assignDefaultWarehouse();
                  }

                  // Enable/disable "Add Card" button by custno/shipto and AO setting.
                  if (fieldName === 'custno' || fieldName === 'shipto') {
                     var aoBlockCardCreate = AodataService.getValue('OE', 'BlockCardCreate');

                     if (aoBlockCardCreate === 'yes') {
                        self.isAddCardEnabled = false;
                     }
                     else {
                        var params;
                        if (base.oehdr.shipto) {
                           params = {
                              custno: self.roa.custno,
                              shipto: self.roa.shipto,
                              fldlist: 'ccblockfl'
                           };

                           DataService.get('api/ar/arss/getbypk', { params: params }, function (data) {
                              if (data) {
                                 self.isAddCardEnabled = !data.ccblockfl;
                              }
                           });
                        }
                        else {
                           params = {
                              custno: self.roa.custno,
                              fldlist: 'ccblockfl'
                           };

                           DataService.get('api/ar/arsc/getbypk', { params: params }, function (data) {
                              if (data) {
                                 self.isAddCardEnabled = !data.ccblockfl;
                              }
                           });
                        }
                     }
                  }

               }
            }
         });
      }
   };

   self.addNewCardClicked = function () {
      CenPosService.showModal({
         type: 'add',
         mediacd: self.roa.mediacd,
         shipto: self.roa.shipto,
         custno: self.roa.custno,
         invoiceno: self.roa.orderno,
         successCallback: self.saveARSD
      });
   };

   self.saveARSD = function () {
      var arsdSave = {
         mediacd: self.roa.mediacd,
         shipto: self.roa.shipto,
         custno: self.roa.custno
      };
      DataService.post('api/ar/asarsetup/arsdsave', { data: arsdSave, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            var cardNo = data.arsdsave.cardno.split('\x0003');
            self.roa.mediacd = data.arsdsave.mediacd;
            self.roa.refer = cardNo[0].trim();
            self.roa.cUnMaskCardNo = data.arsdsave.cardno;
         }
      });
   };

   self.oneTimeClicked = function () {
      if (base.journal && base.journal.gJrnlno) {
         self.roa.onetimesalefl = true;

         var beforeOneTimeRequest = {
            oeheaderroa: self.roa,
            pvJrnlno: base.journal.gJrnlno
         };

         DataService.post('api/oe/asoeheader/oeheaderroabeforeonetime', { data: beforeOneTimeRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.roa = data.oeheaderroa;

                  CenPosService.showModal({
                     type: 'sale',
                     mediacd: self.roa.mediacd,
                     shipto: self.roa.shipto,
                     custno: self.roa.custno,
                     invoiceno: self.roa.orderno,
                     whse: self.roa.whse,
                     onetimetype: 'ROA',
                     issale: true,
                     amount: self.roa.amount,
                     taxamt: Math.abs(self.roa.amount) < 1 ? 0.1 : 1,
                     successCallback: self.oneTimeSuccessCallback,
                     errorCallback: self.cancel,
                     cancelCallback: self.cancel,
                     ipaddress: base.ipAddress
                  });
               }
            }
         });
      } else {
         base.journalControl.showOpenView(self.oneTimeClicked);
      }
   };

   self.oneTimeSuccessCallback = function () {
      var autoPrintData = base.autoPrintData && base.autoPrintData.printReportList ? base.autoPrintData.printReportList : [];
      var afterOneTimeRequest = {
         oeetprintreportlist: autoPrintData,
         printersettings: base.getPrinterSettingsArray(),
         oeheaderroa: self.roa,
         pvJrnlno: base.journal.gJrnlno
      };
      DataService.post('api/oe/asoeheader/oeheaderroaafteronetime', { data: afterOneTimeRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               $state.go('^.initiate');
            }
         }
      });
   };

   self.submit = function () {
      if (base.journal && base.journal.gJrnlno) {
         var autoPrintData = base.autoPrintData && base.autoPrintData.printReportList ? base.autoPrintData.printReportList : [];
         var updateRequest = {
            oeetprintreportlist: autoPrintData,
            printersettings: base.getPrinterSettingsArray(),
            oeheaderroa: self.roa,
            pvJrnlno: base.journal.gJrnlno
         };
         DataService.post('api/oe/asoeheader/oeheaderroaupdate', { data: updateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  var orderNumber = data.oeheaderroa.orderno;

                  if (orderNumber) {
                     var params = {
                        orderno: orderNumber,
                        ordersuf: 0,
                        fldlist: 'rowpointer,orderno,ordersuf'
                     };
                     orderNumber += '-00';
                     DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
                        if (data) {
                           MruService.addToList('OEOrder', data.rowpointer, orderNumber, data.orderno, data.ordersuf);
                        }
                     });
                  }

                  $state.go('^.initiate');
               }
            }
         });
      } else {
         base.journalControl.showOpenView(self.submit);
      }
   };

   self.cancel = function () {
      self.roa.onetimesalefl = false;
      DataService.post('api/oe/asoeheader/oeheaderroacancel', { data: self.roa, busy: true }, function (data) {
         if (data) {
            self.roa = data;
         }
      });
   };
});

app.controller('OeetCounterSalesShippingCtrl', function ($state, $scope, DataService, MessageService) {
   // alias => css
   var self = this;

   self.orderNumberChanged = function (args) {
      if (args.value > 0) {
         DataService.get('api/wl/aswlinquiry/wlcsshipretrieve/' + args.value + '/' + args.value2, { busy: true }, function (data) {
            if (data) {
               if (data.displaymessage) {
                  MessageService.error('global.error', data.displaymessage);

                  if (!data.ordervalid) {
                     self.orderNumber = '';
                     self.wlcsShip = {};
                  } else {
                     self.wlcsShip = data;
                  }
               } else {
                  self.wlcsShip = data;
               }
            }
         });
      }
   };

   self.submit = function () {
      if (self.wlcsShip.promptmessage) {
         MessageService.yesNo('question.proceed', self.wlcsShip.promptmessage, function () {
            //yes callback
            self.wlcsShip.promptresult = true;
            DataService.post('api/wl/aswlinquiry/wlcsshipupdate', { data: self.wlcsShip, busy: true }, function (data) {
               $state.go('^.initiate');
            });
         }, function () {
            //no callback
            $state.go('^.initiate');
         });
      } else {
         if (self.wlcsShip.twlvalid && !self.wlcsShip.displaymessage) {
            DataService.post('api/wl/aswlinquiry/wlcsshipupdate', { data: self.wlcsShip, busy: true }, function (data) {
               if (data) {
                  MessageService.processMessaging(data);
                  $state.go('^.initiate');
               }
            });
         } else {
            MessageService.error('global.error', data.displaymessage);
         }
      }
   };
});

app.controller('OeetMaintainPOCtrl', function ($state, $scope, DataService, MessageService) {
   // alias => mpo
   var self = this;

   self.maintCustPo = {};

   self.orderNumberChanged = function (args) {
      if (args.value > 0) {
         self.maintCustPo.orderno = args.value;
         self.maintCustPo.ordersuf = args.value2;

         var leaveFieldRequest = {
            oeheadermaintcustpo: self.maintCustPo,
            cFieldName: 'OrderNo'
         };
         DataService.post('api/oe/asoeheader/oeheadermaintcustpoleavefield', { data: leaveFieldRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.maintCustPo = data.oeheadermaintcustpo;
               } else {
                  self.reset();
               }
            }
         });
      } else {
         self.reset();
      }
   };

   self.reset = function () {
      self.maintCustPo = {};
      self.orderNumber = '';
   };

   self.updatePo = function () {
      DataService.post('api/oe/asoeheader/oeheadermaintcustpoupdate', { data: self.maintCustPo, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               self.reset();
               self.view.applyAutoFocus();
            }
         }
      });
   };
});

app.controller('OeetBillingOrdersCtrl', function ($state, $scope, DataService, MessageService, GridService, Utils) {
   // alias => wtbo
   var self = this;

   self.clear = function () {
      self.billingCriteria = {
         recordlimit: 50,
         fromrcptdt: Utils.getCurrentDate(),
         torcptdt: Utils.getCurrentDate(),
         autoaltwhsecd: '',
         whse: ''
      };
   };

   self.clear();

   self.search = function () {
      DataService.post('api/oe/asoeheader/oewtbillingsearch', { data: self.billingCriteria, busy: true }, function (data) {
         if (data) {
            self.billingOrdersCollection = data.oewtbillingresults;
            if (data.oewtbillingresults.length === 0) {
               MessageService.info('global.information', 'global.search.returned.no.results');
            }
         }
      });
   };

   self.receiptDateChanged = function () {
      if (self.billingCriteria.torcptdt < self.billingCriteria.fromrcptdt) {
         self.billingCriteria.torcptdt = self.billingCriteria.fromrcptdt;
         MessageService.error('global.error', 'message.end.date.must.come.after.start.date');
      }
   };

   self.wtBillingUpdate = function (updateType) {
      var billingUpdateRequest = {
         oewtbillingresults: GridService.getSelectedRecords(self.grid),
         oewtbillingcriteria: self.billingCriteria,
         cUpdType: updateType
      };
      DataService.post('api/oe/asoeheader/oewtbillingupdt', { data: billingUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               self.search();
            }
         }
      });
   };
});

app.controller('OeetImportFromExcelCtrl', function ($state, $scope, Constants, DataService, MessageService, MruService, Utils) {
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
   var previousWorkSheetNo = 0;
   var callImportCounter = 0;

   self.isNationalProgramsOn = base.isNationalProgramsOn;

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
      var workbook = XLSX.read(data, { type: 'binary' });
      var sheets = [];
      $.each(workbook.Sheets, function (index, value) {
         sheets.push(value);
      });

      var importFiles = [];
      sheets.forEach(function (sheet, index) {
         var rowObjects = XLSX.utils.sheet_to_row_object_array(sheet);
         rowObjects.forEach(function (row) {
            var newImportFile = {
               cWorkSheet: index,
               iRow: row.__rowNum__,
               cColValues: ''
            };

            var primaryKey;
            var secondaryKey;
            if (newImportFile.iRow > 0 && newImportFile.iRow < 9) {
               primaryKey = row['Primary Key'];
               secondaryKey = row['Secondary Key'];
               if (primaryKey) {
                  newImportFile.cColValues += primaryKey;
               }
               if (secondaryKey) {
                  newImportFile.cColValues += ',' + secondaryKey;
               }
            } else {
               primaryKey = row['Primary Key'];
               secondaryKey = row['Secondary Key'] ? row['Secondary Key'] : ' ';
               var quantity = row['Quantity'] ? row['Quantity'] : ' ';
               var unit = row['Unit'] ? row['Unit'] : ' ';
               var price = row['Price'] ? row['Price'] : ' ';
               var discount = row['Discount'] ? row['Discount'] : ' ';
               var discountType = row['Discount Type'] ? row['Discount Type'] : ' ';
               var vendor = row['Vendor'] ? row['Vendor'] : ' ';
               var line = row['Product Line'] ? row['Product Line'] : ' ';
               var category = row['Product Category'] ? row['Product Category'] : ' ';
               var cost = row['Product Cost'] ? row['Product Cost'] : ' ';
               var tieType = row['Tie Type'] ? row['Tie Type'] : ' ';
               var tieWhse = row['Tie Warehouse'] ? row['Tie Warehouse'] : ' ';
               var dropShip = row['Drop Ship Option'] ? row['Drop Ship Option'] : ' ';
               var print = row['Print Option'] ? row['Print Option'] : ' ';
               var required = row['Required Option'] ? row['Required Option'] : ' ';
               var subTotal = row['SubTotal Option'] ? row['SubTotal Option'] : ' ';
               var printPrice = row['Print Price Option'] ? row['Print Price Option'] : ' ';
               var copyComments = row['Copy Comments'] ? row['Copy Comments'] : ' ';
               var nationalProgram = row['National Program'] ? row['National Program'] : ' ';
               var customerProduct = row['Customer Product'] ? row['Customer Product'] : ' ';

               if (primaryKey) {
                  newImportFile.cColValues += primaryKey;
               }
               newImportFile.cColValues += ',' + secondaryKey;
               newImportFile.cColValues += ',' + quantity;
               newImportFile.cColValues += ',' + unit;
               newImportFile.cColValues += ',' + price;
               newImportFile.cColValues += ',' + discount;
               newImportFile.cColValues += ',' + discountType;
               newImportFile.cColValues += ',' + vendor;
               newImportFile.cColValues += ',' + line;
               newImportFile.cColValues += ',' + category;
               newImportFile.cColValues += ',' + cost;
               newImportFile.cColValues += ',' + tieType;
               newImportFile.cColValues += ',' + tieWhse;
               newImportFile.cColValues += ',' + dropShip;
               newImportFile.cColValues += ',' + print;
               newImportFile.cColValues += ',' + required;
               newImportFile.cColValues += ',' + subTotal;
               newImportFile.cColValues += ',' + printPrice;
               newImportFile.cColValues += ',' + copyComments;
               newImportFile.cColValues += ',' + nationalProgram;
               newImportFile.cColValues += ',' + customerProduct;
            }

            if (newImportFile.cColValues) {
               importFiles.push(newImportFile);
            }
         });
      });

      if (importFiles.length > 0) {
         var importLoadRequest = {
            oeimportfile: importFiles,
            iMaxLines: self.maxLines
         };
         DataService.post('api/oe/asoeheader/oeimportload', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: importLoadRequest, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);

               self.importDataCollection = data.oeimportdata;
               self.isFileImported = true;
            }
         });
      } else {
         MessageService.error('global.error', 'message.imported.file.contained.no.lines.or.was.formatted.incorrectly');
      }
   };

   self.getOrderAndAddToMru = function (messaging) {
      var orderNumber;
      messaging.forEach(function (message) {
         if (message.messagetxt.includes('Order#:')) {
            var match = /\d+/.exec(message.messagetxt);
            if (match[0]) {
               orderNumber = match[0];
            }
         }
      });

      var params = {
         orderno: orderNumber,
         ordersuf: 0,
         fldlist: 'rowpointer,orderno,ordersuf'
      };
      orderNumber += '-00';
      DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            MruService.addToList('OEOrder', data.rowpointer, orderNumber, data.orderno, data.ordersuf);
         }
      });
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
      previousWorkSheetNo = 0;
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

      // Create/Update the OE Order(s) Data
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
      var holdWorkSheetNo = record.worksheetno;

      var importRecordData = {
         oeimportdata: importRecord,
         iOrderNo: previousOrderNumber,
         iWorkSheetNo: previousWorkSheetNo
      };

      DataService.post('api/oe/asoeheader/oeimportupdate', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: importRecordData, busy: true }, function (data) {
         if (data) {

            // Display the Order Number and any Errors
            MessageService.processMessaging(data);

            // Pull Order# from the Message
            data.forEach(function (message) {
               if (message.messagetxt.includes('Order#:')) {
                  var match = /\d+/.exec(message.messagetxt);
                  if (match[0]) {
                     importOrderNumber = match[0];
                  }
               }
            });

            //User Hook (do not rename)
            if (self.oeImportUpdateContinue) {
               self.oeImportUpdateContinue(data);
            }

            // Add the newly created order(s) to the MRU
            if (importOrderNumber !== previousOrderNumber && importOrderNumber !== '') {
               self.getOrderAndAddToMru(data);
               previousOrderNumber = importOrderNumber;
            }

            previousWorkSheetNo = holdWorkSheetNo;
            self.importFinished(true);

         } else {
            self.importFinished(false);
         }
      });
   };

});

app.controller('OeetImportFromExcelDetailsCtrl', function ($state, $stateParams, $scope, DataService, MessageService) {
   // alias => ifeD
   var self = this;
   var ife = $scope.ife;

   self.isNationalProgramsOn = ife.isNationalProgramsOn;
   self.line = $stateParams.selectedLine;
   self.row = $stateParams.row;

   self.submit = function () {
      var importData = [];
      importData.push(self.line);
      DataService.post('api/oe/asoeheader/oeimportvalidate', { data: importData, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging) && data.oeimportdata[0]) {
               ife.importDataCollection[self.row] = data.oeimportdata[0];
               ife.grid.updateRow(self.row);

               $state.go('^');
            }
         }
      });
   };
});

app.controller('OeetOrderEntryDefaultsCtrl', function ($state, $scope, DataService, UserService, ModalService) {
   //alias => oed
   var self = this;
   var base = $scope.base;

   self.setDefaults = function (webSettings) {
      webSettings.forEach(function (webSetting) {
         switch (webSetting.settingname) {
            case 'DefaultWarehouse':
               if (webSetting.settingvalue) {
                  self.orderWarehouse = webSetting.settingvalue;
               }
               break;
            case 'DefaultOrderMode':
               if (webSetting.settingvalue) {
                  self.orderMode = webSetting.settingvalue;
               }
               break;
            case 'DefaultOrderType':
               if (webSetting.settingvalue) {
                  self.orderType = webSetting.settingvalue;
               }
               break;
            case 'OrderTypeRestricted':
               if (webSetting.settingvalue) {
                  self.orderRestrictType = webSetting.settingvalue;
               }
               break;
            case 'HideMarginInTotals':
               if (webSetting.settingvalue) {
                  self.orderHideMargin = webSetting.settingvalue;
               }
               break;
            case 'AltProdWorkflow':
               if (webSetting.settingvalue) {
                  self.workflowAltProd = webSetting.settingvalue;
               }
               break;
            case 'ValueAddWorkflow':
               if (webSetting.settingvalue) {
                  self.workflowValueAdd = webSetting.settingvalue;
               }
               break;
            case 'DefaultLineEntryMode':
               if (webSetting.settingvalue) {
                  self.workflowLineEntryMode = webSetting.settingvalue;
               }
               break;
            case 'LostBusinessWithQuote':
               if (webSetting.settingvalue) {
                  self.workflowLostBusinessWithQuote = webSetting.settingvalue.toLowerCase() === 'true';
               }
               break;
            case 'SkipMaintainHeaderFields':
               if (webSetting.settingvalue) {
                  self.workflowSkipMaintainHeader = webSetting.settingvalue === 'true';
               }
               break;
            case 'CheckNonStandProdsInEasyQuick':
               if (webSetting.settingvalue) {
                  self.workflowCheckNonStandProdsInEasyQuick = webSetting.settingvalue === 'true';
               }
               break;
            case 'DefaultLineType':
               if (webSetting.settingvalue) {
                  self.lineType = webSetting.settingvalue;
               }
               break;
            case 'EasyDefaultQuantity':
               if (webSetting.settingvalue) {
                  self.easyQuantity = webSetting.settingvalue;
               }
               break;
            case 'ShowIntlApproval':
               if (webSetting.settingvalue) {
                  self.otherIntlApproval = webSetting.settingvalue === 'true';
               }
               break;
            case 'SignatureCaptureEnabled':
               if (webSetting.settingvalue) {
                  self.otherSigCap = webSetting.settingvalue === 'true';
               }
               break;
            default:
               break;
         }
      });

      //once we've set all the settings that have been returned, set the ones that aren't already set
      if (!self.orderWarehouse) {
         self.orderWarehouse = 'Home';
      }
      if (!self.orderMode) {
         self.orderMode = 'a';
      }
      if (!self.orderType) {
         if (base.isFulfillmentTypeFirst && base.isOrderFulfillmentOn && base.isSASOFulfillmentOn) {
            self.orderType = 'of';
         } else {
            self.orderType = 'so';
         }
      }
      if (!self.workflowAltProd) {
         self.workflowAltProd = 'i';
      }
      if (!self.workflowValueAdd) {
         self.workflowValueAdd = 'N';
      }
      if (!self.lineEntryMode) {
         self.lineEntryMode = 'e';
      }
      if (!self.easyQuantity) {
         self.easyQuantity = 0;
      }
      // load session override, then SASO default if that is empty
      if (!self.deviceLocation) {
         self.deviceLocation = base.deviceLocation;
      }
      if (!self.deviceLocation) {
         self.deviceLocation = base.sasoo.devloc;
      }

   };

   //set the defaults
   self.setDefaults(base.defaultWebSettings);

   self.deviceLocationChanged = function () {
      if (self.deviceLocation) {
         var loadTableDataRequest = {
            sasttcodes: {
               codeid: 'DL',
               filename: 'A'
            },
            sasttsearchcriteria: {}
         };
         DataService.post('api/sa/assasetup/sasttloadtabledata', { data: loadTableDataRequest, busy: true }, function (loadData) {
            if (loadData) {
               var sasttMatch;
               loadData.forEach(function (sastt) {
                  if (sastt.codechar === self.deviceLocation) {
                     sasttMatch = sastt;
                  }
               });
               if (sasttMatch) {
                  DataService.post('api/sa/assasetup/sasttloadsasta', { data: sasttMatch, busy: true }, function (matchData) {
                     if (matchData) {
                        base.ipAddress = matchData.iPAddress;
                        base.deviceLocation = self.deviceLocation;
                     }
                  });
               }
            }
         });
      } else {
         base.ipAddress = '';
      }
   };

   self.saveFromModal = function (saveTo, user, profile) {
      var webSettings;
      switch (saveTo) {
         case 'u':
         default:
            webSettings = self.buildWebSettings(saveTo, user);
            break;
         case 'p':
            webSettings = self.buildWebSettings(saveTo, profile);
            break;
         case 'c':
            webSettings = self.buildWebSettings(saveTo);
            break;
      }
      DataService.post('api/shared/assharedentry/savewebsetting', { data: webSettings, busy: true }, function () {
         if (saveTo === 'u' && user === UserService.getUserName()) {
            base.defaultWebSettings = webSettings;
            base.setDefaultWebSettings();
         }
         self.destroyModal(true);
      });
   };

   self.loadFromModal = function (saveTo, user, profile) {
      var webSettingLoad = {
         functionname: 'OEET',
         screenname: 'DefaultsH5',
         settingname: ''
      };

      switch (saveTo) {
         case 'u':
         default:
            webSettingLoad.operator = user;
            break;
         case 'p':
            webSettingLoad.profile = profile;
            break;
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
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'DefaultWarehouse',
            settingvalue: self.orderWarehouse
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'DefaultOrderMode',
            settingvalue: self.orderMode
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'DefaultOrderType',
            settingvalue: self.orderType
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'OrderTypeRestricted',
            settingvalue: self.orderRestrictType
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'HideMarginInTotals',
            settingvalue: self.orderHideMargin
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'AltProdWorkflow',
            settingvalue: self.workflowAltProd
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'ValueAddWorkflow',
            settingvalue: self.workflowValueAdd
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'DefaultLineEntryMode',
            settingvalue: self.workflowLineEntryMode
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'LostBusinessWithQuote',
            settingvalue: self.workflowLostBusinessWithQuote
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'SkipMaintainHeaderFields',
            settingvalue: self.workflowSkipMaintainHeader ? 'true' : 'false'
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'CheckNonStandProdsInEasyQuick',
            settingvalue: self.workflowCheckNonStandProdsInEasyQuick ? 'true' : 'false'
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'DefaultLineType',
            settingvalue: self.lineType
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'EasyDefaultQuantity',
            settingvalue: self.easyQuantity
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'ShowIntlApproval',
            settingvalue: self.otherIntlApproval
         },
         {
            functionname: 'OEET',
            screenname: 'DefaultsH5',
            settingname: 'SignatureCaptureEnabled',
            settingvalue: self.otherSigCap
         }];

      webSettings.forEach(function (webSetting) {
         switch (type) {
            case 'u':
            default:
               webSetting.operator = value;
               break;
            case 'p':
               webSetting.profile = value;
               break;
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
      var webSettings = self.buildWebSettings('u', UserService.getUserName());
      DataService.post('api/shared/assharedentry/savewebsetting', { data: webSettings, busy: true }, function () {
         base.defaultWebSettings = webSettings;
         base.setDefaultWebSettings();
      });
   };

   self.load = function () {
      self.isLoadModal = true;
      ModalService.showModal('shared/transaction-defaults/save-load-defaults-modal.json', 'OrderEntrySaveLoadDefaultsModalCtrl as sldmCtrl', $scope, function (modal) {
         self.loadModal = modal;
      });
   };

   self.saveFor = function () {
      self.isSaveModal = true;
      ModalService.showModal('shared/transaction-defaults/save-load-defaults-modal.json', 'OrderEntrySaveLoadDefaultsModalCtrl as sldmCtrl', $scope, function (modal) {
         self.saveModal = modal;
      });
   };
});

app.controller('OrderEntrySaveLoadDefaultsModalCtrl', function ($state, $scope, $translate, UserService, PvUser) {
   // alias => sldmCtrl
   var self = this;
   var oed = $scope.oed;

   self.saveTo = 'u'; //u=user, p=profile, c=company
   self.saveType = 'c'; //c=current, o=other
   self.user = UserService.getUserName();
   self.profile = PvUser.webprofilename;
   self.company = UserService.getCono();

   if (oed.isLoadModal) {
      self.title = $translate.instant('global.load.settings');
      self.isSaveMode = false;
   } else if (oed.isSaveModal) {
      self.title = $translate.instant('global.save.settings');
      self.isSaveMode = true;
   }

   self.submit = function () {
      var user = self.saveType === 'c' ? UserService.getUserName() : self.user;
      var profile = self.saveType === 'c' ? PvUser.webprofilename : self.profile;
      if (self.isSaveMode) {
         oed.saveFromModal(self.saveTo, user, profile);
      } else {
         oed.loadFromModal(self.saveTo, user, profile);
      }
   };

   self.cancel = function () {
      oed.destroyModal(self.isSaveMode);
   };
});

app.controller('OeetEditCustomerShipToCtrl', function ($state, $stateParams, $scope, DataService, MessageService) {
   // alias => ecst
   var self = this;
   var base = $scope.base;

   var navBackState = '';
   if ($stateParams.returnScreen) {
      var index = $stateParams.returnScreen.indexOf('.');
      navBackState = $stateParams.returnScreen.substring(index);  
   }

   if ($stateParams.oehdr) {
      self.orderNumber = $stateParams.oehdr.orderno + '-' + $stateParams.oehdr.ordersuf;
      self.oehdr = $stateParams.oehdr;
      self.custpo = self.oehdr.custpo;
   }

   self.exitView = function () {
      if (navBackState) {
         $state.go(base.baseState + '.maintain',
            { orderno: self.oehdr.orderno, ordersuf: self.oehdr.ordersuf, navState: navBackState });
      } else {
         $state.go(base.baseState + '.initiate');
      }
   };

   self.orderNumberChanged = function(args) {
      if (args.value > 0) {
         self.orderNumber = args.value + '-' + args.value2;

         var headerRetrieveRequest = {
            orderno: args.value,
            ordersuf: args.value2,
            maintmode: false,
            updatetype: ''
         };
         DataService.post('api/oe/asoeheader/oeheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.oehdr = data.oehdr;
                  self.custpo = self.oehdr.custpo;
               }
            }
         });
      }
   };

   self.submit = function () {
      var reassignCustShipToRequest = {
         ttbloereassigncustnoshipto: {
            orderno: self.oehdr.orderno,
            ordersuf: self.oehdr.ordersuf,
            custpo: self.custpo,
            custno: self.newCustNo,
            shipto: self.newShipTo,
            repricelinesfl: self.reprice
         }
      };
      DataService.post('/web/api/oe/oereassigncustnoshipto', { data: reassignCustShipToRequest, busy: true }, function (data) {
         if (!data.ttbloereassigncustnoshipto.updterror) {
            if (data.ttbloereassigncustnoshipto.updtwarning) {
               MessageService.info('global.warning', data.ttbloereassigncustnoshipto.updtwarning);
            }

            MessageService.info('global.warning', 'message.please.make.any.needed.changes.to.customer.order');
            self.navBack();
         } else {
            MessageService.error('global.error', data.ttbloereassigncustnoshipto.updterror);
         }
      });
   };

   self.navBack = function() {
      //navigate back to the page you came from (if you came from inside an order)
      if (navBackState) {
         $state.go(base.baseState + '.maintain',
            { orderno: self.oehdr.orderno, ordersuf: self.oehdr.ordersuf, navState: navBackState });
      } else {
         self.reset();
      }
   };

   self.reset = function () {
      self.orderNumber = '';
      self.oehdr = {};
      self.newCustNo = '';
      self.newShipTo = '';
      self.reprice = false;
   };
});