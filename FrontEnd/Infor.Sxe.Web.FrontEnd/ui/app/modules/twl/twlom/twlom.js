'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlom', {
      widgets: ['SEARCH'],
      params: {
         pk: '',
         pk2: ''
      }
   });
   StateProvider.addMasterState('twl', 'twlom');

   $stateProvider.state('twlom.master.review-drop', {
      url: '/review-drop',
      params: {
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/review-drop.json');
            },
            controller: 'TwlomReviewDropCtrl as dtlr'
         }
      }
   });

   $stateProvider.state('twlom.master.select-twl-printer', {
      url: '/select-twl-printer',
      params: {
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/select-twl-printer.json');
            },
            controller: 'TwlomSelectTwlPrinter as dtlp'
         }
      }
   });


   $stateProvider.state('twlom.master.select-carrier-service', {
      url: '/select-carrier-service',
      params: {
         selectedOrders: []
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/select-carrier-service.json');
            },
            controller: 'TwlomSelectCarrierService as dtlcsv'
         }
      }
   });

   $stateProvider.state('twlom.master.select-undrop-handling', {
      url: '/select-undrop-handling',
      params: {
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/select-undrop-handling.json');
            },
            controller: 'TwlomSelectUndropHandling as dtluh'
         }
      }
   });

   $stateProvider.state('twlom.master.verify-undrop-cartons', {
      url: '/verify-undrop-cartons',
      params: {
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/verify-undrop-cartons.json');
            },
            controller: 'TwlomVerifyUndropCartons as dtluc'
         }
      }
   });

   $stateProvider.state('twlom.master.assign-unavailable', {
      url: '/assign-unavailable',
      params: {
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/assign-unavailable.json');
            },
            controller: 'TwlomAssignUnavailableCtrl as dtlu'
         }
      }
   });

   $stateProvider.state('twlom.master.assign-unavailable.picks', {
      url: '/picks',
      params: {
         subTitle: '',
         returnLine: {}
      },
      views: {
         viewContainerAssignUnavailable: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/assign-unavailable-picks.json');
            },
            controller: 'TwlomAssignUnavailablePicksCtrl as dtlup'
         }
      }
   });

   $stateProvider.state('twlom.master.assign-unavailable.picks.select-inventory', {
      url: '/select-inventory',
      params: {
         returnLine: {}
      },
      views: {
         viewContainerAssignUnavailablePicks: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/assign-unavailable-select-inventory.json');
            },
            controller: 'TwlomAssignUnavailableSelectInventoryCtrl as dtlusi'
         }
      }
   });

   $stateProvider.state('twlom.master.master-exceptions', {
      url: '/exceptions',
      params: {
         whNum: ''
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/master-exceptions.json');
            },
            controller: 'TwlomMasterExceptionsCtrl as mste'
         }
      }
   });

   $stateProvider.state('twlom.master.exception-lines', {
      url: '/exception-lines',
      params: {
         record: {}
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/exception-lines.json');
            },
            controller: 'TwlomExceptionLinesCtrl as dtle'
         }
      }
   });

   $stateProvider.state('twlom.master.waveemployees', {
      url: '/wave-employees',
      params: {
         criteria: {},
         function: 'twlom'
      },
      views: {
         viewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/shared/waveemployees/waveemployees.json');
            },
            controller: 'TwlWaveEmployeesCtrl as dtlwemp'
         }
      }
   });

   //This is a sub-view under Master so we can keep our state when returning from viewing the Notes/Comments.
   $stateProvider.state('twlom.master.notes-comments', {
      url: '/notes-comments',
      params: {
         orderNumber: null,
         orderSuffix: null,
         keyId: null
      },
      views: {
         notesComments: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlom/notes-comments.json');
            },
            controller: 'TwlomMasterNotesCommentsCtrl as mstnc'
         }
      }
   });

});

