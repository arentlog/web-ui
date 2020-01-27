'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('ErrorMessageLookupModalCtrl', function ($scope, DataService, Utils, Sasc) {
   var self = this;
   var lkup = $scope.lkup;
   self.sasc = Sasc;

   // Manually build Language Drop Down
   DataService.get('api/shared/assharedentry/aosystemlanguageload', { busy: true }, function (data) {
      self.languageTypes = data.aosystemlanguage;
   });

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
      lkup.search(self.criteria, self.searchTerm, function (results) {
         self.dataset = results;
      });
   };

   // Initialize
   self.initializeCriteria(false);
});
