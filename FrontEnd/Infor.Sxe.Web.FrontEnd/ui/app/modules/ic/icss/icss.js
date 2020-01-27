'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icss',
      dataPath: 'api/ic/icss',
      searchMethod: 'POST',
      searchPath: 'api/ic/icss/lookupspecialpricecost',
      searchRecordLimitField: 'batchsize',
      searchResultsField: '',
      resultsRowIdField: 'rowidIcss',
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: { label: 'global.rec.number', value: 'icspecrecno' }
      }
   });
});

app.service('IcssService', function ($state, DataService, MessageService, UserService, Utils) {

   this.updateRecord = function (self, base, icss, scope, callback) {
      DataService.post('api/ic/asicsetup/icspecpricecostupdate', { data: icss, busy: true }, function (data) {
         callback(data);
      });
   };

   this.createRecord = function (self, base, icss, scope, callback) {
      DataService.post('api/ic/asicsetup/icspecpricecostcreate', { data: icss, busy: true }, function (data) {
         callback(data);
      });
   };

   this.extendDetailController = function (self, base, icss, scope) {
      icss.$promise.then(function () {
         // the next line can be removed when a global fix for the case-sensitive issue is in place
         icss.speccostty = icss.speccostty.toLowerCase();
         var getCriteria = {
            rowidIcss: icss.rowID,
            defaulttype: ''
         };
         DataService.post('api/ic/asicsetup/geticssdefaulttype', { data: getCriteria, busy: true }, function (data) {
            icss.defaulttype = data.defaulttype;
         });
      });
   };
});