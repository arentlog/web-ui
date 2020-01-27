'use strict';

app.controller('AoSalesHistoryCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as shdtl
   var self = this;
   var base = $scope.base;
   var subject = 'Sales History';
   var dictionary = {
      smmergefl1: 'Customer',
      smshiptofl1: 'by Ship To?',
      smmergefl3: 'Product Category',
      smwhsefl4: 'by Whse?',
      smmergefl4: 'Product',
      smwhsefl1: 'by Whse?',
      smmergefl2: 'Salesrep',
      smsvfl: 'Vendor',
      smmergefl5: 'Customer, Product Category',
      smwhsefl2: 'by Whse?',
      smshiptofl2: 'by Ship To?',
      smmergefl6: 'Customer, Product',
      smwhsefl3: 'by Whse?',
      smshiptofl3: 'by Ship To?',
      smsvpfl: 'Vendor, Product Category',
      smsvpwhsefl: 'by Whse?',
      smsvwfl: 'Vendor, Product',
      smsvwwhsefl: 'by Whse?',
      smnsfl: 'Non-stock Products',
      smstorety: 'Calendar/Fiscal',
      smcompfl: 'Kit Components',
      smwodiscfl: 'Include Whole Order Discounts',
      smcommtype: 'Commissions Basis',
      smcustrebfl: 'Subtract Customer Rebate from Price',
      smvendrebfl: 'Subtract Vendor Rebate from Cost',
      smordcost: 'Cost to Process a Sales Order',
      smdeadmin: 'Minimum Sales to Qualify as an Active Customer',
      smclass1: 'Class 1',
      smclass7: 'Class 7',
      smclass2: 'Class 2',
      smclass8: 'Class 8',
      smclass3: 'Class 3',
      smclass9: 'Class 9',
      smclass4: 'Class 4',
      smclass10: 'Class 10',
      smclass5: 'Class 5',
      smclass11: 'Class 11',
      smclass6: 'Class 6',
      smclass12: 'Class 12'
   };
   self.storeTypeOptions = [
      {
         label: $translate.instant('global.calendar'),
         value: false
      },
      {
         label: $translate.instant('global.fiscal'),
         value: true
      }
   ];
   self.commissionsOptions = [
      {
         label: $translate.instant('global.cash'),
         value: false
      },
      {
         label: $translate.instant('global.accrual'),
         value: true
      }
   ];
   self.totalNote = $translate.instant('message.note.enter.the.percent.of.customers.that.are.in.each.cl');

   self.aoSalesHistory = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aosaleshistoryload', { busy: true }, function (data) {
      if (data) {
         self.aoSalesHistory = data;
         self.original = angular.copy(self.aoSalesHistory);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoSalesHistory, self.original).length);
   };

   self.classificationTotal = function () {
      return self.aoSalesHistory.smclass1 + self.aoSalesHistory.smclass2 + self.aoSalesHistory.smclass3 +
         self.aoSalesHistory.smclass4 + self.aoSalesHistory.smclass5 + self.aoSalesHistory.smclass6 +
         self.aoSalesHistory.smclass7 + self.aoSalesHistory.smclass8 + self.aoSalesHistory.smclass9 +
         self.aoSalesHistory.smclass10 + self.aoSalesHistory.smclass11 + self.aoSalesHistory.smclass12;
   };

   self.reset = function () {
      self.aoSalesHistory = angular.copy(self.original);
      base.reset();
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aosaleshistorysave', { data: self.aoSalesHistory, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoSalesHistory);
            base.saveLog(subject);
         }
      });
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoSalesHistory, self.original).length) {
            base.fillNotes(self.aoSalesHistory, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.validate = function () {
      if (self.classificationTotal() !== 100 && self.classificationTotal() !== 0) {
         MessageService.error('global.error', 'message.total.class.must.be.zero.or.100');
         $state.go('ao.sales-history.customer');
         return false;
      }
      return true;
   };
}); //end shdtl