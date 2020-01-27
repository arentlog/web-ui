'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('cr', 'crec', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('cr', 'crec');

   $stateProvider.state('crec.quickentry', {
      url: '/quick-entry',
      params: { bankno: null, crecqc: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('cr/crec/quickentry.json');
            },
            controller: 'CrecQuickEntryCtrl as qe'
         }
      }
   });

   $stateProvider.state('crec.master.distribution', {
      url: '/distribution',
      params: { transRecord: null },
      views: {
         childview: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('cr/crec/trans-gldistribution.json');
            },
            controller: 'CrecGlDistributionCtrl as gld'
         }
      }
   });

   //AP Transactions
   $stateProvider.state('crec.master.apsubtransactions', {
      url: '/ap-sub-transactions',
      params: { transRecord: null },
      views: {
         childview: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('cr/crec/subtransactions.json');
            },
            controller: 'CrecSubTransactionsCtrl as st'
         }
      }
   });

   //AR Transactions
   $stateProvider.state('crec.master.arsubtransactions', {
      url: '/ar-sub-transactions',
      params: { transRecord: null },
      views: {
         childview: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('cr/crec/arsubtransactions.json');
            },
            controller: 'CrecSubTransactionsCtrl as st'
         }
      }
   });

   $stateProvider.state('crec.master.apsubtransactions.subtransactionsDetail', {
      url: '/detail',
      params: { subTransDtlRecord: null },
      views: {
         subtransDetails: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('cr/crec/subtransactions-details.json');
            },
            controller: 'CrecSubTransactionsDetailCtrl as stdtl'
         }
      }
   });


   $stateProvider.state('crec.quickClear', {
      url: '/quick-clear',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('cr/crec/quick-clear.json');
            },
            controller: 'CrecQuickClearCtrl as qc'
         }
      }
   });

   $stateProvider.state('crec.voidcheck', {
      url: '/void-check',
      params: { crecqeVoidCriteria: null, curbookbal: null, crecqc: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('cr/crec/check-range.json');
            },
            controller: 'CrecVoidCheckCtrl as vc'
         }
      }
   });
});

app.controller('CrecBaseCtrl', function ($state, ConfigService, Utils, UtilsData) {
   var self = this;
   self.criteria = {};
   self.checkRecSetupBank = {};
   self.crecTransactionCriteria = {};
   self.crecReconcileCriteria = {};

   // Default reconcile criteria data
   self.dateFrom = Utils.getCurrentDate();

   self.banknoDropDownOptions = [];

   // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getBankNoDropDown(function (dropDownList) {
      self.banknoDropDownOptions = dropDownList;
   });

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'crec',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'ap', // Uses AP Module security
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('crec.master');
   };

   self.includesMaster = function () {
      return $state.includes('crec.master');
   };

   self.issubtransactions = function () {
      return $state.is('crec.detail.subtransactions');
   };

   self.isapsubtransDetails = function () {
      return $state.is('crec.master.apsubtransactions');
   };

   self.isarsubtransDetails = function () {
      return $state.is('crec.master.arsubtransactions');
   };

   //self.isQuickEntry = function () {
   //   return $state.is('crec.detail.quickentry');
   //};

   self.initialize = function () {
      self.crecTransactionCriteria.bankno = self.criteria.banknumber;
      self.crecTransactionCriteria.rsStarting = 1;
      self.crecTransactionCriteria.fiCheckno = null;
      self.crecTransactionCriteria.rsActive = '';
      self.crecTransactionCriteria.rsCleared = '';
      self.crecTransactionCriteria.rsBalanced = '';
      self.crecTransactionCriteria.slTransType = '';
      self.crecTransactionCriteria.fiStartingDt = '';
      self.crecTransactionCriteria.recordLimit = ConfigService.getDefaultRecordLimit();

      self.crecReconcileCriteria.ckrectype = 1;
      self.crecReconcileCriteria.ccheckno = null;
      self.crecReconcileCriteria.recordLimit = ConfigService.getDefaultRecordLimit();

      //User Hook (do not rename)
      if (self.initializeContinue) {
         self.initializeContinue();
      }
   };

   self.initialize();
});

app.controller('CrecSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
   };

});

