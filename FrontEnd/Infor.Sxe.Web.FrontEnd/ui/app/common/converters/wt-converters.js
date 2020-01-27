'use strict';

/**
 * Converters for the WT module
 */
app.factory('WtConverters', function WtConverters($translate) {

   return {
      WtAddOnType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '%':
                     return $translate.instant('global.percent');
                  case '$':
                     return $translate.instant('global.amount');
                  case 'L':
                     return $translate.instant('global.for.each.line');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      WtApproveType: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'y':
                     return $translate.instant('global.approved');
                  case 'r':
                     return $translate.instant('global.requested');
                  case 'n':
                     return $translate.instant('global.not.approved');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      WtOrderType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'WT':
                     return $translate.instant('global.warehouse.transfer');
                  case 'DO':
                     return $translate.instant('global.direct.order');
                  default:
                     return value;
               }
            } else {
               return '';
            }
         }
      },
      WtStageToName: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
                  case '0':
                     return $translate.instant('global.requested');
                  case '1':
                     return $translate.instant('global.ordered');
                  case '2':
                     return $translate.instant('global.picked');
                  case '3':
                     return $translate.instant('global.shipped');
                  case '4':
                     return $translate.instant('global.pre.received');
                  case '5':
                     return $translate.instant('global.exception');
                  case '6':
                     return $translate.instant('global.received');
                  case '9':
                     return $translate.instant('global.cancelled');
                  default:
                     return value;
               }
            } else {
               return '';
            }
         }
      },
      WtStageTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'REQ':
                     return $translate.instant('global.requested');
                  case 'ORD':
                     return $translate.instant('global.ordered');
                  case 'PRT': // Same stage as PCK - consistent display in H5
                  case 'PCK':
                     return $translate.instant('global.picked');
                  case 'SHP':
                     return $translate.instant('global.shipped');
                  case 'PRE':
                     return $translate.instant('global.pre.received');
                  case 'EXP':
                     return $translate.instant('global.exception');
                  case 'RCV':
                     return $translate.instant('global.received');
                  case 'CAN':
                     return $translate.instant('global.cancelled');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      WtPackageStatusTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.last');
                  case 'I':
                     return $translate.instant('global.inactive');
                  case 'P':
                     return $translate.instant('global.partial.shipment');
                  case 'X':
                     return $translate.instant('global.void');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      WtLineStageTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'PO':
                     return $translate.instant('global.purchase.order');
                  case 'KP':
                     return $translate.instant('global.work.order');
                  case 'VA':
                     return $translate.instant('global.value.add');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      WtPackageTransTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'S':
                     return $translate.instant('global.shipped');
                  case 'V':
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