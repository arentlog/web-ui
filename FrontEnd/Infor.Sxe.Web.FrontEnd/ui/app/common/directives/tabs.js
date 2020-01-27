'use strict';

/**
 * Directive for tabs control (set of tabs).
 */
app.directive('tabs', function tabs($state, ContextService, Utils) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $tabs = $(element);

         // Listen to activated event and handle any activated event code
         $tabs.on('activated', function(e, anchor) {
            var activatedExpression = anchor.attr('data-activated');

            // Flag the specific tab as 'hasBeenActivated' (needed by other code like included views inside of tabs)
            anchor.data('hasBeenActivated', true);

            // If the activated tab has an activated event, evaluate the js expression and apply scope
            if (activatedExpression) {
               if (!scope.$$phase) {
                  scope.$apply(activatedExpression);
               } else {
                  scope.$eval(activatedExpression);
               }
            }

            // Notify ContextService of the tab change (since it affects the screen ID published)
            var tabId = anchor.parent().attr('data-tab-id');
            ContextService.setScreenIdSuffix(tabId, $state.current.name);
         });

         // After the parent view has been initialized the control api will be available
         $tabs.closest('[initialize]').on('initialized', function () {
            var tabsControl = $tabs.data('tabs');
            var controlRef = attrs.controlRef;
            var onReady = attrs.onReady;

            // Set tabs control somewhere within scope, if requested
            if (controlRef) {
               Utils.setNestedValue(scope, controlRef, tabsControl);
            }

            // Notify that control is ready, if requested
            if (onReady) {
               // Remove invoke parenthesis if present since we simply want to get the reference to the function
               onReady = onReady.replace('()', '');

               // Get function from scope
               var fn = Utils.getNestedValue(scope, onReady);

               // Call function and pass control
               if (fn) {
                  fn(tabsControl);

                  // Apply scope (if not already being applied)
                  if (!scope.$$phase) {
                     scope.$apply();
                  }
               }
            }
         });
      }
   };

});
