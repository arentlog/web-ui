'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('wt', 'wtera', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('wt', 'wtera');

   $stateProvider.state('wtera.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtera/detail.json');
            },
            controller: 'WteraDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('wtera.runreport', {
      url: '/run-report',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtera/run-report.json');
            },
            controller: 'WteraRunReportCtrl as runrpt'
         }
      }
   });

   $stateProvider.state('wtera.merge', {
      url: '/merge',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtera/merge.json');
            },
            controller: 'WteraMergeCtrl as mrg'
         }
      }
   });

   $stateProvider.state('wtera.drilldown', {
      url: '/drilldown',
      params: { drillDownRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtera/drilldown.json');
            },
            controller: 'WteraDrillDownCtrl as drldwn'
         }
      }
   });

   $stateProvider.state('wtera.drilldown.create', {
      url: '/line-item-create',
      params: {
         isSurplusMode: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtera/tabs/line-detail.json');
            },
            controller: 'WteraDrillDownLineCreateCtrl as drldwndetl'
         }
      }
   });

   $stateProvider.state('wtera.drilldown.detail', {
      url: '/line-item-detail',
      params: {
         detailRecord: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtera/tabs/line-detail.json');
            },
            controller: 'WteraDrillDownLineDetailCtrl as drldwndetl'
         }
      }
   });

   $stateProvider.state('wtera.drilldown.supersede', {
      url: '/supersede',
      params: {
         detailRecord: null
      },
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtera/tabs/line-super.json');
            },
            controller: 'WteraDrillDownLineSuperCtrl as drldwnsuper'
         }
      }
   });

   $stateProvider.state('wtera.drilldown.customerreservation', {
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

   $stateProvider.state('wtera.drilldown.customerforecast', {
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
});

app.controller('WteraBaseCtrl', function ($state, DataService, UserService) {
   var self = this;

   self.criteria = {
      fromwhse: '',
      towhse: '',
      tocono: UserService.getCono(),
      recordcountlimit: 500
   };

   self.updateRecord = {
      fromwhse: '',
      towhse: '',
      mergefl: false,
      duedt: '',
      reqshipdt: '',
      rowidWterah: 0,
      reportno: 0
   };

   self.drillDownRecord = {
      reportno: 0,
      shipfmwhse: '',
      shipfmname: '',
      shiptowhse: '',
      shiptoname: ''
   };

   self.drillDownLabel = '';

   self.addMode = false;
   self.isInAddMode = function () {
      return self.addMode;
   };

   self.isMaster = function () {
      return $state.is('wtera.master');
   };

   self.includesMaster = function () {
      return $state.includes('wtera.master');
   };

   self.isDetail = function () {
      return $state.is('wtera.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wtera.detail');
   };

   self.isDrillDown = function () {
      return $state.is('wtera.drilldown');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/wt/aswtentry/wtrrarreportlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.wtrrarreptlistresults;
      });
   };

   self.runReportLaunch = function () {
      $state.go('wtera.runreport');
   };

   self.runMergeLaunch = function () {
      $state.go('wtera.merge');
   };
});

app.controller('WteraSearchCtrl', function ($scope, $state, DataService, Utils, UserService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.tocono = UserService.getCono();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('wtera.master');
      }

      base.search();
   };
});

app.controller('WteraMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

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
            rowidWterah: record.rowidWterah,
            mergefl: record.mergefl
         });

         DataService.post('api/wt/aswtentry/wtrrarreportadjustmerge', { data: rrarsToUpdate, busy: true }, function (data) {
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
                  rowidWterah: record.rowidWterah,
                  mergefl: flag
               });
            });

            DataService.post('api/wt/aswtentry/wtrrarreportadjustmerge', { data: rrarsToUpdate, busy: true }, function (data) {
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
                  rowidWterah: record.rowidWterah,
                  seqno: seqNo
               });
            });
            DataService.post('api/wt/aswtentry/wtrrarreportdelete', { data: rrarsToDelete, busy: true }, function (data) {
               base.search();
            });
         }
      });
   };

   self.create = function () {
      base.addMode = true;
      base.updateRecord.fromwhse = base.criteria.fromwhse;
      base.updateRecord.towhse = '';
      base.updateRecord.mergefl = false;
      base.updateRecord.duedt = '';
      base.updateRecord.reqshipdt = '';
      base.updateRecord.reportno = 0;
      $state.go('^.detail');
   };

   self.edit = function () {
      base.addMode = false;
      var singleRecord = GridService.getSelectedRecord(base.grid);
      if (singleRecord) {
         base.updateRecord.fromwhse = singleRecord.shipfmwhse;
         base.updateRecord.towhse = singleRecord.shiptowhse;
         base.updateRecord.mergefl = singleRecord.mergefl;
         base.updateRecord.duedt = singleRecord.duedt;
         base.updateRecord.reqshipdt = singleRecord.reqshipdt;
         base.updateRecord.rowidWterah = singleRecord.rowidWterah;
         base.updateRecord.reportno = singleRecord.reportno;
      }
      $state.go('^.detail');
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;

      base.drillDownRecord.reportno = record.reportno;
      base.drillDownRecord.shipfmwhse = record.shipfmwhse;
      base.drillDownRecord.shipfmname = record.shipfmname;
      base.drillDownRecord.shiptowhse = record.shiptowhse;
      base.drillDownRecord.shiptoname = record.shiptoname;
      base.drillDownLabel =
         MessageService.get('global.report.number') + ': ' +
         base.drillDownRecord.reportno;

      DataService.get('api/wt/aswtentry/wtrrarreportcheckdrilldownaccess/' + base.drillDownRecord.reportno, { busy: true }, function (data) {

         if (data) {
            MessageService.alert('global.warning', data);
         }

         $state.go('wtera.drilldown', { drillDownRecord: base.drillDownRecord });
      });
   };
});

