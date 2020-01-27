'use strict';

app.controller('WarehouseAvailabilityCtrl', function ($scope, $state, $stateParams, DataService, Sasoo) {
   var self = this;
   var base = $scope.base;

   self.whseAvailCriteria = { surplusonlyfl: false, whsetype: 's', cono: Sasoo.cono, whse: base.criteria.whse, prod: base.criteria.prod, custno: base.criteria.custno, shipto: base.criteria.shipto };

   if (!self.whseAvailCriteria.unit) {
      var params = {
         prod: base.criteria.prod,
         fillmode: false
      };
      DataService.get('api/ic/icsp/getbypk/', { params: params, busy: true }, function (data) {
         if (data) {
            self.whseAvailCriteria.unit = data.unitstock;
            self.getWarehouseAvailability();
         }
      });
   }
   self.getWarehouseAvailability = function () {
      if (self.whseAvailCriteria) {
         DataService.post('api/ic/asicinquiry/icwhseavail', { data: self.whseAvailCriteria, busy: true }, function (data) {
            if (data) {
               self.whseAvailCollection = data;
            }
         });
      }
   };

   self.whseAvailFilter = function () {
      self.getWarehouseAvailability();
   };

   self.customerNavigate = function (e, args) {
      var currentRow = args[0].item;
      $state.go('aric.detail', { pk: currentRow.custno });
   };

});