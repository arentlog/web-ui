'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasapi',
      recordName: 'sasapirecord',
      dataPath: 'api/sa/sasapi',
      searchMethod: 'GET',
      searchPath: 'api/sa/assasetup/sasapisearch/{cApplicationID}',     
      resultsRowIdField: 'sasapirowid',
      recordRowIdField: 'sasapirowid',
      primaryKeyParams: ['applicationid'],
      detailSubTitle: [
         {label: 'global.application.id', value: 'applicationid'}
      ],
      recentlyVisited: {
         title: { label: 'global.application.id', value: 'applicationid' },
         description: [
            { label: '', valueFunction: 'base.formatSubData' }
         ]
      }
   });
});

app.service('SasapiService', function ($translate, $state, DataService, MessageService) {

   self.testButtonEnabled = true;

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the table off selected Grid Record/Recently Visited
      var criteria = {
         sasapirowid: stateParams.id
      };

      self.testButtonEnabled = false;
      return DataService.getResource('api/sa/assasetup/sasapiretrieve', { data: criteria, method: 'POST', busy: true }); 
   };

   this.createRecord = function (self, base, sasapirecord, scope, callback) {

      var newRecord = {
         applicationid: sasapirecord.applicationid,
         applicationname: sasapirecord.applicationname,
         applogicalid: sasapirecord.applogicalid,
         baseurl: sasapirecord.baseurl,
         consumerkey: sasapirecord.consumerkey,
         secretkey: sasapirecord.secretkey,
         securitytype: sasapirecord.securitytype         
      };

      DataService.post('api/sa/assasetup/sasapicreate', { data: newRecord, busy: true }, function (data) {
         if (data) {
            // Load the returned record into CallBack to load the new record
            callback(data);
         }
      });     
   };

   this.updateRecord = function (self, base, sasapirecord, scope, callback) {

      var record = sasapirecord;
      DataService.post('api/sa/assasetup/sasapiupdate', { data: record, busy: true }, function (data) {
         callback(data);
      });
   };

   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, sasapi, $scope, deleteCallback) {
      DataService.post('api/sa/assasetup/sasapidelete', { data: sasapi }, function () {
         deleteCallback();
      });
   };

   // Custom Delete of Possible Multiple Records for Master Screen
   this.deleteMultiple = function (self, base, records, scope, deleteCallback) {
      records.forEach(function (record) {
         DataService.post('api/sa/assasetup/sasapidelete', { data: record, busy: true }, function () {
            deleteCallback();
         });
      }); 
   };

   this.extendBaseController = function (self) {

      // Initialize the search criteria object
      self.initCriteria = function () {
         // Add default record limit to specified field on criteria
         self.criteria.cApplicationID = '';
      };

      // Perform initialization of search criteria
      self.initCriteria();
   }; 

   this.extendDetailController = function (self, base, sasapirecord, scope) {
      self.applicationID = '';

      self.sasapirecord.$promise.then(function () {
         self.applicationID = self.sasapirecord.applicationid;

         if (self.applicationID) {
            if (self.applicationID === 'IMSOutbound' || self.applicationID.toLowerCase() === 'hmrcauthorize') {
               self.testButtonEnabled = true;
            }
         }

      });

      self.launchTestConnection = function () {
         if (self.applicationID && self.applicationID === 'IMSOutbound') {
            DataService.get('api/shared/assharedentry/ionimspingtest', { busy: true }, function () {
               MessageService.confirmation('global.information', 'message.ping.successful');
            });
         }

         if (self.applicationID && self.applicationID.toLowerCase() === 'hmrcauthorize') {
            var crit = {
               hmrcurl: self.sasapirecord.baseurl
            };
            DataService.post('/web/api/sa/SascTestHMRCApiUrl', { data: crit, busy: true }, function (data) {
               if (!MessageService.processMessaging(data.ttblmessaging)) {
                  MessageService.info('global.information', 'message.ping.successful');
               }
            });
         }

      };
   }; 
    
   this.extendCreateController = function (self, base, sasapirecord, scope) {

      self.sasapirecord.securitytype = 'OAUTH_1_SHA256';
      self.testButtonEnabled = false;
   };
});