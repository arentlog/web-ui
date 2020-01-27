'use strict';

/**
 * Provides global access to AO Data.
 */
app.service('AodataService', function AodataService() {

   //stand up the main storage variable
   var aoData = {};

   /**
    * Note: In order to avoid case-sensitive issues when trying to find an aodata value,
    * this service normalizes all Record Types to upper case and all Field Names to lower case.
    */

   /**
    * Initialize this service by creating the lookup maps of aodata
    */
   this.initialize = function (aodataList) {
      //create a map of maps
      //map1 = recordtype key, value of map2
      //map2 = fieldname key, value of aodata (full object)
      for (var i = 0; i < aodataList.length; i++) {
         var currentAoData = aodataList[i];
         var recordType = currentAoData.recordtype.toUpperCase();
         var fieldName = currentAoData.fieldname.toLowerCase();

         // Create sub map for record type
         if (!aoData[recordType]) {
            aoData[recordType] = {};
         }

         // Add to sub map by field name
         aoData[recordType][fieldName] = currentAoData;
      }
   };

   /**
    * Look for recordtype-fieldname in aoData and return .fieldvalue or empty string
    */
   this.getValue = function(recordType, fieldName) {
      var record = this.getRecord(recordType, fieldName);

      if (record) {
         return record.fieldvalue;
      } else {
         return '';
      }
   };

   /**
    * Look for recordtype-fieldname in aoData and return record or null
    */
   this.getRecord = function (recordType, fieldName) {
      recordType = recordType.toUpperCase();
      fieldName = fieldName.toLowerCase();
      var subMap = aoData[recordType];

      if (subMap) {
         return subMap[fieldName] || null;
      } else {
         return null;
      }
   };
});