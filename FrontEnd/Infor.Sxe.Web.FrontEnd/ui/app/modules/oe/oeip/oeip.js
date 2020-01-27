'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('oe', 'oeip', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oeip');

   $stateProvider.state('oeip.detail', {
      url: '/detail?id&pk&pk2&pk3&pk4',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeip/detail.json');
            },
            controller: 'OeipDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('oeip.detail.work-sheet', {
      url: '/worksheet',
      params: { record: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeip/worksheet.json');
            },
            controller: 'OeipWorkSheetCtrl as ws'
         }
      }
   });

   $stateProvider.state('oeip.detail.work-sheet.varollup', {
      url: '/va-rollup',
      views: {
         varollup: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeip/varollup.json');
            },
            controller: 'OeipVaRollupCtrl as rollup'
         }
      }
   });

   $stateProvider.state('oeip.detail.customerreservation', {
      url: '/customer-reservation',
      params: { prod: null, whse: null, custno: null, shipto: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/customer-reservation/customer-reservation.json');
            },
            controller: 'CustomerReservationCtrl as cstres'
         }
      }
   });

   // Create Catalog In Inventory
   $stateProvider.state('oeip.detail.createCatalogInInventory', {
      url: '/create-catalog-in-inventory',
      params: {
         productType: null,
         statusType: null,
         hsCode: null,
         countryCode: null,
         orderasneeded: null,
         oannonstock: null,
         callbackFunction: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeip/create-catalog-in-inventory.json');
            },
            controller: 'OeipGeneralCreateCatalogInInventoryCtrl as cci'
         }
      }
   });

   $stateProvider.state('oeip.detail.createquote', {
      url: '/create-quote',
      params: { quoteList: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeip/create-quote.json');
            },
            controller: 'OeipGeneralCreateQuoteCtrl as cq'
         }
      }
   });

   $stateProvider.state('oeip.detail.altproducts', {
      url: '/alternate-products',
      params: { prod: null, whse: null, custno: null, prodalt: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeip/alt-products.json');
            },
            controller: 'OeipGeneralAltProductsCtrl as altprod'
         }
      }
   });

});

