'use strict';

app.config(function ($stateProvider, StateProvider, TWLCrossRefStateProvider) {


   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlci',
      dataPath: 'api/twl/astwlinquiry/getitemdetail',
      searchMethod: 'POST',
      searchPath: 'api/twl/astwlinquiry/getitemlist',
      searchResultsField: 'itemlist',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlci/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      primaryKeyParams: ['whNum', 'absNum'],
      recentlyVisited: {
         title: { label: 'global.item', value: 'absNum' },
         description: { label: null, value: 'itemDesc' }
      }
   });
   TWLCrossRefStateProvider.addStates('twl', 'twlci', 'twlci.detail');

   $stateProvider.state('twlci.detail.availableinventory', {
      url: '/available-inventory',
      params: {
         whNum: null,
         coNum: null,
         absNum: null,
         itemDesc: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/shared/available-inventory/available-inventory.json');
            },
            controller: 'TwlAvailableInventoryCtrl as dtlavailinv'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqunavail', {
      url: '/item-inquiry-unavailable',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqunavail.json');
            },
            controller: 'TwlciItemInqUnavailCtrl as dtlinqunavail'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqaltwhse', {
      url: '/item-inquiry-alternate-warehouses',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqaltwhse.json');
            },
            controller: 'TwlciItemInqAltWhseCtrl as dtlinqaltwhse'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqintransit', {
      url: '/item-inquiry-in-transit',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqintransit.json');
            },
            controller: 'TwlciItemInqInTransitCtrl as dtlinqintransit'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqoutord', {
      url: '/item-inquiry-outstanding-orders',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqoutord.json');
            },
            controller: 'TwlciItemInqOutOrdCtrl as dtlinqoutord'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqlot', {
      url: '/item-inquiry-lot',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqlot.json');
            },
            controller: 'TwlciItemInqLotCtrl as dtlinqlot'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqreserved', {
      url: '/item-inquiry-reserved',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqreserved.json');
            },
            controller: 'TwlciItemInqReservedCtrl as dtlinqreserved'
         }
      }
   });

   $stateProvider.state('twlci.detail.itemprimary', {
      url: '/item-primary',
      params: {
         twlci: null,
         returnState: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/itemprimary.json');
            },
            controller: 'TwlciItemPrimaryCtrl as dtlprimary'
         }
      }
   });

   $stateProvider.state('twlci.detail.itemkit', {
      url: '/item-kit',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/itemkit.json');
            },
            controller: 'TwlciItemKitCtrl as dtlkit'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqhistory', {
      url: '/item-inquiry-history',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqhistory.json');
            },
            controller: 'TwlciItemInqHistoryCtrl as dtlinqhistory'
         }
      }
   });

   $stateProvider.state('twlci.detail.iteminqtrans', {
      url: '/item-inquiry-transactions',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/iteminqtrans.json');
            },
            controller: 'TwlciItemInqTransCtrl as dtlinqtrans'
         }
      }
   });

   $stateProvider.state('twlci.detail.serialhistory', {
      url: '/serial-history',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/serialhistory.json');
            },
            controller: 'TwlciDetailSerialHistoryCtrl as dtlsh'
         }
      }
   });

   $stateProvider.state('twlci.detail.maintain-serials', {
      url: '/maintain-serials',
      params: {
         twlci: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlci/maintain-serials.json');
            },
            controller: 'TwlciMaintainSerialsCtrl as dtlserial'
         }
      }
   });

});

