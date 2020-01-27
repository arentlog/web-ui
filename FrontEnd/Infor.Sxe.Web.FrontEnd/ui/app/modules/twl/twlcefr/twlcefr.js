'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcefr',
      dataPath: 'api/twl/fileretent',
      searchMethod: 'POST',
      searchPath: 'api/twl/fileretent/gettwlfileretentions',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlcefrService', function ($state, MessageService, Utils) {
   this.extendBaseController = function (self) {
      self.refreshSearch = false;
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);
      };
   };

   this.extendDetailController = function (self, base, twlcefr) {

      self.getSubTitle = function () {
         return MessageService.get('global.name') + ': ' + twlcefr.fileName;
      };
   };
});