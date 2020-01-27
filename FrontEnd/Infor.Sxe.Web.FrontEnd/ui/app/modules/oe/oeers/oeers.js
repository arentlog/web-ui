'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('oe', 'oeers', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oeers');
   $stateProvider.state('oeers.detail', {
      url: '/detail',
      params: {
         oeersRecord: null,
         oeesdetailhdr: null,
         oeaddons: null,
         module: null,
         isQckshipOpen: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeers/detail.json');
            },
            controller: 'OeersDetailCtrl as dtl'
         }
      }
   });
   $stateProvider.state('oeers.addon', {
      url: '/addon',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeers/newaddon.json');
            },
            controller: 'OeersNewAddonCtrl as addn'
         }
      }

   });
   $stateProvider.state('oeers.master.orderStatus', {
      url: '/order-status',
      params: { whseLogStatus: null, menuFunction: null, setWhseLogStatusCallback: null, setFailCallback: null },
      views: {
         orderStatus: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/order-status/order-status.json');
            },
            controller: 'OrderStatusCtrl as ordStat'
         }
      }
   });
   $stateProvider.state('oeers.detail.sequence', {
      url: '/sequence',
      params: { selectedLine: null, detaillinelineseq: null, detaillinesnlot: null },
      views: {
         seqChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeers/shippingsplitserialslots-view.json');
            },
            controller: 'OeersSplitSequenceCtrl as sec'
         }
      }
   });
   $stateProvider.state('oeers.detail.sequence.serialsnlots', {
      url: '/serials-lots',
      params: {
         selectedLine: null,
         lineseq: null,
         detaillinesnlot: null
      },
      views: {
         serialChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeers/oeers-serials-lots-view.json');
            },
            controller: 'OeersSerialsLotsCtrl as snl'
         }
      }
   });
});

app.controller('OeersBaseCtrl', function ($state, ConfigService, MessageService, DataService, Sasoo) {
   var self = this;
   self.MENU_FUNCTION_OEES = 'OEES';

   self.criteria = {
      stage: '2',
      sort1: "a",
      sort2: "e",
      tbship: true,
      whse: '',
      shipvia: '',
      types: ["Stock Order", "Direct Order", "Correction", "Return Merchandise", "Blanket Release"],
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };
   self.oeersdetaillinelineseq = {};
   self.oeersdetaillinesnlot = {};
   self.isSplitOK = false;
   self.validateSplitMsg = '';
   self.iLaunchSerLotFlag = false;
   self.isSaveSeq = false;
   if (Sasoo.homewhsefl) {
      self.criteria.whse = Sasoo.whse;
   }
   self.geocodecriteria = {};
   self.oeersSelectedRecord = {};
   self.isUnShipAuthNeeded = false;
   self.isCashSaleAuthNeeded = false;
   self.isWLAuthNeeded = false;
   self.isESBWLNeeded = false;
   self.oeAddonList = {};
   self.isSerial = false;
   self.islot = false;
   self.module = 'oeers';
   self.isQckshipOpen = false;
   self.iLaunchBtnGEOCode = false;
   self.isMaster = function () {
      return $state.is('oeers.master');
   };
   self.includesMaster = function () {
      return $state.includes('oeers.master');
   };
   self.isDetail = function () {
      return $state.is('oeers.detail');
   };
   self.includesDetail = function () {
      return $state.includes('oeers.detail');
   };
   self.isSequence = function () {
      return $state.is('oeers.detail.sequence');
   };
   // Perform search and update data set for the grid
   self.search = function () {
      var strTypes = '';
      strTypes = self.criteria.types.join();
      var oeesloadorderlistcriteria = {
         custno: self.criteria.custno,
         whse: self.criteria.whse,
         types: strTypes,
         sort1: self.criteria.sort1,
         sort2: self.criteria.sort2,
         pickinit: self.criteria.pickinit,
         stage: self.criteria.stage,
         reqshipdt: self.criteria.reqshipdt,
         shipvia: self.criteria.shipvia,
         route: self.criteria.route,
         tbnotheld: self.criteria.tbnotheld,
         tbexceptions: self.criteria.tbexceptions,
         tbship: self.criteria.tbship,
         recordcountlimit: self.criteria.recordcountlimit,
         userfield: self.criteria.userfield
      };
      DataService.post('api/oe/asoeentry/oeesloadorderlist', { data: oeesloadorderlistcriteria, busy: true }, function (data) {
         self.dataset = data.oeesloadorderlistresults;
         MessageService.processMessaging(data.messaging);
         self.datasetdetails = [];
         self.oeersdetaillinelineseq = [];
         self.oeersdetaillinesnlot = [];
      });
   };
});

