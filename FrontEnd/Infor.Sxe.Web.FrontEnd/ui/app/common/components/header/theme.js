'use strict';

/**
 * Controller for SoHo Theme selection menu.
 */
app.controller('ThemeCtrl', function (AppInfoService) {
   var self = this;
   var $body = $('body');
   var storageKey = AppInfoService.getLocalStoragePrefix() + 'THEME';

   // Get stored theme or default to light
   self.theme = localStorage[storageKey] || 'light';

   // Apply theme
   self.applyTheme = function (theme) {
      self.theme = theme;

      // Tell SoHo to change theme
      $body.trigger('changetheme', theme);

      // Tell web parts to change theme
      infor.companyon.client.sendMessage('SxeSyncTheme', { theme: theme });

      // Remove old theme class, and add new class to body for any css tweaks
      $body.removeClass('light-theme dark-theme high-contrast-theme').addClass(theme + '-theme');
   };

   // Apply theme initially (must wait until after SoHo initialize)
   $body.on('initialized', function () {
      self.applyTheme(self.theme);
   });

   // Theme selection change
   self.selectTheme = function (theme) {
      self.applyTheme(theme);

      // Store theme when changed
      localStorage[storageKey] = theme;
   };
});