app.controller('TwlomBaseCtrl', function ($state, ConfigService, DataService, GridService, MessageService, UserService) {
   var self = this;
   self.DOCUMENT_DELIMITER = '-';
   self.dropButtonVisible = false;
   self.unDropButtonVisible = false;
   self.selectedTwlPrinterId = '';
   self.selectedCarrier = '';
   self.selectedShipvia = '';
   self.dropStatus = 'all';
   self.dropSummaryTitle = MessageService.get('global.drop.summary');
   self.dropSummaryType = 'drop';
   self.inExceptionsMaster = false;
   self.dataset = [];
   self.omorderdropsummary = [];

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};
   self.criteriaUsed.searchType = 'standard';

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.twlomInDisplay = true;
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      if (self.criteria.whNum) {
         self.changeSearchWarehouse();
      }
      self.criteria.problemType = 'ALL';
      self.criteria.recordType = 1;
      self.criteria.exceptionType = 'Ship Complete Hold';
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.viewtype = 'undropped';
      self.changeViewType();
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      if (self.hyperLinkWhNum && self.hyperLinkBatch) {
         self.criteria.whNum = self.hyperLinkWhNum;
         self.criteria.batch = self.hyperLinkBatch;
         self.hyperLinkAbsNum = '';
         self.isHyperLinkSearch = true;
      }
   };

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteriaUsed.coNum = self.userCoNum;
   self.userId = UserService.getTwlUserId();
   self.datasummary = {};

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.getMainGridLabel = function () {
      var label = MessageService.get('global.orders');
      if (self.criteriaUsed && self.criteriaUsed.searchType === 'standard') {
         label += ' - ' + MessageService.get('global.search');
      } else if (self.criteriaUsed && self.criteriaUsed.searchType === 'advanced') {
         label += ' - ' + MessageService.get('global.advanced.search');
      } else if (self.criteriaUsed && self.criteriaUsed.searchType === 'emergency') {
         label += ' - ' + MessageService.get('global.emergency');
      }
      return label;
   };

   self.viewTypes = [
      { label: MessageService.get('global.undropped'), value: 'undropped' },
      { label: MessageService.get('global.dropped.and.open.status'), value: 'droppedopen' },
      { label: MessageService.get('global.dropped'), value: 'dropped' },
      { label: MessageService.get('global.all'), value: 'all' }
   ];

   self.dropStatusTypes = [
         { label: MessageService.get('global.all'), value: 'all' },
         { label: MessageService.get('global.successful'), value: 'dropped' },
         { label: MessageService.get('global.not.successful'), value: 'notdropped' }
   ];

   self.changeViewType = function () {
      switch (self.criteria.viewtype) {
         case 'undropped':
            self.criteria.orderStatusList = '';
            self.criteria.isAssigned = false;
            self.criteria.isUnassigned = true;
            break;
         case 'dropped':
            self.criteria.orderStatusList = '';
            self.criteria.isAssigned = true;
            self.criteria.isUnassigned = false;
            break;
         case 'droppedopen':
            self.criteria.orderStatusList = 'O';
            self.criteria.isAssigned = true;
            self.criteria.isUnassigned = false;
            break;
         default:
            self.criteria.orderStatusList = '';
            self.criteria.isAssigned = true;
            self.criteria.isUnassigned = true;
      }
   };

   self.isMaster = function () {
      return $state.is('twlom.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlom.master');
   };

   self.isExceptionMaster = function () {
      return $state.is('twlom.master.master-exceptions');
   };

   self.isExceptionLines = function () {
      return $state.is('twlom.master.exception-lines');
   };

   self.isAssignWaveEmployees = function () {
      return $state.is('twlom.master.waveemployees');
   };

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.id) {
         $state.go('twlooi.detail', { pk: currentRow.id });
      } else if (currentRow && currentRow.order) {
         $state.go('twlooi.detail', { pk3: self.criteriaUsed.coNum, pk4: self.criteriaUsed.whNum, pk: currentRow.order, pk2: currentRow.orderSuffix });
      }
   };

   self.changeSearchWarehouse = function () {
      var promptForEmergency = (!self.lastUserEnteredWhNum) || (self.lastUserEnteredWhNum.toLowerCase() !== self.criteria.whNum.toLowerCase());
      self.lastUserEnteredWhNum = self.criteria.whNum;
      self.getWarehouseInfo(self.criteria.coNum, self.criteria.whNum, self.userId, promptForEmergency);
      DataService.post('api/twl/carrier/gettwlcarriers', { data: { coNum: self.criteria.coNum, whNum: self.criteria.whNum }, busy: true }, function (data) {
         if (data) {
            self.carrierOptions = data;
         }
      });
   };

   self.getWarehouseInfo = function (coNum, whNum, userId, promptForEmergency) {
      self.dataset = [];
      self.datasetSummary = {};
      self.criteriaUsed.coNum = coNum;
      self.criteriaUsed.whNum = whNum;
      // Get settings needed throughout the order manager function
      DataService.post('api/twl/astwladmin/getominfo', { data: { coNum: coNum, whNum: whNum, userId: userId }, busy: true }, function (data) {
         self.ominfo = data;
         if (!self.ominfo.paramAutoDropType || self.ominfo.paramAutoDropType === 0) {
            MessageService.error('global.error', MessageService.get('error.the.inventory.discrepancy.handling.parameter.needs.set.up'));
         }
         if (promptForEmergency && self.ominfo.isEmergencyAnywhere) {
            MessageService.yesNo('global.confirmation', 'question.emergency.orders.view.now', function yes() {
               self.searchForEmergencies();
            }, function no() {
            });
         }
      });
   };

   self.setCarrier = function () {
      self.criteria.carrierList = self.criteria.carrierArray ? self.criteria.carrierArray.toString() : '';
   };

   self.searchForEmergencies = function () {
      var criteria = {
         coNum: self.criteriaUsed.coNum,
         whNum: self.criteriaUsed.whNum,
         isAssigned: false,
         isUnassigned: true,
         includeOnHold: true,
         onlyBlankCarriers: false,
         orderTypeList: 'E',
         searchType: 'emergency',
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };
      self.criteriaUsed = angular.copy(criteria);
      DataService.post('api/twl/astwlinquiry/getomorderlist', { data: self.criteriaUsed, busy: true }, function (data) {
         self.dataset = data.omorderlist;
         self.datasummary = data.omordersummary;
      });
   };

   self.goToExceptions = function () {
      self.criteria.exceptionType = self.ominfo.firstExceptionType;
      self.criteria.prevWhNum = self.criteria.whNum;
      self.criteria.whNum = self.ominfo ? self.ominfo.whNum : self.userWhNum;
      self.inExceptionsMaster = true;
      self.datasetBefore = angular.copy(self.dataset);
      self.dataset = [];
      $state.go('twlom.master.master-exceptions', { refreshSearch: true });
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);
      self.criteriaUsed.searchType = 'standard';

      self.searchGetData(self.criteria);

   };

   // Perform search and update data set for the grid
   self.searchExceptions = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);
      self.criteriaUsed.searchType = 'standard';

      self.searchExceptionsGetData(self.criteria);

   };

   self.searchGetData = function (searchCriteria) {
      if (searchCriteria && searchCriteria.whNum && !self.inExceptionsMaster) {
         if (self.hyperLinkBatch) {
            searchCriteria.batch = self.hyperLinkBatch;
            self.hyperLinkBatch = '';
         }
         var promptForEmergency = (!self.lastUserEnteredWhNum) || (self.lastUserEnteredWhNum.toLowerCase() !== searchCriteria.whNum.toLowerCase());
         self.lastUserEnteredWhNum = searchCriteria.whNum;
         self.getWarehouseInfo(searchCriteria.coNum, searchCriteria.whNum, self.userId, promptForEmergency);
         DataService.post('api/twl/astwlinquiry/getomorderlist', { data: searchCriteria, busy: true }, function (data) {
            self.dataset = data.omorderlist;
            self.datasummary = data.omordersummary;
         });
      } else {
         self.dataset = [];
         self.datasummary = {};
      }
   };

   self.searchExceptionsGetData = function (searchCriteria) {
      if (searchCriteria && searchCriteria.whNum) {
         var promptForEmergency = false;  // We cannot display emergency orders on the exception screen
         self.lastUserEnteredWhNum = searchCriteria.whNum;
         self.getWarehouseInfo(searchCriteria.coNum, searchCriteria.whNum, self.userId, promptForEmergency);
         DataService.post('api/twl/astwlinquiry/getomorderexceptionlist', { data: searchCriteria, busy: true }, function (data) {
            self.dataset = data.omorderexceptionlist;
            self.dataset.forEach(function (exception) {
               exception.paramTwentyOverride = 0; // default
            });
            self.grid.renderRows();
         });
      }
      else {
         self.dataset = [];
         self.datasummary = {};
      }
   };

   self.dropPrinterSelection = function () {
      if (self.ominfo.paramPrintPickTickets) {
         $state.go('twlom.master.select-twl-printer');
      }
      else {
         self.drop();
      }
   };

   self.drop = function () {
      var omOrderDropCriteria = {
         coNum: self.criteriaUsed.coNum,
         whNum: self.criteriaUsed.whNum,
         autoAllocRvs: false
      };
      if (self.inExceptionsMaster) {
         self.attemptToDropTheseOrders = GridService.getSelectedRecords(self.gridExp);
      } else {
         self.attemptToDropTheseOrders = GridService.getSelectedRecords(self.grid);
      }
      self.omorderdropsummary = [];
      self.omorderdropwaves = [];
      self.omorderdropnotattempted = [];
      DataService.post('api/twl/astwladmin/omdropprep', { data: { omorderdropcriteria: omOrderDropCriteria, omorderkey: self.attemptToDropTheseOrders }, busy: true }, function (data) {
         self.omorderdropnotattempted = data.omorderdroperrors;
         self.omorderdroplist = data.omorderdroplist;
         self.omorderdroprvlines = data.omorderdroprvlines;
         if (data.omorderkey) {
            self.attemptToDropTheseOrders = data.omorderkey;
         }
         if (self.omorderdroprvlines.length) {
            self.assignRV();
         }
         else if (self.omorderdroplist.length) {
            self.dropOrders();
         } else {
            self.dropReview();
         }
      });
   };

   self.assignRV = function () {
      $state.go('twlom.master.assign-unavailable');
   };

   self.dropOrders = function () {
      self.ominfo.twlPrinterId = self.selectedTwlPrinterId;
      DataService.post('api/twl/astwladmin/omdrop', { data: { omorderdroplist: self.omorderdroplist, ominfo: self.ominfo }, busy: true }, function (data) {
         self.omorderdropsummary = data.omorderdropsummary;
         self.omorderdropsummaryDisplay = data.omorderdropsummary;
         self.omorderdropwaves = data.omorderdropwaves;
         self.dropReview();
      });
   };

   self.dropReview = function () {
      self.dropSummaryTitle = MessageService.get('global.drop.summary');
      self.dropSummaryType = 'drop';
      //finish the drop before reviewing data (you don't do much in the review data process other than look at quantities and errors)
      DataService.post('api/twl/astwladmin/omdropfinish', { data: self.attemptToDropTheseOrders, busy: true }, function () {
         $state.go('twlom.master.review-drop');
      });
   };

   self.unDrop = function () {
      self.omorderundropcriteria = {
         coNum: self.criteriaUsed.coNum,
         whNum: self.criteriaUsed.whNum,
         holdUndropType: 2
      };
      if (self.holdAssignedCount > 0) {
         self.unDropAskHoldHandling();
      } else {
         self.unDropPrep();
      }
   };

   self.unDropAskHoldHandling = function () {
      $state.go('twlom.master.select-undrop-handling');
   };

   self.unDropPrep = function () {
      if (self.inExceptionsMaster) {
         self.attemptToUnDropTheseOrders = GridService.getSelectedRecords(self.gridExp);
      } else {
         self.attemptToUnDropTheseOrders = GridService.getSelectedRecords(self.grid);
      }
      self.omorderdropsummary = [];
      self.omorderdropwaves = [];
      self.omorderdropnotattempted = [];
      DataService.post('api/twl/astwladmin/omundropprep', { data: { omorderkey: self.attemptToUnDropTheseOrders, omorderundropcriteria: self.omorderundropcriteria }, busy: true }, function (data) {
         self.omorderdropnotattempted = data.omorderdroperrors;
         self.omorderdroplist = data.omorderdroplist;
         self.omorderkey = data.omorderkey;
         self.omorderundropcartoninfo = data.omorderundropcartoninfo;
         if (self.omorderundropcartoninfo.length > 0) {
            $state.go('twlom.master.verify-undrop-cartons');
         }
         else if (self.omorderdroplist.length > 0) {
            self.unDropOrders();
         }
         else {
            self.unDropReview();
         }
      });
   };

   self.unDropOrders = function () {
      DataService.post('api/twl/astwladmin/omundrop', { data: { omorderdroplist: self.omorderdroplist, ominfo: self.ominfo, omorderundropcriteria: self.omorderundropcriteria }, busy: true }, function (data) {
         self.omorderdropsummary = data.omorderdropsummary;
         self.omorderdropsummaryDisplay = data.omorderdropsummary;
         self.omorderdropwaves = data.omorderdropwaves;
         self.unDropReview();
      });
   };

   self.unDropReview = function () {
      self.dropSummaryTitle = MessageService.get('global.undrop.summary');
      self.dropSummaryType = 'undrop';
      $state.go('twlom.master.review-drop');
   };

   self.zeroShip = function () {
      MessageService.noYes('global.question', 'question.are.you.sure.you.wish.to.cancel.these.orders', null,
         // Yes processing
         function () {
            self.dropSummaryTitle = MessageService.get('global.zero.ship.summary');
            self.dropSummaryType = 'zeroship';
            self.omorderzeroshipcriteria = {
               coNum: self.criteriaUsed.coNum,
               whNum: self.criteriaUsed.whNum
            };
            if (self.inExceptionsMaster) {
               self.omorderkey = GridService.getSelectedRecords(self.gridExp);
            } else {
               self.omorderkey = GridService.getSelectedRecords(self.grid);
            }
            DataService.post('api/twl/astwladmin/omzeroship', { data: { omorderkey: self.omorderkey, omorderzeroshipcriteria: self.omorderzeroshipcriteria }, busy: true }, function (data) {
               self.omorderdropsummary = data.omorderdropsummary;
               self.omorderdropsummaryDisplay = data.omorderdropsummary;
               self.omorderdropwaves = [];
               self.omorderdropnotattempted = data.omorderdroperrors;
               $state.go('twlom.master.review-drop');
            });
         });
   };

   self.checkHyperlinkSearch = function () {
      if (self.isHyperLinkSearch) {
         self.isHyperLinkSearch = false;
         self.inExceptionsMaster = false;
         self.search();
      }
   };

});

