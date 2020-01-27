'use strict';

app.controller('OrderEntryOneTimeRebateCtrl', function ($scope, $state, $stateParams, Utils, DataService, MessageService) {
   //alias => oeOtr
   var self = this;

   self.isInquiry = $stateParams.isInquiry;
   self.oeline = $stateParams.oeline;

   DataService.post('api/oe/asoelineextra/oeonetimerebateinit', { data: self.oeline, busy: true }, function (data) {
      if (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            self.oneTimeRebate = data.oeonetimerebate;
            self.oneTimeRebate.newrebamt = self.oneTimeRebate.prodcost - self.oneTimeRebate.newrebcst;
         }
      }
   });

   self.newRebateCostChanged = function () {
      self.oneTimeRebate.newrebamt = self.oneTimeRebate.prodcost - self.oneTimeRebate.newrebcst;
   };

   self.vendorChanged = function () {
      var fieldChanged = {
         fieldname: 'vendno',
         vendno: self.oneTimeRebate.vendno
      };
      var leaveRequest = {
         oeonetimerebate: self.oneTimeRebate,
         oeonetimerebleavefield: fieldChanged
      };
      DataService.post('api/oe/asoelineextra/oeonetimerebleavefield', { data: leaveRequest, busy: true }, function (data) {
         if (data) {
            self.oneTimeRebate = data;
         }
      });
   };

   self.costTypeChanged = function () {
      var fieldChanged = {
         fieldname: 'costtype',
         costtype: self.oneTimeRebate.costtype
      };
      var leaveRequest = {
         oeonetimerebate: self.oneTimeRebate,
         oeonetimerebleavefield: fieldChanged
      };
      DataService.post('api/oe/asoelineextra/oeonetimerebleavefield', { data: leaveRequest, busy: true }, function (data) {
         if (data) {
            self.oneTimeRebate = data;
            self.oneTimeRebate.newrebamt = self.oneTimeRebate.prodcost - self.oneTimeRebate.newrebcst;
         }
      });
   };

   self.okClicked = function () {
      if (!self.isInquiry) {
         var updateRequest = {
            oeline: self.oeline,
            oeonetimerebate: self.oneTimeRebate
         };
         DataService.post('api/oe/asoelineextra/oeonetimerebateupdt', { data: updateRequest, busy: true }, function (data) {
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