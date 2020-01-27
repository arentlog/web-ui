'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlad',
      dataPath: 'api/twl/depmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/depmst/gettwldepartments',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlad/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwladService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.refreshSearch = false;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
      };
   };

   this.extendCreateController = function (self, base, twlad) {

      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlad.coNum = base.criteriaUsed.coNum;
      twlad.whNum = base.criteriaUsed.whNum;

      twlad.rowStatus = true;
      twlad.deptNum = 0;
      twlad.deptName = '';
      twlad.deptType = 'RE';
      twlad.stageIn = '';
      twlad.stageOut = '';
      twlad.pickBin = '';

      self.defaultBins = function () {
         if (twlad.deptType.toUpperCase() === 'TN') {
            twlad.stageIn = 'Returns';
         }
      };
   };

   this.extendDetailController = function (self, base, twlad) {

      self.defaultBins = function () {
         if (twlad.deptType.toUpperCase() === 'TN') {
            twlad.stageIn = 'Returns';
         }
      };

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlad.whNum + ' | ' +
            MessageService.get('global.department') + ': ' + twlad.deptNum;
      };
   };
});