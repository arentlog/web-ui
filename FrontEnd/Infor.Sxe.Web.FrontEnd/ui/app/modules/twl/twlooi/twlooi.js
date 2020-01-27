'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('twl', 'twlooi', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('twl', 'twlooi');

   $stateProvider.state('twlooi.detail', {
      url: '/detail?id&pk&pk2&pk3&pk4',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/detail.json');
            },
            controller: 'TwlooiDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('twlooi.detail.availableinventory', {
      url: '/available-inventory',
      params: {
         whNum: null,
         coNum: null,
         absNum: null,
         itemDesc: null
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/shared/available-inventory/available-inventory.json');
            },
            controller: 'TwlAvailableInventoryCtrl as dtlavailinv'
         }
      }
   });

   $stateProvider.state('twlooi.detail.picks', {
      url: '/picks',
      params: {
         row: null
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/tabs/picks.json');
            },
            controller: 'TwlooiDetailPicksCtrl as pick'
         }
      }
   });

   $stateProvider.state('twlooi.detail.transactions', {
      url: '/transactions',
      params: {
         row: null
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/tabs/transactions.json');
            },
            controller: 'TwlooiDetailTransactionsCtrl as trans'
         }
      }
   });

   $stateProvider.state('twlooi.detail.transaction-summary', {
      url: '/transaction-summary',
      params: {
         row: null
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/tabs/transsummary.json');
            },
            controller: 'TwlooiDetailTransSummary as transum'
         }
      }
   });
   $stateProvider.state('twlooi.detail.cartoncontents', {
      url: '/carton-contents',
      params: {
         coNum: '',
         whNum: '',
         cartonId: '',
         trackingId: ''
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/tabs/cartoncontents.json');
            },
            controller: 'TwlooiDetailCartonContentsCtrl as dtlcc'
         }
      }
   });

   //This is a sub-view under Details so we can keep our state when returning from viewing the Notes/Comments.
   $stateProvider.state('twlooi.detail.notes-comments', {
      url: '/notes-comments',
      params: {
         orderNumber: null,
         orderSuffix: null,
         line: 9999,
         lineSequence: 0,
         keyId: null
      },
      views: {
         notesComments: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/notes-comments.json');
            },
            controller: 'TwlooiDetailNotesCommentsCtrl as dtlnc'
         }
      }
   });

   // StateProvider for Serial History from the Carton Contents Object
   $stateProvider.state('twlooi.detail.cartoncontents.serialhistory', {
      url: '/serial-history',
      params: {
         coNum: '',
         whNum: '',
         order: '',
         orderSuffix: '',
         line: 0,
         lineSequence: 0,
         absNum: ''  //abs_num = item = part number
      },
      views: {
         subCartonViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/tabs/serialhistory.json');
            },
            controller: 'TwlooiDetailSerialHistoryCtrl as dtlsh'
         }
      }
   });

   // StateProvider for Serial History from the Detail Object, uses common json screen
   $stateProvider.state('twlooi.detail.serialhistory', {
      url: '/serial-history',
      params: {
         coNum: '',
         whNum: '',
         order: '',
         orderSuffix: '',
         line: 0,
         lineSequence: 0,
         absNum: ''  //abs_num = item = part number
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlooi/tabs/serialhistory.json');
            },
            controller: 'TwlooiDetailSerialHistoryCtrl as dtlsh'
         }
      }
   });

});

app.controller('TwlooiBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService, Utils) {
   var self = this;
   self.LABEL_DELIMITER = ': ';
   self.DOCUMENT_DELIMITER = '-';
   self.criteria = {};
   self.criteriaUsed = {
      coNum: '',
      whNum: ''
   };

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.userId = UserService.getTwlUserId();

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + self.LABEL_DELIMITER + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'twlooi',
      rowIdField: 'rowID',
      stateRef: 'twlooi.detail',
      title: { label: 'global.order.number', valueFunction: 'base.getFullOrderNumber' },
      description: [{ label: 'global.warehouse', value: 'whNum' }]
   };

   self.getFullOrderNumber = function (twlooi) {
      if (twlooi) {
         return twlooi.order + self.DOCUMENT_DELIMITER + Utils.pad(twlooi.orderSuffix, 2);
      } else {
         return '';
      }
   };

   self.isMaster = function () {
      return $state.is('twlooi.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlooi.master');
   };

   self.isDetail = function () {
      return $state.is('twlooi.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlooi.detail');
   };

   self.isLineTransactions = function () {
      return $state.is('twlooi.detail.transactions');
   };

   self.isLinePicks = function () {
      return $state.is('twlooi.detail.picks');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      if (self.criteria.whNum) {
         self.changeSearchWarehouse();
      }
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   self.changeSearchWarehouse = function () {
      self.lastUserEnteredWhNum = self.criteria.whNum;
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/twl/astwlinquiry/getorderinquirylist', { data: self.criteria, busy: true }, function (data) {
         self.criteriaUsed.coNum = self.criteria.coNum;
         self.criteriaUsed.whNum = self.criteria.whNum;
         self.dataset = data.orderinquirylist;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlooiSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlooi.master');
      }

      // Get data
      base.search();
   };
});