app.controller('OeipBaseCtrl', function ($state, AodataService, ConfigService, DataService, MessageService, Sasoo) {
   var self = this;
   self.sasoo = Sasoo;
   self.criteria = {
      whse: self.sasoo.homewhsefl ? self.sasoo.whse : ''
   };
   self.oeipDisplayCriteria = {};
   self.arsc = {};
   self.quotesProductCollection = [];
   self.isHighestPriceOptionVisible = AodataService.getValue('OE', 'oehighpricemonths') !== '0';
   self.hipriceignore = !self.isHighestPriceOptionVisible;
   self.pdscRebSubTyAOData = AodataService.getValue("PD", "PDSCRebateSubType").toLowerCase() === 'yes';

   self.isMaster = function () {
      return $state.is('oeip.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeip.master');
   };

   self.isDetail = function () {
      return $state.is('oeip.detail');
   };

   self.includesDetail = function () {
      return $state.includes('oeip.detail');
   };

   self.isWorkSheet = function () {
      return $state.is('oeip.detail.work-sheet');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   self.showDetail = function () {
      $state.go('oeip.detail', {
         pk: self.criteria.custno,
         pk2: self.criteria.whse,
         pk3: self.criteria.prod,
         pk4: self.criteria.shipto
      });
   };

   // If product exists, go to detail
   self.search = function () {
      if (self.criteria.prod && self.criteria.whse) {
         DataService.get('api/ic/icsw/existsbypk', { params: { prod: self.criteria.prod, whse: self.criteria.whse }, busy: true }, function (icswData) {
            if (icswData) {
               self.showDetail();
            } else {
               DataService.get('api/ic/icsc/existsbypk', { params: { catalog: self.criteria.prod }, busy: true }, function (icscData) {
                  if (icscData) {
                     MessageService.yesNo('global.confirmation', 'question.product.found.in.catalog.accept.catalog.item', function () {
                        self.showDetail();
                     });
                  } else {
                     self.showDetail();
                  }
               });
            }
         });
      } else {
         self.showDetail();
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('OeipSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeip.master');
      }

      // Get data
      base.search();
   };

   self.customerChanged = function (args) {
      if (base.criteria.custno) {
         var custParams = {
            custno: base.criteria.custno
         };

         DataService.get('api/ar/arsc/getbypk', { params: custParams, busy: true }, function (data) {
            if (data) {
               base.criteria.whse = data.whse;
               base.arsc = data;
               if (args.value2) {
                  self.getShiptoDetails();
               }
            }
         });
      }
   };
   self.getShiptoDetails = function () {
      if (base.criteria.custno && base.criteria.shipto) {
         var arssparams = {
            custno: base.criteria.custno,
            shipto: base.criteria.shipto
         };
         DataService.get('api/ar/arss/getbypk', { params: arssparams, busy: true }, function (arss) {
            if (arss) {
               base.criteria.whse = arss.whse;
            }
         });
      }
   };
   self.shipToSelected = function (args) {
      base.criteria.custno = args.value2;
      base.criteria.shipto = args.value;
      self.customerChanged(args);      
   };

});

app.controller('OeipMasterCtrl', function () {

});

app.controller('OeipDetailCtrl', function ($scope, $state, $stateParams, $translate, SecurityService) {
   var self = this;
   var base = $scope.base;

   base.criteria.custno = $stateParams.pk;
   base.criteria.whse = $stateParams.pk2;
   base.criteria.prod = $stateParams.pk3;
   base.criteria.shipto = $stateParams.pk4;

   self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('oeip', 'General') < 3;
   self.isWarehouseTabReadonly = SecurityService.getSubSecurityLevel('oeip', 'Whse Avail') < 3;
   self.isPriceTabReadonly = SecurityService.getSubSecurityLevel('oeip', 'Price Records') < 3;
   self.isRebatesTabReadonly = SecurityService.getSubSecurityLevel('oeip', 'Rebates') < 3;

   // initialize display criteria unless coming from worksheet state when will be using criteria from worksheet
   if (!base.isFromWorksheet) {
      base.oeipDisplayCriteria = {
         custno: base.criteria.custno,
         shipto: base.criteria.shipto,
         whse: base.criteria.whse,
         prod: base.criteria.prod,
         qty: 1,
         hipriceignore: base.hipriceignore,
         prcwrkshtdiscfl: false,
         prcwrkshtmcostplus: 0,
         prcwrkshtmdiscamt: 0,
         prcwrkshtmdiscpct: 0,
         prcwrkshtmmargin: 0,
         prcwrkshtmprice: 0
      };
   } else {
      base.isFromWorksheet = false;
   }

   self.getSubTitle = function () {
      var subTitle = '';

      if (base.criteria.shipto) {
         subTitle += $translate.instant('global.ship.to') + ': ' + base.criteria.shipto + ' | ';
      }

      if (base.criteria.whse) {
         subTitle += $translate.instant('global.warehouse') + ': ' + base.criteria.whse + ' | ';
      }

      if (base.criteria.prod) {
         subTitle += $translate.instant('global.product') + ': ' + base.criteria.prod;
      }

      return subTitle;
   };
});

app.controller('OeipGeneralCtrl', function ($scope, $state, $stateParams, $translate, ConfigService, Constants, DataService, ImageService, Sasoo, StandardConverters, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var prod = $stateParams.pk3;
   self.showProductImage = ConfigService.isShowImages();
   self.currencyDescription = '';

   // Get product image url
   if (ConfigService.isShowImages()) {
      ImageService.getImageUrl(prod, 'icsw', '', false, function (url) {
         if (url) {
            self.productImageUrl = url;
         } else {
            self.showProductImage = false;
         }
      });
   }

   self.isSheetPriceVisible = false;
   self.isWorkSheetVisible = false;
   self.isWorkSheetEnabled = (Sasoo.oepricefl === 'e') ? true : false;

   self.customerPricing = {};
   self.oeipDisplayResults = {};
   self.pdsps = {};

   self.refreshPricingData = function () {
      base.oeipDisplayCriteria.qty = self.oeipDisplayResults.qty;
      base.oeipDisplayCriteria.unit = self.oeipDisplayResults.unit;
      self.loadPricingData();
   };

   self.loadPricingData = function () {
      base.oeipDisplayCriteria.hipriceignore = base.hipriceignore;
      if (base.oeipDisplayCriteria.prod && base.oeipDisplayCriteria.whse) {
         DataService.post('api/oe/asoeinquiry/oeipdisplay', { data: base.oeipDisplayCriteria, busy: true }, function (data) {
            if (data) {
               self.oeipDisplayResults = data.oeipdisplayresults;
               if (self.oeipDisplayResults.priceorigcd.substring(0, 1) === 'H') {
                  self.oeipDisplayResults.priceorigcddtl = self.oeipDisplayResults.hiprcorderno + '-' + Utils.pad(self.oeipDisplayResults.hiprcordersuf, 2) + ',' + self.oeipDisplayResults.hiprclineno;
               }
               base.oeipDisplayCriteria.qty = data.oeipdisplayresults.qty;
               base.oeipDisplayCriteria.unit = data.oeipdisplayresults.unit;

               if (self.oeipDisplayResults.pdrecno > 0) {
                  self.loadCustomerPricing();
               } else {
                  self.customerPricing = {};
                  self.isSheetPriceVisible = false;
                  self.isWorkSheetVisible = true;
               }

               // Build the data for the Margin Percent chart
               if (!self.oeipDisplayResults.marginpcthidden) {
                  var formattedPercent = StandardConverters.Percent.convert(self.oeipDisplayResults.marginpct, null, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                  var color = self.oeipDisplayResults.marginpct < 0 ? 'error' : 'colored';
                  self.marginChartOptions = {
                     dataset: [{
                        data: [{
                           name: { text: $translate.instant('global.margin.percent') },
                           info: { value: formattedPercent, color: color },
                           completed: { value: self.oeipDisplayResults.marginpct }
                        }]
                     }]
                  };
               } else {
                  self.marginChartOptions = null;
               }

               //User Hook (do not rename)
               if (self.oeipDisplayContinue) {
                  self.oeipDisplayContinue(data);
               }
            }
         });
      }
   };

   self.loadCustomerPricing = function () {
      var pdscParams = {
         pdrecno: self.oeipDisplayResults.pdrecno
      };
      base.criteria.pdrecno = self.oeipDisplayResults.pdrecno;
      DataService.get('api/pd/pdsc/listbypdrecno', { params: pdscParams, busy: true }, function (data) {
         if (data) {
            self.customerPricing = data[0];
            if (self.customerPricing) {
               if (self.customerPricing.priceSheet) {
                  self.isSheetPriceVisible = true;

                  self.loadSheetPrices();
               }
               else {
                  self.isSheetPriceVisible = false;
               }

               if (self.customerPricing.ovrridepctup !== 0 || self.customerPricing.ovrridepctdown !== 0) {
                  self.isWorkSheetVisible = false;
               }
               else {
                  self.isWorkSheetVisible = true;
               }
            }

            //User Hook (do not rename)
            if (self.loadCustomerPricingContinue) {
               self.loadCustomerPricingContinue(data);
            }
         }
      });
   };

   self.loadSheetPrices = function () {

      var priceSheetData = {
         prod: self.customerPricing.prod,
         whse: self.customerPricing.whse,
         pricesheet: self.customerPricing.priceSheet,
         effectivedt: self.customerPricing.priceEffectiveDate
      };

      DataService.post('api/pd/aspdsetup/pricesheetdata', { data: priceSheetData, busy: true }, function (data) {
         if (data) {
            self.pdsps = data[0];

            self.columnMatrix = [
               { seqno: MessageService.get('number.1'), custmatrix: self.pdsps.custmatrix1, vendmatrix: self.pdsps.vendmatrix1 },
               { seqno: MessageService.get('number.2'), custmatrix: self.pdsps.custmatrix2, vendmatrix: self.pdsps.vendmatrix2 },
               { seqno: MessageService.get('number.3'), custmatrix: self.pdsps.custmatrix3, vendmatrix: self.pdsps.vendmatrix3 },
               { seqno: MessageService.get('number.4'), custmatrix: self.pdsps.custmatrix4, vendmatrix: self.pdsps.vendmatrix4 },
               { seqno: MessageService.get('number.5'), custmatrix: self.pdsps.custmatrix5, vendmatrix: self.pdsps.vendmatrix5 },
               { seqno: MessageService.get('number.6'), custmatrix: self.pdsps.custmatrix6, vendmatrix: self.pdsps.vendmatrix6 },
               { seqno: MessageService.get('number.7'), custmatrix: self.pdsps.custmatrix7, vendmatrix: self.pdsps.vendmatrix7 },
               { seqno: MessageService.get('number.8'), custmatrix: self.pdsps.custmatrix8, vendmatrix: self.pdsps.vendmatrix8 },
               { seqno: MessageService.get('number.9'), custmatrix: self.pdsps.custmatrix9, vendmatrix: self.pdsps.vendmatrix9 }
            ];

            //User Hook (do not rename)
            if (self.loadSheetPricesContinue) {
               self.loadSheetPricesContinue(data);
            }
         }
      });

   };

   self.showWorkSheet = function () {
      var workSheetRecord = {
         custno: base.oeipDisplayCriteria.custno,
         shipto: base.oeipDisplayCriteria.shipto,
         whse: base.oeipDisplayCriteria.whse,
         prod: base.oeipDisplayCriteria.prod,
         unit: base.oeipDisplayCriteria.unit,
         qty: base.oeipDisplayCriteria.qty,
         prcwrkshtdiscfl: base.oeipDisplayCriteria.prcwrkshtdiscfl,
         prcwrkshtmcostplus: base.oeipDisplayCriteria.prcwrkshtmcostplus,
         prcwrkshtmdiscamt: base.oeipDisplayCriteria.prcwrkshtmdiscamt,
         prcwrkshtmdiscpct: base.oeipDisplayCriteria.prcwrkshtmdiscpct,
         prcwrkshtmmargin: base.oeipDisplayCriteria.prcwrkshtmmargin,
         prcwrkshtmprice: base.oeipDisplayCriteria.prcwrkshtmprice,
         quoteno: '',
         jobno: '',
         enddt: null,
         jobfl: false,
         pdrecno: self.customerPricing ? self.customerPricing.pdrecno : null
      };

      $state.go('.work-sheet', { record: workSheetRecord });
   };

   self.showCreateQuote = function () {

      if (base.quotesProductCollection.length > 0) {
         $state.go('.createquote', { quoteList: base.quotesProductCollection });
      }
      else {
         MessageService.error('global.error', 'message.there.are.no.products.that.have.been.recorded.yet');
      }
   };

   self.showCustomerReservations = function () {
      if (base.oeipDisplayCriteria.prod && base.oeipDisplayCriteria.whse && base.oeipDisplayCriteria.custno) {
         $state.go('.customerreservation', {
            prod: base.oeipDisplayCriteria.prod,
            whse: base.oeipDisplayCriteria.whse,
            custno: base.oeipDisplayCriteria.custno,
            shipto: base.oeipDisplayCriteria.shipto
         });
      }
   };

   self.showAltProducts = function () {
      if (base.oeipDisplayCriteria.prod && base.oeipDisplayCriteria.whse && base.oeipDisplayCriteria.custno) {
         $state.go('.altproducts', {
            prod: base.oeipDisplayCriteria.prod,
            whse: base.oeipDisplayCriteria.whse,
            custno: base.oeipDisplayCriteria.custno,
            prodalt: self.oeipDisplayResults.prodalt
         });
      }
   };

   self.showRecordPrice = function () {

      if ((base.arsc && !base.oeipDisplayCriteria.shipto && !base.arsc.shipreqfl) || base.oeipDisplayCriteria.shipto) {
         var checkDuplicateCollection;
         if (base.oeipDisplayCriteria.shipto) {

            checkDuplicateCollection = JSLINQ(base.quotesProductCollection).Where(function (quote) {
               return quote.custno === base.oeipDisplayCriteria.custno &&
                quote.prod === base.oeipDisplayCriteria.prod &&
                quote.whse === base.oeipDisplayCriteria.whse &&
                quote.shipto === base.oeipDisplayCriteria.shipto;
            }).items;
         }
         else {
            checkDuplicateCollection = JSLINQ(base.quotesProductCollection).Where(function (quote) {
               return quote.custno === base.oeipDisplayCriteria.custno &&
                quote.prod === base.oeipDisplayCriteria.prod &&
                quote.whse === base.oeipDisplayCriteria.whse;
            }).items;
         }

         if (checkDuplicateCollection.length > 0) {

            var quote = checkDuplicateCollection[0];
            var message = MessageService.get('message.this.product.has.already.been.recorded.qty.equals.') + quote.qtyord + '<br>';
            message += MessageService.get('global.unit') + ' =' + quote.unit + '<br>';
            message += MessageService.get('global.overwrite.this.line.item');

            MessageService.yesNoCancel('global.information', message, function () {
               // yes - remove recorded price and create new one
               base.quotesProductCollection.splice(base.quotesProductCollection.indexOf(quote), 1);
               self.addRecordedPrice();
            }, function () {
               // no - record the price as an additional entry
               self.addRecordedPrice();
            }, function () {
               // cancel - do nothing - current recorded price will be unchanged
            });
         }
         else {
            self.addRecordedPrice();
         }
      }
      else {
         MessageService.error('global.error', 'message.a.valid.ship.to.is.required');
      }
   };

   self.getRecordPrice = function () {

      var oeipCreateQuotesProd;
      if (base.oeipDisplayCriteria && base.oeipDisplayCriteria.custno > 0 && base.oeipDisplayCriteria.prod &&
         base.oeipDisplayCriteria.whse && self.oeipDisplayResults) {
         oeipCreateQuotesProd =
          {
             custno: base.oeipDisplayCriteria.custno, //ignore jslint - correct indentation
             shipto: base.oeipDisplayCriteria.shipto, //ignore jslint - correct indentation
             prod: base.oeipDisplayCriteria.prod, //ignore jslint - correct indentation
             whse: base.oeipDisplayCriteria.whse, //ignore jslint - correct indentation
             unit: base.oeipDisplayCriteria.unit, //ignore jslint - correct indentation
             qtyord: base.oeipDisplayCriteria.qty, //ignore jslint - correct indentation
             description: self.oeipDisplayResults.proddesc, //ignore jslint - correct indentation
             name: base.arsc.name //ignore jslint - correct indentation
          }; //ignore jslint - correct indentation
         if (base.oeipDisplayCriteria.prcwrkshtmdiscamt > 0) {
            oeipCreateQuotesProd.disctype = true;
            oeipCreateQuotesProd.discamt = base.oeipDisplayCriteria.prcwrkshtmdiscamt;
         }
         else if (base.oeipDisplayCriteria.prcwrkshtmdiscpct > 0) {
            oeipCreateQuotesProd.disctype = false;
            oeipCreateQuotesProd.discamt = base.oeipDisplayCriteria.prcwrkshtmdiscpct;
         }
         oeipCreateQuotesProd.price = self.oeipDisplayResults.priceunit;
      }
      else {
         MessageService.error('global.error', 'message.enter.a.valid.input.criteria');
      }
      return oeipCreateQuotesProd;
   };

   self.recordPrice = function () {
      var oeipCreateQuotesProd = self.getRecordPrice();

      if (oeipCreateQuotesProd) {
         base.quotesProductCollection.push(oeipCreateQuotesProd);
         MessageService.info('global.information', 'message.the.price.for.this.product.has.been.recorded');
      }
   };

   self.recordWithCatalog = function (productType, statusType, hsCode, countryCode) {
      var oeipCreateQuotesProd = self.getRecordPrice();

      if (oeipCreateQuotesProd) {
         // Additional information to trigger product creation
         oeipCreateQuotesProd.createfromcat = true;
         oeipCreateQuotesProd.producttype = productType;
         oeipCreateQuotesProd.statusty = statusType;
         oeipCreateQuotesProd.tariffcd = hsCode;
         oeipCreateQuotesProd.countryoforigin = countryCode;
         oeipCreateQuotesProd.prodtype = statusType === 'n' ? statusType + productType : productType;

         base.quotesProductCollection.push(oeipCreateQuotesProd);
         MessageService.info('global.information', 'message.the.price.for.this.product.has.been.recorded');

         $state.go('^');
      }
   };

   //User Hook (do not rename)
   self.addRecordedPriceAffirmativeContinue = function (data, statusType, hsCode, countryCode) {
      $state.go('.createCatalogInInventory', {
         productType: 's',
         statusType: statusType,
         hsCode: hsCode,
         countryCode: countryCode,
         orderasneeded: self.oeipDisplayResults.orderasneededfl,
         oannonstock: self.oeipDisplayResults.oannonstockfl,
         callbackFunction: self.recordWithCatalog
      });
   }

   //User Hook (do not rename)
   self.addRecordedPriceAffirmative = function () {
      var initCriteriaProdFromCat = {
         prod: base.oeipDisplayCriteria.prod,
         whse: base.oeipDisplayCriteria.whse,
         fieldlist: 'countryoforigin,tariffcd'
      };

      DataService.post('api/oe/asoeline/oeinitcreateprodfromcat', { data: initCriteriaProdFromCat, busy: true }, function (data) {
         if (data) {
            var hsCode;
            var countryCode;
            var statusType = self.oeipDisplayResults.orderasneededfl ? 'o' : 'n';
            data.forEach(function (initCreateProdResults) {
               if (initCreateProdResults.fieldname === 'tariffcd') {
                  hsCode = initCreateProdResults.fieldvalue;
               }
               if (initCreateProdResults.fieldname === 'countryoforigin') {
                  countryCode = initCreateProdResults.fieldvalue;
               }
            });

            //User Hook (do not rename)
            self.addRecordedPriceAffirmativeContinue(data, statusType, hsCode, countryCode);
         }
      });
   }

   //User Hook (do not rename)
   self.addRecordedPriceContinue = function () {
      MessageService.yesNoCancel('global.confirmation', $translate.instant('question.create.catalog.product.in.inventory'),
         function () {
            //User Hook (do not rename)
            self.addRecordedPriceAffirmative();
         },
         function () {
            if (!Sasoo.nonstockfl) {
               // If the user does not have security to enter a non-stock product and they choose to NOT
               // create the catalog product, then do not record the price
               MessageService.error('global.error', 'global.operator.security.prohibits.non.stock.product.entry');
            }
            else {
               // Record the price
               self.recordPrice();
            }
         });
   }

   self.addRecordedPrice = function () {
      // Catalog Product - Can Create in ICSP
      if (self.oeipDisplayResults && self.oeipDisplayResults.createicspfl) {
         // ICSC Set to allow OAN or OAN-Nonstock
         if (self.oeipDisplayResults.orderasneededfl || self.oeipDisplayResults.oannonstockfl) {
            //User Hook (do not rename)
            self.addRecordedPriceContinue();
         } else {
            // Catalog set to not be converted to a stock item in ICSC
            if (!Sasoo.nonstockfl) {
               MessageService.error('global.error', 'global.operator.security.prohibits.non.stock.product.entry');
            } else {
               self.recordPrice();
            }
         }
      } else {
         // Not a Catalog Product
         self.recordPrice();
      }
   };

   self.priceSheetVisibility = function (fieldType) {

      if (fieldType === 'cost') {
         return Sasoo.seecostfl;
      } else if (fieldType === 'price') {
         if (Sasoo.oepricefl.toLowerCase() === 'n') {
            return false;
         } else {
            return true;
         }
      } else {
         return false;
      }
   };

   self.getCurrencyDescription = function () {
      var params = {
         custno: base.criteria.custno,
         fldlist: 'currencyty'
      };

      DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.currencyDescription = '';
            if (data.currencyty) {
               var sastaParams = {
                  currencyty: data.currencyty,
                  fldlist: 'descrip'
               };
               DataService.get('api/sa/sastc/getbypk', { params: sastaParams, busy: true }, function (sastc) {
                  if (sastc) {
                     self.currencyDescription = sastc.descrip;
                  }
               });
            }
         }
      });
   };

   self.loadPricingData();
   self.getCurrencyDescription();
});

