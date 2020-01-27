'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('twl', 'twlosm', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('twl', 'twlosm');

   $stateProvider.state('twlosm.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlosm/detail.json');
            },
            controller: 'TwlosmDetailCtrl as dtl'
         }
      }
   });
});

app.controller('TwlosmBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};

   // Sets defaults in search tab
   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;

   self.getSubTitle = function (whseCriteria) {
      if (whseCriteria) {
         return MessageService.get('global.warehouse') + ': ' + (whseCriteria ? whseCriteria : MessageService.get('global.unknown'));
      } else {
         return MessageService.get('global.warehouse') + ': ' + (self.criteria.whNum ? self.criteria.whNum : MessageService.get('global.unknown'));
      }
   };

   self.subTitle = self.getSubTitle(self.userWhNum);

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'twlosm',
      rowIdField: 'rowID',
      stateRef: 'twlosm.detail',
      title: {label: 'global.manifest', value: 'manifestId'},
      description: [{label: 'global.warehouse', value: 'whNum'}, {label: 'global.carrier', value: 'carrierId'}]
   };

   self.isMaster = function () {
      return $state.is('twlosm.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlosm.master');
   };

   self.isDetail = function () {
      return $state.is('twlosm.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlosm.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      self.subTitle = self.getSubTitle(self.criteria.whNum);

      var criteria = {
         coNum: self.criteria.coNum,
         whNum: self.criteria.whNum,
         manifestId: self.criteria.manifestId,
         carrierId: self.criteria.carrierId
      };
      DataService.post('api/twl/shpmst/gettwlshpmst', { data: criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlosmSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlosm.master');
      }

      // Get data
      base.search();
   };
});

app.controller('TwlosmMasterCtrl', function ($filter, $scope, $state, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Advanced search criteria object with initial values
   self.advCriteria = {
      recordlimit: ConfigService.getDefaultRecordLimit(),
      coNum: base.userCoNum,
      whNum: base.userWhNum
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'whNum', label: MessageService.get('global.warehouse') },
      { value: 'carrierId', label: MessageService.get('global.carrier.id') },
      { value: 'manifestId', label: MessageService.get('global.manifest') },
      { value: 'dockId', label: MessageService.get('global.dock') },
      { value: 'trailerNum', label: MessageService.get('global.trailer') },
      { value: 'shipDate', label: MessageService.get('global.ship.date') },
      { value: 'recordlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['whNum'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { id: record.rowID });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);

      base.subTitle = base.getSubTitle(advCriteria.whNum);

      // If the user entered a From Date, convert to the format needed in TWL: YYYYMMDDHHMM
      if (advCriteria.fromDateTimeDisplay) {
         advCriteria.fromDateTime = advCriteria.fromDateTimeDisplay.substring(0, 4) +
                                    advCriteria.fromDateTimeDisplay.substring(5, 7) +
                                    advCriteria.fromDateTimeDisplay.substring(8, 10) + '0000';
      } else {
         advCriteria.fromDateTime = '';
      }

      // If the user entered a To Date, convert to the format needed in TWL: YYYYMMDDHHMM
      if (advCriteria.toDateTimeDisplay) {
         advCriteria.toDateTime = advCriteria.toDateTimeDisplay.substring(0, 4) +
                                    advCriteria.toDateTimeDisplay.substring(5, 7) +
                                    advCriteria.toDateTimeDisplay.substring(8, 10) + '2359';
      } else {
         advCriteria.toDateTime = '204912312359';
      }

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordlimit) {
         advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/twl/astwlinquiry/getshippingmanifests', { data: advCriteria, busy: true }, function (data) {
         base.dataset = data;
      });
   };
});

app.controller('TwlosmDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.shpmst = DataService.getResource('api/twl/shpmst/getbyrowid/' + $stateParams.id + '?fillmode=true', { busy: true });
   } else {
      var params = {
         coNum: base.userCoNum,
         whNum: base.criteria.whNum,
         manifestId: $stateParams.pk,
         carrierId: $stateParams.pk2,
         fillmode: true
      };

      self.shpmst = DataService.getResource('api/twl/shpmst/getbypk', { params: params, busy: true });
   }

   // After record has resolved...
   self.shpmst.$promise.then(function () {
      if (self.shpmst) {
         self.subTitle = MessageService.get('global.warehouse') + ': ' + self.shpmst.whNum + Constants.SUB_TITLE_SEPARATOR;
         self.subTitle += MessageService.get('global.manifest') + ': ' + self.shpmst.manifestId;

         var params = {
            manifestId: self.shpmst.manifestId
         };
         DataService.get('api/twl/shpdtl/listbymanifestid', { params: params }, function (data) {
            self.dataset = data;
         });

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.shpmst);
      }
   });
});
