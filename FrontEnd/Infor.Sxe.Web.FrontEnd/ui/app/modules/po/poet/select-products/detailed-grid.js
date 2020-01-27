'use strict';

//Called from the following places:  Cart "Detail" button.
//Alias: dg
app.controller('PoetDetailedGridCtrl', function ($scope, $state, GridService, MessageService, DataService) {
   var self = this;
   var base = $scope.base;
   self.lineItemForNotes = [];

   self.rowSelected = function () {
      var lineItems = GridService.getSelectedRecords(self.lineItemsGrid);
      //If only one grid row is selected, then fire the notes.
      if (lineItems && lineItems.length === 1) {
         self.lineItemForNotes = lineItems[0];
      } else {
         self.lineItemForNotes = [];
      }
   };

   self.drilldownClicked = function (e, args) {
      var lineItem = args[0].item;

      $state.go('^.advancedLineEntry', { lineNo: lineItem.lineno });
   };

   self.productHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem) {
         $state.go('icip.detail', { pk: lineItem.shipprod, pk2: base.pohdr.whse });
      }
   };

   self.qtyHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem) {
         $state.go('icia.detail', { pk: lineItem.shipprod, pk2: base.pohdr.whse }, { reload: 'icia.detail' });
      }
   };

   self.deleteLines = function () {
      var selectedRows = GridService.getSelectedRecords(self.lineItemsGrid);
      if (selectedRows) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         function () {
            var polinedeletelistCriteria = [];
            selectedRows.forEach(function (poline) {
               var criteriaRow = {
                  pono: poline.pono,
                  posuf: poline.posuf,
                  lineno: poline.lineno
               };
               polinedeletelistCriteria.push(criteriaRow);
            });

            DataService.post('api/po/aspoline/polinedeletelist', { data: polinedeletelistCriteria, busy: true }, function (data) {
               if (!MessageService.processMessaging(data)) {
                  base.updateLineItems();
                  // Must retrieve latest PO header to contain latest totals.
                  base.getPohdr();
                  self.lineItemsGrid.loadData(base.lineItems);
               }
            });
         });
      }
   };

   self.back = function () {
      $state.go(base.defaultLineEntryState);
   };
});