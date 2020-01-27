'use strict';

/**
 * Directive for displaying format options fields in wysiwyg.
 */
app.directive('formatOptions', function formatOptions($compile) {

   return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);

         // Watch reference to format meta options and render fields accordingly
         scope.$watch(attrs.optionsList, function (formatOptionsMeta) {
            if (formatOptionsMeta) {
               var html = '<div class="compound-field">';

               for (var key in formatOptionsMeta) {
                  if (formatOptionsMeta.hasOwnProperty(key)) {
                     var opt = formatOptionsMeta[key];
                     var fieldType = opt.type;
                     var model = 'activeControl.formatOptions.' + key;

                     // Skip ones without a field type (may exist for default value only)
                     if (!fieldType) {
                        continue;
                     }

                     // Number directive (to convert input from string to number)
                     var numberDirective = fieldType === 'number' ? ' number ' : '';

                     // i18n Autocomplete directive
                     var i18nAutocomplete = opt.i18n ? ' i18n-autocomplete ' : '';

                     // Size class
                     var sizeClass = opt.size ? 'input-' + opt.size : '';

                     // Placeholder (for visual distinction between empty string and undefined value)
                     var placeHolder = ' placeholder="{{' + model + ' === \'\' ? \'empty string\' : \'\'}}" ';

                     html += '<div class="field" title="' + (opt.tooltip || '') + '">';
                     if (fieldType === 'checkbox') {
                        html += '<input type="checkbox" id="control-format-option-' + key + '" class="checkbox" ng-model="' + model + '" ng-change="formatOptionChanged(\'' + key + '\')" />';
                        html += '<label for="control-format-option-' + key + '" class="checkbox-label" style="margin-top: 3px;">' + opt.label + '</label>';
                     } else {
                        html += '<label for="control-format-option-' + key + '">' + opt.label + '</label>';
                        html += '<input type="text" id="control-format-option-' + key + '" class="' + sizeClass + '" ng-model="' + model + '" ng-change="formatOptionChanged(\'' + key + '\')" ' + numberDirective + i18nAutocomplete + placeHolder + ' />';
                     }
                     html += '</div>';
                  }
               }

               html += '</div>';

               // Add fields to view
               var compiledHTML = $compile(html)(scope.$new());
               $element.html(compiledHTML).initialize();
            } else {
               $element.html('');
            }
         });
      }
   };

});
