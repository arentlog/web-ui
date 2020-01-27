'use strict';

app.controller('AoFinancialsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Utils) { //as findtl
   var self = this;
   var base = $scope.base;
   var subject = 'Financials';
   var dictionary = {
      crarfl: 'Check Rec to AR',
      crglfl: 'Check Rec to GL',
      croefl: 'Check Rec to OE',
      gl13perfl: '13 Period Fisc',
      glbalhistfl: 'Track Bal. Hist',
      glbegfisc: 'Beginning Fiscal Period',
      glbegfl: 'Account Size',
      glbegper: 'First Valid Period',
      glcurfisc: 'Curr Per Only',
      glcurrfl: 'Curr Per Only',
      gldefper: 'Default Period',
      gldelim1: 'Delimiter #1',
      gldelim2: 'Delimiter #2',
      gldelim3: 'Delimiter #3',
      glenddt1: 'Fisc End Per 1',
      glenddt10: 'Fisc End Per 10',
      glenddt11: 'Fisc End Per 11',
      glenddt12: 'Fisc End Per 12',
      glenddt13: 'Fisc End Per 13',
      glenddt2: 'Fisc End Per 2',
      glenddt3: 'Fisc End Per 3',
      glenddt4: 'Fisc End Per 4',
      glenddt5: 'Fisc End Per 5',
      glenddt6: 'Fisc End Per 6',
      glenddt7: 'Fisc End Per 7',
      glenddt8: 'Fisc End Per 8',
      glenddt9: 'Fisc End Per 9',
      glendper: 'Last Valid Period',
      gLNo4: 'Account #1',
      gLNo5: 'Account #2',
      gLNo6: 'Account #3',
      gLNo7: 'Account #4',
      gLNo8: 'Clearing Account',
      glperahd: '% Profit #4',
      glperbck: '% Profit #4',
      glprofpct1: 'Last Valid Period',
      glprofpct2: 'Last Valid Period',
      glprofpct3: 'Last Valid Period',
      glprofpct4: 'Last Valid Period',
      glsize1: 'Division Size',
      glsize2: 'Department Size',
      glsize3: 'Account Size',
      glsize4: 'Subaccount Size'
   };

   self.aoFinancials = {};
   self.aoFinancials.fibegyear = 0;
   self.aoFinancials.fiendyear = 0;
   self.aoFinancials.fiendperiod = 0;
   self.aoFinancials.fibegperiod = 0;

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aofinancialsload', { busy: true }, function (data) {
      if (data) {
         self.aoFinancials = data;
         self.setFullYear('glbegper');
         self.setFullYear('glendper');
         base.aoObject = self.aoFinancials;
         self.original = angular.copy(self.aoFinancials);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoFinancials, self.original).length);
   };

   self.perBeginsExample = $translate.instant('question.does.your.fiscal.year.equal.your.calendar.year.at.') + '<br/>' +
      $translate.instant('message.fiscal.2014.equals.09.14.08.15.this.field.should.be.') + '<br/>' +
      $translate.instant('message.fiscal.2015.equals.09.14.08.15.this.field.should.not');

   self.label13per = $translate.instant('global.ending.date.of.each.period.for.the.current.fiscal.');

   self.totalNote = $translate.instant('global.total.percentages.must.equal.one.hundred.percent.in.parenthesis');

   self.clearPeriodDates = function () {
      if (self.aoFinancials) {
         self.aoFinancials.glenddt1 = null;
         self.aoFinancials.glenddt2 = null;
         self.aoFinancials.glenddt3 = null;
         self.aoFinancials.glenddt4 = null;
         self.aoFinancials.glenddt5 = null;
         self.aoFinancials.glenddt6 = null;
         self.aoFinancials.glenddt7 = null;
         self.aoFinancials.glenddt8 = null;
         self.aoFinancials.glenddt9 = null;
         self.aoFinancials.glenddt10 = null;
         self.aoFinancials.glenddt11 = null;
         self.aoFinancials.glenddt12 = null;
         self.aoFinancials.glenddt13 = null;
      }
   };

   self.totalPercentage = function () {
      return self.aoFinancials.glprofpct1 + self.aoFinancials.glprofpct2 + self.aoFinancials.glprofpct3 +
         self.aoFinancials.glprofpct4;
   };

   self.reset = function () {
      self.aoFinancials = angular.copy(self.original);
      base.reset();
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aofinancialssave', { data: self.aoFinancials, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoFinancials);
            base.saveLog(subject);
         }
      });
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoFinancials, self.original).length) {
            base.fillNotes(self.aoFinancials, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.setFullYear = function (fieldName) {
      if (fieldName && fieldName === 'glbegper') {
         var glbegperValue = self.aoFinancials.glbegper;
         if (glbegperValue) {
            var begper = (Utils.padPrefixString(4, glbegperValue, '0')).toString();
            self.fibegyear = Utils.getFullYear(begper.substring(2, 4));
            self.fibegperiod = begper.substring(0, 2);
         }
      }
      else if (fieldName && fieldName === 'glendper') {
         var glendperValue = self.aoFinancials.glendper;
         if (glendperValue) {
            var endper = (Utils.padPrefixString(4, glendperValue, '0')).toString();
            self.fiendyear = Utils.getFullYear(endper.substring(2, 4));
            self.fiendperiod = endper.substring(0, 2);
         }
      }
   };

   self.validate = function () {
      if (self.totalPercentage() !== 100 && self.totalPercentage() !== 0) {
         MessageService.error('global.error', 'message.total.percentage.must.equal.100percent');
         $state.go('ao.financials.profit-distribution');
         return false;
      }
      if (self.aoFinancials.glprofpct1 > 0 && self.aoFinancials.gLNo4 === '') {
         MessageService.error('global.error', 'message.if.a.percent.is.entered.an.account.must.be.entered');
         $state.go('ao.financials.profit-distribution');
         return false;
      }
      if (self.aoFinancials.glprofpct2 > 0 && self.aoFinancials.gLNo5 === '') {
         MessageService.error('global.error', 'message.if.a.percent.is.entered.an.account.must.be.entered');
         $state.go('ao.financials.profit-distribution');
         return false;
      }
      if (self.aoFinancials.glprofpct3 > 0 && self.aoFinancials.gLNo6 === '') {
         MessageService.error('global.error', 'message.if.a.percent.is.entered.an.account.must.be.entered');
         $state.go('ao.financials.profit-distribution');
         return false;
      }
      if (self.aoFinancials.glprofpct4 > 0 && self.aoFinancials.gLNo7 === '') {
         MessageService.error('global.error', 'message.if.a.percent.is.entered.an.account.must.be.entered');
         $state.go('ao.financials.profit-distribution');
         return false;
      }
      if (self.aoFinancials.gl13perfl) {
         if (!self.aoFinancials.glenddt1) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt2) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt3) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt4) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt5) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt6) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt7) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt8) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt9) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt10) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt11) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt12) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (!self.aoFinancials.glenddt13) {
            MessageService.error('global.error', 'message.this.is.a.required.field');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt1 && self.aoFinancials.glenddt2 && Utils.getDateDayDifference(self.aoFinancials.glenddt1, self.aoFinancials.glenddt2) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt2 && self.aoFinancials.glenddt3 && Utils.getDateDayDifference(self.aoFinancials.glenddt2, self.aoFinancials.glenddt3) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt3 && self.aoFinancials.glenddt4 && Utils.getDateDayDifference(self.aoFinancials.glenddt3, self.aoFinancials.glenddt4) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt4 && self.aoFinancials.glenddt5 && Utils.getDateDayDifference(self.aoFinancials.glenddt4, self.aoFinancials.glenddt5) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt5 && self.aoFinancials.glenddt6 && Utils.getDateDayDifference(self.aoFinancials.glenddt5, self.aoFinancials.glenddt6) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt6 && self.aoFinancials.glenddt7 && Utils.getDateDayDifference(self.aoFinancials.glenddt6, self.aoFinancials.glenddt7) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt7 && self.aoFinancials.glenddt8 && Utils.getDateDayDifference(self.aoFinancials.glenddt7, self.aoFinancials.glenddt8) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt8 && self.aoFinancials.glenddt9 && Utils.getDateDayDifference(self.aoFinancials.glenddt8, self.aoFinancials.glenddt9) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt9 && self.aoFinancials.glenddt10 && Utils.getDateDayDifference(self.aoFinancials.glenddt9, self.aoFinancials.glenddt10) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt10 && self.aoFinancials.glenddt11 && Utils.getDateDayDifference(self.aoFinancials.glenddt10, self.aoFinancials.glenddt11) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt11 && self.aoFinancials.glenddt12 && Utils.getDateDayDifference(self.aoFinancials.glenddt11, self.aoFinancials.glenddt12) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
         if (self.aoFinancials.glenddt12 && self.aoFinancials.glenddt13 && Utils.getDateDayDifference(self.aoFinancials.glenddt12, self.aoFinancials.glenddt13) > 0) {
            MessageService.error('global.error', 'message.invalid.date.range');
            $state.go('ao.financials.fiscal-year');
            return false;
         }
      }
      if (self.aoFinancials.glsize3 + self.aoFinancials.glsize4 >= 11) {
         MessageService.error('global.error', 'message.account.subaccount.size.must.be.11.digits');
         $state.go('ao.financials.account-structure');
         return false;
      }
      if (self.aoFinancials.glsize2 >= 5) {
         MessageService.error('global.error', 'global.department.size.must.be.less.than.5.digits');
         $state.go('ao.financials.account-structure');
         return false;
      }
      if (self.aoFinancials.glsize1 >= 5) {
         MessageService.error('global.error', 'message.division.size.must.be..5.digits');
         $state.go('ao.financials.account-structure');
         return false;
      }
      if (self.aoFinancials.glperbck > 12) {
         MessageService.error('global.error', 'message.must.be.0.through.12');
         $state.go('ao.financials.period-structure');
         return false;
      }
      if (self.aoFinancials.glperahd > 12) {
         MessageService.error('global.error', 'message.must.be.0.through.12');
         $state.go('ao.financials.period-structure');
         return false;
      }
      if ((self.fibegyear > self.fiendyear) || ((self.fibegyear === self.fiendyear) && self.fiendperiod < self.fibegperiod)) {
         MessageService.error('global.error', 'message.ending.value.can.not.be.less.than.beginning');
         $state.go('ao.financials.period-structure');
         return false;
      }
      return true;
   };
}); //end findtl