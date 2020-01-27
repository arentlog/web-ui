'use strict';

/**
 * For running development batch scripts on our json view files
 */

app.config(function ($stateProvider) {
   $stateProvider.state('devBatchScripts', {
      url: '/dev/batch-scripts',
      deepStateRedirect: {default: 'devBatchScripts.master'},
      sticky: true,
      data: {
         tabTitle: 'Dev Batch Scripts'
      }
   });
   $stateProvider.state('devBatchScripts.master', {
      url: '/master',
      sticky: true,
      views: {
         'devBatchScripts@': {
            templateUrl: 'ui/app/dev/batch-scripts/dev-batch-scripts.html',
            controller: 'DevBatchScriptsCtrl as devbat'
         }
      }
   });
});

app.controller('DevBatchScriptsCtrl', function ($scope, DataService, GridColumnTypes, JsonViewService, MessageService) {
   var self = this;
   self.jsonViewFiles = [];

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

      // Since event not via angular
      $scope.$apply();
   };

   self.runBatchScript = function () {
      var length = self.jsonViewFiles.length;

      if (length === 0) {
         return;
      }

      // Start busy
      $('body').trigger('start.busyindicator');

      // Kick off the run process with the first view (will continue recursively until all views processed)
      runScriptOnView(0);
   };

   function runScriptOnView(index) {
      var viewPath = self.jsonViewFiles[index];

      JsonViewService.getViewForDevelopment(viewPath, function (jsonView) {
         var nextIndex = index + 1;

         // Process each control in the view recursively
         preProcessControlBeforeSave(jsonView);

         // Save view
         var params = { path: viewPath };
         DataService.post('api/shared/jsonview/savedefaultview', { params: params, data: jsonView });

         // Proceed with the next view
         if (nextIndex < self.jsonViewFiles.length) {
            runScriptOnView(nextIndex);
         } else {
            // Report is finished
            $('body').trigger('complete.busyindicator');
            MessageService.info('Batch Script Completed', '');
         }
      });
   }

   var count = 0;
   function preProcessControlBeforeSave(control, parent) {
      var children = control.children;
      var childControls = control.controls;

      // First pre-process all children
      if (children) {
         for (var i = 0; i < children.length; i++) {
            preProcessControlBeforeSave(children[i], control);
         }
      }
      if (childControls) {
         for (var prop in childControls) {
            if (childControls.hasOwnProperty(prop)) {
               preProcessControlBeforeSave(childControls[prop], control);
            }
         }
      }

      // Perform desired change...
      // if (control.type === 'TAB') {
      //    control.tabId = control.label.replace('global.', '').replace(/\./g, '-').toLowerCase();
      // }

      // Remove certain objects if they are empty
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
