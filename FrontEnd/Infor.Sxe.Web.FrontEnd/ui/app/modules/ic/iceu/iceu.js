'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('ic', 'iceu', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('ic', 'iceu');
   BinAllocationStateProvider.addStates('ic', 'iceu', 'iceu.master');
   BinAllocationStateProvider.addStates('ic', 'iceu', 'iceu.detail');
   BinAllocationStateProvider.addStates('ic', 'iceu', 'iceu.serial');
   BinAllocationStateProvider.addStates('ic', 'iceu', 'iceu.lot');

   $stateProvider.state('iceu.detail', {
      url: '/detail',
      params: { records: null, mode: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceu/detail.json');
            },
            controller: 'IceuDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('iceu.detail.edit', {
      url: '/edit'
   });

   $stateProvider.state('iceu.serial', {
      url: '/serial',
      params: { iceuResult: null, icspecrecno: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceu/serials.json');
            },
            controller: 'IceuSerialCtrl as sl'
         }
      }
   });

   $stateProvider.state('iceu.lot', {
      url: '/lot',
      params: { iceuResult: null, icspecrecno: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceu/lots.json');
            },
            controller: 'IceuLotCtrl as lt'
         }
      }
   });
});

app.controller('IceuBaseCtrl', function ($state, Utils, $stateParams, Sasoo, DataService, MessageService) {
   var self = this;
   self.criteria = { whse: Sasoo.whse };
   self.iceu = {};
   self.mode = '';
   self.isWarehouseManagedProduct = false;
   self.oldReasonOfUnavailability = '';
   self.reopenBinAllocation = true;
   self.skipAssignSerial = false;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'iceu',
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
      return $state.is('iceu.master');
   };

   self.includesMaster = function () {
      return $state.includes('iceu.master');
   };

   self.isDetail = function () {
      return $state.is('iceu.detail');
   };

   self.includesDetail = function () {
      return $state.includes('iceu.detail');
   };

   self.isEdit = function () {
      return $state.is('iceu.detail.edit');
   };

   self.iceuUpdate = function (selectOldValue, iceuLoadResults) {

      var iceuUpdateCriteria = {
         prod: iceuLoadResults.prod,
         whse: iceuLoadResults.whse,
         orderno: iceuLoadResults.orderno,
         origreasunavty: self.oldReasonOfUnavailability,
         newreasunavty: iceuLoadResults.reasunavty,
         refer: iceuLoadResults.refer,
         stkqtyship: iceuLoadResults.stkqtyship,
         unit: iceuLoadResults.unit,
         mode: self.mode + (self.skipAssignSerial ? '|' + 'SkipSerials' : ''), //Mode...  modify - 3
         noassn: iceuLoadResults.stkqtyship
      };

      DataService.post('api/ic/asicentry/iceuupdate', { data: iceuUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               // display messaging errors
               MessageService.errorMessages(data.messaging);
            } else {
               if (self.isWarehouseManagedProduct && (self.mode === 'add' || self.mode === 'subtract')) {
                  self.iceu = angular.copy(iceuLoadResults);
                  self.launchWarehouseBinDeAllocation();
               }
               else {
                  $state.go('iceu.master', { refreshSearch: true }, { reload: 'iceu.master' });
               }
            }
         }
      });
   };

   self.launchWarehouseBinDeAllocation = function () {
      if (self.mode === 'subtract') {
         self.launchWarehouseBinAllocationPopup('buy', true, 'rm');
      }
      else {
         self.launchWarehouseBinAllocationPopup('sell', false, '');
      }
   };

   self.launchWarehouseBinAllocation = function () {
      if (self.mode === 'subtract') {
         self.launchWarehouseBinAllocationPopup('buy', false, '');
      }
      else {
         self.launchWarehouseBinAllocationPopup('sell', true, 'rm');
      }
   };

   self.launchWarehouseBinAllocationPopup = function (wmadjustype, returnfl, potype) {

      if (self.iceu) {
         // Launch Whse
         var wmbinassignCriteria = {
            altwhse: '',
            currproc: 'icet',
            jrnlno: self.journal ? self.journal.gJrnlno : 0,
            kitfl: false,
            lineno: 0,
            orderno: self.iceu.orderno,
            ordersuf: 99,
            ourproc: 'icet',
            ordertype: 'i',
            potype: potype,//'rm',
            prod: self.iceu.prod,
            returnfl: returnfl,
            seqno: 0,
            stkqtyship: self.iceu.stkqtyship,
            skipnonkitlogic: false,
            stkqtyrcv: 0,
            unit: self.iceu.unit,
            vamodule: '',
            wmqtyrcv: 0,
            wmadjtype: wmadjustype,//"buy",
            whse: self.iceu.whse
         };
         var binAllocationPath = '';

         if (self.isEdit() || self.reopenBinAllocation) {
            binAllocationPath = '^.bin-allocation';
         } else {
            binAllocationPath = '.bin-allocation';
         }

         $state.go(binAllocationPath, {
            criteria: wmbinassignCriteria,
            binAllocationDisabled: false,
            submittedCallback: 'base.binAllocationSaved',
            actionsCallback: 'base.binAllocationActions',
            cancelCallback: 'base.binAllocationCancel'
         });
      }
   };


   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSaved = function (wmbinassignment) {
      if (self.reopenBinAllocation) {
         self.launchWarehouseBinAllocation();
         self.reopenBinAllocation = false;
      } else if (wmbinassignment) {
         $state.go('iceu.master', { refreshSearch: true }, { reload: 'iceu.master' });
      }
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActions = function () {
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
   };

   self.binAllocationCancel = function () {
      $state.go('iceu.master', { refreshSearch: true }, { reload: 'iceu.master' });
   };
});

