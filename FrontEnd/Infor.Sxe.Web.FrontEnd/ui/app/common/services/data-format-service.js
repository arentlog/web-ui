'use strict';

/**
 * Service for data format logic (masks, etc.)
 */
app.service('DataFormatService', function DataFormatService() {

   /**
    * Build numeric mask with the given properties
    * @param sign: '+', '-', or either
    * @param digits: max digits before decimal point allowed
    * @param decimals: max decimals allowed
    */
   this.getNumericMask = function (sign, digits, decimals) {
      var mask = '';

      // TODO: include number formatting based on user's locale

      if (digits) {
         var i;

         // Sign
         if (!sign) {
            // Allows pos or neg
            mask += '-';
         } else if (sign === '-') {
            // TODO: figure out negative only mask
            mask += '-';
         }

         // Digits
         for (i = 1; i <= digits; i++) {
            mask += '#';
         }

         // Decimals
         if (decimals && decimals !== '0') {
            mask += '.';

            for (i = 1; i <= decimals; i++) {
               mask += '0';
            }
         }
      }

      return mask;
   };

});
