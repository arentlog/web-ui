'use strict';

/**
 * Converters for the WL module
 */
app.factory('WlConverters', function WlConverters($translate) {

   return {
      OrderTransType: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'c':
                     return $translate.instant('global.counter.sale');
                  case 'e':
                     return $translate.instant('global.emergency');
                  case 'h':
                     return $translate.instant('global.tag.and.hold');
                  case 'r':
                     return $translate.instant('global.regular.order');
                  case 't':
                     return $translate.instant('global.warehouse.transfer');
                  case 'v':
                     return $translate.instant('global.return.to.vendor');
                  case 'w':
                     return $translate.instant('global.will.call');
                  case 'x':
                     return $translate.instant('global.cross.dock');
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
               switch (value.toLowerCase()) {
                  case 'o':
                     return $translate.instant('global.oe');
                  case 'p':
                     return $translate.instant('global.po');
                  case 't':
                     return $translate.instant('global.wt');
                  case 'w':
                     return $translate.instant('global.kp');
                  case 'f':
                     return $translate.instant('global.va');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ProcessType: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase().trim()) {
                  case 'pck':
                     return $translate.instant('global.order.manager');
                  case 'pre':
                     return $translate.instant('global.pre.receive');
                  case 'cyc':
                     return $translate.instant('wt.exception');
                  case 'pak':
                     return $translate.instant('global.packed');
                  case 'rcv':
                     return $translate.instant('global.receive');
                  case 'shp':
                     return $translate.instant('global.ship');
                  case 'bin':
                     return $translate.instant('global.primary.bin');
                  case 'stk':
                     return $translate.instant('global.stock.adjustment');
                  case 'bcd':
                     return $translate.instant('global.barcode');
                  case 'prt':
                     return $translate.instant('global.print.pack');
                  case 'mst':
                     return $translate.instant('global.master');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      StatusType: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'a':
                     return $translate.instant('global.active');
                  case 'i':
                     return $translate.instant('global.inactive');
                  case 'e':
                     return $translate.instant('global.error');
                  case 'm':
                     return $translate.instant('global.message');
                  case 'o':
                     return $translate.instant('global.open');
                  case 'p':
                     return $translate.instant('global.pending');
                  case 'w':
                     return $translate.instant('global.wip');
                  case 'v':
                     return $translate.instant('global.vendor.ret');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      UpdateType: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'a':
                     return $translate.instant('global.add.new');
                  case 'c':
                     return $translate.instant('global.change');
                  case 'd':
                     return $translate.instant('global.delete');
                  case 's':
                     return $translate.instant('global.auto.ship');
                  case 't':
                     return $translate.instant('global.rt.closure');
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
