'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcrc',
      dataPath: 'api/twl/returncategory',
      searchMethod: 'POST',
      searchPath: 'api/twl/returncategory/gettwlreturncategories',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlcrcService', function ($state, DataService, MessageService, UserService, Utils) {

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

   this.extendCreateController = function (self, base, twlcrc) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlcrc.coNum = base.criteriaUsed.coNum;
      twlcrc.whNum = base.criteriaUsed.whNum;

      twlcrc.rowStatus = true;
      twlcrc.rtnCategory = '';
      twlcrc.description = '';
   };

   this.extendDetailController = function (self, base, twlcrc) {
      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlcrc.whNum + ' | ' +
            MessageService.get('global.return.category') + ': ' + twlcrc.rtnCategory;
      };
   };
});