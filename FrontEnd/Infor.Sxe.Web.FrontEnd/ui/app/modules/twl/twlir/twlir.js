'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlir', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlir');

   $stateProvider.state('twlir.detail', {
      url: '/detail',
      params: {
         coNum: null,
         whNum: null,
         rtNum: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlir/detail.json');
            },
            controller: 'TwlirDetailCtrl as dtl'
         }
      }
   });

   //This is a sub-view under Details so we can keep our state when returning from viewing the Notes/Comments.
   $stateProvider.state('twlir.detail.notes-comments', {
      url: '/notes-comments',
      params: {
         rtNum: null,
         rtId: null
      },
      views: {
         notesComments: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlir/notes-comments.json');
            },
            controller: 'TwlirNotesCommentsCtrl as nc'
         }
      }
   });

   //This is a sub-view under Details so we can keep our state when returning from viewing the Transactions.
   $stateProvider.state('twlir.detail.transactions', {
      url: '/transactions',
      params: {
         rtNum: null
      },
      views: {
         transactions: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlir/transactions.json');
            },
            controller: 'TwlirDetailTransactionsCtrl as dt'
         }
      }
   });

   //This is a sub-view under Details so we can keep our state when returning from viewing the Line Transactions.
   $stateProvider.state('twlir.detail.lineTransactions', {
      url: '/line-transactions',
      params: {
         criteria: null
      },
      views: {
         lineTransactions: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlir/line-transactions.json');
            },
            controller: 'TwlirDetailLineTransactionsCtrl as dlt'
         }
      }
   });

});

