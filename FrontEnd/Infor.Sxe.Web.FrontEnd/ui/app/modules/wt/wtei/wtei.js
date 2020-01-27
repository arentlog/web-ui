'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('wt', 'wtei', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('wt', 'wtei');
   BinAllocationStateProvider.addStates('wt', 'wtei', 'wtei.detail');

   $stateProvider.state('wtei.detail', {
      url: '/detail',
      params: { wtno: null, wtsuf: null, jrnlno: null, prevState: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtei/detail.json');
            },
            controller: 'WteiDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('wtei.quickrcv', {
      url: '/quick-receive',
      params: { wtno: null, wtsuf: null, isRefreshWTOrder: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtei/quick-recv.json');
            },
            controller: 'WteiQuickRecvCtrl as quickrcv'
         }
      }
   });

   $stateProvider.state('wtei.quickview', {
      url: '/quick-view',
      params: { wtno: null, wtsuf: null, cono: null, cono2: null, prevState: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/shared/quickview/quickview.json');
            },
            controller: 'WtQuickViewCtrl as quickview'
         }
      }
   });

   $stateProvider.state('wtei.finalupdatesubmit', {
      url: '/final-update-submit',
      params: { wteiUpdate: null, prevState: null, wtno: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtei/final-update-submit.json');
            },
            controller: 'WteiFinalUpdateSubmitCtrl as fupd'
         }
      }
   });

   $stateProvider.state('wtei.lineextend', {
      url: '/line-extend',
      params: {
         wteiLineExtend: null,
         parentCallingState: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtei/line-extended-detials.json');
            },
            controller: 'WteiLineExtendCtrl as led'
         }
      }
   });

   $stateProvider.state('wtei.detail.serial', {
      url: '/serial',
      params: {
         lineDetail: null,
         parentCallingState: null
      },
      views: {
         childViewDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtei/serial-lot.json');
            },
            controller: 'WteiSerialCtrl as sl'
         }
      }
   });

   $stateProvider.state('wtei.detail.lot', {
      url: '/lot',
      params: {
         lineDetail: null,
         parentCallingState: null
      },
      views: {
         childViewDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtei/lots.json');
            },
            controller: 'WteiLotCtrl as lt'
         }
      }
   });

});

app.controller('WteiBaseCtrl', function ($scope, $state, DataService, Utils, UserService, TabService, MessageService, Sasoo) {
   var self = this;

   self.DOCUMENT_DELIMITER = '-';
   self.MENU_FUNCTION_WTEI = 'wtei';
   self.URL_PARAM_DELIMITER = '/';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.PRINT_TYPE_FILE = 'F';
   self.recoveryData = '';
   self.activeView = '';
   self.RECEIVED = 6;
   self.qrwtno = '';
   self.qrshiptowhse = '';

   self.wlAuthNeeded = false;
   self.esbAuthNeeded = false;
   self.wtehRecord = {};
   self.wteiMasterSelectedRecord = {};
   self.wteiUpdate = {};
   //self.wlAuthNeeded = false;
   //self.esbAuthNeeded = false;
   self.criteria = { includewtfl: true, includedofl: true, tocono: UserService.getCono(), towhse: Sasoo.homewhsefl ? Sasoo.whse : '', stagecd: '3', wtno: 0 };

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      openedCallback: 'base.journalOpened',
      closeCallback: 'base.journalOpened',
      beforeCloseCallback: 'base.journalBeforeClose',
      criteria: {
         currproc: 'wtei',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'wt',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('wtei.master');
   };

   self.includesMaster = function () {
      return $state.includes('wtei.master');
   };

   self.isDetail = function () {
      return $state.is('wtei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wtei.detail');
   };

   self.journalOpened = function (journal, userOpened) {
      //Reopened Journal (on recovery)
      if (!userOpened) {
         // In recovery mode need to load the warehouse from the POEI/WTEH records
         if (self.journal && self.journal.gJrnlno) {
            var params = {
               jrnlno: self.journal.gJrnlno,
               batchsize: 1
            };
            DataService.get('api/po/poei/listbypoei', { params: params, busy: true }, function (data) {
               if (data && data.length) {
                  var wtehParams = {
                     wtno: data[0].pono,
                     wtsuf: data[0].posuf
                  };

                  DataService.get('api/wt/wteh/getbypk', { params: wtehParams, busy: true }, function (wtehData) {
                     if (wtehData) {
                        self.criteria.towhse = wtehData.shiptowhse;
                     }
                  });
               }
            });
         }
      }
   };

   //This gets called from the Journal Control when the 'Close Journal' is clicked.
   self.journalBeforeClose = function () {
      //We trap for some conditions before allowing the Journal to be closed.
      self.trapForCloseEvents();
   };

   self.closeJournalAfterFinalUpdate = function () {
      if (self.journal.gJrnlno !== 0) {
         //Close the Journal, but do not call the callback, otherwise you'll get in an endless loop.
         self.journalControl.closeJournal(true);
      }
   };

   //This traps for 2 events: 1) If the user tries to close the function and Receipts are in Process.
   //2) If they try to close a journal and Receipts are in process.  In both cases, if true, then
   //the 'Final Update' is called instead.  Otherwise, the action is performed.
   self.trapForCloseEvents = function (callback) {

      if (self.isDetail()) {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      };

      //If no Journal open, then let them close without incident.
      if (!self.journal || (self.journal && self.journal.gJrnlno === 0)) {
         return true;
      } else {
         //If a Journal is open, then we need to make a backend call to determine if there are any WT's in process of
         //Receiving.  If so, then we need to stop them and present the 'Final Update" screen.
         if (self.journal.gJrnlno > 0 && self.criteria.towhse) {
            return self.initiateFinalUpdate(true);
         } else if (self.journal.gJrnlno > 0 && self.qrshiptowhse) {
            return self.initiateFinalUpdate(true, self.qrshiptowhse, self.qrwtno);
         } else {
            //Allow function to close
            self.closeJournalAfterFinalUpdate();
            return true;
         }
      }
   };

   self.canUserCloseTabContinue = function () {
      TabService.closeTab('wtei.master');
   };

   TabService.canUserCloseTab('wtei', function () {
      if (self.activeView === '') {
         return self.trapForCloseEvents(self.canUserCloseTabContinue);
      } else if (self.activeView === 'finalupdate') {
         MessageService.error('global.error', 'message.update.was.not.successful');
         return false;
      } else {
         return true;
      }
   });

   self.initiateFinalUpdate = function (isClosing, whse, wtno) {

      if (whse || self.criteria.towhse) {
         var params = {
            iJrnlNo: self.journal.gJrnlno,
            cWhse: (whse) ? whse : self.criteria.towhse
         };

         DataService.get('api/wt/aswtentry/wteiupdateinit/{iJrnlNo}/{cWhse}', { pathParams: params, busy: true }, function (data) {
            if (data && data.jrnlno) {
               self.wteiUpdate = data;
               $state.go('wtei.finalupdatesubmit', { wteiUpdate: data, prevState: $state.current.name, wtno: wtno });
               //Do not allow function to close since they need to hit the "Final Update" screen.
               //return false;
            } else {
               self.closeJournalAfterFinalUpdate();

               //This can be used to force close the function if the Journal was open and they clicked the close
               //function but no WT's were in process of receiving.  This alleviates the user from having to
               //click the close two times.
               if (isClosing) {
                  self.canUserCloseTabContinue();
               }

               return true;
            }
         });
      } else {
         MessageService.error('global.error', 'message.to.warehouse.is.required');
      }
   };

   // Perform search and update data set for the grid
   self.search = function () {
      var prevstagecd = self.criteria.stagecd;

      if (self.journal) {
         self.criteria.jrnlno = self.journal.gJrnlno;
      }
      // Time Being extracting only wt order prefix ignoring suffix.Need to handle from control level later.
      if (self.criteria.wtno) {
         var wtorder = self.criteria.wtno.split('-');
         self.criteria.wtno = wtorder[0];
         //self.criteria.stagecd = 9;
      }

      DataService.post('api/wt/aswtentry/wteitransferlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.wteireceivelistresults;
         self.criteria.stagecd = prevstagecd;
         if (self.criteria.towhse) {
            DataService.get('api/wl/aswlinquiry/getwlaowhsesettings/' + self.criteria.towhse + '/' + self.criteria.tocono, { busy: true }, function (data) {
               if (data[0]) {
                  var setting = data[0];
                  self.wlAuthNeeded = setting.wlwhsefl ? setting.wlwhsefl : false;
                  self.esbAuthNeeded = setting.wlesbfl ? setting.wlesbfl : false;
               }
            });
         }
         if (self.criteria.wtno) {
            var wteiRecord = JSLINQ(self.dataset).FirstOrDefault();
            self.criteria.towhse = wteiRecord.shiptowhse;
         }
      },
         function (data) {
            self.criteria.stagecd = prevstagecd;
         });

   };

   self.getFullWTNumber = function (wtno, wtsuf) {
      return wtno + self.DOCUMENT_DELIMITER + Utils.pad(wtsuf, 2);
   };

   //Write changes back to main List so we don't need to re-query.
   self.updateMainWTList = function (data) {
      if (self.dataset) {
         self.dataset.forEach(function (wthdr) {
            if (wthdr.wtno === data.wtno && parseInt(wthdr.wtsuf, 10) === data.wtsuf) {
               wthdr.stagecd = data.stagecd;
               wthdr.stagecdx = data.stagecdx;
               wthdr.statusinfo = data.statusinfo;

               var currentIndex = self.dataset.indexOf(wthdr);
               self.grid.updateRow(currentIndex);
            }
         });
      }
   };
});

