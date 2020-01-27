'use strict';

app.controller('AoVendorCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as venddtl
   var self = this;
   var base = $scope.base;
   var subject = 'Vendor';
   var dictionary = {
      allocationTy: 'AllowDuplicateInvoiceNumbers',
      ap1099Frmt: 'APETAddonAllocationMethod',
      aPBatchDel: 'APCostperPurchaseOrder',
      allowAPCreditACH: 'AllowAPCreditACH',
      apChkfrmt: 'APMinimumBuyAmount',
      apchkheadfl: 'CheckPrintFormat',
      apClsPct1: 'Class10Pct',
      apClsPct10: 'Class11Pct',
      apClsPct11: 'Class12Pct',
      apClsPct12: 'Class1Pct',
      apClsPct2: 'Class2Pct',
      apClsPct3: 'Class3Pct',
      apClsPct4: 'Class4Pct',
      apClsPct5: 'Class5Pct',
      apClsPct6: 'Class6Pct',
      apClsPct7: 'Class7Pct',
      apClsPct8: 'Class8Pct',
      apClsPct9: 'Class9Pct',
      aPDisputeFl: 'DefaulttoImmediatePay',
      aPDupInvFl: 'DeleteRecordsAfterReconciliation',
      aPHoldFl: 'EDI',
      aPImmedFl: 'E-Mail',
      aPInvTolAmt: 'Fax',
      apinvtolminamt: 'HoldDirectOrdersUntilCustomerPaymentReceived',
      aPInvTolPct: 'InvoiceAmountPercentReceivingTolerence',
      aPLnTolAmt: 'InvoiceAmountPercentReceivingTolerence',
      aPLnTolPct: 'InvoiceAmountReceivingTolerance',
      aPmcDiscFl: 'InvoiceAmountReceivingTolerance',
      apMinBuy: 'ION',
      apOrdCost: 'LineAmountPercentReceivingTolerence',
      aPPerDays1: 'Period1',
      aPPerDays2: 'Period2',
      aPPerDays3: 'Period3',
      aPPerDays4: 'Period4',
      aPQtyTolAmt: 'Period1',
      aPQtyTolPct: 'Period2',
      aPRcvLnTolAmt: 'Period3',
      aPRcvLnTolPct: 'Period4',
      aPRcvPOTolAmt: 'Print',
      aPRcvPOTolPct: 'PrintCheckHeadings',
      aPRcvQtyTolAmt: '1099PrintFormat',
      aPRcvQtyTolPct: 'ReceivingTolerance',
      aPRcvTolType: 'SetDisputeFlagonMatchingInvoices',
      aPUser1Amt: 'TakeTermsDiscountonMiscCredit',
      aPUser1Pct: 'UnitQuantityPercentReceivingTolerance',
      aPUser2Amt: 'UnitQuantityPercentReceivingTolerance',
      aPUser2Pct: 'UnitQuantityReceivingTolerance',
      pOCommMethodEDI: 'UnitQuantityReceivingTolerance',
      pOCommMethodEMail: 'User1AmountPercentReceivingTolerence',
      pOCommMethodFax: 'User1AmountReceivingTolerance',
      pOCommMethodION: 'User2AmountPercentReceivingTolerence',
      pOCommMethodPrint: 'User2AmountReceivingTolerance',
      pOCommMethodVMI: 'VMI',
      checkOutputType: 'Check Output Type',
      checkExtraDataLevel1: 'Check Level 1 Extra Fields',
      checkExtraDataLevel2: 'Check Level 2 Extra Fields',
      checkIDMDocTypeID: 'Check IDM Document Type ID',
      checkIDMTemplateName: 'Check IDM Template Name',
      checkRemitIDMDocTypeID: 'Check Remit IDM Document Type ID',
      checkRemitIDMTemplateName: 'Check Remit IDM Template Name',
      checkIDMFromEmailAddr: 'Check IDM From Email Address',
      checkIDMFromEmailName: 'Check IDM From Email Name',
      checkLines: 'Check Lines'
   };

   self.aoVendor = {};

   self.calClassTotal = function () {
      self.classTotal = Number(self.aoVendor.apClsPct1) + Number(self.aoVendor.apClsPct2) + Number(self.aoVendor.apClsPct3) + Number(self.aoVendor.apClsPct4) + Number(self.aoVendor.apClsPct5) + Number(self.aoVendor.apClsPct6) + Number(self.aoVendor.apClsPct7) + Number(self.aoVendor.apClsPct8) + Number(self.aoVendor.apClsPct9) + Number(self.aoVendor.apClsPct10) + Number(self.aoVendor.apClsPct11) + Number(self.aoVendor.apClsPct12);
   };

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aovendorload', { busy: true }, function (data) {
      if (data) {
         self.aoVendor = data;
         self.original = angular.copy(self.aoVendor);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoVendor, self.original).length);
   };

   self.totalPercent = function () {
      return self.aoVendor.apClsPct1 + self.aoVendor.apClsPct2 + self.aoVendor.apClsPct3 +
         self.aoVendor.apClsPct4 + self.aoVendor.apClsPct5 + self.aoVendor.apClsPct6 +
         self.aoVendor.apClsPct7 + self.aoVendor.apClsPct8 + self.aoVendor.apClsPct9 +
         self.aoVendor.apClsPct10 + self.aoVendor.apClsPct11 + self.aoVendor.apClsPct12;
   };

   self.reset = function () {
      self.aoVendor = angular.copy(self.original);
      base.reset();
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aovendorsave', { data: self.aoVendor, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoVendor);
            base.saveLog(subject);
         }
      });
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoVendor, self.original).length) {
            if (base.fillNotes(self.aoVendor, self.original, dictionary, ['pOCommMethodVMI'], self.submit) === 0) {
               self.submit();
            }
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.validate = function () {
      var total = self.totalPercent();
      if (total !== 100 && total !== 0) {
         MessageService.error('global.error', 'message.total.percentage.must.equal.100percent');
         $state.go('ao.vendors.analysis');
         return false;
      }
      return true;
   };
}); //end venddtl