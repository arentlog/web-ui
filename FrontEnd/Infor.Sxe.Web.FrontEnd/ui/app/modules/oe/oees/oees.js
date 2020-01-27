'use strict';

app.config(function ($stateProvider, StateProvider, KitStateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('oe', 'oees', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oees');
   BinAllocationStateProvider.addStates('oe', 'oees', 'oees.detail');
   $stateProvider.state('oees.email', {
      url: '/email',
      params: { orderno: null, ordersuf: null, parent: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/ship-notifications-email.json');
            },
            controller: 'OeesEmailShipmentNotificationsCtrl as shipnot'
         }
      }
   });
   $stateProvider.state('oees.email.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/email-create.json');
            },
            controller: 'OeesEmailShipmentNotificationsCreateCtrl as emcreate'
         }
      }
   });
   $stateProvider.state('oees.detail', {
      url: '/detail?id&orderno&ordersuf',
      params: {
         record: null,
         lineDetail: null,
         module: null,
         orderno: null,
         ordersuf: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/detail.json');
            },
            controller: 'OeesDetailCtrl as dtl'
         }
      }
   });
   $stateProvider.state('oees.print', {
      url: '/print',
      params: { orderno: null, ordersuf: null, backCallback: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/shared/document-print/document-print.json');
            },
            controller: 'OeDocumentPrintCtrl as oedp'
         }
      }
   });
   $stateProvider.state('oees.quickship', {
      url: '/quick-ship',
      params: { oeesRecord: null, order: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/quickship-view.json');
            },
            controller: 'OeesQuickshipCtrl as qck'
         }
      }
   });
   $stateProvider.state('oees.quickship.orderStatus', {
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
   $stateProvider.state('oees.master.orderStatus', {
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
   $stateProvider.state('oees.addon', {
      url: '/addon',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/newaddon.json');
            },
            controller: 'OeesNewAddonCtrl as addn'
         }
      }

   });
   $stateProvider.state('oees.detail.lineitemrowdetails', {
      url: '/line-item-detail',
      params: { lineItem: null },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/lineitemsdetail-view.json');
            },
            controller: 'OeesLineItemRowDetailsCtrl as olrc'
         }
      }
   });
   // Line Entry - Kit state
   $stateProvider.state('oees.lineitemrowdetailskit', {
      url: '/line-item-detail-kit',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/lineitemsdetail-kit.json');
            }
         }
      }
   });

   // Line Entry - Kit sub-states
   KitStateProvider.addStates('oe', 'oees', 'oees.lineitemrowdetailskit');

   $stateProvider.state('oees.shippinglabelprint', {
      url: '/shipping-label-print',
      params: { shippinglabelprintlist: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oees/shippinglabelprinter-view.json');
            },
            controller: 'OeesShippingLabelPrintCtrl as oslp'
         }
      }

   });
});

app.controller('OeesBaseCtrl', function ($state, AodataService, ConfigService, GridService, MessageService, DataService, Sasoo, TabService, SecurityService) {
   var self = this;
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
   self.isLSPMexicoOn = AodataService.getValue("Locally", "LocallyMexicoFl").toLowerCase() === 'yes';
   if (Sasoo.homewhsefl) {
      self.criteria.whse = Sasoo.whse;
   }
   self.geocodecriteria = {};
   self.oeesSelectedRecord = {};
   self.isUnShipAuthNeeded = false;
   self.isCashSaleAuthNeeded = false;
   self.isWLAuthNeeded = false;
   self.isESBWLNeeded = false;
   self.oeAddonList = {};
   self.isSerial = false;
   self.islot = false;
   self.module = 'oees';
   self.iLaunchBtnGEOCode = false;
   self.shippinglabeltitle = '';
   self.shippinglabelsubtitle = '';
   self.lReqCountFl = false;
   self.lAdjustQtyOrd = false;
   self.isQckshiOpen = false;
   self.qckOrdernox = '0-00';
   self.journalNo = 0;
   self.securitySubLevelHeader = 0;
   self.securitySubLevelLines = 0;
   self.isDrillDownAllowed = false;
   self.MENU_FUNCTION_OEES = 'oees';
   self.SUBMENU_OEES_HEADER = 'Header';
   self.SUBMENU_OEES_LINES = 'Line Items';
   self.line = {};
   self.includesMaster = function () {
      return $state.includes('oees.master');
   };
   self.isDetail = function () {
      return $state.is('oees.detail');
   };
   self.includesDetail = function () {
      return $state.includes('oees.detail');
   };
   self.isMaster = function () {
      return ($state.is('oees.master') && !$state.is('oees.master.orderStatus'));
   };
   // Perform search and update data set for the grid
   // The 'isSoftUpdate' parameter allows for soft updates when the user comes out of the drilldown.
   self.search = function (isSoftUpdate) {
      var oeesloadorderlistcriteria = {
         custno: self.criteria.custno,
         whse: self.criteria.whse,
         types: self.criteria.types.join(),
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
         if (isSoftUpdate) {
            GridService.softUpdateDataset(self.grid, data.oeesloadorderlistresults, 'oeehrowid');
         } else {
            self.dataset = data.oeesloadorderlistresults;
            MessageService.processMessaging(data.messaging);
         }

         //User Hook (do not rename)
         if (self.oeesLoadOrderListContinue) {
            self.oeesLoadOrderListContinue(data);
         }
      });
   };

   self.getSecurity = function () {
      self.securityTopLevel = SecurityService.getSecurityLevel(self.MENU_FUNCTION_OEES);
      self.securitySubLevelHeader = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_OEES, self.SUBMENU_OEES_HEADER);
      self.securitySubLevelLines = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_OEES, self.SUBMENU_OEES_LINES);

      self.isDrillDownAllowed = self.securitySubLevelHeader > 1 || self.securitySubLevelLines > 1;
   };

   // Close oees record
   self.closeOees = function (isFromTabClose) {
      var oeesRecord = self.oeesSelectedRecord;
      var closeReq = {
         orderno: oeesRecord.orderno,
         ordersuf: oeesRecord.ordersuf,
         jrnlno: oeesRecord.jrnlno,
         totalship: null
      };

      DataService.post('api/oe/asoeentry/oeesdetailclose', { data: closeReq, busy: true }, function (messageData) {

         // Show the warning message
         if (messageData) {
            MessageService.info('global.information', messageData);
         }

         // Skip the next part if the tab is closing
         if (isFromTabClose) {
            return;
         }

         // Check if a journal was opened and store it off so it can be closed when OEES is closed.
         if (self.journalNo === 0) {
            var params = {
               orderno: oeesRecord.orderno,
               ordersuf: oeesRecord.ordersuf,
               fillmode: true,
               fldlist: ''
            };

            DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
               if (data) {
                  if (data.jrnlno3 !== data.jrnlno) {
                     self.journalNo = data.jrnlno3;
                  }

                  //Update the current order in the grid with updated stage so they see
                  //the latest without re-searching.
                  self.dataset.forEach(function (oeehRow, index) {
                     if (oeehRow.orderno === data.orderno && oeehRow.ordersuf === data.ordersuf) {
                        oeehRow.stagecd = data.stagecd;
                        self.grid.updateRow(index);
                     }
                  });
               }
            });
         }
      });
   };

   // Set up tab close listener (once on base ctrl so functions don't run multiple times like they were)
   TabService.onCloseTab('oees', function () {
      // If a journal was automatically opened then close when closing view
      if (self.journalNo) {
         DataService.get('api/gl/asglentry/glclosejournal/' + self.journalNo, { busy: false }, function () {
            MessageService.info('global.journal.closed', self.journalNo);
         });
      }

      // If drilled into a record, then make sure to close the oees record
      if (self.oeesSelectedRecord && self.oeesSelectedRecord.orderno) {
         self.closeOees(true);
      }
   });

   self.getSecurity();
});

app.controller('OeesSearchCtrl', function ($scope, $state, DataService, Utils, ConfigService, Sasoo) {
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
         $state.go('oees.master');
      }
      base.search();
   };
});

