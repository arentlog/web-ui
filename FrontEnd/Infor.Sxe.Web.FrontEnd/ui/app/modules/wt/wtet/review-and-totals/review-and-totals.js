'use strict';

app.controller('WtetReviewAndTotalsCtrl', function ($state, $scope, $translate, AodataService, DataService, MessageService, RecoveryService, GridService, Utils, Sasc) {
   var self = this;
   var base = $scope.base;
   self.sasc = Sasc;
   self.ADDON_TYPE_DOLLAR = '$';
   self.ADDON_TYPE_PERCENTAGE = '%';
   self.isIncludeAddonsWhenPostingGL = false;
   self.markupAddons = AodataService.getValue("WT", "WTLineMarkupAddons");

   // First time in here
   if (base) {
      self.isIncludeAddonsWhenPostingGL = self.sasc.icincaddgl && !base.wthdr.markupaddonfl;
   }

   self.recalculate = function () {
      if (base.wthdr) {
         base.updateWthdr(self.updateWthdrCallback);
      }
   };

   self.updateWthdrCallback = function () {
      if (self.markupAddons && self.markupAddons.toUpperCase() === 'YES')
      {
          DataService.get('api/wt/aswtheader/wtrecalcaddons/' + base.wthdr.wtno + '/' + base.wthdr.wtsuf, { busy: true }, function (data) {
              base.getWthdr(self.updateWthdrRecalcAddonsCallback);
          });
          MessageService.info('global.info', 'message.save.operation.completed.successfully');
      } else {
          MessageService.info('global.info', 'message.save.operation.completed.successfully');
      }
   };

   self.updateWthdrRecalcAddonsCallback = function () {
       self.isIncludeAddonsWhenPostingGL = self.sasc.icincaddgl && !base.wthdr.markupaddonfl;
   };

   self.capitalAddonChange = function () {
      if (base.wthdr.addontype1 === self.ADDON_TYPE_DOLLAR) {
         base.wthdr.addonnet1 = base.wthdr.addonamt1;
      } else if (base.wthdr.addontype1 === self.ADDON_TYPE_PERCENTAGE) {
         var calculatedNet = base.wthdr.totlineamt * (base.wthdr.addonamt1 / 100);
         base.wthdr.addonnet1 = parseFloat(calculatedNet.toFixed(2));
      } else {
         base.wthdr.addonnet1 = base.wthdr.nolineitem * base.wthdr.addonamt1;
      }
   };

   self.expenseAddonChange = function () {
      if (base.wthdr.addontype2 === self.ADDON_TYPE_DOLLAR) {
         base.wthdr.addonnet2 = base.wthdr.addonamt2;
      } else if (base.wthdr.addontype2 === self.ADDON_TYPE_PERCENTAGE) {
         var calculatedNet = base.wthdr.totlineamt * (base.wthdr.addonamt2 / 100);
         base.wthdr.addonnet2 = parseFloat(calculatedNet.toFixed(2));
      } else {
         base.wthdr.addonnet2 = base.wthdr.nolineitem * base.wthdr.addonamt2;
      }
   };
});