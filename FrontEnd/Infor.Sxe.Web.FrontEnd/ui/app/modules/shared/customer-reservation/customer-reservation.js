'use strict';

app.controller('CustomerReservationCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteriaCustno = "0";
   var criteriaShipTo = "";

   if ($stateParams.custno) {
      criteriaCustno = $stateParams.custno;
   }

   if ($stateParams.shipto) {
      criteriaShipTo = $stateParams.shipto;
   }
   
   self.criteria = {
      product: $stateParams.prod,
      whse: $stateParams.whse,
      statuscd: 'a',
      custno: criteriaCustno,
      shipto: criteriaShipTo,
      contractno: ''
   };

   if (self.criteria && self.criteria.product && self.criteria.whse) {
      DataService.post('api/ic/asicsetup/icspclookup', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.icspclookupresults;
         }
      });
   }
   
   self.search = function () {    
      DataService.post('api/ic/asicsetup/icspclookup', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.icspclookupresults;
         }
      });
   };

   self.cancel = function () {
      $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
   };
});