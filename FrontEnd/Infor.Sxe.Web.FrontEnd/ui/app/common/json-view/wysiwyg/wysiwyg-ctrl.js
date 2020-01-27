'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('wysiwyg', {
      url: '/wysiwyg',
      deepStateRedirect: {default: 'wysiwyg.master'},
      sticky: true,
      data: {
         tabTitle: 'title.wysiwyg'
      }
   });
   $stateProvider.state('wysiwyg.master', {
      url: '/master?mode&viewPath&extensionRowId&{cono:int}',
      sticky: true,
      views: {
         'wysiwyg@': {
            templateUrl: 'ui/app/common/json-view/wysiwyg/views/wysiwyg-view.html',
            controller: 'WysiwygCtrl'
         }
      },
      data: {
         screenId: 'sx_extension-master' // publish screenId more suitable for extend mode (since that screen is user-facing)
      }
   });
});

/**
 * Main controller for the WYSIWYG
 */
app.controller('WysiwygCtrl', function ($compile, $scope, $stateParams, $timeout, $translate, ContextEntities, ControlMeta, ControlTemplatesMeta, CustomControls, DynamicOptionSets, ExtensionService, OptionSetService, Lookups, FieldFormats, GridColumnFormats, GridColumnTypes, DataService, MessageService, ModalService, JsonViewService, WysiwygService, JsonViewConverter, TabService, UserService, Utils) {
   var converter = null;
   $scope.jsonView = null;
   $scope.viewPath = $stateParams.viewPath;
   $scope.isExtendMode = $stateParams.mode === 'extend';
   $scope.isNewMode = $stateParams.mode === 'new';
   $scope.isDevMode = !$scope.isExtendMode && !$scope.isNewMode;

   // Column sub type to span number map
   var columnSubTypeToNumericMap = {
      '1/12': 1,
      '1/6': 2,
      '1/4': 3,
      '1/3': 4,
      '5/12': 5,
      '1/2': 6,
      '7/12': 7,
      '2/3': 8,
      '3/4': 9,
      '5/6': 10,
      '11/12': 11,
      '1': 12
   };

   // Default security levels by icon
   var iconSecurityLevel = {
      'icon-edit': 3,
      'icon-save': 3,
      'icon-new-document': 4,
      'icon-copy': 4,
      'icon-delete': 5
   };

   // Get available i18n strings (exclude special strings so that they aren't used by non-special controls)
   $scope.translationStrings = [];
   var transStrings = $scope.translationStrings;
   var table = $translate.getTranslationTable();
   for (var key in table) {
      // Filter out strings starting with 'special.', 'menu.', and 'wysiwyg.' since those are special-purpose strings
      if (table.hasOwnProperty(key) && !key.startsWith('special.') && !key.startsWith('menu.') && !key.startsWith('wysiwyg.')) {
         transStrings.push({label: table[key], value: key});
      }
   }

   // Get standard SVG icons
   $scope.iconSet = [];
   $('#svg-icon-list').find('symbol').each(function() {
      var label = this.id;

      // Clean up label
      label = label.replace('icon-', '').replace(/-/g, ' ');

      $scope.iconSet.push({label: label, value: this.id});
   });

   // Get extended SVG icons
   $scope.iconSetExtended = [];
   $('#svg-icon-list-extended').find('symbol').each(function() {
      var label = this.id;

      // Clean up label
      label = label.replace('icon-', '').replace(/-/g, ' ');

      $scope.iconSetExtended.push({label: label, value: this.id});
   });

   // Combine icon list for drop down
   $scope.buttonIconOptions = $scope.iconSet.concat($scope.iconSetExtended);

   // Array for static option sets
   $scope.staticOptionSets = [];

   // Get available option code sets
   $scope.codeOptionSets = [];
   for (var dynOpt in DynamicOptionSets) {
      if (DynamicOptionSets.hasOwnProperty(dynOpt)) {
         $scope.codeOptionSets.push({label: dynOpt, value: dynOpt});
      }
   }

   // Get available lookup meta definitions
   $scope.lookupMetaList = [];
   for (var lkup in Lookups) {
      if (Lookups.hasOwnProperty(lkup)) {
         $scope.lookupMetaList.push({label: lkup, value: lkup});
      }
   }

   // Get available context entities
   $scope.contextEntityList = [];
   for (var key in ContextEntities) {
      if (ContextEntities.hasOwnProperty(key)) {
         var entity = ContextEntities[key];
         $scope.contextEntityList.push({label: entity.displayName, value: key});
      }
   }

   // Get available FieldFormats
   $scope.dataFormatList = [];
   for (var key in FieldFormats) {
      if (FieldFormats.hasOwnProperty(key)) {
         var formatMeta = FieldFormats[key];
         $scope.dataFormatList.push({label: formatMeta.displayName, value: key, group: formatMeta.group});
      }
   }

   // Get available GridColumnTypes
   $scope.gridColumnTypeList = [];
   for (var key in GridColumnTypes) {
      if (GridColumnTypes.hasOwnProperty(key)) {
         var columnType = GridColumnTypes[key];
         $scope.gridColumnTypeList.push({label: columnType.displayName, value: key});
      }
   }

   // Get available GridColumnFormats
   $scope.gridColumnFormatList = [];
   for (var key in GridColumnFormats) {
      if (GridColumnFormats.hasOwnProperty(key)) {
         var columnFormat = GridColumnFormats[key];
         $scope.gridColumnFormatList.push({label: columnFormat.displayName, value: key, group: columnFormat.group});
      }
   }

   // Get available custom controls
   $scope.customControls = [];
   for (var key in CustomControls) {
      if (CustomControls.hasOwnProperty(key)) {
         var custMeta = CustomControls[key];
         $scope.customControls.push({key: key, displayName: custMeta.displayName});
      }
   }

   // Yes/No/Default drop down options
   $scope.yesNoDefaultOptions = [
      {label: 'Default'}, // We purposely don't have a value here b/c we want a non-existant/undefined property to defer to default behavior
      {label: 'Yes', value: true},
      {label: 'No', value: false}
   ];
   $scope.yesNoDefaultConditionOptions = [
      {label: 'Default'}, // We purposely don't have a value here b/c we want a non-existant/undefined property to defer to default behavior
      {label: 'Yes', value: true},
      {label: 'No', value: false},
      {label: 'Condition', value: ''}
   ];

   // Add blank option options (drop downs)
   $scope.addBlankOptions = [
      {label: 'Default'}, // We purposely don't have a value here b/c we want a non-existant/undefined property to defer to default behavior
      {label: 'Yes', value: true},
      {label: 'No', value: false}
   ];

   // Decimal places options
   $scope.decimalPlacesOptions = [
      {label: '0', value: 0},
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: '4', value: 4},
      {label: '5', value: 5},
      {label: '6', value: 6},
      {label: '7', value: 7},
      {label: '8', value: 8},
      {label: '9', value: 9}
   ];

   // Default grid page size
   $scope.defaultPageSizeOptions = [
      {label: 'Default'}, // We purposely don't have a value here b/c we want a non-existant/undefined property to defer to default behavior
      {label: '5', value: 5},
      {label: '10', value: 10},
      {label: '25', value: 25},
      {label: '50', value: 50}
   ];

   // Grid selectable row options
   $scope.selectableOptions = [
      {label: 'Default'}, // We purposely don't have a value here b/c we want a non-existant/undefined property to defer to default behavior
      {label: 'Single', value: 'single'},
      {label: 'Multiple', value: 'multiple'},
      {label: 'None', value: false}
   ];

   // File Field options for Single/Multiple (file import control)
   $scope.singleMultipleOptions = [
      {label: 'Single', value: false},
      {label: 'Multiple', value: true}
   ];

   // Security level options
   $scope.securityLevelOptions = [
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3 - Edit, Save', value: 3},
      {label: '4 - New, Copy', value: 4},
      {label: '5 - Delete', value: 5}
   ];

   // Update list of hidden Context Fields for this view
   $scope.updateHiddenContextFields = function () {
      var list = [];
      var viewChildren = $scope.jsonView && $scope.jsonView.children ? $scope.jsonView.children : [];

      for (var i = 0; i < viewChildren.length; i++) {
         var control = viewChildren[i];

         if (control.type === 'CONTEXT_FIELD') {
            list.push({ control: control, entity: ContextEntities[control.contextEntity] });
         }
      }

      $scope.hiddenContextFields = list;
   };

   // Get JSON view source (with extension or default)
   $scope.getView = function (level, cono, extensionRowId) {
      if ($scope.isExtendMode) {
         $scope.extensionLevel = level;
         $scope.extensionLevelText = level === 'cono' ? MessageService.get('global.company') : MessageService.get('global.system');
         $scope.extensionCono = cono;

         JsonViewService.getViewForExtend($scope.viewPath, cono, extensionRowId, function (defaultJsonView, jsonView, extensionData, webExtRecord) {
            converter = new JsonViewConverter($scope.viewPath, 'extend');
            $scope.defaultJsonView = defaultJsonView;
            $scope.jsonView = jsonView;
            $scope.extensionData = extensionData;
            $scope.webExtRecord = webExtRecord;
            $scope.defaultControlMap = ExtensionService.buildControlMap(defaultJsonView);
            $scope.defaultParentMap = ExtensionService.buildParentMap(defaultJsonView);
            renderView(jsonView);
            $scope.updateHiddenContextFields();

            // Initialize deleted controls list
            $scope.deletedControlsList.initialize(extensionData, converter, $scope.defaultControlMap, $scope.defaultParentMap, renderControl);
         });
      } else if ($scope.isNewMode) {
         $scope.extensionLevel = level;
         $scope.extensionLevelText = level === 'cono' ? MessageService.get('global.company') : MessageService.get('global.system');
         $scope.extensionCono = cono;

         JsonViewService.getNewViewForExtend($scope.viewPath, cono, extensionRowId, function (jsonView, webExtRecord) {
            // Proceed if record found
            if (webExtRecord) {
               converter = new JsonViewConverter($scope.viewPath, 'extend-new');
               $scope.jsonView = jsonView; // the extension data is the full json view
               $scope.webExtRecord = webExtRecord;
               renderView(jsonView);
               $scope.updateHiddenContextFields();
            } else {
               // Otherwise send them back to the modal (this can happen if user selects a level that doesn't match with the actual record)
               MessageService.alert('global.alert', 'wysiwyg.error.extension.not.found.level');
               $scope.showExtensionOptionsModal();
            }
         });
      } else {
         JsonViewService.getViewForDevelopment($scope.viewPath, function (jsonView) {
            converter = new JsonViewConverter($scope.viewPath, 'dev');
            $scope.jsonView = jsonView;
            renderView(jsonView);
            $scope.updateHiddenContextFields();
         });
      }
   };

   $scope.showExtensionOptionsModal = function () {
      ModalService.showModal('/ui/app/common/json-view/extension/views/extension-options-modal.json', 'ExtensionOptionsCtrl as eo', $scope, function (modal) {
         $scope.extensionOptionsModal = modal;
      });
   };

   // Get view or show modal for extension options (if extensionRowId param is passed, then we know which view extension to get)
   if ($scope.isDevMode) {
      $scope.getView();
   } else if ($stateParams.extensionRowId) {
      var level = $stateParams.cono === 0 ? 'system' : 'cono';
      $scope.getView(level, $stateParams.cono, $stateParams.extensionRowId);
   } else {
      $scope.showExtensionOptionsModal();
   }

   // Toggle outlines
   $scope.toggleOutlines = function () {
      var selection = $('#wysiwyg-content').find('.wys-control:not(.field)');
      var menuOption = $('#show-outlines');

      if (menuOption.hasClass('is-checked')) {
         selection.removeClass('outlined');
         menuOption.removeClass('is-checked');
      } else {
         selection.addClass('outlined');
         menuOption.addClass('is-checked');
      }
   };

   // Output preview of live HTML
   $scope.outputHtml = function () {
      var html = new JsonViewConverter($scope.viewPath, 'live').getHtml($scope.jsonView);

      // TODO: is there a nice way we can format the HTML?
      //html = html.replace(/<\/div>/g, '</div>\n');

      $('body').modal({
         title: 'HTML',
         content: '<textarea rows="20" cols="80" style="width: 770px; max-width: none;">' + html + '</textarea>',
         width: 850,
         height: 600,
         buttons: [{
            text: 'Close',
            isDefault: true,
            click: function(e, modal) {
               modal.destroy();
            }
         }]
      });
   };

   // Output JSON (useful for extensions)
   $scope.outputJson = function () {
      var json;

      // If extending, the relevant json is the diff, otherwise it's the full json view
      if ($scope.isExtendMode) {
         // Get the extension data just like we do before saving
         var extensionData = ExtensionService.extractDifferences($scope.defaultJsonView, angular.copy($scope.jsonView));
         WysiwygService.preProcessExtensionDataBeforeSave(extensionData, converter);
         json = JSON.stringify(extensionData, null, 2);
      } else {
         json = JSON.stringify($scope.jsonView, null, 2);
      }

      $('body').modal({
         title: 'JSON',
         content: '<textarea rows="20" cols="80" style="width: 770px; max-width: none;">' + json + '</textarea>',
         width: 850,
         height: 600,
         buttons: [{
            text: 'Close',
            isDefault: true,
            click: function(e, modal) {
               modal.destroy();
            }
         }]
      });
   };

   // Save requested
   $scope.saveView = function () {
      var jsonViewCopy;

      if ($scope.isExtendMode) {
         // Make copy before pre-process and save
         jsonViewCopy = angular.copy($scope.jsonView);

         // Extract the differences between extended view and default view to be saved
         $scope.extensionData = ExtensionService.extractDifferences($scope.defaultJsonView, jsonViewCopy);

         // Clean up the extension json (for readability and size reduction)
         WysiwygService.preProcessExtensionDataBeforeSave($scope.extensionData, converter);

         // Save extension
         JsonViewService.saveExtensionRecord($scope.viewPath, $scope.extensionData, $scope.webExtRecord, function (webExtRecord) {
            $scope.webExtRecord = webExtRecord;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else if ($scope.isNewMode) {
         // Make copy before pre-process and save
         jsonViewCopy = angular.copy($scope.jsonView);

         // Clean up the json just like in dev mode
         WysiwygService.preProcessViewBeforeSave(jsonViewCopy, converter);

         // Save extension
         JsonViewService.saveExtensionRecord($scope.viewPath, jsonViewCopy, $scope.webExtRecord, function (webExtRecord) {
            $scope.webExtRecord = webExtRecord;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else {
         // Save default view
         WysiwygService.save($scope.viewPath, $scope.jsonView, converter);
      }
   };

   // Delete extension
   $scope.deleteExtension = function () {
      MessageService.okCancel('wysiwyg.extension.delete', 'question.are.you.sure.you.want.to.delete', function () {
         JsonViewService.deleteExtensionRecord($scope.viewPath, $scope.webExtRecord, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            TabService.closeTab('wysiwyg');
         });
      });
   };

   // Import grid columns requested
   $scope.importColumns = function (parentId) {
      $scope.importColumnsOptions = {
         type: 'sample'
      };

      // Make sure scope applies before proceeding
      $timeout(function () {
         $('#import-grid-columns').message({
            title: 'Import Grid Columns',
            dialogType: 'General',
            width: 1000,
            buttons: [{
               text: 'Cancel',
               click: function (e, modal) {
                  modal.close();
               }
            }, {
               text: 'Import',
               isDefault: true,
               click: function (e, modal) {
                  var grid = converter.controlIdToControlMap[parentId];

                  WysiwygService.importColumns($scope.importColumnsOptions, grid, converter);

                  renderControl(grid);

                  modal.close();
               }
            }]
         }).initialize();
      });
   };

   // Import fields requested
   $scope.importFields = function (parentId) {
      $scope.importFieldsOptions = {};

      //TODO: where to put this line?
      $('#importFieldsBindObject').tooltip();

      // Make sure scope applies before proceeding
      $timeout(function () {
         $('#importFieldsView').message({
            title: 'Import Fields From REST API',
            dialogType: 'General',
            width: 450,
            height: 300,
            buttons: [{
               text: 'Import',
               isDefault: true,
               click: function (e, modal) {
                  var parent = converter.controlIdToControlMap[parentId];

                  WysiwygService.importFields($scope.importFieldsOptions, parent, converter, function () {
                     renderControl(parent);
                  });
                  modal.close();
               }
            }, {
               text: 'Cancel',
               click: function (e, modal) {
                  modal.close();
               }
            }]
         }).initialize();
      });
   };

   /**
    * When a certain field changes, delete the given property if it's blank (undefined, null, empty).
    * This is used to keep JSON cleaner since there's usually no need to store blank properties.
    */
   $scope.deleteIfBlank = function (property, force) {
      var control = $scope.activeControl;
      var object, prop;

      // Important! For extensions we do not remove blank properties (otherwise we would lose the change)
      if ($scope.isExtendMode && !force) {
         return;
      }

      // Compound property
      if (property.includes('.')) {
         var pieces = property.split('.');

         object = control[pieces[0]];
         prop = pieces[1];
      }
      // Regular
      else {
         object = control;
         prop = property;
      }

      // Delete if blank
      if (!object[prop]) {
         delete object[prop];
      }
   };

   /**
    * Perform deleteIfBlank no matter what mode we're in.
    */
   $scope.forceDeleteIfBlank = function (property) {
      $scope.deleteIfBlank(property, true);
   };

   /**
    * When a certain field changes, delete the given property if it's null (useful for numeric fields).
    * This is used to keep JSON cleaner since there's usually no need to store null properties.
    */
   $scope.deleteIfNull = function (property, force) {
      var control = $scope.activeControl;
      var object, prop;

      // Important! For extensions we do not remove null properties (otherwise we would lose the change)
      if ($scope.isExtendMode && !force) {
         return;
      }

      // Compound property
      if (property.includes('.')) {
         var pieces = property.split('.');

         object = control[pieces[0]];
         prop = pieces[1];
      }
      // Regular
      else {
         object = control;
         prop = property;
      }

      // Delete if null
      if (object[prop] === null) {
         delete object[prop];
      }
   };

   /**
    * Perform deleteIfNull no matter what mode we're in.
    */
   $scope.forceDeleteIfNull = function (property) {
      $scope.deleteIfNull(property, true);
   };

   /**
    * When a certain field changes, delete the given property if it's false.
    * This is used to keep JSON cleaner since there's no need to store false properties for some fields.
    */
   $scope.deleteIfFalse = function (property) {
      var control = $scope.activeControl;

      // Important! For extensions we do not remove false properties (otherwise we would lose the change)
      if ($scope.isExtendMode) {
         return;
      }

      if (control[property] === false) {
         delete control[property];
      }
   };

   /**
    * Convert input change to a javascript number
    */
   $scope.convertToNumber = function (property) {
      var control = $scope.activeControl;
      var value = control[property];

      if (typeof value === 'string' && value.startsWith('{')) {
         // keep dynamic interpolation strings as they are
      } else if (value) {
         var newValue = parseFloat(value);

         if (isNaN(newValue)) {
            delete control[property];
         } else {
            control[property] = newValue;
         }
      } else {
         delete control[property];
      }
   };

   /**
    * Is the value a string
    */
   $scope.isString = function (value) {
      return typeof value === 'string';
   };

   /**
    * Is current control one of the given types
    */
   $scope.isType = function (types) {
      return types.indexOf($scope.activeControl.type) >= 0;
   };

   /**
    * Is current control a field with one of the given field types
    */
   $scope.isFieldType = function (types) {
      var control = $scope.activeControl;
      return control.type === 'FIELD' && types.indexOf(control.subType) >= 0;
   };

   /**
    * Is current control a grid column with one of the given types
    */
   $scope.isGridColumnType = function (types) {
      var control = $scope.activeControl;
      return control.type === 'GRID_COL' && types.indexOf(control.subType) >= 0;
   };

   /**
    * Is current control a field (form or info) with numeric data format
    */
   $scope.isNumericField = function () {
      var control = $scope.activeControl;
      var dataFormat = control.dataFormat;

      if (control.type === 'FIELD' &&
         (dataFormat === 'DECIMAL' || dataFormat === 'DECIMAL_TEXT' || dataFormat === 'INTEGER' || dataFormat === 'INTEGER_TEXT' || dataFormat === 'CURRENCY' || dataFormat === 'PERCENT')) {
         return true;
      } else {
         return false;
      }
   };

   /**
    * Is current control a form field with numeric data format
    */
   $scope.isNumericFormField = function () {
      return $scope.isNumericField() && $scope.activeControl.subType !== 'INFO';
   };

   /**
    * Is current control a grid column with a numeric data format
    */
   $scope.isNumericGridColumn = function () {
      var control = $scope.activeControl;
      var dataFormat = control.dataFormat;

      if (control.type === 'GRID_COL' &&
         (dataFormat === 'DECIMAL' || dataFormat === 'DECIMAL_TEXT' || dataFormat === 'INTEGER' || dataFormat === 'INTEGER_TEXT' || dataFormat === 'CURRENCY' || dataFormat === 'PERCENT')) {
         return true;
      } else {
         return false;
      }
   };

   /**
    * For grid columns to know if parent grid is editable
    */
   $scope.isParentGridEditable = function (controlId) {
      var grid = converter.controlIdToParentMap[controlId];

      if (grid && grid.options && grid.options.editable) {
         return true;
      } else {
         return false;
      }
   };

   /**
    * For grid columns to know if parent grid is a lookup grid
    */
   $scope.isParentGridLookup = function (controlId) {
      var grid = converter.controlIdToParentMap[controlId];
      return grid && grid.subType === 'LOOKUP_GRID';
   };

   /**
    * Get sample number from the current number format settings
    */
   $scope.getSampleFormattedNumber = function () {
      var control = $scope.activeControl;
      var signDisplay = '';
      var digitsDisplay = '';
      var decimalsDisplay = '';

      if (!control.sign) {
         signDisplay = '(-)';
      } else if (control.sign === '-') {
         signDisplay = '-';
      }

      if (control.digits) {
         for (var i = 1; i <= control.digits; i++) {
            digitsDisplay += '9';
         }

         // Add commas to digits
         digitsDisplay = Locale.formatNumber(digitsDisplay, {style: 'integer'});
      }

      if (control.decimals) {
         for (var i = 1; i <= control.decimals; i++) {
            decimalsDisplay += i.toString();
         }
      }

      return signDisplay + digitsDisplay + (decimalsDisplay ? '.' : '') + decimalsDisplay;
   };

   /**
    * Handle field sub-type changes (initialize dataFormat, etc.)
    */
   $scope.fieldTypeChanged = function () {
      var control = $scope.activeControl;
      var subType = control.subType;

      // Update data format
      if (subType === 'CHECKBOX' || subType === 'SWITCH') {
         control.dataFormat = 'LOGICAL';
      } else if (subType === 'DATE') {
         control.dataFormat = 'DATE';
      } else if (subType === 'TIME') {
         control.dataFormat = 'TIME';
      } else {
         control.dataFormat = $scope.isExtendMode ? '': undefined;
      }

      // Notify that data format has changed
      $scope.dataFormatChanged();

      // Update the File Selection Type field (default to Single which is multiple: false, otherwise remove the prop)
      control.multiple = subType === 'FILE' ? false : undefined;
   };

   /**
    * Handle grid column sub-type changes (initialize dataFormat, etc.)
    */
   $scope.gridColumnTypeChanged = function () {
      var control = $scope.activeControl;
      var subType = control.subType;
      var keepDataFormat = subType === 'HYPERLINK';

      // Do not proceed if keeping dataFormat
      if (keepDataFormat) {
         return;
      }

      if (subType === 'CHECKBOX' || subType === 'SWITCH') {
         control.dataFormat = 'LOGICAL';
      } else if (subType === 'DATE') {
         control.dataFormat = 'DATE';
      } else if (subType === 'TIME') {
         control.dataFormat = 'TIME';
      } else {
         control.dataFormat = $scope.isExtendMode ? '': undefined;
      }

      // Notify that data format has changed
      $scope.dataFormatChanged();
   };

   /**
    * Handle grid column tooltip type changes
    */
   $scope.gridColumnTooltipTypeChanged = function () {
      var control = $scope.activeControl;

      // Do the normal deleteIfBlank
      $scope.deleteIfBlank('tooltipType');

      // Clear the tooltip string (for extensions we do not remove the property, otherwise we would lose the change)
      control.tooltip = $scope.isExtendMode ? '': undefined;
   };

   // Handle grid column sortable changed
   $scope.gridColumnSortableChanged = function () {
      var control = $scope.activeControl;

      // If turning off sort and a defaultSort is set, then revert the defaultSortColumn option (running it through our deleteIfBlank logic)
      if (control.sortable === false && control.defaultSort) {
         control.defaultSort = '';
         $scope.deleteIfBlank('defaultSort');
      }
   };

   /**
    * Handle field dataFormat changes
    */
   $scope.dataFormatChanged = function () {
      var control = $scope.activeControl;

      // Remove numeric format properties if data format is no longer numeric
      if (!$scope.isNumericFormField() && !$scope.isNumericGridColumn()) {
         delete control.sign;
         delete control.digits;
         delete control.decimals;
      }

      // Clear decimals if changed to integer
      if (control.dataFormat === 'INTEGER' || control.dataFormat === 'INTEGER_TEXT') {
         control.decimals = $scope.isExtendMode ? null: undefined;
      }

      // Clear sub format, format options, and set format meta
      control.subFormat = $scope.isExtendMode ? '': undefined;
      control.formatOptions = {};
      $scope.setFormatMeta();
   };

   /**
    * Handle change of a format option
    */
   $scope.formatOptionChanged = function (property) {
      var control = $scope.activeControl;

      if (control.formatOptions) {
         var value = control.formatOptions[property];

         // Remove null/undefined options (keep empty string since may have meaning)
         if ((value === null || value === undefined) && !$scope.isExtendMode) {
            delete control.formatOptions[property];
         }
      }
   };

   /**
    * Update current format meta (field format or grid column format) based on the selected data format
    */
   $scope.setFormatMeta = function () {
      var control = $scope.activeControl;
      var formatMeta = null;

      if (control.type === 'FIELD' && control.dataFormat) {
         formatMeta = FieldFormats[control.dataFormat];
      } else if (control.type === 'GRID_COL' && control.dataFormat) {
         formatMeta = GridColumnFormats[control.dataFormat];
      }

      $scope.formatMeta = formatMeta;
   };

   /**
    * Handle options type change (drop downs & radios)
    */
   $scope.optionsTypeChanged = function () {
      var control = $scope.activeControl;

      // Delete properties specific to the options type
      delete control.metaGroup;
      delete control.meta;
   };

   /**
    * Handle option meta group change (drop downs & radios)
    */
   $scope.optionGroupChanged = function () {
      var groupKey = $scope.activeControl.metaGroup;

      // Clear the list of option sets
      Utils.replaceArray($scope.staticOptionSets, []);

      // Clear the meta selection
      $scope.activeControl.meta = $scope.isExtendMode ? '': undefined;

      // Get new list by group
      if (groupKey) {
         OptionSetService.getGroup(groupKey, function (group) {
            Object.getOwnPropertyNames(group).forEach(function (optSet) {
               $scope.staticOptionSets.push({label: optSet, value: optSet});
            });
         });
      }
   };

   /**
    * Handle when security level changed
    */
   $scope.securityLevelChanged = function () {
      var icon = $scope.activeControl.icon;
      var level = $scope.activeControl.securityLevel;
      var standardIconLevel = icon ? iconSecurityLevel[icon] : null;

      // Warn if not using the standard security level for current icon
      if (standardIconLevel && standardIconLevel !== level) {
         MessageService.confirmation('global.warning', 'You have changed the security level to a non-standard level for the current icon type (' + icon + '). The normal level is ' + standardIconLevel + '. This may cause major problems for users with certain security. Please be very sure that this is what you want to do.');
      }
   };

   /**
    * Handle lookup meta type changes
    */
   $scope.lookupTypeChanged = function () {
      var control = $scope.activeControl;
      var lookupType = control.meta;
      var lookupMeta = lookupType ? Lookups[lookupType] : null;
      var oldEntity = $scope.contextEntity;
      var newEntity = lookupMeta ? lookupMeta.contextEntity : null;

      // If lookup type cleared, or lookup's context entity is different than before, then fire change for context entity
      if (!lookupType || oldEntity !== newEntity) {
         $scope.contextEntityChanged();
      }
   };

   /**
    * Handle contextEntity changes
    */
   $scope.contextEntityChanged = function () {
      // Remove context values, and set ContextEntity
      delete $scope.activeControl.contextValues;
      $scope.setContextEntity();
   };

   /**
    * Update current ContextEntity metadata object based on the selected context entity or lookup type
    */
   $scope.setContextEntity = function () {
      var control = $scope.activeControl;
      var contextEntity = null;
      var lookupMeta = null;

      // Lookups get entity from lookup type, otherwise get from control
      if (control.subType === 'LOOKUP') {
         lookupMeta = control.meta ? Lookups[control.meta] : null;
         contextEntity = lookupMeta && lookupMeta.contextEntity ? ContextEntities[lookupMeta.contextEntity] : null;
      } else if (control.contextEntity) {
         contextEntity = ContextEntities[control.contextEntity];
      }

      $scope.contextEntity = contextEntity;
   };

   /**
    * Handle when grid editable flag changed
    */
   $scope.gridEditableChanged = function () {
      var control = $scope.activeControl;
      var editable = control.options ? control.options.editable : false;

      // Make sure to remove editable condition if it's no longer an editable grid
      if (!editable) {
         delete control.conditionEditable;
      }
   };

   /**
    * Handle when grid column editable flag changed
    */
   $scope.gridColumnEditableChanged = function () {
      var control = $scope.activeControl;

      // Make sure to remove editable condition if it's no longer an editable column
      if (!control.editable) {
         delete control.conditionEditable;
      }
   };

   /**
    * Open the action menu for a control
    */
   $scope.openControlMenu = function (controlId) {
      $scope.control = converter.controlIdToControlMap[controlId];

      // Get control element
      var $control = $('#wysiwyg-content').find('[data-control-id="' + controlId + '"]');

      // If can't find within wysiwyg content, search globally (since may be a popdown which gets moved elsewhere)
      if ($control.length === 0) {
         $control = $('body').find('[data-control-id="' + controlId + '"]');
      }

      // Get actions button
      var $actionBtn = $control.find('.control-toolbar:first button');

      // Grids position their actions button deeper
      if ($scope.control.type === 'GRID') {
         $actionBtn = $control.find('.grid-body:first').find('.control-toolbar:first button');
      }

      // Anchor menu to the action button, or the control (or a nearby control if hidden so menu shows nearby)
      var menuAnchor, moreOpts;
      if ($actionBtn.length) {
         menuAnchor = $actionBtn;
      } else if ($control.is(':hidden') && $control.closest('.toolbar').length) {
         // For hidden toolbar buttons (overflowed) anchor to nearest visible button (otherwise menu displays in far corner)
         menuAnchor = $control.closest('.toolbar').find('.buttonset button:visible:last');
         moreOpts = { offset: { x: 0, y: 45 } };
      } else {
         menuAnchor = $control;
      }

      // Close menu if currently open
      if (menuAnchor.is('.is-open')) {
         var popupMenu = menuAnchor.data('popupmenu');
         if (popupMenu) {
            popupMenu.close();
         }
      } else {
         // Open menu from anchor point (delay until scope applies so that menu is updated for current control)
         setTimeout(function () {
            var options = { menu: 'control-menu', trigger: 'immediate', attachToBody: true };
            if (moreOpts) {
               Utils.extend(options, moreOpts);
            }
            menuAnchor.popupmenu(options);
         }, 150);
      }
   };

   /**
    * Add a control quickly without opening detail modal
    */
   $scope.addControl = function (type, subType, parentId) {
      var parent = parentId ? converter.controlIdToControlMap[parentId] : $scope.jsonView;

      var newControl = WysiwygService.initNewControl(converter, type, subType);

      // Update JSON (add new control to end of parent's children)
      if (!parent.children) parent.children = [];
      parent.children.push(newControl);

      // Update maps
      converter.controlIdToControlMap[newControl.id] = newControl;
      converter.controlIdToParentMap[newControl.id] = parent;

      // Initialize grid with toolbar and a new column
      if (type === 'GRID') {
         var newToolbar = WysiwygService.initNewControl(converter, 'TOOLBAR', '');
         newControl.controls = {toolbar: newToolbar};
         converter.controlIdToControlMap[newToolbar.id] = newToolbar;
         converter.controlIdToParentMap[newToolbar.id] = newControl;

         var newGridCol = WysiwygService.initNewControl(converter, 'GRID_COL', 'TEXT');
         newControl.children.push(newGridCol);
         converter.controlIdToControlMap[newGridCol.id] = newGridCol;
         converter.controlIdToParentMap[newGridCol.id] = newControl;
      }

      // Initialize tab set with a new tab
      if (type === 'TAB_SET') {
         var newTab = WysiwygService.initNewControl(converter, 'TAB', '');
         newControl.children.push(newTab);
         converter.controlIdToControlMap[newTab.id] = newTab;
         converter.controlIdToParentMap[newTab.id] = newControl;
      }

      // Initialize exp area with a new row/col
      if (type === 'EXP_AREA') {
         var newRow = WysiwygService.initNewControl(converter, 'ROW', '');
         newControl.children.push(newRow);
         converter.controlIdToControlMap[newRow.id] = newRow;
         converter.controlIdToParentMap[newRow.id] = newControl;

         var newColumn = WysiwygService.initNewControl(converter, 'COL', '1');
         newRow.children.push(newColumn);
         converter.controlIdToControlMap[newColumn.id] = newColumn;
         converter.controlIdToParentMap[newColumn.id] = newRow;
      }

      // Initialize module container with its basic pieces
      if (type === 'MOD_CNTR') {
         var newModToolbar = WysiwygService.initNewControl(converter, 'TOOLBAR', '');
         newControl.controls = {toolbar: newModToolbar};
         converter.controlIdToControlMap[newModToolbar.id] = newModToolbar;
         converter.controlIdToParentMap[newModToolbar.id] = newControl;

         var newModContent = WysiwygService.initNewControl(converter, 'MOD_CONTENT', '');
         newControl.controls.content = newModContent;
         converter.controlIdToControlMap[newModContent.id] = newModContent;
         converter.controlIdToParentMap[newModContent.id] = newModContent;
      }

      // Initialize swap list with two new lists
      if (type === 'SWAP_LIST') {
         var newList = WysiwygService.initNewControl(converter, 'SWAP_LIST_LIST', '');
         newControl.children.push(newList);
         converter.controlIdToControlMap[newList.id] = newList;
         converter.controlIdToParentMap[newList.id] = newControl;

         var newList2 = WysiwygService.initNewControl(converter, 'SWAP_LIST_LIST', '');
         newControl.children.push(newList2);
         converter.controlIdToControlMap[newList2.id] = newList2;
         converter.controlIdToParentMap[newList2.id] = newControl;
      }

      // Initialize wizard with a new tick
      if (type === 'WIZARD') {
         var newTick = WysiwygService.initNewControl(converter, 'WIZARD_TICK', '');
         newControl.children.push(newTick);
         converter.controlIdToControlMap[newTick.id] = newTick;
         converter.controlIdToParentMap[newTick.id] = newControl;
      }

      // Update view
      renderControl(parent);

      return newControl;
   };

   /**
    * Add a "named" control quickly without opening detail modal
    * (a named control goes on the parent's 'controls' property, not 'children')
    */
   $scope.addNamedControl = function (type, subType, parentId, name) {
      var parent = parentId ? converter.controlIdToControlMap[parentId] : $scope.jsonView;

      // Check if parent already has such a control
      if (parent.controls && parent.controls[name]) {
         MessageService.error('Error', 'This control already has a ' + name + '.');
         return;
      }

      var newControl = WysiwygService.initNewControl(converter, type, subType);

      // Update JSON (add new control with name to parent's controls)
      if (!parent.controls) parent.controls = {};
      parent.controls[name] = newControl;

      // Update maps
      converter.controlIdToControlMap[newControl.id] = newControl;
      converter.controlIdToParentMap[newControl.id] = parent;

      // Update view
      renderControl(parent);

      return newControl;
   };

   /**
    * Add a back button to a toolbar
    */
   $scope.addBackButton = function (parentId) {
      var toolbar = converter.controlIdToControlMap[parentId];
      var btnSetId;

      // Add controls container if not yet there
      if (!toolbar.controls) toolbar.controls = {};

      // Add btn set if not yet there
      if (!toolbar.controls.navBtns) {
         var btnSet = $scope.addNamedControl('BTN_SET', 'TBAR_NAV', parentId, 'navBtns');
         btnSetId = btnSet.id;
      } else {
         btnSetId = toolbar.controls.navBtns.id;
      }

      // Add back button (wait until btn set render & initialize is completed)
      setTimeout(function () {
         var newControl = $scope.addControl('BTN', 'ICON', btnSetId);

         // Give needed properties to toolbar back buttons
         newControl.label = 'special.button.back';
         newControl.icon = 'icon-left-arrow';

         // Need to render toolbar to pick up all changes (after previous render fully completed)
         setTimeout(function () {
            renderControl(toolbar);
         }, 50);
      }, 50);
   };

   /**
    * Add a drilldown button to a field (used instead of hyperlinking a field)
    */
   $scope.addFieldDrilldownButton = function (parentId) {

      // Add control
      var newControl = $scope.addNamedControl('BTN', 'ICON', parentId, 'actionBtn');

      // Give properties specific to field drilldown buttons
      newControl.label = 'global.inquire';
      newControl.icon = 'icon-drilldown';
      newControl.isLabelTooltip = true;

      // Render again to pick up all changes (after previous render fully completed)
      setTimeout(function () {
         renderControl(newControl);
      }, 50);
   };

   /**
    * Add a row inside a control
    */
   $scope.addRow = function (parentId) {
      var parent = parentId ? converter.controlIdToControlMap[parentId] : $scope.jsonView;

      var newRow = WysiwygService.initNewControl(converter, 'ROW');

      // Update JSON (add new row to end of parent's children)
      if (!parent.children) parent.children = [];
      parent.children.push(newRow);

      // Update maps
      converter.controlIdToControlMap[newRow.id] = newRow;
      converter.controlIdToParentMap[newRow.id] = parent;

      // Initialize row with a full column
      var newColumn = WysiwygService.initNewControl(converter, 'COL', '1');
      newRow.children.push(newColumn);
      converter.controlIdToControlMap[newColumn.id] = newColumn;
      converter.controlIdToParentMap[newColumn.id] = newRow;

      // Update view
      renderControl(parent);
   };

   /**
    * Insert a new row before/after an existing row
    */
   $scope.insertRow = function (rowId, before) {
      var currentRow = converter.controlIdToControlMap[rowId];
      var parent = converter.controlIdToParentMap[rowId];

      var newRow = WysiwygService.initNewControl(converter, 'ROW');

      // Update JSON (add new row before/after current row)
      var toArray = parent.children;
      var currentIndex = toArray.indexOf(currentRow);
      var index = before ? currentIndex : currentIndex + 1;
      toArray.splice(index, 0, newRow);

      // Update maps
      converter.controlIdToControlMap[newRow.id] = newRow;
      converter.controlIdToParentMap[newRow.id] = parent;

      // Initialize row with a full column
      var newColumn = WysiwygService.initNewControl(converter, 'COL', '1');
      newRow.children.push(newColumn);
      converter.controlIdToControlMap[newColumn.id] = newColumn;
      converter.controlIdToParentMap[newColumn.id] = newRow;

      // Update view
      renderControl(parent);
   };

   /**
    * Insert a new column before/after an existing column
    */
   $scope.insertColumn = function (columnId, before) {
      var currentColumn = converter.controlIdToControlMap[columnId];
      var parent = converter.controlIdToParentMap[columnId];

      // Check if allowed to add before proceeding
      if (parent.children.length >= 12) {
         MessageService.error('Error', 'More than 12 columns in a row is not allowed.');
      } else {
         // Make new column
         var newColumn = WysiwygService.initNewControl(converter, 'COL', '1');

         // Update JSON (add new column before/after current column)
         var toArray = parent.children;
         var currentIndex = toArray.indexOf(currentColumn);
         var index = before ? currentIndex : currentIndex + 1;
         toArray.splice(index, 0, newColumn);

         // Update column span for all columns in row
         updateRowColumnSpan(parent);

         // Update maps
         converter.controlIdToControlMap[newColumn.id] = newColumn;
         converter.controlIdToParentMap[newColumn.id] = parent;

         // Update view
         renderControl(parent);
      }
   };

   /**
    * Move a control back or forward in its parent's list
    */
   $scope.moveControl = function (controlId, isBack) {
      var control = converter.controlIdToControlMap[controlId];
      var parent = converter.controlIdToParentMap[controlId];
      var array = parent.children;
      var currentIndex = array ? array.indexOf(control) : -1;

      // Check if allowed to move before proceeding
      if (!array || currentIndex < 0) {
         MessageService.error('global.error', 'wysiwyg.error.move.unmovable');
      } else if (isBack && currentIndex === 0) {
         MessageService.error('global.error', 'wysiwyg.error.move.back');
      } else if (!isBack && currentIndex === array.length - 1) {
         MessageService.error('global.error', 'wysiwyg.error.move.forward');
      } else {
         // Remove control from parent
         array.splice(currentIndex, 1);

         // Re-add at location - 1 or location + 1
         if (isBack) {
            array.splice(currentIndex - 1, 0, control);
         } else {
            array.splice(currentIndex + 1, 0, control);
         }

         // Update view
         renderControl(parent);
      }
   };

   $scope.changeColumnWidth = function (controlId, width) {
      var column = converter.controlIdToControlMap[controlId];

      column.subType = width;

      // Warn if widths don't add up to 100% of row
      validateColumnWidths(column);

      // Update view
      renderControl(column);
   };

   /**
    * Copy a control and add the new one directly after the current
    */
   $scope.copyControl = function (controlId) {
      var control = converter.controlIdToControlMap[controlId];
      var parent = converter.controlIdToParentMap[controlId];
      var newControl = {};

      // If the control to copy is not in the children list of the parent, then we cannot copy (i.e. Module Containers)
      if (!parent.children || parent.children.indexOf(control) < 0) {
         MessageService.error('global.error', 'Copying the pieces of a template is not allowed.');
         return;
      }

      // Copy first level of properties in order so that the resulting JSON of the control is still in nice order
      for (var prop in control) {
         if (control.hasOwnProperty(prop)) {
            // Don't copy children (if we want a deep copy option, we would need to recursively add new id's to all children)
            if (prop !== 'children' && prop !== 'controls') {
               // Do a deep copy of each property to avoid problems
               newControl[prop] = angular.copy(control[prop]);
            }
         }
      }

      // Give new id
      newControl.id = converter.getNextAvailableId();

      // Add new control directly after copied control
      parent.children.splice(parent.children.indexOf(control) + 1, 0, newControl);

      // Update maps
      converter.controlIdToControlMap[newControl.id] = newControl;
      converter.controlIdToParentMap[newControl.id] = parent;

      // Update view
      renderControl(parent);
   };

   /**
    * Open the detail view for adding a new control
    */
   $scope.newControl = function (type, subType, parentId) {
      var newControl = WysiwygService.initNewControl(converter, type, subType, true);

      // Set on scope
      $scope.activeControl = newControl;

      // For custom controls, get reference to options view
      if ($scope.activeControl.type === 'CUSTOM') {
         var custMeta = CustomControls[$scope.activeControl.subType];
         $scope.customOptionsView = custMeta.optionsView;
      } else {
         $scope.customOptionsView = null;
      }

      // Get control detail view (grids have their own view)
      var fileName = $scope.activeControl.type === 'GRID' ? 'grid-options.html' : 'control-detail.html';
      DataService.get('ui/app/common/json-view/wysiwyg/views/' + fileName, function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtml = $compile(html)(newScope);
         var $detailView = $(compiledHtml);

         // Set format meta for the selected data format, as well as ContextEntity
         $scope.setFormatMeta();
         $scope.setContextEntity();

         // Open modal
         $('body').contextualactionpanel({
            title: MessageService.get(ControlMeta[type].displayName) + ' | ' + MessageService.get('global.new'),
            content: $detailView,
            initializeContent: false,
            trigger: 'immediate',
            id: 'control-detail-modal',
            buttons: [
               {
                  text: 'Ok',
                  cssClass: 'btn-tertiary',
                  icon: '#icon-confirm',
                  click: function (e, modal) {
                     var parent = parentId ? converter.controlIdToControlMap[parentId] : $scope.jsonView;

                     // Get new id
                     newControl.id = converter.getNextAvailableId();

                     // Update JSON
                     if (!parent.children) parent.children = [];
                     parent.children.push(newControl);

                     // Update maps
                     converter.controlIdToControlMap[newControl.id] = newControl;
                     converter.controlIdToParentMap[newControl.id] = parent;

                     // Update view
                     renderControl(parent);

                     modal.destroy();
                     newScope.$destroy();
                     $scope.updateHiddenContextFields();

                     // Apply scope since click event wasn't via angular
                     if (!$scope.$$phase) {
                        $scope.$apply();
                     }
                  }
               },
               {
                  text: 'Cancel',
                  cssClass: 'btn-tertiary',
                  icon: '#icon-cancel',
                  click: function (e, modal) {
                     modal.destroy();
                     newScope.$destroy();
                  }
               }
            ]
         });
      });
   };

   $scope.editControl = function (controlId) {
      // Edit with copy of the control (actual data only changed upon OK)
      $scope.activeControl = angular.copy(converter.controlIdToControlMap[controlId]);

      // For custom controls, get reference to options view
      if ($scope.activeControl.type === 'CUSTOM') {
         var custMeta = CustomControls[$scope.activeControl.subType];
         $scope.customOptionsView = custMeta.optionsView;
      } else {
         $scope.customOptionsView = null;
      }

      // Get control detail view (grids have their own view)
      var fileName = $scope.activeControl.type === 'GRID' ? 'grid-options.html' : 'control-detail.html';
      DataService.get('ui/app/common/json-view/wysiwyg/views/' + fileName, function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtml = $compile(html)(newScope);
         var $detailView = $(compiledHtml);

         // Set format meta for the selected data format, as well as ContextEntity
         $scope.setFormatMeta();
         $scope.setContextEntity();

         // Get corresponding option set list (if has option group)
         if (($scope.activeControl.subType === 'DROP_DOWN' || $scope.activeControl.subType === 'MULTI_SELECT' || $scope.activeControl.subType === 'RADIO_SET') && $scope.activeControl.metaGroup) {

            // Clear the list of option sets
            Utils.replaceArray($scope.staticOptionSets, []);

            // Get new list by group
            OptionSetService.getGroup($scope.activeControl.metaGroup, function (group) {
               Object.getOwnPropertyNames(group).forEach(function (optSet) {
                  $scope.staticOptionSets.push({label: optSet, value: optSet});
               });
            });
         }

         // Open modal
         $('body').contextualactionpanel({
            title: MessageService.get(ControlMeta[$scope.activeControl.type].displayName) + ' | ' + MessageService.get('global.edit'),
            content: $detailView,
            initializeContent: false,
            trigger: 'immediate',
            id: 'control-detail-modal',
            buttons: [
               {
                  text: 'Ok',
                  cssClass: 'btn-tertiary',
                  icon: '#icon-confirm',
                  click: function (e, modal) {
                     var control = converter.controlIdToControlMap[controlId];

                     // Copy properties on edited control to actual control
                     Utils.replaceObject(control, $scope.activeControl);

                     // For columns, warn if widths don't add up to 100% of row
                     if (control.type === 'COL') {
                        validateColumnWidths(control);
                     }

                     // Update view
                     // - edited grid columns need to re-render grid in order to update mock grid cells
                     // - edited tabs need to re-render tab set in order to update tab labels
                     // - edited options need to re-render field/grid column in order to update SoHo drop down
                     // - edited menu options need to re-render parent in order to update menu display
                     // - edited wizard ticks need to re-render wizard in order to re-init wizard
                     if (control.type === 'GRID_COL' || control.type === 'TAB' || control.type === 'OPT'
                        || control.type === 'MENU_OPT' || control.type === 'WIZARD_TICK') {
                        var parent = converter.controlIdToParentMap[controlId];
                        renderControl(parent);
                     } else {
                        renderControl(control);
                     }

                     modal.destroy();
                     newScope.$destroy();
                     $scope.updateHiddenContextFields();

                     // Apply scope since click event wasn't via angular
                     if (!$scope.$$phase) {
                        $scope.$apply();
                     }
                  }
               },
               {
                  text: 'Cancel',
                  cssClass: 'btn-tertiary',
                  icon: '#icon-cancel',
                  click: function (e, modal) {
                     modal.destroy();
                     newScope.$destroy();
                  }
               },
               {
                  text: 'Delete',
                  cssClass: 'btn-tertiary',
                  icon: '#icon-delete',
                  click: function (e, modal) {
                     $scope.deleteControl($scope.activeControl.id, function () {
                        modal.destroy();
                        newScope.$destroy();
                     });
                  }
               }
            ]
         });
      });
   };

   // Preview an HTML Control to see what it looks like live
   $scope.previewControl = function (controlId) {
      var control = converter.controlIdToControlMap[controlId];

      // Get DOM element of control
      var $controlElement = $('#wysiwyg-content').find('[data-control-id="' + control.id + '"]');

      // Hide wysiwyg control
      $controlElement.hide();

      // Create preview container with html value inside
      var html = '<div initialize>';
      html += '<div class="toolbar standalone" style="border-width: 0; min-height: auto;"><div class="buttonset">';
      html += '<button class="btn-tertiary" type="button" ng-click="closeControlPreview(' + controlId + ')"><svg class="icon"><use xlink:href="#icon-close"></use></svg><span>Close Preview</span></button>';
      html += '</div></div>';
      html += control.value || '';
      html += '</div>';
      var $previewContainer = $(html);

      // Add preview container after wysiwyg control
      $controlElement.after($previewContainer);

      // Angular compile the html (with delayed Soho initialize)
      $compile($previewContainer)($scope.$new());
   };

   // Close the preview of an HTML Control
   $scope.closeControlPreview = function (controlId) {
      var control = converter.controlIdToControlMap[controlId];

      // Get DOM element of control
      var $controlElement = $('#wysiwyg-content').find('[data-control-id="' + control.id + '"]');

      // Show wysiwyg control
      $controlElement.show();

      // Remove preview container
      $controlElement.next().remove();
   };

   // Handle potential security level adjustment when icon changes
   $scope.iconChanged = function () {
      var icon = $scope.activeControl.icon;
      var iconLevel = icon ? iconSecurityLevel[icon] : null;
      var currentSecurityLevel = $scope.activeControl.securityLevel;

      // If icon has a default security level, set it and notify
      if (icon && iconLevel) {
         $scope.activeControl.securityLevel = iconLevel;

         MessageService.confirmation('Security Level', 'The selected icon (' + icon + ') is normally associated with the security level of <b>' + iconLevel + '</b>. The security level has been updated for this control. If you need to override this value, you can change the level manually.');
      } else if (currentSecurityLevel) {
         // Warn if changing the icon of a button that has a security level set
         MessageService.alert('Alert', 'This control has a security level set. Please double check if you should change or clear the security level since you have changed the icon.');
      }
   };

   // Icon selected
   $scope.selectIcon = function (icon) {
      $scope.activeControl.icon = icon;

      // Close modal
      var modal = $('#icon-options').closest('.contextual-action-panel').data('modal');
      modal.destroy();

      // Trigger potential security adjustment based on icon
      $scope.iconChanged();
   };

   // Show full icon picker
   $scope.editIcon = function () {
      DataService.get('ui/app/common/json-view/wysiwyg/views/icon-options.html', function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtml = $compile(html)(newScope);
         var $modal = $(compiledHtml);

         // Apply scope before opening modal
         $timeout(function () {

            // Open modal
            $('body').contextualactionpanel({
               title: 'Icons',
               content: $modal,
               initializeContent: false,
               trigger: 'immediate',
               buttons: [
                  {
                     text: 'Cancel',
                     cssClass: 'btn-tertiary',
                     icon: '#icon-cancel',
                     click: function (e, modal) {
                        modal.destroy();
                        newScope.$destroy();
                     }
                  }
               ]
            });
         });
      });
   };

   // Edit hyperlink of a control
   $scope.editHyperlink = function (linkName) {

      // Get existing link (copy so changes not made until OK) or create new
      if ($scope.activeControl.hyperlinks && $scope.activeControl.hyperlinks[linkName]) {
         $scope.link = angular.copy($scope.activeControl.hyperlinks[linkName]);
      } else {
         $scope.link = {};
      }

      DataService.get('ui/app/common/json-view/wysiwyg/views/hyperlink-options.html', function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtml = $compile(html)(newScope);
         var $modal = $(compiledHtml);

         // Apply scope before opening modal
         $timeout(function () {

            // Open modal
            $('body').contextualactionpanel({
               title: 'Hyperlink',
               content: $modal,
               initializeContent: false,
               trigger: 'immediate',
               buttons: [
                  {
                     text: 'Ok',
                     cssClass: 'btn-tertiary',
                     icon: '#icon-confirm',
                     click: function (e, modal) {
                        if (!$scope.activeControl.hyperlinks) {
                           $scope.activeControl.hyperlinks = {};
                        }

                        // Set updated link
                        $scope.activeControl.hyperlinks[linkName] = $scope.link;

                        $scope.$apply(function () {
                           modal.destroy();
                           newScope.$destroy();
                        });
                     }
                  },
                  {
                     text: 'Cancel',
                     cssClass: 'btn-tertiary',
                     icon: '#icon-cancel',
                     click: function (e, modal) {
                        modal.destroy();
                        newScope.$destroy();
                     }
                  },
                  {
                     text: 'Delete',
                     cssClass: 'btn-tertiary',
                     icon: '#icon-delete',
                     click: function (e, modal) {
                        if ($scope.activeControl.hyperlinks && $scope.activeControl.hyperlinks[linkName]) {
                           delete $scope.activeControl.hyperlinks[linkName];

                           $scope.$apply(function () {
                              modal.destroy();
                              newScope.$destroy();
                           });
                        }
                     }
                  }
               ]
            });
         });
      });
   };

   // Edit hot keys
   $scope.editHotKeys = function (isForView) {

      // If doing hot keys on the main view, then need to set activeControl
      if (isForView) {
         $scope.activeControl = $scope.jsonView;
      }

      // Get modal and open it
      DataService.get('ui/app/common/json-view/wysiwyg/views/hot-key-options.html', function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtmlElem = $compile(html)(newScope);
         var $modal = $(compiledHtmlElem);

         // Hold on to modal object
         $modal.one('open', function (e, modal) {
            $scope.hotKeyModal = modal;
         });

         // Destroy new scope when modal closes
         $modal.one('close', function () {
            newScope.$destroy();
         });

         // Open modal
         $('body').contextualactionpanel({
            content: $modal,
            initializeContent: false,
            trigger: 'immediate',
            autoFocus: false
         });
      });
   };

   // Edit inline drop down options
   $scope.editInlineOptions = function () {
      // Make converter accessible for this component
      $scope.converter = converter;

      // Get modal and open it
      DataService.get('ui/app/common/json-view/wysiwyg/views/inline-options.html', function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtmlElem = $compile(html)(newScope);
         var $modal = $(compiledHtmlElem);

         // Hold on to modal object
         $modal.one('open', function (e, modal) {
            $scope.inlineOptionsModal = modal;
         });

         // Destroy new scope when modal closes
         $modal.one('close', function () {
            newScope.$destroy();
            $scope.converter = null;
         });

         // Open modal
         $('body').contextualactionpanel({
            content: $modal,
            initializeContent: false,
            trigger: 'immediate',
            autoFocus: false
         });
      });
   };

   // Edit additional options of a lookup
   $scope.editLookupOptions = function () {
      var control = $scope.activeControl;
      var oldOptions = angular.copy(control.options);
      control.options = control.options || {};
      var options = control.options;

      // Get lookup options view
      DataService.get('ui/app/common/json-view/wysiwyg/views/lookup-options.html', function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtml = $compile(html)(newScope);
         var $modal = $(compiledHtml);

         // Apply scope before opening modal
         $timeout(function () {
            $scope.searchParamsArray = [];

            // Init param array with copies of existing params (so only change upon clicking button)
            var searchParams = options.searchParams;
            if (searchParams) {
               for (var prop in searchParams) {
                  if (searchParams.hasOwnProperty(prop)) {
                     var obj = angular.copy(searchParams[prop]);

                     // For non-references (constants), need to fill type and stringify objects to see and edit properly
                     if (typeof obj === 'boolean' || typeof obj === 'number' || typeof obj === 'string') {
                        obj = { type: typeof obj, value: obj };
                     } else if (obj === null) {
                        obj = { type: 'object', value: 'null' };
                     } else if (Array.isArray(obj)) {
                        obj = { type: 'array', value: JSON.stringify(obj) };
                     } else if (typeof obj === 'object' && obj.type !== 'REF' && obj.type !== 'ITEM') {
                        obj = { type: 'object', value: JSON.stringify(obj) };
                     }

                     // Fill name prop with key prop
                     obj.name = prop;

                     $scope.searchParamsArray.push(obj);
                  }
               }
            }

            // Open modal
            $('body').contextualactionpanel({
               title: 'Lookup Options',
               content: $modal,
               initializeContent: false,
               trigger: 'immediate',
               buttons: [
                  {
                     text: 'Ok',
                     cssClass: 'btn-tertiary',
                     icon: '#icon-confirm',
                     click: function (e, modal) {

                        // Validate params before making changes
                        for (var i = 0; i < $scope.searchParamsArray.length; i++) {
                           var param = $scope.searchParamsArray[i];

                           if (param.type === 'array' || param.type === 'object') {
                              try {
                                 JSON.parse(param.value);
                              } catch (error) {
                                 // Show JSON error and abort
                                 MessageService.error('global.error', error.message);
                                 return;
                              }
                           }
                        }

                        // Clear searchParams object
                        options.searchParams = {};

                        // Convert array into keyed object
                        $scope.searchParamsArray.forEach(function (param) {
                           if (param.name) {
                              if (param.type === 'REF' || param.type === 'ITEM') {
                                 options.searchParams[param.name] = param;

                                 // Delete redundant param name
                                 delete param.name;
                              } else if (param.type === 'boolean') {
                                 if (param.value === 'true' || param.value === true) {
                                    options.searchParams[param.name] = true;
                                 } else if (param.value === 'false' || param.value === false) {
                                    options.searchParams[param.name] = false;
                                 }
                              } else if (param.type === 'number') {
                                 options.searchParams[param.name] = parseFloat(param.value);
                              } else if (param.type === 'array' || param.type === 'object') {
                                 options.searchParams[param.name] = JSON.parse(param.value);
                              } else if (param.type === 'string') {
                                 // Handle string with blank value gracefully as empty string
                                 options.searchParams[param.name] = param.value || "";
                              }
                           }
                        });

                        // Delete search params object if it's empty (unless extend mode)
                        if (options.searchParams && Object.keys(options.searchParams).length === 0 && !$scope.isExtendMode) {
                           delete options.searchParams;
                        }

                        modal.destroy();
                        newScope.$destroy();
                     }
                  },
                  {
                     text: 'Cancel',
                     cssClass: 'btn-tertiary',
                     icon: '#icon-cancel',
                     click: function (e, modal) {
                        // Revert back to old options
                        control.options = oldOptions;
                        modal.destroy();
                        newScope.$destroy();
                     }
                  }
               ]
            });
         });
      });
   };

   // Store the resized width of a grid column (called from the mock-grid directive)
   $scope.resizeGridColumn = function (controlId, width) {
      var control = converter.controlIdToControlMap[controlId];
      control.width = width;

      // Warn developers about setting column widths (since default is for Soho to auto-size based on data in the cells)
      if (!$scope.hasWarnedGridColumnWidths) {
         MessageService.alert('Warning', 'Setting the width of a grid column is usually not recommended.');
         $scope.hasWarnedGridColumnWidths = true;
      }
   };

   $scope.deleteControl = function (controlId, deleteCallback) {
      var control = converter.controlIdToControlMap[controlId];
      var parent = converter.controlIdToParentMap[controlId];

      // Check if allowed to delete before proceeding
      if (control.type === 'VIEW') {
         MessageService.error('Error', 'Deleting the view is not allowed.');
      } else if (control.type === 'COL' && parent.children.length === 1) {
         MessageService.error('Error', 'Deleting the last column of a row is not allowed.');
      } else if (parent.type === 'MOD_CNTR' && (control.type === 'MOD_CONTENT' || control.type === 'TOOLBAR')) {
         MessageService.error('Error', 'Deleting the pieces of a template is not allowed.');
      } else {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var childIndex = parent.children ? parent.children.indexOf(control) : -1;

            // Remove control from parent's children
            if (childIndex >= 0) {
               parent.children.splice(childIndex, 1);
            }
            // Or, remove from parent's controls
            else {
               var childControls = parent.controls;

               // Find this control among the property names in parent's controls
               if (childControls) {
                  for (var prop in childControls) {
                     if (childControls.hasOwnProperty(prop)) {
                        if (childControls[prop] === control) {
                           delete childControls[prop];
                        }
                     }
                  }
               }
            }

            // Update control id maps
            delete converter.controlIdToControlMap[controlId];
            delete converter.controlIdToParentMap[controlId];

            // TODO: remove all decendants' controls ids from maps

            // If column, update column span for all columns in row
            if (control.type === 'COL') {
               updateRowColumnSpan(parent);
            }

            // Update view: fields do quick DOM removal for faster field deletion
            if (control.type === 'FIELD') {
               $('[data-control-id="' + control.id + '"]').remove();
            } else {
               renderControl(parent);
            }

            $scope.updateHiddenContextFields();

            // Add to deleted controls list for extensions (if deleting a default control)
            if ($scope.isExtendMode && $scope.defaultControlMap[controlId]) {
               $scope.deletedControlsList.addToList(control);
            }

            if (deleteCallback) {
               deleteCallback();
            }
         });
      }
   };

   // Get display text for a hot key
   $scope.getHotKeyDisplay = function (hotKey) {
      var display = '';

      if (hotKey.altKey) {
         display += 'Alt + ';
      }
      if (hotKey.ctrlKey) {
         display += 'Ctrl + ';
      }
      if (hotKey.shiftKey) {
         display += 'Shift + ';
      }

      // Turn key code into display character
      if (hotKey.keyCode) {
         display += String.fromCharCode(hotKey.keyCode);
      }

      return display;
   };

   // TODO: finish this method if needed
   $scope.generateHtmlId = function () {
      var parent = converter.controlIdToParentMap[$scope.activeControl.id] || $scope.jsonView;

      // Try to generate HTML id
      var htmlId = WysiwygService.generateHtmlId(converter, $scope.activeControl, parent);

      // TODO: Check if unique
      var unique = true;

      // Proceed if id is unique and complete
      if (unique && !(htmlId.charAt(htmlId.length - 1) === '-')) {
         $scope.activeControl.htmlId = htmlId;
      } else {
         // Manual html id input
         $('body').modal({
            title: 'Control ID',
            content: '<div class="message">There is not enough information to generate a unique control id. Please complete the id with a sensible name.</div>' +
            '<input type="text" id="wysiwyg-control-id-entry" value="' + newControl.id + '" />',
            buttons: [
               {
                  text: 'Ok',
                  isDefault: true,
                  click: function (e, modal) {
                     var manualId = $('#wysiwyg-control-id-entry').val();

                     // Check if unique
                     if (converter.hasId(manualId)) {
                        MessageService.error('Error', 'The id is already in use. Please enter a different id.');
                     } else {
                        newControl.id = manualId;
                        modal.destroy();
                     }
                  }
               },
               {
                  text: 'Cancel',
                  click: function (e, modal) {
                     modal.destroy();
                  }
               }
            ]
         });
      }
   };

   // Initial render of view
   function renderView(jsonView) {
      var $view = $('#wysiwyg-content');

      // Pre-process JSON (add transient properties where needed)
      WysiwygService.preProcessViewBeforeRender(jsonView, converter);

      // Build full html
      var html = converter.getHtml(jsonView);

      // Add html to view
      var compiledHTML = $compile(html)($scope);
      $view.html(compiledHTML);

      // Apply post render processing
      postRenderProcessing(jsonView, $view, null);

      // Add drag and drop events once on the content container (otherwise duplicate events can fire)
      addDragDropEvents($view.get(0));
   }

   // Subsequent refreshes of a control in the hierarchy
   function renderControl(control) {
      var reselectionControl = null;
      var parent = converter.controlIdToParentMap[control.id];

      // Note: If rendering button in toolbar, need to render whole toolbar to get button's children to update
      //       If rendering grid column, need to render whole grid in order to update mock cells
      //       If rendering tab, need to render whole tab set for the control to initialize properly
      if ((control.type === 'BTN' && parent.type === 'TOOLBAR') || control.type === 'GRID_COL' || control.type === 'TAB') {
         control = parent;
         parent = converter.controlIdToParentMap[parent.id];
      }

      // Build html
      var html = converter.buildControl(control, parent);

      // Get DOM element of control
      var $controlElement = $('#wysiwyg-content').find('[data-control-id="' + control.id + '"]');

      // If rendering a tab set, remember the selected tab so we can reselect it after the tab set is reinitialized
      if (control.type === 'TAB_SET') {
         var tabControlId = $controlElement.data('tabs').panels.filter(':visible').attr('data-control-id');
         reselectionControl = tabControlId ? converter.controlIdToControlMap[tabControlId] : null;
      }

      // Replace html of control
      var compiledHTML = $compile(html)($scope);
      $controlElement = $(compiledHTML).replaceAll($controlElement);

      // Apply post render processing
      postRenderProcessing(control, $controlElement, reselectionControl);
   }

   function postRenderProcessing(control, $element, reselectionControl) {
      // Enable drag and drop (on all elements that have a control id)
      $element.add($element.find('*')).filter('[data-control-id]').each(function () {
         var $control = $(this);

         // Enable drag (except for root view)
         if (!$control.is('.view') && !$control.is('.builder-actions')) {
            $control.attr('draggable', 'true');
         }

         // Enable drop
         $control.attr('ondragover', 'event.preventDefault()');
      });

      // Important! The below code used to be needed in order for drag and drop to work on menu options.
      //            But Soho changed popupmenus so that they are not pulled out of their DOM position,
      //            so we inactivated this code in order to avoid duplicate events causing problems.
      //            If Soho changes things back, then we should reactivate this code.
      // Need to specifically add drag and drop events to popup menus (for buttons) because these menus get moved
      // outside of the view element by SoHo. We search all children of the rendered element, and we search the next
      // adjacent element because we might be re-rendering a button (whose menu is adjacent, not a child).
      // $element.find('ul.popupmenu').add($element.next('ul.popupmenu')).each(function () {
      //    addDragDropEvents(this);
      // });

      // SoHo Initialize (don't re-init a view or modal; delay so angular compile finishes first)
      if (control.type !== 'VIEW' && control.type !== 'MODAL' && control.type !== 'ACTION_PANEL') {
         setTimeout(function () {
            $element.initialize();

            // Reselect the proper tab if needed
            if (reselectionControl && reselectionControl.type === 'TAB') {
               var tabsControl = $element.data('tabs');
               var $tab = $element.find('[data-control-id="' + reselectionControl.id + '"]');
               tabsControl.select($tab.attr('id'));
            }
         }, 1);
      }
   }

   function addDragDropEvents(element) {
      WysiwygService.addDragDropEvents(element, $scope.jsonView, converter, false, dragDropSuccessCallback);
   }

   function dragDropSuccessCallback(controlsToRender) {
      renderControl(controlsToRender[0]);

      // There can be a 2nd control that may need re-rendered
      if (controlsToRender.length >= 2) {
         renderControl(controlsToRender[1]);
      }
   }

   function updateRowColumnSpan(row) {
      // Note: if there's a better way to adjust the column widths, do it
      var columnNumberToSpanMap = {1: '1', 2: '1/2', 3: '1/3', 4: '1/4', 5: '1/6', 6: '1/6', 7: '1/12', 8: '1/12', 9: '1/12', 10: '1/12', 11: '1/12', 12: '1/12'};
      var numColumns = row.children.length;

      for (var i = 0; i < numColumns; i++) {
         row.children[i].subType = columnNumberToSpanMap[numColumns];
      }
   }

   function validateColumnWidths(column) {
      var row = converter.controlIdToParentMap[column.id];
      var spanTotal = 0;

      for (var i = 0; i < row.children.length; i++) {
         var spanNum = columnSubTypeToNumericMap[row.children[i].subType];
         spanTotal += spanNum;
      }

      // Warn if doesn't add up to 100%
      if (spanTotal < 12) {
         MessageService.alert('Alert', 'Column widths are less than the full width of the row.');
      } else if (spanTotal > 12) {
         MessageService.alert('Alert', 'Column widths are greater than the full width of the row.');
      }
   }

});

