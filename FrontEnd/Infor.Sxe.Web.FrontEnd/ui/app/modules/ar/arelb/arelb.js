'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arelb',
      dataPath: 'api/ar/arbcb',
      searchMethod: 'POST',
      searchPath: 'api/ar/arbcb/getarbcblist',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: 'global.batch', value: 'batch' }
      ]

   });
});

app.service('ArelbService', function (DataService, GridService, MessageService) {

   this.extendMasterController = function (self, base) {
      self.saveChanges = function (e, args) {
         var record = base.dataset[args.row];

         DataService.put('api/ar/arbcb', { data: record, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');

            }
         }, function () {
            record.rtpfl = args.oldValue;
            base.grid.updateRow(args.row);
         });

      };
   };
});
