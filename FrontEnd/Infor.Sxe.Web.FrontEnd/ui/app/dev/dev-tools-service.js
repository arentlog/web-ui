'use strict';

/**
 * Service for development-only actions (i.e. code generation, etc.)
 */
app.service('DevToolsService', function DevToolsService($compile, $state, DataService, MessageService) {
   var self = this;

   /* Fields to exclude from grid column output */
   var excludeColumnFields = ['cono', 'rowID'];

   /**
    * Go to wysiwyg editor with selected view
    */
   self.openViewEditor = function (viewPath, isExtendMode) {
      var mode, $body = $('body');

      // When view is a modal or cap, we need to close the modal(s) so user can see the wysiwyg state
      if ($body.is('.modal-engaged')) {
         $body.children('.modal-page-container:visible').each(function () {
            $(this).find('.modal').data('modal').destroy();
         });
      }

      // If viewPath starts with 'extension-' then we know it's a new extension view without a default view
      if (viewPath.startsWith('extension-')) {
         mode = 'new';
      } else if (isExtendMode) {
         mode = 'extend';
      } else {
         mode = undefined; // no mode param for dev mode since dev is the default
      }

      // Go to wysiwyg
      $state.go('wysiwyg.master', { viewPath: viewPath, mode: mode });
   };

   /**
    * Go to wysiwyg editor with the main view that is currently displayed
    */
   self.editMainView = function (isExtendMode) {
      var $activeTabPanel = $("#nav-tab-panel-container").children('.tab-panel:visible');

      // Find current JSON view element in main section
      // - last module container (builder-pane) and then his owning view
      var jsonViewRoot = $activeTabPanel.find('section.main').find('.builder-pane:last').closest('.view');

      // Get view path
      var viewPath = jsonViewRoot.attr('data-json-view-path');

      if (viewPath) {
         self.openViewEditor(viewPath, isExtendMode);
      } else {
         MessageService.alert('Alert', 'Could not find a JSON view in the main section of the current tab.');
      }
   };

   /**
    * Show the Active View List modal
    */
   self.showActiveViews = function (scope, mode) {
      DataService.get('ui/app/dev/active-view-list.html', function (html) {
         var newScope = scope.$new();

         // Add the mode attribute so know if extend, dev, or info
         html = html.replace('<div', '<div data-mode="' + mode + '"');

         // Compile the Angularized HTML before sending to modal call
         var compiledHtmlElem = $compile(html)(newScope);
         var $modal = $(compiledHtmlElem);

         // Destroy new scope when modal closes
         $modal.one('close', function () {
            newScope.$destroy();
         });

         // Open modal
         $('body').modal({
            content: $modal,
            autoFocus: false
         });
      });
   };

   /**
    * Should field be excluded as a grid column
    */
   self.excludeGridColumn = function (field) {
      return excludeColumnFields.indexOf(field) >= 0;
   };

   /**
    * Convert json sample object input into columns for JSON views.
    */
   self.buildJsonColumns = function (input, startingId) {
      var list = [];
      var id = startingId;

      // Make sure input is a JSON string (not object)
      if (typeof input !== 'string') {
         input = JSON.stringify(input);
      }

      // Replace .0 decimals with .1 so we don't lose the fact that it's a decimal when parsed into an object
      input = input.replace(/\.0/g, '.1');

      var obj = JSON.parse(input);

      var keys = Object.keys(obj);

      // Parse object and build JSON columns
      for (var i = 0; i < keys.length; i++) {
         var key = keys[i];
         var value = obj[key];
         var subType = 'TEXT'; // Default is TEXT
         var dataFormat = null;

         // Don't create a column for:
         // 1) fields that should not be displayed
         // 2) fields that have a null value
         // 3) fields that are non-primitives (i.e. objects, arrays)
         if (self.excludeGridColumn(key) || value === null || typeof value === 'object') {
            continue;
         }

         // Set column properties based on the javascript type
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
         var newColumn = {
            id: id++,
            type: 'GRID_COL',
            subType: subType,
            model: key,
            label: key, // label cannot be automated, so just set to property key
            dataFormat: dataFormat || undefined
         };

         // Add to list
         list.push(newColumn);
      }

      return list;
   };

});
