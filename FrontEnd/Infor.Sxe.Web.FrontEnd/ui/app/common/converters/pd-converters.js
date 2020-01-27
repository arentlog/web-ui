'use strict';

/**
 * Converters for the PD module
 */
app.factory('PdConverters', function PdConverters($translate) {

   return {
      CreateNew: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'P':
                     return $translate.instant('global.product');
                  case 'C':
                     return $translate.instant('global.catalog');
                  case 'N':
                     return $translate.instant('global.none');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      DiscountBasedOn: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
               case 'Q':
                  return $translate.instant('global.quantity');
               case 'D':
                  return $translate.instant('global.amount');
               case 'C':
                  return $translate.instant('global.customer');
               default:
                  return value;
               }
            } else {
               return value;
            }
         }
      },
      MarginCostTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'a':
                     return $translate.instant('global.average.cost');
                  case 't':
                     return $translate.instant('global.last.cost');
                  case 'r':
                     return $translate.instant('global.replacement.cost');
                  case 's':
                     return $translate.instant('global.standard.cost');
                  case 'e':
                     return $translate.instant('global.rebate.cost');
                  case 'o':
                     return $translate.instant('global.last.foreign.cost');
                  case 'c':
                     return $translate.instant('global.actual.cost');
                  case 'b':
                     return $translate.instant('global.base.price');
                  case 'l':
                     return $translate.instant('global.list.price');
                  case 'p':
                     return $translate.instant('global.price');
                  case 'c1':
                     return $translate.instant('global.customer.sheet.column.1');
                  case 'c2':
                     return $translate.instant('global.customer.sheet.column.2');
                  case 'c3':
                     return $translate.instant('global.customer.sheet.column.3');
                  case 'c4':
                     return $translate.instant('global.customer.sheet.column.4');
                  case 'c5':
                     return $translate.instant('global.customer.sheet.column.5');
                  case 'c6':
                     return $translate.instant('global.customer.sheet.column.6');
                  case 'c7':
                     return $translate.instant('global.customer.sheet.column.7');
                  case 'c8':
                     return $translate.instant('global.customer.sheet.column.8');
                  case 'c9':
                     return $translate.instant('global.customer.sheet.column.9');
                  case 'v1':
                     return $translate.instant('global.vendor.sheet.column.1');
                  case 'v2':
                     return $translate.instant('global.vendor.sheet.column.2');
                  case 'v3':
                     return $translate.instant('global.vendor.sheet.column.3');
                  case 'v4':
                     return $translate.instant('global.vendor.sheet.column.4');
                  case 'v5':
                     return $translate.instant('global.vendor.sheet.column.5');
                  case 'v6':
                     return $translate.instant('global.vendor.sheet.column.6');
                  case 'v7':
                     return $translate.instant('global.vendor.sheet.column.7');
                  case 'v8':
                     return $translate.instant('global.vendor.sheet.column.8');
                  case 'v9':
                     return $translate.instant('global.vendor.sheet.column.9');
                  case '':
                     return '';
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      Multiplier: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'B':
                     return $translate.instant('global.base.price');
                  case 'L':
                     return $translate.instant('global.list.price');
                  case 'C':
                     return $translate.instant('global.cost.on.new.items');
                  case '':
                     return '';
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      LoadIntoItems: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'L':
                     return $translate.instant('global.list');
                  case 'C':
                     return $translate.instant('global.cost');
                  case '1':
                     return $translate.instant('global.price.1');
                  case '2':
                     return $translate.instant('global.price.2');
                  case '3':
                     return $translate.instant('global.price.3');
                  case 'N':
                     return $translate.instant('global.none');
                  case '':
                     return '';
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      ManualRebateDropShipTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'w':
                     return $translate.instant('global.warehouse');
                  case 'd':
                     return $translate.instant('global.drop.ship');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      PricingRecordTypeForPDSCToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'c0':
                     return $translate.instant('global.pricing.record.number');
                  case 'c1':
                     return $translate.instant('global.customer.product.with.slash');
                  case 'c2p':
                     return $translate.instant('global.customer.product.price.type');
                  case 'c2l':
                     return $translate.instant('global.customer.product.line');
                  case 'c2c':
                     return $translate.instant('global.customer.product.category');
                  case 'c2r':
                     return $translate.instant('global.customer.product.rebate');
                  case 'c3':
                     return $translate.instant('global.customer.type.product');
                  case 'c4p':
                     return $translate.instant('global.customer.type.prod.type');
                  case 'c4r':
                     return $translate.instant('global.customer.type.reb.type');
                  case 'c5':
                     return $translate.instant('global.customer');
                  case 'c6':
                     return $translate.instant('global.customer.type');
                  case 'c7':
                     return $translate.instant('global.product');
                  case 'c8':
                     return $translate.instant('global.product.price.type');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      PricingRecordTypeForPDSNToName: {
          convert: function (value) {
              if (value) {
                  switch (value.toLowerCase()) {
                      case 'n0':
                          return $translate.instant('global.national.program.record.number');
                      case 'n1':
                          return $translate.instant('global.customer.product.with.slash');
                      case 'n2':
                          return $translate.instant('global.customer.model.with.slash');
                      case 'n3':
                          return $translate.instant('global.customer.brand.with.slash');
                      case 'n4':
                          return $translate.instant('global.customer.product.category.with.slash');
                      case 'n5':
                          return $translate.instant('global.customer.product.line');
                      case 'n6':
                          return $translate.instant('global.customer.product.price.type');
                      case 'n7':
                          return $translate.instant('global.customer.rebate.type.with.slash');
                      case 'n11':
                          return $translate.instant('global.customer.group.product.with.slash');
                      case 'n12':
                          return $translate.instant('global.customer.group.model.with.slash');
                      case 'n13':
                          return $translate.instant('global.customer.group.brand.with.slash');
                      case 'n14':
                          return $translate.instant('global.customer.group.product.cateogry.with.slash');
                      case 'n15':
                          return $translate.instant('global.customer.group.product.line.with.slash');
                      case 'n16':
                          return $translate.instant('global.customer.group.product.price.type.with.slash');
                      case 'n17':
                          return $translate.instant('global.customer.group.rebate.type.with.slash');
                      case 'n21':
                          return $translate.instant('global.customer.type.product');
                      case 'n22':
                          return $translate.instant('global.customer.type.model');
                      case 'n23':
                          return $translate.instant('global.customer.type.brand');
                      case 'n24':
                          return $translate.instant('global.customer.type.product.category');
                      case 'n25':
                          return $translate.instant('global.customer.type.product.line');
                      case 'n26':
                          return $translate.instant('global.customer.type.prod.type');
                      case 'n27':
                          return $translate.instant('global.customer.type.reb.type');
                      case 'n30':
                          return $translate.instant('global.customer');
                      case 'n31':
                          return $translate.instant('global.customer.group');
                      case 'n32':
                          return $translate.instant('global.customer.type');
                      case 'n41':
                          return $translate.instant('global.product');
                      case 'n42':
                          return $translate.instant('global.model');
                      case 'n43':
                          return $translate.instant('global.brand');
                      case 'n44':
                          return $translate.instant('global.product.category');
                      case 'n45':
                          return $translate.instant('global.product.line');
                      case 'n46':
                          return $translate.instant('global.product.type');
                      case 'n47':
                          return $translate.instant('global.rebate.type');
                      case 'n50':
                          return $translate.instant('global.all.products');
                      default:
                          return value;
                  }
              } else {
                  return value;
              }
          }
      },
      PricingRecordTypeForPDSRToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'r0':
                     return $translate.instant('global.rebate.record.number');
                  case 'r1':
                     return $translate.instant('global.product');
                  case 'r2':
                     return $translate.instant('global.rebate.type');
                  case 'r3':
                     return $translate.instant('global.product.price.type');
                  case 'r4':
                     return $translate.instant('global.product.line');
                  case 'r5':
                     return $translate.instant('global.product.category');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      PricingRecordTypeForPDSVToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'v0':
                     return $translate.instant('global.contract.record.number');
                  case 'v1':
                     return $translate.instant('global.vendor');
                  case 'v2':
                     return $translate.instant('global.vendor.contract.product');
                  case 'v2p':
                     return $translate.instant('global.vendor.contract.prod.type');
                  case 'v3':
                     return $translate.instant('global.vendor.contract.rebate.type');
                  case 'v4':
                     return $translate.instant('global.vendor.contract');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      RebateCalcTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '$':
                     return $translate.instant('global.amount');
                  case '%':
                     return $translate.instant('global.percent');
                  case 'N':
                     return $translate.instant('global.net');
                  case 'M':
                     return $translate.instant('global.margin.guaranteed');
                  case '':
                     return '';
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      RebateCostTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'b':
                     return $translate.instant('global.base.price');
                  case 'l':
                     return $translate.instant('global.list.price');
                  case 'p':
                     return $translate.instant('global.price');
                  case 'a':
                     return $translate.instant('global.average.cost');
                  case 't':
                     return $translate.instant('global.last.cost');
                  case 'r':
                     return $translate.instant('global.replacement.cost');
                  case 's':
                     return $translate.instant('global.standard.cost');
                  case 'e':
                     return $translate.instant('global.rebate.cost');
                  case 'o':
                     return $translate.instant('global.last.foreign.cost');
                  case 'c':
                     return $translate.instant('global.actual.cost');
                  case 'c1':
                     return $translate.instant('global.customer.sheet.column.1');
                  case 'c2':
                     return $translate.instant('global.customer.sheet.column.2');
                  case 'c3':
                     return $translate.instant('global.customer.sheet.column.3');
                  case 'c4':
                     return $translate.instant('global.customer.sheet.column.4');
                  case 'c5':
                     return $translate.instant('global.customer.sheet.column.5');
                  case 'c6':
                     return $translate.instant('global.customer.sheet.column.6');
                  case 'c7':
                     return $translate.instant('global.customer.sheet.column.7');
                  case 'c8':
                     return $translate.instant('global.customer.sheet.column.8');
                  case 'c9':
                     return $translate.instant('global.customer.sheet.column.9');
                  case 'v1':
                     return $translate.instant('global.vendor.sheet.column.1');
                  case 'v2':
                     return $translate.instant('global.vendor.sheet.column.2');
                  case 'v3':
                     return $translate.instant('global.vendor.sheet.column.3');
                  case 'v4':
                     return $translate.instant('global.vendor.sheet.column.4');
                  case 'v5':
                     return $translate.instant('global.vendor.sheet.column.5');
                  case 'v6':
                     return $translate.instant('global.vendor.sheet.column.6');
                  case 'v7':
                     return $translate.instant('global.vendor.sheet.column.7');
                  case 'v8':
                     return $translate.instant('global.vendor.sheet.column.8');
                  case 'v9':
                     return $translate.instant('global.vendor.sheet.column.9');
                  case '':
                     return '';
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      RebateTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
               case 'B':
                  return $translate.instant('global.both');
               case 'P':
                  return $translate.instant('global.purchase');
               case 'S':
                  return $translate.instant('global.sales');
               case 'T':
                  return $translate.instant('global.temporary.receipts');
               case '':
                  return '';
               default:
                  return value;
               }
            } else {
               return value;
            }
         }
      },
      RebateDownToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'f':
                     return $translate.instant('global.flat.rate');
                  case 'b':
                     return $translate.instant('global.base.price');
                  case 'l':
                     return $translate.instant('global.list.price');
                  case 'p':
                     return $translate.instant('global.price');
                  case 'a':
                     return $translate.instant('global.average.cost');
                  case 't':
                     return $translate.instant('global.last.cost');
                  case 'r':
                     return $translate.instant('global.replacement.cost');
                  case 's':
                     return $translate.instant('global.standard.cost');
                  case 'e':
                     return $translate.instant('global.rebate.cost');
                  case 'o':
                     return $translate.instant('global.last.foreign.cost');
                  case 'c':
                     return $translate.instant('global.actual.cost');
                  case 'c1':
                     return $translate.instant('global.customer.sheet.column.1');
                  case 'c2':
                     return $translate.instant('global.customer.sheet.column.2');
                  case 'c3':
                     return $translate.instant('global.customer.sheet.column.3');
                  case 'c4':
                     return $translate.instant('global.customer.sheet.column.4');
                  case 'c5':
                     return $translate.instant('global.customer.sheet.column.5');
                  case 'c6':
                     return $translate.instant('global.customer.sheet.column.6');
                  case 'c7':
                     return $translate.instant('global.customer.sheet.column.7');
                  case 'c8':
                     return $translate.instant('global.customer.sheet.column.8');
                  case 'c9':
                     return $translate.instant('global.customer.sheet.column.9');
                  case 'v1':
                     return $translate.instant('global.vendor.sheet.column.1');
                  case 'v2':
                     return $translate.instant('global.vendor.sheet.column.2');
                  case 'v3':
                     return $translate.instant('global.vendor.sheet.column.3');
                  case 'v4':
                     return $translate.instant('global.vendor.sheet.column.4');
                  case 'v5':
                     return $translate.instant('global.vendor.sheet.column.5');
                  case 'v6':
                     return $translate.instant('global.vendor.sheet.column.6');
                  case 'v7':
                     return $translate.instant('global.vendor.sheet.column.7');
                  case 'v8':
                     return $translate.instant('global.vendor.sheet.column.8');
                  case 'v9':
                     return $translate.instant('global.vendor.sheet.column.9');
                  case '':
                     return '';
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      StatusTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'ALL':
                     return $translate.instant('global.all');
                  case 'A':
                     return $translate.instant('global.active');
                  case 'H':
                     return $translate.instant('global.hold');
                  case 'I':
                     return $translate.instant('global.inactive');
                  case '':
                     return '';
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