app.controller('OeersSearchCtrl', function ($scope, $state, DataService, Utils, ConfigService, Sasoo) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = {
         stage: '2',
         tbship: true,
         types: ["Stock Order", "Direct Order", "Correction", "Return Merchandise", "Blanket Release"],
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };
      if (Sasoo.homewhsefl) {
         base.criteria.whse = Sasoo.whse;
      }
   };
   // Button search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeers.master');
      }
      base.search();
   };
});

app.controller('OeersMasterCtrl', function ($scope, $state, $translate, $stateParams, DataService, GridService, AuthService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.isShowdetailType = 'false';
   self.loadDefaultUpdate = function () {
      var sharedPVRegisteryList = [];
      sharedPVRegisteryList.push({ pvfunction: 'oe', pvsection: 'oeers', pvsubsection: '', pvobject: '', pvkeyname: 'updatetype' });
      DataService.post('api/shared/assharedentry/sharedpvregistryload', { data: sharedPVRegisteryList, busy: true }, function (data) {
         if (data) {
            var sharedResult = JSLINQ(data).FirstOrDefault();
            if (sharedResult) {
               self.isShowdetailType = (sharedResult.pvcharvalue === 'hdr-error') ? 'true' : 'false';
               base.defaultTab = (sharedResult.pvcharvalue === 'hdr-error') ? 0 : 1;
            }
         }
      });
   };
   self.onDefaultUpdateSelection = function () {
      var sharedPVRegisteryList = [];
      sharedPVRegisteryList.push({
         pvfunction: 'oe',
         pvsection: 'oees',
         pvsubsection: '',
         pvobject: '',
         pvkeyname: 'updatetype',
         pvcharvalue: self.isShowdetailType === 'true' ? 'hdr-error' : 'lines-*'
      });
      DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: sharedPVRegisteryList, busy: true }, function (data) {
         if (data) {
            var sharedResult = JSLINQ(data).FirstOrDefault();
            if (sharedResult) {
               base.isShowdetailType = (sharedResult.pvcharvalue === 'hdr-error') ? 'false' : 'true';
               base.defaultTab = (self.isShowdetailType === 'true') ? 0 : 1;
            }
         }
      });
   };
   self.loadDefaultUpdate();
   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   //Route Cell Edit
   self.updateOeeh = function () {
      DataService.update('api/oe/oeeh', { data: self.oeeh }, function () {
         //Nothing to Refresh.
      });
   };

   self.onRowupdate = function () {
      if (self.record) {
         var inputparams = {
            orderno: self.record.orderno,
            ordersuf: self.record.ordersuf,
            fillmode: true,
            fldlist: ''
         };

         DataService.get('api/oe/oeeh/getbypk', { params: inputparams, busy: true }, function (data) {
            self.oeeh = data;
            self.oeeh.route = self.record.route;
            self.updateOeeh();
         });
      }
   };
   self.gridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         self.record = base.dataset[args.row];
         self.onRowupdate();
      }
   };
   //OEIO Hyperlink
   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
      }
   };
   //ARIC Hyperlink
   self.customerInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };
   //ARIC Hyperlink
   self.customerInquiryWithShipToHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };
   self.wlStatusAuthPointPassed = function () {
      self.splitProcessing();
   };

   self.wlStatusAuthPointFailed = function () {
      MessageService.error('global.error', 'message.need.proper.authentication.to.ship.wl.order');
   };

   // Split To Back Order
   self.splitToBackOrder = function () {
      base.oeersSelectedRecord = GridService.getSelectedRecord(base.grid);
      if (base.oeersSelectedRecord) {

         if (base.oeersSelectedRecord.stagecd > 1) {
            var params = {
               pvOrderno: base.oeersSelectedRecord.orderno,
               pvOrdersuf: base.oeersSelectedRecord.ordersuf
            };
            DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
               if (data) {
                  self.authPointsRunning = 0;
                  if (data.pvWlauthtype.toLowerCase() === 'wlord') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('wlord', '', '', '', '', null, self.wlStatusAuthPointPassed, self.wlStatusAuthPointFailed);
                  }
                  else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('esbwl', '', '', '', '', null, self.wlStatusAuthPointPassed, self.wlStatusAuthPointFailed);
                  }
                  else {
                     self.splitProcessing();
                  }
               }
            });
         }
         else {
            self.splitProcessing();
         }
      }
   };

   self.splitProcessingContinue = function () {
      if (base.oeersSelectedRecord) {
         var oeersdetailhdrloadcriteria = {
            orderno: base.oeersSelectedRecord.orderno,
            ordersuf: base.oeersSelectedRecord.ordersuf,
            jrnlno: base.oeersSelectedRecord.jrnlno,
            userfield: base.oeersSelectedRecord.userfield
         };
         DataService.post('api/oe/asoeentry/oeesdetailhdrload', { data: oeersdetailhdrloadcriteria, busy: true }, function (data) {
            base.datasetHeader = data;
            $state.go('^.detail', {
               oeersRecord: base.oeersSelectedRecord,
               oeesdetailhdr: null,
               oeaddons: null,
               module: 'oeers'
            });
         });
      }
   };

   // This needs to be defined before it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         self.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'authPointPassed') {
         MessageService.alert($translate.instant('wl.order.in.process'), $translate.instant('message.you.have.authorization.to.make.changes.that.may.not.get.updated.in.wl'));
      }
      if (parameters.stage && parameters.stage === 'finish') {
         self.splitProcessingContinue();
      }
   };

   self.splitProcessing = function () {
      base.oeersSelectedRecord = GridService.getSelectedRecord(base.grid);
      if (base.oeersSelectedRecord) {
         var request = {
            iOrderNo: base.oeersSelectedRecord.orderno,
            iOrderSuf: base.oeersSelectedRecord.ordersuf
         };
         DataService.get('api/oe/asoeentry/oeessplittobackordercheck/{iOrderNo}/{iOrderSuf}', { pathParams: request, busy: true }, function (data) {
            if (data) {
               base.isShowdetailType = (data.cInitTabChoice.toLowerCase() === 'line') ? 'false' : 'true';
               base.isSplitOK = data.lSplitOK;
               if (data.wlstatus && data.wlstatus.wlwhsefl) {
                  $state.go('.orderStatus', { whseLogStatus: data.wlstatus, menuFunction: base.MENU_FUNCTION_OEES, setWhseLogStatusCallback: self.setWhseLogStatusCallback });
               } else {
                  self.splitProcessingContinue();
               }
            }
         });
      }
   };
});