app.controller('TwlirBaseCtrl', function ($state, ConfigService, DataService, MessageService, SecurityService, UserService, Utils) {
   var self = this;
   self.DOCUMENT_DELIMITER = '-';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.SEARCHTYPE_PURCHASEORDER = 'PO';
   self.SEARCHTYPE_RECEIPTTRANSACTION_NUMBER = 'RT';
   self.SEARCHTYPE_REPORT_INQUIRY = 'RI';
   self.SEARCHTYPE_MORE_INFO = 'MI';

   self.criteria = { rowStatus: '', type: ''};
   self.isSearch_PO = true;
   self.isSearch_RT = false;
   self.isSearch_RI = false;
   self.isSearch_MI = false;
   self.searchType = self.SEARCHTYPE_PURCHASEORDER;

   self.osdReportSecurity = SecurityService.getSecurityLevel('twlrin-rptosd');

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;

   self.dateFromLabel = MessageService.get('global.from.delivery.date');
   self.dateToLabel = MessageService.get('global.to.delivery.date');

   self.criteriaUsed = {};

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') +
         self.LABEL_DELIMITER +
         (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlir.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlir.master');
   };

   self.isDetail = function () {
      return $state.is('twlir.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlir.detail');
   };

   //Various Search fields are visible based on the search type.  Even the grids on the
   //Master view are visible based on the type since the data is accessed from different
   //sources.
   self.setFieldVisibility = function () {
      self.dateFromLabel = MessageService.get('global.from.delivery.date');
      self.dateToLabel = MessageService.get('global.to.delivery.date');
      if (self.searchType === self.SEARCHTYPE_PURCHASEORDER) {
         self.isSearch_PO = true;
         self.isSearch_RT = false;
         self.isSearch_RI = false;
         self.isSearch_MI = false;
      } else if (self.searchType === self.SEARCHTYPE_RECEIPTTRANSACTION_NUMBER) {
         self.isSearch_PO = false;
         self.isSearch_RT = true;
         self.isSearch_RI = false;
         self.isSearch_MI = false;
      } else if (self.searchType === self.SEARCHTYPE_REPORT_INQUIRY) {
         self.isSearch_PO = false;
         self.isSearch_RT = false;
         self.isSearch_RI = true;
         self.isSearch_MI = false;
         self.criteria.rowStatus = 'A';
         self.dateFromLabel = MessageService.get('global.from.date');
         self.dateToLabel = MessageService.get('global.to.date');
         self.criteria.deliveryFrom = Utils.addSubtractDaysToDate(self.criteria.deliveryTo, -90);
      } else if (self.searchType === self.SEARCHTYPE_MORE_INFO) {
         self.isSearch_PO = false;
         self.isSearch_RT = false;
         self.isSearch_RI = false;
         self.isSearch_MI = true;
      }
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.rowStatus = '';
      self.criteria.type = '';
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.deliveryTo = Utils.getCurrentDate();
      self.criteria.deliveryFrom = Utils.addSubtractDaysToDate(self.criteria.deliveryTo, -6);
      self.setFieldVisibility();
   };

   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);

      if (self.searchType === self.SEARCHTYPE_PURCHASEORDER) {
         var poParts = [];
         var searchPoNumber = '';
         var searchPoSuffix = '';
         if (self.criteria.poNumber) {
            poParts = self.criteria.poNumber.split(self.DOCUMENT_DELIMITER);
            if (poParts.length === 2) {
               searchPoNumber = poParts[0];
               searchPoSuffix = poParts[1];
            } else {
               searchPoNumber = self.criteria.poNumber;
            }
         }

         var detailCriteria = {
            coNum: self.criteriaUsed.coNum,
            whNum: self.criteriaUsed.whNum,
            poNumber: searchPoNumber,
            poSuffix: searchPoSuffix,
            vendorId: self.criteria.vendorId,
            absNum: self.criteria.absNum,
            vendItem: self.criteria.vendItem,
            rowStatus: self.criteria.rowStatus
         };

         DataService.post('api/twl/astwladmin/getreceipttransactiondetail', { data: detailCriteria, busy: true }, function (data) {
            self.detailDataSet = data;
            self.masterDataSet = [];
         });
      } else {
         //Search By: "Receipt Transaction Number" or "More Information"
         var masterCriteria = {
            displayType: self.searchType,
            coNum: self.criteriaUsed.coNum,
            whNum: self.criteriaUsed.whNum,
            rtNum: self.criteria.rtNum,
            rowStatus: self.criteria.rowStatus,
            type: self.criteria.type,
            carrier: self.criteria.carrier,
            cargoControl: self.criteria.cargoControl,
            deliveryFrom: self.criteria.deliveryFrom,
            deliveryTo: self.criteria.deliveryTo
         };

         DataService.post('api/twl/astwladmin/getreceipttransactionmaster', { data: masterCriteria, busy: true }, function (data) {
            self.detailDataSet = [];
            self.masterDataSet = data;
         });
      }
   };

   self.deleteReceiptTransaction = function (callback, coNum, whNum, rtNum) {
      MessageService.yesNo('global.question', 'question.confirm.delete',
      // Yes processing
      function () {
         var criteria = {
            coNum: coNum,
            whNum: whNum,
            rtNum: rtNum
         };
         DataService.post('api/twl/astwladmin/deletereceipttransaction', { data: criteria, busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            self.search();

            //If called from within the Detail screen, take the user back to main search page after delete.
            if (callback) {
               callback();
            }
         });
      });
   };

   self.createPackingList = function (coNum, whNum) {
      $state.go('twlip.create', { pk: coNum, pk2: whNum });
   };

   self.viewPackingList = function (coNum, whNum, rtNum) {
      $state.go('twlip.detail', { pk: coNum, pk2: whNum, pk3: rtNum });
   };

   self.initCriteria();
});

//Alias: srch
app.controller('TwlirSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.changeSearchType = function () {
      base.setFieldVisibility();
   };

   self.clear = function () {
      Utils.clearObject(criteria);
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('twlir.master');
      }
      base.search();
   };
});

