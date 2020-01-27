'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider, ValueAddReceivingStateProvider) {
   StateProvider.addTransactionBaseState('po', 'poei', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('po', 'poei');

   BinAllocationStateProvider.addStates('po', 'poei', 'poei.detail.detail-line-quick-view');
   ValueAddReceivingStateProvider.addStates('po', 'poei', 'poei.master');
   ValueAddReceivingStateProvider.addStates('po', 'poei', 'poei.quick-receive');
   ValueAddReceivingStateProvider.addStates('po', 'poei', 'poei.detail');

   $stateProvider.state('poei.detail', {
      url: '/detail',
      params: {
         callingState: null,
         poeiDrillDown: null,
         poeiListResult: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/detail.json');
            },
            controller: 'PoeiDetailCtrl as dtl'
         }
      }
   });

   //Sub View for the detail to show the Quick View of a line.  This is the drilldown.
   //Important:  Observe the parameter names are unique from the 'detail' view.
   //That's very important, otherwise the values get stepped on during navigation.
   //Additionally, the Detail controller would get instantiated multiple times (i.e. when
   //the user navigates back.)
   $stateProvider.state('poei.detail.detail-line-quick-view', {
      url: '/detail-line-quick-view',
      params: {
         lqvParentCallingState: null,
         lqvCallingState: null,
         lqvPoeiDrillDown: null,
         lqvPoeiLineDetail: null,
         lqvPoeiListResult: null,
         lqvCallback: null //Callback function to send payload back when they leave sub view.
      },
      views: {
         detailLineQuickView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/detail-line-quick-view.json');
            },
            controller: 'PoeiDetailLineQuickViewCtrl as dlqv'
         }
      }
   });

   //Sub View for the detail to show the Sub/Supersede assignment.
   $stateProvider.state('poei.detail.sub-supersede', {
      url: '/sub-supersede',
      params: {
         ssParentCallingState: null,
         ssCallingState: null,
         ssPoeiDrillDown: null,
         ssPoeiLineDetail: null,
         ssPoeiListResult: null,
         ssCallback: null //Callback function to send payload back when they leave sub view.
      },
      views: {
         subSupersede: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/detail-line-sub-supersede.json');
            },
            controller: 'PoeiDetailLineSubSupersedeCtrl as dlss'
         }
      }
   });

   $stateProvider.state('poei.quick-receive', {
      url: '/quick-receive',
      params: {
         purchaseOrderNumber: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/quick-receive.json');
            },
            controller: 'PoeiQuickReceiveCtrl as qr'
         }
      }
   });

   $stateProvider.state('poei.quick-view', {
      url: '/quick-view',
      params: {
         callingState: null,
         poDrillDown: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/shared/quickview/quickview.json');
            },
            controller: 'PoQuickViewCtrl as qv'
         }
      }
   });

   //Sub View for the quick-view
   $stateProvider.state('poei.quick-view.line-details', {
      url: '/line-details',
      params: {
         poDrillDown: null,
         loadPoQuickViewResult: null
      },
      views: {
         quickViewLineDetails: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/shared/quickview/quickview-line-details.json');
            },
            controller: 'PoQuickViewLineDetailsCtrl as qvld'
         }
      }
   });

   $stateProvider.state('poei.receiver-number', {
      url: '/receiver-number',
      params: {
         callingState: null,
         poeiDrillDown: null,
         poeiListResult: null,
         acceptCallback: null,
         cancelCallback: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/receiver-number.json');
            },
            controller: 'PoeiReceiverNumberCtrl as rcvnbr'
         }
      }
   });

   $stateProvider.state('poei.va-proportion-error', {
      url: '/va-proportion-error',
      params: {
         callingState: null,
         poeiVaProportion: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/va-proportion-error.json');
            },
            controller: 'PoeiVaProportionErrorCtrl as vpe'
         }
      }
   });

   $stateProvider.state('poei.final-update', {
      url: '/final-update',
      params: {
         callingState: null,
         poeiFinalInit: null,
         poeiFinalUpdate: null,
         optionsPayload: null,
         acceptCallback: null,
         cancelCallback: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/final-update.json');
            },
            controller: 'PoeiFinalUpdateCtrl as fu'
         }
      }
   });

   $stateProvider.state('poei.receiving-report', {
      url: '/receiving-report',
      params: {
         callingState: null,
         selectedPoeiListResult: null,
         poReceiptReport: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/receiving-report.json');
            },
            controller: 'PoeiReceivingReportCtrl as rr'
         }
      }
   });

   $stateProvider.state('poei.receiving-labels', {
      url: '/receiving-labels',
      params: {
         callingState: null,
         selectedPoeiListResult: null,
         ibPrintSingle: null,
         ibOrdersResults: null,
         selectedCount: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/receiving-labels.json');
            },
            controller: 'PoeiReceivingLabelsCtrl as rl'
         }
      }
   });

   $stateProvider.state('poei.detail-line-add-line', {
      url: '/detail-line-add-line',
      params: {
         parentCallingState: null,
         poeiDrillDown: null,
         poeiListResult: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poei/detail-line-add-line.json');
            },
            controller: 'PoeiDetailLineAddLineCtrl as dla'
         }
      }
   });

});

app.controller('PoeiBaseCtrl', function ($state, $translate, Sasc, Sasoo, Sasa, DataService, Utils, ConfigService, MessageService, SecurityService, RecoveryService, TabService) {
   var self = this;
   self.HTML_CRLF = '<br>';
   self.DOCUMENT_DELIMITER = '-';
   self.LABEL_DELIMITER = ': ';
   self.URL_PARAM_DELIMITER = '/';
   self.SUBMENU_DELIMITER = ' | ';
   self.FIELD_ARRAY_DELIMITER_PIPE = '|';
   self.MODULE_PO = 'po';
   self.MENU_FUNCTION_POET = 'poet';
   self.MENU_FUNCTION_POEI = 'poei';
   self.SUBMENU_POEI_HEADER = 'Header'; //This is dependent on the SASSM (Menu Item) 'Label' field definition for POEI.
   self.SUBMENU_POEI_ADDONS = 'Add Ons'; //This is dependent on the SASSM (Menu Item) 'Label' field definition for POEI.
   self.SUBMENU_POEI_LINES = 'Line Items'; //This is dependent on the SASSM (Menu Item) 'Label' field definition for POEI.
   self.OURPROC = 'poei';
   self.OURPROC_PORU = 'poru';
   self.STAGECD_ORDERED = '1';
   self.STAGECD_PRINTED = '2';
   self.STAGECD_RCVDTHISJOURNAL = '5';
   self.STAGECD_RECEIVED_COSTED_CORRECTION = '10';
   self.STAGECD_XREF_RECEIVED = "rcv";
   self.BATCH_READY = 'ready';
   self.BATCH_ALL_PURCHASEORDERS = 'all';
   self.ALL_TRANSTYPES = 'all';
   self.RECEIPT_UPDATETYPE_FULL = 'full';
   self.PRINT_TYPE_FILE = 'F';
   self.FULL_RECEIPT_TYPE_ALL = '';
   self.FULL_RECEIPT_TYPE_FULL = 'full';
   self.FULL_RECEIPT_TYPE_ASN = 'asn';
   self.PICK_TYPE_PRINT = 'P';
   self.RECEIPT_TYPE_PRINT = 'P';
   self.PRINT_ORDER_ORDER = 'O';
   self.TRANSTYPE_PURCHASE_ORDER = 'po';
   self.TRASNTYPE_BLANKET_RELEASE = 'br';
   self.ADDON_DISTR_TYPE_CAPITALIZE = 'cap';
   self.LINELEAVE_QTY_RECEIVED = 'qtyrcv';
   self.LINELEAVE_QTY_ORDERED = 'qtyord';
   self.NONSTOCKTYPE_STOCKED = 's';
   self.NONSTOCKTYPE_NONSTOCK = 'n';
   self.NONSTOCKTYPE_NOT_FOR_RESALE = 'r';
   self.ADDLINE_FIELD_PRODUCT = 'product';
   self.ADDLINE_FIELDDEFAULT_UNIT_EACH = 'each';
   self.WMALLOC_ORDERTYPE_PO = 'p';
   self.WMALLOC_ADJUST_TYPE_BUY = 'buy';
   self.SERIAL_LOT_TYPE_SERIAL = "S";
   self.SERIAL_LOT_TYPE_LOT = "L";
   self.PO_STAGE_RECEIVED = 5;
   self.VA_PROPORTION_ERROR = "VA Proportion Error";
   self.SECURITYLEVEL_ADD = 4;
   self.poeiListResults = [];
   self.rcvTrackingPoeiListResults = [];
   self.isReceiveOverSeaTracking = false;
   self.isReceiveCancelTrackingEnabled = false;
   self.recoveryData = '';
   self.isFromQuickRcv = false;

   self.securityPoEntry = 0;
   self.securityTopLevel = 0;
   self.securitySubLevelHeader = 0;
   self.securitySubLevelAddons = 0;
   self.securitySubLevelLines = 0;
   self.isDrillDownAllowed = false;
   self.journalNumberClosing = 0;

   self.isChgRcvFlForClose = false;

   self.searchPoNo = 0;
   self.searchPoSuf = 0;

   self.isReqPoBatchFl = function () {
      return Sasc.reqpobatchfl;
   };

   self.isPoCrctFl = function () {
      return Sasoo.pocrctfl;
   };

   self.isVerChgRcvFl = Sasoo.verrcvchgfl;

   self.isModibFlag = Sasa.modibfl;

   // Advanced search criteria object with initial values
   self.advCriteria = {
      vendno: 0,
      whse: '',
      stagecd: self.STAGECD_PRINTED,
      batch: self.BATCH_ALL_PURCHASEORDERS,
      prod: '',
      trackerno: 0,
      fromduedt: null,
      toduedt: null,
      recordcountlimit: ConfigService.getDefaultRecordLimit(),
      transtype: self.ALL_TRANSTYPES
   };

   self.criteria = {};

   self.clearCriteria = function () {
      self.criteria.vendno = 0;
      self.criteria.whse = Sasoo.homewhsefl ? Sasoo.whse : '';
      self.criteria.stagecd = self.STAGECD_PRINTED;
      self.criteria.batch = self.BATCH_ALL_PURCHASEORDERS;
      self.criteria.prod = '';
      self.criteria.trackerno = 0;
      self.criteria.trackno = 0;
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.transtype = self.ALL_TRANSTYPES;
   };

   self.clearCriteria();

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      openedCallback: 'base.journalOpened',
      closedCallback: 'base.journalClosed',
      beforeCloseCallback: 'base.journalBeforeClose',
      criteria: {
         currproc: self.OURPROC,
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: self.MODULE_PO,
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('poei.master');
   };

   self.includesMaster = function () {
      return $state.includes('poei.master');
   };

   self.isDetail = function () {
      return $state.is('poei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('poei.detail');
   };

   self.journalOpened = function (journal, userOpened) {
      //Reopened Journal (on recovery)
      if (!userOpened) {
         if (self.journalControl) {

            //Only overwrite the Whse, if it is on the recovery data.  Otherwise, leave it alone.  This will
            //come into play when the user is already working in Receiving and later opens a journal after
            //the Warehouse has been set.
            if (self.journalControl.getRecoveryData()) {
               self.criteria.whse = self.journalControl.getRecoveryData();
               self.advCriteria.whse = self.journalControl.getRecoveryData();
               self.recoveryData = self.criteria.whse;

               // run a search to display the in-process recovered orders
               self.criteria.stagecd = self.STAGECD_RCVDTHISJOURNAL; // set the stage to Received (Current Journal)
               self.criteria.whse = self.journalControl.getRecoveryData(); // set warehouse criteria to the recovered warehouse
               self.search();
            }
         }
      }
   };

   self.journalClosed = function () {
      if (self.journalNumberClosing > 0) {
         DataService.get('api/po/aspoentry/poeifinalupdateafter/' + self.journalNumberClosing, { busy: true }, function () { });
      }
   };

   //This gets called from the Journal Control when the 'Close Journal' is clicked.
   self.journalBeforeClose = function () {
      //We trap for some conditions before allowing the Journal to be closed.
      return self.trapForCloseEvents();
   };

   self.search = function () {
      if (self.journal) {
         self.criteria.jrnlno = self.journal.gJrnlno;
      }

      //User Hook (do not rename)
      if (self.searchCriteria) {
         self.searchCriteria();
      }

      DataService.post('api/po/aspoentry/poeirefreshdocuments', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.poeiListResults = data.poeilistresults;
            self.dataset = self.poeiListResults;
            self.isReceiveCancelTrackingEnabled = self.advCriteria.trackerno && self.advCriteria.trackerno !== 0 ? true : false;
            if (self.dataset && self.dataset.length > 0) {
               if (data.lMoreRecords) {
                  MessageService.alert('global.warning', 'global.record.count.limit.has.been.reached');
               }
               if (self.isReceiveCancelTrackingEnabled) {
                  self.criteria.whse = self.dataset[0].whse;
                  self.criteria.trackno = self.advCriteria.trackerno;

                  //Build out a list of the Received PO's.
                  self.rcvTrackingPoeiListResults = [];
                  self.rcvTrackingPoeiListResults = self.dataset.filter(function (poeiListResult) {
                     return poeiListResult.stagecd === self.PO_STAGE_RECEIVED;
                  });
               } else {
                  //Need to clear it from the official Criteria Object too.
                  self.criteria.trackno = self.advCriteria.trackerno;
               }
            }

            //User Hook (do not rename)
            if (self.searchContinue) {
               self.searchContinue(data);
            }
         }
      });
   };

   self.advancedSearch = function () {
      if (self.journal) {
         self.advCriteria.jrnlno = self.journal.gJrnlno;
      }

      //User Hook (do not rename)
      if (self.advancedSearchCriteria) {
         self.advancedSearchCriteria();
      }

      DataService.post('api/po/aspoentry/poeirefreshdocuments', { data: self.advCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiListResults = data.poeilistresults;
            self.dataset = self.poeiListResults;
            self.isReceiveCancelTrackingEnabled = self.advCriteria.trackerno && self.advCriteria.trackerno !== 0 ? true : false;
            if (self.dataset && self.dataset.length > 0) {
               if (data.lMoreRecords) {
                  MessageService.alert('global.warning', 'global.record.count.limit.has.been.reached');
               }
               if (self.isReceiveCancelTrackingEnabled) {
                  self.criteria.whse = self.dataset[0].whse;
                  self.criteria.trackno = self.advCriteria.trackerno;

                  //Build out a list of the Received PO's.
                  self.rcvTrackingPoeiListResults = [];
                  self.rcvTrackingPoeiListResults = self.dataset.filter(function (poeiListResult) {
                     return poeiListResult.stagecd === self.PO_STAGE_RECEIVED;
                  });
               } else {
                  //Need to clear it from the official Criteria Object too.
                  self.criteria.trackno = self.advCriteria.trackerno;
               }
            }

            //User Hook (do not rename)
            if (self.advancedSearchContinue) {
               self.advancedSearchContinue(data);
            }
         }
      });
   };

   self.getSecurity = function () {
      self.securityPoEntry = SecurityService.getSecurityLevel(self.MENU_FUNCTION_POET);
      self.securityTopLevel = SecurityService.getSecurityLevel(self.MENU_FUNCTION_POEI);
      self.securitySubLevelHeader = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_POEI, self.SUBMENU_POEI_HEADER);
      self.securitySubLevelAddons = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_POEI, self.SUBMENU_POEI_ADDONS);
      self.securitySubLevelLines = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_POEI, self.SUBMENU_POEI_LINES);

      self.isDrillDownAllowed = self.securitySubLevelHeader > 1 || self.securitySubLevelAddons > 1 || self.securitySubLevelLines > 1;
   };

   self.getFullPONumber = function (pono, posuf) {
      return pono + self.DOCUMENT_DELIMITER + Utils.pad(posuf, 2);
   };

   self.getSubTitleFullPoNumber = function (pono, posuf) {
      return MessageService.get('global.purchase.order.number') + ' ' + self.getFullPONumber(pono, posuf);
   };

   self.showFullReceiptFinishMessage = function (pono, posuf) {
      var message = $translate.instant('global.purchase.order.number') + ' ' + self.getFullPONumber(pono, posuf) + ' ' +
         $translate.instant('message.has.been.received.in.full');
      MessageService.info('global.information', message);
   };

   self.showNoJournalOpenedMessage = function () {
      MessageService.info('global.information', 'global.no.journal.opened');
   };

   self.showCancelReceiptMessage = function (pono, posuf) {
      var message = $translate.instant('message.the.receiving.work.for.purchase.order') + ' ' + self.getFullPONumber(pono, posuf) + ' ' +
         $translate.instant('message.has.been.cancelled');
      MessageService.info('global.information', message);
   };

   self.closeJournalAfterFinalUpdate = function () {
      if (self.journal.gJrnlno !== 0) {
         //Save Journal off for some processing after Final Update is performed.
         self.journalNumberClosing = self.journal.gJrnlno;

         //Close the Journal, but do not call the callback, otherwise you'll get in an endless loop.
         self.journalControl.closeJournal(true);
      }
   };

   self.updateNotSuccessful = function () {
      MessageService.info('global.information', 'message.update.was.not.successful');
   };

   self.drillDownLaunchDetail = function (callingState, poeiDrillDown, selectedPoeiListResult) {
      RecoveryService.updateRecoveryRecord(self.MENU_FUNCTION_POEI, self.journal.gJrnlno, self.journal.gJrnlno, self.recoveryData, poeiDrillDown.whse);
      self.recoveryData = poeiDrillDown.whse;
      if (self.journal) {
         self.journalControl.setRecoveryData(poeiDrillDown.whse);
      }
      if (self.isDrillDownAllowed) {
         $state.go('^.detail', { callingState: callingState, poeiDrillDown: poeiDrillDown, poeiListResult: selectedPoeiListResult });
      } else {
         MessageService.info('global.information', 'global.operator.security.prohibits.accessing.detail.entry');
      }
   };

   self.drillDownCheckReceiver = function (callingState, poeiDrillDown, selectedPoeiListResult) {
      if (selectedPoeiListResult.receiverfl) {
         $state.go('^.receiver-number', {
            callingState: '^.detail',
            poeiDrillDown: poeiDrillDown,
            poeiListResult: selectedPoeiListResult,
            acceptCallback: self.drillDownAcceptReceiverNumberCallback,
            cancelCallback: self.drillDownCancelReceiverNumberCallback
         });
      } else {
         self.drillDownLaunchDetail(callingState, poeiDrillDown, selectedPoeiListResult);
      }
   };

   self.drilldownCheckAccess = function (callingState, poeiDrillDown, selectedPoeiListResult) {
      DataService.post('api/po/aspoentry/poeicheckdrilldownaccess', { data: poeiDrillDown, busy: true }, function (data) {
         if (data) {
            MessageService.okCancel('global.confirmation', data, function () {
               self.drillDownCheckReceiver(callingState, poeiDrillDown, selectedPoeiListResult);
            });
         } else {
            self.drillDownCheckReceiver(callingState, poeiDrillDown, selectedPoeiListResult);
         }
      });
   };

   self.drilldownCheckForCorrectionContinue = function (callingState, selectedPoeiListResult) {
      var poeiDrillDown = {
         pono: selectedPoeiListResult.pono,
         posuf: selectedPoeiListResult.posuf,
         jrnlno: self.journal.gJrnlno,
         trackno: self.criteria.trackno,
         correctionfl: selectedPoeiListResult.correctionfl,
         userfield: selectedPoeiListResult.userfield,
         whse: selectedPoeiListResult.whse
      };

      if (selectedPoeiListResult.correctionfl) {
         MessageService.yesNo('global.question', 'question.this.purchase.order.has.already.been.received',
            function () {
               self.drilldownCheckAccess(callingState, poeiDrillDown, selectedPoeiListResult);
            });
      } else {
         self.drilldownCheckAccess(callingState, poeiDrillDown, selectedPoeiListResult);
      }
   };

   //This is the top level call for a drilldown.  It's shared between the PO Row Drilldown and the
   //Quick Receive Detail button.  This then calls other functions for continued processing and
   //possible presentation of views.
   self.drilldownCheckForCorrection = function (callingState, selectedPoeiListResult) {
      if (!self.journal) {
         //If the Journal isn't open, then show the Open Journal popup.  If they open it, then
         //continue on to the workflow from there.
         self.journalControl.showOpenView(
            //'openedCallback'
            function () {
               self.drilldownCheckForCorrectionContinue(callingState, selectedPoeiListResult);
            },
            function () {
               //Nothing we need to do for the 'canceledCallback'
            });
      } else {
         self.drilldownCheckForCorrectionContinue(callingState, selectedPoeiListResult);
      }
   };

   //Callbacks
   self.drillDownAcceptReceiverNumberCallback = function (callingState, poeiDrillDown, selectedPoeiListResult) {
      self.drillDownLaunchDetail(callingState, poeiDrillDown, selectedPoeiListResult);
   };

   self.drillDownCancelReceiverNumberCallback = function (callingState, poeiDrillDown, selectedPoeiListResult) {
      //We still launch the detail, even if they cancel from the Receiver screen.
      self.drillDownLaunchDetail(callingState, poeiDrillDown, selectedPoeiListResult);
   };

   //This traps for 2 events: 1) If the user tries to close the function and Receipts are in Process.
   //2) If they try to close a journal and Receipts are in process.  In both cases, if true, then
   //the 'Final Update' is called instead.  Otherwise, the action is performed.
   self.trapForCloseEvents = function (callback) {

      //Don't give this warning from any other screen (i.e. from Master) because in those places, we're
      //not working with a specific PO.
      if (self.isDetail()) {
         if (self.isChgRcvFlForClose) {
            self.isChgRcvFlForClose = false;
            MessageService.error('global.warning', 'message.discrepancy.from.po.please.verify.changes.made');
            //Do not close.  Make sure they see it.  Reset the flag, so only ask one time.
            return false;
         }
      };

      //If no Journal open, then let them close without incident.
      if (!self.journal || (self.journal && self.journal.gJrnlno === 0)) {
         return true;
      } else {
         //If a Journal is open, then we need to make a backend call to determine if there are any PO's in process of
         //Receiving.  If so, then we need to stop them and present the 'Final Update" screen.
         if (self.journal.gJrnlno > 0 && self.criteria.whse) {
            DataService.get('api/po/aspoentry/poeifinalinit/' + self.journal.gJrnlno + self.URL_PARAM_DELIMITER + self.criteria.whse, { busy: true }, function (data) {
               if (data) {
                  self.poeiFinalInit = data;
                  if (self.poeiFinalInit) {
                     if (self.poeiFinalInit.updatefl) {
                        MessageService.info('global.info', 'message.purchase.orders.are.in.the.process.of.being.received');
                        var poeiFinalUpdate = {
                           jrnlno: self.journal.gJrnlno,
                           adjbofl: self.poeiFinalInit.crctexistsfl, //Q: This seems suspect, but that's what SL-UI did.
                           crctexistsfl: self.poeiFinalInit.crctexistsfl,
                           picktype: self.PICK_TYPE_PRINT,
                           pickprinter: self.poeiFinalInit.pickprinter,
                           printorder: self.PRINT_ORDER_ORDER,
                           receipttype: self.RECEIPT_TYPE_PRINT,
                           receiptprinter: self.poeiFinalInit.receiptprinter
                        };
                        var optionsPayload = {
                           whse: self.criteria.whse
                        };
                        $state.go('^.final-update', { callingState: '^.master', poeiFinalInit: self.poeiFinalInit, poeiFinalUpdate: poeiFinalUpdate, optionsPayload: optionsPayload, acceptCallback: self.acceptFinalUpdateCallback, cancelCallback: self.cancelFinalUpdateCallback });

                        //Do not allow function to close since they need to hit the "Final Update" screen.
                        return false;

                     } else {
                        self.closeJournalAfterFinalUpdate();

                        //This can be used to force close the function if the Journal was open and they clicked the close
                        //function but no PO's were in process of receiving.  This alleviates the user from having to
                        //click the close two times.
                        if (callback) {
                           callback();
                        }

                        //Allow function to close
                        return true;
                     }
                  } else {
                     //Allow function to close
                     return true;
                  }
               } else {
                  //Allow function to close
                  return true;
               }
            });
         } else {
            //Allow function to close
            return true;
         }
      }
   };

   self.canUserCloseTabContinue = function () {
      TabService.closeTab('poei.master');
   };

   TabService.canUserCloseTab('poei', function () {
      return self.trapForCloseEvents(self.canUserCloseTabContinue);
   });

   self.acceptFinalUpdateCallback = function (poeiFinalUpdate) {
      if (poeiFinalUpdate) {
         poeiFinalUpdate.jrnlno = self.journal.gJrnlno;
         if (self.criteria.trackno) {
            poeiFinalUpdate.trackno = self.criteria.trackno;
         }
         DataService.post('api/po/aspoentry/poeifinalupdate', { data: poeiFinalUpdate, busy: true }, function () {

            RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_POEI, self.journal.gJrnlno, self.recoveryData);
            //Clear out residual data, otherwise it will confuse recovery after 1st PO entered if the warehouse remains.
            self.recoveryData = '';
            //If data exists, also need to get rid of the generic record.
            RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_POEI, self.journal.gJrnlno, self.recoveryData);

            self.closeJournalAfterFinalUpdate();

            MessageService.info('global.information', 'message.final.update.completed.successfully');

            TabService.closeTab('poei.master');
         });
      }
   };

   self.cancelFinalUpdateCallback = function () {
      self.updateNotSuccessful();
   };

   self.getSecurity();
});