app.controller('TwlooiMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Advanced search criteria object with initial values
   self.advCriteria = {
      coNum: base.userCoNum,
      whNum: base.userWhNum,
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'carrier', label: MessageService.get('global.carrier') },
      { value: 'customer', label: MessageService.get('global.customer') },
      { value: 'warehouse', label: MessageService.get('global.warehouse') },
      { value: 'shipaddress', label: MessageService.get('global.ship.to.address') },
      { value: 'rma', label: MessageService.get('global.return.merchandise.authorization') },
      { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['warehouse'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      // TODO: finish rowId param or pk param(s)
      $state.go('^.detail', { pk: record.id });
   };

   self.advCriteriaReady = function () {
      self.advCriteriaWhseChange();
   };

   self.advCriteriaWhseChange = function () {
      if (self.advCriteria && self.advCriteria.coNum && self.advCriteria.whNum) {
         base.lastUserEnteredWhNum = self.advCriteria.whNum;
      }
      DataService.post('api/twl/carrier/gettwlcarriers', { data: { coNum: self.advCriteria.coNum, whNum: self.advCriteria.whNum }, busy: true }, function (data) {
         if (data) {
            self.carrierOptions = data;
         }
      });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordlimit) {
         advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/twl/astwlinquiry/getorderinquirylist', { data: advCriteria, busy: true }, function (data) {
         base.criteriaUsed.coNum = advCriteria.coNum;
         base.criteriaUsed.whNum = advCriteria.whNum;
         base.dataset = data.orderinquirylist;
      });
   };
});

