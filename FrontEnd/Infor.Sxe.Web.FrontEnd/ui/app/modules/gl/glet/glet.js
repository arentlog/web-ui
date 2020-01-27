'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('gl', 'glet', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('gl', 'glet');

   $stateProvider.state('glet.detail', {
      url: '/detail',
      params: { glet: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glet/detail.json');
            },
            controller: 'GletDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('glet.detail.edit', {
      url: '/edit',
      template: ''
   });

   $stateProvider.state('glet.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glet/detail.json');
            },
            controller: 'GletCreateCtrl as dtl'
         }
      }
   });

   $stateProvider.state('glet.report', {
      url: '/report',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glet/final-update-report.json');
            },
            controller: 'GletUpdateReportCtrl as furpt'
         }
      }
   });
});

app.controller('GletBaseCtrl', function ($scope, $state, $translate, DataService, Utils, UtilsData, MessageService, UserService) {
   var self = this;
   self.criteria = {};
   self.glet = {};
   self.glee = null;
   self.gletacctresults = {};
   self.gletEntryCriteria = {};
   self.gletfinupdrept = {};
   self.checkReconTypes = [];
   self.isFirstTime = true;

   self.debits = $translate.instant('global.debits');
   self.credits = $translate.instant('global.credits');
   self.balance = $translate.instant('global.balance');

   self.updategltrans = false;
   self.options = $translate.instant('global.s');
   self.isCustomerOptionSelected = false;
   self.isVendorOptionSelected = false;
   self.isCheckReconOptionSelected = false;
   self.isExtRefSelected = false;
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
         currproc: 'glet',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'gl',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('glet.master');
   };

   self.includesMaster = function () {
      return $state.includes('glet.master');
   };

   self.isDetail = function () {
      return $state.is('glet.detail');
   };

   self.includesDetail = function () {
      return $state.includes('glet.detail');
   };

   self.search = function () {
      DataService.post('api/gl/asglentry/fetchgrpdetail', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.gletacctresults;
            self.gletamtresults = data.gletamtresults;

            if (self.gletamtresults.lastupddt) {
               self.criteria.lastUpdated = self.gletamtresults.lastupddt;

               if (self.gletamtresults.lastupdtm) {
                  self.criteria.lastUpdated += ' - ' + self.gletamtresults.lastupdtm;
               }
            }
         }
      });
   };

   self.getDescrip = function () {
      if (self.criteria.grpname) {
         var params = {
            batchnm: self.criteria.grpname
         };

         DataService.get('api/sa/sabs/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.criteria.grpdescr = data.descrip;
               //Restricting Api call to hit twice while debugging application in IE Browser
               if (self.isFirstTime) {
                  self.search();
               }
               self.isFirstTime = false;
            }
         });
      }
      else {
         self.criteria.grpdescr = '';
         self.gletamtresults = null;
         self.dataset = [];
      }
   };

   self.uploadGLET = function () {
      var valMsg = '';
      var BREAK = '<br />';

      if (!self.glet.cAcctno) {
         valMsg = valMsg + $translate.instant('global.account') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (!self.glet.transcd) {
         valMsg = valMsg + $translate.instant('global.type') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (self.glet.amount === 0) {
         valMsg = valMsg + $translate.instant('global.amount') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (self.glet.crthist && self.glet.jrnlno === 0) {
         valMsg = valMsg + $translate.instant('global.journal.number') + ' - ' + $translate.instant('global.required') + BREAK;
      }

      if (valMsg) {
         valMsg = $translate.instant('global.validation.error.message') + BREAK + BREAK + valMsg;
         MessageService.error('global.validation.error', valMsg);
      }
      else {
         self.gletEntryCriteria = {
            seqno: self.glet.seqno ? self.glet.seqno : 0,
            batchnm: self.criteria.grpname,
            glno: self.glet.cAcctno,
            amount: self.glet.amount,
            entrytype: (self.glet.transcd === '1' || self.glet.transcd === '3') ? $translate.instant('global.debit') : $translate.instant('global.credit'),
            refer: self.glet.refer,
            entDate: self.glet.postdt,
            transcd: parseInt(self.glet.transcd, 10),
            setno: self.glet.crthist ? self.glet.setno : 0,
            updcancel: true,
            clearfl: self.glet.clearfl,
            crthist: self.glet.crthist,
            lholdfl: false,
            glebtRecid: (self.glet.recidGlebt) ? self.glet.recidGlebt : 0,
            jrnlno: self.glet.crthist ? self.glet.jrnlno : 0,
            bankno: (self.glet.bankno) ? self.glet.bankno : 0,
            crtype: (self.glet.crtype) ? self.glet.crtype : '',
            custno: (self.glet.custno) ? self.glet.custno : 0,
            vendno: (self.glet.vendno) ? self.glet.vendno : 0,
            invnoar: (self.glet.invoice) ? self.splitArInvoice(self.glet.invoice, false) : 0,
            invsufar: (self.glet.invoice) ? self.splitArInvoice(self.glet.invoice, true) : 0,
            apinvno: (self.glet.apinvno) ? self.glet.apinvno : 0,
            checkno: (self.glet.checkno) ? self.glet.checkno : 0
         };

         DataService.post('api/gl/asglentry/entrygletupd', { data: self.gletEntryCriteria, busy: true }, function (data) {
            if (data) {
               self.gletacctresults = data.gletacctresults;
               self.gletamtresults = data.gletamtresults;
               if (self.glet.extref) {
                  self.saveExtendedRefData();
               }
               else {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('glet.master', { refreshSearch: true }, { reload: 'glet.master' });
               }
            }
         });
      }
   };

   self.splitArInvoice = function (invoice, isSuffix) {
      var arInvoice = invoice.split('-');
      if (isSuffix) {
         return Number(arInvoice[1]);
      }
      else {
         return Number(arInvoice[0]);
      }
   };

   self.saveExtendedRefData = function () {
      if (self.glee) {
         self.glee.cono = UserService.getCono();
         self.glee.setno = 0;
         self.glee.keyno = self.criteria.grpname;
         self.glee.transno = self.glet.seqno;

         self.splitExtendedRefData();

         DataService.put('api/gl/glee', { data: self.glee, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('glet.master', { refreshSearch: true }, { reload: 'glet.master' });
               self.glee = null;
            }
         });
      }
      else {
         self.glee = {
            cono: UserService.getCono(),
            setno: 0,
            keyno: self.criteria.grpname,
            transno: self.gletacctresults.seqno,
            operinit: UserService.getUserName(),
            transdt: self.glet.postdt
         };

         self.splitExtendedRefData();

         DataService.post('api/gl/glee', { data: self.glee, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.saved.successfully');
               $state.go('glet.master', { refreshSearch: true }, { reload: 'glet.master' });
               self.glee = null;
            }
         });
      }
   };

   self.splitExtendedRefData = function () {
      var extRefDataList = [];
      var extrefLength = self.glet.extref.length;

      for (var i = 0; i < extrefLength; i += 60) {
         if ((i + 60) < extrefLength) {
            extRefDataList.push(self.glet.extref.substr(i, 60));
         }
         else {
            extRefDataList.push(self.glet.extref.substr(i));
         }
      }

      self.glee.reference1 = extRefDataList[0] ? extRefDataList[0] : '';
      self.glee.reference2 = extRefDataList[1] ? extRefDataList[1] : '';
      self.glee.reference3 = extRefDataList[2] ? extRefDataList[2] : '';
      self.glee.reference4 = extRefDataList[3] ? extRefDataList[3] : '';
      self.glee.reference5 = extRefDataList[4] ? extRefDataList[4] : '';
      self.glee.reference6 = extRefDataList[5] ? extRefDataList[5] : '';
      self.glee.reference7 = extRefDataList[6] ? extRefDataList[6] : '';
      self.glee.reference8 = extRefDataList[7] ? extRefDataList[7] : '';
      self.glee.reference9 = extRefDataList[8] ? extRefDataList[8] : '';
      self.glee.reference10 = extRefDataList[9] ? extRefDataList[9] : '';
   };

   self.clearBindingsAfterFinalUpdate = function () {
      self.gletamtresults = {};

      if (self.dataset.length !== 0) {
         self.dataset = [];
         if (self.journal) {
            if (self.journal.gJrnlno !== 0) {
               self.journalControl.closeJournal();
            }
         }
      }
      self.criteria.grpname = '';
   };

   self.isGroupNameSearched = function () {
      return (self.gletamtresults) ? true : false;
   };

   self.isUserAllowedFinalUpdate = function () {
      return (self.gletamtresults && self.updategltrans) ? true : false;
   };

   self.transTypeChanged = function () {
      self.checkReconTypes = [];
      if (self.glet.transcd === '1' || self.glet.transcd === '3') {
         self.checkReconTypes.push({ key: 3, value: $translate.instant('global.adjustment') });
         self.checkReconTypes.push({ key: 4, value: $translate.instant('global.deposit') });
         self.checkReconTypes.push({ key: 5, value: $translate.instant('global.interest') });
      }
      else if (self.glet.transcd === '2' || self.glet.transcd === '4') {
         self.checkReconTypes.push({ key: 1, value: $translate.instant('global.check') });
         self.checkReconTypes.push({ key: 2, value: $translate.instant('global.charge') });
         self.checkReconTypes.push({ key: 3, value: $translate.instant('global.adjustment') });
      }
   };

   self.transBrowseGlet = function (rowID, isHold, isDelete, isDetail) {
      var gletBrowseCriteria = {
         glebtRowid: rowID,
         holdfl: isHold,
         delfl: isDelete
      };

      DataService.post('api/gl/asglentry/transbrowseglet', { data: gletBrowseCriteria, busy: true }, function (data) {
         if (data) {
            self.gletamtresults = data;
            if (isDetail) {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               $state.go('glet.master', { refreshSearch: true }, { reload: 'glet.master' });
            }
            else {
               self.search();
            }
         }
      });
   };

   self.initializeNewGlet = function () {
      self.glet = {
         postdt: Utils.getCurrentDate(),
         transcd: '',
         amount: 0.00,
         bankno: 0,
         crtype: '',
         custno: 0,
         vendno: 0,
         invnoar: 0,
         invsufar: 0,
         apinvno: 0,
         checkno: 0,
         crthist: false
      };
   };

   self.glAccountChanged = function () {
      if (self.glet.cAcctno) {
         DataService.get('api/gl/asglentry/glethistvisible/' + self.glet.cAcctno, { busy: true }, function (data) {
            if (data) {
               self.isHistoryVisible = data;
            }
         });
      }
   };

   self.glInquiryHyperlink = function () {
      if (self.glet.cAcctno) {
         $state.go('glia.detail', { pk: self.glet.cAcctno });
      }
   };

   self.getUserGlUpdateSetting = function () {
      DataService.post('api/sa/assasetup/sasosetupretrieve', { data: { cOperList: UserService.getUserName() }, busy: true }, function (data) {
         if (data) {
            self.updategltrans = (data.sasosetupuser.updategltrans.toUpperCase() === 'Y') ? true : false;
         }
      });
   };

   self.getUserGlUpdateSetting();

});

