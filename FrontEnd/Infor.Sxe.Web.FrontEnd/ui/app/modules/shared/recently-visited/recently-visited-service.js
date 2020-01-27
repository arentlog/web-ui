'use strict';

/**
 * Service for the Recently Visited control (this api should not be used directly).
 */
app.service('RecentlyVisitedService', function recentlyVisitedService($translate, AppInfoService, Constants, Utils) {

   /**
    * Add a record (or multiple) to the recently visited list by listKey
    */
   this.addToList = function(scope, objectOrArray, rowIdField, listKey, options) {
      var storageKey = getStorageKey(listKey);
      var json = localStorage[storageKey];
      var jsonObject = json ? JSON.parse(json) : { list: [] };
      var list = jsonObject.list;

      // Handle array vs. single to add to list
      if (Array.isArray(objectOrArray)) {
         for (var i = 0; i < objectOrArray.length; i++) {
            addRecordToList(list, scope, objectOrArray[i], rowIdField, options);
         }
      } else {
         addRecordToList(list, scope, objectOrArray, rowIdField, options);
      }

      // Update local storage
      localStorage[storageKey] = JSON.stringify(jsonObject);

      // Return updated list
      return list;
   };

   /**
    * Remove a record from the recently visited list by listKey
    */
   this.removeFromList = function(listKey, rowId) {
      var storageKey = getStorageKey(listKey);
      var json = localStorage[storageKey];
      var jsonObject = json ? JSON.parse(json) : { list: [] };
      var list = jsonObject.list;

      // Remove record by rowId (if exists in list)
      for (var i = 0; i < list.length; i++) {
         if (list[i].rowID === rowId) {
            list.splice(i, 1);

            // Update local storage
            localStorage[storageKey] = JSON.stringify(jsonObject);

            break;
         }
      }

      // Return updated list
      return list;
   };

   /**
    * Get list from local storage by listKey
    */
   this.getList = function (listKey) {
      var jsonList = localStorage[getStorageKey(listKey)];

      // Return list or new empty array
      return jsonList ? JSON.parse(jsonList).list : [];
   };


   /* Private methods */

   /**
    * Process the add of a single record to the list
    */
   function addRecordToList(list, scope, object, rowIdField, options) {
      // Create item with the necessary info
      var item = {
         title: buildText(scope, object, options.title),
         description: buildText(scope, object, options.description),
         rowID: object[rowIdField]
      };

      // Check if item is already in the list
      var dupList = JSLINQ(list).Where(function(item1) { return item1.rowID === item.rowID; } ) || [];

      // Remove item if it already exists (since we're going to put it in the front of the list)
      if (dupList.items.length > 0) {
         var itemIndex = list.indexOf(dupList.items[0]);
         list.splice(itemIndex, 1);
      }

      // If list is at the max, remove the last item in the list
      if (list.length >= 10) {
         list.pop();
      }

      // Add item to front of list
      list.splice(0, 0, item);
   }

   /**
    * Get the storage key for a particular list. We use cono and user name in order to ensure user won't see data
    * from another cono or user (since multiple users may share the same computer/browser).
    */
   function getStorageKey(listKey) {
      return AppInfoService.getLocalStoragePrefix() + Constants.STORAGE_KEY_RECENTLY_VISITED + '_' + listKey.toUpperCase();
   }

   function buildText(scope, object, meta) {
      var text = '';

      // Handle array vs. single
      if (meta && Array.isArray(meta)) {
         for (var i = 0; i < meta.length; i++) {
            var piece = meta[i];

            // Get text for piece
            var textPiece = buildLabelValue(scope, object, piece);

            // Add if not empty (only including commas when needed)
            if (textPiece) {
               text += (text ? ', ' : '') + textPiece;
            }
         }
      } else if (meta) {
         return buildLabelValue(scope, object, meta);
      }

      return text;
   }

   function buildLabelValue(scope, object, piece) {
      var label;
      var value;

      // Get label from a custom function, or from translation
      if (piece.labelFunction) {
         label = getFunctionResult(scope, object, piece.labelFunction);
      } else if (piece.label) {
         label = $translate.instant(piece.label);
      }

      // Get value from a custom function, or from a property on the object
      if (piece.valueFunction) {
         value = getFunctionResult(scope, object, piece.valueFunction);
      } else {
         value = Utils.getNestedValue(object, piece.value);
      }

      // Only make a label/value if value has data
      if (value || value === 0) {
         // Optionally include label and colon
         if (label) {
            return label + ': ' + value;
         } else {
            return value;
         }
      } else {
         return '';
      }
   }

   function getFunctionResult(scope, object, functionRef) {
      var result;

      // Get function within scope
      var fn = Utils.getNestedValue(scope, functionRef);

      // Invoke function, passing the record, to get label
      if (fn) {
         result = fn(object);
      } else {
         // If can't find it, log an error to help developers
         console.log('Error: The function "' + functionRef + '" could not be found within scope. Please check if it exists on the base controller.');
      }

      return result;
   }

});
