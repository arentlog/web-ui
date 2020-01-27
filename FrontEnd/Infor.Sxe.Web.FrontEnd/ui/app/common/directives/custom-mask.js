'use strict';

/**
 * Directive for custom mask definitions. User input can be limited to the specified RegExp.
 */
app.directive('customMask', function customMask() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var regex = new RegExp(attrs.customMask);

         // Get existing data-options attribute on the element, or start a fresh object
         var options = attrs.options ? JSON.parse(attrs.options) : {};

         // If pattern is not specified (using 'c' characters), then use maxlength to create the pattern
         if (!options.pattern) {
            var pattern = '';
            var maxLength = attrs.maxlength ? parseInt(attrs.maxlength, 10) : 100; // if no maxlength, then default to a large number

            // Build pattern with X number of 'c' characters
            for (var i = 0; i < maxLength; i++) {
               pattern += 'c';
            }

            options.pattern = pattern;
         }

         // Add custom regex to the mask's definitions (specified by 'c' in the mask pattern)
         options.definitions = {
            c: regex
         };

         // Initialize mask
         $element.mask(options);
      }
   };

});
