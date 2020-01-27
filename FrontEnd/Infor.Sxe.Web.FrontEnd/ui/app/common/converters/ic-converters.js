'use strict';

/**
 * Converters for the IC module
 */
app.factory('IcConverters', function IcConverters($translate) {

   return {
      DayMonthValue: {
         convert: function (value) {
            if (value) {
               return $translate.instant('global.day');
            } else {
               return $translate.instant('global.month');
            }
         }
      },
      LotStatusType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.active');
                  case 'I':
                     return $translate.instant('global.inactive');
                  case 'H':
                     return $translate.instant('global.hold');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderCalculationType: {
          convert: function (value) {
              if (value) {
                  switch (value.toUpperCase()) {
                      case 'E':
                          return $translate.instant('global.eoq');
                      case 'C':
                          return $translate.instant('global.class');
                      case 'M':
                          return $translate.instant('global.min.max');
                      case 'Q':
                          return $translate.instant('global.qty.break');
                      case 'B':
                          return $translate.instant('global.blanket.order');
                      case 'H':
                          return $translate.instant('global.human');
                      default:
                          return value;
                  }
              } else {
                  return value;
              }
          }
      },
      OrderType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'O':
                     return $translate.instant('global.order.entry');
                  case 'P':
                     return $translate.instant('global.purchase.order');
                  case 'W':
                     return $translate.instant('global.warehouse.transfer');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ProductStatusType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.active');
                  case 'I':
                     return $translate.instant('global.inactive');
                  case 'L':
                     return $translate.instant('global.labor');
                  case 'S':
                     return $translate.instant('global.supersede');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ProdWhseControlType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'S':
                     return $translate.instant('global.serial');
                  case 'L':
                     return $translate.instant('global.lot');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ProdWhseStatusType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'S':
                     return $translate.instant('global.stock');
                  case 'X':
                     return $translate.instant('global.do.not.reorder');
                  case 'D':
                     return $translate.instant('global.direct.ship');
                  case 'O':
                     return $translate.instant('global.order.as.needed');
                  case 'ON':
                     return $translate.instant('global.order.as.needed.non.stock');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      RecordTypeICSPC: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'C':
                  case 'FC':
                     return $translate.instant('global.customer');
                  case 'S':
                  case 'FS':
                     return $translate.instant('global.ship.to');
                  case 'FG':
                     return $translate.instant('global.ship.to.group');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      RecordTypeICSR: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'C':
                     return $translate.instant('global.company');
                  case 'W':
                     return $translate.instant('global.warehouse');
                  case 'V':
                     return $translate.instant('global.vendor');
                  case 'P':
                     return $translate.instant('global.product.line');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      SerialCurrStatus: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.available');
                  case 'U':
                     return $translate.instant('global.unavailable');
                  case 'S':
                     return $translate.instant('global.sold');
                  case 'R':
                     return $translate.instant('global.retired');
                  case 'D':
                     return $translate.instant('global.do');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderPointAdjustmentReason: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'F':
                     return $translate.instant('global.frozen');
                  case 'M':
                     return $translate.instant('global.manual');
                  case 'A':
                     return $translate.instant('global.asq');
                  case 'H':
                     return $translate.instant('global.five.high');
                  case 'T':
                     return $translate.instant('global.threshold');
                  case 'L':
                     return $translate.instant('global.low');
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
