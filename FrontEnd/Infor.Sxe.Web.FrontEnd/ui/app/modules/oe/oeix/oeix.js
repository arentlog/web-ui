'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('oe', 'oeix', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oeix');

   $stateProvider.state('oeix.detail', {
      url: '/detail?whse&invdt',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeix/detail.json');
            },
            controller: 'OeixDetailCtrl as dtl'
         }
      }
   });
});

app.controller('OeixBaseCtrl', function ($state, ConfigService, DataService, Sasoo, Utils) {
   var self = this;
   self.criteria = {};

   self.criteria = { whse: Sasoo.whse, invdt: Utils.getCurrentDate() };

   self.isMaster = function () {
      return $state.is('oeix.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeix.master');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform initialization of search criteria
   self.initCriteria();

   self.search = function () {    

      DataService.post('api/oe/asoeinquiry/oeixbuildlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.oeixinquiry;
         }        
      });
   };
});

app.controller('OeixSearchCtrl', function ($scope, $state, DataService, Utils, Sasoo) {
   var self = this;  
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      base.initCriteria();
      base.criteria = { whse: Sasoo.whse, invdt: Utils.getCurrentDate() };
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeix.master');
      }

      // Get data
      base.search();
   };
});

app.controller('OeixMasterCtrl', function ($scope, $state, DataService, ConfigService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   self.oeesRecord = {};
   self.oeesLineItem = {};
   self.onOrderInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
      }
   };

   self.loadOeesDetail = function (row) {
      var inputParams = {
         orderno: self.oeesRecord.orderno,
         ordersuf: self.oeesRecord.ordersuf,
         jrnlno: self.oeesRecord.jrnlno,
         userfield: self.oeesRecord.userfield
      };
      DataService.post('api/oe/asoeentry/oeesdetailhdrload', { data: inputParams, busy: true }, function (data) {
         self.oeesLineItem = data;
         $state.go('oees.detail', { record: self.oeesRecord, lineDetail: self.oeesLineItem, module: 'oeix', orderno: row.orderno, ordersuf: row.ordersuf });
      });
   };
   self.getOrderDetail = function (row) {
      var params = {
         orderno: row.orderno,
         ordersuf: row.ordersuf,
         fillmode: true,
         fldlist: ''
      };
      DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
         self.oeesRecord = data;
         self.loadOeesDetail(row);
      });

   };
   self.onMaintainSingleOrder = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      if (selectedRow.stagecd === 1 || selectedRow.stagecd === 2) {
         $state.go('oeet.maintain', { orderno: selectedRow.orderno, ordersuf: selectedRow.ordersuf });
      }
      else if (selectedRow.stagecd === 3) {
         self.getOrderDetail(selectedRow);
      }
   };

   self.onOrderExceptionDelete = function () {
      var records = GridService.getSelectedRecords(base.grid);
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         if (records && records.length) {
            var oeInvoicesToDelete = [];

            records.forEach(function (record) {
               oeInvoicesToDelete.push(
               {
                  oeixrowid: record.oeixrowid
               });
            });

            DataService.post('api/oe/asoeinquiry/oeixdeletelist', { data: oeInvoicesToDelete, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.search();
            });
         }
      });
   };

});


