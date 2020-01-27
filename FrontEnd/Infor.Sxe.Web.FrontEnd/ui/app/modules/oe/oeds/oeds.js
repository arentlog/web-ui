'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oeds',
      dataPath: 'api/oe/oeds',
      recordName: 'oeds',
      searchMethod: 'POST',
      searchPath: '',
      searchResultsField: '',
      resultsRowIdField: 'oedsRowidStr',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whse' },
      ],
      recentlyVisited: {
         title: {label: 'global.warehouse', value: 'whse'}
      }
   });
});

app.service('OedsService', function ($state, ConfigService, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {
     
      self.search = function () {
         var criteria = {
            whse: self.criteria.whse,
            recordcountlimit: ConfigService.getDefaultRecordLimit()
         };

         // Load the main grid
         DataService.post('/web/api/oe/oedsrecordlist', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (data.ttbloedsrecordlist) {
                  self.dataset = data.ttbloedsrecordlist;
               }
            }
         });
      }; // search  
   };

   this.extendCreateController = function (self, base, oeds, $scope) {

      // Field is mandatory - it's on the primary unique index
      // assign value to avoid field is null error
      oeds.equipcd = '';

   };
});