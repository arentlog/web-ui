'use strict';

app.service('LookupService', function LookupService($compile, $timeout, Constants, DataService, FieldFormats, GridService, JsonViewService, Lookups, MessageService, MruService, Utils, CacheService, AppInfoService) {
   var self = this;
   self.majorBucket = 'E';

   /* Default options */
   self.getDefaultOptions = function (isIES, lookupMeta) {
      return {
         autoComplete: true, // Include auto-complete control with this lookup
         autoFetchMetadata: true, // Automatically fetch the record metadata (full label and notes flag) when the model value changes programmatically (i.e. not by the user)
         autoSelect: true, // Attempt to automatically validate and select a record if user types in a value and tabs out
         allowEntry: false, // Allowed to enter values which are not known/existing records
         rowPointerField: isIES ? 'rowpointer' : null, // Field name containing the row pointer
         notesField: isIES ? 'notesfl' : null, // Field name containing the notes flag

         // The response of the elastic exact match call changed and now returns the key values as value, key2, key3,
         // etc., so we default the recordValueField options to accommodate
         recordValueField: isIES && lookupMeta.valueField ? 'value' : null,
         recordValue2Field: isIES && lookupMeta.value2Field ? 'key2' : null,
         recordValue3Field: isIES && lookupMeta.value3Field ? 'key3' : null,
         recordValue4Field: isIES && lookupMeta.value4Field ? 'key4' : null,
         recordValue5Field: isIES && lookupMeta.value5Field ? 'key5' : null,

         // Client Side Caching
         cacheExactMatch: true,
         cacheExactMatchTimeout: 15,

         // Field name on the request criteria object (or GET path) that should get the max results number (i.e. 'recordcount')
         maxResultsField: isIES ? 'MaxResults' : null,

         // The field on the response object that contains the array of results (i.e. 'arbchlookupresults')
         // Omit this option if the response object itself is the results
         responseField: null,

         // Perform search when opening the lookup modal.
         // - the default is to perform a search if the user has just typed in a value, otherwise don't search (to avoid unwanted searches and performance hits)
         // - true means always search on open
         // - false means never search on open (no matter if user has typed in a value)
         searchOnOpen: null,

         // The json view to use for the modal
         modalView: null,

         // The controller to use for the modal
         // - IES lookups always use a certain controller
         // - Other lookups default to a standard controller if not specified
         modalController: isIES ? 'IesLookupModalCtrl as lkupmdl' : 'StandardLookupModalCtrl as lkupmdl',

         // Grid options (currently only used for lookups that don't define their columns in the json view; GridService has others)
         options: {
            columns: [],
            dataset: [],
            paging: true,
            pagesize: 5,
            pagesizes: [5, 10, 25, 50],
            selectable: 'single',
            filterable: false,
            columnReorder: false,
            saveColumns: false, // Do not store column personalization in local storage until we decide what we want
            toolbar: { title: '', results: true, actions: true, keywordFilter: false, rowHeight: true, collapsibleFilter: false },
            initializeToolbar: false // don't have soho grid code init the toolbar, because we have our own timing of doing that
         }
      };
   };


   /* Public methods */

   self.make = function (scope, $input, ctrl, lookupKey, options) {
      var opt, autoCompleteControl, modalScope, subFormatObj, formatOptions;
      var customOptions = options || {};
      var customSearchParams = customOptions.searchParams || {};
      var model = $input.attr('data-model');
      var status = ctrl.status;

      // Get lookup meta by key
      var lookupMeta = Lookups[lookupKey];

      // Stop and log error to help developers if lookup metadata can't be found
      if (!lookupMeta) {
         console.error('Error: Could not find a lookup metadata definition for the key: "' + lookupKey + '"');
         return;
      }

      // IES lookups are those without a searchPath defined
      ctrl.isIES = !lookupMeta.searchPath;

      // Initialize options
      var lookupOptions = self.getDefaultOptions(ctrl.isIES, lookupMeta);

      // Add meta lookup options
      for (opt in lookupMeta) {
         if (lookupMeta.hasOwnProperty(opt)) {
            lookupOptions[opt] = lookupMeta[opt];
         }
      }

      // Add any custom lookup options
      for (opt in customOptions) {
         if (customOptions.hasOwnProperty(opt)) {
            lookupOptions[opt] = customOptions[opt];
         }
      }

      // MRU requires a unique id. If no rowIdField/rowPointerField, then deactivate MRU and log error for developer.
      if (lookupOptions.mruListKey && !lookupOptions.rowPointerField && !lookupOptions.rowIdField) {
         console.log('Error: rowPointerField or rowIdField option is required for MRU for lookup "' + lookupKey + '"');
         lookupOptions.mruListKey = null;
      }

      // Initialize default search params from lookup meta
      var searchParams = lookupMeta.searchParams ? angular.copy(lookupMeta.searchParams) : {};

      // Add any custom search params
      for (opt in customSearchParams) {
         if (customSearchParams.hasOwnProperty(opt)) {
            searchParams[opt] = customSearchParams[opt];
         }
      }

      // Set merged searchParams on lookup options to be used
      lookupOptions.searchParams = searchParams;

      // Pre-process the grid columns of the lookup
      GridService.preProcessColumns(lookupOptions.options, lookupMeta.columns);

      // Set columns (if statically defined)
      lookupOptions.options.columns = lookupMeta.columns;

      // Set translated toolbar title (rarely used, but could be useful for dynamic references in shared modals)
      if (lookupMeta.toolbarTitle) {
         var toolbarTitle = MessageService.get(lookupMeta.toolbarTitle);
         lookupOptions.options.toolbar.title = toolbarTitle;
         ctrl.toolbarTitle = toolbarTitle;
      }

      // Get field format definition
      var formatKey = $input.attr('field-format');
      var formatMeta = formatKey ? FieldFormats[formatKey] : null;

      // Get formatter and parser functions (if exists)
      var formatter = formatMeta ? formatMeta.formatter : null;
      var parser = formatMeta ? formatMeta.parser : null;

      // Get additional format options from the field
      if (formatMeta) {
         var fmtOpts = $input.attr('data-format-options');
         formatOptions = self.getFormatOptions(formatMeta.formatOptions, fmtOpts ? JSON.parse(fmtOpts) : null);
         subFormatObj = self.getSubFormat(formatMeta.subFormats, $input.attr('data-sub-format'));
      }

      // If using applyFormatToLabel, then cruft up a labelField function that will apply the format options of the field
      if (lookupOptions.applyFormatToLabel && formatter) {
         var origLabelField = lookupOptions.labelField;
         lookupOptions.labelField = function (record) {
            return formatter(Utils.getNestedValue(record, origLabelField), subFormatObj, formatOptions);
         }
      }

      // Set field to be applied to text box after lookup selection (Soho uses the 'field' option, we use 'labelField')
      lookupOptions.field = lookupOptions.labelField;

      // Lookup elements don't use ng-model, so we need to watch for model changes and update the input element
      if (model && !ctrl.isGridCell) {

         //TODO: Consolidate with other getter/setter check.  (i.e. introduced with the AddressControl and the binding).
         var modelWatch = model;
         var ngModelOptions = $input.attr('ng-model-options');
         if (ngModelOptions && JSON.parse(ngModelOptions).getterSetter) {
            modelWatch += '()';
         }

         scope.$watch(modelWatch, function (newValue, oldValue) {
            var isInitialRun = newValue === oldValue;

            if (newValue || newValue === 0) {
               // Only adjust the display value when the model change is NOT the result of user selection/auto-selection
               // (because those already handled it)
               if (!status.isSelecting) {

                  // If field has a formatter, format the input value before displaying it
                  var display = formatter ? formatter(newValue, subFormatObj, formatOptions) : newValue;

                  // First, we can simply set the display value only
                  $input.val(display);

                  // Get the record metadata (notes indicator and full label display) if autoFetchMetadata is on and...
                  //    1. has a 'getRecordByValue' option, or
                  //    2. is an IES lookup
                  if (lookupOptions.autoFetchMetadata && (lookupOptions.getRecordByValue || ctrl.isIES)) {
                     self.getByKeyValue(newValue, null, null, null, null, lookupOptions, ctrl, function (record) {
                        var currentModelValue = scope.$eval(modelWatch);

                        // Do not proceed if newValue is no longer equal to model value because the model could change
                        // while waiting for the asynchronous getByKeyValue call to return which would make this record
                        // old and obsolete. The watch fired by the 2nd change will update label and notes indicator.
                        if (newValue !== currentModelValue) {
                           return;
                        }

                        // Update label if found record
                        if (record) {
                           ctrl.insertDisplayLabel(record, 'getRecordByValue');
                        }

                        // Update notes indicator
                        if (lookupOptions.notesField) {
                           ctrl.updateNotesIndicator(record ? Utils.getNestedValue(record, lookupOptions.notesField) : null);
                        }
                     });
                  }
               }
            } else if (!isInitialRun) {
               // Clear input field and notes indicator if model changed to blank
               $input.val('');
               ctrl.updateNotesIndicator(null);
            }

            // Reset is selecting flag
            status.isSelecting = false;
         });
      }

      // This data call fires when the lookup button is pressed
      lookupOptions.beforeShow = function (lookupPlugin, sohoCallback) {
         var value = $input.val();

         // If field has a parser, parse the input value before using it
         if (parser) {
            value = parser(value);
         }

         // Use input value in search call if user is currently typing
         var searchValue = status.isTyping ? value : null;

         // Perform search on open...
         // - always if true
         // - never if false
         // - otherwise, only if user has just type in a value
         var performInitialSearch = lookupOptions.searchOnOpen || ((searchValue || searchValue === 0) && lookupOptions.searchOnOpen !== false);

         // Build modal title from field's label
         var $label = $input.closest('.field').find('label');
         var labelText = $label.clone().find('span').remove().end().text();
         lookupPlugin.settings.title = labelText + ' ' + MessageService.get('global.lookup');

         // Build latest and greatest criteria
         var criteria = ctrl.getLatestCriteria(searchValue, 'lookup');

         // Populate the lkup ctrl for modal controllers to access
         // TODO: move this to controller if possible
         ctrl.getInitialSearchValue = function () {
            return searchValue;
         };

         // Reset dataset to empty
         lookupPlugin.settings.options.dataset = [];

         // Get modal view and then do search
         if (lookupOptions.modalView) {
            JsonViewService.getView(lookupOptions.modalView).then(function (html) {
               modalScope = scope.$new();

               // Add controller
               if (lookupOptions.modalController) {
                  html = html.replace('<div', '<div ng-controller="' + lookupOptions.modalController + '"');
               }

               // Compile the Angularized HTML before passing to lookup
               var compiledHtml = $compile(html)(modalScope);
               lookupPlugin.settings.modalContent = $(compiledHtml);

               // Get reference to grid
               var $lookupGrid = lookupPlugin.settings.modalContent.find('#lookup-datagrid');
               var grid = $lookupGrid.data('datagrid');

               // Perform initial search
               // Note: If the grid control has already be created, that means we are using our own grid,
               //       otherwise use SoHo's built-in lookup grid
               var defaultExists = false;
               var specialFacet;
               var lkupmdl;
               if (grid && ctrl.isIES) {
                  lkupmdl = $lookupGrid.scope().lkupmdl;
                  if (typeof $lookupGrid.scope().lkupmdl.storageKey !== 'undefined' && lkupmdl.criteria.LookupParameter) {
                     var storageKey = AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_ADVANCED_SEARCH + '_SK_' + lkupmdl.criteria.LookupParameter.toUpperCase();
                     var storageJson = localStorage[storageKey];
                     var storageValue = storageJson ? JSON.parse(storageJson) : null;
                     if (storageValue) {
                        for (var i = 0; i < storageValue.savedSearches.length; i++) {
                           if (storageValue.savedSearches[i].isDefault) {
                              defaultExists = true;
                              specialFacet = storageValue.savedSearches[i].criteria.selectedCriteriaFromModel;
                              break;
                           }
                        }
                     }
                  }
               }

               if (defaultExists) {
                  lkupmdl.facetCollapsed = false;
                  lkupmdl.defaultSearchExists = true;
                  lkupmdl.specialFacet = specialFacet;
                  sohoCallback($lookupGrid);
               } else {
                  if (performInitialSearch) {
                     ctrl.search(criteria, searchValue, function (results) {
                        if (grid) {
                           lkupmdl = $lookupGrid.scope().lkupmdl;
                           lkupmdl.dataset = results;
                           sohoCallback($lookupGrid);
                        } else {
                           lookupPlugin.settings.options.dataset = results;
                           sohoCallback();
                        }
                     });
                  } else {
                     if (grid) {
                        sohoCallback($lookupGrid);
                     } else {
                        sohoCallback();
                     }
                  }
               }

            });
         } else {
            if (performInitialSearch) {
               ctrl.search(criteria, searchValue, function (results) {
                  lookupPlugin.settings.options.dataset = results;
                  sohoCallback();
               });
            } else {
               sohoCallback();
            }
         }
      };

      // Must set data-init to false (or the data-init attribute must be set to false in the html),
      // otherwise Soho's standard initializer will initialize the lookup a 2nd time and break it.
      $input.attr('data-init', 'false');

      // Because we turn off the standard initializer on this lookup field, any mask on the field also does not get
      // initialized. Therefore we have to manually initialize the mask if it exists on this field.
      // Note: We only activate the mask if 'applyFormatMask' option is true because some lookups are like the Vendor
      //       lookup where it tends to have a dataFormat of Integer, but we don't want to constrain input to numbers
      //       only because the autocomplete search allows typing in things like the Vendor name too.
      if (lookupOptions.applyFormatMask && $input.attr('data-mask') !== undefined) {
         var maskOpts = $input.attr('data-options');
         $input.mask(maskOpts ? JSON.parse(maskOpts) : null);
      }

      // Tell SoHo to create the lookup
      var lookupApi = $input.lookup(lookupOptions).data('lookup');

      // Turn autoFocus off for the SoHo modal so that our own autoFocus will work
      $input.on('open', function (e, modal) {
         if (modal && modal.settings) {
            modal.settings.autoFocus = false;
         }
      });

      // Listen to after open event
      $input.on('afteropen', function (e, modal, grid) {

         // For some reason, SoHo is firing this event twice, so skip the 2nd one
         if (modal.element.data('hasThisEventFired')) {
            return;
         }
         modal.element.data('hasThisEventFired', true);

         // SoHo doesn't put lookup modal plugin on element, so we do it manually
         modal.element.data('modal', modal);

         // Set grid and modal references on lkup ctrl for modal controllers to access
         ctrl.grid = grid;
         ctrl.modal = modal;

         // Add busy indicator to modal
         var $modalContent = modal.element.find('.modal-content');
         if (!$modalContent.hasClass('busy')) {
            $modalContent.addClass('busy').busyindicator({ blockUI: true, displayDelay: 100 });
         }

         // Add view actions button to modal (for extend, personalize, etc.)
         if (lookupOptions.modalView) {
            var $button = $('<view-actions-button data-view-path="' + lookupOptions.modalView + '"></view-actions-button>');
            modal.element.find('.modal-header').append($button);
            $compile($button)(scope.$new());
            $button.initialize();
         }

         // Set up destroy of modal when lookup closes
         modal.element.one('close', function () {
            modal.destroy();
            if (modalScope) {
               modalScope.$destroy();
            }
         });
      });

      // Add logic to select all input text when clicking on the field
      self.addContentSelectionLogic($input);

      // Set isTyping flag to true when user enters input into the field (gets reset to false upon applied change)
      // Note: We cannot use the 'input' event because Soho blocks that event for masked fields
      var ignoreKeys = [9, 13, 16, 27, 35, 36, 37, 38, 39, 40]; // tab, enter, arrows, etc.
      $input.on('keyup', function (e) {

         // If printable character then set flag
         if (!ignoreKeys.includes(e.which)) {
            status.isTyping = true;
         }

         // Set isTyping flag to false upon enter or tab key (means they are done typing and searching)
         if (e.which === 13 || e.which === 9) {
            status.isTyping = false;
         }
      });

      // Also set flag when pasting into field
      $input.on('paste', function () {
         status.isTyping = true;
      });

      // Handle change event (for lookup selection)
      // Note: We know the change event is from lookup selection because Soho passes the selectedRows array
      $input.on('change', function (e, selectedRows) {
         if (selectedRows && selectedRows.length > 0) {
            handleLookupChange(e, selectedRows);
         }
      });

      // Handle focusout event (for user entry by typing value in)
      // Note: We use the focusout event (instead of change/blur) because it's the only event that browsers consistently
      //       provide the "event.relatedTarget" (element that is receiving the new focus)
      $input.on('focusout', function (e) {
         var focusedElement, isListOpen;

         // Proceed with user change under these conditions:
         // 1. User has changed the value in the input, and
         // 2. User is not selecting from autocomplete list (arrow keys or click), and
         // 3. User is not clicking open the lookup to perform a search

         // Abort if user has not changed the input value
         if (!status.isTyping) {
            return;
         }

         // Is auto-complete list open
         isListOpen = autoCompleteControl && autoCompleteControl.listIsOpen();

         // Capture which element focus has moved to
         focusedElement = e.relatedTarget;

         // Abort if user is selecting from the auto-complete list (check if focus is on an element in the list)
         if (isListOpen && focusedElement && autoCompleteControl.list.find(focusedElement).length > 0) {
            return;
         }

         // Abort if user is clicking open the lookup to perform a search (check if focus is on lookup trigger icon)
         if (focusedElement && $input.next('.trigger').is(focusedElement)) {
            return;
         }

         // Abort if grid cell of lookup is focused (soho causes a 2nd focusout event for grid cells which we need to ignore)
         if (ctrl.isGridCell && focusedElement && $input.closest('td').is(focusedElement)) {
            return;
         }

         handleUserChange(e);
      });

      // Handle change by lookup selection
      function handleLookupChange(e, selectedRows) {
         var record = selectedRows[0].data;
         var args = {
            label: $input.val(), // SoHo puts desired label into input field
            value: Utils.getNestedValue(record, lookupOptions.valueField),
            value2: lookupOptions.value2Field ? Utils.getNestedValue(record, lookupOptions.value2Field) : undefined,
            value3: lookupOptions.value3Field ? Utils.getNestedValue(record, lookupOptions.value3Field) : undefined,
            value4: lookupOptions.value4Field ? Utils.getNestedValue(record, lookupOptions.value4Field) : undefined,
            value5: lookupOptions.value5Field ? Utils.getNestedValue(record, lookupOptions.value5Field) : undefined,
            rowPointer: lookupOptions.rowPointerField ? Utils.getNestedValue(record, lookupOptions.rowPointerField) : undefined,
            rowId: lookupOptions.rowIdField ? Utils.getNestedValue(record, lookupOptions.rowIdField) : undefined,
            notesFlag: lookupOptions.notesField ? Utils.getNestedValue(record, lookupOptions.notesField) : undefined,
            source: 'lookup'
         };

         // TODO: ap - remove the passing of the object after figure out how to get geocode by row id or key!!!
         if (lookupKey === 'GeoCodeSalesUseTax' || lookupKey === 'GeoCodeEnterprise') {
            args.record = record;
         }

         // Set is selecting flag
         status.isSelecting = true;

         ctrl.applyChange(args, e);
      }

      // Handle change by user input
      // This code runs when user enters a value and tabs away or clicks away
      function handleUserChange(e) {
         var args = null;
         var inputValue = $input.val() || '';

         // If field has a parser, parse the input value before using it
         var value = parser ? parser(inputValue) : inputValue;

         // Get value to use for a clear (empty string or whatever the parser changes empty string to)
         var clearedValue = parser ? parser('') : '';

         // Handle clear of field by user (input value of empty string)
         if (!inputValue) {
            args = {
               value: clearedValue,
               clear: true
            };

            ctrl.applyChange(args, e);
         } else {
            var allowEntry = lookupOptions.allowEntry;

            // allowEntry may be a boolean or an expression string
            if (typeof allowEntry === 'string') {
               allowEntry = scope.$eval(allowEntry);
            }

            // If allowing entry, we need to apply value to model object right away
            // (since may be used in an action upon enter key or button click while input still has focus)
            if (allowEntry) {
               var maxLen = $input.attr('maxlength');

               // Make sure we don't allow entered value to be longer than the field's max length.
               // There were odd cases where such a large value could be applied after typing in when already
               // had a value with description inside.
               if (maxLen && value && typeof value === 'string' && value.length > parseInt(maxLen, 10)) {
                  // Clear the field
                  args = {
                     value: clearedValue,
                     invalid: true
                  };

                  ctrl.applyChange(args, e);

                  // Tell user need to clear and enter value afresh
                  MessageService.alert('global.alert', 'message.value.must.be.cleared.before.entering.new.value');
               } else {
                  args = {
                     value: value,
                     source: 'entry'
                  };

                  ctrl.applyChange(args, e);
               }
            } else if (lookupOptions.autoSelect && (lookupOptions.getRecordByValue || ctrl.isIES)) {
               // If doesn't have autoSelect turned off and has a 'getRecordByValue' option or is IES,
               // then try to get record by entered value

               // TODO: finish busy indicator on lookup fields once SoHo has it working
               //$input.trigger('start');

               // TODO: ap - if desired we can clear model right here while waiting for getByKeyValue so that
               //       grid cells don't display to the old model value in the meantime

               self.getByKeyValue(value, null, null, null, null, lookupOptions, ctrl, function (record) {
                  // Stop busy indicator
                  // TODO: commented out until SoHo has working and figure out modal busy then this busy issue
                  //$input.trigger('complete');

                  if (record) {
                     // Update input with full display label
                     ctrl.insertDisplayLabel(record, 'getRecordByValue');

                     // Note: It's possible that certain fields are named differently between the search results
                     //       objects and the 'getRecordByValue' record. So when doing an auto-select the
                     //       'recordValueField' and 'recordRowIdField' and options takes precedence if defined.
                     var valueField = lookupOptions.recordValueField || lookupOptions.valueField;
                     var value2Field = lookupOptions.recordValue2Field || lookupOptions.value2Field;
                     var value3Field = lookupOptions.recordValue3Field || lookupOptions.value3Field;
                     var value4Field = lookupOptions.recordValue4Field || lookupOptions.value4Field;
                     var value5Field = lookupOptions.recordValue5Field || lookupOptions.value5Field;
                     var rowPointerField = lookupOptions.recordRowPointerField || lookupOptions.rowPointerField;
                     var rowIdField = lookupOptions.recordRowIdField || lookupOptions.rowIdField;

                     args = {
                        label: ctrl.getDisplayLabel(record, 'getRecordByValue'),
                        value: Utils.getNestedValue(record, valueField),
                        value2: value2Field ? Utils.getNestedValue(record, value2Field) : undefined,
                        value3: value3Field ? Utils.getNestedValue(record, value3Field) : undefined,
                        value4: value4Field ? Utils.getNestedValue(record, value4Field) : undefined,
                        value5: value5Field ? Utils.getNestedValue(record, value5Field) : undefined,
                        rowPointer: rowPointerField ? Utils.getNestedValue(record, rowPointerField) : undefined,
                        rowId: rowIdField ? Utils.getNestedValue(record, rowIdField) : undefined,
                        notesFlag: lookupOptions.notesField ? Utils.getNestedValue(record, lookupOptions.notesField) : undefined,
                        source: 'autoselect'
                     };

                     // Set is selecting flag
                     status.isSelecting = true;

                     ctrl.applyChange(args, e);
                  } else if (!allowEntry) { // If couldn't find record and not allowing entry...
                     // Invalid entry - clear the model and field
                     args = {
                        value: clearedValue,
                        invalid: true
                     };

                     // Show error on field
                     if (ctrl.isGridCell) {
                        lookupOptions.parentGrid.showCellError(lookupOptions.parentGridRow, lookupOptions.parentGridCell, MessageService.get('message.invalid.value'));

                        // Clear error soon so cell doesn't stay red forever
                        setTimeout(function () {
                           lookupOptions.parentGrid.clearCellError(lookupOptions.parentGridRow, lookupOptions.parentGridCell);
                        }, 2500);
                     } else {
                        // Using tooltip instead of "addError" since the "Required" error message was conflicting
                        var tooltip = $input.tooltip({
                           content: MessageService.get('message.invalid.value'),
                           trigger: 'immediate',
                           isError: true
                        }).data('tooltip');

                        // Clear error soon since tooltip doesn't always go away by itself
                        setTimeout(function () {
                           tooltip.destroy();
                        }, 2500);
                     }

                     ctrl.applyChange(args, e);
                  }

                  // Update cell display if is grid cell (needs slight delay so doesn't clash with soho's processing)
                  if (ctrl.isGridCell) {
                     setTimeout(function () {
                        lookupOptions.parentGrid.updateCell(lookupOptions.parentGridRow, lookupOptions.parentGridCell);
                     }, 200);
                  }
               });
            } else if (!allowEntry) {
               // Clear field since not autoSelect and not allowEntry
               args = {
                  value: clearedValue,
                  invalid: true
               };

               ctrl.applyChange(args, e);

               // Update cell display if is grid cell (needs slight delay so doesn't clash with soho's processing)
               if (ctrl.isGridCell) {
                  setTimeout(function () {
                     lookupOptions.parentGrid.updateCell(lookupOptions.parentGridRow, lookupOptions.parentGridCell);
                  }, 200);
               }
            }
         }
      }

      // Set pieces on lookup controller
      ctrl.input = $input;
      ctrl.lookup = lookupApi;
      ctrl.options = lookupOptions;

      // Add auto-complete functionality
      if (lookupOptions.autoComplete) {
         ctrl.addAutoComplete();
      }

      // Handle selection event for auto-complete and MRU
      if (lookupOptions.autoComplete || lookupOptions.mruListKey) {
         $input.on('selected', function (e, a, autoCompArgs) {
            var args = {
               label: autoCompArgs.label,
               value: autoCompArgs.value,
               rowPointer: autoCompArgs.isMRU ? autoCompArgs.rowPointer : autoCompArgs.rowpointer,
               rowId: autoCompArgs.rowId,
               notesFlag: autoCompArgs.notesfl,
               source: autoCompArgs.isMRU ? 'mru' : 'autocomplete'
            };

            // If using 'value2Field' option, add value2 from MRU or from IES auto-complete 'key2' field
            if (lookupOptions.value2Field) {
               args.value2 = autoCompArgs.isMRU ? autoCompArgs.value2 : autoCompArgs.key2;
            }
            if (lookupOptions.value3Field) {
               args.value3 = autoCompArgs.isMRU ? autoCompArgs.value3 : autoCompArgs.key3;
            }
            if (lookupOptions.value4Field) {
               args.value4 = autoCompArgs.isMRU ? autoCompArgs.value4 : autoCompArgs.key4;
            }
            if (lookupOptions.value5Field) {
               args.value5 = autoCompArgs.isMRU ? autoCompArgs.value5 : autoCompArgs.key5;
            }

            // Set is selecting flag
            status.isSelecting = true;

            ctrl.applyChange(args, e);

            // If selecting via MRU, then we need to fetch record by value in order to check notes flag and update the indicator
            if (autoCompArgs.isMRU && lookupOptions.notesField && (lookupOptions.getRecordByValue || ctrl.isIES)) {
               self.getByKeyValue(autoCompArgs.value, autoCompArgs.value2, autoCompArgs.value3, autoCompArgs.value4, autoCompArgs.value5, lookupOptions, ctrl, function (record) {
                  ctrl.updateNotesIndicator(record ? Utils.getNestedValue(record, lookupOptions.notesField) : null);
               });
            }
         });
      }

      // Add 'Most Recently Used' List (via auto-complete control)
      if (lookupOptions.mruListKey) {
         MruService.activate($input, lookupOptions.mruListKey, lookupOptions.autoCompleteWidth, ctrl.isGridCell ? 11 : 0, ctrl.adjustAutoCompletePosition);
      }

      // Hold onto autocomplete control
      if (lookupOptions.autoComplete || lookupOptions.mruListKey) {
         autoCompleteControl = $input.data('autocomplete');
         ctrl.autoCompleteControl = autoCompleteControl;
      }

      // Fail-safe code to ensure the autocomplete/mru list doesn't remain on screen
      if (autoCompleteControl) {
         // Ensure the autocomplete/mru list gets closed when this element loses focus and remains without focus for a period of time.
         // There are a few edge cases where the list was remaining on the screen even after clicking away from the field (clicking on a dropdown field or menu button because of Soho's event.stopPropagation code)
         $input.on('blur', function () {
            setTimeout(function () {
               if (autoCompleteControl.listIsOpen() && !$input.is(':focus')) {
                  autoCompleteControl.closeList();
               }
            }, 200);
         });

         // Ensure the autocomplete/mru list gets removed from screen when this element is destroyed (angular emits the $destroy event when element is removed from DOM).
         // There are a few edge cases where the list was remaining on the screen even after the element was gone.
         $input.on('$destroy', function () {
            if (autoCompleteControl.listIsOpen()) {
               autoCompleteControl.closeList();
            }
         });
      }

      return lookupApi;
   };


   /* Helper methods */

   self.composeCriteria = function (criteria, field, value) {
      if (value === null) {
         return criteria;
      }
      if (field) {
         if ((!criteria.hasOwnProperty(field))) {
            criteria[field] = [];
            criteria[field].push(Utils.checkForTranslate(field, value));
            return criteria;
         }
         if (value && !criteria[field][0]) {
            criteria[field][0] = Utils.checkForTranslate(field, value);
         }
      }
      return criteria;
   };

   /**
    * Try to find a record with the value given by either...
    *    1. using the 'getRecordByValue' option
    *    2. doing an IES exact match search by key value
    */
   self.getByKeyValue = function (value, value2, value3, value4, value5, lookupOptions, ctrl, callback) {
      var criteria;
      var cachedData;

      // If has a getRecordByValue option, use it to get the record
      if (lookupOptions.getRecordByValue) {
         var pathOrFunction = lookupOptions.getRecordByValue;

         // String - the path of a simple GET call to fetch the record (value is inserted into path via {value} path param)
         if (typeof pathOrFunction === 'string') {
            cachedData = CacheService.get(!lookupOptions.cacheExactMatch, self.majorBucket, pathOrFunction, value);
            if (!cachedData) {
               DataService.get(pathOrFunction, { pathParams: { value: value } }, function (record) {
                  CacheService.set(!lookupOptions.cacheExactMatch, self.majorBucket, pathOrFunction, value, record, lookupOptions.cacheExactMatchTimeout);
                  callback(record);
               });
            } else {
               callback(cachedData);
            }
         } else {
            // Function - custom function to return record via callback

            // Pass latest criteria in case needed to get right record
            criteria = ctrl.getLatestCriteria(value, 'getRecordByValue');

            pathOrFunction(value, criteria, lookupOptions, function (record) {
               callback(record);
            });
         }
      } else {
         criteria = ctrl.getLatestCriteria(value, 'getRecordByValue');

         var facetCriteria = {};
         if (criteria.FacetQuery) {
            facetCriteria = criteria.FacetQuery;
         }

         if (criteria.LookupParameter === 'aret' || criteria.LookupParameter === 'kpet' || criteria.LookupParameter === 'oeeh' ||
            criteria.LookupParameter === 'vaeh' || criteria.LookupParameter === 'wteh' || criteria.LookupParameter === 'poeh') {

            if (value && !value2 && typeof value === 'string') {
               var orderParts = value.split('-');
               if (orderParts.length === 2) {
                  value = parseInt(orderParts[0]);
                  value2 = parseInt(orderParts[1]);
               } else {
                  value = parseInt(value);
               }
            }
         }

         var valueField = lookupOptions.getByKeyValueField || lookupOptions.valueField;
         var value2Field = lookupOptions.getByKeyValue2Field || lookupOptions.value2Field;
         var value3Field = lookupOptions.getByKeyValue3Field || lookupOptions.value3Field;
         var value4Field = lookupOptions.getByKeyValue4Field || lookupOptions.value4Field;
         var value5Field = lookupOptions.getByKeyValue5Field || lookupOptions.value5Field;

         facetCriteria = self.composeCriteria(facetCriteria, valueField, value);
         facetCriteria = self.composeCriteria(facetCriteria, value2Field, value2);
         facetCriteria = self.composeCriteria(facetCriteria, value3Field, value3);
         facetCriteria = self.composeCriteria(facetCriteria, value4Field, value4);
         facetCriteria = self.composeCriteria(facetCriteria, value5Field, value5);

         if (!$.isEmptyObject(facetCriteria)) {
            criteria.FacetQuery = facetCriteria;
         }

         criteria.IsExactMatch = true;

         if (lookupOptions.cacheExactMatchTimeout === 0) {
            lookupOptions.cacheExactMatchTimeout = 15;
         }

         if (criteria.FacetQuery) {
            criteria.FacetQuery = Utils.cleanseFacetCriteria(criteria.FacetQuery, criteria.LookupParameter);
            if (!criteria.FacetQuery) {
               callback(null);
               return;
            }
         }

         cachedData = CacheService.get(!lookupOptions.cacheExactMatch, self.majorBucket, criteria.LookupParameter, criteria);
         if (!cachedData) {
            DataService.post(Constants.SEARCH_PATH, { data: criteria, errorFunction: 'getkeyvalue' }, function (data) {
               if (data && data.hits.length > 0) {
                  CacheService.set(!lookupOptions.cacheExactMatch, self.majorBucket, criteria.LookupParameter, criteria, data.hits[0], lookupOptions.cacheExactMatchTimeout);
                  callback(data.hits[0]);
               } else {
                  callback(null);
               }
            });
         } else {
            callback(cachedData);
         }
      }
   };

   /**
    * Add logic to select all input text when clicking on the field. This helps usability when wanting to change
    * the value of a lookup field since makes it easier to clear out the old value.
    */
   self.addContentSelectionLogic = function ($input) {
      var isFirstClick = true;

      // Select all text on click (unless clicking again to position cursor more specifically)
      $input.on('click', function () {
         // If 2nd click don't select all text
         if (!isFirstClick) {
            return;
         }

         isFirstClick = false;

         // Select all text (after a delay since works better across browsers), but only if element is still focused
         // to avoid flashing cursor focus trap (since select causes focus event to fire if no longer focused)
         setTimeout(function () {
            if ($input.is(':focus')) {
               $input[0].select();
            }
         }, 1);
      });

      // Reset flag on blur
      $input.on('blur', function () {
         isFirstClick = true;
      });
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
    * Get format options specified on field, as well as any default values from metadata
    */
   self.getFormatOptions = function (formatOptionsMeta, formatOptions) {
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
   };

});