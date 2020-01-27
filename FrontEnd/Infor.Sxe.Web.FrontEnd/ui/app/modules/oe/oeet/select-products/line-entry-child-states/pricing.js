'use strict';

app.controller('OeetAdvancedLineEntryPricingCtrl', function ($scope, $state, $translate, DataService, MessageService, GridService, Utils) {
   // alias => aleP
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.basePricing = {};
   self.pricing = {};
   self.usedForOptions = [];
   self.skipPriceLevelChangeOnLoad = true;
   self.skipDiscountLevelChangeOnLoad = true;
   self.skipPrevPriceChangeOnLoad = true;

   //we dont have a hook into the expandable areas expanded/collapsed event, so we need to watch these and get the price sheet only when it's visible and enabled
   $scope.$watch('aleP.pricing.btnpricesheethidden', function (newValue) {
      if (newValue === false && self.pricing.btnpricesheetenabled) {
         self.getPriceSheet();
      }
   });
   $scope.$watch('aleP.pricing.btnpricesheetenabled', function (newValue) {
      if (newValue && self.pricing.btnpricesheethidden) {
         self.getPriceSheet();
      }
   });

   //User Hook (do not rename)
   self.initializeDropdown = function () {
      self.usedForOptions = [{ label: $translate.instant('symbol.percent.of.base'), value: '3' }, { label: $translate.instant('symbol.percent.of.list'), value: '4' }];
      if (base.sasoo.seecostfl) {
         self.usedForOptions.push({ label: $translate.instant('global.cost.plus.percent'), value: '1' });
         self.usedForOptions.push({ label: $translate.instant('global.margin.percent'), value: '2' });
      }
   };

   self.pricingInitialize = function () {
      DataService.post('api/oe/asoeline/oelinepricetabinit', { data: ale.oeline, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(self.basePricing, data.oelinepricetab);
               Utils.replaceObject(self.pricing, data.oelinepricetab);
               self.pricingSave = data.oelinepricetabsave;
               self.pricingInfo = data.oelinepricetabinfo;

               self.discountLevels = data.oelinepricetabdisclvl;
               self.previousPrices = data.oelinepricetabprevprc;
               self.priceLevels = data.oelinepricetabpricelvl;
            }
         }

         //User Hook (do not rename)
         //This is strategically placed so the timing is right to get the values in the dropdown
         //initialized but still be able to modify them with an extension.
         self.initializeDropdown();
      });
   };

   self.pricingInitialize();

   self.getPriceSheet = function () {
      var priceSheetInquiryCriteria = {
         prod: ale.oeline.prod,
         whse: base.oehdr.whse,
         pdrecno: ale.oeline.pdrecno
      };
      DataService.post('api/pd/pdsc/lookup', { data: priceSheetInquiryCriteria, busy: true }, function (data) {
         if (data) {
            self.priceSheet = data[0];
         }
      });
   };

   self.pricingLeaveField = function (fieldName, navAfterApply) {
      var hasFieldChanged = self.checkFieldChanged(fieldName);

      if (hasFieldChanged) {
         var pricingLeaveFieldRequest = {
            oeline: ale.oeline,
            oelinepricetab: self.pricing,
            oelinepricetabsave: self.pricingSave,
            pvFieldname: fieldName
         };

         var selectedPreviousPrice = GridService.getSelectedRecord(self.previousPricesGrid);
         if (selectedPreviousPrice) {
            pricingLeaveFieldRequest.oelinepricetabprevprc = [selectedPreviousPrice];
         }
         var selectedPriceLevel = GridService.getSelectedRecord(self.priceLevelGrid);
         if (selectedPriceLevel) {
            pricingLeaveFieldRequest.oelinepricetabpricelvl = [selectedPriceLevel];
         }
         var selectedDiscountLevel = GridService.getSelectedRecord(self.discountLevelGrid);
         if (selectedDiscountLevel) {
            pricingLeaveFieldRequest.oelinepricetabdisclvl = [selectedDiscountLevel];
         }

         DataService.post('api/oe/asoeline/oelinepricetableavefield', { data: pricingLeaveFieldRequest, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(self.pricingSave, data.oelinepricetabsave);
               Utils.replaceObject(self.pricing, data.oelinepricetab);
               Utils.replaceObject(self.basePricing, data.oelinepricetab);
               Utils.replaceObject(ale.oeline, data.oeline);

               if (data.pvChangelist) {
                  var lineValidateRequest = {
                     oeline: ale.oeline,
                     lMaintMode: ale.isAddLineMode,
                     cChangeList: data.pvChangelist
                  };
                  DataService.post('api/oe/asoeline/oelinevalidate', { data: lineValidateRequest, busy: true }, function (data) {
                     if (data) {
                        // Consider margin and product restrictions warnings as non fatal and continue
                        var restrictionErrorMessages = new JSLINQ(data.messaging).Where(function (message) {
                           return message.messagetxt.includes('5626') || message.messagetxt.includes('5627') || message.messagetxt.includes('6943') || message.messagetxt.includes('6944');
                        }) || [];
                        if (!MessageService.processMessaging(data.messaging) || restrictionErrorMessages.items.length > 0) {
                           Utils.replaceObject(ale.baseOeline, data.oeline);
                           Utils.replaceObject(ale.oeline, data.oeline);
                           if (fieldName === 'btnrestorepricing') {
                              if (ale.isAddLineMode) {
                                 if (ale.oeline.promoprice && !ale.isCatalogProduct) {
                                    ale.promoPricing();
                                 } else {
                                    ale.overridePricing();
                                 }
                              } else {
                                 ale.clearLineAndReset();
                              }

                              self.resetPricing();
                           } else if (fieldName === 'btnsystempricing') {
                              if (ale.oeline.promoprice && !ale.isCatalogProduct) {
                                 ale.promoPricing();
                              } else {
                                 ale.overridePricing();
                              }

                              self.resetPricing();
                           }

                           //if the submit button was pressed or a grid selection was made and there were no errors, nav the user back to line entry. otherwise, update info
                           if ((fieldName === 'btnapply' && navAfterApply) || fieldName === 'discountlevel' || fieldName === 'previousprice' || fieldName === 'pricelevel') {
                              $state.go('^');
                           } else {
                              var pricingInfoRequest = {
                                 oeline: ale.oeline,
                                 oelinepricetabsave: self.pricingSave
                              };
                              DataService.post('api/oe/asoeline/oelinepricetabinfo', { data: pricingInfoRequest, busy: true }, function (data) {
                                 if (data) {
                                    Utils.replaceObject(self.pricingInfo, data);
                                 }
                              });
                           }
                        }
                     }
                  });
               }
            }
         });
      }
   };

   self.checkFieldChanged = function (fieldName) {
      switch (fieldName) {
         case 'discountlevel':
            return typeof self.basePricing.discountlevel != 'undefined' && self.basePricing.discountlevel !== self.pricing.discountlevel;
         case 'percent':
            return typeof self.basePricing.percent != 'undefined' && self.basePricing.percent !== self.pricing.percent;
         case 'percentof':
            return typeof self.basePricing.percentof != 'undefined' && self.basePricing.percentof !== self.pricing.percentof;
         case 'previousprice':
            return typeof self.basePricing.previousprcrecid != 'undefined' && self.basePricing.previousprcrecid !== self.pricing.previousprcrecid;
         case 'pricelevel':
            return typeof self.basePricing.pricinglevel != 'undefined' && self.basePricing.pricinglevel !== self.pricing.pricinglevel;
         case 'btnapply':
            return true;
         case 'btnignorequotes':
            return true;
         case 'btnrestorepricing':
            return true;
         case 'btnsystempricing':
            return true;
         default:
            return false;
      }
   };

   self.resetPricing = function () {
      self.basePricing = {};
      self.pricing = {};
      self.pricingSave = {};
      self.pricingInfo = {};
      self.previousPrices = [];
      self.priceLevels = [];
      self.discountLevels = [];

      self.pricingInitialize();
   };

   self.previousPriceSelected = function () {
      if (self.skipPrevPriceChangeOnLoad) {
         self.skipPrevPriceChangeOnLoad = false;
      } else {
         var selectedRecord = GridService.getSelectedRecord(self.previousPricesGrid);
         if (selectedRecord) {
            self.pricing.previousprc = selectedRecord.prevprice;
            self.pricing.previousprcrecid = selectedRecord.oeelrecid;

            self.pricingLeaveField('previousprice');
         } else {
            self.pricing.previousprc = 0;
            self.pricing.previousprcrecid = 0;

            self.pricingLeaveField('previousprice');
         }
      }
   };

   self.priceLevelSelected = function () {
      if (self.skipPriceLevelChangeOnLoad) {
         self.skipPriceLevelChangeOnLoad = false;
      } else {
         var selectedRecord = GridService.getSelectedRecord(self.priceLevelGrid);
         if (selectedRecord) {
            self.pricing.pricinglevel = selectedRecord.level;

            self.pricingLeaveField('pricelevel');
         } else {
            self.pricing.pricinglevel = 0;

            self.pricingLeaveField('pricelevel');
         }
      }
   };

   self.discountLevelSelected = function () {
      if (self.skipDiscountLevelChangeOnLoad) {
         self.skipDiscountLevelChangeOnLoad = false;
      } else {
         var selectedRecord = GridService.getSelectedRecord(self.discountLevelGrid);
         if (selectedRecord) {
            self.pricing.discountlevel = selectedRecord.level;

            self.pricingLeaveField('discountlevel');
         } else {
            self.pricing.discountlevel = 0;

            self.pricingLeaveField('discountlevel');
         }
      }
   };

   self.submit = function () {
      if (self.pricing.btnapplyenabled) {
         self.pricingLeaveField('btnapply', true);
      } else {
         $state.go('^');
      }
   };
});