'use strict';

app.config(function ($stateProvider, StateProvider, KitStateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('kp', 'kpew', {
      widgets: ['SEARCH', 'JOURNAL']
   });

   StateProvider.addMasterState('kp', 'kpew', { params: { selectedRecord: undefined } });

   // Components from Master (Existing Work Orders)
   KitStateProvider.addStates('kp', 'kpew', 'kpew.kitcomponents');

   // Components from Quick Work Order Entry - For returning tie info
   KitStateProvider.addStates('kp', 'kpew', 'kpew.quickWorkOrderEntry.kitcomponents');

   BinAllocationStateProvider.addStates('kp', 'kpew', 'kpew.master');

   $stateProvider.state('kpew.quickWorkOrderEntry', {
      url: '/quick-work-order-entry',
      params: {
         qwRecord: null,
         kpworkorder: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/quick-work-order-entry.json');
            },
            controller: 'KpewQuickWorkOrderEntryCtrl as qwo'
         }
      }
   });

   $stateProvider.state('kpew.quickWorkOrderEntry.kitcomponents', {
      url: '/kit-components',
      params: {
         compDoneCallback: null
      },
      views: {
         kitcomp: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/kitcomponents.json');
            }
         }
      }
   });

   $stateProvider.state('kpew.print', {
      url: '/print',
      params: { kpewPrintRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/printer.json');
            },
            controller: 'KpewPrinterCtrl as prt'
         }
      }
   });

   $stateProvider.state('kpew.finalUpdate', {
      url: '/final-update',
      params: { finalParams: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/final-update.json');
            },
            controller: 'KpewFinalUpdateCtrl as fu'
         }
      }
   });

   $stateProvider.state('kpew.components', {
      url: '/components',
      params: { Buildcompttcriteria: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/components.json');
            },
            controller: 'KpewComponentsCtrl as kcc'
         }
      }
   });

   $stateProvider.state('kpew.kitcomponents', {
      url: '/kit-components',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/kitcomponents.json');
            }
         }
      }
   });

   $stateProvider.state('kpew.serial', {
      url: '/serials',
      params: { kpewResult: null, selectedRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/serials.json');
            },
            controller: 'KpewSerialCtrl as sl'
         }
      }
   });

   $stateProvider.state('kpew.lot', {
      url: '/lots',
      params: { kpewResult: null, selectedRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/lots.json');
            },
            controller: 'KpewLotCtrl as lt'
         }
      }
   });

   $stateProvider.state('kpew.availability', {
      url: '/availability',
      params: { kpewRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/availability.json');
            },
            controller: 'KpewAvailabilityCtrl as avl'
         }
      }
   });

   $stateProvider.state('kpew.extendedInfo', {
      url: '/extended-info',
      params: { kpewRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/extendedInfo.json');
            },
            controller: 'KpewExtendedInfoCtrl as eti'
         }
      }
   });

   $stateProvider.state('kpew.workorderTies', {
      url: '/workorder-ties',
      params: { kpewRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/workorder-ties.json');
            },
            controller: 'KpewWorkorderTiesCtrl as wot'
         }
      }
   });

   $stateProvider.state('kpew.seriallot', {
      url: '/serial-lot',
      params: { kpewRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpew/serial-lot.json');
            },
            controller: 'KpewSerialLotCtrl as slt'
         }
      }
   });

   $stateProvider.state('kpew.master.orderStatus', {
      url: '/order-status',
      params: { whseLogStatus: null, menuFunction: null, setWhseLogStatusCallback: null, setFailCallback: null },
      views: {
         orderStatus: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/order-status/order-status.json');
            },
            controller: 'OrderStatusCtrl as ordStat'
         }
      }
   });
});

app.controller('KpewBaseCtrl', function ($state, Utils, DataService, ConfigService, $translate, Sasoo) {
   var self = this;
   self.criteria = {stagecd: '', searchstatuscd: 'all', whse: Sasoo.whse};
   self.authSettings = {};
   self.recoveryData = null;
   self.selectedKitHeader = {};
   self.selectedKitDetails = {};
   self.currentStatus = null;
   self.workOrderForNotes = {
      wono: 0,
      wosuf: 0
   };

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'kpew',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'kp',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('kpew.master');
   };

   self.includesMaster = function () {
      return $state.includes('kpew.master');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      if (self.fullWono) {
         self.criteria.wono = self.fullWono.split('-')[0];
      }

      self.criteria.sortorder = 'w';
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();

      //User Hook (do not rename)
      if (self.setKpewLoadCriteria) {
         self.setKpewLoadCriteria(self.criteria);
      }

      DataService.post('api/kp/askpentry/kpewloadtt', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.kpewloadresults;
      });

      getWLAuthInfo();
   };

   function getWLAuthInfo() {
      DataService.get('api/wl/aswlinquiry/getwlaowhsesettings/' + self.criteria.whse + '/' + '0', { busy: true }, function (data) {
         if (data) {
            self.authSettings.wlesbfl = data[0].wlesbfl;
            self.authSettings.wlwhsefl = data[0].wlwhsefl;
         }
      });
   }

   self.getOrderTypesFromTieDropdownData = function (data) {
      var orderTypes = [];
      for (var i = 0; i < data.length; i++) {
         var currentObj = data[i];
         switch (currentObj.codeval) {
            case 'p': //ignore jslint - correct indentation
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.purchase.order') }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 't': //ignore jslint - correct indentation
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.warehouse.transfer') }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'f': //ignore jslint - correct indentation
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.value.add') }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'w': //ignore jslint - correct indentation
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.kit.production.work.order') }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'n': //ignore jslint - correct indentation
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.no.sourcing') }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'a': //ignore jslint - correct indentation
               orderTypes.push({ value: currentObj.codeval, label: $translate.instant('global.authorized.replenishment.path') }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
      return orderTypes;
   };
});

app.controller('KpewSearchCtrl', function ($scope, $state, DataService, Utils, Sasoo) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      criteria.stagecd = '';
      criteria.searchstatuscd = 'all';
      criteria.whse = Sasoo.whse;
      base.fullWono = '';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('kpew.master');
      }

      base.search();
   };
});

