'use strict';

/**
 * Directive for interacting with SoHo mask api (like masks that change).
 */
app.directive('mask', function mask() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);

         // Watch mask expression if defined
         if (attrs.maskExpression) {
            scope.$watch(attrs.maskExpression, function (pattern) {
               var maskApi = $element.data('mask');

               // Use new pattern
               if (pattern) {
                  var optionsAttr = $element.attr('data-options');

                  // Use existing data-options attribute on the field, or start a fresh object
                  var options = optionsAttr ? JSON.parse(optionsAttr) : {};

                  // Apply new pattern
                  options.pattern = pattern;

                  // Add mask attribute and update options attribute on the field
                  $element.attr('data-mask', '').attr('data-options', JSON.stringify(options));

                  // Destroy old SoHo mask
                  if (maskApi) {
                     maskApi.destroy();
                  }

                  // Tell SoHo mask to re-create itself
                  $element.mask(options);
               } else {
                  // Remove mask entirely
                  $element.removeAttr('data-mask');

                  if (maskApi) {
                     maskApi.destroy();
                  }
               }
            });
         }
      }
   };

});
