'use strict';

app.controller('IceanUpdateWhseProdCtrl', function ($scope, $stateParams, DataService) {
   var self = this;

   self.iceanMaintInventorySingle = {};
   self.canUpdateLastCost = false;

   self.icenhRowId = $stateParams.icenhRowid;
   self.iceanMaintRetrieveSingle = $stateParams.iceanMaintRetrieveSingle;
   self.iceanTransactionsResult = $stateParams.iceanTransactionsResult;

   var criteria = { icenhRowid: self.icenhRowId, qty: self.iceanMaintRetrieveSingle.qty, total: self.iceanMaintRetrieveSingle.total };
   DataService.post('api/ic/asicentry/iceanmaintenanceinventory', { data: criteria, busy: true }, function (data) {
      self.iceanMaintInventorySingle = data;
   });

   self.submit = function () {
      var returnData = { canUpdateLastCost: self.canUpdateLastCost, newlastcost: self.iceanMaintRetrieveSingle.newlastcost };
      var callbackFn = $scope.awc[$stateParams.okCallback];
      callbackFn(returnData);
   };

   self.cancel = function () {
      var callbackFn = $scope.awc[$stateParams.cancelCallback];
      callbackFn();
   };
});