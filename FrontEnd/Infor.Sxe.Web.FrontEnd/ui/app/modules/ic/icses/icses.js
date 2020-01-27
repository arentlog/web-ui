'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icses',
      dataPath: 'api/ic/icses',
      searchMethod: 'POST',
      searchPath: 'api/ic/icses/lookup',
      searchResultsField: 'icseriallookupresults',
      searchRecordLimitField: 'recordlimit',
      resultsRowIdField: 'rowidIcses',
      createStateView: 'ic/icses/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icses/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/icserialcopy',
      copySubTitle: [
         { label: null, value: 'whse' },
         { label: null, value: 'prod' },
         { label: null, value: 'serialno' }
      ],
      detailSubTitle: [
         { label: null, value: 'whse' },
         { label: null, value: 'prod' },
         { label: null, value: 'serialno' }
      ],
      primaryKeyParams: ['prod', 'whse', 'serialno'],
      recentlyVisited: {
         title: { label: 'global.serial.number', value: 'serialno' },
         description: [
            { label: 'global.warehouse', value: 'whse' },
            { label: 'global.product', value: 'prod' }
         ]
      }
   });
});

app.service('IcsesService', function ($state, DataService, MessageService, ConfigService, UserService, Utils, Sasoo) {
   this.extendDetailController = function (self, base, icses) {
      self.sasoo = Sasoo;
      icses.$promise.then(function () {
         // the next line can be removed when a global fix for the case-sensitive issue is in place
         icses.currstatus = icses.currstatus.toUpperCase();
         icses.fullOrder = icses.orderno + '-' + Utils.pad(icses.ordersuf, 2);
         var spcParams = {
            cProduct: icses.prod
         };
         DataService.post('api/ic/asicsetup/geticlotspecpricelabel', { data: spcParams, busy: true }, function (data) {
            icses.costLabel = data;
         });
         var poCriteria = {
            whse: icses.whse,
            prod: icses.prod,
            serialno: icses.serialno
         };
         DataService.post('api/ic/asicsetup/icserialretrievepo', { data: poCriteria, busy: true }, function (data) {
            icses.potext = data.potext;
         });
      });
   };
   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromprod = stateParams.object.prod;
      request.fromwhse = stateParams.object.whse;
      request.fromserialno = stateParams.object.serialno;
      request.toprod = stateParams.object.prod;
      request.towhse = stateParams.object.whse;
   };
   this.extendMasterController = function (self, base) {
      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'whse', label: MessageService.get('global.warehouse') },
         { value: 'prod', label: MessageService.get('global.product') },
         { value: 'serialno', label: MessageService.get('global.serial.number') },
         { value: 'currstatus', label: MessageService.get('global.stage') },
         { value: 'custno', label: MessageService.get('global.customer.number') },
         { value: 'shipto', label: MessageService.get('global.ship.to') },
         { value: 'recordlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['serialno'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ic/icses/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.icseriallookupresults;
            }
         });
      };
   };
});