app.controller('KpewMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, AuthService, Utils, $translate) {
   var self = this;
   var base = $scope.base;
   var acceptStatus = 'a';
   var deleteStatus = 'd';
   var cancelStatus = 'c';
   var clearStatus = '';
   var WMALLOC_ADJUST_TYPE_SELL = "sell";
   var WMALLOC_ADJUST_TYPE_BUY = "buy";
   var MODULE = "kpew";
   var ORDERTYPE_KP = "k";
   var currentStatus = null;
   var kpewupdate = null;
   var kpewselected = null;
   var selectedRecord = null;
   var selectedRecords = null;
   var printRecord = null;
   var selectedRecordsCount = 0;
   var selectedRecordIndex = 0;
   var isSerialLotActive = false;
   self.kpet = null;
   self.kpewactions = null;
   self.kpewavail = null;
   self.kpewextend = null;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   if ($stateParams.selectedRecord !== undefined) {
      selectedRecord = $stateParams.selectedRecord;
   }

   function getAoSalesOrderSettings() {
      DataService.get('api/shared/assharedentry/aosalesordersload', { busy: true }, function (data) {
         if (data) {
            self.aoSalesOrder = data;
         }
      });
   }

   getAoSalesOrderSettings();

   self.accept = function () {
      currentStatus = acceptStatus;
      initiateStatusChange();
   };

   self.cancel = function () {
      currentStatus = cancelStatus;
      initiateStatusChange();
   };

   self.deleteRec = function () {
      currentStatus = deleteStatus;
      initiateStatusChange();
   };

   self.isExtendedInfoDisabled = function () {
      var isExtendedDisabled = true;

      if (base.grid.isOneRowSelected()) {
         //if (self.kpewactions) {
         //   if (self.kpewactions.extendinfo) {
         isExtendedDisabled = false;
         //   }
         //}
      }

      return isExtendedDisabled;
   };

   self.isWorkorderTiesDisabled = function () {
      var isWOTiesDisabled = true;

      if (base.grid.isOneRowSelected()) {
         //if (self.kpewactions) {
         //   if (self.kpewactions.woties) {
         isWOTiesDisabled = false;
         //   }
         //}
      }

      return isWOTiesDisabled;
   };

   self.isSerialLotDisabled = function () {
      var isSLDisabled = true;

      if (base.grid.isOneRowSelected()) {
         if (self.kpewactions) {
            if (self.kpewactions.snlots) {
               isSLDisabled = false;
            }
         }
      }

      return isSLDisabled;
   };

   self.isWarehouseManagerVisible = function () {
      var isWMVisible = false;

      if (base.grid.isOneRowSelected()) {
         if (self.kpewextend) {
            if (self.kpewextend.wmfl) {
               isWMVisible = true;
            }
         }
      }

      return isWMVisible;
   };

   function prepareKpew() {
      selectedRecord = GridService.getSelectedRecord(base.grid);
      var kpew = null;

      if (selectedRecord) {
         kpew = {
            glwhse: base.criteria.whse,
            wono: selectedRecord.wono,
            wosuf: selectedRecord.wosuf,
            unit: selectedRecord.unit,
            qtyord: selectedRecord.qtyord,
            kpetrowid: selectedRecord.kpetrowid,
            statuscd: selectedRecord.statuscd,
            singlerowfl: 'yes'
         };
      }

      if (kpew) {
         base.workOrderForNotes.wono = kpew.wono;
         base.workOrderForNotes.wosuf = kpew.wosuf;
      } else {
         base.workOrderForNotes.wono = 0;
         base.workOrderForNotes.wosuf = 0;
      }

      return kpew;
   }

   function getKpewRecords() {
      kpewselected = prepareKpew();
      self.kpewavail = null;
      self.kpewactions = null;

      if (kpewselected) {
         DataService.post('api/kp/askpentry/kpewrowselected', { data: kpewselected, busy: true }, function (data) {
            if (data) {
               self.kpewavail = data.kpewavail;
               self.kpewactions = data.kpewactions;

               getKpewExtend();
            }
         }, function errorCallback(response) {
            //$state.go('^.master');
         });
      }
   }

   function initiateStatusChange() {
      if (!self.isJournalOpen() && currentStatus !== clearStatus) {
         base.journalControl.showOpenView(function (journal, userOpened) {
            self.journalOpened(journal, userOpened);
         });
      } else {
         selectedRecords = GridService.getSelectedRecords(base.grid);
         selectedRecordsCount = selectedRecords.length;
         selectedRecordIndex = 0;

         performStatusChange();
      }
   }

   function performStatusChange() {
      // save currentStatus
      base.currentStatus = currentStatus;

      if ($stateParams.selectedRecord === undefined) {
         selectedRecord = selectedRecords[selectedRecordIndex];
      }

      var journalNo = 0;

      if (base.journal) {
         journalNo = base.journal.gJrnlno;
      }

      kpewselected = { jrnlno: journalNo, glwhse: base.criteria.whse, wono: selectedRecord.wono, wosuf: selectedRecord.wosuf, kpetrowid: selectedRecord.kpetrowid, singlerowfl: 'yes' };

      checkAuthorizationPoints();
   }

   function checkAuthorizationPoints() {
      if (currentStatus !== clearStatus) {
         if (selectedRecord.stagecd > 1 && (base.authSettings.wlwhsefl || base.authSettings.wlesbfl)) {
            if (base.authSettings.wlwhsefl) {
               AuthService.createAuthPoint('wlord', String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, self.authPointPassed, self.authPointFailed);
            }
            else if (base.authSettings.wlesbfl) {
               AuthService.createAuthPoint('esbwl', String.Empty, String.Empty, String.Empty, String.Empty, String.Empty, self.authPointPassed, self.authPointFailed);
            }
         }
         else {
            checkWLOrderStatus();
         }
      }
      else {
         checkWLOrderStatus();
      }
   }

   self.authPointPassed = function () {
      checkWLOrderStatus();
   };

   self.authPointFailed = function () {
      //TODO: Check whether a auth failed message to be shown?
   };

   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         self.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'authPointPassed') {
         MessageService.alert($translate.instant('wl.order.in.process'), $translate.instant('message.you.have.authorization.to.make.changes.that.may.not.get.updated.in.wl'));
      }
      if (parameters.stage && parameters.stage === 'finishFullSuccess') {
         updateRowInfo();
      }
   };

   function checkWLOrderStatus() {
      var status = currentStatus;

      if (currentStatus === clearStatus) {
         status = 'cl';
      }

      DataService.get('api/wl/aswlinquiry/wlstatusgetnew/kpew/' + selectedRecord.wono + '/' + selectedRecord.wosuf + '/' + status, { busy: true }, function (data) {
         if (data) {
            if (!(data.wlwhsefl && data.twlstagecd > 0 && currentStatus !== clearStatus)) {
               updateRowInfo();
            }
            else {
               $state.go('.orderStatus', { whseLogStatus: data, menuFunction: 'kpew', setWhseLogStatusCallback: self.setWhseLogStatusCallback });
            }
         }
      });
   }

   function updateRowInfo() {
      DataService.post('api/kp/askpentry/kpewrowselected', { data: kpewselected, busy: true }, function (data) {
         if (data) {
            //if (data.messaging && data.messaging.length > 0) {
            //   MessageService.errorMessages(data.messaging);
            //}
            //else {
            var journalNo = 0;

            if (base.journal) {
               journalNo = base.journal.gJrnlno;
            }

            if (selectedRecord === null && $stateParams.selectedRecord !== undefined) {
               selectedRecord = $stateParams.selectedRecord;
            }

            kpewselected.unit = selectedRecord.unit;
            kpewselected.qtyord = selectedRecord.qtyord;
            kpewselected.jrnlno = journalNo;
            kpewselected.statuscd = currentStatus;
            self.kpewactions = data.kpewactions;

            if (currentStatus === acceptStatus && self.kpewactions.snlots && $stateParams.selectedRecord === undefined) {
               serialLot();
            }
            else {
               updateKpew();
            }
            //};
         }
      });
   }

   function serialLot() {
      isSerialLotActive = false;

      if (self.kpet) {
         kpewselected = { glwhse: base.criteria.whse, wono: self.kpet.wono, wosuf: self.kpet.wosuf, kpetrowid: self.kpet.rowID, singlerowfl: 'yes' };

         if (self.kpet.serlottype.toUpperCase() === 'L') {
            DataService.post('api/kp/askpentry/kpewbuildlotcriteria', { data: kpewselected, busy: true }, function (data) {
               if (data) {
                  $state.go('^.lot', { kpewResult: data, selectedRecord: selectedRecord });
               }
            });
         }
         else if (self.kpet.serlottype.toUpperCase() === 'S') {
            DataService.post('api/kp/askpentry/kpewbuildserialcriteria', { data: kpewselected, busy: true }, function (data) {
               if (data) {
                  $state.go('^.serial', { kpewResult: data, selectedRecord: selectedRecord });
               }
            });
         }
      }
   }

   function updateKpew() {
      kpewselected.glwhse = base.criteria.whse;

      //User Hook (do not rename)
      if (self.setKpewUpdateCriteria) {
         self.setKpewUpdateCriteria(kpewselected);
      }

      DataService.post('api/kp/askpentry/kpewupdate', { data: kpewselected, busy: true }, function (data) {
         kpewupdate = data.kpewupdate;

         if (currentStatus === acceptStatus) {
            if (!(kpewupdate && (kpewupdate.snlotserrorfl.toLowerCase() === 'kit'))) {
               selectedRecord.statuscd = currentStatus;
            }
         }
         else {
            selectedRecord.statuscd = currentStatus;
         }

         base.grid.loadData(base.dataset);

         //TODO: Need to work on other Recovery data operations like create, delete, etc.
         //updateRecoveryData();

         traverseStatusChange();
      });
   }

   function traverseStatusChange() {
      if (selectedRecordsCount > 1) {
         selectedRecordIndex = selectedRecordIndex + 1;

         if (selectedRecordIndex < selectedRecordsCount) {
            performStatusChange();
         }
      }
   }

   //function updateRecoveryData() {
   //   if (base.recoveryData !== base.criteria.whse && base.journal.gJrnlno !== 0) {
   //      RecoveryService.updateRecoveryRecord('kpew', base.journal.gJrnlno, base.journal.gJrnlno, base.recoveryData, base.criteria.whse);
   //      base.recoveryData = base.criteria.whse;
   //   }
   //}

   self.clear = function () {
      currentStatus = clearStatus;
      initiateStatusChange();
   };

   self.print = function () {
      selectedRecord = GridService.getSelectedRecord(base.grid);
      printRecord = { wono: selectedRecord.wono, wosuf: selectedRecord.wosuf, allowcancelledwofl: '' };

      //TODO: Need to verify whether to navigate to Print screen or not if Stage=9 (cancelled). This is because in SL app it shows the Print popup only if stage value not equal to 9.
      //As of now, I set the allowcancelledwofl value and navigate to Print screen.
      if (selectedRecord.stagecd === 9) {
         MessageService.yesNo('global.confirmation', 'Printing Cancelled Work Order. Do You Wish To Continue?',
                           function () {
                              // Yes processing
                              printRecord.allowcancelledwofl = 'yes';
                              $state.go('^.print', { kpewPrintRecord: printRecord });
                           }, function () {
                              // No processing
                              printRecord.allowcancelledwofl = 'no';
                              $state.go('^.print', { kpewPrintRecord: printRecord });
                           });
      }
      else {
         $state.go('^.print', { kpewPrintRecord: printRecord });
      }
   };

   self.submit = function () {
      if (!self.isJournalOpen()) {
         MessageService.error('global.error', 'global.no.journal.open');
      }
      else {
         var journalNo = 0;

         if (base.journal) {
            journalNo = base.journal.gJrnlno;
         }

         var finalRecord = { jrnlno: journalNo, glwhse: base.criteria.whse, aoSalesOrder: self.aoSalesOrder };
         $state.go('^.finalUpdate', { finalParams: finalRecord });
      }
   };

   self.availability = function () {
      kpewselected = prepareKpew();

      if (kpewselected) {
         DataService.post('api/kp/askpentry/kpewrowselected', { data: kpewselected, busy: true }, function (data) {
            if (data) {
               self.kpewavail = data.kpewavail;
               self.kpewactions = data.kpewactions;

               var record = { kpew: kpewselected, kpet: self.kpet, kpewactions: self.kpewactions, kpewavail: self.kpewavail };

               $state.go('^.availability', { kpewRecord: record });
            }
         }, function errorCallback(response) {
            //$state.go('^.master');
         });
      }
   };

   self.extendedInfo = function () {
      kpewselected = prepareKpew();
      self.kpewavail = null;
      self.kpewactions = null;
      var isExtendSuccess = true;

      if (kpewselected && kpewselected.statuscd !== clearStatus) {
         isExtendSuccess = false;

         DataService.post('api/kp/askpentry/kpewextendinit', { data: kpewselected, busy: true }, function (data) {
            if (data) {
               self.kpewextend = data;
               isExtendSuccess = true;
            }
         });
      }

      if (kpewselected && isExtendSuccess) {
         DataService.post('api/kp/askpentry/kpewrowselected', { data: kpewselected, busy: true }, function (data) {
            if (data) {
               self.kpewavail = data.kpewavail;
               self.kpewactions = data.kpewactions;

               var record = { kpew: kpewselected, kpet: self.kpet, kpewavail: self.kpewavail };

               $state.go('^.extendedInfo', { kpewRecord: record });
            }
         }, function errorCallback(response) {
            //$state.go('^.master');
         });
      }
   };

   self.workorderTies = function () {
      kpewselected = prepareKpew();

      if (kpewselected) {
         DataService.post('api/kp/askpentry/kpewrowselected', { data: kpewselected, busy: true }, function (data) {
            if (data) {
               var record = { kpew: kpewselected };

               $state.go('^.workorderTies', { kpewRecord: record });
            }
         }, function errorCallback(response) {
            //$state.go('^.master');
         });
      }
   };

   self.seriallot = function () {
      kpewselected = prepareKpew();

      var record = { kpew: kpewselected, kpet: self.kpet };

      $state.go('^.seriallot', { kpewRecord: record });
   };

   function getKpewExtend() {
      kpewselected = prepareKpew();

      if (kpewselected && kpewselected.statuscd === clearStatus) {
         DataService.post('api/kp/askpentry/kpewextendinit', { data: kpewselected, busy: true }, function (data) {
            if (data) {
               self.kpewextend = data;
            }
         });
      }
   }

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSavedCallback = function (wmbinassignment) {
      self.kpewextend.wmqtyship = wmbinassignment.wmqtyship;
      DataService.post('api/kp/askpentry/kpewextendupdt', { data: self.kpewextend, busy: true }, function (data) {
         if (data) {
            self.kpewextend = data;
            $state.go('kpew.master');
            base.search();
         }
      });
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActionsCallback = function (wmbinassignment) {
      self.kpewextend.wmqtyship = wmbinassignment.wmqtyship;
   };

   self.warehouseManager = function () {
      var kpewRecord = GridService.getSelectedRecord(base.grid);

      if (kpewRecord && self.kpewextend) {
         var quantity = self.kpewextend.stkqtyship;
         var qtyship = quantity < 0 ? quantity * -1 : quantity;
         var wmadjtype = self.kpewextend.stkqtyship < 0 ? WMALLOC_ADJUST_TYPE_SELL : WMALLOC_ADJUST_TYPE_BUY;
         var returnfl = self.kpewextend.stkqtyship < 0;

         var wmbinassignCriteria = {
            altwhse: "",
            currproc: MODULE,
            jrnlno: 0,
            kitfl: false,
            lineno: 0,
            ourproc: MODULE,
            ordertype: ORDERTYPE_KP,
            orderno: self.kpewextend.wono,
            ordersuf: self.kpewextend.wosuf,
            potype: "",
            prod: self.kpewextend.shipprod,
            returnfl: returnfl,
            seqno: 0,
            skipnonkitlogic: true,
            stkqtyship: qtyship,
            stkqtyrcv: 0,
            unit: self.kpewextend.unit,
            vamodule: "",
            wmadjtype: wmadjtype,
            wmqtyrcv: 0,
            whse: self.kpewextend.whse
         };

         var isCancel = false;
         //if (kpewRecord.accepttype === "c") {
         //  isCancel = true;
         //}

         if (self.kpewextend.wmqtyship !== self.kpewextend.stkqtyship) {
            MessageService.info('global.alert', 'message.warehouse.manager.bins.are.not.fully.allocated');

            $state.go('.bin-allocation', {
               criteria: wmbinassignCriteria,
               binAllocationDisabled: isCancel,
               submittedCallback: 'mst.binAllocationSavedCallback',
               actionsCallback: 'mst.binAllocationActionsCallback'
            });
         }
      }
   };

   function getKpet() {
      selectedRecord = GridService.getSelectedRecord(base.grid);

      if (selectedRecord) {
         var params = {
            wono: selectedRecord.wono,
            wosuf: selectedRecord.wosuf,
            fillmode: true
         };

         DataService.get('api/kp/kpet/getbypk', { params: params, busy: true }, function (data) {
            self.kpet = data;
         });
      }
   }

   self.selectedRecordChanged = function () {
      getKpet();
      getKpewRecords();
   };

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         return true;
      } else {
         return false;
      }
   };

   self.journalOpened = function (journal, userOpened) {
      if (!userOpened) {
         selectedRecords = GridService.getSelectedRecords(base.grid);
         selectedRecordsCount = selectedRecords.length;
         selectedRecordIndex = 0;

         performStatusChange();
      }
   };

   if ($stateParams.selectedRecord !== undefined) {
      currentStatus = acceptStatus;
      initiateStatusChange();
   }

   self.showComponents = function () {
      kpewselected = prepareKpew();
      self.kpewavail = null;
      self.kpewactions = null;

      if (kpewselected) {
         DataService.post('api/kp/askpentry/kpewrowselected', { data: kpewselected, busy: true }, function (data) {
            if (data) {
               self.kpewavail = data.kpewavail;
               self.kpewactions = data.kpewactions;

               var selectedRecord = GridService.getSelectedRecord(base.grid);
               if (selectedRecord) {
                  base.selectedKitHeader = {
                     runmode: 'comp',
                     ourproc: 'kpew',
                     currproc: 'kpew',
                     orderno: self.kpet.wono,
                     ordersuf: self.kpet.wosuf,
                     whse: self.kpet.whse,
                     prevState: $state.current.name
                  };

                  base.selectedKitDetails = {
                     prod: self.kpet.shipprod,
                     specnstype: '',
                     lineno: 0,
                     returnfl: self.kpet.stkqtyord < 0,
                     qtyord: Math.abs(self.kpet.qtyord),
                     stkqtyord: Math.abs(self.kpet.stkqtyord)
                  };
                  $state.go('^.kitcomponents');
               }
            }
         }, function errorCallback(response) {
            //$state.go('^.master');
         });
      }
   };

   self.navigateToWorkOrderInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('kpiw.detail', { pk: currentRow.wono, pk2: currentRow.wosuf });
      }
   };

   self.navigateToKitProdInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }
   };
});

