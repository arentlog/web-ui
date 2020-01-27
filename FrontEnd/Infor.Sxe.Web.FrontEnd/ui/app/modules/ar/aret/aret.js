'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('ar', 'aret', {
      widgets: ['JOURNAL']
   });
   StateProvider.addMasterState('ar', 'aret');

   $stateProvider.state('aret.master.exchangerate', {
      url: '/exchange-rate',
      params: { exchangeRateUpdateRequest: null, callback: null },
      views: {
         subMaster: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/shared/exchange-rate/exchange-rate.json');
            },
            controller: 'ArExchangeRateCtrl as exch'
         }
      }
   });

   $stateProvider.state('aret.stepTwo', {
      url: '/step-two',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aret/aret-step-two.json');
            },
            controller: 'AretStepTwoCtrl as two'
         }
      }
   });

   $stateProvider.state('aret.stepTwo.manualTermsEntry', {
      url: '/manual-terms-entry',
      views: {
         aretChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aret/manual-terms-entry.json');
            },
            controller: 'AretManualTermsEntryCtrl as mte'
         }
      }
   });

   $stateProvider.state('aret.stepTwo.manualSplitPay', {
      url: '/manual-split-pay',
      views: {
         aretChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aret/manual-split-pay.json');
            },
            controller: 'AretManualSplitPayCtrl as msp'
         }
      }
   });

   $stateProvider.state('aret.creditMemoGrid', {
      url: '/credit-memo-grid',
      params: {
         cmInitiateResponse: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aret/credit-memo-grid.json');
            },
            controller: 'AretCreditMemoGridCtrl as cm'
         }
      }
   });

   $stateProvider.state('aret.gletaGrid', {
      url: '/gleta-grid',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/aret/gleta-grid.json');
            },
            controller: 'AretGletaGridCtrl as gleta'
         }
      }
   });
});

app.controller('AretBaseCtrl', function ($state, DataService, MessageService, Utils, UtilsData) {
   var self = this;

   self.FORTRANSCD_INVOICE = 0;
   self.TRANSCD_INVOICE = 0;
   self.TRANSCD_SERVICECHARGE = 1;
   self.TRANSCD_REBATE = 2;
   self.TRANSCD_UNAPPLIEDCASH = 3;
   self.TRANSCD_CASHONDELIVERY = 4;
   self.TRANSCD_MISCREDIT = 5;
   self.TRANSCD_CREDITMEMO = 6;
   self.TRANSCD_CHECKRECORD = 7;
   self.TRANSCD_DEBITMEMO = 8;
   self.TRANSCD_REVERSAL = 9;

   self.aretListCollection = [];
   self.manualTermsDetail = {};
   self.splitPayCollection = {};
   self.creditMemoCollection = {};
   self.tempSplitPayCollection = {};
   self.tempTermsType = '';
   self.activeStatus = true;
   self.forTransCode = self.FORTRANSCD_INVOICE;
   self.forInvoiceNumber = '0'; //This needs to be a string for the Dynamic Lookup to work.
   self.forInvoiceSuffix = 0;
   self.transCodesForGletaEntry = [self.TRANSCD_INVOICE, self.TRANSCD_SERVICECHARGE, self.TRANSCD_CASHONDELIVERY, self.TRANSCD_MISCREDIT, self.TRANSCD_CHECKRECORD, self.TRANSCD_DEBITMEMO];
   self.invoiceNumberSuffix = '';
   self.aretForNotes = [];
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ar', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      openedCallback: 'base.journalOpened',
      readyCallback: 'base.journalReady',
      criteria: {
         currproc: 'aret',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'ar',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('aret.master');
   };

   self.includesMaster = function () {
      return $state.includes('aret.master');
   };

   self.isStepTwo = function () {
      return $state.is('aret.stepTwo');
   };

   self.isStepTwoManualTerms = function () {
      return $state.is('aret.stepTwo.manualTermsEntry');
   };

   self.isStepTwoManualSplitPay = function () {
      return $state.is('aret.stepTwo.manualSplitPay');
   };

   // Journal opened callback
   self.journalOpened = function (journal) {
      if (journal) {
         self.initiateARET(journal);
      }
   };

   self.journalReady = function () {
      //If in Recovery, don't automatically open another Journal.  (NOTE: This only works with a hard close/open
      //of the browser.  If you refresh or do a cache-refresh, this will not work.)
      if (!self.journalControl.recoveryJournal) {
         self.journalControl.showOpenView();
      }
   };

   self.initiateARET = function (journal) {
      if (self.journal && self.journal.gJrnlno) {
         DataService.get('api/ar/asarentry/aretinitiate/' + journal.gJrnlno, { busy: true }, function (data) {
            self.aret = data;
            self.aret.invsuf = 99;
         });
      }
   };

   self.updateARET = function (aretUpdateRequest, callback) {
      DataService.post('api/ar/asarentry/aretupdate', { data: aretUpdateRequest, busy: true }, function (data) {
         if (data) {
            self.aret = data.arettrans;

            var newAretList = [];
            if (data.aretlist) {
               newAretList = data.aretlist;
            }
            newAretList.dispseq = self.aretListCollection.length;
            newAretList.journalno = self.aret.jrnlno;
            newAretList.setno = self.aret.setno;

            self.aretListCollection.push(newAretList);

            MessageService.processMessaging(data.messaging);


            if (callback) {
               callback();
            }

            //navigate back to the master state and do an ARETInitiate
            self.resetBaseObjects();
            self.initiateARET(self.journal);
            $state.go('^.master');
         }
      });
   };

   self.resetBaseObjects = function () {
      self.manualTermsDetail = {};
      self.splitPayCollection = {};
      self.invoiceNumberSuffix = '';
   };
});

