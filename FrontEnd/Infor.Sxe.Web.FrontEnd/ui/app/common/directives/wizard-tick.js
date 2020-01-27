'use strict';

/**
 * Directive for a single tick in a wizard control.
 */
app.directive('wizardTick', function wizardTick() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $wizardTick = $(element);
         var $wizard = $wizardTick.closest('.wizard');
         var isDisabled = attrs.isDisabled;
         var isCurrent = attrs.isCurrent;

         // Disabled condition (watch the disabled condition for this wizardTick and disable it if true)
         if (isDisabled) {
            scope.$watch(isDisabled, function (value) {
               if (value) {
                  $wizardTick.addClass('is-disabled');
               } else {
                  $wizardTick.removeClass('is-disabled');
               }
            });
         }

         // Current condition (watch the condition for this wizardTick and mark it as current if true)
         if (isCurrent) {
            scope.$watch(isCurrent, function (value) {
               if (value) {
                  var wizardApi = $wizard.data('wizard');

                  // If wizard control already initialized, then use its api to select
                  if (wizardApi) {
                     var index = $wizard.find('.tick').index($wizardTick);

                     // Call 'select' api on the tick (which handles updating of all ticks)
                     wizardApi.select(index);
                  } else {
                     $wizardTick.addClass('current').removeClass('complete');

                     // The current active tick is responsible for setting the state (complete/incomplete) of all other ticks
                     $wizardTick.prevAll().addClass('complete');
                     $wizardTick.nextAll().removeClass('complete');
                  }
               } else {
                  $wizardTick.removeClass('current');
               }
            });
         }
      }
   };

});
