'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ot', 'otiv', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('ot', 'otiv');

   $stateProvider.state('otiv.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otiv/detail.json');
            },
            controller: 'OtivDetailCtrl as dtl'
         }
      }
   });
});

app.controller('OtivBaseCtrl', function ($state, ConfigService, DataService, Sasoo) {
   var self = this;
   self.criteria = { vesselno: 0 };

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'otiv',
      rowIdField: 'rowID',
      stateRef: 'otiv.detail',
      title: { label: 'global.vessel.number', value: 'vesselno' },
      description: { label: null, value: 'vessnm' }
   };

   self.isMaster = function () {
      return $state.is('otiv.master');
   };

   self.includesMaster = function () {
      return $state.includes('otiv.master');
   };

   self.isDetail = function () {
      return $state.is('otiv.detail');
   };

   self.includesDetail = function () {
      return $state.includes('otiv.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.whse = Sasoo.whse;
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/ot/asotinquiry/otivbuildvessellist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };
   self.initCriteria();
});

app.controller('OtivSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
      criteria.vesselno = 0;

      if (self.otevh) {
         self.otevh.stagecd = '';
      }
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('otiv.master');
      }

      // Get data
      base.search();
   };

   self.vesselNumberChanged = function () {
      var params = {
         vesselno: criteria.vesselno,
         fillmode: true
      };

      self.otevh = DataService.getResource('api/ot/otevh/getbypk', { params: params, busy: true });
   };
});

app.controller('OtivMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService, $translate, Sasoo) {
   var self = this;
   var base = $scope.base;

   // Advanced search criteria object with initial values
   // TODO: default values
   self.advCriteria = { recordlimit: ConfigService.getDefaultRecordLimit(), whse: Sasoo.whse, stagecd: [''] };

   // List of available search criteria fields
   // TODO: finish
   self.criteriaList = [
      { value: 'trackno', label: $translate.instant('global.tracking.number') },
      { value: 'whse', label: $translate.instant('global.warehouse') },
      { value: 'shipid', label: $translate.instant('global.shipment.id') },
      { value: 'shipco', label: $translate.instant('global.shipping.company') },
      { value: 'vessnm', label: $translate.instant('global.vessel.name') },
      { value: 'voyageno', label: $translate.instant('global.voyage.number') },
      { value: 'contno', label: $translate.instant('global.container.number') },
      { value: 'stagecd', label: $translate.instant('global.stage') },
      { value: 'deptdtfr', label: $translate.instant('global.departure.from') },
      { value: 'arrdtfr', label: $translate.instant('global.arrived.from') },
      { value: 'unlddtfr', label: $translate.instant('global.unloaded.from') },
      { value: 'deptdtto', label: $translate.instant('global.departure.to') },
      { value: 'arrdtto', label: $translate.instant('global.arrived.to') },
      { value: 'unlddtto', label: $translate.instant('global.unloaded.to') }
   ];

   // List of default selected criteria fields
   // TODO: any?
   self.defaultSelectedCriteria = ['trackno'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      // TODO: finish rowId param or pk param(s)
      $state.go('^.detail', { id: record.rowidOtevh });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);
      var stage = '';

      advCriteria.stagecd.forEach(function (stg) {
         stage = stage + ',' + stg;
      });

      advCriteria.stagecd = stage.substring(1);

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordlimit) {
         advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/ot/asotinquiry/otivbuildvessellist', { data: advCriteria, busy: true }, function (data) {
         base.dataset = data;
      });
   };

   self.navigateToTrack = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         var record = { trackno: currentRow.trackno };

         $state.go('otit.detail', { record: record });
      }
   };

   self.navigateToVendor = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.vendno) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };
});

app.controller('OtivDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService) {
   var self = this;
   var base = $scope.base;

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.otevh = DataService.getResource('api/ot/otevh/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         vesselno: $stateParams.pk,
         fillmode: true
      };

      self.otevh = DataService.getResource('api/ot/otevh/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.otevh.$promise.then(function () {
      if (self.otevh) {
         self.subTitle = self.otevh.vessnm + ' | ' + self.otevh.vesselno;

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.otevh);

         self.dataset = [];

         DataService.getResource('api/ot/asotinquiry/otivbuildvessellinelist/' + self.otevh.vesselno, { busy: true }, function (data) {
            if (Array.isArray(data)) {
               self.dataset = data;
            }
            else {
               if (data[0]) {
                  self.dataset.push(data[0]);
               }
            }
         });
      }
   });

   self.navigateToTrack = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         var record = { trackno: currentRow.trackno };

         $state.go('otit.detail', { record: record });
      }
   };

   self.navigateToVendor = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.vendno) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };
});
