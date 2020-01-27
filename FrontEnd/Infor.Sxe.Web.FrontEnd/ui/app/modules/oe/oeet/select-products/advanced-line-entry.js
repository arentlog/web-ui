'use strict';

app.controller('OeetAdvancedLineEntryCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, UserService, AuthService, AodataService, MruService, Utils, Sasoo, Constants) {
   //alias => ale
   var self = this;
   var base = $scope.base;

   self.baseOeline = {};
   self.oeline = {};
   self.lineNonstock = {};
   self.lineNonstockHeader = {};
   self.assemblyCollection = [];
   self.substitutesCollection = [];
   self.supersedesCollection = [];
   base.substitutesCount = 0;
   self.lineTie = {};
   self.isAddLineMode = !$stateParams.lineNo;
   self.isFromEasy = $stateParams.fromEasy;
   self.isFromEditLines = $stateParams.fromEditLines;
   self.editLinesActivePage = $stateParams.activePage;
   self.isLineValidated = false;
   self.nonStockTaxChanged = false;
   self.wasCorrectionInvoicePresented = false;
   self.wasCorrectionInvoicePresentedDuringAdd = false;
   self.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
   self.taxInterfaceType = AodataService.getValue('TAX', 'TaxInterfaceTy');
   self.creditDebitTypes = [
      {
         label: $translate.instant('global.debit'),
         value: false
      },
      {
         label: $translate.instant('global.credit'),
         value: true
      }
   ];
   self.supplierAccessData = {
      vendno: 0,
      shipfmno: 0
   };

   self.isLineEntry = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry');
   };

   self.isSerials = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.serials');
   };

   self.isLots = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.lots');
   };

   self.isEdi = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.ediErrExc');
   };

   self.isFabKitInfo = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.fabKitInfo');
   };

   self.isProductConfigManager = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.productConfigManager');
   };

   self.isNonStock = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.nonStock');
   };

   self.isReturn = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.returns');
   };

   self.isWarehouseAvailability = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.warehouseAvailability');
   };

   self.isCrossReference = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.crossReference');
   };

   self.isAssembly = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.assembly');
   };

   self.isSupersedes = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.supersedes');
   };

   self.isOptionalProducts = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.optionalProducts');
   };

   self.isWarehouseManager = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.bin-allocation');
   };

   self.isTaxJurisdiction = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.taxJurisdiction');
   };

   self.isComments = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.comments');
   };

   self.isCorrection = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.correction');
   };

   self.isCustomerProduct = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.customerproduct');
   };

   self.isPricing = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.pricing');
   };

   self.isKit = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.kit');
   };

   self.isTallies = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.tallies');
   };

   self.isBundles = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.bundles');
   };

   self.isOneTimeRebate = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.oneTimeRebate');
   };

   self.isOneTimeCost = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.oneTimeCost');
   };

   self.isCustomerReservations = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.customerReservations');
   };

   self.isManualRebate = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.manualRebate');
   };

   self.addUpdateButtonText = function () {
      if (self.isAddLineMode) {
         return $translate.instant('global.add');
      } else {
         return $translate.instant('global.update');
      }
   };

   self.clearCancelButtonText = function () {
      if (self.isAddLineMode) {
         return $translate.instant('global.clear');
      } else {
         return $translate.instant('global.cancel');
      }
   };

   self.initializeLine = function (callback) {
      var initializeLineCriteria = {
         maintmode: true,
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf
      };
      DataService.post('api/oe/asoeline/oelineinitialize', { data: initializeLineCriteria, busy: true }, function (data) {
         base.setItemsList();
         if (data) {
            data.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
            Utils.replaceObject(self.baseOeline, data);
            Utils.replaceObject(self.oeline, data);
            base.supplierAccessContextMessage(self.oeline);
            self.isLineValidated = true;
            self.view.applyAutoFocus();

            if (callback) {
               callback();
            }
         }
      });
   };

   self.getLineForEditing = function (lineRetrieveCriteria) {
      DataService.post('api/oe/asoeline/oelineretrieve', { data: lineRetrieveCriteria, busy: true }, function (data) {
         var restrictionErrorMessages = new JSLINQ(data.messaging).Where(function (message) {
            return message.messagetxt.includes('5626') || message.messagetxt.includes('5627') || message.messagetxt.includes('6943') || message.messagetxt.includes('6944');
         }) || [];
         if (!MessageService.processMessaging(data.messaging) || restrictionErrorMessages.items.length > 0) {
            if (data.oeline) {
               Utils.replaceObject(self.baseOeline, data.oeline);
               Utils.replaceObject(self.oeline, data.oeline);
               // Only the UI knows if still in TWL (wlwhsechgfl=false) or not TWL or not a TWL order (wlwhsechgfl=true),
               // if in TWL then they are allowed to turn the line ship complete off but not back on.
               if (self.oeline.shipcompflenabled && !base.whseLogStatus.wlwhsechgfl) {
                  self.oeline.shipcompflenabled = self.oeline.shipcompfl;
               }
               self.isLineValidated = true;

               if ((!self.oeline.specnstype || self.oeline.specnstype.toLowerCase() === 's') && !self.oeline.coreprodtype) {
                  self.isCustomerProductTabVisible = true;
               }

               var viewEditErrorsRequest = {
                  oelineedicriteria: {
                     lineno: self.oeline.lineno,
                     orderno: self.oeline.orderno,
                     ordersuf: self.oeline.ordersuf,
                     showallfl: true
                  },
                  oelineedierrorresults: {}
               };
               DataService.post('api/oe/asoeline/oelineviewedierrexc', { data: viewEditErrorsRequest, busy: true }, function (data) {
                  if (data.oelineedierrorresults) {
                     self.ediErrorCollection = data.oelineedierrorresults;
                  }
               });

               base.orderTieHeader.runmode = 'line';
               var lineTieRetrieveRequest = {
                  oeline: self.oeline,
                  oelinelinetiehdr: base.orderTieHeader
               };
               DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
                  Utils.replaceObject(self.lineTie, data[0]);

                  if (self.oeline.returnfl) {
                     self.lineTie.ordertype = 'p';
                  }
               });
            }
         }

         //User Hook (do not rename)
         if (self.getLineForEditingContinue) {
            self.getLineForEditingContinue();
         }
      });
   };

   if ($stateParams.lineNo) {
      var lineRetrieveCriteria = {
         lineno: $stateParams.lineNo,
         maintmode: base.isAddOrderMode,
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         readonlyfl: false
      };
      self.getLineForEditing(lineRetrieveCriteria);
   } else {
      var oeLineInitializeCriteria = {
         maintmode: true,
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf
      };
      DataService.post('api/oe/asoeline/oelineinitialize', { data: oeLineInitializeCriteria, busy: true }, function (data) {
         if (data) {
            data.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
            Utils.replaceObject(self.baseOeline, data);
            Utils.replaceObject(self.oeline, data);

            if (base.oehdr.crreasonty && base.oehdr.oetype.toLowerCase() === 'cr') {
               var sastaParams = {
                  codeiden: 'm',
                  codeval: base.oehdr.crreasonty,
                  fldlist: 'creditrebillfl'
               };
               DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
                  if (sasta) {
                     self.isCreditFlEnabled = sasta.creditrebillfl && self.oeline.returnfl ? true : false;
                     base.isMoveLineVisible = sasta.creditrebillfl;
                     base.isCreditRebillFl = self.isCreditFlEnabled;
                  }
               });
            }

            if ($stateParams.product) {
               self.oeline.prod = $stateParams.product;

               var criteria = {
                  LookupParameter: 'icsw',
                  ProductType: ['icsw', 'icsp', 'icsc', 'icsec', 'icenh'],
                  QueryText: self.oeline.prod,
                  FacetQuery: {
                     whse: [base.oehdr.whse],
                     custno: [base.oehdr.custno]
                  }
               };

               DataService.post(Constants.SEARCH_PATH, { data: criteria, errorFunction: 'advancedlineentry-oe' }, function (data) {
                  if (data) {
                     data = Utils.processData(criteria, data);
                     //if there's an exact match on the product, then validate the line
                     var isMatch = data.hits.find(function (result) {
                        return result.prod.toLowerCase() === self.oeline.prod.toLowerCase();
                     });

                     if ($stateParams.qtyord) {
                        self.oeline.qtyord = $stateParams.qtyord;
                     }
                     if ($stateParams.unit) {
                        self.oeline.unit = $stateParams.unit;
                     }
                     if ($stateParams.price) {
                        self.price = $stateParams.price;
                     }

                     if (isMatch) {
                        self.validateLine();
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
      $state.go('icip.detail', { pk: self.oeline.prod, pk2: base.oehdr.whse });
   };

   self.getProductDescription = function () {
      return self.oeline.proddesc + ' ' + self.oeline.proddesc2;
   };

   self.navToQuantityBreak = function () {
      $state.go('pdsp.customerMaster', { pk: self.oeline.pdrecno });
   };

   self.navToQuantity = function () {
      $state.go('icia.detail', { pk: self.oeline.prod, pk2: base.oehdr.whse }, { reload: 'icia.detail' });
   };

   self.navToPriceDiscount = function () {
      $state.go('oeip.detail', {
         pk: base.oehdr.custno,
         pk2: base.oehdr.whse,
         pk3: self.oeline.prod,
         pk4: base.oehdr.shipto
      });
   };

   self.navToOrderAltNo = function () {
      var orderAltNo = '';
      var orderAltSuf = '';

      //if the orderaltno contains "-"
      if (self.oeline.orderaltno && self.oeline.orderaltno.toString().indexOf('-') > -1) {
         var splitOrder = self.oeline.orderaltno.split('-');
         orderAltNo = splitOrder[0];
         orderAltSuf = splitOrder[1];
      } else {
         orderAltNo = self.oeline.orderaltno;
      }

      if (orderAltNo) {
         switch (self.oeline.ordertype) {
            case 'p': //purchase order
               $state.go('poip.detail', { pk: orderAltNo, pk2: orderAltSuf });
               break;
            case 't': //warehoue transfer
               $state.go('wtit.detail', { pk: orderAltNo, pk2: orderAltSuf });
               break;
            case 'w': //work order
               $state.go('kpiw.detail', { pk: orderAltNo, pk2: orderAltSuf });
               break;
            case 'f': //value add
               $state.go('vaif.detail', { pk: orderAltNo, pk2: orderAltSuf });
               break;
         }
      }
   };

   self.countryOfOriginChanged = function () {
      //validationfieldEventLostFocus
   };

   self.tariffCodeChanged = function () {
      //validationfieldEventLostFocus
   };

   self.datcCostChanged = function () {
      if (self.oeline.scrndatccost) {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'Extended', 'surcharge', '', '', null, null, function () {
            //failed callback
            self.oeline.scrndatccost = self.baseOeline.originalDatcCost;
         });
      }
   };

   self.configureProductClicked = function () {
      if (self.isLineValidated) {
         $state.go('.productConfigManager');
      } else {
         self.validateLine($state.go('.productConfigManager'));
      }
   };

   self.productSelected = function (args) {
      var recordFound = false;
      if (self.baseOeline.prod !== self.oeline.prod) {
         self.wasCorrectionInvoicePresented = false;
         self.wasCorrectionInvoicePresentedDuringAdd = false;
         if (args.value4 && args.value4 !== '<empty>') {
            self.oeline.xrefprodty = args.value4.toLowerCase();
         }
         if (args.value3) {
            self.oeline.reqprod = args.value3;
            // Cross Reference Handling
            if (self.oeline.xrefprodty.toLowerCase() === 'b') {
               var icsecExistsCriteria = { //create search criteria for exists (by type, prod, and altprod)
                  rectype: self.oeline.xrefprodty,
                  prod: self.oeline.reqprod,
                  altprod: self.oeline.prod
               };
               DataService.post('api/ic/icsec/geticsecsbytypeprodaltprod', { data: icsecExistsCriteria, busy: true }, function (icsec) {
                  if (icsec && icsec.length) {
                     self.oeline.unit = icsec[0].unitstnd;
                  }
               });
            } else if (self.oeline.xrefprodty.toLowerCase() === 'c' || self.oeline.xrefprodty.toLowerCase() === 'h') {
               self.icsecCustExistsCriteria = {
                  rectype: self.oeline.xrefprodty,  // use the give product type, because it sends a c if there is no shipto cross ref, but one for the cust only instead
                  custno: base.oehdr.custno,
                  shipto: self.oeline.xrefprodty.toLowerCase() === 'h' ? base.oehdr.shipto : '',
                  prod: self.oeline.reqprod,
                  includeshiptowithcustfl: false //Do you want all of the h ship tos for a c type also
               };

               //User Hook (do not rename)
               if (self.productSelectedIcsecretrieveCriteria) {
                  self.productSelectedIcsecretrieveCriteria();
               }

               DataService.post('api/ic/asicinquiry/icsecretrieve', { data: self.icsecCustExistsCriteria, busy: true }, function (data) {
                  if (data && data.length) {
                     // for is faster than a foreach AND I can stop looking after the record is found
                     for (var i = 0, len = data.length; i < len && !recordFound; i++) {
                        if (data[i].altprod === self.oeline.prod &&
                           (self.icsecCustExistsCriteria.rectype === 'c' ||
                              data[i].shipto.toLowerCase() === base.oehdr.shipto.toLowerCase())
                        ) {
                           recordFound = true;
                           if (data[i].unitsell) {
                              self.oeline.qtyord = data[i].orderqty;
                              self.oeline.unit = data[i].unitsell;
                           }
                        }
                     }
                  }
               });
            }
         }

         if (base.oehdr.oetype.toLowerCase() === 'do' && !self.oeline.doath &&
            (base.sasoo.oetietype === 'n' ||
               (base.sasoo.oetietype === 'p' && base.oehdr.oetype === 't') ||
               (base.sasoo.oetietype === 't' && base.oehdr.oetype === 'p'))) {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'ties', 'type', '', '', null, self.productSelectedContinue, self.clearLineAndReset);
         } else {
            self.productSelectedContinue();
         }
      }
   };

   self.productSelectedContinue = function () {
      if (self.oeline.cfgkitfl && self.baseOeline.prod !== self.oeline.prod) {
         MessageService.error('global.error', 'message.this.line.contains.a.build.on.demand.kit.cannot.change.product');
         self.oeline.prod = self.baseOeline.prod;
      } else {
         self.pushDirectOrderFieldsToLine();
         self.pushDirectOrderFieldsToNonStockLine();

         if (base.oehdr.oetype.toLowerCase() === 'cr') {
            self.oeline.reason = base.oehdr.crreasonty;
         }

         if (self.oeline.prod) {

            // Check for an OAN special product changed to a non-OAN product.  Warn the user that the line is still set to special
            if (self.oeline.specnstype.toLowerCase() === 's' && self.baseOeline.prod) {
               var oldicswParams = {
                  prod: self.baseOeline.prod,
                  whse: base.oehdr.whse,
                  fldlist: 'statustype'
               };
               var newicswParams = {
                  prod: self.oeline.prod,
                  whse: base.oehdr.whse,
                  fldlist: 'statustype'
               };
               DataService.get('api/ic/icsw/getbypk', { params: oldicswParams, busy: true }, function (oldicsw) {
                  if (oldicsw) {
                     if (oldicsw.statustype.toLowerCase() === 'o') {
                        DataService.get('api/ic/icsw/getbypk', { params: newicswParams, busy: true }, function (newicsw) {
                           if (newicsw) {
                              if (newicsw.statustype.toLowerCase() !== 'o') {
                                 // SASSE 8792
                                 MessageService.info('global.warning', 'message.new.product.not.oan.special');
                              }
                           }
                        });
                     }
                  }
               });
            }

            var ncnrCheckRequest = {
               pvProd: self.oeline.prod,
               pvWhse: base.oehdr.whse,
               pvCheckncnrfl: true
            };
            DataService.post('api/ic/asicsetup/icncnrcheck', { data: ncnrCheckRequest, busy: true }, function (data) {
               if (data) {
                  if (data.pvDisplaymsgfl) {
                     MessageService.info('global.warning', 'message.you.are.adding.an.ncnr.product.to.the.order');
                  }

                  if (data.icsp && (data.icsp.vaassemblyty.toLowerCase() === 'c' || data.icsp.vaassemblyty.toLowerCase() === 'p')) {
                     $state.go('.assembly', { icspRecord: data.icsp });
                  } else {
                     self.checkSupersedes();
                  }

                  //User Hook (do not rename)
                  if (self.icncnrCheckContinue) {
                     self.icncnrCheckContinue(data);
                  }

               } else {
                  self.checkSupersedes();
               }
            });
         }
      }

      //User Hook (do not rename)
      //Warning: Be aware of asynchronous processing that will be occuring out of sequence in the above
      //callbacks if you utilize this hook.  You can't be sure the order that this hook will be called.
      //This function will be called before any of those callbacks in logic above.
      if (self.productSelectedContinueContinue) {
         self.productSelectedContinueContinue();
      }
   };

   self.checkSupersedes = function () {
      if (self.oeline.superwhsefirstfl) {
         self.supersedesCollection = [];
         self.initiateSupersedes('supersedes');
      } else {
         self.validateLine(self.initiateSubstituteProducts);
      }
   };

   self.initiateSupersedes = function (navigationType) {
      DataService.post('api/oe/asoeline/oelinesuperavailinit', { data: self.oeline, busy: true }, function (data) {
         if (data) {
            if (data.oelinesuperavailresults && data.oelinesuperavailresults.length > 0) {
               data.oelinesuperavailresults.forEach(function (item) {
                  self.supersedesCollection.push(item);
                  if (item.sellfirsttype) {
                     if (item.sellfirsttype.toLowerCase() === 'c') {
                        item.sellfirsttype = $translate.instant('global.company');
                     }
                     else if (item.sellfirsttype.toLowerCase() === 'r') {
                        item.sellfirsttype = $translate.instant('global.region');
                     }
                     else if (item.sellfirsttype.toLowerCase() === 'w') {
                        item.sellfirsttype = $translate.instant('global.warehouse');
                     }
                  }
               });
               $state.go('.supersedes', { criteria: data.oelinesuperavailcriteria, results: data.oelinesuperavailresults, navigationFrom: navigationType });
            }
            else {
               self.validateLine(self.initiateSubstituteProducts);
            }
         }
         else {
            self.validateLine(self.initiateSubstituteProducts);
         }
      });
   };

   self.initiateSubstituteProducts = function (navigate) {
      if (base.oehdr.oetype.toLowerCase() === 'so') {
         self.substitutesCollection = [];
         DataService.post('api/oe/asoelineextra/oelinesubavailinit', { data: self.oeline, busy: true }, function (data) {
            if (data && data.oelinesuperavailresults && data.oelinesuperavailresults.length > 0) {
               base.substitutesCount = data.oelinesuperavailresults.length;
               data.oelinesuperavailresults.forEach(function (subs) {
                  self.substitutesCollection.push(subs);
                  if (subs.sellfirsttype) {
                     if (subs.sellfirsttype.toLowerCase() === 'c') {
                        subs.sellfirsttype = $translate.instant('global.company');
                     }
                     else if (subs.sellfirsttype.toLowerCase() === 'r') {
                        subs.sellfirsttype = $translate.instant('global.region');
                     }
                     else if (subs.sellfirsttype.toLowerCase() === 'w') {
                        subs.sellfirsttype = $translate.instant('global.warehouse');
                     }
                  }
               });
               if (!self.oeline.netavail || navigate) {
                  $state.go('.substitutes', { criteria: data.oelinesuperavailcriteria, results: self.substitutesCollection });
               }
            }
         });
      }
      else if (base.isReqInvCRFl && base.oehdr.oetype === 'cr' && !self.oeline.crlineno && !self.wasCorrectionInvoicePresented) {
         // On a correction order, take the user to the correction screen to
         // select an invoice line to process the correction against
         self.wasCorrectionInvoicePresented = true;
         $state.go('.correction');
      }
   };

   self.qtyOrdLostFocus = function () {
      if (self.isAddLineMode) {
         self.validateLine();
      } else {
         self.checkEditKitLineChange();
      }
   };

   self.unitChanged = function () {
      if (!self.isAddLineMode) {
         self.checkEditKitLineChange();
      } else {
         self.validateLine();
      }
   };

   self.checkEditKitLineChange = function () {
      if (self.oeline.cfgkitfl && (self.baseOeline.qtyord !== self.oeline.qtyord || self.baseOeline.unit !== self.oeline.unit)) {
         DataService.post('api/oe/asoeline/oelinecfgload', { data: self.oeline, busy: true }, function (data) {
            if (data) {
               self.validateLine(self.kitsClicked());
            }
         });
      } else {
         self.validateLine();
      }
   };

   self.lineTypeChanged = function () {
      //THIS IS ONLY IN EDIT MODE
      if (!self.isAddLineMode) {
         if (self.baseOeline.specnstype === 's' && self.oeline.specnstype === '') {
            MessageService.error('global.error', 'message.changing.the.line.type.from.special.to.stock.is.no');

            self.oeline.specnstype = self.baseOeline.specnstype;
         }
         else {
            self.validateLine();
         }
         return;
      }

      if (self.oeline.specnstype === 'n') {
         //get ehf addons
         self.ehfAddonCollection = [];
         var sastnRequest = {
            codeiden: 'a',
            codeval: '',
            fldlist: 'codeiden,codeval,descrip,ehffl'
         };
         DataService.post('api/sa/sastn/getsastnlist', { data: sastnRequest, busy: false }, function (data) {
            if (data) {
               data.forEach(function (sastn) {
                  if (sastn.ehffl) {
                     self.ehfAddonCollection.push(sastn);
                  }
               });
            }
         });
      }

      if (self.oeline.specnstype === 'n') {
         self.pushDirectOrderFieldsToLine();
         self.pushDirectOrderFieldsToNonStockLine();

         if (!self.oeline.crossrefcatflag && !self.oeline.unit) {
            self.oeline.unit = 'each';
         }

         if (!self.oeline.prodcat) {
            self.oeline.prodcat = base.oelineSettings.cICNSProdCat;
         }

         self.nonStockTaxChanged = false;
         self.nonStockClicked();
      }

      if (self.isLineValidated) {
         //only continue when from Stock to Special (‘’ to “s”), Special to Stock (“s” to ‘’) or Nonstock to any other value (“n” to anything)
         if ((self.baseOeline.specnstype === '' && self.oeline.specnstype === 's') ||
            (self.baseOeline.specnstype === 's' && self.oeline.specnstype === '') ||
            self.baseOeline.specnstype === 'n') {
            MessageService.yesNo('global.continue', 'question.changing.line.type.will.reset.all.defaults.continue', function () {
               //yes callback
               var changesToPersist = {
                  contractno: self.oeline.contractno,
                  contrenddt: self.oeline.contrenddt,
                  contrstartdt: self.oeline.contrstartdt,
                  prod: self.oeline.prod,
                  unit: self.oeline.unit,
                  scrnprodcost: self.oeline.scrnprodcost,
                  specnstype: self.oeline.specnstype,
                  vendquote: self.oeline.vendquote
               };

               var cancelChangeCriteria = {
                  maintmode: base.isAddOrderMode,
                  orderno: base.oehdr.orderno,
                  ordersuf: base.oehdr.ordersuf,
                  lineno: self.oeline.lineno
               };
               DataService.post('api/oe/asoeline/oelinecancelchange', { data: cancelChangeCriteria, busy: true }, function () {
                  var initializeCriteria = {
                     maintmode: base.isAddOrderMode,
                     orderno: base.oehdr.orderno,
                     ordersuf: base.oehdr.ordersuf
                  };

                  DataService.post('api/oe/asoeline/oelineinitialize', { data: initializeCriteria, busy: true }, function (initializeData) {
                     if (initializeData) {
                        initializeData.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
                        Utils.replaceObject(self.baseOeline, initializeData);
                        Utils.replaceObject(self.oeline, initializeData);
                        self.persistLineTypeChanges(changesToPersist);
                        self.pushDirectOrderFieldsToLine();
                        self.pushDirectOrderFieldsToNonStockLine();
                        self.view.applyAutoFocus();

                        self.validateLine();
                     }
                  });
               });
            }, function () {
               //no callback
               //if non-stock was selected, we've already navigated, so nav back
               if (self.oeline.specnstype === 'n') {
                  $state.go('^');
               }
               self.oeline.specnstype = self.baseOeline.specnstype;
            });
         }
      } else {
         self.pushDirectOrderFieldsToLine();
         self.pushDirectOrderFieldsToNonStockLine();

         self.validateLine();
      }
   };

   self.persistLineTypeChanges = function (changesToPersist) {
      self.isLineValidated = false;

      self.oeline.contractno = changesToPersist.contractno;
      self.oeline.contrenddt = changesToPersist.contrenddt;
      self.oeline.contrstartdt = changesToPersist.contrstartdt;
      self.oeline.prod = changesToPersist.prod;
      self.oeline.unit = changesToPersist.unit;
      self.oeline.scrnprodcost = changesToPersist.scrnprodcost;
      self.oeline.specnstype = changesToPersist.specnstype;
      self.oeline.vendquote = changesToPersist.vendquote;
   };

   self.marginPercentLostFocus = function () {
      if (self.baseOeline.marginpct !== self.oeline.marginpct) {
         if (self.oeline.marginpct > 100) {
            self.oeline.marginpct = self.baseOeline.marginpct;
            MessageService.info('global.information', 'message.margin.percent.must.be.less.than.100.percent');
            return;
         }

         DataService.post('api/oe/asoelineextra/oelinemarginleave', { data: self.oeline, busy: true }, function (data) {
            if (data || data === 0) {
               self.oeline.manprice = true;
               self.oeline.priceorigcd = 'O';
               self.oeline.price = data;
               self.oeline.priceclty = 'm';
               self.oeline.prodpricecd = self.oeline.marginpct;
               self.oeline.pricelevel = 0;
               self.oeline.scrndiscamt = 0;
               self.oeline.disctype = false;

               self.validateLine();
            }
         });
      }
   };

   self.updateLineFromVa = function (vaRollupData, finishCallback) {
      if (vaRollupData.orderno === base.oehdr.orderno && vaRollupData.ordersuf === base.oehdr.ordersuf) {
         // If I try to to compare self.oeline.lineno to vaRollupData.lineno, the self.oeline.lineno will always be the
         // next line number because the object instance of advanced line entry we are in is now in add mode.
         // It will not a line number of any new line the user selected since VAET was open
         // and before rolling up - that is a different object instance of advanced line entry.


         // Update the cart list with the new price
         // Retotal order based on (O)rdered, (S)hipped or (B)oth
         base.calcsob = 'o';
         base.updateLineItems(null, null, 'updateSingle', vaRollupData.lineno, vaRollupData.lineno, true);

         if (finishCallback) {
            finishCallback(vaRollupData);
         }
      }
   };

   // Determine whether Customer Product Tab should be visible and populate the data if records exists
   self.getCustomerProductTabDetails = function (isNavigate) {
      var custprodCriteria = { altprod: self.oeline.prod, rectype: '', custno: base.oehdr.custno, fldlist: '' };
      DataService.get('api/ic/icsec/listbyaltprod', { params: custprodCriteria, busy: true }, function (data) {
         if (data) {
            var icsecRecordsCount = 0;
            if (data.length === 0) {
               self.isCustomerProductTabVisible = true;
            } else {
               self.icsecList = [];
               var icsecFilterRecords;
               if (base.oehdr.shipto) {
                  icsecFilterRecords = JSLINQ(data).Where(function (record) {
                     return record.shipto === base.oehdr.shipto || !record.shipto;
                  }).ToArray() ||
                     [];
                  icsecFilterRecords.forEach(function (record) {
                     self.icsecList.push(record);
                  });
                  icsecRecordsCount = icsecFilterRecords.length;
               } else if (!base.oehdr.shipto) {
                  icsecFilterRecords = JSLINQ(data).Where(function (record) {
                     return record.rectype.toLowerCase() === 'c';
                  }).ToArray() ||
                     [];
                  icsecFilterRecords.forEach(function (record) {
                     self.icsecList.push(record);
                  });
                  icsecRecordsCount = icsecFilterRecords.length;
               }

               if (icsecRecordsCount === 0) {
                  self.isCustomerProductTabVisible = true;
               } else if (icsecRecordsCount === 1) {
                  var icsec = self.icsecList[0];

                  if (base.isRequireCustomerProd) {

                     // If there is a value already stored on the OE line but it is different than the ICSEC record, leave the current data
                     // Load from ICSEC if no requested product is loaded or it matches the ICSEC record
                     if (!self.oeline.reqprod || self.oeline.reqprod === icsec.prod) {
                        if (self.oeline.custprod === icsec.prod && self.oeline.xrefprodty === icsec.rectype) {
                           //do nothing
                        } else {
                           self.oeline.reqprod = icsec.prod;
                           self.oeline.custprod = icsec.prod;
                           self.oeline.xrefprodty = icsec.rectype;
                           self.validateLine(null, true);
                        }
                     }
                  }
                  if (icsec) {
                     self.isCustomerProductTabVisible = true;
                  }
               } else if (icsecRecordsCount > 1) {
                  self.isCustomerProductTabVisible = true;
               }
            }
            if (isNavigate) {
               $state.go(base.baseState + '.selectProducts.advancedLineEntry.customerproduct',
                  {
                     results: data
                  });
            } else if (base.isRequireCustomerProd && icsecRecordsCount !== 1) {
               $state.go(base.baseState + '.selectProducts.advancedLineEntry.customerproduct',
                  {
                     results: data
                  });
            }
         }
      });
   };

   //User Hook (do not rename)
   self.overridePricing = function () { };

   //User Hook (do not rename)
   self.validateLineContinue = function (data, forceValidate, callback) {
      //once all processing is complete, if there is a callback, then call it
      if (callback) {
         callback();
      }
   };

   self.validateLine = function (callback, forceValidate, callbackWithErrors) {
      if (self.oeline.prod) { //dont validate if we don't have a product
         var validateRequest = {
            oeline: self.oeline,
            lMaintMode: self.isAddLineMode,
            cChangeList: Utils.deepCompare(self.baseOeline, self.oeline)
         };

         // wnqtyship and qtyship get confused with a straight includes of qtyship
         if (validateRequest.cChangeList.startsWith('qtyship') || validateRequest.cChangeList.includes(',qtyship') || validateRequest.cChangeList.includes('stkqtyship')) {
            self.isQtyShipChanged = true;
         }
         //if a validation field has been changed, then proceed
         if (validateRequest.cChangeList.includes('qtyord') ||
            validateRequest.cChangeList.includes('prod') ||
            validateRequest.cChangeList.includes('specnstype') ||
            validateRequest.cChangeList.includes('unit') ||
            validateRequest.cChangeList.includes('price') ||
            validateRequest.cChangeList.includes('scrndiscamt') ||
            validateRequest.cChangeList.includes('disctype') ||
            validateRequest.cChangeList.startsWith('qtyship') || validateRequest.cChangeList.includes(',qtyship') ||
            validateRequest.cChangeList.includes('stkqtyship') ||
            validateRequest.cChangeList.includes('scrnprodcost') ||
            validateRequest.cChangeList.includes('npfl') ||
            forceValidate) {
            if (base.whseLogStatus && !self.isAddLineMode) {
               self.oeline.wlwhsechgfl = base.whseLogStatus.wlwhsechgfl;
               validateRequest.cChangeList = Utils.deepCompare(self.baseOeline, self.oeline);
            }

            DataService.post('api/oe/asoeline/oelinevalidate', { data: validateRequest, busy: true }, function (data) {
               if (data) {
                  var restrictionMessageFound = false;
                  var viewSubsMessageFound = false;
                  data.messaging.forEach(function (message) {
                     if (message.messagetxt.includes('Restriction Found:')) {
                        restrictionMessageFound = true;
                     }
                     if (message.messagetxt.includes('View Subs, Upgrades, or Alternate Whse Product?')) {
                        viewSubsMessageFound = true;
                     }
                  });
                  if (!MessageService.processMessaging(data.messaging) || restrictionMessageFound) {
                     if (viewSubsMessageFound) {
                        Utils.replaceObject(self.baseOeline, data.oeline);
                        Utils.replaceObject(self.oeline, data.oeline);
                        self.isLineValidated = true;

                        //User Hook (do not rename)
                        if (self.lineValidateBeforeUpgradeQuestion) {
                           self.lineValidateBeforeUpgradeQuestion(callback, data);
                        } else {
                           MessageService.yesNo('global.question', 'question.view.subs.upgrades.or.alternate.warehouse.prod', function () {
                              //yes callback
                              if (self.oeline.launchsubupgwhsescreenfl) {
                                 self.processCrossReferenceProducts(data.oelinexrefprodlist, true);
                              } else if (self.oeline.launchxrefprodscreenfl) {
                                 self.processCrossReferenceProducts(data.oelinexrefprodlist, true);
                              } else {
                                 self.processCrossReferenceProducts(data.oelinexrefprodlist, false);
                              }
                           }, function () {
                              //no callback
                              self.processCrossReferenceProducts(data.oelinexrefprodlist, false);
                              //Let the system set the build of the xRef - mirror GUI
                              //self.oeline.subupgrdwhseavlty = 'n';
                              self.validateLine(callback, true);
                           });

                        }
                        return;
                     }

                     if (data.cUpdateMessage) {
                        MessageService.alert(data.cUpdateMessage);
                        return;
                     }

                     Utils.replaceObject(self.baseOeline, data.oeline);
                     Utils.replaceObject(self.oeline, data.oeline);
                     self.isLineValidated = true;

                     if (self.isBarcodeScanned) {
                        self.addLine();
                        self.isBarcodeScanned = false;
                     }

                     if (self.oeline.bodtransferty.toLowerCase() === 't' && !self.oeline.wtboderrfl && self.oeline.bodfabwhse === '') {
                        $state.go('.fabKitInfo', { fromSerials: false });
                     }

                     var stateName = $state.current.name.replace('advancedLineEntry.sourcing', 'advancedLineEntry');
                     // Remove custom entities from context
                     base.clearCustomEntityContextMessages(stateName);

                     // Add custom entities to context for messaging
                     base.sendCustomEntityContextMessages(self.oeline);

                     if (self.oeline.crinvno) {
                        self.correctionInvoiceNumber = self.oeline.crinvno + '-' + self.oeline.crinfsuf;
                     } else {
                        self.correctionInvoiceDate = '';
                     }

                     //Since we have to reset the cataglog flag during catalog product processing, we need to keep a local variable we can hit later
                     self.isCatalogProduct = self.oeline.crossrefcatflag;
                     if (self.isCatalogProduct) {
                        // Turn this off after checking...server will never set to false
                        self.oeline.crossrefcatflag = false;

                        // If line is not yet a nonstock then set as nonstock, force catalog flag and re-validate
                        if (self.oeline.specnstype !== 'n') {
                           self.oeline.specnstype = 'n';
                           self.oeline.forcecatalogfl = true;

                           self.validateLine();
                           return;
                        }

                        if (self.oeline.acceptcatflag) {
                           self.createCatalogInInventoryCheck();
                           return;
                        } else {
                           var catalogMessage = '';
                           if (self.oeline.msdsfl) {
                              catalogMessage += $translate.instant('error.warning.nonstock.hazardous.product.8798') + '\r\n';
                           }
                           catalogMessage += $translate.instant('question.product.found.in.catalog.accept.catalog.item');

                           MessageService.yesNoCancel('global.question', catalogMessage, function () {
                              //yes callback
                              self.oeline.selectedcatflag = true;

                              var getDefaultEhFeeCriteria = {
                                 custno: base.oehdr.custno,
                                 shipto: base.oehdr.shipto,
                                 state: base.oehdr.shiptost,
                                 prod: self.oeline.prod,
                                 effectivedt: Utils.getCurrentDate()
                              };
                              DataService.post('api/oe/asoelineextra/oegetdefaultehfee', { data: getDefaultEhFeeCriteria, busy: true }, function (data) {
                                 if (data) {
                                    self.oeline.ehfaddonno = data.ehfaddonno;
                                    self.oeline.ehfamt = data.ehfamt;
                                    self.oeline.ehfexemptamt = data.ehfexemptamt;
                                    self.oeline.ehfnetamt = 0;
                                 }
                                 self.createCatalogInInventoryCheck();
                              });
                           }, function () {
                              //no callback
                              self.oeline.crossrefflag = false;
                              self.oeline.crossrefdata = '';
                              self.oeline.createicspflag = false;
                              self.oeline.crossrefcatflag = false;

                              self.clearLineAndReset();
                           }, function () {
                              //cancel callback
                              self.clearLineAndReset();
                           });
                           return;
                        }
                     }

                     if (self.oeline.promoprice && !self.isCatalogProduct) {
                        //Promotional Pricing processing
                        self.promoPricing();
                     } else {
                        //Important: If you customize this and override price, make sure that you
                        //run this in your extension: 'ale.validateLine(null, false);'   ('false' is
                        //important, otherwise you'll get in an endless loop since the changefield
                        //list will be blank.  The validateLine call is important because it recalculates
                        //all of the other fields).
                        //User Hook (do not rename)
                        if (self.overridePricing) {
                           self.overridePricing();
                        }
                     }

                     //Configurable Kits processing
                     if (self.oeline.cfgkitfl && self.oeline.maintL === 'a' && !self.oeline.launchedcfgkitfl) {
                        $state.go(base.baseState + '.selectProducts.advancedLineEntry.productConfigManager');
                     }

                     //Cross Reference and Warehouse Availablity processing
                     if (self.oeline.launchsubupgwhsescreenfl) {
                        self.processCrossReferenceProducts(data.oelinexrefprodlist, true);
                     } else if (self.oeline.launchxrefprodscreenfl) {
                        self.processCrossReferenceProducts(data.oelinexrefprodlist, true);
                     } else {
                        // Keep collection of data to display if not 'Never'
                        if (!base.isDisplayWorkFlowAltProd) {
                           self.subsUpgradesCollection = [];
                           self.xRefsCollection = [];
                           self.whseAvailsCollection = [];
                        }
                     }

                     if (self.isCatalogProduct || self.oeline.specnstype === 's' || !self.oeline.specnstype && !forceValidate) {
                        self.getCustomerProductTabDetails();
                     }

                     //User Hook (do not rename)
                     self.validateLineContinue(data, forceValidate, callback);
                  } else {
                     //in some scenarios we may still want to call the callback even with errors
                     if (callbackWithErrors && callback) {
                        callback(true);
                     }
                  }

                  //User Hook (do not rename)
                  if (self.validateLineBottom) {
                     self.validateLineBottom(data, forceValidate, callback);
                  }
               }
            });
         }
      }
   };

   self.checkAutoSourceNonStock = function () {
      //if we haven't already sourced
      if (self.lineTie) { 
         //if we're adding a non-stock to a DO 
         if (self.oeline.specnstype.toLowerCase() === 'n' && base.oehdr.oetype.toLowerCase() === 'do') {
            //DO that was sourced to ARP
            if (self.oeline.dotype.toLowerCase() === 'a') {
               if (self.oeline.vendno || self.oeline.arpwhse) {
                  self.setupLineTie(self.autoSourceNonStock);
               }
            } else
            //DO that was sourced to a PO
            if (self.oeline.dotype.toLowerCase() === 'p') {
               if (self.oeline.vendno) {
                  self.setupLineTie(self.autoSourceNonStock);
               }
            } else
            //DO that was sourced to a WT
            if (self.oeline.dotype.toLowerCase() === 't') {
               if (self.oeline.wwhse) {
                  self.setupLineTie(self.autoSourceNonStock);
               }
            }
         }
      }
   };

   self.autoSourceNonStock = function () {      
      if (self.oeline.vvendno ) { //vendor entered, create PO
         if (self.lineTie.ordertype.toLowerCase() !== 'p') { //first time through, change to PO
            self.lineTie.ordertype = 'p';            
            self.sourcingFieldChangedCallback('ordertype', self.autoSourceNonStock);
         } else if (self.lineTie.vendno !== self.oeline.vvendno) { //second time through, change vendor
            self.lineTie.vendno = self.oeline.vvendno;            
            self.sourcingFieldChangedCallback('vendno', self.autoSourceNonStock);
         } else { //third time through, submit sourcing
            self.sourcingFinishCallback(false, true);
         }
      } else if (self.oeline.wwhse) { //warehouse entered, create WT
         if (self.lineTie.ordertype.toLowerCase() !== 't') { //first time through, change to WT
            self.lineTie.ordertype = 't';
            self.sourcingFieldChangedCallback('ordertype', self.autoSourceNonStock);
         } else if (self.lineTie.wtwhse !== self.oeline.wwhse) { //second time through, change warehouse
            self.lineTie.wtwhse = self.oeline.wwhse;
            self.sourcingFieldChangedCallback('wtwhse', self.autoSourceNonStock);
         } else { //third time through, submit sourcing
            self.sourcingFinishCallback(false, true);
         }
      }
   };

   self.processCrossReferenceProducts = function (xRefProdList, isNavigate) {
      self.oeline.launchsubupgwhsescreenfl = false;

      self.subsUpgradesCollection = [];
      self.whseAvailsCollection = [];
      self.xRefsCollection = [];

      xRefProdList.forEach(function (xRef) {
         switch (xRef.rectype.toLowerCase()) {
            case 's':
            case 'u':
               if (xRef.sellfirsttype) {
                  if (xRef.sellfirsttype.toLowerCase() === 'c') {
                     xRef.sellfirsttype = $translate.instant('global.company');
                  }
                  else if (xRef.sellfirsttype.toLowerCase() === 'r') {
                     xRef.sellfirsttype = $translate.instant('global.region');
                  }
                  else if (xRef.sellfirsttype.toLowerCase() === 'w') {
                     xRef.sellfirsttype = $translate.instant('global.warehouse');
                  }
               }
               self.subsUpgradesCollection.push(xRef);
               break;
            case 'w':
               self.whseAvailsCollection.push(xRef);
               break;
            default:
               self.xRefsCollection.push(xRef);
               break;
         }
      });

      if (isNavigate) {
         if (self.subsUpgradesCollection.length > 0 || self.xRefsCollection.length > 0) {

            //User Hook (do not rename)
            if (self.processCrossReferenceProductsNavigateXref) {
               self.processCrossReferenceProductsNavigateXref();
            }

            $state.go(base.baseState + '.selectProducts.advancedLineEntry.crossReference');
         }
         if (self.whseAvailsCollection.length > 0) {

            //User Hook (do not rename)
            if (self.processCrossReferenceProductsNavigateWhse) {
               self.processCrossReferenceProductsNavigateWhse();
            }

            $state.go(base.baseState + '.selectProducts.advancedLineEntry.warehouseAvailability');
         }
      }
   };

   //User Hook (do not rename)
   self.createCatalogInInventoryCheckAffirmativeContinue = function (hsCode, countryCode, statusType) {
      $state.go('.createCatalogInInventory', {
         productType: 's',
         statusType: statusType,
         hsCode: hsCode,
         countryCode: countryCode
      });
   };

   //User Hook (do not rename)
   self.createCatalogInInventoryCheckAffirmative = function () {
      var initCriteriaProdFromCat = {
         prod: self.oeline.prod,
         whse: base.oehdr.whse,
         fieldlist: 'countryoforigin,tariffcd'
      };
      DataService.post('api/oe/asoeline/oeinitcreateprodfromcat', { data: initCriteriaProdFromCat, busy: true }, function (data) {
         if (data) {
            var hsCode;
            var countryCode;
            var statusType = self.oeline.orderasneededflag ? 'o' : 'n';
            data.forEach(function (initCreateProdResults) {
               if (initCreateProdResults.fieldname === 'tariffcd') {
                  hsCode = initCreateProdResults.fieldvalue;
               }
               if (initCreateProdResults.fieldname === 'countryoforigin') {
                  countryCode = initCreateProdResults.fieldvalue;
               }
            });

            //User Hook (do not rename)
            self.createCatalogInInventoryCheckAffirmativeContinue(hsCode, countryCode, statusType);
         }
      });
   };

   //User Hook (do not rename)
   self.createCatalogInInventoryCheckNegative = function () {
      /* If the user does not have security to enter a non-stock product
          * on the OE line and they choose to NOT create the catalog product
          * in stock, then they cannot proceed.  Give an error message and
          * force the user back to the Create question.
          */
      if (!base.sasoo.nonstockfl) {
         MessageService.alert('global.alert', 'global.operator.security.prohibits.non.stock.product.entry');
         self.createCatalogInInventoryCheck();
      } else {         
         self.checkAutoSourceNonStock();
         self.validateLine();
      }
   };

   //User Hook (do not rename)
   self.createCatalogInInventoryCheckContinue = function () {
      MessageService.yesNoCancel('global.question', 'question.create.catalog.product.in.inventory',
         function () {
            //yes callback
            //User Hook (do not rename)
            self.createCatalogInInventoryCheckAffirmative();
         }, function () {
            //no callback
            //User Hook (do not rename)
            self.createCatalogInInventoryCheckNegative();
      }, self.clearLineAndReset);
   };

   self.createCatalogInInventoryCheck = function () {
      if (self.oeline.createicspflag && (self.oeline.orderasneededflag || self.oeline.oannonstockflag)) {
         //User Hook (do not rename)
         self.createCatalogInInventoryCheckContinue();
      } else {
         self.checkAutoSourceNonStock();
         self.validateLine();
      }
   };

   self.promoPricing = function () {
      self.oeline.promoacceptcd = '';

      if (base.sasoo.promoprcwin.toLowerCase() === 'n') {
         if (base.oelineSettings.cPromoPrcDflt.toLowerCase() === 'r') {
            self.oeline.promoacceptcd = '';
         } else if (base.oelineSettings.cPromoPrcDflt.toLowerCase() === 'p') {
            self.oeline.promoacceptcd = 'p';
         } else if (self.oeline.promoprice < self.oeline.nonpromoprice && self.oeline.nonpromoprice > 0) {
            self.oeline.promoacceptcd = 'p';
         } else {
            self.oeline.promoacceptcd = '';
         }

         self.completePromoPricing();
      } else {
         var message = $translate.instant('global.promotional.price') + ': ' + self.oeline.promoprice.toFixed(2) + '<br/>' +
            $translate.instant('global.non.promotional.price') + ': ' + self.oeline.nonpromoprice.toFixed(2) + '<br/>' +
            $translate.instant('question.accept.promotional.price');
         MessageService.yesNo('global.promotional.pricing', message, function () {
            //yes callback
            self.oeline.promoacceptcd = 'p';
            self.completePromoPricing();
         }, function () {
            //no callback
            self.oeline.promoacceptcd = 'n';
            self.completePromoPricing();
         });
      }
   };

   self.completePromoPricing = function () {
      //If promo selected then reprice, otherwise, no need to reprice
      if (self.oeline.promoacceptcd.toLowerCase() === 'p') {
         if (self.oeline.selectedcatfl) {
            self.oeline.price = self.oeline.promoprice;
            //PROBABLY WILL NEED TO HAVE SOME FORM OF THIS IN THE NON-STOCK CONTROLLER
            //BoundOelineNonstock.price = BoundOeline.price;
         }
      } else if (self.oeline.promoacceptcd.toLowerCase() === 'n' && self.oeline.selectedcatflag) {
         //BoundOeLine.promoacceptcd already set to 'n', nothing to do here.
      } else {
         self.oeline.promoacceptcd = '';
      }

      self.validateLine(null, true);
   };

   self.pushDirectOrderFieldsToLine = function () {
      if (base.oehdr.oetype === 'do' && base.currentOrderTie) {
         self.oeline.dotype = base.currentOrderTie.ordertype;
         self.oeline.dovendno = base.currentOrderTie.vendno;
         self.oeline.doshipfmno = base.currentOrderTie.shipfmno;
         if (self.oeline.ordertype === 'p') {
            self.oeline.doshipviaty = base.currentOrderTie.poshipvia;
            self.oeline.doduedt = base.currentOrderTie.poduedate;
         } else if (base.currentOrderTie.ordertype === 't') {
            self.oeline.doshipviaty = base.currentOrderTie.wtshipvia;
            self.oeline.doduedt = base.currentOrderTie.wtduedate;
         }
         self.oeline.dofobfl = base.currentOrderTie.fob;
         self.oeline.doconfirmfl = base.currentOrderTie.confirm;
         self.oeline.docono = base.currentOrderTie.wtcono;
         self.oeline.dowhse = base.currentOrderTie.wtwhse;

         //User Hook (do not rename)
         if (self.pushDirectOrderFieldsToLineContinue) {
            self.pushDirectOrderFieldsToLineContinue();
         }
      }
   };

   self.pushDirectOrderFieldsToNonStockLine = function () {
      if (base.oehdr.oetype === 'do' && base.currentOrderTie) {
         self.oeline.ordertype = base.currentOrderTie.ordertype;
        
         if (self.oeline.ordertype === 'p' || self.oeline.ordertype === 'a') {
            self.oeline.vvendno = base.currentOrderTie.vendno;
            self.oeline.vshipfmno = base.currentOrderTie.shipfmno;
            self.oeline.vshipviaty = base.currentOrderTie.poshipvia;
            self.oeline.vduedt = base.currentOrderTie.poduedate;
         } else if (base.currentOrderTie.ordertype === 't') {
            self.oeline.wshipviaty = base.currentOrderTie.wtshipvia;
            self.oeline.wduedt = base.currentOrderTie.wtduedate;
            self.oeline.wwhse = base.currentOrderTie.wtwhse;
         }
         self.oeline.vfobfl = base.currentOrderTie.fob;
         self.oeline.vconfirmfl = base.currentOrderTie.confirm;         
      }
   };

   self.taxableFlagChanged = function () {
      self.oeline.nontaxtypeenabled = !self.oeline.taxablefl;
   };

   self.originalPromiseDateChanged = function () {
      self.oeline.promisedt = self.oeline.origpromisedt;
   };

   self.customerReservationsClicked = function () {
      $state.go('.customerReservations');
   };

   self.overrideRestrictionChanged = function () {
      //only want to run this if it's being checked
      if (self.oeline.restrictovrfl) {
         if (self.isAddLineMode || (!self.isAddLineMode && self.oeline.lAllowRestrictOvrFl)) {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'lines', 'restrictovrfl', '', '', null, function () {
               //auth passed callback
               self.validateLine();
            }, function () {
               //auth failed callback
               self.oeline.restrictovrfl = false;
            });
         }
      }
   };

   self.oneTimeCostClicked = function () {
      if (self.oeline.prod) {
         $state.go('.oneTimeCost',
            {
               oeline: self.oeline,
               isInquiry: false,
               okCallback: self.oneTimeCostOkCallback,
               cancelCallback: self.oneTimeCostCancelCallback
            });
      }
   };

   self.oneTimeCostOkCallback = function (newOeline) {
      if (newOeline) {
         Utils.replaceObject(self.oeline, newOeline);
         self.validateLine();
      }
      $state.go('^');
   };

   self.oneTimeCostCancelCallback = function () {
      $state.go('^');
   };

   self.oneTimeRebateClicked = function () {
      if (self.oeline.prod) {
         $state.go('.oneTimeRebate',
            {
               oeline: self.oeline,
               isInquiry: false,
               okCallback: self.oneTimeRebateOkCallback,
               cancelCallback: self.oneTimeRebateCancelCallback
            });
      }
   };

   self.oneTimeRebateOkCallback = function (newOeline) {
      if (newOeline) {
         Utils.replaceObject(self.oeline, newOeline);
      }
      $state.go('^');
   };

   self.oneTimeRebateCancelCallback = function () {
      $state.go('^');
   };

   self.supplierAccessSelected = function () {
      if (self.oeline.prod) {
         self.setupLineTie(self.navigateToSourcing);
      } else {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
      }
   };

   self.sourcingClicked = function () {
      if (self.oeline.prod) {
         self.setupLineTie(self.navigateToSourcing);
      } else {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
      }
   };

   self.warehouseAvailabilityClicked = function () {
      if (self.oeline.prod) {
         $state.go('.warehouseAvailability');
      } else {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
      }
   };

   self.crossReferenceClicked = function () {
      if (self.oeline.prod) {
         $state.go('.crossReference');
      } else {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
      }
   };

   self.nonStockClicked = function () {
      $state.go('.nonStock');
   };

   self.returnsClicked = function () {
      if (self.oeline.prod) {
         $state.go('.returns');
      } else {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
      }
   };

   self.serialsClicked = function () {
      $state.go('.serials');
   };

   self.lotsClicked = function () {
      $state.go('.lots');
   };

   self.taxJurisdictionClicked = function () {
      if (self.oeline.prod) {
         $state.go('.taxJurisdiction');
      } else {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
      }
   };

   self.commentsClicked = function () {
      self.getSubTitle();
      $state.go('.comments');
   };

   self.getSubTitle = function () {
      var subTitle = '';

      if (base.oehdr.orderno) {
         subTitle = $translate.instant('global.order.number') + Constants.LABEL_DELIMITER +
            base.oehdr.orderno + '-' + Utils.pad(base.oehdr.ordersuf, 2) + Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.line.number') + Constants.LABEL_DELIMITER + self.oeline.lineno;
      }
      return subTitle;
   };

   self.rebateClicked = function () {
      $state.go('.rebate');
   };

   self.correctionClicked = function () {
      $state.go('.correction');
   };

   self.customerProductClicked = function () {
      self.getCustomerProductTabDetails(true);
   };

   self.warehouseManagerClicked = function () {
      var wmBinAssignCriteria = {
         altwhse: self.oeline.altwhse,
         currproc: 'oeet',
         jrnlno: 0,
         kitfl: self.oeline.kitfl,
         lineno: self.oeline.lineno,
         ourproc: 'oeetl',
         ordertype: 'o',
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         returnfl: self.oeline.returnfl,
         potype: '',
         prod: self.oeline.prod,
         seqno: 0,
         skipnonkitlogic: false,
         stkqtyship: self.oeline.stkqtyship,
         stkqtyrcv: 0,
         unit: self.oeline.unit,
         vamodule: '',
         wmadjtype: 'sell',
         wmqtyrcv: 0,
         whse: base.oehdr.whse
      };

      $state.go('.bin-allocation', {
         criteria: wmBinAssignCriteria,
         binAllocationDisabled: false,
         submittedCallback: 'ale.binAllocationSavedCallback',
         actionsCallback: 'ale.binAllocationActionsCallback'
      });
   };

   self.ediErrExcClicked = function () {
      $state.go('.ediErrExc');
   };

   self.pricingClicked = function () {
      $state.go('.pricing');
   };

   self.kitsClicked = function () {
      $state.go('.kit', { updateFromKitCallback: self.updateFromKitCallback });
   };

   self.fabKitInfoClicked = function () {
      $state.go('.fabKitInfo', { fromSerials: false });
   };

   self.talliesClicked = function () {
      $state.go('.tallies');
   };

   self.bundlesClicked = function () {
      $state.go('.bundles');
   };

   self.manualRebateClicked = function () {
      $state.go('.manualRebate');
   };

   self.supersedesClicked = function () {
      self.initiateSupersedes('onTabClick');
   };

   self.substitutesClicked = function () {
      self.initiateSubstituteProducts(true);
   };

   self.ediErrExcBack = function () {
      $state.go('^');
   };

   self.binAllocationSavedCallback = function (wmBinAssignment) {
      self.oeline.wmqtyship = wmBinAssignment.wmqtyship;
      MessageService.info('global.information', 'message.warehouse.manager.data.accepted');
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmBinAssignment) {
      self.oeline.wmqtyship = wmBinAssignment.wmqtyship;
   };

   self.setupLineTie = function (callback) {
      var lineTieTypeCriteria = {
         runmode: 'line',
         ourproc: Constants.MENU_FUNCTION_OEET,
         whse: base.oehdr.whse,
         transtype: base.oehdr.oetype,
         product: self.oeline.prod,
         specnstype: self.oeline.specnstype,
         botype: self.lineTie && self.lineTie.backordertype ? self.lineTie.backordertype : self.oeline.botype,
         returnfl: self.oeline.returnfl,
         returnty: self.oeline.returnty
      };

      //User Hook (do not rename)
      if (self.setupLineTieCriteria) {
         self.setupLineTieCriteria(lineTieTypeCriteria);
      }

      DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (data) {
         if (data) {
            self.orderTypes = base.getOrderTypesFromTieDropdownData(data);

            base.orderTieHeader = {
               orderdisp: base.oehdr.orderdisp,
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               ourproc: Constants.MENU_FUNCTION_OEET,
               runmode: 'line',
               transtype: base.oehdr.oetype,
               whse: base.oehdr.whse
            };

            var lineTieRetrieveRequest = {
               oeline: self.oeline,
               oelinelinetiehdr: base.orderTieHeader
            };
            DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(self.lineTie, data[0]);

                  self.originalOrderAltNo = self.lineTie.orderaltno;
                  self.originalOrderType = self.lineTie.ordertype;

                  //return lines can only be tied to POs
                  if (self.oeline.returnfl) {
                     self.lineTie.ordertype = 'p';
                  }
                  if (callback) {
                     callback();
                  }
               }
            });
         }
      });
   };

   self.navigateToSourcing = function () {
      if (!self.isSourcingLimitShipVia) {
         self.isSourcingLimitShipVia = false;
      }
      $state.go(base.baseState + '.selectProducts.advancedLineEntry.sourcing', {
         oehdr: base.oehdr,
         tie: self.lineTie,
         tieOrderAltNoRef: 'ale.lineTie.orderaltno',
         oeline: self.oeline,
         orderTypes: 'ale.orderTypes',
         isLimitShipVia: 'ale.isSourcingLimitShipVia',
         sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
         cancelCallback: self.setupLineTie,
         finishCallback: self.sourcingFinishCallback,
         backCallback: self.sourcingBackCallback,
         supplierAccessData: self.supplierAccessData,
         conoForIcWhseAvailCriteria: base.conoForIcWhseAvailCriteria,
         whseTypeForIcWhseAvailCriteria: base.whseTypeForIcWhseAvailCriteria,
         showDocDisposition: true
      });
   };

   self.sourcingBackCallback = function (fromReturns) {
      self.hasSourcingBeenAccessed = true;
      if (fromReturns) {
         $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns', { fromSourcing: true });
      } else {
         $state.go('^');
      }
   };

   self.sourcingFieldChangedCallback = function (fieldName, callback) {
      //MAY HAVE TO IMPLEMENT THE SKIP SOURCING BOOLEAN. WILL NEED TO TEST WHETHER SETTING THE self.lineTie TRIGGERS CALLS FOR EACH CHANGE
      //IF SO, START WITH THIS: if(!isSkipSourcingFieldChange)
      //checks for limiting ship via
      if ((fieldName === 'shipfmno' || fieldName === 'orderaltno') && self.lineTie.shipfmno && self.lineTie.vendno) {
         self.checkLimitShipViaApss();
      }
      if ((fieldName === 'vendno' || fieldName === 'orderaltno') && self.lineTie.vendno) {
         self.checkLimitShipViaApsv();
      }
      if (fieldName === 'ordertype' || fieldName === 'orderaltno') {
         self.isLimitShipVia = true;
      }

      //checks to see if the tie has been broken
      var tieIsBroken = false;
      if (fieldName === 'orderaltno' && self.lineTie.ordertype !== 'n' && self.lineTie.orderaltno === 0 && self.originalOrderAltNo !== self.lineTie.orderaltno) {
         //clearing the Order Alt # and it isn't a NO SOURCING and the sourcing previously wasn't untied (i.e. zero order)
         tieIsBroken = true;
      }
      if (fieldName === 'ordertype' && self.lineTie.ordertype === 'n' && self.originalOrderType !== 'n') {
         //the order type was changed from SOMETHING to NO SOURCING
         tieIsBroken = true;
      }
      if (fieldName === 'ordertype' && self.lineTie.ordertype !== 'n' && self.originalOrderType !== 'n' && self.originalOrderType !== self.lineTie.ordertype) {
         //The order type was changed from SOMETHING, other than NO SOURCING, but wasn't originally NO SOURCING
         tieIsBroken = true;
      }

      if (tieIsBroken) {
         if (1 < base.oehdr.stagecd < 9) {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'ties', 'break-ties', '', '', fieldName, function () {
               //auth passed callback
               self.sourceFieldChangedContinue(fieldName);
            }, function () {
               //auth failed callback
               self.lineTie.orderaltno = self.originalOrderAltNo;
               self.lineTie.ordertype = self.originalOrderType;
            });
         } else if (base.oehdr.stagecd === 1) {
            AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'ties', 'break-ties-opn', '', '', fieldName, function () {
               //auth passed callback
               self.sourceFieldChangedContinue(fieldName);
            }, function () {
               //auth failed callback
               self.lineTie.orderaltno = self.originalOrderAltNo;
               self.lineTie.ordertype = self.originalOrderType;
            });
         } else {
            self.sourceFieldChangedContinue(fieldName, callback);
         }
      } else {
         //the whole "shipviainlinety" needs to be fleshed out see OESourcingControl.cs lines 675-684. I think I missed some things on the sourcing screen first time through.
         if (fieldName !== 'shipviainlinety') {
            self.sourceFieldChangedContinue(fieldName, callback);
         }
      }
   };

   self.sourceFieldChangedContinue = function (fieldName, callback) {
      var savedBoType;
      if (fieldName === 'ordertype') {
         savedBoType = self.lineTie.backordertype;
         if (self.supplierAccessData.vendno) {
            self.lineTie.vendno = self.supplierAccessData.vendno;
            self.oeline.vendno = self.supplierAccessData.vendno;
            self.oeline.vvendno = self.supplierAccessData.vendno;
            self.oeline.vshipfmno = self.supplierAccessData.shipfmno;
         }
      }

      //the whole "shipviainlinety" needs to be fleshed out see OESourcingControl.cs lines 675-684. I think I missed some things on the sourcing screen first time through.
      if (fieldName === 'shipviainlinety') {
         fieldName = 'shipviaty';
         if (self.lineTie.poshipvia !== self.lineTie.shipviainlinety) {
            self.lineTie.poshipvia = self.lineTie.shipviainlinety;
         }
      }

      var lineTieLeaveFieldRequest = {
         oeline: self.oeline,
         oelinelinetie: self.lineTie,
         oelinelinetiehdr: base.orderTieHeader,
         cFieldName: fieldName
      };
      DataService.post('api/oe/asoeline/oelinelinetieleavefield', { data: lineTieLeaveFieldRequest, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data.messaging);

            if (self.lineTie.pofrtbillacct) {
               //we don't want to show this popup if this is the 'vendno' field because it'll be showing the default value, and a warning is meaningless.
               if ((fieldName === 'shipviaty' || fieldName === 'frttermscd') && self.lineTie.pofrtbillacct !== data.oelinelinetie.pofrtbillacct) {
                  var freightBillAccountMessage = $translate.instant('message.the.freight.bill.account.is.changing.from');
                  if (self.lineTie.pofrtbillacct) {
                     freightBillAccountMessage += ' ' + self.lineTie.pofrtbillacct + ' ';
                  } else {
                     freightBillAccountMessage += ' ' + $translate.instant('global.blank.in.parenthesis') + '.\n';
                  }
                  freightBillAccountMessage += $translate.instant('global.to');
                  if (data.oelinelinetie.pofrtbillacct) {
                     freightBillAccountMessage += ' ' + data.oelinelinetie.pofrtbillacct + ' ';
                  } else {
                     freightBillAccountMessage += ' ' + $translate.instant('global.blank.in.parenthesis') + '.\n';
                  }
                  freightBillAccountMessage += $translate.instant('question.do.you.wish.to.continue');

                  MessageService.yesNo('global.question', freightBillAccountMessage, function () {
                     //yes callback
                     Utils.replaceObject(self.lineTie, data.oelinelinetie);
                  }, null);
               } else {
                  Utils.replaceObject(self.lineTie, data.oelinelinetie);
               }
            } else {
               Utils.replaceObject(self.lineTie, data.oelinelinetie);
            }

            if (fieldName === 'ordertype' && savedBoType) {
               self.lineTie.backordertype = savedBoType;
            }

            if (self.isLimitShipVia) {
               if ((fieldName === 'ordertype' || fieldName === 'shipfmno' || fieldName === 'orderaltno') && self.lineTie.shipfmno && self.lineTie.vendno) {
                  self.checkLimitShipViaApss();
               }
               if ((fieldName === 'ordertype' || fieldName === 'vendno' || fieldName === 'orderaltno') && self.lineTie.vendno) {
                  self.checkLimitShipViaApsv();
               }
            }

            if (fieldName === 'botype') {
               self.originalOrderType = self.lineTie.ordertype;
               self.resetSourcingOrderTypes();
            }

            //User Hook (do not rename)
            if (self.oeLineLineTieLeaveFieldContinue) {
               self.oeLineLineTieLeaveFieldContinue(data);
            }

            if (callback) {
               callback();
            }
         }
      });
   };

   self.resetSourcingOrderTypes = function () {
      var lineTieTypeCriteria = {
         runmode: 'line',
         ourproc: Constants.MENU_FUNCTION_OEET,
         whse: base.oehdr.whse,
         transtype: base.oehdr.oetype,
         product: self.oeline.prod,
         specnstype: self.oeline.specnstype,
         botype: self.lineTie && self.lineTie.backordertype ? self.lineTie.backordertype : self.oeline.botype,
         returnfl: self.oeline.returnfl,
         returnty: self.oeline.returnty
      };
      DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (data) {
         if (data) {
            self.orderTypes = base.getOrderTypesFromTieDropdownData(data);
         }
      });
   };

   self.checkLimitShipViaApss = function () {
      self.isLimitShipVia = false;
      var params = {
         vendno: self.lineTie.vendno,
         shipfmno: self.lineTie.shipfmno,
         fldlist: 'limitshipvia'
      };

      DataService.get('api/ap/apss/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.isSourcingLimitShipVia = data.limitshipvia;
         }
      });
   };

   self.checkLimitShipViaApsv = function () {
      self.isLimitShipVia = false;

      var params = {
         vendno: self.lineTie.vendno,
         fldlist: 'limitshipvia'
      };
      DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.isSourcingLimitShipVia = data.limitshipvia;
         }
      });
   };

   self.sourcingFinishCallback = function (fromReturns, autoSourcing) {
      if ((base.sasoo.oetietype === 'n' && (self.lineTie.ordertype === 'p' || self.lineTie.ordertype === 't')) ||
         ((base.sasoo.oetietype === 'p' && self.lineTie.ordertype === 't') || (base.sasoo.oetietype === 't' && self.lineTie.ordertype === 'p'))) {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'ties', 'type', '', '', null, function () {
            self.sourcingValidationAuthPoint2(fromReturns, autoSourcing);
         }, null);
      } else {
         self.sourcingValidationAuthPoint2(fromReturns, autoSourcing);
      }
   };

   self.sourcingValidationAuthPoint2 = function (fromReturns, autoSourcing) {
      if ((base.sasoo.oetietype === 'n' && (self.lineTie.backordertype === 'd' || self.lineTie.backordertype === 'p')) ||
         (base.sasoo.oetietype === 't') && self.lineTie.backordertype === 'p') {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'ties', 'disposition', '', '', null, function () {
            self.sourcingFinishContinue(fromReturns, autoSourcing);
         }, null);
      } else {
         self.sourcingFinishContinue(fromReturns, autoSourcing);
      }
   };

   self.sourcingFinishContinue = function (fromReturns, autoSourcing) {
      var lineTieValidateRequest = {
         oeline: self.oeline,
         oelinelinetie: self.lineTie,
         oelinelinetiehdr: base.orderTieHeader
      };
      DataService.post('api/oe/asoeline/oelinelinetievalidate', { data: lineTieValidateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.hasSourcingBeenAccessed = true;
               Utils.replaceObject(self.lineTie, data.oelinelinetie);
               Utils.replaceObject(self.oeline, data.oeline);

               self.moveTieDataToOeline(self.lineTie);

               if (self.lineTie.restrictovrfl && self.lineTie.restricterrmess) {
                  MessageService.info('global.information', self.lineTie.restricterrmess);

                  AuthService.createAuthPoint('poet', 'lines', 'restrictovrfl', '', '', null, function () {
                     //auth passed callback
                     self.lineTie.restricterrmess = '';
                     self.oeline.srcrestricterrmess = '';
                     self.validateLine(function () {
                        if (!autoSourcing) {
                           MessageService.info('global.information', 'message.sourcing.data.has.been.accepted');
                        }
                        if (fromReturns) {
                           $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns', { fromSourcing: true });
                        } else {
                           $state.go('^');
                        }
                     });
                  }, function () {
                     //auth failed callback
                     self.lineTie.restrictovrfl = false;
                     self.oeline.srcrestrictovrfl = false;
                  });
               } else {
                  self.validateLine(function () {
                     if (!autoSourcing) {
                        MessageService.info('global.information', 'message.sourcing.data.has.been.accepted');
                     }
                     if (fromReturns) {
                        $state.go(base.baseState + '.selectProducts.advancedLineEntry.returns', { fromSourcing: true });
                     } else if (autoSourcing) {
                        //do nothing
                     } else {
                        $state.go('^');
                     }
                  }, true);
               }
            }
         }
      });
   };

   self.moveTieDataToOeline = function (oeTie) {
      self.oeline.botype = oeTie.backordertype;
      self.oeline.copycommentfl = oeTie.copycommentfl;
      self.oeline.mvname = oeTie.manualname;
      self.oeline.origvano = oeTie.vano;
      self.oeline.origvasuf = oeTie.vasuf;
      self.oeline.orderaltno = oeTie.orderaltno;
      self.oeline.powtintfl = oeTie.powtintfl;
      self.oeline.powtnew = oeTie.powtnew;
      self.oeline.vawhse = oeTie.vawhse;
      self.oeline.vaddr1 = oeTie.manualaddr1;
      self.oeline.vaddr2 = oeTie.manualaddr2;
      self.oeline.vaddr3 = oeTie.manualaddr3;
      self.oeline.vcity = oeTie.manualcity;
      self.oeline.vconfirmfl = oeTie.confirm;
      self.oeline.vduedt = oeTie.poduedate;
      self.oeline.verno = oeTie.verno;
      self.oeline.vfobfl = oeTie.fob;
      self.oeline.vfrtbillacct = oeTie.pofrtbillacct;
      self.oeline.vfrttermscd = oeTie.pofrttermscd;
      self.oeline.vtransferloc = oeTie.potransferloc;
      self.oeline.vstate = oeTie.manualstate;
      self.oeline.vshipfmno = oeTie.shipfmno;
      self.oeline.vshipviaty = oeTie.poshipvia;
      self.oeline.vvendno = oeTie.vendno;
      self.oeline.wwhse = oeTie.wtwhse;
      self.oeline.wduedt = oeTie.wtduedate;
      self.oeline.wcono = oeTie.wtcono;
      self.oeline.wshipviaty = oeTie.wtshipvia;
      self.oeline.vzipcd = oeTie.manualzipcd;
      self.oeline.srcrestricterrmess = oeTie.restricterrmess;
      self.oeline.srcrestrictovrfl = oeTie.restrictovrfl;

      if (self.oeline.returnfl && self.oeline.ordertype.toLowerCase() === 'p') {
         self.oeline.vendretauth = oeTie.vendretauth;
      }

      if (oeTie.ordertype.toLowerCase() === 'n') {
         self.oeline.ordertype = '';
      } else {
         self.oeline.ordertype = oeTie.ordertype;
      }

      if (self.oeline.botype.toLowerCase() === 'd') {
         self.oeline.qtyship = 0;
         self.oeline.usagefl = self.oeline.ordertype.toLowerCase() === 't';
      }

      if (self.oeline.botype.toLowerCase() === 'p' && self.oeline.ordertype.toLowerCase() === 'p') {
         self.oeline.qtyship = self.oeline.qtyord;
      }

      //User Hook (do not rename)
      if (self.moveTieDataToOelineContinue) {
         self.moveTieDataToOelineContinue(oeTie);
      }
   };

   self.preAddAuthCheck = function (finish) {
      var isSellFirst = base.oehdr.oetype.toLowerCase() === 'so' && self.oeline.lAuthPointApplies && !self.oeline.changefl ? true : false;
      // Check for Not Allowed Qty Avail < Ord for DNR products
      if (!self.oeline.superwhseusefl &&
         self.oeline.stkqtyord > self.oeline.netavail &&
         self.oeline.icswstatustype.toLowerCase() === 'x' && !isSellFirst) {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'lines', 'product', '', '', '', function () {
            self.preAddUseCaseCheck(finish);
         }, null);
      } else if (isSellFirst) {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'Super/Sub Availability', 'qtyord', 'a', '', '', function () {
            self.preAddUseCaseCheck(finish);
         }, null);
      }
      else {
         self.preAddUseCaseCheck(finish);
      }
   };

   //User Hook (do not rename)
   self.qualifyCounterSalePhysicalCount = function () {
      return (base.oehdr.oetype.toLowerCase() === 'cs' &&
         self.isQtyShipChanged &&
         self.oeline.specnstype.toLowerCase() !== 'n' &&
         self.oeline.icspstatustype.toLowerCase() !== 'l' &&
         !self.oeline.kitfl);
   };

   //User Hook (do not rename)
   self.qualifyCounterSaleSerials = function () {
      return (base.oehdr.oetype.toLowerCase() === 'cs' && self.oeline.serlottype.toLowerCase() === 's');
   };

   //User Hook (do not rename)
   self.qualifyCounterSaleLots = function () {
      return (base.oehdr.oetype.toLowerCase() === 'cs' && self.oeline.serlottype.toLowerCase() === 'l');
   };

   //User Hook (do not rename)
   self.qualifyCounterSaleKit = function () {
      return (base.oehdr.oetype.toLowerCase() === 'cs' && self.oeline.kitfl);
   };

   //User Hook (do not rename)
   self.qualifyCounterSaleWM = function () {
      return (base.oehdr.oetype.toLowerCase() === 'cs' && self.oeline.wmfl && self.oeline.wmqtyship !== self.oeline.stkqtyship);
   };

   //User Hook (do not rename)
   self.qualifyDirtyCore = function () {
      return (self.oeline.coreprodtype.toLowerCase() === 'c' && !self.oeline.returnfl && self.oeline.specnstype.toLowerCase() !== 'l' &&
         (base.oehdr.oetype.toLowerCase() === 'so' || base.oehdr.oetype.toLowerCase() === 'rm' ||
            base.oehdr.oetype.toLowerCase() === 'do' || base.oehdr.oetype.toLowerCase() === 'cs'));
   };

   //User Hook (do not rename)
   self.qualifyOther = function () {
      //Intentionally false, to be used by Extensibility.
      return false;
   };

   //User Hook (do not rename)
   self.qualifyOtherProcessing = function () {
      //Intentionally left blank, to be used by Extensibility.
   };

   self.preAddUseCaseCheck = function (finish) {
      if (self.qualifyCounterSalePhysicalCount()) { //Require Physical Count use case
         MessageService.yesNo('global.question', 'question.require.physical.count', function () {
            //yes callback
            self.oeline.countfl = true;
            if (self.isAddLineMode) {
               self.createLine(finish);
            } else {
               self.updateLine(finish);
            }
         }, function () {
            //no callback
            if (self.isAddLineMode) {
               self.createLine(finish);
            } else {
               self.updateLine(finish);
            }
         });
      } else if (self.qualifyCounterSaleSerials()) { //Unassigned Serials use case
         if (self.oeline.nosnlots > 0) {
            MessageService.alert('global.alert', 'message.all.shipped.serial.products.must.have.serial.numbers');
            self.serialsClicked();
         } else {
            if (self.isAddLineMode) {
               self.createLine(finish);
            } else {
               self.updateLine(finish);
            }
         }
      } else if (self.qualifyCounterSaleLots()) { //Unassigned Lots use case
         if (self.oeline.nosnlots > 0) {
            MessageService.alert('global.alert', 'message.all.shipped.lot.products.must.have.lot.numbers.assigned');
            $state.go('.lots');
         } else {
            if (self.isAddLineMode) {
               self.createLine(finish);
            } else {
               self.updateLine(finish);
            }
         }
      } else if (self.qualifyCounterSaleKit()) { //Unassigned Serials/Lots On Kit Components use case
         if (self.oeline.nosnlotsk > 0) {
            MessageService.alert('global.alert', 'message.all.shipped.serial.lot.components.must.be.assigned');
         } else {
            if (self.isAddLineMode) {
               self.createLine(finish);
            } else {
               self.updateLine(finish);
            }
         }
      } else if (self.qualifyCounterSaleWM()) {
         self.warehouseManagerClicked();
      } else if (self.qualifyDirtyCore()) {
         MessageService.yesNo('global.non.return.dirty.core', 'question.selling.as.a.normal.product', function () {
            //yes callback
            self.createLine(finish);
         }, null);
      } else if (self.qualifyOther()) {
         //User Hook (do not rename)
         self.qualifyOtherProcessing();
      } else {
         if (self.isAddLineMode) {
            self.createLine(finish);
         } else {
            self.updateLine(finish);
         }
      }
   };

   //User Hook (do not rename)
   self.createLineContinue = function (poNumber) {
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
   };

   self.createLine = function (finish) {
      //User Hook (do not rename)
      if (self.setCreateLineCriteria) {
         self.setCreateLineCriteria();
      }
      var changedFieldsList = Utils.deepCompare(self.baseOeline, self.oeline);

      // If the order was sourced to VA make sure that we pass verno otherwise
      // the VA order may be created using the wrong version
      if (self.oeline.ordertype.toLowerCase() === 'f' && !changedFieldsList.includes('verno')) {
         changedFieldsList += ',verno';
      }

      // changed programatically in non-stock entry
      if (self.nonStockTaxChanged) {
         if (!changedFieldsList.includes('taxablefl')) {
            changedFieldsList += ',taxablefl';
         }
         if (!changedFieldsList.includes('nontaxtype')) {
            changedFieldsList += ',nontaxtype';
         }
         if (!changedFieldsList.includes('taxgroup')) {
            changedFieldsList += ',taxgroup';
         }
         self.nonStockTaxChanged = false;
      }

      var lineCreateRequest = {
         oelineassembly: self.assemblyCollection,
         oeline: self.oeline,
         lMaintMode: base.isAddOrderMode,
         cChangeList: changedFieldsList
      };
      DataService.post('api/oe/asoeline/oelinecreate', { data: lineCreateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //If update message is not 'ok' and no error was returned, the line was not committed
               if (data.cUpdateMessage.toLowerCase() !== 'ok') {
                  var questionMessageText = MessageService.getQuestionMessages(data.messaging);
                  //if there was a question message, show it
                  if (questionMessageText) {
                     MessageService.yesNo('global.question', questionMessageText, function () {
                        //yes callback
                        self.oeline.eccnallowblankfl = true;
                        self.createLine();
                     }, function () {
                        //no callback
                        self.oeline.eccnallowblankfl = false;
                        self.cancel();
                     });
                  }
                  //if no question, proceed with update not ok processing
                  if (data.oeline) {
                     Utils.replaceObject(self.oeline, data.oeline);
                     self.updateNotOkProcessing();
                     return;
                  }
               }

               //if we created a PO or KP or VA or WT, add it to the MRU
               data.messaging.forEach(function (message) {
                  var poNumber;
                  if (message.messagetxt.includes('Purchase Order #')) {
                     var pomatch = /\d+/.exec(message.messagetxt);
                     if (pomatch[0]) {
                        poNumber = pomatch[0];

                        //User Hook (do not rename)
                        self.createLineContinue(poNumber);
                     }
                  } else if (message.messagetxt.includes('Warehouse Transfer #')) {
                     var wtNumber;
                     var wtmatch = /\d+/.exec(message.messagetxt);
                     if (wtmatch[0]) {
                        wtNumber = wtmatch[0];

                        var getWtehParams = {
                           wtno: wtNumber,
                           wtsuf: 0,
                           fldlist: 'rowpointer,wtno,wtsuf'
                        };
                        wtNumber += '-00';
                        DataService.get('api/wt/wteh/getbypk', { params: getWtehParams, busy: true }, function (data) {
                           if (data) {
                              MruService.addToList('WTOrder', data.rowpointer, wtNumber, data.wtno, data.wtsuf);
                           }
                        });
                     }
                  } else if (message.messagetxt.includes('Value Add Order #')) {
                     var vaNumber;
                     var vamatch = /\d+/.exec(message.messagetxt);
                     if (vamatch[0]) {
                        vaNumber = vamatch[0];

                        var getVaehParams = {
                           vano: vaNumber,
                           vasuf: 0,
                           fldlist: 'rowpointer,vano,vasuf'
                        };
                        vaNumber += '-00';
                        DataService.get('api/va/vaeh/getbypk', { params: getVaehParams, busy: true }, function (data) {
                           if (data) {
                              MruService.addToList('VAOrder', data.rowpointer, vaNumber, data.vano, data.vasuf);
                           }
                        });
                     }
                  } else if (message.messagetxt.includes('Work Order #')) {
                     var woNumber;
                     var womatch = /\d+/.exec(message.messagetxt);
                     if (womatch[0]) {
                        woNumber = womatch[0];

                        var getKpetParams = {
                           wono: woNumber,
                           wosuf: 0,
                           fldlist: 'rowpointer,wono,wosuf'
                        };
                        woNumber += '-00';
                        DataService.get('api/kp/kpet/getbypk', { params: getKpetParams, busy: true }, function (data) {
                           if (data) {
                              MruService.addToList('KPWorkOrder', data.rowpointer, woNumber, data.wono, data.wosuf);
                           }
                        });
                     }
                  }
               });

               //User Hook (do not rename)
               if (self.oeLineCreateCallbackContinue) {
                  self.oeLineCreateCallbackContinue(data);
               }

               //VAET hop if sourcing to a VA
               if (self.oeline.ordertype.toLowerCase() === 'f' &&
                  (base.oelineSettings.cVaWorkFlow.toLowerCase() === 'a' ||
                     base.oelineSettings.cVaWorkFlow.toLowerCase() === 'b' ||
                     base.oelineSettings.cVaWorkFlow.toLowerCase() === 'p')) {
                  var vaNumber = 0;
                  var vaSuffix = 0;
                  var wtNumber = 0;

                  data.messaging.forEach(function (message) {
                     if (message.messagetxt.includes('Value Add Order #')) {
                        var vaMatch = /\d+-?\d+/.exec(message.messagetxt);
                        if (vaMatch[0].includes('-')) {
                           var splitVaNumber = vaMatch[0].split('-');
                           // Grab the vaNumber from the sourcing message
                           vaNumber = splitVaNumber[0];
                           vaSuffix = splitVaNumber[1];
                        } else {
                           vaNumber = vaMatch[0];
                        }
                     } else if (message.messagetxt.includes('Warehouse Transfer #')) {
                        var wtmatch = /\d+/.exec(message.messagetxt);
                        if (wtmatch[0]) {
                           wtNumber = wtmatch[0];
                        }
                     }
                  });
                  if (!vaNumber && data.oeline.orderaltno && data.oeline.ordertype.toLowerCase() === 'f') {
                     vaNumber = data.oeline.orderaltno;
                     vaSuffix = 0;
                  }

                  /*
                   * If the wtNumber is not 0 then get the current oeel that was just updated.
                   * Then from the oeel grab the wt# == orderaltno and the wtlineno == linealtno.
                   * Then get the WTEL, WTEL.orderaltno = VA#, then open VAET.
                   */
                  if (wtNumber) {
                     var params = {
                        orderno: base.oehdr.orderno,
                        ordersuf: base.oehdr.ordersuf,
                        lineno: self.oeline.lineno,
                        fldlist: 'orderaltno,linealtno'
                     };

                     //These calls will be replaced by a new SI call that returns the VA#
                     DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
                        if (data) {
                           var wtLineRetrieveCriteria = {
                              wtno: data.orderaltno,
                              wtsuf: 0,
                              lineno: data.linealtno
                           };
                           DataService.post('api/wt/aswtline/wtlineretrieve', { data: wtLineRetrieveCriteria, busy: true }, function (data) {
                              if (data && data.wtline) {
                                 if (data.wtline.orderaltno) {
                                    $state.go('vaet.detail', { vaNumber: data.wtline.orderaltno, vaSuffix: 0, rollupCallback: self.updateLineFromVa, goDirectlyToRollUp: base.oelineSettings.cVaWorkFlow.toLowerCase() === 'p' });
                                 }
                              }
                           });
                        }
                     });
                  }

                  // if the order was just sourced to VA then open VAET - the rollup window will open
                  // when they close VAET
                  if (vaNumber) {
                     $state.go('vaet.detail', { vaNumber: vaNumber, vaSuffix: vaSuffix, rollupCallback: self.updateLineFromVa, goDirectlyToRollUp: base.oelineSettings.cVaWorkFlow.toLowerCase() === 'p' });
                  }
               }
               //if the line was a Kit, run OELineCompTieUpdate to make sure that any sourced components get appropriate ties created
               if (self.oeline.kitfl && self.kitComponentSourcingHeader && self.kitComponentSourcingCollection.length > 0) {
                  self.checkLineCompTieUpdate();
               }

               if (data.oeline.options) {
                  DataService.get('api/oe/asoeline/oelineoptprodlist/' + self.isAddLineMode + '/' + base.oehdr.orderno + '/' + base.oehdr.ordersuf + '/' + self.oeline.lineno, { busy: true }, function (data) {
                     if (data.cWarningMessage) {
                        MessageService.alert('global.warning', data.cWarningMessage);
                     }
                     if (data && data.oelineoptprodresults && data.oelineoptprodresults.length > 0) {
                        $state.go('.optionalProducts', { optionalProduct: data.oelineoptprod, optionalProductResults: data.oelineoptprodresults });
                     }
                  });
               }

               if (finish) {

                  // Retotal order based on (O)rdered, (S)hipped or (B)oth
                  base.calcsob = 'o';
                  base.updateLineItems(base.finishOrder, null, 'addSingle', self.oeline.lineno);
               } else {

                  // If using AvaTax, don't calculate taxes on each line add
                  // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
                  if (base.taxMethodType.toLowerCase() === 'a') {
                     base.calcsob = 'x';
                  } else {
                     base.calcsob = 'o';
                  }

                  //have to fire updateLineItems first because we lose the lineno when we clear line in easyLineEntry
                  if (self.isFromEasy) {
                     base.updateLineItems(null, null, 'addSingle', self.oeline.lineno);
                     self.easyLineEntry();
                  } else {
                     base.updateLineItems(self.initializeLine, null, 'addSingle', self.oeline.lineno);
                     self.resetLine();
                     self.view.applyAutoFocus();
                  }
               }
            } else {
               //ensure that values on oeline are reset (could have been changed in Tax Jurisdiction screen)
               self.oeline.orderaltno = self.baseOeline.orderaltno;
               self.oeline.botype = self.baseOeline.botype;
               self.oeline.powtintfl = self.baseOeline.powtintfl;
               self.oeline.ordertype = self.baseOeline.ordertype;

               //need to reset baseOeline in case of an error, this way if we change fields back to their original state then they can get into the changedfields
               Utils.replaceObject(self.baseOeline, self.oeline);
            }
         }
      });
   };

   self.updateNotOkProcessing = function () {
      if (self.oeline.kitfl && !self.oeline.cfgkitfl && (self.oeline.kitrequiredflag || self.oeline.kitnonstockreqflag)) {
         MessageService.alert('global.alert', 'message.required.options.or.keywords.have.not.been.entered');
         self.kitsClicked();
      }

      if (self.oeline.forcetallymix) {
         if (self.oeline.reqbundleidfl) {
            self.bundlesClicked();
         } else {
            self.talliesClicked();
         }
      }

      if (self.oeline.forceserlotdialog && self.oeline.forceserlot) {
         self.oeline.forceserlot = false;
         MessageService.alert('global.information', 'global.serial.lot.numbers.outstanding');

         if (self.oeline.serlottype.toLowerCase() === 'l') {
            self.lotsClicked();
         } else {
            self.serialsClicked();
         }
      }

      if (self.oeline.kitfl && !self.oeline.cfgkitfl && self.oeline.forceserlotkitdialog && self.oeline.forceserlotkit) {
         self.oeline.forceserlotkit = false;
         MessageService.alert('global.information', 'global.serial.lot.numbers.outstanding.in.kit.components');
         self.kitsClicked();
      }

      if (self.oeline.forcekitwm) {
         self.oeline.forcekitwm = false;
         MessageService.alert('global.alert', 'message.warehouse.manager.bins.are.not.fully.allocated');
         self.kitsClicked();
      }

      if (self.oeline.srcrestrictovrfl && self.oeline.srcrestricterrmess) {
         MessageService.info(self.oeline.srcrestricterrmess);

         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'poet', 'lines', 'restrictovrfl', '', '', function () {
            //yes callback
            self.oeline.srcrestricterrmess = '';
            if (self.isAddLineMode) {
               self.createLine();
            } else {
               self.updateLine();
            }
         }, function () {
            //no callback
            //setting this forces the next oeline SI call to recheck the sourcing restriction logic
            self.oeline.srcrestrictovrfl = false;
         });
      }
   };

   self.checkLineCompTieUpdate = function () {
      var compTieUpdateRequest = {
         oelinelinetie: self.kitComponentSourcingCollection,
         oeline: self.oeline,
         oelinelinetiehdr: self.kitComponentSourcingHeader
      };
      DataService.post('api/oe/asoelineextra/oelinecomptieupdate', { data: compTieUpdateRequest, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data);
         }

         //clear the kit component sourcing data
         self.kitComponentSourcingHeader = null;
         self.kitComponentSourcingCollection = null;
      });
   };

   self.addSourcingOrdersToMRU = function (messaging) {
      if (messaging) {
         //if we created a PO or KP or VA or WT, add it to the MRU
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
            } else if (message.messagetxt.includes('Warehouse Transfer #')) {
               var wtNumber;
               var wtmatch = /\d+/.exec(message.messagetxt);
               if (wtmatch[0]) {
                  wtNumber = wtmatch[0];

                  var getWtehParams = {
                     wtno: wtNumber,
                     wtsuf: 0,
                     fldlist: 'rowpointer,wtno,wtsuf'
                  };
                  wtNumber += '-00';
                  DataService.get('api/wt/wteh/getbypk', { params: getWtehParams, busy: true }, function (data) {
                     if (data) {
                        MruService.addToList('WTOrder', data.rowpointer, wtNumber, data.wtno, data.wtsuf);
                     }
                  });
               }
            } else if (message.messagetxt.includes('Value Add Order #')) {
               var vaNumber;
               var vamatch = /\d+/.exec(message.messagetxt);
               if (vamatch[0]) {
                  vaNumber = vamatch[0];

                  var getVaehParams = {
                     vano: vaNumber,
                     vasuf: 0,
                     fldlist: 'rowpointer,vano,vasuf'
                  };
                  vaNumber += '-00';
                  DataService.get('api/va/vaeh/getbypk', { params: getVaehParams, busy: true }, function (data) {
                     if (data) {
                        MruService.addToList('VAOrder', data.rowpointer, vaNumber, data.vano, data.vasuf);
                     }
                  });
               }
            } else if (message.messagetxt.includes('Work Order #')) {
               var woNumber;
               var womatch = /\d+/.exec(message.messagetxt);
               if (womatch[0]) {
                  woNumber = womatch[0];

                  var getKpetParams = {
                     wono: woNumber,
                     wosuf: 0,
                     fldlist: 'rowpointer,wono,wosuf'
                  };
                  woNumber += '-00';
                  DataService.get('api/kp/kpet/getbypk', { params: getKpetParams, busy: true }, function (data) {
                     if (data) {
                        MruService.addToList('KPWorkOrder', data.rowpointer, woNumber, data.wono, data.wosuf);
                     }
                  });
               }
            }
         });
      }
   };

   self.updateLine = function (finish) {
      //User Hook (do not rename)
      if (self.setUpdateLineCriteria) {
         self.setUpdateLineCriteria();
      }

      if (base.whseLogStatus) {
         self.oeline.wlwhsechgfl = base.whseLogStatus.wlwhsechgfl;
      }

      var oeLineUpdateRequest = {
         oeline: self.oeline,
         lMaintMode: base.isAddOrderMode,
         cChangeList: Utils.deepCompare(self.baseOeline, self.oeline)
      };
      DataService.post('api/oe/asoeline/oelineupdate', { data: oeLineUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               var questionMessageText = MessageService.getQuestionMessages(data.messaging);
               //if there was a question message, show it
               if (questionMessageText) {
                  MessageService.yesNo('global.question', questionMessageText, function () {
                     //yes callback
                     self.oeline.eccnallowblankfl = true;
                     self.updateLine(finish);
                  }, function () {
                     //no callback
                     self.oeline.eccnallowblankfl = false;
                  });
                  return;
               }

               //If the update message is not 'ok' and no error was returned, the line was not updated, return for user to finish
               if (data.cUpdateMessage.toLowerCase() !== 'ok') {
                  Utils.replaceObject(self.oeline, data.oeline);
                  self.updateNotOkProcessing();
                  return;
               }

               //User Hook (do not rename)
               if (self.updateLineContinue) {
                  self.updateLineContinue(data);
               }

               //if the line was a Kit, run OELineCompTieUpdate to make sure that any sourced components get appropriate ties created
               if (self.oeline.kitfl && self.kitComponentSourcingHeader && self.kitComponentSourcingCollection.length > 0) {
                  self.checkLineCompTieUpdate();
               }

               self.addSourcingOrdersToMRU(data.messaging);

               //VAET hop if sourcing to a VA
               if (self.oeline.ordertype.toLowerCase() === 'f' &&
                  (base.oelineSettings.cVaWorkFlow.toLowerCase() === 'c' ||
                     base.oelineSettings.cVaWorkFlow.toLowerCase() === 'b' ||
                     base.oelineSettings.cVaWorkFlow.toLowerCase() === 'p')
               ) {
                  var vaNumber = 0;
                  var vaSuffix = 0;
                  var wtNumber = 0;

                  data.messaging.forEach(function (message) {
                     if (message.messagetxt.includes('Value Add Order #')) {
                        var vaMatch = /\d+-?\d+/.exec(message.messagetxt);
                        if (vaMatch[0].includes('-')) {
                           var splitVaNumber = vaMatch[0].split('-');
                           // Grab the vaNumber from the sourcing message
                           vaNumber = splitVaNumber[0];
                           vaSuffix = splitVaNumber[1];
                        } else {
                           vaNumber = vaMatch[0];
                        }
                     } else if (message.messagetxt.includes('Warehouse Transfer #')) {
                        var wtmatch = /\d+/.exec(message.messagetxt);
                        if (wtmatch[0]) {
                           // Tied to a VA through a WT?
                           wtNumber = wtmatch[0];
                        }
                     }
                  });
                  if (!vaNumber && data.oeline.orderaltno) {
                     vaNumber = data.oeline.orderaltno;
                     vaSuffix = 0;
                  }

                  /*
                   * If the wtNumber is not 0 then get the current oeel that was just updated.
                   * Then from the oeel grab the wt# == orderaltno and the wtlineno == linealtno.
                   * Then get the WTEL, WTEL.orderaltno = WT#, then open WTET.
                   */
                  if (wtNumber) {
                     var params = {
                        orderno: base.oehdr.orderno,
                        ordersuf: base.oehdr.ordersuf,
                        lineno: self.oeline.lineno,
                        fldlist: 'orderaltno,linealtno'
                     };

                     //These calls will be replaced by a new SI call that returns the VA#
                     DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
                        if (data) {
                           var wtLineRetrieveCriteria = {
                              wtno: data.orderaltno,
                              wtsuf: 0,
                              lineno: data.linealtno
                           };
                           DataService.post('api/wt/aswtline/wtlineretrieve', { data: wtLineRetrieveCriteria, busy: true }, function (data) {
                              if (data && data.wtline) {
                                 if (data.wtline.orderaltno) {
                                    $state.go('wtet', { pk: data.wtline.orderaltno });
                                 }
                              }
                           });
                        }
                     });
                  }

                  // if the order was just sourced to VA then open VAET - the rollup window will open
                  // when they close VAET
                  if (vaNumber) {
                     $state.go('vaet.detail', { vaNumber: vaNumber, vaSuffix: vaSuffix, rollupCallback: self.updateLineFromVa, goDirectlyToRollUp: base.oelineSettings.cVaWorkFlow.toLowerCase() === 'p' });
                  }
               }

               if (finish) {
                  base.finishOrder();
               } else {
                  self.resetLine();
                  self.view.applyAutoFocus();

                  // If using AvaTax, don't calculate taxes on each line update
                  // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
                  if (base.taxMethodType.toLowerCase() === 'a') {
                     base.calcsob = 'x';
                  } else {
                     base.calcsob = 'o';
                  }

                  if (self.isFromEditLines) {
                     base.updateLineItems(function () {
                        self.initializeLine(function () {
                           $state.go('^.linesGrid', { activePage: self.editLinesActivePage });
                        });
                     }, null, 'updateSingle', self.oeline.lineno, self.oeline.lineno, true);
                  } else {
                     base.updateLineItems(self.initializeLine, null, 'updateSingle', self.oeline.lineno, self.oeline.lineno, true);
                  }
               }
            } else {
               // we need to reset baseOeline in the case of a soft error, this way if we change fields back to their original state, they get into the changedfields
               Utils.replaceObject(self.baseOeline, data.oeline);
            }
         }
      });
   };

   self.clearLineAndReset = function (leavingAdvancedLineEntry, options, isLeavingCallbackFunction) {
      var lineCancelCriteria = {
         maintmode: base.isAddOrderMode,
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         lineno: self.oeline.lineno
      };
      DataService.post('api/oe/asoeline/oelinecancelchange', { data: lineCancelCriteria, busy: true }, function () {
         self.resetLine();

         if (leavingAdvancedLineEntry) {
            if (isLeavingCallbackFunction) {
               leavingAdvancedLineEntry();
            } else {
               $state.go(leavingAdvancedLineEntry, options);
               if (leavingAdvancedLineEntry === '^') {
                  $scope.sp.view.applyAutoFocus();
               }
            }
         } else if (self.isFromEditLines) {
            $state.go('^.linesGrid', { activePage: self.editLinesActivePage });
         } else {
            var lineInitiateCriteria = {
               maintmode: base.isAddOrderMode,
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf
            };
            DataService.post('api/oe/asoeline/oelineinitialize', { data: lineInitiateCriteria, busy: true }, function (data) {
               if (data) {
                  data.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;
                  Utils.replaceObject(self.baseOeline, data);
                  Utils.replaceObject(self.oeline, data);

                  base.supplierAccessContextMessage(self.oeline);
                  self.view.applyAutoFocus();
               }
            });
         }
      });
   };

   self.resetLine = function () {
      // Remove custom entities from context
      base.clearCustomEntityContextMessages();
      base.clearDimensionCalculatorContextMessages();

      self.isAddLineMode = true;

      self.isQtyShipChanged = false;
      self.hasSourcingBeenAccessed = false;
      self.isCatalogProduct = false;

      self.kitComponentSourcingHeader = {};
      self.kitComponentSourcingCollection = [];
      self.subsUpgradesCollection = [];
      self.substitutesCollection = [];
      base.substitutesCount = 0;
      self.whseAvailsCollection = [];
      self.xRefsCollection = [];
      self.correctionInvoiceNumber = '';
      self.correctionInvoiceDate = '';
      self.isCustomerProductTabVisible = false;
      self.supplierAccessData.vendno = 0;
      self.supplierAccessData.shipfmno = 0;
   };


   //User Hook (do not rename)
   self.addUpdateContinue = function (finish) {
      if (self.isAddLineMode) {
         self.addClicked(finish);
      } else {
         self.updateClicked(finish);
      }
   };

   self.addUpdate = function (finish) {
      var changeFieldsList = Utils.deepCompare(self.baseOeline, self.oeline);
      // wnqtyship and qtyship get confused with a straight includes of qtyship, price gets confused with manprice
      if (changeFieldsList.includes('qtyord') ||
         changeFieldsList.includes('prod') ||
         changeFieldsList.includes('specnstype') ||
         changeFieldsList.includes('unit') ||
         changeFieldsList.startsWith('price') || changeFieldsList.includes(',price') ||
         changeFieldsList.includes('scrndiscamt') ||
         changeFieldsList.includes('disctype') ||
         changeFieldsList.startsWith('qtyship') || changeFieldsList.includes(',qtyship') ||
         changeFieldsList.includes('scrnprodcost')) {

         //If the user just changed the Product Category field, the 'prod' check above would have passed
         //as a confusion on the 'includes'. Now, do a second level check to see if that was actually the
         //'prodcat' field.  If so, we still need to do the Add/Update.
         if (changeFieldsList.includes('prodcat')) {
            self.addUpdateContinue(finish);
         }

         //User Hook (do not rename)
         if (self.addUpdateSpecialFields) {
            self.addUpdateSpecialFields(changeFieldsList, finish);
         }

         //Otherwise, don't do anything, a validate has already been triggered.

      } else {
         self.addUpdateContinue(finish);
      }
   };

   self.addClicked = function (finish) {
      if (!self.oeline.prod) {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
         return;
      }

      if ((self.isCatalogProduct || !self.oeline.specnstype || self.oeline.specnstype.toLowerCase() === 's') && (base.isRequireCustomerProd && !self.oeline.reqprod)) {
         MessageService.error('global.error', 'message.customer.product.required');
         self.getCustomerProductTabDetails(); //Force navigation to Customer/Product tab
         return;
      }

      if (base.oehdr.oetype === 'rm' || (base.oehdr.oetype !== 'cr' && self.oeline.returnfl)) {
         //Core Return processing
         if (self.oeline.corecharge) {
            MessageService.yesNo('question.core.return', '', function () {
               // yes
               self.oeline.corechgfl = true;
               //no need to validate or go through returns screen for a core return
               //the backend handles the pricing & creates an addon charge
               self.createLine();
            }, function () {
               //no
               $state.go('.returns');
            });
         } else {
            $state.go('.returns');
         }
         return;
      }

      // On a correction order, if the user did not select an invoiced line to process against
      // Give them another chance
      if (base.isReqInvCRFl && base.oehdr.oetype === 'cr' && !self.oeline.crlineno) {
         //Only ask once if they have authorization to bypass the invoice even if it is required
         if (!base.hasReqInvCrAuthPass || !self.wasCorrectionInvoicePresentedDuringAdd) {
            self.wasCorrectionInvoicePresentedDuringAdd = true;
            $state.go('.correction');
            return;
         }
      }

      if (!self.hasSourcingBeenAccessed && base.oehdr.oetype === 'do') {
         base.orderTieHeader = {
            orderdisp: base.oehdr.orderdisp,
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            ourproc: Constants.MENU_FUNCTION_OEET,
            runmode: 'banner',
            transtype: base.oehdr.oetype,
            whse: base.oehdr.whse
         };

         if (base.currentOrderTie && base.currentOrderTie.ordertype && base.currentOrderTie.ordertype.toLowerCase() !== 'a') {
            //If we already have a tie, don't step on it, otherwise we'll get new PO/WT for each new line.
            if (self.oeline.orderaltno) {
               base.currentOrderTie.orderaltno = self.oeline.orderaltno;
               base.currentOrderTie.powtintfl = self.oeline.powtintfl;
               base.currentOrderTie.powtnew = self.oeline.powtnew;
            }

            self.moveTieDataToOeline(base.currentOrderTie);
            self.preAddAuthCheck(finish);
         } else {
            var lineTieRetrieveRequest = {
               oeline: self.oeline,
               oelinelinetiehdr: base.orderTieHeader
            };
            DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (data) {
               if (data) {
                  var lineTie = data[0];
                  //must force sourcing for a non-stock product on a DO order
                  if (!lineTie.orderaltno && lineTie.ordertype === 'a' && self.oeline.specnstype === 'n') {
                     MessageService.error('global.error', 'message.sourcing.info.must.be.entered.for.ns.on.do');
                     return;
                  }

                  self.moveTieDataToOeline(lineTie);
                  self.preAddAuthCheck(finish);
               }
            });
         }
      } else {
         self.preAddAuthCheck(finish);
      }
   };

   self.updateClicked = function (finish) {
      if (!self.oeline.prod) {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
         return;
      }
      if (base.oehdr.oetype.toLowerCase() === 'cr' && base.isCreditRebillOrder && self.oeline.returnfl) {
         MessageService.error('global.error', 'message.you.cannot.update.a.credit.line');
         return;
      }

      if ((self.isCatalogProduct || !self.oeline.specnstype || self.oeline.specnstype.toLowerCase() === 's') && (base.isRequireCustomerProd && !self.oeline.reqprod)) {
         MessageService.error('global.error', 'message.customer.product.required');
         self.getCustomerProductTabDetails(); //Force navigation to Customer/Product tab
         return;
      }

      self.preAddAuthCheck(finish);
   };

   self.clearCancel = function () {
      self.clearLineAndReset();
   };

   self.finish = function () {
      if (self.oeline.prod) {
         self.addUpdate(true);
      } else {
         base.finishOrder();
      }
   };

   self.easyLineEntry = function () {
      self.clearLineAndReset('^');
   };

   self.quickLineEntry = function () {
      self.clearLineAndReset('^.quickLineEntry');
   };

   self.shoppingList = function () {
      self.clearLineAndReset('^.shoppingList');
   };

   self.returnMultipleLines = function () {
      self.clearLineAndReset('^.returnMultipleLines');
   };

   self.customerOrderSettings = function () {
      self.clearLineAndReset('^.customerOrderSettings');
   };

   self.linesGrid = function () {
      self.clearLineAndReset('^.linesGrid');
   };

   self.addons = function () {
      self.clearLineAndReset(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.advancedLineEntry',
         drilldownState: 'addons'
      });
   };

   self.discounts = function () {
      self.clearLineAndReset(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.advancedLineEntry',
         drilldownState: 'discounts'
      });
   };

   self.stageWizardSelectProducts = function () {
      if (self.oeline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            self.clearLineAndReset(base.defaultLineEntryState);
         });
      } else {
         self.clearLineAndReset(base.defaultLineEntryState);
      }
   };

   self.stageWizardTaxesAndTotals = function () {
      if (self.oeline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            self.clearLineAndReset(base.taxesAndTotals, null, true);
         });
      } else {
         self.clearLineAndReset(base.taxesAndTotals, null, true);
      }
   };

   self.stageWizardCollectPayment = function () {
      if (self.oeline.prod) {
         MessageService.yesNo('question.continue', 'message.the.current.line.will.be.lost.proceed.only.if.complete', function () {
            //yes callback
            self.clearLineAndReset(base.collectPayment, null, true);
         });
      } else {
         self.clearLineAndReset(base.collectPayment, null, true);
      }
   };

   self.updateFromKitCallback = function (kitLine) {
      var kpLineValidateRequest = {
         oeline: kitLine,
         lMaintMode: 'a',
         cChangeList: 'kitscreenfl'
      };
      DataService.post('api/oe/asoeline/oelinevalidate', { data: kpLineValidateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(kitLine, data.oeline);

               // Refresh the OE Line Data/Object with Changes
               Utils.replaceObject(self.baseOeline, data.oeline);
               Utils.replaceObject(self.oeline, data.oeline);
               self.isLineValidated = true;
            }
         }
      });
   };
});