app.controller('TwlooiDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, GridService, Utils) {
   //dtl
   var self = this;
   var base = $scope.base;
   self.showLinesTabFirst = false;
   self.isCommentsVisible = false;
   self.isCustomBeingEdited = false;

   self.order = {
      order: '0',
      orderSuffix: '0',
      whNum: base.criteriaUsed.whNum
   };

   // Get record (handle both id param and pk params for hyperlinks to this function)
   // This is confusing because ordhdr.id is sent as stateparams.pk, and rowid(ordhdr) is sent as stateparams.id
   if ($stateParams.id) {
      var params = {
         rowid: $stateParams.id
      };
      DataService.post('api/twl/astwlinquiry/getorderdetail', { data: params, busy: true }, function (data) {
         self.order = data.order;
         self.orderlines = data.orderlines;
         self.initData();
      });
   }
   else if ($stateParams.pk2) {
      var params3 = {
         coNum: $stateParams.pk3,
         whNum: $stateParams.pk4,
         order: $stateParams.pk,
         orderSuffix: $stateParams.pk2
      };
      DataService.post('api/twl/astwlinquiry/getorderdetail', { data: params3, busy: true }, function (data) {
         self.order = data.order;
         self.orderlines = data.orderlines;
         self.initData();
      });
   }
   else {
      var params2 = {
         id: $stateParams.pk
      };
      DataService.post('api/twl/astwlinquiry/getorderdetail', { data: params2, busy: true }, function (data) {
         self.order = data.order;
         self.orderlines = data.orderlines;
         self.initData();
      });
      if ($stateParams.pk4 && $stateParams.pk4 === 'LINES') {
         self.showLinesTabFirst = true;
      }
   }

   self.setIsCommentsVisible = function () {
      if (self.order && self.order.isComments) {
         return true;
      } else {
         self.orderlines.forEach(function (orderLine) {
            if (orderLine.isComments) {
               return true;
            }
         });
      }

      return false;
   };

   self.initData = function () {
      if (self.order) {
         base.criteriaUsed.coNum = self.order.coNum;
         base.criteriaUsed.whNum = self.order.whNum;
         self.subTitle = base.criteriaUsed.whNum + Constants.SUB_TITLE_SEPARATOR + self.order.order + base.DOCUMENT_DELIMITER + Utils.pad(self.order.orderSuffix, 2);
         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.order);
         // Move carton retrieve here to reduce flicker time - loads data while customer looks at header tab
         var cartonParams = {
            chCo: self.order.coNum,
            chWh: self.order.whNum,
            chOrd: self.order.order,
            chSuf: self.order.orderSuffix
         };
         DataService.post('api/twl/astwlinquiry/getcartoninfo', { data: cartonParams, busy: true }, function (data) {
            self.cartons = data;
         });
         // Move carton retrieve here to reduce flicker time - loads data while customer looks at header tab
         DataService.post('api/twl/astwlinquiry/getordermanifests', { data: self.order, busy: true }, function (data) {
            self.manifests = data;
         });

         self.isCommentsVisible = self.setIsCommentsVisible();
      }
   };

   self.viewComments = function () {
      if (self.order && self.order.id) {
         $state.go('.notes-comments', { orderNumber: self.order.order, orderSuffix: self.order.orderSuffix, keyId: self.order.id });
      }
   };

   self.viewAvailableInventoryForLine = function () {
      var records = GridService.getSelectedRecords(self.linesgrid);
      if (records) {
         $state.go('twlooi.detail.availableinventory', { whNum: records[0].whNum, coNum: records[0].coNum, absNum: records[0].absNum, itemDesc: records[0].absNumDesc });
      }
   };

   self.viewTransactionsForLine = function () {
      var records = GridService.getSelectedRecords(self.linesgrid);
      if (records) {
         $state.go('twlooi.detail.transactions', { row: records[0] });
      }
   };

   self.viewPicksForLine = function () {
      var records = GridService.getSelectedRecords(self.linesgrid);
      if (records) {
         $state.go('twlooi.detail.picks', { row: records[0] });
      }
   };

   self.viewTransactionSummaryForLine = function () {
      var records = GridService.getSelectedRecords(self.linesgrid);
      if (records) {
         $state.go('twlooi.detail.transaction-summary', { row: records[0] });
      }
   };

   self.viewSerialsForLine = function (e, args) {
      var record = GridService.getSelectedRecord(self.linesgrid);
      $state.go('twlooi.detail.serialhistory', {
         coNum: self.order.coNum,
         whNum: self.order.whNum,
         order: self.order.order,
         orderSuffix: self.order.orderSuffix,
         line: record.line,
         lineSequence: record.lineSequence,
         absNum: record.absNum
      });
   };

   self.customEdit = function () {
      self.orderBefore = angular.copy(self.order);
      self.isCustomBeingEdited = true;
   };

   self.customReset = function () {
      self.order = angular.copy(self.orderBefore);
      self.isCustomBeingEdited = false;
   };

   self.customSave = function () {
      DataService.post('api/twl/astwladmin/changeordercustom', {
         data: {
            omorderkey: self.order,
            custom1: self.order.customData1,
            custom2: self.order.customData2,
            custom3: self.order.customData3,
            custom4: self.order.customData4,
            custom5: self.order.customData5
         }, busy: true
      }, function () {
         self.isCustomBeingEdited = false;
      });
   };
});

app.controller('TwlooiDetailHeaderCtrl', function () {
   //hdr
});

app.controller('TwlooiDetailLineCtrl', function ($scope, $state, GridService) {
   //lines
   var self = this;
   self.isCommentsVisible = false;
   self.isSerialVisible = false;

   self.changeRow = function (e, args) {
      var dtl = $scope.dtl;
      var record = GridService.getSelectedRecord(dtl.linesgrid);
      if (record) {
         self.isCommentsVisible = record.isComments ? true : false;
         self.isSerialVisible = record.itemSerialFlag ? true : false;
      }
   };

   self.productInventoryHyperlinkSearch = function () {
      var dtl = $scope.dtl;
      var records = GridService.getSelectedRecords(dtl.linesgrid);
      if (records) {
         $state.go('twlcin.master', { pk: records[0].whNum, pk2: records[0].absNum});
      }
   };

   self.viewComments = function () {
      var dtl = $scope.dtl;
      if (dtl.linesgrid.isOneRowSelected()) {
         var record = GridService.getSelectedRecord(dtl.linesgrid);
         if (record && dtl.order.id) {
            $state.go('.notes-comments', { orderNumber: dtl.order.order, orderSuffix: dtl.order.orderSuffix, line: record.line, lineSequence: record.lineSequence, keyId: dtl.order.id});
         }
      }
   };
});

