'use strict';
 
app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ap', 'apee', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ap', 'apee');

   $stateProvider.state('apee.print', {
      url: '/print',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apee/printer-settings.json');
            },
            controller: 'ApeePrinterSettingsCtrl as pasc'
         }
      }
   });

   $stateProvider.state('apee.openitem', {
      url: '/open-item',
      params: { apemtRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/shared/open-item/open-item.json');
            },
            controller: 'ApOpenItemCtrl as oic'
         }
      }
   });

   $stateProvider.state('apee.splitPay', {
      url: '/split-pay',
      params: { apemtRecord: null, splitPayRowId: null, isEnableDays: true },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/shared/split-item/split-pay.json');
            },
            controller: 'ApSplitPayCtrl as spc'
         }
      }
   });

});

app.controller('ApeeBaseCtrl', function ($state, DataService, Sasc) {
   var self = this;
   self.criteria = {};
   self.cono = Sasc.cono;
   self.currproc = 'aprc';

   self.isMaster = function () {
      return $state.is('apee.master');
   };

   self.includesMaster = function () {
      return $state.includes('apee.master');
   };

   self.search = function () {
      DataService.post('api/ap/asapentry/apentryeditbrowseload', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };
});

app.controller('ApeeSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   criteria.searchstatus = '';

   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.searchstatus = '';
      base.totaldetail = [];
   };

   self.submit = function () {
      base.search();
      var loadtotalcriteria = { reportnm: base.criteria.reportnm, vendno: base.criteria.vendno };
      DataService.post('api/ap/asapentry/apentryedittotalsload', { data: loadtotalcriteria, busy: true }, function (data) {
         if (data) {
            base.totaldetail = data;
         }
      });
      if (!base.isMaster()) {
         $state.go('apee.master');
      }
   };
});

app.controller('ApeeMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   var srch = $scope.srch;

   if ($stateParams.refreshSearch) {
      base.search();
   }
   self.openitem = function () {
      var selectedopenitemrecord = GridService.getSelectedRecord(base.grid);
      if (selectedopenitemrecord) { $state.go('^.openitem', { apemtRecord: selectedopenitemrecord }); }
   };

   self.splitPayFunction = function () {
      var selectedsplitrecord = GridService.getSelectedRecord(base.grid);
      if (selectedsplitrecord) {
         var tmpSplitPay = { apetrowid: selectedsplitrecord.apetRowid };
         DataService.post('api/ap/asapentry/apentryeditsplitpayprevalidate', { data: tmpSplitPay, busy: true }, function (data) {
            $state.go('^.splitPay', { apemtRecord: selectedsplitrecord, splitPayRowId: tmpSplitPay, isEnableDays: data });
         });
      }
   };

   self.print = function () { $state.go('^.print'); };

   self.browerTotLoad = function () {
      var loadtotalcriteria = { reportnm: base.criteria.reportnm, vendno: base.criteria.vendno };
      DataService.post('api/ap/asapentry/apentryedittotalsload', { data: loadtotalcriteria, busy: true }, function (data) {
         if (data) {
            base.totaldetail = data;
         }
      });
   };

   self.doInvoiceAction = function (invoiceAction) {
      var records = GridService.getSelectedRecords(base.grid);

      var selectedRecords = [];
      if (records) {
         records.forEach(function (record) {
            selectedRecords.push(record);
         });
      }
      var apeeLookupCriteria = { reportnm: base.criteria.reportnm, vendno: base.criteria.vendno };

      var inputData = { apeelookupresults: selectedRecords, apeelookupcriteria: apeeLookupCriteria, cNewApStatus: invoiceAction };

      DataService.post('api/ap/asapentry/apentryeditupdatenotfinal', { data: inputData, busy: true }, function (data) {
         if (data) {
            // For workflow we need to refresh the entire grid but keep the user on the same page with the same sort
            var sort = base.grid.sortFunction(base.grid.sortColumn.sortId, base.grid.sortColumn.sortAsc);
            base.grid.loadData(data, base.grid.pager);
            base.grid.settings.dataset.sort(sort);

            self.browerTotLoad();
         }
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };

   self.vendorHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.vendno) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };
});
app.controller('ApeePrinterSettingsCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // To check the printer validation
   self.printOK = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails; // If it required, printerFinalSettings object will update with additional settings based on menu function
            self.savePrinterSettings();
         }
      });
   };

   //Final printer settings save with additional details(if any additional)
   //self.printerSettings = self.printerControl.printerSettings;   //to access the printer screen data
   //if any additional data required , use pasc.additionalSettings.properties and update the database input object: pasc is ApeePrinterSettingsCtrl
   self.savePrinterSettings = function () {
      var printerCollection = [];

      printerCollection.push(self.printerFinalSettings);  // based on API call input data like collection etc..this extra modification required.
      self.printerData = { cReportNm: base.criteria.reportnm, printerSettings: printerCollection };

      DataService.post('api/ap/asapentry/apentryeditupdate', { data: self.printerData, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', null, { reload: '^.master' });
      });
   };
});