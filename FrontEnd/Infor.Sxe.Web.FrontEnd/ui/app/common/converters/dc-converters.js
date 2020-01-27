'use strict';

/**
 * Converters for the DC module
 */
app.factory('DcConverters', function DcConverters($translate) {

   return {

	   FieldDelimiter: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toLowerCase()) {
                  case '0x20':
                     return $translate.instant('global.blank');
                  case '0x2c':
                     return $translate.instant('global.comma');
                  case '0x7c':
                     return $translate.instant('global.pipe');
                  case '0x09':
                     return $translate.instant('wysiwyg.control.tab');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
       },

       RecordFormat: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toLowerCase()) {
                  case 'f':
                     return $translate.instant('global.fixed');
                  case 'v':
                     return $translate.instant('global.variable');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
       },
   };
});
