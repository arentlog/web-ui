'use strict';

app.controller('OeetLinesGridCtrl', function ($scope, $state, $stateParams, $translate, GridService, DataService, ModalService, MessageService, AuthService, UserService, MruService, Utils, Constants) {
   // alias => lg
   var self = this;
   var base = $scope.base;
   self.lineItemForNotes = [];

   var lineTypes = base.lineTypesToShow.split(',');
   self.showComments = lineTypes.indexOf('c') !== -1;
   self.showInactive = lineTypes.indexOf('i') !== -1;
   self.showSubTotal = lineTypes.indexOf('t') !== -1;
   self.wlwhsechgfl = (base.oehdr.wlwhsefl && base.oehdr.pickcnt > 0 && base.whseLogStatus) ? base.whseLogStatus.wlwhsechgfl : true;

   self.ready = function () {
      if ($stateParams.activePage) {
         self.setActivePage($stateParams.activePage);
      } else {
         self.setActivePage(1);
      }
   };

   self.setActivePage = function (pageNumber) {
      //if we dont have a page number, then we didn't leave the view. assign it to the currentPage
      if (!pageNumber) {
         pageNumber = self.currentPage;
      }

      var pagerInfo = {
         activePage: pageNumber,
         pagesize: self.lineItemsGrid.pager.settings.pagesize,
         total: base.lineItems.length,
         type: 'initial'
      };
      self.lineItemsGrid.loadData(base.lineItems, pagerInfo);
   };

   self.islinesGrid = function () {
      return $state.is(base.baseState + '.selectProducts.linesGrid');
   };

   self.isPricingEnabled = function () {
      var isEnabled;
      if (self.lineItemsGrid.isNoRowSelected()) {
         isEnabled = false;
      } else {
         // If one or more selected rows are flagged as National Program then disable Pricing button
         var selectedLines = GridService.getSelectedRecords(self.lineItemsGrid);
         var idx = selectedLines.findIndex(function (search) {
            return search.npfl;
         });

         isEnabled = idx === -1;
      }
      return isEnabled;
   };

   self.rebuildLineList = function () {
      var newLineTypes = '';
      if (self.showComments) {
         newLineTypes += 'c,';
      }
      if (self.showInactive) {
         newLineTypes += 'i,';
      }
      if (self.showSubTotal) {
         newLineTypes += 't';
      }
      base.lineTypesToShow = newLineTypes;

      // Retotal order based on (O)rdered, (S)hipped or (B)oth
      base.calcsob = 'o';
      base.updateLineItems(self.setActivePage);
   };

   self.subLinesClicked = function () {
      $state.go('.commentSubTotalLines');
   };

   self.pricingCostingClicked = function (worksheetType) {
      self.currentPage = self.lineItemsGrid.pager.activePage;

      var selectedLines = GridService.getSelectedRecords(self.lineItemsGrid);
      var actualSelectedLines = [];
      selectedLines.forEach(function (line) {
         if (line.specnstype !== 'i' && line.specnstype !== 'e' && line.specnstype !== 't') {
            actualSelectedLines.push(line);
         }
      });
      $state.go('.pricingCostingWorksheet', { worksheetType: worksheetType, selectedLines: actualSelectedLines });
   };

   self.sourcingClicked = function () {
      self.currentPage = self.lineItemsGrid.pager.activePage;

      var selectedLines = GridService.getSelectedRecords(self.lineItemsGrid);
      selectedLines.forEach(function (line) {
         if (line.specnstype === 'l') {
            MessageService.error('global.error', 'message.cannot.source.lost.business.lines');
            return;
         }
      });

      var multiLineSourcingPreValidateRequest = {
         oeiolinesresults: selectedLines,
         multilinesourcing: {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            maintmode: base.isAddOrderMode
         }
      };
      DataService.post('api/oe/asoeline/oemultilinesourcingprevalidate', { data: multiLineSourcingPreValidateRequest, busy: true }, function (preValData) {
         if (preValData) {
            self.multiLineSourcing = preValData;

            var lineTieTypeCriteria = {
               runmode: self.multiLineSourcing.lReturnFl ? 'multi-returns' : 'multi-lines',
               ourproc: Constants.MENU_FUNCTION_OEET,
               whse: base.oehdr.whse,
               transtype: base.oehdr.oetype
            };

            //User Hook (do not rename)
            if (self.setOelineLineTieTypeDropdown) {
               self.setOelineLineTieTypeDropdown(lineTieTypeCriteria);
            }

            DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (tieDropdownData) {
               if (tieDropdownData) {
                  self.orderTypes = base.getOrderTypesFromTieDropdownData(tieDropdownData);

                  self.multiLineSourcingTieHeader = {
                     orderdisp: base.oehdr.orderdisp,
                     orderno: base.oehdr.orderno,
                     ordersuf: base.oehdr.ordersuf,
                     ourproc: Constants.MENU_FUNCTION_OEET,
                     runmode: self.multiLineSourcing.lReturnFl ? 'multi-returns' : 'multi-lines',
                     transtype: base.oehdr.oetype,
                     whse: base.oehdr.whse
                  };
                  var lineTieRetrieveRequest = {
                     oeline: {},
                     oelinelinetiehdr: self.multiLineSourcingTieHeader
                  };
                  DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (lineTieData) {
                     if (lineTieData) {
                        self.multiLineSourcingTie = lineTieData[0];

                        $state.go('.sourcing', {
                           oehdr: base.oehdr,
                           tie: self.multiLineSourcingTie,
                           orderTypes: 'lg.orderTypes',
                           sourceFieldChangedCallback: self.multiLineSourcingFieldChangedCallback,
                           cancelCallback: self.multiLineSourcingCancelCallback,
                           finishCallback: self.multiLineSourcingFinishCallback,
                           backCallback: self.multiLineSourcingCancelCallback,
                           conoForIcWhseAvailCriteria: base.conoForIcWhseAvailCriteria,
                           whseTypeForIcWhseAvailCriteria: base.whseTypeForIcWhseAvailCriteria,
                           showDocDisposition: true
                        });
                     }
                  });
               }
            });
         }
      });
   };

   self.multiLineSourcingFieldChangedCallback = function (fieldName) {
      var tieLeaveFieldRequest = {
         oeline: {},
         oelinelinetie: self.multiLineSourcingTie,
         oelinelinetiehdr: self.multiLineSourcingTieHeader,
         cFieldName: fieldName
      };
      DataService.post('api/oe/asoeline/oelinelinetieleavefield', { data: tieLeaveFieldRequest, busy: true }, function (data) {
         if (data) {
            if (self.multiLineSourcingTie.pofrtbillacct !== data.oelinelinetie.pofrtbillacct &&
               (fieldName === 'vendno' || fieldName === 'shipviaty' || fieldName === 'frttermscd')) {
               var message = $translate.instant('message.the.freight.bill.account.is.changing.from') + ' ';
               if (self.multiLineSourcingTie.pofrtbillacct) {
                  message += self.multiLineSourcingTie.pofrtbillacct + ' ';
               } else {
                  message += $translate.instant('global.blank') + ' ';
               }
               message += $translate.instant('global.to') + ' ';
               if (data.oelinelinetie.pofrtbillacct) {
                  message += data.oelinelinetie.pofrtbillacct + '.';
               } else {
                  message += $translate.instant('global.blank') + '.<br/>';
               }
               message += $translate.instant('question.do.you.wish.to.continue');
               MessageService.yesNo('global.freight.bill.account.change', message, function () {
                  // yes callback
                  Utils.replaceObject(self.multiLineSourcingTie, data.oelinelinetie);
               }, null);
            } else {
               Utils.replaceObject(self.multiLineSourcingTie, data.oelinelinetie);
            }

            MessageService.processMessaging(data.messaging);
         }
      });
   };

   self.multiLineSourcingCancelCallback = function () {
      $state.go('^', { activePage: self.currentPage });
   };

   self.multiLineSourcingFinishCallback = function () {
      var tieValidateRequest = {
         oeline: {},
         oelinelinetie: self.multiLineSourcingTie,
         oelinelinetiehdr: self.multiLineSourcingTieHeader
      };
      DataService.post('api/oe/asoeline/oelinelinetievalidate', { data: tieValidateRequest, busy: true }, function (validateData) {
         if (validateData) {
            if (!MessageService.processMessaging(validateData.messaging)) {
               var multiLineSourcingUpdateRequest = {
                  multilinesourcing: self.multiLineSourcing,
                  oelinelinetie: self.multiLineSourcingTie
               };
               DataService.post('api/oe/asoeline/oemultilinesourcingupdate', { data: multiLineSourcingUpdateRequest, busy: true }, function (updateData) {
                  if (updateData) {
                     if (!MessageService.processMessaging(updateData)) {
                        updateData.forEach(function (message) {
                           var poNumber;
                           if (message.messagetxt.includes('Purchase Order #')) {
                              var pomatch = /\d+/.exec(message.messagetxt);
                              if (pomatch[0]) {
                                 poNumber = pomatch[0];

                                 var getPoehParams = {
                                    pono: poNumber,
                                    posuf: 0,
                                    fldlist: 'rowpointer,pono,posuf'
                                 };
                                 poNumber += '-00';

                                 DataService.get('api/po/poeh/getbypk', { params: getPoehParams }, function (data) {
                                    if (data) {
                                       MruService.addToList('POOrder', data.rowpointer, poNumber, data.pono, data.posuf);
                                    }
                                 });
                              }
                           } else if (message.messagetxt.includes('Warehouse Transfer #')) {
                              var wtNumber;
                              var wtmatch = /\d+/.exec(message.messagetxt);
                              if (wtmatch[0]) {
                                 wtNumber = wtmatch[0];

                                 var getWtehParams = {
                                    wtno: wtNumber,
                                    wtsuf: 0,
                                    fldlist: 'rowpointer,wtno,wtsuf'
                                 };
                                 wtNumber += '-00';
                                 DataService.get('api/wt/wteh/getbypk', { params: getWtehParams, busy: true }, function (data) {
                                    if (data) {
                                       MruService.addToList('WTOrder', data.rowpointer, wtNumber, data.wtno, data.wtsuf);
                                    }
                                 });
                              }
                           }
                        });
                        var selectedLines = GridService.getSelectedRecords(self.lineItemsGrid);
                        var sortedSelectedLines = selectedLines.sort(function (a, b) {
                           return a.actllineno - b.actllineno;
                        });
                        var firstSelectedLine = sortedSelectedLines[0];
                        var lastSelectedLine = sortedSelectedLines[sortedSelectedLines.length - 1];

                        // If using AvaTax, don't calculate taxes on each line add
                        // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
                        if (base.taxMethodType.toLowerCase() === 'a') {
                           base.calcsob = 'x';
                        } else {
                           base.calcsob = 'o';
                        }

                        base.updateLineItems(null, null, 'updateMultiple', firstSelectedLine.actllineno, lastSelectedLine.actllineno);

                        MessageService.info('global.information', 'message.sourcing.data.has.been.accepted');
                        $state.go('^', { activePage: self.currentPage });
                     }
                  }
               });
            }
         }
      });
   };

   self.multiMoveClicked = function () {
      $state.go('.multiLineMove');
   };

   self.moveClicked = function (moveType, moveAfter) {
      var linesToMove = [];
      var showSubWarning = false;

      var selectedLines = GridService.getSelectedRecords(self.lineItemsGrid);
      selectedLines.forEach(function (line) {
         if (line.specnstype !== 'i' && line.specnstype !== 'e' && line.specnstype !== 't') {
            linesToMove.push({
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               actllineno: line.actllineno,
               sortlineno: line.sortlineno,
               lineitemtype: line.lineitemtype,
               lineitemrecid: line.lineitemrecid,
               specnstype: line.specnstype,
               movetype: moveType,
               afterlineno: moveAfter
            });
         } else {
            showSubWarning = true;
         }
      });

      if (showSubWarning) {
         MessageService.yesNo('global.warning', 'message.sub.lines.must.be.moved.with.multi.line.move', function () {
            //yes callback
            self.runLineMove(linesToMove, moveType);
         });
      } else {
         self.runLineMove(linesToMove, moveType);
      }
   };

   self.runLineMove = function (linesToMove, moveType) {
      self.currentPage = self.lineItemsGrid.pager.activePage;

      if (linesToMove.length > 0) {
         DataService.post('api/oe/asoeline/oesinglelinemove', { data: linesToMove, busy: true }, function () {
            var firstSelectedLine;

            // Retotal order based on (O)rdered, (S)hipped or (B)oth
            base.calcsob = 'o';

            switch (moveType) {
               case 'top':
                  //get all lines because they all have changed
                  base.updateLineItems(self.setActivePage);
                  break;
               case 'up':
                  //get all lines above the first selected line - 1
                  linesToMove = self.resortSelectedLines(linesToMove);
                  firstSelectedLine = linesToMove[0];
                  base.updateLineItems(self.setActivePage, null, 'updateMultiple', firstSelectedLine.actllineno - 1);
                  break;
               case 'down':
               case 'bottom':
                  //get all lines above the first selected line
                  linesToMove = self.resortSelectedLines(linesToMove);
                  firstSelectedLine = linesToMove[0];
                  base.updateLineItems(self.setActivePage, null, 'updateMultiple', firstSelectedLine.actllineno);
                  break;
               case 'after':
                  //get all lines above the line that lines were moved after or the first selected line, whichever is smaller
                  linesToMove = self.resortSelectedLines(linesToMove);
                  firstSelectedLine = linesToMove[0];
                  if (firstSelectedLine.actllineno < firstSelectedLine.afterlineno) {
                     base.updateLineItems(self.setActivePage, null, 'updateMultiple', firstSelectedLine.actllineno);
                  } else {
                     base.updateLineItems(self.setActivePage, null, 'updateMultiple', firstSelectedLine.afterlineno);
                  }
                  break;
               default:
                  MessageService.error('global.error', 'Invalid MoveType, unable to update Line Items.');
                  break;
            }
         });
      }
   };

   self.resortSelectedLines = function (linesToMove) {
      return linesToMove.sort(function (a, b) {
         return a.actllineno - b.actllineno;
      });
   };

   self.moveAfterClicked = function () {
      ModalService.showModal('oe/oeet/select-products/lines-grid/move-line-after.json', 'OeetLinesGridMoveLineAfterModalCtrl as lgMa', $scope, function (modal) {
         self.moveAfterModal = modal;
      });
   };

   self.lostBusinessClicked = function () {
      var selectedLines = GridService.getSelectedRecords(self.lineItemsGrid);
      var linesToCheck = [];
      var hasError = false;

      self.remainingLines = [];
      $.extend(true, self.remainingLines, base.lineItems);
      selectedLines.forEach(function (line) {
         //already lost business lines
         if (line.specnstype === 'l') {
            MessageService.error('global.error', 'message.cannot.send.lost.business.lines.to.lost.business');
            hasError = true;
            return;
         }
         //implied core lines
         if (line.impliedcorefl) {
            MessageService.error('global.error', 'message.cannot.send.implied.core.lines.to.lost.business');
            hasError = true;
            return;
         }
         //core line with allocation
         if (line.coreallocationfl) {
            MessageService.error('global.error', 'message.cannot.send.core.line.to.lost.business.must.remove.core.allocations');
            hasError = true;
            return;
         }
         //lines that have ties who need to be checked before sending to lost business
         if (line.ordertype && line.orderaltno) {
            linesToCheck.push({
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf,
               lineno: line.actllineno
            });
         }
         //remove from remaining lines list
         var index = self.remainingLines.indexOf(line);
         self.remainingLines.splice(index, 1);
      });

      //if the line(s) selected have been tendered against and are the last active lines, cannot send to lost business
      if (base.oehdr.tendamt && self.remainingLines.length === 0) {
         MessageService.error('global.error', 'error.tendered.amount.must.be.reversed.before.last.line');
         hasError = true;
         return;
      }

      //prevent Lost Business logic from continuing to auth point and modal
      if (hasError) { return; }

      //check to see if we require an auth point
      if (self.authPointSecurity) {
         self.checkLostBusinessAuthSecurity(linesToCheck);
      } else {
         var authPointRetrieveCriteria = {
            functionname: Constants.MENU_FUNCTION_OEET,
            oper2: UserService.getUserName()
         };
         DataService.post('api/shared/assharedentry/authpointsecurityretrieve', { data: authPointRetrieveCriteria, busy: true }, function (data) {
            if (data) {
               self.authPointSecurity = data;

               self.checkLostBusinessAuthSecurity(linesToCheck);
            }
         });
      }
   };

   self.checkLostBusinessAuthSecurity = function (linesToCheck) {
      //lines that have ties who need to be checked before sending to lost business
      if (linesToCheck.length === 0) { //no tied lines selected
         self.showLostBusinessModal();
         return;
      }

      var authPointRequired;
      self.authPointSecurity.forEach(function (authPoint) {
         if (authPoint.sectionname === 'lines' && authPoint.pointname === 'ordertype' &&
            authPoint.modename === '' && authPoint.transtype === '' &&
            authPoint.securcd === 1) {
            authPointRequired = true;
         }
      });

      if (authPointRequired) {
         DataService.post('api/oe/asoeinquiry/oecheckcancellinetieauth', { data: linesToCheck, busy: true }, function (data) {
            if (data) {
               AuthService.createAuthPoint(Constants.MENU_FUNCTION_OEET, 'lines', 'ordertype', '', '', null, function () {
                  //success callback
                  self.showLostBusinessModal();
               }, null);
            } else {
               self.showLostBusinessModal();
            }
         });
      } else {
         self.showLostBusinessModal();
      }
   };

   self.showLostBusinessModal = function () {
      self.currentPage = self.lineItemsGrid.pager.activePage;

      ModalService.showModal('oe/oeet/select-products/lines-grid/lost-business.json', 'OeetLinesGridLostBusinessModalCtrl as lgLb', $scope, function (modal) {
         self.lostBusinessModal = modal;
      });
   };

   self.lineFulfillmentClicked = function () {
      var selectedLine = GridService.getSelectedRecords(self.lineItemsGrid);
      selectedLine.forEach(function (line) {
         if (line.specnstype.toLowerCase() !== 'i' &&
            line.specnstype.toLowerCase() !== 'e' &&
            line.specnstype.toLowerCase() !== 't' &&
            line.specnstype.toLowerCase() !== 'l') {
            $state.go('.lineFulfillment', {
               ofFunctionName: 'oeet',
               ofOrderNo: base.oehdr.orderno,
               ofOrderSuf: base.oehdr.ordersuf,
               ofLineNo: line.actllineno
            });
         }
      });
   };

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

      $state.go('^.advancedLineEntry', { lineNo: lineItem.actllineno, fromEditLines: true, activePage: self.lineItemsGrid.pager.activePage });
   };

   self.productHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;

      //dont want to attempt navigation on a comment or sub-total line
      if (lineItem.specnstype !== 'i' && lineItem.specnstype !== 'e' && lineItem.specnstype !== 't') {
         $state.go('icip.detail', { pk: lineItem.shipprod, pk2: base.oehdr.whse });
      }
   };

   self.priceHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;

      //dont want to attempt navigation on a comment or sub-total line
      if (lineItem.specnstype !== 'i' && lineItem.specnstype !== 'e' && lineItem.specnstype !== 't') {
         $state.go('oeip.detail', {
            pk: base.oehdr.custno,
            pk2: base.oehdr.whse,
            pk3: lineItem.shipprod,
            pk4: base.oehdr.shipto
         });
      }
   };

   self.qtyHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;

      //dont want to attempt navigation on a comment or sub-total line
      if (lineItem.specnstype !== 'i' && lineItem.specnstype !== 'e' && lineItem.specnstype !== 't') {
         $state.go('icia.detail', { pk: lineItem.shipprod, pk2: base.oehdr.whse }, { reload: 'icia.detail' });
      }
   };

   self.pdRecordHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;

      //dont want to attempt navigation on a comment or sub-total line
      if (lineItem.specnstype !== 'i' && lineItem.specnstype !== 'e' && lineItem.specnstype !== 't') {
         $state.go('pdsp.customerMaster', { pk: lineItem.pdrecno });
      }
   };

   self.orderAltNoHyperlinkClicked = function (e, args) {
      var lineItem = args[0].item;

      switch (lineItem.ordertypedspl) {
         //need orderaltno & suffix is always 0 for each nav
         case "WT":
            $state.go('wtit.detail', { pk: lineItem.orderaltno, pk2: 0 });
            break;
         case "PO":
            $state.go('poip.detail', { pk: lineItem.orderaltno, pk2: 0 });
            break;
         case "VA":
            $state.go('vaif.detail', { pk: lineItem.orderaltno, pk2: 0 });
            break;
         case "KP":
            $state.go('kpiw.detail', { pk: lineItem.orderaltno, pk2: 0 });
            break;
      }
   };

   self.back = function () {
      $state.go(base.defaultLineEntryState);

      if (base.defaultLineEntryState === base.baseState + '.selectProducts') {
         $scope.sp.view.applyAutoFocus();
      }
   };
});