app.controller('PoeiSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
      base.clearCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('poei.master');
      }
      base.search();
   };
});

app.controller('PoeiMasterCtrl', function ($scope, $state, $stateParams, ConfigService, GridService, DataService, MessageService, RecoveryService, Sasa) {
   var self = this;
   var base = $scope.base;
   self.selectedRows = [];
   self.currentlySelectedRowIndex = 0;
   self.type = base.FULL_RECEIPT_TYPE_FULL;
   self.isNavigatingToDetails = false;
   self.poeiDrillDown = {};
   self.poeiListResult = {};
   self.poeiFullReceipt = {};
   self.vaSurplusLineNumberList = [0];
   self.vaSurplusProcessingCount = 0;
   self.vaSurplusLineNumberMaxCount = 0;
   base.isFromQuickRcv = false;

   //NOTE: The advCriteria is sitting on base so we can set the Journal on recovery.

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'whse', label: MessageService.get('global.warehouse') },
      { value: 'vendno', label: MessageService.get('global.vendor.number') },
      { value: 'stagecd', label: MessageService.get('global.stage') },
      { value: 'batch', label: MessageService.get('global.purchase.orders.with') },
      { value: 'trackerno', label: MessageService.get('global.tracking.number') },
      { value: 'prod', label: MessageService.get('global.product') },
      { value: 'transtype', label: MessageService.get('global.transaction.type') },
      { value: 'fromduedt', label: MessageService.get('global.due.date.from') },
      { value: 'toduedt', label: MessageService.get('global.due.date.to') },
      { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['whse', 'stagecd'];

   // Advanced search and update data set for the grid
   self.search = function (isSkipCopyCriteria) {
      //If we're forcing the search, from the update (for example), don't copy the criteria.  Only
      //do this if we clicked the Search button from advanced.
      if (!isSkipCopyCriteria) {
         base.criteria = angular.copy(base.advCriteria);
      }
      base.search();
   };

   // Advanced search and update data set for the grid
   self.advancedSearch = function () {
      base.advancedSearch();
   };

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         return false;
      } else {
         return true;
      }
   };

   self.isFullReceiptEnabled = function () {
      return base.grid.isAnyRowSelected() && base.criteria && base.criteria.stagecd !== base.STAGECD_RECEIVED_COSTED_CORRECTION && base.criteria.batch !== base.BATCH_READY;
   };

   self.isReceiveCancelTrackingEnabled = function () {
      return base.advCriteria && base.advCriteria.stagecd !== base.STAGECD_RECEIVED_COSTED_CORRECTION && base.advCriteria.trackerno && base.advCriteria.trackerno !== 0;
   };

   self.isCancelReceivingEnabled = function () {
      return base.grid.isAnyRowSelected();
   };

   self.isReceivingLabelsEnabled = function () {
      if (base.grid.isAnyRowSelected()) {

         var selectedRows = GridService.getSelectedRecords(base.grid);

         //This helps determine if we have any rows that are in the Received Stage.  We won't enable the button if there are none selected.
         var selectedRowsReceived = selectedRows.filter(function (poei) {
            return poei.stagecdx.toLowerCase() === base.STAGECD_XREF_RECEIVED;
         });

         if (selectedRowsReceived && selectedRowsReceived.length > 0) {
            return Sasa.modibfl && base.criteria.stagecd !== base.STAGECD_RECEIVED_COSTED_CORRECTION;
         } else {
            return false;
         }
      }

      return false;
   };

   self.isReceivingByReadyEnabled = function () {
      return base.criteria.stagecd !== base.STAGECD_RECEIVED_COSTED_CORRECTION && (!base.criteria.trackno || base.criteria.trackno === 0);
   };

   self.receivingReport = function () {
      if (!base.journal || base.journal.gJrnlno === 0) {
         base.showNoJournalOpenedMessage();
      } else {

         var getsassrbykeysCriteria = {
            currproc: base.OURPROC_PORU,
            trmgrlang: ''
         };
         DataService.post('api/sa/sassr/getsassrbykeys', { data: getsassrbykeysCriteria, busy: true }, function (data) {
            if (data) {
               var firstSassr = data[0];
               var poReceiptReport = {
                  linesort: firstSassr.optdef2,
                  qtyfl: firstSassr.optdef3.toLowerCase() === 'true' ? true : false,
                  brkbypofl: firstSassr.optdef4.toLowerCase() === 'true' ? true : false
               };

               $state.go('^.receiving-report', { callingState: '^.master', selectedPoeiListResult: null, poReceiptReport: poReceiptReport });
            }
         });
      }
   };

   self.receiveByReady = function () {
      base.isReceiveOverSeaTracking = false;
      self.fullReceipt(base.FULL_RECEIPT_TYPE_ASN);
   };

   self.receiveTracking = function () {
      base.isReceiveOverSeaTracking = true;
      self.fullReceipt(base.FULL_RECEIPT_TYPE_FULL);
   };

   self.fullReceiving = function () {
      base.isReceiveOverSeaTracking = false;
      self.fullReceipt(base.FULL_RECEIPT_TYPE_FULL);
   };

   self.cancelTracking = function () {

      //Start off and process the 1st PO in the selected list of Purchase Orders to cancel.
      self.currentlySelectedRowIndex = 0;

      //This collection was built when they did the Receive Tracking.
      if (base.rcvTrackingPoeiListResults && base.rcvTrackingPoeiListResults.length > 0) {
         self.cancelProcessing(base.rcvTrackingPoeiListResults[self.currentlySelectedRowIndex], true);
      }
   };

   self.drilldown = function (e, args) {
      self.poeiListResult = args[0].item;
      base.isFromQuickRcv = false;
      if (self.poeiListResult) {
         //Call the shared logic that can be done from either here or the Quick Receive screen.
         base.drilldownCheckForCorrection('^.master', self.poeiListResult);
      }
   };

   self.finalUpdate = function () {
      if (!base.journal) {
         base.showNoJournalOpenedMessage();
      } else {
         if (base.journal.gJrnlno > 0 && base.criteria.whse) {
            DataService.get('api/po/aspoentry/poeifinalinit/' + base.journal.gJrnlno + base.URL_PARAM_DELIMITER + base.criteria.whse, { busy: true }, function (data) {
               if (data) {
                  self.poeiFinalInit = data;
                  if (self.poeiFinalInit) {
                     if (self.poeiFinalInit.updatefl) {
                        var poeiFinalUpdate = {
                           jrnlno: base.journal.gJrnlno,
                           adjbofl: self.poeiFinalInit.crctexistsfl, //Q: This seems suspect, but that's what SL-UI did.
                           crctexistsfl: self.poeiFinalInit.crctexistsfl,
                           picktype: base.PICK_TYPE_PRINT,
                           pickprinter: self.poeiFinalInit.pickprinter,
                           printorder: base.PRINT_ORDER_ORDER,
                           receipttype: base.RECEIPT_TYPE_PRINT,
                           receiptprinter: self.poeiFinalInit.receiptprinter
                        };
                        var optionsPayload = {
                           whse: base.criteria.whse
                        };
                        $state.go('^.final-update', { callingState: '^.master', poeiFinalInit: self.poeiFinalInit, poeiFinalUpdate: poeiFinalUpdate, optionsPayload: optionsPayload, acceptCallback: self.acceptFinalUpdateCallback, cancelCallback: self.cancelFinalUpdateCallback });

                     } else {
                        base.closeJournalAfterFinalUpdate();
                     }
                  }
               }
            });
         } else {
            MessageService.error('global.error', 'message.warehouse.is.required');
         }
      }
   };

   self.launchQuickReceive = function () {
      $state.go('^.quick-receive');
   };

   self.launchQuickView = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      if (selectedRow) {
         $state.go('^.quick-view', { callingState: '^.master', poDrillDown: selectedRow });
      }
   };

   self.cancelProcessing = function (poeiListResult, isCancelTracking) {
      //Increment so next in the list can be processed, if more than one.
      self.currentlySelectedRowIndex++;

      if (!base.journal) {
         base.showNoJournalOpenedMessage();
      } else {
         var poeiCancelWorkCriteria = {
            pono: poeiListResult.pono,
            posuf: poeiListResult.posuf,
            jrnlno: base.journal.gJrnlno,
            correctionfl: poeiListResult.correctionfl
         };

         DataService.post('api/po/aspoentry/poeicancelwork', { data: poeiCancelWorkCriteria, busy: true }, function (data) {
            if (data) {
               //Write changes back to main List so we don't need to re-query.
               base.poeiListResults.forEach(function (poei) {
                  if (poei.pono === data.pono && poei.posuf === data.posuf) {
                     poei.stagecd = data.stagecd;
                     poei.stagecdx = data.stagecdx;
                     poei.statusinfo = data.statusinfo;
                     poei.amounti = data.amounti;
                     poei.receiverfl = data.receiverfl;
                     poei.batchdatcd = data.batchdatcd;
                     var currentIndex = base.dataset.indexOf(poei);
                     base.grid.updateRow(currentIndex);
                  }
               });

               if (isCancelTracking) {
                  if (self.currentlySelectedRowIndex < base.rcvTrackingPoeiListResults.length) {
                     self.cancelProcessing(base.rcvTrackingPoeiListResults[self.currentlySelectedRowIndex], true);
                  } else {
                     base.rcvTrackingPoeiListResults = [];
                  }
               } else {
                  if (self.selectedRows && self.currentlySelectedRowIndex < self.selectedRows.length) {
                     self.cancelProcessing(self.selectedRows[self.currentlySelectedRowIndex], false);
                  }
               }
            }
         });
      }
   };

   self.cancelReceiving = function () {
      self.selectedRows = GridService.getSelectedRecords(base.grid);

      //Start off and process the 1st PO in the selected list of Purchase Orders to cancel.
      self.currentlySelectedRowIndex = 0;
      if (self.selectedRows) {
         self.cancelProcessing(self.selectedRows[self.currentlySelectedRowIndex], false);
      }
   };

   self.receiptProcessingAllOtherSelectedPOs = function () {
      //Process the next PO in the list of selected Purchase Orders from the main grid.
      if (self.selectedRows && self.currentlySelectedRowIndex < self.selectedRows.length) {
         self.receiptProcessing(self.selectedRows[self.currentlySelectedRowIndex], self.type);
      }
   };

   //Get the line numbers to process.  This gets a collection for this particular PO.  If there is a list of them, we will in turn
   //open the VA Surplus popup for each line in the collection.
   self.initializeValueAddSurplus = function (pono, posuf) {
      self.vaSurplusLineNumberList = [0];

      var poeiInitializeVaSurplusCriteria = {
         pono: pono,
         posuf: posuf,
         jrnlno: base.journal.gJrnlno
      };

      DataService.post('api/po/aspoentry/poeiinitializevasurplus', { data: poeiInitializeVaSurplusCriteria, busy: false }, function (data) {
         self.vaSurplusLineNumberList = data.split(base.FIELD_ARRAY_DELIMITER_PIPE);
         self.vaSurplusProcessingCount = 0;
         self.vaSurplusLineNumberMaxCount = self.vaSurplusLineNumberList.length;

         self.launchValueAddSurplus('poei.master', pono, posuf);
      });
   };

   self.launchValueAddSurplus = function (parent, pono, posuf) {
      var criteria = {
         pvPasspono: pono,
         pvPassposuf: posuf,
         pvVano: 0,
         pvVasuf: 0,
         pvSctncode: '',
         pvCompletefl: true,
         lineNumber: self.vaSurplusLineNumberList[self.vaSurplusProcessingCount]
      };

      $state.go(parent + '.valueaddreceiving-surplus', {
         callingState: null,  //This is null from POEI because we don't want the control to change states since we might have to iterate thru lines.
         menuFunction: base.MENU_FUNCTION_POEI,
         currentCount: self.vaSurplusProcessingCount,
         maximumCount: self.vaSurplusLineNumberMaxCount,
         vaReceiptCreateIiSectionRequestCriteria: criteria,
         acceptCallback: self.vaFinishedProductFinishedCallback,
         cancelCallback: self.vaFinishedProductCancelCallback
      });
   };

   //After the Value Add screens are completed, then we need to recursively call the Surplus again and again thru each Line # in the
   //collection.  Once we're after the last one then display the Received message.
   self.launchValueAddSurplusRecursively = function () {
      self.vaSurplusProcessingCount++;

      if (self.vaSurplusProcessingCount < self.vaSurplusLineNumberMaxCount) {
         self.launchValueAddSurplus('poei.master', self.poeiFullReceipt.pono, self.poeiFullReceipt.posuf);
      } else {
         base.showFullReceiptFinishMessage(self.poeiFullReceipt.pono, self.poeiFullReceipt.posuf);
         //Since we have potential iterations of Line Numbers to process, we are responsible for navigating to calling view only
         //after we are complete.  Generally, the VA Surplus / Finished Product Receiving shared control would be responsible for that.
         $state.go('poei.master');
      }
   };

   self.fullReceiptContinue = function (poeiListResult) {
      DataService.post('api/po/aspoentry/poeireceiptfinish', { data: self.poeiFullReceipt, busy: true }, function (data) {
         if (data) {

            //Build a collection of the PO's received.  These are "Tracked".
            var purchaseOrderToTrack = base.poeiListResults.filter(function (poei) {
               return poei.pono === data.poeifullreceipt.pono && poei.posuf === data.poeifullreceipt.posuf;
            });

            if (base.rcvTrackingPoeiListResults.indexOf(purchaseOrderToTrack[0]) === -1) {
               base.rcvTrackingPoeiListResults.push(purchaseOrderToTrack[0]);
            }

            if (data.poeivaproportion && !self.isNavigatingToDetails) {
               $state.go('^.va-proportion-error', { callingState: '^.master', poeiVaProportion: data.poeivaproportion });
            } else {
               //Write changes back to main List so we don't need to re-query.
               base.poeiListResults.forEach(function (poei) {
                  if (poei.pono === data.poeifullreceipt.pono && poei.posuf === data.poeifullreceipt.posuf) {
                     poei.stagecd = data.poeifullreceipt.stagecd;
                     poei.stagecdx = data.poeifullreceipt.stagecdx;
                     poei.statusinfo = data.poeifullreceipt.statusinfo;
                     poei.amounti = data.poeifullreceipt.amounti;
                     poei.batchdatcd = data.poeifullreceipt.batchdatcd;
                     poei.receiverfl = data.poeifullreceipt.receiverfl;
                     var currentIndex = base.dataset.indexOf(poei);
                     base.grid.updateRow(currentIndex);
                  }
               });

               if (data.cWarningMessage) {
                  MessageService.okCancel('global.warning', data.cWarningMessage,
                     function () {
                        self.receiptProcessingAllOtherSelectedPOs();
                     },
                     function () {
                        self.receiptProcessingAllOtherSelectedPOs();
                     });
               } else {
                  if (poeiListResult.vapofl && !self.isNavigatingToDetails) {
                     self.initializeValueAddSurplus(data.poeifullreceipt.pono, data.poeifullreceipt.posuf);
                  } else if (!self.isNavigatingToDetails) {
                     self.receiptProcessingAllOtherSelectedPOs();
                  }
               }
            }
         }
      });
   };

   self.receiptProcessing = function (poeiListResult, typeParam) {
      if (!self.isNavigatingToDetails) {
         self.currentlySelectedRowIndex++;
      }

      var poeifullreceipt = {
         pono: poeiListResult.pono,
         posuf: poeiListResult.posuf,
         jrnlno: base.journal.gJrnlno,
         trackno: base.criteria.trackno
      };

      if (!typeParam || typeParam === base.FULL_RECEIPT_TYPE_FULL || typeParam === base.FULL_RECEIPT_TYPE_ALL) {
         self.type = base.FULL_RECEIPT_TYPE_FULL;
      } else {
         self.type = base.FULL_RECEIPT_TYPE_ASN;
      }

      var poeiReceiptStartRequest = {
         poeifullreceipt: poeifullreceipt,
         cType: self.type
      };

      DataService.post('api/po/aspoentry/poeireceiptstart', { data: poeiReceiptStartRequest, busy: true }, function (data) {
         if (data) {
            self.poeiFullReceipt = data;

            if (self.poeiFullReceipt.receiverfl) {
               var poeiDrillDown = {
                  pono: self.poeiFullReceipt.pono,
                  posuf: self.poeiFullReceipt.posuf,
                  jrnlno: self.poeiFullReceipt.jrnlno,
                  trackno: self.poeiFullReceipt.trackno
               };
               //When the user OK's from the Receiver screen, we continue with the update, which is done via the Callback.  If
               //the user Cancels, we Cancel receiving on this PO, also called via the callback.
               $state.go('^.receiver-number', {
                  callingState: '^.master',
                  poeiDrillDown: poeiDrillDown,
                  poeiListResult: poeiListResult,
                  acceptCallback: self.fullReceiptAcceptReceiverNumberCallback,
                  cancelCallback: self.fullReceiptCancelReceiverNumberCallback
               });
            } else {
               self.fullReceiptContinue(poeiListResult);
            }
         }
      });
   };

   self.fullReceiptAfterOpenJournalCheck = function (type) {
      //If we're doing Overseas Tracking, then send the entire list.
      if (base.isReceiveOverSeaTracking) {
         self.selectedRows = base.dataset;
      } else {
         self.selectedRows = GridService.getSelectedRecords(base.grid);
      }

      //Start with the first PO in the list of selected PO's
      self.currentlySelectedRowIndex = 0;
      if (self.selectedRows) {
         self.receiptProcessing(self.selectedRows[self.currentlySelectedRowIndex], type);
      }
   };

   self.fullReceipt = function (type) {
      if (!base.journal) {
         //If the Journal isn't open, then show the Open Journal popup.  If they open it, then
         //continue on to the workflow from there.
         base.journalControl.showOpenView(
            //'openedCallback'
            function () {
               self.fullReceiptAfterOpenJournalCheck(type);
            },
            function () {
               //Nothing we need to do for the 'canceledCallback'
            });
      } else {
         self.fullReceiptAfterOpenJournalCheck(type);
      }
   };

   self.receivingLabels = function () {
      if (!base.journal || base.journal.gJrnlno === 0) {
         base.showNoJournalOpenedMessage();
      } else {

         var ibPrintSingle = {
            jrnlno: base.journal.gJrnlno,
            pono: -99,
            posuf: -99
         };

         var selectedPurchaseOrders = [];
         var selectedRows = GridService.getSelectedRecords(base.grid);
         selectedRows.forEach(function (selectedPoeiListResult) {
            var ibOrdersResult = {
               orderno: selectedPoeiListResult.pono,
               ordersuf: selectedPoeiListResult.posuf
            };
            selectedPurchaseOrders.push(ibOrdersResult);
         });

         var selectedCount = selectedRows.length;
         var ibririnitializeCriteria = {
            ibPrintSingle: ibPrintSingle,
            ibOrdersResults: selectedPurchaseOrders
         };
         DataService.post('api/shared/asibentry/ibririnitialize', { data: ibririnitializeCriteria, busy: true }, function (data) {
            if (data) {
               ibPrintSingle = data.ibprintsingle;
               selectedPurchaseOrders = data.ibordersresults;

               $state.go('^.receiving-labels', { callingState: '^.master', selectedPoeiListResult: null, ibPrintSingle: ibPrintSingle, ibOrdersResults: selectedPurchaseOrders, selectedCount: selectedCount
               });
            }
         });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   //Callbacks
   self.drillDownAcceptReceiverNumberCallback = function () {
      self.launchDetail();
   };

   self.drillDownCancelReceiverNumberCallback = function () {
      //We still launch the detail, even if they cancel from the Receiver screen.
      self.launchDetail();
   };

   self.fullReceiptAcceptReceiverNumberCallback = function () {
      self.fullReceiptContinue();
   };

   self.fullReceiptCancelReceiverNumberCallback = function () {
      self.cancelReceiving();
   };

   self.acceptFinalUpdateCallback = function (poeiFinalUpdate) {
      if (poeiFinalUpdate) {
         poeiFinalUpdate.jrnlno = base.journal.gJrnlno;
         if (base.criteria.trackno) {
            poeiFinalUpdate.trackno = base.criteria.trackno;
         }
         DataService.post('api/po/aspoentry/poeifinalupdate', { data: poeiFinalUpdate, busy: true }, function () {
            RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_POEI, base.journal.gJrnlno, base.recoveryData);
            //Clear out residual data, otherwise it will confuse recovery after 1st PO entered if the warehouse remains.
            base.recoveryData = '';
            //If data exists, also need to get rid of the generic record.
            RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_POEI, base.journal.gJrnlno, base.recoveryData);

            base.closeJournalAfterFinalUpdate();
            MessageService.info('global.information', 'message.final.update.completed.successfully');

            //Refresh, so we don't see stale data from the update.
            self.search(true);
         });
      }
   };

   self.cancelFinalUpdateCallback = function () {
      base.updateNotSuccessful();
   };

   self.vaFinishedProductFinishedCallback = function () {
      if (self.poeiFullReceipt) {
         self.launchValueAddSurplusRecursively();
      }
   };

   self.vaFinishedProductCancelCallback = function () {
      if (self.poeiFullReceipt) {
         self.launchValueAddSurplusRecursively();
      }
   };
});

