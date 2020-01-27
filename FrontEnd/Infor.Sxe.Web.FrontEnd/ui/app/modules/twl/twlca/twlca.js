'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlca',
      dataPath: 'api/twl/invadj',
      searchMethod: 'POST',
      searchPath: 'api/twl/invadj/gettwlinvadjustments',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlca/create.json',
      postCreateState: '^.detail.edit',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.adjustment.code', value: 'adjCode' }
      ],
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });

   $stateProvider.state('twlca.master.transtypelist', {
      url: '/transaction-type-list',
      params: {
         twlca: null
      },
      views: {
         masterExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlca/transtypelist.json');
            },
            controller: 'TwlcaTransTypeListMstCtrl as msttranstypelist'
         }
      }
   });
});

app.service('TwlcaService', function ($state, DataService, MessageService, UserService, Utils) {

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

      self.isMaster = function () {
         return $state.is('twlca.master');
      };
   };

   this.extendDetailController = function (self, base, twlca) {
      self.customSubmit = function () {
         if (Array.isArray(twlca.status1)) {
            twlca.status1 = twlca.status1.join();
         }
         if (Array.isArray(twlca.status2)) {
            twlca.status2 = twlca.status2.join();
         }

         self.submit();
      };

      self.customDelete = function () {
         if (Array.isArray(twlca.status1)) {
            twlca.status1 = twlca.status1.join();
         }
         if (Array.isArray(twlca.status2)) {
            twlca.status2 = twlca.status2.join();
         }

         self.delete();
      };

      // Load Multi Select Status once object is created
      twlca.$promise.then(function () {
         twlca.status1 = twlca.status1.split(',');
         twlca.status2 = twlca.status2.split(',');
      });
   };

   this.extendMasterController = function (self) {
      self.showTransTypeList = function () {
         $state.go('twlca.master.transtypelist');
      };
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
      };
   };

   this.extendCreateController = function (self, base, twlca) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlca.coNum = base.criteriaUsed.coNum;
      twlca.whNum = base.criteriaUsed.whNum;

      twlca.adjCode = '';
      twlca.adjDesc = '';
   };
});

app.controller('TwlcaTransTypeListMstCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   self.isTransTypeList = function () {
      return $state.is('twlca.master.transtypelist');
   };

   self.returnToMaster = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   self.transTypeListApiCall = function () {
      DataService.post('api/twl/transtype/gettwltranstypes', {
         data: { tranTypes: '' },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   };

   //If the user hits refresh twlca will be null, go back to detail window
   if (!base) {
      self.returnToMaster();
   } else {
      self.transTypeListApiCall();
   }
});