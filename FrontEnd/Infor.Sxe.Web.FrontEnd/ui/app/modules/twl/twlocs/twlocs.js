'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlocs',
      dataPath: 'api/twl/cartonsize',
      searchMethod: 'POST',
      searchPath: 'api/twl/cartonsize/gettwlcartonsizes',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlocs/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });
});

app.service('TwlocsService', function ($state, DataService, MessageService, UserService, Utils) {

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

   this.extendCreateController = function (self, base, twlocs) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlocs.coNum = base.criteriaUsed.coNum;
      twlocs.whNum = base.criteriaUsed.whNum;

      twlocs.rowStatus = true;
      twlocs.boxId = '';
      twlocs.description = '';
      twlocs.carrierId = '';
      twlocs.packageCode = '';
      twlocs.length = 0;
      twlocs.width = 0;
      twlocs.height = 0;
      twlocs.cube = 0;
      twlocs.weight = 0;
      twlocs.dimWeight = 0;
      twlocs.sizeFactor = 0;
      twlocs.preferred = true;
      twlocs.oversized = false;
   };

   this.extendDetailController = function (self, base, twlocs) {
      // The Cube needs to recalculate as the user changes height/width/depth
      self.calculateCube = function () {
         twlocs.cube = twlocs.length * twlocs.width * twlocs.height;
      };

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlocs.whNum + ' | ' +
            MessageService.get('global.carton.id') + ': ' + twlocs.boxId;
      };
   };
});