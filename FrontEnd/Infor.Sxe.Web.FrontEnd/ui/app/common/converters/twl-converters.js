'use strict';

/**
 * Converters for the TWL module
 */
app.factory('TwlConverters', function TwlConverters($translate) {

   return {
      CharDateConversion: {
         convert: function (value) {
            var dateString;
            var dateObject;
            var reggie;
            var dateArray;

            if (!value) {
               return '';
            } else if (value.length === 14) {
               dateString = value;
               reggie = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
               dateArray = reggie.exec(dateString);
               dateObject = new Date(
                   (+dateArray[1]),
                   (+dateArray[2]) - 1, // Careful, month starts at 0!
                   (+dateArray[3]),
                   (+dateArray[4]),
                   (+dateArray[5]),
                   (+dateArray[6])
               );
               var localeDateFormat = Locale.calendar().dateFormat;
               var dateTimestamp = localeDateFormat.short + ' ' + localeDateFormat.timestamp;
               return Locale.formatDate(dateObject, { pattern: dateTimestamp });
            } else if (value.length === 12) {
               dateString = value;
               reggie = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/;
               dateArray = reggie.exec(dateString);
               dateObject = new Date(
                   (+dateArray[1]),
                   (+dateArray[2]) - 1, // Careful, month starts at 0!
                   (+dateArray[3]),
                   (+dateArray[4]),
                   (+dateArray[5])
               );
               return Locale.formatDate(dateObject, { date: 'datetime' });
            } else if (value.length === 8) {
               dateString = value;
               reggie = /(\d{4})(\d{2})(\d{2})/;
               dateArray = reggie.exec(dateString);
               dateObject = new Date(
                   (+dateArray[1]),
                   (+dateArray[2]) - 1, // Careful, month starts at 0!
                   (+dateArray[3])
               );
               return Locale.formatDate(dateObject);
            } else {
               return value;
            }
         }
      },
      CounterPickTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'C':
                     return $translate.instant('global.force.counter.pick');
                  case 'W':
                     return $translate.instant('global.force.warehouse.pick');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      DepartmentTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'RE':
                     return $translate.instant('global.regular');
                  case 'WO':
                     return $translate.instant('global.work.center');
                  case 'QA':
                     return $translate.instant('global.quality.assurance');
                  case 'TN':
                     return $translate.instant('global.returns');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ExceptionTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'SHIP COMPLETE HOLD':
                     return $translate.instant('global.ship.complete.hold');
                  case 'ZERO PICKED ORDERS':
                     return $translate.instant('global.zero.picked.orders');
                  case 'ORDERS SKIPPED ON DROP':
                     return $translate.instant('global.orders.skipped.on.drop');
                  case 'STAGED':
                     return $translate.instant('global.staged');
                  case 'DROP':
                     return $translate.instant('global.hold.on.drop');
                  case 'S-ORDER':
                     return $translate.instant('global.hold.stage.on.order');
                  case 'Z-ORDER':
                     return $translate.instant('global.zero.ship.stage.on.order');
                  case 'SKIPPED':
                     return $translate.instant('global.skipped.on.drop');
                  case 'S-HDR/LN':
                     return $translate.instant('global.hold.stage.on.order.and.lines');
                  case 'S-LINE':
                     return $translate.instant('global.hold.stage.on.lines');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ItemTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'S':
                     return $translate.instant('global.stock');
                  case 'N':
                     return $translate.instant('global.non.stock');
                  case 'C':
                     return $translate.instant('global.consumable');
                  case 'L':
                     return $translate.instant('global.labor');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      LocationTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'M':
                     return $translate.instant('global.alternate');
                  case 'T':
                     return $translate.instant('global.stage');
                  case 'S':
                     return $translate.instant('global.shelf');
                  case 'P':
                     return $translate.instant('global.pallet');
                  case 'F':
                     return $translate.instant('global.flow.rack');
                  case 'C':
                     return $translate.instant('global.carousel');
                  case 'B':
                     return $translate.instant('global.bulk');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderClassToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'CS':
                     return $translate.instant('global.counter.sales');
                  case 'KP':
                     return $translate.instant('global.build.to.stock.kit');
                  case 'RV':
                     return $translate.instant('global.return.to.vendor');
                  case 'SO':
                     return $translate.instant('global.sales.order');
                  case 'VA':
                     return $translate.instant('global.value.add');
                  case 'WO':
                     return $translate.instant('global.work.order');
                  case 'WT':
                     return $translate.instant('global.warehouse.transfer');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderStatusToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.work.order.accept');
                  case 'C':
                     return $translate.instant('global.picked');
                  case 'D':
                     return $translate.instant('global.discrepancy');
                  case 'H':
                     return $translate.instant('global.hold');
                  case 'I':
                     return $translate.instant('global.in.pick');
                  case 'L':
                     return $translate.instant('global.loaded');
                  case 'O':
                     return $translate.instant('global.open');
                  case 'P':
                     return $translate.instant('global.packed');
                  case 'S':
                     return $translate.instant('global.shipped');
                  case 'V':
                     return $translate.instant('global.verified');
                  case 'W':
                     return $translate.instant('global.wip');
                  case 'X':
                     return $translate.instant('global.in.use');
                  case 'Z':
                     return $translate.instant('global.zero.pick');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderStatusNameToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'PICKED':
                     return $translate.instant('global.picked');
                  case 'DISCREPANCY':
                     return $translate.instant('global.discrepancy');
                  case 'HOLD':
                     return $translate.instant('global.hold');
                  case 'IN_PICK':
                     return $translate.instant('global.in.pick');
                  case 'LOADED':
                     return $translate.instant('global.loaded');
                  case 'OPEN':
                     return $translate.instant('global.open');
                  case 'PACKED':
                     return $translate.instant('global.packed');
                  case 'SHIPPED':
                     return $translate.instant('global.shipped');
                  case 'VERIFIED':
                     return $translate.instant('global.verified');
                  case 'WIP':
                     return $translate.instant('global.wip');
                  case 'IN USE':
                     return $translate.instant('global.in.use');
                  case 'ZERO PICK':
                     return $translate.instant('global.zero.pick');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      OrderTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.assembly');
                  case 'C':
                     return $translate.instant('global.counter.sale');
                  case 'D':
                     return $translate.instant('global.transfer.direct');
                  case 'E':
                     return $translate.instant('global.emergency');
                  case 'F':
                     return $translate.instant('global.value.add');
                  case 'H':
                     return $translate.instant('global.tag.and.hold');
                  case 'J':
                     return $translate.instant('global.just.in.time');
                  case 'K':
                     return $translate.instant('global.production');
                  case 'R':
                     return $translate.instant('global.regular');
                  case 'S':
                     return $translate.instant('global.ship.complete');
                  case 'T':
                     return $translate.instant('global.transfer');
                  case 'V':
                     return $translate.instant('global.return.to.vendor');
                  case 'W':
                     return $translate.instant('global.will.call');
                  case 'X':
                     return $translate.instant('global.backorder');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      PrimaryPickTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'F':
                     return $translate.instant('global.full');
                  case 'S':
                     return $translate.instant('global.split');
                  case 'C':
                     return $translate.instant('global.counter');
                  case 'P':
                     return $translate.instant('global.pallet');
                  default:
                     return $translate.instant('global.normal');
               }
            } else {
               return $translate.instant('global.none');
            }
         }
      },
      PrinterTypeToName: {
         convert: function (value) {
            if (value === true) {
               return $translate.instant('global.printer.report');
            }
            else {
               return $translate.instant('global.printer.label');
            }
         }
      },
      Priority: {
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();

               if (str.length === 1) {
                  return '00' + str;
               } else if (str.length === 2) {
                  return '0' + str;
               } else {
                  return str;
               }
            } else {
               return '000';
            }

         }
      },
      PriorityInput: {
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();
               // Strip non integers
               str = str.replace(/\D/g, '');

               if (str.length === 1) {
                  return '00' + str;
               } else if (str.length === 2) {
                  return '0' + str;
               } else {
                  return str;
               }
            } else {
               return '';
            }
         },
         // Remove '/' delimiters before applying value to model
         convertBack: function (value) {
            return value;  // So things like t1 get changed to 001 in the actual value
         }
      },
      ReceiptStatusToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'O':
                     return $translate.instant('global.open');
                  case 'A':
                     return $translate.instant('global.active');
                  case 'C':
                     return $translate.instant('global.complete');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ReceiptTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'I':
                     return $translate.instant('global.international');
                  case 'C':
                     return $translate.instant('global.domestic.po');
                  case 'D':
                     return $translate.instant('global.departmental.po');
                  case 'R':
                     return $translate.instant('global.customer.return');
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
      StockStatusToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '':
                     return $translate.instant('global.ok');
                  case 'O':
                     return $translate.instant('global.overage');
                  case 'I':
                     return $translate.instant('global.inventory.hold.damage');
                  case 'T':
                     return $translate.instant('global.transportation.hold.damage');
                  case 'S':
                     return $translate.instant('global.scrap');
                  case 'L':
                     return $translate.instant('global.liquidation');
                  case 'R':
                     return $translate.instant('global.return.to.vendor');
                  case 'Q':
                     return $translate.instant('global.quality.assurance.hold');
                  case 'W':
                     return $translate.instant('global.work.in.process');
                  case 'H':
                     return $translate.instant('global.returns.hold');
                  case 'C':
                     return $translate.instant('global.customs.hold');
                  default:
                     return value;
               }
            } else {
               return ((value === undefined || value == null) ? '' : $translate.instant('global.ok'));
            }
         }
      },
      SystemParameterLevelBooleanToName: {
         convert: function (value) {
            if (value) {
               return $translate.instant('global.global');
            } else {
               return $translate.instant('global.warehouse');
            }
         }
      },
      SystemParameterTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value) {
                  case 1:
                     return $translate.instant('global.picking');
                  case 2:
                     return $translate.instant('global.packing');
                  case 3:
                     return $translate.instant('global.replenishment');
                  case 4:
                     return $translate.instant('global.order.manager');
                  case 5:
                     return $translate.instant('global.system');
                  case 6:
                     return $translate.instant('global.receiving');
                  case 7:
                     return $translate.instant('global.shipping');
                  case 8:
                     return $translate.instant('global.inventory.control');
                  case 9:
                     return $translate.instant('global.unknown'); //Yes, for some reason there isn't a 9 code.
                  case 10:
                     return $translate.instant('global.put.away');
                  default:
                     return $translate.instant('global.code') + ' ' + value;
               }
            }
         }
      },
      TransTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'AR':
                     return value.toUpperCase() + ': ' + $translate.instant('global.asn.load.request');
                  case 'AS':
                     return value.toUpperCase() + ': ' + $translate.instant('global.stock.adjustment');
                  case 'AT':
                     return value.toUpperCase() + ': ' + $translate.instant('global.auto.transfer');
                  case 'BC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.bar.code.create');
                  case 'CA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.cycle.count.activate');
                  case 'CB':
                     return value.toUpperCase() + ': ' + $translate.instant('global.random.bin.cycle.count');
                  case 'CD':
                     return value.toUpperCase() + ': ' + $translate.instant('global.cycle.count.deactivate');
                  case 'CI':
                     return value.toUpperCase() + ': ' + $translate.instant('global.random.item.cycle.count');
                  case 'CP':
                     return value.toUpperCase() + ': ' + $translate.instant('global.carton.sortation');
                  case 'CS':
                     return value.toUpperCase() + ': ' + $translate.instant('global.system.cycle.count');
                  case 'DC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.disposition.change');
                  case 'GA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.system.param.change');
                  case 'HL':
                     return value.toUpperCase() + ': ' + $translate.instant('global.hold.line');
                  case 'HO':
                     return value.toUpperCase() + ': ' + $translate.instant('global.hold.order');
                  case 'IA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.picking.associate');
                  case 'IC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.primary.pick.change');
                  case 'ID':
                     return value.toUpperCase() + ': ' + $translate.instant('global.item.data.change');
                  case 'IG':
                     return value.toUpperCase() + ': ' + $translate.instant('global.picking');
                  case 'II':
                     return value.toUpperCase() + ': ' + $translate.instant('global.incomplete.item.information');
                  case 'IM':
                     return value.toUpperCase() + ': ' + $translate.instant('global.pick.movement');
                  case 'IN':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.in.pick');
                  case 'IO':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.picked');
                  case 'IP':
                     return value.toUpperCase() + ': ' + $translate.instant('global.print.pick.ticket');
                  case 'IS':
                     return value.toUpperCase() + ': ' + $translate.instant('global.item.size.change');
                  case 'IU':
                     return value.toUpperCase() + ': ' + $translate.instant('global.un-picking');
                  case 'IW':
                     return value.toUpperCase() + ': ' + $translate.instant('global.item.weight.change');
                  case 'KE':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.pack.verify');
                  case 'KG':
                     return value.toUpperCase() + ': ' + $translate.instant('global.packing');
                  case 'KO':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.packed');
                  case 'KP':
                     return value.toUpperCase() + ': ' + $translate.instant('global.packing.list.printed');
                  case 'KS':
                     return value.toUpperCase() + ': ' + $translate.instant('global.carton.size.change');
                  case 'KT':
                     return value.toUpperCase() + ': ' + $translate.instant('global.tote.to.tote.transfer');
                  case 'KV':
                     return value.toUpperCase() + ': ' + $translate.instant('global.ord.pack.verify.qty');
                  case 'LP':
                     return value.toUpperCase() + ': ' + $translate.instant('global.label.print.of.non-legacy.labels');
                  case 'MC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.stock.consolidation');
                  case 'MP':
                     return value.toUpperCase() + ': ' + $translate.instant('global.replenishment.pull');
                  case 'MR':
                     return value.toUpperCase() + ': ' + $translate.instant('global.replenishment');
                  case 'MS':
                     return value.toUpperCase() + ': ' + $translate.instant('global.stock.movement');
                  case 'MT':
                     return value.toUpperCase() + ': ' + $translate.instant('global.top.off.generated');
                  case 'MU':
                     return value.toUpperCase() + ': ' + $translate.instant('global.unplanned.replenishment');
                  case 'NC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.note.creation');
                  case 'ND':
                     return value.toUpperCase() + ': ' + $translate.instant('global.interfaces.download');
                  case 'NU':
                     return value.toUpperCase() + ': ' + $translate.instant('global.interfaces.upload');
                  case 'OC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.carton.to.carton.transfer');
                  case 'OD':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.drop.undrop');
                  case 'OT':
                     return value.toUpperCase() + ': ' + $translate.instant('global.tote.to.tote.transfr');
                  case 'P0':
                     return value.toUpperCase() + ': ' + $translate.instant('global.employee.scm.marker');
                  case 'P1':
                     return value.toUpperCase() + ': ' + $translate.instant('global.employee.scm.print');
                  case 'PA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.put.away');
                  case 'PC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.put.away.closure');
                  case 'PR':
                     return value.toUpperCase() + ': ' + $translate.instant('global.print.packing.list.upload');
                  case 'RA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.purchase.order.edited.in.twl.ui');
                  case 'RC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.receipt.closure');
                  case 'RE':
                     return value.toUpperCase() + ': ' + $translate.instant('global.receipt');
                  case 'RM':
                     return value.toUpperCase() + ': ' + $translate.instant('global.receipt.modified');
                  case 'RO':
                     return value.toUpperCase() + ': ' + $translate.instant('global.receipt.re-open');
                  case 'RR':
                     return value.toUpperCase() + ': ' + $translate.instant('global.purchase.order.request');
                  case 'RS':
                     return value.toUpperCase() + ': ' + $translate.instant('global.consolidated.receipt.send');
                  case 'RX':
                     return value.toUpperCase() + ': ' + $translate.instant('global.recv.pallet.transfer');
                  case 'RZ':
                     return value.toUpperCase() + ': ' + $translate.instant('global.receipt.transaction.hold');
                  case 'SA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.ship.carrier.arrive');
                  case 'SC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.shipping.closure');
                  case 'SD':
                     return value.toUpperCase() + ': ' + $translate.instant('global.ship.carrier.depart');
                  case 'SH':
                     return value.toUpperCase() + ': ' + $translate.instant('global.shipping');
                  case 'SK':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.skipped');
                  case 'SO':
                     return value.toUpperCase() + ': ' + $translate.instant('global.order.shipped');
                  case 'ST':
                     return value.toUpperCase() + ': ' + $translate.instant('global.staged.shipping');
                  case 'TN':
                     return value.toUpperCase() + ': ' + $translate.instant('global.return');
                  case 'UL':
                     return value.toUpperCase() + ': ' + $translate.instant('global.unhold.line');
                  case 'UO':
                     return value.toUpperCase() + ': ' + $translate.instant('global.unhold.order');
                  case 'WA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.work.center.pr.stage');
                  case 'XI':
                     return value.toUpperCase() + ': ' + $translate.instant('global.staging.location..storage');
                  case 'XO':
                     return value.toUpperCase() + ': ' + $translate.instant('global.staging.location..retrieve');
                  case 'YA':
                     return value.toUpperCase() + ': ' + $translate.instant('global.physical.inventory.activate');
                  case 'YC':
                     return value.toUpperCase() + ': ' + $translate.instant('global.physical.inventory.count');
                  case 'YD':
                     return value.toUpperCase() + ': ' + $translate.instant('global.physical.inventory.deactivate');
                  case 'YE':
                     return value.toUpperCase() + ': ' + $translate.instant('global.physical.end');
                  case 'YF':
                     return value.toUpperCase() + ': ' + $translate.instant('global.physical.inventory.finish');
                  case 'ZI':
                     return value.toUpperCase() + ': ' + $translate.instant('global.incomplete.item.information');
                  case 'ZM':
                     return value.toUpperCase() + ': ' + $translate.instant('global.item.missing');
                  case 'ZN':
                     return value.toUpperCase() + ': ' + $translate.instant('global.zero.negative.discrepancy');
                  case 'ZP':
                     return value.toUpperCase() + ': ' + $translate.instant('global.packing.list.printed');
                  default:
                     return value.toUpperCase;
               }
            } else {
               return ((value === undefined || value == null) ? '' : $translate.instant('global.ok'));
            }
         }
      },
      TransactionsRowStatus: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'C':
                     return $translate.instant('global.complete');
                  case 'E':
                     return $translate.instant('global.error');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      WarehouseZoneTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'R':
                     return $translate.instant('global.regular');
                  case 'C':
                     return $translate.instant('global.counter.sale');
                  case 'A':
                     return $translate.instant('global.carousel');
                  case 'D':
                     return $translate.instant('global.discrepancy');
                  case 'G':
                     return $translate.instant('global.damaged.inventory');
                  case 'X':
                     return $translate.instant('global.cross.dock');
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