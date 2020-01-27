'use strict';

/**
 * Directive for API of a Form control and automatic form validation handling.
 */
app.directive('formControl', function formControl($timeout, Constants, MessageService, Utils) {

   return {
      restrict: 'A',
      scope: true, // Needed for controller
      controllerAs: 'formControl', // We are using the directive's controller as the Form control
      controller: function ($scope) {
         var self = this;

         // The html form element (jQuery wrapped)
         self.element = null;

         // API to clear out errors and dirty indicators from the form
         // Note: This code is copied from Soho's resetForm function, but we don't perform the html form reset because
         //       that would clear out the field values and them to be out of sync with the angular-bound data!
         self.resetForm = function () {
            var formFields = self.element.find('input, select, textarea');

            // Clear Errors
            formFields.removeClass('error');
            self.element.find('.error').removeClass('error');
            self.element.find('.icon-error').remove();
            self.element.find('.icon-confirm').remove();
            self.element.find('.error-message').remove();

            setTimeout(function () {
               $('#validation-errors').addClass('is-hidden');
            }, 300);

            // Remove Dirty
            formFields.data('isDirty', false).removeClass('isDirty');
            self.element.find('.isDirty').removeClass('isDirty');
         };

         // API to manually validate the form
         self.validateForm = function (callback, suppressErrorMessage) {
            var validator = self.element.data('validate');

            // Call Soho form validation
            validator.validateForm(function (isValid) {

               // Show standard error summary message if validation fails (unless suppress is requested)
               if (!isValid && !suppressErrorMessage) {
                  self.showErrorSummary();
               }

               callback(isValid);
            });
         };

         // Invoke the validation success event tied to this form's submit button
         self.callValidationSuccessEvent = function () {
            var focusedElement = $(document.activeElement);
            var submitButton;

            // Get the submit button that was clicked (since form may have more than one submit button)
            if (focusedElement.is(':submit')) {
               submitButton = focusedElement;
            } else {
               // Otherwise (enter key used), get the first visible submit button
               submitButton = self.element.find(':submit:visible').first();

               // If none visible, just use the first
               if (!submitButton.length) {
                  submitButton = self.element.find(':submit').first();
               }
            }

            // Get the validated callback function from the submit button
            var onValidated = submitButton.attr('data-on-validated');

            // If an input element is still focused (i.e. enter key was pressed to submit form),
            // we need to blur and refocus before proceeding to ensure the change for that field is applied.
            if (focusedElement.is('input')) {
               focusedElement.blur().focus();
            }

            // Evaluate the expression and apply scope (delaying slightly to pick up change event on blur)
            if (onValidated) {
               $timeout(function () {
                  $scope.$eval(onValidated);
               }, 10);
            } else {
               console.log('Error: No validation success function. You need to define a "Form Validation Success" event.');
            }
         };

         // Show popup message with a summary of all errors currently in the form
         self.showErrorSummary = function () {
            var message = MessageService.get('global.validation.error.message') + '<br/>';

            // Find all fields in form that currently have an error
            self.element.find('input.error, .dropdown.error, textarea.error').each(function () {
               var label = $(this).closest('div.field').find('label').html();
               var fieldError = $(this).data('data-errormessage');

               // Some fields have hidden audible instructions (in a span tag) that we don't want to include
               if (label && label.indexOf('<') > 0) {
                  label = label.substr(0, label.indexOf('<'));
               }

               // Some fields get duplicate error messages when validating twice so reduce to the text before <br>
               if (fieldError && fieldError.indexOf('<') > 0) {
                  fieldError = fieldError.substr(0, fieldError.indexOf('<'));
               }

               message += '<br/>' + label + ' - ' + fieldError;
            });

            // Show errors to user
            MessageService.error('global.validation.error', message);
         };
      },
      link: function (scope, element, attrs, ctrl) {
         var $element = element;
         var controlRef = attrs.controlRef;
         var onReady = attrs.onReady;
         var disabled = false;

         // Add element to ctrl
         ctrl.element = $element;

         // Set up form validation & submission handler
         $element.on('validated', function (e, isValid) {

            // Prevent double clicks from performing duplicate form submit actions (see our ng-click decorator in app.js for more details)
            if (disabled) {
               return;
            }

            // Disable subsequent submissions for a short amount of time (in case user clicks multiple times)
            disabled = true;
            setTimeout(function () { disabled = false; }, Constants.DOUBLE_CLICK_PREVENTION_DELAY);

            // Proceed with success event or validation errors
            if (isValid) {
               ctrl.callValidationSuccessEvent();
            } else {
               ctrl.showErrorSummary();
            }
         });

         // After the parent view has been initialized the Soho control api will be available
         $element.closest('[initialize]').on('initialized', function () {

            // Set control somewhere within scope, if requested
            if (controlRef) {
               Utils.setNestedValue(scope, controlRef, ctrl);
            }

            // Notify that control is ready, if requested
            if (onReady) {
               // Remove invoke parenthesis if present since we simply want to get the reference to the function
               onReady = onReady.replace('()', '');

               // Get function from scope
               var fn = Utils.getNestedValue(scope, onReady);

               // Call function and pass control
               if (fn) {
                  fn(ctrl);

                  // Apply scope (if not already being applied)
                  if (!scope.$$phase) {
                     scope.$apply();
                  }
               }
            }
         });
      }
   };

});
