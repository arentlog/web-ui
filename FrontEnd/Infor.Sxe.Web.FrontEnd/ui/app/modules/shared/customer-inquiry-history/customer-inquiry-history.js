'use strict';

/**
 * Control for displaying the payments information about a customer (shared by ARIC period balance history tab and other functions).
 *
 * Alias: custhist
 */
app.controller('CustomerInquiryHistoryCtrl', function ($scope, DataService, Utils, Sasc, MessageService) {
   var self = this;
   self.salestatus = '';
   self.statusDescList = [
      '',
      MessageService.get('global.yes'),
      MessageService.get('global.no'),
      MessageService.get('global.cash'),
      MessageService.get('global.cod.only'),
      MessageService.get('global.hold'),
      MessageService.get('global.open')
   ];
   self.statusValList = ['', 'Y', 'N', 'C', 'D', 'H', 'O'];
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.groupid = '';
   self.arspdisplaytotalsresults = [];

   if (options.groupidModel) {
      $scope.$watch(options.groupidModel, function (newValue) {
         self.groupid = newValue;
         if (self.groupid) {
            self.boundData();
         }
      });
   }

   self.displaycriteria = {
      custno: 0,
      groupid: '',
      customparam: '',
      userfield: ''
   };

   self.pmtcriteria = {
      custno: 0,
      groupid: '',
      userfield: ''
   };

   self.bindAvgRow = function () {
      var averageRow = [];
      var period1Sum = 0;
      var period2Sum = 0;
      var period3Sum = 0;
      var period4Sum = 0;
      var period5Sum = 0;
      var serviceSum = 0;
      var totalSum = 0;
      var creditSum = 0;

      self.arspdisplaytotalsresults.forEach(function (disprest) {
         period1Sum = Number(period1Sum) + Number(disprest.column1value);
         period2Sum = Number(period2Sum) + Number(disprest.column2value);
         period3Sum = Number(period3Sum) + Number(disprest.column3value);
         period4Sum = Number(period4Sum) + Number(disprest.column4value);
         period5Sum = Number(period5Sum) + Number(disprest.column5value);
         serviceSum = Number(serviceSum) + Number(disprest.column8value);
         totalSum = Number(totalSum) + Number(disprest.column7value);
         creditSum = Number(creditSum) + Number(disprest.column6value);
      });

      var period1Count = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column1value !== 0); });
      var period2Count = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column2value !== 0); });
      var period3Count = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column3value !== 0); });
      var period4Count = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column4value !== 0); });
      var period5Count = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column5value !== 0); });
      var serviceCount = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column8value !== 0); });
      var totalCount = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column7value !== 0); });
      var creditCount = JSLINQ(self.arspdisplaytotalsresults).Count(function (item) { return (item.column6value !== 0); });

      averageRow.seqno = MessageService.get('global.avg');
      averageRow.column1value = (period1Count !== 0) ? (period1Sum < 0) ? (Math.round(Math.abs(period1Sum) / period1Count)) * -1 : Math.round(period1Sum / period1Count) : 0;
      averageRow.column2value = (period2Count !== 0) ? (period2Sum < 0) ? (Math.round(Math.abs(period2Sum) / period2Count)) * -1 : Math.round(period2Sum / period2Count) : 0;
      averageRow.column3value = (period3Count !== 0) ? (period3Sum < 0) ? (Math.round(Math.abs(period3Sum) / period3Count)) * -1 : Math.round(period3Sum / period3Count) : 0;
      averageRow.column4value = (period4Count !== 0) ? (period4Sum < 0) ? (Math.round(Math.abs(period4Sum) / period4Count)) * -1 : Math.round(period4Sum / period4Count) : 0;
      averageRow.column5value = (period5Count !== 0) ? (period5Sum < 0) ? (Math.round(Math.abs(period5Sum) / period5Count)) * -1 : Math.round(period5Sum / period5Count) : 0;
      averageRow.column6value = (creditCount !== 0) ? (creditSum < 0) ? (Math.round(Math.abs(creditSum) / creditCount)) * -1 : Math.round(creditSum / creditCount) : 0;
      averageRow.column8value = (serviceCount !== 0) ? (serviceSum < 0) ? (Math.round(Math.abs(serviceSum) / serviceCount)) * -1 : Math.round(serviceSum / serviceCount) : 0;
      averageRow.column7value = (totalCount !== 0) ? (totalSum < 0) ? (Math.round(Math.abs(totalSum) / totalCount)) * -1 : Math.round(totalSum / totalCount) : 0;
      self.arspdisplaytotalsresults.push(averageRow);
   };

   self.arspdisplaytotals = function () {
      DataService.post('api/ar/asarinquiry/arspdisplaytotals', { data: self.displaycriteria, busy: true }, function (data) {
         self.arspdisplaytotalsresults = [];
         if (data) {
            data.forEach(function (totalresult) {
               var paytotal = {
                  seqno: totalresult.seqno.toString(),
                  column1value: totalresult.column1value,
                  column2value: totalresult.column2value,
                  column3value: totalresult.column3value,
                  column4value: totalresult.column4value,
                  column5value: totalresult.column5value
               };
               if (Sasc.arrollcd.toUpperCase() === 'B') {
                  paytotal.column7value = totalresult.column6value;
                  paytotal.column6value = 0;
                  paytotal.column8value = 0;
               } else if (Sasc.arrollcd.toUpperCase() === 'M') {
                  paytotal.column8value = totalresult.column6value;
                  paytotal.column7value = totalresult.column7value;
                  paytotal.column6value = 0;
               } else if (Sasc.arrollcd.toUpperCase() === 'S') {
                  paytotal.column6value = totalresult.column6value;
                  paytotal.column7value = totalresult.column7value;
                  paytotal.column8value = 0;
               } else {
                  paytotal.column8value = totalresult.column6value;
                  paytotal.column6value = totalresult.column7value;
                  paytotal.column7value = totalresult.column8value;
               }
               self.arspdisplaytotalsresults.push(paytotal);
            });
            self.bindAvgRow();
         }
      });
   };

   self.custpaymentsdisplay = function () {
      DataService.post('api/ar/asarinquiry/custpaymentsdisplay', { data: self.pmtcriteria, busy: true }, function (data) {
         if (data) {
            self.ptm = data;
         }
      });
   };

   self.boundData = function () {
      if (self.arsc.selltype) {
         var statusIndex = self.statusValList.indexOf(self.arsc.selltype.toUpperCase());
         if (statusIndex < 1) {
            self.salestatus = MessageService.get('global.unknown') + self.arsc.selltype.toUpperCase();
         }
         else {
            self.salestatus = self.statusDescList[statusIndex] + ((statusIndex > 3 && self.arsc.statusdt) ? MessageService.get('global.until') + self.arsc.statusdt : '');
         }
      }
      self.displaycriteria.custno = self.arsc.custno;
      self.pmtcriteria.custno = self.arsc.custno;
      if (self.groupid) {
         self.displaycriteria.groupid = self.groupid;
         self.pmtcriteria.groupid = self.groupid;
      }
      self.arspdisplaytotals();
      self.custpaymentsdisplay();
   };

   if (options.arscModel) {
      self.arsc = Utils.getNestedValue($scope, options.arscModel);
      if (self.arsc) {
         self.custno = self.arsc.custno;
         if (self.custno) {
            self.boundData();
         }
      }
   } else if (options.arscFunction) {
      var arscFunctionRef = options.arscFunction;

      // Remove invoke parenthesis if present since we simply want to get the reference to the function
      arscFunctionRef = arscFunctionRef.replace('()', '');

      // Get function
      var getCustomerFn = Utils.getNestedValue($scope, arscFunctionRef);

      getCustomerFn(function (arsc) {
         if (arsc) {
            self.arsc = arsc;
            self.custno = arsc.custno;
            self.boundData();
         }
      });
   }

   // Notify that the controller is now ready
   customCtrl.ready(self);
});
