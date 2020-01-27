'use strict';

app.config(function ($stateProvider, StateProvider) {
   var views = {};

   StateProvider.addTransactionBaseState('ar', 'arece', {
      widgets: [{
         title: 'global.totals',
         icon: '#icon-calculator',
         expanded: true,
         personalize: true,
         contentClass: 'top-padding',
         jsonView: 'ar/arece/totals.json'
      }, 'JOURNAL']
   });
   StateProvider.addMasterState('ar', 'arece');

   views['totals@Arece'] = {
      templateProvider: function (JsonViewService) {
         return JsonViewService.getView('ar/arece/totals.json');
      }
   };

   $stateProvider.state('arece.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arece/detail.json');
            },
            controller: 'AreceDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('arece.detail.addons', {
      url: '/addons',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arece/addons.json');
            }
         }
      }
   });

   $stateProvider.state('arece.detail.codlookup', {
      url: '/cod-lookup?callback',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arece/cod-lookup.json');
            },
            controller: 'AreceCodLookupCtrl as codlu'
         }
      }
   });

   $stateProvider.state('arece.detail.codupdate', {
      url: '/cod-update',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arece/cod-update.json');
            },
            controller: 'AreceCodUpdateCtrl as codupd'
         }
      }
   });

   $stateProvider.state('arece.detail.trans', {
      url: '/transactions',
      params: { selectedInv: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arece/trans.json');
            },
            controller: 'AreceTransCtrl as tr'
         }
      }
   });

   $stateProvider.state('arece.detail.update', {
      url: '/update',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/arece/update.json');
            },
            controller: 'AreceUpdateCtrl as upd'
         }
      }
   });

   $stateProvider.state('arece.detail.writeOff', {
      url: '/write-off?callback',
      params: { requestObject: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/shared/write-off/write-off.json');
            },
            controller: 'ArWriteOffCtrl as wo'
         }
      }
   });

   $stateProvider.state('arece.master.exchangerate', {
      url: '/exchange-rate',
      params: { exchangeRateUpdateRequest: null, callback: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ar/shared/exchange-rate/exchange-rate.json');
            },
            controller: 'ArExchangeRateCtrl as exch'
         }
      }
   });
});

