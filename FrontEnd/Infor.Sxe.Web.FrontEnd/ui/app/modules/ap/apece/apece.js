'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ap', 'apece', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('ap', 'apece');

   $stateProvider.state('apece.detail', {
      url: '/detail?id',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/detail.json');
            },
            controller: 'ApeceDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('apece.viewerrors', {
      url: '/view-errors',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/view-errors.json');
            },
            controller: 'ApeceViewErrorsCtrl as ve'
         }
      }
   });

   $stateProvider.state('apece.finalupdate', {
      url: '/final-update',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/final-update.json');
            },
            controller: 'ApeceFinalUpdateCtrl as fu'
         }
      }
   });

   $stateProvider.state('apece.drilldown', {
      url: '/drilldown?id',
      params: { drillDownRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/drilldown.json');
            },
            controller: 'ApeceDrillDownCtrl as drldwn'
         }
      }
   });

   $stateProvider.state('apece.drilldown.gldistributiondetail', {
      url: '/gl-distribution-detail',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/gl-distribution-detail.json');
            },
            controller: 'ApeceDrillDownGLDistDetail as gldet'
         }
      }
   });

   $stateProvider.state('apece.drilldown.addonsdetail', {
      url: '/addons-detail',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/addons-detail.json');
            },
            controller: 'ApeceDrillDownAddonsDetail as adddet'
         }
      }
   });

   $stateProvider.state('apece.drilldown.addonspoaddons', {
      url: '/addons-po-addons',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/addons-poaddons.json');
            },
            controller: 'ApeceDrillDownAddonsPOAddons as addpo'
         }
      }
   });

   $stateProvider.state('apece.drilldown.termsdetail', {
      url: '/terms-detail',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/terms-detail.json');
            },
            controller: 'ApeceDrillDownTermsDetail as trmdet'
         }
      }
   });

   $stateProvider.state('apece.drilldown.termssplitterms', {
      url: '/terms-split',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/terms-split-terms.json');
            },
            controller: 'ApeceDrillDownTermsSplitTerms as trmsplit'
         }
      }
   });

   $stateProvider.state('apece.drilldown.poheaderdetail', {
      url: '/po-header-detail',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/po-header-detail.json');
            },
            controller: 'ApeceDrillDownPOHeaderDetail as podet'
         }
      }
   });

   $stateProvider.state('apece.drilldown.poheaderlineitems', {
      url: '/po-line-items',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/po-line-items.json');
            },
            controller: 'ApeceDrillDownPOHeaderLineItems as poln'
         }
      }
   });

   $stateProvider.state('apece.drilldown.poheaderlineitemsdetail', {
      url: '/po-line-items-detail',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/po-line-items-detail.json');
            },
            controller: 'ApeceDrillDownPOHeaderLineItemsDetail as polndet'
         }
      }
   });

   $stateProvider.state('apece.drilldown.poheaderlineitemsdetaillinequickview', {
      url: '/po-line-detail-quick-view',
      params: { lineItemsDrillDownRecord: null },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/detail-line-quick-view.json');
            },
            controller: 'ApeceDrillDownLineItemsDetailQuickView as polndetqv'
         }
      }
   });

   $stateProvider.state('apece.drilldown.manualpaymentsdetail', {
      url: '/manual-payments-detail',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/manual-payments-detail.json');
            },
            controller: 'ApeceDrillDownManualPaymentsDetail as mandet'
         }
      }
   });

   $stateProvider.state('apece.drilldown.applycreditsdetail', {
      url: '/apply-credits-detail',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apece/tabs/apply-credits-detail.json');
            },
            controller: 'ApeceDrillDownApplyCreditsDetail as appldet'
         }
      }
   });
});

app.controller('ApeceBaseCtrl', function ($state, AodataService, ConfigService, DataService, PvUser, MessageService, TabService, Utils) {
   var self = this;
   self.PvUser = PvUser;
   self.refreshMaster = false;
   self.OURPROC = 'apei';  // The Journal OurProc will be APEI, not APECE.
   self.MODULE_AP = 'ap';
   self.invoiceproofTitle = MessageService.get('global.invoice.proofs') + ': ' + MessageService.get('global.gl');
   self.userSelectedPrintType = 'p';
   self.taxInterfaceType = AodataService.getValue('TAX', 'taxinterfacety').toLowerCase();
   self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty').toLowerCase();
   // Check if AP Inbound Invoice Processing (810) is live
   self.isIonEdi810InLive = AodataService.getValue("ION", "ionedi810inlive").toLowerCase();

   self.criteria = {
      groupnm: '',
      vendno: 0,
      frominvoiceno: '',
      toinvoiceno: '',
      expensefl: false,
      expenseflenabled: false,
      addonsonlyfl: false,
      addonsonlyflenabled: false,
      tradefl: false,
      tradeflenabled: false,
      frominvdt: '',
      toinvdt: '',
      stageenteredfl: true,
      stageupdatedfl: true,
      stageclosedfl: false,
      recordcountlimit: ConfigService.getLookupMaxResults()
   };

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      openedCallback: 'base.journalOpened',
      criteria: {
         currproc: self.OURPROC,
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: self.MODULE_AP,
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.gJrnlno = 0;
   self.finalUpdateRecord = {
      jrnlno: 0,
      validateonlyfl: false,
      postdt: '',
      period: 0,
      updatefilesfl: false,
      invoicedt: '',
      receivepofl: false,
      receivebofillprinter: '',
      receivecosttype: '',
      ovrqtytolerancefl: false,
      ovrlineamttolerancefl: false,
      ovrproofoobfl: false,
      glvarianceacct: '',
      adjinvtotfl: false,
      warncriticalfl: false
   };

   self.updateRecord = {
      groupnm: '',
      apeiRowid: 0,
      vendno: 0,
      vendnoenabled: false,
      transcd: 0,
      transcdenabled: false,
      transcdhidden: false,
      proctype: '',
      proctypeitemsval: '',
      proctypeenabled: false,
      proctypehidden: false,
      reversetype: 0,
      reversetypeenabled: false,
      reversetypehidden: false,
      appinvno: '',
      appinvnoenabled: false,
      appinvnohidden: false,
      appinvdt: '',
      maxpost: 0,
      maxpostenabled: false,
      maxposthidden: false,
      nopost: 0,
      nopostenabled: false,
      noposthidden: false,
      immedpyfl: false,
      immedpyflenabled: false,
      disputefl: false,
      disputeflenabled: false,
      suspfl: false,
      suspflenabled: false,
      apinvno: '',
      apinvnoenabled: false,
      apinvsuffix: '',
      apinvsuffixenabled: false,
      apinvsuffixhidden: false,
      amount: 0,
      amountenabled: false,
      invdt: '',
      invdtenabled: false,
      termstype: '',
      termstypeenabled: false,
      divno: 0,
      divnoenabled: false,
      invtype: '',
      invtypeenabled: false,
      refer: '',
      referenabled: false,
      reconty: '',
      recontyenabled: false,
      reconoverfl: false,
      reconoverflenabled: false,
      newinvfl: false,
      newinvflenabled: false,
      newinvflhidden: false,
      currencyty: '',
      currencytydesc: '',
      currencytyenabled: false,
      currencytyhidden: false,
      dSvFRate: 0,
      dsvFrateEnabledFl: false,
      dsvFrateUpdateFl: false,
      iSvAdjGLDivNo: 0,
      iSvAdjGLDeptNo: 0,
      iSvAdjGLAcctNo: 0,
      iSvAdjGLSubNo: 0,
      createddt: '',
      invseqno: 0,
      createdby: '',
      groupseqno: 0,
      grouptype: '',
      transtype: '',
      stagecd: 0,
      stagecdword: '',
      manaddrfl: false,
      statusmsg: '',
      edifl: false,
      proctypeword: '',
      recontyword: '',
      gloverfl: false,
      termsoverfl: false,
      entertaxfl: false,
      gsttaxamt: 0,
      gsttaxrate: 0,
      gsttaxlabel: '',
      gstratelabel: '',
      gstenabled: false,
      gsthidden: false,
      psttaxamt: 0,
      psttaxrate: 0,
      psttaxlabel: '',
      pstratelabel: '',
      pstenabled: false,
      psthidden: false,
      settamt: 0,
      settamtenabled: false,
      settamthidden: false,
      selfassessfl: false,
      selfassessenabled: false,
      selfassesshidden: false,
      taxstate: '',
      taxstateenabled: false,
      taxstatehidden: false,
      taxablefl: false,
      taxableenabled: false,
      taxablehidden: false,
      userfield: ''
   };

   self.inDrillDownOperation = false;
   self.drillDownRecord = {
      vendno: 0,
      apeiRowid: 0
   };

   self.lastUpdateRecord = {};
   self.invoiceTotals = {
      glproof: 0,
      glproofstring: '',
      poproof: 0,
      poproofstring: ''
   };

   self.transactionTypes = [];
   self.processingTypes = [];
   self.reversalTypes = [];

   self.firstTimeRecord = {};
   self.addMode = false;
   self.firstGroupName = '';
   self.generalPurposeROWID = '';

   // These Addon screen objects are needed at the base controller based on interactions between the Addon and PO Header tab screens
   self.addonRecordAddonSeqNo = 0;
   self.addonRecordAllocType = '';

   // The PO Header proof totals object is needed at the base controller based on various operations and access/scoping needs
   self.poHeaderProofs = {
      proctype: '',
      pono: 0,
      posuf: 0,
      pototinvamt: 0,
      pototinvamtstring: '',
      pototqtyord: 0,
      pototqtyordstring: '',
      uncostamt: 0,
      uncostamtstring: '',
      uncostqty: 0,
      uncostqtystring: '',
      invproof: 0,
      invproofstring: '',
      addonproof: 0,
      addonproofstring: '',
      addonamt: 0,
      addonamtstring: ''
   };
   self.poHeaderDrillDownRecord = {
      pono: 0,
      posuf: 0,
      apeidRowid: 0
   };
   self.poLineItemEditBannerRecord = {};
   self.poLineItemEdit = {};

   self.isInAddMode = function () {
      return self.addMode;
   };

   self.isMaster = function () {
      return $state.is('apece.master');
   };

   self.includesMaster = function () {
      return $state.includes('apece.master');
   };

   self.isDetail = function () {
      return $state.is('apece.detail');
   };

   self.includesDetail = function () {
      return $state.includes('apece.detail');
   };

   self.isDrillDown = function () {
      return $state.is('apece.drilldown');
   };

   self.displayInvoiceTotals = function () {
      self.invoiceTotals.glproofstring = Locale.formatNumber(self.invoiceTotals.glproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.invoiceTotals.poproofstring = Locale.formatNumber(self.invoiceTotals.poproof, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.getGroupName = function () {
      var grpName = '';
      if (self.criteria) {
         if (self.criteria.groupnm) {
            grpName = self.criteria.groupnm;
         }
      }
      if (!grpName && self.firstGroupName) {
         grpName = self.firstGroupName;
      }
      return grpName;
   };

   self.initializeInvoiceDetail = function () {
      DataService.post('api/ap/asapentry/apeiinvdetinitialize', { data: self.updateRecord, busy: true }, function (data) {
         if (data) {
            self.updateRecord = data;
            if (data.reversetype) {
               self.updateRecord.reversetype = parseInt(data.reversetype, 10);
            }
            else {
               self.updateRecord.reversetype = 0;
            }
         }
      });
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getLookupMaxResults();
      self.criteria.expensefl = self.PvUser.apeiexpensefl;
      if (self.PvUser.apeiexpensefl) {
         self.criteria.expenseflenabled = true;
      }
      self.criteria.addonsonlyfl = self.PvUser.apeiaddonfl;
      if (self.PvUser.apeiaddonfl) {
         self.criteria.addonsonlyflenabled = true;
      }
      self.criteria.tradefl = self.PvUser.apeitradefl;
      if (self.PvUser.apeitradefl) {
         self.criteria.tradeflenabled = true;
      }
      self.criteria.stageenteredfl = true;
      self.criteria.stageupdatedfl = true;
      self.criteria.stageclosedfl = false;
   };

   self.addCreatedInvoiceToSearchList = function () {
      if (self.dataset) {
         var params = {
            vendno: self.lastUpdateRecord.vendno,
            fldlist: ''
         };

         DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               var addedInvoice = {};

               addedInvoice.groupnm = self.lastUpdateRecord.groupnm;
               addedInvoice.groupseqno = self.lastUpdateRecord.groupseqno;
               addedInvoice.grouptype = self.lastUpdateRecord.grouptype;
               addedInvoice.createdby = self.lastUpdateRecord.createdby;
               addedInvoice.createddt = self.lastUpdateRecord.createddt;
               addedInvoice.groupnm = self.lastUpdateRecord.groupnm;

               addedInvoice.invdt = self.lastUpdateRecord.invdt;
               addedInvoice.apinvno = self.lastUpdateRecord.apinvno;
               addedInvoice.invseqno = self.lastUpdateRecord.invseqno;
               addedInvoice.notesfl = '';
               addedInvoice.vendno = self.lastUpdateRecord.vendno;
               addedInvoice.vendname = data.name;
               addedInvoice.amount = self.lastUpdateRecord.amount;
               addedInvoice.transcd = self.lastUpdateRecord.transcd;
               addedInvoice.transtype = self.lastUpdateRecord.transtype;
               addedInvoice.stagecd = self.lastUpdateRecord.stagecd;
               addedInvoice.stagecdword = self.lastUpdateRecord.stagecdword;
               addedInvoice.disputefl = self.lastUpdateRecord.disputefl;
               addedInvoice.suspfl = self.lastUpdateRecord.suspfl;
               addedInvoice.statusmsg = self.lastUpdateRecord.statusmsg;
               addedInvoice.refer = self.lastUpdateRecord.refer;
               addedInvoice.reconoverfl = self.lastUpdateRecord.reconoverfl;
               addedInvoice.invtype = self.lastUpdateRecord.invtype;
               addedInvoice.edifl = self.lastUpdateRecord.edifl;
               addedInvoice.proctype = self.lastUpdateRecord.proctype;
               addedInvoice.proctypeword = self.lastUpdateRecord.proctypeword;
               addedInvoice.reconty = self.lastUpdateRecord.reconty;
               addedInvoice.recontyword = self.lastUpdateRecord.recontyword;

               addedInvoice.apeiRowid = self.lastUpdateRecord.apeiRowid;

               self.dataset.push(addedInvoice);
            }
         });
      } else {
         self.search();
      }
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/ap/asapentry/apeiinvoicelist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.apeiinvoicelistresults;
            if (self.dataset && self.dataset.length) {
               self.firstGroupName = self.dataset[0].groupnm;
            }

            //User Hook (do not rename)
            if (self.invoiceListContinue) {
               self.invoiceListContinue();
            }
         }
      });
   };

   self.create = function () {
      var grpName = self.getGroupName();
      if (!grpName) {
         MessageService.error('global.error', 'message.unable.to.add.invoice.no.group.name.has.been.sele');
      } else {
         self.addMode = true;
         self.updateRecord.groupnm = grpName;
         DataService.post('api/ap/asapentry/apeiinvdetaddprepare', { data: self.updateRecord, busy: true }, function (data) {
            if (data) {
               self.updateRecord = data;
               if (data.reversetype) {
                  self.updateRecord.reversetype = parseInt(data.reversetype, 10);
               }
               else {
                  self.updateRecord.reversetype = 0;
               }
               self.invoiceTotals.glproof = 0;
               self.invoiceTotals.poproof = 0;
               self.displayInvoiceTotals();
               if (self.criteria.vendno > 0) {
                  self.updateRecord.vendno = self.criteria.vendno;
               }
               $state.go('^.detail');
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();

   self.poHeaderDisplayProofTotals = function () {
      self.poHeaderProofs.pototinvamtstring = Locale.formatNumber(self.poHeaderProofs.pototinvamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.poHeaderProofs.pototqtyordstring = Locale.formatNumber(self.poHeaderProofs.pototqtyord, { style: 'decimal', maximumFractionDigits: 2 });
      self.poHeaderProofs.uncostamtstring = Locale.formatNumber(self.poHeaderProofs.uncostamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.poHeaderProofs.uncostqtystring = Locale.formatNumber(self.poHeaderProofs.uncostqty, { style: 'decimal', maximumFractionDigits: 2 });
      self.poHeaderProofs.invproofstring = Locale.formatNumber(self.poHeaderProofs.invproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.poHeaderProofs.addonproofstring = Locale.formatNumber(self.poHeaderProofs.addonproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.poHeaderProofs.addonamtstring = Locale.formatNumber(self.poHeaderProofs.addonamt, { style: 'decimal', maximumFractionDigits: 2 });
   };

   TabService.canUserCloseTab('apece.master', function () {
      if (self.inDrillDownOperation) {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      } else {
         return true;
      }
   });
});

app.controller('ApeceSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Initialize invoice detail object
   base.initializeInvoiceDetail();

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
         $state.go('apece.master');
      }

      base.search();
   };
});

app.controller('ApeceMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, PvUser, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.PvUser = PvUser;
   self.MENU_FUNCTION_APEGU = 'apegu';

   self.securityLevelAPEGE = SecurityService.getSecurityLevel(self.MENU_FUNCTION_APEGU);

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
      base.refreshMaster = false;
   }

   self.isFinalUpdateEnabled = function () {
      var retn = false;
      if (self.securityLevelAPEGE) {
         if (self.securityLevelAPEGE >= 3) {
            retn = true;
         }
      }
      return retn;
   };

   self.edit = function () {
      base.addMode = false;
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         base.lastUpdateRecord = singleRecord;
         base.updateRecord.apeiRowid = singleRecord.apeiRowid;
         DataService.post('api/ap/asapentry/apeiinvdetchangeretrieve', { data: { apeiinvoicedetail: base.updateRecord, lChangeMode: true }, busy: true }, function (data) {
            if (data) {
               base.updateRecord = data.apeiinvoicedetail;
               if (data.apeiinvoicetotals) {
                  base.invoiceTotals.glproof = data.apeiinvoicetotals.glproof;
                  base.invoiceTotals.poproof = data.apeiinvoicetotals.poproof;
               }
               base.displayInvoiceTotals();
               $state.go('^.detail');
            }
         });
      }
   };

   self.deleteRows = function () {
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var invoicesToDelete = [];

            records.forEach(function (record) {
               invoicesToDelete.push(
               {
                  apeiRowid: record.apeiRowid
               });
            });

            DataService.post('api/ap/asapentry/apeiinvdetdelete', { data: invoicesToDelete, busy: true }, function () {
               base.search();
            });
         }
      });
   };

   self.viewErrors = function () {
      var records = GridService.getSelectedRecords(base.grid);
      if (records && records.length) {
         if (records.length === 1) {
            base.firstTimeRecord = records[0];
            $state.go('apece.viewerrors');
         } else {
            MessageService.error('global.error', 'message.please.select.one.row.for.the.view.errors');
         }
      }
   };

   self.isOverrideToleranceButtonEnabled = function () {
      var retn = false;
      if (self.PvUser.apeiovertolfl) {
         retn = true;
      }
      return retn;
   };

   self.toggleFlags = function (type, flag) {
      var records = GridService.getSelectedRecords(base.grid);
      if (records && records.length) {
         var invoicesToUpdate = [];

         records.forEach(function (record) {

            invoicesToUpdate.push(
            {
               apeiRowid: record.apeiRowid,
               disputefl: false,
               suspfl: false,
               reconoverfl: false
            });
         });

         DataService.post('api/ap/asapentry/apeiinvoicedetailtoggleflags', { data: { apeiinvoicedetailflags: invoicesToUpdate, cType: type, lFlagValue: flag }, busy: true }, function (data) {
            if (data) {
               var len = data.length;
               records = GridService.getSelectedRecords(base.grid);
               records.forEach(function (record) {

                  for (var i = 0; i < len; i++) {
                     if (data[i].apeiRowid === record.apeiRowid) {
                        record.disputefl = data[i].disputefl;
                        record.suspfl = data[i].suspfl;
                        record.reconoverfl = data[i].reconoverfl;
                     }
                  }
                  var indx = base.dataset.indexOf(record);
                  base.grid.updateRow(indx);
               });
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         });
      }
   };

   self.validate = function () {
      if (!base.journal) {
         base.journalControl.showOpenView(function () {
            base.gJrnlno = base.journal.gJrnlno;
            self.launchFinalUpdate(false);
         });
      } else {
         base.gJrnlno = base.journal.gJrnlno;
         self.launchFinalUpdate(false);
      }
   };

   self.finalUpdate = function () {
      if (!base.journal) {
         base.journalControl.showOpenView(function () {
            base.gJrnlno = base.journal.gJrnlno;
            base.journalOptions.criteria.period = base.journal.gPeriod;
            base.journalOptions.criteria.postdt = base.journal.gPostdt;
            self.launchFinalUpdate(true);
         });
      } else {
         base.gJrnlno = base.journal.gJrnlno;
         base.journalOptions.criteria.period = base.journal.gPeriod;
         base.journalOptions.criteria.postdt = base.journal.gPostdt;
         self.launchFinalUpdate(true);
      }
   };

   self.launchFinalUpdate = function (finalUpdateFlag) {
      if (finalUpdateFlag) {
         $state.go('apece.finalupdate');
      } else {
         var updateList = [];

         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length) {

            records.forEach(function (record) {
               updateList.push(
               {
                  rwid: record.apeiRowid,
                  statusmsg: record.statusmsg
               });
            });
         }

         var printSettingsEmpty = {};
         base.finalUpdateRecord.jrnlno = base.gJrnlno;
         base.finalUpdateRecord.validateonlyfl = true;
         DataService.post('api/ap/asapentry/apeiinvdetfinalupdate', { data: { apeirowids: updateList, apeiinvdetfinalupdt: base.finalUpdateRecord, printersettings: printSettingsEmpty }, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {

                  if (data.apeirowids) {
                     var len = data.apeirowids.length;
                     records = GridService.getSelectedRecords(base.grid);
                     records.forEach(function (record) {

                        for (var i = 0; i < len; i++) {
                           if (data.apeirowids[i].rwid === record.apeiRowid) {
                              record.statusmsg = data.apeirowids[i].statusmsg;
                           }
                        }
                        var indx = base.dataset.indexOf(record);
                        base.grid.updateRow(indx);
                     });
                  }

                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
               }
            }
         });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      base.drillDownRecord.vendno = record.vendno;
      base.drillDownRecord.apeiRowid = record.apeiRowid;
      base.updateRecord.apeiRowid = record.apeiRowid;

      DataService.post('api/ap/asapentry/apeiinvdetcheckdrilldownaccess', { data: base.updateRecord, busy: true }, function (data) {
         base.inDrillDownOperation = true;
         $state.go('apece.drilldown', { drillDownRecord: JSON.stringify(base.drillDownRecord) });
      });
   };
});

