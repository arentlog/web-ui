'use strict';

/**
 * Directive for the active view list modal
 */
app.directive('activeViewList', function activeViewList(DataService, DevToolsService, MessageService, Utils) {

   return {
      restrict: 'A',
      scope: true,
      controllerAs: 'avl',
      controller: function () {
         var self = this;
         self.views = [];

         // Build list of views
         self.buildList = function () {
            var $body = $('body');
            var $activeContainer;

            // If modal is currently engaged, use it to find json views
            if ($body.is('.modal-engaged')) {
               $activeContainer = $body.children('.modal-page-container:visible:last');
            } else {
               // Otherwise use active tab panel
               $activeContainer = $('#nav-tab-panel-container').children('.tab-panel:visible');
            }

            // Find JSON view elements in active container and filter down to visible one(s)
            var jsonViewRoot = $activeContainer.find('[data-json-view-path]:visible');

            // Build list of views
            jsonViewRoot.each(function () {
               var webExtRowId = $(this).attr('data-extension-row-id');
               var webModRowId = $(this).attr('data-personalization-row-id');

               self.views.push({
                  id: $(this).attr('data-json-view-id'),
                  path: $(this).attr('data-json-view-path'),
                  extended: webExtRowId ? true : false,
                  personalized: webModRowId ? true : false,
                  webExtRowId: webExtRowId,
                  webModRowId: webModRowId
               });
            });
         };

         // Get view name to display (when extending people like to see the ID; when developing we like to see the path)
         self.getViewName = function (view) {
            return self.isDevMode ? view.path : view.id;
         };

         // Formatter for Edit button
         self.editButtonFormatter = function (row, cell, value, col) {
            return '<button type="button" class="btn-primary row-btn"><span>' + col.text + '</span></button>';
         };

         // Edit selected view
         self.editView = function(e, args) {
            var view = args[0].item;

            // Close the modal
            self.modal.close();

            // Go to wysiwyg
            DevToolsService.openViewEditor(view.path, self.isExtendMode);
         };

         // When grid is ready wire into row expansion event to inject details into row (these details are for support purposes)
         self.gridReady = function (e, grid) {
            grid.element.on('expandrow', function (e, args) {
               var view = args.item;
               var container = $(args.detail).find('.datagrid-row-detail-padding');
               var extContainer = $('<div><h4>' + MessageService.get('global.extension') + '</h4></div>');
               var modContainer = $('<div><h4>' + MessageService.get('global.personalization') + '</h4></div>');
               container.empty().css('font-size', '1.6rem');

               if (view.webExtRowId) {
                  DataService.post('api/shared/assharedinquiry/webextensionretrieve', { data: { webextensionrowid: view.webExtRowId }, busy: true }, function (webExtRecord) {
                     extContainer.append('<pre>' + Utils.sanitizeHtml(JSON.stringify(webExtRecord, null, 2)) + '</pre><br/><br/>');
                  });
               } else {
                  extContainer.append('<pre>' + MessageService.get('global.none') + '</pre><br/><br/>');
               }

               if (view.webModRowId) {
                  DataService.post('api/shared/assharedentry/webmodificationread', { data: { webmodRowID: view.webModRowId }, busy: true }, function (webModRecord) {
                     modContainer.append('<pre>' + Utils.sanitizeHtml(JSON.stringify(webModRecord, null, 2)) + '</pre>');
                  });
               } else {
                  modContainer.append('<pre>' + MessageService.get('global.none') + '</pre>');
               }

               container.append(extContainer).append(modContainer);
            });
         };
      },
      link: function (scope, element, attrs, ctrl) {
         var $element = $(element);

         // Grab the mode
         ctrl.isDevMode = attrs.mode === 'dev';
         ctrl.isExtendMode = attrs.mode === 'extend';
         ctrl.isInfoMode = attrs.mode === 'info';

         // Build list of views
         ctrl.buildList();

         // Hold on to modal api upon open
         $element.one('open', function (e) {
            ctrl.modal = $(e.target).data('modal');
         });

         // Destroy when modal closes
         $element.one('close', function () {
            ctrl.modal.destroy();
         });
      }
   };

});