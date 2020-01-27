'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ap', 'apems', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ap', 'apems');
});

app.controller('ApemsBaseCtrl', function ($state, DataService) {
   var self = this;

   self.STAGE_COSTED = '6';
   self.STAGE_CLOSED = '7';
   self.STAGE_BOTH = 'B';

   self.criteria = { stagecd: self.STAGE_COSTED };

   self.isMaster = function () {
      return $state.is('apems.master');
   };

   self.includesMaster = function () {
      return $state.includes('apems.master');
   };

   self.vendnoChanged = function () {
      var params = {
         vendno: self.criteria.vendno,
         fldlist: 'rowpointer'
      };

      DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.criteria.vendnorowpointer = data.rowpointer;
         }
      });
   }

   // Perform search and update data set for the grid
   self.search = function () {
      // Parse pono and posuf
      if (self.criteria.ponumber) {
         var orderDetails = self.criteria.ponumber.split('-');
         self.criteria.pono = orderDetails[0];
      } else {
         self.criteria.pono = 0;
      }

      switch (self.criteria.stagecd) {
         case self.STAGE_COSTED:
            self.isCostedEnabled = false;
            self.isClosedEnabled = true;
            break;
         case self.STAGE_CLOSED:
            self.isCostedEnabled = true;
            self.isClosedEnabled = false;
            break;
         default:
            self.isCostedEnabled = true;
            self.isClosedEnabled = true;
      }

      DataService.post('api/ap/asapentry/apemsretrieve', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };
});

app.controller('ApemsSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.stagecd = base.STAGE_COSTED;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('apems.master');
      }

      base.search();
   };
});

app.controller('ApemsMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService) {
   var self = this;
   var base = $scope.base;

   // POIP hyperlink
   self.poInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('poip.detail', { pk: currentRow.pono, pk2: currentRow.posuf });
      }
   };

   // Change stage on one or more rows
   self.setStage = function (toStage) {
      var records = GridService.getSelectedRecords(base.grid);

      toStage = toStage || 0;

      if (records.length) {
         var apemschg = [];

         records.forEach(function (record) {
            apemschg.push({
               pono: record.pono,
               posuf: record.posuf,
               stage: record.stage
            });
         });

         var criteria = { apemschg: apemschg, istagecd: toStage };
         DataService.post('api/ap/asapentry/apemschg', { data: criteria, busy: true }, function () {
            // Need to reload grid data since stages may no longer match search criteria
            base.search();
         });
      }
   };
});