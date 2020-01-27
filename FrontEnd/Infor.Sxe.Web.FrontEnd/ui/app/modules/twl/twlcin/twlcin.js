'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlcin', {
      widgets: ['SEARCH'],
      params: {
         pk: '',
         pk2: ''
      }
   });
   StateProvider.addMasterState('twl', 'twlcin');

   $stateProvider.state('twlcin.detail', {
      url: '/detail?id',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcin/detail.json');
            },
            controller: 'TwlcinDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('twlcin.detail.inv-transactions', {
      url: '/transactions',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcin/invtransactions.json');
            },
            controller: 'TwlcinTransactionsInquiryCtrl as dtlt'
         }
      }
   });


   $stateProvider.state('twlcin.detail.inv-pending-movement', {
      url: '/pending-movement',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcin/invpendingmovement.json');
            },
            controller: 'TwlcinPendingMovementInquiryCtrl as dtlpm'
         }
      }
   });


   $stateProvider.state('twlcin.detail.inv-pending-replenishment', {
      url: '/pending-replenishment',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcin/invpendingreplenishment.json');
            },
            controller: 'TwlcinPendingReplenishmentInquiryCtrl as dtlpr'
         }
      }
   });


   $stateProvider.state('twlcin.detail.inv-pending-picks', {
      url: '/pending-picks',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcin/invpendingpicks.json');
            },
            controller: 'TwlcinPendingPicksInquiryCtrl as dtlpp'
         }
      }
   });


   $stateProvider.state('twlcin.detail.inv-serial-numbers', {
      url: '/serial-numbers',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcin/invpendingserial.json');
            },
            controller: 'TwlcinSerialNumbersInquiryCtrl as dtls'
         }
      }
   });

   $stateProvider.state('twlcin.detail.inv-receiving-labels', {
      url: '/print-receiving-labels',
      params: {
      },
      views: {
         subDetailViewContainer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlcin/invprintrcvglabels.json');
            },
            controller: 'TwlcinPrintReceivingLabels as dtllbl'
         }
      }
   });

});

app.controller('TwlcinBaseCtrl', function ($state, $stateParams, ConfigService, DataService, MessageService) {
   var self = this;
   self.maxLabels = -9;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.setSearchDefaults = function () {
      self.twlcinInDisplay = true;
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.statusCode = 'All';
      self.criteria.qtyCompareType = 1;
      self.criteria.cycleCntType = 1;
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      if (self.hyperLinkWhNum && self.hyperLinkAbsNum) {
         self.criteria.whNum = self.hyperLinkWhNum;
         self.criteria.absNum = self.hyperLinkAbsNum;
         self.hyperLinkAbsNum = '';
         self.hyperLinkWhNum = '';
         self.isHyperLinkSearch = true;
      }
   };

   self.isMaster = function () {
      return $state.is('twlcin.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlcin.master');
   };

   self.isDetail = function () {
      return $state.is('twlcin.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlcin.detail');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.hyperlinkToItemDetail = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.id && currentRow.itemRowID) {
         $state.go('twlci.detail', { id: currentRow.itemRowID});
      }
   };

   self.hyperlinkToLocationDetail = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.id) {
         $state.go('twlcl.detail', { pk2: currentRow.binNum, pk: currentRow.whNum });
      }
   };

   // Perform search and update data set for the grid
   self.search = function () {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      DataService.post('api/twl/astwlinquiry/getinventorylist', { data: self.criteria, busy: true }, function (outdata) {
         self.dataset = outdata.inventorylistresults;
         if (outdata.lMoreRecords) {
            MessageService.alert('global.record.count.limit.has.been.reached');
         }
      });
   };

   self.checkHyperlinkSearch = function () {
      if (self.isHyperLinkSearch) {
         self.isHyperLinkSearch = false;
         self.search();
      }
   };
});