//This controller is used when the user clicks "Quick Receive" from the results toolbar on the Master Page.
//Alias: qr
app.controller('PoeiQuickReceiveCtrl', function ($scope, $state, $stateParams, DataService, MessageService, RecoveryService) {
   var self = this;
   var base = $scope.base;
   self.purchaseOrderNumberInput = $stateParams.purchaseOrderNumber;
   self.poeiListCriteria = {};
   self.poeiDrillDown = {};
   self.selectedPoeiListResult = [];
   self.purchaseOrderNumber = '';
   self.isPoSelected = false;
   self.isFullReceiptEnabled = false;
   self.isCancelReceivingEnabled = false;
   self.isReceivingLabelsEnabled = false;
   self.poeiFullReceipt = [];
   self.poeiFinalInit = {};
   self.vaSurplusLineNumberList = [0];
   self.vaSurplusProcessingCount = 0;
   self.vaSurplusLineNumberMaxCount = 0;
   base.isFromQuickRcv = true;

   self.back = function () {
      $state.go('^.master');
   };

   self.initiate = function () {
      //If getting called from some places such as finishing work on the Detail screen, we want to bring the
      //PO # back in.
      if (self.purchaseOrderNumberInput) {
         self.purchaseOrderNumber = self.purchaseOrderNumberInput;
         self.selectedPurchaseOrder();
      }
   };

   //This is needed so we can hide other views appropriately.
   self.isQuickReceive = function () {
      return $state.current.name.endsWith('.quick-receive');
   };

   //Get the line numbers to process.  This gets a collection for this particular PO.  If there is a list of them, we will in turn
   //open the VA Surplus popup for each line in the collection.
   self.initializeValueAddSurplus = function (pono, posuf) {
      self.vaSurplusLineNumberList = [0];

      var poeiInitializeVaSurplusCriteria = {
         pono: pono,
         posuf: posuf,
         jrnlno: base.journal.gJrnlno
      };

      DataService.post('api/po/aspoentry/poeiinitializevasurplus', { data: poeiInitializeVaSurplusCriteria, busy: false }, function (data) {
         self.vaSurplusLineNumberList = data.split(base.FIELD_ARRAY_DELIMITER_PIPE);
         self.vaSurplusProcessingCount = 0;
         self.vaSurplusLineNumberMaxCount = self.vaSurplusLineNumberList.length;

         self.launchValueAddSurplus('poei.quick-receive', pono, posuf);
      });
   };

   self.launchValueAddSurplus = function (parent, pono, posuf) {
      var criteria = {
         pvPasspono: pono,
         pvPassposuf: posuf,
         pvVano: 0,
         pvVasuf: 0,
         pvSctncode: '',
         pvCompletefl: true,
         lineNumber: self.vaSurplusLineNumberList[self.vaSurplusProcessingCount]
      };

      $state.go(parent + '.valueaddreceiving-surplus', {
         callingState: null,  //This is null from POEI because we don't want the control to change states since we might have to iterate thru lines.
         menuFunction: base.MENU_FUNCTION_POEI,
         currentCount: self.vaSurplusProcessingCount,
         maximumCount: self.vaSurplusLineNumberMaxCount,
         vaReceiptCreateIiSectionRequestCriteria: criteria,
         acceptCallback: self.vaFinishedProductFinishedCallback,
         cancelCallback: self.vaFinishedProductCancelCallback
      });
   };

   //After the Value Add screens are completed, then we need to recursively call the Surplus again and again thru each Line # in the
   //collection.  Once we're after the last one then display the Received message.
   self.launchValueAddSurplusRecursively = function () {
      self.vaSurplusProcessingCount++;

      if (self.vaSurplusProcessingCount < self.vaSurplusLineNumberMaxCount) {
         self.launchValueAddSurplus('poei.quick-receive', self.poeiFullReceipt.pono, self.poeiFullReceipt.posuf);
      } else {
         base.showFullReceiptFinishMessage(self.poeiFullReceipt.pono, self.poeiFullReceipt.posuf);
         //Since we have potential iterations of Line Numbers to process, we are responsible for navigating to calling view only
         //after we are complete.  Generally, the VA Surplus / Finished Product Receiving shared control would be responsible for that.
         $state.go('poei.quick-receive');
      }
   };

   self.refreshPurchaseOrder = function (isRefreshAfterFullReceipt) {
      self.isFullReceiptEnabled = false;
      self.isCancelReceivingEnabled = false;
      self.isReceivingLabelsEnabled = false;
      self.isPoSelected = false;
      self.selectedPoeiListResult = [];

      var poeiRefreshDocumentsRequest = {
         jrnlno: (base.journal && base.journal.gJrnlno ? base.journal.gJrnlno : 0),
         whse: base.criteria.whse,
         pono: base.searchPoNo,
         posuf: base.searchPoSuf
      };

      DataService.post('api/po/aspoentry/poeirefreshdocuments', { data: poeiRefreshDocumentsRequest, busy: true }, function (data) {
         if (data) {
            self.selectedPoeiListResult = data.poeilistresults[0];
            if (self.selectedPoeiListResult) {
               self.isPoSelected = true;
               self.isFullReceiptEnabled = !self.selectedPoeiListResult.correctionfl && (self.selectedPoeiListResult.batchdatcd && self.selectedPoeiListResult.batchdatcd !== base.BATCH_READY);
               self.isCancelReceivingEnabled = self.isPoSelected;
               self.isReceivingLabelsEnabled = !self.selectedPoeiListResult.correctionfl && base.isModibFlag;

               if (isRefreshAfterFullReceipt) {
                  if (self.selectedPoeiListResult.vapofl) {
                     self.initializeValueAddSurplus(self.selectedPoeiListResult.pono, self.selectedPoeiListResult.posuf);
                  } else {
                     base.showFullReceiptFinishMessage(self.selectedPoeiListResult.pono, self.selectedPoeiListResult.posuf);
                  }
               }
            }
         }
      });
   };

   self.selectedPurchaseOrderGetWarehouse = function () {
      //If a PO is selected, then go find the Warehouse.  Overwrite the Criteria with that Whse
      //since it's needed for the 'poeirefreshdocuments' API call.  If the user happens to
      //select a PO for a different warehouse, the backend logic will catch it and
      //present an exception.
      var requestCriteria = {
         pono: base.searchPoNo,
         posuf: base.searchPoSuf
      };
      DataService.get('api/po/poeh/getbypk', { params: requestCriteria, busy: true }, function (data) {
         if (data) {
            base.criteria.whse = data.whse;
            self.refreshPurchaseOrder(false);
         }
      });
   };

   self.selectedPurchaseOrder = function () {
      if (self.purchaseOrderNumber) {
         var poParts = self.purchaseOrderNumber.split(base.DOCUMENT_DELIMITER);
         if (poParts.length === 2) {
            base.searchPoNo = parseInt(poParts[0], 10);
            base.searchPoSuf = parseInt(poParts[1], 10);
         }

         self.selectedPurchaseOrderGetWarehouse();
      } else {
         self.isFullReceiptEnabled = false;
         self.isCancelReceivingEnabled = false;
         self.isReceivingLabelsEnabled = false;
         self.isPoSelected = false;
      }
   };

   self.fullReceiptContinue = function () {
      DataService.post('api/po/aspoentry/poeireceiptfinish', { data: self.poeiFullReceipt, busy: true }, function (data) {
         if (data) {
            if (base.journal.gJrnlno && base.recoveryData !== self.selectedPoeiListResult.whse) {
               RecoveryService.updateRecoveryRecord(base.MENU_FUNCTION_POEI, base.journal.gJrnlno, base.journal.gJrnlno, base.recoveryData, self.selectedPoeiListResult.whse);
               base.recoveryData = self.selectedPoeiListResult.whse;
               if (base.journal) {
                  base.journalControl.setRecoveryData(base.recoveryData);
               }
            }

            if (data.poeivaproportion) {
               $state.go('^.va-proportion-error', { callingState: '^.quick-receive', poeiVaProportion: data.poeivaproportion });
            }

            //Write changes back to main List so we don't need to re-query.
            base.poeiListResults.forEach(function (poei) {
               if (poei.pono === data.poeifullreceipt.pono && poei.posuf === data.poeifullreceipt.posuf) {
                  poei.stagecd = data.poeifullreceipt.stagecd;
                  poei.stagecdx = data.poeifullreceipt.stagecdx;
                  poei.statusinfo = data.poeifullreceipt.statusinfo;
                  poei.amounti = data.poeifullreceipt.amounti;
                  poei.batchdatcd = data.poeifullreceipt.batchdatcd;
                  poei.receiverfl = data.poeifullreceipt.receiverfl;
                  var currentIndex = base.dataset.indexOf(poei);
                  base.grid.updateRow(currentIndex);
               }
            });

            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }
            self.refreshPurchaseOrder(true);
         }
      });
   };

   self.drilldown = function () {
      if (self.selectedPoeiListResult) {
         //Call the shared logic that can be done from either here or the Main PO List drilldown form.
         base.drilldownCheckForCorrection('^.quick-receive', self.selectedPoeiListResult);
      } else {
         MessageService.error('global.error', 'message.please.enter.a.valid.purchase.order.number');
      }
   };

   self.cancelReceiving = function () {
      if (!base.journal) {
         base.showNoJournalOpenedMessage();
      } else {
         var poeiCancelWorkCriteria = {
            pono: self.selectedPoeiListResult.pono,
            posuf: self.selectedPoeiListResult.posuf,
            jrnlno: base.journal.gJrnlno,
            correctionfl: self.selectedPoeiListResult.correctionfl
         };

         DataService.post('api/po/aspoentry/poeicancelwork', { data: poeiCancelWorkCriteria, busy: true }, function (data) {
            if (data) {
               //Write changes back to main List so we don't need to re-query.
               base.poeiListResults.forEach(function (poei) {
                  if (poei.pono === data.pono && poei.posuf === data.posuf) {
                     poei.stagecd = data.stagecd;
                     poei.stagecdx = data.stagecdx;
                     poei.statusinfo = data.statusinfo;
                     poei.amounti = data.amounti;
                     poei.batchdatcd = data.batchdatcd;
                     poei.receiverfl = data.receiverfl;
                     var currentIndex = base.dataset.indexOf(poei);
                     base.grid.updateRow(currentIndex);
                  }
               });

               base.showCancelReceiptMessage(poeiCancelWorkCriteria.pono, poeiCancelWorkCriteria.posuf);
               self.refreshPurchaseOrder();
            }
         });
      }
   };

   self.fullReceiptFromJournalOpenCheck = function () {
      if (base.searchPoNo > 0) {
         var poeifullreceipt = {
            pono: base.searchPoNo,
            posuf: base.searchPoSuf,
            jrnlno: base.journal.gJrnlno
         };

         var poeiReceiptStartRequest = {
            poeifullreceipt: poeifullreceipt,
            cType: base.RECEIPT_UPDATETYPE_FULL
         };

         DataService.post('api/po/aspoentry/poeireceiptstart', { data: poeiReceiptStartRequest, busy: true }, function (data) {
            if (data) {
               self.poeiFullReceipt = data;

               if (self.poeiFullReceipt.receiverfl) {
                  var poeiDrillDown = {
                     pono: self.poeiFullReceipt.pono,
                     posuf: self.poeiFullReceipt.posuf,
                     jrnlno: self.poeiFullReceipt.jrnlno,
                     trackno: self.poeiFullReceipt.trackno
                  };
                  //When the user OK's from the Receiver screen, we continue with the update, which is done via the Callback.  If
                  //the user Cancels, we Cancel receiving on this PO, also called via the callback.
                  $state.go('^.receiver-number', {
                     callingState: '^.quick-receive',
                     poeiDrillDown: poeiDrillDown,
                     poeiListResult: self.selectedPoeiListResult,
                     acceptCallback: self.acceptReceiverNumberCallback,
                     cancelCallback: self.cancelReceiverNumberCallback
                  });
               } else {
                  self.fullReceiptContinue();
               }
            }
         });
      } else {
         MessageService.error('global.error', 'message.please.enter.a.valid.purchase.order.number');
      }
   };

   self.fullReceipt = function () {
      if (!base.journal) {
         //If we are opening the Journal, if they proceed with the open, continue and Receive the PO they wanted
         //to do a Full Receipt on.
         base.journalControl.showOpenView(self.fullReceiptJournalOpened);
      } else {
         self.fullReceiptFromJournalOpenCheck();
      }
   };

   self.fullReceiptJournalOpened = function () {
      self.fullReceiptFromJournalOpenCheck();
   };

   self.finalUpdate = function () {
      if (!base.journal) {
         base.showNoJournalOpenedMessage();
      } else {
         if (base.journal.gJrnlno > 0 && self.selectedPoeiListResult && self.selectedPoeiListResult.whse) {
            DataService.get('api/po/aspoentry/poeifinalinit/' + base.journal.gJrnlno + base.URL_PARAM_DELIMITER + self.selectedPoeiListResult.whse, { busy: true }, function (data) {
               if (data) {
                  self.poeiFinalInit = data;
                  if (self.poeiFinalInit) {
                     if (self.poeiFinalInit.updatefl) {
                        var poeiFinalUpdate = {
                           jrnlno: base.journal.gJrnlno,
                           adjbofl: self.poeiFinalInit.crctexistsfl, //Q: This seems suspect, but that's what SL-UI did.
                           crctexistsfl: self.poeiFinalInit.crctexistsfl,
                           picktype: base.PICK_TYPE_PRINT,
                           pickprinter: self.poeiFinalInit.pickprinter,
                           printorder: base.PRINT_ORDER_ORDER,
                           receipttype: base.RECEIPT_TYPE_PRINT,
                           receiptprinter: self.poeiFinalInit.receiptprinter
                        };
                        var optionsPayload = {
                           whse: self.selectedPoeiListResult.whse
                        };
                        $state.go('^.final-update', { callingState: '^.quick-receive', poeiFinalInit: self.poeiFinalInit, poeiFinalUpdate: poeiFinalUpdate, optionsPayload: optionsPayload, acceptCallback: self.acceptFinalUpdateCallback, cancelCallback: self.cancelFinalUpdateCallback });

                     } else {
                        base.closeJournalAfterFinalUpdate();
                        MessageService.info('global.information', 'message.final.update.process.has.been.completed');
                     }
                  }
               }
            });
         } else {
            MessageService.error('global.error', 'message.select.purchase.order.to.proceed');
         }
      }
   };

   self.generateReceivingReport = function () {
      if (!base.journal || base.journal.gJrnlno === 0) {
         base.showNoJournalOpenedMessage();
      } else {

         var getsassrbykeysCriteria = {
            currproc: base.OURPROC_PORU,
            trmgrlang: ''
         };
         DataService.post('api/sa/sassr/getsassrbykeys', { data: getsassrbykeysCriteria, busy: true }, function (data) {
            if (data) {
               var firstSassr = data[0];
               var poReceiptReport = {
                  linesort: firstSassr.optdef2,
                  qtyfl: firstSassr.optdef3.toLowerCase() === 'true' ? true : false,
                  brkbypofl: firstSassr.optdef4.toLowerCase() === 'true' ? true : false
               };

               $state.go('^.receiving-report', { callingState: '^.quick-receive', selectedPoeiListResult: self.selectedPoeiListResult, poReceiptReport: poReceiptReport });
            }
         });
      }
   };

   self.generateReceivingLabels = function () {
      if (!base.journal || base.journal.gJrnlno === 0) {
         base.showNoJournalOpenedMessage();
      } else {

         var ibPrintSingle = {
            jrnlno: base.journal.gJrnlno,
            pono: -99,
            posuf: -99
         };

         //We are only processing the single PO from Quick Receive.
         var selectedPurchaseOrders = [];
         var ibOrdersResult = {
            orderno: self.selectedPoeiListResult.pono,
            ordersuf: self.selectedPoeiListResult.posuf
         };
         selectedPurchaseOrders.push(ibOrdersResult);

         var ibririnitializeCriteria = {
            ibPrintSingle: ibPrintSingle,
            ibOrdersResults: selectedPurchaseOrders
         };
         DataService.post('api/shared/asibentry/ibririnitialize', { data: ibririnitializeCriteria, busy: true }, function (data) {
            if (data) {
               ibPrintSingle = data.ibprintsingle;
               selectedPurchaseOrders = data.ibordersresults;

               $state.go('^.receiving-labels', { callingState: '^.quick-receive', selectedPoeiListResult: self.selectedPoeiListResult, ibPrintSingle: ibPrintSingle, ibOrdersResults: selectedPurchaseOrders, selectedCount: 0 });
            }
         });
      }
   };

   //Callbacks
   self.drillDownAcceptReceiverNumberCallback = function () {
      self.launchDetail();
   };

   self.drillDownCancelReceiverNumberCallback = function () {
      //We still launch the detail, even if they cancel from the Receiver screen.
      self.launchDetail();
   };

   self.acceptReceiverNumberCallback = function () {
      self.fullReceiptContinue();
   };

   self.cancelReceiverNumberCallback = function () {
      self.cancelReceiving();
   };

   self.acceptFinalUpdateCallback = function (poeiFinalUpdate) {
      if (poeiFinalUpdate) {
         poeiFinalUpdate.jrnlno = base.journal.gJrnlno;
         DataService.post('api/po/aspoentry/poeifinalupdate', { data: poeiFinalUpdate, busy: true }, function () {

            RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_POEI, base.journal.gJrnlno, base.recoveryData);
            //Clear out residual data, otherwise it will confuse recovery after 1st PO entered if the warehouse remains.
            base.recoveryData = '';
            //If data exists, also need to get rid of the generic record.
            RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_POEI, base.journal.gJrnlno, base.recoveryData);

            base.closeJournalAfterFinalUpdate();
            MessageService.info('global.information', 'message.final.update.process.has.been.completed');
         });
      }
   };

   self.cancelFinalUpdateCallback = function () {
      base.updateNotSuccessful();
   };

   self.vaFinishedProductFinishedCallback = function () {
      if (self.selectedPoeiListResult) {
         self.launchValueAddSurplusRecursively();
      }
   };

   self.vaFinishedProductCancelCallback = function () {
      if (self.selectedPoeiListResult) {
         self.launchValueAddSurplusRecursively();
      }
   };

   self.initiate();

});

