'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('sourceViewer', {
      url: '/source-viewer',
      deepStateRedirect: {default: 'sourceViewer.master'},
      sticky: true,
      views: {
         'sourceViewer@': {
            templateUrl: 'ui/app/common/json-view/source-viewer/source-viewer.html',
            controller: 'SourceViewerBaseCtrl as base'
         }
      },
      data: {
         tabTitle: 'title.source.viewer'
      },
      // Check security before allowing user into this state.
      resolve: {
         allowAccess: function ($q, MessageService, PvUser, TabService) {
            var accessLevel = PvUser.webextensiontype ? PvUser.webextensiontype.toLowerCase() : '';
            var deferred = $q.defer();

            // Must have extensibility permission to proceed
            if (accessLevel === 'c' || accessLevel === 's') {
               deferred.resolve();
            } else {
               deferred.reject();
               MessageService.error('special.user.access.denied.title', 'special.user.access.denied.message');
               TabService.closeTab('sourceViewer');
            }

            return deferred.promise;
         }
      }
   });
   $stateProvider.state('sourceViewer.master', {
      url: '/master',
      sticky: true
   });
});

app.controller('SourceViewerBaseCtrl', function (AppInfoService, MessageService, Utils) {
   var self = this;
   self.file = null;
   self.sourceCode = '';

   // Get stored options
   var storageKey = AppInfoService.getLocalStoragePrefix() + 'SOURCEVIEWEROPTIONS';
   var optsString = localStorage[storageKey];

   // Initialize options from storage or use defaults
   if (optsString) {
      self.options = JSON.parse(optsString);
   } else {
      self.options = {
         lineNumbers: true,
         viewerStyle: {
            'font-size': '14px'
         }
      };
   }

   self.saveOptions = function () {
      localStorage[storageKey] = JSON.stringify(self.options);
   };

   self.setStyle = function (style, value) {
      self.options.viewerStyle[style] = value;
      self.saveOptions();
   };

   self.toggleLineNumbers = function () {
      self.options.lineNumbers = !self.options.lineNumbers;
      self.saveOptions();
   };

   self.isFontSize = function (value) {
      return self.options.viewerStyle['font-size'] === value;
   };

   self.copyToClipboard = function () {
      if (self.sourceCode) {
         // Clear all selected ranges
         window.getSelection().removeAllRanges();

         // Select content in code viewer
         var range = document.createRange();
         range.selectNode(document.getElementById('source-code'));
         var sel = window.getSelection();
         sel.addRange(range);

         // Perform copy
         document.execCommand('copy');

         // Clear selection
         sel.removeAllRanges();

         MessageService.info('global.copied.to.clipboard', '');
      }
   };

   self.downloadFile = function () {
      // IE doesn't support the download link feature
      if (Soho.env.browser.name === 'ie') {
         return;
      }

      if (self.file) {
         var link = document.createElement('a');
         link.download = self.file.name;
         link.href = Utils.sanitizeHtml(self.file.path);
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      }
   };
});

/**
 * Directive for the functionality of the source code tree
 */
app.directive('sourceViewerTree', function sourceViewerTree($timeout, DataService, MessageService) {

   return {
      restrict: 'A',
      scope: true,
      controllerAs: 'tree',
      controller: function ($scope) {
         var self = this;
         var base = $scope.base;

         // Get source code tree
         DataService.get('api/shared/jsonview/getsourcecodetree', { busy: true }, function (data) {
            data = JSON.parse(data);
            self.sourceTree = data;

            // Create the tree control after Angular updates the DOM
            $timeout(function () {
               self.element.tree();
            });
         });

         // Open selected file
         self.openFile = function (file) {
            var name = file.name;
            var path = file.path;
            base.file = file;
            base.sourceCode = ''; // clear source window while waiting for new source file

            // Don't try to display huge files and non-text files
            if (path.startsWith('ui/app/assets/languages/') || name.endsWith('.png') || name.endsWith('.gif') ||
               name.endsWith('.jpg') || name.endsWith('.ico') || name.endsWith('.gzip') || name.endsWith('.md')) {
               base.sourceCode = MessageService.get('global.file.cannot.be.displayed');
               return;
            }

            DataService.get(path, { busy: false }, function (data) {
               // json views come as objects, so need to convert to string
               if (typeof data === 'object') {
                  data = JSON.stringify(data, null, 2);
               }

               // Escape html in code
               data = data.replace(/</g, '&lt;').replace(/>/g, '&gt;');

               // Divide lines of code into <code> elements so can show line numbers via css
               data = '<code>' + data.replace(/[\r]/g, '').replace(/[\n]/g, '</code>\n<code>') + '</code>';

               // Display source code
               base.sourceCode = data;
            });
         };
      },
      link: function (scope, element, attrs, ctrl) {
         // Add element to ctrl
         ctrl.element = element;
      }
   };

});

/**
 * Directive for recursively displaying directories and files in source code tree
 */
app.directive('sourceCodeNode', function sourceCodeNode() {

   return {
      restrict: 'A',
      scope: true,
      template:
      // directories
      '<li ng-repeat="dir in node.children">' +
      '<a href="#">{{dir.name}}</a>' +
      '<ul source-code-node="dir"></ul>' +
      '</li>' +
      // files
      '<li ng-repeat="file in node.files">' +
      '<a href="#" ng-click="tree.openFile(file)">{{file.name}}</a>' +
      '</li>',
      link: function (scope, element, attrs) {
         // Get the node (directory) from the attrs and set on scope
         scope.node = scope.$eval(attrs.sourceCodeNode);
      }
   };

});

/**
 * Directive for the source viewer toolbar
 */
app.directive('sourceViewerToolbar', function sourceViewerToolbar() {

   return {
      restrict: 'A',
      scope: false,
      link: function (scope, element) {
         // Create tooltips after angular has translated the strings (Soho doesn't initialize tooltips in toolbars)
         setTimeout(function () {
            element.find('button').tooltip();
         }, 1);
      }
   };

});