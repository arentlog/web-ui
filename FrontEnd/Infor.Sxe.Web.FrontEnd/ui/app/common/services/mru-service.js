'use strict';

/**
 * Service for the 'most recently used' functionality of lookups.
 *
 * The stored json in browser local storage looks like {
 *    list: [
 *       { label: '', value: '', rowId: '' },
 *       ...
 *    ]
 * }
 */
app.service('MruService', function MruService(AppInfoService, Constants) {

   // Max number of records to store per list
   var MAX_LIST_SIZE = 5;

   // Length of row pointers (to distinguish from row id)
   var ROW_POINTER_LENGTH = 36;

   /* Public methods */

   /**
    * Activate the functionality on a lookup field
    */
   this.activate = function ($input, listKey, autoCompleteWidth, topOffset, adjustPositionFn) {
      var autoCompleteControl = $input.data('autocomplete');

      // If not already built, build auto-complete control (just for MRU purposes)
      if (!autoCompleteControl) {
         autoCompleteControl = $input.autocomplete({
            width: autoCompleteWidth,
            offset: { left: 0, top: topOffset }, // left offset is dynamically calculated right before list displays
            source: function () {
               // source function that does nothing (so SoHo doesn't try to display list upon typing)
            }
         }).data('autocomplete');
      }

      // Open list when user clicks input field
      $input.on('click', function () {
         var list = getList(listKey);

         // Open if any items and field is not readonly
         if (list.length > 0 && !$input.is('[readonly]')) {

            // Add isMRU flag to distinguish between auto-complete and MRU selection
            list.forEach(function (item) {
               item.isMRU = true;
            });

            // Recalculate the auto complete offset (since the input width can change by various factors)
            if (adjustPositionFn) {
               adjustPositionFn();
            }

            // Tell SoHo to open list (delay slightly because wasn't opening when another field's mru list was still open)
            setTimeout(function () {
               autoCompleteControl.openList('', list);
            }, 1);
         }
      });
   };

   /**
    * Add an MRU record to a stored list
    */
   this.addToList = function (listKey, rowPointerOrId, label, value, value2, value3, value4, value5) {
      var storageKey = getStorageKey(listKey);
      var json = localStorage[storageKey];
      var mruObject = json ? JSON.parse(json) : {list: []};

      // Stop if no row pointer/id
      if (!rowPointerOrId) {
         console.log('Error: row pointer (or row id) is required for MRUs.');
         return;
      }

      // Add record to list
      addRecordToList(mruObject.list, rowPointerOrId, label, value, value2, value3, value4, value5);

      // Update browser storage
      localStorage[storageKey] = JSON.stringify(mruObject);
   };

   /**
    * Remove an MRU record from a stored list
    * Note: If the lookup uses rowPointer (elastic lookups), then you must pass the rowPointer. If it uses rowId, then you must pass the rowId.
    */
   this.removeFromList = function (listKey, rowPointerOrId) {
      var storageKey = getStorageKey(listKey);
      var json = localStorage[storageKey];
      var mruObject = json ? JSON.parse(json) : {list: []};
      var list = mruObject.list;

      // Remove record (if exists in list)
      for (var i = 0; i < list.length; i++) {
         var record = list[i];

         // Check both rowPointer and rowId (some lookups use rowPointer and others use rowId)
         if (record.rowPointer === rowPointerOrId || record.rowId === rowPointerOrId) {
            list.splice(i, 1);

            // Update browser storage
            localStorage[storageKey] = JSON.stringify(mruObject);

            break;
         }
      }
   };


   // Private methods

   /**
    * Get the storage key for a particular list. We use cono and user name in order to ensure user won't see data
    * from another cono or user (since multiple users may share the same computer/browser).
    */
   function getStorageKey(listKey) {
      return AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_MRU + '_' + listKey.toUpperCase();
   }

   /**
    * Get a stored list by listKey
    */
   function getList(listKey) {
      var json = localStorage[getStorageKey(listKey)];
      var mruObject = json ? JSON.parse(json) : null;

      // Return list or new empty array
      return mruObject ? mruObject.list : [];
   }

   /**
    * Process the add of a single record to the list
    */
   function addRecordToList(list, rowPointerOrId, label, value, value2, value3, value4, value5) {
      var i, listItem, listItemId;
      var isDuplicate = false;
      var duplicateIndex = null;

      // We can distinguish between row pointer and row id by checking the string length (row pointer is 36-char GUID)
      var isRowPointer = rowPointerOrId.length === ROW_POINTER_LENGTH;

      // Create object with the necessary info
      // Note: we don't store whole record in order to prevent usage of old data; instead we use key values only
      var item = {
         rowPointer: isRowPointer ? rowPointerOrId : undefined,
         rowId: !isRowPointer ? rowPointerOrId : undefined,
         label: label.toString(), // Must be a string
         value: value,
         value2: value2,
         value3: value3,
         value4: value4,
         value5: value5
      };

      // Check if item is already in the list
      for (i = 0; i < list.length; i++) {
         listItem = list[i];
         listItemId = isRowPointer ? listItem.rowPointer : listItem.rowId;

         if (listItemId === rowPointerOrId) {
            isDuplicate = true;
            duplicateIndex = i;
            break;
         }
      }

      // Remove item if it already exists (since we're going to put it in the front of the list)
      if (isDuplicate) {
         list.splice(duplicateIndex, 1);
      }

      // If list is at the max, remove the last item in the list
      if (list.length >= MAX_LIST_SIZE) {
         list.pop();
      }

      // Add item to front of list
      list.splice(0, 0, item);
   }

});
