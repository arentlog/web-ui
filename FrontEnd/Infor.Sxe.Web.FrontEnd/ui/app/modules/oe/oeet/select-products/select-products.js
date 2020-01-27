'use strict';

app.controller('OeetSelectProductsCtrl', function ($scope, $state, DataService, UserService, MessageService, Utils, Constants, ImageService) {
   // alias => sp
   var self = this;
   var base = $scope.base;

   base.sidebarCollapsed = false;
   self.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;

   self.searchResults = [];

   if (base.arsc && base.arsc.custprodreqfl) {
      base.isRequireCustomerProd = true;
   }

   self.isCustomerOrderSettings = function () {
      return $state.is(base.baseState + '.selectProducts.customerOrderSettings');
   };

   self.isMultiLineReturn = function () {
      return $state.is(base.baseState + '.selectProducts.returnMultipleLines');
   };

   self.isQuickLineEntry = function () {
      return $state.is(base.baseState + '.selectProducts.quickLineEntry');
   };

   self.isEdiErrors = function () {
      return $state.is(base.baseState + '.selectProducts.customerOrderSettings.ediErrors');
   };

   self.productSearch = function () {
      var criteria = {
         LookupParameter: 'icsw',
         MaxResults: Constants.EASY_ENTRY_RECORD_LIMIT,
         IsEasyLineSearch: true,
         QueryText: self.productToSearch,
         ProductType: ['icsw', 'icsp', 'icsc', 'icsec'],
         FacetQuery: {
            whse: [base.oehdr.whse],
            custno: [base.oehdr.custno],
            shipto: [base.oehdr.shipto]
         }
      };

      // User Hook (do not rename)
      if (self.customProductSearchCriteria) {
         self.customProductSearchCriteria();
      }

      DataService.post(Constants.SEARCH_PATH, { data: criteria, busy: true, errorFunction: 'selectproducts-oe' }, function (data) {
         if (data) {
            data = Utils.processData(criteria, data, 'oe');
            Utils.replaceArray(self.searchResults, data.hits);
            ImageService.getImages(self.searchResults, 'icsw');
         }
      });
   };

   self.clearSearch = function () {
      Utils.clearArray(self.searchResults);
      self.productToSearch = '';
      self.view.applyAutoFocus();
   };

   self.getPricingData = function (args) {
      if (self.searchResults.length > 0) {
         var activePage = args.activePage;
         var pageSize = args.pageSize;
         var beginAt = (activePage - 1) * pageSize;

         var productsToPrice = [];
         for (var i = beginAt; i < self.searchResults.length && i < beginAt + pageSize; i++) {
            var currentProduct = self.searchResults[i];

            productsToPrice.push({
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               custno: base.oehdr.custno,
               prod: currentProduct.value,
               qtyord: currentProduct.QuantityOrdered || base.easyDefaultQuantity,
               unit: currentProduct.Unit,
               shipto: base.oehdr.shipto,
               whse: base.oehdr.whse,
               lineId: i,
               checknonstandprods: base.checkNonStandProdsInEasyQuick
            });
         }

         if (productsToPrice.length > 0) {
            DataService.post('api/oe/asoeline/oelinepricing', { data: productsToPrice, busy: false }, function (data) {
               if (data && data.oelinepricingresults) {
                  data.oelinepricingresults.forEach(function (result) {
                     var lineToUpdate = self.searchResults[result.lineid];

                     //lineToUpdate.netamt = result.netamt;
                     lineToUpdate.Price = result.price;
                     lineToUpdate.NetAvailable = result.dsplnetavail;
                     lineToUpdate.Unit = result.unit;
                     if (result.qtyord !== parseFloat(base.easyDefaultQuantity)) {
                        lineToUpdate.QuantityOrdered = result.qtyord;
                     }

                     var nonStandProdCheckData = self.checkNonStandardReturnData(result, false);
                     lineToUpdate.Tooltip = nonStandProdCheckData.messageText;
                     lineToUpdate.Warning = nonStandProdCheckData.warning;
                     lineToUpdate.Error = nonStandProdCheckData.hardStop;
                  });
               }
               if (data.messaging) {
                  data.messaging.forEach(function (message) {
                     var lineId = message.messagetxt.match(/\d+/);
                     var messageText = message.messagetxt.split(lineId)[1].trim();

                     var lineToUpdate = self.searchResults[lineId];

                     if (message.messagetype === 'e') {
                        lineToUpdate.Error = true;
                     } else if (message.messagetype === 'w' || message.messagetype === 'i') {
                        lineToUpdate.Warning = true;
                     }

                     lineToUpdate.Tooltip = messageText;
                  });
               }
            }, null);
         }
      }
   };

   self.repriceLine = function (product) {
      var pricingCriteria = [{
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         custno: base.oehdr.custno,
         prod: product.value,
         qtyord: product.QuantityOrdered || base.easyDefaultQuantity,
         unit: product.calc_uom || 'each',
         shipto: base.oehdr.shipto,
         whse: base.oehdr.whse,
         checknonstandprods: base.checkNonStandProdsInEasyQuick
      }];
      DataService.post('api/oe/asoeline/oelinepricing', { data: pricingCriteria, busy: false }, function (data) {
         if (data && data.oelinepricingresults) {
            //product.netamt = pricingResults.netamt;
            var pricingResults = data.oelinepricingresults[0];

            product.Price = pricingResults.price;
            product.NetAvailable = pricingResults.dsplnetavail;
            product.Unit = pricingResults.unit;
            if (pricingResults.qtyord !== parseFloat(base.easyDefaultQuantity)) {
               product.QuantityOrdered = pricingResults.qtyord;
            }

            var nonStandProdCheckData = self.checkNonStandardReturnData(pricingResults, false);
            product.Tooltip = nonStandProdCheckData.messageText;
            product.Warning = nonStandProdCheckData.warning;
            product.Error = nonStandProdCheckData.hardStop;
         }
      }, null);
   };

   self.checkNonStandardReturnData = function (pricingResults) {
      var checkResults = {
         messageText: '',
         hardStop: false,
         warning: false
      };
      if (pricingResults.nonstandprodcheckfl) {
         var newMessageText = '';
         if (pricingResults.kitfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.configurable.kit'));
         }
         if (pricingResults.tallyfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.tally'));
         }
         if (pricingResults.serialfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.serial'));
         }
         if (pricingResults.lotfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.lot'));
         }
         if (pricingResults.remancorefl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.reman.core'));
         }
         if (pricingResults.impliedcorefl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.implied.core'));
         }
         if (pricingResults.dirtycorefl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.dirty.core'));
         }
         if (pricingResults.eccnfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.eccn'));
         }
         if (pricingResults.dnrfl) {
            checkResults.warning = true;
            checkResults.hardStop = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.dnr'));
         }
         if (pricingResults.assemblyfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.assembly'));
         }
         if (pricingResults.supersededfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.supersede'));
         }
         if (pricingResults.inactivefl) {
            checkResults.warning = true;
            checkResults.hardStop = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.inactive'));
         }
         if (pricingResults.substitutefl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.substitute'));
         }
         if (pricingResults.promopricefl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.a.promo.price'));
         }
         if (pricingResults.prodrestrictfl) {
            checkResults.warning = true;
            checkResults.hardStop = true;
            newMessageText = self.addToMessageText(newMessageText, pricingResults.prodrestrictmessage);
         }
         if (pricingResults.specpricecostfl) {
            checkResults.warning = true;
            newMessageText = self.addToMessageText(newMessageText, MessageService.get('message.this.product.is.special.price.cost'));
         }

         checkResults.messageText = newMessageText;
      }

      return checkResults;
   };

   self.addToMessageText = function (current, toAdd) {
      if (current) {
         current += '<br />' + toAdd;
      } else {
         current += toAdd;
      }
      return current;
   };

   self.addAllWithQuantity = function () {
      var linesToAdd = [];
      var i = 0;
      self.searchResults.forEach(function (line) {
         if (line.QuantityOrdered) {
            var lineToAdd = {
               seqno: i,
               prod: line.value,
               qtyord: line.QuantityOrdered,
               unit: line.Unit,
               price: line.Price,
               priceoverfl: false
            };

            //User Hook (do not rename)
            if (self.addAllWithQuantityContinue) {
               self.addAllWithQuantityContinue(line, lineToAdd);
            }

            linesToAdd.push(lineToAdd);
            i++;
         }
      });
      var mutliLineCreateRequest = {
         oemultilinecreateprodlist: linesToAdd,
         oemultilinecreatecriteria: {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            maintmode: base.isAddOrderMode
         }
      };
      DataService.post('api/oe/asoeline/oemultilinecreate', { data: mutliLineCreateRequest, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }
            //clear out qty entered (if any)
            self.searchResults.forEach(function (line) {
               if (line.QuantityOrdered) {
                  line.QuantityOrdered = null;
               }
            });

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

            base.updateLineItems(null, null, 'addMultiple', lastLineItemLineNo);
         }
      });
   };

   self.addProduct = function (product) {
      var quickAddRequest = {
         oelinepricingcriteria: {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            custno: base.oehdr.custno,
            prod: product.value,
            qtyord: product.QuantityOrdered || 1,
            unit: product.calc_uom,
            shipto: base.oehdr.shipto,
            whse: base.oehdr.whse
         },
         oemultilinecreatecriteria: {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            maintmode: base.isAddOrderMode
         }
      };
      DataService.post('api/oe/asoelineextra/oelinequickadd', { data: quickAddRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.cWarningMessage) {
                  MessageService.alert('global.alert', data.cWarningMessage);
               }
               //clear out qty entered (if any)
               product.QuantityOrdered = null;

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

               base.updateLineItems(null, null, 'addSingle', lastLineItemLineNo);
            }
         }
      });
   };

   self.navigateToProduct = function (product) {
      $state.go('icip.detail', { pk: product, pk2: base.oehdr.whse });
   };

   self.advanced = function () {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry', { product: self.productToSearch });
   };

   self.details = function (product) {
      $state.go(base.baseState + '.selectProducts.advancedLineEntry', { product: product.value, fromEasy: true });
   };

   self.continue = function () {
      $state.go(base.baseState + '.taxesAndTotals');
   };

   self.shoppingList = function () {
      $state.go('.shoppingList');
   };

   self.quickLineEntry = function () {
      $state.go('.quickLineEntry');
   };

   self.returnMultipleLines = function () {
      $state.go(base.baseState + '.selectProducts.returnMultipleLines');
   };

   self.addons = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts',
         drilldownState: 'addons'
      });
   };

   self.discounts = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts',
         drilldownState: 'discounts'
      });
   };
});