//Alias: mst
app.controller('TwlirMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.launchCreatePackingList = function () {
      base.createPackingList(base.criteriaUsed.coNum, base.criteriaUsed.whNum);
   };

   self.viewPackingListFromDetail = function () {
      var selectedRow = GridService.getSelectedRecord(base.detailGrid);
      if (selectedRow) {
         base.viewPackingList(selectedRow.coNum, selectedRow.whNum, selectedRow.rtNumMst);
      }
   };

   self.viewPackingListFromMaster = function () {
      var selectedRow = GridService.getSelectedRecord(base.masterGrid);
      if (selectedRow) {
         base.viewPackingList(selectedRow.coNum, selectedRow.whNum, selectedRow.rtNum);
      }
   };

   self.runOverShortDamaged = function () {
      var date = new Date(base.criteria.deliveryTo);
      var toDate = Utils.pad(date.getMonth() + 1, 2, '0') + '-' + Utils.pad(date.getDate(), 2, '0') + '-' + Utils.pad(date.getFullYear().toString().substr(2), 2, '0');
      date = new Date(base.criteria.deliveryFrom);
      var fromDate = Utils.pad(date.getMonth() + 1, 2, '0') + '-' + Utils.pad(date.getDate(), 2, '0') + '-' + Utils.pad(date.getFullYear().toString().substr(2), 2, '0');
      var records = GridService.getSelectedRecords(base.masterGrid);
      records.forEach(function (record) {
         var requestCriteria = {
            ttblsimpleprintcriteria: {
               report: 'twlrin-rptosd',
               printerId: base.criteria.printerId,
               optvalue: [base.criteria.whNum, record.rtNum, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
               rangebeg: [fromDate, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
               rangeend: [toDate, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
            }
         };
         DataService.post('/web/api/shared/simpleprint', { data: requestCriteria, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.your.print.request.has.been.sent');
               // Clear the selections
               base.masterGrid.unSelectAllRows();
            }
         });
      }); 
   };

   self.selectRTProcessing = function () {
      base.focusAtEnteredRT = false;
      var foundMatch = false;
      if (self.enteredRT) {
         var matchFound = false;
         base.masterGrid.settings.dataset.forEach(function (record) {
            // See if exists in the list already
            var isMatch = record.rtNum.trim().toLowerCase().startsWith(self.enteredRT.trim().toLowerCase());
            if (isMatch) {
               matchFound = true;
               base.masterGrid.selectRow(base.masterGrid.settings.dataset.indexOf(record));
               foundMatch = true;
            } 
         });
         if (foundMatch) {
            self.enteredRT = '';
         } else {
            MessageService.alert('global.alert', 'message.match.not.found');
         }
      }
   };

   //NOTE: By design, not providing the 'Delete' button from the "Detail" grid because
   //there's no way for the user to delete a Receipt Transaction if it contains PO's.
   //The Delete grid shows RT's with PO's.

   self.deleteFromMaster = function () {
      var selectedRow = GridService.getSelectedRecord(base.masterGrid);
      if (selectedRow) {
         //No callback, keep the user here after delete.
         base.deleteReceiptTransaction(null, selectedRow.coNum, selectedRow.whNum, selectedRow.rtNum);
      }
   };

   self.drillDown = function (coNum, whNum, rtNum) {
      $state.go('^.detail', { coNum: coNum, whNum: whNum, rtNum: rtNum });
   };

   self.drillDownFromDetail = function (e, args) {
      var detailResult = args[0].item;
      if (detailResult) {
         self.drillDown(detailResult.coNum, detailResult.whNum, detailResult.rtNumMst);
      }
   };

   self.drillDownFromMaster = function (e, args) {
      var masterResult = args[0].item;
      if (masterResult) {
         self.drillDown(masterResult.coNum, masterResult.whNum, masterResult.rtNum);
      }
   };
});

//This Controller is accessed when the user drills down from the Master view.  It takes in key fields
//of the 'rtmst' row regardless if it's called from a Detail or a Master result from the Master View.
//Alias: dtl
app.controller('TwlirDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.coNum = $stateParams.coNum;
   self.whNum = $stateParams.whNum;
   self.rtNum = $stateParams.rtNum;
   self.rtmst = {};
   self.rtdet = [];

   self.isDetail = function () {
      return $state.is('twlir.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlir.detail');
   };

   self.getSubTitle = function () {
      if (self.rtmst && self.rtmst.rtNum) {
         return MessageService.get('global.warehouse') +
            base.LABEL_DELIMITER +
            (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown'));
      } else {
         return '';
      }
   };

   self.initialize = function () {
      var criteria = {
         coNum: self.coNum,
         whNum: self.whNum,
         rtNum: self.rtNum
      };
      DataService.post('api/twl/astwladmin/getreceipttransactioncontents', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.rtmst = data.receipttranscontmst;
            self.rtdet = data.receipttranscontdet;
         }
      });
   };

   self.viewComments = function () {
      if (self.rtmst && self.rtmst.rtId) {
         $state.go('.notes-comments', { rtNum: self.rtmst.rtNum, rtId: self.rtmst.rtId });
      }
   };

   self.viewPackingList = function () {
      if (self.rtmst) {
         base.viewPackingList(self.rtmst.coNum, self.rtmst.whNum, self.rtmst.rtNum);
      }
   };

   self.viewTransactions = function () {
      if (self.rtmst) {
         $state.go('.transactions', { rtNum: self.rtmst.rtNum });
      }
   };

   self.viewLineTransactions = function (e, args) {
      var rtdetRow = args[0].item;
      if (rtdetRow) {
         var lineTransactionsCriteria = {
            rtNum: self.rtNum,
            poNumber: rtdetRow.poNumber,
            poSuffix: rtdetRow.poSuffix,
            poLine: rtdetRow.poLine,
            lineSequence: rtdetRow.lineSequence,
            absNum: rtdetRow.absNum
         };
         $state.go('.lineTransactions', { criteria: lineTransactionsCriteria });
      }
   };

   self.deleteReceiptTransactionContinue = function () {
      $state.go('^.master');
   };

   self.deleteReceiptTransaction = function () {
      if (self.rtmst) {
         //Call the delete.  Once it's finished, then continue and take user back to main grid, refreshed.
         base.deleteReceiptTransaction(self.deleteReceiptTransactionContinue, self.rtmst.coNum, self.rtmst.whNum, self.rtmst.rtNum);
      }
   };

   self.initialize();
});