app.service('TwlciService', function ($state, ConfigService, DataService, GridService, MessageService, UserService, Utils) {

   // Custom Get for Detail Screen
   this.getRecord = function (self, base, stateParams) {
      var param = {
         rowID: stateParams.id,
         coNum: base.userCoNum,
         whNum: stateParams.pk,
         absNum: stateParams.pk2
      };
      return DataService.getResource('api/twl/astwlinquiry/getitemdetail', { data: param, method: 'POST' });
   };

   // Custom Create
   this.createRecord = function (self, base, twlci, $scope, saveCallback) {
      DataService.post('api/twl/astwlsetup/createitemdetail', { data: twlci }, function (data) {
         if (data) {
            saveCallback(data);
         }
      });
   };

   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, twlci, $scope, deleteCallback) {
      DataService.post('api/twl/astwlsetup/deleteitemdetail', { data: twlci }, function () {
         deleteCallback();
      });
   };

   // Custom Delete of Possible Multiple Records for Master Screen
   this.deleteMultiple = function (self, base, records, $scope, deleteCallback) {
      var rowIds = GridService.getSelectedRowIds(base.grid, 'rowID');
      rowIds.forEach(function (rowId) {
         DataService.post('api/twl/astwlsetup/deleteitemdetail', { data: { rowID: rowId } }, function () {
            deleteCallback();
         });
      });
   };

   // Custom Update of Detail Data
   this.updateRecord = function (self, base, twlci, $scope, saveCallback) {
      DataService.post('api/twl/astwlsetup/updateitemdetail', { data: twlci }, function () {
         saveCallback();
      });
   };

   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.refreshSearch = false;

      self.laborTypes = [
      { label: MessageService.get('global.default.parameter.2028'), value: '' },
      { label: MessageService.get('global.auto.ship'), value: 'A' },
      { label: MessageService.get('global.zero.ship'), value: 'Z' }
      ];

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };

      self.isDetailOrEdit = function () {
         return $state.is('twlci.detail') || $state.is('twlci.detail.edit');
      };

      self.isMaster = function () {
         return $state.is('twlci.master');
      };
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
      };
   };

   this.extendCreateController = function (self, base, twlci) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlci.coNum = base.criteriaUsed.coNum;
      twlci.whNum = base.criteriaUsed.whNum;

      twlci.rowStatus = true;
      twlci.absNum = '';
      twlci.itemDesc = '';
      twlci.itemSecDesc = '';
      twlci.itemLongDesc = '';
      twlci.itemUpc = '';
      twlci.itemType = 'S';
      twlci.prodGrp = '';
      twlci.uom = 'each';
      twlci.custCode = '';
      twlci.msdsSheet = '';
      twlci.msdsSheetBin = '';
      twlci.abc = 'D';

      if (twlci.whNum) {
         var params = {
            coNum: twlci.coNum,
            whNum: twlci.whNum
         };
         DataService.get('api/twl/whmst/getbypk', { params: params }, function (whmst) {
            if (whmst) {
               twlci.whZone = whmst.rcvZoneDefault;
            } else {
               twlci.whZone = '';
            }
         });
      }
   };

   this.extendDetailController = function (self, base, twlci) {

      self.showItemInqAvail = function () {
         $state.go('twlci.detail.availableinventory', {whNum: twlci.whNum, coNum: twlci.coNum, absNum: twlci.absNum, itemDesc: twlci.itemDesc });
      };

      self.primaryPick = function () {
         $state.go('twlci.detail.itemprimary', {returnState: $state.current.name });
      }

      self.crossRef = function () {
         $state.go('twlci.detail.twlcrossref', {
            calledFrom: 'twlci',
            coNum: twlci.coNum,
            whNum: twlci.whNum,
            absNum: twlci.absNum,
            vendorId: '',
            vendItem: '',
            vendName: '',
            returnState: $state.current.name
         });
      };

      self.showItemInqUnavail = function () {
         $state.go('twlci.detail.iteminqunavail');
      };

      self.showItemInqAltWhse = function () {
         $state.go('twlci.detail.iteminqaltwhse');
      };

      self.showItemInqInTransit = function () {
         $state.go('twlci.detail.iteminqintransit');
      };

      self.showItemInqOutOrders = function () {
         $state.go('twlci.detail.iteminqoutord');
      };

      self.showItemInqLots = function () {
         $state.go('twlci.detail.iteminqlot');
      };

      self.showItemInqReserved = function () {
         $state.go('twlci.detail.iteminqreserved');
      };

      self.showItemInqHistory = function () {
         $state.go('twlci.detail.iteminqhistory');
      };

      self.showItemInqTrans = function () {
         $state.go('twlci.detail.iteminqtrans');
      };

      self.maintainSerials = function () {
         $state.go('twlci.detail.maintain-serials');
      };

      self.showItemInqSerialHistory = function () {
         $state.go('twlci.detail.serialhistory');
      };

      self.changeQAInspection = function () {
         if (!twlci.qaInspection) {
            twlci.qaInstructions = '';
         }
      };

      self.changeSerial = function () {
         if (twlci.serialFlag === false && twlci.qtyOnHand) {
            MessageService.alertOk('global.alert', 'message.existing.serials.will.be.deleted.on.save.of.item');
         } else if (twlci.serialFlag === true && twlci.qtyOnHand) {
            MessageService.alertOk('global.alert', 'message.existing.serials.will.need.to.be.added.after.save.of.item');
         }
      };

      self.changeItemType = function () {
         // Remove labor A(auto ship) option if no longer a labor product,
         // Z(zero ship) is still a valid auto ship option for some weird reason
         if (twlci.itemType !== 'L' && twlci.laborAutoShip === 'A') {
            twlci.laborAutoShip = '';
         }
      };

      // The Cube needs to recalculate as the user changes height/width/depth
      self.calculateCube = function () {
         twlci.cube = twlci.length * twlci.width * twlci.height;
      };

      self.getSubTitle = function () {
         base.criteria.whNum = base.criteria.whNum !== twlci.whNum ? twlci.whNum : base.criteria.whNum;
         base.criteria.absNum = base.criteria.absNum !== twlci.absNum ? twlci.absNum : base.criteria.absNum;
         return MessageService.get('global.warehouse') + ': ' + twlci.whNum + ' | ' +
            MessageService.get('global.item') + ': ' + twlci.absNum;
      };
   };

   this.extendMasterController = function (self, base) {
      // Advanced search criteria object with initial values
      self.advCriteria = {
         coNum: base.userCoNum,
         whNum: base.userWhNum,
         recordlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'warehouse', label: MessageService.get('global.warehouse') },
         { value: 'absnum', label: MessageService.get('global.item.number') },
         { value: 'itemtype', label: MessageService.get('global.item.type') },
         { value: 'prodcat', label: MessageService.get('global.product.category') },
         { value: 'recordlimit', label: MessageService.get('global.record.limit') },
         { value: 'keyword', label: MessageService.get('global.keyword') },
         { value: 'glcode', label: MessageService.get('global.gl.code') },
         { value: 'trackingnum', label: MessageService.get('global.tracking.number') },
         { value: 'kit', label: MessageService.get('global.kit') },
         { value: 'upc', label: MessageService.get('global.upc') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['warehouse', 'recordlimit'];

      // Perform advanced search and update data set for the grid
      self.search = function () {
         var advCriteria = angular.copy(self.advCriteria);

         // Apply record limit (if cleared by user)
         if (!advCriteria.recordlimit) {
            advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
         }

         DataService.post('api/twl/astwlinquiry/getitemlist', { data: advCriteria, busy: true }, function (data) {
            base.criteriaUsed.coNum = advCriteria.coNum;
            base.criteriaUsed.whNum = advCriteria.whNum;
            base.dataset = data.itemlist;
         });
      };

   };
});


