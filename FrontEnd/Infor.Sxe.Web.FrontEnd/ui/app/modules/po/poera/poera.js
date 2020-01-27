'use strict';

app.config(function ($stateProvider, ProductWarehouseUsageStateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('po', 'poera', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('po', 'poera');

   $stateProvider.state('poera.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/detail.json');
            },
            controller: 'PoeraDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('poera.runreport', {
      url: '/run-report',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/run-report.json');
            },
            controller: 'PoeraRunReportCtrl as runrpt'
         }
      }
   });

   $stateProvider.state('poera.merge', {
      url: '/merge',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/merge.json');
            },
            controller: 'PoeraMergeCtrl as mrg'
         }
      }
   });

   $stateProvider.state('poera.refreshdocuments', {
      url: '/refresh-documents',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/refresh-documents.json');
            },
            controller: 'PoeraRefreshDocumentsCtrl as rshdoc'
         }
      }
   });

   $stateProvider.state('poera.vendorchange', {
      url: '/vendor-change',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/vendor-change.json');
            },
            controller: 'PoeraVendorChangeCtrl as vndchg'
         }
      }
   });

   $stateProvider.state('poera.vendorcredit', {
      url: '/vendor-credit',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/vendor-credit.json');
            },
            controller: 'PoeraVendorCreditCtrl as vndcrd'
         }
      }
   });

   $stateProvider.state('poera.drilldown', {
      url: '/drilldown',
      params: { drillDownRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/drilldown.json');
            },
            controller: 'PoeraDrillDownCtrl as drldwn'
         }
      }
   });

   $stateProvider.state('poera.drilldown.create', {
      url: '/create',
      params: {
         isSurplusMode: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/tabs/line-detail.json');
            },
            controller: 'PoeraDrillDownLineCreateCtrl as drldwndetl'
         }
      }
   });

   $stateProvider.state('poera.drilldown.shoppinglistsearch', {
      url: '/shopping-list-search',
      params: {
         shoppingListRecommended: null,
         shoppingListOrdered: null,
         productSearchCallback: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/tabs/shopping-list-search.json');
            },
            controller: 'PoeraDrillDownShoppingListSearch as shpsrch'
         }
      }
   });

   $stateProvider.state('poera.drilldown.headerincreasedecrease', {
      url: '/header-increase-decrease',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/tabs/header-increase-decrease.json');
            },
            controller: 'PoeraDrillDownHeaderIncreaseDecrease as hdrincr'
         }
      }
   });

   $stateProvider.state('poera.drilldown.customerreservation', {
      url: '/customer-reservation',
      params: { prod: null, whse: null },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/customer-reservation/customer-reservation.json');
            },
            controller: 'CustomerReservationCtrl as cstres'
         }
      }
   });

   $stateProvider.state('poera.drilldown.customerforecast', {
      url: '/customer-forecast',
      params: { prod: null, whse: null, unit: null, reportno: 0 },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/customer-forecast/customer-forecast.json');
            },
            controller: 'CustomerForecastCtrl as cstfor'
         }
      }
   });

   $stateProvider.state('poera.drilldown.supersede', {
      url: '/supersede',
      params: {
         detailRecord: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/tabs/line-super.json');
            },
            controller: 'PoeraDrillDownLineSuperCtrl as drldwnsuper'
         }
      }
   });

   $stateProvider.state('poera.drilldown.programbuy', {
      url: '/program-buy',
      params: {
         detailRecord: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/tabs/line-programbuy.json');
            },
            controller: 'PoeraDrillDownLineProgBuy as drldwnprogbuy'
         }
      }
   });

   $stateProvider.state('poera.drilldown.lineitemdrilldown', {
      url: '/line-item',
      params: {
         detailRecord: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poera/tabs/lineitem-drilldown.json');
            },
            controller: 'PoeraDrillDownLineItemDrillDownCtrl as drldwnli'
         }
      }
   });

   ProductWarehouseUsageStateProvider.addStates('po', 'poera', 'poera.drilldown.lineitemdrilldown');
   ProductWarehouseUsageStateProvider.addStates('po', 'poera', 'poera.drilldown.create');
   ProductWarehouseUsageStateProvider.addStates('po', 'poera', 'poera.drilldown');
});

app.controller('PoeraBaseCtrl', function ($state, DataService, ConfigService, GridService, MessageService, Sasoo, SecurityService, TabService) {
   var self = this;
   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('poera', 'Header') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('poera', 'Line Items') < 3;
   self.isShoppingTabReadonly = SecurityService.getSubSecurityLevel('poera', 'Shopping List') < 3;
   self.isRrarTabReadonly = SecurityService.getSubSecurityLevel('poera', 'RRAR Msg') < 3;

   var FUNCTION_NAME = 'poera';

   self.criteria = {
      buyer: '',
      whse: '',
      vendno: 0,
      frtconsolidation: '',
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   self.updateRecord = {
      whse: '',
      vendno: 0,
      prodline: '',
      mergefl: false,
      billtowhse: '',
      shipfmno: 0,
      buyer: '',
      reportno: 0,
      rowidPoerah: 0
   };

   self.totals = {
      mergeamount: 0,
      mergecubes: 0,
      mergeweight: 0,
      mergeqtyordered: 0,

      totalamount: 0,
      totalcubes: 0,
      totalweight: 0,
      totalqtyordered: 0
   };

   self.runReport = {
      buyer: '',
      vendno: 0,
      whse: '',
      prodline: '',
      useplinefl: false,
      printusagehistfl: false,
      printaltvendorsfl: false,
      printsubsfl: false,
      printblfl: false,
      printrushfl: false,
      prodlinefl: false,
      printdnrfl: false,
      printlnignorefl: false,
      printcommentsfl: false,
      halfwayfl: false,
      whsesurplus: '',
      processtype: ''
   };

   self.vendorChangeRecord = {
      rowidPoerah: 0,
      reportno: 0,
      vendno: 0,
      prodline: '',
      whse: '',
      shipfmno: 0,
      repricefl: false,
      usechaindiscfl: false,
      baselisttype: '',
      baselistfl: false,
      multiplierdisctype: '',
      multiplierdiscfl: false,
      multiplier: 0,
      disc1: 0,
      disc2: 0,
      disc3: 0,
      disc4: 0,
      disc5: 0,
      disc6: 0,
      disc7: 0,
      disc8: 0,
      disc9: 0,
      disc10: 0,
      disc11: 0,
      disc12: 0,
      disc13: 0,
      disc14: 0,
      disc15: 0,
      disc16: 0,
      disc17: 0,
      disc18: 0,
      disc19: 0
   };

   self.inDrillDownOperation = false;
   self.drillDownRecord = {
      reportno: 0,
      vendno: 0,
      whse: '',
      prodline: '',
      rowidPoerah: 0,
      sourcety: ''
   };

   // Used in shared/usage-analysis/usage-analysis.js
   self.usageAnalysis = {
      prod: '',
      whse: '',
      reportno: 0, // Not the poerah.reportno - rather icamr.reportno
      secure: SecurityService.getSecurityLevel(FUNCTION_NAME)
   };

   self.drillDownLineItemRecord = {
      reportno: 0,
      rowidPoeral: 0,
      lineno: 0,
      seqno: 0,
      shipprod: '',
      custnumber: 0,
      custname: '',
      blno: 0,
      blsuf: 0,
      specnsttype: ''
   };

   self.drillDownLabel = '';

   self.isHomeWhse = Sasoo.homewhsefl;
   self.homeWhse = Sasoo.whse;

   self.vendCreditVendorNumber = 0;
   self.vendorCreditsList = [];
   self.addMode = false;
   self.isInAddMode = function () {
      return self.addMode;
   };

   self.runNewReport = false;
   self.mergeLaunched = false;
   self.runReportLaunched = false;
   self.refreshDocumentsLaunched = false;
   self.vendorChangeLaunched = false;
   self.vendorCreditLaunched = false;
   self.headerIncreaseDecreaseLaunched = false;
   self.isRunReportSelectionFieldsEnabled = function () {
      return self.runNewReport;
   };

   self.refreshAllPLines = false;
   self.isRefreshAllPLinesEnabled = function () {
      return self.refreshAllPLines;
   };

   self.isMaster = function () {
      return $state.is('poera.master');
   };

   self.includesMaster = function () {
      return $state.includes('poera.master');
   };

   self.isDetail = function () {
      return $state.is('poera.detail');
   };

   self.includesDetail = function () {
      return $state.includes('poera.detail');
   };

   self.isDrillDown = function () {
      return $state.is('poera.drilldown');
   };

   self.isLineItemDrillDown = function () {
      return $state.is('poera.drilldown.lineitemdrilldown');
   };

   self.isSurplusItemDrillDown = function () {
       return $state.is('poera.drilldown.create');
   };

   self.runReportLaunch = function () {
      self.runNewReport = true;
      self.runReport.buyer = self.criteria.buyer;
      self.runReport.vendno = 0;
      self.runReport.whse = '';
      self.runReport.prodline = '';
      self.runReport.useplinefl = false;

      self.refreshAllPLines = false;
      self.runReportLaunched = true;
      $state.go('poera.runreport');
   };

   self.runMergeLaunch = function () {
      self.mergeLaunched = true;
      $state.go('poera.merge');
   };

   self.displaySearchTotals = function (totals, mergeOnly) {
      self.totals.mergeamount = totals.mergeamount;
      self.totals.mergeamountstring = Locale.formatNumber(totals.mergeamount, { style: 'decimal', maximumFractionDigits: 2 });
      self.totals.mergecubes = totals.mergecubes;
      self.totals.mergecubesstring = Locale.formatNumber(totals.mergecubes, { style: 'decimal', maximumFractionDigits: 2 });
      self.totals.mergeweight = totals.mergeweight;
      self.totals.mergeweightstring = Locale.formatNumber(totals.mergeweight, { style: 'decimal', maximumFractionDigits: 2 });
      self.totals.mergeqtyordered = totals.mergeqtyordered;
      self.totals.mergeqtyorderedstring = Locale.formatNumber(totals.mergeqtyordered, { style: 'decimal', maximumFractionDigits: 2 });

      if (!mergeOnly) {
         self.totals.totalamount = totals.totalamount;
         self.totals.totalamountstring = Locale.formatNumber(totals.totalamount, { style: 'decimal', maximumFractionDigits: 2 });
         self.totals.totalcubes = totals.totalcubes;
         self.totals.totalcubesstring = Locale.formatNumber(totals.totalcubes, { style: 'decimal', maximumFractionDigits: 2 });
         self.totals.totalweight = totals.totalweight;
         self.totals.totalweightstring = Locale.formatNumber(totals.totalweight, { style: 'decimal', maximumFractionDigits: 2 });
         self.totals.totalqtyordered = totals.totalqtyordered;
         self.totals.totalqtyorderedstring = Locale.formatNumber(totals.totalqtyordered, { style: 'decimal', maximumFractionDigits: 2 });
      }
   };

   // Perform search and update data set for the grid
   self.search = function (isSoftUpdate) {
      DataService.post('api/po/aspoentry/porrarreportlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            if (isSoftUpdate) {
               GridService.softUpdateDataset(self.grid, data.porrarreptlistresults, 'rowidPoerah');
            } else {
               self.dataset = data.porrarreptlistresults;
            }

            if (data.porrarrepttotals) {
               self.displaySearchTotals(data.porrarrepttotals, false);
            }
         }
      });
   };

   TabService.canUserCloseTab('poera.master', function () {
      if (self.inDrillDownOperation) {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      } else {
         return true;
      }
   });
});

app.controller('PoeraSearchCtrl', function ($scope, $state, DataService, ConfigService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.setDefaultWarehouse = function () {
      if (base.isHomeWhse) {
         base.criteria.whse = base.homeWhse;
      }
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      self.setDefaultWarehouse();
      criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      criteria.vendno = 0;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('poera.master');
      }

      base.search();
   };

   self.setDefaultWarehouse();
});

