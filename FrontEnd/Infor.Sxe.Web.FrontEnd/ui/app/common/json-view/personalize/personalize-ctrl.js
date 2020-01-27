'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('personalize', {
      url: '/personalize?viewPath&level&profile&user',
      deepStateRedirect: {default: 'personalize.master'},
      sticky: true,
      views: {
         'personalize@': {
            templateUrl: 'ui/app/common/json-view/personalize/views/personalize-view.html',
            controller: 'PersonalizeBaseCtrl as base'
         }
      },
      data: {
         tabTitle: 'title.personalize'
      }
   });
   $stateProvider.state('personalize.master', {
      url: '/master',
      sticky: true
   });
});

app.controller('PersonalizeBaseCtrl', function ($compile, $scope, $state, $stateParams, CustomControls, DataService, JsonViewConverter, JsonViewService, MessageService, ModalService, PersonalizeService, PvUser, UserService, Utils, WysiwygService) {
   var self = this;
   var converter = null;
   var accessLevel = PvUser.webmodificationaccesslevel || '';
   self.showAdvancedOptions = accessLevel.toLowerCase() === 'p' || accessLevel.toLowerCase() === 'c';
   self.viewPath = $stateParams.viewPath;
   self.defaultJsonView = null;
   self.defaultControl = null;
   self.defaultControlMap = null;
   self.defaultParentMap = null;
   self.personalData = null;
   self.jsonView = null;
   self.control = null;
   self.change = null;
   self.webModRecord = null;

   // Personalization levels
   self.LEVEL_USER = 'o';
   self.LEVEL_PROFILE = 'p';
   self.LEVEL_COMPANY = 'c';

   // Property names that are personalizable
   self.personalizableProperties = ['label', 'size', 'width', 'defaultSort', 'autoFocus', 'extra'];

   // Auto focus drop down options
   self.autoFocusOptions = [
      { label: MessageService.get('global.yes'), value: true },
      { label: MessageService.get('global.no'), value: false }
   ];

   // Visibility drop down options
   self.visibilityOptions = [
      { label: MessageService.get('global.yes'), value: false }, // extra: false
      { label: MessageService.get('global.no'), value: true } // extra: true
   ];

   // Get view to personalize
   self.getView = function (level, user, profile) {

      // Bind criteria for display
      self.criteria = {
         level: level,
         user: user,
         profile: profile,
         cono: UserService.getCono()
      };

      if (level === self.LEVEL_USER) {
         self.levelText = MessageService.get('global.user');
      } else if (level === self.LEVEL_PROFILE) {
         self.levelText = MessageService.get('global.profile');
      } else if (level === self.LEVEL_COMPANY) {
         self.levelText = MessageService.get('global.company');
      }

      JsonViewService.getViewForPersonalize(self.viewPath, level, user, profile, function (defaultJsonView, jsonView, personalData, webModRecord) {
         converter = new JsonViewConverter(self.viewPath, 'personalize');
         self.defaultJsonView = defaultJsonView;
         self.jsonView = jsonView;
         self.personalData = personalData;
         self.webModRecord = webModRecord;
         self.defaultControlMap = PersonalizeService.buildControlMap(defaultJsonView);
         self.defaultParentMap = PersonalizeService.buildParentMap(defaultJsonView);
         renderView(jsonView);
         removeObsoleteChanges();
      });
   };

   // Show advanced options modal or go straight to specified personalization level/type
   if (self.showAdvancedOptions && !$stateParams.level) {
      ModalService.showModal('/ui/app/common/json-view/personalize/views/personalize-criteria-modal.json', 'PersonalizeCriteriaCtrl as pc', $scope, function (modal) {
         self.criteriaModal = modal;
      });
   } else {
      var initialType = $stateParams.level || self.LEVEL_USER;
      var initialUser = initialType === self.LEVEL_USER ? ($stateParams.user || UserService.getUserName()) : '';
      var initialProfile = initialType === self.LEVEL_PROFILE ? $stateParams.profile : '';
      self.getView(initialType, initialUser, initialProfile);
   }

   // Change options in criteria modal
   self.changeOptions = function () {
      MessageService.okCancel('global.confirmation', 'wysiwyg.change.options.confirmation', function () {
         ModalService.showModal('/ui/app/common/json-view/personalize/views/personalize-criteria-modal.json', 'PersonalizeCriteriaCtrl as pc', $scope, function (modal) {
            self.criteriaModal = modal;
         });
      });
   };

   // Save requested
   self.saveView = function () {
      // Check if creating a new personalization record that has no changes. This prevents people from accidentally
      // creating records they don't really want out there (i.e. an empty user record overriding a profile record).
      if (!self.webModRecord.webmodRowID && self.personalData.changes.length === 0) {
         MessageService.okCancel('global.confirmation', 'wysiwyg.save.no.changes.confirmation', function () {
            JsonViewService.savePersonalizationRecord(self.viewPath, self.personalData, self.webModRecord, function (webModRecord) {
               self.webModRecord = webModRecord;
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            });
         });
      } else {
         JsonViewService.savePersonalizationRecord(self.viewPath, self.personalData, self.webModRecord, function (webModRecord) {
            self.webModRecord = webModRecord;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      }
   };

   // Reset to default
   self.resetViewToDefault = function () {
      MessageService.okCancel('global.confirmation', 'wysiwyg.reset.to.default.layout.confirmation', function () {
         JsonViewService.deletePersonalizationRecord(self.viewPath, self.webModRecord, function () {
            MessageService.info('global.information', 'wysiwyg.reset.to.default.layout.success');

            // Refresh view
            self.getView(self.criteria.level, self.criteria.user, self.criteria.profile);
         });
      });
   };

   // Is current control one of the given types
   self.isType = function (types) {
      return self.control ? types.indexOf(self.control.type) >= 0 : false;
   };

   // Is current control a field with one of the given field types
   self.isFieldType = function (types) {
      return self.control.type === 'FIELD' && types.indexOf(self.control.subType) >= 0;
   };

   // Is control able to have 'size'
   // Note: although Time controls could have size in the future, SoHo currently does not support it
   self.isSizeAllowed = function () {
      return self.control.type === 'FIELD' && !self.isFieldType(['CHECKBOX', 'INFO', 'RADIO_SET', 'TIME']);
   };

   // Is control able to have 'autoFocus'
   self.isAutoFocusAllowed = function () {
      return self.control.type === 'BTN' || (self.control.type === 'FIELD' && self.control.subType !== 'INFO');
   };

   // Is control able to be hidden ('extra')
   self.isHiddenAllowed = function () {
      var isMainToolbar = self.control.type === 'TOOLBAR' && self.parent && (self.parent.type === 'MOD_CNTR' || self.parent.type === 'ACTION_PANEL');
      return !isMainToolbar && !self.isType(['COL', 'ROW']);
   };

   // Personalize a sub view or custom control's view
   self.personalizeSubView = function (controlId) {
      var control = converter.controlIdToControlMap[controlId];
      var viewPath;

      if (control.type === 'SUB_VIEW' && control.subType !== 'HTML') {
         viewPath = control.viewPath;
      } else if (control.type === 'CUSTOM') {
         viewPath = CustomControls[control.subType].jsonView;
      }

      if (viewPath && !viewPath.startsWith('{{')) {
         $state.go('personalize.master', { viewPath: viewPath, level: self.criteria.level, profile: self.criteria.profile, user: self.criteria.user });
      } else {
         MessageService.error('global.error', 'wysiwyg.error.cannot.personalize.control');
      }
   };

   // Move a control back or forward in its parent's list
   self.moveControl = function (controlId, isBack) {
      var control = converter.controlIdToControlMap[controlId];
      var parent = converter.controlIdToParentMap[controlId];
      var array = parent.children;
      var currentIndex = array ? array.indexOf(control) : -1;

      // Check if allowed to move before proceeding
      if (!array || currentIndex < 0) {
         MessageService.error('global.error', 'wysiwyg.error.move.unmovable');
      } else if (isBack && currentIndex === 0) {
         MessageService.error('global.error', 'wysiwyg.error.move.back');
      } else if (!isBack && currentIndex === array.length - 1) {
         MessageService.error('global.error', 'wysiwyg.error.move.forward');
      } else {
         var newIndex = isBack ? currentIndex - 1 : currentIndex + 1;

         // Remove control from parent
         array.splice(currentIndex, 1);

         // Re-add at new index (current - 1 or current + 1)
         array.splice(newIndex, 0, control);

         // Update sequence on change objects for all controls in this list
         updateSequenceNumbers(parent);

         // Update view
         renderControl(parent);
      }
   };

   // TODO: ap - change $scope to self after refactor some things
   $scope.openControlMenu = function (controlId) {
      self.control = converter.controlIdToControlMap[controlId];

      // Get control element
      var $control = $('#personalize-content').find('[data-control-id="' + controlId + '"]');

      // If can't find within wysiwyg content, search globally (since may be a popdown which gets moved elsewhere)
      if ($control.length === 0) {
         $control = $('body').find('[data-control-id="' + controlId + '"]');
      }

      // Get actions button
      var $actionBtn = $control.find('.control-toolbar:first button');

      // Grids position their actions button deeper
      if (self.control.type === 'GRID') {
         $actionBtn = $control.find('.grid-body:first').find('.control-toolbar:first button');
      }

      // Anchor menu to the action button, or the control (or a nearby control if hidden so menu shows nearby)
      var menuAnchor, moreOpts;
      if ($actionBtn.length) {
         menuAnchor = $actionBtn;
      } else if ($control.is(':hidden') && $control.closest('.toolbar').length) {
         // For hidden toolbar buttons (overflowed) anchor to nearest visible button (otherwise menu displays in far corner)
         menuAnchor = $control.closest('.toolbar').find('.buttonset button:visible:last');
         moreOpts = { offset: { x: 0, y: 45 } };
      } else {
         menuAnchor = $control;
      }

      // Close menu if currently open
      if (menuAnchor.is('.is-open')) {
         var popupMenu = menuAnchor.data('popupmenu');
         if (popupMenu) {
            popupMenu.close();
         }
      } else {
         // Open menu from anchor point (delay until scope applies so that menu is updated for current control)
         setTimeout(function () {
            var options = { menu: 'personalize-menu', trigger: 'immediate', attachToBody: true };
            if (moreOpts) {
               Utils.extend(options, moreOpts);
            }
            menuAnchor.popupmenu(options);
         }, 150);
      }
   };

   self.editControl = function (controlId) {
      var change = getChange(controlId);
      self.control = converter.controlIdToControlMap[controlId];
      self.parent = converter.controlIdToParentMap[controlId];
      self.defaultControl = self.defaultControlMap[controlId];
      self.isFieldRequired = self.defaultControl.required;
      self.isLabelDynamic = false;

      // Edit copy of existing change (actual data only applied upon OK) or initialize new change
      if (change) {
         self.change = angular.copy(change);
      } else {
         self.change = { id: controlId };
      }

      // Add all default personalizable values to the change (otherwise the values displayed in the modal won't be accurate)
      for (var i = 0; i < self.personalizableProperties.length; i++) {
         var prop = self.personalizableProperties[i];

         // Add if there is a default property and the change doesn't already have that property defined
         // Note: Exclude 'label' since it's handled in a special way
         if (self.defaultControl[prop] !== undefined && self.change[prop] === undefined && prop !== 'label') {
            self.change[prop] = self.defaultControl[prop];
         }
      }

      // If the size is undefined on this change, then initialize it to the default value so that the "Size" dropdown
      // displays the right value and that value gets persisted for this change (default is medium except for dates).
      if (self.isSizeAllowed() && self.change.size === undefined) {
         self.change.size = self.control.subType === 'DATE' ? 'SM' : 'MD';
      }

      // If the autoFocus flag is undefined on this change, or if another change has autoFocus set to true,
      // then initialize it to false so that the "Auto Focus" dropdown displays the right value and that value gets persisted for this change.
      if (self.isAutoFocusAllowed() && (self.change.autoFocus === undefined || isAutoFocusOnAnotherChange(self.change))) {
         self.change.autoFocus = false;
      }

      // If the extra (visibility) flag is undefined on this change, initialize it to false so that the
      // "Visible" dropdown displays the right value and that value gets persisted for this change.
      if (self.change.extra === undefined) {
         self.change.extra = false;
      }

      // Default label display (normal translated label or dynamically populated)
      var defaultLabel = self.defaultControl.label || '';
      if (defaultLabel.startsWith('{{')) {
         self.defaultLabel = MessageService.get('wysiwyg.dynamic.label.display');
         self.isLabelDynamic = true;
      } else if (defaultLabel) {
         self.defaultLabel = MessageService.get(defaultLabel);
      } else {
         self.defaultLabel = '';
      }

      // Show modal
      DataService.get('ui/app/common/json-view/personalize/views/personalize-control.html', function (html) {
         var newScope = $scope.$new();

         // Compile the Angularized HTML before sending to modal call
         var compiledHtml = $compile(html)(newScope);
         var $modal = $(compiledHtml);

         // Grab modal api upon open so can close the modal when desired (SoHo doesn't make modal available until after 'open' event)
         // Note: using 'one' instead of 'on' to avoid clashes when lookups within modals are opened
         $modal.one('open', function (e, modal) {
            self.controlModal = modal;
         });

         // Destroy new scope when modal is destroyed
         $modal.one('destroy', function () {
            newScope.$destroy();
            self.controlModal = null;
         });

         // Activate modal
         $('body').contextualactionpanel({ content: $modal, initializeContent: false, trigger: 'immediate' });
      });
   };

   self.applyEdit = function () {
      var control = converter.controlIdToControlMap[self.control.id];
      var change = getChange(control.id);

      // Update the real change object or add new change
      if (change) {
         Utils.replaceObject(change, self.change);
      } else {
         self.personalData.changes.push(self.change);
      }

      // If auto focus is true, remove auto focus from all other change objects
      if (self.change.autoFocus) {
         var length = self.personalData.changes.length;

         for (var i = 0; i < length; i++) {
            var c = self.personalData.changes[i];

            if (c.id !== self.change.id) {
               delete c.autoFocus;
            }
         }
      }

      // Before re-rendering we need to refresh the control by...
      // 1. Reapplying default properties
      //    - Note: This is important because if a certain change property is removed, we want to revert back to the default
      //    - Right now only 'label' behaves like this
      // 2. Reapplying changes
      control.label = self.defaultControl.label;
      Utils.extend(control, self.change);

      // If the user has personalized the label, flag the control as not needing label translation
      control.isLabelFromUser = self.change.label ? true : false;

      // Update view
      // - edited grid columns need to re-render grid in order to update mock grid cells
      // - edited tabs need to re-render tab set in order to update tab labels
      // - edited options need to re-render field/grid column in order to update SoHo drop down
      // - edited menu options need to re-render parent in order to update menu display
      // - edited wizard ticks need to re-render wizard in order to re-init wizard
      if (control.type === 'GRID_COL' || control.type === 'TAB' || control.type === 'OPT'
         || control.type === 'MENU_OPT' || control.type === 'WIZARD_TICK') {
         var parent = converter.controlIdToParentMap[control.id];
         renderControl(parent);
      } else {
         renderControl(control);
      }

      self.controlModal.destroy();
   };

   self.cancelEdit = function () {
      self.controlModal.destroy();
   };

   // When a certain field changes, delete the given property if it's blank (undefined, null, empty).
   self.deleteIfBlank = function (property) {
      var object, prop;

      // Compound property or regular
      if (property.includes('.')) {
         var pieces = property.split('.');

         object = self.change[pieces[0]];
         prop = pieces[1];
      } else {
         object = self.change;
         prop = property;
      }

      // Delete if blank
      if (!object[prop]) {
         delete object[prop];
      }
   };

   // Store the resized width of a grid column (called from the mock-grid directive)
   self.resizeGridColumn = function (controlId, width) {
      var control = converter.controlIdToControlMap[controlId];
      var change = getChange(controlId);

      // Add new change if doesn't exist
      if (!change) {
         change = { id: controlId };
         self.personalData.changes.push(change);
      }

      // Apply width to control and change object
      control.width = width;
      change.width = width;
   };


   // Private methods

   // Get a personalization change object by control id
   function getChange(controlId) {
      var changes = self.personalData.changes;

      for (var i = 0; i < changes.length; i++) {
         var obj = changes[i];

         if (obj.id === controlId) {
            return obj;
         }
      }

      return null;
   }

   // Update sequence numbers on change objects for all controls in the parent's children
   // Note: This is needed so that all changes have the newest sequence numbers (instead of stale numbers)
   //       The initial rendering of a view uses these numbers to sort the controls for proper sequential display
   function updateSequenceNumbers(parent) {
      var i, control, change, defaultParent;
      var list = parent.children;

      for (i = 0; i < list.length; i++) {
         control = list[i];
         change = getChange(control.id);
         defaultParent = self.defaultParentMap[control.id];

         // Initialize new change if none existing
         if (!change) {
            change = { id: control.id };
            self.personalData.changes.push(change);
         }

         // Set sequence for each control's change
         change.sequence = i;

         // Set (or reset) parentId on change objects (controls can be moved to a different parent in certain cases)
         if (defaultParent.id !== parent.id) {
            change.parentId = parent.id;
         } else {
            delete change.parentId;
         }
      }
   }

   // Check if autoFocus is true on another change object
   function isAutoFocusOnAnotherChange(change) {
      var changes = self.personalData.changes;

      for (var i = 0; i < changes.length; i++) {
         var obj = changes[i];

         if (obj.autoFocus && obj.id !== change.id) {
            return true;
         }
      }

      return false;
   }

   // Remove obsolete changes (i.e. a change for a control that no longer exists)
   function removeObsoleteChanges() {
      var changes = self.personalData.changes;

      // Scan changes for removal (loop from end to beginning so that indexes are valid even after removals)
      for (var i = changes.length - 1; i >= 0; i--) {
         var change = changes[i];
         var control = converter.controlIdToControlMap[change.id];

         // Remove if there's no control for this id
         if (!control) {
            changes.splice(i, 1);
         }
      }
   }

   // Initial render of view
   function renderView(jsonView) {
      var $view = $('#personalize-content');

      // Build full html
      var html = converter.getHtml(jsonView);

      // Add html to view
      var compiledHTML = $compile(html)($scope.$new());
      $view.html(compiledHTML);

      // Apply post render processing
      postRenderProcessing(jsonView, $view, null);

      // Add drag and drop events once on the content container (otherwise duplicate events can fire)
      addDragDropEvents($view.get(0));
   }

   // Subsequent refreshes of a control in the hierarchy
   function renderControl(control) {
      var reselectionControl = null;
      var parent = converter.controlIdToParentMap[control.id];

      // Note: If rendering button in toolbar, need to render whole toolbar to get button's children to update
      //       If rendering grid column, need to render whole grid in order to update mock cells
      //       If rendering tab, need to render whole tab set for the control to initialize properly
      if ((control.type === 'BTN' && parent.type === 'TOOLBAR') || control.type === 'GRID_COL' || control.type === 'TAB') {
         control = parent;
         parent = converter.controlIdToParentMap[parent.id];
      }

      // Build html
      var html = converter.buildControl(control, parent);

      // Get DOM element of control
      var $controlElement = $('#personalize-content').find('[data-control-id="' + control.id + '"]');

      // If rendering a tab set, remember the selected tab so we can reselect it after the tab set is reinitialized
      if (control.type === 'TAB_SET') {
         var tabControlId = $controlElement.data('tabs').panels.filter(':visible').attr('data-control-id');
         reselectionControl = tabControlId ? converter.controlIdToControlMap[tabControlId] : null;
      }

      // Replace html of control
      var compiledHTML = $compile(html)($scope);
      $controlElement = $(compiledHTML).replaceAll($controlElement);

      // Apply post render processing
      postRenderProcessing(control, $controlElement, reselectionControl);
   }

   function postRenderProcessing(control, $element, reselectionControl) {
      // Enable drag and drop (on all elements that have a control id)
      $element.add($element.find('*')).filter('[data-control-id]').each(function () {
         var $control = $(this);

         // Enable drag (except for root view)
         if (!$control.is('.view') && !$control.is('.builder-actions')) {
            $control.attr('draggable', 'true');
         }

         // Enable drop
         $control.attr('ondragover', 'event.preventDefault()');
      });

      // SoHo Initialize (don't re-init a view or modal; delay so angular compile finishes first)
      if (control.type !== 'VIEW' && control.type !== 'MODAL' && control.type !== 'ACTION_PANEL') {
         setTimeout(function () {
            $element.initialize();

            // Reselect the proper tab if needed
            if (reselectionControl && reselectionControl.type === 'TAB') {
               var tabsControl = $element.data('tabs');
               var $tab = $element.find('[data-control-id="' + reselectionControl.id + '"]');
               tabsControl.select($tab.attr('id'));
            }
         }, 1);
      }
   }

   function addDragDropEvents(element) {
      WysiwygService.addDragDropEvents(element, self.jsonView, converter, true, dragDropSuccessCallback);
   }

   function dragDropSuccessCallback(controlsToRender, controlsWithDirtyChildren) {

      // Update sequence on change objects for all controls in the modified lists
      updateSequenceNumbers(controlsWithDirtyChildren[0]);

      // There can be a 2nd control list that may need re-sequenced
      if (controlsWithDirtyChildren.length >= 2) {
         updateSequenceNumbers(controlsWithDirtyChildren[1]);
      }

      // Re-render controls that are needed
      renderControl(controlsToRender[0]);

      // There can be a 2nd control that may need re-rendered
      if (controlsToRender.length >= 2) {
         renderControl(controlsToRender[1]);
      }
   }

});

app.controller('PersonalizeCriteriaCtrl', function ($scope, PvUser, TabService, UserService) {
   var self = this;
   var base = $scope.base;
   var accessLevel = PvUser.webmodificationaccesslevel || '';
   self.showProfileOption = accessLevel.toLowerCase() === 'p' || accessLevel.toLowerCase() === 'c';
   self.showCompanyOption = accessLevel.toLowerCase() === 'c';

   // Use current criteria or initialize new values
   if (base.criteria) {
      self.type = base.criteria.level;
      self.profile = base.criteria.profile;
   } else {
      self.type = base.LEVEL_USER;
      self.profile = '';
   }

   self.submit = function () {
      base.criteriaModal.destroy();

      // Use current user if type is user
      var user = self.type === base.LEVEL_USER ? UserService.getUserName() : '';

      // Use selected profile if type is profile
      var profile = self.type === base.LEVEL_PROFILE ? self.profile : '';

      // Get view and personalization record with selected criteria
      base.getView(self.type, user, profile);
   };

   self.cancel = function () {
      base.criteriaModal.destroy();

      // If canceling the initial modal, then close the personalize tab since we have nothing to display
      if (!base.criteria) {
         TabService.closeTab('personalize');
      }
   };
});

/**
 * Directive for the personalize button
 */
app.directive('personalizeButton', function personalizeButton($state, PvUser) {

   // Access level values that causes the button to be enabled
   var enabledValues = ['u', 'p', 'c'];

   return {
      restrict: 'A',
      scope: true,
      controllerAs: 'perbtn',
      controller: function () {
         var self = this;

         // Click action
         self.personalizeView = function (viewPath) {
            var $body = $('body');

            // When personalizing a modal or cap, we need to close the modal so user can see the personalize state
            if ($body.is('.modal-engaged')) {
               $body.children('.modal-page-container:visible').each(function () {
                  $(this).find('.modal').data('modal').destroy();
               });
            }

            // Go to personalize state
            $state.go('personalize.master', { viewPath: viewPath });
         };
      },
      link: function (scope, element) {
         var accessLevel = PvUser.webmodificationaccesslevel || '';

         // Remove the button if the user doesn't have permission to personalize
         if (enabledValues.indexOf(accessLevel.toLowerCase()) < 0) {
            element.remove();
         }
      }
   };

});