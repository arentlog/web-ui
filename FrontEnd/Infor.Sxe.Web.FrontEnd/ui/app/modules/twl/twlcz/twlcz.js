'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcz',
      dataPath: 'api/twl/whzone',
      searchMethod: 'POST',
      searchPath: 'api/twl/whzone/gettwlzones',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlcz/create.json',
      postCreateState: '^.detail.edit',
      deleteMultipleMessage: ['twl.message.delete.zone.warning', 'question.are.you.sure.you.want.to.delete'],
      deleteRecordMessage: ['twl.message.delete.zone.warning', 'question.are.you.sure.you.want.to.delete'],
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: {
         title: { label: 'global.warehouse.zone', value: 'whZone' },
         description: { label: null, value: 'zoneDesc' }
      }
   });

   $stateProvider.state('twlcz.detail.detail-picks', {
      url: '/detail-picks',
      params: {
      },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcz/detail-picks.json');
            },
            controller: 'TwlczPicksAccountCtrl as dtlp'
         }
      }
   });

   $stateProvider.state('twlcz.detail.detail-inventory', {
      url: '/detail-inventory',
      params: {
      },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcz/detail-inventory.json');
            },
            controller: 'TwlczInventoryAccountCtrl as dtli'
         }
      }
   });

   $stateProvider.state('twlcz.detail.detail-locations', {
      url: '/detail-locations',
      params: {
      },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcz/detail-locations.json');
            },
            controller: 'TwlczLocationsAccountCtrl as dtlb'
         }
      }
   });

   $stateProvider.state('twlcz.detail.detail-replenishments', {
      url: '/detail-replenishments',
      params: {
      },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcz/detail-replenishments.json');
            },
            controller: 'TwlczReplenishmentsAccountCtrl as dtlr'
         }
      }
   });

});

app.service('TwlczService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {

      // Sets defaults in search tab
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;

      self.getSubTitle = function () {
         return (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };

      self.isDetailOrEdit = function () {
         return $state.is('twlcz.detail') || $state.is('twlcz.detail.edit');
      };

      self.isFourwall = false;
   };

   this.extendSearchController = function (self, base, criteria) {
      self.SYSTEM_PARAMETER_MAINTAINFOURWALL = 1038;

      self.clear = function () {
         // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
         Utils.clearObject(criteria);

         // Clear resets these defaults - need to set again
         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;

      };

       // Perform search and update data set for the grid
       self.submit = function () {

           // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
           // for more than just searching, and we need the used criteria (not the latest which the user might change)
           self.criteriaUsed = angular.copy(base.criteria);

           var getsyspalogicalCriteria = {
              pvTwlcompany: self.criteriaUsed.coNum,
              pvTwlwarehouse: self.criteriaUsed.whNum,
              pvParameterid: self.SYSTEM_PARAMETER_MAINTAINFOURWALL
           };

           DataService.post('api/twl/astwlinquiry/getsyspalogical', { data: getsyspalogicalCriteria, busy: true }, function (data) {
              if (data) {
                 self.isFourwall = data;
              }
              base.search();
         });
       };
   };

   this.extendCreateController = function (self, base, twlcz) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlcz.coNum = base.criteriaUsed.coNum;
      twlcz.whNum = base.criteriaUsed.whNum;

      //Mandatory fields are required by UI MT before getting to the Progress transaction logic
      twlcz.zoneType = 'R';  // regular
      twlcz.firstAisle = 1;
      twlcz.lastAisle = 1;

   };

   this.extendDetailController = function (self, base, twlcz, $scope) {

      // When the full twlas object has been resolved, then we want to set the watches
      twlcz.$promise.then(function () {

         $scope.$watch('dtl.twlcz.firstAisle', function (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
               if (newValue > twlcz.lastAisle) {
                  MessageService.info('global.information', 'twl.message.adjusting.last.aisle');
                  twlcz.lastAisle = newValue;
               }
            }
            else if (!newValue) {
               twlcz.firstAisle = 1;
            }
         });

         $scope.$watch('dtl.twlcz.lastAisle', function (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
               if (newValue < twlcz.firstAisle) {
                  MessageService.info('global.information', 'twl.message.adjusting.first.aisle');
                  twlcz.firstAisle = newValue;
               }
            }
            else if (!newValue) {
               twlcz.lastAisle = 1;
            }
         });

         $scope.$watch('dtl.twlcz.pickSequence', function (newValue, oldValue) {
            if (!newValue) {
               twlcz.lastAisle = oldValue;
            }
         });

         self.showInventory = function () {
            $state.go('.detail-inventory');
         };

         self.showLocations = function () {
            $state.go('.detail-locations');
         };

         self.showPicks = function () {
            $state.go('.detail-picks');
         };

         self.showReplenishments = function () {
            $state.go('.detail-replenishments');
         };

      });

      self.getSubTitle = function () {
         return (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) + ': ' + self.twlcz.whZone;
      };
   };
});

