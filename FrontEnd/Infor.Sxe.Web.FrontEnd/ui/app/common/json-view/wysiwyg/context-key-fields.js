'use strict';

/**
 * Directive for displaying context key fields in wysiwyg.
 */
app.directive('contextKeyFields', function contextKeyFields($compile) {

   return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var isHiddenContextField = scope.activeControl.type === 'CONTEXT_FIELD';

         // Watch reference to ContextEntity key fields and render fields accordingly
         scope.$watch(attrs.fieldList, function (keyFields) {
            var i, field, model, placeholder, tooltip, html = '';

            // Clear when empty
            if (!keyFields || keyFields.length === 0) {
               $element.html('');
               return;
            }

            for (i = 0; i < keyFields.length; i++) {
               field = keyFields[i];
               model = 'activeControl.contextValues.key' + (i + 1);
               placeholder = i === 0 && !isHiddenContextField ? 'Only use if different than data model' : '';
               tooltip = field.tooltip ? ' title="' + field.tooltip + '" ' : '';

               html += '<div class="field" ' + tooltip + '>';
               html += '<label class="inline">';
               html += '<span class="label-text">' + field.label + '</span>';
               html += '<input type="text" ng-model="' + model + '" placeholder="' + placeholder + '" />';
               html += '</label>';
               html += '</div>';
            }

            // Add fields to view
            var compiledHTML = $compile(html)(scope.$new());
            $element.html(compiledHTML).initialize();
         });
      }
   };

});
