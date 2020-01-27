'use strict';

app.controller('WtetMaintainCtrl', function ($state, $scope, $translate, $stateParams, DataService, MessageService, RecoveryService, UserService, AuthService, AodataService, Constants, Utils) {
   var self = this;
   var base = $scope.base;

   self.transferOrderNumber = '';

   base.sidebarCollapsed = true;
   base.isAddOrderMode = false;

   self.cancelRetrieve = function () {
      RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, base.delimitedTransferOrderNumber());
      self.forceReset();
   };

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         $scope.base.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Cancel update if the authorization point in the warehouse logistics status failed
      if (parameters.stage && parameters.stage === 'authPointFailed') {
         self.cancelRetrieve();
      }
   };

   self.isMaintain = function () {
      return $state.is(base.baseState + '.maintain');
   };

   self.includesMaintain = function () {
      return $state.includes(base.baseState + '.maintain');
   };

   //handle recovery records
   if ($stateParams.isRecovery) {
      if ($stateParams.recoveryId) {
         var recoveryTransferOrderNo = $stateParams.recoveryId;
         var recoveryTransferOrderSuf = $stateParams.recoverySuffix;
         var delimitedTransferOrderNo = recoveryTransferOrderNo + '-' + recoveryTransferOrderSuf;

         self.isWarehouseTransferVerified = true;
         self.transferOrderNumber = delimitedTransferOrderNo;

         var wtHeaderRetrieveCriteria = {
            wtno: recoveryTransferOrderNo,
            wtsuf: recoveryTransferOrderSuf,
            maintmode: true
         };

         DataService.post('api/wt/aswtheader/wtetheaderretrieve', { data: wtHeaderRetrieveCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.wthdr = data.wthdr;
                  base.inDrillDownOperation = true;
               } else {
                  RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, delimitedTransferOrderNo());
               }
            } else {
               RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, delimitedTransferOrderNo);
               MessageService.alert($translate.instant('global.alert'),
                  $translate.instant('message.recovery.data.is.incomplete.could.not.recover.ord') + delimitedTransferOrderNo);
            }
         });
      }
   } else {
      self.isWarehouseTransferVerified = false;
   }

   self.warehouseOrderChanged = function (selectedWarehouseTransfer) {
      if (selectedWarehouseTransfer.value > 0) {
         base.wthdr.wtno = selectedWarehouseTransfer.value;
         base.wthdr.wtsuf = selectedWarehouseTransfer.value2;

         var headerRetrieveRequest = {
            wtno: base.wthdr.wtno,
            wtsuf: base.wthdr.wtsuf,
            maintmode: base.isAddOrderMode,
            updatetype: ""
         };
         DataService.post('api/wt/aswtheader/wtetheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
            if (data) {

               //User Hook (do not rename)
               if (self.warehouseOrderChangedBeforeMessaging) {
                  self.warehouseOrderChangedBeforeMessaging(data);
               }

               if (!MessageService.processMessaging(data.messaging)) {
                  Utils.replaceObject(base.wthdr, data.wthdr);
                  base.inDrillDownOperation = true;
               }

               //User Hook (do not rename)
               if (self.warehouseOrderChangedContinue) {
                  self.warehouseOrderChangedContinue(data);
               }
            }
         });
      }
   };

   self.continue = function () {
      if (base.wthdr.wtno) {
         if ($scope.base.isRecovery || self.isWarehouseTransferVerified) {
            self.checkRecoveryExistsCallback(false);
         } else {
            RecoveryService.checkRecoveryExists(UserService.getUserName(), Constants.MENU_FUNCTION_WTET, 0, base.delimitedTransferOrderNumber(), self.checkRecoveryExistsCallback);
         }
      } else {
         MessageService.error('global.error', 'message.please.enter.a.valid.order.number');
      }
   };

   self.checkRecoveryExistsCallback = function (isRecoveryFound) {
      if (isRecoveryFound) {
         MessageService.info('global.information', 'message.transfer.is.currently.open.in.another.window');
         base.resetWthdr();
      } else {
         if (self.isWarehouseTransferVerified || base.skipMaintainHeader) {
            if (base.skipMaintainHeader) {
               RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, base.delimitedTransferOrderNumber());
            }
            self.updateWthdr();
         } else {
            RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, base.delimitedTransferOrderNumber());

            var headerRetrieveRequest = {
               wtno: base.wthdr.wtno,
               wtsuf: base.wthdr.wtsuf,
               maintmode: base.isAddOrderMode,
               updatetype: 'retrieve-withsoftlock'
            };
            DataService.post('api/wt/aswtheader/wtetheaderretrieve', { data: headerRetrieveRequest, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     base.wthdr = data.wthdr;
                     base.whseLogStatus = data.wlstatus;

                     //NOTE: The WT must be for a TWL Warehouse and must be in the printed stage for this to fire.
                     if (base.wthdr.wlwhsefl && base.whseLogStatus.bannerfl && base.whseLogStatus.editorderfl) {
                        $state.go(base.baseState + '.maintain.orderStatus', { whseLogStatus: base.whseLogStatus, menuFunction: base.MENU_FUNCTION_WTET, setWhseLogStatusCallback: self.setWhseLogStatusCallback });
                     }
                  } else {
                     self.cancelRetrieve();
                  }
               }
            });

            self.isWarehouseTransferVerified = true;
         }
      }
   };

   self.recoveryAuthPointPassed = function () {
      self.updateWthdr();
   };

   self.forceReset = function () {
      var orderNumber = base.delimitedTransferOrderNumber();
      DataService.get('api/wt/aswtheader/wtetremovesoftlock/' + base.wthdr.wtno + '/' + base.wthdr.wtsuf, { busy: true }, function () {
         RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, orderNumber);
      });

      base.resetWthdr();
      self.transferOrderNumber = '';
      self.isWarehouseTransferVerified = false;
   };

   self.updateWthdr = function () {
      DataService.post('api/wt/aswtheader/wtetheaderupdate', { data: base.wthdr, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               base.updateLineItems(function () {
                  //This gets called as the callback when updateLineItems completes.
                  $state.go(base.defaultLineEntryState);
               });
            }
         }
      });
   };

   self.cancel = function () {
      self.forceReset();
   };

   self.create = function () {
      base.resetWthdr();
      $state.go(base.baseState + '.initiate');
   };

   self.delete = function () {
      base.resetWthdr();
      $state.go(base.baseState + '.delete');
   };

   self.copy = function () {
      base.resetWthdr();
      $state.go(base.baseState + '.copy');
   };

   self.print = function () {
      base.resetWthdr();
      $state.go(base.baseState + '.print');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.entryDefaultsClicked = function () {
      $state.go(base.baseState + '.entryDefaults');
   };
});

