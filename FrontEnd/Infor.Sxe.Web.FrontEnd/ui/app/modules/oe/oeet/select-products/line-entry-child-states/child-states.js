'use strict';

// USE THIS FILE FOR LINE ENTRY CHILD STATE CONTROLLERS THAT ARE ~100 LINES OF CODE OR LESS. IF LARGER, THEY NEED THEIR OWN .JS FILE.

app.controller('OeetAdvancedLineEntryFabKitInfoCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => aleFki
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.fabWhseInit = function () {
      var orderCopyFabWhseCriteria = {
         maintmode: ale.oeline.maintL.toLowerCase(),
         orderno: ale.oeline.orderno,
         ordersuf: ale.oeline.ordersuf,
         lineno: ale.oeline.lineno,
         shipprod: ale.oeline.prod,
         fabwhse: ale.oeline.bodfabwhse,
         whse: base.oehdr.whse,
         origtranstype: base.oehdr.oetype,
         botype: ale.oeline.botype,
         orderaltno: ale.oeline.orderaltno,
         ordertype: ale.oeline.ordertype,
         shipviaty: ale.oeline.wshipviaty,
         verno: ale.oeline.verno,
         copycfgfl: true
      };

      if ($stateParams.fromSerials) {
         orderCopyFabWhseCriteria.lineno = 0;
         orderCopyFabWhseCriteria.copycfgfl = false;
         orderCopyFabWhseCriteria.maintmode = ale.oeline.bodfabwhse ? 'a' : 'c';
      }

      DataService.post('api/oe/asoeline/oelinefabwhseinit', { data: orderCopyFabWhseCriteria, busy: true }, function (data) {
         if (data) {
            self.orderCopyFabWhse = data;

            //User Hook (do not rename)
            if (self.oelineFabWhseInitContinue) {
               self.oelineFabWhseInitContinue();
            }
         }
      });
   };

   self.fabWhseInit();

   self.submit = function () {
      var fabWhseValidateRequest = {
         oeordercopyfabwhse: self.orderCopyFabWhse,
         lCopyConfig: self.orderCopyFabWhse.copycfgfl
      };
      DataService.post('api/oe/asoeline/oelinefabwhsevalidate', { data: fabWhseValidateRequest, busy: true }, function (data) {
         if (data) {
            ale.oeline.bodfabwhse = data.fabwhse;
            ale.oeline.wshipviaty = data.shipviaty;
            ale.oeline.botype = data.botype;
            ale.oeline.cfgkitcompfl = data.cfgkitcompfl;
            ale.oeline.verno = data.verno;

            if (data.maintmode.toLowerCase() === 'a') {
               ale.validateLine(self.validateProcessingComplete, true, true);
            } else {
               self.navBack();
            }
         }
      });
   };

   self.validateProcessingComplete = function (isErrors) {
      if (isErrors) {
         self.fabWhseInit();
      } else {
         self.navBack();
      }
   };

   self.navBack = function () {
      if (ale.oeline.cfgkitfl && !ale.oeline.launchedcfgkitfl) {
         $state.go(base.baseState + '.selectProducts.advancedLineEntry.productConfigManager');
      } else {
         $state.go('^');
      }
   };

   self.back = function () {
      if (self.orderCopyFabWhse.fabwhseenabled && !ale.oeline.bodfabwhse) {
         MessageService.error('global.error', 'error.fabrication.warehouse.required');
      } else {
         self.navBack();
      }
   };
});

app.controller('OeetAdvancedLineEntryProductConfigManagerCtrl', function ($scope, $state, $stateParams, $translate, $sce, Utils, DataService, MessageService) {
   //alias => alePcm
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   var currRequest = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/' + (window.location.pathname ? window.location.pathname + '/' : '');
   var cfgRedirectUrl = currRequest + 'ui/app/modules/shared/configurator/configuration-complete.html';

   ale.oeline.manprice = false;
   ale.oeline.price = ale.baseOeline.price;
   ale.oeline.scrndiscamt = ale.baseOeline.scrndiscamt;
   ale.oeline.scrnprodcost = ale.baseOeline.scrnprodcost;

   var cfgLaunch = {
      orderno: ale.oeline.orderno,
      ordersuf: ale.oeline.ordersuf,
      prod: ale.oeline.prod,
      lineno: ale.oeline.lineno,
      specnstype: ale.oeline.specnstype,
      wtboderrfl: ale.oeline.wtboderrfl,
      wtbilledorderfl: base.oehdr.autoaltwhsefl,
      cfgkitcompfl: ale.oeline.cfgkitcompfl,
      redirectURL: cfgRedirectUrl
   };
   DataService.post('api/oe/asoeline/oelinecfglaunch', { data: cfgLaunch, busy: true }, function (data) {
      if (data) {
         var trustAsUrl = $sce.trustAsResourceUrl(data);
         if (trustAsUrl) {
            self.sourceUri = trustAsUrl;
            ale.oeline.launchedcfgkitfl = true;
         }
      }
   });

   self.isKitSplit = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.productConfigManager.kitSplit');
   };

   self.checkKitPartial = function () {
      var kitCheckPartialBo = {
         kitsordtype: 'o',
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         lineno: ale.oeline.lineno
      };
      DataService.post('api/oe/asoeline/kitcheckpartialbo', { data: kitCheckPartialBo, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            if (data.lKitPtlBoFl && base.oehdr.kitsplbillfl && ale.oeline.bonoptl === 0) {
               $state.go(base.baseState + '.selectProducts.advancedLineEntry.productConfigManager.kitSplit');
            }
         }
      });
   };

   self.back = function () {
      $state.go('^');
      DataService.post('api/oe/asoeline/oelinecfgfinish', { data: ale.oeline, busy: true }, function (data) {
         if (data) {
            ale.oeline.successcfgkitfl = true;
            ale.oeline.cfgkitcompfl = true;

            var cfgExecFuncRequest = {
               oeline: ale.oeline,
               lGetComponentsFl: true
            };

            // User Hook (do not rename)  (Ideally )
            if (self.custBefOELineCFGExecFunc) {
               self.custBefOELineCFGExecFunc(cfgExecFuncRequest);
            }

            DataService.post('api/oe/asoeline/oelinecfgexecfunc', { data: cfgExecFuncRequest, busy: true }, function (data) {
               if (data) {
                  ale.oeline.kitscreenfl = true;
                  ale.validateLine(self.checkKitPartial, true);  // Force validation to get the price back

                  if (data.cWarnMessage) {
                     MessageService.alert('global.warning', data.cWarnMessage);
                  }
               }

               DataService.get('api/oe/oeelk/getoeelknoseqno/o/' + base.oehdr.orderno + '/' + base.oehdr.ordersuf + '/' + ale.oeline.lineno, function (data) {
                  if (data) {
                     var configuredGroups = new JSLINQ(data).Where(function (oeelk) { return oeelk.cfgcompfl; }) || [];
                     if (configuredGroups.items.length > 0) {
                        $state.go(base.baseState + '.selectProducts.advancedLineEntry.kit');
                     } else {
                        ale.oeline.successcfgkitfl = false;
                        ale.oeline.launchedcfgkitfl = false;

                        MessageService.error('global.error', 'message.no.manufacturing.data.was.returned.from.the.configurator');
                     }
                  }
               });
            });
         } else {
            ale.oeline.successcfgkitfl = false;
            ale.oeline.launchedcfgkitfl = false;

            if (!ale.oeline.cfgkitcompfl) {
               DataService.get('api/oe/oeelk/getoeelknoseqno/o/' + base.oehdr.orderno + '/' + base.oehdr.ordersuf + '/' + ale.oeline.lineno, function (data) {
                  if (data) {
                     var configuredGroups = new JSLINQ(data).Where(function (oeelk) { return oeelk.cfgcompfl; }) || [];
                     if (configuredGroups.items.length === 0) {
                        MessageService.error('global.error', 'message.no.manufacturing.data.was.returned.from.the.configurator');
                     }
                  }
               });
            }
         }
      });
   };
});

