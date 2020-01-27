'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sassp',
      dataPath: 'api/sa/sassp',
      searchMethod: 'POST',
      searchPath: 'api/sa/sassp/getsassplistbyareacode',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: 'global.area.code', value: 'areacd' }
      ],
      recentlyVisited: {
         title: { label: 'global.area.code', value: 'areacd' }
      }
   });
});
