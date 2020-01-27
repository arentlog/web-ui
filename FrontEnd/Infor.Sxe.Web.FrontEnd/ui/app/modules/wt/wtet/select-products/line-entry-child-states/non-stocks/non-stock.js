'use strict';

app.controller('WtetAdvancedLineEntryNonStockCtrl', function ($scope, $state, $stateParams, $translate, Utils, Constants, DataService, MessageService, AuthService) {
   //alias => aleNs
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   self.isProductLoaded = $stateParams.isProductLoaded;

   self.NONSTOCK_FIELDNAME_PRODUCT = 'prod';

   self.isDefaults = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.nonStock.defaults');
   };

   self.nonStockHeader = {
      wtno: base.wthdr.wtno,
      wtsuf: base.wthdr.wtsuf,
      whse: base.wthdr.whse,
      cono2: base.wthdr.cono2,
      shipfmwhse: base.wthdr.shipfmwhse,
      shiptowhse: base.wthdr.shiptowhse,
      lineno: ale.wtline.lineno
   };

   self.wtlineNonStock = {
      prod: '',
      prodenabled: false,
      proddesc1: '',
      proddesc2: '',
      proddescenabled: false,
      prodcost: 0,
      prodcostenabled: false,
      vendno: 0,
      vendnoenabled: false,
      vendname: '',
      prodline: '',
      prodlineenabled: false,
      arpwhse: '',
      arpwhseenabled: false,
      foreigncost: 0,
      foreigncosthidden: false,
      exchangerate: 0,
      exchangeratehidden: false,
      currencyty: '',
      currencytyhidden: false,
      currencytyshort: '',
      currencytyshorthidden: false,
      prodcato: '',
      prodcatoenabled: false,
      prodcati: '',
      prodcatienabled: false,
      costcalculatebtnenabled: false,
      costcalculatebtnhidden: false,
      nonstockty: '',
      unit: '',
      quesanswer: '',
      quesdescrip1: '',
      quesdescrip2: '',
      quespriceavail: '',
      quesprodcat: '',
      quesmessage: '',
      quesoantext: '',
      quesoananswer: false
   };

   self.setupNonStock = function (callback) {
      var nonStockRetrieveRequest = {
         wtline: ale.wtline,
         wtlinenonstockhdr: self.nonStockHeader
      };

      ale.wtline.orgnonstockty = ale.wtline.nonstockty;
      ale.wtline.calcprice = ale.wtline.price;

      DataService.post('api/wt/aswtline/wtlinenonstockretrieve', { data: nonStockRetrieveRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.wtlineNonStock = data.wtlinenonstock;

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

   // first time in, execute the NonStock setup.
   if (ale.firstNonStockInitialize) {
      //If the user changed the line type on the 1st screen, they are taken to this screen automatically.  If they
      //happened to enter the Product on the 1st screen before changing the Line Type, then we need to initiate a
      //field leave on it so we get the 'Use Settings' question if applicable.*/
      if (self.isProductLoaded) {
         self.setupNonStock(self.fieldChangedWithProductCheck);
      } else {
         self.setupNonStock();
      }
   } else {
      self.wtlineNonStock = ale.currwtlineNonStock;
   }

   //This determines if we have questions to deal with on a product change.
   self.isProductUseSettingsFound = function () {
      var found = false;
      if (self.wtlineNonStock) {
         if (self.wtlineNonStock.quesanswer || self.wtlineNonStock.quesdescrip1 ||
            self.wtlineNonStock.quesdescrip2 || self.wtlineNonStock.quesmessage ||
            self.wtlineNonStock.quespriceavail || self.wtlineNonStock.quesprodcat) {
            found = true;
         }
      }

      return found;
   };

   self.nonStockFieldChanged = function (fieldName, isPerformChangeProductCheck) {
      if (ale.wtline && self.wtlineNonStock && fieldName) {
         var isPerformCall = true;
         if (isPerformChangeProductCheck) {
            isPerformCall = self.productSave !== self.wtlineNonStock.prod ? true : false;
            self.productSave = self.wtlineNonStock.prod;
         }

         if (isPerformCall) {
            var wtlinenonstockleavefieldCriteria = {
               wtline: ale.wtline,
               wtlinenonstock: self.wtlineNonStock,
               wtlinenonstockhdr: self.nonStockHeader,
               cFieldName: fieldName
            };

            DataService.post('api/wt/aswtline/wtlinenonstockleavefield', { data: wtlinenonstockleavefieldCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.wtlineNonStock = data.wtlinenonstock;

                     //We can get a question directed from the backend (i.e. Use Catalog defaults?)
                     if (self.isProductUseSettingsFound() && self.wtlineNonStock.quesanswer === '') {
                        var useDefaultSettingsMessage = self.wtlineNonStock.quesdescrip1 + base.CRLF +
                                                         self.wtlineNonStock.quesdescrip2 + base.CRLF +
                                                         self.wtlineNonStock.quespriceavail + base.CRLF +
                                                         MessageService.get('global.category') + ': ' + self.wtlineNonStock.quesprodcat + base.CRLF +
                                                         self.wtlineNonStock.quesmessage + base.CRLF;

                        MessageService.yesNo('global.question', useDefaultSettingsMessage,
                        // Yes processing
                        function () {
                           self.wtlineNonStock.quesanswer = 'yes';
                           self.fieldChanged(self.NONSTOCK_FIELDNAME_PRODUCT);
                        }, // No processing
                        function () {
                           self.wtlineNonStock.quesanswer = 'no';
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
         self.wtlineNonStock.foreignCost = calculatedCost;
      }
   };

   self.moveNonStockDataToWtline = function () {

      ale.wtline.prod = self.wtlineNonStock.prod;
      ale.wtline.proddesc1 = self.wtlineNonStock.proddesc1;
      ale.wtline.proddesc2 = self.wtlineNonStock.proddesc2;
      ale.wtline.prodcati = self.wtlineNonStock.prodcati;
      ale.wtline.prodcato = self.wtlineNonStock.prodcato;
      ale.wtline.vendno = self.wtlineNonStock.vendno;
      ale.wtline.prodline = self.wtlineNonStock.prodline;
      ale.wtline.prodcost = self.wtlineNonStock.prodcost;

      //Indicates that we went thru the Nonstock Screen entry.
      ale.wtline.nonStkNFRDataOk = true;
      ale.firstNonStockInitialize = false;
      ale.currwtlineNonStock = self.wtlineNonStock;
   };

   self.saveNonStockStickyData = function () {
      base.nonStockStickyData = {};

      base.nonStockStickyData.cubes = self.wtlineNonStock.cubes;
      base.nonStockStickyData.countryoforigin = self.wtlineNonStock.countryoforigin;
      base.nonStockStickyData.dutyrate = self.wtlineNonStock.dutyrate;
      base.nonStockStickyData.ncnr = self.wtlineNonStock.ncnr;
      base.nonStockStickyData.prod = self.wtlineNonStock.prod;
      base.nonStockStickyData.proddesc = self.wtlineNonStock.proddesc;
      base.nonStockStickyData.proddesc2 = self.wtlineNonStock.proddesc2;
      base.nonStockStickyData.prodcat = self.wtlineNonStock.prodcat;
      base.nonStockStickyData.price = self.wtlineNonStock.price;
      base.nonStockStickyData.tariffcd = self.wtlineNonStock.tariffcd;
      base.nonStockStickyData.weight = self.wtlineNonStock.weight;
   };

   self.finalizeNonStock = function () {
      var wtlinenonstockfinalCriteria = {
         wtline: ale.wtline,
         wtlinenonstock: self.wtlineNonStock,
         wtlinenonstockhdr: self.nonStockHeader
      };

      DataService.post('api/wt/aswtline/wtlinenonstockfinal', { data: wtlinenonstockfinalCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.wtlineNonStock = data.wtlinenonstock;
               self.moveNonStockDataToWtline();

               if (ale.isAddLineMode && base.sasoo.useprevnsfl) {
                  self.saveNonStockStickyData();
               }

               MessageService.info('global.information', 'message.non.stock.data.has.been.accepted');
               $state.go('^');
            }
         }
      });
   };

   self.validateNonstock = function () {

      if (ale.wtline && self.wtlineNonStock) {

         ale.wtline.unit = base.UNIT_EACH;

         var wtlinenonstockvalidateCriteria = {
            wtline: ale.wtline,
            wtlinenonstock: self.wtlineNonStock,
            wtlinenonstockhdr: self.nonStockHeader
         };

         DataService.post('api/wt/aswtline/wtlinenonstockvalidate', { data: wtlinenonstockvalidateCriteria, busy: true }, function (data) {
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

   self.defaultFields = function () {
//      //set temp fields for use in defaults screen
//      self.oelineNonStock.tempunit = self.oelineNonStock.unit;
//      self.oelineNonStock.tempserlottype = self.oelineNonStock.serlottype;
//      self.oelineNonStock.tempspeccostty = self.oelineNonStock.speccostty;
//      self.oelineNonStock.tempcsunperstk = self.oelineNonStock.csunperstk;
//      self.oelineNonStock.tempprccostper = self.oelineNonStock.prccostper;
//
//      $state.go(base.baseState + '.selectProducts.advancedLineEntry.nonStock.defaults');
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