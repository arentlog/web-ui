'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sapq',
      dataPath: 'api/pv/pvsapbq',
      searchMethod: 'POST',
      searchPath: 'api/pv/pvsapbq/listbyqueuename',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: null, value: 'queueName' }
      ],
      recentlyVisited: {
         title: { label: 'global.queue', value: 'queueName' },
         description: { label: 'global.description', value: 'description' }
      }
   });
});
