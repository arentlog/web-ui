'use strict';

/**
 * Service for displaying modals and contextual action panels
 */
app.service('ModalService', function ModalService($compile, JsonViewService) {

   /* Public API */

   this.showModal = function (jsonView, controller, scope, callback) {
      showView('modal', jsonView, controller, scope, callback);
   };

   this.showActionPanel = function (jsonView, controller, scope, callback) {
      showView('contextualactionpanel', jsonView, controller, scope, callback);
   };


   /* Private Methods */

   function showView(pluginName, jsonView, controller, scope, callback) {

      // Get JSON view and insert compiled html into element
      JsonViewService.getView(jsonView).then(function (html) {
         var newScope = scope.$new();

         // Add controller
         if (controller) {
            html = html.replace('<div', '<div ng-controller="' + controller + '"');
         }

         // Compile the Angularized HTML before sending to modal call
         var compiledHtml = $compile(html)(newScope);
         var $modal = $(compiledHtml);

         // Provide modal to caller so caller can close the modal when desired (SoHo doesn't make modal available until after 'open' event)
         // Note: using 'one' instead of 'on' to avoid clashes when lookups within modals are opened
         $modal.one('open', function (e, modal) {
            if (callback) {
               callback(modal);
            }
         });

         // Destroy new scope when modal is destroyed
         $modal.one('destroy', function () {
            newScope.$destroy();
         });

         // Activate modal
         $('body')[pluginName]({
            content: $modal,
            initializeContent: false,
            trigger: 'immediate',
            autoFocus: false // turn autoFocus off so that our own autoFocus code works
         });
      });
   }

});
