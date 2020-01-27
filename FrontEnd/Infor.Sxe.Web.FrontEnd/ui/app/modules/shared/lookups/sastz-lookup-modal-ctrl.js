'use strict';

app.controller('SastzLookupModalCtrl', function ($scope, Utils, DataService) {
   var self = this;
   var lkup = $scope.lkup;
   self.labels = null;

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

   //The Criteria payload specific to this particular 'CustomCall' backend call.
   var criteriaDataSet = {
      pdssastzsearchcriteria: {
         ttblsastzsearchcriteria: [{
            codeiden: self.criteria.codeiden,
            labelfl: true,
            primarykey: '',
            secondarykey: '',
         }]
      }
   }

   var labelCriteria = {
      cOperation: 'SASTZ ' + self.criteria.codeiden,
      custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
   };

   DataService.post('api/custom/ascustom/customcall', { data: labelCriteria, busy: true }, function (data) {
      if (data && data.length > 0) {
         //The 1st Row contains the criteria (and is discarded) and the 2nd row contains the results.
         var result = JSON.parse(data[1].data);
         if (result && result.pdssastzsearchresults) {
            self.labels = result.pdssastzsearchresults.ttblsastzsearchresults[0];
         } else {
            self.labels = [];
         }
      }
   });

});
