'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('pd', 'pder', {
      widgets: [
         'SEARCH',
         {
            title: 'global.quick.reconcile',
            icon: '#icon-quick-reference',
            expanded: true,
            personalize: true,
            contentClass: 'top-padding',
            jsonView: 'pd/pder/quick-reconcile.json'
         },
         'JOURNAL'
      ]
   });
   StateProvider.addMasterState('pd', 'pder');

   $stateProvider.state('pder.detail', {
      url: '/detail',

      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/detail.json');
            },
            controller: 'PderDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('pder.create', {
      url: '/create',
      params: { tempReceiptRecord: null, mode: null, isFromMaster: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/add-edit-receipt.json');
            },
            controller: 'PderTempReceiptCtrl as ptrc'
         }
      }
   });

   $stateProvider.state('pder.detail.create', {
      url: '/create',
      params: { tempReceiptRecord: null, mode: null, isFromMaster: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/add-edit-receipt.json');
            },
            controller: 'PderTempReceiptCtrl as ptrc'
         }
      }
   });

   $stateProvider.state('pder.vatanalysis', {
      url: '/vat',
      params: { tempReceiptRecord: null, mode: null, isFromMaster: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/vat-analysis.json');
            },
            controller: 'PderReceiptVatCtrl as prvc'
         }
      }
   });

   $stateProvider.state('pder.edit', {
      url: '/edit',
      params: { tempReceiptRecord: null, mode: null, isFromMaster: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/add-edit-receipt.json');
            },
            controller: 'PderTempReceiptCtrl as ptrc'
         }
      }
   });

   $stateProvider.state('pder.master.finalupdate', {
      url: '/final-update',
      params: { rebateReconciliationModel: null, selectedUpdateMode: false },
      views: {
         finalUpdate: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/final-update.json');
            },
            controller: 'PderFinalUpdateCtrl as fudc'
         }
      }
   });

   $stateProvider.state('pder.master.gldistribution', {
      url: '/gl-distribution',
      views: {
         glDistributionView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/gl-distributions.json');
            },
            controller: 'PderGLDistributionCtrl as gldc'
         }
      }
   });

   $stateProvider.state('pder.master.gldistribution.details', {
      url: '/detail',
      params: { selectedRecord: null, isAddMode: null, detailOkCallback: null },
      views: {
         glDistributionDetailView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/gl-distribution-detail.json');
            },
            controller: 'PderGLDistributionDetailCtrl as glda'
         }
      }
   });

   $stateProvider.state('pder.detail.finalupdate', {
      url: '/final-update',
      params: { rebateReconciliationModel: null, selectedUpdateMode: false },
      views: {
         finalUpdate: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/final-update.json');
            },
            controller: 'PderFinalUpdateCtrl as fudc'
         }
      }
   });

   $stateProvider.state('pder.detail.gldistribution', {
      url: '/gl-distribution',
      views: {
         glDistributionView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/gl-distributions.json');
            },
            controller: 'PderGLDistributionCtrl as gldc'
         }
      }
   });

   $stateProvider.state('pder.detail.gldistribution.details', {
      url: '/detail',
      params: { selectedRecord: null, isAddMode: null, detailOkCallback: null },
      views: {
         glDistributionDetailView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pder/gl-distribution-detail.json');
            },
            controller: 'PderGLDistributionDetailCtrl as glda'
         }
      }
   });
});

