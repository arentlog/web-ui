'use strict';

/**
 * Directive for individual radio options (<input type="radio" />)
 */
app.directive('radioOption', function radioOption() {

   return {
      restrict: 'A',
      require: '?ngModel',
      scope: false,
      link: function (scope, element, attrs, ngModel) {
         if (ngModel) {
            // In order to achieve case-IN-sensitivity with radio option values,
            // we need to trick all radio option models to act like they are lowercase values
            // Note: the values of available radio options are tricked to act like they are lowercase via ng-value="opt.value | lowercase"
            ngModel.$formatters.push(function (value) {
               if (typeof value === 'string') {
                  return value.toLowerCase();
               } else {
                  return value;
               }
            });

            // When user selects a radio option (that has a string value), we need to apply the actual value
            // to the model (not the lowercase version of the value)
            ngModel.$parsers.push(function (value) {
               if (typeof value === 'string') {
                  // All radio options maintain their actual value in the 'data-actual-value' attr via interpolation
                  return attrs.actualValue;
               } else {
                  return value;
               }
            });
         }
      }
   };

});
