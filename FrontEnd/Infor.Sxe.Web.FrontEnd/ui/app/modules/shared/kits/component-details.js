'use strict';

app.controller('KitComponentDetailsCtrl', function ($state, $scope, $stateParams, $translate, GridService, DataService, MessageService, Utils) {
   //alias => kitCd
   var self = this;
   var base = $scope.base;
   var kit = $scope.kit;
   var ale = $scope.ale;

   self.component = $stateParams.component;
   self.matchedSubComponents = $stateParams.matchedSubComponents; //need these to nav back to group/option states correctly
   self.componentType = $stateParams.componentType; //add, details, group
   self.isFromKPEWMaster = $stateParams.isFromKPEWMaster;
   self.componentDetails = {};
   self.stickyNonStockData = {};
   self.componentCriteria = {};
   self.sourcingEnabled = false;
   var lineTieRetrieveRequest = {};

   self.componentTieHeader = {
      runmode: 'comp',
      ourproc: kit.sourcingHeader.ourproc,
      orderdisp: kit.header.orderdisp,
      orderno: kit.header.orderno,
      ordersuf: kit.header.ordersuf,
      transtype: kit.header.oetype,
      whse: kit.header.whse,
      maintmode: (kit.sourcingHeader.ourproc === 'kpew') ? 'c' : 'a'
   };
   
   //User Hook (do not rename)
   self.setupComponentDetailsContinue = function (data) {
      if (kit.sourcingHeader.ourproc === 'oeet') {
         if (self.componentType.toLowerCase() === 'add') {
            lineTieRetrieveRequest = {
               oeline: kit.line,
               oelinelinetiehdr: {
                  runmode: 'comp-add',
                  orderdisp: kit.header.orderdisp,
                  orderno: kit.header.orderno,
                  ordersuf: kit.header.ordersuf,
                  ourproc: kit.sourcingHeader.ourproc,
                  transtype: kit.header.oetype,
                  whse: kit.header.whse
               }
            };
            DataService.post('api/oe/asoeline/oelinelinetieretrieve', { data: lineTieRetrieveRequest, busy: true }, function (oeData) {
               if (oeData) {
                  self.componentDetailTie = oeData[0];
               }
            });
         } else { // details, group
            kit.sourcingCollection.forEach(function (compTie) {
               if (compTie.oeelkrowid === self.component.oeelkrowid) {
                  self.componentDetailTie = compTie;
               }
            });
         }
      } else if (kit.sourcingHeader.ourproc === 'kpew') {
         if (self.componentType.toLowerCase() === 'add') {
            var compTieRetrieveRequest = {
               runmode: 'comp-add',
               orderdisp: kit.header.orderdisp,
               orderno: kit.header.orderno,
               ordersuf: kit.header.ordersuf,
               ourproc: kit.sourcingHeader.ourproc,
               transtype: '',
               whse: kit.header.whse
            };
            DataService.post('api/kp/askpentry/kpcomptieretrieve', { data: compTieRetrieveRequest, busy: true }, function (compData) {
               if (compData) {
                  self.componentDetailTie = compData[0];
               }
            });
         } else { // details, group
            kit.sourcingCollection.forEach(function (compTie) {
               if (compTie.oeelkrowid === self.component.oeelkrowid) {
                  self.componentDetailTie = compTie;
               }
            });
         }
      }
   };

   self.setupComponentDetails = function () {
      self.componentDetailsCriteria = {
         orderno: kit.header.orderno,
         ordersuf: kit.header.ordersuf,
         currproc: kit.header.currproc,
         ordtype: (kit.sourcingHeader.ourproc === 'kpew') ? 'w' : 'o',
         whse: kit.header.whse,
         kitprod: kit.line.prod,
         lineno: kit.line.lineno,
         stkqtyord: kit.line.qtyord,
         ourproc: 'oeetl',
         maintL: kit.line.maintL,
         specNsType: kit.line.specnstype,
         returnfl: kit.linereturnfl,
         fabwhse: kit.line.bodfabwhse,
         wlpicktype: kit.line.wlpicktype,
         inquiryfl: false,
         nsokfl: true
      };

      if (self.componentType.toLowerCase() === 'add') {
         self.componentDetailsCriteria.addfl = true;
         self.componentDetailsCriteria.modfl = true;
      } else { // details, group
         self.componentDetailsCriteria.addfl = false;
         self.componentDetailsCriteria.modfl = false;
         self.componentDetailsCriteria.seqno = self.component.seqno;
      }

      DataService.post('api/oe/asoeinquiry/kitcreatedetailstt', { data: self.componentDetailsCriteria, busy: true }, function (data) {
         if (data) {
            self.componentDetails = data.kitcreatedetailsttresults;
            self.componentCriteria = data.kitcreatedetailsttcriteria;
            self.sourcingEnabled = data.kitcreatedetailsttresults.sourcingenabled;
            if (!self.componentDetails.unit) {
               self.componentDetails.unit = 'each';
            }

            //User Hook (do not rename)
            self.setupComponentDetailsContinue(data);
         }
      });
   };

   // initialize component details
   self.setupComponentDetails();

   self.getTitle = function () {
      switch (self.componentType.toLowerCase()) {
         case 'add': //ignore jslint - correct indentation
            return $translate.instant('global.add.component'); //ignore jslint - correct indentation
         case 'details': //ignore jslint - correct indentation
            return $translate.instant('global.component.details'); //ignore jslint - correct indentation
         case 'group': //ignore jslint - correct indentation
            return $translate.instant('global.group.component.details'); //ignore jslint - correct indentation
         case 'option': //ignore jslint - correct indentation
            return $translate.instant('global.option.component.details'); //ignore jslint - correct indentation
         default: //ignore jslint - correct indentation
            return $translate.instant('global.component.details'); //ignore jslint - correct indentation
      }
   };

   self.getSubTitle = function () {
      if (kit.line.prod) {
         if (kit.line.proddesc) {
            return $translate.instant('global.kit') + ': ' + kit.line.prod + ' - ' + kit.line.proddesc;
         } else if (kit.kitSingle.proddesc) {
            return $translate.instant('global.kit') + ': ' + kit.line.prod + ' - ' + kit.kitSingle.proddesc;
         } else {
            return $translate.instant('global.kit') + ': ' + kit.line.prod;
         }
      } else {
         return '';
      }
   };

   self.isNonStock = function () {
      return $state.is(kit.parentState + '.componentDetails.nonStock');
   };

   self.isSubstitutes = function () {
      return $state.is(kit.parentState + '.componentDetails.substitutes');
   };

   self.isSerials = function () {
      return $state.is(kit.parentState + '.componentDetails.serials');
   };

   self.isLots = function () {
      return $state.is(kit.parentState + '.componentDetails.lots');
   };

   self.isWarehouseManager = function () {
      return $state.is(kit.parentState + '.componentDetails.bin-allocation');
   };

   //User Hook (do not rename)
   self.componentDetailFieldChangedXrefQuestion = function (data) {
      MessageService.yesNoCancel('global.confirmation.needed', 'question.product.found.in.catalog.accept.catalog.item', function () {
         //yes callback
         self.processAcceptCatalogPopup('y', data.kitcreatedetailsttresults);
      }, function () {
         //no callback
         self.processAcceptCatalogPopup('n', data.kitcreatedetailsttresults);
      }, function () {
         //cancel callback
         self.processAcceptCatalogPopup('c', data.kitcreatedetailsttresults);
      });
   };

   //User Hook (do not rename)
   self.componentDetailFieldChangedCreateCatalogQuestion = function (data) {
      MessageService.yesNoCancel('global.confirmation.needed', 'question.create.catalog.product.in.inventory', function () {
         //yes callback
         self.processCreateCatalogPopup('y', data.kitcreatedetailsttresults);
      }, function () {
         //no callback
         self.processCreateCatalogPopup('n', data.kitcreatedetailsttresults);
      }, function () {
         //cancel callback
         self.processCreateCatalogPopup('c', data.kitcreatedetailsttresults);
      });
   };

   self.componentDetailFieldChanged = function (fieldName) {
      var kitDetailFieldLeaveRequest = {
         kitcreatedetailsttcriteria: self.componentDetailsCriteria,
         kitcreatedetailsttresults: self.componentDetails,
         cField: fieldName,
         cOrderType: self.componentDetailTie ? self.componentDetailTie.ordertype : 'n'
      };
      DataService.post('api/oe/asoeline/kitdetailfieldleave', { data: kitDetailFieldLeaveRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.kitcreatedetailsttresults.xrefcatflasked) {
                  //User Hook (do not rename)
                  self.componentDetailFieldChangedXrefQuestion(data);
               }
               else if (data.kitcreatedetailsttresults.createcatflasked) {
                  //User Hook (do not rename)
                  self.componentDetailFieldChangedCreateCatalogQuestion(data);
               }
               else {
                  self.componentDetails = data.kitcreatedetailsttresults;
                  self.sourcingEnabled = data.kitcreatedetailsttresults.sourcingenabled;
               }
            }
         }
      });
   };

   self.processAcceptCatalogPopup = function (answer, componentDetails) {
      switch (answer.toLowerCase()) {
         case 'y': //ignore jslint - correct indentation
            self.componentDetails.xrefcatflasked = componentDetails.xrefcatflasked; //ignore jslint - correct indentation
            self.componentDetails.xrefcatflanswer = true; //ignore jslint - correct indentation

            self.componentDetailFieldChanged('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'n': //ignore jslint - correct indentation
            self.componentDetails.xrefcatflasked = componentDetails.xrefcatflasked; //ignore jslint - correct indentation
            self.componentDetails.xrefcatflanswer = false; //ignore jslint - correct indentation

            self.componentDetailFieldChanged('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'c': //ignore jslint - correct indentation
            self.back(); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

   self.processCreateCatalogPopup = function (answer, componentDetails) {
      switch (answer.toLowerCase()) {
         case 'y': //ignore jslint - correct indentation
            self.componentDetails.createcatflasked = componentDetails.createcatflasked; //ignore jslint - correct indentation
            self.componentDetails.createcatflanswer = true; //ignore jslint - correct indentation

            self.componentDetailFieldChanged('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'n': //ignore jslint - correct indentation
            self.componentDetails.createcatflasked = componentDetails.createcatflasked; //ignore jslint - correct indentation
            self.componentDetails.createcatflanswer = false; //ignore jslint - correct indentation

            self.componentDetailFieldChanged('shipprod'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'c': //ignore jslint - correct indentation
            self.back(); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

   self.prodCostLabel = function () {
      if (self.componentDetails.pdprodcosthidden) {
         return '';
      } else {
         return self.componentDetails.pdprodcost;
      }
   };

   self.prodCost = function () {
      var prodCost = '';
      if (!self.componentDetails.prodcosthidden && self.componentDetails.prodcost) {
         prodCost += self.componentDetails.prodcost;
      }
      if (!self.componentDetails.speccosttyhidden && self.componentDetails.speccostty) {
         prodCost += '(' + self.component.speccostty + ')';
      }
      return prodCost;
   };

   self.priceLabel = function () {
      if (self.componentDetails.pdpricehidden) {
         return '';
      } else {
         return self.componentDetails.pdprice;
      }
   };

   self.price = function () {
      var price = '';
      if (!self.componentDetails.pricehidden && self.componentDetails.price) {
         price += self.componentDetails.price;
      }
      if (!self.componentDetails.specpricetyhidden && self.componentDetails.specpricety) {
         price += '(' + self.component.specpricety + ')';
      }
      return price;
   };

   self.sourcingClicked = function () {
      var lineTieTypeCriteria = {
         runmode: 'comp',
         ourproc: kit.sourcingHeader.ourproc,
         whse: kit.header.whse,
         transtype: (kit.sourcingHeader.ourproc === 'kpew') ? '' : kit.header.oetype
      };
      DataService.post('api/oe/asoeline/oelinelinetietypedropdown', { data: lineTieTypeCriteria, busy: true }, function (data) {
         if (data) {
            self.orderTypes = base.getOrderTypesFromTieDropdownData(data);

            //need to save the initial tie incase they cancel
            self.initialComponentTie = self.componentDetailTie;

            $state.go('.sourcing', {
               oehdr: kit.header,
               tie: self.componentDetailTie,
               tieOrderAltNoRef: 'kitCd.componentDetailTie.orderaltno',
               oeline: kit.line,
               orderTypes: 'kitCd.orderTypes',
               oelineComponent: self.componentDetails,
               isLimitShipVia: kit.limitShipVia,
               sourceFieldChangedCallback: self.sourcingFieldChangedCallback,
               cancelCallback: self.sourcingCancelCallback,
               finishCallback: self.sourcingFinishCallback,
               backCallback: self.sourcingCancelCallback,
               conoForIcWhseAvailCriteria: kit.conoForIcWhseAvailCriteria,
               whseTypeForIcWhseAvailCriteria: kit.whseTypeForIcWhseAvailCriteria,
               showDocDisposition: false
            });
         }
      });
   };

   self.sourcingFieldChangedCallback = function (fieldName) {

      if (kit.sourcingHeader.ourproc === 'kpew') {
         if (self.componentType.toLowerCase() === 'add') {
            var kpAddTieLeaveFieldRequest = {
               kitcreatedetailsttcriteria: self.componentDetailsCriteria,
               kitcreatedetailsttresults: self.componentDetails,
               oelinelinetie: self.componentDetailTie,
               oelinelinetiehdr: self.componentTieHeader,
               cFieldName: fieldName
            };
            DataService.post('api/kp/askpentry/kpcompaddtieleavefield', { data: kpAddTieLeaveFieldRequest, busy: true }, function (data) {
               if (data) {
                  MessageService.processMessaging(data.messaging);
                  Utils.replaceObject(self.componentDetailTie, data.oelinelinetie);

                  //User Hook (do not rename)
                  if (self.kpCompAddTieLeaveFieldContinue) {
                     self.kpCompAddTieLeaveFieldContinue(data);
                  }
               }
            });
         } else {
            var kpTieLeaveFieldRequest = {
               oelinelinetie: self.componentDetailTie,
               oelinelinetiehdr: self.componentTieHeader,
               cFieldName: fieldName
            };
            DataService.post('api/kp/askpentry/kpcomptieleavefield', { data: kpTieLeaveFieldRequest, busy: true }, function (data) {
               if (data) {
                  MessageService.processMessaging(data.messaging);
                  Utils.replaceObject(self.componentDetailTie, data.oelinelinetie);

                  //User Hook (do not rename)
                  if (self.kpCompTieLeaveFieldContinue) {
                     self.kpCompTieLeaveFieldContinue(data);
                  }
               }
            });
         }
      } else if (self.componentTieHeader.maintmode.toLowerCase() === 'a') {
         var compAddTieLeaveFieldRequest = {
            kitcreatedetailsttcriteria: self.componentDetailsCriteria,
            kitcreatedetailsttresults: self.componentDetails,
            oeline: {},
            oelinelinetie: self.componentDetailTie,
            oelinelinetiehdr: self.componentTieHeader,
            cFieldName: fieldName
         };
         DataService.post('api/oe/asoelineextra/oecompaddtieleavefield', { data: compAddTieLeaveFieldRequest, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);
               Utils.replaceObject(self.componentDetailTie, data.oelinelinetie);

               //User Hook (do not rename)
               if (self.oeCompAddTieLeaveFieldContinue) {
                  self.oeCompAddTieLeaveFieldContinue(data);
               }
            }
         });
      } else {
         var lineTieLeaveFieldRequest = {
            oeline: {},
            oelinelinetie: self.componentDetailTie,
            oelinelinetiehdr: self.componentTieHeader,
            cFieldName: fieldName
         };
         DataService.post('api/oe/asoeline/oelinelinetieleavefield', { data: lineTieLeaveFieldRequest, busy: true }, function (data) {
            if (data) {
               MessageService.processMessaging(data.messaging);
               Utils.replaceObject(self.componentDetailTie, data.oelinelinetie);

               //User Hook (do not rename)
               if (self.oeLineLineTieLeaveFieldContinue) {
                  self.oeLineLineTieLeaveFieldContinue(data);
               }
            }
         });
      }
   };

   self.sourcingCancelCallback = function () {
      $state.go('^');
      // reset the component tie
      self.componentDetailTie = self.initialComponentTie;
   };

   self.sourcingFinishCallback = function () {

      if (kit.sourcingHeader.ourproc === 'kpew') {
         if (self.componentDetailTie.ordertype !== 'n') {
            if (self.componentType.toLowerCase() === 'add') {
               var lineAddValidateRequest = {
                  kitcreatedetailsttcriteria: self.componentDetailsCriteria,
                  kitcreatedetailsttresults: self.componentDetails,
                  oelinelinetie: self.componentDetailTie,
                  oelinelinetiehdr: self.componentTieHeader
               };
               lineAddValidateRequest.oelinelinetiehdr.runmode = 'comp';
               DataService.post('api/kp/askpentry/kpcompaddtievalidate', { data: lineAddValidateRequest, busy: true }, function (data) {
                  if (data) {
                     if (!MessageService.processMessaging(data.messaging)) {
                        self.componentDetailTie = data.oelinelinetie;

                        self.finishSourcing();
                     }
                  }
               });
            } else {
               var lineValidateRequest = {
                  oelinelinetie: self.componentDetailTie,
                  oelinelinetiehdr: self.componentTieHeader
               };
               lineValidateRequest.oelinelinetiehdr.runmode = 'comp';
               DataService.post('api/kp/askpentry/kpcomptievalidate', { data: lineValidateRequest, busy: true }, function (data) {
                  if (data) {
                     if (!MessageService.processMessaging(data.messaging)) {
                        self.componentDetailTie = data.oelinelinetie;

                        self.finishSourcing();
                     }
                  }
               });
            }

         } else {
            self.finishSourcing();
         }
      } else if (self.componentTieHeader.maintmode.toLowerCase() === 'a') {
         var compAddTieValidateRequest = {
            kitcreatedetailsttcriteria: self.componentDetailsCriteria,
            kitcreatedetailsttresults: self.componentDetails,
            oeline: {},
            oelinelinetie: self.componentDetailTie,
            oelinelinetiehdr: self.componentTieHeader
         };
         DataService.post('api/oe/asoelineextra/oecompaddtievalidate', { data: compAddTieValidateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.componentDetailTie = data.oelinelinetie;

                  self.finishSourcing();
               }
            }
         });
      } else {
         var lineTieValidateRequest = {
            oeline: {},
            oelinelinetie: self.componentDetailTie,
            oelinelinetiehdr: self.componentTieHeader
         };
         DataService.post('api/oe/asoeline/oelinelinetievalidate', { data: lineTieValidateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.componentDetailTie = data.oelinelinetie;

                  self.finishSourcing();
               }
            }
         });
      }
   };

   self.finishSourcing = function () {
      var tieToUpdate;
      kit.sourcingCollection.forEach(function (compTie) {
         if (compTie.seqno === self.componentDetailTie.seqno) {
            tieToUpdate = compTie;
         }
      });

      if (tieToUpdate) {
         kit.sourcingCollection.splice(kit.sourcingCollection.indexOf(tieToUpdate), 1, self.componentDetailTie);
      } else {
         kit.sourcingCollection.push(self.componentDetailTie);
      }


      MessageService.info('global.information', 'message.sourcing.information.has.been.accepted');
      $state.go('^');
   };

   self.nonStockClicked = function () {
      $state.go('.nonStock');
   };

   self.saveStockyNonStockData = function (componentNonStock) {
      self.stickyNonStockData.arpwhse = componentNonStock.arpwhse;
      self.stickyNonStockData.shipprod = componentNonStock.shipprod;
      self.stickyNonStockData.proddesc = componentNonStock.proddesc;
      self.stickyNonStockData.prodline = componentNonStock.prodline;
      self.stickyNonStockData.prodcat = componentNonStock.prodcat;
      self.stickyNonStockData.pricetype = componentNonStock.pricetype;
      self.stickyNonStockData.vendno = componentNonStock.vendno;
   };

   self.subsClicked = function () {
      $state.go('.substitutes');
   };

   self.serialsClicked = function () {
      $state.go('.serials');
   };

   self.lotsClicked = function () {
      $state.go('.lots');
   };

   self.warehouseManagerClicked = function () {
      var wmBinAssignCriteria = {
         altwhse: kit.line.altwhse,
         currproc: self.componentDetails.ourproc,
         jrnlno: 0,
         kitfl: kit.line.kitfl,
         lineno: self.componentDetails.lineno,
         ourproc: self.componentDetails.ourproc,
         ordertype: self.componentDetails.ordtype,
         orderno: self.componentDetails.orderno,
         ordersuf: self.componentDetails.ordersuf,
         returnfl: self.componentDetails.returnfl,
         potype: '',
         prod: self.componentDetails.shipprod,
         seqno: self.componentDetails.seqnoOeelk,
         skipnonkitlogic: false,
         stkqtyship: kit.line.stkqtyship,
         stkqtyrcv: 0,
         unit: self.componentDetails.unit,
         vamodule: '',
         wmadjtype: 'sell',
         wmqtyrcv: 0,
         whse: self.componentDetails.whse
      };

      //For KPEW Criteria will be little different so overriding few fields in criteria to work BinAllocation
      if (self.componentCriteria && kit.sourcingHeader && kit.sourcingHeader.ourproc === 'kpew') {
         wmBinAssignCriteria.stkqtyship = Math.abs(self.componentCriteria.stkqtyship);
         wmBinAssignCriteria.returnfl = (self.componentCriteria.stkqtyship < 0);
         wmBinAssignCriteria.kitfl = true;
         wmBinAssignCriteria.currproc = kit.sourcingHeader.ourproc;
         wmBinAssignCriteria.ourproc = kit.sourcingHeader.ourproc;
         if (self.componentCriteria.ordtype === 'w') {
            wmBinAssignCriteria.ordertype = 'c';
            wmBinAssignCriteria.wmadjtype = self.componentCriteria.stkqtyship < 0 ? 'buy' : 'sell';
         } else {
            wmBinAssignCriteria.ordertype = self.componentCriteria.ordtype;
         }
      }

      $state.go('.bin-allocation', {
         criteria: wmBinAssignCriteria,
         binAllocationDisabled: false,
         submittedCallback: 'kitCd.binAllocationSavedCallback',
         actionsCallback: 'kitCd.binAllocationActionsCallback'
      });
   };

   self.binAllocationActionsCallback = function (wmBinAssignment) {
      self.componentDetails.wmqtyship = wmBinAssignment.wmqtyship;
   };

   self.binAllocationSavedCallback = function (wmBinAssignment) {
      self.componentDetails.wmqtyship = wmBinAssignment.wmqtyship;
      MessageService.info($translate.instant('global.information'), $translate.instant('message.warehouse.manager.data.accepted'));
      $state.go('^');
   };

   self.lineTypeChanged = function () {
      if (self.componentDetails.specnstype === 'n') {
         self.nonStockClicked();
      }
   };

   self.submit = function () {
      var kitDetailUpdateRequest = {
         kitcreatedetailsttcriteria: self.componentDetailsCriteria,
         kitcreatedetailsttresults: self.componentDetails
      };

      DataService.post('api/oe/asoeline/kitdetailupdate', { data: kitDetailUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.componentDetails = data.kitcreatedetailsttresults;
               self.sourcingEnabled = data.kitcreatedetailsttresults.sourcingenabled;

               // Set kitscreenfl (ChamgeList) - Component Non Stock screen changed the Price or Cost - for Kit Roll Up
               if (self.componentDetails.price !== self.componentDetails.priceOeelk ||
                   self.componentDetails.prodcost !== self.componentDetails.prodcostOeelk) {
                  kit.line.kitscreenfl = true;
               }

               DataService.post('api/oe/asoeinquiry/loadtcomps', { data: kit.kitCriteria, busy: true }, function (data) {
                  if (data) {
                     kit.kitCriteria = data.kitscriteria;
                     kit.kitSingle = data.loadtcompssingle;

                     var newComponent;
                     data.loadtcompsresults.forEach(function (newrecord) {
                        var match = false;
                        kit.kitResultsCollection.forEach(function (oldrecord) {
                           if (newrecord.oeelkrowid === oldrecord.oeelkrowid) {
                              match = true;
                              // this will happen if new component causes the components to be resequenced - need to
                              // adjust the existing seqnos in the sourcingCollection for multi-comp sourcing
                              if (newrecord.seqno !== oldrecord.seqno) {
                                 kit.sourcingCollection.forEach(function (compTie) {
                                    if (compTie.oeelkrowid === newrecord.oeelkrowid) {
                                       compTie.seqno = newrecord.seqno;
                                    }
                                 });
                              }
                           }
                        });
                        if (!match) {
                           newComponent = newrecord;
                        }
                     });
                     if (newComponent) {
                        var sourcingmatch = false;
                        kit.sourcingCollection.forEach(function (compTie) {
                           if (compTie.oeelkrowid === newComponent.oeelkrowid) {
                              sourcingmatch = true;
                           }
                        });
                        if (self.componentDetailTie) {
                           self.componentDetailTie.oeelkrowid = newComponent.oeelkrowid;
                           self.componentDetailTie.seqno = newComponent.seqno;

                           if (!sourcingmatch) {
                              kit.sourcingCollection.push(self.componentDetailTie);
                           }
                        }
                     }

                     data.loadtcompssubresults.forEach(function (newsubrecord) {
                        kit.kitSubResultsCollection.forEach(function (oldsubrecord) {
                           if (newsubrecord.oeelkrowid === oldsubrecord.oeelkrowid) {
                              // this will happen if new component causes group components to be resequenced.  need to
                              // adjust the subcomponent seqnos in the sourcingCollection for multi-comp sourcing
                              if (newsubrecord.seqno !== oldsubrecord.seqno) {
                                 kit.sourcingCollection.forEach(function (compTie) {
                                    if (compTie.oeelkrowid === newsubrecord.oeelkrowid) {
                                       compTie.seqno = newsubrecord.seqno;
                                    }
                                 });
                              }
                           }
                        });
                     });


                     kit.kitResultsCollection = data.loadtcompsresults;
                     kit.kitSubResultsCollection = data.loadtcompssubresults;

                     if (kit.sourcingHeader.ourproc === 'kpew') {
                        if (self.isFromKPEWMaster) {
                           var lineUpdateRequest = {
                              oelinelinetie: kit.sourcingCollection,
                              oelinelinetiehdr: self.componentTieHeader
                           };
                           DataService.post('api/kp/askpentry/kpcomptieupdate', { data: lineUpdateRequest, busy: true }, function (data) {
                              if (data) {
                                 MessageService.processMessaging(data);
                                 if (self.createAnother) {
                                    self.setupComponentDetails();
                                 } else {
                                    // reretrieve components so tie data will display in grid
                                    DataService.post('api/oe/asoeinquiry/loadtcomps', { data: kit.kitCriteria, busy: true }, function (data) {
                                       if (data) {
                                          kit.kitResultsCollection = data.loadtcompsresults;
                                          kit.kitSubResultsCollection = data.loadtcompssubresults;
                                          self.back();
                                       }
                                    });
                                 }
                              }
                           });
                        } else {
                           if (self.createAnother) {
                              self.setupComponentDetails();
                           } else {
                              self.back();
                           }
                        }
                     } else {
                        var kpLineValidateRequest = {
                           oeline: kit.line,
                           lMaintMode: 'a',
                           cChangeList: (kit.line.cfgkitfl && (kit.line.kitrollty.toLowerCase() !== 'p' || kit.line.kitrollty.toLowerCase() !== 'b')) ? 'kitscreenfl,manprice' : 'kitscreenfl'
                        };
                        DataService.post('api/oe/asoeline/oelinevalidate', { data: kpLineValidateRequest, busy: true }, function (data) {
                           if (data) {
                              if (!MessageService.processMessaging(data.messaging)) {
                                 kit.line = data.oeline;

                                 // Refresh the OE Line Data/Object with Changes
                                 Utils.replaceObject(ale.baseOeline, data.oeline);
                                 Utils.replaceObject(ale.oeline, data.oeline);
                                 ale.isLineValidated = true;

                                 if (self.createAnother) {
                                    self.setupComponentDetails();
                                 } else {
                                    self.back();
                                 }
                              }
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
      switch (self.componentType.toLowerCase()) {
         case 'add': //ignore jslint - correct indentation
         case 'details': //ignore jslint - correct indentation
            $state.go('^'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'group': //ignore jslint - correct indentation
            $state.go('^.groupComponent', { selectedComponent: self.component, matchedSubComponents: self.matchedSubComponents }); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'option': //ignore jslint - correct indentation
            $state.go('^.optionComponent', { selectedComponent: self.component, matchedSubComponents: self.matchedSubComponents }); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };
});

app.controller('KitComponentDetailsNonStockCtrl', function ($scope, $state, $stateParams, $translate, Sasoo, DataService, MessageService) {
   //alias => kitCdNs
   var self = this;
   var kitCd = $scope.kitCd;
   var processingFieldChange = false;

   self.headerWhse = (kitCd && kitCd.componentDetails) ? kitCd.componentDetails.whse : '';
   self.componentNonStock = {};
   self.isFirstFill = true;

   var loadNonStockRequest = {
      kitcreatedetailsttcriteria: kitCd.componentDetailsCriteria,
      kitcreatedetailsttresults: kitCd.componentDetails
   };
   DataService.post('api/oe/asoeline/kitloadnonstock', { data: loadNonStockRequest, busy: true }, function (data) {
      if (data && !MessageService.processMessaging(data.messaging)) {
         kitCd.componentDetails.btnnonstockenabled = true;
         self.componentNonStock = data.kitnonstocksingle;

         self.componentNonStock.shipprod = kitCd.componentDetails.shipprod;
         self.componentNonStock.countryoforigin = kitCd.componentDetails.countryoforigin;
         self.componentNonStock.tariffcd = kitCd.componentDetails.tariffcd;
      }
   });

   self.nonStockFieldChanged = function () {
      if (!processingFieldChange) {
         processingFieldChange = true;
         DataService.post('api/oe/asoeline/kitrefreshnonstock', { data: self.componentNonStock, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.componentNonStock = data.kitnonstocksingle;

                  if (data.kitnonstocksingle.quesmessage && !data.kitnonstocksingle.quesanswer) {
                     var useDefaultSettingsMessage = data.kitnonstocksingle.quesdescrip1 + '<br />' +
                        data.kitnonstocksingle.quesdescrip2 + '<br />' +
                        data.kitnonstocksingle.quespriceavail + '<br />' +
                        data.kitnonstocksingle.quesprodcat + '<br />' +
                        data.kitnonstocksingle.quesmessage + '<br />';
                     MessageService.yesNo('global.use.existing.settings', useDefaultSettingsMessage, function () {
                        //yes callback
                        self.processUseSettingsPopup('y');
                        self.isFirstFill = false;
                     }, function () {
                        //no callback
                        self.processUseSettingsPopup('n');
                     });
                  } else {
                     if (kitCd.componentType.toLowerCase() === 'add' && Sasoo.useprevnsfl && self.isFirstFill) {
                        self.usePreviousNonStockValues();
                     }
                  }
               }
            }
            processingFieldChange = false;
         });
      }
   };

   self.processUseSettingsPopup = function (answer) {
      switch (answer.toLowerCase()) {
         case 'y': //ignore jslint - correct indentation
            self.componentNonStock.quesanswer = 'yes'; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'n': //ignore jslint - correct indentation
            self.componentNonStock.quesanswer = 'no'; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }

      self.nonStockFieldChanged();
   };

   self.usePreviousNonStockValues = function () {
      if (kitCd.stickyNonStockData.shipprod) {
         self.componentNonStock.arpwhse = kitCd.stickyNonStockData.arpwhse;
         self.componentNonStock.shipprod = kitCd.stickyNonStockData.shipprod;
         self.componentNonStock.proddesc = kitCd.stickyNonStockData.proddesc;
         self.componentNonStock.prodline = kitCd.stickyNonStockData.prodline;
         self.componentNonStock.prodcat = kitCd.stickyNonStockData.prodcat;
         self.componentNonStock.pricetype = kitCd.stickyNonStockData.pricetype;
         self.componentNonStock.vendno = kitCd.stickyNonStockData.vendno;
      }

      self.isFirstFill = false;
   };

   self.submit = function () {
      var kitUpdateNonStockRequest = {
         kitcreatedetailsttcriteria: kitCd.componentDetailsCriteria,
         kitcreatedetailsttresults: kitCd.componentDetails,
         kitnonstocksingle: self.componentNonStock
      };
      DataService.post('api/oe/asoeline/kitupdatenonstock', { data: kitUpdateNonStockRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               kitCd.componentDetails = data.kitcreatedetailsttresults;

               $state.go('^');
            }
         }
      });
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitComponentDetailsSubstitutesCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   //alias => kitCdS
   var self = this;
   var kit = $scope.kit;
   var kitCd = $scope.kitCd;

   self.componentSubstituteGrid = {};
   self.componentSubstituteCollection = [];

   var subsLaunchCriteria = {
      prod: kitCd.componentDetails.shipprod,
      qty: kitCd.componentDetails.qtyneeded,
      unit: kitCd.componentDetails.unit,
      whse: kitCd.componentDetails.whse,
      stkqtyship: kit.isInAddMode ? kitCd.componentDetailsCriteria.stkqtyship : kitCd.componentDetailsCriteria.qtyship
   };
   DataService.post('api/oe/asoeentry/kitdetailsubslaunch', { data: subsLaunchCriteria, busy: true }, function (data) {
      if (data) {
         self.componentSubstituteCollection = data;
      }
   });

   self.getSubTitle = function () {
      return $translate.instant('global.component') + ': ' + kitCd.componentDetails.shipprod + ' - ' + kitCd.componentDetails.proddesc;
   };

   self.submit = function () {
      // 1) get selected row, 2) update componentDetails, 3) trigger fieldChange, 4) nav back
      var selectedSub = GridService.getSelectedRecord(self.componentSubstituteGrid);

      if (selectedSub) {
         kitCd.componentDetails.shipprod = selectedSub.comprod;
         kitCd.componentDetails.unit = selectedSub.unit;

         kitCd.componentDetailFieldChanged('shipprod');

         $state.go('^');
      } else {
         MessageService.alert('global.alert', 'message.no.product.selected');
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitComponentDetailsSerialsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => kitCdSer
   var self = this;
   var kit = $scope.kit;
   var kitCd = $scope.kitCd;

   var componentCheckSerLotRequest;

   self.initComponentCheck = function () {
      componentCheckSerLotRequest = {
         loadtcompsresults: {
            lineno: kit.line.lineno,
            arpprodline: kitCd.componentDetails.arpprodline,
            arpvendno: kitCd.componentDetails.arpvendno,
            arpwhse: kit.line.arpwhse,
            brseqno: kitCd.componentDetails.seqno,
            cataddfl: kit.line.cataddfl,
            cfgcompfl: kitCd.componentDetails.cfgcompfl,
            compboty: kitCd.componentDetails.compboty,
            comptype: kitCd.componentDetails.comptype,
            costoverfl: kit.line.costoverfl,
            countryoforigin: kit.line.countryoforigin,
            delayresrvfl: kit.line.delayresrvfl,
            groupname: kitCd.componentDetails.groupoptname,
            instructions: kitCd.componentDetails.instructions,
            leadtm: kit.line.leadtm,
            orderaltno: kit.line.orderaltno,
            orderno: kit.line.orderno,
            ordersuf: kit.line.ordersuf,
            ordtype: 'o',
            ourproc: 'OE',
            ovshipfl: kitCd.componentDetails.ovshipfl,
            price: kit.line.price,
            pricefl: kitCd.componentDetails.pricefl,
            pricetype: kitCd.componentDetails.pricetype,
            printfl: kitCd.componentDetails.printfl,
            prodcat: kit.line.prodcat,
            prodcost: kitCd.componentDetails.prodcost,
            proddesc: kit.line.proddesc,
            qtyneeded: kitCd.componentDetails.qtyneeded,
            qtyreservd: kitCd.componentDetails.qtyreservd,
            qtyship: 0,
            refer: kitCd.componentDetails.refer,
            reqfl: kitCd.componentDetails.reqfl,
            seqno: kitCd.componentDetails.seqnoOeelk,
            serlottype: kitCd.componentDetails.serlottype,
            shipprod: kitCd.componentDetails.shipprod,
            specnstype: kitCd.componentDetails.specnstype,
            subfl: kitCd.componentDetails.subfl,
            tariffcd: kit.line.tariffcd,
            unit: kitCd.componentDetails.unit,
            whse: kitCd.componentDetails.whse,
            wlpicktype: kit.line.wlpicktype
         },
         pvIsfrommenufl: true
      };
      if (kit.sourcingHeader.ourproc === 'kpew') {
         componentCheckSerLotRequest.loadtcompsresults.orderno = 0;
         componentCheckSerLotRequest.loadtcompsresults.ordersuf = 0;
         componentCheckSerLotRequest.loadtcompsresults.ordtype = 'w';
         componentCheckSerLotRequest.loadtcompsresults.ourproc = 'kpew';
         componentCheckSerLotRequest.loadtcompsresults.qtyship = kitCd.componentDetails.unitconv * self.oeelk.stkqtyship;
      } else {
         componentCheckSerLotRequest.loadtcompsresults.qtyship = kitCd.componentDetails.unitconv * kit.line.stkqtyship;
      }
   };

   self.serialControlReady = function () {
      var params = null;

      params = {
         ordertype: 'o',
         orderno: kit.header.orderno,
         ordersuf: kit.header.ordersuf,
         lineno: kit.line.lineno,
         seqno: kitCd.componentDetails.seqnoOeelk
      };
      if (kit.sourcingHeader.ourproc === 'kpew') {
         params.ordertype = 'w';
      }

      DataService.get('api/oe/oeelk/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.oeelk = data;
            self.initComponentCheck();
            DataService.post('api/oe/asoeinquiry/componentcheckserlot', { data: componentCheckSerLotRequest, busy: true }, function (data) {
               if (data) {

                  var compCheckData = data;

                  if (kit.sourcingHeader.ourproc === 'kpew') {

                     var kpetParams = {
                        wono: self.oeelk.orderno,
                        wosuf: self.oeelk.ordersuf,
                        fillmode: true
                     };

                     DataService.get('api/kp/kpet/getbypk', { params: kpetParams, busy: true }, function (data) {
                        self.kpet = data;
                        kit.line.stkqtyship = self.kpet.stkqtyship;

                        // format and add nesseccary criteria to object
                        self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(compCheckData);

                        var criteria = {
                           icentryserialslist: [],
                           icentryserialscriteria: self.icEntrySerialsCriteria
                        };

                        // Call initialize method on the Shared-Serials-Ctrl
                        self.serialsControl.initialize(criteria);
                     });
                  } else {
                     // format and add nesseccary criteria to object
                     self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria(compCheckData);

                     var criteria = {
                        icentryserialslist: [],
                        icentryserialscriteria: self.icEntrySerialsCriteria
                     };

                     // Call initialize method on the Shared-Serials-Ctrl
                     self.serialsControl.initialize(criteria);
                  }


               }
            });
         }
      });
   };

   self.serialControlDone = function (adjustQtyFl, adjustQtyShip) {
      if (kit.baseState === 'oees') {
         var inputParams = {
            iOrderNo: kit.line.orderno,
            iOrderSuf: kit.line.ordersuf
         };
         DataService.get('api/oe/asoeentry/oeesdetaillineload/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (lineLoadData) {
            var oeesdetaillinelist = [];
            var qtyShip = kit.line.qtyship;
            if (adjustQtyShip) {
               qtyShip = adjustQtyShip;
            }
            oeesdetaillinelist.push(kit.line);
            var oeesLineUpdateSerialCriteria = {
               oeesdetaillinelist: oeesdetaillinelist,
               oeesdetaillinesingle: lineLoadData.oeesdetaillinesingle,
               iLineNo: kit.line.lineno,
               dSerLotOutQty: qtyShip
            };
            DataService.post('api/oe/asoeentry/oeesdetaillineafterserlot', { data: oeesLineUpdateSerialCriteria, busy: true }, function (afterSerLotData) {
               if (afterSerLotData) {
                  if (!MessageService.processMessaging(afterSerLotData.messaging)) {
                     if (afterSerLotData.oeesdetaillinelist && afterSerLotData.oeesdetaillinelist.length) {
                        kit.line = afterSerLotData.oeesdetaillinelist[0];
                     }

                     MessageService.info('global.information', 'message.save.operation.completed.successfully');

                     $state.go('^');
                  }
               }
            });
         });
      }
   };

   self.createIcEntrySerialsCriteria = function (resp) {
      if (resp) {

         var criteria = {
            whse: kit.header.whse,
            prod: kitCd.componentDetails.shipprod,
            type: 'oe',
            orderno: kit.header.orderno,
            ordersuf: kit.header.ordersuf,
            lineno: kit.line.lineno,
            linenochar: kit.line.lineno,
            seqno: kitCd.componentDetails.seqnoOeelk,
            seqnochar: kitCd.componentDetails.seqno,
            inquiryfl: false,
            actionty: '',
            returnfl: kit.line.returnfl,
            origqty: Math.abs(kitCd.componentDetails.qtyneeded * kitCd.componentDetails.unitconv * kit.line.stkqtyship),
            proofqty: Math.abs(resp.pvDNoSNLots),
            ordqty: kitCd.componentDetails.qtyneeded * kitCd.componentDetails.unitconv * kit.line.stkqtyord,
            outqty: Math.abs(resp.pvDNoSNLots),
            ictype: 'in',
            cost: 0,
            qtyunavail: 0,
            method: '',
            retorderno: kit.line.retorderno,
            retordersuf: kit.line.retordersuf,
            retlineno: kit.line.retlineno,
            returnty: kit.line.returnty,
            reasunavty: kit.line.reasunavty,
            custno: kit.header.custno,
            shipto: kit.header.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: kit.sourcingHeader.ourproc,
            icspecrecno: kit.line.icspecrecno,
            assignoldest: true,
            currproc: kit.sourcingHeader.ourproc,
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: kitCd.componentDetails.descrip,
            prodnotesfl: kitCd.componentDetails.prodnotes
         };

         if (kit.sourcingHeader.ourproc === 'kpew') {
            criteria.type = 'kp';
            criteria.origqty = Math.abs(kitCd.componentDetails.qtyneeded * kitCd.componentDetails.unitconv * kit.line.stkqtyship);
            criteria.ictype = (self.kpet.stkqtyord < 0) ? 'ri' : 'in';
            criteria.wono = self.oeelk.orderno;
            criteria.wosuf = self.oeelk.ordersuf;
         }
         else {
            criteria.ictype = (kit.line.stkqtyord < 0) ? 'ri' : 'in';
         }

         return criteria;
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('KitComponentDetailsLotsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   //alias => kitCdLot
   var self = this;
   var kit = $scope.kit;
   var kitCd = $scope.kitCd;

   var componentCheckSerLotRequest;

   self.initLotComponentCheck = function () {
      componentCheckSerLotRequest = {
         loadtcompsresults: {
            lineno: kit.line.lineno,
            arpprodline: kitCd.componentDetails.arpprodline,
            arpvendno: kitCd.componentDetails.arpvendno,
            arpwhse: kit.line.arpwhse,
            brseqno: kitCd.componentDetails.seqno,
            cataddfl: kit.line.cataddfl,
            cfgcompfl: kitCd.componentDetails.cfgcompfl,
            compboty: kitCd.componentDetails.compboty,
            comptype: kitCd.componentDetails.comptype,
            costoverfl: kit.line.costoverfl,
            countryoforigin: kit.line.countryoforigin,
            delayresrvfl: kit.line.delayresrvfl,
            groupname: kitCd.componentDetails.groupoptname,
            instructions: kitCd.componentDetails.instructions,
            leadtm: kit.line.leadtm,
            orderaltno: kit.line.orderaltno,
            orderno: kit.line.orderno,
            ordersuf: kit.line.ordersuf,
            ordtype: 'o',
            ourproc: 'OE',
            ovshipfl: kitCd.componentDetails.ovshipfl,
            price: kit.line.price,
            pricefl: kitCd.componentDetails.pricefl,
            pricetype: kitCd.componentDetails.pricetype,
            printfl: kitCd.componentDetails.printfl,
            prodcat: kit.line.prodcat,
            prodcost: kitCd.componentDetails.prodcost,
            proddesc: kit.line.proddesc,
            qtyneeded: kitCd.componentDetails.qtyneeded,
            qtyreservd: kitCd.componentDetails.qtyreservd,
            qtyship: kitCd.componentDetails.unitconv * kit.line.stkqtyship,
            refer: kitCd.componentDetails.refer,
            reqfl: kitCd.componentDetails.reqfl,
            seqno: kitCd.componentDetails.seqnoOeelk,
            serlottype: kitCd.componentDetails.serlottype,
            shipprod: kitCd.componentDetails.shipprod,
            specnstype: kitCd.componentDetails.specnstype,
            subfl: kitCd.componentDetails.subfl,
            tariffcd: kit.line.tariffcd,
            unit: kitCd.componentDetails.unit,
            whse: kitCd.componentDetails.whse,
            wlpicktype: kit.line.wlpicktype
         },
         pvIsfrommenufl: true
      };
      if (kit.sourcingHeader.ourproc === 'kpew') {
         componentCheckSerLotRequest.loadtcompsresults.orderno = 0;
         componentCheckSerLotRequest.loadtcompsresults.ordersuf = 0;
         componentCheckSerLotRequest.loadtcompsresults.ordtype = 'w';
         componentCheckSerLotRequest.loadtcompsresults.ourproc = 'kpew';
         componentCheckSerLotRequest.loadtcompsresults.qtyship = kitCd.componentDetails.unitconv * self.oeelk.stkqtyship;
      } else {
         componentCheckSerLotRequest.loadtcompsresults.qtyship = kitCd.componentDetails.unitconv * kit.line.stkqtyship;
      }
   };

   self.lotControlReady = function () {
      var params = null;

      params = {
         ordertype: 'o',
         orderno: kit.header.orderno,
         ordersuf: kit.header.ordersuf,
         lineno: kit.line.lineno,
         seqno: kitCd.componentDetails.seqnoOeelk
      };
      if (kit.sourcingHeader.ourproc === 'kpew') {
         params.ordertype = 'w';
      }

      DataService.get('api/oe/oeelk/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.oeelk = data;
            self.initLotComponentCheck();
            DataService.post('api/oe/asoeinquiry/componentcheckserlot', { data: componentCheckSerLotRequest, busy: true }, function (data) {
               if (data) {

                  var compCheckData = data;

                  if (kit.sourcingHeader.ourproc === 'kpew') {

                     var kpetParams = {
                        wono: self.oeelk.orderno,
                        wosuf: self.oeelk.ordersuf,
                        fillmode: true
                     };

                     DataService.get('api/kp/kpet/getbypk', { params: kpetParams, busy: true }, function (data) {
                        self.kpet = data;
                        kit.line.stkqtyship = self.kpet.stkqtyship;

                        // format and add nesseccary criteria to object
                        self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(compCheckData);

                        // Call initialize method on the Shared-Serials-Ctrl
                        self.lotsControl.initialize(self.icEntryLotsCriteria);
                     });
                  } else {
                     // format and add nesseccary criteria to object
                     self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(compCheckData);

                     // Call initialize method on the Shared-Serials-Ctrl
                     self.lotsControl.initialize(self.icEntryLotsCriteria);
                  }


               }
            });
         }
      });
   };

   self.lotControlDone = function (adjustQtyFl, adjustQtyShip) {
      if (kit.baseState === 'oees') {
         var inputParams = {
            iOrderNo: kit.line.orderno,
            iOrderSuf: kit.line.ordersuf
         };
         DataService.get('api/oe/asoeentry/oeesdetaillineload/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (lineLoadData) {
            var oeesdetaillinelist = [];
            var qtyShip = kit.line.qtyship;
            if (adjustQtyShip) {
               qtyShip = adjustQtyShip;
            }
            oeesdetaillinelist.push(kit.line);
            var oeesLineUpdateLotCriteria = {
               oeesdetaillinelist: oeesdetaillinelist,
               oeesdetaillinesingle: lineLoadData.oeesdetaillinesingle,
               iLineNo: kit.line.lineno,
               dSerLotOutQty: qtyShip
            };
            DataService.post('api/oe/asoeentry/oeesdetaillineafterserlot', { data: oeesLineUpdateLotCriteria, busy: true }, function (afterSerLotData) {
               if (afterSerLotData) {
                  if (!MessageService.processMessaging(afterSerLotData.messaging)) {
                     if (afterSerLotData.oeesdetaillinelist && afterSerLotData.oeesdetaillinelist.length) {
                        kit.line = afterSerLotData.oeesdetaillinelist[0];
                     }

                     MessageService.info('global.information', 'message.save.operation.completed.successfully');

                     $state.go('^');
                  }
               }
            });
         });
      }
   };

   self.createIcEntryLotsCriteria = function (data) {
      if (data) {
         var criteria = {
            whse: kit.header.whse,
            prod: kitCd.componentDetails.shipprod,
            type: 'oe',
            orderno: kit.header.orderno,
            ordersuf: kit.header.ordersuf,
            lineno: kit.line.lineno,
            linenochar: kit.line.lineno,
            seqno: kitCd.componentDetails.seqnoOeelk,
            seqnochar: kitCd.componentDetails.seqno,
            inquiryfl: false,
            actionty: '',
            returnfl: kit.line.returnfl,
            origqty: Math.abs(kitCd.componentDetails.qtyneeded * kitCd.componentDetails.unitconv * kit.line.stkqtyship),
            proofqty: Math.abs(data.pvDNoSNLots),
            ordqty: kitCd.componentDetails.qtyneeded * kitCd.componentDetails.unitconv * kit.line.stkqtyord,
            outqty: Math.abs(data.pvDNoSNLots),
            ictype: kit.header.oetype,
            cost: 0,
            qtyunavail: 0,
            method: '',
            retorderno: kit.line.retorderno,
            retordersuf: kit.line.retordersuf,
            retlineno: kit.line.retlineno,
            returnty: kit.line.returnty,
            reasunavty: kit.line.reasunavty,
            custno: kit.header.custno,
            shipto: kit.header.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: kit.sourcingHeader.ourproc,
            icspecrecno: kit.line.icspecrecno,
            assignoldest: 'y',
            currproc: kit.sourcingHeader.ourproc,
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: kitCd.componentDetails.descrip,
            prodnotesfl: kitCd.componentDetails.prodnotes
         };

         if (kit.sourcingHeader.ourproc === 'kpew') {
            criteria.type = 'kp';
            criteria.origqty = Math.abs(kitCd.componentDetails.qtyneeded * kitCd.componentDetails.unitconv * kit.line.stkqtyship);
            criteria.ictype = (self.kpet.stkqtyord < 0) ? 'ri' : 'in';
            criteria.wono = self.oeelk.orderno;
            criteria.wosuf = self.oeelk.ordersuf;
         }
         else {
            criteria.ictype = (kit.line.stkqtyord < 0) ? 'ri' : 'in';
         }

         return criteria;
      }
   };

   self.back = function () {
      $state.go('^');
   };
});