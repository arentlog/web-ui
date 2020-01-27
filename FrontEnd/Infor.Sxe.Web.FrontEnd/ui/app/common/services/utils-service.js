'use strict';

app.service('Utils', function Utils($filter, $sanitize, $translate, MessageService, Constants, ConfigService, StandardConverters, UserService) {

   // Variable to hold the incrementing transientId used when a grid needs unique temporary ids
   var transientId = 1;
   var msPerDay = 1000 * 60 * 60 * 24;

   /* Public methods */

   /**
    * Returns an id value that is unique for the current user's session
    */
   this.getTransientId = function () {
      return transientId++;
   };

   /**
    * Get today's date in ISO/JSON format - yyyy-MM-ddThh:mm:ss
    * (we should always write code based on this standard format instead of locale-specific formats)
    */
   this.getCurrentDate = function () {
      var today = new Date();
      return Locale.formatDate(today, { pattern: 'yyyy-MM-dd' }) + 'T00:00:00';
   };

   /**
    * This function is used to return the full year in YYYY format.
    * shortYear   -  This is Actual Financial year code passed as input in 2 digit format. 
    */
   this.getFullYear = function (shortYear) {
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
   };

   /**
    * Get the two digit year of today's date
    */
   this.getCurrentYearTwo = function () {
      var shortYear = new Date().getFullYear().toString().substr(2, 2);
      return parseInt(shortYear, 10);
   };

   /**
    * Get the four digit year of today's date
   */
   this.getCurrentYearFour = function () {
      return new Date().getFullYear();
   };

   /**
    * Get the two digit month of today's date
   */
   this.getCurrentMonth = function () {
      return new Date().getMonth() + 1;
   };

   /**
    * Formats date (object or ISO/JSON string) into user's format for display purposes only
    */
   this.formatDate = function (date) {
      if (date) {
         return StandardConverters.Date.convert(date);
      } else {
         return '';
      }
   };

   //This is used when the backend is sending up a string date but we need to handle the backend mdy or dmy format
   //but also present the date in the right Locale for the user as well.  (i.e. the backend might send up a date for
   //March 7th, 2019 that would be either:  03/07/19 (for US) or 07/03/19 (for UK).  This will take that string date and
   //convert it properly to an actual Date field in the user's Locale in the browser.
   this.reformatStringDate = function (date) {
      var dateFormatted = date;
      if (ConfigService.getBackendDateFormat() === 'mdy') {
         dateFormatted = StandardConverters.Date.convert(date, { modelFormat: 'MM/dd/yy' });
         dateFormatted = StandardConverters.Date.convertBack(dateFormatted);
      } else {
         dateFormatted = StandardConverters.Date.convert(date, { modelFormat: 'dd/MM/yy' });
         dateFormatted = StandardConverters.Date.convertBack(dateFormatted);
      }
      return dateFormatted;
   };

   //This takes in the Period Ranges from the backend and reformats the dates into
   //the User's Locale format for dates (i.e. MM/dd/yyyy or dd/MM/yyyy).  Some input
   //data you might see is:  "(1) - 11/02/18 - 12/02/18" or "(5) Older - 08/01/18".
   this.reformatPeriodDates = function (periodRange) {
      var periodRangeReformatted = periodRange;
      if (periodRange) {
         var periodRangePartsOrig = periodRange.split(' ');
         var periodRangeParts = [];

         //Cleanse the output to make them consistent in length (i.e. the Period 5 contains extra spaces and doesn't have a leading date)
         for (var i = 0; i < periodRangePartsOrig.length; i++) {
            if (periodRangePartsOrig[i]) {
               periodRangeParts.push(periodRangePartsOrig[i]);
            }
         }

         //Break out the date elements.  NOTE:  All CSD installations have the Progress Dates in a MDY format
         //on the server.  This uses the Backend Date Format to determine how the date in the string of data
         //is being sent up.  Then use the Locale to convert it to the Browser Locale.
         var dateFrom = periodRangeParts[1];
         var dateFromFormatted = '';
         if (dateFrom && dateFrom.includes('/')) {
            if (ConfigService.getBackendDateFormat() === 'mdy') {
               dateFromFormatted = StandardConverters.Date.convert(dateFrom, { modelFormat: 'MM/dd/yy' });
            } else {
               dateFromFormatted = StandardConverters.Date.convert(dateFrom, { modelFormat: 'dd/MM/yy' });
            }
         } else {
            dateFromFormatted = periodRangeParts[1];
         }

         var dateTo = periodRangeParts[3];
         var dateToFormatted = '';
         if (dateTo && dateTo.includes('/')) {
            if (ConfigService.getBackendDateFormat() === 'mdy') {
               dateToFormatted = StandardConverters.Date.convert(dateTo, { modelFormat: 'MM/dd/yy' });
            } else {
               dateToFormatted = StandardConverters.Date.convert(dateTo, { modelFormat: 'dd/MM/yy' });
            }
         } else {
            dateToFormatted = periodRangeParts[3];
         }

         if (periodRangeParts.length > 3) {
            //Example:  (Period #) DateFrom - DateTo
            periodRangeReformatted = periodRangeParts[0] + ' ' + dateFromFormatted + ' ' + periodRangeParts[2] + ' ' + dateToFormatted;
         }
      }

      return periodRangeReformatted;
   };

   /**
    * Get difference between dates in days (rounded up)
    */
   this.getDateDayDifference = function (date1, date2) {
      var d1 = typeof date1 === 'object' ? date1 : new Date(date1);
      var d2 = typeof date2 === 'object' ? date2 : new Date(date2);
      var difference = d1 - d2;
      return Math.ceil(difference / msPerDay);
   };

   /**
    * Add/subtract days to a date
    */
   this.addSubtractDaysToDate = function (date, days) {
      var d = typeof date === 'object' ? date : new Date(date);
      d.setTime(d.getTime() + (days * msPerDay));
      return d;
   };

   /**
    * Get the pieces (hour, min, ampm) in 12-hour format from a given time value.
    * The time value should either be in 'hh:mm' or 'hhmm' 24-hour format.
     */
   this.getTimePieces = function (time) {
      var timePieces = {};

      if (time) {
         var hourIn12;

         // if 'hh:mm' remove colon
         if (time.includes(':')) {
            time = time.replace(':', '');
         }

         var hour = parseInt(time.substr(0, 2), 10);
         var min = parseInt(time.substr(2, 2), 10);

         // Adjust 24-hour hour to 12-hour hour
         if (hour === 0) {
            hourIn12 = 12;
         } else if (hour >= 13) {
            hourIn12 = hour - 12;
         } else {
            hourIn12 = hour;
         }

         timePieces.hour = hourIn12;
         timePieces.min = min;
         timePieces.ampm = hour < 12 ? 'am' : 'pm';
      }

      return timePieces;
   };

   /**
    * Return a copy of the incoming string that is safe for insertion in the DOM.
    * This is to prevent script injection (XSS) attacks.
    * This implementation encodes all HTML angle brackets, thus changing any HTML to text.
    */
   this.escapeHtml = function (str) {
      if (str && typeof str === 'string') {
         return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else {
         return str;
      }
   };

   /**
    * Return a copy of the incoming string that is safe for insertion in the DOM.
    * This is to prevent script injection (XSS) attacks.
    * This implementation removes all unsafe html, keeping safe html since it is wanted in some cases.
    */
   this.sanitizeHtml = function (str) {
      if (str && typeof str === 'string') {
         return $sanitize(str);
      } else {
         return str;
      }
   };

   this.addParametersToUrl = function (url, paramData) {
      var result = url;
      for (var param in paramData) {
         if (paramData.hasOwnProperty(param)) {
            result = this.addParamToUrl(result, param, paramData[param]);
         }
      }
      return result;
   };

   this.addParamToUrl = function (url, name, value) {
      return url + getSeparator(url) + name + '=' + value;
   };

   /**
    * Return the result of object (if its a function) or object itself
    */
   this.getValueOrResult = function (object, param) {
      return (typeof object === 'function') ? object(param) : object;
   };

   /**
    * Clear the 1st array and add to it the objects in the 2nd array
    */
   this.replaceArray = function (dest, source) {
      var i;
      var destLength = dest.length;
      var sourceLength = source.length;

      // Clear 1st array
      for (i = 0; i < destLength; i++) {
         dest.pop();
      }

      // Add from 2nd array to 1st array
      for (i = 0; i < sourceLength; i++) {
         dest.push(source[i]);
      }
   };

   /**
    * Remove the properties on the 1st object and add to it the properties on the 2nd object
    */
   this.replaceObject = function (dest, source) {
      var prop;

      // Remove properties of 1st object
      for (prop in dest) {
         if (dest.hasOwnProperty(prop)) {
            delete dest[prop];
         }
      }

      // Add values from 2nd object to 1st object
      for (prop in source) {
         if (source.hasOwnProperty(prop)) {
            dest[prop] = source[prop];
         }
      }
   };

   /**
    * Clear the array by removing all objects
    */
   this.clearArray = function (dest) {
      var i;
      var destLength = dest.length;

      // Clear the array
      for (i = 0; i < destLength; i++) {
         dest.pop();
      }
   };

   /**
    * Clear the object by removing all properties
    */
   this.clearObject = function (object) {
      var prop;

      // Delete all properties
      for (prop in object) {
         if (object.hasOwnProperty(prop)) {
            delete object[prop];
         }
      }
   };

   /**
    * Extend object1 by adding (or replacing) all properties from object2 to object1
    */
   this.extend = function (object1, object2) {
      var prop;

      if (object1 && object2) {
         for (prop in object2) {
            if (object2.hasOwnProperty(prop)) {
               object1[prop] = object2[prop];
            }
         }
      }

      return object1;
   };

   /**
    * Return the value of the field on object specified by fieldPath (possibly a nested path), tweaked to allow a field to be a function.
    */
   this.getNestedValue = function (object, fieldPath) {
      var value = object;
      var fields;
      // Dot notation implies field is nested
      if (fieldPath.indexOf('.') >= 0) {
         var nestedFields = fieldPath.split('.');

         // Traverse down the nested fields
         for (var field = 0; field < nestedFields.length; field++) {
            if (value) {
               fields = this.returnManipulatedValue(nestedFields[field]);
               value = (fields.length > 1) ? value[fields[0]](fields[1]) : value[fields[0]];
            }
         }
      } else {
         fields = this.returnManipulatedValue(fieldPath);
         value = (fields.length > 1) ? value[fields[0]](fields[1]) : value[fields[0]];
      }
      return value;
   };

   /**
    * Pass in blah, returns a single array blah, blah(), passed back a two part array blah and "", pass in blah("code") returns a two part array blah, "code"
    */
   this.returnManipulatedValue = function (value) {
      if (!value.includes('(')) {
         return [value];
      } else {
         var firstPart = value.replace(/ *\([^)]*\) */g, '');
         var secondPart = '';
         var regExp = /\(([^)]+)\)/;
         var matches = regExp.exec(value);
         if (matches && matches.length > 1) {
            secondPart = matches[1];
         }
         return [firstPart, secondPart];
      }
   };

   /**
    * Set value on the field of the object (possibly a nested field)
    */
   this.setNestedValue = function (object, fieldPath, value) {
      var obj = object;

      // Dot notation implies field is nested
      if (fieldPath.indexOf('.') >= 0) {
         var nestedFields = fieldPath.split('.');
         var length = nestedFields.length;

         // Traverse down the nested fields
         for (var i = 0; i < length; i++) {
            var fieldName = nestedFields[i];

            if (i === length - 1) {
               obj[fieldName] = value;
            } else {
               var subObj = obj[fieldName];

               if (subObj) {
                  obj = subObj;
               }
               // Create sub-objects if they don't exist
               else {
                  var newObj = {};
                  obj[fieldName] = newObj;
                  obj = newObj;
               }
            }
         }
      } else {
         object[fieldPath] = value;
      }
   };

   /**
    * Alphabetically sort the keys/properties of an object
    */
   this.sortObjectKeys = function (object) {
      var key, value;

      if (object) {
         var keys = Object.keys(object).sort();

         for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            value = object[key];
            delete object[key];
            object[key] = value;
         }
      }
   };

   /**
    * Return a random number between two values
   */
   this.getRandom = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   };

   /**
    * Return true if the object exists in the array.
    * Warning: Only use this if you are using complex objects to compare
    * because if it's a simple primative, it might cause a false positive.
   */
   this.objectExistsInArray = function (array, object) {
      var found = JSON.stringify(array).indexOf(JSON.stringify(object))
      return found === -1 ? false : true;
   };

   /**
    * Pad a number to a minimum width
    */
   this.pad = function (n, width, z) {
      z = z || '0';
      if (n) {
         n = n + '';
      } else {
         n = '';
      }
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
   };

   this.padString = function (size, value, charToPad) {
      for (var i = value.length; i < size; i++) {
         value += charToPad;
      }
      return value;
   }

   /**
    * This function is used to Concate the char which we pass as prefix to the value.
    * size        -  total size of the value
    * value       -  Actual string value that needs to be manipulated.
    * charToPad   -  Character which is supposed to concatenate as prefix to the value.
    */
   this.padPrefixString = function (size, value, charToPad) {
      for (var i = value.toString().length; i < size; i++) {
         value = charToPad + value;
      }
      return value;
   }

   /**
    * This function is used by various ICS Extenions/Modifications.
    *
    * padding   - The amount of characters to be padded/ used as start position if ispadLeft is false.
    * value     - Actual string value that needs to be manipulated.
    * ispadLeft - if false it extracts the string value that is passed with padding as starting position
    *             and endLength as length to be extracted from the string.  If true by using padding
    *             value it creates that much length of a string and inserts the value in these padded space.
    * endLength - Length to be extracted.

    * NOTE:  Please do not rename or change the signature of this function as it's used in many
    * extensions and modifications.
    */
   this.paddingLeft = function (padding, value, ispadLeft, endLength) {
      if (typeof value === 'undefined')
         return padding;
      if (ispadLeft) {
         return (value + padding).slice(0, padding.length);
      } else {
         return (value).substr(padding, endLength);
      }
   };

   /**
    * Take in a string and a position (zero based) and a value to replace.  This will
    * replace that character in the position indicated.
    */
   this.replaceCharAt = function (string, index, replace) {
      return string.substring(0, index) + replace + string.substring(index + 1);
   };

   /**
    * Take in a starting position, (zero based), size to replace, original value to fix, along with
    * a value to replace, and the character to pad the ending with (i.e. ' ')
    */
   this.replaceString = function (starting, size, originalValue, valueToReplace, charToPad) {
      //If the original value is null, then we want to give it a default value, so we can overwrite the data.
      if (!originalValue) {
         originalValue = ' ';
      }

      var part1 = originalValue.substr(0, starting);
      var part2 = originalValue.substr(starting + size);

      return part1 + this.padString(size, valueToReplace, charToPad) + part2;
   };

   /**
    * Build standardized sub title to display based on record and metadata about pieces.
    *
    * @param record - the object to get the subtitle values from
    * @param pieces - an array of metadata about the sub title pieces to display
    *    ex. [
    *          {label: 'global.customer.type', value: 'custtype'},
    *          {label: 'global.name', value: 'name'}
    *        ]
    */
   this.buildSubTitle = function (record, pieces) {
      var subTitle = '';

      for (var i = 0; i < pieces.length; i++) {
         var piece = pieces[i];

         // Get piece value from record
         var value = this.getNestedValue(record, piece.value);

         // Add piece to sub title (if value has data)
         if (value || value === 0) {
            // Add separator (if not the first piece added)
            if (subTitle) {
               subTitle += Constants.SUB_TITLE_SEPARATOR;
            }

            // Add label (if defined)
            if (piece.label) {
               subTitle += $translate.instant(piece.label) + ': ';
            }

            // Add value
            subTitle += value;
         }
      }

      return subTitle;
   };

   /**
    * JS-Diff by Gary Chisholm
    * All we're going to do is read in two objects. Iterate over them and return the differences.
    * Distributed under the MIT license.
    * The software is provided "as is", without warranty of any kind, express or implied.
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    * Pulled from https://github.com/omgaz/js-diff on 03/04/2016 by Stephen Schwenck
    * Modified by Stephen Schwenck for private use of Infor
    */
   this.deepCompare = function (obj1, obj2, isLooseType) {
      var diff = '';

      // Iterate over obj1 looking for removals and differences in existing values
      for (var key in obj1) {
         if (obj1.hasOwnProperty(key) && typeof obj1[key] !== 'function') {
            var obj1Val = obj1[key];
            var obj2Val = obj2[key];

            // If property is in both obj1 and obj2 and is different (main use case)
            if ((!isLooseType && obj1Val !== obj2Val) || (isLooseType && obj1Val !== obj2Val)) {
               if (diff) {
                  diff += ',' + key;
               } else {
                  diff += key;
               }
            }
            // If property exists in obj1 and not in obj2 then it has been removed
            else if (!(key in obj2)) {
               if (diff) {
                  diff += ',' + key;
               } else {
                  diff += key;
               }
            }
         }
      }

      // Iterate over obj2 looking for any new additions
      for (key in obj2) {
         if (obj2.hasOwnProperty(key) && typeof obj2[key] !== 'function') {
            if (!(key in obj1)) {
               if (diff) {
                  diff += ',' + key;
               } else {
                  diff += key;
               }
            }
         }
      }

      return diff;
   };

   /**
    * Method for reading binary into a string.
    * Old JavsScript function readAsBinaryString is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
    * This method uses readAsBinaryString where appropriate, but has a fallback on readAsBufferArray
    */
   this.readAsBinaryString = function (file, onLoadCallback) {
      var reader = new FileReader();

      var binStringCallback = function (e) {
         onLoadCallback(e.target.result);
      };

      var arrBufferCallback = function (e) {
         var binary = '';
         var bytes = new Uint8Array(e.target.result);
         var length = bytes.byteLength;
         for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
         }
         onLoadCallback(binary);
      };

      reader.onerror = reader.onabort = function () {
         MessageService.error('global.error', 'message.there.was.a.problem.reading.the imported.file');
      };

      if (typeof reader.readAsBinaryString != 'undefined') {
         reader.onload = binStringCallback;
         reader.readAsBinaryString(file);
      } else {
         reader.onload = arrBufferCallback;
         reader.readAsArrayBuffer(file);
      }
   };

   this.returnDateTimeStamp = function () {
      var currentdate = new Date();
      return currentdate.getDate() + '-'
         + (currentdate.getMonth() + 1) + '-'
         + currentdate.getFullYear() + '-'
         + currentdate.getHours() + ':'
         + currentdate.getMinutes() + ':'
         + currentdate.getSeconds();
   };

   /**
 * Wrapper for reading into
 * Old JavsScript function readAsBinaryString is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsBinaryString
 * This method uses readAsBinaryString where appropriate, but has a fallback on readAsBufferArray
 */
   this.readAsArrayBuffer = function (file, onLoadCallback) {
      var reader = new FileReader();
      reader.onerror = reader.onabort = function () {
         MessageService.error('global.error', 'message.there.was.a.problem.reading.the imported.file');
      };
      var arrBufferCallback = function (e) {
         var bytes = new Uint8Array(e.target.result);
         onLoadCallback(bytes);
      };
      reader.onload = arrBufferCallback;
      reader.readAsArrayBuffer(file);
   };

   /* Process Facets */
   this.processData = function (criteria, data, easyLineEntryMode) {
      switch (criteria.LookupParameter) {
         case 'icsw':
         case 'units':
         case 'contacts':
         case 'poeh':
            if (data && data.hits.length > 0 && !criteria.IsAutoComplete && !criteria.IsGlobalSearch) {
               data.hits.forEach(function (item) {
                  if (criteria.LookupParameter === 'icsw') {
                     item.Description = item.descrip1.substring(0, 24) + ' ' + item.descrip2.substring(0, 24);
                     item.ExtendedDescription = item.descrip3;
                     item.DisplayRecordType = $translate.instant('special.facet.icsw.rectype.' + item.rectype.toLowerCase());

                     if (easyLineEntryMode) {
                        item.calc_uom = item.unitstock || '';
                        switch (easyLineEntryMode) {
                           case 'oe':
                              if (item.unitsell) {
                                 item.calc_uom = item.unitsell;
                              }
                              break;
                           case 'po':
                              if (item.unitbuy) {
                                 item.calc_uom = item.unitbuy;
                              }
                              break;
                           case 'wt':
                              if (item.unitwt) {
                                 item.calc_uom = item.unitwt;
                              }
                              break;
                        }
                     }
                  }

                  if (criteria.LookupParameter === 'units') {
                     if (item.rectype === 'sasta') {
                        item.units = item.codeval;
                     }
                  }

                  if (criteria.LookupParameter === 'contacts') {
                     switch (item.rectype.toLowerCase()) {
                        case 'arsc':
                           item.Subject1 = $translate.instant('global.customer') + ' : ' + item.primarykey + ' - ' + item.arscName;
                           item.Subject2 = '';
                           break;
                        case 'arss':
                           item.Subject1 = $translate.instant('global.ship.to') + ' : ' + item.secondarykey + ' - ' + item.arssName;
                           item.Subject2 = $translate.instant('global.customer') + ' : ' + item.primarykey + ' - ' + item.arscName;
                           break;
                        case 'apsv':
                           item.Subject1 = $translate.instant('global.vendor') + ' : ' + item.primarykey + ' - ' + item.apsvName;
                           item.Subject2 = '';
                           break;
                        case 'apss':
                           item.Subject1 = $translate.instant('global.ship.from') + ' : ' + item.secondarykey + ' - ' + item.apssName;
                           item.Subject2 = $translate.instant('global.vendor') + ' : ' + item.primarykey + ' - ' + item.apsvName;
                           break;
                     }
                  }
               });
            }
            return data;
         default:
            return data;
      }
   };

   /* Process Facets */
   this.processFacets = function (repo, facets) {
      facets.forEach(function (facet) {
         facet.label = $translate.instant('special.facet.' + facet.id);
         if (facet.id.toLowerCase() === 'city') {
            var newFacetNodes = [];
            facet.FacetNodes.forEach(function (facetNode) {
               facetNode.value = facetNode.value.toLowerCase();
               if (newFacetNodes.filter(function (e) {
                  return e.value === facetNode.value;
               }).length === 0) {
                  var newFacetNode = {
                     value: facetNode.value,
                     label: facetNode.value + ' (' + facetNode.count + ')'
                  };
                  newFacetNodes.push(newFacetNode);
               }
            });
            facet.FacetNodes = newFacetNodes;
         } else {
            facet.FacetNodes.forEach(function (facetNode) {
               if (!facetNode.hasOwnProperty('label')) {

                  switch (facet.id.toLowerCase()) {
                     case 'statustype':
                        switch (repo.toLowerCase()) {
                           case 'arsc':
                           case 'aret':
                           case 'arss':
                           case 'vaeh':
                           case 'apsv':
                           case 'icsd':
                           case 'crsb':
                           case 'icenh':
                           case 'kpet':
                           case 'sabs':
                              facetNode.label = facetNode.value === 'true' ? $translate.instant('global.active') : $translate.instant('global.inactive');
                              break;
                           default:
                              facetNode.label = $translate.instant('special.facet.' + repo + '.' + facet.id.toLowerCase() + '.' + facetNode.value);
                              break;
                        }
                        break;
                     case 'allowpofl':
                     case 'msdsfl':
                     case 'fulfillmentordfl':
                     case 'fulfillmenttiedfl':
                        facetNode.label = $.parseJSON(facetNode.value) ? $translate.instant('global.yes') : $translate.instant('global.no');
                        break;
                     case 'stagecd':
                     case 'transtype':
                     case 'transcd':
                     case 'freqtype':
                     case 'ordertype':
                     case 'statuscd':
                     case 'kittype':
                     case 'nonstockty':
                        facetNode.label = $translate.instant('special.facet.' + repo + '.' + facet.id.toLowerCase() + '.' + facetNode.value);
                        break;
                     case 'qtyavailagg':
                        facetNode.label = facetNode.value === 'true' ? $translate.instant('global.quantity.available') : $translate.instant('global.zero.neg.qty');
                        break;
                     case 'rectype':
                        switch (repo.toLowerCase()) {
                           case 'icsp':
                           case 'contacts':
                              facetNode.label = $translate.instant('global.repository.' + facetNode.value.toLowerCase());
                              break;
                           case 'icsw':
                           case 'icsec':
                           case 'icenh':
                              facetNode.label = $translate.instant('special.facet.icsw.' + facet.id.toLowerCase() + '.' + facetNode.value.toLowerCase());
                              break;
                           case 'units':
                              facetNode.label = $translate.instant('special.facet.units.' + facetNode.value.toLowerCase());
                              break;
                           default:
                              facetNode.label = facetNode.value;
                              break;
                        }
                        break;
                     default:
                        facetNode.label = facetNode.value;
                        break;
                  }
               }
               facetNode.label = facetNode.label + ' (' + facetNode.count + ')';
            });
         }

      });
      return facets;
   };

   // Cleanse the facetCriteria object sent into Elastic and remove any null values from arrays.
   // If an array has no values after cleansing don't sent it at all - Get Exact calls.
   // An otional lookupParam can also be set (for getrecordbyvalue calls).
   // This triggers additional checking to ensure that for a get exact call, the data is present and valid.
   // This should reduce calls a little by bypassing the getexact call if the data is missing or invalid.
   this.cleanseFacetCriteria = function (facetCriteria, lookupParam) {
      var returnFacetCriteria = {};
      if (typeof facetCriteria === 'object') {
         Object.keys(facetCriteria).forEach(function (key) {
            var thisAdded = false;
            facetCriteria[key].forEach(function (item) {
               var bDoThis = item !== null;
               if (bDoThis && key === 'primarykey') {
                  bDoThis = item !== '0';
                  if (lookupParam && lookupParam.toLowerCase() === 'contacts') {
                     item = item.toString();
                  }
               }
               if (bDoThis) {
                  if (!thisAdded) {
                     returnFacetCriteria[key] = [];
                     thisAdded = true;
                  }
                  returnFacetCriteria[key].push(item);
               }
            });
         });

         if (lookupParam) {

            var field1 = '';
            var field2 = '';


            switch (lookupParam.toLowerCase()) {
               case 'arsc':
                  field1 = 'custno';
                  break;
               case 'apsv':
                  field1 = 'vendno';
                  break;
               case 'crsb':
                  field1 = 'bankno';
                  break;
               case 'oeeh':
                  field1 = 'orderno';
                  field2 = 'ordersuf';
                  break;
               case 'poeh':
                  field1 = 'pono';
                  field2 = 'posuf';
                  break;
               case 'vaeh':
                  field1 = 'vano';
                  field2 = 'vasuf';
                  break;
               case 'wteh':
                  field1 = 'wtno';
                  field2 = 'wtsuf';
                  break;
               case 'invno':
                  field1 = 'invno';
                  field2 = 'invsuf';
                  break;
               case 'kpet':
                  field1 = 'wono';
                  field2 = 'wosuf';
                  break;
               case 'sasta':
                  field1 = 'codeval';
                  break;
               case 'sabs':
                  field1 = 'batchnm';
                  break;
               case 'icsl':
                  field1 = 'prodline';
                  break;
               case 'icsw':
                  field1 = 'prod';
                  break;
               case 'icsd':
                  field1 = 'whse';
                  break;
               case 'apss':
                  field1 = 'vendno';
                  field2 = 'shipfmno';
                  break;
               case 'arss':
                  field1 = 'custno';
                  field2 = 'shipto';
                  break;
               case 'sasgt':
                  field1 = 'tariffcd';
                  break;
               case 'units':
                  field1 = 'units';
                  break;
               case 'items':
                  field1 = 'abs_num';
                  break;
               case 'whmst':
                  field1 = 'wh_num';
                  break;
               case 'contacts':
                  field1 = 'primarykey';
                  break;
            }

            switch (lookupParam.toLowerCase()) {
               case 'sasta':
               case 'sabs':
               case 'icsl':
               case 'icsd':
               case 'icsw':
               case 'sasgt':
               case 'units':
               case 'items':
               case 'whmst':
                  if (returnFacetCriteria[field1] && Array.isArray(returnFacetCriteria[field1]) && returnFacetCriteria[field1].length === 1) {
                     if (returnFacetCriteria[field1][0] !== '') {
                        return returnFacetCriteria;
                     }
                  }
                  return null;
                  break;
               case 'arsc':
               case 'apsv':
               case 'crsb':
                  if (returnFacetCriteria[field1] && Array.isArray(returnFacetCriteria[field1]) && returnFacetCriteria[field1].length === 1) {
                     if (!isNaN(returnFacetCriteria[field1][0]) && returnFacetCriteria[field1][0] > 0) {
                        return returnFacetCriteria;
                     }
                  }
                  return null;
                  break;
               case 'oeeh':
               case 'poeh':
               case 'vaeh':
               case 'wteh':
               case 'invno':
               case 'kpet':
                  if (returnFacetCriteria[field1] && Array.isArray(returnFacetCriteria[field1]) && returnFacetCriteria[field1].length === 1) {
                     if (!isNaN(returnFacetCriteria[field1][0]) && returnFacetCriteria[field1][0] > 0) {
                        if (!returnFacetCriteria[field2] || !Array.isArray(returnFacetCriteria[field2]) || returnFacetCriteria[field2].length === 0) {
                           returnFacetCriteria[field2] = [];
                           returnFacetCriteria[field2].push(0);
                        }
                        return returnFacetCriteria;
                     }
                  }
                  return null;
                  break;
               case 'apss':
                  if (returnFacetCriteria[field1] && Array.isArray(returnFacetCriteria[field1]) && returnFacetCriteria[field1].length === 1) {
                     if (!isNaN(returnFacetCriteria[field1][0]) && returnFacetCriteria[field1][0] > 0) {
                        if (returnFacetCriteria[field2] && Array.isArray(returnFacetCriteria[field2]) && returnFacetCriteria[field2].length === 1) {
                           if (!isNaN(returnFacetCriteria[field2][0]) && returnFacetCriteria[field2][0] > 0) {
                              return returnFacetCriteria;
                           }
                        }
                     }
                  }
                  return null;
                  break;
               case 'arss':
                  if (returnFacetCriteria[field1] && Array.isArray(returnFacetCriteria[field1]) && returnFacetCriteria[field1].length === 1) {
                     if (!isNaN(returnFacetCriteria[field1][0]) && returnFacetCriteria[field1][0] > 0) {
                        if (returnFacetCriteria[field2] && Array.isArray(returnFacetCriteria[field2]) && returnFacetCriteria[field2].length === 1) {
                           if (returnFacetCriteria[field2][0] !== '') {
                              return returnFacetCriteria;
                           }
                        }
                     }
                  }
                  return null;
                  break;
               default:
                  break;
            }
         }

         return returnFacetCriteria;
      } else {
         return facetCriteria;
      }
   };


   // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
   // by minimizing calls to random()
   this.uuidFast = function () {
      var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var chars = CHARS, uuid = new Array(36), rnd = 0, r;
      for (var i = 0; i < 36; i++) {
         if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid[i] = '-';
         } else if (i === 14) {
            uuid[i] = '4';
         } else {
            if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
         }
      }
      return uuid.join('');
   };

   this.checkForUpperOrLower = function(fieldName, array) {
      var returnVal = [];
      array.forEach(function(singleValue) {
         switch (fieldName.toLowerCase()) {
         case 'units':
         case 'categorylist':
         case 'freqtype':
         case 'approvty':
         case 'transtype':
         case 'takenby':
         case 'ordertype':
         case 'statuscd':
         case 'pricetype':
         case 'prodcat':
         case 'countryoforigin':
         case 'brandcode':
         case 'prodtiergrp':
         case 'buyer':
         case 'rectype':
         case 'prodline':
         case 'slsrepin':
         case 'slsrepout':
         case 'state':
         case 'countrycd':
         case 'wh_num':
         case 'whse':
         case 'zipcd':
         case 'kittype':
         case 'nonstockty':
         case 'statustype':
         case 'unitbuy':
         case 'unitstock':
            returnVal.push(singleValue.toUpperCase());
            break;
         default:
            returnVal.push(singleValue);
         }
      });
      return returnVal;
   };

   this.checkForTranslate = function (field, value) {
      switch (field.toLowerCase()) {
         case 'custno':
         case 'vendno':
         case 'invno':
         case 'invsuf':
         case 'cono':
         case 'bankno':
         case 'shipfmno':
         case 'stagecd':
            if (Number(value)) {
               return Number(value);
            } else {
               return 0;
            }
         default:
            return value;
      }
   }



   /* Private methods */



   function getSeparator(url) {
      return (url.indexOf('?') < 0) ? '?' : '&';
   }

});
