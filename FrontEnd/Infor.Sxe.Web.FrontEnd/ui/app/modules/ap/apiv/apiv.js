'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ap', 'apiv', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('ap', 'apiv');

   $stateProvider.state('apiv.detail', {
      url: '/detail?id&{pk:int}&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apiv/detail.json');
            },
            controller: 'ApivDetailCtrl as dtl'
         }
      },
      resolve: {
         accessTest: function ($q, $stateParams, DataService, MessageService, TabService) {
            var deferred = $q.defer();
            if ($stateParams.pk) {
               var crit = {
                  tablename: 'apsv',
                  vendno: $stateParams.pk
               };

               DataService.post('/web/api/shared/checkhyperlinkaccess', { data: crit, busy: true }, function (data) {
                  if (data.success) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                     MessageService.error('global.error', 'global.security.violations.hyperlink');
                     TabService.closeTab('apiv');
                  }
               });
            } else {
               // If no pk param passed (probably means we are using rowid from the grid), then bypass the check
               deferred.resolve();
            }
            return deferred.promise;
         }
      }
   });

   $stateProvider.state('apiv.detail.history', {
      url: '/history',
      params: { record: null },
      views: {
         APHistory: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apiv/tabs/history-details.json');
            },
            controller: 'ApivHistoryDetailCtrl as hst'
         }
      }
   });

   $stateProvider.state('apiv.detail.transactiondetail', {
      url: '/transaction-detail',
      params: { record: null },
      views: {
         Transactions: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apiv/tabs/aptransactions-details.json');
            },
            controller: 'ApivTransactionsDetailsCtrl as tsd'
         }
      }
   });

});