app.controller('OeersDetailCtrl', function ($filter, $state, $scope, $stateParams, $timeout, AuthService, GridService, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.frtShopSingle = {};
   self.frtWhse = {};
   self.frtCustomer = {};
   self.frtOrder = {};
   self.frtDataset = [];
   self.record = {};
   self.lineitemrecord = {};
   self.addon = {};
   self.billDirectAddon = {};
   self.selectedAddon = {};
   self.isBillToReadonly = true;
   self.isForceGEO = false;
   self.isLineEnable = false;
   self.isQckshipOpen = $stateParams.isQckshipOpen;
   if ($stateParams.oeersRecord) {
      self.record = $stateParams.oeersRecord;
   }
   else {
      self.record = base.oeersSelectedRecord;
   }
   if (self.record) {
      base.criteria.custno = self.record.custno;
      base.criteria.whse = self.record.whse;
   }
   if (base.datasetHeader && base.datasetHeader.oeesdetailhdrsingle) {
      self.oeers = base.datasetHeader.oeesdetailhdrsingle;
   }
   else if ($stateParams.oeesdetailhdr) {
      self.oeers = $stateParams.oeesdetailhdr;
   }
   if ($stateParams.module) {
      base.module = $stateParams.module;
   }
   if (base.datasetHeader && base.datasetHeader.oeaddons) {
      self.addon = base.datasetHeader.oeaddons;
   }
   else if ($stateParams.oeaddons) {
      self.addon = $stateParams.oeaddons;
   }
   if (!self.record.ordernox) {
      self.record.ordernox = self.record.orderno + '-' + Utils.pad(self.record.ordersuf, 2);
   }
   self.setGeoCodeLookupCriteria = function () {
      return {
         tablename: 'oeeh',
         orderno: self.oeers.orderno,
         ordersuf: self.oeers.ordersuf,
         city: self.oeers.shiptocity,
         state: self.oeers.shiptostate,
         zipcd: self.oeers.shiptozip,
         country: self.oeers.countrycd,
         geocd: self.oeers.geocode,
         streetaddr: self.oeers.shiptoaddress1,
         outofcityfl: self.oeers.outofcityfl
      };
   };
   self.setDatcFieldDisplay = function () {
      if (self.oeers.totdatccost !== 0 && self.oeers.icdatclabel) {
         self.isDatCVisible = true;
         if (!self.oeers.pmshipfl || !self.oeers.pmcodfl) {
            self.isflDatCEnable = true;
         }
         else {
            self.isflDatCEnable = false;
         }
      }
      else {
         self.isDatCVisible = false;
         self.isflDatCEnable = false;
      }
   };
   self.loadOEAddons = function () {
      var params = {
         iOrderNo: self.record.orderno,
         iOrderSuf: self.record.ordersuf
      };
      DataService.get('api/oe/asoeheader/loadoeaddonlist/{iOrderNo}/{iOrderSuf}', { pathParams: params, busy: true }, function (data) {
         base.oeAddonList = data;
      });
   };
   //Load Freight Shop
   self.setFreightRateShopInput = function () {
      if (self.record) {
         var params = {
            iOrderNo: self.record.orderno,
            iOrderSuf: self.record.ordersuf,
            cOurProc: 'oeers',
            cUserField: self.record.UserField
         };
         DataService.get('api/oe/asoeentry/frtrateshopload/{iOrderNo}/{iOrderSuf}/{cOurProc}/{cUserField}', { pathParams: params, busy: true }, function (data) {
            self.frtShopSingle = data.frtrateshoploadsingle;
            // Sort results by order freight
            self.frtDataset = $filter('orderBy')(data.frtrateshoploadlist, 'orderfrt');

            if (self.frtShopSingle) {
               self.frtWhse = self.frtShopSingle.whse + '-' + self.frtShopSingle.whsedesc;
               self.frtCustomer = self.frtShopSingle.custno + '-' + self.frtShopSingle.custname;
               self.frtOrder = self.frtShopSingle.orderno + '-' + Utils.pad(self.frtShopSingle.ordersuf, 2);
            }
         });
      }
   };

   self.oeersDatc = function () {
      self.oeers.datc = self.oeers.totdatccost;
   };

   self.oeersUpdate = function () {
      var updateOEERSRequest = { oeaddons: self.addon, oeesdetailhdrsingle: self.oeers };
      DataService.post('api/oe/asoeentry/oeesdetailhdrupdt', { data: updateOEERSRequest, busy: true }, function (data) {
         if (data) {
            self.oees = base.datasetHeader.oeesdetailhdrsingle = data.oeesdetailhdrsingle;
            self.addon = base.datasetHeader.oeaddons = data.oeaddons;
            base.iLaunchBtnGEOCode = data.lLaunchBtnGeoCode;
            self.setGeoCodeLookupCriteria();
            self.setDatcFieldDisplay();
            self.loadOEAddons();
            self.setFreightRateShopInput();
         }
      });
   };

   self.onselectedaddon = function (e, args) {
      if (args[0]) {
         self.selectedAddon = args[0].data;
      } else {
         self.selectedAddon = {};
      }
   };

   self.addnewAddon = function () {
      $state.go('^.addon', {});
   };

   self.deleteAddons = function () {
      if (self.selectedAddon) {
         var index = base.datasetHeader.oeaddons.indexOf(self.selectedAddon);
         if (index > -1) {
            base.datasetHeader.oeaddons.splice(index, 1);
         }
      }
   };
   //Button Recalculate in Total Section
   self.recalculate = function () {
      var requestParams = { oeaddons: self.addon, oeesdetailhdrsingle: self.oeers };
      if (requestParams) {
         DataService.post('api/oe/asoeentry/oeesdetailhdrrecalc', { data: requestParams, busy: true }, function (data) {
            self.oees = base.datasetHeader.oeesdetailhdrsingle = data.oeesdetailhdrsingle;
            self.addon = base.datasetHeader.oeaddons = data.oeaddons;
            base.iLaunchBtnGEOCode = data.lLaunchBtnGeoCode;
            MessageService.processMessaging(data.messaging);
            self.setGeoCodeLookupCriteria();
            self.setDatcFieldDisplay();
            self.loadOEAddons();
            self.setFreightRateShopInput();
         });
      }
   };

   //Button Update
   self.update = function () {
      if (!self.oeers.shiptoname) {
         MessageService.info('global.validation.error', 'error.ship.to.name.this.is.a.required.field.2100');
      }
      //*Validate GeoCode is pending which will generate the result for isForceGEO flag

      if (self.isForceGEO) {
         //Need to open geo popup
      }
      else {
         if (self.oeers.datc !== self.oeers.totdatccost) {
            AuthService.createAuthPoint('oees', 'header', 'surcharge', '', '', null,
               function () {
                  self.oeersUpdate();
               },
               function () {
                  self.oeersDatc();
               });
         }
         else {
            self.oeersUpdate();
         }
      }
   };

   self.setSelectedFrtDataset = function () {
      var record = GridService.getSelectedRecord(self.frtGrid);
      var changeAddonrequest = {};

      self.oeers.shipvia = record.shipvia;

      if (record.orderfrt !== 0) {
         changeAddonrequest = {
            oeaddons: base.datasetHeader.oeaddons[1],
            iNewAddonNo: base.datasetHeader.oeaddons[1].addonno,
            dNewAddonAmt: record.orderfrt - record.ordfrtextra1 - record.ordfrtextra2,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            base.datasetHeader.oeaddons[1] = data;
         });
      }
      if (record.ordfrtextra1 !== 0) {
         changeAddonrequest = {
            oeaddons: base.datasetHeader.oeaddons[2],
            iNewAddonNo: base.datasetHeader.oeaddons[2].addonno,
            dNewAddonAmt: record.ordfrtextra1,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            base.datasetHeader.oeaddons[2] = data;
         });
      }
      if (record.ordfrtextra2 !== 0) {
         changeAddonrequest = {
            oeaddons: base.datasetHeader.oeaddons[3],
            iNewAddonNo: base.datasetHeader.oeaddons[3].addonno,
            dNewAddonAmt: record.ordfrtextra2,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            base.datasetHeader.oeaddons[3] = data;
         });
      }
   };

   //Button Recalculate
   self.frtRecalculate = function () {
      if (self.frtShopSingle) {
         DataService.post('api/oe/asoeentry/frtrateshoprecalc', { data: self.frtShopSingle, busy: true }, function (data) {
            // Sort results by order freight
            self.frtDataset = $filter('orderBy')(data, 'orderfrt');
         });
      }
   };
   self.revNav = function () {
      if (base.module === 'oees') {
         //To navigate back to quickship control if user is performing split to backorder functionality from Quick ship screen
         if (!self.isQckshipOpen) {
            $state.go('oees.quickship');
         }
         else {
            $state.go('oees.master', { refreshSearch: self.isQckshipOpen }, { reload: 'oees.master' });
         }
      }
      else if (base.module === 'oeers') {
         $state.go('oeers.master', { refreshSearch: true }, { reload: 'oeers.master' });
      }
   };
   //cancel Split
   self.cancelSplit = function () {
      var areAnyLinesChanged = false;
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      selectedRecords.forEach(function (record) {
         if (record.islineChangeFl) {
            areAnyLinesChanged = true;
         }
      });

      if (areAnyLinesChanged) {
         if (base.datasetdetails && base.datasetdetails.length > 0) {
            if (base.datasetdetails[0].qtyship !== base.datasetdetails[0].qtyshipdisp) {
               MessageService.yesNo('global.question', 'oeers.do.you.wish.to.cancel.your.work.on.the.split.to.back.order.screen', function () {
                  // Yes processing
                  var inputparams = {
                     orderno: self.record.orderno,
                     ordersuf: self.record.ordersuf,
                     fillmode: true,
                     fldlist: ''
                  };
                  DataService.get('api/oe/oeeh/getbypk', { params: inputparams, busy: true }, function (data) {
                     var oeeh = data;
                     oeeh.openinit = '';
                     DataService.update('api/oe/oeeh', { data: oeeh, busy: true }, function () {
                        self.revNav();
                     });
                  });
               }, function () {
                  // No processing
               });
            }
         }
      }
   };
   self.oncellEditable = function () {
      if (self.isLineEnable) {
         return true;
      }
      else { return false; }
   };

   self.onclickSplitCheck = function (e, args) {
      self.lineitemrecord = args[0].item;
      if (self.lineitemrecord) {
         var inputparams = {
            orderno: self.lineitemrecord.orderno,
            ordersuf: self.lineitemrecord.ordersuf,
            lineno: self.lineitemrecord.lineno,
            fldlist: ''
         };
         DataService.get('api/oe/oeel/getbypk', { params: inputparams, busy: true }, function (data) {
            if (data.bono !== 0) {
               MessageService.error('global.error', MessageService.get('error.a.back.order.exists.for.this.line.cannot.split'));
            }
         });
      }
   };

   self.lineitemgridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         self.lineitemrecord = base.datasetdetails[args.row];
         if (args.column.field === 'qtyshipdisp') {
            if (args.value > args.oldValue) {
               MessageService.info('global.error', 'error.must.not.be.greater.than.qty.shipped.on.order.line.6580');
               self.lineitemrecord.qtyshipdisp = args.oldValue;
            }
            else {
               self.lineitemrecord.qtybo = self.lineitemrecord.qtyship - self.lineitemrecord.qtyshipdisp;
               var index = base.datasetdetails.indexOf(self.lineitemrecord);
               base.grid.updateRow(index);
               self.lineitemrecord.islineChangeFl = true;
            }
         }
         else {
            if (self.lineitemrecord.qtybo > self.lineitemrecord.qtyship) {
               MessageService.info('global.error', 'error.must.not.be.greater.than.origional.qty.shipped');
               self.lineitemrecord.qtybo = args.oldValue;
            }
            else {
               self.lineitemrecord.qtyshipdisp = self.lineitemrecord.qtyship - self.lineitemrecord.qtybo;
               var currentIndex = base.datasetdetails.indexOf(self.lineitemrecord);
               base.grid.updateRow(currentIndex);
               self.lineitemrecord.islineChangeFl = true;
            }
         }
      }
   };

   self.lineUpdate = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      selectedRecords.forEach(function (record) {
         if (!record.islineChangeFl) {
            record.qtyshipdisp = 0;
            record.qtybo = record.qtyship;
            record.islineChangeFl = true;
         }
      });

      var requesttoValidate = {
         oeersdetaillinelineseq: base.oeersdetaillinelineseq,
         oeersdetaillineoeers: base.datasetdetails,
         oeersdetaillinesnlot: base.oeersdetaillinesnlot,
         iOrderNo: base.datasetdetails[0].orderno,
         iOrderSuf: base.datasetdetails[0].ordersuf
      };
      DataService.post('api/oe/asoeentry/oeersdetaillineupdatevalidate', { data: requesttoValidate, busy: true }, function (data) {
         if (data) {
            base.oeersdetaillinelineseq = data.oeersdetaillinelineseq;
            base.datasetdetails = data.oeersdetaillineoeers;
            base.oeersdetaillinesnlot = data.oeersdetaillinesnlot;
            base.iLaunchSerLotFlag = data.lLaunchSerLotFl;
            if (base.iLaunchSerLotFlag) {
               $state.go('.sequence', {
                  selectedLine: self.lineitemrecord,
                  detaillinelineseq: data.oeersdetaillinelineseq,
                  detaillinesnlot: data.oeersdetaillinesnlot
               });
            }
            else {
               var updaterequest = { oeersdetaillinelineseq: base.oeersdetaillinelineseq, oeersdetaillineoeers: base.datasetdetails, oeersdetaillinesnlot: base.oeersdetaillinesnlot };
               DataService.post('api/oe/asoeentry/oeersdetaillineupdate', { data: updaterequest, busy: true }, function () {
                  self.revNav();
               });
            }
         }
      });
   };

   self.initializeDetailGetOeeh = function () {
      if (self.record) {
         var params = {
            orderno: self.record.orderno,
            ordersuf: self.record.ordersuf,
            fillmode: true,
            fldlist: ''
         };

         //User Hook (do not rename)
         //By design, this is on base so it hits during initialization.
         if (base.initializeDetailGetOeehCriteria) {
            base.initializeDetailGetOeehCriteria(params);
         }

         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
            self.billDirectAddon = data.billdirectaddon;

            //User Hook (do not rename)
            if (self.getOeehContinue) {
               self.getOeehContinue(data);
            }
         });

         var inputParams = {
            iOrderNo: self.record.orderno,
            iOrderSuf: self.record.ordersuf
         };

         //User Hook (do not rename)
         //By design, this is on base so it hits during initialization.
         if (base.initializeDetailGetOeehLinesCriteria) {
            base.initializeDetailGetOeehLinesCriteria(inputParams);
         }

         DataService.get('api/oe/asoeentry/oeesdetaillineload/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {
            base.oeesDetailLineList = data.oeesdetaillinelist;
            base.oeesDetailLineSingle = data.oeesdetaillinesingle;
         });
      }
   };

   self.initializeDetailGetMore = function () {
      if (self.oeers) {
         self.setGeoCodeLookupCriteria();
         self.setDatcFieldDisplay();
         self.loadOEAddons();
         self.setFreightRateShopInput();

         //User Hook (do not rename)
         //By design, this is on base so it hits during initialization.
         if (base.initializeDetailGetMoreContinue) {
            base.initializeDetailGetMoreContinue();
         }
      }
   };

   self.initializeDetailGetLineItems = function () {
      //get Line Items
      if (self.record) {
         var inputparams = {
            iOrderNo: self.record.orderno,
            iOrderSuf: self.record.ordersuf
         };

         //User Hook (do not rename)
         //By design, this is on base so it hits during initialization.
         if (base.initializeDetailGetLineItemsCriteria) {
            base.initializeDetailGetLineItemsCriteria(inputparams);
         }

         DataService.get('api/oe/asoeentry/oeersdetaillineload/{iOrderNo}/{iOrderSuf}', { pathParams: inputparams, busy: true }, function (data) {
            base.datasetdetails = data.oeersdetaillineoeers;
            base.oeersdetaillinelineseq = data.oeersdetaillinelineseq;
            base.oeersdetaillinesnlot = data.oeersdetaillinesnlot;
            data.oeersdetaillineoeers.forEach(function (line) {
               self.isLineEnable = line.enableline;
               self.oncellEditable();
            });
            //var isSplitDone = JSLINQ(data.oeersdetaillineoeers).Where(function (line) {
            //   return line.enableline === false;
            //});
            //if (isSplitDone && isSplitDone.items.length > 0) {
            //   MessageService.error('global.error', MessageService.get('error.a.back.order.exists.for.this.line.cannot.split'));
            //}
         });
      }
   };

   self.initializeDetail = function () {
      self.initializeDetailGetOeeh();
      self.initializeDetailGetMore();
      if (!base.datasetdetails || base.datasetdetails.length === 0) {
         self.initializeDetailGetLineItems();
      } 
   };

   //This is a workaround to help out for Customizations.  We needed to be able to override some
   //of these Initialize functions.  Ideally, the framework could allow us enough time.
   $timeout(self.initializeDetail, 300);
});

