'use strict';

/**
 * Directive for resetting the parent form when this element is clicked
 */
app.directive('resetForm', function resetForm() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element) {
         var $element = $(element);

         // When the element is clicked grab the form control in the scope hierarchy to call its api
         $element.on('click', function () {
            var formControl = scope.formControl;

            if (formControl) {
               // Delay the reset because Soho has a 300ms delay on their blur validation. There was an issue where
               // going from a required field to clicking a reset button was causing the reset to happen before the
               // error would show on the field. This caused the error to remain instead of be cleared.
               setTimeout(function () {
                  formControl.resetForm();
               }, 300);
            } else {
               // If can't find the containing form, log an error to help developers
               console.error('Error: Could not find the form control. Please verify that this is inside of a form.');
            }
         });
      }
   };

});