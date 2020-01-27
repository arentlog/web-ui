'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsa',
      dataPath: 'api/ar/arsa',
      searchMethod: 'GET',
      searchPath: 'api/ar/asarsetup/arsasearch/{pvCustno}',
      searchResultsField: '',
      resultsRowIdField: 'arsarowid',
      recentlyVisited: {
         title: { label: 'global.customer.number', value: 'custno' }
      }
   });
});

app.service('ArsaService', function (DataService) {

   this.extendBaseController = function (self) {
      // Perform search and update data set for the grid
      self.search = function (isRefresh) {

         // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
         // for more than just searching, and we need the used criteria (not the latest which the user might change)
         self.criteriaUsed = angular.copy(self.criteria);

         var custno = self.criteria.pvCustno ? self.criteria.pvCustno : 0;

         DataService.get('api/ar/asarsetup/arsasearch/' + parseFloat(custno), { busy: true }, function (data) {
            if (data) {
               self.dataset = data;
            }
         });
      };
   };
});
