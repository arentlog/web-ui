'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsew',
      dataPath: 'api/ic/icsew',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsewloadtt',
      searchResultsField: '',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'icsewrowid',
      recentlyVisited: {
         title: { label: 'global.assigned.warehouse', value: 'whse' },
         description: [
            { label: 'global.alternate.warehouse', value: 'whse2' }
         ]
      }
   });
});


app.service('IcsewService', function (DataService, MessageService, UserService, Utils, Sasoo) {


   this.extendDetailController = function (self, base, icsew, scope) {

      self.getSubTitle = function () {
         return MessageService.get('global.assigned.warehouse') + ': ' + self.icsew.whse + ' | ' +
            MessageService.get('global.alternate.warehouse') + ': ' + self.icsew.whse2;
      };

   };

   this.extendCreateController = function (self, base, icsabc, scope) {

      // Field Defaults - Variables
      self.whse = '';
      self.whse2 = '';
      self.comment = '';
      self.icsew.whse = Sasoo.whse;

      // Clear the Sub Title - No Record Created Yet
      self.getSubTitle = function () {
         return MessageService.get('global.new')
      };

   };

});