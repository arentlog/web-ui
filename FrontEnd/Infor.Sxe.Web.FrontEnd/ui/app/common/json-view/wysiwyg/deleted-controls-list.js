'use strict';

/**
 * Directive for Deleted Controls list in wysiwyg.
 */
app.directive('deletedControlsList', function deletedControlsList(ControlMeta, MessageService) {

   return {
      restrict: 'E',
      scope: true,
      controllerAs: 'dcl',
      template: function () {
         var html = '';
         html += '<div class="contextual-toolbar toolbar is-hidden">';
         html += '<div class="buttonset">';
         html += '<button class="btn-tertiary" type="button" ng-click="dcl.restoreControl()"><span translate>global.restore</span></button>';
         html += '</div>';
         html += '</div>';
         html += '<div class="listview" data-options=\'{"selectable": "single"}\'>';
         html += '<ul>';
         html += '<li ng-repeat="control in dcl.deletedControls" data-control-id="{{control.id}}">';
         html += '<p class="listview-heading">{{dcl.getLabelDisplay(control.label)}}</p>';
         html += '<p class="listview-subheading">{{dcl.getTypeDisplay(control.type)}}, {{control.id}}</p>';
         html += '</li>';
         html += '</ul>';
         html += '</div>';
         return html;
      },
      controller: function () {
         var self = this;
         self.deletedControls = null;
         self.jsonViewConverter = null;
         self.defaultControlMap = null;
         self.defaultParentMap = null;
         self.renderControlFunction = null;

         // Initialize with data from the wysiwyg controller
         self.initialize = function (extensionData, jsonViewConverter, defaultControlMap, defaultParentMap, renderControlFunction) {
            var deletions = extensionData.deletions || [];
            self.deletedControls = [];
            self.jsonViewConverter = jsonViewConverter;
            self.defaultControlMap = defaultControlMap;
            self.defaultParentMap = defaultParentMap;
            self.renderControlFunction = renderControlFunction;

            for (var i = 0; i < deletions.length; i++) {
               var id = deletions[i].id;
               var control = self.defaultControlMap[id];

               if (control) {
                  self.deletedControls.push(control);
               }
            }
         };

         // Add a deleted control
         self.addToList = function (control) {
            self.deletedControls.push(control);
         };

         // Get the display text for the control label
         self.getLabelDisplay = function (label) {
            if (!label) {
               return '';
            } else if (label.startsWith('{{')) {
               return MessageService.get('wysiwyg.sample.label.dynamic');
            } else {
               return MessageService.get(label);
            }
         };

         // Get the display text for the control type
         self.getTypeDisplay = function (type) {
            var controlMeta = ControlMeta[type];
            return controlMeta ? MessageService.get(controlMeta.displayName) : '';
         };

         // Restore a deleted default control
         self.restoreControl = function () {
            var listView = self.element.find('.listview').data('listview');

            // Find the selected item in the list
            var selectedItem = listView.element.find('li.is-selected');

            // Get control id
            var controlId = parseInt(selectedItem.attr('data-control-id'), 10);

            var defaultControl = self.defaultControlMap[controlId];
            var defaultParent = self.defaultParentMap[controlId];
            var parent = self.jsonViewConverter.controlIdToControlMap[defaultParent.id];

            // If parent not in the view, then do not proceed and notify that they need to restore container control first
            if (!parent) {
               MessageService.error('global.error', 'wysiwyg.error.restore.deleted.control.missing.container');
               return;
            }

            // Determine default location
            var index = defaultParent.children ? defaultParent.children.indexOf(defaultControl) : -1;
            var inChildren = index >= 0;

            // Add control to parent's "children" or "controls"
            if (inChildren) {
               // Add as close as possible to where it used to be
               if (index < parent.children.length) {
                  parent.children.splice(index, 0, defaultControl);
               } else {
                  parent.children.push(defaultControl);
               }
            } else if (defaultParent.controls) {
               // Find this control among the property names in default parent's controls
               for (var name in defaultParent.controls) {
                  if (defaultParent.controls.hasOwnProperty(name) && defaultParent.controls[name] === defaultControl) {
                     parent.controls = parent.controls || {};
                     parent.controls[name] = defaultControl;
                  }
               }
            }

            // Remove from list
            for (var i = 0; i < self.deletedControls.length; i++) {
               var control = self.deletedControls[i];

               if (control.id === controlId) {
                  self.deletedControls.splice(i, 1);
                  break;
               }
            }

            // Tell SoHo to remove the item (so selection status gets updated)
            listView.remove(selectedItem);

            // Update view by rendering parent
            self.renderControlFunction(parent);
         };
      },
      link: function (scope, element, attrs, ctrl) {
         ctrl.element = element;

         // Make this ctrl api accessible by the wysiwyg ctrl
         // Note: Normally we never use $parent, however the wysiwyg was written in the old angular way of no ctrl aliases
         scope.$parent.$parent.deletedControlsList = ctrl;
      }
   };

});
