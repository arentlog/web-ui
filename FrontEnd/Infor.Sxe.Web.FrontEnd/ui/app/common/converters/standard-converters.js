'use strict';

/**
 * Standard converters for general data formats that could be used by any application
 */
app.factory('StandardConverters', function StandardConverters(ConfigService) {

   /**
    * Helper method to get full 4-digit year from a 2-digit year
    *
    * TODO: should we use a setting in sxe to determine century?
    */
   function getFullYear(shortYear) {
      var fullYear = null;

      // Convert short year to a number if it's a string
      var number = parseInt(shortYear, 10);

      // Determine century
      if (number < 50) {
         // Add 2000 to any year < 50
         fullYear = 2000 + number;
      } else if (number <= 99) {
         // Add 1900 to any year <= 99
         fullYear = 1900 + number;
      } else {
         // Otherwise keep year as is
         fullYear = number;
      }

      return fullYear;
   }

   return {

      Currency: {
         // Add formatting to the currency
         convert: function (value, subFormatObj, formatOptions) {
            if (value || value === 0) {
               var opts = formatOptions || {};

               // Important! We are not styling as currency here because we don't want a currency symbol to show
               opts.style = 'decimal';
               opts.round = true; // Need this, otherwise SoHo truncates extra decimals

               return Locale.formatNumber(value, opts);
            } else {
               return '';
            }
         },
         // Remove formatting and change to number type before applying value to model
         convertBack: function (value) {
            return value ? Locale.parseNumber(value) : null;
         }
      },

      Date: {
         // Add formatting to the date string/object according to current locale
         convert: function (value, subFormatObj) {
            if (value) {
               var dateObj;

               // Value may be a string or Date
               if (typeof value === 'string') {
                  var modelFormat, timeIndex;

                  // If a subFormat is specified, use its modelFormat
                  if (subFormatObj) {
                     modelFormat = subFormatObj.modelFormat;
                  } else {
                     // Otherwise, use default model format (ISO/JSON which is the default format used by our REST api)
                     modelFormat = 'yyyy-MM-dd';

                     // Important!!! If value is in ISO/JSON format (yyyy-MM-ddThh:mm:ss.sssZ), we need to
                     // chop off the time part (otherwise timezone can cause wrong date to display).
                     // In the context of a date field, time is not relevant.
                     timeIndex = value.indexOf('T');
                     if (timeIndex >= 0) {
                        value = value.substr(0, timeIndex);
                     }
                  }

                  // Convert string to date object before formatting (since SoHo handles formatting of objects better)
                  dateObj = Locale.parseDate(value, modelFormat);
               } else {
                  dateObj = value;
               }

               // Format into client's display format
               return Locale.formatDate(dateObj);
            } else {
               return '';
            }
         },
         // Convert formatted date to model format (default is ISO/JSON format) before applying value to model
         convertBack: function (value, subFormatObj) {
            if (value) {
               var localeDateFormat = Locale.calendar().dateFormat;
               var separator = localeDateFormat.separator; // i.e. / or -
               var datePattern = localeDateFormat.short; // i.e. M/d/yyyy or yyyy-MM-dd
               var firstSeparator, secondSeparator, yearStart, yearValue, fullYear;

               /*
                * This is where we manipulate a user's entry of a 2-digit year into a 4-digit year based on our century logic
                */

               // Locales with year at the end of mask pattern (i.e. M/d/yyyy)
               if (datePattern.endsWith('yyyy')) {
                  firstSeparator = value.indexOf(separator);
                  secondSeparator = value.lastIndexOf(separator);
                  yearStart = secondSeparator + 1;

                  // If have a year value
                  if (firstSeparator !== secondSeparator && secondSeparator >= 0 && value.length > yearStart) {
                     yearValue = value.substr(yearStart);

                     // If year value is 2 digits or less, then convert to full year
                     if (yearValue.length <= 2) {
                        fullYear = getFullYear(yearValue);

                        // Replace short year with full year
                        value = value.substr(0, yearStart) + fullYear;
                     }
                  }
               } else if (datePattern.startsWith('yyyy')) {
                  // Locales with year at the beginning of mask pattern (i.e. yyyy-MM-dd)
                  firstSeparator = value.indexOf(separator);

                  // If have a year value and separator
                  if (firstSeparator >= 0) {
                     yearValue = value.substr(0, firstSeparator);

                     // If year value is 2 digits or less, then convert to full year
                     if (yearValue.length <= 2) {
                        fullYear = getFullYear(yearValue);

                        // Replace short year with full year
                        value = fullYear + value.substr(firstSeparator);
                     }
                  }
               }

               // Get date object from locale-specific date string
               var dateObj = Locale.parseDate(value);

               if (dateObj) {
                  // Catch if the user enters a 3-digit year and don't allow it (this prevents some user mistakes)
                  if (dateObj.getFullYear() < 1000) {
                     return null;
                  }

                  // If a subFormat is specified, use its modelFormat
                  if (subFormatObj) {
                     return Locale.formatDate(dateObj, { pattern: subFormatObj.modelFormat });
                  } else {
                     // Otherwise, use default model format (ISO/JSON which is the default format used by our REST api)
                     var jsonDate = Locale.formatDate(dateObj, { pattern: 'yyyy-MM-dd' });

                     // Add time information of midnight (to be exactly same as how our REST server communicates dates)
                     jsonDate += 'T00:00:00';

                     return jsonDate;
                  }
               } else {
                  return null;
               }
            } else {
               return null;
            }
         }
      },

      Decimal: {
         // Add formatting to the decimal according to current locale
         convert: function (value, subFormatObj, formatOptions) {
            if (value || value === 0) {
               var opts = formatOptions || {};

               // Style always decimal
               opts.style = 'decimal';
               opts.round = true; // Need this, otherwise SoHo truncates extra decimals

               return Locale.formatNumber(value, opts);
            } else {
               return '';
            }
         },
         // Remove formatting and change to number type before applying value to model
         convertBack: function (value) {
            return value ? Locale.parseNumber(value) : null;
         }
      },

      Integer: {
         // Add formatting to the integer according to current locale
         convert: function (value, subFormatObj, formatOptions) {
            if (value || value === 0) {
               var opts = formatOptions || {};

               // Style always integer
               opts.style = 'integer';

               return Locale.formatNumber(value, opts);
            } else {
               return '';
            }
         },
         // Remove formatting and change to number type before applying value to model
         convertBack: function (value) {
            return value ? Locale.parseNumber(value) : null;
         }
      },

      Percent: {
         // Add formatting to the percent according to current locale
         convert: function (value, subFormatObj, formatOptions) {
            if (value || value === 0) {
               var opts = formatOptions || {};

               // Note: The SoHo 'percent' style is multiplying by 100, so we aren't using it.
               opts.style = 'decimal';
               opts.round = true; // Need this, otherwise SoHo truncates extra decimals

               var str = Locale.formatNumber(value, opts);

               // Add symbol manually (except for text box fields which display a symbol on top of the input field)
               if (!opts.hideSymbol) {
                  str += ' %';
               }

               return str;
            } else {
               return '';
            }
         },
         // Remove formatting and change to number type before applying value to model
         convertBack: function (value) {
            return value ? Locale.parseNumber(value) : null;
         }
      },

      Phone: {
         // Add formatting to the value - i.e. (###) ###-#### / #### or whatever mask value is set in the system
         convert: function (value) {
            if (!value) {
               return '';
            } else {
               // Get current format (comes from AO > System > Options > Phone # Format)
               var mask = ConfigService.getPhoneFormat();

               // Sometimes phone/fax numbers are stored with the numeric digits only, other times they are stored with
               // the formatting included. Therefore remove the formatting (all non-numeric characters) before applying
               // the current phone number format. This will help heal our inconsistency in these stored values.
               var str = value.toString().replace(/[^0-9]/g, '');

               // Add mask formatting characters to the value
               for (var i = 0; i < mask.length; i++) {
                  var char = mask.charAt(i);

                  // Stop formatting if we've reached the end of the phone number
                  if (i === str.length) {
                     break;
                  }

                  // Insert mask formatting characters at their appropriate position in the phone number string
                  if (char !== '#') {
                     str = str.slice(0, i) + char + str.slice(i);
                  }
               }

               return str;
            }
         },
         // Remove all non-numeric characters before applying value to model
         convertBack: function (value) {
            if (value) {
               return value.replace(/[^0-9]/g, '');
            } else {
               return null;
            }
         }
      },

      // This standard Time converter uses 12 or 24 hour format (depending on user's locale). It works with
      // specific time sub converters by communicating through the standard ISO 8601 time format (hh:mm:ss or hh:mm).
      Time: {
         convert: function (value, subFormatObj, formatOptions) {
            var opts = formatOptions || {};

            // Sub format is required for Time (if not defined, don't bomb out but just display data)
            if (!subFormatObj) {
               return value;
            }

            // Get time in standard ISO format (hh:mm:ss) from the time sub converter
            var isoTime = subFormatObj.converter.convert(value);

            if (isoTime) {
               // Trim off seconds (:ss) if not showing seconds
               if (isoTime.length > 5 && !opts.showSeconds) {
                  isoTime = isoTime.substr(0, 5);
               }

               // Display 12 or 24 time format based on user's locale (this is the test SoHo does for their time picker)
               var is24Hour = Locale.calendar().timeFormat.includes('HH');

               // TODO: later can improve format the be specific to the exact timeFormat string of the locale (need SoHo help)

               // 24-hour or 12-hour display format
               if (is24Hour) {
                  return isoTime; // no change needed since ISO format is same as 24-hour display format
               } else {
                  var hourDisplay;

                  // Get numeric form of hour (and strip leading 0)
                  var hourNum = parseInt(isoTime.substr(0, 2));

                  // Convert hour piece from 24-hour to 12-hour
                  if (hourNum === 0) {
                     hourDisplay = 12;
                  } else if (hourNum >= 13) {
                     hourDisplay = hourNum - 12;
                  } else {
                     hourDisplay = hourNum;
                  }

                  // If afternoon, use 'PM', otherwise 'AM'
                  // TODO: use strings from locale (AM, a.m., etc.)
                  var ampm = hourNum >= 12 ? 'PM' : 'AM';

                  return hourDisplay + isoTime.slice(2) + ' ' + ampm;
               }
            } else {
               return isoTime;
            }
         },
         // Take in locale-specific display value and convert to particular time data based on subFormat
         convertBack: function (value, subFormatObj) {
            var isoTime = '';

            // Sub format is required for Time (if not defined, don't bomb out but just use value)
            if (!subFormatObj) {
               return value;
            }

            // Convert locale-specific display time to ISO time
            if (value && value.includes(':')) {

               // Determine if 12 or 24 time format based on user's locale (this is the test SoHo does for their time picker)
               var is24Hour = Locale.calendar().timeFormat.includes('HH');

               // 24 or 12-hour format being used
               if (is24Hour) {
                  var hourPiece = value.split(':')[0];

                  // 24-hour time is same as ISO time, however we may need to add the leading '0'
                  if (hourPiece.length === 1) {
                     isoTime = '0' + value;
                  } else {
                     isoTime = value;
                  }
               } else {
                  var pieces = value.split(':');

                  // Hour is 1st piece
                  var hourNum = parseInt(pieces[0]);

                  // Min is 2nd piece without the non-numeric chars (e.g. ' AM')
                  var min = pieces[1].replace(/[^0-9]/g, '');

                  // Check for AM/PM in 2nd piece (may be AM, am, a.m., etc.)
                  var isAM = pieces[1].includes('A') || pieces[1].includes('a');

                  // Convert hour piece from 24-hour to 12-hour
                  var isoHour;
                  if (isAM) {
                     if (hourNum === 12) {
                        isoHour = '00';
                     } else if (hourNum <= 9) {
                        // 1am-9am need leading '0'
                        isoHour = '0' + hourNum;
                     } else {
                        isoHour = hourNum;
                     }
                  } else {
                     // PM hours (except 12pm) need to add 12
                     isoHour = hourNum !== 12 ? hourNum + 12 : hourNum;
                  }

                  // Form into ISO time (hh:mm)
                  // Note: we don't need to worry about seconds here because the time picker control doesn't have seconds
                  isoTime = isoHour + ':' + min;
               }
            }

            // Invoke the sub converter passing ISO time to get the actual time data to apply to model
            return subFormatObj.converter.convertBack(isoTime);
         }
      },

      ValueToBoolean: {
         // Take in a string/number value (i.e. "A" or "I") and convert it to true or false based on subFormat settings
         convert: function (value, subFormatObj, formatOptions) {
            var trueValue;

            // 1. If subFormat specified, use it
            // 2. If formatOptions specifies a trueValue, use it
            // 3. Otherwise, treat values as already being booleans
            if (subFormatObj) {
               trueValue = subFormatObj.trueValue;
            } else if (formatOptions && formatOptions.trueValue !== undefined) {
               trueValue = formatOptions.trueValue;
            } else {
               trueValue = true;
            }

            // For string values do a case-insensitive comparison to determine if boolean is true
            if (typeof value === 'string' && typeof trueValue === 'string') {
               value = value.toLowerCase();
               trueValue = trueValue.toLowerCase();
            }

            // Return true/false based on comparison (undefined and null will result in false unless trueValue is undefined/null)
            return value === trueValue;
         },
         // Take in a boolean and convert it to the other value (i.e. "A" = true, "I" = false) based on subFormat settings
         convertBack: function (value, subFormatObj, formatOptions) {
            var trueValue, falseValue;

            // 1. If subFormat specified, use its values
            // 2. If formatOptions specifies values, use them
            // 3. Otherwise, treat values as already being booleans
            if (subFormatObj) {
               trueValue = subFormatObj.trueValue;
               falseValue = subFormatObj.falseValue;
            } else if (formatOptions && formatOptions.trueValue !== undefined && formatOptions.falseValue !== undefined) {
               trueValue = formatOptions.trueValue;
               falseValue = formatOptions.falseValue;
            } else {
               trueValue = true;
               falseValue = false;
            }

            return value ? trueValue : falseValue;
         }
      },

      Year: {
         // We always display 4 digit years to the user, but the data may be stored as 2 or 4 digit numbers
         convert: function (value, subFormatObj, formatOptions) {
            if (value || value === 0) {
               var number = value;

               // TODO: should we use the settings in sxe to determine century?

               // For 2 digit models, add the century for consistent display purposes
               if (number < 50) {
                  // Add 2000 to any year < 50
                  number += 2000;
               } else if (number <= 99) {
                  // Add 1900 to any year <= 99
                  number += 1900;
               }

               return number.toString();
            } else {
               return '';
            }
         },
         // Change to number type (and add century if needed) before applying value to model
         convertBack: function (value, subFormatObj, formatOptions) {
            if (value) {
               var number = parseInt(value, 10);

               // TODO: should we use the settings in sxe to determine century?

               // Add the century (if not entered by user)
               if (number < 50) {
                  // Add 2000 to any year < 50
                  number += 2000;
               } else if (number <= 99) {
                  // Add 1900 to any year <= 99
                  number += 1900;
               } else if (number < 1950) {
                  // Any unknown year such as 123 or prior to 1950 will return null
                  // Note: We can't allow years <= 1949 because a 2-digit Progress model would treat 49 as 2049
                  number = null;
               }

               // If sub format is 2-digit, chop off the century before applying to model
               if (subFormatObj.key === '2Digit' && number !== null) {
                  var yearStr = number.toString().substr(2, 2);

                  // Back to number
                  number = parseInt(yearStr, 10);
               }

               return number;
            } else {
               return null;
            }
         }
      }

   };
});
