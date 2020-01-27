'use strict';

/**
 * Service for retrieving dynamic options from api calls (used by drop down and radio sets)
 */
app.service('OptionApiService', function OptionApiService(DataService, DynamicOptionSets, Utils) {

   // Cache of retrieved options
   var cache = {};

   /* Public API */

   /**
   * Get options by key
   */
   this.get = function (optionKey, callback) {
      var dynamicMeta = DynamicOptionSets[optionKey];

      // Get options (from server or cache)
      if (!cache[optionKey]) {
         var path = dynamicMeta.dataPath;
         var callOptions = {
            method: dynamicMeta.method || 'GET',
            data: dynamicMeta.criteria
         };

         // Make api call
         DataService.send(path, callOptions, function (data) {
            var list = dynamicMeta.responseField ? data[dynamicMeta.responseField] : data;

            // Prepare list before returning data (apply converter, etc.)
            list = prepareOptionList(list, dynamicMeta);

            // Cache (unless specifically requested not to)
            if (dynamicMeta.cache !== false) {
               cache[optionKey] = list;
            }

            callback(list);
         });
      } else {
         callback(cache[optionKey]);
      }
   };


   // Private methods

   function prepareOptionList(list, dynamicMeta) {
      var labelField = dynamicMeta.labelField;
      var valueField = dynamicMeta.valueField;
      var valueToLabelConverter = dynamicMeta.valueToLabelConverter;
      var newList = [];
      var i, opt, label, value;

      if (list) {
         for (i = 0; i < list.length; i++) {
            opt = list[i];
            value = Utils.getNestedValue(opt, valueField);

            // Use value-to-label converter if specified
            if (valueToLabelConverter) {
               label = valueToLabelConverter(value);
            } else {
               label = Utils.getNestedValue(opt, labelField);
            }

            newList.push({ label: label, value: value });
         }
      }

      return newList;
   }

});