app.controller('KpewQuickWorkOrderEntryCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Sasoo, TabService) {
   var self = this;
   var base = $scope.base;
   var qwRecord = $stateParams.qwRecord;
   var returnKpOrder = $stateParams.kpworkorder;

   self.Kpqentrycriteria = { whse: Sasoo.whse };

   self.kpewavail = {};
   self.kpqentryresults = [];
   self.kpworkorder = {};
   self.kpworkorderlist = [];
   self.kitComponentSourcingHeader = {};
   self.kitComponentSourcingCollection = [];
   self.icsp = {};

   self.isComponentsEnabled = false;
   var isContinueSectionReadOnly = true;

   self.includesKitsState = function () {
      return $state.includes('kpew.quickWorkOrderEntry.kitcomponents');
   };

   function getIcsp() {
      var params = {
         prod: self.Kpqentrycriteria.prod,
         fillmode: true
      };

      DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
         if (true) {
            self.icsp = data;
         }
      });
   }

   // return from Component Availabilty
   if (qwRecord) {
      self.Kpqentrycriteria.whse = qwRecord.whse;
      self.Kpqentrycriteria.prod = qwRecord.prod;
      self.Kpqentrycriteria.kitverno = qwRecord.verno;

      getIcsp();
   }

   // return from Components (Master)
   if (returnKpOrder) {
      self.Kpqentrycriteria.whse = returnKpOrder.whse;
      self.Kpqentrycriteria.prod = returnKpOrder.prod;
      self.Kpqentrycriteria.kitverno = returnKpOrder.kitverno;
      self.kpworkorder = returnKpOrder;
      self.isComponentsEnabled = true;
      isContinueSectionReadOnly = false;
   }

   function validate() {
      if (self.Kpqentrycriteria.whse && self.Kpqentrycriteria.prod) {
         return true;
      }
   }

   function checkProductStatus() {
      var isValid = true;

      if (self.icsp) {
         if (self.icsp.statustype.toLowerCase() === 'i') {
            isValid = false;
            MessageService.error('global.error', 'error.product.cannot.be.inactive.icsp.4735');
         }
         else {
            if (self.icsp.kittype.toLowerCase() !== 'p') {
               isValid = false;
               MessageService.error('global.error', 'error.product.must.be.a.prebuilt.kit.icsp.4716');
            }
         }
      }

      return isValid;
   }

   self.continueCreate = function () {
      isContinueSectionReadOnly = true;
      self.isComponentsEnabled = false;

      if (validate()) {
         load();
      }
      else {
         MessageService.error('global.error', 'global.required.fields');
      }
   };

   self.kitProductChange = function () {
      if (self.Kpqentrycriteria.prod) {
         var requestCriteria = {
            cKitProd: self.Kpqentrycriteria.prod
         };
         DataService.post('api/kp/askpsetup/kpgetlastverno', { data: requestCriteria, busy: true }, function (lastVerno) {
            self.Kpqentrycriteria.kitverno = lastVerno || 0;
         });

         getIcsp();
      }
   };

   self.quantityOrderedChanged = function () {
      var params = { kpworkorder: '', cFieldName: '' };
      params = {
         kpworkorder: self.kpworkorder,
         cFieldName: 'qtyord'
      };

      DataService.post('api/kp/askpentry/kpwocreatefieldleave', { data: params, busy: true }, function (data) {
         if (data) {
            self.kpworkorder = data;
            self.kpewavail.qtyshipk = self.kpworkorder.qtyship;
         }
      });
   };

   self.unitChanged = function () {
      var params = { kpworkorder: '', cFieldName: '' };
      params = {
         kpworkorder: self.kpworkorder,
         cFieldName: 'unit'
      };

      DataService.post('api/kp/askpentry/kpwocreatefieldleave', { data: params, busy: true }, function (data) {
         if (data) {
            self.kpworkorder = data;
            self.kpewavail.qtyshipk = self.kpworkorder.qtyship;
         }
      });
   };

   self.quantityShippedChanged = function () {
      var params = { kpworkorder: '', cFieldName: '' };
      params = {
         kpworkorder: self.kpworkorder,
         cFieldName: 'qtyship'
      };

      DataService.post('api/kp/askpentry/kpwocreatefieldleave', { data: params, busy: true }, function (data) {
         if (data) {
            self.kpworkorder = data;
            self.kpewavail.qtyshipk = self.kpworkorder.qtyship;
         }
      });
   };

   self.woTieChanged = function () {
      var entireWOTie = self.workordertie.split('-');

      if (entireWOTie.length === 2) {
         self.kpworkorder.orderaltno = entireWOTie[0];
         self.kpworkorder.orderaltsuf = entireWOTie[1];
      } else {
         self.kpworkorder.orderaltno = 0;
         self.kpworkorder.orderaltsuf = 0;
      }
   };

   function load() {
      DataService.post('api/kp/askpentry/kpworkordercreate', { data: self.Kpqentrycriteria, busy: true }, function (data) {
         if (data) {
            if (data.kpqentryresults.allow8791fl.toLowerCase() === 'required') {
               MessageService.yesNo('global.warning', 'message.newer.version.exists.click.yes.to.continue',
               function () {
                  // Yes processing
                  self.Kpqentrycriteria.allow8791fl = 'yes';
                  load();
               },
               function () {
                  // No processing
               });
            }
            else {
               self.Kpqentrycriteria.allow8791fl = String.Empty;
               self.kpewavail = data.kpewavail;
               self.kpworkorder = data.kpworkorder;
               self.workordertie = '';

               //User Hook (do not rename)
               if (self.getKpWorkOrder) {
                  self.getKpWorkOrder(self.kpworkorder);
               }
            }

            self.isComponentsEnabled = true;
            isContinueSectionReadOnly = false;

            //Overwrite the selected WorkOrder so our notes refresh and there isn't residual data.
            if (self.kpworkorder) {
               base.workOrderForNotes.wono = self.kpworkorder.wono;
               base.workOrderForNotes.wosuf = self.kpworkorder.wosuf;
            }
         }
      });
   }

   self.isContinueClicked = function () {
      return isContinueSectionReadOnly;
   };

   self.isContinueClicked2 = function () {
      return !isContinueSectionReadOnly;
   };

   self.compAvailability = function () {
      if (validate()) {
         if (checkProductStatus()) {
            availability();
         }
      }
      else {
         MessageService.error('global.error', 'global.required.fields');
      }
   };

   function availability() {
      var record = {
         whse: self.Kpqentrycriteria.whse,
         prod: self.Kpqentrycriteria.prod,
         qty: 1.0,
         expgrpoptfl: true,
         vernoenteredfl: true,
         verno: self.Kpqentrycriteria.kitverno
      };

      $state.go('^.components', {
         Buildcompttcriteria: record
      });
   }

   function saveWO() {

      //User Hook (do not rename)
      if (self.setKpWorkOrder) {
         self.setKpWorkOrder(self.kpworkorder);
      }

      if (parseInt(self.kpworkorder.qtyship, 10) > parseInt(self.kpworkorder.qtyord, 10)) {
         MessageService.error('global.error', 'error.qty.shipped.has.exceeded.qty.ordered.5644');
      }
      else {
         //Get a current copy of the KPET so we deal with a possible concurrency issue with
         //Notes.  If we are in the process of creating new KPET and they use
         //The WebPart to create/delete the Notes, that process will set the kpet.notesfl
         //field for us.  The current one in memory is possibly stale data.  This will get us
         //latest data so we don't stomp on good data.
         DataService.get('api/kp/kpet/getbyrowid/' + self.kpworkorder.kpetrowid, function (kpetData) {
            if (kpetData) {
               self.kpworkorder.notesfl = kpetData.notesfl;
            }

            isContinueSectionReadOnly = false;
            self.isComponentsEnabled = true;
            var record = { kpworkorderlist: self.kpworkorderlist, kpworkorder: self.kpworkorder };

            DataService.post('api/kp/askpentry/kpworkorderupdate', { data: record, busy: true }, function (data) {
               if (data) {
                  isContinueSectionReadOnly = true;
                  self.isComponentsEnabled = false;

                  if (data.kpworkorder.allowcomptiefl.toLowerCase() === 'required') {
                     MessageService.yesNo('global.confirmation', 'global.confirm.component.already.tied.to.another.document',
                        function () {
                           // Yes processing
                           self.kpworkorder.allowcomptiefl = 'yes';
                           saveWO();
                        },
                        function () {
                           // No processing
                           isContinueSectionReadOnly = false;
                           self.isComponentsEnabled = true;
                        });
                  }
                  else if (data.kpworkorder.allowshipoverridefl.toLowerCase() === 'required') {
                     MessageService.yesNo('global.confirmation', 'question.avail.has.changed.to.less.than.qty.ship.or.qty.ship.overr',
                        function () {
                           // Yes processing
                           self.kpworkorder.qtyship = data.kpworkorder.qtyship;
                           self.kpworkorder.stkqtyship = data.kpworkorder.stkqtyship;
                           self.kpworkorder.allowshipoverridefl = 'yes';
                           saveWO();
                        },
                        function () {
                           // No processing
                           self.kpworkorder.allowshipoverridefl = 'yes';
                           saveWO();
                        });
                  }
                  else {
                     MessageService.info('global.information', $translate.instant('global.created.wo.number') + ' ' + data.kpworkorder.wono);

                     if (!self.kplist) {
                        self.kplist = self.kpworkorder.wono + '-00';
                     } else {
                        self.kplist = self.kplist.concat(', ', self.kpworkorder.wono + '-00');
                     }
                     self.kpworkorderlist = data.kpworkorderlist;
                     self.kpewavail = {
                     };
                     self.kpworkorder = {
                     };
                     self.workordertie = '';

                     saveWorkOrderSourcing();
                  }
               }
            });  //kpworkorderupdate
         }); //getbyrowid
      }
   }

   self.save = function () {
      saveWO();
   };

   function saveWorkOrderSourcing() {
      //Just some protection if the tiehdr or collection of lineties is not available.
      if (self.kitComponentSourcingHeader && self.kitComponentSourcingCollection.length > 0) {

         var param = {
            oelinelinetie: self.kitComponentSourcingCollection,
            oelinelinetiehdr: self.kitComponentSourcingHeader
         };

         DataService.post('api/kp/askpentry/kpcomptieupdate', { data: param, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data);
               self.kitComponentSourcingHeader = {};
               self.kitComponentSourcingCollection = [];
            }
         });
      }
   }

   self.cancel = function () {
      DataService.post('api/kp/askpentry/kpworkordercancel', { data: self.kpworkorder, busy: true }, function (data) {
         if (data) {
            self.kpworkorder = data;

            if (self.kpworkorder.confirmdeletefl.toLowerCase() === 'required') {
               MessageService.yesNo('global.question', 'You have work order started, if you cancel you will delete this work order.Is this OK?',
                           function () {
                              // Yes processing
                              self.kpworkorder.confirmdeletefl = 'Yes';
                              deleteWO();
                              isContinueSectionReadOnly = true;
                              self.isComponentsEnabled = false;
                           },
                           function () {
                              // No processing
                              isContinueSectionReadOnly = false;
                              self.isComponentsEnabled = true;
                           });
            }
         }
      });
   };

   function deleteWO() {
      DataService.post('api/kp/askpentry/kpworkordercancel', { data: self.kpworkorder, busy: true }, function (data) {
         if (data) {
            self.kpewavail = {};
            self.kpworkorder = {};
            self.workordertie = '';
            self.kitComponentSourcingHeader = {};
            self.kitComponentSourcingCollection = [];
            $state.go('^.master', null, {
               reload: '^.master'
            });
         }
      });
   }

   self.components = function () {
      if (self.kpworkorder) {
         base.selectedKitHeader = {
            ourproc: 'kpew',
            currproc: 'kpew',
            orderno: self.kpworkorder.wono,
            ordersuf: self.kpworkorder.wosuf,
            whse: self.kpworkorder.whse,
            prevState: $state.current.name,
            kpworkorder: self.kpworkorder
         };

         base.selectedKitDetails = {
            prod: self.kpworkorder.prod,
            specnstype: '',
            lineno: self.kpworkorder.orderaltlineno,
            verno: self.kpworkorder.kitverno,
            returnfl: false
         };
         $state.go('.kitcomponents', {
            compDoneCallback: self.compDoneCallback
         });
      }
   };

   self.compDoneCallback = function (sourcingHeader, sourcingCollection, returnKpOrder) {
      self.kitComponentSourcingCollection = sourcingCollection;
      self.kitComponentSourcingHeader = sourcingHeader;
      self.Kpqentrycriteria.whse = returnKpOrder.whse;
      self.Kpqentrycriteria.prod = returnKpOrder.prod;
      self.Kpqentrycriteria.kitverno = returnKpOrder.kitverno;
      self.kpworkorder = returnKpOrder;
      self.isComponentsEnabled = true;
      isContinueSectionReadOnly = false;
      $state.go('^');
   };

   self.back = function () {
      if (self.isComponentsEnabled) {
         self.cancel();
      } else {
         $state.go('^.master', null, {
            reload: '^.master'
         });
      }
   };

   TabService.canUserCloseTab('kpew.quickWorkOrderEntry', function () {
      if (self.isComponentsEnabled) {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      } else {
         return true;
      }
   });
});