app.controller('TwlcinSearchCtrl', function ($scope, $state, ConfigService, DataService, MessageService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Sets defaults in search tab
   base.userCoNum = UserService.getTwlCompany();
   base.userWhNum = UserService.getTwlWarehouse();
   base.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   base.empNum = UserService.getTwlUserId();

   self.statusCodeTypes = [
      { label: MessageService.get('global.all'), value: 'All' },
      { label: MessageService.get('global.available'), value: 'Available' },
      { label: MessageService.get('global.unavailable'), value: 'Unavailable' }
   ];

   self.comparisonTypes = [
      { label: MessageService.get('global.all'), value: 1 },
      { label: MessageService.get('>='), value: 2 },
      { label: MessageService.get('<='), value: 3 },
      { label: MessageService.get('='), value: 4 }
   ];

   self.cycleCountTypes = [
      { label: MessageService.get('global.all'), value: 1 },
      { label: MessageService.get('global.not.set'), value: 2 },
      { label: MessageService.get('global.set'), value: 3 }
   ];

   self.setDefaults = function () {
      base.setSearchDefaults();
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      self.setDefaults();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('twlcin.master');
      }

      base.search();
   };

   // When customer lookup value is selected, redirect to detail screen since we have the desired customer
   self.inventorySelected = function (args) {
      if (args.rowId) {
         $state.go('twlcin.detail', { id: args.rowId });
      }
   };

   //Initialize
   self.setDefaults();
   base.checkHyperlinkSearch();

});

app.controller('TwlcinMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.pk && $stateParams.pk2) {
      base.hyperLinkWhNum = $stateParams.pk;
      base.hyperLinkAbsNum = $stateParams.pk2;
      // perform the search if the screen is already in the user's display, otherwise the search code still has to run and will do this
      if (base.twlcinInDisplay) {
         base.setSearchDefaults();
      }
   }

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { id: record.inventoryRowID });
   };

});

app.controller('TwlcinDetailCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;

   DataService.post('api/twl/astwlinquiry/getinventorydetail', { data: { rowID: $stateParams.id }, busy: true }, function (data) {
      self.twlcin = data;
      self.twlcin.poNumberDisplay = '';
      if (twlcin.poNumber) {
         self.twlcin.poNumberDisplay = self.twlcin.poNumber.toUpperCase() + '-' + (twlcin.poSuffix ? this.pad(self.twlcin.poNumber, 2) : '00');
      }
   });

   self.showTransactions = function () {
      $state.go('^.detail.inv-transactions');
   };

   self.showPendingMovement = function () {
      $state.go('^.detail.inv-pending-movement');
   };

   self.showPendingReplenishment = function () {
      $state.go('^.detail.inv-pending-replenishment');
   };

   self.showPendingPicks = function () {
      $state.go('^.detail.inv-pending-picks');
   };

   self.showSerialNumbers = function () {
      $state.go('^.detail.inv-serial-numbers');
   };

   self.printReceivingLabels = function () {
      $state.go('^.detail.inv-receiving-labels');
   };

   self.getSubTitle = function () {
      if (self.twlcin) {
         return MessageService.get('global.warehouse') + ': ' + self.twlcin.whNum;
      } else {
         return '';
      }
   };

});