app.controller('OeipWorkSheetCtrl', function ($scope, $state, $stateParams, DataService, SecurityService, Sasc, MessageService) {
   var self = this;
   var base = $scope.base;

   self.isEditable = false;
   self.isShipToAvailable = false;
   self.isWhseEnabled = false;
   self.isVaRollupVisibile = false;

   self.securityLevel = SecurityService.getSecurityLevel('oeip');
   self.pricingRecord = $stateParams.record;

   self.loadDefaults = function () {
      if (Sasc.pdlevelfl1 && self.securityLevel >= 4) {
         self.isEditable = true;
         self.isShipToAvailable = (self.pricingRecord && self.pricingRecord.shipto) ? true : false;
         self.isWhseEnabled = Sasc.pdwhsefl;

         self.pricingRecord.jobfl = self.isShipToAvailable;
         self.pricingRecord.whsefl = self.isWhseEnabled;
      }

      //Check VA Roll Visibility
      var icswParams = {
         prod: self.pricingRecord.prod,
         whse: self.pricingRecord.whse
      };

      DataService.get('api/ic/icsw/getbypk', { params: icswParams, busy: true }, function (data) {
         if (data) {
            if (data.arptype.toUpperCase() === 'F') {
               self.isVaRollupVisibile = true;
            }
         }
      });
   };

   self.submit = function () {
      if (self.pricingRecord.pdrecno) {
         MessageService.okCancel('global.confirmation', 'question.update.existing.pdsc.record', function () {
            self.pricingRecord.updateexistingfl = true;
            self.createPdscRecord();
         });
      }
      else {
         self.createPdscRecord();
      }
   };

   self.createPdscRecord = function () {
      var pdscRecordList = [];
      pdscRecordList.push(self.pricingRecord);

      //User Hook (do not rename)
      if (self.setPdscRecordCreateCriteria) {
         self.setPdscRecordCreateCriteria(self.pricingRecord);
      }

      DataService.post('api/pd/aspdsetup/pdcreatepdscrecordfromoeip', { data: pdscRecordList, busy: true }, function () {
         $state.go('^', null, { reload: '^' });
      });
   };

   self.pricingUpdateComplete = function () {
      base.oeipDisplayCriteria.prcwrkshtmdiscamt = self.pricingRecord.prcwrkshtmdiscamt;
      base.oeipDisplayCriteria.prcwrkshtmdiscpct = self.pricingRecord.prcwrkshtmdiscpct;
      base.oeipDisplayCriteria.prcwrkshtmprice = self.pricingRecord.prcwrkshtmprice;
      base.oeipDisplayCriteria.prcwrkshtmmargin = self.pricingRecord.prcwrkshtmmargin;
      base.oeipDisplayCriteria.prcwrkshtdiscfl = self.pricingRecord.prcwrkshtdiscfl;
      base.oeipDisplayCriteria.prcwrkshtmcostplus = self.pricingRecord.prcwrkshtmcostplus;
      base.isFromWorksheet = true;
      $state.go('^', null, { reload: '^' });
   };

   self.vaRollupClicked = function () {
      $state.go('oeip.detail.work-sheet.varollup');
   };

   self.loadDefaults();

});

