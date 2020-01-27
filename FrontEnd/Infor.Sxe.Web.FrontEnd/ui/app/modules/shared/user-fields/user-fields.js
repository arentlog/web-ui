'use strict';

/**
 * Directive for displaying user fields.
 */
app.directive('userFields', function userFields($compile, DataService, MessageService, Utils, CacheService) {

   var majorBucket = 'M';

   return {
      restrict: 'E',
      scope: true,
      controllerAs: 'uf',
      controller: function () {
         var self = this;

         // Validator for user field 6 and 7
         self.validateNumber = function (value, min, max) {
            if (value !== null && value >= min && value <= max) {
               return true;
            } else {
               return MessageService.get('message.invalid.value.value.must.be.between', { min: min, max: max });
            }
         };

         // Validator for drop downs
         self.validateDropDown = function (value, options) {
            if (value !== null && options.indexOf(value) >= 0) {
               return true;
            } else {
               return MessageService.get('message.invalid.entry');
            }
         };
      },
      link: function (scope, element, attrs) {
         var options = JSON.parse(attrs.options);
         var criteria = {
            tablename: options.tableName
         };
         var udfResults = CacheService.get(false, majorBucket, 'UDF', options.tableName);
         if (!udfResults) {
            DataService.post('api/shared/assharedinquiry/getuserfieldsmetadata', { data: criteria }, function (udfResults) {
               CacheService.set(false, majorBucket, 'UDF', options.tableName, udfResults, 240);
               processResults(udfResults, scope, element, options);
            });
         } else {
            processResults(udfResults, scope, element, options);
         }
      }
   };

   function processResults(udfResults, scope, element, options) {
      var $element = $(element);
      var html = '<div class="row" initialize><div class="six columns">';

      // Build form fields
      var halfWayPoint = udfResults.length / 2;
      var secondColumnOpened = false;

      for (var i = 0; i < udfResults.length; i++) {
         var field = udfResults[i];
         var id = field.fieldname + '-' + Utils.getTransientId(); // ensure unique html id by using a transient id
         var label = Utils.escapeHtml(field.fieldlabel);
         var cssClass = '';
         var ngModel = options.objectRef + '.' + field.fieldname;
         var validationList = field.fieldvalidvalues.split(",");
         var maxlength = 0;
         var mask = '';
         var userFieldNumber = field.fieldname.substr(4);
         var isDropDown = (userFieldNumber <= 5 || userFieldNumber > 9) && field.fieldvalidvalues ? true : false;
         var isRequired = false;
         var isNumValidation = (userFieldNumber >= 6 && userFieldNumber <= 7) && (field.numbermin || field.numbermax);

         // Drop down is required if validation list does not have an empty option in the list of valid options.
         // Drop down validation will occur automatically via the form submission validation as long as the
         // user fields view is loaded on the screen (need to turn off lazy loading if in a tab).
         if (isDropDown && validationList.indexOf('') < 0) {
            isRequired = true;
         }

         // CSS classes
         if (userFieldNumber >= 8 && userFieldNumber <= 9) {
            cssClass += 'datepicker';
         }

         // get mask or maxlength
         if (userFieldNumber <= 5 || userFieldNumber > 9) {
            var isMasked = false;
            for (var j = 0; j < validationList.length; j++) {
               var validation = validationList[j];
               if (validation.length >= 1) {
                  mask += isMasked ? (',' + validationList[j]) : validationList[j];
                  isMasked = true;
               }
            }

            if (field.fieldmaxlength) {
               maxlength = field.fieldmaxlength;
            }
         }

         // HTML
         html += '<div class="field">';
         html += '<label class="' + ((isRequired || isNumValidation) ? 'required' : '') + '" for="' + id + '">' + label + '</label>';

         if (isDropDown) {
            html += '<select id="' + id + '" class="dropdown" ng-model="' + ngModel + '" ';

            // Add dropdown directive and case insensitive flag
            html += ' dropdown ';
            html += ' data-case-insensitive ';
         } else {
            html += '<input type="text" id="' + id + '" class="' + cssClass + '" ng-model="' + ngModel + '" autocomplete="off" ';
         }

         if (options['eventChangeUser' + userFieldNumber]) {
            html += ' ng-change="' + options['eventChangeUser' + userFieldNumber] + '" ';
            //By design, we are only firing the event on Blur.  We don't want it to fire for each character
            //Because of an incompatibility with the SoHo mask and the 'updateOn' option, we have to add a
            //'debounce' option of 1 ms so that the angular update is slightly delayed and receives the
            //correct model value.
            if (!isDropDown) {
               html += ' ng-model-options=\'' + '{"updateOn": "blur", "debounce": 1}' + '\' ';
            }
         }

         // Add needed attributes/directives for date fields
         if (userFieldNumber >= 8 && userFieldNumber <= 9) {
            html += ' field-format="DATE" date ';
            if (field.datemin || field.datemax) {
               var minDate = field.datemin ? Utils.addSubtractDaysToDate(field.datemin, -1) : '';
               var maxDate = field.datemax ? Utils.addSubtractDaysToDate(field.datemax, 1) : '';
               minDate = Utils.formatDate(minDate);
               maxDate = Utils.formatDate(maxDate);
               html += ' data-options=\'{"disable":{"minDate": "' + minDate + '", "maxDate": "' + maxDate + '", "dayOfWeek": [], "dates": []}}\' ';
            }

         } else if (userFieldNumber >= 6 && userFieldNumber <= 7) {
            // Formatting in the Progress schema for USER6 and USER7: zzzzzzzz9.99999-
            html += ' field-format="DECIMAL" data-digits="9" data-decimals="5" data-format-options=\'{"minimumFractionDigits": 5, "maximumFractionDigits": 5}\' ';
         }

         // Readonly condition (drop downs use a custom attribute)
         if (options.conditionReadonly) {
            if (isDropDown) {
               html += ' data-is-readonly="' + options.conditionReadonly + '" ';
            } else {
               html += ' ng-readonly="' + options.conditionReadonly + '" ';
            }
         }

         // Add numeric min/max validation
         if (isNumValidation) {
            html += ' data-validate="custom-rule" ';
            html += ' data-custom-validation="uf.validateNumber(' + ngModel + ', ' + field.numbermin + ', ' + field.numbermax + ')" ';
         }

         // Add required validation
         if (isRequired) {
            if (isDropDown) {
               html += ' data-validate="custom-rule" ';
               html += ' data-custom-validation="uf.validateDropDown(' + ngModel + ', ['; //have to add list dynamically as the "toString" doesn't use quotes
               for (var k = 0; k < validationList.length; k++) {
                  html += "'" + validationList[k] + "'"; //need to use single quotes to avoid HTML syntax errors
                  if (k !== validationList.length - 1) { //don't add a comma at the end
                     html += ', ';
                  }
               }
               html += "])\"";
            } else {
               html += ' data-validate="required" ';
            }
         }

         // Mask and maxlength - maxlength is useless if there is a mask
         // Mask is like a limited list of items a user can enter
         if (mask) {
            html += ' data-mask data-options=\'{"pattern": "' + mask + '"}\' ';
         } else if (maxlength) {
            html += ' maxlength="' + maxlength + '" ';
         }

         // Add drop down options
         if (isDropDown) {
            html += '>';
            for (var l = 0; l < validationList.length; l++) {
               var value = validationList[l];

               // *** Important! *** We are implementing drop down options to function in a case-insensitive way by manipulating
               //                    values in the options list to act like lowercase (but remembering the actual value via
               //                    the 'data-actual-value' attr)
               html += '<option value="' + value.toLowerCase() + '" data-actual-value="' + value + '">' + value + '</option>';
            }
            html += '</select>';
         } else {
            html += ' />';
         }

         // Close field
         html += '</div>';

         if (i + 1 >= halfWayPoint && !secondColumnOpened) {
            html += '</div><div class="six columns">';
            secondColumnOpened = true;
         }
      }
      html += '</div></div>';

      // Add fields to view and tell angular to compile it
      $element.html(html);
      $compile($element.contents())(scope.$new());
   }
});
