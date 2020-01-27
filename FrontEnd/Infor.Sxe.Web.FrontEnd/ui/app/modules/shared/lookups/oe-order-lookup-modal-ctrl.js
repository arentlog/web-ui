/*global _comma_separated_list_of_variables_*/
'use strict';

/**
 * Standard controller for the modal content of all simple lookups.
 *
 * Alias: lkupmdl
 */
app.controller('OEOrderLookupModalCtrl', function ($scope, Utils, AodataService, ConfigService) {
   var self = this;
   var lkup = $scope.lkup;

   // Initialize modal criteria
   self.initializeCriteria = function (isClear) {
      // Single search field for the standard lookup modal
      self.searchTerm = '';

      self.selectedCriteria = {};

      lkup.dataUri = '';

      // Get current search criteria/params defined on the lookup field
      self.criteria = lkup.getSearchCriteria();

      lkup.selectedCriteria = {};

      if (!isClear) {
         var value = lkup.getInitialSearchValue();

         // Populate search field with initial value (from user typing into lookup field)
         if (value || value === 0) {
            self.searchTerm = value;
         }
      }
   };

   self.isCollapseIf = function () {
      return self.collapseIf;
   };

   self.collapseIf = true;


   self.facetCollapsed = true;

   self.defaultSearchExists = false;

   self.specialFacet = '';

   self.getFacetCollapsed = function () {
      return self.facetCollapsed;
   };

   // Advanced search criteria object with no initial values
   self.advCriteria = {};

   self.criteriaList = function () {
      return lkup.criteriaList;
   };

   // List of default selected criteria fields
   self.defaultSelectedCriteria = [];

   self.advancedCriteria = function () {
      return lkup.dataUri;
   };

   self.showAdvancedCriteria = function () {
      if (lkup.dataUri) {
         return lkup.dataUri.length > 0;
      }
      return false;
   };

   self.expand = function () {
      if (!self.showAdvancedCriteria()) {
         self.facetCollapsed = false;
         self.search(null, self.defaultSearchExists, self.specialFacet);
      }
   };

   self.collapse = function () {
      self.facetCollapsed = true;
      self.defaultSearchExists = false;
   };

   self.storageKey = function () {
      return lkup.storageKey;
   };

   self.criteriaValues = function (code) {
      return lkup.criteriaValues[code];
   };

   self.selectedCriteria = {};

   // Perform reset/clear
   self.clear = function () {
      self.initializeCriteria(true);
   };

   self.returnCriteriaForSave = function () {
      return self.selectedCriteria;
   };

   self.setCriteriaFromSave = function (criteria) {
      self.selectedCriteria = criteria;
   };

   self.clearFunction = function () {
      self.selectedCriteria = {};
   };

   // Simple search
   self.search = function (callBack, wideOpenPopulate, specialFacet) {
      self.criteria.MaxResults = wideOpenPopulate ? 1 : ConfigService.getLookupMaxResults();
      lkup.selectedCriteria = self.selectedCriteria;
      lkup.overrideCriteria = specialFacet;
      lkup.search(self.criteria, self.searchTerm, function (results) {
         if (!wideOpenPopulate) {
            self.dataset = results;
            self.collapseIf = false;
         }
         if (callBack) {
            callBack();
         }
      });
   };

   // Initialize
   self.initializeCriteria(false);

   // Use Sales Whse turned on
   self.isAOSalesWhseOn = function () {
      var useSalesWhse = AodataService.getValue("OE", "OESalesWarehouse");
      return useSalesWhse.toLowerCase() === 'yes';
   };

   // OE Fulfillment is turned on
   self.isAOFulfillmentOn = function () {
      var useFulfillment = AodataService.getValue("OE", "OEOrderFulfillment");
      return useFulfillment.toLowerCase() === 'yes';
   };

});