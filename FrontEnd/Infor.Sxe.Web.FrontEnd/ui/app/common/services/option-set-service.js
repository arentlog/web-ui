'use strict';

/**
 * Service for retrieving option sets (used by drop down and radio sets)
 */
app.service('OptionSetService', function OptionSetService($translate, DataService) {

   // Cache of groups of sets
   var cache = {};

   /* Public API */

   /**
   * Get an option set by group and set key
   */
   this.get = function (groupKey, setKey, callback) {
      getGroup(groupKey, function (group) {
         var optSet = group[setKey];

         // Translate labels (if not already done so)
         if (!optSet.translated) {
            var length = optSet.children.length;
            optSet.translated = true;

            for (var i = 0; i < length; i++) {
               var opt = optSet.children[i];
               opt.label = $translate.instant(opt.label);
            }
         }

         callback(optSet);
      });
   };

   /**
   * Get a label for an option set item by group, set and value key
   */
   this.getDisplayLabel = function (groupKey, setKey, valueKey, callback) {
      getGroup(groupKey, function (group) {
         var displayLabel = '';
         var optSet = group[setKey];

         // Translate labels (if not already done so)
         if (!optSet.translated) {
            var length = optSet.children.length;
            optSet.translated = true;

            for (var i = 0; i < length; i++) {
               var opt = optSet.children[i];
               opt.label = $translate.instant(opt.label);
            }
         }

         if (valueKey !== undefined) {
            var options = optSet.children;
            var idx = options.findIndex(function (option) {
               return option.value.toString().toLowerCase() === valueKey.toString().toLowerCase();
            });

            if (idx >= 0) {
               var option = options[idx];
               displayLabel = option.label;
            }
         }

         callback(displayLabel);
      });
   };

   /**
    * Get a group of option sets
    */
   this.getGroup = function (groupKey, callback) {
      getGroup(groupKey, callback);
   };


   /* Private methods */

   function getGroup(groupKey, callback) {
      var filePath = 'ui/app/meta/option-sets/options-static-' + groupKey.toLowerCase() + '.json';
      var group = cache[groupKey];

      // Get from cache or server
      if (group) {
         callback(group);
      } else {
         DataService.get(filePath, function (data) {
            // Cache the group
            cache[groupKey] = data;

            callback(data);
         });
      }
   }

});
