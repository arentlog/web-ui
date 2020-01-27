'use strict';

app.controller('OeetCopyCtrl', function ($state, $scope, $translate, DataService, MessageService, GridService, AodataService, ModalService, AuthService, Utils, Constants, Sasoo) {
   // alias => copy
   var self = this;
   var base = $scope.base;
   var duplicateCustPoRequired = AodataService.getValue('OE', 'OEDupCustPo');
   var fulfillmentOrdNo = 0;
   var fulfillmentOrdSuf = 0;

   self.copyType = 's';
   self.copyOrder = {};
   self.previousCopyTransType = '';
   self.listOrder = {};
   self.useAllLines = true;
   self.copyOrderList = [];
   self.duplicateCustomerPoOrders = [];
   self.initialload = true;

   // Check if Order Fulfillment is turned on and operator can use it (na = Not Allowed)
   self.isOrderFulfillmentOn = AodataService.getValue("OE", "OEOrderFulfillment").toLowerCase() === 'yes';
   self.isSASOFulfillmentOn = Sasoo.allowfulfillmentty.toLowerCase() !== 'na';

   self.isAOSalesWhseOn = AodataService.getValue("OE", "OESalesWarehouse").toLowerCase() === 'yes';
   self.isSASOSalesWhseOn = Sasoo.oesaleswhsety.toLowerCase() === 'yes';

   self.copyInitialize = function () {
      DataService.get('api/oe/asoeheader/oeordercopyinitialize', { busy: true }, function (initializeData) {
         if (initializeData) {
            self.copyOrder = initializeData;

            if (!self.copyOrder.lPDLevel1Fl) {
               //remove "pd" from transaction types
               var newTransTypes = [];
               self.transactionTypes.forEach(function (transType) {
                  if (transType.transtype !== 'pd') {
                     newTransTypes.push(transType);
                  }
               });
               self.transactionTypes = newTransTypes;
            }

            //User Hook (do not rename)
            if (self.copyInitializeContinue) {
               self.copyInitializeContinue();
            }

            //User Hook (do not rename)
            if (self.oeOrderCopyInitializeContinue) {
               self.oeOrderCopyInitializeContinue(initializeData);
            }
         }
      });
   };

   DataService.get('api/oe/asoeheader/loadoetranstypes/true', { busy: true }, function (transTypeData) {
      if (transTypeData) {
         //remove standing order and correction types
         var transTypes = [];
         transTypeData.loadoetranstypes.forEach(function (transType) {
            if (transType.transtype !== 'st' && transType.transtype !== 'cr') {
               transTypes.push(transType);
            }
         });
         //add price/discounting type
         transTypes.push({ transtype: 'pd', transtypedesc: $translate.instant('global.pricing.discounting') });

         self.transactionTypes = transTypes;

         self.copyInitialize();
      }
   });

   self.isCopy = function () {
      return $state.is(base.baseState + '.copy');
   };

   self.isCopyOrderSelected = function () {
      if (self.copyOrder.orderno || self.copyOrderList.length > 0) {
         return true;
      } else {
         return false;
      }
   };

   self.copyTypeChanged = function () {
      if (self.copyType === 'm') {
         self.listCopyOrderFocused = true;
         self.copyOrderFocused = false;
      } else {
         self.copyOrderFocused = true;
         self.listCopyOrderFocused = false;
      }
   }

   self.copyOrderNumberChanged = function (args) {
      if (self.copyOrder.ordernoenabled) {
         var params = {
            fillmode: true
         };
         DataService.get('api/oe/oeeh/getbyrowpointer/' + args.rowPointer, { params: params, busy: false }, function (data) {
            if (data) {
               self.copyOrder.orderno = data.orderno;
               self.copyOrder.ordersuf = data.ordersuf;
               self.copyOrder.custno = data.custno;
               self.copyOrder.custpo = data.custpo;
               self.copyOrder.transtype = data.transtype;
               self.copyOrder.stage = data.stagecd;
               self.copyOrder.refer = data.refer;
               self.copyOrder.promisedt = data.promisedt;
               self.copyOrder.oefulfillmentordfl = data.fulfillmentordfl;
               self.copyOrder.oefulfillmenttiedfl = data.fulfillmenttiedfl;
               self.copyOrder.saleswhse = data.saleswhse;
               if (data.arsces) {
                  self.copyOrder.custname = data.arsces.name;
               }
               //clear message when a new copy is started
               self.copyCompleteMessage = '';

               //User Hook (do not rename)
               if (self.copyOrderNumberChangedContinue) {
                  self.copyOrderNumberChangedContinue(data);
               }
            }
         });
      }
   };

   self.typeChanged = function () {
      self.copyOrder.reasonenabled = self.copyOrder.type === 'rm';
      self.copyOrder.reasonhidden = self.copyOrder.type !== 'rm';
      self.copyOrder.pdscmessagehidden = self.copyOrder.type !== 'pd';

      if (self.copyOrder.type === 'pd') {
         self.resetCopyOrder(false);
         self.copyOrder.btnordlistenabled = false;
      } else if (self.previousCopyTransType === 'pd') {
         self.copyOrder.btnordlistenabled = true;
         self.copyOrder.btnrevisionenabled = true;
      }

      self.previousCopyTransType = self.copyOrder.type;
   };

   self.resetCopyOrder = function () {
      if (self.copyType === 'm') {
         self.copyOrder.btnrevisionenabled = false;
         self.copyOrder.lOrdListFl = true;

         self.listOrder.transtype = '';
      } else {
         self.copyOrderList = [];
         self.copyOrder.btnrevisionenabled = true;
         self.copyOrder.lOrdListFl = false;
      }
      //clear message when a new copy is started
      self.copyCompleteMessage = '';
   };

   self.copyOrderNumberListChanged = function (args) {
      self.listCopyOrderFocused = false;

      var params = {
         fldlist: 'orderno,ordersuf,custno,custpo,transtype,stagecd,refer,arsces,promisedt,fulfillmentordfl,fulfillmenttiedfl,saleswhse'
      };
      DataService.get('api/oe/oeeh/getbyrowpointer/' + args.rowPointer, { params: params, busy: false }, function (data) {
         if (data) {
            self.listOrder.orderno = data.orderno;
            self.listOrder.ordersuf = data.ordersuf;
            self.listOrder.custno = data.custno;
            self.listOrder.custpo = data.custpo;
            self.listOrder.transtype = data.transtype;
            self.listOrder.stage = data.stagecd;
            self.listOrder.refer = data.refer;
            self.listOrder.promisedt = data.promisedt;
            self.listOrder.oefulfillmentordfl = data.fulfillmentordfl;
            self.listOrder.oefulfillmenttiedfl = data.fulfillmenttiedfl;
            self.listOrder.saleswhse = data.saleswhse;
            if (data.arsces) {
               self.listOrder.custname = data.arsces.name;
            }
         }
      });
   };

   self.addOrderToList = function () {
      var copyAddOrderRequest = {
         oeordercopyorderlist: self.copyOrderList,
         oeordercopyaddorder: {
            orderno: self.listOrder.orderno,
            ordersuf: self.listOrder.ordersuf,
            beglineno: self.useAllLines ? 0 : self.listBeginLineNo,
            endlineno: self.useAllLines ? 0 : self.listEndLineNo
         }
      };
      DataService.post('api/oe/asoeheader/oeordercopyaddorder', { data: copyAddOrderRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.copyOrderList = data.oeordercopyorderlist;
               self.listOrder = {};
               self.listOrderNumber = '';
               self.resetCopyOrder(true);
               self.listCopyOrderFocused = true;
            }
         }
      });
   };

   self.removeOrder = function () {
      var selectedRows = GridService.getSelectedRecords(self.listCopyGrid);
      selectedRows.forEach(function (selectedRow) {
         var selectedIndex = self.copyOrderList.indexOf(selectedRow);
         self.copyOrderList.splice(selectedIndex, 1);
      });
   };

   self.clearAllOrders = function () {
      MessageService.yesNo('global.confirmation', 'question.clear.all.orders', function () {
         //yes callback
         self.copyOrderList = [];
      }, null);
   };

   self.newRevision = function () {
      DataService.get('api/oe/asoeheader/createquoterevision/' + self.copyOrder.orderno + '/' + self.copyOrder.ordersuf, { busy: true }, function (data) {
         MessageService.processMessaging(data);
      });
   };

   self.clear = function () {
      self.copyType = 's';
      self.copyOrder = {};
      self.previousCopyTransType = '';
      self.listOrder = {};
      self.useAllLines = true;
      self.copyOrderList = [];
      self.copyOrderNumber = '';

      self.copyInitialize();
   };

   self.continue = function () {
      self.initialload = true;

      self.duplicateCustPOCheck();

      if (!base.dupcustpocheckfl) {
         if (self.copyOrder.reason && self.copyOrder.type === 'pd') {
            self.checkAuthPoints();
         } else {
            self.copyContinue();
         }
      }
   };

   self.checkAuthPoints = function () {
      if (self.copyOrder.reason) {
         if (base.oeetAuthInfo) {
            var reason;
            for (var i = 0; i < base.oeetAuthInfo.length; i++) {
               var currentSastaAuthInfo = base.oeetAuthInfo[i];
               if (currentSastaAuthInfo.codeval === self.copyOrder.reason &&
                  (currentSastaAuthInfo.reqauthfl === 'yes' || currentSastaAuthInfo.reqinvfl === 'yes')) {
                  reason = currentSastaAuthInfo;
                  break;
               }
            }
            if (reason) {
               if (reason.reqauthfl === 'yes') {
                  AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'returns', 'reqauthfl', 'a', '', null, self.copyContinue, function () {
                     //failed callback
                     self.copyOrder.reason = '';
                  });
               } else if (reason.reqinvfl === 'yes') {
                  AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'returns', 'reqinvfl', 'a', '', null, self.copyContinue, function () {
                     //failed callback
                     self.copyOrder.reason = '';
                  });
               } else {
                  self.copyContinue();
               }
            } else {
               self.copyContinue();
            }
         } else {
            self.copyContinue();
         }
      } else if (self.copyOrder.type === 'pd' && self.copyOrder.trasntype === 'qu') {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'copy', 'convert to', '', 'pd', null, self.copyContinue, function () {
            //failed callback
            self.copyOrder.reason = '';
         });
      } else {
         self.copyContinue();
      }
   };

   self.copyContinue = function () {

      // Order Fulfillment
      self.copyOrder.fulfillmentordfl = false;
      if (self.copyOrder.type.toLowerCase() === 'of') {
         self.copyOrder.fulfillmentordfl = true;
         self.copyOrder.type = 'bl';
      }

      var continueRequest = {
         oeordercopyorderlist: self.copyOrderList,
         oeordercopy: self.copyOrder
      };
      DataService.post('api/oe/asoeheader/oeordercopycontinue', { data: continueRequest, busy: true }, function (continueData) {
         if (continueData) {
            if (!MessageService.processMessaging(continueData.messaging)) {
               if (self.copyOrder.type === 'pd') {
                  DataService.get('api/oe/asoeheader/oeordercopypdinitialize/' + self.copyOrder.orderno + '/' + self.copyOrder.ordersuf, { busy: false }, function (data) {
                     if (data) {
                        self.copyOrderPricing = data;

                        $state.go('.pdQuote');
                     }
                  });
               } else {
                  self.copyOrder = continueData.oeordercopy;
                  self.copyOrderList = continueData.oeordercopyorderlist;
                  self.copyOrderLineList = continueData.oeordercopylinelist;

                  var params = {
                     orderno: self.copyOrder.orderno,
                     ordersuf: self.copyOrder.ordersuf
                  };
                  DataService.get('api/oe/oeehqp/getbypk', { params: params, busy: false }, function (quoteData) {
                     if (quoteData) {
                        self.quoteRecordsFound = true;
                     }
                  });

                  if (self.copyOrder.type === 'rm') {
                     self.autoApplyCreditInvoiceFl = AodataService.getValue('OE', 'OEAutoApplyCreditInvoiceFl');
                     if (self.autoApplyCreditInvoiceFl) {
                        if (self.autoApplyCreditInvoiceFl === 'yes') {
                           self.copyOrder.autoapplycreditfl = true;
                        } else if (self.autoApplyCreditInvoiceFl === 'no') {
                           self.copyOrder.autoapplycreditfl = false;
                        }
                     } else {
                        self.copyOrder.autoapplycreditfl = true;
                     }
                  }

                  if (self.copyOrder.type === 'bl' && !self.copyOrder.fulfillmentordfl) {
                     ModalService.showModal('oe/oeet/initiate/copy/lump-sum-modal.json', 'OeetCopyLumpSumModalCtrl as copyLsm', $scope, function (modal) {
                        self.blanketOrderModal = modal;
                     });
                  } else {
                     $state.go('.newOrderInfo');
                  }
               }
            }
         }
      });
   };

   self.duplicateCustPOCheck = function () {
      base.dupcustpocheckfl = false;
      if (self.copyOrder.custpo && base.sasc.oedupfl &&
         self.copyOrder.transtype !== 'rm' && self.copyOrder.transtype !== 'cr') {
         base.dupcustpocheckfl = true;
         if (duplicateCustPoRequired === 'w') {
            var dupCustPoCriteria = {
               custno: self.copyOrder.custno,
               custpo: self.copyOrder.custpo,
               transtype: self.copyOrder.transtype,
               orderno: 0,
               ordersuf: 0
            };
            DataService.post('api/oe/asoeentry/oeetdupcustpogetlist', { data: dupCustPoCriteria, busy: true }, function (data) {
               if (data && data.length) {
                  Utils.replaceArray(self.duplicateCustomerPoOrders, data);
                  ModalService.showModal('oe/oeet/initiate/copy/duplicate-customer-po-copy.json', 'OeetDuplicatePoCopyModalCtrl as dcpo', $scope, function (modal) {
                     self.duplicatePoModal = modal;
                  });
               } else {
                  if (self.copyOrder.reason) {
                     if (self.initialload === true) {
                        self.checkAuthPoints();
                     }
                  } else {
                     if (self.initialload === true) {
                        self.copyContinue();
                     }
                  }
               }
            });
         } else {
            if (self.copyOrder.reason || (self.copyOrder.type === 'qu' || self.copyOrder.type === 'pd')) {
               self.checkAuthPoints();
            } else {
               if (self.initialload === true) {
                  self.copyContinue();
               }
            }
         }
      }
   }

   self.leaveCustPO = function () {
      self.initialload = false;
      self.duplicateCustPOCheck();
   }

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

   self.receiveOnAccount = function () {
      $state.go(base.baseState + '.receiveOnAccount');
   };

   self.counterSalesShipping = function () {
      $state.go(base.baseState + '.counterSalesShipping');
   };

   self.maintainPo = function () {
      $state.go(base.baseState + '.maintainPO');
   };

   self.billingOrders = function () {
      $state.go(base.baseState + '.billingOrders');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.orderEntryDefaultsClicked = function () {
      $state.go(base.baseState + '.initiate.orderEntryDefaults');
   };

   self.orderFulfillmentClicked = function () {

      if (self.copyType === 'm') {
         fulfillmentOrdNo = self.listOrder.orderno;
         fulfillmentOrdSuf = self.listOrder.ordersuf;
      } else {
         fulfillmentOrdNo = self.copyOrder.orderno;
         fulfillmentOrdSuf = self.copyOrder.ordersuf;
      }

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

app.controller('OeetCopyPricingDicsountingQuoteCtrl', function ($state, $scope, DataService, MessageService) {
   // alias => copyPdq
   var self = this;
   var copy = $scope.copy;

   self.submit = function () {

      //User Hook (do not rename)
      if (self.setOEOrderCopyPdUpdateCriteria) {
         self.setOEOrderCopyPdUpdateCriteria();
      }

      DataService.post('api/oe/asoeheader/oeordercopypdupdate', { data: copy.copyOrderPricing, busy: true }, function (data) {
         MessageService.processMessaging(data);

         $state.go('^');
         copy.clear();
      });
   };
});

app.controller('OeetCopyLumpSumModalCtrl', function ($state, $scope, DataService, MessageService) {
   // alias => copyLsm
   var self = this;
   var copy = $scope.copy;

   self.submit = function () {
      if (copy.copyOrder.dLumpBillAmt && !copy.copyOrder.lLumpBillFl) {
         MessageService.yesNo('global.warning', 'question.lump.sum.entered.do.you.wish.to.select.lump.sum.billing', function () {
            //yes callback
            copy.copyOrder.lLumpBillFl = true;
            self.cancel();
         }, function () {
            //no callback
            copy.copyOrder.lLumpBillFl = true;
            self.cancel();
         });
      } else {
         self.cancel();
      }
   };

   self.cancel = function () {
      copy.blanketOrderModal.destroy();

      $state.go('.newOrderInfo');
   };
});

app.controller('OeetCopyNewOrderInfoCtrl', function ($state, $scope, $translate, DataService, MessageService, ModalService, Constants, Utils, MruService) {
   // alias => copyNoi
   var self = this;
   var base = $scope.base;
   var copy = $scope.copy;

   self.isNewOrderInfo = function () {
      return $state.is(base.baseState + '.copy.newOrderInfo');
   };

   self.validationFieldChange = function () {
      DataService.post('api/oe/asoeheader/oeordercopyleavecustshipto', { data: copy.copyOrder, busy: true }, function (data) {
         if (data) {
            copy.copyOrder = data;

            //If the Shipto is set, make sure to validate/clear and reset the new value
            //to reflect the other customer # changed.
            if (copy.copyOrder.shipto) {
               var requestCriteria = {
                  custno: copy.copyOrder.custno,
                  shipto: copy.copyOrder.shipto,
                  fldlist: 'shipto'
               };

               copy.copyOrder.shipto = ' ';
               DataService.get('api/ar/arss/getbypk', { params: requestCriteria, busy: true }, function (shiptoData) {
                  if (shiptoData) {
                     copy.copyOrder.shipto = shiptoData.shipto;
                     //User Hook (do not rename)
                     if (self.oeOrderCopyArssContinue) {
                        self.oeOrderCopyArssContinue(shiptoData);
                     }
                  }
               });
            }
            //User Hook (do not rename)
            if (self.validationFieldChangeContinue) {
               self.validationFieldChangeContinue(data);
            }
         }
      });
   };

   self.saveOriginalChanged = function () {
      copy.copyOrder.btnselectlinesenabled = copy.copyOrder.savefl;
   };

   self.copyEdiChanged = function () {
      copy.copyOrder.btnselectlinesenabled = copy.copyOrder.copyedi;
   };

   self.selectLines = function () {
      $state.go('.selectLines');
   };

   self.sourcingClicked = function () {
      var lineTieTypeCriteria = {
         runmode: 'banner',
         ourproc: Constants.MENU_FUNCTION_OEET
      };
      DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (data) {
         if (data) {
            self.orderTypes = base.getOrderTypesFromTieDropdownData(data);
            self.copyTie = { ordertypeenabled: true, ordertype: 'a' };

            $state.go('.sourcing', {
               oehdr: base.oehdr,
               tie: self.copyTie,
               orderTypes: 'copyNoi.orderTypes',
               isWhseAvailGridVisible: false,
               isLimitShipVia: false,
               sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
               cancelCallback: self.sourcingDoneCallback,
               finishCallback: self.sourcingDoneCallback,
               backCallback: self.sourcingDoneCallback,
               conoForIcWhseAvailCriteria: base.conoForIcWhseAvailCriteria,
               whseTypeForIcWhseAvailCriteria: base.whseTypeForIcWhseAvailCriteria
            });
         }
      });
      self.isSourcingVisited = true;
   };

   self.sourcingFieldChangedCallback = function (fieldName) {
      var tieLeaveFieldRequest = {
         oeline: {},
         oelinelinetie: self.copyTie,
         oelinelinetiehdr: { runmode: 'banner' },
         cFieldName: fieldName
      };
      DataService.post('api/oe/asoeline/oelinelinetieleavefield', { data: tieLeaveFieldRequest, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data.messaging);

            Utils.replaceObject(self.copyTie, data.oelinelinetie);
         }
      });
   };

   self.sourcingDoneCallback = function () {
      $state.go('^');
   };

   self.submit = function () {
      if (copy.copyOrder.cOrigTransType.toLowerCase() === 'qu' &&
         copy.copyOrder.type !== 'qu' &&
         copy.copyOrder.type !== 'pd' &&
         !copy.copyOrder.savefl && copy.quoteRecordsFound) {
         var message = $translate.instant('message.quote.pricing.records.exist.and.save.original.quote') +
            '<br>' +
            $translate.instant('question.records.will.be.removed.after.converting.continue');
         MessageService.yesNo('global.warning', message, self.copyValidate, null);
      } else if (copy.copyOrder.type === 'do') {
         if (!self.isSourcingVisited) {
            self.sourcingClicked();
            return;
         }

         if (self.copyTie) {
            copy.copyOrder.mDOConfirmFl = self.copyTie.confirm;
            copy.copyOrder.mDOCono = self.copyTie.wtcono;
            copy.copyOrder.mDODueDt = self.copyTie.ordertype === 't' ? self.copyTie.wtduedate : self.copyTie.poduedate;
            copy.copyOrder.mDOFOBFl = self.copyTie.fob;
            copy.copyOrder.mDOShipFmNo = self.copyTie.shipfmno;
            copy.copyOrder.mDOShipViaTy = self.copyTie.ordertype === 't' ? self.copyTie.wtshipvia : self.copyTie.poshipvia;
            copy.copyOrder.mDOType = self.copyTie.ordertype;
            copy.copyOrder.mDOVendNo = self.copyTie.vendno;
            copy.copyOrder.mDOWhse = self.copyTie.wtwhse;
         }

         self.copyValidate();
      } else {
         self.copyValidate();
      }
   };

   self.copyValidate = function () {
      var copyValidateRequest = {
         oeordercopylinelist: copy.copyOrderLineList,
         oeordercopyorderlist: copy.copyOrderList,
         oeordercopy: copy.copyOrder
      };
      DataService.post('api/oe/asoeheader/oeordercopyvalidate', { data: copyValidateRequest, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            if (copy.copyOrder.fpcustno) {
               ModalService.showModal('oe/oeet/initiate/copy/floorplan-modal.json', 'OeetCopyFloorplanModalCtrl as copyFm', $scope, function (modal) {
                  self.floorplanModal = modal;
               });
            } else {
               self.checkForFabWhseOrders();
            }
         }
      });
   };

   self.checkForFabWhseOrders = function () {
      self.fabWhseLineList = [];
      copy.copyOrderLineList.forEach(function (lineToCopy) {
         if (lineToCopy.copyfl && lineToCopy.bodtransferty.toLowerCase() === 't') {
            self.fabWhseLineList.push(lineToCopy);
         }
      });

      self.processFabWhseOrders();
   };

   self.processFabWhseOrders = function () {
      if (self.fabWhseLineList.length > 0) {
         var fabWhseOrder = self.fabWhseLineList[0];
         var copyFabWhse = {
            orderno: fabWhseOrder.orderno,
            ordersuf: fabWhseOrder.ordersuf,
            lineno: fabWhseOrder.lineno,
            shipprod: fabWhseOrder.shipprod,
            fabwhse: fabWhseOrder.bodfabwhse,
            whse: copy.copyOrder.whse,
            towhse: copy.copyOrder.whse,
            fabwhsemethod: copy.copyOrder.fabwhsemethod,
            origtranstype: copy.copyOrder.mTransType,
            botype: fabWhseOrder.botype
         };
         DataService.post('api/oe/asoeheader/oeordercopyfabwhseinit', { data: copyFabWhse, busy: true }, function (data) {
            if (data) {
               if (data.launchscreenfl) {
                  $state.go('.fabWhse', { fabWhse: data });
               } else {
                  self.removeFabWhseOrderAndRecheck(fabWhseOrder);
               }
            }
         });
      } else {
         self.copyUpdate();
      }
   };

   self.removeFabWhseLineAndRecheck = function (fabWhseLineToRemove) {
      var indexToRemove = -1;
      self.fabWhseLineList.forEach(function (fabWhseLine, index) {
         if (fabWhseLine.orderno === fabWhseLineToRemove.orderno &&
            fabWhseLine.ordersuf === fabWhseLineToRemove.ordersuf &&
            fabWhseLine.lineno === fabWhseLineToRemove.lineno) {
            indexToRemove = index;
         }
      });
      self.fabWhseLineList.splice(indexToRemove, 1);
      self.processFabWhseOrders();
   };

   //User Hook (do not rename)
   self.oeOrderCopyUpdateAssignMessage = function (data) {
      copy.copyCompleteMessage = $translate.instant('global.copy.completed.successfully') + ' ' +
         $translate.instant('global.new.order.number') + ': ' + copy.copyOrder.neworderno + '.';
   };

   self.copyUpdate = function () {
      var copyUpdateRequest = {
         oeordercopylinelist: copy.copyOrderLineList,
         oeordercopyorderlist: copy.copyOrderList,
         oeordercopy: copy.copyOrder
      };
      DataService.post('api/oe/asoeheader/oeordercopyupdate', { data: copyUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               var params = { fldlist: 'rowpointer,orderno,ordersuf' };
               DataService.get('api/oe/oeeh/getbyrowid/' + data.oeordercopy.neworderrowid, { params: params }, function (data) {
                  var label = data.orderno + '-' + Utils.pad(data.ordersuf, 2);
                  MruService.addToList('OEOrder', data.rowpointer, label, data.orderno, data.ordersuf);
               });

               copy.copyOrder = data.oeordercopy;

               //User Hook (do not rename)
               self.oeOrderCopyUpdateAssignMessage(data);

               $state.go('^');
               copy.clear();

               //User Hook (do not rename)
               if (self.oeOrderCopyUpdateContinue) {
                  self.oeOrderCopyUpdateContinue(data);
               }
            }
         }
      });
   };

   self.cancel = function () {
      $state.go('^');
      copy.clear();
   };
});

