'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('JobLookupModalCtrl', function ($scope, DataService, GridService, MessageService, Utils) {
   var self = this;
   var lkup = $scope.lkup;

   // Initialize modal criteria
   self.initializeCriteria = function (isClear) {
      // Single search field for the standard lookup modal
      self.searchTerm = '';

      self.stageCodes = [
         { label: MessageService.get('global.all'), value: '' },
         { label: MessageService.get('global.entered'), value: '1' },
         { label: MessageService.get('global.released'), value: '6' },
         { label: MessageService.get('global.closed'), value: '8' },
         { label: MessageService.get('global.cancelled'), value: '9' }
      ];

      // Get current search criteria/params defined on the lookup field
      self.criteria = lkup.getSearchCriteria();

      //self.criteria.dropDateToDisplay = new Date();
      //self.criteria.dropDateFromDisplay = self.criteria.dropDateToDisplay - 7;

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
