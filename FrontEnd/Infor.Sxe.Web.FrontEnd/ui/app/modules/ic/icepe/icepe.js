'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'icepe', {
      widgets: ['SEARCH']
   });

   StateProvider.addMasterState('ic', 'icepe');

   $stateProvider.state('icepe.addproductcount', {
      url: '/add-product-count',
      params: { Icepeaddproductcriteria: null, ticketno: null, whse: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icepe/add-product-count.json');
            },
            controller: 'IcepeAddProductCount as apc'
         }
      }
   });

   $stateProvider.state('icepe.quickbinsdetail', {
      url: '/quick-bins-detail',
      params: { Iceperecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icepe/quick-bins-detail.json');
            },
            controller: 'IcepeQuickBinsDetails as qbdtl'
         }
      }
   });

   $stateProvider.state('icepe.updateserialnumbers', {
      url: '/update-serial-numbers',
      params: { icepeupdatecriteria: null, whse: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icepe/update-serial-numbers.json');
            },
            controller: 'IcepeUpdateSerialNumbersCtrl as usn'
         }
      }
   });

   $stateProvider.state('icepe.updatelot', {
      url: '/update-lot',
      params: { icepeupdatecriteria: null, whse: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icepe/update-lot.json');
            },
            controller: 'IcepeUpdateLotNumbersCtrl as uln'
         }
      }
   });
});

app.controller('IcepeBaseCtrl', function ($state, DataService, MessageService) {
   var self = this;
   self.DISPLAYTYPE_BOTH = 'b';
   self.criteria = {};
   self.criteria = { cDisplayTy: self.DISPLAYTYPE_BOTH, iRunno: '0' };
   self.icsepHeader = { phyfl: false };

   self.isMaster = function () {
      return $state.is('icepe.master');
   };

   self.includesMaster = function () {
      return $state.includes('icepe.master');
   };

   self.isDetail = function () {
      return $state.is('icepe.detail');
   };

   self.includesDetail = function () {
      return $state.includes('icepe.detail');
   };

   self.clearHeaderFields = function () {
      self.icsepHeader.createdt = null;
      self.icsepHeader.phyfl = false;
   };

   self.updateSearchInfo = function () {
      var requestCriteria = {
         ttblicepeloadheadercriteria: {
            whse: self.criteria.cWhse,
            runno: self.criteria.iRunno
         }
      };

      //WebHandler call
      DataService.post('/web/api/ic/ICEPELoadHeader', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            if (data.ttblicepeloadheaderresult && data.ttblicepeloadheaderresult.length > 0) {
               self.icsepHeader.createdt = data.ttblicepeloadheaderresult[0].createdt;
               self.icsepHeader.phyfl = data.ttblicepeloadheaderresult[0].phyfl;
            } else {
               self.clearHeaderFields();
            }

            //If not Physical count, then leave it alone.
            if (!self.icsepHeader.phyfl) {
               self.criteria.cDisplayTy = self.DISPLAYTYPE_BOTH;
            }
         } else {
            self.clearHeaderFields();
         }
      });
   };

   // Perform search and update data set for the grid
   self.search = function () {
      if (!self.criteria.iRunno) {
         self.criteria.iRunno = 0; //run number is required for search call, but could get blanked out.  Perhaps search call signature should be changed to take params?
      }
      DataService.get('api/ic/asicentry/icepeload/' + self.criteria.cWhse + '/' + self.criteria.iRunno + '/' + self.criteria.cDisplayTy, { busy: true }, function (data) {
         if (!MessageService.processMessaging(data.messaging)) {
            self.dataset = data.icepeloadresults;

            self.updateSearchInfo();
         }
      });
   };
});

app.controller('IcepeSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = { cDisplayTy: 'b', iRunno: '0' };
   };

   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icepe.master');
      }

      base.search();
   };

   self.onKeySelected = function () {
      if (base.criteria.cWhse && base.criteria.iRunno > 0) {
         base.updateSearchInfo();
      }
   };
});

