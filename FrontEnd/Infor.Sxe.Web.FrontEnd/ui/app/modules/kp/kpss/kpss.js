'use strict';

app.config(function (StateProvider, $stateProvider) {
   StateProvider.addSetupStates({
      module: 'kp',
      menuFn: 'kpss',
      dataPath: 'api/kp/kpss',
      searchMethod: 'POST',
      searchPath: 'api/kp/kpss/getkpsslist',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      recentlyVisited: {
         title: { label: 'global.component', value: 'prod' },
         description: [{ label: 'global.sequence.number', value: 'seqno' }, { label: 'global.substitute', value: 'comprod' }]
      }
   });

   $stateProvider.state('kpss.create.copyXref', {
      url: '/copy-xref',
      params: { prod: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('kp/kpss/copy-xref.json');
            },
            controller: 'KpssCopyXrefCtrl as cxf'
         }
      }
   });

});

app.service('KpssService', function ($state, DataService, GridService, MessageService) {

   this.extendCreateController = function (self, base, kpss, scope) {

      kpss.prod = base.criteria.prod;

      self.copyXref = function () {
         $state.go('.copyXref', {prod: kpss.prod});
      };

   };

   this.extendMasterController = function (self, base, scope) {

      self.productInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ICIP HyperLink
         if (currentRow && currentRow.comprod) {
            $state.go('icip.detail', { pk: currentRow.comprod });
         }

      };

   };

   this.extendDetailController = function (self, base, kpss, scope) {

      // Load Sub Title with Price Type
      self.getSubTitle = function () {
         return self.kpss.prod;
      };

   };

});

app.controller('KpssCopyXrefCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.copySelection = '1';

   // Determine if there are existing KPSS records for the component that the user just entered
   if ($stateParams.prod) {

      var subCriteria = {
         prod: $stateParams.prod
      };

      DataService.post('api/kp/kpss/getkpsslist', { data: subCriteria, busy: true }, function (data) {
         if (data) {
            self.message = MessageService.get('message.warning.kp.substitute.records.already.exist.for');
         } else {
            self.message = MessageService.get('message.no.kp.substitute.records.exist.for.this.product');
         }
      });

   } else {
      self.message = MessageService.get('message.no.kp.substitute.records.exist.for.this.product');
   }

   self.submit = function () {
      // Create or update KPSS data based on user selection
      var data = {
         cProduct: $stateParams.prod,
         iChoice: parseInt(self.copySelection, 10)
      };

      DataService.post('api/kp/askpsetup/kpcopysubstitutes', { data: data }, function () {
         base.criteria.prod = $stateParams.prod;
         base.refreshSearch = true;
         $state.go('kpss.master', null, { reload: 'kpss.master' });
      });

   };

   self.cancel = function () {
      MessageService.info('global.information', 'message.no.copy.from.ic.xref.occurred');
   };

});