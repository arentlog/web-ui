'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlip', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlip');

   $stateProvider.state('twlip.detail', {
      url: '/detail',
      params: {
         id: null,
         pk: null,
         pk2: null,
         pk3: null,
         isShowPOTab: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlip/detail.json');
            },
            controller: 'TwlipDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('twlip.create', {
      url: '/create?pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlip/create.json');
            },
            controller: 'TwlipCreateCtrl as crt'
         }
      }
   });

   $stateProvider.state('twlip.podetail', {
      url: '/po-detail',
      params: { poRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlip/po-detail.json');
            },
            controller: 'TwlipPoDetailCtrl as podet'
         }
      }
   });

   $stateProvider.state('twlip.addpo', {
      url: '/add-po',
      params: {
         pk: null,
         pk2: null,
         pk3: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlip/add-po.json');
            },
            controller: 'TwlipAddPoCtrl as addpo'
         }
      }
   });
});

app.controller('TwlipBaseCtrl', function ($state, ConfigService, DataService, MessageService, SecurityService, UserService) {
   var self = this;
   self.criteria = { rowStatus: '', type: '' };
   self.SEARCHTYPE_RECEIPTTRANSACTION_NUMBER = 'RT';
   self.PACKINGLIST_REPORT = 'twlrin-rptrtpack';

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;
   self.userId = UserService.getTwlUserId();

   self.securityLevelReport = SecurityService.getSecurityLevel(self.PACKINGLIST_REPORT);

   self.criteriaUsed = {};

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlip.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlip.master');
   };

   self.isCreate = function () {
      return $state.is('twlip.create');
   };

   self.includesCreate = function () {
      return $state.includes('twlip.create');
   };

   self.isDetail = function () {
      return $state.is('twlip.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlip.detail');
   };

   self.isPoDetail = function () {
      return $state.is('twlip.podetail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.rowStatus = '';
      self.criteria.type = '';
   };

   // Perform search and update data set for the grid
   self.search = function () {

      self.criteriaUsed = angular.copy(self.criteria);

      var masterCriteria = {
         displayType: self.SEARCHTYPE_RECEIPTTRANSACTION_NUMBER,
         coNum: self.criteria.coNum,
         whNum: self.criteria.whNum,
         rtNum: self.criteria.rtNum,
         rowStatus: self.criteria.rowStatus,
         type: self.criteria.type,
         carrier: self.criteria.carrier,
         cargoControl: self.criteria.cargoControl,
         packingListOnly: true
      };

      DataService.post('api/twl/astwladmin/getreceipttransactionmaster', { data: masterCriteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwlipSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlip.master');
      }

      base.search();
   };
});

app.controller('TwlipMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   // Create new
   self.create = function () {
      $state.go('^.create', { pk: base.criteria.coNum, pk2: base.criteria.whNum });
   };

   self.drilldown = function (e, args) {
      var masterResult = args[0].item;
      if (masterResult) {
         $state.go('^.detail', { id: masterResult.rowID, isShowPOTab: false });
      }
   };

   self.deleteFromMaster = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      if (selectedRow) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         // Yes processing
         function () {
            var criteria = {
               coNum: selectedRow.coNum,
               whNum: selectedRow.whNum,
               rtNum: selectedRow.rtNum
            };
            DataService.post('api/twl/astwladmin/deletereceipttransaction', { data: criteria, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.search();
            });
         });
      }
   };

});

