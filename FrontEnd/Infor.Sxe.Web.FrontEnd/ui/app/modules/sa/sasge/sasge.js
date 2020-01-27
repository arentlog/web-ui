'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasge',
      dataPath: 'api/sa/sasge',
      searchMethod: 'POST',
      searchPath: 'api/sa/assasetup/sasgesearch',
      searchResultsField: 'sasgesearchresults',
      resultsRowIdField: 'sasgerowid',
      detailSubTitle: [
         { label: 'global.customer', value: 'custno' },
         { label: 'global.ship.to', value: 'shipto' },
         { label: 'global.state', value: 'state' },
         { label: 'global.type', value: 'taxtype' }
      ],
      recentlyVisited: null
   });
});

app.service('SasgeService', function ($state, Constants, ConfigService, DataService, Utils) {

   this.extendBaseController = function (self) {

      DataService.get('api/sa/assasetup/sasgeinitialize', function (data) {
         if (data) {

            // The data loaded here in the base controller will be available throughout
            self.initResults = data;
         }
      });

   };

   this.extendCreateController = function (self) {

      // If the user did not enter anything in the character fields on the primary unique index
      // load with a blank because null will cause an error
      if (!self.sasge.shipto) {
         self.sasge.shipto = '';
      }

      if (!self.sasge.state) {
         self.sasge.state = '';
      }

      if (!self.sasge.taxtype) {
         self.sasge.taxtype = '';
      }
   };

});