app.controller('OeetLinesGridMoveLineAfterModalCtrl', function ($scope) {
   // alias => lgMa
   var self = this;
   var lg = $scope.lg;

   self.submit = function () {
      lg.moveClicked('after', self.moveAfter);

      lg.moveAfterModal.destroy();
   };

   self.cancel = function () {
      lg.moveAfterModal.destroy();
   };
});

app.controller('OeetLinesGridLostBusinessModalCtrl', function ($scope, $translate, GridService, DataService, MessageService) {
   // alias => lgLb
   var self = this;
   var base = $scope.base;
   var lg = $scope.lg;

   self.submit = function () {
      if (base.orderEntrySettings.lostbusreasonfl && !self.lostBusinessReason) {
         MessageService.error('global.error', 'global.lost.business.reason.required');
      } else {
         var selectedLines = GridService.getSelectedRecords(lg.lineItemsGrid);
         var lineNoList = '';
         for (var i = 0; i < selectedLines.length; i++) {
            var line = selectedLines[i];
            lineNoList += line.actllineno;
            if (i < selectedLines.length - 1) {
               lineNoList += ',';
            }
         }

         var lostBusinessLines = {
            orderno: base.oehdr.orderno,
            ordersuf: base.oehdr.ordersuf,
            linenolist: lineNoList,
            lostbusty: self.lostBusinessReason
         };
         DataService.post('api/oe/asoelineextra/oelostbusinesslines', { data: lostBusinessLines, busy: true }, function () {

            // If using AvaTax, don't calculate taxes on each line add
            // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
            if (base.taxMethodType.toLowerCase() === 'a') {
               base.calcsob = 'x';
            } else {
               base.calcsob = 'o';
            }

            if (self.showInactive) {
               if (selectedLines.length > 1) {
                  selectedLines = selectedLines.sort(function (a, b) {
                     return a.actllineno - b.actllineno;
                  });
               }
               var firstSelectedLine = selectedLines[0];
               var lastSelectedLine = selectedLines[selectedLines.length - 1];
               base.updateLineItems(lg.setActivePage, null, 'updateMultiple', firstSelectedLine.actllineno, lastSelectedLine.actllineno);
            } else {
               base.updateLineItems(lg.setActivePage);
            }

            lg.lostBusinessModal.destroy();
         });
      }
   };

   self.cancel = function () {
      lg.lostBusinessModal.destroy();
   };
});

