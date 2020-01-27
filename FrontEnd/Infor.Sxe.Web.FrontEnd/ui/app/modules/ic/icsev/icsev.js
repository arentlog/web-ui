'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsev',
      dataPath: 'api/ic/icsev',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsevloadtt',
      searchResultsField: '',
      resultsRowIdField: 'icsevrowid',
      recentlyVisited: {
         title: { label: 'global.last.in.first.out.category', value: 'lifocat' },
         description: [
            { label: 'global.year', value: 'yr' }
         ]
      }
   });
});

app.service('IcsevService', function ($state, $translate, DataService, MessageService, UserService, Utils) {

   this.extendDetailController = function (self, base, icsev, scope) {

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         subTitleText = MessageService.get('global.category') + ': ' + self.icsev.lifocat + ' | ';
         subTitleText = subTitleText + MessageService.get('global.year') + ': ' + self.icsev.yr;

         return subTitleText;
      };

   };

});

