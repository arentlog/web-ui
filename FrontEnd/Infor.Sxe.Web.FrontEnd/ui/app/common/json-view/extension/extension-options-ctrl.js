'use strict';

/**
 * Controller for the Extension Options modal (used by the WYSIWYG Ctrl)
 */
app.controller('ExtensionOptionsCtrl', function ($scope, PvUser, TabService, UserService) {
   var self = this;
   var accessLevel = PvUser.webextensiontype || '';

   // Initialize values based on if user has System (and Company) access or only Company access
   if (accessLevel.toLowerCase() === 's') {
      self.level = 'system';
      self.showSystemOption = true;
      self.showCompanyOption = true;
   } else if (accessLevel.toLowerCase() === 'c') {
      self.level = 'cono';
      self.cono = UserService.getCono();
      self.showCompanyOption = true;
   }

   self.submit = function () {
      $scope.extensionOptionsModal.destroy();

      // If level is cono then pass the cono, otherwise pass cono of 0 for system level
      var cono = self.level === 'cono' ? self.cono : 0;

      // Proceed to get view
      $scope.getView(self.level, cono);
   };

   self.cancel = function () {
      $scope.extensionOptionsModal.destroy();

      // Close the tab since we have nothing to display
      TabService.closeTab('wysiwyg');
   };

   self.levelChanged = function () {
      if (self.level === 'cono') {
         self.cono = UserService.getCono();
      } else {
         self.cono = null;
      }
   };
});