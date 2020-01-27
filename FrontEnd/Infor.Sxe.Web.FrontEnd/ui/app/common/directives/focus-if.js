'use strict';

/**
 * Directive for conditionally giving focus to an element (usually form fields)
 */
app.directive('focusIf', function focusIf() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);

         // Watch the focus expression and apply focus if truthy
         scope.$watch(attrs.focusIf, function (value) {

            if (value) {
               // Delay slightly before setting focus since field may be becoming visible in same angular digest
               // and HTML doesn't allow focus on hidden elements
               setTimeout(function () {
                  // Drop downs and radios have a special way to focus them
                  if ($element.is('.dropdown')) {
                     var dropDown = $element.data('dropdown');

                     if (dropDown) {
                        dropDown.pseudoElem.focus();
                     } else {
                        $element.focus();
                     }
                  } else if ($element.is('.radio-group')) {
                     $element.find('input:radio:first').focus();
                  } else {
                     $element.focus();
                  }
               }, 100);
            }
         });
      }
   };

});