//This controller is used when the user gets to the "Receiver Number" view.  This is based on AO setting and
//can be accessed during the Quick Receive screen.
//Alias: rcvnbr
app.controller('PoeiReceiverNumberCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.callingState = $stateParams.callingState;
   self.poeiDrillDown = $stateParams.poeiDrillDown;
   self.poeiListResult = $stateParams.poeiListResult;
   self.FIELDCHANGE_RECEIVER_NUMBER = 'receiverno';
   self.FIELDCHANGE_EXPECTED_LINES = 'expectedln';
   self.FIELDCHANGE_EXPECTED_QUANTITY = 'expectedqty';
   self.poeiReceiverNo = {};
   
   self.back = function () {
      if (base.isFromQuickRcv) {
         self.callingState = '^.quick-receive';
      } else {
         self.callingState = '^.master';
      }
      if ($stateParams.cancelCallback) {
         $stateParams.cancelCallback(self.poeiDrillDown, self.poeiListResult);
      }
      $state.go('^.detail', { callingState: self.callingState, poeiDrillDown: self.poeiDrillDown, poeiListResult: self.poeiListResult });

   };

   self.getSubTitle = function () {
      return base.getSubTitleFullPoNumber(self.poeiDrillDown.pono, self.poeiDrillDown.posuf);
   };

   self.changeValue = function (fieldName) {
      var poeiReceiverLeaveFieldRequest = {
         poeireceiverno: self.poeiReceiverNo,
         cFieldname: fieldName
      };

      DataService.post('api/po/aspoentry/poeireceiverleavefield', { data: poeiReceiverLeaveFieldRequest, busy: true }, function (data) {
         if (data) {
            self.poeiReceiverNo = data.poeireceiverno;
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }
         }
      });
   };

   self.changeReceiverNumber = function () {
      self.changeValue(self.FIELDCHANGE_RECEIVER_NUMBER);
   };

   self.changeExpectedLines = function () {
      self.changeValue(self.FIELDCHANGE_EXPECTED_LINES);
   };

   self.changeExpectedQtyHash = function () {
      self.changeValue(self.FIELDCHANGE_EXPECTED_QUANTITY);
   };

   self.initializeReceiverNumber = function () {
      if (self.poeiDrillDown) {
         DataService.post('api/po/aspoentry/poeiinitializereceiverno', { data: self.poeiDrillDown, busy: true }, function (data) {
            if (data) {
               self.poeiReceiverNo = data;
            }
         });
      }
   };

   self.clear = function () {
      if (self.poeiReceiverNo) {
         self.poeiReceiverNo.receiverno = String.Empty;
         self.poeiReceiverNo.expectedln = 0;
         self.poeiReceiverNo.expectedqty = 0;
         self.poeiReceiverNo.actualln = 0;
         self.poeiReceiverNo.actualqty = 0;
         self.poeiReceiverNo.diffln = 0;
         self.poeiReceiverNo.diffqty = 0;
      }
   };

   self.submit = function () {
      if (self.poeiReceiverNo) {
         if (base.isFromQuickRcv) {
            self.callingState = '^.quick-receive';
         } else {
            self.callingState = '^.master';
         }

         DataService.post('api/po/aspoentry/poeiupdatereceiverno', { data: self.poeiReceiverNo, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            if ($stateParams.acceptCallback) {
               $stateParams.acceptCallback(self.callingState, self.poeiDrillDown, self.poeiListResult);
            }
            $state.go('^.detail', { callingState: self.callingState, poeiDrillDown: self.poeiDrillDown, poeiListResult: self.poeiListResult });
         });
      }
   };

   self.initializeReceiverNumber();
});

