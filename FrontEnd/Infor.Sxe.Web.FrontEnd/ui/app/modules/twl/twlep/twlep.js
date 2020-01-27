'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlep', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlep');

   $stateProvider.state('twlep.master.physicalerrors', {
      url: '/physical-errors',
      params: {
      },
      views: {
         physErrorsViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlep/physicalerrors.json');
            },
            controller: 'TwlepPhysicalErrorsCtrl as dtlpe'
         }
      }
   });

   $stateProvider.state('twlep.master.uncountedlocations', {
      url: '/uncounted-locations',
      params: {
      },
      views: {
         uncountedLocationsContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlep/uncountedlocations.json');
            },
            controller: 'TwlepUncountedLocationsCtrl as dtlul'
         }
      }
   });

   $stateProvider.state('twlep.master.uncountedinventory', {
      url: '/uncounted-inventory',
      params: {
      },
      views: {
         uncountedInventoryContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlep/uncountedinventory.json');
            },
            controller: 'TwlepUncountedInventoryCtrl as dtlui'
         }
      }
   });

   $stateProvider.state('twlep.master.discrepancylocations', {
      url: '/discrepancy-locations',
      params: {
      },
      views: {
         discrepancyLocationsContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlep/discrepancylocations.json');
            },
            controller: 'TwlepDiscrepancyLocationsCtrl as dtldl'
         }
      }
   });

   $stateProvider.state('twlep.master.discrepancyinventory', {
      url: '/discrepancy-inventory',
      params: {
      },
      views: {
         discrepancyInventoryContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlep/discrepancyinventory.json');
            },
            controller: 'TwlepDiscrepancyInventoryCtrl as dtldi'
         }
      }
   });

   $stateProvider.state('twlep.master.discrepancyzonelocations', {
      url: '/discrepancy-zone-locations',
      params: {
      },
      views: {
         discrepancyZoneLocationsContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlep/discrepancyzonelocations.json');
            },
            controller: 'TwlepDiscrepancyZoneLocationsCtrl as dtldzl'
         }
      }
   });

   $stateProvider.state('twlep.master.notactivelocations', {
      url: '/not-active-locations',
      params: {
      },
      views: {
         notActiveLocationsContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlep/notactivelocations.json');
            },
            controller: 'TwlepNotActiveLocationsCtrl as dtlnal'
         }
      }
   });

});

app.controller('TwlepBaseCtrl', function ($state, $translate, DataService, MessageService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.isMaster = function () {
      return $state.is('twlep.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlep.master');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.twlep = {};
      self.statusLabel = '';
      self.message = '';

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwladmin/physicalinventorystatus', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.twlep = data;
            self.statusLabel = (data.physStatus === 'In Progress') ? MessageService.get('global.in.progress') : ((data.physStatus === 'Activated') ? MessageService.get('global.activated') : data.physStatus);
            if (!data.isPhysical) {
               MessageService.alert('global.alert','message.physical.inventory.not.enabled');
            }
            else if (self.twlep.isDeactivated) {
               MessageService.alert('global.alert','message.physical.inventory.deactivated');
            }
            else {
               DataService.post('api/twl/astwladmin/physicalinventorystatuscontinued', { data: self.twlep, busy: true }, function (data) {
                  if (data) {
                     self.twlep = data.physinvsummary;
                     self.physinv = data.physinv;
                  }
               });
            }
         }
      });
   };

   self.setPhysical = function () {
      MessageService.yesNo('global.question', ($translate.instant('question.physical.inventory.set')), function () {
         self.message = MessageService.get('message.physical.set.initiated');
         DataService.post('api/twl/astwladmin/physicalinventoryset', { data: self.criteriaUsed, busy: true }, function (data) {
            if (data) {
               if (data.is_pallet_error)
               {
                  self.message = MessageService.get('message.physical.inventory.not.enabled');
                  MessageService.error('global.error', 'message.physical.set.pallet.issue');
                  self.twlep.physinvseterror = data.physinvseterror;
                  self.showPhysicalErrors();
               }
               else {
                  $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
               }
            }
         });
      });
   };

   self.finishPhysicalInit = function () {
      MessageService.yesNo('global.question', ($translate.instant('question.physical.inventory.close.init')), function () {
         self.message = MessageService.get('message.physical.close.check.initiated');
         DataService.post('api/twl/astwladmin/physicalinventorycloseinit', { data: self.twlep, busy: true }, function (data) {
            if (data) {
               self.twlep = data.physinvsummary;
               if (!data.is_ready) {
                  MessageService.yesNo('global.question', ($translate.instant('question.physical.inventory.close.quantity.left')), function () {
                     self.finishPhysical();
                  });
               }
               else {
                  self.finishPhysical();
               }
            }
         });
      });
   };

   self.finishPhysical = function () {
      self.message = MessageService.get('message.physical.close.initiated');
      DataService.post('api/twl/astwladmin/physicalinventoryclose', { data: self.twlep, busy: true },
         function () {
            MessageService.info('global.information', 'message.operation.completed.successfully');
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         });
   };


   self.showPhysicalErrors = function () {
      $state.go('twlep.master.physicalerrors');
   };

   self.showUncountedLocations = function () {
      $state.go('twlep.master.uncountedlocations');
   };

   self.showUncountedInventory = function () {
      $state.go('twlep.master.uncountedinventory');
   };

   self.showDiscrepancyLocations = function () {
      $state.go('twlep.master.discrepancylocations');
   };

   self.showDiscrepancyInventory = function () {
      $state.go('twlep.master.discrepancyinventory');
   };

   self.showDiscrepancyZoneLocations = function () {
      $state.go('twlep.master.discrepancyzonelocations');
   };

   self.showNotActiveLocations = function () {
      $state.go('twlep.master.notactivelocations');
   };

   self.reportPhysInvSummary = function () {
      $state.go('twlrinv-rptphin1', { });
   };

   self.reportPhysInvVal = function () {
      $state.go('twlrinv-rptphyval', { });
   };

   self.reportPhysInvVar = function () {
      $state.go('twlrinv-rptphyv', { });
   };

   self.reportPhysTransactions = function () {
      $state.go('twlrinv-rptphtr', { });
   };

   self.reportPhysUncountedInventory = function () {
      $state.go('twlrinv-rptphyuncinv', { });
   };

   self.reportPhysUncountedTransactions = function () {
      $state.go('twlrinv-rptphyunc', { });
   };

});

