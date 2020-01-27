'use strict';

/**
 * Converters for the SA module
 */
app.factory('SaConverters', function SaConverters($translate) {

   return {
      AddonZeroLevelType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
               case 'C':
                  return $translate.instant('global.current');
               case 'A':
                  return $translate.instant('global.any.zero.level');
               default:
                  return value;
               }
            } else {
               return value;
            }
         }
      },
      BillingType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.all.warehouses');
                  case 'W':
                     return $translate.instant('global.specific.warehouse');
                  case 'C':
                     return $translate.instant('global.customer');
                  case 'S':
                     return $translate.instant('global.ship.to');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      CurrencyChangeType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
               case 'AL':
                  return $translate.instant('global.all');
               case 'VC':
                  return $translate.instant('global.voucher');
               case 'PO':
                  return $translate.instant('global.purchase');
               case 'SL':
                  return $translate.instant('global.sales');
               case 'AR':
                  return $translate.instant('global.accounts.receivable');
               case 'RV':
                  return $translate.instant('global.revaluation');
               case 'RS':
                  return $translate.instant('global.rate.source');
               case 'GA':
                  return $translate.instant('global.gl.account');
               case 'RA':
                  return $translate.instant('global.reval.acct');
               case 'CP':
                  return $translate.instant('global.currency.acct.purchase.draft');
               default:
                  return value;
               }
            } else {
               return value;
            }
         }
      },
      FrequencyType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'O':
                     return $translate.instant('global.one.time');
                  case 'R':
                     return $translate.instant('global.recurring');
                  case 'A':
                     return $translate.instant('global.auto.reversing');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      PriceCostType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'C':
                     return $translate.instant('global.cost');
                  case 'P':
                     return $translate.instant('global.price');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      StandardType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
               case 'A':
                  return $translate.instant('global.all');
               case 'U':
                  return $translate.instant('global.us');
               case 'c':
                  return $translate.instant('global.canada');
               case 'S':
                  return $translate.instant('global.specific');
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
