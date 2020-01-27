'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasj',
      dataPath: 'api/sa/sasj',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasj/lookup',
      searchResultsField: 'journallookupresults',
      resultsRowIdField: 'sasjRowid',
      primaryKeyParams: ['jrnlno'],
      passGridRecord: true,
      createStateView: 'sa/sasj/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'sa/sasj/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sa/assasetup/sajournalcopy',
      detailSubTitle: [
         {label: 'global.journal.number', value: 'jrnlno'}
      ],
      copySubTitle: [
        { label: 'global.journal.number', value: 'jrnlno' }
      ],
      recentlyVisited: {
         title: { label: 'global.journal.number', value: 'jrnlno' },
         description: { label: 'global.function', value: 'ourproc' }
      }
   });
});

app.service('SasjService', function ($state, $translate, $filter, ConfigService, DataService, GridService, MessageService, Utils, SecurityService) {

   this.extendSearchController = function (self, base) {

      // Clear form
      self.clear = function () {
         Utils.clearObject(base.criteria);

         // Re-initialize criteria (for static values and record limit)
         base.initCriteria();
      };

   }; // extendSearchController

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         jrnlno: '',
         oper2: '',
         ourproc: '',
         unprintedonlyfl: false,
         openonlyfl: false,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'jrnlno', label: MessageService.get('global.journal.number') },
         { value: 'oper2', label: MessageService.get('global.operator') },
         { value: 'ourproc', label: MessageService.get('global.function') },
         { value: 'opendtstart', label: MessageService.get('global.start.date') },
         { value: 'opendtend', label: MessageService.get('global.end.date') },
         { value: 'unprintedonlyfl', label: MessageService.get('global.unprinted.all') },
         { value: 'openonlyfl', label: MessageService.get('global.open.all') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['jrnlno, oper2'];

      // Perform advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         // Apply record limit (if cleared by user)
         if (!criteria.recordcountlimit) {
            criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
         }

         DataService.post('api/sa/sasj/lookup', { data: criteria, busy: true }, function (data) {
            base.dataset = data.journallookupresults;
         });

      }; // search

      // called from Period column in the main grid
      self.periodFormatter = function (row, cell, value) {
         return Utils.pad(value, 4);
      };

   }; // extendMasterController

   this.extendBaseController = function (self) {

      // Initialize the search criteria object
      self.initCriteria = function () {
         // Add default record limit to specified field on criteria
         self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      };

      // Perform standard search and update data set for the grid
      self.search = function () {

         // Apply record limit (if cleared by user)
         if (!self.criteria.recordcountlimit) {
            self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
         }

         DataService.post('api/sa/sasj/lookup', { data: self.criteria, busy: true }, function (data) {
            self.dataset = data.journallookupresults;
         });

      }; // search

      // Perform initialization of search criteria
      self.initCriteria();

   }; // extendBaseController

   this.extendDetailController = function (self, base, sasj) {

      self.isRequiredTabReadonly = SecurityService.getSubSecurityLevel('sasj', 'Required') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('sasj', 'Custom') < 3;

      this.closeCallback = function (answer) {
         self.sasj.closefl = answer;
      };

      // Called when the user changes the Closed checkbox on the detail screen
      self.closedChanged = function (closefl) {
         if (closefl) {
            MessageService.yesNo('global.confirmation', 'question.do.you.really.want.to.close.the.journal',
               function () { self.sasj.closefl = true; },
               function () { self.sasj.closefl = false; }
            );
         }
      };

      sasj.$promise.then(function () {
         // format the period displays
         sasj.period = Utils.pad(sasj.period, 4);
         sasj.perfisc = Utils.pad(sasj.perfisc, 4);

         var criteria = {
            jrnlno: sasj.jrnlno,
            recordcountlimit: 1
         };

         self.esbprocessfl = false;

         // esbprocessfl is read only and is not returned in Pdssasj.Sasj so we need to make the additional SI call.
         // note - we cannot rely on the flag in the main grid since the user could have jumped to Detail without using the grid
         DataService.post('api/sa/sasj/lookup', { data: criteria, busy: true }, function (data) {
            if (data) { self.esbprocessfl = data.journallookupresults[0].esbprocessfl; }
         });

      });
   };

   this.extendCreateController = function (self, base, sasj) {

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

      self.initCreate = function () {
         // Set default periods
         var glDefaultPeriods = ConfigService.getGLDefaultPeriods();
         if (glDefaultPeriods) {
            self.sasj.period = Utils.pad(glDefaultPeriods.iGlDefPer, 4);
            self.sasj.perfisc = Utils.pad(glDefaultPeriods.iGlDefPer, 4);
         }
      }

      self.initCreate();

   }; // extendCreateController

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      request.fromjrnlno = stateParams.object.jrnlno;

   }; // extendCopyController

});  // SasjService

