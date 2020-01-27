'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('sa', 'saabioi', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saabioi');

   $stateProvider.state('saabioi.detail', {
      url: '/detail',
      params: { record: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saabioi/detail.json');
            },
            controller: 'SaabioiDetailCtrl as dtl'
         }
      }
   });
});

app.controller('SaabioiBaseCtrl', function ($state, Utils, DataService, ConfigService) {
   var self = this;

   self.criteria = {
      direction: 'O',
      statustype: 'A',
      pastdays: 7,
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   self.isMaster = function () {
      return $state.is('saabioi.master');
   };

   self.includesMaster = function () {
      return $state.includes('saabioi.master');
   };

   self.isDetail = function () {
      return $state.is('saabioi.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saabioi.detail');
   };

   self.clearSearch = function () {
      self.criteria.statustype = 'A';
      self.criteria.nounname = '';
      self.criteria.bodid = '';
      self.criteria.id = '';
      self.criteria.pastdays = 7;
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   };

   DataService.get('api/shared/assharedentry/ionimspingtest', { busy: true }, function () { });

   /**
    * Perform basic search and update data set for the grid
    */
   self.search = function () {

      var criteria = {
         direction: self.criteria.direction,
         nounname: self.criteria.nounname,
         pastdays: self.criteria.pastdays,
         statustype: self.criteria.statustype,
         bodid: self.criteria.bodid,
         id: self.criteria.id,
         recordcountlimit: self.criteria.recordcountlimit
      };

      DataService.post('api/sa/assainquiry/ionioboxretrieve', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.totalBodCount = data.ionioboxsummary.totalcnt;
            self.openBodCount = data.ionioboxsummary.unprocessedcnt;
            self.lastCreateDate = data.ionioboxsummary.lastcreatedatetime;
            self.dataset = data.ionioboxresults;
         }
      });
   };
});

app.controller('SaabioiSearchCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saabioi.master');
      }

      // Get data
      base.search();
   };

   // Perform clear
   self.clear = function () {
      base.clearSearch();
   };
});

app.controller('SaabioiMasterCtrl', function ($scope, $state, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.customDelete = function () {

      var selectedRecords = GridService.getSelectedRecords(base.grid);

      var deleteList = [];
      selectedRecords.forEach(function (row) {
         var deleteCriteria = {
            direction: base.criteria.direction,
            id: row.id
         };
         deleteList.push(deleteCriteria);
      });
      var requestCriteria = {
         ttblsaabioideletecriteria: deleteList
      };

      MessageService.yesNo('global.question', 'question.confirm.delete', function () {

         DataService.post('/web/api/sa/saabioidelete', { data: requestCriteria, busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            base.search();
         });
      });
   };

   // Drill down
   self.drilldown = function (e, args) {
      self.record = args[0].item;

      var criteria = {
         direction: base.criteria.direction,
         dbrowid: self.record.dbrowid
      };

      DataService.post('api/sa/assainquiry/ionioboxgetxml', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.record.displayxml = data.displayxml;
            self.record.errormsg = data.errormsg;
         }
      });

      $state.go('^.detail', { record: self.record });
   };

});

app.controller('SaabioiDetailCtrl', function ($scope, $state, $stateParams, Constants) {
   var self = this;
   var base = $scope.base;

   self.record = {};
   self.record = $stateParams.record;

   if (self.record) {
      self.subTitle = self.record.bodtype + Constants.SUB_TITLE_SEPARATOR + self.record.bodid;
   }
});