app.controller('OeipVaRollupCtrl', function ($scope, $state, $stateParams, $translate, AodataService, DataService) {
   var self = this;
   var base = $scope.base;
   self.workSheetRecord = $stateParams.record;

   self.vaPrcSheetFl = AodataService.getValue("VA", "vaprcsheetfl");
   self.vacalcdfltty = 'margin';
   if (self.vaPrcSheetFl === true) {
      self.vacalcdfltty = 'markup';
   }

   self.criteria = {
      vacalcdfltty: self.vacalcdfltty,
      ourproc: 'oeip',
      orderno: 0,
      ordersuf: 0,
      lineno: 0,
      pdrecno: 0,
      prod: base.oeipDisplayCriteria.prod,
      whse: base.oeipDisplayCriteria.whse,
      qty: base.oeipDisplayCriteria.qty,
      unit: base.oeipDisplayCriteria.unit,
      custno: base.oeipDisplayCriteria.custno,
      shipto: base.oeipDisplayCriteria.shipto
   };
   DataService.post('api/va/asvaentry/varollcstprcinitialize', { data: self.criteria, busy: true }, function (rollupInitData) {
      if (rollupInitData) {
         self.results = rollupInitData;
         self.results.overprc = self.results.vatotprc;
      }
   }, function () {
      //call errored out, leave
      self.cancel();
   });

   self.laborBasedLabel = function () {
      var returnLabel = $translate.instant('global.price.labor.based.on.cost.');
      if (self.criteria.vacalcdfltty === 'margin') {
         return returnLabel + $translate.instant('global.margin');
      } else if (self.criteria.vacalcdfltty === 'markup') {
         return returnLabel + $translate.instant('global.markup');
      } else {
         return '';
      }
   };

   self.inventoryBasedLabel = function () {
      var returnLabel = $translate.instant('global.price.inventory.based.on.');
      if (self.criteria.vacalcdfltty === 'margin') {
         return returnLabel + $translate.instant('global.margin');
      } else if (self.criteria.vacalcdfltty === 'markup') {
         return returnLabel + $translate.instant('global.markup');
      } else {
         return '';
      }
   };

   self.marginsOrMarkups = function () {
      if (self.criteria.vacalcdfltty === 'margin') {
         return $translate.instant('global.margin');
      } else if (self.criteria.vacalcdfltty === 'markup') {
         return $translate.instant('global.markup');
      } else {
         return '';
      }
   };

   self.update = function () {
      if (self.results.overprc) {
         self.workSheetRecord.prcwrkshtmprice = self.results.overprc;
         self.workSheetRecord.prcwrkshtmcostplus = 0;
         self.workSheetRecord.prcwrkshtmdiscamt = 0;
         self.workSheetRecord.prcwrkshtmdiscpct = 0;
         self.workSheetRecord.prcwrkshtmdiscpct = 0;
         self.workSheetRecord.prcwrkshtdiscfl = false;
         base.criteria.prcwrkshtmprice = self.results.overprc;
         base.criteria.prcwrkshtmcostplus = 0;
         base.criteria.prcwrkshtmdiscamt = 0;
         base.criteria.prcwrkshtmdiscpct = 0;
         base.criteria.prcwrkshtmdiscpct = 0;
         base.criteria.prcwrkshtdiscfl = false;
      }
      $state.go('^', { record: self.workSheetRecord }, { reload: '^' });
   };

   self.recalculate = function () {
      self.criteria.varollfl = true;
      DataService.post('api/va/asvaentry/varollcstprccalculate', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.results = data;
         }
      });
   };

   self.cancel = function () {
      $state.go('^');
   };

});

