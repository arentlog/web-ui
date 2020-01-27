'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcu',
      dataPath: 'api/twl/uom',
      searchMethod: 'POST',
      searchPath: 'api/twl/uom/gettwlunitofmeasures',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlcuService', function ($state, DataService, MessageService, Utils) {
   this.extendBaseController = function (self) {
      self.refreshSearch = false;
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);
      };
   };

   this.extendCreateController = function (self, base, twlcu) {
      twlcu.rowStatus = true;
      twlcu.uomDesc = '';
   };

   this.extendDetailController = function (self, base, twlcu) {
      self.getSubTitle = function () {
         return MessageService.get('global.unit') + ': ' + twlcu.uom;
      };
   };
});