'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'iceam', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'iceam');

   /**
    * TODO: This detail state is a skeleton. Change it to what you need,
    * then remove this comment.
    */

   $stateProvider.state('iceam.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceam/detail.json');
            },
            controller: 'IceamCreateCtrl as dtl'
         }
      }
   });

   $stateProvider.state('iceam.detail', {
      url: '/detail',
      params: { iceamResult: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceam/detail.json');
            },
            controller: 'IceamDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('iceam.detail.edit', {
      url: '/edit',
      template: ''
   });

});

app.controller('IceamBaseCtrl', function ($state, DataService, Utils) {
   var self = this;
   self.criteria = { transty: 'O' };
   self.fullOrderNumber = '0-00';
   self.orderno = 0;
   self.ordersuf = '00';

   self.isMaster = function () {
      return $state.is('iceam.master');
   };

   self.includesMaster = function () {
      return $state.includes('iceam.master');
   };

   self.isCreate = function () {
      return $state.is('iceam.create');
   };

   self.isDetail = function () {
      return $state.is('iceam.detail');
   };

   self.isEdit = function () {
      return $state.is('iceam.detail.edit');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/ic/asicentry/iceamload', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.iceamresults;
      });
   };

   // Common methods
   self.splitOrderNumber = function (fullOrderNumber) {
      var ordersParts = fullOrderNumber.split('-');
      if (self.fullOrderNumber === '') {
         self.orderno = 0;
         self.ordersuf = '00';
         self.fullOrderNumber = '0-00';
      }
      else {
         if (ordersParts.length === 2) {
            self.orderno = parseInt(ordersParts[0], 10);
            self.ordersuf = parseInt(ordersParts[1], 10);
            self.fullOrderNumber = self.orderno + '-' +self.ordersuf;
         }
         else if (ordersParts.length === 1) {
            self.orderno = parseInt(ordersParts[0], 10);
            self.ordersuf = '00';
            self.fullOrderNumber = self.orderno + '-' + self.ordersuf;
         }
      }
   };

});

app.controller('IceamSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;


   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = { transty: 'O' };
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('iceam.master');
      }
      if (base.criteria.orderno && base.criteria.orderno.indexOf('-') >= 0) {
         base.criteria.ordersuf = base.criteria.orderno.substr(base.criteria.orderno.indexOf('-') + 1);
         base.criteria.orderno = base.criteria.orderno.substr(0, base.criteria.orderno.indexOf('-'));
      } else if (base.criteria.ordersuf) {
         base.criteria.ordersuf = null;
      }
      base.search();
   };
});

app.controller('IceamMasterCtrl', function ($scope, $state, $stateParams, GridService) {
   var self = this;
   var base = $scope.base;

   // Tell whether or not exactly one row in the grid is selected
   self.isOneRowSelected = function () {
      return base.grid.selectedRows().length === 1;
   };

   // Edit
   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord) {
         $state.go('^.detail.edit', { iceamResult: selectedRecord });
      }
   };

   // Initialize search results (if required criteria is present)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   //self.orderNumberFormatter = function (val) {
   //   val = val.toUpperCase();
   //}

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { iceamResult: record });
   };

   self.navigateToInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.transty) {
          switch (currentRow.transty.toUpperCase()) {
              case 'O':
                  $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                  break;
              case 'P':
                  $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                  break;
              case 'W':
                  $state.go('wtit.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
                  break;
              default:
                  break;
           }
       }
   };
   self.navigateToApiv = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.navigateToAric = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   self.navigateToCoreIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.coreprod });
      }
   };

   self.navigateToImpliedIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.implyprod });
      }
   };

   self.navigateToIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.origprod });
      }
   };
});

app.controller('IceamCreateCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   // New record
   self.iceamdetail = { mode: 'A', transty: 'O', statusfl: 'False' };
   self.formatedOrderNo = '0-00';

   if ($scope.base.criteria) {
      self.iceamdetail.transty = $scope.base.criteria.transty;
      self.iceamdetail.origprod = $scope.base.criteria.origprod;
      self.iceamdetail.custno = $scope.base.criteria.custno;
      self.iceamdetail.whse = $scope.base.criteria.whse;
      self.iceamdetail.vendno = $scope.base.criteria.vendono;
   }

   DataService.post('api/ic/asicentry/iceaminitiate', {
      data: self.iceamdetail, busy: true
   }, function (detail) {
      self.iceamdetail = detail;
      self.formatedOrderNo = data.orderno + '-' + Utils.pad(data.ordersuf, 2);
   });


   self.cancel = function () {
      $state.go('^.master');
   };

   // On Original Product Change
   self.originalProductChange = function () {
      DataService.post('api/ic/asicentry/iceamorigprodvaluechanged', { data: self.iceamdetail, busy: true }, function (data) {
         self.iceamdetail = data;
         self.formatedOrderNo = data.orderno + '-' + Utils.pad(data.ordersuf, 2);
      });
   };

   self.fieldChanged = function (fieldName) {
      if (fieldName === 'orderNumber') {
         base.splitOrderNumber(self.formatedOrderNo);
         self.iceamdetail.orderno = base.orderno;
         self.iceamdetail.ordersuf = base.ordersuf;
         self.formatedOrderNo = base.fullOrderNumber;
      }
   };

   // Perform  new record save
   self.submit = function () {
      if (self.iceamdetail) {
         DataService.post('api/ic/asicentry/iceamupdate', { data: self.iceamdetail }, function (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               DataService.post('api/ic/iceam', { data: data.iceamdetail, busy: true }, function () {
                  MessageService.info('global.save', 'message.save.operation.completed.successfully');
                  $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
               });
            }
         });
      }
   };
});