app.controller('AretMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.forTransCdTypes = [];
   self.transCdTypes = [];

   //get the transcdtypes
   DataService.get('api/ar/asarentry/arettranscdload/' + true, function (data) {
      if (data) {
         self.transCdTypes = data;
      }
   });

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         return false;
      } else {
         return true;
      }
   };

   self.invoiceSelected = function () {
      if ($scope.base.aret.forinvno) {
         var fullInvoiceNumber = $scope.base.aret.forinvno;
         var invoiceParts = fullInvoiceNumber.split('-');
         if (invoiceParts.length === 2) {
            $scope.base.forInvoiceNumber = invoiceParts[0];
            $scope.base.forInvoiceSuffix = invoiceParts[1];
         }
      } else {
         $scope.base.forInvoiceNumber = 0;
         $scope.base.forInvoiceSuffix = 0;
      }

   };

   self.transactionRowSelected = function () {
      base.aretForNotes = GridService.getSelectedRecord(base.grid);
   };

   self.continue = function () {
      var params = {
         custno: $scope.base.aret.custno,
         fldlist: 'currencyty'
      };

      DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            if (data.currencyty) {
               self.loadExchangeRate();
            } else {
               self.continueStepOne();
            }
         }
      });
   };

   self.continueStepOne = function () {
      //Clear residual Notes data.
      base.aretForNotes = [];

      if ($scope.base.aret.forinvno) {
         var invoiceParts = $scope.base.aret.forinvno.split('-');
         if (invoiceParts.length === 2) {
            $scope.base.aret.forinvno = invoiceParts[0];
            $scope.base.aret.forinvsuf = invoiceParts[1];
         }
      } else if (!self.isForSectionVisible()) {
         $scope.base.forTransCode = $scope.base.FORTRANSCD_INVOICE;
      }

      $scope.base.aret.appinvno = $scope.base.aret.forinvno;
      $scope.base.aret.appinvsuf = $scope.base.aret.forinvsuf;

      var aretStepOneContinueRequest = {
         aretfortranscdload: self.forTransCdTypes,
         arettranscdload: self.transCdTypes,
         arettrans: $scope.base.aret
      };
      //nested SI call is OK here because there is conditional code that may need to be executed in between
      DataService.post('api/ar/asarentry/aretstep1continuebtn', { data: aretStepOneContinueRequest, busy: true }, function (data) {
         if (data.arettrans) {
            $scope.base.aret = data.arettrans;

            if (!MessageService.processMessaging(data.messaging)) {
               $state.go('aret.stepTwo');
            }
         }
      });
   };

   self.isForSectionVisible = function () {
      if ($scope.base.aret && (
         $scope.base.aret.transcd === $scope.base.TRANSCD_CREDITMEMO ||
         $scope.base.aret.transcd === $scope.base.TRANSCD_DEBITMEMO ||
         $scope.base.aret.transcd === $scope.base.TRANSCD_REVERSAL)) {
         return true;
      } else {
         return false;
      }
   };

   self.transcdChanged = function () {
      DataService.post('api/ar/asarentry/arettranscdvaluechanged', { data: $scope.base.aret, busy: true }, function (data) {
         if (data) {
            self.forTransCdTypes = data.aretfortranscdload;
            $scope.base.aret = data.arettrans;

            //Set the default value so the Lookup works initially.
            $scope.base.forTransCode = $scope.base.aret.fortranscd;
         }
      });
   };

   self.forTranscdChanged = function () {
      DataService.post('api/ar/asarentry/aretfortranscdvaluechanged', { data: $scope.base.aret, busy: true }, function (data) {
         if (data) {
            $scope.base.aret = data;
            $scope.base.forTransCode = $scope.base.aret.fortranscd;
         }
      });
   };

   self.loadExchangeRate = function () {
      if ($scope.base.aret.transcd !== 6 && $scope.base.aret.transcd !== $scope.base.TRANSCD_REVERSAL) {
         var exchangeRate = { functionname: 'aret', custno: $scope.base.aret.custno };
         DataService.post('api/ar/asarentry/arexchrateinitiate', { data: exchangeRate, busy: true }, function (data) {
            if (data) {
               var request = { arececheckdata: {}, areceglobaldata: {}, arecemaindata: {}, arexchrate: data };

               $state.go('aret.master.exchangerate', { exchangeRateUpdateRequest: request, callback: 'mst.exchangeRateCallback' });
            }
         });
      } else if ($scope.base.aret.transcd === $scope.base.TRANSCD_CREDITMEMO ||
         $scope.base.aret.transcd === $scope.base.TRANSCD_CHECKRECORD ||
         $scope.base.aret.transcd === $scope.base.TRANSCD_REVERSAL) {
         self.continueStepOne();
      }
   };

   self.exchangeRateCallback = function (data, continuefl) {
      $scope.base.aret.sExchrate = data.arexchrate.exchrate;
      //only workflow forward if coming from OK
      if (continuefl) {
         self.continueStepOne();
      }
   };

   self.clearStepOne = function () {
      $scope.base.initiateARET($scope.base.journal);
   };
});

