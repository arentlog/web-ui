'use strict';

app.controller('AoCustomerCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Sasc) { //as custdtl
   var self = this;
   var base = $scope.base;
   var subject = 'Customer';
   self.isGLDivSet = Sasc.gldivfl;

   var dictionary = { //this was manually coded in SL...
      allowPaymentTypes: 'Allow Payment Types',
      arcodinbalfl: 'Include COD in Bal',
      arcrdiscfl: 'Allow Credit Discounts',
      ardiscdays: 'Discount Allowance in Days',
      arfpaddonfl: 'Default Addons from Invoice To',
      arminbalsc: 'Minimum Balance to be Service Charged',
      arminblamt: 'Statement Min Balance to Print',
      arminscamt: 'Minimum Service Charge Amount',
      arperdays1: 'Per 1 Days',
      arperdays2: 'Per 2 Days',
      arperdays3: 'Per 3 Days',
      arperdays4: 'Per 4 Days',
      arpiflimit: 'P.I.F. Allowance',
      arscbal1: 'Svc Chg Balance 1',
      arscbal2: 'Svc Chg Balance 2',
      arscbal3: 'Svc Chg Balance 1',
      arscpc21: 'Svc Chg Rate 2',
      arscpc22: 'Svc Chg Rate 3',
      arscpc23: 'Svc Chg Rate 4',
      arscpc24: 'Svc Chg Rate 5',
      arscpct1: 'Svc Chg Rate 2',
      arscpct2: 'Svc Chg Rate 3',
      arscpct3: 'Svc Chg Rate 4',
      arscpct4: 'Svc Chg Rate 5',
      arshipfl: 'Display Ship To in Receipts',
      arshiptosvc: 'Ship To Service Chg',
      arstmtfrmt: 'Statement Print Format',
      arstmtheadfl: 'Print Statement Headings',
      artermscd: 'Terms Date Adjustment',
      credduetype: 'Credits Due Date Based On',
      mcarrollcd: 'Age Misc Credits',
      scarrollcd: 'Age Svc Charges',
      sequcfl: 'Resequence Unapplied Credits',
      svcchgdivfl: 'Svc Chg by Division',
      svcchgshipfl: 'Svc Chg by Ship To',
      statementOutputType: 'Statement Output Type',
      statementExtraDataLevel1: 'Statement Level 1 Extra Fields',
      statementExtraDataLevel2: 'Statement Level 2 Extra Fields',
      statementIDMDocTypeID: 'Statement IDM Document Type ID',
      statementIDMTemplateName: 'Statement IDM Template Name',
      statementIDMFromEmailAddr: 'Statement IDM From Email Address',
      statementIDMFromEmailName: 'Statement IDM From Email Name',
      validateDupLookupNm: 'Validate Duplicate Lookup Name'
   };

   self.aoCustomer = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aocustomerload', { busy: true }, function (data) {
      if (data) {
         self.aoCustomer = data;
         self.original = angular.copy(self.aoCustomer);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoCustomer, self.original).length);
   };

   self.reset = function () {
      self.aoCustomer = angular.copy(self.original);
      base.reset();
   };

   self.setPerMonth = function () {
      DataService.post('api/shared/assharedentry/aocustsetpermonth', { data: self.aoCustomer, busy: true }, function (data) {
         if (data) {
            self.aoCustomer.arperdays1 = data.arperdays1;
            self.aoCustomer.arperdays2 = data.arperdays2;
            self.aoCustomer.arperdays3 = data.arperdays3;
            self.aoCustomer.arperdays4 = data.arperdays4;
            self.validate();
         }
      });
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aocustomersave', { data: self.aoCustomer, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoCustomer);
            base.saveLog(subject);
         }
      });
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoCustomer, self.original).length) {
            if (base.fillNotes(self.aoCustomer, self.original, dictionary, ['sctype'], self.submit) === 0) {
               self.submit();
            }
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.validate = function () {
      if (self.aoCustomer.arperdays1 <= 0) {
         MessageService.error(dictionary.arperdays1, 'error.must.be.greater.than.0.3100');
         $state.go('ao.customers.balances');
         return false;
      }
      if (self.aoCustomer.arperdays2 <= 0) {
         MessageService.error(dictionary.arperdays2, 'error.must.be.greater.than.0.3100');
         $state.go('ao.customers.balances');
         return false;
      }
      if (self.aoCustomer.arperdays3 <= 0) {
         MessageService.error(dictionary.arperdays3, 'error.must.be.greater.than.0.3100');
         $state.go('ao.customers.balances');
         return false;
      }
      if (self.aoCustomer.arperdays4 <= 0) {
         MessageService.error(dictionary.arperdays4, 'error.must.be.greater.than.0.3100');
         $state.go('ao.customers.balances');
         return false;
      }
      return true;
   };
}); //end custdtl