app.controller('WtetDeleteCtrl', function ($state, $scope, $translate, Utils, DataService, MessageService, RecoveryService, AuthService, SecurityService, Constants) {
   var self = this;
   var base = $scope.base;
   var bIsValidOrder = false;
   //Note:  We want separate order data for the delete.
   self.wthdr = {};
   self.transferOrderNumber = '';

   self.operatorMenuSecurity = SecurityService.getSecurityLevel(base.MENU_FUNCTION_WTET);

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         self.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'finishFullSuccess') {
         self.cancelWarehouseTransfer();
      }
   };

   self.delimitedTransferOrderNumber = function () {
      if (self.wthdr.wtno) {
         return self.wthdr.wtno + '-' + Utils.pad(self.wthdr.wtsuf, 2);
      }
      return '';
   };

   self.isDelete = function () {
      return $state.is(base.baseState + '.delete');
   };

   self.includesDelete = function () {
      return $state.includes(base.baseState + '.delete');
   };

   self.forceReset = function () {
      self.wthdr = {};
      self.transferOrderNumber = '';
   };

   self.cancelWarehouseTransfer = function () {
      if (bIsValidOrder) {
         MessageService.error('global.error', 'message.maintenance.with.this.stage.not.allowed.2202');
      } else {
         MessageService.yesNo('global.question', 'question.are.you.sure.you.wish.to.cancel.this.transfer',
            // Yes processing
            function () {
               var wtordercancelCriteria = {
                  wtno: self.wthdr.wtno,
                  wtsuf: self.wthdr.wtsuf,
                  secure: self.operatorMenuSecurity
               };
               DataService.post('api/wt/aswtheader/wtetorderdelete', { data: wtordercancelCriteria, busy: true }, function (data) {
                  RecoveryService.deleteRecoveryRecord(base.MENU_FUNCTION_WTET, 0, self.delimitedTransferOrderNumber());
                  base.resetWthdr();
                  $state.go(base.baseState + '.initiate');
               });

            }, // No processing
            function () {
               DataService.get('api/wt/aswtheader/wtetremovesoftlock/' + self.wthdr.wtno + '/' + self.wthdr.wtsuf, { busy: true }, function () {
                  RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, self.delimitedTransferOrderNumber());
                  self.forceReset();
               });
            });
      }
   };

   self.transferOrderSelected = function (args) {
      if (args.value > 0) {
         self.wthdr.wtno = args.value;
         self.wthdr.wtsuf = args.value2;
         bIsValidOrder = false;
         var headerRetrieveCriteria = {
            wtno: self.wthdr.wtno,
            wtsuf: self.wthdr.wtsuf,
            secure: self.operatorMenuSecurity,
            updatetype: base.WTHEADERRETRIEVE_MODE_CHECKDELETE
         };
         DataService.post('api/wt/aswtheader/wtetheaderretrieve', { data: headerRetrieveCriteria, busy: true }, function (data) {
            if (data) {
               self.whseLogStatus = data.wlstatus;

               //User Hook (do not rename)
               if (self.transferOrderSelectedBeforeMessaging) {
                  self.transferOrderSelectedBeforeMessaging(data);
               }

               if (data.messaging.length > 0) {
                  if (data.messaging[0].messagetxt.includes("2202")) {
                     bIsValidOrder = true;
                  }
               }
               if (!MessageService.processMessaging(data.messaging)) {
                  Utils.replaceObject(self.wthdr, data.wthdr);
               }

               //User Hook (do not rename)
               if (self.transferOrderSelectedContinue) {
                  self.transferOrderSelectedContinue(bIsValidOrder, data);
               }
            }
         });
      }
   };

   self.continue = function () {
      //NOTE: The WT must be for a TWL Warehouse and must be in the printed stage for this to fire.
      if (self.wthdr.wlwhsefl && self.whseLogStatus.bannerfl && self.whseLogStatus.editorderfl) {
         $state.go(base.baseState + '.delete.orderStatus', { whseLogStatus: self.whseLogStatus, menuFunction: base.MENU_FUNCTION_WTET, setWhseLogStatusCallback: self.setWhseLogStatusCallback });
      } else {
         self.cancelWarehouseTransfer();
      }
   };

   self.back = function () {
      if (self.wthdr && self.wthdr.wtno) {
         DataService.get('api/wt/aswtheader/wtetremovesoftlock/' + self.wthdr.wtno + '/' + self.wthdr.wtsuf, { busy: true }, function () {
            RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, self.delimitedTransferOrderNumber());
            self.forceReset();
         });
      }

      $state.go(base.baseState + '.initiate');
   };
});