app.controller('WteiSearchCtrl', function ($scope, $state, DataService, Utils, UserService) {
   var self = this;
   var base = $scope.base;
   base.activeView = '';
   var criteria = base.criteria;

   self.wtChanged = function () {
      if (base.criteria.wtno) {
         var splitWt = base.criteria.wtno.split('-');
         criteria.wtno = splitWt[0];
         criteria.wtsuf = splitWt[1];
      } else {
         base.criteria.wtno = '';
      }
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = { includewtfl: true, includedofl: true, tocono: UserService.getCono(), towhse: '', stagecd: '3', wtno: 0 };
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('wtei.master');
      }
      base.search();
   };
});

app.controller('WteiMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, RecoveryService, AuthService, MessageService, Utils) {
   var self = this;
   self.blNavigate = false;
   self.receivedItems = [];
   var base = $scope.base;
   base.activeView = '';
   var criteria = base.criteria;
   self.wteiSelectWtTemp = {};

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.isJournalOpen = function () {
      if (!(base.journal && base.journal.gJrnlno !== 0)) {
         return false;
      } else {
         return true;
      }
   };

   self.isAnyRowSelected = function (e, args) {
      if (args && args.length > 0) {
         var currentSelectedRecord = args[args.length - 1].data;
         base.wteiMasterSelectedRecord = currentSelectedRecord;

         if (currentSelectedRecord && currentSelectedRecord.stagecd !== base.RECEIVED) {
            self.checkAccess(currentSelectedRecord);
         }
      }
   };

   self.checkDetailAccessContinue = function () {
      DataService.post('api/wt/aswtentry/wteiallowdetailaccess/', { data: self.wteiSelectWtTemp, busy: true }, function (data) {
         if (data) {
            $state.go('^.detail', { wtno: data.wtno, wtsuf: data.wtsuf, jrnlno: data.jrnlno, prevState: $state.current.name });
         }
      });
   };

   self.drilldownAuthPointPassed = function () {
      self.checkDetailAccessContinue();
   };

   self.drilldownAuthPointFailed = function () {
      //Nothing to do.
   };

   //We need to check the Authorization Points before we perform the drilldown and 'wteiallowdetailaccess'
   //call since that call also changes the Stage to Received.  If that's run first before the AuthPoint,
   //it can get moved when it shouldn't (i.e. when the User has no auth).
   self.checkDetailAccess = function (wteiRecord) {
      //Set this on the controller since we can't easily pass it down to the AuthPoint call.
      self.wteiSelectWtTemp = { tocono: wteiRecord.tocono, fromcono: wteiRecord.fromcono, jrnlno: base.journal.gJrnlno, wtno: wteiRecord.wtno, wtsuf: wteiRecord.wtsuf };
      if (base.wlAuthNeeded) {
         AuthService.createAuthPoint('wlord', '', '', '', '', null, self.drilldownAuthPointPassed, self.drilldownAuthPointFailed);
      } else if (base.esbAuthNeeded) {
         AuthService.createAuthPoint('esbwl', '', '', '', '', null, self.drilldownAuthPointPassed, self.drilldownAuthPointFailed);
      } else {
         self.checkDetailAccessContinue();
      }
   };

   self.checkAccess = function (selectedRecord) {
      var param = { iWTno: selectedRecord.wtno, iWTsuf: selectedRecord.wtsuf };
      DataService.get('api/wt/aswtentry/wteicheckaccess/{iWTno}/{iWTsuf}', { pathParams: param, busy: true }, function (data) {
         if (data) {
            self.blNavigate = false;
         } else {
            var rowIdxNum = base.dataset.indexOf(selectedRecord);
            base.grid.unselectRow(rowIdxNum);
         }
      });
   };

   self.drillDown = function (e, args) {
      var wteiRecord = args[0].item;
      wteiRecord.wtsuf = wteiRecord.wtsuf === 0 ? Utils.pad(wteiRecord.wtsuf, 2) : wteiRecord.wtsuf;
      base.wteiMasterSelectedRecord = wteiRecord;
      self.checkJournalOpen(wteiRecord);
   };

   self.checkJournalOpen = function myfunction(record) {
      if (!(base.journal && base.journal.gJrnlno !== 0)) {
         base.journalControl.showOpenView(function () {
            self.checkDetailAccess(record);
         });
      } else {
         self.checkDetailAccess(record);
      }
   };

   self.checkForAuthorization = function () {
      if (base.wlAuthNeeded) {
         // need to implement authpoint fail case [CreateAuthPoint]
         //authPoint check pass case
         AuthService.createAuthPoint('wlord', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
      } else if (base.esbAuthNeeded) {
         //authPoint check
         // need to implement authpoint fail case [CreateAuthPoint]
         AuthService.createAuthPoint('esbwl', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
      } else {
         if (self.blNavigate) {
            if (base.wteiMasterSelectedRecord) {
               $state.go('^.detail', { wtno: base.wteiMasterSelectedRecord.wtno, wtsuf: base.wteiMasterSelectedRecord.wtsuf, jrnlno: (base.journal ? base.journal.gJrnlno : null) });
            }
         } else {
            self.executeFullReceipt();
         }
      }
   };

   self.recoveryAuthPointPassed = function () {
      if (!self.blNavigate) {
         self.executeFullReceipt();
      } else {
         if (base.wteiMasterSelectedRecord) {
            $state.go('^.detail', { wtno: base.wteiMasterSelectedRecord.wtno, wtsuf: base.wteiMasterSelectedRecord.wtsuf, jrnlno: (base.journal ? base.journal.gJrnlno : null) });
         }
      }
   };

   self.recoveryAuthPointFailed = function () {
      //Nothing need to be Done on fail.
   };

   self.executeFullReceipt = function () {
      var wteiReceipts = [];
      //var record = base.wteiMasterSelectedRecord;
      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         records.forEach(function (item) {
            wteiReceipts.push({
               wtno: item.wtno,
               wtsuf: item.wtsuf,
               jrnlno: base.journal.gJrnlno,
               shiptowhse: item.shiptowhse,
               towhse: criteria.towhse
            });
         });

         if (wteiReceipts) {
            DataService.post('api/wt/aswtentry/wteifullreceipt', { data: wteiReceipts, busy: true }, function (data) {
               if (data) {
                  if (data.messaging.length > 0) {
                     MessageService.processMessaging(data.messaging);
                  }

                  if (data.wteiselectwt && data.wteiselectwt.length > 0) {
                     data.wteiselectwt.forEach(function (rec) {
                        self.receivedItems.push({
                           wtno: rec.wtno,
                           wtsuf: rec.wtsuf
                        });
                     });

                     //Walk thru each row and update the WT with the new Status.
                     data.wteiselectwt.forEach(function (row) {
                        base.updateMainWTList(row);
                     });
                  }

                  // Add to recovery
                  if (base.recoveryData !== base.criteria.towhse && base.journal.gJrnlno) {
                     RecoveryService.updateRecoveryRecord(base.MENU_FUNCTION_WTEI, base.journal.gJrnlno, base.journal.gJrnlno, base.recoveryData, base.criteria.towhse);
                     base.recoveryData = base.criteria.towhse;
                     if (base.journal) {
                        base.journalControl.setRecoveryData(base.criteria.towhse);
                     }
                  }
               }
            });
         }
      }
   };

   self.fullReceipt = function () {
      if (self.isJournalOpen()) {
         //check access
         self.checkForAuthorization();
      } else {
         base.journalControl.showOpenView(function () {
            self.fullReceipt();
         });
      }
   };

   self.cancelReceiveWork = function () {
      var wtReceipts = [];

      if (base.journal && base.journal.gJrnlno !== 0) {

         var receipts = GridService.getSelectedRecords(base.grid);

         receipts.forEach(function (item) {
            wtReceipts.push(item);
         });

         var receipt = { wteicancelreceipt: wtReceipts, iJrnlNo: base.journal.gJrnlno };
         DataService.post('api/wt/aswtentry/wteicancelreceipt', { data: receipt, busy: true }, function (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //self.receivedItems.push(data);
               // Need to remove items from recovery mode.

               var distinctList = (JSLINQ(receipts).Where(function (rcpt) {
                  return (JSLINQ(self.receivedItems).Any(function (rcry) {
                     return rcry.wtno === rcpt.wtno && rcry.wtsuf === rcpt.wtsuf;
                  }));
               }).ToArray());

               if (distinctList) {
                  self.receivedItems.splice(0, distinctList.length);
               }

               //Walk thru each row and update the WT with the new Status.
               data.wteicancelreceipt.forEach(function (row) {
                  base.updateMainWTList(row);
               });
            }
         });
      } else {
         base.journalControl.showOpenView(function () {
            self.cancelReceiveWork();
         });
      }
   };

   self.finalUpdate = function () {
      if (self.isJournalOpen()) {
         var wtno = base.wteiMasterSelectedRecord.wtno + '-' + Utils.pad(base.wteiMasterSelectedRecord.wtsuf, 2);
         base.initiateFinalUpdate(false, null, wtno);
      } else {
         base.journalControl.showOpenView(function () {
            self.finalUpdate();
         });
      }
   };

   self.quickViewContinue = function (wteh) {
      if (wteh) {
         $state.go('wtei.quickview', {
            wtno: wteh.wtno,
            wtsuf: wteh.wtsuf,
            cono: wteh.cono,
            cono2: wteh.cono2,
            prevState: $state.current.name
         });
      }
   };

   self.quickView = function () {
      if (base.grid.selectedRows().length === 1) {
         //Need to get the record since we don't have the cono/cono2 properties available
         var params = {
            wtno: GridService.getSelectedRecords(base.grid)[0].wtno,
            wtsuf: GridService.getSelectedRecords(base.grid)[0].wtsuf
         };

         DataService.get('api/wt/wteh/getbypk', { params: params }, function (data) {
            if (data) {
               self.quickViewContinue(data);
            }
         });
      }
   };

   self.quickRecv = function () {
      $state.go('wtei.quickrcv', { isNavBack: false });
   };

});