app.controller('WteraDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.addingNewReport = {
      shipfmwhse: '',
      shiptowhse: '',
      reportno: 0
   };

   self.detailTitle = MessageService.get('global.add.blank.rrar...');
   var addMode = base.isInAddMode();
   if (!addMode) {
      self.detailTitle = MessageService.get('global.update') + ' ' + base.updateRecord.reportno;
   }

   self.isAddMode = function () {
      return true;
   };

   self.isDetail = function () {
      return false;
   };

   // Save
   self.submit = function () {
      var addMode = base.isInAddMode();
      if (addMode) {

         self.addingNewReport.shipfmwhse = base.updateRecord.fromwhse;
         self.addingNewReport.shiptowhse = base.updateRecord.towhse;
         self.addingNewReport.reportno = 0;

         DataService.post('api/wt/wterah/getwterahlistbyshipfmwhseshiptowhse', { data: self.addingNewReport, busy: true }, function (data) {

            var existingReportsCount = 0;
            if (data) {
               existingReportsCount = data.length;
            }
            if (existingReportsCount === 0) {
               DataService.post('api/wt/aswtentry/wtrrarreportaddnew', { data: self.addingNewReport, busy: true }, function (data) {
                  self.addingNewReport.reportno = data.newreportno;
                  self.addingNewReport.shipfmname = data.shipfmname;
                  self.addingNewReport.shiptoname = data.shiptoname;

                  MessageService.info('global.information', $translate.instant('message.save.operation.completed.successfully.report.number') + ' ' + self.addingNewReport.reportno);
                  self.launchDrillDownAfterAdd();
               });
            } else {
               var ques = MessageService.get('question.warning.a.wt.rrar.report.already.exists.for.this.');
               MessageService.okCancel('global.question', ques, function () {
                  DataService.post('api/wt/aswtentry/wtrrarreportaddnew', { data: self.addingNewReport, busy: true }, function (data) {
                     self.addingNewReport.reportno = data.newreportno;
                     self.addingNewReport.shipfmname = data.shipfmname;
                     self.addingNewReport.shiptoname = data.shiptoname;

                     MessageService.info('global.information', $translate.instant('message.save.operation.completed.successfully.report.number') + ' ' + self.addingNewReport.reportno);
                     self.launchDrillDownAfterAdd();
                  });
               });
            }
         });
      } else {
         DataService.post('api/wt/aswtentry/wtrrarreportupdate', { data: base.updateRecord, busy: true }, function (data) {
            var singleRecord = GridService.getSelectedRecord(base.grid);
            if (singleRecord) {
               singleRecord.mergefl = base.updateRecord.mergefl;
               singleRecord.duedt = base.updateRecord.duedt;
               singleRecord.reqshipdt = base.updateRecord.reqshipdt;
               var indx = base.dataset.indexOf(singleRecord);
               base.grid.updateRow(indx);
            }
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master');
         });
      }
   };

   self.launchDrillDownAfterAdd = function () {

      base.drillDownRecord.reportno = self.addingNewReport.reportno;
      base.drillDownRecord.shipfmwhse = self.addingNewReport.shipfmwhse;
      base.drillDownRecord.shipfmname = self.addingNewReport.shipfmname;
      base.drillDownRecord.shiptowhse = self.addingNewReport.shiptowhse;
      base.drillDownRecord.shiptoname = self.addingNewReport.shiptoname;
      base.drillDownLabel =
         MessageService.get('global.report.number') + ': ' +
         base.drillDownRecord.reportno;

      $state.go('wtera.drilldown', { drillDownRecord: base.drillDownRecord });
   };
});

