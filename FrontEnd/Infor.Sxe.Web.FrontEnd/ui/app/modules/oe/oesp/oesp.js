'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oesp',
      dataPath: 'api/cm/cmsp',
      searchMethod: 'POST',
      searchPath: 'api/cm/cmsp/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'cmprospectlookupresults',
      resultsRowIdField: 'rowidCmsp',
      createStateView: 'oe/oesp/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'oe/oesp/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/cm/ascminquiry/prospectcopy',
      detailSubTitle: [
         { label: null, value: 'prosno' },
         { label: null, value: 'name' }
      ],
      recentlyVisited: {
         title: { label: 'global.prospect', value: 'prosno' },
         description: { label: 'global.name', value: 'name' }
      }
   });
});

app.service('OespService', function ($state, ConfigService, DataService, GridService, MessageService, SecurityService) {

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromprosno = stateParams.object.prosno;
      request.toprosno = 0;
      request.fromname = stateParams.object.name;
      request.name = stateParams.object.name;
   };

   this.extendCreateController = function (self) {
      self.oesp.prosno = 0;
      self.oesp.synccrmfl = true;
      self.oesp.newrec = true;
      self.oesp.freqtype = 'D';
      self.oesp.spcdefaultty = 'I';
   };

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'city', label: MessageService.get('global.city') },
         { value: 'state', label: MessageService.get('global.state') },
         { value: 'zipcd', label: MessageService.get('global.zip.code') },
         { value: 'phoneno', label: MessageService.get('global.phone.number') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['city'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/cm/cmsp/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.cmprospectlookupresults;
            }
         });
      };

   };

   this.extendDetailController = function (self) {

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('oesp', 'General') < 3;
      self.isInformationTabReadonly = SecurityService.getSubSecurityLevel('oesp', 'Information') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('oesp', 'Custom') < 3;

   };

});

app.controller('OespDetailGeneralCtrl', function ($scope, DataService, MessageService) {
   var self = this;
   var oesp = $scope.dtl.oesp;

   // Assign initial values for dynamic labels
   self.userCode1Label = MessageService.get('global.user.code.1');
   self.userCode2Label = MessageService.get('global.user.code.2');
   self.userType1Label = MessageService.get('global.user.type.1');
   self.userType2Label = MessageService.get('global.user.type.2');

   oesp.$promise.then(function () {

      if (!oesp.spcdefaultty) {
         oesp.spcdefaultty = 'i';
      } else if (oesp.spcdefaultty.toLowerCase() !== 'i' && oesp.spcdefaultty.toLowerCase() !== 'n' && oesp.spcdefaultty.toLowerCase() !== 'o') {
         oesp.spcdefaultty = 'i';
      }

      self.changeProspectType();

   });

   // Adjust labels if Prospect Type is changed
   self.changeProspectType = function () {

      if (oesp.prostype) {

         // Get the label data set up in SASTT for the new Prospect Type
         var cmstType1Criteria = {
            codeiden: 'uh',
            codeval: '',
            descrip: '',
            slsrep: oesp.prostype
         };

         // If no CMST data can be found or there is no label value, go back to the default label
         DataService.post('api/cm/cmst/getcmstlistbyidcodevaldesc', { data: cmstType1Criteria, busy: true }, function (data) {
            if (data) {

               for (var i = 0; i < 4; i++) {

                  switch (i) {
                     case 0:
                        if (data[0].descrip) {
                           self.userType1Label = data[0].descrip;
                        } else {
                           self.userType1Label = MessageService.get('global.user.type.1');
                        }
                        break;
                     case 1:
                        if (data[1].descrip) {
                           self.userType2Label = data[1].descrip;
                        } else {
                           self.userType2Label = MessageService.get('global.user.type.2');
                        }
                        break;
                     case 2:
                        if (data[2].descrip) {
                           self.userCode1Label = data[2].descrip;
                        } else {
                           self.userCode1Label = MessageService.get('global.user.code.1');
                        }
                        break;
                     case 3:
                        if (data[3].descrip) {
                           self.userCode2Label = data[3].descrip;
                        } else {
                           self.userCode2Label = MessageService.get('global.user.code.2');
                        }
                        break;
                  }

               }

            } else {
               self.userCode1Label = MessageService.get('global.user.code.1');
               self.userCode2Label = MessageService.get('global.user.code.2');
               self.userType1Label = MessageService.get('global.user.type.1');
               self.userType2Label = MessageService.get('global.user.type.2');
            }
         });

      } else {
         self.userCode1Label = MessageService.get('global.user.code.1');
         self.userCode2Label = MessageService.get('global.user.code.2');
         self.userType1Label = MessageService.get('global.user.type.1');
         self.userType2Label = MessageService.get('global.user.type.2');
      }
   };

});