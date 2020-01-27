'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'icean', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('ic', 'icean');

   $stateProvider.state('icean.detail', {
      url: '/detail',
      params: { iceanRecord: null, brokentiefl: false },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icean/detail.json');
            },
            controller: 'IceanDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('icean.detail.edit', {
      url: '/edit'
   });

   $stateProvider.state('icean.adjustWriteOff', {
      url: '/adjust-write-off',
      params: {
         iceanTransactionsCriteria: null,
         journalNumber: null,
         iceanTransactionsResult: null,
         operation: null,
         iceanMaintUpdateOperation: null,
         iceanMaintRetrieveTransList: null,
         iceanMaintUpdateTransList: null,
         canLoad: true,
         iceanMaintRetrieveSingle: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icean/adjust-writeoff.json');
            },
            controller: 'IceanAdjustWriteOffCtrl as awc'
         }
      }
   });

   $stateProvider.state('icean.master.inventory', {
      url: '/inventory',
      params: {
         operation: null,
         iceanTransactionsResult: null,
         okCallback: null,
         cancelCallback: null
      },
      views: {
         inventoryView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icean/inventory.json');
            },
            controller: 'IceanInventoryCtrl as invc'
         }
      }
   });
});

app.controller('IceanBaseCtrl', function ($state, DataService, GridService, Utils) {
   var self = this;
   self.showMaster = true;
   self.criteria = {};

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'icean',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'ic',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('icean.master');
   };

   self.includesMaster = function () {
      return $state.includes('icean.master');
   };

   self.isDetail = function () {
      return $state.is('icean.detail');
   };

   self.isJournalState = function () {
      return !($state.is('icean.master.journalOpen'));
   };

   self.includesDetail = function () {
      return $state.includes('icean.detail');
   };

   self.isEdit = function () {
      return $state.is('icean.detail.edit');
   };

   // Perform search and update data set for the grid
   self.search = function (preserveMasterGrid) {
      DataService.post('api/ic/asicentry/iceantransactions', { data: self.criteria, busy: true }, function (data) {
         if (preserveMasterGrid) {
            GridService.softUpdateDataset(self.grid, data.iceantransactionsresults, 'seqno');
         } else {
            self.dataset = data.iceantransactionsresults;
         }
         self.allowmassupdatefl = data.iceantransactionssingle.allowmassupdatefl;
      });
   };
});

app.controller('IceanSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.enddt = Utils.getCurrentDate();
      criteria.sortby = '1';
      criteria.statustype = 'A';
      criteria.typecode = 'n';
      criteria.brokentiefl = false;
   };

   self.clear();

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icean.master');
      }
      base.search();
   };

   self.setBrokenTies = function () {
      if (criteria.typecode === 'd' || criteria.statustype === 'I') {
         $scope.base.isBrokentieEnabled = true;
         return true;
      } else {
         $scope.base.isBrokentieEnabled = false;
         return false;
      }
   };
});