app.controller('IcepeMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.addProductCountFunction = function () {
      var base = $scope.base;
      var record = $scope.base.criteria;

      DataService.get('api/ic/asicentry/icepeload/' + record.cWhse + '/' + record.iRunno + '/b', { busy: true }, function (data) {
         var loadedData = data.icepeloadresults;
         if (loadedData) {
            var lastticketno = JSLINQ(data.icepeloadresults).OrderByDescending(function (item) {
               return item.ticketno;
            }).FirstOrDefault(function (item) {
               return item;
            });
            $state.go('^.addproductcount', { Icepeaddproductcriteria: { ticketno: lastticketno.ticketno + 1 }, ticketno: lastticketno.ticketno + 1, whse: base.criteria.whse });
         }
      });
   };

   self.manageSerial = function () {
      var base = $scope.base;
      self.selectedRecord = GridService.getSelectedRecord(base.grid);
      $state.go('^.updateserialnumbers', { icepeupdatecriteria: self.selectedRecord, whse: base.criteria.cWhse });
   };

   self.manageLot = function () {
      var base = $scope.base;
      self.selectedRecord = GridService.getSelectedRecord(base.grid);
      $state.go('^.updatelot', { icepeupdatecriteria: self.selectedRecord, whse: base.criteria.cWhse });
   };

   self.setTicketNotCount = function () {
      var record = GridService.getSelectedRecord(base.grid);
      var icepesavecriteria = {};
      if (record) {
         icepesavecriteria.qtycnt = record.qtycnt;
         icepesavecriteria.uticketno = record.uticketno;
         icepesavecriteria.uticketenabled = record.uticketnoenabled;
         icepesavecriteria.setnotcountedfl = true;
         icepesavecriteria.prod = record.prod;
         icepesavecriteria.runno = record.runno;
         icepesavecriteria.ticketno = record.ticketno;
         icepesavecriteria.whse = record.whse;
      }
      DataService.post('api/ic/asicentry/icepesave/', { data: icepesavecriteria, busy: true }, function (data) {
         var loadedData = data;
         if (loadedData) {
            record.entfl = data.entfl;
            record.qtycnt = data.qtycnt;
            record.uticketno = data.uticketno;
            // update and redisplay the row
            var currentIndex = base.dataset.indexOf(record);
            base.grid.updateRow(currentIndex);
         }
      });
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      if (record) {
         $state.go('^.quickbinsdetail', { Iceperecord: record });
      }
   };

   self.rowSelected = function () {
      self.selectedRecord = GridService.getSelectedRecord(base.grid);
   };

   self.onCountEntryGridCellChange = function (e, args) {
      var newValue = args.value;
      var oldValue = args.oldValue;
      self.selectedRecord = GridService.getSelectedRecord(base.grid);
      var record = base.dataset[args.row];
      if (newValue === "0" || isNaN(newValue)) {  // Validate if a valid number
         // Because the question takes the focus out of the browser and thus after answering "yes", the user needs to re-find the row and
         // click back into it to edit, which causes a slow down.  Changing to a an info message (alert), lets the user know that the 0
         // was entered, but does not pull the focus off the grid for continued entry.  If the user did not intend to enter 0, which would
         // be the case least often (most likely), that's when the user needs to take action and go back and correct it.
         MessageService.info('global.alert', 'message.warning.quantity.counted.is.zero');
         self.updateIcepe(record, args.row);
      }
      else if (newValue !== 0) { //
         self.updateIcepe(record, args.row);
      }
   };

   self.updateIcepe = function (record, index) {
      if (record) {
         var icepesavecriteria = {
            qtycnt: record.qtycnt,
            ticketno: record.ticketno,
            uticketenabled: record.uticketnoenabled,
            prod: record.prod,
            runno: record.runno,
            whse: record.whse
         };
         DataService.post('api/ic/asicentry/icepesave/', { data: icepesavecriteria, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               //update and redisplay the row
               record.entfl = data.entfl;
               record.qtycnt = data.qtycnt;  // Redisplay the quantity count - so if the user enters ".12" it will show as "0.12", or they get the 2 decimal rounded value
               base.grid.updateRow(index);
            }
         });
      }
   };

   self.navigateToIcia = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icia.detail', { pk: currentRow.prod, pk2: base.criteria.cWhse }, { reload: 'icia.detail' });
      }
   };
   self.navigateToIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: base.criteria.cWhse }, { reload: 'icip.detail' });
      }
   };
});