app.controller('AretStepTwoCtrl', function ($scope, $state, $stateParams, DataService, MessageService, AuthService, Utils) {
   var self = this;

   //Default it to zero for a Rebate.  It's not a field that can be updated, but it's required.
   if ($scope.base.aret.transcd === $scope.base.TRANSCD_REBATE) {
      $scope.base.invoiceNumberSuffix = '0';
   }

   //User Hook (do not rename)
   self.aretStep2CancelBtnContinue = function () {
      $state.go('aret.master');
   };

   self.back = function () {
      DataService.post('api/ar/asarentry/aretstep2cancelbtn', { data: $scope.base.aret, busy: true }, function (data) {
         if (data) {
            $scope.base.aret = data;
            if (data.transcd === $scope.base.TRANSCD_REVERSAL) {
               $scope.base.aret.invsuf = 0;
            } else {
               $scope.base.aret.invsuf = 99;
            }

            $scope.base.aret.forinvno = $scope.base.forInvoiceNumber + '-' + $scope.base.forInvoiceSuffix;

            if (data.transcd === $scope.base.TRANSCD_REBATE) {
               $scope.base.invoiceNumberSuffix = '0';
            } else {
               $scope.base.invoiceNumberSuffix = '';
            }

            //User Hook (do not rename)
            self.aretStep2CancelBtnContinue();
         }
      });
   };

   self.clear = function () {
      DataService.post('api/ar/asarentry/aretstep2clearbtn', { data: $scope.base.aret, busy: true }, function (data) {
         if (data) {
            $scope.base.aret = data;
            if (data.transcd === $scope.base.TRANSCD_REVERSAL) {
               $scope.base.aret.invsuf = 0;
            } else {
               $scope.base.aret.invsuf = 99;
            }

            if (data.transcd === $scope.base.TRANSCD_REBATE) {
               $scope.base.invoiceNumberSuffix = '0';
            } else {
               $scope.base.invoiceNumberSuffix = '';
            }

            $scope.base.invoiceNumberSuffix = '';

            //User Hook (do not rename)
            if (self.aretStep2ClearBtnContinue) {
               self.aretStep2ClearBtnContinue();
            }
         }
      });
   };

   self.continue = function () {
      if ($scope.base.aret.divnoenabled) {
         DataService.get('api/gl/asglinquiry/gldivisionauthorizationinfo/' + $scope.base.aret.divno, { busy: true }, function (data) {
            if (data && !data.userhassecurity) {
               AuthService.createAuthPoint('aret', '', 'divno', '', '', null, self.divisionAuthPointPassed, null);
            } else {
               self.checkManualTerms();
            }
         });
      } else {
         self.checkManualTerms();
      }
   };

   self.divisionAuthPointPassed = function () {
      self.checkManualTerms();
   };

   self.checkManualTerms = function () {
      if (!self.isManualTermsEntered) {
         self.setManualTerms();
      }
      self.continueStepTwo();
   };

   self.continueStepTwoContinue2 = function () {
      if (($scope.base.transCodesForGletaEntry.indexOf($scope.base.aret.transcd) > -1) ||
         (!$scope.base.aret.lautofl)) {
         //Continue to GLETA entry.
         self.continueStepThree();
      } else {
         $state.go('aret.master');
      }
   };

   self.continueStepTwoContinue1 = function () {
      if ($scope.base.aret.transcd === $scope.base.TRANSCD_CREDITMEMO) {
         self.initiateCreditMemoGrid(self.continueStepTwoContinue2);
      } else {
         self.continueStepTwoContinue2();
      }
   };

   self.continueStepTwo = function () {

      var aretStepTwoContinueRequest = {
         arettrans: $scope.base.aret,
         armanualterms: $scope.base.manualTermsDetail
      };
      DataService.post('api/ar/asarentry/aretstep2continuebtn', { data: aretStepTwoContinueRequest, busy: true }, function (data) {
         if (data.arettrans) {
            $scope.base.aret = data.arettrans;
            $scope.base.invoiceNumberSuffix = $scope.base.aret.invno + '-' + Utils.pad($scope.base.aret.invsuf, 2);

            //For reversals, only present errors (There is a known 'warning' from the backend, and we skip presenting those by design).
            if (($scope.base.aret.transcd === $scope.base.TRANSCD_REVERSAL && !MessageService.processMessagingOnlyReportErrors(data.messaging)) ||
               ($scope.base.aret.transcd !== $scope.base.TRANSCD_REVERSAL && !MessageService.processMessaging(data.messaging))) {

               //No GLETA screen presented for these types, we simply update and take the user back to the main screen.
               if ($scope.base.aret.transcd === $scope.base.TRANSCD_REBATE || $scope.base.aret.lautofl) {

                  var glupdate = {};
                  var glUpdateCollection = [];
                  glUpdateCollection.push(glupdate);

                  var aretUpdateRequest = {
                     aretcm: $scope.base.creditMemoCollection,
                     aretsplitpay: $scope.base.splitPayCollection,
                     glupdate: glUpdateCollection,
                     arettrans: $scope.base.aret
                  };
                  $scope.base.updateARET(aretUpdateRequest, self.continueStepTwoContinue1);
               } else {
                  self.continueStepTwoContinue1();
               }
            }
         }
      });
   };

   self.invoiceSelected = function () {
      var fullInvoiceNumber = $scope.base.invoiceNumberSuffix;
      var invoiceParts = fullInvoiceNumber.split('-');
      if (invoiceParts.length === 2) {
         $scope.base.aret.invno = invoiceParts[0];
         //if user manually enters invoice# add suffix to 99 if it is not reversal invoice.
         $scope.base.aret.invsuf = ($scope.base.aret.transcd !== $scope.base.TRANSCD_REVERSAL) ? 99 : invoiceParts[1];
         if ($scope.base.aret.transcd !== $scope.base.TRANSCD_REVERSAL) {
            $scope.base.invoiceNumberSuffix = $scope.base.aret.invno + '-' + Utils.pad($scope.base.aret.invsuf, 2);
         }
      } else {
         $scope.base.aret.invno = $scope.base.invoiceNumberSuffix;
      }
      if ($scope.base.aret.invno.length > 8) {
         MessageService.alertOk('global.error', 'error.invoice.number.must.be.less.than.or.equal.to.99999999', function () {
            $scope.base.invoiceNumberSuffix = '';
         });
      } else if ($scope.base.aret.transcd === $scope.base.TRANSCD_REVERSAL) {
         if ($scope.base.aret.sExchrate === 0) {
            $scope.base.aret.sExchrate = 1;
         }
         DataService.post('api/ar/asarentry/aretinvnosufvaluechanged', { data: $scope.base.aret, busy: true }, function (data) {
            if (data) {
               $scope.base.aret = data;
               if (!$scope.base.aret.invdt) {
                  $scope.base.aret.invdt = $scope.base.journal.gPostdt;
               }
            }
         });
      }
   };

   self.setManualTerms = function () {
      var aret = $scope.base.aret;
      var newManualTermsDetail = {};

      newManualTermsDetail.tNopays = aret.xtNopays;
      newManualTermsDetail.tAddon1 = aret.xtAddon1;
      newManualTermsDetail.tAddon1 = aret.xtAddon2;
      newManualTermsDetail.tDiscamt = aret.xtDiscamt;
      newManualTermsDetail.tDiscdays = aret.xtDiscdays;
      newManualTermsDetail.tDiscdt = aret.xtDiscdt;
      newManualTermsDetail.tDiscpct = aret.xtDiscpct;
      newManualTermsDetail.tDuedays = aret.xtDuedays;
      newManualTermsDetail.tDuedt = aret.xtDuedt;
      newManualTermsDetail.tFreqdays = aret.xtFreqdays;
      newManualTermsDetail.transcd = aret.transcd;

      $scope.base.manualTermsDetail = newManualTermsDetail;
   };

   self.initiateCreditMemoGrid = function (callback) {
      DataService.get('api/ar/asarentry/aretcminitiate/' + $scope.base.aret.raretid + '/' + $scope.base.aret.amount + '/' + $scope.base.aret.xtDiscamt + '/' + $scope.base.aret.postdt,
         { busy: true }, function (data) {
            if (data) {
               if (data.cWarningMessage) {
                  MessageService.alert(data.cWarningMessage);
               }
               //Take the user to the screen where they enter Amounts for the sequences.  Followed by GLETA.
               $state.go('aret.creditMemoGrid', { cmInitiateResponse: data });
            }
         });
   };

   self.continueStepThree = function () {
      DataService.post('api/ar/asarentry/aretstep3continueauto', { data: $scope.base.aret, busy: true }, function (data) {
         if (data) {
            $scope.base.aret = data;
            $state.go('aret.gletaGrid');
         }
      });
   };

   self.goToManualTerms = function () {
      if (!$scope.base.aret.termstype) {
         MessageService.error('global.error', 'error.terms.type.not.set.up.in.system.table.sastt.403');
      } else {
         $state.go('aret.stepTwo.manualTermsEntry');
      }
   };

   self.goToManualSplitPay = function () {
      if (!$scope.base.aret.termstype) {
         MessageService.error('global.error', 'error.terms.type.not.set.up.in.system.table.sastt.403');
      } else {
         $state.go('aret.stepTwo.manualSplitPay');
      }
   };

   self.termsTypeChanged = function (args) {
      // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
      if (args.value) {
         var sastaParams = {
            codeiden: 't',
            codeval: args.value,
            fldlist: 'nopaymts'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               $scope.base.aret.xtNopays = sasta.nopaymts;
            }
         });
         var manualTermsProcessRequest = {
            arettrans: $scope.base.aret,
            armanualterms: {},
            cAction: 'CREATE'
         };
         DataService.post('api/ar/asarentry/aretmanualtermsprocess', { data: manualTermsProcessRequest, busy: true }, function (data) {
            if (data) {
               $scope.base.aret = data.arettrans;
            }
         });
      }
   };
});