app.controller('OeetCopyNewOrderInfoSelectLinesCtrl', function ($state, $scope, DataService) {
   // alias => noiSl
   var self = this;
   var copy = $scope.copy;

   self.convertDLines = function () {
      DataService.post('api/oe/asoeheader/oeordercopylinesconvert', { data: copy.copyOrderLineList, busy: true }, function (data) {
         if (data) {
            copy.copyOrderLineList = data;
         }
      });
   };

   self.setCopyStatus = function (status) {
      copy.copyOrderLineList.forEach(function (row, indx) {
         row.copyfl = status;
         copy.copyOrderLinesGrid.updateRow(indx);
      });
   };
});

app.controller('OeetCopyFloorplanModalCtrl', function ($state, $scope) {
   // alias => copyFm
   var self = this;
   var copy = $scope.copy;
   var copyNoi = $scope.copyNoi;

   self.submit = function () {
      if (!copy.isFloorPlan) {
         copy.copyOrder.fpcustno = 0;
      } else if (!copy.copyOrder.fpcustno) {
         //keep the user in the popup since they selected floor plan but didnt pick a customer
         return;
      }
      if (copyNoi.floorplanModal) {
         copyNoi.floorplanModal.destroy();
      }
      copyNoi.checkForFabWhseOrders();
   };

   self.cancel = function () {
      copyNoi.floorplanModal.destroy();

      $state.go('^');
   };
});