app.controller('ApeceDetailCtrl', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService, Sasoo, UtilsData) {
   var self = this;
   var base = $scope.base;

   self.detailTitle = MessageService.get('global.invoice.detail');
   self.detailSubTitle = '';
   self.isDuplicateAPInvnoAuthRequired = false;
   self.sasoo = Sasoo;
   self.divnoDropDownOptions = [];

   self.addMode = base.isInAddMode();
   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ap', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   if (self.addMode) {
      self.detailTitle = self.detailTitle + ' - ' + MessageService.get('global.create');
   } else {
      self.detailTitle = self.detailTitle + ' - ' + MessageService.get('global.update');
      self.detailSubTitle = base.updateRecord.vendno + ' || ' + base.updateRecord.apinvno;
   }

   // First time in
   if (self.detailTitle) {
      self.isDuplicateAPInvnoAuthRequired = false;
      var grpName = base.getGroupName();
      var criteria = {
         groupnm: grpName
      };

      DataService.post('api/ap/asapentry/apeiinvdetdropdown', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.buildTransactionTypes(data.transtypeitems);
            self.buildProcessTypes(data.proctypeitems);
            self.reversalTypesLoad(data.reversetypeitems);
            // For add mode, check to see if the Field Leave SI calls should be executed when a Vendor # is
            // Initially provided (change events don't fire in this case).
            if (self.addMode) {
               self.checkAddModeFieldChange();
            }
         }
      });
   }

   self.checkAddModeFieldChange = function () {
      if (base.updateRecord.vendno) {
         self.fieldChanged('vendno');
      }
   };

   self.buildTransactionTypes = function (transactionTypes) {
      base.transactionTypes = [];
      var fldList = [];
      var fldListBuilt = [];
      var firstChoice = true;
      fldList = transactionTypes.trim().split('|');
      var fldListLen = fldList.length;
      for (var i = 0; i < fldListLen; i++) {
         if (fldList[i]) {
            var singleChoice = fldList[i];
            var singleChoiceList = [];
            singleChoiceList = singleChoice.split(',');
            var intValue = parseInt(singleChoiceList[1], 10);
            var obj = {
               label: singleChoiceList[0],
               type: 'OPT',
               value: intValue
            };
            fldListBuilt.push(obj);
            if (firstChoice) {
               firstChoice = false;
               if (self.addMode) {
                  base.updateRecord.transcd = intValue;
               }
            }
         }
      }
      base.transactionTypes = fldListBuilt;
   };

   self.buildProcessTypes = function (processTypes) {
      base.processingTypes = [];
      var fldList = [];
      var fldListBuilt = [];
      var firstChoice = true;
      fldList = processTypes.trim().split('|');
      var fldListLen = fldList.length;
      for (var i = 0; i < fldListLen; i++) {
         if (fldList[i]) {
            var singleChoice = fldList[i];
            var singleChoiceList = [];
            singleChoiceList = singleChoice.split(',');
            var obj = {
               label: singleChoiceList[0],
               type: 'OPT',
               value: singleChoiceList[1]
            };
            fldListBuilt.push(obj);
            if (firstChoice) {
               firstChoice = false;
               if (self.addMode) {
                  base.updateRecord.proctype = singleChoiceList[1];
               }
            }
         }
      }
      base.processingTypes = fldListBuilt;
   };

   self.reversalTypesLoad = function (inReversalTypes) {
      base.reversalTypes = [];
      var fldList = [];
      var fldListBuilt = [];
      var firstChoice = true;
      fldList = inReversalTypes.trim().split('|');
      var fldListLen = fldList.length;
      for (var i = 0; i < fldListLen; i++) {
         if (fldList[i]) {
            var singleChoice = fldList[i];
            var singleChoiceList = [];
            singleChoiceList = singleChoice.split(',');
            var obj = {
               label: singleChoiceList[0],
               type: 'OPT',
               value: parseInt(singleChoiceList[1], 10)
            };
            fldListBuilt.push(obj);
            if (firstChoice) {
               firstChoice = false;
               if (self.addMode) {
                  base.updateRecord.reversetype = parseInt(singleChoiceList[1], 10);
               }
            }
         }
      }
      base.reversalTypes = fldListBuilt;
   };

   self.vendnoChanged = function () {
      self.fieldChanged('vendno');
   };

   self.termsTypeChanged = function () {
      self.fieldChanged('termstype');
   };

   self.transTypeChanged = function () {
      if (base.updateRecord.vendno > 0) {
         self.fieldChanged('transcd');
      }
   };

   self.procTypeChanged = function () {
      if (base.updateRecord.vendno > 0) {
         self.fieldChanged('proctype');
      }
   };

   self.invoiceNumberChanged = function () {
      if (base.updateRecord.vendno > 0 && base.updateRecord.apinvno) {
         var params = {
            pvApinvno: base.updateRecord.apinvno,
            pvVendno: base.updateRecord.vendno,
            pvTranscd: base.updateRecord.transcd
         };
         DataService.post('api/ap/asapinquiry/apetauthpointinfo', { data: params, busy: true }, function (data) {
               if (data) {
                  self.isDuplicateAPInvnoAuthRequired = data.pvDupinvnofl;
               }
            });
      }
      if (base.updateRecord.vendno > 0) {
         self.fieldChanged('apinvno');
      }
   };

   self.amountChanged = function () {
      if (base.updateRecord.vendno > 0) {
         self.fieldChanged('amount');
      }
   };

   self.apInvoiceNumberChanged = function () {
      if (base.updateRecord.vendno > 0) {
         self.fieldChanged('appinvno');
      }
   };

   self.fieldChanged = function (fieldName) {
      DataService.post('api/ap/asapentry/apeiinvdetfieldchange', { data: { apeiinvoicedetail: base.updateRecord, cFieldName: fieldName }, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.apeiinvoicedetail) {
                  base.updateRecord = data.apeiinvoicedetail;
                  if (data.apeiinvoicedetail.reversetype) {
                     base.updateRecord.reversetype = parseInt(data.apeiinvoicedetail.reversetype, 10);
                  }
                  else {
                     base.updateRecord.reversetype = 0;
                  }
               }
            }
         }
      });
   };

   self.cancel = function () {
      base.initializeInvoiceDetail();
      base.updateRecord.vendno = 0;
      $state.go('^.master');
   };

   // Save
   self.submit = function () {
      if (self.addMode) {
         // Add mode
         if (self.isDuplicateAPInvnoAuthRequired) {
            AuthService.createAuthPoint('apet', '', 'apinvno', String.Empty, String.Empty, null, self.submitAddAuthPoint1Passed, null);
         } else {
            self.submitAddModeCheck2ndAuth();
         }
      } else {
         // Change mode
         DataService.post('api/ap/asapentry/apeiinvdetchangeupdate', { data: base.updateRecord, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {

                  var singleRecord = GridService.getSelectedRecord(base.grid);
                  if (singleRecord) {
                     singleRecord.apinvno = base.updateRecord.apinvno;
                     singleRecord.amount = base.updateRecord.amount;
                     singleRecord.invdt = base.updateRecord.invdt;
                     singleRecord.suspfl = base.updateRecord.suspfl;
                     singleRecord.disputefl = base.updateRecord.disputefl;
                     singleRecord.invtype = base.updateRecord.invtype;
                     singleRecord.refer = base.updateRecord.refer;
                     singleRecord.reconoverfl = base.updateRecord.reconoverfl;
                     singleRecord.amount = base.updateRecord.amount;

                     singleRecord.duedt = base.lastUpdateRecord.duedt;
                     singleRecord.discdt = base.lastUpdateRecord.discdt;

                     var indx = base.dataset.indexOf(singleRecord);
                     base.grid.updateRow(indx);
                  }
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  base.initializeInvoiceDetail();
                  base.updateRecord.vendno = 0;
                  $state.go('^.master');
               }
            }
         });
      }
   };

   self.submitAddModeCheck2ndAuth = function () {

      if (base.updateRecord.divnoenabled && self.sasoo.secdivno > 0 && self.sasoo.secdivno !== base.updateRecord.divno) {
         AuthService.createAuthPoint('apet', '', 'divno', String.Empty, String.Empty, null, self.submitAddAuthPoint2Passed, null);
      } else {
         self.submitAddModeFinal();
      }
   };

   //User Hook (do not rename)
   self.submitAddModeFinalContinue = function (data) {
      if (base.updateRecord.transcd !== 2) {
         self.launchDrillDownAfterAdd();
      } else {
         base.initializeInvoiceDetail();
         base.updateRecord.vendno = 0;
         $state.go('^.master');
      }

      //User Hook (do not rename)
      if (self.submitAddModeFinalContinueContinue) {
         self.submitAddModeFinalContinueContinue();
      }
   };

   self.submitAddModeFinal = function () {
      var grpName = base.getGroupName();
      DataService.post('api/ap/asapentry/apeiinvdetaddupdate', { data: base.updateRecord, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.apeiinvoicedetail) {
                  base.lastUpdateRecord = data.apeiinvoicedetail;
                  base.updateRecord.apeiRowid = base.lastUpdateRecord.apeiRowid;
                  base.addCreatedInvoiceToSearchList();
               }

               MessageService.info('global.information', 'message.save.operation.completed.successfully');

               //User Hook (do not rename)
               if (self.submitAddModeFinalContinue) {
                  self.submitAddModeFinalContinue(data);
               }
            }
         }
      });
   };

   self.launchDrillDownAfterAdd = function () {

      base.drillDownRecord.vendno = base.updateRecord.vendno;
      base.drillDownRecord.apeiRowid = base.updateRecord.apeiRowid;

      base.initializeInvoiceDetail();
      base.updateRecord.vendno = 0;

      DataService.post('api/ap/asapentry/apeiinvdetcheckdrilldownaccess', { data: base.updateRecord, busy: true }, function (data) {
         base.inDrillDownOperation = true;
         $state.go('apece.drilldown', { drillDownRecord: JSON.stringify(base.drillDownRecord) });
      });
   };

   self.submitAddAuthPoint1Passed = function () {
      self.submitAddModeCheck2ndAuth();
   };

   self.submitAddAuthPoint2Passed = function () {
      self.submitAddModeFinal();
   };

   self.updateVATProof = function () {
      base.updateRecord.vatproof = (base.updateRecord.vat1goodsamt +
         base.updateRecord.vat2goodsamt + base.updateRecord.vat3goodsamt + base.updateRecord.vat4goodsamt +
         base.updateRecord.vat5goodsamt + base.updateRecord.vat1taxamt + base.updateRecord.vat2taxamt +
         base.updateRecord.vat3taxamt + base.updateRecord.vat4taxamt + base.updateRecord.vat5taxamt) -
         base.updateRecord.amount;
   };
});

