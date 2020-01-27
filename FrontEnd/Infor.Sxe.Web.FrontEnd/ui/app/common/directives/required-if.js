'use strict';

/**
 * Directive for conditionally making a form field to be required
 */
app.directive('requiredIf', function requiredIf() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);

         // Watch the required expression and update the required properties accordingly
         scope.$watch(attrs.requiredIf, function (newValue, oldValue) {
            var dataValidate = $element.attr('data-validate');

            if (newValue) {
               // Add 'required' class to label (drop downs have 2 labels...this will update both of them)
               $element.closest('.field').find('label').addClass('required');

               // Add 'required' to data-validate
               if (!dataValidate) {
                  $element.attr('data-validate', 'required');
               } else if (dataValidate.indexOf('required') < 0) {
                  $element.attr('data-validate', dataValidate + ' required');
               }
            } else if (newValue !== oldValue) {
               // Remove 'required' class from label (drop downs have 2 labels...this will update both of them)
               $element.closest('.field').find('label').removeClass('required');

               // Remove 'required' from data-validate
               if (dataValidate) {
                  $element.attr('data-validate', dataValidate.replace('required', ''));
               }

               // Need to call SoHo's removeError when a field becomes unrequired so that old errors on the field
               // aren't hanging around for the logic in form.js
               $element.removeError();
            }
         });
      }
   };

});