app.controller('OeesMasterCtrl', function ($scope, $state, DataService, CenPosService, GridService, $stateParams, MessageService, AuthService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   self.isShowdetailType = 'false';
   base.qckOrdernox = '0-00';
   base.oeesSelectedRecord = {};
   var oeesdetailhdrloadcriteria = {};
   self.fldlist = '';
   self.record = {};
   self.oeeh = {};
   self.selectedRow = {};
   self.isMaster = function () {
      return ($state.is('oees.master') && !$state.is('oees.master.orderStatus'));
   };
   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
   self.loadDefaultUpdate = function () {
      var sharedPVRegisteryList = [];
      sharedPVRegisteryList.push({ pvfunction: 'oe', pvsection: 'oees', pvsubsection: '', pvobject: '', pvkeyname: 'updatetype' });
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
               self.isShowdetailType = (sharedResult.pvcharvalue === 'hdr-error') ? 'true' : 'false';
               base.defaultTab = (self.isShowdetailType === 'true') ? 0 : 1;
            }
         }
      });
   };

   self.detailHeaderLoad = function () {
      self.setOeesdetailhdrloadcriteria();
      DataService.post('api/oe/asoeentry/oeesdetailhdrload', { data: oeesdetailhdrloadcriteria, busy: true }, function (data) {
         base.datasetDetail = data;
         if (base.datasetDetail.oeesdetailhdrsingle.servicekey) {
            AuthService.createAuthPoint('oeet', 'banner', 'orderno', 'c', 'SM', null, function () {
               $state.go('^.detail', {});
            });
         }
         else {
            $state.go('^.detail', {});
         }

      });
   };

   self.loadOrder = function() {
      if (self.selectedRow) {

         var params = {
            orderno: self.selectedRow.orderno,
            ordersuf: Utils.pad(self.selectedRow.ordersuf, 2),
            fillmode: true,
            fldlist: ''
         };
         DataService.get('api/oe/oeeh/getbypk',{ params: params, busy: true }, function(data) {
               if (data) {
                  base.oeesSelectedRecord = data;
                  self.detailHeaderLoad();
               }
            });
      }
   };

   self.drilldown = function(e, args) {
      self.selectedRow = args[0].item;
      base.isQckshiOpen = false;
      if (self.selectedRow) {
         self.loadOrder();
      }
   };

   self.rowSelected = function () {
      var record = GridService.getSelectedRecord(base.grid);
      base.issigrowview = false;
      if (record) {
         var params = {
            whse: record.whse,
            fillmode: true,
            fldlist: 'cenpossigfl'
         };
         DataService.get('api/ic/icsd/getbypk', { params: params, busy: true }, function (data) {
            if (data && data.cenpossigfl) {
               base.issigrowview = true;
            } else {
               // already false
            }
         });
      }
   };

   self.setOeesdetailhdrloadcriteria = function () {
      if (base.oeesSelectedRecord) {
         oeesdetailhdrloadcriteria = {
            orderno: base.oeesSelectedRecord.orderno,
            ordersuf: base.oeesSelectedRecord.ordersuf,
            jrnlno: base.oeesSelectedRecord.jrnlno,
            userfield: base.oeesSelectedRecord.userfield
         };
      }
   };

   self.loadDefaultUpdate();

   //Route Cell Edit
   self.updateOeeh = function () {
      DataService.update('api/oe/oeeh', { data: self.oeeh }, function () {
         //Nothing to Refresh
      });
   };

   self.onRowupdate = function () {
      if (self.record) {
         var inputparams = {
            orderno: self.record.orderno,
            ordersuf: self.record.ordersuf,
            fillmode: true,
            fldlist: self.fldlist
         };

         DataService.get('api/oe/oeeh/getbypk', { params: inputparams, busy: true }, function (data) {
            self.oeeh = data;
           self.oeeh.route = self.record.route ? self.record.route : '';
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

   // Print
   self.print = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      var orderno = 0;
      var ordersuf = 0;
      if (selectedRecords) {
         var record = JSLINQ(selectedRecords).FirstOrDefault();
         orderno = record.orderno;
         ordersuf = record.ordersuf;
      }
      $state.go('^.print', { orderno: orderno, ordersuf: ordersuf, backCallback: self.printBackCallback });
   };
   self.printBackCallback = function () {
      $state.go('oees.master');
   };

   // Ship/Unship
   self.shipunshipProcess = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      var printinfolist = [];
      if (selectedRecord) {
         var inputParams = {
            iOrderNo: selectedRecord.orderno,
            iOrderSuf: selectedRecord.ordersuf
         };
         printinfolist.push(inputParams);
         DataService.get('api/oe/asoeentry/oeesshipunshiporder/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {

            //User Hook (do not rename)
            if (self.afterShipUnship) {
               //NOTE: The spot this hook is placed, asynchronous processing will occur below here.
               //Just be aware if you use this hook.
               self.afterShipUnship(data);
            }

            if (data.lIBRSFlag) {
               $state.go('oees.shippinglabelprint', { shippinglabelprintlist: printinfolist });
            }
            else if (data.messaging) {
               if (data.messaging[0].messagetype === 'm') {
                  MessageService.info('global.information', data.messaging[0].messagetxt);
               }
               else {
                  MessageService.errorMessages(data.messaging);
               }
            }

            //Update the current order in the grid with updated stage so they see
            //the latest without re-searching.
            base.dataset.forEach(function (oeehRow, index) {
               if (oeehRow.orderno === selectedRecord.orderno && oeehRow.ordersuf === selectedRecord.ordersuf) {
                  oeehRow.stagecd = data.iStageCd;
                  base.grid.updateRow(index);
               }
            });

         }, function errorCallback() {
            //Do Nothing for single order.  Leave the user in this same page.
            //For Multiple Row processing however, we do want to refresh the entire grid since some
            //rows might have been refreshed.
            //base.search(); //Do not re-establish this base.search();
         });
      }
   };
   self.multipleshipunshipProcess = function () {
      var oeesshipordermultiple = [];
      var printshippinglabelinfolist = [];
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      selectedRecords.forEach(function (record) {
         var oeesshiporder = {
            orderno: record.orderno,
            ordersuf: record.ordersuf
         };
         oeesshipordermultiple.push(oeesshiporder);
         var shippinglabelinfo = {
            orderno: record.orderno,
            ordersuf: record.ordersuf,
            isCartonlabel: false
         };
         printshippinglabelinfolist.push(shippinglabelinfo);
      });
      DataService.post('api/oe/asoeentry/oeesshipordermultiple', { data: oeesshipordermultiple, busy: true }, function (data) {
         if (data) {
            var successMsgs = [];
            if (data.messaging) {
               data.messaging.forEach(function (mess) {
                  if (mess.messagetype === 'e' && mess.messagetxt) {
                     MessageService.okCancel('global.error', mess.messagetxt, function () {
                        if (data.lIBRSFl) {
                           $state.go('oees.shippinglabelprint', { shippinglabelprintlist: printshippinglabelinfolist });
                        }
                     }, function () {
                     });
                  }
                  else if (mess.messagetype === 'm') {
                     successMsgs.push(mess);
                  }
               });
            }

            //Update the current orders in the grid with updated stages so they see
            //the latest without re-searching.
            base.dataset.forEach(function (oeehRow, index) {
               data.oeesshipordermultiple.forEach(function (updatedRow) {
                  if (oeehRow.orderno === updatedRow.orderno && oeehRow.ordersuf === updatedRow.ordersuf) {
                     oeehRow.stagecd = updatedRow.stagecd;
                     base.grid.updateRow(index);
                  }
               });
            });

            if (data.lIBRSFl) {
               $state.go('oees.shippinglabelprint', { shippinglabelprintlist: printshippinglabelinfolist });
            }
            if (successMsgs && successMsgs.length > 0) {
               MessageService.processMessaging(successMsgs);
            }
         }
      }, function errorCallback() {
         //For Multiple Row processing, we do want to refresh the entire grid since some
         //rows might have been refreshed.  Since it was a hard error throw from the backend
         //call, we do not have access to 'data' and what was updated and what wasn't.
         MessageService.info('global.information', 'message.since.an.error.was.encountered.oe.refresh.grid');
         base.search();
      });
   };
   self.shipunship = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      if (selectedRecords) {
         base.isUnShipAuthNeeded = false;
         base.isCashSaleAuthNeeded = false;
         base.isWLAuthNeeded = false;
         base.isESBWLNeeded = false;
         base.pvIssignaturerequired = false;

         if (selectedRecords.length === 1) {
            var params = {
               pvOrderno: selectedRecords[0].orderno,
               pvOrdersuf: selectedRecords[0].ordersuf
            };
            DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
               if (data) {
                  self.authPointsRunning = 0;
                  if (selectedRecords[0].stagecd === 3 && data.pvPackagesexist) {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('oees', 'banner', '', '', '', null,
                        function () {
                           self.shipunshipProcess();
                        }, null);
                  }
                  else if (!data.pvIsfullytendered && data.pvCustselltype === 'c' && selectedRecords[0].stagecd < 3) {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('oees', 'banner', 'ship', '', '', null,
                        function () {
                           self.shipunshipProcess();
                        }, null);
                  }
                  else if (data.pvWlauthtype.toLowerCase() === 'wlord') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('wlord', '', '', '', '', null,
                        function () {
                           self.shipunshipProcess();
                        }, null);
                  }
                  else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('esbwl', '', '', '', '', null, function () {
                        self.shipunshipProcess();
                     }, null);
                  }
                  else if (data.pvIssignaturerequired) {
                     MessageService.yesNo('global.confirm', 'question.do.you.want.to.skip.required-signature', function () {
                        //yes callback
                        self.authPointsRunning++;
                        AuthService.createAuthPoint('oeet', 'finish', 'signature', '', '', null, function () {
                           self.shipunshipProcess();
                        }, null);
                     }, function () {
                           //no callback, do not finish order
                           return;
                        });
                  }
                  else {
                        self.shipunshipProcess();
                     }
               }
            });
         }
         else if (selectedRecords.length > 1) {
            self.authPointsRunning = 0;
            self.multiAuthCheck(0);
         }
      }
      else {
         MessageService.info('global.information', 'message.please.select.a.record.to.proceed.further');
      }
   };

   self.multiAuthCheck = function (start) {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      var i = start;
      var record = selectedRecords[i];
      var index = base.dataset.indexOf(record);
      var params = {
         pvOrderno: record.orderno,
         pvOrdersuf: record.ordersuf
      };
      DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
         if (data) {
            if (record.packagesexist && record.stagecd === 3) {
               base.isUnShipAuthNeeded = true;
            } else if (record.stagecd < 3 && !data.pvIsfullytendered && data.pvCustselltype === 'c') {
               base.isCashSaleAuthNeeded = true;
            } else if (data.pvWlauthtype.toLowerCase() === 'wlord') {
               base.isWLAuthNeeded = true;
            } else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
               base.isESBWLNeeded = true;
            } else if (data.pvIssignaturerequired) {
               MessageService.info('global.information', 'global.signature.required' + ' ' + record.orderno + '-' + Utils.pad(record.ordersuf, 2));
               base.grid.unselectRow(index);
               i--;
            }
            selectedRecords = GridService.getSelectedRecords(base.grid);
            if (i === selectedRecords.length - 1) {
               self.afterMultiCheck();
            } else {
               i++;
               self.multiAuthCheck(i);
            }
         }
      });
   };


   self.afterMultiCheck = function () {
      if (base.isUnShipAuthNeeded) {
         self.authPointsRunning++;
         AuthService.createAuthPoint('oees', 'banner', '', '', '', null, function () {
            self.multipleshipunshipProcess();
         }, null);
      }
      else if (base.isCashSaleAuthNeeded) {
         self.authPointsRunning++;
         AuthService.createAuthPoint('oees', 'banner', 'ship', '', '', null, function () {
            self.multipleshipunshipProcess();
         }, null);
      }
      else if (base.isWLAuthNeeded) {
         self.authPointsRunning++;
         AuthService.createAuthPoint('wlord', '', '', '', '', null, function () {
            self.multipleshipunshipProcess();
         }, null);
      }
      else if (base.isESBWLNeeded) {
         self.authPointsRunning++;
         AuthService.createAuthPoint('esbwl', '', '', '', '', null, function () {
            self.multipleshipunshipProcess();
         }, null);
      } else {
         self.multipleshipunshipProcess();
      }
   };


   // Reserve
   self.reserve = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord) {
         var inputParams = {
            iOrderNo: selectedRecord.orderno,
            iOrderSuf: selectedRecord.ordersuf
         };

         if (selectedRecord.servicekey) {
            self.authPointsRunning++;
            AuthService.createAuthPoint('oeet', 'banner', 'orderno', 'c', 'SM', null, function () {
               DataService.get('api/oe/asoeentry/oeesreserveorder/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {
                  if (data.messaging) {
                     data.messaging += '\r\n';
                     MessageService.errorMessages(data.messaging);
                  }
               }, null);
            });
         } else {
            DataService.get('api/oe/asoeentry/oeesreserveorder/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {
               if (data.messaging) {
                  data.messaging += '\r\n';
                  MessageService.errorMessages(data.messaging);
               }
            });
         }
      }
      else {
         MessageService.info('global.information', 'message.please.select.a.record.to.proceed.further');
      }
   };

   // Detail
   self.detail = function () {
      self.selectedRow = GridService.getSelectedRecord(base.grid);
      base.isQckshiOpen = false;
      if (self.selectedRow) {
         self.loadOrder();
      }
   };

   // Split To Back Order
   // This needs to be defined BEFORE it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         self.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'authPointPassed') {
         MessageService.alert($translate.instant('wl.order.in.process'), $translate.instant('message.you.have.authorization.to.make.changes.that.may.not.get.updated.in.wl'));
      }
      if (parameters.stage && parameters.stage === 'finish') {
         self.splitProcessingContinued();
      }
   };

   self.splitProcessing = function () {
      self.wlstatus = {};
      base.oeesSelectedRecord = GridService.getSelectedRecord(base.grid);
      if (base.oeesSelectedRecord) {
         self.setOeesdetailhdrloadcriteria();
         var inputParams = {
            iOrderNo: base.oeesSelectedRecord.orderno,
            iOrderSuf: base.oeesSelectedRecord.ordersuf
         };
         DataService.get('api/oe/asoeentry/oeessplittobackordercheck/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {
            if (data.wlstatus && data.wlstatus.wlwhsefl) {
               self.wlstatus = data.wlstatus;
               $state.go('oees.master.orderStatus', { whseLogStatus: self.wlstatus, menuFunction: 'oees', setWhseLogStatusCallback: self.setWhseLogStatusCallback });
            }else {
               if (data.lSplitOK) {
                  self.splitProcessingContinued();
               }else {
                  if (data.messaging && data.messaging.length > 0) {
                     MessageService.processMessaging(data.messaging);
                  }
               }
            } 
         });
      }
   };
   self.splitProcessingContinued = function () {
      DataService.post('api/oe/asoeentry/oeesdetailhdrload', { data: oeesdetailhdrloadcriteria, busy: true }, function (data) {
         base.datasetDetail = data;
         $state.go('oeers.detail', {
            oeersRecord: base.oeesSelectedRecord,
            oeesdetailhdr: base.datasetDetail.oeesdetailhdrsingle,
            oeaddons: base.datasetDetail.oeaddons,
            module: base.module,
            isQckshipOpen: true
         });
      });
   };
   self.splitToBackOrder = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord) {
         if (selectedRecord.stagecd > 1) {
            var params = {
               pvOrderno: selectedRecord.orderno,
               pvOrdersuf: selectedRecord.ordersuf
            };
            DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
               if (data) {
                  self.authPointsRunning = 0;
                  if (data.pvWlauthtype.toLowerCase() === 'wlord') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('wlord', '', '', '', '', null,
                        function () {
                           self.splitProcessing();
                        }, null);
                  } else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('esbwl', '', '', '', '', null,
                                          function () {
                                             self.splitProcessing();
                                          }, null);
                  } else if (selectedRecord.servicekey) {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('oeet', 'banner', 'orderno', 'c', 'SM', null,
                                          function () {
                                             self.splitProcessing();
                                          }, null);
                  } else {
                     self.splitProcessing();
                  }
               }
            });
         } else {
            self.splitProcessing();
         }
      }
   };

   // Signature
   self.signature = function () {
      if (!self.completePaymentTypeList) {
         DataService.post('api/sa/sastn/getsastnlist', { data: { codeiden: 'p', fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,descrip,ccaddon,processor' }, busy: true }, function (data) {
            if (data) {
               self.completePaymentTypeList = data;
            }
            base.oeesSelectedRecord = GridService.getSelectedRecord(base.grid);
            if (base.oeesSelectedRecord) {
               self.signatureProcessor();
            }
         });
      }

   };

   self.signatureProcessor = function (iLoop) {
      if (!base.icsd || (base.icsd && self.oeeh.whse && base.icsd.whse !== self.oeeh.whse)) {
         DataService.get('api/ic/icsd/getbypk', { params: { whse: base.oeesSelectedRecord.whse } }, function (data) {
            if (data) {
               base.icsd = data;
               self.signatureProcessor();
            }
         });
         return;
      }

      if (!base.icsd.cenpossigfl) {
         // No signature in OEES for Topaz devices
      } else {
         if (!iLoop) {
            iLoop = 0;
         }

         var currentPaymentType = self.completePaymentTypeList[iLoop];
         if (currentPaymentType.processor && currentPaymentType.processor !== "0") {
            DataService.getResource('api/sa/assasetup/sastpretrieve/' + currentPaymentType.processor, { method: 'GET', busy: true }, function (data) {
               if (data.callingURLH5) {
                  self.signaturePopup(currentPaymentType.codeval);
               } else {
                  iLoop++;
                  self.signatureProcessor(iLoop);
               }
            });
         } else {
            iLoop++;
            self.signatureProcessor(iLoop);
         }
      }
   };

   self.signaturePopup = function (SigMediaCd) {
      CenPosService.showModal({
         type: 'signature',
         mediacd: SigMediaCd,
         invoiceno: base.oeesSelectedRecord.orderno + '-' + Utils.pad(base.oeesSelectedRecord.ordersuf, 2),
         successCallback: self.saveImage
      });
   };

   self.saveImage = function () {
      var pvImages = {
         cono: UserService.getCono(),
         keytype: 'oedlv',
         keyvalue1: base.oeesSelectedRecord.custno,
         keyvalue2: base.oeesSelectedRecord.orderno + '-' + Utils.pad(base.oeesSelectedRecord.ordersuf, 2),
         chunk: 1,
         descrip: 'Signature: ' + base.oeesSelectedRecord.custno,
         image64: 'cctrans',
         currproc: 'oeet',
         operinit: UserService.getUserName()
      };

      DataService.post('api/oe/asoeentry/oesignaturesave', { data: pvImages, busy: true }, function () {
         MessageService.info('global.information', 'global.signature.saved.successfully');
         if (self.navBackState) {
            $state.go(self.navBackState);
         } else {
            // no change
         }
      });
   };

   // Shipment Notification
   self.shipmentNotification = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord) {
         var params = {
            pvOrderno: selectedRecord.orderno,
            pvOrdersuf: selectedRecord.ordersuf
         };
         DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
            if (data) {
               if (base.criteria && base.criteria.stage < 3 && !data.pvIsfullytendered && data.pvCustselltype === 'c') {
                  base.isCashSaleAuthNeeded = true;
               }
               if (data.pvWlauthtype.toLowerCase() === 'wlord') {
                  base.isWLAuthNeeded = true;
               } else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
                  base.isESBWLNeeded = true;
               }
            }
         });
         $state.go('^.email', { orderno: selectedRecord.orderno, ordersuf: selectedRecord.ordersuf, parent: $state.current.name });
      } else {
         MessageService.error('global.error', 'message.please.select.a.record.to.proceed.further');
      }
   };

   //QuickShip
   self.quickship = function () {
      $state.go('oees.quickship');
   };

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

   //ARIC Hyperlink for Ship To
   self.customerInquiryWithShipToHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
      }
   };
});