app.controller('TwlomSearchCtrl', function ($scope, $state, ConfigService, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Initialize the search criteria object
   self.initCriteria = function () {
      base.initCriteria();
   };

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
         $state.go('twlom.master');
      }

      base.search();
   };

   self.submitExceptions = function () {
      if (!base.isExceptionMaster()) {
         $state.go('twlom.master.master-exceptions');
      }

      base.searchExceptions();
   };

   // Perform initialization of search criteria
   self.initCriteria();
   base.checkHyperlinkSearch();
});

app.controller('TwlomMasterCtrl', function ($filter, $scope, $state, $stateParams, ConfigService, DataService, GridService, MessageService) {
   var self = this;
   self.showSelectedTotals = false;
   var base = $scope.base;
   var isOrderStatusOpenPickedPacked = ['O', 'C', 'P'];

   self.exceptionHandlingTypes = [
      { label: MessageService.get('global.default.parameter.20'), value: 0 },
      { label: MessageService.get('global.adjust.quantity'), value: 1 },
      { label: MessageService.get('global.skip.line'), value: 2 },
      { label: MessageService.get('global.skip.order'), value: 3 }
   ];

   if ($stateParams.pk && $stateParams.pk2) {
      base.hyperLinkWhNum = $stateParams.pk;
      base.hyperLinkBatch = $stateParams.pk2;
      // perform the search if the screen is already in the user's display, otherwise the search code still has to run and will do this
      if (base.twlomInDisplay) {
         base.initCriteria();
      }
   }

   self.initializeGridSetup = function () {
      // These are the selected counts that are maintained
      self.openCount = 0;
      self.shipCount = 0;
      self.inUseCount = 0;
      self.openUnassignedCount = 0;
      self.openAssignedCount = 0;
      self.holdAssignedCount = 0;
      self.notOpenCount = 0;
      self.dropButtonEnabled = false;
      self.unDropButtonEnabled = false;
   };

   // Advanced search criteria object with initial values
   self.advCriteria = {
      coNum: base.userCoNum,
      whNum: base.userWhNum,
      isAssigned: true,
      isUnassigned: true,
      includeOnHold: false,
      onlyBlankCarriers: false,
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'assigned', label: MessageService.get('global.assigned') },
      { value: 'branchid', label: MessageService.get('global.branch.id') },
      { value: 'carrier', label: MessageService.get('global.carrier') },
      { value: 'customer', label: MessageService.get('global.customer') },
      { value: 'expshipdate', label: MessageService.get('global.expected.ship.date') },
      { value: 'orderclass', label: MessageService.get('global.order.class') },
      { value: 'orderno', label: MessageService.get('global.order.number') },
      { value: 'orderstatus', label: MessageService.get('global.order.status') },
      { value: 'ordertype', label: MessageService.get('global.order.type') },
      { value: 'priority', label: MessageService.get('global.priority') },
      { value: 'route', label: MessageService.get('global.route') },
      { value: 'shipto', label: MessageService.get('global.ship.to') },
      { value: 'singles', label: MessageService.get('global.single.line.orders') },
      { value: 'warehouse', label: MessageService.get('global.warehouse') },
      { value: 'wave', label: MessageService.get('global.wave') },
      { value: 'whzone', label: MessageService.get('global.warehouse.zone') },
      { value: 'wodept', label: MessageService.get('global.work.order.department') },
      { value: 'recordlimit', label: MessageService.get('global.record.limit') }
   ];

   self.changeStatusType = function () {
      if (base.dropStatus === 'all') {
         base.omorderdropsummaryDisplay = self.omorderdropsummary;
      } else if (base.dropStatus === 'dropped') {
         base.omorderdropsummaryDisplay = $filter('filter')(base.omorderdropsummary, { 'isSuccessful': true });
      } else if (base.dropStatus === 'notdropped') {
         base.omorderdropsummaryDisplay = $filter('filter')(base.omorderdropsummary, { 'isSuccessful': false });
      }
   };

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['warehouse', 'orderstatus', 'carrier', 'assigned'];

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.id) {
         $state.go('twlooi.detail', { pk: currentRow.id });
      }
   };

   self.orderLineInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.id) {
         $state.go('twlooi.detail', { pk: currentRow.id, pk4: 'LINES' });
      }
   };

   self.waveHyperLink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.batchid) {
         $state.go('twlow.detail', { pk: currentRow.whNum, pk2: currentRow.batchid });
      }
   };

   self.orderSelectionChange = function () {
      self.initializeGridSetup();
      var records = GridService.getSelectedRecords(base.grid);
      self.ttblomselectedordertotals = {
         total_cube: 0,
         total_weight: 0,
         total_line_cnt: 0
      };
      if (records) {
         if (records.length && self.showSelectedTotals) {
               var omselectedorderlist = {
                  ttblomselectedorderlist: angular.copy(records)
               };
               DataService.post('/web/api/twl/getomselectedordertotals', { data: omselectedorderlist, busy: true }, function (data) {
                  if (data) {
                     self.ttblomselectedordertotals = data.ttblomselectedordertotals;
                  }
               });
         }
         records.forEach(function (ordhdr) {
            if (ordhdr.orderStatus.toUpperCase() === 'X') {
               self.inUseCount++;
            }
            if (ordhdr.orderStatus.toUpperCase() === 'C' && ordhdr.class.toUpperCase() === 'WO') {
               self.inUseCount++;
            }
            if (ordhdr.orderStatus.toUpperCase() === 'S') {
               self.shipCount++;
            }
            if (!ordhdr.assigned) {
               self.openUnassignedCount++;
               self.openCount++;
            } else if (isOrderStatusOpenPickedPacked.indexOf(ordhdr.orderStatus.toUpperCase()) > -1 && ordhdr.assigned) {
               self.openAssignedCount++;
               self.openCount++;
            } else if (ordhdr.orderStatus.toUpperCase() === 'H' && ordhdr.assigned) {
               self.openAssignedCount++;
               self.holdAssignedCount++;
            } else if (ordhdr.orderStatus.toUpperCase() === 'I' && ordhdr.assigned) {
               self.openAssignedCount++;
            } else {
               self.notOpenCount++;
            }
         });
      }
      self.dropButtonEnabled = !self.openAssignedCount && !self.notOpenCount && self.openUnassignedCount;
      self.unDropButtonEnabled = self.openAssignedCount && !self.notOpenCount && !self.openUnassignedCount;

      //Get single row.  In combination of having one row selected and that row has any Notes/Comments
      //associated with it (driven from the backend call) enable the Comment button.  Opted for disabling
      //the button instead of hiding it since hiding it causes too much screen flashing as they click rows.
      var record = GridService.getSelectedRecord(base.grid);
      self.commentsExist = record && record.notes === 'Notes' ? true : false;
   };

   self.advCriteriaReady = function () {
      self.advCriteriaWhseChange();
   };

   self.advCriteriaWhseChange = function () {
      if (self.advCriteria && self.advCriteria.coNum && self.advCriteria.whNum) {
         var promptForEmergency = (!base.lastUserEnteredWhNum) || (base.lastUserEnteredWhNum.toLowerCase() !== self.advCriteria.whNum.toLowerCase());
         base.lastUserEnteredWhNum = self.advCriteria.whNum;
         DataService.post('api/twl/carrier/gettwlcarriers', { data: { coNum: self.advCriteria.coNum, whNum: self.advCriteria.whNum }, busy: true }, function (data) {
            if (data) {
               self.carrierOptions = data;
            }
         });
         base.getWarehouseInfo(self.advCriteria.coNum, self.advCriteria.whNum, base.userId, promptForEmergency);
      }
   };

   self.setOnlyBlankCarrier = function () {
      if (self.advCriteria.onlyBlankCarriers) {
         delete self.advCriteria.carrierArray;
      }
   };

   self.setCarrier = function () {
      if (self.advCriteria.carrierArray) {
         self.advCriteria.onlyBlankCarriers = false;
      }
   };

   self.updateInUseToOpen = function () {
      var x = 0;
      var records = $filter('filter')(GridService.getSelectedRecords(base.grid), { 'orderStatus': 'X' });
      if (records) {
         records.forEach(function (ordhdr) {
            x++;
            DataService.get('api/twl/ordhdr/getbyrowid/' + ordhdr.rowid, { busy: true }, function (data) {
               if (data && (data.orderStatus.toUpperCase() === 'X')) {
                  data.orderStatus = 'O';
                  DataService.put('api/twl/ordhdr', { data: data, busy: true }, function () {
                     if (records.length === x) {
                        $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                     }
                  });
               } else {
                  if (records.length === x) {
                     $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                  }
               }
            });
         });
      }

      x = 0;
      records = $filter('filter')(GridService.getSelectedRecords(base.grid), { 'orderStatus': 'C'});
      if (records) {
         records.forEach(function (ordhdr) {
            x++;
            DataService.get('api/twl/ordhdr/getbyrowid/' + ordhdr.rowid, { busy: true }, function (data) {
               if (data && (data.orderStatus.toUpperCase() === 'C' && data.class.toUpperCase() === 'WO')) {
                  data.orderStatus = 'O';
                  DataService.put('api/twl/ordhdr', { data: data, busy: true }, function () {
                     if (records.length === x) {
                        $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                     }
                  });
               } else {
                  if (records.length === x) {
                     $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                  }
               }
            });
         });
      }
   };

   self.setEmployees = function () {
      var criteria = {};
      var record = GridService.getSelectedRecord(base.grid);
      if (record && record.batchid) {
         criteria = {
            coNum: record.coNum,
            whNum: record.whNum,
            batchid: record.batchid
         };
         // Go to the employee assignment for the batch/wave
         $state.go('twlom.master.waveemployees', { criteria: criteria });
      }
   };

   self.updateCarrier = function () {
      var records = GridService.getSelectedRecords(base.grid);
      $state.go('twlom.master.select-carrier-service', { selectedOrders: records });
   };

   self.setToRush = function () {
      var x = 0;
      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         records.forEach(function (ordhdr) {
            x++;
            DataService.get('api/twl/ordhdr/getbyrowid/' + ordhdr.rowid, { busy: true }, function (data) {
               if (data && (data.orderStatus.toUpperCase() === 'O')) {
                  if (data.type.toUpperCase() === 'E' && data.dropType && data.dropType.toUpperCase() !== 'A') {
                     data.type = data.drop_type;
                     data.drop_type = '';
                  } else if (data.type.toUpperCase() === 'E') {
                     if (data.class.toUpperCase() === 'SO') {
                        data.type = 'R';
                     } else if (data.class.toUpperCase() === 'WT') {
                        data.type = 'T';
                     } else if (data.class.toUpperCase() === 'VA') {
                        data.type = 'F';
                     } else {
                        data.type = 'R';
                     }
                  }
                  else {
                     data.drop_type = data.type;
                     data.type = 'E';
                  }
                  DataService.put('api/twl/ordhdr', { data: data, busy: true }, function () {
                     if (records.length === x) {
                        $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                     }
                  });
               } else {
                  if (records.length === x) {
                     $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
                  }
               }
            });
         });
      }
   };

   self.viewComments = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      if (selectedRow && selectedRow.id) {
         $state.go('.notes-comments', { orderNumber: selectedRow.order, orderSuffix: selectedRow.orderSuffix, keyId: selectedRow.id });
      }
   };

   /**
    * Perform advanced search and update data set for the grid
    */
   self.search = function () {
      var criteria = angular.copy(self.advCriteria);

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.advCriteria);
      base.criteriaUsed = angular.copy(self.advCriteria);
      base.criteriaUsed.searchType = 'advanced';

      // Apply record limit (if cleared by user)
      if (!criteria.recordcountlimit) {
         criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      }

      criteria.orderClassList = criteria.orderClassArray ? criteria.orderClassArray.toString() : '';
      delete criteria.orderClassArray; // Don't send an array to SI layer. Can delete this cause it's a copy, the original advCriteria keeps it safe for the user
      criteria.orderStatusList = criteria.orderStatusArray ? criteria.orderStatusArray.toString() : '';
      delete criteria.orderStatusArray;
      criteria.orderTypeList = criteria.orderTypeArray ? criteria.orderTypeArray.toString() : '';
      delete criteria.orderTypeArray;
      criteria.carrierList = criteria.carrierArray ? criteria.carrierArray.toString() : '';
      delete criteria.carrierArray;

      // We only allow one customer and one ship to right now - the shipto needs the customer id
      if (criteria.customerShipTo) {
         if (criteria.customerList) {
            criteria.customerShipToList = criteria.customerList + '-' + criteria.customerShipTo;
         }
      }

      base.searchGetData(criteria);
   };

   self.initializeGridSetup();

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      if (base.criteriaUsed && base.criteriaUsed.searchType === 'standard') {
         base.search();
      } else if (base.criteriaUsed && base.criteriaUsed.searchType === 'advanced') {
         self.advCriteria = angular.copy(base.criteriaUsed);
         self.search();
      } else if (base.criteriaUsed && base.criteriaUsed.searchType === 'emergency') {
         base.searchForEmergencies();
      }
   }

});

