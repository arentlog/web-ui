'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twloal', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twloal');

   $stateProvider.state('twloal.master.clearlogs', {
      url: '/clear-logs',
      params: {
         twloal: null
      },
      views: {
         masterExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twloal/clearlogs.json');
            },
            controller: 'TwloalClearLogsCtrl as clr'
         }
      }
   });
});

app.controller('TwloalBaseCtrl', function ($state, DataService, MessageService, SecurityService, ConfigService, UserService) {
   var self = this;
   self.criteria = {
      coNum: UserService.getTwlCompany(),
      whNum: UserService.getTwlWarehouse(),
      restrictTWLWarehouse: UserService.getTwlRestrictWarehouse(),
      findString: '',
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   self.criteriaUsed = {};

   self.isMaster = function () {
      return $state.is('twloal.master');
   };

   self.includesMaster = function () {
      return $state.includes('twloal.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);
      DataService.post('api/twl/astwlinquiry/getdrplog', { data: self.criteriaUsed, busy: true }, function (data) {
         if (data) {
            self.dataset = data.drplogresults;
         }
      });
   };
});

app.controller('TwloalSearchCtrl', function ($scope, $state, DataService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      base.criteria = {
         coNum: self.coNum,
         whNum: self.whNum
      };
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twloal.master');
      }
      // Get data
      base.search();
   };
});

app.controller('TwloalMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   self.clearAutoDropLogs = function () {
      $state.go('twloal.master.clearlogs');
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

//Auto Drop Logs (Delete Log History)
app.controller('TwloalClearLogsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, UserService) {
   var self = this;
   var base = $scope.base;

   self.userCoNum = base.criteria.coNum;
   self.userWhNum = base.criteria.whNum;
   self.empNum = UserService.getTwlUserId();

   self.clearAutoDropLogFiles = function () {
      if (self.userCoNum &&
          self.userWhNum &&
          self.empNum &&
          self.clearDate) {
         MessageService.yesNo('global.question', 'question.do.you.want.to.clear.log.files.before.date', function () {
            DataService.post('api/twl/astwladmin/deletedroplogs', {
               data: {
                  coNum: self.userCoNum,
                  whNum: self.userWhNum,
                  empNum: self.empNum,
                  deletedate: self.clearDate
               },
               busy: true
            }, function () {
               MessageService.info('global.information', 'message.operation.completed.successfully');
            });
            $state.go('twloal.master', { refreshSearch: true }, { reload: 'twloal.master' });
         });
      } else {
         MessageService.info('global.information', 'message.please.enter.a.valid.warehouse.and.date');
      };
   };

   self.isClearLogs = function () {
      return $state.is('twloal.master.clearlogs');
   };

   self.returnToMaster = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + self.userWhNum;
   };
});