app.controller('AretManualTermsEntryCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;

   //setup manual terms details
   var manualTermsProcessRequest = {
      arettrans: $scope.base.aret,
      armanualterms: {},
      cAction: 'CREATE'
   };
   DataService.post('api/ar/asarentry/aretmanualtermsprocess', { data: manualTermsProcessRequest, busy: true }, function (data) {
      if (data) {
         //not sure if we need this for the H5 app (from WebUI)
         //IsManulTermsProcessed = true;
         $scope.base.aret = data.arettrans;
         $scope.base.manualTermsDetail = data.armanualterms;

         DataService.post('api/ar/asarentry/armanualtermsinitiate', { data: $scope.base.manualTermsDetail, busy: true }, function (data) {
            if (data) {
               $scope.base.manualTermsDetail = data;
            }
         });
      }
   });

   self.recalculateManualTerms = function (type) {
      var manualTermsResetFieldsRequest = { armanualterms: $scope.base.manualTermsDetail, cType: type };
      DataService.post('api/ar/asarentry/armanualtermsresetdiscfields', { data: manualTermsResetFieldsRequest, busy: true }, function (data) {
         if (data) {
            $scope.base.manualTermsDetail = data;
         }
      });
   };

   self.submit = function () {
      DataService.post('api/ar/asarentry/armanualtermsupdate', { data: $scope.base.manualTermsDetail, busy: true }, function (data) {
         $scope.base.manualTermsDetail = data;

         DataService.post('api/ar/asarentry/aretmanualtermsprocess', { data: manualTermsProcessRequest, busy: true }, function (data) {
            if (data) {
               $scope.base.aret = data.arettrans;
               $scope.base.manualTermsDetail = data.armanualterms;
               $scope.two.isManualTermsEntered = true;

               $state.go('^');
            }
         });
      });
   };

   self.cancel = function () {
      //clear out any manual terms data that may have been entered
      $scope.base.manualTermsDetail = {};

      $state.go('^');
   };
});

