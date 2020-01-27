'use-strict';
/**
 * Control for displaying PO Addons data.  Used in POIP Totals and Addons tabs.
 * Alias: paac
 */
app.controller('PoAdditionalAddonsCtrl', function ($scope, Utils, DataService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.addtaddons = [];
   self.purchaseOrderNumber = 0;
   self.purchaseOrderSuffix = 0;
   self.lineNumber = 0;

   if (options.purchaseOrderNumberModel) {
      self.purchaseOrderNumber = Utils.getNestedValue($scope, options.purchaseOrderNumberModel);
   }

   if (options.purchaseOrderSuffixModel) {
      self.purchaseOrderSuffix = Utils.getNestedValue($scope, options.purchaseOrderSuffixModel);
   }

   if (options.lineNumberModel) {
      self.lineNumber = Utils.getNestedValue($scope, options.lineNumberModel);
   }

   self.initialize = function () {
      var poaddonsCriteria = {
         pono: self.purchaseOrderNumber,
         posuf: self.purchaseOrderSuffix,
         lineno: self.lineNumber,
         ordertype: 'po'
      };
      DataService.post('api/po/aspoinquiry/loadpoaddons', { data: poaddonsCriteria, busy: true }, function (data) {
         if (data) {
            self.addtaddons = data.loadpoaddonsresults;
         }
      });
   };

   self.initialize();
   // Notify that the controller is now ready
   customCtrl.ready(self);
});