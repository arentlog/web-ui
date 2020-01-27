'use strict';

/**
 * The shared journal control (in the left sidebar)
 *
 * Available options (from base.journalOptions)
 *
 * controlRef - where to make the journal control and its API available
 *    - ex. 'base.journalControl'
 * journalRef - where to set the journal record after it's open
 *    - ex. 'base.journal'
 * openedCallback - where to find the callback function to invoke after a journal is opened
 *    - ex. 'base.journalOpened'
 *    - Note: Must be on the base controller
 * canceledCallback - where to find the callback function to invoke after the journal open view is canceled by the user
 *    - ex. 'base.journalOpenCanceled'
 *    - Note: Must be on the base controller
 * beforeCloseCallback - where to find the callback function to invoke when Close is selected but before it occurs.  This
 *                       allows for logic or validation to occur before the Close is allowed.  NOTE:  You can also pass
 *                       a 'true' to the CloseJournal function to conditionally skip this callback.
 *    - ex. 'base.journalBeforeClose'
 * closedCallback - where to find the callback function to invoke after a journal is closed
 *    - ex. 'base.journalClosed'
 *    - Note: Must be on the base controller
 * readyCallback - where to find the callback function to invoke after the journal control is ready to be used
 *    - ex. 'base.journalControlReady'
 *    - Note: Must be on the base controller; Only necessary if you need to open the journal modal right away in a master state
 * isCloseDisabled - boolean to force the close button to stay disabled (Not normally required)
 * isCheckProofVisible - boolean to control if Check Proof is visible.  Normally only used in ARECE.
 * criteria - criteria object for the 'api/gl/asglentry/glopenjournal' call
 */