app.controller('CrecMasterCtrl', function ($scope, $state, DataService, GridService, Utils, MessageService, Constants, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.PARAM_PRIMARY_KEY_BANKNO = 'bankno';
   self.FIELD_KEY_DELIMITER = '=';
   self.isEnableGLDistribution = false;
   self.isEnableSubTransactions = false;
   self.checkRecSetupBank = base.checkRecSetupBank;
   self.selectedCRTransTypes = [1, 2, 3, 4, 5, 6, 7, 8];
   base.crecTransactionCriteria.bankno = base.criteria.banknumber;

   self.isReconcileTabReadonly = SecurityService.getSubSecurityLevel('crec', 'Reconcile') < 3;
   self.isBankTabReadonly = SecurityService.getSubSecurityLevel('crec', 'Bank') < 3;
   self.isTransactionsTabReadonly = SecurityService.getSubSecurityLevel('crec', 'Transactions') < 3;
   self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('crec', 'Custom') < 3;

   if (base.criteria.banknumber) {
      self.subtitle = MessageService.get('global.bank.number') + Constants.LABEL_DELIMITER + base.criteria.banknumber;
   }
   // New record to enter
   self.crec = {};

   // Clear form
   self.clear = function () {
      self.crec = {};
   };

   self.getCurrencyType = function () {
      self.currencyty = '';
      self.currencyDesc = '';
      if (self.checkRecSetupBank.currencyty) {
         var params = {
            currencyty: self.checkRecSetupBank.currencyty,
            fldlist: 'currencyty,descrip'
         };
         DataService.get('api/sa/sastc/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.currencyty = data.currencyty;
               self.currencyDesc = data.descrip;
            }
         });
      }
   };

   self.getDivision = function () {
      self.divisionDesc = '';
      if (self.checkRecSetupBank.divno) {
         var sastnparams = {
            codeiden: 'V',
            codeval: self.checkRecSetupBank.divno,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sastn/getbypk', { params: sastnparams }, function (sastn) {
            if (sastn && sastn.descrip) {
               self.divisionDesc = sastn.descrip;
            }
         });
      }
   };

   self.getGLAccount = function () {
      self.crbankglacct = '';
      self.crbankglacctdesc = '';
      var glcriteria = { bankno: self.checkRecSetupBank.bankno };
      DataService.post('api/shared/ascrsetup/crbankglfetch', { data: glcriteria, busy: true }, function (data) {
         if (data) {
            self.crbankglacct = data.crbankglacct;
            self.crbankglacctdesc = data.crbankglacctdesc;
         }
      });
   };

   self.getcheckRecSetupBank = function () {
      var params = { bankno: base.criteria.banknumber };
      DataService.get('api/shared/crsb/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.checkRecSetupBank = data;
            self.getCurrencyType();
            self.getDivision();
            self.getGLAccount();
         }
      });
   };

   // Navigating to distribution
   self.glDistribution = function () {
      var selectedRecord = GridService.getSelectedRecord(self.transDataGrid);
      if (selectedRecord) {
         $state.go('.distribution', { transRecord: selectedRecord });
      }
   };

   self.checkEnableToolBarButtons = function () {
      if (self.transDataGrid) {
         var selectedRecord = GridService.getSelectedRecord(self.transDataGrid);
         if (selectedRecord) {
            self.isEnableGLDistribution = selectedRecord.jrnlno !== 0 ? true : false;
            self.isEnableSubTransactions = (selectedRecord.jrnlno !== 0 && (selectedRecord.modulenm && selectedRecord.modulenm.toLowerCase() !== 'gl')) ? true : false;
         } else {
            self.isEnableGLDistribution = false;
            self.isEnableSubTransactions = false;
         }
      }
   };

   //Navigating to sub transactions
   self.glSubTransactions = function () {
      var selectedRecord = GridService.getSelectedRecord(self.transDataGrid);
      if (selectedRecord) {
         if (selectedRecord.modulenm.toUpperCase() === 'AP') {
            $state.go('.apsubtransactions', { transRecord: selectedRecord });
         } else if (selectedRecord.modulenm.toUpperCase() === 'AR') {
            $state.go('.arsubtransactions', { transRecord: selectedRecord });
         }
      }
   };

   self.quickEntry = function () {
      $state.go('^.quickentry');
   };

   self.quickClear = function () { $state.go('^.quickClear'); };

   self.getReconcile = function () {
      base.crecReconcileCriteria.bankno = base.criteria.banknumber;
      DataService.post('api/shared/ascrentry/crecreconcile', { data: base.crecReconcileCriteria, busy: true }, function (data) {
         if (data) {
            self.reconcileDataset = data.crecreconcile;

            if (data.lMoreRecords) {
               MessageService.alert('global.warning', "global.record.count.limit.has.been.reached.for.reconcile");
            }
         }
      });
   };

   self.reconcileResetClear = function (type) {

      var selectedRecRecords = GridService.getSelectedRecords(self.reconcileGrid);
      var inputData = { crecreconcile: selectedRecRecords, cClearResetType: type, dtcleared: base.dateFrom };

      DataService.post('api/shared/ascrentry/crecclearreset', { data: inputData, busy: true }, function (data) {
         if (data && data.length) {
            // Read in the Records to Update the Selected Records
            data.forEach(function (record) {

               // Unique ID for the Row Updated
               var idx = self.reconcileDataset.findIndex(function (search) {
                  return search.cretrowid === record.cretrowid;
               });

               if (idx >= 0) {

                  // Update the Row in the Grid
                  self.reconcileDataset[idx].clearfl = record.clearfl;
                  self.reconcileDataset[idx].cleardt = record.cleardt;

                  // Refresh the Row Selected
                  self.reconcileGrid.updateRow(idx);
               }
            });

            self.reconcileGrid.unSelectAllRows();
         }
      });
   };

   self.onTransactionStartChange = function () {
      if (base.crecTransactionCriteria.rsStarting === 1) {
         base.crecTransactionCriteria.fiStartingDt = null;
      } else {
         base.crecTransactionCriteria.fiCheckno = null;
      }
   };

   self.getTransactions = function () {
      base.crecTransactionCriteria.slTransType = self.selectedCRTransTypes.join();
      DataService.post('api/shared/ascrentry/crectrans', { data: base.crecTransactionCriteria, busy: true }, function (data) {
         if (data) {
            self.transDataset = [];
            if (base.crecTransactionCriteria.rsStarting === 2) {
               var listdata = (JSLINQ(data.crectrans).OrderByDescending(function (item) {
                  return item.enterdt;
               }).ToArray());
               listdata.forEach(function (item) {
                  self.transDataset.push(item);
               });
            }
            else {
               self.transDataset = data.crectrans;
            }

            if (data.lMoreRecords) {
               MessageService.alert('global.warning', "global.record.count.limit.has.been.reached.for.transactions");
            }
         }
      });
   };

   if (base.criteria.banknumber) {
      self.getcheckRecSetupBank();
      self.getReconcile();
      self.getTransactions();
   }

   self.buildContactsParamData = function () {
      var paramData = '';
      if (base.criteria.banknumber) {
         paramData = self.PARAM_PRIMARY_KEY_BANKNO + self.FIELD_KEY_DELIMITER +
            base.criteria.banknumber.toString();
      }
      return paramData;
   };

   //Only after the controls are initialized, can we set the key data to it so it can build out
   //the data in the Bank Contact data.
   self.bankContactsControlReady = function () {
      if (self.bankContactsControl) {
         self.bankContactsControl.initialize(self.buildContactsParamData());
      }
   };

});

