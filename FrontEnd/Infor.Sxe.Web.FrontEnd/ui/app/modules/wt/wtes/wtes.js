'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('wt', 'wtes', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('wt', 'wtes');
   BinAllocationStateProvider.addStates('wt', 'wtes', 'wtes.detail');

   $stateProvider.state('wtes.detail', {
      url: '/detail',
      params: {
         id: null,
         callingState: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtes/detail.json');
            },
            controller: 'WtesDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('wtes.quickview', {
      url: '/quick-view',
      params: {
         wtno: null,
         wtsuf: null,
         cono: null,
         cono2: null,
         prevState: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/shared/quickview/quickview.json');
            },
            controller: 'WtQuickViewCtrl as quickview'
         }
      }
   });

   $stateProvider.state('wtes.serial', {
      url: '/serial',
      params: {
         lineDetail: null,
         callingState: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtes/wtes-serial.json');
            },
            controller: 'WtesSerialCtrl as sl'
         }
      }
   });

   $stateProvider.state('wtes.lot', {
      url: '/lot',
      params: {
         lineDetail: null,
         callingState: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtes/wtes-lot.json');
            },
            controller: 'WtesLotCtrl as lt'
         }
      }
   });

   $stateProvider.state('wtes.finalupdate', {
      url: '/final-update',
      params: {
         callingState: null,
         prod: null,
         whse: null,
         wteiUpdate: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtes/final-update-submit.json');
            },
            controller: 'WtesWteiFinalUpdateCtrl as upd'
         }
      }
   });

   $stateProvider.state('wtes.quickship', {
      url: '/quick-ship',
      params: { wtno: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtes/quick-ship.json');
            },
            controller: 'WtesQuickShipCtrl as qs'
         }
      }
   });

});

