'use strict';

//Called from the following places:  Cart "Detail" button.
//Alias: dg
app.controller('WtetDetailedGridCtrl', function ($scope, $state, GridService, MessageService, DataService) {
   var self = this;
   var base = $scope.base;
   self.lineItemForNotes = [];

   self.wlwhsechgfl = (base.wthdr.wlwhsefl && base.wthdr.stagecd >= 2 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;

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

      $state.go('^.advancedLineEntry', { lineNo: lineItem.lineno, fromEditLines: true, activePage: self.lineItemsGrid.pager.activePage });
   };

   self.productHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem) {
         $state.go('icip.detail', { pk: lineItem.shipprod, pk2: base.wthdr.shipfmwhse });
      }
   };

   self.deleteLines = function () {
      var selectedRows = GridService.getSelectedRecords(self.lineItemsGrid);
      if (selectedRows) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         function () {
            var wtlinedeletelistCriteria = [];
            selectedRows.forEach(function (wtline) {
               var criteriaRow = {
                  wtno: wtline.wtno,
                  wtsuf: wtline.wtsuf,
                  lineno: wtline.lineno,
                  wlwhsechgfl: self.wlwhsechgfl
               };
               wtlinedeletelistCriteria.push(criteriaRow);
            });

            var wtLineNotUsed = {};
            var wtLineTiesNotUsed = {};
            DataService.post('api/wt/aswtline/wtetlinedelete', { data: { wtlinecriteria: wtlinedeletelistCriteria, wtline: wtLineNotUsed, wtlnties: wtLineTiesNotUsed }, busy: true }, function (data) {
               if (!MessageService.processMessaging(data)) {
                  base.updateLineItems();
                  self.lineItemsGrid.loadData(base.lineItems);
                  base.getWthdr();
               }
            });
         });
      }
   };

   self.back = function () {
      $state.go(base.defaultLineEntryState);
   };
});