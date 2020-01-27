'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'iceaa', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'iceaa');

   $stateProvider.state('iceaa.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceaa/detail.json');
            },
            controller: 'IceaaCreateCtrl as dtl'
         }
      }
   });

   $stateProvider.state('iceaa.detail', {
      url: '/detail',
      params: { iceaaRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceaa/detail.json');
            },
            controller: 'IceaaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('iceaa.detail.edit', {
      url: '/edit',
      template: ''
   });
});

app.controller('IceaaBaseCtrl', function ($state, DataService) {

   var self = this;
   self.criteria = {};
   self.tempIceaa = {};
   self.orderno = '';
   self.poorderno = '';

   self.isMaster = function () {
      return $state.is('iceaa.master');
   };

   self.includesMaster = function () {
      return $state.includes('iceaa.master');
   };

   self.isCreate = function () {
      return $state.is('iceaa.create');
   };

   self.isDetail = function () {
      return $state.is('iceaa.detail');
   };

   self.isEdit = function () {
      return $state.is('iceaa.detail.edit');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.criteria.orderno = 0;
      self.criteria.ordersuf = 0;
      var completeOrderNumber = self.criteria.transty === 'o' ? self.orderno : self.poorderno;
      if (completeOrderNumber) {
         var splitOrder = completeOrderNumber.split('-');
         self.criteria.orderno = splitOrder[0];
         self.criteria.ordersuf = splitOrder[1];
      }
      DataService.post('api/ic/asicentry/iceaaretrieve', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.iceaaresults;
      });
   };
});

app.controller('IceaaSearchCtrl', function ($scope, $state, DataService, Utils) {

   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Default trans type is orders
   criteria.transty = 'o';

   // Clear form
   self.clear = function () {
      base.orderno = '';
      base.poorderno = '';
      Utils.clearObject(criteria);
      criteria.transty = 'o';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('iceaa.master');
      }
      base.search();
   };

});

app.controller('IceaaMasterCtrl', function ($scope, $state, DataService, GridService, MessageService, $stateParams) {

   var self = this;
   var base = $scope.base;
   var criteria = $scope.base.criteria;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { iceaaRecord: record });
   };

   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);

      if (selectedRecord) {
         $state.go('^.detail.edit', { iceaaRecord: selectedRecord });
      }
   };

   // Tell whether or not exactly one row in the grid is selected
   self.isOneRowSelected = function () {
      return base.grid.selectedRows().length === 1;
   };

   // Tell whether or not any rows in the grid are selected
   self.isAnyRowSelected = function () {
      return base.grid.selectedRows().length > 0;
   };

   // Tell no rows in the grid are selected
   self.isNoRowSelected = function () {
      return base.grid.selectedRows().length === 0;
   };

   // Initialize search results (if required criteria is present)
   if (criteria.whse) {
      DataService.post('api/ic/asicentry/iceaaretrieve', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.iceaaresults;
      });
   }

   // Delete record
   self.delete = function () {
      var selectedDeleteRecord = GridService.getSelectedRecord(base.grid);

      if (selectedDeleteRecord) {
         DataService.post('api/ic/asicentry/iceaadelete', { data: selectedDeleteRecord }, function (data) {
            if (data.messaging) {
               MessageService.errorMessages(data.messaging);
            } else {
               MessageService.info('global.delete', 'message.delete.operation.completed.successfully');
               base.search();
            }
         });
      }
   };

   self.onOrderNumberClicked = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.transty) {
         switch (currentRow.transty.toUpperCase()) {
            case 'O':
               $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
               break;
            case 'P':
               $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
               break;
            default:
               break;
         }
      }
   };

   self.onReturnOrderClicked = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.transty) {
         switch (currentRow.transty.toUpperCase()) {
            case 'O':
               $state.go('oeio.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
               break;
            case 'P':
               $state.go('poip.detail', { pk: currentRow.retorderno, pk2: currentRow.retordersuf });
               break;
            default:
               break;
         }
      }
   };

   self.onProductClicked = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
      }
   };
});