app.controller('OeersChangeAddonsCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.selectedAddon = $scope.dtl.rowParams.item;
   var grid = $scope.base.grid;
   var row = $scope.dtl.rowParams.row;
   self.iNewAddondesc = {};
   self.dNewAddonAmt = {};
   self.lNewAddonType = {};
   if (self.selectedAddon) {
      self.iNewAddondesc = self.selectedAddon.addonno;
      self.dNewAddonAmt = self.selectedAddon.addonamt;
      self.lNewAddonType = self.selectedAddon.addontype;
   }
   self.cancel = function () {
      grid.toggleRowDetail(row);
   };
   self.submit = function () {
      var changeAddonrequest = { oeaddons: self.selectedAddon, iNewAddonNo: self.iNewAddondesc, dNewAddonAmt: self.dNewAddonAmt, lNewAddonType: self.lNewAddonType };
      DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         var updateindx = base.datasetHeader.oeaddons.findIndex(function (item) {
            return item.seqno === data.seqno;
         });
         base.datasetHeader.oeaddons[updateindx] = data;
      });
   };
});

app.controller('OeersNewAddonCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.iNewAddondesc = {};
   self.dNewAddonAmt = {};
   self.lNewAddonType = {};
   self.addAddon = function () {
      var addoncriteria = {
         orderno: base.oeersSelectedRecord.orderno,
         ordersuf: base.oeersSelectedRecord.ordersuf,
         addonno: self.iNewAddondesc,
         addonamt: self.dNewAddonAmt,
         addontype: self.lNewAddonType
      };
      var addonrequest = { oeaddons: base.datasetHeader.oeaddons, addoeaddoncriteria: addoncriteria };
      DataService.post('api/oe/asoeheader/addoeaddon', { data: addonrequest, busy: true }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.datasetHeader.oeaddons = data;
         $state.go('^.detail', {});
      });
   };
   self.cancel = function () {
      $state.go('^.detail', {});
   };
});