app.controller('ApeceViewErrorsCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;

   self.errorList = [];
   // First time in here
   if (base.firstTimeRecord) {
      var criteria = {
         rwid: base.firstTimeRecord.apeiRowid
      };

      DataService.post('api/ap/asapentry/apeiinvdetgeterrors', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.errorList = data;
         }
      });
   }
});

app.controller('ApeceFinalUpdateCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Sasoo) {
   var self = this;
   var base = $scope.base;
   self.sasoo = Sasoo;
   self.saveButtonLaunched = false;

   if (base.userSelectedPrintType) {
      self.defaultPrinterType = base.userSelectedPrintType;
   }

   self.isFinalUpdateOptionsEnabled = function () {
      var retn = self.sasoo.apsuperfl;
      return retn;
   };

   // First time in there
   if (base.journalOptions) {
      base.finalUpdateRecord.jrnlno = base.gJrnlno;
      base.finalUpdateRecord.postdt = base.journalOptions.criteria.postdt;
      base.finalUpdateRecord.period = base.journalOptions.criteria.period;

      DataService.post('api/ap/asapentry/apeiinvdetfinalupdateinitialize', { data: base.finalUpdateRecord, busy: true }, function (data) {
         if (data) {
            base.finalUpdateRecord = data;
         }
      });
   }

   self.submit = function () {

      if (!self.saveButtonLaunched) {
         DataService.post('api/ap/asapentry/apeiinvdetfinalupdatevalidate', { data: base.finalUpdateRecord, busy: false }, function (data) {
            if (data) {
               self.submitFinalUpdate();
            }
         });
      }
   };

   self.submitFinalUpdate = function () {

      if (!self.saveButtonLaunched) {
         MessageService.info('global.information', 'global.final.update.in.progress');
         self.saveButtonLaunched = true;
         var updateList = [];
         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length) {

            records.forEach(function (record) {
               updateList.push(
                  {
                     rwid: record.apeiRowid,
                     statusmsg: record.statusmsg
                  });
            });
         }

         base.finalUpdateRecord.validateonlyfl = false;
         DataService.post('api/ap/asapentry/apeiinvdetfinalupdate', { data: { apeirowids: updateList, apeiinvdetfinalupdt: base.finalUpdateRecord, printersettings: self.printerControl.printerSettings }, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {

                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                  base.userSelectedPrintType = self.printerControl.printerSettings.printtype;
               }
            }
         });
      }     
   };
});