app.controller('ApivBaseCtrl', function ($state, AodataService, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'apiv',
      rowIdField: 'rowID',
      stateRef: 'apiv.detail',
      title: { label: 'global.vendor.number', value: 'vendno' },
      description: { label: null, value: 'name' }
   };

   // Check if National Programs is turned on
   self.isNationalProgramsOn = AodataService.getValue('PD', 'PDNationalProgramsFl').toLowerCase() === 'yes';

   self.isMaster = function () {
      return $state.is('apiv.master');
   };

   self.includesMaster = function () {
      return $state.includes('apiv.master');
   };

   self.isDetail = function () {
      return $state.is('apiv.detail');
   };

   self.includesDetail = function () {
      return $state.includes('apiv.detail');
   };

   self.istransactionDetail = function () {
      return $state.is('apiv.detail.transactiondetail');
   };

   self.ishistDetail = function () {
      return $state.is('apiv.detail.history');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {

      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {

      // Add default record limit to specified field on criteria
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();

      DataService.post('api/ap/apsv/lookup', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.apvendorlookupresults;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('ApivSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('apiv.master');
      }

      // Get data
      base.search();
   };
});

app.controller('ApivMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService) {
   var self = this;

   var base = $scope.base;

   // Advanced search criteria object with initial values
   self.advCriteria = {
      includeinactive: false,
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   // List of available search criteria fields
   self.criteriaList = [{ value: 'vendno', label: MessageService.get('global.vendor.number') },
   { value: 'lookupnm', label: MessageService.get('global.lookup.name') },
   { value: 'name', label: MessageService.get('global.name') },
   { value: 'phoneno', label: MessageService.get('global.phone.number.label') },
   { value: 'city', label: MessageService.get('global.city') },
   { value: 'state', label: MessageService.get('global.state') },
   { value: 'zipcd', label: MessageService.get('global.zip.code') },
   { value: 'firstnm', label: MessageService.get('global.first.name') },
   { value: 'lastnm', label: MessageService.get('global.last.name') },
   { value: 'includeinactive', label: MessageService.get('global.include.inactive') },
   { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields

   self.defaultSelectedCriteria = ['vendno', 'name'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { pk: record.vendno });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      DataService.post('api/ap/apsv/lookup', { data: self.advCriteria, busy: true }, function (data) {
         base.dataset = data.apvendorlookupresults;
      });
   };
});

app.controller('ApivDetailCtrl', function ($scope, $state, $stateParams, $translate, AodataService, Constants, DataService, MessageService, Sasoo, StandardConverters, UtilsData, Utils) {
   var self = this;
   var base = $scope.base;
   self.isallowAPCreditACHOn = AodataService.getValue('AP', 'AllowAPCreditACH').toLowerCase() === 'yes';

   // Default values
   self.userfieldtype = 'v';
   self.historyCriteria = {};
   self.transCriteria = {};
   self.transtype = [''];
   self.transCriteria.statustype = 'active';
   self.transCriteria.recordcountlimit = base.criteria.recordlimit;
   self.canSelectTransactionTab = false;
   self.historyCriteria.whse = Sasoo.whse;
   self.vendno = $stateParams.pk || 0;
   self.shipFromNumber = $stateParams.pk2; //Let it come in as null if not set.
   self.currencyDescription = '';
   self.periodType = '1'; // Default period display format to Dates
   self.divnoDropDownOptions = [];
   var TOTAL_BALANCES = 'totalbalances';
   var FUTURE_BALANCES = 'futurebalance';

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ap', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.apsv = DataService.getResource('api/ap/apsv/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      base.criteria.vendno = self.vendno;

      var params = {
         vendno: self.vendno,
         fillmode: true
      };

      self.apsv = DataService.getResource('api/ap/apsv/getbypk', { params: params, busy: true });
   }

   //Overwrite Ship From Number if coming in as a parameter via a drilldown.
   if (self.shipFromNumber) {
      base.criteria.shipfmno = self.shipFromNumber;
   }

   if (base.criteria.vendno && base.criteria.shipfmno) {
      var shipfromparams = {
         vendno: base.criteria.vendno,
         shipfmno: base.criteria.shipfmno
      };

      DataService.get('api/ap/apss/getbypk', { params: shipfromparams, busy: true }, function (data) {
         self.apss = data;
      });
   }

   self.getCurrencyDescription = function () {
      self.currencyDescription = '';
      if (self.apsv.currencyty) {
         var sastaParams = {
            currencyty: self.apsv.currencyty,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sastc/getbypk', { params: sastaParams, busy: true }, function (sastc) {
            if (sastc) {
               self.currencyDescription = sastc.descrip;
            }
         });
      }
   };

   // After record has resolved...
   self.apsv.$promise.then(function () {
      if (self.apsv) {
         self.vendno = self.apsv.vendno;
         self.epmttype = self.apsv.epmttype;
         base.criteria.vendno = self.apsv.vendno;
         self.subTitle = self.apsv.vendno + Constants.SUB_TITLE_SEPARATOR + self.apsv.name;
         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.apsv);
         self.bindYTDBalances();
         self.historySearch();
         self.transactionsSearch();
         self.getVendBalance();
         self.getTermsDescription();
         self.getVendorType();
         self.getCurrencyDescription();
      }
   });

   self.getTermsDescription = function () {
      if (self.apsv.termstype) {
         var sastaParams = {
            codeiden: 't',
            codeval: self.apsv.termstype,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               self.termsdescription = sasta.descrip;
            }
         });
      }
   };

   self.getVendorType = function () {
      if (self.apsv.vendtype) {
         var sastaParams = {
            codeiden: 'vt',
            codeval: self.apsv.vendtype,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               self.vendtypedescription = sasta.descrip;
            }
         });
      }
   };

   self.bindYTDBalances = function () {
      self.ytdbalances = [];
      var currentytd = {
         type: $translate.instant('global.ytd.balances'),
         invoices: self.apsv.invytd,
         payments: self.apsv.paymtytd,
         returns: self.apsv.returnsytd,
         rebates: self.apsv.rebatesytd,
         disctaken: self.apsv.disctknytd,
         disclost: self.apsv.disclstytd,
         nopos: self.apsv.nopoytd
      };
      var previousytd = {
         type: $translate.instant('global.previous.year.balances'),
         invoices: self.apsv.invly,
         payments: self.apsv.paymtly,
         returns: self.apsv.returnsly,
         rebates: self.apsv.rebatesly,
         disctaken: self.apsv.discly,
         disclost: null,
         nopos: null
      };
      self.ytdbalances.push(currentytd);
      self.ytdbalances.push(previousytd);
   };

   // History Data retrival
   self.historySearch = function () {
      self.historyCriteria.vendno = self.vendno;
      DataService.post('api/ap/asapinquiry/appurchasehistory', { data: self.historyCriteria, busy: true }, function (data) {
         self.historyDataset = data;
      });
   };

   // Drill down to history details
   self.histDrillDown = function (e, args) {
      self.record = args[0].item;
      $state.go('apiv.detail.history', { record: self.record });
   };

   // Get Vendor Transactions
   self.transactionsSearch = function () {

      var strTransTypes = self.transtype.join();
      self.transCriteria.transtypes = strTransTypes;
      self.transCriteria.vendno = self.vendno;

      DataService.post('api/ap/asapinquiry/apivcreatetransactions', { data: self.transCriteria, busy: true }, function (data) {
         self.aptransDataset = data.apivcreatetransresults;

         //User Hook (do not rename)
         if (self.transactionsSearchContinue) {
            self.transactionsSearchContinue();
         }
      });
   };

   // Drill down to  transactions screens
   self.transDrillDown = function (e, args) {
      self.transrecord = args[0].item;
      $state.go('apiv.detail.transactiondetail', { record: self.transrecord });
   };

   self.getVendBalance = function () {
      // Period balances
      self.vendorbaldisplaycriteria = {};
      self.vendorbaldisplaycriteria.vendno = self.vendno;

      DataService.post('api/ap/asapinquiry/vendorbaldisplay', { data: self.vendorbaldisplaycriteria, busy: true }, function (data) {
         if (data) {
            self.periodData = data;
            if (self.periodData[0]) {
               splitDuration(self.periodData[0].description);
            }
            if (self.periodData[1]) {
               splitDates(self.periodData[1].description);
            }
            if (self.periodData[2]) {
               splitBalances(self.periodData[2].description);
            }

            if (self.periodData[3] && self.periodData[3].messageType.toLowerCase() === FUTURE_BALANCES) {
               self.futureInvoice = self.periodData[3].description;
            }

            if (self.periodData[5] && self.periodData[5].messageType.toLowerCase() === TOTAL_BALANCES) {
               self.otherCharges = self.periodData[5].description;
            }

            self.updatePeriodDisplay();
         }
      });
   };

   function splitDuration(resultStr) {
      if (resultStr !== null) {
         var splitChars = '|';
         if (resultStr.indexOf(splitChars) >= 0) {
            var dtlStr = resultStr.split(splitChars);
            var duration1 = dtlStr[0];
            var duration2 = dtlStr[1];
            var duration3 = dtlStr[2];
            var duration4 = dtlStr[3];

            var d2 = Number(duration1) + Number(duration2);
            var d3 = Number(duration1) + Number(duration2) + Number(duration3);
            var d4 = Number(duration1) + Number(duration2) + Number(duration3) + Number(duration4);

            self.periodDuration1 = '(1) < ' + duration1 + ' ' + MessageService.get('global.days');
            self.periodDuration2 = '(2) ' + duration1 + ' -' + d2 + ' ' + MessageService.get('global.days');
            self.periodDuration3 = '(3) ' + d2 + ' - ' + d3 + ' ' + MessageService.get('global.days');
            self.periodDuration4 = '(4) ' + d3 + ' - ' + d4 + ' ' + MessageService.get('global.days');
            self.periodDuration5 = '(5) ' + MessageService.get('global.older.than.without.than') + ' > ' + d4;
         }
      }
   }

   function splitDates(resultStr) {
      if (resultStr !== null) {
         var splitChars = '|';
         if (resultStr.indexOf(splitChars) >= 0) {
            var dtlStr = resultStr.split(splitChars);
            self.period1Date = dtlStr[0];  
            self.period1DateDisplay = Utils.reformatPeriodDates(dtlStr[0]);
            self.period2Date = dtlStr[1];
            self.period2DateDisplay = Utils.reformatPeriodDates(dtlStr[1]);
            self.period3Date = dtlStr[2];
            self.period3DateDisplay = Utils.reformatPeriodDates(dtlStr[2]);
            self.period4Date = dtlStr[3];
            self.period4DateDisplay = Utils.reformatPeriodDates(dtlStr[3]);
            self.period5Date = dtlStr[4];
            self.period5DateDisplay = Utils.reformatPeriodDates(dtlStr[4]);
         }
      }
   }

   function splitBalances(resultStr) {
      if (resultStr !== null) {
         var splitChars = '|';
         if (resultStr.indexOf(splitChars) >= 0) {
            var dtlStr = resultStr.split(splitChars);
            self.periodBalance1 = dtlStr[0] ? parseFloat(dtlStr[0]) : 0;
            self.periodBalance2 = dtlStr[1] ? parseFloat(dtlStr[1]) : 0;
            self.periodBalance3 = dtlStr[2] ? parseFloat(dtlStr[2]) : 0;
            self.periodBalance4 = dtlStr[3] ? parseFloat(dtlStr[3]) : 0;
            self.periodBalance5 = dtlStr[4] ? parseFloat(dtlStr[4]) : 0;
         }
      }
   }

   // Update period balance display
   self.updatePeriodDisplay = function () {
      if (self.periodType === '1') {
         self.period1 = self.period1DateDisplay;
         self.period2 = self.period2DateDisplay;
         self.period3 = self.period3DateDisplay;
         self.period4 = self.period4DateDisplay;
         self.period5 = self.period5DateDisplay;
      } else {
         self.period1 = self.periodDuration1;
         self.period2 = self.periodDuration2;
         self.period3 = self.periodDuration3;
         self.period4 = self.periodDuration4;
         self.period5 = self.periodDuration5;
      }

      // Build the data for the Period Balance chart
      self.periodBalanceChartOptions = {
         dataset: [{
            data: [{
               name: $translate.instant('global.period.1'),
               abbrName: '1',
               color: '#66a140',
               value: self.periodBalance1,
               tooltip: self.period1 + ' <b>' + StandardConverters.Currency.convert(self.periodBalance1) + '</b>'
            }, {
               name: $translate.instant('global.period.2'),
               abbrName: '2',
               color: '#8ed1c6',
               value: self.periodBalance2,
               tooltip: self.period2 + ' <b>' + StandardConverters.Currency.convert(self.periodBalance2) + '</b>'
            }, {
               name: $translate.instant('global.period.3'),
               abbrName: '3',
               color: '#1d5f8a',
               value: self.periodBalance3,
               tooltip: self.period3 + ' <b>' + StandardConverters.Currency.convert(self.periodBalance3) + '</b>'
            }, {
               name: $translate.instant('global.period.4'),
               abbrName: '4',
               color: '#9279a6',
               value: self.periodBalance4,
               tooltip: self.period4 + ' <b>' + StandardConverters.Currency.convert(self.periodBalance4) + '</b>'
            }, {
               name: $translate.instant('global.period.5'),
               abbrName: '5',
               color: '#f2bc41',
               value: self.periodBalance5,
               tooltip: self.period5 + ' <b>' + StandardConverters.Currency.convert(self.periodBalance5) + '</b>'
            }]
         }]
      };
   };

   //Take in a string such as: (1) - 11/02/18 - 12/02/18" or "(5) Older - 08/01/18"
   //and pull out the date pieces.  Depending on the backend configuration, the dates
   //will be in mdy or dmy (for UK) format.  This will deal with both configurations
   //properly.  Also, notice the 'Older' could be a range, that will get converted to
   //a null date in the from date.
   self.navigateTransactions = function (duedateString) {
      self.canSelectTransactionTab = true;
      var duedates = duedateString.split('-');
      if (duedates) {
         var dueDateFromOrig = duedates[0].trim().slice(3).trim();
         var dueDateFrom = null;
         var dueDateTo = null;

         //Handle string dates from the backend date format and convert them to dates presented in the
         //user's browser locale.  It's possible that the From Date isn't an actual date so add protection
         //for that and only convert if it is a date.
         if (dueDateFromOrig.includes('/')) {
            dueDateFrom = Utils.reformatStringDate(duedates[0].trim().slice(3).trim());
         }
         dueDateTo = Utils.reformatStringDate(duedates[1].trim());

         self.transCriteria.fromdate = dueDateFrom;
         self.transCriteria.todate = dueDateTo;

         self.transactionsSearch();
      }
   };

   self.isVendorTabSelected = function () {
      self.canSelectTransactionTab = false;
   };

   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.ponumber) {
         var orderDetails = currentRow.ponumber.split('-');
         $state.go('poip.detail', { pk: orderDetails[0], pk2: orderDetails[1] });
      }
   };
});

