'use strict';

app.provider('ArTransactionDetailsState', function ArTransactionDetailsStateProvider($stateProvider) {
   var self = this;

   /**
    * Provider access method
    */
   this.$get = [function () {
      return self;
   }];

   /**
    * These States are used to help make it easier to implement, and share code.  Having them in this control means
    * that it doesn't need these states in each place this is called.
    */
   this.addStates = function (module, menuFn, parentState) {
      $stateProvider.state(parentState + '.transaction', {
         url: '/transaction',
         params: { selectedTransaction: null },
         views: {
            transactionDetail: {
               templateProvider: function (JsonViewService) {
                  return JsonViewService.getView('shared/customer-inquiry-transactions/customer-inquiry-transactions-details.json');
               },
               controller: 'ArTransactionsDetailsCtrl as artdc'
            }
         }
      });
   };
});

/**
 * Control for displaying the Transactions information about a customer (shared by ARIC Transactions tab and other functions).
 *
 * Alias: custtrans
 */
app.controller('CustomerInquiryTransactionsCtrl', function ($scope, $state, $translate, AodataService, DataService, Utils, UtilsData, ConfigService, MessageService) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.isUpdateEnable = false;
   self.isReadonly = true;
   self.dueDateSearch = false;
   self.groupid = '';
   self.custno = 0;
   self.transtype = [''];
   self.criteria = {
      custno: self.custno,
      invoiceno: null,
      checkno: null,
      divno: 0,
      datefrom: '',
      datethru: '',
      duedatefrom: '',
      duedatethru: '',
      statusselected: 'a',
      transselected: '',
      paytype: 'a',
      shipto: '',
      jrnlno: 0,
      setno: 0,
      recordcountlimit: ConfigService.getDefaultRecordLimit(),
      groupid: self.groupid,
      userfield: ''
   };
   self.ariccreatetransresults = [];
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ar', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   // Check if National Programs is turned on
   self.isNationalProgramsOn = AodataService.getValue('PD', 'PDNationalProgramsFl').toLowerCase() === 'yes';

   //Need this one as regular search over lapping due date search.
   self.searchbyDueDate = function () {
      var strType = self.transtype.join();
      self.criteria.transselected = strType;
      self.criteria.custno = self.custno;
      self.criteria.groupid = self.groupid;
      DataService.post('api/ar/asarinquiry/ariccreatetransactions', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.ariccreatetransresults = data.ariccreatetransresults;
         }
      });
   };

   self.search = function () {
      var strType = self.transtype.join();
      self.criteria.transselected = strType;
      self.criteria.custno = self.custno ? self.custno : 0;
      self.criteria.groupid = self.groupid;
      DataService.post('api/ar/asarinquiry/ariccreatetransactions', { data: self.criteria, busy: true }, function (data) {
         if (data && !self.dueDateSearch && !self.shiptoSearch) {
            self.ariccreatetransresults = data.ariccreatetransresults;
         }
      });
   };

   if (options.groupidModel) {
      $scope.$watch(options.groupidModel, function (newValue) {
         self.groupid = newValue;
         if (self.groupid) {
            self.search();
         }
      });
   }

   if (options.shiptoModel) {
      $scope.$watch(options.shiptoModel, function (newValue) {
         self.criteria.shipto = newValue;
         if (self.criteria.shipto) {
            self.shiptoSearch = true;
            var strType = self.transtype.join();
            self.criteria.transselected = strType;
            self.criteria.custno = self.custno;
            self.criteria.groupid = self.groupid;
            DataService.post('api/ar/asarinquiry/ariccreatetransactions', { data: self.criteria, busy: true }, function (data) {
               if (data) {
                  self.ariccreatetransresults = data.ariccreatetransresults;
               }
            });
         }
      });
   }

   //Take in a string such as: (1) - 11/02/18 - 12/02/18" or "(5) Older - 08/01/18"
   //and pull out the date pieces.  Depending on the backend configuration, the dates
   //will be in mdy or dmy (for UK) format.  This will deal with both configurations
   //properly.  Also, notice the 'Older' could be a range, that will get converted to
   //a null date in the from date.
   if (options.duedateModel) {
      $scope.$watch(options.duedateModel, function (duedateString) {
         if (duedateString) {
            self.dueDateSearch = true;

            var duedates = duedateString.split('-');
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

            self.criteria.duedatefrom = dueDateFrom;
            self.criteria.duedatethru = dueDateTo;
            self.searchbyDueDate();
         }
      });
   }

   if (options.jrnlnoModel) {
      $scope.$watch(options.jrnlnoModel, function (newValue) {
         self.criteria.jrnlno = newValue;
      });
   }

   if (options.setnoModel) {
      $scope.$watch(options.setnoModel, function (newValue) {
         self.criteria.setno = newValue;
         if (self.criteria.jrnlno) {
            self.search();
         }
      });
   }

   self.refresh = function () {
      self.dueDateSearch = false;
      self.shiptoSearch = false;
      if ((!self.custno && !self.groupid) && !(self.criteria.invoiceno || self.criteria.jrnlno)) {
         MessageService.error('global.error', 'error.must.provide.journal.or.invoice');
      } else {
         if (self.criteria.invoiceno) {
            self.criteria.statusselected = 'b';
         }
         self.search();
      }
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         var selectedTransaction = {
            crjrnlno: record.crjrnlno,
            crsetno: record.crsetno,
            jrnlno: record.jrnlno,
            paymtamt: record.paymtamt,
            rowidAret: record.rowidAret,
            seqno: record.seqno,
            setno: record.setno,
            transcd: record.transcd,
            pymttransno: record.pymttransno,
            invno: record.invno
         };
         $state.go('.transaction', { selectedTransaction: selectedTransaction });
      }
   };

   if (options.arscModel) {
      self.arsc = Utils.getNestedValue($scope, options.arscModel);
      self.arsc.$promise.then(function () {
         if (self.arsc && self.arsc.custno) {
            self.custno = self.arsc.custno;
            self.dueDateSearch = false;
            self.shiptoSearch = false;
            self.search();
         }
      });
   } else if (options.arscFunction) {
      var arscFunctionRef = options.arscFunction;

      // Remove invoke parenthesis if present since we simply want to get the reference to the function
      arscFunctionRef = arscFunctionRef.replace('()', '');

      // Get function
      var getCustomerFn = Utils.getNestedValue($scope, arscFunctionRef);

      getCustomerFn(function (arsc) {
         if (arsc) {
            self.arsc = arsc;
            self.custno = self.arsc.custno;
            self.dueDateSearch = false;
            self.shiptoSearch = false;
            self.search();
         }
      });
   }

   self.referenceFormatter = function (row, cell, value) {
      var index = row;
      if (value && self.ariccreatetransresults && self.ariccreatetransresults[index].appinvno) {
         return self.ariccreatetransresults[index].appinvno + ' - ' + Utils.pad(self.ariccreatetransresults[index].appinvsuf, 2) + ' ' +
            self.ariccreatetransresults[index].appinvdt ? Utils.formatDate(self.ariccreatetransresults[index].appinvdt) : '';
      } else {
         return value;
      }
   };

   self.amountFormatter = function (row, cell, value) {
      var inx = row;
      var customDueAmount = 0;
      if (value && self.ariccreatetransresults) {
         if ((self.ariccreatetransresults[inx].transcd === 0 || self.ariccreatetransresults[inx].transcd === 1 || self.ariccreatetransresults[inx].transcd === 2 ||
            self.ariccreatetransresults[inx].transcd === 4) && self.ariccreatetransresults[inx].statustype) {
            customDueAmount = (self.ariccreatetransresults[inx].amount - self.ariccreatetransresults[inx].paymtamt - self.ariccreatetransresults[inx].discamt + self.ariccreatetransresults[inx].pifamt);
         }
         else if ((self.ariccreatetransresults[inx].transcd && self.ariccreatetransresults[inx].transcd === 3 || self.ariccreatetransresults[inx].transcd === 5 ||
            self.ariccreatetransresults[inx].transcd === 6) && self.ariccreatetransresults[inx].statustype) {
            customDueAmount = (self.ariccreatetransresults[inx].amount + self.ariccreatetransresults[inx].paymtamt - self.ariccreatetransresults[inx].discamt);
         }
         else if ((self.ariccreatetransresults[inx].transcd && self.ariccreatetransresults[inx].transcd === 11) && self.ariccreatetransresults[inx].statustype) {
            customDueAmount = self.ariccreatetransresults[inx].amount;
         }
      }
      return Locale.formatNumber(customDueAmount, { style: 'decimal', maximumFractionDigits: 2, round: true }); //ignore jslint - not defined
   };

   self.oeioHyperLink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('oeio.detail', { pk: currentRow.invno, pk2: currentRow.invsuf });
      }
   };

   self.glijHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('glij.detail', { pk: currentRow.jrnlno });
      }
   };

   self.statustypeFormatter = function (row, cell, value) {
      var inx = row;
      if (value && self.ariccreatetransresults) {
         return ((self.ariccreatetransresults[inx].transcd === 11 && self.ariccreatetransresults[inx].statustype) ? $translate.instant('global.due') :
            self.ariccreatetransresults[inx].statustype ? $translate.instant('global.open') : '');
      } else {
         return '';
      }
   };

   self.isAmountVisible = function (row, cell, value, column, item) {
      return item.paymtamt !== 0;
   };

   self.transactionTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value) { //ignore jslint - correct indentation
            case 1: //ignore jslint - correct indentation
               return $translate.instant('global.service.charge'); //ignore jslint - correct indentation
            case 2: //ignore jslint - correct indentation
               return $translate.instant('global.rebate'); //ignore jslint - correct indentation
            case 3: //ignore jslint - correct indentation
               return $translate.instant('global.unapplied.cash'); //ignore jslint - correct indentation
            case 4: //ignore jslint - correct indentation
               return $translate.instant('global.cash.on.delivery'); //ignore jslint - correct indentation
            case 5: //ignore jslint - correct indentation
               return $translate.instant('global.misc.credit'); //ignore jslint - correct indentation
            case 6: //ignore jslint - correct indentation
               return $translate.instant('global.credit.memo'); //ignore jslint - correct indentation
            case 7: //ignore jslint - correct indentation
               return $translate.instant('global.check.record'); //ignore jslint - correct indentation
            case 8: //ignore jslint - correct indentation
               return $translate.instant('global.debit.memo'); //ignore jslint - correct indentation
            case 9: //ignore jslint - correct indentation
               return $translate.instant('global.reversal'); //ignore jslint - correct indentation
            case 10: //ignore jslint - correct indentation
               return $translate.instant('global.xx'); //ignore jslint - correct indentation
            case 11: //ignore jslint - correct indentation
               return $translate.instant('global.sched.payment'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         if (value === 0) {
            return $translate.instant('global.invoice');
         } else {
            return value;
         }
      }
   };

   self.referenceTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value) { //ignore jslint - correct indentation
            case 1: //ignore jslint - correct indentation
               return $translate.instant('global.service.charge.number'); //ignore jslint - correct indentation
            case 6: //ignore jslint - correct indentation
               return $translate.instant('global.credit.memo.number'); //ignore jslint - correct indentation
            case 8: //ignore jslint - correct indentation
               return $translate.instant('global.debit.memo.number'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         if (value === 0) {
            return $translate.instant('global.invoice.number');
         } else {
            return value;
         }
      }
   };

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

