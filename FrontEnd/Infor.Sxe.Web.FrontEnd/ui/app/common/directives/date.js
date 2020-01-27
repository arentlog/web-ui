'use strict';

/**
 * Directive for date fields.
 */
app.directive('date', function date() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {

         // TODO: Clean up!!!
         // This directive is currently unused since we're using a Date converted to handle formatting.
         // If we don't need this directive for something else, remove this.

         //var $input = $(element);
         //var model = attrs.ngModel;
         //
         //if (model) {
         //   var api = $input.data('datepicker');
         //
         //   // Initialize (if not already)
         //   if (!api) {
         //      $input.parent().initialize();
         //      api = $input.data('datepicker');
         //
         //      // Prevent double initialize
         //      $input.addClass('no-init');
         //   }
         //
         //   // Watch for model changes and set control value (which formats by locale)
         //   scope.$watch(model, function (newValue, oldValue) {
         //      if (newValue) {
         //         // Value may be a string or Date
         //         if (typeof newValue === 'string') {
         //            var timeIndex = newValue.indexOf('T');
         //
         //            // Important!!! If value is in ISO/JSON format (yyyy-MM-ddThh:mm:ss), we need to chop off the time part
         //            // (otherwise timezone can cause wrong date to display) and parse into Date object.
         //            // In the context of a date field, time is not relevant.
         //            if (timeIndex >= 0) {
         //               newValue = newValue.substr(0, timeIndex);
         //               newValue = Locale.parseDate(newValue, 'yyyy-MM-dd');
         //            }
         //         }
         //
         //         api.setValue(newValue);
         //      } else {
         //         api.setValue('');
         //      }
         //
         //      // TODO: if needed, we can reformat the underlying model right here
         //      //Utils.setNestedValue(scope, model, serverFormatValue);
         //   });
         //}
      }
   };

});
