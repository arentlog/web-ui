'use strict';

/**
 * Converters for the SW module (and some AO)
 */
app.factory('SwConverters', function SwConverters($translate) {

   return {

      AppearsOn: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'c':
                     return $translate.instant('global.claim');
                  case 'b':
                     return $translate.instant('global.both');
                  case 'i':
                     return $translate.instant('global.invoice');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      ChargeCode: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'w':
                     return $translate.instant('global.warranty');
                  case 'b':
                     return $translate.instant('global.billable');
                  case 'i':
                     return $translate.instant('global.internal');
                  case 'r':
                     return $translate.instant('global.remanufacture');
                  case 'a':
                     return $translate.instant('global.all');
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
