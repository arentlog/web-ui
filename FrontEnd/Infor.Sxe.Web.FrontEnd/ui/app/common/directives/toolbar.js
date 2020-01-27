'use strict';

/**
 * Directive for toolbar controls.
 *
 */
app.directive('toolbar', function toolbar() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element) {
         var $toolbar = $(element);
         var status = {
            isUpdatePending: false
         };

         // Need to watch visible conditions on all buttons in toolbar so that we can tell toolbar to update itself
         // when button visibility changes. This is needed because the toolbar renders its buttons (either on screen or
         // in the overflow menu) based on how many buttons are visible.
         $toolbar.find('button').each(function () {
            var $button = $(this);
            var visibility = $button.attr('data-watch-visibility');

            if (visibility) {
               scope.$watch(visibility, function (newValue, oldValue) {
                  if (newValue !== oldValue) {

                     // Update toolbar (if an update is not already pending)
                     if (!status.isUpdatePending) {
                        status.isUpdatePending = true;

                        // Perform update after a delay (since multiple button watch statements may be changing
                        // during a scope apply, and angular needs some time to modify the DOM)
                        // Note: For some reason, needs to be a long delay (500 ms) in order to pick up latest DOM
                        setTimeout(function () {
                           var toolbarApi = $toolbar.data('toolbar');

                           if (toolbarApi) {
                              $toolbar.trigger('recalculate-buttons.toolbar');
                           }

                           status.isUpdatePending = false;
                        }, 500);
                     }
                  }
               });
            }
         });
      }
   };

});