app.controller('OeetAdvancedLineEntryKitSplitCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService) {
   //alias => alePcmKs
   var self = this;
   var ale = $scope.ale;
   var alePcm = $scope.alePcm;

   self.kitSplit = {};

   var kitSplitInitialize = {
      qtyord: ale.oeline.qtyord,
      unit: ale.oeline.unit,
      kitsplitamt: ale.oeline.kitsplitamt,
      unitconv: ale.oeline.unitconv,
      specnstype: ale.oeline.specnstype,
      speccostty: ale.oeline.speccostty,
      csunperstk: ale.oeline.csunperstk,
      price: ale.oeline.price
   };
   DataService.post('api/oe/asoeline/kitsplitinitialize', { data: kitSplitInitialize, busy: true }, function (data) {
      if (data) {
         Utils.replaceObject(self.kitSplit, data);
      }
   });

   self.splitPriceChanged = function () {
      DataService.post('api/oe/asoeline/kitsplitleaveprice', { data: self.kitSplit, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.kitSplit, data);
         }
      });
   };

   self.boPercentChanged = function () {
      DataService.post('api/oe/asoeline/kitsplitleavepercent', { data: self.kitSplit, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.kitSplit, data);
         }
      });
   };

   self.submit = function () {
      DataService.post('pi/oe/asoeline/kitsplitupdate', { data: self.kitSplit, busy: true }, function (data) {
         if (data) {
            if (data.priceoverfl) {
               ale.oeline.price = data.price;
               ale.oeline.kitsplitamt = data.kitsplitamt;
            }

            self.back();
         }
      });
   };

   self.clear = function () {
      DataService.post('api/oe/asoeline/kitsplitclear', { data: self.kitSplit, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.kitSplit, data);
         }
      });
   };

   self.back = function () {
      if (ale.oeline.launchedcfgkitfl) {
         ale.validateLine(alePcm.back);
      } else {
         ale.validateLine();
         $state.go('^');
      }
   };
});

app.controller('OeetAdvancedLineEntryWarehouseAvailbilityCtrl', function ($scope, $state, $translate, DataService, UserService, GridService, MessageService) {
   //alias => aleWa
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   var whseAvailCriteria = {
      custno: base.oehdr.custno,
      shipto: base.oehdr.shipto,
      prod: ale.oeline.prod,
      unit: ale.oeline.unit,
      cono: UserService.getCono(),
      orderwhse: base.oehdr.whse
   };
   DataService.post('api/ic/asicinquiry/icwhseavail', { data: whseAvailCriteria, busy: true }, function (data) {
      if (data) {
         self.collection = data;
      }
   });

   self.submit = function () {
      var selectedRecord = GridService.getSelectedRecord(self.grid);
      if (selectedRecord) {
         if (selectedRecord.lValidWhse) {
            ale.oeline.altwhse = selectedRecord.cWhse;
            $state.go('^');
            ale.validateLine(null, true);
         } else {
            MessageService.error('global.error', 'message.the.selected.product.is.not.in.a.valid.warehouse');
         }
      }
   };

   self.back = function () {
      $state.go('^');
      ale.validateLine();
   };
});

app.controller('OeetAdvancedLineEntryCrossReferenceCtrl', function ($scope, $state, $translate, DataService, UserService, GridService, MessageService) {
   //alias => aleCr
   var self = this;
   var ale = $scope.ale;

   self.submit = function () {
      var isXRefSelected = self.xRefGrid.isOneRowSelected();
      var isSubUpgradeSelected = self.suGrid.isOneRowSelected();
      if ((!isXRefSelected && !isSubUpgradeSelected) || (isXRefSelected && isSubUpgradeSelected)) {
         //nothing is selected OR more than one record is selected in either grid || one record is selected in both grids
         MessageService.error('global.error', 'message.please.select.one.alternate.before.continuing');
      } else {
         //one record is selected in one of the grid
         var selectedXRef;
         if (isXRefSelected) {
            selectedXRef = GridService.getSelectedRecord(self.xRefGrid);
         } else {
            selectedXRef = GridService.getSelectedRecord(self.suGrid);
         }

         if (selectedXRef) {
            ale.oeline.reqprod = ale.oeline.prod;
            ale.oeline.prod = selectedXRef.prod;
            ale.oeline.crprod = selectedXRef.prod;
            ale.oeline.xrefprodty = selectedXRef.rectype;
            if (isSubUpgradeSelected) {
               ale.oeline.changefl = 'changed';
            }

            $state.go('^');
            ale.validateLine();
         }
      }
   };

   self.back = function () {
      $state.go('^');
      ale.validateLine(null, true);
   };
});

