'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('twl', 'twlow', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('twl', 'twlow');

   $stateProvider.state('twlow.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlow/detail.json');
            },
            controller: 'TwlowDetailCtrl as dtl'
         }
      }
   });
});

app.controller('TwlowBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.userId = UserService.getTwlUserId();

   self.comparisonTypes = [
      { label: MessageService.get('>='), value: '>=' },
      { label: MessageService.get('='), value: '=' }
   ];

   self.waveStatusTypes = [
      { label: MessageService.get('global.all'), value: '' },
      { label: MessageService.get('global.open'), value: 'Open' },
      { label: MessageService.get('global.active'), value: 'Active' },
      { label: MessageService.get('global.not.finished'), value: 'Unfinished' },
      { label: MessageService.get('global.complete'), value: 'Complete' }
   ];

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'twlow',
      rowIdField: 'rowId',
      pk: 'whNum',
      pk2: 'batchid',
      stateRef: 'twlow.detail',
      title: {label: 'global.wave', value: 'batchid'},
      description: {label: 'global.warehouse', value: 'whNum'}
   };

   self.isMaster = function () {
      return $state.is('twlow.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlow.master');
   };

   self.isDetail = function () {
      return $state.is('twlow.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlow.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.batchEquality = '>=';
      self.criteria.waveStatus = 'Open';
      if (self.criteria.whNum) {
         self.changeSearchWarehouse();
      }
      self.criteria.batchsize = ConfigService.getDefaultRecordLimit();
   };

   self.changeSearchWarehouse = function () {
      self.lastUserEnteredWhNum = self.criteria.whNum;
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      self.changeSearchWarehouse();

      var completeString = MessageService.get('global.complete');
      var activeString = MessageService.get('global.active');
      var openString = MessageService.get('global.open');
      var dateTo = new Date(self.criteria.dropDateToDisplay);
      var dateFrom = new Date(self.criteria.dropDateFromDisplay);

      // drop_date is YYYYMMDDHHMM format in TWL
      self.criteria.dropDateFrom = self.criteria.dropDateFromDisplay ?
         dateFrom.getFullYear() +
         ('0' + dateFrom.getMonth()).slice(-2) +
         ('0' + dateFrom.getDate()).slice(-2) + '9999' :
         '';
      self.criteria.dropDateTo = self.criteria.dropDateToDisplay ?
         dateTo.getFullYear() +
         ('0' + dateTo.getMonth()).slice(-2) +
         ('0' + dateTo.getDate()).slice(-2) + '0000' :
         '';

      // This is also used by the standard lookup
      DataService.post('api/twl/wave/gettwlwaves', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
         self.dataset.forEach(function (result) {
            result.calculatedStatus = result.shipDateTime ? completeString : (result.activeDateTime ? activeString : openString);
         });
      });

   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlowSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlow.master');
      }

      // Get data
      base.search();
   };
});

app.controller('TwlowMasterCtrl', function ($scope, $state) {
   var self = this;

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      // TODO: finish rowId param or pk param(s)
      $state.go('^.detail', { pk: record.whNum, pk2: record.batch });
   };
});

app.controller('TwlowDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService) {
   var self = this;
   var base = $scope.base;
   self.twlow = {};
   self.cartons = [];
   self.picks = [];
   self.shipments = [];
   self.zones = [];
   self.counts = [];
   var params = {};

   // Get record (handle both id param and pk params for hyperlinks to this function)

   if ($stateParams.id) {
      params = {
         coNum: base.criteria.coNum,
         rowId: $stateParams.id ? $stateParams.id : 0
      };
   } else {
      params = {
         coNum: base.criteria.coNum,
         whNum: $stateParams.pk ? $stateParams.pk : '',
         batchid: $stateParams.pk2 ? $stateParams.pk2 : ''
      };
   }

   DataService.post('api/twl/astwlinquiry/getwavesummary' + '?fillmode=true', { data: params, busy: true }, function (data) {
      self.twlow = data.wavesummary;
      self.cartons = data.wavesummarycartons;
      self.picks = data.wavesummarypicks;
      self.shipments = data.wavesummaryshipments;
      self.zones = data.wavesummaryzones;
      self.counts.push({
         sort: 0,
         label: $translate.instant('global.orders'),
         open: self.twlow.openOrders,
         exceptions: self.twlow.exceptionOrders,
         inpick: self.twlow.inPickOrders,
         picked: self.twlow.pickedOrders,
         packed: self.twlow.packedOrders,
         shipped: self.twlow.shippedOrders,
         total: self.twlow.totalOrders
      });
      self.counts.push({
         sort: 1,
         label: $translate.instant('global.lines'),
         open: self.twlow.openLines,
         exceptions: self.twlow.exceptionLines,
         inpick: self.twlow.inPickLines,
         picked: self.twlow.pickedLines,
         packed: self.twlow.packedLines,
         shipped: self.twlow.shippedLines,
         total: self.twlow.totalLines
      });

      self.viewWaveInOrderManager = function () {
         $state.go('twlom.master', { pk: self.twlow.whNum, pk2: self.twlow.batchid });
      };

      self.subTitle = self.twlow.whNum + Constants.SUB_TITLE_SEPARATOR + self.twlow.batchid;

      // Add to recently visited list
      base.recentlyVisitedControl.addToList(self.twlow);
   });
});

app.controller('TwlowSummaryTabCtrl', function () {
   //dtlsum
});


app.controller('TwlowOpenPicksTabCtrl', function () {
   //dtlop
});


app.controller('TwlowOpenCartonsTabCtrl', function () {
   //dtloc
});


app.controller('TwlowPickingZonesTabCtrl', function () {
   //dtlpz
});


app.controller('TwlowCarrierShipmentsTabCtrl', function () {
   //dtlcs
});


app.controller('TwlowOrderCtrl', function ($scope, $state, $stateParams, CommonConverters, DataService, GridService, MessageService) {
   //dtlords
   var self = this;
   var dtl = $scope.dtl;

   self.criteria = {
      coNum: dtl.twlow.coNum,
      whNum: dtl.twlow.whNum,
      batch: dtl.twlow.batchid
   };

   DataService.post('api/twl/astwlinquiry/getorderinquirylist', { data: self.criteria, busy: true }, function (data) {
      self.dataset = data.orderinquirylist;
   });

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.id) {
         $state.go('twlooi.detail', { pk: currentRow.id });
      }
   };


});