//Inquiry - Transaction Detail
app.controller('TwlcinTransactionsInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var twlcin = $scope.dtl.twlcin;

   //If the user hits refresh twlcin will be null, go back to detail window
   if (!twlcin) {
      $state.go('^');
   } else {
      DataService.post('api/twl/astwlinquiry/getinvtransactions', {
         data: {
            coNum: twlcin.coNum,
            whNum: twlcin.whNum,
            absNum: twlcin.absNum,
            binNum: twlcin.binNum
         },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailTransactions = function () {
      return $state.is('twlcin.detail.inv-transactions');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcin.whNum;
   };

});

//Inquiry - Pending Movement
app.controller('TwlcinPendingMovementInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var twlcin = $scope.dtl.twlcin;

   //If the user hits refresh twlcin will be null, go back to detail window
   if (!twlcin) {
      $state.go('^');
   } else {
      DataService.post('api/twl/astwlinquiry/getinvpendingmovement', {
         data: {
            coNum: twlcin.coNum,
            whNum: twlcin.whNum,
            absNum: twlcin.absNum,
            binNum: twlcin.binNum
         },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailPendingMovement = function () {
      return $state.is('twlcin.detail.inv-pending-movement');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcin.whNum;
   };

});

//Inquiry - Pending Replenishments
app.controller('TwlcinPendingReplenishmentInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var twlcin = $scope.dtl.twlcin;

   //If the user hits refresh twlcin will be null, go back to detail window
   if (!twlcin) {
      $state.go('^');
   } else {
      DataService.post('api/twl/astwlinquiry/getinvpendingrepl', {
         data: {
            coNum: twlcin.coNum,
            whNum: twlcin.whNum,
            absNum: twlcin.absNum,
            binNum: twlcin.binNum
         },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailPendingReplenishment = function () {
      return $state.is('twlcin.detail.inv-pending-replenishment');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcin.whNum;
   };

});

//Inquiry - Pending Picks
app.controller('TwlcinPendingPicksInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var totals = [];
   var base = $scope.base;
   var twlcin = $scope.dtl.twlcin;

   //If the user hits refresh twlcin will be null, go back to detail window
   if (!twlcin) {
      $state.go('^');
   } else {
      DataService.post('api/twl/astwlinquiry/getinvpendingpicks', {
         data: {
            coNum: twlcin.coNum,
            whNum: twlcin.whNum,
            absNum: twlcin.absNum,
            binNum: twlcin.binNum
         },
         busy: true
      }, function (data) {
         self.dataset = data.invpicks;
         self.totals = data.invpickssummary;
      });
   }

   self.isDetailPendingPicks = function () {
      return $state.is('twlcin.detail.inv-pending-picks');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcin.whNum;
   };

});

//Inquiry - Serial Numbers
app.controller('TwlcinSerialNumbersInquiryCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var twlcin = $scope.dtl.twlcin;

   //If the user hits refresh twlcin will be null, go back to detail window
   if (!twlcin) {
      $state.go('^');
   } else {
      DataService.post('api/twl/astwlinquiry/getinvserialnumbers', {
         data: {
            coNum: twlcin.coNum,
            whNum: twlcin.whNum,
            absNum: twlcin.absNum,
            binNum: twlcin.binNum,
            palletId: twlcin.palletId
         },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   }

   self.isDetailSerialNumbers = function () {
      return $state.is('twlcin.detail.inv-serial-numbers');
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcin.whNum;
   };

});

app.controller('TwlcinPrintReceivingLabels', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.SYSTEM_PARAMETER_MAXIMUMLABELS = 7505;

   var twlcin = $scope.dtl.twlcin;

   self.numberOfLabels = 1;

   self.changeLabelCount = function () {
      if (base.maxLabels === -9) {
         var getsyspaintegerCriteria = {
            pvTwlcompany: twlcin.coNum,
            pvTwlwarehouse: twlcin.whNum,
            pvParameterid: self.SYSTEM_PARAMETER_MAXIMUMLABELS
         };

         DataService.post('api/twl/astwlinquiry/getsyspainteger', { data: getsyspaintegerCriteria, busy: true }, function (resultMaxLabels) {
            if (resultMaxLabels > 0) {
               base.maxLabels = resultMaxLabels;
               if (self.numberOfLabels > base.maxLabels) {
                  MessageService.error('global.error', 'global.error.maximum.labels');
                  self.numberOfLabels = base.maxLabels;
               }
            }
            else {
               base.maxLabels = 0;
            }
         });
      } else if (base.maxLabels) {
         if (self.numberOfLabels > base.maxLabels) {
            MessageService.error('global.error', 'global.error.maximum.labels');
            self.numberOfLabels = base.maxLabels;
         }
      }
   };

   self.isDetailReceivingLabels = function () {
      return $state.is('twlcin.detail.inv-receiving-labels');
   };

   self.printLabels = function () {
      DataService.post('api/twl/astwladmin/printreceivinglabels', {
         data: {
            coNum: twlcin.coNum,
            whNum: twlcin.whNum,
            absNum: twlcin.absNum,
            binNum: twlcin.binNum,
            lot: twlcin.lot,
            printerId: self.printerId,
            quantity: self.numberOfLabels,
            empNum: base.empNum
         },
         busy: true
      }, function () {
         MessageService.info('global.information', 'message.operation.completed.successfully');
         $state.go('^');
      });
   };

   self.returnToDetail = function () {
      $state.go('^');
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + twlcin.whNum;
   };

});