app.controller('ApeceDrillDownCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, UserService, ModalService, Utils, UtilsData) {
   var self = this;
   var base = $scope.base;
   self.detailSubTitle = '';
   // ************* General purpose drill down data

   self.drillDownRecord = JSON.parse($stateParams.drillDownRecord);

   if (!self.drillDownRecord) {
      if ($stateParams.id && $stateParams.id !== '') {
         self.drillDownRecord = {};
         self.drillDownRecord.apeiRowid = $stateParams.id;
      }
   }

   self.bannerRecord = {
      apeiRowid: '',
      groupnm: '',
      groupdesc: '',
      createddt: '',
      groupseqno: 0,
      invseqno: 0,
      vendno: 0,
      vendorname: '',
      apinvno: '',
      amount: 0,
      amountstring: '',
      transcd: 0,
      transcdword: '',
      proctype: '',
      proctypeword: '',
      stagecd: 0,
      addontabenabledfl: false,
      gldisttabenabledfl: false,
      poheadertabenabledfl: false,
      termstabenabledfl: false,
      additionalinfotabenabledfl: false,
      manualpaymentstabenabledfl: false,
      misccreditstabenabledfl: false,
      taxdetailenabledfl: false,
      podoshipdt: ""
   };

   self.invoiceTotals = {
      glproof: 0,
      glproofstring: '',
      poproof: 0,
      poproofstring: ''
   };

   // ************* GL distribution data

   self.glDistributionTotals = {
      groupnm: '',
      createddt: '',
      groupseqno: 0,
      proof: 0,
      proofstring: '',
      proofcosting: 0,
      proofcostingstring: ''
   };
   self.glDistributionList = [];
   self.glDistributionproofTitle = MessageService.get('global.invoice.proofs') + ': ' + MessageService.get('global.at.update');
   self.glDistributionAddMode = false;
   self.glDistributionTabSelected = false;
   self.glDistributionbtnNewSensitive = false;
   self.glDistributionbtnEditSensitive = false;
   self.glDistributionbtnDeleteSensitive = false;

   // ************* Addons data

   self.addonsTotals = {
      addontotal: 0,
      addontotalstring: '',
      expensedtotal: 0,
      expensedtotalstring: '',
      discounttotal: 0,
      discounttotalstring: ''
   };

   self.addonsList = [];
   self.addonsAddMode = false;
   self.addonsTabSelected = false;
   self.addonsPOAddonButton = false;
   self.addonsSASTNList = [];

   // ************* PO Header data

   self.poHeaderTabSelected = false;
   self.poHeaderList = [];
   self.poHeaderAddMode = false;
   self.poHeaderTradeTotalsVisible = false;
   self.poHeaderPONo = '';

   // ************* Terms data

   self.termsTotals = {
      proofinvamt: 0,
      proofinvamtstring: '',
      proofinvpay: 0,
      proofinvpaystring: '',
      proofinvremain: 0,
      proofinvremainstring: '',
      prooforigdisc: 0,
      prooforigdiscstring: '',
      proofdiscpay: 0,
      proofdiscpaystring: '',
      proofdiscremain: 0,
      proofdiscremainstring: ''
   };

   self.termsList = [];
   self.termsAddMode = false;
   self.termsTabSelected = false;
   self.termsProofLabelInvoice = MessageService.get('global.invoice') + ':';
   self.termsProofLabelDiscount = MessageService.get('global.discount') + ':';

   // ************* Additional Info data

   self.additionalInfoTabSelected = false;
   self.additionalInfoSaveEnabled = false;
   self.additionalInfoBanknoDropDownOptions = [];
   self.additionalInfoData = {
      groupnm: '',
      createddt: '',
      groupseqno: 0,
      vendno: 0,
      apeiRowid: 0,
      manualcheckenabledfl: false,
      bankno: 0,
      checkno: 0,
      origdisc: 0,
      addlinfoenabledfl: false,
      name: '',
      addr1: '',
      addr2: '',
      addr3: '',
      city: '',
      state: '',
      zipcd: '',
      manaddrfl: false
   };

   // ************* Manual Payments data

   self.manualPaymentsTabSelected = false;
   self.manualPaymentsAppliedList = [];
   self.manualPaymentsOpenList = [];
   self.manualPaymentsProofString = '';
   self.manualPaymentsAddMode = false;

   // ************* Apply Credits data

   self.applyCreditsTabSelected = false;
   self.applyCreditsOpenList = [];
   self.applyCreditsAppliedList = [];
   self.applyCreditsProofString = '';
   self.applyCreditsAddMode = false;

   // ************* Tax Distribution data

   self.taxTabSelected = false;
   self.taxDetailList = [];
   self.taxGroupLabel = MessageService.get('global.tax.group');
   self.taxTWELabel = MessageService.get('global.twe.tax.amounts');
   self.taxVendorLabel = MessageService.get('global.vendor.tax.amounts');
   self.taxDistributorLabel = MessageService.get('global.distributor.tax.amounts');
   self.taxTotalLabel = MessageService.get('global.totals');
   self.taxDetailData = {
      groupnm: '',
      groupseqno: 0,
      createddt: '',
      invseqno: 0,
      settamt: 0,
      settpct: 0,
      twetax1: 0,
      twetax1string: '',
      twetax2: 0,
      twetax2string: '',
      twetax3: 0,
      twetax3string: '',
      twetax4: 0,
      twetax4string: '',
      vendtax1: 0,
      vendtax2: 0,
      vendtax3: 0,
      vendtax4: 0,
      distribtax1: 0,
      distribtax2: 0,
      distribtax3: 0,
      distribtax4: 0,
      twetaxttl: 0,
      twetaxttlstring: '',
      vendortaxttl: 0,
      vendortaxttlstring: '',
      distribtaxttl: 0,
      distribtaxttlstring: '',
      taxgroup1: '',
      taxgroup2: '',
      taxgroup3: '',
      taxgroup4: '',
      tax2hidden: false,
      tax3hidden: false,
      tax4hidden: false,
      vendtax1sensitive: false,
      vendtax2sensitive: false,
      vendtax3sensitive: false,
      vendtax4sensitive: false,
      disttax1sensitive: false,
      disttax2sensitive: false,
      disttax3sensitive: false,
      disttax4sensitive: false,
      settsensitive: false,
      setthidden: false,
      disputesensitive: false,
      disputefl: false,
      reversalfl: false,
      apeiRowid: 0,
      apeirowpointer: ''
   };

   // ************ General purpose drill down functions

   self.redisplayProofTotals = function () {
      DataService.post('api/ap/asapentry/apeiinvdetbanner', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvoicetotals) {
               self.invoiceTotals.glproof = data.apeiinvoicetotals.glproof;
               self.invoiceTotals.poproof = data.apeiinvoicetotals.poproof;
               self.displayInvoiceTotals();
            }
         }
      });
      // G/L Distribution could have changed based on a number of factors - keep in sync
      self.populateGLDistList();
   };

   self.displayInvoiceTotals = function () {
      self.invoiceTotals.glproofstring = Locale.formatNumber(self.invoiceTotals.glproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.invoiceTotals.poproofstring = Locale.formatNumber(self.invoiceTotals.poproof, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.getBannerRecord = function () {
      return self.bannerRecord;
   };

   // Exit from drill down view - need to unlock soft lock
   self.exitDetail = function () {
      if (self.drillDownRecord.vendno) {

         // Need to update VAT taxing records when leaving the detail screens if using system rates
         if (base.taxInterfaceType === 's' && base.taxMethodType === 'v') {
            self.populateTaxDetail();
         }

         DataService.post('api/ap/asapentry/apeiinvdetunlocksoftlock', { data: self.bannerRecord, busy: true }, function (data) {
         });
      }
      // don't force a refresh since no rows are changed
      base.inDrillDownOperation = false;
      $state.go('^.master', { refreshSearch: base.refreshMaster }, { reload: '^.master' });
      // Force user into add (create) mode each time they return from an Invoice.
      base.create();
   };

   // First time drilling down
   if (self.drillDownRecord) {
      self.bannerRecord.apeiRowid = self.drillDownRecord.apeiRowid;

      DataService.post('api/ap/asapentry/apeiinvdetbanner', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvdetbanner) {
               self.bannerRecord = data.apeiinvdetbanner;
               self.detailSubTitle = self.bannerRecord.vendno + ' || ' + self.bannerRecord.apinvno;
               self.bannerRecord.amountstring = Locale.formatNumber(self.bannerRecord.amount, { style: 'decimal', maximumFractionDigits: 2 });
            }
            if (data.apeiinvoicetotals) {
               self.invoiceTotals.glproof = data.apeiinvoicetotals.glproof;
               self.invoiceTotals.poproof = data.apeiinvoicetotals.poproof;
               self.displayInvoiceTotals();
            }
            self.glDistributionTotals.groupnm = self.bannerRecord.groupnm;
            self.glDistributionTotals.createddt = self.bannerRecord.createddt;
            self.glDistributionTotals.groupseqno = self.bannerRecord.groupseqno;

            // Determine the best tab to initially present
            self.glDistributionTabSelected = false;
            self.addonsTabSelected = false;
            self.poHeaderTabSelected = false;
            self.termsTabSelected = false;
            self.additionalInfoTabSelected = false;
            self.manualPaymentsTabSelected = false;
            self.applyCreditsTabSelected = false;
            self.taxTabSelected = false;

            // Setup how the PO Header Detail view will present the proofs (if that tab is visible)
            self.poHeaderTradeTotalsVisible = true;
            if (self.bannerRecord.proctype.toLowerCase() === 'a') {
               self.poHeaderTradeTotalsVisible = false;
            }

            var initialFolderSelected = false;
            if (self.bannerRecord.poheadertabenabledfl) {

               // PO Header
               self.poHeaderTabSelected = true;
               initialFolderSelected = true;
            } else if (self.bannerRecord.addontabenabledfl && self.bannerRecord.proctype.toLowerCase() === 'a') {

               // Addon
               self.addonsTabSelected = true;
               initialFolderSelected = true;
            } else if (self.bannerRecord.gldisttabenabledfl && self.bannerRecord.proctype.toLowerCase() === 'e') {

               // Expense type transactions - GL Dist
               self.glDistributionTabSelected = true;
               initialFolderSelected = true;
            } else if (self.bannerRecord.gldisttabenabledfl && self.bannerRecord.transcd === 8) {

               // Debit memos - GL Dist
               self.glDistributionTabSelected = true;
               initialFolderSelected = true;
            } else if (self.bannerRecord.termstabenabledfl) {

               // Terms
               self.termsTabSelected = true;
               initialFolderSelected = true;
            } else {

               // See if the default tab (GL Dist) is actually not enabled
               if (!self.bannerRecord.gldisttabenabledfl) {
                  if (self.bannerRecord.additionalinfotabenabledfl) {

                     // Addl Info
                     self.additionalInfoTabSelected = true;
                     initialFolderSelected = true;
                  }
                  else if (self.bannerRecord.manualpaymentstabenabledfl) {

                     // Manual Payment
                     self.manualPaymentsTabSelected = true;
                     initialFolderSelected = true;
                  }
                  else if (self.bannerRecord.misccreditstabenabledfl) {

                     // Apply Credit
                     self.applyCreditsTabSelected = true;
                     initialFolderSelected = true;
                  }
               }
               else {

                  // GL Dist (default)
                  self.glDistributionTabSelected = true;
                  initialFolderSelected = true;
               }
            }

            // No valid tab folder view is available (will happpen for a Rebate transaction).
            if (!initialFolderSelected) {
               MessageService.error('global.error', 'message.there.are.no.tab.screens.that.can.be.shown.for.thi');
               $state.go('^.master');
               return;
            }

            if (self.bannerRecord.gldisttabenabledfl) {
               self.populateGLDistList();
            }

            if (self.bannerRecord.addontabenabledfl) {
               self.populateAddonsList();
               self.retrieveAddonList();
               self.addonsPOAddonButton = false;
               if (self.bannerRecord.proctype.toLowerCase() === 't' || self.bannerRecord.proctype.toLowerCase() === 'a') {
                  if (self.bannerRecord.stagecd < 2) {
                     self.addonsPOAddonButton = true;
                  }
               }
            }

            if (self.bannerRecord.termstabenabledfl) {
               self.populateTermsList();
            }

            if (self.bannerRecord.additionalinfotabenabledfl) {
               self.populateAdditionalInfo(false);
            }

            if (self.bannerRecord.taxdetailenabledfl) {
               self.populateTaxDetail();
            }

            if (self.bannerRecord.poheadertabenabledfl) {
               self.populatePOHeaderList();
            }

            if (self.bannerRecord.manualpaymentstabenabledfl) {
               self.populateManualPaymentsAppliedList();
               self.populateManualPaymentsOpenList();
            }

            if (self.bannerRecord.misccreditstabenabledfl) {
               self.populateApplyCreditsOpenList();
               self.populateApplyCreditsAppliedList();
            }
         }
      });
   }



   // *************** GL Distribution functions

   self.glDistributionBtnSensitivityDefaults = function () {
      if (self.bannerRecord.stagecd === 2) {
         self.glDistributionbtnNewSensitive = false;
         self.glDistributionbtnEditSensitive = false;
         self.glDistributionbtnDeleteSensitive = false;
      } else {
         self.glDistributionbtnNewSensitive = true;
         self.glDistributionbtnEditSensitive = true;
         self.glDistributionbtnDeleteSensitive = false;
      }
   };

   self.displayGLDistributionTotals = function () {
      self.glDistributionTotals.proofstring = Locale.formatNumber(self.glDistributionTotals.proof, { style: 'decimal', maximumFractionDigits: 2 });
      self.glDistributionTotals.proofcostingstring = Locale.formatNumber(self.glDistributionTotals.proofcosting, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.glDistributionListGridRowSelected = function () {
      var record = GridService.getSelectedRecord(self.glDistributionListGrid);
      if (record) {
         self.glDistributionbtnNewSensitive = record.btnaddsensitive;
         self.glDistributionbtnEditSensitive = true;
         self.glDistributionbtnDeleteSensitive = record.btndeletesensitive;
      } else {
         self.glDistributionBtnSensitivityDefaults();
      }
   };

   self.populateGLDistList = function () {
      self.glDistributionBtnSensitivityDefaults();
      DataService.post('api/ap/asapentry/apeiinvdetgldistlist', { data: { apeiinvdetbanner: self.bannerRecord, apeiinvdetgldistproof: self.glDistributionTotals }, busy: true }, function (data) {
         if (data) {
            self.glDistributionList = [];
            if (data.apeiinvdetgldist) {
               self.glDistributionList = data.apeiinvdetgldist;
            }
            if (data.apeiinvdetgldistproof) {
               self.glDistributionTotals = data.apeiinvdetgldistproof;
               self.displayGLDistributionTotals();
            }
         }
      });
   };

   self.glDistributionDelete = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var records = GridService.getSelectedRecords(self.glDistributionListGrid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {

            var recordsToDelete = [];

            records.forEach(function (record) {
               recordsToDelete.push(
               {
                  rwid: record.apeigRowid
               });
            });

            DataService.post('api/ap/asapentry/apeiinvdetgldistdelete', { data: { apeirowids: recordsToDelete, apeiinvdetgldistproof: self.glDistributionTotals }, busy: true }, function (data) {
               if (data) {
                  self.populateGLDistList();
               }
            });
         }
      });
   };

   self.glDistributionNew = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      self.glDistributionAddMode = true;
      $state.go('apece.drilldown.gldistributiondetail');
   };

   self.glDistributionEdit = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var singleRecord = GridService.getSelectedRecord(self.glDistributionListGrid);
      if (singleRecord) {
         self.glDistributionAddMode = false;
         base.generalPurposeROWID = singleRecord.apeigRowid;

         $state.go('apece.drilldown.gldistributiondetail');
      }
   };

   // *************** PO Header functions

   self.populatePOHeaderList = function () {
      var criteria = {
         rwid: self.bannerRecord.apeiRowid
      };
      DataService.post('api/ap/asapentry/apeiinvdetpoheaderlist', { data: { apeirowids: criteria, iAddonSeqNo: base.addonRecordAddonSeqNo }, busy: true }, function (data) {
         if (data) {
            if (self.poHeaderList && self.poHeaderList.length === 0) {
               self.poHeaderList = data;
            }
            else {
               if (self.poHeaderList.length === data.length) {
                  GridService.softUpdateDataset(self.poHeaderListGrid, data, 'apeidRowid');
               }
               else {
                  self.poHeaderList = data;
               }
            }
            if (self.bannerRecord.proctype.toLowerCase() === 'a') {
               self.buildInitialPOHeader();
            } else {
               self.clearpoHeaderProofTotals();
            }
            // Automatically place the user in add (create) mode if nothing in the grid
            if (self.poHeaderTabSelected) {
               if (!self.poHeaderList.length) {
                  self.poHeaderNew();
               }
            }
         }
      });
   };

   self.clearpoHeaderProofTotals = function () {
      base.poHeaderProofs.pototinvamt = 0;
      base.poHeaderProofs.pototqtyord = 0;
      base.poHeaderProofs.uncostamt = 0;
      base.poHeaderProofs.uncostqty = 0;
      base.poHeaderProofs.invproof = 0;
      base.poHeaderProofs.addonproof = 0;
      base.poHeaderProofs.addonamt = 0;
      base.poHeaderDisplayProofTotals();
   };

   self.buildInitialPOHeader = function () {
      // Although this SI call is not really needed (since add / change mode operations do SI calls to rebuild poHeaderRecord,
      // This build call will populate the proof totals.
      var criteria = {
         groupnm: self.bannerRecord.groupnm,
         createddt: self.bannerRecord.createddt,
         groupseqno: self.bannerRecord.groupseqno,
         addonseqno: base.addonRecordAddonSeqNo
      };
      DataService.post('api/ap/asapentry/apeiinvdetpoheaderinitialize', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvdetpolnproof) {
               base.poHeaderProofs = data.apeiinvdetpolnproof;
               base.poHeaderDisplayProofTotals();
            }
         }
      });
   };

   self.poHeaderNew = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      // For Addon proctype, can't add a PO # if no Addon has been selected.
      if (self.bannerRecord.proctype.toLowerCase() === 'a' && base.addonRecordAddonSeqNo === 0) {
         MessageService.error('global.error', 'message.please.select.a.single.addon.record');
         return;
      }

      // For Addon proctype, can't add a PO # for a selected Addon that is of "Manual" allocation type
      if (self.bannerRecord.proctype.toLowerCase() === 'a' && base.addonRecordAllocType.toLowerCase() === 'm') {
         MessageService.error('global.error', 'message.cannot.add.a.purchase.order.to.an.addon.that.is.fo');
         return;
      }

      if (self.bannerRecord.proctype.toLowerCase() !== 'a') {
         self.clearpoHeaderProofTotals();
      }

      self.poHeaderPONo = '';
      self.poHeaderAddMode = true;
      $state.go('apece.drilldown.poheaderdetail');
   };

   self.poHeaderEdit = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var singleRecord = GridService.getSelectedRecord(self.poHeaderListGrid);
      if (singleRecord) {
         self.poHeaderAddMode = false;
         self.poHeaderPONo = singleRecord.pono + '-';
         var str = singleRecord.posuf.toString();
         if (str.length === 1) {
            self.poHeaderPONo = self.poHeaderPONo + '0' + str;
         } else {
            self.poHeaderPONo = self.poHeaderPONo + str;
         }
         base.generalPurposeROWID = singleRecord.apeidRowid;

         $state.go('apece.drilldown.poheaderdetail');
      }
   };

   self.poHeaderDelete = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }
      var records = GridService.getSelectedRecords(self.poHeaderListGrid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {

            var recordsToDelete = [];

            records.forEach(function (record) {
               recordsToDelete.push(
               {
                  rwid: record.apeidRowid
               });
            });

            DataService.post('api/ap/asapentry/apeiinvdetpoheaderdelete', { data: recordsToDelete, busy: true }, function (data) {
               self.populatePOHeaderList();
               self.redisplayProofTotals();
            });
         }
      });
   };

   self.poHeaderScreenCheckEnable = function () {
      // When selecting an Addon row for an "Addon" proctype, enabled the PO Header screen and retrieve the list of records
      if (!self.bannerRecord.poheadertabenabledfl && self.bannerRecord.stagecd !== 9 && self.bannerRecord.proctype.toLowerCase() === 'a') {
         if (base.addonRecordAllocType.toLowerCase() !== 'm') {
            self.bannerRecord.poheadertabenabledfl = true;
            self.populatePOHeaderList();
         }
      }
      else if (self.bannerRecord.poheadertabenabledfl && self.bannerRecord.stagecd !== 9 && self.bannerRecord.proctype.toLowerCase() === 'a') {
         // If the PO Header screen is already enabled and it's an "Addon" proctype, rebuild the PO Header list (for that addonseq#)
         self.populatePOHeaderList();
      }
   };

   self.poHeaderDrilldown = function (e, args) {
      if (self.bannerRecord.proctype.toLowerCase() === 'a') {
         MessageService.error('global.error', 'global.no.PO.Detail.information.can.be.accessed.from.this.transaction.type');
         return;
      }
      var record = args[0].item;
      base.poHeaderDrillDownRecord.pono = record.pono;
      base.poHeaderDrillDownRecord.posuf = record.posuf;
      base.poHeaderDrillDownRecord.apeidRowid = record.apeidRowid;

      $state.go('apece.drilldown.poheaderlineitems');
   };

   // *************** Addons functions

   self.displayAddonsTotals = function () {
      self.addonsTotals.addontotalstring = Locale.formatNumber(self.addonsTotals.addontotal, { style: 'decimal', maximumFractionDigits: 2 });
      self.addonsTotals.discounttotalstring = Locale.formatNumber(self.addonsTotals.discounttotal, { style: 'decimal', maximumFractionDigits: 2 });
      self.addonsTotals.expensedtotalstring = Locale.formatNumber(self.addonsTotals.expensedtotal, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.addonsPOAddonButtonEnabled = function () {
      return self.addonsPOAddonButton;
   };

   self.populateAddonsList = function () {

      DataService.post('api/ap/asapentry/apeiinvdetaddonlist', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {
            self.addonsList = [];
            if (data.apeiinvdetaddon) {
               self.addonsList = data.apeiinvdetaddon;
            }
            if (data.apeiinvdetaddontotals) {
               self.addonsTotals = data.apeiinvdetaddontotals;
               self.displayAddonsTotals();
            }
         }
      });
   };

   self.retrieveAddonList = function () {
      var listCriteria = {
         codeiden: 'x'
      };
      DataService.post('api/sa/sastn/getsastnlist', { data: listCriteria, busy: true }, function (data) {
         if (data) {
            self.addonsSASTNList = [];
            self.addonsSASTNList = data;
         }
      });
   };

   self.addonsDelete = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var records = GridService.getSelectedRecords(self.addonsListGrid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {

            var recordsToDelete = [];

            records.forEach(function (record) {
               recordsToDelete.push(
               {
                  apeiaRowid: record.apeiaRowid
               });
            });

            DataService.post('api/ap/asapentry/apeiinvdetaddondelete', { data: recordsToDelete, busy: true }, function (data) {
               if (data) {
                  self.populateAddonsList();
                  self.redisplayProofTotals();
               }
            });
         }
      });
   };

   self.addonsNew = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      self.addonsAddMode = true;
      $state.go('apece.drilldown.addonsdetail');
   };

   self.addonsEdit = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var singleRecord = GridService.getSelectedRecord(self.addonsListGrid);
      if (singleRecord) {
         self.addonsAddMode = false;
         base.generalPurposeROWID = singleRecord.apeiaRowid;

         $state.go('apece.drilldown.addonsdetail');
      }
   };

   self.addonsPOAddons = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      $state.go('apece.drilldown.addonspoaddons');
   };

   self.addonsSelectedRow = function () {
      base.addonRecordAddonSeqNo = 0;
      base.addonRecordAllocType = '';
      var records = GridService.getSelectedRecords(self.addonsListGrid);
      if (records && records.length) {
         if (records.length === 1) {
            base.addonRecordAddonSeqNo = records[0].addonseqno;
            base.addonRecordAllocType = records[0].alloctype;
            self.poHeaderScreenCheckEnable();
         }
      }
   };

   // *************** Terms functions

   self.displayTermsTotals = function () {
      self.termsTotals.proofinvamtstring = Locale.formatNumber(self.termsTotals.proofinvamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.termsTotals.proofinvpaystring = Locale.formatNumber(self.termsTotals.proofinvpay, { style: 'decimal', maximumFractionDigits: 2 });
      self.termsTotals.proofinvremainstring = Locale.formatNumber(self.termsTotals.proofinvremain, { style: 'decimal', maximumFractionDigits: 2 });
      self.termsTotals.proofiorigdiscstring = Locale.formatNumber(self.termsTotals.prooforigdisc, { style: 'decimal', maximumFractionDigits: 2 });
      self.termsTotals.proofdiscpaystring = Locale.formatNumber(self.termsTotals.proofdiscpay, { style: 'decimal', maximumFractionDigits: 2 });
      self.termsTotals.proofdiscremainstring = Locale.formatNumber(self.termsTotals.proofdiscremain, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.populateTermsList = function () {
      DataService.post('api/ap/asapentry/apeiinvdettermslist', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {
            self.termsList = [];
            if (data.apeiinvdetterms) {
               self.termsList = data.apeiinvdetterms;
            }
            if (data.apeiinvdettermstotals) {
               self.termsTotals = data.apeiinvdettermstotals;
               self.displayTermsTotals();
            }
         }
      });
   };

   self.termsNew = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      self.termsAddMode = true;
      $state.go('apece.drilldown.termsdetail');
   };

   self.termsEdit = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var singleRecord = GridService.getSelectedRecord(self.termsListGrid);
      if (singleRecord) {
         self.termsAddMode = false;
         base.generalPurposeROWID = singleRecord.apeiRowid;

         $state.go('apece.drilldown.termsdetail');
      }
   };

   self.termsDelete = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var records = GridService.getSelectedRecords(self.termsListGrid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {

            var recordsToDelete = [];

            records.forEach(function (record) {
               recordsToDelete.push(
               {
                  apeiRowid: record.apeiRowid,
                  groupnm: record.groupnm,
                  createddt: record.createddt,
                  groupseqno: record.groupseqno
               });
            });

            DataService.post('api/ap/asapentry/apeiinvdettermsdelete', { data: recordsToDelete, busy: true }, function (data) {
               if (data) {
                  self.populateTermsList();
               }
            });
         }
      });
   };

   self.termsSplitTerms = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      $state.go('apece.drilldown.termssplitterms');
   };

   // *************** Additional Info functions

   self.populateAdditionalInfo = function (changeMode) {
      self.additionalInfoSaveEnabled = changeMode;
      self.additionalInfoData.groupnm = self.bannerRecord.groupnm;
      self.additionalInfoData.createddt = self.bannerRecord.createddt;
      self.additionalInfoData.groupseqno = self.bannerRecord.groupseqno;
      self.additionalInfoData.apeiRowid = self.bannerRecord.apeiRowid;

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.additionalInfoBanknoDropDownOptions = dropDownList;
      });

      DataService.post('api/ap/asapentry/apeiinvdetaddlinforetrieve', { data: { apeiinvdetaddlinfo: self.additionalInfoData, lChangeMode: changeMode }, busy: true }, function (data) {
         if (data) {
            self.additionalInfoData = data;
         }
      });
   };

   self.additionalInforSaveEnabled = function () {
      return self.additionalInfoSaveEnabled;
   };

   self.additionalInforSubmit = function () {
      DataService.post('api/ap/asapentry/apeiinvdetaddlinfoupdate', { data: self.additionalInfoData, busy: true }, function (data) {
         if (data) {
            self.populateAdditionalInfo(false);
         }
      });
   };

   // *************** Manual Payment functions

   self.populateManualPaymentsAppliedList = function () {
      self.manualPaymentsAppliedList = [];
      var criteria = {
         rwid: self.bannerRecord.apeiRowid
      };

      DataService.post('api/ap/asapentry/apeiinvdetmanpayappliedinvlist', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvdetmanpyappinv) {
               self.manualPaymentsAppliedList = data.apeiinvdetmanpyappinv;
            }
            self.manualPaymentsProofString = Locale.formatNumber(data.dProof, { style: 'decimal', maximumFractionDigits: 2 });
         }
      });
   };

   self.populateManualPaymentsOpenList = function () {
      self.manualPaymentsOpenList = [];
      var criteria = {
         rwid: self.bannerRecord.apeiRowid
      };
      DataService.post('api/ap/asapentry/apeiinvdetmanpayopeninvlist', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.manualPaymentsOpenList = data;
         }
      });
   };

   self.manualPaymentsNew = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      self.manualPaymentsAddMode = true;
      $state.go('apece.drilldown.manualpaymentsdetail');
   };

   self.manualPaymentsEdit = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var singleRecord = GridService.getSelectedRecord(self.manualPaymentsAppliedListGrid);
      if (singleRecord) {
         self.manualPaymentsAddMode = false;
         base.generalPurposeROWID = singleRecord.apeiRowid;

         $state.go('apece.drilldown.manualpaymentsdetail');
      }
   };

   self.manualPaymentsDelete = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var records = GridService.getSelectedRecords(self.manualPaymentsAppliedListGrid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {

            var recordsToDelete = [];

            records.forEach(function (record) {
               recordsToDelete.push(record);
            });

            var criteria = {
               rwid: self.bannerRecord.apeiRowid
            };
            DataService.post('api/ap/asapentry/apeiinvdetmanpayappliedinvdelete', { data: { apeiinvdetmanpyappinv: recordsToDelete, apeirowids: criteria }, busy: true }, function (data) {
               if (data) {
                  self.populateManualPaymentsAppliedList();
               }
            });
         }
      });
   };

   self.manualPaymentsApplySelected = function () {
      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var records = GridService.getSelectedRecords(self.manualPaymentsOpenListGrid);
      if (records && records.length) {
         var invoicesToSelect = [];

         records.forEach(function (record) {
            invoicesToSelect.push(record);
         });
         var criteria = {
            rwid: self.bannerRecord.apeiRowid
         };
         DataService.post('api/ap/asapentry/apeiinvdetmanpayopeninvselect', { data: { apeiinvdetmanpyopninv: invoicesToSelect, apeirowids: criteria }, busy: true }, function () {
            self.populateManualPaymentsAppliedList();
         });
      }
   };

   // *************** Apply Credits functions

   self.populateApplyCreditsOpenList = function () {
      self.applyCreditsOpenList = [];
      var criteria = {
         rwid: self.bannerRecord.apeiRowid
      };
      DataService.post('api/ap/asapentry/apeiinvdetcreditmemoopeninvlist', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.applyCreditsOpenList = data;
         }
      });
   };

   self.populateApplyCreditsAppliedList = function () {
      self.applyCreditsAppliedList = [];
      var criteria = {
         rwid: self.bannerRecord.apeiRowid
      };
      DataService.post('api/ap/asapentry/apeiinvdetcreditmemoappliedinvlist', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.applyCreditsAppliedList = [];
            if (data.apeiinvdetcmappinv) {
               self.applyCreditsAppliedList = data.apeiinvdetcmappinv;
            }
            self.applyCreditsProofString = Locale.formatNumber(data.dProof, { style: 'decimal', maximumFractionDigits: 2 });
         }
      });
   };

   self.applyCreditsNew = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      self.applyCreditsAddMode = true;
      $state.go('apece.drilldown.applycreditsdetail');
   };


   self.applyCreditsEdit = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var singleRecord = GridService.getSelectedRecord(self.applyCreditsAppliedListGrid);
      if (singleRecord) {
         self.applyCreditsAddMode = false;
         base.generalPurposeROWID = singleRecord.apeiRowid;

         $state.go('apece.drilldown.applycreditsdetail');
      }

   };

   self.applyCreditsDelete = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var records = GridService.getSelectedRecords(self.applyCreditsAppliedListGrid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {

            var recordsToDelete = [];

            records.forEach(function (record) {
               recordsToDelete.push(record);
            });

            var criteria = {
               rwid: self.bannerRecord.apeiRowid
            };
            DataService.post('api/ap/asapentry/apeiinvdetcreditmemoappliedinvdelete', { data: { apeiinvdetcmappinv: recordsToDelete, apeirowids: criteria }, busy: true }, function (data) {
               if (data) {
                  self.populateApplyCreditsAppliedList();
               }
            });
         }
      });
   };

   self.applyCreditsApplySelected = function () {

      // Don't allow changes to a Closed AP Invoice
      if (self.bannerRecord.stagecd === 2) {
         MessageService.error('global.error', 'message.this.ap.invoice.is.closed.and.cannot.be.modified');
         return;
      }

      var records = GridService.getSelectedRecords(self.applyCreditsOpenListGrid);
      if (records && records.length) {
         var invoicesToSelect = [];

         records.forEach(function (record) {
            invoicesToSelect.push(record);
         });
         var criteria = {
            rwid: self.bannerRecord.apeiRowid
         };
         DataService.post('api/ap/asapentry/apeiinvdetcreditmemoopeninvselect', { data: { apeiinvdetcmopninv: invoicesToSelect, apeirowids: criteria }, busy: true }, function () {
            self.populateApplyCreditsAppliedList();
         });
      }
   };

   // *************** Tax Distribution functions

   self.populateTaxDetail = function () {
      DataService.post('api/ap/asapentry/apeiinvdettaxeslist', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvdettaxes) {
               self.taxDetailData = data.apeiinvdettaxes;
               self.displayTaxDetailTotals();
            }
            if (data.apeiinvdettaxjur) {
               self.taxDetailList = data.apeiinvdettaxjur;
            }
         }
      });
   };

   self.displayTaxDetailTotals = function () {
      self.taxDetailData.twetax1string = Locale.formatNumber(self.taxDetailData.twetax1, { style: 'decimal', maximumFractionDigits: 2 });
      self.taxDetailData.twetax2string = Locale.formatNumber(self.taxDetailData.twetax2, { style: 'decimal', maximumFractionDigits: 2 });
      self.taxDetailData.twetax3string = Locale.formatNumber(self.taxDetailData.twetax3, { style: 'decimal', maximumFractionDigits: 2 });
      self.taxDetailData.twetax4string = Locale.formatNumber(self.taxDetailData.twetax4, { style: 'decimal', maximumFractionDigits: 2 });
      self.taxDetailData.twetaxttlstring = Locale.formatNumber(self.taxDetailData.twetaxttl, { style: 'decimal', maximumFractionDigits: 2 });
      self.taxDetailData.vendortaxttlstring = Locale.formatNumber(self.taxDetailData.vendortaxttl, { style: 'decimal', maximumFractionDigits: 2 });
      self.taxDetailData.distribtaxttlstring = Locale.formatNumber(self.taxDetailData.distribtaxttl, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.taxDetailUpdate = function () {
      DataService.post('api/ap/asapentry/apeiinvdettaxesupdate', { data: self.taxDetailData, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.warning', data);
         }
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };

   self.taxDetailVendorFieldChange = function (fieldName) {
      DataService.post('api/ap/asapentry/apeiinvdettaxesfieldchange', { data: { apeiinvdettaxes: self.taxDetailData, cFieldNm: fieldName }, busy: true }, function (data) {
         if (data) {
            self.taxDetailData = data;
            self.displayTaxDetailTotals();
         }
      });
   };
});

app.controller('ApeceDrillDownGLDistDetail', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;
   self.glDistributiondetailTitle = MessageService.get('gl.distribution.details');
   self.manpostfl = false;
   self.userhassecurity = false;
   self.authPoint1Processed = false;

   self.glAccountRecord = {
      amount: 0,
      amountenabled: false,
      glname: '',
      createddt: '',
      glno: '',
      glnoenabled: false,
      gldivno: 0,
      gldeptno: 0,
      glacctno: 0,
      glsubno: 0,
      glseqno: 0,
      statustype: false,
      groupnm: '',
      groupseqno: 0,
      transcd: 0,
      transcdenabled: false,
      gltype: '',
      notupdatablefl: false,
      postwhencostedfl: false,
      postwhencostedflenabled: false,
      drcr: '',
      convertpctenabled: false,
      amttoproofenabled: false,
      apeigRowid: 0
   };

   if (self.drldwn.glDistributionAddMode) {
      self.glDistributiondetailTitle = self.glDistributiondetailTitle + ' - ' + MessageService.get('global.create');
   } else {
      self.glDistributiondetailTitle = self.glDistributiondetailTitle + ' - ' + MessageService.get('global.update');
   }

   // first time in
   if (self.glDistributiondetailTitle) {
      self.authPoint1Processed = false;
      self.glAccountRecord.groupnm = self.drldwn.bannerRecord.groupnm;
      self.glAccountRecord.createddt = self.drldwn.bannerRecord.createddt;
      self.glAccountRecord.groupseqno = self.drldwn.bannerRecord.groupseqno;

      if (self.drldwn.glDistributionAddMode) {
         DataService.post('api/ap/asapentry/apeiinvdetgldistaddprepare', { data: self.glAccountRecord, busy: true }, function (data) {
            if (data) {
               self.glAccountRecord = data;
            }
         });
      } else {
         self.glAccountRecord.apeigRowid = base.generalPurposeROWID;
         DataService.post('api/ap/asapentry/apeiinvdetgldistchgretrieve', { data: { apeiinvdetgldist: self.glAccountRecord, apeiinvdetgldistproof: self.drldwn.glDistributionTotals, lChangeMode: true }, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetgldist) {
                  self.glAccountRecord = data.apeiinvdetgldist;
               }
               if (data.apeiinvdetgldistproof) {
                  self.drldwn.glDistributionTotals = data.apeiinvdetgldistproof;
               }
            }
         });
      }
   }

   self.submit = function () {
      self.manpostfl = false;
      self.userhassecurity = false;

      // Check auth point # 1 (both add/change mode)
      var acctAuthCriteria = {
         Option1Account: self.glAccountRecord.glno
      };

      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: acctAuthCriteria, busy: true }, function (data) {
         if (data) {
            self.manpostfl = data.manpostfl;
            self.userhassecurity = data.userhassecurity;
            if (!self.authPoint1Processed) {
               if (!self.manpostfl) {
                  AuthService.createAuthPoint('gleta', '', 'manpostfl', String.Empty, String.Empty, null, self.submitAuthPoint1Passed, null);
               } else {
                  self.submitCheck2ndAuth();
               }
            } else {
               self.submitCheck2ndAuth();
            }
         }
      });
   };

   self.submitAuthPoint1Passed = function () {
      self.authPoint1Processed = true;
      self.submitCheck2ndAuth();
   };

   self.submitCheck2ndAuth = function () {

      if (!self.userhassecurity) {
         AuthService.createAuthPoint('gleta', '', 'account', String.Empty, String.Empty, null, self.submitAuthPoint2Passed, null);
      } else {
         self.submitFinal();
      }
   };

   self.submitAuthPoint2Passed = function () {
      self.submitFinal();
   };

   self.submitFinal = function () {

      if (self.drldwn.glDistributionAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdetgldistaddupdate', { data: { apeiinvdetgldist: self.glAccountRecord, apeiinvdetgldistproof: self.drldwn.glDistributionTotals }, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetgldist) {
                  self.glAccountRecord = data.apeiinvdetgldist;
               }
               if (data.apeiinvdetgldistproof) {
                  self.drldwn.glDistributionTotals = data.apeiinvdetgldistproof;
               }
               self.drldwn.populateGLDistList();
               $state.go('^');
            }
         });
      } else {
         // Change mode
         DataService.post('api/ap/asapentry/apeiinvdetgldistchgupdate', { data: { apeiinvdetgldist: self.glAccountRecord, apeiinvdetgldistproof: self.drldwn.glDistributionTotals }, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetgldist) {
                  self.glAccountRecord = data.apeiinvdetgldist;
               }
               if (data.apeiinvdetgldistproof) {
                  self.drldwn.glDistributionTotals = data.apeiinvdetgldistproof;
               }
               self.drldwn.populateGLDistList();
               $state.go('^');
            }
         });
      }
   };
});