//Inquiry - Item Quantity Unavailable
app.controller('TwlciItemInqUnavailCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getitemunavaildetail', { data: params, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
      }
   });

   self.isItemInqUnavail = function () {
      return $state.is('twlci.detail.iteminqunavail');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };
});

//Inquiry - Item Alt Whse
app.controller('TwlciItemInqAltWhseCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getitemaltwhsedetail', { data: params, busy: true }, function (data) {
      if (data.itemaltwhse) {
         self.dataset = data.itemaltwhse;
      }
      if (data.itemaltwhsetot) {
         self.availQty = data.itemaltwhsetot.availQty;
         self.resvQty = data.itemaltwhsetot.resvQty;
         self.unavQty = data.itemaltwhsetot.unavQty;
         self.totQty = data.itemaltwhsetot.totQty;
      }
   });

   self.isItemInqAltWhse = function () {
      return $state.is('twlci.detail.iteminqaltwhse');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };
});

//Inquiry - Item In Transit
app.controller('TwlciItemInqInTransitCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getitemintransdetail', { data: params, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
      }
   });

   self.isItemInqInTransit = function () {
      return $state.is('twlci.detail.iteminqintransit');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };
});

//Inquiry - Item Outstanding Orders
app.controller('TwlciItemInqOutOrdCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getitemoutorddetail', { data: params, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
      }
   });

   self.isItemInqOutOrd = function () {
      return $state.is('twlci.detail.iteminqoutord');
   };

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.order) {
         $state.go('twlooi.detail', { pk: currentRow.order, pk2: currentRow.orderSuffix, pk3: self.coNum, pk4: self.whNum });
      }
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };
});

