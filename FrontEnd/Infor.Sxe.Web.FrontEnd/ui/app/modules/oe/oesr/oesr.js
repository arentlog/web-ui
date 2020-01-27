'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'oe',
      menuFn: 'oesr',
      dataPath: 'api/sa/sasr',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasr/getsasrdetails',
      searchResultsField: '',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whse' },
         { label: 'global.ship.via', value: 'shipvia' },
         { label: 'global.zone', value: 'zone'}
      ],
      recentlyVisited: {
         title: { label: 'global.zone', value: 'zone' },
         description: [{ label: 'global.warehouse', value: 'whse' }, { label: 'global.ship.via', value: 'shipvia' }]
      }
   });
});

app.service('OesrService', function ($state, DataService, GridService, MessageService, Utils, Sasoo) {

   this.extendBaseController = function (self) {

      // Write the updated rate data back to the table
      self.applyRateData = function (rateEntry, oesr) {
         for (var i = 1; i <= 500; i++) {
            var obj = rateEntry[i - 1];
            oesr['weightlimit' + i] = obj.weightlimit;
            oesr['rate' + i] = obj.rate;
         }
      };

   };

   this.extendCreateController = function (self, base, oesr, scope) {

      self.rateEntry = [];

      // Initialize the rate data grid when creating a new setup
      for (var i = 1; i <= 500; i++) {
         self.rateEntry.push({
            seqno: i,
            weightlimit: 0,
            rate: 0
         });
      }

      self.customSubmit = function () {

         // The SASR.WHSE field is mandatory so it will not execpt a null value however a blank warehouse is valid
         // If null, force to an empty string which will be accepted
         if (!self.oesr.whse) {
            oesr.whse = '';
         }

         base.applyRateData(self.rateEntry, oesr);

         self.submit();

      };

   };

   this.extendDetailController = function (self, base, oesr, scope) {

      self.rateEntry = [];

      oesr.$promise.then(function () {

         // Get the existing rate data for the record selected
         for (var i = 1; i <= 500; i++) {
            self.rateEntry.push({
               seqno: i,
               weightlimit: oesr['weightlimit' + i],
               rate: oesr['rate' + i]
            });
         }

      });

      self.customSubmit = function () {

         if (!self.oesr.whse) {
            oesr.whse = '';
         }

         base.applyRateData(self.rateEntry, oesr);

         self.submit();

      };

   };

});
