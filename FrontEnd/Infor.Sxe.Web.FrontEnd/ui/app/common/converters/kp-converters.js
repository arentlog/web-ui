'use strict';

/**
 * Converters for the KP module
 */
app.factory('KpConverters', function KpConverters($translate) {

   return {
      Stage: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 1:
                     return $translate.instant('global.ordered');
                  case 2:
                     return $translate.instant('global.printed');
                  case 3:
                     return $translate.instant('global.built');
                  case 9:
                     return $translate.instant('global.cancelled');
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
