'use strict';

/**
 * Converters for the AR module
 */
app.factory('ArConverters', function ArConverters($translate) {

   return {
      MyTest: {
         convert: function (value) {
            return 'test' + value;
         }
      },
      TransCode: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
                  case '0':
                     return $translate.instant('global.invoice');
                  case '1':
                     return $translate.instant('global.service.charge');
                  case '2':
                     return $translate.instant('global.rebate');
                  case '3':
                     return $translate.instant('global.unapplied.cash');
                  case '4':
                     return $translate.instant('global.cod');
                  case '5':
                     return $translate.instant('global.misc.credit');
                  case '6':
                     return $translate.instant('global.credit.memo');
                  case '7':
                     return $translate.instant('global.check.record');
                  case '9':
                     return $translate.instant('global.debit.memo');
                  case '10':
                     return $translate.instant('global.reversal');
                  case '11':
                     return $translate.instant('global.scheduled.payment.record');
                  default:
                     return '';
               }
            } else {
               return '';
            }
         }
      }
   };

});