app.controller('WtesBaseCtrl', function ($state, $stateParams, $translate, AuthService, DataService, GridService, MessageService, RecoveryService, SecurityService, Utils, ConfigService, UserService, Sasoo) {
   var self = this;
   self.wteh = {};
   self.LABEL_DELIMITER = ': ';
   self.DOCUMENT_DELIMITER = '-';
   self.MENU_FUNCTION_WT_SHIPPING = 'wtes';
   self.MENU_FUNCTION_WT_RECEIVING = 'wtei';
   self.SUBMENU_WTES_HEADER = 'Header';
   self.SUBMENU_WTES_LINES = 'Line Items';
   self.AUTO_RECEIVE_MODE = true;
   self.NOT_AUTO_RECEIVE_MODE = false;
   self.QUICK_SHIP_MODE = true;
   self.NOT_QUICK_SHIP_MODE = false;
   self.NAVIGATE_TO_DETAILS_MODE = true;
   self.NOT_NAVIGATE_TO_DETAILS_MODE = false;
   self.companyNumber = UserService.getCono();
   self.criteria = { tocono: self.companyNumber, stagelist: '2', shipfmwhse: '' };
   self.shippedTransfers = [];
   self.wteiListResults = [];
   self.includewtfl = true;
   self.includedofl = true;
   self.ismodwlfl = false;
   self.isanywhsefl = false;
   self.isanyesbfl = false;
   self.isanyrcvonlyfl = false;
   self.securitySubLevelHeader = 0;
   self.securitySubLevelLines = 0;
   self.isDetailSelectedDefaultTabLine = true;
   self.autoReceiveList = [];
   self.wteiSelectWt = [];
   var isWlAuthRunning = false;
   var isEsbAuthRunning = false;
   var isWlAuthNeeded = false;
   var isEsbAuthNeeded = false;
   self.journalNumberClosing = 0;
   self.isHomeWhse = Sasoo.homewhsefl;
   self.homeWhse = Sasoo.whse;

   //This is the official List that is used when we are ready for the final update.  We add to it in the
   //UI, but the Shipping call also may add to it for a Fabrication warehouse.
   self.wtesAutoRcvList = [];

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      openedCallback: 'base.journalOpened',
      closedCallback: 'base.journalClosed',
      beforeCloseCallback: 'base.journalBeforeClose',
      criteria: {
         currproc: self.MENU_FUNCTION_WT_SHIPPING,
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
      return $state.is('wtes.master');
   };

   self.includesMaster = function () {
      return $state.includes('wtes.master');
   };

   self.isDetail = function () {
      return $state.is('wtes.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wtes.detail');
   };

   self.setDefaultWarehouse = function () {
      if (self.isHomeWhse) {
         self.criteria.shipfmwhse = self.homeWhse;
      } else {
         self.criteria.shipfmwhse = '';
      }
   };

   self.journalOpened = function (journal, userOpened) {
      //Not Reopened Journal (i.e. not in recovery mode)
      if (userOpened) {
         if (self.journalControl) {
            RecoveryService.createRecoveryRecord(self.MENU_FUNCTION_WT_SHIPPING, self.journal.gJrnlno, '');
         }
      }
   };

   self.journalClosed = function () {
      if (self.journalNumberClosing > 0) {
         RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_WT_SHIPPING, self.journalNumberClosing, '');
      }
   };

   self.journalBeforeClose = function () {
      if (self.journal.gJrnlno !== 0) {
         //Save Journal off for some processing after the journal is closed (i.e. clean up recovery record).
         self.journalNumberClosing = self.journal.gJrnlno;

         self.finalUpdate();
      }
      // Prevent journal from closing.  Instead we will call finalUpdate and handle the closing there.
      return false;
   };

   self.initCriteria = function () {
      self.criteria.irecordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   self.initCriteria();

   self.getSubTitle = function () {
      var subTitle = '';

      if (self.wteh.wtno) {
         subTitle = $translate.instant('global.warehouse.transfer.number') + self.LABEL_DELIMITER +
            self.wteh.wtno + self.DOCUMENT_DELIMITER + Utils.pad(self.wteh.wtsuf, 2);
      }

      return subTitle;
   };

   self.executeCloseJournal = function () {
      //Close the Journal, but do not call the callback, otherwise you'll get in an endless loop.
      self.journalControl.closeJournal(true);
   };

   //This is used for keeping track if any WT's that are 'Ship and AutoReceive'.  This 
   //collection will be used when the user clicks 'Final Update'.
   self.addToAutoReceiveList = function (wtesShipTransferList, isFromQuickRcv) {
      var distinctList = JSLINQ(wtesShipTransferList).Where(function (ship) {
         return !JSLINQ(self.wtesAutoRcvList).Any(function (shippedAndAutoRcvd) {
            return shippedAndAutoRcvd.wtno === ship.wtno && shippedAndAutoRcvd.wtsuf === ship.wtsuf;
         });
      }).ToArray();
      distinctList.forEach(function (item) {
         // If coming from Quick Ship will be a single WT (DO or ICSD Auto Receive) and can receive
         if (isFromQuickRcv) {
            self.wtesAutoRcvList.push(item);
         // DO's always auto receive
         } else if (item.transtype.toUpperCase() === $translate.instant('global.do')) {
            self.wtesAutoRcvList.push(item);
         // otherwise check if whse is auto-rcv - each WT shipped could be going to a different whse
         } else {
            var icsdparams = { whse: item.shiptowhse };
            DataService.get('api/ic/icsd/getbypk', { params: icsdparams, busy: true }, function (data) {
               if (data) {
                  if (data.autorcvfabwtfl) {
                     self.wtesAutoRcvList.push(item);
                  } else {
                     self.shippedTransfers.push(item);
                  }
               } else {
                  self.shippedTransfers.push(item);
               }
            });
         }
      });
   };

   //This is used for keeping track if any WT's are in process and if 
   //the user closes, warn them to run the 'Final Update'.  Take in the 
   //list of WT's and add them to the collection of WT's that are shipped.
   self.addToShippedWtList = function (wtesShipTransferList) {
      var distinctList = JSLINQ(wtesShipTransferList).Where(function (ship) {
         return !JSLINQ(self.shippedTransfers).Any(function (shipped) {
            return shipped.wtno === ship.wtno && shipped.wtsuf === ship.wtsuf;
         });
      }).ToArray();
      distinctList.forEach(function (item) {
         self.shippedTransfers.push(item);
      });
   };

   //If we Cancel Shipping on a WT, this gets called, and removes it from
   //the collection that keeps track of shipped Transfers (used for the close warning).
   self.removeFromShippedWtList = function (wtesShipTransferList) {
      var distinctList = JSLINQ(wtesShipTransferList).Where(function (ship) {
         return JSLINQ(self.shippedTransfers).Any(function (shipped) {
            return shipped.wtno === ship.wtno && shipped.wtsuf === ship.wtsuf;
         });
      }).ToArray();
      var recordcount = distinctList.length;

      distinctList.forEach(function (item) {
         var idx = distinctList.indexOf(item);
         if (idx >= 0) {
            self.shippedTransfers.splice(idx, recordcount);
         }
      });

      //NOTE:  By design, we don't need to be removing entries from the 'wtesAutoRcvList' too 
      //since the backend call "wtescancelship" took care of that for us and made sure to
      //remove them from the Auto Receiving collection.
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.criteria.wttype = self.includewtfl ? MessageService.get('global.yes') : MessageService.get('global.no');
      self.criteria.dotype = self.includedofl ? MessageService.get('global.yes') : MessageService.get('global.no');
      if (self.journal) {
         self.criteria.jrnlno = self.journal.gJrnlno;
      }
      self.criteria.wtno = '';
      self.criteria.wtsuf = '';
      DataService.post('api/wt/aswtentry/wtesbuildwtlist', { data: self.criteria, busy: true }, function (data) {
         self.wteiListResults = data.wtesbuildwtlistresults;
         self.dataset = self.wteiListResults;
      });
   };

   self.recoverReceivedWTOrders = function () {
      if ($stateParams.recoveryJournal) {
         var wtesbuildwtlistCriteria = {
            stagelist: '3', //Shipped
            dotype: 'Yes',
            wttype: 'Yes',
            irecordcountlimit: self.criteria.irecordcountlimit,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: $stateParams.recoveryJournal,
            tocono: self.companyNumber
         };
         DataService.post('api/wt/aswtentry/wtesbuildwtlist', { data: wtesbuildwtlistCriteria, busy: true }, function (data) {
            self.addToShippedWtList(data.wtesbuildwtlistresults);
         });
      }
   };

   self.refreshGridRows = function (selectedRows, updatedData) {
      //If multiple rows are passed, this means it was a multiple row update
      //so it's safe to just process those selected rows in the grid.
      if (selectedRows.length > 1) {
         selectedRows.forEach(function (wtes) {
            updatedData.forEach(function (record) {
               if (wtes.wtno === record.wtno && wtes.wtsuf === record.wtsuf) {
                  wtes.stagecd = record.stagecd;
                  wtes.stagecdx = record.stagecdx;
                  wtes.statusinfo = record.statusinfo;
                  var currentIndex = self.dataset.indexOf(wtes);
                  self.grid.updateRow(currentIndex);
               }
            });
         });
      } else {
         //Handle case from when we are in the Quick Ship screen.  Still refresh the grid, but  
         //hunt down the particular row to update (since none are selected).  We also need to 
         //do this same logic if only one row is selected (so it works from all use-cases that
         //funnel to this call.)

         //Update the one selected row of data or the data in the Quick Ship screen.
         updatedData.forEach(function (record) {
            if (selectedRows[0].wtno === record.wtno && selectedRows[0].wtsuf === record.wtsuf) {
               selectedRows[0].stagecd = record.stagecd;
               selectedRows[0].stagecdx = record.stagecdx;
               selectedRows[0].statusinfo = record.statusinfo;
            }
         });

         //Update the Grid so when they leave Quick Ship, they see the updated status.
         if (self.dataset) {
            self.dataset.forEach(function (record) {
               if (record.wtno === updatedData[0].wtno && record.wtsuf === updatedData[0].wtsuf) {
                  record.stagecd = updatedData[0].stagecd;
                  record.stagecdx = updatedData[0].stagecdx;
                  record.statusinfo = updatedData[0].statusinfo;
                  var currentIndex = self.dataset.indexOf(record);
                  self.grid.updateRow(currentIndex);
               }
            });
         }
      }
   };

   self.finishExecuteShip = function (drilldownRecord, navigateToDetails, isAutoReceiveFl, isQuickShip) {
      var selectedRows = [];

      //This can get called from the Ship button or gets called if they Drill into a row; that will
      //also ship the current WT as it heads into Detail.
      //If it is from the Drilldown or the QuickShip, we only get one row, otherwise we get data
      //from the grid (selected rows).
      if (navigateToDetails || isQuickShip) {
         if (drilldownRecord) {
            //Only one row, but added to a collection for use by the API call
            selectedRows.push(drilldownRecord);
         }
      } else {
         selectedRows = GridService.getSelectedRecords(self.grid);
      }

      var wtesshiptransferCriteria = {
         wtesautorcv: self.wtesAutoRcvList,  //Important that we keep the collection going as input/output so it carries forward for subsequent calls.
         wtesshiptransfer: [] //This backend call is only interested in this set of rows to process.
      };

      selectedRows.forEach(function (row) {
         var wtesShipTransfer = {
            wtno: row.wtno,
            wtsuf: row.wtsuf,
            jrnlno: self.journal.gJrnlno,
            autoreceivefl: isAutoReceiveFl,
            stagecd: row.stagecd,
            stagecdx: row.stagecdx,
            statusinfo: navigateToDetails ? 'Detail' : row.statusinfo //Backend skips some exceptions (i.e. Serials) if in drilldown mode.
         };
         wtesshiptransferCriteria.wtesshiptransfer.push(wtesShipTransfer);
      });

      if (wtesshiptransferCriteria.wtesshiptransfer && wtesshiptransferCriteria.wtesshiptransfer.length > 0) {
         DataService.post('api/wt/aswtentry/wtesshiptransfer', { data: wtesshiptransferCriteria, busy: true }, function (data) {
            if (data) {
               //Get the Auto Receive List back (the backend may have added some WT's for Fabrication).
               //As the user does more and more shipping, this list will grow.
               self.wtesAutoRcvList = data.wtesautorcv;

               //Update the main list of WT's that are being shipped with this call.  Used for the warning to do 'Final Update'
               self.addToShippedWtList(data.wtesshiptransfer);

               //Update the grid with status changes
               self.refreshGridRows(selectedRows, data.wtesshiptransfer);

               if (navigateToDetails) {
                  //Call detail, but pass down the state, so when they finish work there, they come back
                  //to the right spot.
                  $state.go('^.detail', { callingState: isQuickShip ? '^.quickship' : '^.master' });
               }
            }
         });
      }
   };

   self.checkForWLAuthPoints = function (wtesResults, navigateToDetails, isAutoReceiveMode, isQuickShip) {
      var val = { whse: null, userfield: '' };
      self.wloaWhseCriteria = [];
      if (wtesResults) {
         if (wtesResults.length > 0) {
            wtesResults.forEach(function (whse) {
               val = { whse: whse.shipfmwhse, userfield: '' };
               self.wloaWhseCriteria.push(val);
            });
         } else {
            val = { whse: wtesResults.shipfmwhse, userfield: '' };
            self.wloaWhseCriteria.push(val);
         }

         DataService.post('api/wl/aswlinquiry/getwlaomanywhsesettings', { data: self.wloaWhseCriteria, busy: true }, function (data) {
            if (data) {
               self.aswlinquirygetwloamanywhsesettingsresponse = data;

               self.ismodwlfl = data.lModwlfl;
               self.isanywhsefl = data.lAnywlwhsefl;
               self.isanyesbfl = data.lAnywlesbfl;
               self.isanyrcvonlyfl = data.lAnywlrcvonlyfl;

               if (data.lAnywlesbfl) {
                  isEsbAuthRunning = true;
                  isEsbAuthNeeded = true;
                  AuthService.createAuthPoint('esbwl', '', '', '', '', null,
                     function () {
                        isWlAuthRunning = false;
                        self.finishExecuteShip(wtesResults, navigateToDetails, isAutoReceiveMode, isQuickShip);
                     },
                     function () {
                        MessageService.error('global.error', 'message.need.proper.authentication.to.ship.wl.transfer');
                     });
               } else if (data.lAnywlwhsefl) {
                  isWlAuthRunning = true;
                  isWlAuthNeeded = true;
                  AuthService.createAuthPoint('wlord', '', '', '', '', null,
                     function () {
                        isWlAuthRunning = false;
                        self.finishExecuteShip(wtesResults, navigateToDetails, isAutoReceiveMode, isQuickShip);
                     },
                     function () {
                        MessageService.error('global.error', 'message.need.proper.authentication.to.ship.wl.transfer');
                     });
               } else {
                  self.finishExecuteShip(wtesResults, navigateToDetails, isAutoReceiveMode, isQuickShip);
               }
            }
         });
      }
   };

   self.finishExecuteCancelShip = function (selectedData) {
      var selectedRows = [];

      if (self.journal && self.journal.gJrnlno !== 0) {
         if (selectedData) {

            var wtescancelshipCriteria = {
               wtesautorcv: self.wtesAutoRcvList,  //Important that we keep the collection going as input/output so it carries forward for subsequent calls.
               wtesshiptransfer: [] //This backend call is only interested in this set of rows to process.
            };

            //Depending on where we're called, we might get a collection or a single row.
            //Get us a collection built, so it can be used for the backend calls and updating the grid.
            if (selectedData.length > 0) {
               selectedRows = selectedData;
            } else {
               selectedRows.push(selectedData);
            }

            selectedRows.forEach(function (row) {
               var wtesShipTransfer = {
                  wtno: row.wtno,
                  wtsuf: row.wtsuf,
                  jrnlno: self.journal.gJrnlno,
                  autoreceivefl: false, //Cancelling is always false for autoreceivefl.
                  stagecd: row.stagecd,
                  stagecdx: row.stagecdx,
                  statusinfo: row.statusinfo
               };
               wtescancelshipCriteria.wtesshiptransfer.push(wtesShipTransfer);
            });

            DataService.post('api/wt/aswtentry/wtescancelship', { data: wtescancelshipCriteria, busy: true }, function (data) {
               if (data) {
                  //Get the Auto Receive List back (the backend may have added some WT's for Fabrication).
                  //As the user does more and more shipping with 'Auto Receive', this list will grow.
                  self.wtesAutoRcvList = data.wtesautorcv;

                  //Update the main list of WT's that are being shipped with this call.  Used for the warning to do 'Final Update'
                  self.removeFromShippedWtList(data.wtesshiptransfer);

                  //Update the grid with status changes.
                  self.refreshGridRows(selectedRows, data.wtesshiptransfer);

                  if (selectedRows && selectedRows.length === 1) {
                     var shipMsg =
                        $translate.instant('message.the.shipping.work.for.warehouse.transfer') +
                           $translate.instant('symbol.colon') + ' ' +
                           selectedRows[0].wtno + '-' + Utils.pad(selectedRows[0].wtsuf, 2) + ' ' +
                           $translate.instant('message.has.been.cancelled');
                     MessageService.info('global.information', shipMsg);
                  } else {
                     MessageService.info('global.information', 'message.shipping.has.been.cancelled.on.selected.wt');
                  }
               }
            });
         }
      } else {
         //Need to make sure we're creating the journal for the right function since it can
         //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
         self.journalOptions.criteria.currproc = self.MENU_FUNCTION_WT_SHIPPING;
         self.journalControl.showOpenView(function () {
            self.finishExecuteCancelShip(selectedData);
         });
      }
   };

   //Prepare the 'Final Update'  This initializes printers and other fields for the screen.
   self.finalUpdateInitialize = function (callingState, wteiselectwt) {
      if (wteiselectwt && wteiselectwt.length > 0 && wteiselectwt[0].shiptowhse) {
         var requestCriteria = {
            iJrnlNo: self.journal.gJrnlno,
            cWhse: wteiselectwt[0].shiptowhse //Just pull out the 1st row.
         };

         DataService.get('api/wt/aswtentry/wteiupdateinit/{iJrnlNo}/{cWhse}', { pathParams: requestCriteria, busy: true }, function (data) {
            if (data) {
               //This pops up the Final Update screen.
               $state.go('^.finalupdate', { callingState: callingState, wteiUpdate: data });
            }
         });
      } else {
         MessageService.error('global.error', 'message.to.whse.is.invalid');
      }
   };

   //Gets called after we've build out the collection of what needs to be Auto Received.
   self.finalUpdateWteiCheckAccessContinue = function (callingState) {
      //Auto Receiving needs a Journal in itself from the 'Receiving' side.
      if (self.journal && self.journal.gJrnlno !== 0) {

         //Stuff each row with the newly created Journal #
         self.wteiSelectWt.forEach(function (row) {
            row.jrnlno = self.journal.gJrnlno;
         });

         DataService.post('api/wt/aswtentry/wteifullreceipt', { data: self.wteiSelectWt, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {

                  //NOTE: Do not clear the 'base.wtesAutoRcvList' here, in case they get to the Final Update
                  //screen, and then decide to cancel from there, we still want that list floating around for
                  //a future time they click the 'Final Update'.

                  //Get us ready for the Receiving Final Update screen.
                  self.finalUpdateInitialize(callingState, data.wteiselectwt);
               }
            }
         });
      } else {
         //Need to make sure we're creating the journal for the right function since it can
         //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
         self.journalOptions.criteria.currproc = self.MENU_FUNCTION_WT_RECEIVING;
         self.journalControl.showOpenView(function () {
            self.finalUpdateWteiCheckAccessContinue(callingState);
         });
      }
   };

   self.finalUpdateWTEI = function (callingState) {
      var countOfRecordsProcessed = 0;
      var countOfRecordsToReceive = self.wtesAutoRcvList ? self.wtesAutoRcvList.length : 0;
      var exitError = false;

      //Roll through the collection and iteratively call WteiCheckAccess passing wtno/suffix
      for (var iCurrentIndex = 0; iCurrentIndex < countOfRecordsToReceive; iCurrentIndex++) {
         if (exitError || !self.wtesAutoRcvList) {
            break;
         }
         var requestCriteria = {
            iWTno: self.wtesAutoRcvList[iCurrentIndex].wtno,
            iWTsuf: self.wtesAutoRcvList[iCurrentIndex].wtsuf
         };

         DataService.get('api/wt/aswtentry/wteicheckaccess/{iWTno}/{iWTsuf}', { pathParams: requestCriteria, busy: true }, function (data) {
            countOfRecordsProcessed++;
            if (data) {
               // From the checkaccess call (above), the serials/lots not being assigned is the only time the statusinfo value will be anything
               // but blank.  Therefore we can use it to track and display this error to keep WT's from being received incorrectly.
               if (data.statusinfo) {
                  var stopMessage = $translate.instant('message.wt.shipping.seriallot.auto.receiving.stop.part.1') +
                     requestCriteria.iWTno + '-' + Utils.pad(requestCriteria.iWTsuf, 2) +
                     $translate.instant('message.wt.shipping.seriallot.auto.receiving.stop.part.2');
                  MessageService.error('global.error', stopMessage);
                  exitError = true;
                  countOfRecordsToReceive--;
                  self.wtesAutoRcvList = [];
                  return;
               }
               //Build out the official collection for the update.  Add to that collection.  This is the
               //collection that the 'Full Receipt' call will use.
               self.wteiSelectWt.push(data);
            }

            //Once we've finished all records, then we're ready to do the update.
            if (countOfRecordsProcessed === countOfRecordsToReceive) {
               self.finalUpdateWteiCheckAccessContinue(callingState);
            }
         }); //ignore jslint - Need to do this as it's for each iteration.
      }
   };

   self.executeFinalUpdate = function (callingState) {
      var params = { iJournalno: self.journal.gJrnlno };
      DataService.get('api/wt/aswtentry/wtesfinalupdate/{iJournalno}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.processMessaging(data.messaging);
            }
            //Close the Journal for the Shipping work, and clear out the working list so
            //there's no residual data if the user wishes to close the WTES function.
            self.executeCloseJournal();
            self.shippedTransfers = [];

            //This is a collection of WT's that were Shipped and are marked for "Auto Receive".
            //If any exist, go validate the list and do the Receiving work (against a new Journal).
            //That will also pop up the Final Update for the Receiving screen.
            if (self.wtesAutoRcvList && self.wtesAutoRcvList.length > 0) {
               self.finalUpdateWTEI(callingState);
            } else {
               MessageService.info('global.information', 'message.final.update.completed.successfully');

               if (self.isViewClosing) {
                  self.raiseCloseView();
               } else {
                  if (self.criteria.shipfmwhse) {
                     self.search();
                  }
               }
            }
         }
      });
   };

   self.recoverReceivedWTOrders();

   self.quickViewBase = function (wteh) {
      if (wteh) {
         $state.go('wtes.quickview', {
            wtno: wteh.wtno,
            wtsuf: wteh.wtsuf,
            cono: wteh.cono,
            cono2: wteh.cono2,
            prevState: $state.current.name
         });
      }
   };

   self.showNoJournalOpenedMessage = function () {
      MessageService.info('global.information', 'global.no.journal.opened');
   };
});