/**
 * Controller for the Hot Key modal
 */
app.controller('WysiwygHotKeyOptionsCtrl', function ($scope) {
   var self = this;
   var control = $scope.activeControl;

   // Initialize grid with copy of existing hot keys or with blank array
   self.dataset = control.hotKeys ? angular.copy(control.hotKeys) : [];

   // Keys that can be used (don't include keys that have inconsistent keyCode values across browsers)
   self.keyOptions = [
      { label: 'A', value: 65 },
      { label: 'B', value: 66 },
      { label: 'C', value: 67 },
      { label: 'D', value: 68 },
      { label: 'E', value: 69 },
      { label: 'F', value: 70 },
      { label: 'G', value: 71 },
      { label: 'H', value: 72 },
      { label: 'I', value: 73 },
      { label: 'J', value: 74 },
      { label: 'K', value: 75 },
      { label: 'L', value: 76 },
      { label: 'M', value: 77 },
      { label: 'N', value: 78 },
      { label: 'O', value: 79 },
      { label: 'P', value: 80 },
      { label: 'Q', value: 81 },
      { label: 'R', value: 82 },
      { label: 'S', value: 83 },
      { label: 'T', value: 84 },
      { label: 'U', value: 85 },
      { label: 'V', value: 86 },
      { label: 'W', value: 87 },
      { label: 'X', value: 88 },
      { label: 'Y', value: 89 },
      { label: 'Z', value: 90 },
      { label: '0', value: 48 },
      { label: '1', value: 49 },
      { label: '2', value: 50 },
      { label: '3', value: 51 },
      { label: '4', value: 52 },
      { label: '5', value: 53 },
      { label: '6', value: 54 },
      { label: '7', value: 55 },
      { label: '8', value: 56 },
      { label: '9', value: 57 }
   ];

   self.addHotKey = function () {
      self.dataset.push({});
   };

   self.deleteHotKey = function () {
      self.grid.removeSelected();
   };

   self.cancel = function () {
      $scope.hotKeyModal.destroy();
   };

   // Apply the changes to the control
   self.submit = function () {
      control.hotKeys = self.dataset;

      // Clean up the json by deleting props with false (or null) values
      for (var i = 0; i < control.hotKeys.length; i++) {
         var hotKey = control.hotKeys[i];

         if (!hotKey.altKey) {
            delete hotKey.altKey;
         }
         if (!hotKey.ctrlKey) {
            delete hotKey.ctrlKey;
         }
         if (!hotKey.shiftKey) {
            delete hotKey.shiftKey;
         }
      }

      $scope.hotKeyModal.destroy();
   };
});

