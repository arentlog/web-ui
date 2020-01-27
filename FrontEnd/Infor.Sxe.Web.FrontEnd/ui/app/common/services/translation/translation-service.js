'use strict';

/**
 * Service for adding new strings via extensibility.
 */
app.service('TranslationService', function TranslationService(Utils) {
   var self = this;

   // Holder for added strings grouped by language maps
   var translationData = {};

   // Add strings to a language
   self.addStrings = function (lang, data) {
      var map = translationData[lang];

      // Add map for this language if first time
      if (!map) {
         map = {};
         translationData[lang] = map;
      }

      // Add string data to the map
      Utils.extend(map, data);
   };

   // Get custom strings for a language
   self.getCustomStrings = function (lang) {
      return translationData[lang];
   };

   // Check if any custom string data exists
   self.hasCustomStrings = function () {
      return Object.keys(translationData).length > 0;
   };
});