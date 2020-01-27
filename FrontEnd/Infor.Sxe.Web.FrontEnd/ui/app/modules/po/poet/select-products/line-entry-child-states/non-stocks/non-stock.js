'use strict';

app.controller('PoetAdvancedLineEntryNonStockCtrl', function ($scope, $state, $stateParams, $translate, Utils, Constants, DataService, MessageService, AuthService) {
   //alias => aleNs
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   self.isNonstockMode = $stateParams.isNonstockMode;
   self.isProductLoaded = $stateParams.isProductLoaded;
   self.NONSTOCK_FIELDNAME_PRODUCT = 'prod';
   self.NONSTOCK_FIELDNAME_PRODUCTCATEGORY = 'prodcat';
   self.NONSTOCK_FIELDNAME_PRICE = 'price';
   self.NONSTOCK_FIELDNAME_COUNTRYOFORIGIN = 'countryoforigin';
   self.NONSTOCK_FIELDNAME_TARIFFCD = 'tariffcd';
   self.productSave = '';

   self.itemTypeCollection = [];

   self.isDefaults = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.nonStock.defaults');
   };

   self.getTitle = function () {
      return self.isNonstockMode ? $translate.instant('global.non.stock') : $translate.instant('global.not.for.resale');
   };

   self.nonStockHeader = {
      pono: base.pohdr.pono,
      posuf: base.pohdr.posuf,
      vendno: base.pohdr.vendno,
      whse: base.pohdr.whse,
      lineno: ale.poline.lineno
   };

   self.setupNonStock = function (callback) {
      var nonStockRetrieveRequest = {
         poline: ale.poline,
         polinenonstockhdr: self.nonStockHeader
      };

      //TODO AJW: If in Edit mode, SL-UI saves off the following.  Not sure the purpose.
      ale.poline.orgnonstockty = ale.poline.nonstockty;
      ale.poline.calcprice = ale.poline.price;

      DataService.post('api/po/aspoline/polinenonstockretrieve', { data: nonStockRetrieveRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.polineNonStock = data.polinenonstock;
               //NOTE: By design, the 'sasoo.useprevnsfl' feature is not offered in the POET function like in OEET.

               //Do some more work.
               if (callback) {
                  callback();
               }
            }
         }
      });
   };

   self.fieldChangedWithProductCheck = function () {
      self.nonStockFieldChanged(self.NONSTOCK_FIELDNAME_PRODUCT, true);
   };

   self.fieldChanged = function (fieldName) {
      self.nonStockFieldChanged(fieldName, false);
   };

   //Utilize the local copy if the user is going in and out of the Nonstock screen w/o persisting the data.
   if (base.firstNonStockInitialize) {
      //If the user changed the line type on the 1st screen, they are taken to this screen automatically.  If they
      //happened to enter the Product on the 1st screen before changing the Line Type, then we need to initiate a
      //field leave on it so we get the 'Use Settings' question if applicable.*/
      if (self.isProductLoaded) {
         self.setupNonStock(self.fieldChangedWithProductCheck);
      } else {
         self.setupNonStock();
      }
   } else {
      self.polineNonStock = ale.currpolineNonStock;
   }

   //This determines if we have questions to deal with on a product change.
   self.isProductUseSettingsFound = function () {
      var found = false;
      if (self.polineNonStock) {
         if (self.polineNonStock.quesanswer || self.polineNonStock.quesdescrip1 ||
            self.polineNonStock.quesdescrip2 || self.polineNonStock.quesmessage ||
            self.polineNonStock.quespriceavail || self.polineNonStock.quesprodcat) {
            found = true;
         }
      }

      return found;
   };

   self.nonStockFieldChanged = function (fieldName, isPerformChangeProductCheck) {
      if (ale.poline && self.polineNonStock && fieldName) {
         var isPerformCall = true;
         if (isPerformChangeProductCheck) {
            isPerformCall = self.productSave !== self.polineNonStock.prod ? true : false;
            self.productSave = self.polineNonStock.prod;
         }

         if (isPerformCall) {
            var polinenonstockleavefieldCriteria = {
               poline: ale.poline,
               polinenonstock: self.polineNonStock,
               polinenonstockhdr: self.nonStockHeader,
               cFieldName: fieldName
            };

            DataService.post('api/po/aspoline/polinenonstockleavefield', { data: polinenonstockleavefieldCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.polineNonStock = data.polinenonstock;

                     //We can get a question directed from the backend (i.e. Use Catalog defaults?)
                     if (self.isProductUseSettingsFound() && self.polineNonStock.quesanswer === '') {
                        var useDefaultSettingsMessage = self.polineNonStock.quesdescrip1 + base.CRLF +
                                                         self.polineNonStock.quesdescrip2 + base.CRLF +
                                                         self.polineNonStock.quespriceavail + base.CRLF +
                                                         self.polineNonStock.quesprodcat + base.CRLF +
                                                         self.polineNonStock.quesmessage + base.CRLF;

                        MessageService.yesNo('global.question', useDefaultSettingsMessage,
                        // Yes processing
                        function () {
                           self.polineNonStock.quesanswer = 'yes';
                           self.fieldChanged(self.NONSTOCK_FIELDNAME_PRODUCT);
                        }, // No processing
                        function () {
                           self.polineNonStock.quesanswer = 'no';
                        });
                     }
                  }

                  if (data.cWarningMessage) {
                     MessageService.info('global.information', data.cWarningMessage);
                  }
               }
            });
         }
      }
   };

   self.costCalculatorCostChangedCallback = function (calculatedCost) {
      if (calculatedCost) {
         self.polineNonStock.foreignCost = calculatedCost;
      }
   };

   self.moveNonStockDataToPoline = function () {

      ale.poline.cubes = self.polineNonStock.cubes;
      ale.poline.countryoforigin = self.polineNonStock.countryoforigin;
      ale.poline.dutyrate = self.polineNonStock.dutyrate;
      ale.poline.ncnr = self.polineNonStock.ncnr;
      ale.poline.prod = self.polineNonStock.prod;
      ale.poline.proddesc = self.polineNonStock.proddesc1;
      ale.poline.proddesc1 = self.polineNonStock.proddesc1;
      ale.poline.proddesc2 = self.polineNonStock.proddesc2;
      ale.poline.prodcat = self.polineNonStock.prodcat;
      ale.poline.scrnprice = self.polineNonStock.calcprice;
      ale.poline.tariffcd = self.polineNonStock.tariffcd;
      ale.poline.weight = self.polineNonStock.weight;
      ale.poline.upcid = self.polineNonStock.upcid;

      //Indicates that we went thru the Nonstock Screen entry.
      ale.poline.nonStkNFRDataOk = true;
      base.firstNonStockInitialize = false;
      ale.currpolineNonStock = self.polineNonStock;
   };

   self.saveNonStockStickyData = function () {
      base.nonStockStickyData = {};

      base.nonStockStickyData.cubes = self.polineNonStock.cubes;
      base.nonStockStickyData.countryoforigin = self.polineNonStock.countryoforigin;
      base.nonStockStickyData.dutyrate = self.polineNonStock.dutyrate;
      base.nonStockStickyData.ncnr = self.polineNonStock.ncnr;
      base.nonStockStickyData.prod = self.polineNonStock.prod;
      base.nonStockStickyData.proddesc1 = self.polineNonStock.proddesc1;
      base.nonStockStickyData.proddesc2 = self.polineNonStock.proddesc2;
      base.nonStockStickyData.prodcat = self.polineNonStock.prodcat;
      base.nonStockStickyData.price = self.polineNonStock.price;
      base.nonStockStickyData.tariffcd = self.polineNonStock.tariffcd;
      base.nonStockStickyData.weight = self.polineNonStock.weight;
      base.nonStockStickyData.upcid = self.polineNonStock.upcid;
   };

   self.finalizeNonStock = function () {
      var polinenonstockfinalCriteria = {
         poline: ale.poline,
         polinenonstock: self.polineNonStock,
         polinenonstockhdr: self.nonStockHeader
      };

      DataService.post('api/po/aspoline/polinenonstockfinal', { data: polinenonstockfinalCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.polineNonStock = data.polinenonstock;
               self.moveNonStockDataToPoline();

               if (ale.isAddLineMode && base.sasoo.useprevnsfl) {
                  self.saveNonStockStickyData();
               }

               //TODO AJW - Do we need to do this here??  OEET does.
               //ale.validateLine();

               if (ale.poline && ale.poline.nonstockty === base.NONSTOCKTYPE_RESALE) {
                  MessageService.info('global.information', 'message.resale.data.has.been.accepted');
               } else {
                  MessageService.info('global.information', 'message.non.stock.data.has.been.accepted');
               }

               $state.go('^');
            }
         }
      });
   };

   self.validateNonstock = function () {

      if (ale.poline && self.polineNonStock) {

         ale.poline.unit = base.UNIT_EACH;

         var polinenonstockvalidateCriteria = {
            poline: ale.poline,
            polinenonstock: self.polineNonStock,
            polinenonstockhdr: self.nonStockHeader
         };

         DataService.post('api/po/aspoline/polinenonstockvalidate', { data: polinenonstockvalidateCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data)) {
                  self.finalizeNonStock();
               }
            }
         });
      }
   };

   self.submit = function () {
      self.validateNonstock();
   };

   self.cancel = function () {
      self.setupNonStock();
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('PoetAdvancedLineEntryNonStockDefaultsCtrl', function ($scope, $state) {
   //alias => aleNsD
   var self = this;
   var aleNs = $scope.aleNs;

   self.submit = function () {
//      //set new defaults
//      aleNs.oelineNonStock.unit = aleNs.oelineNonStock.tempunit;
//      aleNs.oelineNonStock.serlottype = aleNs.oelineNonStock.tempserlottype;
//      aleNs.oelineNonStock.speccostty = aleNs.oelineNonStock.tempspeccostty;
//      aleNs.oelineNonStock.csunperstk = aleNs.oelineNonStock.tempcsunperstk;
//      aleNs.oelineNonStock.prccostper = aleNs.oelineNonStock.tempprccostper;
//      //clear out old ones
//      aleNs.oelineNonStock.tempunit = '';
//      aleNs.oelineNonStock.tempserlottype = '';
//      aleNs.oelineNonStock.tempspeccostty = '';
//      aleNs.oelineNonStock.tempcsunperstk = '';
//      aleNs.oelineNonStock.tempprccostper = '';
//
//      $state.go('^');
   };

   self.back = function () {
      $state.go('^');
   };
});