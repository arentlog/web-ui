'use strict';

/**
 * Directive for drop down fields.
 */
app.directive('dropdown', function dropdown($timeout, Utils) {

   return {
      restrict: 'A',
      require: '?ngModel',
      scope: false,
      link: function (scope, element, attrs, ngModel) {
         var $select = $(element);

         // All drop downs from json views set the 'data-case-insensitive' flag, but other html drop downs might not
         if (ngModel && attrs.caseInsensitive !== undefined) {
            // In order to achieve case-IN-sensitivity with drop down option values,
            // we need to trick all drop down models to act like they are lowercase values
            // Note: the values of available options are tricked to act like they are lowercase via the lowercase filter in the ng-options expression
            ngModel.$formatters.push(function (value) {
               if (!attrs.multiple) {
                  return safelyToLowerCase(value);
               } else {
                  // Multi Select controls are an array of strings
                  if (value) {
                     var lowercaseArray = [];

                     // Create a matching array with strings converted to lowercase
                     for (var i = 0; i < value.length; i++) {
                        lowercaseArray.push(safelyToLowerCase(value[i]));
                     }

                     return lowercaseArray;
                  } else {
                     return value;
                  }
               }
            });

            // When user selects a drop down option (that has a string value), we need to apply the actual value
            // to the model (not the lowercase version of the value)
            ngModel.$parsers.push(function (value) {
               var optionsModelList = null;

               // Get the options model list from scope (no options model means it's an inline drop down)
               if (attrs.optionsModel) {
                  optionsModelList = Utils.getNestedValue(scope, attrs.optionsModel);
               }

               if (!attrs.multiple) {
                  return getActualValue(value, optionsModelList, attrs.optionsValueField, $select);
               } else {
                  // Multi Select controls are an array of strings
                  if (value) {
                     var actualArray = [];

                     // Create a matching array with strings converted to their actual values
                     // Note: Trying to manipulate the 'value' array passed by Angular causes the control to not work
                     for (var i = 0; i < value.length; i++) {
                        var actualValue = getActualValue(value[i], optionsModelList, attrs.optionsValueField, $select);

                        actualArray.push(actualValue);
                     }

                     return actualArray;
                  } else {
                     return value;
                  }
               }
            });
         }

         // Watch for model changes and tell SoHo to set control value
         if (attrs.ngModel) {
            var modelExpr = attrs.ngModel;

            // If a getterSetter model, need to watch the result of the getter function
            if (attrs.ngModelOptions && JSON.parse(attrs.ngModelOptions).getterSetter) {
               modelExpr += '()';
            }

            var setValueFn = function() {
               var dropDown = $select.data('dropdown');

               // If drop-down is already initialized, tell SoHo to set control value (delay until scope has applied).
               if (dropDown) {
                  $timeout(function () {
                     dropDown.setValue();
                  });
               }
            };

            // Watch collection (for multiple) or property
            if (attrs.multiple) {
               scope.$watchCollection(modelExpr, setValueFn);
            } else {
               scope.$watch(modelExpr, setValueFn);
            }
         }

         // Custom drop down options are set dynamically, so we need to watch the options model and notify SoHo of updates
         if (attrs.watchOptionsModel !== undefined) {
            scope.$watchCollection(attrs.optionsModel, function (optionList) {
               // No need to update if options model is not yet defined
               if (optionList !== undefined) {
                  // Soho has different logic for updating a multiselect, so need to invoke the right 'updated' api
                  var controlApi = attrs.multiple ? $select.data('multiselect') : $select.data('dropdown');

                  // If drop-down is already initialized, then we need to tell it to update the list and the display value
                  // now that we have a new option list (and delay until scope has applied).
                  if (controlApi) {
                     $timeout(function () {
                        controlApi.updated();
                     });
                  }
               }
            });
         }

         // If dynamic label expression, need to watch it and manually update the label in the specialized SoHo dropdown
         if (attrs.labelExpression) {
            scope.$watch(attrs.labelExpression, function (value) {
               var dropdown = $select.data('dropdown');

               // If SoHo control already initialized, need to insert the new label
               if (dropdown) {
                  dropdown.label.text(value);
               }
            });
         }

         // Readonly - we need to handle this in a custom way since SoHo uses a custom drop down control
         var isReadonly = attrs.isReadonly;
         if (isReadonly) {
            scope.$watch(isReadonly, function (value) {
               var dropDown = $select.data('dropdown');

               // If the underlying SoHo control hasn't been initialized yet, make changes to the native select
               if (!dropDown) {
                  if (value) {
                     $select.attr('readonly', 'readonly');
                     $select.prop('readonly', true);
                  } else {
                     $select.removeAttr('readonly');
                     $select.prop('readonly', false);
                  }
               } else {
                  if (value) {
                     // The SoHo 'readonly' function can conflict with disabled conditions that may be on the dropdown,
                     // so when making readonly, we update things manually
                     $select.attr('readonly', 'readonly');
                     $select.prop('readonly', true);
                     dropDown.pseudoElem.addClass('is-readonly').prop('readonly', true);
                     dropDown.closeList();
                  } else {
                     // The SoHo 'enable' function can conflict with disabled conditions that may be on the dropdown,
                     // so when making non-readonly, we update things manually
                     $select.removeAttr('readonly');
                     $select.prop('readonly', false);
                     dropDown.pseudoElem.removeClass('is-readonly').prop('readonly', false);
                  }
               }
            });
         }

         // Disabled - we need to handle this in a custom way since SoHo uses a custom drop down control
         var isDisabled = attrs.isDisabled;
         if (isDisabled) {
            scope.$watch(isDisabled, function (value) {
               var dropDown = $select.data('dropdown');

               // If the underlying SoHo control hasn't been initialized yet, make changes to the native select
               if (!dropDown) {
                  if (value) {
                     $select.attr('disabled', 'disabled');
                     $select.prop('disabled', true);
                  } else {
                     $select.removeAttr('disabled');
                     $select.prop('disabled', false);
                  }
               } else {
                  if (value) {
                     // The SoHo 'disable' function can conflict with readonly conditions that may be on the dropdown,
                     // so when making disabled, we update things manually
                     $select.attr('disabled', 'disabled');
                     $select.prop('disabled', true);
                     dropDown.pseudoElem.addClass('is-disabled').prop('disabled', true);
                     dropDown.closeList();
                  } else {
                     // The SoHo 'enable' function can conflict with read-only conditions that may be on the dropdown,
                     // so when making non-disabled, we update things manually
                     $select.removeAttr('disabled');
                     $select.prop('disabled', false);
                     dropDown.pseudoElem.removeClass('is-disabled').prop('disabled', false);
                  }
               }
            });
         }
      }
   };

   // Private methods

   function safelyToLowerCase(value) {
      if (value && typeof value === 'string') {
         return value.toLowerCase();
      } else {
         return value;
      }
   }

   function getActualValue(value, optionsModelList, valueField, $select) {
      if (value && typeof value === 'string') {
         var actualValue;

         // Find the actual string value from the options list and use it for the underlying data
         if (optionsModelList) {
            for (var i = 0; i < optionsModelList.length; i++) {
               actualValue = Utils.getNestedValue(optionsModelList[i], valueField);

               if (value === actualValue.toLowerCase()) {
                  return actualValue;
               }
            }
         } else {
            // No options model means it's an 'inline' drop down

            // Grab the actual value from the option attr and use it (unless it's not defined)
            actualValue = $select.find('option[value="' + value.replace(/"/g, '\\"') + '"]').attr('data-actual-value');

            if (actualValue !== undefined) {
               return actualValue;
            } else {
               return value;
            }
         }

         return value;
      } else {
         return value;
      }
   }

});