app.controller('OeetAdvancedLineEntryCreateCatalogInInventoryCtrl', function ($scope, $state, $stateParams, $translate, DataService, UserService, GridService, MessageService) {
   //alias => aleCci
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.productType = $stateParams.productType;
   self.statusType = $stateParams.statusType;
   self.hsCode = $stateParams.hsCode;
   self.countryCode = $stateParams.countryCode;

   self.statusTypes = [];
   if (ale.oeline.oannonstockflag) {
      self.statusTypes.push({ label: $translate.instant('global.order.as.needed.non.stock'), value: 'n' });
      self.statusType = 'n';
   }
   if (ale.oeline.orderasneededflag) {
      self.statusTypes.push({ label: $translate.instant('global.order.as.needed'), value: 'o' });
      self.statusType = 'o';
   }

   self.submit = function () {
      var prodType = self.statusType === 'n' ? self.statusType + self.productType : self.productType;
      var createProdFromCatalogCriteria = {
         prod: ale.oeline.prod,
         whse: base.oehdr.whse,
         prodtype: prodType,
         countryoforigin: self.countryCode,
         tariffcd: self.hsCode
      };
      DataService.post('api/oe/asoeline/createprodfromcatalog', { data: createProdFromCatalogCriteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            ale.oeline.cataddfl = data.createprodfromcatresults.catalogaddflag;
            ale.oeline.specnstype = 's';
            ale.validateLine();
            $state.go('^');
         }
      }, function () {
         //error callback
         ale.clearLineAndReset();
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntrySupersedesCtrl', function ($scope, $state, $stateParams, $translate, DataService, UserService, GridService, MessageService, Utils) {
   //alias => aleSup
   var self = this;
   var ale = $scope.ale;
   var base = $scope.base;

   self.substitutesCollection = [];
   self.criteria = $stateParams.criteria;
   self.supersedesCollection = $stateParams.results;
   self.navigationFrom = $stateParams.navigationFrom;

   self.cellChanged = function (e, args) {
      var record = self.supersedesCollection[args.row];
      //if the order type hasn't been selected, dont validate because we'll get an error
      //if the user wants to use a superseded product, they must enter a qty and ordertype
      if (record.ordertype) {
         var superAvailLeaveRowRequest = {
            oelinesuperavailcriteria: self.criteria,
            oelinesuperavailresults: record
         };
         DataService.post('api/oe/asoeline/oelinesuperavailleaverow', { data: superAvailLeaveRowRequest, busy: true });
      }
   };

   self.isSubmitButtonEnabled = function () {
      var retn = false;
      if (base.sasoo.oetietype.toLowerCase() === 't' || base.sasoo.oetietype.toLowerCase() === 'b') {
         retn = true;
      }
      return retn;
   };

   self.submit = function () {
      var supersedeSelected = false;
      self.supersedesCollection.forEach(function (supersede) {
         if (supersede.qtyord > 0 && supersede.ordertype) {
            supersedeSelected = true;
         }
      });
      if (!supersedeSelected) {
         MessageService.error('message.no.product.selected', 'message.please.enter.a.quantity.ordered.and.order.type.for.supersede.product');
      } else {
         var superAvailUpdateRequest = {
            oelinesuperavailresults: self.supersedesCollection,
            oeline: ale.oeline,
            oelinesuperavailcriteria: self.criteria
         };
         DataService.post('api/oe/asoeline/oelinesuperavailupdate', { data: superAvailUpdateRequest, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(ale.oeline, data);
               ale.oeline.changefl = 'changed';
               ale.validateLine();

               $state.go('^');

               if (ale.oeline.launchtiescreenfl) {
                  ale.sourcingClicked();
               }
            }
         });
      }
   };

   self.back = function () {
      if (self.navigationFrom && self.navigationFrom === 'supersedes' && base.oehdr.oetype.toLowerCase() === 'so') {
         DataService.post('api/oe/asoelineextra/oelinesubavailinit', { data: ale.oeline, busy: true }, function (data) {
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
               $state.go('^.substitutes', { criteria: data.oelinesuperavailcriteria, results: self.substitutesCollection });
            }
            else {
               ale.validateLine();
               $state.go('^');
            }
         });
      }
      else {
         ale.validateLine();
         $state.go('^');
      }
   };
});