app.controller('AreceBaseCtrl', function ($state, AodataService, ConfigService, DataService, MessageService, Sasc, TabService, UserService, Utils, UtilsData) {
   var self = this;

   var AUTOAPPLY_INVOICETYPE_ALL = '1';
   var AUTOAPPLY_DISCOUNTTYPE_DEFAULT = '1';

   var COD_UPDATE_ACTIONTYPE_NONESELECTED = 0;
   var COD_UPDATE_ACTIONTYPE_POSTREMAINDER = 1;
   var COD_UPDATE_ACTIONTYPE_OVERRIDEPROOF = 2;
   var COD_UPDATE_ACTIONTYPE_RETURNTOINVOICES = 3;

   var MESSAGE_FIELDLABEL_CHECKZERO = 'CheckZero';
   var MESSAGE_FIELDLABEL_APPLYAMOUNTZERO = 'ApplyAmtZero';
   var MESSAGE_FIELDLABEL_OVERSIXTY = 'OverSixty';
   var MESSAGE_FIELDLABEL_CODMCFINALUPDATED = 'codmcfinalupdated';

   var PAGE_INITIATE = 1;

   var STAGE_POSTTYPE = 1;
   var STAGE_FINDTYPE = 2;
   var STAGE_DETAILS = 3;

   // Check if National Programs is turned on
   self.isNationalProgramsOn = AodataService.getValue('PD', 'PDNationalProgramsFl').toLowerCase() === 'yes';

   // Check if Allow Payment Type is turned on
   self.isAllowPaymentType = AodataService.getValue('AR', 'AllowPaymentTypes').toLowerCase() === 'yes';

   self.FINDTYPE_CUSTOMER = '1';
   self.FINDTYPE_LOCKBOX = '2';
   self.FINDTYPE_INVOICE = '3';
   self.FINDTYPE_GROUP = '4';

   self.MESSAGE_MESSAGETYPE_ERROR = 'e';
   self.MESSAGE_MESSAGETYPE_WARNING = 'w';
   self.MESSAGE_MESSAGETYPE_QUESTION_OK_CANCEL = 'qoc';
   self.MESSAGE_MESSAGETYPE_QUESTION_YES_NO = 'qyn';

   self.POSTTYPE_PAYMENT = 'p';
   self.POSTTYPE_SPLITCHECK = 's';
   self.POSTTYPE_APPLYCREDITS = 'a';
   self.POSTTYPE_COD = 'c';
   self.POSTTYPE_MISCCASH = 'm';

   self.INVOICELIST_WEBUIFILTER_INVOICES = 'i';
   self.INVOICELIST_WEBUIFILTER_CREDITS = 'c';
   self.INVOICELIST_WEBUIFILTER_DEBITS = 'd';

   self.authPointGlDivisionSecurity = false;
   self.authPointGlCheckSecurity = false;
   self.authPointManPostFl = false;
   self.authPointProofOverride = false;
   self.codCustomerInvoicesList = [];
   self.codsList = [];
   self.codUpdateActionType = 0;
   self.focusOnCheckno = 0;
   self.focusOnCustomer = 0;
   self.focusOnInvoiceNumber = 0;
   self.focusOnLockbox = 0;
   self.focusOnGroup = 0;
   self.invoicesList = [];
   self.invoicesListDeb = [];
   self.invoicesListCr = [];
   self.invoicesListInv = [];
   self.invoicesOldestCriteria = {};
   self.invoiceTransactionsList = [];
   self.invoiceWriteOffsList = [];
   self.isApplyCreditsMode = false;
   self.isBackActive = false;
   self.isCancelActive = false;
   self.isCodMode = false;
   self.isCodsExpanded = false;
   self.isCodsVisible = false;
   self.isCodTypesShowExcess = false;
   self.isCreditsExpanded = false;
   self.isCreditsVisible = false;
   self.isDebitsExpanded = false;
   self.isDebitsVisible = false;
   self.isFirstScreenActive = true;
   self.isIncludeDisputes = false;
   self.isIncludeCredits = false;
   self.isInitiateViewVisible = false;
   self.isInvoicesExpanded = false;
   self.isInvoicesVisible = false;
   self.isLastScreenActive = false;
   self.isMiscCashExpanded = false;
   self.isMiscCashMode = false;
   self.isMiscCashVisible = false;
   self.isPaymentMode = false;
   self.isSelectionViewVisible = false;
   self.isSplitCheckMode = false;
   self.isViewClosing = false;
   self.lastwoacct = '';
   self.selectedTotal = 0;
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ar', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   //Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      canceledCallback: 'base.journalCanceled',
      openedCallback: 'base.journalOpened',
      readyCallback: 'base.journalReady',
      isCloseDisabled: true,
      isCheckProofVisible: true,
      criteria: {
         currproc: 'arece',
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

   self.miscCashGletaList = [];
   self.newCodData = {};
   self.newDebitMemo = {};
   self.woDataList = [];

   self.buildAreceUpdateScrnCriteria = function () {
      var criteria = {
         //dCustno: self.globalData.custno,
         deUnapplied: self.stringToDecimal(self.mainData.txtproof),
         lSplit: self.globalData.split,
         mCustno: self.globalData.custno,
         dCustno: 0,
         cGroupno: self.globalData.groupno,
         iDivno: self.globalData.divno
      };

      return criteria;
   };

   /**
    * Separates the invoice list into three separate lists for the Invoices, Credits and Debits tabs
    */
   self.buildSubLists = function () {
      self.invoicesListInv = [];
      self.invoicesListCr = [];
      self.invoicesListDeb = [];

      self.invoicesList.forEach(function (record) {
         //The Invoices grid may optionally contain both Invoices and Credits
         if ((record.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_INVOICES) ||
            (self.mainData.showall && record.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_CREDITS)) {
            self.invoicesListInv.push(record);
         }

         if (record.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_CREDITS) {
            self.invoicesListCr.push(record);
         }

         if (record.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_DEBITS) {
            self.invoicesListDeb.push(record);
         }
      });

      //We need to handle the data binding here to ensure the Angular watch fires correctly
      if (self.grid1) {
         self.grid1.loadData(self.invoicesListInv, self.grid1.pager);
      }
      if (self.grid2) {
         self.grid2.loadData(self.invoicesListCr, self.grid2.pager);
      }
      if (self.grid3) {
         self.grid3.loadData(self.invoicesListDeb, self.grid3.pager);
      }
   };

   self.cancelProcessAcceptData = function (response) {
      Utils.replaceObject(self.globalData, response.areceglobaldata);
      Utils.replaceObject(self.mainData, response.arecemaindata);
      Utils.replaceObject(self.checkData, response.arececheckdata);
      Utils.clearArray(self.codCustomerInvoicesList);
      Utils.clearArray(self.invoiceWriteOffsList);
      Utils.clearArray(self.miscCashGletaList);
      Utils.clearArray(self.codsList);
      Utils.clearArray(self.invoicesList);
      Utils.clearArray(self.invoicesListInv);
      Utils.clearArray(self.invoicesListCr);
      Utils.clearArray(self.invoicesListDeb);
      Utils.clearArray(self.woDataList);

      if (self.isViewClosing) {
         //Close tab and automatically close the journal
         TabService.closeTab('arece.master');
         return;
      }

      if (self.globalData.currstage === STAGE_POSTTYPE) {
         self.navigateToSelectPostingType();
      } else if (self.globalData.currstage === STAGE_FINDTYPE) {
         self.navigateToSelectFindType();
      }
   };

   self.cancelProcessSecondCall = function (response) {
      if (self.globalData.currstage === STAGE_DETAILS) {
         var criteria = {
            areceglobaldata: self.globalData,
            arecemaindata: self.mainData,
            arececheckdata: self.checkData
         };

         //Let the backend know that the question was asked.  This is key that they should proceed with cancel of work.
         criteria.arecemaindata.cancelconfasked = true;
         criteria.arecemaindata.cancelconf = true;

         DataService.post('api/ar/asarentry/arececancelprocess', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.cancelProcessAcceptData(data);
            }
         });
      } else {
         self.cancelProcessAcceptData(response);
      }
   };

   /**
    * This gets called when we click the back button.  NOTE:  Some screens require chained multiple calls to the
    * backend for the CancelProcess call.  The user is asked an 'are you sure' type question.
    */
   self.cancelProcess = function () {
      var criteria = {
         areceglobaldata: self.globalData,
         arecemaindata: self.mainData,
         arececheckdata: self.checkData
      };

      DataService.post('api/ar/asarentry/arececancelprocess', { data: criteria, busy: true }, function (data) {
         if (data) {
            var cancelMessage = '';
            var isWarning = false;
            var isError = false;

            if (data.messaging.length) {

               data.messaging.forEach(function (message) {
                  if (message.messagetype === self.MESSAGE_MESSAGETYPE_ERROR) {
                     isError = true;
                  } else if (message.messagetype === self.MESSAGE_MESSAGETYPE_QUESTION_YES_NO) {
                     isWarning = true;
                     cancelMessage = message.messagetxt;
                  }
               });

               if (isError) {
                  MessageService.processMessaging(data.messaging);
                  return;
               } else if (!isWarning) {
                  MessageService.processMessaging(data.messaging);
               }
            }

            //If they have data being updated, give them a warning before cancelling.
            if (isWarning) {
               MessageService.yesNo('global.question', cancelMessage, function () {
                  self.cancelProcessSecondCall(data);
               });
            } else {
               self.cancelProcessAcceptData(data);
            }
         }
      });
   };

   self.clearData = function () {
      //Leave the residual data in these if they already exist.  There is data in these that needs to float between posting work.
      if (!self.globalData) {
         self.globalData = {};
      }
      if (!self.mainData) {
         self.mainData = {};
      }

      if (self.journal) {
         //Initialize these from the journal - the back end does not change these
         self.mainData.txtproofcr = self.journal.sProofcr.toString();
         self.mainData.txtproofdr = self.journal.sProofdr.toString();
         self.mainData.txtprfck = self.journal.gPrfck.toString();
      }

      //Other fields required for Update processing, these need to be clear of residual data.
      self.arexchrateData = {
         exchrate: 1,
         continuefl: true
      };
      self.checkData = {};
      self.gletaCriteria = {};
      self.gletaHeader = {};
      self.glopenjournalCriteria = {};
      self.invoicesData = {};
      self.miscCashData = {
         acctcd: '',
         acctname: ''
      };
      self.updateScreenOutput = {};
      self.updateScreenSingle = {};
      self.updateData = {};

      Utils.clearArray(self.woDataList);
      Utils.clearArray(self.miscCashGletaList);

      self.setFocusFieldPostType();
   };

   //Gets called when we close the Exchange Rate view
   self.exchangeRateCallback = function (data, continuefl) {
      Utils.replaceObject(self.globalData, data.areceglobaldata);
      Utils.replaceObject(self.mainData, data.arecemaindata);
      Utils.replaceObject(self.checkData, data.arececheckdata);
      Utils.replaceObject(self.arexchrateData, data.arexchrate);

      //Called when the User selects OK from the Exchange Rate popup.  If they do so, we
      //will move forward thru the workflow, otherwise stay in the same spot in the workflow.
      if (continuefl) {
         self.mainData.exchrateasked = true;
         self.updateProcess();
      }
   };

   self.includesDetail = function () {
      return $state.includes('arece.detail');
   };

   self.includesMaster = function () {
      return $state.includes('arece.master');
   };

   self.navigateToApplyReceipts = function () {
      self.isInvoicesVisible = false;
      self.isCreditsVisible = false;
      self.isDebitsVisible = false;
      self.isCodsVisible = false;
      self.isMiscCashVisible = false;

      self.isInvoicesExpanded = false;
      self.isCreditsExpanded = false;
      self.isDebitsExpanded = false;
      self.isCodsExpanded = false;
      self.isMiscCashExpanded = false;

      if (self.isApplyCreditsMode) {
         self.isInvoicesVisible = true;
         self.isCreditsVisible = true;
         self.isDebitsVisible = true;
         self.isCreditsExpanded = true;
      } else if (self.isPaymentMode || self.isSplitCheckMode) {
         self.isInvoicesVisible = true;
         self.isCreditsVisible = true;
         self.isDebitsVisible = true;
         self.isInvoicesExpanded = true;
      } else if (self.isCodMode) {
         self.isCodsVisible = true;
         self.isCodsExpanded = true;
      } else if (self.isMiscCashMode) {
         self.isMiscCashVisible = true;
         self.isMiscCashExpanded = true;
      }

      self.isInitiateViewVisible = false;
      self.isSelectionViewVisible = true;
      self.isFirstScreenActive = false;
      self.isLastScreenActive = true;
      self.isBackActive = true;

      if (!self.isDetail()) {
         $state.go('^.detail');
      }
   };

   /**
    * This readies up a new COD in the COD Detail section.  The user can then fill in the
    * invoice, amount, and other data, then click the 'Add' to add it to the grid.
    */
   self.initializeNewCod = function () {
      if (self.globalData) {
         DataService.post('api/ar/asarentry/arececodinitialize', { data: self.globalData, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(self.globalData, data.areceglobaldata);

               //Do not use replaceObject here since we don't want the grid references to be replaced.
               self.newCodData = data.arececoddata;

               self.navigateToApplyReceipts();
            }
         });
      }
   };

   self.initializeNewDebitMemo = function () {
      if (self.globalData && self.invoicesData) {
         var iDebitSeqNo = self.invoicesData.dbtseqno + 1;
         var debitMemo = {
            cono: UserService.getCono(),
            oper: UserService.getUserName(),
            amount: 0,
            dbtdivnoenabled: Sasc.gldivfl,
            dbtcustnoenabled: self.globalData.groupno ? true : false,
            invno: 0,
            divno: self.globalData.divno,
            invsuf: 99,
            disputefl: false,
            invdt: Utils.getCurrentDate(),
            duedt: Utils.getCurrentDate(),
            refer: 'Cash Receipts',
            custno: self.globalData.custno,
            user6: iDebitSeqNo,
            webuifilter: 'd',
            seqno: 0,
            recno: 0
         };

         //Do not use replaceObject here since we don't want the grid references to be replaced.
         self.newDebitMemo = debitMemo;
         self.invoicesData.dbtseqno = iDebitSeqNo + 1;
      }
   };

   self.initializeNewGleta = function () {
      self.newMiscCashGletaData = {
         caccount: '',
         cname: '',
         damount: 0
      };
   };

   self.updateScreenInitialize = function () {
      DataService.post('api/ar/asarentry/areceupdatescrninitialize', { data: self.buildAreceUpdateScrnCriteria(), busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.updateScreenSingle, data);

            //User Hook (do not rename)
            if (self.updateScreenInitializeBeforeNavigation) {
               self.updateScreenInitializeBeforeNavigation();
            }

            //Convert to decimal values so they display correctly in text box
            self.updateScreenSingle.unappliedAmt = self.stringToDecimal(self.updateScreenSingle.txtunapplied);
            self.updateScreenSingle.proofAmt = self.stringToDecimal(self.updateScreenSingle.txtproof);
            $state.go('.update');
         }
      });
   };

   self.invoicesValidateCallback = function (response) {
      if (response) {
         Utils.replaceObject(self.globalData, response.areceglobaldata);
         Utils.replaceObject(self.invoicesData, response.areceinvoicesdata);
         Utils.replaceObject(self.mainData, response.arecemaindata);

         var isWarning = false;
         var warningMessage = '';

         if (response.messaging.length) {
            response.messaging.forEach(function (message) {
               if (message.messagetype === self.MESSAGE_MESSAGETYPE_QUESTION_YES_NO) {
                  isWarning = true;
                  warningMessage = message.messagetxt;
               }
            });
         }

         if (self.invoicesData) {
            //The UpdateScreen asks for more data (i.e. Divisions).  This gets called if we have leftovers that need to be posted to GL.
            if (self.invoicesData.launchupdatescreen) {
               self.updateScreenInitialize();
            } else {
               if (isWarning) {
                  MessageService.yesNo('global.confirmation', warningMessage,
                     function () {
                        self.invoicesData.readytoupdtanswer = true;
                        self.invoicesValidate();
                     },
                     function () {
                        self.invoicesData.readytoupdtanswer = false;
                        self.invoicesValidate();
                     });
               }
            }

            //NOTE: validatecomplete won't be set to true if we still have work we need to do (i.e. proof amount to post)
            //validatesuccess means that we got thru all of the validations and no validation exceptions.
            if (self.invoicesData.validatecomplete && self.invoicesData.validatesuccess) {
               self.updateProcess();
            }
         }
      }
   };

   self.invoicesValidate = function () {
      var criteria = {
         areceglobaldata: self.globalData,
         areceinvoicesdata: self.invoicesData,
         arecemaindata: self.mainData,
         areceupdatescrnoutput: self.updateScreenOutput,
         pvJrnlno: self.journal.gJrnlno
      };

      DataService.post('api/ar/asarentry/areceinvoicesvalidate', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.invoicesValidateCallback(data);
         }
      });
   };

   self.isDetail = function () {
      return $state.is('arece.detail');
   };

   self.isMaster = function () {
      return $state.is('arece.master');
   };

   self.journalCanceled = function () {
      MessageService.info('global.information', 'message.no.valid.journal.number.is.available');
      self.mainInitialize();
   };

   self.journalOpened = function (journal) {
      self.glopenjournalResults = journal;
      self.mainInitialize();
   };

   self.journalReady = function () {
      //Proceed with submission after successful journal open/recovered
      if (!self.journalControl.recoveryJournal) {
         self.journalControl.showOpenView();
      } else {
         self.mainInitialize();
      }
   };

   /**
    * Called when we first go into the function or we want to cancel all work.  The only way that this can
    * be called is if we have a valid journal.
    */
   self.mainInitialize = function () {
      if (self.journal && self.journal.gJrnlno) {

         self.clearData();

         var criteria = {
            arecemaindata: self.mainData,
            areceglobaldata: self.globalData,
            pvJrnlno: self.journal.gJrnlno
         };

         self.isBackActive = false;
         self.isViewClosing = false;
         self.authPointGlDivisionSecurity = false;

         DataService.post('api/ar/asarentry/arecemaininitialize', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(self.globalData, data.areceglobaldata);
               Utils.replaceObject(self.mainData, data.arecemaindata);
               Utils.replaceObject(self.checkData, data.arececheckdata);
               Utils.replaceObject(self.updateData, data.areceupdatedata);

               //Make sure no residual invoices from other processing.
               Utils.clearArray(self.invoiceWriteOffsList);
               Utils.clearArray(self.invoicesList);
               Utils.clearArray(self.invoicesListInv);
               Utils.clearArray(self.invoicesListCr);
               Utils.clearArray(self.invoicesListDeb);

               self.isNewPageSelected = self.globalData.newpageselected;
               if (self.globalData.pageno === 1) {
                  self.isInitiateViewVisible = true;
                  self.isSelectionViewVisible = false;
               } else {
                  self.isInitiateViewVisible = false;
                  self.isSelectionViewVisible = true;
               }

               self.setFocusFieldPostType();
            }
         });
      } else {
         self.clearData();
         self.navigateToSelectPostingType();
      }
   };

   self.moveInvoicesOldestCriteria = function () {
      if (!self.invoicesOldestCriteria) {
         self.invoicesOldestCriteria = {};
      }
      self.invoicesOldestCriteria.creditsoninvscreen = self.mainData.showall;
      self.invoicesOldestCriteria.invtype = self.selectedAutoApplyInvoiceType;
      self.invoicesOldestCriteria.disctype = self.selectedAutoApplyDiscountType;
      self.invoicesOldestCriteria.disputed = self.isIncludeDisputes;
      self.invoicesOldestCriteria.includecredits = self.isIncludeCredits;
   };

   self.navigateToSelectFindType = function () {
      self.setPaymentTypeMode();

      self.setFocusFieldFindType(self.checkData.findtype);

      self.isInitiateViewVisible = true;
      self.isSelectionViewVisible = false;
      self.isFirstScreenActive = false;
      self.isLastScreenActive = false;
      self.isBackActive = true;

      if (!self.isMaster()) {
         $state.go('^.master');
      }
   };

   self.navigateToSelectPostingType = function () {
      self.setFocusFieldPostType();

      self.isInitiateViewVisible = true;
      self.isSelectionViewVisible = false;
      self.isFirstScreenActive = true;
      self.isLastScreenActive = false;
      self.isBackActive = false;

      if (!self.isMaster()) {
         $state.go('^.master');
      }
   };

   /**
    * This merges the result/s from the selected InvoicesList back to the main object
    */
   self.overwriteSelectedInvoiceListToInvoicelist = function (areceinvoiceslist) {
      var idx = 0;

      if (areceinvoiceslist) {
         if (Array.isArray(areceinvoiceslist)) {
            areceinvoiceslist.forEach(function (result) {
               idx = self.invoicesList.findIndex(function (search) {
                  return search.invno === result.invno &&
                     search.invsuf === result.invsuf &&
                     search.seqno === result.seqno &&
                     search.recno === result.recno;
               });

               if (idx >= 0) {
                  Utils.replaceObject(self.invoicesList[idx], result);
               }
            });

            //If processing a single row we can update in place, otherwise rebuild the grids.
            //If performance of 'updateRow' improves in the future we may be able to use that.
            if (areceinvoiceslist.length === 1) {
               self.updateGridRows(areceinvoiceslist[0]);
            } else {
               self.buildSubLists();
            }
         } else {
            idx = self.invoicesList.findIndex(function (search) {
               return search.invno === areceinvoiceslist.invno &&
                  search.invsuf === areceinvoiceslist.invsuf &&
                  search.seqno === areceinvoiceslist.seqno &&
                  search.recno === areceinvoiceslist.recno;
            });

            if (idx >= 0) {
               Utils.replaceObject(self.invoicesList[idx], areceinvoiceslist);
            }

            self.updateGridRows(areceinvoiceslist);
         }
      }
   };

   self.setFocusFieldFindType = function (findType) {
      switch (findType) {
         case self.FINDTYPE_CUSTOMER: //ignore jslint - correct indentation
            self.focusOnCustomer++; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation

         case self.FINDTYPE_INVOICE: //ignore jslint - correct indentation
            self.focusOnInvoiceNumber++; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation

         case self.FINDTYPE_LOCKBOX: //ignore jslint - correct indentation
            self.focusOnLockbox++; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation

         case self.FINDTYPE_GROUP: //ignore jslint - correct indentation
            self.focusOnGroup++; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation

         default: //ignore jslint - correct indentation
            self.focusOnCheckno++; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

   self.setFocusFieldPostType = function () {
      self.focusOnCheckno++;
   };

   self.setPaymentTypeMode = function () {
      if (self.checkData && self.checkData.posttype) {
         self.isApplyCreditsMode = self.checkData.posttype.toLowerCase() === self.POSTTYPE_APPLYCREDITS;
         self.isCodMode = self.checkData.posttype.toLowerCase() === self.POSTTYPE_COD;
         self.isMiscCashMode = self.checkData.posttype.toLowerCase() === self.POSTTYPE_MISCCASH;
         self.isPaymentMode = self.checkData.posttype.toLowerCase() === self.POSTTYPE_PAYMENT;
         self.isSplitCheckMode = self.checkData.posttype.toLowerCase() === self.POSTTYPE_SPLITCHECK;
      }
   };

   self.stringToDecimal = function (value) {
      var decimalValue;

      if (value) {
         decimalValue = parseFloat(value.replace(/,/g, ''));

         if (isNaN(decimalValue)) {
            decimalValue = 0;
         }
      } else {
         decimalValue = 0;
      }
      return decimalValue;
   };

   /**
    * This updates the grid rows for a single entry in the InvoicesList.  A single credit may appear
    * on multiple grids.
    */
   self.updateGridRows = function (areceinvoiceslist) {
      var idx = 0;

      if (areceinvoiceslist) {
         if (self.grid1 && areceinvoiceslist.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_INVOICES) {
            idx = self.invoicesListInv.findIndex(function (search) {
               return search.invno === areceinvoiceslist.invno &&
                  search.invsuf === areceinvoiceslist.invsuf &&
                  search.seqno === areceinvoiceslist.seqno &&
                  search.recno === areceinvoiceslist.recno;
            });

            if (idx >= 0) {
               self.grid1.updateRow(idx);
            }
         } else if ((self.grid1 || self.grid2) && areceinvoiceslist.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_CREDITS) {
            if (self.grid2) {
               idx = self.invoicesListCr.findIndex(function (search) {
                  return search.invno === areceinvoiceslist.invno &&
                     search.invsuf === areceinvoiceslist.invsuf &&
                     search.seqno === areceinvoiceslist.seqno &&
                     search.recno === areceinvoiceslist.recno;
               });

               if (idx >= 0) {
                  self.grid2.updateRow(idx);
               }
            }

            //The Invoices grid may optionally contain both Invoices and Credits
            if (self.mainData.showall && self.grid1) {
               idx = self.invoicesListInv.findIndex(function (search) {
                  return search.invno === areceinvoiceslist.invno &&
                     search.invsuf === areceinvoiceslist.invsuf &&
                     search.seqno === areceinvoiceslist.seqno &&
                     search.recno === areceinvoiceslist.recno;
               });

               if (idx >= 0) {
                  self.grid1.updateRow(idx);
               }
            }
         } else if (self.grid3 && areceinvoiceslist.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_DEBITS) {
            idx = self.invoicesListDeb.findIndex(function (search) {
               return search.invno === areceinvoiceslist.invno &&
                  search.invsuf === areceinvoiceslist.invsuf &&
                  search.seqno === areceinvoiceslist.seqno &&
                  search.recno === areceinvoiceslist.recno;
            });

            if (idx >= 0) {
               self.grid3.updateRow(idx);
            }
         }
      }
   };

   self.convertInvoiceListToRequestOnlyApplied = function () {
      var customerHashSet = [];
      var iLength = self.invoicesList.length;
      var i = 0;
      var invoice = {};

      var results = self.invoicesList.filter(function (item) {
         return ((item.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_INVOICES && (item.applyamt || item.piffl)) ||
            (item.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_DEBITS && item.amount) ||
            (item.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_CREDITS && item.piffl));
      });

      //If no rows are selected, then we need to go thru and create a list of the unique customers across all invoices and
      //try to build out a default list.  We need to send a list of dummy invoices to the backend for each unique customer.
      //If this is a group findtype, then we would have multiple customers being processed.
      if (!results.length) {

         for (i = 0; i < iLength; i++) {
            invoice = self.invoicesList[i];

            if (customerHashSet.indexOf(invoice.custno) === -1) {
               customerHashSet.push(invoice.custno);

               //If it's not a group findtype, then there's no need to keep looking and building.
               if (self.checkData.findtype !== self.FINDTYPE_GROUP) {
                  break;
               }
            }
         }

         //Build out one row for each unique customer.
         var isAnyCustomerFound = false;

         customerHashSet.forEach(function (customerNumber) {
            var isInvoiceFoundForCustomer = false;

            for (i = 0; i < iLength; i++) {
               invoice = self.invoicesList[i];

               if (invoice.custno === customerNumber && invoice.webuifilter.toLowerCase() === self.INVOICELIST_WEBUIFILTER_INVOICES) {
                  results.push(invoice);
                  isInvoiceFoundForCustomer = true;
                  isAnyCustomerFound = true;
                  break;
               }
            }

            //If there happens to be no Invoices for the customer, we still need to create a dummy row with the minimum data.
            if (!isInvoiceFoundForCustomer) {
               isAnyCustomerFound = true;
               results.push({
                  webuifilter: self.INVOICELIST_WEBUIFILTER_INVOICES,
                  custno: customerNumber,
                  cono: UserService.getCono(),
                  oper: UserService.getUserName()
               });
            }
         });

         //If no invoices or credits were found, we still need to create a dummy row.
         if (!isAnyCustomerFound) {
            results.push({
               webuifilter: self.INVOICELIST_WEBUIFILTER_INVOICES,
               custno: self.checkData.custno,
               cono: UserService.getCono(),
               oper: UserService.getUserName()
            });
         }
      }
      return results;
   };

   self.launchExchangeRatePopup = function () {
      var exchangeRate = { functionname: 'arece', custno: self.globalData.custno, currencyty: self.globalData.currencyty };
      DataService.post('api/ar/asarentry/arexchrateinitiate', { data: exchangeRate, busy: true }, function (data) {
         if (data) {
            var request = {
               arececheckdata: self.checkData,
               areceglobaldata: self.globalData,
               arecemaindata: self.mainData,
               arexchrate: data
            };

            $state.go('arece.master.exchangerate', { exchangeRateUpdateRequest: request, callback: 'base.exchangeRateCallback' });
         }
      });
   };

   /**
    * When we're ready to work with Invoices, this makes a backend call to initialize the fields
    * on the 'Auto Apply' section of the screen.  It will give us the initial values along with
    * what fields are visible/hidden (i.e. Credits option).
    */
   self.initializeApplyInvoices = function () {
      if (!self.mainData.showall) {
         self.isIncludeCredits = false;
      }

      self.moveInvoicesOldestCriteria();

      self.initializeNewDebitMemo();

      self.navigateToApplyReceipts();
   };

   self.updateProcessContinueWithResponse = function (response) {
      Utils.replaceObject(self.invoicesData, response.areceinvoicesdata);
      Utils.replaceArray(self.woDataList, response.arecewodata);
      Utils.replaceObject(self.updateData, response.areceupdatedata);
      Utils.replaceObject(self.glopenjournalResults, response.glopenjournalresults);

      if (self.globalData.currstage === STAGE_POSTTYPE) {
         if (self.globalData.newpageselected) {
            self.navigateToSelectPostingType();
            self.mainInitialize();
         }
      } else if (self.globalData.currstage === STAGE_FINDTYPE) {
         if (self.mainData.launchexchrate) {
            self.launchExchangeRatePopup();
         } else {
            self.navigateToSelectFindType();
         }
      } else if (self.globalData.currstage === STAGE_DETAILS) {
         //If accepted 'Yes' from the 'Ready to Update?' question, do the logic.  COD's and Misc Cash don't run the InvoicesValidate.
         if ((self.isCodMode || self.isMiscCashMode) && self.globalData.codmcfinalupdtmode) {
            self.navigateToSelectPostingType();
         }

         if ((self.isCodMode && self.codUpdateActionType === COD_UPDATE_ACTIONTYPE_POSTREMAINDER) &&
            self.globalData.codmcfinalupdtanswer) {
            self.isCodMode = false;
            self.isMiscCashMode = true;

            Utils.replaceObject(self.miscCashData, response.arecemisccashdata);

            //Get us ready to enter data for the Add mode of the Misc Cash GLETA grid.  Setting initial values are important,
            //otherwise the Account Inline won't fire properly.
            self.initializeNewGleta();

            self.navigateToApplyReceipts();
         } else if (self.invoicesData && (self.invoicesData.launchvalidate || self.invoicesData.launchupdatescreen)) {
            self.invoicesValidate();
         } else {
            //We're simply going into Row selection mode (i.e. starting to work on the Invoices, Credits, and Debits)
            Utils.replaceArray(self.invoicesList, response.areceinvoiceslist);
            self.buildSubLists();
            Utils.replaceArray(self.invoiceWriteOffsList, response.areceworeport);

            if (self.isCodMode) {
               //For COD's we might need to stick in the Invoices screen with existing data.  Don't clear if that's the case.
               if (self.codUpdateActionType !== COD_UPDATE_ACTIONTYPE_RETURNTOINVOICES) {
                  Utils.clearArray(self.codsList);
                  self.initializeNewCod();
               }
            } else if (self.isMiscCashMode) {
               Utils.replaceObject(self.miscCashData, response.arecemisccashdata);

               //Get us ready to enter data for the Add mode of the Misc Cash GLETA grid.
               self.initializeNewGleta();

               self.navigateToApplyReceipts();
            } else {
               self.initializeApplyInvoices();
            }
         }
      }
   };

   self.launchCodsUpdatePopup = function () {
      //Give us a nice default value based on the proof.
      if (self.isCodTypesShowExcess) {
         self.codUpdateActionType = COD_UPDATE_ACTIONTYPE_POSTREMAINDER;
      } else {
         self.codUpdateActionType = COD_UPDATE_ACTIONTYPE_OVERRIDEPROOF;
      }

      $state.go('.codupdate');
   };

   /**
   * This gets called when we click the Continue button from the Initiate screen where the fields are entered.
   * They can continue off of the fields related to PostType and they can continue off of the fields related to FindType.
   * This also gets called when they Save from the details page.
   */
   self.updateProcess = function () {
      var criteria = {
         arexchrate: self.arexchrateData,
         areceglobaldata: self.globalData,
         arecemaindata: self.mainData,
         arececheckdata: self.checkData,
         areceupdatedata: self.updateData,
         arecemisccashdata: self.miscCashData,
         areceinvoicesdata: self.invoicesData
      };

      //The Update process gets called for many stages in the process, but if it's called from either the Details
      //page like when we're validating or calling the final update, then only send the invoices that are being processed.
      if (self.globalData.pageno > PAGE_INITIATE) {
         criteria.areceinvoiceslist = self.convertInvoiceListToRequestOnlyApplied();
      } else {
         criteria.areceinvoiceslist = self.invoicesList;
      }

      criteria.arececoddata = self.codsList;
      criteria.gleta = self.miscCashGletaList;
      criteria.arecewodata = self.woDataList;
      criteria.gletacriteria = self.gletaCriteria;
      criteria.gletaheader = self.gletaHeader;
      criteria.glopenjournalcriteria = self.glopenjournalCriteria;
      criteria.glopenjournalresults = self.glopenjournalResults;
      criteria.areceworeport = self.invoiceWriteOffsList;
      criteria.pvCodproofopt = self.codUpdateActionType;
      criteria.pvJrnlno = self.journal.gJrnlno;

      DataService.post('api/ar/asarentry/areceupdateprocess', { data: criteria, busy: true }, function (data) {
         if (data) {
            var isCheckZeroWarning = false;
            var checkWarningMessage = '';
            var isAmountZeroWarning = false;
            var amountZeroWarningMessage = '';
            var isDateSixtyWarning = false;
            var dateSixtyWarningMessage = '';
            var isCodOrMiscCashUpdateQuestion = false;
            var codOrMiscCashUpdateQuestion = '';

            Utils.replaceObject(self.globalData, data.areceglobaldata);
            Utils.replaceObject(self.mainData, data.arecemaindata);
            Utils.replaceObject(self.checkData, data.arececheckdata);

            if (data.messaging.length) {
               var isError = false;
               var isWarning = false;
               var warningMessage = '';

               data.messaging.forEach(function (message) {
                  if (message.messagetype === self.MESSAGE_MESSAGETYPE_ERROR) {
                     isError = true;
                  }

                  if (message.messagetype === self.MESSAGE_MESSAGETYPE_WARNING) {
                     isWarning = true;
                     warningMessage = message.messagetxt;
                  }

                  if (message.messagetype === self.MESSAGE_MESSAGETYPE_QUESTION_OK_CANCEL) {
                     if (message.fieldlabel === MESSAGE_FIELDLABEL_CHECKZERO) {
                        isCheckZeroWarning = true;
                        checkWarningMessage = message.messagetxt;
                     } else if (message.fieldlabel === MESSAGE_FIELDLABEL_APPLYAMOUNTZERO) {
                        isAmountZeroWarning = true;
                        amountZeroWarningMessage = message.messagetxt;
                     }
                  }

                  if (message.messagetype === self.MESSAGE_MESSAGETYPE_QUESTION_YES_NO) {
                     if (message.fieldlabel === MESSAGE_FIELDLABEL_OVERSIXTY) {
                        isDateSixtyWarning = true;
                        dateSixtyWarningMessage = message.messagetxt;
                     } else if (message.fieldlabel === MESSAGE_FIELDLABEL_CODMCFINALUPDATED) {
                        isCodOrMiscCashUpdateQuestion = true;
                        codOrMiscCashUpdateQuestion = message.messagetxt;
                     }
                  }
               });

               if (isWarning) {
                  MessageService.alert('global.warning', warningMessage);
                  self.updateProcessContinueWithResponse(data);
               }

               if (isError) {
                  MessageService.errorMessages(data.messaging);
                  return;
               }

               if (self.checkData.posttype.toLowerCase() !== self.POSTTYPE_APPLYCREDITS && isCheckZeroWarning) {
                  MessageService.okCancel('global.confirmation', checkWarningMessage,
                     function () {
                        self.checkData.checkzeroanswer = true;
                        self.updateProcessContinueWithResponse(data);
                     },
                     function () {
                        self.checkData.checkzeroanswer = false;
                        self.updateProcess();
                     });
               } else if (self.checkData.posttype.toLowerCase() !== self.POSTTYPE_APPLYCREDITS && isAmountZeroWarning) {
                  MessageService.okCancel('global.confirmation', amountZeroWarningMessage,
                     function () {
                        self.checkData.applyamtzeroanswer = true;
                        self.updateProcessContinueWithResponse(data);
                     },
                     function () {
                        self.checkData.applyamtzeroanswer = false;
                        self.updateProcess();
                     });
               } else if (self.checkData.posttype.toLowerCase() === self.POSTTYPE_COD) {
                  var unappliedProof = self.stringToDecimal(self.mainData.txtproof);

                  //If we have over or under applied, we need to ask for a bit more data, present a dialog, otherwise present just the simple question.
                  if (unappliedProof) {
                     self.isCodTypesShowExcess = unappliedProof > 0;

                     self.launchCodsUpdatePopup();
                  } else {
                     MessageService.yesNo('global.question', codOrMiscCashUpdateQuestion,
                        function () {
                           self.codUpdateActionType = COD_UPDATE_ACTIONTYPE_NONESELECTED;
                           self.globalData.codmcfinalupdtanswer = true;
                           self.updateProcess();
                        },
                        function () {
                           self.globalData.codmcfinalupdtasked = false;
                           self.globalData.codmcfinalupdtanswer = false;
                        });
                  }
               } else if (self.checkData.posttype.toLowerCase() === self.POSTTYPE_MISCCASH && isCodOrMiscCashUpdateQuestion) {
                  MessageService.yesNo('global.question', codOrMiscCashUpdateQuestion,
                     function () {
                        self.globalData.codmcfinalupdtanswer = true;
                        self.updateProcess();
                     },
                     function () {
                        self.globalData.codmcfinalupdtasked = false;
                        self.globalData.codmcfinalupdtanswer = false;
                     });
               } else if (isDateSixtyWarning) {
                  MessageService.yesNo('global.question', dateSixtyWarningMessage,
                     function () {
                        self.checkData.oversixtyanswer = true;
                        self.updateProcessContinueWithResponse(data);
                     },
                     function () {
                        self.checkData.oversixtyanswer = false;
                        self.updateProcess();
                     });
               } else {
                  MessageService.processMessaging(data.messaging);
               }
            } else {
               self.updateProcessContinueWithResponse(data);
            }
         }
      });
   };

   self.workflowBack = function () {
      self.cancelProcess();
   };

   self.workflowNext = function () {
      if (self.globalData && self.journalControl.isJournalOpen()) {
         if (self.globalData.currstage >= 1 && self.globalData.currstage <= 3) {
            if (self.checkData.posttype.toLowerCase() === self.POSTTYPE_PAYMENT && self.isAllowPaymentType) {
               if (self.globalData.pymttranscd) {
                  self.updateProcess();
               } else {
                  MessageService.error('global.error', 'message.payment.type.is.required');
               }
            } else {
               self.updateProcess();
            }
         }
      } else {
         MessageService.info('global.information', 'message.a.journal.is.required.please.open.a.journal.befor');
      }
   };

   //Initialization
   self.setPaymentTypeMode();
   self.focusOnCheckno++;
   self.selectedAutoApplyInvoiceType = AUTOAPPLY_INVOICETYPE_ALL;
   self.selectedAutoApplyDiscountType = AUTOAPPLY_DISCOUNTTYPE_DEFAULT;
   //IsUserLoggingOut = false;

   self.onLoadChange = function () {
      var sharedPVRegisteryList = [];
      sharedPVRegisteryList.push({
         pvfunction: 'ar',
         pvsection: 'arece',
         pvsubsection: '',
         pvobject: '',
         pvkeyname: 'BankFromCust',
         pvcharvalue: self.mainData.bankfromcust ? 'yes' : 'no'
      });

      //Busy indicator ommitted to reduce screen flicker
      DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: sharedPVRegisteryList, busy: false }, function () {
      });
   };

   self.onViewChange = function () {
      var sharedPVRegistryList = [];
      sharedPVRegistryList.push({
         pvfunction: 'ar',
         pvsection: 'arece',
         pvsubsection: '',
         pvobject: '',
         pvkeyname: 'ViewCredits',
         pvcharvalue: self.mainData.showall ? 'yes' : 'no'
      });

      //Busy indicator ommitted to reduce screen flicker
      DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: sharedPVRegistryList, busy: false }, function () {
      });
   };
});

