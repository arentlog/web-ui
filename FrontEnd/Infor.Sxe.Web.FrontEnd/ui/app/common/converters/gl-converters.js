'use strict';

/**
 * Converters for the GL module
 */
app.factory('GlConverters', function GlConverters($translate) {

   return {
      FinancialStatementColumnTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'F':
                     return $translate.instant('global.field');
                  case 'C':
                     return $translate.instant('global.column');
                  case 'S':
                     return $translate.instant('global.storage');
                  case 'V':
                     return $translate.instant('global.value');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      AccountType: {
         convert: function (value) {
            if (value === '1' || value === '3') {
               return $translate.instant('global.debit');
            } else {
               return $translate.instant('global.credit');
            }
         }
      }
   };
});
