'use strict';

/**
 * Service for recovery records.
 */
app.service('RecoveryService', function RecoveryService($state, $translate, Constants, DataService, MessageService, UserService) {
   var self = this;

   this.checkRecoveryRecords = function () {
      DataService.get('api/pv/pvrecovery/getpvrecoverylistbyoperator/' + UserService.getUserName(), { busy: true }, function (data) {
         if (data.length > 0) {
            var recoveryCount = data.length;
            var recoveredOeetRecords = [];
            var recoveredPoetRecords = [];
            var recoveredWtetRecords = [];
            var recoveredFunctions = '';
            var skippedCnt = 0;

            for (var i = 0; i < recoveryCount; i++) {
               var currentRecovery = data[i];

               if (!currentRecovery.functionname) {
                  continue;
               }

               var menuFunction = currentRecovery.functionname.substring(0, currentRecovery.functionname.length - 3);

               if (menuFunction === 'apei') {
                  menuFunction = 'apece';
               }

               var baseState = $state.get(menuFunction);
               var newRecoveryRecord = {};
               var isNewRecordNeeded = true;

               if (!currentRecovery.jrnlno) {
                  //document entry recovery
                  var index = currentRecovery.recoverydata.indexOf('-');
                  var idNumber = currentRecovery.recoverydata.substring(0, index);
                  var idSuffix = currentRecovery.recoverydata.substring(index + 1);

                  if (recoveryCount < 5) {
                     newRecoveryRecord.orderMessage = $translate.instant('title.' + menuFunction) + ' ' +
                        $translate.instant('global.document') + ' ' +
                        currentRecovery.recoverydata + $translate.instant('message.recovered') + '<p>' +
                        $translate.instant('message.documents.recovered.please.complete');
                  } else {

                     if ((menuFunction === 'oeet' && recoveredOeetRecords.length === Constants.MAX_MULTIPLE_FUNCTION_TABS) ||
                        (menuFunction === 'poet' && recoveredPoetRecords.length === Constants.MAX_MULTIPLE_FUNCTION_TABS) ||
                        (menuFunction === 'wtet' && recoveredWtetRecords.length === Constants.MAX_MULTIPLE_FUNCTION_TABS)) {
                        skippedCnt++;
                     } else {
                        recoveredFunctions += menuFunction.toUpperCase() + ' - ' + $translate.instant('global.document') + ' ' + idNumber + '-' + idSuffix + '<p>';
                     }
                  }

                  var recoveryNavState = baseState.deepStateRedirect.default;
                  if (menuFunction === 'oeet') { //for special functions that can have multiple tabs, navigation is different for recovery
                     recoveredOeetRecords.forEach(function (recovery) {
                        if (isNewRecordNeeded) {
                           if (!recovery.idNumber) {
                              isNewRecordNeeded = false;
                              recovery.idNumber = idNumber;
                              recovery.idSuffix = idSuffix;
                           }
                        }
                     });

                     if (isNewRecordNeeded && recoveredOeetRecords.length < Constants.MAX_MULTIPLE_FUNCTION_TABS) {
                        if (recoveredOeetRecords.length > 0) {
                           var urlPieces = baseState.deepStateRedirect.default.split('.');
                           recoveryNavState = urlPieces[0] + (recoveredOeetRecords.length + 1) + '.' + urlPieces[1];
                        }

                        newRecoveryRecord.navState = recoveryNavState.replace('initiate', 'maintain');
                        newRecoveryRecord.idNumber = idNumber;
                        newRecoveryRecord.idSuffix = idSuffix;

                        recoveredOeetRecords.push(newRecoveryRecord);
                     }
                  } else if (menuFunction === 'poet') { //for special functions that can have multiple tabs, navigation is different for recovery
                     recoveredPoetRecords.forEach(function (recovery) {
                        if (isNewRecordNeeded) {
                           if (!recovery.idNumber) {
                              isNewRecordNeeded = false;
                              recovery.idNumber = idNumber;
                              recovery.idSuffix = idSuffix;
                           }
                        }
                     });

                     if (isNewRecordNeeded && recoveredPoetRecords.length < Constants.MAX_MULTIPLE_FUNCTION_TABS) {
                        if (recoveredPoetRecords.length > 0) {
                           var urlPieces = baseState.deepStateRedirect.default.split('.');
                           recoveryNavState = urlPieces[0] + (recoveredPoetRecords.length + 1) + '.' + urlPieces[1];
                        }

                        newRecoveryRecord.navState = recoveryNavState.replace('initiate', 'maintain');
                        newRecoveryRecord.idNumber = idNumber;
                        newRecoveryRecord.idSuffix = idSuffix;

                        recoveredPoetRecords.push(newRecoveryRecord);
                     }
                  } else if (menuFunction === 'wtet') { //for special functions that can have multiple tabs, navigation is different for recovery
                     recoveredWtetRecords.forEach(function (recovery) {
                        if (isNewRecordNeeded) {
                           if (!recovery.idNumber) {
                              isNewRecordNeeded = false;
                              recovery.idNumber = idNumber;
                              recovery.idSuffix = idSuffix;
                           }
                        }
                     });

                     if (isNewRecordNeeded && recoveredWtetRecords.length < Constants.MAX_MULTIPLE_FUNCTION_TABS) {
                        if (recoveredWtetRecords.length > 0) {
                           var urlPieces = baseState.deepStateRedirect.default.split('.');
                           recoveryNavState = urlPieces[0] + (recoveredWtetRecords.length + 1) + '.' + urlPieces[1];
                        }

                        newRecoveryRecord.navState = recoveryNavState.replace('initiate', 'maintain');
                        newRecoveryRecord.idNumber = idNumber;
                        newRecoveryRecord.idSuffix = idSuffix;

                        recoveredWtetRecords.push(newRecoveryRecord);
                     }
                  } else {
                     MessageService.info($translate.instant('global.document.recovered'), newRecoveryRecord.orderMessage);
                     //params were getting lost when not navigating directly to the default state
                     self.goToRecoveredState(recoveryNavState, idNumber, idSuffix, i);
                  }

               } else {
                  //Journal recovery

                  if (recoveryCount < 5) {
                     newRecoveryRecord.journalMessage = $translate.instant('global.journal') + ' ' +
                                                        currentRecovery.jrnlno + $translate.instant('message.in') +
                                                        $translate.instant('title.' + menuFunction) + '<p>' +
                                                        $translate.instant('message.documents.recovered.please.complete');
                  } else {
                     if ((menuFunction === 'oeet' && recoveredOeetRecords.length === Constants.MAX_MULTIPLE_FUNCTION_TABS) ||
                        (menuFunction === 'poet' && recoveredPoetRecords.length === Constants.MAX_MULTIPLE_FUNCTION_TABS) ||
                        (menuFunction === 'wtet' && recoveredWtetRecords.length === Constants.MAX_MULTIPLE_FUNCTION_TABS)) {
                        skippedCnt++;
                     } else {
                        recoveredFunctions += menuFunction.toUpperCase() + ' - ' + $translate.instant('global.journal') + '<p>';
                     }
                  }

                  var journalNavState = baseState.deepStateRedirect.default;
                  //POET and WTET don't have journals opened.  No need for special processing for those document entries.
                  if (menuFunction === 'oeet') { //for special functions that can have multiple tabs, navigation is different for recovery
                     recoveredOeetRecords.forEach(function (recovery) {
                        if (isNewRecordNeeded) {
                           if (!recovery.journalNumber) {
                              isNewRecordNeeded = false;
                              recovery.journalMessage = newRecoveryRecord.journalMessage;
                              recovery.journalNumber = currentRecovery.jrnlno;
                              recovery.recoveryData = currentRecovery.recoverydata;
                           }
                        }
                     });

                     if (isNewRecordNeeded && recoveredOeetRecords.length < Constants.MAX_MULTIPLE_FUNCTION_TABS) {
                        if (recoveredOeetRecords.length > 0) {
                           var journalUrlPieces = baseState.deepStateRedirect.default.split('.');
                           journalNavState = journalUrlPieces[0] + (recoveredOeetRecords.length + 1) + '.' + journalUrlPieces[1];
                        }

                        newRecoveryRecord.navState = journalNavState.replace('initiate', 'maintain');
                        newRecoveryRecord.journalNumber = currentRecovery.jrnlno;
                        newRecoveryRecord.recoveryData = currentRecovery.recoverydata;

                        recoveredOeetRecords.push(newRecoveryRecord);
                     }
                  } else {
                     MessageService.info($translate.instant('global.journal.recovered'), newRecoveryRecord.journalMessage);
                     //params were getting lost when not navigating directly to the default state
                     self.goToRecoveredJournalState(journalNavState, currentRecovery.jrnlno, currentRecovery.recoverydata, i);
                  }
               }
            }

            if (recoveryCount >= 5) {
               MessageService.info($translate.instant('global.documents.recovered'),
                                   (recoveryCount - skippedCnt) + $translate.instant('message.documents.recovered.in.the.following.areas') + '<p>' +
                                   recoveredFunctions +
                                   $translate.instant('message.documents.recovered.please.complete'));
            }

            var oeetRecordNumber = 0;
            var poetRecordNumber = 0;
            var wtetRecordNumber = 0;

            //we need to stagger the recovery of transaction functions, otherwise it tried to load 2 or potantially 3 at a time (one each of oeet, poet, and wtet)
            while (oeetRecordNumber < recoveredOeetRecords.length) {
               var currentRecoveredOeetRecord = recoveredOeetRecords[oeetRecordNumber];
               currentRecoveredOeetRecord.showIndividualMessages = recoveryCount < 5;
               self.goToRecoveredTransactionState(currentRecoveredOeetRecord, oeetRecordNumber);
               oeetRecordNumber++;
            }

            //need a little extra time between recovering two different types of functions
            if (oeetRecordNumber > 0) {
               oeetRecordNumber++;
            }

            while (poetRecordNumber < recoveredPoetRecords.length) {
               var currentRecoveredPoetRecord = recoveredPoetRecords[poetRecordNumber];
               currentRecoveredPoetRecord.showIndividualMessages = recoveryCount < 5;
               self.goToRecoveredTransactionState(currentRecoveredPoetRecord, oeetRecordNumber + poetRecordNumber);
               poetRecordNumber++;
            }

            //need a little extra time between recovering two different types of functions
            if (poetRecordNumber > 0) {
               poetRecordNumber++;
            }

            while (wtetRecordNumber < recoveredWtetRecords.length) {
               var currentRecoveredWtetRecord = recoveredWtetRecords[wtetRecordNumber];
               currentRecoveredWtetRecord.showIndividualMessages = recoveryCount < 5;
               self.goToRecoveredTransactionState(currentRecoveredWtetRecord, oeetRecordNumber + poetRecordNumber + wtetRecordNumber);
               wtetRecordNumber++;
            }
         }
      });
   };

   /**
    * The 'go' call is separated out so we have scope to the function.
    * Additionally, need to build in small delay between iterations to avoid issues with subsequent state transitions.
    */
   this.goToRecoveredState = function (stateName, recoveryId, recoverySuffix, iCnt) {
      setTimeout(function () {
         $state.go(stateName, { isRecovery: true, recoveryId: recoveryId, recoverySuffix: recoverySuffix });
      }, 2000 * (iCnt + 1));
   };

   /**
    * The 'go' call is separated out so we have scope to the function.
    * Additionally, need to build in small delay between iterations to avoid issues with subsequent state transitions.
    */
   this.goToRecoveredJournalState = function (stateName, recoveryJournal, recoveryData, iCnt) {
      setTimeout(function () {
         $state.go(stateName, { isRecovery: true, recoveryJournal: recoveryJournal, recoveryData: recoveryData });
      }, 2000 * (iCnt + 1));
   };

   /**
    * The 'go' call is separated out so we have scope to the function.
    * Additionally, need to build in small delay between iterations to avoid issues with subsequent state transitions.
    */
   this.goToRecoveredTransactionState = function (recoveryRecord, iCnt) {
      setTimeout(function () {
         if (recoveryRecord.showIndividualMessages) {
            if (recoveryRecord.orderMessage) {
               MessageService.info($translate.instant('global.document.recovered'), recoveryRecord.orderMessage);
            }
            if (recoveryRecord.journalMessage) {
               MessageService.info($translate.instant('global.journal.recovered'), recoveryRecord.journalMessage);
            }
         }
         $state.go(recoveryRecord.navState, { isRecovery: true, recoveryId: recoveryRecord.idNumber, recoverySuffix: recoveryRecord.idSuffix, recoveryJournal: recoveryRecord.journalNumber, recoveryData: recoveryRecord.recoveryData });
      }, 2000 * (iCnt + 1));
   };

   this.checkRecoveryExists = function (operator, functionName, journalNumber, recoveryData, callBack) {
      var params = {
         oper2: operator,
         functionname: functionName + '-h5',
         jrnlno: journalNumber,
         recoverydata: recoveryData
      };

      DataService.get('api/pv/pvrecovery/existsbypk', { params: params, busy: true }, function (data) {
         if (callBack) {
            callBack(data);
         }
      });
   };

   this.createRecoveryRecord = function (functionName, journalNumber, recoveryData) {
      var pvRecoveryRecord = {
         action: 'create',
         functionname: functionName + '-h5',
         jrnlno: journalNumber,
         recoverydata: recoveryData
      };
      DataService.post('api/shared/assharedentry/pvrecoveryrecord', { data: pvRecoveryRecord, busy: true });
   };

   this.updateRecoveryRecord = function (functionName, journalNumber, newJournalNumber, recoveryData, newRecoveryData) {
      var pvRecoveryRecord = {
         action: 'update',
         functionname: functionName + '-h5',
         jrnlno: journalNumber,
         newjrnlno: newJournalNumber,
         recoverydata: recoveryData,
         newrecoverydata: newRecoveryData
      };
      DataService.post('api/shared/assharedentry/pvrecoveryrecord', { data: pvRecoveryRecord, busy: true });
   };

   this.deleteRecoveryRecord = function (functionName, journalNumber, recoveryData) {
      //NOTE: sas-12/7 did not pull over isUserLoggingOut variable from SL
      //if true, the following line of code was run in the callback of 'api/shared/assharedentry/pvrecoveryrecord'
      // eventAggregator.GetEvent<DeleteRecoveryEvent>().Publish(true); (line 149 of RecoveryHelper.cs from SL)
      var pvRecoveryRecord = {
         action: 'delete',
         functionname: functionName + '-h5',
         jrnlno: journalNumber,
         recoverydata: recoveryData
      };
      DataService.post('api/shared/assharedentry/pvrecoveryrecord', { data: pvRecoveryRecord, busy: true });
   };
});