app.controller('TwlooiCartonInquiryCtrl', function ($scope, $state) {
   //dtlc
   var self = this;

   self.showCartonLines = function (e, args) {
      var record = args[0].item;
      $state.go('twlooi.detail.cartoncontents', {
            coNum: record.coNum,
            whNum: record.whNum,
            cartonId: record.cartonId,
            trackingId: record.trackingId
         });
   };

});

app.controller('TwlooiDetailCartonContentsCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   //dtlcc
   var self = this;

   self.company = $stateParams.coNum;
   self.warehouse = $stateParams.whNum;
   self.cartonId = $stateParams.cartonId;
   self.trackingId = $stateParams.trackingId;
   self.subTitle = self.warehouse;
   self.isSerialEnabled = false;

   var params = {
      coNum: self.company,
      whNum: self.warehouse,
      cartonId: self.cartonId
   };

   DataService.post('api/twl/astwlinquiry/getcartoncontents', { data: params, busy: true }, function (data) {
      self.dataset = data;
   });

   self.rowSelected = function () {
      if (self.grid.isOneRowSelected()) {
         var record = GridService.getSelectedRecord(self.grid);
         self.isSerialEnabled = record.isSerial ? true : false;
      } else {
         self.isSerialEnabled = false;
      }
   };

   self.isCartonContents = function () {
      return $state.is('twlooi.detail.cartoncontents');
   };

   self.returnToCartons = function () {
      $state.go('^');
   };

   self.viewSerials = function (e, args) {
      var record = GridService.getSelectedRecord(self.grid);
      $state.go('twlooi.detail.cartoncontents.serialhistory', {
         coNum: self.company,
         whNum: self.warehouse,
         order: record.order,
         orderSuffix: record.orderSuffix,
         line: record.line,
         lineSequence: record.lineSequence,
         absNum: record.absNum
      });
   };
});

app.controller('TwlooiManifestInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   //dtlm
   var self = this;
   var dtl = $scope.dtl;
   self.coNum = dtl.order.coNum;
   self.whNum = dtl.order.whNum;

   self.isCartonEnabled = false;

   self.rowSelected = function () {
      if (self.grid.isOneRowSelected()) {
         var record = GridService.getSelectedRecord(self.grid);
         self.isCartonEnabled = record.cartonId ? true : false;
      } else {
         self.isCartonEnabled = false;
      }
   };

   self.viewCartons = function (e, args) {
      var record = GridService.getSelectedRecord(self.grid);
      $state.go('twlooi.detail.cartoncontents', {
         coNum: self.coNum,
         whNum: self.whNum,
         cartonId: record.cartonId,
         trackingId: record.trackingId
      });
   };

});

app.controller('TwlooiDetailSerialHistoryCtrl', function ($scope, $state, $stateParams, DataService) {
   //dtlsh
   var self = this;

   self.company = $stateParams.coNum;
   self.warehouse = $stateParams.whNum;
   self.order = $stateParams.order;
   self.orderSuffix = $stateParams.orderSuffix;
   self.line = $stateParams.line;
   self.lineSequence = $stateParams.lineSequence;
   self.absNum = $stateParams.absNum;
   self.orderandsuffix = self.order + "-" + self.orderSuffix;
   self.subTitle = self.warehouse;

   var params = {
      coNum: self.company,
      whNum: self.warehouse,
      order: self.order,
      orderSuffix: self.orderSuffix,
      line: self.line,
      lineSequence: self.lineSequence,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getserialhistory', { data: params, busy: true }, function (data) {
      self.dataset = data;
   });

   self.isSerialHistory = function () {
      return $state.is('twlooi.detail.cartoncontents.serialhistory') || $state.is('twlooi.detail.serialhistory');
   };

   self.returnToCartonContents = function () {
      if ($state.is('twlooi.detail.cartoncontents.serialhistory')) {
         $state.go('twlooi.detail.cartoncontents');
      } else {
         $state.go('twlooi.detail');
      }
   };

});