app.controller('IcepeAddProductCount', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var record = $scope.base.criteria;

   self.Icepeaddproductcriteria = $stateParams.Icepeaddproductcriteria;
   self.Icepeaddproductcriteria.ticketno = $stateParams.ticketno;
   self.Icepeaddproductcriteria.whse = record.cWhse;
   self.Icepeaddproductcriteria.runno = record.iRunno;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.submit = function () {
      DataService.post('api/ic/asicentry/icepeaddproduct/', { data: self.Icepeaddproductcriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               MessageService.info('global.save', 'message.save.operation.completed.successfully');
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
         } 
      });
   };

   self.onProductChange = function () {
      if (self.Icepeaddproductcriteria.prod) {
         var params = {
            prod: self.Icepeaddproductcriteria.prod,
            whse: self.Icepeaddproductcriteria.whse
         };

         DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.Icepeaddproductcriteria.binloc = data.binloc1;
            }
         });         
      }
   };

});

app.controller("IcepeQuickBinsDetails", function ($state, $stateParams, DataService, MessageService, GridService, UserService) {
   var self = this;
   self.Icepe = $stateParams.Iceperecord;
   self.isBinLocReadOnly = true;
   self.icsw = {};
   self.dataset = {};

   if (self.Icepe) {
      var params = {
         prod: self.Icepe.prod,
         whse: self.Icepe.whse
      };

      DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.icsw = data;
         }
      });

      params = {
         whse: self.Icepe.whse,
         prod: self.Icepe.prod
      };
      DataService.get('api/ic/icswb/listbywhse', { params: params, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   }

   self.onAddBinLoc = function () {

      self.icswb = { binloc: self.Icepe.addorupdateBinLoc, prod: self.Icepe.prod, whse: self.Icepe.whse, cono: UserService.getCono() };
      var record = GridService.getSelectedRecord(self.grid);

      if (!record) {
         DataService.post('api/ic/icswb', { data: self.icswb, busy: true }, function (data) {
            if (data) {
               self.icsw = data;
               if (data) {
                  var params = {
                     whse: self.Icepe.whse,
                     prod: self.Icepe.prod
                  };

                  //Load Grid
                  DataService.get('api/ic/icswb/listbywhse', { params: params, busy: true }, function (data) {
                     if (data) {
                        self.dataset = data;
                        self.Icepe.addorupdateBinLoc = '';
                        self.isBinLocReadOnly = true;
                     }
                  });
               }
            }
         });
      }
      else if (record.rowID) {
         DataService.post('api/ic/icswb', { data: record, busy: true }, function (data) {
            if (data) {
               self.icsw = data;
               if (data) {
                  var params = {
                     whse: self.Icepe.whse,
                     prod: self.Icepe.prod
                  };

                  //Load Grid
                  DataService.get('api/ic/icswb/listbywhse', { params: params, busy: true }, function (data) {
                     if (data) {
                        self.dataset = data;
                        self.Icepe.addorupdateBinLoc = '';
                        self.isBinLocReadOnly = true;
                     }
                  });
               }
            }
         });
      }
   };

   self.cancelBinLoc = function () {
      self.Icepe.addorupdateBinLoc = '';
      self.isBinLocReadOnly = true;
   };

   self.onCreate = function () {
      self.isBinLocReadOnly = false;
   };

   self.onAddBinCellChanged = function (args) {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         DataService.put('api/ic/icswb', { data: record, busy: true }, function (data) {
            if (data) {
               self.icsw = data;
               if (data) {
                  var params = {
                     whse: self.Icepe.whse,
                     prod: self.Icepe.prod
                  };

                  //Load Grid
                  DataService.get('api/ic/icswb/listbywhse', { params: params, busy: true }, function (data) {
                     if (data) {
                        self.dataset = data;
                        self.Icepe.addorupdateBinLoc = '';
                        self.isBinLocReadOnly = true;
                     }
                  });
               }
            }
         });
      }
   };

   self.onAddBinRowSelected = function () {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         self.Icepe.addorupdateBinLoc = record.binloc;
      }
      else {
         self.Icepe.addorupdateBinLoc = '';
      }
   };

   self.submit = function () {
      DataService.put('api/ic/icsw/', { data: self.icsw, busy: true }, function (data) {
         if (data) {
            //self.icsw = data;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master');
         }
      });
   };
});

app.controller('IcepeUpdateSerialNumbersCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, UserService, Sasc, Utils, Constants, MessageService, ModalService) {
   var self = this;
   self.criteria = $stateParams.icepeupdatecriteria;
   self.whse = $stateParams.whse;
   self.serialno = '';
   self.serialsMasterGrid = {};
   self.serialsChangesGrid = {};
   self.dataset = [];
   self.icepesSerialChangesCollection = [];
   self.icepesResults = [];
   self.icepes = [];
   self.icepeSerialActions = [];
   self.requestIcepeserialChanges = [];
   self.requestIcepeserialMaster = [];

   self.isSingle = function () {
      return self.serialsChangesGrid.isOneRowSelected();
   };

   var params = {
      prod: self.criteria.prod,
      whse: self.whse
   };

   DataService.get('api/ic/icses/getbypk', { params: params, busy: true }, function (data) {
      if (data) {
         self.criteria.unavailfl = true;
         DataService.post('api/ic/asicentry/icepeserialinit', { data: { icepeserlotinitcriteria: self.criteria, icespssiList: self.icepesResults }, busy: true }, function (data) {
            if (data) {
               if (data.icepeserialmaster) {
                  self.requestIcepeserialMaster = data.icepeserialmaster;
                  self.dataset = data.icepeserialmaster;
               }
               if (data.icepeserialchanges) {
                  self.requestIcepeserialChanges = data.icepeserialchanges;
                  self.icepesSerialChangesCollection = data.icepeserialchanges;
               }
               if (data.icepeserlotinitsingle) {
                  self.proof = data.icepeserlotinitsingle.proof;
               }
            }
         });
      }
   });

   self.moveRight = function () {
      var gridResult = GridService.getSelectedRecords(self.serialsMasterGrid);
      self.icepeSerialActions = [];
      gridResult.forEach(function (icseps) {
         self.icepeSerialActions.push({ cono: Sasc.cono, prod: icseps.prod, whse: icseps.whse, serialno: icseps.serlotno, rectype: icseps.statusty, incfl: 'N', runno: self.criteria.runno });
      });

      var asicEntryICEPESerialActionsRequest = {
         icepeserialactions: self.icepeSerialActions,
         icepeserialchanges: self.icepesSerialChangesCollection,
         icepeserialmaster: self.dataset,
         cAction: 'Right',
         dProof: self.proof
      };
      self.setSerialActionRequest(asicEntryICEPESerialActionsRequest);
   };

   self.moveLeft = function () {
      var gridResult = GridService.getSelectedRecords(self.serialsChangesGrid);
      self.icepeSerialActions = [];
      gridResult.forEach(function (icseps) {
         self.icepeSerialActions.push({ cono: Sasc.cono, prod: icseps.prod, whse: icseps.whse, serialno: icseps.serialno, incfl: icseps.incfl, runno: self.criteria.runno });
      });
      var asicEntryICEPESerialActionsRequest = {
         icepeserialactions: self.icepeSerialActions,
         icepeserialchanges: self.icepesSerialChangesCollection,
         icepeserialmaster: self.dataset,
         cAction: 'Left',
         dProof: self.proof
      };

      self.setSerialActionRequest(asicEntryICEPESerialActionsRequest);
   };

   self.setSerialActionRequest = function (asicEntryICEPESerialActionsRequest) {

      DataService.post('api/ic/asicentry/icepeserialactions', { data: asicEntryICEPESerialActionsRequest, busy: true }, function (data) {
         if (data && data.messaging.length === 0) {
            self.dataset = [];
            self.icepesSerialChangesCollection = [];

            if (data.icepeserialmaster) {
               self.dataset = data.icepeserialmaster;
            }
            if (data.icepeserialchanges) {
               self.requestIcepeserialChanges = data.icepeserialchanges;
               self.icepesSerialChangesCollection = data.icepeserialchanges;

               if (data.icepeserialchanges.length > 0) {
                  // Note - changed from incfl to incfldspl here and in the grid, incfl should only be "y","n" or "".
                  //In the SI code it needs to be a logical yes, no or ? otherwise the update logic does not work correctly.
                  // We cannot use a ? (marked for delete) in the WebUI code so we pass it as "" and the fix it in the SI code.
                  self.icepesSerialChangesCollection.forEach(function (chg) {
                     chg.incfldspl = (chg.incfl === 'y') ? $translate.instant('global.add') : $translate.instant('global.delete');
                  });
               }
               self.proof = data.dProof;
            }
            if (data.icepeserlotinitsingle) {
               self.proof = data.icepeserlotinitsingle.proof;
            }
         }
         else {
            MessageService.processMessaging(data.messaging);
         }
      });
   };

   self.addSerial = function () {
      ModalService.showModal('ic/icepe/add-serial.json', 'IcepeUpdateSerialAddCtrl as asn', $scope, function (modal) {
         $scope.dataset = self.dataset;
         self.vaAddSerialModal = modal;
      });
   };

   self.okAddSerialCallback = function (serialno) {
      if (serialno) {
         self.criteria.serialno = serialno;
         self.add();
      }
   };

   self.add = function () {
      if (self.criteria.serialno) {
         // check validation for entered serial number should not be in left master grid.   display error: 5858 “Serial Number Already Exists”
         //But record should be added to right grid if validation passes.
         var isExists = JSLINQ(self.dataset).Where(function (ser) {
            return ser.serlotno === self.criteria.serialno;
         }).Count(function (cnt) {
            return cnt;
         });
         if (isExists === 0) {
            var params = { vendno: 0, whse: self.criteria.whse, product: self.criteria.prod, userfield: '', serialno: self.criteria.serialno };
            DataService.post('api/ic/asicentry/icentryserialsstrip', { data: params, busy: true }, function (data) {
               if (data && data.serialno) {
                  self.criteria.serialno = data.serialno;
               }
               self.icepeSerialActions = [];
               self.icepeSerialActions.push({ cono: Sasc.cono, prod: self.criteria.prod, whse: self.criteria.whse, serialno: self.criteria.serialno, incfl: 'N', runno: self.criteria.runno });

               var asicEntryICEPESerialActionsRequest = {
                  icepeserialactions: self.icepeSerialActions,
                  icepeserialchanges: self.requestIcepeserialChanges,
                  icepeserialmaster: self.requestIcepeserialMaster,
                  cAction: 'Add',
                  dProof: self.proof
               };
               self.setSerialActionRequest(asicEntryICEPESerialActionsRequest);
            });
         }
         else {
            MessageService.info('global.information', 'global.serial.already.exists');
         }
      }
   };

   self.deleteChangeSerials = function () {
      var gridResult = GridService.getSelectedRecords(self.serialsChangesGrid);
      self.icepeSerialActions = [];
      gridResult.forEach(function (icseps) {
         self.icepeSerialActions.push({ cono: Sasc.cono, prod: icseps.prod, whse: icseps.whse, serialno: icseps.serialno, incfl: icseps.incfl, runno: self.criteria.runno });
      });

      var asicEntryICEPESerialActionsRequest = {
         icepeserialactions: self.icepeSerialActions,
         icepeserialchanges: self.requestIcepeserialChanges,
         icepeserialmaster: self.requestIcepeserialMaster,
         cAction: 'Delete',
         dProof: self.proof
      };
      self.setSerialActionRequest(asicEntryICEPESerialActionsRequest);
   };

   self.submit = function () {
      if (self.proof !== 0 || self.requestIcepeserialChanges.length === 0) {
         MessageService.info('global.error', 'error.proof.amount.must.be.zero.to.finish');
      }
      else {
         DataService.post('api/ic/asicentry/icepeserialok', { data: { icepeserialchanges: self.requestIcepeserialChanges, icepeserialmaster: self.requestIcepeserialMaster, dProof: self.proof } }, function (data) {
            if (data && data.messaging.length >= 0) {
               MessageService.processMessaging(data.messaging);
               $state.go('^.master', null, { reload: '^.master' });
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
            else {
               $state.go('^.master');
            }
         });
      }
   };
});