app.controller('PderBaseCtrl', function ($state, AodataService, DataService, Utils, MessageService) {
   var self = this;
   self.DOCUMENT_DELIMITER = '-';
   self.criteria = {};
   self.criteria.rebateType = 'B';
   self.criteria.receiptType = 'C';
   self.criteria.receiptDateStart = '';
   self.accountType = 'C';
   self.disableAccountType = true;
   self.qucikClaimNo = 0;
   self.selectedClaimDetails = {};
   self.security = 0;
   self.isPDERUpdate = false;
   self.finalUpdateMessage = '';
   self.isVendorReceipt = true;
   self.pderFinalEditResults = {};
   self.gletaList = [];
   self.gletaHeader = {};
   self.detailsRecord = {};
   self.reconExRateUpdateFl = false;

   // Capture the string of data and convert it to true or false.  If nothing is found (undefined) converts to false
   var aodataAllowForeignRebates = AodataService.getValue('PD', 'PDForeignRebateFl');
   if (aodataAllowForeignRebates) {
      if (aodataAllowForeignRebates.toLowerCase() === 'yes' || aodataAllowForeignRebates.toLowerCase() === 'y') {
         self.allowForeignRebates = true;
      } else {
         self.allowForeignRebates = false;
      }
   } else {
      self.allowForeignRebates = false;
   }

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'pder',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'pd',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('pder.master');
   };

   self.includesMaster = function () {
      return $state.includes('pder.master');
   };

   self.isDetail = function () {
      return $state.is('pder.detail');
   };

   self.includesDetail = function () {
      return $state.includes('pder.detail');
   };

   self.isJournalState = function () {
      if (self.isPDERUpdate) {
         return ($state.is('pder.master.journalOpen'));
      } else {
         return ($state.is('pder.detail.journalOpen'));
      }
   };

   self.isfinalUpdate = function () {
      if (self.isPDERUpdate) {
         return $state.is('pder.master.finalupdate');
      } else {
         return $state.is('pder.detail.finalupdate');
      }
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/pd/aspdentry/pdergetclaim', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.pdergetclaimresults;
      });
   };

   self.onReceiptTypeChange = function () {
      if (self.criteria.receiptType.toUpperCase() === 'T') {
         self.accountType = 'R';
      } else {
         self.accountType = 'C';
      }
   };

   self.claimNumberChange = function () {
      if (self.qucikClaimNo !== 0) {
         var params = {
            intclaimno: self.qucikClaimNo,
            fldlist: 'claimamt,claimdt,vendno,reconamt,rebatecd',
            exclude: true // TODO: asp - are we sure we want to exclude these fields?
         };

         DataService.getResource('api/pd/pderc/getbypk', { params: params, busy: true }, function (data) {
            self.selectedClaimDetails = data;
         });
      } else {
         self.selectedClaimDetails.claimamt = 0;
         self.selectedClaimDetails.claimdt = null;
         self.selectedClaimDetails.vendno = 0;
         self.selectedClaimDetails.reconamt = 0;
         self.selectedClaimDetails.rebatecd = '';
      }
   };

   self.navigateToDetails = function (claimno, vendno, rebatecd, tab) {
      var pderlockClaimCriteria = {
         claimno: claimno,
         vendno: vendno,
         secure: self.security
      };
      DataService.post('api/pd/aspdentry/pderlockclaim', { data: pderlockClaimCriteria, busy: true }, function () {
         if (self.isVendorReceipt) {
            self.detailsRecord = {
               claimno: claimno,
               vendno: vendno,
               rebatecd: rebatecd,
               receipttype: 'C',
               receiptDate: self.criteria.receiptDateStart,
               jrnlno: (self.journal) ? self.journal.gJrnlno : 0,
               secure: self.security,
               tab: tab
            };
            $state.go('^.detail');
         }
      });
   };

   self.details = function () {
      if (self.qucikClaimNo !== 0) {
         self.navigateToDetails(self.qucikClaimNo, self.selectedClaimDetails.vendno, self.selectedClaimDetails.rebatecd, 0);
      }
   };

   self.pderFinalUpdate = function (selectedRecord) {
      var pderfinalupdate =
      {
         claimno: selectedRecord.claimno,
         vendno: selectedRecord.vendno,
         secure: self.security,
         jrnlno: self.journal.gJrnlno,
         currencyty: self.pderFinalEditResults.currencyty,
         curerncytyhidden: self.pderFinalEditResults.currencytyhidden,
         currencytyenabled: self.pderFinalEditResults.currencytyenabled,
         reconexrate: self.pderFinalEditResults.reconexrate,
         reconexrateenabled: self.pderFinalEditResults.reconexrateenabled,
         reconexrateupdatefl: self.reconExRateUpdateFl
      };
      var gletaList = [];
      if (self.gletaList !== undefined && self.gletaList !== null && self.gletaList.length > 0) {
         self.gletaList.forEach(function (gletaRecord) {
            var updateGlet = {
               iseqno: 0,
               ctype: '',
               caccount: gletaRecord.caccount,
               damount: gletaRecord.damount,
               dcuramount: 0,
               cname: '',
               clookup: ''
            };
            gletaList.push(updateGlet);
         });
      } else {
         var gleta = {
            iseqno: 0,
            ctype: '',
            caccount: '',
            damount: 0,
            dcuramount: 0,
            cname: '',
            clookup: ''
         };
         gletaList.push(gleta);
      }

      var gletaHeader = {
         currproc: 'PDER',
         proof: (self.gletaHeader !== undefined && self.gletaHeader !== null) ? self.gletaHeader.proof : 0,
         dorigdistamt: 0,
         glyear: 0,
         ddiscglar: 0,
         ddiscglap: 0,
         posttype: 0,
         posttype2: 0,
         iAdjGLDivNo: 0,
         iAdjGLDeptNo: 0,
         iAdjGLAcctNo: 0,
         iAdjGLSubNo: 0,
         dExContAmt: 0,
         iDiscDiv: 0,
         iDiscDept: 0,
         iDiscAcct: 0,
         iDiscSub: 0,
         dInvFRate: 0,
         dvendtaxamt: 0
      };
      var finalUpdateRequest = { gleta: gletaList, gletaheader: gletaHeader, pderfinalupdate: pderfinalupdate };
      DataService.post('api/pd/aspdentry/pderfinalupdate', { data: finalUpdateRequest, busy: true }, function () {
         if (self.journal.gJrnlno !== 0) {
            self.closeJournal();
         }
         self.finalUpdateMessage += MessageService.get('global.claim.number') + selectedRecord.claimno +
            MessageService.get('message.final.update.process.has.been.completed') + '<br>';
         if (self.isPDERUpdate) {
            self.finalUpdate();
         } else {
            self.showFinalUpdateProcessMessage();
         }
      });
   };

   self.closeJournal = function () {
      self.journalControl.closeJournal();
   };

   self.finalUpdate = function () {
      if (self.fineUpdateRecords && self.fineUpdateRecords.length > 0) {
         self.gletaList = [];
         self.gletaHeader = {};
         var selectedRecord = JSLINQ(self.fineUpdateRecords).FirstOrDefault();
         if (selectedRecord.claimno !== null && selectedRecord.claimno !== 0) {
            self.rebateReconciliationModel = {
               claimno: selectedRecord.claimno,
               vendno: selectedRecord.vendno,
               rebatecd: selectedRecord.rebatecd,
               receiptType: self.isVendorReceipt ? 'C' : 'T',
               secure: self.security,
               isPDERUpdate: self.isPDERUpdate
            };
            self.fineUpdateRecord = selectedRecord;
            $state.go('pder.master.finalupdate', { rebateReconciliationModel: self.rebateReconciliationModel, selectedUpdateMode: false });
            self.fineUpdateRecords.splice(0, 1);
         } else {
            self.finalUpdateMessage = self.finalUpdateMessage + MessageService.get('global.claim.number') + selectedRecord.claimno +
               MessageService.get('global.sequence.number') + selectedRecord.claimseqno + MessageService.get('error.update.processing.not.done.for.temporary.receipts.') + '<br>';
            self.fineUpdateRecords.splice(0, 1);
            self.finalUpdate();
         }
         if (!self.isVendorReceipt) {
            self.showFinalUpdateProcessMessage();
         }
      } else {
         self.showFinalUpdateProcessMessage();
      }
   };

   self.showFinalUpdateProcessMessage = function () {
      if (self.finalUpdateMessage) {
         MessageService.info('global.information', self.finalUpdateMessage);
         self.finalUpdateMessage = '';
      }
      self.pderUnlock();
      self.selectedClaimDetails = {};
      self.qucikClaimNo = 0;
      $state.go('pder.master', { refreshSearch: true }, { reload: 'pder.master' });
   };

   self.pderUnlock = function () {
      if (self.fineUpdateRecord) {
         var lockClaim = { claimno: self.fineUpdateRecord.claimno, vendno: self.fineUpdateRecord.vendno, secure: self.security };
         DataService.post('api/pd/aspdentry/pderunlockclaim', { data: lockClaim, busy: true });
      }
   };
});

app.controller('PderSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.rebateType = 'B';
      base.criteria.receiptType = 'C';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      base.isVendorReceipt = (base.criteria.receiptType.toUpperCase() !== 'T');
      if (!base.isMaster()) {
         $state.go('pder.master');
      }
      base.search();
   };
});

app.controller('PderMasterCtrl', function ($scope, $state, $stateParams, DataService, SecurityService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.isShowVendorRcpts = 'false';
   var MENU_FUNCTION_PDER = 'pder';
   self.finalUpdateMessage = '';
   base.isPDERUpdate = true;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.securityLevel = SecurityService.getSecurityLevel(MENU_FUNCTION_PDER);
   base.security = self.securityLevel;

   self.loadDefaultUpdate = function () {
      var sharedPVRegisteryList = [];
      sharedPVRegisteryList.push({ pvfunction: 'pd', pvsection: 'pder', pvsubsection: '', pvobject: '', pvkeyname: 'updatetype' });

      DataService.post('api/shared/assharedentry/sharedpvregistryload', { data: sharedPVRegisteryList, busy: true }, function (data) {
         if (data) {
            var sharedResult = JSLINQ(data).FirstOrDefault();
            if (sharedResult) {
               self.isShowVendorRcpts = (sharedResult.pvcharvalue === 'hdr-error') ? 'true' : 'false';
               base.defaultTab = (sharedResult.pvcharvalue === 'hdr-error') ? 0 : 1;
            }
         }
      });
   };

   self.onDefaultUpdateSelection = function () {
      var sharedPVRegisteryList = [];
      sharedPVRegisteryList.push({
         pvfunction: 'pd',
         pvsection: 'pder',
         pvsubsection: '',
         pvobject: '',
         pvkeyname: 'updatetype',
         pvcharvalue: (self.isShowVendorRcpts === 'true') ? 'hdr-error' : 'lines-*'
      });

      DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: sharedPVRegisteryList, busy: true });

      base.defaultTab = (self.isShowVendorRcpts === 'true') ? 0 : 1;

   };

   self.disableNewButton = function () {
      if (base.isVendorReceipt) {
         return true;
      } else {
         return base.grid.isAnyRowSelected();
      }
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      var tab = self.isShowVendorRcpts === 'true' ? 0 : 1;
      base.fineUpdateRecord = selectedRecord;
      base.navigateToDetails(selectedRecord.claimno, selectedRecord.vendno, selectedRecord.rebatecd, tab);
   };

   self.create = function () {
      var tempReceiptRecord = {
         pderGetClaimResults: null,
         secure: self.securityLevel,
         receiptType: base.isVendorReceipt ? 'C' : 'T',
         claimNo: base.criteria.claimNo,
         vendno: base.criteria.vendno,
         receiptDate: base.criteria.receiptDateStart,
         rebatecd: ''
      };
      $state.go('^.create', { tempReceiptRecord: tempReceiptRecord, mode: 'add', isFromMaster: true });
   };

   self.edit = function () {
      if (base.grid.isOneRowSelected()) {
         var selectedRecord = GridService.getSelectedRecord(base.grid);
         var tempReceiptRecord = {
            pderGetClaimResults: selectedRecord,
            secure: self.securityLevel,
            receiptType: selectedRecord.recordtype,
            claimNo: 0,
            vendno: 0,
            receiptDate: null,
            rebatecd: ''
         };
         $state.go('^.edit', { tempReceiptRecord: tempReceiptRecord, mode: 'edit', isFromMaster: true });
      }
   };

   self.loadDefaultUpdate();

   self.finalUpdate = function () {
      base.finalUpdateMessage = '';
      base.isPDERUpdate = true;
      MessageService.yesNo('global.confirmation', 'global.continue.with.final.update',
      function () {
         // Yes processing
         base.fineUpdateRecords = GridService.getSelectedRecords(base.grid);
         base.finalUpdate();
      }, null);
   };

   self.deleteRecords = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete',
      function () {
         // Yes processing
         var selectedRecords = GridService.getSelectedRecords(base.grid);
         var deleteCriteria = {
            pdergetclaimresults: selectedRecords,
            pdergetclaimcriteria: base.criteria
         };
         DataService.post('api/pd/aspdentry/pderdeltemprcpt', { data: deleteCriteria, busy: true }, function (data) {
            base.search();
         });
      }, null);
   };
});

