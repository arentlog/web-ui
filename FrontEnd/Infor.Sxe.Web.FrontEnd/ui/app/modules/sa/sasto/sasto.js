'use strict';

app.config(function ($stateProvider, StateProvider, MultiLanguageStateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasto',
      dataPath: 'api/sa/sastn',
      searchMethod: 'POST',
      searchPath: 'api/sa/assasetup/sastooeaddonlist',
      searchResultsField: '',
      searchParamValueField: 'codeval',
      resultsRowIdField: 'sastnrowid',
      detailSubTitle: [
         { label: 'global.addon.number', value: 'codeval' },
         { label: '', value: 'descrip' }
      ],
      recentlyVisited: {
         title: { label: 'global.addon.number', value: 'codeval' },
         description: { label: '', value: 'descrip' }
      }
   });
   MultiLanguageStateProvider.addStates('sa', 'sasto', 'sasto.detail');
});

app.service('SastoService', function ($state, $translate, DataService, MessageService, ConfigService, UserService, Utils, Sasc) {

   this.extendDetailController = function (self, base, sasto) {
      self.sasc = Sasc;

      sasto.$promise.then(function () {

         // If record not found, do not proceed (this can happen when navigating to a deleted record)
         if (!sasto.$resolved) {
            return;
         }

         // Get field controls
         var oeAddonCriteria = {
            codeval: sasto.codeval
         };
         DataService.post('api/sa/assasetup/sastoglfetch', { data: oeAddonCriteria, busy: true }, function (data) {
            if (data) {
               sasto.cglno = data.sastoglacct;
            }
         });
      });

      self.multiLangClick = function () {
         $state.go('sasto.detail.multilanguage', {
            codeiden: 'o',
            codeval: sasto.codeval,
            descrip1: sasto.descrip,
            descrip2: '',
            extended: '',
            returnState: $state.current.name
         });
      };
   };

   this.extendCreateController = function (self, base, sasto) {
      sasto.addontype = false;
   };

   this.updateRecord = function (self, base, sasto, scope, callback) {
      DataService.post('api/sa/assasetup/sastooeaddonsave', { data: sasto, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               //No Error
               callback(data);
            }
         }
      });
   };

   this.createRecord = function (self, base, sasto, scope, callback) {
      DataService.post('api/sa/assasetup/sastooeaddoncreate', { data: sasto, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data.sastonewoeaddon);
            }
         }
      });
   };

   this.deleteMultiple = function (self, base, records, scope, callback) {
      records.forEach(function (record) {
         DataService.get('api/sa/assasetup/sastooeaddondelete/' + record.codeval, { busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data)) {
                  //No Error
                  callback(data);
               }
            }
         });
      });
   };
});

