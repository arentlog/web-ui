'use strict';

app.config(function ($stateProvider, StateProvider, OeLineDetailsStateProvider, OeCreditCardDetailsStateProvider, ArTransactionDetailsStateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('oe', 'oeir', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oeir');
   OeLineDetailsStateProvider.addStates('oe', 'oeir', 'oeir.detail');
   ArTransactionDetailsStateProvider.addStates('oe', 'oeir', 'oeir.detail');
   OeCreditCardDetailsStateProvider.addStates('oe', 'oeir', 'oeir.credit');
   BinAllocationStateProvider.addStates('oe', 'oeir', 'oeir.detail.line.kitComponentDetail');

   $stateProvider.state('oeir.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeir/detail.json');
            },
            controller: 'OeirDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('oeir.quickApproval', {
      url: '/quick-approval',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeir/quick-approval.json');
            },
            controller: 'OeirQuickApprovalCtrl as oqac'
         }
      }
   });

   $stateProvider.state('oeir.holdrelease', {
      url: '/hold-release',
      params: { criteria: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeir/hold-release.json');
            },
            controller: 'OeirHoldReleaseCtrl as hrc'
         }
      }
   });

   $stateProvider.state('oeir.headerfields', {
      url: '/header-fields',
      params: {
         criteria: null,
         oeirHeaderFieldsInitResults: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeir/header-fields.json');
            },
            controller: 'OeirHeaderFieldsCtrl as ohfc'
         }
      }
   });

   $stateProvider.state('oeir.print', {
      url: '/print',
      params: { orderno: null, ordersuf: null, backCallback: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/shared/document-print/document-print.json');
            },
            controller: 'OeDocumentPrintCtrl as oedp'
         }
      }
   });

   $stateProvider.state('oeir.credit', {
      url: '/credit',
      params: { orderno: null, ordersuf: null, backCallback: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeir/credit-card-history.json');
            },
            controller: 'OeirCreditCardCtrl as oecc'
         }
      }
   });
});

app.controller('OeirBaseCtrl', function ($state, DataService, Utils, ConfigService, MessageService, Sasoo, SecurityService) {
   var self = this;
   self.criteria = {};
   self.type = '';
   self.LABEL_DELIMITER = ': ';
   self.isApprovalEnable = true;
   self.isIntApprovalEnable = false;
   self.selectedOeirItem = null;
   self.isHomeWhse = Sasoo.homewhsefl;
   self.homeWhse = Sasoo.whse;
   self.securityLevelOEIR = SecurityService.getSecurityLevel('oeir');
   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('oeir', 'Header') < 3;

   self.isMaster = function () {
      return $state.is('oeir.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeir.master');
   };

   self.isDetail = function () {
      return $state.is('oeir.detail');
   };

   self.includesDetail = function () {
      return $state.includes('oeir.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      var strType = self.type.join();
      self.criteria.type = strType;
      DataService.post('api/oe/asoeinquiry/oeirorderlist', { data: self.criteria, busy: true }, function (data) {
         self.oeirorderlistresults = data;
      });
   };

   self.setDefaultWarehouse = function () {
      if (self.isHomeWhse) {
         self.criteria.whse = self.homeWhse;
      } else {
         self.criteria.whse = '';
      }
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(self.criteria);
      self.type = ['Stock Order', 'Direct Order', 'Correction', 'Return Merchandise', 'Blanket Release', 'Counter Sale', 'Quote'];
      self.criteria = {
         custno: null,
         shipto: '',
         orderno: 0,
         ordersuf: 0,
         whse: '',
         stagecd: '9',
         creditmgr: '',
         begindt: null,
         enddt: null,
         approvty: '',
         approvintlty: '*',
         type: '',
         shipvia: '',
         boonlyfl: false,
         shippedqtyfl: true,
         recordcountlimit: ConfigService.getDefaultRecordLimit(),
         userfield: ''
      };
   };

   self.convertQuoteToBackOrder = function (doSearch) {
      var listQuotes = {
         orderno: self.selectedOeirItem.orderno,
         ordersuf: self.selectedOeirItem.ordersuf,
         userfield: ''
      };
      var oeirQuotesToStocks = [];
      oeirQuotesToStocks.push(listQuotes);

      DataService.post('api/oe/asoeinquiry/oeirconvertquotestostock', { data: oeirQuotesToStocks, busy: true }, function () {
         MessageService.info('global.information', 'global.converted.to.stock.order');

         if (doSearch) {
            self.search();
         }
      });
   };

   self.oeirInitialize = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      DataService.get('api/oe/asoeinquiry/oeirinitialize', { busy: true }, function (data) {
         self.isApprovalEnable = data.holdoverfl;
         self.isIntApprovalEnable = data.holdintlfl;
      });
   };

   self.oeirInitialize();
  
});