app.controller('TwlooiTransactionsCtrl', function ($scope, $state, $stateParams, DataService, CommonConverters, GridService) {
   //trans  - also known as Customer Dispute
   var self = this;
   self.isSerialEnabled = false;
   self.isCartonEnabled = false;
   var dtl = $scope.dtl;
   self.subTitle = dtl.order.whNum + ' | ' + dtl.order.order + '-' + CommonConverters.Suffix.convert(dtl.order.orderSuffix);
   var params = {
      coNum: dtl.order.coNum,
      whNum: dtl.order.whNum,
      order: dtl.order.order,
      orderSuffix: dtl.order.orderSuffix
   };
   DataService.post('api/twl/astwlinquiry/getordertransdetail', { data: params, busy: true }, function (data) {
      self.dataset = data;
   });

   self.rowSelected = function () {
      if (self.grid.isOneRowSelected()) {
         var record = GridService.getSelectedRecord(self.grid);
         self.isSerialEnabled = record.isSerials ? true : false;
         self.isCartonEnabled = record.isCartons ? true : false;
      } else {
         self.isSerialEnabled = false;
         self.isCartonEnabled = false;
      }
   };

   self.viewSerials = function (e, args) {
      var record = GridService.getSelectedRecord(self.grid);
      $state.go('twlooi.detail.serialhistory', {
         coNum: record.coNum,
         whNum: record.whNum,
         order: record.poNumber, // yes, this is the order
         orderSuffix: record.poSuffix, // yes, this is the order suffix
         line: record.poLine, // yes, this is the order line
         lineSequence: record.lineSequence,
         absNum: record.absNum
      });
   };

   self.viewCartons = function (e, args) {
      var record = GridService.getSelectedRecord(self.grid);
      $state.go('twlooi.detail.cartoncontents', {
         coNum: record.coNum,
         whNum: record.whNum,
         cartonId: record.cartonId,
         trackingId: record.trackingId
      });
   };

});