app.controller('TwlomMasterExceptionsCtrl', function ($filter, $scope, $state, $stateParams, ConfigService, DataService, GridService) {
   //mste
   var self = this;
   var base = $scope.base;

   self.returnToMaster = function () {
      base.criteria.whNum = base.criteria.prevWhNum;
      base.lastUserEnteredWhNum = base.criteria.whNum;
      base.inExceptionsMaster = false;
      base.dataset = base.datasetBefore;
      $state.go('twlom.master');
   };

   self.initializeGridSetup = function () {
      self.zeroShipButtonEnabled = false;
      self.dropButtonEnabled = false;
      self.holdButtonEnabled = false;
      self.removeHoldButtonEnabled = false;
   };

   self.orderSelectionChange = function () {
      self.initializeGridSetup();
      var records = GridService.getSelectedRecords(base.gridExp);
      if (records.length === 1) {
         records.forEach(function (ordhdr) {
            if (ordhdr.type.toUpperCase() === 'S' && ordhdr.orderStatus.toUpperCase() !== 'H') {
               self.holdButtonEnabled = true;
            }
            if (ordhdr.orderStatus.toUpperCase() === 'H') {
               self.removeHoldButtonEnabled = true;
            }
            if (ordhdr.orderStatus.toUpperCase() === 'Z' || (ordhdr.orderStatus.toUpperCase() === 'O' && ordhdr.assigned === false)) {
               self.dropButtonEnabled = true;
               self.zeroShipButtonEnabled = true;
            }
         });
      }
   };

   self.showLines = function (e, args) {
      var record = args[0].item;
      $state.go('twlom.master.exception-lines', { record: record });
   };

   self.ship = function () {
      var records = GridService.getSelectedRecords(base.gridExp);
      DataService.post('api/twl/astwladmin/omshiploaded', { data: records, busy: true }, function () {
         base.searchExceptions();
      });
   };

   self.hold = function () {
      var records = GridService.getSelectedRecords(base.gridExp);
      DataService.post('api/twl/astwladmin/omhold', { data: records, busy: true }, function () {
         base.searchExceptions();
      });
   };

   self.removeHold = function () {
      var records = GridService.getSelectedRecords(base.gridExp);
      DataService.post('api/twl/astwladmin/omreleasehold', { data: records, busy: true }, function () {
         base.searchExceptions();
      });
   };

   self.enableDropDiscrepancyHandling = function (row, cell, value, column, item) {
      if (column.field === 'paramTwentyOverride' &&
         item.type.toLowerCase() !== 's' &&
         item.exceptionType.toUpperCase() !== 'STAGED' &&
         item.exceptionType.toUpperCase() !== 'S-ORDER' &&
         item.exceptionType.toUpperCase() !== 'S-HDR/LN' &&
         item.exceptionType.toUpperCase() !== 'S-LINE') {
         return true;
      }
      else {
         return false;
      }
   };

   //INITIALIZE
   if (!base.inExceptionsMaster) {
      $state.go('twlom.master', { refreshSearch: true }, { reload: 'twlom.master' });
   } else {
      self.initializeGridSetup();
      // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
      if ($stateParams.refreshSearch) {
         base.searchExceptions();
      }
   }

});

