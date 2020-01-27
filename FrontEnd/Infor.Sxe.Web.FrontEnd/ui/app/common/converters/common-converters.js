'use strict';

/**
 * Common converters used by various modules
 */
app.factory('CommonConverters', function CommonConverters($translate, OptionApiService) {

   return {

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

      BinLoc: {
         // Add '/' delimiters to the value (i.e. **/**/***/***)
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();
               var length = str.length;

               if (length > 7) {
                  return str.substr(0, 2) + '/' + str.substr(2, 2) + '/' + str.substr(4, 3) + '/' + str.slice(7);
               } else if (length > 4) {
                  return str.substr(0, 2) + '/' + str.substr(2, 2) + '/' + str.slice(4);
               } else if (length > 2) {
                  return str.substr(0, 2) + '/' + str.slice(2);
               } else {
                  return str;
               }
            } else {
               return '';
            }
         },
         // Remove '/' delimiters before applying value to model
         convertBack: function (value) {
            if (value) {
               return value.replace(/\//g, '');
            } else {
               return null;
            }
         }
      },
      BinLocFirstHalf: {
         // Add '/' delimiters to the value (i.e. **/**)
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();
               var length = str.length;

               if (length > 4) {
                  return str.substr(0, 2) + '/' + str.substr(2, 2) + '/' + str.slice(4);
               } else if (length > 2) {
                  return str.substr(0, 2) + '/' + str.slice(2);
               } else {
                  return str;
               }
            } else {
               return '';
            }
         },
         // Remove '/' delimiters before applying value to model
         convertBack: function (value) {
            if (value) {
               return value.replace(/\//g, '');
            } else {
               return null;
            }
         }
      },

      BooleanToAmtPct: {
         convert: function (value) {
            if (value) {
               return $translate.instant('global.amount');
            } else {
               return $translate.instant('global.percent');
            }
         }
      },

      AmtPctSymbolsToAmtPct: {
         convert: function (value) {
            if (value === '$') {
               return $translate.instant('global.amount');
            } else if (value === '%') {
               return $translate.instant('global.percent');
            }
         }
      },

      // Convert a boolean to any string in the translation file
      BooleanToString: {
         convert: function (value, subFormatObj, formatOptions) {
            var opts = formatOptions || {};

            // Note: We are displaying empty if a key is not specified (since some may want true or false to show empty)

            if (value) {
               return opts.trueString ? $translate.instant(opts.trueString) : '';
            } else {
               return opts.falseString ? $translate.instant(opts.falseString) : '';
            }
         }
      },

      BooleanToYesNo: {
         convert: function (value) {
            if (value) {
               return $translate.instant('global.yes');
            } else {
               return $translate.instant('global.no');
            }
         }
      },

      ComponentType: {
         convert: function (value) {
            switch (value.toLowerCase()) {
               case '':
                  return $translate.instant('global.stock');
               case 'n':
                  return $translate.instant('global.non.stock');
               case 's':
                  return $translate.instant('global.special');
               default:
                  return value;
            }
         }
      },

      ContactSubjectTypeToName: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
               case 'arsc':
                  return $translate.instant('global.customer');
               case 'arss':
                  return $translate.instant('global.ship.to');
               case 'apsv':
                  return $translate.instant('global.vendor');
               case 'apss':
                  return $translate.instant('global.ship.from');
               case 'prod':
                  return $translate.instant('global.product');
               case 'cmsp':
                  return $translate.instant('global.prospect');
               default:
                  return value;
               }
            } else {
               return '';
            }
         }
      },

      CountryCodeToName: {
         convert: function (value) {
            if (value) {
               var name = value;

               // Get list of countries (which was cached at login, so callback will always run before return line)
               OptionApiService.get('Country', function (options) {
                  var length = options.length;
                  var country;
                  var i;

                  for (i = 0; i < length; i++) {
                     country = options[i];

                     if (country.value.toLowerCase() === value.toLowerCase()) {
                        name = country.label;
                        break;
                     }
                  }
               });

               return name;
            } else {
               return value;
            }
         }
      },

      CreditCardNumber: {
         convert: function (value) {
            if (value) {
               var maskIndex = value.lastIndexOf("*");
               return value.substring(0, (maskIndex + 5));
            } else {
               return value;
            }
         }
      },

      CreditCardStage: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
                  case '0':
                     return $translate.instant('symbol.four.dashes');
                  case '1':
                     return $translate.instant('global.hold');
                  case '2':
                     return $translate.instant('global.now');
                  case '3':
                     return $translate.instant('global.batch');
                  case '4':
                     return $translate.instant('global.submit');
                  default:
                     return '';
               }
            } else {
               return '';
            }
         }
      },

      CreditCardCommType: {
         convert: function (value) {
            if (value || value === 0) {
               switch (value.toString()) {
                  case '0':
                     return $translate.instant('symbol.four.dashes');
                  case '1':
                     return $translate.instant('global.approved');
                  case '2':
                     return $translate.instant('global.denied');
                  case '3':
                     return $translate.instant('global.timeout');
                  case '4':
                     return $translate.instant('global.connection.failure');
                  default:
                     return '';
               }
            } else {
               return '';
            }
         }
      },

      LineType: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toUpperCase()) {
                  case '':
                     return $translate.instant('global.stock');
                  case 'N':
                     return $translate.instant('global.non.stock');
                  case 'S':
                     return $translate.instant('global.special');
                  case 'T':
                     return $translate.instant('global.sub.total');
                  case 'L':
                     return $translate.instant('global.lost.business');
                  case 'I':
                     return $translate.instant('global.internal.comment');
                  case 'E':
                     return $translate.instant('global.external.comment');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      LSPInvRegStatus: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toLowerCase()) {
                  case '':
                     return $translate.instant('global.required');
                  case 'i':
                     return $translate.instant('global.invalid');
                  case 's':
                     return $translate.instant('global.submitted');
                  case 'r':
                     return $translate.instant('global.registered');
                  case 'e':
                     return $translate.instant('global.rejected');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      MassMaintenanceStatusOperation: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '':
                     return '';
                  case 'U':
                     return $translate.instant('global.update');                 
                  case 'C':
                     return $translate.instant('global.create');
                  case 'D':
                     return $translate.instant('global.delete');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      MassMaintenanceStatusType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case '':
                     return '';
                  case 'P':
                     return $translate.instant('global.pending');
                  case 'C':
                     return $translate.instant('global.completed');
                  case 'E':
                     return $translate.instant('global.errors');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      NonstockType: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toUpperCase()) {
                  case '':
                     return '';
                  case 'N':
                     return $translate.instant('global.non.stock');
                  case 'S':
                     return $translate.instant('global.special');
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

      NonstockTypeWT: {
         convert: function (value) {
            if (value !== null && value !== undefined) {
               switch (value.toUpperCase()) {
                  case '':
                     return $translate.instant('global.stock');
                  case 'S':
                     return $translate.instant('global.special');
                  case 'N':
                     return $translate.instant('global.non.stock');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      OrderStage: {
         // can be PO or SO
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'ent':
                     return $translate.instant('global.entered');
                  case 'ord':
                     return $translate.instant('global.ordered');
                  case 'prt':
                     return $translate.instant('global.printed');
                  case 'ack':
                     return $translate.instant('global.acknowledged');
                  case 'pre':
                     return $translate.instant('global.pre.received');
                  case 'rcv':
                     return $translate.instant('global.received');
                  case 'cst':
                     return $translate.instant('global.costed');
                  case 'pck':
                     return $translate.instant('global.picked');
                  case 'shp':
                     return $translate.instant('global.shipped');
                  case 'inv':
                     return $translate.instant('global.invoiced');
                  case 'pd':
                     return $translate.instant('global.paid');
                  case 'cls':
                     return $translate.instant('global.closed');
                  case 'can':
                     return $translate.instant('global.cancelled');
                  default:
                     return '';
               }
            } else {
               return '';
            }
         }
      },

      OrderType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'O':
                     return $translate.instant('global.order');
                  case 'P':
                     return $translate.instant('global.purchase.order');
                  case 'T':
                     return $translate.instant('global.warehouse.transfer');
                  case 'I':
                     return $translate.instant('global.inventory.adjustment');
                  case 'F':
                  case 'V':
                     return $translate.instant('global.value.add');
                  case 'K':
                  case 'W':
                     return $translate.instant('global.work.order');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      AssignmentType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'O':
                     return $translate.instant('global.order');
                  case 'P':
                     return $translate.instant('global.primary');
                  case 'S':
                     return $translate.instant('global.single');
                  case 'A':
                     return $translate.instant('global.alternate');
                  case 'X':
                     return $translate.instant('global.staging');
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

      BinStatusType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'A':
                     return $translate.instant('global.available');
                  case 'S':
                     return $translate.instant('global.in.service');
                  case 'I':
                     return $translate.instant('global.inactive');
                  case 'X':
                     return $translate.instant('global.staging');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      ActiveInActive: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'YES':
                     return $translate.instant('global.active');
                  case 'NO':
                     return $translate.instant('global.inactive');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      UnitConversionFactor: {
         convert: function (value) {
            if (value) {
               if (value > 0 && value < 1) {
                  return 1/value;
               } else {
                  return value;
               }
            } else {
               return value;
            }
         }
      },

      UnitConversionMethod: {
         convert: function (value) {
            if (value) {
               if (value < 1) {
                  return $translate.instant('global.units.in.a.stocking.unit');
               } else {
                  return $translate.instant('global.stocking.units.in.this.unit');
               }
            } else {
               return value;
            }
         }
      },

      UnitType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'S':
                     return $translate.instant('global.stocking');
                  case 'B':
                     return $translate.instant('global.buying');
                  case 'P':
                     return $translate.instant('global.standard.pack');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      ModuleName: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'AP':
                     return $translate.instant('global.vendor');
                  case 'AR':
                     return $translate.instant('global.customer');
                  case 'OE':
                     return $translate.instant('global.order');
                  case 'IC':
                     return $translate.instant('global.inventory.control');
                  case 'PO':
                     return $translate.instant('global.purchase.order');
                  case 'WT':
                     return $translate.instant('global.warehouse.transfer');
                  case 'KP':
                     return $translate.instant('global.kit.production');
                  case 'VA':
                     return $translate.instant('global.value.add');
                  case 'PD':
                     return $translate.instant('global.price.discounting');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },

      Period: {
         // Add '/' and leading zeros to the value (i.e. **/**)
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();
               var length = str.length;

               if (str.length === 1) {
                  return '00/0' + str;
               } else if (str.length === 2) {
                  return '00/' + str;
               } else if (str.length === 3) {
                  return '0' + str.substr(0, 1) + '/' + str.substr(1, 2);
               } else {
                  return str.substr(0, 2) + '/' + str.substr(2, 2);
               }
            } else {
               return '';
            }
         },
         // Remove '/' delimiter before applying value to model
         convertBack: function (value) {
            if (value) {
               return value.replace(/\//g, '');
            } else {
               return null;
            }
         }
      },

      PrinterCode: {
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

      Route: {
         // Add '/' delimiters to the value (i.e. ***/**/**)
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();
               var length = str.length;

               if (length > 5) {
                  return str.substr(0, 3) + '/' + str.substr(3, 2) + '/' + str.slice(5);
               } else if (length > 3) {
                  return str.substr(0, 3) + '/' + str.slice(3);
               } else {
                  return str;
               }
            } else {
               return '';
            }
         },
         // Remove '/' delimiters before applying value to model
         convertBack: function (value) {
            if (value) {
               return value.replace(/\//g, '');
            } else {
               return null;
            }
         }
      },

      Sequence: {
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
      SerialLotType: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 's':
                     return $translate.instant('global.serial');
                  case 'l':
                     return $translate.instant('global.lot');
               }
            } else {
               return value;
            }
         }
      },
      Suffix: {
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();

               if (str.length === 1) {
                  return '0' + str;
               } else {
                  return str;
               }
            } else {
               return '00';
            }
         }
      },
      Size: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 's':
                     return $translate.instant('global.small');
                  case 'l':
                     return $translate.instant('global.large');
               }
            } else {
               return value;
            }
         }
      },
      SuffixInput: {
         convert: function (value) {
            if (value || value === 0) {
               // Make sure it's a string type
               var str = value.toString();
               // Strip non integers
               str = str.replace(/\D/g, '');

               if (str.length === 1) {
                  return '0' + str;
               } else {
                  return str;
               }
            } else {
               return '';  // In a search - blank for all suffixes
            }
         },
         // Remove '/' delimiters before applying value to model
         convertBack: function (value) {
            return value;  // So things like t1 get changed to 001 in the actual value
         }
      },

      TieOrderType: {
         convert: function (value) {
            if (value) {
               switch (value.toLowerCase()) {
                  case 'o':
                     return $translate.instant('global.order');
                  case 'p':
                     return $translate.instant('global.purchase.order');
                  case 't':
                     return $translate.instant('global.warehouse.transfer');
                  case 'f':
                     return $translate.instant('global.fab.value.add');
                  case 'w':
                     return $translate.instant('global.work.order');
                  default:
                     return value;
               }
            } else {
               return value;
            }
         }
      },
      TieTransactionType: {
         convert: function (value) {
            if (value) {
               switch (value.toUpperCase()) {
                  case 'BL':
                     return $translate.instant('global.blanket.order');
                  case 'BR':
                     return $translate.instant('global.blanket.release');
                  case 'CR':
                     return $translate.instant('global.correction');
                  case 'CS':
                     return $translate.instant('global.counter.sale');
                  case 'DO':
                     return $translate.instant('global.direct.order');
                  case 'FO':
                     return $translate.instant('global.future.order');
                  case 'QU':
                     return $translate.instant('global.quote');
                  case 'RA':
                     return $translate.instant('global.recvd.on.account');
                  case 'RM':
                     return $translate.instant('global.return.merchandise');
                  case 'SO':
                     return $translate.instant('global.stock.order');
                  case 'ST':
                     return $translate.instant('global.standing.order');
                  case 'VA':
                     return $translate.instant('global.value.add');
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
      UserFieldPart: {
         //Pull out a part of a User Field (i.e. postitions 1-4)
         convert: function (value, subFormatObj, formatOptions) {
            if (value) {
               var length = value.length;
               if (length >= formatOptions.length) {
                  return value.substr(formatOptions.startPosition, formatOptions.length);
               } else {
                  return value;
               }
            } else {
               return value;
            }
         },
         //It is expected that an Extension or function in a controller is written that
         //will write the data back to the correct portion of the field.  Tip: Use the
         //Utils.replaceString function to write data back.
         convertBack: function (value) {
            return null;
         }
      }

   };
});
