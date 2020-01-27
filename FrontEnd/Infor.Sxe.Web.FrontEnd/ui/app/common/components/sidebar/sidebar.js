'use strict';

/**
 * Directive for sidebar that contains the accordion of widgets in our layouts.
 */
app.directive('sidebar', function sidebar() {

   return {
      restrict: 'A',
      scope: true, // Needed for controller
      controllerAs: 'sidebar',
      controller: function ($scope, $element, TabService, Widgets) {
         var self = this;

         // Widget meta list bound to view
         self.widgets = [];

         // Get widgets to include for this tab from the base state's data (can't rely on $state.current since timing issues)
         var baseState = TabService.getBaseState($scope);
         var widgets = baseState.data ? baseState.data.widgets : null;

         // Prepare included widgets for view
         if (widgets) {
            for (var i = 0; i < widgets.length; i++) {
               var widget = widgets[i];

               // Get widget from shared meta
               if (typeof widget === 'string') {
                  self.widgets.push(Widgets[widget]);
               } else {
                  // Use custom passed-in widget as-is
                  self.widgets.push(widget);
               }
            }
         }

         // Initialize the accordion with a longer delay than normal. We don't use the initialize directive on the
         // sidebar because of double initialize problems and because a longer delay is needed for widgets to process.
         setTimeout(function () {
            var $accordion = $element.find('.accordion:first');
            var options = $.fn.parseOptions($accordion);
            $accordion.accordion(options);
         }, 10);
      }
   };

});