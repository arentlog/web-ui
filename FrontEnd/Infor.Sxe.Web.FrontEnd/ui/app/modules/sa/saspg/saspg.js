'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'saspg',
      dataPath: 'api/sa/saspg',
      searchMethod: 'POST',
      searchPath: '',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      recentlyVisited: {
         title: { label: 'global.printer.group', value: 'saspgroup' },
         description: [{ label: 'global.description', value: 'descrip' }]
      },
      detailSubTitle: [
        { label: null, value: 'saspgroup' }
      ]
   });
});

app.service('SaspgService', function ($state, DataService, GridService, MessageService, Utils) {

   var self = this;

   this.extendBaseController = function (self, base, scope) {

      self.search = function () {
         DataService.post('api/sa/saspg/getsaspgprintergroup', { data: { group: self.criteria.saspgroup }, busy: true }, function (data) {
            if (data) {
               self.dataset = data;
            }
         });
      };

   };

});
