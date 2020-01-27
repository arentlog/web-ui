'use strict';

/**
 * Control for displaying the DNBi information about a customer (shared by ARIC DNBI tab and other functions).
 *
 * Alias: custdnbi
 */
app.controller('CustomerInquiryDNBiCtrl', function ($scope, DataService, Utils, MessageService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.isUpdateEnable = false;
   self.isReadonly = true;
   self.orderno = 0;
   self.ordersuf = 0;

   if (options.ordernoModel) {
      self.orderno = Utils.getNestedValue($scope, options.ordernoModel);
   }

   if (options.ordersufModel) {
      self.ordersuf = Utils.getNestedValue($scope, options.ordersufModel);
   }

   self.dnbiEnable = function () {
      var params = {
         dCustNo: self.arsc.custno
      };
      self.isUpdateEnable = DataService.getResource('api/ar/asarsetup/dnbienabled/{dCustNo}', { pathParams: params, busy: true });
   };

   if (options.arscModel) {
      self.arsc = Utils.getNestedValue($scope, options.arscModel);
      if (self.arsc) {
         // If arsc is a promise object that is not yet resolved, then wait until it resolves
         if (self.arsc.$resolved === false) {
            self.arsc.$promise.then(function () {
               self.dnbiEnable();
            });
         } else {
            self.dnbiEnable();
         }
      }
   } else if (options.arscFunction) {
      var arscFunctionRef = options.arscFunction;

      // Remove invoke parenthesis if present since we simply want to get the reference to the function
      arscFunctionRef = arscFunctionRef.replace('()', '');

      // Get function
      var getCustomerFn = Utils.getNestedValue($scope, arscFunctionRef);

      getCustomerFn(function (arsc) {
         if (arsc) {
            self.arsc = arsc;
            self.dnbiEnable();
         }
      });
   }

   self.updateDnbi = function () {
      var request = {
         requesttype: 'matchCompany',
         custno: self.arsc.custno,
         orderno: self.orderno,
         ordersuf: self.ordersuf,
         userfield: ''
      };
      DataService.post('api/ar/asarsetup/dnbilaunch', { data: request, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            //Refresh Arsc after save operation
            var params = {
               custno: self.arsc.custno
            };
            self.arsc = DataService.getResource('api/ar/arsc/getbypk', { params: params, busy: true });
         }
      });
   };

   // Notify that the controller is now ready
   customCtrl.ready(self);
});
