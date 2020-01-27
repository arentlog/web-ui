'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saav', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saav');

   $stateProvider.state('saav.detail', {
      url: '/detail',
      params: { record: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saav/detail.json');
            },
            controller: 'SaavDetailCtrl as dtl'
         }
      }
   });
});

app.controller('SaavBaseCtrl', function ($state, ConfigService, DataService, MessageService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('saav.master');
   };

   self.includesMaster = function () {
      return $state.includes('saav.master');
   };

   self.isDetail = function () {
      return $state.is('saav.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saav.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {

      var currDate = new Date();

      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.reportingyear = currDate.getFullYear();
   };

   // Perform simple search and update data set for the grid
   self.periodSearch = function () {

      self.dataset = [];

      DataService.post('/web/api/sa/SaavGetHmrcVatPeriods', { data: self.criteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.ttblmessaging)) {
            self.dataset = data.ttblsaavvatperiods;
         }
      });
   };

   // Perform simple search and update data set for the grid
   self.search = function () {

      DataService.post('/web/api/sa/SaavGetHmrcAuthMsg', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            // If no authorization errors found, get the VAT periods
            self.periodSearch();
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('SaavSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saav.master');
      }

      // Get data
      base.search();
   };
});

app.controller('SaavMasterCtrl', function ($scope, $state, ConfigService, DataService) {
   var self = this;

   // Get authorization
   self.getAuthorization = function () {
      var criteria = {
         applicationid: 'HMRCAuthorize'
      };

      DataService.post('/web/api/sa/SaavGetHmrcAuthUrl', { data: criteria, busy: true }, function (data) {
         if (data) {
            window.open(data.HmrcUrl);
         }
      });

   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;

      $state.go('^.detail', { record: record });
   };

});

