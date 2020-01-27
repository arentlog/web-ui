'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasse',
      dataPath: 'api/sa/sasse',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasse/getsasselistallbyerrorandlang',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { langcd: ''},
      searchRecordLimitField: 'batchsize',
      detailSubTitle: [
         { label: 'global.error.number', value: 'errorno' },
         { label: 'global.language', value: 'trmgrlang' }
      ],
      recentlyVisited: {
         title: { label: 'global.error.number', value: 'errorno' },
         description: { label: 'global.language', value: 'trmgrlang' }
      }
   });
});

app.service('SasseService', function ($state, DataService, MessageService, Sasc) {
   this.extendSearchController = function (self, base) {
      // Manually build Language Drop Down
      DataService.get('api/shared/assharedentry/aosystemlanguageload', { busy: true }, function (data) {
         base.languageTypes = data.aosystemlanguage;
      });
   };
   this.extendBaseController = function (self) {
      self.sasc = Sasc;
   };
   this.extendCreateController = function (self, base, sasse) {
      sasse.trmgrlang = '';
      sasse.standardty = 'a';
      self.getNextSasse = function () {
         var params = {
            ierrorno: sasse.errorno ? sasse.errorno : 0,
            ctrmgrlang: sasse.trmgrlang
         };
         DataService.get('api/sa/assasetup/sassegetnextwithparam', { params: params, busy: true }, function (data) {
            sasse.errorno = data;
         });
      };
   };
   this.createRecord = function (self, base, sasse, scope, callback) {
      if (sasse.trmgrlang) {
         var params = {
            errorno: sasse.errorno,
            trmgrlang: ''
         };
         DataService.get('api/sa/sasse/getbypk', { params: params, busy: true }, function (data) {
            // look for default language (blank) and if nothing returned or no record found display message
            if (!data || data.length === 0) {
               MessageService.info('global.information', 'message.english.default.language.error.message.record.created');
            }
            DataService.post('api/sa/sasse', { data: sasse, busy: true }, function (data) {
               callback(data);
            });
         });
      } else {
         DataService.post('api/sa/sasse', { data: sasse, busy: true }, function (data) {
            callback(data);
         });
      }
   };
});