app.controller('PoeraMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.mergeTotals = {
      mergeamount: 0,
      mergecubes: 0,
      mergeweight: 0,
      mergeqtyordered: 0
   };

   self.isBuyerEntered = function () {
      var retn = false;
      if (base.criteria.buyer) {
         retn = true;
      }
      return retn;
   }

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.gridCellChange = function (e, args) {
      var record = base.dataset[args.row];
      if (args.column.field.toLowerCase() === 'mergefl') {
         //Which will only be one in this case, the call expects a collection.
         var rrarsToUpdate = [];
         rrarsToUpdate.push(
         {
            rowidPoerah: record.rowidPoerah,
            mergefl: record.mergefl
         });

         self.mergeTotals.mergeamount = base.totals.mergeamount;
         self.mergeTotals.mergecubes = base.totals.mergecubes;
         self.mergeTotals.mergeweight = base.totals.mergeweight;
         self.mergeTotals.mergeqtyordered = base.totals.mergeqtyordered;

         DataService.post('api/po/aspoentry/porrarreportadjustmerge', { data: { porrarreptadjmergerepts: rrarsToUpdate, porrarreptadjmergetotals: self.mergeTotals }, busy: true }, function (data) {
            if (data) {
               base.displaySearchTotals(data, true);
            }
            var indx = base.dataset.indexOf(record);
            base.grid.updateRow(indx);
         });
      }
   };

   self.updateMergeFlag = function (flag) {
      if (base.grid) {

         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length) {
            var rrarsToUpdate = [];

            records.forEach(function (record) {
               record.mergefl = flag;
               rrarsToUpdate.push(
               {
                  rowidPoerah: record.rowidPoerah,
                  mergefl: flag
               });
            });

            self.mergeTotals.mergeamount = base.totals.mergeamount;
            self.mergeTotals.mergecubes = base.totals.mergecubes;
            self.mergeTotals.mergeweight = base.totals.mergeweight;
            self.mergeTotals.mergeqtyordered = base.totals.mergeqtyordered;

            DataService.post('api/po/aspoentry/porrarreportadjustmerge', { data: { porrarreptadjmergerepts: rrarsToUpdate, porrarreptadjmergetotals: self.mergeTotals }, busy: true }, function (data) {
               if (data) {
                  base.displaySearchTotals(data, true);
               }
               records = GridService.getSelectedRecords(base.grid);
               records.forEach(function (record) {
                  var indx = base.dataset.indexOf(record);
                  base.grid.updateRow(indx);
               });
            });
         }
      }
   };

   self.deleteRows = function () {
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var rrarsToDelete = [];
            var seqNo = 0;

            records.forEach(function (record) {
               seqNo++;
               rrarsToDelete.push(
               {
                  rowidPoerah: record.rowidPoerah,
                  seqno: seqNo
               });
            });

            DataService.post('api/po/aspoentry/porrarreportdelete', { data: { porrarreptdeleterepts: rrarsToDelete, porrarrepttotals: base.totals }, busy: true }, function () {
               base.search();
            });
         }
      });
   };

   self.fullRefresh = function () {
      var records = GridService.getSelectedRecords(base.grid);
      base.runReport.buyer = base.criteria.buyer;
      base.runReport.vendno = 0;
      base.runReport.whse = '';
      base.runReport.prodline = '';
      base.runReport.useplinefl = false;

      base.refreshAllPLines = false;

      if (records && records.length) {
         if (records.length === 1) {
            base.runReport.vendno = records[0].vendno;
            base.runReport.whse = records[0].whse;
            base.runReport.prodline = records[0].prodline;
            if (!base.runReport.prodline) {
               base.refreshAllPLines = true;
            }
         }
      }
      base.runReportLaunched = true;
      base.runNewReport = false;
      $state.go('poera.runreport');
   };

   self.refreshDocuments = function () {
      base.refreshDocumentsLaunched = true;
      $state.go('^.refreshdocuments');
   };

   self.vendorChange = function () {
      var records = GridService.getSelectedRecords(base.grid);
      if (records && records.length) {
         if (records.length === 1) {
            base.vendorChangeRecord.reportno = records[0].reportno;
            base.vendorChangeRecord.vendno = records[0].vendno;
            base.vendorChangeRecord.shipfmno = records[0].shipfmno;
            base.vendorChangeRecord.whse = records[0].whse;
            base.vendorChangeRecord.prodline = records[0].prodline;
            base.vendorChangeRecord.rowidPoerah = records[0].rowidPoerah;

            base.vendorChangeLaunched = true;
            $state.go('^.vendorchange');
         } else {
            MessageService.error('global.error', 'message.please.select.one.row.for.the.vendor.change');
         }
      }
   };


   self.poipHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem && lineItem.blno) {
         $state.go('poip.detail', { pk: lineItem.blno, pk2: lineItem.blsuf });
      }
   };

   self.takeVendorCredit = function () {
      var records = GridService.getSelectedRecords(base.grid);
      if (records && records.length) {
         if (records.length === 1) {
            base.vendorCreditLaunched = true;
            base.vendCreditVendorNumber = records[0].vendno;
            $state.go('^.vendorcredit');
         } else {
            MessageService.error('global.error', 'message.please.select.one.row.for.the.take.vendor.credit.f');
         }
      }
   };

   self.create = function () {
      base.addMode = true;
      base.updateRecord.whse = '';
      base.updateRecord.vendno = ''; //Initializing as blank and not zero so Submit/Validate works properly
      base.updateRecord.prodline = '';
      base.updateRecord.mergefl = false;
      base.updateRecord.billtowhse = '';
      base.updateRecord.reportno = 0;
      base.updateRecord.shipfmno = 0;
      base.updateRecord.buyer = base.criteria.buyer;
      $state.go('^.detail');
   };

   self.edit = function () {
      base.addMode = false;
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         base.updateRecord.whse = singleRecord.whse;
         base.updateRecord.vendno = singleRecord.vendno;
         base.updateRecord.prodline = singleRecord.prodline;
         base.updateRecord.mergefl = singleRecord.mergefl;
         base.updateRecord.billtowhse = singleRecord.billtowhse;
         base.updateRecord.reportno = singleRecord.reportno;
         base.updateRecord.shipfmno = singleRecord.shipfmno;
         base.updateRecord.buyer = singleRecord.buyer;
         base.updateRecord.rowidPoerah = singleRecord.rowidPoerah;
      }
      $state.go('^.detail');
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;

      base.drillDownRecord.reportno = record.reportno;
      base.drillDownRecord.whse = record.whse;
      base.drillDownRecord.vendno = record.vendno;
      base.drillDownRecord.prodline = record.prodline;
      base.drillDownRecord.rowidPoerah = record.rowidPoerah;
      base.drillDownLabel =
         MessageService.get('global.report.number') + ': ' +
         base.drillDownRecord.reportno;

      DataService.get('api/po/aspoentry/porrarreportcheckdrilldownaccess/' + base.drillDownRecord.reportno, { busy: true }, function () {
         base.inDrillDownOperation = true;
         $state.go('poera.drilldown', { drillDownRecord: JSON.stringify(base.drillDownRecord) });
      });
   };
});

app.controller('PoeraDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.addingNewReport = {
      vendno: 0,
      whse: '',
      prodline: '',
      reportno: 0,
      buyer: '',
      rowidPoerah: 0
   };

   self.detailTitle = MessageService.get('global.add.blank.rrar...');
   var addMode = base.isInAddMode();
   if (!addMode) {
      self.detailTitle = MessageService.get('global.edit.details') + ' ' + base.updateRecord.reportno;
   }

   // Save
   self.submit = function () {
      var addMode = base.isInAddMode();

      if (addMode) {

         self.addingNewReport.vendno = base.updateRecord.vendno;
         self.addingNewReport.whse = base.updateRecord.whse;
         self.addingNewReport.prodline = base.updateRecord.prodline;
         self.addingNewReport.buyer = base.criteria.buyer;
         self.addingNewReport.reportno = 0;

         DataService.post('api/po/poerah/getpoerahlistbyvendwhseprodline', { data: self.addingNewReport, busy: true }, function (data) {

            var existingReportsCount = 0;
            if (data) {
               existingReportsCount = data.length;
            }
            if (existingReportsCount === 0) {
               self.submitAddModeICSLQuestion();
            } else {
               var ques = MessageService.get('question.warning.a.po.rrar.report.already.exists.for.this.');
               MessageService.okCancel('global.question', ques, function () {
                  self.submitAddModeICSLQuestion();
               });
            }
         });
      } else {

         DataService.post('api/po/aspoentry/porrarreportupdate', { data: { porrarreptupdatesingle: base.updateRecord, porrarreptupdatetotals: base.totals }, busy: true }, function (data) {
            // The totals will be returned from this SI call and be bound to the base object.
            var singleRecord = GridService.getSelectedRecord(base.grid);
            if (singleRecord) {

               singleRecord.mergefl = base.updateRecord.mergefl;
               singleRecord.billtowhse = base.updateRecord.billtowhse;
               singleRecord.buyer = base.updateRecord.buyer;
               singleRecord.mergefl = base.updateRecord.mergefl;
               var indx = base.dataset.indexOf(singleRecord);
               base.grid.updateRow(indx);
            }

            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master');
         });
      }
   };

   self.submitAddModeICSLQuestion = function () {
      DataService.post('api/ic/icsl/geticsllistbywhsevendnoprodline', { data: self.addingNewReport, busy: true }, function (data) {

         var existingICSLCount = 0;
         if (data) {
            existingICSLCount = data.length;
         }
         if (existingICSLCount === 0) {
            self.submitAddModeUpdate();
         } else {

            var buyer = data[0].buyer;
            if (buyer) {
               if (buyer !== base.criteria.buyer) {
                  var ques = MessageService.get('question.warning.a.po.rrar.report.diff.buyer');
                  MessageService.okCancel('global.question', ques, function () {
                     self.submitAddModeUpdate();
                  });
               } else {
                  self.submitAddModeUpdate();
               }
            } else {
               self.submitAddModeUpdate();
            }
         }
      });
   };

   self.submitAddModeUpdate = function () {

      var criterialList = [];
      criterialList.push(self.addingNewReport);

      DataService.post('api/po/aspoentry/porrarreportaddnew', { data: criterialList, busy: true }, function (data) {
         self.addingNewReport.reportno = data[0].newreportno;
         self.addingNewReport.rowidPoerah = data[0].rowidPoerah;
         MessageService.info('global.information', $translate.instant('message.save.operation.completed.successfully.report.number') + ' ' + self.addingNewReport.reportno);
         self.launchDrillDownAfterAdd();
      });
   };

   self.launchDrillDownAfterAdd = function () {

      base.drillDownRecord.reportno = self.addingNewReport.reportno;
      base.drillDownRecord.whse = self.addingNewReport.whse;
      base.drillDownRecord.vendno = self.addingNewReport.vendno;
      base.drillDownRecord.prodline = self.addingNewReport.prodline;
      base.drillDownRecord.rowidPoerah = self.addingNewReport.rowidPoerah;
      base.drillDownLabel =
         MessageService.get('global.report.number') + ': ' +
         base.drillDownRecord.reportno;

      DataService.get('api/po/aspoentry/porrarreportcheckdrilldownaccess/' + base.drillDownRecord.reportno, { busy: true }, function (data) {
         base.inDrillDownOperation = true;
         $state.go('poera.drilldown', { drillDownRecord: JSON.stringify(base.drillDownRecord) });
      });
   };
});

app.controller('PoeraRunReportCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;

   // First time in here
   if (base.runReportLaunched) {

      DataService.get('api/po/aspoentry/porrarreportnewreptinit/' + base.criteria.buyer, { busy: true }, function (data) {
         if (data) {
            base.runReport.whsesurplus = data.whsesurplus;
            base.runReport.processtype = data.processtype;
            base.runReport.printusagehistfl = data.printusagehistfl;
            base.runReport.printaltvendorsfl = data.printaltvendorsfl;
            base.runReport.printsubsfl = data.printsubsfl;
            base.runReport.printblfl = data.printblfl;
            base.runReport.printrushfl = data.printrushfl;
            base.runReport.prodlinefl = data.prodlinefl;
            base.runReport.printdnrfl = data.printdnrfl;
            base.runReport.printlnignorefl = data.printlnignorefl;
            base.runReport.printcommentsfl = data.printcommentsfl;
            base.runReport.halfwayfl = data.halfwayfl;
         }
      });
   }

   self.submit = function () {
      if (base.runNewReport) {
         var criteria = {
            porrarreptnewreptrun: base.runReport,
            printersettings: {}
         };

         criteria.printersettings = self.printerControl.printerSettings;
         DataService.post('api/po/aspoentry/porrarreportnewreptrun', { data: criteria, busy: true }, function (data) {

            // don't force a refresh since no rows are changed
            $state.go('^.master');
         });
      } else {
         var rrarsToRefresh = [];
         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length) {
            records.forEach(function (record) {
               rrarsToRefresh.push(
               {
                  reportno: record.reportno
               });
            });

            var criteriaRefresh = {
               porrarreptfullrefreshrun: base.runReport,
               printersettings: {},
               porrarreptfullrefreshrunrpts: rrarsToRefresh
            };
            criteriaRefresh.printersettings = self.printerControl.printerSettings;
            DataService.post('api/po/aspoentry/porrarreportfullrefreshrun', { data: criteriaRefresh, busy: true }, function (data) {

               // don't force a refresh since no rows are changed
               $state.go('^.master');
            });
         }
      }
   };
});

app.controller('PoeraMergeCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.mergeAllReports = 'c';
   self.mergeReports = {
      orderdtmonth: '**',
      orderdtday: '**',
      orderdtyear: '**',
      printpofl: false,
      printourprodfl: false,
      convertfl: false,
      deleteunmergefl: false,
      faxwhereapprfl: false,
      ediwhereapprfl: false,
      edifile: '',
      poorder: '',
      mergenonstock: '',
      centwhseoverride: '',
      progbuypotype: '',
      progbuyconswhse: '',
      progbuyconsperwhse: '',
      progbuywodiscfl: false
   };

   self.printSettingsCollection = [];
   self.rrarsToMerge = [];

   // First time in here
   if (base.mergeLaunched) {
      DataService.get('api/po/aspoentry/porrarreportmergeinit/' + base.criteria.buyer, { busy: true }, function (data) {
         if (data) {
            self.mergeReports.orderdtmonth = data.orderdtmonth;
            self.mergeReports.orderdtday = data.orderdtday;
            self.mergeReports.orderdtyear = data.orderdtyear;
            self.mergeReports.printpofl = data.printpofl;
            self.mergeReports.printourprodfl = data.printourprodfl;
            self.mergeReports.convertfl = data.convertfl;
            self.mergeReports.deleteunmergefl = data.deleteunmergefl;
            self.mergeReports.faxwhereapprfl = data.faxwhereapprfl;
            self.mergeReports.ediwhereapprfl = data.ediwhereapprfl;
            self.mergeReports.edifile = data.edifile;
            self.mergeReports.poorder = data.poorder;
            self.mergeReports.mergenonstock = data.mergenonstock;
            self.mergeReports.centwhseoverride = data.centwhseoverride;
            self.mergeReports.progbuypotype = data.progbuypotype;
            self.mergeReports.progbuyconswhse = data.progbuyconswhse;
            self.mergeReports.progbuyconsperwhse = data.progbuyconsperwhse;
            self.mergeReports.progbuywodiscfl = data.progbuywodiscfl;

            // Retrieve the POERM "template" stored report (if one exists for the buyer)
            var templatePOERM = '@rm' + base.criteria.buyer;
            var params = {
               reportnm: templatePOERM
            };
            DataService.get('api/sa/sapb/getbypk', { params: params, busy: true }, function (data2) {
               if (data2) {
                  if (data2.currproc && data2.currproc.toLowerCase() === 'poerm') {
                     var printerCriteria = { cFunctionName: 'poerm', cSubFunction: '', cReportName: templatePOERM };

                     // Get printer object for the main output (Purchase Orders)
                     DataService.post('api/shared/assharedentry/printerinitialize', { data: printerCriteria, busy: true }, function (data3) {
                        if (data3) {
                           self.purchaseOrderPrinterControl.printerSettings = data3;

                           // Get printer object for the Exception Report
                           var printerForException = { cFunctionName: 'poerm', cSubFunction: 'Printer for Exception Report', cReportName: templatePOERM };
                           DataService.post('api/shared/assharedentry/printerinitialize', { data: printerForException, busy: true }, function (data4) {
                              if (data4) {                                
                                 self.exceptionPrinterControl.buildPrintTypeDropDown(data4.printtypes);
                                 self.exceptionPrinterControl.printerSettings = data4;
                              }
                           });
                        }
                     });
                  }                
               }
            });

            //User Hook (do not rename)
            if (self.initializeMergeContinue) {
               self.initializeMergeContinue();
            }
         }
      });
   }
   
   self.submit = function () {

      // Clear out the arrays
      self.printSettingsCollection = [];
      self.rrarsToMerge = [];

      self.purchaseOrderPrinterControl.printerSettings.printerinstance = 'merge-purchaseorder';
      self.exceptionPrinterControl.printerSettings.printerinstance = 'merge-exception';

      // Add the latest printer objects (need shared printer object UI)
      self.printSettingsCollection.push(self.purchaseOrderPrinterControl.printerSettings);
      self.printSettingsCollection.push(self.exceptionPrinterControl.printerSettings);

      if (base.grid && base.dataset) {
         if (self.mergeAllReports === 'c') {
            // RRAR Reports that are checked (selected)
            var records = GridService.getSelectedRecords(base.grid);
            if (records && records.length) {
               records.forEach(function (record) {
                  self.rrarsToMerge.push(
                  {
                     rowidPoerah: record.rowidPoerah
                  });
               });
            }
         } else {
            // All RRAR Reports
            var len = base.dataset.length;
            for (var i = 0; i < len; i++) {
               var record = base.dataset[i];
               if (record && record.mergefl) {
                  self.rrarsToMerge.push(
                  {
                     rowidPoerah: record.rowidPoerah
                  });
               }
            }
         }
      }

      if (self.rrarsToMerge.length === 0) {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.that.is.ready.to.be');
         $state.go('^.master');
      } else {
         DataService.post('api/po/aspoentry/porrarreportmergerun', { data: { cBuyer: base.criteria.buyer, printersettings: self.printSettingsCollection, porrarreptmergerunrepts: self.rrarsToMerge, porrarreptmergerunsngl: self.mergeReports }, busy: true }, function (data) {

            // don't force a refresh since no rows are changed
            $state.go('^.master');
         });
      }
   };
});

app.controller('PoeraRefreshDocumentsCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.viewTitle = '';
   self.documentRefreshed = {
      added: 0,
      changed: 0,
      deleted: 0
   };

   self.saveButtonEnabled = false;
   self.isSaveButtonEnabled = function () {
      return self.saveButtonEnabled;
   };

   // First time in here
   if (base.refreshDocumentsLaunched) {
      self.saveButtonEnabled = true;
      self.documentRefreshed.added = 0;
      self.documentRefreshed.changed = 0;
      self.documentRefreshed.deleted = 0;
      self.viewTitle = "";
      var records = GridService.getSelectedRecords(base.grid);
      if (records && records.length) {
         if (records.length === 1) {
            self.viewTitle = records[0].reportno;
         } else {
            self.viewTitle = records.length + ' Reports To Be Refreshed';
         }
      }
   }

   self.submit = function () {

      self.saveButtonEnabled = false;

      self.rrarsToRefresh = [];
      var records = GridService.getSelectedRecords(base.grid);
      if (records && records.length) {
         records.forEach(function (record) {
            self.rrarsToRefresh.push(
            {
               rowidPoerah: record.rowidPoerah
            });
         });
      }
      DataService.post('api/po/aspoentry/porrarreportrefreshdocuments', { data: { porrarreptrefreshdocrepts: self.rrarsToRefresh, porrarrepttotals: base.totals }, busy: true }, function (data) {
         if (data) {
            if (data.porrarrepttotals) {
               self.documentRefreshed.added = data.porrarrepttotals.nolinesadded;
               self.documentRefreshed.changed = data.porrarrepttotals.nolineschanged;
               self.documentRefreshed.deleted = data.porrarrepttotals.nolinesdeleted;
            }
            if (data.cWarningMessage) {
               MessageService.info('global.warning', data.cWarningMessage);
            }
            base.search();
            // Allow the user to see the record counts and click on the go back button.
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      });
   };
});

app.controller('PoeraVendorChangeCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   if (base.vendorChangeLaunched) {
      // initialize view controls
      base.vendorChangeRecord.repricefl = false;
      base.vendorChangeRecord.usechaindiscfl = false;
      base.vendorChangeRecord.baselistfl = false;
      base.vendorChangeRecord.baselisttype = 'l';
      base.vendorChangeRecord.multiplierdiscfl = false;
      base.vendorChangeRecord.multiplierdisctype = 'd';
      base.vendorChangeRecord.multiplier = 0;
      base.vendorChangeRecord.disc1 = 0;
      base.vendorChangeRecord.disc2 = 0;
      base.vendorChangeRecord.disc3 = 0;
      base.vendorChangeRecord.disc4 = 0;
      base.vendorChangeRecord.disc5 = 0;
      base.vendorChangeRecord.disc6 = 0;
      base.vendorChangeRecord.disc7 = 0;
      base.vendorChangeRecord.disc8 = 0;
      base.vendorChangeRecord.disc9 = 0;
      base.vendorChangeRecord.disc10 = 0;
      base.vendorChangeRecord.disc11 = 0;
      base.vendorChangeRecord.disc12 = 0;
      base.vendorChangeRecord.disc13 = 0;
      base.vendorChangeRecord.disc14 = 0;
      base.vendorChangeRecord.disc15 = 0;
      base.vendorChangeRecord.disc16 = 0;
      base.vendorChangeRecord.disc17 = 0;
      base.vendorChangeRecord.disc18 = 0;
      base.vendorChangeRecord.disc19 = 0;
   }

   self.submit = function () {
      base.vendorChangeRecord.multiplierdiscfl = false;
      if (base.vendorChangeRecord.multiplierdisctype === 'm') {
         base.vendorChangeRecord.multiplierdiscfl = true;
      }
      base.vendorChangeRecord.baselistfl = false;
      if (base.vendorChangeRecord.baselisttype === 'b') {
         base.vendorChangeRecord.baselistfl = true;
      }
      DataService.post('api/po/aspoentry/porrarreportvendorchange', { data: { porrarrepttotals: base.totals, porrarreptvendchgsingle: base.vendorChangeRecord }, busy: true }, function (data) {

         if (data) {
            if (data.porrarrepttotals) {
               base.displaySearchTotals(data.porrarrepttotals, false);
            }
            if (data.porrarreptvendchgsingle) {
               var records = GridService.getSelectedRecords(base.grid);
               records.forEach(function (record) {
                  record.vendno = data.porrarreptvendchgsingle.vendno;
                  record.shipfmno = data.porrarreptvendchgsingle.shipfmno;
                  record.prodline = data.porrarreptvendchgsingle.prodline;
                  record.consty = data.porrarreptvendchgsingle.consty;
                  record.lookupnm = data.porrarreptvendchgsingle.lookupnm;
                  record.pcttarget = data.porrarreptvendchgsingle.pcttarget;
                  record.totlineamti = data.porrarreptvendchgsingle.totlineamti;
                  record.totcubesi = data.porrarreptvendchgsingle.totcubesi;
                  record.totweighti = data.porrarreptvendchgsingle.totweighti;
                  record.totqtyordi = data.porrarreptvendchgsingle.totqtyordi;
                  record.revcyclin = data.porrarreptvendchgsingle.revcyclin;
                  record.lastpowtdt = data.porrarreptvendchgsingle.lastpowtdt;
                  var indx = base.dataset.indexOf(record);
                  base.grid.updateRow(indx);
               });
            }
         }

         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // don't force a refresh since no rows are changed
         $state.go('^.master');
      });

   };
});

app.controller('PoeraVendorCreditCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.isVendorNumberEnabled = function () {
      // Vendor # is always disabled
      return false;
   };

   if (base.vendorCreditLaunched) {
      DataService.get('api/po/aspoentry/porrarvendorcreditretrieve/' + base.vendCreditVendorNumber, { busy: true }, function (data) {
         if (data) {
            base.vendorCreditsList = data;
            self.vendorCredits = angular.copy(base.vendorCreditsList);
         }
      });
   }

   self.onCellChange = function (e, args) {
      var record = self.vendorCredits[args.row];
      if (record) {
         if (args.value <= record.origrem) {
            record.remamt = record.origrem - args.value;
         } else {
            record.usenow = record.origrem;
            self.grid.updateCell(args.row, args.cell, record.usenow);
         }

         if (record.usenow === 0) {
            record.remamt = record.origrem;
         }
      }
   };

   self.submit = function () {
      self.updateList = [];

      self.vendorCredits.forEach(function (record) {
         if (record.usenow > 0) {
            self.updateList.push(
            {
               pdsvcrecno: record.pdsvcrecno,
               contactno: record.contractno,
               startdt: record.startdt,
               enddt: record.enddt,
               maxqty: record.maxqty,
               actqty: record.actqty,
               remamt: record.remamt,
               usenow: record.usenow,
               changed: record.changed
            });
         }
      });

      DataService.post('api/po/aspoentry/porrarvendorcreditupdate', { data: { porrarvendcredit: self.updateList, dVendorNo: base.vendCreditVendorNumber }, busy: true }, function (data) {
      });

      MessageService.info('global.information', 'message.save.operation.completed.successfully');

      // don't force a refresh since no rows are changed
      $state.go('^.master');
   };
});

