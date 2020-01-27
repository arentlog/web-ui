'use strict';

/**
 * Directive for data formatting of input fields
 */
app.directive('fieldFormat', function fieldFormat(DataFormatService, FieldFormats, Utils) {

   return {
      restrict: 'A',
      require: '?ngModel',
      scope: false,
      link: function (scope, element, attrs, ngModel) {
         var $input = $(element);
         var type = attrs.fieldFormat;
         var formatOptions = attrs.formatOptions ? JSON.parse(attrs.formatOptions) : null;

         // Get existing data-options attribute on the field, or start a fresh object
         var dataOptions = attrs.options ? JSON.parse(attrs.options) : {};

         // Get metadata for this type of field format
         var formatMeta = FieldFormats[type];

         // Add properties from metadata to element
         if (formatMeta) {
            var subFormatObj = getSubFormat(formatMeta.subFormats, attrs.subFormat);
            formatOptions = getFormatOptions(formatMeta.formatOptions, formatOptions);

            // TODO: ap - Figure out if better way to tell input fields to not include % symbol (since SoHo
            // already shows it on top of input box)
            if (type === 'PERCENT') {
               if (!formatOptions) {
                  formatOptions = {};
               }
               formatOptions.hideSymbol = true;
            }

            // Add mask (unless field already has one or field is statically readonly)
            if ((formatMeta.mask || formatMeta.numericMask) && attrs.mask === undefined && attrs.ngReadonly !== '::true') {

               // Add mask attribute (Soho looks for this blank attr to initialize the mask)
               $input.attr('data-mask', '');

               // Add normal mask pattern, or generated numeric pattern
               if (formatMeta.mask) {
                  dataOptions.pattern = formatMeta.mask;
               } else if (formatMeta.numericMask) {
                  var maskPattern = DataFormatService.getNumericMask(attrs.sign, attrs.digits, attrs.decimals);

                  if (maskPattern) {
                     dataOptions.pattern = maskPattern;
                  } else {
                     // The field is misconfigured (digits is missing). Remove data-mask (otherwise Soho allows no input).
                     $input.removeAttr('data-mask');

                     // Log an error to help the developer
                     console.error('Error: The "Digits" property is not specified for this numeric field: ', $input[0]);
                  }
               }
            }

            // Add mask mode (unless field already has one)
            if (formatMeta.maskMode && dataOptions.mode === undefined) {
               dataOptions.mode = formatMeta.maskMode;
            }

            // Add group complete flag (unless field already has one)
            if (formatMeta.groupComplete && dataOptions.groupComplete === undefined) {
               dataOptions.groupComplete = formatMeta.groupComplete;
            }

            // Add must complete flag (unless field already has one)
            if (formatMeta.mustComplete && dataOptions.mustComplete === undefined) {
               dataOptions.mustComplete = formatMeta.mustComplete;
            }

            // Add show symbol (unless field already has one)
            if (formatMeta.showSymbol && dataOptions.showSymbol === undefined) {
               dataOptions.showSymbol = formatMeta.showSymbol;
            }

            // Put options attribute on the field (if has any options)
            if (Object.keys(dataOptions).length) {
               $input.attr('data-options', JSON.stringify(dataOptions));
            }

            // Append validate type to attribute (since may have 'required'), or add new
            if (formatMeta.validate) {
               if (attrs.validate) {
                  $input.attr('data-validate', attrs.validate + ' ' + formatMeta.validate);
               } else {
                  $input.attr('data-validate', formatMeta.validate);
               }
            }

            // Append validation events to attribute (since may have others), or add new
            if (formatMeta.validationEvents) {
               if (attrs.validationEvents) {
                  var combinedEvents = Utils.extend(JSON.parse(formatMeta.validationEvents), JSON.parse(attrs.validationEvents));
                  $input.attr('data-validation-events', JSON.stringify(combinedEvents));
               } else {
                  $input.attr('data-validation-events', formatMeta.validationEvents);
               }
            }

            // Add css align class
            if (formatMeta.align) {
               $input.addClass('align-' + formatMeta.align);
            }

            // Add ngModel formatter
            if (ngModel && formatMeta.formatter) {
               ngModel.$formatters.push(function (value) {
                  return formatMeta.formatter(value, subFormatObj, formatOptions);
               });

               // We also need to apply formatting after the user changes a value
               // Note:
               //   - ngModel provides the parsed $modelValue for us, we just need to pass it through the formatter
               //   - Only needed for text inputs
               if (attrs.type === 'text') {
                  var hasUpdateOn = attrs.ngModelOptions && JSON.parse(attrs.ngModelOptions).updateOn ? true : false;

                  $input.on('change', function () {
                     var isFromPicker = false;

                     // Determine if change if from the date/time picker popup, as opposed to user typing into field.
                     // Soho puts is-active class on when picker is open.
                     if ($input.is('.datepicker, .timepicker') && $input.is('.is-active')) {
                        isFromPicker = true;
                     }

                     // If the change is from the datepicker/timepicker control selection, and the field has updateOn defined (blur),
                     // then manually blur and refocus so that angular updates the model properly (slight delay to avoid jQuery error).
                     if (isFromPicker && hasUpdateOn) {
                        setTimeout(function () {
                           $input.blur().focus();
                        }, 1);
                     }

                     // Avoid reformatting if the change is from the datepicker/timepicker control selection since (Soho already applies proper formatting).
                     // Note: If the field was set to updateOn blur there was an issue where the $modelValue is old,
                     //       and it resulted in wrong data when re-formatting.
                     if (isFromPicker) {
                        return;
                     }

                     // Apply the format
                     // Note: Need to delay until after the updateOn debounce delay so have the current model value,
                     //       5 ms was sometimes too short in IE11, so changed to 10 ms
                     setTimeout(function () {
                        $input.val(formatMeta.formatter(ngModel.$modelValue, subFormatObj, formatOptions));
                     }, 10);
                  });
               }
            }

            // Add ngModel parser
            if (ngModel && formatMeta.parser) {
               ngModel.$parsers.push(function (value) {
                  return formatMeta.parser(value, subFormatObj, formatOptions);
               });
            }
         }
      }
   };


   // Private methods

   /**
    * Get specified sub format object from format's subFormat list
    */
   function getSubFormat(subFormatList, subFormat) {
      if (subFormatList && subFormat) {
         var length = subFormatList.length;

         for (var i = 0; i < length; i++) {
            if (subFormatList[i].key === subFormat) {
               return subFormatList[i];
            }
         }
      }

      return undefined;
   }

   /**
    * Get format options specified on field, as well as any default values from metadata
    */
   function getFormatOptions(formatOptionsMeta, formatOptions) {
      var options;

      if (formatOptionsMeta) {
         options = formatOptions || {};

         for (var prop in formatOptionsMeta) {
            if (formatOptionsMeta.hasOwnProperty(prop)) {
               var opt = formatOptionsMeta[prop];

               // Use default value from metadata if it exists and if the field doesn't have a value
               if (opt.defaultValue !== undefined && options[prop] === undefined) {
                  options[prop] = opt.defaultValue;
               }
            }
         }
      }

      return options;
   }

});