app.controller('TwlomExceptionLinesCtrl', function ($filter, $scope, $state, $stateParams, ConfigService, DataService, GridService) {
   //dtle
   var self = this;
   var base = $scope.base;
   self.showAll = true;
   self.record = {};
   self.allDataset = [];

   self.returnFromHere = function () {
      $state.go('twlom.master.master-exceptions', { refreshSearch: true });
   };

   self.changeShowAll = function () {
      if (self.showAll) {
         self.dataset = self.allDataset;
      } else {
         self.dataset = $filter('filter')(self.allDataset, { 'isHoldLine': true });
      }
   };

   self.initializeGridData = function () {
      self.holdButtonEnabled = false;
      self.removeHoldButtonEnabled = false;
      DataService.post('api/twl/astwlinquiry/getomorderexceptionholdlines', { data: self.record, busy: true }, function (data) {
         if (data) {
            self.allDataset = data.omorderexceptionholdlines;
            self.dataset = self.allDataset;
         }
      });
   };

   self.lineSelectionChange = function () {
      self.holdButtonEnabled = false;
      self.removeHoldButtonEnabled = false;
      // Seems silly to go through this for every record instead of increment/decrement based on current record
      var records = GridService.getSelectedRecords(self.grid);
      if (records.length === 1) {
         records.forEach(function (line) {
            if (line.isHoldEnabled) {
               self.holdButtonEnabled = true;
            }
            if (line.isUnHoldEnabled) {
               self.removeHoldButtonEnabled = true;
            }
         });
      }
   };

   self.hold = function () {
      var records = GridService.getSelectedRecords(self.grid);
      DataService.post('api/twl/astwladmin/omholdlines', { data: records, busy: true }, function () {
         self.initializeGridData();
      });
   };

   self.removeHold = function () {
      var records = GridService.getSelectedRecords(self.grid);
      DataService.post('api/twl/astwladmin/omreleaseholdlines', { data: records, busy: true }, function () {
         self.initializeGridData();
      });
   };

   self.inventoryHyperlinkSearch = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records) {
         $state.go('twlcin.master', { pk: records[0].whNum, pk2: records[0].absNum });
      }
   };

   //INITIALIZE
   if (!$stateParams.record || !base.inExceptionsMaster) {
      $state.go('twlom.master', { refreshSearch: true }, { reload: 'twlom.master' });
   } else {
      self.record = $stateParams.record;
      self.initializeGridData();
   }
});

