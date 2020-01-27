'use strict';

app.config(function ($stateProvider, StateProvider, ProductWarehouseUsageStateProvider, TrendInformationStateProvider, AdjustersInformationStateProvider) {
   StateProvider.addInquiryBaseState('ic', 'icip', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icip');

   $stateProvider.state('icip.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/detail.json');
            },
            controller: 'IcipDetailCtrl as dtl'
         }
      },
      resolve: {
         accessTest: function ($q, $stateParams, DataService, MessageService, TabService) {
            var deferred = $q.defer();
            if ($stateParams.pk) {
               var crit = {
                  tablename: 'icsd',
                  whse: $stateParams.pk2
               };

               DataService.post('/web/api/shared/checkhyperlinkaccess', { data: crit, busy: true }, function (data) {
                  if (data.success) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                     MessageService.error('global.error', 'global.security.violations.hyperlink');
                     TabService.closeTab('icip');
                  }
               });
            } else {
               // If no pk param passed (probably means we are using rowid from the grid), then bypass the check
               deferred.resolve();
            }
            return deferred.promise;
         }
      }
   });

   $stateProvider.state('icip.detail.unavail', {
      url: '/unavailable',
      params: { prod: null, whse: null, reasunavty: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/tabs/unavailable-detail.json');
            },
            controller: 'IcipDetailUnavailableDetailCtrl as idudc'
         }
      }
   });

   $stateProvider.state('icip.detail.transaction', {
      url: '/transaction',
      params: { jrnlno: null, setno: null, rowId: null, icetRowId: null, custno: null, prod: null, whse: null, transtype: null, postdt: null, noteid: null, module: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/transaction-detail/transaction-detail.json');
            },
            controller: 'IcipDetailTransactionDetailCtrl as idtdc'
         }
      }
   });

   $stateProvider.state('icip.detail.altvendors', {
      url: '/alternate-vendors',
      params: { prod: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/replenishment/altvendors.json');
            },
            controller: 'IcipDetailReplenishmentAltVendorsCtrl as idrvc'
         }
      }
   });

   $stateProvider.state('icip.detail.roai', {
      url: '/roai',
      params: { prod: null, whse: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/replenishment/roai.json');
            },
            controller: 'IcipDetailReplenishmentROAICtrl as idrrc'
         }
      }
   });

   $stateProvider.state('icip.detail.rollup', {
      url: '/rollup',
      params: { prod: null, whse: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/replenishment/rollup.json');
            },
            controller: 'IcipDetailReplenishmentRollupCtrl as idrc'
         }
      }
   });

   $stateProvider.state('icip.detail.gnrlbalances', {
      url: '/general-balances',
      params: { prod: null, whse: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/general/balances.json');
            },
            controller: 'IcipDetailGeneralBalancesCtrl as idgbc'
         }
      }
   });

   $stateProvider.state('icip.detail.fifo', {
      url: '/fifo',
      params: { prod: null, whse: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/general/fifo.json');
            },
            controller: 'IcipDetailGeneralFIFOCtrl as idgfc'
         }
      }
   });

   $stateProvider.state('icip.detail.serial', {
      url: '/serial',
      params: { prod: null, whse: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/general/serial.json');
            },
            controller: 'IcipDetailGeneralSerialCtrl as idgsc'
         }
      }
   });

   $stateProvider.state('icip.detail.serial.history', {
      url: '/history',
      params: { prod: null, whse: null, serialno: null },
      views: {
         serialhistory: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/general/serial-history.json');
            },
            controller: 'IcipDetailGeneralSerialHistoryCtrl as idgshc'
         }
      }
   });

   $stateProvider.state('icip.detail.lot', {
      url: '/lot',
      params: { prod: null, whse: null },
      views: {
         detailChildView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/general/lot.json');
            },
            controller: 'IcipDetailGeneralLotCtrl as idglc'
         }
      }
   });

   $stateProvider.state('icip.detail.lot.history', {
      url: '/history',
      params: { prod: null, whse: null, lotno: null },
      views: {
         lothistory: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icip/general/lot-history.json');
            },
            controller: 'IcipDetailGeneralLotHistoryCtrl as idglhc'
         }
      }
   });

   ProductWarehouseUsageStateProvider.addStates('ic', 'icip', 'icip.detail');
   TrendInformationStateProvider.addStates('ic', 'icip', 'icip.detail');
   AdjustersInformationStateProvider.addStates('ic', 'icip', 'icip.detail');
});

app.controller('IcipBaseCtrl', function ($state) {
   var self = this;
   self.criteria = {};
   self.unitstock = 'each';

   self.isMaster = function () {
      return $state.is('icip.master');
   };

   self.includesMaster = function () {
      return $state.includes('icip.master');
   };

   self.isDetail = function () {
      return $state.is('icip.detail');
   };

   self.isSerial = function () {
      return $state.is('icip.detail.serial');
   };

   self.isLot = function () {
      return $state.is('icip.detail.lot');
   };

   self.includesDetail = function () {
      return $state.includes('icip.detail');
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      if (self.criteria.prod || self.criteria.whse) {
         self.whse = self.criteria.whse;
         self.prod = self.criteria.prod;
         $state.go('icip.detail', { pk: self.criteria.prod, pk2: self.criteria.whse });
      }
   };
});