/**
 * Controller for the Inline Options modal
 */
app.controller('WysiwygInlineOptionsCtrl', function ($scope, GridService, MessageService, WysiwygService) {
   var self = this;
   var control = $scope.activeControl;
   var converter = $scope.converter;

   // Init grid with copy of existing options or with blank array
   self.dataset = control.children ? angular.copy(control.children) : [];

   self.addOption = function () {
      var newOption = WysiwygService.initNewControl(converter, 'OPT');
      newOption.label = '';
      newOption.value = '';
      self.dataset.push(newOption);
   };

   self.deleteOption = function () {
      self.grid.removeSelected();
   };

   self.cancel = function () {
      $scope.inlineOptionsModal.destroy();
   };

   // Apply the changes to the control
   // Note: the converter maps get updated by the renderControl -> converter.buildControl process that happens after
   // clicking 'OK' on the Edit Control window.
   self.submit = function () {
      control.children = self.dataset;
      $scope.inlineOptionsModal.destroy();
   };

   self.moveOption = function (isUp) {
      var option = GridService.getSelectedRecord(self.grid);
      var array = self.dataset;
      var currentIndex = array.indexOf(option);

      // Check if allowed to move before proceeding
      if (isUp && currentIndex === 0) {
         MessageService.error('global.error', 'wysiwyg.error.move.back');
      } else if (!isUp && currentIndex === array.length - 1) {
         MessageService.error('global.error', 'wysiwyg.error.move.forward');
      } else {
         var newIndex = isUp ? currentIndex - 1 : currentIndex + 1;

         // Remove control from parent
         array.splice(currentIndex, 1);

         // Re-add at location - 1 or location + 1
         array.splice(newIndex, 0, option);

         // Reselect the row after the grid updates so can keep pressing the Move button without clicking the row again
         setTimeout(function () {
            self.grid.selectRow(newIndex);
         }, 30);
      }
   };
});