app.controller('KpewComponentsCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   self.criteria = $stateParams.Buildcompttcriteria;
   self.buildcompttresults = [];
   self.buildcompttsingle = {};

   function refreshComponents() {
      DataService.post('api/ic/asicwhseprod/buildcomponenttemptable', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.buildcompttresults = data.buildcompttresults;
            self.buildcompttsingle = data.buildcompttsingle;
         }
      });
   }

   refreshComponents();

   self.refresh = function () {
      //TODO Validations
      refreshComponents();
   };

   self.ok = function () {
      $state.go('^.quickWorkOrderEntry', { qwRecord: self.criteria });
   };
});

app.controller('KpewPrinterCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var kpewPrint = null;
   self.kpew = $stateParams.kpewPrintRecord;

   function printInit() {
      kpewPrint = self.kpew;

      DataService.post('api/kp/askpentry/kpewprintinit', { data: kpewPrint, busy: true }, function (data) {
         if (data) {
            kpewPrint = data;
         }
      });
   }

   printInit();

   // To check the printer validation
   self.ok = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails; // If it required, printerFinalSettings object will update with additional settings based on menu function
            self.savePrinterSettings();
         }
      });
   };

   //Final printer settings save with additional details(if any additional)
   //self.printerSettings = self.printerControl.printerSettings;   //to access the printer screen data
   //if any additional data required , use pasc.additionalSettings.properties and update the database input object: pasc is ApeePrinterSettingsCtrl
   self.savePrinterSettings = function () {
      self.printerData = { kpewprint: kpewPrint, printersettings: self.printerFinalSettings };

      DataService.post('api/kp/askpentry/kpewprintrun', { data: self.printerData, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master', null, {
               reload: '^.master'
            });
         }
      });
   };
});

