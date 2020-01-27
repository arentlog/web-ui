'use strict';

/**
 * Directive for dynamically binding and updating a tooltip (html "title" attribute)
 */
app.directive('tooltip', function focusIf() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);

         // Watch the title expression and apply any changes
         scope.$watch(attrs.tooltip, function (newValue, oldValue) {
            var tooltipApi = $element.data('tooltip');
            if (newValue) {
               $element.attr('title', newValue);
               if (tooltipApi) {
                  tooltipApi.destroy();
               }
               $element.tooltip();
            } else if (newValue !== oldValue) {
               $element.removeAttr('title');
               if (tooltipApi) {
                  tooltipApi.destroy();
               }
            }
         });
      }
   };

});