app.controller('OeipPriceRecordsCtrl', function ($scope, $state, $stateParams, DataService, Sasc, ConfigService, GridService) {
   var self = this;
   var base = $scope.base;
   self.grid = {};
   self.dataset = [];
   self.priceRecordCriteria = {};
   self.sasc = Sasc;
   self.isCustomerProductLineEnabled = false;
   self.isCustomerProductCategoryEnabled = false;
   self.isCustomerProductRebateEnabled = false;

   self.loadDefaults = function () {
      self.isCustomerProductLineEnabled = self.sasc.pdlevelfl2 && self.sasc.pdlevelpl;
      self.isCustomerProductCategoryEnabled = self.sasc.pdlevelfl2 && self.sasc.pdlevelpc;
      self.isCustomerProductRebateEnabled = self.sasc.pdlevelfl2 && self.sasc.pdlevelrt;

      self.priceRecordCriteria = {
         includepromos: self.sasc.pdpromofl,
         includecustpricetypeprod: self.sasc.pdlevelfl3,
         includecustomerprodpricetype: self.sasc.pdlevelfl2,
         includecustpricetype: self.sasc.pdlevelfl6,
         includecustpricetypeprodtype: self.sasc.pdlevelfl4,
         includeprod: self.sasc.pdlevelfl7,
         includeprodpricetype: self.sasc.pdlevelfl8,
         includecustomerprod: self.sasc.pdlevelfl1,
         includecustomer: self.sasc.pdlevelfl5,
         includecustpricetypeprodrebtype: self.sasc.pdlevelfl4,
         includecustomerprodrebate: self.isCustomerProductRebateEnabled,
         includecustomerprodcat: self.isCustomerProductCategoryEnabled,
         includecustomerprodline: self.isCustomerProductLineEnabled,
         includeexpireinactive: false,
         includeinactive: false,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      if (self.priceRecordCriteria.modifiernm) {
         self.getCustomerPricingModifier();
      }
      else {
         self.searchPriceRecords();
      }
   };

   self.searchPriceRecords = function () {
      self.priceRecordCriteria.custno = base.oeipDisplayCriteria.custno;
      self.priceRecordCriteria.shipto = base.oeipDisplayCriteria.shipto;
      self.priceRecordCriteria.prod = base.oeipDisplayCriteria.prod;
      self.priceRecordCriteria.whse = base.oeipDisplayCriteria.whse;

      DataService.post('api/pd/aspdinquiry/pdgetpdscrecords', { data: self.priceRecordCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.pdgetpdscrecordsresults;
         }
      });
   };

   self.getCustomerPricingModifier = function () {
      var pdscmParams = {
         modifiernm: self.priceRecordCriteria.modifiernm,
         whse: ''
      };

      DataService.get('api/pd/pdscm/getbypk', { params: pdscmParams, busy: true }, function (data) {
         if (data) {
            self.searchPriceRecords();
         }
      });
   };

   self.loadDefaults();

   self.drilldown = function (e, args) {
      self.selectedRecord = args[0].item;
      $state.go('pdsp.customerMaster', { pk: self.selectedRecord.pdrecno });
   };

   self.onRowSelection = function () {
      self.selectedRecord = GridService.getSelectedRecord(self.grid);
   };

   self.vendorHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.vendno) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.custHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   self.shipToHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno && currentRow.custtype) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.custtype });
      }
   };

   self.prodHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.prod) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: base.criteria.whse });
      }
   };

});

