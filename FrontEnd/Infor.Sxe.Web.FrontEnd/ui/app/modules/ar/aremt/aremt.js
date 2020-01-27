'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ar', 'aremt', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ar', 'aremt');

   $stateProvider.state('aremt.openItem', {
      url: '/open-item',
      params: {
         openItem: null,
         jrnlno: null,
         setno: null,
         invno: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aremt/open-item.json');
            },
            controller: 'AremtOpenItemCtrl as oi'
         }
      }
   });

   $stateProvider.state('aremt.splitPay', {
      url: '/split-pay',
      params: { aremtRecord: null, splitPayRowId: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aremt/split-pay.json');
            },
            controller: 'AremtSplitPayCtrl as sp'
         }
      }
   });

   $stateProvider.state('aremt.splitPayRecords', {
      url: '/split-pay-records',
      params: { aremtRecord: null, splitPays: null, splitPayRowId: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aremt/split-pay-records.json');
            },
            controller: 'AremtSplitPayRecordsCtrl as spr'
         }
      }
   });
});

app.controller('AremtBaseCtrl', function ($state) {
   var self = this;
   self.criteria = { type: '0' };
   self.aremtCollection = {};
   self.aremtGrid = {};

   self.isMaster = function () {
      return $state.is('aremt.master');
   };

   self.includesMaster = function () {
      return $state.includes('aremt.master');
   };

   self.isOpenItem = function () {
      return $state.is('aremt.openItem');
   };

   self.isSplitPay = function () {
      return $state.is('aremt.splitPay');
   };
});

app.controller('AremtSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var criteria = $scope.base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.type = '0';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!$scope.base.isMaster()) {
         $state.go('aremt.master');
      }

      DataService.post('api/ar/asarsetup/aremtretrieve', { data: criteria, busy: true }, function (data) {
         $scope.base.aremtCollection = data.aremtresults;
      });
   };
});

app.controller('AremtMasterCtrl', function ($scope, $state, DataService, GridService) {
   var self = this;
   var criteria = $scope.base.criteria;

   // Initialize search results (if required criteria is present)
   if (criteria.custno) {
      DataService.post('api/ar/asarsetup/aremtretrieve', { data: criteria, busy: true }, function (data) {
         $scope.base.aremtCollection = data.aremtresults;
      });
   }

   self.openItemFunction = function() {
      var record = GridService.getSelectedRecord($scope.base.aremtGrid);

      if (record) {
         var tmpOpenItem = { rowidOpenitem: record.rowid };
         DataService.post('api/ar/asarsetup/openitemload',{ data: tmpOpenItem, busy: true },function(data) {
               if (data) {
                  $state.go('^.openItem',{ openItem: data, jrnlno: record.jrnlno, setno: record.setno, invno: record.invno });
               }
            });
      }
   };

   self.splitPayFunction = function () {
      var record = GridService.getSelectedRecord($scope.base.aremtGrid);

      if (record) {
         var tmpSplitPay = { rowidSplitpay: record.rowid };

         DataService.post('api/ar/asarsetup/splitpayprevalidate', { data: tmpSplitPay, busy: true }, function () {
            $state.go('^.splitPay', { aremtRecord: record, splitPayRowId: tmpSplitPay });
         });
      }
   };
});

app.controller('AremtOpenItemCtrl', function ($state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   self.jrnlno = $stateParams.jrnlno;
   self.setno = $stateParams.setno;
   self.invno = $stateParams.invno;
   self.openItem = $stateParams.openItem;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.dueDateChanged = function () {
      self.openItem.duedays = Utils.getDateDayDifference(self.openItem.duedt, self.openItem.invdt);
   };

   self.dueDaysChanged = function () {
      self.openItem.duedt = Utils.addSubtractDaysToDate(self.openItem.invdt, self.openItem.duedays);
   };

   self.discDateChanged = function () {
      self.openItem.discdays = Utils.getDateDayDifference(self.openItem.discdt, self.openItem.invdt);
   };

   self.discDaysChanged = function () {
      self.openItem.discdt = Utils.addSubtractDaysToDate(self.openItem.invdt, self.openItem.discdays);
   };

   self.discPercentChanged = function () {
      self.openItem.origdisc = self.openItem.amount * self.openItem.discpct / 100;
   };

   self.discAmountChanged = function () {
      self.openItem.discpct = self.openItem.origdisc * 100 / self.openItem.amount;
   };

   // Perform save
   self.submit = function () {
      DataService.post('api/ar/asarsetup/openitemsave', { data: self.openItem, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', null, { reload: '^.master' });
      });
   };
});

app.controller('AremtSplitPayCtrl', function ($state, $stateParams, DataService) {
   var self = this;
   self.aremtRecord = $stateParams.aremtRecord;

   //default values
   self.payments = 2;
   self.days = 30;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.save = function () {
      var splitPayLoadRequest = {
         splitpayrowid: {
            rowidSplitpay: self.aremtRecord.rowid
         },
         iPayments: self.payments,
         iDays: self.days
      };

      DataService.post('api/ar/asarsetup/splitpayload', { data: splitPayLoadRequest, busy: true }, function (data) {
         $state.go('^.splitPayRecords', { aremtRecord: self.aremtRecord, splitPays: data, splitPayRowId: $stateParams.splitPayRowId });
      });
   };
});

app.controller('AremtSplitPayRecordsCtrl', function ($state, $stateParams, DataService) {
   var self = this;
   self.amountProof = 0;
   self.discountProof = 0;

   self.splitPayCollection = $stateParams.splitPays;

   //default values
   self.totalAmount = $stateParams.aremtRecord.amount;
   self.totalDiscount = $stateParams.aremtRecord.origdisc;

   self.SplitPayGridCellChange = function (sender, args) {
      var amountSum = Number(0);
      var discountSum = Number(0);
      self.splitPayCollection.forEach(function (splitPay) {
         amountSum = Number(amountSum) + Number(splitPay.amount);
         discountSum = Number(discountSum) + Number(splitPay.origdisc);
         self.amountProof = Number(self.totalAmount) - amountSum;
         self.discountProof = Number(self.totalDiscount) - discountSum;
      });
   };

   self.cancel = function () {
      $state.go('^.master');
   };

   self.save = function () {
      var splitPayValidateRequest = { splitpayrowid: $stateParams.splitPayRowId, splitpay: $stateParams.splitPays };

      DataService.post('api/ar/asarsetup/splitpayvalidate', { data: splitPayValidateRequest, busy: true }, function () {
         var splitPayUpdateRequest = { splitpayrowid: $stateParams.splitPayRowId, splitpay: $stateParams.splitPays };

         DataService.post('api/ar/asarsetup/splitpayupdate', { data: splitPayUpdateRequest, busy: true }, function () {
            $state.go('^.master', null, { reload: '^.master' });
         });
      });
   };
});
