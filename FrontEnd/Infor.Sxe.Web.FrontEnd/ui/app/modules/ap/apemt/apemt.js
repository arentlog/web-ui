'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ap', 'apemt', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ap', 'apemt');

   $stateProvider.state('apemt.openItem', {
      url: '/open-item',
      params: {
         rowId: null,
         disputeFlag: null,
         jrnlno: null,
         setno: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apemt/open-item.json');
            },
            controller: 'ApemtOpenItemCtrl as oic'
         }
      }
   });

   $stateProvider.state('apemt.splitPay', {
      url: '/split-pay',
      params: { apemtRecord: null, splitPayRowId: null, isEnableDays: true },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apemt/split-pay.json');
            },
            controller: 'ApemtSplitPayCtrl as spc'
         }
      }
   });

   $stateProvider.state('apemt.splitPayRecords', {
      url: '/split-pay-records',
      params: { apemtRecord: null, splitPays: null, splitPayRowId: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apemt/split-pay-records.json');
            },
            controller: 'ApemtSplitPayRecordsCtrl as sprc'
         }
      }
   });
});

app.controller('ApemtBaseCtrl', function ($state, DataService, MessageService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('apemt.master');
   };

   self.includesMaster = function () {
      return $state.includes('apemt.master');
   };

   self.search = function () {
      DataService.post('api/ap/asapsetup/apemtretrieve', { data: self.criteria, busy: true }, function (data) {
         self.apemtresults = data.apemtresults;
         if (data.messaging) {
            MessageService.errorMessages(data.messaging);
         }
      });
   };
});

app.controller('ApemtSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   criteria.type = '0';

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.type = '0';
   };

   self.submit = function () {
      base.search();
      if (!base.isMaster()) {
         $state.go('apemt.master');
      }
   };
});

app.controller('ApemtMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.openItem = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord) {
         $state.go('^.openItem', { rowId: selectedRecord.rowid, disputeFlag: selectedRecord.disputefl, jrnlno: selectedRecord.jrnlno, setno: selectedRecord.setno });
      }
   };

   self.isSplitPayEnable = function () {
      var isOneRow = base.grid.isOneRowSelected();
      return (isOneRow && criteria.type === '0') ? true : false;
   };

   self.splitPay = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord) {
         var tmpSplitPay = { apetrowid: selectedRecord.rowid };
         DataService.post('api/ap/asapentry/apentryeditsplitpayprevalidate', { data: tmpSplitPay, busy: true }, function (data) {
            $state.go('^.splitPay', { apemtRecord: selectedRecord, splitPayRowId: tmpSplitPay, isEnableDays: data });
         });
      }
   };
});

app.controller('ApemtOpenItemCtrl', function ($state, $stateParams, DataService, MessageService, Utils, $translate) {
   var self = this;
   self.jrnlno = $stateParams.jrnlno;
   self.setno = $stateParams.setno;

   var tmpOpenItem = { apetrowid: $stateParams.rowId, disputefl: $stateParams.disputeFlag };
   DataService.post('api/ap/asapentry/apentryeditmaintload', { data: tmpOpenItem, busy: true }, function (data) {
      self.openItem = data;
   });

   self.cancel = function () {
      $state.go('^.master');
   };
   self.invoiceDateChanged = function () {
      self.openItem.duedate = Utils.addSubtractDaysToDate(self.openItem.invoicedate, self.openItem.duedatedays);
      self.openItem.discdate = Utils.addSubtractDaysToDate(self.openItem.invoicedate, self.openItem.discdatedays);

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

   self.checkValidationAndSubmit = function () {
      var valMsg = '';

      if (((self.openItem.discountamount < 0 || self.openItem.discountamount > self.openItem.schedulepayment) && self.openItem.transcd !== 5)) {
         valMsg = valMsg + $translate.instant('error.discount.amount.cannot.exceed.scheduled.payment.am') + '<br />';
      }

      if (((self.openItem.discountamount < 0 || self.openItem.discountamount > self.openItem.schedulepayment) && self.openItem.transcd === 5)) {
         valMsg = valMsg + $translate.instant('error.discount.amount.cannot.exceed.credit.amount.5050') + '<br />';
      }

      if (self.openItem.discountperc < 0 || self.openItem.discountperc > 100) {
         valMsg = valMsg + $translate.instant('error.discount.percent.cannot.be.greater.than.100percent.5051') + '<br />';
      }

      if ((self.openItem.duedate && self.openItem.invoicedate && Utils.getDateDayDifference(self.openItem.duedate, self.openItem.invoicedate) < 0) || self.openItem.duedatedays < 0) {
         valMsg = valMsg + $translate.instant('error.due.date.cannot.be.before.invoice.date.5396') + '<br />';
      }

      if ((self.openItem.discdate && self.openItem.invoicedate && Utils.getDateDayDifference(self.openItem.discdate, self.openItem.invoicedate) < 0) || self.openItem.discdatedays < 0) {
         valMsg = valMsg + $translate.instant('error.discount.date.cannot.be.before.invoice.date.5394') + '<br />';
      }

      if (valMsg) {
         MessageService.error('global.validation.list', valMsg);
      } else {
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
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         });
      }
   };

   self.submit = function () {
      self.checkValidationAndSubmit();
   };
});

app.controller('ApemtSplitPayCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   //default values
   self.payments = 2;
   self.days = 30;

   self.apemtRecord = $stateParams.apemtRecord;
   self.isEnableDays = $stateParams.isEnableDays;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.save = function () {
      if (self.days < 0) {
         MessageService.error('global.validation.list', 'message.cannot.be.less.than.0');
      } else {
         var splitPayLoadRequest = {
            apeesplitpayrowids: { apetrowid: self.apemtRecord.rowid, sapbvrowid: self.apemtRecord.sapbvrowid },
            iPayments: self.payments,
            iDays: self.days
         };

         DataService.post('api/ap/asapentry/apentryeditsplitpayload', { data: splitPayLoadRequest, busy: true }, function (data) {
            $state.go('^.splitPayRecords', { apemtRecord: self.apemtRecord, splitPays: data, splitPayRowId: $stateParams.splitPayRowId });
         });
      }
   };
});

app.controller('ApemtSplitPayRecordsCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   self.amountProof = 0;
   self.discountProof = 0;

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

   self.onAmountChange = function (sender, args) {
      if (self.splitPays[args.row].amount > self.totalAmount) {
         MessageService.error('global.validation.list', 'error.amount.cannot.be.greater.than.original.amount');
      }
   };

   self.onDiscountChange = function (sender, args) {
      if (self.splitPays[args.row].amount < self.splitPays[args.row].discount) {
         MessageService.error('global.validation.list', 'error.discount.cannot.be.greater.than.due.amount');
      }
   };

   self.cancel = function () {
      $state.go('^.master');
   };

   self.save = function () {
      //TODO Netsetd call
      var splitPayValidateRequest = { apeesplitpayrowids: $stateParams.splitPayRowId, apeesplitpay: $stateParams.splitPays };

      DataService.post('api/ap/asapentry/apentryeditsplitpayvalidate', { data: splitPayValidateRequest, busy: true }, function () {
         var splitPayUpdateRequest = { apeesplitpayrowids: $stateParams.splitPayRowId, apeesplitpay: $stateParams.splitPays };

         DataService.post('api/ap/asapentry/apentryeditsplitpayupdate', { data: splitPayUpdateRequest, busy: true }, function () {
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         });
      });
   };
});
