'use strict';

app.controller('ArExchangeRateCtrl', function ($scope, $state, $stateParams, DataService, Utils) {
   var self = this;

   self.exchangeRateDetails = $stateParams.exchangeRateUpdateRequest.arexchrate;

   self.submit = function () {
      self.exchangeRateUpdate(true);
   };

   self.exchangeRateUpdate = function (continuefl) {
      self.exchangeRateDetails.continuefl = continuefl;

      DataService.post('api/ar/asarentry/arexchrateupdate', { data: $stateParams.exchangeRateUpdateRequest, busy: true }, function (data) {
         if (data) {
            var callbackFn = Utils.getNestedValue($scope, $stateParams.callback);

            // Invoke the callback from parent component
            callbackFn(data, continuefl);

            $state.go('^');
         }
      });
   };

   self.cancel = function () {
      self.exchangeRateUpdate(false);
   };
});