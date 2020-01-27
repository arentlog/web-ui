'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('wt', 'wtee', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('wt', 'wtee');
   BinAllocationStateProvider.addStates('wt', 'wtee', 'wtee.detail');

   $stateProvider.state('wtee.detail', {
      url: '/detail',
      params: { returnState: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtee/detail.json');
            },
            controller: 'WteeDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('wtee.quickview', {
      url: '/quick-view',
      params: {
         wtno: null,
         wtsuf: null,
         cono: null,
         cono2: null,
         prevState: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/shared/quickview/quickview.json');
            },
            controller: 'WtQuickViewCtrl as quickview'
         }
      }
   });

   $stateProvider.state('wtee.quick-receive', {
      url: '/quick-receive',
      params: { wtno: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtee/quick-receive.json');
            },
            controller: 'WteeQuickReceiveCtrl as quick'
         }
      }
   });

   $stateProvider.state('wtee.serial', {
      url: '/serial',
      params: { lineDetail: null, action: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtee/serial.json');
            },
            controller: 'WteeSerialLotCtrl as sl'
         }
      }
   });

   $stateProvider.state('wtee.lot', {
      url: '/lot',
      params: { lineDetail: null, action: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wt/wtee/lot.json');
            },
            controller: 'WteeLotCtrl as lt'
         }
      }
   });
});

app.controller('WteeBaseCtrl', function ($state, DataService, Sasc, Utils, MessageService) {
   var self = this;
   self.criteria = {};
   self.wteh = {};
   self.wteeLineSummary = {};
   self.wteeLines = [];

   self.criteria.tocono = Sasc.cono;
   self.criteria.wtfl = true;
   self.criteria.dofl = true;

   //LineItems base data
   self.selectedLine = null;
   self.selectedActionType = '';
   self.selectedReason = '';
   self.isDetailSelectedDefaultTabLine = true;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'wtee',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'wt',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('wtee.master');
   };

   self.includesMaster = function () {
      return $state.includes('wtee.master');
   };

   self.isDetail = function () {
      return $state.is('wtee.detail');
   };

   self.includesDetail = function () {
      return $state.includes('wtee.detail');
   };

   self.search = function () {
      self.criteria.currentjrnlno = 0;
      self.criteria.wtno = 0;
      self.criteria.wtsuf = 0;

      DataService.post('api/wt/aswtinquiry/loadwtee', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.loadwteeresults;
      });
   };

   self.getStageName = function (value) {
      switch (value) {
         case 0: //ignore jslint - correct indentation
            return MessageService.get('global.requested'); //ignore jslint - correct indentation
         case 1: //ignore jslint - correct indentation
            return MessageService.get('global.ordered'); //ignore jslint - correct indentation
         case 2: //ignore jslint - correct indentation
            return MessageService.get('global.picked'); //ignore jslint - correct indentation
         case 3: //ignore jslint - correct indentation
            return MessageService.get('global.shipped'); //ignore jslint - correct indentation
         case 4: //ignore jslint - correct indentation
            return MessageService.get('global.pre.received'); //ignore jslint - correct indentation
         case 5: //ignore jslint - correct indentation
            return MessageService.get('global.exception'); //ignore jslint - correct indentation
         case 6: //ignore jslint - correct indentation
            return MessageService.get('global.received'); //ignore jslint - correct indentation
         case 9: //ignore jslint - correct indentation
            return MessageService.get('global.cancelled'); //ignore jslint - correct indentation
      }
   };

   self.getWtehRecord = function (wtno, wtsuf) {
      var wtehParams = {
         wtno: wtno,
         wtsuf: wtsuf
      };

      DataService.get('api/wt/wteh/getbypk', { params: wtehParams, busy: true }, function (data) {
         if (data) {
            self.wteh = data;
            $state.go('^.detail', { returnState: $state.current.name });
         }
      });
   };

   self.adjustExceptions = function (record, actionType, reasonUnavailable) {

      var wteeLinesList = [record];

      var wteeLineUpdateObj = {
         wteelines: wteeLinesList,
         wteelinesummary: self.wteeLineSummary,
         cActionType: actionType,
         cReasUnAvTy: reasonUnavailable
      };

      //User Hook (do not rename)
      if (self.setWteeLineUpdateCriteria) {
         self.setWteeLineUpdateCriteria(wteeLineUpdateObj);
      }

      DataService.post('api/wt/aswtline/wteelineupdate', { data: wteeLineUpdateObj, busy: true }, function (data) {
         if (data) {
            self.wteeLines = data.wteelines;
            self.wteeLineSummary = data.wteelinesummary;

            if (data.messaging.length > 0) {
               MessageService.processMessaging(data.messaging);
            }

            self.retrieveLineItems();
         }
      });
   };

   self.retrieveLineItems = function () {
      DataService.get('api/wt/aswtline/wteelinesretrieve/' + self.wteh.wtno + '/' + self.wteh.wtsuf + '/' + self.journal.gJrnlno, { busy: true }, function (data) {
         if (data) {
            self.wteeLines = data.wteelines;
            self.wteeLineSummary = data.wteelinesummary;

            if (data.messaging) {
               MessageService.processMessaging(data.messaging);
            }

            //User Hook (do not rename)
            if (self.wteeLineItemsContinue) {
               self.wteeLineItemsContinue(data);
            }
         }
      });
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities.
   self.binAllocationSaved = function (wmbinassignment) {
      $state.go('wtee.detail');
      self.adjustExceptions(self.selectedLine, self.selectedActionType, self.selectedReason);

      //Reset LineItems base data
      self.selectedLine = null;
      self.selectedActionType = '';
      self.selectedReason = '';

      self.search();
   };

   //This is a Callback from the Bin Allocation control to do more logic to assign quantities when Auto Allocate and Deallocate are performed.
   self.binAllocationActions = function (wmbinassignment) {
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
   };

});