app.controller('PderDetailCtrl', function ($scope, $state, $stateParams, $translate, AodataService, DataService, MessageService, GridService, TabService, SecurityService) {
   var self = this;
   var base = $scope.base;
   base.isPDERUpdate = false;
   self.pderGetItemCriteria = {};
   self.selectedStatusTypes = ['p', 'u', 'd'];
   self.vendInactiveRecords = [];
   self.vendActiveRecords = [];
   self.vendUpdateRecords = [];
   self.itemPrintedRecords = [];
   self.itemDisputedRecords = [];
   self.itemUpdatedRecords = [];
   self.itemReconciledRecords = [];
   self.rebateCode = '';
   self.taxInterfaceType = AodataService.getValue('TAX', 'taxinterfacety').toLowerCase();
   self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty').toLowerCase();

   self.isVendorTabReadonly = SecurityService.getSubSecurityLevel('pder', 'Vendor Rcpts') < 3;
   self.isLineTabReadonly = SecurityService.getSubSecurityLevel('pder', 'Line Recon') < 3;

   self.getBannerDetails = function () {
      var getClaimCriteria = {
         claimNo: base.detailsRecord.claimno,
         vendno: base.detailsRecord.vendno,
         receiptType: base.detailsRecord.receipttype,
         rebateType: base.detailsRecord.rebatecd,
         receiptDateStart: null,
         receiptDateEnd: null,
         claimDateStart: null,
         claimDateEnd: null,
         includeInActive: false,
         custno: 0,
         apInvoiceNo: null,
         secure: base.detailsRecord.secure,
         recordcountlimit: null
      };
      DataService.post('api/pd/aspdentry/pdergetclaim', { data: getClaimCriteria, busy: true }, function (data) {
         self.pderGetClaimResults = JSLINQ(data.pdergetclaimresults).FirstOrDefault();
         if (self.pderGetClaimResults) {
            if (self.pderGetClaimResults.rebatecd) {
               self.setRebateType(self.pderGetClaimResults.rebatecd);
            }
            self.subtitle = MessageService.get('global.claim.number') + self.pderGetClaimResults.claimno + ' | ' + MessageService.get('global.vendor.number') +
              self.pderGetClaimResults.vendno;
         }
      });

      var getClaimTotalCriteria = { claimno: base.detailsRecord.claimno };
      DataService.post('api/pd/aspdentry/pderclaimtotal', { data: getClaimTotalCriteria, busy: true }, function (result) {
         self.pderClaimTotalResults = JSLINQ(result).FirstOrDefault();
      });
   };

   self.setRebateType = function (rebatecd) {
      if (rebatecd) {
         switch (rebatecd.toUpperCase()) { //ignore jslint - correct indentation
            case 'B': //ignore jslint - correct indentation
               self.rebateCode = MessageService.get('global.both'); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'P': //ignore jslint - correct indentation
               self.rebateCode = MessageService.get('global.purchase'); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'S': //ignore jslint - correct indentation
               self.rebateCode = MessageService.get('global.sales'); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'T': //ignore jslint - correct indentation
               self.rebateCode = MessageService.get('global.temporary.receipts'); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               self.rebateCode = ''; //ignore jslint - correct indentation
         }
      }
   };

   self.vendorStatusFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toLowerCase()) { //ignore jslint - correct indentation
            case 'i': //ignore jslint - correct indentation
               return $translate.instant('global.inactive'); //ignore jslint - correct indentation
            case 'a': //ignore jslint - correct indentation
               return $translate.instant('global.active'); //ignore jslint - correct indentation
            case 'u': //ignore jslint - correct indentation
               return $translate.instant('global.update'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         return value;
      }
   };

   self.lineReconcileStatusFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toLowerCase()) { //ignore jslint - correct indentation
            case 'p': //ignore jslint - correct indentation
               return $translate.instant('global.printed'); //ignore jslint - correct indentation
            case 'd': //ignore jslint - correct indentation
               return $translate.instant('global.disputed'); //ignore jslint - correct indentation
            case 'u': //ignore jslint - correct indentation
               return $translate.instant('global.updated'); //ignore jslint - correct indentation
            case 'r': //ignore jslint - correct indentation
               return $translate.instant('global.reconciled'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         return value;
      }
   };

   self.updateTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toLowerCase()) { //ignore jslint - correct indentation
            case 'e': //ignore jslint - correct indentation
               return $translate.instant('global.entered'); //ignore jslint - correct indentation
            case 'd': //ignore jslint - correct indentation
               return $translate.instant('global.edi'); //ignore jslint - correct indentation
            case 'i': //ignore jslint - correct indentation
               return $translate.instant('global.ion'); //ignore jslint - correct indentation
            case 'm': //ignore jslint - correct indentation
               return $translate.instant('global.manual'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      } else {
         return value;
      }
   };

   self.vendorReceiptsActivated = function () {
      self.vendInactiveRecords = [];
      self.vendActiveRecords = [];
      self.vendUpdateRecords = [];
      var getReceiptCriteria = {
         claimno: base.detailsRecord.claimno,
         vendno: base.detailsRecord.vendno,
         jrnlno: (base.detailsRecord.jrnlno !== 0) ? base.detailsRecord.jrnlno : 0,
         recordcountlimit: null,
         secure: base.detailsRecord.secure
      };
      DataService.post('api/pd/aspdentry/pdergetreceipt', { data: getReceiptCriteria, busy: true }, function (data) {
         self.pdergetreceiptresults = data.pdergetreceiptresults;
         if (self.pdergetreceiptresults && self.pdergetreceiptresults.length) {
            self.pdergetreceiptresults.forEach(function (record) {
               if (record.statustype.toLowerCase() === 'i') {
                  self.vendInactiveRecords.push({ rowidpderv: record.rowidpderv, statustype: record.statustype });
               } else if (record.statustype.toLowerCase() === 'a') {
                  self.vendActiveRecords.push({ rowidpderv: record.rowidpderv, statustype: record.statustype });
               } else if (record.statustype.toLowerCase() === 'u') {
                  self.vendUpdateRecords.push({ rowidpderv: record.rowidpderv, statustype: record.statustype });
               }
            });
         }
      });
      self.getBannerDetails();
   };

   self.lineReconcileActivated = function (isSkipFullRefreshOfGrid) {
      self.pderGetItemCriteria.claimno = base.detailsRecord.claimno;
      self.pderGetItemCriteria.rebateType = base.detailsRecord.rebatecd;
      self.pderGetItemCriteria.secure = base.detailsRecord.secure;
      //By default it will be Null or if they press search it will be false.
      self.pderGetItem(isSkipFullRefreshOfGrid);
      self.getBannerDetails();
   };

   self.filterLineReconcile = function () {
      self.pderGetItem(false);
   };

   self.pderGetItem = function (isSkipFullRefreshOfGrid) {
      self.itemPrintedRecords = [];
      self.itemDisputedRecords = [];
      self.itemUpdatedRecords = [];
      self.itemReconciledRecords = [];
      self.pderGetItemCriteria.statustype = self.selectedStatusTypes.toString();
      DataService.post('api/pd/aspdentry/pdergetitem', { data: self.pderGetItemCriteria, busy: true }, function (data) {
         if (!isSkipFullRefreshOfGrid) {
            self.pdergetitemresults = data.pdergetitemresults;
         }

         if (self.pdergetitemresults && self.pdergetitemresults.length) {
            self.pdergetitemresults.forEach(function (item) {
               if (item.statustype.toLowerCase() === 'p') {
                  self.itemPrintedRecords.push({ rowidpder: item.rowidpder, statustype: item.statustype });
               } else if (item.statustype.toLowerCase() === 'd') {
                  self.itemDisputedRecords.push({ rowidpder: item.rowidpder, statustype: item.statustype });
               } else if (item.statustype.toLowerCase() === 'u') {
                  self.itemUpdatedRecords.push({ rowidpder: item.rowidpder, statustype: item.statustype });
               } else if (item.statustype.toLowerCase() === 'r') {
                  self.itemReconciledRecords.push({ rowidpder: item.rowidpder, statustype: item.statustype });
               }
            });
         }
      });
   };

   self.addVendorReceipt = function () {
      var tempReceiptRecord = {
         pderGetClaimResults: null,
         secure: base.detailsRecord.secure,
         receiptType: 'V',
         claimNo: base.detailsRecord.claimno,
         vendno: base.detailsRecord.vendno,
         receiptDate: base.detailsRecord.receiptDate,
         rebatecd: base.detailsRecord.rebatecd
      };
      $state.go('^.create', { tempReceiptRecord: tempReceiptRecord, mode: 'add', isFromMaster: false });
   };

   self.getVatAnalysis = function (statusType, rowNum) {

      if (rowNum === -1) {
         var selectedRecord = GridService.getSelectedRecord(self.vendorGrid);
         rowNum = self.pdergetreceiptresults.indexOf(selectedRecord);
      }

      var tempReceiptRecord = {
         pderGetClaimResults: null,
         secure: base.detailsRecord.secure,
         receiptType: 'V',
         claimNo: base.detailsRecord.claimno,
         vendno: base.detailsRecord.vendno,
         receiptDate: base.detailsRecord.receiptDate,
         rebatecd: base.detailsRecord.rebatecd,
         rownumber: rowNum
      };
      $state.go('pder.vatanalysis', { tempReceiptRecord: tempReceiptRecord, mode: statusType, isFromMaster: false });
   };

   self.changeVendorReceiptStatus = function (isChangeToActiveStatus) {
      var selectedRecords = GridService.getSelectedRecords(self.vendorGrid);
      var invoiceErrorCount = 0;
      selectedRecords.forEach(function (selectedRecord) {
         if (selectedRecord.statustype.toLowerCase() !== 'i') {
            if (isChangeToActiveStatus) {
               selectedRecord.statustype = 'a';
            } else {
               if (selectedRecord.apinvno === '' || selectedRecord.apinvno === undefined) {
                  invoiceErrorCount++;
               } else {
                  selectedRecord.statustype = 'u';
               }
            }
            self.updateModifiedReceiptRecord(selectedRecord, -1);
         }
      });
      if (invoiceErrorCount > 0) {
         self.showInvoiceErrorMessage();
      }
   };

   self.glInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('glij.detail', { pk: currentRow.jrnlno });
      }
   };

   self.navigateToOrderInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         if (base.detailsRecord.rebatecd.toLowerCase() === 's') {
            $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
         } else if (base.detailsRecord.rebatecd.toLowerCase() === 'p') {
            $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
         }
      }
   };

   self.aricHyperLink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         self.navigateToAric(currentRow.custno);
      }
   };

   self.navigateToAric = function (custno) {
      if (custno !== undefined && custno !== 0) {
         $state.go('aric.detail', { pk: custno });
      }
   };

   self.navigateToPoip = function () {
      var poParts = self.pderGetItemCriteria.pono.split(base.DOCUMENT_DELIMITER);
      if (poParts.length === 2) {
         $state.go('poip.detail', { pk: parseInt(poParts[0], 10), pk2: parseInt(poParts[1], 10) });
      }
   };

   self.navigateToOeio = function () {
      var oeParts = self.pderGetItemCriteria.orderno.split(base.DOCUMENT_DELIMITER);
      if (oeParts.length === 2) {
         $state.go('oeio.detail', { pk: parseInt(oeParts[0], 10), pk2: parseInt(oeParts[1], 10) });
      }
   };

   self.showInvoiceErrorMessage = function () {
      MessageService.error('global.error', 'error.invoice.number.is.required.to.change.status.to.update');
   };

   self.updateModifiedReceiptRecord = function (modifiedRecord, modifiedRow) {
      var updateReceipt = {
         claimno: modifiedRecord.claimno,
         claimseqno: modifiedRecord.claimseqno,
         vendno: modifiedRecord.vendno,
         recordtype: modifiedRecord.recordtype,
         rowidpderv: modifiedRecord.rowidpderv,
         jrnlno: modifiedRecord.jrnlno,
         statustype: modifiedRecord.statustype,
         apinvno: modifiedRecord.apinvno,
         receiptdt: modifiedRecord.receiptdt,
         receiptamt: modifiedRecord.receiptamt,
         refer: modifiedRecord.refer,
         divno: modifiedRecord.divno,
         secure: base.detailsRecord.secure,
         vatamt: modifiedRecord.vatamt,
         nettamt: modifiedRecord.nettamt
      };
      DataService.post('api/pd/aspdentry/pderupdatereceipt', { data: updateReceipt, busy: true }, function () {
         self.vendorReceiptsActivated();
         if (modifiedRow !== -1) {
            self.getVatAnalysis('update', modifiedRow);
         }
      });
   };

   self.vendorGridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = self.pdergetreceiptresults[args.row];
         if (record) {
            if (JSLINQ(self.vendInactiveRecords).Any(function (inactiveRecord) { return inactiveRecord.rowidpderv === record.rowidpderv; })) {
               self.pdergetreceiptresults[args.row].statustype = 'i';
               var indx = self.pdergetreceiptresults.indexOf(record);
               self.vendorGrid.updateRow(indx);
               MessageService.error('global.error', 'error.this.line.is.inactive.and.can.not.be.changed.5746');
            } else {
               if (record.statustype.toLowerCase() === 'i') {
                  record.statustype = (JSLINQ(self.vendActiveRecords).Any(function (activeRecord) { return activeRecord.rowidpderv === record.rowidpderv; })) ? 'a' : 'u';
               } else {
                  if (record.statustype.toLowerCase() === 'u' && (record.apinvno === '' || record.apinvno === undefined)) {
                     record.statustype = 'a';
                     self.showInvoiceErrorMessage();
                  }
                  // If changing the receipt amount in the vendor receipts grid, need to update the VAT tax
                  if (args.column.field === 'receiptamt') {

                     // Only display the VAT Analysis screen if SASC set to system rates and VAT
                     if (self.taxInterfaceType === 's' && self.taxMethodType === 'v') {
                        self.updateModifiedReceiptRecord(record, args.row);
                     } else {
                        self.updateModifiedReceiptRecord(record, -1);
                     }
                  } else {
                     self.updateModifiedReceiptRecord(record, -1);
                  }
               }
            }
         }
      }
   };

   self.changeItemStatus = function (statusType) {
      var selectedItems = GridService.getSelectedRecords(self.lineGrid);

      selectedItems.forEach(function (selectedItem) {
         selectedItem.statustype = statusType;
         self.updateModifiedItem(selectedItem);
      });
   };

   self.updateModifiedItem = function (modifiedItem) {
      var updateItem = {
         statustype: modifiedItem.statustype,
         actstkqty: modifiedItem.actstkqty,
         rebateamt: modifiedItem.rebateamt,
         rowidpder: modifiedItem.rowidpder,
         secure: base.detailsRecord.secure
      };
      DataService.post('api/pd/aspdentry/pderupdateitem', { data: updateItem, busy: true }, function () {
         //We are simply updating.  Do not refresh the entire grid.
         var currentIndex = self.pdergetitemresults.indexOf(modifiedItem);
         self.lineGrid.updateRow(currentIndex);
         self.lineReconcileActivated(true);
      });
   };

   self.lineGridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var item = self.pdergetitemresults[args.row];
         if (item) {
            if (JSLINQ(self.itemReconciledRecords).Any(function (tempItem) { return tempItem.rowidpder === item.rowidpder; })) {
               self.pdergetitemresults[args.row].statustype = 'r';
               var indx = self.pdergetitemresults.indexOf(item);
               self.lineGrid.updateRow(indx);
               MessageService.error('global.error', 'error.this.line.is.inactive.and.can.not.be.changed.5746');
            } else {
               if (item.statustype.toLowerCase() === 'r') {
                  if (JSLINQ(self.itemPrintedRecords).Any(function (tempItem) { return tempItem.rowidpder === item.rowidpder; })) {
                     item.statustype = 'p';
                  } else if (JSLINQ(self.itemDisputedRecords).Any(function (tempItem) { return tempItem.rowidpder === item.rowidpder; })) {
                     item.statustype = 'd';
                  } else {
                     item.statustype = 'u';
                  }
               } else {
                  self.updateModifiedItem(item);
               }
            }
         }
      }
   };

   self.finalUpdate = function () {
      base.isPDERUpdate = false;
      $state.go('pder.detail.finalupdate', { rebateReconciliationModel: null, selectedUpdateMode: false });
   };

   self.back = function () {
      base.pderUnlock();
      $state.go('^.master');
   };

   TabService.canUserCloseTab('pder.detail', function () {
      base.pderUnlock();
      self.raiseCloseView();
      return true;
   });

   self.raiseCloseView = function () {
      TabService.closeTab('pder.detail');
   };
});

