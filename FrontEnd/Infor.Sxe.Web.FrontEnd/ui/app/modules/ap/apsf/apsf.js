'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ap',
      menuFn: 'apsf',
      dataPath: 'api/ap/apsf',
      searchMethod: 'POST',
      searchPath: 'api/ap/apsf/getapsflistbytaxdetails',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: null, value: 'taxyear' }
      ],
      recentlyVisited: {
         title: { label: 'global.tax.year', value: 'taxyear' },
         description: { label: 'global.federal.tax.id.number', value: 'fedtaxid' }
      }
   });
});

app.service('ApsfService', function ($state, DataService, GridService, MessageService, Utils) {

   this.extendCreateController = function (self, base, apsf) {

      // Set initial values when creating new Tax Year
      apsf.foreignentityfl = false;
      apsf.testfilefl = false;

   };

   this.extendDetailController = function (self, base, apsf) {
      apsf.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (apsf.contact === 'GDPR Restricted Data' || apsf.contact === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }
      });

   };

});
