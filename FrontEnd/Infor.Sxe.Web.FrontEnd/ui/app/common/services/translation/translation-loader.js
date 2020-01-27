'use strict';

/**
 * This is where we fetch the translation language file to use.
 * In order to allow for custom strings to be added through extensibility, we needed to implement this "Custom Loader"
 * as described here - https://angular-translate.github.io/docs/#/guide/13_custom-loaders
 */
app.factory('TranslationLoader', function TranslationLoader($q, $translate, AppInfoService, DataService, TranslationService, Utils) {

   return function (options) {
      var deferred = $q.defer();
      var locale = options.key;
      var basePath = AppInfoService.getTranslationFilePath();
      var table = $translate.getTranslationTable(locale);

      // If translation table already exists, it means we have already fetched the default strings. Now add any custom
      // strings that were added by a JavaScript extension.
      if (locale) {
         if (locale.substring(0, 3).toLowerCase() === 'es-') {
            locale = 'es-MX';
         }
      }

      if (table) {
         var strings = TranslationService.getCustomStrings(locale);

         // Extend the default strings with the custom strings
         if (strings) {
            Utils.extend(table, strings);
         }

         deferred.resolve(table);
      } else {
         // Attempt to get the language file (suppress 404 error message that happens for non-existent languages)
         DataService.get(basePath + locale + '.json', { suppressErrors: true }, function success(data) {
            deferred.resolve(data);
         }, function error() {
            deferred.reject(locale);
         });
      }

      return deferred.promise;
   };

});