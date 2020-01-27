'use strict';

/**
 * Converters for the WM module
 */
app.factory('WmConverters', function WmConverters($translate) {

   return {
      BinLocAssignmentCode: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'o':
                     return $translate.instant('global.open');
                  case 'p':
                     return $translate.instant('global.primary');
                  case 's':
                     return $translate.instant('global.single');
                  case 'a':
                     return $translate.instant('global.alternate');
                  case 'x':
                     return $translate.instant('global.staging');
                  case 'u':
                     return $translate.instant('global.unavailable');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      BinLocStatusCode: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'a':
                     return $translate.instant('global.available');
                  case 's':
                     return $translate.instant('global.in.service');
                  case 'i':
                     return $translate.instant('global.inactive');
                  case 'x':
                     return $translate.instant('global.staging');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ReplenishmentActionTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.accept');
                  case 'C':
                     return $translate.instant('global.cancel');
                  case '':
                     return '';
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
