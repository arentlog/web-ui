'use strict';

/**
 * Control for displaying Nonstock Cost Calculator.
 */
app.controller('NonStockCostCalcCtrl', function ($scope, $translate, Utils) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();

   self.calcCostLabel = null;
   self.prodCostLabel = null;
   self.calcCost = null;
   self.calcCostCallback = Utils.getNestedValue($scope, options.calcCostCallback.replace('()', ''));
   self.calcCostMode = options.calcModeModel;

   $scope.$watch(options.vendorNumberModel, function (newValue) {
      self.vendNo = newValue;
   });
   $scope.$watch(options.vendorNameModel, function (newValue) {
      self.vendorName = newValue;
   });
   $scope.$watch(options.productCostModel, function (newValue) {
      self.prodCost = newValue;
   });
   $scope.$watch(options.exchangeRateModel, function (newValue) {
      self.exchangeRate = newValue;
   });
   $scope.$watch(options.currencyCodeModel, function (newValue) {
      self.currencyCode = newValue;
   });

   if (self.calcCostMode === 'global.purchase.order') {
      self.calcCostLabel = $translate.instant('global.vendor.domestic.price');
      self.prodCostLabel = $translate.instant('global.foreign.price');
   } else {
      self.calcCostLabel = $translate.instant('global.calculated.cost');
      self.prodCostLabel = $translate.instant('global.product.cost');
   }

   if (options.calcCostModel) {
      self.calcCost = function (newValue) {
         if (arguments.length) {
            //Utilizing the setNextedValue because it is good about handling complex objects
            Utils.setNestedValue($scope, options.calcCostModel, newValue);
         } else {
            return Utils.getNestedValue($scope, options.calcCostModel);
         }
      };
   }

   self.calcCostChanged = function () {
      if (self.calcCostMode === 'global.purchase.order') {
         Utils.setNestedValue($scope, options.productCostModel, self.calcCost() / self.exchangeRate);
      } else {
         Utils.setNestedValue($scope, options.productCostModel, self.calcCost() * self.exchangeRate);
      }
      if (self.calcCostCallback) {
         self.calcCostCallback(self.calcCost());
      }
   };

   // Notify that the controller is now ready
   customCtrl.ready(self);
});