app.controller('JournalCtrl', function ($scope, $state, $stateParams, DataService, MessageService, ModalService, TabService, RecoveryService, Utils) {
   var self = this;
   var options = $scope.base.journalOptions;
   self.options = options;
   self.openedCallback = null;
   self.canceledCallback = null;
   self.beforeCloseCallback = null;
   self.userOpened = null;
   self.isCloseDisabled = self.options.isCloseDisabled;
   self.isCheckProofVisible = self.options.isCheckProofVisible;
   self.recoveryJournal = $stateParams.recoveryJournal;

   //Private so we require them to use the Getter/Setters
   var recoveryData = '';

   // Local reference to journal object
   self.journal = null;

   /**
    * API to show the journal open view
    * @param openedCallback - the callback function to use after journal is opened (instead of standard callback from options)
    * @param canceledCallback - the callback function to use after deciding not to open a journal (instead of standard callback from options)
    */
   self.showOpenView = function (openedCallback, canceledCallback) {
      self.userOpened = false;

      // Remember openedCallback function to use, or get function from journalOptions
      if (openedCallback) {
         self.openedCallback = openedCallback;
      } else {
         self.openedCallback = options.openedCallback ? Utils.getNestedValue($scope, options.openedCallback) : null;
      }

      // Remember canceledCallback function to use, or get function from journalOptions
      if (canceledCallback) {
         self.canceledCallback = canceledCallback;
      } else {
         self.canceledCallback = options.canceledCallback ? Utils.getNestedValue($scope, options.canceledCallback) : null;
      }

      // Show the journal open view
      ModalService.showModal('shared/journal/journal-open.json', 'JournalOpenCtrl as jo', $scope, function (modal) {
         self.journalOpenModal = modal;
      });
   };

   /**
    * API to show the journal display info view (though will probably never be called from outside this control)
    */
   self.showDisplayView = function () {
      // Only proceed if journal exists
      if (self.journal) {
         ModalService.showModal('shared/journal/journal-display.json', 'JournalDisplayCtrl as jd', $scope, function (modal) {
            self.journalDisplayModal = modal;
         });
      }
   };

   /**
    * API to get the Recovery Data.  When we close the Journal, we need to clean up the recovery records.  The RecoveryData
    * is part of the key.  This can be used to get the current value.  (i.e can contain values such as whse, order#-suffix, etc)
    */
   self.getRecoveryData = function () {
      return recoveryData;
   };

   /**
    * API to update the Recovery Data.  When we close the Journal, we need to clean up the recovery records.  The RecoveryData
    * is part of the key.  This can be used to set the current value.  (i.e can contain values such as whse, order#-suffix, etc)
    */
   self.setRecoveryData = function (value) {
      recoveryData = value;
   };

   /**
    * API to close the journal (if one is open)
    *
    * Define a beforeCloseCallback function if you want to trap some processing before the Close happens.  (i.e. in PO Receiving,
    * if a Journal is open and they have begun some work, we want to give the user a chance to perform a "Final Update"
    * before the journal is closed, otherwise it can't be closed).
    *
    * Optional Parameter: isSkipCallback - Can be set to 'true' if we do not want to perform the 'before' call.  This is helpful
    * if your calling program calls the closeJournal function directly; it can be useful to not get in a recursive loop.
    */
   self.closeJournal = function (isSkipCallback) {
      self.beforeCloseCallback = options.beforeCloseCallback ? Utils.getNestedValue($scope, options.beforeCloseCallback) : null;

      var journalNo;
      var currProc;
      var recData;

      // Do not proceed if no open journal
      if (!self.journal) {
         return;
      }

      // Perform a callback if some pre-processing needs to be done.
      if (!isSkipCallback && self.beforeCloseCallback) {

         // If false from the callback, we don't want to proceed with the close Journal.
         if (!self.beforeCloseCallback()) {
            return;
         }
      }

      journalNo = self.journal.gJrnlno;
      currProc = self.journal.gCurrproc;
      recData = recoveryData === null ? '' : recoveryData;  //NOTE: Do not change to shorthand null check, need to handle zero as possible value.

      // Clear local journal object reference, as well as client's reference
      self.journal = null;
      Utils.setNestedValue($scope, options.journalRef, null);

      // Send close request
      DataService.get('api/gl/asglentry/glclosejournal/' + journalNo, { busy: true }, function (data) {
         MessageService.info('global.journal.closed', journalNo);

         RecoveryService.deleteRecoveryRecord(currProc, journalNo, recData);

         //Make sure we don't have residual data.
         self.setRecoveryData('');

         // Closed callback
         if (options.closedCallback) {
            var fn = Utils.getNestedValue($scope, options.closedCallback);

            // Invoke callback function
            fn();
         }
      });
   };

   /**
    * API to know if a journal is currently open
    */
   self.isJournalOpen = function () {
      return self.journal && self.journal.gJrnlno ? true : false;
   };

   /**
    * API to reopen a journal manually (used only by multiple tab functions)
    */
   self.recoverJournal = function (journalNo) {
      var criteria = {
         currproc: options.criteria.currproc,
         system: options.criteria.system,
         jrnlno: journalNo
      }

      self.reopenJournal(criteria);
   };

   self.reopenJournal = function (criteria) {
      self.openedCallback = options.openedCallback ? Utils.getNestedValue($scope, options.openedCallback) : null;

      DataService.post('api/gl/asglentry/glreopenjournal', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (!data.cWarningMessage) {

               // Set journal object on journal control (jrnl), as well as client's controller (updates journal binding)
               self.journal = data.glopenjournalresults;
               Utils.setNestedValue($scope, options.journalRef, self.journal);

               //Initialize recovery data from the recovered journal.
               self.setRecoveryData($stateParams.recoveryData);

               // Opened callback
               if (self.openedCallback) {
                  self.openedCallback(self.journal, false);
               }
            } else {
               MessageService.errorMessages(data.cWarningMessage);
            }
         }
      });
   };

   // Journal open button clicked (private function)
   self.journalOpenClicked = function () {
      self.userOpened = true;

      // Get openedCallback and canceledCallback function to use from journalOptions
      self.openedCallback = options.openedCallback ? Utils.getNestedValue($scope, options.openedCallback) : null;
      self.canceledCallback = options.canceledCallback ? Utils.getNestedValue($scope, options.canceledCallback) : null;

      // Show the journal open view
      ModalService.showModal('shared/journal/journal-open.json', 'JournalOpenCtrl as jo', $scope, function (modal) {
         self.journalOpenModal = modal;
      });
   };

   // Journal display clicked (private function)
   self.journalDisplayClicked = function () {
      self.showDisplayView();
   };

   // Journal close button clicked (private function)
   self.journalCloseClicked = function () {
      self.closeJournal();
   };

   // Close the journal (if open) when the tab closes
   TabService.onCloseTab($state.current, function () {
      self.closeJournal();
   });

   // Reopen the Journal if we are recovering.
   if ($stateParams.recoveryJournal) {
      var criteria = {
         currproc: options.criteria.currproc,
         system: options.criteria.system,
         jrnlno: $stateParams.recoveryJournal
      }

      self.reopenJournal(criteria);
   }

   // Provide reference to control API to the consumer of this control (if requested via options)
   if (options.controlRef) {
      Utils.setNestedValue($scope, options.controlRef, self);
   }

   // Notify consumer that control is ready (if requested via options)
   if (options.readyCallback) {
      // Get function from scope
      var fn = Utils.getNestedValue($scope, options.readyCallback);

      // Call function and pass control
      fn(self);
   }
});