app.controller('TwlipCreateCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   //Passing in the keys since this View can be called from other functions directly (i.e. Receipt Inquiry 'TWLIR')
   var coNum = $stateParams.pk;
   var whNum = $stateParams.pk2;

   if (!base.criteriaUsed.coNum) {
      base.criteriaUsed.coNum = coNum;
   }

   if (!base.criteriaUsed.whNum) {
      base.criteriaUsed.whNum = whNum;
   }

   // Can only create in user's TWL warehouse
   self.rtmst = {
      coNum: base.criteriaUsed.coNum,
      whNum: base.criteriaUsed.whNum,
      rtNum: '',
      userID: base.userId
   };

   self.submit = function () {
      // Create Packing List and go to Detail State
      var cargoCriteria = {
         coNum: self.rtmst.coNum,
         whNum: self.rtmst.whNum,
         rtNum: self.rtmst.rtNum,
         cargoControl: self.rtmst.cargoControl
      };
      DataService.post('api/twl/astwladmin/packinglistvalidate', { data: cargoCriteria, busy: true }, function () {
         DataService.post('api/twl/astwladmin/packinglistcreate', { data: self.rtmst, busy: true }, function (data) {
            if (data) {
               $state.go('^.detail', { id: data.rtmstRowid });
            }
         });
      });
   };

});

app.controller('TwlipDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   function getPOData() {
      var poCriteria = {
         coNum: self.rtmst.coNum,
         whNum: self.rtmst.whNum,
         rtNum: self.rtmst.rtNum
      };

      DataService.post('api/twl/astwladmin/getpackinglistpo', { data: poCriteria, busy: true }, function (data) {
         self.dataset = data;
         if (data.length) {
            self.isPOAssigned = true;
         }
      });
   }

   // Will be true if drilled down to PO detail - return to Purchase Orders Tab
   if ($stateParams.isShowPOTab) {
      self.isShowPOTab = $stateParams.isShowPOTab;
   }

   // Get record (handle both id param and pk params for hyperlinks to this function)
   if ($stateParams.id) {
      self.rtmst = DataService.getResource('api/twl/rtmst/getbyrowid/' + $stateParams.id, { busy: true });
   }
   else if ($stateParams.pk) {
      var rtmstParams = {
         coNum: $stateParams.pk,
         whNum: $stateParams.pk2,
         rtNum: $stateParams.pk3
      };
      self.rtmst = DataService.getResource('api/twl/rtmst/getbypk', { params: rtmstParams, busy: true });
   }

   // After record has resolved...
   self.rtmst.$promise.then(function () {
      if (self.rtmst) {
         self.subTitle = self.rtmst.rt_num;
         self.packingListHeader = $translate.instant('global.receipt.transaction.number') + ': ' + self.rtmst.rtNum;
         self.rtmst.planned = !self.rtmst.unplanned;
         self.rtmst.isUpdateAllowed = true;
         if (self.rtmst.rowStatus.toUpperCase() === 'C') {
            self.rtmst.isUpdateAllowed = false;
         }

         self.dataset = [];

         getPOData();
      }
   });

   // Save on Header Tab
   self.submit = function () {
      var cargoCriteria = {
         coNum: self.rtmst.coNum,
         whNum: self.rtmst.whNum,
         rtNum: self.rtmst.rtNum,
         cargoControl: self.rtmst.cargoControl
      };
      DataService.post('api/twl/astwladmin/packinglistvalidate', { data: cargoCriteria, busy: true }, function () {
         self.rtmst.unplanned = !self.rtmst.planned;
         DataService.update('api/twl/rtmst', { data: self.rtmst, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         });
      });
   };

   self.drilldown = function (e, args) {
      var poRecord = args[0].item;
      if (poRecord) {
         $state.go('^.podetail', { poRecord: poRecord });
      }
   };

   self.back = function () {
      $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
   };

   self.newPOClick = function () {
      $state.go('twlip.addpo', { pk: self.rtmst.coNum, pk2: self.rtmst.whNum, pk3: self.rtmst.rtNum });
   };

   self.plannedChanged = function () {
      if (self.rtmst.planned) {
         self.rtmst.clearanceRequired = false;
      }
   };

   self.deletePO = function () {
      var selectedRow = GridService.getSelectedRecord(self.grid);
      if (selectedRow) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         // Yes processing
         function () {
            var deleteCriteria = {
               coNum: selectedRow.coNum,
               whNum: selectedRow.whNum,
               rtId: selectedRow.rtId,
               poNum: selectedRow.poNumber,
               poSuffix: selectedRow.poSuffix
            };
            DataService.post('api/twl/astwladmin/packinglistdeletepo', { data: deleteCriteria, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               getPOData();
            });
         });
      }
   };
   self.packListPrint = function () {
      if (base.securityLevelReport <= 1) {
         MessageService.error('global.error', 'message.minimum.security.level.not.setup.for.operator');
      } else {
         $state.go('twlrin-rptrtpack', {});
      }
   };

});