app.controller('GletSearchCtrl', function ($scope, $state, DataService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   criteria.grouptype = 'E';
   criteria.grpdescr = '';
   criteria.isExistingGroup = true;
   criteria.isNewGroup = false;

   self.reset = function () {
      base.criteria.grpname = '';
      base.criteria.grpdescr = '';
      base.glet = {};
      base.gletamtresults = {};
      base.dataset = [];
   };

   self.groupTypeChanged = function () {
      DataService.get('api/gl/asglentry/createnewgroup', { busy: true }, function (data) {
         if (data) {
            criteria.grpname = data;

            if (criteria.grouptype.toUpperCase() === 'N') {
               criteria.grouptype = 'E';
               base.getDescrip();
               base.isFirstTime = true;
            }
         }
      });
   };

   self.groupNameChanged = function () {
      base.glet = {};
      base.gletamtresults = {};
      base.dataset = [];
      base.isFirstTime = true;
      base.getDescrip();
   };

   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('glet.master');
      }

      base.search();
   };
});

app.controller('GletMasterCtrl', function ($scope, $state, $stateParams, $translate, GridService, MessageService, DataService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         self.navigateToDetail(record, false);
      }
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         self.navigateToDetail(record, true);
      }
   };

   self.create = function () {
      base.initializeNewGlet();
      $state.go('^.create');
   };

   self.navigateToDetail = function (record, isEdit) {
      var gletParams = {
         batchnm: base.criteria.grpname,
         seqno: record.seqno
      };

      DataService.get('api/gl/glebt/getbypk', { params: gletParams, busy: true }, function (data) {
         if (data) {
            var glebtRecord = data;

            self.assignGLETdata(record, glebtRecord);

            var extRefParams = {
               keyno: base.criteria.grpname,
               setno: 0,
               transno: record.seqno
            };

            DataService.get('api/gl/glee/getbypk', { params: extRefParams, busy: true }, function (data) {
               if (data) {
                  base.glee = data;

                  if (base.glee) {
                     base.glet.extref = base.glee.reference1 + base.glee.reference2 + base.glee.reference3 + base.glee.reference4 +
                        base.glee.reference5 + base.glee.reference6 + base.glee.reference7 + base.glee.reference8 +
                        base.glee.reference9 + base.glee.reference10;
                  }
               }
               else {
                  base.glee = null;
               }
            });

            if (isEdit) {
               $state.go('^.detail.edit');
            }
            else {
               $state.go('^.detail');
            }
         }
      });
   };

   self.assignGLETdata = function (record, glebt) {
      base.glet = {
         cAcctno: record.cAcctno,
         amount: record.amount,
         transcd: record.transcd,
         refer: record.refer,
         postdt: record.postdt,
         seqno: record.seqno,
         rowidGlebt: record.rowidGlebt,
         recidGlebt: record.recidGlebt,
         clearfl: glebt.clearfl,
         crthist: false,
         bankno: (glebt.bankno) ? glebt.bankno : 0,
         crtype: (glebt.crtype) ? glebt.crtype : '',
         custno: (glebt.custno) ? glebt.custno : 0,
         vendno: (glebt.vendno) ? glebt.vendno : 0,
         invnoar: (glebt.invno) ? glebt.invno : 0,
         invsufar: (glebt.invsuf) ? glebt.invsuf : 0,
         invoice: self.formatArInvoice(glebt.invno, glebt.invsuf),
         apinvno: (glebt.apinvno) ? glebt.apinvno : '0',
         checkno: (glebt.checkno) ? glebt.checkno : 0
      };
      base.transTypeChanged();
   };

   self.formatArInvoice = function (invno, invsuf) {
      if (invno === 0) {
         return '0';
      }
      else {
         return (invno + '-' + (invsuf.toString().length === 2 ? invsuf : ('0' + invsuf.toString())));
      }
   };

   self.changeStatus = function (isHoldRecord) {
      var records = GridService.getSelectedRecords(base.grid);
      var selectedStatus = isHoldRecord ? $translate.instant('global.hold').toUpperCase() : '';

      if (records) {
         records.forEach(function (record) {
            if (record.cStatus.toUpperCase() !== selectedStatus) {
               base.transBrowseGlet(record.rowidGlebt, isHoldRecord, false, false);
            }
         });
      }
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var records = GridService.getSelectedRecords(base.grid);

         if (records) {
            records.forEach(function (record) {
               base.transBrowseGlet(record.rowidGlebt, false, true, false);
            });

            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            base.search();
         }
      });
   };

   self.finalUpdate = function (isReport) {
      if (base.gletamtresults.readybal !== 0) {
         MessageService.error('global.error', 'error.proof.amount.must.be.zero.to.finish');
      }
      else {
         if (isReport) {
            self.processFinalUpdateReport();
         }
         else {
            self.processFinalUpdate();
         }
      }
   };

   self.processFinalUpdateReport = function () {
      DataService.get('api/gl/asglentry/gletfinupdreptinit/' + base.criteria.grpname, { busy: true }, function (data) {
         base.gletfinupdrept = data;
         $state.go('^.report');
      });
   };

   self.processFinalUpdate = function () {
      // If no open journal, first direct user to open a journal
      if (!base.journal) {
         base.journalControl.showOpenView(function () {
            // Proceed with final update after successful journal open
            self.processFinalUpdate();
         });
      } else {
         DataService.get('api/gl/asglentry/finalupdateglet/' + base.criteria.grpname + '/' + base.journal.gJrnlno, { busy: true }, function () {
            DataService.get('api/gl/asglentry/glclosejournal/' + base.journal.gJrnlno, { busy: true }, function () {
               var jrnlMsg = $translate.instant('global.journal.number') + ' ' + base.journal.gJrnlno + ' ' + $translate.instant('global.has.been.created');
               MessageService.info('global.information', jrnlMsg);
               MessageService.info('global.information', 'message.final.update.completed.successfully');

               base.clearBindingsAfterFinalUpdate();
            });
         });
      }
   };

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         return false;
      } else {
         return true;
      }
   };

   self.glInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('glia.detail', { pk: currentRow.cAcctno });
      }
   };
});

