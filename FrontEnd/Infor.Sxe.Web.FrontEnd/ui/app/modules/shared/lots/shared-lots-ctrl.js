'use strict';
app.controller('LotsCtrl', function ($scope, $state, DataService, GridService, MessageService, ModalService, Utils) {
   //alias => lot
   var self = this;
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.lotcutentryList = [];  //i.e. properties such as length1p1, length1p2, etc.
   self.LABEL_DELIMITER = ': ';
   self.OURPROC_POEI = 'poei';
   self.OURPROC_POET = 'poet';
   self.OURPROC_VAEA = 'vaea';
   self.OURPROC_VAEI = 'vaei';
   self.OURPROC_WTEI = 'wtei';
   self.OURPROC_WTEE = 'wtee';
   self.OURPROC_VAET = 'vaet';
   self.OURPROC_VAES = 'vaes';
   self.OURPROC_WTES = 'wtes';
   self.OURPROC_ICEU = 'iceu';
   self.OURPROC_KPEW = 'kpew';
   self.OURPROC_OEES = 'oees';
   //These 'STATUSTYPE' values are driven off the dropdown, and the backend expects these keys as well.
   self.STATUSTYPE_ALL = 'all';
   self.STATUSTYPE_AVAILABLE = 'Available';
   self.lotLookupStatusType = self.STATUSTYPE_ALL;
   self.originalCallingState = '';

   // Column Labels / Columns Hidden / Columns Enabled
   self.columnLabel1 = '';       // Select
   self.columnHidden1 = true;
   self.columnEnabled1 = false;
   self.columnLabel2 = '';       // Lot #
   self.columnHidden2 = true;
   self.columnEnabled2 = false;
   self.columnLabel3 = '';       // Quantity
   self.columnHidden3 = true;
   self.columnEnabled3 = false;
   self.columnLabel4 = '';       // Unavailable
   self.columnHidden4 = true;
   self.columnEnabled4 = false;
   self.columnLabel5 = '';       // Open/Receipt Date
   self.columnHidden5 = true;
   self.columnEnabled5 = false;
   self.columnLabel6 = '';       // Qty Avail
   self.columnHidden6 = true;
   self.columnEnabled6 = false;
   self.columnLabel7 = '';       // Cost/Price
   self.columnHidden7 = true;
   self.columnEnabled7 = false;
   self.columnLabel8 = '';       // Expires Date
   self.columnHidden8 = true;
   self.columnEnabled8 = false;
   self.columnLabel9 = '';       // Comment/Customer
   self.columnHidden9 = true;
   self.columnEnabled9 = false;
   self.columnLabel10 = '';      // Reason Unavail
   self.columnHidden10 = true;
   self.columnEnabled10 = false;
   self.columnLabel11 = '';      // Bin Loc 1
   self.columnHidden11 = true;
   self.columnEnabled11 = false;
   self.columnLabel12 = '';      // Bin Loc 2
   self.columnHidden12 = true;
   self.columnEnabled12 = false;

   self.stringTranslate = function (untranslatedString) {
      var translatedString = '';
      var keyString = '';
      var stringToKey = {
         'Available': 'global.available',
         'Bin Loc 1': 'global.bin.location.1',
         'Bin Loc 2': 'global.bin.location.2',
         'Bin Location 1': 'global.bin.location.1',
         'Bin Location 2': 'global.bin.location.2',
         'Comment': 'global.comment',
         'Cost': 'global.cost',
         'Expire Date': 'global.expire.date',
         'Expires': 'global.expires',
         'Invalid': 'global.invalid',
         'Lot #': 'global.lot.number',
         'Open Date': 'global.open.date',
         'Open': 'global.open',
         'Qty Avail': 'global.quantity.available',
         'Qty Unavail': 'global.quantity.unavailable',
         'Quantity Available': 'global.quantity.available',
         'Quantity Unavailable': 'global.quantity.unavailable',
         'Quantity': 'global.quantity',
         'Received': 'global.received',
         'Reas': 'global.reason.unavailable',
         'Reason Unavailable': 'global.reason.unavailable',
         'Select': 'global.assigned',  //We are using 'Assigned' since 'Selected' confuses the user with the Grid Selection column.
         'Shipped': 'global.shipped',
         'Unavailable': 'global.unavailable',
         'RETURN': 'global.return.uppercase',
         'RECEIVE': 'global.receive.uppercase'
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


   // Lot Cut Dimensions - Per Function
   self.isPoLotDimensionsVisible = false;
   self.poeiLotDimensionsModal = null;
   self.autoAssignModal = null;

   /* VAEA */
   self.lotCutEntryGridVisible = false;

   //what your bound variables to in JSON
   //cuts grid => lot.cutGrid
   //cuts dataset => lot.cutCollection

   // Initialize method called both internally and externally
   self.initialize = function (criteria) {
      self.originalCriteria = criteria;

      if (criteria.callingState) {
         self.originalCallingState = criteria.callingState;
      }

      var lotsOldestCheckRequest = {
         icentrylotscriteria: criteria,
         lInit: true
      };
      DataService.post('api/ic/asicentry/icentrylotsoldestcheck', { data: lotsOldestCheckRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               var questionMessageText = MessageService.getQuestionMessages(data);
               if (questionMessageText) {
                  MessageService.yesNo('', questionMessageText, function () {
                     //yes callback
                     criteria.assignoldest = 'y';
                     self.lotsInit(criteria);
                  }, function () {
                     //no callback
                     criteria.assignoldest = 'n';
                     self.lotsInit(criteria);
                  });
               } else {
                  criteria.assignoldest = 'y';
                  self.lotsInit(criteria);
               }
            }
         }
      });
   };

   self.lotsInit = function (criteria) {

      DataService.post('api/ic/asicentry/icentrylotsinit', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentrylotscriteria;

               //TODO: sas-3/17 may be more to do here in the case of ICEU
               self.lotCollection = data.icentrylotslist;

               // Load Column Settings - 1 through 12 - by SeqNo
               data.icentrylotsgridinfo.forEach(function (record) {

                  var columnLabel = 'columnLabel' + (record.seqno);
                  var columnEnabled = 'columnEnabled' + (record.seqno);
                  var columnHidden = 'columnHidden' + (record.seqno);

                  self[columnLabel] = self.stringTranslate(record.columnlabel);
                  self[columnEnabled] = record.columnenabled;
                  self[columnHidden] = record.columnhidden;
               });

               if (self.criteria.accesscutsenabled) {
                  if (self.criteria.ourproc === self.OURPROC_POEI) {
                     MessageService.info('global.information', 'message.product.is.setup.with.cut.dimensions');
                     self.isPoLotDimensionsVisible = true;
                     self.lotCutEntryGridVisible = true;
                     self.initializeDimensions();
                     // In POEI the launchDimensions is accessed via the cuts button using poei-lot-dimensions.json
                  }
                  if (self.originalCriteria.ourproc === self.OURPROC_VAEA || self.originalCriteria.ourproc === self.OURPROC_WTES || self.originalCriteria.ourproc === self.OURPROC_ICEU || self.originalCriteria.ourproc === self.OURPROC_WTEI || self.originalCriteria.ourproc === self.OURPROC_WTEE || self.originalCriteria.ourproc === self.OURPROC_VAES || self.originalCriteria.ourproc === self.OURPROC_VAET) {  // might want to change this to begins 'va'
                     // In VAEA,WTES and ICEU we do not give the user the option to choose the cut window, cuts show in the grid immediately
                     self.lotCutEntryGridVisible = true;
                     self.initializeDimensions();
                  }
               }
            }
         }
      });
   };

   self.editColumnEnabled = function (row, cell, value, column, item) {

      if (column.field) {
         switch (column.field) {
            case 'lSelected':
               return self.columnEnabled1;
               break;
            case 'cLotNo':
               return self.columnEnabled2;
               break;
            case 'dQuantity':
               return self.columnEnabled3;
               break;
            case 'dQtyUnavail':
               return self.columnEnabled4;
               break;
            case 'dtOpen':
               return self.columnEnabled5;
               break;
            case 'dQtyAvail':
               return self.columnEnabled6;
               break;
            case 'dCost':
               return self.columnEnabled7;
               break;
            case 'dtExpire':
               return self.columnEnabled8;
               break;
            case 'cComment':
               return self.columnEnabled9;
               break;
            case 'cReasUnavTy':
               return self.columnEnabled10;
               break;
            case 'cBinLoc1':
               return self.columnEnabled11;
               break;
            case 'cBinLoc2':
               return self.columnEnabled12;
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
            case '8':
               return self.columnHidden8;
               break;
            case '9':
               return self.columnHidden9;
               break;
            case '10':
               return self.columnHidden10;
               break;
            case '11':
               return self.columnHidden11;
               break;
            case '12':
               return self.columnHidden12;
               break;
         }
      }
   };

   self.quantityChanged = function (e, args) {

      var record = [];
      record = self.lotCollection[args.row];

      if (record) {
         //added this line to default select the checkbox when quantity has been edited in the grid inorder to allocate proof quantity value.
         record.lSelected = true;
         // If an Error is found - reset the Row of Data
         self.updateLot('Save', record, function (isOK) {
            if (!isOK) {
               self.lotGrid.updateCell(args.row, args.cell, args.oldValue);
            }
         });
      }
   };

   self.quantityEnterEditMode = function (e, args) {

      var record = [];

      // In ICEU Modify Reason, the quantity comes in pre-stuffed to indicate transaction amounts for the reason coming from
      // Need to select the line and update before the user edits
      if (self.criteria.currproc.toLowerCase() === 'iceu' &&
         self.criteria.returnfl &&
         self.criteria.returnty.length) {
         record = self.lotCollection[args.row];
         if (record && record.origqty && !record.lSelected) {
            self.updateLot('Select', record, function (isOK) {
               if (!isOK) {
                  self.lotGrid.updateCell(args.row, args.cell, args.oldValue);
               }
            });
         }
      }
   };

   // This will invoke the Done call back registred on the custom lots controler
   self.done = function () {
      //Invoke doneCallback if it exists
      if (options.doneCallback) {
         // Remove invoke parenthesis if present since we simply want to get the reference to the function
         var callback = options.doneCallback.replace('()', '');

         if (callback) {
            var fn = Utils.getNestedValue($scope, callback);
            if (fn) {
               if (self.criteria.type === 'oeers') {
                  fn(self.lotCollection);
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
   self.newLot = function () {
      ModalService.showModal('shared/lots/new-lot.json', 'OeetNewLotModalCtrl as aleLotNlm', $scope, function (modal) {
         self.newLotModal = modal;
      });
   };

   // Lookup Button Click Function
   self.lookupLot = function () {
      ModalService.showModal('shared/lots/lookup-lot.json', 'OeetLookupLotModalCtrl as aleLotLln', $scope, function (modal) {
         self.lookupLotModal = modal;
      });
   };

   // Save Button Click Function
   self.save = function () {
      /* VAEA gets accesscutsenabled set to true in icentrylotsinit for dimensional products */
      if (self.criteria.accesscutsenabled) {
         var lotCutSaveRequest = {
            icentrylotslist: self.lotCollection,
            lotcutlist: self.cutCollection,
            icentrylotscriteria: self.criteria
         };
         DataService.post('api/ic/asicentry/iclotcutselectsave', { data: lotCutSaveRequest, busy: true }, function (data) {
            if (data && !MessageService.processMessaging(data.messaging)) {
               self.saveAllCheck();
            }
         });
      } else {
         self.saveAllCheck();
      }
   };

   self.saveAllCheck = function () {

      self.adjustQtyShipFl = false;
      self.adjustQtyShipAmt = 0;
      var increaseQty = false;
      var decreaseQty = false;
      var questionMessageText = '';

      // Check Only returns the Message table for data
      DataService.post('api/ic/asicentry/icentrylotssaveallcheck', { data: self.criteria, busy: true }, function (data) {
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
                        self.saveAll(increaseQty, decreaseQty);
                     } else {
                        self.saveAll(increaseQty, decreaseQty);
                     }
                  });
               } else {
                  self.saveAll(increaseQty, decreaseQty);
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

   self.saveAll = function (increaseQtyFl, decreaseQtyFl) {
      var lotsSaveAllRequest = {
         icentrylotslist: self.lotCollection,
         lotcutentry: self.lotcutentryList,
         icentrylotscriteria: self.criteria,
         icentrylotssaveresponses: {
            decreaseqtyrcv: decreaseQtyFl,
            decreaseqtyrtn: decreaseQtyFl,
            decreaseqtyship: decreaseQtyFl,
            increaseqtyrcv: increaseQtyFl,
            increaseqtyrtn: increaseQtyFl,
            increaseqtyship: increaseQtyFl
         }
      };

      DataService.post('api/ic/asicentry/icentrylotssaveall', { data: lotsSaveAllRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentrylotscriteria;
               self.lotCollection = data.icentrylotslist;

               self.done();

               if (self.originalCriteria.ourproc === self.OURPROC_KPEW || self.originalCriteria.ourproc === self.OURPROC_OEES) {
                  // state is changed in kpew.js Lot control
               }
               else if (self.originalCriteria.ourproc === self.OURPROC_WTES && self.originalCriteria.callingState) {
                  $state.go('^.detail', { callingState: self.originalCriteria.callingState });
               }
               else if (self.originalCallingState) {
                  $state.go('^', { callingState: self.originalCallingState });
               }
               else {
                  $state.go('^');
               }
            }
         }
      });
   };

   // Cancel Button Click Function
   self.cancel = function () {
      MessageService.yesNo('global.confirmation', 'question.confirm.canceling.all.work.on.this.screen', self.requeryLotEntry);
   };

   // Show the Lot Dimensions Entry screen.
   self.launchDimensions = function () {
      if (self.originalCriteria) {
         if (self.originalCriteria.ourproc === self.OURPROC_POEI) {
            ModalService.showActionPanel('shared/lots/poei-lot-dimensions.json', 'PoeiLotDimensionsCtrl as poeild', $scope, function (modal) {
               self.poeiLotDimensionsModal = modal;
            });
         }
      }
   };

   // Build out the contents of the grid.
   self.initializeDimensions = function () {
      if (self.originalCriteria) {
         if (self.originalCriteria.ourproc === self.OURPROC_VAEA || self.originalCriteria.ourproc === self.OURPROC_POEI || self.originalCriteria.ourproc === self.OURPROC_WTES || self.originalCriteria.ourproc === self.OURPROC_ICEU || self.originalCriteria.ourproc === self.OURPROC_WTEE || self.originalCriteria.ourproc === self.OURPROC_WTEI || self.originalCriteria.ourproc === self.OURPROC_VAES || self.originalCriteria.ourproc === self.OURPROC_VAET) {
            var selectFlag = false;
            if (self.originalCriteria.ourproc === self.OURPROC_WTEE) {
               switch (self.originalCriteria.actionty) {
                  case 'o':
                  case 'u':
                  case 's':
                     selectFlag = true;
                     break;
                  default:
                     selectFlag = false;
                     break;
               }
            }

            var icLotCutSelectInitCriteria = {
               icentrylotslist: self.lotCollection,
               icentrylotscriteria: self.criteria,
               lSelectedOnlyFl: selectFlag
            };
            DataService.post('api/ic/asicentry/iclotcutselectinit', { data: icLotCutSelectInitCriteria, busy: true }, function (data) {
               if (data) {
                  //These of 'lotcutlist' objects. (i.e. length1, length2, length3, etc)
                  self.cutCollection = data;
               }
            });
         }
      }
   };

   // To be used by all of the Lot Dimension Screens for assigning the selecteOnlyFlag for the Initialize call.
   self.dimensionsAssignSelectedOnlyFl = function () {
      var selectedOnlyFl = false;
      switch (self.criteria.currproc.toLowerCase()) {
         case self.OURPROC_VAEA: //ignore jslint - correct indentation
         case self.OURPROC_VAEI: //ignore jslint - correct indentation
         case self.OURPROC_WTEI: //ignore jslint - correct indentation
         case self.OURPROC_WTEE: //ignore jslint - correct indentation
         case self.OURPROC_POEI: //ignore jslint - correct indentation
            selectedOnlyFl = true; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation

         case self.OURPROC_VAET: //ignore jslint - correct indentation
         case self.OURPROC_VAES: //ignore jslint - correct indentation
         case self.OURPROC_WTES: //ignore jslint - correct indentation
         case self.OURPROC_ICEU: //ignore jslint - correct indentation
            selectedOnlyFl = false; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation

         default: //ignore jslint - correct indentation
            selectedOnlyFl = false; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }

      return selectedOnlyFl;
   };

   // Requery Button Click Function
   self.requeryLotEntry = function () {
      self.initialize(self.originalCriteria);
   };

   self.selected = function (e, args) {
      var record = [];
      record = self.lotCollection[args.row];

      if (record) {
         if (record.lSelected) {
            // If an Error is found - reset the Row of Data
            self.updateLot('Select', record, function (isOK) {
               if (!isOK) {
                  self.lotGrid.updateCell(args.row, args.cell, args.oldValue);
               }
            });
         } else {
            // If an Error is found - reset the Row of Data
            self.updateLot('Deselect', record, function (isOK) {
               if (!isOK) {
                  self.lotGrid.updateCell(args.row, args.cell, args.oldValue);
               }
            });
         }
      }
   };

   self.updateLot = function (updateType, singleRow, callback) {

      var lotList = [];
      lotList.push(singleRow);
      var updatedRowIndex = 0;

      // In ICEU Modify Reason, the quantity comes in pre-stuffed to indicate transaction amounts for the reason coming from
      // Need to clear the original quantity on the row before icentrylotsrowupdate so the proof is updated correctly
      if (updateType === 'Select' &&
         self.criteria.currproc.toLowerCase() === 'iceu' &&
         self.criteria.returnfl &&
         self.criteria.returnty.length) {
         lotList[updatedRowIndex].origqty = 0;
      }

      var lotRowUpdateRequest = {
         icentrylotslist: lotList,
         icentrylotscriteria: self.criteria,
         cUpdateType: updateType
      };

      DataService.post('api/ic/asicentry/icentrylotsrowupdate', { data: lotRowUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentrylotscriteria;

               data.icentrylotslist.forEach(function (newLot) {
                  for (var idx = 0; idx < self.lotCollection.length; idx++) {
                     if (self.lotCollection[idx].cLotNo === newLot.cLotNo) {
                        Utils.replaceObject(self.lotCollection[idx], newLot);
                        updatedRowIndex = idx;
                        break;
                     }
                  }
               });

               if (self.criteria.accesscutsenabled && self.lotCollection[updatedRowIndex]) {
                  var icLotCutSelectUpdateCriteria = {
                     lotcutlist: self.cutCollection,
                     icentrylotscriteria: self.criteria,
                     icentrylotslist: self.lotCollection[updatedRowIndex],
                     cUpdateType: updateType
                  };
                  DataService.post('api/ic/asicentry/iclotcutselectupdate', { data: icLotCutSelectUpdateCriteria, busy: true }, function (data) {
                     if (data) {
                        self.cutCollection = data.lotcutlist;
                     } else {
                        self.cutCollection = [];
                     }
                     callback(true);
                  });
               } else {
                  callback(true);
               }
            } else {
               callback(false);
            }
         } else {
            callback(false);
         }
      });
   };

   self.launchAutoAssign = function() {
      if (self.originalCriteria) {
         ModalService.showActionPanel('shared/lots/auto-assign.json', 'AutoAssignModalCtrl as aam', $scope, function (modal) {
            self.autoAssignModal = modal;
         });
      };
   };

   self.autoAssignCallback = function(iNumLots, dTotQtyRcv) {
      var icEntryLotsAutoAssignRequest = {
         icentrylotslist: self.lotCollection,
         icentrylotscriteria: self.criteria,
         iNumLots: iNumLots,
         dTotQtyRcv: dTotQtyRcv
      };
      DataService.post('api/ic/asicentry/icentrylotsautoassign', { data: icEntryLotsAutoAssignRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentrylotscriteria;
               self.lotCollection = data.icentrylotslist;
            }
         }
      });
   };

   // Oldest Button Click Function
   self.oldest = function () {
      MessageService.yesNo('global.question', 'question.split.across.lots', function () {
         self.criteria.assignoldest = 'y';
         self.oldestContinue();
      }, function () {
         self.criteria.assignoldest = 'n';
         self.oldestContinue();
      });
   };

   self.oldestContinue = function () {
      var lotsOldestRequest = {
         icentrylotslist: self.lotCollection,
         icentrylotscriteria: self.criteria
      };
      DataService.post('api/ic/asicentry/icentrylotsoldest', { data: lotsOldestRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.criteria = data.icentrylotscriteria;
               self.lotCollection = data.icentrylotslist;
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

app.controller('OeetNewLotModalCtrl', function ($scope, $translate, DataService, MessageService, Utils) {
   var self = this;
   var lot = $scope.lot;

   self.isBinLoc1Visible = false;
   self.isBinLoc2Visible = false;
   self.isReasonUnavailVisible = false;
   self.isQtyUnavailVisible = false;
   self.isCostDateVisible = false;
   self.isExpireDateVisible = false;
   lot.lotLookupStatusType = lot.STATUSTYPE_ALL;

   if (lot.criteria.ourproc.toLowerCase() === lot.OURPROC_KPEW) {
      self.isBinLoc1Visible = true;
      self.isBinLoc2Visible = true;
      self.isCostDateVisible = true;
      lot.lotLookupStatusType = lot.STATUSTYPE_AVAILABLE;
   }
   else if (lot.criteria.ourproc.toLowerCase() !== lot.OURPROC_POET) {
      self.isBinLoc1Visible = true;
      self.isBinLoc2Visible = true;
      self.isReasonUnavailVisible = true;
      self.isQtyUnavailVisible = true;
      self.isCostDateVisible = true;
      self.isExpireDateVisible = true;
   }

   self.quantity = 0;
   self.openDate = Utils.getCurrentDate();

   self.submit = function (wtReturnOrigAnswer, wtReturnOrigAsked) {
      var lotsRowCreateRequest = {
         icentrylotslist: lot.lotCollection,
         icentrylotscreate: {
            lotno: self.lotNumber,
            opendt: self.openDate,
            quantity: self.quantity,
            expiredt: self.expireDate,
            cost: self.cost,
            binloc1: self.binLoc1,
            binloc2: self.binLoc2,
            qtyunavail: self.quantityUnavail,
            reasunavty: self.reasonUnavail,
            wtreturnoriganswer: wtReturnOrigAnswer,
            wtreturnorigasked: wtReturnOrigAsked,
            selectedfl: true
         },
         icentrylotscriteria: lot.criteria
      };
      DataService.post('api/ic/asicentry/icentrylotsrowcreate', { data: lotsRowCreateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               lot.criteria = data.icentrylotscriteria;

               var questionMessageText = '';
               data.messaging.forEach(function (message) {
                  if (message.messagetype === 'qyn' || message.messagetype === 'qync') {
                     questionMessageText += message.messagetxt + '<br/>';
                  }
               });

               if (questionMessageText) {
                  MessageService.yesNo($translate.instant('global.lot.entry.error'), questionMessageText, self.submit(true, true), self.submit(false, true));
               } else {
                  lot.lotCollection = data.icentrylotslist;

                  lot.newLotModal.destroy();
               }
            }
         }
      });
   };

   self.cancel = function () {
      lot.newLotModal.destroy();
   };
});

app.controller('OeetLookupLotModalCtrl', function ($scope, $translate, DataService, MessageService) {
   //alias => aleLotLln
   var self = this;
   var lot = $scope.lot;

   if (lot.criteria.ourproc.toLowerCase() === lot.OURPROC_KPEW) {
      lot.lotLookupStatusType = lot.STATUSTYPE_AVAILABLE;
   }

   self.submit = function (wtReturnOrigAnswer, wtReturnOrigAsked) {
      var lotRowCreateRequest = {
         icentrylotslist: lot.lotCollection,
         icentrylotscreate: {
            lotno: self.lotNumber,
            opendt: '',
            quantity: 0,
            expiredt: '',
            cost: 0,
            binloc1: '',
            binloc2: '',
            qtyunavail: 0,
            reasunavty: '',
            wtreturnoriganswer: wtReturnOrigAnswer,
            wtreturnorigasked: wtReturnOrigAsked,
            selectedfl: true
         },
         icentrylotscriteria: lot.criteria
      };
      DataService.post('api/ic/asicentry/icentrylotsrowcreate', { data: lotRowCreateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               lot.criteria = data.icentrylotscriteria;

               var questionMessageText = MessageService.getQuestionMessages(data.messaging);
               if (questionMessageText) {
                  MessageService.yesNo('', questionMessageText, function () {
                     //yes callback
                     self.submit(true, true);
                  }, function () {
                     //no callback
                     self.submit(false, true);
                  });
               } else {
                  lot.lotCollection = data.icentrylotslist;

                  //NOT SURE IF THIS IS NECCESSARY, MIGHT ONLY BE NEEDED IN ADD MODE?
                  //if (self.criteria.ourproc === 'kpew') {
                  //   self.criteria.proofqty -= icentrylotscreate.quantity;
                  //}

                  lot.lookupLotModal.destroy();
               }
            }
         }
      });
   };

   self.cancel = function () {
      lot.lookupLotModal.destroy();
   };
});

