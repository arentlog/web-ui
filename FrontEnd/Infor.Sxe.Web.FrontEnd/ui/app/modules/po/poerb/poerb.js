'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('po', 'poerb', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('po', 'poerb');

   $stateProvider.state('poerb.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poerb/create.json');
            },
            controller: 'PoerbCreateCtrl as crt'
         }
      }
   });

   $stateProvider.state('poerb.detail', {
      url: '/detail',
      params: { pono: null, posuf: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poerb/detail.json');
            },
            controller: 'PoerbDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('poerb.detail.edit', {
      url: '/edit'
   });

   $stateProvider.state('poerb.detail.release', {
      url: '/release',
      params: { blanketReleaseLineItem: null },
      views: {
         release: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poerb/release.json');
            },
            controller: 'PoerbReleaseCtrl as rel'
         }
      }
   });
});

app.controller('PoerbBaseCtrl', function ($state, DataService) {
   var self = this;

   self.criteria = {};
   self.poBlanketValidateSingle = {};
   self.poBlanketResults = [];
   self.searchPoNo = 0;
   self.searchPoSuf = 0;

   self.isMaster = function () {
      return $state.is('poerb.master');
   };

   self.includesMaster = function () {
      return $state.includes('poerb.master');
   };

   self.isDetail = function () {
      return $state.is('poerb.detail');
   };

   self.isDetailOrEdit = function () {
      return $state.is('poerb.detail') || $state.is('poerb.detail.edit');
   };

   self.isCreate = function () {
      return $state.is('poerb.create');
   };

   self.includesDetail = function () {
      return $state.includes('poerb.detail');
   };

   // Perform search and update grid data
   self.search = function () {
      if (self.criteria.pono) {
         var poParts = self.criteria.pono.split('-');
         if (poParts.length === 2) {
            self.searchPoNo = parseInt(poParts[0], 10);
            self.searchPoSuf = parseInt(poParts[1], 10);
         }

         var validateCriteria = {
            poblanketcriteria: { pono: self.searchPoNo },
            poblanketresults: []
         };

         DataService.post('api/po/aspoentry/poerbvalidateblanketorder', { data: validateCriteria, busy: true }, function (data) {
            if (data.poblanketvalidatesingle) {
               self.poBlanketValidateSingle = data.poblanketvalidatesingle;
            } else {
               self.poBlanketValidateSingle = {};
            }

            self.buildgrid();
         });
      } else {
         self.searchPoNo = 0;
         self.searchPoSuf = 0;
         self.poBlanketValidateSingle = {};
         self.dataset = [];
      }
   };

   self.buildgrid = function () {
      if (self.searchPoNo) {
         DataService.post('api/po/aspoentry/poerbbuildblankettemptable', { data: { pono: self.searchPoNo }, busy: true }, function (data) {
            self.dataset = data.poblanketresults;
         });
      }
   };
});

app.controller('PoerbSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.searchPoNo = 0;
      base.searchPoSuf = 0;
      base.poBlanketValidateSingle = {};
   };

   // Hyperlink to POIP
   self.navigateToPoip = function () {
      var poParts = base.criteria.pono.split('-');
      if (poParts.length === 2) {
         $state.go('poip.detail', { pk: parseInt(poParts[0], 10), pk2: parseInt(poParts[1], 10) });
      }
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('poerb.master');
      }

      base.search();
   };
});

