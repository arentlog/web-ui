'use-strict';

/**
 * Control for displaying Lots grid (inquiry only)
 */
app.controller('LotsInquiryCtrl', function ($scope, $state, Utils, DataService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   var ordertype = options.ordertypeModel;
   var orderno = Utils.getNestedValue($scope, options.ordernoModel);
   var ordersuf = Utils.getNestedValue($scope, options.ordersufModel);
   var lineno = Utils.getNestedValue($scope, options.linenoModel);
   var seqno = 0;

   if (options.seqnoModel) {
      seqno = Utils.getNestedValue($scope, options.seqnoModel);
   }

   // Load Lots List
   var criteria = {
      ordertype: ordertype,
      orderno: orderno,
      ordersuf: ordersuf,
      lineno: lineno,
      seqno: seqno
   };

   DataService.post('api/ic/asicinquiry/createlotstt', { data: criteria, busy: true }, function (data) {
      if (data) {
         self.lotsTransactions = data;

         if (data.length) {
            self.isRFCutEnable = data[0].lotcutenabledfl;

            if (self.isRFCutEnable) {
               getOrderLotCutData();
            }
         }
      }
   });

   // Notify that the controller is now ready
   customCtrl.ready(self);

   /* Private methods */

   /**
    * Load Lot Cut grid
    */
   function getOrderLotCutData() {
      var VAIF_ORDERTYPE_F = 'F';
      var VAIF_ORDERTYPE_V = 'V';

      var cutCriteria = {
         orderno: orderno,
         ordersuf: ordersuf,
         ordertype: ordertype.toUpperCase() === VAIF_ORDERTYPE_F ? VAIF_ORDERTYPE_V : ordertype,
         lineno: lineno,
         ordseqno: ordertype.toUpperCase() === VAIF_ORDERTYPE_F ? seqno : 0,
         statustype: ''
      };

      DataService.post('api/ic/asicinquiry/getorderlotcutdata', { data: cutCriteria, busy: true }, function (data) {
         if (data) {
            self.icCutEntryLotsList = data;
         }
      });
   }
});