app.controller('ApeceDrillDownAddonsDetail', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;
   self.addonsdetailTitle = MessageService.get('global.addons');

   if (self.drldwn.addonsAddMode) {
      self.addonsdetailTitle = self.addonsdetailTitle + ' - ' + MessageService.get('global.create');
   } else {
      self.addonsdetailTitle = self.addonsdetailTitle + ' - ' + MessageService.get('global.update');
   }

   self.addonsRecord = {
      groupnm: '',
      groupseqno: 0,
      createddt: '',
      addonseqno: 0,
      addonno: 0,
      addonnoenabled: false,
      addondesc: '',
      addontype: '',
      origamt: 0,
      origamtenabled: false,
      alloctype: '',
      alloctypeenabled: false,
      allocationmethod: '',
      capfl: false,
      capflenabled: false,
      refreshtermsfl: false,
      refreshglfl: false,
      warningmess: '',
      apeiaRowid: 0
   };

   // first time in
   if (self.addonsdetailTitle) {
      self.addonsRecord.groupnm = self.drldwn.bannerRecord.groupnm;
      self.addonsRecord.createddt = self.drldwn.bannerRecord.createddt;
      self.addonsRecord.groupseqno = self.drldwn.bannerRecord.groupseqno;
      if (self.drldwn.addonsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdetaddonaddprepare', { data: self.addonsRecord, busy: true }, function (data) {
            if (data) {
               self.addonsRecord = data;
            }
         });
      } else {
         // Change mode
         self.addonsRecord.apeiaRowid = base.generalPurposeROWID;
         DataService.post('api/ap/asapentry/apeiinvdetaddonchgretrieve', { data: { apeiinvdetaddon: self.addonsRecord, lChangeMode: true }, busy: true }, function (data) {
            if (data) {
               self.addonsRecord = data;
            }
         });
      }
   }

   self.addonNumberChanged = function () {
      if (self.drldwn.addonsSASTNList) {
         self.drldwn.addonsSASTNList.forEach(function (record) {
            // SASTN.state contains Allocation Type
            if (record.state && record.codeval === self.addonsRecord.addonno) {
               self.addonsRecord.alloctype = record.state.toUpperCase();
            }
         });
      }
   };

   self.submit = function () {
      if (self.drldwn.addonsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdetaddonaddupdate', { data: self.addonsRecord, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetaddon) {
                  if (data.apeiinvdetaddon.refreshglfl) {
                     self.drldwn.populateGLDistList();
                  }
                  if (data.apeiinvdetaddon.refreshtermsfl) {
                     self.drldwn.populateTermsList();
                  }
               }
               // Proof totals will get rebuild during the populateAddonsList function
               self.drldwn.populateAddonsList();
               self.drldwn.poHeaderScreenCheckEnable();
               self.drldwn.redisplayProofTotals();
               self.drldwn.populateTaxDetail();
               $state.go('^');
            }
         });
      } else {
         // Change mode
         DataService.post('api/ap/asapentry/apeiinvdetaddonchgupdate', { data: self.addonsRecord, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetaddon.refreshglfl) {
                  self.drldwn.populateGLDistList();
               }
               if (data.apeiinvdetaddon.refreshtermsfl) {
                  self.drldwn.populateTermsList();
               }
               // Proof totals will get rebuild during the populateAddonsList function
               self.drldwn.poHeaderScreenCheckEnable();
               self.drldwn.populateAddonsList();
               self.drldwn.redisplayProofTotals();
               self.drldwn.populateTaxDetail();
               $state.go('^');
            }
         });
      }
   };
});

