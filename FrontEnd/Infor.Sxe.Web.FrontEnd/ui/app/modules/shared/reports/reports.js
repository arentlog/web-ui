'use strict';

app.config(function (StateProvider) {
   StateProvider.addBaseState('shared', 'reports', {
      url: '/reports?type', // type is are, arr, etc.
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('shared', 'reports');
});

app.controller('ReportsBaseCtrl', function ($state, $stateParams, ReportService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('reports.master');
   };

   self.includesMaster = function () {
      return $state.includes('reports.master');
   };

   // Initialize the search criteria object with report type
   self.initCriteria = function () {
      self.criteria.type = $stateParams.type;
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.dataset = ReportService.searchReportFunctions(self.criteria.type, self.criteria.functionName);
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('ReportsSearchCtrl', function ($scope, $state, DataService, ReportService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Get list of report types for drop down
   self.reportTypes = ReportService.getReportTypes();

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      base.search();
   };
});

app.controller('ReportsMasterCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   // Perform initial search
   base.search();

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go(record.functionname);
   };
});