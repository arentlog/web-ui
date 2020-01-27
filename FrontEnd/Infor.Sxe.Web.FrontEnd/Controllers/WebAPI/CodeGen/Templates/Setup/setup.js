'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'xx',
      menuFn: 'xxxx',
      dataPath: 'api/xx/xxxx',
      searchMethod: 'SEARCH_METHOD',
      searchPath: 'SEARCH_PATH',
      searchResultsField: 'SEARCH_RESULTS_FIELD',
      resultsRowIdField: 'RESULTS_ROW_ID_FIELD',
      primaryKeyParams: ['KEY_FIELD'],
      detailSubTitle: [
         {label: null, value: 'KEY_FIELD'}
      ],
      recentlyVisited: null
   });
});
