'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('oe', 'oeif', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('oe', 'oeif', { params: { pk: undefined, pk2: undefined, pk3: undefined, pk4: undefined } });

   $stateProvider.state('oeif.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeif/detail.json');
            },
            controller: 'OeifDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('oeif.detail.orderFulfillment', {
      url: '/order-fulfillment',
      params: {
         ofFunctionName: null,
         ofOrderNo: null,
         ofOrderSuf: null,
         ofLineNo: null
      },
      views: {
         orderFulfillmentDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/order-fulfillment/order-fulfillment.json');
            },
            controller: 'OrderFulfillmentCtrl as oful'
         }
      }
   });

});

app.controller('OeifBaseCtrl', function ($state, AodataService, ConfigService, DataService, Sasoo, Utils) {
   var self = this;
   self.criteria = {};
   self.oeifOrderNo = '';
   self.oeifOrderSuf = '';

   // Check if Consolidated Fulfillment Billing is turned on
   self.isAOConsolFulfillmentOn = AodataService.getValue("OE", "OEFulfillmentBilling").toLowerCase() === 'yes';
   self.isSASOFulfillmentOn = Sasoo.allowfulfillmentty.toLowerCase() !== 'na';

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'oeif',
      rowIdField: 'rowID',
      stateRef: 'oeif.detail',
      title: { label: 'global.order.number', valueFunction: 'base.getFullOrderNumber' },
      description: [{ label: 'global.warehouse', value: 'whse' }]

   };

   self.isMaster = function () {
      return $state.is('oeif.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeif.master');
   };

   self.isDetail = function () {
      return $state.is('oeif.detail');
   };

   self.includesDetail = function () {
      return $state.includes('oeif.detail');
   };

   self.isOrderFulfillment = function () {
      return $state.is('oeif.detail.orderFulfillment');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   self.getFullOrderNumber = function (oeeh) {
      if (oeeh) {
         return oeeh.orderno + '-' + Utils.pad(oeeh.ordersuf, 2);
      } else {
         return '';
      }
   };

   // Perform simple search and update data set for the grid
   self.search = function () {

      var criteriaSearch = {};

      // Parse out the Order# and Suffix
      self.loadOrderNo(self.criteria.ordernum);
      criteriaSearch.orderno = self.orderno;
      criteriaSearch.ordersuf = self.ordersuf;
      criteriaSearch.recordcountlimit = self.criteria.recordlimit;

      DataService.post('api/oe/asoeinquiry/oeifsearch', { data: criteriaSearch, busy: true }, function (data) {
         self.dataset = data.oeifsearchresults;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();

   // Parse out the order number
   self.loadOrderNo = function (ordernum) {

      if (ordernum) {
         var orderParts = ordernum.split('-');
         if (orderParts.length === 2) {
            self.orderno = orderParts[0];
            self.ordersuf = orderParts[1];
            var orderNo = orderParts[0];
            if (!orderNo) {
               self.orderno = 0;
               self.ordersuf = 0;
            }
         }
      } else {
         self.orderno = 0;
         self.ordersuf = 0;
      }
   };

   self.orderFulfillmentHeader = function () {
      $state.go('oeif.detail.orderFulfillment', {
         ofFunctionName: 'oeif-hdr',
         ofOrderNo: self.orderno,
         ofOrderSuf: self.ordersuf,
         ofLineNo: '0'
      });
   };

   self.orderFulfillmentLine = function () {
      $state.go('oeif.detail.orderFulfillment', {
         ofFunctionName: 'oeif',
         ofOrderNo: self.orderno,
         ofOrderSuf: self.ordersuf,
         ofLineNo: self.lineno
      });
   };

});

app.controller('OeifSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeif.master');
      }

      // Get data
      base.search();
   };
});

