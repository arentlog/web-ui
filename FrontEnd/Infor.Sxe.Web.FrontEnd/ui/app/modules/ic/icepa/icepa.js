'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addSimpleEntryBaseState('ic', 'icepa', {
      widgets: ['JOURNAL']
   });
   StateProvider.addMasterState('ic', 'icepa');
   BinAllocationStateProvider.addStates('ic', 'icepa', 'icepa.master');
   BinAllocationStateProvider.addStates('ic', 'icepa', 'icepa.updatelot');

   $stateProvider.state('icepa.updateserialnumbers', {
      url: '/update-serials',
      params: { icepaupdatecriteria: null, adjustfl: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icepa/update-serial-numbers.json');
            },
            controller: 'IcepaUpdateSerialNumbersCtrl as usn'
         }
      }
   });

   $stateProvider.state('icepa.updatelot', {
      url: '/update-lots',
      params: { icepaupdatecriteria: null, adjustfl: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icepa/update-lot.json');
            },
            controller: 'IcepaUpdateLotNumbersCtrl as uln'
         }
      }
   });

   $stateProvider.state('icepa.print', {
      url: '/print',
      params: { journalNumber: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icepa/printer-settings.json');
            },
            controller: 'IcepaPrinterSettingsCtrl as pasc'
         }
      }
   });
});

app.controller('IcepaBaseCtrl', function ($scope, $state, Utils, DataService, Sasoo, TabService) {

   var self = this;
   self.sasoo = Sasoo;
   self.module = 'icepa';
   self.PV_KEY_COUNT = 'count';
   self.PV_KEY_PRINT = 'print';
   self.PV_SECTION_SYS = 'sys';
   self.wmfl = false;
   self.serialsMasterGrid = {};
   self.masterLot = [];
   self.journalNumber = 0;
   self.isPrintJournal = false;
   self.adjustfl = true;
   self.isViewClosing = false;

   self.getRegistery = function (field) {
      var sharedPv = JSLINQ(self.sharedPVRegisteryList)
         .Where(function (sharedPVRegister) {
            return sharedPVRegister.pvfunction === self.module && sharedPVRegister.pvkeyname === field;
         })
         .FirstOrDefault(function (sharedPVRegister) {
            return sharedPVRegister;
         });
      return sharedPv.pvcharvalue;
   };

   self.getRegistrySettings = function () {
      self.sharedPVRegisteryList = [];

      self.sharedPVRegisteryList.push({ pvfunction: self.module, pvsection: self.PV_SECTION_SYS, pvkeyname: self.PV_KEY_PRINT });
      self.sharedPVRegisteryList.push({ pvfunction: self.module, pvsection: self.PV_SECTION_SYS, pvkeyname: self.PV_KEY_COUNT });

      DataService.post('api/shared/assharedentry/sharedpvregistryload', { data: self.sharedPVRegisteryList, busy: true }, function (data) {
         if (data) {
            self.sharedPVRegisteryList = data;
            var isPrintResult = self.getRegistery(self.PV_KEY_PRINT);
            if (isPrintResult) {
               self.isPrintJournal = isPrintResult === 'yes' ? true : false;
            }
            var isCountResult = self.getRegistery(self.PV_KEY_COUNT);
            if (isCountResult) {
               self.adjustfl = isCountResult === 'no' ? true : false;
            }
         }
      });
   };

   self.getRegistrySettings();

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      closedCallback: 'base.journalClosed',
      criteria: {
         currproc: self.module,
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'ic',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('icepa.master');
   };

   self.includesMaster = function () {
      return $state.includes('icepa.master');
   };

   self.journalClosed = function () {
      if (self.isPrintJournal) {
         $state.go('^.print', { journalNumber: self.journalNumber });
      }
   };

   self.raiseCloseView = function () {
      TabService.closeTab('icepa.master');
   };

   TabService.canUserCloseTab('icepa.master', function () {
      self.isViewClosing = true;
      if (self.journal && self.journal.gJrnlno !== 0) {
         if (self.isPrintJournal) {
            self.journalControl.closeJournal();
            $state.go('^.print', { journalNumber: self.journalNumber });
            return false;
         } else {
            self.journalControl.closeJournal();
            return true;
         }
      } else {
         self.raiseCloseView();
         return true;
      }
   });

});