app.controller('TwlomReviewDropCtrl', function ($scope, $state, GridService) {
   var self = this;
   var base = $scope.base;
   self.coNum = base.criteriaUsed.coNum;
   self.whNum = base.criteriaUsed.whNum;

   self.isReviewDrop = function () {
      return $state.is('twlom.master.review-drop');
   };

   self.returnToMaster = function () {
      if (base.inExceptionsMaster) {
         $state.go('twlom.master.master-exceptions', { refreshSearch: true }, { reload: 'twlom.master.master-exceptions' });
      } else {
         $state.go('twlom.master', { refreshSearch: true }, { reload: 'twlom.master' });
      }
   };

   self.selectRow = function () {
      self.selectedRow = GridService.getSelectedRecord(base.gridOrderDropWaves);
   };

   self.setEmployees = function () {
      var criteria = {};
      var record = self.selectedRow;
      if (record && record.batch) {
         criteria = {
            coNum: self.coNum,
            whNum: self.whNum,
            batchid: record.batch
         };
         // Go to the employee assignment for the batch/wave
         $state.go('twlom.master.waveemployees', { criteria: criteria, function: 'twlom2' });
      }
   };

   self.launchWaveHyperLink = function (wave) {
      $state.go('twlow.detail', { pk: self.whNum, pk2: wave });
   };

   self.waveHyperLink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.batch) {
         self.launchWaveHyperLink(currentRow.batch);
      }
   };

   self.ordersAttemptedWaveHyperLink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.wave) {
         self.launchWaveHyperLink(currentRow.wave);
      }
   };
});

