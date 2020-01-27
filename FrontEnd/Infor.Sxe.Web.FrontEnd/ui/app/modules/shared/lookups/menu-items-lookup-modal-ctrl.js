'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('MenuItemsLookupModalCtrl', function ($scope, DataService, GridService, MessageService, Utils) { //as lkupmdl
   var self = this;
   var lkup = $scope.lkup;

   // Load record type options
   DataService.post('api/pv/pvsassmtypes/getallpvsassmtypeslist', { data: {}, busy: true }, function (data) {
      self.recordTypes = data;
   });

   // Initialize modal criteria
   self.initializeCriteria = function (isClear) {
      // Single search field for the standard lookup modal
      self.searchTerm = '';

      // Get current search criteria/params defined on the lookup field
      self.criteria = lkup.getSearchCriteria();
      self.criteria.batchsize = self.criteria.MaxResults;

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