app.controller('WtetCopyCtrl', function ($state, $scope, $stateParams, $translate, DataService, UserService, ReportService, MessageService, MruService) {
   var self = this;
   var base = $scope.base;

   self.wtCopy = {};
   self.fullOrderNumber = '';
   self.wteh = {};
   self.continueButtonEnabled = true;

   self.initializeCopyObject = function () {
      DataService.get('api/wt/aswtheader/wtetcopyinitialize', { busy: true }, function (data) {
         if (data) {
            self.wtCopy = data;
         }
      });
   };

   self.clear = function () {
      self.wtCopy = {};
      self.fullOrderNumber = '';

      self.initializeCopyObject();
   };

   self.isContinueButtonEnabled = function () {
      return self.continueButtonEnabled;
   };

   self.isCopyTransferSelected = function () {
      if (self.wtCopy.wtno) {
         return true;
      } else {
         return false;
      }
   };

   self.orderChanged = function (args) {
      if (args.value) {
         if (args.value > 0) {
            self.wtCopy.wtno = args.value;
            self.wtCopy.wtsuf = args.value2;

            var params = {
               wtno: self.wtCopy.wtno,
               wtsuf: self.wtCopy.wtsuf
            };

            DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.wteh = data;

                  //User Hook (do not rename)
                  if (self.orderChangedContinue) {
                     self.orderChangedContinue(data);
                  }
               }
            });
         }
      }
   };

   self.continueButtonSelected = function () {
      DataService.post('api/wt/aswtheader/wtetcopycontinue', { data: self.wtCopy, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.wtCopy = data.wtetcopy;
               self.continueButtonEnabled = false;
            }
         }
      });
   };

   self.submit = function () {
      DataService.post('api/wt/aswtheader/wtetcopyupdate', { data: self.wtCopy, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.wtCopy = data.wtetcopy;
               self.continueButtonEnabled = true;
               // Always suffix = zero and this point.
               var transferOrderNumber = self.wtCopy.newwtno.toString() + '-00';
               var params = { fldlist: 'rowpointer,wtno,wtsuf' };
               DataService.get('api/wt/wteh/getbyrowid/' + self.wtCopy.newwtnorowid, { params: params }, function (data) {
                  MruService.addToList('WTOrder', data.rowpointer, transferOrderNumber, data.wtno, data.wtsuf);
               });

               self.copyCompleteMessage = $translate.instant('global.copy.completed.successfully') + ' ' +
                  $translate.instant('global.new.wt.number') + base.LABEL_DELIMITER + transferOrderNumber + '.';

               self.clear();

            }
         }
      });
   };

   // First time in here
   if (base) {
      self.initializeCopyObject();
   }

   self.reset = function () {
      self.continueButtonEnabled = true;

      //Clear WT and other fields.
      self.clear();

      //clear message when a new copy is started
      self.copyCompleteMessage = '';

      //If they reset then clear the last data
      self.wteh = {};
   };

   self.create = function () {
      $state.go(base.baseState + '.initiate');
   };

   self.maintain = function () {
      $state.go(base.baseState + '.maintain');
   };

   self.delete = function () {
      $state.go(base.baseState + '.delete');
   };

   self.print = function () {
      $state.go(base.baseState + '.print');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.entryDefaultsClicked = function () {
      $state.go(base.baseState + '.entryDefaults');
   };
});

