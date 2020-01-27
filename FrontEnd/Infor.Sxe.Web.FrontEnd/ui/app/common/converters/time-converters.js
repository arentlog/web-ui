'use strict';

/**
 * Converters for handling different data representations of time data
 *
 * Important! These sub converters should convert to and from ISO format (hh:mm:ss or hh:mm)
 *            in order to work properly with the Standard Time converter.
 */
app.factory('TimeConverters', function TimeConverters() {

   return {

      // String representing hour then min (e.g. 0545 would become 5:45 AM)
      hhmm: {
         // From hhmm to ISO (hh:mm)
         convert: function (value) {
            if (value) {
               if (value.length >= 4) {
                  return value.substr(0, 2) + ':' + value.slice(2);
               } else {
                  return value;
               }
            } else {
               return '';
            }
         },
         // From ISO (hh:mm) to hhmm
         convertBack: function (value) {
            if (value) {
               return value.replace(/:/g, '');
            } else {
               return value;
            }
         }
      },

      // String representing hour, colon, then min (e.g. 05:45 would become 5:45 AM)
      'hh:mm': {
         // From hh:mm to ISO (hh:mm)
         convert: function (value) {
            if (value) {
               return value; // already in ISO format
            } else {
               return '';
            }
         },
         // From ISO (hh:mm) to hh:mm
         convertBack: function (value) {
            return value; // already in proper format
         }
      },

      // String representing hour, min, then seconds (e.g. 054530 would become 5:45:30 AM)
      // If the 'ss' piece has extra decimal places (for fractional seconds) this converter will handle it
      hhmmss: {
         // From hhmmss to ISO (hh:mm:ss)
         convert: function (value) {
            if (value) {
               if (value.length >= 6) {
                  return value.substr(0, 2) + ':' + value.substr(2, 2) + ':' + value.slice(4);
               } else {
                  return value;
               }
            } else {
               return '';
            }
         },
         // From ISO (hh:mm:ss) to hhmmss
         convertBack: function (value) {
            if (value) {
               return value.replace(/:/g, '');
            } else {
               return value;
            }
         }
      },

      // String representing hour, colon, min, colon, then sec (e.g. 05:45:30 would become 5:45:30 AM)
      // If the 'ss' piece has extra decimal places (for fractional seconds) this converter will handle it
      'hh:mm:ss': {
         // From hh:mm:ss to ISO (hh:mm:ss)
         convert: function (value) {
            if (value) {
               return value; // already in ISO format
            } else {
               return '';
            }
         },
         // From ISO (hh:mm:ss) to hh:mm:ss
         convertBack: function (value) {
            return value; // already in proper format
         }
      },

      // Integer of the number of seconds since midnight
      SecondsSinceMidnight: {
         // From seconds to ISO (hh:mm:ss)
         convert: function (value) {

            // Special handling for 0 and midnight
            // - We are displaying blank (not 12:00 am) for a time of 0 seconds since 0 doesn't mean midnight at the backend
            // - 86400 seconds means midnight
            if (value === 0) {
               return '';
            } else if (value === 86400) {
               return '00:00:00';
            }

            if (value) {
               var hours, minutes, seconds = value;

               // Get full hours
               hours = Math.floor(seconds / 3600);

               // Get remaining full seconds
               seconds = seconds - (hours * 3600);

               // Get remaining full minutes
               minutes = Math.floor(seconds / 60);

               // Get remaining seconds
               seconds = seconds - (minutes * 60);

               // Pad leading 0's as needed
               if (hours <= 9) hours = '0' + hours;
               if (minutes <= 9) minutes = '0' + minutes;
               if (seconds <= 9) seconds = '0' + seconds;

               return hours + ':' + minutes + ':' + seconds;
            } else {
               return '';
            }
         },
         // From ISO (hh:mm:ss or hh:mm) to seconds since midnight
         convertBack: function (value) {

            // Special handling for midnight
            // - The ISO time of midnight should be stored as 86400 seconds (not 0) since that's what backend expects
            if (value === '00:00' || value === '00:00:00') {
               return 86400;
            }

            if (value) {
               var pieces = value.split(':');

               // Get hour and min as integers
               var hours = parseInt(pieces[0]);
               var minutes = parseInt(pieces[1]);

               // Seconds may or may not be in the ISO string
               var seconds = pieces.length >= 3 ? parseInt(pieces[2]) : 0;

               // Convert ISO pieces to full number of seconds
               return (hours * 3600) + (minutes * 60) + seconds;
            } else {
               return 0; // a blank value should set model to 0 (backend doesn't like null)
            }
         }
      }

   };
});