app.controller('OeetCustomerOrderSettingsCtrl', function ($scope, $state, DataService, MessageService, AuthService, Constants) {
   // alias => cos
   var self = this;
   var base = $scope.base;
   var customerOrderSettingsVisibleList = '';
   var maxDate = new Date(2049, 11, 31);
   var maxDateValue = Locale.formatDate(maxDate, { pattern: 'yyyy-MM-dd' }) + 'T00:00:00';
   var minDate = new Date(1950, 0, 1);
   var minDateValue = Locale.formatDate(minDate, { pattern: 'yyyy-MM-dd' }) + 'T00:00:00';
   self.resetOehdr = angular.copy(base.oehdr);
   self.geocd = 0;
   self.outofcityfl = false;

   self.freightAddressControl = {};
   self.originalTermsType = base.oehdr.termstype;

   self.isPromiseDateDisabled = function () {
      if (!base.oehdr && !base.oehdr.orderdisp) {
         return false;
      }
      else if (base.oehdr.orderdisp.toLowerCase() !== 'j') {
         return false;
      } else {
         return base.lineItems.length !== 0;
      }
   };

   self.setDateWithinRange = function (date) {
      // allow dates within range 1950-01-01 to 2049-12-31
      if (date) {
         var yearDelimiterIndex = date.indexOf('-');
         if (yearDelimiterIndex > 4) {
            // a year with too many digits has been entered. truncate it to four digits.
            date = date.substring(yearDelimiterIndex - 4);
         }

         if (date > maxDateValue) {
            date = maxDateValue;
         }
         if (date < minDateValue) {
            date = minDateValue;
         }
      }
      return date;
   };

   self.requestedShipDateChange = function () {
      base.oehdr.reqshipdt = self.setDateWithinRange(base.oehdr.reqshipdt);
      if ((base.lineItems && base.lineItems.length <= 0) || !base.lineItems) {
         if (base.oehdr.reqshipdt > base.oehdr.promisedt) {
            base.oehdr.promisedt = base.oehdr.reqshipdt;
         }
      }
   };

   self.promiseDateChanged = function () {
      if (base.oehdr.promisedt) {
         base.oehdr.promisedt = self.setDateWithinRange(base.oehdr.promisedt);
         if (base.oehdr.reqshipdt > base.oehdr.promisedt) {
            base.oehdr.promisedt = base.oehdr.reqshipdt;
         }
      }
   };

   self.orderDispositionChanged = function () {
      self.isOrderDispositionChanged = true;
   };

   self.shipViaLostFocus = function () {
      self.oeheaderLeaveField('shipviaty');
   };

   self.termsTypeChanged = function () {
      if (self.originalTermsType !== base.oehdr.termstype) {
         self.isTermsTypeChanged = true;
      }
   };

   self.freightTermsLostFocus = function () {
      self.oeheaderLeaveField('frttermscd');
   };

   self.viewEdiErrorsClicked = function () {
      $state.go(base.baseState + '.selectProducts.customerOrderSettings.ediErrors');
   };

   self.isOriginalPromiseDateDisabled = function () {
      if (!base.oehdr) {
         return true;
      } else {
         return !base.oehdr.origpromisedtenabled && !self.isPromiseDateDisabled();
      }
   };

   self.originalPromiseDateChanged = function () {
      if (base.oehdr.origpromisedt) {
         base.oehdr.origpromisedt = self.setDateWithinRange(base.oehdr.origpromisedt);
         if (base.oehdr.reqshipdt <= base.oehdr.origpromisedt) {
            base.oehdr.promisedt = base.oehdr.origpromisedt;
         } else {
            base.oehdr.origpromisedt = base.oehdr.reqshipdt;
         }
      }
   };

   self.oeheaderLeaveField = function (fieldname) {
      var oeheaderLeaveFieldRequest = {
         oehdr: base.oehdr,
         pvFieldname: fieldname
      };
      DataService.post('api/oe/asoeheader/oeheaderleavefield', { data: oeheaderLeaveFieldRequest, busy: true }, function (data) {
         if (data) {

            base.oehdr = data.oehdr;

            //User Hook (do not rename)
            if (self.oeheaderLeaveFieldBeforeMessaging) {
               self.oeheaderLeaveFieldBeforeMessaging(fieldname);
            }

            if (data.messaging) {
               if (!MessageService.processMessaging(data.messaging) && data.oehdr) {
                  self.isFreightAddressReadonly = !!data.oehdr.frtbillcd;
               }
            } else if (data.oehdr) {
               self.isFreightAddressReadonly = !!data.oehdr.frtbillcd;
            }

            //User Hook (do not rename)
            if (self.oeheaderLeaveFieldContinue) {
               self.oeheaderLeaveFieldContinue(fieldname);
            }
         }
      });
   };

   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: 'oeeh',
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         custno: base.oehdr.custno,
         streetaddr: base.oehdr.frtbilladdr1,
         city: base.oehdr.frtbillcity,
         state: base.oehdr.frtbillst,
         zipcd: base.oehdr.frtbillzip,
         country: base.oehdr.frtbillcountrycd,
         geocd: self.geocd,
         outofcityfl: self.outofcityfl
      };
   };

   self.setVisibleFields = function () {
      var visibleFields = self.view.getControlIds();
      self.isShipViaInUse = visibleFields.indexOf(14) > -1;
      self.isTermsInUse = visibleFields.indexOf(27) > -1;
      self.isCustoemrPoInUse = visibleFields.indexOf(63) > -1;
      self.isFreightTermsInUse = visibleFields.indexOf(31) > -1;
      if (self.isShipViaInUse) {
         customerOrderSettingsVisibleList += 'ShipVia' + base.DELIMITER_COMMA;
      }
      if (self.isTermsInUse) {
         customerOrderSettingsVisibleList += 'Terms' + base.DELIMITER_COMMA;
      }
      if (self.isCustoemrPoInUse) {
         customerOrderSettingsVisibleList += 'CustPO' + base.DELIMITER_COMMA;
      }
      if (self.isFreightTermsInUse) {
         customerOrderSettingsVisibleList += 'FrtTermsCd' + base.DELIMITER_COMMA;
      }
   };

   self.promiseDateChanged();

   self.save = function () {
      base.oehdr.visiblelist = customerOrderSettingsVisibleList;

      var criteria = {
         pvCustno: base.oehdr.custno,
         pvTermstype: base.oehdr.termstype
      };

      DataService.post('api/oe/asoeinquiry/oeirauthpointinfo', { data: criteria, busy: true }, function (authData) {
         if (authData) {
            if (self.isTermsTypeChanged && authData.pvCustselltype.toLowerCase() === 'd' && !authData.pvTermscodfl) {
               AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'header', 'termstype', '', '', null, function () {
                  //passed callback
                  self.originalTermsType = base.oehdr.termstype;
                  self.continueSave();
               }, function () {
                  //failed callback
                  base.oehdr.termstype = self.originalTermsType;
               });
            } else {
               self.continueSave();
            }
         }
      });
   };

   self.continueSave = function () {
      //User Hook (do not rename)
      if (self.setHeaderUpdateCriteria) {
         self.setHeaderUpdateCriteria();
      }

      var updateRequest = {
         oehdr: base.oehdr,
         lMaintMode: base.isAddOrderMode
      };

      DataService.post('api/oe/asoeheader/oeheaderupdate', { data: updateRequest, busy: true }, function (updateData) {
         if (updateData) {
            if (!MessageService.processMessaging(updateData)) {
               base.checkFlushDates();

               if (self.isOrderDispositionChanged) {
                  base.getOrderTotals();
               }

               //User Hook (do not rename)
               if (self.oeHeaderUpdateContinue) {
                  self.oeHeaderUpdateContinue(updateData);
               }
            }

            //User Hook (do not rename)
            if (self.continueSaveContinue) {
               self.continueSaveContinue();
            }
         }
      });
   };

   self.reset = function () {
      base.oehdr = angular.copy(self.resetOehdr);
      self.isOrderDispositionChanged = false;
      self.isTermsTypeChanged = false;
   };

   self.refresh = function () {
      base.getOehdr();
   };

   self.back = function () {
      self.refresh();

      $state.go(base.defaultLineEntryState);

      $scope.sp.view.applyAutoFocus();
   };
});