app.controller('CrecQuickEntryCtrl', function ($scope, $stateParams, $state, $translate, DataService, Utils, MessageService) {
   var self = this;
   var base = $scope.base;
   self.crsb = {};
   self.crecqc = {};
   self.stage1 = true;
   self.stage2 = false;
   self.isBankCheckEnable = false;

   self.isCheckRange = false;

   self.transTypeChange = function () {

      if (self.crecqc.ckrectype === 6) {
         self.isCheckRange = true;
      }
      else {
         self.isCheckRange = false;
      }
   };

   self.onBankNoChanged = function () {
      self.getCurrBookBal();
   };

   // Default criteria values
   if ($stateParams.bankno === 0 || $stateParams.bankno === null) {
      self.crecqc = { ckrectype: 1, enterdt: Utils.getCurrentDate(), clearfl: 'n', modulenm: 'CR', bankno: self.crecqc.bankno = base.criteria.banknumber };
   }
   else {
      self.crecqc = $stateParams.crecqc;
   }

   self.saveChanges = function () {

      if (self.crecqc.bankno === 0 || self.crecqc.bankno === self.crecqc.frombankno) {
         MessageService.error('global.error', 'error.bank.not.set.up.in.check.reconciliation.crsb.43');
         return;
      }
      else if (self.crecqc.ckrectype === 7 && self.crecqc.frombankno === 0) {
         MessageService.error('global.error', 'error.bank.not.set.up.in.check.reconciliation.crsb.43');
         return;
      }

      self.crecqe = [];
      if (self.stage1) {
         var ascrentryCRECQEinitRequestAPI = { crecqe: self.crecqc, lEnable: true };
         DataService.post('api/shared/ascrentry/crecqeinit', { data: ascrentryCRECQEinitRequestAPI, busy: true }, function (data) {
            if (data) {
               self.stage1 = false;
               self.stage2 = true;
               self.crecqc = data;
               self.crecqc.clearfl = 'n';
               self.isBankCheckEnable = true;
            }
         });
      }
      else if (self.stage2) {
         if (self.crecqc.checkno === 0 && self.crecqc.checknoSensitive) {
            MessageService.error('global.error', 'error.check.number.cannot.be.zero.if.updating.check.rec.5321');
            return;
         }

         else if (self.crecqc.amount === 0) {
            MessageService.error('global.error', 'error.must.not.be.equals.0.3112');
            return;
         }

         if (base.journalControl.isJournalOpen()) {
            self.crecqc.jrnlno = base.journal.gJrnlno;
         } else {
            self.crecqc.jrnlno = 0;
         }

         DataService.post('api/shared/ascrentry/crecqeupdate', { data: self.crecqc, busy: true }, function (data) {
            if (data) {
               if (data.messaging.length > 0) {
                  MessageService.processMessaging(data.messaging);
               }
               else if (data.lSuccess) {
                  self.crecqe.push(data.crecqe);
                  self.dataset = self.crecqe;
                  self.getCurrBookBal();

                  var ascrentryCRECQEinitRequestAPI = { crecqe: self.crecqc, lEnable: false };
                  DataService.post('api/shared/ascrentry/crecqeinit', { data: ascrentryCRECQEinitRequestAPI, busy: true }, function (crecqc) {
                     if (crecqc) {
                        self.crecqc = crecqc;
                        self.stage1 = true;
                        self.stage2 = false;
                        self.crecqc.clearfl = 'n';
                        self.isBankCheckEnable = false;
                     }
                  });
               }
            }
         });
      }
   };

   self.getCurrBookBal = function () {
      var params = {
         bankno: self.crecqc.bankno,
         fillmode: true
      };

      DataService.get('api/shared/crsb/getbypk/', { params: params, busy: true }, function (crsb) {
         if (crsb) {
            self.crsb.curbookbal = crsb.curbookbal;
            self.curbookbal = crsb.curbookbal;
         }

      });
   };

   if (base.criteria.banknumber) {
      self.getCurrBookBal();

      var ascrentryCRECQEinitRequestAPI = { crecqe: self.crecqc, lEnable: false };
      DataService.post('api/shared/ascrentry/crecqeinit', { data: ascrentryCRECQEinitRequestAPI, busy: true }, function (crecqc) {
         if (crecqc) {
            self.crecqc = crecqc;
            self.crecqc.amount = 0;
            self.crecqc.clearfl = 'n';
         }
      });
   }


   self.validateCRECCheckNo = function () {

      if (self.crecqc && self.crecqc.ckrectype === 6 && self.crecqc.checkno > 0) {
         if (base.journalControl.isJournalOpen()) {
            self.crecqc.jrnlno = base.journal.gJrnlno;
         } else {
            self.crecqc.jrnlno = 0;
         }

         DataService.post('api/shared/ascrentry/crecqecheckno', { data: self.crecqc, busy: true }, function (data) {
            if (data) {
               if (data.messaging.length > 0) {
                  MessageService.processMessaging(data.messaging);
               }
               else {
                  self.crecqc = data.crecqe;
                  if (data.crecqe.lGoVoidAPFl) {
                     MessageService.yesNo('global.information', 'question.reverse.gl.and.ap.transactions', function yes() {
                        self.crecqc.lAPVoidFl = true;

                        if (!self.crecqc.jrnlno) {
                           base.journalControl.showOpenView();
                        }
                     });
                  }
               }
            }
         });
      }
   };


   self.clear = function () {
      self.getCurrBookBal();
      if (self.stage1) {
         var ascrentryCRECQEinitRequestAPI = { crecqe: self.crecqc, lEnable: false };
         DataService.post('api/shared/ascrentry/crecqeinit', { data: ascrentryCRECQEinitRequestAPI, busy: true }, function (crecqc) {
            if (crecqc) {
               self.crecqc = crecqc;
               self.isBankCheckEnable = false;
               self.crecqc.amount = 0;
               self.crecqc.ckrectype = 1;
               self.crecqc.clearfl = 'n';
            }
         });

      }
      else {
         var ascrentryCRECQEinitRequestAPI = { crecqe: self.crecqc, lEnable: true };
         DataService.post('api/shared/ascrentry/crecqeinit', { data: ascrentryCRECQEinitRequestAPI, busy: true }, function (crecqc) {
            if (crecqc) {
               self.crecqc = crecqc;
               self.crecqc.amount = 0;
               self.isBankCheckEnable = true;
               self.crecqc.ckrectype = 1;
               if (self.crecqc.clearfl) {
                  self.crecqc.clearfl = 'y';
               }
               else {
                  self.crecqc.clearfl = 'n';
               }
            }
         });
      }
   };

   self.cancel = function () {
      var ascrentryCRECQEinitRequestAPI = { crecqe: self.crecqc, lEnable: false };
      DataService.post('api/shared/ascrentry/crecqeinit', { data: ascrentryCRECQEinitRequestAPI, busy: true }, function (crecqc) {
         if (crecqc) {
            self.crecqc = crecqc;
            self.crecqc.amount = 0;
            self.isBankCheckEnable = false;
            self.stage1 = true;
            self.stage2 = false;
            if (self.crecqc.clearfl) {
               self.crecqc.clearfl = 'y';
            }
            else {
               self.crecqc.clearfl = 'n';
            }
         }
      });
   };

   self.launchVoidCheck = function () {
      $state.go('crec.voidcheck', { crecqeVoidCriteria: self.crecqc.bankno, curbookbal: self.curbookbal, crecqc: self.crecqc });
   };

   self.recordTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value) { //ignore jslint - correct indentation
            case 1: //ignore jslint - correct indentation
               return $translate.instant('global.check'); //ignore jslint - correct indentation
            case 2: //ignore jslint - correct indentation
               return $translate.instant('global.charge'); //ignore jslint - correct indentation
            case 3: //ignore jslint - correct indentation
               return $translate.instant('global.adjustment'); //ignore jslint - correct indentation
            case 4: //ignore jslint - correct indentation
               return $translate.instant('global.deposit'); //ignore jslint - correct indentation
            case 5: //ignore jslint - correct indentation
               return $translate.instant('global.interest'); //ignore jslint - correct indentation
            case 6: //ignore jslint - correct indentation
               return $translate.instant('global.void'); //ignore jslint - correct indentation
            case 7: //ignore jslint - correct indentation
               return $translate.instant('global.transfer.in'); //ignore jslint - correct indentation
            case 8: //ignore jslint - correct indentation
               return $translate.instant('global.transfer.out'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      }
   };
});