app.controller('ArTransactionsDetailsCtrl', function ($stateParams, $translate) {
   var self = this;
   self.transaction = $stateParams.selectedTransaction;
   self.subtitle = '';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   if (self.transaction) {
      self.subtitle = $translate.instant('global.journal.number') + self.LABEL_DELIMITER + self.transaction.jrnlno + self.SUBMENU_DELIMITER +
         $translate.instant('global.set.number') + self.LABEL_DELIMITER + self.transaction.setno + self.SUBMENU_DELIMITER +
         $translate.instant('global.invoice.number') + self.LABEL_DELIMITER + self.transaction.invno;
   }
});

app.controller('CustomerTransactionsDetailCtrl', function ($stateParams, DataService) {
   var self = this;
   self.isappliedJrno = false;
   var transaction = $stateParams.selectedTransaction;

   if (transaction) {
      DataService.get('api/ar/aret/getbyrowid/' + transaction.rowidAret, function (data) {
         if (data) {
            self.isappliedJrno = ((data.transcd === 3 || data.transcd === 4) && !data.statustype);
         }
      });
      var params = {
         rwid: transaction.rowidAret,
         customfield: null,
         userfield: null
      };
      DataService.post('api/ar/asarinquiry/artransactiondetail', { data: params, busy: true }, function (data) {
         if (data) {
            self.transdtlrslt = data;
         }
      });
   }
});

