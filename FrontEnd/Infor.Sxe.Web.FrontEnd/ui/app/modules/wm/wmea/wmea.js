'use strict';

//TODO: ajw - The Oper LU needs to be fleshed out.  We don't have the ability to add criteria to the search at this time.

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('wm', 'wmea', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('wm', 'wmea');

   BinAllocationStateProvider.addStates('wm', 'wmea', 'wmea.master');
});

app.controller('WmeaBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('wmea.master');
   };

   self.includesMaster = function () {
      return $state.includes('wmea.master');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/wm/aswmentry/wmreplenishmentload', {data: self.criteria, busy: true}, function (data) {
         self.dataset = data;
      });
   };

});

app.controller('WmeaSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = $scope.base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('wmea.master');
      }

      base.search();
   };
});

app.controller('WmeaMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var criteria = $scope.base.criteria;
   var base = $scope.base;

   if (criteria && criteria.whse) {
      base.search();
   }

   self.binInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('wmib.master', { whse: currentRow.whse, binloc: currentRow.binloc });
      }
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSavedCallback = function (wmbinassignment) {
      if (wmbinassignment.uIUpdatesWMQty) {
         var wmeaRecord = GridService.getSelectedRecord(base.grid);
         if (wmeaRecord) {
            wmeaRecord.qtyactual = wmbinassignment.wmqtyship;
         }

         $state.go('wmea.master');
         base.search();
      }
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActionsCallback = function (wmbinassignment) {
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
   };

   self.launchBinAllocationFunction = function () {
      var wmeaRecord = GridService.getSelectedRecord(base.grid);

      if (wmeaRecord) {
         var wmbinassignCriteria = {
            altwhse: wmeaRecord.whse,
            currproc: "wmea",
            jrnlno: 0,
            kitfl: false,
            lineno: 0,
            orderno: 0,
            ordersuf: 0,
            ourproc: "wmea",
            ordertype: "R",
            prod: wmeaRecord.prod,
            potype: "",
            returnfl: false,
            seqno: wmeaRecord.seqno,
            stkqtyship: wmeaRecord.qtyactual,
            skipnonkitlogic: false,
            stkqtyrcv: 0,
            tobinloc: wmeaRecord.binloc,
            unit: "",
            vamodule: "",
            wmqtyrcv: 0,
            wmadjtype: "sell",
            whse: wmeaRecord.whse
         };

         var isCancel = false;
         if (wmeaRecord.accepttype === "c") {
            isCancel = true;
         }

         $state.go('.bin-allocation', {
            criteria: wmbinassignCriteria,
            binAllocationDisabled: isCancel,
            submittedCallback: 'mst.binAllocationSavedCallback',
            actionsCallback: 'mst.binAllocationActionsCallback'
         });
      }
   };

   self.acceptFunction = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      if (selectedRecords) {
         DataService.post('api/wm/aswmentry/wmreplenishmentaccept', { data: selectedRecords, busy: true }, function (data) {
            if (data) {
               base.search();
            }
         });
      }
   };

   self.cancelFunction = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      if (selectedRecords) {
         DataService.post('api/wm/aswmentry/wmreplenishmentcancel', { data: selectedRecords, busy: true }, function (data) {
            if (data) {
               base.search();
            }
         });
      }
   };

   self.restoreFunction = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      if (selectedRecords) {
         DataService.post('api/wm/aswmentry/wmreplenishmentrestore', { data: selectedRecords, busy: true }, function (data) {
            if (data) {
               base.search();
            }
         });
      }
   };

   self.finalUpdateFunction = function () {
      if (criteria) {
         var criteriaList = [];
         criteriaList.push(criteria);

         DataService.post('api/wm/aswmentry/wmreplenishmentupdate', { data: criteriaList, busy: true }, function (data) {
            if (data.messaging) {
               MessageService.errorMessages(data.messaging);
            } else {
               base.search();
            }
         });
      }
   };
});