app.controller('JournalOpenCtrl', function ($scope, ConfigService, DataService, MessageService, RecoveryService, Utils) {
   var self = this;
   var jrnl = $scope.jrnl;
   var options = jrnl.options;

   // Init criteria with copy of journal criteria from the options (copy to avoid residual data)
   self.criteria = angular.copy(options.criteria);

   // Set default period
   var glDefaultPeriods = ConfigService.getGLDefaultPeriods();
   if (glDefaultPeriods) {
      self.criteria.period = glDefaultPeriods.iGlDefPer;
   }

   // Close open modal
   self.cancel = function () {
      jrnl.journalOpenModal.destroy();

      // Canceled callback
      if (jrnl.canceledCallback) {
         jrnl.canceledCallback();
      }
   };

   // Submit journal open request
   self.submit = function () {
      //Set warningok property as 'false' to honor warning message returned by "glopenjournal" API call
      self.criteria.warningok = false;

      self.openJrnl();
   };

   self.openJrnl = function () {
      DataService.post('api/gl/asglentry/glopenjournal', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage) {
               // Display journal question 8040
               var msg = data.cWarningMessage + '<br />' + MessageService.get('question.do.you.wish.to.continue');
               MessageService.yesNo('global.question', msg, function () {
                  //If user clicks YES, set warningok property as 'true' to skip warning message returned by "glopenjournal" API call
                  self.criteria.warningok = true;
                  self.openJrnl();
               });
            }
            else {
               // TODO figure out the journal manager, update Recent Journal, and Recovery records
               // AuthenticationService.UpdateRecentJournal(JournalNumber);
               // JournalManager.CurrentOpenJournals.Add(GLOpenJournalResponse.glopenjournalresults.gJrnlno);
               RecoveryService.createRecoveryRecord(data.glopenjournalresults.gCurrproc, data.glopenjournalresults.gJrnlno, '');

               // Set journal object on journal control (jrnl), as well as client's controller (updates journal binding)
               jrnl.journal = data.glopenjournalresults;
               Utils.setNestedValue($scope, options.journalRef, jrnl.journal);

               // Opened callback
               if (jrnl.openedCallback) {
                  jrnl.openedCallback(jrnl.journal, jrnl.userOpened);
               }

               // Close modal
               jrnl.journalOpenModal.destroy();
            }
         }
      });
   };


});

app.controller('JournalDisplayCtrl', function ($scope, DataService, MessageService, Utils) {
   var self = this;
   var jrnl = $scope.jrnl;
   self.openedOnDate = null;

   // Clear old journal display data
   self.journal = null;

   // Build modal title
   self.modalTitle = MessageService.get('global.journal.number') + jrnl.journal.gJrnlno;

   // Get latest journal info when navigating to display
   var criteria = {
      jrnlno: jrnl.journal.gJrnlno
   };

   DataService.post('api/gl/asglentry/gldisplayjournal', { data: criteria, busy: true }, function (data) {
      self.journal = data;

      //The backend is sending up the 'assigneddate' as a string but we need to handle the backend mdy or dmy format
      //but also present the date in the right Locale for the user as well.
      self.openedOnDate = Utils.reformatStringDate(self.journal.assigneddate);
   });

   // Close display modal
   self.closeModal = function () {
      jrnl.journalDisplayModal.destroy();
   };
});