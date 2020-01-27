'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('va', 'vaeu', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('va', 'vaeu');
});

app.controller('VaeuBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {};
   self.currentVersion = 0;

   self.isMaster = function () {
      return $state.is('vaeu.master');
   };

   self.includesMaster = function () {
      return $state.includes('vaeu.master');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/va/asvaentry/vaeuloadtt', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.vaeubuildvalistresults;
         self.currentVersion = data.pvCurVerno;
      });
   };
});

app.controller('VaeuSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.currentVersion = 0;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('vaeu.master');
      }
      base.search();
   };
});

app.controller('VaeuMasterCtrl', function ($scope, $state, $stateParams, GridService, MessageService, DataService) {
   var self = this;
   var base = $scope.base;

   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }
   };

   self.valueAddInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('vaif.detail', { pk: currentRow.vano, pk2: currentRow.vasuf });
      }
   };

   self.setUpdateFlag = function (value) {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      if (selectedRows) {
         selectedRows.forEach(function (vaeu) {
            vaeu.updatefl = value;
         });
         base.grid.loadData(base.dataset);
      }
   };

   self.finalUpdate = function () {
      if (base.dataset && base.dataset.length > 0) {
         var rowsInQuestion = base.dataset.filter(function (vaeu) {
            return vaeu.updatefl === true && vaeu.withintolerance === false;
         });

         if (rowsInQuestion && rowsInQuestion.length > 0) {
            self.handleQuestion();
         } else {
            self.updateProcessing();
         }
      }
   };

   self.handleQuestion = function () {
      MessageService.yesNo('global.question', 'question.rows.selected.not.within.tolerance.settings',
      // Yes processing
      function () {
         self.updateProcessing();
      }, // No processing
         function () {
            //Do nothing, simply close the popup.
      });
   };

   self.updateProcessing = function () {
      var rowsToUpdate = base.dataset.filter(function (vaeu) {
         return vaeu.updatefl === true;
      });

      if (rowsToUpdate && rowsToUpdate.length > 0) {
         var upgradeversionsbylistRequest = {
            vaeuBuildValistResults: rowsToUpdate,
            toVersionNumber: base.currentVersion
         };

         DataService.post('api/va/vaeu/upgradeversionsbylist', { data: upgradeversionsbylistRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.search();
               }
            }
         });
      } else {
         MessageService.alert('global.alert', 'global.set.rows.to.process');
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});