app.controller('PderTempReceiptCtrl', function ($scope, $state, $stateParams, DataService, MessageService, UtilsData) {
   var self = this;
   var base = $scope.base;
   self.mode = $stateParams.mode;
   self.isFromMaster = $stateParams.isFromMaster;
   self.pderInitReceiptResults = {};
   self.tempPderInitReceiptResults = {};
   self.vat = {};
   self.rebateReconciliationModel = $stateParams.tempReceiptRecord;
   self.recordType = '';
   self.vendorCurrency = '';
   self.divnoDropDownOptions = [];

   // The Division # drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getDivNoDropDown('ap', function (dropDownList) {
      self.divnoDropDownOptions = dropDownList;
   });

   if (self.mode.toLowerCase() === 'add') {
      self.title = MessageService.get('global.add.temporary.receipts');
   } else {
      self.title = MessageService.get('global.update.temporary.receipt');
   }

   self.setTempPderInitReceiptResults = function () {
      self.tempPderInitReceiptResults = angular.copy(self.pderInitReceiptResults);
   };

   self.getvendorCurrency = function () {
      if (base.allowForeignRebates) {
         var params = {
            vendno: self.pderInitReceiptResults.vendno,
            fldlist: 'currencyty'
         };
         DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.vendorCurrency = '';
               if (data.currencyty) {
                  var sastaParams = {
                     currencyty: data.currencyty,
                     fldlist: 'descrip'
                  };
                  DataService.get('api/sa/sastc/getbypk', { params: sastaParams, busy: true }, function (sastc) {
                     if (sastc) {
                        self.vendorCurrency = sastc.descrip;
                     }
                  });
               }
            }
         });
      }
   };

   self.setVatData = function () {
      self.vat = {
         claimno: self.pderInitReceiptResults.claimno,
         claimseqno: self.pderInitReceiptResults.claimseqno,
         proctype: 'a',
         recordtype: self.pderInitReceiptResults.recordtype,
         statustype: self.pderInitReceiptResults.statustype,
         receiptamt: self.pderInitReceiptResults.receiptamt,
         vendno: self.pderInitReceiptResults.vendno,
         currencyty: self.pderInitReceiptResults.currencyty,
         vatenabled: self.pderInitReceiptResults.vatenabled,
         vat1groupno: 1,
         vat2groupno: 2,
         vat3groupno: 3,
         vat4groupno: 4,
         vat5groupno: 5,
         vat1goodsamt: 0,
         vat2goodsamt: 0,
         vat3goodsamt: 0,
         vat4goodsamt: 0,
         vat5goodsamt: 0,
         vat1taxamt: 0,
         vat2taxamt: 0,
         vat3taxamt: 0,
         vat4taxamt: 0,
         vat5taxamt: 0,
         vatproof: 0,
         vatdomain: '',
         settamt: 0
      };

      DataService.post('api/pd/aspdentry/pdervatprocessing', { data: self.vat, busy: true }, function (data) {
         self.vat = data;
      });

   };

   self.loadReceiptData = function (receiptType) {
      var pderInitReceiptCriteria = {
         receipttype: receiptType,
         claimno: self.rebateReconciliationModel.claimNo,
         vendno: self.rebateReconciliationModel.vendno,
         receiptdt: self.rebateReconciliationModel.receiptDate,
         secure: self.rebateReconciliationModel.secure
      };
      DataService.post('api/pd/aspdentry/pderinitreceipt', { data: pderInitReceiptCriteria, busy: true }, function (data) {
         self.pderInitReceiptResults = data;
         self.setTempPderInitReceiptResults();
         self.setVatData();
         self.subtitle = MessageService.get('global.claim.number') + self.pderInitReceiptResults.claimno + ' | ' + MessageService.get('global.vendor.number') +
            self.pderInitReceiptResults.vendno + ' ' + self.pderInitReceiptResults.vendname;
         self.getvendorCurrency();
      });
   };

   if (self.rebateReconciliationModel.pderGetClaimResults === null || self.rebateReconciliationModel.pderGetClaimResults === undefined) {
      if (self.rebateReconciliationModel.receiptType.toUpperCase() === 'T') {
         self.loadReceiptData('T');
         self.recordType = MessageService.get('global.temporary.receipts');
      } else if (self.rebateReconciliationModel.receiptType.toUpperCase() === 'V') {
         self.loadReceiptData('V');
         self.title = MessageService.get('global.add.vendor.receipt');
         self.recordType = MessageService.get('global.vendor.receipts');
      }
   } else {
      self.pderInitReceiptResults = {
         apinvno: self.rebateReconciliationModel.pderGetClaimResults.apinvno,
         claimno: self.rebateReconciliationModel.pderGetClaimResults.claimno,
         claimseqno: self.rebateReconciliationModel.pderGetClaimResults.claimseqno,
         divno: self.rebateReconciliationModel.pderGetClaimResults.divno,
         receiptdt: self.rebateReconciliationModel.pderGetClaimResults.receiptdt,
         receiptamt: self.rebateReconciliationModel.pderGetClaimResults.receiptamt,
         recordtype: self.rebateReconciliationModel.pderGetClaimResults.recordtype,
         refer: self.rebateReconciliationModel.pderGetClaimResults.refer,
         sourcepros: self.rebateReconciliationModel.pderGetClaimResults.sourcepros,
         srcupdtty: self.rebateReconciliationModel.pderGetClaimResults.srcupdtty,
         statustype: self.rebateReconciliationModel.pderGetClaimResults.statustype,
         vendname: self.rebateReconciliationModel.pderGetClaimResults.vendname,
         vendno: self.rebateReconciliationModel.pderGetClaimResults.vendno
      };
      self.setTempPderInitReceiptResults();
      self.subtitle = MessageService.get('global.claim.number') + self.pderInitReceiptResults.claimno + ' | ' + MessageService.get('global.vendor.number') +
         self.pderInitReceiptResults.vendno + ' ' + self.pderInitReceiptResults.vendname;
      self.getvendorCurrency();
   }

   self.changeReceiptAmount = function () {
      // Only process if VAT is enabled
      if (self.pderInitReceiptResults.vatenabled) {

         self.vat.statustype = self.pderInitReceiptResults.statustype;
         self.vat.receiptamt = self.pderInitReceiptResults.receiptamt;
         self.vat.proctype = 'a';

         DataService.post('api/pd/aspdentry/pdervatprocessing', { data: self.vat, busy: true }, function (data) {
            self.vat = data;
         });

      }
   };

   self.recalculateProof = function () {
      // Only process if VAT is enabled
      if (self.pderInitReceiptResults.vatenabled) {
         var tmpProof = self.vat.vat1taxamt + self.vat.vat2taxamt + self.vat.vat3taxamt + self.vat.vat4taxamt + self.vat.vat5taxamt;
         var tmpGoods = self.vat.vat1goodsamt + self.vat.vat2goodsamt + self.vat.vat3goodsamt + self.vat.vat4goodsamt + self.vat.vat5goodsamt;

         self.vat.vatproof = tmpProof + tmpGoods - self.pderInitReceiptResults.receiptamt;
      }
   };

   self.reset = function () {
      self.pderInitReceiptResults = angular.copy(self.tempPderInitReceiptResults);
   };

   self.cancel = function () {
      if (self.isFromMaster) {
         $state.go('^.master');
      } else {
         var selectedDetails = {
            claimno: self.rebateReconciliationModel.claimNo,
            vendno: self.rebateReconciliationModel.vendno,
            rebatecd: self.rebateReconciliationModel.rebatecd,
            receipttype: 'C',
            receiptDate: self.rebateReconciliationModel.receiptDate,
            jrnlno: 0,
            secure: self.rebateReconciliationModel.secure,
            tab: 0
         };
         $state.go('^.detail', { selectedRecord: selectedDetails });
      }
   };

   self.submit = function () {
      var processOK = true;

      // Make sure the VAT information matches the receipt amount
      if (self.pderInitReceiptResults.vatenabled) {
         self.recalculateProof();

         if (self.vat.vatproof) {
            processOK = false;
            MessageService.error('global.error', 'message.proof.must.be.0.to.continue');
         }
      }

      if (processOK) {

         if (self.rebateReconciliationModel.pderGetClaimResults) {
            var pderUpdateReceipt =
            {
               receiptdt: self.pderInitReceiptResults.receiptdt,
               receiptamt: self.pderInitReceiptResults.receiptamt,
               apinvno: self.pderInitReceiptResults.apinvno,
               refer: self.pderInitReceiptResults.refer,
               divno: self.pderInitReceiptResults.divno,
               vendno: self.pderInitReceiptResults.vendno,
               claimno: self.pderInitReceiptResults.claimno,
               srcupdtty: self.pderInitReceiptResults.srcupdtty,
               recordtype: self.pderInitReceiptResults.recordtype,
               sourcepros: self.pderInitReceiptResults.sourcepros,
               statustype: self.pderInitReceiptResults.statustype,
               claimseqno: self.pderInitReceiptResults.claimseqno,
               rowidpderv: self.rebateReconciliationModel.pderGetClaimResults.rowidpderv,
               secure: self.rebateReconciliationModel.secure,
               vatamt: self.vat.vat1taxamt + self.vat.vat2taxamt + self.vat.vat3taxamt + self.vat.vat4taxamt + self.vat.vat5taxamt,
               nettamt: self.pderInitReceiptResults.receiptamt - (self.vat.vat1taxamt + self.vat.vat2taxamt + self.vat.vat3taxamt + self.vat.vat4taxamt + self.vat.vat5taxamt)
            };
            DataService.post('api/pd/aspdentry/pderupdatereceipt', { data: pderUpdateReceipt, busy: true }, function () {

               // If VAT, update the VAT information based on the updated rebate data
               if (self.pderInitReceiptResults.vatenabled) {
                  self.vat.proctype = 'r';
                  DataService.post('api/pd/aspdentry/pdervatprocessing', { data: self.vat, busy: true }, function (data) {
                     self.vat = data;
                  });
               }

               MessageService.info('global.information', 'message.save.operation.completed.successfully');

               if (self.isFromMaster) {
                  $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
               } else {
                  var selectedDetails = {
                     claimno: self.rebateReconciliationModel.claimNo,
                     vendno: self.rebateReconciliationModel.vendno,
                     rebatecd: self.rebateReconciliationModel.rebatecd,
                     receipttype: 'C',
                     receiptDate: self.rebateReconciliationModel.receiptDate,
                     jrnlno: 0,
                     secure: self.rebateReconciliationModel.secure,
                     tab: 0
                  };
                  $state.go('^.detail', { selectedRecord: selectedDetails });
               }
            });
         } else {
            if (self.rebateReconciliationModel.receiptType.toUpperCase() === 'T') {
               self.addReceipt(self.rebateReconciliationModel.receiptType);
            } else if (self.rebateReconciliationModel.receiptType.toUpperCase() === 'V') {
               self.addReceipt(self.rebateReconciliationModel.receiptType);
            }
         }

      }
   };

   self.changeVendor = function () {
      self.getvendorCurrency();
   };

   self.addReceipt = function (receiptType) {
      var pderAddReceipt = {
         receiptdt: self.pderInitReceiptResults.receiptdt,
         receiptamt: self.pderInitReceiptResults.receiptamt,
         apinvno: self.pderInitReceiptResults.apinvno,
         refer: self.pderInitReceiptResults.refer,
         divno: self.pderInitReceiptResults.divno,
         vendno: self.pderInitReceiptResults.vendno,
         claimno: self.pderInitReceiptResults.claimno,
         srcupdtty: self.pderInitReceiptResults.srcupdtty,
         recordtype: receiptType,
         sourcepros: self.pderInitReceiptResults.sourcepros,
         statustype: self.pderInitReceiptResults.statustype,
         claimseqno: self.pderInitReceiptResults.claimseqno,
         secure: self.rebateReconciliationModel.secure,
         vatamt: self.vat.vat1taxamt + self.vat.vat2taxamt + self.vat.vat3taxamt + self.vat.vat4taxamt + self.vat.vat5taxamt,
         nettamt: self.pderInitReceiptResults.receiptamt - (self.vat.vat1taxamt + self.vat.vat2taxamt + self.vat.vat3taxamt + self.vat.vat4taxamt + self.vat.vat5taxamt)
      };
      DataService.post('api/pd/aspdentry/pderaddreceipt', { data: pderAddReceipt, busy: true }, function (data) {

         if (data) {
            MessageService.alert('global.warning', data);
         }

         // If VAT, create the VAT information based after the new rebate data for vendor receipts has been created
         if (self.pderInitReceiptResults.vatenabled && receiptType.toUpperCase() === 'V') {
            self.vat.proctype = 'r';
            DataService.post('api/pd/aspdentry/pdervatprocessing', { data: self.vat, busy: true }, function (data) {
               self.vat = data;
            });
         }

         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         if (self.isFromMaster) {
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         } else {
            var selectedDetails = {
               claimno: self.rebateReconciliationModel.claimNo,
               vendno: self.rebateReconciliationModel.vendno,
               rebatecd: self.rebateReconciliationModel.rebatecd,
               receipttype: 'C',
               receiptDate: self.rebateReconciliationModel.receiptDate,
               jrnlno: 0,
               secure: self.rebateReconciliationModel.secure,
               tab: 0
            };
            $state.go('^.detail', { selectedRecord: selectedDetails });
         }
      });
   };
});