app.controller('OeetLinesGridPricingCostingWorksheetCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   // alias => lgPcw
   var self = this;
   var base = $scope.base;
   var lg = $scope.lg;

   self.worksheetType = $stateParams.worksheetType;
   self.priceTypeList = [];

   if (self.worksheetType === 'c') {
      self.title = $translate.instant('global.costing.worksheet');
   } else {
      self.title = $translate.instant('global.pricing.worksheet');
   }

   if (base.isCreditRebillFl && base.oehdr.oetype.toLowerCase() === 'cr') {
      $stateParams.selectedLines.forEach(function (line) {
         if (line.returnfl) {
            self.inquiryOnly = true;
         }
      });
   }

   var pcWorksheetInitRequest = {
      oeiolinesresults: $stateParams.selectedLines,
      pvOrderno: base.oehdr.orderno,
      pvOrdersuf: base.oehdr.ordersuf,
      pvProcty: self.worksheetType,
      pvMaint: base.isAddOrderMode ? 'A' : 'C'
   };
   DataService.post('api/oe/asoeline/oelinepricecostworksheetinit', { data: pcWorksheetInitRequest, busy: true }, function (data) {
      if (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            self.worksheet = data.oelineworksheet;
            self.setPriceTypeList();
            self.originalPricing = data.oelineorigprice;
            self.movePricing = data.oelinemovepricing;
            self.selectedLines = data.oelinemovemultiple;
         } else {
            $state.go('^');
         }
      }
   });

   self.setPriceTypeList = function () {
      var newPriceTypes = [];
      var availablePriceTypes = self.worksheet.linelist.split(',');
      availablePriceTypes.forEach(function (priceType) {
         var priceTypeLabel = '';
         switch (priceType.toLowerCase()) {
            case 'cp':
               priceTypeLabel = $translate.instant('global.cost.plus');
               break;
            case 'mp':
               priceTypeLabel = $translate.instant('global.margin.percent');
               break;
            case 'ta':
               priceTypeLabel = $translate.instant('global.total.amount');
               break;
            case 'pl':
               priceTypeLabel = $translate.instant('global.price.level');
               break;
            case 'iq':
               priceTypeLabel = $translate.instant('global.ignore.quote');
               break;
            case 'ct':
               priceTypeLabel = $translate.instant('global.customer.price.type');
               break;
            case 'pt':
               priceTypeLabel = $translate.instant('global.product.price.type');
               break;
            case 'cd':
               priceTypeLabel = $translate.instant('global.chain.discount.price.percent');
               break;
            case 'sp':
               priceTypeLabel = $translate.instant('global.system.price');
               break;
            case 'pp':
               priceTypeLabel = $translate.instant('global.previous.price');
               break;
            case 'pr':
               priceTypeLabel = $translate.instant('global.previous.invoice.price');
               break;
            case 'tm':
               priceTypeLabel = $translate.instant('global.cost.multiplier');
               break;
            case 'tk':
               priceTypeLabel = $translate.instant('global.cost.markup');
               break;
         }
         newPriceTypes.push({ label: priceTypeLabel, value: priceType });
      });
      self.priceTypeList = newPriceTypes;
   };

   self.priceCostFieldChanged = function (fieldName) {
      var pcWorksheetDetailRequest = {
         oelinemovepricing: self.movePricing,
         oelineorigprice: self.originalPricing,
         oelineworksheet: self.worksheet,
         pvOrderno: base.oehdr.orderno,
         pvOrdersuf: base.oehdr.ordersuf,
         pvMaint: base.isAddOrderMode ? 'A' : 'C',
         pvFieldname: fieldName
      };
      DataService.post('api/oe/asoeline/oelinepricecostworksheetdetail', { data: pcWorksheetDetailRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.worksheet = data.oelineworksheet;
               self.setPriceTypeList();
               self.originalPricing = data.oelineorigprice;
               self.movePricing = data.oelinemovepricing;
            }
         }
      });
   };

   self.submit = function () {
      var pcWorksheetUpdateRequest = {
         oelinemovemultiple: self.selectedLines,
         oelinemovepricing: self.movePricing,
         oelineworksheet: self.worksheet,
         pvOrderno: base.oehdr.orderno,
         pvOrdersuf: base.oehdr.ordersuf
      };
      DataService.post('api/oe/asoeline/oelinepricecostworksheetupdate', { data: pcWorksheetUpdateRequest, busy: true }, function (data) {
         if (data.length === 0 || !MessageService.processMessaging(data)) {
            var sortedSelectedLines = self.selectedLines.sort(function (a, b) {
               return a.actllineno - b.actllineno;
            });
            var firstSelectedLine = sortedSelectedLines[0];
            var lastSelectedLine = sortedSelectedLines[sortedSelectedLines.length - 1];

            // If using AvaTax, don't calculate taxes on each line add
            // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
            if (base.taxMethodType.toLowerCase() === 'a') {
               base.calcsob = 'x';
            } else {
               base.calcsob = 'o';
            }

            base.updateLineItems(lg.setActivePage, null, 'updateMultiple', firstSelectedLine.actllineno, lastSelectedLine.actllineno);

            $state.go('^');
         }
      });
   };

   self.cancel = function () {
      $state.go('^');
   };
});

