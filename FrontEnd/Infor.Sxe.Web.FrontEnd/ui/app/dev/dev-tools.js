'use strict';

/**
 * Directive for bringing in the dev tools view and controller. This directive will not be present in a production build.
 */
app.directive('devTools', function devTools(ConfigService) {

   // If dev tools is not enabled, then deactivate this directive by making it an empty directive object
   if (!ConfigService.isDevToolsEnabled()) {
      return {};
   }

   return {
      restrict: 'E',
      scope: true, // Needed for controller
      templateUrl: 'ui/app/dev/dev-tools.html',
      controller: function ($compile, $scope, $state, $timeout, DataService, JsonViewService, MessageService, DevToolsService) {

         // Set up ctrl + shift + 'e' as a developer shortcut to edit current view
         if (ConfigService.isDevMode()) {
            $(document).on('keyup', function (e) {
               if (e.ctrlKey && e.shiftKey && e.which === 69) {
                  e.preventDefault();

                  // First try to find closest view to the element that was in focus
                  var closestJsonView = $(e.target).closest('[data-json-view-path]:visible').attr('data-json-view-path');

                  // Edit closest view, or edit the main view
                  if (closestJsonView) {
                     DevToolsService.openViewEditor(closestJsonView, false);
                  } else {
                     $scope.editMainView();
                  }
               }
            });
         }

         // Initial settings
         $scope.locale = sessionStorage['SXE_LOCALE'] || 'en-US';
         $scope.enableExtensions = ConfigService.isExtensionsEnabled();
         $scope.enablePersonalization = ConfigService.isPersonalizationEnabled();

         /**
          * Simple locale test (for data formatting differences)
          */
         $scope.setLocale = function (locale) {
            sessionStorage['SXE_LOCALE'] = locale;
            $scope.locale = locale;

            // Refresh the page
            location.reload();
         };

         /**
          * Toggle enable/disable of extensions
          */
         $scope.toggleExtensions = function (isEnable) {
            ConfigService.setExtensionsEnabled(isEnable);
            $scope.enableExtensions = isEnable;

            // Clear view cache so toggle takes effect immediately
            JsonViewService.clearViewCache();
         };

         /**
          * Toggle enable/disable of personalization
          */
         $scope.togglePersonalization = function (isEnable) {
            ConfigService.setPersonalizationEnabled(isEnable);
            $scope.enablePersonalization = isEnable;

            // Clear view cache so toggle takes effect immediately
            JsonViewService.clearViewCache();
         };

         $scope.showActiveViews = function () {
            DevToolsService.showActiveViews($scope, 'dev');
         };

         $scope.editMainView = function (isExtendMode) {
            DevToolsService.editMainView(isExtendMode);
         };

         $scope.newFunction = function() {
            $scope.type = 'module';
            $scope.options = {};

            // Make sure scope applies before proceeding
            $timeout(function() {
               DataService.get('ui/app/dev/code-gen-form.html', function (html) {
                  var newScope = $scope.$new();

                  // Compile the Angularized HTML before sending to modal call
                  var compiledHTML = $compile(html)(newScope);
                  $('#dev-tools-modal-container').html(compiledHTML);

                  var $view = $('#dev-tools-code-gen-form');

                  // Open modal
                  $('body').modal({
                     title: 'Generate Menu Function',
                     content: $view,
                     trigger: 'immediate',
                     buttons: [
                        {
                           text: 'Cancel',
                           click: function (e, modal) {
                              modal.destroy();
                              newScope.$destroy();
                           }
                        },
                        {
                           text: 'Create',
                           isDefault: true,
                           click: function(e, modal) {
                              var columns = null;

                              // TODO: do all params as request body data

                              // Build master grid columns from json input
                              if ($scope.options.masterGridColumns) {
                                 columns = DevToolsService.buildJsonColumns($scope.options.masterGridColumns, 12);

                                 // Stringify to prepare for server to insert into file
                                 columns = JSON.stringify(columns);

                                 // Clear this to avoid request to large error
                                 $scope.options.masterGridColumns = null;
                              }

                              DataService.post('api/codegen/function/' + $scope.options.pattern, { params: $scope.options, data: columns }, function(response) {
                                 MessageService.info('Success', response);

                                 // Reload into newly created state
                                 location.hash = '/' + $scope.options.menuFn + '/master';
                                 location.reload();
                              });

                              modal.destroy();
                              newScope.$destroy();
                           }
                        }
                     ]
                  });
               });
            });
         };

         $scope.newView = function() {
            $scope.type = 'view';
            $scope.options = {
               viewType: 'STANDARD'
            };

            // Make sure scope applies before proceeding
            $timeout(function () {
               DataService.get('ui/app/dev/code-gen-form.html', function (html) {
                  var newScope = $scope.$new();

                  // Compile the Angularized HTML before sending to modal call
                  var compiledHTML = $compile(html)(newScope);
                  $('#dev-tools-modal-container').html(compiledHTML);

                  var $view = $('#dev-tools-code-gen-form');

                  // Open modal
                  $('body').modal({
                     title: 'Generate New View',
                     content: $view,
                     trigger: 'immediate',
                     buttons: [
                        {
                           text: 'Cancel',
                           click: function (e, modal) {
                              modal.destroy();
                              newScope.$destroy();
                           }
                        },
                        {
                           text: 'Create',
                           isDefault: true,
                           click: function(e, modal) {
                              var viewFile = $scope.options.viewFile;

                              // Validate
                              if ($scope.options.menuFn !== $scope.options.menuFn.toLowerCase()) {
                                 MessageService.error('Menu Function Error', 'The menu function must be all lower case.');
                              } else if (viewFile !== viewFile.toLowerCase() || viewFile.indexOf('.json') < 1) {
                                 MessageService.error('File Name Error', 'The file name must be all lower case and in the form of detail.json or add-product.json.');
                              } else {
                                 // Form the view id out of the requested file name
                                 // 1. remove .json
                                 // 2. remove dashes from file name
                                 // 3. change nested directory slashes to dashes
                                 $scope.options.viewName = viewFile.replace('.json', '').replace(/-/g, '').replace(/\//g, '-');

                                 DataService.post('api/codegen/view', { params: $scope.options }, function(response) {
                                    MessageService.info('Success', response);

                                    // Go to wysiwyg state
                                    var viewPath = $scope.options.module + '/' + $scope.options.menuFn + '/' + viewFile;
                                    $state.go('wysiwyg.master', { viewPath: viewPath });
                                 });

                                 modal.destroy();
                                 newScope.$destroy();
                              }
                           }
                        }
                     ]
                  });
               });
            });
         };

         $scope.viewTypeChanged = function () {
            var viewType = $scope.options.viewType;

            if (viewType === 'LOOKUP_MODAL' || viewType === 'LOOKUP_MODAL_IES') {
               $scope.options.module = 'shared';
               $scope.options.menuFn = 'lookups';
               $scope.options.viewFile = 'CHANGE-ME-lookup-modal.json';
            }
         };

         // Clear all local storage data for this app (MRUs, recently visited, advanced search, etc.)
         $scope.clearLocalStorageData = function () {
            for (var key in localStorage) {
               if (localStorage.hasOwnProperty(key) && key.startsWith('SXE_')) {
                  localStorage.removeItem(key);
               }
            }
            MessageService.info('global.cleared', '');
         };

         /**
          * Bulk generation of setup screens
          */
         $scope.generateSetups = function () {
            $scope.setupJsonInput = '';

            $timeout(function () {
               $('#dev-tools-generate-setups').message({
                  title: 'Generate Setups',
                  dialogType: 'General',
                  width: 900,
                  buttons: [
                     {
                        text: 'Cancel',
                        click: function (e, modal) {
                           modal.close();
                        }
                     },
                     {
                        text: 'Generate',
                        isDefault: true,
                        click: function(e, modal) {
                           // TODO: figure out why ng-model wasn't pulling value
                           var metaList = JSON.parse($('#setup-json-text').val());

                           // Pre-process JSON input
                           for (var i = 0; i < metaList.length; i++) {
                              var meta = metaList[i];
                              var columns;

                              // Build the dataPath (if not supplied)
                              if (!meta.dataPath) {
                                 meta.dataPath = 'api/' + meta.module + '/' + meta.menuFn;
                              }

                              // Build master grid column js from json input
                              if (meta.masterGridColumns) {
                                 columns = DevToolsService.buildJsonColumns(meta.masterGridColumns, 12);

                                 // Stringify to prepare for server to insert into file
                                 meta.masterGridColumns = JSON.stringify(columns);
                              }
                           }

                           // Recursively create each setup screen
                           sendGenerateSetupRequest(metaList, 0);

                           modal.close();
                        }
                     }
                  ]
               }).initialize();
            });
         };

         /**
          * Recursively create each setup screen
          */
         function sendGenerateSetupRequest(metaList, index) {
            if (index < metaList.length) {
               var meta = metaList[index];
               var columns = meta.masterGridColumns;

               // Clear this to avoid request to large error
               meta.masterGridColumns = null;

               // TODO: send meta as 'data' not as 'params' if figure out how to handle that well at the server

               DataService.post('api/codegen/function/setup', { params: meta, data: columns }, function (response) {
                  // Create next one
                  sendGenerateSetupRequest(metaList, index + 1);
               });
            } else {
               console.log('Generation completed.');
            }
         }
      }
   };

});