app.controller('PoerbMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, SecurityService) {
   var self = this;
   var base = $scope.base;

   // Delete one or more rows
   self.deleteRows = function () {
      var FUNCTION_NAME = 'poerb';
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var poblanketdeleteorders = [];

            records.forEach(function (record) {
               poblanketdeleteorders.push({
                  pono: record.pono,
                  posuf: record.posuf,
                  transtype: record.transtype,
                  stagecd: record.stagecd
               });
            });

            DataService.post('api/po/aspoentry/poerbdeleteblanketreleases', {
               data: {
                  poblanketdeletecriteria: {
                     secure: SecurityService.getSecurityLevel(FUNCTION_NAME)
                  },
                  poblanketdeleteorders: poblanketdeleteorders
               },
               busy: true
            }, function () {
               // Returned 'data' is not used here, we just refresh the grid
               base.buildgrid();
            });
         }
      });
   };

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         if (record.stagecd != 0) {
            MessageService.info('global.information', 'message.this.release.has.already.been.converted');
         } else {
            // Drill down to detail view and start in edit mode
            $state.go('^.detail.edit', { pono: record.pono, posuf: record.posuf });
         }
      }
   };

   // POIP hyperlink
   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('poip.detail', { pk: currentRow.pono, pk2: currentRow.posuf });
      }
   };

   // APIV hyperlink
   self.vendorInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('PoerbCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var POERB_TABLENAME = 'poeh';

   self.pono = base.searchPoNo;
   self.posuf = base.searchPoSuf;

   // Bill To Warehouse change
   self.billToSelected = function () {
      if (self.billToWarehouse && self.poblanketreleasesingle &&
         self.billToWarehouse !== self.poblanketreleasesingle.billtowhse) {

         self.poblanketreleasesingle.billtowhse = self.billToWarehouse;

         var criteria = {
            poblanketreleasecriteria: {
               pono: self.poblanketreleasesingle.pono,
               posuf: self.poblanketreleasesingle.posuf
            },
            poblanketreleasesingle: self.poblanketreleasesingle
         };

         DataService.post('api/po/aspoentry/poerbdisplaybilltoinformation', { data: criteria, busy: true }, function (data) {
            self.poblanketreleasesingle = data;
         });
      }
   };

   /**
    * Load the GeoCode lookup criteria
    */
   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: POERB_TABLENAME,
         pono: self.poblanketreleasesingle.pono,
         posuf: 0,
         city: self.poblanketreleasesingle.shiptocity,
         state: self.poblanketreleasesingle.shiptost,
         zipcd: self.poblanketreleasesingle.shiptozip,
         geocd: self.poblanketreleasesingle.geocd,
         country: self.poblanketreleasesingle.countrycd,
         streetaddr: self.poblanketreleasesingle.shiptoaddr1,
         outofcityfl: self.poblanketreleasesingle.outofcityfl
      };
   };

   // Ship From change
   self.shipFmSelected = function () {
      // Convert to int (Lookup returns a string)
      var newShipFrom = self.shipFromNumber ? parseInt(self.shipFromNumber, 10) : 0;

      if (newShipFrom && self.poblanketreleasesingle &&
         newShipFrom !== self.poblanketreleasesingle.shipfmno) {

         self.poblanketreleasesingle.shipfmno = newShipFrom;

         var criteria = {
            poblanketreleasecriteria: {
               pono: self.poblanketreleasesingle.pono,
               posuf: self.poblanketreleasesingle.posuf
            },
            poblanketreleasesingle: self.poblanketreleasesingle
         };

         DataService.post('api/po/aspoentry/poerbdisplayshipfmnoinformation', { data: criteria, busy: true }, function (data) {
            self.poblanketreleasesingle = data;
         });
      }
   };

   // Ship To Warehouse change
   self.shipToSelected = function () {
      if (self.shipToWarehouse && self.poblanketreleasesingle &&
         self.shipToWarehouse !== self.poblanketreleasesingle.shiptowhse) {

         self.poblanketreleasesingle.shiptowhse = self.shipToWarehouse;

         var criteria = {
            poblanketreleasecriteria: {
               pono: self.poblanketreleasesingle.pono,
               posuf: self.poblanketreleasesingle.posuf
            },
            poblanketreleasesingle: self.poblanketreleasesingle
         };

         DataService.post('api/po/aspoentry/poerbdisplayshiptoinformation', { data: criteria, busy: true }, function (data) {
            self.poblanketreleasesingle = data;
         });
      }
   };

   // Save
   self.submit = function () {
      if (self.pono) {

         var criteria = {
            poblanketreleasecriteria: {
               pono: self.pono,
               posuf: self.poblanketreleasesingle.posuf
            },
            poblanketreleasesingle: self.poblanketreleasesingle
         };

         if (self.addressControl.validate()) {
            DataService.post('api/po/aspoentry/poerbcreatenewblanketrelease', { data: criteria, busy: true }, function (data) {
               if (!MessageService.processMessaging(data)) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');

                  // Refresh the master grid with the new release row
                  base.buildgrid();

                  // Navigate to detail drilldown view after creating new release and place in edit mode
                  $state.go('^.detail.edit', { pono: self.poblanketreleasesingle.pono, posuf: self.poblanketreleasesingle.posuf });
               }
            });
         }
      }
   };

   if (self.pono) {
      // We only pass po number to this call, not suffix
      var setupCriteria = { pono: self.pono };

      DataService.post('api/po/aspoentry/poerbsetupscreenfornextrelease', { data: setupCriteria, busy: true }, function (data) {
         self.poblanketreleasesingle = data;
         self.releaseCount = (data.posuf - 1);
         self.vendorNumber = data.vendno;
         self.shipFromNumber = data.shipfmno;
         self.shipToWarehouse = data.shiptowhse;
         self.billToWarehouse = data.billtowhse;
      });
   }
});