app.controller('AretManualSplitPayCtrl', function ($scope, $state, $stateParams, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var skipInitialize = false;

   self.splitPayProof = {};
   self.isRecordUpdated = false;

   if (base.splitPayCollection !== {} && base.tempSplitPayCollection !== {}) {
      var results = Utils.deepCompare(base.splitPayCollection, base.tempSplitPayCollection);
      if (results.length === 0) {
         skipInitialize = true;
      }
   }

   if (!skipInitialize || base.aret.termstype != base.tempTermsType) {
      //setup manual terms details
      var splitPayInitiateRequest = {
         aretsplitpay: {},
         aretsplitpayproof: {},
         arettrans: $scope.base.aret
      };
      DataService.post('api/ar/asarentry/aretsplitpayinitiate', { data: splitPayInitiateRequest, busy: true }, function (data) {
         if (data) {
            base.splitPayCollection = data.aretsplitpay;
            var firstSplitPay = base.splitPayCollection[0];
            if (base.splitPayCollection.length > 0 && (firstSplitPay.amount === 0 && base.aret.amount > 0)) {
               base.splitPayCollection[0].amount = base.aret.amount;
            }
            self.splitPayProof = data.aretsplitpayproof;
         }
      });
   }

   self.gridCellChange = function (sender, args) {
      var field = args.column.field;
      if (field === 'amount') {
         var amountSum = Number(0);
         base.splitPayCollection.forEach(function (splitPay) {
            amountSum = Number(amountSum) + Number(splitPay.amount);
            self.amountProof = Number(base.aret.amount) - amountSum;
         });
      } else if (field === 'discamt') {
         var discountSum = Number(0);
         base.splitPayCollection.forEach(function (splitPay) {
            discountSum = Number(discountSum) + Number(splitPay.discamt);
            self.discountProof = Number(base.aret.xtDiscamt) - discountSum;
         });
      }

   };

   self.submit = function () {
      if ($scope.base.splitPayCollection[0].amount === 0) {
         $state.go('^');
      } else {
         var splitPayUpdateRequest = {
            aretsplitpay: $scope.base.splitPayCollection,
            aretsplitpayproof: self.splitPayProof,
            arettrans: $scope.base.aret
         };
         DataService.post('api/ar/asarentry/aretsplitpayupdate', { data: splitPayUpdateRequest, busy: true }, function (data) {
            $scope.base.splitPayCollection = data.aretsplitpay;
            base.tempSplitPayCollection = data.aretsplitpay;
            base.tempTermsType = base.aret.termstype;
            self.splitPayProof = data.aretsplitpayproof;
            self.isRecordUpdated = true;

            $state.go('^');
         });
      }
   };

   self.cancel = function () {
      //if the record has not been updated, then we dont want to push it back incase it gets used unintentionally
      if (self.isRecordUpdated === false) {
         $scope.base.splitPayCollection = {};
      }

      $state.go('^');
   };
});

app.controller('AretCreditMemoGridCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   base.creditMemoCollection = $stateParams.cmInitiateResponse.aretcm;
   self.creditMemoProof = $stateParams.cmInitiateResponse.aretcmproof;

   self.gridCellChanged = function (sender, args) {
      var selectedRecord = base.creditMemoCollection[args.row];

      var field = args.column.field;

      if (field === 'applyamt') {
         if (selectedRecord.applyamt === 0) {
            if (selectedRecord.amount > self.creditMemoProof.amountproof) {
               selectedRecord.applyamt = self.creditMemoProof.amountproof;
            } else {
               selectedRecord.applyamt = selectedRecord.amount;
            }
         }
         if (selectedRecord.discamt === 0) {
            if (selectedRecord.odiscamt > self.creditMemoProof.discproof) {
               selectedRecord.discamt = self.creditMemoProof.discproof;
            } else {
               selectedRecord.discamt = selectedRecord.odiscamt;
            }
         }

         var minAmount = selectedRecord.amount > base.aret.amount ? selectedRecord.amount : base.aret.amount;
         if (selectedRecord.applyamt > minAmount) {
            MessageService.error($translate.instant('error.must.be.less.than.or.equal.to.scheduled.payment.amount'));
         }

         self.creditMemoRowLeave();
      } else if (field === 'discamt') {
         if (selectedRecord.discamt === 0) {
            if (selectedRecord.odiscamt > self.creditMemoProof.discproof) {
               selectedRecord.discamt = self.creditMemoProof.discproof;
            } else {
               selectedRecord.discamt = selectedRecord.odiscamt;
            }
            self.creditMemoRowLeave();
         } else {
            if (selectedRecord.discamt > selectedRecord.applyamt) {
               MessageService.error($translate.instant('message.discount.amount.cannot.be.greater.than.apply.amount'));
            } else {
               self.creditMemoRowLeave();
            }
         }
      }
   };

   self.creditMemoRowLeave = function () {
      var rowLeaveRequest = {
         aretcm: base.creditMemoCollection,
         aretcmproof: self.creditMemoProof,
         arettrans: base.aret
      };
      DataService.post('api/ar/asarentry/aretcmrowleave', { data: rowLeaveRequest, busy: true }, function (data) {
         if (data) {
            base.creditMemoCollection = data.aretcm;
            self.creditMemoProof = data.aretcmproof;
         }
      });
   };

   self.submit = function () {
      var cmUpdateRequest = {
         aretcm: base.creditMemoCollection,
         aretcmproof: self.creditMemoProof,
         arettrans: base.aret
      };
      DataService.post('api/ar/asarentry/aretcmupdate', { data: cmUpdateRequest, busy: true }, function (data) {
         if (data) {
            self.creditMemoProof = data.aretcmproof;
            base.creditMemoCollection = data.aretcm;

            DataService.post('api/ar/asarentry/aretstep3continueauto', { data: base.aret, busy: true }, function (data) {
               if (data) {
                  base.aret = data;

                  $state.go('aret.gletaGrid');
               }
            });
         }
      });
   };

   self.clear = function () {
      self.resetCreditMemoData();
   };

   self.resetCreditMemoData = function () {
      base.creditMemoCollection = {};
      self.creditMemoProof = {};
   };

   self.cancel = function () {
      self.resetCreditMemoData();
      DataService.post('api/ar/asarentry/aretstep3cancelauto', { data: base.aret, busy: true }, function (data) {
         if (data) {
            base.aret = data;

            $state.go('aret.stepTwo');
         }
      });
   };
});

