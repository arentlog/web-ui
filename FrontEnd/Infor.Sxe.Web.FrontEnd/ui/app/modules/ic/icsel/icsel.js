'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsel',
      dataPath: 'api/ic/icsel',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsel/lookup',
      searchResultsField: 'iclotlookupresults',
      searchRecordLimitField: 'recordlimit',
      resultsRowIdField: 'rowidIcsel',
      searchCriteria: { statustype: 'all' },
      createStateView: 'ic/icsel/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icsel/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/iclotcopy',
      copySubTitle: [
         { label: null, value: 'whse' },
         { label: null, value: 'prod' },
         { label: null, value: 'lotno' }
      ],
      detailSubTitle: [
         { label: null, value: 'whse' },
         { label: null, value: 'prod' },
         { label: null, value: 'lotno' }
      ],
      primaryKeyParams: ['prod', 'whse', 'lotno'],
      recentlyVisited: {
         title: { label: 'global.lot.number', value: 'lotno' },
         description: [
            { label: 'global.warehouse', value: 'whse' },
            { label: 'global.product', value: 'prod' }
         ]
      }
   });
});

app.service('IcselService', function ($state, DataService, MessageService, ConfigService, UserService, Utils, Sasoo, SecurityService) {
   this.extendDetailController = function (self, base, icsel) {
      self.sasoo = Sasoo;

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icsel', 'General') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icsel', 'Custom') < 3;

      icsel.$promise.then(function () {
         // the next line can be removed when a global fix for the case-sensitive issue is in place
         icsel.statustype = icsel.statustype.toUpperCase();
         var spcParams = {
            cProduct: icsel.prod
         };
         DataService.post('api/ic/asicsetup/geticlotspecpricelabel', { data: spcParams, busy: true }, function (data) {
            icsel.costLabel = data;
         });
         var params = { prod: icsel.prod, whse: icsel.whse };
         DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            icsel.onHand = data.qtyonhand;
         });
      });
   };
   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromprod = stateParams.object.prod;
      request.fromwhse = stateParams.object.whse;
      request.fromlotno = stateParams.object.lotno;
      request.toprod = stateParams.object.prod;
      request.towhse = stateParams.object.whse;
   };
   this.extendMasterController = function (self, base) {
      // Advanced search criteria object with initial values
      self.advCriteria = {
         statustype: 'all',
         recordlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'whse', label: MessageService.get('global.warehouse') },
         { value: 'prod', label: MessageService.get('global.product') },
         { value: 'statustype', label: MessageService.get('global.status') },
         { value: 'lotno', label: MessageService.get('global.lot.number') },
         { value: 'recordlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['lotno'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ic/icsel/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.iclotlookupresults;
            }
         });
      };
   };
});

app.controller('IcselDetailHistoryCtrl', function ($scope, DataService, Sasoo) {
   var self = this;
   var icsel = $scope.dtl.icsel;

   self.sasoo = Sasoo;

   icsel.$promise.then(function () {
      var historyCriteria = {
         prod: icsel.prod,
         whse: icsel.whse,
         lotno: icsel.lotno
      };

      DataService.post('api/ic/asicwhseprod/loadlotshistorytt', { data: historyCriteria, busy: true }, function (data) {
         self.historyList = data;
      });
   });
});

app.controller('IcselDetailCutsCtrl', function ($scope, DataService) {
   var self = this;
   var icsel = $scope.dtl.icsel;

   icsel.$promise.then(function () {
      // {cWhse}/{cProd}/{cLotno}
      var cutParams = {
         cWhse: icsel.whse,
         cProd: icsel.prod,
         cLotno: icsel.lotno
      };
      DataService.post('api/ic/asicentry/icgetlotcutdata', { data: cutParams, busy: true }, function (data) {
         self.cutsList = data;
      });
   });
});