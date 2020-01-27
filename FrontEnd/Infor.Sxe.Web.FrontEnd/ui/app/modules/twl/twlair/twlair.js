'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlair', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlair');
});

app.controller('TwlairBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};

   self.RESEND = 'R';
   self.CLEAR = 'C';
   self.ERROR = 'E';

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;
   self.userId = UserService.getTwlUserId();

   self.criteriaUsed = {};

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlair.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlair.master');
   };

   self.isDetail = function () {
      return $state.is('twlair.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlair.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.rowstatus = self.ERROR;

      var initData = {
         coNum: self.userCoNum,
         whNum: self.userWhNum
      };
      DataService.post('api/twl/astwladmin/resendinitializesearch', { data: initData, busy: true }, function (data) {
         if (data) {
            self.criteria.fromdate = data.fromdate;
            self.criteria.todate = data.todate;
            self.criteria.fromtime = data.fromtime;
            self.criteria.totime = data.totime;
         }
      });
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwladmin/getresendtransactions', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlairSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlair.master');
      }

      base.search();
   };
});

app.controller('TwlairMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.clearTransactions = function () {
      var selectedrecords = GridService.getSelectedRecords(base.gridDetail);
      if (selectedrecords) {
         var clearList = [];
         selectedrecords.forEach(function (record) {
            clearList.push({
               transNum: record.transNum,
               assignType: base.CLEAR
            });
         });

         if (clearList.length > 0) {
            MessageService.yesNo('global.question', 'question.do.you.want.to.clear.selected.transactions',
            // Yes processing
            function () {
               DataService.post('api/twl/astwladmin/resendtransactionassign', { data: clearList, busy: true }, function () {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  base.search();
               });
            });
         }
      }
   };

   self.resendTransactions = function () {
      var selectedrecords = GridService.getSelectedRecords(base.gridDetail);
      if (selectedrecords) {
         var resendList = [];
         selectedrecords.forEach(function (record) {
            resendList.push({
               transNum: record.transNum,
               assignType: base.RESEND
            });
         });

         if (resendList.length > 0) {
            MessageService.yesNo('global.question', 'question.do.you.want.to.resend.selected.transactions',
            // Yes processing
            function () {
               DataService.post('api/twl/astwladmin/resendtransactionassign', { data: resendList, busy: true }, function () {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  base.search();
               });
            });
         }
      }
   };

});
