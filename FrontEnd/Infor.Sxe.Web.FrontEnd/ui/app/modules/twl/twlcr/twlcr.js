'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcr',
      dataPath: 'api/twl/returnreason',
      searchMethod: 'POST',
      searchPath: 'api/twl/returnreason/gettwlreturnreasons',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlcrService', function ($state, DataService, MessageService, UserService, Utils) {

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

   this.extendCreateController = function (self, base, twlcr) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlcr.coNum = base.criteriaUsed.coNum;
      twlcr.whNum = base.criteriaUsed.whNum;

      twlcr.code = '';
      twlcr.description = '';
      twlcr.type = 'I';
   };

   this.extendDetailController = function (self, base, twlcr) {
      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlcr.whNum + ' | ' +
            MessageService.get('global.return.code') + ': ' + twlcr.code;
      };
   };
});