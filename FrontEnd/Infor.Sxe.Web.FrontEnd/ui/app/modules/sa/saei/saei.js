'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('sa', 'saei', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saei');

   $stateProvider.state('saei.detail', {
      url: '/detail',
      params: { saeiRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saei/detail.json');
            },
            controller: 'SaeiDetailCtrl as dtl'
         }
      }
   });
});

app.controller('SaeiBaseCtrl', function ($state, ConfigService, DataService, Utils) {
   var self = this;
   self.criteria = {};
   self.criteria.fromdate = Utils.getCurrentDate();
   self.criteria.todate = Utils.getCurrentDate();

   self.isMaster = function () {
      return $state.is('saei.master');
   };

   self.includesMaster = function () {
      return $state.includes('saei.master');
   };

   self.isDetail = function () {
      return $state.is('saei.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saei.detail');
   };


   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/sa/assainquiry/saeiloadeventtrans', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.saeieventresults;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('SaeiSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      base.criteria.fromdate = Utils.getCurrentDate();
      base.criteria.todate = Utils.getCurrentDate();
      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search when click on submit
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saei.master');
      }

      // Get data
      base.search();
   };
});

app.controller('SaeiMasterCtrl', function ($scope, $state) {
   var self = this;

   // Drill down
   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      $state.go('^.detail', { saeiRecord: selectedRecord });
   };

   self.custHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   self.vendHyperlink = function (e, args) {
      var currentVendRow = args[0].item;
      if (currentVendRow) {
         $state.go('apiv.detail', { pk: currentVendRow.vendno });
      }
   };
});

app.controller('SaeiDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;

   if ($stateParams.saeiRecord) {
      self.subTitle = MessageService.get('global.event.name') + ' : ' + $stateParams.saeiRecord.eventname;

      DataService.post('api/sa/assainquiry/saeiloadeventextend', { data: $stateParams.saeiRecord, busy: true }, function (data) {
         self.saei = data.saeiextend;
         self.aditionalDatadataset = data.saeiextendfields;
         self.actiondataset = data.saeiextendaction;
      });
   }
});
