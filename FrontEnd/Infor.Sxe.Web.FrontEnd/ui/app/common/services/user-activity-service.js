'use strict';

/**
 * Service for recording user activity for session purposes.
 * Ming.le relies on us writing a certain user activity cookie value.
 */
app.service('UserActivityService', function UserActivityService(AppInfoService) {

   /* Properties */

   var initialized = false;
   var inMingle = false;
   var logicalId = AppInfoService.getUrlParam('LogicalId');
   var isUpdatePending = false;

   // Reference to SessionService (since Angular doesn't allow circular dependency injection)
   var SessionService = null;


   /* Public methods */

   /**
    * Initialize service and cookie values (if they are not blank)
    */
   this.initialize = function (sessionService) {
      initialized = true;
      SessionService = sessionService;

      // If logicalid is present, we are running in Ming.le
      if (logicalId) {
         inMingle = true;

         // Record first activity
         this.recordActivity();
      }
   };

   /**
    * Notify the service that user activity has happened (api call made, state change, etc.)
    */
   this.recordActivity = function () {

      // Some activity (data calls) happens before initialized is called, so ignore those.
      // Don't proceed if an update is already pending.
      if (initialized && !isUpdatePending) {
         isUpdatePending = true;

         // Wait 3-seconds (and ignore other activity) before performing update (so we avoid many unnecessary updates)
         setTimeout(function () {
            updateSession();
            isUpdatePending = false;
         }, 3000);
      }
   };


   /* Private methods */

   function updateSession() {

      // Reset timeout timer
      SessionService.setTimeoutTimer();

      // Send message via companyon.
      if (inMingle) {
         infor.companyon.client.sendMessage('updateUserActivityCookie', {
            applicationName: logicalId,
            updateCookie: true
         });
      }
   }
});