app.controller('OeesEmailShipmentNotificationsCtrl', function ($state, $scope, $stateParams, DataService) { //as shipnot
   var self = this;
   var parent = $stateParams.parent;

   if ($stateParams.orderno === null || $stateParams.ordersuf === null) {
      //error, missing data...not passed
      $state.go(parent, {});
   }

   var order = {
      orderno: $stateParams.orderno,
      ordersuf: $stateParams.ordersuf
   };

   self.load = function () {
      DataService.post('api/oe/asoeentry/emaillistforshipnotice', { data: order, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.load();

   self.cancel = function () {
      $state.go(parent, { order: order.orderno + '-' + order.ordersuf });
   };

   self.newButton = function () {
      self.create = true;
      self.email = {
         firstnm: null,
         lastnm: null,
         email: null,
         conatactid: 0,
         lselect: true
      };
      $state.go('.create', {});
   };

   self.submit = function () {
      DataService.post('api/oe/asoeentry/emaillistforshipnotificationsupdate', { data: { emailforshipnoticeresults: self.dataset, emailforshipnoticecriteria: order }, busy: true }, function () {
         $state.go(parent, { order: order.orderno + '-' + order.ordersuf });
      });
   };
});

app.controller('OeesEmailShipmentNotificationsCreateCtrl', function ($state, $scope) { //as emcreate
   var self = this;
   var shipnot = $scope.shipnot;

   self.cancel = function () {
      shipnot.create = false;
      $state.go('^');
   };

   self.submit = function () {
      shipnot.dataset.push(shipnot.email);
      shipnot.create = false;
      $state.go('^');
   };
});

app.controller('OeesDetailCtrl', function ($filter, $state, $scope, $stateParams, DataService, GridService, MessageService, AuthService, Utils, TabService) {
   var self = this;
   var base = $scope.base;
   self.fldlist = '';
   self.record = {};
   self.lineItemRecord = {};
   if ($stateParams.orderno) {
      base.oeesSelectedRecord.orderno = $stateParams.orderno;
      base.oeesSelectedRecord.ordersuf = Utils.pad($stateParams.ordersuf, 2);
   }
   self.iSelectNextRow = false;
   self.iSelectPrevRow = false;
   self.iselectNextLine = false;
   self.isDatCVisible = false;
   self.isflDatCEnable = false;
   self.isBillToReadonly = true;
   self.isForceGEO = false;
   self.addon = {};
   self.billDirectAddon = {};
   self.frtShopSingle = {};
   self.frtWhse = {};
   self.frtCustomer = {};
   self.frtOrder = {};
   self.selectedAddon = {};
   self.isDetailHeaderTabVisible = base.securitySubLevelHeader > 1 ? true : false;
   self.isDetailLinesTabVisible = base.securitySubLevelLines > 1 ? true : false;
   self.isWarehouseManagerEnable = false;
   var wmbinassignCriteria = {};
   var wmbinAssignment = {};
   //MODULE : OEIX
   if ($stateParams.module === 'oeix') {
      base.module = 'oeix';
      self.record = base.oeesSelectedRecord = $stateParams.record;
      self.oees = $stateParams.lineDetail.oeesdetailhdrsingle;
      self.addon = $stateParams.lineDetail.oeaddons;
      base.datasetDetail = $stateParams.lineDetail;
   } else {
      self.record = base.oeesSelectedRecord;
   }
   self.selectedoeesLines = {};
   if (!$stateParams.orderno && !$stateParams.ordersuf) {
      self.oees = base.datasetDetail.oeesdetailhdrsingle;
      self.addon = base.datasetDetail.oeaddons;
   }
   self.oeesDetailLineSingle = {};

   if (!self.record.ordernox) {
      self.record.ordernox = self.record.orderno + '-' + Utils.pad(self.record.ordersuf, 2);
   }
   self.qtysettozeroEnable = function () {
      if (self.selectedoeesLines && self.selectedoeesLines.items && self.selectedoeesLines.items.length > 0) {
         return true;
      }
      else {
         return false;
      }
   };

   self.isHeaderTabReadonly = base.securitySubLevelHeader < 3;
   self.isLinesTabReadonly = base.securitySubLevelLines < 3;

   self.lineItemSelected = function () {
      var selectedLineItems = GridService.getSelectedRecords(self.grid);
      if (selectedLineItems) {
         self.selectedoeesLines = JSLINQ(selectedLineItems).Where(function (item) { return item.rowenabled && item.setqtyshiptozeroenabled; });
         if (self.selectedoeesLines) {
            self.qtysettozeroEnable();
         }
         if (selectedLineItems.length === 1) {
            self.lineItemRecord = selectedLineItems[0];
            self.isWarehouseManagerEnable = self.lineItemRecord.wmvisiblefl;
         }
      }

   };
   self.setGeoCodeLookupCriteria = function () {
      return {
         tablename: 'oeeh',
         orderno: self.oees.orderno,
         ordersuf: self.oees.ordersuf,
         city: self.oees.shiptocity,
         state: self.oees.shiptostate,
         zipcd: self.oees.shiptozip,
         country: self.oees.countrycd,
         geocd: self.oees.geocode,
         streetaddr: self.oees.shiptoaddress1,
         outofcityfl: self.oees.outofcityfl
      };
   };
   self.setDatcFieldDisplay = function () {
      if (self.oees.totdatccost !== 0 && self.oees.icdatclabel) {
         self.isDatCVisible = true;
         if (!self.oees.pmshipfl || !self.oees.pmcodfl) {
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
      var inputParams = {
         iOrderNo: self.record.orderno,
         iOrderSuf: self.record.ordersuf
      };
      DataService.get('api/oe/asoeheader/loadoeaddonlist/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {
         base.oeAddonList = data;
      });
   };
   self.setFreightRateShopInput = function () {
      if (self.record) {
         self.frtDataset = null;
         var inputParams = {
            iOrderNo: self.record.orderno,
            iOrderSuf: self.record.ordersuf,
            cOurProc: 'oees',
            cUserField: self.record.UserField
         };
         DataService.get('api/oe/asoeentry/frtrateshopload/{iOrderNo}/{iOrderSuf}/{cOurProc}/{cUserField}', { pathParams: inputParams, busy: true }, function (data) {
            self.frtShopSingle = data.frtrateshoploadsingle;
            // Sort results by ship freight
            self.frtDataset = $filter('orderBy')(data.frtrateshoploadlist, 'shipfrt');
            if (self.frtShopSingle) {
               self.frtWhse = self.frtShopSingle.whse + '-' + self.frtShopSingle.whsedesc;
               self.frtCustomer = self.frtShopSingle.custno + '-' + self.frtShopSingle.custname;
               self.frtOrder = self.frtShopSingle.orderno + '-' + Utils.pad(self.frtShopSingle.ordersuf, 2);
            }
         });
      }
   };
   self.oeesDatac = function () {
      self.oees.datc = self.oees.totdatccost;
   };
   self.oeesUpdate = function () {
      self.oees.route = self.oees.route ? self.oees.route : '';
      var updateOEESRequest = { oeaddons: self.addon, oeesdetailhdrsingle: self.oees };
      DataService.post('api/oe/asoeentry/oeesdetailhdrupdt', { data: updateOEESRequest, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length) {
               MessageService.errorMessages(data.messaging);
            } else {
               self.oees = base.datasetDetail.oeesdetailhdrsingle = data.oeesdetailhdrsingle;
               self.addon = base.datasetDetail.oeaddons = data.oeaddons;
               base.iLaunchBtnGEOCode = data.lLaunchBtnGeoCode;
               self.setGeoCodeLookupCriteria();
               self.setDatcFieldDisplay();
               self.loadOEAddons();
               self.setFreightRateShopInput();

               //User Hook (do not rename)
               if (self.getOeesContinue) {
                  self.getOeesContinue(data);
               }

               if (!base.isQckshiOpen) {
                  base.closeOees();
                  base.search(true);
                  $state.go('^.master');
               }
            }
         }
      });
   };
   if (self.oees) {
      self.setGeoCodeLookupCriteria();
      self.setDatcFieldDisplay();
      self.loadOEAddons();
      self.setFreightRateShopInput();
   }
   if (self.record) {
      var params = {
         orderno: self.record.orderno,
         ordersuf: self.record.ordersuf,
         fillmode: true,
         fldlist: self.fldlist
      };

      //Load Bill Direct Addon
      DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
         self.billDirectAddon = data.billdirectaddon;
         self.codCollAmt = data.codcollamt;
         self.whse = data.whse;

         //User Hook (do not rename)
         if (self.getOeehContinue) {
            self.getOeehContinue(data);
         }
      });
   }
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
         var index = base.datasetDetail.oeaddons.indexOf(self.selectedAddon);
         if (index !== -1) {
            if (index <= 3) { // if it's one of the first four, just reset it because there's always 4 addons
               base.datasetDetail.oeaddons[index].addonno = 0;
               base.datasetDetail.oeaddons[index].addonamt = 0;
               base.datasetDetail.oeaddons[index].addondesc = '';
               base.datasetDetail.oeaddons[index].addonnet = 0;
            } else { //remove it from the collection
               base.datasetDetail.oeaddons.splice(index, 1);
            }

            self.addonsGrid.loadData(base.datasetDetail.oeaddons);
         }
      }
   };

   //Button Update

   self.update = function () {
      if (!self.oees.shiptoname) {
         MessageService.error('global.validation.error', 'error.ship.to.name.this.is.a.required.field.2100.');
      }
      //*Validate GeoCode is pending which will generate the result for isForceGEO flag

      if (self.isForceGEO) {
         //Need to open geo popup
      } else {
         if (self.oees.datc !== self.oees.totdatccost) {
            AuthService.createAuthPoint('oees', 'header', 'surcharge', '', '', null,
            function () {
               self.oeesUpdate();
            },
            function () {
               self.oeesDatc();
            });
         } else {
            self.oeesUpdate();
         }
      }
   };
   //Button Recalculate in Total Section
   self.recalculate = function () {
      var requestParams = { oeaddons: base.datasetDetail.oeaddons, oeesdetailhdrsingle: base.datasetDetail.oeesdetailhdrsingle };
      if (requestParams) {
         DataService.post('api/oe/asoeentry/oeesdetailhdrrecalc', { data: requestParams, busy: true }, function (data) {
            self.oees = base.datasetDetail.oeesdetailhdrsingle = data.oeesdetailhdrsingle;
            self.addon = base.datasetDetail.oeaddons = data.oeaddons;
            base.iLaunchBtnGEOCode = data.lLaunchBtnGeoCode;
            MessageService.processMessaging(data.messaging);
            self.setGeoCodeLookupCriteria();
            self.setDatcFieldDisplay();
            self.loadOEAddons();
            self.setFreightRateShopInput();
         });
      }
   };

   self.setSelectedFrtDataset = function () {
      var record = GridService.getSelectedRecord(self.frtGrid);
      var changeAddonrequest = {};

      self.oees.shipvia = record.shipvia;

      if (record.shipfrt !== 0) {
         changeAddonrequest = {
            oeaddons: base.datasetDetail.oeaddons[1],
            iNewAddonNo: base.datasetDetail.oeaddons[1].addonno,
            dNewAddonAmt: record.shipfrt - record.shipfrtextra1 - record.shipfrtextra2,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            base.datasetDetail.oeaddons[1] = data;
         });
      }
      if (record.shipfrtextra1 !== 0) {
         changeAddonrequest = {
            oeaddons: base.datasetDetail.oeaddons[2],
            iNewAddonNo: base.datasetDetail.oeaddons[2].addonno,
            dNewAddonAmt: record.shipfrtextra1,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            base.datasetDetail.oeaddons[2] = data;
         });
      }
      if (record.shipfrtextra2 !== 0) {
         changeAddonrequest = {
            oeaddons: base.datasetDetail.oeaddons[3],
            iNewAddonNo: base.datasetDetail.oeaddons[3].addonno,
            dNewAddonAmt: record.shipfrtextra2,
            lNewAddonType: true
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {
            base.datasetDetail.oeaddons[3] = data;
         });
      }
   };

   //Button Freight Recalculate
   self.frtRecalculate = function () {
      if (self.frtShopSingle) {
         DataService.post('api/oe/asoeentry/frtrateshoprecalc', { data: self.frtShopSingle, busy: true }, function (data) {
            // Sort results by ship freight
            self.frtDataset = $filter('orderBy')(data, 'shipfrt');
         });
      }
   };
   //Load Line Items
   if (self.record) {
      var inputParams = {
         iOrderNo: self.record.orderno,
         iOrderSuf: self.record.ordersuf
      };
      DataService.get('api/oe/asoeentry/oeesdetaillineload/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {
         base.datasetdetails = data.oeesdetaillinelist;
         self.oeesDetailLineSingle = data.oeesdetaillinesingle;

         //User Hook (do not rename)
         if (self.oeesdetaillineloadContinue) {
            self.oeesdetaillineloadContinue();
         }
      });
   }
   self.lineitemdrilldown = function (e, args) {
      var lineItem = args[0].item;
      if (lineItem.kitfl) {
         base.selectedKitDetails = lineItem;
         $state.go('^.lineitemrowdetailskit');
      } else {
         $state.go('.lineitemrowdetails', {
            lineItem: lineItem
         });
      }
   };

   self.onLineItemRowupdate = function () {
      if (self.lineItemRecord) {
         self.oeesDetailLineSingle.custno = self.lineItemRecord.custno;
         self.oeesDetailLineSingle.lineno = self.lineItemRecord.lineno;
         self.oeesDetailLineSingle.shipto = self.lineItemRecord.shipto;
         self.oeesDetailLineSingle.whse = self.lineItemRecord.whse;
         self.lineRowUpdateRequest = {
            iLineNo: self.lineItemRecord.lineno,
            dNewQtyShipped: self.lineItemRecord.qtyship,
            lNewBOFl: self.lineItemRecord.bofl,
            lPromptsPresented: false,
            lReqCountFl: false,
            lAdjustQtyOrd: false,
            oeesdetaillinesingle: self.oeesDetailLineSingle,
            oeesdetaillinelist: base.datasetdetails
         };
         DataService.post('api/oe/asoeentry/oeesdetaillinerowupdate', { data: self.lineRowUpdateRequest, busy: true }, function (data) {

            if (data.messaging && data.messaging.length) {
               var isCountMsg = false;
               var reqCountMsg = JSLINQ(data.messaging).First(function (message) {      //ignore jslint - correct indentation
                  if (message.fieldlabel === 'reqcountfl') {
                     return message;
                  }
               });
               if (reqCountMsg) {
                  isCountMsg = true;
                  MessageService.yesNo('global.question', reqCountMsg.messagetxt,
                     function () {
                        // Yes processing
                        self.lineRowUpdateRequest.lReqCountFl = true;
                        self.checkAdjustQuantityOrder(data.messaging);
                     }, function () {
                        // No processing
                        self.lineRowUpdateRequest.lReqCountFl = false;
                        self.checkAdjustQuantityOrder(data.messaging);
                     });
               }
               if (!isCountMsg) {
                  self.checkAdjustQuantityOrder(data.messaging);
               }
            } else {
               self.iSelectNextRow = data.lSelectNextRow;
               self.iSelectPrevRow = data.lSelectPrevRow;
            }
         });
      }
   };

   self.checkAdjustQuantityOrder = function (messaging) {
      if (messaging && messaging.length) {
         var isAdjustMsg = false;
         var adjustQtyMsg = JSLINQ(messaging).First(function (message) {      //ignore jslint - correct indentation
            if (message.fieldlabel === 'adjustqtyord') {
               return message;
            }
         });
         if (adjustQtyMsg) {
            isAdjustMsg = true;
            MessageService.yesNo('global.question', adjustQtyMsg.messagetxt,
               function () {
                  // Yes processing
                  self.lineRowUpdateRequest.lAdjustQtyOrd = true;
                  self.finalDetailLineRowUpdate();
               }, function () {
                  // No processing
                  self.lineRowUpdateRequest.lAdjustQtyOrd = false;
                  self.finalDetailLineRowUpdate();
               });
         }
         if (!isAdjustMsg) {
            self.finalDetailLineRowUpdate();
         }
      }
   };

   self.finalDetailLineRowUpdate = function () {
      self.lineRowUpdateRequest.lPromptsPresented = true;
      DataService.post('api/oe/asoeentry/oeesdetaillinerowupdate', { data: self.lineRowUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (data.messaging && data.messaging.length) {
               MessageService.processMessaging(data.messaging);

               //User Hook (do not rename)
               if (self.oeesDtlLineRowUpdMsgContinue) {
                  self.oeesDtlLineRowUpdMsgContinue(data);
               }
            } else {
               self.iSelectNextRow = data.lSelectNextRow;
               self.iSelectPrevRow = data.lSelectPrevRow;

               //User Hook (do not rename)
               if (self.oeesDtlLineRowUpdNoMsgContinue) {
                  self.oeesDtlLineRowUpdNoMsgContinue(data);
               }
            }
         }
      });
   };

   self.lineGridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         if (args.column.field === 'qtyship') {
            var record = base.datasetdetails[args.row];
            record.stkqtyship = record.unitconv ? args.value * record.unitconv : args.value;
         }
         self.lineItemRecord = base.datasetdetails[args.row];
         self.onLineItemRowupdate();
      }
   };
   self.reReserve = function () {
      var selectedLineItems = GridService.getSelectedRecords(self.grid);
      if (selectedLineItems) {
         var request = {
            oeesdetaillinelist: selectedLineItems,
            oeesdetaillinesingle: self.oeesDetailLineSingle
         };
         DataService.post('api/oe/asoeentry/oeesdetaillinerereserve', { data: request, busy: true }, function (data) {
            base.datasetdetails = data;
         });
      }
   };
   self.qtyShiptoZeroCont = function (oeesline) {
      if (oeesline) {
         self.oeesDetailLineSingle.custno = oeesline.custno;
         self.oeesDetailLineSingle.lineno = oeesline.lineno;
         self.oeesDetailLineSingle.shipto = oeesline.shipto;
         self.oeesDetailLineSingle.whse = oeesline.whse;
         var request = {
            oeesdetaillinelist: oeesline,
            oeesdetaillinesingle: self.oeesDetailLineSingle
         };
         DataService.post('api/oe/asoeentry/oeesdetaillinesetqtyshiptozero', { data: request, busy: true }, function (data) {
            var updatelineIndex = base.datasetdetails.findIndex(function (item) {
               return item.lineno === data.oeesdetaillinelist.lineno;
            });
            base.datasetdetails[updatelineIndex] = data.oeesdetaillinelist;
            self.iselectNextLine = data.lSelectNextLine;
            if (data.cWarningMessage) {
               MessageService.info('global.warning', data.cWarningMessage);
            }
         });
      }
   };
   self.qtyShiptoZero = function () {
      var selectedLineItems = GridService.getSelectedRecords(self.grid);
      if (selectedLineItems && selectedLineItems.length > 0) {
         selectedLineItems.forEach(function (oeesline) {
            if (oeesline.rowenabled && oeesline.setqtyshiptozeroenabled) {
               self.qtyShiptoZeroCont(oeesline);
            }
         });
         self.selectedoeesLines = {};
         self.qtysettozeroEnable();
      }

   };
   self.serialLot = function () {
      var record = GridService.getSelectedRecord(self.wtLinesGrid);
      if (record) {
         if (record.serlottype.toUpperCase() === 'S') {
            $state.go('^.seriallot', {
               lineDetail: record
            });
         }
         else if (record.serlottype.toUpperCase() === 'L') {
            MessageService.info('Yet to Implement Lot Screen');
         }
      }
   };

   self.navbacktomaster = function () {
      base.closeOees();
      if (base.module === 'oees') {
         if (base.isQckshiOpen) {
            $state.go('oees.quickship');
         }
         else {
            base.search(true);
            $state.go('^.master');
         }
      }
      else if (base.module === 'oeix') {
         base.module = 'oees';
         TabService.closeTab('oees.master');
         $state.go('oeix.master', null, { reload: 'oeix.master' });
      }
   };

   // Set the editing condition per row
   self.isAllowEdit = function (row, cell, value, column, item) {
      return item.rowenabled;
   };

   //Warehouse Manager
   self.warehouseManager = function () {
      if (self.lineItemRecord) {
         base.line = self.lineItemRecord;
         wmbinassignCriteria = {
            altwhse: '',
            currproc: base.module,
            jrnlno: 0,
            kitfl: self.lineItemRecord.kitfl,
            lineno: self.lineItemRecord.lineno,
            ourproc: base.module,
            ordertype: 'o',
            orderno: self.lineItemRecord.orderno,
            ordersuf: self.lineItemRecord.ordersuf,
            potype: '',
            prod: self.lineItemRecord.shipprod,
            returnfl: self.lineItemRecord.returnfl,
            seqno: 0,
            skipnonkitlogic: false,
            stkqtyship: self.lineItemRecord.stkqtyship,
            stkqtyrcv: 0,
            unit: self.lineItemRecord.unit,
            vamodule: '',
            wmadjtype: 'sell',
            wmqtyrcv: 0,
            whse: self.lineItemRecord.whse
         };
      }
      $state.go('.bin-allocation', {
         criteria: wmbinassignCriteria,
         binallocationRowId: null,
         binAllocationDisabled: false,
         submittedCallback: 'dtl.binAllocationSavedCallback',
         actionsCallback: 'dtl.binAllocationActionsCallback'
      });
   };

   //Callbacks
   self.binAllocationSavedCallback = function (wmbinassignment) {
      self.lineItemRecord = base.line;
      wmbinassignCriteria.wmqtyrcv = wmbinassignment.wmqtyrcv;
      self.lineItemRecord.wmqtyship = wmbinassignment.wmqtyship;
      if (base.datasetdetails) {
         var updateindx = base.datasetdetails.findIndex(function (item) {
            return item.lineno === self.lineItemRecord.lineno;
         });
         base.datasetdetails[updateindx] = self.lineItemRecord;
      }
      self.onLineItemRowupdate();
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmbinassignment) {
      wmbinAssignment = wmbinassignment;
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
   };

});

