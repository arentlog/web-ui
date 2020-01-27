'use strict';

/**
 * Directive for our custom actions button at the top of modals and widgets (for personalize, extend, etc.)
 */
app.directive('viewActionsButton', function viewActionsButton(DevToolsService) {

   return {
      restrict: 'E',
      scope: true,
      controllerAs: 'vab',
      template: function (element, attrs) {
         var html = '';
         var viewPath = attrs.viewPath;

         html += '<button class="btn-actions" type="button" ng-disabled="!hasMenuOptions"><svg class="icon" focusable="false"><use xlink:href="#icon-more"></use></svg></button>';
         html += '<ul class="popupmenu has-icons">';
         html += '<li dev-only><a ng-click="vab.editView(\'' + viewPath + '\')"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-edit"></use></svg><span translate>global.edit</span></a></li>';
         html += '<li extension-menu><a ng-click="extmenu.extendView(\'' + viewPath + '\')"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-workflow"></use></svg><span translate>global.extend</span></a></li>';
         html += '<li personalize-button><a ng-click="perbtn.personalizeView(\'' + viewPath + '\')"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-settings"></use></svg><span translate>global.personalize</span></a></li>';
         html += '<li><a ng-click="vab.showActiveViewInfo()"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-info"></use></svg><span translate>global.view.info</span></a></li>';
         html += '</ul>';
         return html;
      },
      controller: function ($scope) {
         var self = this;

         // Edit view (development environment)
         self.editView = function (viewPath) {
            DevToolsService.openViewEditor(viewPath);
         };

         // Show active view info
         self.showActiveViewInfo = function () {
            DevToolsService.showActiveViews($scope, 'info');
         };
      },
      link: function (scope, element) {
         var $element = $(element);
         var menuOptionsLength = $element.find('ul:first').children().length;

         // Does menu have any options to display
         scope.hasMenuOptions = menuOptionsLength > 0;
      }
   };

});