app.controller('AreceCodLookupCtrl', function ($scope, $state, $stateParams, Constants, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var callbackFn = Utils.getNestedValue($scope, $stateParams.callback);

   self.subTitle = MessageService.get('global.invoice.number') + Constants.LABEL_DELIMITER +
      base.newCodData.invno + '-' + Utils.pad(base.newCodData.invsuf, 2);

   self.done = function () {
      var record = GridService.getSelectedRecord(self.grid);

      if (record) {
         // Invoke the callback from parent component
         callbackFn(record);

         $state.go('^');
      } else {
         MessageService.info('global.information', 'message.please.select.one.customer.invoice');
      }
   };
});

app.controller('AreceCodUpdateCtrl', function ($scope, $state, AuthService) {
   var self = this;
   var base = $scope.base;

   var AUTH_FUNCTIONNAME_ARECE = 'arece';
   var AUTH_SECTIONNAME_COD = 'COD';
   var AUTH_MODENAME_PROOF = 'proof';

   self.cancel = function () {
      base.globalData.codmcfinalupdtasked = false;
      $state.go('^');
   };

   self.submit = function () {
      if (!base.authPointProofOverride) {
         AuthService.createAuthPoint(AUTH_FUNCTIONNAME_ARECE, AUTH_SECTIONNAME_COD, AUTH_MODENAME_PROOF, '', '', null,
            function () {
               base.authPointProofOverride = true;
               onCodUpdatePopupOkContinue();
            },
            function () {
               base.globalData.codmcfinalupdtasked = false;
            });
      } else {
         onCodUpdatePopupOkContinue();
      }
   };

   /* Private Methods */

   function onCodUpdatePopupOkContinue() {
      $state.go('^');
      base.globalData.codmcfinalupdtanswer = true;
      base.updateProcess();
   }
});

