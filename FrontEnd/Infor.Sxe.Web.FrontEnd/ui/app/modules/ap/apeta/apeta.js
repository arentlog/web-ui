'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ap', 'apeta', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ap', 'apeta');

   $stateProvider.state('apeta.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ap/apeta/detail.json');
            },
            controller: 'ApetaDetailCtrl as dtl'
         }
      }
   });
});

app.controller('ApetaBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};
   self.criteria.statustype = 'B';

   self.isMaster = function () {
      return $state.is('apeta.master');
   };

   self.includesMaster = function () {
      return $state.includes('apeta.master');
   };

   self.isDetail = function () {
      return $state.is('apeta.detail');
   };

   self.includesDetail = function () {
      return $state.includes('apeta.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.statustype = 'b';
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      var apivApetaLookupCriteria = {
         achinvno: self.criteria.achinvno,
         achinvsuf: 0,
         vendno: self.criteria.vendno,
         statustype: self.criteria.statustype,
         startdate: self.criteria.startdate,
         enddate: self.criteria.enddate
      };

      DataService.post('api/ap/asapinquiry/apivapetalookup', { data: apivApetaLookupCriteria, busy: true }, function (achData) {
         if (achData) {
            self.dataset = achData;
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('ApetaSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('apeta.master');
      }

      // Get data
      base.search();
   };
});

app.controller('ApetaMasterCtrl', function ($scope, $state, ConfigService, DataService, GridService, MessageService, SecurityService) {
   var self = this;
   var base = $scope.base;
   var securityLevel = SecurityService.getSecurityLevel('apeta');
   // Advanced search criteria object with initial values
   self.advCriteria = {
      recordlimit: ConfigService.getDefaultRecordLimit()
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'changeme', label: MessageService.get('global.CHANGE_ME') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['changeme'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { id: record.achinvno });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordlimit) {
         advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/ap/CHANGE_ME/TO/SEARCH/API', { data: advCriteria, busy: true }, function (data) {
         base.dataset = data.CHANGE_ME;
      });
   };

   self.isReprocessedButtonDisabled = function () {
      var isDisabled = true;
      var selectedRecord = GridService.getSelectedRecord(base.grid);

      if (selectedRecord) {
         isDisabled = !selectedRecord.statustype || selectedRecord.commcd === 1 || selectedRecord.commcd === 2 || securityLevel < 3;
      }
      return isDisabled;
   };

   self.markReprocessed = function () {

      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord) {
         var apetaReprocessCriteria = {
            vendno: selectedRecord.vendno,
            achinvno: selectedRecord.achinvno,
            achinvsuf: 0,
            bankno: selectedRecord.bankno
         };
         DataService.post('api/ap/asapinquiry/apetareprocess', { data: apetaReprocessCriteria, busy: true }, function (data) {
            if (data) {
               base.search();
            }
         });
        
      }
   };
});

app.controller('ApetaDetailCtrl', function () {

});
