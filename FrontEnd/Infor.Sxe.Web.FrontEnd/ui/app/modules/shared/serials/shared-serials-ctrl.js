'use strict';
app.controller('SerialsCtrl', function ($scope, $state, $translate, DataService, GridService, MessageService, ModalService, Utils) {
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   //These 'CURRSTATUS' values are driven off the dropdown, and the backend expects these keys as well.
   self.CURRSTATUS_ALL = '';
   self.CURRSTATUS_AVAILABLE = 'a';
   self.serialLookupCurrStatus = self.CURRSTATUS_ALL;
   self.apeidRowid = '';
   self.originalCallingState = '';

   // Column Labels / Columns Hidden / Columns Enabled
   self.columnLabel1 = '';       // Select
   self.columnHidden1 = true;
   self.columnEnabled1 = false;
   self.columnLabel2 = '';       // Serial #
   self.columnHidden2 = true;
   self.columnEnabled2 = false;
   self.columnLabel3 = '';       // Bin Loc
   self.columnHidden3 = true;
   self.columnEnabled3 = false;
   self.columnLabel4 = '';       // Reason Unavail
   self.columnHidden4 = true;
   self.columnEnabled4 = false;
   self.columnLabel5 = '';       // Receipt/Invoice
   self.columnHidden5 = true;
   self.columnEnabled5 = false;
   self.columnLabel6 = '';       // Cost
   self.columnHidden6 = true;
   self.columnEnabled6 = false;
   self.columnLabel7 = '';       // Comment/Customer
   self.columnHidden7 = true;
   self.columnEnabled7 = false;

   /* Quick Entry */
   self.scannedSerial = '';
   self.scanSerialButtonLabel = MessageService.get('global.add.select.serial');

   self.stringTranslate = function (untranslatedString) {
      var translatedString = '';
      var keyString = '';
      var stringToKey = {
         'BinLoc': 'global.bin.location',
         'Comment': 'global.comment',
         'Cost': 'global.cost',
         'Customer': 'global.customer',
         'Invalid': 'global.invalid',
         'Invoice': 'global.invoice.number',
         'Price': 'global.price',
         'Reason': 'global.reason',
         'Receipt': 'global.receipt',
         'Select': 'global.assigned',  //We are using 'Assigned' to be consistent with Lots (and 'Assigned' vs 'Selected' because of confusion with the Grid Selector column).
         'Serial #': 'global.serial.number'
      };
      keyString = stringToKey[untranslatedString];  // ex: returns 'global.quantity'
      if (keyString) {
         translatedString = MessageService.get(keyString); // ex: returns 'Cantidad' in spanish, 'Quantity' in english from the language json
         if (translatedString && translatedString !== keyString) {
            return translatedString;
         } else {
            return untranslatedString;  // If no translation then return blank
         }
      }

      return untranslatedString;
   };

   // Initialize method called both internally and externally
   self.initialize = function (criteria) {
      DataService.post('api/ic/asicentry/icentryserialsoldestcheck', { data: criteria, busy: true }, function (data) {
         if (data) {

            self.originalCriteria = criteria;
            if (criteria.icentryserialscriteria.callingState) {
               self.originalCallingState = criteria.icentryserialscriteria.callingState;
            }

            if (!MessageService.processMessaging(data)) {
               var questionMessageText = MessageService.getQuestionMessages(data);
               if (questionMessageText) {
                  MessageService.yesNo('', questionMessageText, function () {
                     //yes callback
                     criteria.icentryserialscriteria.assignoldest = true;
                     self.initializeSerial(criteria);
                  }, function () {
                     //no callback
                     criteria.icentryserialscriteria.assignoldest = false;
                     self.initializeSerial(criteria);
                  });
               } else {
                  criteria.icentryserialscriteria.assignoldest = false;
                  self.initializeSerial(criteria);
               }
            }
         }
      });
   };

   self.initializeSerial = function (criteria) {
      /* fetch where on prod over icsw field list serlottype
            if criteria.prod is a serial product
               do some other checks
      */
      // Initialize serial data
      var apeiCriteria = criteria;
      DataService.post('api/ic/asicentry/icentryserialsinit', { data: criteria, busy: true }, function (data) {
         if (data) {

            self.criteria = data.icentryserialscriteria;
            if (self.criteria.type.toLowerCase() === 'ap') {
               self.criteria.apeiRowid = apeiCriteria.icentryserialscriteria.apeiRowid;
               self.criteria.origqtylabel = MessageService.get('global.invoiced');
               self.dataset = apeiCriteria.icentryserialslist;
            }
            else {
               self.dataset = data.icentryserialslist;
            }

            // Set the Scan Label
            if (self.criteria && self.criteria.btncreateenabled) {
               self.scanSerialButtonLabel = MessageService.get('global.add.select.serial');
            } else {
               self.scanSerialButtonLabel = MessageService.get('global.select.serial');
            }

            // Load Column Settings - 1 through 7 - by SeqNo
            data.icentryserialsgridinfo.forEach(function (record) {

               var columnLabel = 'columnLabel' + (record.seqno);
               var columnEnabled = 'columnEnabled' + (record.seqno);
               var columnHidden = 'columnHidden' + (record.seqno);

               self[columnLabel] = self.stringTranslate(record.columnlabel);
               self[columnEnabled] = record.columnenabled;
               self[columnHidden] = record.columnhidden;
            });

         }
      });
   };

   self.editColumnEnabled = function (row, cell, value, column, item) {
      if (column.field) {
         switch (column.field) {
            case 'lSelected':
               return self.columnEnabled1;
               break;
            case 'cSerialNo':
               return self.columnEnabled2;
               break;
            case 'cBinLoc':
               return self.columnEnabled3;
               break;
            case 'cReasUnavTy':
               return self.columnEnabled4;
               break;
            case 'dtReceipt':
               return self.columnEnabled5;
               break;
            case 'dCost':
               return self.columnEnabled6;
               break;
            case 'cComment':
               return self.columnEnabled7;
               break;
         }
      }
   };

   self.editColumnHidden = function (columnNum) {

      if (columnNum) {
         switch (columnNum) {
            case '1':
               return self.columnHidden1;
               break;
            case '2':
               return self.columnHidden2;
               break;
            case '3':
               return self.columnHidden3;
               break;
            case '4':
               return self.columnHidden4;
               break;
            case '5':
               return self.columnHidden5;
               break;
            case '6':
               return self.columnHidden6;
               break;
            case '7':
               return self.columnHidden7;
               break;
         }
      }
   };

   // This will invoke the Done call back registred on the custom serials controler
   self.done = function () {
      //Invoke doneCallback if it exists
      if (options.doneCallback) {
         // Remove invoke parenthesis if present since we simply want to get the reference to the function
         var callback = options.doneCallback.replace('()', '');

         if (callback) {
            var fn = Utils.getNestedValue($scope, callback);
            if (fn) {
               if (self.criteria.type === 'oeers') {
                  fn(self.dataset);
               } else if (self.adjustQtyShipFl) {
                  fn(self.adjustQtyShipFl, self.adjustQtyShipAmt);
               } else {
                  fn();
               }
            }
         }
      }
   };

   // New Button Click Function
   self.newSerial = function () {
      ModalService.showModal('shared/serials/new-serial.json', 'OeetNewSerialModalCtrl as aleSerNsm', $scope, function (modal) {
         self.newSerialModal = modal;
      });
   };

   //Scan a Serial
   self.scanSerialProcessing = function () {
      var unProcessedSerial = self.scannedSerial;
      if (self.scannedSerial) {
         //ICSESS serial processing
         var serialStripRequest = {
            vendno: self.criteria.vendno,
            whse: self.criteria.whse,
            product: self.criteria.prod,
            serialno: self.scannedSerial
         };
         DataService.post('api/ic/asicentry/icentryserialsstrip', { data: serialStripRequest, busy: true }, function (data) {
            if (data && data.serialno) {
               self.scannedSerial = data.serialno;
               self.scanSerialProcessingComplete(unProcessedSerial);
            } else {
               self.scanSerialProcessingComplete(unProcessedSerial);
            }
         });
      }
   };

   self.scanSerialProcessingComplete = function (unProcessedSerial) {
      var matchFound = false;
      self.grid.settings.dataset.forEach(function (record) {
         // See if exists in the list already
         var isMatch = (self.scannedSerial.trim().toLowerCase() === record.cSerialNo.trim().toLowerCase());
         if (isMatch) {
            matchFound = true;

            if (!record.lSelected) {
               //Select if it exists in the list
               record.lSelected = true;
               self.updateSerial('Select', record);
            }
         }
      });
      if (!matchFound && self.criteria.btncreateenabled) {
         //Adding logic has it's own ICSESS serial processing, so revert to unProcessedSerial
         self.scannedSerial = unProcessedSerial;

         self.quickSerialAdd(false, false);
      } else if (!matchFound) {
         MessageService.alert('global.alert', 'global.serial.number.not.found');
         self.ApplyScanFocus();
      } else {
         self.scannedSerial = '';
         self.ApplyScanFocus();
      }
   };

   self.ApplyScanFocus = function () {
      self.view.applyAutoFocus();
   };

   //copied from NewSerialModal > submit() on 10/30/17 to prevent modal from showing up when not neccessary
   //any changes made here may also need to be made there
   self.quickSerialAdd = function (wtReturnOrigAnswer, wtReturnOrigAsked) {
      var icEntrySerialsCreate = {
         serialno: self.scannedSerial,
         wtreturnoriganswer: wtReturnOrigAnswer,
         wtreturnorigasked: wtReturnOrigAsked
      };
      var serialsCriteria = {};
      var serialCreateRequest = {};

      if (icEntrySerialsCreate.serialno.includes('-')) {
         var prodwhse = ' - ' + self.criteria.prod + ' - ' + self.criteria.whse;
         var whseprod = ' - ' + self.criteria.whse + ' - ' + self.criteria.prod;
         icEntrySerialsCreate.serialno = icEntrySerialsCreate.serialno.replace(prodwhse, '').replace(whseprod, '');
      }

      if (self.criteria.ourproc.toLowerCase() === 'apei') {
         serialsCriteria = self.criteria;
         serialsCriteria.type = 'po';

         serialCreateRequest = {
            icentryserialslist: self.dataset,
            icentryserialscreate: icEntrySerialsCreate,
            icentryserialscriteria: serialsCriteria
         };
         // icentryserialsrowcreate calls ICSESS serial processing
         DataService.post('api/ic/asicentry/icentryserialsrowcreate', { data: serialCreateRequest, busy: true }, function (data) {
            if (data) {
               var is5858Error = false;
               data.messaging.forEach(function (message) {
                  if (message.messagenum === 5858) {
                     is5858Error = true;
                     return;
                  }
               });
               if (!MessageService.processMessaging(data.messaging) && !is5858Error) {
                  var questionMessageText = '';
                  data.messaging.forEach(function (message) {
                     if (message.messagetype === 'qyn' || message.messagetype === 'qync') {
                        questionMessageText += message.messagetxt + '<br/>';
                     }
                  });

                  if (questionMessageText) {
                     MessageService.yesNo($translate.instant('global.serial.entry.error'), questionMessageText, self.quickSerialAdd(true, true), self.quickSerialAdd(false, true));
                  } else {
                     Utils.replaceObject(self.criteria, data.icentryserialscriteria);
                     Utils.replaceArray(self.dataset, data.icentryserialslist);

                     var serialRequest = {
                        comment: self.comment,
                        apeiRowid: self.apeidRowid,
                        serialno: self.serialNumber
                     };
                     DataService.post('api/ap/asapentry/apeceserialpopup', { data: serialRequest, busy: true }, function (data) {
                        if (data) {
                           self.scannedSerial = '';

                           self.ApplyScanFocus();
                        }
                     });
                  }
               }
            }
         });
      } else {
         serialsCriteria = self.criteria;

         serialCreateRequest = {
            icentryserialslist: self.dataset,
            icentryserialscreate: icEntrySerialsCreate,
            icentryserialscriteria: serialsCriteria
         };
         // icentryserialsrowcreate calls ICSESS serial processing
         DataService.post('api/ic/asicentry/icentryserialsrowcreate', { data: serialCreateRequest, busy: true }, function (data) {
            if (data) {
               var is5858Error = false;
               data.messaging.forEach(function (message) {
                  if (message.messagenum === 5858) {
                     is5858Error = true;
                     return;
                  }
               });
               if (!MessageService.processMessaging(data.messaging) && !is5858Error) {
                  var questionMessageText = '';
                  data.messaging.forEach(function (message) {
                     if (message.messagetype === 'qyn' || message.messagetype === 'qync') {
                        questionMessageText += message.messagetxt + '<br/>';
                     }
                  });

                  if (questionMessageText) {
                     MessageService.yesNo($translate.instant('global.serial.entry.error'), questionMessageText, self.submit(true, true), self.submit(false, true));
                  } else {
                     Utils.replaceObject(self.criteria, data.icentryserialscriteria);
                     Utils.replaceArray(self.dataset, data.icentryserialslist);

                     self.scannedSerial = '';

                     self.ApplyScanFocus();
                  }
               }
            }
         });
      }
   };

   // Lookup Button Click Function
   self.lookupSerial = function () {
      ModalService.showModal('shared/serials/lookup-serial.json', 'OeetLookupSerialModalCtrl as aleSerLsm', $scope, function (modal) {
         self.lookupSerialModal = modal;
      });
   };

   // Save Button Click Function
   self.saveAllCheck = function () {
      var obj = {
         icentryserialslist: self.dataset,
         icentryserialscriteria: self.criteria
      };

      if (obj.icentryserialscriteria.type.toLowerCase() === 'ap') {
         obj.icentryserialscriteria.type = 'po';
      }

      self.adjustQtyShipFl = false;
      self.adjustQtyShipAmt = 0;
      var increaseQty = false;
      var decreaseQty = false;
      var questionMessageText = '';

      DataService.post('api/ic/asicentry/icentryserialssaveallcheck', { data: obj, busy: true }, function (data) {
         if (data) {

            // No Hard Errors
            if (!MessageService.processMessaging(data)) {

               questionMessageText = MessageService.getQuestionMessages(data);

               if (questionMessageText) {

                  self.askIncreaseDecrease(questionMessageText, function (isResponse) {
                     if (isResponse) {
                        if (questionMessageText.substring(0, 8) === 'Increase') {
                           increaseQty = true;
                        } else if (questionMessageText.substring(0, 8) === 'Decrease') {
                           decreaseQty = true;
                        }
                        self.adjustQtyShipFl = true;
                        self.adjustQtyShipAmt = self.criteria.origqty - self.criteria.proofqty;
                        self.save(true, increaseQty, decreaseQty);
                     } else {
                        self.save(true, increaseQty, decreaseQty);
                     }
                  });
               } else {
                  self.save(false, increaseQty, decreaseQty);
               }
            }
         }
      });
   };

   self.askIncreaseDecrease = function (questionText, callback) {
      MessageService.yesNo('', questionText, function () {
         callback(true);
      },
      function () {
         callback(false);
      });
   };

   self.save = function (quantityMismatch, increaseQtyFl, decreaseQtyFl) {
      var obj = {
         icentryserialslist: self.dataset,
         icentryserialscriteria: self.criteria,
         icentryserialssaveresponses: {
            decreaseqtyrcv: decreaseQtyFl,
            decreaseqtyrtn: decreaseQtyFl,
            decreaseqtyship: decreaseQtyFl,
            increaseqtyrcv: increaseQtyFl,
            increaseqtyrtn: increaseQtyFl,
            increaseqtyship: increaseQtyFl
         }
      };

      if (obj.icentryserialscriteria.ourproc.toLowerCase() === 'apei') {
         obj.icentryserialscriteria.type = 'ap';
      }

      DataService.post('api/ic/asicentry/icentryserialssaveall', { data: obj, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentryserialscriteria;
               self.dataset = data.icentryserialslist;

               if (self.criteria.ourproc.toLowerCase() === 'icew' && quantityMismatch && !increaseQtyFl && !decreaseQtyFl) {
                  // On icew, do not return user to previous screen unless they have assigned all serials
                  return;
               }

               self.done();

               if (self.criteria.ourproc.toLowerCase() === 'wtes' && self.originalCallingState) {
                  $state.go('^.detail', { callingState: self.originalCallingState });
               }
               else if (self.originalCallingState) {
                  $state.go('^', { callingState: self.originalCallingState });
               } else {
                  $state.go('^');
               }
            }
         }
      });
   };

   // Cancel Button Click Function
   self.cancel = function () {
      MessageService.yesNo('global.confirmation', 'question.confirm.canceling.all.work.on.this.screen', self.requerySerialEntry);
   };

   // Requery Button Click Function
   self.requerySerialEntry = function () {
      self.initializeSerial(self.originalCriteria);
   };

   self.selected = function (e, args) {
      var record = [];
      record = self.dataset[args.row];

      if (record) {
         if (record.lSelected) {
            self.updateSerial('Select', record);
         } else {
            self.updateSerial('Deselect', record);
         }
      }
   };

   self.getSelectedRecordCount = function () {
      var records = GridService.getSelectedRecords(self.grid);
      return records.length;
   };

   self.updateSerial = function (updateType, singleRow) {

      var serialList = [];
      serialList.push(singleRow);

      var serialRowUpdateRequest = {
         cUpdateType: updateType,
         icentryserialscriteria: self.criteria,
         icentryserialslist: serialList
      };

      if (self.criteria.ourproc.toLowerCase() === 'apei') {
         serialRowUpdateRequest.icentryserialscriteria.type = 'po';
      }

      DataService.post('api/ic/asicentry/icentryserialsrowupdate', { data: serialRowUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentryserialscriteria;

               data.icentryserialslist.forEach(function (newSerial) {
                  for (var idx = 0; idx < self.dataset.length; idx++) {
                     if (self.dataset[idx].cSerialNo === newSerial.cSerialNo) {
                        Utils.replaceObject(self.dataset[idx], newSerial);
                        self.grid.updateRow(idx);
                        break;
                     }
                  }
               });
            } else {
               //TODO: check/uncheck the row based on update type???
            }
         } else {
            //TODO: check/uncheck the row based on update type???
         }
      });
   };

   // Oldest Button Click Function
   self.oldest = function () {
      var obj = {
         icentryserialslist: self.dataset,
         icentryserialscriteria: self.criteria
      };
      DataService.post('api/ic/asicentry/icentryserialsoldest', { data: obj, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentryserialscriteria;
               self.dataset = data.icentryserialslist;
            }
         }
      });
   };

   if (options.conditionReadonly) {
      $scope.$watch(options.conditionReadonly, function (newValue) {
         if (newValue) {
            self.isReadOnly = true;
         } else {
            self.isReadOnly = false;
         }
      });
   }

   // Notify that the controller is now ready
   customCtrl.ready(self);
});