app.controller('AreceMasterCtrl', function ($scope, $state, DataService, MessageService, TabService, Utils, UtilsData) {
   var self = this;
   var base = $scope.base;

   var FIELDCHANGED_POSTTYPE = 'posttype';
   var FIELDCHANGED_FINDTYPE = 'findtype';
   var STAGE_FINDTYPE = 2;
   var STAGE_DETAILS = 3;
   self.banknoDropDownOptions = [];
   self.paymentTypes = [];

   // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getBankNoDropDown(function (dropDownList) {
      self.banknoDropDownOptions = dropDownList;
   });

   //var RECOVERY_STRING = 'isrecovery';
   //var JRNLNO_PROPERTY = 'JournalNumber';
   //var JOURNAL_STATE_PROPERTY = 'JournalState';
   //var SYSTEM = 'ar';

   self.bankNoChanged = function () {
      base.globalData.bankno = base.checkData.bankno;
      base.checkData.savebankno = base.checkData.bankno;
   };

   self.getPaymentTypes = function () {
      DataService.post('api/sa/sastn/getsastnlist', { data: { codeiden: base.POSTTYPE_PAYMENT, fldlist: 'codeval,codeiden,addtaxfl,chkauth,descrip' }, busy: true }, function (data) {
         if (data) {
            data.forEach(function (sastn) {
               if (!sastn.addtaxfl && !sastn.chkauth) {
                  sastn.codeval = sastn.codeval.toString();
                  self.paymentTypes.push(sastn);
               }
            });
         }
      });
   };

   if (base.isAllowPaymentType) {
      self.getPaymentTypes();
   }

   /**
    * This gets called whenever we change some of the fields in the Initiate screen
    * @param {string} fieldName The name of the field being changed
    */
   self.checkFieldChanged = function (fieldName) {
      if (fieldName && base.globalData && base.mainData && base.checkData) {
         var criteria = {
            arececheckdata: base.checkData,
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            cField: fieldName
         };

         DataService.post('api/ar/asarentry/arececheckfieldtrigger', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(base.globalData, data.areceglobaldata);
               Utils.replaceObject(base.mainData, data.arecemaindata);
               Utils.replaceObject(base.checkData, data.arececheckdata);

               if (fieldName === FIELDCHANGED_FINDTYPE) {
                  base.setFocusFieldFindType(base.checkData.findtype);
               } else if (fieldName === FIELDCHANGED_POSTTYPE) {
                  base.setFocusFieldPostType();
               }
            }
         });
      }
   };

   self.postTypeChanged = function () {
      base.checkData.checknoenabled = base.checkData.posttype.toLowerCase() !== base.POSTTYPE_APPLYCREDITS;
      base.checkData.checknovisible = base.checkData.checknoenabled;
      base.checkData.checkno = 0;
      base.checkData.checkamtenabled = base.checkData.posttype.toLowerCase() !== base.POSTTYPE_APPLYCREDITS;
      base.checkData.checkamtvisible = base.checkData.checkamtenabled;
      base.checkData.checkamt = 0;
      base.globalData.posttype = base.checkData.posttype;
      base.globalData.bankfromcust = base.mainData.bankfromcust;
      base.checkData.bankfromcust = base.mainData.bankfromcust;
      base.checkData.banknoenabled = base.checkData.posttype.toLowerCase() === base.POSTTYPE_SPLITCHECK && !base.globalData.bankfromcust;
      if (base.checkData.posttype.toLowerCase() !== base.POSTTYPE_PAYMENT) {
         base.globalData.pymttranscd = '';
      }

      base.setFocusFieldPostType();
   };

   TabService.canUserCloseTab('arece.master', function () {
      base.isViewClosing = true;

      //If in posting the check, we need to close what they are working on and close the journal.
      if (base.journal && base.journal.gJrnlno) {
         if (base.globalData.currstage === STAGE_DETAILS || base.globalData.currstage === STAGE_FINDTYPE) {
            base.cancelProcess();
            return false;
         } else {
            return true;
         }
      } else {
         return true;
      }
   });
});