//Alias: gleta
app.controller('AretGletaGridCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService, AuthService) {
   var self = this;
   self.gletaCriteria = {};
   self.gletaParam = {};
   self.gletaHeader = {};
   self.gletaGridCollection = {};
   self.gletaLeaveFieldPayload = {};

   self.gletaGridSelected = function () {
      var record = GridService.getSelectedRecord(self.gletaGrid);
      if (record) {
         self.selectedRecord = record;
         self.accountNumberSave = record.caccount;
      }
   };

   self.setupGletaUpdate = function () {
      DataService.post('api/ar/asarentry/aretgletaupdatesetup', { data: $scope.base.aret, busy: true }, function (data) {
         if (data) {
            self.gletaCriteria = data.gletacriteria;
            self.gletaParam = data.gletaparam;

            var gletaInitiateArRequest = { gletacriteria: self.gletaCriteria, iJrnlno: $scope.base.journal.gJrnlno };
            DataService.post('api/gl/asglentry/gletainitiatear', { data: gletaInitiateArRequest, busy: true }, function (data) {
               if (data) {

                  var numberOfGleta = data.gleta.length - 1;

                  //We can possibly have multiple default GL Accounts (i.e. if Discounts in play).
                  //Need to go descending so we can remove entries and keep the index properly.
                  for (var i = numberOfGleta; i >= 0; i--) {

                     // if there is no default G/L account setup in SASO, etc. then we initialize the GLETA Display
                     // so that the user can enter the appropriate G/L and just click + to Add an account.
                     if (data.gleta[i].caccount === '') {

                        data.gletaheader.proof = data.gletaheader.proof + data.gleta[i].damount;

                        // delete the entry from the collection.
                        data.gleta.splice(data.gleta.indexOf(data.gleta[i]), 1);
                     };
                  }

                  self.gletaGridCollection = data.gleta;
                  self.gletaHeader = data.gletaheader;

                  MessageService.processMessaging(data.messaging);
               }
            });
         }
      });
   };

   //once the function has been defined, we need to call it to get everything set up the first time
   self.setupGletaUpdate();

   self.addAccount = function () {
      ModalService.showModal('ar/aret/gleta-grid-add.json', 'AretGletaGridAddModalCtrl as gletaA', $scope, function (modal) {
         self.newGletaModal = modal;
      });
   };

   self.delete = function () {
      if (self.selectedRecord) {
         self.selectedRecord.caccount = '';
         self.selectedRecord.damount = 0;

         self.gletaLeaveFieldPayload = {
            row: self.selectedRecord,
            eventArgs: {},
            fieldName: 'amount',
            isDelete: true,
            accountSave: self.accountNumberSave //pretty sure we won't need this. we grab it when entering a cell to edit, and save it off incase we need to revert
         };

         var glAccountAuthCriteria = { option1Account: self.selectedRecord.caccount };
         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: glAccountAuthCriteria, busy: true }, function (data) {
            if (data) {
               self.glAcctAuthInfo = data;
               if (!self.authPointManPostFl && data.manpostfl) {
                  AuthService.createAuthPoint('gleta', '', 'manpostfl', '', '', null, self.manualPostAuthPassed, self.manualPostAuthFailed);
               } else {
                  self.gletaChangeAuthPointTwo();
               }
            } else {
               self.gletaChangeAuthPointTwo();
            }
         });
      }
   };

   self.manualPostAuthPassed = function () {
      self.authPointManPostFl = true;
      self.gletaChangeAuthPointTwo();
   };

   self.authFailed = function () {
      if (self.gletaLeaveFieldPayload.row) {
         self.gletaLeaveFieldPayload.row.caccount = self.gletaLeaveFieldPayload.accountSave;
      }
      if (self.gletaLeaveFieldPayload.eventArgs) {
         //not sure we can do this in H5... we'll have to wait and see what kind of hooks we have into the grid editing
         self.gletaLeaveFieldPayload.eventArgs.Cancel = true;
      }
   };

   self.gletaChangeAuthPointTwo = function () {
      if (self.glAcctAuthInfo && !self.glAcctAuthInfo.userhassecurity) {
         AuthService.createAuthPoint('gleta', '', 'account', '', '', null, self.gletaLeaveField, self.authFailed);
      } else {
         self.gletaLeaveField();
      }
   };

   self.gletaLeaveField = function () {
      var gletaLeaveFieldRequest = {
         gleta: self.gletaLeaveFieldPayload.row,
         gletaheader: self.gletaHeader,
         cField: self.gletaLeaveFieldPayload.cFieldName
      };
      DataService.post('api/gl/asglentry/gletafieldleave', { data: gletaLeaveFieldRequest, busy: true }, function (data) {
         if (data) {
            self.gletaHeader = data.gletaheader;
            var selectedIndex = self.gletaGridCollection.indexOf(self.gletaLeaveFieldPayload.row);
            if (selectedIndex > -1) {
               if (self.gletaLeaveFieldPayload.isDelete) {
                  //Delete the current row.
                  self.gletaGridCollection.splice(selectedIndex, 1);
               } else {
                  //Replace the current row.
                  self.gletaGridCollection.splice(selectedIndex, 0, data.gleta);
               }
            }

            MessageService.processMessaging(data.messaging);
         }
      });
   };

   self.convertPercentToAmount = function () {
      if (self.selectedRecord) {
         var convertPercentToAmountRequest = {
            gleta: self.selectedRecord,
            gletaheader: self.gletaHeader,
            cFieldName: 'Convert'
         };
         DataService.post('api/gl/asglentry/gletaconvertpercenttoamount', { data: convertPercentToAmountRequest, busy: true }, function (data) {
            self.amountChangeCallback(self.selectedRecord, data);
         });
      }
   };

   self.amountChangeCallback = function (selectedRow, data) {
      if (data) {
         self.gletaHeader = data.gletaheader;

         selectedRow.damount = data.gleta.damount;
         selectedRow.dcuramount = data.gleta.dcuramount;

         self.gletaGrid.updateRow(selectedRow.iseqno - 1);

         MessageService.processMessaging(data.messaging);
      }
   };

   self.setAmountToProof = function () {
      if (self.selectedRecord) {
         var setAmountToProofRequest = {
            gleta: self.selectedRecord,
            gletaheader: self.gletaHeader,
            cFieldName: 'Set'
         };
         DataService.post('api/gl/asglentry/gletasetamounttoproof', { data: setAmountToProofRequest, busy: true }, function (data) {
            self.amountChangeCallback(self.selectedRecord, data);
         });
      }
   };

   //NOTE: By design, they cannot update the Account Number field.  It's a key and it can be dependent
   //on Auth Points.  If the user needs to change accounts, they are required to delete and re-add
   //an account.

   self.gletaGridCellChange = function (sender, args) {
      var field = args.column.field;
      self.selectedRecord = self.gletaGridCollection[args.row];

      self.gletaLeaveFieldPayload = {
         row: self.selectedRecord,
         eventArgs: args,
         fieldName: field,
         isDelete: false,
         accountSave: self.accountNumberSave //pretty sure we won't need this. we grab it when entering a cell to edit, and save it off incase we need to revert
      };

      var glAcctAuthCriteria = {
         option1Account: self.selectedRecord.caccount
      };
      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: glAcctAuthCriteria, busy: true }, function (data) {
         //returns null if user does not have permissions
         if (data) {
            if (!self.authPointManPostFl && !data.manpostfl) {
               AuthService.createAuthPoint('gleta', '', 'manpostfl', '', '', null, function () {
                  //auth passed
                  self.authPointManPostFl = true;
                  self.gletaGridCellChangeSecondAuthCheck(data);
               }, function () {
                  //auth failed
                  self.selectedRecord.caccount = self.gletaLeaveFieldPayload.accountSave;
               });
            } else {
               self.gletaGridCellChangeSecondAuthCheck(data);
            }
         } else {
            self.gletaGridCellChangeSecondAuthCheck(data);
         }
      });
   };

   self.gletaGridCellChangeSecondAuthCheck = function (glacctauthinfo) {
      if (!self.authPointGlCheck && !glacctauthinfo.userhassecurity) {
         AuthService.createAuthPoint('gleta', '', 'account', '', '', null, function () {
            //auth passed
            self.authPointGlCheck = true;
            self.gletaGridCellChangeContinue();
         }, function () {
            //auth failed
            self.selectedRecord.caccount = self.gletaLeaveFieldPayload.accountSave;
         });
      } else {
         self.gletaGridCellChangeContinue();
      }
   };

   self.gletaGridCellChangeContinue = function () {
      var fieldLeaveRequest = {
         gleta: self.selectedRecord,
         gletaheader: self.gletaHeader,
         cFieldName: self.gletaLeaveFieldPayload.fieldName
      };
      DataService.post('api/gl/asglentry/gletafieldleave', { data: fieldLeaveRequest, busy: true }, function (data) {
         if (data) {
            self.gletaHeader = data.gletaheader;

            var selectedIndex = self.gletaGridCollection.indexOf(self.selectedRecord);
            if (selectedIndex > -1) {
               {
                  self.gletaGridCollection[selectedIndex] = data.gleta;
               }
            }
            MessageService.processMessaging(data.messaging);
         }
      });
   };

   self.continue = function () {
      var gletaGetUpdateDataRequest = {
         gleta: self.gletaGridCollection,
         gletaheader: self.gletaHeader,
         gletaparam: self.gletaParam,
         iJrnlno: $scope.base.journal.gJrnlno
      };
      DataService.post('api/gl/asglentry/gletagetupdatedata', { data: gletaGetUpdateDataRequest, busy: true }, function (data) {
         if (data) {
            var aretUpdateRequest = {
               aretcm: $scope.base.creditMemoCollection,
               aretsplitpay: $scope.base.splitPayCollection,
               glupdate: data,
               arettrans: $scope.base.aret
            };
            $scope.base.updateARET(aretUpdateRequest);
         }
      });
   };

   self.clear = function () {
      self.setupGletaUpdate();
   };

   self.back = function () {
      self.resetGletaData();
      DataService.post('api/ar/asarentry/aretstep3cancelauto', { data: $scope.base.aret, busy: true }, function (data) {
         if (data) {
            $scope.base.aret = data;

            $state.go('aret.stepTwo');
         }
      });
   };

   self.resetGletaData = function () {
      self.gletaHeader = {};
      self.gletaUpdateCollection = {};

      self.setupGletaUpdate();
   };
});

