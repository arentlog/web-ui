'use strict';

app.config(function ($stateProvider, StateProvider, TWLCrossRefStateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twliv',
      dataPath: 'api/twl/venmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/astwlinquiry/getvendorlist',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'getvendorresults',
      resultsRowIdField: 'venmstrowid',
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.vendor', value: 'vendorId' }
      ],
      recentlyVisited: null
   });
   $stateProvider.state('twliv.detail.barcode', {
      url: '/barcode',
      params: {
         coNum: null,
         whNum: null,
         vendorId: null,
         vendName: null,
         returnState: null
      },
      views: {
         barcode: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twliv/barcode.json');
            },
            controller: 'TwlivBarcodeCtrl as bc'
         }
      }
   });
   $stateProvider.state('twliv.detail.barcode.create', {
      url: '/create',
      views: {
         bcDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twliv/barcode-detail.json');
            },
            controller: 'TwlivBarcodeCreateCtrl as bcd'
         }
      }
   });
   $stateProvider.state('twliv.detail.barcode.detail', {
      url: '/detail',
      params: { barcodedtl: null },
      views: {
         bcDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twliv/barcode-detail.json');
            },
            controller: 'TwlivBarcodeDetailCtrl as bcd'
         }
      }
   });
   $stateProvider.state('twliv.detail.shipfrom', {
      url: '/ship-from',
      params: {
         coNum: null,
         whNum: null,
         vendorId: null,
         vendName: null,
         returnState: null
      },
      views: {
         shipfrom: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twliv/shipfrom.json');
            },
            controller: 'TwlivShipfromCtrl as sf'
         }
      }
   });
   $stateProvider.state('twliv.detail.shipfrom.detail', {
      url: '/detail',
      params: { vendaddr: null },
      views: {
         sfDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twliv/shipfrom-detail.json');
            },
            controller: 'TwlivShipfromDetailCtrl as sfd'
         }
      }
   });
   TWLCrossRefStateProvider.addStates('twl', 'twliv', 'twliv.detail');
});

app.service('TwlivService', function ($state, DataService, MessageService, UserService, Utils) {
   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.userId = UserService.getTwlUserId();

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
   this.extendDetailController = function (self, base, venmst) {

      self.barCodeClicked = function () {
         $state.go('twliv.detail.barcode', {
            coNum: venmst.coNum,
            whNum: venmst.whNum,
            vendorId: venmst.vendorId,
            vendName: venmst.vendName,
            returnState: $state.current.name
         });
      };

      self.shipFromClicked = function () {
         $state.go('twliv.detail.shipfrom', {
            coNum: venmst.coNum,
            whNum: venmst.whNum,
            vendorId: venmst.vendorId,
            vendName: venmst.vendName,
            returnState: $state.current.name
         });
      };

      self.crossRefClicked = function () {
         $state.go('twliv.detail.twlcrossref', {
            calledFrom: 'twliv',
            coNum: venmst.coNum,
            whNum: venmst.whNum,
            vendorId: venmst.vendorId,
            vendName: venmst.vendName,
            absNum: '',
            vendItem: '',
            returnState: $state.current.name
         });

      };

      venmst.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (venmst.contactName === 'GDPR Restricted Data' || venmst.contactName === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }
      });

   };
});

app.controller('TwlivBarcodeCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, ModalService) {
   //bc
   var self = this;

   self.criteria = {
      coNum: $stateParams.coNum,
      whNum: $stateParams.whNum,
      vendorId: $stateParams.vendorId,
      vendName: $stateParams.vendName,
      testString: ''
   };

   // This is needed so we can hide other views appropriately
   self.isTwlivBarcodeMaster = function () {
      return $state.current.name.endsWith('.barcode');
   };
   self.isTwlivBarcodeCreate = function () {
      return $state.current.name.endsWith('.create');
   };

   self.searchBarcode = function () {
      if (self.criteria.barcodeId) {
         DataService.post('api/twl/astwlsetup/getbarcodedetail', { data: self.criteria, busy: true }, function (data) {
            data.forEach(function (record) {
               record.testResults = self.criteria.testString.substr(record.valueStart - 1, record.valueLength);
            });
            self.dataset = data;
         });
      }
   };

   self.getBarcodeIds = function () {
      self.barcodeTemplates = [];
      DataService.post('api/twl/astwlsetup/getbarcodeid', { data: self.criteria, busy: true }, function (data) {
         data.forEach(function (record) {
            self.barcodeTemplates.push({
               descrip: record.barcodeId,
               type: record.barcodeId
            });
         });
         if (self.barcodeTemplates.length > 0 && !self.criteria.barcodeId) {
            self.criteria.barcodeId = self.barcodeTemplates[0].type;
            self.searchBarcode();
         }
      });
   };

   if (self.criteria.coNum && self.criteria.whNum) {
      self.getBarcodeIds();
   }

   self.barcodeIdChanged = function () {
      self.criteria.testString = '';
      self.searchBarcode();
   };

   self.create = function () {
      if (self.criteria.barcodeId) {
         $state.go('.create');
      } else {
         MessageService.error('global.error', 'message.barcode.template.must.be.selected');
      }
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         $state.go('.detail', { barcodedtl: record });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.detail', { barcodedtl: record });
   };

   self.deleteAll = function () {
      if (self.criteria.barcodeId) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete.this.barcode.template', function () {
            var params = {
               coNum: self.criteria.coNum,
               whNum: self.criteria.whNum,
               vendorId: self.criteria.vendorId,
               barcodeId: self.criteria.barcodeId
            };
            DataService.get('api/twl/barcodemst/getbypk', { params: params, busy: true }, function (data) {
               DataService.delete('api/twl/barcodemst', { data: data, busy: true }, function () { //ignore jslint - identifier expected
                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  self.getBarcodeIds();
               });
            });
         });
      }
   };

   self.delete = function () { //ignore jslint - identifier expected
      var rowIds = GridService.getSelectedRowIds(self.grid, 'barcodedtlrowid');

      // Proceed if any rows are selected
      if (rowIds.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            DataService.delete('api/twl/barcodedtl/deletelistbyrowids', { data: rowIds, busy: true }, function () { //ignore jslint - identifier expected
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               self.searchBarcode();
            });
         });
      }
   };

   self.createNew = function () {
      ModalService.showModal('twl/twliv/barcode-id-new.json', 'TwlivBarcodeNewCtrl as bcnew', $scope, function (modal) {
         self.newBarCode = modal;
      });
   };

   self.testBarcode = function () {
      ModalService.showModal('twl/twliv/barcode-test.json', 'TwlivBarcodeTestCtrl as bctest', $scope, function (modal) {
         self.testBarCode = modal;
      });
   };

   self.createReturned = function (barcodeId) {
      var createData = {
         coNum: self.criteria.coNum,
         whNum: self.criteria.whNum,
         vendorId: self.criteria.vendorId,
         barcodeId: barcodeId
      };
      DataService.create('api/twl/barcodemst', { data: createData, busy: true }, function () {
         self.getBarcodeIds();
      });
   };

   self.testReturned = function (barcodeTest) {
      self.criteria.testString = barcodeTest;
      self.searchBarcode();
   };

   self.clearTest = function () {
      self.criteria.testString = '';
      self.searchBarcode();
   };

   self.back = function () {
      $state.go($stateParams.returnState);
   };

});