app.controller('WteiQuickRecvCtrl', function ($scope, $state, $stateParams, $translate, DataService, RecoveryService, AuthService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   self.blNavigate = false;
   self.receivedItems = [];
   base.activeView = '';
   self.wteiSelectWtTemp = {};
   self.isValidStage = true;
   self.qrwtno = '0-00';

   self.getWtehRecordWithAccess = function (wtorder, isSkipCheckAccess) {
      //Reset WTStage check
      self.isValidStage = true;

      var splitWt = wtorder.split('-');

      var params = { wtno: splitWt[0], wtsuf: splitWt[1] };

      DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.qrwteh = data;

            self.qrwteh.transtype = (self.qrwteh.transtype.toUpperCase() === 'WT') ? $translate.instant('global.warehouse.transfer') : $translate.instant('global.direct.order');

            //If we're simply refreshing after the Full Receipt, don't make this backend call.  If it's made,
            //the user will get an error that the stage is incorrect.
            if (!isSkipCheckAccess) {
               //Check Record Access
               var params = {
                  iWTno: self.qrwteh.wtno,
                  iWTsuf: self.qrwteh.wtsuf
               };
               DataService.get('api/wt/aswtentry/wteicheckaccess/{iWTno}/{iWTsuf}', { pathParams: params, busy: true },
                  function (data) {
                     if (data) {
                        self.blNavigate = false;
                     }
                  },
                  function errorCallback(errorMessage) {
                     self.isValidStage = (errorMessage.Message) ? false : true;
                  });
            }
         }
      });
   };

   if ($stateParams.wtno) {
      if ($stateParams.wtno.toString().includes('-')) {
         self.qrwtno = $stateParams.wtno; // Some places send the suffix already with the wtno - like quick view
      } else if ($stateParams.wtsuf) {
         self.qrwtno = $stateParams.wtno + '-' + Utils.pad($stateParams.wtsuf, 2);
      } else {
         self.qrwtno = $stateParams.wtno + '-00';  // Sometimes no suffix is sent back, so 00 is assumed
      }
      $stateParams.wtno = null;
      $stateParams.wtsuf = null;
      if ($stateParams.isRefreshWTOrder) {
         self.getWtehRecordWithAccess(self.qrwtno.toString(), true);
      } else {
         self.getWtehRecordWithAccess(self.qrwtno.toString(), false);
      }
      $stateParams.isRefreshWTOrder = false;
   } else {
      self.qrwtno = '0-00';
   }

   self.isJournalOpen = function () {
      return base.journalControl.isJournalOpen();
   };

   self.qrWtOrderChanged = function () {
      if (self.qrwtno) {
         self.getWtehRecordWithAccess(self.qrwtno.toString(), false);
      } else {
         self.qrwteh = { transtype: '', stagecd: null };
      }
   };

   self.qrDetail = function () {
      if (self.isValidStage) {
         if (!(base.journal && base.journal.gJrnlno !== 0)) {
            base.journalControl.showOpenView(function () {
               self.checkDetailAccess(self.qrwteh);
            });
         } else {
            self.checkDetailAccess(self.qrwteh);
         }
      } else {
         MessageService.error('global.error', 'error.stage.not.valid.5659');
      }
   };

   self.checkDetailAccessContinue = function () {
      DataService.post('api/wt/aswtentry/wteiallowdetailaccess/', { data: self.wteiSelectWtTemp, busy: true }, function (data) {
         if (data) {
            self.qrwteh.isQuickRecv = true;
            base.qrshiptowhse = self.qrwteh.shiptowhse;
            base.qrwtno = self.qrwteh.wtno;
            $state.go('^.detail', { wtno: self.qrwteh.wtno, wtsuf: self.qrwteh.wtsuf, jrnlno: self.qrwteh.jrnlno, prevState: $state.current.name });
         }
      });
   };

   self.authPointPassed = function () {
      self.checkDetailAccessContinue();
   };

   self.authPointFailed = function () {
      //Nothing to do.
   };

   self.checkDetailAccess = function (record) {
      self.wteiSelectWtTemp = { tocono: record.cono2, fromcono: record.cono, jrnlno: base.journal.gJrnlno, wtno: record.wtno, wtsuf: record.wtsuf };
      if (base.wlAuthNeeded) {
         AuthService.createAuthPoint('wlord', '', '', '', '', null, self.authPointPassed, self.authPointFailed);
      } else if (base.esbAuthNeeded) {
         AuthService.createAuthPoint('esbwl', '', '', '', '', null, self.authPointPassed, self.authPointFailed);
      } else {
         self.checkDetailAccessContinue();
      }
   };

   self.checkForAuthorization = function () {
      if (base.wlAuthNeeded) {
         // need to implement authpoint fail case [CreateAuthPoint]
         //authPoint check pass case
         AuthService.createAuthPoint('wlord', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
      } else if (base.esbAuthNeeded) {
         //authPoint check
         // need to implement authpoint fail case [CreateAuthPoint]
         AuthService.createAuthPoint('esbwl', '', '', '', '', null, self.recoveryAuthPointPassed, self.recoveryAuthPointFailed);
      } else {
         if (self.blNavigate) {
            if (self.qrwteh) {
               self.qrwteh.isQuickRecv = true;
               $state.go('^.detail', { wtno: self.qrwteh.wtno, wtsuf: self.qrwteh.wtsuf, jrnlno: self.qrwteh.jrnlno });
            }
         } else {
            self.executeFullReceipt();
         }
      }
   };

   self.recoveryAuthPointPassed = function () {
      if (!self.blNavigate) {
         self.executeFullReceipt();
      } else {
         if (base.wteiMasterSelectedRecord) {
            $state.go('^.detail', { wtno: base.wteiMasterSelectedRecord.wtno, wtsuf: base.wteiMasterSelectedRecord.wtsuf, jrnlno: (base.journal ? base.journal.gJrnlno : null) });
         }
      }
   };

   self.recoveryAuthPointFailed = function () {
      //Nothing need to be Done on fail.
   };

   self.executeFullReceipt = function () {
      var wteiReceipts = [];
      wteiReceipts.push({
         wtno: self.qrwteh.wtno,
         wtsuf: self.qrwteh.wtsuf,
         jrnlno: base.journal.gJrnlno,
         shiptowhse: self.qrwteh.shiptowhse,
         towhse: base.criteria.towhse
      });

      if (wteiReceipts) {
         DataService.post('api/wt/aswtentry/wteifullreceipt', { data: wteiReceipts, busy: true }, function (data) {
            if (data) {
               if (data.messaging.length > 0) {
                  MessageService.processMessaging(data.messaging);
               }

               if (data.wteiselectwt && data.wteiselectwt.length > 0) {
                  data.wteiselectwt.forEach(function (rec) {
                     self.receivedItems.push({
                        wtno: rec.wtno,
                        wtsuf: rec.wtsuf
                     });
                  });
               }
               // Add to recovery
               if (base.recoveryData !== base.criteria.towhse && base.journal.gJrnlno) {
                  RecoveryService.updateRecoveryRecord(base.MENU_FUNCTION_WTEI, base.journal.gJrnlno, base.journal.gJrnlno, base.recoveryData, base.criteria.towhse);
                  base.recoveryData = base.criteria.towhse;
                  if (base.journal) {
                     base.journalControl.setRecoveryData(base.criteria.towhse);
                  }
               }

               base.qrshiptowhse = self.qrwteh.shiptowhse;
               base.qrwtno = self.qrwtno;
               //We're just refreshing some data with this call, so don't do the logic to do the validation if
               //it can be received.  That's the purpose of that 2nd parameter.
               self.getWtehRecordWithAccess(self.qrwtno.toString(), true);

               //Walk thru each row (should be just one from here) and update the WT with the new Status.
               data.wteiselectwt.forEach(function (row) {
                  base.updateMainWTList(row);
               });

               var fullRcptMsg = $translate.instant('global.warehouse.transfer.number') + $translate.instant('symbol.colon') + ' ' + self.qrwtno + ' ' + $translate.instant('message.has.been.received.in.full');
               MessageService.info('global.information', fullRcptMsg);
            }
         });
      }

   };

   self.qrFullRcpt = function () {
      if (self.isValidStage) {
         if (self.isJournalOpen()) {
            //check access
            self.checkForAuthorization();
         } else {
            base.journalControl.showOpenView(function () {
               self.qrFullRcpt();
            });
         }
      } else {
         MessageService.error('global.error', 'error.stage.not.valid.5659');
      }
   };

   self.qrCancelRecvWork = function () {
      if (self.isValidStage) {
         var wtReceipts = [];

         if (self.isJournalOpen()) {

            wtReceipts.push(self.qrwteh);

            var receipt = { wteicancelreceipt: wtReceipts, iJrnlNo: base.journal.gJrnlno };
            DataService.post('api/wt/aswtentry/wteicancelreceipt', { data: receipt, busy: true }, function (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  var distinctList = (JSLINQ(wtReceipts).Where(function (rcpt) {
                     return (JSLINQ(self.receivedItems).Any(function (rcry) {
                        return rcry.wtno === rcpt.wtno && rcry.wtsuf === rcpt.wtsuf;
                     }));
                  }).ToArray());

                  if (distinctList) {
                     self.receivedItems.splice(0, distinctList.length);
                  }

                  //Walk thru each row (will just be one) and update the WT with the new Status.
                  data.wteicancelreceipt.forEach(function (row) {
                     base.updateMainWTList(row);
                  });

                  //We're just refreshing some data with this call, so don't do the logic to do the validation if
                  //it can be received.  That's the purpose of that 2nd parameter.
                  self.getWtehRecordWithAccess(self.qrwtno.toString(), true);

                  var fullRcptMsg = $translate.instant('message.the.receiving.work.for.warehouse.transfer') + $translate.instant('symbol.colon') + ' ' + self.qrwtno + ' ' + $translate.instant('message.has.been.cancelled');
                  MessageService.info('global.information', fullRcptMsg);
               }
            });
         } else {
            base.journalControl.showOpenView(function () {
               self.qrCancelRecvWork();
            });
         }
      } else {
         MessageService.error('global.error', 'message.no.valid.journal.number.is.available');
      }
   };

   self.qrFinalUpdate = function () {
      if (self.isValidStage) {
         if (self.isJournalOpen()) {
            base.initiateFinalUpdate(false, self.qrwteh.shiptowhse, self.qrwtno);
         } else {
            base.journalControl.showOpenView(function () {
               self.finalUpdate();
            });
         }
      } else {
         MessageService.error('global.error', 'global.no.journal.open');
      }
   };

   self.qrQuickView = function () {
      $state.go('wtei.quickview', { wtno: self.qrwteh.wtno, wtsuf: self.qrwteh.wtsuf, cono: self.qrwteh.cono, cono2: self.qrwteh.cono2, prevState: $state.current.name });
   };

});

