'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'rs',
      menuFn: 'rsad',
      dataPath: 'api/rs/rsad',
      searchMethod: 'POST',
      searchPath: 'api/rs/asrssetup/rsadload',
      searchResultsField: '',
      resultsRowIdField: 'rsadrowid',
      searchCriteria: { cProc: '' },
      detailSubTitle: [
         { label: 'global.procedure', value: 'procmatch' }
      ],
      recentlyVisited: {
         title: { label: 'global.procedure', value: 'procmatch' }
      }
   });
});
