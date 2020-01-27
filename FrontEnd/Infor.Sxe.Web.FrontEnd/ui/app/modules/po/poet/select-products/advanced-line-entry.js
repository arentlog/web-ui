'use strict';

//This is called from the Detailed List drilldown to maintain line information.  This give the user access to all
//other line features such as Nonstock Entry, Serial, Lots, etc...
//Alias: ale
app.controller('PoetAdvancedLineEntryCtrl', function ($scope, $state, $stateParams, $translate, SecurityService, DataService, MessageService, UserService, AuthService, AodataService, Utils, Sasoo, Constants) {
   var self = this;
   var base = $scope.base;

   self.basePoline = {};
   self.poline = {};
   self.lineNonstock = {};
   self.lineNonstockHeader = {};
   self.assemblyCollection = [];
   self.lineTie = {};
   self.isAddLineMode = !$stateParams.lineNo;
   self.isLineValidated = false;
   self.taxInterfaceType = AodataService.getValue('TAX', 'TaxInterfaceTy');
   self.lineTies = [];
   self.lineTiesOrig = [];
   self.isDescriptionVisible = false;
   self.currpolineNonStock = {};

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(base.MENU_FUNCTION_POET);

   self.isBundles = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.bundles');
   };

   self.isComments = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.comments');
   };

   self.isCoreReturnAllocations = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.coreReturnAllocations');
   };

   self.isLineEntry = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry');
   };

   self.isNonStock = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.nonStock');
   };

   self.isLots = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.lots');
   };

   self.isReturn = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.returns');
   };

   self.isPricing = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.pricing');
   };

   self.isSerials = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.serials');
   };

   self.isTallies = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.tallies');
   };

   self.isTies = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.ties');
   };

   self.isWarehouseManager = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.bin-allocation');
   };

   self.setIsDescriptionVisible = function () {
      var isVisible = false;
      if (self.poline && self.poline.nonstockty !== base.NONSTOCKTYPE_STOCKED) {
         isVisible = true;
      }
      self.isDescriptionVisible = isVisible;
   };

   self.getFullProductDescription = function () {
      self.setIsDescriptionVisible();
      var fullDesc = '';
      if (self.poline && self.poline.nonstockty !== base.NONSTOCKTYPE_STOCKED) {
         if (self.poline.proddesc) {
            fullDesc = fullDesc + self.poline.proddesc;
         }
         if (self.poline.proddesc2) {
            fullDesc = fullDesc + ' ' + self.poline.proddesc2;
         }
      }
      return fullDesc;
   };

   self.addUpdateButtonText = function () {
      if (self.isAddLineMode) {
         return $translate.instant('global.add');
      } else {
         return $translate.instant('global.update');
      }
   };

   self.clearCancelButtonText = function () {
      if (self.isInAddMode) {
         return $translate.instant('global.clear');
      } else {
         return $translate.instant('global.cancel');
      }
   };

   self.getLineForEditing = function (lineRetrieveCriteria) {
      DataService.post('api/po/aspoline/polineretrieve', { data: lineRetrieveCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging) /*|| restrictionErrorMessages.items.length > 0*/) {
            if (data.poline) {
               Utils.replaceObject(self.basePoline, data.poline);
               Utils.replaceObject(self.poline, data.poline);
               self.isLineValidated = true;

               //Save off old values for the Ties.
               if (data.polineties && data.polineties.length > 0) {
                  data.polineties.forEach(function (result) {
                     result.oordertype = result.ordertype;
                     result.oorderaltno = result.orderaltno;
                     result.oorderaltsuf = result.orderaltsuf;
                     result.olinealtno = result.linealtno;
                     result.oseqaltno = result.seqaltno;
                  });
               }
               self.lineTies = data.polineties;

               //Save off original collection so it can be used when the user Clears lines.  We need the
               //original list to help us rebuild the collection for update / clear.
               self.lineTiesOrig = data.polineties;
            }

            //User Hook (do not rename)
            if (self.getLineForEditingContinue) {
               self.getLineForEditingContinue();
            };

         } else {
            $state.go('^');
         }
      });
   };

   if ($stateParams.lineNo) {
      base.firstNonStockInitialize = true;

      var lineRetrieveCriteria = {
         lineno: $stateParams.lineNo,
         maintmode: base.isAddOrderMode,
         pono: base.pohdr.pono,
         posuf: base.pohdr.posuf,
         readonlyfl: false,
         secure: self.operatorMenuSecurity
      };
      DataService.post('api/po/aspoline/polineretrieve', { data: lineRetrieveCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            if (data.poline) {
               Utils.replaceObject(self.basePoline, data.poline);
               Utils.replaceObject(self.poline, data.poline);
               self.isLineValidated = true;

               //User Hook (do not rename)
               if (self.poLineRetrieveContinue) {
                  self.poLineRetrieveContinue(data.poline);
               }

               //Save off old values for the Ties.
               if (data.polineties && data.polineties.length > 0) {
                  data.polineties.forEach(function (result) {
                     result.oordertype = result.ordertype;
                     result.oorderaltno = result.orderaltno;
                     result.oorderaltsuf = result.orderaltsuf;
                     result.olinealtno = result.linealtno;
                     result.oseqaltno = result.seqaltno;
                  });
               }

               self.lineTies = data.polineties;

               //Save off original collection so it can be used when the user Clears lines.  We need the
               //original list to help us rebuild the collection for update / clear.
               self.lineTiesOrig = data.polineties;
            }

            //User Hook (do not rename)
            if (self.lineNumberAfterRetrieveContinue) {
               self.lineNumberAfterRetrieveContinue();
            };

         } else {
            $state.go('^');
         }

      });
   } else {
      var poLineInitializeCriteria = {
         maintmode: true,
         pono: base.pohdr.pono,
         posuf: base.pohdr.posuf,
         processtype: base.PROCESSTYPE_START,
         secure: self.operatorMenuSecurity
      };

      DataService.post('api/po/aspoline/polineinitialize', { data: poLineInitializeCriteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.basePoline, data);
            Utils.replaceObject(self.poline, data);

            self.basePoline.nonstockty = base.defaultLineType;
            self.poline.nonstockty = base.defaultLineType;

            if ($stateParams.qtyord) {
               self.poline.qtyord = $stateParams.qtyord;
            }

            if ($stateParams.unit) {
               self.poline.unit = $stateParams.unit;
            }

            if ($stateParams.price) {
               self.poline.price = $stateParams.price;
            }

            if ($stateParams.product) {
               self.poline.prod = $stateParams.product;

               var criteria = {
                  QueryText: self.poline.prod,
                  LookupParameter: 'icsw',
                  ProductType: ['icsw', 'icsp'],
                  FacetQuery: {
                     whse: [base.pohdr.whse],
                     keyno: [base.pohdr.vendno]
                  }
               };

               DataService.post(Constants.SEARCH_PATH, { data: criteria, errorFunction: 'advancedlineentry-po' }, function (data) {
                  if (data) {
                     //if there's an exact match on the product, then validate the line
                     if (data.hits[0].prod.toLowerCase() === self.poline.prod.toLowerCase()) {
                        var poLineValidateRequest = {
                           polineties: self.lineTies,
                           poline: self.poline,
                           cMaintMode: base.IS_ADD_MODE,
                           cChangeList: 'prod,' //NOTE:  The ending comma on this field list is necessary and very important.
                        };

                        if ($stateParams.qtyord) {
                           poLineValidateRequest.cChangeList = poLineValidateRequest.cChangeList + 'qtyord,';
                        }

                        if ($stateParams.unit) {
                           poLineValidateRequest.cChangeList = poLineValidateRequest.cChangeList + 'unit,';
                        }

                        DataService.post('api/po/aspoline/polinevalidate', { data: poLineValidateRequest, busy: true }, function (data) {
                           if (data) {
                              if (data.messaging) {
                                 MessageService.processMessaging(data.messaging);
                              }

                              Utils.replaceObject(self.basePoline, data.poline);
                              Utils.replaceObject(self.poline, data.poline);
                              self.isLineValidated = true;
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

   self.initializeLine = function () {
      self.poBundlesCriteria = [];
      self.poBundlesControl = {};
      self.poTallyCriteria = {};
      self.poCoreAllocationCriteria = {};
      self.lineTies = [];

      var poLineInitializeCriteria = {
         maintmode: true,
         pono: base.pohdr.pono,
         posuf: base.pohdr.posuf,
         processtype: base.PROCESSTYPE_START,
         secure: self.operatorMenuSecurity
      };

      DataService.post('api/po/aspoline/polineinitialize', { data: poLineInitializeCriteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.basePoline, data);
            Utils.replaceObject(self.poline, data);

            self.basePoline.nonstockty = base.defaultLineType;
            self.poline.nonstockty = base.defaultLineType;
            self.isLineValidated = true;
            self.view.applyAutoFocus();
         }
      });
   };

   self.navToProduct = function () {
      $state.go('icip.detail', { pk: self.poline.prod, pk2: base.pohdr.whse });
   };

   self.navToQuantityOrdered = function () {
      $state.go('icia.detail', { pk: self.poline.prod, pk2: base.pohdr.whse }, { reload: 'icia.detail' });
   };

   self.productSelected = function () {
      self.validateLine();
   };

   self.qtyOrdLostFocus = function () {
      //If this is an RM order, the returntype is required.  If we haven't gotten to that field yet, don't stop the user
      //if they are still entering data.  Stop them only when they try to add/update the line.
      if (base.pohdr.potype === base.PURCHASEORDER_TYPE_RETURN) {
         if (self.poline.reasunavty) {
            self.validateLine();
         }
      } else {
         self.validateLine();
      }
   };

   self.lineTypeChanged = function () {
      if (self.poline.nonstockty.toLowerCase() === base.NONSTOCKTYPE_NONSTOCK || self.poline.nonstockty.toLowerCase() === base.NONSTOCKTYPE_RESALE) {
         base.firstNonStockInitialize = true;
         self.poline.nonStkNFRDataOk = true;

         if (self.poline.nonstockty.toLowerCase() === base.NONSTOCKTYPE_NONSTOCK) {
            self.nonStockClicked();
         } else if (self.poline.nonstockty.toLowerCase() === base.NONSTOCKTYPE_RESALE) {
            self.resaleClicked();
         }
      }
   };

   self.validationFieldLostFocus = function () {
      self.poline.lLaunchedCore = false;
      self.validateLine();
   };

   self.validateLineStep2CheckAuth = function (callbackPayload) {

      if (self.poline.restrictovrfl && self.poline.restricterrmess) {
         MessageService.info('global.information', self.poline.restricterrmess);
         //"Product Sourcing Restriction Override"
         AuthService.createAuthPoint(
            base.MENU_FUNCTION_POET,
            'lines',
            'restrictovrfl',
            '',
            '',
            null,
            function () {
               self.clearRestrictionErrorMessage();
               if (callbackPayload) {
                  callbackPayload();
               }
            },
            function () {
               self.resetRestrictionOverrideFlag();
            });
      } else {
         if (callbackPayload) {
            callbackPayload();
         }
      }
   };

   self.clearRestrictionErrorMessage = function () {
      self.basePoline.restricterrmess = '';
      self.poline.restricterrmess = '';
   };

   self.resetRestrictionOverrideFlag = function () {
      self.basePoline.restrictovrfl = false;
      self.poline.restrictovrfl = false;
   };

   //User Hook (do not rename)
   self.poLineValidateCallback = function (data, callback) {
      if (!MessageService.processMessaging(data.messaging)) {

         if (data.cUpdateMessage && data.cUpdateMessage !== base.MESSAGING_OK) {
            MessageService.alertOk('global.alert', data.cUpdateMessage, function () {
               return;
            });
         }

         Utils.replaceObject(self.basePoline, data.poline);
         Utils.replaceObject(self.poline, data.poline);
         self.isLineValidated = true;

         //User Hook (do not rename)
         base.poLineValidateContinue(data.poline);

         self.validateLineStep2CheckAuth(callback);
      }
   };

   self.validateLine = function (callback, forceFields) {
      if (self.poline.prod) {
         var lineCriteriaNotNeeded = {};

         var validateRequest = {
            poline: self.poline,
            polineties: self.lineTies,
            lMaintMode: self.isAddLineMode,
            wtlinecriteria: lineCriteriaNotNeeded,
            cChangeList: Utils.deepCompare(self.basePoline, self.poline)
         };

         //If the user changed any field and qtyord is not in the field list, add that to the
         //change list so it doesn't get reset back to 1 from the backend.
         if (validateRequest.cChangeList && !validateRequest.cChangeList.includes('qtyord')) {
            //If there's already a field in there, add a trailing comma so the qtyord can be added properly.
            if (validateRequest.cChangeList.length > 0) {
               validateRequest.cChangeList += ',';
            }
            validateRequest.cChangeList += 'qtyord,';
         };

         //If we came from screens such as Tally's/Bundles, there might be additional fields we need
         //to include in this list.
         if (forceFields) {
            if (validateRequest.cChangeList) {
               if (!validateRequest.cChangeList.endsWith(',')) {
                  validateRequest.cChangeList += ',' + forceFields;
               } else {
                  validateRequest.cChangeList += forceFields;
               }
            } else {
               validateRequest.cChangeList = forceFields;
            }
         }

         //if a validation field has been changed, then proceed
         if (validateRequest.cChangeList.includes('qtyord') ||
            validateRequest.cChangeList.includes('prod') ||
            validateRequest.cChangeList.includes('nonstockty') ||
            validateRequest.cChangeList.includes('unit') ||
            validateRequest.cChangeList.includes('price') ||
            validateRequest.cChangeList.includes('scrnprice') ||
            validateRequest.cChangeList.includes('countryoforigin') ||
            validateRequest.cChangeList.includes('tariffcd')) {

            if (!validateRequest.cChangeList.endsWith(',')) {
               validateRequest.cChangeList += ','; //NOTE:  This trailing "," is very important, otherwise the line won't drop.
            }

            if (self.basePoline.prod !== self.poline.prod && self.poline.restrictovrfl) {
               self.poline.restrictovrfl = false;
            }

            //User Hook (do not rename)
            base.setPoLineCriteria(self.poline);

            DataService.post('api/po/aspoline/polinevalidate', { data: validateRequest, busy: true }, function (data) {
               if (data) {
                  //User Hook (do not rename)
                  self.poLineValidateCallback(data, callback)
               }
            });
         }
      }
   };

   self.bundlesClicked = function () {
      $state.go('.bundles');
   };

   self.commentsClicked = function () {
      self.getSubTitle();
      $state.go('.comments');
   };

   self.getSubTitle = function () {
      var subTitle = '';

      if (base.pohdr.pono) {
         subTitle = $translate.instant('global.purchase.order.number') + Constants.LABEL_DELIMITER +
            base.pohdr.pono + '-' + Utils.pad(base.pohdr.posuf, 2) + Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.line.number') + Constants.LABEL_DELIMITER + self.poline.lineno;
      }

      return subTitle;
   };

   self.coreReturnAllocationClicked = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.coreReturnAllocations');
   };

   self.lotsClicked = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.lots');
   };

   self.nonStockClicked = function () {
      //Not for Resale and Nonstock share the same view.
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.nonStock', {
         isNonstockMode: true,
         isProductLoaded: self.poline.prod ? true : false
      });
   };

   self.pricingClicked = function () {
      $state.go('.pricing');
   };

   self.resaleClicked = function () {
      //Non for Resale and Nonstock share the same view.
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.nonStock', {
         isNonstockMode: false,
         isProductLoaded: self.poline.prod ? true : false
      });
   };

   self.serialsClicked = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.serials');
   };

   self.talliesClicked = function () {
      $state.go('.tallies');
   };

   self.tiesClicked = function () {
      $state.go('.ties');
   };

   self.coreReturnAllocationSavedCallback = function (poCoreAllocationUpdate) {
      if (poCoreAllocationUpdate) {
         if (!poCoreAllocationUpdate.proofok) {
            MessageService.error('global.error', 'global.core.allocation.not.complete');

            return;
         }

         self.poline.lWarrantyFl = poCoreAllocationUpdate.warrantyfl;

         var doValidate = false;
         if (self.poline.stkqtyord !== poCoreAllocationUpdate.stkqtyrcv) {
            self.poline.stkqtyord = poCoreAllocationUpdate.stkqtyrcv;
            self.poline.qtyord = poCoreAllocationUpdate.qtyrcv > 0 ? poCoreAllocationUpdate.qtyrcv : 1;
            doValidate = true;
         }

         if (self.poline.scrnprice !== poCoreAllocationUpdate.price) {
            self.poline.scrnprice = poCoreAllocationUpdate.price;
            doValidate = true;
         }

         if (doValidate) {
            self.validateLine(self.coreReturnAllocationSavedCallbackContinue);
         }
      }

      $state.go('^');
   };

   //This fires only after the ValidateLine completes from after Core Return Allocation Save.
   self.coreReturnAllocationSavedCallbackContinue = function () {
      self.poline.lLaunchedCore = true;
   };

   self.coreReturnAllocationCancelCallback = function (poCoreAllocationUpdate) {
      if (poCoreAllocationUpdate && !poCoreAllocationUpdate.proofok) {
         MessageService.error('global.error', 'global.core.allocation.not.complete');
      }
   };

   self.binAllocationSavedCallback = function (wmBinAssignment) {
      self.poline.wmqtyship = wmBinAssignment.wmqtyship;
      MessageService.info('global.information', 'message.warehouse.manager.data.accepted');
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmBinAssignment) {
      self.poline.wmqtyship = wmBinAssignment.wmqtyship;
   };

   self.clearLineAndReset = function (leavingAdvancedLineEntry, options) {
      base.firstNonStockInitialize = true;
      var lineCancelCriteria = {
         maintmode: base.isAddOrderMode,
         pono: base.pohdr.pono,
         posuf: base.pohdr.posuf,
         lineno: self.poline.lineno
      };
      DataService.post('api/po/aspoline/polinecancelchange', { data: lineCancelCriteria, busy: true }, function () {
         self.resetLine();

         if (leavingAdvancedLineEntry) {
            if (leavingAdvancedLineEntry === '^.purchaseOrderSettings') {
               $state.go(leavingAdvancedLineEntry, { callingState: '^.advancedLineEntry' });
            }
            else {
               $state.go(leavingAdvancedLineEntry, options);
            }

            if ($scope.sp && $scope.sp.view) {
               $scope.sp.view.applyAutoFocus();
            }
         } else {
            var lineInitiateCriteria = {
               maintmode: base.isAddOrderMode,
               pono: base.pohdr.pono,
               posuf: base.pohdr.posuf,
               secure: self.operatorMenuSecurity
            };
            DataService.post('api/po/aspoline/polineinitialize', { data: lineInitiateCriteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(self.basePoline, data);
                  Utils.replaceObject(self.poline, data);

                  self.view.applyAutoFocus();
               }
            });
         }
      });
   };

   self.resetLine = function () {
      //Reset any line level flags here.
   };

   self.addUpdate = function () {
      if (self.isAddLineMode) {
         self.addClicked();
      } else {
         self.updateClicked();
      }
   };

   self.launchTallies = function () {
      var isLaunchTally = false;
      if (self.poline) {
         if (!self.poline.lLaunchedTally && self.poline.lForceTallyMix) {
            isLaunchTally = true;
            if (self.poline.reqbundleidfl) {
               self.bundlesClicked();
            } else {
               self.talliesClicked();
            }
         }
      }

      return isLaunchTally;
   };

   self.addClickedStep2 = function (data) {
      self.poline = data.poline;
      // Check if we need to force the tally/bundle view before continuing
      if (!self.launchTallies()) {
         base.updateLineItems(self.initializeLine);
         // Must retrieve latest PO header to contain latest totals.
         base.getPohdr();
      }
   };

   self.addClicked = function () {
      if (!self.poline.prod) {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
         return;
      }

      var changedFieldsList = Utils.deepCompare(self.basePoline, self.poline);

      var polinecreateCriteria = {
         poline: self.poline,
         polineties: self.lineTies,
         cMaintMode: base.IS_ADD_MODE,
         cChangeList: changedFieldsList + ','   //NOTE:  This trailing "," is very important, otherwise the line won't drop.
      };

      DataService.post('api/po/aspoline/polinecreate', { data: polinecreateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.poline.restrictovrfl && data.poline.restricterrmess && data.poline.restricterrmess.length > 0) {
                  self.poline = data.poline;
                  MessageService.info('global.information', data.poline.restricterrmess);

                  AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'lines', 'restrictovrfl', '', '', null, self.poLineCreateCheckAuthPassed, self.poLineCreateCheckAuthFailed);
                  return;
               }

               if (data.cUpdateMessage && data.cUpdateMessage !== base.MESSAGING_OK) {
                  MessageService.alertOk('global.alert', data.cUpdateMessage, function () {
                     self.addClickedStep2(data);
                  });
               } else {
                  self.addClickedStep2(data);
               }
            }
         }
      });
   };

   self.deleteClicked = function () {
      if (self.poline && self.poline.lineno > 0) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         function () {
            var polinedeletelistCriteria = [];
            var criteriaRow = {
               pono: self.poline.pono,
               posuf: self.poline.posuf,
               lineno: self.poline.lineno
            };
            polinedeletelistCriteria.push(criteriaRow);

            DataService.post('api/po/aspoline/polinedeletelist', { data: polinedeletelistCriteria, busy: true }, function (data) {
               if (!MessageService.processMessaging(data)) {
                  base.updateLineItems(self.initializeLine);
                  // Must retrieve latest PO header to contain latest totals.
                  base.getPohdr();
                  self.isAddLineMode = true;
               }
            });
         });
      }
   };

   self.updateClicked = function () {
      if (!self.poline.prod) {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
         return;
      }

      var changedFieldsList = Utils.deepCompare(self.basePoline, self.poline);

      var polineupdateCriteria = {
         poline: self.poline,
         polineties: self.lineTies,
         cMaintMode: base.IS_ADD_MODE,
         cChangeList: changedFieldsList + ','   //NOTE:  This trailing "," is very important, otherwise the line won't update.
      };

      DataService.post('api/po/aspoline/polineupdate', { data: polineupdateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.poline.restrictovrfl && data.poline.restricterrmess && data.poline.restricterrmess.length > 0) {
                  self.poline = data.poline;
                  MessageService.info('global.information', data.poline.restricterrmess);

                  AuthService.createAuthPoint(base.MENU_FUNCTION_POET, 'lines', 'restrictovrfl', '', '', null, self.poLineCreateCheckAuthPassed, self.poLineCreateCheckAuthFailed);
                  return;
               }

               if (data.cUpdateMessage && data.cUpdateMessage !== 'ok') {
                  if (data.cUpdateMessage && data.cUpdateMessage.length > 0) {
                     MessageService.alertOk('global.alert', data.cUpdateMessage, function () {
                        return;
                     });
                  }

                  self.poline = data.poline;

                  self.launchTallies();
               }

               base.updateLineItems(self.initializeLine);
               // Must retrieve latest PO header to contain latest totals.
               base.getPohdr();
               self.isAddLineMode = true;
            }
         }
      });
   };

   self.clearCancel = function () {
      if (self.isAddLineMode) {
         self.clearLineAndReset();
      } else {
         var lineCancelCriteria = {
            maintmode: base.isAddOrderMode,
            pono: base.pohdr.pono,
            posuf: base.pohdr.posuf,
            lineno: self.poline.lineno
         };
         DataService.post('api/po/aspoline/polinecancelchange', { data: lineCancelCriteria, busy: true }, function () {
            self.resetLine();

            var lineRetrieveCriteria = {
               lineno: lineCancelCriteria.lineno,
               maintmode: base.isAddOrderMode,
               pono: base.pohdr.pono,
               posuf: base.pohdr.posuf,
               readonlyfl: false,
               secure: self.operatorMenuSecurity
            };
            self.getLineForEditing(lineRetrieveCriteria);
         });
      }
   };

   self.easyLineEntry = function () {
      self.clearLineAndReset('^');
   };

   self.quickLineEntry = function () {
      self.clearLineAndReset('^.quickLineEntry');
   };

   self.purchaseOrderSettings = function () {
      self.clearLineAndReset('^.purchaseOrderSettings');
   };

   self.detailedGrid = function () {
      self.clearLineAndReset('^.detailedGrid');
   };

   self.finish = function () {
      if (self.poline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            base.finish();
         });
      } else {
         base.finish();
      }
   }

   self.stageWizardSelectProducts = function () {
      if (self.poline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            self.clearLineAndReset(base.defaultLineEntryState);
         });
      } else {
         self.clearLineAndReset(base.defaultLineEntryState);
      }
   };

   self.stageWizardReviewAndTotals = function () {
      if (base.subFunctionSecurityForReview > 1) {
         if (self.poline.prod) {
            MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
               //yes callback
               self.clearLineAndReset(base.baseState + '.reviewAndTotals');
            });
         } else {
            self.clearLineAndReset(base.baseState + '.reviewAndTotals');
         }
      } else {
         MessageService.error('global.error', 'global.operator.security.prohibits.accessing.review.and.totals');
      }
   };
});