app.controller('IceuSearchCtrl', function ($scope, $state, $translate, DataService, Utils, MessageService, Sasoo) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.whse = Sasoo.whse;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!$scope.base.isMaster()) {
         $state.go('iceu.master');
      }

      DataService.post('api/ic/asicentry/buildunavailablett', { data: base.criteria, busy: true }, function (data) {
         base.grid.loadData(data);
         if (!data.length && base.criteria.prod && base.criteria.whse) {
            var msg = $translate.instant('iceu.unavailable.transactions.entered.for.whse') + base.criteria.whse + ' ' +
                      $translate.instant('global.product') + '=' + base.criteria.prod + '<br>' + '<b>' +
                      $translate.instant('iceu.do.you.wish.to.make.any.quantities.unavailble');

            MessageService.yesNo('global.alert', msg, function () {
               var obj = {
                  buildUnAvailttResults: [],
                  iceuCriteria: {
                     "whse": base.criteria.whse,
                     "prod": base.criteria.prod,
                     "reasunavty": base.criteria.reasunavty,
                     "mode": 'add'
                  }
               };

               $state.go('iceu.detail.edit', { records: obj.iceuCriteria, mode: 'add' });
            });
         }
      });
   };
});

app.controller('IceuMasterCtrl', function ($scope, $state, $timeout, DataService, GridService, MessageService) {
   var self = this;
   self.iceuDetails = {};
   var base = $scope.base;
   var criteria = base.criteria;
   self.icetForNotes = {};
   self.icetTemporary = {};

   self.iceuList = [];

   // Initialize search results (if required criteria is present)
   self.loadGridData = function () {
      if (criteria.whse || criteria.prod || criteria.reasunavty) {
         DataService.post('api/ic/asicentry/buildunavailablett', { data: criteria, busy: true }, function (data) {
            self.iceuList = data;
            base.grid.loadData(data);
         });
      }
   };

   self.loadGridData();

   self.doAction = function (mode) {
      // get selected record from grid and pass that to detail state
      var records = GridService.getSelectedRecords(base.grid);

      if (mode !== 'remove') {
         if (records.length === 1) {
            $state.go('^.detail', { records: records, mode: mode });
         } else if (records.length > 1) {
            updateMultiple(records, mode);
         }
      } else {
         // If journal is open proceed to remove
         if (base.journal) {
            self.remove(records, mode);
         } else {
            // Direct user to open a journal, then proceed with remove
            base.journalControl.showOpenView(function () {
               // bug with loading indicator after journal open modal allows users to click remove unavailable
               // multiple times - adding timeout gets the loading indicator to stay on
               $timeout(function () {
                  self.remove(records, mode);
               }, 500);
            });
         }
      }
      //Message service for multiples
   };

   self.remove = function (records, mode) {

      var criteria = { jrnlno: base.journal.gJrnlno, whse: base.criteria.whse, prod: base.criteria.prod, mode: mode };
      DataService.post('api/ic/asicentry/iceuremoveunavail', { data: { iceuremoveunavaillist: records, iceuremoveunavailcriteria: criteria }, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging) && self.isSingle()) {
            if (self.iceuDetails) {
               var params = {
                  prod: self.iceuDetails.prod,
                  whse: self.iceuDetails.whse,
                  fldlist: 'wmfl'
               };
               DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
                  if (data && data.wmfl) {
                     // Launch Whse
                     var wmbinassignCriteria = {
                        altwhse: '',
                        currproc: 'icet',
                        jrnlno: base.journal.gJrnlno,
                        kitfl: false,
                        lineno: 0,
                        orderno: self.iceuDetails.orderno,
                        ordersuf: 99,
                        ourproc: 'icet',
                        ordertype: 'i',
                        potype: 'rm',
                        prod: self.iceuDetails.prod,
                        returnfl: true,
                        seqno: 0,
                        stkqtyship: self.iceuDetails.stkqtyship,
                        skipnonkitlogic: false,
                        stkqtyrcv: 0,
                        unit: self.iceuDetails.unit,
                        vamodule: '',
                        wmqtyrcv: 0,
                        wmadjtype: "buy",
                        whse: self.iceuDetails.whse
                     };

                     $state.go('.bin-allocation', {
                        criteria: wmbinassignCriteria,
                        binAllocationDisabled: false,
                        submittedCallback: 'mst.binAllocationSaved',
                        actionsCallback: 'mst.binAllocationActions',
                        cancelCallback: 'mst.binAllocationCancel'
                     });
                  } else {
                     self.loadGridData();
                  }
               });
            } else {
               self.loadGridData();
            }
         } else {
            self.loadGridData();
         }
      });
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSaved = function (wmbinassignment) {
      $state.go('iceu.master', { refreshSearch: true }, { reload: 'iceu.master' });
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActions = function (wmbinassignment) {
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
   };

   self.binAllocationCancel = function () {
      $state.go('iceu.master', { refreshSearch: true }, { reload: 'iceu.master' });
   };

   var updateMultiple = function (records, mode) {
      var obj = {
         iceuremoveunavaillist: [],
         iceuremoveunavailcriteria: {
            "whse": $scope.base.criteria.whse,
            "prod": $scope.base.criteria.prod,
            "mode": mode,
            "jrnlno": $scope.base.journal ? $scope.base.journal.gJrnlno : 0
         }
      };

      records.forEach(function (record) {
         obj.iceuremoveunavaillist.push(record);
      });
   };

   //Get or Assign the ICET.NotesId field.  This is a DB Sequence that is the Primary Key if
   //the Notes are used for the ICET Transaction.  If they've gotten to the Transaction Detail screen,
   //we need to assign this so the WebPart can use it if they decide to do something with Notes.  Unfortunately,
   //this means that a sequence is 'burned' for each ICET.  There's no other way around this since we need to have
   //a Sequence available before they go to the Notes screen (which is only a possibility they would go there).
   self.getNotesId = function () {
      self.icetForNotes = {};

      var requestCriteria = {
         icetrowid: self.icetTemporary.rowID.toString(),
         createfl: true,
         icetnotesid: self.icetTemporary.notesid
      };

      //NOTE: This call expects a true Progress Rowid, not a string representation of it provided up from a
      //backend call.  (tip: for that scenario, you need the get call: geticetnotesid.)
      DataService.post('api/shared/asnotescom/geticetnotesidbyrowid', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            //These are the 5 keys (in order) required for the Context.  For the NotesContext,
            //it uses the NotesId and the Product.  For Business Context, it uses the Whse, Prod,
            //PostDt, and TransType.
            self.icetForNotes.whse = self.icetTemporary.whse;
            self.icetForNotes.prod = self.icetTemporary.prod;
            self.icetForNotes.postdt = self.icetTemporary.postdt;
            self.icetForNotes.transtype = self.icetTemporary.transtype;
            self.icetForNotes.notesid = data.icetnotesid; //Next Sequence # (if create), or existing Sequence # (if exists)
         }
      });
   };

   self.loadIceuDetails = function (selectedRecord) {
      var criteria = { prod: selectedRecord.prod, whse: selectedRecord.whse, reasunavty: selectedRecord.reasunavty, mode: 'Modify' };
      DataService.post('api/ic/asicentry/iceuloaddetails', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.iceuDetails = data.iceuloaddetailsresults;
         }
      });
   };

   self.onRecordSelection = function () {
      self.icetTemporary = {};

      var record = GridService.getSelectedRecord(base.grid);
      if (record && record.iCETRowID) {
         self.loadIceuDetails(record);
         var icetParams = {
            fillmode: true
         };
         DataService.get('api/ic/icet/getbyrowid/' + record.iCETRowID, { params: icetParams, busy: true }, function (data) {
            //Need a fully hydrated row because we need more elements of the key for Business Context and Notes.
            self.icetTemporary = data;
            self.getNotesId();
         });
      } else {
         self.icetForNotes = {};
      }
   };

   self.navigateToIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: base.criteria.whse });
      }
   };

   self.isSingle = function () {
      return base.grid.selectedRows().length === 1;
   };

   self.isMultiLine = function () {
      return base.grid.selectedRows().length > 1;
   };

   self.any = function () {
      return base.grid.selectedRows().length > 0;
   };
});