app.controller('KpewRowDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, Utils) {
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   var kpewselected = null;
   var item = mst.rowParams.item;
   var row = mst.rowParams.row;
   var grid = mst.rowParams.grid;

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = angular.copy(item);

   if (self.rowDetail) {
      base.workOrderForNotes.wono = self.rowDetail.wono;
      base.workOrderForNotes.wosuf = self.rowDetail.wosuf;
   } else {
      base.workOrderForNotes.wono = 0;
      base.workOrderForNotes.wosuf = 0;
   }

   function checkAvailability() {
      var availData = {
         singlerowfl: true,
         glwhse: base.criteria.whse,
         kpetrowid: self.rowDetail.kpetrowid,
         wono: self.rowDetail.wono,
         wosuf: self.rowDetail.wosuf,
         unit: self.rowDetail.unit,
         qtyord: self.rowDetail.qtyord,
         statuscd: self.rowDetail.statuscd
      };
      DataService.post('api/kp/askpentry/kpewrowselected', { data: availData, busy: true }, function (data) {
         // Just calling to look for an error
      }, function errorCallback(response) {
         grid.toggleRowDetail(row);
      });
   }

   checkAvailability();

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   // Commit changes to the row
   self.submit = function () {

      var journalNo = 0;

      if (base.journal) {
         journalNo = base.journal.gJrnlno;
      }

      kpewselected = {
         wono: item.wono,
         unit: self.rowDetail.unit,
         qtyord: self.rowDetail.qtyord,
         statuscd: self.rowDetail.statuscd,
         jrnlno: journalNo,
         kpetrowid: item.kpetrowid,
         singlerowfl: 'yes'
      };

      //User Hook (do not rename)
      if (self.setKpewUpdateCriteria) {
         self.setKpewUpdateCriteria(kpewselected);
      }

      updateKpew();
   };

   function updateKpew() {
      DataService.post('api/kp/askpentry/kpewupdate', { data: kpewselected, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            grid.toggleRowDetail(row);
            Utils.replaceObject(base.dataset[row], self.rowDetail);
            grid.updateRow(row);
         }
      });
   } 
});