app.controller('OeirSearchCtrl', function ($scope, $state, MessageService) {
   var self = this;
   var base = $scope.base;
   self.holdText = MessageService.get('asterisk.for.all.hold.codes');

   // Clear form
   self.clear = function () {
      base.clear();
      base.setDefaultWarehouse();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeir.master');
      }
      base.search();
   };

   base.setDefaultWarehouse();
});

app.controller('OeirMasterCtrl', function ($scope, $state, $stateParams, MessageService, DataService, GridService, AuthService, Utils) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   } else {
      base.clear();
   }

   self.isApproveEnabled = function () {
      return base.grid.isAnyRowSelected() && base.isApprovalEnable;
   };

   self.isInternationalApproveEnabled = function () {
      return base.grid.isAnyRowSelected() && base.isIntApprovalEnable;
   };

   self.isCovertQuoteToStockOrder = function () {
      return base.grid.isOneRowSelected() && base.isApprovalEnable && base.criteria.stagecd === '8';
   };

   self.isCreditCardHistoryEnabled = function () {
      if (base.grid.isOneRowSelected()) {
         return (GridService.getSelectedRecord(base.grid).cchistoryfl);
      } else {
         return false;
      }
   };

   self.orderGridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = base.oeirorderlistresults[args.row];
         if (record) {
            var order = record.ordernox.split('-');
            var params = {
               pvOrderno: Number(order[0]),
               pvOrdersuf: Number(order[1])
            };
            DataService.get('api/oe/asoeinquiry/oeirvalidateapprovalsecurity/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
               if (data) {
                  self.onApprove(record);
                  self.onInternationalApprove(record);
               }
            },
            // Error returned in cErrorMessage - back out change
            function () {
               record.approvty = args.oldValue;
               base.oeirorderlistresults[args.row] = record;
               base.grid.renderRows();
            });
         }
      }
   };

   self.drilldown = function (e, args) {
      base.selectedOeirItem = args[0].item;

      var order = base.selectedOeirItem.ordernox.split('-');
      var params = {
         pvOrderno: Number(order[0]),
         pvOrdersuf: Number(order[1])
      };
      DataService.get('api/oe/asoeinquiry/oeirvalidateapprovalsecurity/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            if (base.selectedOeirItem.servicekey) {
               AuthService.createAuthPoint('oeet', 'banner', 'orderno', 'c', 'SM', null, function () {
                  $state.go('oeir.detail');
               });
            }
            else {
               $state.go('oeir.detail');
            }
         }
      });
   };

   self.creditCardHistory = function () {
      base.selectedOeirItem = GridService.getSelectedRecord(base.grid);
      $state.go('oeir.credit');
   };

   self.onApprove = function (selectedRow) {
      var approveOrders = [];
      var approveOrder = {
         orderno: selectedRow.orderno,
         ordersuf: selectedRow.ordersuf,
         ccOverrideMsg: '',
         ccApprovalfl: false,
         approvty: selectedRow.approvty
      };
      approveOrders.push(approveOrder);
      DataService.post('api/oe/asoeinquiry/oeirapproveorders', { data: approveOrders, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.onRowUpdatedContinue(selectedRow, data.oeirapproveorders);
            }
         }
      });
   };

   self.onHoldRelase = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      var criteria = {
         custno: null,
         shipto: '',
         approvty: 'h'
      };
      if (selectedRecord) {
         criteria.custno = selectedRecord.custno;
         criteria.shipto = selectedRecord.shipto;
         if (selectedRecord.servicekey) {
            AuthService.createAuthPoint('oeet', 'banner', 'orderno', 'c', 'SM', null, function () {
               $state.go('oeir.holdrelease', { criteria: criteria });
            });
         } else {
            $state.go('oeir.holdrelease', { criteria: criteria });
         }
      }
      else {
         $state.go('^.detail', {});
      }

   };

   self.onHeaderFields = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);

      if (selectedRecord) {
         var criteria = {
            orderno: selectedRecord.orderno,
            ordersuf: selectedRecord.ordersuf
         };

         if (selectedRecord.servicekey) {
            AuthService.createAuthPoint('oeet', 'banner', 'orderno', 'c', 'SM', null, function () {
               onHeaderFieldsContinue(criteria);
            });
         } else {
            onHeaderFieldsContinue(criteria);
         }
      }
   };

   self.onRowUpdatedContinue = function (selectedRow, oeirApproveOrders) {
      oeirApproveOrders.forEach(function (approveOrder) {
         if (approveOrder.ccOverrideMsg) {
            MessageService.okCancel('global.confirmation', approveOrder.ccOverrideMsg, function () {
               var newApproveOrders = [];
               var newApproveOrder = {
                  orderno: selectedRow.orderno,
                  ordersuf: selectedRow.ordersuf,
                  ccOverrideMsg: approveOrder.ccOverrideMsg,
                  ccApprovalfl: true,
                  approvty: selectedRow.approvty
               };
               newApproveOrders.push(newApproveOrder);
               DataService.post('api/oe/asoeinquiry/oeirapproveorders', { data: newApproveOrders, busy: true }, function (data) {
                  if (data) {
                     if (!MessageService.processMessaging(data.messaging)) {
                        base.search();
                     }
                  }
               });
            }, null);
         } else {
            base.search();
         }
      });
   };

   self.onInternationalApprove = function (selectedRow) {
      var approveIntOrders = [];
      var approveIntOrder = {
         orderno: selectedRow.orderno,
         ordersuf: selectedRow.ordersuf,
         approvintlty: selectedRow.approvintlty
      };
      approveIntOrders.push(approveIntOrder);
      DataService.post('api/oe/asoeinquiry/oeirapproveinternationalorders', { data: approveIntOrders, busy: true }, function (data) {
         if (data) {
            MessageService.processMessaging(data.messaging);
         }
      });
   };

   self.quickApproval = function () {
      if (base.grid && base.grid.isOneRowSelected()) {
         base.selectedOeirItem = GridService.getSelectedRecord(base.grid);
      } else {
         base.selectedOeirItem = null;
      }

      $state.go('oeir.quickApproval');
   };

   self.onPrint = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      var orderno = 0;
      var ordersuf = 0;
      if (selectedRecord) {
         orderno = selectedRecord.orderno;
         ordersuf = selectedRecord.ordersuf;
      }
      $state.go('^.print', { orderno: orderno, ordersuf: ordersuf, backCallback: self.printBackCallback });
   };

   self.printBackCallback = function () {
      $state.go('oeir.master');
   };

   self.approve = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      var approveList = [];

      selectedRecords.forEach(function (selectedRecord) {
         var approveOrder = {
            orderno: selectedRecord.orderno,
            ordersuf: selectedRecord.ordersuf,
            ccOverrideMsg: '',
            ccApprovalfl: false,
            approvty: 'y'
         };
         approveList.push(approveOrder);
      });

      if (approveList.length > 0) {
         DataService.post('api/oe/asoeinquiry/oeirapproveorders', { data: approveList, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.approveContinue(data.oeirapproveorders);
               }
            }
         });
      } else {
         MessageService.info('global.information', 'message.please.select.a.record.to.proceed.further');
      }

   };

   self.approveContinue = function (approveOrders) {
      if (approveOrders && JSLINQ(approveOrders).Any(function (approveOrder) {
         return approveOrder.ccOverrideMsg;
      })) {
         // For all orders that have the ccOverrideMsg must run FinishApproval method
         var needApproval = JSLINQ(approveOrders).Where(function (item) { return item.ccOverrideMsg; });
         self.finishApproval(needApproval);
      } else {
         self.updateSelectedApproveRows();
      }
   };

   self.finishApproval = function (needApproval) {
      var msg = '';
      needApproval.items.forEach(function (item) {
         if (msg) {
            msg += '<br>';
         }
         msg = msg + item.ccOverrideMsg + ' ' + MessageService.get('global.order.number') + ' ' + item.orderno + '-' + Utils.pad(item.ordersuf, 2);
      });
      MessageService.okCancel('global.confirmation', msg, function () {
         needApproval.items.forEach(function (item) {
            var updateOrder = {
               orderno: item.orderno,
               ordersuf: item.ordersuf,
               approvty: 'y',
               ccOverrideMsg: item.ccOverrideMsg,
               ccApprovalfl: true,
               userfield: ''
            };
            DataService.post('api/oe/asoeinquiry/oeirupdateorder', { data: updateOrder, busy: true }, function (data) {
               if (data) {
                  MessageService.processMessaging(data.messaging);
               }
            });
         });
         self.updateSelectedApproveRows();
      }, null);
   };

   self.updateSelectedApproveRows = function () {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      selectedRows.forEach(function (row) {
         row.approvty = 'y';
         var currentIndex = base.oeirorderlistresults.indexOf(row);
         base.grid.updateRow(currentIndex);
      });
   };

   self.internationalApprove = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      var intlApproveList = [];
      selectedRecords.forEach(function (selectedRecord) {
         var approveOrder = {
            orderno: selectedRecord.orderno,
            ordersuf: selectedRecord.ordersuf,
            approvintlty: 'y'
         };
         intlApproveList.push(approveOrder);
      });
      if (intlApproveList.length > 0) {
         DataService.post('api/oe/asoeinquiry/oeirapproveinternationalorders', { data: intlApproveList, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.search();
               }
            }
         });
      } else {
         MessageService.info('global.information', 'message.please.select.a.record.to.proceed.further');
      }
   };

   self.covertQuoteToStockOrder = function () {
      base.selectedOeirItem = GridService.getSelectedRecord(base.grid);
      base.convertQuoteToBackOrder(true);
   };

   /**
    * Customer hyperlink
    */
   self.custHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   /**
    * Order hyperlink
    */
   self.orderHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderno) {
         $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
      }
   };

   /* Private Methods */

   function onHeaderFieldsContinue(criteria) {
      if (criteria) {
         DataService.post('api/oe/asoeinquiry/oeirheaderfieldsinit', { data: criteria, busy: true }, function (data) {
            $state.go('oeir.headerfields', { criteria: criteria, oeirHeaderFieldsInitResults: data });
         });
      }
   }
});

