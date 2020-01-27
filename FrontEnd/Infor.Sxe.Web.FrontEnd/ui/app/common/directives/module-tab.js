'use strict';

/**
 * Directive for an individual Module Tab (the panel part where content goes).
 * This is used for properly getting information about a module tab.
 */
app.directive('moduleTab', function moduleTab($state) {

   return {
      restrict: 'A',
      scope: true, // Needed for controller
      controllerAs: 'moduleTab', // We are using the directive's controller as the api-enabled "control"
      controller: function ($attrs) {
         var self = this;

         // We put the tab id as the value of the directive (which is the same as the base state name)
         self.baseStateName = $attrs.moduleTab;

         // API to get base state for this tab
         self.getBaseState = function () {
            return $state.get(self.baseStateName);
         };

         // API to get base state name for this tab
         self.getBaseStateName = function () {
            return self.baseStateName;
         };

         // API to get menu function for this tab
         self.getMenuFunction = function () {
            var state = $state.get(self.baseStateName);
            return state.data ? state.data.menuFn : '';
         };
      }
   };

});