app.controller('ApeceDrillDownAddonsPOAddons', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.addonsPORecord = {
      ponostring: ''
   };

   self.addonsPOList = [];

   self.listAddons = function () {
      var criteria = {
         iPONo: 0,
         iPOsuf: 0
      };
      if (self.addonsPORecord.ponostring) {
         var poParts = self.addonsPORecord.ponostring.split('-');
         if (poParts.length === 2) {
            criteria.iPONo = parseInt(poParts[0], 10);
            criteria.iPOSuf = parseInt(poParts[1], 10);
         }
      }

      DataService.get('api/ap/asapentry/apeiinvdetaddonpoaddonget/' + criteria.iPONo + '/' + criteria.iPOSuf, { busy: true }, function (data) {
         if (data) {
            self.addonsPOList = [];
            self.addonsPOList = data;
         }
      });
   };

   self.submit = function () {
      if (self.addonsPOListGrid) {
         var totAddon = 0;
         var records = GridService.getSelectedRecords(self.addonsPOListGrid);
         if (records && records.length) {
            var updateList = [];

            records.forEach(function (record) {
               totAddon += record.addonnet;
               updateList.push(record);
            });

            DataService.post('api/ap/asapentry/apeiinvdetaddonpoaddonupdt', { data: { apeiinvdetaddonpoaddons: updateList, apeiinvdetbanner: self.drldwn.bannerRecord }, busy: true }, function () {
               // No Data object really is returned from this SI call.

               self.drldwn.populateGLDistList();
               self.drldwn.populateAddonsList();

               // If addons were selected, update the taxes based on what was added
               if (totAddon) {
                  self.drldwn.populateTaxDetail();
               }
               self.drldwn.redisplayProofTotals();
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('^');
            });
         } else {
            MessageService.error('global.error', 'message.please.select.one.or.more.po.addons.to.be.processe');
         }
      } else {
         MessageService.error('global.error', 'message.please.select.one.or.more.po.addons.to.be.processe');
      }
   };
});

app.controller('ApeceDrillDownTermsDetail', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.termsdetailTitle = MessageService.get('global.terms');

   if (self.drldwn.termsAddMode) {
      self.termsdetailTitle = self.termsdetailTitle + ' - ' + MessageService.get('global.create');
   } else {
      self.termsdetailTitle = self.termsdetailTitle + ' - ' + MessageService.get('global.update');
   }

   self.termsRecord = {
      groupnm: '',
      groupseqno: 0,
      createddt: '',
      invseqno: 0,
      amount: 0,
      amountenabled: false,
      invtype: '',
      invtypeenabled: false,
      origdisc: 0,
      origdiscenabled: false,
      disputefl: false,
      disputeflenabled: false,
      duedt: '',
      duedtenabled: false,
      discdt: '',
      discdtenabled: false,
      apeiRowid: 0
   };


   // first time in
   if (self.termsdetailTitle) {
      self.termsRecord.groupnm = self.drldwn.bannerRecord.groupnm;
      self.termsRecord.createddt = self.drldwn.bannerRecord.createddt;
      self.termsRecord.groupseqno = self.drldwn.bannerRecord.groupseqno;
      if (self.drldwn.termsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdettermsaddprepare', { data: self.termsRecord, busy: true }, function (data) {
            if (data) {
               self.termsRecord = data;
            }
         });
      } else {
         // Change mode
         self.termsRecord.apeiRowid = base.generalPurposeROWID;
         DataService.post('api/ap/asapentry/apeiinvdettermschgretrieve', { data: { apeiinvdetterms: self.termsRecord, lChangeMode: true }, busy: true }, function (data) {
            if (data) {
               self.termsRecord = data;
            }
         });
      }
   }

   self.submit = function () {
      if (self.drldwn.termsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdettermsaddupdate', { data: self.termsRecord, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetterms) {
                  // Proof totals will get rebuild during the populateTermsList function
                  self.drldwn.populateTermsList();
                  $state.go('^');
               }
               base.refreshMaster = true;
            }
         });
      } else {
         // Change mode
         DataService.post('api/ap/asapentry/apeiinvdettermschgupdate', { data: self.termsRecord, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetterms) {
                  // Proof totals will get rebuild during the populateTermsList function
                  self.drldwn.populateTermsList();
                  $state.go('^');
               }
               base.refreshMaster = true;
            }
         });
      }
   };
});

app.controller('ApeceDrillDownTermsSplitTerms', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.splittermsRecord = {
      groupnm: '',
      groupseqno: 0,
      createddt: '',
      duedt: '',
      discdt: '',
      nopays: 0,
      days: 0,
      discpct: 0,
      discamt: 0
   };

   // First time in
   if (self.drldwn) {
      self.splittermsRecord.groupnm = self.drldwn.bannerRecord.groupnm;
      self.splittermsRecord.createddt = self.drldwn.bannerRecord.createddt;
      self.splittermsRecord.groupseqno = self.drldwn.bannerRecord.groupseqno;
      DataService.post('api/ap/asapentry/apeiinvdettermssplitinit', { data: self.splittermsRecord, busy: true }, function (data) {
         if (data) {
            self.splittermsRecord = data;
         }
      });
   }

   self.submit = function () {
      DataService.post('api/ap/asapentry/apeiinvdettermssplitupdate', { data: self.splittermsRecord, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            self.drldwn.populateTermsList();
            $state.go('^');
         }
      });
   };
});

