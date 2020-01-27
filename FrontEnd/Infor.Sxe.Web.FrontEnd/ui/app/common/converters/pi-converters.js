'use strict';

/**
 * Converters for the PI module
 */
app.factory('PiConverters', function PiConverters($translate) {

   return {
      StatusUpdateCode: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'I':
                     return $translate.instant('global.ignore');
                  case 'U':
                     return $translate.instant('global.update');
                  case 'E':
                     return $translate.instant('global.error');
                  case 'H':
                     return $translate.instant('global.hold');
                  case 'D':
                     return $translate.instant('global.delete');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      }
   };
});