app.controller('OeirDetailCtrl', function ($scope, $state, $stateParams, DataService,TabService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.canSelecteTransactionTab = false;
   self.duedateModel = '';
   self.subtitle = '';
   if (base.selectedOeirItem) {
      self.subtitle = MessageService.get('global.order.number') + base.LABEL_DELIMITER + base.selectedOeirItem.ordernox;
   }

   // Get oeeh record
   if (base.selectedOeirItem) {
      var params = {
         orderno: base.selectedOeirItem.orderno,
         ordersuf: base.selectedOeirItem.ordersuf
      };
      self.oeeh = DataService.getResource('api/oe/oeeh/getbypk', { params: params, busy: true });
   }

   if (base.selectedOeirItem && base.selectedOeirItem.custno) {
      var arscparams = {
         custno: base.selectedOeirItem.custno
      };
      self.arsc = DataService.getResource('api/ar/arsc/getbypk', { params: arscparams, busy: true });
   }

   // Function to provide the customer to the Customer Inquiry General (tab) control
   self.getCustomerForCustomerTab = function (callback) {
      self.arsc.$promise.then(function () {
         callback(self.arsc);
      });
   };

   // Function to provide the shipto to the Customer Inquiry General (tab) control
   self.getShiptoForCustomerTab = function (callback) {
      self.arsc.$promise.then(function () {
         if (self.oeeh.shipto) {
            callback(self.oeeh.shipto);
         }
      });
   };

   self.cancel = function () {
      self.unlockHeader();
      $state.go('oeir.master');
   };

   self.unlockHeader = function () {
      var unlockparams = {
         orderno: base.selectedOeirItem.orderno,
         ordersuf: base.selectedOeirItem.ordersuf
      };
      DataService.post('api/oe/asoeinquiry/oeirheaderunlock', { data: unlockparams, busy: true });
   };

   // Set up tab close listener
   TabService.onCloseTab('oeir.detail', function () {
      self.unlockHeader();
   });
});