app.controller('WtesSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = { tocono: base.companyNumber, stagelist: '2' };
      base.setDefaultWarehouse();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('wtes.master');
      }
      base.search();
   };

   base.setDefaultWarehouse();

});

app.controller('WtesMasterCtrl', function ($scope, $state, $stateParams, $timeout, GridService, DataService, AuthService, MessageService, TabService) {
   var self = this;
   var base = $scope.base;
   self.wtesShipTrasferCancelList = [];
   self.wtesShipTrasferList = [];
   self.isUpdatingFinalWTEI = false;
   self.isViewClosing = false;
   self.drilldownRecord = null;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.quickViewContinue = function (wteh) {
      base.quickViewBase(wteh);
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

   self.quickShip = function () {
      $state.go('wtes.quickship');
   };

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         return false;
      } else {
         return true;
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         self.drilldownRecord = record;
         var params = {
            wtno: record.wtno,
            wtsuf: record.wtsuf
         };

         DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (data) {
            base.wteh = data;

            if (!base.journal) {
               //Need to make sure we're creating the journal for the right function since it can
               //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
               base.journalOptions.criteria.currproc = base.MENU_FUNCTION_WT_SHIPPING;
               base.journalControl.showOpenView(function () {
                  self.executeShipFromDrilldown();
               });
            } else {
               self.executeShipFromDrilldown();
            }
         });
      }
   };

   self.executeShipFromDrilldown = function () {
      var record = self.drilldownRecord;

      if (record) {
         base.checkForWLAuthPoints(record, base.NAVIGATE_TO_DETAILS_MODE, base.NOT_AUTO_RECEIVE_MODE, base.NOT_QUICK_SHIP_MODE);
      }
   };

   self.ship = function () {
      if (base.journal && base.journal.gJrnlno !== 0) {
         var selectedRows = GridService.getSelectedRecords(base.grid);
         if (selectedRows) {
            base.checkForWLAuthPoints(selectedRows, base.NOT_NAVIGATE_TO_DETAILS_MODE, base.NOT_AUTO_RECEIVE_MODE, base.NOT_QUICK_SHIP_MODE);
         }
      } else {
         //Need to make sure we're creating the journal for the right function since it can
         //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
         base.journalOptions.criteria.currproc = base.MENU_FUNCTION_WT_SHIPPING;
         base.journalControl.showOpenView(function () {
            // Bug with loading indicator after journal open modal allows users to click 'Submit' before
            // records are updated correctly - adding timeout gets the loading indicator to stay on
            $timeout(self.ship, 1000);
         });
      }
   };

   //Set them to 'Shipped' but also build out a collection that is to be 'Auto Received' as well.
   //This Auto Receive collection is used when the user does a final update.
   self.shipAllAutoRecv = function () {
      if (base.journal && base.journal.gJrnlno !== 0) {
         var selectedRows = GridService.getSelectedRecords(base.grid);
         if (selectedRows) {
            //Merge in these WT numbers into the official AutoReceiveList that gets accumulated to.
            base.addToAutoReceiveList(selectedRows, false);

            base.checkForWLAuthPoints(selectedRows, base.NOT_NAVIGATE_TO_DETAILS_MODE, base.AUTO_RECEIVE_MODE, base.NOT_QUICK_SHIP_MODE);
         }
      } else {
         //Need to make sure we're creating the journal for the right function since it can
         //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
         base.journalOptions.criteria.currproc = base.MENU_FUNCTION_WT_SHIPPING;
         base.journalControl.showOpenView(function () {
            // Bug with loading indicator after journal open modal allows users to click 'Submit' before
            // records are updated correctly - adding timeout gets the loading indicator to stay on
            $timeout(self.shipAllAutoRecv, 1000);
         });
      }
   };

   self.cancelShip = function () {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      if (selectedRows) {
         base.finishExecuteCancelShip(selectedRows);
      }
   };

   //Selected when the user clicks 'Submit' (which is the 'Final Update')
   base.finalUpdate = function () {
      if (!base.journal) {
         self.isViewClosing = false;
         base.showNoJournalOpenedMessage();
      } else {
         if ($state.current.name === 'wtes.detail') {
            self.isViewClosing = false;
            MessageService.error('global.error', 'message.unable.to.close.journal.since.there.are.active.sub');
         } else {
            // There were some timing issues with the building of the list of shipped orders which sometimes
            // left the list empty when this code was executing.  Changed to check back end for list of orders
            // instead to decide if we proceed with final update question or just close the journal.
            var wtesbuildwtlistCriteria = {
               stagelist: '3', //Shipped
               dotype: 'Yes',
               wttype: 'Yes',
               irecordcountlimit: 0,
               shipfmwhse: '',
               shiptowhse: '',
               jrnlno: base.journal.gJrnlno,
               tocono: self.companyNumber
            };
            DataService.post('api/wt/aswtentry/wtesbuildwtlist', { data: wtesbuildwtlistCriteria, busy: true }, function (data) {
               if (data.wtesbuildwtlistresults && data.wtesbuildwtlistresults.length > 0) {
                  MessageService.yesNo('global.confirmation', 'question.proceed.with.final.update', function yes() {
                     base.executeFinalUpdate('^.master');
                  }, function no() {
                     self.isViewClosing = false;
                  });
               } else {
                  base.executeCloseJournal();
               }
            });
         }
      }
   };

   self.raiseCloseView = function () {
      TabService.closeTab('wtes.master');
   };

   TabService.canUserCloseTab('wtes.master', function () {
      self.isViewClosing = true;

      if (base.journal && base.journal.gJrnlno !== 0) {
         //If any WT's are in process of being shipped, we need to warn them to do a Final Update.
         if (base.shippedTransfers && base.shippedTransfers.length > 0) {
            base.finalUpdate();
            return false;
         } else {
            base.executeCloseJournal();
            return true;
         }
      } else {
         self.raiseCloseView();
         return true;
      }
   });

});