app.controller('KpewFinalUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.kpewFinal = { printorder: 'R', pickticketstype: 'P', receiptstype: 'P', jrnlno: $stateParams.finalParams.jrnlno, glwhse: $stateParams.finalParams.glwhse };

   function initialize() {
      DataService.post('api/kp/askpentry/kpewfinalinit', { data: self.kpewFinal, busy: true }, function (data) {
         if (data) {
            self.kpewFinal = data;

            self.kpewFinal.oeautofity = $stateParams.finalParams.aoSalesOrder.oeautofity;
            self.kpewFinal.oepickfl = $stateParams.finalParams.aoSalesOrder.oepickfl;
         }
      });
   }

   initialize();

   self.submit = function () {
      DataService.post('api/kp/askpentry/kpewfinalupdt', { data: self.kpewFinal, busy: true }, function (data) {
         if (data) {
            base.journalControl.closeJournal();
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master', {
               refreshSearch: true
            }, {
               reload: '^.master'
            });
         }
      });
   };
});

app.controller('KpewLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   var acceptStatus = 'a';
   var deleteStatus = 'd';
   var cancelStatus = 'c';
   var clearStatus = '';

   self.icentrylotscriteria = $stateParams.kpewResult;
   var selectedRecord = $stateParams.selectedRecord;
   var kpewselected = selectedRecord;


   self.lotControlReady = function () {
      // Call initialize method on the Shared-Lots-Ctrl
      self.lotsControl.initialize(self.icentrylotscriteria);
   };

   self.lotDoneCallback = function () {
      updateKpew();
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
   };

   function updateKpew() {
      var journalNo = base.journal ? base.journal.gJrnlno : 0;

      kpewselected.jrnlno = journalNo;
      kpewselected.gJrnlno = journalNo;
      kpewselected.glwhse = base.criteria.whse;
      kpewselected.statuscd = base.currentStatus;

      DataService.post('api/kp/askpentry/kpewupdate', { data: kpewselected, busy: true }, function (data) {
         if (data) {
            if (data.kpewupdate) {
               var kpewupdate = data.kpewupdate;
            }
            if (base.currentStatus === acceptStatus) {
               if (!(kpewupdate && (kpewupdate.snlotserrorfl.toLowerCase() === 'kit'))) {
                  selectedRecord.statuscd = base.currentStatus;
               }
            }
            else {
               selectedRecord.statuscd = base.currentStatus;
            }
            $state.go('^.master', null, { reload: '^.master' });
         }
      });
   };

   self.lotNavigateBack = function () {
      $state.go('^.master');
   };
});

