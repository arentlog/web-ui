'use strict';

app.service('WysiwygService', function WysiwygService($translate, ControlMeta, ControlTemplatesMeta, CustomControls, DataService, JsonViewService, MessageService, Utils) {
   var self = this;

   /* Fields to exclude from grid column output */
   var excludeColumnFields = ['cono', 'rowID'];

   /* Public methods */

   this.save = function (viewPath, jsonView, converter) {
      var jsonViewCopy = angular.copy(jsonView);

      // Pre-process JSON (better formatting, remove transient properties)
      this.preProcessViewBeforeSave(jsonViewCopy, converter);

      // Save view
      var params = { path: viewPath };
      DataService.post('api/shared/jsonview/savedefaultview', { params: params, data: jsonViewCopy}, function () {
         MessageService.info('Successfully saved', '');

         // Clear cache for this view so loads latest next time
         JsonViewService.removeViewFromCache(viewPath);
      });
   };

   this.importColumns = function (importColumnsOptions, grid, converter) {
      var type = importColumnsOptions.type;
      var input = importColumnsOptions.input;

      // Ensure parent has children list
      if (!grid.children) {
         grid.children = [];
      }

      if (type === 'sample') {
         // Replace .0 decimals with .1 so we don't lose the fact that it's a decimal when parsed into an object
         input = input.replace(/\.0/g, '.1');

         var obj = JSON.parse(input);

         var keys = Object.keys(obj);

         // Parse Js object
         for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = obj[key];
            var subType = 'TEXT'; // Default is TEXT
            var dataFormat = null;

            // Don't create a column for:
            // 1) fields that should not be displayed
            // 2) fields that have a null value
            // 3) fields that are non-primitives (i.e. objects, arrays)
            if (excludeColumnFields.indexOf(key) >= 0 || value === null || typeof value === 'object') {
               continue;
            }

            // Set column subType based on the javascript type
            if (typeof value === 'boolean') {
               subType = 'CHECKBOX';
               dataFormat = 'LOGICAL';
            } else if (typeof value === 'number') {
               if (value.toString().indexOf('.') >= 0) {
                  dataFormat = 'DECIMAL';
               } else {
                  dataFormat = 'INTEGER';
               }
            }
            // If looks like a date...
            else if (typeof value === 'string' && value.indexOf('-') >= 0) {
               if (value.indexOf('-') >= 0) {
                  subType = 'DATE';
                  dataFormat = 'DATE';
               }
            }

            // Init new column
            var newColumn = self.initNewControl(converter, 'GRID_COL', subType);

            // Add more properties
            newColumn.model = key;
            newColumn.label = key;
            newColumn.dataFormat = dataFormat || undefined;

            // Update maps
            converter.controlIdToControlMap[newColumn.id] = newColumn;
            converter.controlIdToParentMap[newColumn.id] = grid;

            // Add to JSON
            grid.children.push(newColumn);
         }
      } else {
         // Read column code into column array
         var columns = eval(input);

         for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            var subType = 'TEXT'; // Default is TEXT
            var dataFormat = null;

            // Set type
            if (col.formatter === Formatters.Checkbox) {
               subType = 'CHECKBOX';
               dataFormat = 'LOGICAL';
            } else if (col.formatter === Formatters.Date) {
               subType = 'DATE';
               dataFormat = 'DATE';
            } else if (col.formatter === Formatters.Decimal) {
               dataFormat = 'DECIMAL';
            } else if (col.formatter === Formatters.Integer) {
               dataFormat = 'INTEGER';
            } else if (col.formatter === Formatters.Textarea) {
               subType = 'TEXT_AREA';
            }

            // If already specified type and dataFormat, then use them
            if (col.type) {
               subType = col.type;
            }
            if (col.dataFormat) {
               dataFormat = col.dataFormat;
            }

            // Init new column
            var newColumn = self.initNewControl(converter, 'GRID_COL', subType);

            // Add more properties
            newColumn.model = col.field;
            newColumn.label = col.name;
            newColumn.dataFormat = dataFormat || undefined;
            newColumn.editable = col.editor ? true : undefined;
            newColumn.width = col.width || undefined;

            // Update maps
            converter.controlIdToControlMap[newColumn.id] = newColumn;
            converter.controlIdToParentMap[newColumn.id] = grid;

            // Add to JSON
            grid.children.push(newColumn);
         }
      }
   };

   this.importFields = function (importFieldsOptions, parent, converter, callback) {
      // Ensure parent has children list
      if (!parent.children) {
         parent.children = [];
      }

      DataService.get(importFieldsOptions.path, {busy: true}, function (obj) {
         if (obj) {
            for (var prop in obj) {
               if (obj.hasOwnProperty(prop)) {
                  var value = obj[prop];
                  var type, dataFormat = null;

                  // Type & Data Format
                  if (value !== null) {
                     if (typeof value === 'boolean') {
                        type = 'CHECKBOX';
                     } else if (typeof value === 'number') {
                        type = 'TEXT_BOX';
                        dataFormat = 'DECIMAL';
                     } else if (typeof value === 'string') {
                        //TODO: if looks like date
                        if (false) {
                           type = 'DATE';
                           dataFormat = 'DATE';
                        } else {
                           type = 'TEXT_BOX';
                        }
                     } else {
                        // Ignore objects and arrays
                     }
                  } else {
                     type = 'TEXT_BOX';
                  }

                  // Override type if doing info fields
                  if (importFieldsOptions.fieldType === 'INFO') {
                     type = 'INFO';
                  }

                  // Init a new field
                  var newField = self.initNewControl(converter, 'FIELD', type);

                  // Add more properties
                  newField.model = importFieldsOptions.dataBindObject + prop;
                  newField.dataFormat = dataFormat || undefined;
                  newField.label = prop;

                  // Update maps
                  converter.controlIdToControlMap[newField.id] = newField;
                  converter.controlIdToParentMap[newField.id] = parent;

                  // Add to JSON
                  parent.children.push(newField);
               }
            }

            // Update view
            callback();
         } else {
            MessageService.error('Error', 'No resource found.');
         }
      });
   };

   /**
    * Initialize a new control object to be added to the JSON
    */
   this.initNewControl = function (converter, type, subType, withholdId) {
      var controlMeta = ControlMeta[type];

      var control = {
         id: withholdId ? null : converter.getNextAvailableId(),
         type: type,
         subType: subType || undefined,
         type3: (subType === 'DROP_DOWN' || subType === 'RADIO_SET') ? 'INLINE' : undefined,
         model: type === 'FIELD' ? '' : undefined,
         label: type !== 'MESSAGE' ? controlMeta.newLabel : undefined,
         text: type === 'MESSAGE' ? controlMeta.newLabel : undefined
      };

      // Dropdown/radio options should initialize value to empty string
      if (type === 'OPT') {
         control.value = '';
      }

      // Actions buttons and icon buttons shouldn't set the default label
      if (type === 'BTN' && (subType === 'ACT' || subType === 'ICON')) {
         control.label = '';
      }

      // Icon buttons need a default icon (otherwise can't see them)
      if (type === 'BTN' && subType === 'ICON') {
         control.icon = 'icon-insert-image';
      }

      // Init dataFormat to proper default value for fields
      if (type === 'FIELD') {
         if (subType === 'CHECKBOX' || subType === 'SWITCH') {
            control.dataFormat = 'LOGICAL';
         } else if (subType === 'DATE') {
            control.dataFormat = 'DATE';
         } else if (subType === 'TIME') {
            control.dataFormat = 'TIME';
         }
      }

      // Init children list for controls that get initial child
      if (type === 'GRID' || type === 'ROW' || type === 'TAB_SET' || type === 'EXP_AREA' || type === 'SWAP_LIST' || type === 'WIZARD') {
         control.children = [];
      }

      // Custom controls can have initial options
      if (type === 'CUSTOM') {
         var customControlMeta = CustomControls[subType];

         // If an initial options object is specified in the metadata, then make a copy and set on the new control
         if (customControlMeta.initialOptions) {
            control.options = angular.copy(customControlMeta.initialOptions);
         }
      }

      return control;
   };

   /**
    * Try to auto-generate an html id
    */
   this.generateHtmlId = function (converter, control, parent) {
      var prefix;

      // Handle options differently by using parent's id as prefix for ensured uniqueness
      if (control.type === 'OPT' || control.type === 'MENU_OPT') {
         prefix = parent.id;
      } else {
         prefix = converter.viewId;

         // Remove module- from prefix
         prefix = prefix.substr(prefix.indexOf('-') + 1);
      }

      // Allow custom controls to simply end with the subType (if id will be unique)
      if (control.type === 'CUSTOM') {
         return prefix + '-' + control.subType.toLowerCase().replace(/_/g, '');
      }

      // Add type to prefix
      prefix += '-' + ControlMeta[control.type].codeName + '-';

      // Try to complete the id with a sensible name
      if (control.model && control.type === 'FIELD') {
         // Use only last segment of model
         var name = control.model;
         if (name.indexOf('.') >= 0) {
            name = name.substr(name.lastIndexOf('.') + 1);
         }

         return prefix + name.toLowerCase();
      } else if (control.label && (control.type === 'BTN' ||
         control.type === 'EXP_AREA' ||
         control.type === 'FIELD_SET' ||
         control.type === 'OPT' ||
         control.type === 'MENU_OPT')) {
         // Remove special chars from label part of id
         var labelText = $translate.instant(control.label);
         labelText = labelText.replace(/[^A-Za-z0-9]/g, '');

         return prefix + labelText.toLowerCase();
      } else if (control.type === 'GRID' || control.type === 'TOOLBAR') {
         // Allow grids and toolbars to simply end with the type (if id will be unique)
         return prefix.substr(0, prefix.length - 1);
      } else {
         return prefix;
      }
   };

   this.preProcessViewBeforeRender = function (jsonView, converter) {
      var ids = [], duplicateIds = [];

      preProcessControlBeforeRender(jsonView, converter, ids, duplicateIds);

      // Error if any duplicate ids
      if (duplicateIds.length > 0) {
         MessageService.error('Error', 'The following duplicate control ids have been detected:<br/><br/>' + duplicateIds.join(', ') + '<br/><br/>The JSON file needs to be fixed before proceeding.');
      }
   };

   /**
    * Clean up a default json view before saving it
    */
   this.preProcessViewBeforeSave = function (jsonView, converter) {
      preProcessControlBeforeSave(jsonView, converter, false);
   };

   /**
    * Clean up the extension additions json in the same way that default controls are cleaned up
    */
   this.preProcessExtensionDataBeforeSave = function (extensionData, converter) {
      var i;

      // Clean up the additions json in the same way that default controls are cleaned up
      for (i = 0; i < extensionData.additions.length; i++) {
         preProcessControlBeforeSave(extensionData.additions[i], converter, false);
      }

      // Clean up the changes json, however keep empty objects since needed to know if certain properties have been deleted
      for (i = 0; i < extensionData.changes.length; i++) {
         preProcessControlBeforeSave(extensionData.changes[i], converter, true);
      }
   };

   /**
    * Adds drag and drop functionality for developer or personalize wysiwyg
     */
   this.addDragDropEvents = function (element, jsonView, converter, isPersonalize, callback) {
      var $element = $(element);
      var oldDragStart = $element.data('onDragStartFn');
      var oldDrop = $element.data('onDropFn');

      // Remove old event functions before adding new ones
      if (oldDragStart) {
         element.removeEventListener('dragstart', oldDragStart);
      }
      if (oldDrop) {
         element.removeEventListener('drop', oldDrop);
      }

      // Drag event
      var onDragStart = function (ev) {
         var $target = $(ev.target);
         var transferData = {
            dragControlId: $target.attr('data-control-id')
         };

         // Need to keep track of popup menu when dragging menu options
         if ($target.is('li')) {
            transferData.menuElementId = $target.closest('ul.popupmenu').attr('id');
         }

         ev.dataTransfer.setData('text', JSON.stringify(transferData));
      };

      // Drop event
      var onDrop = function (ev) {
         ev.preventDefault();
         var $dropElement = $(ev.target);
         var transferData = JSON.parse(ev.dataTransfer.getData('text'));
         var isFromTemplate = transferData.fromTemplate;
         var dragControlId = transferData.dragControlId;
         var dropControlId = $dropElement.attr('data-control-id');
         var controlsToRender = [], controlsWithDirtyChildren = [];

         // Some controls consist of nested HTML, and the control id is specified on a parent element
         if (!dropControlId) {
            dropControlId = $dropElement.closest('[data-control-id]').attr('data-control-id');
         }

         // Get drop control
         var dropControl = converter.controlIdToControlMap[dropControlId];
         var dropControlMeta = ControlMeta[dropControl.type];

         // Get drag control from template meta or converter map
         var dragControl;
         if (isFromTemplate) {
            dragControl = angular.copy(ControlTemplatesMeta[dragControlId]);
         } else {
            dragControl = converter.controlIdToControlMap[dragControlId];
         }
         var dragControlMeta = ControlMeta[dragControl.type];

         // Catch initial errors
         if (!dragControl) {
            MessageService.error('global.error', 'wysiwyg.error.drag.unknown.drag');
            return;
         } else if (!dropControl) {
            MessageService.error('global.error', 'wysiwyg.error.drag.unknown.drop');
            return;
         } else if (dragControl === dropControl) {
            MessageService.error('global.error', 'wysiwyg.error.drag.self');
            return;
         } else if (dragControl.type === 'COL') {
            MessageService.error('global.error', 'wysiwyg.error.drag.columns');
            return;
         } else if (dragControl.type === 'TAB') {
            MessageService.error('global.error', 'wysiwyg.error.drag.tabs');
            return;
         }

         // Get drag parent
         var dragParent = null;
         if (!isFromTemplate) {
            dragParent = converter.controlIdToParentMap[dragControl.id];
         }

         // Get drop parent
         var dropParent = converter.controlIdToParentMap[dropControlId];
         var dropParentMeta = null;
         var dropParentAllowList = null;
         if (dropParent) {
            dropParentMeta = ControlMeta[dropParent.type];
            dropParentAllowList = typeof dropParentMeta.dropInside === 'object' ? dropParentMeta.dropInside : null;
         }

         // Temporary code to handle moving of toolbars above grids to be fixed toolbars inside of grids
         // TODO: remove this after all grid toolbars are fixed!
         if (dragControl.type === 'TOOLBAR' && dropControl.type === 'GRID' && (!dropControl.controls || !dropControl.controls.toolbar)) {
            if (!dropControl.controls) dropControl.controls = {};

            // Update JSON
            dragParent.children.splice(dragParent.children.indexOf(dragControl), 1);
            dropControl.controls.toolbar = dragControl;

            // Update control id to parent map
            converter.controlIdToParentMap[dragControl.id] = dropControl;

            // Render and return
            callback([dragParent]);
            return;
         }

         // Check if should drop inside or before the control
         var dropInside;

         // Same types are always dropped before one another
         if (dragControl.type === dropControl.type) {
            dropInside = false
         } else if (typeof dropControlMeta.dropInside === 'boolean') {
            dropInside = dropControlMeta.dropInside;
         } else {
            // Check if drop control wants drag type to be inside
            dropInside = dropControlMeta.dropInside.indexOf(dragControl.type) >= 0;
         }

         // Remember which control is to receive dragged control
         var receivingControl = dropInside ? dropControl : dropParent;
         var receivingControlMeta = dropInside ? dropControlMeta : dropParentMeta;

         // Catch more errors

         // Determine if can move control to different parent
         // - Developer mode - yes
         // - Personalize mode - no, except for a few safe cases (unless the view's allowCrossContainer option is true)
         var preventMoveToDifferentParent = isPersonalize && !jsonView.allowCrossContainer;
         if (preventMoveToDifferentParent) {

            // Note: we allow moving controls between columns as long as they are in the same row
            if (receivingControl.type === 'COL' && dragParent.type === 'COL') {
               var row1 = converter.controlIdToParentMap[receivingControl.id];
               var row2 = converter.controlIdToParentMap[dragParent.id];

               if (row1 === row2) {
                  preventMoveToDifferentParent = false;
               }
            }
         }

         // Check if attempting to move control to a different parent container when not allowed
         if (receivingControl !== dragParent && preventMoveToDifferentParent) {
            MessageService.error('global.error', 'wysiwyg.error.drag.container.different');
            return;
         }
         // If drag control has an allowedParents list, check that the receiving control is in the list
         else if (dragControlMeta.allowedParents && dragControlMeta.allowedParents.indexOf(receivingControl.type) < 0) {
            MessageService.error('global.error', 'wysiwyg.error.drag.container.rejected', { name1: MessageService.get(dragControlMeta.displayName), name2: MessageService.get(receivingControlMeta.displayName) });
            return;
         }
         // If dropping adjacent to a control, we need to check the dropInside rules of the parent to see if can accept the type of control
         else if (!dropInside && dropParentAllowList && dropParentAllowList.indexOf(dragControl.type) < 0) {
            MessageService.error('global.error', 'wysiwyg.error.drag.container.rejected', { name1: MessageService.get(dragControlMeta.displayName), name2: MessageService.get(dropParentMeta.displayName) });
            return;
         }
         // Check if trying to drag a fixed/named control (it has a parent, but it's not in the children list)
         else if (dragParent && (!dragParent.children || dragParent.children.indexOf(dragControl) < 0)) {
            MessageService.error('global.error', 'wysiwyg.error.drag.fixed', { name: MessageService.get(dragControlMeta.displayName) });
            return;
         } else if (!dropInside && dropParent.type === 'MOD_CNTR') {
            MessageService.error('global.error', 'wysiwyg.error.drag.into.template');
            return;
         }

         // Give id if from template
         if (isFromTemplate) {
            dragControl.id = converter.getNextAvailableId();
         }

         // Remember control position within the parent controls before modifying JSON
         var dragControlIndex = (dragParent && dragParent.children) ? dragParent.children.indexOf(dragControl) : null;
         var dropControlIndex = (dropParent && dropParent.children) ? dropParent.children.indexOf(dropControl) : null;

         // Update JSON: Remove control from current parent
         if (!isFromTemplate) {
            var fromArray = dragParent.children;
            fromArray.splice(fromArray.indexOf(dragControl), 1);
            controlsWithDirtyChildren.push(dragParent);
         }

         // Update JSON: Add control to drop control (or its parent)
         if (dropInside) {
            if (!dropControl.children) dropControl.children = [];
            dropControl.children.push(dragControl);

            // Update control id to parent map
            converter.controlIdToParentMap[dragControl.id] = dropControl;
         }
         // ...else, add to parent of drop control
         else {
            var toArray = dropParent.children;
            var spliceBefore = true;

            // Always move dragged control before drop control, but if it's the same parent
            // and dragged control is being moved downward to drop control, then move after drop control
            if (dragParent === dropParent && dragControlIndex < dropControlIndex) {
               spliceBefore = false;
            }

            // Add to parent's array (before or after drop control)
            if (spliceBefore) {
               toArray.splice(toArray.indexOf(dropControl), 0, dragControl);
            } else {
               toArray.splice(toArray.indexOf(dropControl) + 1, 0, dragControl);
            }

            // Update control id to parent map
            converter.controlIdToParentMap[dragControl.id] = dropParent;
         }

         // Add receiving control to the dirty children list if not same as the dragParent already there
         if (controlsWithDirtyChildren.length > 0 && controlsWithDirtyChildren[0] !== receivingControl) {
            controlsWithDirtyChildren.push(receivingControl);
         }

         // We need to manually close popup menus when their children are moved because we will be re-rendering
         if (dragControl.type === 'MENU_OPT') {
            $('#' + transferData.menuElementId).remove();

            // TODO: after SoHo makes the popupmenu plugin accessible, call the close fn
            //$menu.data('popupmenu').close();
         }

         // Determine which "drop-side" control needs re-rendered
         var dirtyDropContainer = dropInside ? dropControl : dropParent;

         // Update view (re-render only what has changed...and avoid doing it twice)
         if (isFromTemplate) {
            controlsToRender.push(dirtyDropContainer);
         } else if (dragParent === dirtyDropContainer) {
            controlsToRender.push(dragParent);
         } else if (isEqualOrDescendant(dirtyDropContainer, dragParent)) {
            controlsToRender.push(dragParent);
         } else if (isEqualOrDescendant(dragParent, dirtyDropContainer)) {
            controlsToRender.push(dirtyDropContainer);
         } else {
            // If containers are not equal and not descended from one another, then both need re-rendered
            controlsToRender.push(dirtyDropContainer);
            controlsToRender.push(dragParent);
         }

         // The success callback performs the actual re-rendering and other post-processing
         callback(controlsToRender, controlsWithDirtyChildren);
      };

      // Add event listeners and remember functions for removal next time
      element.addEventListener('dragstart', onDragStart);
      $element.data('onDragStartFn', onDragStart);
      element.addEventListener('drop', onDrop);
      $element.data('onDropFn', onDrop);
   };


   /* Private methods */

   /**
    * Return true if testControl is a descendant of ancestor (or are the same control)
    */
   function isEqualOrDescendant(testControl, ancestor) {
      var children = ancestor.children;
      var childControls = ancestor.controls;

      // Check if same control
      if (testControl === ancestor) return true;

      // Check all children and beyond
      if (children) {
         for (var i = 0; i < children.length; i++) {
            var result = isEqualOrDescendant(testControl, children[i]);

            if (result) {
               return true;
            }
         }
      }
      if (childControls) {
         for (var prop in childControls) {
            if (childControls.hasOwnProperty(prop)) {
               var result = isEqualOrDescendant(testControl, childControls[prop]);

               if (result) {
                  return true;
               }
            }
         }
      }

      return false;
   }

   /**
    * Determine max id for this view
    */
   function preProcessControlBeforeRender(control, converter, ids, duplicateIds) {
      var children = control.children;
      var childControls = control.controls;
      var id = control.id;

      // First pre-process all children
      if (children) {
         for (var i = 0; i < children.length; i++) {
            preProcessControlBeforeRender(children[i], converter, ids, duplicateIds);
         }
      }
      if (childControls) {
         for (var prop in childControls) {
            if (childControls.hasOwnProperty(prop)) {
               preProcessControlBeforeRender(childControls[prop], converter, ids, duplicateIds);
            }
         }
      }

      // Set max id for this view
      if (id > converter.getMaxId()) {
         converter.setMaxId(id);
      }

      // Track ids to check for duplicates
      if (ids.indexOf(id) >= 0) {
         duplicateIds.push(id);
      } else {
         ids.push(id);
      }
   }

   /**
    * Adjust formatting
    */
   function preProcessControlBeforeSave(control, converter, keepEmptyObjects) {
      var children = control.children;
      var childControls = control.controls;

      // First pre-process all children
      if (children) {
         for (var i = 0; i < children.length; i++) {
            preProcessControlBeforeSave(children[i], converter, keepEmptyObjects);
         }
      }
      if (childControls) {
         for (var prop in childControls) {
            if (childControls.hasOwnProperty(prop)) {
               preProcessControlBeforeSave(childControls[prop], converter, keepEmptyObjects);
            }
         }
      }

      // Remove certain objects if they are empty
      if (!keepEmptyObjects) {
         if (control.modelOptions && Object.keys(control.modelOptions).length === 0) {
            delete control.modelOptions;
         }
         if (control.formatOptions && Object.keys(control.formatOptions).length === 0) {
            delete control.formatOptions;
         }
         if (control.hyperlinks && Object.keys(control.hyperlinks).length === 0) {
            delete control.hyperlinks;
         }
         if (control.contextOptions && Object.keys(control.contextOptions).length === 0) {
            delete control.contextOptions;
         }
         if (control.contextValues && Object.keys(control.contextValues).length === 0) {
            delete control.contextValues;
         }
         if (control.options && Object.keys(control.options).length === 0) {
            delete control.options;
         }
         if (control.hotKeys && control.hotKeys.length === 0) {
            delete control.hotKeys;
         }
      }

      // Delete and re-add certain properties so they're positioned last in the JSON for readability
      // 9th to last - modelOptions
      // 8th to last - formatOptions
      // 7th to last - hyperlinks
      // 6th to last - contextOptions
      // 5th to last - contextValues
      // 4th to last - options
      // 3rd to last - hotKeys
      // 2nd to last - controls
      // Last - children
      if (control.modelOptions !== undefined) {
         var modelOptions = control.modelOptions;
         control.modelOptions = undefined;
         delete control.modelOptions;
         control.modelOptions = modelOptions;
      }
      if (control.formatOptions !== undefined) {
         var formatOptions = control.formatOptions;
         control.formatOptions = undefined;
         delete control.formatOptions;
         control.formatOptions = formatOptions;
      }
      if (control.hyperlinks !== undefined) {
         var hyperlinks = control.hyperlinks;
         control.hyperlinks = undefined;
         delete control.hyperlinks;
         control.hyperlinks = hyperlinks;
      }
      if (control.contextOptions !== undefined) {
         var contextOptions = control.contextOptions;
         control.contextOptions = undefined;
         delete control.contextOptions;
         control.contextOptions = contextOptions;
      }
      if (control.contextValues !== undefined) {
         var contextValues = control.contextValues;
         control.contextValues = undefined;
         delete control.contextValues;
         control.contextValues = contextValues;
         Utils.sortObjectKeys(control.contextValues); // sort key values for cleanliness
      }
      if (control.options !== undefined) {
         var options = control.options;
         control.options = undefined;
         delete control.options;
         control.options = options;
      }
      if (control.hotKeys !== undefined) {
         var hotKeys = control.hotKeys;
         control.hotKeys = undefined;
         delete control.hotKeys;
         control.hotKeys = hotKeys;
      }
      if (control.controls !== undefined) {
         control.controls = undefined;
         delete control.controls;
         control.controls = childControls;
      }
      if (control.children !== undefined) {
         control.children = undefined;
         delete control.children;
         control.children = children;
      }
   }

});