app.controller('IcepeUpdateSerialAddCtrl', function ($scope, $state, $stateParams, DataService, GridService, UserService, Sasc, Utils, Constants, MessageService) {
   var self = this;
   var usn = $scope.usn;
   self.serialno = '';

   self.submit = function () {
      if (self.serialno) {
         usn.vaAddSerialModal.destroy();
         usn.okAddSerialCallback(self.serialno);
      }
      else {
         MessageService.info('global.error', 'message.serial.number.is.required');
      }
   };

   self.cancel = function () {
      usn.vaAddSerialModal.destroy();
   };

});

app.controller('IcepeUpdateLotNumbersCtrl', function ($scope, $state, $stateParams, DataService, GridService, UserService, Sasc, Utils, Constants, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.icepesResults = [];
   self.adjustmentCollection = [];

   self.criteria = $stateParams.icepeupdatecriteria;
   self.icepa = {};
   self.lotno = '';

   self.lotsMasterGrid = {};
   if (base.criteria.cDisplayTy.toLowerCase() === 'u') {
      self.unavailfl = true;
   }
   else {
      self.unavailfl = false;
   }
   var params = { prod: self.criteria.prod };

   DataService.get('api/ic/icseps/listbyprod', { params: params, busy: true }, function (data) {
      if (data) {
         self.icepes = data;

         for (var icsep in self.icepes) {
            if (self.icepes.hasOwnProperty(icsep)) {
               self.icepesResults.push(icsep);
            }
         }
         DataService.post('api/ic/asicentry/icepelotinit', { data: { icsepssi: self.icepesResults, icepeserlotinitcriteria: self.criteria }, busy: true }, function (data) {
            if (data) {
               if (data.icepelotmaster) {
                  base.masterLot = [];
                  base.masterLot = data.icepelotmaster;
               }
               if (data.icepeserlotinitsingle) {
                  self.criteria.proof = data.icepeserlotinitsingle.proof;
               }
            }
         });
      }
   });

   self.addLotNumber = function () {
      ModalService.showModal('ic/icepe/add-new-lot.json', 'IcepeUpdateLotNumberAddCtrl as aln', $scope, function (modal) {
         self.vaAddLotModal = modal;
      });
   };

   self.okAddLotCallback = function (lotno) {
      if (lotno) {
         self.criteria.lotno = lotno;
         self.add();
      }
   };

   self.add = function () {
      if (self.criteria.lotno) {
         var lotRecord = { cono: Sasc.cono, lotno: self.criteria.lotno, qtyavail: 0, qtyunavail: 0, statusty: 'Active', prod: self.criteria.prod, whse: self.criteria.whse, opendt: Utils.getCurrentDate() };
         base.masterLot.push(lotRecord);
         DataService.post('api/ic/icsel', { data: lotRecord, busy: true }, function () { });
      }
   };

   self.submit = function () {
      if (self.criteria.proof !== 0) {
         //Proof must be '0' to continue
         MessageService.info('global.error', 'error.proof.amount.must.be.zero.to.finish');
         return;
      }
      else {
         DataService.post('api/ic/asicentry/icepelotok', { data: { icepelotmaster: base.masterLot, dProof: self.criteria.proof, iRunNo: self.criteria.runno, lUnavailFl: self.unavailfl } }, function (data) {
            if (data && data.messaging.length >= 0) {
               MessageService.processMessaging(data.messaging);
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('^.master', null, { reload: '^.master' });
            }
            else {
               $state.go('^.master', null, { reload: '^.master' });
            }
         });
      }
   };

   self.onAdjustmentChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = base.masterLot[args.row];
         var adjustment = record.qtyavail + args.value;
         if (adjustment < 0) {
            MessageService.info('global.error', 'message.cannot.reduce.lot.quantity.below.zeronot.enough.prod');
         } else {
            self.criteria.proof = args.value - args.oldValue + self.criteria.proof;
            args.oldValue = args.value;
         }
      }
   };

   self.cancel = function () {
      self.adjustmentCollection = [];
      $state.go('^.master', null, { reload: '^.master' });
   };
});

app.controller('IcepeUpdateLotNumberAddCtrl', function ($scope, $state, $stateParams, DataService, GridService, UserService, Sasc, Utils, Constants, MessageService) {
   var self = this;
   var base = $scope.base;
   var uln = $scope.uln;
   self.lotno = '';

   self.submit = function () {
      if (self.lotno) {
         var duplicateLotno = false;
         base.masterLot.forEach(function (currLot) {
            if (currLot.lotno.toLowerCase() === self.lotno.toLowerCase()) { duplicateLotno = true; }
         });

         if (duplicateLotno === true) {
            MessageService.error('global.error', 'message.lot.already.exists');
         } else {
            uln.vaAddLotModal.destroy();
            uln.okAddLotCallback(self.lotno);
         }
      }
      else {
         MessageService.info('global.error', 'message.lot.number.is.required');
      }
   };

   self.cancel = function () {
      uln.vaAddLotModal.destroy();
   };
});