app.controller('OeirQuickApprovalCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.ordernox = '';
   self.strApprove = 'y';

   if (base.selectedOeirItem) {
      self.ordernox = base.selectedOeirItem.ordernox;
   }
   self.orderNumberselected = function () {
      base.selectedOeirItem = null;
      var order = self.ordernox.split('-');
      var params = {
         pvOrderno: Number(order[0]),
         pvOrdersuf: Number(order[1])
      };
      DataService.get('api/oe/asoeinquiry/oeirvalidateapprovalsecurity/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            self.getOrderDetails();
         }
      });
   };

   self.getOrderDetails = function () {
      if (self.ordernox) {
         var order = self.ordernox.split('-');
         var criteria = {
            custno: null,
            shipto: '',
            orderno: Number(order[0]),
            ordersuf: Number(order[1]),
            whse: '',
            stagecd: '',
            creditmgr: '',
            begindt: null,
            enddt: null,
            approvty: '',
            approvintlty: '*',
            type: '',
            shipvia: '',
            boonlyfl: false,
            shippedqtyfl: true,
            userfield: ''
         };
         DataService.post('api/oe/asoeinquiry/oeirorderlist', { data: criteria, busy: true }, function (data) {
            base.selectedOeirItem = JSLINQ(data).FirstOrDefault();
         });
      } else {
         base.selectedOeirItem = null;
      }
   };

   self.approve = function () {
      var updateCriteria = {
         orderno: base.selectedOeirItem.orderno,
         ordersuf: base.selectedOeirItem.ordersuf,
         approvty: self.strApprove,
         ccOverrideMsg: '',
         ccApprovalfl: false,
         userfield: ''
      };
      DataService.post('api/oe/asoeinquiry/oeirupdateorder', { data: updateCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.approveContinue(data.oeirupdateorder);
            }
         }
      });
   };

   self.approveContinue = function (updateRecord) {
      if (updateRecord.ccOverrideMsg) {
         MessageService.okCancel('global.confirmation', updateRecord.ccOverrideMsg, function () {
            var updateCriteria = {
               orderno: base.selectedOeirItem.orderno,
               ordersuf: base.selectedOeirItem.ordersuf,
               approvty: self.strApprove,
               ccOverrideMsg: updateRecord.ccOverrideMsg,
               ccApprovalfl: true,
               userfield: ''
            };
            DataService.post('api/oe/asoeinquiry/oeirupdateorder', { data: updateCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     MessageService.info('global.information', 'message.order.has.been.approved');
                     self.getOrderDetails();
                  }
               }
            });
         }, null);
      } else {
         MessageService.info('global.information', 'message.order.has.been.approved');
         self.getOrderDetails();
      }
   };

   self.internationalApprove = function () {
      var approveIntOrders = {
         orderno: base.selectedOeirItem.orderno,
         ordersuf: base.selectedOeirItem.ordersuf,
         approvintlty: self.strApprove,
         userfield: ''
      };
      var orders = [];
      orders.push(approveIntOrders);

      DataService.post('api/oe/asoeinquiry/oeirapproveinternationalorders', { data: orders, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               MessageService.info('global.information', 'message.order.has.been.approved');
               self.getOrderDetails();
            }
         }
      });
   };

   self.details = function () {
      if (base.selectedOeirItem !== null) {

         var order = self.ordernox.split('-');
         var params = {
            pvOrderno: Number(order[0]),
            pvOrdersuf: Number(order[1])
         };
         DataService.get('api/oe/asoeinquiry/oeirvalidateapprovalsecurity/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
            if (data) {
               $state.go('oeir.detail');
            }
         });
      }
   };

   self.convertQuoteToBackOrder = function () {
      base.convertQuoteToBackOrder(false);
   };
});

