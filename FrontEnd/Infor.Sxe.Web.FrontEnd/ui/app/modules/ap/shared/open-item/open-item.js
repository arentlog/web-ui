'use strict';

app.controller('ApOpenItemCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var apetrowid;
   var tmpOpenItem = { apetrowid: $stateParams.apemtRecord.apetRowid };

   if ($stateParams) {
      self.subTitle = MessageService.get('global.invoice.number') + ' ' + $stateParams.apemtRecord.invoiceno;
   }
   
   DataService.post('api/ap/asapentry/apentryeditmaintload', { data: tmpOpenItem, busy: true }, function (data) {
      self.openItem = data;
   });

   self.cancel = function () {
      $state.go('^.master');
   };

   self.dueDateChanged = function () {
      self.openItem.duedatedays = Utils.getDateDayDifference(self.openItem.duedate, self.openItem.invoicedate);
   };

   self.dueDaysChanged = function () {
      self.openItem.duedate = Utils.addSubtractDaysToDate(self.openItem.invoicedate, self.openItem.duedatedays);
   };

   self.discDateChanged = function () {
      self.openItem.discdatedays = Utils.getDateDayDifference(self.openItem.discdate, self.openItem.invoicedate);
   };

   self.discDaysChanged = function () {
      self.openItem.discdate = Utils.addSubtractDaysToDate(self.openItem.invoicedate, self.openItem.discdatedays);
   };

   self.discPercentChanged = function () {
      self.openItem.discountamount = self.openItem.schedulepayment * self.openItem.discountperc / 100;
   };

   self.discAmountChanged = function () {
      self.openItem.discountperc = self.openItem.discountamount * 100 / self.openItem.schedulepayment;
   };

   self.submit = function () {
      var apEntryEditMaintSaveRequest = {
         apeemaint: {
            invoiceno: self.openItem.invoiceno,
            schedulepayment: self.openItem.schedulepayment,
            currencyty: self.openItem.currencyty,
            invoicedate: self.openItem.invoicedate,
            postdate: self.openItem.postdate,
            disputefl: self.openItem.disputefl,
            invoicetype: self.openItem.invoicetype,
            duedate: self.openItem.duedate,
            duedatedays: self.openItem.duedatedays,
            discdate: self.openItem.discdate,
            discdatedays: self.openItem.discdatedays,
            discountperc: self.openItem.discountperc,
            discountamount: self.openItem.discountamount,
            refer: self.openItem.refer,
            apetrowid: self.openItem.apetrowid,
            transcd: self.openItem.transcd,
            userfield: self.openItem.userfield
         },
         cReportNm: ''
      };

      DataService.post('api/ap/asapentry/apentryeditmaintsave', { data: apEntryEditMaintSaveRequest, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true });
      });
   };
});