app.controller('OeesQuickshipCtrl', function ($scope, $state, $stateParams, DataService, CenPosService, AuthService, MessageService, Utils, UserService) {
   var self = this;
   var base = $scope.base;
   self.oeeh = {};
   var oeesdetailhdrloadcriteria = {};
   self.isQuickShip = function () {
      return ($state.is('oees.quickship') && !$state.is('oees.quickship.orderStatus'));
   };
   self.setOeesdetailhdrloadcriteria = function () {
      if (base.oeesSelectedRecord) {
         oeesdetailhdrloadcriteria = {
            orderno: base.oeesSelectedRecord.orderno,
            ordersuf: base.oeesSelectedRecord.ordersuf,
            jrnlno: base.oeesSelectedRecord.jrnlno,
            userfield: base.oeesSelectedRecord.userfield
         };
      }
   };
   self.getOrderDetails = function () {
      self.issigview = false;
      if (self.qckOrder) {
         var arr = self.qckOrder.split('-');
         var params = {
            orderno: arr[0],
            ordersuf: arr[1],
            fillmode: true,
            fldlist: ''
         };
         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.oeeh = data;
               base.oeesSelectedRecord = self.oeeh;

               var params2 = {
                  whse: self.oeeh.whse,
                  fillmode: true,
                  fldlist: 'cenpossigfl'
               };
               DataService.get('api/ic/icsd/getbypk', { params: params2, busy: true }, function (data) {
                  if (data && data.cenpossigfl) {
                     self.issigview = true;
                  }
               });
            }
        });
      }
   };
   if ($stateParams.order) {
      var splitOrder = $stateParams.order.split('-');
      if (splitOrder && splitOrder.length > 0) {
         self.qckOrder = splitOrder[0] + '-' + Utils.pad(splitOrder[1], 2);
         self.getOrderDetails();
      }
   }
   else {
      //To load quickorderno while returning from split to back order screen from quick ship
      if (base.oeesSelectedRecord.ordernox) {
         var splitOrder = base.oeesSelectedRecord.ordernox.split('-');
         if (splitOrder && splitOrder.length > 0) {
            base.qckOrdernox = splitOrder[0] + '-' + Utils.pad(splitOrder[1], 2);
            self.qckOrder = base.qckOrdernox;
         }
      }
      else {
         self.qckOrder = base.qckOrdernox;
      }
      self.getOrderDetails();
   }
   // Quick Print

   self.qckprint = function () {
      var orderno = 0;
      var ordersuf = 0;
      if (self.oeeh) {
         orderno = self.oeeh.orderno;
         ordersuf = self.oeeh.ordersuf;
      }
      $state.go('^.print', { orderno: orderno, ordersuf: ordersuf, backCallback: self.printBackCallback });
   };

   self.printBackCallback = function () {
      $state.go('oees.master');
   };

   // Ship/Unship
   self.shipunshipProcess = function () {
      var printinfolist = [];
      if (self.oeeh) {
         var inputParams = {
            iOrderNo: self.oeeh.orderno,
            iOrderSuf: self.oeeh.ordersuf
         };
         printinfolist.push(inputParams);
         DataService.get('api/oe/asoeentry/oeesshipunshiporder/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {

            //User Hook (do not rename)
            if (self.afterShipUnship) {
               //NOTE: The spot this hook is placed, asynchronous processing will occur below here.
               //Just be aware if you use this hook.
               self.afterShipUnship(data);
            }

            if (data.lIBRSFlag) {
               $state.go('oees.shippinglabelprint', { shippinglabelprintlist: printinfolist });
            }
            else if (data.messaging) {
               if (data.messaging[0].messagetype === 'm') {
                  MessageService.info('global.information', data.messaging[0].messagetxt);
               }
               else {
                  MessageService.errorMessages(data.messaging);
               }
            }
            self.getOrderDetails();
         }, function errorCallback() {
            self.getOrderDetails();
         });
      }
   };
   self.continueShipUnship = function () {
      var params = {
         orderno: self.oeeh.orderno,
         ordersuf: self.oeeh.ordersuf,
         fillmode: true,
         fldlist: ''
      };
      DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
         self.oeeh = data;
         base.oeesSelectedRecord = self.oeeh;
         if (self.oeeh && self.oeeh.orderno !== 0) {
            if (self.oeeh.stagecd === 3) {
               MessageService.yesNo('global.question', 'question.unship.the.order', function () {
                  // Yes processing
                  self.shipunshipProcess();
               }, function () {
                  //No Processing
               });
            }
            else {
               self.shipunshipProcess();
            }
         }
      });
   };
   self.qckshipunship = function () {
      if (self.oeeh) {
         var params = {
            pvOrderno: self.oeeh.orderno,
            pvOrdersuf: self.oeeh.ordersuf
         };
         DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
            if (data) {
               self.authPointsRunning = 0;
               if (self.oeeh.stagecd === 3 && data.pvPackagesexist) {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('oees', 'banner', '', '', '', null, function () {
                     self.continueShipUnship();
                  }, null);
               }
               else if (!data.pvIsfullytendered && data.pvCustselltype === 'c' && self.oeeh.stagecd < 3) {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('oees', 'banner', 'ship', '', '', null, function () {
                     self.continueShipUnship();
                  }, null);
               }
               else if (data.pvWlauthtype.toLowerCase() === 'wlord') {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('wlord', '', '', '', '', null, function () {
                     self.continueShipUnship();
                  }, null);
               }
               else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('esbwl', '', '', '', '', null, function () {
                     self.continueShipUnship();
                  }, null);
               }
               else if (data.pvIssignaturerequired) {
                  MessageService.yesNo('global.confirm', 'question.do.you.want.to.skip.required-signature', function () {
                     //yes callback
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('oeet', 'finish', 'signature', '', '', null, function () {
                        self.continueShipUnship();
                     }, null);
                  }, function () {
                        //no callback, do not finish order
                        return;
                     });
               }
               else {
                  self.continueShipUnship();
               }
            }
         });
      }
      else {
         MessageService.info('global.information', 'message.please.select.a.record.to.proceed.further');
      }
   };
   // Reserve
   self.qckreserve = function () {
      if (self.oeeh) {
         var inputParams = {
            iOrderNo: self.oeeh.orderno,
            iOrderSuf: self.oeeh.ordersuf
         };
         DataService.get('api/oe/asoeentry/oeesreserveorder/{iOrderNo}/{iOrderSuf}', { pathParams: inputParams, busy: true }, function (data) {
            if (data.messaging) {
               data.messaging += '\r\n';
               MessageService.errorMessages(data.messaging);
            }
         });
      }
   };

   // Detail
   self.qckdetail = function () {
      if (self.oeeh) {
         base.qckOrdernox = self.oeeh.orderno + '-' + Utils.pad(self.oeeh.ordersuf, 2);
         base.oeesSelectedRecord = self.oeeh;
         base.isQckshiOpen = true;
         if (base.oeesSelectedRecord) {
            self.setOeesdetailhdrloadcriteria();
         }
         var inputParams = {
            iOrderNo: self.oeeh.orderno,
            iOrderSuf: self.oeeh.ordersuf,
            iJrnlNo: self.oeeh.jrnlno
         };
         DataService.get('api/oe/asoeentry/oeeslaunchdetailcheck/{iOrderNo}/{iOrderSuf}/{iJrnlNo}', { pathParams: inputParams, busy: true }, function (data) {
            if (data.messaging && data.messaging.length > 0) {
               data.messaging.forEach(function (mess) {
                  if (mess.messagetype === 'e' && mess.messagetxt) {
                     MessageService.error('global.error', mess.messagetxt);
                     return;
                  }
               });
            }
            else {
               var params = {
                  custno: self.oeeh.custno,
                  fillmode: true,
                  fldlist: self.fldlist
               };
               DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (data) {
                  self.arsc = data;
               });
               DataService.post('api/oe/asoeentry/oeesdetailhdrload', { data: oeesdetailhdrloadcriteria, busy: true }, function (data) {
                  base.datasetDetail = data;
                  base.oeesSelectedRecord = self.oeeh;
                  $state.go('^.detail', {});
               });
            }
         });
      }
   };

   // Split To Back Order

   self.qcksplitToBackOrder = function () {
      if (self.oeeh) {
         if (self.oeeh.stagecd > 1) {
            var params = {
               pvOrderno: self.oeeh.orderno,
               pvOrdersuf: self.oeeh.ordersuf
            };
            DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
               if (data) {
                  self.authPointsRunning = 0;
                  if (data.pvWlauthtype.toLowerCase() === 'wlord') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('wlord', '', '', '', '', null,
                        function () {
                           self.splitProcessing();
                        }, null);
                  } else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
                     self.authPointsRunning++;
                     AuthService.createAuthPoint('esbwl', '', '', '', '', null,
                        function () {
                           self.splitProcessing();
                        }, null);
                  } else {
                     self.splitProcessing();
                  }
               }
            });
         } else {
            self.splitProcessing();
         }
      }
   };

   // Signature
   self.qcksignature = function () {
      if (self.oeeh) {
         if (!self.completePaymentTypeList) {
            DataService.post('api/sa/sastn/getsastnlist', { data: { codeiden: 'p', fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,descrip,ccaddon,processor' }, busy: true }, function (data) {
               if (data) {
                  self.completePaymentTypeList = data;
               }
               self.signatureProcessor();
            });
         }
      }
   };

   self.signatureProcessor = function (iLoop) {
      if (!base.icsd || (base.icsd && self.oeeh.whse && base.icsd.whse !== self.oeeh.whse)) {
         DataService.get('api/ic/icsd/getbypk', { params: { whse: self.oeeh.whse } }, function (data) {
            if (data) {
               base.icsd = data;
               self.signatureProcessor();
            }
         });
         return;
      }

      if (!base.icsd.cenpossigfl) {
         // No signature in OEES for Topaz devices
      } else {
         if (!iLoop) {
            iLoop = 0;
         }

         var currentPaymentType = self.completePaymentTypeList[iLoop];
         if (currentPaymentType.processor && currentPaymentType.processor !== "0") {
            DataService.getResource('api/sa/assasetup/sastpretrieve/' + currentPaymentType.processor, { method: 'GET', busy: true }, function (data) {
               if (data.callingURLH5) {
                  self.signaturePopup(currentPaymentType.codeval);
               } else {
                  iLoop++;
                  self.signatureProcessor(iLoop);
               }
            });
         } else {
            iLoop++;
            self.signatureProcessor(iLoop);
         }
      }
   };

   self.signaturePopup = function (SigMediaCd) {
      CenPosService.showModal({
         type: 'signature',
         mediacd: SigMediaCd,
         invoiceno: self.oeeh.orderno + '-' + self.oeeh.ordersuf,
         successCallback: self.saveImage
      });
   };

   self.saveImage = function () {
      var pvImages = {
         cono: UserService.getCono(),
         keytype: 'oedlv',
         keyvalue1: self.oeeh.custno,
         keyvalue2: self.oeeh.orderno + '-' + Utils.pad(self.oeeh.ordersuf, 2),
         chunk: 1,
         descrip: 'Signature: ' + self.oeeh.custno,
         image64: 'cctrans',
         currproc: 'oeet',
         operinit: UserService.getUserName()
      };

      DataService.post('api/oe/asoeentry/oesignaturesave', { data: pvImages, busy: true }, function () {
         MessageService.info('global.information', 'global.signature.saved.successfully');
         if (self.navBackState) {
            $state.go(self.navBackState);
         } else {
            // No change
         }
      });
   };

   // This needs to be defined BEFORE it is sent as a parameter
   self.setWhseLogStatusCallback = function (parameters) {
      if (parameters.newWhseLogStatus) {
         self.whseLogStatus = parameters.newWhseLogStatus;
      }
      // Handle processing on return from the warehouse logistics status screen
      if (parameters.stage && parameters.stage === 'authPointPassed') {
         MessageService.alert($translate.instant('wl.order.in.process'), $translate.instant('message.you.have.authorization.to.make.changes.that.may.not.get.updated.in.wl'));
      }
      if (parameters.stage && parameters.stage === 'finish') {
         self.splitProcessingContinued();
      }
   };
   self.splitProcessing = function () {
      self.wlstatus = {};
      var params = {
         iOrderNo: self.oeeh.orderno,
         iOrderSuf: self.oeeh.ordersuf
      };
      DataService.get('api/oe/asoeentry/oeessplittobackordercheck/{iOrderNo}/{iOrderSuf}', { pathParams: params, busy: true }, function (data) {
         if (data.wlstatus && data.wlstatus.wlwhsefl) {
            self.wlstatus = data.wlstatus;
            $state.go('oees.quickship.orderStatus', { whseLogStatus: self.wlstatus, menuFunction: 'oees', setWhseLogStatusCallback: self.setWhseLogStatusCallback });
         }else {
            if (data.lSplitOK) {
               self.splitProcessingContinued();
            }else {
               if (data.messaging && data.messaging.length > 0) {
                  MessageService.processMessaging(data.messaging);
               }
            }
         } 
      });
   };

   self.splitProcessingContinued = function () {
      base.oeesSelectedRecord = self.oeeh;
      if (base.oeesSelectedRecord) {
         self.setOeesdetailhdrloadcriteria();
      }
      DataService.post('api/oe/asoeentry/oeesdetailhdrload', { data: oeesdetailhdrloadcriteria, busy: true }, function (data) {
         base.datasetDetail = data;
         $state.go('oeers.detail', {
            oeersRecord: base.oeesSelectedRecord,
            oeesdetailhdr: base.datasetDetail.oeesdetailhdrsingle,
            oeaddons: base.datasetDetail.oeaddons,
            module: base.module,
            isQckshipOpen: false
         });
      });
   };

   // Shipment Notification
   self.shipmentNotification = function () {
      if (self.oeeh) {
         var params = {
            pvOrderno: self.oeeh.orderno,
            pvOrdersuf: self.oeeh.ordersuf
         };
         DataService.get('api/oe/asoeinquiry/oeesauthpointinfo/{pvOrderno}/{pvOrdersuf}', { pathParams: params, busy: true }, function (data) {
            if (data) {
               if (base.criteria && base.criteria.stage < 3 && !data.pvIsfullytendered && data.pvCustselltype === 'c') {
                  base.isCashSaleAuthNeeded = true;
               }
               if (data.pvWlauthtype.toLowerCase() === 'wlord') {
                  base.isWLAuthNeeded = true;
               }
               else if (data.pvWlauthtype.toLowerCase() === 'esbwl') {
                  base.isESBWLNeeded = true;
               }
            }
         });
         $state.go('^.email', { orderno: self.oeeh.orderno, ordersuf: self.oeeh.ordersuf, parent: $state.current.name });
      } else {
         MessageService.error('global.error', 'message.please.select.a.record.to.proceed.further');
      }
   };
});