app.controller('OeetCustomerOrderSettingsEdiErrorsCtrl', function ($scope, $state, Utils, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;

   self.ediGrid = {};
   self.ediResults = {};
   self.ediErrorResults = [];
   self.ediCriteria = {
      orderno: base.oehdr.orderno,
      ordersuf: base.oehdr.ordersuf,
      showallfl: base.oehdr.approvty !== 'e'
   };
   self.errExcLabel = 'Errors - Exceptions';

   self.setupEdiResults = function () {
      var ediErrExcInitRequest = {
         oeheaderedicriteria: self.ediCriteria,
         oeheaderediresults: {}
      };
      DataService.post('api/oe/asoeheader/oeheaderviewedierrexcinit', { data: ediErrExcInitRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.updateEdiResults(data.oeheaderediresults, data.oeheaderedierrorresults);
            }
         }
      });
   };
   self.setupEdiResults();

   self.fullOrderNumber = function () {
      var orderSuffix = base.oehdr.ordersuf ? base.oehdr.ordersuf : '00';
      return base.oehdr.orderno + '-' + orderSuffix;
   };

   self.fullCustomer = function () {
      return base.oehdr.custno + ' - ' + base.oehdr.name;
   };

   self.headerErrExc = function () {
      return self.ediResults.hdrerr + ' - ' + self.ediResults.hdrexc;
   };

   self.lineErrExc = function () {
      return self.ediResults.lnerr + ' - ' + self.ediResults.lnexc;
   };

   self.totalErrExc = function () {
      return self.ediResults.errcnt + ' - ' + self.ediResults.exccnt;
   };

   self.showAllCheckedUnchecked = function () {
      self.setupEdiResults();
   };

   self.correction = function () {
      var selectedRecords = GridService.getSelectedRecords(self.ediGrid);

      for (var i = 0; i < selectedRecords.length; i++) {
         selectedRecords[i].selectedfl = true;
      }

      self.approve();
   };

   self.approve = function () {
      var ediErrExcActionRequest = {
         oeheaderedierrorresults: self.ediErrorResults,
         oeheaderedicriteria: self.ediCriteria,
         oeheaderediresults: self.ediResults,
         pvFieldname: 'Correction'
      };
      DataService.post('api/oe/asoeheader/oeheaderviewedierrexcaction', { data: ediErrExcActionRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.updateEdiResults(data.oeheaderediresults, data.oeheaderedierrorresults);
            }
         }
      });
   };

   self.updateEdiResults = function (newEdiResults, newEdiErrorResults) {
      Utils.replaceObject(self.ediResults, newEdiResults);
      Utils.replaceArray(self.ediErrorResults, newEdiErrorResults);
      self.ediGrid.renderRows(); //neccessary?
   };

   self.finish = function () {
      var ediErrExcFinishRequest = {
         oeheaderedicriteria: self.ediCriteria,
         oeheaderediresults: self.ediResults
      };
      DataService.post('api/oe/asoeheader/oeheaderviewedierrexcfinish', { data: ediErrExcFinishRequest, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.ediResults, self.ediResults);

            base.oehdr.approvty = self.ediResults.approvty;
            if (self.ediResults.lrefreshcnt === 'yes') {
               base.oehdr.edihderr = self.ediResults.errcnt;
               base.oehdr.edihdexc = self.ediResults.exccnt;
            }

            $state.go('^');
         }
      });
   };

   self.back = function () {
      $state.go(base.defaultLineEntryState);
   };
});