/**
 * Directive for autocomplete of translation strings
 */
app.directive('i18nAutocomplete', function i18nAutocomplete($timeout, Utils) {

   return {
      restrict: 'A',
      require: 'ngModel',
      scope: false,
      link: function (scope, element, attrs) {
         var $input = $(element);

         // Activate autocomplete on control
         $input.autocomplete({ source: scope.translationStrings }).on('selected', function (e, a) {
            var key = $(a).parent().attr('data-value');

            // Apply selected key to model (delay scope apply to avoid race condition with SoHo populating the input field)
            $timeout(function () {
               Utils.setNestedValue(scope, attrs.ngModel, key);
            });
         });

         // Ensure the autocomplete list gets removed from screen when this element is destroyed (angular emits the $destroy event when element is removed from DOM).
         // There are a few edge cases where the list was remaining on the screen even after the element was gone.
         $input.on('$destroy', function () {
            var ac = $input.data('autocomplete');
            if (ac && ac.listIsOpen()) {
               ac.closeList();
            }
         });
      }
   };

});

/**
 * Directive for autocomplete of Sub Function list
 */
app.directive('subFunctionAutocomplete', function subFunctionAutocomplete($timeout, SecurityService, Utils) {

   return {
      restrict: 'A',
      require: 'ngModel',
      scope: false,
      link: function (scope, element, attrs) {
         var $input = $(element);

         // Get sub functions
         var subFunctionList = SecurityService.getSubFunctions();

         // Activate autocomplete on control
         $input.autocomplete({ source: subFunctionList }).on('selected', function (e, a) {
            var subFn = $(a).parent().attr('data-value');

            // Apply selection to model (delay scope apply to avoid race condition with SoHo populating the input field)
            $timeout(function () {
               Utils.setNestedValue(scope, attrs.ngModel, subFn);
            });
         });
      }
   };

});