app.controller('OeesShippingLabelPrintCtrl', function ($state, $scope, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.order = {};
   self.inputIBPrintSingle = {};
   self.ibOrderResults = [];
   self.ismultiselect = false;
   self.shippinglabels = $stateParams.shippinglabelprintlist;
   self.shippinglabels.forEach(function (record) {
      var iborder = {
         orderno: record.iOrderNo,
         ordersuf: record.iOrderSuf
      };
      self.ibOrderResults.push(iborder);
   });
   self.ibInitialize = function () {
      var requestParams = { ibordersresults: self.ibOrderResults, ibprintsingle: self.inputIBPrintSingle };
      if (requestParams) {
         DataService.post('api/shared/asibentry/ibrsinitialize', { data: requestParams, busy: true }, function (data) {
            self.ibOrderResults = data.ibordersresults;
            self.inputIBPrintSingle = data.ibprintsingle;
            if (self.inputIBPrintSingle) {
               self.order = self.inputIBPrintSingle.orderno + '-' + self.inputIBPrintSingle.ordersuf;
            }
         });
      }
   };
   if (self.shippinglabels.length === 1) {
      base.shippinglabeltitle = MessageService.get('global.print.shipping.labels.for.order.number') + self.shippinglabels[0].iOrderNo + '-' + self.shippinglabels[0].iOrderSuf;
      base.shippinglabelsubtitle = self.shippinglabels[0].iOrderNo + '-' + self.shippinglabels[0].iOrderSuf;
      self.inputIBPrintSingle = {
         orderno: self.shippinglabels[0].iOrderNo,
         ordersuf: self.shippinglabels[0].iOrderSuf
      };
      self.ismultiselect = false;
      self.ibInitialize();
   }
   else if (self.shippinglabels.length > 1) {
      self.ismultiselect = true;
      base.shippinglabeltitle = MessageService.get('global.print.shipping.labels');
      self.inputIBPrintSingle = {
         orderno: -99,
         ordersuf: 99
      };
      self.ibInitialize();
   }
   self.buttonPrint = function () {
      var printParams = { ibordersresults: self.ibOrderResults, ibprintsingle: self.inputIBPrintSingle, printersettings: self.printerControl.printerSettings };
      if (printParams) {
         DataService.post('api/shared/asibentry/ibrsdemandprint', { data: printParams, busy: true }, function () {
            MessageService.info('global.information', 'message.the.order.has.been.shipped');
            $state.go('oees.master');
         });
      }
   };
   self.buttonCancel = function () {
      $state.go('oees.master');
   };
});