app.controller('GletDetailCtrl', function ($scope, $state, $stateParams, $translate, MessageService, Sasc) {
   var self = this;
   var base = $scope.base;
   self.isCheckRecVisible = Sasc.crglfl;

   self.resetGlet = angular.copy(base.glet);

   self.getSubTitle = function () {
      return ($translate.instant('global.group.name') + ': ' + base.criteria.grpname + ' | ' +
         $translate.instant('global.account.number') + ' ' + base.glet.cAcctno);
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.submit = function () {
      base.uploadGLET();
   };

   self.reset = function () {
      base.glet = angular.copy(self.resetGlet);
      base.transTypeChanged();
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         base.transBrowseGlet(base.glet.rowidGlebt, false, true, true);
      });
   };
});

app.controller('GletCreateCtrl', function ($scope, $state, $stateParams, $translate, Sasc) {
   var self = this;
   var base = $scope.base;
   if (base.glet && base.gletEntryCriteria) {
      base.glet.refer = base.gletEntryCriteria.refer;
      if (base.gletEntryCriteria.entDate) {
         base.glet.postdt = base.gletEntryCriteria.entDate;
      }
   }
   self.isCheckRecVisible = Sasc.crglfl;

   self.getSubTitle = function () {
      return $translate.instant('global.new');
   };

   self.cancel = function () {
      $state.go('^.master');
   };

   self.submit = function () {
      base.uploadGLET();
   };

   self.reset = function () {
      base.initializeNewGlet();
   };
});

