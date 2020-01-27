'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'saet',
      dataPath: 'api/shared/triggersetup',
      searchMethod: 'POST',
      searchPath: 'api/shared/triggersetup/getlistbyname',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: 'global.trigger.name', value: 'triggername' }
      ],
      recentlyVisited: {
         title: { label: 'global.trigger.name', value: 'triggername' },
         description: { label: '', value: 'shortdesc' }
      }
   });
});