app.controller('IceanMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, SecurityService) {
   var self = this;
   var base = $scope.base;
   var MENU_FUNCTION_ICEAN = 'icean';

   self.TYPE_CODE_N = 'n';
   self.isBrokentieEnabled = false;
   self.currentOperation = '';
   self.canLoad = true;
   self.iceanMaintUpdateOperation = null;
   self.canMassUpdateEnabled = false;
   self.securityLevel = SecurityService.getSecurityLevel(MENU_FUNCTION_ICEAN);

   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (base.isBrokentieEnabled) {
         self.isBrokentieEnabled = base.isBrokentieEnabled;
      } else {
         self.isBrokentieEnabled = base.criteria.brokentiefl;
      }
      $state.go('^.detail', { iceanRecord: record, brokentiefl: self.isBrokentieEnabled });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch && base.criteria.whse) {
      base.search();
   }

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         return false;
      } else {
         return true;
      }
   };

   self.rowSelected = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      self.canMassUpdateEnabled = (base.allowmassupdatefl && selectedRecords.length >= 2 && self.securityLevel > 2 && base.criteria.typecode === self.TYPE_CODE_N);
   };

   self.openAdjustWriteOffContinue = function (selectedRecords, retrieveTransList, updateTransList, iceanmaintretrievesingle) {
      $state.go('icean.adjustWriteOff', {
         iceanTransactionsCriteria: base.criteria,
         journalNumber: base.journal.gJrnlno,
         iceanTransactionsResult: selectedRecords[0],
         operation: self.currentOperation,
         iceanMaintUpdateOperation: self.iceanMaintUpdateOperation,
         iceanMaintRetrieveTransList: retrieveTransList,
         iceanMaintUpdateTransList: updateTransList,
         canLoad: self.canLoad,
         iceanMaintRetrieveSingle: iceanmaintretrievesingle
      });
   };

   self.openAdjustWriteOff = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      var retrieveTransList = [];
      var updateTransList = [];

      if (selectedRecords) {
         selectedRecords.forEach(function (record) {
            var transObj = { icenhRowid: record.icenhRowid };
            retrieveTransList.push(transObj);
            updateTransList.push(transObj);
         });
      }

      var iceanMaintRetrieveOperationList = [];

      var iceanMaintRetrieveOperation = {
         jrnlno: base.journal.gJrnlno,
         operation: self.currentOperation,
         typecd: base.criteria.typecode,
         whse: base.criteria.whse
      };
      iceanMaintRetrieveOperationList.push(iceanMaintRetrieveOperation);

      var request = {
         iceanmaintretrieveoperation: iceanMaintRetrieveOperationList,
         iceanmaintretrievetrans: retrieveTransList
      };

      DataService.post('api/ic/asicentry/iceanmaintenanceretrieve', { data: request, busy: true }, function (data) {
         if (data) {
            var question = MessageService.getQuestionMessages(data.messaging);
            if (question) {
               MessageService.yesNo('global.confirmation', question, function () { //yes
                  self.openAdjustWriteOffContinue(selectedRecords, retrieveTransList, updateTransList, data.iceanmaintretrievesingle);
               });
            } else {
               self.openAdjustWriteOffContinue(selectedRecords, retrieveTransList, updateTransList, data.iceanmaintretrievesingle);
            }
         }
      });
   };

   self.openInventory = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      $state.go('.inventory', {
         operation: self.currentOperation,
         iceanTransactionsResult: selectedRecords[0],
         okCallback: 'inventoryOkCallback',
         cancelCallback: 'inventoryCancelCallback'
      });
   };

   self.adjust = function (operation) {
      self.currentOperation = operation;
      self.canLoad = true;
      if (self.isJournalOpen()) {
         base.journalControl.showOpenView(function () {
            self.openAdjustWriteOff();
         });
      } else {
         self.openAdjustWriteOff();
      }
   };

   self.inventory = function (operation) {
      self.currentOperation = operation;
      if (self.isJournalOpen()) {
         base.journalControl.showOpenView(function () {
            if (base.criteria.typecode === self.TYPE_CODE_N) {
               self.openInventory();
            } else {
               self.openAdjustWriteOff();
            }
         });
      } else if (base.criteria.typecode === self.TYPE_CODE_N) {
         self.openInventory();
      } else {
         self.openAdjustWriteOff();
      }
   };

   self.inventoryOkCallback = function (data) {
      self.canLoad = true;
      self.iceanMaintUpdateOperation = data;
      self.openAdjustWriteOff();
   };

   self.inventoryCancelCallback = function () {
      self.canLoad = false;
      self.openAdjustWriteOff();
   };

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.module && currentRow.order) {
         var orderDetails = currentRow.order.split('-');
         switch (currentRow.module.toUpperCase()) { //ignore jslint - correct indentation
            case 'OE': //ignore jslint - correct indentation
               $state.go('oeio.detail', { pk: orderDetails[0], pk2: orderDetails[1] }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'PO': //ignore jslint - correct indentation
               $state.go('poip.detail', { pk: orderDetails[0], pk2: orderDetails[1] }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'VA': //ignore jslint - correct indentation
               $state.go('vaif.detail', { pk: orderDetails[0], pk2: orderDetails[1] }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'WT': //ignore jslint - correct indentation
               $state.go('wtit.detail', { pk: orderDetails[0], pk2: orderDetails[1] }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };

   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
      }
   };
});

app.controller('IceanDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.iceanRecord = $stateParams.iceanRecord;
   self.brokentiefl = $stateParams.iceanRecord.brokentiefl;
   self.binloc1 = self.iceanRecord.binloc1;
   self.isbrokentieEnable = $stateParams.brokentiefl;
   self.currentLevels = [];
   self.iceanTransSingle = {};
   self.isReadOnly = true;
   self.isBinEditAllowed = base.allowmassupdatefl;

   if (self.iceanRecord && self.iceanRecord.order) {
      var orderDetails = self.iceanRecord.order.split('-');
      self.orderno = orderDetails[0];
      self.ordersuf = orderDetails[1];
   }

   // Criteria to load transactions
   self.criteria = { icenhRowid: self.iceanRecord.icenhRowid, brokentiefl: self.brokentiefl };

   self.selectBrokenTies = function () {
      self.criteria.brokentiefl = self.brokentiefl;
      DataService.post('api/ic/asicentry/iceandetailtransactions', { data: self.criteria, busy: true }, function (data) {
         self.iceanTransList = data.iceandetailtransresults;
         self.iceanTransSingle = data.iceandetailtranssingle;
         self.bindCurrentLevelsGrid();
      });
   };
   self.selectBrokenTies();

   self.bindCurrentLevelsGrid = function () {
      if (self.iceanTransSingle) {
         self.pushCurrentLevels(self.iceanTransSingle.qty1, self.iceanTransSingle.unit1, self.iceanTransSingle.amount1, self.iceanTransSingle.total1);
         self.pushCurrentLevels(self.iceanTransSingle.qty2, self.iceanTransSingle.unit2, self.iceanTransSingle.amount2, self.iceanTransSingle.total2);
         self.pushCurrentLevels(self.iceanTransSingle.qty3, self.iceanTransSingle.unit3, self.iceanTransSingle.amount3, self.iceanTransSingle.total3);
         self.pushCurrentLevels(self.iceanTransSingle.qty4, self.iceanTransSingle.unit4, self.iceanTransSingle.amount4, self.iceanTransSingle.total4);
         self.pushCurrentLevels(self.iceanTransSingle.qty5, self.iceanTransSingle.unit5, self.iceanTransSingle.amount5, self.iceanTransSingle.total5);
      }
   };

   self.pushCurrentLevels = function (qty, unit, amount, total) {
      if (qty || unit || amount || total) {
         self.currentLevels.push({ qty: qty, unit: unit, amount: amount, total: total });
      }
   };

   self.reset = function () {
      self.binloc1 = self.iceanRecord.binloc1;
   };

   //User Hook (do not rename)
   self.oePromptContinue = function (data) {
      MessageService.yesNo('global.confirmation', data.oepromptmess,
         function () {
            // Yes processing
            self.UpdateBinLoc(true);
         }, function () {
            // No processing
            self.UpdateBinLoc(false);
         });
   };

   //User Hook (do not rename)
   self.wtPromptContinue = function (data) {
      MessageService.yesNo('global.confirmation', data.wtpromptmess,
         function () {
            // Yes processing
            self.UpdateBinLoc(true);
         }, function () {
            // No processing
            self.UpdateBinLoc(false);
         });
   };

   //User Hook (do not rename)
   self.iceanBinLocCheckContinue = function (data) {
      self.UpdateBinLoc(false);
   };

   self.submit = function () {
      var binlocCheckCriteria = { icenhRowid: self.iceanRecord.icenhRowid, binloc: self.binloc1 };

      DataService.post('api/ic/asicentry/iceanchgbinloccheck', { data: binlocCheckCriteria, busy: true }, function (data) {
         if (data.oeprompt) {
            //User Hook (do not rename)
            self.oePromptContinue(data); 
         } else if (data.wtprompt) {
            //User Hook (do not rename)
            self.wtPromptContinue(data);
         } else {
            //User Hook (do not rename)
            self.iceanBinLocCheckContinue(data);
         }
      });
   };

   self.UpdateBinLoc = function (updateoewt) {
      var iceanupdatebinloc = { icenhRowid: self.iceanRecord.icenhRowid, binloc: self.binloc1, updateoewt: updateoewt };
      var binLocList = [];
      binLocList.push(iceanupdatebinloc);

      //User Hook (do not rename)
      if (self.setUpdateBinLocCriteria) {
         self.setUpdateBinLocCriteria(iceanupdatebinloc);
      }

      DataService.post('api/ic/asicentry/iceanupdatebinlocation', { data: binLocList, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         // We must navigate two levels up because we are in icean.detail.edit mode when we get here.
         base.search(true);
         $state.go('^.^.master');
      });
   };
});