app.controller('IceuDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var oldReasonOfUnavailability = {};
   base.mode = $stateParams.mode;
   var isNoRecordsFound = false;
   // var isWarehouseManagedProduct = false;

   self.iceu = {};
   var record = {};
   var criteria = {};
   var setTitle = function () {
      switch ($stateParams.mode) { //ignore jslint - correct indentation
         case 'add': //ignore jslint - correct indentation
            self.title = $translate.instant('global.move.onhand.to.unavail'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'modify': //ignore jslint - correct indentation
            self.title = $translate.instant('global.modify.unavail.reason'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'subtract': //ignore jslint - correct indentation
            self.title = $translate.instant('global.move.unavail.to.onhand'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

   if ($stateParams.records) {
      if ($stateParams.records.length > 1) {
         // Display info Different then Detail
         if (base.mode === 'subtract') {
            setTitle();
         }
      } else if ($stateParams.records.length === 1) {
         setTitle();
         record = $stateParams.records[0];
      }
      else if ($stateParams.records.prod && $stateParams.mode === 'add') {
         record.prod = $stateParams.records.prod;
         record.whse = $stateParams.records.whse;
         record.reasunavty = $stateParams.records.reasunavty;
         self.iceu.mode = $stateParams.mode;
         isNoRecordsFound = true;
         setTitle();
      }
      else if ($stateParams.records.prod && $stateParams.mode === 'modify' || $stateParams.mode === 'subtract') {
         record.prod = $stateParams.records.prod;
         record.whse = $stateParams.records.whse;
         record.reasunavty = $stateParams.records.reasunavty;
         self.iceu.mode = $stateParams.mode;
         setTitle();
      }
   }

   //Reset Record
   self.reset = function () {
      //self.iceu = angular.copy(base.iceu);
   };

   if (record) {
      criteria = { prod: record.prod, whse: record.whse, reasunavty: record.reasunavty, mode: $stateParams.mode };
      //need to refactor again
      DataService.post('api/ic/asicentry/iceuloaddetails', { data: criteria, busy: true }, function (data) {
         // TODO error/validation messaging

         // Assign new values
         if (data) {
            self.iceu = data.iceuloaddetailsresults;
            base.iceu = angular.copy(self.iceu);
            base.oldReasonOfUnavailability = self.iceu.reasunavty;
            var params = {
               prod: criteria.prod,
               whse: criteria.whse
            };

            DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.icsw = data;
                  //self.icsw.wmfl;
                  if (self.icsw.serlottype.toLowerCase() === 's') {
                     self.serialsCriteria = { whse: criteria.whse, prod: criteria.prod, serialno: '', currstatus: 'u' };
                     self.serialsFilter();
                  }
                  else if (self.icsw.serlottype.toLowerCase() === 'l') {
                     self.lotsCriteria = { whse: criteria.whse, prod: criteria.prod, lotno: '', statustype: 'Unavailable' };
                     self.lotsFilter();
                  }
                  base.isWarehouseManagedProduct = self.icsw.wmfl;
               }
            });
         }
      });
   }
   else {
      criteria = {
         prod: base.prod,
         whse: base.whse,
         reasunavty: base.reasunavty,
         mode: base.mode
      };

      //need to refactor again
      DataService.post('api/ic/asicentry/iceuloaddetails', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.iceu = data.iceuloaddetailsresults;
            base.iceu = angular.copy(self.iceu);
            base.oldReasonOfUnavailability = self.iceu.reasunavty;
            var params = {
               prod: criteria.prod,
               whse: criteria.whse
            };

            DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  self.icsw = data;
                  //self.icsw.wmfl;
                  if (self.icsw.serlottype.toLowerCase() === 's') {
                     self.serialsCriteria = { whse: criteria.whse, prod: criteria.prod, serialno: '', currstatus: 'u' };
                     self.serialsFilter();
                  }
                  else if (self.icsw.serlottype.toLowerCase() === 'l') {
                     self.lotsCriteria = { whse: criteria.whse, prod: criteria.prod, lotno: '', statustype: 'Unavailable' };
                     self.lotsFilter();
                  }
                  base.isWarehouseManagedProduct = self.icsw.wmfl;
               }
            });
         }
      });
   }

   self.submit = function () {
      // Need update single
      if (base.mode === 'modify' && base.oldReasonOfUnavailability === self.iceu.reasunavty) {
         MessageService.error('global.error', 'message.new.reason.unavailable.must.be.specified');
      }
      else if ($stateParams.records.length > 1 && base.mode === 'subtract') {
         self.updateMultiple();
      }
      else if ($stateParams.records.length === 1) {
         self.updateSingle(true);
      }
      else if ($stateParams.records.length === 0 && self.iceu !== null && baes.mode === 'add') {
         self.updateSingle(false);
      }
      else if (isNoRecordsFound && self.iceu !== null) {
         self.updateSingle(false);
      }
      else if ($stateParams.records) {
         self.updateSingle(false);
      }
      else {
         base.mode = $stateParams.mode;
      }
   };

   self.updateSingle = function (selectOldValue) {
      base.reopenBinAllocation = true;
      var iceuUpdateCriteria = {
         prod: self.iceu.prod,
         whse: self.iceu.whse,
         orderno: self.iceu.orderno,
         origreasunavty: base.oldReasonOfUnavailability,//   '', //oldReasonOfUnavailability
         newreasunavty: self.iceu.reasunavty,
         refer: self.iceu.refer,
         stkqtyship: self.iceu.stkqtyship,
         unit: self.iceu.unit,
         mode: $stateParams.mode, //Mode...  modify - 3
         noassn: self.iceu.stkqtyship,
         reasunavty: self.iceu.reasunavty
      };

      DataService.post('api/ic/asicentry/iceucheckserlot', { data: iceuUpdateCriteria, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               // display messaging errors
               MessageService.errorMessages(data.messaging);
            } else {
               // do nothing with the returned array of objects ????
               var icSerialLot = data.iceucheckserlotsingle;
               if (icSerialLot.launchserlot) {
                  self.iceu.orderno = data.iceucheckserlotsingle.orderno;
                  var params = {
                     prod: iceuUpdateCriteria.prod,
                     fillmode: true,
                     fldlist: 'icspecrecno'
                  };

                  DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (res) {
                     if (res) {
                        base.skipAssignSerial = false;
                        self.icspecrecno = res.icspecrecno;
                        self.iceu.icspecrecno = self.icspecrecno;
                        if (icSerialLot.serlottype.toLowerCase() === 's') {
                           if (icSerialLot.isOptional) {
                              MessageService.noYes('global.serials',
                                 'question.assign.serials',
                                 function () {
                                    base.skipAssignSerial = true;
                                    base.iceuUpdate(selectOldValue, self.iceu);
                                 },
                                 function () {
                                    $state.go('^.^.serial', { iceuResult: self.iceu, icspecrecno: self.iceu.icspecrecno });
                                 });
                           } else {
                              $state.go('^.^.serial', { iceuResult: self.iceu, icspecrecno: self.iceu.icspecrecno });
                           }
                        }
                        else if (icSerialLot.serlottype.toLowerCase() === 'l') {
                           $state.go('^.^.lot', { iceuResult: self.iceu, icspecrecno: self.iceu.icspecrecno });
                        }
                     }
                  });
               }
               else {
                  base.iceuUpdate(selectOldValue, self.iceu);
               }
            }
         }
      });
   };

   self.serialsFilter = function () {
      DataService.post('api/ic/icses/lookup', { data: self.serialsCriteria, busy: true }, function (data) {
         self.unavailableSerials = data.icseriallookupresults;
      });
   };

   self.lotsFilter = function () {
      DataService.post('api/ic/icsel/lookup', { data: self.lotsCriteria, busy: true }, function (data) {
         self.unavailableLots = data.iclotlookupresults;
      });
   };
});

