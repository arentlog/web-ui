'use strict';

/**
 * Converters for the OT module
 */
app.factory('OtConverters', function OtConverters($translate) {

   return {
      TrackStages: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
                  case '0':
                     return $translate.instant('global.entered');
                  case '1':
                     return $translate.instant('global.production');
                  case '2':
                     return $translate.instant('global.complete');
                  case '3':
                     return $translate.instant('global.shipped');
                  case '4':
                     return $translate.instant('global.arrived');
                  case '5':
                     return $translate.instant('global.demurrage');
                  case '6':
                     return $translate.instant('global.at.whse');
                  case '7':
                     return $translate.instant('global.received');
                  case '8':
                     return $translate.instant('global.empty');
                  case '9':
                     return $translate.instant('global.closed');
                  default:
                     return '';
               }
            } else {
               return '';
            }
         }
      },
      VesselStages: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
               case '0':
                  return $translate.instant('global.entered');
               case '1':
                  return $translate.instant('global.shipped');
               case '2':
                  return $translate.instant('global.arrived');
               case '3':
                  return $translate.instant('global.closed');
               default:
                  return '';
               }
            } else {
               return '';
            }
         }
      },
      OtAddOnType: {
         convert: function (value) {
            if (value) {
               return $translate.instant('global.amount');
            } else {
               return $translate.instant('global.percent');
            }
         }
      },
      OtDistributeBy: {
         convert: function (value) {
            switch (value.toString().toLowerCase()) {
               case 'd':
                  return $translate.instant('global.amount');
               case 'u':
                  return $translate.instant('global.unit');
               case 'c':
                  return $translate.instant('global.cube');
               case 'w':
                  return $translate.instant('global.weight');
               default:
                  return '';
            }
         }
      }
   };
});
