'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oesz',
      dataPath: 'api/sa/sasz',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasz/getsaszlistallbyconowhseshipvia',
      searchResultsField: '',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whse' },
         { label: 'global.ship.via', value: 'shipvia' }
      ],
      recentlyVisited: {
         title: { label: 'global.zone', value: 'zone' },
         description: [{ label: 'global.warehouse', value: 'whse' }, { label: 'global.ship.via', value: 'shipvia' }]
      }
   });
});

app.service('OeszService', function ($state, DataService, GridService, MessageService, Utils, Sasoo) {

   this.extendCreateController = function (self, base, oesz) {

      self.customSubmit = function () {

         // The SASZ.WHSE field is mandatory so it will not execpt a null value however a blank warehouse is valid
         // If null, force to an empty string which will be accepted
         if (!self.oesz.whse) {
            oesz.whse = '';
         }

         // Since ship via is on the primary, unique index for SASZ, it cannot have a null, or undefined, value
         // If null, force to an empty string which will be accepted
         if (!self.oesz.shipvia) {
            oesz.shipvia = '';
         }

         self.submit();

      };

   };

   this.extendDetailController = function (self, base, oesz) {

      self.customSubmit = function () {

         if (!self.oesz.whse) {
            oesz.whse = '';
         }

         self.submit();

      };

   };

});