//Alias: drldwn
app.controller('PoeraDrillDownCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService, SecurityService, UserService, ModalService) {
   var self = this;
   var base = $scope.base;
   self.MENU_FUNCTION_ICSW = 'icsw';
   self.COLUMN_QTYORD = 'qtyord';
   self.COLUMN_UNIT = 'unit';
   self.PERCENT_SYMBOL = $translate.instant('symbol.percent');

   self.securityLevelICSW = SecurityService.getSecurityLevel(self.MENU_FUNCTION_ICSW);
   self.drillDownRecord = JSON.parse($stateParams.drillDownRecord);

   var POERAH_TABLENAME = 'poerah';

   self.saveButtonEnabled = false;
   self.combineInquiryList = [];
   self.combineInquiryTotals = {};
   self.headerTabSelected = false;
   self.lineItemTabSelected = true;
   self.supersedeAvailButtonEnable = false;
   self.qtybreakButtonEnable = false;
   self.genericGridColumnCollection = ["qtyord", "price", "contractno"];

   self.productForNotes = '';

   self.lineItemTotals = {
      totqtyordered: 0,
      totqtyorderedstring: '',
      totqtyorderedtarget: '',
      totlineamount: 0,
      totlineamountstring: '',
      totlineamounttarget: '',
      totweight: 0,
      totweightstring: '',
      totweighttarget: '',
      totcubes: 0,
      totcubesstring: '',
      totcubestarget: '',
      targetbuy: 0,
      purchprio: '',
      currencydesc: ''
   };

   self.lineItemsList = [];
   self.headerData = {};
   self.shipToAddressEnabled = false;
   self.termsEnabled = false;
   self.resaleEnabled = false;
   self.consolidateLineEnabled = false;
   self.consolidateWhseEnabled = false;
   self.singleLineItem = {};

   self.errorMessagesCriteria = {
      reportno: 0,
      lineno: 0,
      seqno: 0,
      leveltype: 'h'
   };
   self.errorMessagesResults = [];

   self.updateLineItemRecord = {
      reportno: 0,
      lineno: 0,
      shipprod: '',
      qtyord: 0,
      unit: '',
      origunit: '',
      price: 0,
      priceoverfl: false,
      rushfl: false,
      contractno: '',
      vendquote: '',
      pdsvfl: false,
      pdsvcrecno: 0,
      seasontype: '',
      specnstype: '',
      restrictovrfl: false,
      restricterrmess: '',
      addMode: false,
      rowidPoeral: 0,
      seqno: 0,
      accepttype: '',
      porrarlinedspllinesur: []
   };

   self.isCurrencyVisibleInTotals = function () {
      var vis = false;
      if (self.lineItemTotals && self.lineItemTotals.currencydesc) {
         vis = true;
      }
      return vis;
   };

   self.isConsolidateWhseEnabled = function () {
      return self.consolidateWhseEnabled;
   };
   self.isConsolidateLineEnabled = function () {
      return self.consolidateLineEnabled;
   };

   self.isResaleEnabled = function () {
      return self.resaleEnabled;
   };

   self.isTermsEnabled = function () {
      return self.termsEnabled;
   };

   self.isSaveButtonEnabled = function () {
      return self.saveButtonEnabled;
   };

   self.isShipToAddressEnabled = function () {
      return self.shipToAddressEnabled;
   };

   self.activate = function (type) {
      if (type === 'header') {
         self.saveButtonEnabled = true;
      } else {
         self.saveButtonEnabled = false;
         if (type === 'messages') {
            self.retrieveReportDetailsMessages();
         }
      }
   };

   /**
   * Load the GeoCode lookup criteria
   */
   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: POERAH_TABLENAME,
         reportno: self.drillDownRecord.reportno,
         city: self.headerData.shiptocity,
         state: self.headerData.shiptostate,
         zipcd: self.headerData.shiptozip,
         geocd: self.headerData.geocd,
         country: self.headerData.shiptocountrycd,
         streetaddr: self.headerData.shiptoaddr1,
         outofcityfl: self.headerData.outofcityfl
      };
   };

   self.lineItemSelected = function () {
      self.supersedeAvailButtonEnable = false;
      self.qtybreakButtonEnable = false;
      var records = GridService.getSelectedRecords(self.grid);
      if (records && records.length) {
         var rec = records[0];

         //If one and only one row is selected, give us the Product Notes.  Do not send for Nonstocks.
         if (records.length === 1 && rec.specnstype.toLowerCase() !== 'n') {
            self.productForNotes = rec.shipprod;
         } else {
            self.productForNotes = '';
         }

         self.errorMessagesCriteria.leveltype = 'l';
         self.errorMessagesCriteria.lineno = rec.lineno;
         self.errorMessagesCriteria.seqno = rec.seqno;

         //Get poeral
         var criteria = {
            reportno: base.drillDownRecord.reportno,
            lineno: rec.lineno,
            seqno: rec.seqno
         };
         DataService.post('api/po/poeral/getpoeralbyreportnolinenoseqno', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (data[0].superfl) {
                  self.supersedeAvailButtonEnable = true;
               }
               if (data[0].pdsvfl && !data[0].priceoverfl && data[0].vendfl && data[0].nonstockty === '') {
                  self.qtybreakButtonEnable = true;
               }
            }
         });
      }
   };

   self.displayLineItemTotals = function (totals, targetSent) {
      if (targetSent) {
         self.lineItemTotals.totqtyorderedtarget = totals.totqtyorderedtarget;
         self.lineItemTotals.totlineamounttarget = totals.totlineamounttarget;
         self.lineItemTotals.totweighttarget = totals.totweighttarget;
         self.lineItemTotals.totcubestarget = totals.totcubestarget;
         self.lineItemTotals.targetbuy = totals.targetbuy;
         self.lineItemTotals.purchprio = totals.purchprio;
         self.lineItemTotals.currencydesc = totals.currencydesc;
      }

      self.lineItemTotals.totqtyordered = totals.totqtyordered;
      self.lineItemTotals.totqtyorderedstring = Locale.formatNumber(totals.totqtyordered, { style: 'decimal', maximumFractionDigits: 2 }) + ' ' + self.lineItemTotals.totqtyorderedtarget;
      self.lineItemTotals.totlineamount = totals.totlineamount;
      self.lineItemTotals.totlineamountstring = Locale.formatNumber(totals.totlineamount, { style: 'decimal', maximumFractionDigits: 2 }) + ' ' + self.lineItemTotals.totlineamounttarget;
      self.lineItemTotals.totweight = totals.totweight;
      self.lineItemTotals.totweightstring = Locale.formatNumber(totals.totweight, { style: 'decimal', minimumFractionDigits: 5, maximumFractionDigits: 5 }) + ' ' + self.lineItemTotals.totweighttarget;
      self.lineItemTotals.totcubes = totals.totcubes;
      self.lineItemTotals.totcubesstring = Locale.formatNumber(totals.totcubes, { style: 'decimal', minimumFractionDigits: 5, maximumFractionDigits: 5 }) + ' ' + self.lineItemTotals.totcubestarget;
   };

   self.retrieveReportDetails = function (preserveLineGrid) {
      self.errorMessagesCriteria.reportno = self.drillDownRecord.reportno;
      self.errorMessagesCriteria.lineno = 0;
      self.errorMessagesCriteria.seqno = 0;
      self.errorMessagesCriteria.leveltype = 'h';

      self.headerData = DataService.getResource('api/po/aspoentry/porrarreportheaderretrieve/' + self.drillDownRecord.reportno, { busy: true }, function (data) {
         if (data) {
            self.shipToAddressEnabled = data.shiptoaddrenabled;
            self.termsEnabled = data.termstypeenabled;
            self.resaleEnabled = data.resaleenabled;
            self.consolidateLineEnabled = data.conslinesenabled;
            self.consolidateWhseEnabled = data.conswhseenabled;

            self.headerData.adjustamt = Math.round(data.adjustamt * 100) / 100;

            base.drillDownRecord.sourcety = data.sourcety;

            if (base.drillDownRecord.sourcety === 'p') {
               base.drillDownLabel = base.drillDownLabel + ' ' + MessageService.get('global.program.buy');
            }
            if (self.headerData.rush) {
               base.drillDownLabel = base.drillDownLabel + ' ' + self.headerData.rush;
            }

            //User Hook (do not rename)
            if (self.headerRetrieveContinue) {
               self.headerRetrieveContinue();
            }
         }
      });

      DataService.get('api/po/aspoentry/porrarlinedisplay/' + base.drillDownRecord.reportno, { busy: true }, function (data) {
         if (data) {
            // SI call returns a ProDataSet with 2 temp-tables (one is a heirarchial display)
            if (data.porrarlinedsplline) {
               // Preserve the state of the line item grid, or replace it fully with new data
               // Note: To preserve the page, sort, and filter of the grid we do a "soft" update by merging in changes
               if (preserveLineGrid) {
                  GridService.softUpdateDataset(self.grid, data.porrarlinedsplline, 'lineno');
               } else {
                  self.lineItemsList = data.porrarlinedsplline;
               }

               //User Hook (do not rename)
               if (self.lineItemsListContinue) {
                  self.lineItemsListContinue();
               }
            }
            if (data.porrarlinetotals) {
               self.displayLineItemTotals(data.porrarlinetotals, true);
            }
         }
      });
   };

   self.retrieveReportDetailsMessages = function () {
      DataService.post('api/po/aspoentry/porrarlinemessages', { data: self.errorMessagesCriteria, busy: true }, function (data) {
         if (data) {
            self.errorMessagesResults = data;
         }
      });
   };

   self.displayQuantityBreaks = function () {
      if (self.grid) {
         var records = GridService.getSelectedRecords(self.grid);
         if (records && records.length) {
            if (records.length === 1) {
               self.singleLineItem = records[0];
               var criteria = {
                  reportno: base.drillDownRecord.reportno,
                  lineno: records[0].lineno,
                  seqno: records[0].seqno
               };

               DataService.post('api/po/poeral/getpoeralbyreportnolinenoseqno', { data: criteria, busy: true }, function (data) {
                  if (data) {
                     var qtyBreakAvailable = false;
                     if (data[0].pdsvfl && data[0].nonstockty === '' && !data[0].priceoverfl) {
                        qtyBreakAvailable = true;
                     }

                     if (qtyBreakAvailable) {
                        ModalService.showModal('po/poera/tabs/line-qtybreak.json', 'PoeraDrillDownLineQtyBreaksCtrl as qb', $scope, function (modal) {
                           self.qtyBreakModal = modal;
                        });
                     } else {
                        MessageService.error('global.error', 'message.there.is.no.qty.break.information.available');
                     }
                  }
               });
            } else {
               MessageService.error('global.error', 'message.please.select.one.row.for.the.qty.break');
            }
         }
      }
   };

   self.quantityHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem) {
         //By design, the Quantity should hyperlink to the Product Availability Inquiry (and Product to Product Inquiry).
         //Please do not change this behavior.
         if (lineItem.specnstype.toLowerCase() !== 'n') {
            $state.go('icia.detail', { pk: lineItem.shipprod, pk2: base.drillDownRecord.whse }, { reload: 'icia.detail' });
         } else {
            MessageService.info('global.information', 'message.selected.product.is.a.nonstock.no.hyperlink');
         }
      }
   };

   self.productHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem) {
         //By design, the Product should hyperlink to the Product Inquiry (and Quantity to Product Availability Inquiry).
         //Please do not change this behavior.
         if (lineItem.specnstype.toLowerCase() !== 'n') {
            $state.go('icip.detail', { pk: lineItem.shipprod, pk2: base.drillDownRecord.whse }, { reload: 'icip.detail' });
         } else {
            MessageService.info('global.information', 'message.selected.product.is.a.nonstock.no.hyperlink');
         }
      }
   };

   self.poipHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem && lineItem.blno) {
         $state.go('poip.detail', { pk: lineItem.blno, pk2: lineItem.blsuf });
      }
   };

   self.orderHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem && lineItem.orderaltno && lineItem.ordertype) {
         switch (lineItem.ordertype.toLowerCase()) {
            case 't':
               $state.go('wtit.detail', { pk: lineItem.orderaltno, pk2: lineItem.orderaltsuf });
               break;
            case 'o':
               $state.go('oeio.detail', { pk: lineItem.orderaltno, pk2: lineItem.orderaltsuf });
               break;
            case 'p':
               $state.go('poip.detail', { pk: lineItem.orderaltno, pk2: lineItem.orderaltsuf });
               break;
            case 'f':
               $state.go('vaif.detail', { pk: lineItem.orderaltno, pk2: lineItem.orderaltsuf });
               break;
            case 'w':
               $state.go('kpiw.detail', { pk: lineItem.orderaltno, pk2: lineItem.orderaltsuf });
               break;
         }
      }
   };

   self.aricHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem && lineItem.custnumber) {
         $state.go('aric.detail', { pk: lineItem.custnumber });
      }
   };

   self.lineDetailUsagelinkClicked = function (e, args) {
       var singleRecord = args[0].item;
       if (singleRecord && singleRecord.shipprod) {
           $state.go('.productWarehouseUsage', { enabled: true, prod: singleRecord.shipprod, whse: base.drillDownRecord.whse, unit: '', recalcEnabled: true, returnState: $state.current.name });
       }
   };

   //NOTE:  By design, we're also calling this on 'ExitEditMode' as well on the 'QtyOrd' column.  The
   //reason is, we need to fire this call when they simply change the value to the same value it was.
   //A side effect though, this will also fire when they simply click in the row and leave.  That
   //can't be addressed with the SoHo controls.
   self.onCellChange = function (e, args) {
      var record = self.lineItemsList[args.row];
      if (record) {

         self.hasChanged = true;
         //See if the Qty changed.  If so, we'll be flipping the accept flag.  This needs to be done before
         //we make the API call so this gets changed with the quantity field and persisted to the DB.
         if (args.column.field.toLowerCase() === self.COLUMN_QTYORD) {
            if (record.qtyord === 0) {
               record.accepttype = 'n';
            } else {
               record.accepttype = 'y';
            }
         }

         // Columns such as Quantity, Price and Contract
         if (self.genericGridColumnCollection.indexOf(args.column.field.toLowerCase()) > -1) {

            self.updateLineItemRecord.reportno = record.reportno;
            self.updateLineItemRecord.lineno = record.lineno;
            self.updateLineItemRecord.shipprod = record.shipprod;
            self.updateLineItemRecord.qtyord = record.qtyord;
            self.updateLineItemRecord.unit = record.unit;
            self.updateLineItemRecord.origunit = record.unit;
            self.updateLineItemRecord.price = record.price;
            self.updateLineItemRecord.priceoverfl = false;
            self.updateLineItemRecord.rushfl = record.rushfl;
            self.updateLineItemRecord.contractno = record.contractno;
            self.updateLineItemRecord.vendquote = record.vendquote;
            self.updateLineItemRecord.pdsvfl = false;
            self.updateLineItemRecord.pdsvcrecno = record.pdsvcrecno;
            self.updateLineItemRecord.seasontype = '';
            self.updateLineItemRecord.specnstype = record.specnstype;
            self.updateLineItemRecord.restrictovrfl = false;
            self.updateLineItemRecord.restricterrmess = '';
            self.updateLineItemRecord.addMode = false;
            self.updateLineItemRecord.rowidPoeral = record.rowidPoeral;
            self.updateLineItemRecord.seqno = record.seqno;
            self.updateLineItemRecord.accepttype = record.accepttype;
            self.updateLineItemRecord.porrarlinedspllinesur = angular.copy(record.porrarlinedspllinesur); //need copy (see SXWEB-21502)

            var criteria = {
               porrarlineadd: self.updateLineItemRecord,
               cFieldName: args.column.field.toLowerCase() === self.COLUMN_QTYORD ? self.COLUMN_UNIT:args.column.field.toLowerCase()
            };

            DataService.post('api/po/aspoentry/porrarlineaddleavefield', { data: criteria, busy: true }, function (data) {
               if (data) {

                  record.qtyord = data.qtyord;
                  record.unit = data.unit;
                  record.origunit = data.origunit;
                  record.price = data.price;
                  record.rushfl = data.rushfl;
                  record.specnstype = data.specnstype;
                  record.contractno = data.contractno;
                  record.vendquote = data.vendquote;
                  record.pdsvcrecno = data.pdsvcrecno;
                  record.priceoverfl = data.priceoverfl;
                  record.pdsvfl = data.pdsvfl;

                  DataService.post('api/po/aspoentry/porrarlinechange', { data: record, busy: true }, function (data) {
                     if (data) {
                        if (!MessageService.processMessaging(data.messaging)) {
                           if (data.porrarlinetotals) {
                              self.displayLineItemTotals(data.porrarlinetotals, false);
                           }
                        }

                        var indx = self.lineItemsList.indexOf(record);
                        self.grid.updateRow(indx);
                     }
                  });
               }
            });
            //'Accepttype' is a dropdown with Yes or No as valid options and converted to y,n.  NOTE:  The backend
            //call does not allow for Blank as an option, so it's not presented in the UI as an option to the user.
         } else if (args.column.field.toLowerCase() === 'accepttype') {
            //Which will only be one in this case, the call expects a collection.
            var linesToUpdate = [];
            linesToUpdate.push(
            {
               rowidPoeral: record.rowidPoeral,
               lineno: record.lineno
            });

            //TODO: For the time being, we needed to make this field a text field instead of a dropdown due
            //to a bug in the SoHo Grid with regards to arrowing.  Once we get that next SoHo code, we can
            //convert this back to a dropdown with Yes / No options.
            //1) Change Column Widget back to a Dropdown.
            //2) Remove this entire If/Else Condition and leave the API call intact.
            if (record.accepttype.toLowerCase() === 'y' || record.accepttype.toLowerCase() === 'n' || record.accepttype.trim() === '') {
               DataService.post('api/po/aspoentry/porrarlineaccept', { data: { porrarlineaccept: linesToUpdate, cAcceptType: record.accepttype }, busy: true }, function (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     if (data.porrarlinetotals) {
                        self.displayLineItemTotals(data.porrarlinetotals, false);
                     }
                  }
               });
            } else {
               MessageService.error('global.error', 'error.must.be.y.or.n.or.blank');
               record.accepttype = args.oldValue;
               self.grid.updateRow(args.row);
            }
         }
      }
   };

   self.updateAcceptType = function (flag) {
      if (self.grid) {

         var acceptType = 'y';
         if (!flag) {
            acceptType = 'n';
         }

         var records = [];
         records = GridService.getSelectedRecords(self.grid);
         if (records && records.length) {
            var linesToUpdate = [];

            records.forEach(function (record) {
               record.accepttype = acceptType;
               linesToUpdate.push(
               {
                  rowidPoeral: record.rowidPoeral,
                  lineno: record.lineno
               });
            });

            DataService.post('api/po/aspoentry/porrarlineaccept', { data: { porrarlineaccept: linesToUpdate, cAcceptType: acceptType }, busy: true }, function (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.porrarlinetotals) {
                     self.displayLineItemTotals(data.porrarlinetotals, false);
                  }

                  records = GridService.getSelectedRecords(self.grid);
                  records.forEach(function (record) {
                     var indx = self.lineItemsList.indexOf(record);
                     self.grid.updateRow(indx);
                  });
               }
            });
         }
      }
   };

   self.lockUnlock = function () {
      var records = [];
      records = GridService.getSelectedRecords(self.grid);
      if (records && records.length) {
         var linesToUpdate = [];

         records.forEach(function (record) {
            if (record.lock === '') {
               record.lock = 'l';
            } else {
               record.lock = '';
            }

            record.accepttype = 'y';
            linesToUpdate.push(
            {
               rowidPoeral: record.rowidPoeral,
               lineno: record.lineno
            });
         });

         DataService.post('api/po/aspoentry/porrarlinelockunlock', { data: linesToUpdate, busy: true }, function (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.porrarlinetotals) {
                  self.displayLineItemTotals(data.porrarlinetotals, false);
               }

               records = GridService.getSelectedRecords(self.grid);
               records.forEach(function (record) {
                  var indx = self.lineItemsList.indexOf(record);
                  self.grid.updateRow(indx);
               });
            }
         });
      }
   };

   self.isCustomerReservationEnabled = function () {
      var retn = false;
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         if (singleRecord.custreservefoundfl) {
            retn = true;
         }
      }
      return retn;
   };

   self.isMaintainWhseProdEnabled = function () {
      var retn = false;
      if (self.securityLevelICSW >= 3) {
         var singleRecord = GridService.getSelectedRecord(self.grid);
         if (singleRecord) {
            if (singleRecord.specnstype.toLowerCase() !== 'n') {
               retn = true;
            }
         }
      }
      return retn;
   };

   self.isCustomerForecastEnabled = function () {
      var retn = false;
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         if (singleRecord.custforecastqty && singleRecord.custforecastqty > 0) {
            retn = true;
         }
      }
      return retn;
   };

   self.customerReservation = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         $state.go('poera.drilldown.customerreservation', {
            prod: singleRecord.shipprod,
            whse: base.drillDownRecord.whse
         });
      }
   };

   self.maintainWhseProduct = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         var params = {
            prod: singleRecord.shipprod,
            whse: base.drillDownRecord.whse,
            fillmode: true
         };

         DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               $state.go('icsw.detail.edit', { id: data.rowID, activeTab: 'ordering' });
            }
         });
      }
   };

   self.productExceptionCenter = function () {
      var productParameter = null;
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         productParameter = singleRecord.shipprod;
      }

      $state.go('icamu.master', { buyer: self.headerData.buyer, whse: self.headerData.whse, vendno: self.headerData.vendno, prod: productParameter }, { reload: true });
   };

   self.customerForecast = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         $state.go('poera.drilldown.customerforecast', {
            reportno: base.drillDownRecord.reportno,
            prod: singleRecord.shipprod,
            whse: base.drillDownRecord.whse,
            unit: singleRecord.unit
         });
      }
   };

   self.supersedeAvail = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         if (singleRecord.superty !== 'yes') {
            MessageService.info('global.error', ' message.this.product.does.not.have.any.supersede.availabil');
         } else {
            $state.go('poera.drilldown.supersede', { detailRecord: singleRecord });
         }
      } else {
         MessageService.info('global.error', 'message.please.select.one.row.for.the.supersede.availabili');
      }
   };

   self.recalculateOrderingControls = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records && records.length && records.length === 1) {
         if (records[0].specnstype.toLowerCase() !== 'n') {
            var criteriaList = [];
            criteriaList.push(
            {
               prod: records[0].shipprod,
               whse: base.drillDownRecord.whse,
               reportno: base.drillDownRecord.reportno
            });
            DataService.post('api/ic/asicadmin/icamrrecalcorderingcontrols', { data: criteriaList, busy: true }, function (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            });
         } else {
            MessageService.info('global.informational', 'message.the.product.must.be.a.stocked.item');
         }
      } else {
         MessageService.info('global.error', 'message.please.select.one.row.to.recalculate.ordering.cont');
      }
   };

   self.isProgramBuyEnabled = function () {
      var rtn = false;
      if (base.drillDownRecord.sourcety === 'p') {
         rtn = true;
      }
      return rtn;
   };

   self.programBuy = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records && records.length && records.length === 1) {
         var rec = records[0];
         $state.go('poera.drilldown.programbuy', { detailRecord: rec });
      } else {
         MessageService.info('global.error', 'message.please.select.a.single.row.for.this.feature');
      }
   };

   // First time drilling down
   if (self.drillDownRecord) {
      self.retrieveReportDetails();
   }

   self.wholeOrderDiscountChange = function () {
      if (self.headerData.wodisctype) {
         /* $ */
         self.headerData.wodiscnet = self.headerData.wodiscamt;
      } else {
         /* % */
         var pct = self.headerData.wodiscamt / 100;
         var amt = self.headerData.totlineamount * pct;
         amt = Math.round(amt * 100) / 100;
         self.headerData.wodiscnet = amt;
      }
      self.addon1Change();
      self.addon3Change();
      self.addon3Change();
      self.addon4Change();
   };

   self.calculateTotalAddons = function () {
      var addonTotal = self.headerData.addonnet1 + self.headerData.addonnet2 + self.headerData.addonnet3 + self.headerData.addonnet4;
      addonTotal = Math.round(addonTotal * 100) / 100;
      self.headerData.addon = addonTotal;
   };

   self.addon1Change = function () {
      if (self.headerData.addontype1) {
         /* $ */
         self.headerData.addonnet1 = self.headerData.addonamt1;
      } else {
         /* % */
         var pct = self.headerData.addonamt1 / 100;
         var amt = (self.headerData.totlineamount - self.headerData.wodiscnet) * pct;
         amt = Math.round(amt * 100) / 100;
         self.headerData.addonnet1 = amt;
      }
      self.calculateTotalAddons();
   };

   self.addon2Change = function () {
      if (self.headerData.addontype2) {
         /* $ */
         self.headerData.addonnet2 = self.headerData.addonamt2;
      } else {
         /* % */
         var pct = self.headerData.addonamt2 / 100;
         var amt = (self.headerData.totlineamount - self.headerData.wodiscnet) * pct;
         amt = Math.round(amt * 100) / 100;
         self.headerData.addonnet2 = amt;
      }
      self.calculateTotalAddons();
   };

   self.addon3Change = function () {
      if (self.headerData.addontype3) {
         /* $ */
         self.headerData.addonnet3 = self.headerData.addonamt3;
      } else {
         /* % */
         var pct = self.headerData.addonamt3 / 100;
         var amt = (self.headerData.totlineamount - self.headerData.wodiscnet) * pct;
         amt = Math.round(amt * 100) / 100;
         self.headerData.addonnet3 = amt;
      }
      self.calculateTotalAddons();
   };

   self.addon4Change = function () {
      if (self.headerData.addontype4) {
         /* $ */
         self.headerData.addonnet4 = self.headerData.addonamt4;
      } else {
         /* % */
         var pct = self.headerData.addonamt4 / 100;
         var amt = (self.headerData.totlineamount - self.headerData.wodiscnet) * pct;
         amt = Math.round(amt * 100) / 100;
         self.headerData.addonnet4 = amt;
      }
      self.calculateTotalAddons();
   };

   self.headerSave = function (acceptDenyAll) {
      DataService.post('api/po/aspoentry/porrarreportheaderupdate', { data: self.headerData, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            self.headerPopulateCombineInquiry();
            self.hasChanged = true;

            if (acceptDenyAll) {
               var acceptFlag = false;
               if (acceptDenyAll === 'acceptall') {
                  acceptFlag = true;
               }

               DataService.get('api/po/aspoentry/porrarreportheaderacceptdenyall/' + base.drillDownRecord.reportno + '/' + acceptFlag, { busy: true }, function (data) {
                  self.retrieveReportDetails();
               });
            }
         }
      });
   };

   self.headerAcceptAllLines = function () {
      self.headerSave('acceptall');
   };

   self.headerDenyAllLines = function () {
      self.headerSave('denyhall');
   };

   self.headerIncreaseDecrease = function () {
      base.headerIncreaseDecreaseLaunched = true;
      $state.go('poera.drilldown.headerincreasedecrease');
   };

   // Exit from drill down view - need to unlock soft lock
   self.exitDetail = function () {

      if (self.drillDownRecord.reportno) {
         DataService.get('api/po/aspoentry/porrarreportunlockheader/' + self.drillDownRecord.reportno, { busy: true }, function (data) {
         });
      }
      base.inDrillDownOperation = false;

      // If there are changes, then refresh the master grid search but do a soft update in order to preserve the grid state
      if (self.hasChanged) {
         base.search(true);
      }

      $state.go('^.master');
   };

   self.headerPopulateCombineInquiry = function () {
      DataService.get('api/po/aspoentry/porrarreportcombineinq/' + self.drillDownRecord.reportno, { busy: true }, function (data) {
         if (data) {
            self.combineInquiryList = data.porrarreptcombinqresults;
            self.combineInquiryTotals = data.porrarreptcombinqsingle;
            self.combineInquiryTotals.dTargetBuyPct = Math.round(data.porrarreptcombinqsingle.dTargetBuyPct * 100) / 100;
            self.combineInquiryTotals.dTargetBuyString = self.combineInquiryTotals.dTargetBuy + ' ' + self.combineInquiryTotals.cTargetBuyFl;
         }
      });
   };

   // Create new line item
   self.create = function () {
      self.updateLineItemRecord.reportno = base.drillDownRecord.reportno;
      self.updateLineItemRecord.lineno = 0;
      self.updateLineItemRecord.shipprod = '';
      self.updateLineItemRecord.qtyord = 0;
      self.updateLineItemRecord.unit = '';
      self.updateLineItemRecord.origunit = '';
      self.updateLineItemRecord.price = 0;
      self.updateLineItemRecord.priceoverfl = false;
      self.updateLineItemRecord.rushfl = false;
      self.updateLineItemRecord.contractno = '';
      self.updateLineItemRecord.vendquote = '';
      self.updateLineItemRecord.pdsvfl = false;
      self.updateLineItemRecord.pdsvcrecno = 0;
      self.updateLineItemRecord.seasontype = '';
      self.updateLineItemRecord.specnstype = '';
      self.updateLineItemRecord.restrictovrfl = false;
      self.updateLineItemRecord.restricterrmess = '';
      self.updateLineItemRecord.addMode = true;
      self.updateLineItemRecord.rowidPoeral = 0;
      self.updateLineItemRecord.seqno = 0;
      self.updateLineItemRecord.accepttype = 'y';
      self.updateLineItemRecord.porrarlinedspllinesur = [];

      $state.go('poera.drilldown.create', { isSurplusMode: false });
   };

   self.editContinue = function (singleRecord, isSurplusMode) {
      if (singleRecord) {
         self.updateLineItemRecord.reportno = base.drillDownRecord.reportno;
         self.updateLineItemRecord.lineno = singleRecord.lineno;
         self.updateLineItemRecord.shipprod = singleRecord.shipprod;
         self.updateLineItemRecord.qtyord = singleRecord.qtyord;
         self.updateLineItemRecord.unit = singleRecord.unit;
         self.updateLineItemRecord.origunit = singleRecord.unit;
         self.updateLineItemRecord.price = singleRecord.price;
         self.updateLineItemRecord.priceoverfl = false;
         self.updateLineItemRecord.rushfl = singleRecord.rushfl;
         self.updateLineItemRecord.contractno = singleRecord.contractno;
         self.updateLineItemRecord.vendquote = singleRecord.vendquote;
         self.updateLineItemRecord.pdsvfl = false;
         self.updateLineItemRecord.pdsvcrecno = singleRecord.pdsvcrecno;
         self.updateLineItemRecord.seasontype = '';
         self.updateLineItemRecord.specnstype = singleRecord.specnstype;
         self.updateLineItemRecord.restrictovrfl = false;
         self.updateLineItemRecord.restricterrmess = '';
         self.updateLineItemRecord.addMode = false;
         self.updateLineItemRecord.rowidPoeral = singleRecord.rowidPoeral;
         self.updateLineItemRecord.seqno = singleRecord.seqno;
         self.updateLineItemRecord.accepttype = singleRecord.accepttype;
         self.updateLineItemRecord.porrarlinedspllinesur = angular.copy(singleRecord.porrarlinedspllinesur); //need copy (see SXWEB-21502)

         $state.go('poera.drilldown.create', { isSurplusMode: isSurplusMode });
      }
   };

   self.surplusConverter = function (row, cell, value) {
      switch (value) {
         case true:
            return MessageService.get('global.surplus');
         case false:
            return '';
      }
   };

   self.surplusHyperlinkClicked = function (e, args) {
      var singleRecord = args[0].item;
      if (singleRecord && singleRecord.surplus) {
         //If going into Edit mode from Surplus convenience Hyperlink, open the screen with the
         //Detail section collapsed by default.
         self.editContinue(singleRecord, true);
      }
   };

   // Edit existing line item
   self.edit = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      self.editContinue(singleRecord, false);
   };

   self.lineItemDrilldown = function (e, args) {

      var record = args[0].item;
      base.drillDownLineItemRecord.reportno = base.drillDownRecord.reportno;
      base.drillDownLineItemRecord.rowidPoeral = record.rowidPoeral;
      base.drillDownLineItemRecord.lineno = record.lineno;
      base.drillDownLineItemRecord.seqno = record.seqno;
      base.drillDownLineItemRecord.shipprod = record.shipprod;
      base.drillDownLineItemRecord.custnumber = record.custnumber;
      base.drillDownLineItemRecord.custname = record.custname;
      base.drillDownLineItemRecord.blno = record.blno;
      base.drillDownLineItemRecord.blsuf = record.blsuf;
      base.drillDownLineItemRecord.specnstype = record.specnstype;

      base.usageAnalysis.prod = record.shipprod;
      base.usageAnalysis.whse = base.drillDownRecord.whse;
      base.usageAnalysis.reportno = 0;

      $state.go('poera.drilldown.lineitemdrilldown');
   };
});

