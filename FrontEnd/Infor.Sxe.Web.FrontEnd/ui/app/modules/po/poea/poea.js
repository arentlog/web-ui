'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('po', 'poea', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('po', 'poea');
});

app.controller('PoeaBaseCtrl', function ($state, DataService, ConfigService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('poea.master');
   };

   self.includesMaster = function () {
      return $state.includes('poea.master');
   };

   self.isDetail = function () {
      return $state.is('poea.detail');
   };

   self.includesDetail = function () {
      return $state.includes('poea.detail');
   };

   self.search = function () {
      if (self.criteria.ponumber) {
         var poNumberSplit = self.criteria.ponumber.split('-');

         self.criteria.pono = parseInt(poNumberSplit[0], 10);
         self.criteria.posuf = parseInt(poNumberSplit[1], 10);
      } else {
         self.criteria.pono = 0;
         self.criteria.posuf = 0;
      }

      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();

      DataService.post('api/po/aspoentry/poearetrieve', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.loadpoearesults;
         }
      });
   };

   self.initializeSearchCriteria = function () {
      self.criteria = { stagecd: 2 };
   };

   self.initializeSearchCriteria();
});

app.controller('PoeaSearchCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.clear = function () {
      base.initializeSearchCriteria();
   };

   self.changeOfPONumber = function (args) {
      if (args.value) {
         if (base.criteria.ponumber) {
            var poNumberSplit = base.criteria.ponumber.split('-');
            if (poNumberSplit.length === 2) {
               base.criteria.pono = parseInt(poNumberSplit[0], 10);
               base.criteria.posuf = parseInt(poNumberSplit[1], 10);
            } 
         }
      }
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('poea.master');
      }

      if (!base.criteria.ponumber && !base.criteria.whse) {
         MessageService.error('global.error', 'message.please.select.either.warehouse.or.purchase.order.number');
      }
      else {
         base.search();
      }
   };

});

app.controller('PoeaMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, ModalService, Sasc, Utils, TabService, UserService) {
   var self = this;
   var base = $scope.base;
   self.acknowledgeModal = null;
   base.updatedPOs = [];

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.finalUpdate = function () {
      if (base.updatedPOs.length > 0) {
         DataService.post('api/po/aspoentry/poeaupdt', { data: base.updatedPOs, busy: true }, function (data) {
            MessageService.info('global.information', 'message.final.update.completed.successfully');
            if (data.length > 0) {
               MessageService.processMessaging(data.messaging);
            }
            base.updatedPOs = [];

            //Purchase Order # should be cleared from search criteria as stage is changed post final update
            if (base.criteria.ponumber) {
               base.dataset = [];
               base.criteria.ponumber = '';
               base.criteria.pono = 0;
               base.criteria.posuf = 0;
            }

            //Perform default search if warehouse is entered previously in search criteria
            if (base.criteria.whse) {
               base.search();
            }

         });
      }
   };

   self.onRecordSelection = function () {
      var recordCount = GridService.getSelectedRecords(base.grid).length;
      if (recordCount === 1) {
         var selectedPurchaseOrderno = GridService.getSelectedRecord(base.grid);
         if (base.criteria) {
            if (base.criteria.ponumber) {
               var poNumberSplit = base.criteria.ponumber.split('-');
               var pono = parseInt(poNumberSplit[0], 10);
               if (selectedPurchaseOrderno.pono !== pono) {
                  self.selectedRec = GridService.getSelectedRecord(base.grid);
               } 
            } else {
               self.selectedRec = GridService.getSelectedRecord(base.grid);
            }
         }
      } else {
         self.selectedRec = null;
      }
   };

   self.updateMultipleRecords = function (isAckPO, ackReason) {
      var selectedPOs = GridService.getSelectedRecords(base.grid);

      if (selectedPOs && selectedPOs.length) {
         selectedPOs.forEach(function (selectedRecord) {

            if (JSLINQ(base.updatedPOs).Any(function (record) { return record.rowidPoeh === selectedRecord.rowidPoeh; })) {
               var existingRecord = JSLINQ(base.updatedPOs).Where(function (poRecord) { return poRecord.rowidPoeh === selectedRecord.rowidPoeh; }).FirstOrDefault();

               existingRecord.ackrsn = isAckPO ? ackReason : '';
               existingRecord.pono = selectedRecord.pono;
               existingRecord.posuf = selectedRecord.posuf;
               existingRecord.stagecd = selectedRecord.stagecd;
            }
            else {
               var record = {
                  ackrsn: isAckPO ? ackReason : '',
                  pono: selectedRecord.pono,
                  posuf: selectedRecord.posuf,
                  stagecd: selectedRecord.stagecd,
                  rowidPoeh: selectedRecord.rowidPoeh
               };

               base.updatedPOs.push(record);
            }

            selectedRecord.ackrsn = isAckPO ? ackReason : '';
            selectedRecord.stagecd = isAckPO ? 3 : 2;
            selectedRecord.stagecdx = isAckPO ? 'Ack' : 'Prt';
            selectedRecord.ackdt = isAckPO ? Utils.getCurrentDate() : null;
            selectedRecord.acktype = isAckPO ? MessageService.get('global.manual') : MessageService.get('global.reset');
            selectedRecord.ackoper = UserService.getUserName();

            // Unique ID for the Row Updated
            var idx = base.dataset.findIndex(function (search) {
               return search.rowidPoeh === selectedRecord.rowidPoeh;
            });

            if (idx >= 0) {

               // Update the Row in the Grid
               base.dataset[idx].ackrsn = selectedRecord.ackrsn;
               base.dataset[idx].pono = selectedRecord.pono;
               base.dataset[idx].posuf = selectedRecord.posuf;
               base.dataset[idx].stagecd = selectedRecord.stagecd;

               // Refresh the Row Selected
               base.grid.updateRow(idx);
            }
         });

         base.grid.unSelectAllRows();
      }
   };

   self.onAcknowledge = function () {
      ModalService.showModal('po/poea/acknowledge.json', 'PoeaAcknowledgeCtrl as ack', $scope, function (modal) {
         self.acknowledgeModal = modal;
      });
   };

   self.onResetToPrint = function () {
      self.updateMultipleRecords(false, '');
   };

   self.stageFormatter = function (row, cell, value) {
      if (value.toUpperCase() === 'ACK') {
         return MessageService.get('global.acknowledged');
      }
      else {
         return MessageService.get('global.printed');
      }
   };

   self.finalUpdateEnabled = function () {
      return (base.updatedPOs.length > 0) ? true : false;
   };

   TabService.canUserCloseTab('poea.master', function () {
      if (base.updatedPOs.length > 0) {
         MessageService.yesNo('global.confirmation', 'question.perform.final.update',
            function () {
               // Yes processing
               self.finalUpdate();
            },
            function () {
               // No processing
               //TabService.closeTab('poea.master');
            });
      }
      else {
         TabService.closeTab('poea.master');
      }
   });
});

app.controller('PoeaAcknowledgeCtrl', function ($scope) {
   var self = this;
   var base = $scope.base;
   var mst = $scope.mst;
   self.reason = '';

   self.submit = function () {
      mst.updateMultipleRecords(true, self.reason);
      mst.acknowledgeModal.destroy();
   };

   self.cancel = function () {
      mst.acknowledgeModal.destroy();
   };
});