app.controller('OeetCopyNewOrderInfoFabWarehouseCtrl', function ($state, $stateParams, $scope, DataService) {
   // alias => noiFw
   var self = this;
   var copy = $scope.copy;
   var copyNoi = $scope.copyNoi;

   self.fabWhse = $stateParams.fabWhse;

   self.submit = function () {
      DataService.post('api/oe/asoeheader/oeordercopyfabwhsevalidate', { data: self.fabWhse, busy: true }, function (data) {
         //copy fab whse data to original order
         copy.copyOrderLineList.forEach(function (copyOrder) {
            if (copyOrder.orderno === self.fabWhse.orderno &&
               copyOrder.ordersuf === self.fabWhse.ordersuf &&
               copyOrder.lineno === self.fabWhse.lineno) {
               copyOrder.bodfabwhse = self.fabWhse.fabwhse;
               copyOrder.bodshipviaty = self.fabWhse.shipviaty;
               copyOrder.verno = self.fabWhse.verno;
               if (self.fabWhse.directorderfl) {
                  copyOrder.botype = 'd';
               }
            }
         });

         self.cancel();
      });
   };

   self.cancel = function () {
      copyNoi.removeFabWhseLineAndRecheck($stateParams.fabWhse);
      $state.go('^');
   };
});

app.controller('OeetDuplicatePoCopyModalCtrl', function ($scope, $translate) {
   var self = this;
   var base = $scope.base;
   var copy = $scope.copy;

   self.messageAboveGrid = function () {
      return $translate.instant('message.the.following.orders.with.the.same.customer.po') + copy.copyOrder.custpo + $translate.instant('message.parenthesis.have.been.found');
   };

   self.messageBelowGrid = function () {
      return $translate.instant('question.proceed.with.duplicate.customer.purchase.order.num');
   };

   self.navigateToOrder = function (e, args) {
      var order = args[0].item;
      base.navToOrderInquiry(order.orderno, order.ordersuf);
      copy.duplicatePoModal.destroy();
   };

   self.ok = function () {
      if (copy.initialload === true) {
         copy.copyContinue();
      }
      copy.duplicatePoModal.destroy();
   };

   self.cancel = function () {
      copy.copyOrder.custpo = "";
      copy.duplicatePoModal.destroy();
   };
});