'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'etx',
      menuFn: 'etxsrc',
      dataPath: 'api/etx/etxsrc',
      searchMethod: 'POST',
      searchPath: 'api/ptx/asptxentry/ptxsrcustomerlist',
      searchResultsField: '',
      resultsRowIdField: 'ptxrouterulerowid',
      recentlyVisited: null,
      detailSubTitle: [
        { label: null, value: 'custno' }
      ]
   });
});


app.service('EtxsrcService', function ($state, DataService) {

   this.getRecord = function (self, base, stateParams, scope, callback) {
      var dummyObject = {
         ptxrouterulerowid: stateParams.id
      };
      return DataService.getResource('api/ptx/asptxentry/ptxsrrouteruleretrieve', { data: dummyObject, method: 'POST' });
   };

   this.createRecord = function (self, base, ptxrouterule, scope, callback) {
      ptxrouterule.keytype = 'cust';
      DataService.post('api/ptx/asptxentry/ptxsrrouterulecreate', { data: ptxrouterule }, function (data) {
         callback(data);
      });
   };

   this.updateRecord = function (self, base, ptxrouterule, scope, callback) {
      DataService.post('api/ptx/asptxentry/ptxsrrouteruleupdate', { data: ptxrouterule }, function (data) {
         callback(data);
      });
   };

   this.deleteRecord = function (self, base, ptxrouterule, scope, callback) {
      DataService.post('api/ptx/asptxentry/ptxsrrouteruledelete', { data: ptxrouterule }, function (data) {
         callback(data);
      });
   };

   this.deleteMultiple = function (self, base, records, scope, callback) {
      DataService.post('api/ptx/asptxentry/ptxsrrouteruledelete', { data: records[0] }, function (data) {
         callback(data);
      });
   };

});


