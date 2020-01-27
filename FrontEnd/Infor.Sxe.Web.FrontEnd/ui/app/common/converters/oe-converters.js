'use strict';

/**
 * Converters for the OE module
 */
app.factory('OeConverters', function OeConverters($translate) {

   return {

      CommentType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'I':
                     return $translate.instant('global.internal');
                  case 'E':
                     return $translate.instant('global.external');
                  case 'T':
                     return $translate.instant('global.sub.total');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      FulfillmentRules: {
          convert: function (value) {
              if (value) {
                  switch (value.toUpperCase()) {
                      case 'PW':
                          return $translate.instant('global.preferred.warehouse.list');
                      case 'MI':
                          return $translate.instant('global.most.available.inventory');
                      case 'QD':
                          return $translate.instant('global.quickest.delivery.date');
                      case 'GR':
                          return $translate.instant('global.group.by.region');
                     case 'ML':
                        return $translate.instant('global.max.number.lines.filled.complete');
                      default:
                          return value;
                  }
              } else {
                  return value;
              }
          }
      },

      OrderDisposition: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toLowerCase()) {
                  case '':
                     return '';
                  case 's':
                     return $translate.instant('global.ship.complete');
                  case 't':
                     return $translate.instant('global.tag.and.hold');
                  case 'w':
                     return $translate.instant('global.will.call');
                  case 'j':
                     return $translate.instant('global.just.in.time');
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
                  case 'SO':
                     return $translate.instant('global.stock.order');
                  case 'DO':
                     return $translate.instant('global.direct.order');
                  case 'FO':
                     return $translate.instant('global.future.order');
                  case 'ST':
                     return $translate.instant('global.standing.order');
                  case 'CS':
                     return $translate.instant('global.counter.sale');
                  case 'QU':
                     return $translate.instant('global.quote');
                  case 'RM':
                     return $translate.instant('global.return.merchandise');
                  case 'CR':
                     return $translate.instant('global.correction');
                  case 'BL':
                     return $translate.instant('global.blanket.order');
                  case 'BR':
                     return $translate.instant('global.blanket.release');
                  case 'RA':
                     return $translate.instant('global.recvd.on.account');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      ReturnedCorrected: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'R':
                     return $translate.instant('global.returned');
                  case 'C':
                     return $translate.instant('global.corrected');
                  case 'B':
                     return $translate.instant('global.both');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      Stage: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
                  case '0':
                     return $translate.instant('global.entered');
                  case '1':
                     return $translate.instant('global.ordered');
                  case '2':
                     return $translate.instant('global.picked');
                  case '3':
                     return $translate.instant('global.shipped');
                  case '4':
                     return $translate.instant('global.invoiced');
                  case '5':
                     return $translate.instant('global.paid');
                  case '9':
                     return $translate.instant('global.cancelled');
                  default:
                     return '';
               }
            } else {
               return '';
            }
         }
      },

      OeAddOnType: {
         convert: function (value) {
            if (value) {
               return $translate.instant('global.amount');
            } else {
               return $translate.instant('global.percent');
            }
         }
      },
      OeehpPackageStatusTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.last');
                  case 'I':
                     return $translate.instant('global.inactive');
                  case 'F':
                     return $translate.instant('global.final');
                  case 'P':
                     return $translate.instant('global.partial');
                  case 'X':
                     return $translate.instant('global.void');
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