app.controller('OeetQuickLineEntryCtrl', function ($scope, $state, $translate, DataService, MessageService, GridService, ImageService) {
   // alias => qle
   var self = this;
   var base = $scope.base;
   var sp = $scope.sp;

   self.linesToAddCollection = [];
   self.totalQuantity = 0;
   self.totalAmount = 0;
   self.lineToAdd = { qtyord: 1, prod: '', price: 0, unit: '', discamt: 0, disctype: true };
   self.errorText = '';
   self.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;

   //needed to allow the <br /> html in the message text column
   self.messageFormatter = function (row, cell, value, column, item) {
      return item.messages || '';
   };

   // See if this can be combined with other lines based on prod, price and unit
   self.checkExistingLines = function (args) {
      var beforeLineInGridCheck = false;
      var ignoreIndex = -1;
      var lineToAdd = {};
      var skipUnitError = false;
      var skipPriceError = false;

      beforeLineInGridCheck = args.beforeLineInGridCheck;
      ignoreIndex = args.ignoreIndex ? args.ignoreIndex : -1;
      lineToAdd = args.lineToAdd ? args.lineToAdd : self.lineToAdd;
      skipUnitError = args.skipUnitError ? args.skipUnitError : false;
      skipPriceError = args.skipPriceError ? args.skipPriceError : false;

      var returnStatus = 'Create New Line';

      // Go through each line in the grid
      self.linesToAddCollection.forEach(function (line, index) {
         // Go through lines in the grid that have been finished in validate (unit is set) and where the product matches
         if (line.prod.toLowerCase() === lineToAdd.prod.toLowerCase() && line.unit) {
            // Ignore a newly added line for a match
            if (beforeLineInGridCheck === false && ignoreIndex === index) {
               return;
            }
            if ((line.unit.toLowerCase() === lineToAdd.unit.toLowerCase() || !lineToAdd.unit) &&
               (line.price === lineToAdd.price || !lineToAdd.price)) {
               // if the product is the same, and the unit is the same or not entered, and the price is the same or not entered, auto-increase the qty of the already added line
               line.qtyord = line.qtyord + lineToAdd.qtyord;
               self.grid.updateRow(index);

               MessageService.info('global.information', $translate.instant('global.duplicate.product.entry.for') + ' ' + lineToAdd.prod + '. ' + $translate.instant('global.quantity.increased') + '.');
               if (beforeLineInGridCheck) {
                  self.LineToAdd = { qtyord: 1, prod: '', price: 0, unit: '', discamt: 0, disctype: true };
               }
               self.view.applyAutoFocus();
               returnStatus = 'Combined';
               return; // return from the forEach not the function
            } else if (lineToAdd.unit && lineToAdd.price) {
               // if the product is the same, but the unit or price is different from the already added line, add the line but in error mode so that the user can fix it
               var errorText = $translate.instant('global.duplicate.product.entry.for') + ' ' + lineToAdd.prod + '. ';
               if (!skipUnitError && lineToAdd.unit.toLowerCase() !== line.unit.toLowerCase()) {
                  self.errorText += $translate.instant('global.unit') + ', ' + lineToAdd.unit + ', ' + $translate.instant('message.is.different.than.existing.line') + ', ' + line.unit + '. ';
               }
               // You can onlye really check the price duplication if you also have a unit at this time
               if (!skipPriceError && lineToAdd.price !== line.price) {
                  self.errorText += $translate.instant('global.price') + ', ' + lineToAdd.price + ', ' + $translate.instant('message.is.different.than.existing.line') + ', ' + line.price + '. ';
               }
               return; // return from the forEach not the function
            }
         }
      });
      return returnStatus;
   };

   // Add the line to add lines grid
   self.addToGrid = function () {
      var checkExistingLinesResponse = '';
      var wasCombinedWithOtherLine = false;

      self.errorText = '';

      // Product is the minimum requirement to add a line
      if (!self.lineToAdd.prod) {
         MessageService.error('global.error', 'message.you.must.enter.a.product');
         return;
      }

      // Do a pre-check to see if the line can be combined with other lines based on prod/price/unit
      checkExistingLinesResponse = self.checkExistingLines({ beforeLineInGridCheck: true });
      wasCombinedWithOtherLine = (checkExistingLinesResponse !== 'Combined') ? false : true;

      // Add the line
      if (!wasCombinedWithOtherLine) {
         var length = self.linesToAddCollection.push(self.lineToAdd);
         self.validateProduct(length - 1);
      }

      // We have what the user entered, this will let them enter more lines
      self.lineToAdd = { qtyord: 1, prod: '', price: 0, unit: '', discamt: 0, disctype: true };
      self.view.applyAutoFocus();
   };

   // Validate the product, getting default unit, price and other information
   self.validateProduct = function (index) {
      var checkExistingLinesResponse = '';
      var recordToValidate = self.linesToAddCollection[index];
      var wasCombinedWithOtherLine = false;
      var crossRefLineToAdd = {};
      var errorText = '';

      var pricingCriteria = [{
         orderno: base.oehdr.orderno,
         ordersuf: base.oehdr.ordersuf,
         custno: base.oehdr.custno,
         prod: recordToValidate.prod,
         qtyord: recordToValidate.qtyord,
         unit: recordToValidate.unit,
         price: recordToValidate.price,
         shipto: base.oehdr.shipto,
         whse: base.oehdr.whse,
         checknonstandprods: base.checkNonStandProdsInEasyQuick
      }];
      DataService.post('api/oe/asoeline/oelinepricing', { data: pricingCriteria, busy: false }, function (data) {
         //success callback
         if (data) {
            var isErrors = false;
            var isWarning = false;
            var errorText = angular.copy(self.errorText);
            self.errorText = '';
            if (data.messaging && data.messaging.length > 0) {
               for (var i = 0; i < data.messaging.length; i++) {
                  var currentMessage = data.messaging[i];
                  errorText = sp.addToMessageText(errorText, currentMessage.messagetxt);

                  if (currentMessage.messagetype === 'e') {
                     isErrors = true;
                  } else if (currentMessage.messagetype === 'w') {
                     isWarning = true;
                  }
               }
            }
            // OELinePricing may send a differnet prod or unit back (ex: cross reference product, user did not enter a unit, we need to see if lines need combining)
            if (data.oelinepricingresults && data.oelinepricingresults.length > 0 &&
               (data.oelinepricingresults[0].prod.toLowerCase() !== recordToValidate.prod.toLowerCase() ||
                  data.oelinepricingresults[0].unit.toLowerCase() !== recordToValidate.unit.toLowerCase())
            ) {
               crossRefLineToAdd = {
                  qtyord: data.oelinepricingresults[0].qtyord,
                  prod: data.oelinepricingresults[0].prod,
                  price: recordToValidate.price ? recordToValidate.price : data.oelinepricingresults[0].price,
                  unit: data.oelinepricingresults[0].unit
               };
               // See if we can combine this line with an existing line
               checkExistingLinesResponse = self.checkExistingLines({
                  lineToAdd: crossRefLineToAdd,
                  beforeLineInGridCheck: false,
                  newLine: data.oelinepricingresults[0],
                  ignoreIndex: index,
                  skipUnitError: (recordToValidate.unit && recordToValidate.price) ? true : false,  // Skip if checked in pre-check
                  skipPriceError: ((recordToValidate.unit && recordToValidate.price) || (!recordToValidate.price && !data.oelinepricingresults[0].price)) ? true : false,  // Skip if checked in pre-check and new price not zero
               });
               if (self.errorText.length) {
                  errorText = sp.addToMessageText(errorText, self.errorText);
                  self.errorText = '';
               }
               // Remove the line if we combined the quantity with another line
               if (checkExistingLinesResponse === 'Combined') {
                  // Added to an existing line, delete new line
                  wasCombinedWithOtherLine = true;
                  self.linesToAddCollection.splice(index, 1);
               }

            }

            // Update the line details if we didn't combine with another line
            if (!wasCombinedWithOtherLine) {
               if (data.oelinepricingresults && data.oelinepricingresults.length > 0) {
                  var pricingResults = data.oelinepricingresults[0];
                  var newLine = {};
                  if (recordToValidate.price && recordToValidate.price !== pricingResults.price) {
                     newLine.price = recordToValidate.price;
                     newLine.priceoverfl = true;
                  } else {
                     newLine.price = pricingResults.price;
                     newLine.priceoverfl = false;
                  }
                  if (recordToValidate.discamt) {
                     newLine.discamt = recordToValidate.discamt;
                     newLine.discoverfl = true;
                     //must set price override otherwise discount is ignored
                     newLine.priceoverfl = true;
                  } else {
                     newLine.discamt = 0;
                     newLine.discoverfl = false;
                  }
                  newLine.disctype = recordToValidate.disctype;
                  newLine.seqno = index;
                  newLine.qtyord = pricingResults.qtyord;
                  newLine.netavail = pricingResults.netavail;
                  newLine.dsplnetavail = pricingResults.dsplnetavail;
                  newLine.netamt = pricingResults.netamt;
                  newLine.prod = pricingResults.prod;
                  newLine.proddesc = pricingResults.proddesc;
                  newLine.unit = pricingResults.unit;
                  newLine.marginamt = pricingResults.marginamt;
                  newLine.marginpct = pricingResults.marginpct;

                  /* If the error text was already set */
                  if (errorText.length > 0) {
                     isErrors = true;
                  }

                  var nonStandProdCheckData = sp.checkNonStandardReturnData(pricingResults, true);
                  if (nonStandProdCheckData.messageText) {
                     errorText = sp.addToMessageText(errorText, nonStandProdCheckData.messageText);
                  }
                  if (nonStandProdCheckData.hardStop) {
                     isErrors = true;
                  }
                  newLine.messages = errorText;
                  if (isErrors) {
                     newLine.isvalid = 'e';
                  } else if (nonStandProdCheckData.warning || isWarning) {
                     newLine.isvalid = 'a';
                  } else {
                     newLine.isvalid = '';
                  }

                  // User Hook (do not rename)
                  if (self.oeLinePricingContinue) {
                     self.oeLinePricingContinue(newLine, pricingResults);
                  }

                  self.linesToAddCollection[index] = newLine;
               } else {
                  //no data returned from oelinepricing (it failed)
                  var updatedLine = {};
                  updatedLine.seqno = index;
                  updatedLine.qtyord = recordToValidate.qtyord;
                  updatedLine.prod = recordToValidate.prod;
                  updatedLine.price = recordToValidate.price || 0;
                  updatedLine.unit = recordToValidate.unit || '';
                  updatedLine.marginamt = recordToValidate.marginamt || 0;
                  updatedLine.marginpct = recordToValidate.marginpct || 0;
                  updatedLine.discamt = recordToValidate.discamt || 0;
                  updatedLine.disctype = recordToValidate.disctype;
                  updatedLine.messages = errorText;
                  updatedLine.isvalid = 'e';

                  // User Hook (do not rename)
                  if (self.oeLinePricingClearContinue) {
                     self.oeLinePricingClearContinue(updatedLine);
                  }

                  self.linesToAddCollection[index] = updatedLine;
               }
            }
            self.updateTotals();
         }
      }, function (data) {
         //failed callback
         var updatedLine = {};
         updatedLine.seqno = index;
         updatedLine.qtyord = recordToValidate.qtyord;
         updatedLine.prod = recordToValidate.prod;
         updatedLine.price = recordToValidate.price || 0;
         updatedLine.unit = recordToValidate.unit || '';
         updatedLine.marginamt = recordToValidate.marginamt || 0;
         updatedLine.marginpct = recordToValidate.marginpct || 0;
         updatedLine.discamt = recordToValidate.discamt || 0;
         updatedLine.disctype = recordToValidate.disctype;
         updatedLine.messages = data.Message;
         updatedLine.isvalid = '';

         self.linesToAddCollection[index] = updatedLine;

         self.updateTotals();
      });
   };

   self.updateTotals = function () {
      var totalQty = 0;
      var totalAmt = 0;

      ImageService.getImages(self.linesToAddCollection, 'icsw', 'prod', '', '', false, function () {
         self.linesToAddCollection.forEach(function (line) {
            if (!line.isvalid) {
               totalQty += line.qtyord;
               totalAmt += (line.qtyord * line.price);
            }
         });
      });

      self.totalQuantity = totalQty;
      self.totalAmount = totalAmt;
   };

   self.addLines = function () {
      var linesToAdd = [];
      var invalidLines = [];
      var i = 0;
      self.linesToAddCollection.forEach(function (line) {
         if (line.isvalid === 'e') { //if the line has an error
            invalidLines.push(line);
         } else {
            //seqno, prod, qtyord, unit, price, priceoverfl
            line.seqno = i;

            // User Hook (do not rename)
            if (self.addLinesContinue) {
               self.addLinesContinue(line);
            }

            linesToAdd.push(line);
            i++;
         }
      });
      var mutliLineCreateRequest = {
         oemultilinecreateprodlist: linesToAdd,
         oemultilinecreatecriteria: {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            maintmode: base.isAddOrderMode
         }
      };
      DataService.post('api/oe/asoeline/oemultilinecreate', { data: mutliLineCreateRequest, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
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

            base.updateLineItems(null, null, 'addMultiple', lastLineItemLineNo);

            self.linesToAddCollection = invalidLines;
            self.updateTotals();
         }
      });
   };

   self.deleteLines = function () {
      var selectedRecords = GridService.getSelectedRecords(self.grid);

      selectedRecords.forEach(function (record) {
         var match = self.linesToAddCollection.indexOf(record);
         if (match !== -1) {
            self.linesToAddCollection.splice(match, 1);
         }
      });
   };

   self.gridColumnChange = function (e, args) {
      if (args.value !== args.oldValue) {
         //need to check for same product with different price/unit before we validate
         var currentLine = self.linesToAddCollection[args.row];
         var isDuplicate = false;
         //copy line collection and remove line that was passed in
         var otherLines = jQuery.extend([], self.linesToAddCollection);
         otherLines.splice(args.row, 1);
         otherLines.forEach(function (line, lineIndex) {
            if (line.prod.toLowerCase() === currentLine.prod.toLowerCase()) {
               if ((line.unit.toLowerCase() === currentLine.unit.toLowerCase() || !currentLine.unit) &&
                   (line.price === currentLine.price || !currentLine.price)) {
                  // if the product is the same, and the unit is the same or not entered, and the price is the same or not entered, auto-increase the qty of the already added line
                  var indexToReplace = self.linesToAddCollection.indexOf(line);
                  line.qtyord = line.qtyord + currentLine.qtyord;
                  self.linesToAddCollection[indexToReplace - 1] = line;

                  MessageService.info('global.information', $translate.instant('global.duplicate.product.entry.for') + ' ' + currentLine.prod + '. ' + $translate.instant('global.quantity.increased') + '.');
                  self.linesToAddCollection.splice(args.row, 1);
                  self.view.applyAutoFocus();
                  isDuplicate = true;
               } else {
                  // if the product is the same, but the unit or price is different from the already added line, add the line but in error mode so that the user can fix it
                  var newLine = {};
                  newLine.seqno = currentLine.seqno;
                  newLine.qtyord = currentLine.qtyord;
                  newLine.prod = currentLine.prod;
                  newLine.price = currentLine.price;
                  newLine.priceoverfl = !!currentLine.price;
                  newLine.unit = currentLine.unit;
                  newLine.discamt = currentLine.discamt;
                  newLine.disctype = currentLine.disctype;
                  newLine.discoverfl = !!currentLine.discamt;

                  var errorText = $translate.instant('global.duplicate.product.entry.for') + ' ' + currentLine.prod + '. ';
                  if (line.unit && currentLine.unit !== line.unit) {
                     errorText += $translate.instant('global.unit') + ', ' + currentLine.unit + ', ' + $translate.instant('message.is.different.than.existing.line') + ', ' + line.unit + '. ';
                  }
                  if (line.price && currentLine.price !== line.price) {
                     errorText += $translate.instant('global.price') + ', ' + currentLine.price + ', ' + $translate.instant('message.is.different.than.existing.line') + ', ' + line.price + '. ';
                  }
                  newLine.messages = errorText;
                  newLine.isvalid = 'e';

                  currentLine = newLine;
                  self.grid.updateRow(lineIndex);
                  isDuplicate = true;
               }
            }
         });

         if (!isDuplicate) {
            self.validateProduct(args.row);
         }
      }
   };

   self.easyLineEntry = function () {
      $state.go('^');

      $scope.sp.view.applyAutoFocus();
   };

   self.addons = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.quickLineEntry',
         drilldownState: 'addons'
      });
   };

   self.discounts = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.quickLineEntry',
         drilldownState: 'discounts'
      });
   };
});