'use strict';

/**
 * Directive for a chart control.
 */
app.directive('chart', function chart() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var chartOptions = attrs.chartOptions;
         var type = attrs.type;

         // Watch options and use them to initialize chart
         if (chartOptions) {
            scope.$watch(chartOptions, function (options) {
               var chart = $element.data('chart');

               // Create chart with options
               if (options) {
                  // Auto populate the chart type (so type selected in wysiwyg is always used)
                  options.type = type;
                  $element.chart(options);
               }

               // Destroy an existing chart if the options becomes null
               if (chart && !options) {
                  // SoHo doesn't have a destroy method, so do it manually
                  $.removeData($element[0], 'chart');
                  $element.empty();
               }
            });
         }
      }
   };

});