app.controller('OeipRebatesCtrl', function ($scope, $state, $stateParams, DataService, Sasc, ConfigService, GridService) {
   var self = this;
   var base = $scope.base;
   self.grid = {};
   self.dataset = [];
   self.pdsrRecordsCriteria = {};
   self.sasc = Sasc;

   self.loadDefaults = function () {
      self.pdsrRecordsCriteria = {
         includeproductrebate: self.sasc.pdreblevlfl1,
         includerebatetyperebate: self.sasc.pdreblevlfl2,
         includepricetyperebate: self.sasc.pdreblevlfl3,
         includeprodlinerebate: self.sasc.pdreblevlfl4,
         includeprodcatrebate: self.sasc.pdreblevlfl5,
         includeexpired: false,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      self.searchRebateRecords();

   };

   self.searchRebateRecords = function () {
      self.pdsrRecordsCriteria.custno = base.oeipDisplayCriteria.custno;
      self.pdsrRecordsCriteria.shipto = base.oeipDisplayCriteria.shipto;
      self.pdsrRecordsCriteria.prod = base.oeipDisplayCriteria.prod;
      self.pdsrRecordsCriteria.whse = base.oeipDisplayCriteria.whse;

      DataService.post('api/pd/aspdinquiry/pdgetpdsrrecords', { data: self.pdsrRecordsCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.pdgetpdsrrecordsresults;
         }
      });
   };

   self.loadDefaults();

   self.drilldown = function (e, args) {
      self.selectedRecord = args[0].item;
      $state.go('pdsp.rebateMaster', { pk: self.selectedRecord.rebrecno, levelCode: 'r' });
   };

   self.onRowSelection = function () {
      self.selectedRecord = GridService.getSelectedRecord(self.grid);
   };

   self.vendorHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.vendno) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.custHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   self.shipToHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno && currentRow.custtype) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.custtype });
      }
   };

   self.prodHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.prod) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: base.criteria.whse });
      }
   };

});