app.controller('AreceTransCtrl', function ($scope, $state, $stateParams, ConfigService, Constants, DataService, MessageService, OptionSetService, Utils) {
   var self = this;
   self.record = $stateParams.selectedInv;

   var TRANSACTIONS_SEARCH_BOTH = 'b';

   self.amountFormatter = function (row, cell, value) {
      var customDueAmount = 0;
      if (value && self.dataset && self.dataset[row]) {
         if ((self.dataset[row].transcd === 0 || self.dataset[row].transcd === 1 || self.dataset[row].transcd === 2 ||
            self.dataset[row].transcd === 4) && self.dataset[row].statustype) {
            customDueAmount = (self.dataset[row].amount - self.dataset[row].paymtamt - self.dataset[row].discamt + self.dataset[row].pifamt);
         }
         else if ((self.dataset[row].transcd === 3 || self.dataset[row].transcd === 5 || self.dataset[row].transcd === 6) &&
            self.dataset[row].statustype) {
            customDueAmount = (self.dataset[row].amount + self.dataset[row].paymtamt - self.dataset[row].discamt);
         }
         else if ((self.dataset[row].transcd === 11) && self.dataset[row].statustype) {
            customDueAmount = self.dataset[row].amount;
         }
      }
      return customDueAmount;
   };

   self.glijHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.jrnlno) {
         $state.go('glij.detail', { pk: currentRow.jrnlno });
      }
   };

   self.oeioHyperLink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('oeio.detail', { pk: currentRow.invno, pk2: currentRow.invsuf });
      }
   };

   self.referenceFormatter = function (row, cell, value) {
      if (value && self.dataset && self.dataset[row].appinvno) {
         return self.dataset[row].appinvno + '-' + Utils.pad(self.dataset[row].appinvsuf, 2) + ' ' +
            (self.dataset[row].appinvdt ? Utils.formatDate(self.dataset[row].appinvdt) : '');
      } else {
         return value;
      }
   };

   self.referenceTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value) { //ignore jslint - correct indentation
            case 1: //ignore jslint - correct indentation
               return MessageService.get('global.service.charge.number'); //ignore jslint - correct indentation
            case 6: //ignore jslint - correct indentation
               return MessageService.get('global.credit.memo.number'); //ignore jslint - correct indentation
            case 8: //ignore jslint - correct indentation
               return MessageService.get('global.debit.memo.number'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         if (value === 0) {
            return MessageService.get('global.invoice.number');
         } else {
            return value;
         }
      }
   };

   self.statustypeFormatter = function (row, cell, value) {
      if (value && self.dataset && self.dataset[row]) {
         return ((self.dataset[row].transcd === 11 && self.dataset[row].statustype) ? MessageService.get('global.due') :
            self.dataset[row].statustype ? MessageService.get('global.open') : '');
      } else {
         return value;
      }
   };

   self.transactionTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value) {
            case 1: //ignore jslint - correct indentation
               return MessageService.get('global.service.charge'); //ignore jslint - correct indentation
            case 2: //ignore jslint - correct indentation
               return MessageService.get('global.rebate'); //ignore jslint - correct indentation
            case 3: //ignore jslint - correct indentation
               return MessageService.get('global.unapplied.cash'); //ignore jslint - correct indentation
            case 4: //ignore jslint - correct indentation
               return MessageService.get('global.cash.on.delivery'); //ignore jslint - correct indentation
            case 5: //ignore jslint - correct indentation
               return MessageService.get('global.misc.credit'); //ignore jslint - correct indentation
            case 6: //ignore jslint - correct indentation
               return MessageService.get('global.credit.memo'); //ignore jslint - correct indentation
            case 7: //ignore jslint - correct indentation
               return MessageService.get('global.check.record'); //ignore jslint - correct indentation
            case 8: //ignore jslint - correct indentation
               return MessageService.get('global.debit.memo'); //ignore jslint - correct indentation
            case 9: //ignore jslint - correct indentation
               return MessageService.get('global.reversal'); //ignore jslint - correct indentation
            case 11: //ignore jslint - correct indentation
               return MessageService.get('global.sched.payment'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         if (value === 0) {
            return MessageService.get('global.invoice');
         } else {
            return value;
         }
      }
   };

   if (self.record) {
      self.subTitle = MessageService.get('global.invoice.number') + Constants.LABEL_DELIMITER +
         self.record.invno + '-' + Utils.pad(self.record.invsuf, 2);

      if (self.record.custno && self.record.invno) {
         var criteria = {
            recordcountlimit: ConfigService.getDefaultRecordLimit(),
            custno: self.record.custno,
            shipto: self.record.shipto,
            statusselected: TRANSACTIONS_SEARCH_BOTH,
            invoiceno: self.record.invno
         };

         DataService.post('api/ar/asarinquiry/ariccreatetransactions', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.dataset = data.ariccreatetransresults;
            }
         });
      }
   }
});

