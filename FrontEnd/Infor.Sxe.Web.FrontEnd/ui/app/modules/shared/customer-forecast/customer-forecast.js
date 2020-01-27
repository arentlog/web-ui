'use strict';

app.controller('CustomerForecastCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.stateParams = $stateParams;
   self.reportno = $stateParams.reportno;
   self.criteria = {
      product: $stateParams.prod,
      whse: $stateParams.whse,
      unit: $stateParams.unit,
      statuscd: 'a',
      setuptype: 'f'
   };

   if (self.criteria && self.criteria.product && self.criteria.whse) {
      DataService.post('api/ic/asicsetup/icspclookup', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.icspclookupresults;
         }
      });
   }
});