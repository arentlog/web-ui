'use strict';

// USE THIS FILE FOR LINE ENTRY CHILD STATE CONTROLLERS THAT ARE ~100 LINES OF CODE OR LESS. IF LARGER, THEY NEED THEIR OWN .JS FILE.

app.controller('WtetAdvancedLineEntryLotsCtrl', function ($scope, $state, $stateParams, DataService, Utils, MessageService) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   self.icEntryLotsCriteria = {};

   self.lineDetail = {
      lineno: ale.wtline.lineno,
      wtno: base.wthdr.wtno,
      wtsuf: base.wthdr.wtsuf,
      nonstockty: ale.wtline.nonstockty,
      shipprod: ale.wtline.prod,
      serlottype: ale.wtline.serlottype,
      qtyord: ale.wtline.qtyord,
      qtyship: ale.wtline.qtyship,
      stkqtyord: ale.wtline.stkqtyord,
      stkqtyship: ale.wtline.stkqtyship
   };

   self.lotControlReady = function () {
      var selectedLine = {
         wtesdetailline: self.lineDetail,
         iLineNo: self.lineDetail.lineno,
         cShipFmWhse: base.wthdr.shipfmwhse,
         lIsFromMenu: true
      };

      DataService.post('api/wt/aswtentry/wtesdetaillinecheckserlot', { data: selectedLine, busy: true }, function (data) {
         if (data) {
            self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(data);

            // Call initialize method on the Shared-Lots-Ctrl
            self.lotsControl.initialize(self.icEntryLotsCriteria);
         }
      });
   };

   self.createIcEntryLotsCriteria = function (wtlotscriteria) {
      if (wtlotscriteria) {
         var criteria = {
            whse: base.wthdr.shipfmwhse,
            prod: ale.wtline.prod,
            type: "wt",
            orderno: base.wthdr.wtno,
            ordersuf: base.wthdr.wtsuf,
            lineno: ale.wtline.lineno,
            linenochar: ale.wtline.lineno.toString(),
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: false,
            origqty: ale.wtline.stkqtyship,
            proofqty: wtlotscriteria.dNoSNLots,
            ordqty: ale.wtline.stkqtyord,
            outqty: ale.wtline.stkqtyship,
            ictype: base.wthdr.wttype,
            cost: ale.wtline.prodcost,
            qtyunavail: ale.wtline.qtyunavail,
            method: '', /* sasc.wtslentryty[2];*/
            retorderno: 0,
            retordersuf: 0,
            retlineno: 0,
            returnty: '0',
            reasunavty: '',
            custno: 0,
            shipto: '0',
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: base.wthdr.cono2,
            shipfmwhse: base.wthdr.shipfmwhse,
            shiptowhse: base.wthdr.shiptowhse,
            jrnlno: 0,
            ourproc: "wtet",
            icspecrecno: ale.wtline.icspecrecno,
            assignoldest: 'y',
            currproc: 'wtet',
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: ale.wtline.proddesc,
            prodnotesfl: ''
         };

         return criteria;
      }
   };

   self.lotDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      //If adjusting the Quantity, call the Validate call on the line so we get all the updated values like
      //stkqtyord.
      if (adjustQtyFl) {
         ale.wtline.qtyship = adjustQtyShip;
         self.back();
         ale.validateLine();
      } else {
         self.back();
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('WtetAdvancedLineEntrySerialsCtrl', function ($scope, $state, $stateParams, DataService, Utils, MessageService) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.lineDetail = {
      lineno: ale.wtline.lineno,
      wtno: base.wthdr.wtno,
      wtsuf: base.wthdr.wtsuf,
      nonstockty: ale.wtline.nonstockty,
      shipprod: ale.wtline.prod,
      serlottype: ale.wtline.serlottype,
      qtyord: ale.wtline.qtyord,
      qtyship: ale.wtline.qtyship,
      stkqtyord: ale.wtline.stkqtyord,
      stkqtyship: ale.wtline.stkqtyship
   };

   self.back = function () {
      $state.go('^');
   };

   self.serialControlReady = function () {

      var selectedLine = {
         wtesdetailline: self.lineDetail,
         iLineNo: self.lineDetail.lineno,
         cShipFmWhse: base.wthdr.shipfmwhse,
         lIsFromMenu: true
      };

      DataService.post('api/wt/aswtentry/wtesdetaillinecheckserlot', { data: selectedLine, busy: true }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(data);

            var criteria = {
               icentryserialslist: [],
               icentryserialscriteria: self.icEntrySerialsCriteria
            };

            // Call initialize method on the Shared-Serials-Ctrl
            self.serialsControl.initialize(criteria);
         }
      });
   };

   self.createIcEntrySerialsCriteria = function (wtserialscriteria) {
      if (wtserialscriteria) {
         var criteria = {
            whse: base.wthdr.shipfmwhse,
            prod: ale.wtline.prod,
            type: 'wt',
            orderno: base.wthdr.wtno,
            ordersuf: base.wthdr.wtsuf,
            lineno: ale.wtline.lineno,
            linenochar: ale.wtline.lineno.toString(),
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: false,
            origqty: ale.wtline.stkqtyship,
            proofqty: wtserialscriteria.dNoSNLots,
            ordqty: ale.wtline.stkqtyord,
            outqty: ale.wtline.stkqtyship,
            ictype: base.wthdr.wttype,
            cost: ale.wtline.prodcost,
            qtyunavail: ale.wtline.qtyunavail,
            method: ale.wtline.serialentryty, /* sasc.wtslentryty[1], */
            returnty: '',
            retorderno: 0,
            retordersuf: 0,
            retlineno: 0,
            reasunavty: '',
            custno: 0,
            shipto: '0',
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: base.wthdr.cono2,
            shipfmwhse: base.wthdr.shipfmwhse,
            shiptowhse: base.wthdr.shiptowhse,
            jrnlno: 0,
            ourproc: 'wtet',
            icspecrecno: ale.wtline.icspecrecno,
            assignoldest: false,
            currproc: 'wtet',
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: ale.wtline.proddesc,
            prodnotesfl: ''
         };

         return criteria;
      }
   };

   self.serialDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      //If adjusting the Quantity, call the Validate call on the line so we get all the updated values like
      //stkqtyord.
      if (adjustQtyFl) {
         ale.wtline.qtyship = adjustQtyShip;
         self.back();
         ale.validateLine();
      } else {
         self.back();
      }
   };
});