app.controller('TwlomSelectTwlPrinter', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   self.isSelectTwlPrinter = function () {
      return $state.is('twlom.master.select-twl-printer');
   };

   self.returnToMaster = function () {
      if (base.inExceptionsMaster) {
         $state.go('twlom.master.master-exceptions', { refreshSearch: true }, { reload: 'twlom.master.master-exceptions' });
      } else {
         $state.go('twlom.master', { refreshSearch: true }, { reload: 'twlom.master' });
      }
   };

});

app.controller('TwlomAssignUnavailableCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService, Utils) {
   var self = this;
   self.omorderdroprvlines = $scope.base.omorderdroprvlines;

   self.isAssignUnavailable = function () {
      return $state.is('twlom.master.assign-unavailable');
   };

   self.displayPicks = function (e, args) {
      args[0].item.isDrilldowned = true;
      //Get the Grid to refresh the row - do not delete this comment
      self.grid.updateRow(args[0].row);
      $state.go('twlom.master.assign-unavailable.picks', {
         subTitle: (args[0].item.order + '-' + Utils.pad(args[0].item.orderSuffix, 2) + ' | ' + $translate.instant('global.line') + ': ' + args[0].item.line + (args[0].item.lineSequence ? (' | ' + $translate.instant('global.line.sequence') + ': ' + args[0].item.lineSequence) : '')),
         returnLine: args[0].item
      });
   };

});

app.controller('TwlomAssignUnavailablePicksCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   self.subTitle = $stateParams.subTitle;
   self.returnLine = $stateParams.returnLine;

   DataService.post('api/twl/astwladmin/getpickallocation', { data: self.returnLine, busy: true }, function (data) {
      self.pickdetail = data.pickdetail;
      self.pickdetailsummary = data.pickdetailsummary;
   });

   self.assignInventoryToCreatePicks = function () {
      $state.go('twlom.master.assign-unavailable.picks.select-inventory', { pickdetailsummary: self.pickdetailsummary, returnLine: self.returnLine });
   };

   self.returnFromHere = function () {
      $state.go('twlom.master.assign-unavailable');
   };

   self.delete = function () {
      self.pickdetail.forEach(function (row) {
         row.deleteFlag = true;
      });
      DataService.post('api/twl/astwladmin/deletepickallocation', { data: { pickdetailsummary: self.pickdetailsummary, pickdetail: self.pickdetail }, busy: true }, function (data) {
         self.pickdetail = data.pickdetail;
         self.pickdetailsummary = data.pickdetailsummary;
      });
   };

   self.isAssignUnavailablePicks = function () {
      return $state.is('twlom.master.assign-unavailable.picks');
   };

});