app.controller('ApeceDrillDownPOHeaderDetail', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.vendnoChanged = function () {
      var params = {
         vendno: self.polkupvendno,
         fldlist: 'rowpointer'
      };

      DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.vendnorowpointer = data.rowpointer;
         }
         else {
            self.vendnorowpointer = null;
         }
      });
   };

   self.polkupvendno = self.drldwn.bannerRecord.vendno;
   self.vendnoChanged();

   self.poHeaderTradeTotalsVisible = self.drldwn.poHeaderTradeTotalsVisible;

   self.poHeaderdetailTitle = MessageService.get('po.header.entry');
   if (self.drldwn.poHeaderAddMode) {
      self.poHeaderdetailTitle = self.poHeaderdetailTitle + ' - ' + MessageService.get('global.create');
   } else {
      self.poHeaderdetailTitle = self.poHeaderdetailTitle + ' - ' + MessageService.get('global.update');
   }

   self.proofTitle = '';
   if (self.drldwn.poHeaderTradeTotalsVisible) {
      self.proofTitle = MessageService.get('global.proof.for.po') + ':' + self.drldwn.poHeaderPONo;
   } else {
      // This field is not used/needed for the Addons transaction.
      self.proofTitle = '';
   }

   self.proofTitleQuantity = MessageService.get('global.quantity');
   self.proofTitleAmount = MessageService.get('global.amount');
   self.adonsOnPOMessage = '';
   self.expectedFreightMessage = '';
   self.selectPOLinesForAddon = false;
   self.buildpoHeaderAddonList = false;
   self.poHeaderAddonList = [];

   self.poNumber = '';
   self.poHeaderRecord = {
      groupnm: '',
      createddt: '',
      groupseqno: 0,
      pono: 0,
      ponoenabled: false,
      posuf: 0,
      potranstype: '',
      totlineamt: 0,
      podisc: 0,
      podiscenabled: false,
      allocationtype: '',
      allocationtypeenabled: false,
      closefl: false,
      closeflenabled: false,
      closewhencostedfl: false,
      closewhencostedflenabled: false,
      addonapplyty: '',
      addonapplytyenabled: false,
      addonfrompoln: 0,
      addonfrompolnenabled: false,
      addontopoln: 0,
      addontopolnenabled: false,
      addonpolnlist: '',
      addonpolnlisteenabled: false,
      costord: 0,
      costordenabled: false,
      vendno: 0,
      shipfmno: 0,
      receiverno: '',
      whse: '',
      podivno: 0,
      divnodesc: '',
      stagecd: 0,
      stagecdword: '',
      addonseqno: 0,
      poaddonfl: false,
      frtexpectedfl: false,
      correctionmsg: '',
      notesfl: '',
      invtermstype: '',
      invtermstypedesc: '',
      potermstype: '',
      potermstypedesc: '',
      apsvtermstype: '',
      apsvtermstypedesc: '',
      termsdiffenabledfl: false,
      termsdiffchoice: '',
      podoshipdt: '',
      podoshipdtenabled: false,
      apeidRowid: 0,
      userfield: ''
   };

   // First time in here
   if (self.poHeaderdetailTitle) {
      self.buildpoHeaderAddonList = true;
      self.poHeaderRecord.groupnm = self.drldwn.bannerRecord.groupnm;
      self.poHeaderRecord.createddt = self.drldwn.bannerRecord.createddt;
      self.poHeaderRecord.groupseqno = self.drldwn.bannerRecord.groupseqno;
      self.poHeaderRecord.addonseqno = base.addonRecordAddonSeqNo;
      if (self.drldwn.poHeaderAddMode) {
         // Add mode
         self.poNumber = '';

         DataService.post('api/ap/asapentry/apeiinvdetpoheaderaddprepare', { data: self.poHeaderRecord, busy: true }, function (data) {
            if (data) {
               self.poHeaderRecord = data;
               base.poHeaderDisplayProofTotals();
            }
         });
      } else {
         // Change mode
         self.poHeaderRecord.apeidRowid = base.generalPurposeROWID;
         DataService.post('api/ap/asapentry/apeiinvdetpoheaderchgretrieve', { data: { apeiinvdetpohdr: self.poHeaderRecord, lChangeMode: true }, busy: true }, function (data) {
            if (data) {
               if (data.apeiinvdetpohdr) {
                  self.poHeaderRecord = data.apeiinvdetpohdr;
                  self.poNumber = self.poHeaderRecord.pono + '-' + Utils.pad(self.poHeaderRecord.posuf, 2);
               }
               if (data.apeiinvdetpolnproof) {
                  base.poHeaderProofs = data.apeiinvdetpolnproof;
                  base.poHeaderDisplayProofTotals();
               }
            }
         });
      }
   }

   self.fieldChanged = function (fieldName) {
      if (fieldName === 'pono') {
         self.buildpoHeaderAddonList = true;
         var poParts = self.poNumber.split('-');
         if (poParts.length === 2) {
            self.poHeaderRecord.pono = parseInt(poParts[0], 10);
            self.poHeaderRecord.posuf = parseInt(poParts[1], 10);
         }
      }

      DataService.post('api/ap/asapentry/apeiinvdetpoheaderfieldchange', { data: { apeiinvdetpohdr: self.poHeaderRecord, cFieldName: fieldName }, busy: true }, function (data) {
         if (data) {
            self.poHeaderRecord = data;

            if (fieldName === 'pono') {
               self.adonsOnPOMessage = '';
               self.expectedFreightMessage = '';
               if (self.poHeaderRecord.poaddonfl) {
                  self.adonsOnPOMessage = MessageService.get('global.addons.on.po');
               }
               if (!self.poHeaderRecord.frtexpectedfl) {
                  self.expectedFreightMessage = MessageService.get('message.freight.is.not.expected.on.this.po');
               }
               if (self.poHeaderRecord.correctionmsg) {
                  MessageService.info('global.information', self.poHeaderRecord.correctionmsg);
                  self.poHeaderRecord.correctionmsg = '';
               }
               if (self.poHeaderRecord.termsdiffenabledfl) {
                  MessageService.info('global.information', 'message.please.review.vendor...invoice...po.payment.terms');
               }

               if (self.poHeaderRecord.addonapplyty.toLowerCase() === 's') {
                  self.selectPOLinesForAddon = true;
                  if (self.buildpoHeaderAddonList) {
                     self.buildpoHeaderAddonList = false;
                     self.poHeaderBuildAddonList();
                  }
               }
            }

            if (fieldName === 'addonapplyty') {
               self.selectPOLinesForAddon = false;

               if (self.poHeaderRecord.addonapplyty.toLowerCase() === 's') {
                  self.selectPOLinesForAddon = true;
                  if (self.buildpoHeaderAddonList) {
                     self.buildpoHeaderAddonList = false;
                     self.poHeaderBuildAddonList();
                  }
               }
            }
         }
      });
   };

   self.poHeaderBuildAddonList = function () {
      DataService.get('api/ap/asapentry/apeiinvdetpolineaddonselect/' + self.poHeaderRecord.pono + '/' + self.poHeaderRecord.posuf, { busy: true }, function (data) {
         if (data) {
            self.poHeaderAddonList = data;
         }
      });
   };

   self.poHeaderAddonsSelect = function (selectLines) {
      var records = GridService.getSelectedRecords(self.poHeaderAddonListGrid);
      if (records && records.length) {

         records.forEach(function (record) {
            if (selectLines) {
               record.selectfl = true;
            } else {
               record.selectfl = false;
            }
            var indx = self.poHeaderAddonList.indexOf(record);
            self.poHeaderAddonListGrid.updateRow(indx);
         });
      }
   };

   self.submit = function () {

      self.poHeaderRecord.addonpolnlist = '';
      if (self.drldwn.bannerRecord.proctype.toLowerCase() === 'a' && self.poHeaderRecord.addonapplytyenabled && self.poHeaderRecord.addonapplyty.toLowerCase() === 's') {
         var lineNoList = '';
         if (self.poHeaderAddonList) {
            var len = self.poHeaderAddonList.length;
            for (var i = 0; i < len; i++) {
               var record = self.poHeaderAddonList[i];
               if (record && record.selectfl) {
                  if (lineNoList) {
                     lineNoList = lineNoList + ',';
                  }
                  lineNoList = lineNoList + record.lineno.toString();
               }
            }
         }
         self.poHeaderRecord.addonpolnlist = lineNoList;
      }

      if (self.drldwn.poHeaderAddMode) {
         // Add mode
         if (self.drldwn.bannerRecord.proctype.toLowerCase() === 'a') {
            self.poHeaderRecord.addonseqno = base.addonRecordAddonSeqNo;
         }
         DataService.post('api/ap/asapentry/apeiinvdetpoheaderaddupdate', { data: self.poHeaderRecord, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.drldwn.populatePOHeaderList();
                  self.drldwn.redisplayProofTotals();
                  self.drldwn.populateTaxDetail();
                  $state.go('^');
               }
            }
         });
      } else {
         // Change mode
         DataService.post('api/ap/asapentry/apeiinvdetpoheaderchgupdate', { data: self.poHeaderRecord, busy: true }, function (data) {
            if (data) {
               self.drldwn.populatePOHeaderList();
               self.drldwn.redisplayProofTotals();
               self.drldwn.populateTaxDetail();
               $state.go('^');
            }
         });
      }
   };
});