app.controller('OeesChangeAddonsCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.selectedAddon = $scope.dtl.rowParams.item;
   var grid = dtl.addonsGrid;
   var row = $scope.dtl.rowParams.row;
   self.iNewAddonNo = 0;
   self.cNewAddonDesc = '';
   self.dNewAddonAmt = 0;
   self.lNewAddonType = false;
   if (self.selectedAddon) {
      self.iNewAddonNo = self.selectedAddon.addonno;
      self.cNewAddonDesc = self.selectedAddon.addondesc;
      self.dNewAddonAmt = self.selectedAddon.addonamt;
      self.lNewAddonType = self.selectedAddon.addontype;
   }

   DataService.get('api/oe/asoeheader/loadoeaddonlist/' + dtl.oees.orderno + '/' + dtl.oees.ordersuf, { busy: true }, function (data) {
      if (data) {
         self.addonTypeCollection = data;

         self.addonOptions = [];
         for (var i = 0; i < self.addonTypeCollection.length; i++) {
            var currentAddonType = self.addonTypeCollection[i];
            self.addonOptions.push({
               label: currentAddonType.addondesc,
               value: currentAddonType.addondesc
            });
         }
      }
   });

   self.addonChanged = function () {
      var addonType;
      for (var i = 0; i < self.addonTypeCollection.length; i++) {
         var currentAddonType = self.addonTypeCollection[i];
         if (currentAddonType.addondesc === self.cNewAddonDesc) {
            addonType = currentAddonType;
            break;
         }
      }

      if (addonType) {
         self.iNewAddonNo = addonType.addonno;
         self.dNewAddonAmt = addonType.addonamt;
         self.lNewAddonType = addonType.addontype;
      } else {
         self.iNewAddonNo = 0;
         self.dNewAddonAmt = 0;
         self.lNewAddonType = false;
      }
   };

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };
   self.submit = function () {
      var changeAddonrequest = { oeaddons: self.selectedAddon, iNewAddonNo: self.iNewAddonNo, dNewAddonAmt: self.dNewAddonAmt, lNewAddonType: self.lNewAddonType };
      DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeAddonrequest, busy: true }, function (data) {        
         var updateindx = base.datasetDetail.oeaddons.findIndex(function (item) {
            return item.seqno === data.seqno;
         });
         base.datasetDetail.oeaddons[updateindx] = data;
      });
   };
});

