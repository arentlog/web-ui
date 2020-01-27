'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icseh',
      dataPath: 'api/ic/icseh',
      searchMethod: 'POST',
      searchPath: 'api/ic/icseh/geticsehlistallbymsdssheetnoandlangcd',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'ic/icseh/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icseh/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/icsehcopy',
      recentlyVisited: {
         title: { label: 'global.msds.sheet.number', value: 'msdssheetno' },
         description: { label: 'global.language.code', value: 'langcd' }
      },
      detailSubTitle: [
         { label: 'global.msds.sheet.number', value: 'msdssheetno' },
         { label: 'global.language.code', value: 'langcd' }
      ]
   });
});

app.service('IcsehService', function ($state, DataService, MessageService) {

   this.extendCreateController = function (self, base, icseh) {
      // Field is mandatory - it's on the primary unique index
      // assign value to avoid field is null error
      icseh.langcd = "";
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.frommsdssheetno = stateParams.object.msdssheetno;
      request.fromlangcd = stateParams.object.langcd;
   };

   this.extendDetailController = function (self, base, icseh) {
      icseh.$promise.then(function () {
         // If record not found, do not proceed (this can happen when navigating to a deleted record)
         if (!icseh.$resolved) {
            return;
         }
         var getCriteria = {
            msdssheetno: icseh.msdssheetno,
            langcd: icseh.langcd
         };
         DataService.post('api/ic/asicsetup/icsehhazardousload', { data: getCriteria, busy: true }, function (data) {
            icseh.page1 = data.page1;
            icseh.page2 = data.page2;
         });
      });

      self.customSubmit = function () {
         var notessavecriteria = {
            msdssheetno: icseh.msdssheetno,
            langcd: icseh.langcd,
            page1: icseh.page1,
            page2: icseh.page2
         };
         DataService.post('api/ic/asicsetup/icsehhazardoussave', { data: notessavecriteria, busy: true }, function (data) {
            if (data) {
               MessageService.alert('global.warning', data);
            }
            var params = {
               msdssheetno: icseh.msdssheetno,
               langcd: icseh.langcd
            };

            DataService.get('api/ic/icseh/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  icseh.noteln11 = data.noteln11;
                  icseh.noteln12 = data.noteln12;
                  icseh.noteln13 = data.noteln13;
                  icseh.noteln14 = data.noteln14;
                  icseh.noteln15 = data.noteln15;
                  icseh.noteln16 = data.noteln16;
                  icseh.noteln17 = data.noteln17;
                  icseh.noteln18 = data.noteln18;
                  icseh.noteln19 = data.noteln19;
                  icseh.noteln110 = data.noteln110;
                  icseh.noteln111 = data.noteln111;
                  icseh.noteln112 = data.noteln112;
                  icseh.noteln113 = data.noteln113;
                  icseh.noteln114 = data.noteln114;
                  icseh.noteln115 = data.noteln115;
                  icseh.noteln116 = data.noteln116;
                  icseh.noteln21 = data.noteln21;
                  icseh.noteln22 = data.noteln22;
                  icseh.noteln23 = data.noteln23;
                  icseh.noteln24 = data.noteln24;
                  icseh.noteln25 = data.noteln25;
                  icseh.noteln26 = data.noteln26;
                  icseh.noteln27 = data.noteln27;
                  icseh.noteln28 = data.noteln28;
                  icseh.noteln29 = data.noteln29;
                  icseh.noteln210 = data.noteln210;
                  icseh.noteln211 = data.noteln211;
                  icseh.noteln212 = data.noteln212;
                  icseh.noteln213 = data.noteln213;
                  icseh.noteln214 = data.noteln214;
                  icseh.noteln215 = data.noteln215;
                  icseh.noteln216 = data.noteln216;
                  self.submit();
               }
            });
         });
      };
   };
});