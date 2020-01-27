'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'etx',
      menuFn: 'etxir',
      dataPath: 'api/etx/etxir',
      searchMethod: 'POST',
      searchPath: 'api/ptx/asptxentry/ptxgetroutingruleinquiry',
      searchResultsField: '',
      resultsRowIdField: 'ptxrouterulerowid',
      recentlyVisited: null
   });
});