app.controller('IcepaMasterCtrl', function ($scope, $state, $stateParams, DataService, UserService, Sasc, Utils, Constants, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   self.icsepssiCollection = [];
   self.icepaupdateresults = [];
   self.icetForNotes = {};
   self.icetTemporary = {};
   self.whseSave = '';

   if (base.icepaUpdateResults) {
      self.icepaupdateresults = base.icepaUpdateResults;
   }

   // New record to enter
   self.icepa = { adjustfl: base.adjustfl, isPrintJournal: base.isPrintJournal, qtycnt: 0, expectedQty: 0, whse: base.sasoo.whse};
   self.icepa.prevUnit = '';

   // Clear form
   self.clear = function () {
      self.icepa = {
         adjustfl: true,
         qtyonhand: '',
         qtyreservd: '',
         qtycommit: '',
         qtyavail: '',
         qtyunavail: '',
         brandcode: '',
         mfgprod: '',
         vendprod: '',
         qtycnt: 0,
         expectedQty: 0,
         whse: self.whseSave  //Keep whse for quicker data entry.
      };
   };

   //Reset button.
   self.reset = function () {
      self.whseSave = '';
      self.clear();
   };

   self.onProductChange = function () {
      if (self.icepa.prod) {
         var param = { prod: self.icepa.prod };

         DataService.get('api/ic/icsp/getbypk', { params: param, busy: true }, function (data) {
            if (data) {
               self.icepa.unit = data.unitstock;

               if (self.icepa.whse && self.icepa.prod) {
                  var params = {
                     prod: self.icepa.prod,
                     whse: self.icepa.whse
                  };

                  DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (icsp) {
                     if (icsp) {
                        self.icepa.vendprod = icsp.vendprod;
                     }
                  });
               }
               self.getQuantitites();
            }
         });
      }
   };

   self.onWhseChange = function () {
      self.getQuantitites();
   };

   self.onUnitChange = function () {
      self.getQuantitites();
   };

   self.getQuantitites = function () {

      var criteriaWhse = self.icepa.whse;
      var criteriaProd = self.icepa.prod;
      var criteriaUnit = self.icepa.unit;

      if (criteriaWhse && criteriaProd && criteriaUnit) {
         var icepaDisplayQtysriteria = { whse: criteriaWhse, prod: criteriaProd, unit: criteriaUnit };
         DataService.post('api/ic/asicentry/icepadisplayqtys/', { data: icepaDisplayQtysriteria, busy: true }, function (res) {
            if (res && res.messaging.length > 0) {
               MessageService.processMessaging(res.messaging);
               res.messaging.forEach(function (mess) {
                  // Throw the TWL warning in the user's face as well as displaying on the side
                  if (mess.messagetxt && mess.messagenum === 8737) {
                     MessageService.confirmation('global.warning', mess.messagetxt);
                  }
               });
            }
            if (res && res.icepadisplayqtysresults.length > 0) {
               var icepaDisplayQtyResult = JSLINQ(res.icepadisplayqtysresults).FirstOrDefault();
               if (icepaDisplayQtyResult) {
                  self.icepa.qtyonhand = icepaDisplayQtyResult.qtyonhand;
                  self.icepa.qtyreservd = icepaDisplayQtyResult.qtyreservd;
                  self.icepa.qtycommit = icepaDisplayQtyResult.qtycommit;
                  self.icepa.qtyavail = icepaDisplayQtyResult.qtyavail;
                  self.icepa.qtyunavail = icepaDisplayQtyResult.qtyunavail;

                  // User Hook (do not rename)
                  if (self.custICEPADisplayQtyFunc) {
                     self.custICEPADisplayQtyFunc(icepaDisplayQtyResult);
                  };
               }
            } else {
               MessageService.processMessaging(res.messaging);
            }
         });
      }
   };

   self.submit = function () {
      if (!base.journal) {
         base.journalControl.showOpenView(function () {
            self.submit();
         });
      } else {
         self.icepa.jrnlno = base.journal.gJrnlno;
         base.journalNumber = base.journal.gJrnlno;
         base.isPrintJournal = self.icepa.isPrintJournal;
         self.updateIcepa();
      }
   };

   self.updateIcepa = function () {
      if (self.icepa.prod && self.icepa.whse) {
         self.paramsUpdateICEPA = {
            prod: self.icepa.prod,
            whse: self.icepa.whse
         };

         //Save off whse to make data entry quicker.
         self.whseSave = self.icepa.whse;

         // User Hook (do not rename)
         if (self.updateIcepaCriteria) {
            self.updateIcepaCriteria();
         }

         DataService.get('api/ic/icsw/getbypk', { params: self.paramsUpdateICEPA, busy: true }, function (icsw) {
            if (icsw) {
               base.wmfl = icsw.wmfl;
               self.saveRegisterySettings();
               if (icsw.serlottype.toLowerCase() === Constants.LOT) {
                  $state.go('^.updatelot', { icepaupdatecriteria: self.icepa, adjustfl: base.adjustfl });
               } else if (icsw.serlottype.toLowerCase() === Constants.SERIAL) {

                  var cSerLotTy = '';

                  // extracted from icsnpo.gcn - logic to determine if we need to enter Serial Number details
                  if ((Sasc.icsnpofl === false && icsw.snpocd === '') || (icsw.snpocd.toLowerCase() === 's')) {
                     cSerLotTy = '';
                  } else {
                     cSerLotTy = icsw.snpocd !== '' ? icsw.snpocd : 'y';
                  }

                  // if cSerLotTy is not blank the we are sent to Serials screen to enter the Serial Number details otherwise we just run finalUpdate
                  if (cSerLotTy !== '') {
                     // Launch the Serial Assignment Screen
                     $state.go('^.updateserialnumbers', { icepaupdatecriteria: self.icepa, adjustfl: base.adjustfl });
                  } else {
                     self.finalUpdate();
                  }
               } else {
                  self.finalUpdate();
               }
            }
         });
      }
   };

   self.saveRegisterySettings = function () {
      var print = base.getRegistery(base.PV_KEY_PRINT);
      var count = base.getRegistery(base.PV_KEY_COUNT);

      if ((base.isPrintJournal !== (print === 'yes' ? true : false)) || (base.adjustfl !== (count === 'no' ? true : false))) {
         base.sharedPVRegisteryList = [];
         base.sharedPVRegisteryList.push({ pvfunction: base.module, pvsection: base.PV_SECTION_SYS, pvkeyname: base.PV_KEY_PRINT, pvcharvalue: self.icepa.isPrintJournal === true ? 'yes' : 'no' });
         base.sharedPVRegisteryList.push({ pvfunction: base.module, pvsection: base.PV_SECTION_SYS, pvkeyname: base.PV_KEY_COUNT, pvcharvalue: base.adjustfl === true ? 'no' : 'yes' });

         DataService.post('api/shared/assharedentry/sharedpvregistrysave', { data: base.sharedPVRegisteryList, busy: true }, function () { });
      }
   };

   self.getIcet = function (rowid) {
      var icetParams = {
         fillmode: true
      };
      DataService.get('api/ic/icet/getbyrowid/' + rowid, { params: icetParams, busy: true }, function (data) {
         self.icet = data;
      });
   };

   //Get or Assign the ICET.NotesId field.  This is a DB Sequence that is the Primary Key if
   //the Notes are used for the ICET Transaction.  If they've gotten to the Transaction Detail screen,
   //we need to assign this so the WebPart can use it if they decide to do something with Notes.  Unfortunately,
   //this means that a sequence is 'burned' for each ICET.  There's no other way around this since we need to have
   //a Sequence available before they go to the Notes screen (which is only a possibility they would go there).
   self.getNotesId = function () {
      self.icetForNotes = {};

      var requestCriteria = {
         icetrowid: self.icetTemporary.rowID.toString(),
         createfl: true,
         icetnotesid: self.icetTemporary.notesid
      };

      //NOTE: This call expects a true Progress Rowid, not a string representation of it provided up from a
      //backend call.  (tip: for that scenario, you need the get call: geticetnotesid.)
      DataService.post('api/shared/asnotescom/geticetnotesidbyrowid', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            //These are the 5 keys (in order) required for the Context.  For the NotesContext,
            //it uses the NotesId and the Product.  For Business Context, it uses the Whse, Prod,
            //PostDt, and TransType.
            self.icetForNotes.whse = self.icetTemporary.whse;
            self.icetForNotes.prod = self.icetTemporary.prod;
            self.icetForNotes.postdt = self.icetTemporary.postdt;
            self.icetForNotes.transtype = self.icetTemporary.transtype;
            self.icetForNotes.notesid = data.icetnotesid; //Next Sequence # (if create), or existing Sequence # (if exists)
         }
      });
   };

   self.onIcepaRecordSection = function () {
      self.icetTemporary = {};
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         var icetParams = {
            fillmode: true
         };
         DataService.get('api/ic/icet/getbyrowid/' + record.iCETRowID, { params: icetParams, busy: true }, function (data) {
            //Need a fully hydrated row because we need more elements of the key for Business Context and Notes.
            self.icetTemporary = data;
            self.getNotesId();
         });
      } else {
         self.icetForNotes = {};
      }
   };

   self.finalUpdate = function () {
      // Get Icseps List
      var params = { prod: self.icepa.prod };
      DataService.get('api/ic/icseps/listbyprod', { params: params, busy: true }, function (data) {
         if (data) {
            var icseps = data;
            self.icsepssiCollection = [];
            icseps.forEach(function (icsep) {
               icsep.incfl = icsep.incfl ? 'Y' : 'N';
               self.icsepssiCollection.push(icsep);
            });

            //Binding updated adjustfl value before final update operation
            self.icepa.adjustfl = base.adjustfl;

            var asicentryICEPAUpdateRequestAPI = { icsepssi: self.icsepssiCollection, icepaupdatecriteria: self.icepa };
            DataService.post('api/ic/asicentry/icepaupdate', { data: asicentryICEPAUpdateRequestAPI, busy: true }, function (data2) { // Update
               if (data2) {
                  if (!MessageService.processMessaging(data2.messaging)) {
                     // Check for any confirmation messages
                     var question = MessageService.getQuestionMessages(data2.messaging);
                     if (question) {
                        MessageService.yesNo('global.confirmation', question, function () { //yes
                           self.icepa.negnetavailasked = true;
                           self.icepa.negnetavailanswer = true;
                           self.updateIcepa();
                        }, function () { //No
                           self.icepa.negnetavailasked = true;
                           self.icepa.negnetavailanswer = false;
                           self.updateIcepa();
                        });
                     } else {
                        if (data2.icepaupdateresults) {
                           var updatedRecord = data2.icepaupdateresults;
                           if (updatedRecord) {
                              self.getIcet(updatedRecord[0].iCETRowID);
                              if (!base.icepaUpdateResults) {
                                 base.icepaUpdateResults = [];
                              }
                              base.icepaUpdateResults.push(updatedRecord[0]);
                              self.icepaupdateresults = base.icepaUpdateResults;
                              // Bin-allocation
                              if (base.wmfl) {
                                 self.warehouseManager();
                              }
                              self.clear();
                              MessageService.info('global.information', 'message.save.operation.completed.successfully');
                           }
                        }
                     }
                  }
               }
            });
         } else {
            MessageService.processMessaging(data.messaging);
         }
      });
   };

   //Callbacks
   self.binAllocationSavedCallback = function (wmbinassignment) {
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmbinassignment) {
      $state.go('^');
   };

   //Warehouse Manager
   self.warehouseManager = function () {

      self.quantity = 0;
      self.truequantity = 0;

      if (self.icepa) {
         if (!self.icepa.adjustfl) {
            self.quantity = self.icepa.qtycnt - self.icepa.expectedQty;
         } else {
            self.quantity = self.icepa.qtycnt;
         }
         self.truequantity = self.quantity;
         self.quantity = self.quantity < 0 ? self.quantity * -1 : self.quantity;

         var wmbinassignCriteria = {
            altwhse: '',
            currproc: base.module,
            jrnlno: base.journal.gJrnlno,
            kitfl: false,
            lineno: 0,
            ourproc: base.module,
            ordertype: 'i',
            orderno: 0,
            ordersuf: 0,
            potype: self.truequantity < 0 ? 'rm' : '',
            prod: self.icepa.prod,
            returnfl: self.truequantity < 0 ? true : false,
            seqno: 0,
            skipnonkitlogic: false,
            stkqtyship: self.quantity,
            stkqtyrcv: self.quantity,
            unit: self.icepa.unit,
            vamodule: '',
            wmadjtype: 'buy',
            wmqtyrcv: 0,
            whse: self.icepa.whse
         };
      }
      $state.go('.bin-allocation', {
         criteria: wmbinassignCriteria,
         binAllocationDisabled: false,
         submittedCallback: 'mst.binAllocationSavedCallback',
         actionsCallback: 'mst.binAllocationActionsCallback'
      });
   };

});

app.controller('IcepaUpdateSerialNumbersCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, UserService, Sasc, Utils, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.criteria = $stateParams.icepaupdatecriteria;
   self.icepa = {};
   self.criteria.runno = 0;
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

   self.criteria.adjustfl = base.adjustfl;
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

   self.moveRight = function () {
      var gridResult = GridService.getSelectedRecords(self.serialsMasterGrid);
      self.icepeSerialActions = [];
      gridResult.forEach(function (icseps) {
         self.icepeSerialActions.push({ cono: Sasc.cono, prod: icseps.prod, whse: icseps.whse, serialno: icseps.serlotno, rectype: icseps.statusty, incfl: 'N' });
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
         self.icepeSerialActions.push({ cono: Sasc.cono, prod: icseps.prod, whse: icseps.whse, serialno: icseps.serialno, incfl: icseps.incfl });
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
                  // Note - changed from incfl to incfldspl here and in the grid, incfl should only be "y","n" or "". In the SI code it needs to be a logical yes, no or ? otherwise the update logic does not work correctly.
                  //        We cannot use a ? (marked for delete) in the WebUI code so we pass it as "" and the fix it in the SI code.
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
      ModalService.showModal('ic/icepa/add-serial.json', 'IcepaUpdateSerialAddCtrl as asn', $scope, function (modal) {
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
               self.icepeSerialActions.push({ cono: Sasc.cono, prod: self.criteria.prod, whse: self.criteria.whse, serialno: self.criteria.serialno, incfl: 'N' });

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
         self.icepeSerialActions.push({ cono: Sasc.cono, prod: icseps.prod, whse: icseps.whse, serialno: icseps.serialno, incfl: icseps.incfl });
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
               self.Icsenicsepssi = [];
               var asicentryICEPAUpdateRequestAPI = { icsepssi: data.icsepssi, icepaupdatecriteria: self.criteria };

               DataService.post('api/ic/asicentry/icepaupdate', { data: asicentryICEPAUpdateRequestAPI, busy: true }, function (data) { // Update
                  if (data) {
                     if (!MessageService.processMessaging(data.messaging)) {
                        // Check for any confirmation messages
                        var question = MessageService.getQuestionMessages(data.messaging);
                        if (question) {
                           MessageService.yesNo('global.confirmation', question, function () { //yes
                              self.icepa.negnetavailasked = true;
                              self.icepa.negnetavailanswer = true;
                              self.updateIcepaRecord();
                           }, function () { //No
                              self.icepa.negnetavailasked = true;
                              self.icepa.negnetavailanswer = false;
                              self.updateIcepaRecord();
                           });
                        } else {
                           if (data.icepaupdateresults) {
                              if (!base.icepaUpdateResults) {
                                 base.icepaUpdateResults = [];
                              }
                              base.icepaUpdateResults.push(data.icepaupdateresults[0]);
                              $state.go('^.master', null, { reload: '^.master' });
                              MessageService.info('global.information', 'message.save.operation.completed.successfully');
                           }
                        }
                     }
                  }
               });
            }
            else {
               $state.go('^.master');
            }
         });
      }
   };

   self.updateIcepaRecord = function () {
      var asicentryICEPAUpdateRequestAPI = { icsepssi: self.icsepssiCollection, icepaupdatecriteria: self.icepa };
      DataService.post('api/ic/asicentry/icepaupdate', { data: asicentryICEPAUpdateRequestAPI, busy: true }, function (data) { // Update
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               // Check for any confirmation messages
               var question = MessageService.getQuestionMessages(data.messaging);
               if (question) {
                  MessageService.yesNo('global.confirmation', question, function () { //yes
                     self.icepa.negnetavailasked = true;
                     self.icepa.negnetavailanswer = true;
                     self.updateIcepa();
                  }, function () { //No
                     self.icepa.negnetavailasked = true;
                     self.icepa.negnetavailanswer = false;
                     self.updateIcepa();
                  });
               } else {
                  if (data.icepaupdateresults) {
                     var updatedRecord = data.icepaupdateresults;
                     if (updatedRecord) {
                        if (!base.icepaUpdateResults) {
                           base.icepaUpdateResults = [];
                        }
                        base.icepaUpdateResults.push(updatedRecord[0]);
                        self.icepaupdateresults = base.icepaUpdateResults;
                        self.clear();
                        MessageService.info('global.information', 'message.save.operation.completed.successfully');
                     }
                  }
               }
            }
         }
      });
   };
});

