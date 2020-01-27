'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'saabn',
      dataPath: 'api/shared/esbnoun',
      searchMethod: 'POST',
      searchPath: 'api/sa/assasetup/saabnfetch',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'sa/saabn/create.json',
      postCreateState: '^.detail.edit',
      detailSubTitle: [
         { label: 'ion.noun', value: 'noun' }
      ],
      recentlyVisited: null
   });
});

app.service('SaabnService', function ($state, $translate, DataService, GridService, MessageService) {
   this.extendCreateController = function (self, base, saabn) {
      saabn.edenablelev1 = 'Disable';
      saabn.extradatalevel1 = '';
      saabn.edenablelev2 = 'Disable';
      saabn.extradatalevel2 = '';
   };

   this.extendMasterController = function (self, base) {
      self.drilldown = function (e, args) {
         var record = args[0].item;

         base.selectedRecord = {};
         base.selectedRecord.level1Allowfl = record.level1Allowfl;
         base.selectedRecord.level2Allowfl = record.level2Allowfl;

         // Go to detail state passing the row id
         $state.go('^.detail', {
            id: record.rowID
         });
      };

      self.showOutboundBodCount = function () {
         DataService.get('api/sa/assasetup/saabnbodcount/' + 'false', { busy: true }, function (data) {
            if (data) {
               self.bodMessage = data.cBODMessage;
               if (data.lHitRecordMax) {
                  MessageService.yesNo('global.question', $translate.instant('question.outbound.bod.records'), function () {
                     DataService.get('api/sa/assasetup/saabnbodcount/' + 'true', { busy: true }, function (data2) {
                        if (data2) {
                           self.bodMessage = data2.cBODMessage;
                        }
                     });
                  });
               }
            }
         });
      };
   };
});