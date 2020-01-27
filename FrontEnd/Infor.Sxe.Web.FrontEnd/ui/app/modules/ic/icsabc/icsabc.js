'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsabc',
      dataPath: 'api/ic/icsabc',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsabcloadtt',
      searchResultsField: '',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'icsabcrowid',
      recentlyVisited: {
         title: { label: 'global.warehouse', value: 'whse' },
         description: [
            { label: 'global.stock.type', value: 'stkoan' }
         ]
      }
   });
});

app.service('IcsabcService', function (DataService, MessageService, UserService, Utils, Sasoo) {

   this.extendDetailController = function (self, base, icsabc, scope) {

      // Pre-Load Field Values for Fields not in the Database
      icsabc.$promise.then(function () {

         self.salespctd = 100 - icsabc.salespcta - icsabc.salespctb - icsabc.salespctc;
         self.gmroipctd = icsabc.gmroipctc;
         self.hitspctd = 100 - icsabc.hitspcta - icsabc.hitspctb - icsabc.hitspctc;

      });

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + self.icsabc.whse + ' | ' +
            MessageService.get('global.stock.type') + ': ' + self.icsabc.stkoan;
      };

      // Field Calculations When Operator Changes Values
      self.calculatePercents = function () {
         icsabc.relwthits = 100 - icsabc.relwtsales - icsabc.relwtgmroi;
         icsabc.relimpd = 100 - icsabc.relimpa - icsabc.relimpb - icsabc.relimpc;
         icsabc.relsprdd = 100 - icsabc.relsprda - icsabc.relsprdb - icsabc.relsprdc;
         self.salespctd = 100 - icsabc.salespcta - icsabc.salespctb - icsabc.salespctc;
         self.gmroipctd = icsabc.gmroipctc;
         self.hitspctd = 100 - icsabc.hitspcta - icsabc.hitspctb - icsabc.hitspctc;
      };

   };

   this.extendCreateController = function (self, base, icsabc, scope) {

      // Field Defaults - Database Fields and Operator Warehouse
      self.icsabc = {
         cono: UserService.getCono(),
         whse: Sasoo.whse,
         stkoan: 'STK',
         relwthits: 100,
         relwtsales: 0,
         relwtgmroi: 0,
         relimpd: 100,
         relimpa: 0,
         relimpb: 0,
         relimpc: 0,
         relsprdd: 100,
         relsprda: 0,
         relsprdb: 0,
         relsprdc: 0,
         salespcta: 0,
         salespctb: 0,
         salespctc: 0,
         gmroipcta: 0,
         gmroipctb: 0,
         gmroipctc: 0,
         hitspcta: 0,
         hitspctb: 0,
         hitspctc: 0
      };

      // Field Defaults - Variables
      self.gmroipctd = 0;
      self.salespctd = 100;
      self.hitspctd = 100;

      // Clear the Sub Title - No Record Created Yet
      self.getSubTitle = function () {
         return MessageService.get('global.new')
      };

      // Field Calculations When Operator Changes Values
      self.calculatePercents = function () {
         self.icsabc.relwthits = 100 - self.icsabc.relwtsales - self.icsabc.relwtgmroi;
         self.icsabc.relimpd = 100 - self.icsabc.relimpa - self.icsabc.relimpb - self.icsabc.relimpc;
         self.icsabc.relsprdd = 100 - self.icsabc.relsprda - self.icsabc.relsprdb - self.icsabc.relsprdc;
         self.salespctd = 100 - self.icsabc.salespcta - self.icsabc.salespctb - self.icsabc.salespctc;
         self.gmroipctd = self.icsabc.gmroipctc;
         self.hitspctd = 100 - self.icsabc.hitspcta - self.icsabc.hitspctb - self.icsabc.hitspctc;
      };

   };
});