app.controller('OeersSplitSequenceCtrl', function ($state, $scope, $stateParams, DataService, MessageService, GridService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.detailSeq = $stateParams.detaillinelineseq;
   self.detailsnlots = $stateParams.detaillinesnlot;
   self.seqsubtitle = MessageService.get('global.order.number') + $stateParams.selectedLine.orderno + '-' + Utils.pad($stateParams.selectedLine.ordersuf, 2);
   self.selectSeq = function () {
      self.selectedRecord = GridService.getSelectedRecord(self.seqgrid);
      if (self.selectedRecord) {
         $state.go('.serialsnlots', {
            selectedLine: $stateParams.selectedLine,
            lineseq: self.selectedRecord,
            detaillinesnlot: self.detailsnlots
         });
      }
   };
   self.saveSeq = function () {
      var updaterequest = { oeersdetaillinelineseq: base.oeersdetaillinelineseq, oeersdetaillineoeers: base.datasetdetails, oeersdetaillinesnlot: base.oeersdetaillinesnlot };
      DataService.post('api/oe/asoeentry/oeersdetaillineupdate', { data: updaterequest, busy: true }, function () {
         base.isSerial = false;
         base.islot = false;
         dtl.revNav();
      });
   };
});

app.controller('OeersSerialsLotsCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.icEntrySerialsCriteria = {};
   self.icEntryLotsCriteria = {};
   self.selectedLineItem = $stateParams.selectedLine;
   self.lineSeq = $stateParams.lineseq;
   self.detailsnlots = $stateParams.detaillinesnlot;
   base.isSerial = false;
   base.islot = false;
   self.snlotsubtitle = MessageService.get('global.line.number') + self.lineSeq.lineno + '|' + self.lineSeq.prod;

   if (self.lineSeq.serlottype.toLowerCase() === 's') {
      base.isSerial = true;
      self.createIcEntrySerialsCriteria = function () {
         var criteria = {
            whse: base.criteria.whse,
            prod: self.lineSeq.prod,
            type: 'oeers',
            orderno: self.selectedLineItem.orderno,
            ordersuf: self.selectedLineItem.ordersuf,
            lineno: self.selectedLineItem.lineno,
            linenochar: self.selectedLineItem.lineno.toString(),
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: false,
            origqty: self.lineSeq.selqtyreq,
            proofqty: self.lineSeq.selqtyreq - self.lineSeq.selqtyord,
            ordqty: self.lineSeq.selqtyord,
            outqty: self.lineSeq.selqtyreq,
            ictype: 'so',
            method: '',
            custno: base.criteria.custno,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: 'oeers',
            icspecrecno: 0,
            assignoldest: true,
            currproc: 'oeers',
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            prodnotesfl: ''
         };
         return criteria;
      };
      self.serialControlReady = function () {
         // format and add nesseccary criteria to object
         self.icEntrySerialsCriteria = self.createIcEntrySerialsCriteria();
         var criteria = {
            icentryserialslist: self.detailsnlots,
            icentryserialscriteria: self.icEntrySerialsCriteria
         };
         // Call initialize method on the Shared-Serials-Ctrl
         self.serialsControl.initialize(criteria);
      };
      self.serialDoneCallback = function (icentryserialslist) {
         var oeersDetailLineSerialFinishRequest = {
            icentryserialslist: icentryserialslist,
            oeersdetaillinesnlot: base.oeersdetaillinesnlot,
            icentryserialscriteria: self.icEntrySerialsCriteria,
            oeersdetaillinelineseq: self.lineSeq,
            oeersdetaillineoeers: self.selectedLineItem,
            iLineNo: self.selectedLineItem.lineno,
            iSeqNo: self.lineSeq.seqno
         };
         DataService.post('api/oe/asoeentry/oeersdetaillineserialfinish', { data: oeersDetailLineSerialFinishRequest, busy: true }, function (data) {
            if (data) {
               base.oeersdetaillinesnlot = data.oeersdetaillinesnlot;
               var detaillinelineoeersIndex = base.datasetdetails.findIndex(function (item) {
                  return item.orderno === data.oeersdetaillineoeers.orderno &&
                     item.ordersuf === data.oeersdetaillineoeers.ordersuf &&
                     item.lineno === data.oeersdetaillineoeers.lineno;
               });
               base.datasetdetails[detaillinelineoeersIndex] = data.oeersdetaillineoeers;

               var detaillinelineseqIndex = base.oeersdetaillinelineseq.findIndex(function (item) {
                  return item.seqno === data.oeersdetaillinelineseq.seqno;
               });
               base.oeersdetaillinelineseq[detaillinelineseqIndex] = data.oeersdetaillinelineseq;
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               base.isSaveSeq = true;
            }
         });
      };
   }
   else {
      base.islot = true;
      self.createIcEntryLotsCriteria = function () {
         var criteria = {
            whse: base.criteria.whse,
            prod: self.lineSeq.prod,
            type: 'oeers',
            orderno: self.selectedLineItem.orderno,
            ordersuf: self.selectedLineItem.ordersuf,
            lineno: self.selectedLineItem.lineno,
            linenochar: self.selectedLineItem.lineno.toString(),
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: false,
            origqty: self.lineSeq.selqtyreq,
            proofqty: self.lineSeq.selqtyreq,
            ordqty: self.lineSeq.selqtyord,
            outqty: self.lineSeq.selqtyreq,
            ictype: 'so',
            method: '',
            custno: base.criteria.custno,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: 'oeers',
            assignoldest: 'y',
            currproc: 'oeers',
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            prodnotesfl: ''
         };
         return criteria;
      };
      self.lotControlReady = function () {
         // format and add nesseccary criteria to object
         self.icEntryLotsCriteria = self.createIcEntryLotsCriteria();
         // Call initialize method on the Shared-Lots-Ctrl
         self.lotsControl.initialize(self.icEntryLotsCriteria);
      };
      self.lotDoneCallback = function (icentrylotslist) {
         var oeersDetailLineLotFinishRequest = {
            icentrylotslist: icentrylotslist,
            oeersdetaillinesnlot: base.oeersdetaillinesnlot,
            icentrylotscriteria: self.icEntryLotsCriteria,
            oeersdetaillinelineseq: self.lineSeq,
            oeersdetaillineoeers: self.selectedLineItem,
            iLineNo: self.selectedLineItem.lineno,
            iSeqNo: self.lineSeq.seqno
         };
         DataService.post('api/oe/asoeentry/oeersdetaillinelotfinish', { data: oeersDetailLineLotFinishRequest, busy: true }, function (data) {
            if (data) {
               base.oeersdetaillinesnlot = data.oeersdetaillinesnlot;
               var detaillinelineoeersIndex = base.datasetdetails.findIndex(function (item) {
                  return item.orderno === data.oeersdetaillineoeers.orderno &&
                     item.ordersuf === data.oeersdetaillineoeers.ordersuf &&
                     item.lineno === data.oeersdetaillineoeers.lineno;
               });
               base.datasetdetails[detaillinelineoeersIndex] = data.oeersdetaillineoeers;
               var detaillinelineseqIndex = base.oeersdetaillinelineseq.findIndex(function (item) {
                  return item.seqno === data.oeersdetaillinelineseq.seqno;
               });
               base.oeersdetaillinelineseq[detaillinelineseqIndex] = data.oeersdetaillinelineseq;
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               base.isSaveSeq = true;
            }
         });
      };
   }
});

