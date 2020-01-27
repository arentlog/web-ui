'use strict';

app.controller('OeetAdvancedLineEntryReturnsCtrl', function ($scope, $state, $stateParams, $translate, Utils, Constants, DataService, MessageService, AuthService, MruService) {
   //alias => aleRet
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   var holdReturnInvoice = 0;
   var holdReturnInvSuf = 0;
   var holdReturnInvLine = 0;
   var holdReturnUnit = '';
   var holdReturnQtyOrd = 0;
   var serialClicked = false;
   var lotClicked = false;

   self.oereturn = {};

   self.retrieveReturn = function () {
      var validateRequest = {
         oeline: ale.oeline,
         lMaintMode: ale.isAddLineMode,
         cChangeList: Utils.deepCompare(ale.baseOeline, ale.oeline)
      };
      DataService.post('api/oe/asoeline/oelinevalidate', { data: validateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.cUpdateMessage && data.cUpdateMessage !== 'ok') {
                  MessageService.alert('global.alert', data.cUpdateMessage);
                  $state.go('^');
               } else {
                  Utils.replaceObject(ale.baseOeline, data.oeline);
                  Utils.replaceObject(ale.oeline, data.oeline);
                  ale.isLineValidated = true;

                  DataService.post('api/oe/asoeline/oereturnretrieve', { data: ale.oeline, busy: true }, function (data) {
                     if (data) {
                        if (!MessageService.processMessaging(data.mesagging)) {
                           Utils.replaceObject(self.oereturn, data.oereturn);

                           if ($stateParams.fromSourcing || ale.hasSourcingBeenAccessed) {
                              self.moveSourcingDataToOereturn(false);
                           }

                           self.originalRestockAmount = self.oereturn.restockamt;

                           if ($stateParams.returnOrderNumber) {
                              self.oereturn.retorderno = $stateParams.returnOrderNumber;

                              if ($stateParams.returnOrderSuffix) {
                                 self.oereturn.retordersuf = $stateParams.returnOrderSuffix;
                              }
                              if ($stateParams.returnOrderLineNumber) {
                                 self.oereturn.retlineno = $stateParams.returnOrderLineNumber;
                              }
                           }

                           holdReturnInvoice = self.oereturn.retorderno;
                           holdReturnInvSuf = self.oereturn.retordersuf;
                           holdReturnInvLine = self.oereturn.retlineno;
                           holdReturnUnit = self.oereturn.cUnit;
                           holdReturnQtyOrd = self.oereturn.dQtyOrd;
                        }
                     }
                  });

                  // In line change mode for core products we do not load the returns window or any of the popups
                  if ((ale.oeline.coreprodtype.toLowerCase() === 'c' || ale.oeline.coreprodtype.toLowerCase() === 'r') && ale.oeline.maintL.toLowerCase() === 'a') {
                     if (ale.oeline.coreprodtype.toLowerCase() === 'c') {
                        // Dirty Core Buy already selected - Do not pop window again
                        if (!ale.isCoreReturnCompleted) {
                           var coreReturnType = {
                              iOrderno: ale.oeline.orderno,
                              iOrdersuf: ale.oeline.ordersuf,
                              iLineno: ale.oeline.lineno,
                              dCustno: base.oehdr.custno,
                              cProd: ale.oeline.prod,
                              dQty: ale.oeline.qtyord * ale.oeline.implyqty,
                              cReturnTy: ale.oeline.returnty,
                              cTransType: base.oehdr.oetype,
                              cCoreRtnTy: "",
                              lWarrantyCore: false,
                              cVendClaimNo: "",
                              lUnavailable: false,
                              cReasUnAvTy: "",
                              cSubProd: ale.oeline.prod,
                              cCoreProductType: ""
                           };

                           $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreReturn', { coreReturnType: coreReturnType });
                        }
                     } else {
                        ale.oeline.origcore = ale.oeline.prod;
                     }
                  }

                  if (ale.oeline.promoprice && !ale.isCatalogProduct) {
                     ale.promoPricing();
                  } else {
                     ale.overridePricing();
                  }
               }
            } else {
               $state.go('^');
            }
         }
      });
   };

   self.moveSourcingDataToOereturn = function (useSavedOereturn) {
      if (useSavedOereturn) {
         //grab the oereturn we saved before we navigated to sourcing
         self.oereturn = ale.oereturnSaveForSourcing;
         //then delete it
         ale.oereturnSaveForSourcing = {};
      }

      //set vendor sourcing info on the oereturn
      self.oereturn.dVVendno = ale.lineTie.vendno;
      self.oereturn.cVShipfmno = ale.lineTie.shipfmno;
      self.oereturn.cVName = ale.lineTie.manualname;
      self.oereturn.cVAddr1 = ale.lineTie.manualaddr1;
      self.oereturn.cVAddr2 = ale.lineTie.manualaddr2;
      self.oereturn.cVAddr3 = ale.lineTie.manualaddr3;
      self.oereturn.cVCity = ale.lineTie.manualcity;
      self.oereturn.cVState = ale.lineTie.manualstate;
      self.oereturn.cVZipcd = ale.lineTie.manualzipcd;
      self.oereturn.lVFOBfl = ale.lineTie.fob;
      self.oereturn.lVConfirmfl = ale.lineTie.confirm;
      self.oereturn.cVShipviaty = ale.lineTie.poshipvia;
      self.oereturn.dVDuedt = ale.lineTie.poduedate;
      self.oereturn.lVPOWTIntfl = ale.lineTie.powtintfl;
      self.oereturn.cVOrderType = ale.lineTie.ordertype === 'n' ? '' : ale.lineTie.ordertype;
      self.oereturn.orderaltno = ale.lineTie.orderaltno !== 0 ? ale.lineTie.orderaltno : self.oereturn.orderaltno;
      self.oereturn.vCommentfl = ale.lineTie.copycommentfl;
   };

   if ($stateParams.fromSerialLot && $stateParams.returnObject) {
      self.oereturn = $stateParams.returnObject;
   } else if ($stateParams.fromSourcing) {
      self.moveSourcingDataToOereturn(true);
   } else {
      if ((ale.oeline.coreprodtype.toLowerCase() === 'c' || ale.oeline.coreprodtype.toLowerCase() === 'r') && ale.isAddLineMode) {
         if (ale.oeline.coreprodtype.toLowerCase() === 'c') {
            var coreReturnType = {
               iOrderno: ale.oeline.orderno,
               iOrdersuf: ale.oeline.ordersuf,
               iLineno: ale.oeline.lineno,
               dCustno: base.oehdr.custno,
               cProd: ale.oeline.prod,
               dQty: ale.oeline.qtyord * ale.oeline.implyqty,
               cReturnTy: ale.oeline.returnty,
               cTransType: base.oehdr.oetype,
               cCoreRtnTy: '',
               lWarrantyCore: false,
               cVendClaimNo: '',
               lUnavailable: false,
               cReasUnAvTy: '',
               cSubProd: ale.oeline.prod,
               cCoreProductType: ''
            };
            $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreReturn', { coreReturnType: coreReturnType });
         } else {
            ale.oeline.origcore = ale.oeline.prod;

            self.retrieveReturn();
         }
      } else if (ale.oeline.coreprodtype.toLowerCase() === 'c' && ale.oeline.maintL.toLowerCase() === 'c' &&
         (ale.oeline.corertnty.toUpperCase() === 'C' || ale.oeline.corertnty.toUpperCase() === 'S')) {
         // Change mode for a Dirty Core product that was a Core Return/Substitute goes to allocation view
         $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation', {
            coreReturnType: {
               cSubProd: ale.oeline.origcore,
               lWarrantyCore: false,
               cVendClaimNo: '',
               cCoreRtnTy: ale.oeline.corertnty,
               lUnavailable: false
            },
            isSubstitute: ale.oeline.corertnty.toLowerCase() === 's'
         });
      } else {
         self.retrieveReturn();
      }
   }

   self.isReturnFindInvoice = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.returns.findInvoice');
   };

   self.isReturnCore = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.returns.coreReturn');
   };

   self.isReturnAllocation = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation');
   };

   self.isInvoiceInfoVisible = function () {
      if (self.oereturn.retordernoenabled || self.oereturn.retordersufenabled || self.oereturn.retlinenoenabled || self.oereturn.retorderno) {
         return true;
      } else {
         return false;
      }
   };

   self.isPurchaseOrderInfoVisible = function () {
      if (self.oereturn.orderaltnoenabled || self.oereturn.btnsourcingenabled || self.oereturn.qtyunavailenabled || self.oereturn.reasunavtyenabled) {
         return true;
      } else {
         return false;
      }
   };

   self.returnReasonChanged = function () {
      DataService.post('api/oe/asoeline/oereturnloadreasonfields', { data: self.oereturn, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(self.oereturn, data.oereturn);
            }
         }
      });
   };

   self.returnOrderNoChanged = function () {
      // Load EHF values from original order
      if (self.oereturn.retorderno && self.oereturn.retlineno) {
         var params = {
            orderno: self.oereturn.retorderno,
            ordersuf: self.oereturn.retordersuf,
            lineno: self.oereturn.retlineno,
            fldlist: 'ehfaddonno,ehfamt,ehfexemptamt'
         };

         DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.oereturn.ehfaddonno = data.ehfaddonno;
               self.oereturn.ehfamt = data.ehfamt;
               self.oereturn.ehfexemptamt = data.ehfexemptamt;
            }
         });
      }
   };

   self.findInvoiceClicked = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.findInvoice');
   };

   self.sourcingClicked = function () {
      ale.setupLineTie(self.navigateToSourcing);
   };

   self.navigateToSourcing = function () {
      ale.oereturnSaveForSourcing = self.oereturn;

      $state.go(base.baseState + '.selectProducts.advancedLineEntry.sourcing', {
         oehdr: base.oehdr,
         tie: ale.lineTie,
         oeline: ale.oeline,
         orderTypes: 'ale.orderTypes',
         isLimitShipVia: ale.isSourcingLimitShipVia,
         sourceFieldChangedCallback: ale.sourcingFieldChangedCallback,
         cancelCallback: ale.setupLineTie,
         finishCallback: self.sourcingFinishCallback,
         backCallback: self.sourcingBackCallback,
         conoForIcWhseAvailCriteria: base.conoForIcWhseAvailCriteria,
         whseTypeForIcWhseAvailCriteria: base.whseTypeForIcWhseAvailCriteria
      });
   };

   self.sourcingBackCallback = function () {
      ale.sourcingBackCallback(true);
   };

   self.sourcingFinishCallback = function () {
      ale.sourcingFinishCallback(true);
   };

   self.serialsClicked = function () {

      serialClicked = true;
      lotClicked = false;

      // Changed Invoice# - Qty needs to be loaded before Serial screen
      if (holdReturnInvoice !== self.oereturn.retorderno ||
         holdReturnInvSuf !== self.oereturn.retordersuf ||
         holdReturnInvLine !== self.oereturn.retlineno ||
         holdReturnUnit !== self.oereturn.cUnit ||
         holdReturnQtyOrd !== self.oereturn.dQtyOrd) {

         // Validate the Invoice is OK to use and load Qty 
         self.returnDoneContinue(true);
      } else {
         self.runSerials();
      }
   };

   self.runSerials = function () {

      holdReturnInvoice = self.oereturn.retorderno;
      holdReturnInvSuf = self.oereturn.retordersuf;
      holdReturnInvLine = self.oereturn.retlineno;
      holdReturnUnit = self.oereturn.cUnit;
      holdReturnQtyOrd = self.oereturn.dQtyOrd;

      var serialcriteria = {
         ttbloeline: ale.oeline,
         ttbloereturn: self.oereturn
      };

      DataService.post('/web/api/oe/oereturnseriallotcopy', { data: serialcriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               $state.go('^.serials', {
                  fromReturns: true,
                  returnOrderNumber: self.oereturn.retorderno,
                  returnOrderSuffix: self.oereturn.retordersuf,
                  returnOrderLineNumber: self.oereturn.retlineno,
                  returnObject: self.oereturn,
                  returnSerialLot: data.ttblseriallot
               });
            }
         }
      });
   };

   self.lotsClicked = function () {

      serialClicked = false;
      lotClicked = true;

      // Changed Invoice# - Qty needs to be loaded before Lot screen
      if (holdReturnInvoice !== self.oereturn.retorderno ||
         holdReturnInvSuf !== self.oereturn.retordersuf ||
         holdReturnInvLine !== self.oereturn.retlineno ||
         holdReturnUnit !== self.oereturn.cUnit ||
         holdReturnQtyOrd !== self.oereturn.dQtyOrd) {

         // Validate the Invoice is OK to use and load Qty 
         self.returnDoneContinue(true);
      } else {
         self.runLots();
      }
   };

   self.runLots = function () {

      holdReturnInvoice = self.oereturn.retorderno;
      holdReturnInvSuf = self.oereturn.retordersuf;
      holdReturnInvLine = self.oereturn.retlineno;
      holdReturnUnit = self.oereturn.cUnit;
      holdReturnQtyOrd = self.oereturn.dQtyOrd;

      $state.go('^.lots', {
         fromReturns: true,
         returnOrderNumber: self.oereturn.retorderno,
         returnOrderSuffix: self.oereturn.retordersuf,
         returnOrderLineNumber: self.oereturn.retlineno,
         returnObject: self.oereturn
      });
   };

   self.submit = function () {
      if (base.oeetAuthInfo) {
         var reason;
         for (var i = 0; i < base.oeetAuthInfo.length; i++) {
            var currentSastaAuthInfo = base.oeetAuthInfo[i];
            if ((currentSastaAuthInfo.codeval === base.oehdr.crreasonty) || (currentSastaAuthInfo.codeval === self.oereturn.crreasonty) &&
               (currentSastaAuthInfo.reqauthfl === 'yes' || currentSastaAuthInfo.reqinvfl === 'yes')) {
               reason = currentSastaAuthInfo;
               break;
            }
         }
         if (reason) {
            if (reason.reqauthfl === 'yes') {
               AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'returns', 'reqauthfl', 'a', '', null, self.returnDoneContinue, function () {
                  //authfailed callback
                  self.oereturn.crreasonty = '';
               });
            } else if (reason.reqinvfl === 'yes' && !self.oereturn.retorderno) {
               AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'returns', 'reqinvfl', 'a', '', null, self.returnDoneContinue, function () {
                  //authfailed callback
                  self.oereturn.crreasonty = '';
               });
            } else {
               self.returnDoneContinue();
            }
         } else if (self.originalRestockAmount > self.oereturn.restockamt) {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'returns', 'restockcharge', '', '', null, self.returnDoneContinue, function () {
               //authfailed callback
               self.oereturn.restockamt = self.originalRestockAmount;
            });
         } else {
            self.returnDoneContinue();
         }
      }
   };

   self.returnProcessing = function () {
      //if we're returning to a PO, and the user hasn't manually set up the PO # or done it through the sourcing screen, then we need to force them to the sourcing screen
      if (self.oereturn.createpofl && !self.oereturn.orderaltno && !ale.hasSourcingBeenAccessed) {
         MessageService.info('global.warning', 'message.tie.to.po.has.been.checked.but.no.po.is.selected');
         self.sourcingClicked();
         return;
      }
      //if we're doing a Stock Order or Blanket Release and a warranty exchange, then check SWICSP and if it exists, prompt the user to include it in SRO setup
      if ((base.oehdr.oetype === 'so' || base.oehdr.oetype === 'br') && self.oereturn.warrexchgfl) {
         DataService.get('api/sw/swicsp/getbyprodwithstatusfl/' + ale.oeline.prod + '/o', { busy: true }, function (data) {
            if (data) {
               var messageText = $translate.instant('global.include') + ' ' + self.oereturn.cProd + ' ' + $translate.instant('question.in.service.repair.order.setup');
               MessageService.yesNo('global.question', messageText, function () {
                  //yes callback
                  self.oereturn.addswoptprodfl = true;
                  self.returnUpdate();
               }, function () {
                  //no callback
                  self.oereturn.addswoptprodfl = false;
                  self.returnUpdate();
               });
            } else {
               self.oereturn.addswoptprodfl = false;
               self.returnUpdate();
            }
         });
         return;
      }
      //if we're returning a Serial or Lot, see if they are allocated and prompt if not
      if (ale.oeline.nosnlots) {
         var messageText = ale.oeline.serlottype.toLowerCase() === 's' ? $translate.instant('message.the.current.line.has.unallocated.serials.allocate.now') : $translate.instant('message.the.current.line.has.unallocated.lots.allocate.now');
         MessageService.yesNo('global.outstanding.serials.lots', messageText, function () {
            //yes callback
            //figure out if its serials or lots and navigate there
            if (ale.oeline.serlottype.toLowerCase() === 'l') {
               self.lotsClicked();
            } else if (ale.oeline.serlottype.toLowerCase() === 's') {
               self.serialsClicked();
            }
         }, function () {
            //no callback
            self.returnUpdate();
         });
         return;
      }
      //default
      self.returnUpdate();
   };

   self.returnDoneContinue = function (loadSerialLot) {

      DataService.post('api/oe/asoeline/oereturnvalidate', { data: self.oereturn, busy: true }, function (data) {
         if (data) {
            var questionMessage = '';
            var isQuestion = false;
            var isError = false;
            var errorMessages = [];

            if (data.messaging.length) {
               data.messaging.forEach(function (message) {
                  if (message.messagetype === 'e') {
                     isError = true;
                     errorMessages.push(message);
                  } else if (message.messagetype === 'q') {
                     isQuestion = true;
                     questionMessage = message.messagetxt;
                  }
               });

               if (isError) {
                  MessageService.processMessaging(errorMessages);
                  return;
               } else if (!isQuestion) {
                  MessageService.processMessaging(data.messaging);
               }
            }
            self.oereturn = data.oereturn;

            // Validating for Serial/Lot Processing - Skip Return Processing and Questions
            if (!loadSerialLot) {
               if (isQuestion) {
                  MessageService.yesNo('global.question', questionMessage, function () {
                     self.returnProcessing();
                  });
               }
               else {
                  self.returnProcessing();
               }
            } else {
               // Serial/Lot Invoice Validated - Load Invoice Data
               ale.oeline.stkqtyord = data.oereturn.dQtyOrd * data.oereturn.dConv;
               ale.oeline.qtyord = data.oereturn.dQtyOrd;
               ale.oeline.unit = data.oereturn.cUnit;
               ale.oeline.unitconv = data.oereturn.dConv;
               ale.oeline.stkqtyship = ale.oeline.stkqtyord;
               ale.oeline.qtyship = ale.oeline.qtyord;

               if (serialClicked) {
                  self.runSerials();
               } else {
                  self.runLots();
               }
            }
         }
      });
   };

   self.returnUpdate = function () {
      if (ale.oeline.coreprodtype.toLowerCase() === 'r' && ale.oeline.maintL.toLowerCase() === 'a' && !ale.oeline.corertnty) {
         // Assign core return type for Reman core in line add mode
         var coreReturnType = {
            iOrderno: ale.oeline.orderno,
            iOrdersuf: ale.oeline.ordersuf,
            iLineno: ale.oeline.lineno,
            dCustno: base.oehdr.custno,
            cProd: ale.oeline.prod,
            dQty: self.oereturn.dQtyOrd * self.oereturn.dConv * ale.oeline.implyqty,
            cReturnTy: self.oereturn.returntype,
            cTransType: base.oehdr.oetype,
            cCoreRtnTy: "",
            lWarrantyCore: false,
            cVendClaimNo: "",
            lUnavailable: false,
            cReasUnAvTy: "",
            cSubProd: ale.oeline.prod,
            cCoreProductType: ""
         };

         $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreReturn', { coreReturnType: coreReturnType });
      } else {
         self.returnUpdateContinue();
      }
   };

   self.returnUpdateContinue = function () {

      // Note: This update is also in child-states lotControlDone and SerialsControlDone. If this changes
      // then it should also be changed there.
      var retrunUpdateRequest = {
         oeline: ale.oeline,
         oereturn: self.oereturn
      };
      DataService.post('api/oe/asoeline/oereturnupdate', { data: retrunUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.addPurchaseOrderToMRU(data.messaging);
               switch (data.oeline.maintL.toLowerCase()) {
                  case 'a':
                     if (data.oeline.retforceserlot && data.oeline.retforcelinelist) {
                        base.forceSerLotLineList = data.oeline.retforcelinelist;
                     }

                     $state.go('^');
                     ale.resetLine();

                     // If using AvaTax, don't calculate taxes on each line add
                     // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
                     if (base.taxMethodType.toLowerCase() === 'a') {
                        base.calcsob = 'x';
                     } else {
                        base.calcsob = 'o';
                     }

                     base.updateLineItems(ale.initializeLine, null, 'addSingle', data.oeline.lineno);
                     ale.view.applyAutoFocus();
                     break;
                  case 'c':
                     Utils.replaceObject(ale.oeline, data.oeline);
                     $state.go('^');
                     ale.validateLine();
                     break;
               }
            }
         }
      });
   };

   self.addPurchaseOrderToMRU = function (messaging) {
      if (messaging && messaging.length) {
         messaging.forEach(function (message) {
            var poNumber;
            if (message.messagetxt.includes('Purchase Order #')) {
               var pomatch = /\d+/.exec(message.messagetxt);
               if (pomatch[0]) {
                  poNumber = pomatch[0];

                  var getPoehParams = {
                     pono: poNumber,
                     posuf: 0,
                     fldlist: 'rowpointer,pono,posuf'
                  };
                  poNumber += '-00';
                  DataService.get('api/po/poeh/getbypk', { params: getPoehParams }, function (data) {
                     if (data) {
                        MruService.addToList('POOrder', data.rowpointer, poNumber, data.pono, data.posuf);
                     }
                  });
               }
            }
         });
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryReturnsFindInvoiceCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService, GridService, MessageService) {
   //alias => aleFi
   // this controller is shared between the Corrections and Returns screen. They use the same .json, but have different controllers to handle functionality differntly.
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   var aleRet = $scope.aleRet;

   self.isQtyEditableSetting = !$stateParams.isCorrectionTab;
   self.title = $translate.instant('global.returns');
   self.subTitle = $translate.instant('global.orders.containing.product') + ' ' + ale.oeline.prod;
   self.returnInvoiceCollection = [];

   var returnInvoiceListCriteria = {
      custno: base.oehdr.custno,
      shipto: base.oehdr.shipto,
      specnstype: ale.oeline.specnstype,
      prod: ale.oeline.prod
   };
   DataService.post('api/oe/asoeline/oereturnbuildinvoicelist', { data: returnInvoiceListCriteria, busy: true }, function (data) {
      if (data) {
         Utils.replaceArray(self.returnInvoiceCollection, data);
      }
   });

   self.isQtyEditable = function () {
      return self.isQtyEditableSetting;
   };

   self.submit = function () {
      var selectedRecord = GridService.getSelectedRecord(self.returnInvoiceGrid);
      if (selectedRecord) {
         var rowsToSelect = self.returnInvoiceCollection.filter(function (row) {
            return row.orderno === selectedRecord.orderno &&
               row.ordersuf === selectedRecord.ordersuf &&
               row.lineno === selectedRecord.lineno;
         });

         if (rowsToSelect) {
            //NOTE:  Even though this is a collection, we expect only one row from the UI.  The backend
            //expects a collection, even though it will trap for only allowing one row to be selected and
            //processed.
            rowsToSelect.forEach(function (row) {
               row.selectfl = true;
            });

            var returnSelectInvoiceRequest = {
               oereturninvoicelistresults: rowsToSelect,
               oereturn: aleRet.oereturn,
               oereturninvoicelistcriteria: {}
            };
            DataService.post('api/oe/asoeline/oereturnselectinvoice', { data: returnSelectInvoiceRequest, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(aleRet.oereturn, data);

                  $state.go('^');
               }
            });
         } else {
            MessageService.alert('global.alert', 'message.no.record.selected');
         }
      } else {
         MessageService.alert('global.alert', 'message.no.record.selected');
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryReturnsCoreCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService, MessageService, AuthService) {
   //alias => aleRc
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   var aleRet = $scope.aleRet;

   self.coreReturnType = $stateParams.coreReturnType;

   DataService.post('api/oe/asoelineextra/corereturntypeinit', { data: self.coreReturnType, busy: true }, function (data) {
      if (data) {
         Utils.replaceObject(self.coreReturnType, data);

         self.coreReturnType.cSubProd = '';

         if (self.coreReturnType.cCoreProductType.toLowerCase() === 'reman') {
            self.rsLabel = $translate.instant('global.core.allocation');
            self.isSubstituteVisible = false;
         } else {
            self.rsLabel = $translate.instant('global.core.return');
            self.isSubstituteVisible = true;
         }
      }
   });

   self.returnTypeChanged = function () {
      DataService.post('api/oe/asoelineextra/corereturntypechangetype', { data: self.coreReturnType, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.coreReturnType, data);
         }
      });
   };

   self.warrantyCoreChanged = function () {
      self.coreReturnType.reasunavtyenabled = self.coreReturnType.lUnavailable;
   };

   self.returnToUnavailableChanged = function () {
      self.coreReturnType.vendclaimnoenabled = self.coreReturnType.lWarrantyCore;
   };

   self.submit = function () {
      DataService.post('api/oe/asoelineextra/corereturntypeupdate', { data: self.coreReturnType, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.coreReturnType = data.corereturntype;

               if (!self.coreReturnType.cCoreRtnTy) {
                  return;
               }

               //reman core processing
               if (ale.oeline.coreprodtype.toLowerCase() === 'r') {
                  //core allocation
                  if (self.coreReturnType.cCoreRtnTy.toLowerCase() === 'c' && aleRet.oereturn.retorderno && aleRet.oereturn.retlineno) {
                     var coreReturnAutoAllocate = {
                        mOrderNo: ale.oeline.orderno,
                        mOrdersuf: ale.oeline.ordersuf,
                        mCurrentLineno: ale.oeline.lineno,
                        cCoreType: self.coreReturnType.cCoreRtnTy,
                        iRetOrderNo: aleRet.oereturn.retorderno,
                        iRetOrdersuf: aleRet.oereturn.retordersuf,
                        iRetLineNo: aleRet.oereturn.retlineno,
                        cCallMode: aleRet.oereturn.cCallMode,
                        cProd: ale.oeline.prod,
                        mCustno: base.oehdr.custno,
                        dStkQtyOrd: aleRet.oereturn.dQtyOrd * aleRet.oereturn.dConv,
                        iImplyQty: ale.oeline.implyqty,
                        speccostty: ale.oeline.speccostty,
                        csunperstk: ale.oeline.csunperstk
                     };
                     DataService.post('api/oe/asoelineextra/corereturnautoallocate', { data: coreReturnAutoAllocate, busy: true }, function (data) {
                        if (data) {
                           aleRet.oereturn.cCoreRtnTy = self.coreReturnType.cCoreRtnTy;
                           ale.oeline.corertnty = self.coreReturnType.cCoreRtnTy;
                           ale.oeline.stkqtyord = aleRet.oereturn.dQtyOrd * aleRet.oereturn.dConv;

                           $state.go('^');
                           aleRet.returnUpdateContinue();
                        } else {
                           MessageService.yesNo('global.question', 'question.auto.allocation.cannot.be.performed.based.on.original', function () {
                              //yes callback
                              $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation', {
                                 coreReturnType: self.coreReturnType,
                                 isSubstitute: false
                              });
                           }, null);
                        }
                     });
                  } else if (self.coreReturnType.cCoreRtnTy.toLowerCase() === 'u') {
                     //core buy authorization
                     AuthService.createAuthPoint('oeet', '', 'Core Buy', '', '', null, function () {
                        //auth passed callback
                        if (aleRet.oereturn.returntype.toLowerCase() === 'vendor' && (aleRet.oereturn.createpofl || aleRet.oereturn.orderaltno)) {
                           MessageService.error('global.error', 'error.vendor.return.type.tied.to.po.not.allowed.on.core');
                        } else {
                           aleRet.oereturn.cCoreRtnTy = self.coreReturnType.cCoreRtnTy;
                           ale.oeline.corertnty = self.coreReturnType.cCoreRtnTy;
                           ale.oeline.stkqtyord = aleRet.oereturn.dQtyOrd * aleRet.oereturn.dConv;

                           $state.go('^');
                           aleRet.returnUpdateContinue();
                        }
                     }, null);
                  } else if (self.coreReturnType.cCoreRtnTy.toLowerCase() === 'c') {
                     $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation', {
                        coreReturnType: self.coreReturnType,
                        isSubstitute: false
                     });
                  }
               } else {
                  //dirty core processing
                  ale.oeline.corertnty = self.coreReturnType.cCoreRtnTy;
                  ale.oeline.origcore = ale.oeline.prod;

                  if (self.coreReturnType.lUnavailable) {
                     ale.oeline.reasunavty = self.coreReturnType.cReasUnAvTy;
                  }

                  switch (self.coreReturnType.cCoreRtnTy.toLowerCase()) {
                     case 'c':
                        $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation', {
                           coreReturnType: self.coreReturnType,
                           isSubstitute: false
                        });
                        break;
                     case 's':
                        $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation', {
                           coreReturnType: self.coreReturnType,
                           isSubstitute: true
                        });
                        break;
                     case 'u':
                        //core buy authorization
                        AuthService.createAuthPoint('oeet', '', 'Core Buy', '', '', null, function () {
                           //auth passed callback
                           DataService.post('api/oe/asoeline/oereturnretrieve', { data: ale.oeline, busy: true }, function (data) {
                              if (data) {
                                 if (!MessageService.processMessaging(data.mesagging)) {
                                    Utils.replaceObject(aleRet.oereturn, data.oereturn);
                                    aleRet.originalRestockAmount = aleRet.oereturn.restockamt;

                                    $state.go('^');
                                 }
                              }
                           });
                        }, null);
                        break;
                  }
               }
            }
         }
      });
   };

   self.back = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry');
   };
});