//Controller gets called when the user clicks the 'Add' button on the GLETA screen to add accounts.
//It defaults in the Amount from the proof.
//Alias: gletaA
app.controller('AretGletaGridAddModalCtrl', function ($scope, $translate, $timeout, AuthService, DataService, MessageService, Utils) {
   var self = this;
   var gleta = $scope.gleta;
   self.accountSave = '';
   self.account = '';
   self.amount = gleta.gletaHeader.proof;
   self.gletaHeaderNew = null;
   self.errorMsg = '';
   self.gletaNew = {};
   self.accountName = '';

   self.getNextSequence = function () {
      var iLastSeq = 0;
      if (gleta.gletaGridCollection) {
         gleta.gletaGridCollection.forEach(function (gleta) {
            if (gleta.iseqno > iLastSeq) {
               iLastSeq = gleta.iseqno;
            }
         });
      }
      return iLastSeq + 1;
   };

   //This gets called for both the Account and Amount field changes.  The Account change only gets called after
   //the Auth Points fire.
   self.fieldChangeContinue = function (fieldName) {
      var gletaRecord = {
         caccount: self.account,
         clookup: '',
         cname: '',
         damount: self.amount,
         dcuramount: 0,
         iseqno: 0
      };

      var fieldLeaveRequest = {
         gleta: gletaRecord,
         gletaheader: gleta.gletaHeader,
         cFieldName: fieldName
      };
      DataService.post('api/gl/asglentry/gletafieldleave', { data: fieldLeaveRequest, busy: true }, function (data) {
         if (data) {
            //Save off copies.  If they hit 'OK' then persist, otherwise disregard.
            self.gletaHeaderNew = data.gletaheader;
            self.gletaNew = data.gleta;
            if (fieldName === 'cAccount') {
               self.errorMsg = '';
               //Save it off because the 'Amount' leave field will step on this.
               self.accountName = self.gletaNew.cname;
            }
            MessageService.processMessaging(data.messaging);
         }
      }, function errorCallback(response) {
         if (response.Message && fieldName === 'cAccount') {
            self.errorMsg = response.Message;
         }
      });
   };

   self.fieldChangeSecondAuthCheck = function (glacctauthinfo) {
      if (!self.authPointGlCheck && !glacctauthinfo.userhassecurity) {

         // bug with loading indicator getting stuck after the user enters a bad account number
         // adding timeout gets the loading indicator to turn off
         $timeout(function () {
            AuthService.createAuthPoint('gleta', '', 'account', '', '', null, function () {
               //auth passed
               self.authPointGlCheck = true;
               self.fieldChangeContinue('cAccount');
            }, function () {
               //Nothing to do
            });
         }, 500);
      } else {
         self.fieldChangeContinue('cAccount');
      }
   };

   //The Account field needs separate event so we can trap for the Auth points.
   self.fieldChangeAccount = function () {
      self.errorMsg = '';
      var glAcctAuthCriteria = {
         option1Account: self.account
      };
      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: glAcctAuthCriteria }, function (data) {
         //returns null if user does not have permissions
         if (data) {
            if (!self.authPointManPostFl && !data.manpostfl) {
               AuthService.createAuthPoint('gleta', '', 'manpostfl', '', '', null, function () {
                  //auth passed
                  self.authPointManPostFl = true;
                  self.fieldChangeSecondAuthCheck(data);
               }, function () {
                  //Nothing to do
               });
            } else {
               self.fieldChangeSecondAuthCheck(data);
            }
         } else {
            self.fieldChangeSecondAuthCheck(data);
         }
      });
   };

   self.submit = function () {
      if (self.errorMsg) {
         MessageService.error('global.error', self.errorMsg);
      } else if (self.gletaHeaderNew && self.accountName && self.accountName !== '**Invalid**') {
         gleta.gletaHeader = self.gletaHeaderNew;

         //Overwrite some values;
         self.gletaNew.iseqno = self.getNextSequence();
         self.gletaNew.cname = self.accountName;

         //Add the new one to the collection.
         gleta.gletaGridCollection.push(self.gletaNew);

         gleta.newGletaModal.destroy();
      }
   };

   self.cancel = function () {
      gleta.newGletaModal.destroy();
   };
});
