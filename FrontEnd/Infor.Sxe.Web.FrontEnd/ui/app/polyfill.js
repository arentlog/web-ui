'use strict';

/**
 * This polyfill file adds implementations of newer javascript functionality that may not exist yet in older browsers.
 * By doing this, we can confidently use functions that we want, even if the user is on IE or another older browser.
 * The below implementations were obtained from http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
 */

// String - repeat
if (!String.prototype.repeat) {
   String.prototype.repeat = function (count) {
      'use strict';
      if (this == null) {
         throw new TypeError('can\'t convert ' + this + ' to object');
      }
      var str = '' + this;
      count = +count;
      if (count != count) {
         count = 0;
      }
      if (count < 0) {
         throw new RangeError('repeat count must be non-negative');
      }
      if (count == Infinity) {
         throw new RangeError('repeat count must be less than infinity');
      }
      count = Math.floor(count);
      if (str.length == 0 || count == 0) {
         return '';
      }
      // Ensuring count is a 31-bit integer allows us to heavily optimize the
      // main part. But anyway, most current (August 2014) browsers can't handle
      // strings 1 << 28 chars or longer, so:
      if (str.length * count >= 1 << 28) {
         throw new RangeError('repeat count must not overflow maximum string size');
      }
      var rpt = '';
      for (; ;) {
         if ((count & 1) == 1) {
            rpt += str;
         }
         count >>>= 1;
         if (count == 0) {
            break;
         }
         str += str;
      }
      // Could we try:
      // return Array(count + 1).join(this);
      return rpt;
   }
}

// String - startsWith
if (!String.prototype.startsWith) {
   String.prototype.startsWith = function (searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
   };
}

// String - endsWith
if (!String.prototype.endsWith) {
   String.prototype.endsWith = function (searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
         position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
   };
}

// String - includes
if (!String.prototype.includes) {
   String.prototype.includes = function (search, start) {
      'use strict';
      if (typeof start !== 'number') {
         start = 0;
      }

      if (start + search.length > this.length) {
         return false;
      } else {
         return this.indexOf(search, start) !== -1;
      }
   };
}

// Array - includes
if (!Array.prototype.includes) {
   Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {

         if (this == null) {
            throw new TypeError('"this" is null or not defined');
         }

         // 1. Let O be ? ToObject(this value).
         var o = Object(this);

         // 2. Let len be ? ToLength(? Get(O, "length")).
         var len = o.length >>> 0;

         // 3. If len is 0, return false.
         if (len === 0) {
            return false;
         }

         // 4. Let n be ? ToInteger(fromIndex).
         //    (If fromIndex is undefined, this step produces the value 0.)
         var n = fromIndex | 0;

         // 5. If n ≥ 0, then
         //  a. Let k be n.
         // 6. Else n < 0,
         //  a. Let k be len + n.
         //  b. If k < 0, let k be 0.
         var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

         function sameValueZero(x, y) {
            return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
         }

         // 7. Repeat, while k < len
         while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            if (sameValueZero(o[k], searchElement)) {
               return true;
            }
            // c. Increase k by 1.
            k++;
         }

         // 8. Return false
         return false;
      }
   });
}

// Array - find
if (!Array.prototype.find) {
   Array.prototype.find = function (predicate) {
      if (this == null) {
         throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
         throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
         value = list[i];
         if (predicate.call(thisArg, value, i, list)) {
            return value;
         }
      }
      return undefined;
   };
}

// Array - findIndex
if (!Array.prototype.findIndex) {
   Array.prototype.findIndex = function (predicate) {
      if (this === null) {
         throw new TypeError('Array.prototype.findIndex called on null or undefined');
      }
      if (typeof predicate !== 'function') {
         throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
         value = list[i];
         if (predicate.call(thisArg, value, i, list)) {
            return i;
         }
      }
      return -1;
   };
}

// Number - isInteger
if (!Number.isInteger) {
   Number.isInteger = function (value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
   };
}