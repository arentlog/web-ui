'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsl',
      dataPath: 'api/ar/arsl',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arslload',
      resultsRowIdField: 'arslrowid',
      detailSubTitle: [
         {label: null, value: 'lockboxno'}
      ],
      recentlyVisited: {
         title: {label: 'global.lock.box.number', value: 'lockboxno'},
         description: {label: 'global.customer', value: 'custno'}
      }
   });
});
