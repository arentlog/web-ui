'use strict';

/**
 * Directive for tab security.
 *
 * 0 - No Security
 *     Probably relates more to tabs and sub tabs...Not visible instead of Disabled might work best here
 *
 * 1 - ??
 *
 * 2 - Inquiry only
 *     Remove: Copy, Create, Delete, Edit, Save, Continue, Reset
 *
 * 3 - Inquiry and Change
 *     Remove: Copy, Create, Delete
 *
 * 4 - Modify
 *     Remove: Delete
 */
app.directive('tabSecurity', function tabSecurity(SecurityService, TabService) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $tabs = $(element);
         var menuFn = TabService.getMenuFunction(scope);

         $tabs.find('.tab-list li, .tab-panel').each(function () {
            var $tabElement = $(this);
            var subFn = $tabElement.attr('data-sub-function');

            // If tab doesn't have a sub function specified, then it's not subject to security/removal
            if (subFn) {
               // Get security level for the given sub function
               var securityLevel = SecurityService.getSubSecurityLevel(menuFn, subFn);

               if (securityLevel < 2) {
                  $tabElement.remove();
               }
            }
         });
      }
   };
});