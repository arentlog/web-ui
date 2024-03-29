'use strict';

/**
 * Serial Lookup controller for the modal content.
 *
 * Alias: lkupmdl
 */
app.controller('SerialLookupModalCtrl', function ($scope, Utils) {
   var self = this;
   var lkup = $scope.lkup;
   self.isWarehouseEnabled = true;
   self.isProductEnabled = true;
   self.isCurrStatusEnabled = true;

   // Initialize modal criteria
   self.initializeCriteria = function (isClear) {
      // Single search field for the standard lookup modal
      self.searchTerm = '';

      // Get current search criteria/params defined on the lookup field
      self.criteria = lkup.getSearchCriteria();

      if (self.criteria && self.criteria.ourproc) {
         if (self.criteria.ourproc.toLowerCase() === 'kpew') {
            self.isWarehouseEnabled = false;
            self.isProductEnabled = false;
            self.isCurrStatusEnabled = false;
         }
      }

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
      lkup.search(self.criteria, self.searchTerm, function (results) {
         self.dataset = results;
      });
   };

   // Initialize
   self.initializeCriteria(false);
});