app.controller('TwlipPoDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, $translate) {
   var self = this;

   self.poRecord = $stateParams.poRecord;
   self.poHeader = $translate.instant('global.purchase.order.number') + ': ' + self.poRecord.poNumber + '-' +
                     self.poRecord.poSuffix;

   self.poLinesGrid = {};
   self.datasetPoLines = [];

   self.poInit = function () {

      self.datasetPoLines = [];

      var poParams = {
         coNum: self.poRecord.coNum,
         whNum: self.poRecord.whNum,
         rtId: self.poRecord.rtId,
         poNumber: self.poRecord.poNumber,
         poSuffix: self.poRecord.poSuffix
      };

      DataService.post('api/twl/astwladmin/getpolinedetail', { data: poParams, busy: true }, function (data) {
         if (data) {
            self.datasetPoLines = data;
         }
      });
   };

   self.back = function () {
      $state.go('^.detail', {pk: self.poRecord.coNum, pk2: self.poRecord.whNum, pk3: self.poRecord.rtNum, isShowPOTab: true });
   };

   self.poInit();
});

app.controller('TwlipAddPoCtrl', function ($scope, $state, $stateParams, DataService, MessageService, $translate) {
   var self = this;
   var base = $scope.base;

   self.DOCUMENT_DELIMITER = '-';

   self.twlipaddpo = {};
   self.twlipaddpo.coNum = $stateParams.pk;
   self.twlipaddpo.whNum = $stateParams.pk2;
   self.twlipaddpo.rtNum = $stateParams.pk3;
   self.twlipaddpo.mixvendorokfl = false;

   self.addPOHeader = $translate.instant('global.receipt.transaction.number') + ': ' + self.twlipaddpo.rtNum;

   self.back = function () {
      $state.go('^.detail', { pk: self.twlipaddpo.coNum, pk2: self.twlipaddpo.whNum, pk3: self.twlipaddpo.rtNum, isShowPOTab: true });
   };

   //Break the PO Number apart.
   self.poOrderSelected = function (args) {
      // In TWL, these are always strings
      if (args.value) {
         var orderParts = args.value.split(self.DOCUMENT_DELIMITER);
         if (orderParts.length === 2) {
            self.twlipaddpo.poNumber = orderParts[0];
            self.twlipaddpo.poSuffix = orderParts[1];
         } else {
            self.twlipaddpo.poNumber = args.value;
            self.twlipaddpo.poSuffix = '';
         }
      } else {
         self.twlipaddpo.poNumber = '';
         self.twlipaddpo.poSuffix = '';
      }
   };

   self.submit = function () {

      var addParams = {
         coNum: self.twlipaddpo.coNum,
         whNum: self.twlipaddpo.whNum,
         rtNum: self.twlipaddpo.rtNum,
         poNum: self.twlipaddpo.poNumber,
         poSuffix: self.twlipaddpo.poSuffix,
         mixvendorokfl: self.twlipaddpo.mixvendorokfl,
         userID: base.userId
      };
      DataService.post('api/twl/astwladmin/packinglistaddpo', { data: addParams, busy: true }, function (data) {
         if (data) {
            if (data.length) {
               var question = MessageService.getQuestionMessages(data);
               if (question) {
                  MessageService.yesNo('global.confirmation', question, function () {  //yes
                     self.twlipaddpo.mixvendorokfl = true;
                     self.submit();
                  });
               }
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('^.detail', { pk: self.twlipaddpo.coNum, pk2: self.twlipaddpo.whNum, pk3: self.twlipaddpo.rtNum, isShowPOTab: true });
            }
         }
      });
   };
});