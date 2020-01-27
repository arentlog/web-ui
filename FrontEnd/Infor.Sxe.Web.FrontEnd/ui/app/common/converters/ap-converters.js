'use strict';

/**
 * Converters for the AP module
 */
app.factory('ApConverters', function ApConverters($translate) {

   return {
      TransactionType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) { //ignore jslint - correct indentation
                  case 'IN': //ignore jslint - correct indentation
                     return $translate.instant('global.invoice'); //ignore jslint - correct indentation
                  case 'RB': //ignore jslint - correct indentation
                     return $translate.instant('global.rebate'); //ignore jslint - correct indentation
                  case 'PY': //ignore jslint - correct indentation
                     return $translate.instant('global.sched.payment'); //ignore jslint - correct indentation
                  case 'VC': //ignore jslint - correct indentation
                     return $translate.instant('global.void.check'); //ignore jslint - correct indentation
                  case 'MC': //ignore jslint - correct indentation
                     return $translate.instant('global.misc.credit'); //ignore jslint - correct indentation
                  case 'CR': //ignore jslint - correct indentation
                     return $translate.instant('global.credit.memo'); //ignore jslint - correct indentation
                  case 'CK': //ignore jslint - correct indentation
                     return $translate.instant('global.check'); //ignore jslint - correct indentation
                  case 'DB': //ignore jslint - correct indentation
                     return $translate.instant('global.debit.memo'); //ignore jslint - correct indentation
                  case 'RV': //ignore jslint - correct indentation
                     return $translate.instant('global.reversal'); //ignore jslint - correct indentation
                  case 'BC': //ignore jslint - correct indentation
                     return $translate.instant('global.batch.costing'); //ignore jslint - correct indentation
                  default: //ignore jslint - correct indentation
                     return value; //ignore jslint - correct indentation
               }
            } else {
               return value;
            }
         }
      }
   };
});