app.controller('OeetAdvancedLineEntrySubstitutesCtrl', function ($scope, $state, $stateParams, $translate, DataService, UserService, GridService, MessageService, Utils) {
   //alias => aleSubs
   var self = this;
   var ale = $scope.ale;
   var base = $scope.base;

   self.criteria = $stateParams.criteria;
   self.substitutesCollection = $stateParams.results;

   self.cellChanged = function (e, args) {
      var record = self.substitutesCollection[args.row];
      //if the order type hasn't been selected, dont validate because we'll get an error
      //if the user wants to use a substituted product, they must enter a qty and ordertype
      if (record.ordertype) {
         var substituteAvailLeaveRowRequest = {
            oelinesuperavailcriteria: self.criteria,
            oelinesuperavailresults: record
         };
         DataService.post('api/oe/asoeline/oelinesuperavailleaverow', { data: substituteAvailLeaveRowRequest, busy: true });
      }
   };

   self.submit = function () {
      var substituteSelected = false;
      self.substitutesCollection.forEach(function (substitute) {
         if (substitute.qtyord > 0) {
            substituteSelected = true;
         }
      });
      if (!substituteSelected) {
         MessageService.error('message.no.product.selected', 'message.please.enter.a.quantity.ordered.and.order.type.for.supersede.product');
      } else {
         var superAvailUpdateRequest = {
            oelinesuperavailresults: self.substitutesCollection,
            oeline: ale.oeline,
            oelinesuperavailcriteria: self.criteria
         };
         DataService.post('api/oe/asoeline/oelinesuperavailupdate', { data: superAvailUpdateRequest, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(ale.oeline, data);
               ale.oeline.changefl = 'changed';
               ale.validateLine();

               $state.go('^');

               if (ale.oeline.launchtiescreenfl) {
                  ale.sourcingClicked();
               }
            }
         });
      }
   };

   self.back = function () {
      ale.validateLine();
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryOptionalProductsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => aleOp
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.optionalProduct = $stateParams.optionalProduct;
   self.optionalProdCollection = $stateParams.optionalProductResults;

   self.optionalProdCollection.forEach(function (optProd) {
      optProd.completeDescription = optProd.proddesc + ' ' + optProd.proddesc2;
   });

   self.getSubTitle = function () {
      return $translate.instant('global.for.product') + ': ' + self.optionalProduct.shipprod;
   };

   //display message for user so they know why they're seeing this screen
   MessageService.info('message.optional.products.found', 'message.select.optional.products.to.add.to.order');

   self.gridRowSelectedChanged = function (e, args) {
      var record = self.optionalProdCollection[args.row];
      if (record) {
         if (record.isSelected) {
            if (record.qtyship === 0) {
               record.qtyship = 1;
            }
         } else {
            record.qtyship = 0;
         }

         self.optionalProductLeaveRow(record, args.row);
      }
   };

   self.gridRowCellChanged = function (e, args) {
      var record = self.optionalProdCollection[args.row];
      self.optionalProductLeaveRow(record);
   };

   self.optionalProductLeaveRow = function (record, row) {
      var optProdLeaveRowRequest = {
         oelineoptprod: self.optionalProduct,
         oelineoptprodresults: record
      };
      DataService.post('api/oe/asoeline/oelineoptprodleaverow', { data: optProdLeaveRowRequest, busy: true }, function (data) {
         if (data) {
            var isSroMessage = false;
            var sroMessage;
            var nonSroMessaging = [];
            data.messaging.forEach(function (message) {
               if (message.includes('SRO Setup?')) {
                  isSroMessage = true;
                  sroMessage = message;
               } else {
                  nonSroMessaging.push(message);
               }
            });
            if (!MessageService.processMessaging(nonSroMessaging)) {
               if (isSroMessage) {
                  MessageService.yesNo('global.question', sroMessage, function () {
                     //yes callback
                     data.oelineoptprodresults.addswoptprodfl = true;
                     self.optionalProdCollection[record] = data.oelineoptprodresults;
                     self.grid.updateRow(row);
                  }, function () {
                     //no callback
                     data.oelineoptprodresults.addswoptprodfl = false;
                     self.optionalProdCollection[record] = data.oelineoptprodresults;
                     self.grid.updateRow(row);
                  });
               } else {
                  self.optionalProdCollection[record] = data.oelineoptprodresults;
                  self.grid.updateRow(row);
               }
            }
         }
      });
   };

   self.submit = function () {
      var optProdUpdateRequest = {
         oelineoptprodresults: self.optionalProdCollection,
         oelineoptprod: self.optionalProduct
      };
      DataService.post('api/oe/asoeline/oelineoptprodupdate', { data: optProdUpdateRequest, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data);
         }

         var lastLineItemLineNo;
         if (base.lineItems.length > 0) {
            lastLineItemLineNo = base.lineItems[base.lineItems.length - 1].actllineno + 1;
         } else {
            lastLineItemLineNo = 0;
         }

         // If using AvaTax, don't calculate taxes on each line add
         // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
         if (base.taxMethodType.toLowerCase() === 'a') {
            base.calcsob = 'x';
         } else {
            base.calcsob = 'o';
         }

         base.updateLineItems(ale.clearLineAndReset, null, 'addMultiple', lastLineItemLineNo);
         $state.go('^');
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryTaxJurisdictionCtrl', function ($scope, $state, DataService) {
   //alias => aleTj
   var self = this;
   var ale = $scope.ale;

   self.orderChanged = function (selectedOrder) {
      if (selectedOrder.value > 0) {
         self.crJurisdiction.orderaltno = selectedOrder.value;
         self.crJurisdiction.orderaltsuf = selectedOrder.value2;
      }

      //if a valid order was selected, validate it
      if (self.crJurisdiction.orderaltno) {
         DataService.post('api/oe/asoeline/oelinecorrectionjurisdiction', { data: self.crJurisdiction, busy: true }, function (data) {
            if (data) {
               self.crJurisdiction = data;
            }
         });
      }
   };

   self.typeChanged = function () {
      self.crJurisdiction = {};
      self.crJurisdiction.ordertype = self.type;
      self.purchaseOrderNumber = '';
      self.warehouseTransferNumber = '';
   };

   self.back = function () {
      ale.oeline.orderaltno = self.baseOeline.orderaltno;
      ale.oeline.botype = self.baseOeline.botype;
      ale.oeline.powtintfl = self.baseOeline.powtintfl;
      ale.oeline.ordertype = self.baseOeline.ordertype;

      $state.go('^');
   };

   self.submit = function () {
      ale.oeline.orderaltno = self.crJurisdiction.orderaltno;
      ale.oeline.botype = self.crJurisdiction.botype;
      ale.oeline.powtintfl = self.crJurisdiction.powtintfl;
      ale.oeline.ordertype = self.crJurisdiction.ordertype;

      ale.validateLine();

      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryTalliesBundlesCtrl', function ($scope, $state) {
   //alias => aleTly (for tallies) or aleBdl (for bundles)
   var self = this;
   var ale = $scope.ale;

   //Defined and called from within the Tally/Bundles control when the Save is performed.
   self.acceptTallyBundleUpdate = function (payload) {
      if (payload) {
         ale.oeline.tallyscreenfl = true;
         ale.oeline.launchtallyfl = true;
         ale.oeline.qtyord = payload.qty;
         ale.oeline.unit = payload.unit;

         ale.validateLine(self.back);
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryLotsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   var isFromReturns = $stateParams.fromReturns;
   if (isFromReturns) {
      self.returnOrderNumber = $stateParams.returnOrderNumber;
      self.returnOrderSuffix = $stateParams.returnOrderSuffix;
      self.returnOrderLineNumber = $stateParams.returnOrderLineNumber;
      self.returnObject = $stateParams.returnObject;
   }

   ale.oeline.forceserlot = false;
   var detailLineList = [
      {
         lineno: ale.oeline.lineno,
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         shipprod: ale.oeline.prod,
         corechgfl: ale.oeline.corechgfl,
         kitfl: ale.oeline.kitfl,
         serlottype: ale.oeline.serlottype,
         whse: base.oehdr.whse,
         altwhse: ale.oeline.altwhse,
         qtyord: ale.oeline.qtyord,
         qtyship: ale.oeline.qtyship,
         stkqtyord: ale.oeline.stkqtyord,
         stkqtyship: ale.oeline.stkqtyship
      }
   ];

   var checkSerLotCriteria = {
      oeesdetaillinelist: detailLineList,
      oeesdetaillinesingle: {},
      iLineNo: ale.oeline.lineno,
      lIsFromMenu: true
   };

   self.lotControlReady = function () {
      DataService.post('api/oe/asoeentry/oeesdetaillinecheckserlot', { data: checkSerLotCriteria, busy: true }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(data);

            // Call initialize method on the Shared-Lots-Ctrl
            self.lotsControl.initialize(self.icEntryLotsCriteria);
         }
      });
   };

   self.lotControlDone = function (adjustQtyShip, newQtyShipAmount) {
      if (adjustQtyShip) {
         ale.oeline.stkqtyship = newQtyShipAmount;
      }

      if (isFromReturns) {

         // this is the same as returnUpdateContinue in returns.js
         var retrunUpdateRequest = {
            oeline: ale.oeline,
            oereturn: self.returnObject
         };
         DataService.post('api/oe/asoeline/oereturnupdate', { data: retrunUpdateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
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
                        if (adjustQtyShip) {
                           ale.oeline.stkqtyship = newQtyShipAmount;
                        }
                        ale.validateLine(null, true);
                        break;
                  }
               }
            }
         });
      } else {
         ale.validateLine(null, true);
      }
      self.back();
   };

   self.createIcEntryLotsCriteria = function (data) {
      if (data) {
         var criteria = {
            whse: ale.oeline.altwhse ? ale.oeline.altwhse : base.oehdr.whse,
            prod: ale.oeline.prod,
            type: 'oe',
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            lineno: ale.oeline.lineno,
            linenochar: ale.oeline.lineno,
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: ale.oeline.returnfl,
            origqty: ale.oeline.stkqtyship,
            proofqty: data.dNoSNLots,
            ordqty: ale.oeline.stkqtyord,
            outqty: ale.oeline.stkqtyship,
            ictype: base.oehdr.oetype,
            cost: ale.oeline.scrncost,
            qtyunavail: ale.oeline.qtyunavail,
            method: '',
            returnty: ale.oeline.returnty,
            reasunavty: ale.oeline.reasunavty,
            custno: base.oehdr.custno,
            shipto: base.oehdr.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: 'oeet',
            icspecrecno: ale.oeline.icspecrecno,
            assignoldest: false,
            currproc: 'oeet',
            seqdash: "0",
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: ale.oeline.proddesc,
            prodnotesfl: ''
         };

         if (isFromReturns) {
            criteria.retorderno = self.returnOrderNumber;
            criteria.retordersuf = self.returnOrderSuffix;
            criteria.retlineno = self.returnOrderLineNumber;
            criteria.callingState = 'returns';
         } else {
            criteria.retorderno = ale.oeline.retorderno;
            criteria.retordersuf = ale.oeline.retordersuf;
            criteria.retlineno = ale.oeline.retlineno;
         }

         return criteria;
      }
   };

   self.back = function () {
      if (isFromReturns) {

         $state.go('^.returns', {
            returnOrderNumber: self.returnOrderNumber,
            returnOrderSuffix: self.returnOrderSuffix,
            returnOrderLineNumber: self.returnOrderLineNumber,
            fromSerialLot: true,
            returnObject: self.returnObject
         });
      } else {
         $state.go('^');
      }
   };
});

