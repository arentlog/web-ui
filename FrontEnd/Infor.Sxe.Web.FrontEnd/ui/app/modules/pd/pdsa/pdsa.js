'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pd',
      menuFn: 'pdsa',
      dataPath: 'api/pd/pdsa',
      recordName: 'pdsa',
      searchMethod: 'POST',
      searchPath: 'api/pd/aspdsetup/pdsaload',
      searchResultsField: '',
      resultsRowIdField: 'pdsarowid',
      searchCriteria: { autotype: '', action: 'Search' },
      recentlyVisited: null
   });
});

app.service('PdsaService', function ($state, DataService, GridService) {

   this.extendBaseController = function (self, base, pdsa) {
      base.isLoadNextRecord = true;

      self.getPdsaRecord = function (actionParam) {
         var pdsaloadcriteria = { autotype: self.criteria.autotype, action: actionParam };
         DataService.post('api/pd/aspdsetup/pdsaload', { data: pdsaloadcriteria, busy: true }, function (data) {
            if (data) {
               self.dataset = data;
               var topRecord = data[0];
               self.criteria.autotype = topRecord.autotype;
               $state.go('pdsa.detail', { id: topRecord.pdsarowid });
            }
         });
      };
   };

   this.extendMasterController = function (self, base, pdsa) {

      self.next = function () {
         base.getPdsaRecord('next');
      };

      self.previous = function () {
         base.getPdsaRecord('prev');
      };

      self.selectRow = function () {
         self.lineSelectedRecord = GridService.getSelectedRecord(base.grid);
         base.criteria.autotype = self.lineSelectedRecord.autotype;
      };
   };

   this.extendCreateController = function (self, base, pdsa) {
      pdsa.pricety = 'n';
      pdsa.listty = 'n';
      pdsa.stndty = 'n';
      pdsa.costty = 'n';
      pdsa.priceonty = 'b';
      pdsa.addtype = 'n';

      self.customSubmit = function () {
         DataService.post('api/pd/pdsa', { data: pdsa, busy: true }, function (data) {
            if (data) {
               base.search();
               $state.go('pdsa.master');
            }
         });
      };
   };

   this.extendDetailController = function (self, base, pdsa) {

      pdsa.$promise.then(function () {
         base.criteria.autotype = pdsa.autotype;
      });

      self.customSubmit = function () {
         self.submit();
         if (base.criteria.isLoadNextRecord) {
            base.getPdsaRecord('next');
         }
      };
   };

});
