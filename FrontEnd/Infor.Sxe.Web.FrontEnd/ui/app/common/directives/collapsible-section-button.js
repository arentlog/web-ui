'use strict';

/**
 * Directive for the collapse/expand button of a section (i.e. oeet cart sidebar)
 */
app.directive('collapsibleSectionButton', function collapsibleSectionButton(Utils) {

   return {
      restrict: 'E',
      scope: true,
      controllerAs: 'csb',
      template: function (element, attrs) {
         var html = '';
         var isCollapseLeft = attrs.direction === 'left';
         var collapseIcon = isCollapseLeft ? 'icon-collapse-app-tray' : 'icon-expand-app-tray';
         var expandIcon = isCollapseLeft ? 'icon-expand-app-tray' : 'icon-collapse-app-tray';

         html += '<button type="button" class="btn-icon" ng-click="csb.collapse(true)" ng-show="!csb.isCollapsed" title="{{\'global.collapse\' | translate}}">';
         html += '<svg class="icon" focusable="false" aria-hidden="true" role="presentation"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#' + collapseIcon + '"></use></svg>';
         html += '</button>';
         html += '<button type="button" class="btn-icon" ng-click="csb.expand(true)" ng-show="csb.isCollapsed" title="{{\'global.expand\' | translate}}">';
         html += '<svg class="icon" focusable="false" aria-hidden="true" role="presentation"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#' + expandIcon + '"></use></svg>';
         html += '</button>';

         return html;
      },
      controller: function ($scope) {
         var self = this;
         self.model = null;
         self.isCollapsed = false;

         // Initialize collapsed value and model binding using the model reference (i.e. base.moduleSidebarCollapsed)
         // Note: this allows the section to remain collapsed/expanded across different states/views within the tab
         self.initialize = function (model) {
            self.model = model;

            // Watch the model to set the initial collapsed/expanded state and to react to programmatic changes
            if (model) {
               $scope.$watch(model, function (value) {
                  if (value) {
                     self.collapse();
                  } else {
                     self.expand();
                  }
               });
            }
         };

         // Collapse the section
         self.collapse = function (isClick) {
            self.collapsibleSection.addClass('collapsed-width');
            self.adjacentSection.addClass('expanded-width');
            self.isCollapsed = true;

            // This makes the visual transition smoother
            self.collapseButton.hide();
            self.expandButton.show();

            // Update model if from user click
            if (isClick && self.model) {
               Utils.setNestedValue($scope, self.model, true);
            }
         };

         // Expand the section
         self.expand = function (isClick) {
            self.adjacentSection.removeClass('expanded-width');
            self.collapsibleSection.removeClass('collapsed-width');
            self.isCollapsed = false;

            // This makes the visual transition smoother
            self.expandButton.hide();
            self.collapseButton.show();

            // Update model if from user click
            if (isClick && self.model) {
               Utils.setNestedValue($scope, self.model, false);
            }
         };
      },
      link: function (scope, element, attrs, ctrl) {
         var $element = $(element);
         var isCollapseLeft = attrs.direction === 'left';

         ctrl.collapsibleSection = $element.parent();
         ctrl.adjacentSection = isCollapseLeft ? ctrl.collapsibleSection.next() : ctrl.collapsibleSection.prev();
         ctrl.collapseButton = $element.find('button:first');
         ctrl.expandButton = ctrl.collapseButton.next();

         ctrl.initialize(attrs.collapsedModel);
      }
   };

});
