'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsl',
      dataPath: 'api/ic/icsl',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsl/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'icprodlinelookupresults',
      resultsRowIdField: 'rowidIcsl',
      createStateView: 'ic/icsl/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icsl/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/icproductlinecopy',
      recentlyVisited: {
         title: { label: 'global.vendor', value: 'vendno' },
         description: [{ label: 'global.warehouse', value: 'whse' }, { label: 'global.product.line', value: 'prodline' }]
      }
   });
});

app.service('IcslService', function ($state, MessageService, AodataService, DataService, UserService, Utils, SecurityService) {

   this.extendBaseController = function (self, base, icsl, scope) {



      self.applyPurchaseLevels = function (purchaseLevels, icsl) {

         for (var i = 0; i <= 8; i++) {
            var obj = purchaseLevels[i];
            var levelNum = i + 1;
            icsl['tarbuyamt' + levelNum] = obj.tarbuyamt;
            icsl['discmult' + levelNum] = obj.discmult;
         }

      };

      self.assignSafetyValues = function (icsl) {
         if (icsl.safeallty.toUpperCase() === "Q") {
            icsl.safeallpct = 0;
         } else {
            icsl.safeallamt = 0;
         }
      }
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      self.getSubTitle = function () {
         return MessageService.get('global.vendor') + ': ' + stateParams.object.vendno + ' | ' +
            MessageService.get('global.warehouse') + ': ' + stateParams.object.whse + ' | ' +
            MessageService.get('global.product.line') + ': ' + stateParams.object.prodline;
      };
      request.fromvendno = stateParams.object.vendno;
      request.fromwhse = stateParams.object.whse;
      request.fromprodline = stateParams.object.prodline;
   };

   this.extendCreateController = function (self, base, icsl, scope) {

      self.tarbuyamt = 0;
      self.discmult = 0;
      self.icsl.minbuytype = 'D';
      self.icsl.tarbuytype = 'D';
      self.icsl.vroqfl = true;
      self.icsl.troqfl = true;
      self.icsl.safeallty = '%';
      self.icsl.ordcalcty = 'C';
      self.icsl.revcyclin = 14;
      self.icsl.surplusty = 'I';
      self.icsl.usgmnth = 6;
      self.icsl.frozenmos = 6;
      self.icsl.frozentype = 'N';
      self.icsl.freightexpectedty = 'Y';
      self.icsl.arptype = 'V';
      self.icsl.warrtype = 'm';
      self.icsl.nodaysseas = 30;
      self.icsl.termsdiscfl = true;
      self.icsl.taxablety = 'v';
      self.icsl.whse = '';

      self.purchaseLevels = [
         { level: MessageService.get('number.1'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.2'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.3'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.4'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.5'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.6'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.7'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.8'), targetbuy: 0, discmult: 0 },
         { level: MessageService.get('number.9'), targetbuy: 0, discmult: 0 },

      ];

      self.customSubmit = function () {

         base.applyPurchaseLevels(self.purchaseLevels, icsl);

         self.submit();

      };

   };


   this.extendDetailController = function (self, base, icsl, scope) {

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icsl', 'General') < 3;
      self.isOrderTabReadonly = SecurityService.getSubSecurityLevel('icsl', 'Order') < 3;
      self.isTaxTabReadonly = SecurityService.getSubSecurityLevel('icsl', 'Tax') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icsl', 'Custom') < 3;

      self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty').toUpperCase();
      self.showOAN = false;

      self.getSubTitle = function () {
         return MessageService.get('global.vendor') + ': ' + self.icsl.vendno + ' | ' +
            MessageService.get('global.warehouse') + ': ' + self.icsl.whse + ' | ' +
            MessageService.get('global.product.line') + ': ' + self.icsl.prodline;
      };
      DataService.get('api/ic/icsr/geticsrzerovendorblankwhseline', { busy: false }, function (data) {
         if (data) {
            self.icUsage = data.icusage;
            if (self.icUsage.toUpperCase() === 'A') {
               self.showOAN = true;
            }
         }
      });


      self.taxGroupChanged = function () {

         if (self.taxMethodType === 'G') {

            if (self.icsl.taxgroup) {

               self.icsl.taxablety = 'y';

            } else {

               self.icsl.taxablety = 'n';
            };
         }
      };

      // When the full icsl object has been resolved, build the purchase level data set
      icsl.$promise.then(function () {

         self.purchaseLevels = [
             { level: MessageService.get('number.1'), tarbuyamt: icsl.tarbuyamt1, discmult: icsl.discmult1 },
             { level: MessageService.get('number.2'), tarbuyamt: icsl.tarbuyamt2, discmult: icsl.discmult2 },
             { level: MessageService.get('number.3'), tarbuyamt: icsl.tarbuyamt3, discmult: icsl.discmult3 },
             { level: MessageService.get('number.4'), tarbuyamt: icsl.tarbuyamt4, discmult: icsl.discmult4 },
             { level: MessageService.get('number.5'), tarbuyamt: icsl.tarbuyamt5, discmult: icsl.discmult5 },
             { level: MessageService.get('number.6'), tarbuyamt: icsl.tarbuyamt6, discmult: icsl.discmult6 },
             { level: MessageService.get('number.7'), tarbuyamt: icsl.tarbuyamt7, discmult: icsl.discmult7 },
             { level: MessageService.get('number.8'), tarbuyamt: icsl.tarbuyamt8, discmult: icsl.discmult8 },
             { level: MessageService.get('number.9'), tarbuyamt: icsl.tarbuyamt9, discmult: icsl.discmult9 },

         ];

      });

      self.customSubmit = function () {
         if (!self.icsl.nontaxtype) {
            self.icsl.nontaxtype = '';
         }
         base.applyPurchaseLevels(self.purchaseLevels, icsl);
         base.assignSafetyValues(icsl);

         self.submit();

      };
   };

});