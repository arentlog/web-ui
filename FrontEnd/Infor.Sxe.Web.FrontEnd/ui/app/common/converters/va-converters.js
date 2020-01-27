'use strict';

/**
 * Converters for the VA module
 */
app.factory('VaConverters', function VaConverters($translate) {
   return {
      BackOrderTypes: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'D':
                     return $translate.instant('global.direct');
                  case 'Y':
                     return $translate.instant('global.allow.back.order');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ChargeMethodType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'Q':
                     return $translate.instant('global.quantity');
                  case 'W':
                     return $translate.instant('global.weight');
                  case 'C':
                     return $translate.instant('global.cube');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      CutStatusType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.available');
                  case 'C':
                     return $translate.instant('global.cut');
                  case 'Q':
                     return $translate.instant('global.quoted');
                  case 'R':
                     return $translate.instant('global.reserved');
                  case 'S':
                     return $translate.instant('global.sold');
                  case 'T':
                     return $translate.instant('global.transfer');
                  case 'U':
                     return $translate.instant('global.unavailable');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      DestinationType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'V':
                     return $translate.instant('global.vendor');
                  case 'W':
                     return $translate.instant('global.warehouse');
                  case 'F':
                     return $translate.instant('global.final.step');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      DispositionType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '':
                     return $translate.instant('global.none');
                  case 'S':
                     return $translate.instant('global.ship.complete');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      FinishedProductType: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 2:
                     return $translate.instant('global.product');
                  case 1:
                     return $translate.instant('global.group');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      FinishedProductLineType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '':
                     return $translate.instant('global.stock');
                  case 'N':
                     return $translate.instant('global.non.stock');
                  case 'S':
                     return $translate.instant('global.special');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      HeaderTiesOrderTypes: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'ORDER':
                     return $translate.instant('global.order');
                  case 'TRANSFER':
                     return $translate.instant('global.warehouse.transfer');
                  case 'FAB VA':
                     return $translate.instant('global.fab.va');
                  case 'WORK ORDER':
                     return $translate.instant('global.work.order');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      InventoryReceiptStageType: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 1:
                     return $translate.instant('global.open');
                  case 3:
                     return $translate.instant('global.printed');
                  case 9:
                     return $translate.instant('global.open.to.printed');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      LaborType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'Q':
                     return $translate.instant('global.quantity');
                  case 'W':
                     return $translate.instant('global.weight');
                  case 'C':
                     return $translate.instant('global.cube');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      LineCancelType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'I':
                     return $translate.instant('global.prorate.as.is');
                  case 'C':
                     return $translate.instant('global.recalculate.proration');
                  case 'R':
                     return $translate.instant('global.remove.proration');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      LinesEntryType: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 1:
                     return $translate.instant('global.group');
                  case 2:
                     return $translate.instant('global.product');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      LineType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'N':
                     return $translate.instant('global.non.stock');
                  case '':
                     return $translate.instant('global.stock');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      NonSpecificationPrintType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'Y':
                     return $translate.instant('global.yes');
                  case 'N':
                     return $translate.instant('global.no');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      NonStockType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '':
                     return $translate.instant('global.stock');
                  case 'N':
                     return $translate.instant('global.non.stock');
                  case 'S':
                     return $translate.instant('global.special');
                  case 'C':
                     return $translate.instant('global.configuration');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderStageFullVaeh: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 0:
                     return $translate.instant('global.entered');
                  case 1:
                     return $translate.instant('global.ordered');
                  case 3:
                     return $translate.instant('global.printed');
                  case 5:
                     return $translate.instant('global.received');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderTransactionType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'VA':
                     return $translate.instant('global.value.add');
                  case 'DO':
                     return $translate.instant('global.direct.order');
                  case 'QU':
                     return $translate.instant('global.quote');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      PrintReceiptType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'P':
                     return $translate.instant('global.print');
                  case 'F':
                     return $translate.instant('global.fax');
                  case 'D':
                     return $translate.instant('global.device');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      RollupType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'MARGIN':
                     return $translate.instant('global.margin');
                  case 'MARKUP':
                     return $translate.instant('global.markup');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      SectionStageCodeType: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 1:
                     return $translate.instant('global.open');
                  case 3:
                     return $translate.instant('global.printed');
                  case 5:
                     return $translate.instant('global.shipped');
                  case 7:
                     return $translate.instant('global.complete');
                  case 8:
                     return $translate.instant('global.paid');
                  case 9:
                     return $translate.instant('global.cancelled');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      SectionType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'SP':
                     return $translate.instant('global.specification');
                  case 'IN':
                     return $translate.instant('global.inventory.component');
                  case 'EX':
                     return $translate.instant('global.external');
                  case 'IT':
                     return $translate.instant('global.internal');
                  case 'IS':
                     return $translate.instant('global.inspection');
                  case 'II':
                     return $translate.instant('global.inventory.in');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      SegmentType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'C':
                     return $translate.instant('global.character');
                  case 'D':
                     return $translate.instant('global.number');
                  case 'I':
                     return $translate.instant('global.integer');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ShippingStageType: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 1:
                     return $translate.instant('global.open');
                  case 3:
                     return $translate.instant('global.printed');
                  case 5:
                     return $translate.instant('global.shipped');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      SourceOrderTypes: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'N':
                     return $translate.instant('global.no.tie');
                  case 'P':
                     return $translate.instant('global.purchase.order');
                  case 'T':
                     return $translate.instant('global.warehouse.transfer');
                  case 'F':
                     return $translate.instant('global.value.add');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      SourceBackTieTypes: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'N':
                     return $translate.instant('global.neither');
                  case 'P':
                     return $translate.instant('global.purchase.order');
                  case 'T':
                     return $translate.instant('global.warehouse.transfer');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      SpecificationPrintType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'E':
                     return $translate.instant('global.external');
                  case 'I':
                     return $translate.instant('global.internal');
                  case 'B':
                     return $translate.instant('global.both');
                  case 'N':
                     return $translate.instant('global.neither');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      StageCodeType: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
                  case '0':
                     return $translate.instant('global.entered');
                  case '1':
                     return $translate.instant('global.ordered');
                  case '3':
                     return $translate.instant('global.printed');
                  case '5':
                     return $translate.instant('global.received');
                  case '7':
                     return $translate.instant('global.closed');
                  case '9':
                     return $translate.instant('global.cancelled');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      TimeType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.actual');
                  case 'E':
                     return $translate.instant('global.estimated');
                  case 'V':
                     return $translate.instant('global.variable');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      TransferTransactionType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'VA':
                     return $translate.instant('global.value.add');
                  case 'DO':
                     return $translate.instant('global.direct.order');
                  case 'QU':
                     return $translate.instant('global.quote');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      UpdateTypes: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'O':
                     return $translate.instant('global.order');
                  case 'T':
                     return $translate.instant('global.warehouse.transfer');
                  case 'F':
                     return $translate.instant('global.fab.value.add');
                  case 'W':
                     return $translate.instant('global.work.order');
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
