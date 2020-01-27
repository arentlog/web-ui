'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsprc',
      recordName: 'icsprcaddchg',
      dataPath: 'api/ic/icsprc',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsprcsearch',
      primaryKeyParams: ['custno', 'shipto'],
      searchResultsField: 'icsprcresults',
      resultsRowIdField: 'icsprcrowid',
      recordRowIdField: 'rowid',
      copyStateView: 'ic/icsprc/copy.json',
      recentlyVisited: {
         title: { label: 'global.customer.number', value: 'custno' },
         description: [
            { label: 'global.ship.to', value: 'shipto' },
            { label: 'global.restriction.code', value: 'restrictcd' },
            { label: 'global.start.date', valueFunction: 'base.formatDate' },
            { label: 'global.certificate.code', value: 'certcode' }
         ]
      }
   });
});


app.service('IcsprcService', function ($translate, $state, DataService, MessageService, UserService, ConfigService, GridService, Utils) {

   var holdSearchRecord;

   this.getRecord = function (self, base, stateParams) {

      var icsprcaddchgList = {
         icsprcrowid: stateParams.id
      };

      return DataService.getResource('api/ic/asicsetup/icsprcload', { data: icsprcaddchgList, method: 'POST', busy: true });

   };


   this.updateRecord = function (self, base, icsprcaddchg, scope, callback) {

      var icsprcaddchgList = [];

      self.icsprcaddchg.updatetype = 'Chg';

      icsprcaddchgList.push(icsprcaddchg);

      DataService.post('api/ic/asicsetup/icsprcupdate', { data: icsprcaddchgList, busy: true }, function (data) {

         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data);
            }
         }
      });

   };


   this.createRecord = function (self, base, icsprcaddchg, scope, callback) {

      var icsprcaddchgList = [];

      self.icsprcaddchg.updatetype = 'Add';

      icsprcaddchgList.push(icsprcaddchg);

      DataService.post('api/ic/asicsetup/icsprcupdate', { data: icsprcaddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               // Load the returned record into CallBack to load the icsprcaddchg.rowid (new record)
               if (data.icsprcaddchg.length) {
                  var record = data.icsprcaddchg[0];
                  callback(record);
               }
            }
         }
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var icsprcaddchg;

      var icsprcaddchgList = [];

      // Process one Row at a Time
      records.forEach(function (record) {

         icsprcaddchg = angular.copy(record);

         // Load initially as Activate
         icsprcaddchg.updatetype = 'Delete';

         icsprcaddchgList.push(icsprcaddchg);

      });

      DataService.post('api/ic/asicsetup/icsprcupdate', { data: icsprcaddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data);
            }
         }
      });

   };


   // Copy - OK Button
   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {

      var icsprcaddchgList = [];
      var icsprcaddchg = angular.copy(request);

      icsprcaddchg.updatetype = 'Add';

      icsprcaddchgList.push(icsprcaddchg);

      DataService.post('api/ic/asicsetup/icsprcupdate', { data: icsprcaddchgList, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               // No Error
               // Load the returned record into CallBack to load the icsprcaddchg.rowid (new record)
               if (data.icsprcaddchg.length) {
                  var record = data.icsprcaddchg[0];
                  callback(record);
               }
            }
         }
      });

   };


   // Copy - Initialize the fields for the Copy screen
   this.extendCopyController = function (self, base, request, scope, stateParams) {

      // Screen Values
      request.custno = stateParams.object.custno;
      request.shipto = stateParams.object.shipto;
      request.restrictcd = stateParams.object.restrictcd;
      request.certcode = stateParams.object.certcode;
      request.startdt = stateParams.object.startdt;
      request.expiredt = stateParams.object.expiredt;

      // Full Record Fields - Not on the Screen
      request.activefl = stateParams.object.activefl;
      request.certaccptdt = stateParams.object.certaccptdt;
      request.certaccptuser = stateParams.object.certaccptuser;
      request.certauthuser = stateParams.object.certauthuser;
      request.user1 = stateParams.object.user1;
      request.user2 = stateParams.object.user2;
      request.user3 = stateParams.object.user3;
      request.user4 = stateParams.object.user4;
      request.user5 = stateParams.object.user5;
      request.user6 = stateParams.object.user6;
      request.user7 = stateParams.object.user7;
      request.user8 = stateParams.object.user8;
      request.user9 = stateParams.object.user9;

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         subTitleText = request.custno;

         if (request.shipto) {
            subTitleText += ' | ' + request.shipto;
         }

         if (request.restrictcd) {
            subTitleText += ' | ' + request.restrictcd;
         }

         if (request.startdt) {
            subTitleText += ' | ' + Utils.formatDate(request.startdt);
         }

         if (request.certcode) {
            subTitleText += ' | ' + request.certcode;
         }

         return subTitleText;
      };


   };

   this.extendMasterController = function (self, base, scope) {

      self.customerInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ARIC HyperLink
         if (currentRow && currentRow.custno > 0) {
            $state.go('aric.detail', { pk: currentRow.custno });
         }
      };

      self.shiptoInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         if (currentRow && currentRow.custno > 0 && currentRow.shipto > '') {
            $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
         }
      };

      // Advanced search criteria object with initial values
      self.advCriteria = {
         statuscd: '',
         recordlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'custno', label: MessageService.get('global.customer.number') },
         { value: 'shipto', label: MessageService.get('global.ship.to') },
         { value: 'restrictcd', label: MessageService.get('global.restriction.code') },
         { value: 'certcode', label: MessageService.get('global.certificate.license.id') },
         { value: 'statuscd', label: MessageService.get('global.status') },
         { value: 'begstartdt', label: MessageService.get('global.from.start.date') },
         { value: 'endstartdt', label: MessageService.get('global.to.start.date') },
         { value: 'begexpiredt', label: MessageService.get('global.from.expire.date') },
         { value: 'endexpiredt', label: MessageService.get('global.to.expire.date') },
         { value: 'recordlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['custno', 'shipto', 'restrictcd'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         holdSearchRecord = criteria;

         DataService.post('api/ic/asicsetup/icsprcsearch', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.icsprcresults;

               if (data.pvMorerecords) {
                  MessageService.alert('global.warning', data.cWarningMsg);
               }
            }

         });
      };
   };


   this.extendBaseController = function (self) {

      // Format function for date in recently visited display
      self.formatDate = function (icsprcaddchg) {
         var displayDate = Utils.formatDate(icsprcaddchg.startdt);
         return displayDate;
      };
   };

   this.extendSearchController = function (self, base, criteria, scope) {

      base.criteria.statuscd = '';
      base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();

         base.criteria.statuscd = '';
         base.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('icsprc.master');
         }

         holdSearchRecord = '';

         base.search();
      };
   };


   this.extendDetailController = function (self, base, icsprcaddchg, scope) {

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         if (self.icsprcaddchg.recordtype) {

            switch (self.icsprcaddchg.recordtype.toLowerCase()) {
               case "c":                                                                                 //ignore jslint - correct indentation
                  subTitleText = self.icsprcaddchg.custno + ' | ';                                       //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
               case "s":                                                                                 //ignore jslint - correct indentation
                  subTitleText = self.icsprcaddchg.custno + ' | ' + self.icsprcaddchg.shipto + ' | ';    //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
               default:                                                                                  //ignore jslint - correct indentation
                  subTitleText = MessageService.get('global.invalid') + ' | ';                           //ignore jslint - correct indentation
                  break;                                                                                 //ignore jslint - correct indentation
            }

            subTitleText += self.icsprcaddchg.restrictcd + ' | ' + Utils.formatDate(self.icsprcaddchg.startdt) + ' | ' + self.icsprcaddchg.certcode;
         }

         return subTitleText;
      };
   };


});
