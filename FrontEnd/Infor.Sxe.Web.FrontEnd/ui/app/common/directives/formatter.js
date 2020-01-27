'use strict';

/**
 * Directive for formatting of non-editable display data (i.e. Info fields)
 */
app.directive('formatter', function formatter($filter, FieldFormats) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var type = attrs.formatter;
         var model = attrs.model;
         var formatOptions = attrs.formatOptions ? JSON.parse(attrs.formatOptions) : null;

         if (type && model) {
            // Get metadata for this type of field format
            var formatMeta = FieldFormats[type];

            if (formatMeta) {
               var formatterFn = formatMeta.formatter;
               var subFormatObj = getSubFormat(formatMeta.subFormats, attrs.subFormat);
               formatOptions = getFormatOptions(formatMeta.formatOptions, formatOptions);

               // Watch for model changes and update the view
               scope.$watch(model, function (value) {

                  // Use formatter function if exists
                  if (formatterFn) {
                     $element.html(formatterFn(value, subFormatObj, formatOptions));
                  } else {
                     // Do a graceful blank display for null/undefined values
                     if (value === null || value === undefined) {
                        $element.html('');
                     } else {
                        $element.html(value);
                     }
                  }
               });
            }
         }
      }
   };

   // Private methods

   /**
    * Get specified sub format object from format's subFormat list
    */
   function getSubFormat(subFormatList, subFormat) {
      if (subFormatList && subFormat) {
         var length = subFormatList.length;

         for (var i = 0; i < length; i++) {
            if (subFormatList[i].key === subFormat) {
               return subFormatList[i];
            }
         }
      }

      return undefined;
   }

   /**
    * Get format options specified on field, as well as any default values from metadata
    */
   function getFormatOptions(formatOptionsMeta, formatOptions) {
      var options;

      if (formatOptionsMeta) {
         options = formatOptions || {};

         for (var prop in formatOptionsMeta) {
            if (formatOptionsMeta.hasOwnProperty(prop)) {
               var opt = formatOptionsMeta[prop];

               // Use default value from metadata if it exists and if the field doesn't have a value
               if (opt.defaultValue !== undefined && options[prop] === undefined) {
                  options[prop] = opt.defaultValue;
               }
            }
         }
      }

      return options;
   }

});