app.controller('OeesNewAddonCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.iNewAddonNo = {};
   self.cNewAddonDesc = {};
   self.dNewAddonAmt = 0;
   self.lNewAddonType = {};

   DataService.get('api/oe/asoeheader/loadoeaddonlist/' + base.oeesSelectedRecord.orderno + '/' + base.oeesSelectedRecord.ordersuf, { busy: true }, function (data) {
      if (data) {
         self.addonTypeCollection = data;

         self.addonOptions = [];
         for (var i = 0; i < self.addonTypeCollection.length; i++) {
            var currentAddonType = self.addonTypeCollection[i];
            self.addonOptions.push({
               label: currentAddonType.addondesc,
               value: currentAddonType.addondesc
            });
         }
      }
   });

   self.addonChanged = function () {
      var addonType;
      for (var i = 0; i < self.addonTypeCollection.length; i++) {
         var currentAddonType = self.addonTypeCollection[i];
         if (currentAddonType.addondesc === self.cNewAddonDesc) {
            addonType = currentAddonType;
            break;
         }
      }

      if (addonType) {
         self.iNewAddonNo = addonType.addonno;
         self.dNewAddonAmt = addonType.addonamt;
         self.lNewAddonType = addonType.addontype;
      } else {
         self.iNewAddonNo = 0;
         self.dNewAddonAmt = 0;
         self.lNewAddonType = false;
      }
   };

   self.addAddon = function () {
      var addoncriteria = {
         orderno: base.oeesSelectedRecord.orderno,
         ordersuf: base.oeesSelectedRecord.ordersuf,
         addonno: self.iNewAddonNo,
         addonamt: self.dNewAddonAmt,
         addontype: self.lNewAddonType
      };
      var addonrequest = { oeaddons: base.datasetDetail.oeaddons, addoeaddoncriteria: addoncriteria };
      DataService.post('api/oe/asoeheader/addoeaddon', { data: addonrequest, busy: true }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.datasetDetail.oeaddons = data;
         $state.go('^.detail', {});
      });
   };
   self.cancel = function () {
      $state.go('^.detail', {});
   };
});