//Modal to create a new barcode id
app.controller('TwlivBarcodeNewCtrl', function ($scope) {
   //bcnew
   var self = this;
   var bc = $scope.bc;

   // Cancel action
   self.cancel = function () {
      bc.newBarCode.destroy();
   };

   // Submit action
   self.submit = function () {
      bc.createReturned(self.barcodeId);
      bc.newBarCode.destroy();
   };
});

//Modal to test a barcode
app.controller('TwlivBarcodeTestCtrl', function ($scope) {
   //bctest
   var self = this;
   var bc = $scope.bc;

   // Cancel action
   self.cancel = function () {
      bc.testBarCode.destroy();
   };

   // Submit action
   self.submit = function () {
      bc.testReturned(self.barcodeTest);
      bc.testBarCode.destroy();
   };
});

//Separate View used for Update mode.
app.controller('TwlivBarcodeDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   //bcd
   var self = this;
   var bc = $scope.bc;
   var rowID = $stateParams.barcodedtl.barcodedtlrowid;

   DataService.get('api/twl/barcodedtl/getbyrowid/' + rowID, { busy: true }, function (data) {
      self.barcodedtl = data;
   });

   self.getSubTitle = function () {
      return MessageService.get('global.barcode.template.id') + ': ' + (bc.criteria.barcodeId);
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      DataService.put('api/twl/barcodedtl', { data: self.barcodedtl, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         bc.searchBarcode();
      });
   };
});

//Separate View used for Create mode.
app.controller('TwlivBarcodeCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   //bcd
   var self = this;
   var bc = $scope.bc;

   self.barcodedtl = {
      coNum: bc.criteria.coNum,
      whNum: bc.criteria.whNum,
      vendorId: bc.criteria.vendorId,
      barcodeId: bc.criteria.barcodeId,
      attributeName: 'Purchase Order'
   };

   self.getSubTitle = function () {
      return MessageService.get('global.barcode.template.id') + ': ' + (bc.criteria.barcodeId);
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      DataService.post('api/twl/barcodedtl', { data: self.barcodedtl, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         bc.searchBarcode();
      });
   };
});


app.controller('TwlivShipfromCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   //sf
   var self = this;

   self.criteria = {
      calledFrom: $stateParams.calledFrom,
      coNum: $stateParams.coNum,
      whNum: $stateParams.whNum,
      vendorId: $stateParams.vendorId,
      vendName: $stateParams.vendName
   };

   // This is needed so we can hide other views appropriately
   self.isTwlivShipfromMaster = function () {
      return $state.current.name.endsWith('.shipfrom');
   };
   self.isTwlivShipfromCreate = function () {
      return $state.current.name.endsWith('.create');
   };

   self.searchShipfrom = function () {
      DataService.post('api/twl/astwlsetup/getvendorshipfrom', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.vendorshipfromresults;
      });
   };

   if (self.criteria.coNum && self.criteria.whNum) {
      self.searchShipfrom();
   }

   self.edit = function () {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         $state.go('.detail', { vendaddr: record });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.detail', { vendaddr: record });
   };

   self.back = function () {
      $state.go($stateParams.returnState);
   };

});

//Separate View used for Update mode.
app.controller('TwlivShipfromDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   //sfd
   var self = this;
   var sf = $scope.sf;
   var rowID = $stateParams.vendaddr.vendaddrrowid;

   DataService.get('api/twl/vendaddr/getbyrowid/' + rowID, { busy: true }, function (data) {
      self.vendaddr = data;
      if (self.vendaddr) {
         // Look for GDPR text - Display warning if found
         if (self.vendaddr.contactName === 'GDPR Restricted Data' || self.vendaddr.contactName === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }
      }
   });

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      DataService.put('api/twl/vendaddr', { data: self.vendaddr, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         sf.searchShipfrom();
      });
   };

});