app.controller('IcipSearchCtrl', function ($scope, Utils, Sasoo) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.whse = Sasoo.whse;
   };

   // Perform search
   self.submit = function () {
      // Get data
      base.search();
   };

   self.productChange = function () {
      if (base.criteria.prod) {
         base.search();
      }
   }
});

app.controller('IcipMasterCtrl', function ($scope, Sasoo) {
   var self = this;
   var base = $scope.base;
   self.ready = function () {
      base.criteria.whse = base.criteria.whse ? base.criteria.whse : Sasoo.whse;
   };
});

app.controller('IcipDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Constants, ModalService, GridService) {
   var self = this;
   var base = $scope.base;

   self.prod = $stateParams.pk ? $stateParams.pk : '';
   self.whse = $stateParams.pk2 ? $stateParams.pk2 : '';
   base.unitstock = '';
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + self.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + self.whse;
   self.getIcipProduct = function () {
      var icipprodCriteria = {
         prod: self.prod,
         whse: self.whse
      };
      DataService.post('api/ic/asicwhseprod/icipfetchproduct', { data: icipprodCriteria, busy: true }, function (icipproduct) {
         if (icipproduct) {
            if (icipproduct.cataloghidden) {
               MessageService.yesNo('global.confirmation', 'question.product.found.in.catalog.accept.catalog.item', function yes() {
                  self.icipproduct = icipproduct;
                  //This gives us the value from the Catalog.
                  base.unitstock = self.icipproduct.unitstock;
               }, function no() {
                  base.criteria.prod = '';
               });
            } else {
               self.icipproduct = icipproduct;
            }

            base.unitstock = self.icipproduct.unitstock;
         }
      });
   };

   self.showCrossReferenceProducts = function () {
      ModalService.showModal('ic/icip/cross-reference-products.json', null, $scope, function (modal) {
         self.crossrefprodModal = modal;
      });
   };

   self.crossrefProdCancelClicked = function () {
      self.crossrefprodModal.destroy();
   };

   self.crossrefProdOkClicked = function () {
      var selectedRecord = GridService.getSelectedRecord(base.crossrefprodgrid);
      if (selectedRecord) {
         base.criteria.prod = selectedRecord.prod;
         self.prod = selectedRecord.prod;
      }
      self.crossrefprodModal.destroy();
   };

   self.checkIcsc = function () {
      var params = { catalog: self.prod };
      DataService.get('api/ic/icsc/existsbypk', { params: params, busy: true }, function (data) {
         self.isIcscProduct = data;
      });
   };

   self.checkIcsp = function () {
      var params = { prod: self.prod };
      DataService.get('api/ic/icsp/existsbypk', { params: params, busy: true }, function (data) {
         self.isIcspProduct = data;
      });
   };

   self.checkKitProduct = function () {
      var kitParams = {
         prod: self.prod,
         fldlist: 'kittype'
      };
      DataService.get('api/ic/icsp/getbypk', { params: kitParams, busy: true }, function (icsp) {
         if (icsp) {
            self.isKitProduct = icsp.kittype;
         }
      });
   };

   if (self.prod) {
      self.checkIcsc();
      self.checkIcsp();
      self.checkKitProduct();
      base.criteria.prod = self.prod;
      base.criteria.whse = self.whse;
      base.whse = self.whse;
      base.prod = self.prod;
      var crossrefCriteria = {
         prod: self.prod,
         whse: self.whse,
         type: null,
         custno: null,
         shipto: null,
         vendno: null,
         customparam: null,
         userfield: null
      };
      DataService.post('api/ic/asicwhseprod/checkproductcrossreference', { data: crossrefCriteria, busy: true }, function (response) {
         if (response && response.checkprodxrefresults && response.checkprodxrefresults.length) {
            self.checkprodxrefresults = response.checkprodxrefresults;
            self.showCrossReferenceProducts();
         } else {
            self.getIcipProduct();
         }
      });
   }
});

app.controller('IcipDetailWhseUserFieldsCtrl', function ($stateParams, DataService) {
   var self = this;
   if ($stateParams.pk && $stateParams.pk2) {
      var params = {
         prod: $stateParams.pk,
         whse: $stateParams.pk2,
         fillmode: true
      };
      self.icsw = DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true });
   }
});

app.controller('IcipDetailProdUserFieldsCtrl', function ($stateParams, DataService) {
   var self = this;
   if ($stateParams.pk) {
      var params = {
         prod: $stateParams.pk,
         fillmode: true
      };
      self.icsp = DataService.getResource('api/ic/icsp/getbypk', { params: params, busy: true });
   }
});

app.controller('IcipDetailCoresCtrl', function ($stateParams, DataService, $translate) {
   var self = this;
   self.getProductDescription = function (prod, isDirtyCore) {
      if (prod) {
         var descParams = {
            prod: prod,
            fldlist: 'descrip1,descrip2'
         };
         DataService.get('api/ic/icsp/getbypk', { params: descParams, busy: true }, function (data) {
            if (data) {
               if (isDirtyCore) {
                  self.dirtyCoreDescription = data.descrip1 + data.descrip2;
               } else {
                  self.impliedCoreDescription = data.descrip1 + data.descrip2;
               }
            }
         });
      }
   };

   if ($stateParams.pk) {
      var params = {
         prod: $stateParams.pk,
         fillmode: true
      };
      DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (icsp) {
         if (icsp) {
            self.icsp = icsp;
            self.getProductDescription(icsp.impliedcoreprod, false);
            if (icsp.prodtype) {
               switch (icsp.prodtype.toUpperCase()) { //ignore jslint - correct indentation
                  case 'S': //ignore jslint - correct indentation
                     self.prodtype = $translate.instant('global.standard.product'); //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case 'R': //ignore jslint - correct indentation
                     self.prodtype = $translate.instant('global.remanufactured.product'); //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case 'I': //ignore jslint - correct indentation
                     self.prodtype = $translate.instant('global.implied.core'); //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  case 'C': //ignore jslint - correct indentation
                     self.prodtype = $translate.instant('global.dirty.core'); //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
                  default: //ignore jslint - correct indentation
                     self.prodtype = ''; //ignore jslint - correct indentation
                     break; //ignore jslint - correct indentation
               }
            }
            self.getProductDescription(icsp.dirtycoreprod, true);
         }
      });
   }
});