app.controller('WtesDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService, AodataService, Utils, Sasc, SecurityService) {

   var self = this;
   var base = $scope.base;
   var isImpliedCoreProduct = false;
   var reqCountFl = false;
   self.isCapitalizedAddonAmtVisible = Sasc.icincaddgl;
   self.callingState = $stateParams.callingState;
   self.isShipFromAddressControlDisable = true;
   self.wtesHeader = {};
   self.wtesLines = [];
   self.wtesautorcv = [];
   self.wtesShipTrasferCancelList = [];
   self.wtesShipTransfer = {};
   self.wtSelectedLine = {};
   self.isDetailHeaderTabVisible = base.securitySubLevelHeader > 1 ? true : false;
   self.isDetailLinesTabVisible = base.securitySubLevelLines > 1 ? true : false;
   self.requireWTSerials = AodataService.getValue('IC', 'iCReqWTSerialFl');

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('wtes', 'Header') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('wtes', 'Line Items') < 3;

   self.aswtentryWTESLineUpdateRequest = {
      wtesdetailline: [],
      iLineNo: 0,
      dNewQtyShip: 0,
      lNewBoFL: false,
      lPromptsPresented: false,
      lReqCountFl: false
   };
   self.wtesdetailline = {};
   self.itemsGridEditableFields = ['qtyship'];

   // Save
   self.submit = function () {
      var aswtentryWTESHeaderUpdateRequestAPI = { wthdr: self.wtesHeader, cFunctionName: 'wtes' };

      DataService.post('api/wt/aswtentry/wtesheaderupdate', { data: aswtentryWTESHeaderUpdateRequestAPI, busy: true }, function (data) {
         if (data.messaging.length > 0) {
            MessageService.processMessaging(data.messaging);
         } else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      });
   };

   self.loadWtesHeader = function () {
      if (base.wteh.wtno) {
         DataService.get('api/wt/aswtentry/wtesheaderretrieve/' + base.wteh.wtno + '/' + base.wteh.wtsuf + '/', {
            busy: true
         }, function (data) {
            self.wtesHeader = data;
            base.wtesHeader = data;
            DataService.get('api/wt/aswtentry/wtesbuildwtlinelist/' + base.journal.gJrnlno + '/' + base.wteh.wtno + '/' + base.wteh.wtsuf + '/', {
               busy: true
            }, function (data2) {
               self.wtesLines = data2;

               //User Hook (do not rename)
               if (self.wtesBuildWTLineListContinue) {
                  self.wtesBuildWTLineListContinue(data2);
               }
            });
         });
      }
   };

   self.loadWtesHeader();

   self.capitalizedAmtLostFocus = function () {
      if (self.wtesHeader && self.wtesHeader.addontype1) {
         self.wtesHeader.addonnet1 = self.addonChange(self.wtesHeader.addontype1, self.wtesHeader.addonamt1);
      }
   };

   self.expensedAmtLostFocus = function () {
      if (self.wtesHeader && self.wtesHeader.addontype2) {
         self.wtesHeader.addonnet2 = self.addonChange(self.wtesHeader.addontype2, self.wtesHeader.addonamt2);
      }
   };

   self.addonChange = function (addonType, addonAmt) {
      switch (addonType) {
         case '$': //ignore jslint - correct indentation
            return addonAmt; //ignore jslint - correct indentation
         case '%': //ignore jslint - correct indentation
            var calculatedNet = self.wtesHeader.totlineamt * (addonAmt / 100); //ignore jslint - correct indentation
            return parseFloat(calculatedNet.toFixed(2)); //ignore jslint - correct indentation
         default: //ignore jslint - correct indentation
            return self.wtesHeader.nolineitem * addonAmt; //ignore jslint - correct indentation
      }
   };

   self.onDetailLeave = function () {
      DataService.get('api/wt/aswtentry/wtesdetaillogoff/' + base.wteh.wtno + '/' + base.wteh.wtsuf + '/' + base.journal.gJrnlno, {
         busy: true
      }, function (messages) {
         if (!MessageService.processMessaging(messages)) {
            $state.go(self.callingState);
         }
      });
   };

   self.cancelShippingWork = function () {
      self.wtesautorcv = [];
      self.wtesShipTrasferCancelRecords = [];
      var wtesShipTransfer = {};
      wtesShipTransfer.jrnlno = base.journal.gJrnlno;
      wtesShipTransfer.wtno = base.wteh.wtno;
      wtesShipTransfer.wtsuf = base.wteh.wtsuf;
      wtesShipTransfer.stagecd = '3';
      self.wtesShipTrasferCancelRecords.push(wtesShipTransfer);

      var aswtentryWTESCancelShipRequestAPI = { wtesautorcv: self.wtesautorcv, wtesShipTransfer: self.wtesShipTrasferCancelRecords };

      DataService.post('api/wt/aswtentry/wtescancelship', { data: aswtentryWTESCancelShipRequestAPI, busy: true }, function (data) {
         if (data) {
            $state.go(self.callingState, { refreshSearch: true }, { reload: self.callingState });
         }
      });
   };

   self.lineItemSelectionChange = function () {
      self.wtSelectedLine = GridService.getSelectedRecord(self.wtesLinesGrid);
      if (self.wtSelectedLine) {
         self.previousBofl = self.wtSelectedLine.bofl;
         self.previousQtyShip = self.wtSelectedLine.qtyship;
         isImpliedCoreProduct = self.wtSelectedLine.impliedlinefl;

         if (self.wtSelectedLine.impliedlinefl) {
            MessageService.info('global.information', 'wtes.cannote.add.or.change.implied.core.line');
         }
      }
   };

   self.qualifyEditableField = function (fieldName) {
      if (self.itemsGridEditableFields.indexOf(fieldName) > -1) {
         return true;
      } else {
         return false;
      }
   };

   self.onQuantityShipChanged = function (e, args) {

      //   //TODO: Honor the entity.cancelflSensitive.  If it's true, then enable the column.
      //   //shipqty: Honor the isimpliedcore product
      //} 

      if (args && args.value !== args.oldValue && self.qualifyEditableField(args.column.field)) {
         self.wtSelectedLine = self.wtesLines[args.row];

         if (self.wtSelectedLine) {
            self.previousBofl = self.wtSelectedLine.bofl;
            self.previousQtyShip = self.wtSelectedLine.qtyship;
            if (args.column.field === 'bofl' && args.value !== args.oldValue) {
               self.previousBofl = args.oldValue;

            } else if (args.column.field === 'qtyship' && args.value !== args.oldValue) {
               self.previousQtyShip = args.oldValue;
            }

            isImpliedCoreProduct = self.wtSelectedLine.impliedlinefl;

            if (self.wtSelectedLine.impliedlinefl) {
               MessageService.info('global.information', 'wtes.cannote.add.or.change.implied.core.line');
            } else if (!self.wtSelectedLine.impliedlinefl) {
               self.aswtentryWTESLineUpdateRequest.lNewBoFL = self.wtSelectedLine.bofl;
               self.aswtentryWTESLineUpdateRequest.dNewQtyShip = self.wtSelectedLine.qtyship;
               self.aswtentryWTESLineUpdateRequest.iLineNo = self.wtSelectedLine.lineno;
               self.aswtentryWTESLineUpdateRequest.wtesdetailline = [];
               Utils.replaceObject(self.wtesdetailline, self.wtSelectedLine);
               self.wtSelectedLine.bofl = self.previousBofl;
               self.wtSelectedLine.qtyship = self.previousQtyShip;
               self.aswtentryWTESLineUpdateRequest.wtesdetailline.push(self.wtSelectedLine);

               self.requirePhysicalCountConfirmation();
            }
         }
      }
   };

   self.requirePhysicalCountConfirmation = function () {
      self.aswtentryWTESLineUpdateRequest.lPromptsPresented = true;
      MessageService.yesNo('global.information', 'question.require.physical.count', function () {
         reqCountFl = true;
         self.updateLineItem();
      }, function () {
         reqCountFl = false;
         self.updateLineItem();
      });
   };

   self.updateLineItem = function () {
      self.aswtentryWTESLineUpdateRequest.lReqCountFl = reqCountFl;
      var params = {
         prod: self.wtSelectedLine.shipprod
      };
      DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            var prod = data;
            if (prod.prodtype.toUpperCase() === 'R') {
               var impliedProLine = JSLINQ(self.wtesLines).Where(function (item1) { return item1.lineno === self.wtSelectedLine.lineno + 1; })
                  .FirstOrDefault(function (item1) {
                     return item1;
                  });
               self.aswtentryWTESLineUpdateRequest.wtesdetailline.push(impliedProLine);
            }

            DataService.post('api/wt/aswtentry/wteslineupdate', { data: self.aswtentryWTESLineUpdateRequest, busy: true }, function (innerData) {
               if (!MessageService.processMessaging(innerData.messaging)) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
               }

               //User Hook (do not rename)
               if (self.wtesLineUpdateContinue) {
                  self.wtesLineUpdateContinue(innerData, prod);
               }

               if (base.wteh.wtno) {
                  DataService.get('api/wt/aswtentry/wtesheaderretrieve/' + base.wteh.wtno + '/' + base.wteh.wtsuf + '/', {
                     busy: true
                  }, function (data) {
                     self.wtesHeader = data;
                     base.wtesHeader = data;

                     //User Hook (do not rename)
                     if (self.wtesheaderretrieveContinue) {
                        self.wtesheaderretrieveContinue();
                     }
                  });
               }
            });
         }
      });
   };

   self.lineWarehouse = function () {
      if (self.wtSelectedLine) {
         var wmbinassignCriteria = {
            altwhse: '',
            currproc: 'wtes',
            jrnlno: 0,//base.journal.gJrnlno,
            kitfl: false,
            lineno: self.wtSelectedLine.lineno,
            orderno: self.wtSelectedLine.wtno,
            ordersuf: self.wtSelectedLine.wtsuf,
            ourproc: 'wtes',
            ordertype: 't',
            prod: self.wtSelectedLine.shipprod,
            returnfl: false,
            seqno: 0,
            stkqtyship: self.wtSelectedLine.stkqtyship,
            skipnonkitlogic: false,
            stkqtyrcv: 0,
            unit: self.wtSelectedLine.unit,
            vamodule: '',
            wmqtyrcv: 0,
            wmadjtype: 'sell',
            whse: self.wtesHeader ? self.wtesHeader.shipfmwhse : ''
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
      if (wmbinassignment) {
         if (self.wtSelectedLine) {
            self.wtSelectedLine.wmqtyship = wmbinassignment.wmqtyship;
         }
         self.aswtentryWTESLineUpdateRequest.lNewBoFL = self.wtSelectedLine.bofl;
         self.aswtentryWTESLineUpdateRequest.dNewQtyShip = self.wtSelectedLine.qtyship;
         self.aswtentryWTESLineUpdateRequest.iLineNo = self.wtSelectedLine.lineno;
         self.aswtentryWTESLineUpdateRequest.wtesdetailline = self.wtesLines;
         reqCountFl = true;
         self.updateLineItem();
         base.search();
         $state.go('^');
      }
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActions = function (wmbinassignment) {
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
      // wmbinassignment nothing to do with this function for now as per the silverlight coding.
   };

   self.serial = function () {
      var record = GridService.getSelectedRecord(self.wtesLinesGrid);
      if (record) {
         var params = {
            prod: record.shipprod,
            whse: self.wtesHeader.shipfmwhse,
            fldlist: 'snpocd'
         };
         DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               if ((!data.snpocd && Sasc.icsnpofl) || (data.snpocd.toLowerCase() === 's')) {
                  if (self.requireWTSerials === 'no' && self.wtesHeader.wttype.toLowerCase() !== 'do') {
                     MessageService.alertOk('global.information', 'message.serials.assigned.at.sales.not available.in.wt');
                     return;
                  }
               }

               $state.go('^.serial', {
                  lineDetail: record,
                  callingState: self.callingState
               });
            }
         });
      }
   };

   self.lot = function () {
      var record = GridService.getSelectedRecord(self.wtesLinesGrid);
      if (record) {
         $state.go('^.lot', {
            lineDetail: record,
            callingState: self.callingState
         });
      }
   };

   // Set the editing condition per row
   self.isAllowEdit = function (row, cell, value, column, item) {
      return !item.impliedlinefl;
   };
});