// Controller for the Header tab on the Drill Down screen
// alias = hdr
// We moved the header calls to this tab controller to improve performance. The drilldown screen was rendering
// slowly because calls for specific tabs were firing immediately. Now they only fire when the corresponding tab is first selected.
app.controller('PoeraDrillDownHeaderCtrl', function ($scope, DataService) {
   var self = this;
   var drldwn = $scope.drldwn;
   self.limitShipVia = false;

   self.initialize = function () {
      // After the report header is resolved, retrieve APSV/APSS limitshipvia flag
      drldwn.headerData.$promise.then(function () {
         if (drldwn.headerData.vendno) {
            if (drldwn.headerData.shipfmno) {
               self.retrieveVendorShipFromRecord();
            } else {
               self.retrieveVendorRecord();
            }
         }

         // Fetch combine inquiry data
         drldwn.headerPopulateCombineInquiry();
      });
   };

   self.retrieveVendorRecord = function () {
      var params = {
         vendno: drldwn.headerData.vendno,
         fldlist: 'limitshipvia'
      };

      DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.limitShipVia = data.limitshipvia;
         }
      });
   };

   self.retrieveVendorShipFromRecord = function () {
      var params = {
         vendno: drldwn.headerData.vendno,
         shipfmno: drldwn.headerData.shipfmno,
         fldlist: 'limitshipvia'
      };

      DataService.get('api/ap/apss/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.limitShipVia = data.limitshipvia;
         }
      });
   };

   // Proceed with data calls in initialize function
   self.initialize();
});