app.controller('IcipDetailServiceWarrantyCtrl', function ($stateParams, DataService, $translate) {
   var self = this;

   self.getJobDescription = function (typecd) {
      self.jobdesc = '';
      var swsjParams = {
         jobtype: typecd,
         fldlist: 'descrip'
      };
      DataService.get('api/sw/swsj/getbypk', { params: swsjParams, busy: true }, function (swsj) {
         if (swsj) {
            self.jobdesc = swsj.descrip;
         }
      });
   };

   if ($stateParams.pk) {
      var params = {
         prod: $stateParams.pk
      };
      DataService.get('api/sw/swicsp/getbypk', { params: params, busy: true }, function (swicsp) {
         if (swicsp) {
            self.swicsp = swicsp;
            if (self.swicsp.typecd) {
               self.getJobDescription(self.swicsp.typecd);
               self.autoCreate = self.swicsp.setupfl.toUpperCase() === 'Y' ? $translate.instant('global.yes') :
                  self.swicsp.setupfl.toUpperCase() === 'N' ? $translate.instant('global.no') : self.swicsp.setupfl.toUpperCase() === 'O' ? $translate.instant('global.optional') : '';
            }
         }
      });
   }
});

app.controller('IcipDetailUnavailableCtrl', function ($state, $stateParams, DataService) {
   var self = this;
   self.criteria = { reasunavty: '', vendno: null, userfield: '' };
   self.criteria.prod = $stateParams.pk;
   self.criteria.whse = $stateParams.pk2;

   self.filter = function () {
      if (self.criteria.whse) {
         DataService.post('api/ic/asicwhseprod/loadunavailablett', { data: self.criteria, busy: true }, function (unavailResults) {
            if (unavailResults) {
               self.unavailResults = unavailResults;
            }
         });
      }
   };

   self.filter();

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.unavail', { prod: record.prod, whse: record.whse, reasunavty: record.reasunavty });
   };

   self.vendorNumberClicked = function (e, args) {
      $state.go('apiv.detail', { pk: args[0].item.arpvendno });
   };
});

app.controller('IcipDetailUnavailableDetailCtrl', function ($stateParams, $translate, Constants, DataService) {
   var self = this;
   self.prod = $stateParams.prod;
   self.whse = $stateParams.whse;
   self.reasunavty = $stateParams.reasunavty;

   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + self.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + self.whse;

   if (self.prod && self.whse && self.reasunavty) {
      var params = { prod: self.prod, whse: self.whse, batchsize: null };
      DataService.get('api/ic/icet/listbyprod', { params: params, busy: true }, function (data) {
         if (data) {
            self.icets = JSLINQ(data).Where(function (icet) { return icet.transtype === 'un' && icet.reasunavty === self.reasunavty; }).ToArray();
         }
      });
   }
});

