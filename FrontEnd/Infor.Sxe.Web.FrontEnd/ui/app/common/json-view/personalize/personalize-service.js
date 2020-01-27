'use strict';

app.service('PersonalizeService', function PersonalizeService(Utils) {
   var self = this;

   /* Public methods */

   /**
    * Apply personalization changes to the json view
    */
   self.applyPersonalizationChanges = function (jsonView, personalData) {
      var change, control, parent, newParent, controlMap, parentMap;
      var changes = personalData.changes;
      var controlListsToSort = {};

      // No need to proceed if no changes
      if (!changes || changes.length === 0) {
         return;
      }

      // Build maps of controls for easy lookup by id
      controlMap = self.buildControlMap(jsonView);
      parentMap = self.buildParentMap(jsonView);

      // Apply each change to its control (matching by id)
      for (var i = 0; i < changes.length; i++) {
         change = changes[i];
         control = controlMap[change.id];
         parent = parentMap[change.id];

         // If can't find control, ignore this change
         if (!control) {
            continue;
         }

         // Add all properties from change to control
         Utils.extend(control, change);

         // If the user has personalized the label, flag the control as not needing label translation
         if (change.label) {
            control.isLabelFromUser = true;
         }

         // If the user has personalized the autoFocus, flag the control for auto focus override (which takes priority)
         if (change.autoFocus) {
            control.isAutoFocusFromUser = true;
         }

         // If control has no parent (i.e. the root control), then don't proceed with parent and sequence alterations
         if (!parent) {
            continue;
         }

         // If change has a parent that is different than the default parent, then move the control
         if (change.parentId && change.parentId !== parent.id) {
            newParent = controlMap[change.parentId];

            if (newParent) {
               // Remove control from default parent
               parent.children.splice(parent.children.indexOf(control), 1);

               // Add control to new parent
               if (!newParent.children) {
                  newParent.children = [];
               }
               newParent.children.push(control);

               // Update parent reference to be the new parent
               parent = newParent;
            }
         }

         // If change has a sequence number, add parent's children to controlListsToSort
         if (change.sequence !== undefined && parent.children) {
            controlListsToSort[parent.id] = parent.children;
         }
      }

      // Sort controls by sequence (only the lists that need sorting)
      for (var prop in controlListsToSort) {
         if (controlListsToSort.hasOwnProperty(prop)) {
            controlListsToSort[prop].sort(compareBySequence);
         }
      }
   };

   /**
    * Build map of controls for easy lookup by id
    */
   self.buildControlMap = function (jsonView) {
      var controlMap = {};

      addControlToMap(jsonView, controlMap);

      return controlMap;
   };

   /**
    * Build map of control ids to parent for easy lookup by id
    */
   self.buildParentMap = function (jsonView) {
      var parentMap = {};

      addParentToMap(jsonView, null, parentMap);

      return parentMap;
   };


   /* Private methods */

   /**
    * Add control and its sub controls to the map
    */
   function addControlToMap(control, controlMap) {
      var children = control.children;
      var childControls = control.controls;

      // Add control itself
      controlMap[control.id] = control;

      // Add all children
      if (children) {
         for (var i = 0; i < children.length; i++) {
            addControlToMap(children[i], controlMap);
         }
      }
      if (childControls) {
         for (var prop in childControls) {
            if (childControls.hasOwnProperty(prop)) {
               addControlToMap(childControls[prop], controlMap);
            }
         }
      }
   }

   /**
    * Add control and its sub controls to the map
    */
   function addParentToMap(control, parent, parentMap) {
      var children = control.children;
      var childControls = control.controls;

      // Add control's link to parent
      parentMap[control.id] = parent;

      // Add all children
      if (children) {
         for (var i = 0; i < children.length; i++) {
            addParentToMap(children[i], control, parentMap);
         }
      }
      if (childControls) {
         for (var prop in childControls) {
            if (childControls.hasOwnProperty(prop)) {
               addParentToMap(childControls[prop], control, parentMap);
            }
         }
      }
   }

   /**
    * Sort comparison function to order controls by 'sequence'
    * Note: Put controls with an undefined sequence last (new controls that were added after the user personalized this view)
     */
   function compareBySequence(control1, control2) {
      if (control1.sequence === undefined && control2.sequence === undefined) {
         return 0;
      }
      if (control1.sequence === undefined) {
         return 1;
      }
      if (control2.sequence === undefined) {
         return -1;
      }
      if (control1.sequence < control2.sequence) {
         return -1;
      }
      if (control1.sequence > control2.sequence) {
         return 1;
      }
      return 0;
   }

});
