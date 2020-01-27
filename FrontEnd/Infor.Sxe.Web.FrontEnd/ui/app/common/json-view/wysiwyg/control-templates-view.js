'use strict';

/**
 * Directive for control templates view.
 */
app.directive('controlTemplates', function controlTemplates($compile, ControlTemplatesMeta, JsonViewConverter) {

   return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var html = '';

         // Instantiate a new converter
         var converter = new JsonViewConverter(null, 'dev');

         // Build HTML of each control as a sample
         for (var prop in ControlTemplatesMeta) {
            if (ControlTemplatesMeta.hasOwnProperty(prop)) {
               html += converter.buildControl(ControlTemplatesMeta[prop]);
            }
         }

         // Add controls to view
         var compiledHTML = $compile(html)(scope.$new());
         $element.html(compiledHTML).initialize();

         // Enable dragging (on all elements that have a control id)
         $element.find('[data-control-id]').each(function () {
            $(this).attr('draggable', 'true');
            $(this).attr('ondragover', 'event.preventDefault()');
            $(this).addClass('draggable');
         });

         // Add drag listener to pass data to drop
         $element.get(0).addEventListener('dragstart', function (ev) {
            var transferData = {
               fromTemplate: true,
               dragControlId: $(ev.target).attr('data-control-id')
            };
            ev.dataTransfer.setData('text', JSON.stringify(transferData));
         });
      }
   };

});
