'use strict';

/**
 * Converters for the PO module
 */
app.factory('PoConverters', function PoConverters($translate) {

   return {

      AcknowledgementType: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toLowerCase()) {
                  case 'ac':
                     return $translate.instant('global.accepted.with.change');
                  case 'ad':
                     return $translate.instant('global.accepted.without.change');                  
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      AcknowledgementItemStatusCode: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toLowerCase()) {
                  case 'ac':
                     return $translate.instant('global.item.accepted.shipped');                  
                  case 'dr':
                     return $translate.instant('global.item.accepted.date.rescheduled');
                  case 'ia':
                     return $translate.instant('global.item.accepted');
                  case 'ic':
                     return $translate.instant('global.item.accepted.changes.made');
                  case 'iq':
                     return $translate.instant('global.item.accepted.quantity.changed');
                  case 'ir':
                     return $translate.instant('global.item.rejected.cancelled.line.item');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      ApprovalType: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toUpperCase()) {
                  case 'Y':
                     return $translate.instant('global.approved');
                  case 'E':
                     return $translate.instant('global.e.hold');
                  default:
                     return $translate.instant('global.hold');
               }
            } else {
               return value;
            }
         }
      },

      DeliveryDateCode: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value) {
                  case '002':
                     return $translate.instant('global.delivery.not.determined');
                  case '011':
                     return $translate.instant('global.shipped');
                  case '067':
                     return $translate.instant('global.delivery.date');
                  case '068':
                     return $translate.instant('global.vendor.ship.date');
                  case '069':
                     return $translate.instant('global.promised.for.delivery');
                  default:
                     return $translate.instant(value);
               }
            } else {
               return value;
            }
         }
      },

      NonstockTypeForLineList: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toUpperCase()) {
                  case '':
                     return '';
                  case 'N':
                     return $translate.instant('global.non.stock');
                  case 'R':
                      return $translate.instant('global.not.for.resale');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      OrderDispositionType: {
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
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      PurchaseOrderType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'PO':
                     return $translate.instant('global.purchase.order');
                  case 'QU':
                     return $translate.instant('global.quote.order');
                  case 'RM':
                     return $translate.instant('global.return.merchandise');
                  case 'AC':
                     return $translate.instant('global.accumulative');
                  case 'BL':
                     return $translate.instant('global.blanket.order');
                  case 'DO':
                     return $translate.instant('global.direct.order');
                  case 'BR':
                     return $translate.instant('global.blanket.release');
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
                     return $translate.instant('global.printed');
                  case '3':
                     return $translate.instant('global.acknowledged');
                  case '4':
                     return $translate.instant('global.pre.received');
                  case '5':
                     return $translate.instant('global.received');
                  case '6':
                     return $translate.instant('global.costed');
                  case '7':
                     return $translate.instant('global.closed');
                  case '9':
                     return $translate.instant('global.cancelled');
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