app.controller('OeifMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, GridService, MessageService, ModalService, Utils) {
   var self = this;
   var base = $scope.base;

   self.oeifOverrideBillingCodeModal = null;
   self.oeifSubmitOrdersModal = null;

   // Fulfillment Order # HyperLink From Other Functions - PK1 and PK2
   if ($stateParams.pk) {
      // Display value in the Search Criteria and build the Order Number
      base.criteria.ordernum = $stateParams.pk + '-' + Utils.pad($stateParams.pk2, 2);
      // Main Search with Order# loaded
      base.search();
   };

   // Customer hyperlink
   self.customerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno > 0) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   // Ship To
   self.shipToHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.custno > 0 && currentRow.shipto > '') {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };

   // Order#
   self.orderHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {

         if (currentRow.stagecd === 0 || currentRow.stagecd === 1 || currentRow.stagecd === 2) {

            MessageService.noYes('global.question', 'global.order.entry', function () {
               $state.go('oeio.detail', {
                  pk: currentRow.orderno,
                  pk2: currentRow.ordersuf
               });
            },
            function () {
               $state.go('oeet.maintain', {
                  orderno: currentRow.orderno,
                  ordersuf: currentRow.ordersuf
               });
            });
         } else {
            $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
         }
      }
   };

   // Advanced search criteria object with initial values
   self.advCriteria = {
      recordlimit: ConfigService.getDefaultRecordLimit()
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'billcd', label: MessageService.get('global.billing.code') },
      { value: 'custno', label: MessageService.get('global.customer.number') },
      { value: 'ordernum', label: MessageService.get('global.order.number') },
      { value: 'recordlimit', label: MessageService.get('global.record.limit') },
      { value: 'releasefl', label: MessageService.get('global.ready.to.release') },
      { value: 'shipto', label: MessageService.get('global.ship.to') },
      { value: 'stgcd', label: MessageService.get('global.stage.code') },
      { value: 'tiedordnum', label: MessageService.get('global.tied.order.number') },
      { value: 'whse', label: MessageService.get('global.order.warehouse') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['ordernum', 'whse', 'recordlimit'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { id: record.oeehrowid });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordlimit) {
         advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      // Parse out the Order# and Suffix
      base.loadOrderNo(advCriteria.ordernum);
      advCriteria.orderno = base.orderno;
      advCriteria.ordersuf = base.ordersuf;

      // Parse out the Order# and Suffix
      base.loadOrderNo(advCriteria.tiedordnum);
      advCriteria.tiedordno = base.orderno;
      advCriteria.tiedordsuf = base.ordersuf;

      DataService.post('api/oe/asoeinquiry/oeifsearch', { data: advCriteria, busy: true }, function (data) {
         base.dataset = data.oeifsearchresults;
      });
   };

   // Tied Fulfillment Order# HyperLink From Other Functions - PK3 and PK4
   // After Master 'Search Function' Defined
   if ($stateParams.pk3) {
      // Display value in the Search Criteria and build the Order Number
      self.advCriteria.tiedordnum = $stateParams.pk3 + '-' + Utils.pad($stateParams.pk4, 2);
      // Advanced Criteria Search with Tied Order#
      self.search();
   };

   self.overrideRule = function () {
      ModalService.showModal('oe/oeif/override-billing-code.json', 'oeifOverrideBillingCodeCtrl as obil', $scope, function (modal) {
         self.oeifOverrideBillingCodeModal = modal;
      });
   };

   self.submitOrders = function () {
      ModalService.showModal('oe/oeif/submit-orders.json', 'oeifSubmitOrdersCtrl as sord', $scope, function (modal) {
         self.oeifSubmitOrdersModal = modal;
      });
   };

   self.isConsolFulfillmentOn = function () {
      if (base.isAOConsolFulfillmentOn) {
         return true;
      } else {
         return false;
      }
   };

   self.isReadyVisible = function (row, cell, value, column, item) {
      // If Stage is 'Submitted', can see 'Ready To Release' to change Billing
      if (item && item.fulfillmentstgcd !== 's') {
         return false;
      } else {
         return true;
      }
   };

   self.isQuantityVisible = function (row, cell, value, column, item) {
      // If Stage is 'Complete', do not show Totals
      if (item && item.fulfillmentstgcd === 'x') {
         return false;
      } else {
         return true;
      }
   };

});

app.controller('OeifDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var lines = $scope.lines;

   if ($stateParams.id) {
      self.oeif = DataService.getResource('api/oe/oeeh/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         orderno: $stateParams.pk,
         ordersuf: $stateParams.pk2,
         fillmode: true
      };

      self.oeif = DataService.getResource('api/oe/oeeh/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.oeif.$promise.then(function () {
      if (self.oeif) {
         base.orderno = self.oeif.orderno;
         base.ordersuf = self.oeif.ordersuf;
         base.whse = self.oeif.whse;
         self.subTitle = MessageService.get('global.order.number') + ': ' + self.oeif.orderno + '-' +
            Utils.pad(self.oeif.ordersuf, 2) + Constants.SUB_TITLE_SEPARATOR +
            MessageService.get('global.warehouse') + ': ' + self.oeif.whse;

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.oeif);
      }
   });

   self.orderFulfillmentClicked = function () {
      if (!base.lineno || base.lineno === '0') {
         base.orderFulfillmentHeader();
      } else {
         base.orderFulfillmentLine();
      }
   };
});

app.controller('oeifOverrideBillingCodeCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   // obil - Override Billing Code
   var self = this;
   var mst = $scope.mst;
   var base = $scope.base;
   var oeData = {};

   self.cancel = function () {
      mst.oeifOverrideBillingCodeModal.destroy();
   };

   self.submit = function () {

      var oeifUpdateCriteria = {};
      var oeifUpdateRecords = [];
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.question', 'question.do.you.wish.to.continue', function () {

         oeifUpdateCriteria = {
            updatetype: 'bc',
            updatevalue: self.overrideBillingCode
         };

         // Load Selected Records Only
         if (records && records.length) {

            records.forEach(function (record) {
               oeifUpdateRecords.push(record);
            });

            oeData = {
               oeifsearchcriteria: oeifUpdateCriteria,
               oeifsearchresults: oeifUpdateRecords
            }

            DataService.post('api/oe/asoeinquiry/oeifupdate', { data: oeData, busy: true }, function (data) {
               if (data) {
                  MessageService.processMessaging(data.messaging);
                  base.dataset = data.oeifsearchresults;
               }
               self.cancel();
            });
         }
      });
   };

});

