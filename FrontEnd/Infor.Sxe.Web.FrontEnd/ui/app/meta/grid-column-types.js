'use strict';

/**
 * Definitions of all our grid column types.
 *    - This defines what kind of control (lookup, date picker, text area, standard text, etc.) should be in a grid cell.
 *    - To define how the cell data should be formatted and provide additional settings, we use the grid-column-formats.js list.
 *    - The Column Type formatter usually wraps the Column Format formatter (via the 'wrapsFormat' option). Otherwise it is replaced.
 */
app.factory('GridColumnTypes', function GridColumnTypes(LookupCellEditor) {

   // Note: This list is generally the basic SoHo column types (formatter and editor). Additional properties are
   // added through the other list in grid-column-formats.js.

   return {
      TEXT: {
         displayName: 'Text / Default',
         editor: Editors.Input,
         formatter: Formatters.Text,
         wrapsFormat: false, // no extra format wrapping here (slight performance gain without it)
         filterType: 'text'
      },
      CHECKBOX: {
         displayName: 'Checkbox',
         editor: Editors.Checkbox,
         formatter: Formatters.Checkbox,
         wrapsFormat: true, // TODO: ap - test this
         filterType: 'checkbox',
         align: 'center'
      },
      DATE: {
         displayName: 'Date',
         editor: Editors.Date,
         // We use a simplified version of SoHo's Date formatter since we have our own way of formatting dates via the Date converter
         formatter: function (row, cell, formattedValue, col) {
            if (!col.editor) {
               return formattedValue;
            }
            return '<span class="trigger">' + formattedValue + '</span><svg role="presentation" aria-hidden="true" focusable="false" class="icon icon-calendar"><use xlink:href="#icon-calendar"/></svg>';
         },
         wrapsFormat: true,
         filterType: 'date'
      },
      DROP_DOWN: {
         displayName: 'Drop Down',
         editor: Editors.Dropdown,
         formatter: Formatters.Dropdown,
         wrapsFormat: true,
         filterType: 'text'
      },
      HYPERLINK: {
         displayName: 'Hyperlink',
         // We use a modified version of SoHo's Hyperlink formatter since theirs caused problems with Angular url/state hash
         formatter: function (row, cell, formattedValue, col) {
            if (formattedValue || formattedValue === 0) {
               return '<a ' + (col.href ? 'href="' + col.href + '"' : '') + ' tabindex="-1" role="presentation" class="hyperlink">' + formattedValue + '</a>';
            }
            return '';
         },
         wrapsFormat: true,
         filterType: 'text'
      },
      LOOKUP: {
         displayName: 'Lookup',
         editor: LookupCellEditor, // we use a custom version of SoHo's Lookup editor since our lookups are an angular directive
         formatter: Formatters.Lookup,
         wrapsFormat: true,
         filterType: 'text'
      },
      TEXT_AREA: {
         displayName: 'Text Area (multi-line)',
         editor: Editors.Textarea,
         formatter: Formatters.Textarea,
         wrapsFormat: true,
         filterType: 'text'
      },
      TIME: {
         displayName: 'Time',
         editor: null, // SoHo does not yet have a Time editor
         formatter: Formatters.Text, // SoHo does not yet have a Time formatter
         wrapsFormat: true,
         filterType: 'text'
      },
      IMAGE: {
         displayName: 'Image',
         formatter: function (row, cell, value, col) {
            // If image url exists then use it; otherwise show the Soho placeholder image (since looks better than a blank image column)
            if (value) {
               return '<img class="datagrid-img" ' + 'src="' + value + '" />';
            } else {
               return '<div class="datagrid-img placeholder"><svg class="icon" focusable="false" aria-hidden="true" role="presentation"><use xlink:href="#icon-insert-image"></use></svg></div>';
            }
         },
         wrapsFormat: true
      }
   };
});