app.controller('GletUpdateReportCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.printerFinalSettings = {};
   self.printerData = {};
   var printerCollection = [];

   self.cancel = function () {
      $state.go('^.master');
   };

   self.submit = function () {
      //Get mactched records based on GL postings date
      var matchedRecords = JSLINQ(base.dataset).Where(function (item) { return item.postdt === base.gletfinupdrept.postdt; });
      if (!base.gletfinupdrept.postdt) {
         MessageService.error('global.error', 'message.the.post.date.cannot.be.blank');
      } else if (matchedRecords.items.length === base.dataset.length) {
         self.continueFinalUpdate();
      } else {
         var title = $translate.instant('global.question');
         var msg = $translate.instant('message.posting.date.differs.from.glpostings.update.using.posting.date');
         MessageService.yesNoCancel(title, msg, function () { self.continueFinalUpdate(); }, null, null);
      }
   };

   self.continueFinalUpdate = function () {
      base.gletfinupdrept.continuefl = true;
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails; // If it required, printerFinalSettings object will update with additional settings based on menu function
            self.finalUpdateWithPrinterSettings();
         }
      });
   };

   self.finalUpdateWithPrinterSettings = function () {
      printerCollection.push(self.printerFinalSettings);  // based on API call input data like collection etc..this extra modification required.
      self.printerData = { cReportNm: base.gletfinupdrept.reportnm, printerSettings: printerCollection };

      var finalUpdateCriteria = {
         gletfinupdrept: base.gletfinupdrept,
         printersettings: self.printerData.printerSettings[0]
      };

      DataService.post('api/gl/asglentry/gletfinupdreptrun', { data: finalUpdateCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.final.update.report.completed.successfully');
         base.clearBindingsAfterFinalUpdate();
         $state.go('^.master');
      });
   };
});