app.controller('oeifSubmitOrdersCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   // sord - Submit Orders
   var self = this;
   var mst = $scope.mst;
   var base = $scope.base;
   var oeData = {};

   self.repricefl = true;
   self.nspricefl = true;
   self.resetaddonfl = false;
   self.recalccostfl = true;

   self.cancel = function () {
      mst.oeifSubmitOrdersModal.destroy();
   };

   self.submit = function () {

      var oeifUpdateCriteria = {};
      var oeifUpdateRecords = [];
      var records = GridService.getSelectedRecords(base.grid);

      MessageService.okCancel('global.question', 'question.do.you.wish.to.continue', function () {

         oeifUpdateCriteria = {
            updatetype: 'so',
            updatevalue: '',
            repricefl: self.repricefl,
            nspricefl: self.nspricefl,
            resetaddonfl: self.resetaddonfl,
            recalccostfl: self.recalccostfl
         };

         if (records && records.length) {
            records.forEach(function (record) {
               oeifUpdateRecords.push(record);
            });

            oeData = {
               oeifsearchcriteria: oeifUpdateCriteria,
               oeifsearchresults: oeifUpdateRecords
            }

            DataService.post('api/oe/asoeinquiry/oeifupdate', { data: oeData, busy: true }, function (data) {
               if (data) {
                  MessageService.processMessaging(data.messaging);
                  base.dataset = data.oeifsearchresults;
               }
               self.cancel();
            });
         }
      });
   };

});

app.controller('OeifDetailLinesCtrl', function ($scope, $state, $stateParams, Constants, DataService, GridService) {
   // this = lines
   var self = this;
   var dtl = $scope.dtl;
   var base = $scope.base;
   base.lineno = '';

   var TIETYPE_KP = 'w';
   var TIETYPE_PO = 'p';
   var TIETYPE_VA = 'f';
   var TIETYPE_WT = 't';

   // Load Lines List
   dtl.oeif.$promise.then(function () {

      // From Drill Down - load selected record.  Search loads single record
      if (!base.orderno) {
         base.orderno = dtl.oeif.orderno;
         base.ordersuf = dtl.oeif.ordersuf;
      }

      var criteria = {
         orderno: base.orderno,
         ordersuf: base.ordersuf,
         showlines: 'i'
      };

      DataService.post('api/oe/asoeline/oeiolinelistfetch', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   });

   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: base.whse });
      }
   };

   self.productAvailabilityHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: base.whse }, { reload: 'icia.detail' });
      }
   };

   self.orderHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderaltno) {
         switch (currentRow.ordertype.toLowerCase()) {
            case TIETYPE_PO:
               $state.go('poip.detail', { pk: currentRow.orderaltno, pk2: '' });
               break;

            case TIETYPE_WT:
               $state.go('wtit.detail', { pk: currentRow.orderaltno, pk2: '' });
               break;

            case TIETYPE_VA:
               $state.go('vaif.detail', { pk: currentRow.orderaltno, pk2: '' });
               break;

            case TIETYPE_KP:
               $state.go('kpiw.detail', { pk: currentRow.orderaltno, pk2: '' });
               break;
         }
      }
   };

   self.numberLinesSelected = function () {
      base.lineno = '';

      var singleRow = self.grid.isOneRowSelected();
      if (singleRow) {
         var records = GridService.getSelectedRecords(self.grid);

         // Load Selected Record
         if (records && records.length) {

            records.forEach(function (record) {
               base.lineno = record.actllineno;
            });
         }
      }
   };

});

app.controller('OeifDetailTiedOrdersCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   // this = tied
   var self = this;
   var dtl = $scope.dtl;

   dtl.oeif.$promise.then(function () {
      DataService.get('api/oe/asoeinquiry/oeiftiedorders/' + dtl.oeif.orderno + '/' + dtl.oeif.ordersuf, function (data) {
         self.dataset = data;
      });
   });

   // Customer hyperlink
   self.customerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   // Ship To
   self.shiptoHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.custno && currentRow.shipto) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };

   // Order#
   self.orderHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {

         if (currentRow.stagecd === 0 || currentRow.stagecd === 1 || currentRow.stagecd === 2) {

            MessageService.noYes('global.question', 'global.order.entry', function () {
               $state.go('oeio.detail', {
                  pk: currentRow.orderno,
                  pk2: currentRow.ordersuf
               });
            },
            function () {
               $state.go('oeet.maintain', {
                  orderno: currentRow.orderno,
                  ordersuf: currentRow.ordersuf
               });
            });
         } else {
            $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
         }
      }
   };

});