app.controller('OeetLinesGridMultiLineMoveCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService, ModalService, Utils) {
   // alias => lgMlm
   var self = this;
   var base = $scope.base;
   var lg = $scope.lg;

   self.oelineMoveCollection = [];
   self.isAnyLineSelected = false;
   self.isOneSubLineSelected = false;
   self.isMultipleSubLineSelected = false;

   self.isMultiLineMove = function () {
      return $state.is(base.baseState + '.selectProducts.linesGrid.multiLineMove');
   };

   DataService.get('api/oe/asoeline/oemultiplelinemoveretrieve/' + base.oehdr.orderno.toString() + '/' + base.oehdr.ordersuf.toString() + '/' + base.isAddOrderMode, { isBusy: true }, function (data) {
      if (data) {
         Utils.replaceArray(self.oelineMoveCollection, data);
         self.setLineMoveDisplayCollection();
      }
   });

   self.setLineMoveDisplayCollection = function () {
      var newOelineMoveCollection = [];

      self.oelineMoveCollection.forEach(function (line) {
         if (!line.deletefl && line.shipprod) {
            if (line.specnstype === 'i' || line.specnstype === 'e') {
               if (lg.showComments) {
                  newOelineMoveCollection.push(line);
               }
            } else if (line.specnstype === 'l') {
               if (lg.showInactive) {
                  newOelineMoveCollection.push(line);
               }
            } else if (line.specnstype === 't') {
               if (lg.showSubTotal) {
                  newOelineMoveCollection.push(line);
               }
            } else {
               newOelineMoveCollection.push(line);
            }
         }
      });

      self.oelineMoveDisplayCollection = newOelineMoveCollection;

      self.setButtonsEnabled();
   };

   self.moveClicked = function (moveType, moveAfter) {
      var multiLineMoveRequest = {
         oelinemovemultiple: self.oelineMoveCollection,
         cMoveType: moveType,
         iMoveToLn: moveAfter
      };
      DataService.post('api/oe/asoeline/oemultiplelinemovemove', { data: multiLineMoveRequest, busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(self.oelineMoveCollection, data);
            self.setLineMoveDisplayCollection();
         }
      });
   };

   self.moveAfterClicked = function () {
      ModalService.showModal('oe/oeet/select-products/lines-grid/move-line-after.json', 'OeetLinesGridMoveMultiLineAfterModalCtrl as lgMa', $scope, function (modal) {
         self.moveAfterModal = modal;
      });
   };

   self.setPrintFlag = function (e, args) {
      var row = args.row;
      var value = args.value;

      var line = self.oelineMoveCollection[row];

      if (line.specnstype !== 'i' && line.specnstype !== 'e' && line.specnstype !== 't') {
         line.selectedfl = true;

         var multiLineSetPrintFlagRequest = {
            oelinemovemultiple: self.oelineMoveCollection,
            lPrintFlag: value
         };

         self.runSetPrintFlag(multiLineSetPrintFlagRequest);
      }
   };

   self.setPrintFlagButton = function (printFlag) {
      var multiLineSetPrintFlagRequest = {
         oelinemovemultiple: self.oelineMoveCollection,
         lPrintFlag: printFlag
      };

      self.runSetPrintFlag(multiLineSetPrintFlagRequest);
   };

   self.runSetPrintFlag = function (multiLineSetPrintFlagRequest) {
      DataService.post('api/oe/asoeline/oemultiplelinemovesetprintflag', { data: multiLineSetPrintFlagRequest, busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(self.oelineMoveCollection, data);
            self.setLineMoveDisplayCollection();
         }
      });
   };

   self.createSubLine = function () {
      //clear any selected lines
      self.oelineMoveCollection.forEach(function (line) {
         if (line.selectedfl) {
            line.selectedfl = false;
         }
      });

      $state.go(base.baseState + '.selectProducts.linesGrid.multiLineMove.subLine', { isInAddMode: true });
   };

   self.editSubLine = function () {
      var selectedSubLine;
      self.oelineMoveCollection.forEach(function (line) {
         if (line.selectedfl && (line.specnstype === 'i' || line.specnstype === 'e' || line.specnstype === 't')) {
            selectedSubLine = line;
         }
      });

      if (selectedSubLine) {
         $state.go(base.baseState + '.selectProducts.linesGrid.multiLineMove.subLine', { selectedSubLine: selectedSubLine });
      }
   };

   self.deleteSubLine = function () {
      var selectedSubLine;
      var selectedSubLineIndex;
      self.oelineMoveCollection.forEach(function (line, index) {
         if (line.selectedfl && (line.specnstype === 'i' || line.specnstype === 'e' || line.specnstype === 't')) {
            selectedSubLine = line;
            selectedSubLineIndex = index;
         }
      });

      if (selectedSubLine) {
         DataService.post('api/oe/asoeline/oemultiplelinemovecommdelete', { data: selectedSubLine, busy: true }, function (data) {
            if (data) {
               self.oelineMoveCollection[selectedSubLineIndex] = data;
               self.setLineMoveDisplayCollection();
            }
         });
      }
   };

   self.setButtonsEnabled = function () {
      var lineSelected = false;
      var subLineSelected = false;
      var selectedLineCount = 0;
      var selectedSubLineCount = 0;
      self.oelineMoveCollection.forEach(function (line) {
         if (line.selectedfl) {
            if (line.specnstype === 'i' || line.specnstype === 'e' || line.specnstype === 't') {
               subLineSelected = true;
               selectedSubLineCount++;
            } else {
               lineSelected = true;
               selectedLineCount++;
            }
         }
      });

      self.isAnyLineSelected = lineSelected;

      if (selectedSubLineCount === 0) {
         self.isOneSubLineSelected = false;
         self.isMultipleSubLineSelected = false;
      } else if (selectedSubLineCount === 1 && selectedLineCount === 0 && subLineSelected) {
         self.isOneSubLineSelected = true;
         self.isMultipleSubLineSelected = false;
      } else if (selectedSubLineCount > 1 && selectedLineCount === 0 && subLineSelected) {
         self.isMultipleSubLineSelected = true;
         self.isOneSubLineSelected = false;
      }
   };

   self.submit = function () {
      var multiLineMoveUpdateRequest = {
         oelinemovemultiple: self.oelineMoveCollection,
         iOrderNo: base.oehdr.orderno,
         iOrderSuf: base.oehdr.ordersuf
      };
      DataService.post('api/oe/asoeline/oemultiplelinemoveupdate', { data: multiLineMoveUpdateRequest, busy: true }, function () {

         // Retotal order based on (O)rdered, (S)hipped or (B)oth
         base.calcsob = 'o';

         base.updateLineItems(self.cancel);
      });
   };

   self.cancel = function () {
      $state.go('^');
   };
});