app.controller('PderReceiptVatCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.mode = $stateParams.mode;
   self.isFromMaster = $stateParams.isFromMaster;
   self.rebateReconciliationModel = $stateParams.tempReceiptRecord;
   self.pderGetReceiptResults = [];
   self.vat = {};
   self.recordType = '';

   var rowNum = self.rebateReconciliationModel.rownumber;

   self.setVatData = function () {
      self.vat = {
         claimno: self.pderGetReceiptResults[rowNum].claimno,
         claimseqno: self.pderGetReceiptResults[rowNum].claimseqno,
         recordtype: self.pderGetReceiptResults[rowNum].recordtype,
         statustype: self.pderGetReceiptResults[rowNum].statustype,
         receiptamt: self.pderGetReceiptResults[rowNum].receiptamt,
         vendno: self.pderGetReceiptResults[rowNum].vendno,
         currencyty: self.pderGetReceiptResults[rowNum].currencyty,
         vatenabled: true,
         vat1groupno: 1,
         vat2groupno: 2,
         vat3groupno: 3,
         vat4groupno: 4,
         vat5groupno: 5,
         vat1goodsamt: 0,
         vat2goodsamt: 0,
         vat3goodsamt: 0,
         vat4goodsamt: 0,
         vat5goodsamt: 0,
         vat1taxamt: 0,
         vat2taxamt: 0,
         vat3taxamt: 0,
         vat4taxamt: 0,
         vat5taxamt: 0,
         vatproof: 0,
         vatdomain: '',
         settamt: 0
      };

      // If just viewing the VAT, get what has already been entered for the vendor receipt
      // If updating based on a change in the receipt amount, get new VAT values
      if (self.mode === 'view') {
         self.vat.proctype = 'v';
      } else {
         self.vat.proctype = 'a';
      }
      DataService.post('api/pd/aspdentry/pdervatprocessing', { data: self.vat, busy: true }, function (data) {
         self.vat = data;
      });

   };

   self.loadReceiptData = function () {
      var getReceiptCriteria = {
         claimno: base.detailsRecord.claimno,
         vendno: base.detailsRecord.vendno,
         jrnlno: (base.detailsRecord.jrnlno !== 0) ? base.detailsRecord.jrnlno : 0,
         recordcountlimit: null,
         secure: base.detailsRecord.secure
      };
      DataService.post('api/pd/aspdentry/pdergetreceipt', { data: getReceiptCriteria, busy: true }, function (data) {
         self.pderGetReceiptResults = data.pdergetreceiptresults;
         self.setVatData();
         self.subtitle = MessageService.get('global.claim.number') + self.pderGetReceiptResults[rowNum].claimno + ' | ' +
            MessageService.get('global.sequence.number.poundsign') + self.pderGetReceiptResults[rowNum].claimseqno + ' | ' +
            MessageService.get('global.vendor.number') + self.pderGetReceiptResults[rowNum].vendno + ' ' + self.pderGetReceiptResults[rowNum].vendname;
      });
   };

   self.loadReceiptData();

   self.recalculateProof = function () {
      var tmpProof = self.vat.vat1taxamt + self.vat.vat2taxamt + self.vat.vat3taxamt + self.vat.vat4taxamt + self.vat.vat5taxamt;
      var tmpGoods = self.vat.vat1goodsamt + self.vat.vat2goodsamt + self.vat.vat3goodsamt + self.vat.vat4goodsamt + self.vat.vat5goodsamt;

      self.vat.vatproof = tmpProof + tmpGoods - self.pderGetReceiptResults[rowNum].receiptamt;
   };

   self.cancel = function () {
      $state.go('^.detail');
   };

   self.submit = function () {

      // If just viewing the VAT, do not update - just return to detail grid
      // If the receipt amount changed, the user should have updated the VAT so need to save those changes
      if (self.mode === 'update') {

         // Make sure that the proof is zero before committing VAT values
         self.recalculateProof();

         if (self.vat.vatproof) {
            MessageService.error('global.error', 'message.proof.must.be.0.to.continue');
         } else {
            self.vat.proctype = 'r';
            DataService.post('api/pd/aspdentry/pdervatprocessing', { data: self.vat, busy: true }, function (data) {
               self.vat = data;
            });

            $state.go('^.detail');
         }
      } else {
         $state.go('^.detail');
      }

   };

});