app.controller('OeetAdvancedLineEntryReturnsCoreAllocationCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService, GridService, MessageService) {
   //alias => aleRca
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   var aleRet = $scope.aleRet;

   var isSubstitute = $stateParams.isSubstitute;

   self.coreReturnType = $stateParams.coreReturnType;
   self.sortButtonLabel = $translate.instant('global.expired.cores');
   self.single = {};
   self.results = [];
   self.criteria = {
      iOrderno: base.oehdr.orderno,
      iOrdersuf: base.oehdr.ordersuf,
      iLineno: ale.oeline.lineno,
      cProd: isSubstitute ? self.coreReturnType.cSubProd : ale.oeline.prod,
      dCustno: base.oehdr.custno,
      dCSUnPerStk: ale.oeline.csunperstk,
      cSpecCostTy: ale.oeline.speccostty,
      cMaintModeL: ale.oeline.maintL,
      cWhse: base.oehdr.whse,
      cCallMode: aleRet.oereturn.cCallMode,
      cTransType: base.oehdr.oetype,
      lSub: isSubstitute,
      iRepOrdNo: 0,
      iRepOrdSuf: 0,
      iRepLineNo: 0,
      lWarrantyCore: self.coreReturnType.lWarrantyCore,
      cVendClaimNo: self.coreReturnType.cVendClaimNo,
      corertnty: self.coreReturnType.cCoreRtnTy,
      warrantycd: '',
      coreunavailfl: self.coreReturnType.lUnavailable,
      lKitFl: ale.oeline.kitfl,
      dPrice: ale.oeline.price,
      dProdcost: ale.oeline.scrnprodcost,
      dQtyUnavail: ale.oeline.qtyunavail,
      cSerLotType: ale.oeline.serlottype,
      cSpecNSType: ale.oeline.specnstype,
      lCoreChgFl: ale.oeline.corechgfl,
      cAltWhse: ale.oeline.altwhse,
      dQtyOrd: ale.oeline.qtyord,
      dQtyShip: ale.oeline.qtyship,
      dStkQtyOrd: ale.oeline.stkqtyord,
      dStkQtyShip: ale.oeline.stkqtyship,
      cUnit: ale.oeline.unit,
      cOrigCore: ale.oeline.origcore,
      cShipProd: ale.oeline.prod,
      iImplyQty: ale.oeline.implyqty,
      cReasUnavTy: ale.oeline.reasunavty
   };

   DataService.post('api/oe/asoelineextra/coreallocationload', { data: self.criteria, busy: true }, function (data) {
      if (data) {
         Utils.replaceObject(self.criteria, data.coreallocationcriteria);
         Utils.replaceObject(self.single, data.coreallocationsingle);
         Utils.replaceArray(self.results, data.coreallocationresults);
      }
   });

   self.isReturnAllocationForceSerials = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation.forceSerials');
   };

   self.sortClicked = function () {
      //we dont have filtering on SoHo grids yet
      //when we do, we need to sort and show only orders where the coreduedt is BEFORE or AFTER the current date
      MessageService.alert('global.alert', 'Sorting is not yet available on this grid.');

      //sort the grid accordingly, then flip the label
      if (self.sortButtonLabel === $translate.instant('global.expired.cores')) {
         //show only orders with coreduedt BEFORE today
         self.sortButtonLabel = $translate.instant('global.unexpired.cores');
      } else {
         //show only orders with coreduedt AFTER today
         self.sortButtonLabel = $translate.instant('global.expired.cores');
      }
   };

   self.selectDeselectClicked = function () {
      var selectedRecord = GridService.getSelectedRecord(self.grid);

      if (selectedRecord) {
         if (self.criteria.cCallMode.toLowerCase() === 'i') {
            return;
         }

         // search for an existing order allocation
         var coreAllocations = new JSLINQ(self.results).Where(function (coreAllocation) { return coreAllocation.modifyfl && coreAllocation.qtyalloc; }) || [];
         var allocatedRecord = coreAllocations.items[0];
         if (allocatedRecord) {
            if (selectedRecord.orderno !== allocatedRecord.orderno ||
               selectedRecord.ordersuf !== allocatedRecord.ordersuf ||
               selectedRecord.lineno !== allocatedRecord.lineno ||
               selectedRecord.invoicefl !== allocatedRecord.invoicefl ||
               selectedRecord.shipdt !== allocatedRecord.shipdt ||
               selectedRecord.coreduedt !== allocatedRecord.coreduedt) {
               MessageService.error('global.error', 'message.so.that.a.price.can.be.assigned.it.is.necessary');
               return;
            }
         }
         if (self.single.iRetLineno && (
            selectedRecord.orderno !== self.single.iRetOrderno ||
            selectedRecord.ordersuf !== self.single.iRetOrdersuf ||
            selectedRecord.lineno !== self.single.iRetLineno)) {
            MessageService.error('global.error', 'message.return.is.tied.to.price.cost.of.original.invoice');
            return;
         }

         //sas-10/20/16 - SXWEB-18899 - needed to remove this because we cant sort on grids yet, which means this doesn't work
         // we also removed the button from the view and the condition from the Select/Deselect button. See revision (found on JIRA) for details.
         //if (self.sortButtonLabel !== $translate.instant('global.expired.cores')) {
         if (selectedRecord.qtyalloc > 0) {
            self.single.proof += selectedRecord.qtyalloc;
            selectedRecord.qtyalloc = 0;
            selectedRecord.modifyfl = true;
         } else if (self.single.proof > 0) {
            var newQtyAlloc;
            if ((selectedRecord.qty - selectedRecord.qtyalloc) > self.single.proof) {
               newQtyAlloc = self.single.proof;
            } else {
               newQtyAlloc = selectedRecord.qty - selectedRecord.qtyalloc;
            }
            selectedRecord.qtyalloc = newQtyAlloc;
            selectedRecord.modifyfl = true;
            self.single.proof -= selectedRecord.qtyalloc;
         }

         var indexToUpdate = self.results.indexOf(selectedRecord);
         self.grid.updateRow(indexToUpdate);
         //}
      }
   };

   self.submit = function () {
      var coreAllocationUpdateRequest = {
         coreallocationresults: self.results,
         coreallocationcriteria: self.criteria,
         coreallocationsingle: self.single
      };
      DataService.post('api/oe/asoelineextra/coreallocationupdate', { data: coreAllocationUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging) && data.coreallocationupdate) {
               if (data.coreallocationupdate.forceserials) {
                  var product = self.criteria.lSub || !!self.criteria.cOrigCore ? self.criteria.cShipProd : self.criteria.cOrigCore;
                  var coreSerialsCriteria = {
                     cOurProc: 'oeet',
                     cType: 'o',
                     iOrderno: self.criteria.iOrderno,
                     iOrdersuf: self.criteria.iOrdersuf,
                     iLineno: self.criteria.iLineno,
                     cProd: product,
                     dQty: self.criteria.dStkQtyOrd,
                     cWhse: self.criteria.cWhse,
                     iReporderno: self.criteria.iRepOrdNo,
                     iRepordersuf: self.criteria.iRepOrdSuf,
                     iReplineno: self.criteria.iRepLineNo,
                     dCustno: self.criteria.dCustno,
                     dPrice: self.criteria.dPrice,
                     dProdcost: self.criteria.dProdcost,
                     iRetorderno: self.single.iRetOrderno,
                     iRetordersuf: self.single.iRetOrdersuf,
                     iRetlineno: self.single.iRetLineno,
                     warrantycore: self.criteria.lWarrantyCore,
                     vendclaimno: self.criteria.cVendClaimNo
                  };
                  $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns.coreAllocation.forceSerials', { coreSerialsCriteria: coreSerialsCriteria });
               } else if (data.coreallocationupdate.proofok) {
                  // reman core processing
                  if (ale.oeline.coreprodtype === 'r') {
                     aleRet.oereturn.cCoreRtnTy = self.coreReturnType.cCoreRtnTy;
                     ale.oeline.corertnty = self.coreReturnType.cCoreRtnTy;
                     ale.oeline.stkqtyord = aleRet.oereturn.dQtyOrd * aleRet.oereturn.dConv;

                     $state.go('^');
                     aleRet.returnUpdateContinue();
                  } else {
                     // dirty core processing - line is added from allocation.  get ready for next line
                     $state.go(base.baseState + '.selectProducts.advancedLineEntry');

                     // If using AvaTax, don't calculate taxes on each line add
                     // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
                     if (base.taxMethodType.toLowerCase() === 'a') {
                        base.calcsob = 'x';
                     } else {
                        base.calcsob = 'o';
                     }

                     base.updateLineItems(null, null, 'addSingle', ale.oeline.lineno);
                     ale.clearLineAndReset(false);
                  }
               }
            }
         }
      });
   };

   self.back = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry');
   };
});