app.controller('OeetLinesGridMoveMultiLineAfterModalCtrl', function ($scope) {
   // alias => lgMa
   var self = this;
   var lgMlm = $scope.lgMlm;

   self.submit = function () {
      lgMlm.moveClicked('after', self.moveAfter);

      lgMlm.moveAfterModal.destroy();
   };

   self.cancel = function () {
      lgMlm.moveAfterModal.destroy();
   };
});

app.controller('OeetLinesGridMultiLineMoveSubLineCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Utils) {
   // alias => lgMlmSl
   var self = this;
   var lgMlm = $scope.lgMlm;

   self.isInAddMode = $stateParams.isInAddMode;
   self.selectedSubLine = $stateParams.selectedSubLine ? $stateParams.selectedSubLine : {};

   if ($stateParams.isInAddMode) {
      self.title = $translate.instant('global.add.comment.slash.sub.total.line');
      self.newSubLine = {
         addtype: 'b',
         linetype: 'i',
         lineno: 0
      };
   } else {
      self.title = $translate.instant('global.edit.comment.slash.sub.total.line');
      self.newSubLine = {
         label: self.selectedSubLine.shipprod,
         descrip: self.selectedSubLine.descrip,
         linetype: self.selectedSubLine.specnstype
      };
   }

   self.submit = function () {
      //check to make sure the line # they entered is an actual line
      var selectedOelineMove;
      if (self.isInAddMode) {
         lgMlm.oelineMoveCollection.forEach(function (line) {
            if (line.actlnewlineno === self.newSubLine.lineno && !selectedOelineMove) {
               line.selectedfl = true;
               selectedOelineMove = line;
            }
         });
      } else {
         lgMlm.oelineMoveCollection.forEach(function (line) {
            if (line.internalseqno === self.selectedSubLine.internalseqno && !selectedOelineMove) {
               line.selectedfl = true;
               selectedOelineMove = line;
            }
         });
      }

      if (selectedOelineMove) {
         var maintMode = self.isInAddMode ? 'a' : 'c';
         var multiLineMoveUpdateRequest = {
            oelinemovemultiple: lgMlm.oelineMoveCollection,
            cMaintMode: maintMode,
            cAddType: self.newSubLine.addtype,
            cLineType: self.newSubLine.linetype,
            cCommDesc1: self.newSubLine.label,
            cCommDesc2: self.newSubLine.descrip
         };
         DataService.post('api/oe/asoeline/oemultiplelinemovecommupdt', { data: multiLineMoveUpdateRequest, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(lgMlm.oelineMoveCollection, data);

               lgMlm.setLineMoveDisplayCollection();

               $state.go('^');
            }
         });
      } else {
         MessageService.error('global.error', 'message.invalid.insertion.line.number.entered');
         self.view.applyAutoFocus();
      }
   };

   self.cancel = function () {
      $state.go('^');
   };
});