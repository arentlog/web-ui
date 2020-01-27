'use strict';

/**
 * Directive for a file input control (i.e. File Upload).
 */
app.directive('fileInput', function fileInput(Utils) {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attrs) {
         var $input = $(element);

         $input.on('change', function (e) {
            var fileList = e.target.files;
            var modelValue;

            // Get selected file (or file list if allowing multiple)
            if (attrs.multiple) {
               modelValue = fileList;
            } else {
               modelValue = fileList && fileList.length > 0 ? fileList[0] : null;
            }

            // Update model
            Utils.setNestedValue(scope, attrs.model, modelValue);

            // Call change event expression (if defined)
            if (attrs.change) {
               scope.$eval(attrs.change);
            }

            // Apply scope since a model has changed (and potentially other things in change event function)
            if (!scope.$$phase) {
               scope.$apply();
            }
         });

         // Watch model and clear the file input value (and soho's text input value) when model gets cleared
         if (attrs.model) {
            scope.$watch(attrs.model, function (value) {
               if (!value || (attrs.multiple && value.length === 0)) {
                  $input.val('');
                  $input.closest('div.field').find('input:text').val('');
               }
            });
         }

         // Readonly - we need to handle this in a custom way since SoHo uses a custom file input control
         var isReadonly = attrs.isReadonly;
         if (isReadonly) {
            scope.$watch(isReadonly, function (value) {
               var fileApi = $input.closest('label').data('fileupload');

               // If the underlying SoHo control hasn't been initialized yet, make changes to the native element
               if (!fileApi) {
                  if (value) {
                     $input.attr('readonly', 'readonly');
                  } else {
                     $input.removeAttr('readonly');
                  }
               } else {
                  if (value) {
                     fileApi.readonly();
                  } else {
                     fileApi.enable();
                  }
               }
            });
         }

         // Disabled - we need to handle this in a custom way since SoHo uses a custom file input control
         var isDisabled = attrs.isDisabled;
         if (isDisabled) {
            scope.$watch(isDisabled, function (value) {
               var fileApi = $input.closest('label').data('fileupload');

               // If the underlying SoHo control hasn't been initialized yet, make changes to the native element
               if (!fileApi) {
                  if (value) {
                     $input.attr('disabled', 'disabled');
                  } else {
                     $input.removeAttr('disabled');
                  }
               } else {
                  if (value) {
                     fileApi.disable();
                  } else {
                     fileApi.enable();
                  }
               }
            });
         }
      }
   };

});