app.controller('OeipGeneralCreateQuoteCtrl', function ($scope, $state, $stateParams, DataService, Sasc, ConfigService, GridService, MessageService, MruService, Utils) {
   var self = this;
   self.createQuoteCollection = $stateParams.quoteList;

   self.buildMruOrders = function (data) {
      data.oeipcreatequotesorder.forEach(function (order) {
         var params = {
            orderno: order.orderno,
            ordersuf: order.ordersuf,
            fldlist: 'rowpointer,orderno,ordersuf'
         };

         //Do not want busy indicator.  This call happens as the message has popped, and we don't need to
         //slow down the user with the indicator.
         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: false }, function (oeehData) {
            if (oeehData) {
               var label = oeehData.orderno + '-' + Utils.pad(oeehData.ordersuf, 2);
               MruService.addToList('OEOrder', oeehData.rowpointer, label, oeehData.orderno, oeehData.ordersuf);
            }
         });
      });
   };

   // Save
   self.submit = function () {

      if (self.createQuoteCollection.length > 0) {

         self.createQuoteCollection.forEach(function (record) {
            var indx = self.createQuoteCollection.indexOf(record);
            self.createQuoteCollection[indx].seqno = indx;
         });

         DataService.post('api/oe/asoeinquiry/oeipcreatequotes', { data: self.createQuoteCollection, busy: true }, function (data) {
            if (data) {
               if (data.messaging) {
                  MessageService.processMessaging(data.messaging);
               }
               if (data.oeipcreatequotesorder) {
                  var message = '';

                  Utils.clearArray($stateParams.quoteList);
                  data.oeipcreatequotesorder.forEach(function (order) {
                     message += '<br>' + MessageService.get('global.order.number') + order.orderno + ' ' + MessageService.get('global.has.been.created');
                  });

                  if (message) {
                     MessageService.confirmation('global.information', message);
                  }
               }

               //Need to do this as a separate loop since the call to build the MRU will be doing asynchronous calls.
               //It's not dependent on building out the informative message presented to the user.  We need for
               //that to happen on it's own.
               self.buildMruOrders(data);

               $state.go('^');
            }
         });
      }
   };

   self.deleteQuotes = function () {
      var records = GridService.getSelectedRecords(self.createQuoteCollectionGrid);
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         records.forEach(function (record) {
            var indx = self.createQuoteCollection.indexOf(record);
            self.createQuoteCollection.splice(indx, 1);
         });
         MessageService.info('global.information', 'message.delete.operation.completed.successfully');
      });
   };

   self.cancel = function () {
      $state.go('^');
   };

});