app.controller('SaavDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.record = $stateParams.record;

   self.currDate = new Date();
   self.compEndDate = new Date(self.record.enddate);
   var testStartDate = new Date(self.record.enddate);
   var testEndDate = new Date(self.record.duedate);

   // The Payment and Liability calls will not accept an end date greater than today so adjust the initial values accordingly
   if (testStartDate <= self.currDate) {
      self.payStartDate = self.record.enddate;
      self.liabilityStartDate = self.record.enddate;
   } else {
      var newStart = new Date();
      newStart = newStart.setDate(1);
      self.payStartDate = newStart;
      self.liabilityStartDate = newStart;
   }

   if (testEndDate <= self.currDate) {
      self.payEndDate = self.record.duedate;
      self.liabilityEndDate = self.record.duedate;
   } else {
      self.payEndDate = self.currDate;
      self.liabilityEndDate = self.currDate;
   }

   if (self.record.statusty.toLowerCase() === 'o') {
      self.periodStatus = MessageService.get('global.open');
   } else {
      self.periodStatus = MessageService.get('global.fulfilled');
   }

   self.rpt = [];
   self.submitted = false;
   self.transCriteria = {};
   self.transCriteria.periodID = self.record.periodid;
   self.transCriteria.periodStartDt = self.record.startdate;
   self.transCriteria.periodEndDt = self.record.enddate;
   self.transCriteria.sourceCd = '';
   self.transCriteria.countryCd = '';
   self.transCriteria.taxGroup = '';
   self.transCriteria.recordLimit = base.criteria.recordlimit;

   self.transcriteria = {
      periodStartDt: self.record.startdate,
      periodEndDt: self.record.enddate,
      periodID: self.record.periodid,
      recordcountlimit: base.criteria.recordlimit
   };

   self.subTitle = base.criteria.reportingyear + Constants.SUB_TITLE_SEPARATOR + self.record.periodid;

   self.transactionCodeFormatter = function (row, cell, value, column, item) {
      if (item && item.sourcecd.toLowerCase() === 'ar') {

         // AR values taken from options-static-ar.json : TransactionType
         if (value) {
            switch (value) {
               case 1:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.service.charge');   //ignore jslint - correct indentation
               case 2:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.rebate');           //ignore jslint - correct indentation
               case 3:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.unapplied.cash');   //ignore jslint - correct indentation
               case 4:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.cash.on.delivery'); //ignore jslint - correct indentation
               case 5:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.misc.credit');      //ignore jslint - correct indentation
               case 6:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.credit.memo');      //ignore jslint - correct indentation
               case 7:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.check.record');     //ignore jslint - correct indentation
               case 8:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.debit.memo');       //ignore jslint - correct indentation
               case 9:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.reversal');         //ignore jslint - correct indentation
               case 11:                                                 //ignore jslint - correct indentation
                  return MessageService.get('global.sched.payment');    //ignore jslint - correct indentation
               default:                                                 //ignore jslint - correct indentation
                  return MessageService.get('global.unknown');          //ignore jslint - correct indentation
            }
         } else {
            if (value === 0) {
               return MessageService.get('global.invoice');
            } else {
               return MessageService.get('global.unknown');
            }
         }

      } else if (item && item.sourcecd.toLowerCase() === 'ap') {

         // AP values taken from options-static-ap.json : TransactionType
         if (value) {
            switch (value) {
               case 2:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.rebate');           //ignore jslint - correct indentation
               case 3:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.sched.payment');    //ignore jslint - correct indentation
               case 4:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.void.check');       //ignore jslint - correct indentation
               case 5:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.misc.credit');      //ignore jslint - correct indentation
               case 6:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.credit.memo');      //ignore jslint - correct indentation
               case 7:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.check');            //ignore jslint - correct indentation
               case 8:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.debit.memo');       //ignore jslint - correct indentation
               case 9:                                                  //ignore jslint - correct indentation
                  return MessageService.get('global.reversal');         //ignore jslint - correct indentation
               case 10:                                                 //ignore jslint - correct indentation
                  return MessageService.get('global.batch.costing');    //ignore jslint - correct indentation
               default:                                                 //ignore jslint - correct indentation
                  return MessageService.get('global.unknown');          //ignore jslint - correct indentation
            }
         } else {
            if (value === 0) {
               return MessageService.get('global.invoice');
            } else {
               return MessageService.get('global.unknown');
            }
         }

      } else {
         return MessageService.get('global.rebate');
      }
   };

   // If a reporting period is closed, get the VAT Report data from HMRC
   self.getOldVatReportData = function () {
      var crit = {
         periodid: self.record.periodid
      };

      DataService.post('/web/api/sa/SaavGetHMRCVatData', { data: crit, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.ttblmessaging)) {
            self.rpt = data.ttblsaavvatreport;
         }
      });
   };

   // If a reporting period is open, get the VAT Report data from SX
   self.getNewVatReportData = function () {
      var crit = {
         periodid: self.record.periodid,
         startdt: self.record.startdate,
         enddt: self.record.enddate
      };

      DataService.post('/web/api/sa/SaavGetSXVatData', { data: crit, busy: true }, function (data) {
         if (data) {
            self.rpt = data.ttblsaavvatreport;
         }
      });
   };

   // Submit the VAT report data
   self.submitReport = function () {
      var crit = {
         ttblsaavvatreport: self.rpt
      };

      DataService.post('/web/api/sa/SaavSubmitVatReport', { data: crit, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.ttblmessaging)) {
            MessageService.info('global.information', 'global.successful');
            self.submitted = true;
         }
      });
   };

   // Get the VAT transactional data
   self.transactionSearch = function () {
      
      DataService.post('/web/api/sa/SaavGetTransactions', { data: self.transCriteria, busy: true }, function (data) {
         self.transDataset = data.ttblsaavtransactions;
      });
      
   };

   // Get the VAT payment data
   self.paymentSearch = function () {
      var payCriteria = {
         startdt: self.payStartDate,
         enddt: self.payEndDate
      };

      DataService.post('/web/api/sa/SaavGetHMRCPayments', { data: payCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.ttblmessaging)) {
            self.payDataset = data.ttblsaavpayments;
         }
      });
   };

   // Get the VAT liability data
   self.liabilitySearch = function () {
      var liabilityCriteria = {
         startdt: self.liabilityStartDate,
         enddt: self.liabilityEndDate
      };

      DataService.post('/web/api/sa/SaavGetHMRCLiabilities', { data: liabilityCriteria, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.ttblmessaging)) {
            self.liabilityDataset = data.ttblsaavliabilities;
         }
      });
   };

   if (self.record.statusty.toLowerCase() === 'o') {
      self.getNewVatReportData();
   } else {
      self.getOldVatReportData();
   }

});