app.controller('PoerbDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils, GridService, SecurityService) {
   var self = this;
   var pono = $stateParams.pono;
   var posuf = $stateParams.posuf;
   var PERCENT = '%';
   var POERB_TABLENAME = 'poeh';
   var TAX_TYPE_T = 't';

   self.isTaxInterfaceSUT = false;
   self.activeTab = '';

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('poerb', 'Header') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('poerb', 'Line Items') < 3;

   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: POERB_TABLENAME,
         pono: self.poblanketheadersingle.pono,
         posuf: self.poblanketheadersingle.posuf,
         city: self.poblanketheadersingle.shiptocity,
         state: self.poblanketheadersingle.shiptost,
         zipcd: self.poblanketheadersingle.shiptozipcd,
         geocd: self.poblanketheadersingle.geocd,
         country: self.poblanketheadersingle.shiptocountry,
         streetaddr: self.poblanketheadersingle.shiptoaddr1,
         outofcityfl: self.poblanketheadersingle.outofcityfl
      };
   };

   /**
    * Initialize the detail banner/info fields
    */
   function initializeBanner() {
      var criteria = {
         pono: pono,
         posuf: posuf
      };

      DataService.post('api/po/aspoentry/poerbinitializebannner', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.poblanketbannersingle = data;
            self.fullPONumber = data.pono + '-' + Utils.pad(data.posuf, 2);
            self.detailsHeader = MessageService.get('global.purchase.order.number') + ': ' + self.fullPONumber;
            self.canUpdateByRelease = self.poblanketbannersingle.posuf === 0 ? true : false;

            // Once complete initialize the header using banner data
            initializeHeader();
         }
      });
   }

   /**
    * Initialize the detail 'header' tab fields
    */
   function initializeHeader() {
      var criteria = {
         pono: self.poblanketbannersingle.pono,
         posuf: self.poblanketbannersingle.posuf
      };

      // Initialize the header fields
      DataService.post('api/po/aspoentry/poerbdisplayblanketheader', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.poblanketheadersingle = data;
            self.isTaxInterfaceSUT = self.poblanketheadersingle.taxinterfacety.toLowerCase() === TAX_TYPE_T ? true : false;
            self.vendorNumber = self.poblanketheadersingle.vendno;
            self.shipFromNumber = self.poblanketheadersingle.shipfmno;
            self.discountType = self.poblanketheadersingle.wodisctype ? self.poblanketheadersingle.currsymbol : PERCENT;
         }
      });
   }

   /**
    * Initialize the detail 'lines' tab fields
    */
   self.initializeLines = function () {
      var criteria = {
         pono: pono,
         posuf: posuf
      };

      DataService.post('api/po/aspoentry/poerbbuildblanketlines', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.datasetLines = data.poblanketlinesresults;
            self.poblanketlinessingle = data.poblanketlinessingle;
         }
      });
   };

   // Set the editing condition per row
   self.isAllowEdit = function (row, cell, value, column, item) {
      return item.allowedit ? true : false;
   };

   // Cancel
   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   // Nav Backwards
   self.navBack = function () {
      // Nav back to master state and force refresh since grid data may now be stale
      $state.go('poerb.master', { refreshSearch: true }, { reload: 'poerb.master' });
   };

   // Cell change line items grid
   self.onCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = self.datasetLines[args.row];

         if (record && record.allowedit) {
            var blanketLinesCriteria = {
               lineno: record.lineno,
               pono: self.poblanketbannersingle.pono,
               posuf: self.poblanketbannersingle.posuf
            };

            var criteria = {
               poblanketlinescriteria: blanketLinesCriteria,
               poblanketlinessingle: self.poblanketlinessingle,
               poblanketlinesresults: self.datasetLines
            };

            DataService.post('api/po/aspoentry/poerbupdateblanketline', { data: criteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.datasetLines = data.poblanketlinesresults;
                     self.grid.loadData(self.datasetLines);
                  } else {
                     // Error returned in messaging - back out change
                     record.qtyord = args.oldValue;
                     self.datasetLines[args.row] = record;
                     self.grid.renderRows();
                  }
               }
            },
            // Error returned in cErrorMessage - back out change
            function () {
               record.qtyord = args.oldValue;
               self.datasetLines[args.row] = record;
               self.grid.renderRows();
            });
         }
      }
   };

   // Reset
   self.reset = function () {
      $state.go('^.edit', null, { reload: '^' });
   };

   // Ship From change
   self.shipFmSelected = function () {
      // Convert to int (Lookup returns a string)
      var newShipFrom = self.shipFromNumber ? parseInt(self.shipFromNumber, 10) : 0;

      if (self.poblanketheadersingle &&
         newShipFrom !== self.poblanketheadersingle.shipfmno) {

         self.poblanketheadersingle.shipfmno = newShipFrom;

         var criteria = {
            poblanketheadercriteria: {
               pono: self.poblanketheadersingle.pono,
               posuf: self.poblanketheadersingle.posuf
            },
            poblanketheadersingle: self.poblanketheadersingle
         };

         DataService.post('api/po/aspoentry/poerbupdateblanketheadershipviaty', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.poblanketheadersingle = data;
            }
         });
      }
   };

   // Save
   self.submit = function () {
      var criteria = {
         poblanketheadercriteria: {
            pono: self.poblanketheadersingle.pono,
            posuf: self.poblanketheadersingle.posuf
         },
         poblanketheadersingle: self.poblanketheadersingle
      };

      if (self.addressControl.validate()) {
         DataService.post('api/po/aspoentry/poerbupdateblanketheader', { data: criteria, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               self.poblanketheadersingle = data;

               // Navigate from edit mode but stay in detail
               $state.go('^', null, { reload: '^' });
            }
         });
      }
   };

   // Navigate to Update By Release view
   self.updateByRelease = function () {
      var record = GridService.getSelectedRecord(self.grid);

      if (record) {
         var selectedLine = {
            pono: self.poblanketbannersingle.pono,
            posuf: self.poblanketbannersingle.posuf,
            lineno: record.lineno
         };
         $state.go('poerb.detail.release', { blanketReleaseLineItem: selectedLine });
      }
   };

   if (pono) {
      initializeBanner();
      self.initializeLines();
   }
});

