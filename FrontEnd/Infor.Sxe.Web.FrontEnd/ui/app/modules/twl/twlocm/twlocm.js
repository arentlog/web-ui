'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlocm',
      dataPath: 'api/twl/carrier',
      searchMethod: 'POST',
      searchPath: 'api/twl/carrier/gettwlcarriers',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlocm/create.json',
      postCreateState: '^.detail.edit',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.carrier', value: 'carrierId' }
      ],
      recentlyVisited: null
   });
});

app.service('TwlocmService', function ($state, DataService, MessageService, UserService, Utils) {

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

   this.extendCreateController = function (self, base, twlocm) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlocm.coNum = base.criteriaUsed.coNum;
      twlocm.whNum = base.criteriaUsed.whNum;

      twlocm.rowStatus = true;
      twlocm.carrier = '';
      twlocm.currentManifest = 0;
      twlocm.shipperId = '';
      twlocm.reqSize = 'N';
      twlocm.trailerRequired = 'N';
      twlocm.carrierType = '';
      twlocm.reqWeight = 'N';
      twlocm.shipAmount = 'O';
      twlocm.pmIrms = 'TWL';
   };

   this.extendDetailController = function (self, base, twlocm) {
      self.customSubmit = function () {
         if (Array.isArray(twlocm.loadOrderClasses)) {
            twlocm.loadOrderClasses = twlocm.loadOrderClasses.join();
         }
         self.submit();
      };

      // Load Multi Select Order Classes once object is created
      twlocm.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (twlocm.contact === 'GDPR Restricted Data' || twlocm.contact === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }

         if (twlocm.pmIrms.toUpperCase() === 'IRMS') {
            twlocm.pmIrms = 'TWL';
         }

         if (twlocm.loadOrderClasses) {
            twlocm.loadOrderClasses = twlocm.loadOrderClasses.split(',');
         }
      });
   };
});