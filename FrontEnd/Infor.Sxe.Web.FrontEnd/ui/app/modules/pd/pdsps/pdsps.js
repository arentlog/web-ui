'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'pd',
      menuFn: 'pdsps',
      dataPath: 'api/pv/pvpdsps',
      searchMethod: 'POST',
      searchPath: 'api/pd/aspdsetup/pdpricesheetlist',
      searchResultsField: '',
      searchCriteria: { searchtype: 'W' },
      resultsRowIdField: 'pvPdspsRowID',
      detailSubTitle: [
         { label: 'global.price.sheet', value: 'pricesheet' },
         { label: '', value: 'whse' },
         { label: 'global.product', value: 'prod' }
      ],
      recentlyVisited: {
         title: { label: 'global.price.sheet', value: 'pricesheet' },
         description: [
            { label: '', value: 'whse' },
            { label: 'global.product', value: 'prod' }
         ]
      }
   });
});

app.service('PdspsService', function ($state, $translate, AodataService, DataService, MessageService, UserService, Sasc) {
   this.extendBaseController = function (self) {
      self.sasc = Sasc;
      self.RGN = 'RGN-';
      self.isPDPriceByRegion = AodataService.getValue('PD', 'pdpricebyregionfl').toUpperCase();
      self.isPriceRegion = false;
      if (self.sasc.pdwhsefl && self.isPDPriceByRegion === 'YES') {
         self.whseRegionLabel = MessageService.get('global.whse.regn');
         self.isPriceRegion = true;
      } else if (self.sasc.pdwhsefl && self.isPDPriceByRegion !== 'YES') {
         self.whseRegionLabel = MessageService.get('global.warehouse');
      } else if (!self.sasc.pdwhsefl && self.isPDPriceByRegion === 'YES') {
         self.whseRegionLabel = MessageService.get('global.region');
      }
      self.applyColumns = function (columnMatrix, pdsps) {
         // qtybrk 1-8, prcdisc 1-9
         for (var i = 0; i <= 8; i++) {
            var obj = columnMatrix[i];
            var seqNum = i + 1;
            pdsps['custmatrix' + seqNum] = obj.custmatrix;
            pdsps['vendmatrix' + seqNum] = obj.vendmatrix;
         }
      };
   };
   this.extendSearchController = function (self, base) {
      if (base.sasc.pdwhsefl && base.isPDPriceByRegion === 'YES') {
         base.criteria.searchtype = 'W';
      } else if (base.sasc.pdwhsefl && base.isPDPriceByRegion !== 'YES') {
         base.criteria.searchtype = 'W';
      } else if (!base.sasc.pdwhsefl && base.isPDPriceByRegion === 'YES') {
         base.criteria.searchtype = 'R';
      } else {
         base.criteria.searchtype = '';
      }
      // If the Type changes - clear out the keys
      base.changeSearchType = function () {
         base.criteria.whse = '';
         base.criteria.region = '';
      };
      // Region Search - Send Region in the Whse Field prefixed with RGN
      base.regionEntered = function () {
         if (base.criteria.region !== null) {
            base.criteria.whse = base.RGN  + base.criteria.region;
         } else {
            base.criteria.whse = '';
         }
      };
   };
   this.extendCreateController = function (self, base, pdsps) {
      pdsps.recordtype = '';
      if (base.sasc.pdwhsefl && base.isPDPriceByRegion !== 'YES') {
         pdsps.recordtype = 'W';
      } else if (!base.sasc.pdwhsefl && base.isPDPriceByRegion === 'YES') {
         pdsps.recordtype = 'R';
      }
      pdsps.whse = '';
      // If the Type changes - clear out the keys
      self.changeSearchType = function () {
         self.pdsps.whse = '';
         self.pdsps.region = '';
      };
      // Send Region in the Whse Field prefixed with RGN
      self.regionEntered = function () {
         if (self.pdsps.region !== null) {
            self.pdsps.whse = base.RGN  + self.pdsps.region;
         } else {
            self.pdsps.whse = '';
         }
      };
      self.columnMatrix = [
         { seqno: MessageService.get('number.1'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.2'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.3'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.4'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.5'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.6'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.7'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.8'), custmatrix: 0, vendmatrix: 0 },
         { seqno: MessageService.get('number.9'), custmatrix: 0, vendmatrix: 0 }
      ];
      self.customSubmit = function () {
         base.applyColumns(self.columnMatrix, pdsps);
         self.submit();
      };
   };
   this.extendDetailController = function (self, base, pdsps) {
      pdsps.$promise.then(function () {
         var whseRegion = pdsps.whse.substr(0, 4);
         pdsps.recordtype = '';
         if (base.isPriceRegion) {
            if (whseRegion.toUpperCase() === base.RGN) {
               pdsps.recordtype = 'R';
               pdsps.region = pdsps.whse.substr(4);
            } else if (whseRegion) {
               pdsps.recordtype = 'W';
            } else {
               pdsps.recordtype = '';
            }
         } else if (base.sasc.pdwhsefl && base.isPDPriceByRegion !== 'YES') {
            pdsps.recordtype = 'W';
         } else if (!base.sasc.pdwhsefl && base.isPDPriceByRegion === 'YES') {
            pdsps.recordtype = 'R';
            pdsps.region = pdsps.whse.substr(4);
         }
         self.columnMatrix = [
            { seqno: MessageService.get('number.1'), custmatrix: pdsps.custmatrix1, vendmatrix: pdsps.vendmatrix1 },
            { seqno: MessageService.get('number.2'), custmatrix: pdsps.custmatrix2, vendmatrix: pdsps.vendmatrix2 },
            { seqno: MessageService.get('number.3'), custmatrix: pdsps.custmatrix3, vendmatrix: pdsps.vendmatrix3 },
            { seqno: MessageService.get('number.4'), custmatrix: pdsps.custmatrix4, vendmatrix: pdsps.vendmatrix4 },
            { seqno: MessageService.get('number.5'), custmatrix: pdsps.custmatrix5, vendmatrix: pdsps.vendmatrix5 },
            { seqno: MessageService.get('number.6'), custmatrix: pdsps.custmatrix6, vendmatrix: pdsps.vendmatrix6 },
            { seqno: MessageService.get('number.7'), custmatrix: pdsps.custmatrix7, vendmatrix: pdsps.vendmatrix7 },
            { seqno: MessageService.get('number.8'), custmatrix: pdsps.custmatrix8, vendmatrix: pdsps.vendmatrix8 },
            { seqno: MessageService.get('number.9'), custmatrix: pdsps.custmatrix9, vendmatrix: pdsps.vendmatrix9 }
         ];
      });
      self.customSubmit = function () {
         base.applyColumns(self.columnMatrix, pdsps);
         self.submit();
      };
   };
});