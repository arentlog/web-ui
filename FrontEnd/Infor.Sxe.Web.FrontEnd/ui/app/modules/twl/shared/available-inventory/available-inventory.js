'use   strict';

/*   TWL   Control   for   displaying   available   inventory   for   a   product
         Used   in   twlci   and   twlooi
*/


//Inquiry   -   Item   Quantity   Available
app.controller('TwlAvailableInventoryCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   if (!$stateParams.coNum) {
      self.returnToDetail();
   } else {

      self.criteria =
         {
            coNum: $stateParams.coNum,
            whNum: $stateParams.whNum,
            absNum: $stateParams.absNum,
            itemDesc: $stateParams.itemDesc
         };

      DataService.post('api/twl/astwlinquiry/getitemavaildetail', { data: self.criteria, busy: true }, function (data) {
         if (data.itemavail) {
            self.dataset = data.itemavail;
         }
         if (data.itemavailprime) {
            self.fullCase = data.itemavailprime.fullCase;
            self.fcQty = data.itemavailprime.fcQty;
            self.splitCase = data.itemavailprime.splitCase;
            self.scQty = data.itemavailprime.scQty;
            self.counter = data.itemavailprime.counter;
            self.counterQty = data.itemavailprime.counterQty;
            self.pallet = data.itemavailprime.pallet;
            self.palletQty = data.itemavailprime.palletQty;
         }
      });
   }

   self.getSubTitle = function () {
      return self.criteria.whNum + '   |   ' + self.criteria.absNum;
   };

   self.isItemInqAvail = function () {
      return $state.current.name.endsWith('.availableinventory');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };
});