app.controller('PoerbReleaseCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var blanketReleaseLineItem = $stateParams.blanketReleaseLineItem;
   var fullPoNumber = '';
   var poBlanketUpdByReleaseCrit = {};

   // Nav Backwards
   self.navBack = function () {
      // Perform final update when finished updating by release
      finalUpdate();

      // Get updated lines list on detail view as we nav back
      $scope.dtl.initializeLines();
      $state.go('^');
   };

   // Cell change update by release line items grid
   self.onCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = self.dataset[args.row];

         if (record) {
            var releaseCriteria = {
               lineno: blanketReleaseLineItem.lineno,
               pono: record.pono,
               posuf: record.posuf
            };

            var criteria = {
               poblanketupdbyreleasecrit: releaseCriteria,
               poblanketupdbyreleasesingle: self.poblanketupdbyreleasesingle,
               poblanketupdbyrelresults: self.dataset
            };

            DataService.post('api/po/aspoentry/poerbblanketupdbyreleaseupdate', { data: criteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.dataset = data.poblanketupdbyrelresults;
                     self.poblanketupdbyreleasesingle = data.poblanketupdbyreleasesingle;
                     self.grid.loadData(self.dataset);
                  } else {
                     // Error returned in messaging - back out change
                     record.qtyord = args.oldValue;
                     self.dataset[args.row] = record;
                     self.grid.renderRows();
                  }
               }
            },
            // Error returned in cErrorMessage - back out change
            function () {
               record.qtyord = args.oldValue;
               self.dataset[args.row] = record;
               self.grid.renderRows();
            });
         }
      }
   };

   function finalUpdate() {
      // If one or more suffixes have been modified, need to run final update when leaving view
      if (self.poblanketupdbyreleasesingle.brsuffixlist) {
         var updateCriteria = {
            lineno: blanketReleaseLineItem.lineno,
            pono: blanketReleaseLineItem.pono,
            posuf: blanketReleaseLineItem.posuf
         };

         var criteria = {
            poblanketupdbyreleasecrit: updateCriteria,
            poblanketupdbyreleasesingle: self.poblanketupdbyreleasesingle,
            poblanketupdbyrelresults: self.dataset
         };

         DataService.post('api/po/aspoentry/poerbblanketupdbyreleasefinalupdate', { data: criteria, busy: true }, function (data) {
            if (data) {
               // Only processing here is to display any returned messages
               MessageService.processMessaging(data.messaging);
            }
         });
      }
   }

   if (blanketReleaseLineItem) {
      fullPoNumber = blanketReleaseLineItem.pono + '-' + Utils.pad(blanketReleaseLineItem.posuf, 2);

      self.detailsHeader = MessageService.get('po.number') + ': ' + fullPoNumber + ' | ' +
         MessageService.get('global.line.number') + ': ' + blanketReleaseLineItem.lineno;

      poBlanketUpdByReleaseCrit = {
         pono: blanketReleaseLineItem.pono,
         posuf: blanketReleaseLineItem.posuf,
         lineno: blanketReleaseLineItem.lineno
      };

      DataService.post('api/po/aspoentry/poerbinitblanketupdbyrelease', { data: poBlanketUpdByReleaseCrit, busy: true }, function (data) {
         if (data) {
            self.dataset = data.poblanketupdbyrelresults;
            self.poblanketupdbyreleasesingle = data.poblanketupdbyreleasesingle;
         }
      });
   }
});

