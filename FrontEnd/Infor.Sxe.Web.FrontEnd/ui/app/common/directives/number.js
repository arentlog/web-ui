'use strict';

/**
 * Directive for converting user input into number type.
 */
app.directive('number', function number() {

   return {
      restrict: 'A',
      require: 'ngModel',
      scope: false,
      link: function (scope, element, attrs, ngModel) {

         // When input changes, convert the string input into a number (either integer or decimal)
         ngModel.$parsers.push(function (val) {
            if (val) {
               return parseFloat(val);
            } else {
               return null;
            }
         });
      }
   };

});