app.controller('CustomerTransactionsPaidJournalSetCtrl', function ($stateParams, $translate, DataService) {
   var self = this;
   var transaction = $stateParams.selectedTransaction;

   if (transaction && (transaction.transcd === 3 || transaction.transcd === 5 || transaction.transcd === 11) && transaction.paymtamt) {
      var glparams = {
         jrnlno: transaction.jrnlno,
         setno: transaction.setno,
         userfield: null
      };
      DataService.post('api/ar/asarinquiry/aricloadaretsettt', { data: glparams, busy: true }, function (data) {
         if (data) {
            self.loadaretsetresults = data;
         }
      });
   }

   self.transactionTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) { //ignore jslint - correct indentation
            case 'IN': //ignore jslint - correct indentation
               return $translate.instant('global.invoice'); //ignore jslint - correct indentation
            case 'SV': //ignore jslint - correct indentation
               return $translate.instant('global.service.charge'); //ignore jslint - correct indentation
            case 'RB': //ignore jslint - correct indentation
               return $translate.instant('global.rebate'); //ignore jslint - correct indentation
            case 'UC': //ignore jslint - correct indentation
               return $translate.instant('global.unapplied.cash'); //ignore jslint - correct indentation
            case 'CD': //ignore jslint - correct indentation
               return $translate.instant('global.cash.on.delivery'); //ignore jslint - correct indentation
            case 'MC': //ignore jslint - correct indentation
               return $translate.instant('global.misc.credit'); //ignore jslint - correct indentation
            case 'CR': //ignore jslint - correct indentation
               return $translate.instant('global.credit.memo'); //ignore jslint - correct indentation
            case 'CK': //ignore jslint - correct indentation
               return $translate.instant('global.check.record'); //ignore jslint - correct indentation
            case 'DB': //ignore jslint - correct indentation
               return $translate.instant('global.debit.memo'); //ignore jslint - correct indentation
            case 'RV': //ignore jslint - correct indentation
               return $translate.instant('global.reversal'); //ignore jslint - correct indentation
            case 'XX': //ignore jslint - correct indentation
               return $translate.instant('global.xx'); //ignore jslint - correct indentation
            case 'PY': //ignore jslint - correct indentation
               return $translate.instant('global.sched.payment'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         return value;
      }
   };

   self.statustypeFormatter = function (row, cell, value) {
      if (value) {
         if (value.toUpperCase() === 'OPN') {
            return $translate.instant('global.open');
         } else if (value.toUpperCase() === 'DUE') {
            return $translate.instant('global.due');
         }
      } else {
         return value;
      }
   };
});

app.controller('CustomerTransactionsGlrevaluationsCtrl', function ($stateParams, DataService, ConfigService) {
   var self = this;
   var transaction = $stateParams.selectedTransaction;

   if (transaction) {
      DataService.get('api/ar/aret/getbyrowid/' + transaction.rowidAret, function (data) {
         if (data) {
            var gletvParams = {
               sourcecd: 'aret',
               idno: data.custno,
               docno: data.invno,
               docsuf: data.invsuf,
               transcd: data.transcd,
               docseqno: data.seqno,
               fillmode: true,
               batchsize: ConfigService.getDefaultRecordLimit()
            };
            DataService.get('api/gl/gletv/listbysourcekey', { params: gletvParams, busy: true }, function (gletvs) {
               if (gletvs) {
                  self.loadaretsetresults = gletvs;
               }
            });
         }
      });
   }
});