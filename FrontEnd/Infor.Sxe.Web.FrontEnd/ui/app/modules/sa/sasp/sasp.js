'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasp',
      dataPath: 'api/sa/sasp',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasp/lookup',
      searchResultsField: 'saprinterlookupresults',
      resultsRowIdField: 'rowidSasp',
      primaryKeyParams: ['printernm'],
      createStateView: 'sa/sasp/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'sa/sasp/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sa/assasetup/saspcopy',
      detailSubTitle: [
         {label: 'global.printer.name', value: 'printernm'}
      ],
      copySubTitle: [
         { label: 'global.printer.name', value: 'printernm' }
      ],
      recentlyVisited: {
         title: { label: 'global.printer.name', value: 'printernm' },
         description: []
      }
   });
});


app.service('SaspService', function ($state, $translate, $filter, ConfigService, DataService, GridService, MessageService, Sasoo, SecurityService) {

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         ptype: '',
         printernm: '',
         saspgroup: '',
         blankgroup: false,
         wideonly: false,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'ptype', label: MessageService.get('global.type') },
         { value: 'printernm', label: MessageService.get('global.printer.name') },
         { value: 'saspgroup', label: MessageService.get('global.group') },
         { value: 'blankgroup', label: MessageService.get('global.blank.groups') },
         { value: 'wideonly', label: MessageService.get('global.wide.only') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['ptype', 'printernm', 'saspgroup'];

      // Perform advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/sa/sasp/lookup', { data: criteria, busy: true }, function (data) {
            base.dataset = data.saprinterlookupresults;
         });

      }; // search

      // called from Width column in the main grid
      self.wideFormatter = function (row, cell, value) {
         return (value) ? $translate.instant('number.132') : $translate.instant('number.80');
      };

      // called from Label Size column in the main grid
      self.labelSizeFormatter = function (row, cell, value) {
         return (value === 'L') ? $translate.instant('global.large.labels') : $translate.instant('global.small.labels');
      };

      self.initAdvancedCriteria = function () {
         self.advCriteria.ptype = '';
         self.advCriteria.pgroup = Sasoo.saspgroup;
      };

      self.initAdvancedCriteria();

   }; // extendMasterController

   this.extendBaseController = function (self) {

      self.userflds = {};

      self.initCriteria = function () {
         self.criteria.ptype = '';
         self.criteria.pgroup = Sasoo.saspgroup;
      };

      self.initCriteria();

   }; // extendBaseController

   this.extendDetailController = function (self, base, sasp) {

      self.isRequiredTabReadonly = SecurityService.getSubSecurityLevel('sasp', 'Required') < 3;
      self.isSettingsTabReadonly = SecurityService.getSubSecurityLevel('sasp', 'Settings') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('sasp', 'Custom') < 3;

      self.loadUserFieldData = function () {
         if (sasp) {
            base.userflds = {};
            sasp.$promise.then(function () {
               // Load the User Fields - we cannot use standard functionality since user fields 1-5 in sasp are arrays of extent 10 for user-defined printer codes
               DataService.get('api/sa/assasetup/saspretrieveuserfields/' + sasp.printernm, { busy: true }, function (data) {
                  if (data) {
                     base.userflds = data;
                     base.userflds.printernm = sasp.printernm;
                  }
               });
            });
         }
      }; // loadUserFieldData

      self.loadUserFieldData();

   }; // extendBaseController

   this.extendCreateController = function (self, base, sasp) {

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
            // all printers are created as global in cono 0
            sasp.cono = 0;
            sasp.wide = true;
            sasp.ptype = 'p';
            sasp.labelsize = 'L';
            self.submit();
         }
      }; // customSubmit

   }; // extendCreateController

   this.updateRecord = function (self, base, sasp, scope, callback) {

      function noHardErrors(datacheck) {
         var noharderrors = (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
         return noharderrors;
      }

      sasp.$promise.then(function () {

         // save the updated sasp data first using the standard call
         DataService.update('api/sa/sasp', { data: sasp, busy: true }, function (data) {
            if (noHardErrors(data)) {
               // save the User Printer Code Fields - we cannot use the standard call since user fields 1-5 in sasp are arrays of extent 10
               DataService.post('api/sa/assasetup/saspupdateuserfields', { data: base.userflds, busy: true }, function (userfields) {
                  if (noHardErrors(userfields)) {
                     callback(data);
                  }
               });
            }
         });

      }); // sasp.$promise.then

   }; // updateRecord

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      request.fromprinternm = stateParams.object.printernm;

   }; // extendCopyController

});  // SaspService