//Inquiry - Picks
app.controller('TwlczPicksAccountCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var twlcz = $scope.dtl.twlcz;

   //If the user hits refresh twlcz will be null, go back to detail window
   if (!twlcz) {
      $state.go('^');
   } else {
      self.coNum = twlcz.coNum;
      self.whNum = twlcz.whNum;
      self.whZone = twlcz.whZone;
      DataService.post('api/twl/pick/gettwlzones', { data: { coNum: self.coNum, whNum: self.whNum, whZone: self.whZone }, busy: true }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailPicks = function () {
      return $state.is('twlcz.detail.detail-picks');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcz.whNum + ' | ' +
         MessageService.get('global.warehouse.zone') + ': ' + twlcz.whZone;
   };
});

//Inquiry - Inventory
app.controller('TwlczInventoryAccountCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var twlcz = $scope.dtl.twlcz;

   //If the user hits refresh twlcz will be null, go back to detail window
   if (!twlcz) {
      $state.go('^');
   } else {
      self.coNum = twlcz.coNum;
      self.whNum = twlcz.whNum;
      self.whZone = twlcz.whZone;
      DataService.post('api/twl/astwlinquiry/getzoneinventory', {
         data: {
            coNum: self.coNum,
            whNum: self.whNum,
            whZone: self.whZone
         },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailInventory = function () {
      return $state.is('twlcz.detail.detail-inventory');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcz.whNum + ' | ' +
         MessageService.get('global.warehouse.zone') + ': ' + twlcz.whZone;
   };

   self.navigateToInventory = function (e, args) {
      var currentRowID = args[0].item.inventoryRowID;

      if (currentRowID) {
         $state.go('twlcin.detail', { id: currentRowID });
      }
   };
});

//Inquiry - Locations (Bins)
app.controller('TwlczLocationsAccountCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var twlcz = $scope.dtl.twlcz;

   //If the user hits refresh twlcz will be null, go back to detail window
   if (!twlcz) {
      $state.go('^');
   } else {
      self.coNum = twlcz.coNum;
      self.whNum = twlcz.whNum;
      self.whZone = twlcz.whZone;
      DataService.post('api/twl/astwlinquiry/getzonebins', {
         data: {
            coNum: self.coNum,
            whNum: self.whNum,
            whZone: self.whZone
         },
         busy: true
      }, function (data) {
         self.dataset = data.zonebins;
         self.summaryData = data.zonebinsummary;
      });
   }

   self.isDetailLocations = function () {
      return $state.is('twlcz.detail.detail-locations');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };



   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcz.whNum + ' | ' +
         MessageService.get('global.warehouse.zone') + ': ' + twlcz.whZone;
   };
});

//Inquiry - Replenishments
app.controller('TwlczReplenishmentsAccountCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.gridZoneDisplay = 'all';

   var twlcz = $scope.dtl.twlcz;

   self.zoneDisplayTypes = [
      { label: MessageService.get('global.to.zone'), value: 'to' },
      { label: MessageService.get('global.from.zone'), value: 'from' },
      { label: MessageService.get('global.all'), value: 'all' }
   ];

   //If the user hits refresh twlcz will be null, go back to detail window
   if (!twlcz) {
      $state.go('^');
   } else {
      self.coNum = twlcz.coNum;
      self.whNum = twlcz.whNum;
      self.whZone = twlcz.whZone;
      DataService.post('api/twl/astwlinquiry/getzonereplenishments', {
         data: {
            coNum: self.coNum,
            whNum: self.whNum,
            whZone: self.whZone
         },
         busy: true
      }, function (data) {
         self.dataset = data;
         self.fulldataset = data;
      });
   }

   self.isDetailReplenishments = function () {
      return $state.is('twlcz.detail.detail-replenishments');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcz.whNum + ' | ' +
         MessageService.get('global.warehouse.zone') + ': ' + twlcz.whZone;
   };

   self.changeZoneDisplay = function () {
      //Filter the dataset
      var workingZone = twlcz.whZone;
      if (self.gridZoneDisplay === 'to') {
         self.dataset = $filter('filter')(self.fulldataset, { 'zoneTo': workingZone });
      } else if (self.gridZoneDisplay === 'from') {
         self.dataset = $filter('filter')(self.fulldataset, { 'zoneFrom': workingZone });
      } else {
         self.dataset = self.fulldataset;
      }
   };

});