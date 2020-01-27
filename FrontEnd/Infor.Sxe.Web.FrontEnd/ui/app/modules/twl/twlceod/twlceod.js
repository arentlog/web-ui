'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlceod',
      dataPath: 'api/twl/eodsetup',
      searchMethod: 'POST',
      searchPath: 'api/twl/eodsetup/gettwleodsetups',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });

   $stateProvider.state('twlceod.master.viewhistory', {
      url: '/view-history',
      params: {
         twlceod: null
      },
      views: {
         masterExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlceod/viewhistory.json');
            },
            controller: 'TwlceodViewHistoryCtrl as mste'
         }
      }
   });
});

app.service('TwlceodService', function ($state, DataService, MessageService, UserService, Utils) {
   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.refreshSearch = false;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
      };
   };

   this.extendCreateController = function (self, base, twlceod) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlceod.coNum = base.criteriaUsed.coNum;
      twlceod.whNum = base.criteriaUsed.whNum;
   };

   this.extendMasterController = function (self) {
      self.viewEndOfDayHistory = function () {
         $state.go('twlceod.master.viewhistory');
      };
   };

   this.extendDetailController = function (self, base, twlceod) {
      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlceod.whNum;
      };
   };
});

//Inquiry - EndOfDay (Item History)
app.controller('TwlceodViewHistoryCtrl', function ($scope, $state, $stateParams, DataService, MessageService, UserService) {
   var self = this;
   var base = $scope.base;

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();

   // End Of Day Records have a blank Company and Warehouse
   self.coNum = '';
   self.whNum = '';

   DataService.get('api/twl/astwlinquiry/geteodrunhistory', {
      busy: true
   }, function (data) {
      self.dataset = data;
   });

   self.isViewHistory = function () {
      return $state.is('twlceod.master.viewhistory');
   };

   self.returnToMaster = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + self.whNum;
   };
});