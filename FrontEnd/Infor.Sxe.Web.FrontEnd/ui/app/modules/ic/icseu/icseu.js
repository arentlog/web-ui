'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icseu',
      dataPath: 'api/ic/icseu',
      searchMethod: 'POST',
      searchPath: 'api/ic/icseu/lookup',
      searchResultsField: 'icproductunitlookupresults',
      resultsRowIdField: 'rowidIcseu',
      detailSubTitle: [
         { label: 'global.product', value: 'prod' },
         { label: 'global.unit.of.measure', value: 'units' }
      ],
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: { label: 'global.unit', value: 'units' }
      }
   });
});

app.service('IcseuService', function ($state, $translate, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {

      // Constants
      self.VALUE_BLANK = ' ';
      self.VALUE_ZERO = 0.0;
      self.VALUE_ONE = 1;
      self.CONV_FRACTION = 'F';
      self.CONV_MULTIPLE = 'M'

      // Screen values not part of the ICSEU record
      self.extendedUnitConvType = self.CONV_MULTIPLE;
      self.unitConvLabelText = $translate.instant('global.stocking.units.in.this.unit');
      self.unitConvValue = self.VALUE_ZERO;
      self.prodUnitStock = self.VALUE_BLANK;

      self.setSelectedDetailValues = function (icseu) {

         self.prodUnitStock = self.VALUE_BLANK;

         if (icseu.unitconv === self.VALUE_ZERO) {
            self.extendedUnitConvType = self.CONV_MULTIPLE;
            self.unitConvValue = self.VALUE_ZERO;
            self.unitConvLabelText = $translate.instant('global.stocking.units.in.this.unit');
         }
         else if (icseu.unitconv < self.VALUE_ONE) {
            self.extendedUnitConvType = self.CONV_FRACTION;
            self.unitConvValue = self.VALUE_ONE / icseu.unitconv;
            self.unitConvLabelText = $translate.instant('global.units.in.a.stocking.unit');
         }
         else {
            self.extendedUnitConvType = self.CONV_MULTIPLE;
            self.unitConvValue = icseu.unitconv;
            self.unitConvLabelText = $translate.instant('global.stocking.units.in.this.unit');
         }
      }

      self.setChangedDetailValues = function (icseu) {

         if (self.extendedUnitConvType === self.CONV_FRACTION) {

            if (self.unitConvValue % 1 !== 0) {
               MessageService.alert('global.alert', 'error.you.have.entered.a.decimal.value.in.a.fractional.u');
            }

            if (self.unitConvValue !== self.VALUE_ZERO) {
               icseu.unitconv = self.VALUE_ONE / self.unitConvValue;
            }
            else {
               icseu.unitconv = self.unitConvValue;
            }

            self.unitConvLabelText = $translate.instant('global.units.in.a.stocking.unit');
         }
         else {
            icseu.unitconv = self.unitConvValue;
            self.unitConvLabelText = $translate.instant('global.stocking.units.in.this.unit');
         }

      }

      self.assignProdUnitStock = function (icseu) {
         if (icseu.prod) {
            var params = {
               prod: icseu.prod,
               fillmode: true,
               fldlist: 'unitstock'
            };
            DataService.get('api/ic/icsp/getbypk', { params: params }, function (data) {
               if (data) {
                  self.prodUnitStock = data.unitstock;
               }
            });
         }
         else {
            self.prodUnitStock = self.VALUE_BLANK;
         }
      };

   }

   this.extendCreateController = function (self, base, icseu) {

      self.icseu.unitconv = 0;

      self.assignProdUnitStock = function () {
         base.assignProdUnitStock(self.icseu);
      }

      self.setChangedDetailValues = function () {
         base.setChangedDetailValues(self.icseu);
      }

      base.setSelectedDetailValues(self.icseu);

      base.assignProdUnitStock(self.icseu);

      self.productInquiryHyperlink = function () {
         // ICIP HyperLink
         if (self.icseu && self.icseu.prod) {
            $state.go('icip.detail', { pk: self.icseu.prod });
         }
      };

   }

   this.extendDetailController = function (self, base, icseu, scope) {


      self.setChangedDetailValues = function () {
         base.setChangedDetailValues(self.icseu);
      }

      self.assignProdUnitStock = function () {
         base.assignProdUnitStock(self.icseu);
      }

      icseu.$promise.then(function () {
         base.setSelectedDetailValues(self.icseu);

         base.assignProdUnitStock(self.icseu);
      });

      self.productInquiryHyperlink = function () {
         // ICIP HyperLink
         if (self.icseu && self.icseu.prod) {
            $state.go('icip.detail', { pk: self.icseu.prod });
         }
      };

   }

   this.extendMasterController = function (self, base, scope) {

      self.productInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ICIP HyperLink
         if (currentRow && currentRow.prod) {
            $state.go('icip.detail', { pk: currentRow.prod });

         }

      };

   };

});