app.controller('ApivHistoryDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService, Sasc) {
   var self = this;
   var currencySymbol = Sasc.currsymbol;

   // History Details retrive
   self.record = {};
   self.record = $stateParams.record;
   self.apsp = {};

   self.getpurchaseHistDetails = function () {
      if (self.record) {
         self.subTitle = self.record.whse + Constants.SUB_TITLE_SEPARATOR + self.record.yr;
         var params = {
            vendno: self.record.vendno,
            whse: self.record.whse,
            prodline: self.record.prodline,
            yr: self.record.yr.toString().substring(2, 4)
         };

         DataService.get('api/ap/apsp/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.apsp = data;
            }
            self.purchaseHistory = [{ month: MessageService.get('global.january'), purchamt: self.apsp.purchamt1 ? self.apsp.purchamt1 : 0.00, qtysold: self.apsp.qtysold1 ? self.apsp.qtysold1 : 0.00, salesamt: self.apsp.salesamt1 ? self.apsp.salesamt1 : 0.00, cogamt: self.apsp.cogamt1 ? self.apsp.cogamt1 : 0.00 },
            { month: MessageService.get('global.february'), purchamt: self.apsp.purchamt2 ? self.apsp.purchamt2 : 0.00, qtysold: self.apsp.qtysold2 ? self.apsp.qtysold2 : 0.00, salesamt: self.apsp.salesamt2 ? self.apsp.salesamt2 : 0.00, cogamt: self.apsp.cogamt2 ? self.apsp.cogamt2 : 0.00 },
            { month: MessageService.get('global.march'), purchamt: self.apsp.purchamt3 ? self.apsp.purchamt3 : 0.00, qtysold: self.apsp.qtysold3 ? self.apsp.qtysold3 : 0.00, salesamt: self.apsp.salesamt3 ? self.apsp.salesamt3 : 0.00, cogamt: self.apsp.cogamt3 ? self.apsp.cogamt3 : 0.00 },
            { month: MessageService.get('global.april'), purchamt: self.apsp.purchamt4 ? self.apsp.purchamt4 : 0.00, qtysold: self.apsp.qtysold4 ? self.apsp.qtysold4 : 0.00, salesamt: self.apsp.salesamt4 ? self.apsp.salesamt4 : 0.00, cogamt: self.apsp.cogamt4 ? self.apsp.cogamt4 : 0.00 },
            { month: MessageService.get('global.may'), purchamt: self.apsp.purchamt4 ? self.apsp.purchamt5 : 0.00, qtysold: self.apsp.qtysold5 ? self.apsp.qtysold5 : 0.00, salesamt: self.apsp.salesamt5 ? self.apsp.salesamt5 : 0.00, cogamt: self.apsp.cogamt5 ? self.apsp.cogamt5 : 0.00 },
            { month: MessageService.get('global.june'), purchamt: self.apsp.purchamt6 ? self.apsp.purchamt6 : 0.00, qtysold: self.apsp.qtysold6 ? self.apsp.qtysold6 : 0.00, salesamt: self.apsp.salesamt6 ? self.apsp.salesamt6 : 0.00, cogamt: self.apsp.cogamt6 ? self.apsp.cogamt6 : 0.00 },
            { month: MessageService.get('global.july'), purchamt: self.apsp.purchamt7 ? self.apsp.purchamt7 : 0.00, qtysold: self.apsp.qtysold7 ? self.apsp.qtysold7 : 0.00, salesamt: self.apsp.salesamt7 ? self.apsp.salesamt7 : 0.00, cogamt: self.apsp.cogamt7 ? self.apsp.cogamt7 : 0.00 },
            { month: MessageService.get('global.august'), purchamt: self.apsp.purchamt8 ? self.apsp.purchamt8 : 0.00, qtysold: self.apsp.qtysold8 ? self.apsp.qtysold8 : 0.00, salesamt: self.apsp.salesamt8 ? self.apsp.salesamt8 : 0.00, cogamt: self.apsp.cogamt8 ? self.apsp.cogamt8 : 0.00 },
            { month: MessageService.get('global.september'), purchamt: self.apsp.purchamt9 ? self.apsp.purchamt9 : 0.00, qtysold: self.apsp.qtysold9 ? self.apsp.qtysold9 : 0.00, salesamt: self.apsp.salesamt9 ? self.apsp.salesamt9 : 0.00, cogamt: self.apsp.cogamt9 ? self.apsp.cogamt9 : 0.00 },
            { month: MessageService.get('global.october'), purchamt: self.apsp.purchamt10 ? self.apsp.purchamt10 : 0.00, qtysold: self.apsp.qtysold10 ? self.apsp.qtysold10 : 0.00, salesamt: self.apsp.salesamt10 ? self.apsp.salesamt10 : 0.00, cogamt: self.apsp.cogamt10 ? self.apsp.cogamt10 : 0.00 },
            { month: MessageService.get('global.november'), purchamt: self.apsp.purchamt11 ? self.apsp.purchamt11 : 0.00, qtysold: self.apsp.qtysold11 ? self.apsp.qtysold11 : 0.00, salesamt: self.apsp.salesamt11 ? self.apsp.salesamt11 : 0.00, cogamt: self.apsp.cogamt11 ? self.apsp.cogamt11 : 0.00 },
            { month: MessageService.get('global.december'), purchamt: self.apsp.purchamt12 ? self.apsp.purchamt12 : 0.00, qtysold: self.apsp.qtysold12 ? self.apsp.qtysold12 : 0.00, salesamt: self.apsp.salesamt12 ? self.apsp.salesamt12 : 0.00, cogamt: self.apsp.cogamt12 ? self.apsp.cogamt12 : 0.00 },
            { month: MessageService.get('global.total'), purchamt: self.apsp.purchamt1 + self.apsp.purchamt2 + self.apsp.purchamt3 + self.apsp.purchamt4 + self.apsp.purchamt5 + self.apsp.purchamt6 + self.apsp.purchamt7 + self.apsp.purchamt8 + self.apsp.purchamt9 +
               self.apsp.purchamt10 + self.apsp.purchamt11 + self.apsp.purchamt12,
               qtysold: self.apsp.qtysold1 + self.apsp.qtysold2 + self.apsp.qtysold3 + self.apsp.qtysold4 + self.apsp.qtysold5 + self.apsp.qtysold6 + self.apsp.qtysold7 + self.apsp.qtysold8 + self.apsp.qtysold9 +
               self.apsp.qtysold10 + self.apsp.qtysold11 + self.apsp.qtysold12,
               salesamt: self.apsp.salesamt1 + self.apsp.salesamt2 + self.apsp.salesamt3 + self.apsp.salesamt4 + self.apsp.salesamt5 + self.apsp.salesamt6 + self.apsp.salesamt7 + self.apsp.salesamt8 + self.apsp.salesamt9 +
               self.apsp.salesamt10 + self.apsp.salesamt11 + self.apsp.salesamt12,
               cogamt: self.apsp.cogamt1 + self.apsp.cogamt2 + self.apsp.cogamt3 + self.apsp.cogamt4 + self.apsp.cogamt5 + self.apsp.cogamt6 + self.apsp.cogamt7 + self.apsp.cogamt8 + self.apsp.cogamt9 + self.apsp.cogamt10 +
               self.apsp.cogamt11 + self.apsp.cogamt12
            }
            ];
         });
      }
   };
   self.getpurchaseHistDetails();

   // Grid data

   self.purchaseHistoryLabel1 = MessageService.get('global.amount.purchased');
   self.purchaseHistoryLabel2 = MessageService.get('global.amount.sold');
   self.purchaseHistoryLabel3 = currencySymbol + ' ' + MessageService.get('global.sales');
   self.purchaseHistoryLabel4 = currencySymbol + ' ' + MessageService.get('global.cost.of.sales');



   if (self.apsp) {
      self.purchaseAmtTotal = self.apsp.purchamt1 + self.apsp.purchamt1 + self.apsp.purchamt3 + self.apsp.purchamt4 + self.apsp.purchamt5 + self.apsp.purchamt6 + self.apsp.purchamt7 + self.apsp.purchamt8 + self.apsp.purchamt9 + self.apsp.purchamt10 + self.apsp.purchamt11 + self.apsp.purchamt12;
      self.salesAmountTotal = self.apsp.salesamt1 + self.apsp.salesamt2 + self.apsp.salesamt3 + self.apsp.salesamt4 + self.apsp.salesamt5 + self.apsp.salesamt6 + self.apsp.salesamt7 + self.apsp.salesamt8 + self.apsp.salesamt9 + self.apsp.salesamt10 + self.apsp.salesamt11 + self.apsp.salesamt12;
      self.quantitySoldTotal = self.apsp.qtysold1 + self.apsp.qtysold2 + self.apsp.qtysold3 + self.apsp.qtysold4 + self.apsp.qtysold5 + self.apsp.qtysold6 + self.apsp.qtysold7 + self.apsp.qtysold8 + self.apsp.qtysold9 + self.apsp.qtysold10 + self.apsp.qtysold11 + self.apsp.qtysold12;
      self.costOfSalesTotal = self.apsp.cogamt1 + self.apsp.cogamt2 + self.apsp.cogamt3 + self.apsp.cogamt4 + self.apsp.cogamt5 + self.apsp.cogamt6 + self.apsp.cogamt7 + self.apsp.cogamt8 + self.apsp.cogamt9 + self.apsp.cogamt10 + self.apsp.cogamt11 + self.apsp.cogamt12;
   }
});

