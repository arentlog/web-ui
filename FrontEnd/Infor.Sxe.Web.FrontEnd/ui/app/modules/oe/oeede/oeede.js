'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('oe', 'oeede', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('oe', 'oeede');
});

app.controller('OeedeBaseCtrl', function ($state, ConfigService, DataService, MessageService, RecoveryService, Sasoo, TabService, Utils, UtilsData) {
   var self = this;
   self.criteria = {
      whse: Sasoo.whse
   };
   self.MENU_FUNCTION_OEEDE = 'oeede';
   self.DELIMITER = '|';
   self.pettyCashDropDownOptions = [];
   self.pettyCashTypesDefinedAsIncoming = [];
   self.keysTiedDown = false;
   self.recoveryData = '';
   self.journalNumberClosing = 0;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      openedCallback: 'base.journalOpened',
      closedCallback: 'base.journalClosed',
      criteria: {
         currproc: self.MENU_FUNCTION_OEEDE,
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'oe',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('oeede.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeede.master');
   };

   self.isJournalState = function () {
      return !($state.is('oeede.master.journalOpen'));
   };

   self.buildRecoveryData = function (whse, drawerid) {
      if (self.criteria) {
         return whse + self.DELIMITER + drawerid;
      } else {
         return '';
      }
   };

   self.splitRecoveryData = function (recoveryData) {
      var splitData = ['', '']; //whse, drawerid
      if (recoveryData) {
         splitData = recoveryData.split(self.DELIMITER);
      }
      return splitData;
   };

   self.journalOpened = function (journal, userOpened) {
      //Reopened Journal (on recovery)
      if (!userOpened) {
         if (self.journalControl) {
            if (self.journalControl.getRecoveryData()) {

               //If journal is open, they can't change keys.  Do this only if they have keyed in the keys.
               self.keysTiedDown = true;

               var recoveryDataAll = self.splitRecoveryData(self.journalControl.getRecoveryData());
               if (recoveryDataAll.length === 2) {
                  self.criteria.whse = recoveryDataAll[0];
                  self.criteria.drawerid = recoveryDataAll[1];
                  self.recoveryData = self.buildRecoveryData(self.criteria.whse, self.criteria.drawerid);
               }

               //self.search();  TODO: Can we see existing records somehow?
            }
         }
      }
   };

   self.journalClosed = function () {
      if (self.journalNumberClosing !== 0) {
         //Since Journal is closed, delete the recovery data.
         RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_OEEDE, self.journalNumberClosing, self.recoveryData);

         self.recoveryData = '';
         //If data exists, also need to get rid of the generic record too.
         RecoveryService.deleteRecoveryRecord(self.MENU_FUNCTION_OEEDE, self.journalNumberClosing, self.recoveryData);
      }

      //Journal Closed, now user can change Whse/DrawerID for more work.
      self.keysTiedDown = false;
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      //TODO: Get last drawer for the operator.  Bring in both the Warehouse and the Drawer.  Q: Is that a problem?  We don't store Last Whse.

      var requestCriteria = {};
      DataService.post('/web/api/sa/sastnlookuppaytypepetty', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            if (data.ttbllookuppaytypepettyresults && data.ttbllookuppaytypepettyresults.length === 0) {
               MessageService.error('global.error', 'message.to.use.this.function.you.must.have.petty.cash.pay.type');
               TabService.closeTab(self.MENU_FUNCTION_OEEDE);
            }
         }
      });

      self.criteria.whse = Sasoo.whse;
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform initialization of search criteria
   self.initCriteria();

   // The Petty Cash drop down will be rebuilt each time (not cached) due to div# security.
   UtilsData.getPettyCashTypesDropDown(function (dropDownList, inList) {
      self.pettyCashDropDownOptions = dropDownList;
      self.pettyCashTypesDefinedAsIncoming = inList;
   });
});

app.controller('OeedeSearchCtrl', function ($scope, $state, DataService, Sasoo, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.drawerIdChanged = function (args) {
      if (args && args.value) {
         base.criteria.whse = args.value2;
      }
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('oeede.master');
      }

      base.search();
   };
});

app.controller('OeedeMasterCtrl', function ($scope, $state, $stateParams, $timeout, MessageService, DataService, RecoveryService) {
   var self = this;
   var base = $scope.base;
   self.transactionDirection = '';

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.isJournalOpen = function () {
      if ($scope.base.journal && $scope.base.journal.gJrnlno !== 0) {
         base.journalNumberClosing = $scope.base.journal.gJrnlno;
         return false;
      } else {
         return true;
      }
   };

   // New record
   self.oeede = {};
   self.oeede.transty = '';
   self.tempNewOeede = angular.copy(self.oeede);

   self.clear = function () {
      self.oeede.transty = '';
      self.oeede.amount = 0;
      self.oeede.toinit = '';
      self.oeede.comment = '';

      self.transactionDirection = '';
   };

   self.directionCellConverter = function (row, cell, value) {
      switch (value) {
         case true:
            return MessageService.get('global.cash.in');
         case false:
            return MessageService.get('global.cash.out');
      }
   };

   self.directionConverter = function (direction) {
      switch (direction) {
         case true:
            return MessageService.get('global.cash.in.with.parenthesis');
         case false:
            return MessageService.get('global.cash.out.with.parenthesis');
      }
   };

   self.transactionTypeChange = function () {
      if (self.oeede.transty) {
         var direction = base.pettyCashTypesDefinedAsIncoming.indexOf(self.oeede.transty) > -1;
         self.transactionDirection = self.directionConverter(direction);
      } else {
         self.transactionDirection = '';
      }
   };

   self.isKeyDataEntered = function () {
      return base.criteria.whse && base.criteria.drawerid;
   };

   self.assignJournalRecoveryData = function () {
      var newRecoveryData = base.buildRecoveryData(base.criteria.whse, base.criteria.drawerid);
      RecoveryService.updateRecoveryRecord(base.MENU_FUNCTION_OEEDE, base.journal.gJrnlno, base.journal.gJrnlno, base.recoveryData, newRecoveryData);
      base.recoveryData = newRecoveryData;
      if (base.journal) {
         base.journalControl.setRecoveryData(base.recoveryData);

         //Keep this current so we can cleanup up Recovery data on Journal Close properly.  Make sure
         //we always have the most recent Journal.
         base.journalNumberClosing = base.journal.gJrnlno;
      }
   };

   self.submitContinue = function () {
      //TODO: Add a new save call. here.

      //Once we have submitted data, they can't change the keys until the Journal is closed.
      base.keysTiedDown = true;

      //TODO: When we get the new API call built and it's called, I won't need this delay since the Save call
      //will provide the nececessary time for the blank recovery record to get created and then allow time
      //for me to update it with the proper Keys data.   Loose-end: Refactor this at that time and remove the
      //timeout and simply call that assignJournalRecoveryData function.
      $timeout(self.assignJournalRecoveryData, 300);

      self.clear();
      MessageService.error('global.error', 'Submit (TODO)');   //TODO: Wireframe
   };

   self.submit = function () {
      if (self.isKeyDataEntered()) {
         if (self.isJournalOpen()) {
            base.journalControl.showOpenView(function () {
               self.submitContinue();
            });
         } else {
            self.submitContinue();
         }
      } else {
         MessageService.error('global.error', 'error.warehouse.and.drawer.id.required');
      }
   };

   // Reset Record
   self.reset = function () {
      self.oeede = angular.copy(self.tempNewOeede);
      self.clear();
   };
});
