'use strict';

app.controller('OeetAdvancedLineEntryNonStockCtrl', function ($scope, $state, $translate, Utils, Constants, DataService, MessageService, AuthService, AodataService) {
   //alias => aleNs
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   var allowexpandedproduct = AodataService.getValue('IC', 'allowexpandedproduct');

   ale.nonStockTaxChanged = false;

   self.prodMaxLength = allowexpandedproduct.toLowerCase() === 'yes' || allowexpandedproduct.toLowerCase() === 'y' ? 50 : 24;

   self.itemTypeCollection = [];

   self.isDefaults = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.nonStock.defaults');
   };

   self.nonStockHeader = {
      orderno: base.oehdr.orderno,
      ordersuf: base.oehdr.ordersuf,
      custno: base.oehdr.custno,
      shipto: base.oehdr.shipto,
      ourproc: 'oeet',
      whse: base.oehdr.whse,
      transtype: base.oehdr.oetype,
      maintmode: ale.isAddLineMode ? 'a' : 'c',
      orderdisp: base.oehdr.orderdisp,
      stordty: base.oehdr.stordty,
      bofl: base.oehdr.bofl,
      slsrepout: base.oehdr.slsrepout,
      lineno: ale.oeline.lineno
   };

   self.setupNonStock = function () {
      var nonStockRetrieveRequest = {
         oeline: ale.oeline,
         oelinenonstockhdr: self.nonStockHeader
      };
      DataService.post('api/oe/asoeline/oelinenonstockretrieve', { data: nonStockRetrieveRequest, busy: true }, function (data) {
         if (data) {
            if (ale.isAddLineMode && base.sasoo.useprevnsfl && !ale.oeline.selectedcatflag) {
               //Hydrate the object with default data first.
               self.oelineNonStock = data;
               if (self.oelineNonStock && base.nonStockStickyData.prod && !data.prod) {
                  self.usePreviousNonStockValues();
               }
            } else {
               self.oelineNonStock = data;
            }

            //User Hook (do not rename)
            if (self.setupNonStockBeforeItemTypes) {
               self.setupNonStockBeforeItemTypes();
            }

            if (self.oelineNonStock.itemtypevaluescode) {
               self.generateItemTypes(self.oelineNonStock.itemtypevaluescode);
            }

            //User Hook (do not rename)
            if (self.setupNonStockContinue) {
               self.setupNonStockContinue();
            }
         }
      });
   };

   self.usePreviousNonStockValues = function () {
      if (self.oelineNonStock && base.nonStockStickyData.prod) {
         self.oelineNonStock.arpwhse = base.nonStockStickyData.arpwhse;
         self.oelineNonStock.botype = base.nonStockStickyData.botype;
         self.oelineNonStock.discamt = base.nonStockStickyData.discamt;
         self.oelineNonStock.commtype = base.nonStockStickyData.commtype;
         self.oelineNonStock.kitfl = base.nonStockStickyData.kitfl;
         self.oelineNonStock.kitrollty = base.nonStockStickyData.kitrollty;
         //This 'itemtypevaluescode' goes with the 'prod' field.
         self.oelineNonStock.itemtypevaluescode = base.nonStockStickyData.itemtypevaluescode;
         self.oelineNonStock.prod = base.nonStockStickyData.prod;
         self.oelineNonStock.proddesc = base.nonStockStickyData.proddesc;
         self.oelineNonStock.proddesc2 = base.nonStockStickyData.proddesc2;
         self.oelineNonStock.prodline = base.nonStockStickyData.prodline;
         self.oelineNonStock.prodcat = base.nonStockStickyData.prodcat;
         self.oelineNonStock.pricetype = base.nonStockStickyData.pricetype;
         self.oelineNonStock.rushfl = base.nonStockStickyData.rushfl;
         self.oelineNonStock.vendno = base.nonStockStickyData.vendno;
         self.oelineNonStock.unit = base.nonStockStickyData.unit;
         self.oelineNonStock.upcid = base.nonStockStickyData.upcid;
      }
   };

   self.setupNonStock();

   self.generateItemTypes = function (itemTypeValueCodes) {
      self.itemTypeCollection = [];

      //If the backend passes up 2 blanks in the collection, then we need to treat that
      //like one blank.
      var splitItemTypeCodes;
      if (itemTypeValueCodes && itemTypeValueCodes === ',') {
         splitItemTypeCodes = [''];
      } else {
         splitItemTypeCodes = itemTypeValueCodes.split(',');
      }
      splitItemTypeCodes.forEach(function (itemTypeCode) {
         switch (itemTypeCode.toLowerCase()) {
            case '':
               if (!self.itemTypeCollection.some(function (itemType) { return itemType === itemTypeCode; })) {
                  self.itemTypeCollection.push({ label: $translate.instant('global.blank'), value: itemTypeCode });
               }
               break;
            case 'c':
               if (!self.itemTypeCollection.some(function (itemType) { return itemType === itemTypeCode; })) {
                  self.itemTypeCollection.push({ label: $translate.instant('global.create.as.catalog'), value: itemTypeCode });
               }
               break;
            case 'p':
               if (!self.itemTypeCollection.some(function (itemType) { return itemType === itemTypeCode; })) {
                  self.itemTypeCollection.push({ label: $translate.instant('global.create.as.oan.ns'), value: itemTypeCode });
               }
               break;
            case 'r':
               if (!self.itemTypeCollection.some(function (itemType) { return itemType === itemTypeCode; })) {
                  self.itemTypeCollection.push({ label: $translate.instant('global.review.for.inventory'), value: itemTypeCode });
               }
               break;
         }
      });
   };

   self.altProdGrpChanged = function () {
      if (self.oelineNonStock.altprodgrp) {
         var sastaParams = {
            codeiden: 'AG',
            codeval: self.oelineNonStock.altprodgrp
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (data) {
            if (data) {
               if (data.shipfmno || data.prodline || data.prodcat || data.vendno || data.pricetype) {
                  MessageService.yesNo('global.confirmation', 'question.alternate.product.group.default.exists', function yes() {
                     if (data.shipfmno) {
                        self.oelineNonStock.altshipfmno = data.shipfmno;
                     }
                     if (data.vendno) {
                        self.oelineNonStock.vendno = data.vendno;
                        self.oelineNonStock.altvendno = data.vendno;
                     }
                     if (data.prodcat) {
                        self.oelineNonStock.prodcat = data.prodcat;
                        self.oelineNonStock.altprodcat = data.prodcat;
                     }
                     if (data.pricetype) {
                        self.oelineNonStock.pricetype = data.pricetype;
                        self.oelineNonStock.altpricetype = data.pricetype;
                     }
                     if (data.prodline) {
                        self.oelineNonStock.prodline = data.prodline;
                        self.oelineNonStock.altprodline = data.prodline;
                     }
                  });
               }
            }
         });
      }

      self.nonStockFieldChanged('prod');
   };

   self.productChanged = function () {
      self.oelineNonStock.prod = self.oelineNonStock.prod.trim();
      self.oelineNonStock.quesdescrip1 = '';
      self.oelineNonStock.quesdescrip2 = '';
      self.oelineNonStock.quesmessage = '';
      self.oelineNonStock.quespriceavail = '';
      self.oelineNonStock.quesprodcat = '';
      self.oelineNonStock.quesmsgmsds = '';

      self.nonStockFieldChanged('prod');
   };

   self.nonStockFieldChanged = function (fieldName) {
      if (fieldName !== 'prod' || (fieldName === 'prod' && self.oelineNonStock.prod)) {
         if (fieldName === 'prod') {
            if (!self.isFieldChangeFromUseExistingSettings) {
               self.oelineNonStock.quesanswer = '';
            } else {
               self.isFieldChangeFromUseExistingSettings = false;
            }
         }

         var nonStockLeaveFieldRequest = {
            oeline: ale.oeline,
            oelinenonstock: self.oelineNonStock,
            oelinenonstockhdr: self.nonStockHeader,
            cFieldName: fieldName
         };
         DataService.post('api/oe/asoeline/oelinenonstockleavefield', { data: nonStockLeaveFieldRequest, busy: true }, function (data) {
            if (data) {
               if (data.cWarningMessage) {
                  MessageService.error('global.error', data.cWarningMessage);
               }

               Utils.replaceObject(self.oelineNonStock, data.oelinenonstock);

               //User Hook (do not rename)
               if (self.nonstockLeaveFieldBeforePromoPrice) {
                  self.nonstockLeaveFieldBeforePromoPrice(fieldName);
               }

               if (self.oelineNonStock.promoprice) {
                  var promoPriceMessage = $translate.instant('global.promotional.price') + ': ' + self.oelineNonStock.promoprice.toFixed(2) + '<br/>' +
                                          $translate.instant('global.non.promotional.price') + ': ' + self.oelineNonStock.nonpromoprice.toFixed(2) + '<br/>' +
                                          $translate.instant('question.accept.promotional.price');
                  MessageService.yesNo('global.promotional.pricing', promoPriceMessage, function () {
                     //yes callback
                     self.oelineNonStock.promoacceptcd = 'p';
                     self.nonStockFieldChanged('prod');
                  }, function () {
                     //no callback
                     self.oelineNonStock.promoacceptcd = 'n';
                     self.nonStockFieldChanged('prod');
                  });
               }

               //Only want to do this for 'prod', if we do it for the 'linetype', then
               //you'll get multiple questions pop in a loop.
               if (fieldName === 'prod' && self.oelineNonStock.itemtypevaluescode) {
                  self.generateItemTypes(self.oelineNonStock.itemtypevaluescode);
               }

               //User Hook (do not rename)
               if (self.nonstockLeaveFieldBeforeUseExisting) {
                  self.nonstockLeaveFieldBeforeUseExisting(fieldName);
               }

               //We only want to ask the question if it hasn't been asked before.
               if (self.isUseExistingSettingsDataFound() && !self.oelineNonStock.quesanswer && !ale.isCatalogProduct) {
                  var useDefaultSettingsMessage = self.oelineNonStock.quesdescrip1 + '<br>' +
                                                  self.oelineNonStock.quesdescrip2 + '<br>' +
                                                  self.oelineNonStock.quespriceavail + '<br>' +
                                                  self.oelineNonStock.quesprodcat + '<br>' +
                                                  self.oelineNonStock.quesmessage + '<br>' +
                                                  self.oelineNonStock.quesmsgmsds + '<br>';
                  MessageService.yesNo('global.use.existing.settings', useDefaultSettingsMessage, function () {
                     //yes callback
                     self.oelineNonStock.quesanswer = 'yes';

                     var ehfFeeCriteria = {
                        custno: base.oehdr.custno,
                        shipto: base.oehdr.shipto,
                        state: base.oehdr.shiptost,
                        prod: self.oelineNonStock.prod,
                        effectivedt: Utils.getCurrentDate()
                     };
                     DataService.post('api/oe/asoelineextra/oegetdefaultehfee', { data: ehfFeeCriteria, busy: true }, function (data) {
                        if (data) {
                           ale.oeline.ehfaddonno = data.ehfaddonno;
                           ale.oeline.ehfamt = data.ehfamt;
                           ale.oeline.ehfexemptamt = data.ehfexemptamt;
                           ale.oeline.ehfnetamt = 0;
                        }

                        self.isFieldChangeFromUseExistingSettings = true;
                        self.nonStockFieldChanged('prod');
                     });
                  }, function () {
                     //no callback
                     self.oelineNonStock.quesanswer = 'no';
                     self.usePreviousNonStockValues();
                  });
               }
            }

            //User Hook (do not rename)
            if (self.nonstockLeaveFieldContinue) {
               self.nonstockLeaveFieldContinue(fieldName);
            }

            if (fieldName === 'itemtype') {
               self.nonStockFieldChanged('prod');
            }
         });
      }
   };

   self.isUseExistingSettingsDataFound = function () {
      if (self.oelineNonStock.quesanswer || self.oelineNonStock.quesdescrip1 || self.oelineNonStock.quesdescrip2 ||
          self.oelineNonStock.quesmessage || self.oelineNonStock.quespriceavail || self.oelineNonStock.quesprodcat) {
         return true;
      } else {
         return false;
      }
   };

   self.backOrderChanged = function () {
      //unchecked only
      if (!self.oelineNonStock.bofl) {
         self.oelineNonStock.createpofl = false;
      }
   };

   self.createPoChanged = function () {
      //checked only
      if (self.oelineNonStock.createpofl) {
         self.oelineNonStock.bofl = true;
      }
   };

   self.kitChanged = function () {
      if (self.oelineNonStock.kitfl) {
         self.oelineNonStock.createpofl = false;
         self.oelineNonStock.createpoflenabled = false;
         self.oelineNonStock.copycommentfl = false;
         self.oelineNonStock.copycommentflenabled = false;
      } else {
         self.oelineNonStock.createpoflenabled = true;
         self.oelineNonStock.copycommentflenabled = true;
      }
   };

   self.costCalculatorCostChangedCallback = function (calculatedCost) {
      if (calculatedCost) {
         self.oelineNonStock.foreignCost = calculatedCost;
      }
   };

   self.finalizeNonStock = function () {
      self.moveNonStockDataToOeline();

      if (ale.isAddLineMode && base.sasoo.useprevnsfl) {
         self.saveNonStockStickyData();
      }

      ale.validateLine(ale.checkAutoSourceNonStock,true);

      MessageService.info('global.information', 'message.non.stock.data.has.been.accepted');

      $state.go('^');
   };

   self.moveNonStockDataToOeline = function () {
      ale.oeline.arpwhse = self.oelineNonStock.arpwhse;
      if (self.oelineNonStock.botype === 'd') {
         ale.oeline.botype = self.oelineNonStock.botype;
      } else {
         ale.oeline.botype = self.oelineNonStock.bofl ? 'y' : 'n';
      }
      ale.oeline.createpofl = self.oelineNonStock.createpofl;
      ale.oeline.copycommentfl = self.oelineNonStock.copycommentfl;
      ale.oeline.commtype = self.oelineNonStock.commtype;
      ale.oeline.csunperstk = self.oelineNonStock.csunperstk;
      ale.oeline.disctype = self.oelineNonStock.disctype;
      ale.oeline.kitrollty = self.oelineNonStock.kitrollty;
      ale.oeline.kitfl = self.oelineNonStock.kitfl;
      ale.oeline.prodtype = self.oelineNonStock.pricetype;
      ale.oeline.prod = self.oelineNonStock.prod;
      ale.oeline.proddesc = self.oelineNonStock.proddesc;
      ale.oeline.proddesc2 = self.oelineNonStock.proddesc2;
      ale.oeline.prodcat = self.oelineNonStock.prodcat;
      ale.oeline.prodline = self.oelineNonStock.prodline;
      ale.oeline.price = self.oelineNonStock.price;
      ale.oeline.rushfl = self.oelineNonStock.rushfl;
      ale.oeline.scrndiscamt = self.oelineNonStock.discamt;
      ale.oeline.specnstype = 'n';
      ale.oeline.vendno = self.oelineNonStock.vendno;
      ale.oeline.promoacceptcd = self.oelineNonStock.promoacceptcd;
      ale.oeline.srcrestrictovrfl = self.oelineNonStock.restrictovrfl;
      ale.oeline.srcrestricterrmess = self.oelineNonStock.restricterrmess;
      ale.oeline.altprodgrp = self.oelineNonStock.altprodgrp;
      ale.oeline.upcid = self.oelineNonStock.upcid;

      if (self.oelineNonStock.unit) {
         ale.oeline.unit = self.oelineNonStock.unit;
      }
      //Additional Properties that get set by the FinalizeNonstock call.
      ale.oeline.leadtm = self.oelineNonStock.leadtm;

      //This needs to get set everytime we move nonstock data to the ale.oeline. SS & DS 04/15/14
      ale.oeline.nsrunfl = true;

      //only set orderaltno if we need to.  don't want to override tie and set to 0 on edit mode.  SXWEB-6148.
      if (!ale.isAddLineMode && self.oelineNonStock.orderaltno) {
         if (!ale.oeline.ordertype) {
            ale.oeline.ordertype = self.oelineNonStock.ordertype;
         }
         ale.oeline.orderaltno = self.oelineNonStock.orderaltno;
      } else {
         if (!ale.oeline.ordertype) {
            ale.oeline.ordertype = self.oelineNonStock.ordertype;
         }
         if (self.oelineNonStock.orderaltno) {
            ale.oeline.orderaltno = self.oelineNonStock.orderaltno;
         }
      }

      ale.oeline.powtintfl = self.oelineNonStock.powtintfl;
      ale.oeline.powtnew = self.oelineNonStock.powtnew;
      ale.oeline.prccostper = self.oelineNonStock.prccostper;
      ale.oeline.prodline = self.oelineNonStock.prodline;
      ale.oeline.scrnprodcost = self.oelineNonStock.prodcost;
      ale.oeline.serlottype = self.oelineNonStock.serlottype;
      ale.oeline.speccostty = self.oelineNonStock.speccostty;
      ale.oeline.unit = ale.oeline.unit ? ale.oeline.unit : 'each';
      if (self.oelineNonStock.vshipfmno) {
         ale.oeline.vshipfmno = self.oelineNonStock.vshipfmno;
      }
      ale.oeline.vshipviaty = self.oelineNonStock.vshipviaty;
      ale.oeline.vduedt = self.oelineNonStock.vduedt;
      ale.oeline.vfobfl = self.oelineNonStock.vfobfl;
      ale.oeline.vvendno = self.oelineNonStock.vvendno;
      ale.oeline.wwhse = self.oelineNonStock.wwhse;
      ale.oeline.wshipviaty = self.oelineNonStock.wshipviaty;
      ale.oeline.wduedt = self.oelineNonStock.wduedt;
      ale.oeline.ncnr = self.oelineNonStock.ncnr;
      ale.oeline.eccnclasscd = self.oelineNonStock.eccnclasscd;
      ale.oeline.countryoforigin = self.oelineNonStock.countryoforigin;
      ale.oeline.tariffcd = self.oelineNonStock.tariffcd;

      if (self.oelineNonStock.custprod) {
         ale.oeline.reqprod = self.oelineNonStock.custprod;
         ale.oeline.custprod = self.oelineNonStock.custprod;
         ale.oeline.xrefprodty = "C";
      }
      else {
         ale.oeline.reqprod = '';
         ale.oeline.custprod = '';
         ale.oeline.xrefprodty = '';
      }

      if (self.oelineNonStock.taxablefl !== ale.oeline.taxablefl) {
         ale.nonStockTaxChanged = true;
         ale.oeline.taxablefl = self.oelineNonStock.taxablefl;
         ale.oeline.nontaxtype = self.oelineNonStock.nontaxtype;
         ale.oeline.taxgroup = self.oelineNonStock.taxgroup;
      }

      if (self.oelineNonStock.nonstkaddfl) {
         ale.oeline.specnstype = 's';
      }

      //User Hook (do not rename)
      if (self.moveNonStockDataToOelineContinue) {
         self.moveNonStockDataToOelineContinue();
      }
   };

   self.saveNonStockStickyData = function () {
      base.nonStockStickyData = {};

      base.nonStockStickyData.arpwhse = self.oelineNonStock.arpwhse;
      base.nonStockStickyData.botype = self.oelineNonStock.botype;
      base.nonStockStickyData.discamt = self.oelineNonStock.discamt;
      base.nonStockStickyData.commtype = self.oelineNonStock.commtype;
      base.nonStockStickyData.kitfl = self.oelineNonStock.kitfl;
      base.nonStockStickyData.kitrollty = self.oelineNonStock.kitrollty;
      base.nonStockStickyData.prod = self.oelineNonStock.prod;
      //This 'itemtypevaluescode' goes with the 'prod' field.
      base.nonStockStickyData.itemtypevaluescode = self.oelineNonStock.itemtypevaluescode;
      base.nonStockStickyData.proddesc = self.oelineNonStock.proddesc;
      base.nonStockStickyData.proddesc2 = self.oelineNonStock.proddesc2;
      base.nonStockStickyData.prodline = self.oelineNonStock.prodline;
      base.nonStockStickyData.prodcat = self.oelineNonStock.prodcat;
      base.nonStockStickyData.pricetype = self.oelineNonStock.pricetype;
      base.nonStockStickyData.rushfl = self.oelineNonStock.rushfl;
      base.nonStockStickyData.vendno = self.oelineNonStock.vendno;
      base.nonStockStickyData.unit = self.oelineNonStock.unit;
      base.nonStockStickyData.upcid = self.oelineNonStock.upcid;
   };

   self.submit = function () {
      var nonStockValidateRequest = {
         oeline: ale.oeline,
         oelinenonstock: self.oelineNonStock,
         oelinenonstockhdr: self.nonStockHeader
      };

      // If ARSC is set to required a customer product, give an error if not entered
      if (!self.oelineNonStock.custprod && base.isRequireCustomerProd) {
         MessageService.error('global.error', 'message.customer.product.required');
         return;
      }

      if (nonStockValidateRequest.oeline.price === 0) {
         nonStockValidateRequest.oeline.manprice = false;
      }

      DataService.post('api/oe/asoeline/oelinenonstockvalidate', { data: nonStockValidateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               var questionMessage;
               data.forEach(function (message) {
                  if (message.messagetype.toLowerCase() === 'qyn') {
                     questionMessage = message;
                  }
               });
               //if there was a question message, show it
               if (questionMessage && questionMessage.messagetxt) {
                  MessageService.yesNo('global.question', questionMessage.messagetxt, function () {
                     //yes callback
                     ale.oeline.eccnallowblankfl = true;
                     self.oelineNonStock.eccnallowblankfl = true;
                     self.submit();
                  }, function () {
                     //no callback
                     ale.oeline.eccnallowblankfl = false;
                     self.oelineNonStock.eccnallowblankfl = false;
                  });
                  return;
               }

               var nonStockFinalRequest = {
                  oeline: ale.oeline,
                  oelinenonstock: self.oelineNonStock,
                  oelinenonstockhdr: self.nonStockHeader
               };
               DataService.post('api/oe/asoeline/oelinenonstockfinal', { data: nonStockFinalRequest, busy: true }, function (data) {
                  if (data) {
                     Utils.replaceObject(self.oelineNonStock, data);

                     if (self.oelineNonStock.restrictoverfl && self.oelineNonStock.restricterrmess) {
                        MessageService.info('global.information', self.oelineNonStock.restricterrmess);
                        AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'poet', 'lines', 'restrictovrfl', '', '', function () {
                           //yes callback
                           self.oeline.srcrestricterrmess = '';

                           self.finalizeNonStock();
                        }, function () {
                           //no callback
                           //setting this forces the next oeline SI call to recheck the sourcing restriction logic
                           self.oeline.srcrestrictovrfl = false;
                        });
                        return;
                     }

                     self.finalizeNonStock();
                  }
               });
            }
         }
      });
   };

   self.defaultFields = function () {
      //set temp fields for use in defaults screen
      self.oelineNonStock.tempunit = self.oelineNonStock.unit;
      self.oelineNonStock.tempserlottype = self.oelineNonStock.serlottype;
      self.oelineNonStock.tempspeccostty = self.oelineNonStock.speccostty;
      self.oelineNonStock.tempcsunperstk = self.oelineNonStock.csunperstk;
      self.oelineNonStock.tempprccostper = self.oelineNonStock.prccostper;

      $state.go(base.baseState + '.selectProducts.advancedLineEntry.nonStock.defaults');
   };

   self.cancel = function () {
      self.setupNonStock();
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetAdvancedLineEntryNonStockDefaultsCtrl', function ($scope, $state) {
   //alias => aleNsD
   var self = this;
   var aleNs = $scope.aleNs;

   self.submit = function () {
      //set new defaults
      aleNs.oelineNonStock.unit = aleNs.oelineNonStock.tempunit;
      aleNs.oelineNonStock.serlottype = aleNs.oelineNonStock.tempserlottype;
      aleNs.oelineNonStock.speccostty = aleNs.oelineNonStock.tempspeccostty;
      aleNs.oelineNonStock.csunperstk = aleNs.oelineNonStock.tempcsunperstk;
      aleNs.oelineNonStock.prccostper = aleNs.oelineNonStock.tempprccostper;
      //clear out old ones
      aleNs.oelineNonStock.tempunit = '';
      aleNs.oelineNonStock.tempserlottype = '';
      aleNs.oelineNonStock.tempspeccostty = '';
      aleNs.oelineNonStock.tempcsunperstk = '';
      aleNs.oelineNonStock.tempprccostper = '';

      $state.go('^');
   };

   self.back = function () {
      $state.go('^');
   };
});