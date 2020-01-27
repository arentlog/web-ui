'use strict';

/**
 * Directive for easily removing controls from view if user doesn't have sufficient security for the menu function/sub function.
 */
app.directive('securityLevel', function securityLevel(SecurityService, TabService) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $control = $(element);
         var controlSecurityLevel = attrs.securityLevel;

         if (controlSecurityLevel) {
            controlSecurityLevel = parseInt(controlSecurityLevel);
            var userSecurityLevel = null;

            // Get menu function for this tab
            var menuFn = TabService.getMenuFunction(scope);

            // Get sub-function from ancestor elements (if exists)
            var subFn = $control.closest('[data-sub-function]').attr('data-sub-function');

            // If the control is inside of a sub-function, then use security level of the sub-function
            if (subFn) {
               userSecurityLevel = SecurityService.getSubSecurityLevel(menuFn, subFn);
            } else {
               // else use security level of menu function
               userSecurityLevel = SecurityService.getSecurityLevel(menuFn);
            }

            // Remove control/element from view if user doesn't have high enough security
            if (userSecurityLevel < controlSecurityLevel) {
               $control.remove();
            }
         }
      }
   };
});