app.controller('AutoAssignModalCtrl', function ($scope) {
   //alias => aam
   var self = this;
   var lot = $scope.lot;
   self.originalCriteria = lot.originalCriteria;
   self.numberOfLots = 0;
   self.totalQtyReceived = 0;

   self.initiate = function() {
      self.numberOfLots = 1;
      if (self.originalCriteria) {
         self.totalQtyReceived = self.originalCriteria.proofqty;
      }
   };

   self.submit = function () {
      lot.autoAssignCallback(self.numberOfLots, self.totalQtyReceived);
      lot.autoAssignModal.destroy();
   };

   self.cancel = function () {
      lot.autoAssignModal.destroy();
   };

   self.initiate();
});

app.controller('PoeiLotDimensionsCtrl', function ($scope, $translate, DataService, GridService, MessageService) {
   //alias => poeild
   var self = this;
   var lot = $scope.lot;
   self.lotCutList = [];
   self.selectedLots = [];
   self.selectedLot = {};
   self.lotCutEntry = {};
   self.icEntryLotsCriteria = lot.criteria;

   self.getSubTitle = function () {
      if (self.lotCutList) {
         return MessageService.get('global.for.lot.number') + lot.LABEL_DELIMITER + self.selectedLot.cLotNo;
      } else {
         return '';
      }
   };

   self.initializeLotCutEntry = function () {
      if (self.selectedLot) {
         var icLotCutEntryInitializeCriteria = {
            icentrylotslist: self.selectedLots,
            icentrylotscriteria: self.icEntryLotsCriteria,
            cLotno: self.selectedLot.cLotNo
         };

         DataService.post('api/ic/asicentry/iclotcutentryinitialize', { data: icLotCutEntryInitializeCriteria, busy: true }, function (data) {
            if (data) {
               self.lotCutList = data.icentrylotslist;
               lot.lotcutentryList = data.lotcutentry;
               self.lotCutEntry = data.lotcutentry[0];
               self.icEntryLotsCriteria = data.icentrylotscriteria;
            }
         });
      }
   };

   self.initializeCuts = function (selectedOnlyFl) {
      var icLotCutSelectInitCriteria = {
         icentrylotslist: self.selectedLots,
         icentrylotscriteria: self.icEntryLotsCriteria,
         lSelectedOnlyFl: selectedOnlyFl
      };

      DataService.post('api/ic/asicentry/iclotcutselectinit', { data: icLotCutSelectInitCriteria, busy: true }, function (data) {
         if (data) {
            self.lotCutList = data;
            self.initializeLotCutEntry();
         }
      });
   };

   self.initialize = function () {
      if (lot.criteria) {
         self.selectedLots = GridService.getSelectedRecords(lot.lotGrid);

         //By Design, we are limited to only working with one row at a time for presentation in the UI.
         self.selectedLot = self.selectedLots && self.selectedLots.length > 0 ? self.selectedLots[0] : null;

         if (self.icEntryLotsCriteria.accesscutsenabled) {
            self.initializeCuts(lot.dimensionsAssignSelectedOnlyFl());
         }
      }
   };

   self.submitContinueWithSave = function () {
      var icEntryLotsSaveResponses = {
         decreaseqtyrcv: false,
         decreaseqtyrtn: false,
         decreaseqtyship: false,
         increaseqtyrcv: false,
         increaseqtyrtn: false,
         increaseqtyship: false,
         prod: self.icEntryLotsCriteria.prod,
         whse: self.icEntryLotsCriteria.whse
      };

      var lotCutEntryList = [];
      lotCutEntryList.push(self.lotCutEntry);

      var icEntryLotsSaveAllCriteria = {
         icentrylotslist: self.lotCutList,
         lotcutentry: lotCutEntryList,
         icentrylotscriteria: self.icEntryLotsCriteria,
         icentrylotssaveresponses: icEntryLotsSaveResponses
      };

      DataService.post('api/ic/asicentry/icentrylotssaveall', { data: icEntryLotsSaveAllCriteria, busy: true }, function (data) {
         if (data && !MessageService.processMessaging(data.messaging)) {
            self.icEntryLotsCriteria = data.icentrylotscriteria;

            //Refresh data.
            if (self.icEntryLotsCriteria.accesscutsenabled) {
               self.initializeCuts(true);

               //Show the updated list of dimensions.
               lot.initializeDimensions();

               //Close after entry
               lot.poeiLotDimensionsModal.destroy();
            }
         }
      });
   };

   self.submit = function () {
      var lotCutEntryList = [];
      lotCutEntryList.push(self.lotCutEntry);

      DataService.post('api/ic/asicentry/iclotcutentryvalidate', { data: lotCutEntryList, busy: true }, function (data) {
         if (data && !MessageService.processMessaging(data.messaging)) {
            self.lotCutEntry = data.lotcutentry[0];
            self.submitContinueWithSave();
         }
      });
   };

   self.cancel = function () {
      //Show the updated list of dimensions.
      lot.initializeDimensions();
      lot.poeiLotDimensionsModal.destroy();
   };

   self.initialize();
});

