'use strict';

app.controller('WtetInitiateCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, MruService, GridService, RecoveryService, AodataService, ModalService, AuthService, Sasc, Sasoo, Utils, Constants) {
   var self = this;
   var base = $scope.base;

   base.sidebarCollapsed = true;
   base.isAddOrderMode = true;

   self.maintain = function () {
      $state.go(base.baseState + '.maintain');
   };

   self.delete = function () {
      $state.go(base.baseState + '.delete');
   };

   self.copy = function () {
      $state.go(base.baseState + '.copy');
   };

   self.print = function () {
      $state.go(base.baseState + '.print');
   };

   self.importFromExcel = function () {
      $state.go(base.baseState + '.importFromExcel');
   };

   self.entryDefaultsClicked = function () {
      $state.go(base.baseState + '.entryDefaults');
   };

   self.continue = function () {
      self.warehouseTypeValidation();
   };

   self.shipToWarehouseSelected = function (args) {
      if (args.value) {
         var params = { whse: args.value };
         DataService.get('api/ic/icsd/getbypk', { params: params }, function (data) {
            if (data) {
               //set the warehouse in base for access throughout WTET
               base.icsd = data;

               base.wthdr.shiptoaddr1 = data.addr1;
               base.wthdr.shiptoaddr2 = data.addr2;
               base.wthdr.shiptoaddr3 = data.addr3;
               base.wthdr.shiptocity = data.city;
               base.wthdr.shiptostate = data.state;
               base.wthdr.shiptozipcd = data.zipcd;
            }
         });
      } else {
         base.icsd = {};

         base.wthdr.shiptoaddr1 = '';
         base.wthdr.shiptoaddr2 = '';
         base.wthdr.shiptoaddr3 = '';
         base.wthdr.shiptocity = '';
         base.wthdr.shiptostate = '';
         base.wthdr.shiptozipcd = '';
      }
   };

   self.warehouseTypeValidation = function () {
      self.transferOrderValidationStepCreate();
   };

   self.transferOrderValidationStepCreate = function () {
      DataService.post('api/wt/aswtheader/wtetheadercreate', { data: base.wthdr, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               base.wthdr.wtno = data.iNewWTNo;

               RecoveryService.createRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, base.delimitedTransferOrderNumber());

               if (base.wthdr.wtno === 0) {
                  MessageService.error('global.error', 'message.an.error.occurred.while.creating.the.order');
               } else {
                  self.getCurrentWthdr();
               }
            }
         }
      });
   };

   self.getCurrentWthdr = function () {

      var wtHeaderRetrieveCriteria = {
         wtno: base.wthdr.wtno,
         wtsuf: base.wthdr.wtsuf,
         maintmode: true
      };

      DataService.post('api/wt/aswtheader/wtetheaderretrieve', { data: wtHeaderRetrieveCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {

               base.wthdr = data.wthdr;

               base.updateLineItems();

               base.inDrillDownOperation = true;

               // Always suffix = zero and this point.
               var transferOrderNumber = base.wthdr.wtno.toString() + '-00';
               var params = {
                  wtno: base.wthdr.wtno,
                  wtsuf: 0,
                  fldlist: 'rowpointer,wtno,wtsuf'
               };

               DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (data) {
                  MruService.addToList('WTOrder', data.rowpointer, transferOrderNumber, data.wtno, data.wtsuf);
               });

               //Navigate Forward
               $state.go(base.defaultLineEntryState);
            }
         }
      });
   };

   self.forcedReset = function () {
      RecoveryService.deleteRecoveryRecord(Constants.MENU_FUNCTION_WTET, 0, base.delimitedTransferOrderNumber());
   };
});