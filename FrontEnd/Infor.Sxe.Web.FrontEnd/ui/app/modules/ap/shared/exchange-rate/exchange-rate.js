'use strict';

app.controller('ApExchangeRateCtrl', function ($scope, $state, $stateParams, DataService, Utils) {
   var self = this;
   var callbackFn = Utils.getNestedValue($scope, $stateParams.callback);

   /**
    *  Cancel or back button clicked
    */
   self.cancel = function () {
      // Invoke the callback from parent component
      callbackFn(false);

      $state.go('^');
   };

   /**
    * OK button clicked
    */
   self.submit = function () {
      var params = {
         cCurrencyty: $stateParams.currencyty,
         lUpdate: self.isUpdateRate,
         dVouchexrate: self.exchangeRate || 0
      };

      DataService.getResource('api/ap/asapentry/apexchangerateupdate/{cCurrencyty}/{lUpdate}/{dVouchexrate}',
         { pathParams: params, busy: true }, function () {

            // Invoke the callback from parent component
            callbackFn(true);

            $state.go('^');
         });
   };

   // Load the current exchange rate for this currency
   if ($stateParams.currencyty) {
      var params = {
         currencyty: $stateParams.currencyty,
         fldlist: 'vouchexrate,descrip'
      };

      DataService.getResource('api/sa/sastc/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.exchangeRate = data.vouchexrate;
            self.currencyDescrip = data.descrip;
            self.isUpdateRate = false;
         }
      });
   }
});