app.controller('TwlomAssignUnavailableSelectInventoryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   self.returnLine = $stateParams.returnLine;
   self.pickdetailsummary = $scope.dtlup.pickdetailsummary;
   self.displayRemaining = angular.copy(self.pickdetailsummary.remainingQty);
   self.subTitle = $scope.dtlup.subTitle;

   self.returnLine.availOnly = false;
   self.returnLine.unavailOnly = true;
   self.returnLine.absNum = self.pickdetailsummary.absNum;
   self.returnLine.binNum = '';

   DataService.post('api/twl/astwladmin/preppickallocate', { data: self.returnLine, busy: true }, function (data) {
      self.dataset = data;
   });

   self.adjustDisplayRemaining = function () {
      self.displayRemaining = angular.copy(self.pickdetailsummary.remainingQty);
      self.dataset.forEach(function (data) {
         self.displayRemaining = self.displayRemaining - data.totalQtyRequested;
      });
   };

   self.autoAllocate = function () {
      DataService.post('api/twl/astwladmin/autopickallocation', { data: self.pickdetailsummary, busy: true }, function (data) {
         if (data && $scope.dtlup.pickdetailsummary) {
            $scope.dtlup.pickdetailsummary = data;
         }
         $state.go('twlom.master.assign-unavailable');
      }, function () {
         $state.go('twlom.master.assign-unavailable');
      });
   };

   self.submit = function () {
      if (self.displayRemaining >= 0) {
         DataService.post('api/twl/astwladmin/createpickallocation', { data: { allocavailinventory: self.dataset, pickdetailsummary: self.pickdetailsummary }, busy: true }, function (data) {
            if (data.pickdetailsummary && $scope.dtlu.pickdetailsummary) {
               $scope.dtlu.pickdetailsummary = data.pickdetailsummary;
            }
            $state.go('twlom.master.assign-unavailable');
         }, function () {
            $state.go('twlom.master.assign-unavailable');
         });
      } else {
         MessageService.error('global.error', 'message.you.cannot.over.allocate');
      }
   };

   self.returnFromHere = function () {
      $state.go('twlom.master.assign-unavailable.picks');
   };

   self.isSelectInventory = function () {
      return $state.is('twlom.master.assign-unavailable.picks.select-inventory');
   };

});

app.controller('TwlomSelectUndropHandling', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.omorderundropcriteria = $scope.base.omorderundropcriteria;

   self.holdUndropOptions = [
      { label: MessageService.get('global.zero.ship.the.order'), value: 1 },
      { label: MessageService.get('global.undrop.the.order.and.leave.on.hold'), value: 2 },
      { label: MessageService.get('global.undrop.the.order.and.reset.the.status.to.open'), value: 3 }
   ];

   self.isSelectUndropHandling = function () {
      return $state.is('twlom.master.select-undrop-handling');
   };

   self.returnToMaster = function () {
      if (base.inExceptionsMaster) {
         $state.go('twlom.master.master-exceptions', { refreshSearch: true }, { reload: 'twlom.master.master-exceptions' });
      } else {
         $state.go('twlom.master', { refreshSearch: true }, { reload: 'twlom.master' });
      }
   };

});

app.controller('TwlomVerifyUndropCartons', function ($scope, $state) {
   var self = this;
   var base = $scope.base;
   self.omorderundropcartoninfo = $scope.base.omorderundropcartoninfo;

   self.isVerifyUndropCartons = function () {
      return $state.is('twlom.master.verify-undrop-cartons');
   };

   self.returnToMaster = function () {
      if (base.inExceptionsMaster) {
         $state.go('twlom.master.master-exceptions', { refreshSearch: true }, { reload: 'twlom.master.master-exceptions' });
      } else {
         $state.go('twlom.master', { refreshSearch: true }, { reload: 'twlom.master' });
      }
   };

});

app.controller('TwlomSelectCarrierService', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   base.selectedCarrier = '';
   base.selectedService = '';
   self.selectedOrders = $stateParams.selectedOrders;

   self.isSelectCarrierService = function () {
      return $state.is('twlom.master.select-carrier-service');
   };

   self.returnToMaster = function () {
      if (base.inExceptionsMaster) {
         $state.go('twlom.master.master-exceptions', { refreshSearch: true }, { reload: 'twlom.master.master-exceptions' });
      } else {
         $state.go('twlom.master', { refreshSearch: true }, { reload: 'twlom.master' });
      }
   };

   self.changeCarrierService = function () {
      if (base.selectedCarrier) {
         DataService.post('api/twl/astwladmin/changeordercarrier', { data: { omorderkey: self.selectedOrders, carrier: base.selectedCarrier, service: base.selectedService }, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', data);
               self.returnToMaster();
            } else {
               self.returnToMaster();
            }
         });
      }
   };

});

//This Controller is accessed when the user clicks on the Comments button above the Master Grid.
//The button is only visible if there are any Header related or Line related Notes or Comments stored for the order.
//It's only enabled if one and only one row is selected.
//Alias: mstnc
app.controller('TwlomMasterNotesCommentsCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   self.orderNumber = $stateParams.orderNumber;
   self.orderSuffix = $stateParams.orderSuffix;

   //The following properties are used by the Notes/Comments control
   self.id = $stateParams.keyId;
   self.maximumLineNumber = 9999;
   self.noLineNumber = null;

   self.getSubTitle = function () {
      if (base.criteriaUsed.whNum) {
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

app.controller('TwlomRowDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService) {
   //rwd
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   var orderselected = null;
   var item = mst.rowParams.item;
   var row = mst.rowParams.row;
   var grid = mst.rowParams.grid;
   self.criteria = {};
   self.orderLinesDataset = [];

   // Set a copy of the item (actual data not changed until edit is completed)
   self.rowDetail = angular.copy(item);

   if (self.rowDetail) {
      self.criteria.id = self.rowDetail.id;
   } else {
      self.criteria.id = 0;
   }

   self.orderWithSuffixTitle = self.rowDetail.order.trim() + base.DOCUMENT_DELIMITER + self.rowDetail.orderSuffix.trim() + ' ' + $translate.instant('global.lines');

   function getLines() {

      var omorderlinescriteria = {
         ttblomorderlinescriteria: angular.copy(self.criteria)
      };

      DataService.post('/web/api/twl/getomorderlines', { data: omorderlinescriteria, busy: true }, function (data) {
         if (data) {
            self.orderLinesDataset = data.ttblomorderlines;
         }
      });
   }

   getLines();
});