app.controller('IceamDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.iceamdetail = {};
   self.formatedOrderNo = '0-00';

   if ($stateParams.iceamResult) {
      var selectedRecord = $stateParams.iceamResult;
      self.iceamdetail = {
         mode: "C",
         iceamrowid: selectedRecord.iceamrowid,
         iceamRecid: selectedRecord.iceamRecid,
         custno: selectedRecord.custno,
         origprod: selectedRecord.origprod,
         transty: selectedRecord.transty,
         userfield: selectedRecord.userfield,
         vendno: selectedRecord.vendno,
         whse: selectedRecord.whse,
         apsvnotesfl: selectedRecord.apsvnotesfl,
         apsvrowid: selectedRecord.apsvrowid,
         arscnotesfl: selectedRecord.arscnotesfl,
         arscrowid: selectedRecord.arscrowid,
         coreprod: selectedRecord.coreprod,
         icspnotesfl: selectedRecord.icspnotesfl,
         icsprowid: selectedRecord.icsprowid,
         implyprod: selectedRecord.implyprod,
         lineno: selectedRecord.lineno,
         manadjfl: selectedRecord.manadjfl,
         mandt: selectedRecord.mandt,
         manoper: selectedRecord.manoper,
         mantm: selectedRecord.mantm,
         ordernotesfl: selectedRecord.ordernotesfl,
         orderrowid: selectedRecord.orderrowid,
         qty: selectedRecord.qty,
         qtyalloc: selectedRecord.qtyalloc,
         qtybank: selectedRecord.qtybank,
         qtywarr: selectedRecord.qtywarr,
         returncd: selectedRecord.returncd,
         seqno: selectedRecord.seqno,
         statusfl: selectedRecord.statusfl
      };
   }

   DataService.post('api/ic/asicentry/iceaminitiate', { data: self.iceamdetail, busy: true }, function (data) {
      if (data) {
         self.iceamdetail = data;
         self.formatedOrderNo = data.orderno + '-' + Utils.pad(data.ordersuf, 2);
         self.iceamdetail.mode = 'C';
         base.iceamdetail = angular.copy(self.iceamdetail);
      }
   });

   //Reset Record
   self.reset = function () {
      self.iceamdetail = angular.copy(base.iceamdetail);
   };

   // On Line Number Change
   self.lineNumberChange = function () {
      DataService.post('api/ic/asicentry/iceamlinenovaluechanged', { data: self.iceamdetail, busy: true }, function (data) {
         self.iceamdetail = data;
         self.formatedOrderNo = data.orderno + '-' + Utils.pad(data.ordersuf, 2);
      });
   };

   // On Original Product Change
   self.originalProductChange = function () {
      DataService.post('api/ic/asicentry/iceamorigprodvaluechanged', { data: self.iceamdetail, busy: true }, function (data) {
         self.iceamdetail = data;
         self.formatedOrderNo = data.orderno + '-' + Utils.pad(data.ordersuf, 2);
      });
   };

   self.fieldChanged = function (fieldName) {
      if (fieldName === 'orderNumber') {
         base.splitOrderNumber(self.formatedOrderNo);
         self.iceamdetail.orderno = base.orderno;
         self.iceamdetail.ordersuf = base.ordersuf;
         self.formatedOrderNo = base.fullOrderNumber;
      }
   };

   self.submit = function () {
      if (!$stateParams.iceamdetail && self.iceamdetail.mode !== 'C') {
         //TODO: Review SI - add/update multiple API calls need to refactor
         DataService.post('api/ic/asicentry/iceamupdate', { data: self.iceamdetail }, function (data) {
            if (data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               MessageService.info('global.save', 'message.save.operation.completed.successfully');
               $state.go('^.^.master', null, { reload: '^.^.master' });
            }
         });
      }
      else {
         self.iceamdetail.mode = 'C';
         DataService.post('api/ic/asicentry/iceamupdate', { data: self.iceamdetail }, function (data) {
            if (data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               MessageService.info('global.save', 'message.save.operation.completed.successfully');
               $state.go('^.^.master', null, { reload: '^.^.master' });
            }
         });
      }
   };

   // Cancel
   self.cancel = function () {
      if ($state.current.name === 'iceam.detail.edit') {
         $state.go('^');
      }
      else {
         $state.go('^.master', null, { reload: '^.master' });
      }
   };

   // Edit
   self.edit = function () {
      self.iceamdetail.mode = 'C';
   };

});