app.controller('TwlepSearchCtrl', function ($scope, $state, DataService, MessageService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Sets defaults in search tab
   base.userCoNum = UserService.getTwlCompany();
   base.userWhNum = UserService.getTwlWarehouse();
   base.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();

   self.setDefaults = function () {
      base.criteria.coNum = base.userCoNum;
      base.criteria.whNum = base.userWhNum;
   };

   self.setDefaults();

   self.clear = function () {
      // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
      Utils.clearObject(criteria);
      self.setDefaults();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twlep.master');
      }

      base.search();
   };
});


app.controller('TwlepMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('TwlepPhysicalErrorsCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.subtitle = base.getSubTitle() + ' | ' + Date();

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.twlep.physinvseterror) {
      base.search();
   } else {
      self.dataset = base.twlep.physinvseterror;
   }

   self.isDetailPhysicalError = function () {
      return $state.is('twlep.master.physicalerrors');
   };

   self.returnToMaster = function () {
      return $state.go('twlep.master');
   };

});

app.controller('TwlepUncountedLocationsCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.criteriaUsed.coNum) {
      $state.go('twlep.master', { refreshSearch: true }, { reload: '^.master' });
   } else {
      DataService.post('api/twl/astwlinquiry/getphysinvuncountedlocations', {
         data: base.twlep,
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailUncountedLocations = function () {
      return $state.is('twlep.master.uncountedlocations');
   };

   self.returnToMaster = function () {
      return $state.go('twlep.master');
   };

});

app.controller('TwlepUncountedInventoryCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.criteriaUsed.coNum) {
      $state.go('twlep.master', { refreshSearch: true }, { reload: '^.master'});
   } else {
      DataService.post('api/twl/astwlinquiry/getphysinvuncountedinventory', {
         data: base.twlep,
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailUncountedInventory = function () {
      return $state.is('twlep.master.uncountedinventory');
   };

   self.returnToMaster = function () {
      return $state.go('twlep.master');
   };

});

app.controller('TwlepDiscrepancyLocationsCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.physinv) {
      $state.go('twlep.master');
   } else {
      DataService.post('api/twl/astwlinquiry/getphysinvdisclocations', {
         data: base.physinv,
         busy: true
      }, function (data) {
         self.dataset = data.physinvdisclocresults;
         self.countlocations = data.countlocations;
      });
   }

   self.isDetailDiscrepancyLocations = function () {
      return $state.is('twlep.master.discrepancylocations');
   };

   self.returnToMaster = function () {
      return $state.go('twlep.master');
   };

});

app.controller('TwlepDiscrepancyInventoryCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.physinv) {
      $state.go('twlep.master');
   } else {
      DataService.post('api/twl/astwlinquiry/getphysinvdiscinventory', {
         data: base.physinv,
         busy: true
      }, function (data) {
         self.dataset = data.physinvdiscinvresults;
         self.countlocations = data.countlocations;
      });
   }

   self.isDetailDiscrepancyInventory = function () {
      return $state.is('twlep.master.discrepancyinventory');
   };

   self.returnToMaster = function () {
      return $state.go('twlep.master');
   };

});

app.controller('TwlepDiscrepancyZoneLocationsCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   self.countitems = 0;
   var base = $scope.base;

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.criteriaUsed.coNum) {
      $state.go('twlep.master', { refreshSearch: true }, { reload: '^.master' });
   } else {
      self.dataset = $filter('filter')(base.physinv, { 'zoneType': 'D' });
      self.countitems = self.dataset.length;
   }

   self.isDetailDiscrepancyZoneLocations = function () {
      return $state.is('twlep.master.discrepancyzonelocations');
   };

   self.returnToMaster = function () {
      return $state.go('twlep.master');
   };

});

app.controller('TwlepNotActiveLocationsCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   self.countlocations = 0;
   var base = $scope.base;

   //If the user hits refresh twleci will be null, go back to detail window
   if (!base.criteriaUsed.coNum) {
      $state.go('twlep.master', { refreshSearch: true }, { reload: '^.master' });
   } else {
      DataService.post('api/twl/binmst/gettwlbinsnotactive', { data: base.criteria, busy: true }, function (data) {
         self.dataset = data;
         self.countlocations = self.dataset.length;
      });
   }

   self.isDetailNotActiveLocations = function () {
      return $state.is('twlep.master.notactivelocations');
   };

   self.returnToMaster = function () {
      return $state.go('twlep.master');
   };

});