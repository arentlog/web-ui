'use strict';

/**
 * Service for making Data Grids.
 */
app.service('GridService', function GridService($compile, GridColumnFormats, GridColumnTypes, DataFormatService, MessageService, OptionApiService, OptionSetService, Utils, AppInfoService) {
   var self = this;

   self.pageSizeStorageKey = AppInfoService.getLocalStoragePrefix() + 'GRIDPAGESIZE';
   self.lookupPageSizeStorageKey = AppInfoService.getLocalStoragePrefix() + 'LOOKUPGRIDPAGESIZE';
   self.rowHeightStorageKey = AppInfoService.getLocalStoragePrefix() + 'GRIDROWHEIGHT';

   // Get stored "sticky" options to override defaults
   // Note: we have a separate page size option for lookups because it is usually desired to have small pages for lookups
   self.selectedPageSize = localStorage[self.pageSizeStorageKey] ? parseInt(localStorage[self.pageSizeStorageKey]) : null;
   self.selectedLookupPageSize = localStorage[self.lookupPageSizeStorageKey] ? parseInt(localStorage[self.lookupPageSizeStorageKey]) : null;
   self.selectedRowHeight = localStorage[self.rowHeightStorageKey];

   /* Default options */
   self.getDefaultOptions = function (hasToolbar, isLookupGrid) {
      var options;

      // These lookup grid options are used when a lookup defines its columns in the json view
      if (isLookupGrid) {
         options = {
            columns: [],
            dataset: [],
            paging: true,
            pagesize: 5,
            pagesizes: [5, 10, 25, 50],
            selectable: 'single',
            filterable: false,
            columnReorder: false,
            saveColumns: false, // Do not store column personalization in local storage until we decide what we want
            rowHeight: 'normal', // short, medium or normal
            toolbar: hasToolbar ? {results: true, keywordFilter: true, rowHeight: true, collapsibleFilter: true} : null,
            initializeToolbar: false, // don't have soho grid code init the toolbar, because we have our own timing of doing that
            resultsText: self.getResultsText // custom function for record count display
         };
      } else {
         options = {
            columns: [],
            dataset: [],
            // F2 - toggles actionableMode "true" and "false"
            // If actionableMode is "true”, tab and shift tab behave like left and right arrow key,
            // if the cell is editable it goes in and out of edit mode
            actionableMode: false,
            cellNavigation: true, // If cellNavigation is "false”, will show border around whole row on focus
            clickToSelect: false,
            editable: false,
            selectable: 'multiple', // false, 'single' or 'multiple'
            showExpander: false,
            showCheckboxes: false,
            showStatusIndicators: false,
            showDrilldown: false,
            filterable: false,
            columnReorder: true,
            saveColumns: false, // Do not store column personalization in local storage until we decide what we want
            rowHeight: 'normal', // short, medium or normal
            toolbar: hasToolbar ? {results: true, keywordFilter: true, rowHeight: true} : null,
            initializeToolbar: false, // don't have soho grid code init the toolbar, because we have our own timing of doing that
            // Paging options
            paging: true,
            pagesize: 10,
            pagesizes: [5, 10, 25, 50],
            showPageSizeSelector: true,
            // Other options
            drillDownTooltip: null,
            resultsText: self.getResultsText, // custom function for record count display
            sizeColumnsEqually: false // If true make all the columns equal width (but this can cause visual problems)
         };
      }

      return options;
   };

   /* Public API */

   self.make = function(scope, $element, ctrl, customOptions) {
      var grid, i;
      var hasToolbar = $element.prev().is('.toolbar');
      var isLookupGrid = $element.attr('id') === 'lookup-datagrid';
      var status = {
         isUpdatePending: false
      };

      // Initialize options
      var options = self.getDefaultOptions(hasToolbar, isLookupGrid);

      // Set some defaults based on if editable grid or not
      // - Editable: enable actionable mode (makes tab key tab through cells)
      // - Non-editable: style the grid like a readonly list (SoHo recommendation)
      options.actionableMode = customOptions.editable ? true : false;
      options.isList = !customOptions.editable;

      // Apply user's "sticky" options (if have a value)
      // Note: We do this after getting defaults but before applying the custom options for the specific grid because
      //       some grids purposely set a small default page size. But if this becomes undesirable, then we can move
      //       this code below the Utils.extend line.
      if (self.selectedRowHeight) {
         options.rowHeight = self.selectedRowHeight;
      }
      if (isLookupGrid && self.selectedLookupPageSize) {
         options.pagesize = self.selectedLookupPageSize;
      } else if (!isLookupGrid && self.selectedPageSize) {
         options.pagesize = self.selectedPageSize;
      }

      // Add custom options
      Utils.extend(options, customOptions);

      // Prepare JSON view include shell if grid has an expandable row view
      if (options.showExpander && options.rowDetailOptions && options.rowDetailOptions.template) {
         self.prepareExpandableRow(scope, $element, options);
      }

      // Pre-process columns (and get list of info of columns that have dynamic properties)
      var dynamicColumnInfo = self.preProcessColumns(options, options.columns, scope, $element);

      // Add grid pieces to toolbar (if it exists directly before the grid)
      if (hasToolbar) {
         var $toolbar = $element.prev();
         var $buttonset = $toolbar.find('.buttonset');

         // Add grid search (unless specifically set to false)
         if (options.showSearchField !== false) {
            var searchFieldId = 'toolbar-searchfield-' + Utils.getTransientId();
            $buttonset.prepend('<label class="audible" for="' + searchFieldId + '">' + Locale.translate('Keyword') + '</label><input id="' + searchFieldId + '" class="searchfield" />');
         }

         // Add standard grid options
         var html = '<div class="more"><button type="button" class="btn-actions"><svg class="icon" focusable="false" aria-hidden="true" role="presentation"><use xlink:href="#icon-more"></use></svg><span class="audible">' + Locale.translate('MoreActions') + '</span></button>';
         html += '<ul class="popupmenu has-icons">';

         // We use a custom option for export to excel in order to allow exporting only the selected rows
         html += '<li><a data-option="custom-export-to-excel"><svg class="icon"><use xlink:href="#icon-export-spreadsheet"></use></svg><span>' + Locale.translate('ExportToExcel') + '</span></a></li>';

         // Filter Row
         html += '<li class="separator"></li>';
         html += '<li class="heading">' + Locale.translate('Filter') + '</li>';
         html += '<li class="is-toggleable' + (options.filterable ? ' is-checked' : '') + '"><a data-option="show-filter-row">' + Locale.translate('ShowFilterRow') + '</a></li>';
         html += '<li class="is-indented"><a data-option="run-filter">' + Locale.translate('RunFilter') + '</a></li>';
         html += '<li class="is-indented"><a data-option="clear-filter">' + Locale.translate('ClearFilter') + '</a></li>';

         // Row Height
         html += '<li class="separator single-selectable-section"></li>';
         html += '<li class="heading">' + Locale.translate('RowHeight') + '</li>';
         html += '<li class="is-selectable' + (options.rowHeight === 'short' ? ' is-checked' : '') + '"><a data-option="row-short">' + Locale.translate('Short') + '</a></li>';
         html += '<li class="is-selectable' + (options.rowHeight === 'medium' ? ' is-checked' : '') + '"><a data-option="row-medium">' + Locale.translate('Medium') + '</a></li>';
         html += '<li class="is-selectable' + (options.rowHeight === 'normal' ? ' is-checked' : '') + '"><a data-option="row-normal">' + Locale.translate('Normal') + '</a></li>';

         html += '</ul>';
         html += '</div>';
         $buttonset.after(html);

         // This class was not always added properly by Soho for lookup grids, so adding manually
         $toolbar.addClass('has-more-button');

         // Listen to toolbar option selection
         $toolbar.find('.btn-actions').popupmenu().on('selected', function (e, args) {
            var action = args.attr('data-option');

            // If user chooses new row height, save for future grids
            if (action === 'row-short' || action === 'row-medium' || action === 'row-normal') {
               self.selectedRowHeight = action.substr(4);
               localStorage[self.rowHeightStorageKey] = self.selectedRowHeight;
            } else if (action === 'custom-export-to-excel') {
               // If user has selected any rows, then only export those rows. Otherwise export all.
               var selectedRecords = self.getSelectedRecords(grid);
               var isAnyRowSelected = selectedRecords.length > 0;
               var dataset = grid.settings.dataset;
               var exportRecords = isAnyRowSelected ? selectedRecords : dataset;

               // Sort the selected records to match the current order in the grid (order of the dataset array).
               // This is better than what Soho's "seletedRows" api returns (order of when row was selected)
               if (isAnyRowSelected) {
                  exportRecords.sort(function (a, b) {
                     return dataset.indexOf(a) - dataset.indexOf(b);
                  });
               }

               // Call Soho api to perform export (leave filename as default)
               grid.exportToCsv(null, exportRecords);
             }
         });
      }

      // Create grid
      grid = $element.datagrid(options).data('datagrid');

      // Add helpful grid methods
      self.addAdditionalMethods(grid);

      // Add grid events
      self.addEvents(grid, options, $element, scope, ctrl, isLookupGrid);

      // Add dynamic column watch handlers
      if (dynamicColumnInfo && dynamicColumnInfo.length) {
         for (i = 0; i < dynamicColumnInfo.length; i++) {
            self.watchColumn(grid, dynamicColumnInfo[i], status, scope);
         }
      }

      // Set the default sort column if defined
      for (i = 0; i < options.columns.length; i++) {
         var column = options.columns[i];

         if (column.defaultSort) {
            grid.sortColumn = { sortId: column.id, sortAsc: column.defaultSort === 'asc' };
            break;
         }
      }

      return grid;
   };

   self.getSelectedRowIds = function(grid, idField) {
      return JSLINQ(grid.selectedRows()).Select(function(item) { return item.data[idField]; }).items;
   };

   self.getSelectedRecord = function(grid) {
      var records = grid.selectedRows();

      if (records.length === 1) {
         return records[0].data;
      } else {
         return null;
      }
   };

   /**
    * Return list of records (row data objects) for the selected rows.
    */
   self.getSelectedRecords = function (grid) {
      var records = [];
      var selectedRows = grid.selectedRows();

      // We want only the record objects, not the extra Soho row wrappers
      selectedRows.forEach(function (row) {
         records.push(row.data);
      });

      return records;
   };

   /**
    * Softly update the existing dataset with new data and preserve the state of the grid (page, sort, and filter).
    * Note:
    *    - This merges changes into the existing objects so that a full grid.loadData doesn't happen
    *    - Important! This method cannot work if the new dataset has added/deleted objects (since that would fire the angular watch on the dataset)
    * @param grid - the grid
    * @param newDataset - the new dataset with changes on objects
    * @param idField - the field on the objects used to match old objects with new ones (i.e. 'lineno' or 'rowid')
    */
   self.softUpdateDataset = function (grid, newDataset, idField) {
      var oldDataset = grid.settings.dataset;

      // Loop through new items to update the existing items
      for (var i = 0; i < newDataset.length; i++) {
         var newItem = newDataset[i];

         // Find existing item to update it
         for (var j = 0; j < oldDataset.length; j++) {
            var oldItem = oldDataset[j];

            if (oldItem[idField] === newItem[idField]) {
               // Note: extend instead of replace since Soho adds a 'filtered' property when using grid filtering
               Utils.extend(oldItem, newItem);

               // Manually tell Soho grid to refresh the row display
               grid.updateRow(j);

               break;
            }
         }
      }
   };

   /**
    * Pre-process columns (apply i18n translations, etc.)
    */
   self.preProcessColumns = function (options, columns, scope, $element) {
      var dynamicColumnInfoList = [];

      // Add drill-down column
      if (options.showDrilldown) {
         var drillOption = options.events ? options.events.drilldown : null;

         // Find drilldown function (may be a function or a string reference to a call of a function within scope)
         var drillFunction = self.findFunction(scope, drillOption, true);

         columns.splice(0, 0, {id: 'drilldown', name: '', field: '', click: drillFunction, formatter: Formatters.Drilldown, align: 'center', exportable: false, reorderable: false, resizable: false, sortable: false});
      }

      // Add checkbox column
      if (options.showCheckboxes) {
         columns.splice(0, 0, {id: 'selectionCheckbox', name: '', formatter: Formatters.SelectionCheckbox, align: 'center', exportable: false, reorderable: false, resizable: false, sortable: false});
      }

      // Add expander column
      if (options.showExpander) {
         columns.splice(0, 0, {id: 'expander', name: '', field: '', formatter: Formatters.Expander, align: 'center', exportable: false, reorderable: false, resizable: false, sortable: false});
      }

      // Process each column
      if (columns) {
         for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            var type = column.type;
            var columnType = type ? GridColumnTypes[type] : null;
            var columnFormat = column.dataFormat ? GridColumnFormats[column.dataFormat] : null;
            var name = column.name;
            var hasDynamicInfo = false;
            var dynamicColumnInfo = {
               column: column
            };

            // Remember original index of each column (needed by dynamic inclusion logic)
            column.originalIndex = i;

            // Dynamic include expression
            if (column.isIncluded) {
               dynamicColumnInfo.includeExpression = column.isIncluded;
               hasDynamicInfo = true;
            }

            // Translate column names
            if (name) {
               if (name.startsWith('{{')) {
                  var exp = name.replace('{{', '').replace('}}', '');

                  // If dynamic label, get initial value from scope
                  column.name = scope.$eval(exp) || '';

                  // Add to dynamic column info
                  dynamicColumnInfo.nameExpression = exp;
                  hasDynamicInfo = true;
               } else {
                  column.name = MessageService.get(name);
               }

               // Protect column names against script injection attacks
               column.name = Utils.escapeHtml(column.name);
            }

            // Attach click event function
            column.click = self.findFunction(scope, column.click, true);

            // Attach cellchange event function (not requesting apply of scope since cellchange always applies scope)
            // Important! Lookup columns do not deal with change functions here (since the lookup directive handles that)
            if (type !== 'LOOKUP') {
               column.cellchange = self.findFunction(scope, column.cellchange, false);
            }

            // Attach other functions
            column.enterEditMode = self.findFunction(scope, column.enterEditMode, true);
            column.exitEditMode = self.findFunction(scope, column.exitEditMode, true);
            column.isEditable = self.findFunction(scope, column.isEditable, false);
            column.contentVisible = self.findFunction(scope, column.contentVisible, false);

            // If has a GridColumnFormat (dataFormat), then add properties from the metadata
            if (columnFormat) {
               var subFormatObj = self.getSubFormat(columnFormat.subFormats, column.subFormat);
               var formatOptions = self.getFormatOptions(columnFormat.formatOptions, column.formatOptions);

               // Add numeric mask for editable columns (unless column already has a mask defined)
               if (column.editable && columnFormat.numericMask && !column.mask) {
                  column.mask = DataFormatService.getNumericMask(column.sign, column.digits, column.decimals);
               }

               // Add all properties from metadata (formatter, editor, mask, ect.),
               // but don't add properties that are already specified on the column (these override meta)
               for (var prop in columnFormat) {
                  if (columnFormat.hasOwnProperty(prop) && !column[prop]) {
                     column[prop] = columnFormat[prop];
                  }
               }

               // We wrap the formatter so that we can pass the subFormat option
               if (columnFormat.formatter) {
                  // TODO: figure out a better way to know if the formatter is a standard SoHo one or our custom converter
                  if (columnFormat.formatter !== Formatters.Text && columnFormat.formatter !== Formatters.Readonly
                     && columnFormat.formatter !== Formatters.Date && columnFormat.formatter !== Formatters.Decimal
                     && columnFormat.formatter !== Formatters.Integer && columnFormat.formatter !== Formatters.Hyperlink
                     && columnFormat.formatter !== Formatters.Drilldown && columnFormat.formatter !== Formatters.Checkbox
                     && columnFormat.formatter !== Formatters.Textarea && columnFormat.formatter !== Formatters.Button
                     && columnFormat.formatter !== Formatters.Dropdown && columnFormat.formatter !== Formatters.Alert
                     && columnFormat.formatter !== Formatters.Tag && columnFormat.formatter !== Formatters.Badge
                     && columnFormat.formatter !== Formatters.Lookup && columnFormat.formatter !== Formatters.Ellipsis) {
                     column.formatter = self.getFormatterWrapperFn(columnFormat, subFormatObj, formatOptions);
                  }
               }

               // We wrap the parser so that we can pass the subFormat option
               if (columnFormat.parser) {
                  // Note: The 'parser' function is actually called 'serialize' in SoHo's world (but we use 'parser' to match angular and fields)
                  column.serialize = self.getParserWrapperFn(columnFormat, subFormatObj, formatOptions);
               }

               // We wrap the isChecked function so that we can pass the subFormat option
               // Note: isChecked is for handling non-boolean models of Checkbox columns
               if (columnFormat.isChecked) {
                  column.isChecked = self.getIsCheckedWrapperFn(columnFormat, subFormatObj, formatOptions);
               }
            }

            // If not using type, then use the default formatter (Text) if formatter is not defined
            if (!columnType && !column.formatter) {
               column.formatter = Formatters.Text;
            }

            // Formatter and editor may be coming from JSON, so need to point them to corresponding references
            if (typeof column.formatter === 'string') {
               column.formatter = Formatters[column.formatter];
            }
            if (typeof column.editor === 'string') {
               column.editor = Editors[column.editor];
            }

            // Find formatter on scope if using a custom formatter
            if (column.customFormatter) {
               column.formatter = self.findFunction(scope, column.customFormatter, false);
            }

            // Add properties from GridColumnType
            if (columnType) {
               // Add editor (unless already has an editor)
               if (!column.editor) {
                  column.editor = columnType.editor;
               }

               // Add formatter (either as sole formatter or wrapper of another formatter)
               if (!column.formatter) {
                  column.formatter = columnType.formatter;
               } else if (columnType.wrapsFormat) {
                  column.formatter = self.getFinalFormatterFn(columnType.formatter, column.formatter);
               }

               // Add filter type (unless already has it)
               if (!column.filterType) {
                  column.filterType = columnType.filterType;
               }

               // Add align (unless already has it)
               if (!column.align) {
                  column.align = columnType.align;
               }
            }

            // Prepare tooltips
            if (column.tooltipType === 'value') {
               column.tooltip = '{{value}}'; // soho has a tooltip feature that replaces {{value}} with the cell value
            } else if (column.tooltip) {
               column.tooltip = MessageService.get(column.tooltip);
            }
            if (column.headerTooltip) {
               column.headerTooltip = MessageService.get(column.headerTooltip);
            }

            // Translate "text" (used by some formatters like Button)
            if (column.text) {
               column.text = MessageService.get(column.text);
            }

            // Translate option labels (i.e. drop down columns)
            if (column.options) {
               $.each(column.options, function () {
                  if (this.label) this.label = MessageService.get(this.label);
               });
            }

            // Get drop down options and attach to column
            if (type === 'DROP_DOWN') {
               self.addDropDownOptions(column, scope, $element);

               // SX.e needs all drop down columns to be case-insensitive
               column.caseInsensitive = true;
            }

            // If the column is not editable, remove editor (the editor is how SoHo determines editable vs. non-editable columns)
            if (!column.editable) {
               column.editor = null;
            }

            // Display non-editable columns as readonly (those that don't have an editor) in order to visually distinguish editable columns to the user
            if (!column.editor) {
               column.readonly = true;
            }

            // Add to dynamic list if needed
            if (hasDynamicInfo) {
               dynamicColumnInfoList.push(dynamicColumnInfo);
            }
         }

         // Initial removal of excluded columns (from end to beginning so that indexes are valid even after removals)
         for (var j = dynamicColumnInfoList.length - 1; j >= 0; j--) {
            var colInfo = dynamicColumnInfoList[j];

            // Remove from column list if has an include expression that evaluates to falsy
            if (colInfo.includeExpression && !scope.$eval(colInfo.includeExpression)) {
               columns.splice(colInfo.column.originalIndex, 1);
            }
         }
      }

      return dynamicColumnInfoList;
   };

   /* Helper methods */

   self.prepareExpandableRow = function (scope, $element, options) {
      var rowDetailOptions = options.rowDetailOptions;

      // Add our include-view directive to row html
      options.rowTemplate = '<div include-view="\'' + rowDetailOptions.template + '\'" data-controller="' + (rowDetailOptions.controller || '') + '" class="constrained-width"></div>';

      // Listen to row expand event and activate row detail by compiling the detail content (which contains an include-view element)
      $element.on('expandrow', function (e, args) {
         // Provide a copy of the item (as well as the actual item) so child component can work on the copy and easily cancel changes
         args.itemCopy = angular.copy(args.item);

         // Set data on scope so child component can access
         Utils.setNestedValue(scope, rowDetailOptions.paramsReference, args);

         // Compile & activate view
         $compile(args.detail)(scope.$new());
      });

      // Listen to row collapse event and remove DOM content that was pulled in by include-view directive
      $element.on('collapserow', function (e, args) {
         args.detail.find('[include-view]').children().remove();
         args.detail.scope().$destroy();
      });
   };

   /**
    * Format the grid results count for display (we display the result count with number only (#))
    */
   self.getResultsText = function (grid, count) {
      return '(' + Locale.formatNumber(count, { style: 'integer' }) + ')';
   };

   /**
    * Get wrapper function that incorporates both the outer GridColumnType formatter and the inner GridColumnFormat (or custom) formatter
   */
   self.getFinalFormatterFn = function (outerFormatter, innerFormatter) {
      return function (row, cell, value, container, column, event, grid, item) {
         // Call the inner function
         var formattedValue = innerFormatter(row, cell, value, container, column, event, grid, item);

         // Call the outer function passing the formatted value
         return outerFormatter(row, cell, formattedValue, container, column, event, grid, item);
      };
   };

   /**
    * Get formatter function from metadata and wrap it in a new function passing subFormat object
    */
   self.getFormatterWrapperFn = function (columnFormat, subFormatObj, formatOptions) {
      return function (row, cell, value) {
         return columnFormat.formatter(value, subFormatObj, formatOptions);
      };
   };

   /**
    * Get parser function from metadata and wrap it in a new function passing subFormat object
    */
   self.getParserWrapperFn = function (columnFormat, subFormatObj, formatOptions) {
      return function (value) {
         return columnFormat.parser(value, subFormatObj, formatOptions);
      };
   };

   /**
    * Get isChecked function from metadata and wrap it in a new function passing subFormat object
    */
   self.getIsCheckedWrapperFn = function (columnFormat, subFormatObj, formatOptions) {
      return function (value) {
         return columnFormat.isChecked(value, subFormatObj, formatOptions);
      };
   };

   /**
    * Get specified sub format object from format's subFormat list
    */
   self.getSubFormat = function (subFormatList, subFormat) {
      if (subFormatList && subFormat) {
         var length = subFormatList.length;

         for (var i = 0; i < length; i++) {
            if (subFormatList[i].key === subFormat) {
               return subFormatList[i];
            }
         }
      }

      return undefined;
   };

   /**
    * Get format options specified on column, as well as any default values from metadata
    */
   self.getFormatOptions = function (formatOptionsMeta, formatOptions) {
      var options;

      if (formatOptionsMeta) {
         options = formatOptions || {};

         for (var prop in formatOptionsMeta) {
            if (formatOptionsMeta.hasOwnProperty(prop)) {
               var opt = formatOptionsMeta[prop];

               // Use default value from metadata if it exists and if the column doesn't have a value
               if (opt.defaultValue !== undefined && options[prop] === undefined) {
                  options[prop] = opt.defaultValue;
               }
            }
         }
      }

      return options;
   };

   /**
    * Find a function by scope-based reference and optionally wrap it in a function that applies scope.
    */
   self.findFunction = function (scope, reference, applyScope) {
      var finalFn = null;
      var fn = null;

      // Gracefully handle empty reference param
      if (!reference) {
         return null;
      }

      // Reference may be a function or a string reference to a call of a function within scope
      if (typeof reference === 'string') {
         // Remove invoke parenthesis if present since we simply want to get the reference to the function
         var ref = reference.replace('()', '');

         // Get requested function from scope
         fn = Utils.getNestedValue(scope, ref);
      } else if (typeof reference === 'function') {
         fn = reference;
      }

      if (fn) {
         // If we need to apply scope for this function, add a wrapper function that will apply scope afterward
         if (applyScope) {
            finalFn = function () {
               // Call the desired function (we are using the native js 'apply' method in order to pass the arguments passed from SoHo)
               fn.apply(this, arguments);

               // Apply scope (if not already being applied)
               if (!scope.$$phase) {
                  scope.$apply();
               }
            };
         } else {
            finalFn = fn;
         }
      } else {
         // If can't find it, log an error to help developers
         console.log('Error: The function "' + ref + '" could not be found within scope. Please check if it exists and is accessible in this grid\'s scope.');
      }

      return finalFn;
   };

   /**
    * Add additional helpful methods on grid objects
    */
   self.addAdditionalMethods = function (grid) {
      // Add helpful grid methods so angular expressions in views can easily know how many rows are selected
      grid.isOneRowSelected = function () {
         return grid.selectedRows().length === 1;
      };
      grid.isAnyRowSelected = function () {
         return grid.selectedRows().length > 0;
      };
      grid.isNoRowSelected = function () {
         return grid.selectedRows().length === 0;
      };
      grid.isFirstRowSelected = function () {
         var firstRecord = grid.settings.dataset[0];
         var selectedRecords = self.getSelectedRecords(grid);
         return selectedRecords && firstRecord && selectedRecords.indexOf(firstRecord) >= 0;
      };
      grid.isLastRowSelected = function () {
         var length = grid.settings.dataset.length;
         if (length && length > 0) {
            var lastRecord = grid.settings.dataset[length - 1];
            var selectedRecords = self.getSelectedRecords(grid);
            return selectedRecords && lastRecord && selectedRecords.indexOf(lastRecord) >= 0;
         } else {
            return false;
         }
      };
   };

   self.addEvents = function (grid, options, $element, scope, ctrl, isLookupGrid) {
      var events = options.events || {};

      // Note: We usually want to apply scope on every grid event (even if no listener functions are passed in)
      // since something important may have changed (cell data, # selected rows, etc.).

      var changeFn = self.findFunction(scope, events.cellchange, false);
      var pagingFn = self.findFunction(scope, events.paging, true);
      var selectedFn = self.findFunction(scope, events.selected, false);
      var sortedFn = self.findFunction(scope, events.sorted, false);
      var readyFn = self.findFunction(scope, events.ready, false);

      // Cell change
      $element.on('cellchange', function (e, args) {
         var isLookupColumn = args.column.type === 'LOOKUP';

         // If the specific column has a cellchange function, invoke it
         // Important! We do not invoke change functions here for lookup columns since the lookup directive handles that
         if (args.column.cellchange && !isLookupColumn) {
            args.column.cellchange.apply(this, arguments);
         }

         // If the grid has a cellchange function, invoke it
         if (changeFn) {
            changeFn.apply(this, arguments);
         }

         // Apply scope (but not if lookup column since lookup directive handles that)
         if (!isLookupColumn) {
            if (!scope.$$phase) scope.$apply();
         }
      });

      // Enter edit mode
      $element.on('entereditmode', function (e, args) {
         // If the specific column has an enterEditMode function, invoke it
         if (args.column.enterEditMode) {
            args.column.enterEditMode.apply(this, arguments);
         }
      });

      // Exit edit mode
      $element.on('exiteditmode', function (e, args) {
         // If the specific column has an exitEditMode function, invoke it
         if (args.column.exitEditMode) {
            args.column.exitEditMode.apply(this, arguments);
         }
      });

      // Paging
      $element.on('paging', function (e, args) {
         if (pagingFn) {
            pagingFn.apply(this, arguments);
         }

         // Make sure the grid content is scrolled to the top after paging. When a grid has scrolling the user wants to
         // see the top of the results after changing the page. This "paging" event fires for sorting, filtering, and
         // loading new data, which works nicely since we want to scroll to top of grid content on those also.
         if (grid.contentContainer && grid.contentContainer.length) {
            grid.contentContainer[0].scrollTop = 0;
         }

         // If user changes page size, then remember the number for other grids to use
         if (args.type === 'first') {
            if (isLookupGrid) {
               self.selectedLookupPageSize = args.pagesize;
               localStorage[self.lookupPageSizeStorageKey] = args.pagesize;
            } else {
               self.selectedPageSize = args.pagesize;
               localStorage[self.pageSizeStorageKey] = args.pagesize;
            }
         }
      });

      // Selected
      $element.on('selected', function () {
         if (selectedFn) {
            selectedFn.apply(this, arguments);
         }

         if (!scope.$$phase) scope.$apply();
      });

      // Sorted
      $element.on('sorted', function () {
         if (sortedFn) {
            sortedFn.apply(this, arguments);
         }

         // Set flag so dataset model watch knows the change was due to sort functionality
         ctrl.isModelChangeFromGridSort = true;

         if (!scope.$$phase) scope.$apply();
      });

      // Ready
      $element.on('ready', function () {
         if (readyFn) {
            readyFn.apply(this, arguments);
         }

         if (!scope.$$phase) scope.$apply();
      });

      // Drilldown activate row feature
      // When a drilldown click event happens we "activate" the row (gives user a visual indicator of last drilled row).
      // When any other click event happens in a grid row we clear the activated row (so doesn't hang around while selecting, editing, etc.).
      if (options.showDrilldown) {
         $element.on('click', function (e, args) {
            if (args && args.originalEvent && $(args.originalEvent.target).is('.datagrid-drilldown')) {
               grid.activateRow(args.row);
            } else {
               if (grid.activatedRow()[0].row >= 0) {
                  grid.deactivateRow();
               }
            }
         });
      }
   };

   self.addDropDownOptions = function (column, scope, $element) {
      var optionsType = column.optionsType;
      var options = [];

      // Inline options don't perform any of the following
      if (optionsType === 'INLINE') {
         return;
      }

      // Add blank option (if true or default/undefined)
      if (column.blankOption !== false) {
         if (column.blankOptionLabel) {
            options.push({label: MessageService.get(column.blankOptionLabel), value: ''});
         } else {
            // The default display of the blank option label is to show empty
            options.push({label: '', value: ''});
         }
      }

      // Fetch options (static set, dynamic codes from api, or custom/manual)
      if (optionsType === 'SET') {
         OptionSetService.get(column.metaGroup, column.meta, function (optionSet) {
            column.options = options.concat(optionSet.children);

            // Update column cell display if grid already created by the time options are returned
            var grid = $element.data('datagrid');
            if (grid) {
               self.updateColumnCells(grid, column);
            }
         });
      } else if (optionsType === 'CODES') {
         OptionApiService.get(column.meta, function (optionList) {
            column.options = options.concat(optionList);

            // Update column cell display if grid already created by the time options are returned
            var grid = $element.data('datagrid');
            if (grid) {
               self.updateColumnCells(grid, column);
            }
         });
      } else if (optionsType === 'MANUAL') {
         // Custom options are set dynamically so we need to watch the options model and update grid column upon changes
         scope.$watchCollection(column.optionsModel, function (optionList) {
            if (optionList) {
               // Need to normalize option list into what SoHo expects (objects with 'label' and 'value' fields)
               optionList = self.prepareCustomOptionList(optionList, column);

               column.options = options.concat(optionList);

               // Update column cell display if grid already created by the time options are returned
               var grid = $element.data('datagrid');
               if (grid) {
                  self.updateColumnCells(grid, column);
               }
            }
         });
      }
   };

   /**
    * Update display of all cells of a grid column
    */
   self.updateColumnCells = function (grid, column) {
      var numRows = grid.settings.dataset ? grid.settings.dataset.length : 0;
      var cell = grid.settings.columns.indexOf(column);

      for (var i = 0; i < numRows; i++) {
         grid.updateCell(i, cell);
      }
   };

   /**
    * Create a normalized option array (SoHo expects 'label' and 'value' fields) from a custom option list
    */
   self.prepareCustomOptionList = function (list, column) {
      var labelField = column.optionLabelField;
      var valueField = column.optionValueField;
      var newList = [];
      var i, opt;

      for (i = 0; i < list.length; i++) {
         opt = list[i];

         newList.push({
            label: Utils.getNestedValue(opt, labelField),
            value: Utils.getNestedValue(opt, valueField)
         });
      }

      return newList;
   };

   /**
    * Watch for changes to dynamic column info and update grid accordingly
    */
   self.watchColumn = function (grid, columnInfo, status, scope) {
      var includeExpression = columnInfo.includeExpression;
      var nameExpression = columnInfo.nameExpression;

      // Watch column include expression
      if (includeExpression) {
         scope.$watch(includeExpression, function (newValue) {
            var column = columnInfo.column;
            var columns = grid.settings.columns;
            var currentIndex = columns.indexOf(column);

            // If adding and column is already included, do not proceed
            // If removing and column is already removed, do not proceed
            // Note: Need this check because the watch can fire by value becoming a different truthy value or different falsy value
            if ((newValue && currentIndex >= 0) || (!newValue && currentIndex < 0)) {
               return;
            }

            // Add or remove from columns array
            if (newValue) {
               var addIndex = null;
               var originalIndex = column.originalIndex;

               // Go through current columns to find best place to add the column by comparing original indices
               // Note: This algorithm should always work correctly, however if the user reorders columns,
               //       and the grid hasn't been recreated since the reorder, then there's no guarantees
               for (var i = 0; i < columns.length; i++) {
                  if (originalIndex < columns[i].originalIndex) {
                     addIndex = i;
                     break;
                  }
               }

               // If didn't find a spot to add the column (addIndex never set), then add to the end
               if (addIndex === null) {
                  addIndex = columns.length;
               }

               // Add column
               columns.splice(addIndex, 0, column);
            } else {
               // Remove column by its current index
               columns.splice(currentIndex, 1);
            }

            // Update grid with modified column array (if an update is not already pending)
            if (!status.isUpdatePending) {
               status.isUpdatePending = true;

               // Perform update after a short delay (since multiple column watch statements may be changing
               // during a scope apply, so for better performance we only want to re-render the grid once)
               setTimeout(function () {
                  grid.updateColumns(columns);
                  status.isUpdatePending = false;
               }, 200);
            }
         });
      }

      // Watch column name/label expression
      if (nameExpression) {
         scope.$watch(nameExpression, function (newValue) {
            var newName = newValue ? Utils.escapeHtml(newValue) : '';

            // If the column label changes, update the html and the column object
            grid.headerTable.find('thead th[data-column-id="' + columnInfo.column.id + '"] .datagrid-header-text').text(newName);
            columnInfo.column.name = newName;
         });
      }
   };

});
