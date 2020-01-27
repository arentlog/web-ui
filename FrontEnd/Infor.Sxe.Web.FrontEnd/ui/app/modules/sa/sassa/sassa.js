'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sassa',
      dataPath: 'api/shared/authpoints',
      searchMethod: 'POST',
      searchPath: 'api/shared/authpoints/getauthorizationpoints',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { trmgrlang: '' },
      detailSubTitle: [
         { label: 'global.function', value: 'ourproc' },
         { label: 'global.screen', value: 'key1' },
         { label: 'global.field', value: 'key2' },
         { label: 'global.mode', value: 'mode' },
         { label: 'global.type', value: 'transtype' },
         { label: 'global.language', value: 'trmgrlang' }
      ],
      recentlyVisited: {
         title: { label: 'global.function', value: 'ourproc' },
         description: [
          { label: 'global.screen', value: 'key1' },
          { label: 'global.field', value: 'key2' },
          { label: 'global.mode', value: 'mode' },
          { label: 'global.type', value: 'transtype' },
          { label: 'global.language', value: 'trmgrlang' }
         ]
      }
   });
});

app.service('SassaService', function ($state, DataService, MessageService, Sasc) {
   this.extendSearchController = function (self, base) {
      // Manually build Language Drop Down
      DataService.get('api/shared/assharedentry/aosystemlanguageload', { busy: true }, function (data) {
         base.languageTypes = data.aosystemlanguage;
      });
   };
   this.extendBaseController = function (self) {
      self.sasc = Sasc;
   };
   this.extendCreateController = function (self, base, sassa) {
      sassa.key1 = '';
      sassa.key2 = '';
      sassa.mode = '';
      sassa.transtype = '';
      sassa.trmgrlang = '';
      sassa.standardty = 'a';
   };
});