app.controller('OeetAdvancedLineEntrySerialsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   var OURPROC_OE = "oe";
   var OURPROC_ORDERENTRY = "oeet";

   var isFromReturns = $stateParams.fromReturns;
   if (isFromReturns) {
      self.returnOrderNumber = $stateParams.returnOrderNumber;
      self.returnOrderSuffix = $stateParams.returnOrderSuffix;
      self.returnOrderLineNumber = $stateParams.returnOrderLineNumber;
      self.returnObject = $stateParams.returnObject;
      self.returnSerialLot = $stateParams.returnSerialLot;
   }

   self.back = function () {
      if (isFromReturns) {

         if (self.returnSerialLot) {
            var serialcleanupcriteria = {
               ttbloereturn: self.returnObject,
               ttblseriallot: self.returnSerialLot
            };
            DataService.post('/web/api/oe/oereturnserialcleanup', { data: serialcleanupcriteria, busy: true });
         }

         $state.go('^.returns', {
            returnOrderNumber: self.returnOrderNumber,
            returnOrderSuffix: self.returnOrderSuffix,
            returnOrderLineNumber: self.returnOrderLineNumber,
            fromSerialLot: true,
            returnObject: self.returnObject
         });
      } else {
         $state.go('^');
      }
   };

   var oeesList = [
      {
         lineno: ale.oeline.lineno,
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         shipprod: ale.oeline.prod,
         corechgfl: ale.oeline.corechgfl,
         kitfl: ale.oeline.kitfl,
         serlottype: ale.oeline.serlottype,
         whse: base.oehdr.whse,
         altwhse: ale.oeline.altwhse,
         qtyord: ale.oeline.qtyord,
         qtyship: ale.oeline.qtyship,
         stkqtyord: ale.oeline.stkqtyord,
         stkqtyship: ale.oeline.stkqtyship
      }
   ];

   var oeesCriteria = {
      oeesdetaillinelist: oeesList,
      oeesdetaillinesingle: {},
      iLineNo: ale.oeline.lineno,
      lIsFromMenu: true
   };

   self.serialControlReady = function () {
      DataService.post('api/oe/asoeentry/oeesdetaillinecheckserlot', { data: oeesCriteria, busy: true }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(data);

            var criteria = {
               icentryserialslist: [],
               icentryserialscriteria: self.icEntrySerialsCriteria
            };

            // Call initialize method on the Shared-Serials-Ctrl
            self.serialsControl.initialize(criteria);
         }
      });
   };

   self.serialControlDone = function (adjustQtyShip, newQtyShipAmount) {
      if (adjustQtyShip) {
         ale.oeline.stkqtyship = newQtyShipAmount;
      }

      if (isFromReturns) {
         // this is the same as returnUpdateContinue in returns.js
         var retrunUpdateRequest = {
            oeline: ale.oeline,
            oereturn: self.returnObject
         };
         DataService.post('api/oe/asoeline/oereturnupdate', { data: retrunUpdateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  switch (data.oeline.maintL.toLowerCase()) {
                     case 'a':
                        if (data.oeline.retforceserlot && data.oeline.retforcelinelist) {
                           base.forceSerLotLineList = data.oeline.retforcelinelist;
                        }

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
                        if (adjustQtyShip) {
                           ale.oeline.stkqtyship = newQtyShipAmount;
                        }
                        ale.validateLine(null, true);
                        break;
                  }
               }
            }
         });
      } else {
         ale.validateLine(null, true);
      }
      self.back();
   };

   self.createIcEntrySerialsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            whse: ale.oeline.altwhse ? ale.oeline.altwhse : base.oehdr.whse,
            prod: ale.oeline.prod,
            type: OURPROC_OE,
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            lineno: ale.oeline.lineno,
            linenochar: ale.oeline.lineno,
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: ale.oeline.returnfl,
            origqty: ale.oeline.stkqtyship,
            proofqty: resp.dNoSNLots,
            ordqty: ale.oeline.stkqtyord,
            outqty: ale.oeline.stkqtyship,
            ictype: base.oehdr.oetype,
            cost: ale.oeline.scrncost,
            qtyunavail: ale.oeline.qtyunavail,
            method: '',
            returnty: ale.oeline.returnty,
            reasunavty: ale.oeline.reasunavty,
            custno: base.oehdr.custno,
            shipto: base.oehdr.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: OURPROC_ORDERENTRY,
            icspecrecno: ale.oeline.icspecrecno,
            assignoldest: false,
            currproc: OURPROC_ORDERENTRY,
            seqdash: "0",
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: ale.oeline.proddesc,
            prodnotesfl: ''
         };

         if (isFromReturns) {
            criteria.retorderno = self.returnOrderNumber;
            criteria.retordersuf = self.returnOrderSuffix;
            criteria.retlineno = self.returnOrderLineNumber;
            criteria.callingState = 'returns';
         } else {
            criteria.retorderno = ale.oeline.retorderno;
            criteria.retordersuf = ale.oeline.retordersuf;
            criteria.retlineno = ale.oeline.retlineno;
         }

         return criteria;
      }
   };
});

