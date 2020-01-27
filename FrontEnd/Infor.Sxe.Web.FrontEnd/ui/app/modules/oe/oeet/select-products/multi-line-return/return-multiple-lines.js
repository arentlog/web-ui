'use strict';

app.controller('OeetReturnMultipleLinesCtrl', function ($scope, $state, $translate, DataService, MessageService, UserService, AuthService, Utils, Sasoo, Constants) {
   //alias => rml
   var self = this;
   var base = $scope.base;

   self.returnUpdateList = [];

   self.isDrilldown = function () {
      return $state.is(base.baseState + '.selectProducts.returnMultipleLines.lineDetails');
   };

   self.invoiceChanged = function (selectedInvoice) {
      if (selectedInvoice.value > 0) {
         self.invoiceNumber = selectedInvoice.value;
         self.invoiceSuffix = selectedInvoice.value2;

         var returnLineListCriteria = {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            invno: self.invoiceNumber,
            invsuf: self.invoiceSuffix
         };
         DataService.post('api/oe/asoeline/oereturnnoprodbuildlinelist', { data: returnLineListCriteria, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.returnInvoiceInfo = data.oereturnlinelistsingle;
                  self.returnLineCollection = data.oereturnlinelistresults;
                  if (self.returnLineCollection.length === 0) {
                     MessageService.info('global.information', 'message.the.selected.invoice.does.not.contain.any.lines');
                  }
               }
            }
         });
      } else {
         self.returnInvoiceInfo = {};
         self.returnLineCollection = [];
      }
   };

   self.lineDrilldownClicked = function (e, args) {
      $state.go(base.baseState + '.selectProducts.returnMultipleLines.lineDetails', { selectedReturnLine: args[0].item });
   };

   self.returnLineComplete = function (finishedReturnLine) {
      var newReturnLineCollection = [];
      self.returnLineCollection.forEach(function (returnLine) {
         if (returnLine.lineno === finishedReturnLine.lineno) {
            newReturnLineCollection.push(finishedReturnLine);
         } else {
            newReturnLineCollection.push(returnLine);
         }
      });
      self.returnLineCollection = newReturnLineCollection;
   };

   self.returnQuantityOrUnitChanged = function (e, args) {

      var newValue = args.value;
      var oldValue = args.oldValue;
      var fieldChanged = args.column.field;
      var record = self.returnLineCollection[args.row];

      if (newValue !== oldValue) {
         var returnNoProdLeaveRowRequest = {
            oereturnupdatelist: self.returnUpdateList,
            oereturnlinelistcriteria: {
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               invno: self.invoiceNumber,
               invsuf: self.invoiceSuffix
            },
            oereturnlinelistresults: record,
            oereturnlinelistsingle: self.returnInvoiceInfo
         };
         DataService.post('api/oe/asoeline/oereturnnoprodleaverow', { data: returnNoProdLeaveRowRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.returnUpdateList = data.oereturnupdatelist;
               } else {
                  if (fieldChanged && fieldChanged === 'qtyship') {
                     record.qtyship = oldValue;
                     self.returnLineCollection[args.row] = record;
                     self.grid.renderRows();
                  } else if (fieldChanged && fieldChanged === 'unit') {
                     record.unit = oldValue;
                     self.returnLineCollection[args.row] = record;
                     self.grid.renderRows();
                  }
               }
            }
         });

      }
   };

   self.submit = function () {
      if (self.returnUpdateList.length > 0) {
         var sortedUpdateList = self.returnUpdateList.sort(function (a, b) {
            return a.retlineno - b.retlineno;
         });
         var returnNoProdFinalUpdateRequest = {
            oereturnupdatelist: sortedUpdateList,
            iOrderNo: base.oehdr.orderno,
            iOrderSuf: base.oehdr.ordersuf
         };
         DataService.post('api/oe/asoeline/oereturnnoprodfinalupdate', { data: returnNoProdFinalUpdateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.forceSerLotLineList = data.cRetForceLineList;

                  var lastLineItemLineNo;
                  if (base.lineItems.length > 0) {
                     lastLineItemLineNo = base.lineItems[base.lineItems.length - 1].actllineno + 1;
                  } else {
                     lastLineItemLineNo = 0;
                  }

                  // If using AvaTax, don't calculate taxes on each line add
                  // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
                  if (base.taxMethodType.toLowerCase() === 'a') {
                     base.calcsob = 'x';
                  } else {
                     base.calcsob = 'o';
                  }

                  base.updateLineItems(null, null, 'addMultiple', lastLineItemLineNo);

                  $state.go(base.defaultLineEntryState);
               }
            }
         });
      } else {
         MessageService.info('global.information', 'message.no.records.have.been.selected');
      }
   };

   self.easyLineEntry = function () {
      $state.go('^');

      $scope.sp.view.applyAutoFocus();
   };

   self.addons = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.returnMultipleLines',
         drilldownState: 'addons'
      });
   };

   self.discounts = function () {
      $state.go(base.baseState + '.taxesAndTotals', {
         navFromState: base.baseState + '.selectProducts.returnMultipleLines',
         drilldownState: 'discounts'
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OeetReturnMultipleLinesDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, UserService, AuthService, Utils, Sasoo, Constants) {
   //alias => rmlD
   var self = this;
   var base = $scope.base;
   var rml = $scope.rml;

   self.selectedReturnLine = $stateParams.selectedReturnLine;
   self.oereturn = {};

   self.selectedReturnLine.selectfl = true;

   self.oeReturnParams = {
      orderno: base.oehdr.orderno,
      ordersuf: base.oehdr.ordersuf,
      prod: self.selectedReturnLine.shipprod,
      specnstype: self.selectedReturnLine.specnstype,
      unit: self.selectedReturnLine.unit,
      unitconv: self.selectedReturnLine.unitconv,
      kitfl: self.selectedReturnLine.kitfl,
      tallyfl: self.selectedReturnLine.tallyfl,
      serlottype: self.selectedReturnLine.serlottype,
      qtyord: self.selectedReturnLine.qtyship,
      qtyship: self.selectedReturnLine.qtyship,
      qtyunavail: self.selectedReturnLine.qtyship * self.selectedReturnLine.unitconv,
      qtyreturn: self.selectedReturnLine.qtyship * self.selectedReturnLine.unitconv,
      retlineno: self.selectedReturnLine.lineno,
      retorderno: rml.invoiceNumber,
      retordersuf: rml.invoiceSuffix,
      crreasonty: self.selectedReturnLine.crreasonty
   };
   DataService.post('api/oe/asoeline/oereturnnoprodretrieve', { data: self.oeReturnParams, busy: true }, function (data) {
      if (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            self.oereturn = data.oereturn;

            self.returnReasonChanged();
         }
      }
   });

   self.isInvoiceInfoVisible = function () {
      if (self.oereturn.retordernoenabled || self.oereturn.retordersufenabled || self.oereturn.retlinenoenabled) {
         return true;
      } else {
         return false;
      }
   };

   self.isPurchaseOrderInfoVisible = function () {
      if (self.oereturn.orderaltnoenabled || self.oereturn.btnsourcingenabled || self.oereturn.qtyunavailenabled || self.oereturn.reasunavtyenabled) {
         return true;
      } else {
         return false;
      }
   };

   self.returnReasonChanged = function () {
      DataService.post('api/oe/asoeline/oereturnloadreasonfields', { data: self.oereturn, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.oereturn = data.oereturn;
            }
         }
      });
   };

   self.returnOrderNoChanged = function () {
      // Load EHF values from original order
      if (self.oereturn.retorderno && self.oereturn.retlineno) {
         var params = {
            orderno: self.oereturn.retorderno,
            ordersuf: self.oereturn.retordersuf,
            lineno: self.oereturn.retlineno,
            fldlist: 'ehfaddonno,ehfamt,ehfexemptamt'
         };

         DataService.get('api/oe/oeel/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.oereturn.ehfaddonno = data.ehfaddonno;
               self.oereturn.ehfamt = data.ehfamt;
               self.oereturn.ehfexemptamt = data.ehfexemptamt;
            }
         });
      }
   };

   self.poNumberChanged = function (selectedInvoice) {
      if (selectedInvoice.value > 0) {
         self.oereturn.retorderno = selectedInvoice.value;
         self.oereturn.retordersuf = selectedInvoice.value2;
      }
   };

   self.submit = function () {
      DataService.post('api/oe/asoeline/oereturnvalidate', { data: self.oereturn, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.oereturn = data.oereturn;

               var returnNoProdLeaveRowRequest = {
                  oereturnupdatelist: rml.returnUpdateList,
                  oereturnlinelistcriteria: {
                     orderno: base.oehdr.orderno,
                     ordersuf: base.oehdr.ordersuf,
                     invno: rml.invoiceNumber,
                     invsuf: rml.invoiceSuffix
                  },
                  oereturnlinelistresults: self.selectedReturnLine,
                  oereturnlinelistsingle: rml.returnInvoiceInfo
               };
               DataService.post('api/oe/asoeline/oereturnnoprodleaverow', { data: returnNoProdLeaveRowRequest, busy: true }, function (data) {
                  if (data) {
                     if (!MessageService.processMessaging(data.messaging)) {
                        self.selectedReturnLine = data.oereturnlinelistresults;
                        rml.returnUpdateList = data.oereturnupdatelist;

                        var returnNoProdUpdateRequest = {
                           oereturnupdatelist: rml.returnUpdateList,
                           oereturn: self.oereturn,
                           oereturnparams: self.oeReturnParams
                        };
                        DataService.post('api/oe/asoeline/oereturnnoprodupdate', { data: returnNoProdUpdateRequest, busy: true }, function (data) {
                           if (data) {
                              rml.returnLineComplete(self.selectedReturnLine);
                              rml.returnUpdateList = data;
                              $state.go('^');
                           }
                        });
                     }
                  }
               });
            }
         }
      });
   };

   self.back = function () {
      MessageService.yesNo('global.question', 'message.the.return.form.has.not.been.completed', function () {
         //yes callback
         self.selectedReturnLine.selectfl = false;
         rml.returnLineComplete(self.selectedReturnLine);
         $state.go('^');
      }, null);
   };
});