app.controller('OeetAdvancedLineEntryReturnsCoreAllocationForceSerialsCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService, ModalService, GridService, MessageService) {
   //alias => aleRcaFs
   var self = this;

   self.coreSerialsCriteria = $stateParams.coreSerialsCriteria;
   self.coreSerialsCollection = [];
   self.serialNumber = '';

   DataService.post('api/oe/asoelineextra/coreserialsload', { data: self.coreSerialsCriteria, busy: true }, function (data) {
      if (data) {
         Utils.replaceObject(self.coreSerialsCriteria, data.coreserialscriteria);
         Utils.replaceArray(self.coreSerialsCollection, data.coreserialsresults);
      }
   });

   self.addClicked = function () {
      ModalService.showModal('oe/oeet/select-products/line-entry-child-states/returns/new-serial.json', null, $scope, function (modal) {
         self.newSerialModal = modal;
      });
   };

   self.addSerialOkClicked = function () {
      var coreSerialsAddRequest = {
         coreserialsresults: self.coreSerialsCollection,
         coreserialscriteria: self.coreSerialsCriteria,
         cSerialNo: self.serialNumber
      };
      DataService.post('api/oe/asoelineextra/coreserialsadd', { data: coreSerialsAddRequest, busy: true }, function (data) {
         if (data) {
            self.serialNumber = '';

            Utils.replaceObject(self.coreSerialsCriteria, data.coreserialscriteria);
            Utils.replaceArray(self.coreSerialsCollection, data.coreserialsresults);

            self.newSerialModal.destroy();
         }
      });
   };

   self.addSerialCancelClicked = function () {
      self.newSerialModal.destroy();
   };

   self.deleteClicked = function () {
      var selectedRecord = GridService.getSelectedRecord(self.grid);

      if (selectedRecord) {
         if (selectedRecord.serialno) {
            var coreSerialsDeleteRequest = {
               coreserialsresults: self.coreSerialsCollection,
               coreserialscriteria: self.coreSerialsCriteria,
               cSerialNo: selectedRecord.serialno
            };
            DataService.post('api/oe/asoelineextra/coreserialsdelete', { data: coreSerialsDeleteRequest, busy: true }, function (data) {
               if (data) {
                  self.serialNumber = '';

                  Utils.replaceObject(self.coreSerialsCriteria, data.coreserialscriteria);
                  Utils.replaceArray(self.coreSerialsCollection, data.coreserialsresults);
               }
            });
         }
      } else {
         MessageService.error('global.error', 'message.please.select.a.row.to.be.deleted');
      }
   };

   self.submit = function () {
      if (self.coreSerialsCriteria.proof === 0) {
         $state.go('^');
      } else {
         MessageService.error('global.error', 'error.proof.amount.must.be.zero.to.finish');
      }
   };

   self.back = function () {
      if (self.coreSerialsCollection && self.coreSerialsCollection.length > 0) {
         MessageService.error('global.error', 'global.serial.numbers.must.be.deallocated.first');
      } else {
         $state.go('^');
      }
   };
});