app.controller('OeetAdvancedLineEntryCustomerReservationsCtrl', function ($scope, $state, Constants, UserService, ConfigService, DataService, MessageService, AuthService) {
   //alias => aleCstRsv
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.icspcCriteria = {
      cono: UserService.getCono(),
      orderno: ale.oeline.orderno,
      ordersuf: ale.oeline.ordersuf,
      lineno: ale.oeline.lineno,
      whse: base.oehdr.whse,
      shipprod: ale.oeline.prod,
      qtyord: ale.oeline.qtyord,
      unitconv: ale.oeline.unitconv,
      recordlimit: ConfigService.getDefaultRecordLimit(),
      custreserverowpointer: ale.oeline.custreserverowpointer,
      custreserveovrfl: ale.oeline.custreserveovrfl,
      custreserveovrpointer: ale.oeline.custreserveovrpointer,
      stkqtyship: ale.oeline.stkqtyship,
      qtyship: ale.oeline.qtyship,
      netavail: ale.oeline.netavail
   };
   DataService.post('api/oe/asoelineextra/oelineicspcload', { data: self.icspcCriteria, busy: true }, function (data) {
      if (data) {
         if (data.lMoreRecords) {
            MessageService.info('global.information', 'global.record.count.limit.has.been.reached');
         }

         self.icspcCriteria = data.oelineicspccriteria;
         self.customerReservationCollection = data.oelineicspcresults;
      }
   });

   self.isRowEditable = function (row) {
      var currentRow = self.customerReservationCollection[row];
      return currentRow.allowpullqtyfl;
   };

   self.gridRowSelectedChanged = function (e, args) {
      var record = self.customerReservationCollection[args.row];
      if (record.selectedfl === true) {
         self.customerReservationCollection.forEach(function (customerReservation, index) {
            if (record !== customerReservation && customerReservation.selectedfl) {
               customerReservation.selectedfl = false;
               self.grid.updateRow(index);
            }
         });
      }
   };

   self.submit = function () {
      var isChanges = false;
      self.customerReservationCollection.forEach(function (customerReservation) {
         if (customerReservation.selectedfl !== customerReservation.origselectedfl) {
            isChanges = true;
         }
      });

      if (isChanges) {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'lines', 'custreserveovrfl', '', '', null, function () {
            //auth passed callback
            self.update();
         }, null);
      } else {
         self.update();
      }
   };

   self.update = function () {
      var icspcUpdateRequest = {
         oelineicspcresults: self.customerReservationCollection,
         oelineicspccriteria: self.icspcCriteria
      };
      DataService.post('api/oe/asoelineextra/oelineicspcupdate', { data: icspcUpdateRequest, busy: true }, function (data) {
         if (data) {
            self.icspcCriteria = data.oelineicspccriteria;
            self.customerReservationCollection = data.oelineicspcresults;

            // Push changes back to line.  Validate is necessary to keep things in sync to allow UI to work properly even though back end call sets everything correctly.
            ale.oeline.netavail = self.icspcCriteria.netavail;
            ale.oeline.custreserveovrpointer = self.icspcCriteria.custreserveovrpointer;
            ale.oeline.custreserveovrfl = self.icspcCriteria.custreserveovrfl;
            ale.oeline.qtyship = self.icspcCriteria.qtyship;
            ale.oeline.stkqtyship = self.icspcCriteria.stkqtyship;

            ale.validateLine();

            $state.go('^');
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryRebatesCtrl', function ($scope, $state, DataService) {
   var self = this;
   var ale = $scope.ale;

   self.back = function () {
      $state.go('^');
   };

   self.loadRebateData = function () {
      // Load Rebate details
      var criteria = {
         orderno: ale.oeline.orderno,
         ordersuf: ale.oeline.ordersuf,
         lineno: ale.oeline.lineno
      };
      DataService.post('api/oe/asoelineextra/oelinerebate', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.rebate = data;
         }
      });
   };

   self.loadRebateData();

});

app.controller('OeetAdvancedLineEntryCorrectionCtrl', function ($scope, $state, DataService, MessageService, AuthService, Utils, Constants) {
   var self = this;
   var ale = $scope.ale;
   var base = $scope.base;

   self.oeline = ale.oeline;
   self.oeline.custno = base.oehdr.custno;
   self.oeline.reason = base.oehdr.crreasonty;

   self.correctionInvoiceChanged = function () {
      if (self.oeline.invno) {
         var crDate = {
            crinvno: self.oeline.invno,
            crinvsuf: self.oeline.invsuf,
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf
         };
         DataService.post('api/oe/asoeline/oelinecorrectiondate', { data: crDate, busy: true }, function (data) {
            if (data) {
               if (data.invoicedt) {
                  self.correctionInvoiceDate = data.invoicedt;
               } else {
                  self.correctionInvoiceDate = '';
               }
            } else {
               self.correctionInvoiceDate = '';
            }
         });
      }
   };

   if (self.oeline.maintL.toLowerCase() === 'c') {
      self.oeline.invno = self.oeline.crinvno;
      self.oeline.invsuf = self.oeline.crinvsuf;
      self.correctionInvoiceChanged();
   }
   else {
      self.oeline.invno = base.oehdr.invno;
      self.oeline.invsuf = base.oehdr.invsuf;
   }

   self.back = function () {
      $state.go('^');
   };

   self.submit = function () {
      self.oeline.custno = base.oehdr.custno;
      if (base.isReqInvCRFl && !self.oeline.invno && !base.isCreditRebillOrder) {
         AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'correction', 'reqinvcrfl', 'a', '', null, self.returnUpdate);
      } else if (!base.isReqInvCRFl && !self.oeline.invno) {
         self.returnUpdate();
      } else {
         self.validateCorrectionData();
      }
   };

   self.findInvoiceClicked = function () {
      $state.go('.findInvoice');
   };

   self.validateCorrectionData = function () {
      self.oeline.alreadycrwarningfl = true;
      DataService.post('api/oe/asoelineextra/oelinecorrectionvalidate', {
         data: self.oeline, busy: true
      }, function (data) {
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
            if (isQuestion) {
               MessageService.yesNo('global.question', questionMessage, function () {
                  DataService.post('api/oe/asoelineextra/oelinecorrectionvalidate', {
                     data: self.oeline, busy: true
                  }, function (crData) {
                     if (crData) {
                        // On a correction, quantity and unit must match the invoiced left quantity and unit
                        // Price being corrected must match the initial price
                        self.oeline.price = crData.oeline.price;
                        self.oeline.qtyord = crData.oeline.qtyord;
                        self.oeline.stkqtyord = crData.oeline.stkqtyord;
                        self.oeline.qtyship = crData.oeline.qtyord;
                        self.oeline.stkqtyship = crData.oeline.stkqtyord;
                        self.oeline.unit = crData.oeline.unit;
                        self.oeline.unitconv = crData.oeline.unitconv;
                        self.returnUpdate();
                     }
                  });
               });
            } else {
               // On a correction, quantity and unit must match the invoiced left quantity and unit
               // Price being corrected must match the initial price
               self.oeline.price = data.oeline.price;
               self.oeline.qtyord = data.oeline.qtyord;
               self.oeline.stkqtyord = data.oeline.stkqtyord;
               self.oeline.qtyship = data.oeline.qtyord;
               self.oeline.stkqtyship = data.oeline.stkqtyord;
               self.oeline.unit = data.oeline.unit;
               self.oeline.unitconv = data.oeline.unitconv;
               self.returnUpdate();
            }
         }
      });
   };

   self.returnUpdate = function () {
      if (base.oehdr.oetype.toLowerCase() === 'cr') {
         DataService.post('api/oe/asoeline/oereturnretrieve', {
            data: self.oeline, busy: true
         }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  data.oereturn.retorderno = self.oeline.invno;
                  data.oereturn.retordersuf = self.oeline.invsuf;
                  data.oereturn.retlineno = self.oeline.crlineno;
                  var returnUpdateRequest = {
                     oeline: self.oeline,
                     oereturn: data.oereturn
                  };
                  DataService.post('api/oe/asoeline/oereturnupdate', {
                     data: returnUpdateRequest, busy: true
                  }, function (updateData) {
                     if (updateData) {
                        if (!MessageService.processMessaging(updateData.messaging)) {
                           switch (updateData.oeline.maintL.toLowerCase()) {
                              case 'a':
                                 $state.go('^');
                                 ale.resetLine();

                                 // If using AvaTax, don't calculate taxes on each line add
                                 // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
                                 if (base.taxMethodType.toLowerCase() === 'a') {
                                    base.calcsob = 'x';
                                 } else {
                                    base.calcsob = 'o';
                                 }

                                 if (base.isCreditRebillOrder) {
                                    base.updateLineItems(ale.initializeLine, updateData.oeline.lineno + 1, 'addMultiple', updateData.oeline.lineno);
                                 }
                                 else {
                                    base.updateLineItems(ale.initializeLine, updateData.oeline.lineno, 'addSingle', updateData.oeline.lineno);
                                 }
                                 break;
                              case 'c':
                                 $state.go('^');
                                 ale.validateLine();
                                 break;
                           }
                        }
                     }
                  });
               }
            }
         });
      }
      else {
         ale.createLine();
         $state.go('^');
      }
   };
});

