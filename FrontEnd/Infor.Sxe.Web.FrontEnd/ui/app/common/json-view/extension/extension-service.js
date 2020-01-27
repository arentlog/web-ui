'use strict';

/**
 * Service for the logic of json view extensions.
 */
app.service('ExtensionService', function ExtensionService(Utils) {
   var self = this;

   // Properties to exclude from the diff when extracting changes between extended control and default control
   // Exclude "children" and "controls" (child control differences are handled by other means)
   // Exclude "parentId", "parentControlName", and "sequence" since already handled in a different way
   var diffExcludeProperties = ['children', 'controls', 'parentId', 'parentControlName', 'sequence'];

   /* Public methods */

   /**
    * Apply extension to the json view
    */
   self.applyExtensionChanges = function (jsonView, extensionData) {
      var change, control, parent, newParent, controlMap, parentMap, i, prop;
      var additions = extensionData.additions || [];
      var changes = extensionData.changes || [];
      var deletions = extensionData.deletions || [];
      var controlListsToSort = {};

      // No need to proceed if no changes
      if (additions.length === 0 && changes.length === 0 && deletions.length === 0) {
         return;
      }

      // Build maps of controls for easy lookup by id
      controlMap = self.buildControlMap(jsonView);
      parentMap = self.buildParentMap(jsonView);

      // Add each addition (new controls)
      for (i = 0; i < additions.length; i++) {
         control = additions[i];
         parent = controlMap[control.parentId];

         // If can't find parent, ignore this new control (can happen if parent is deleted from default template)
         if (!parent) {
            continue;
         }

         // Add control to parent's "controls" or "children"
         if (control.parentControlName) {
            if (!parent.controls) {
               parent.controls = {};
            }
            parent.controls[control.parentControlName] = control;
         } else {
            if (!parent.children) {
               parent.children = [];
            }
            parent.children.push(control);

            // Add parent's children to controlListsToSort (so sequence of new control will be applied)
            controlListsToSort[parent.id] = parent.children;
         }

         // Update maps since new control added to json view
         addControlToMap(control, controlMap);
         addParentToMap(control, parent, parentMap);
      }

      // Apply each change to its control (matching by id)
      for (i = 0; i < changes.length; i++) {
         change = changes[i];
         control = controlMap[change.id];
         parent = parentMap[change.id];

         // If can't find control, ignore this change
         if (!control) {
            continue;
         }

         // Add all properties from change to control
         for (prop in change) {
            if (change.hasOwnProperty(prop)) {
               // For the "options" property object we want to merge the new values instead of replacing the object
               if (prop === 'options') {
                  // Ensure control has an options object
                  control.options = control.options || {};

                  // Add (or replace) each option value
                  Utils.extend(control.options, change.options);
               } else {
                  // Apply simple property value
                  control[prop] = change[prop];
               }
            }
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
               parentMap[control.id] = newParent;
            }
         }

         // If change has a sequence number, add parent's children to controlListsToSort
         if (change.sequence !== undefined && parent.children) {
            controlListsToSort[parent.id] = parent.children;
         }
      }

      // Apply each deletion
      for (i = 0; i < deletions.length; i++) {
         control = controlMap[deletions[i].id];

         // If can't find control, ignore this deletion (can happen if control is removed from default template)
         if (!control) {
            continue;
         }

         parent = parentMap[control.id];

         // If control has no parent (i.e. the root control), then don't proceed
         if (!parent) {
            continue;
         }

         // Remove control from parent's "children" or "controls"
         if (parent.children && parent.children.indexOf(control) >= 0) {
            parent.children.splice(parent.children.indexOf(control), 1);
         } else if (parent.controls) {
            // Find this control among the property names in parent's controls
            for (var name in parent.controls) {
               if (parent.controls.hasOwnProperty(name) && parent.controls[name] === control) {
                  delete parent.controls[name];
               }
            }
         }
      }

      // Sort controls by sequence (only the lists that need sorting)
      for (prop in controlListsToSort) {
         if (controlListsToSort.hasOwnProperty(prop)) {
            controlListsToSort[prop].sort(compareBySequence);
         }
      }
   };

   /**
    * Extract the differences in an extended json view compared to the defaultJsonView
    * and return those differences as the extensionData to save off, which looks like:
    * {
    *    additions: [], // list of new controls (full control objects)
    *    changes: [], // list of change objects (having control properties that have changed)
    *    deletions: [] // list of deletion objects (having control id)
    * }
    */
   self.extractDifferences = function (defaultJsonView, extendedJsonView) {
      var i, id, prop, name, list, control, parent, defaultControl, defaultParent, change;
      var isNestedAddition, isRootAddition;
      var controlListsWithChangedSequence = {};
      var defaultControlsToRemoveFromAdditions = {};
      var extensionData = {
         additions: [],
         changes: [],
         deletions: []
      };

      // Build maps of controls for easy lookup by id
      var controlMap = self.buildControlMap(extendedJsonView);
      var parentMap = self.buildParentMap(extendedJsonView);
      var defaultControlMap = self.buildControlMap(defaultJsonView);
      var defaultParentMap = self.buildParentMap(defaultJsonView);

      // Extract additions (new controls) - Check every control in extended view and if control not in default view then consider it an addition
      for (id in controlMap) {
         if (controlMap.hasOwnProperty(id) && !defaultControlMap[id]) {
            control = controlMap[id];
            parent = parentMap[id];
            isNestedAddition = !defaultControlMap[parent.id]; // if parent is not a default control we know it's a nested new control
            isRootAddition = !isNestedAddition; // is new control whose parent is a default control

            // Reset the properties that define the nested relationships and sequential order (so old ones don't linger)
            control.parentId = undefined;
            control.sequence = undefined;
            control.parentControlName = undefined;

            // Root new controls need relationship info to parent default controls; nested new controls only need sequence
            if (isRootAddition) {

               // Add parentId pointing from new control to default control (nested new controls already remain in their parent)
               control.parentId = parent.id;

               // Add sequence or parentControlName (depending if in "children" or in "controls")
               if (parent.children && parent.children.indexOf(control) >= 0) {
                  control.sequence = parent.children.indexOf(control);

                  // Flag the parent list as changed and in need of storing sequences
                  controlListsWithChangedSequence[parent.id] = parent.children;
               } else if (parent.controls) {
                  // Find this control among the property names in parent's controls
                  for (name in parent.controls) {
                     if (parent.controls.hasOwnProperty(name) && parent.controls[name] === control) {
                        control.parentControlName = name;
                     }
                  }
               }

               // Add addition (nested new controls already in additions via their parent)
               extensionData.additions.push(control);
            } else {
               // Add sequence to nested new control (since may have some default control siblings which get inserted via a change)
               if (parent.children && parent.children.indexOf(control) >= 0) {
                  control.sequence = parent.children.indexOf(control);
               }
            }
         }
      }

      // Extract positional changes (new parent, new sequence, etc.)
      for (id in controlMap) {
         if (controlMap.hasOwnProperty(id)) {
            control = controlMap[id];
            parent = parentMap[id];
            defaultControl = defaultControlMap[id];
            defaultParent = defaultParentMap[id];

            // If control has no parent (i.e. the root control), then don't proceed
            // If it's an addition, then don't proceed since those positional relationships are already handled
            if (!parent || !defaultControl) {
               continue;
            }

            // ParentId: If control has a new parent, then store the new parentId as a change
            if (parent.id !== defaultParent.id) {

               // Case #1 - control in parent's "children"
               if (parent.children && parent.children.indexOf(control) >= 0) {

                  // Add change of new parentId
                  addUpdateChange(extensionData.changes, {
                     id: control.id,
                     parentId: parent.id
                  });

                  // Flag the parent list as changed and in need of storing sequences
                  controlListsWithChangedSequence[parent.id] = parent.children;

                  // If the default control was moved to a parent that is an addition, then remember to remove
                  // the duplicate default control from the addition (otherwise would have duplicates)
                  if (!defaultControlMap[parent.id]) {
                     defaultControlsToRemoveFromAdditions[id] = parent.children;
                  }
               }

               // Case #2 - control in parent's "controls" (not supported since wysiwyg doesn't ever allow moving of fixed controls)
            }

            // Sequence: Determine if sequence of the parent's children has changed
            var index = parent.children ? parent.children.indexOf(control) : -1;
            var inChildren = index >= 0;
            if (inChildren) {
               var defaultIndex = defaultParent.children ? defaultParent.children.indexOf(defaultControl) : -1;

               // If control in different sequence or different parent than default,
               // then flag the parent list as changed and in need of storing sequences
               if (index !== defaultIndex || parent.id !== defaultParent.id) {
                  controlListsWithChangedSequence[parent.id] = parent.children;
               }
            }
         }
      }

      // Store sequence number changes (only the children lists that are different than the default)
      for (prop in controlListsWithChangedSequence) {
         if (controlListsWithChangedSequence.hasOwnProperty(prop)) {
            list = controlListsWithChangedSequence[prop];

            // Add change for each control in the list
            for (i = 0; i < list.length; i++) {
               control = list[i];

               // Skip additions because their sequence is already stored on the addition itself
               if (!defaultControlMap[control.id]) {
                  continue;
               }

               // Add or update change
               addUpdateChange(extensionData.changes, {
                  id: control.id,
                  sequence: i
               });
            }
         }
      }

      // Extract changes - Diff every control (between extended and default) and save off only the changed properties in a "change" object
      for (id in controlMap) {
         if (controlMap.hasOwnProperty(id)) {
            defaultControl = defaultControlMap[id];
            control = controlMap[id];

            // If is an existing control, diff the controls and get the properties that have changed
            if (defaultControl) {
               var differences = getPropertyDifferences(defaultControl, control);

               if (differences) {
                  change = { id: control.id };

                  // Add differences to change object
                  Utils.extend(change, differences);

                  // Add or update change
                  addUpdateChange(extensionData.changes, change);
               }
            }
         }
      }

      // Remove all default controls from addition objects (otherwise would have duplicates)
      for (id in defaultControlsToRemoveFromAdditions) {
         if (defaultControlsToRemoveFromAdditions.hasOwnProperty(id)) {
            list = defaultControlsToRemoveFromAdditions[id];
            control = controlMap[id];
            list.splice(list.indexOf(control), 1);
         }
      }

      // Extract deletions - Check every control in default view and if control not in extended view then consider it a deletion
      for (id in defaultControlMap) {
         if (defaultControlMap.hasOwnProperty(id) && !controlMap[id]) {
            extensionData.deletions.push({ id: defaultControlMap[id].id });
         }
      }

      return extensionData;
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

   // Get an extension change object by control id
   function getChange(controlId, changes) {
      for (var i = 0; i < changes.length; i++) {
         var obj = changes[i];

         if (obj.id === controlId) {
            return obj;
         }
      }
      return null;
   }

   // Add or update an extension change object
   function addUpdateChange(changes, change) {
      var existingChange = getChange(change.id, changes);

      // Add to change or add a new change (when adding to existing the intention is to add more props to existing props)
      if (existingChange) {
         Utils.extend(existingChange, change);
      } else {
         changes.push(change);
      }
   }

   // Compare two objects and return the changes of the 2nd object (as an object of the new values)
   function getPropertyDifferences(object1, object2) {
      var differences = {}, i;

      // Treat non-existant objects as objects with no properties (some controls may not have "options" object)
      object1 = object1 || {};
      object2 = object2 || {};

      // Compare objects and get array of the properties with differing values
      var diff = Utils.deepCompare(object1, object2);
      var props = diff ? diff.split(',') : [];

      // Exclude certain properties from the diff (see comments above definition)
      for (i = 0; i < diffExcludeProperties.length; i++) {
         var excludeProp = diffExcludeProperties[i];
         if (props.indexOf(excludeProp) >= 0) {
            props.splice(props.indexOf(excludeProp), 1);
         }
      }

      // Build differences object with the props and new values
      for (i = 0; i < props.length; i++) {
         var prop = props[i];

         // Case 1: Property is complex object - diff its properties (recursively)
         // Case 2: Property is a simple value - add it as a difference
         if (object2[prop] && typeof object2[prop] === 'object') {
            var objectDifferences = getPropertyDifferences(object1[prop], object2[prop]);

            // Add it as a difference if object has any differing props
            // Note: The "options" object stores only the diff (since can merge options gracefully),
            //       but other objects store the whole object (since a merge may have unexpected behavior)
            if (objectDifferences) {
               differences[prop] = prop === 'options' ? objectDifferences : object2[prop];
            }
         } else {
            // If the prop exists and the value is specifically set to undefined (i.e. "Default" dropdown option),
            // then don't add so don't get false positives (since undefined won't be in json string).
            // But we do want to add if property was deleted (i.e. deleting a hyperlink).
            if (object2.hasOwnProperty(prop) && object2[prop] === undefined) {
               // don't add
            } else {
               differences[prop] = object2[prop];
            }
         }
      }

      // Return differences object (but if no differences then return null so caller knows)
      return Object.keys(differences).length ? differences : null;
   }

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
    * Note: Put controls with an undefined sequence last (new controls that were added after this view was extended)
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