app.controller('IcepaUpdateSerialAddCtrl', function ($scope, $state, $stateParams, DataService, GridService, UserService, Sasc, Utils, MessageService) {
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

app.controller('IcepaUpdateLotNumbersCtrl', function ($scope, $state, $stateParams, DataService, GridService, UserService, Sasc, Utils, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.icepesResults = [];

   self.criteria = angular.copy($stateParams.icepaupdatecriteria);
   self.criteria.adjustfl = base.adjustfl;
   self.icepa = self.criteria;
   self.lotno = '';

   self.lotsMasterGrid = {};

   //This is needed so we can hide other views appropriately.
   self.isUpdateLot = function () {
      return $state.is('icepa.updatelot');
   };

   //Warehouse Manager
   self.warehouseManager = function () {

      self.quantity = 0;
      self.truequantity = 0;

      if (self.icepa) {
         if (!self.icepa.adjustfl) {
            self.quantity = self.icepa.qtycnt - self.icepa.expectedQty;
         } else {
            self.quantity = self.icepa.qtycnt;
         }
         self.truequantity = self.quantity;
         self.quantity = self.quantity < 0 ? self.quantity * -1 : self.quantity;

         var wmbinassignCriteria = {
            altwhse: '',
            currproc: base.module,
            jrnlno: base.journal.gJrnlno,
            kitfl: false,
            lineno: 0,
            ourproc: base.module,
            ordertype: 'i',
            orderno: 0,
            ordersuf: 0,
            potype: self.truequantity < 0 ? 'rm' : '',
            prod: self.icepa.prod,
            returnfl: self.truequantity < 0 ? true : false,
            seqno: 0,
            skipnonkitlogic: false,
            stkqtyship: self.quantity,
            stkqtyrcv: self.quantity,
            unit: self.icepa.unit,
            vamodule: '',
            wmadjtype: 'buy',
            wmqtyrcv: 0,
            whse: self.icepa.whse
         };
      }
      $state.go('.bin-allocation', {
         criteria: wmbinassignCriteria,
         binAllocationDisabled: false,
         submittedCallback: 'uln.binAllocationSavedCallback',
         actionsCallback: 'uln.binAllocationActionsCallback'
      });
   };

   //Callbacks
   self.binAllocationSavedCallback = function (wmbinassignment) {
      $state.go('icepa.master', null, { reload: 'icepa.master' });
   };

   self.binAllocationActionsCallback = function (wmbinassignment) {
      $state.go('icepa.master', null, { reload: 'icepa.master' });
   };

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
                  self.initialProofQty = self.criteria.proof;
               }
            }
         });
      }
   });

   self.addLotNumber = function () {
      ModalService.showModal('ic/icepa/add-new-lot.json', 'IcepaUpdateLotNumberAddCtrl as aln', $scope, function (modal) {
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
         DataService.post('api/ic/asicentry/icepelotok', { data: { icepelotmaster: base.masterLot, dProof: self.criteria.proof, iRunNo: 0, lUnavailFl: true } }, function (data) {
            if (data && data.messaging.length >= 0) {
               MessageService.processMessaging(data.messaging);
               self.updateIcepaRecord(data.icsepssi);
            }
            else {
               $state.go('^.master', null, { reload: '^.master' });
            }
         });
      }
   };

   self.updateIcepaRecord = function (icsepssi) {
      var asicentryICEPAUpdateRequestAPI = { icsepssi: icsepssi, icepaupdatecriteria: self.criteria };
      DataService.post('api/ic/asicentry/icepaupdate', { data: asicentryICEPAUpdateRequestAPI, busy: true }, function (data) { // Update
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               // Check for any confirmation messages
               var question = MessageService.getQuestionMessages(data.messaging);
               if (question) {
                  MessageService.yesNo('global.confirmation', question, function () { //yes
                     self.icepa.negnetavailasked = true;
                     self.icepa.negnetavailanswer = true;
                     self.updateIcepa();
                  }, function () { //No
                     self.icepa.negnetavailasked = true;
                     self.icepa.negnetavailanswer = false;
                     self.updateIcepa();
                  });
               } else {
                  if (data.icepaupdateresults) {
                     var updatedRecord = data.icepaupdateresults;
                     if (updatedRecord) {
                        if (!base.icepaUpdateResults) {
                           base.icepaUpdateResults = [];
                        }
                        base.icepaUpdateResults.push(updatedRecord[0]);
                        MessageService.info('global.information', 'message.save.operation.completed.successfully');
                        // Bin-allocation
                        if (base.wmfl) {
                           self.warehouseManager();
                        } else {
                           $state.go('^.master', null, { reload: '^.master' });
                        }
                     }
                  }
               }
            }
         }
      });
   };

   self.onAdjustmentChange = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = base.masterLot[args.row];
         var adjustment = record.qtyavail + args.value;
         if (adjustment < 0) {
            MessageService.info('global.error', 'message.cannot.reduce.lot.quantity.below.zeronot.enough.prod');
         }
         if (base.masterLot) {
            var adjSum = JSLINQ(base.masterLot)
               .Select(function (adj) {
                  return adj.qtyadj;
               });
            var adjTotSum = 0;
            for (var i = 0; i < adjSum.items.length; i++) {
               adjTotSum += adjSum.items[i];
            }
            if (adjTotSum === 0) {
               self.criteria.proof = self.initialProofQty;
            }
            else {
               self.criteria.proof = parseFloat((adjTotSum + self.initialProofQty).toFixed(2));
            }
         }
      }
   };

   self.cancel = function () {
      $state.go('^.master', null, { reload: '^.master' });
   };
});