app.controller('OeesLineItemRowDetailsCtrl', function ($scope, $state, $stateParams, DataService, SecurityService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   self.selectedline = $stateParams.lineItem;
   self.liExtended = {};
   self.liupdatef = false;
   self.liclibordersresults = {};
   self.liclibprintsingle = {};
   var ibprintsingle = {};
   var ibordersresultslist = [];
   self.menuSecurity = SecurityService.getSecurityLevel('oees');

   if (!self.selectedline.ordernox) {
      self.selectedline.ordernox = self.selectedline.orderno + '-' + Utils.pad(self.selectedline.ordersuf, 2);
   }
   //Load Extended
   self.loadLiExtended = function () {
      var params = {
         iOrderNo: self.selectedline.orderno,
         iOrderSuf: self.selectedline.ordersuf,
         iLineNo: self.selectedline.lineno,
         cSpecCostTy: self.selectedline.speccostty,
         cBinLoc: self.selectedline.binloc
      };
      DataService.get('api/oe/asoeentry/oeesdetaillineextendload', { params: params, busy: true }, function (data) {
         self.liExtended = data;
      });
   };
   //Load Carton Label
   self.setLibprintsingle = function () {
      ibprintsingle = {
         orders: '',
         pono: '',
         posuf: '',
         ponoDispl: '',
         posufDispl: '',
         orderno: self.selectedline.orderno,
         ordersuf: self.selectedline.ordersuf,
         ordernoDispl: '',
         ordersufDispl: '',
         lineno: self.selectedline.lineno,
         jrnlno: self.selectedline.IjrnlNo,
         labeltype: '',
         nmbrlbls: '',
         qtyctn: '',
         mixedctn: '',
         cartonno: '',
         name: '',
         fiOrdersVisible: '',
         fiPONOVisible: '',
         fiOrderNoVisible: ''
      };
   };

   self.loadliCartonlabel = function () {
      var ibordersresults = { orderno: self.selectedline.orderno, ordersuf: self.selectedline.ordersuf };
      ibordersresultslist.push(ibordersresults);
      var liCartonLabelReq = { ibordersresults: ibordersresultslist, ibprintsingle: ibprintsingle };
      DataService.post('api/shared/asibentry/ibrcinitialize', { data: liCartonLabelReq, busy: true }, function (data) {
         if (data) {
            self.liclibordersresults = data.ibordersresults;
            self.liclibprintsingle = data.ibprintsingle;
            if (self.liclibprintsingle) {
               self.ibrcorderno = self.liclibprintsingle.orderno + '-' + Utils.pad(self.liclibprintsingle.ordersuf, 2);
            }
         }
      });
   };

   self.printCarton = function () {
      self.cartonPrinterControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            if (ibordersresultslist && ibordersresultslist.length > 0 && self.liclibprintsingle && data.printerDetails) {
               var printCriteria = {
                  ibordersresults: ibordersresultslist,
                  ibprintsingle: self.liclibprintsingle,
                  printersettings: data.printerDetails
               };
               DataService.post('api/shared/asibentry/ibrcdemandprint', { data: printCriteria, busy: true });
            }
         }
      });
   };

   //SerialLot
   self.createIcEntrySerialsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            whse: self.selectedline.whse,
            prod: self.selectedline.shipprod,
            type: 'oe',
            orderno: self.selectedline.orderno,
            ordersuf: self.selectedline.ordersuf,
            lineno: self.selectedline.lineno,
            linenochar: self.selectedline.lineno.toString(),
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: self.selectedline.returnfl,
            origqty: self.selectedline.stkqtyship,
            proofqty: resp.dNoSNLots,
            ordqty: self.selectedline.stkqtyord,
            outqty: self.selectedline.stkqtyship,
            ictype: 'so',
            cost: self.selectedline.prodcost,
            qtyunavail: self.selectedline.qtyunavail,
            method: '',
            retorderno: self.selectedline.retorderno,
            retordersuf: self.selectedline.retordersuf,
            retlineno: self.selectedline.retlineno,
            returnty: self.selectedline.returnty,
            reasunavty: self.selectedline.reasunavty,
            custno: self.selectedline.custno,
            shipto: self.selectedline.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: 'oees',
            icspecrecno: self.selectedline.icspecrecno,
            assignoldest: true,
            currproc: 'oees',
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: self.selectedline.proddesc,
            prodnotesfl: ''
         };
         return criteria;
      }
   };
   self.createIcEntryLotsCriteria = function (resp) {
      if (resp) {
         var criteria = {
            whse: self.selectedline.whse,
            prod: self.selectedline.shipprod,
            type: 'oe',
            orderno: self.selectedline.orderno,
            ordersuf: self.selectedline.ordersuf,
            lineno: self.selectedline.lineno,
            linenochar: self.selectedline.lineno.toString(),
            seqno: 0,
            seqnochar: '000',
            inquiryfl: false,
            actionty: '',
            returnfl: self.selectedline.returnfl,
            origqty: self.selectedline.stkqtyship,
            proofqty: resp.dNoSNLots,
            ordqty: self.selectedline.stkqtyord,
            outqty: self.selectedline.stkqtyship,
            ictype: 'so',
            cost: self.selectedline.prodcost,
            qtyunavail: self.selectedline.qtyunavail,
            method: '',
            retorderno: self.selectedline.retorderno,
            retordersuf: self.selectedline.retordersuf,
            retlineno: self.selectedline.retlineno,
            returnty: self.selectedline.returnty,
            reasunavty: self.selectedline.reasunavty,
            custno: self.selectedline.custno,
            shipto: self.selectedline.shipto,
            vendno: 0,
            wono: 0,
            wosuf: 0,
            cono2: 0,
            shipfmwhse: '',
            shiptowhse: '',
            jrnlno: 0,
            ourproc: 'oees',
            icspecrecno: self.selectedline.icspecrecno,
            assignoldest: 'y',
            currproc: 'oees',
            seqdash: '0',
            rettext: '',
            kplabel: '',
            wonosuf: '',
            origqtylabel: '',
            proddesc: self.selectedline.proddesc,
            prodnotesfl: ''
         };
         return criteria;
      }
   };
   self.serialControlReady = function () {
      var seriallotcheckrequest = { oeesdetaillinelist: base.datasetdetails, oeesdetaillinesingle: self.selectedline, iLineNo: self.selectedline.lineno, lIsFromMenu: true };
      DataService.post('api/oe/asoeentry/oeesdetaillinecheckserlot', { data: seriallotcheckrequest, busy: true }, function (data) {
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

   self.serialDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      var oeesdetaillinelist = [];
      var qtyShip = self.selectedline.stkqtyship;
      if (adjustQtyShip) {
         qtyShip = adjustQtyShip;
      }
      oeesdetaillinelist.push(self.selectedline);
      var oeesLineUpdateSerialCriteria = {
         oeesdetaillinelist: oeesdetaillinelist,
         oeesdetaillinesingle: {},     // Not needed
         iLineNo: self.selectedline.lineno,
         dSerLotOutQty: qtyShip,
         dSerLotQtyUnAvail: 0             // Not needed
      };
      DataService.post('api/oe/asoeentry/oeesdetaillineafterserlot', { data: oeesLineUpdateSerialCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.oeesdetaillinelist && data.oeesdetaillinelist.length) {
                  self.selectedline = data.oeesdetaillinelist[0];
                  base.datasetdetails.forEach(function (lineRow, index) {
                     if (lineRow.lineno === self.selectedline.lineno) {
                        Utils.replaceObject(lineRow, self.selectedline);
                        dtl.grid.updateRow(index);
                     }
                  });

               }
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         }
      });
   };
   self.lotControlReady = function () {
      var seriallotcheckrequest = { oeesdetaillinelist: base.datasetdetails, oeesdetaillinesingle: self.selectedline, iLineNo: self.selectedline.lineno, lIsFromMenu: true };
      DataService.post('api/oe/asoeentry/oeesdetaillinecheckserlot', { data: seriallotcheckrequest, busy: true }, function (data) {
         if (data) {
            // format and add nesseccary criteria to object
            self.icEntryLotsCriteria = self.createIcEntryLotsCriteria(data);
            // Call initialize method on the Shared-Lots-Ctrl
            self.lotsControl.initialize(self.icEntryLotsCriteria);
         }
      });
   };
   self.lotDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      var oeesdetaillinelist = [];
      var qtyShip = self.selectedline.stkqtyship;
      if (adjustQtyShip) {
         qtyShip = adjustQtyShip;
      }
      oeesdetaillinelist.push(self.selectedline);
      var oeesLineUpdateSerialCriteria = {
         oeesdetaillinelist: oeesdetaillinelist,
         oeesdetaillinesingle: {},     // Not needed
         iLineNo: self.selectedline.lineno,
         dSerLotOutQty: qtyShip,
         dSerLotQtyUnAvail: 0             // Not needed
      };

      DataService.post('api/oe/asoeentry/oeesdetaillineafterserlot', { data: oeesLineUpdateSerialCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               if (data.oeesdetaillinelist && data.oeesdetaillinelist.length) {
                  self.selectedline = data.oeesdetaillinelist[0];
                  base.datasetdetails.forEach(function (lineRow, index) {
                     if (lineRow.lineno === self.selectedline.lineno) {
                        Utils.replaceObject(lineRow, self.selectedline);
                        dtl.grid.updateRow(index);
                     }
                  });

               }
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         }
      });
   };
   if (self.selectedline) {
      self.loadLiExtended();
      self.setLibprintsingle();
      self.loadliCartonlabel();
      if (self.selectedline.serlottype.toUpperCase() === 'S') {
         base.isSerial = true;
         base.islot = false;
      }
      if (self.selectedline.serlottype.toUpperCase() === 'L') {
         base.isSerial = false;
         base.islot = true;
      }

      if (self.selectedline.tallyfl || self.selectedline.memomixfl) {
         DataService.get('api/oe/asoeentry/updatetallyprevfields/' + self.selectedline.orderno + '/' + self.selectedline.ordersuf + '/' + self.selectedline.lineno, {
            busy: true
         }, function (data) {
            self.tallyDelayed = data;
         });
      }
   }
   self.tallyBundleControlSave = function (payload) {
      var afterTallyRequest = {
         oeesdetaillinelist: [self.selectedline],
         oeesdetaillineaftertally: {
            holddelayfl: self.tallyDelayed,
            lineno: self.selectedline.lineno,
            qtyord: payload.qty,
            unit: payload.unit
         }
      };
      DataService.post('api/oe/asoeentry/oeesdetaillineaftertally', { data: afterTallyRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               self.selectedline = data.oeesdetaillinelist[0];
            }
         }
      });
   };

   self.liUpdate = function () {
      if (self.liExtended) {
         DataService.post('api/oe/asoeentry/oeesdetaillineextendupdate', { data: self.liExtended, busy: true }, function (data) {
            self.liupdatef = data;
         });
      }
   };

   //Load Warehouse Manager

});