app.controller('AreceDetailCtrl', function ($scope, $state, AuthService, DataService, GridService, MessageService, Sasoo, Utils) {
   var self = this;
   var base = $scope.base;

   var AUTH_FUNCTIONNAME_ARECE = 'arece';
   var AUTH_SECTIONNAME_DEBITS = 'debits';
   var AUTH_SECTIONNAME_MISCCASH = 'Misc Cash';
   var AUTH_SECTIONNAME_WRITEOFF = 'writeoff';
   var AUTH_MODENAME_DIVISION = 'divno';
   var AUTH_MODENAME_ACCOUNT = 'account';
   var AUTH_MODENAME_MANUALPOSTFLAG = 'manpostfl';
   var COD_DISPLAYCODE_APPLY = 'a';
   var FIELDCHANGED_INVSUF = 'invsuf';
   var GRID_FIELDCHANGED_DIVNO = 'divno';
   var MISCCASH_CONVERTPERCENT = 'Convert';
   var MISCCASH_SETAMOUNT = 'Set';

   /**
    * Called from the COD Customer Invoices Lookup when the user presses OK or Cancel.
    * Pulls the data out of that view and writes it back to our object.
    */
   self.codLookupDoneCallback = function (selectedCustomerInvoice) {
      if (selectedCustomerInvoice) {
         base.newCodData.custno = selectedCustomerInvoice.custno;
         base.newCodData.amount = selectedCustomerInvoice.amount;
         base.newCodData.applyamt = selectedCustomerInvoice.amount;    //Write full amount to applyamt.
         base.newCodData.invdt = selectedCustomerInvoice.invdt;
         base.newCodData.dispcd = COD_DISPLAYCODE_APPLY;

         //We need to make a call to leave now so that the backend call can happen and fill in other data (i.e. shipto)
         self.onCodFieldChange(FIELDCHANGED_INVSUF);
      }
   };

   //ARIC hyperlink
   self.custInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;

      if (record) {
         // Drill down to transactions view
         $state.go('.trans', { selectedInv: record });
      }
   };

   //Determine if the Debits Customer # cell of the grid should be editable
   self.isDebitCustnoEditable = function (row, cell, value, column, item) {
      return item ? item.dbtcustnoenabled : false;
   };

   //Determine if the Debits Division cell of the grid should be editable
   self.isDebitDivnoEditable = function (row, cell, value, column, item) {
      return item ? item.dbtdivnoenabled : false;
   };

   //TODO: Move this to a column condition once available instead of cell by cell
   //Determine if the Credits Discount Amount cell of the grid should be editable
   self.isCreditDiscAmtEditable = function () {
      return base.globalData ? base.globalData.arcrdiscfl : false;
   };

   //Determine if the Invoices Apply Amount cell of the grid should be editable
   self.isInvoiceApplyAmtEditable = function (row, cell, value, column, item) {
      return item ? item.invapplyamtenabled : false;
   };

   //Determine if the Invoices Reference cell of the grid should be editable
   self.isInvoiceReferEditable = function (row, cell, value, column, item) {
      return item ? item.invreferenabled : false;
   };

   //OEIO hyperlink
   self.oeInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('oeio.detail', { pk: currentRow.invno, pk2: currentRow.invsuf });
      }
   };

   //Handle cell changes from the CODs grid
   self.onCodCellChange = function (e, args) {
      if (args) {
         var record = base.codsList[args.row];

         if (record) {
            var criteria = {
               cField: args.column.field,
               lUpdateProofFl: true,
               areceglobaldata: base.globalData,
               arecemaindata: base.mainData,
               arexchrate: base.arexchrateData,
               arececoddata: record
            };

            DataService.post('api/ar/asarentry/arececodleavefield', { data: criteria, busy: true },
               function (data) {
                  if (data) {
                     if (!MessageService.processMessaging(data.messaging)) {
                        //NOTE: The user can't change the Invoice# or Suffix in the grid, so no need to do anything with the Customer Invoice Selector popup.
                        Utils.replaceObject(base.mainData, data.arecemaindata);
                        Utils.replaceObject(base.arexchrateData, data.arexchrate);
                        Utils.replaceObject(record, data.arececoddata);

                        base.grid4.updateRow(args.row);
                     } else {
                        //Error returned in messaging table - back out change
                        base.grid4.updateCell(args.row, args.cell, args.oldValue);
                        //base.grid4.setActiveCell(args.row, args.cell);
                     }
                  }
               },
               //Error returned in cErrorMessage - back out change
               function () {
                  base.grid4.updateCell(args.row, args.cell, args.oldValue);
                  //base.grid4.setActiveCell(args.row, args.cell);
               });
         }
      }
   };

   /**
    * Gets called when we click the 'Add' button from the CODs tab.  This will create a new
    * row in the Grid from the data in the Add section.
    */
   self.onCodDataAdd = function () {
      var idx = base.codsList.findIndex(function (search) {
         return search.invno === base.newCodData.invno &&
            search.invsuf === base.newCodData.invsuf &&
            search.custno === base.newCodData.custno;
      });

      if (idx >= 0) {
         MessageService.error('global.error', 'message.this.invoice.number.suffix.already.exists');
      } else {
         var criteria = {
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            arececoddata: base.newCodData
         };

         DataService.post('api/ar/asarentry/arececodvalidaterow', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(base.mainData, data.arecemaindata);
               Utils.replaceObject(base.newCodData, data.arececoddata);

               if (data.cWarningMessage) {
                  MessageService.alert('global.warning', data.cWarningMessage);
               }

               //Add to COD list
               base.codsList.push(base.newCodData);

               //Setup for next COD
               base.initializeNewCod();
            }
         });
      }
   };

   //This gets called when one of the fields in the top section for Add new COD leaves.
   self.onCodFieldChange = function (fieldName) {
      //Do not fire for Apply Amount or Type changes (will be handled during add validation).
      //We don't want proof updated until we actually add the record to the grid.
      if (fieldName) {
         var criteria = {
            cField: fieldName,
            lUpdateProofFl: false,
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            arececoddata: base.newCodData,
            arexchrate: base.arexchrateData
         };

         DataService.post('api/ar/asarentry/arececodleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  Utils.replaceObject(base.mainData, data.arecemaindata);
                  Utils.replaceObject(base.arexchrateData, data.arexchrate);
                  Utils.replaceObject(base.newCodData, data.arececoddata);

                  Utils.replaceArray(base.codCustomerInvoicesList, data.arececodlookup);

                  if (data.arececoddata && data.arececodlookup.length && data.arececoddata.launchinvlookup) {
                     $state.go('.codlookup', { callback: 'dtl.codLookupDoneCallback' });
                  }
               }
            }
         });
      }
   };

   /**
    * Gets called when we click the 'Delete' button from the COD tab.  This will find selected rows
    * and remove them from the CODs grid.
    */
   self.onCodGridDelete = function () {
      var arececodlistSelected = GridService.getSelectedRecords(base.grid4);

      if (arececodlistSelected && arececodlistSelected.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var criteria = {
               arecemaindata: base.mainData,
               areceglobaldata: base.globalData,
               arececoddata: arececodlistSelected
            };

            DataService.post('api/ar/asarentry/arececoddelete', { data: criteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(base.mainData, data.arecemaindata);

                  arececodlistSelected.forEach(function (record) {
                     //Remove from the Cods list
                     var idx = base.codsList.indexOf(record);
                     if (idx >= 0) {
                        base.codsList.splice(idx, 1);
                     }
                  });
               }
            });
         });
      } else {
         MessageService.info('global.information', 'message.select.cod.rows.to.delete');
      }
   };

   //Handle cell changes from the Debits grid
   self.onDebitCellChange = function (e, args) {
      if (args) {
         var record = base.invoicesListDeb[args.row];

         if (record) {
            //For the Division field, we just do authorization if the field is changed.
            //It isn't a field that needs to do the ARECEDebitLeaveField SI call logic just the Authorization.
            if (args.column.field.toLowerCase() === GRID_FIELDCHANGED_DIVNO) {
               if (!base.authPointGlDivisionSecurity && Sasoo &&
                  (Sasoo.secdivno && Sasoo.secdivno !== args.value)) {
                  AuthService.createAuthPoint(AUTH_FUNCTIONNAME_ARECE, AUTH_SECTIONNAME_DEBITS, AUTH_MODENAME_DIVISION, '', '', null,
                     function () {
                        base.authPointGlDivisionSecurity = true;
                     },
                     function () {
                        base.grid3.updateCell(args.row, args.cell, args.oldValue);
                        base.grid3.setActiveCell(args.row, args.cell);
                     });
               }
            } else {
               var criteria = {
                  cField: args.column.field,
                  areceglobaldata: base.globalData,
                  arecemaindata: base.mainData,
                  areceinvoiceslist: record
               };

               DataService.post('api/ar/asarentry/arecedebitleavefield', { data: criteria, busy: true },
                  function (data) {
                     if (data) {
                        Utils.replaceObject(base.globalData, data.areceglobaldata);
                        Utils.replaceObject(base.mainData, data.arecemaindata);

                        base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
                     }
                  },
                  //Error returned in cErrorMessage - back out change
                  function () {
                     base.grid3.updateCell(args.row, args.cell, args.oldValue);
                     //base.grid3.setActiveCell(args.row, args.cell);
                  });
            }
         }
      }
   };

   self.onDebitDetailAddContinue = function (newMainData, newRecord) {
      Utils.replaceObject(base.mainData, newMainData);

      //Add to Debits list
      base.invoicesListDeb.push(newRecord);

      //Add to master Invoices list
      base.invoicesList.push(newRecord);

      //Setup for next Debit Memo
      base.initializeNewDebitMemo();
   };

   /**
    * Gets called when we click the 'Add' button from the Debits tab.  This will create a new
    * row in the Grid from the data in the Add section.
    */
   self.onDebitDetailAdd = function () {
      //Check for duplicate entries before making SI call.  This allows us to not have to pass
      //the entire invoiceList to the back end.
      var idx = base.invoicesList.findIndex(function (search) {
         return search.invno === base.newDebitMemo.invno &&
            search.invsuf === base.newDebitMemo.invsuf;
      });

      if (idx >= 0) {
         MessageService.error('global.error', 'error.active.invoice.number.already.exists.5341');
      } else {
         var criteria = {
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            areceinvoiceslist: base.newDebitMemo
         };

         DataService.post('api/ar/asarentry/arecedebitvalidate', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (!base.authPointGlDivisionSecurity && Sasoo &&
                  (Sasoo.secdivno && Sasoo.secdivno !== base.newDebitMemo.divno)) {
                  AuthService.createAuthPoint(AUTH_FUNCTIONNAME_ARECE, AUTH_SECTIONNAME_DEBITS, AUTH_MODENAME_DIVISION, '', '', null,
                     function () {
                        base.authPointGlDivisionSecurity = true;
                        self.onDebitDetailAddContinue(data.arecemaindata, data.areceinvoiceslist);
                     }, null);
               } else {
                  self.onDebitDetailAddContinue(data.arecemaindata, data.areceinvoiceslist);
               }
            }
         });
      }
   };

   //This gets called when one of the fields in the top section for Add new Debit Memo leaves.
   self.onDebitFieldChange = function (fieldName) {
      //Do not fire for amount or customer number changes (will be handled during add validation).
      //We don't want proof updated until we actually add the record to the grid.
      if (fieldName) {
         var criteria = {
            cField: fieldName,
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            areceinvoiceslist: base.newDebitMemo
         };

         DataService.post('api/ar/asarentry/arecedebitleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(base.globalData, data.areceglobaldata);
               Utils.replaceObject(base.mainData, data.arecemaindata);

               Utils.replaceObject(base.newDebitMemo, data.areceinvoiceslist);
            }
         });
      }
   };

   /**
    * Gets called when we click the 'Delete' button from the Debits tab.  This will find selected rows
    * and remove them from the Debits grid.
    */
   self.onDebitGridDelete = function () {
      var arecedebitslistSelected = GridService.getSelectedRecords(base.grid3);

      if (arecedebitslistSelected && arecedebitslistSelected.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var criteria = {
               arecemaindata: base.mainData,
               areceinvoiceslist: arecedebitslistSelected
            };

            DataService.post('api/ar/asarentry/arecedebitdelete', { data: criteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(base.mainData, data.arecemaindata);

                  arecedebitslistSelected.forEach(function (record) {
                     //Remove from the Debits list
                     var idx = base.invoicesListDeb.indexOf(record);
                     if (idx >= 0) {
                        base.invoicesListDeb.splice(idx, 1);
                     }

                     //Remove from the master Invoices list
                     idx = base.invoicesList.indexOf(record);
                     if (idx >= 0) {
                        base.invoicesList.splice(idx, 1);
                     }
                  });
               }
            });
         });
      } else {
         MessageService.info('global.information', 'message.select.debit.rows.to.delete');
      }
   };

   //Handle cell changes from the Credits grid
   self.onCreditCellChange = function (e, args) {
      if (args) {
         var record = base.invoicesListCr[args.row];

         if (record) {
            var criteria = {
               pvObject: args.column.field,
               areceglobaldata: base.globalData,
               arecemaindata: base.mainData,
               areceinvoicesdata: base.invoicesData,
               arecewodata: base.woDataList,
               areceworeport: base.invoiceWriteOffsList,
               areceinvoiceslist: record
            };

            DataService.post('api/ar/asarentry/arececreditsfieldleave', { data: criteria, busy: true },
               function (data) {
                  if (data) {
                     Utils.replaceObject(base.globalData, data.areceglobaldata);
                     Utils.replaceObject(base.mainData, data.arecemaindata);
                     Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
                     Utils.replaceArray(base.woDataList, data.arecewodata);
                     Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);

                     base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
                  }
               },
               //Error returned in cErrorMessage - back out change
               function () {
                  base.grid2.updateCell(args.row, args.cell, args.oldValue);
                  //base.grid2.setActiveCell(args.row, args.cell);
               });
         }
      }
   };

   /**
    * This gets called from the Credits Auto Apply button.  This is different from Invoices in that there
    * is no Criteria selection screen for options.
    */
   self.onCreditDetailAutoApply = function () {
      //Load selected records from grid.  If no rows are selected we will work with the entire Credits grid.
      var areceinvoiceslistSelected = GridService.getSelectedRecords(base.grid2);

      var criteria = {
         areceglobaldata: base.globalData,
         arecemaindata: base.mainData,
         areceinvoicesdata: base.invoicesData,
         arecewodata: base.woDataList,
         areceworeport: base.invoiceWriteOffsList,
         areceinvoiceslist: areceinvoiceslistSelected.length ? areceinvoiceslistSelected : base.invoicesListCr
      };

      DataService.post('api/ar/asarentry/arececreditsoldest', { data: criteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(base.mainData, data.arecemaindata);
            Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
            Utils.replaceArray(base.woDataList, data.arecewodata);
            Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);

            base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
         }
      });
   };

   /**
    * This gets called when the "Original Discount" button from the Credits section is called.
    * It only processes rows that are selected.
    */
   self.onCreditDetailOriginalDiscount = function () {
      var areceinvoiceslistSelected = GridService.getSelectedRecords(base.grid2);

      if (areceinvoiceslistSelected.length) {
         var criteria = {
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            areceinvoicesdata: base.invoicesData,
            areceworeport: base.invoiceWriteOffsList,
            areceinvoiceslist: areceinvoiceslistSelected
         };

         DataService.post('api/ar/asarentry/arececreditschooseorigdisc', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(base.mainData, data.arecemaindata);
               Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
               Utils.replaceArray(base.woDataList, data.arecewodata);
               Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);

               base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
            }
         });
      }
   };

   /**
    * Gets called when we click the 'Reset' button from the Credits grid.  This will find selected rows
    * and pass them to the backend to be reset.  We'll update the grid with the reset values.
    */
   self.onCreditDetailReset = function () {
      var areceinvoiceslistSelected = GridService.getSelectedRecords(base.grid2);

      if (areceinvoiceslistSelected.length === 0) {
         MessageService.info('global.information', 'message.select.rows.to.reset');
      } else {
         var message = areceinvoiceslistSelected.length === 1 ? 'question.reset.selected.row' : 'question.reset.selected.rows';
         MessageService.okCancel('global.confirmation', message, function () {
            var criteria = {
               areceglobaldata: base.globalData,
               arecemaindata: base.mainData,
               areceinvoicesdata: base.invoicesData,
               arecewodata: base.woDataList,
               areceworeport: base.invoiceWriteOffsList,
               areceinvoiceslist: areceinvoiceslistSelected
            };

            DataService.post('api/ar/asarentry/arececreditschoosereset', { data: criteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(base.globalData, data.areceglobaldata);
                  Utils.replaceObject(base.mainData, data.arecemaindata);
                  Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
                  Utils.replaceArray(base.woDataList, data.arecewodata);

                  Utils.clearArray(base.invoiceWriteOffsList);

                  base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
               }
            });
         });
      }
   };

   /**
    * Gets called when we auto pop the Invoice Writeoff screen.  This initializes the data.
    * NOTE:  This also gets called from either Credits or Invoices when the user clicks the Writeoff button.
    */
   self.initializeInvoiceWriteOff = function (isCreditMode) {
      var criteria = {
         arecewodata: base.woDataList,
         areceworeport: base.invoiceWriteOffsList
      };

      DataService.post('api/ar/asarentry/arecewoinitialize', { data: criteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(base.woDataList, data.arecewodata);
            Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);
            self.woDisplay = data.arecewodisplay;
            self.writeoffProofAdjustment = data.dProofAdjustment;

            //Unlike GUI, we want to show the Add mode fields by default.  Call this so we get the top fields
            //initialized and enabled/visible properly.
            if (self.woDisplay) {
               var addCriteria = {
                  arecewodata: base.woDataList,
                  areceworeport: base.invoiceWriteOffsList,
                  arecewodisplay: self.woDisplay
               };

               DataService.post('api/ar/asarentry/arecewoadd', { data: addCriteria, busy: true }, function (addData) {
                  if (addData) {
                     var elem = addData.areceworeport.length - 1;

                     // if there is no default G/L account setup in SASO, etc. then we initialize the WO Display so that the user can enter the appropriate G/L and just click + to Add the write-off record
                     if (elem >= 0 & addData.areceworeport[elem].account === '') {
                        addData.arecewodisplay.account = base.lastwoacct;
                        addData.arecewodisplay.acctname = '';
                        addData.arecewodisplay.amount = addData.areceworeport[elem].amount;
                        addData.arecewodisplay.invno = addData.areceworeport[elem].invno;
                        addData.arecewodisplay.invsuf = addData.areceworeport[elem].invsuf;
                        addData.arecewodisplay.proof = addData.areceworeport[elem].amount;
                        // delete the entry with no G/L default
                        addData.areceworeport.pop();
                     };

                     Utils.replaceArray(base.woDataList, addData.arecewodata);
                     Utils.replaceArray(base.invoiceWriteOffsList, addData.areceworeport);
                     Utils.replaceObject(self.woDisplay, addData.arecewodisplay);

                     //Need to copy the objects here so they are not updating from withing the writeoffs view (reference)
                     var requestObj = {
                        globaldata: base.globalData,
                        maindata: base.mainData,
                        invoiceslistselected: isCreditMode ? angular.copy(GridService.getSelectedRecords(base.grid2)) : null,
                        invoicesdata: base.invoicesData,
                        arecewodata: angular.copy(base.woDataList),
                        areceworeport: angular.copy(base.invoiceWriteOffsList),
                        arecewodisplay: angular.copy(self.woDisplay),
                        iscreditmode: isCreditMode,
                        authpointmanpostfl: false,
                        authpointglchecksecurity: false,
                        writeoffproofadjustment: self.writeoffProofAdjustment,
                        isInquiry: false
                     };

                     $state.go('.writeOff', { requestObject: requestObj, callback: 'dtl.writeOffDoneCallback' });
                  }
               });
            }
         }
      });
   };

   self.onCreditDetailWriteoff = function () {
      var invoicesSelected = GridService.getSelectedRecords(base.grid2);

      if (!invoicesSelected.length) {
         MessageService.info('global.information', 'message.select.rows.to.write.off');
      } else {
         var criteria = {
            areceglobaldata: base.globalData,
            arecewodata: base.woDataList,
            areceinvoiceslist: invoicesSelected
         };

         DataService.post('api/ar/asarentry/arececreditschoosewriteoff', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(base.woDataList, data.arecewodata);

               base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);

               if (data.pvLaunchWriteOff) {
                  self.initializeInvoiceWriteOff(true);
               }
            }
         });
      }
   };
   self.onGridRowSelected = function () {
      base.selectedTotal = 0;
      var invoicesSelected = base.grid1 ? GridService.getSelectedRecords(base.grid1) : [];
      var creditsSelected = base.grid2 ? GridService.getSelectedRecords(base.grid2) : [];
      var debitsSelected = base.grid3 ? GridService.getSelectedRecords(base.grid3) : [];
      var rowsSelected = invoicesSelected.concat(creditsSelected, debitsSelected);
      for (var i = 0; i < rowsSelected.length; i++) {
         var invoice = rowsSelected[i];
         base.selectedTotal += invoice.amount;
      }
   };
   //Handle cell changes from the Invoices grid
   self.onInvoiceCellChange = function (e, args) {
      if (args) {
         var record = base.invoicesListInv[args.row];

         if (record) {
            var criteria = {
               pvField: args.column.field,
               areceglobaldata: base.globalData,
               arecemaindata: base.mainData,
               areceinvoicesdata: base.invoicesData,
               areceworeport: base.invoiceWriteOffsList,
               areceinvoiceslist: record
            };

            DataService.post('api/ar/asarentry/areceinvoicesfieldleave', { data: criteria, busy: true },
               function (data) {
                  if (data) {
                     Utils.replaceObject(base.globalData, data.areceglobaldata);
                     Utils.replaceObject(base.mainData, data.arecemaindata);
                     Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
                     Utils.replaceArray(base.woDataList, data.arecewodata);

                     base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);

                     if (data.pvLaunchWriteOff) {
                        Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);
                        self.initializeInvoiceWriteOff(false);
                     }
                  }
               },
               //Error returned in cErrorMessage - back out change
               function () {
                  base.grid1.updateCell(args.row, args.cell, args.oldValue);
                  //base.grid1.setActiveCell(args.row, args.cell);
               });
         }
      }
   };

   self.onInvoiceDetailAddons = function () {
      var record = GridService.getSelectedRecord(base.grid1);

      if (record) {
         self.addonSubTitle = MessageService.get('global.order.number') + ': ' +
            record.invno + '-' + Utils.pad(record.invsuf, 2);

         var params = {
            orderno: record.invno,
            ordersuf: record.invsuf,
            fillmode: false
         };

         self.oeeh = DataService.getResource('api/oe/oeeh/getbypk', { params: params, busy: true });

         $state.go('.addons');
      } else {
         MessageService.info('global.information', 'message.select.row.to.view.addons');
      }
   };

   /**
    * Gets called when we hit the 'Apply' button from the Auto-Apply section of the Invoices.
    * It makes a call to the backend to apply the Payment to Invoices.
    */
   self.onInvoiceDetailAutoApply = function () {

      var proof = base.stringToDecimal(base.mainData.txtproof);

      if (proof <= 0) {
         var message = proof < 0 ? MessageService.get('error.proof.amount.cannot.be.negative.5354') : MessageService.get('error.amount.to.apply.cannot.be.zero.5355');
         MessageService.error('global.error', message);
         return false;
      }

      base.moveInvoicesOldestCriteria();

      //Load selected records from grid.  If no rows are selected we will work with the entire grid.

      var areceinvoiceslistSelected = GridService.getSelectedRecords(base.grid1);

      var invoicesList = [];

      invoicesList = areceinvoiceslistSelected.length ? areceinvoiceslistSelected : base.invoicesListInv;     // Note - need to use the sorted list when they do not select any rows

      /* Sort the invoices in the order listed in the grid. The user can sort on any column in the grid in ascending/descending order.
         Since the primary index for areceinvoiceslist is k-invoice causing the auto-apply logic to always sort by invoice number we will use the filter field to sort since since it
         is not used in the SI call or H5 ARECE at this time. We will restore it's value there once we auto apply */
      var invoicesListSorted = [];
      var sortSeqno = 9999;

      invoicesList.forEach(function (invoiceRecord) {
         invoiceRecord.filter = sortSeqno.toString(10) + '|' + invoiceRecord.filter;  // filter is sorted in descending order in the primary k-invoice index
         sortSeqno--;
         invoicesListSorted.push(invoiceRecord);
      });

      var criteria = {
         areceglobaldata: base.globalData,
         arecemaindata: base.mainData,
         areceinvoicesdata: base.invoicesData,
         areceinvoicesoldestcriteria: base.invoicesOldestCriteria,
         arecewodata: base.woDataList,
         areceworeport: base.invoiceWriteOffsList,
         areceinvoiceslist: invoicesListSorted
      };

      DataService.post('api/ar/asarentry/areceinvoicesoldestok', { data: criteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(base.mainData, data.arecemaindata);
            Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
            Utils.replaceArray(base.woDataList, data.arecewodata);
            Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);

            base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
         }
      });
   };

   /**
    * Gets called when we hit the 'Original Discount' button from the Invoice grid.
    * It finds and processes only the selected Invoices.
    */
   self.onInvoiceDetailOriginalDiscount = function () {
      var areceinvoiceslistSelected = GridService.getSelectedRecords(base.grid1);

      if (areceinvoiceslistSelected.length) {
         var criteria = {
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            areceinvoicesdata: base.invoicesData,
            areceworeport: base.invoiceWriteOffsList,
            areceinvoiceslist: areceinvoiceslistSelected
         };

         DataService.post('api/ar/asarentry/areceinvoiceschooseorigdisc', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(base.mainData, data.arecemaindata);
               Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
               Utils.replaceArray(base.woDataList, data.arecewodata);
               Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);

               base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
            }
         });
      }
   };

   /**
    * Gets called when we hit the 'Paid In Full' button from the Invoices Grid.
    * It finds and processes only the selected Invoices.
    */
   self.onInvoiceDetailPaidInFull = function () {
      var areceinvoiceslistSelected = GridService.getSelectedRecords(base.grid1);

      if (areceinvoiceslistSelected.length === 0) {
         MessageService.info('global.information', 'message.select.rows.to.pay.in.full');
      } else {
         //Note: Not providing a warning anymore
         var criteria = {
            areceglobaldata: base.globalData,
            arecemaindata: base.mainData,
            areceinvoicesdata: base.invoicesData,
            arecewodata: base.woDataList,
            areceworeport: base.invoiceWriteOffsList,
            areceinvoiceslist: areceinvoiceslistSelected
         };

         DataService.post('api/ar/asarentry/areceinvoicespifbutton', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(base.globalData, data.areceglobaldata);
               Utils.replaceObject(base.mainData, data.arecemaindata);
               Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
               Utils.replaceArray(base.woDataList, data.arecewodata);
               Utils.replaceArray(base.invoiceWriteOffsList, data.areceworeport);

               base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);

               //Unselect all rows
               base.grid1.unSelectAllRows();
            }
         });
      }
   };

   //Gets called when we click the 'Reset' button from the Invoices grid.  This will find selected rows
   //and pass them to the backend to be reset.  We'll update the grid with the reset values.
   self.onInvoiceDetailReset = function () {
      var areceinvoiceslistSelected = GridService.getSelectedRecords(base.grid1);

      if (areceinvoiceslistSelected.length === 0) {
         MessageService.info('global.information', 'message.select.rows.to.reset');
      } else {
         var message = areceinvoiceslistSelected.length === 1 ? 'question.reset.selected.row' : 'question.reset.selected.rows';
         MessageService.okCancel('global.confirmation', message, function () {
            var criteria = {
               areceglobaldata: base.globalData,
               arecemaindata: base.mainData,
               areceinvoicesdata: base.invoicesData,
               areceworeport: base.invoiceWriteOffsList,
               areceinvoiceslist: areceinvoiceslistSelected
            };

            DataService.post('api/ar/asarentry/areceinvoiceschoosereset', { data: criteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(base.globalData, data.areceglobaldata);
                  Utils.replaceObject(base.mainData, data.arecemaindata);
                  Utils.replaceObject(base.invoicesData, data.areceinvoicesdata);
                  Utils.replaceArray(base.woDataList, data.arecewodata);

                  Utils.clearArray(base.invoiceWriteOffsList);

                  base.overwriteSelectedInvoiceListToInvoicelist(data.areceinvoiceslist);
               }
            });
         });
      }
   };

   //Called when the user clicks the Writeoff button from the Invoices screen
   self.onInvoiceDetailWriteoff = function () {
      var invoicesSelected = GridService.getSelectedRecords(base.grid1);

      if (!invoicesSelected.length) {
         MessageService.info('global.information', 'message.select.rows.to.write.off');
      } else {
         var selectedRow = invoicesSelected[0];
         if (selectedRow) {
            if (!selectedRow.piffl || selectedRow.amount === selectedRow.applyamt) {
               MessageService.info('global.information', 'message.write.off.not.necessary.must.be.pif.and.amount.less.than.');
            } else {
               var params = {
                  orderno: selectedRow.invno,
                  ordersuf: selectedRow.invsuf,
                  fillmode: false,
                  fldlist: 'consolorderno'
               };

               //Determine if an order exists for the invoice with a consolidated order matching the order #.
               DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
                  if (data && data.consolorderno > 0 && data.consolorderno === data.orderno) {
                     MessageService.info('global.information', 'message.write.off.not.allowed.against.a.consolidated.invoi');
                  } else if (base.invoicesData) {
                     var criteria = {
                        areceglobaldata: base.globalData,
                        arecemaindata: base.mainData,
                        areceinvoicesdata: base.invoicesData,
                        areceworeport: base.invoiceWriteOffsList,
                        areceinvoiceslist: selectedRow
                     };

                     DataService.post('api/ar/asarentry/areceinvoiceschoosewriteoff', { data: criteria, busy: true }, function (response) {
                        if (response) {
                           Utils.replaceObject(base.invoicesData, response.areceinvoicesdata);
                           Utils.replaceArray(base.woDataList, response.arecewodata);

                           base.overwriteSelectedInvoiceListToInvoicelist(response.areceinvoiceslist);

                           //NOTE: The backend call doesn't let us go back into the Writeoff screen in maintenance mode.  It works this way in GUI too.
                           if (response.pvLaunchWriteOff) {
                              self.initializeInvoiceWriteOff(false);
                           } else {
                              MessageService.info('global.information', 'message.the.write.off.entry.cannot.be.accessed.in.change.m');
                           }
                        }
                     });
                  }
               });
            }
         }
      }
   };

   self.miscCashGletaLeaveField = function (record, fieldName, row) {
      var criteria = {
         cField: fieldName,
         arecemisccashdata: base.miscCashData,
         gleta: record
      };

      DataService.post('api/ar/asarentry/arecemisccashgletaleavefield', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               Utils.replaceObject(base.miscCashData, data.arecemisccashdata);
               Utils.replaceObject(record, data.gleta);

               base.grid5.updateRow(row);
            }
         }
      });
   };

   //Handle cell changes from the Misc Cash grid
   self.onMiscCashCellChange = function (e, args) {
      if (args) {
         var record = base.miscCashGletaList[args.row];

         if (record) {
            self.miscCashGletaLeaveField(record, args.column.field, args.row);
         }
      }
   };

   /**
    * Called from GLETA fields in the Add section of the Misc Cash tab.  This is fields such as 'Account' and 'Amount'.
    * @param {string} fieldName The name of the field being changed
    */
   self.onMiscCashGletaFieldChange = function (fieldName) {
      if (fieldName && base.newMiscCashGletaData && base.newMiscCashGletaData.caccount) {
         var criteria = {
            cField: fieldName,
            arecemisccashdata: base.miscCashData,
            gleta: base.newMiscCashGletaData
         };

         DataService.post('api/ar/asarentry/arecemisccashgletaleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  Utils.replaceObject(base.miscCashData, data.arecemisccashdata);
                  Utils.replaceObject(base.newMiscCashGletaData, data.gleta);
               }
            }
         });
      } else if (fieldName === MISCCASH_CONVERTPERCENT || fieldName === MISCCASH_SETAMOUNT) {
         MessageService.info('global.information', 'message.a.valid.general.ledger.account.is.required');
      }
   };

   self.onMiscCashGletaGridConvertPercent = function () {
      var selectedGleta = GridService.getSelectedRecord(base.grid5);

      if (selectedGleta) {
         var idx = base.miscCashGletaList.indexOf(selectedGleta);
         if (idx >= 0) {
            self.miscCashGletaLeaveField(selectedGleta, MISCCASH_CONVERTPERCENT, idx);
         }
      } else {
         MessageService.info('global.information', 'message.select.one.row.to.convert.percent.to.amount');
      }
   };

   /**
    * Gets called when we click the 'Delete' button from the Misc Cash tab.  This will find selected rows
    * and remove them from the grid.
    */
   self.onMiscCashGletaGridDelete = function () {
      var miscCashGletaListSelected = GridService.getSelectedRecords(base.grid5);

      if (miscCashGletaListSelected && miscCashGletaListSelected.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var criteria = {
               arecemisccashdata: base.miscCashData,
               gleta: miscCashGletaListSelected
            };

            DataService.post('api/ar/asarentry/arecemisccashgletadelete', { data: criteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(base.miscCashData, data.arecemisccashdata);

                  miscCashGletaListSelected.forEach(function (record) {
                     //Remove from the GL Distribution list
                     var idx = base.miscCashGletaList.indexOf(record);
                     if (idx >= 0) {
                        base.miscCashGletaList.splice(idx, 1);
                     }
                  });
               }
            });
         });
      } else {
         MessageService.info('global.information', 'message.select.miscellaneous.cash.rows.to.delete');
      }
   };

   self.onMiscCashGletaGridSetAmount = function () {
      var selectedGleta = GridService.getSelectedRecord(base.grid5);

      if (selectedGleta) {
         var idx = base.miscCashGletaList.indexOf(selectedGleta);
         if (idx >= 0) {
            self.miscCashGletaLeaveField(selectedGleta, MISCCASH_SETAMOUNT, idx);
         }
      } else {
         MessageService.info('global.information', 'message.select.one.row.to.set.amount.equal.to.proof');
      }
   };


   /**
    * There are a couple of fields that are considered the MiscCash Header fields that will be applied
    * to all postings during the update.  This handles change events on those.  (i.e. Cash GL Account
    * and Reference).
    * @param {string} fieldName The name of the field being changed
    */
   self.onMiscCashHeaderFieldChange = function (fieldName) {
      if (fieldName) {
         var criteria = {
            cField: fieldName,
            arecemisccashdata: base.miscCashData
         };

         DataService.post('api/ar/asarentry/arecemisccashleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               Utils.replaceObject(base.miscCashData, data);
            }
         });
      }
   };

   self.onMiscCashNewGletaAddContinue = function () {
      //Add to GL Distribution list
      base.miscCashGletaList.push(base.newMiscCashGletaData);

      //Get us ready to enter data for the Add mode of the Misc Cash GLETA grid.
      base.initializeNewGleta();
   };

   self.onMiscCashNewGletaAddContinueAuthPoint2 = function (glacctauthinfo) {
      //Once it passes once, don't pop it again.
      if (!base.authPointGlCheckSecurity && glacctauthinfo && !glacctauthinfo.userhassecurity) {
         AuthService.createAuthPoint(AUTH_FUNCTIONNAME_ARECE, AUTH_SECTIONNAME_MISCCASH, AUTH_MODENAME_ACCOUNT, '', '', null,
            function () {
               base.authPointGlCheckSecurity = true;
               self.onMiscCashNewGletaAddContinue();
            });
      } else {
         self.onMiscCashNewGletaAddContinue();
      }
   };

   self.validateMiscCashNewGleta = function () {
      var isValid = false;

      if (!base.newMiscCashGletaData) {
         MessageService.error('global.error', 'message.there.is.a.problem.adding.the.miscellaneous.cash');
      } else if (!base.newMiscCashGletaData.caccount) {
         MessageService.error('global.error', 'message.a.valid.general.ledger.account.is.required');
      } else if (!base.miscCashData.acctcd) {
         MessageService.error('global.error', 'message.a.valid.general.ledger.cash.account.is.required');
      } else {
         isValid = true;
      }

      return isValid;
   };

   /**
    * Gets called when we click the 'Add' button from the Misc Cash tab.  This will create a new
    * row in the Grid from the data in the Add section.
    */
   self.onMiscCashNewGletaAdd = function () {
      if (self.validateMiscCashNewGleta()) {
         var authCriteria = {
            option1Account: base.newMiscCashGletaData.caccount
         };

         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: authCriteria, busy: true }, function (data) {
            if (data) {
               if (!base.authPointManPostFl && !data.manpostfl) {
                  //NOTE:  Yes, this truly is a SectionName of 'writeoff', even though its from Misc Cash.  The AuthPoint is shared between the 2 places.
                  AuthService.createAuthPoint(AUTH_FUNCTIONNAME_ARECE, AUTH_SECTIONNAME_WRITEOFF, AUTH_MODENAME_MANUALPOSTFLAG, '', '', null,
                     function () {
                        base.authPointManPostFl = true;
                        self.onMiscCashNewGletaAddContinueAuthPoint2(data);
                     });
               } else {
                  self.onMiscCashNewGletaAddContinueAuthPoint2(data);
               }
            }
         });
      }
   };

   /**
    * Determine if the Credits grid Original Discount button should be enabled
    * @returns {Boolean} Returns 'true' if the button should be enabled
    */
   self.showCreditDetailGridDiscountButton = function () {
      var isEnabled = false;
      var records = GridService.getSelectedRecords(base.grid2);

      if (records && records.length) {
         var idx = records.findIndex(function (search) {
            return search.discamt !== search.odiscamt;
         });

         if (idx >= 0) {
            isEnabled = true;
         }
      }
      return isEnabled;
   };

   /**
    * Determine if the Invoices grid Addons button should be enabled
    * @returns {Boolean} Returns 'true' if the button should be enabled
    */
   self.showInvoiceDetailGridAddonsButton = function () {
      var isEnabled = false;
      var record = GridService.getSelectedRecord(base.grid1);

      if (record) {
         isEnabled = record.invaddonsenabled;
      }
      return isEnabled;
   };

   /**
    * Determine if the Invoices grid Original Discount button should be enabled
    * @returns {Boolean} Returns 'true' if the button should be enabled
    */
   self.showInvoiceDetailGridDiscountButton = function () {
      var isEnabled = false;
      var records = GridService.getSelectedRecords(base.grid1);

      if (records && records.length) {
         var idx = records.findIndex(function (search) {
            return search.discamt !== search.odiscamt;
         });

         if (idx >= 0) {
            isEnabled = true;
         }
      }
      return isEnabled;
   };

   /**
    * Determine if the Invoices grid Write Off button should be enabled
    * @returns {Boolean} Returns 'true' if the button should be enabled
    */
   self.showInvoiceDetailGridWriteoffButton = function () {
      var isEnabled = false;
      var records = GridService.getSelectedRecords(base.grid1);

      if (records && records.length === 1) {
         var record = records[0];
         if (record.piffl && record.applyamt !== record.amount) {
            isEnabled = true;
         }
      }
      return isEnabled;
   };

   //Called from the Writeoffs Popup when the user presses 'Done'.  Pull the data out of that Popup.
   self.writeOffDoneCallback = function (okFlag, woDataList, writeOffsList, woDisplay, mainData, invoicesListSelected) {
      //Only pull the results out if they hit OK from the dialog.
      if (okFlag) {
         //Do not use replaceArray or replaceObject here
         base.woDataList = woDataList;
         self.woDisplay = woDisplay;
         base.invoiceWriteOffsList = writeOffsList;
         base.mainData = mainData;

         //This will only be returned for credits
         if (invoicesListSelected) {
            base.overwriteSelectedInvoiceListToInvoicelist(invoicesListSelected);
         }
      }
   };

});

