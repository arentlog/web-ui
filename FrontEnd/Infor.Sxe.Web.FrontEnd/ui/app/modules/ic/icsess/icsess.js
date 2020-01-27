'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsess',
      dataPath: 'api/ic/icsess',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsess/geticsesslist',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { rectype: 'CR' },
      detailSubTitle: [
         { label: null, value: 'vendno' },
         { label: null, value: 'rectype' },
         { label: 'global.position', value: 'position' },
         { label: 'global.data', value: 'data' }
      ],
      recentlyVisited: {
         title: { label: 'global.vendor', value: 'vendno' },
         description: [
            { label: '', value: 'rectype' },
            { label: 'global.position', value: 'position' },
            { label: 'global.data', value: 'data' }
         ]
      }
   });
});

app.service('IcsessService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendCreateController = function (self, base, icsess, scope) {
      // Drop down default
      icsess.rectype = 'CR';
   };
});