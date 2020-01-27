'use-strict';

/**
 * Control for displaying WL Cartons (grid)
 */
app.controller('WlCartonsCtrl', function ($scope, $state, Utils, DataService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   var ordertype = options.ordertypeModel;
   var orderno = Utils.getNestedValue($scope, options.ordernoModel);
   var ordersuf = Utils.getNestedValue($scope, options.ordersufModel);
   var whse = Utils.getNestedValue($scope, options.whseModel);
   var seqno = 0;

   if (options.seqnoModel) {
      seqno = Utils.getNestedValue($scope, options.seqnoModel);
   }

   // Load Credit Card List
   var criteria = {
      whse: whse,
      orderno: orderno,
      ordersuf: ordersuf,
      seqno: seqno,
      ordertype: ordertype,
      customparam: ''
   };

   DataService.post('api/wl/aswlinquiry/loadwlcartons', { data: criteria, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
      }
   });

   // Notify that the controller is now ready
   customCtrl.ready(self);
});