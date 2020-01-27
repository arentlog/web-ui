'use strict';

/**
 * Directive for fetching option sets for drop downs and radio sets
 */
app.directive('optionSet', function optionSet($timeout, OptionApiService, OptionSetService, Utils) {

   return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
         var $element = $(element);
         var group = attrs.optionGroup;
         var key = attrs.optionSet;
         var optionsModel = 'optionList';

         // Dynamic codes from an API, or a Static Option Set
         if (attrs.type === 'CODES' && key) {
            OptionApiService.get(key, function (optionList) {
               applyOptionList($element, scope, optionsModel, optionList);
            });
         } else if (group && key) {
            OptionSetService.get(group, key, function (optionSet) {
               applyOptionList($element, scope, optionsModel, optionSet.children);
            });
         }
      }
   };

   // Private methods

   function applyOptionList($element, scope, optionsModel, list) {
      var dropDown = $element.data('dropdown');

      // Update model with list
      Utils.setNestedValue(scope, optionsModel, list);

      // If element is a drop-down that is already initialized, then we need to tell it to update
      // the list and the display value now that we have the option list (and delay until scope has applied).
      if (dropDown) {
         $timeout(function () {
            dropDown.updated();
         });
      }
   }

});
