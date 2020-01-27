'use-strict';

app.controller('OeAddonsCtrl', function ($state, $scope, $stateParams, DataService) {
   var self = this;
   var dtl = $scope.dtl;

   self.addons = null;
   self.total = 0;

   dtl.oeeh.$promise.then(function () {
      var params = {
         iOrderNo: dtl.oeeh.orderno,
         iOrderSuf: dtl.oeeh.ordersuf,
         lInquiryMode: true
      };
      DataService.get('api/oe/asoeinquiry/loadorderaddons/{iOrderNo}/{iOrderSuf}/{lInquiryMode}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            var addonsList = [];
            data.forEach(function (addon) {
               if (dtl.oeeh.transtype.toLowerCase() === 'rm') {
                  addon.addonamt = addon.addonamt * -1;
                  addon.addonnet = addon.addonnet * -1;
               }
               addonsList.push(addon);
               self.addons = addonsList;
               self.total = Number(self.total) + Number(addon.addonnet);
            });
         }
      });
   });
});