app.controller('WtetPrintCtrl', function ($state, $scope, $stateParams, DataService, GlobalValueService, UserService, ReportService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.isPrintPickTicketEnabled = true;

   self.autoPrintEnabled = true;

   self.printLoadCriteria = {
      wtno: 0,
      wtsuf: 0,
      pickprintfl: true,
      printernm: ''
   };

   if (!base.autoPrintData) {
      base.autoPrintData = { autoPrint: base.autoPrintDefault };
   }

   if ($stateParams.orderNumber) {
      self.fullOrderNumber = $stateParams.orderNumber;
   }

   self.autoPrintChanged = function () {
      if (base.autoPrintData) {
         GlobalValueService.set('Global.AutoPrint', base.autoPrintData.autoPrint);
      }
   };

   self.orderChangedContinue = function (data) {

      //Get the 'from' warehouse so we can default in the printer.
      var params = {
         wtno: data.wtno,
         wtsuf: data.wtsuf,
         fldlist: 'shipfmwhse'
      };

      //User Hook (do not rename)
      if (self.orderChangedContinueCriteria) {
         self.orderChangedContinueCriteria();
      }

      DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (wtehData) {
         if (wtehData) {
            self.printWtWarehouse = wtehData.shipfmwhse;

            //User Hook (do not rename)
            if (self.orderChangedContinueCallback) {
               self.orderChangedContinueCallback(wtehData);
            }
         }
      });
   }

   self.orderChanged = function (args) {
      if (args.value) {
         if (args.value > 0) {
            self.printLoadCriteria.wtno = args.value;
            self.printLoadCriteria.wtsuf = args.value2;

            DataService.post('api/wt/aswtheader/wtetprintinitialize', { data: self.printLoadCriteria, busy: true }, function (data) {
               if (data) {
                  self.printLoadCriteria = data;

                  self.orderChangedContinue(data);
               }
            });
         }
      } else {
         self.printLoadCriteria.wtno = '';
         self.printLoadCriteria.wtsuf = '';
      }
   };

   self.submit = function () {

      DataService.post('api/wt/aswtheader/wtetprintrun', { data: { printersettings: self.pickTicketSettings, wtetprint: self.printLoadCriteria }, busy: true }, function (data) {
         MessageService.info('global.information', 'message.your.print.request.has.been.sent');
         if (base.autoPrintData.autoPrint) {
            base.autoPrintData.pickTicketSettings = self.pickTicketSettings;
            base.autoPrintData.printLoadCriteria = self.printLoadCriteria;
         } else {
            base.autoPrintData.pickTicketSettings = {};
            base.autoPrintData.printLoadCriteria = {};
         }

         //User Hook (do not rename)
         if (self.wtetprintrunContinue) {
            self.wtetprintrunContinue();
         }
      });
   };

   self.create = function () {
      $state.go(base.baseState + '.initiate');
   };

   self.maintain = function () {
      $state.go(base.baseState + '.maintain');
   };

   self.delete = function () {
      $state.go(base.baseState + '.delete');
   };

   self.copy = function () {
      $state.go(base.baseState + '.copy');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.entryDefaultsClicked = function () {
      $state.go(base.baseState + '.entryDefaults');
   };
});