app.controller('KpewSerialCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   var acceptStatus = 'a';
   var deleteStatus = 'd';
   var cancelStatus = 'c';
   var clearStatus = '';

   self.icEntrySerialsCriteria = $stateParams.kpewResult;
   var selectedRecord = $stateParams.selectedRecord;
   var kpewselected = selectedRecord;

   self.serialControlReady = function () {
      var criteria = {
         icentryserialslist: [],
         icentryserialscriteria: self.icEntrySerialsCriteria
      };

      // Call initialize method on the Shared-Serials-Ctrl
      self.serialsControl.initialize(criteria);
   };

   self.navBack = function () {
      $state.go('^.master');
   };

   self.serialDoneCallback = function () {
      updateKpew();
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
   };

   function updateKpew() {
      var journalNo = base.journal ? base.journal.gJrnlno : 0;

      kpewselected.jrnlno = journalNo;
      kpewselected.gJrnlno = journalNo;
      kpewselected.glwhse = base.criteria.whse;
      kpewselected.statuscd = base.currentStatus;

      DataService.post('api/kp/askpentry/kpewupdate', { data: kpewselected, busy: true }, function (data) {
         if (data) {
            if (data.kpewupdate) {
               var kpewupdate = data.kpewupdate;
            }
            if (base.currentStatus === acceptStatus) {
               if (!(kpewupdate && (kpewupdate.snlotserrorfl.toLowerCase() === 'kit'))) {
                  selectedRecord.statuscd = base.currentStatus;
               }
            }
            else {
               selectedRecord.statuscd = base.currentStatus;
            }
            $state.go('^.master', null, { reload: '^.master' });
         }
      });
   };
});

