'use strict';

/**
 * Directive for utilizing SoHo's "onTouchClick" handler instead of simply ng-click. This is required for having
 * click events on Accordion controls (otherwise the events won't fire on mobile devices). See SOHO-5360.
 */
app.directive('sohoClick', function sohoClick() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);

         // Set up Soho's touch/click handler, and when it fires evaluate the Angular expression and apply scope
         $element.onTouchClick().on('click', function () {
            if (!scope.$$phase) {
               scope.$apply(attrs.sohoClick);
            } else {
               scope.$eval(attrs.sohoClick);
            }
         });
      }
   };

});
