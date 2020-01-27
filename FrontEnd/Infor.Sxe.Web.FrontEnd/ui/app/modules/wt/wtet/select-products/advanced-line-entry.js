'use strict';

//This is called from the Detailed List drilldown to maintain line information.  This give the user access to all
//other line features such as Nonstock Entry, Serial, Lots, etc...
//Alias: ale
app.controller('WtetAdvancedLineEntryCtrl', function ($scope, $state, $stateParams, $translate, SecurityService, DataService, MessageService, UserService, AuthService, AodataService, Utils, Sasoo, Sasc, Constants) {
   var self = this;
   var base = $scope.base;

   self.baseWtline = {};
   self.wtline = {};
   self.lineNonstock = {};
   self.lineNonstockHeader = {};
   self.assemblyCollection = [];
   self.lineTie = {};
   self.isAddLineMode = !$stateParams.lineNo;
   self.isLineValidated = false;
   self.wlwhsechgfl = (base.wthdr.wlwhsefl && base.wthdr.stagecd >= 2 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
   self.taxInterfaceType = AodataService.getValue('TAX', 'TaxInterfaceTy');
   self.requireWTSerials = AodataService.getValue('IC', 'iCReqWTSerialFl');
   self.wtlnties = [];
   self.wtlntiesOrig = [];
   self.isDescriptionVisible = false;
   self.firstNonStockInitialize = false;
   self.currwtlineNonStock = {};
   self.addMode = false;
   self.isFromEditLines = $stateParams.fromEditLines;
   self.editLinesActivePage = $stateParams.activePage;

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(base.MENU_FUNCTION_WTET);

   self.isLineEntry = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry');
   };

   self.isSerials = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.serials');
   };

   self.isLots = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.lots');
   };

   self.isNonStock = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.nonStock');
   };

   self.isWarehouseManager = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.bin-allocation');
   };

   self.isTies = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.ties');
   };

   self.isComments = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.comments');
   };

   self.isCrossReference = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.crossReference');
   };

   self.setIsDescriptionVisible = function () {
      self.isDescriptionVisible = false;
      if (self.wtline && self.wtline.nonstockty) {
         if (self.wtline.nonstockty.toLowerCase() === base.NONSTOCKTYPE_NONSTOCK) {
            self.isDescriptionVisible = true;
         }
      }
   };

   self.clearCancelButtonText = function () {
      if (self.isAddLineMode) {
         return $translate.instant('global.clear');
      } else {
         return $translate.instant('global.cancel');
      }
   };

   self.initializeLine = function () {
      self.wtlnties = [];

      var wtlineInitializeCriteria = {
         maintmode: true,
         wtno: base.wthdr.wtno,
         wtsuf: base.wthdr.wtsuf,
         processtype: base.PROCESSTYPE_START,
         secure: self.operatorMenuSecurity
      };

      DataService.post('api/wt/aswtline/wtlineinitialize', { data: wtlineInitializeCriteria, busy: true }, function (data) {
         if (data) {
            data.wlwhsechgfl = (base.wthdr.wlwhsefl && base.wthdr.stagecd >= 2 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
            Utils.replaceObject(self.baseWtline, data.wtline);
            Utils.replaceObject(self.wtline, data.wtline);

            self.baseWtline.nonstockty = base.defaultLineType;
            self.wtline.nonstockty = base.defaultLineType;

            self.isLineValidated = true;
            self.view.applyAutoFocus();
         }
      });
   };

   self.getLineForEditing = function (lineRetrieveCriteria) {
      DataService.post('api/wt/aswtline/wtlineretrieve', { data: lineRetrieveCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging) /*|| restrictionErrorMessages.items.length > 0*/) {
            if (data.wtline) {
               data.wtline.wlwhsechgfl = base.whseLogStatus ? base.whseLogStatus.wlwhsechgfl : true;
               Utils.replaceObject(self.baseWtline, data.wtline);
               Utils.replaceObject(self.wtline, data.wtline);
               self.isLineValidated = true;

               //User Hook (do not rename)
               if (self.wtLineRetrieveContinue) {
                  self.wtLineRetrieveContinue(self.wtline);
               }

               if (data.wtlnties && data.wtlnties.length > 0) {
                  data.wtlnties.forEach(function (result) {
                     result.owtcono = result.wtcono;
                     result.oordertype = result.ordertype;
                     result.oorderaltno = result.orderaltno;
                     result.oorderaltsuf = result.orderaltsuf;
                     result.olinealtno = result.linealtno;
                     result.oseqaltno = result.seqaltno;
                  });
               }

               self.wtlnties = data.wtlnties;
               //Save off original collection so it can be used when the user Clears lines.  We need the
               //original list to help us rebuild the collection for update / clear.
               self.wtlntiesOrig = data.wtlnties;

               if (self.wtline.nonstockty.toLowerCase() === 'n') {
                  self.wtline.nonstkdataok = true;
               }
            }

            //User Hook (do not rename)
            if (self.getLineForEditingContinue) {
               self.getLineForEditingContinue();
            }

         } else {
            $state.go('^');
         }
      });
   };


   self.wtLineInitialCheckAuthPassed = function () {
      self.wtline.restrictovrfl = true;
      self.wtline.restricterrmess = '';
   };

   self.wtLineInitialCheckAuthFailed = function () {
      self.wtline.restrictovrfl = false;
   };

   // First time in here
   if ($stateParams.lineNo) {
      self.addMode = false;
      self.setIsDescriptionVisible();
      self.firstNonStockInitialize = true;

      var lineRetrieveCriteria = {
         lineno: $stateParams.lineNo,
         maintmode: base.isAddOrderMode,
         wtno: base.wthdr.wtno,
         wtsuf: base.wthdr.wtsuf,
         readonlyfl: false,
         secure: self.operatorMenuSecurity
      };
      self.getLineForEditing(lineRetrieveCriteria);
   } else {
      self.addMode = true;
      self.firstNonStockInitialize = false;
      self.setIsDescriptionVisible();

      var wtLineInitializeCriteria = {
         maintmode: true,
         wtno: base.wthdr.wtno,
         wtsuf: base.wthdr.wtsuf,
         processtype: base.PROCESSTYPE_START,
         secure: self.operatorMenuSecurity
      };
      DataService.post('api/wt/aswtline/wtlineinitialize', { data: wtLineInitializeCriteria, busy: true }, function (data) {
         if (data) {
            data.wlwhsechgfl = (base.wthdr.wlwhsefl && base.wthdr.stagecd >= 2 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
            Utils.replaceObject(self.baseWtline, data.wtline);
            Utils.replaceObject(self.wtline, data.wtline);

            self.baseWtline.nonstockty = base.defaultLineType;
            self.wtline.nonstockty = base.defaultLineType;

            // If Transfer Order Default line item type = "s", set up for a non-stock
            if (self.wtline.nonstockty.toLowerCase() === 'n') {
               self.setIsDescriptionVisible();

               self.firstNonStockInitialize = true;
               self.wtline.nonstkdataok = true;
            }

            if ($stateParams.qtyord) {
               self.wtline.qtyord = $stateParams.qtyord;
            }

            if ($stateParams.unit) {
               self.wtline.unit = $stateParams.unit;
            }

            if ($stateParams.product) {
               self.wtline.prod = $stateParams.product;

               var criteria = {
                  QueryText: self.wtline.prod,
                  LookupParameter: 'icsw',
                  ProductType: ['icsw', 'icsp'],
                  FacetQuery: {
                     whse: [base.wthdr.shipfmwhse]
                  }
               };

               DataService.post(Constants.SEARCH_PATH, { data: criteria, errorFunction: 'advancedlineentry-wt' }, function (data) {
                  if (data) {
                     data = Utils.processData(criteria, data);
                     //if there's an exact match on the product, then validate the line
                     if (data.hits[0].prod.toLowerCase() === self.wtline.prod.toLowerCase()) {
                        var lineCriteriaNotNeeded = {};
                        var wtlineValidateRequest = {
                           wtlnties: self.wtlnties,
                           wtline: self.wtline,
                           cMaintMode: true,
                           wtlinecriteria: lineCriteriaNotNeeded,
                           cChangeList: 'prod,' //NOTE:  The ending comma on this field list is necessary and very important.
                        };
                        if ($stateParams.qtyord) {
                           wtlineValidateRequest.cChangeList = wtlineValidateRequest.cChangeList + 'qtyord,';
                        }
                        if ($stateParams.unit) {
                           wtlineValidateRequest.cChangeList = wtlineValidateRequest.cChangeList + 'unit,';
                        }

                        //User Hook (do not rename)
                        self.setWTLineCriteria(wtlineValidateRequest.wtline);

                        DataService.post('api/wt/aswtline/wtlinevalidate', { data: wtlineValidateRequest, busy: true }, function (data) {
                           if (data) {
                              if (data.messaging) {
                                 MessageService.processMessaging(data.messaging);
                              }

                              Utils.replaceObject(self.baseWtline, data.wtline);
                              Utils.replaceObject(self.wtline, data.wtline);
                              self.isLineValidated = true;

                              //User Hook (do not rename)
                              self.wtLineValidateContinue(self.wtline);

                              if (data.wtline.restrictovrfl && data.wtline.restricterrmess && data.wtline.restricterrmess.length > 0) {
                                 self.wtline = data.wtline;
                                 MessageService.info('global.information', data.wtline.restricterrmess);

                                 AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'lines', 'restrictovrfl', '', '', null, self.wtLineInitialCheckAuthPassed, self.wtLineInitialCheckAuthFailed);
                                 return;
                              }
                           }
                        });
                     }
                  }
               });
            } else {
               self.isLineValidated = true;
            }
         }
      });
   }

   self.navToProduct = function () {
      $state.go('icip.detail', { pk: self.wtline.prod, pk2: base.wthdr.shipfmwhse });
   };

   self.navToQuantityOrdered = function () {
      $state.go('icia.detail', { pk: self.wtline.prod, pk2: base.wthdr.shipfmwhse }, { reload: 'icia.detail' });
   };

   self.productSelected = function (args) {
      if (self.baseWtline.prod !== self.wtline.prod) {
         if (args.value4 && args.value4 !== '<empty>') {
            self.wtline.xrefprodty = args.value4.toLowerCase();
         }
         if (args.value3) {
            self.wtline.reqprod = args.value3;
            // Cross Reference Handling
            if (self.wtline.xrefprodty.toLowerCase() === 'b') {
               var icsecExistsCriteria = { //create search criteria for exists (by type, prod, and altprod)
                  rectype: self.wtline.xrefprodty,
                  prod: self.wtline.reqprod,
                  altprod: self.wtline.prod
               };
               DataService.post('api/ic/icsec/geticsecsbytypeprodaltprod', { data: icsecExistsCriteria, busy: true }, function (icsec) {
                  if (icsec && icsec.length) {
                     self.wtline.unit = icsec[0].unitstnd;
                     self.unitChanged();
                  }
               });
            } 
         }
         
         self.validateLine();
      }
   };

   self.qtyOrdLostFocus = function () {
      self.validateLine();
   };

   self.qtyShipLostFocus = function () {
      self.validateLine();
   };

   self.lineTypeChanged = function () {
      self.setIsDescriptionVisible();
      if (self.wtline.nonstockty.toLowerCase() === 'n') {
         self.firstNonStockInitialize = true;
         self.wtline.nonstkdataok = true;
         self.wtline.serlottype = '';

         if (self.wtline.nonstockty.toLowerCase() === 'n') {
            self.nonStockClicked();
         }

      } else {
         self.wtline.serlottype = self.baseWtline.serlottype;
      }
   };

   self.qtyShipLostFocus = function () {
      self.validateLine();
   };

   self.unitChanged = function () {
      self.validateLine();
   };

   //User Hook (do not rename)
   self.setWTLineCriteria = function (wtline) { };

   //User Hook (do not rename)
   self.wtLineValidateContinue = function (wtline) { };

   self.validateLine = function (callback, forceValidate, forceField) {
      if (self.wtline.prod) { //dont validate if we don't have a product
         var lineCriteriaNotNeeded = {};

         var validateRequest = {
            wtline: self.wtline,
            wtlnties: self.lineTie,
            lMaintMode: self.isAddLineMode,
            wtlinecriteria: lineCriteriaNotNeeded,
            cChangeList: Utils.deepCompare(self.baseWtline, self.wtline)
         };

         if (forceField) {
            if (validateRequest.cChangeList) {
               if (!validateRequest.cChangeList.includes(forceField)) {
                  validateRequest.cChangeList += ',' + forceField;
               }
            } else {
               validateRequest.cChangeList = forceField;
            }
         }

         //User Hook (do not rename)
         self.setWTLineCriteria(self.wtline);

         //if a validation field has been changed, then proceed
         if (validateRequest.cChangeList.includes('qtyord') ||
             validateRequest.cChangeList.includes('prod') ||
             validateRequest.cChangeList.includes('nonstockty') ||
             validateRequest.cChangeList.includes('unit') ||
             validateRequest.cChangeList.includes('qtyship') ||
             forceValidate) {

            DataService.post('api/wt/aswtline/wtlinevalidate', { data: validateRequest, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     if (data.wtline.launchxrefprodscreenfl) {
                        Utils.replaceObject(self.baseWtline, data.wtline);
                        Utils.replaceObject(self.wtline, data.wtline);
                        self.isLineValidated = true;

                        var messageText = MessageService.getQuestionMessages(data.messaging);
                        if (messageText) {
                           MessageService.yesNo('global.question', messageText, function () {
                              //yes callback
                              if (self.wtline.launchxrefprodscreenfl) {
                                 self.processCrossReferenceProducts(data.oelinexrefprodlist, true);
                              }
                           }, function () {
                              //no callback
                              self.processCrossReferenceProducts(data.oelinexrefprodlist, false);
                              self.wtline.subupgrdty = 'n';
                              self.wtlinevalidateCallbackFieldList = 'subupgrdty';

                              //User Hook (do not rename)
                              if (self.wtlinevalidateSetAdditionalFields) {
                                 self.wtlinevalidateSetAdditionalFields();
                              }

                              self.validateLine(callback, true, self.wtlinevalidateCallbackFieldList);
                           });
                           return;
                        }
                        else {
                           self.processCrossReferenceProducts(data.oelinexrefprodlist, true);
                        }
                     }

                     Utils.replaceObject(self.baseWtline, data.wtline);
                     Utils.replaceObject(self.wtline, data.wtline);

                     //User Hook (do not rename)
                     self.wtLineValidateContinue(self.wtline);

                     if (data.wtline.restrictovrfl && data.wtline.restricterrmess && data.wtline.restricterrmess.length > 0) {
                        MessageService.info('global.information', data.wtline.restricterrmess);

                        AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'lines', 'restrictovrfl', '', '', null, self.wtLineValidateCheckAuthPassed, self.wtLineValidateCheckAuthFailed);
                        return;
                     }

                     if (data.cUpdateMessage) {
                        MessageService.alert('global.alert', data.cUpdateMessage);
                        return;
                     }

                     self.isLineValidated = true;

                     //once all processing is complete, if there is a callback, then call it
                     if (callback) {
                        callback();
                     }
                  }
               }
            });
         }
      }
   };

   self.wtLineValidateCheckAuthPassed = function () {
      self.wtline.restrictovrfl = true;
      self.wtline.restricterrmess = '';
   };

   self.wtLineValidateCheckAuthFailed = function () {
      self.wtline.restrictovrfl = false;
   };

   self.nonStockClicked = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.nonStock', { isProductLoaded: self.wtline.prod ? true : false });
   };

   self.tiesClicked = function () {
      $state.go('.ties');
   };

   self.commentsClicked = function () {
      self.getSubTitle();
      $state.go('.comments');
   };

   self.getSubTitle = function () {
      var subTitle = '';

      if (base.wthdr.wtno) {
         subTitle = $translate.instant('global.warehouse.transfer.number') + Constants.LABEL_DELIMITER +
            base.wthdr.wtno + '-' + Utils.pad(base.wthdr.wtsuf, 2) + Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.line.number') + Constants.LABEL_DELIMITER + self.wtline.lineno;
      }

      return subTitle;
   };

   self.serialsClicked = function () {
      var params = {
         prod: self.wtline.prod,
         whse: base.wthdr.shipfmwhse,
         fldlist: 'snpocd'
      };
      DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            if ((!data.snpocd && Sasc.icsnpofl) || (data.snpocd.toLowerCase() === 's')) {
               if (self.requireWTSerials === 'no' && base.wthdr.wttype.toLowerCase() !== 'do') {
                  MessageService.alertOk('global.information', 'message.serials.assigned.at.sales.not available.in.wt');
                  return;
               }
            }

            $state.go(base.baseState + '.selectProducts.advancedLineEntry.serials');
         }
      });
   };

   self.lotsClicked = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.lots');
   };

   self.warehouseManagerClicked = function () {
      var wmBinAssignCriteria = {
         altwhse: '',
         currproc: 'wtet',
         jrnlno: 0,
         kitfl: false,
         lineno: self.wtline.lineno,
         ourproc: 'wtetl',
         ordertype: 't',
         orderno: base.wthdr.wtno,
         ordersuf: base.wthdr.wtsuf,
         returnfl: false,
         potype: '',
         prod: self.wtline.prod,
         seqno: 0,
         skipnonkitlogic: false,
         stkqtyship: self.wtline.stkqtyship,
         stkqtyrcv: 0,
         unit: self.wtline.unit,
         vamodule: '',
         wmadjtype: 'sell',
         wmqtyrcv: 0,
         whse: base.wthdr.shipfmwhse
      };

      $state.go('.bin-allocation', {
         criteria: wmBinAssignCriteria,
         binAllocationDisabled: false,
         submittedCallback: 'ale.binAllocationSavedCallback',
         actionsCallback: 'ale.binAllocationActionsCallback'
      });
   };

   self.binAllocationSavedCallback = function (wmBinAssignment) {
      self.wtline.wmqtyship = wmBinAssignment.wmqtyship;
      MessageService.info('global.information', 'message.warehouse.manager.data.accepted');
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmBinAssignment) {
      self.wtline.wmqtyship = wmBinAssignment.wmqtyship;
   };

   self.processCrossReferenceProducts = function (xRefProdList, isNavigate) {

      self.wtline.launchxrefprodscreenfl = false;

      self.subsUpgradesCollection = [];
      self.xRefsCollection = [];

      xRefProdList.forEach(function (xRef) {
         switch (xRef.rectype.toLowerCase()) {
         case 's':
         case 'u':
            self.subsUpgradesCollection.push(xRef);
            break;
         default:
            self.xRefsCollection.push(xRef);
            break;
         }
      });

      if (isNavigate) {
         if (self.subsUpgradesCollection.length > 0 || self.xRefsCollection.length > 0) {
            $state.go(base.baseState + '.selectProducts.advancedLineEntry.crossReference');
         }
      }
   };

   self.clearLineAndReset = function (leavingAdvancedLineEntry, options) {
      var lineCancelCriteria = {
         maintmode: base.isAddOrderMode,
         wtno: base.wthdr.wtno,
         wtsuf: base.wthdr.wtsuf,
         lineno: self.wtline.lineno
      };
      DataService.post('api/wt/aswtline/wtlinecancelchange', { data: lineCancelCriteria, busy: true }, function () {
         self.resetLine();

         if (leavingAdvancedLineEntry) {
             if (leavingAdvancedLineEntry === '^.transferOrderSettings') {
                 $state.go(leavingAdvancedLineEntry, { callingState: '^.advancedLineEntry' });
             }
             else {
                $state.go(leavingAdvancedLineEntry, options);
                if (leavingAdvancedLineEntry === '^') {
                   $scope.sp.view.applyAutoFocus();
                }
             }
         } else if (self.isFromEditLines) {
            $state.go('^.detailedGrid', { activePage: self.editLinesActivePage });
         } else {
            var lineInitiateCriteria = {
               maintmode: base.isAddOrderMode,
               wtno: base.wthdr.wtno,
               wtsuf: base.wthdr.wtsuf
            };
            DataService.post('api/wt/aswtline/wtlineinitialize', { data: lineInitiateCriteria, busy: true }, function (data) {
               if (data) {
                  data.wlwhsechgfl = (base.wthdr.wlwhsefl && base.wthdr.stagecd >= 2 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
                  Utils.replaceObject(self.baseWtline, data.wtline);
                  Utils.replaceObject(self.wtline, data.wtline);

                  self.view.applyAutoFocus();
               }
            });
         }
      });
   };

   self.resetLine = function () {
      self.isAddLineMode = true;
//      self.isQtyShipChanged = false;
//      self.hasSourcingBeenAccessed = false;
//      self.isCatalogProduct = false;
//
//      self.kitComponentSourcingHeader = {};
//      self.kitComponentSourcingCollection = [];
//      self.subsUpgradesCollection = [];
//      self.whseAvailsCollection = [];
//      self.xRefsCollection = [];
   };

   self.addClicked = function () {
      if (!self.wtline.prod) {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
         return;
      }

      var changedFieldsList = Utils.deepCompare(self.baseWtline, self.wtline);

      var wtlinecreateCriteria = {
         wtline: self.wtline,
         wtlnties: self.wtlnties,
         cMaintMode: true, //Add mode
         wtlinecriteria: {},  // not used in this SI call
         cChangeList: changedFieldsList + ','   //NOTE:  This trailing "," is very important, otherwise the line won't drop.
      };

      DataService.post('api/wt/aswtline/wtlinecreate', { data: wtlinecreateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {

               if (data.cUpdateMessage && data.cUpdateMessage !== 'ok') {
                  if (data.cUpdateMessage && data.cUpdateMessage.length > 0) {
                     MessageService.info('global.information', data.cUpdateMessage);
                  }

                  self.wtline = data.wtline;
               }

               if (data.wtline.restrictovrfl && data.wtline.restricterrmess && data.wtline.restricterrmess.length > 0) {
                  self.wtline = data.wtline;
                  MessageService.info('global.information', data.wtline.restricterrmess);

                  AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'lines', 'restrictovrfl', '', '', null, self.wtLineCreateCheckAuthPassed, self.wtLineCreateCheckAuthFailed);
                  return;
               }

               base.updateLineItems(self.initializeLine);
               // Must retrieve latest WT header to contain latest totals.
               base.getWthdr();
            }
         }
      });
   };

   self.deleteClicked = function () {
      if (self.wtline !== null && self.wtline.lineno > 0) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         function () {
            var criteria = {
               wtlinecriteria: [],
               wtline: {},
               wtlnties: {}
            };
            var row = {
               wtno: self.wtline.wtno,
               wtsuf: self.wtline.wtsuf,
               lineno: self.wtline.lineno,
               wlwhsechgfl: self.wtline.wlwhsechgfl
            };
            criteria.wtlinecriteria.push(row);

            DataService.post('api/wt/aswtline/wtetlinedelete', { data: criteria, busy: true }, function (data) {
               if (!MessageService.processMessaging(data)) {
                  base.updateLineItems(self.initializeLine);
                  // Must retrieve latest WT header to contain latest totals.
                  base.getWthdr();

                  self.isAddLineMode = true;
               }
            });
         });
      }
   };

   self.updateClicked = function () {
      if (!self.wtline.prod) {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
         return;
      }

      var changedFieldsList = Utils.deepCompare(self.baseWtline, self.wtline);

      var wtlineupdateCriteria = {
         wtline: self.wtline,
         wtlnties: self.wtlnties,
         cMaintMode: true, //Add mode
         cChangeList: changedFieldsList + ','   //NOTE:  This trailing "," is very important, otherwise the line won't update.
      };

      DataService.post('api/wt/aswtline/wtlineupdate', { data: wtlineupdateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.wtline.restrictovrfl && data.wtline.restricterrmess && data.wtline.restricterrmess.length > 0) {
                  self.wtline = data.wtline;
                  MessageService.info('global.information', data.wtline.restricterrmess);

                  AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'lines', 'restrictovrfl', '', '', null, self.wtLineCreateCheckAuthPassed, self.wtLineCreateCheckAuthFailed);
                  return;
               }

               if (data.cUpdateMessage && data.cUpdateMessage !== 'ok') {
                  if (data.cUpdateMessage && data.cUpdateMessage.length > 0) {
                     MessageService.info('global.information', data.cUpdateMessage);
                  }

                  self.wtline = data.wtline;
               }

               base.updateLineItems(self.initializeLine);
               // Must retrieve latest WT header to contain latest totals.
               base.getWthdr();
               self.isAddLineMode = true;
            }
         }
      });
   };

   self.clearCancel = function () {
      self.clearLineAndReset();
   };

   self.finish = function () {
      if (self.wtline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            base.finish();
         });
      } else {
         base.finish();
      }
   };

   self.clearRestrictionErrorMessage = function () {
      self.wtline.restricterrmess = '';
   };

   self.resetRestrictionOverrideFlag = function () {
      self.wtline.restrictovrfl = false;
   };

   self.wtLineCreateCheckAuthPassed = function () {

      self.wtline.restrictovrfl = true;
      self.wtline.restricterrmess = '';

      //Passed Authorization, call it again.
      if (self.addMode) {
         self.addClicked();
      } else {
         self.updateClicked();
      }
   };

   self.wtLineCreateCheckAuthFailed = function () {
      self.resetRestrictionOverrideFlag();
   };

   self.easyLineEntry = function () {
      self.clearLineAndReset('^');
   };

   self.quickLineEntry = function () {
      self.clearLineAndReset('^.quickLineEntry');
   };

   self.transferOrderSettings = function () {
      self.clearLineAndReset('^.transferOrderSettings');
   };

   self.detailedGrid = function () {
      self.clearLineAndReset('^.detailedGrid');
   };

   self.stageWizardSelectProducts = function () {
      if (self.wtline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            self.clearLineAndReset(base.defaultLineEntryState);
         });
      } else {
         self.clearLineAndReset(base.defaultLineEntryState);
      }
   };

   self.stageWizardReviewAndTotals = function () {
      if (self.wtline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            self.clearLineAndReset(base.baseState + '.reviewAndTotals');
         });
      } else {
         self.clearLineAndReset(base.baseState + '.reviewAndTotals');
      }
   };
});