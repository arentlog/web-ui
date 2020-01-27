'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icswb',
      dataPath: 'api/ic/icswb',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'icswbRowidStr',  //WebHandler call requires Rowid as a String.
      recordName: 'icswb',
      primaryKeyParams: ['prod', 'whse', 'binloc'],
      createStateParams: {prod: null, whse: null},
      recentlyVisited: {
         title: { label: 'global.bin.loc', value: 'binloc', valueFunction: 'base.formatBinLoc' },
         description: [{label: 'global.product', value: 'prod'}, {label: 'global.warehouse', value: 'whse'}]
      }
   });
});

app.service('IcswbService', function ($state, MessageService, DataService, ConfigService, CommonConverters) {

   //This function overrides the standard Search with our custom version.
   this.search = function (self, criteria, scope, callback) {
      var requestCriteria = {
         prod: criteria.prod,
         whse: criteria.whse,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      DataService.post('/web/api/ic/icswbgetlist', { data: requestCriteria, busy: true }, function (data) {
         if (data.ttblicswbresults) {
            callback(data.ttblicswbresults);
         } else {
            //Important so we don't get residual data from previous searches if no records are returned.
            callback([]);
         }
      });
   };

   this.extendBaseController = function (self) {

      self.isIcswLoaded = false;

      self.formatBinLoc = function (icswb) {
         return CommonConverters.BinLoc.convert(icswb.binloc);
      };
      self.loadBinLocations = function (prod, whse) {
         self.binloc1 = null;
         self.binloc2 = null;
         self.brand = null;
         self.vendprod = null;
         self.mfgprod = null;

         var params = {
            prod: prod,
            whse: whse
         };

         DataService.get('api/ic/icsw/getbypk', { params: params }, function (data) {
            if (data) {
               self.binloc1 = data.binloc1;
               self.binloc2 = data.binloc2;
               self.vendprod = data.vendprod;
            }
         });

         params = { prod: prod };

         DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.brand = data.brandcode;
               self.mfgprod = data.mfgprod;
            }
         });
      };

      self.loadSearchBinLocs = function () {
         self.icswBinLoc1 = '';
         self.icswBinLoc2 = '';

         if (self.criteria.prod && self.criteria.whse) {
            var params = {
               prod: self.criteria.prod,
               whse: self.criteria.whse
            };

            DataService.get('api/ic/icsw/getbypk', { params: params }, function (data) {
               if (data) {
                  self.isIcswLoaded = true;
                  self.icswBinLoc1 = data.binloc1;
                  self.icswBinLoc2 = data.binloc2;
               }
            });
         } else {
            self.isIcswLoaded = false;
         }
      };
   };
   this.extendCreateController = function (self, base, icswb, scope, stateParams) {

      /* icsw hyperlinks to here */
      if (stateParams.prod) {
         icswb.prod = stateParams.prod;
      } else if (base.criteria.prod) {
         icswb.prod = base.criteria.prod;
      }

      if (stateParams.whse) {
         icswb.whse = stateParams.whse;
      } else if (base.criteria.whse) {
         icswb.whse = base.criteria.whse;
      }

      base.binloc1 = null;
      base.binloc2 = null;
      base.brand = null;
      base.vendprod = null;
      base.mfgprod = null;
   };
   this.extendDetailController = function (self, base, icswb) {

      self.getSubTitle = function () {
         return MessageService.get('global.product') + ': ' + self.icswb.prod + ' | ' +
              MessageService.get('global.warehouse') + ': ' + self.icswb.whse + ' | ' +
              MessageService.get('global.bin.location') + ': ' + CommonConverters.BinLoc.convert(icswb.binloc);
      };

      icswb.$promise.then(function () {
         base.loadBinLocations(self.icswb.prod, self.icswb.whse);
      });
   };

   this.extendSearchController = function (self, base) {

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('icswb.master');
         }

         base.loadSearchBinLocs();
         base.search();
      };
   };
});
