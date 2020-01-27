'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'kp',
      menuFn: 'kpsg',
      dataPath: 'api/kp/kpsg',
      searchMethod: 'POST',
      searchPath: 'api/kp/kpsg/getgroupsbygroupnameandsequencenumber',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      recentlyVisited: {
         title: { label: 'global.group', value: 'groupname' },
         description: [{ label: 'global.sequence.number', value: 'seqno' }, { label: 'global.component', value: 'comprod' }]
      }
   });
});

app.service('KpsgService', function ($state, DataService, GridService, MessageService) {

   this.extendCreateController = function (self, base, kpsg) {

      kpsg.groupname = base.criteria.groupname;
      kpsg.reqfl = true;
      kpsg.printfl = true;
      kpsg.pricefl = true;

      self.changeComponent = function () {
         var params = {
            prod: self.kpsg.comprod,
            fldlist: 'unitstock'
         };

         // The back order checkbox is displayed based on the ICSP kit type and the transferable kit type. Set variable when the kit product changes
         DataService.get('api/ic/icsp/getbypk', { params: params }, function (icsp) {

            if (icsp) {
               kpsg.unit = icsp.unitstock;
            }

         });
      };

   };

   this.extendMasterController = function (self) {

      self.productInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ICIP HyperLink
         if (currentRow && currentRow.comprod) {
            $state.go('icip.detail', { pk: currentRow.comprod });
         }

      };

   };

   this.extendDetailController = function (self, base, kpsg, scope) {

      // Load Sub Title with Price Type
      self.getSubTitle = function () {
         return self.kpsg.groupname;
      };

   };

});