app.controller('IceuSerialCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.iceuResult = {};
   self.iceuResult = $stateParams.iceuResult;

   self.createIcEntrySerialsCriteria = function () {
      var criteria = {
         whse: base.iceu.whse,
         prod: self.iceuResult.prod,
         type: 'ic',
         orderno: self.iceuResult.orderno,
         ordersuf: 99,
         lineno: 0,
         seqno: 0,
         inquiryfl: false,
         actionty: '',
         returnfl: (base.mode === 'modify' || base.mode === 'subtract') ? true : false,
         origqty: self.iceuResult.stkqtyship,
         proofqty: self.stkqtyship,
         ordqty: self.iceuResult.stkqtyship,
         outqty: self.iceuResult.stkqtyship,
         ictype: 'un',
         cost: self.iceuResult.eachprice,
         qtyunavail: self.iceuResult.qtyunavail,
         method: '',
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: base.mode === 'modify' ? self.iceuResult.reasunavty : '',
         reasunavty: self.iceuResult.reasunavty,
         custno: 0,
         shipto: 0,
         vendno: 0,
         wono: 0,
         wosuf: 0,
         cono2: 0,
         shipfmwhse: '',
         shiptowhse: '',
         jrnlno: 0,
         ourproc: 'iceu',
         icspecrecno: $stateParams.icspecrecno,
         assignoldest: false,
         currproc: 'iceu',
         seqdash: "0",
         proddesc: self.iceuResult.proddesc
      };
      return criteria;
   };

   self.serialControlReady = function () {
      // format and add nesseccary criteria to object
      self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria();

      var criteria = {
         icentryserialslist: [],
         icentryserialscriteria: self.icEntrySerialsCriteria
      };

      // Call initialize method on the Shared-Serials-Ctrl
      self.serialsControl.initialize(criteria);
   };

   self.navBack = function () {
      $state.go('^.detail', { records: self.iceuResult, mode: base.mode });
      //$state.go('^.detail');

   };

   self.serialDoneCallback = function () {
      base.iceuUpdate(true, self.iceuResult);
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
   };
});