app.controller('ApeceDrillDownPOHeaderLineItems', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;
   self.bannerRecord = self.drldwn.getBannerRecord();
   self.poLineList = [];
   self.proofTitle = '';
   self.poLineRecord = {
      groupnm: '',
      createddt: '',
      groupseqno: 0,
      detailseqno: 0,
      addonapplyty: '',
      addonfrompoln: 0,
      addonpolnlist: '',
      addonseqno: 0,
      addontopoln: 0,
      apinvno: '',
      bundleid: '',
      closefl: false,
      cNextSuf: '',
      cNextSufNetAmt: '',
      cNextSufQtyRcv: '',
      cNonStockTy: '',
      compseqno: 0,
      cost: 0,
      costord: 0,
      costrcv: 0,
      cOtherSufNetAmt: '',
      cOtherSufQtyRcv: '',
      cPOELQtyCosted: '',
      cPOELQtyRcv: '',
      cPONotesFl: '',
      detailty: '',
      dManualAddon: 0,
      dPoelExtended: 0,
      dPOELNetRcv: 0,
      dPoelQtyOrd: 0,
      eachfl: false,
      invunit: '',
      lineno: 0,
      operinit: '',
      polnseqno: 0,
      pono: 0,
      posuf: 0,
      pounit: '',
      proctype: '',
      proddesc: '',
      proddesc2: '',
      qtyord: 0,
      qtyrcv: 0,
      receiverno: '',
      reconoverfl: false,
      shipprod: '',
      statustype: false,
      unitconv: 0,
      updatefl: false,
      vendno: 0,
      vendprod: '',
      whse: '',
      closeflenabled: false,
      costenabled: false,
      costordenabled: false,
      linenoenabled: false,
      manualaddonenabled: false,
      perunitenabled: false,
      ponoenabled: false,
      posufenabled: false,
      proddescenabled: false,
      proddesc2enabled: false,
      qtyordenabled: false,
      reconoverflenabled: false,
      shipprodenabled: false,
      tallyenabled: false,
      vendprodenabled: false,
      perunithidden: false,
      tallyhidden: false,
      origcost: 0,
      origlineno: 0,
      origpono: 0,
      origposuf: 0,
      origqtyord: 0,
      origprod: '',
      podoshipdt: '',
      apeidRowid: 0
   };
   self.poLineProof = {
      pono: 0,
      posuf: 0,
      pototinvamt: 0,
      pototinvamtstring: '',
      pototqtyord: 0,
      pototqtyordstring: '',
      uncostamt: 0,
      uncostamtstring: '',
      uncostqty: 0,
      uncostqtystring: '',
      invproof: 0,
      invproofstring: '',
      addonproof: 0,
      addonproofstring: '',
      addonamt: 0,
      addonamtstring: ''
   };
   self.displaypoLineProofs = function () {
      self.poLineProof.pototinvamtstring = Locale.formatNumber(self.poLineProof.pototinvamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.pototqtyordstring = Locale.formatNumber(self.poLineProof.pototqtyord, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.uncostamtstring = Locale.formatNumber(self.poLineProof.uncostamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.uncostqtystring = Locale.formatNumber(self.poLineProof.uncostqty, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.invproofstring = Locale.formatNumber(self.poLineProof.invproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.addonproofstring = Locale.formatNumber(self.poLineProof.addonproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.addonamtstring = Locale.formatNumber(self.poLineProof.addonamt, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.proofTitleQuantity = MessageService.get('global.quantity');
   self.proofTitleAmount = MessageService.get('global.amount');
   var poNo = base.poHeaderDrillDownRecord.pono;
   var poSuf = base.poHeaderDrillDownRecord.posuf;
   var apeidRowid = base.poHeaderDrillDownRecord.apeidRowid;
   self.title = MessageService.get('po.number') + ': ' + poNo + '-' + Utils.pad(poSuf, 2);
   self.proofTitle = MessageService.get('global.proof.for.po') + ':' + poNo + '-' + Utils.pad(poSuf, 2);

   self.invoiceTotals = {
      glproof: 0,
      glproofstring: '',
      poproof: 0,
      poproofstring: ''
   };
   if (base.poHeaderDrillDownRecord) {
      self.poLineRecord.pono = base.poHeaderDrillDownRecord.pono;
      self.poLineRecord.posuf = base.poHeaderDrillDownRecord.posuf;
      self.poLineRecord.apeidRowid = base.poHeaderDrillDownRecord.apeidRowid;
      self.manualAllocationList = [];
      DataService.post('api/ap/asapentry/apeiinvdetpolinechgretrieve', { data: { apeiinvdetpoln: base.poHeaderDrillDownRecord, apeiinvdetpolnlist: self.poLineRecord, lChangeMode: true }, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvdetpoln) {
               self.poLineRecord = data.apeiinvdetpoln;
               // All PO Lines will have same Tied PO Ship Date
               self.bannerRecord.podoshipdt = self.poLineRecord.podoshipdt;
            }
            if (data.apeiinvdetpolnproof) {
               self.poLineProof = data.apeiinvdetpolnproof;
            }
            self.poNumberString = self.poLineRecord.pono + '-' + Utils.pad(self.poLineRecord.posuf, 2);
            self.displaypoLineProofs();
         }
      });
   }
   self.populatePOLinesList = function () {
      var criteria = {
         rwid: apeidRowid
      };

      DataService.post('api/ap/asapentry/apeiinvdetpolinelist', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.poLineList = data;
            self.displayProofTotals();
         }
      });
   };

   self.displayInvoiceTotals = function () {
      self.invoiceTotals.glproofstring = Locale.formatNumber(self.invoiceTotals.glproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.invoiceTotals.poproofstring = Locale.formatNumber(self.invoiceTotals.poproof, { style: 'decimal', maximumFractionDigits: 2 });
   };

   self.displayProofTotals = function () {
      DataService.post('api/ap/asapentry/apeiinvdetbanner', { data: self.bannerRecord, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvoicetotals) {
               self.invoiceTotals.glproof = data.apeiinvoicetotals.glproof;
               self.invoiceTotals.poproof = data.apeiinvoicetotals.poproof;
               self.displayInvoiceTotals();
            }
         }
      });
   };

   self.delete = function () {
      var records = GridService.getSelectedRecords(self.poLineListGrid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var linesToDelete = [];

            records.forEach(function (record) {
               linesToDelete.push(
               {
                  rwid: record.apeidRowid
               });
            });

            DataService.post('api/ap/asapentry/apeiinvdetpolinedelete', { data: linesToDelete, busy: true }, function () {
               self.populatePOLinesList();
            });
         }
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(self.poLineListGrid);
      if (record) {
         base.poLineItemEdit = record;
         base.poLineItemEditBannerRecord = self.bannerRecord;
         $state.go('apece.drilldown.poheaderlineitemsdetail');
      }
   };

   self.unCostPOLine = function () {
      var records = GridService.getSelectedRecords(self.poLineListGrid);
      if (records && records.length) {
         var invoicesToUpdate = [];

         records.forEach(function (record) {
            invoicesToUpdate.push(record);
         });

         DataService.post('api/ap/asapentry/apeiinvdetpolineuncost', { data: invoicesToUpdate, busy: true }, function (data) {
            if (data) {
               var len = data.length;
               records = GridService.getSelectedRecords(self.poLineListGrid);
               records.forEach(function (record) {

                  for (var i = 0; i < len; i++) {
                     if (data[i].apeidRowid === record.apeidRowid) {
                        record.qtyord = data[i].qtyord;
                        record.cost = data[i].cost;
                     }
                  }
                  var indx = self.poLineList.indexOf(record);
                  self.poLineListGrid.updateRow(indx);
               });
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               self.displayProofTotals();
            }
         });
      }
   };

   // First time in here
   if (self.bannerRecord) {
      self.populatePOLinesList();
   }

   self.drilldownLineItem = function (e, args) {
      var drilldownRow = args[0].item;
      if (drilldownRow) {
         self.launchItemQuickView(drilldownRow);
      }
   };

   self.launchItemQuickView = function (selectedRow) {
      if (base.isIonEdi810InLive === 'yes') {
         if (selectedRow && selectedRow.serialfl) {
            $state.go('apece.drilldown.poheaderlineitemsdetaillinequickview', { lineItemsDrillDownRecord: selectedRow });
         }
         else {
            MessageService.error('global.error', 'message.serialization.not.allowed.for.this.record');
         }
      }
      else {
         MessageService.error('global.error', 'message.serial.number.entry.not.allowed.when.ap.inbound.invoice.processing.not.activated.via.ao');
      }
   };

   self.navBack = function () {
      if (self.drldwn) {
         self.drldwn.redisplayProofTotals();
      }
      $state.go('^');
   };
});

app.controller('ApeceDrillDownPOHeaderLineItemsDetail', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;
   self.poLineItemEdit = base.poLineItemEdit;
   self.poLineItemEditBannerRecord = base.poLineItemEditBannerRecord;

   self.poLineEditRecord = {
      groupnm: '',
      createddt: '',
      groupseqno: 0,
      detailseqno: 0,
      addonapplyty: '',
      addonfrompoln: 0,
      addonpolnlist: '',
      addonseqno: 0,
      addontopoln: 0,
      apinvno: '',
      bundleid: '',
      closefl: false,
      cNextSuf: '',
      cNextSufNetAmt: '',
      cNextSufQtyRcv: '',
      cNonStockTy: '',
      compseqno: 0,
      cost: 0,
      costord: 0,
      costrcv: 0,
      cOtherSufNetAmt: '',
      cOtherSufQtyRcv: '',
      cPOELQtyCosted: '',
      cPOELQtyRcv: '',
      cPONotesFl: '',
      detailty: '',
      dManualAddon: 0,
      dPoelExtended: 0,
      dPOELNetRcv: 0,
      dPoelQtyOrd: 0,
      eachfl: false,
      invunit: '',
      lineno: 0,
      operinit: '',
      polnseqno: 0,
      pono: 0,
      posuf: 0,
      pounit: '',
      proctype: '',
      proddesc: '',
      proddesc2: '',
      qtyord: 0,
      qtyrcv: 0,
      receiverno: '',
      reconoverfl: false,
      shipprod: '',
      statustype: false,
      unitconv: 0,
      updatefl: false,
      vendno: 0,
      vendprod: '',
      whse: '',
      closeflenabled: false,
      costenabled: false,
      costordenabled: false,
      linenoenabled: false,
      manualaddonenabled: false,
      perunitenabled: false,
      ponoenabled: false,
      posufenabled: false,
      proddescenabled: false,
      proddesc2enabled: false,
      qtyordenabled: false,
      reconoverflenabled: false,
      shipprodenabled: false,
      tallyenabled: false,
      vendprodenabled: false,
      perunithidden: false,
      tallyhidden: false,
      origcost: 0,
      origlineno: 0,
      origpono: 0,
      origposuf: 0,
      origqtyord: 0,
      origprod: '',
      apeidRowid: 0
   };

   self.poLineProof = {
      pono: 0,
      posuf: 0,
      proofTitle: '',
      pototinvamt: 0,
      pototinvamtstring: '',
      pototqtyord: 0,
      pototqtyordstring: '',
      uncostamt: 0,
      uncostamtstring: '',
      uncostqty: 0,
      uncostqtystring: '',
      invproof: 0,
      invproofstring: '',
      addonproof: 0,
      addonproofstring: '',
      addonamt: 0,
      addonamtstring: ''
   };
   self.poLineTally = [];
   self.manualAllocationList = [];

   self.proofTitleQuantity = MessageService.get('global.quantity');
   self.proofTitleAmount = MessageService.get('global.amount');
   self.poNumberString = '';
   self.manualAllocationGridVisible = false;

   self.isManualAllocationButtonEnabled = function () {
      var retn = false;
      if (self.manualAllocationGridVisible) {
         retn = false;
      }
      else if (self.poLineEditRecord) {
         retn = self.poLineEditRecord.manualaddonenabled;
      }
      return retn;
   };

   self.displaypoLineProofs = function () {
      self.poLineProof.pototinvamtstring = Locale.formatNumber(self.poLineProof.pototinvamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.pototqtyordstring = Locale.formatNumber(self.poLineProof.pototqtyord, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.uncostamtstring = Locale.formatNumber(self.poLineProof.uncostamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.uncostqtystring = Locale.formatNumber(self.poLineProof.uncostqty, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.invproofstring = Locale.formatNumber(self.poLineProof.invproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.addonproofstring = Locale.formatNumber(self.poLineProof.addonproof, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.addonamtstring = Locale.formatNumber(self.poLineProof.addonamt, { style: 'decimal', maximumFractionDigits: 2 });
      self.poLineProof.proofTitle = MessageService.get('global.proof.for.po') + ':' + self.poLineProof.pono + '-' + Utils.pad(self.poLineProof.posuf, 2);
   };

   self.fieldChanged = function (fieldName) {
      DataService.post('api/ap/asapentry/apeiinvdetpolinefieldchange', { data: { apeiinvdetpolntally: self.poLineTally, apeiinvdetpoln: self.poLineEditRecord, cFieldNm: fieldName }, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvdetpoln) {
               self.poLineEditRecord = data.apeiinvdetpoln;
            }
            self.poLineTally = [];
            if (data.apeiinvdetpolntally) {
               self.poLineTally = data.apeiinvdetpolntally;
            }
         }
      });
   };

   self.manualAllocation = function () {
      self.manualAllocationGridVisible = true;
      DataService.post('api/ap/asapentry/apeiinvdetpolineloadmanaddon', { data: self.poLineEditRecord, busy: true }, function (data) {
         if (data) {
            self.manualAllocationList = data;
         }
      });
   };

   self.onCellChange = function (e, args) {
      var record = self.manualAllocationList[args.row];
      if (record) {
         DataService.post('api/ap/asapentry/apeiinvdetpolinechgmanaddon', { data: record, busy: true }, function (data) {
            if (data) {

               var len = self.manualAllocationList.length;
               for (var i = 0; i < len; i++) {
                  if (self.manualAllocationList[i].addonno === record.addonno) {

                     self.manualAllocationList[i].totallocamt = data.totallocamt;
                     self.manualAllocationList[i].addonproof = data.addonproof;
                     self.manualAllocationList[i].origlnaddamt = data.origlnaddamt;
                     var indx = self.manualAllocationList.indexOf(record);
                     self.manualAllocationListGrid.updateRow(indx);
                  }
               }
            }
         });
      }
   };

   self.submit = function () {
      DataService.post('api/ap/asapentry/apeiinvdetpolinechgupdate', { data: { apeiinvdetpolnmanadd: self.manualAllocationList, apeiinvdetpolntally: self.poLineTally, apeiinvdetpoln: self.poLineEditRecord }, busy: true }, function (data) {
         if (data) {

            if (data.apeiinvdetpolnproof) {
               self.poLineProof = data.apeiinvdetpolnproof;
               self.displaypoLineProofs();
            }
              
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('apece.drilldown.poheaderlineitems');
         }
      });
   };

   self.exit = function () {
      $state.go('apece.drilldown.poheaderlineitems');
   };

   // First time in here
   if (self.poLineItemEdit) {

      self.poLineEditRecord.groupnm = self.poLineItemEditBannerRecord.groupnm;
      self.poLineEditRecord.createddt = self.poLineItemEditBannerRecord.createddt;
      self.poLineEditRecord.groupseqno = self.poLineItemEditBannerRecord.groupseqno;
      self.poLineEditRecord.detailseqno = 0;
      self.poLineEditRecord.apeidRowid = self.poLineItemEdit.apeidRowid;
      self.manualAllocationList = [];
      DataService.post('api/ap/asapentry/apeiinvdetpolinechgretrieve', { data: { apeiinvdetpoln: self.poLineItemEdit, apeiinvdetpolnlist: self.poLineEditRecord, lChangeMode: true }, busy: true }, function (data) {
         if (data) {
            if (data.apeiinvdetpoln) {
               self.poLineEditRecord = data.apeiinvdetpoln;
            }
            if (data.apeiinvdetpolnproof) {
               self.poLineProof = data.apeiinvdetpolnproof;
            }
            self.poLineTally = [];
            if (data.apeiinvdetpolntally) {
               self.poLineTally = data.apeiinvdetpolntally;
            }

            self.poNumberString = self.poLineEditRecord.pono + '-' + Utils.pad(self.poLineEditRecord.posuf, 2);
            self.displaypoLineProofs();
         }
      });
   }
});

app.controller('ApeceDrillDownLineItemsDetailQuickView', function ($scope, $state, $stateParams, $translate, AuthService, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;
   self.bannerRecord = self.drldwn.bannerRecord;
   self.selectedRecord = $stateParams.lineItemsDrillDownRecord;
   self.title = MessageService.get('global.purchase.order.number') + ': ' + self.selectedRecord.pono + '-' + Utils.pad(self.selectedRecord.posuf, 2) + ' '
                + $translate.instant('global.line.number') + self.selectedRecord.lineno;

   self.back = function () {
      $state.go('apece.drilldown.poheaderlineitems');
   };

   //We can only make the call to render the Serial data after the Control is ready thru the framework.
   //This gets called from the framework after that completes.
   self.serialControlReady = function () {
      self.initializeSerials();
   };

   self.createIcEntrySerialsCriteria = function (resp) {
      if (resp && resp.apeceserialviewresult.length) {
         var criteria = {
            btncreateenabled: true,
            apeiRowid: self.bannerRecord.apeiRowid,
            currproc: base.OURPROC,
            icspecrecno: resp.apeceserialviewresult[0].icspecrecno,
            lineno: resp.apeceserialviewresult[0].lineno,
            prod: resp.apeceserialviewresult[0].prod,
            orderno: resp.apeceserialviewresult[0].orderno,
            ordersuf: resp.apeceserialviewresult[0].ordersuf,
            origqty: resp.apeceserialviewresult[0].invqty,
            ordqty: resp.apeceserialviewresult[0].ordqty,
            ourproc: base.OURPROC,
            proddesc: resp.apeceserialviewresult[0].proddesc,
            proofqty: resp.apeceserialviewresult[0].proofqty,
            seqno: resp.apeceserialviewresult[0].seqno,
            seqnochar: '000',
            type: base.MODULE_AP,
            whse: resp.apeceserialviewresult[0].whse
         };

         return criteria;
      }
   };

   self.createIcEntrySerialsList = function (resp) {
      if (resp && resp.apeceserialresult) {
         var serialList = [];
         resp.apeceserialresult.forEach(function (record) {
            var criteria = {
               rRecID: record.apeisRecid,
               lSelected: true,
               cComment: record.cComment,
               cSerialNo: record.cSerialNo
            };
            serialList.push(criteria);
         });
         return serialList;
      }
   };

   self.initializeSerials = function () {

      var apeceserialviewcriteria = {
         apeidRowid: self.selectedRecord.apeidRowid,
         pono: self.selectedRecord.pono,
         posuf: self.selectedRecord.posuf,
         lineno: self.selectedRecord.lineno,
         qtyord: self.selectedRecord.qtyord
      };

      DataService.post('api/ap/asapentry/apeceserialview', { data: apeceserialviewcriteria, busy: true }, function (data) {
         if (data) {
            self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(data);
            self.icEntrySerialsList = self.createIcEntrySerialsList(data);

            var criteria = {
               icentryserialslist: self.icEntrySerialsList,
               icentryserialscriteria: self.icEntrySerialsCriteria
            };

            //This is a key piece to this. Sending the Criteria to the Serial Control so it can render the data.
            self.serialControl.initialize(criteria);
            self.serialControl.apeidRowid = self.selectedRecord.apeidRowid;
         }
      });
   };

   //This gets called from the Serial Control when Save is performed.
   self.serialDoneCallback = function (adjustQtyShipFl, adjustQtyShipAmt) {
      //Nothing is required here.
   };

   self.isDetailLineQuickView = function () {
      return $state.is('apece.drilldown.poheaderlineitemsdetaillinequickview');
   };
});

app.controller('ApeceDrillDownManualPaymentsDetail', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.detailTitle = MessageService.get('global.manual.payments');

   if (self.drldwn.manualPaymentsAddMode) {
      self.detailTitle = self.detailTitle + ' - ' + MessageService.get('global.create');
   } else {
      self.detailTitle = self.detailTitle + ' - ' + MessageService.get('global.update');
   }

   self.manualAddressRecord = {
      groupnm: '',
      createddt: '',
      groupseqno: 0,
      apeiRowid: 0,
      apinvno: '',
      apinvnoenabledfl: false,
      invseqno: 0,
      paidseqno: 0,
      paidseqnoenabledfl: false,
      amount: 0,
      amountenabledfl: false,
      origdisc: 0,
      origdiscenabledfl: false,
      paidinvamt: 0,
      paiddisc: 0
   };

   // first time in
   if (self.drldwn) {
      self.manualAddressRecord.groupnm = self.drldwn.bannerRecord.groupnm;
      self.manualAddressRecord.createddt = self.drldwn.bannerRecord.createddt;
      self.manualAddressRecord.groupseqno = self.drldwn.bannerRecord.groupseqno;
      if (self.drldwn.manualPaymentsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdetmanpayappliedaddprep', { data: self.manualAddressRecord, busy: true }, function (data) {
            if (data) {
               self.manualAddressRecord = data;
            }
         });
      } else {
         // Change mode
         self.manualAddressRecord.apeiRowid = base.generalPurposeROWID;
         DataService.post('api/ap/asapentry/apeiinvdetmanpayappliedchgretr', { data: { apeiinvdetmanpyappinv: self.manualAddressRecord, lChangeMode: true }, busy: true }, function (data) {
            if (data) {
               self.manualAddressRecord = data;
            }
         });
      }
   }

   self.submit = function () {
      if (self.drldwn.manualPaymentsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdetmanpayappliedaddupdt', { data: self.manualAddressRecord, busy: true }, function (data) {
            if (data) {
               self.drldwn.populateManualPaymentsAppliedList();
               $state.go('^');
            }
         });
      } else {
         // Change mode
         DataService.post('api/ap/asapentry/apeiinvdetmanpayappliedchgupdt', { data: self.manualAddressRecord, busy: true }, function (data) {
            if (data) {
               self.drldwn.populateManualPaymentsAppliedList();
               $state.go('^');
            }
         });
      }
   };
});

app.controller('ApeceDrillDownApplyCreditsDetail', function ($scope, $state, $stateParams, AuthService, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.applyCreditsdetailTitle = MessageService.get('global.invoice');

   if (self.drldwn.applyCreditsAddMode) {
      self.applyCreditsdetailTitle = self.applyCreditsdetailTitle + ' - ' + MessageService.get('global.create');
   } else {
      self.applyCreditsdetailTitle = self.applyCreditsdetailTitle + ' - ' + MessageService.get('global.update');
   }

   self.applyCreditsRecord = {
      groupnm: '',
      createddt: '',
      groupseqno: 0,
      apeiRowid: 0,
      duedt: '',
      disputefl: false,
      appinvno: '',
      invseqno: 0,
      appseqno: 0,
      appseqnoenabledfl: false,
      amount: 0,
      amountenabledfl: false
   };

   // first time in
   if (self.drldwn) {
      self.applyCreditsRecord.groupnm = self.drldwn.bannerRecord.groupnm;
      self.applyCreditsRecord.createddt = self.drldwn.bannerRecord.createddt;
      self.applyCreditsRecord.groupseqno = self.drldwn.bannerRecord.groupseqno;
      if (self.drldwn.applyCreditsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdetcreditmemoappliedaddprep', { data: self.applyCreditsRecord, busy: true }, function (data) {
            if (data) {
               self.applyCreditsRecord = data;
            }
         });
      } else {
         // Change mode
         self.applyCreditsRecord.apeiRowid = base.generalPurposeROWID;
         DataService.post('api/ap/asapentry/apeiinvdetcreditmemoappliedchgretr', { data: { apeiinvdetcmappinv: self.applyCreditsRecord, lChangeMode: true }, busy: true }, function (data) {
            if (data) {
               self.applyCreditsRecord = data;
            }
         });
      }
   }

   self.submit = function () {
      if (self.drldwn.applyCreditsAddMode) {
         // Add mode
         DataService.post('api/ap/asapentry/apeiinvdetcreditmemoappliedaddupdt', { data: self.applyCreditsRecord, busy: true }, function (data) {
            if (data) {
               self.drldwn.populateApplyCreditsAppliedList();
               $state.go('^');
            }
         });
      } else {
         // Change mode
         DataService.post('api/ap/asapentry/apeiinvdetcreditmemoappliedchgupdt', { data: self.applyCreditsRecord, busy: true }, function (data) {
            if (data) {
               self.drldwn.populateApplyCreditsAppliedList();
               $state.go('^');
            }
         });
      }
   };
});
