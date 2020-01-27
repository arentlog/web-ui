'use strict';

/**
 * Service for very general information about the application (the app may be SX.e, Storeroom, other).
 * This is meant for info that is relevant to any app, not for things specific to SX.e.
 * For example, this service could house info like...
 *    - App Name
 *    - Enable Context App Messaging
 *    - Enable View Personalization
 *    - etc.
 */
app.service('AppInfoService', function AppInfoService(UserService) {

   /* Properties */

   // Name of the application stored in all lower case (sxe, twl, etc.) and used for file and local storage prefixing.
   // Defaults to sxe unless the 'app' url param is specified.
   var appName = 'sxe';

   // File path for this application's translation strings
   var translationFilePath;

   // Key value map of url params
   var urlParams = {};


   /* Public methods */

   this.getAppName = function () {
      return appName;
   };

   this.getLocalStoragePrefix = function () {
      // This value is only populated in a multi-tenant env (so just use DEFAULT for single tenant env)
      var tenant = UserService.getTenant() || 'DEFAULT';

      return appName.toUpperCase() + '_' + tenant.toUpperCase() + '_' + UserService.getCono() + '_' + UserService.getUserName().toUpperCase() + '_';
   };

   this.getTranslationFilePath = function () {
      return translationFilePath;
   };

   this.getUrlParam = function (key) {
      return urlParams[key];
   };

   /**
    * Initialize the app info
    */
   this.initialize = function () {
      var paramString = window.location.search || '';

      // Remove '?'
      if (paramString.startsWith('?')) {
         paramString = paramString.replace('?', '');
      }

      // Build key/value map of url params
      if (paramString) {
         var params = paramString.split('&');

         for (var i = 0; i < params.length; i++) {
            var param = params[i];
            var pieces = param.split('=');
            var name = decodeURIComponent(pieces[0]);
            var value = pieces.length >= 2 ? decodeURIComponent(pieces[1]) : '';

            // Add param
            urlParams[name] = value;
         }
      }

      // Use specified app name, otherwise keep the default
      var appParamValue = this.getUrlParam('app');
      if (appParamValue) {
         appName = appParamValue.toLowerCase();
      }

      // Set base path to translation file to use
      if (appName === 'sxe') {
         translationFilePath = 'ui/app/assets/languages/';
      } else {
         translationFilePath = 'ui/app/assets/languages/' + appName + '-';
      }
   };

   // Init this service. Later we may need to init this with data from the outside.
   this.initialize();

});