app.controller('OeipGeneralAltProductsCtrl', function ($scope, $state, $stateParams, DataService, ConfigService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.criteria = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      custno: $stateParams.custno,
      initialload: false,
      optprod: false
   };

   var pos = $stateParams.prodalt.indexOf("Optional");
   if (pos >= 0) {
      self.criteria.optprod = true;
   }

   self.loadAltProd = function () {
      DataService.post('api/oe/asoeinquiry/oeipaltprodload', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }
            self.altProductCollection = data.oeipaltprodloadresults;
            self.prod = data.oeipaltprodloadsingle.prod;
            self.proddesc = data.oeipaltprodloadsingle.proddesc;
         }
      });
   };

   // Rebuild General screen on the selected optional/alternate product
   self.submit = function () {
      self.selectedRecord = GridService.getSelectedRecord(self.altProductCollectionGrid);
      if (self.selectedRecord) {
         $state.go('oeip.detail', {
            pk: base.criteria.custno,
            pk2: base.criteria.whse,
            pk3: self.selectedRecord.altprod,
            pk4: base.criteria.shipto
         });
      }
      else {
         self.cancel();
      }
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.loadAltProd();

});

app.controller('OeipGeneralCreateCatalogInInventoryCtrl', function ($scope, $state, $stateParams, $translate) {
   //alias => cci
   var self = this;

   self.productType = $stateParams.productType;
   self.statusType = $stateParams.statusType;
   self.hsCode = $stateParams.hsCode;
   self.countryCode = $stateParams.countryCode;

   self.statusTypes = [];
   if ($stateParams.oannonstock) {
      self.statusTypes.push({ label: $translate.instant('global.order.as.needed.non.stock'), value: 'n' });
      self.statusType = 'n';
   }
   if ($stateParams.orderasneeded) {
      self.statusTypes.push({ label: $translate.instant('global.order.as.needed'), value: 'o' });
      self.statusType = 'o';
   }

   self.submit = function () {
      $stateParams.callbackFunction(self.productType, self.statusType, self.hsCode, self.countryCode);
   };
});