app.controller('OeetNewSerialModalCtrl', function ($scope, $translate, DataService, MessageService, Utils) {
   var self = this;
   var ser = $scope.ser;

   //set all extra fields to disabled/not visible
   self.isBinLocEnabled = false;
   self.isReasonUnavailEnabled = false;
   self.isCostEnabled = false;
   self.isCommentEnabled = false;
   self.isSerialLookupVisible = false;

   //enable fields based on function
   if (ser.criteria.ourproc.toLowerCase() === 'wtei') {
      self.isBinLocEnabled = true;
      self.isReasonUnavailEnabled = true;
   } else if (ser.criteria.ourproc.toLowerCase() === 'vaei' || ser.criteria.ourproc.toLowerCase() === 'poei') {
      self.isBinLocEnabled = true;
      self.isReasonUnavailEnabled = true;
      self.isCommentEnabled = true;
   } else if (ser.criteria.ourproc.toLowerCase() === 'poet') {
      self.isSerialLookupVisible = true;
   } else if (ser.criteria.ourproc.toLowerCase() === 'apei') {
      self.isCommentEnabled = true;
   }

   self.createApEntrySerialResults = function (resp) {
      if (resp) {
         var icentryserialslist = [];
         resp.forEach(function (record) {
            var result = {
               lSelected: true,
               rRecID: record.apeisRecid,
               cSerialNo: record.cSerialNo,
               cComment: record.cComment
            };
            icentryserialslist.push(result);
         });

         return icentryserialslist;
      }
   };

   //copied from NewSerialModal > submit() on 10/30/17 to prevent modal from showing up when not neccessary
   //any changes made here may also need to be made there
   self.submit = function (wtReturnOrigAnswer, wtReturnOrigAsked) {
      var icEntrySerialsCreate = {
         serialno: self.serialNumber,
         comment: self.comment,
         binloc: self.binLoc,
         reasunavty: self.reasonUnavail,
         cost: self.cost,
         wtreturnoriganswer: wtReturnOrigAnswer,
         wtreturnorigasked: wtReturnOrigAsked
      };
      var serialsCriteria = {};
      var serialCreateRequest = {};

      if (icEntrySerialsCreate.serialno.includes('-')) {
         var prodwhse = ' - ' + ser.criteria.prod + ' - ' + ser.criteria.whse;
         var whseprod = ' - ' + ser.criteria.whse + ' - ' + ser.criteria.prod;
         icEntrySerialsCreate.serialno = icEntrySerialsCreate.serialno.replace(prodwhse, '').replace(whseprod, '');
      }

      if (ser.criteria.ourproc.toLowerCase() === 'apei') {
         serialsCriteria = ser.criteria;
         serialsCriteria.type = 'po';
         if (self.cost) {
            serialsCriteria.cost = self.cost;
         }

         serialCreateRequest = {
            icentryserialslist: ser.dataset,
            icentryserialscreate: icEntrySerialsCreate,
            icentryserialscriteria: serialsCriteria
         };
         // icentryserialsrowcreate calls ICSESS serial processing
         DataService.post('api/ic/asicentry/icentryserialsrowcreate', { data: serialCreateRequest, busy: true }, function (data) {
            if (data) {
               var is5858Error = false;
               data.messaging.forEach(function (message) {
                  if (message.messagenum === 5858) {
                     is5858Error = true;
                     return;
                  }
               });
               if (!MessageService.processMessaging(data.messaging) && !is5858Error) {
                  var questionMessageText = '';
                  data.messaging.forEach(function (message) {
                     if (message.messagetype === 'qyn' || message.messagetype === 'qync') {
                        questionMessageText += message.messagetxt + '<br/>';
                     }
                  });

                  if (questionMessageText) {
                     MessageService.yesNo($translate.instant('global.serial.entry.error'), questionMessageText, self.submit(true, true), self.submit(false, true));
                  } else {
                     Utils.replaceObject(ser.criteria, data.icentryserialscriteria);
                     Utils.replaceArray(ser.dataset, data.icentryserialslist);

                     var serialRequest = {
                        comment: self.comment,
                        apeiRowid: ser.apeidRowid,
                        serialno: self.serialNumber
                     };
                     DataService.post('api/ap/asapentry/apeceserialpopup', { data: serialRequest, busy: true }, function (data) {
                        if (data) {
                           ser.newSerialModal.destroy();
                        }
                     });
                  }
               }
            }
         });
      }
      else {
         serialsCriteria = ser.criteria;
         if (self.cost) {
            serialsCriteria.cost = self.cost;
         }
         serialCreateRequest = {
            icentryserialslist: ser.dataset,
            icentryserialscreate: icEntrySerialsCreate,
            icentryserialscriteria: serialsCriteria
         };
         // icentryserialsrowcreate calls ICSESS serial processing
         DataService.post('api/ic/asicentry/icentryserialsrowcreate', { data: serialCreateRequest, busy: true }, function (data) {
            if (data) {
               var is5858Error = false;
               data.messaging.forEach(function (message) {
                  if (message.messagenum === 5858) {
                     is5858Error = true;
                     return;
                  }
               });
               if (!MessageService.processMessaging(data.messaging) && !is5858Error) {
                  var questionMessageText = '';
                  data.messaging.forEach(function (message) {
                     if (message.messagetype === 'qyn' || message.messagetype === 'qync') {
                        questionMessageText += message.messagetxt + '<br/>';
                     }
                  });

                  if (questionMessageText) {
                     MessageService.yesNo($translate.instant('global.serial.entry.error'), questionMessageText, self.submit(true, true), self.submit(false, true));
                  } else {
                     Utils.replaceObject(ser.criteria, data.icentryserialscriteria);
                     Utils.replaceArray(ser.dataset, data.icentryserialslist);

                     ser.newSerialModal.destroy();
                  }
               }
            }
         });
      }
   };

   self.cancel = function () {
      ser.newSerialModal.destroy();
   };
});

