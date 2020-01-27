'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlocms',
      dataPath: 'api/twl/carrierservice',
      searchMethod: 'POST',
      searchPath: 'api/twl/carrierservice/gettwlcarrierservices',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlocms/create.json',
      postCreateState: '^.detail.edit',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.carrier', value: 'carrierId' },
         { label: 'global.service', value: 'service' }
      ],
      recentlyVisited: null
   });
});

app.service('TwlocmsService', function ($state, DataService, MessageService, UserService, Utils) {

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

   this.extendCreateController = function (self, base, twlocms) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlocms.coNum = base.criteriaUsed.coNum;
      twlocms.whNum = base.criteriaUsed.whNum;

      twlocms.rowStatus = true;
      twlocms.carrierId = '';
      twlocms.service = '';
      twlocms.carrierZone = '';
      twlocms.defaultZone = '';
   };
});