//This controller is used when the user gets to a place where the "Value Add Proportion Error" is shown.  Places
//such as: Quick Receive during the Final Update when conditions occur.
//Alias: vpe
app.controller('PoeiVaProportionErrorCtrl', function ($scope, $state, $stateParams, $translate) {
   var self = this;
   var base = $scope.base;
   self.callingState = $stateParams.callingState;
   self.poReceivingReport = $stateParams.poReceivingReport;
   self.infoMessage = $translate.instant('message.quantities.must.be.changed.to.be.proportionate');

   self.back = function () {
      $state.go(self.callingState);
   };

   self.getSubTitle = function () {
      return base.getSubTitleFullPoNumber(self.poeiVaProportion.pono, self.poeiVaProportion.posuf);
   };
});

//This controller is used when the user selects the 'Receiving Report' (i.e. from Quick Receive & Main List).  It contains a few criteria
//fields along with the printer control and allows them to print the report for the selected Purchase Order.
//Alias: rr
app.controller('PoeiReceivingReportCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   var self = this;
   var base = $scope.base;
   self.callingState = $stateParams.callingState;
   self.selectedPoeiListResult = $stateParams.selectedPoeiListResult;
   self.poReceiptReport = $stateParams.poReceiptReport;

   self.getSubTitle = function () {
      if (self.selectedPoeiListResult) {
         return base.getSubTitleFullPoNumber(self.selectedPoeiListResult.pono, self.selectedPoeiListResult.posuf);
      } else {
         return $translate.instant('global.purchase.orders.for.current.journal');
      }
   };

   self.back = function () {
      if (self.callingState === '^.quick-receive')
         $state.go(self.callingState, { purchaseOrderNumber: self.selectedPoeiListResult.ponox });
      else
         $state.go(self.callingState);
   };

   self.submitContinueWithPrinterSettings = function () {
      if (self.poReceiptReport && self.receiptReportPrinterControl) {
         var poeiReceiptReportPrintCriteria = {
            poreceiptreport: self.poReceiptReport,
            printersettings: self.receiptReportPrinterControl.printerSettings,
            pvJrnlno: base.journal.gJrnlno
         };

         DataService.post('api/po/aspoentry/poeireceiptreportprint', { data: poeiReceiptReportPrintCriteria, busy: true }, function () {
            self.back();
         });
      }
   };

   self.submit = function () {
      //TODO: I see at least one case where the validation in the Printer Control isn't trapping (i.e. File type without a file name)
      self.receiptReportPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails;
            self.submitContinueWithPrinterSettings();
         }
      });
   };

   //TODO: Backend issue with the InitializePrinter call.  Only should be seeing these options for printtypes = 'p,f,e,o';
});

//This controller is used when the user selects the 'Receiving Labels' (i.e. from Quick Receive & Main List).  It contains a few criteria
//fields along with the printer control and allows them to print the labels for the selected Purchase Order.
//Alias: rl
app.controller('PoeiReceivingLabelsCtrl', function ($scope, $state, $stateParams, $translate, DataService) {
   var self = this;
   var base = $scope.base;
   self.callingState = $stateParams.callingState;
   self.selectedPoeiListResult = $stateParams.selectedPoeiListResult;
   self.ibPrintSingle = $stateParams.ibPrintSingle;
   self.ibOrdersResults = $stateParams.ibOrdersResults;
   self.selectedCount = $stateParams.selectedCount;

   self.getSubTitle = function () {
      if (self.selectedPoeiListResult) {
         return base.getSubTitleFullPoNumber(self.selectedPoeiListResult.pono, self.selectedPoeiListResult.posuf);
      } else {
         if (self.selectedCount > 1) {
            return self.selectedCount + ' ' + $translate.instant('global.selected.purchase.orders');
         } else {
            return $translate.instant('global.selected.purchase.order');
         }
      }
   };

   self.back = function () {
      $state.go(self.callingState);
   };

   self.submitContinueWithPrinterSettings = function () {
      if (self.ibOrdersResults && self.ibPrintSingle && self.receiptLabelsPrinterControl) {
         var ibrirDemandPrintCriteria = {
            ibordersresults: self.ibOrdersResults,
            ibprintsingle: self.ibPrintSingle,
            printersettings: self.receiptLabelsPrinterControl.printerSettings
         };

         DataService.post('api/shared/asibentry/ibrirdemandprint', { data: ibrirDemandPrintCriteria, busy: true }, function () {
            self.back();
         });
      }
   };

   self.submit = function () {
      //TODO: I see at least one case where the validation in the Printer Control isn't trapping (i.e. File type without a file name)
      self.receiptLabelsPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails;
            self.submitContinueWithPrinterSettings();
         }
      });
   };

   //TODO: Backend issue with the InitializePrinter call.  Only should be seeing these options for printtypes = 'p,f,e,o';
});

//This controller is used when the user performs a "Final Update" (i.e. from Quick Receive)
//Alias: fu
app.controller('PoeiFinalUpdateCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.callingState = $stateParams.callingState;
   self.poeiFinalInit = $stateParams.poeiFinalInit;
   self.poeiFinalUpdate = $stateParams.poeiFinalUpdate;
   self.optionsPayload = $stateParams.optionsPayload;

   self.getSubTitle = function () {
      return MessageService.get('global.journal.number') + base.LABEL_DELIMITER + self.poeiFinalUpdate.jrnlno + base.SUBMENU_DELIMITER +
         MessageService.get('global.warehouse') + base.LABEL_DELIMITER + self.optionsPayload.whse;
   };

   self.changeReceiptsType = function () {
      self.poeiFinalUpdate.receiptprinter = '';
   };

   self.changePickType = function () {
      self.poeiFinalUpdate.pickprinter = '';
   };

   self.back = function () {
      if ($stateParams.cancelCallback) {
         $stateParams.cancelCallback();
      }
      $state.go(self.callingState);
   };

   self.validateAndSubmit = function () {
      //NOTE: Due to the different fields on the screen based on the dropdowns, UI side validation won't work with the submit-form.
      //If the user were to hit OK while the print type is a printer but then changes the type to a file, then they will get phantom
      //errors on a non-visible field.
      var isValid = true;
      if (self.poeiFinalInit.receiptsensitive) {
         if (!self.poeiFinalUpdate.receiptprinter || self.poeiFinalUpdate.receiptprinter.length === 0) {
            isValid = false;
            if (self.poeiFinalUpdate.receipttype === base.PRINT_TYPE_FILE) {
               MessageService.error('global.error', 'message.receipt.file.is.required');
            } else {
               MessageService.error('global.error', 'message.receipt.printer.is.required');
            }
         }
      }

      if (self.poeiFinalInit.picksensitive) {
         if (!self.poeiFinalUpdate.pickprinter || self.poeiFinalUpdate.pickprinter.length === 0) {
            isValid = false;
            if (self.poeiFinalUpdate.picktype === base.PRINT_TYPE_FILE) {
               MessageService.error('global.error', 'message.pick.file.is.required');
            } else {
               MessageService.error('global.error', 'message.pick.printer.is.required');
            }
         }
      }

      if (isValid) {
         if ($stateParams.acceptCallback) {
            $stateParams.acceptCallback(self.poeiFinalUpdate);
         }
         $state.go(self.callingState);
      }
   };
});