app.controller('PoerbRowDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   var item = mst.rowParams.item;
   var grid = mst.rowParams.grid;
   var row = mst.rowParams.row;

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = angular.copy(item);

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {
      // Convert to int (Lookup returns a string)
      var newShipFrom = self.rowDetail.shipfmno ? parseInt(self.rowDetail.shipfmno, 10) : 0;

      // If the ship from has changed or has been cleared, need to first validate the change
      if (newShipFrom !== item.shipfmno) {
         var checkCriteria = {
            pono: item.pono,
            posuf: item.posuf,
            vendno: item.vendno,
            shipfmno: newShipFrom
         };

         DataService.post('api/po/aspoentry/poerbcheckchangeofshipfmno', { data: checkCriteria, busy: true }, function (data) {
            if (data) {
               self.rowDetail.name = data.name;
               self.rowDetail.descrip = data.shipviadesc;
               self.rowDetail.shipviaty = data.shipviaty;

               // Once validated commit the row changes
               commitRow();
            }
         });
      } else {
         // No validation required, just commit the row
         commitRow();
      }
   };

   function commitRow() {
      var commitCriteria = {
         pono: self.rowDetail.pono,
         posuf: self.rowDetail.posuf,
         shipfmno: self.rowDetail.shipfmno,
         shiptowhse: self.rowDetail.shiptowhse,
         billtowhse: self.rowDetail.billtowhse,
         orderdt: self.rowDetail.orderdt,
         shipviaty: self.rowDetail.shipviaty
      };

      DataService.post('api/po/aspoentry/poerbupdateexistingorder', { data: commitCriteria, busy: true }, function () {
         // Returned 'data' is not used here, we just refresh the grid
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // Collapse current row and refresh data
         grid.toggleRowDetail(row);
         base.buildgrid();
      });
   }
});