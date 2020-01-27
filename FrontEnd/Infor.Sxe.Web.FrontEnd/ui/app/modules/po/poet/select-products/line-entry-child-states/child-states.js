'use strict';

// USE THIS FILE FOR LINE ENTRY CHILD STATE CONTROLLERS THAT ARE ~100 LINES OF CODE OR LESS. IF LARGER, THEY NEED THEIR OWN .JS FILE.

app.controller('PoetAdvancedLineEntryTalliesBundlesCtrl', function ($scope, $state) {
   //alias => aleTly (for tallies) or aleBdl (for bundles)
   var self = this;
   var ale = $scope.ale;

   //Defined and called from within the Tally/Bundles control when the Save is performed.
   self.acceptTallyBundleUpdate = function (payload) {
      if (payload) {
         ale.poline.tallyfl = true;
         ale.poline.launchtallyfl = true;
         ale.poline.lLaunchedTally = true;
         ale.poline.qtyord = payload.qty;
         ale.poline.unit = payload.unit;

         //Need to add this to the field list, otherwise the line won't drop.  This alleviates a problem
         //if the user accesses the Tally screen by clicking it and then drops the line (vs clicking 'add'
         //first and the screen auto-launches).  The 'polinevalidate' backend call expects the 'qtyord' to
         //always come down as changed (since we don't know if they enter the 'qtyord' before the 'prod' field).
         //Adding this additional field to the list will allow the backend to handle this use-case properly.
         self.wtlinevalidateCallbackFieldList = 'unit,lTallyAccessedOnce';

         //User Hook (do not rename)
         if (self.polinevalidateSetAdditionalFields) {
            self.polinevalidateSetAdditionalFields();
         }

         ale.validateLine(self.back, self.wtlinevalidateCallbackFieldList);
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('PoetAdvancedLineEntryLotsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   self.icEntryLotsCriteria = {};

   ale.poline.forceserlot = false;

   self.back = function () {
      $state.go('^');
   };

   self.lotControlReady = function () {
      var poetlinebeforelotCriteria = {
         poline: ale.poline,
         iPoNo: base.pohdr.pono,
         iPoSuf: base.pohdr.posuf
      };

      DataService.post('api/po/aspoentry/poetlinebeforelot', { data: poetlinebeforelotCriteria, busy: true }, function (data) {
         if (data) {
            self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(data);

            // Call initialize method on the Shared-Lots-Ctrl
            self.lotsControl.initialize(self.icEntryLotsCriteria);
         }
      },
      // Error returned in cErrorMessage - back out change
      function () {
         self.back();
      });
   };

   self.createIcEntryLotsCriteria = function (polotscriteria) {
      if (polotscriteria) {
         var criteria = {
            actionty: polotscriteria.actionty,
            assignoldest: polotscriteria.assignoldest,
            btnoldestenabled: polotscriteria.btnoldestenabled,
            btnoldesthidden: polotscriteria.btnoldesthidden,
            btnautoassignenabled: polotscriteria.btnautoassignenabled,
            btnautoassignhidden: polotscriteria.btnautoassignhidden,
            btncreateenabled: polotscriteria.btncreateenabled,
            cost: polotscriteria.cost,
            cono2: polotscriteria.cono2,
            custno: polotscriteria.custno,
            currproc: base.MENU_FUNCTION_POET,
            frametitle: polotscriteria.frametitle,
            icspecrecno: polotscriteria.icspecrecno,
            inquiryfl: polotscriteria.inquiryfl,
            jrnlno: polotscriteria.jrnlno,
            kplabel: polotscriteria.kplabel,
            ictype: polotscriteria.ictype,
            lineno: polotscriteria.lineno,
            linenochar: polotscriteria.lineno,
            method: polotscriteria.method,
            orderno: polotscriteria.orderno,
            ordersuf: polotscriteria.ordersuf,
            origqty: polotscriteria.origqty,
            proofqty: polotscriteria.proofqty,
            ordqty: polotscriteria.ordqty,
            outqty: polotscriteria.outqty,
            ourproc: base.MENU_FUNCTION_POET,
            origqtylabel: polotscriteria.origqtylabel,
            proddesc: polotscriteria.proddesc,
            prodnotesfl: polotscriteria.prodnotesfl,
            prod: polotscriteria.prod,
            qtyunavail: polotscriteria.qtyunavail,
            returnfl: polotscriteria.returnfl,
            retorderno: polotscriteria.retorderno,
            retordersuf: polotscriteria.retordersuf,
            retlineno: polotscriteria.retlineno,
            returnty: polotscriteria.returnty,
            rettext: polotscriteria.rettext,
            reasunavty: polotscriteria.reasunavty,
            seqdash: polotscriteria.seqdash,
            seqno: polotscriteria.seqno,
            selectfieldenabled: polotscriteria.selectfieldenabled,
            seqnochar: polotscriteria.seqnochar,
            shipfmwhse: polotscriteria.shipfmwhse,
            shiptowhse: polotscriteria.shiptowhse,
            shipto: polotscriteria.shipto,
            type: polotscriteria.type,
            vendno: polotscriteria.vendno,
            whse: polotscriteria.whse,
            wono: polotscriteria.wono,
            wosuf: polotscriteria.wosuf,
            wonosuf: polotscriteria.wonosuf
         };

         return criteria;
      }
   };

   self.lotDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      //If adjusting the Quantity, call the Validate call on the line so we get all the updated values like
      //stkqtyord.
      if (adjustQtyFl) {
         ale.poline.stkqtyord = adjustQtyShip;
         if (ale.poline.unitconv) {
            ale.poline.qtyord = Math.round(adjustQtyShip / ale.poline.unitconv * 100) / 100;
         }
         else {
            ale.poline.qtyord = adjustQtyShip;
         }

         var lineCriteriaNotNeeded = {};
         var validateRequest = {
            poline: ale.poline,
            polineties: ale.lineTies,
            lMaintMode: ale.isAddLineMode,
            wtlinecriteria: lineCriteriaNotNeeded,
            cChangeList: Utils.deepCompare(ale.basePoline, ale.poline)
         };
         validateRequest.cChangeList += ','; //NOTE:  This trailing "," is very important, otherwise the line won't drop.

         DataService.post('api/po/aspoline/polinevalidate', { data: validateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {

                  if (data.cUpdateMessage && data.cUpdateMessage !== base.MESSAGING_OK) {
                     //Don't stop workflow from here, just show the message.
                     MessageService.info('global.information', data.cUpdateMessage);
                  }

                  Utils.replaceObject(ale.basePoline, data.poline);
                  Utils.replaceObject(ale.poline, data.poline);
                  ale.isLineValidated = true;
               }
            }
         });
      } else {
         self.back();
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('PoetAdvancedLineEntrySerialsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.back = function () {
      $state.go('^');
   };

   self.serialControlReady = function () {

      var poetlinebeforeserialCriteria = {
         poline: ale.poline,
         iPoNo: base.pohdr.pono,
         iPoSuf: base.pohdr.posuf
      };

      DataService.post('api/po/aspoentry/poetlinebeforeserial', { data: poetlinebeforeserialCriteria, busy: true }, function (data) {
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
      },
      // Error returned in cErrorMessage - back out change
      function () {
         self.back();
      });
   };

   self.createIcEntrySerialsCriteria = function (poserialscriteria) {
      if (poserialscriteria) {
         var criteria = {
            actionty: poserialscriteria.actionty,
            assignoldest: poserialscriteria.assignoldest,
            currproc: base.MENU_FUNCTION_POET,
            custno: poserialscriteria.custno,
            cost: poserialscriteria.cost,
            cono2: poserialscriteria.cono2,
            inquiryfl: poserialscriteria.inquiryfl,
            ictype: poserialscriteria.ictype,
            icspecrecno: poserialscriteria.icspecrecno,
            jrnlno: poserialscriteria.jrnlno,
            kplabel: poserialscriteria.kplabel,
            lineno: poserialscriteria.lineno,
            linenochar: poserialscriteria.lineno,
            method: poserialscriteria.method,
            orderno: poserialscriteria.orderno,
            ordersuf: poserialscriteria.ordersuf,
            ourproc: base.MENU_FUNCTION_POET,
            origqty: poserialscriteria.origqty,
            origqtylabel: poserialscriteria.origqtylabel,
            ordqty: poserialscriteria.ordqty,
            outqty: poserialscriteria.outqty,
            prod: poserialscriteria.prod,
            proofqty: poserialscriteria.proofqty,
            proddesc: poserialscriteria.proddesc,
            prodnotesfl: poserialscriteria.prodnotesfl,
            qtyunavail: poserialscriteria.qtyunavail,
            retorderno: poserialscriteria.retorderno,
            retordersuf: poserialscriteria.retordersuf,
            retlineno: poserialscriteria.retlineno,
            returnty: poserialscriteria.returnty,
            returnfl: poserialscriteria.returnfl,
            reasunavty: poserialscriteria.reasunavty,
            rettext: poserialscriteria.rettext,
            seqdash: poserialscriteria.seqdash,
            shipfmwhse: poserialscriteria.shipfmwhse,
            shiptowhse: poserialscriteria.shiptowhse,
            shipto: poserialscriteria.shipto,
            seqno: poserialscriteria.seqno,
            seqnochar: poserialscriteria.seqnochar,
            type: poserialscriteria.type,
            vendno: poserialscriteria.vendno,
            whse: poserialscriteria.whse,
            wono: poserialscriteria.wono,
            wosuf: poserialscriteria.wosuf,
            wonosuf: poserialscriteria.wonosuf
         };

         return criteria;
      }
   };

   self.serialDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      //If adjusting the Quantity, call the Validate call on the line so we get all the updated values like
      //stkqtyord.
      if (adjustQtyFl) {
         ale.poline.stkqtyord = adjustQtyShip;
         if (ale.poline.unitconv) {
            ale.poline.qtyord = Math.round(adjustQtyShip / ale.poline.unitconv * 100) / 100;
         }
         else {
            ale.poline.qtyord = adjustQtyShip;
         }

         var lineCriteriaNotNeeded = {};
         var validateRequest = {
            poline: ale.poline,
            polineties: ale.lineTies,
            lMaintMode: ale.isAddLineMode,
            wtlinecriteria: lineCriteriaNotNeeded,
            cChangeList: Utils.deepCompare(ale.basePoline, ale.poline)
         };
         validateRequest.cChangeList += ','; //NOTE:  This trailing "," is very important, otherwise the line won't drop.

         DataService.post('api/po/aspoline/polinevalidate', { data: validateRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {

                  if (data.cUpdateMessage && data.cUpdateMessage !== base.MESSAGING_OK) {
                     //Don't stop workflow from here, just show the message.
                     MessageService.info('global.information', data.cUpdateMessage);
                  }

                  Utils.replaceObject(ale.basePoline, data.poline);
                  Utils.replaceObject(ale.poline, data.poline);
                  ale.isLineValidated = true;
               }
            }
         });
      } else {
         self.back();
      }
   };
});

app.controller('PoetAdvancedLineEntryTiesCtrl', function ($scope, $state, $translate, Utils, DataService, UserService, MessageService) {
   // alias => aleTie
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;

   self.submit = function () {
      if (self.tiesControl) {
         if (self.tiesControl.tieEditableResults) {
            ale.lineTies = self.tiesControl.tieEditableResults;

            //Process thru Original List and determine if the user deleted any Ties.  If so, we need
            //to re-add them to the collection and set some flags, so the backend can process these
            //as a 'cleared tie'.
            if (self.tiesControl.tieEditableResults) {
               ale.lineTiesOrig.forEach(function (row) {
                  var index = self.tiesControl.tieEditableResults.indexOf(row);
                  if (index === -1) {
                     var lineTieNewRow = row;
                     row.cleartiefl = true;
                     row.modified = true;
                     ale.lineTies.push(lineTieNewRow);
                  }
               });
            }

            //Protect for an empty collection for API call later.
            if (!ale.lineTies || ale.lineTies.length === 0) {
               ale.lineTies = [];
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

app.controller('PoetAdvancedLineEntryPricingCtrl', function ($scope, $state, $translate, DataService, UserService, MessageService, GridService) {
   // alias => aleP
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   self.CALCULATE_TYPE_SYSTEM = 'system';
   self.CALCULATE_TYPE_RESTORE = 'restore';
   self.CALCULATE_TYPE_APPLY = 'apply';
   self.BASISTYPE_ENTER_A_VALUE = 'Enter a Value';
   self.STANDARD_WHSE_TYPE_VALUE = 's';
   self.warehouseAvailability = [];

   self.isPriceBasisEnabled = false;
   self.isApplyPricingEnabled = false;

   self.pricingBasisChange = function () {
      self.isApplyPricingEnabled = true;
      if (ale.poline.basisType && ale.poline.basisType === self.BASISTYPE_ENTER_A_VALUE) {
         self.isPriceBasisEnabled = true;
      } else {
         self.isPriceBasisEnabled = false;
      }
   };

   self.setApplyPricing = function () {
      self.isApplyPricingEnabled = true;
   };

   self.calculateSystemPricing = function () {
      self.pricingWorksheetCalculate(self.CALCULATE_TYPE_SYSTEM);
      self.isApplyPricingEnabled = false;
   };

   self.restoreSystemPricing = function () {
      self.pricingWorksheetCalculate(self.CALCULATE_TYPE_RESTORE);
      self.isApplyPricingEnabled = false;
   };

   self.applyPricing = function () {
      self.pricingWorksheetCalculate(self.CALCULATE_TYPE_APPLY);
      self.isApplyPricingEnabled = false;
   };

   self.pricingWorksheetCalculate = function (type) {
      var polinepricingworksheetcalculateCriteria = {
         poline: ale.poline,
         pvUpdatetype: type
      };

      DataService.post('api/po/aspoline/polinepricingworksheetcalculate', { data: polinepricingworksheetcalculateCriteria, busy: true }, function (data) {
         if (data) {
            ale.poline = data;
         }
      });
   };

   self.initiate = function () {
      var icwhseavailCriteria = {
         cono: UserService.getCono(),
         prod: ale.poline.prod,
         unit: ale.poline.unit,
         whsetype: self.STANDARD_WHSE_TYPE_VALUE
      };

      DataService.post('api/ic/asicinquiry/icwhseavail', { data: icwhseavailCriteria, busy: true }, function (data) {
         if (data) {
            self.warehouseAvailability = data;
         }
      });
   };

   self.initiate();

   self.back = function () {
      $state.go('^');
   };
});