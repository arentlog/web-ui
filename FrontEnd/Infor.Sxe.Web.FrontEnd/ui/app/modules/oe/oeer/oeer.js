'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('oe', 'oeer', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oeer');

   $stateProvider.state('oeer.detail', {
      url: '/detail',
      params: {
         oeerRecord: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeer/detail.json');
            },
            controller: 'OeerDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('oeer.print', {
      url: '/print',
      params: { oeerRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeer/printer-view.json');
            },
            controller: 'OeerPrintCtrl as prl'
         }
      }
   });

   $stateProvider.state('oeer.selectAnAddress', {
      url: '/select-address',
      params: { oeerRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeer/select-an-address.json');
            },
            controller: 'OeerSelectAnAddressCtrl as saac'
         }
      }
   });
});

app.controller('OeerBaseCtrl', function ($state, DataService, UtilsData) {
   var self = this;
   self.criteria = {};

   //Check if Allow Expanded Name/Address   
   self.reqShipNameMaxLength = UtilsData.getNameAddressMaxLength();

   self.isMaster = function () {
      return $state.is('oeer.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeer.master');
   };

   self.isDetail = function () {
      return $state.is('oeer.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/oe/asoeentry/oeershiprequestload', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.oeerdetail;
      });
   };
});

app.controller('OeerSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   criteria.selecttype = "a";
   criteria.datetype = "t";

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.selecttype = "a";
      base.criteria.datetype = "t";
   };
   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeer.master');
      }

      base.search();
   };
});
app.controller('OeerMasterCtrl', function ($scope, $state, DataService, GridService, $stateParams, MessageService) {
   var self = this;
   var base = $scope.base;
   var oeerdetail = [];
   self.drilldown = function (e, args) {
      var record = args[0].item;
      DataService.get('api/oe/oeehp/getoeehplistbyordertynosuf/' + 's' + '/' + record.shipreqno + '/' + 0, {
         busy: true
      }, function (data) {
         base.datasetDetail = data;
         $state.go('^.detail', { oeerRecord: record });
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
   //Create New Shipping Request

   self.create = function () {
      DataService.get('api/oe/asoeentry/oeershiprequestadd', { busy: true }, function (createdata) {
         self.oeer = createdata;
         base.datasetDetail = {};
         if (self.oeer) {
            $state.go('^.detail', { oeerRecord: self.oeer });
         }
      });
   };

   // Delete record
   self.deleteRecords = function () {
      var selectedDeleteRecords = GridService.getSelectedRecords(base.grid);
      selectedDeleteRecords.forEach(function (record) {
         oeerdetail.push(record);
      });

      if (oeerdetail) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
            function () {
               // Yes processing
               self.finalDelete();
            });
      }
   };
   self.finalDelete = function () {
      DataService.post('api/oe/asoeentry/oeershiprequestdelete', { data: oeerdetail, busy: true }, function (data) {
         if (data.messaging) {
            MessageService.errorMessages(data.messaging);
         } else {
            MessageService.info('global.delete', 'message.delete.operation.completed.successfully');
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }
      });
   };
   //Print
   self.print = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      $state.go('^.print', { oeerRecord: selectedRecord });
   };

});

app.controller('OeerDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.oeer = $stateParams.oeerRecord;
   self.ordertype = 's';
   self.ordersuf = 0;
   self.selectRequestTab = true;

   //Update in Request Tab

   self.submit = function () {
      if (self.oeer) {
         DataService.post('api/oe/asoeentry/oeershiprequestupdate', { data: self.oeer, busy: true }, function (data) {

            if (data.messaging) {
               MessageService.errorMessages(data.messaging);
            } else {
               MessageService.info('global.update', 'message.final.update.completed.successfully');
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
         });
      }
   };

   //Select An Address in Request Tab

   self.selectAnAddress = function () {
      if (self.oeer) {
         $state.go('^.selectAnAddress', { oeerRecord: self.oeer });
      }
   };
});
app.controller('OeerPrintCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.printerFinalSettings = {};
   self.oeer = $stateParams.oeerRecord;
   // To check the printer validation
   self.printOK = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails; // If it required, printerFinalSettings object will update with additional settings based on menu function
            self.savePrinterSettings();
         }
      });
   };
   self.savePrinterSettings = function () {
      self.printerData = { oeerdetail: self.oeer, printersettings: self.printerFinalSettings };
      DataService.post('api/oe/asoeentry/oeershiprequestprint', { data: self.printerData, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', null, { reload: '^.master' });
      });
   };
});
app.controller('OeerSelectAnAddressCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.oeer = $stateParams.oeerRecord;
   self.oeer.selecttype = "c";

   self.selectOk = function () {
      if (self.oeer) {
         var oeeraddrselect = {
            selecttype: self.oeer.selecttype,
            custno: self.oeer.custno,
            shipto: self.oeer.shipto,
            vendno: self.oeer.vendno,
            shipfmno: self.oeer.shipfmno,
            prosno: self.oeer.prosno,
            contactid: self.oeer.contactid,
            userfield: self.oeer.userfield
         };
         var request = { oeeraddrselect: oeeraddrselect, oeerdetail: self.oeer };
         DataService.post('api/oe/asoeentry/oeershiprequestaddrselect', { data: request, busy: true }, function (data) {
            var red = data;
            if (data.messaging) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               $state.go('^.detail', { oeerRecord: red });
            }
         });
      }
   };
   self.selectCancel = function () {
      if (self.oeer) {
         $state.go('^.detail', { oeerRecord: self.oeer });
      }
   };
});



