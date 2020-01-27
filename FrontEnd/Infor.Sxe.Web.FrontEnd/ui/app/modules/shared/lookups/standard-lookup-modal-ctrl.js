'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('StandardLookupModalCtrl', function ($scope, Utils) {
   var self = this;
   var lkup = $scope.lkup;

   // Initialize modal criteria
   self.initializeCriteria = function (isClear) {
      // Single search field for the standard lookup modal
      self.searchTerm = '';

      // Get current search criteria/params defined on the lookup field
      self.criteria = lkup.getSearchCriteria();

      if (!isClear) {
         var searchParamValueField = lkup.options.searchParamValueField;
         var value = lkup.getInitialSearchValue();

         // Populate search field with initial value (from user typing into lookup field)
         if (searchParamValueField && (value || value === 0)) {
            Utils.setNestedValue(self.criteria, searchParamValueField, value);
         }
      }
   };

   // Perform reset/clear
   self.clear = function () {
      self.initializeCriteria(true);
   };

   // Perform search
   self.search = function () {
      var criteria;

      // If using a searchCriteriaFunction, then need to build criteria fresh before each search (passing fresh info)
      if (lkup.options.searchCriteriaFunction) {
         criteria = lkup.getSearchCriteriaFromFunction(self.criteria, self.searchTerm, 'lookup');
      } else {
         criteria = self.criteria;
      }

      lkup.search(criteria, self.searchTerm, function (results) {
         self.dataset = results;
      });
   };

   // Initialize
   self.initializeCriteria(false);
});