app.controller('IceaaCreateCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // New record
   self.iceaa = {};
   self.iceaa.transty = 'o';
   self.tempNewIceaa = angular.copy(self.iceaa);
  
   self.cancel = function () {
      $state.go('^.master');
   };

   self.clear = function () {
      self.orderno = '';
      self.pono = '';
      self.retorderno = '';
      self.retpono = '';
      self.iceaa.lineno = 0;
      self.iceaa.retlineno = 0;
      self.iceaa.whse = '';
      self.iceaa.prod = '';
      self.iceaa.coreprod = '';
      self.iceaa.subfl = false;
      self.iceaa.qty = 0;
   };

   // Reset Record
   self.reset = function () {
      self.iceaa = angular.copy(self.tempNewIceaa);
      self.clear();
   };

   self.fieldChange = function (cSection) {
      self.iceaa.orderno = 0;
      self.iceaa.ordersuf = 0;
      self.iceaa.retorderno = 0;
      self.iceaa.retordersuf = 0;
      var orderNumner = self.iceaa.transty.toUpperCase() === 'O' ? self.orderno : self.pono;
      if (orderNumner) {
         var splitOrder = orderNumner.split('-');
         self.iceaa.orderno = splitOrder[0];
         self.iceaa.ordersuf = splitOrder[1];
      }

      var retOrderNumner = self.iceaa.transty.toUpperCase() === 'O' ? self.retorderno : self.retpono;
      if (retOrderNumner) {
         var splitRetOrder = retOrderNumner.split('-');
         self.iceaa.retorderno = splitRetOrder[0];
         self.iceaa.retordersuf = splitRetOrder[1];
      }

      var criteria = {
         iceaadetail: self.iceaa,
         cSection: cSection
      };
      DataService.post('api/ic/asicentry/iceaafieldchange', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.iceaa = data;
         }
      });
   };


   // Perform new record save
   self.submit = function () {
      if (self.iceaa) {
         DataService.post('api/ic/asicentry/iceaaadd', { data: self.iceaa }, function (data) {
            if (data.messaging && data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            } else {
               MessageService.info('global.save', 'message.save.operation.completed.successfully');
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
         });
      }
   };
   self.clear();
});

app.controller('IceaaDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.orderno = '';
   self.pono = '';
   self.retorderno = '';
   self.retpono = '';

   if ($stateParams.iceaaRecord) {
      self.iceaa = $stateParams.iceaaRecord;
      if (self.iceaa.transty.toUpperCase() === 'O') {
         if (self.iceaa.orderno) {
            self.orderno = self.iceaa.orderno + '-' + Utils.pad(self.iceaa.ordersuf, 2);
         }
         if (self.iceaa.retorderno) {
            self.retorderno = self.iceaa.retorderno + '-' + Utils.pad(self.iceaa.retordersuf, 2);
         }
      } else {
         if (self.iceaa.orderno) {
            self.pono = self.iceaa.orderno + '-' + Utils.pad(self.iceaa.ordersuf, 2);
         }
         if (self.iceaa.retorderno) {
            self.retpono = self.iceaa.retorderno + '-' + Utils.pad(self.iceaa.retordersuf, 2);
         }
      }
   }

   if (self.iceaa) {
      self.getSubTitle = MessageService.get('global.type') + ': ' +
         (self.iceaa.transty.toUpperCase() === 'O' ? MessageService.get('global.order.entry') : MessageService.get('global.purchase.order')) +
         ' | ' + MessageService.get('global.warehouse') + ': ' + self.iceaa.whse;
   }

   // Reset Record
   self.reset = function () {
      $state.go('^.edit', null, { reload: '^' });
   };

   // Save record
   self.submit = function () {
      if (self.iceaa) {
         DataService.post('api/ic/asicentry/iceaachange', { data: self.iceaa }, function (data) {
            if (data.messaging && data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            } else {
               MessageService.info('global.save', 'message.save.operation.completed.successfully');
               base.search();
            }
         });
      }
   };

   // Cancel
   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };
});


