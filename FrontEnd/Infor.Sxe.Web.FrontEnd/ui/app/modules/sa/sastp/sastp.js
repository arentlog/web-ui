'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sastp',
      dataPath: 'api/sa/sastp',
      searchMethod: 'POST',
      searchPath: 'api/sa/sastp/getsastplist',
      resultsRowIdField: 'rowID',
      primaryKeyParams: ['processno'],
      passGridRecord: true,
      createStateView: 'sa/sastp/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'sa/sastp/copy.json',
      detailSubTitle: [
         {label: 'global.processor', value: 'processno'}
      ],
      copySubTitle: [
        { label: 'global.processor', value: 'processno' }
      ],
      recentlyVisited: {
         title: { label: 'global.processor', value: 'processno' },
         description: { label: 'global.name', value: 'name' }
      }
   });
});

app.service('SastpService', function ($state, $translate, $filter, DataService, GridService, MessageService, AodataService, UserService, SecurityService, ConfigService) {

   this.getRecord = function (self, base, stateParams) {

      var processor = {};
      var id = 0;

      /* rowid comes from drilling down to detail, recently visited or creating a new record */
      if (stateParams.id) {
         id = stateParams.id;
      } else if (base.processor.rowid) {
         id = base.processor.rowid;
      }

      // clear key values
      base.initKeyValues();

      processor = DataService.getResource('api/sa/sastp/getbyrowid/' + id + '?fillmode=true', { busy: true });

      processor.$promise.then(function () {
         if (processor.$resolved === true) {

            // Data used for the detail screens
            DataService.getResource('api/sa/assasetup/sastpretrieve/' + processor.processno.toString(), { method: 'GET', busy: true }, function (data) {
               data.$promise.then(function () {
                  self.sastp = data;
               });
            });

         } // processor.$resolved

      }); // processor.$promise.then

      return processor;

   }; // getRecord

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         processno: 0,
         batchsize: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'processno', label: MessageService.get('global.processor') },
         { value: 'batchsize', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['processno'];

      // Perform advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);
         criteria.fldlist = "processno";

         DataService.post('api/sa/sastp/getsastplist', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data;
            }
         });

      }; // search

   }; // extendMasterController

   this.extendBaseController = function (self) {

      self.initKeyValues = function () {
         self.processno = 0;
         self.processor = [];
      }; // initKeyValues

      self.initKeyValues();

   }; // extendBaseController

   this.extendDetailController = function (self, base, sastp) {

      self.isRequiredTabReadonly = SecurityService.getSubSecurityLevel('sastp', 'Required') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('sastp', 'Custom') < 3;

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      self.ping = function () {
         DataService.post('api/sa/assasetup/sastpping', { data: sastp, busy: true }, function (ping) {
            if (noHardErrors(ping)) {
               if (ping.lPingSuccessful) {
                  MessageService.confirmation('global.information', 'message.ping.successful');
               } else {
                  MessageService.confirmation('global.information', 'message.ping.failed');
               }
            }
         });
      }; // self.ping


   }; // extendDetailController

   this.extendCreateController = function (self) {

      // Perform any custom UI validation
      self.validateForm = function () {
         var isValid = true;
         // add specific validation here
         return isValid;
      }; // validateForm

      self.customSubmit = function () {
         // Perform UI validation
         var isValid = self.validateForm();
         if (isValid) {
            self.submit();
         }
      }; // customSubmit

   }; // extendCreateController

   this.createRecord = function (self, base, sasc, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      DataService.getResource('api/sa/assasetup/sastpcreate/' + self.processorcopy.newprocessno.toString() + '/0', { method: 'GET', busy: true }, function (data) {
         data.$promise.then(function () {
            if (noHardErrors(data)) {
               base.processor = data;
               callback(data);
            }
         });

      });

   }; // createRecord

   this.updateRecord = function (self, base, sastp, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      DataService.post('api/sa/assasetup/sastpupdate', { data: sastp, busy: true }, function (data) {
         if (noHardErrors(data)) {
            callback(data);
         }
      });

   }; // updateRecord

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      var sastpToCopy = stateParams.object;

      // Initialize copy request object
      request.fromprocessno = sastpToCopy.processno;

   }; // extendCopyController

   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      DataService.getResource('api/sa/assasetup/sastpcreate/' + self.processorcopy.newprocessno.toString() + '/' + request.fromprocessno, { method: 'GET', busy: true }, function (data) {
         data.$promise.then(function () {
            if (noHardErrors(data)) {
               base.processor = data;
               callback(data);
            }
         });

      });

   }; // submitCopyRequest

   this.deleteRecord = function (self, base, sastp, scope, callback) {

      DataService.getResource('api/sa/assasetup/sastpdelete/' + sastp.processno.toString(),  { method: 'GET', busy: true }, function (data) {
         // no data returned
         callback();
      });

   }; // deleteRecord

   this.deleteMultiple = function (self, base, records, scope, callback) {

      records.forEach(function (record) {
         DataService.getResource('api/sa/assasetup/sastpdelete/' + record.processno.toString(), { method: 'GET', busy: true }, function (data) {
         });
      });

      if (records) {
         // no data returned
         callback();
      }

   }; // deleteMultiple

});  // SastpService
