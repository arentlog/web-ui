'use strict';

/**
 * Controller for the modal content of IES lookups.
 *
 * Alias: lkupmdl
 */
app.controller('IesLookupModalCtrl', function ($scope, ConfigService) {
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

   self.facetCollapsed = true;

   self.defaultSearchExists = false;

   self.specialFacet = '';

   self.getFacetCollapsed = function () {
      return self.facetCollapsed;
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
});

/**
 * Directive for the IES Facet Search
 *
 * Note: We include this directive in all IES lookup modals so that we can easily change it once for all IES lookups
 */
app.directive('iesFacetSearch', function iesFacetSearch($compile, JsonViewService) {

   return {
      restrict: 'E',
      scope: true,
      controllerAs: 'ifs',
      controller: function () {
         // We may be able to move the ies facet code to here instead of having it in the main lookup directive
      },
      link: function (scope, element) {
         var $element = $(element);

         var json = {
            id: 1,
            type: 'EXP_AREA',
            label: 'global.facet.search',
            eventCollapse: 'lkupmdl.collapse()',
            eventExpand: 'lkupmdl.expand()', 
            conditionCollapsed: "lkupmdl.getFacetCollapsed()",
            children: [
               {
                  id: 2,
                  type: 'CUSTOM',
                  subType: 'AdvancedSearch',
                  conditionInclude: 'lkupmdl.showAdvancedCriteria()', // wait to include this control until have search data
                  options: {
                     criteria: 'lkupmdl.advCriteria',
                     criteriaList: 'lkupmdl.criteriaList()',
                     criteriaView: 'lkupmdl.advancedCriteria()',
                     defaultSelectedCriteria: 'lkupmdl.defaultSelectedCriteria',
                     searchFunction: 'lkupmdl.search()',
                     storageKey: 'lkupmdl.storageKey()',
                     isForIES: true,
                     returnCriteriaForSave: 'lkupmdl.returnCriteriaForSave()',
                     setCriteriaFromSave: 'lkupmdl.setCriteriaFromSave()',
                     clearFunction: 'lkupmdl.clearFunction()',
                     showDefault: true
                  }
               }
            ]
         };

         var html = JsonViewService.convertToHtml(json);

         // Add html to DOM
         // Note: the extra divs are to avoid the odd style that soho applies to first-child and last-child expandable areas
         $element.html('<div></div>' + html + '<div></div>');

         // Tell Angular to compile it
         $compile($element.contents())(scope.$new());
      }
   };

});