app.controller('WteraRunReportCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.runReport = {
      requesttype: 's',
      whse: '',
      fromwhse: '',
      towhse: '',
      printusagehistfl: true,
      printrushfl: false,
      printdnrfl: false,
      printsubsfl: false,
      printcommentsfl: true,
      whsesurplus: 'c',
      processtype: 'b'
   };

   // Request Type = (S)upply - Whse Label = "Ship From Warehouse
   // Request Type = (R)equest - Whse Label = "Ship To Warehouse
   self.whseLabel = MessageService.get('global.ship.from.whse');

   // Request Type = (S)upply - Whse Label = "Ship To Warehouse
   // Request Type = (R)equest - Whse Label = "Ship From Warehouse
   self.whseRangeLabel = MessageService.get('global.ship.to.warehouse');

   self.requestTypeChanged = function () {
      if (self.runReport.requesttype === 'r') {
         self.whseLabel = MessageService.get('global.ship.to.warehouse');
         self.whseRangeLabel = MessageService.get('global.ship.from.whse');
      } else {
         self.whseLabel = MessageService.get('global.ship.from.whse');
         self.whseRangeLabel = MessageService.get('global.ship.to.warehouse');
      }
   };

   var criteria = {
      wtrrarreptnewreptrun: self.runReport,
      printersettings: {}
   };

   self.submit = function () {
      criteria.printersettings = self.printerControl.printerSettings;
      DataService.post('api/wt/aswtentry/wtrrarreportnewreptrun', { data: criteria, busy: true }, function (data) {

         // don't force a refresh since no rows are changed
         $state.go('^.master', { refreshSearch: false }, { reload: '^.master' });
      });
   };
});

app.controller('WteraMergeCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.mergeAllReports = 'c';
   self.mergeReports = {
      orderdtmonth: '**',
      orderdtday: '**',
      orderdtyear: '**',
      whse: '',
      printqtyfl: false
   };

   self.printSettingsCollection = [];
   self.rrarsToMerge = [];

   self.submit = function () {

      // Clear out the arrays
      self.printSettingsCollection = [];
      self.rrarsToMerge = [];

      self.pickTicketPrinterControl.printerSettings.printerinstance = 'merge-pickticket';
      self.exceptionPrinterControl.printerSettings.printerinstance = 'merge-exception';

      self.printSettingsCollection.push(self.pickTicketPrinterControl.printerSettings);
      self.printSettingsCollection.push(self.exceptionPrinterControl.printerSettings);

      if (base.grid && base.dataset) {
         if (self.mergeAllReports === 'c') {
            // RRAR Reports that are checked (selected)
            var records = GridService.getSelectedRecords(base.grid);
            if (records && records.length) {
               records.forEach(function (record) {
                  self.rrarsToMerge.push(
                  {
                     rowidWterah: record.rowidWterah
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
                     rowidWterah: record.rowidWterah
                  });
               }
            }
         }
      }

      if (self.rrarsToMerge.length === 0) {
         MessageService.error('global.error', 'message.please.select.at.least.one.row.that.is.ready.to.be');
         $state.go('^.master', { refreshSearch: false }, { reload: '^.master' });
      } else {
         DataService.post('api/wt/aswtentry/wtrrarreportmergerun', { data: { printersettings: self.printSettingsCollection, wtrrarreptmergerunrepts: self.rrarsToMerge, wtrrarreptmergerunsngl: self.mergeReports }, busy: true }, function (data) {
            // don't force a refresh since no rows are changed
            $state.go('^.master', { refreshSearch: false }, { reload: '^.master' });
         });
      }
   };
});