//This controller is used when the user performs a "Drilldown" on a selected row.  It opens up a lot of features to
//maintain a Purchase Order Receipt including header and line information.
//Alias: dtl
app.controller('PoeiDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.callingState = $stateParams.callingState;
   self.poeiDrillDown = $stateParams.poeiDrillDown;
   self.poeiListResult = $stateParams.poeiListResult;

   self.ITEMSGRID_FIELD_UNIT = 'unit';
   self.ITEMSGRID_FIELD_QTYRCV = 'qtyrcv';
   self.ITEMSGRID_FIELD_CANCELFL = 'cancelfl';
   self.ITEMSGRID_FIELD_PRICE = 'price';
   self.ITEMSGRID_FIELD_EACHFL = 'eachfl';
   self.poeiDetailHeader = {};
   self.poeiDetailTotal = {};
   self.poeiDetailAddons = {};
   self.poeiLineDetail = [];
   self.tiedResaleNumber = {};
   self.isReceiverEnabled = false;
   self.isDetailHeaderEnabled = base.securitySubLevelHeader > 2 ? true : false;
   self.isDetailAddonsEnabled = base.securitySubLevelAddons > 2 ? true : false;
   self.isDetailSelectedDefaultTabHeader = false;
   self.isDetailSelectedDefaultTabAddon = false;
   self.isDetailSelectedDefaultTabLines = true;
   self.currentlySelectedRowIndex = 0;
   self.selectedRows = [];
   self.itemsGridEditableFields = ["qtyrcv", "cancelfl", "price", "eachfl"];
   self.isDetailHeaderTabVisible = base.securitySubLevelHeader > 1 ? true : false;
   self.isDetailAddonsTabVisible = base.securitySubLevelAddons > 1 ? true : false;
   self.isDetailLinesTabVisible = base.securitySubLevelLines > 1 ? true : false;
   self.vaSurplusLineNumberList = [0];
   self.vaSurplusProcessingCount = 0;
   self.vaSurplusLineNumberMaxCount = 0;
   self.isChgRcvFl = false;
   self.isCorrectionFl = self.poeiDrillDown.correctionfl;

   //Make sure it's initialized each time going into detail so it doesn't stick for other PO's.
   base.isChgRcvFlForClose = false;

   self.isDetail = function () {
      return $state.is('poei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('poei.detail');
   };

   self.getSubTitle = function () {
      return base.getSubTitleFullPoNumber(self.poeiDrillDown.pono, self.poeiDrillDown.posuf);
   };

   self.setDetailSelectedDefaultTab = function () {
      self.isDetailSelectedDefaultTabHeader = false;
      self.isDetailSelectedDefaultTabAddons = true;
      self.isDetailSelectedDefaultTabLines = false;
   };

   //Write changes back to main List so we don't need to re-query.
   self.updateMainPoList = function (data) {
      if (base.poeiListResults) {
         base.poeiListResults.forEach(function (poei) {
            if (poei.pono === self.poeiDrillDown.pono && poei.posuf === self.poeiDrillDown.posuf) {
               poei.stagecd = data.stagecd;
               poei.stagecdx = data.stagecdx;
               poei.statusinfo = data.statusinfo;
               poei.amounti = data.amounti;
               poei.receiverfl = data.receiverfl;
               poei.batchdatcd = data.batchdatcd;
               var currentIndex = base.dataset.indexOf(poei);
               base.grid.updateRow(currentIndex);
            }
         });
      }
   };

   self.cancelReceivingWork = function () {
      if (base.journalControl) {
         var poeiCancelWorkCriteria = {
            pono: self.poeiDrillDown.pono,
            posuf: self.poeiDrillDown.posuf,
            jrnlno: self.poeiDrillDown.jrnlno,
            correctionfl: self.poeiDrillDown.correctionfl
         };

         DataService.post('api/po/aspoentry/poeicancelwork', { data: poeiCancelWorkCriteria, busy: true }, function (data) {
            self.updateMainPoList(data);
            //Pass the full PO # back so we can refresh the PO # to continue where they left off.
            $state.go(self.callingState, { purchaseOrderNumber: self.poeiListResult.ponox });
         });
      } else {
         //Pass the full PO # back so we can refresh the PO # to continue where they left off.
         $state.go(self.callingState, { purchaseOrderNumber: self.poeiListResult.ponox });
      }
   };

   self.navBack = function () {
      MessageService.yesNo('global.question', 'question.selecting.back.will.cancel.receiving.on.po',
         // Yes processing
         function () {
            self.cancelReceivingWork();
         });
   };

   //Get the line numbers to process.  This gets a collection for this particular PO.  If there is a list of them, we will in turn
   //open the VA Surplus popup for each line in the collection.
   self.initializeValueAddSurplus = function (pono, posuf) {
      self.vaSurplusLineNumberList = [0];

      var poeiInitializeVaSurplusCriteria = {
         pono: pono,
         posuf: posuf,
         jrnlno: base.journal.gJrnlno
      };

      DataService.post('api/po/aspoentry/poeiinitializevasurplus', { data: poeiInitializeVaSurplusCriteria, busy: false }, function (data) {
         self.vaSurplusLineNumberList = data.split(base.FIELD_ARRAY_DELIMITER_PIPE);
         self.vaSurplusProcessingCount = 0;
         self.vaSurplusLineNumberMaxCount = self.vaSurplusLineNumberList.length;

         self.launchValueAddSurplus('poei.detail', pono, posuf);
      });
   };

   self.launchValueAddSurplus = function (parent, pono, posuf) {
      var criteria = {
         pvPasspono: pono,
         pvPassposuf: posuf,
         pvVano: 0,
         pvVasuf: 0,
         pvSctncode: '',
         pvCompletefl: true,
         lineNumber: self.vaSurplusLineNumberList[self.vaSurplusProcessingCount]
      };

      //Yes, from here, we want to go to calling place when finished with work from the VA Surplus / Finished Product Receiving screen (i.e. this will also close Detail).
      $state.go(parent + '.valueaddreceiving-surplus', {
         callingState: null,  //This is null from POEI because we don't want the control to change states since we might have to iterate thru lines.
         menuFunction: base.MENU_FUNCTION_POEI,
         currentCount: self.vaSurplusProcessingCount,
         maximumCount: self.vaSurplusLineNumberMaxCount,
         vaReceiptCreateIiSectionRequestCriteria: criteria,
         acceptCallback: self.vaFinishedProductFinishedCallback,
         cancelCallback: self.vaFinishedProductCancelCallback
      });
   };

   //After the Value Add screens are completed, then we need to recursively call the Surplus again and again thru each Line # in the
   //collection.  Once we're after the last one then display the Received message.
   self.launchValueAddSurplusRecursively = function () {
      self.vaSurplusProcessingCount++;

      //We need to special handling of the callingState because when we get down in the VA controls, "^" relative will not work.  We need
      //the full name.
      var callingStateForVaSurplus = 'poei.master';
      if (self.callingState && self.callingState === '^.quick-receive') {
         callingStateForVaSurplus = 'poei.quick-receive';
      } else if (self.callingState && self.callingState === '^.detail') {
         callingStateForVaSurplus = 'poei.detail';
      }

      if (self.vaSurplusProcessingCount < self.vaSurplusLineNumberMaxCount) {
         self.launchValueAddSurplus(callingStateForVaSurplus, self.poeiDrillDown.pono, self.poeiDrillDown.posuf);
      } else {
         base.showFullReceiptFinishMessage(self.poeiDrillDown.pono, self.poeiDrillDown.posuf);
         //Since we have potential iterations of Line Numbers to process, we are responsible for navigating to calling view only
         //after we are complete.  Generally, the VA Surplus / Finished Product Receiving shared control would be responsible for that.
         $state.go(callingStateForVaSurplus);
      }
   };

   self.receivingWork = function () {
      if (base.isChgRcvFlForClose && self.isChgRcvFl) {
         base.isChgRcvFlForClose = false;
         MessageService.error('global.warning', 'message.discrepancy.from.po.please.verify.changes.made');
         //Do not close.  Make sure they see it.  Reset the flag, so only ask one time.
         return;
      }

      DataService.post('api/po/aspoentry/poeidetailfinish', { data: self.poeiDrillDown, busy: true }, function (data) {
         if (data) {
            if (data.poeidetailfinish && data.poeidetailfinish.receiverfl) {
               //When the user OK's from the Receiver screen, we continue with the update, which is done via the Callback.  If
               //the user Cancels, we Cancel receiving on this PO, also called via the callback.
               $state.go('^.receiver-number', {
                  callingState: '^.detail',
                  poeiDrillDown: self.poeiDrillDown,
                  poeiListResult: self.poeiListResult,
                  acceptCallback: self.acceptReceiverNumberCallback,
                  cancelCallback: self.cancelReceiverNumberCallback
               });
            } else if (data.cWarningMessage) {
               if (data.cWarningMessage === 'VA_PROPORTION_ERROR' && data.poeivaproportion) {
                  $state.go('^.va-proportion-error', { callingState: '^.detail', poeiVaProportion: data.poeivaproportion });
               } else {
                  MessageService.info('global.information', data.cWarningMessage);
               }
            } else if (self.poeiListResult.vapofl) {
               self.initializeValueAddSurplus(self.poeiListResult.pono, self.poeiListResult.posuf);
            } else {
               self.updateMainPoList(data.poeidetailfinish);
               //Pass the full PO # back so we can refresh the PO # to continue where they left off.
               $state.go(self.callingState, { purchaseOrderNumber: self.poeiListResult.ponox });
            }
         }
      });
   };

   self.launchReceiver = function () {
      $state.go('^.receiver-number', {
         callingState: '^.detail',
         poeiDrillDown: self.poeiDrillDown,
         poeiListResult: self.poeiListResult,
         acceptCallback: self.acceptReceiverNumberCallback,
         cancelCallback: self.cancelReceiverNumberCallback
      });
   };

   self.saveHeader = function () {
      if (self.poeiDetailHeader) {
         DataService.post('api/po/aspoentry/poeiupdateheader', { data: self.poeiDetailHeader, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      }
   };

   self.initializeLines = function () {
      DataService.post('api/po/aspoentry/poeidisplaylines', { data: self.poeiDrillDown, busy: true }, function (data) {
         if (data) {
            self.poeiLineDetail = data;
         }
      });
   };

   self.saveAddons = function () {
      DataService.post('api/po/aspoentry/poeiupdateaddons', { data: self.poeiDetailAddons, busy: true }, function (data) {
         if (data) {
            if (data.textmsg2 && data.textmsg2.length > 0) {
               //TODO: Launch VA Manual Addons screen here.
               //TODO: From the callback of that screen, we will call:  self.initializeLines()
            } else {
               self.initializeLines();
            }
         }
      });
   };

   self.setIsReceiverNumberEnabled = function () {
      self.isReceiverEnabled = (self.poeiDetailHeader.correctiontext.length === 0 && self.poeiListResult && (self.poeiListResult.transtype === base.TRANSTYPE_PURCHASE_ORDER || self.poeiListResult.transtype === base.TRANSTYPE_BLANKET_RELEASE) && self.isDetailHeaderEnabled);
   };

   self.addonsFieldChanged = function (fieldName, addonNumber) {
      var poeiAddonLeaveFieldCriteria = {
         poeidetailaddons: self.poeiDetailAddons,
         pvFieldname: fieldName,
         pvAddonno: addonNumber
      };

      DataService.post('api/po/aspoentry/poeiaddonleavefield', { data: poeiAddonLeaveFieldCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiDetailAddons = data;
         }
      });
   };

   self.isAddonCapType1Visible = function () {
      return self.poeiDetailAddons && self.poeiDetailAddons.addoncaptype1 && self.poeiDetailAddons.addoncaptype1.toLowerCase() === base.ADDON_DISTR_TYPE_CAPITALIZE;
   };

   self.isAddonCapType2Visible = function () {
      return self.poeiDetailAddons && self.poeiDetailAddons.addoncaptype2 && self.poeiDetailAddons.addoncaptype2.toLowerCase() === base.ADDON_DISTR_TYPE_CAPITALIZE;
   };

   self.isAddonCapType3Visible = function () {
      return self.poeiDetailAddons && self.poeiDetailAddons.addoncaptype3 && self.poeiDetailAddons.addoncaptype3.toLowerCase() === base.ADDON_DISTR_TYPE_CAPITALIZE;
   };

   self.isAddonCapType4Visible = function () {
      return self.poeiDetailAddons && self.poeiDetailAddons.addoncaptype4 && self.poeiDetailAddons.addoncaptype4.toLowerCase() === base.ADDON_DISTR_TYPE_CAPITALIZE;
   };

   self.initializeAddons = function () {
      DataService.post('api/po/aspoentry/poeiinitializeaddons', { data: self.poeiDrillDown, busy: true }, function (data) {
         if (data) {
            self.poeiDetailAddons = data;
            self.initializeLines();
         }
      });
   };

   self.saveLines = function (fieldName, oldValue, poeiLineDetailRow) {
      DataService.post('api/po/aspoentry/poeilineupdate', { data: poeiLineDetailRow, busy: false }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            if (self.isChgRcvFl) {
               self.isChgRcvFl = false;
               MessageService.error('global.warning', 'message.discrepancy.from.po.please.verify.changes.made');
            }

            //Write changes back to lines collection so that we don't need to re-query.
            self.poeiLineDetail.forEach(function (row) {
               if (row.lineno === data.poeilinedetail.lineno) {
                  var currentIndex = self.poeiLineDetail.indexOf(row);
                  Utils.replaceObject(row, data.poeilinedetail);
                  self.lineItemsGrid.updateRow(currentIndex);
               }
            });

            self.poeiDetailTotal = data.poeidetailtotal;

            //NOTE: SL-UI called: InitializeSerialLot, InitializeTallys, WM Bin Allocation Initialization (Only if visible) here.  We don't need to here.

            if (self.selectedRows && self.currentlySelectedRowIndex < self.selectedRows.length) {
               self.setQtyToZero(self.selectedRows[self.currentlySelectedRowIndex]);
            }

            //User Hook (do not rename)
            if (self.saveLinesContinue) {
               self.saveLinesContinue(fieldName, oldValue, data.poeilinedetail);
            }
         }
      });
   };

   self.qualifyEditableField = function (fieldName, value) {
      if (self.itemsGridEditableFields.indexOf(fieldName) > -1) {
         return true;
      } else if (fieldName === self.ITEMSGRID_FIELD_UNIT && value && value.length > 0) {
         return true;
      } else {
         return false;
      }
   };

   self.onItemsGridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue && self.qualifyEditableField(args.column.field, args.value)) {
         var poeiLineDetailRow = self.poeiLineDetail[args.row];
         if (poeiLineDetailRow) {
            //Operator level flag to provide warning, and the PO isn't just a correction.
            if (base.isVerChgRcvFl && !self.isCorrectionFl) {
               switch (args.column.field) {
                  case self.ITEMSGRID_FIELD_PRICE:
                  case self.ITEMSGRID_FIELD_EACHFL:
                  case self.ITEMSGRID_FIELD_CANCELFL:
                  case self.ITEMSGRID_FIELD_UNIT:
                     self.isChgRcvFl = true;
                     base.isChgRcvFlForClose = true;
                     break;
                  case self.ITEMSGRID_FIELD_QTYRCV:
                     if (args.value !== poeiLineDetailRow.qtyord &&
                        args.value !== args.oldValue) {
                        self.isChgRcvFl = true;
                        base.isChgRcvFlForClose = true;
                     }
                     break;
                  default:
               }
            }

            var poeiLineLeaveFieldCriteria = {
               poeilinedetail: poeiLineDetailRow,
               pvFieldname: args.column.field
            };

            DataService.post('api/po/aspoentry/poeilineleavefield', { data: poeiLineLeaveFieldCriteria, busy: true }, function (data) {
               if (data) {
                  self.saveLines(args.column.field, args.oldValue, data);
               }
            });
         }
      }
   };

   self.itemsGridIsOeLineEnabled = function () {
      var selectedRow = GridService.getSelectedRecord(self.lineItemsGrid);
      if (self.lineItemsGrid.isOneRowSelected && selectedRow && selectedRow.repriceoeSensitive) {
         return true;
      } else {
         return false;
      }
   };

   self.lineUpdate = function (poeiLineDetailRow, lForceRefresh) {
      DataService.post('api/po/aspoentry/poeilineupdate', { data: poeiLineDetailRow, busy: false }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            //Write changes back to lines collection so that we don't need to re-query.
            self.poeiLineDetail.forEach(function (row) {
               if (row.lineno === data.poeilinedetail.lineno) {
                  row.qtyrcv = data.poeilinedetail.qtyrcv;
                  var currentIndex = self.poeiLineDetail.indexOf(row);
                  self.lineItemsGrid.updateRow(currentIndex);
               }
            });

            self.poeiDetailTotal = data.poeidetailtotal;

            //if (lForceRefresh) {
            //SL-UI: LoadPOEIDisplayLines call was done here.
            //}

            //SL-UI WM Bin Allocation Initialization was done here.

            if (self.selectedRows && self.currentlySelectedRowIndex < self.selectedRows.length) {
               self.setQtyToZero(self.selectedRows[self.currentlySelectedRowIndex]);
            }
         }
      });
   };

   self.lineUpdateQtyOrdered = function (poeiLineDetailRow) {
      DataService.post('api/po/aspoentry/poeilineupdate', { data: poeiLineDetailRow, busy: false }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            //Write changes back to lines collection so that we don't need to re-query.
            self.poeiLineDetail.forEach(function (row) {
               if (row.lineno === data.poeilinedetail.lineno) {
                  row.qtyrcv = data.poeilinedetail.qtyrcv;
                  row.stkqtyrcv = data.poeilinedetail.stkqtyrcv;
                  var currentIndex = self.poeiLineDetail.indexOf(row);
                  self.lineItemsGrid.updateRow(currentIndex);
               }
            });

            self.poeiDetailTotal = data.poeidetailtotal;

            //SL-UI Serials Lots Initialization, Tallys Initialization WM Bin Allocation Initialization was done here.

            if (self.selectedRows && self.currentlySelectedRowIndex < self.selectedRows.length) {
               self.setQtyToQtyOrdered(self.selectedRows[self.currentlySelectedRowIndex]);
            }
         }
      });
   };

   self.itemsGridSetRepriceOeLine = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      var poeiLineRepriceCriteria = {
         poeirowid: selectedRecord.poeirowid,
         userfield: selectedRecord.userfield
      };

      DataService.post('api/po/aspoentry/poeilinereprice', { data: poeiLineRepriceCriteria, busy: true }, function () {
      });
   };

   self.setQtyToZero = function (poeiLineDetailRow) {
      //Increment so next in the list can be processed, if more than one.
      self.currentlySelectedRowIndex++;

      poeiLineDetailRow.qtyrcv = 0;

      var poeiLineLeaveFieldCriteria = {
         poeilinedetail: poeiLineDetailRow,
         pvFieldname: base.LINELEAVE_QTY_RECEIVED
      };

      DataService.post('api/po/aspoentry/poeilineleavefield', { data: poeiLineLeaveFieldCriteria, busy: false }, function (data) {
         if (data) {
            self.lineUpdate(data, false);
         }
      });
   };

   self.setQtyToQtyOrdered = function (poeiLineDetailRow) {
      //Increment so next in the list can be processed, if more than one.
      self.currentlySelectedRowIndex++;

      poeiLineDetailRow.qtyrcv = poeiLineDetailRow.qtyord;

      var poeiLineLeaveFieldCriteria = {
         poeilinedetail: poeiLineDetailRow,
         pvFieldname: base.LINELEAVE_QTY_ORDERED
      };

      DataService.post('api/po/aspoentry/poeilineleavefield', { data: poeiLineLeaveFieldCriteria, busy: false }, function (data) {
         if (data) {
            self.lineUpdateQtyOrdered(data);
         }
      });
   };

   self.itemsGridSetQtyToZero = function () {
      self.selectedRows = GridService.getSelectedRecords(self.lineItemsGrid);
      //Start off and process the 1st PO in the selected list of Purchase Orders to cancel.
      self.currentlySelectedRowIndex = 0;
      if (self.selectedRows) {
         self.setQtyToZero(self.selectedRows[self.currentlySelectedRowIndex]);
      }
   };

   self.itemsGridSetQtyToOrdered = function () {
      self.selectedRows = GridService.getSelectedRecords(self.lineItemsGrid);
      //Start off and process the 1st PO in the selected list of Purchase Orders to cancel.
      self.currentlySelectedRowIndex = 0;
      if (self.selectedRows) {
         self.setQtyToQtyOrdered(self.selectedRows[self.currentlySelectedRowIndex]);
      }
   };

   self.itemsGridAddLineItem = function () {
      if (self.poeiListResult.transtype.toLowerCase() === "do") {
         MessageService.error('global.error', 'message.line.items.cannot.be.added.to.a.direct.order.during.receiving.6593');
      } else {
         $state.go('^.detail-line-add-line', {
            parentCallingState: self.callingState,
            poeiDrillDown: self.poeiDrillDown,
            poeiListResult: self.poeiListResult
         });
      }
   };

   self.isItemsGridQtyRcvCellEditable = function (row, cell, value, column, item) {
      return item.qtyrcvSensitive;
   };

   self.isItemsGridUnitCellEditable = function (row, cell, value, column, item) {
      return item.unitSensitive;
   };

   self.isItemsGridCancelFlEditable = function (row, cell, value, column, item) {
      return item.cancelflSensitive;
   };

   self.isItemsGridPriceEditable = function (row, cell, value, column, item) {
      return item.dsplpriceSensitive;
   };

   self.isItemsGridEachFlEditable = function (row, cell, value, column, item) {
      return item.eachflSensitive;
   };

   self.initializeDetails = function () {
      var poInitializeHeaderCriteria = {
         pono: self.poeiDrillDown.pono,
         posuf: self.poeiDrillDown.posuf,
         jrnlno: self.poeiDrillDown.jrnlno,
         correctionfl: self.poeiDrillDown.correctionfl,
         userfield: self.poeiDrillDown.userfield,
         trackno: self.poeiDrillDown.trackno
      };

      DataService.post('api/po/aspoentry/poeiinitializeheader', { data: poInitializeHeaderCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiDetailHeader = data.poeidetailheader;
            self.poeiDetailTotal = data.poeidetailtotal;

            self.tiedResaleNumber = data.poeidetailheader.orderaltno > 0 ? data.poeidetailheader.orderaltno + base.DOCUMENT_DELIMITER + Utils.pad(data.poeidetailheader.orderaltsuf, 2) : '';

            self.setIsReceiverNumberEnabled();

            self.initializeAddons();
         }
      });
   };

   // Callback from when the Line Quick View screen, back is pressed.
   self.acceptReturnBackFromItemQuickView = function (payload) {
      var backCallingState = payload.callingState;   
      self.callingState = payload.parentCallingState;
      self.poeiDrillDown = payload.poeiDrillDown;
      self.poeiListResult = payload.poeiListResult;
      self.poeiLines = payload.poeiLines;
      self.lineno = payload.poeiLineNum;

      //used for the "copy to remaining bin locs" checkbox.
      //remaining line items bin locs get the selected line's new value
      //If bin loc flag is not true, then only the selected line will change
      self.poeiLineDetail.forEach(function (record, indx) {
         if (self.poeiLines.copybinlocsfl == true) {
            if (record.lineno >= self.lineno) {
               record.binloc1 = self.poeiLines.binloc1;
               self.lineItemsGrid.updateRow(indx);
            }
         } else if (record.poeirowid == self.poeiLines.poeirowid) {
            record.binloc1 = self.poeiLines.binloc1;
            self.lineItemsGrid.updateRow(indx);
         }

      }); 

      $state.go(backCallingState);
   };

   self.launchItemQuickView = function (selectedRow) {
      if (selectedRow) {
         $state.go('.detail-line-quick-view', {
            lqvParentCallingState: self.callingState,
            lqvCallingState: '^',
            lqvPoeiDrillDown: self.poeiDrillDown,
            lqvPoeiLineDetail: selectedRow,
            lqvPoeiListResult: self.poeiListResult,
            lqvCallback: self.acceptReturnBackFromItemQuickView
         });
      }
   };

   self.lineItemQuickView = function () {
      var selectedRow = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRow) {
         self.launchItemQuickView(selectedRow);
      }
   };

   self.drilldownLineItem = function (e, args) {
      var drilldownRow = args[0].item;
      if (drilldownRow) {
         self.launchItemQuickView(drilldownRow);
      }
   };

   // Callback from when the Sub/Supercedes screen, back or 'Save' is pressed.
   self.acceptReturnBackFromSubSupercede = function (payload) {
      var backCallingState = payload.callingState;
      self.callingState = payload.parentCallingState;
      self.poeiDrillDown = payload.poeiDrillDown;
      self.poeiListResult = payload.poeiListResult;

      //Take in the single row returned, and update the collection with the changes.
      //The collection is contained in self.poLineDetail which is updated in lineUpdate.
      self.lineUpdate(payload.poeiLineDetail, false);

      $state.go(backCallingState);
   };

   self.launchSubSupersede = function () {
      var selectedRow = GridService.getSelectedRecord(self.lineItemsGrid);
      $state.go('.sub-supersede', {
         ssParentCallingState: self.callingState,
         ssCallingState: '^',
         ssPoeiDrillDown: self.poeiDrillDown,
         ssPoeiLineDetail: selectedRow,
         ssPoeiListResult: self.poeiListResult,
         ssCallback: self.acceptReturnBackFromSubSupercede
      });
   };

   //Callbacks
   self.acceptReceiverNumberCallback = function (poeiDrillDown, poeiListResult) {
      self.poeiDrillDown = poeiDrillDown;
      self.poeiListResult = poeiListResult;
   };

   self.cancelReceiverNumberCallback = function (poeiDrillDown, poeiListResult) {
      self.poeiDrillDown = poeiDrillDown;
      self.poeiListResult = poeiListResult;
   };

   self.vaFinishedProductFinishedCallback = function () {
      if (self.poeiDrillDown) {
         self.launchValueAddSurplusRecursively();
      }
   };

   self.vaFinishedProductCancelCallback = function () {
      if (self.poeiDrillDown) {
         self.launchValueAddSurplusRecursively();
      }
   };

   self.initializeDetails();
});