app.controller('IceuLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.iceuResult = {};
   self.iceuResult = $stateParams.iceuResult;

   self.createIcEntryLotsCriteria = function () {
      var criteria = {
         whse: base.iceu.whse,
         prod: self.iceuResult.prod,
         type: 'ic',
         orderno: self.iceuResult.orderno,
         ordersuf: 99,
         lineno: 0,
         seqno: 0,
         inquiryfl: false,
         actionty: '',
         returnfl: (base.mode === 'modify' || base.mode === 'subtract') ? true : false,
         origqty: self.iceuResult.stkqtyship,
         proofqty: self.iceuResult.stkqtyship,
         ordqty: self.iceuResult.stkqtyship,
         outqty: self.iceuResult.stkqtyship,
         iclotrcptty: '',
         ictype: 'un',
         cost: 0,
         qtyunavail: self.iceuResult.qtyunavail,
         method: '',
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: base.mode === 'modify' ? base.oldReasonOfUnavailability : '',
         reasunavty: self.iceuResult.reasunavty,
         custno: 0,
         shipto: '',
         vendno: 0,
         wosuf: 0,
         cono2: 0,
         shipfmwhse: '',
         shiptowhse: '',
         jrnlno: 0,
         ourproc: 'iceu',
         icspecrecno: $stateParams.Iceperecord,
         assignoldest: 'no',
         currproc: 'iceu',
         retseqno: "0",
         sQtyunavail: self.iceuResult.qtyunavail,
         proddesc: self.iceuResult.proddesc
      };
      return criteria;
   };

   self.lotControlReady = function () {
      self.icEntryLotsCriteria = self.createIcEntryLotsCriteria();

      //var criteria = {
      //   icentrylotslist: [],
      //   icentrylotscriteria: self.icEntryLotsCriteria
      //};

      // Call initialize method on the Shared-Lots-Ctrl
      self.lotsControl.initialize(self.icEntryLotsCriteria);
   };

   self.lotDoneCallback = function () {
      base.iceuUpdate(true, self.iceuResult);
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      //$state.go('^.detail', { records: self.iceuResult, mode: 'modify' });
   };

   self.lotNavigateBack = function () {
      $state.go('^.detail', { records: self.iceuResult, mode: base.mode });
   };
});