//This Controller is accessed when the user clicks on the Comments button.
//Alias: nc
app.controller('TwlirNotesCommentsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.rtNum = $stateParams.rtNum;
   self.rtId = $stateParams.rtId;
   self.maximumLineNumber = 9999;
   self.noLineNumber = null;

   self.getSubTitle = function () {
      if (self.rtNum) {
         return MessageService.get('global.warehouse') +
                  base.LABEL_DELIMITER +
                  (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) +
                  base.SUBMENU_DELIMITER +
                MessageService.get('global.receipt.transaction.number') + base.LABEL_DELIMITER + self.rtNum;
      } else {
         return '';
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

//This Controller is accessed when the user clicks on the Receipt Transaction Number hyperlink in the header.
//It shows the Transactions for the Receipt Transaction.  The User can change the search results based on a
//dropdown with various options.
//Alias: dt
app.controller('TwlirDetailTransactionsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.rtNum = $stateParams.rtNum;
   self.searchType = 1;  //All
   self.dataset = [];

   self.getSubTitle = function () {
      if (self.rtNum) {
         return MessageService.get('global.warehouse') +
                  base.LABEL_DELIMITER +
                  (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) +
                  base.SUBMENU_DELIMITER +
                MessageService.get('global.receipt.transaction.number') + base.LABEL_DELIMITER + self.rtNum;
      } else {
         return '';
      }
   };

   self.search = function () {
      var criteria = {
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         rtNum: self.rtNum,
         searchType: self.searchType
      };

      DataService.post('api/twl/astwladmin/getreceipttransactionslist', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   self.searchTypeChanged = function () {
      self.search();
   };

   self.back = function () {
      $state.go('^');
   };

   self.search();
});

//This Controller is accessed when the user clicks on the hyperlink in a specific row in the PO's List in the grid.
//It shows the Line Transactions for the Receipt Transaction.  These are specific PO Lines.
//Alias: dlt
app.controller('TwlirDetailLineTransactionsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.rtNum = $stateParams.criteria.rtNum;
   self.poNumber = $stateParams.criteria.poNumber;
   self.poSuffix = $stateParams.criteria.poSuffix;
   self.poLine = $stateParams.criteria.poLine;
   self.lineSequence = $stateParams.criteria.lineSequence;
   self.absNum = $stateParams.criteria.absNum;
   self.dataset = [];
   self.purchaseOrderNumberSuffix = self.poNumber + base.DOCUMENT_DELIMITER + self.poSuffix;

   self.getSubTitle = function () {
      if (self.rtNum) {
         return MessageService.get('global.warehouse') +
                  base.LABEL_DELIMITER +
                  (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) +
                  base.SUBMENU_DELIMITER +
                MessageService.get('global.receipt.transaction.number') + base.LABEL_DELIMITER + self.rtNum;
      } else {
         return '';
      }
   };

   self.search = function () {
      var criteria = {
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         rtNum: self.rtNum,
         poNumber: self.poNumber,
         poSuffix: self.poSuffix,
         poLine: self.poLine,
         lineSequence: self.lineSequence,
         absNum: self.absNum
      };

      DataService.post('api/twl/astwladmin/getreceiptlinestransactionslist', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };

   self.search();
});