app.controller('CrecVoidCheckCtrl', function ($scope, $stateParams, $state, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var stage1 = true;
   //self.dataset = [];
   self.crecqeVoidCriteria = { bankno: 0, checknostart: 0, checknoend: 0, enterdt: null, refer: '', recordcountlimit: 200, jrnlno: 0, userfield: '' };
   self.curbookbal = $stateParams.curbookbal;

   self.crecqeVoidCriteria.bankno = $stateParams.crecqeVoidCriteria;
   self.postdt = Utils.getCurrentDate();
   self.crecqeVoidCriteria.enterdt = self.postdt;

   self.goQuickEntry = function () {
      $state.go('^.quickentry', { bankno: self.crecqeVoidCriteria.bankno, crecqc: $stateParams.crecqc });
   };

   self.updateVoidCheck = function () {

      // Determine if a journal is currently open
      if (base.journalControl.isJournalOpen()) {
         self.crecqeVoidCriteria.jrnlno = base.journal.gJrnlno;
      } else {
         self.crecqeVoidCriteria.jrnlno = 0;
      }

      if (stage1) {
         self.crecqeVoidCriteria.userfield = '';
         //var crecqeVoidCriteria = self.crecqeVoidCriteria;
         DataService.post('api/shared/ascrentry/crecqevoidinit', { data: self.crecqeVoidCriteria, busy: true }, function (data) {
            if (data) {
               data.messaging.forEach(function (mess) {
                  if (mess.messagetype === 'i' && mess.messagetxt) {

                     self.dataset = data.crecqevoidresults;
                     MessageService.okCancel('global.information', mess.messagetxt, function () {
                     }, function () {
                     });
                     if (self.dataset.length > 0) {
                        stage1 = false;
                     }

                     // Determine if any checks in the range can be voided
                     var iAPCount = JSLINQ(self.dataset).Where(function (item1) { return item1.lAP === true; });
                     if (iAPCount.items.length > 0) {
                        MessageService.yesNo('global.information', 'question.reverse.gl.and.ap.transactions', function yes() {

                           // If the user chooses to reverse AP and GL postings, update the records so the SI logic can execute the correct logic
                           for (var i = 0; i < self.dataset.length; i++) {
                              if (self.dataset[i].lAP) {
                                 self.dataset[i].lReverseAP = true;
                              }
                           }

                           // If no journal is open, pop the journal open screen
                           if (!self.crecqeVoidCriteria.jrnlno) {
                              base.journalControl.showOpenView();
                           }

                        });
                     }
                  }
                  else {
                     MessageService.okCancel('global.error', mess.messagetxt);
                  }
               });
            }
         });
      }
      else {
         var ascrentryCRECQEVOIDupdateRequestAPI = { crecqeVoidCriteria: self.crecqeVoidCriteria, crecqevoidresults: self.dataset };
         DataService.post('api/shared/ascrentry/crecqevoidupdate', { data: ascrentryCRECQEVOIDupdateRequestAPI, busy: true }, function (data) {
            if (data) {
               data.messaging.forEach(function (mess) {
                  if (mess.messagetype === 'i' && mess.messagetxt) {
                     MessageService.okCancel('global.error', mess.messagetxt, function () {
                     }, function () {
                     });
                     stage1 = true;
                     self.getCurrBookBal();
                  }
               });
            }
         });
      }
   };

   self.getCurrBookBal = function () {
      var params = {
         bankno: self.crecqeVoidCriteria.bankno,
         fillmode: true
      };

      DataService.get('api/shared/crsb/getbypk/', { params: params, busy: true }, function (crsb) {
         if (crsb) {
            self.curbookbal = crsb.curbookbal;
         }
      });
   };

});