//Called from Initiate, this is the feature to import lines from an Excel spreadsheet to create WT's.
//The file layout is defined in help.
app.controller('WtetImportFromExcelCtrl', function ($state, $scope, Constants, DataService, MessageService, MruService, Utils) {
   // alias => ife
   var self = this;
   var base = $scope.base;

   // Parse and Update the Import Data in sections (200 records at a time)
   var parsedImportData1 = [];
   var parsedImportData2 = [];
   var parsedImportData3 = [];
   var parsedImportData4 = [];
   var parsedImportData5 = [];
   var importOrderNumber = 0;
   var previousOrderNumber = 0;
   var previousOrderBreak = '';
   var callImportCounter = 0;

   self.reset = function () {
      self.importedFile = null;
      self.maxLines = 50;
      self.importDataCollection = [];
      self.isFileImported = false;
   };
   self.reset();

   self.isImportFromExcel = function () {
      return $state.is(base.baseState + '.importFromExcel');
   };

   self.importFile = function () {
      if (self.importedFile) {
         Utils.readAsBinaryString(self.importedFile, self.fileReaderOnLoadCallback);
      } else {
         MessageService.error('global.error', 'global.input.file.is.required');
      }
   };

   self.fileReaderOnLoadCallback = function (data) {
      var workbook = XLSX.read(data, { type: 'binary' }); //ignore jslint - Defined in library.
      var sheets = [];
      $.each(workbook.Sheets, function (index, value) { //ignore jslint - Defined in library.
         sheets.push(value);
      });

      var importFiles = [];
      sheets.forEach(function (sheet, index) {
         var rowObjects = XLSX.utils.sheet_to_row_object_array(sheet); //ignore jslint - Defined in library.
         rowObjects.forEach(function (row) {
            var newImportFile = {
               cWorkSheet: index,
               iRow: row.__rowNum__, //ignore jslint - correct
               cColValues: ''
            };

            var primaryKey;
            var secondaryKey;
            if (newImportFile.iRow > 0 && newImportFile.iRow < 9) {
               //Pull out the WT Header specific rows from Row 2-9.  The data is in the
               //A and B columns and generically column labeled as Primary and Secondary.
               primaryKey = row['Primary Key'];
               secondaryKey = row['Secondary Key'];
               if (primaryKey) {
                  newImportFile.cColValues += primaryKey;
                  if (secondaryKey) {
                     newImportFile.cColValues += ',' + secondaryKey;
                  }
               }
            } else {
               primaryKey = row['Primary Key']; // Product
               secondaryKey = row['Secondary Key'] ? row['Secondary Key'] : ' '; // Product Description
               var quantity = row['Quantity'] ? row['Quantity'] : ' '; //ignore jslint - correct
               var unit = row['Unit'] ? row['Unit'] : ' '; //ignore jslint - correct
               var required = row['Required Option'] ? row['Required Option'] : ' ';
               var print = row['Print Option'] ? row['Print Option'] : ' ';

               if (primaryKey) {
                  newImportFile.cColValues += primaryKey;        // Contains Product#
               }
               newImportFile.cColValues += ',' + secondaryKey;   // Contains ProductDescription
               newImportFile.cColValues += ',' + quantity;
               newImportFile.cColValues += ',' + unit;
               newImportFile.cColValues += ',' + required;
               newImportFile.cColValues += ',' + print;
            }

            if (newImportFile.cColValues) {
               importFiles.push(newImportFile);
            }
         });
      });

      if (importFiles.length > 0) {
         var importLoadRequest = {
            wtimportfile: importFiles,
            iMaxLines: self.maxLines
         };
         DataService.post('api/wt/aswtheader/wtimportload', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: importLoadRequest, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);

               self.importDataCollection = data.wtimportdata;
               self.isFileImported = true;
            }
         });
      } else {
         MessageService.error('global.error', 'message.imported.file.contained.no.lines.or.was.formatted.incorrectly');
      }
   };

   self.submit = function () {

      // Clear all fields on new submit
      parsedImportData1 = [];
      parsedImportData2 = [];
      parsedImportData3 = [];
      parsedImportData4 = [];
      parsedImportData5 = [];
      importOrderNumber = 0;
      previousOrderNumber = 0;
      previousOrderBreak = '';
      callImportCounter = 0;

      // Count out 200 Files at a time and Update - Time out error in H5
      var parsedImportData = [];
      var iImportLength = self.importDataCollection.length;
      var fullCounter = 0;

      self.importDataCollection.forEach(function (parseData) {

         // Build the Import Data off the full set of data
         parsedImportData.push(parseData);
         fullCounter++;

         // Max Import is 999 - Parse into Arrays of 200 for Back End to process
         if (fullCounter === 200) {
            parsedImportData1 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === 400) {
            parsedImportData2 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === 600) {
            parsedImportData3 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === 800) {
            parsedImportData4 = parsedImportData;
            parsedImportData = [];
         } else if (fullCounter === iImportLength) {
            if (fullCounter < 200) {
               parsedImportData1 = parsedImportData;
            } else if (fullCounter < 400) {
               parsedImportData2 = parsedImportData;
            } else if (fullCounter < 600) {
               parsedImportData3 = parsedImportData;
            } else if (fullCounter < 800) {
               parsedImportData4 = parsedImportData;
            } else {
               parsedImportData5 = parsedImportData;
            }
            parsedImportData = [];
         }
      });

      // Create/Update the WT Order(s) Data
      callImportCounter = 1;
      if (parsedImportData1.length !== 0) {
         self.runOrderImportUpdate(parsedImportData1, self.importFinished);
      }

      self.reset();
   };

   self.cancel = function () {
      self.reset();
   };

   self.drilldown = function (e, args) {
      $state.go('.lineDetails', { selectedLine: args[0].item, row: args[0].row });
   };

   self.importFinished = function (isCompleted) {

      callImportCounter++;

      if (isCompleted) {

         // Create/Update the OE Order Data - save off Order# and WorkSheet# - next Array of data
         if (callImportCounter === 2 && parsedImportData2.length !== 0) {
            self.runOrderImportUpdate(parsedImportData2, self.importFinished);
         } else if (callImportCounter === 3 && parsedImportData3.length !== 0) {
            self.runOrderImportUpdate(parsedImportData3, self.importFinished);
         } else if (callImportCounter === 4 && parsedImportData4.length !== 0) {
            self.runOrderImportUpdate(parsedImportData4, self.importFinished);
         } else if (callImportCounter === 5 && parsedImportData5.length !== 0) {
            self.runOrderImportUpdate(parsedImportData5, self.importFinished);
         }
      }
   };

   self.runOrderImportUpdate = function (importRecord, callback) {

      var record = [];
      record = importRecord[importRecord.length - 1];
      var holdOrderBreak = record.orderbreak;

      var importRecordData = {
         wtimportdata: importRecord,
         iOrderNo: previousOrderNumber,
         cOrderBreak: previousOrderBreak
      };

      DataService.post('api/wt/aswtheader/wtimportupdate', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: importRecordData, busy: true }, function (data) {
         if (data) {

            // Display the Order Number and any Errors
            MessageService.processMessaging(data);

            // Pull Order# from the Message
            data.forEach(function (message) {
               if (message.messagetxt.includes('Warehouse Transfer#:')) {
                  var match = /\d+/.exec(message.messagetxt);
                  if (match[0]) {
                     importOrderNumber = match[0];
                  }
               }
            });

            // Add the newly created order(s) to the MRU
            if (importOrderNumber !== previousOrderNumber && importOrderNumber !== '') {
               self.getOrderAndAddToMru(data);
               previousOrderNumber = importOrderNumber;
            }

            previousOrderBreak = holdOrderBreak;
            self.importFinished(true);

         } else {
            self.importFinished(false);
         }
      });
   };

   self.getOrderAndAddToMru = function (messaging) {
      var orderNumber;
      messaging.forEach(function (message) {
         if (message.messagetxt.includes('Warehouse Transfer#:')) {
            var match = /\d+/.exec(message.messagetxt);
            if (match[0]) {
               orderNumber = match[0];
            }
         }
      });

      var params = {
         wtno: orderNumber,
         wtsuf: 0,
         fldlist: 'rowpointer,wtno,wtsuf'
      };
      orderNumber += '-00';
      DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            MruService.addToList('WTOrder', data.rowpointer, orderNumber, data.wtno, data.wtsuf);
         }
      });
   };

});

