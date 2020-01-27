'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'dc',
      menuFn: 'dcaos',
      recordName: 'dcaosrecord',
      dataPath: 'api/dc/dcaos',
      searchMethod: 'GET',
      searchPath: 'api/shared/assharedinquiry/dcaossearch/{cAdminID}',
      resultsRowIdField: 'convertrowid',
      recordRowIdField: 'convertrowid',
      primaryKeyParams: ['adminid'],
      detailSubTitle: [
         { label: 'global.administration.id', value: 'adminid' }
      ],
      searchCriteria: { cAdminID: ''},
      recentlyVisited: {
          title: { label: 'global.administration.id', value: 'adminid' },
          description: { label: 'global.data.file.directory', value: 'dirdata' }
      }
   });
});

app.service('DcaosService', function ($translate, $state, DataService, MessageService, AodataService, UserService, ConfigService, GridService, Utils) {

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the table off selected Grid Record/Recently Visited
      var criteria = {
         convertrowid: stateParams.id
      };
      return DataService.getResource('api/shared/assharedinquiry/dcaosretrieve', { data: criteria, method: 'POST', busy: true });
   };

   this.createRecord = function (self, base, dcaosrecord, scope, callback) {
       DataService.post('api/shared/assharedinquiry/dcaoscreate', { data: dcaosrecord, busy: true }, function (data) {
           if (data) {
               // Load the returned record into CallBack to load the new record
               callback(data);
           }
       });
   };

   this.updateRecord = function (self, base, dcaosrecord, scope, callback) {
       DataService.post('api/shared/assharedinquiry/dcaosupdate', { data: dcaosrecord, busy: true }, function (data) {
           callback(data);
       });
   };

   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, dcaosrecord, $scope, deleteCallback) {
      DataService.post('api/shared/assharedinquiry/dcaosdelete', { data: dcaosrecord }, function () {
         deleteCallback();
      });
   };

   // Custom Delete of Possible Multiple Records for Master Screen   
   this.deleteMultiple = function (self, base, records, scope, deleteCallback) {
       records.forEach(function (record) {
           DataService.post('api/shared/assharedinquiry/dcaosdelete', { data: record, busy: true }, function () {
               deleteCallback();
           });
       });
   };

   this.extendCreateController = function (self, base, dcaosrecord, scope) {

       // Initialize new record to be created, prior to the screen appearing.
       self.dcaosrecord.filetype = 'V';         // Variable
       self.dcaosrecord.delim = '0x2c';         // Comma
       self.dcaosrecord.xrefdelim = '0x2c';     // Comma
       self.dcaosrecord.datetype = 'M';          // Month
   };
});