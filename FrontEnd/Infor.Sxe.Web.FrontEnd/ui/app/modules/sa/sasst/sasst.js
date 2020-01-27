'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasst',
      dataPath: 'api/sa/sasst',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasst/getsasstlistbyzipcodequery',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: 'global.zip.code', value: 'zipcd' }
      ],
      recentlyVisited: {
         title: { label: 'global.zip.code', value: 'zipcd' }
      }
   });
});