//Alias: upd
app.controller('WtesWteiFinalUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var base = $scope.base;
   var self = this;
   self.wteiUpdate = $stateParams.wteiUpdate;
   self.callingState = $stateParams.callingState;

   self.closeJournalAfterFinalUpdate = function () {
      if (base.journal.gJrnlno !== 0) {
         //Close the Journal, but do not call the callback, otherwise you'll get in an endless loop.
         base.journalControl.closeJournal(true);
      }
   };

   // Save
   self.submit = function () {
      DataService.post('api/wt/aswtentry/wteiupdatefinal', { data: self.wteiUpdate, busy: true }, function (data) {
         if (data) {

            //Clear the collections of these Auto Receive records after we've successfully updated,
            //so we don't have residual data.  NOTE: This is the only time it's ever cleared.
            base.wtesAutoRcvList = [];

            //Close the Receiving Journal
            self.closeJournalAfterFinalUpdate();

            MessageService.info('global.information', 'message.auto.receiving.completed.successfully');
            $state.go(self.callingState, { refreshSearch: true }, { reload: self.callingState });
         }
      });
   };

   self.back = function () {
      MessageService.yesNo('global.question', 'question.selecting.back.will.cancel.receiving.on.transfers',
      // Yes processing
      function () {
         self.cancelFinalUpdate();
      });
   };

   //If the user decides not to update, this call will cancel the
   //receipt of those WT's and put them back in Shipped Stage.
   self.cancelFinalUpdate = function () {
      var wteiReceipts = [];

      base.wtesAutoRcvList.forEach(function (row) {
         var wteiReceipt = { wtno: row.wtno, wtsuf: row.wtsuf };
         wteiReceipts.push(wteiReceipt);
      });

      var wteicancelreceiptCriteria = {
         wteicancelreceipt: wteiReceipts,
         iJrnlNo: base.journal.gJrnlno
      };
      DataService.post('api/wt/aswtentry/wteicancelreceipt', { data: wteicancelreceiptCriteria, busy: true }, function (data) {
         MessageService.processMessaging(data);

         //NOTE: We're keeping that list of base.wtesAutoRcvList intact in case they still want
         //to come back in and update again.  Not clearing the 'wtesAutoRecvList' collection, for that reason.

         //Close the Receiving Journal
         self.closeJournalAfterFinalUpdate();

         MessageService.info('global.information', 'message.auto.receiving.was.cancelled');

         $state.go(self.callingState, { refreshSearch: true }, { reload: self.callingState });
      });
   };
});

