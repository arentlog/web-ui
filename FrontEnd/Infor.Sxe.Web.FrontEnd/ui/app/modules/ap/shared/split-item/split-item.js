'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('apee.splitPayRecords', {
      url: '/split-pay-records',
      params: { apemtRecord: null, splitPays: null, splitPayRowId: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/shared/split-item/split-pay-records.json');
            },
            controller: 'ApSplitPayRecordsCtrl as sprc'
         }
      }
   });
});

app.controller('ApSplitPayCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   self.apemtRecord = $stateParams.apemtRecord;
   self.isEnableDays = $stateParams.isEnableDays;

   if (self.apemtRecord) {
      self.subTitle = MessageService.get('global.invoice.number') + ' ' + self.apemtRecord.invoiceno;
   }
   //default values
   self.payments = 2;
   self.days = 30;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.save = function () {
      var splitPayLoadRequest = {
         apeesplitpayrowids: {
            apetRowid: self.apemtRecord.apetRowid,
            sapbvrowid: self.apemtRecord.sapbvRowid,
         },
         iPayments: self.payments,
         iDays: self.days
      };

      DataService.post('api/ap/asapentry/apentryeditsplitpayload', { data: splitPayLoadRequest, busy: true }, function (data) {
         $state.go('^.splitPayRecords', { apemtRecord: self.apemtRecord, splitPays: data, splitPayRowId: $stateParams.splitPayRowId });
      });
   };
});

app.controller('ApSplitPayRecordsCtrl', function ($state, $stateParams, DataService, MessageService) {

   //self.apemtRecord = $stateParams.apemtRecord;

   var self = this;
   self.amountProof = 0;
   self.discountProof = 0;

   if ($stateParams.apemtRecord) {
      //default values
      self.totalAmount = $stateParams.apemtRecord.amount;
      self.totalDiscount = $stateParams.apemtRecord.disc;

      self.subTitle = MessageService.get('global.invoice.number') + ' ' + $stateParams.apemtRecord.invoiceno;
   }

   self.splitPays = $stateParams.splitPays;
   self.totalAmount = $stateParams.apemtRecord.amount;
   self.totalDiscount = $stateParams.apemtRecord.disc;
   self.invoiceno = $stateParams.apemtRecord.apinvno;

   self.splitPaymentEdit = function (sender, args) {
      var amountSum = Number(0);
      var discountSum = Number(0);
      self.splitPays.forEach(function (splitPay) {
         amountSum = Number(amountSum) + Number(splitPay.amount);
         discountSum = Number(discountSum) + Number(splitPay.discount);
         self.amountProof = Number(self.totalAmount) - amountSum;
         self.discountProof = Number(self.totalDiscount) - discountSum;
      });
   };

   self.cancel = function () {
      $state.go('^.master');
   };

   self.save = function () {
      var apeesplitpayrowids = {
         apetRowid: $stateParams.apemtRecord.apetRowid,
         sapbvrowid: $stateParams.apemtRecord.sapbvRowid,
      };
      //TODO Netsetd call
      var splitPayValidateRequest = { apeesplitpayrowids: apeesplitpayrowids, apeesplitpay: $stateParams.splitPays };

      DataService.post('api/ap/asapentry/apentryeditsplitpayvalidate', { data: splitPayValidateRequest, busy: true }, function () {
         var splitPayUpdateRequest = { apeesplitpayrowids: apeesplitpayrowids, apeesplitpay: $stateParams.splitPays };

         DataService.post('api/ap/asapentry/apentryeditsplitpayupdate', { data: splitPayUpdateRequest, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         });
      });
   };
});