app.controller('OeetLookupSerialModalCtrl', function ($scope, $translate, DataService, MessageService, Utils) {
   var self = this;
   var ser = $scope.ser;
   ser.serialLookupCurrStatus = ser.CURRSTATUS_ALL;

   if (ser.criteria.ourproc.toLowerCase() === 'kpew') {
      ser.serialLookupCurrStatus = ser.CURRSTATUS_AVAILABLE;
   }

   self.submit = function (wtReturnOrigAnswer, wtReturnOrigAsked) {
      var icEntrySerialsCreate = {
         serialno: self.serialNumber,
         comment: '',
         binloc: '',
         reasunavty: '',
         cost: 0,
         wtreturnoriganswer: wtReturnOrigAnswer,
         wtreturnorigasked: wtReturnOrigAsked
      };

      if (icEntrySerialsCreate.serialno.includes('-')) {
         var prodwhse = ' - ' + ser.criteria.prod + ' - ' + ser.criteria.whse;
         var whseprod = ' - ' + ser.criteria.whse + ' - ' + ser.criteria.prod;
         icEntrySerialsCreate.serialno = icEntrySerialsCreate.serialno.replace(prodwhse, '').replace(whseprod, '');
      }

      var serialStripRequest = {
         vendno: ser.criteria.vendno,
         whse: ser.criteria.whse,
         product: ser.criteria.prod,
         serialno: self.serialNumber
      };
      DataService.post('api/ic/asicentry/icentryserialsstrip', { data: serialStripRequest, busy: true }, function (data) {
         if (data && data.serialno) {
            icEntrySerialsCreate.serialno = data.serialno;
         }
         var serialCreateRequest = {
            icentryserialslist: ser.dataset,
            icentryserialscreate: icEntrySerialsCreate,
            icentryserialscriteria: ser.criteria
         };
         DataService.post('api/ic/asicentry/icentryserialsrowcreate', { data: serialCreateRequest, busy: true }, function (data) {
            if (data) {
               var is5858Error = false;
               data.messaging.forEach(function (message) {
                  if (message.messagenum === 5858) {
                     is5858Error = true;
                     return;
                  }
               });
               if (!MessageService.processMessaging(data.messaging) && !is5858Error) {
                  var questionMessageText = '';
                  data.messaging.forEach(function (message) {
                     if (message.messagetype === 'qyn' || message.messagetype === 'qync') {
                        questionMessageText += message.messagetxt + '<br/>';
                     }
                  });

                  if (questionMessageText) {
                     MessageService.yesNo($translate.instant('global.serial.entry.error'), questionMessageText, self.submit(true, true), self.submit(false, true));
                  } else {
                     Utils.replaceObject(ser.criteria, data.icentryserialscriteria);
                     Utils.replaceArray(ser.dataset, data.icentryserialslist);

                     ser.lookupSerialModal.destroy();
                  }
               }
            }
         });
      });
   };

   self.cancel = function () {
      ser.lookupSerialModal.destroy();
   };
});