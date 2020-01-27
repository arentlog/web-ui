'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('MassMaintenanceLookupModalCtrl', function ($scope, DataService, Utils) {
   var self = this;
   var lkup = $scope.lkup;
   self.ttblmmsetnamelookupcriteria = {
      setname: '',
      tablename: '',
   }
   
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
      self.ttblmmsetnamelookupcriteria.setname = '';
      self.ttblmmsetnamelookupcriteria.tablename = '';
      if (self.criteria) {
         if (self.criteria.setname) {
            self.ttblmmsetnamelookupcriteria.setname = self.criteria.setname
         }
         if (self.criteria.tablename) {
            self.ttblmmsetnamelookupcriteria.tablename = self.criteria.tablename
         }
      }

      var crit = {
         ttblmmsetnamelookupcriteria: self.ttblmmsetnamelookupcriteria
      };

      lkup.search(crit, self.searchTerm, function (results) {
         self.dataset = results;
      });
   };

   // Initialize
   self.initializeCriteria(false);
});