//This Controller is accessed when the user clicks on the Comments button.  The button is only visible
//if there are any Header related or Line related Notes or Comments stored for the order.
//Alias: dtlnc
app.controller('TwlooiDetailNotesCommentsCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   self.orderNumber = $stateParams.orderNumber;
   self.orderSuffix = $stateParams.orderSuffix;
   //The following properties are used by the Notes/Comments control
   self.id = $stateParams.keyId;
   if ($stateParams.line) {
      self.lineNumber = $stateParams.line;
      self.lineSequenceNumber = $stateParams.lineSequence;
   } else {
      self.lineNumber = 9999;
      self.lineSequenceNumber = null;
   }

   self.getSubTitle = function () {
      if (base.criteriaUsed.whNum && self.lineNumber) {
         return base.criteriaUsed.whNum + Constants.SUB_TITLE_SEPARATOR +
            self.orderNumber.trim() + base.DOCUMENT_DELIMITER + Utils.pad(self.orderSuffix, 2) + '|' + self.lineNumber + (self.lineSequenceNumber ? ('|' + self.lineSequenceNumber) : '');
      } else if (base.criteriaUsed.whNum) {
         return base.criteriaUsed.whNum + Constants.SUB_TITLE_SEPARATOR +
            self.orderNumber.trim() + base.DOCUMENT_DELIMITER + Utils.pad(self.orderSuffix, 2);
      } else {
         return '';
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('TwlooiDetailTransactionsCtrl', function ($scope, $state, $stateParams, CommonConverters, DataService) {
   //trans  - also known as Customer Dispute
   var self = this;
   var row = $stateParams.row;
   self.subTitle = row.whNum + ' | ' + row.order + '-' + CommonConverters.Suffix.convert(row.orderSuffix) +
    '|'  + row.line + (row.lineSequence ? ('-' + row.lineSequence) : '');
   var params = {
      coNum: row.coNum,
      whNum: row.whNum,
      order: row.order,
      orderSuffix: row.orderSuffix,
      line: row.line,
      sequence: row.lineSequence
   };
   DataService.post('api/twl/astwlinquiry/getordertransdetail', { data: params, busy: true }, function (data) {
      self.dataset = data;
   });

   self.returnToDetail = function () {
      $state.go('^');
   };

});

app.controller('TwlooiDetailPicksCtrl', function ($scope, $state, $stateParams, CommonConverters, DataService) {
   //trans  - also known as Customer Dispute
   var self = this;
   self.isSerialEnabled = false;
   self.isCartonEnabled = false;
   var row = $stateParams.row;
   self.subTitle = row.whNum + ' | ' + row.order + '-' + CommonConverters.Suffix.convert(row.orderSuffix) +
    '|' + row.line + (row.lineSequence ? ('-' + row.lineSequence) : '');
   var params = {
      coNum: row.coNum,
      whNum: row.whNum,
      order: row.order,
      orderSuffix: row.orderSuffix,
      line: row.line,
      sequence: row.lineSequence
   };
   DataService.get('api/twl/pick/listbycowhoslsstatus', { params: params, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
      }
   });

   self.returnToDetail = function () {
      $state.go('^');
   };

});

app.controller('TwlooiDetailAvailabilityCtrl', function ($scope, $state, $stateParams, CommonConverters, DataService, GridService, MessageService) {
   //dtlavail
   var self = this;
   self.qtyAdjustDescription = MessageService.get('message.previous.line.original.quantity.removed.from.available');
   var dtl = $scope.dtl;
   self.coNum = dtl.order.coNum;
   self.whNum = dtl.order.whNum;
   self.dataset = [];

   self.statusTypes = [
   { label: MessageService.get('global.dropped'), value: 'Dropped' },
   { label: MessageService.get('global.putaway.requested'), value: 'Putaway Requested' },
   { label: MessageService.get('global.full.fill'), value: 'Full Fill' },
   { label: MessageService.get('global.part.fill'), value: 'Part Fill' },
   { label: MessageService.get('global.zero.fill'), value: 'Zero Fill' },
   { label: MessageService.get('global.in.pick'), value: 'In Pick' },
   { label: MessageService.get('global.picked'), value: 'Picked' },
   { label: MessageService.get('global.packed'), value: 'Packed' },
   { label: MessageService.get('global.shipped'), value: 'Shipped' },
   { label: MessageService.get('global.in.process'), value: 'In process' }
   ];

   var params = {
      coNum: dtl.order.coNum,
      whNum: dtl.order.whNum,
      order: dtl.order.order,
      orderSuffix: dtl.order.orderSuffix,
      id: dtl.order.id,
      rowid: dtl.order.rowID
   };
   DataService.post('api/twl/astwlinquiry/getorderavailability', { data: params, busy: true }, function (data) {
      self.dataset = data.orderavail;
      self.summary = data.orderavailsummary;
   });
});

app.controller('TwlooiDetailPredictiveShippingCtrl', function ($scope) {
   //dtlpred
   var self = this;
   var dtl = $scope.dtl;
   self.order = dtl.order;

});

app.controller('TwlooiDetailWaveCtrl', function ($scope, $state, $stateParams, CommonConverters, DataService) {
   //dtlwave
   var self = this;
   var dtl = $scope.dtl;

   self.criteria = {
      coNum: dtl.order.coNum,
      whNum: dtl.order.whNum,
      batch: dtl.order.batch
   };

   DataService.post('api/twl/astwlinquiry/getorderinquirylist', { data: self.criteria, busy: true }, function (data) {
      self.dataset = data.orderinquirylist;
   });

});

app.controller('TwlooiDetailTransSummary', function ($scope, $state, $stateParams, CommonConverters, DataService) {
   //transum
   var self = this;
   self.summary = {};
   var dtl = $scope.dtl;
   var row = $stateParams.row;
   self.absNum = row.absNum;
   self.subTitle = dtl.order.whNum + ' | ' + dtl.order.order + '-' + CommonConverters.Suffix.convert(dtl.order.orderSuffix) +
    '|' + row.line + (row.lineSequence ? ('-' + row.lineSequence) : '');

   self.criteria = {
      coNum: dtl.order.coNum,
      whNum: dtl.order.whNum,
      id: dtl.order.id,
      order: dtl.order.order,
      orderSuffix: dtl.order.orderSuffix,
      line: row.line,
      lineSequence: row.lineSequence
   };

   DataService.post('api/twl/astwlinquiry/getorderlinetransinfo', { data: self.criteria, busy: true }, function (data) {
      self.summary = data;
   });

   self.returnToDetail = function () {
      $state.go('^');
   };

});
