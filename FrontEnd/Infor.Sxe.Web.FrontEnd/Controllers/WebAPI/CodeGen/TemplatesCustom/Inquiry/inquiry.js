'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('xx', 'xxxx', {
      widgets: ['SEARCH'],
      searchView: 'extension-xx-xxxx-search'
   });
   StateProvider.addMasterState('xx', 'xxxx', {
      view: 'extension-xx-xxxx-master'
   });

   $stateProvider.state('xxxx.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('extension-xx-xxxx-detail');
            },
            controller: 'XxxxDetailCtrl as dtl'
         }
      }
   });
});

app.run(function (TranslationService) {
   TranslationService.addStrings('en-US', {
      'menu.xxxx': 'Menu for xxxx',
      'title.xxxx': 'Title for xxxx'
   });
});

app.controller('XxxxBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('xxxx.master');
   };

   self.includesMaster = function () {
      return $state.includes('xxxx.master');
   };

   self.isDetail = function () {
      return $state.is('xxxx.detail');
   };

   self.includesDetail = function () {
      return $state.includes('xxxx.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      var criteriaDataSet = {
         pdsxxxxsearchcriteria: {
            ttblxxxxsearchcriteria: [self.criteria]
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxSearch',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      DataService.post('api/custom/ascustom/customcall', {data: requestCriteria, busy: true}, function (data) {
         if (data && data.length > 1) {
            // the 1st row contains the criteria and the 2nd row contains the results
            var result = JSON.parse(data[1].data);
            if (result) {
               self.dataset = result.pdsxxxxsearchresults.ttblxxxxsearchresults;
            }
         } else {
            self.dataset = [];
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('XxxxSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('xxxx.master');
      }

      // Get data
      base.search();
   };
});

app.controller('XxxxMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { id: record.rowidxxxx });
   };
});

app.controller('XxxxDetailCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   self.record = null;

   // Get detail of selected record
   self.getDetailRecord = function () {
      var criteriaData = {
         rowidxxxx: $stateParams.id,
         userfield: ''
      };

      var criteriaDataSet = {
         pdsxxxxdetailcriteria: {
            ttblxxxxdetailcriteria: [criteriaData]
         }
      };

      var requestCriteria = {
         cOperation: 'XxxxDetail',
         custom: [{ sq: 1, fn: '', fv: '', data: JSON.stringify(criteriaDataSet) }]
      };

      DataService.post('api/custom/ascustom/customcall', { data: requestCriteria, busy: true }, function (data) {
         if (data && data.length > 1) {
            var result = JSON.parse(data[1].data);
            if (result) {
               self.record = result.pdsxxxxdetailresult.ttblxxxxdetailresult[0];
            }
         }
      });
   };

   // Fetch the detail record
   self.getDetailRecord();
});