//Inquiry - Lots
app.controller('TwlciItemInqLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   self.statusTypes = [
      { label: MessageService.get('global.over.30.days.ago'), value: 'Over 30 Days Ago' },
      { label: MessageService.get('global.16.to.30.days.ago'), value: '16 to 30 Days Ago' },
      { label: MessageService.get('global.1.to.15.days.ago'), value: '1 To 15 Days Ago' },
      { label: MessageService.get('global.today'), value: 'Today' },
      { label: MessageService.get('global.1.to.15.days'), value: '1 To 15 Days' },
      { label: MessageService.get('global.16.to.30.days'), value: '16 to 30 Days' },
      { label: MessageService.get('global.over.30.days'), value: 'Over 30 Days' }
   ];

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getitemlotsummary', { data: params, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
         self.totals = data.itemlottotals;
      }
   });

   self.isItemInqLot = function () {
      return $state.is('twlci.detail.iteminqlot');
   };


   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };
});

//Inquiry - Item Reserved
app.controller('TwlciItemInqReservedCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getitemresvdetail', { data: params, busy: true }, function (data) {
      if (data) {
         self.dataset = data;
      }
   });

   self.isItemInqReserved = function () {
      return $state.is('twlci.detail.iteminqreserved');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };
});

//Item Primary Bins
app.controller('TwlciItemPrimaryCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.returnState = $stateParams.returnState;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      absNum: self.absNum
   };

   DataService.post('api/twl/astwlinquiry/getitemavaildetail', { data: params, busy: true }, function (data) {
      if (data.itemavailprime) {
         self.fullCase = data.itemavailprime.fullCase;
         self.splitCase = data.itemavailprime.splitCase;
         self.counter = data.itemavailprime.counter;
         self.pallet = data.itemavailprime.pallet;
      }
   });

   self.customPrimarySubmit = function () {
      var params = {
         coNum: self.coNum,
         whNum: self.whNum,
         absNum: self.absNum,
         fullCase: self.fullCase,
         splitCase: self.splitCase,
         counter: self.counter,
         pallet: self.pallet
      };

      DataService.post('api/twl/astwlsetup/updateitemprime', { data: params, busy: true }, function () {
         MessageService.info('global.information', 'message.saved.successfully');
      });
   };

   self.isItemPrimary = function () {
      return $state.is('twlci.detail.itemprimary');
      // Stay in Edit Mode?
   };

   self.returnToDetail = function () {
      $state.go(self.returnState);
   };
});

//Item Kit
app.controller('TwlciItemKitCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.kitNum = twlci.absNum;

   var params = {
      coNum: self.coNum,
      whNum: self.whNum,
      kitNum: self.kitNum
   };

   DataService.get('api/twl/kitmst/getbypk', { params: params, busy: true }, function (data) {
      if (data) {
         self.preBuilt = data.preBuilt;
         self.deptNum = data.deptNum;
         self.assemblyRequired = data.assemblyRequired;
         self.assemblyInstructions = data.assemblyInstructions;
      }
   });

   self.customKitSubmit = function () {
      var params = {
         coNum: self.coNum,
         whNum: self.whNum,
         kitNum: self.kitNum,
         preBuilt: self.preBuilt,
         deptNum: self.deptNum,
         assemblyRequired: self.assemblyRequired,
         assemblyInstructions: self.assemblyInstructions
      };

      DataService.post('api/twl/astwlsetup/updateitemkit', { data: params, busy: true }, function () {
         MessageService.info('global.information', 'message.saved.successfully');
      });
   };

   self.isItemKit = function () {
      return $state.is('twlci.detail.itemkit');
   };

   self.returnToDetail = function () {
      $state.go('^');
      // Stay in Edit Mode?
   };
});

