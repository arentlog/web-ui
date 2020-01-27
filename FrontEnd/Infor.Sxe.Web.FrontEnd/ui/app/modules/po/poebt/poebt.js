'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('po', 'poebt', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('po', 'poebt');

   $stateProvider.state('poebt.receive', {
      url: '/receive',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poebt/receive.json');
            },
            controller: 'PoebtReceiveCtrl as rcv'
         }
      }
   });

   $stateProvider.state('poebt.putaway', {
      url: '/put-away',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poebt/putaway.json');
            },
            controller: 'PoebtPutAwayCtrl as pa'
         }
      }
   });
});

app.controller('PoebtBaseCtrl', function ($state, DataService, ConfigService) {
   var self = this;
   self.criteria = { readyASN: '3' };

   self.isMaster = function () {
      return $state.is('poebt.master');
   };

   self.includesMaster = function () {
      return $state.includes('poebt.master');
   };

   self.isDetail = function () {
      return $state.is('poebt.detail');
   };

   self.includesDetail = function () {
      return $state.includes('poebt.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.criteria.recordCountLimit = ConfigService.getDefaultRecordLimit();

      // Parse pono and posuf
      if (self.criteria.ponumber) {
         var orderDetails = self.criteria.ponumber.split('-');
         self.criteria.pono = orderDetails[0];
         self.criteria.posuf = orderDetails[1];
      } else {
         self.criteria.pono = 0;
         self.criteria.posuf = 0;
      }

      DataService.post('api/po/aspoentry/poebtgetdata', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   self.updatePoebt = function (poebtupdatedata) {
      DataService.post('api/po/aspoentry/poebtupdatecollection', { data: poebtupdatedata, busy: true }, function () {
         self.search();
      });
   };
});

app.controller('PoebtSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Set default search criteria
      criteria.readyASN = '3';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('poebt.master');
      }

      base.search();
   };
});

app.controller('PoebtMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Delete one or more rows
   self.deleteRows = function () {
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var poebtdeletebatch = [];

            records.forEach(function (record) {
               poebtdeletebatch.push({
                  pono: record.pono,
                  posuf: record.posuf,
                  shipmentid: record.shipmentid
               });
            });

            DataService.post('api/po/aspoentry/poebtdeletebatchcollection', { data: poebtdeletebatch, busy: true }, function () {
               base.search();
            });
         }
      });
   };

   // POIP hyperlink
   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('poip.detail', { pk: currentRow.pono, pk2: currentRow.posuf });
      }
   };

   // Set receive to No for one or more rows
   self.setReceiveNo = function () {
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.set.selection', 'question.set.selected.rows.to.no', function () {
         if (records && records.length) {
            var poebtupdatedata = [];

            records.forEach(function (record) {
               poebtupdatedata.push({
                  pono: record.pono,
                  posuf: record.posuf,
                  shipmentid: record.shipmentid,
                  receiptdt: null
               });
            });

            base.updatePoebt(poebtupdatedata);
         }
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('PoebtReceiveCtrl', function ($scope, $state, $stateParams, GridService, Utils) {
   var self = this;
   var base = $scope.base;

   self.receiptdt = Utils.getCurrentDate();

   // Save
   self.submit = function () {
      var records = GridService.getSelectedRecords(base.grid);

      if (records && records.length) {
         var poebtupdatedata = [];

         records.forEach(function (record) {
            poebtupdatedata.push({
               pono: record.pono,
               posuf: record.posuf,
               shipmentid: record.shipmentid,
               receiptdt: self.receiptdt
            });
         });

         base.updatePoebt(poebtupdatedata);
      }

      // Nav to master state (refresh of data is handled by update function)
      $state.go('^.master');
   };
});

app.controller('PoebtPutAwayCtrl', function ($scope, $state, $stateParams, GridService, DataService) {
   var self = this;
   var base = $scope.base;
   var DEFAULT_DETAIL_SUMMARY = 'd';
   var DEFAULT_SORT_ORDER = 'b';

   self.binloc = '';
   self.header = {
      lPrtOrdNeedProd: true,
      lStageBODemProds: true,
      lStageTagProds: true,
      lPrintVendNotes: false,
      lPrintProdNotes: false,
      cDetailSummary: DEFAULT_DETAIL_SUMMARY,
      cSortOrder: DEFAULT_SORT_ORDER
   };

   // Submit
   self.submit = function () {
      var details = [];
      var records = GridService.getSelectedRecords(base.grid);
      var binLength = self.binloc.length;

      if (records && records.length) {
         records.forEach(function (record) {
            details.push({
               pono: record.pono,
               posuf: record.posuf,
               shipmentid: record.shipmentid
            });
         });
      }

      self.header.cDefaultBin1 = '';
      self.header.cDefaultBin2 = '';
      self.header.cDefaultBin3 = '';
      self.header.cDefaultBin4 = '';

      // Parse binloc into individual elements
      for (var i = 0; i < binLength; i++) {
         if (i <= 1) {
            self.header.cDefaultBin1 += self.binloc.substr(i, 1);
         } else if (i > 1 && i <= 3) {
            self.header.cDefaultBin2 += self.binloc.substr(i, 1);
         } else if (i > 3 && i <= 6) {
            self.header.cDefaultBin3 += self.binloc.substr(i, 1);
         } else {
            self.header.cDefaultBin4 += self.binloc.substr(i, 1);
         }
      }

      var criteria = {
         poebtporiicriteriadetail: details,
         poebtporiicriteriaheader: self.header,
         printersettings: self.printerControl.printerSettings
      };

      DataService.post('api/po/aspoentry/poebtqueueputawayreport', { data: criteria, busy: true }, function () {
         // Nav back to master state and force refresh since grid data may now be stale
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };
});

app.controller('PoebtRowDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   var item = mst.rowParams.item;
   var grid = mst.rowParams.grid;
   var row = mst.rowParams.row;

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = mst.rowParams.itemCopy;

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   // Received Date changed
   self.dateChanged = function () {
      self.rowDetail.receivefl = self.rowDetail.receiptdt ? true : false;
   };

   // Ready ASN toggled
   self.readyChanged = function () {
      self.rowDetail.receiptdt = self.rowDetail.receivefl ? Utils.getCurrentDate() : null;
   };

   // Commit changes to the row
   self.submit = function () {
      var poebtupdatedata = [];

      poebtupdatedata.push({
         pono: item.pono,
         posuf: item.posuf,
         shipmentid: item.shipmentid,
         receiptdt: self.rowDetail.receiptdt
      });

      DataService.post('api/po/aspoentry/poebtupdatecollection', { data: poebtupdatedata, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // Collapse current row and refresh data
         grid.toggleRowDetail(row);
         base.search();
      });
   };
});