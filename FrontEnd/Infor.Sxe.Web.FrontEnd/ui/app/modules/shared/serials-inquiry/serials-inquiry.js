'use-strict';

/**
 * Control for displaying Serials grid (inquiry only)
 */
app.controller('SerialsInquiryCtrl', function ($scope, $state, Utils, DataService, Sasoo) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   var ordertype = options.ordertypeModel;
   var orderno = Utils.getNestedValue($scope, options.ordernoModel);
   var ordersuf = Utils.getNestedValue($scope, options.ordersufModel);
   var lineno = Utils.getNestedValue($scope, options.linenoModel);
   var seqno = 0;

   self.sasoo = Sasoo;

   self.isCostVisible = function () {
      return self.sasoo.seecostfl;
   };

   if (options.seqnoModel) {
      seqno = Utils.getNestedValue($scope, options.seqnoModel);
   }

   // Load Serials List
   var params = {
      ordertype: ordertype,
      orderno: orderno,
      ordersuf: ordersuf,
      lineno: lineno,
      seqno: seqno
   };
   DataService.get('api/ic/icets/listbyorder', { params: params, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
      }
   });

   // Notify that the controller is now ready
   customCtrl.ready(self);
});