app.controller('WteraDrillDownCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.MENU_FUNCTION_ICSW = 'icsw';
   self.securityLevelICSW = SecurityService.getSecurityLevel(self.MENU_FUNCTION_ICSW);
   self.drillDownRecord = $stateParams.drillDownRecord;
   self.headerTabSelected = false;
   self.lineItemTabSelected = true;
   self.lineItemsList = [];
   self.headerData = {};
   self.lineItemTotals = {
      totqtyordered: 0,
      totqtyorderedstring: '',
      totlineamount: 0,
      totlineamountstring: '',
      totweight: 0,
      totweightstring: '',
      totcubes: 0,
      totcubesstring: ''
   };

   self.updateLineItemRecord = {
      reportno: 0,
      lineno: 0,
      shipprod: '',
      qtyord: 0,
      unit: '',
      origunit: '',
      prodcost: 0,
      rushfl: false,
      specnstype: '',
      restrictovrfl: false,
      restricterrmess: '',
      addMode: false,
      rowidWteral: 0,
      seqno: 0,
      accepttype: '',
      wtrrarlinedspllinesur: []
   };

   self.mergeAllReports = 'c';

   self.saveButtonEnabled = false;
   self.isSaveButtonEnabled = function () {
      return self.saveButtonEnabled;
   };

   self.activate = function (type) {
      if (type === 'header') {
         self.saveButtonEnabled = true;
      } else {
         self.saveButtonEnabled = false;
      }
   };

   self.displayLineItemTotals = function (totals) {
      self.lineItemTotals.totqtyordered = totals.totqtyordered;
      self.lineItemTotals.totqtyorderedstring = Locale.formatNumber(totals.totqtyordered, { style: 'decimal', maximumFractionDigits: 2 });
      self.lineItemTotals.totlineamount = totals.totlineamount;
      self.lineItemTotals.totlineamountstring = Locale.formatNumber(totals.totlineamount, { style: 'decimal', maximumFractionDigits: 2 });
      self.lineItemTotals.totweight = totals.totweight;
      self.lineItemTotals.totweightstring = Locale.formatNumber(totals.totweight, { style: 'decimal', minimumFractionDigits: 5, maximumFractionDigits: 5 });
      self.lineItemTotals.totcubes = totals.totcubes;
      self.lineItemTotals.totcubesstring = Locale.formatNumber(totals.totcubes, { style: 'decimal', minimumFractionDigits: 5, maximumFractionDigits: 5 });
   };

   self.saveHeaderData = function () {
      DataService.post('api/wt/aswtentry/wtrrarreportheaderupdate', { data: self.headerData, busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      });
   };

   self.retrieveReportHeader = function () {
      self.headerData = DataService.getResource('api/wt/aswtentry/wtrrarreportheaderretrieve/' + self.drillDownRecord.reportno, { busy: true });
   };

   self.displayDrillDownData = function (fetchHeader) {
      DataService.get('api/wt/aswtentry/wtrrarlinedisplay/' + self.drillDownRecord.reportno, { busy: true }, function (data) {
         if (data) {
            if (data.wtrrarlinedsplline) {

               // SI call returns a ProDataSet with 2 temp-tables (one is a heirarchial display)
               self.lineItemsList = data.wtrrarlinedsplline;
            }

            if (data.wtrrarlinetotals) {
               self.displayLineItemTotals(data.wtrrarlinetotals);
            }
         }
      });

      // Only get the report header if needed. To improve performance we only fetch it when the Header tab is activated,
      // or when line items change (because totals on the header object may change).
      if (fetchHeader) {
         self.retrieveReportHeader();
      }
   };

   if (self.drillDownRecord) {
      self.displayDrillDownData(false);
   }

   self.productHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem) {
         //By design, we want to see product inquiry in the To warehouse on the hyperlink.
         if (lineItem.specnstype.toLowerCase() !== 'n') {
            $state.go('icip.detail', { pk: lineItem.shipprod, pk2: base.drillDownRecord.shiptowhse });
         } else {
            MessageService.info('global.information', 'message.selected.product.is.a.nonstock.no.hyperlink');
         }
      }
   };

   //NOTE:  By design, we're also calling this on 'ExitEditMode' as well on the 'QtyOrd' column.  The
   //reason is, we need to fire this call when they simply change the value to the same value it was.
   //A side effect though, this will also fire when they simply click in the row and leave.  That
   //can't be addressed with the SoHo controls.
   self.onCellChange = function (e, args) {
      var record = self.lineItemsList[args.row];
      if (record) {
         if (args.column.field.toLowerCase() === 'qtyord') {
            if (record.qtyord === 0) {
               record.accepttype = 'n';
            } else {
               record.accepttype = 'y';
            }

            //User Hook (do not rename)
            if (self.setCriteriaOnCellChange) {
               self.setCriteriaOnCellChange(record);
            }

            DataService.post('api/wt/aswtentry/wtrrarlinechange', { data: record, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     if (data.wtrrarlinetotals) {
                        self.displayLineItemTotals(data.wtrrarlinetotals, true);
                     }
                  }

                  //User Hook (do not rename)
                  if (self.onCellChangeContinue) {
                     self.onCellChangeContinue(data.wtrrarlinetotals, args);
                  }

                  self.grid.updateRow(args.row);
               }
            });
            //'Accepttype' is a dropdown with Yes or No as valid options and converted to y,n.  NOTE:  The backend
            //call does not allow for Blank as an option, so it's not presented in the UI as an option to the user.
         } else if (args.column.field.toLowerCase() === 'accepttype') {
            //Which will only be one in this case, the call expects a collection.
            var linesToUpdate = [{ rowidWteral: record.rowidWteral }];

            //TODO: For the time being, we needed to make this field a text field instead of a dropdown due
            //to a bug in the SoHo Grid with regards to arrowing.  Once we get that next SoHo code, we can
            //convert this back to a dropdown with Yes / No options.
            //1) Change Column Widget back to a Dropdown.
            //2) Remove this entire If/Else Condition and leave the API call intact.
            if (record.accepttype.toLowerCase() === 'y' || record.accepttype.toLowerCase() === 'n' || record.accepttype.trim() === '') {
               DataService.post('api/wt/aswtentry/wtrrarlineaccept', { data: { wtrrarlineaccept: linesToUpdate, cAcceptType: record.accepttype }, busy: true }, function (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     if (data.wtrrarlinetotals) {
                        self.displayLineItemTotals(data.wtrrarlinetotals, false);
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

         // TODO:  this is returning an incorrect set of records - back and forth/accept = yes, then no
         var records = [];
         records = GridService.getSelectedRecords(self.grid);
         if (records && records.length) {
            var linesToUpdate = [];

            records.forEach(function (record) {
               record.accepttype = acceptType;
               linesToUpdate.push(
               {
                  rowidWteral: record.rowidWteral
               });
            });

            DataService.post('api/wt/aswtentry/wtrrarlineaccept', { data: { wtrrarlineaccept: linesToUpdate, cAcceptType: acceptType }, busy: true }, function (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.wtrrarlinetotals) {
                     self.displayLineItemTotals(data.wtrrarlinetotals);
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

   self.isCustomerForecastEnabled = function () {
      var retn = false;
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         if (singleRecord.custforecastqty && singleRecord.custforecastqty > 0) {
            retn = true;
         } else if (singleRecord.custforecastqty && singleRecord.custforecastqty < 0) {
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

   self.customerReservation = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         $state.go('wtera.drilldown.customerreservation', {
            prod: singleRecord.shipprod,
            whse: base.drillDownRecord.shiptowhse
         });
      }
   };

   self.maintainWhseProduct = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         var params = {
            prod: singleRecord.shipprod,
            whse: self.drillDownRecord.shiptowhse,
            fillmode: true
         };
         DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               $state.go('icsw.detail.edit', { id: data.rowID, activeTab: 'ordering' });
            }
         });
      }
   };

   self.customerForecast = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         $state.go('wtera.drilldown.customerforecast', {
            reportno: base.drillDownRecord.reportno,
            prod: singleRecord.shipprod,
            whse: base.drillDownRecord.shiptowhse,
            unit: singleRecord.unit
         });
      }
   };

   self.supersedeAvail = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         if (!singleRecord.superfl) {
            MessageService.info('global.error', ' message.this.product.does.not.have.any.supersede.availabil');
         } else {
            $state.go('wtera.drilldown.supersede', { detailRecord: singleRecord });
         }
      } else {
         MessageService.info('global.error', 'message.please.select.one.row.for.the.supersede.availabili');
      }
   };

   self.recalcOrderingControls = function () {
      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         if (singleRecord.specnstype.toLowerCase() === 'n') {
            MessageService.info('global.error', 'message.the.product.must.be.a.stocked.item');
         } else {
            var criterialList = [];
            criterialList.push(
            {
               prod: singleRecord.shipprod,
               whse: base.drillDownRecord.shiptowhse
            });

            DataService.post('api/ic/asicadmin/icamrrecalcorderingcontrols', { data: criterialList, busy: true }, function (data) {
               if (data) {
                  MessageService.info('global.information', 'global.update.complete');
               }
            });
         }
      } else {
         MessageService.info('global.error', 'message.please.select.one.row.to.recalculate.ordering.cont');
      }
   };

   // Create new line item
   self.create = function () {

      self.updateLineItemRecord.reportno = base.drillDownRecord.reportno;
      self.updateLineItemRecord.lineno = 0;
      self.updateLineItemRecord.shipprod = '';
      self.updateLineItemRecord.qtyord = 0;
      self.updateLineItemRecord.unit = '';
      self.updateLineItemRecord.origunit = '';
      self.updateLineItemRecord.prodcost = 0;
      self.updateLineItemRecord.rushfl = false;
      self.updateLineItemRecord.specnstype = '';
      self.updateLineItemRecord.restrictovrfl = false;
      self.updateLineItemRecord.restricterrmess = '';
      self.updateLineItemRecord.addMode = true;
      self.updateLineItemRecord.rowidWteral = 0;
      self.updateLineItemRecord.seqno = 0;
      self.updateLineItemRecord.accepttype = 'y';
      self.updateLineItemRecord.wtrrarlinedspllinesur = [];

      $state.go('wtera.drilldown.create', { isSurplusMode: false });
   };

   self.editContinue = function (singleRecord, isSurplusMode) {
      if (singleRecord) {
         self.updateLineItemRecord.reportno = base.drillDownRecord.reportno;
         self.updateLineItemRecord.lineno = singleRecord.lineno;
         self.updateLineItemRecord.shipprod = singleRecord.shipprod;
         self.updateLineItemRecord.qtyord = singleRecord.qtyord;
         self.updateLineItemRecord.unit = singleRecord.unit;
         self.updateLineItemRecord.origunit = singleRecord.unit;
         self.updateLineItemRecord.prodcost = singleRecord.prodcost;
         self.updateLineItemRecord.rushfl = singleRecord.rushfl;
         self.updateLineItemRecord.specnstype = singleRecord.specnstype;
         self.updateLineItemRecord.restrictovrfl = false;
         self.updateLineItemRecord.restricterrmess = '';
         self.updateLineItemRecord.addMode = false;
         self.updateLineItemRecord.rowidWteral = singleRecord.rowidWteral;
         self.updateLineItemRecord.seqno = singleRecord.seqno;
         self.updateLineItemRecord.accepttype = singleRecord.accepttype;
         self.updateLineItemRecord.wtrrarlinedspllinesur = singleRecord.wtrrarlinedspllinesur;

         $state.go('wtera.drilldown.create', { isSurplusMode: isSurplusMode });
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
      if (singleRecord) {
         self.editContinue(singleRecord, false);
      }
   };
});