app.controller('IcipDetailTransactionsCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, ConfigService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.selectedModules = ['IC', 'OE', 'PO', 'WT', 'KP', 'VA', 'AP', 'PD'];
   self.selectedTransactions = ['CA', 'IN', 'RE', 'RI', 'RO', 'UN', 'SA'];
   self.isManagedFlag = false;
   self.criteria = {
      prod: $stateParams.pk,
      whse: $stateParams.pk2,
      datethrough: null,
      types: null,
      modules: null,
      jrnlno: null,
      setno: null,
      invty: null,
      unit: base.unitstock,
      customparam: null,
      userfield: null,
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   self.getTransactions = function () {
      self.criteria.types = self.selectedTransactions.join();
      self.criteria.modules = self.selectedModules.join();
      DataService.post('api/ic/asicwhseprod/createictranstt', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.ictransResults = data.createictransttresults;
            self.ictransSingle = data.createictransttsingle;
            if (data.lMoreRecords) {
               MessageService.alert('global.warning', "global.record.count.limit.has.been.reached");
            }
         }
      });
   };

   self.getIcsd = function () {
      if ($stateParams.pk2) {
         var params = { whse: $stateParams.pk2, fldlist: 'managedfl' };
         DataService.get('api/ic/icsd/getbypk', { params: params, busy: true }, function (icsd) {
            if (icsd) {
               self.isManagedFlag = icsd.managedfl;
               self.criteria.invty = 'd';
            }
         });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.transaction', {
         jrnlno: record.iJrnlNo,
         setno: record.iSetNo,
         rowId: record.rRowid,
         icetRowId: record.cICETRowId,
         custno: record.custno,
         prod: record.cProd,
         whse: record.cWhse,
         transtype: record.cTransType,
         postdt: record.dtPosted,
         noteid: record.iICETNotesID,
         module: record.cModule
      });
   };

   self.navigateToInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.cModule) {
         switch (currentRow.cModule.toUpperCase()) { //ignore jslint - correct indentation
            case 'OE': //ignore jslint - correct indentation
               $state.go('oeio.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'KP': //ignore jslint - correct indentation
               $state.go('kpiw.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'PO': //ignore jslint - correct indentation
               $state.go('poip.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'VA': //ignore jslint - correct indentation
               $state.go('vaif.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'WT': //ignore jslint - correct indentation
               $state.go('wtit.detail', { pk: currentRow.iOrderNo, pk2: currentRow.iOrderSuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };

   self.navigatetoglij = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('glij.detail', { pk: currentRow.iJrnlNo });
      }
   };

   self.navigateAricOrApiv = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.cModule) {
         if (currentRow.cModule.toUpperCase() === 'OE') {
            $state.go('aric.detail', { pk: currentRow.custno });
         } else if (currentRow.cModule.toUpperCase() === 'PO') {
            $state.go('apiv.detail', { pk: currentRow.dVendNo });
         }
      }
   };

   self.getIcsd();
   self.getTransactions();
});

//Alias: idtdc
app.controller('IcipDetailTransactionDetailCtrl', function ($stateParams, $translate, Constants, DataService, Sasoo) {
   var self = this;
   self.jrnlno = $stateParams.jrnlno;
   self.setno = $stateParams.setno;
   self.rowId = $stateParams.rowId;
   self.icetRowId = $stateParams.icetRowId;
   self.custno = $stateParams.custno;
   self.prod = $stateParams.prod;
   self.whse = $stateParams.whse;
   self.transtype = $stateParams.transtype;
   self.postdt = $stateParams.postdt;
   self.noteid = $stateParams.noteid;
   self.module = $stateParams.module;
   self.seecostfl = Sasoo.seecostfl;
   self.transdetResult = {};
   self.icetForNotes = {};

   self.subTitle = $translate.instant('global.journal.number') + Constants.LABEL_DELIMITER + self.jrnlno + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.set.number') + Constants.LABEL_DELIMITER + self.setno;

   //Get or Assign the ICET.NotesId field.  This is a DB Sequence that is the Primary Key if
   //the Notes are used for the ICET Transaction.  If they've gotten to the Transaction Detail screen,
   //we need to assign this so the WebPart can use it if they decide to do something with Notes.  Unfortunately,
   //this means that a sequence is 'burned' for each ICET.  There's no other way around this since we need to have
   //a Sequence available before they go to the Notes screen (which is only a possibility they would go there).
   self.getNotesId = function () {
      self.icetForNotes = {};

      if (self.transdetResult && self.icetRowId !== 0) {
         var requestCriteria = {
            cIcetRowId: self.icetRowId,
            lCreateNoteIdFl: true   //Always assume it's a create.  The backend call will use the id if it finds one.
         };

         //NOTE: This call expects a String Progress Rowid provided by a backend call, not a true Progress RowId
         //Tip: for that scenario, you need the Post call: geticetnotesidbyrowid.)
         DataService.get('api/shared/asnotescom/geticetnotesid/{cIcetRowId}/{lCreateNoteIdFl}', { pathParams: requestCriteria, busy: false }, function (data) {
            if (data) {
               //These are the 5 keys (in order) required for the Context.  For the NotesContext,
               //it uses the NotesId and the Product.  For Business Context, it uses the Whse, Prod,
               //PostDt, and TransType.
               self.icetForNotes.whse = self.whse;
               self.icetForNotes.prod = self.prod;
               self.icetForNotes.postdt = self.transdetResult.postdt;
               self.icetForNotes.transtype = self.transdetResult.transtype;
               self.icetForNotes.notesid = data; //Next Sequence # (if create), or existing Sequence # (if exists)
            }
         });
      }
   };

   if (self.icetRowId) {
      var params = { icetrowid: self.icetRowId, invty: null };
      DataService.post('api/ic/asicwhseprod/icipfetchtransdetail', { data: params, busy: true }, function (data) {
         if (data) {
            self.transdetResult = data;
            self.getNotesId();
         }
      });
   }
});

app.controller('IcipDetailReplenishmentCtrl', function ($state, $stateParams, $translate, DataService) {
   var self = this;
   self.isProductInTabel = true;
   self.criteria = {
      prod: $stateParams.pk,
      whse: $stateParams.pk2,
      unit: null
   };
   self.icipReplResult = {
      btnalthidden: true,
      btnroaihidden: true,
      btnadjusterhidden: true,
      btnrolluphidden: true,
      btntrendinfohidden: true,
      btnusagehidden: true,
      criticalflhidden: true
   };

   self.loadReplenishment = function () {
      if (self.criteria.prod) {
         DataService.post('api/ic/asicwhseprod/icipfetchreplenishment', { data: self.criteria, busy: true }, function (data) {
            if (data) {
               self.icipReplResult = data;
               self.ctext = data.ctext.replace(/(?:\r\n|\r|\n)/g, '<br />');
               self.criteria.unit = data.unit;
               if (data.unittetx && data.unittext.indexOf(':') > -1) {
                  var unittextStr = data.unittetx.split(':');
                  self.unitLabel = unittextStr[0];
                  self.unitValue = unittextStr[1];
               }
            }
         });
      }
   };

   self.checkIcsw = function () {
      if (self.criteria.prod && self.criteria.whse) {
         var params = { prod: self.criteria.prod, whse: self.criteria.whse };
         DataService.get('api/ic/icsw/existsbypk', { params: params, busy: true }, function (data) {
            self.isProductInTabel = data;
         });
      }
   };

   self.checkIcsc = function () {
      if (self.criteria.prod) {
         var params = { catalog: self.criteria.prod };
         DataService.get('api/ic/icsc/existsbypk', { params: params, busy: true }, function (data) {
            self.isProductInTabel = data;
            if (!data) {
               self.checkIcsw();
            }
         });
      }
   };

   self.showUsage = function () {
      $state.go('.productWarehouseUsage', { enabled: false, prod: self.criteria.prod, whse: self.criteria.whse, unit: self.criteria.unit, recalcEnabled: false, returnState: $state.current.name });
   };

   self.showAltVendors = function () {
      $state.go('.altvendors', { prod: self.criteria.prod });
   };

   self.showROAI = function () {
      $state.go('.roai', { prod: self.criteria.prod, whse: self.criteria.whse });
   };

   self.showAdjusters = function () {
      $state.go('.adjustersInformation', { prod: self.criteria.prod, whse: self.criteria.whse });
   };

   self.showRollup = function () {
      $state.go('.rollup', { prod: self.criteria.prod, whse: self.criteria.whse });
   };

   self.showTrend = function () {
      $state.go('icip.detail.trendInformation', { prod: self.criteria.prod, whse: self.criteria.whse, returnState: $state.current.name });
   };

   self.checkIcsc();
   self.loadReplenishment();
});

app.controller('IcipDetailReplenishmentAltVendorsCtrl', function ($stateParams, $translate, Constants, DataService) {
   var self = this;
   self.criteria = {
      prod: $stateParams.prod
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + self.criteria.prod;

   if (self.criteria.prod) {
      DataService.post('api/ic/asicwhseprod/loadaltvendorstt', { data: self.criteria, busy: true }, function (altvendResults) {
         if (altvendResults) {
            self.altvendResults = altvendResults;
         }
      });
   }
});

app.controller('IcipDetailReplenishmentROAICtrl', function ($stateParams, $translate, Constants, DataService) {
   var self = this;
   self.criteria = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      roai: 40,
      adddisc: 0
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + self.criteria.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + self.criteria.whse;

   self.submit = function () {
      if (self.criteria.prod) {
         DataService.post('api/ic/asicwhseprod/icipfetchroai', { data: self.criteria, busy: true }, function (roaiResults) {
            if (roaiResults) {
               self.roaiResults = roaiResults;
               self.onorder = Locale.formatNumber(roaiResults.onorder, { style: 'decimal', maximumFractionDigits: 2 }) + //ignore jslint not defined
                  ' ' + $translate.instant('symbol.equals') + ' ' + Locale.formatNumber(roaiResults.netmonth, { style: 'decimal', maximumFractionDigits: 1 }) + //ignore jslint not defined
                  ' ' + $translate.instant('global.months');
               self.extrastock = Locale.formatNumber(roaiResults.ordqty, { style: 'decimal', maximumFractionDigits: 2 }) + //ignore jslint not defined
                  ' ' + roaiResults.purunit + ' ' + $translate.instant('symbol.equals') + ' ' +
                  Locale.formatNumber(roaiResults.ordmonth, { style: 'decimal', maximumFractionDigits: 1 }) + //ignore jslint not defined
                  ' ' + $translate.instant('global.months');
            }
         });
      }
   };
});

app.controller('IcipDetailReplenishmentRollupCtrl', function ($stateParams, $translate, Constants, DataService) {
   var self = this;
   var params = {
      cProd: $stateParams.prod,
      cWhse: $stateParams.whse
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + params.cProd + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + params.cWhse;

   if (params.cProd && params.cWhse) {
      DataService.get('api/ic/asicwhseprod/icipfetchrollup/' + params.cWhse + '/' + params.cProd, { busy: true }, function (rollups) {
         if (rollups) {
            self.rollups = rollups;
         }
      });
   }
});

app.controller('IcipDetailPricingCtrl', function ($state, $stateParams, DataService, MessageService, Sasoo) {
   var self = this;
   self.criteria = { qty: 1, unit: null };
   self.criteria.prod = $stateParams.pk;
   self.criteria.whse = $stateParams.pk2;
   self.seecostfl = Sasoo.seecostfl;

   self.buildPrices = function () {
      self.prices = [];
      self.prices.push({ line: 1, pct: self.pricingResult.pricepct1, amt: self.pricingResult.priceamt1, disc: self.pricingResult.discpct1, net: self.pricingResult.net1, qty: self.pricingResult.qtybrk1 });
      self.prices.push({ line: 2, pct: self.pricingResult.pricepct2, amt: self.pricingResult.priceamt2, disc: self.pricingResult.discpct2, net: self.pricingResult.net2, qty: self.pricingResult.qtybrk2 });
      self.prices.push({ line: 3, pct: self.pricingResult.pricepct3, amt: self.pricingResult.priceamt3, disc: self.pricingResult.discpct3, net: self.pricingResult.net3, qty: self.pricingResult.qtybrk3 });
      self.prices.push({ line: 4, pct: self.pricingResult.pricepct4, amt: self.pricingResult.priceamt4, disc: self.pricingResult.discpct4, net: self.pricingResult.net4, qty: self.pricingResult.qtybrk4 });
      self.prices.push({ line: 5, pct: self.pricingResult.pricepct5, amt: self.pricingResult.priceamt5, disc: self.pricingResult.discpct5, net: self.pricingResult.net5, qty: self.pricingResult.qtybrk5 });
      self.prices.push({ line: 6, pct: self.pricingResult.pricepct6, amt: self.pricingResult.priceamt6, disc: self.pricingResult.discpct6, net: self.pricingResult.net6, qty: self.pricingResult.qtybrk6 });
      self.prices.push({ line: 7, pct: self.pricingResult.pricepct7, amt: self.pricingResult.priceamt7, disc: self.pricingResult.discpct7, net: self.pricingResult.net7, qty: self.pricingResult.qtybrk7 });
      self.prices.push({ line: 8, pct: self.pricingResult.pricepct8, amt: self.pricingResult.priceamt8, disc: self.pricingResult.discpct8, net: self.pricingResult.net8, qty: self.pricingResult.qtybrk8 });
      self.prices.push({ line: 9, pct: self.pricingResult.pricepct9, amt: self.pricingResult.priceamt9, disc: self.pricingResult.discpct9, net: self.pricingResult.net9, qty: self.pricingResult.qtybrk9 });
   };

   self.loadSheetPrices = function () {
      var lookupCriteria = {
         prod: self.criteria.prod,
         whse: self.criteria.whse,
         pdrecno: self.pricingResult.pdrecno
      };
      DataService.post('api/pd/pdsc/lookup', { data: lookupCriteria, busy: true }, function (priceSheetResults) {
         if (priceSheetResults) {
            self.priceSheetResults = priceSheetResults;
            if (self.visibleFields) {
               self.sheetprices = [];
               self.sheetprices.push({ matrixno: 1, custmatrix: priceSheetResults.custmatrix1, vendmatrix: priceSheetResults.vendmatrix1 });
               self.sheetprices.push({ matrixno: 2, custmatrix: priceSheetResults.custmatrix2, vendmatrix: priceSheetResults.vendmatrix2 });
               self.sheetprices.push({ matrixno: 3, custmatrix: priceSheetResults.custmatrix3, vendmatrix: priceSheetResults.vendmatrix3 });
               self.sheetprices.push({ matrixno: 4, custmatrix: priceSheetResults.custmatrix4, vendmatrix: priceSheetResults.vendmatrix4 });
               self.sheetprices.push({ matrixno: 5, custmatrix: priceSheetResults.custmatrix5, vendmatrix: priceSheetResults.vendmatrix5 });
               self.sheetprices.push({ matrixno: 6, custmatrix: priceSheetResults.custmatrix6, vendmatrix: priceSheetResults.vendmatrix6 });
               self.sheetprices.push({ matrixno: 7, custmatrix: priceSheetResults.custmatrix7, vendmatrix: priceSheetResults.vendmatrix7 });
               self.sheetprices.push({ matrixno: 8, custmatrix: priceSheetResults.custmatrix8, vendmatrix: priceSheetResults.vendmatrix8 });
               self.sheetprices.push({ matrixno: 9, custmatrix: priceSheetResults.custmatrix9, vendmatrix: priceSheetResults.vendmatrix9 });
            }
         }
      });
   };

   self.bindProductPricing = function () {
      if (self.criteria.prod) {
         if (self.criteria.qty > 0) {
            DataService.post('api/ic/asicwhseprod/icipfetchpricing', { data: self.criteria, busy: true }, function (pricingResult) {
               if (pricingResult) {
                  self.pricingResult = pricingResult;
                  self.buildPrices();
                  if (!pricingResult.btnpricesheethidden && pricingResult.pdrecno > 0) {
                     self.visibleFields = (Sasoo.oepricefl.toUpperCase() === 'N') ? true : false;
                     self.loadSheetPrices();
                  }
               }
            });
         } else {
            MessageService.error('global.validation.list', 'message.quantity.should.be.greater.than.zero');
         }
      }
   };

   self.icscUnit = function () {
      var icscParams = {
         prod: self.criteria.prod,
         fldlist: 'unitstock'
      };
      DataService.get('api/ic/icsc/getbypk', { params: icscParams, busy: true }, function (icsc) {
         if (icsc) {
            self.criteria.unit = icsc.unitstock;
         }
         self.bindProductPricing();
      });
   };

   self.icspUnit = function () {
      var icspParams = {
         prod: self.criteria.prod,
         fldlist: 'unitsell'
      };
      DataService.get('api/ic/icsp/getbypk', { params: icspParams, busy: true }, function (icsp) {
         if (icsp && icsp.unitsell) {
            self.criteria.unit = icsp.unitsell;
            self.bindProductPricing();
         } else {
            self.icscUnit();
         }
      });
   };

   if (self.criteria.prod) {
      self.icspUnit();
   }
});

app.controller('IcipDetailGeneralCtrl', function ($scope, $state, $stateParams, AodataService, DataService) {
   var self = this;
   self.prod = $stateParams.pk ? $stateParams.pk : '';
   self.whse = $stateParams.pk2 ? $stateParams.pk2 : '';
   self.visibleBalances = false;
   self.visibleFifo = false;
   self.visibleSerial = false;
   self.visibleLot = false;
   self.visibleIsmDrillBack = false;
   self.isProductInTabel = true;

   // Check if ISM is live
   self.isIsmLive = AodataService.getValue("SM", "ismlive");

   // Check if ISM Rental is live
   self.isIsmRentalLive = AodataService.getValue("SM", "AllowRental");

   // Check for ISM logical ID
   self.ismLogicalId = AodataService.getValue("SM", "ismlogicalid");
   if (self.ismLogicalId && self.ismLogicalId.trim().substr(0, 6) !== 'lid://') {
      self.ismLogicalId = 'lid://' + self.ismLogicalId;
   }

   self.eccnDescription = function () {
      if (self.icipproduct.eccnclasscd) {
         var sastaParams = {
            codeiden: 'EC',
            codeval: self.icipproduct.eccnclasscd,
            fldlist: 'descrip'
         };
         DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
            if (sasta) {
               self.eccndescrp = sasta.descrip;
            }
         });
      }
   };
   if (self.prod) {
      var icipprodCriteria = {
         prod: self.prod,
         whse: self.whse
      };
      DataService.post('api/ic/asicwhseprod/icipfetchproduct', { data: icipprodCriteria, busy: true }, function (icipproduct) {
         if (icipproduct) {
            self.icipproduct = icipproduct;
            if (self.icipproduct) {
               self.eccnDescription();
               self.visibleBalances = !self.icipproduct.btnbalanceshidden;
               self.visibleFifo = !self.icipproduct.btnfifohidden;
               self.visibleIsmDrillBack = !self.icipproduct.btnrentalhidden;
               if (!self.icipproduct.btnserlothidden) {
                  if (self.icipproduct.btnserlotlbl.toUpperCase() === 'SERIAL') {
                     self.visibleSerial = true;
                  } else if (self.icipproduct.btnserlotlbl.toUpperCase() === 'LOT') {
                     self.visibleLot = true;
                  }
               }
            }
         }
      });
   }

   if (self.prod) {
      var params = { prod: self.prod };
      DataService.get('api/ic/icsp/existsbypk', { params: params, busy: true }, function (data) {
         self.isProductInTabel = data;
      });
   }

   self.showSerials = function () {
      $state.go('.serial', { prod: self.prod, whse: self.whse });
   };

   self.showBalances = function () {
      $state.go('.gnrlbalances', { prod: self.prod, whse: self.whse });
   };

   self.showLots = function () {
      $state.go('.lot', { prod: self.prod, whse: self.whse });
   };

   self.showFIFO = function () {
      $state.go('.fifo', { prod: self.prod, whse: self.whse });
   };

   // When the Rental button is clicked on the screen, go directly to the product inquiry in ISM
   self.launchIsmDrillBack = function () {
      if (self.prod && self.whse) {

         var href = '?LogicalId=' + self.ismLogicalId.trim() + '&page=formonly&form=ItemAvailability(FILTER(Item%3D%27' + self.prod.trim() + '%27%20AND%20Whse%3D%27' + self.whse.trim() + '%27)SETVARVALUES(InitialCommand%3DRefresh))';

         infor.companyon.client.sendPrepareDrillbackMessage(href);
      }
   };

});

app.controller('IcipDetailGeneralBalancesCtrl', function ($stateParams, $translate, Constants, DataService, Sasoo) {
   var self = this;
   self.seecostfl = Sasoo.seecostfl;
   var params = {
      prod: $stateParams.prod,
      whse: $stateParams.whse
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + params.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + params.whse;

   self.checkIcsd = function () {
      var icsdparams = { whse: params.whse };
      DataService.get('api/ic/icsd/getbypk', { params: icsdparams, busy: true }, function (data) {
         self.SRWhseFl = data.managedfl;
      });
   };

   if (params.prod && params.whse) {
      self.checkIcsd();
      DataService.post('api/ic/asicwhseprod/icipfetchbalances', { data: params, busy: true }, function (balResult) {
         if (balResult) {
            if (Sasoo.seecostfl) {
               self.balResult = balResult;
            } else {
               self.balResult = {
                  prod: balResult.prod,
                  whse: balResult.whse,
                  cdesc: balResult.cdesc,
                  costsdesc: balResult.costsdesc,
                  onhand: balResult.onhand,
                  qtydesc: balResult.qtydesc,
                  costsdesc2: balResult.costsdesc2,
                  reserved: balResult.reserved,
                  qtydesc2: balResult.qtydesc2,
                  committed: balResult.committed,
                  netavail: balResult.netavail,
                  backorder: balResult.backorder,
                  onorder: balResult.onorder,
                  datccstlbl: balResult.datccstlbl,
                  received: balResult.received,
                  unavail: balResult.unavail,
                  wtintrans: balResult.wtintrans,
                  glbydesc: balResult.glbydesc,
                  wtshipreq: balResult.wtshipreq,
                  costbydesc: balResult.costbydesc,
                  wtrcvreq: balResult.wtrcvreq,
                  demand: balResult.demand,
                  custonhand: balResult.custonhand,
                  custonorder: balResult.custonorder,
                  custunavail: balResult.custunavail,
                  custqtyrcvd: balResult.custqtyrcvd
               };
            }
         }
      });
   }
});

app.controller('IcipDetailGeneralFIFOCtrl', function ($stateParams, $translate, Constants, DataService, Sasoo, ConfigService) {
   var self = this;
   self.seecostfl = Sasoo.seecostfl;
   var params = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      statustype: null,
      availfl: true,
      receiptdt: null,
      seqno: null,
      batchsize: ConfigService.getDefaultRecordLimit()
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + params.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + params.whse;

   if (params.prod) {
      DataService.get('api/ic/icsef/listbystatus', { params: params, busy: true }, function (icsefs) {
         if (icsefs) {
            self.icsefs = icsefs;
         }
      });
   }
});

app.controller('IcipDetailGeneralSerialCtrl', function ($state, $stateParams, $translate, Constants, DataService, ConfigService, Sasoo) {
   var self = this;
   self.serialno = null;
   self.currstatus = '';
   self.seecostfl = Sasoo.seecostfl;
   self.oepricefl = Sasoo.oepricefl !== 'n';
   self.params = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      currstatus: null,
      receiptdt: null,
      batchsize: ConfigService.getDefaultRecordLimit()
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + self.params.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + self.params.whse;

   self.loadSerials = function () {
      self.params.currstatus = self.currstatus;
      DataService.get('api/ic/icses/listbyavail', { params: self.params, busy: true }, function (icses) {
         if (icses) {
            if (self.serialno) {
               self.icses = JSLINQ(icses).Where(function (item) { return item.serialno === self.serialno; }).ToArray();
            }
            else {
               self.icses = icses;
            }
         }
      });
   };

   if (self.params.prod && self.params.whse) {
      self.loadSerials();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.history', { prod: record.prod, whse: record.whse, serialno: record.serialno });
   };
});

app.controller('IcipDetailGeneralSerialHistoryCtrl', function ($state, $stateParams, $translate, Constants, DataService) {
   var self = this;
   self.criteria = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      serialno: $stateParams.serialno
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + self.criteria.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + self.criteria.whse + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.serial.number') + Constants.LABEL_DELIMITER + self.criteria.serialno;

   if (self.criteria.prod && self.criteria.whse && self.criteria.serialno) {
      DataService.post('api/ic/asicwhseprod/loadserialshistorytt', { data: self.criteria, busy: true }, function (serialHistories) {
         if (serialHistories) {
            self.serialHistories = serialHistories;
         }
      });
   }

   self.orderTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) { //ignore jslint - correct indentation
            case 'PO': //ignore jslint - correct indentation
               return $translate.instant('global.purchase.order'); //ignore jslint - correct indentation
            case 'ORDER': //ignore jslint - correct indentation
               return $translate.instant('global.order'); //ignore jslint - correct indentation
            case 'WHSE TRAN': //ignore jslint - correct indentation
               return $translate.instant('global.warehouse.transfer'); //ignore jslint - correct indentation
            case 'VALUE ADD': //ignore jslint - correct indentation
               return $translate.instant('global.value.add'); //ignore jslint - correct indentation
            case 'KIT WO': //ignore jslint - correct indentation
               return $translate.instant('global.work.order'); //ignore jslint - correct indentation
            case 'INV ADJ': //ignore jslint - correct indentation
               return $translate.instant('global.inventory.adjustment'); //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               return value; //ignore jslint - correct indentation
         }
      }
   };
});

