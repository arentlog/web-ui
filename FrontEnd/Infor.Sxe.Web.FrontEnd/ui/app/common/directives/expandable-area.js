'use strict';

/**
 * Directive for expandable area control.
 */
app.directive('expandableArea', function expandableArea(Utils) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var onExpand = attrs.onExpand;
         var onCollapse = attrs.onCollapse;

         // After the parent view has been initialized the control api will be available
         element.closest('[initialize]').on('initialized', function () {
            var control = element.data('expandablearea');
            var controlRef = attrs.controlRef;
            var onReady = attrs.onReady;

            // Set control somewhere within scope, if requested
            if (controlRef) {
               Utils.setNestedValue(scope, controlRef, control);
            }

            // Notify that control is ready, if requested
            if (onReady) {
               // Remove invoke parenthesis if present since we simply want to get the reference to the function
               onReady = onReady.replace('()', '');

               // Get function from scope
               var fn = Utils.getNestedValue(scope, onReady);

               // Call function and pass control
               if (fn) {
                  fn(control);

                  // Apply scope (if not already being applied)
                  if (!scope.$$phase) {
                     scope.$apply();
                  }
               }
            }
         });

         // Listen to expand event and evaluate the defined event expression and apply scope
         if (onExpand) {
            element.on('expand', function () {
               if (!scope.$$phase) {
                  scope.$apply(onExpand);
               } else {
                  scope.$eval(onExpand);
               }
            });
         }

         // Listen to collapse event and evaluate the defined event expression and apply scope
         if (onCollapse) {
            element.on('collapse', function () {
               if (!scope.$$phase) {
                  scope.$apply(onCollapse);
               } else {
                  scope.$eval(onCollapse);
               }
            });
         }

         // Collapsed condition
         if (attrs.collapsedIf) {
            scope.$watch(attrs.collapsedIf, function (value) {
               var expArea = element.data('expandablearea');

               // If the underlying SoHo control hasn't been initialized yet, make changes to the element's html
               if (!expArea) {
                  if (value) {
                     element.removeClass('is-expanded');
                  } else {
                     element.addClass('is-expanded');
                  }
               } else {
                  if (value) {
                     expArea.close();
                  } else {
                     expArea.open();
                  }
               }
            });
         }
      }
   };

});