app.controller('PderFinalUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.selectedUpdateMode = $stateParams.selectedUpdateMode;
   base.pderFinalEditResults = {};
   base.reconExRateUpdateFl = false;
   self.isAllowUpdate = false;
   self.warningMessage = '';
   self.subtitle = '';
   self.errorMessage = '';
   self.currencyDescription = '';

   self.getCurrencyDescription = function () {
      self.currencyDescription = '';
      if (base.pderFinalEditResults.currencyty) {
         var sastaParams = {
            currencyty: base.pderFinalEditResults.currencyty,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sastc/getbypk', { params: sastaParams, busy: true }, function (sastc) {
            if (sastc) {
               self.currencyDescription = sastc.descrip;
            }
         });
      }
   };

   self.loadFinalEditData = function () {
      self.subtitle = MessageService.get('global.claim.number') + base.fineUpdateRecord.claimno + ' | ' +
            MessageService.get('global.vendor.number') + base.fineUpdateRecord.vendno;
      var criteria = {
         claimno: base.fineUpdateRecord.claimno,
         vendno: base.fineUpdateRecord.vendno,
         secure: base.security,
         softlock: false
      };
      DataService.post('api/pd/aspdentry/pderfinaledit', { data: criteria, busy: true }, function (data) {
         self.errorMessage = '';
         if (data.pderfinaleditresults && data.pderfinaleditresults.length > 0) {
            base.pderFinalEditResults = JSLINQ(data.pderfinaleditresults).FirstOrDefault();
            if (base.pderFinalEditResults.proofAmt !== 0 && data.cWarningMessage) {
               self.errorMessage = data.cWarningMessage;
            }
            if (base.pderFinalEditResults.writeOffAmt !== 0) {
               self.warningMessage = MessageService.get('error.warning.writeoff.is.not.proofed.to.zero.8010');
            } else if (base.pderFinalEditResults.postAmt === 0) {
               self.warningMessage = MessageService.get('error.warning.applying.an.amount.of.zero.8661');
            }
            self.isAllowUpdate = (base.pderFinalEditResults.proofAmt !== 0) ? false : true;
            self.getCurrencyDescription();
         }
      });
   };

   if (base.fineUpdateRecord !== undefined && base.fineUpdateRecord !== null) {
      self.loadFinalEditData();
   }

   self.submit = function () {
      if (self.isAllowUpdate && self.selectedUpdateMode) {
         if (!base.journal) {
            if (base.isPDERUpdate) {
               if (base.pderFinalEditResults.writeOffAmt !== 0) {
                  base.journalControl.showOpenView(function () {
                     $state.go('pder.master.gldistribution');
                  });
               } else {
                  base.journalControl.showOpenView(function () {
                     base.pderFinalUpdate(base.fineUpdateRecord);
                  });
               }
            } else {
               if (base.pderFinalEditResults.writeOffAmt !== 0) {
                  base.journalControl.showOpenView(function () {
                     $state.go('pder.detail.gldistribution');
                  });
               } else {
                  base.journalControl.showOpenView(function () {
                     base.pderFinalUpdate(base.fineUpdateRecord);
                  });
               }
            }
         } else {
            if (base.pderFinalEditResults.writeOffAmt !== 0) {
               if (base.isPDERUpdate) {
                  $state.go('pder.master.gldistribution');
               } else {
                  $state.go('pder.detail.gldistribution');
               }
            } else {
               base.finalUpdate();
            }
         }
      } else {
         if (self.rebateReconciliationModel !== null) {
            var processError = MessageService.get('global.claim.number') + base.fineUpdateRecord.claimno + ' ' + MessageService.get('global.processing.not.complete');
            MessageService.error('global.error', processError);
            base.finalUpdateMessage += processError + '<br>';
         }
         if (base.isPDERUpdate) {
            base.finalUpdate();
         } else {
            $state.go('^');
         }
      }
   };

   self.cancel = function () {
      MessageService.error('global.error', 'global.processing.not.complete');
      if (base.isPDERUpdate) {
         base.finalUpdate();
      } else {
         $state.go('^');
      }
   };
});

