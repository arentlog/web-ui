'use strict';

/**
 * For running development reports on our json view files
 */

app.config(function ($stateProvider) {
   $stateProvider.state('devReports', {
      url: '/dev/reports',
      deepStateRedirect: {default: 'devReports.master'},
      sticky: true,
      data: {
         tabTitle: 'Dev Reports'
      }
   });
   $stateProvider.state('devReports.master', {
      url: '/master',
      sticky: true,
      views: {
         'devReports@': {
            templateUrl: 'ui/app/dev/reports/dev-reports.html',
            controller: 'DevReportsCtrl as devrep'
         }
      }
   });
});

app.controller('DevReportsCtrl', function ($scope, $state, ContextService, DataService, JsonViewService, MessageService, OptionSetService, ReportService, TabService) {
   var self = this;
   self.jsonViewFiles = [];
   self.results = [];
   self.viewIds = {};
   self.isRunning = false;

   // Definitions of our dev reports
   self.reports = {
      allProblem: {
         name: 'All Problem Reports',
         group: 'Problem Reports',
         isFlagControl: null
      },
      p1: {
         name: 'Controls w/ Duplicate ID',
         group: 'Problem Reports',
         isFlagControl: function (control, controlIds) {
            if (controlIds.indexOf(control.id) >= 0) {
               return true;
            } else {
               controlIds.push(control.id);
               return false;
            }
         }
      },
      p2: {
         name: 'Controls w/ Invalid ID',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            // Controls need to have ids that are integer values > 0 and not dangerously high (since high id numbers are reserved for extensions)
            return !Number.isInteger(control.id) || control.id <= 0 || control.id >= 1000;
         }
      },
      p3: {
         name: 'Fields w/ Missing Label',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            return control.type === 'FIELD' && !control.label;
         }
      },
      p4: {
         name: 'Fields w/ Numeric Format and No Digits',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            return control.type === 'FIELD' && control.subType !== 'INFO' && !control.digits && !control.mask && !control.readonly &&
               (control.dataFormat === 'DECIMAL' || control.dataFormat === 'DECIMAL_TEXT' || control.dataFormat === 'INTEGER' || control.dataFormat === 'INTEGER_TEXT' || control.dataFormat === 'CURRENCY' || control.dataFormat === 'PERCENT');
         }
      },
      p5: {
         name: 'Grids w/ Missing Toolbar',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            return control.type === 'GRID' && (!control.controls || !control.controls.toolbar);
         }
      },
      p6: {
         name: 'Hot Keys Usage',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            return control.hotKeys ? true : false;
         }
      },
      p7: {
         name: 'Lookups w/ Max Length & No Allow Entry',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            // Lookups should not specify a max length (because the display label is longer than the underlying value)
            // However if they are "allowEntry" lookups (where user can type in values) then it can be acceptable
            return control.type === 'FIELD' && control.subType === 'LOOKUP' && control.maxLength !== undefined && (!control.options || !control.options.allowEntry);
         }
      },
      p8: {
         name: 'Rows, Columns w/ Extra/Hidden Flag',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            return control.extra && (control.type === 'ROW' || control.type === 'COL');
         }
      },
      p9: {
         name: 'View Containers w/ Visible Condition',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            return control.type === 'VIEW_CNTR' && control.conditionShow;
         }
      },
      p10: {
         name: 'Views w/ Duplicate View ID',
         group: 'Problem Reports',
         isFlagControl: function (control) {
            if (control.viewId) {
               // If viewId already in list, then it's a duplicate
               if (self.viewIds[control.viewId]) {
                  return true;
               }

               // Add to list of viewIds
               self.viewIds[control.viewId] = control.viewId;
            }
            return false;
         }
      },
      p11: {
         name: 'Views w/ Invalid View ID',
         group: 'Problem Reports',
         isFlagControl: function (control, controlIds, viewPath) {
            // Check for viewIds that are too long (78 max), not lower case, and if module and function matches the view file path
            // viewId: module-menuFn-... (ex. ar-arsc-detail)
            // viewPath: module/menuFn/... (ex. ar/arsc/detail.json)
            if (control.type === 'VIEW' || control.type === 'MODAL' || control.type === 'ACTION_PANEL') {
               var viewId = control.viewId || '';
               var viewIdPieces = viewId.split('-');
               var viewPathPieces = viewPath.split('/');
               var pathModule = viewPathPieces[0];
               var pathFunc = viewPathPieces.length > 1 ? viewPathPieces[1] : '';
               var pathFuncNoDashes = pathFunc.replace(/-/g, '');
               var idModule = viewIdPieces[0];
               // Just test rest of id starts with the pathFunction (because path function folder may have dashes)
               var restOfId = viewId.substr(viewId.indexOf('-') + 1);

               if (!viewId || viewId.length > 78 || viewId.toLowerCase() !== viewId || idModule !== pathModule || (!restOfId.startsWith(pathFunc) && !restOfId.startsWith(pathFuncNoDashes))) {
                  return true;
               }
            }
            return false;
         }
      },
      i1: {
         name: 'Grid Columns w/ Dynamic Label',
         group: 'Inquiry Reports',
         isFlagControl: function (control) {
            return control.type === 'GRID_COL' && control.label && control.label.startsWith('{{');
         }
      },
      i2: {
         name: 'Grid Column Lookups',
         group: 'Inquiry Reports',
         isFlagControl: function (control) {
            return control.type === 'GRID_COL' && control.subType === 'LOOKUP';
         }
      },
      i3: {
         name: 'Lookups w/ Data Format',
         group: 'Inquiry Reports',
         isFlagControl: function (control) {
            return (control.type === 'FIELD' || control.type === 'GRID_COL') && control.subType === 'LOOKUP' && control.dataFormat;
         }
      },
      i4: {
         name: 'Screen ID List',
         group: 'Inquiry Reports',
         hasContent: true,
         isFlagControl: function (control) {
            return control.type === 'TAB' && control.tabId;
         },
         preProcessing: function () {
            // Fetch the sastt table codes so have them when it's time to generate sastt screen ids
            self.sasttTableCodes = DataService.getList('api/sa/assasetup/sasttloadtablecodes');

            // Fetch the oesf record types so have them when it's time to generate oesf screen ids
            OptionSetService.get('oe', 'FulfillmentRecordType', function (optSet) {
               self.oesfRecordTypes = optSet.children;
            });

            // Go to a report function so that the report wizard states will exist when it's time to generate screenIDs
            $state.go('arra');

            // Close the report tab after a brief delay
            setTimeout(function () {
               TabService.closeTab('arra');
            }, 300);
         },
         postProcessing: function () {
            generateScreenIds();
         }
      },
      i5: {
         name: 'Tabs w/ Missing Sub Function Name',
         group: 'Inquiry Reports',
         isFlagControl: function (control) {
            return control.type === 'TAB' && !control.subFunction;
         }
      },
      i6: {
         name: 'Tabs w/ Missing Tab ID (Screen ID)',
         group: 'Inquiry Reports',
         isFlagControl: function (control) {
            return control.type === 'TAB' && !control.tabId;
         }
      }
   };

   // Initialize to the All Problems Report
   self.report = self.reports.allProblem;

   self.selectFolder = function (e) {
      var fileList = e.target.files;
      self.jsonViewFiles = [];

      for (var i = 0, file; file = fileList[i]; i++) {
         if (file.name.endsWith('.json')) {
            var viewPath = file.webkitRelativePath;

            // A chrome bug removes the nested 'ao' folder when directly selecting the ao module, so add it back
            if (viewPath.startsWith('ao/') && !viewPath.startsWith('ao/ao/')) {
               viewPath = 'ao/' + viewPath;
            }

            // Remove 'modules/' from path
            if (viewPath.startsWith('modules/')) {
               viewPath = viewPath.replace('modules/', '');
            }

            self.jsonViewFiles.push(viewPath);
         }
      }

      // Set number of json view files
      self.fileCount = Locale.formatNumber(self.jsonViewFiles.length, { style: 'integer' });

      // Since event not via angular
      $scope.$apply();
   };

   self.runReport = function () {
      self.results = [];
      self.reportContent = '';
      self.viewIds = {};
      self.isRunning = true;
      self.isAllProblems = self.report === self.reports.allProblem;
      self.currentReport = self.report;

      // Prep the progress bar
      self.progressBar = $('#dev-report-progress-bar').data('progress');
      self.progressBar.update(0);

      // Run pre processing if specified
      if (self.currentReport.preProcessing) {
         self.currentReport.preProcessing();
      }

      // Kick off the run process with the first view (will continue recursively until all views processed)
      runReportOnView(0);
   };

   function runReportOnView(index) {
      var viewPath = self.jsonViewFiles[index];
      var fileResult = {
         viewPath: viewPath,
         flaggedControls: []
      };

      JsonViewService.getViewForDevelopment(viewPath, function (jsonView) {
         var controlIds = [], nextIndex = index + 1;
         scanControl(jsonView, fileResult, controlIds);

         // Update progress bar
         var percent = (nextIndex / self.jsonViewFiles.length) * 100;
         self.progressBar.update(percent.toFixed(1));

         // Proceed with the next view
         if (nextIndex < self.jsonViewFiles.length) {
            runReportOnView(nextIndex);
         } else {
            // Run post processing if specified
            if (self.currentReport.postProcessing) {
               self.currentReport.postProcessing();
            }

            // Report is finished
            MessageService.info('Report Completed', '');
            self.isRunning = false;
         }
      });
   }

   function scanControl(control, fileResult, controlIds) {
      var children = control.children;
      var childControls = control.controls;

      // First pre-process all children
      if (children) {
         for (var i = 0; i < children.length; i++) {
            scanControl(children[i], fileResult, controlIds);
         }
      }
      if (childControls) {
         for (var prop in childControls) {
            if (childControls.hasOwnProperty(prop)) {
               scanControl(childControls[prop], fileResult, controlIds);
            }
         }
      }

      // Check control against all problem reports
      if (self.isAllProblems) {
         for (var rep in self.reports) {
            if (self.reports.hasOwnProperty(rep) && rep.startsWith('p')) {
               if (self.reports[rep].isFlagControl(control, controlIds, fileResult.viewPath)) {
                  addToFlaggedControls(fileResult, control, self.reports[rep].name);
               }
            }
         }
      } else {
         // Check control against single report
         if (self.currentReport.isFlagControl(control, controlIds, fileResult.viewPath)) {
            addToFlaggedControls(fileResult, control);
         }
      }
   }

   function addToFlaggedControls(fileResult, control, reportName) {
      // Add control to list of flagged controls
      fileResult.flaggedControls.push(control);

      // Add report name to control (if passed) so know which problem the control has for the All Problems Report
      if (reportName) {
         control.reportName = reportName;
      }

      // Add to results list if not already
      if (self.results.indexOf(fileResult) < 0) {
         self.results.push(fileResult);
      }
   }

   // Generate list of screen IDs used in inforBusinessContext messages for the ICUA web part
   function generateScreenIds() {
      var screens = [];
      var screenIdMap = {};
      var screen, viewPath, stateScreenId;
      var reportFunctions = ReportService.getReportFunctions();
      var FakeJsonViewService = {
         getView: function (path) { return path; }
      };

      // Get map of viewPath -> tabIds
      var viewToTabIds = {};
      self.results.forEach(function (fileResult) {
         viewPath = fileResult.viewPath;
         viewToTabIds[viewPath] = [];

         fileResult.flaggedControls.forEach(function (control) {
            viewToTabIds[viewPath].push(control.tabId);
         });
      });

      // Process each state in our app
      $state.get().forEach(function (state) {
         var name = state.name || '';
         var base = name.split('.')[0];
         var isExtraMultiple = base.endsWith('2') || base.endsWith('3') || base.endsWith('4') || base.endsWith('5');
         var isBase = !name.includes('.');
         var isEdit = name.endsWith('.edit') && !state.views;
         var isDev = name.startsWith('dev');

         // Skip root state, base states, oeet2+ states, edit states, and dev states
         if (!name || isBase || isExtraMultiple || isEdit || isDev) {
            return;
         }

         // Build screen ID using our logic in ContextService
         stateScreenId = ContextService.getScreenId(state);

         // Filter out duplicates (a few states, like the report list option states, use the same screenId)
         if (screenIdMap[stateScreenId]) {
            return;
         }

         // Add screen(s)
         // Case 1 - "sastt.detail" or "sastt.create", add the screens for all table codes (doc wants these screens by table code)
         // Case 2 - "arra" report state with "arra" in the screenId, add the screens for all other reports
         // Case 3 - "oesf" state, add the screens for all record types (doc wants these screens by record type)
         // Case 4 - Normal screen
         if (name === 'sastt.detail' || name === 'sastt.create') {
            self.sasttTableCodes.forEach(function (tableCode) {
               var sasttScreenId = stateScreenId + '-' + tableCode.codeid.toLowerCase();
               screens.push({ screenId: sasttScreenId, state: name, note: tableCode.descrip });
               screenIdMap[sasttScreenId] = true;
            });
         } else if (name.startsWith('arra.') && stateScreenId.includes('arra')) {
            reportFunctions.forEach(function (reportFn) {
               var repScreenId = stateScreenId.replace('arra', reportFn.functionname);
               screens.push({ screenId: repScreenId, state: name.replace('arra', reportFn.functionname), note: reportFn.menutitle });
               screenIdMap[repScreenId] = true;
            });
         } else if (name.startsWith('oesf.')) {
            self.oesfRecordTypes.forEach(function (recordType) {
               var oesfScreenId = stateScreenId + '-' + recordType.value;
               screens.push({ screenId: oesfScreenId, state: name });
               screenIdMap[oesfScreenId] = true;
            });
         } else {
            screen = { screenId: stateScreenId, state: name };
            screens.push(screen);
            screenIdMap[stateScreenId] = true;
         }

         // Search state's view for tabs
         if (state.views && state.views[Object.keys(state.views)[0]].templateProvider) {
            var templateProvider = state.views[Object.keys(state.views)[0]].templateProvider;

            // Use a fake JsonViewService.getView api to return the viewPath
            viewPath = templateProvider(FakeJsonViewService);

            // If view has tabs
            if (viewToTabIds[viewPath]) {
               var tabIds = viewToTabIds[viewPath];
               screen.note = 'contains tabs';

               // Build each tab's screen ID
               tabIds.forEach(function (tabId) {
                  screens.push({ screenId: stateScreenId + '-' + tabId, state: name, note: 'tab' });
               });
            }
         }
      });

      // Produce content to paste into excel spreadsheet
      screens.forEach(function (screen) {
         self.reportContent += screen.screenId + (screen.note ? '\t' + screen.note : '') + '\n';
      });
   }
});
