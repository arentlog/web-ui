'use strict';

app.controller('OrderEntryOneTimeCostCtrl', function ($scope, $state, $stateParams, Utils, DataService, MessageService) {
   //alias => oeOtc
   var self = this;

   self.isInquiry = $stateParams.isInquiry;
   self.oeline = $stateParams.oeline;

   var oneTimeInit = {
      oeline: self.oeline,
      lInInquiry: self.isInquiry
   };
   DataService.post('api/oe/asoelineextra/oeonetimecostinit', { data: oneTimeInit, busy: true }, function (data) {
      if (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            self.oneTimeCost = data.oeonetimecost;
            if (!self.isInquiry && !self.oneTimeCost.contrstartdt) {
               self.oneTimeCost.contrstartdt = Utils.getCurrentDate();
            }
         } else {
            $stateParams.cancelCallback();
         }
      }
   });

   self.contractDateChanged = function () {
      if (self.oneTimeCost.contrenddt < self.oneTimeCost.contrstartdt) {
         MessageService.error('global.error', 'message.end.date.must.come.after.start.date');

         self.oneTimeCost.contrenddt = self.oneTimeCost.contrstartdt;
      }
   };

   self.contractNoChanged = function () {
      var changeRequest = {
         oeonetimecost: self.oneTimeCost,
         pvFilename: 'contractno'
      };
      DataService.post('api/oe/asoelineextra/oeonetimecostleavefield', { data: changeRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.oneTimeCost = data.oeonetimecost;
            }
         }
      });
   };

   self.okClicked = function () {
      if (!self.isInquiry) {
         var updateRequest = {
            oeline: self.oeline,
            oeonetimecost: self.oneTimeCost
         };
         DataService.post('api/oe/asoelineextra/oeonetimecostupdt', { data: updateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  if ($stateParams.okCallback) {
                     $stateParams.okCallback(data.oeline);
                  }
               }
            }
         });
      } else {
         if ($stateParams.okCallback) {
            $stateParams.okCallback();
         }
      }
   };

   self.cancelClicked = function () {
      if ($stateParams.cancelCallback) {
         $stateParams.cancelCallback();
      }
   };
});