app.controller('WtetAdvancedLineEntryTiesCtrl', function ($scope, $state, $translate, Utils, DataService, UserService, MessageService) {
   // alias => aleTie
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.submit = function () {
      if (self.tiesControl) {
         if (self.tiesControl.tieEditableResults) {
            ale.wtlnties = self.tiesControl.tieEditableResults;

            //Process thru Original List and determine if the user deleted any Ties.  If so, we need
            //to re-add them to the collection and set some flags, so the backend can process these
            //as a 'cleared tie'.
            if (self.tiesControl.tieEditableResults) {
               ale.wtlntiesOrig.forEach(function (row) {
                  var index = self.tiesControl.tieEditableResults.indexOf(row);
                  if (index === -1) {
                     var lineTieNewRow = row;
                     row.cleartiefl = true;
                     row.modified = true;
                     ale.wtlnties.push(lineTieNewRow);
                  }
               });
            }

            //Protect for an empty collection for API call later.
            if (!ale.wtlnties || ale.wtlnties.length === 0) {
               ale.wtlnties = [];
            }

            MessageService.info('global.information', 'message.tie.data.has.been.accepted.add.update.the.line');

            self.back();
         }
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('WtetAdvancedLineEntryCrossReferenceCtrl', function ($scope, $state, $translate, DataService, UserService, GridService, MessageService) {
   //alias => aleCr
   var self = this;
   var ale = $scope.ale;

   self.submit = function () {
      var isXRefSelected = self.xRefGrid.isOneRowSelected();
      var isSubUpgradeSelected = self.suGrid.isOneRowSelected();
      if ((!isXRefSelected && !isSubUpgradeSelected) || (isXRefSelected && isSubUpgradeSelected)) {
         //nothing is selected OR more than one record is selected in either grid || one record is selected in both grids
         MessageService.error('global.error', 'message.please.select.one.alternate.before.continuing');
      }
      else {
         //one record is selected in one of the grid
         var selectedXRef;
         if (isXRefSelected) {
            selectedXRef = GridService.getSelectedRecord(self.xRefGrid);
         } else {
            selectedXRef = GridService.getSelectedRecord(self.suGrid);
         }

         if (selectedXRef) {
            ale.wtline.reqprod = ale.wtline.prod;
            ale.wtline.prod = selectedXRef.prod;
            ale.wtline.crprod = selectedXRef.prod;
            ale.wtline.xrefprodty = selectedXRef.rectype;
            $state.go('^');
            ale.validateLine();
         }
      }
   };

   self.back = function () {
      $state.go('^');
      ale.wtline.subupgrdty = 'n';
      ale.validateLine(null, true, 'subupgrdty');
   };
});