//This controller is used when the user clicks "Sub/Supersede" button from the Line Detail Quick View drilldown Page.  It is
//a sub-view of the Line Detail Quick View page where they can view details.  This will allow the user to select a Substitute or Supersede
//item for the selected line.
//Alias: dlss
app.controller('PoeiDetailLineSubSupersedeCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.parentCallingState = $stateParams.ssParentCallingState;
   self.callingState = $stateParams.ssCallingState;
   self.poeiDrillDown = $stateParams.ssPoeiDrillDown;
   self.poeiLineDetail = $stateParams.ssPoeiLineDetail;
   self.poeiListResult = $stateParams.ssPoeiListResult;
   self.callback = $stateParams.ssCallback;
   self.poeiLineSubSuper = {};

   self.back = function () {
      //Go back to the Detail screen, but also send the parent's calling state back as payload.  That's important so that
      //when they submit/cancel receiving, they go back to the right place.
      //Important Note:  We need to do this 'callback' methodology to get the parameters back instead of doing
      //the $state.go here because of those parameters.  Since parameters are sent, then the other view
      //is refreshed.  We can't have that because then the user loses their spot.
      if (self.callback) {
         //Call the function, which sends the parameters, but also does the 'state.go' to returning spot.
         self.callback({
            callingState: self.callingState,
            parentCallingState: self.parentCallingState,
            poeiDrillDown: self.poeiDrillDown,
            poeiLineDetail: self.poeiLineDetail,
            poeiListResult: self.poeiListResult
         });
      }
   };

   self.getSubTitle = function () {
      var subTitle = base.getSubTitleFullPoNumber(self.poeiDrillDown.pono, self.poeiDrillDown.posuf) + base.SUBMENU_DELIMITER +
         $translate.instant('global.line.number') + base.LABEL_DELIMITER + self.poeiLineDetail.lineno;

      return subTitle;
   };

   self.submit = function () {
      var poeiLineSubSuperUpdateCriteria = {
         poeirowid: self.poeiLineDetail.poeirowid,
         prod: self.poeiLineSubSuper.prod
      };

      DataService.post('api/po/aspoentry/poeilinesubsuperupdate', { data: poeiLineSubSuperUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            if (data.poeilinesubsuper) {
               self.poeiLineDetail.shipprod = data.poeilinesubsuper.prod;
               self.poeiLineDetail.proddesc = data.poeilinesubsuper.proddesc;
               self.poeiLineDetail.dsplprice = data.poeilinesubsuper.dsplprice;
               self.poeiLineDetail.price = data.poeilinesubsuper.dsplprice;
               self.poeiLineDetail.vendprod = data.poeilinesubsuper.vendprod;
               self.poeiLineDetail.notesfl = data.poeilinesubsuper.notesfl;
               self.poeiLineDetail.mfgprod = data.poeilinesubsuper.mfgprod;
               self.poeiLineDetail.msdsfl = data.poeilinesubsuper.msdsfl;

               //NOTE: By design, this does not update values such as: unit, binloc
            }

            //The Retotal will occur in the callback function which is called in
            //the 'back' function.  Retotal is needed since the price will probably
            //have changed.

            self.back();
         }
      });
   };
});

