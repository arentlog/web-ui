'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlas',
      dataPath: 'api/twl/shfmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/shfmst/gettwlshifts',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlas/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlasService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;

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

   this.extendCreateController = function (self, base, twlas) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlas.coNum = base.criteriaUsed.coNum;
      twlas.whNum = base.criteriaUsed.whNum;

      twlas.rowStatus = true;
      twlas.shfNum = 0;
      twlas.shfDesc = '';
      twlas.timeStart = '0000';
      twlas.timeEnd = '0000';
   };

   this.extendDetailController = function (self, base, twlas) {
      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlas.whNum + ' | ' +
            MessageService.get('global.shift') + ': ' + twlas.shfNum;
      };
   };
});