app.controller('IcepaUpdateLotNumberAddCtrl', function ($scope, $state, $stateParams, DataService, GridService, UserService, Sasc, Utils, MessageService) {
   var self = this;
   var base = $scope.base;
   var uln = $scope.uln;

   self.lotno = '';

   self.submit = function () {
      if (self.lotno) {
         var duplicateLotno = false;
         var currLot = {};

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

app.controller('IcepaPrinterSettingsCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.PRINTER_INSTANCE = 'icepa-icej';
   self.journalNumber = $stateParams.journalNumber;
   // To check the printer validation
   self.printOK = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails; // If it required, printerFinalSettings object will update with additional settings based on menu function
            self.savePrinterSettings();
         }
      });
   };

   //Final printer settings save with additional details(if any additional)
   //self.printerSettings = self.printerControl.printerSettings;   //to access the printer screen data
   //if any additional data required , use pasc.additionalSettings.properties and update the database input object: pasc is ApeePrinterSettingsCtrl
   self.savePrinterSettings = function () {
      var printerCollection = [];

      printerCollection.push(self.printerFinalSettings);  // based on API call input data like collection etc..this extra modification required.
      self.printerFinalSettings.printerinstance = self.PRINTER_INSTANCE;
      self.printerData = { printerSettings: self.printerFinalSettings, iJrnlNo: self.journalNumber };

      DataService.post('api/ic/asicentry/icepajournalprintlaunch', { data: self.printerData, busy: true }, function () {
         base.isPrintJournal = false;
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         if (base.isViewClosing) {
            base.raiseCloseView();
         }
         else {
            $state.go('^.master', null, { reload: '^.master' });
         }
      });
   };
});


