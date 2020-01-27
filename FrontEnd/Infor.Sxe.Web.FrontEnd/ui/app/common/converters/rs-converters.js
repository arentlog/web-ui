'use strict';

/**
 * Converters for the RS module
 */
app.factory('RsConverters', function RsConverters($translate) {

   return {

      JobComponentType: {
         convert: function (value) {
            if (value) {
               return $translate.instant('global.report');
            } else {
               return $translate.instant('global.job.group');
            }
         }
      }
   };
});