app.controller('OeirHoldReleaseCtrl', function ($state, $stateParams, DataService) {
   var self = this;
   self.criteria = $stateParams.criteria;

   self.onHoldAll = function () {
      if (self.criteria) {
         DataService.post('api/oe/asoeinquiry/oeirholdall', { data: self.criteria, busy: true }, function () {
            $state.go('oeir.master');
         });
      }
   };

   self.onReleaseAll = function () {
      if (self.criteria) {
         DataService.post('api/oe/asoeinquiry/oeirreleaseall', { data: self.criteria, busy: true }, function () {
            $state.go('oeir.master');
         });
      }
   };
});

app.controller('OeirHeaderFieldsCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   self.criteria = $stateParams.criteria;
   self.oeirHeaderFieldsInitResults = $stateParams.oeirHeaderFieldsInitResults;
   self.tempOeirHeaderFieldsInitResults = angular.copy(self.oeirHeaderFieldsInitResults);
   self.subtitle = MessageService.get('global.order.number') + ': ' + self.oeirHeaderFieldsInitResults.ordernox;

   self.reset = function () {
      self.oeirHeaderFieldsInitResults = angular.copy(self.tempOeirHeaderFieldsInitResults);
   };

   self.cancel = function () {
      self.unlockHeader();
      $state.go('oeir.master');
   };

   self.submit = function () {
      if (self.criteria && self.oeirHeaderFieldsInitResults) {
         var request = {
            oeirheaderfieldsinitcriteria: self.criteria,
            oeirheaderfieldsinitresults: self.oeirHeaderFieldsInitResults
         };
         DataService.post('api/oe/asoeinquiry/oeirheaderfieldsupdate', { data: request, busy: true }, function (messaging) {
            if (messaging) {
               if (!MessageService.processMessaging(messaging)) {
                  self.unlockHeader();
                  $state.go('oeir.master', { refreshSearch: true });
               }
            }
         });
      }
   };

   self.unlockHeader = function () {
      if (self.criteria) {
         DataService.post('api/oe/asoeinquiry/oeirheaderunlock', { data: self.criteria, busy: true });
      }
   };
});

