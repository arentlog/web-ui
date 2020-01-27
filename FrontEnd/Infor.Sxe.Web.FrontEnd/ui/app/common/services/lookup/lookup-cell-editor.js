'use strict';

/**
 * Our customized version of SoHo's grid cell Lookup editor.
 * We need a slightly different implementation because our lookups are based on an angular directive.
 *
 * Note: This editor function should stay current with SoHo's version.
 *       Our changes are highlighted by "SX.E MODIFICATION..."
 */
app.factory('LookupCellEditor', function LookupCellEditor($compile, Utils) {

   return function (row, cell, value, container, column, event, grid, item) {
      this.name = 'lookup';
      this.originalValue = value;

      this.init = function () {
         // --- SX.E MODIFICATION BEGINS ---
         var directiveInfo = ' lookup="' + column.meta + '" data-lookup-options=\'' + serialize(column.options, false) + '\''
            + ' data-model="' + column.field + '" data-on-change="' + (column.cellchange || '') + '"'
            + ' data-is-grid-cell data-parent-grid-row="' + row + '" data-parent-grid-cell="' + cell + '"';

         // Add format info
         var formatInfo = '';
         if (column.dataFormat) {
            formatInfo += ' field-format="' + column.dataFormat + '" ';
            formatInfo += column.subFormat ? ' data-sub-format="' + column.subFormat + '" ' : '';
            formatInfo += column.sign ? ' data-sign="' + column.sign + '" ' : '';
            formatInfo += column.digits ? ' data-digits="' + column.digits + '" ' : '';
            formatInfo += column.decimals ? ' data-decimals="' + column.decimals + '" ' : '';
            formatInfo += column.formatOptions ? ' data-format-options=\'' + serialize(column.formatOptions, false) + '\' ' : '';
         }

         this.input = $('<input class="lookup" data-init="false" ' + directiveInfo + formatInfo + ' />').appendTo(container);

         // Compile the element to activate angular directive
         $compile(this.input)(this.input.scope().$new());
         // --- SX.E MODIFICATION ENDS ---

         if (column.maxLength) {
            this.input.attr('maxlength', column.maxLength);
         }
      };

      this.val = function (value) {
         // --- SX.E MODIFICATION BEGINS: the value of our lookups is the model value, not what's in the input ---
         return value !== undefined ? this.input.val(value) : Utils.getNestedValue(item, column.field);
         // --- SX.E MODIFICATION ENDS ---
      };

      this.focus = function () {
         var self = this,
            api = self.input.data('lookup'),
            td = self.input.closest('td');

         // Using keyboard
         if (event.type === 'keydown') {
            self.input.select().focus();
            td.on('keydown.editorlookup', function (e) {
               if (e.keyCode === 40 && grid.quickEditMode) {
                  e.preventDefault();
                  e.stopPropagation();
               }
            });
         }

         //Check if isClick or cell touch and just open the list
         if (event.type === 'click') {
            if ($(event.target).is('svg')) {
               api.openDialog(event);
            } else {
               self.input.select().focus();
               td.on('touchcancel.editorlookup touchend.editorlookup', '.trigger', function() {
                  api.openDialog();
               });
            }
         }

         // Update on change from lookup
         self.input.on('change', function () {
            setTimeout(function () {
               container.parent().focus();
               grid.setNextActiveCell(event);
               grid.quickEditMode = false;
            }, 1);
         });

      };

      this.destroy = function () {
         var self = this,
            td = this.input.closest('td');

         // --- SX.E MODIFICATION BEGINS: destroy the new scope that was created for the input ---
         if (this.input.scope()) {
           this.input.scope().$destroy();
         }
         // --- SX.E MODIFICATION ENDS ---

         setTimeout(function() {
            td.off('keydown.editorlookup')
               .find('.trigger').off('touchcancel.editorlookup touchend.editorlookup');
            self.input.remove();
         }, 0);
      };

      this.init();
   };

   /**
    * Serialize the object into JSON that is safe for use in an HTML attribute
    * (assuming single quotes will be used for the attribute since JSON has double quotes).
    */
   function serialize(object, replaceCurlyBraces) {
      if (object) {
         // Stringify and then escape all single quotes
         // (and conditionally escape expression binding braces so that Angular won't try to evaluate them)
         if (replaceCurlyBraces) {
            return JSON.stringify(object).replace(/'/g, '&#39;').replace(/{{/g, '{|').replace(/}}/g, '|}');
         } else {
            return JSON.stringify(object).replace(/'/g, '&#39;');
         }
      } else {
         return '';
      }
   }

});