app.controller('OeetAdvancedLineEntryCorrectionFindInvoiceCtrl', function ($scope, $state, $stateParams, $translate, Utils, DataService, GridService, MessageService) {
   //alias => aleFi
   // this controller is shared between the Corrections and Returns screen. They use the same .json, but have different controllers to handle functionality differntly.
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   var aleCorr = $scope.aleCorr;

   self.isQtyEditableSetting = !$stateParams.isCorrectionTab;
   self.title = $translate.instant('global.correction');
   self.subTitle = $translate.instant('global.orders.containing.product') + ' ' + ale.oeline.prod;
   self.returnInvoiceCollection = [];

   var returnInvoiceListCriteria = {
      custno: base.oehdr.custno,
      specnstype: ale.oeline.specnstype,
      prod: ale.oeline.prod
   };
   DataService.post('api/oe/asoeline/oereturnbuildinvoicelist', {
      data: returnInvoiceListCriteria, busy: true
   }, function (data) {
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
         selectedRecord.selectedfl = true;

         aleCorr.oeline.invno = selectedRecord.orderno;
         aleCorr.oeline.invsuf = selectedRecord.ordersuf;
         aleCorr.oeline.crlineno = selectedRecord.lineno;

         $state.go('^');
      } else {
         MessageService.alert('global.alert', 'message.no.record.selected');
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryCustProdCtrl', function ($scope, $state, $stateParams, DataService, MessageService, AuthService, Utils, Constants, GridService, UserService) {
   //alias => aleCustProd
   var self = this;
   var ale = $scope.ale;
   var base = $scope.base;

   var data = $stateParams.results;

   self.customerProductResults = [];
   self.selectedCustomerProduct = '';

   self.getCustomerProductTabDetails = function () {

      if (data.length === 0) {
         self.oeCustomerProduct = {};
         self.oeCustomerProduct.orderqty = 1;
         self.oeCustomerProduct.custno = base.oehdr.custno;
         self.oeCustomerProduct.prod = '';
         self.oeCustomerProduct.altprod = ale.oeline.prod;
         self.oeCustomerProduct.unitsell = ale.oeline.unit;
         self.oeCustomerProduct.shipto = base.oehdr.shipto;
         self.oeCustomerProduct.cono = UserService.getCono();
         self.oeCustomerProduct.rectype = "C";
         self.oeCustomerProduct.keyno = 1;
         self.isCustomerShipToEnable = !base.oehdr.shipto ? false : true;
         self.isCreateIcsec = true;
         self.isCreateSectionVisible = false;
         self.isIcsecGridVisible = true;
         self.isCustomerProductTabVisible = true;

         // If there is no ICSEC customer product, check if the user has already entered a one-time value
         if (ale.oeline.reqprod && ale.oeline.xrefprodty.toUpperCase() === 'C') {
            self.oeCustomerProduct.prod = ale.oeline.reqprod;
         }
      }
      else {

         var icsecFilterRecords = [];
         var icsecRecordsCount = 0;
         self.icsecList = [];
         self.icsecRecordCount = data.length;

         if (base.oehdr.shipto) {
            icsecFilterRecords = JSLINQ(data).Where(function (record) { return record.shipto === base.oehdr.shipto || !record.shipto }).ToArray() || [];
            icsecFilterRecords.forEach(function (record) {
               self.icsecList.push(record);
            });
            icsecRecordsCount = icsecFilterRecords.length;
         }
         else if (!base.oehdr.shipto) {
            icsecFilterRecords = JSLINQ(data).Where(function (record) { return record.rectype.toLowerCase() === 'c' }).ToArray() || [];
            icsecFilterRecords.forEach(function (record) {
               self.icsecList.push(record);
            });
            icsecRecordsCount = icsecFilterRecords.length;
         }

         if (icsecRecordsCount === 0) {
            self.oeCustomerProduct = {};
            self.oeCustomerProduct.orderqty = 1;
            self.oeCustomerProduct.custno = base.oehdr.custno;
            self.oeCustomerProduct.prod = '';
            self.oeCustomerProduct.altprod = ale.oeline.prod;
            self.oeCustomerProduct.unitsell = ale.oeline.unit;
            self.oeCustomerProduct.shipto = base.oehdr.shipto;
            self.oeCustomerProduct.cono = UserService.getCono();
            self.oeCustomerProduct.rectype = "C";
            self.oeCustomerProduct.keyno = 1;
            self.isCustomerShipToEnable = !base.oehdr.shipto ? false : true;
            self.isCreateIcsec = true;
            self.isCreateSectionVisible = false;
            self.isIcsecGridVisible = true;
            self.isCustomerProductTabVisible = true;
            self.isCloseCustomerProductTab = true;

            // If there is no ICSEC customer product, check if the user has already entered a one-time value
            if (ale.oeline.reqprod && ale.oeline.xrefprodty.toUpperCase() === 'C') {
               self.oeCustomerProduct.prod = ale.oeline.reqprod;
            }
         }
         else if (icsecRecordsCount === 1) {
            var icsec = self.icsecList[0];

            if (icsec !== null) {

               // If there is a value already stored on the OE line but it is different than the ICSEC record, display the value from the line
               if (ale.oeline.reqprod && ale.oeline.reqprod !== icsec.prod) {

                  self.oeCustomerProduct = {};
                  self.oeCustomerProduct.orderqty = 1;
                  self.oeCustomerProduct.custno = base.oehdr.custno;
                  self.oeCustomerProduct.prod = '';
                  self.oeCustomerProduct.altprod = ale.oeline.prod;
                  self.oeCustomerProduct.unitsell = ale.oeline.unit;
                  self.oeCustomerProduct.shipto = base.oehdr.shipto;
                  self.oeCustomerProduct.cono = UserService.getCono();
                  self.oeCustomerProduct.rectype = "C";
                  self.oeCustomerProduct.keyno = 1;
                  self.isCustomerShipToEnable = !base.oehdr.shipto ? false : true;
                  self.isCreateIcsec = true;
                  self.isCreateSectionVisible = false;
                  self.isIcsecGridVisible = true;
                  self.isCustomerProductTabVisible = true;
                  self.isCloseCustomerProductTab = true;

                  // If there is no ICSEC customer product, check if the user has already entered a one-time value
                  if (ale.oeline.reqprod && ale.oeline.xrefprodty.toUpperCase() === 'C') {
                     self.oeCustomerProduct.prod = ale.oeline.reqprod;
                  }

               } else {

                  // If there is no value already store or the value is the same as the ICSEC record, display the ICSEC data
                  self.oeCustomerProduct = {};
                  self.oeCustomerProduct.orderqty = icsec.orderqty;
                  self.oeCustomerProduct.custno = base.oehdr.custno;
                  self.oeCustomerProduct.prod = icsec.prod;
                  self.oeCustomerProduct.altprod = icsec.altprod;
                  self.oeCustomerProduct.unitsell = icsec.unitsell;
                  self.oeCustomerProduct.shipto = icsec.shipto;
                  self.oeCustomerProduct.cono = icsec.cono;
                  self.oeCustomerProduct.rectype = icsec.rectype;
                  self.oeCustomerProduct.addprtinfo = icsec.addprtinfo;
                  self.oeCustomerProduct.keyno = icsec.keyno;
                  self.isCustomerShipToEnable = !icsec.shipto ? false : true;
                  self.isCreateIcsec = false;
                  self.isCreateSectionVisible = false;
                  self.isIcsecGridVisible = true;
                  self.isCustomerProductTabVisible = true;

                  if (base.isRequireCustomerProd) {
                     ale.oeline.reqprod = icsec.prod;
                     ale.oeline.custprod = icsec.prod;
                     ale.oeline.xrefprodty = icsec.rectype;
                  }

               }

            }
         }
         else if (icsecRecordsCount > 1) {
            self.customerProductTabVisible = true;

            self.icsecList.forEach(function (record) {
               if (record.rectype.toLowerCase() === ale.oeline.xrefprodty.toLowerCase() && record.prod === ale.oeline.reqprod) {
                  record.selected = true;
                  self.selectedCustomerProduct = record.prod;
               }
               self.customerProductResults.push(record);
            });

            self.isIcsecGridVisible = false;
            self.isCreateSectionVisible = true;
         }
      }
   };

   self.getCustomerProductTabDetails();

   self.createCustProd = function () {
      var useNewRectype = '';
      var useNewShipto = '';

      if (self.oeCustomerProduct && !self.oeCustomerProduct.prod) {
         MessageService.error('global.error', 'message.customer.product.required');
         return;
      }

      if (self.isCreateIcsec) {

         if (self.oeCustomerProduct) {

            if (!self.oeCustomerProduct.unitsell) {
               MessageService.error('global.error', 'message.unit.is.a.required.field');
               return;
            }

            if (self.oeCustomerProduct.orderqty === 0) {
               MessageService.error('global.error', 'message.quantity.must.not.be.zero');
               return;
            }

            if (self.oeCustomerProduct.rectype.toUpperCase() === 'C') {
               useNewRectype = 'C';
               useNewShipto = '';
            }

            if (self.oeCustomerProduct.rectype.toUpperCase() === 'H' && self.oeCustomerProduct.shipto) {
               useNewRectype = 'H';
               useNewShipto = self.oeCustomerProduct.shipto;
            }
            else if (self.oeCustomerProduct.rectype.toUpperCase() === 'H' && !self.oeCustomerProduct.shipto) {
               useNewRectype = 'C';
               useNewShipto = '';
            }

            var newicsec = {
               rectype: useNewRectype,
               custno: self.oeCustomerProduct.custno,
               shipto: useNewShipto,
               altprod: self.oeCustomerProduct.altprod,
               prod: self.oeCustomerProduct.prod,
               orderqty: self.oeCustomerProduct.orderqty,
               unitsell: self.oeCustomerProduct.unitsell,
               price: self.oeCustomerProduct.price,
               custglacctno: self.oeCustomerProduct.custglacctno,
               addprtinfo: self.oeCustomerProduct.addprtinfo,
               cono: UserService.getCono()
            };

            var params = {
               rectype: useNewRectype,
               prod: self.oeCustomerProduct.prod,
               keyno: self.oeCustomerProduct.keyno,
               custno: self.oeCustomerProduct.custno,
               shipto: useNewShipto
            };

            // Because the user can toggle the Create New checkbox, be sure the record does not exist before creating
            DataService.post('api/ic/icsec/existsbykeynoprodcustshipto	', { data: params, busy: true }, function (exists) {
               if (exists) {

                  // If customer product xref exists, just use it on the line
                  self.selectedCustomerProduct = self.oeCustomerProduct.prod;
                  self.setCusProdToOeLine(self.selectedCustomerProduct, self.oeCustomerProduct.rectype);
                  self.back();

               } else {

                  // If customer product xref does not exist, create a new ICSEC and use it on the line
                  DataService.post('api/ic/icsec/', { data: newicsec, busy: true }, function (data) {
                     if (data) {
                        self.selectedCustomerProduct = self.oeCustomerProduct.prod;
                        self.setCusProdToOeLine(self.selectedCustomerProduct, self.oeCustomerProduct.rectype);
                        self.back();
                     }
                  });

               }
            });

         }
      }
      else {
         self.selectedCustomerProduct = self.oeCustomerProduct.prod;
         self.setCusProdToOeLine(self.selectedCustomerProduct, self.oeCustomerProduct.rectype);
         self.isCreateSectionVisible = false;
         self.back();
      }
   };

   self.clearCustProdSelections = function () {
      self.customerProductResults.forEach(function (record, index) {
         record.selected = false;
         self.grid.updateRow(index);
      });
   };

   self.gridRowSelected = function (e, args) {
      self.clearCustProdSelections();
      var row = args.row;
      var record = self.customerProductResults[row];
      if (record) {
         record.selected = true;
         self.selectedCustomerProduct = record.prod;
         self.grid.updateRow(row);
      }
   };

   self.setCusProdToOeLine = function (selectedProd, reftype) {
      ale.oeline.reqprod = selectedProd;
      ale.oeline.custprod = selectedProd;
      ale.oeline.xrefprodty = reftype;
   };

   self.applyCustProd = function () {
      var selectedRecords = JSLINQ(self.customerProductResults).Where(function (record) { return record.selected }).ToArray() || [];

      if (selectedRecords && selectedRecords.length === 0) {
         MessageService.error('global.error', 'message.select.customer.product.to.proceed');
         return;
      }

      if (!self.selectedCustomerProduct) {
         MessageService.error('global.error', 'message.select.customer.product.to.proceed');
         return;
      }
      else {
         self.setCusProdToOeLine(self.selectedCustomerProduct, selectedRecords[0].rectype);
      }
      self.back();
   };

   self.back = function () {
      if (ale.oeline.reqprod && (ale.oeline.xrefprodty.toUpperCase() === 'C' || ale.oeline.xrefprodty.toUpperCase() === 'H')) {
         MessageService.info('global.information', 'message.customer.product.added.to.line');
      }
      ale.validateLine(null, true);
      $state.go('^');
   };
});