app.controller('WteiDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils, TabService, AodataService, SecurityService) {
   var base = $scope.base;
   var self = this;
   self.isSerialEnable = false;
   self.wtLineResults = [];
   self.wtLinesGrid = {};
   self.wtei = {};
   self.selectedWTLineItem = {};
   self.isDetailSelectedDefaultTabLine = true;
   base.activeView = '';
   self.prevState = $stateParams.prevState;

   self.isWtNonDo = AodataService.getValue('IC', 'ICReqWTSerialFl').toUpperCase();

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('wtei', 'Header') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('wtei', 'Line Items') < 3;

   self.isDetail = function () {
      return $state.is('wtei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wtei.detail');
   };

   self.getSubTitleFullWtNumber = function (wtno, wtsuf) {
      return MessageService.get('global.warehouse.transfer.number') + ': ' + base.getFullWTNumber(wtno, wtsuf);
   };

   if ($stateParams.wtno) {
      self.wtei = base && base.wteiMasterSelectedRecord && base.wteiMasterSelectedRecord.shipfmwhse ? angular.copy(base.wteiMasterSelectedRecord) : (base && base.wteiHeader && base.wteiHeader.shipfmwhse ? angular.copy(base.wteiHeader) : {});
      self.wtei.wtno = $stateParams.wtno;
      self.wtei.wtsuf = $stateParams.wtsuf;
      self.wtei.jrnlno = $stateParams.jrnlno;
   } else {
      self.wtei = base.wteiMasterSelectedRecord;
      self.wtei.jrnlno = base.journal.gJrnlno;
   }

   self.wtei.wtNumber = base.getFullWTNumber(self.wtei.wtno, self.wtei.wtsuf);

   self.getSubTitle = function () {
      return self.getSubTitleFullWtNumber(self.wtei.wtno, self.wtei.wtsuf);
   };

   // Need to load the line items first because that is where the lock checks are done
   self.loadLineItems = function () {
      if (self.wtei && self.wtei.wtno && base.journal.gJrnlno) {
         DataService.get('api/wt/aswtentry/wteilinelist/' + self.wtei.wtno + '/' + self.wtei.wtsuf + '/' + base.journal.gJrnlno, { busy: true }, function (data) {
            if (data) {
               self.wtLineResults = data;
               if (self.wtei && self.wtei.wtno && self.wtLineResults) {
                  DataService.get('api/wt/aswtentry/wtesheaderretrieve/' + self.wtei.wtno + '/' + self.wtei.wtsuf, {
                     busy: true
                  }, function (data) {
                     if (data) {
                        self.wteiHeader = data;
                        self.wteiHeader.rushValue = data.rushfl ? 'Rush' : 'No Rush';
                        base.wteiHeader = data;
                        base.wteiHeader.wtsuf = data.wtsuf === 0 ? Utils.pad(data.wtsuf, 2) : data.wtsuf;
                     }
                  });
               }
            }
         }, function () {
            $state.go(self.prevState, { wtno: base.wteiHeader.wtno, wtsuf: base.wteiHeader.wtsuf });
         });
      }
   };

   self.lineExtend = function () {
      var selectedLineExtend = GridService.getSelectedRecord(self.wtLinesGrid);
      $state.go('^.lineextend', {
         wteiLineExtend: selectedLineExtend,
         parentCallingState: self.prevState
      });
   };

   self.cancelReceiveWork = function () {
      if (base.wteiHeader && base.journal.gJrnlno) {
         var receiptCollection = [];
         receiptCollection.push({
            wtno: base.wteiHeader.wtno,
            wtsuf: base.wteiHeader.wtsuf
         });
         var receipt = { wteicancelreceipt: receiptCollection, iJrnlNo: base.journal.gJrnlno };
         DataService.post('api/wt/aswtentry/wteicancelreceipt', { data: receipt, busy: true }, function (data) {
            if (data && data.messaging.length === 0) {
               //self.receivedItems.push(data);

               //Update the Grid with the latest.
               base.updateMainWTList(data.wteicancelreceipt);

               $state.go(self.prevState, { wtno: base.wteiHeader.wtno, wtsuf: base.wteiHeader.wtsuf });

            } else {
               MessageService.processMessaging(data.messaging);
            }
         });
      }
   };

   self.navBack = function () {
      MessageService.yesNo('global.question', 'question.selecting.back.will.cancel.receiving.on.wt',
         // Yes processing
         function () {
            self.cancelReceiveWork();
         });
   };

   self.serialLot = function () {
      var record = GridService.getSelectedRecord(self.wtLinesGrid);
      if (record) {
         if (record.serlottype.toUpperCase() === 'S' && (record.icsnpofl || self.isWtNonDo === 'YES')) {
            $state.go('.serial', { lineDetail: record, prevState: self.prevState });
         } else if (record.serlottype.toUpperCase() === 'L') {
            $state.go('.lot', { lineDetail: record, prevState: self.prevState });
         }
      }
   };

   self.updateLineItem = function (record) {
      if (record) {
         var wteiLineUpdate = {};
         wteiLineUpdate.nonstockty = record.nonstockty;
         wteiLineUpdate.poeirowid = record.poeirowid;
         wteiLineUpdate.qtyrcv = record.qtyrcv;
         wteiLineUpdate.qtyunavail = record.qtyunavail;
         wteiLineUpdate.reasunavty = record.reasunavty;
         wteiLineUpdate.sortbinloc = record.sortbinloc;

         //User Hook (do not rename)
         if (self.setWteiLineUpdateCriteria) {
            self.setWteiLineUpdateCriteria(record, wteiLineUpdate);
         }

         DataService.post('api/wt/aswtentry/wteilineupdate', { data: wteiLineUpdate, busy: true }, function (data) {
            if (data) {
               MessageService.alert(data);
            } else {
               if (self.wtei && self.wtei.wtno) {
                  DataService.get('api/wt/aswtentry/wtesheaderretrieve/' + self.wtei.wtno + '/' + self.wtei.wtsuf, { busy: true }, function (data) {
                     if (data) {
                        self.wteiHeader = data;
                        self.wteiHeader.rushValue = data.rushfl ? 'Rush' : 'No Rush';
                        base.wteiHeader = data;
                        base.wteiHeader.wtsuf = data.wtsuf === 0 ? Utils.pad(data.wtsuf, 2) : data.wtsuf;
                     }
                  });
               }
            }
         });
      }
   };

   //User Hook (do not rename)
   self.lineItemCellChangeContinue = function (record) {
      self.updateLineItem(record);
   };

   self.lineItemCellChange = function (e, args) {
      var newValue = args.value;
      var oldValue = args.oldValue;
      var fieldChanged = args.column.field;
      var record = self.wtLineResults[args.row];

      if (fieldChanged && fieldChanged === 'qtyrcv' && newValue !== oldValue) {
         if (record && record.qtyrcv) {
            // Temporary calculation of received stocking quantity fro the extend screen
            // This should be good since going to 2 decimals, if not good enough then wteilineupdate will need to return the stkqtyrcv it calculates
            record.stkqtyrcv = record.conv ? record.qtyrcv * record.conv : record.qtyrcv;
         }
         if (record.verrcvchgfl && record.qtyrcv !== record.qtyship) {
            MessageService.alertOk('global.alert', 'message.discrepancy.from.wt.please.verify.changes.made', function () {
               //OkCallback
               //User Hook (do not rename)
               self.lineItemCellChangeContinue(record);
            });
         } else {
            self.updateLineItem(record);
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      } else if (newValue !== oldValue) {
         self.updateLineItem(record);
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      }
   };

   self.lineItemSelection = function () {
      if (self.wtLinesGrid) {
         self.selectedWTLineItem = GridService.getSelectedRecord(self.wtLinesGrid);
      }
   };

   self.lineWarehouse = function () {

      var wteiRecord = GridService.getSelectedRecord(self.wtLinesGrid);

      if (wteiRecord) {
         var wmbinassignCriteria = {
            altwhse: '',
            currproc: 'wtei',
            jrnlno: wteiRecord.jrnlno,
            kitfl: false,
            lineno: wteiRecord.lineno,
            orderno: wteiRecord.pono,
            ordersuf: wteiRecord.posuf,
            ourproc: 'wtei',
            ordertype: 't',
            prod: wteiRecord.shipprod,
            returnfl: false,
            seqno: 0,
            stkqtyship: 0,
            skipnonkitlogic: false,
            stkqtyrcv: wteiRecord.stkqtyrcv,
            unit: wteiRecord.unit,
            vamodule: '',
            wmqtyrcv: 0,
            wmadjtype: 'buy',
            whse: self.wteiHeader.shiptowhse
         };

         $state.go('.bin-allocation', {
            criteria: wmbinassignCriteria,
            binAllocationDisabled: false,
            submittedCallback: 'dtl.binAllocationSaved',
            actionsCallback: 'dtl.binAllocationActions'
         });
      }
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSaved = function (wmbinassignment) {
      $state.go('wtei.detail');
      base.search();
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActions = function (wmbinassignment) {
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
      // wmbinassignment nothing to do with this function for now as per the silverlight coding.
   };

   // Save
   self.submit = function () {
      var aswtentryWTESHeaderUpdateRequestAPI = { wthdr: self.wteiHeader, cFunctionName: 'wtei' };
      DataService.post('api/wt/aswtentry/wtesheaderupdate', { data: aswtentryWTESHeaderUpdateRequestAPI, busy: true }, function (data) {
         if (data.messaging.length > 0) {
            MessageService.processMessaging(data.messaging);
         }
         base.qrshiptowhse = data.wthdr.shiptowhse;
         base.qrwtno = data.wthdr.wtno;
         //Update the WT with the new Status.
         base.updateMainWTList(data.wthdr);

         $state.go(self.prevState, { wtno: data.wthdr.wtno, wtsuf: data.wthdr.wtsuf, isRefreshWTOrder: true });

         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };

   self.loadLineItems();

});

app.controller('WteiFinalUpdateSubmitCtrl', function ($scope, $state, $stateParams, DataService, MessageService, RecoveryService) {
   var base = $scope.base;
   var self = this;
   self.wteiUpdate = $stateParams.wteiUpdate;
   self.prevState = $stateParams.prevState;
   self.wtno = $stateParams.wtno;
   base.activeView = 'finalupdate';

   self.getSubTitle = function () {
      if (base.journal) {
         return MessageService.get('global.journal.number') + base.LABEL_DELIMITER + base.journal.gJrnlno + base.SUBMENU_DELIMITER +
            MessageService.get('global.warehouse') + base.LABEL_DELIMITER + (base.criteria.towhse ? base.criteria.towhse : self.wteiUpdate.whse);
      }
   };

   self.validateFinalSubmit = function () {

      //NOTE: Due to the different fields on the screen based on the dropdowns, UI side validation won't work with the submit-form.
      //If the user were to hit OK while the print type is a printer but then changes the type to a file, then they will get phantom
      //errors on a non-visible field.
      var isValid = true;

      if (!self.wteiUpdate.receiptsprinter || self.wteiUpdate.receiptsprinter.length === 0) {
         isValid = false;
         if (self.wteiUpdate.receiptstype === base.PRINT_TYPE_FILE) {
            MessageService.error('global.error', 'message.receipt.file.is.required');
         } else {
            MessageService.error('global.error', 'message.receipt.printer.is.required');
         }
      }

      if ((!self.wteiUpdate.pickprinter || self.wteiUpdate.pickprinter.length === 0) && self.wteiUpdate.allowpickfl) {
         isValid = false;
         if (self.wteiUpdate.picktype === base.PRINT_TYPE_FILE) {
            MessageService.error('global.error', 'message.pick.file.is.required');
         } else {
            MessageService.error('global.error', 'message.pick.printer.is.required');
         }
      }

      if (isValid) {

         //User Hook (do not rename)
         if (self.setWteiFinalUpdateCriteria) {
            self.setWteiFinalUpdateCriteria(self.wteiUpdate);
         }

         // Validations need to be handled here before final update.
         DataService.post('api/wt/aswtentry/wteiupdatefinal', { data: self.wteiUpdate, busy: true }, function (data) {
            if (data) {
               RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_WTEI, base.journal.gJrnlno, base.recoveryData);
               MessageService.info('global.information', 'message.final.update.completed.successfully');
               base.closeJournalAfterFinalUpdate();

               if (self.prevState === 'wtei.quickrcv') {
                  $state.go('wtei.quickrcv', { wtno: null });
               } else {
                  //This condition is kept not to refresh search if towhse is empty after completing the final update.
                  if (base.criteria.towhse) {
                     $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                  } else {
                     $state.go('^.master', { refreshSearch: false }, { reload: '^.master' });
                  }
               }
               self.receivedItems = [];
            }
         });
      }
   };

   self.cancel = function () {
      base.activeView = '';
      if (self.prevState === 'wtei.quickrcv') {
         $state.go('wtei.quickrcv', { wtno: self.wtno });
      } else {
         $state.go('^.master', { refreshSearch: false }, { reload: '^.master' });
      }
   };

});

app.controller('WteiLineExtendCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   base.activeView = '';
   self.wteiSelectedLineExtend = $stateParams.wteiLineExtend;
   self.parentCallingState = $stateParams.parentCallingState;

   // Save
   self.submit = function () {
      if (self.wteiSelectedLineExtend) {
         self.wteiUpdate = {
            nonstockty: self.wteiSelectedLineExtend.nonstockty,
            poeirowid: self.wteiSelectedLineExtend.poeirowid,
            qtyrcv: self.wteiSelectedLineExtend.qtyrcv,
            sortbinloc: self.wteiSelectedLineExtend.sortbinloc,
            qtyunavail: self.wteiSelectedLineExtend.qtyunavail,
            reasunavty: self.wteiSelectedLineExtend.reasunavty
         };
      }
      DataService.post('api/wt/aswtentry/wteilineextendupdate', { data: self.wteiUpdate, busy: true }, function (data) {
         if (data.cWarningMessage) {
            MessageService.alertOk('global.warning', data.cWarningMessage);
         } else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            self.navBack();
         }
      });
   };

   self.navBack = function () {
      $state.go('^.detail', { wtno: base.wteiHeader.wtno, wtsuf: base.wteiHeader.wtsuf, jrnlno: self.wteiSelectedLineExtend.jrnlno, prevState: self.parentCallingState });
   };
});

app.controller('WteiSerialCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.prevState = $stateParams.prevState;
   var base = $scope.base;
   base.activeView = '';
   var dtl = $scope.dtl;
   self.lineDetail = {};
   self.lineDetail = $stateParams.lineDetail;

   self.getSerialSubTitle = function () {
      return MessageService.get('global.warehouse.transfer.number') + base.LABEL_DELIMITER + base.getFullWTNumber(base.wteiHeader.wtno, base.wteiHeader.wtsuf) + base.SUBMENU_DELIMITER +
         MessageService.get('global.line.number') + base.LABEL_DELIMITER + self.lineDetail.lineno;
   };

   self.createIcEntrySerialsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            callingState: self.prevState,
            whse: base.wteiHeader.shiptowhse,
            prod: self.lineDetail.shipprod,
            type: 'WT',
            orderno: base.wteiHeader.wtno,
            ordersuf: base.wteiHeader.wtsuf,
            lineno: self.lineDetail.lineno,
            linenochar: self.lineDetail.lineno,
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: true,
            origqty: self.lineDetail.stkqtyrcv,
            proofqty: resp.dNoSNLots,
            ordqty: self.lineDetail.stkqtyord,
            outqty: self.lineDetail.stkqtyship,
            ictype: base.wteiHeader.wttype,
            cost: self.lineDetail.eachprice,
            qtyunavail: self.lineDetail.qtyunavail,
            method: '',
            retorderno: 0,
            retordersuf: 0,
            retlineno: 0,
            returnty: '',
            reasunavty: '',
            custno: 0,
            shipto: 0,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: base.wteiHeader.cono2,
            shipfmwhse: base.wteiHeader.shipfmwhse,
            shiptowhse: base.wteiHeader.shiptowhse,
            jrnlno: self.lineDetail.jrnlno,
            ourproc: 'wtei',
            icspecrecno: self.lineDetail.icspecrecno,
            assignoldest: true,
            currproc: 'wtei',
            seqdash: "0",
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: self.lineDetail.proddesc,
            prodnotesfl: ''
            //btncreateenabled : true
         };
         return criteria;
      }
   };

   self.serialControlReady = function () {
      DataService.get('api/wt/aswtentry/wteidetaillinecheckserlot?iWtno=' + base.wteiHeader.wtno + '&iWtsuf=' + base.wteiHeader.wtsuf + '&iLineno=' + self.lineDetail.lineno + '&cSerlottype=' + self.lineDetail.serlottype + '&lIcsnpofl=' + self.lineDetail.icsnpofl + '&dStkqtyrcv=' + self.lineDetail.stkqtyrcv + '&lIsFromMenu=' + true, {
         busy: true
      }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(data);

            var criteria = {
               icentryserialslist: [],
               icentryserialscriteria: self.icEntrySerialsCriteria
            };

            // Call initialize method on the Shared-Serials-Ctrl
            self.serialsControl.initialize(criteria);
         }
      });
   };

   self.serialDoneCallback = function () {
      //TO:DO Need to find out this below peice of code is required or not.
      //if (self.IsAdjustQtyShip) {
      //   WTEILineGetSerialLotChanges(); // Need to run API call WTEILineGetSerialLotChanges and then update line item using the call [WTEILineUpdate]
      //}
      var param = { iWTno: base.wteiHeader.wtno, iWTsuf: base.wteiHeader.wtsuf, iJrnlNo: base.journal.gJrnlno, iLineNo: self.lineDetail.lineno };
      DataService.get('api/wt/aswtentry/wteilinegetseriallotchanges/{iWTno}/{iWTsuf}/{iJrnlNo}/{iLineNo}', { pathParams: param, busy: true }, function (data) {
         if (data) {

            self.lineDetail.qtyrcv = data.qtyrcv;
            self.lineDetail.stkqtyrcv = data.stkqtyrcv;
            self.lineDetail.nosnlots = data.nosnlots;
            self.lineDetail.qtyunavail = data.qtyunavail;
            self.lineDetail.cancelfl = data.cancelfl;

            var record = self.lineDetail;
            dtl.updateLineItem(record);

            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^');
         }
      });
   };
});

