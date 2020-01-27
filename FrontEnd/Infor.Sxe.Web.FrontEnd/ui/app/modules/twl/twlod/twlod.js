'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlod',
      dataPath: 'api/twl/dockmstr',
      searchMethod: 'POST',
      searchPath: 'api/twl/dockmstr/gettwldocks',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlod/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlodService', function ($state, DataService, MessageService, UserService, Utils) {

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

   this.extendCreateController = function (self, base, twlod) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlod.coNum = base.criteriaUsed.coNum;
      twlod.whNum = base.criteriaUsed.whNum;

      twlod.rowStatus = true;
      twlod.dockId = '';
      twlod.name = '';
      twlod.carrierNow = '';
      twlod.routeNow = '';
      twlod.carrierDefault = '';
      twlod.routeDefault = '';
      twlod.currentTrailerId = '';
      twlod.stage = '';

   };

   this.extendDetailController = function (self, base, twlod) {
      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlod.whNum + ' | ' +
            MessageService.get('global.dock') + ': ' + twlod.dockId;
      };
   };
});