app.controller('WtetImportFromExcelDetailsCtrl', function ($state, $stateParams, $scope, DataService, MessageService) {
   // alias => ifeD
   var self = this;
   var ife = $scope.ife;

   self.line = $stateParams.selectedLine;
   self.row = $stateParams.row;

   self.submit = function () {
      var importData = [];
      importData.push(self.line);
      DataService.post('api/wt/aswtheader/wtimportvalidate', { data: importData, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging) && data.wtimportdata[0]) {
               ife.importDataCollection[self.row] = data.wtimportdata[0];
               ife.grid.updateRow(self.row);

               $state.go('^');
            }
         }
      });
   };
});

app.controller('WtetEntryDefaultsCtrl', function ($state, $scope, DataService, UserService, ModalService) {
   //alias => wted
   var self = this;
   var base = $scope.base;
   self.SAVETO_USER = 'u';
   self.SAVETO_PROFILE = 'p';
   self.SAVETO_COMPANY = 'c';
   self.SAVETYPE_CURRENT = 'c';
   self.SAVETYPE_OTHER = 'o';
   self.transferOrderMode = '';
   self.workflowSkipMaintainHeader = false;
   self.workflowLineEntryMode = '';
   self.lineType = '';
   self.easyQuantity = 0;

   self.setDefaults = function (webSettings) {
      webSettings.forEach(function (webSetting) {
         switch (webSetting.settingname) {
            case base.WEBSETTING_DEFAULTTRANSFERORDERMODE:
               if (webSetting.settingvalue) {
                  self.transferOrderMode = webSetting.settingvalue;
               }
               break;
            case base.WEBSETTING_DEFAULTLINEENTRYMODE:
               if (webSetting.settingvalue) {
                  self.workflowLineEntryMode = webSetting.settingvalue;
               }
               break;
            case base.WEBSETTING_SKIPMAINTAINHEADERFIELDS:
               if (webSetting.settingvalue) {
                  self.workflowSkipMaintainHeader = webSetting.settingvalue === 'true';
               }
               break;
            case base.WEBSETTING_DEFAULTLINETYPE:
               if (webSetting.settingvalue) {
                  self.lineType = webSetting.settingvalue;
               }
               break;
            case base.WEBSETTING_EASYDEFAULTQUANTITY:
               if (webSetting.settingvalue) {
                  self.easyQuantity = webSetting.settingvalue;
               }
               break;
            default:
               break;
         }
      });

      //once we've set all the settings that have been returned, set the ones that aren't already set
      if (!self.transferOrderMode) {
         self.transferOrderMode = base.WAREHOUSETRANSFER_MODE_ADD;
      }
      if (!self.transferOrderType) {
         self.transferOrderType = base.WAREHOUSETRANSFER_TYPE_PO;
      }
      if (!self.workflowLineEntryMode) {
         self.workflowLineEntryMode = base.DEFAULTLINEENTRYMODE_EASY;
      }
      if (!self.lineType) {
         self.lineType = base.NONSTOCKTYPE_STOCKED;
      }
      if (!self.easyQuantity && self.easyQuantity === 0) {
         self.easyQuantity = 1;
      }
   };

   //set the defaults
   self.setDefaults(base.defaultWebSettings);

   self.saveFromModal = function (saveTo, user, profile) {
      var webSettings;
      switch (saveTo) {
         case self.SAVETO_USER:
         default:
            webSettings = self.buildWebSettings(saveTo, user);
            break;
         case self.SAVETO_PROFILE:
            webSettings = self.buildWebSettings(saveTo, profile);
            break;
         case self.SAVETO_COMPANY:
            webSettings = self.buildWebSettings(saveTo);
            break;
      }
      DataService.post('api/shared/assharedentry/savewebsetting', { data: webSettings, busy: true }, function () {
         if (saveTo === self.SAVETO_USER && user === UserService.getUserName()) {
            base.defaultWebSettings = webSettings;
            base.setDefaultWebSettings();
         }
         self.destroyModal(true);
      });
   };

   self.loadFromModal = function (saveTo, user, profile) {
      var webSettingLoad = {
         functionname: base.MENU_FUNCTION_POET,
         screenname: base.DEFAULTS_SCREEN_NAME,
         settingname: ''
      };

      switch (saveTo) {
         case self.SAVETO_USER:
         default:
            webSettingLoad.operator = user;
            break;
         case self.SAVETO_PROFILE:
            webSettingLoad.profile = profile;
            break;
      }

      DataService.post('api/shared/assharedentry/loadwebsetting', { data: webSettingLoad, busy: true }, function (data) {
         if (data) {
            self.setDefaults(data);

            self.destroyModal(false);
         }
      });
   };

   self.buildWebSettings = function (type, value) {
      var webSettings = [
         {
            functionname: base.MENU_FUNCTION_WTET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_DEFAULTTRANSFERORDERMODE,
            settingvalue: self.transferOrderMode
         },
         {
            functionname: base.MENU_FUNCTION_WTET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_DEFAULTLINEENTRYMODE,
            settingvalue: self.workflowLineEntryMode
         },
         {
            functionname: base.MENU_FUNCTION_WTET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_SKIPMAINTAINHEADERFIELDS,
            settingvalue: self.workflowSkipMaintainHeader ? 'true' : 'false'
         },
         {
            functionname: base.MENU_FUNCTION_WTET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_DEFAULTLINETYPE,
            settingvalue: self.lineType
         },
         {
            functionname: base.MENU_FUNCTION_WTET,
            screenname: base.DEFAULTS_SCREEN_NAME,
            settingname: base.WEBSETTING_EASYDEFAULTQUANTITY,
            settingvalue: self.easyQuantity
         }];

      webSettings.forEach(function (webSetting) {
         switch (type) {
            case self.SAVETO_USER:
            default:
               webSetting.operator = value;
               break;
            case self.SAVETO_PROFILE:
               webSetting.profile = value;
               break;
         }
      });

      return webSettings;
   };

   self.destroyModal = function (isSaveModal) {
      if (isSaveModal) {
         self.saveModal.destroy();
         self.isSaveModal = false;
      } else {
         self.loadModal.destroy();
         self.isLoadModal = false;
      }
   };

   self.save = function () {
      var webSettings = self.buildWebSettings(self.SAVETO_USER, UserService.getUserName());
      DataService.post('api/shared/assharedentry/savewebsetting', { data: webSettings, busy: true }, function () {
         base.defaultWebSettings = webSettings;
         base.setDefaultWebSettings();
      });
   };

   self.load = function () {
      self.isLoadModal = true;
      ModalService.showModal('shared/transaction-defaults/save-load-defaults-modal.json', 'WtetEntryDefaultsSaveLoadModalCtrl as sldmCtrl', $scope, function (modal) {
         self.loadModal = modal;
      });
   };

   self.saveFor = function () {
      self.isSaveModal = true;
      ModalService.showModal('shared/transaction-defaults/save-load-defaults-modal.json', 'WtetEntryDefaultsSaveLoadModalCtrl as sldmCtrl', $scope, function (modal) {
         self.saveModal = modal;
      });
   };
});

app.controller('WtetEntryDefaultsSaveLoadModalCtrl', function ($state, $scope, $translate, UserService, PvUser) {
   // alias => sldmCtrl
   var self = this;
   var wted = $scope.wted;

   self.saveTo = wted.SAVETO_USER;
   self.saveType = wted.SAVETYPE_CURRENT;
   self.user = UserService.getUserName();
   self.profile = PvUser.webprofilename;
   self.company = UserService.getCono();

   if (wted.isLoadModal) {
      self.title = $translate.instant('global.load.settings');
      self.isSaveMode = false;
   } else if (wted.isSaveModal) {
      self.title = $translate.instant('global.save.settings');
      self.isSaveMode = true;
   }

   self.submit = function () {
      var user = self.saveType === wted.SAVETYPE_CURRENT ? UserService.getUserName() : self.user;
      var profile = self.saveType === wted.SAVETYPE_CURRENT ? PvUser.webprofilename : self.profile;
      if (self.isSaveMode) {
         wted.saveFromModal(self.saveTo, user, profile);
      } else {
         wted.loadFromModal(self.saveTo, user, profile);
      }
   };

   self.cancel = function () {
      wted.destroyModal(self.isSaveMode);
   };
});