app.controller('KpewAvailabilityCtrl', function ($scope, $state, $stateParams, DataService, $translate, Utils) {
   var self = this;
   self.kpew = $stateParams.kpewRecord.kpew;
   self.kpewavail = $stateParams.kpewRecord.kpewavail;
   self.kpewactions = $stateParams.kpewRecord.kpewactions;
   self.subTitle = $translate.instant('global.work.order.number') + ' ' + self.kpew.wono + '-' + Utils.pad(self.kpew.wosuf, 2);
});

app.controller('KpewExtendedInfoCtrl', function ($scope, $state, $stateParams, DataService, $translate, Utils, MessageService) {
   var self = this;
   self.kpew = $stateParams.kpewRecord.kpew;
   self.kpewavail = $stateParams.kpewRecord.kpewavail;
   self.kpewextend = { qtyship: 0 };
   self.subTitle = $translate.instant('global.work.order.number') + ' ' + self.kpew.wono + '-' + Utils.pad(self.kpew.wosuf, 2);
   self.disableExtendedFields = true;

   function fillExtendedInfo() {
      DataService.post('api/kp/askpentry/kpewextendinit', { data: self.kpew, busy: true }, function (data) {
         self.disableExtendedFields = false;
         if (data) {
            self.kpewextend = data;

            //User Hook (do not rename)
            if (self.getKpewExtend) {
               self.getKpewExtend(self.kpewextend);
            }
         }
      });
   }

   function updateExtendedInfo() {

      //User Hook (do not rename)
      if (self.setKpewExtend) {
         self.setKpewExtend(self.kpewextend);
      }

      DataService.post('api/kp/askpentry/kpewextendupdt', { data: self.kpewextend, busy: true }, function (data) {
         if (data) {
            self.kpewextend = data;
            $state.go('^.master', null, {
               reload: '^.master'
            });
         }
      });
   }

   if (self.kpew.statuscd === '') {
      fillExtendedInfo();
   }

   self.saveExtendedInfo = function () {
      if (self.kpewextend) {
         if (self.kpewextend.qtyship > self.kpewavail.availtobuild) {
            MessageService.yesNo('global.confirmation', 'Avail has Changed to <Qty Ship (or qty ship overridden).;Correct Qty Ship. Do You wish to Continue?',
                           function () {
                              // Yes processing
                              self.kpewextend.allowshipoverridefl = 'yes';
                              updateExtendedInfo();
                           }, function () {
                              // No processing
                              self.kpewextend.allowshipoverridefl = 'no';
                              updateExtendedInfo();
                           });
         }
         else {
            self.kpewextend.allowshipoverridefl = '';
            updateExtendedInfo();
         }
      }
   };
});

app.controller('KpewWorkorderTiesCtrl', function ($scope, $state, $stateParams, DataService, $translate, Utils) {
   var self = this;
   self.kpew = $stateParams.kpewRecord.kpew;
   self.subTitle = $translate.instant('global.work.order.number') + ' ' + self.kpew.wono + '-' + Utils.pad(self.kpew.wosuf, 2);

   function bindWorkOrderTies() {
      DataService.post('api/kp/askpentry/kpewties', { data: self.kpew, busy: true }, function (data) {
         if (data) {
            self.kpewtiesresults = data.kpewtiesresults;
            self.kpewtie = data.kpewtie;
         }
      });
   }

   bindWorkOrderTies();
});

app.controller('KpewSerialLotCtrl', function ($scope, $state, $stateParams, DataService, $translate, Utils, MessageService) {
   var self = this;
   var base = $scope.base;
   self.kpew = $stateParams.kpewRecord.kpew;
   self.kpet = $stateParams.kpewRecord.kpet;
   self.subTitle = $translate.instant('global.work.order.number') + ' ' + self.kpew.wono + '-' + Utils.pad(self.kpew.wosuf, 2);

   self.serialControlReady = function () {
      if (self.kpet.serlottype.toUpperCase() === 'S') {
         self.kpewSelected = { glwhse: base.criteria.whse, wono: self.kpet.wono, wosuf: self.kpet.wosuf, kpetrowid: self.kpet.rowID, singlerowfl: 'yes' };

         DataService.post('api/kp/askpentry/kpewbuildserialcriteria', { data: self.kpewSelected, busy: true }, function (data) {
            if (data) {
               self.icentryserialscriteria = data;

               var criteria = {
                  icentryserialslist: [],
                  icentryserialscriteria: self.icentryserialscriteria
               };

               // Call initialize method on the Shared-Serials-Ctrl
               self.serialControl.initialize(criteria);
            }
         });
      }
   };

   self.serialDoneCallback = function () {
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('^.master');
   };

   self.lotControlReady = function () {
      if (self.kpet.serlottype.toUpperCase() === 'L') {
         self.kpewSelected = { glwhse: base.criteria.whse, wono: self.kpet.wono, wosuf: self.kpet.wosuf, kpetrowid: self.kpet.rowID, singlerowfl: 'yes' };

         DataService.post('api/kp/askpentry/kpewbuildlotcriteria', { data: self.kpewSelected, busy: true }, function (data) {
            if (data) {
               self.icentrylotscriteria = data;
               // Call initialize method on the Shared-Lots-Ctrl
               self.lotsControl.initialize(self.icentrylotscriteria);
            }
         });
      }
   };
});