app.controller('PderGLDistributionCtrl', function ($scope, $state, $stateParams, DataService, Utils, MessageService, GridService, AuthService) {
   var self = this;
   var base = $scope.base;
   if (base.fineUpdateRecord !== undefined && base.fineUpdateRecord !== null && base.pderFinalEditResults !== undefined && base.pderFinalEditResults !== null) {
      self.subtitle = MessageService.get('global.claim.number') + base.fineUpdateRecord.claimno + ' | ' +
      MessageService.get('global.vendor.number') + base.fineUpdateRecord.vendno;

      // Note - in GUI Perform-Update in pd/d-pder-update.w passes in the amount as an absolute of the screen-value for the write-off amount (v-proofamt = abs(dWrtOffAmt))
      var calcWriteOff = Math.abs(Math.round(base.pderFinalEditResults.writeOffAmt * base.pderFinalEditResults.reconexrate * 100) / 100);
      var initiatePDCriteria = {
         claimno: base.fineUpdateRecord.claimno,
         currproc: 'PDER',
         divno: base.pderFinalEditResults.divno,
         jrnlno: base.journal.gJrnlno,
         balanceType: base.pderFinalEditResults.writeOffBalType,
         writeOffAmt: calcWriteOff
      };
      DataService.post('api/gl/asglentry/gletainitiatepd', { data: initiatePDCriteria, busy: true }, function (data) {
         if (data !== null) {
            base.gletaList = data.gleta;
            base.gletaHeader = data.gletaheader;
         }
      });
   }

   self.isglDistribution = function () {
      if (base.isPDERUpdate) {
         return $state.is('pder.master.gldistribution');
      } else {
         return $state.is('pder.detail.gldistribution');
      }
   };

   self.create = function () {
      var newModel = {
         iseqno: 0,
         ctype: '',
         caccount: '',
         damount: 0,
         dcuramount: 0,
         cname: '',
         clookup: '',
         userfield: ''
      };
      $state.go('.details', { selectedRecord: newModel, isAddMode: true, detailOkCallback: 'glDistributionDetailCallback' });
   };

   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(self.grid);
      $state.go('.details', { selectedRecord: selectedRecord, isAddMode: false, detailOkCallback: 'glDistributionDetailCallback' });
   };

   self.glDistributionDetailCallback = function () {
      self.grid.loadData(base.gletaList);
      $state.go('^');
   };

   self.cancel = function () {
      if (base.isPDERUpdate) {
         $state.go('pder.master.finalupdate', { selectedUpdateMode: true });
      } else {
         $state.go('pder.detail.finalupdate', { selectedUpdateMode: true });
      }
   };

   self.update = function () {
      var glet = JSLINQ(base.gletaList).FirstOrDefault();

      if (glet !== null) {
         var criteria =
         {
            option1Account: glet.caccount,
            option2Div: 0,
            option2Dept: 0,
            option2Acct: 0,
            option2Sub: 0,
            userfield: ''
         };
         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: criteria, busy: true }, function (data) {
            if (data !== null) {
               self.authPointsRunning = 0;
               if (!data.manpostfl) {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('gleta', '', 'manpostfl', '', '', null,
                  function () {
                     self.updatePder();
                  }, null);
               }

               if (!data.userhassecurity) {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('gleta', '', 'account', '', '', null,
                  function () {
                     self.updatePder();
                  }, null);
               }

               // if no auth points are running then continue processing final update
               if (self.authPointsRunning <= 0) {
                  self.updatePder();
               }
            }
         });
      }
   };

   self.updatePder = function () {
      self.authPointsRunning--;
      if (self.authPointsRunning <= 0) {
         base.pderFinalUpdate(base.fineUpdateRecord);
      }
   };
});