app.controller('WteiLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.prevState = $stateParams.prevState;
   var base = $scope.base;
   base.activeView = '';
   var dtl = $scope.dtl;
   self.lineDetail = {};
   self.lineDetail = $stateParams.lineDetail;

   self.getLotSubTitle = function () {
      return MessageService.get('global.warehouse.transfer.number') + base.LABEL_DELIMITER + base.getFullWTNumber(base.wteiHeader.wtno, base.wteiHeader.wtsuf) + base.SUBMENU_DELIMITER +
         MessageService.get('global.line.number') + base.LABEL_DELIMITER + self.lineDetail.lineno;
   };

   self.createIcEntryLotsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            callingState: self.prevState,
            whse: base.wteiHeader.shiptowhse,
            prod: self.lineDetail.shipprod,
            type: 'WT',
            orderno: base.wteiHeader.wtno,
            ordersuf: base.wteiHeader.wtsuf,
            lineno: self.lineDetail.lineno,
            linenochar: self.lineDetail.lineno,
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: true,
            origqty: self.lineDetail.stkqtyrcv,
            proofqty: resp.dNoSNLots,
            ordqty: self.lineDetail.stkqtyord,
            outqty: self.lineDetail.stkqtyrcv,
            ictype: base.wteiHeader.wttype,
            cost: self.lineDetail.eachprice,
            qtyunavail: self.lineDetail.qtyunavail,
            method: '',//Loadwtlinesettings.cWTLotEntTy, call
            retorderno: 0,
            retordersuf: 0,
            retlineno: 0,
            returnty: '0',
            reasunavty: '',
            custno: 0,
            shipto: 0,
            vendno: 0,
            wosuf: 0,
            cono2: base.wteiHeader.cono2,
            shipfmwhse: base.wteiHeader.shipfmwhse,
            shiptowhse: base.wteiHeader.shiptowhse,
            jrnlno: base.journal.gJrnlno,
            ourproc: 'wtei',
            icspecrecno: self.lineDetail.icspecrecno,
            assignoldest: 'y',
            currproc: 'wtei',
            seqdash: "0",
            rettext: '',
            kplabel: '',
            wono: 0,
            wonosuf: '',
            origqtylabel: '',
            proddesc: self.lineDetail.proddesc,
            prodnotesfl: ''
         };
         return criteria;
      }
   };

   self.lotControlReady = function () {
      DataService.get('api/wt/aswtentry/wteidetaillinecheckserlot?iWtno=' + base.wteiHeader.wtno + '&iWtsuf=' + base.wteiHeader.wtsuf + '&iLineno=' + self.lineDetail.lineno + '&cSerlottype=' + self.lineDetail.serlottype + '&lIcsnpofl=' + self.lineDetail.icsnpofl + '&dStkqtyrcv=' + self.lineDetail.qtyrcv + '&lIsFromMenu=' + true, {
         busy: true
      }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(data);

            //var criteria = {
            //   icentrylotslist: [],
            //   icentrylotscriteria: self.icEntryLotsCriteria
            //};

            // Call initialize method on the Shared-Lots-Ctrl
            self.lotsControl.initialize(self.icEntryLotsCriteria);
         }
      });
   };

   self.lotDoneCallback = function () {

      var param = { iWTno: base.wteiHeader.wtno, iWTsuf: base.wteiHeader.wtsuf, iJrnlNo: base.journal.gJrnlno, iLineNo: self.lineDetail.lineno };
      DataService.get('api/wt/aswtentry/wteilinegetseriallotchanges/{iWTno}/{iWTsuf}/{iJrnlNo}/{iLineNo}', { pathParams: param, busy: true }, function (data) {
         if (data) {

            self.lineDetail.qtyrcv = data.qtyrcv;
            self.lineDetail.stkqtyrcv = data.stkqtyrcv;
            self.lineDetail.nosnlots = data.nosnlots;
            self.lineDetail.qtyunavail = data.qtyunavail;
            self.lineDetail.cancelfl = data.cancelfl;

            var record = self.lineDetail;
            dtl.updateLineItem(record);

            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^');
         }
      });
   };
});