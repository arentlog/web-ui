'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'etx',
      menuFn: 'etxsrpc',
      dataPath: 'api/etx/etxsrpc',
      searchMethod: 'POST',
      searchPath: 'api/ptx/asptxentry/ptxsrprodcatlist',
      searchResultsField: '',
      resultsRowIdField: 'ptxrouterulerowid',
      recentlyVisited: null,
      detailSubTitle: [
        { label: null, value: 'prodcat' }
      ]
   });
});

app.service('EtxsrpcService', function ($state, DataService) {

   this.getRecord = function (self, base, stateParams, scope, callback) {
      var dummyObject = {
         ptxrouterulerowid: stateParams.id
      };
      return DataService.getResource('api/ptx/asptxentry/ptxsrrouteruleretrieve', { data: dummyObject, method: 'POST' });
   };

   this.createRecord = function (self, base, ptxrouterule, scope, callback) {
      ptxrouterule.keytype = 'pcat';
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