// Controller for the Shopping List tab on the Drill Down screen
// alias = shplst
// We moved the shopping list calls to this tab controller to improve performance. The drilldown screen was rendering
// slowly because the shopping list calls were firing immediately. Now they only fire when the Shoppping List tab is selected.
app.controller('PoeraDrillDownShoppingListCtrl', function ($scope, $state, DataService, GridService, MessageService, UserService) {
   var self = this;
   var drldwn = $scope.drldwn;
   var poeraRowId = drldwn.drillDownRecord.rowidPoerah;
   self.shoppingListList = [];
   self.shoppingListRecommended = 0;
   self.shoppingListOrdered = 0;

   self.initialize = function () {
      var shoppingListPrepare = {
         proc: 'poera',
         hdrrowid: poeraRowId,
         clearfl: false
      };

      // Prepare shopping list
      DataService.post('api/shared/assharedentry/shoppinglistprepare', { data: shoppingListPrepare, busy: true }, function (data) {
         self.shoppingListRecommended = data.totalrecommend;
         self.shoppingListOrdered = data.totalordered;

         // Fetch shopping list
         self.refreshShoppingList();
      });
   };

   self.refreshShoppingList = function () {
      var criteria = {
         cono: UserService.getCono(),
         oper2: UserService.getUserName()
      };
      DataService.post('api/pv/pvshoplist/getpvshoplistbyoper', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.shoppingListList = data;
         }
      });
   };

   self.shoppingListClear = function () {
      self.shoppingListRecommended = 0;
      self.shoppingListOrdered = 0;
      self.shoppingListList = [];
      DataService.get('api/shared/assharedentry/clearshoppinglist', { busy: true });
   };

   self.shoppingListDelete = function () {
      var records = GridService.getSelectedRecords(self.shoppingListGrid);
      if (records && records.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var productsToDelete = [];
            var seqNo = 0;

            records.forEach(function (record) {
               seqNo++;
               productsToDelete.push({
                  pvShoplistRowid: record.rowID,
                  seqno: seqNo
               });
            });
            var totals = {
               totalordered: self.shoppingListOrdered,
               totalrecommend: self.shoppingListRecommended
            };
            DataService.post('api/shared/assharedentry/shoppinglistdelete', { data: { shoplistdeleteprods: productsToDelete, shoplistdeletetotals: totals }, busy: true }, function (data) {
               if (data) {
                  self.shoppingListOrdered = data.totalordered;
                  self.shoppingListRecommended = data.totalrecommend;
               }
               self.refreshShoppingList();
            });
         });
      } else {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
      }
   };

   self.shoppingListAddLines = function () {
      var records = GridService.getSelectedRecords(self.shoppingListGrid);
      if (records && records.length) {
         var linesToUpdate = [];
         var seqNo = 0;
         records.forEach(function (record) {
            seqNo++;
            linesToUpdate.push({
               seqno: seqNo,
               pvShoplistRowid: record.rowID
            });
         });

         var criteria = {
            proc: 'poera',
            hdrrowid: poeraRowId
         };
         var totals = {
            totalordered: self.shoppingListOrdered,
            totalrecommend: self.shoppingListRecommended
         };

         DataService.post('api/shared/assharedentry/shoppinglistupdatefromlist', { data: { shoplistupdatecriteria: criteria, shoplistupdatetotals: totals, shoplistupdateprods: linesToUpdate }, busy: true }, function (data) {
            if (data && data.shoplistupdatetotals) {
               self.shoppingListOrdered = data.shoplistupdatetotals.totalordered;
               self.shoppingListRecommended = data.shoplistupdatetotals.totalrecommend;
            }
            drldwn.retrieveReportDetails();
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
      }
   };

   self.shoppingListAddAllLines = function () {
      if (self.shoppingListList.length) {
         var notNeeded = [];
         var criteria = {
            proc: 'poera',
            hdrrowid: poeraRowId
         };
         var totals = {
            totalordered: self.shoppingListOrdered,
            totalrecommend: self.shoppingListRecommended
         };

         DataService.post('api/shared/assharedentry/shoppinglistupdateall', { data: { shoplistupdatecriteria: criteria, shoplistupdatetotals: totals, shoplistupdateprods: notNeeded }, busy: true }, function (data) {
            if (data && data.shoplistupdatetotals) {
               self.shoppingListOrdered = data.shoplistupdatetotals.totalordered;
               self.shoppingListRecommended = data.shoplistupdatetotals.totalrecommend;
            }
            drldwn.retrieveReportDetails();
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      } else {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.for.the.update');
      }
   };

   self.shoppingListOnCellChange = function (e, args) {
      var record = self.shoppingListList[args.row];
      var criteria = {
         proc: 'poera',
         hdrrowid: poeraRowId,
         qtyord: args.value,
         unit: record.unit,
         pvShoplistRowid: record.rowID
      };
      var totals = {
         totalordered: self.shoppingListOrdered,
         totalrecommend: self.shoppingListRecommended
      };

      DataService.post('api/shared/assharedentry/shoppinglistchange', { data: { shoplistchangecriteria: criteria, shoplistchangetotals: totals }, busy: true }, function (data) {
         if (data) {
            self.shoppingListOrdered = data.totalordered;
            self.shoppingListRecommended = data.totalrecommend;
         }
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };

   self.shoppingListUsageLinkClicked = function (e, args) {
      var singleRecord = args[0].item;
      if (singleRecord.prod && singleRecord.whse) {
         $state.go('.productWarehouseUsage', { enabled: true, prod: singleRecord.prod, whse: singleRecord.whse, unit: '', recalcEnabled: true, returnState: $state.current.name });
      }
   };

   // Go to product search screen
   self.shoppingListProductSearch = function () {
      $state.go('poera.drilldown.shoppinglistsearch', {
         shoppingListRecommended: self.shoppingListRecommended,
         shoppingListOrdered: self.shoppingListOrdered,
         productSearchCallback: self.productSearchCallback // need pass reference to the callback function since shpsrch controller isn't a child of shplst controller
      });
   };

   // Callback function to run after done with product search
   self.productSearchCallback = function (data) {
      self.shoppingListRecommended = data.totalrecommend;
      self.shoppingListOrdered = data.totalordered;
      self.refreshShoppingList();
   };

   // Proceed with data calls in initialize function
   self.initialize();
});

app.controller('PoeraDrillDownShoppingListSearch', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var callback = $stateParams.productSearchCallback;
   var shopListTotals = {
      totalrecommend: $stateParams.shoppingListRecommended,
      totalordered: $stateParams.shoppingListOrdered
   };

   self.productSearch = {
      proc: 'poera',
      clearfl: false,
      hdrrowid: 0,
      style: 'product search',
      selectioncriteria: '',
      numberofproducts: 0,
      uptoamount: 0,
      searchfor: 'f',
      percent: 0,
      statusstock: true,
      statusdirect: false,
      statusOAN: false,
      statusDNR: false
   };

   self.submit = function () {
      self.productSearch.hdrrowid = base.drillDownRecord.rowidPoerah;
      var flagStock = 'no';
      if (self.productSearch.statusstock) {
         flagStock = 'yes';
      }
      var flagDirect = 'no';
      if (self.productSearch.statusdirect) {
         flagDirect = 'yes';
      }
      var flagOAN = 'no';
      if (self.productSearch.statusOAN) {
         flagOAN = 'yes';
      }
      var flagDNR = 'no';
      if (self.productSearch.statusDNR) {
         flagDNR = 'yes';
      }
      var flagUseLinePoint = 'no';
      if (self.productSearch.searchfor === 'b' || self.productSearch.searchfor === 'd') {
         flagUseLinePoint = 'yes';
      }

      var searchCompare = '';
      if (self.productSearch.searchfor === 'a' || self.productSearch.searchfor === 'b') {
         // Greater than/equal
         searchCompare = 'g';
      } else if (self.productSearch.searchfor === 'c' || self.productSearch.searchfor === 'd') {
         // Less than/equal
         searchCompare = 'l';
      } else if (self.productSearch.searchfor === 'e') {
         // between
         searchCompare = 'b';
      } else {
         // All
         searchCompare = 'a';
      }

      self.productSearch.selectioncriteria = 'iNumberProducts=' + self.productSearch.numberofproducts + '|' +
                                             'dAmount=' + self.productSearch.uptoamount + '|' +
                                             'iPercent=' + self.productSearch.percent + '|' +
                                             'cSearchBy=' + searchCompare + '|' +
                                             'lSearchOn=' + flagUseLinePoint + '|' +
                                             'lStatusStock=' + flagStock + '|' +
                                             'lStatusDirect=' + flagDirect + '|' +
                                             'lStatusOAN=' + flagOAN + '|' +
                                             'lStatusDNR=' + flagDNR + '|';

      DataService.post('api/shared/assharedentry/shoppinglistpopulate', { data: { shoplistpopulatetotals: shopListTotals, shoplistpopulatecriteria: self.productSearch }, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^');
            callback(data);
         }
      });
   };
});

app.controller('PoeraDrillDownHeaderIncreaseDecrease', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var drldwn = $scope.drldwn;

   self.headerData = {};
   self.lineItemData = [];

   self.calculatePerformed = false;
   self.firstTimeReviewCycle = false;
   self.increaseDecreaseRecord = {
      reportno: 0,
      basis: true,
      percent: 0,
      reviewdays: 0,
      origrevdays: 0,
      origtotqtyord: 0,
      origtotlineamt: 0,
      origtotweight: 0,
      origtotcubes: 0,
      pctstock: 0,
      pckstockstring: '',
      pctnonstock: 0,
      pctnonstockstring: '',
      pctspecials: 0,
      pctspecialsstring: '',
      targetamt: 0,
      shortamt: 0,
      usagerate: 0,
      shorttext: '',
      newtotqtyord: 0,
      newtotlineamt: 0,
      newtotweight: 0,
      newtotcubes: 0
   };

   self.reviewCycleData = {
      reportno: 0,
      printusagehistfl: false,
      whsesurplus: '',
      printaltvendorsfl: false,
      printsubsfl: false,
      printblfl: false,
      printrushfl: false,
      prodlinefl: false,
      processtype: '',
      printdnrfl: false,
      printlnignorefl: false,
      printcommentsfl: false,
      halfwayfl: false
   };

   self.printSettings = {
      printtype: 'v',
      printernm: 'GUI',
      printoptfl: true,
      faxpriority: true
   };

   self.basisEnabled = false;
   self.isBasisEnabled = function () {
      return self.basisEnabled;
   };

   self.initializeReviewCycleData = function () {
      self.reviewCycleData.reportno = base.drillDownRecord.reportno;
      DataService.post('api/po/aspoentry/porrarreportadjustdaysinit', { data: self.reviewCycleData, busy: true }, function (data) {
         if (data) {
            self.reviewCycleData.printusagehistfl = data.printusagehistfl;
            self.reviewCycleData.whsesurplus = data.whsesurplus;
            self.reviewCycleData.printaltvendorsfl = data.printaltvendorsfl;
            self.reviewCycleData.printsubsfl = data.printsubsfl;
            self.reviewCycleData.printblfl = data.printblfl;
            self.reviewCycleData.printrushfl = data.printrushfl;
            self.reviewCycleData.prodlinefl = data.prodlinefl;
            self.reviewCycleData.processtype = data.processtype;
            self.reviewCycleData.printdnrfl = data.printdnrfl;
            self.reviewCycleData.printlnignorefl = data.printlnignorefl;
            self.reviewCycleData.printcommentsfl = data.printcommentsfl;
            self.reviewCycleData.halfwayfl = data.halfwayfl;
         }
      });
   };

   self.basisChanged = function () {
      // true = percent; false = review days
      if (self.increaseDecreaseRecord.basis) {
         self.percentHidden = false;
         self.reviewCycleHidden = true;
      } else {
         self.percentHidden = true;
         self.reviewCycleHidden = false;
         if (!self.firstTimeReviewCycle) {
            self.firstTimeReviewCycle = true;
            self.initializeReviewCycleData();
         }
      }
   };

   self.percentHidden = false;
   self.isPercentHidden = function () {
      return self.percentHidden;
   };

   self.reviewCycleHidden = false;
   self.isReviewCycleHidden = function () {
      return self.reviewCycleHidden;
   };

   // First time in here
   if (base.headerIncreaseDecreaseLaunched) {
      self.increaseDecreaseRecord.reportno = base.drillDownRecord.reportno;
      self.basisEnabled = true;
      self.reviewCycleHidden = true;
      self.calculatePerformed = false;
      self.headerData = {};
      self.lineItemData = [];

      DataService.get('api/po/aspoentry/porrarreportadjustretrieve/' + base.drillDownRecord.reportno, { busy: true }, function (data) {
         if (data) {
            if (data.porrarreptadjretrievesng) {
               self.increaseDecreaseRecord.origrevdays = data.porrarreptadjretrievesng.origrevdays;
               self.increaseDecreaseRecord.origtotqtyord = data.porrarreptadjretrievesng.origtotqtyord;
               self.increaseDecreaseRecord.origtotlineamt = data.porrarreptadjretrievesng.origtotlineamt;
               self.increaseDecreaseRecord.origtotweight = data.porrarreptadjretrievesng.origtotweight;
               self.increaseDecreaseRecord.origtotcubes = data.porrarreptadjretrievesng.origtotcubes;
               self.increaseDecreaseRecord.pctstock = Math.round(data.porrarreptadjretrievesng.pctstock * 100) / 100;
               self.increaseDecreaseRecord.pctstockstring = self.increaseDecreaseRecord.pctstock + ' ' + MessageService.get('symbol.percent');
               self.increaseDecreaseRecord.pctnonstock = Math.round(data.porrarreptadjretrievesng.pctnonstock * 100) / 100;
               self.increaseDecreaseRecord.pctnonstockstring = self.increaseDecreaseRecord.pctnonstock + ' ' + MessageService.get('symbol.percent');
               self.increaseDecreaseRecord.pctspecials = Math.round(data.porrarreptadjretrievesng.pctspecials * 100) / 100;
               self.increaseDecreaseRecord.pctspecialsstring = self.increaseDecreaseRecord.pctspecials + ' ' + MessageService.get('symbol.percent');
               self.increaseDecreaseRecord.targetamt = data.porrarreptadjretrievesng.targetamt;
               self.increaseDecreaseRecord.shortamt = data.porrarreptadjretrievesng.shortamt;
               self.increaseDecreaseRecord.usagerate = data.porrarreptadjretrievesng.usagerate;
               self.increaseDecreaseRecord.shorttext = data.porrarreptadjretrievesng.shorttext;
            }
            if (data.porrarreptadjretrievehdr) {
               self.headerData = data.porrarreptadjretrievehdr;
            }
            if (data.porrarreptadjretrievelns) {
               self.lineItemData = data.porrarreptadjretrievelns;
            }
         }
      });
   }

   self.calculate = function () {
      // Percent
      if (self.increaseDecreaseRecord.basis) {

         DataService.post('api/po/aspoentry/porrarreportadjustcalc', { data: self.increaseDecreaseRecord, busy: true }, function (data) {
            if (data) {
               self.increaseDecreaseRecord.newtotqtyord = data.newtotqtyord;
               self.increaseDecreaseRecord.newtotlineamt = data.newtotlineamt;
               self.increaseDecreaseRecord.newtotweight = data.newtotweight;
               self.increaseDecreaseRecord.newtotcubes = data.newtotcubes;

               self.increaseDecreaseRecord.pctnonstock = data.pctnonstock;
               self.increaseDecreaseRecord.pctstock = data.pctstock;
               self.increaseDecreaseRecord.pctspecials = data.pctspecials;
               self.increaseDecreaseRecord.shortamt = data.shortamt;
               self.increaseDecreaseRecord.shorttext = data.shorttext;

               // Clear out percent field so user can do another calculation if they want.
               self.increaseDecreaseRecord.percent = 0;
            }
         });

         self.calculatePerformed = true;
         self.basisEnabled = false;
      }
   };

   self.submit = function () {

      // Only need to do another SI call for a "Review Cycle Days".  For a "Percent", the Calculation may already be done.
      if (!self.increaseDecreaseRecord.basis) {

         self.reviewCycleData.reviewdays = self.increaseDecreaseRecord.reviewdays;
         // The printersettings object is hardcoded with regards with its settings (same in WebUI).
         DataService.post('api/po/aspoentry/porrarreportadjustdaysupdate', { data: { porrarreptadjdaysupdt: self.reviewCycleData, printersettings: self.printSettings }, busy: true }, function (data) {
            // Refresh report details once the update is done (don't set self.calculatePerformed - that's from percent calculation).
            drldwn.retrieveReportDetails();
         });
      }

      if (self.calculatePerformed) {
         drldwn.retrieveReportDetails();
      }

      $state.go('^');
   };

   self.cancel = function () {
      // Need control over the cancel operation to reverse the Calculation (updated the SX DB) fesature.

      if (self.calculatePerformed) {
         var hdrList = [];
         hdrList.push(self.headerData);
         DataService.post('api/po/aspoentry/porrarreportadjustcancel', { data: { porrarreptadjretrievehdr: hdrList, porrarreptadjretrievelns: self.lineItemData, porrarreptadjretrievesng: self.increaseDecreaseRecord, iReportNo: base.drillDownRecord.reportno }, busy: true }, function (data) {
         });
      }

      $state.go('^');
   };
});

app.controller('PoeraDrillDownLineCreateCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, AuthService) {
   var self = this;
   var base = $scope.base;
   var drldwn = $scope.drldwn;
   self.isSurplusMode = $stateParams.isSurplusMode;

   self.detailTitle = MessageService.get('global.add.new.line');
   if (drldwn.updateLineItemRecord && !drldwn.updateLineItemRecord.addMode) {
      self.detailTitle = MessageService.get('global.edit.details');
   }

   self.isProductEnabled = function () {
      return drldwn.updateLineItemRecord.addMode;
   };

   self.isUnitEnabled = function () {
      if (base.drillDownRecord.sourcety === 'p') {
         return false;
      } else {
         return true;
      }
   };

   self.isPriceEnabled = function () {
      return true;
   };

   self.productChanged = function () {
      if (drldwn.updateLineItemRecord && drldwn.updateLineItemRecord.shipprod) {
         var criteria = {
            porrarlineadd: drldwn.updateLineItemRecord,
            cFieldName: 'shipprod'
         };

         DataService.post('api/po/aspoentry/porrarlineaddleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               drldwn.updateLineItemRecord.qtyord = data.qtyord;
               drldwn.updateLineItemRecord.unit = data.unit;
               drldwn.updateLineItemRecord.origunit = data.origunit;
               drldwn.updateLineItemRecord.price = data.price;
               drldwn.updateLineItemRecord.rushfl = data.rushfl;
               drldwn.updateLineItemRecord.pdsvfl = data.pdsvfl;
               drldwn.updateLineItemRecord.specnstype = data.specnstype;
               drldwn.updateLineItemRecord.restrictovrfl = data.restrictovrfl;
               drldwn.updateLineItemRecord.restricterrmess = data.restricterrmess;

               if (drldwn.updateLineItemRecord.restrictovrfl && data.restricterrmess) {
                  MessageService.info('global.information', data.restricterrmess);
                  AuthService.createAuthPoint('poet', 'lines', 'restrictovrfl', String.Empty, String.Empty, null, self.returnAuthPointPassed, self.returnAuthPointFailed);
               }
            }
         });
      }
   };

   self.returnAuthPointPassed = function () {
      drldwn.updateLineItemRecord.restricterrmess = '';
   };

   self.returnAuthPointFailed = function () {
      if (drldwn.updateLineItemRecord.restricterrmess) {
         MessageService.info('global.error', drldwn.updateLineItemRecord.restricterrmess);
      }
      $state.go('^');
   };

   self.priceChanged = function () {
      if (drldwn.updateLineItemRecord) {
         var criteria = {
            porrarlineadd: drldwn.updateLineItemRecord,
            cFieldName: 'price'
         };

         DataService.post('api/po/aspoentry/porrarlineaddleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               drldwn.updateLineItemRecord.contractno = data.contractno;
               drldwn.updateLineItemRecord.vendquote = data.vendquote;
               drldwn.updateLineItemRecord.pdsvcrecno = data.pdsvcrecno;
               drldwn.updateLineItemRecord.priceoverfl = data.priceoverfl;
            }
         });
      }
   };

   self.contractChanged = function () {
      if (drldwn.updateLineItemRecord) {
         var criteria = {
            porrarlineadd: drldwn.updateLineItemRecord,
            cFieldName: 'contractno'
         };

         DataService.post('api/po/aspoentry/porrarlineaddleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               drldwn.updateLineItemRecord.vendquote = data.vendquote;
               drldwn.updateLineItemRecord.pdsvcrecno = data.pdsvcrecno;
               drldwn.updateLineItemRecord.price = data.price;
            }
         });
      }
   };

   self.unitChanged = function () {
      if (drldwn.updateLineItemRecord && drldwn.updateLineItemRecord.shipprod && drldwn.updateLineItemRecord.unit) {
         var criteria = {
            porrarlineadd: drldwn.updateLineItemRecord,
            cFieldName: 'unit'
         };

         DataService.post('api/po/aspoentry/porrarlineaddleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               drldwn.updateLineItemRecord.qtyord = data.qtyord;
               drldwn.updateLineItemRecord.unit = data.unit;
               drldwn.updateLineItemRecord.origunit = data.origunit;
               drldwn.updateLineItemRecord.price = data.price;
               drldwn.updateLineItemRecord.rushfl = data.rushfl;
               drldwn.updateLineItemRecord.pdsvfl = data.pdsvfl;
               drldwn.updateLineItemRecord.specnstype = data.specnstype;
               drldwn.updateLineItemRecord.restrictovrfl = data.restrictovrfl;
               drldwn.updateLineItemRecord.restricterrmess = data.restricterrmess;
            }
         });
      }
   };

   self.onCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         if (args.value.toLowerCase() === 'y' || args.value.toLowerCase() === 'n' || args.value === ' ' || args.value === '') {
            // Valid choice
         } else {
            MessageService.error('global.error', 'error.must.be.y.or.n.or.blank');
            if (drldwn.updateLineItemRecord && drldwn.updateLineItemRecord.porrarlinedspllinesur) {
               var record = drldwn.updateLineItemRecord.porrarlinedspllinesur[args.row];
               record.accepttype = args.oldValue;
               self.grid.updateRow(args.row);
            }
         }
      }
   };

   self.lineSurplusUsagelinkClicked = function (e, args) {
       var singleRecord = args[0].item;
       if (singleRecord && singleRecord.shipprod) {
           $state.go('.productWarehouseUsage', { enabled: true, prod: singleRecord.shipprod, whse: singleRecord.linewhse, unit: '', recalcEnabled: true, returnState: $state.current.name });
       }
   };

   // Submit row detail changes
   self.submit = function () {
      if (drldwn.updateLineItemRecord.addMode) {
         // Add mode
         DataService.post('api/po/aspoentry/porrarlineaddcreate', { data: drldwn.updateLineItemRecord, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.porrarlinetotals) {
                     drldwn.displayLineItemTotals(data.porrarlinetotals, false);
                  }

                  if (data.porrarlinedsplline && drldwn.lineItemsList) {

                     drldwn.lineItemsList.push({
                        accepttype: data.porrarlinedsplline.accepttype.toLowerCase(),
                        tiehold: data.porrarlinedsplline.tiehold,
                        specnstype: data.porrarlinedsplline.specnstype,
                        commentfl: data.porrarlinedsplline.commentfl,
                        shipprod: data.porrarlinedsplline.shipprod,
                        qtyord: data.porrarlinedsplline.qtyord,
                        unit: data.porrarlinedsplline.unit,
                        notesfl: data.porrarlinedsplline.notesfl,
                        price: data.porrarlinedsplline.price,
                        rushfl: data.porrarlinedsplline.rushfl,
                        belowopfl: data.porrarlinedsplline.belowopfl,
                        lock: data.porrarlinedsplline.lock,
                        criticalfl: data.porrarlinedsplline.criticalfl,
                        npnafl: data.porrarlinedsplline.npnafl,
                        ordertype: data.porrarlinedsplline.ordertype,
                        lineno: data.porrarlinedsplline.lineno,
                        seqno: data.porrarlinedsplline.seqno,
                        addlcarrycost: data.porrarlinedsplline.addlcarrycost,
                        blno: data.porrarlinedsplline.blno,
                        blsuf: data.porrarlinedsplline.blsuf,
                        descrip: data.porrarlinedsplline.descrip,
                        qtybreak: data.porrarlinedsplline.qtybreak,
                        orderaltno: data.porrarlinedsplline.orderaltno,
                        orderaltsuf: data.porrarlinedsplline.orderaltsuf,
                        linealtno: data.porrarlinedsplline.linealtno,
                        seqaltno: data.porrarlinedsplline.seqaltno,
                        promisedt: data.porrarlinedsplline.promisedt,
                        companyrank: data.porrarlinedsplline.companyrank,
                        whserank: data.porrarlinedsplline.whserank,
                        contractno: data.porrarlinedsplline.contractno,
                        pdsvcrecno: data.porrarlinedsplline.pdsvcrecno,
                        vendquote: data.porrarlinedsplline.vendquote,
                        abcrankty: data.porrarlinedsplline.abcrankty,
                        srcriticalfl: data.porrarlinedsplline.srcriticalfl,
                        custonhand: data.porrarlinedsplline.custonhand,
                        superty: data.porrarlinedsplline.superty,
                        unitbuy: data.porrarlinedsplline.unitbuy,
                        unitstnd: data.porrarlinedsplline.unitstnd,
                        custname: data.porrarlinedsplline.custname,
                        custnumber: data.porrarlinedsplline.custnumber,
                        takenby: data.porrarlinedsplline.takenby,
                        updtype: data.porrarlinedsplline.updtype,
                        netavail: data.porrarlinedsplline.netavail,
                        ncnr: data.porrarlinedsplline.ncnr,
                        countryoforigin: data.porrarlinedsplline.countryoforigin,
                        tariffcd: data.porrarlinedsplline.tariffcd,
                        dutyrate: data.porrarlinedsplline.dutyrate,
                        brandcode: data.porrarlinedsplline.brandcode,
                        mfgprod: data.porrarlinedsplline.mfgprod,
                        vendprod: data.porrarlinedsplline.vendprod,
                        reportno: data.porrarlinedsplline.reportno,
                        rowidPoeral: data.porrarlinedsplline.rowidPoeral,
                        custreserveqty: data.porrarlinedsplline.custreserveqty,
                        custreservefoundfl: data.porrarlinedsplline.custreservefoundfl,
                        custforecastqty: data.porrarlinedsplline.custforecastqty,
                        custforecastfoundfl: data.porrarlinedsplline.custforecastfoundfl,
                        msdsfl: data.porrarlinedsplline.msdsfl,
                        userfield: data.porrarlinedsplline.userfield,
                        surplus: false,
                        porrarlinedspllinesur: []
                     });
                  }

                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^');
               }
            }
         });
      } else {
         // Change mode
         DataService.post('api/po/aspoentry/porrarlinechange', { data: drldwn.updateLineItemRecord, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.porrarlinetotals) {
                     drldwn.displayLineItemTotals(data.porrarlinetotals, false);
                  }

                  if (drldwn.updateLineItemRecord.porrarlinedspllinesur && drldwn.updateLineItemRecord.porrarlinedspllinesur.length) {
                     var surplusLen = drldwn.updateLineItemRecord.porrarlinedspllinesur.length;

                     // Wait until the last surplus record has finished saving. Then refresh the Line Item Detail grid
                     var numberOfSavesToComplete = surplusLen;

                     for (var i2 = 0; i2 < surplusLen; i2++) {
                        var changeSurplusRecord = false;
                        if (drldwn.updateLineItemRecord.porrarlinedspllinesur[i2].accepttype !==
                           drldwn.updateLineItemRecord.porrarlinedspllinesur[i2].origaccepttype) {
                           changeSurplusRecord = true;
                        }
                        if (drldwn.updateLineItemRecord.porrarlinedspllinesur[i2].qtyord !==
                            drldwn.updateLineItemRecord.porrarlinedspllinesur[i2].origqtyord) {
                           changeSurplusRecord = true;
                        }

                        if (changeSurplusRecord) {
                           DataService.post('api/po/aspoentry/porrarlinechange', { data: drldwn.updateLineItemRecord.porrarlinedspllinesur[i2], busy: true }, function (data2) {
                              if (data2) {
                                 MessageService.processMessaging(data2.messaging);
                              }
                              numberOfSavesToComplete--;
                              if (numberOfSavesToComplete === 0) {
                                 drldwn.retrieveReportDetails(true);
                              }
                           });
                        } else {
                           numberOfSavesToComplete--;
                           if (numberOfSavesToComplete === 0) {
                              drldwn.retrieveReportDetails(true);
                           }
                        }
                     }
                  } else {
                     drldwn.retrieveReportDetails(true);
                  }

                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^');
               }
            }
         });
      }
   };
});

