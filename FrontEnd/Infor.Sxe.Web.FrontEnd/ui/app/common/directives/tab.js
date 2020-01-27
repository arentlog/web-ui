'use strict';

/**
 * Directive for tab control (single tab 'li' element).
 */
app.directive('tab', function tab() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $tab = $(element);
         var selectedIf = attrs.selectedIf;
         var showIf = attrs.showIf;

         // Selected condition (watch the condition for this tab and select it if evaluates to true)
         if (selectedIf) {
            scope.$watch(selectedIf, function (value) {
               var tabsControl = $tab.closest('.tab-container').data('tabs');

               // If the underlying SoHo control hasn't been initialized yet, make changes to the element's html
               if (!tabsControl) {
                  if (value) {
                     $tab.addClass('is-selected');
                  }
               } else {
                  if (value) {
                     var tabId = $tab.find('a').attr('href');
                     tabsControl.select(tabId);
                  }
               }
            });
         }

         // Show/Visible condition (watch the condition for this tab and show it if evaluates to true, otherwise hide it)
         if (showIf) {
            scope.$watch(showIf, function (value) {
               var tabsControl = $tab.closest('.tab-container').data('tabs');

               // If the underlying SoHo control hasn't been initialized yet, make changes to the element's html
               if (!tabsControl) {
                  if (value) {
                     $tab.removeClass('hidden');
                  } else {
                     $tab.addClass('hidden');
                  }
               } else {
                  var tabId = $tab.find('a').attr('href').replace('#', '');

                  // Call SoHo api show/hide method
                  if (value) {
                     tabsControl.show(tabId);
                  } else {
                     tabsControl.hide(tabId);
                  }
               }
            });
         }
      }
   };

});