// Controller for the Header tab on the Drill Down screen
// alias = hdr
// We moved the header calls to this tab controller so that they only fire when the Header tab is first selected.
app.controller('WteraDrillDownHeaderCtrl', function ($scope) {
   var self = this;
   var drldwn = $scope.drldwn;

   self.initialize = function () {
      drldwn.retrieveReportHeader();
   };

   self.isShipToAddressEnabled = function () {
      return drldwn.headerData.shiptoaddrenabled;
   };

   // Proceed with data calls in initialize function
   self.initialize();
});

app.controller('WteraDrillDownLineCtrl', function ($scope, DataService, MessageService, Utils) {
   var self = this;
   var rowParams = $scope.dtl.rowParams;

   self.transaction = rowParams.itemCopy;

   self.lineItem = {
      rowidWteral: 0,
      descrip: '',
      descrip2: '',
      descripenabled: false,
      qtyord: 0,
      stkqtyord: 0,
      weight: 0,
      cubes: 0,
      totweight: 0,
      totcubes: 0,
      duedt: '',
      bofl: false,
      usagefl: false,
      usageflenabled: false,
      vendno: 0,
      vendnovisible: false,
      prodline: '',
      whse: '',
      tiedorder: '',
      tiedorderenabled: false
   };

   if (self.transaction) {

      self.lineItem.rowidWteral = self.transaction.rowidWteral;
      DataService.post('api/wt/aswtentry/wtrrarlineextendretrieve', { data: self.lineItem, busy: true }, function (data) {
         if (data) {
            self.lineItem.descrip = data.descrip;
            self.lineItem.descrip2 = data.descrip2;
            self.lineItem.descripenabled = data.descripenabled;
            self.lineItem.qtyord = data.qtyord;
            self.lineItem.stkqtyord = data.stkqtyord;
            self.lineItem.weight = data.weight;
            self.lineItem.cubes = data.cubes;
            self.lineItem.totweight = data.totweight;
            self.lineItem.totcubes = data.totcubes;
            self.lineItem.duedt = data.duedt;
            self.lineItem.bofl = data.bofl;
            self.lineItem.usagefl = data.usagefl;
            self.lineItem.usageflenabled = data.usageflenabled;
            self.lineItem.vendno = data.vendno;
            self.lineItem.vendnovisible = data.vendnovisible;
            self.lineItem.prodline = data.prodline;
            self.lineItem.whse = data.whse;
            self.lineItem.tiedorder = data.tiedorder;
            self.lineItem.tiedorderenabled = data.tiedorderenabled;
         }
      });
   };

   // Submit row detail changes
   self.submit = function () {
      var updateRow = {
         descrip: self.lineItem.descrip,
         descrip2: self.lineItem.descrip2,
         descripenabled: self.lineItem.descripenabled,
         qtyord: self.lineItem.qtyord,
         stkqtyord: self.lineItem.stkqtyord,
         weight: self.lineItem.weight,
         cubes: self.lineItem.cubes,
         totweight: self.lineItem.totweight,
         totcubes: self.lineItem.totcubes,
         duedt: self.lineItem.duedt,
         bofl: self.lineItem.bofl,
         usagefl: self.lineItem.usagefl,
         usageflenabled: self.lineItem.usageflenabled,
         vendno: self.lineItem.vendno,
         vendnovisible: self.lineItem.vendnovisible,
         prodline: self.lineItem.prodline,
         whse: self.lineItem.whse,
         tiedorder: self.lineItem.tiedorder,
         tiedorderenabled: self.lineItem.tiedorderenabled,
         rowidWteral: self.lineItem.rowidWteral
      };
      DataService.post('api/wt/aswtentry/wtrrarlineextendupdate', { data: updateRow, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            rowParams.grid.toggleRowDetail(rowParams.row);
         }
      });
   };

   // close expanded row
   self.cancel = function () {
      rowParams.grid.toggleRowDetail(rowParams.row);
   };

});

app.controller('WteraDrillDownLineCreateCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, AuthService) {
   var self = this;
   var base = $scope.base;
   var drldwn = $scope.drldwn;
   self.isSurplusMode = $stateParams.isSurplusMode;

   self.detailTitle = MessageService.get('global.add.new.line');
   if (drldwn.updateLineItemRecord && !drldwn.updateLineItemRecord.addMode) {
      self.detailTitle = MessageService.get('global.update');
   }

   // Using a textbox for the product cost (displays all 5 decimal digits better than an Infor control).  This is always disabled.
   self.isProductCostEnabled = function () {
      return false;
   };

   self.isProductEnabled = function () {
      return drldwn.updateLineItemRecord.addMode;
   };

   self.productChanged = function () {
      if (drldwn.updateLineItemRecord && drldwn.updateLineItemRecord.shipprod) {
         var criteria = {
            wtrrarlineadd: drldwn.updateLineItemRecord,
            cFieldName: 'shipprod'
         };

         DataService.post('api/wt/aswtentry/wtrrarlineaddleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               drldwn.updateLineItemRecord.qtyord = data.wtrrarlineadd.qtyord;
               drldwn.updateLineItemRecord.unit = data.wtrrarlineadd.unit;
               drldwn.updateLineItemRecord.origunit = data.wtrrarlineadd.origunit;
               drldwn.updateLineItemRecord.prodcost = data.wtrrarlineadd.prodcost;
               drldwn.updateLineItemRecord.rushfl = data.wtrrarlineadd.rushfl;
               drldwn.updateLineItemRecord.specnstype = data.wtrrarlineadd.specnstype;
               drldwn.updateLineItemRecord.restrictovrfl = data.wtrrarlineadd.restrictovrfl;
               drldwn.updateLineItemRecord.restricterrmess = data.wtrrarlineadd.restricterrmess;

               if (drldwn.updateLineItemRecord.restrictovrfl && data.wtrrarlineadd.restricterrmess) {
                  MessageService.info('global.information', data.wtrrarlineadd.restricterrmess);
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

   self.unitChanged = function () {
      if (drldwn.updateLineItemRecord && drldwn.updateLineItemRecord.shipprod && drldwn.updateLineItemRecord.unit) {
         var criteria = {
            wtrrarlineadd: drldwn.updateLineItemRecord,
            cFieldName: 'unit'
         };

         DataService.post('api/wt/aswtentry/wtrrarlineaddleavefield', { data: criteria, busy: true }, function (data) {
            if (data) {
               drldwn.updateLineItemRecord.qtyord = data.wtrrarlineadd.qtyord;
               drldwn.updateLineItemRecord.unit = data.wtrrarlineadd.unit;
               drldwn.updateLineItemRecord.origunit = data.wtrrarlineadd.origunit;
               drldwn.updateLineItemRecord.prodcost = data.wtrrarlineadd.prodcost;
               drldwn.updateLineItemRecord.rushfl = data.wtrrarlineadd.rushfl;
               drldwn.updateLineItemRecord.specnstype = data.wtrrarlineadd.specnstype;
               drldwn.updateLineItemRecord.restrictovrfl = data.wtrrarlineadd.restrictovrfl;
               drldwn.updateLineItemRecord.restricterrmess = data.wtrrarlineadd.restricterrmess;
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
            if (drldwn.updateLineItemRecord && drldwn.updateLineItemRecord.wtrrarlinedspllinesur) {
               var record = drldwn.updateLineItemRecord.wtrrarlinedspllinesur[args.row];
               record.accepttype = args.oldValue;
               self.grid.updateRow(args.row);
            }
         }
      }
   };

   // Submit row detail changes
   self.submit = function () {

      if (drldwn.updateLineItemRecord.addMode) {
         // Add mode
         DataService.post('api/wt/aswtentry/wtrrarlineaddcreate', { data: drldwn.updateLineItemRecord, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.wtrrarlinetotals) {
                     drldwn.displayLineItemTotals(data.wtrrarlinetotals);
                  }

                  if (data.wtrrarlinedsplline && drldwn.lineItemsList) {

                     drldwn.lineItemsList.push({
                        accepttype: data.wtrrarlinedsplline.accepttype,
                        specnstype: data.wtrrarlinedsplline.specnstype,
                        commentfl: data.wtrrarlinedsplline.commentfl,
                        notesfl: data.wtrrarlinedsplline.notesfl,
                        shipprod: data.wtrrarlinedsplline.shipprod,
                        descrip: data.wtrrarlinedsplline.descrip,
                        qtyord: data.wtrrarlinedsplline.qtyord,
                        unit: data.wtrrarlinedsplline.unit,
                        prodcost: data.wtrrarlinedsplline.prodcost,
                        rushfl: data.wtrrarlinedsplline.rushfl,
                        lineno: data.wtrrarlinedsplline.lineno,
                        seqno: data.wtrrarlinedsplline.seqno,
                        criticalfl: data.wtrrarlinedsplline.criticalfl,
                        superfl: data.wtrrarlinedsplline.superfl,
                        reportno: data.wtrrarlinedsplline.reportno,
                        brandcode: data.wtrrarlinedsplline.brandcode,
                        mfgprod: data.wtrrarlinedsplline.mfgprod,
                        vendprod: data.wtrrarlinedsplline.vendprod,
                        custreserveqty: data.wtrrarlinedsplline.custreserveqty,
                        custreservefoundfl: data.wtrrarlinedsplline.custreservefoundfl,
                        custforecastqty: data.wtrrarlinedsplline.custforecastqty,
                        custforecastfoundfl: data.wtrrarlinedsplline.custforecastfoundfl,
                        msdsfl: data.wtrrarlinedsplline.msdsfl,
                        rowidWteral: data.wtrrarlinedsplline.rowidWteral,
                        surplus: false,
                        wtrrarlinedspllinesur: []
                     });
                  }

                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^');
               }
            }
         });
      } else {

         // Change mode
         DataService.post('api/wt/aswtentry/wtrrarlinechange', { data: drldwn.updateLineItemRecord, busy: true }, function (data) {
            if (data) {

               if (!MessageService.processMessaging(data.messaging)) {
                  if (data.wtrrarlinetotals) {
                     drldwn.displayLineItemTotals(data.wtrrarlinetotals);
                  }

                  if (drldwn.updateLineItemRecord.wtrrarlinedspllinesur && drldwn.updateLineItemRecord.wtrrarlinedspllinesur.length) {
                     var surplusLen = drldwn.updateLineItemRecord.wtrrarlinedspllinesur.length;

                     // Wait until the last surplus record has finished saving. Then refresh the Line Item Detail grid
                     var numberOfSavesToComplete = surplusLen;

                     for (var i2 = 0; i2 < surplusLen; i2++) {
                        var changeSurplusRecord = false;
                        if (drldwn.updateLineItemRecord.wtrrarlinedspllinesur[i2].accepttype !==
                           drldwn.updateLineItemRecord.wtrrarlinedspllinesur[i2].origaccepttype) {
                           changeSurplusRecord = true;
                        }
                        if (drldwn.updateLineItemRecord.wtrrarlinedspllinesur[i2].qtyord !==
                           drldwn.updateLineItemRecord.wtrrarlinedspllinesur[i2].origqtyord) {
                           changeSurplusRecord = true;
                        }


                        if (changeSurplusRecord) {
                           DataService.post('api/wt/aswtentry/wtrrarlinechange', { data: drldwn.updateLineItemRecord.wtrrarlinedspllinesur[i2], busy: true }, function (data2) {
                              if (data2) {
                                 MessageService.processMessaging(data2.messaging);
                              }
                              numberOfSavesToComplete--;
                              if (numberOfSavesToComplete === 0) {
                                 drldwn.displayDrillDownData(true);
                              }
                           });
                        } else {
                           numberOfSavesToComplete--;
                           if (numberOfSavesToComplete === 0) {
                              drldwn.displayDrillDownData(true);
                           }
                        }
                     }
                  } else {
                     drldwn.displayDrillDownData(true);
                  }

                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^');
               }
            }
         });
      }
   };
});

app.controller('WteraDrillDownLineSuperCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, AuthService) {
   var self = this;
   var base = $scope.base;
   self.detailRecord = $stateParams.detailRecord;
   var drldwn = $scope.drldwn;
   self.superList = [];

   if (self.detailRecord) {
      var criteria = {
         prod: self.detailRecord.shipprod,
         whse: base.drillDownRecord.shipfmwhse,
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