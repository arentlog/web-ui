'use strict';

/**
 * Directive for the Extension/Extend menu
 */
app.directive('extensionMenu', function extensionMenu($state, DevToolsService, PvUser) {

   // Access level values that causes the menu to be enabled (company, system)
   var enabledValues = ['c', 's'];

   return {
      restrict: 'A',
      scope: true,
      controllerAs: 'extmenu',
      controller: function ($scope) {
         var self = this;

         // Extend a certain view
         self.extendView = function (viewPath) {
            DevToolsService.openViewEditor(viewPath, true);
         };

         // Extend the current view in the main section
         self.editMainView = function () {
            DevToolsService.editMainView(true);
         };

         // Show active views to extend
         self.showActiveViews = function () {
            DevToolsService.showActiveViews($scope, 'extend');
         };

         // Create a new view
         self.newView = function () {
            $state.go('saaea.create', { type: 'newview' });
         };

         // Create a JavaScript extension
         self.newJavaScript = function () {
            $state.go('saaea.create', { type: 'javascript' });
         };

         // Create a CSS extension
         self.newCSS = function () {
            $state.go('saaea.create', { type: 'css' });
         };

         // Open a url in new window (for rest help page and swagger page)
         // Note: There was a strange issue while running in ming.le where the new page was being opened twice when
         //       using the a href target="_blank" so we instead open it via this javascript function.
         self.openWindow = function (url) {
            window.open(url);
         };
      },
      link: function (scope, element) {
         var accessLevel = PvUser.webextensiontype || '';

         // Remove the menu if the user doesn't have permission to extend
         if (enabledValues.indexOf(accessLevel.toLowerCase()) < 0) {
            element.remove();
         }
      }
   };

});