app.controller('WteeSearchCtrl', function ($scope, $state, Sasc) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Reset Search Criteria
   self.reset = function () {
      criteria.shipfmwhse = '';
      criteria.shiptowhse = '';
      criteria.tocono = Sasc.cono;
      criteria.wtfl = true;
      criteria.dofl = true;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('wtee.master');
      }

      base.search();
   };
});

app.controller('WteeMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, TabService) {
   var self = this;
   var base = $scope.base;
   self.selectedRecord = null;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drilldown = function (e, args) {
      self.selectedRecord = args[0].item;

      if (self.selectedRecord) {
         if (!(base.journal && base.journal.gJrnlno !== 0)) {
            base.journalControl.showOpenView(function () {
               base.getWtehRecord(self.selectedRecord.wtno, self.selectedRecord.wtsuf);
            });
         }
         else {
            base.getWtehRecord(self.selectedRecord.wtno, self.selectedRecord.wtsuf);
         }
      }
   };

   self.quickViewContinue = function (wteh) {
      if (wteh) {
         $state.go('wtee.quickview', {
            wtno: wteh.wtno,
            wtsuf: wteh.wtsuf,
            cono: wteh.cono,
            cono2: wteh.cono2,
            prevState: $state.current.name
         });
      }
   };

   self.quickView = function () {
      if (base.grid.selectedRows().length === 1) {
         //Need to get the record since we don't have the cono/cono2 properties available
         var params = {
            wtno: GridService.getSelectedRecords(base.grid)[0].wtno,
            wtsuf: GridService.getSelectedRecords(base.grid)[0].wtsuf
         };

         DataService.get('api/wt/wteh/getbypk', { params: params }, function (data) {
            if (data) {
               self.quickViewContinue(data);
            }
         });
      }
   };

   self.showQuickReceive = function () {
      $state.go('^.quick-receive');
   };

   self.isJournalOpen = function () {
      if (!(base.journal && base.journal.gJrnlno !== 0)) {
         return false;
      } else {
         return true;
      }
   };

   self.stageCodeFormatter = function (row, cell, value) {
      switch (value) {
         case 0: //ignore jslint - correct indentation
            return MessageService.get('global.requested'); //ignore jslint - correct indentation
         case 1: //ignore jslint - correct indentation
            return MessageService.get('global.ordered'); //ignore jslint - correct indentation
         case 2: //ignore jslint - correct indentation
            return MessageService.get('global.picked'); //ignore jslint - correct indentation
         case 3: //ignore jslint - correct indentation
            return MessageService.get('global.shipped'); //ignore jslint - correct indentation
         case 4: //ignore jslint - correct indentation
            return MessageService.get('global.pre.received'); //ignore jslint - correct indentation
         case 5: //ignore jslint - correct indentation
            return MessageService.get('global.exception'); //ignore jslint - correct indentation
         case 6: //ignore jslint - correct indentation
            return MessageService.get('global.received'); //ignore jslint - correct indentation
         case 9: //ignore jslint - correct indentation
            return MessageService.get('global.cancelled'); //ignore jslint - correct indentation
      }
   };

   // When the user attempts to close the WTEE tab, release the open inits for which work has been cancelled.
   TabService.canUserCloseTab('wtee.master', function () {
      if (self.selectedRecord && base.journal) {
         var logoffCriteria = {
            wtno: self.selectedRecord.wtno,
            wtsuf: self.selectedRecord.wtsuf,
            jrnlno: base.journal.gJrnlno
         };

         DataService.post('api/wt/aswtentry/wteedetaillogoff', { data: logoffCriteria, busy: true });
      }
      return true;
   });

   self.quickReceive = function () {
      $state.go('^.quick-receive');
   };

   self.wtInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.wtno) {
         $state.go('wtit.detail', { pk: currentRow.wtno, pk2: currentRow.wtsuf });
      }
   };

});