app.controller('OeirDetailHeaderCtrl', function ($scope, DataService, Utils, MessageService, AuthService) {
   var self = this;
   var dtl = $scope.dtl;
   self.oeirHeaderRetrieveResults = {};

   dtl.oeeh.$promise.then(function () {
      var criteria = {
         orderno: dtl.oeeh.orderno,
         ordersuf: dtl.oeeh.ordersuf,
         userfield: ''
      };

      var addon = {
         addonamt: 0,
         addoncapfl: true,
         addondist: 0,
         addondistr: '',
         addonnet: 0,
         addonno: 0,
         addontype: true,
         addoverfl: true,
         addtaxgroup: 0,
         cono: 0,
         keyindex: '',
         operinit: '',
         orderno: 0,
         ordersuf: 0,
         ordertype: '',
         prevaddamt: '',
         prevaddtype: true,
         seqno: 0,
         transdt: null,
         transproc: '',
         transtm: '',
         user1: '',
         user2: '',
         user3: '',
         user4: '',
         user5: '',
         user6: 0,
         user7: 0,
         user8: null,
         user9: null,
         xxc1: '',
         xxc2: '',
         xxc3: '',
         xxc4: '',
         xxc5: '',
         xxda1: null,
         xxda2: null,
         xxda3: null,
         xxda4: null,
         xxda5: null,
         xxde1: 0,
         xxde2: 0,
         xxde3: 0,
         xxde4: 0,
         xxde5: 0,
         xxi1: 0,
         xxi2: 0,
         xxi3: 0,
         xxi4: 0,
         xxi5: 0,
         xxl1: true,
         xxl2: true,
         xxl3: true,
         xxl4: true,
         xxl5: true
      };

      self.isCodEnabled = (dtl.oeeh.fpcustno === 0 && dtl.oeeh.stagecd < 3 && dtl.oeeh.nodolines === 0) ? true : false;

      var addonList = [];
      addonList.push(addon);
      var headerRequest = {
         oeirheaderretrieveaddons: addonList,
         oeirheaderretrievecriteria: criteria
      };
      DataService.post('api/oe/asoeinquiry/oeirheaderretrieve', { data: headerRequest, busy: true }, function (data) {
         self.oeirHeaderRetrieveResults = data;
      });
   });

   self.onCODChange = function () {
      if (dtl.oeeh) {
         var prevCodfl = !self.oeirHeaderRetrieveResults.codfl;
         var criteria = {
            pvCustno: dtl.oeeh.custno,
            pvTermstype: self.oeirHeaderRetrieveResults.termstype
         };
         DataService.post('api/oe/asoeinquiry/oeirauthpointinfo', { data: criteria, busy: true }, function (data) {
            if (data) {
               if (data.pvCustselltype === 'd' && (prevCodfl && !self.oeirHeaderRetrieveResults.codfl || self.oeirHeaderRetrieveResults.codfl && !data.pvTermscodfl)) {
                  AuthService.createAuthPoint('oeir', '', 'termstype', '', '', null, null,
                     function () {
                        self.oeirHeaderRetrieveResults.codfl = !self.oeirHeaderRetrieveResults.codfl;
                     });
               }
            }
         });
      }
   };

   self.update = function () {
      var updateCriteria = {
         orderno: self.oeirHeaderRetrieveResults.orderno,
         ordersuf: self.oeirHeaderRetrieveResults.ordersuf,
         userfield: ''
      };
      var updateResults = {
         orderno: self.oeirHeaderRetrieveResults.orderno,
         ordersuf: self.oeirHeaderRetrieveResults.ordersuf,
         name: '',
         approvty: self.oeirHeaderRetrieveResults.approvty,
         approvintlty: dtl.oeeh.approvintlty, //Not on view so pass current value so it is not overridden with blank
         codcollamt: self.oeirHeaderRetrieveResults.cODCollAmt,
         codfl: self.oeirHeaderRetrieveResults.codfl,
         comment1: self.oeirHeaderRetrieveResults.comment1,
         comment2: self.oeirHeaderRetrieveResults.comment2,
         termstype: self.oeirHeaderRetrieveResults.termstype,
         shipviaty: self.oeirHeaderRetrieveResults.shipviaty,
         type: self.oeirHeaderRetrieveResults.type,
         stagecd: self.oeirHeaderRetrieveResults.stagecd,
         ordernox: self.oeirHeaderRetrieveResults.ordernox,
         stagecdx: self.oeirHeaderRetrieveResults.stagecdx,
         userfield: ''
      };

      var updateRequest = {
         oeirheaderfieldsinitcriteria: updateCriteria,
         oeirheaderfieldsinitresults: updateResults
      };

      DataService.post('api/oe/asoeinquiry/oeirheaderfieldsupdate', { data: updateRequest, busy: true }, function (messaging) {
         if (messaging) {
            if (!MessageService.processMessaging(messaging)) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         }
      });
   };
});

app.controller('OeirDetailCustomerCreditCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;
   self.creditResults = {};
   self.fpcustfl = false;
   self.orderno = 0;
   self.ordersuf = 0;
   self.custno = 0;

   dtl.oeeh.$promise.then(function () {
      self.orderno = dtl.oeeh.orderno;
      self.ordersuf = dtl.oeeh.ordersuf;
      if (dtl.oeeh && dtl.arsc) {
         self.getCustomerCreditResults();
      }
   });

   dtl.arsc.$promise.then(function () {
      self.fpcustfl = dtl.arsc.fpcustfl;
      self.custno = dtl.arsc.custno;
      if (dtl.oeeh && dtl.arsc) {
         self.getCustomerCreditResults();
      }
   });

   self.getCustomerCreditResults = function () {
      if (self.custno && self.orderno) {
         var criteria = {
            custno: self.custno,
            orderno: self.orderno,
            ordersuf: self.ordersuf,
            userfield: ''
         };
         DataService.post('api/oe/asoeinquiry/oeircustomercredit', { data: criteria, busy: true }, function (data) {
            self.creditResults = data;
         });
      }
   };
});

app.controller('OeirCreditCardCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.isCreditCardHistory = function () {
      return $state.is('oeir.credit');
   };

   self.subtitle = '';
   if (base.selectedOeirItem) {
      self.subtitle = MessageService.get('global.order.number') + base.LABEL_DELIMITER + base.selectedOeirItem.ordernox;
   }

   // Get oeeh record
   if (base.selectedOeirItem) {
      var params = {
         orderno: base.selectedOeirItem.orderno,
         ordersuf: base.selectedOeirItem.ordersuf
      };
      self.oeeh = DataService.getResource('api/oe/oeeh/getbypk', { params: params, busy: true });
   }

   self.back = function () {
      $state.go('oeir.master', { refreshSearch: true }, { reload: 'oeir.master' });
   };
});