app.controller('PoeraDrillDownLineQtyBreaksCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;
   var drldwn = $scope.drldwn;
   self.singleLineItem = drldwn.singleLineItem;

   self.qtyBreakData = {
      rowidPoeral: 0,
      title1: '',
      title2: '',
      upto1: '',
      upto2: '',
      upto3: '',
      upto4: '',
      upto5: '',
      upto6: '',
      upto7: '',
      upto8: '',
      qtybreak1: 0,
      qtybreak2: 0,
      qtybreak3: 0,
      qtybreak4: 0,
      qtybreak5: 0,
      qtybreak6: 0,
      qtybreak7: 0,
      qtybreak8: 0,
      price1: 0,
      price2: 0,
      price3: 0,
      price4: 0,
      price5: 0,
      price6: 0,
      price7: 0,
      price8: 0,
      price9: 0
   };
   self.qtyBreakList = [];

   // First time
   if (self.singleLineItem) {
      self.qtyBreakData.rowidPoeral = self.singleLineItem.rowidPoeral;
      DataService.post('api/po/aspoentry/porrarlineqtybreak', { data: self.qtyBreakData, busy: true }, function (data) {
         if (data) {
            self.qtyBreakData.title1 = data.title1;
            self.qtyBreakData.title2 = data.title2;
            self.qtyBreakData.upto1 = data.upto1;
            self.qtyBreakData.upto2 = data.upto2;
            self.qtyBreakData.upto3 = data.upto3;
            self.qtyBreakData.upto4 = data.upto4;
            self.qtyBreakData.upto5 = data.upto5;
            self.qtyBreakData.upto6 = data.upto6;
            self.qtyBreakData.upto7 = data.upto7;
            self.qtyBreakData.upto8 = data.upto8;
            self.qtyBreakData.qtybreak1 = data.qtybreak1;
            self.qtyBreakData.qtybreak2 = data.qtybreak2;
            self.qtyBreakData.qtybreak3 = data.qtybreak3;
            self.qtyBreakData.qtybreak4 = data.qtybreak4;
            self.qtyBreakData.qtybreak5 = data.qtybreak5;
            self.qtyBreakData.qtybreak6 = data.qtybreak6;
            self.qtyBreakData.qtybreak7 = data.qtybreak7;
            self.qtyBreakData.qtybreak8 = data.qtybreak8;
            self.qtyBreakData.price1 = data.price1;
            self.qtyBreakData.price2 = data.price2;
            self.qtyBreakData.price3 = data.price3;
            self.qtyBreakData.price4 = data.price4;
            self.qtyBreakData.price5 = data.price5;
            self.qtyBreakData.price6 = data.price6;
            self.qtyBreakData.price7 = data.price7;
            self.qtyBreakData.price8 = data.price8;
            self.qtyBreakData.price9 = data.price9;

            self.qtyBreakList.push(
            {
               title: '',
               qty: self.qtyBreakData.title1,
               price: self.qtyBreakData.title2
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto1,
               qty: self.qtyBreakData.qtybreak1,
               price: self.qtyBreakData.price1
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto2,
               qty: self.qtyBreakData.qtybreak2,
               price: self.qtyBreakData.price2
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto3,
               qty: self.qtyBreakData.qtybreak3,
               price: self.qtyBreakData.price3
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto4,
               qty: self.qtyBreakData.qtybreak4,
               price: self.qtyBreakData.price4
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto5,
               qty: self.qtyBreakData.qtybreak5,
               price: self.qtyBreakData.price5
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto6,
               qty: self.qtyBreakData.qtybreak6,
               price: self.qtyBreakData.price6
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto7,
               qty: self.qtyBreakData.qtybreak7,
               price: self.qtyBreakData.price7
            });
            self.qtyBreakList.push(
            {
               title: self.qtyBreakData.upto8,
               qty: self.qtyBreakData.qtybreak8,
               price: self.qtyBreakData.price8
            });
            self.qtyBreakList.push(
            {
               title: '',
               qty: '',
               price: self.qtyBreakData.price9
            });

            //User Hook (do not rename)
            if (self.qtyBreakListContinue) {
               self.qtyBreakListContinue();
            }
         }
      });
   }
   // Cancel action
   self.cancel = function () {
      drldwn.qtyBreakModal.destroy();
   };

   // Submit action
   self.submit = function () {
      drldwn.qtyBreakModal.destroy();
   };
});

app.controller('PoeraDrillDownLineSuperCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   self.detailRecord = $stateParams.detailRecord;
   var drldwn = $scope.drldwn;
   self.superList = [];

   if (self.detailRecord) {
      var criteria = {
         prod: self.detailRecord.shipprod,
         whse: base.drillDownRecord.whse,
         porrarfl: true,
         superfl: true
      };

      DataService.post('api/oe/asoeline/oelinesupersedeavailability', { data: criteria, busy: true }, function (data) {
         if (data && data.length) {
            self.superList = [];
            var len = data.length;
            for (var i = 0; i < len; i++) {
               self.superList.push(
                  {
                     prod: data[i].prod,
                     descrip: data[i].descrip,
                     region: data[i].region,
                     whse: data[i].whse,
                     qtyavail: data[i].qtyavail,
                     surplus: data[i].surplus,
                     unitstock: data[i].unitstock
                  });
            }
         }
      });
   }
});

