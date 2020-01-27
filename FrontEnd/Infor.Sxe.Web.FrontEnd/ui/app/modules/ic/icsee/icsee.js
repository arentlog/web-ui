'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsee',
      dataPath: 'api/ic/icsee',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icseegetlist',
      searchResultsField: '',
      resultsRowIdField: 'icseerowid',
      primaryKeyParams: ['custno'],
      detailSubTitle: [
         { label: 'global.customer', value: 'custno' },
         { label: 'global.ship.to', value: 'shipto' },
         { label: 'global.product', value: 'prod' }
      ],
      recentlyVisited: {
         title: { label: 'global.customer', value: 'custno' },
         description: [
            { label: 'global.ship.to', value: 'shipto' },
            { label: 'global.product', value: 'prod' }
         ]
      }
   });
});

app.service('IcseeService', function () {

   this.extendCreateController = function (self, base, icsee) {

      icsee.shipto = '';

   };
});