app.controller('CrecQuickClearCtrl', function($scope, $state, DataService, Utils) {
      var self = this;
      var base = $scope.base;
      self.isQuickClear = false;
      self.crecqc = {};
      // Default criteria values
      self.crecqc = { ckrectype: 1, cleardt: Utils.getCurrentDate(), clearreset: 1, endcheckno: 0, begcheckno: 0 };

      self.validateBeginCheckNo = function() {
         if (self.crecqc.begcheckno >= self.crecqc.endcheckno) {
            self.crecqc.endcheckno = self.crecqc.begcheckno;
            self.crecqc.amount = 0;
            self.crecqc.refer = '';
         }
      };

      self.getCretValues = function() {
         DataService.post('api/shared/ascrentry/creccretinfo',
            { data: self.crecqc, busy: true },
            function(data) {
               if (data) {
                  self.crecqc.amount = data.amount;
                  self.crecqc.refer = data.refer;
               }
            });
      };

      self.validateEndCheckNo = function() {
         if (self.crecqc.begcheckno !== self.crecqc.endcheckno) {
            self.crecqc.amount = 0;
            self.crecqc.refer = "** Range Entered **";
         } else if (self.crecqc.begcheckno > 0 && self.crecqc.endcheckno > 0) {
            self.getCretValues();
         }
      };

      self.revNav = function() {
         if (!self.isQuickClear) {
            $state.go('^.master');
         } else {
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }
      };

      self.quickClear = function() {
         self.crecqc.bankno = base.criteria.banknumber;
         DataService.post('api/shared/ascrentry/crecquickclear',
            { data: self.crecqc, busy: true },
            function(data) {
               if (data) {
                  self.crecqc = data;
                  self.isQuickClear = true;
               }
            });
      };
   });