app.controller('PoeraDrillDownLineProgBuy', function ($scope, $state, $stateParams, DataService, GridService, MessageService, AuthService, UserService, ModalService) {
   var self = this;
   var base = $scope.base;
   self.detailRecord = $stateParams.detailRecord;
   var drldwn = $scope.drldwn;

   self.programBuyList = [];
   self.programBuyHeader = {
      reportno: 0,
      lineno: 0,
      seqno: 0,
      fiallocqty: 0,
      fiprice: 0,
      fiprod: '',
      fiproddesc: '',
      fiqty: 0,
      fiunitstock: '',
      icspecrecno: 0,
      dunitconv: 0,
      dqtyord: 0
   };
   self.deletedWhseList = [];

   self.programBuyCriteria = {
      cono: UserService.getCono(),
      reportno: 0,
      lineno: 0,
      seqno: 0,
      dqtyord: 0
   };
   self.adjustFlag = false;
   self.newQtyOrd = 0;

   if (self.detailRecord) {
      self.programBuyCriteria.reportno = base.drillDownRecord.reportno;
      self.programBuyCriteria.lineno = self.detailRecord.lineno;
      self.programBuyCriteria.seqno = self.detailRecord.seqno;

      DataService.post('api/po/aspoentry/porrarlineprogbuyinitialize', { data: self.programBuyCriteria, busy: true }, function (data) {
         if (data) {
            self.programBuyList = [];
            self.deletedWhseList = [];
            if (data.porrarlineprogbuywhses) {
               self.programBuyList = data.porrarlineprogbuywhses;
            }
            if (data.porrarlineprogbuy) {
               self.programBuyHeader = data.porrarlineprogbuy;
            }
         }
      });
   }

   self.create = function () {
      ModalService.showModal('po/poera/tabs/line-programbuy-add.json', 'PoeraDrillDownLineProgBuyAddCtrl as pb', $scope, function (modal) {
         self.programBuyAdd = modal;
      });
   };

   self.delete = function () {
      var records = GridService.getSelectedRecords(self.grid);

      if (records && records.length && records.length === 1) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var warehouseToDelete = records[0].whse;
            var processingWhseList = [];

            self.programBuyList.forEach(function (record) {
               processingWhseList.push(record);
            });

            if (self.deletedWhseList) {
               self.deletedWhseList.forEach(function (record) {
                  processingWhseList.push(record);
               });
            }
            DataService.post('api/po/aspoentry/porrarlineprogbuydeletewhse', { data: { porrarlineprogbuywhses: processingWhseList, porrarlineprogbuy: self.programBuyHeader, cDeleteWhse: warehouseToDelete }, busy: true }, function (data) {
               if (data) {
                  if (data.porrarlineprogbuy) {
                     self.programBuyHeader = data.porrarlineprogbuy;
                  }
                  if (data.porrarlineprogbuywhses) {
                     self.programBuyList = [];
                     self.deletedWhseList = [];
                     data.porrarlineprogbuywhses.forEach(function (record) {
                        if (!record.justdeleted) {
                           self.programBuyList.push(record);
                        } else {
                           self.deletedWhseList.push(record);
                        }
                     });
                  }
               }
            });
         });
      } else {
         MessageService.info('global.error', 'message.please.select.a.single.row.for.this.feature');
      }
   };

   self.createReturned = function (warehouse) {
      // Include any deleted whse records.
      var processingWhseList = [];
      self.programBuyList.forEach(function (record) {
         processingWhseList.push(record);
      });

      if (self.deletedWhseList) {
         self.deletedWhseList.forEach(function (record) {
            processingWhseList.push(record);
         });
      }

      DataService.post('api/po/aspoentry/porrarlineprogbuyaddwhse', { data: { porrarlineprogbuywhses: processingWhseList, porrarlineprogbuy: self.programBuyHeader, cNewWhse: warehouse }, busy: true }, function (data) {
         if (data) {
            if (data.porrarlineprogbuy) {
               self.programBuyHeader = data.porrarlineprogbuy;
            }
            if (data.porrarlineprogbuywhses) {
               self.programBuyList = [];
               self.deletedWhseList = [];
               data.porrarlineprogbuywhses.forEach(function (record) {
                  if (!record.justdeleted) {
                     self.programBuyList.push(record);
                  } else {
                     self.deletedWhseList.push(record);
                  }
               });
            }
         }
      });
   };

   self.onCellChange = function (e, args) {
      var record = self.programBuyList[args.row];
      if (record) {
         // No need to include any deleted whse records.
         var processingWhseList = [];
         self.programBuyList.forEach(function (record) {
            processingWhseList.push(record);
         });
         DataService.post('api/po/aspoentry/porrarlineprogbuychgwhseqty', { data: { porrarlineprogbuywhses: processingWhseList, porrarlineprogbuy: self.programBuyHeader, cWhse: record.whse }, busy: true }, function (data) {
            if (data) {
               if (data.porrarlineprogbuy) {
                  self.programBuyHeader = data.porrarlineprogbuy;
               }
               if (data.porrarlineprogbuywhses) {
                  self.programBuyList = [];
                  data.porrarlineprogbuywhses.forEach(function (record) {
                     self.programBuyList.push(record);
                  });
               }
            }
         });
      }
   };

   self.submit = function () {
      self.adjustFlag = false;
      if (self.programBuyHeader.fiallocqty !== 0) {
         MessageService.okCancel('global.question', 'question.do.you.want.to.adjust.line.item.order.quantity', function () {
            self.adjustFlag = true;
            self.submitContinue();
         });
      } else {
         self.submitContinue();
      }
   };

   self.submitContinue = function () {
      var processingWhseList = [];

      self.programBuyList.forEach(function (record) {
         processingWhseList.push(record);
      });

      if (self.deletedWhseList) {
         self.deletedWhseList.forEach(function (record) {
            processingWhseList.push(record);
         });
      }

      DataService.post('api/po/aspoentry/porrarlineprogbuysubmit', { data: { porrarlineprogbuywhses: processingWhseList, porrarlineprogbuy: self.programBuyHeader, lAdjustFlag: self.adjustFlag }, busy: true }, function (data) {
         if (data) {
            if (data.lRedisplayLineItem || data.dQtyOrd === 0) {
               self.newQtyOrd = data.dQtyOrd;
               self.submitLineUpdate();
            } else {
               $state.go('^');
            }
         }
      });
   };

   self.submitLineUpdate = function () {
      var updateLineItem = {
         rowidPoeral: self.detailRecord.rowidPoeral,
         lineno: self.detailRecord.lineno,
         seqno: self.detailRecord.seqno,
         accepttype: self.detailRecord.accepttype,
         qtyord: self.newQtyOrd,
         unit: self.detailRecord.unit,
         price: self.detailRecord.price,
         rushfl: self.detailRecord.rushfl,
         contractno: self.detailRecord.contractno,
         priceoverfl: false,
         pdsvcrecno: self.detailRecord.pdsvcrecno
      };
      if (self.newQtyOrd === 0) {
         updateLineItem.accepttype = 'N';
      }

      DataService.post('api/po/aspoentry/porrarlinechange', { data: updateLineItem, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               drldwn.retrieveReportDetails();
               $state.go('^');
            }
         }
      });
   };
});

app.controller('PoeraDrillDownLineProgBuyAddCtrl', function ($scope, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var drldwnprogbuy = $scope.drldwnprogbuy;

   self.modalTitle = MessageService.get('global.add') + ' ' + MessageService.get('global.warehouse');

   self.warehouse = '';

   // Cancel action
   self.cancel = function () {
      drldwnprogbuy.programBuyAdd.destroy();
   };

   // Submit action
   self.submit = function () {
      drldwnprogbuy.createReturned(self.warehouse);
      drldwnprogbuy.programBuyAdd.destroy();
   };
});

app.controller('PoeraDrillDownLineItemDrillDownCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drillDownLineItemRecord = base.drillDownLineItemRecord;

   self.saveButtonEnabled = false;

   self.altVendorList = [];

   self.extendedLineItem = {
      rowidPoeral: 0,
      descrip: '',
      descripenabled: false,
      weight: 0,
      weightenabled: false,
      cubes: 0,
      cubesenabled: false,
      duedt: '',
      reqshipdt: '',
      lockfl: false,
      rcvunavailfl: false,
      inspectunavailty: '',
      inspectunavailtydesc: '',
      qtyord: 0,
      stkqtyord: 0,
      totweight: 0,
      totcubes: 0,
      ignoreltfl: false,
      ignoreltflenabled: false,
      inclunavailreasqty: '',
      regrind: '',
      frozenmmyy: '',
      frozenmnths: 0,
      frozentype: '',
      frozentypedesc: '',
      laststkoutdt: '',
      nodaysstockout: 0,
      notimesstockout: 0,
      stockout15fl: false,
      stockavaildt: '',
      seasonbeg: 0,
      seasonend: 0,
      acquiredt: '',
      acquiredtenabled: false,
      enterdt: '',
      netavail: 0,
      bo: 0,
      qtyonorder: 0,
      qtydemand: 0,
      ponetavail: 0,
      tiedorder: '',
      tiedorderenabled: false,
      countryoforigin: '',
      countryenabled: false,
      tariffcd: '',
      tariffcdenabled: false,
      dutyrate: 0,
      tiedorderhyperlink: '',
      userfield: ''
   }

   // First time here
   if (self.drillDownLineItemRecord) {
      self.extendedLineItem.rowidPoeral = base.drillDownLineItemRecord.rowidPoeral;
      DataService.post('api/po/aspoentry/porrarlineextendretrieve', { data: self.extendedLineItem, busy: true }, function (data) {
         if (data) {
            self.extendedLineItem.rowidPoeral = data.rowidPoeral;
            self.extendedLineItem.descrip = data.descrip
            self.extendedLineItem.descripenabled = data.descripenabled;
            self.extendedLineItem.weight = data.weight;
            self.extendedLineItem.weightenabled = data.weightenabled;
            self.extendedLineItem.cubes = data.cubes;
            self.extendedLineItem.cubesenabled = data.cubesenabled;
            self.extendedLineItem.duedt = data.duedt;
            self.extendedLineItem.reqshipdt = data.reqshipdt;
            self.extendedLineItem.lockfl = data.lockfl
            self.extendedLineItem.rcvunavailfl = data.rcvunavailfl;
            self.extendedLineItem.inspectunavailty = data.inspectunavailty;
            self.extendedLineItem.inspectunavailtydesc = data.inspectunavailtydesc;
            self.extendedLineItem.qtyord = data.qtyord;
            self.extendedLineItem.stkqtyord = data.stkqtyord;
            self.extendedLineItem.totweight = data.totweight;
            self.extendedLineItem.totcubes = data.totcubes;
            self.extendedLineItem.ignoreltfl = data.ignoreltfl;
            self.extendedLineItem.ignoreltflenabled = data.ignoreltflenabled;
            self.extendedLineItem.inclunavailreasqty = data.inclunavailreasqty;
            self.extendedLineItem.regrind = data.regrind;
            self.extendedLineItem.frozenmmyy = data.frozenmmyy;
            self.extendedLineItem.frozenmnths = data.frozenmnths;
            self.extendedLineItem.frozentype = data.frozentype;
            self.extendedLineItem.frozentypedesc = data.frozentypedesc;
            self.extendedLineItem.laststkoutdt = data.laststkoutdt
            self.extendedLineItem.nodaysstockout = data.nodaysstockout;
            self.extendedLineItem.notimesstockout = data.notimesstockout;
            self.extendedLineItem.stockout15fl = data.stockout15fl;
            self.extendedLineItem.stockavaildt = data.stockavaildt;
            self.extendedLineItem.seasonbeg = data.seasonbeg;
            self.extendedLineItem.seasonend = data.seasonend;
            self.extendedLineItem.acquiredt = data.acquiredt;
            self.extendedLineItem.acquiredtenabled = data.acquiredtenabled;
            self.extendedLineItem.enterdt = data.enterdt;
            self.extendedLineItem.netavail = data.netavail;
            self.extendedLineItem.bo = data.bo;
            self.extendedLineItem.qtyonorder = data.qtyonorder;
            self.extendedLineItem.qtydemand = data.qtydemand;
            self.extendedLineItem.ponetavail = data.ponetavail;
            self.extendedLineItem.tiedorder = data.tiedorder;
            self.extendedLineItem.tiedorderenabled = data.tiedorderenabled;
            self.extendedLineItem.countryoforigin = data.countryoforigin;
            self.extendedLineItem.countryenabled = data.countryenabled;
            self.extendedLineItem.tariffcd = data.tariffcd;
            self.extendedLineItem.tariffcdenabled = data.tariffcdenabled;
            self.extendedLineItem.dutyrate = data.dutyrate;
            self.extendedLineItem.tiedorderhyperlink = '';
            self.extendedLineItem.userfield = data.userfield;

            if (base.drillDownLineItemRecord.custnumber && base.drillDownLineItemRecord.custnumber !== '0') {
               self.extendedLineItem.tiedorderhyperlink = MessageService.get('global.customer.number') + ' ' + base.drillDownLineItemRecord.custnumber + ' ' + base.drillDownLineItemRecord.custname;
            } else if (base.drillDownLineItemRecord.blno && base.drillDownLineItemRecord.blno > 0) {
               self.extendedLineItem.tiedorderhyperlink = MessageService.get('global.blanket.po.number') + ' ' + base.drillDownLineItemRecord.blno + '-' + base.drillDownLineItemRecord.blsuf;
            }

            //User Hook (do not rename)
            if (self.extendedLineItemContinue) {
               self.extendedLineItemContinue();
            }
         }
      });

      var icsecCriteria = {
         type: 'v',
         prod: base.drillDownLineItemRecord.shipprod
      };
      DataService.post('api/ic/icsec/geticsecsbytypeprod', { data: icsecCriteria, busy: true }, function (data) {
         if (data) {
            self.altVendorList = data;
         }
      });
   }

   self.getSubTitle = function () {
      var rtn = MessageService.get('global.line.number') + ' ' + base.drillDownLineItemRecord.lineno + ' ' +
         MessageService.get('global.product') + ' ' + base.drillDownLineItemRecord.shipprod;
      return rtn;
   };

   self.tabVisible = function (type) {
      var rtn = true;
      if (base.drillDownLineItemRecord.specnstype.toLowerCase() === 'n') {
         if (type === 'altvendor' || type === 'usageanalysis') {
            rtn = false;
         }
      }

      return rtn;
   };

   self.activate = function (type) {
      if (type === 'extend') {
         self.saveButtonEnabled = true;
      } else {
         self.saveButtonEnabled = false;
      }
   };

   self.isSaveButtonEnabled = function () {
      return self.saveButtonEnabled;
   };

   self.isUsageButtonEnabled = function () {
      var retn = false;
      if (base.drillDownLineItemRecord.specnstype.toLowerCase() === 'n') {
         retn = false;
      } else {
         retn = true;
      }
      return retn;
   };

   self.isRecalcOrderControlsButtonEnabled = function () {
      var rtn = false;
      if (self.saveButtonEnabled && base.drillDownLineItemRecord.specnstype.toLowerCase() !== 'n') {
         rtn = true;
      }
      return rtn;
   };

   self.submit = function () {
      DataService.post('api/po/aspoentry/porrarlineextendupdate', { data: self.extendedLineItem, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      });
   };

   self.launchUsageView = function () {
      $state.go('.productWarehouseUsage', { enabled: true, prod: base.drillDownLineItemRecord.shipprod, whse: base.drillDownRecord.whse, unit: '', recalcEnabled: true, returnState: $state.current.name });
   };

   self.recalculateOrderingControls = function () {
      var criteriaList = [];
      criteriaList.push(
      {
         prod: base.drillDownLineItemRecord.shipprod,
         whse: base.drillDownRecord.whse,
         reportno: base.drillDownRecord.reportno
      });
      DataService.post('api/ic/asicadmin/icamrrecalcorderingcontrols', { data: criteriaList, busy: true }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };
});