//This controller is used when the user clicks "Quick View" toolbar button from the Line Items Tab on the Details drilldown Page.
//Alias: dlqv
app.controller('PoeiDetailLineQuickViewCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.parentCallingState = $stateParams.lqvParentCallingState;
   self.callingState = $stateParams.lqvCallingState;
   self.poeiDrillDown = $stateParams.lqvPoeiDrillDown; //Key information for the selected Purchase Order
   self.poeiLineDetail = $stateParams.lqvPoeiLineDetail; //Details for the selected Line
   self.poeiListResult = $stateParams.lqvPoeiListResult; //Selected Purchase Order from Main list
   self.callback = $stateParams.lqvCallback;
   self.poeiLineExtend = {};
   self.poeiLineAddons = {};
   self.isInspectionUnavailReasonsVisible = false;
   self.isWarehouseManagerBinAllocationVisible = false;
   self.isTallyVisible = false;
   self.isBundlesVisible = false;
   self.isSerialsVisible = false;
   self.isLotsVisible = false;
   self.isLotDimensionVisible = false;
   self.isLotDimensionEnabled = false;
   self.isReturnAllocationVisible = false;
   self.wmRelatedOrderTypes = ["ac", "do"];
   self.icEntrySerialsCriteria = {};
   self.icEntryLotsCriteria = {};

   self.isDetailLineQuickView = function () {
      return $state.is('poei.detail.detail-line-quick-view');
   };

   self.includesQuickView = function () {
      return $state.includes('poei.detail.detail-line-quick-view');
   };

   self.back = function () {
      //Go back to the Detail screen, but also send the parent's calling state back as payload.  That's important so that
      //when they submit/cancel receiving, they go back to the right place.
      //Important Note:  We need to do this 'callback' methodology to get the parameters back instead of doing
      //the $state.go here because of those parameters.  Since parameters are sent, then the other view
      //is refreshed.  We can't have that because then the user loses their spot.
      if (self.callback) {
         //Call the function, which sends the parameters, but also does the 'state.go' to returning spot.
         self.callback({
            callingState: self.callingState,
            parentCallingState: self.parentCallingState,
            poeiDrillDown: self.poeiDrillDown,
            poeiListResult: self.poeiListResult,
            poeiLines: self.poeiLineExtend,
            poeiLineNum: self.poeiLineDetail.lineno
         });
      }
   };

   self.getSubTitle = function () {
      var subTitle = base.getSubTitleFullPoNumber(self.poeiDrillDown.pono, self.poeiDrillDown.posuf) + base.SUBMENU_DELIMITER +
         $translate.instant('global.line.number') + base.LABEL_DELIMITER + self.poeiLineDetail.lineno;

      return subTitle;
   };

   self.saveExtend = function () {
      DataService.post('api/po/aspoentry/poeilineextendupdate', { data: self.poeiLineExtend, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };

   self.getExtendData = function () {
      var poeiLineExtendInitializeCriteria = {
         poeirowid: self.poeiLineDetail.poeirowid
      };

      DataService.post('api/po/aspoentry/poeilineextendinitialize', { data: poeiLineExtendInitializeCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiLineExtend = data;
            self.isInspectionUnavailReasonsVisible = self.poeiLineExtend.sruninreasfl;
         }
      });
   };

   self.getAddonData = function () {
      var poeiLineAddonInitializeCriteria = {
         poeirowid: self.poeiLineDetail.poeirowid
      };

      DataService.post('api/po/aspoentry/poeiinitializelineaddons', { data: poeiLineAddonInitializeCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiLineAddons = data;
         }
      });
   };

   self.addonsFieldChanged = function (fieldName, addonNumber) {
      var poeiLineAddonLeaveFieldCriteria = {
         poeilineaddons: self.poeiLineAddons,
         pvFieldname: fieldName,
         pvAddonno: addonNumber
      };

      DataService.post('api/po/aspoentry/poeilineaddonleavefield', { data: poeiLineAddonLeaveFieldCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiLineAddons = data;
         }
      });
   };

   self.saveAddons = function () {
      DataService.post('api/po/aspoentry/poeiupdatelineaddons', { data: self.poeiLineAddons, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.getAddonData();
      });
   };

   self.setWarehouseManagerVisibility = function () {
      self.isWarehouseManagerBinAllocationVisible = false;
      if (self.poeiListResult && self.poeiLineDetail) {
         if (self.poeiLineDetail.wmfl && self.wmRelatedOrderTypes.indexOf(self.poeiListResult.transtype.toLowerCase() > -1)) {
            self.isWarehouseManagerBinAllocationVisible = true;
         }
      }
   };

   self.initializeTally = function () {
      self.isTallyVisible = true;
   };

   self.initializeBundles = function () {
      self.isBundlesVisible = true;
   };

   self.createIcEntrySerialsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            actionty: resp.icentryserialscriteria.actionty,
            assignoldest: resp.icentryserialscriteria.assignoldest,
            btncreateenabled: true,
            callingState: self.parentCallingState,
            cost: resp.icentryserialscriteria.cost,
            cono2: resp.icentryserialscriteria.cono2,
            currproc: base.OURPROC,
            custno: resp.icentryserialscriteria.custno,
            ictype: resp.icentryserialscriteria.ictype,
            icspecrecno: resp.icentryserialscriteria.icspecrecno,
            inquiryfl: resp.icentryserialscriteria.inquiryfl,
            jrnlno: resp.icentryserialscriteria.jrnlno,
            kplabel: resp.icentryserialscriteria.kplabel,
            lineno: resp.icentryserialscriteria.lineno,
            linenochar: resp.icentryserialscriteria.lineno,
            method: resp.icentryserialscriteria.method,
            prod: resp.icentryserialscriteria.prod,
            orderno: resp.icentryserialscriteria.orderno,
            ordersuf: resp.icentryserialscriteria.ordersuf,
            origqty: resp.icentryserialscriteria.origqty,
            origqtylabel: resp.icentryserialscriteria.origqtylabel,
            ordqty: resp.icentryserialscriteria.ordqty,
            outqty: resp.icentryserialscriteria.outqty,
            ourproc: base.OURPROC,
            proddesc: resp.icentryserialscriteria.proddesc,
            prodnotesfl: resp.icentryserialscriteria.prodnotesfl,
            proofqty: resp.icentryserialscriteria.proofqty,
            qtyunavail: resp.icentryserialscriteria.qtyunavail,
            reasunavty: resp.icentryserialscriteria.reasunavty,
            returnfl: resp.icentryserialscriteria.returnfl,
            retorderno: resp.icentryserialscriteria.retorderno,
            retordersuf: resp.icentryserialscriteria.retordersuf,
            retlineno: resp.icentryserialscriteria.retlineno,
            returnty: resp.icentryserialscriteria.returnty,
            rettext: resp.icentryserialscriteria.rettext,
            seqno: resp.icentryserialscriteria.seqno,
            seqnochar: '000',
            seqdash: "0",
            shipto: resp.icentryserialscriteria.shipto,
            shipfmwhse: resp.icentryserialscriteria.shipfmwhse,
            shiptowhse: resp.icentryserialscriteria.shiptowhse,
            type: base.MODULE_PO,
            vendno: resp.icentryserialscriteria.vendno,
            whse: resp.icentryserialscriteria.whse,
            wono: resp.icentryserialscriteria.wono,
            wosuf: resp.icentryserialscriteria.wosuf,
            wonosuf: resp.icentryserialscriteria.wonosuf
         };

         return criteria;
      }
   };

   self.initializeSerials = function () {
      if (self.poeiLineDetail && self.poeiLineDetail.serlotSensitive) {
         if (self.poeiLineDetail.serlottype.toUpperCase() === base.SERIAL_LOT_TYPE_SERIAL) {
            DataService.post('api/po/aspoentry/poeilinebeforeserial', { data: self.poeiLineDetail, busy: true }, function (data) {
               if (data) {
                  self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(data);

                  var criteria = {
                     icentryserialslist: data.icentryserialslist,
                     icentryserialscriteria: self.icEntrySerialsCriteria
                  };

                  //This is a key piece to this. Sending the Criteria to the Serial Control so it can render the data.
                  self.serialControl.initialize(criteria);
               }
            });
         }
      }
   };

   self.createIcEntryLotsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            actionty: resp.icentrylotscriteria.actionty,
            assignoldest: resp.icentrylotscriteria.assignoldest,
            btncreateenabled: true,
            callingState: self.parentCallingState,
            cono2: resp.icentrylotscriteria.cono2,
            cost: resp.icentrylotscriteria.cost,
            custno: resp.icentrylotscriteria.custno,
            currproc: base.OURPROC,
            icspecrecno: resp.icentrylotscriteria.icspecrecno,
            ictype: resp.icentrylotscriteria.ictype,
            inquiryfl: resp.icentrylotscriteria.inquiryfl,
            jrnlno: resp.icentrylotscriteria.jrnlno,
            kplabel: resp.icentrylotscriteria.kplabel,
            lineno: resp.icentrylotscriteria.lineno,
            linenochar: resp.icentrylotscriteria.lineno,
            method: resp.icentrylotscriteria.method,
            orderno: resp.icentrylotscriteria.orderno,
            ordersuf: resp.icentrylotscriteria.ordersuf,
            origqty: resp.icentrylotscriteria.origqty,
            ordqty: resp.icentrylotscriteria.ordqty,
            outqty: resp.icentrylotscriteria.outqty,
            ourproc: base.OURPROC,
            origqtylabel: resp.icentrylotscriteria.origqtylabel,
            prod: resp.icentrylotscriteria.prod,
            proofqty: resp.icentrylotscriteria.proofqty,
            proddesc: resp.icentrylotscriteria.proddesc,
            prodnotesfl: resp.icentrylotscriteria.prodnotesfl,
            qtyunavail: resp.icentrylotscriteria.qtyunavail,
            returnfl: resp.icentrylotscriteria.returnfl,
            retorderno: resp.icentrylotscriteria.retorderno,
            retordersuf: resp.icentrylotscriteria.retordersuf,
            retlineno: resp.icentrylotscriteria.retlineno,
            returnty: resp.icentrylotscriteria.returnty,
            reasunavty: resp.icentrylotscriteria.reasunavty,
            rettext: resp.icentrylotscriteria.rettext,
            seqno: resp.icentrylotscriteria.seqno,
            seqdash: "0",
            seqnochar: '000',
            shipto: resp.icentrylotscriteria.shipto,
            shipfmwhse: resp.icentrylotscriteria.shipfmwhse,
            shiptowhse: resp.icentrylotscriteria.shiptowhse,
            type: base.MODULE_PO,
            vendno: resp.icentrylotscriteria.vendno,
            whse: resp.icentrylotscriteria.whse,
            wono: resp.icentrylotscriteria.wono,
            wosuf: resp.icentrylotscriteria.wosuf,
            wonosuf: resp.icentrylotscriteria.wonosuf
         };

         return criteria;
      }
   };

   self.initializeLots = function () {
      if (self.poeiLineDetail && self.poeiLineDetail.serlotSensitive) {
         if (self.poeiLineDetail.serlottype.toUpperCase() === base.SERIAL_LOT_TYPE_LOT) {
            DataService.post('api/po/aspoentry/poeilinebeforelot', { data: self.poeiLineDetail, busy: true }, function (data) {
               if (data) {
                  self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(data);

                  //This is a key piece to this. Sending the Criteria to the Lot Control so it can render the data.
                  self.lotControl.initialize(self.icEntryLotsCriteria);
               }
            });
         }
      }
   };

   self.initializeTallies = function () {
      if (self.poeiLineDetail.tallyfl) {
         if (self.poeiLineDetail.bundleSensitive) {
            self.initializeBundles();
            if (self.poeiLineDetail.forcetallymix) {
               MessageService.info('global.information', 'message.view.the.bundles.tab.to.maintain.bundle.info');
            }
         } else {
            self.initializeTally();
            if (self.poeiLineDetail.forcetallymix) {
               MessageService.info('global.information', 'message.view.the.tally.tab.to.maintain.tally.info');
            }
         }
      }
   };

   self.serialsLotsVisibility = function () {
      if (self.poeiLineDetail && self.poeiLineDetail.serlotSensitive) {
         if (self.poeiLineDetail.serlottype.toUpperCase() === base.SERIAL_LOT_TYPE_SERIAL) {
            self.isSerialsVisible = true;
         } else if (self.poeiLineDetail.serlottype.toUpperCase() === base.SERIAL_LOT_TYPE_LOT) {
            self.isLotsVisible = true;
         }
      }
   };

   self.coreReturnAllocationVisibility = function () {
      if (self.poeiLineDetail && self.poeiLineDetail.returnSensitive) {
         self.isReturnAllocationVisible = true;
      }
   };

   self.initialize = function () {
      if (self.poeiLineDetail) {
         self.getExtendData();
         self.getAddonData();
         self.setWarehouseManagerVisibility();
         self.initializeTallies();
         self.coreReturnAllocationVisibility();
         self.serialsLotsVisibility();
         //NOTE: The Serials/Lots can only be Initialized after the control is 'Ready' and instantiated.  It is
         //called at a different time and place as a Ready Callback from the control.
      }
   };

   self.launchBinAllocationFunction = function () {
      if (self.poeiListResult && self.poeiLineDetail) {
         var wmbinassignCriteria = {
            altwhse: "",
            currproc: base.OURPROC,
            jrnlno: base.journal.gJrnlno,
            kitfl: false,
            lineno: self.poeiLineDetail.lineno,
            orderno: self.poeiLineDetail.pono,
            ordersuf: self.poeiLineDetail.posuf,
            ourproc: base.OURPROC,
            ordertype: base.WMALLOC_ORDERTYPE_PO,
            prod: self.poeiLineDetail.shipprod,
            potype: "",
            returnfl: false,
            seqno: 0, //Yes, this needs to be zero, even though there is a seqno on the row.
            stkqtyship: 0,
            skipnonkitlogic: false,
            stkqtyrcv: self.poeiLineDetail.stkqtyrcv,
            tobinloc: "",
            unit: self.poeiLineDetail.unit,
            vamodule: "",
            wmqtyrcv: self.poeiLineDetail.wmqtyrcv,
            wmadjtype: base.WMALLOC_ADJUST_TYPE_BUY,
            whse: self.poeiListResult.whse
         };

         $state.go('.bin-allocation', {
            criteria: wmbinassignCriteria,
            binAllocationDisabled: false,
            submittedCallback: 'dlqv.binAllocationSavedCallback',
            actionsCallback: 'dlqv.binAllocationActionsCallback'
         });
      }
   };

   //Callbacks
   self.binAllocationSavedCallback = function (wmbinassignment) {
      self.poeiLineDetail.wmqtyrcv = wmbinassignment.wmqtyrcv;
      dtl.lineUpdate(self.poeiLineDetail, false);
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmbinassignment) {
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
   };

   //Defined and called from within the Tally control when the Save is performed.
   self.acceptTallyUpdate = function (payload) {
      if (payload) {
         if (payload.functionName === base.OURPROC &&
            payload.pono === self.poeiLineDetail.pono &&
            payload.posuf === self.poeiLineDetail.posuf &&
            payload.lineno === self.poeiLineDetail.lineno) {

            self.poeiLineDetail.qtyrcv = payload.qty;
            self.poeiLineDetail.price = payload.price;
            self.poeiLineDetail.unit = payload.unit;

            dtl.lineUpdate(self.poeiLineDetail, false);
         }
      }
   };

   //Defined and called from within the Bundles control when the Save is performed.
   self.acceptBundlesUpdate = function (payload) {
      if (payload) {
         if (payload.functionName === base.OURPROC &&
            payload.pono === self.poeiLineDetail.pono &&
            payload.posuf === self.poeiLineDetail.posuf &&
            payload.lineno === self.poeiLineDetail.lineno) {

            self.poeiLineDetail.qtyrcv = payload.qty;
            self.poeiLineDetail.price = payload.price;
            self.poeiLineDetail.unit = payload.unit;

            dtl.lineUpdate(self.poeiLineDetail, false);
         }
      }
   };

   //We can only make the call to render the Serial data after the Control is ready thru the framework.
   //This gets called from the framework after that completes.
   self.serialControlReady = function () {
      self.initializeSerials();
   };

   self.serialDoneCallbackContinue = function (adjustQtyShipFl, adjustQtyShipAmt) {
      //If they've adjusted the Quantity Received (from the popup question in the Serial Control), write the
      //new quantity back to the line and update the grid.
      if (adjustQtyShipFl) {
         var poeiLineLeaveFieldCriteria = {
            poeilinedetail: self.poeiLineDetail,
            pvFieldname: base.LINELEAVE_QTY_RECEIVED // Quantity was adjusted with poeilineupdateserial
         };

         DataService.post('api/po/aspoentry/poeilineleavefield', { data: poeiLineLeaveFieldCriteria, busy: false }, function (data) {
            if (data) {
               dtl.lineUpdate(data, false);
               self.initializeSerials();  // Update serials data with latest values
            }
         });
      };
   };

   //This gets called from the Serial Control when Save is performed.
   self.serialDoneCallback = function (adjustQtyShipFl, adjustQtyShipAmt) {

      var poeiLineUpdateSerialCriteria = {
         icentryserialslist: self.serialControl.dataset,
         icentryserialscriteria: self.icEntrySerialsCriteria,
         poeilinedetail: self.poeiLineDetail
      };
      poeiLineUpdateSerialCriteria.icentryserialscriteria.outqty = adjustQtyShipFl ? adjustQtyShipAmt : poeiLineUpdateSerialCriteria.icentryserialscriteria.outqty;
      DataService.post('api/po/aspoentry/poeilineupdateserial', { data: poeiLineUpdateSerialCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiLineDetail = data.poeilinedetail;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');

            self.serialDoneCallbackContinue(adjustQtyShipFl, adjustQtyShipAmt);
         }
      });
   };

   //We can only make the call to render the Lot data after the Control is ready thru the framework.
   //This gets called from the framework after that completes.
   self.lotControlReady = function () {
      self.initializeLots();
   };

   self.lotDoneCallbackContinue = function (adjustQtyShipFl, adjustQtyShipAmt) {
      //If they've adjusted the Quantity Received (from the popup question in the Lot Control), write the
      //new quantity back to the line and update the grid.
      if (adjustQtyShipFl) {
         var poeiLineLeaveFieldCriteria = {
            poeilinedetail: self.poeiLineDetail,
            pvFieldname: base.LINELEAVE_QTY_RECEIVED // Quantity was adjusted with poeilineupdatelot
         };

         DataService.post('api/po/aspoentry/poeilineleavefield', { data: poeiLineLeaveFieldCriteria, busy: false }, function (data) {
            if (data) {
               dtl.lineUpdate(data, false);
               self.initializeLots();  // Update lots data with latest values
            }
         });
      }
   };

   //This gets called from the Lot Control when Save is performed.
   self.lotDoneCallback = function (adjustQtyShipFl, adjustQtyShipAmt) {
      var poeiLineUpdateLotCriteria = {
         icentrylotslist: self.lotControl.dataset,
         icentrylotscriteria: self.icEntryLotsCriteria,
         poeilinedetail: self.poeiLineDetail
      };
      poeiLineUpdateLotCriteria.icentrylotscriteria.outqty = adjustQtyShipFl ? adjustQtyShipAmt : poeiLineUpdateLotCriteria.icentrylotscriteria.outqty;
      DataService.post('api/po/aspoentry/poeilineupdatelot', { data: poeiLineUpdateLotCriteria, busy: true }, function (data) {
         if (data) {
            self.poeiLineDetail = data.poeilinedetail;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            self.lotDoneCallbackContinue(adjustQtyShipFl, adjustQtyShipAmt);
         }
      });
   };

   self.returnAllocationSubmitCallback = function (poCoreAllocationUpdate) {
      self.back();
   };

   self.initialize();
});

//This controller is used when the user clicks "Add Line Item" toolbar button from the Line Items Tab on the Details drilldown Page.
//It adds the item to the Purchase Order.
//Alias: dla
app.controller('PoeiDetailLineAddLineCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.parentCallingState = $stateParams.parentCallingState;
   self.callingState = $stateParams.callingState;
   self.poeiDrillDown = $stateParams.poeiDrillDown;
   self.poeiLineDetail = $stateParams.poeiLineDetail;
   self.poeiListResult = $stateParams.poeiListResult;
   self.poeiLineAdd = {};
   self.nonstockTypeList = [];

   self.back = function () {
      $state.go('^.detail', { callingState: self.parentCallingState, poeiDrillDown: self.poeiDrillDown, poeiListResult: self.poeiListResult });
   };

   self.getSubTitle = function () {
      var subTitle = base.getSubTitleFullPoNumber(self.poeiDrillDown.pono, self.poeiDrillDown.posuf) + base.SUBMENU_DELIMITER +
         $translate.instant('global.next.line.number') + base.LABEL_DELIMITER + self.poeiLineAdd.lineno;

      return subTitle;
   };

   self.buildNonstockTypeDropdown = function () {
      if (self.poeiLineAdd && self.poeiLineAdd.cbNonStockTyDataValues) {
         var arrayList = self.poeiLineAdd.cbNonStockTyDataValues.split(',');
         arrayList.forEach(function (item) {
            if (item) {
               var label = '';
               switch (item) {
                  case base.NONSTOCKTYPE_STOCKED: //ignore jslint - correct indentation
                     label = $translate.instant('global.stocked'); //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case base.NONSTOCKTYPE_NONSTOCK: //ignore jslint - correct indentation
                     label = $translate.instant('global.non.stock');//ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case base.NONSTOCKTYPE_NOT_FOR_RESALE: //ignore jslint - correct indentation
                     label = $translate.instant('global.not.for.resale'); //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  default: //ignore jslint - correct indentation
                     label = $translate.instant('global.invalid'); //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
               }

               var option = {
                  label: label,
                  value: item
               };

               self.nonstockTypeList.push(option);
            }
         });
      }
   };

   self.leaveField = function (fieldName) {
      var poeiLineAddLeaveFieldCriteria = {
         poeilineadd: self.poeiLineAdd,
         pvFieldname: fieldName
      };

      DataService.post('api/po/aspoentry/poeilineaddleavefield', { data: poeiLineAddLeaveFieldCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.poeiLineAdd = data.poeilineadd;
               self.poNonstockResults = data.pononstockresults;
               if (fieldName === base.ADDLINE_FIELD_PRODUCT && self.poNonstockResults && self.poNonstockResults.usesettingsfl) {
                  var useDefaultSettingsMessage =
                     self.poNonstockResults.proddesc + (data.pononstockresults.proddesc ? base.HTML_CRLF : '') +
                     self.poNonstockResults.proddesc2 + (data.pononstockresults.proddesc2 ? base.HTML_CRLF : '') +
                     self.poNonstockResults.prcavlmessage + (data.pononstockresults.prcavlmessage ? base.HTML_CRLF : '') +
                     $translate.instant('global.category') + base.LABEL_DELIMITER +
                     self.poNonstockResults.prodcat + (data.pononstockresults.prodcat ? base.HTML_CRLF + base.HTML_CRLF : '') +
                     self.poNonstockResults.nonstkmessage;
                  MessageService.yesNo($translate.instant('global.use.existing.setting'), useDefaultSettingsMessage, function () {
                     //yes callback
                     self.poeiLineAdd.descrip = data.pononstockresults.proddesc;
                     self.poeiLineAdd.descrip2 = data.pononstockresults.proddesc2;
                     self.poeiLineAdd.prodcat = data.pononstockresults.prodcat;
                     self.poeiLineAdd.unit = base.ADDLINE_FIELDDEFAULT_UNIT_EACH;
                     self.poeiLineAdd.price = data.pononstockresults.prodcost;
                  });
               }
            }
         }
      });
   };

   self.validateAddLine = function () {
      var passValidation = true;
      if (self.poeiLineAdd.qtyord === 0) {
         MessageService.error('global.error', 'message.quantity.is.required');
         passValidation = false;
      } else if (self.poeiLineAdd.nonstockty === base.NONSTOCKTYPE_NONSTOCK && !self.poeiLineAdd.prodcat) {
         MessageService.error('global.error', 'message.product.category.not.set.up.in.system.table.sast');
         passValidation = false;
      }

      return passValidation;
   };

   self.addLine = function () {
      if (self.validateAddLine()) {
         DataService.post('api/po/aspoentry/poeilineaddnewitem', { data: self.poeiLineAdd, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  self.back();
               }
            }
         });
      }
   };

   self.initializeLineAdd = function () {
      DataService.post('api/po/aspoentry/poeilineaddinitialize', { data: self.poeiDrillDown, busy: true }, function (data) {
         if (data) {
            self.poeiLineAdd = data;
            self.buildNonstockTypeDropdown();
         }
      });
   };

   //Callbacks
   self.costCalculatorCostChangedCallback = function (calculatedCost) {
      if (calculatedCost) {
         var exchangeRate = self.poeiLineAdd.exchgrate === 0 ? 1 : self.poeiLineAdd.exchgrate;
         self.poeiLineAdd.price = calculatedCost / exchangeRate;
      }
   };

   self.initializeLineAdd();
});
