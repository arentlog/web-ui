'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'kp',
      menuFn: 'kpso',
      dataPath: 'api/kp/kpso',
      searchMethod: 'POST',
      searchPath: 'api/kp/kpso/getoptionsbyoptionname',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      recentlyVisited: {
         title: { label: 'global.option', value: 'optionname' },
         description: [{ label: 'global.sequence.number', value: 'seqno' }, { label: 'global.component', value: 'comprod' }]
      }
   });
});

app.service('KpsoService', function ($state, DataService, GridService, MessageService) {

   this.extendCreateController = function (self, base, kpso, scope) {

      kpso.optionname = base.criteria.optionname;
      kpso.printfl = true;
      kpso.pricefl = true;

      self.changeComponent = function () {
         var params = {
            prod: self.kpso.comprod,
            fldlist: 'unitstock'
         };

         // The back order checkbox is displayed based on the ICSP kit type and the transferable kit type. Set variable when the kit product changes
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {

            if (icsp) {
               kpso.unit = icsp.unitstock;
            }

         });
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

   this.extendDetailController = function (self, base, kpso, scope) {

      // Load Sub Title with Price Type
      self.getSubTitle = function () {
         return self.kpso.optionname;
      };

   };

});