app.controller('ApivTransactionsDetailsCtrl', function ($scope, $state, $stateParams, AodataService, Constants, DataService, OptionSetService) {
   var self = this;
   self.record = {};
   self.apet = {};
   self.postjrnlset = '';
   self.paidjrnlset = '';
   self.isallowAPCreditACHOn = AodataService.getValue('AP', 'AllowAPCreditACH').toLowerCase() === 'yes';
   self.record = $stateParams.record;

   if (self.record.achinvno !== '' && self.isallowAPCreditACHOn) {
      self.creditACH = true;
   } else {
      self.creditACH = false;
   }
   if (self.record) {
      self.subTitle = self.record.jrnlno + Constants.SUB_TITLE_SEPARATOR + self.record.setno;
   }
   // Load credit card communication code description
   OptionSetService.getDisplayLabel('OE', 'CreditCardCommunicationType', self.record.commcd, function (label) {
      self.commcddesc = label;
   });
   self.loadTransactionDetails = function () {
      var glDistributionCriteria = {
         jrnlno: self.record.jrnlno,
         setno: self.record.setno
      };

      DataService.post('api/gl/asglinquiry/gldistribution', { data: glDistributionCriteria, busy: true }, function (glData) {
         if (glData) {
            self.transGLDistributionDataset = glData;
         }

         var poCostingCriteria = {
            jrnlno: self.record.jrnlno,
            setno: self.record.setno
         };

         DataService.post('api/ap/asapinquiry/appocosting', { data: poCostingCriteria, busy: true }, function (costData) {
            if (costData) {
               self.pocostingDataset = costData;
            }

            var manualAddressParams = {
               jrnlno: self.record.jrnlno,
               setno: self.record.setno
            };

            DataService.get('api/ap/apemm/getbypk', { params: manualAddressParams, busy: true }, function (apemmData) {
               if (apemmData) {
                  self.manualAddress = apemmData;
               }

               DataService.get('api/ap/apet/getbyrowid/' + self.record.rowidApet, { busy: true }, function (apetData) {
                  if (apetData) {
                     self.apet = apetData;
                     self.postjrnlset = apetData.jrnlno + ' / ' + apetData.setno;
                     self.paidjrnlset = apetData.pidjrnlno + ' / ' + apetData.pidsetno;
                     var transtm = '';

                     if (self.apet.transtm.length === 4) {
                        transtm = self.apet.transtm.substring(0, 2) + ':' + self.apet.transtm.substring(2, 4);
                     }
                     else {
                        transtm = self.apet.transtm;
                     }

                     var tarnsDate = new Date(self.apet.transdt);

                     self.apet.lastupdate = self.apet.operinit + ' ' + ((self.apet.transdt) ? tarnsDate.toLocaleDateString() : '') + ' ' + transtm;

                     self.apet.amtdue = Number(self.apet.amount) - Number(self.apet.paymtamt) - Number(self.apet.discamt);
                     var params = {
                        bankno: self.apet.bankno,
                        checkno: self.apet.checkno,
                        ckrectype: 1,
                        vendno: self.apet.vendno,
                        fldlist: 'enterdt'
                     };
                     DataService.get('api/shared/cret/getbyvendno', { params: params, busy: true }, function (cret) {
                        if (cret) {
                           self.enterdt = cret.enterdt;
                        }
                     });

                  }
               });
            });
         });
      });
   };

   self.loadTransactionACHDetails = function () {
      if (self.record.achinvno) {
         var apivApetaLookupCriteria = {
            achinvno: self.record.achinvno,
            achinvsuf: self.record.achinvsuf,
            vendno: self.record.vendno,
            bankno: self.record.achbankno
         };

         DataService.post('api/ap/asapinquiry/apivapetasinglelookup', { data: apivApetaLookupCriteria, busy: true }, function (achData) {
            if (achData) {
               self.achData = achData[0];
            }
         });
      }
   };

   self.loadTransactionDetails();

   self.loadTransactionACHDetails();

   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.ponosort) {
         $state.go('poip.detail', { pk: currentRow.ponosort, pk2: currentRow.posufsort });
      }
   };
});

app.controller('VendorTransactionsGlrevaluationsCtrl', function ($stateParams, DataService, ConfigService) {
   var self = this;
   var transaction = $stateParams.record;
   if (transaction) {
      DataService.get('api/ap/apet/getbyrowid/' + transaction.rowidApet, function (apet) {
         if (apet) {
            var gletvParams = {
               sourcecd: 'apet',
               idno: apet.vendno,
               docno: apet.apinvno,
               docsuf: apet.apinvsuf,
               transcd: apet.transcd,
               docseqno: apet.seqno,
               fillmode: true,
               batchsize: ConfigService.getDefaultRecordLimit()
            };
            DataService.get('api/gl/gletv/listbysourcekey', { params: gletvParams, busy: true }, function (gletvs) {
               if (gletvs) {
                  self.loadapetsetresults = gletvs;
               }
            });
         }
      });
   }
});