app.controller('IcipDetailGeneralLotCtrl', function ($state, $stateParams, $translate, Constants, DataService, ConfigService, Sasoo) {
   var self = this;
   self.lotno = null;
   self.statustype = '';
   self.seecostfl = Sasoo.seecostfl;
   self.params = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      statustype: null,
      opendt: null,
      batchsize: ConfigService.getDefaultRecordLimit()
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + self.params.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + self.params.whse;

   self.loadLots = function () {
      self.params.statustype = self.statustype;
      DataService.get('api/ic/icsel/listbyavail', { params: self.params, busy: true }, function (icsel) {
         if (icsel) {
            if (self.lotno) {
               self.icsel = JSLINQ(icsel).Where(function (item) { return item.lotno === self.lotno; }).ToArray();
            }
            else {
               self.icsel = icsel;
            }
         }
      });
   };

   if (self.params.prod && self.params.whse) {
      self.loadLots();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.history', { prod: record.prod, whse: record.whse, lotno: record.lotno });
   };
});

app.controller('IcipDetailGeneralLotHistoryCtrl', function ($state, $stateParams, $translate, Constants, DataService) {
   var self = this;
   var criteria = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      lotno: $stateParams.lotno
   };
   self.subTitle = $translate.instant('global.product') + Constants.LABEL_DELIMITER + criteria.prod + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + criteria.whse + Constants.SUB_TITLE_SEPARATOR +
         $translate.instant('global.lot.number') + Constants.LABEL_DELIMITER + criteria.lotno;

   if (criteria.prod && criteria.whse && criteria.lotno) {
      DataService.post('api/ic/asicwhseprod/loadlotshistorytt', { data: criteria, busy: true }, function (lotHistories) {
         if (lotHistories) {
            self.lotHistories = lotHistories;
         }
      });

      var cutCriteria = {
         cProd: criteria.prod,
         cWhse: criteria.whse,
         cLotno: criteria.lotno
      };

      DataService.post('api/ic/asicentry/icgetlotcutdata', { data: cutCriteria, busy: true }, function (cutResults) {
         if (cutResults) {
            self.cutResults = cutResults;
         }
      });
   }
});