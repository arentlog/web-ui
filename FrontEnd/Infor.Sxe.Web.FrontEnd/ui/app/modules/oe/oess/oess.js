'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oess',
      dataPath: 'api/sm/smsn',
      searchMethod: 'POST',
      searchPath: 'api/sm/smsn/getsmsnlistbysalesrepandname',
      searchRecordLimitField: 'recordcountlimit',
      primaryKeyParams: ['slsrep'],
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'oe/oess/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'oe/oess/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sm/assmsetup/smsalesrepcopy',
      detailSubTitle: [
         { label: null, value: 'slsrep' },
         { label: null, value: 'name' }
      ],
      recentlyVisited: {
         title: { label: 'global.sales.rep', value: 'slsrep' },
         description: { label: 'global.name', value: 'name' }
      }
   });
});

app.service('OessService', function ($state, DataService, GridService, MessageService, Utils, SecurityService) {

   var copyCriteria = [];

   // The smsalesrepcopy call expects an array of data, not just a single record copy, so create the submit here
   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {

      copyCriteria[0] = {
         fromslsrep: stateParams.object.slsrep,
         toslsrep: request.toslsrep
      };

      DataService.post('api/sm/assmsetup/smsalesrepcopy', { data: copyCriteria, busy: true }, function (data) {
         callback(data);
      });

   };

   // Load the data needed in the copy screen
   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromslsrep = stateParams.object.slsrep;
      request.toslsrep = stateParams.object.slsrep;
   };

   // Load the initial values needed when creating a new sales rep
   this.extendCreateController = function (self, base, oess, scope) {
      self.oess.begprosno = 0;
      self.oess.endprosno = 0;
      self.oess.commfl = true;
      self.oess.synccrmfl = true;
      self.oess.esbactioncode = 'Replace';
      self.oess.letterdir = '/usr/tmp/';
   };

   this.extendDetailController = function (self, base, oess, scope) {

      base.isGdprRestricted = false;

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('oess', 'General') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('oess', 'Custom') < 3;

      oess.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (oess.name === 'GDPR Restricted Data' || oess.name === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
            base.isGdprRestricted = true;
         }
      });

      self.getGeoCodeLookupCriteria = function () {
         return {
            tablename: 'smsn',
            slsrep: oess.slsrep,
            streetaddr: oess.addr1,
            city: oess.city,
            state: oess.state,
            zipcd: oess.zipcd,
            country: oess.countrycd,
            geocd: oess.geocd,
            outofcityfl: oess.outofcityfl
         };
      };

   };

});