app.controller('AreceUpdateCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;

   var FIELDCHANGED_CUSTNO = 'custno';

   self.unappliedAmt = 0;

   self.cancel = function () {
      $state.go('^');
      base.invoicesValidate();
   };

   self.fieldChanged = function (fieldName) {
      if (fieldName) {
         //Avoid phantom "No Customer" messages if they blank out the Customer #.  This will get trapped on the Update if they try.
         if (fieldName !== FIELDCHANGED_CUSTNO || fieldName === FIELDCHANGED_CUSTNO && base.updateScreenSingle.custno) {
            var criteria = {
               areceupdatescrncriteria: base.buildAreceUpdateScrnCriteria(),
               areceupdatescrnsingle: base.updateScreenSingle,
               pvField: fieldName
            };

            //User Hook (do not rename)
            if (self.setFieldChangedCriteria) {
               //Yes, we are returning the value from this function.  This makes it possible for an
               //extension to overwrite the fieldName.
               fieldName = self.setFieldChangedCriteria(fieldName);
            }

            DataService.post('api/ar/asarentry/areceupdatescrnfieldleave', { data: criteria, busy: true }, function (data) {
               if (data) {
                  Utils.replaceObject(base.updateScreenSingle, data);
                  //Convert to decimal values so they display correctly in text box
                  base.updateScreenSingle.unappliedAmt = base.stringToDecimal(base.updateScreenSingle.txtunapplied);
                  base.updateScreenSingle.proofAmt = base.stringToDecimal(base.updateScreenSingle.txtproof);

                  //User Hook (do not rename)
                  if (self.fieldChangedContinue) {
                     self.fieldChangedContinue();
                  }
               }
            });
         }
      }
   };

   self.submit = function () {

      //User Hook (do not rename)
      if (self.setAreceUpdateCriteria) {
         self.setAreceUpdateCriteria();
      }

      var criteria = {
         areceupdatescrncriteria: base.buildAreceUpdateScrnCriteria(),
         areceupdatescrnsingle: base.updateScreenSingle
      };

      DataService.post('api/ar/asarentry/areceupdatescrnok', { data: criteria, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(base.updateScreenOutput, data);

            //User Hook (do not rename)
            if (self.submitAreceUpdateBeforeNavigation) {
               self.submitAreceUpdateBeforeNavigation();
            }

            $state.go('^');
            base.invoicesValidate();
         }
      });
   };
});