app.controller('WtesQuickShipCtrl', function ($scope, $state, $translate, $stateParams, Utils, DataService, MessageService, AuthService, SecurityService, TabService) {
   var base = $scope.base;
   var self = this;
   self.wteh = {};
   self.DOCUMENT_DELIMITER = '-';
   self.isValidStage = true;
   self.wtorder = '0-00';
   self.securityLevel = SecurityService.getSecurityLevel('wtes');
   self.autoRcvBtnLabel = $translate.instant('global.ship.all.auto.receive.directs');
   self.isAutoRcvEnabled = false;
   self.isViewClosing = false;

   self.getWtehRecord = function (wtorder) {
      var splitWt = wtorder.split('-');

      var params = { wtno: splitWt[0], wtsuf: splitWt[1] };

      DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.wteh = data;
            base.wteh = data;

            if (self.securityLevel >= 3) {
               if (base.wteh.transtype.toUpperCase() === $translate.instant('global.do')) {
                  self.isAutoRcvEnabled = true;
                  self.autoRcvBtnLabel = $translate.instant('global.ship.all.auto.receive.directs');
               } else {
                  var icsdparams = { whse: base.wteh.shiptowhse };
                  DataService.get('api/ic/icsd/getbypk', { params: icsdparams, busy: true }, function (data) {
                     if (data) {
                        if (data.autorcvfabwtfl) {
                           self.autoRcvBtnLabel = $translate.instant('global.ship.all.auto.receive.wts');
                           self.isAutoRcvEnabled = true;
                        } else {
                           self.autoRcvBtnLabel = $translate.instant('global.ship.all.auto.receive.directs');
                           self.isAutoRcvEnabled = false;
                        }
                     } else {
                        self.isAutoRcvEnabled = false;
                     }
                  });
               }
            } else {
               self.isAutoRcvEnabled = false;
            }
         }
      });
   };

   if ($stateParams.wtno || base.wteh.wtno) {
      self.wtorder = base.wteh ? base.wteh.wtno + self.DOCUMENT_DELIMITER + Utils.pad(base.wteh.wtsuf, 2) : $stateParams.wtno;
      self.getWtehRecord(self.wtorder);
   }

   self.raiseCloseView = function () {
      TabService.closeTab('wtes.quickship');
   };

   self.quickShipFinalUpdate = function () {
      if (!base.journal) {
         self.isViewClosing = false;
         base.showNoJournalOpenedMessage();
      } else {
         if (base.shippedTransfers && base.shippedTransfers.length) {
            MessageService.yesNo('global.confirmation', 'question.proceed.with.final.update', function yes() {
               base.executeFinalUpdate('^.quickship');
            }, function no() {
               self.isViewClosing = false;
            });
         } else {
            base.journalControl.closeJournal(true);
         }
      }
   };

   self.wtOrderChanged = function () {
      if (self.wtorder) {
         self.getWtehRecord(self.wtorder);
      } else {
         self.wteh = { transtype: '', stagecd: null };
      }
   };

   self.quickView = function () {
      base.quickViewBase(self.wteh);
   };

   self.quickShip = function () {
      if (base.journal && base.journal.gJrnlno !== 0) {
         if (self.wteh) {
            base.checkForWLAuthPoints(self.wteh, base.NOT_NAVIGATE_TO_DETAILS_MODE, base.NOT_AUTO_RECEIVE_MODE, base.QUICK_SHIP_MODE);
         }
      } else {
         //Need to make sure we're creating the journal for the right function since it can
         //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
         base.journalOptions.criteria.currproc = base.MENU_FUNCTION_WT_SHIPPING;
         base.journalControl.showOpenView(function () {
            self.quickShip();
         });
      }
   };

   //Set the WT to 'Shipped' but also add to the collection that is to be 'Auto Received' as well.
   //This Auto Receive collection is used when the user does a final update.
   self.quickShipAllAutoRecv = function () {
      if (base.journal && base.journal.gJrnlno !== 0) {
         if (self.wteh) {
            //Merge in these WT numbers into the official AutoReceiveList that gets accumulated to.
            base.addToAutoReceiveList(self.wteh, true);

            base.checkForWLAuthPoints(self.wteh, base.NOT_NAVIGATE_TO_DETAILS_MODE, base.AUTO_RECEIVE_MODE, base.QUICK_SHIP_MODE);
         }
      } else {
         //Need to make sure we're creating the journal for the right function since it can
         //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
         base.journalOptions.criteria.currproc = base.MENU_FUNCTION_WT_SHIPPING;
         base.journalControl.showOpenView(function () {
            self.quickShipAllAutoRecv();
         });
      }
   };

   self.quickCancelShip = function () {
      if (self.wteh) {
         base.finishExecuteCancelShip(self.wteh);
      }
   };

   self.quickDetails = function () {
      if (self.wteh && self.wteh.wtno) {
         if (base.journal && base.journal.gJrnlno !== 0) {
            base.checkForWLAuthPoints(self.wteh, base.NAVIGATE_TO_DETAILS_MODE, base.NOT_AUTO_RECEIVE_MODE, base.QUICK_SHIP_MODE);
         } else {
            //Need to make sure we're creating the journal for the right function since it can
            //be either WTES (Shipping) or WTES (Receiving for Auto Receipts)
            base.journalOptions.criteria.currproc = base.MENU_FUNCTION_WT_SHIPPING;
            base.journalControl.showOpenView(function () {
               self.quickDetails();
            });
         }
      } else {
         MessageService.error('global.error', 'message.please.enter.a.valid.warehouse.transfer');
      }
   };
});