app.controller('WteeDetailCtrl', function ($scope, $state, $stateParams, $translate, Utils, SecurityService) {
   var self = this;
   var base = $scope.base;

   self.returnState = $stateParams.returnState;

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('wtee', 'Header') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('wtee', 'Line Items') < 3;

   var transtype = (base.wteh.transtype.toUpperCase() === 'WT') ? $translate.instant('global.warehouse.transfer') : $translate.instant('global.direct.order');
   self.subTitle = base.wteh.wtno + '-' + Utils.pad(base.wteh.wtsuf, 2) + ' | ' + $translate.instant('global.type') + ': ' + transtype;
   self.stageName = base.getStageName(base.wteh.stagecd);

   self.navigateBack = function () {
      if (self.returnState) {
         $state.go(self.returnState);
      }
      else {
         $state.go('wtee.master');
      }
   };

});

app.controller('WteeHeaderCtrl', function ($scope, $state, $stateParams, DataService, MessageService, OptionSetService, Sasc) {
   var self = this;
   var base = $scope.base;

   self.shipfromdata = {};
   self.shiptodata = {};
   self.shipViaDescription = '';
   self.reasoncodeDesc = '';
   self.billedStatus = '';
   self.addontype1 = '';
   self.addontype2 = '';

   self.setDetails = function () {
      self.countryFromSasc = Sasc.country;
      self.billedOENumber = base.wteh.autoaltordno + '-' + base.wteh.autoaltordsuf;
      self.deliveryDate = base.wteh.drdeldt ? base.wteh.drdeldt : (base.wteh.shipdt ? base.wteh.shipdt : base.wteh.reqshipdt);
      self.deliveryTime = base.wteh.drdeltm ? base.wteh.drdeltm.substring(1, 2) + ':' + base.wteh.drdeltm.substring(3, 2) : '';
      self.leadTime = base.wteh.ignoreltfl ? '*** ' + MessageService.get('global.ignore.lead.time') + ' ***' : MessageService.get('global.use.lead.time');
      self.rush = base.wteh.rushfl ? '*** ' + MessageService.get('global.rush') + ' ***' : MessageService.get('global.no.rush');
      OptionSetService.getDisplayLabel('WT', 'AddOnType', base.wteh.addontype1, function (label) {
         self.addontype1 = label;
      });

      OptionSetService.getDisplayLabel('WT', 'AddOnType', base.wteh.addontype2, function (label) {
         self.addontype2 = label;
      });
   };

   self.setBilledStatus = function () {
      switch (base.wteh.autoaltwhsecd) {
         case 'b': //ignore jslint - correct indentation
            self.billedStatus = MessageService.get('global.billed'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'o': //ignore jslint - correct indentation
            self.billedStatus = MessageService.get('global.open'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'i': //ignore jslint - correct indentation
            self.billedStatus = MessageService.get('global.incomplete'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case 'e': //ignore jslint - correct indentation
            self.billedStatus = MessageService.get('global.error'); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         default: //ignore jslint - correct indentation
            self.billedStatus = ''; //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

   self.retrieveDetails = function () {
      var params;
      self.setDetails();

      params = { whse: base.wteh.shipfmwhse };
      DataService.get('api/ic/icsd/getbypk', { params: params, busy: true }, function (data) {
         self.shipfromdata = data;

         params = { whse: base.wteh.shiptowhse };
         DataService.get('api/ic/icsd/getbypk', { params: params, busy: true }, function (data) {
            self.shiptodata = data;

            params = { codeiden: 'rt', codeval: base.wteh.reasoncode };
            DataService.get('api/sa/sasta/getbypk', { params: params, busy: true }, function (data) {
               self.reasoncodeDesc = (data) ? data.descrip : '** ' + MessageService.get('global.invalid') + ' **';
            });

            params = { codeiden: 's', codeval: base.wteh.shipviaty };
            DataService.get('api/sa/sasta/getbypk', { params: params, busy: true }, function (data) {
               self.shipViaDescription = (data) ? data.descrip : '** ' + MessageService.get('global.invalid') + ' **';

               self.setBilledStatus();
            });
         });
      });
   };

   self.retrieveDetails();

});

app.controller('WteeLineitemsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Sasc, GridService, ModalService) {
   var self = this;
   var base = $scope.base;
   self.reasonUnavailModal = null;

   var ADJUST_ON_HAND_ACTION_TYPE = 'o';
   var ADJUST_STOCK_INVENTORY_ACTION_TYPE = 's';
   var ADJUST_UNAVAILABLE_INVENTORY_ACTION_TYPE = 'u';
   var ADJUST_SHIP_FROM_NEG_ACTION_TYPE = 'n';

   self.isAdjustOnHandEnabled = false;
   self.isAdjustUnavailableEnabled = false;
   self.isAdjustStockInventoryEnabled = false;
   self.isAdjustShipFromEnabled = false;

   base.retrieveLineItems();

   self.selectLine = function () {
      var selectedRow = GridService.getSelectedRecord(self.grid);
      if (selectedRow && base.wteeLineSummary) {
         self.isAdjustOnHandEnabled = (selectedRow.difference > 0 && !selectedRow.updatecompletefl && !base.wteeLineSummary.wlwhsechgfl) ? true : false;
         self.isAdjustUnavailableEnabled = (selectedRow.difference > 0 && !selectedRow.updatecompletefl && !base.wteeLineSummary.wlwhsechgfl) ? true : false;
         self.isAdjustStockInventoryEnabled = (selectedRow.difference > 0 && !selectedRow.updatecompletefl) ? true : false;
         self.isAdjustShipFromEnabled = (selectedRow.difference < 0 && !selectedRow.updatecompletefl) ? true : false;
      } else {
         self.isAdjustOnHandEnabled = false;
         self.isAdjustUnavailableEnabled = false;
         self.isAdjustStockInventoryEnabled = false;
         self.isAdjustShipFromEnabled = false;
      }
   };

   self.lineItemAdjust = function (adjtype) {
      var record = GridService.getSelectedRecord(self.grid);

      switch (adjtype) {
         case ADJUST_ON_HAND_ACTION_TYPE: //ignore jslint - correct indentation
            self.lineItemAction(record, ADJUST_ON_HAND_ACTION_TYPE, ''); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case ADJUST_STOCK_INVENTORY_ACTION_TYPE: //ignore jslint - correct indentation
            self.lineItemAction(record, ADJUST_STOCK_INVENTORY_ACTION_TYPE, ''); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case ADJUST_UNAVAILABLE_INVENTORY_ACTION_TYPE: //ignore jslint - correct indentation
            self.lineItemAction(record, ADJUST_UNAVAILABLE_INVENTORY_ACTION_TYPE, ''); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
         case ADJUST_SHIP_FROM_NEG_ACTION_TYPE: //ignore jslint - correct indentation
            self.lineItemAction(record, '', ''); //ignore jslint - correct indentation
            break; //ignore jslint - correct indentation
      }
   };

   self.lineItemAction = function (record, actionType, reasonUnavailable) {
      base.selectedLine = record;
      base.selectedActionType = actionType;
      base.selectedReason = reasonUnavailable;

      self.reasonUnavailModal = null;

      if ((record.serlottype.toUpperCase() === 'S') &&
         record.serialicsnpofl &&
         actionType !== ADJUST_STOCK_INVENTORY_ACTION_TYPE) {
         $state.go('^.serial', { lineDetail: record, action: actionType });
      }
      else if (record.serlottype.toUpperCase() === 'L' &&
         actionType !== ADJUST_STOCK_INVENTORY_ACTION_TYPE) {
         $state.go('^.lot', { lineDetail: record, action: actionType });
      }
      else if (record.wmfl && (ADJUST_STOCK_INVENTORY_ACTION_TYPE !== actionType)) {
         var ourproc = '';
         var wmadjtype = 'sell';
         var potype = '';
         var returnfl = false;

         if (actionType === ADJUST_UNAVAILABLE_INVENTORY_ACTION_TYPE) {
            ourproc = 'icet';
            wmadjtype = 'sell';
         }
         else {
            ourproc = 'icepa';
            wmadjtype = 'buy';
         }

         if (actionType === ADJUST_UNAVAILABLE_INVENTORY_ACTION_TYPE) {
            returnfl = true;
            potype = 'rm';
         }
         else {
            returnfl = false;
            potype = '';
         }

         var wmbinassignCriteria = {
            altwhse: '',
            currproc: 'wtee',
            jrnlno: base.wteeLineSummary.journalno,
            kitfl: false,
            lineno: record.lineno,
            orderno: base.wteh.wtno,
            ordersuf: base.wteh.wtsuf,
            ourproc: ourproc,
            ordertype: 'i',
            potype: potype,
            prod: record.shipprod,
            returnfl: returnfl,
            seqno: 0,
            stkqtyship: record.difference < 0 ? (record.difference * -1) : record.difference,
            skipnonkitlogic: false,
            stkqtyrcv: record.difference < 0 ? (record.difference * -1) : record.difference,
            unit: record.unit,
            vamodule: '',
            wmqtyrcv: 0,
            wmadjtype: wmadjtype,
            whse: base.wteh.shipfmwhse
         };

         $state.go('.bin-allocation', {
            criteria: wmbinassignCriteria,
            binAllocationDisabled: false,
            submittedCallback: 'base.binAllocationSaved',
            actionsCallback: 'base.binAllocationActions'
         });
      }
      else {
         if (actionType === ADJUST_UNAVAILABLE_INVENTORY_ACTION_TYPE) {
            ModalService.showModal('wt/wtee/reason-unavail-modal.json', 'WteeReasonUnavailCtrl as rsn', $scope, function (modal) {
               self.reasonUnavailModal = modal;
            });
         }
         else {
            base.adjustExceptions(record, actionType, reasonUnavailable);
         }
      }
   };

   self.unavailRsnModalCallback = function (unavailRsn) {
      base.adjustExceptions(base.selectedLine, base.selectedActionType, unavailRsn);
   };

});

app.controller('WteeSerialLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.lineDetail = {};
   self.lineDetail = $stateParams.lineDetail;
   self.action = $stateParams.action;

   self.createIcEntrySerialsCriteria = function () {
      var criteria = {
         whse: base.wteeLineSummary.shipfmwhse,
         prod: self.lineDetail.shipprod,
         type: 'wt',
         orderno: base.wteeLineSummary.wtno,
         ordersuf: base.wteeLineSummary.wtsuf,
         lineno: self.lineDetail.lineno,
         seqno: 0,
         inquiryfl: false,
         actionty: self.action,
         returnfl: self.action === 'u' ? true : false,
         origqty: self.lineDetail.stkqtyrcv,
         proofqty: self.lineDetail.difference * -1,
         ordqty: self.lineDetail.stkqtyship,
         outqty: self.lineDetail.stkqtyrcv,
         ictype: base.wteeLineSummary.transtype,
         cost: self.lineDetail.eachcost,
         qtyunavail: self.lineDetail.actionty === 'u' ? self.lineDetail.difference : self.lineDetail.qtyunavail,
         method: base.wteeLineSummary.wtserialentty,
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: '',
         reasunavty: '',
         custno: 0,
         shipto: '',
         vendno: 0,
         wono: 0,
         wosuf: 0,
         cono2: base.wteeLineSummary.tocono,
         shipfmwhse: base.wteeLineSummary.shipfmwhse,
         shiptowhse: base.wteeLineSummary.shiptowhse,
         jrnlno: base.wteeLineSummary.journalno,
         postdt: base.wteeLineSummary.jrnlpostdt,
         ourproc: 'wtee',
         icspecrecno: self.lineDetail.icspecrecno,
         assignoldest: true,
         currproc: 'wtee'
      };
      return criteria;
   };

   self.serialControlReady = function () {
      // format and add nesseccary criteria to object
      self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria();

      var criteria = {
         icentryserialslist: [],
         icentryserialscriteria: self.icEntrySerialsCriteria
      };

      // Call initialize method on the Shared-Serials-Ctrl
      self.serialsControl.initialize(criteria);
   };

   self.serialDoneCallback = function () {
      //TO:DO Need to find out this below peice of code is required or not.
      //if (self.IsAdjustQtyShip) {
      //   WTEILineGetSerialLotChanges(); // Need to run API call WTEILineGetSerialLotChanges and then update line item using the call [WTEILineUpdate]
      //}
      var reasonUnavailable = '';

      base.adjustExceptions(self.lineDetail, self.action, reasonUnavailable);

      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('^.detail');
   };
});

app.controller('WteeLotCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.lineDetail = {};
   self.lineDetail = $stateParams.lineDetail;
   self.action = $stateParams.action;

   self.createIcEntryLotsCriteria = function () {
      var criteria = {
         whse: base.wteeLineSummary.shipfmwhse,
         prod: self.lineDetail.shipprod,
         type: 'wt',
         orderno: base.wteeLineSummary.wtno,
         ordersuf: base.wteeLineSummary.wtsuf,
         lineno: self.lineDetail.lineno,
         seqno: 0,
         inquiryfl: false,
         actionty: self.action,
         returnfl: self.action === 'u' ? true : false,
         origqty: self.lineDetail.stkqtyrcv,
         proofqty: self.lineDetail.difference * -1,
         ordqty: self.lineDetail.stkqtyship,
         outqty: self.lineDetail.stkqtyrcv,
         ictype: base.wteeLineSummary.transtype,
         cost: self.lineDetail.eachcost,
         qtyunavail: self.lineDetail.actionty === 'u' ? self.lineDetail.difference : self.lineDetail.qtyunavail,
         method: base.wteeLineSummary.wtlotentty,
         retorderno: 0,
         retordersuf: 0,
         retlineno: 0,
         returnty: '',
         reasunavty: '',
         custno: 0,
         shipto: '',
         vendno: 0,
         wono: 0,
         wosuf: 0,
         cono2: base.wteeLineSummary.tocono,
         shipfmwhse: base.wteeLineSummary.shipfmwhse,
         shiptowhse: base.wteeLineSummary.shiptowhse,
         jrnlno: base.wteeLineSummary.journalno,
         ourproc: 'wtee',
         icspecrecno: self.lineDetail.icspecrecno,
         assignoldest: 'y',
         currproc: 'wtee',
         iclotrcptty: '',
         retseqno: 0,
         sQtyunavail: 0
      };
      return criteria;
   };

   self.lotControlReady = function () {
      // format and add nesseccary criteria to object
      self.icEntryLotsCriteria = self.createIcEntryLotsCriteria();

      var transtype = (base.wteeLineSummary.transtype.toUpperCase() === 'WT') ? $translate.instant('global.warehouse.transfer') : $translate.instant('global.direct.order');
      self.subTitle = base.wteeLineSummary.wtno + '-' + base.wteeLineSummary.wtsuf + ' | ' + $translate.instant('global.type') + ': ' + transtype;

      //var criteria = {
      //   icentrylotslist: [],
      //   icentrylotscriteria: self.icEntryLotsCriteria
      //};

      // Call initialize method on the Shared-Lots-Ctrl
      self.lotsControl.initialize(self.icEntryLotsCriteria);
   };

   self.lotDoneCallback = function () {
      //TO:DO Need to find out this below peice of code is required or not.
      //if (self.IsAdjustQtyShip) {
      //   WTEILineGetSerialLotChanges(); // Need to run API call WTEILineGetSerialLotChanges and then update line item using the call [WTEILineUpdate]
      //}

      var reasonUnavailable = '';

      base.adjustExceptions(self.lineDetail, self.action, reasonUnavailable);

      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('^.detail');
   };
});

app.controller('WteeQuickReceiveCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.setDefaults = function () {
      self.wtOrder = '0-00';
      base.wteh = { transtype: '', stagecd: null };
      self.isValidWTorder = false;
      self.stageName = '';
   };

   self.getWtehRecord = function (wtorder) {
      self.isValidWTorder = false;

      var splitWt = wtorder.split('-');

      var params = { wtno: splitWt[0], wtsuf: splitWt[1] };

      DataService.get('api/wt/wteh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            base.wteh = data;
            base.wteh.transtype = (base.wteh.transtype.toUpperCase() === 'WT') ? $translate.instant('global.warehouse.transfer') : $translate.instant('global.direct.order');
            self.isValidWTorder = true;
         }
      });
   };

   if ($stateParams.wtno) {
      self.wtOrder = $stateParams.wtno;

      self.getWtehRecord(self.wtOrder);
   }
   else {
      self.setDefaults();
   }

   self.wtChanged = function () {
      if (self.wtOrder) {
         self.getWtehRecord(self.wtOrder);
      }
      else {
         self.setDefaults();
      }
   };

   self.quickView = function () {
      if (self.isValidWTorder) {
         if (base.wteh) {
            $state.go('wtee.quickview', {
               wtno: base.wteh.wtno,
               wtsuf: base.wteh.wtsuf,
               cono: base.wteh.cono,
               cono2: base.wteh.cono2,
               prevState: $state.current.name
            });
         }
      } else {
         self.showErrorMessage();
      }
   };

   self.showDetails = function () {
      if (self.isValidWTorder) {
         if (base.wteh) {
            if (base.wteh.stagecd === 5) {
               if (!(base.journal && base.journal.gJrnlno !== 0)) {
                  base.journalControl.showOpenView(function () {
                     $state.go('wtee.detail', { returnState: $state.current.name });
                  });
               }
               else {
                  $state.go('wtee.detail', { returnState: $state.current.name });
               }
            }
            else {
               MessageService.error('global.error', 'error.stage.not.valid.5659');
            }
         }
      }
      else {
         self.showErrorMessage();
      }
   };

   self.showErrorMessage = function () {
      MessageService.error('global.error', 'error.wt.number.not.in.warehouse.transfers');
   };

});

app.controller('WteeReasonUnavailCtrl', function ($scope) {
   var self = this;
   var line = $scope.line;
   self.reasonUnavail = '';

   self.submit = function () {
      line.unavailRsnModalCallback(self.reasonUnavail);
      line.reasonUnavailModal.destroy();
   };

   self.cancel = function () {
      line.reasonUnavailModal.destroy();
   };
});