//Inquiry - Item History
app.controller('TwlciItemInqHistoryCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;
   self.rangeType = 'day';

   self.itemInqHistApiCall = function () {
      var params = {
         coNum: self.coNum,
         whNum: self.whNum,
         absNum: self.absNum,
         rangeType: self.rangeType
      };

      DataService.post('api/twl/astwlinquiry/getitemhistorydetail', { data: params, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   self.isItemInqHistory = function () {
      return $state.is('twlci.detail.iteminqhistory');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   if (!twlci) {
      self.returnToDetail();
   } else {
      self.itemInqHistApiCall();
   }
});

//Inquiry - Item Transactions
app.controller('TwlciItemInqTransCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, Utils) {
   var self = this;
   var base = $scope.base;

   var twlci = $scope.dtl.twlci;

   self.coNum = twlci.coNum;
   self.whNum = twlci.whNum;
   self.absNum = twlci.absNum;

   self.recordcountlimit = ConfigService.getDefaultRecordLimit();
   self.todate = Utils.getCurrentDate();
   self.fromdate = Utils.addSubtractDaysToDate(self.todate, -6);
   self.fromtime = '00:00';
   self.totime = '23:59';

   self.searchTrans = function () {
      var params = {
         coNum: self.coNum,
         whNum: self.whNum,
         absNum: self.absNum,
         fromdate: self.fromdate,
         todate: self.todate,
         fromtime: self.fromtime,
         totime: self.totime,
         recordcountlimit: self.recordcountlimit
      };

      DataService.post('api/twl/astwlinquiry/getitemtransdetail', { data: params, busy: true }, function (data) {
         if (data) {
            self.dataset = data.itemtrans;
         }
      });
   };

   self.isItemInqTrans = function () {
      return $state.is('twlci.detail.iteminqtrans');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   self.searchTrans();

});

app.controller('TwlciMaintainSerialsCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService) {
   //dtlserial
   var self = this;

   //FIND SERIALS
   self.search = function () {
      var twlci = $scope.dtl.twlci;

      self.qtyTotalInInv = twlci.qtyTotalInInv;
      self.qtySerials = 0;

      self.subTitle = MessageService.get('global.warehouse') + ': ' + twlci.whNum + ' | ' +
               MessageService.get('global.item') + ': ' + twlci.absNum;

      self.newSerialNumber = '';

      self.newSerialRecord = {
         coNum: twlci.coNum,
         whNum: twlci.whNum,
         absNum: twlci.absNum,
         adjustType: '',
         binNum: '',
         order: '',
         orderSuffix: '',
         line: 0,
         lineSequence: 0,
         palletId: '',
         serialNum: self.newSerialNumber
      };

      var params = {
         coNum: twlci.coNum,
         whNum: twlci.whNum,
         absNum: twlci.absNum
      };

      DataService.get('api/twl/serial/listbycowhabsbinpalletcycleid', { params: params, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
            self.qtySerials = data.length;
         }
      });
   };

   //DELETE SERIALS
   self.deleteSerials = function () {
      var count = 0;
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var selectedSerials = GridService.getSelectedRecords(self.grid);
         count = selectedSerials.length;
         selectedSerials.forEach(function (row) {
            var getbypkCriteria = {
               coNum: row.coNum,
               whNum: row.whNum,
               serialNum: row.serialNum
            };

            DataService.get('api/twl/serial/getbypk', { params: getbypkCriteria, busy: true }, function (data) {
               if (data) {
                  DataService.delete('api/twl/serial', { data: data, busy: false }, function () {
                     count--;
                     self.qtySerials--;
                     //If we got thru all of them, then provide message and return.
                     if (count <= 0) {
                        MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                        self.search();
                     }
                  });
               } else {
                  //If the row isn't found, simply return.
                  self.search();
                  MessageService.info('global.information', 'message.operation.completed.successfully');
               }
            });
         });
      });
   };

   self.returnToItem = function () {
      // Compare DECIMAL inventory quantity to INTEGER serial quantity
      if (self.qtyTotalInInv !== self.qtySerials) {
         MessageService.okCancel('global.warning', 'warning.number.of.serials.does.not.match.inventory.quantity', function () {
            $state.go('^');
         });
      } else {
         $state.go('^');
      }
   };

   // NEW SERIALS MODAL
   self.addSerial = function () {
      ModalService.showModal('twl/twlci/new-serial.json', null, $scope, function (modal) {
         self.newSerialModal = modal;
         self.search();
      });
   };


   self.addSerialOkClicked = function () {
      self.newSerialRecord.serialNum = self.newSerialNumber;
      DataService.post('api/twl/serial', { data: self.newSerialRecord, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.newSerialNumber = '';
      });
   };

   self.addSerialCancelClicked = function () {
      self.newSerialModal.destroy();
      self.search();
   };

   //INITIAL SEARCH
   self.search();

});

app.controller('TwlciDetailSerialHistoryCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   //dtlsh
   var self = this;

   var twlci = $scope.dtl.twlci;

   self.subTitle = MessageService.get('global.warehouse') + ': ' + twlci.whNum + ' | ' +
            MessageService.get('global.item') + ': ' + twlci.absNum;

   var params = {
      coNum: twlci.coNum,
      whNum: twlci.whNum,
      absNum: twlci.absNum
   };

   DataService.post('api/twl/astwlinquiry/getserialhistory', { data: params, busy: true }, function (data) {
      self.dataset = data;
   });

   self.isSerialHistory = function () {
      return $state.is('twlci.detail.serialhistory');
   };

});