app.controller('PderGLDistributionDetailCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.gletaHeader = base.gletaHeader;
   self.selectedRecord = $stateParams.selectedRecord;
   self.isAddMode = $stateParams.isAddMode;

   var dproof = base.gletaHeader.proof;
   var caccount = self.selectedRecord.caccount;
   var damount = self.selectedRecord.damount;
   var dcuramount = self.selectedRecord.dcuramount;
   var ctype = self.selectedRecord.ctype;
   var cname = self.selectedRecord.cname;
   var index = base.gletaList.indexOf(self.selectedRecord);

   self.subtitle = MessageService.get('global.claim.number') + base.fineUpdateRecord.claimno + ' | ' +
      MessageService.get('global.vendor.number') + base.fineUpdateRecord.vendno;

   self.gletaFieldLeave = function (cFieldName) {

      var leaveRequest = {
         gleta: self.selectedRecord,
         gletaheader: self.gletaHeader,
         cFieldName: cFieldName
      };

      DataService.post('api/gl/asglentry/gletafieldleave', { data: leaveRequest, busy: true }, function (data) {
         if (data !== null) {
            self.selectedRecord.caccount = data.gleta.caccount;
            self.selectedRecord.damount = data.gleta.damount;
            self.selectedRecord.dcuramount = data.gleta.dcuramount;
            self.selectedRecord.ctype = data.gleta.ctype;
            self.selectedRecord.cname = data.gleta.cname;

            self.gletaHeader.proof = data.gletaheader.proof;

            if (data.messaging !== null && data.messaging.length > 0) {
               MessageService.processMessaging(data.messaging);
            }
         }
      });
   };

   self.convertPercentToAmount = function () {
      self.gletaFieldLeave("Convert-Percent-To-Amount");
   };

   // Note - in GUI this is only used on the IC GLETA screen but is not made insensitive for others (right-click menu on the browser) so will always return 0
   self.setAmountEqualtoProof = function () {
      self.gletaFieldLeave("Set-Amount-To-Proof");
   };

   self.submit = function () {
      if (self.isAddMode) {
         base.gletaList.push(self.selectedRecord);
      } else {
         base.gletaList[index] = self.selectedRecord;
      }
      base.gletaHeader = self.gletaHeader;

      var callbackFn = $scope.gldc[$stateParams.detailOkCallback];
      callbackFn();
   };

   self.cancel = function () {
      base.gletaHeader.proof = dproof;
      self.selectedRecord.caccount = caccount;
      self.selectedRecord.damount = damount;
      self.selectedRecord.dcuramount = dcuramount;
      self.selectedRecord.ctype = ctype;
      self.selectedRecord.cname = cname;
      $state.go('^');
   };

});