app.controller('CrecGlDistributionCtrl', function ($scope, $stateParams, $state, DataService, MessageService) {
   var self = this;

   self.selectedTransRecored = $stateParams.transRecord;

   self.subtitle = MessageService.get('global.journal.number') + self.selectedTransRecored.jrnlno + ' | ' + MessageService.get('global.set.number') + self.selectedTransRecored.setno;
});

app.controller('CrecSubTransactionsCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var selectedTransRecored = $stateParams.transRecord;

   if (selectedTransRecored) {
      self.subtitle = MessageService.get('global.journal.number') + selectedTransRecored.jrnlno + ' | ' + MessageService.get('global.set.number') + selectedTransRecored.setno;
   }

   if (selectedTransRecored) {
      if (selectedTransRecored.modulenm.toUpperCase() === 'AP') {
         DataService.get('api/shared/ascrentry/crectransap/' + selectedTransRecored.jrnlno + '/' + selectedTransRecored.setno, {
            busy: true
         }, function (data) {
            if (data) {
               self.apTransDataset = data;
            }
         });
      }
      else if (selectedTransRecored.modulenm.toUpperCase() === 'AR') {
         DataService.get('api/shared/ascrentry/crectransar/' + selectedTransRecored.jrnlno + '/' + selectedTransRecored.setno, {
            busy: true
         }, function (data) {
            if (data) {
               self.arTransDataset = data;
            }
         });
      }
   }

   self.drilldown = function (e, args) {
      self.subTransRecord = args[0].item;
      $state.go('crec.master.apsubtransactions.subtransactionsDetail', { subTransDtlRecord: self.subTransRecord });
   };
});

app.controller('CrecSubTransactionsDetailCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;

   self.subtransDetail = {};
   self.postjrnlset = '';
   self.paidjrnlset = '';
   self.selectedSubTransRecored = $stateParams.subTransDtlRecord;

   // Subtrans details
   self.getsubTransDetails = function (rowid) {
      DataService.get('api/ap/apet/getbyrowid/' + rowid, { busy: true }, function (data) {
         if (data) {
            self.subtransDetail = data;
            self.postjrnlset = data.jrnlno + ' / ' + data.setno;
            self.paidjrnlset = data.pidjrnlno + ' / ' + data.pidsetno;
            if (self.subtransDetail.transcd !== 0 && self.subtransDetail.transcd !== 3 && self.subtransDetail.transcd !== 5) {
               self.subtransDetail.duedt = '';
            }
            var transtm = '';

            if (self.subtransDetail.transtm.length === 4) {
               transtm = self.subtransDetail.transtm.substring(0, 2) + ':' + self.subtransDetail.transtm.substring(2, 4);
            }
            else {
               transtm = self.subtransDetail.transtm;
            }

            var tarnsDate = new Date(self.subtransDetail.transdt);
            self.subtransDetail.lastupdate = self.subtransDetail.operinit + ' ' + ((self.subtransDetail.transdt) ? tarnsDate.toLocaleDateString() : '') + ' ' + transtm;
            self.subtransDetail.amtdue = Number(self.subtransDetail.amount) - Number(self.subtransDetail.paymtamt) - Number(self.subtransDetail.discamt);
            var params = {
               bankno: self.subtransDetail.bankno,
               checkno: self.subtransDetail.checkno,
               ckrectype: 1,
               vendno: self.subtransDetail.vendno,
               fldlist: 'enterdt'
            };
            DataService.get('api/shared/cret/getbyvendno', { params: params, busy: true }, function (cret) {
               if (cret) {
                  self.enterdt = cret.enterdt;
               }
            });
         }
      });
   };

   // Manual address
   self.getManualAddressDetails = function () {
      var params = {
         jrnlno: self.selectedSubTransRecored.jrnlno,
         setno: self.selectedSubTransRecored.setno
      };

      DataService.get('api/ap/apemm/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.subTransManual = data;
         }
      });
   };

   self.getsubTransDetails(self.selectedSubTransRecored.apetrowid);
   self.getManualAddressDetails();
});