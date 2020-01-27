'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('twl', 'twloc', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('twl', 'twloc');

   $stateProvider.state('twloc.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twloc/detail.json');
            },
            controller: 'TwlocDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('twloc.detail.serialhistory', {
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
               return JsonViewService.getView('twl/twloc/serialhistory.json');
            },
            controller: 'TwlocDetailSerialHistoryCtrl as dtlsh'
         }
      }
   });
});

app.controller('TwlocBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};
   self.criteriaUsed = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.refreshSearch = false;

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.chWh ? self.criteriaUsed.chWh : MessageService.get('global.unknown'));
   };

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'twloc',
      rowIdField: 'rowID',
      stateRef: 'twloc.detail',
      title: { label: 'global.carton.id', value: 'cartonId' }
   };

   self.isMaster = function () {
      return $state.is('twloc.master');
   };

   self.includesMaster = function () {
      return $state.includes('twloc.master');
   };

   self.isDetail = function () {
      return $state.is('twloc.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twloc.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.chCo = self.userCoNum;
      self.criteria.chWh = self.userWhNum;
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);
      DataService.post('api/twl/astwlinquiry/getordercarton', { data: self.criteriaUsed, busy: true }, function (data) {
         if (data) {
            self.dataset = data.ordercartonresults;
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlocSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twloc.master');
      }

      // Get data
      base.search();
   };
});

app.controller('TwlocMasterCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { id: record.cartonmstRowid });
   };

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.order) {
         $state.go('twlooi.detail', { pk: currentRow.order, pk2: currentRow.orderSuffix, pk3: base.criteriaUsed.chCo, pk4: base.criteriaUsed.chWh });
      }
   };

});

app.controller('TwlocDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, GridService) {
   var self = this;
   var base = $scope.base;

   self.isSerialEnabled = false;

   self.rowSelected = function () {
      if (self.grid.isOneRowSelected()) {
         var record = GridService.getSelectedRecord(self.grid);
         self.isSerialEnabled = record.isSerial ? true : false;
      } else {
         self.isSerialEnabled = false;
      }
   };

   self.viewSerials = function (e, args) {
      var record = GridService.getSelectedRecord(self.grid);
      $state.go('twloc.detail.serialhistory', {
         coNum: self.company,
         whNum: self.warehouse,
         order: record.order,
         orderSuffix: record.orderSuffix,
         line: record.line,
         lineSequence: record.lineSequence,
         absNum: record.absNum
      });
   };

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.cartonmst = DataService.getResource('api/twl/cartonmst/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         cartonNum: $stateParams.pk,
         fillmode: true
      };
      self.cartonmst = DataService.getResource('api/twl/cartonmst/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.cartonmst.$promise.then(function () {
      if (self.cartonmst) {

         self.company = self.cartonmst.coNum;
         self.warehouse = self.cartonmst.whNum;
         self.cartonId = self.cartonmst.cartonId;
         self.trackingId = self.cartonmst.trackingId;
         self.subTitle = self.warehouse;

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.cartonmst);

         var params = {
            coNum: self.company,
            whNum: self.warehouse,
            cartonId: self.cartonId
         };

         DataService.post('api/twl/astwlinquiry/getcartoncontents', { data: params, busy: true }, function (data) {
            self.dataset = data;
         });
      }

   });
});

app.controller('TwlocDetailSerialHistoryCtrl', function ($scope, $state, $stateParams, DataService) {
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
      return $state.is('twloc.detail.serialhistory');
   };

   self.returnToCartonContents = function () {
      $state.go('^');
   };

});