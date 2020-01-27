'use strict';

/**
 * Directive for only including certain DOM elements when running in dev mode.
 */
app.directive('devOnly', function devOnly(ConfigService) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var include = false;

         // Include the element if...
         // Case 1 (developer button): dev tools is enabled (if dev environment or user has access to dev tools)
         // Case 2 (other elements): dev environment
         if (attrs.id === 'developer-button') {
            if (ConfigService.isDevToolsEnabled()) {
               include = true;
            }
         } else if (ConfigService.isDevMode()) {
            include = true;
         }

         // Remove element
         if (!include) {
            $element.remove();
         }
      }
   };

});