app.controller('WtesSerialCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.lineDetail = {};
   self.lineDetail = $stateParams.lineDetail;
   self.callingState = $stateParams.callingState;

   self.createIcEntrySerialsCriteria = function (resp) {
      var criteria = {
         whse: base.wtesHeader.shipfmwhse,
         prod: self.lineDetail.shipprod,
         type: 'wt',
         orderno: base.wtesHeader.wtno,
         ordersuf: base.wtesHeader.wtsuf,
         lineno: self.lineDetail.lineno,
         linenochar: self.lineDetail.lineno,
         seqno: 0,
         seqnochar: '000',
         inquiryfl: false,
         actionty: '',
         returnfl: false,
         origqty: self.lineDetail.stkqtyship,
         proofqty: resp.dNoSNLots,
         ordqty: self.lineDetail.stkqtyord,
         outqty: self.lineDetail.stkqtyship,
         ictype: 'wt',
         cost: self.lineDetail.prodcost,
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
         cono2: base.wtesHeader.cono2,
         shipfmwhse: base.wtesHeader.shipfmwhse,
         shiptowhse: base.wtesHeader.shiptowhse,
         jrnlno: 0,
         ourproc: 'wtes',
         icspecrecno: self.lineDetail.icspecrecno,
         assignoldest: false,
         currproc: 'wtes',
         callingState: self.callingState,
         seqdash: '0',
         rettext: '',
         kplabel: '',
         wonosuf: '',
         origqtylabel: '',
         proddesc: self.lineDetail.proddesc,
         prodnotesfl: ''
      };
      return criteria;
   };

   self.serialControlReady = function () {

      var selectedLine = { wtesdetailline: self.lineDetail, iLineNo: self.lineDetail.lineno, cShipFmWhse: base.wtesHeader.shipfmwhse, lIsFromMenu: true };



      DataService.post('api/wt/aswtentry/wtesdetaillinecheckserlot', { data: selectedLine, busy: true }, function (data) {
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

   self.goBack = function () {
      $state.go('^.detail', { callingState: self.callingState });
   };

   self.serialDoneCallback = function () {
      //TO:DO Need to find out this below peice of code is required or not.
      //if (self.IsAdjustQtyShip) {
      //   WTESLineGetSerialLotChanges(); // Need to run API call WTEILineGetSerialLotChanges and then update line item using the call [WTEsLineUpdate]
      //}
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
   };
});

app.controller('WtesLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.lineDetail = {};
   self.lineDetail = $stateParams.lineDetail;
   self.callingState = $stateParams.callingState;

   self.createIcEntryLotsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            whse: base.wtesHeader.shipfmwhse,
            prod: self.lineDetail.shipprod,
            type: 'wt',
            orderno: base.wtesHeader.wtno,
            ordersuf: base.wtesHeader.wtsuf,
            lineno: self.lineDetail.lineno,
            linenochar: self.lineDetail.lineno,
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: false,
            origqty: self.lineDetail.stkqtyship,
            proofqty: resp.dNoSNLots,
            ordqty: self.lineDetail.stkqtyord,
            outqty: self.lineDetail.stkqtyship,
            ictype: 'wt',
            cost: self.lineDetail.prodcost,
            qtyunavail: self.lineDetail.qtyunavail,
            method: '',
            retorderno: 0,
            retordersuf: 0,
            retlineno: 0,
            returnty: '0',
            reasunavty: '',
            custno: 0,
            shipto: 0,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: base.wtesHeader.cono2,
            shipfmwhse: base.wtesHeader.shipfmwhse,
            shiptowhse: base.wtesHeader.shiptowhse,
            jrnlno: 0,
            ourproc: 'wtes',
            icspecrecno: self.lineDetail.icspecrecno,
            assignoldest: 'y',
            currproc: 'wtes',
            callingState: self.callingState,
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: self.lineDetail.proddesc,
            prodnotesfl: ''
         };
         return criteria;
      }
   };

   self.lotControlReady = function () {
      var selectedLine = { wtesdetailline: self.lineDetail, iLineNo: self.lineDetail.lineno, cShipFmWhse: base.wtesHeader.shipfmwhse, lIsFromMenu: true };

      DataService.post('api/wt/aswtentry/wtesdetaillinecheckserlot', { data: selectedLine, busy: true }, function (data) {
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

   self.goBack = function () {
      $state.go('^.detail', { callingState: self.callingState });
   };

   self.lotDoneCallback = function () {
      //TO:DO Need to find out this below peice of code is required or not.
      //if (self.IsAdjustQtyShip) {
      //   WTESLineGetSerialLotChanges(); // Need to run API call WTESLineGetSerialLotChanges and then update line item using the call [WTESLineUpdate]
      //}
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('^.detail', { callingState: self.callingState });
   };
});