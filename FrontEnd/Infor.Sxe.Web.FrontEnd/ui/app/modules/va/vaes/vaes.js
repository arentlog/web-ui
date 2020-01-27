'use strict';

app.config(function ($stateProvider, StateProvider, BinAllocationStateProvider) {
   StateProvider.addTransactionBaseState('va', 'vaes', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('va', 'vaes');
   BinAllocationStateProvider.addStates('va', 'vaes', 'vaes.detail');
   $stateProvider.state('vaes.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/detail.json');
            },
            controller: 'VaesDetailCtrl as dtl'
         }
      }
   });
   $stateProvider.state('vaes.quickship', {
      url: '/quick-ship',
      params: { vaesRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/quickship-view.json');
            },
            controller: 'VaesQuickshipCtrl as qck'
         }
      }

   });
   $stateProvider.state('vaes.finalupdate', {
      url: '/final-update',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/final-update-view.json');
            },
            controller: 'VaesFinalUpdateCtrl as upd'
         }
      }

   });
   $stateProvider.state('vaes.addon', {
      url: '/addon',
      params: {
         addoncriteria: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/addons-view.json');
            },
            controller: 'VaesAddonCtrl as addn'
         }
      }
   });
   $stateProvider.state('vaes.extended', {
      url: '/extended',
      params: {
         vaesLine: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/extended-view.json');
            },
            controller: 'VaesExtendedCtrl as ext'
         }
      }
   });

   $stateProvider.state('vaes.seriallots', {
      url: '/serials-lots',
      params: { vaesLine: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/seriallots-view.json');
            },
            controller: 'VaesSeriallotsCtrl as slv'
         }
      }

   });
   $stateProvider.state('vaes.nonstock', {
      url: '/non-stock',
      params: { vaesLine: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/non-stock-view.json');
            },
            controller: 'VaesNonStockCtrl as nst'
         }
      }
   });
   $stateProvider.state('vaes.linehistory', {
      url: '/line-history',
      params: { vaesLine: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/line-history-view.json');
            },
            controller: 'VaesLineHistoryCtrl as lhc'
         }
      }

   });
   $stateProvider.state('vaes.sourcing', {
      url: '/sourcing',
      params: { vaesLine: null, vaeslinelist: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaes/sourcing-view.json');
            },
            controller: 'VaesSourcingCtrl as vsc'
         }
      }

   });
});

app.controller('VaesBaseCtrl', function ($state, DataService, SecurityService, ConfigService) {
   var self = this;
   self.vaes = {};
   self.functionName = 'vaes';
   self.defaultPeriod = {};
   self.allowsectionBOfl = true;
   self.valineaddchg = {};
   self.isSerialAddVisible = false;
   self.isLotsAddVisible = false;
   self.seriallotTitle = '';
   self.vanox = '0-00';
   self.isQckshiOpen = false;
   self.tieCreateResults = [];
   self.valinelistresults = [];
   self.vasectioncompletecriteria = {};
   self.criteria = {
      prod: '',
      stagecd: '3',
      seqno: 0,
      vano: 0,
      vasuf: 0,
      recordlimit: ConfigService.getDefaultRecordLimit()
   };
   self.wlaowhsesettings = {};
   self.ismodwlfl = false;
   self.isanywhsefl = false;
   self.isanyesbfl = false;
   self.isanyrcvonlyfl = false;
   self.sourcingTitle = '';
   self.operatorSecurity = SecurityService.getSecurityLevel('vaes');
   self.isLineItemstabSelected = false;
   self.subtitle = '';
   self.addonposition = '';
   self.vaspProductExist = false;
   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('vaes', 'Header') < 3;
   self.isLineItemsTabReadonly = SecurityService.getSubSecurityLevel('vaes', 'Line Items') < 3;

   self.isMaster = function () {
      return $state.is('vaes.master');
   };

   self.includesMaster = function () {
      return $state.includes('vaes.master');
   };

   self.isDetail = function () {
      return $state.is('vaes.detail');
   };

   self.includesDetail = function () {
      return $state.includes('vaes.detail');
   };

   self.activateLineTab = function () {
      self.isLineItemstabSelected = true;
   };

   self.inactivateLineTab = function () {
      self.isLineItemstabSelected = false;
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/va/asvaentry/vaesloadtemptable', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.loadDefaultPeriod = function () {
      DataService.get('api/gl/asglentry/setdefaultperiods', { busy: true }, function (data) {
         self.defaultPeriod = data;
      });
   };
});

app.controller('VaesSearchCtrl', function ($scope, $state, DataService, ConfigService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   self.reloadCriteria = function () {
      base.vanox = '0-00';
      base.criteria = {
         prod: '',
         stagecd: '3',
         seqno: 0,
         vano: 0,
         vasuf: 0,
         recordlimit: ConfigService.getDefaultRecordLimit()
      };
   };

   self.changeOfVAOrder = function (args) {
      var results = [];
      if (args.value) {
         if (args.source === 'entry') {
            var orderParts = base.vanox.split('-');
            if (orderParts.length === 2) {
               base.criteria.vano = orderParts[0];
               base.criteria.vasuf = orderParts[1];
            } else {
               base.criteria.vano = base.vanox;
               base.criteria.vasuf = 0;
            }
         } else {
            base.criteria.vano = args.value;
            base.criteria.vasuf = args.value2;
         }
      } else {
         base.criteria.vano = 0;
         base.criteria.vasuf = 0;
      }
      var vasectionlookupcriteria = {
         vano: base.criteria.vano,
         vasuf: base.criteria.vasuf
      };
      DataService.post('api/va/vaes/lookup', { data: vasectionlookupcriteria, busy: true }, function (data) {
         data.vasectionlookupresults.forEach(function (record) {
            if (record.sctntype.toLowerCase() === 'in') {
               results.push(record);
            }
         });
         switch (results.length) {
            case 0:                                                                                                 //ignore jslint - correct indentation
               base.criteria.seqno = 0;                                                                             //ignore jslint - correct indentation
               break;                                                                                               //ignore jslint - correct indentation
            case 1:                                                                                                 //ignore jslint - correct indentation
               base.criteria.seqno = results[0].seqno;                                                              //ignore jslint - correct indentation
               break;                                                                                               //ignore jslint - correct indentation
            default:                                                                                                //ignore jslint - correct indentation
               var firstOrdPrtINSection = JSLINQ(data.vasectionlookupresults).FirstOrDefault(function (item) {      //ignore jslint - correct indentation
                  if (item.stagecd === 1) {
                     return item;
                  }
               });
               if (firstOrdPrtINSection) {                                                                          //ignore jslint - correct indentation
                  base.criteria.seqno = firstOrdPrtINSection.seqno;                                                 //ignore jslint - correct indentation
               }                                                                                                    //ignore jslint - correct indentation
               else {                                                                                               //ignore jslint - correct indentation
                  base.criteria.seqno = JSLINQ(results).First().seqno;                                              //ignore jslint - correct indentation
               }                                                                                                    //ignore jslint - correct indentation
               break;                                                                                               //ignore jslint - correct indentation
         }
      });

   };

   self.updateAutocompleteCriteria = function (args) {
      // the VA Order # lookup autocomplete was sending the previously selected vano and vasuf in the FacetQuery and returning no results
      // this clears the FacetQuery so that only the currently entered order # is sent with the query
      if (args.source === 'autocomplete') {
         if (args.criteria.FacetQuery) {
            args.criteria.FacetQuery = {};
         }
      }
      return args.criteria;
   };

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      self.reloadCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('vaes.master');
      }
      base.search();
   };
});

app.controller('VaesMasterCtrl', function ($scope, $state, DataService, MessageService, GridService, ModalService, AuthService, $stateParams, Utils) {
   var self = this;
   var base = $scope.base;
   self.selectedVAESRecords = [];
   base.loadDefaultPeriod();
   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
   self.drillDown = function (e, args) {
      base.isQckshiOpen = false;
      base.vaes = args[0].item;
      base.vaes.vasuf = Utils.pad(base.vaes.vasuf, 2);
      var vaesdetailcriteria = {
         vano: base.vaes.vano,
         vasuf: base.vaes.vasuf,
         seqno: base.vaes.seqno,
         whse: base.vaes.whse
      };
      DataService.post('api/va/asvaentry/vaesprocesspredetail', { data: vaesdetailcriteria, busy: true }, function () {
         $state.go('^.detail');
      });
   };
   self.shipunship = function () {
      if (self.selectedVAESRecords) {
         self.selectedVAESRecords.forEach(function (selectedvaes) {
            selectedvaes.allowsectionBOfl = base.allowsectionBOfl;
            DataService.post('api/va/asvaentry/vaesshipunship', { data: selectedvaes, busy: true }, function (data) {
               selectedvaes = data;
               base.search();
            });
         });
      }
   };
   self.checkAuthPoint = function (wlaowhsecriteria) {
      if (wlaowhsecriteria) {
         DataService.post('api/wl/aswlinquiry/getwlaomanywhsesettings', { data: wlaowhsecriteria, busy: true }, function (data) {
            if (data) {
               self.authPointsRunning = 0;
               base.wlaowhsesettings = data.wlaowhsesettings;
               base.ismodwlfl = data.lModwlfl;
               base.isanywhsefl = data.lAnywlwhsefl;
               base.isanyesbfl = data.lAnywlesbfl;
               base.isanyrcvonlyfl = data.lAnywlrcvonlyfl;
               if (base.isanywhsefl) {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('wlord', '', '', '', '', null,
                     function () {
                        self.shipunship();
                     }, null);
               }
               else if (base.isanyesbfl) {

                  self.authPointsRunning++;
                  AuthService.createAuthPoint('esbwl', '', '', '', '', null,
                                       function () {
                                          self.shipunship();
                                       }, null);
               }
               else {
                  self.shipunship();
               }
            }
         });
      }
   };
   self.shipunshipVAOrder = function () {
      self.selectedVAESRecords = GridService.getSelectedRecords(base.grid);
      if (self.selectedVAESRecords) {
         var wlaowhsecriteria = [];
         self.selectedVAESRecords.forEach(function (selectedvaes) {
            var vaescriteria = {
               vano: selectedvaes.vano,
               vasuf: selectedvaes.vasuf,
               allowSectionBOFl: base.allowsectionBOfl,
               seqno: selectedvaes.seqno,
               whse: selectedvaes.whse

            };
            wlaowhsecriteria.push(vaescriteria);
         });
         self.checkAuthPoint(wlaowhsecriteria);
      }
   };
   self.addons = function () {
      base.addonposition = 'master';
      base.vaes = GridService.getSelectedRecord(base.grid);
      base.vaes.vasuf = Utils.pad(base.vaes.vasuf, 2);
      var vaaddoncriteria = {
         functionnm: 'vaes',
         seqno: base.vaes.seqno,
         vano: base.vaes.vano,
         vasuf: base.vaes.vasuf
      };
      $state.go('^.addon', {
         addoncriteria: vaaddoncriteria
      });
   };
   self.deleteVA = function (vasection) {
      DataService.post('api/va/asvasection/vasectiondelete', { data: vasection, busy: true }, function (data) {
         if (data && data.length === 1) {
            MessageService.yesNo('global.question', data[0].messagetxt, function () {
               // Yes processing
               vasection.skipfl = true;
               self.deleteVA(vasection);
            }, function () {
               // No processing
               base.search();
            });
         }
         else {
            base.search();
         }
      });
   };
   self.deletesection = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      var vasection = {
         mode: 'CHG',
         skipfl: false,
         seqno: selectedRecord.seqno,
         vano: selectedRecord.vano,
         vasuf: selectedRecord.vasuf
      };
      self.deleteVA(vasection);
   };
   self.finalupdate = function () {
      base.vasectioncompletecriteria = {
         addonfl: true,
         vano: 0,
         vasuf: 0,
         seqno: 0,
         wiplist: '',
         functionnm: base.functionName
      };
      DataService.post('api/va/asvasection/vasectioncompleteinitialize', { data: base.vasectioncompletecriteria, busy: true }, function (data) {
         if (data.messaging) {
            if (data.messaging.length > 0) {
               var errorMessage = JSLINQ(data.messaging).Where(function (errMsg) {
                  return errMsg.messagetype === 'e';
               });
               if (errorMessage && errorMessage.length > 0) {
                  MessageService.error('global.error', errorMessage[0].messagetxt);
               }
               else {
                  MessageService.processMessaging(data.messaging);
                  base.vasectioncompletecriteria = data.vasectioncompletecriteria;
                  base.search();
                  $state.go('^.finalupdate', {});
               }
            }
            else {
               base.vasectioncompletecriteria = data.vasectioncompletecriteria;
               base.search();
               $state.go('^.finalupdate', {});
            }
         }
      });
   };
   self.quickship = function () {
      $state.go('^.quickship', {});
   };
   self.valueAddDetailsHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // VAIF HyperLink
      if (currentRow && currentRow.vano) {
         $state.go('vaif.detail', { pk: currentRow.vano, pk2: currentRow.vasuf });
      }
   };
   // ICIP HyperLink
   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod > '') {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }
   };
   // ICIA HyperLink
   self.productAvalilabilityInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod > '') {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: currentRow.whse }, { reload: 'icia.detail' });
      }
   };
});

app.controller('VaesDetailCtrl', function ($scope, $state, $stateParams, $translate, Sasc, DataService, ConfigService, MessageService, GridService, Sasoo) {
   var self = this;
   var base = $scope.base;
   self.vaehHeader = {};
   self.wmSectionTypes = ['in', 'ii', 'it'];
   self.vaesloadttcriteria = {};
   self.vaesloadttresults = {};
   self.sectionEntity = {};
   self.pndInvInamt = 0.00;
   self.wipInvInamt = 0.00;
   self.pendTotal = 0.00;
   self.wipTotal = 0.00;
   self.pendIntAmt = 0.00;
   self.seecostfl = Sasoo.seecostfl;
   self.isWriteOffEnabled = false;
   self.vaehActOrEst = {};
   self.tieCreateResultsGrid = $scope.base.grid;
   self.isAddonsEnable = false;
   var wmbinassignCriteria = {};
   var wmbinAssignment = {};
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.sequence.number.poundsign') + base.vaes.seqno;

   self.loadVAES = function () {
      DataService.post('api/va/asvaentry/vaesloadtemptable', { data: self.vaesloadttcriteria, busy: true }, function (data) {
         self.vaesloadttresults = data[0];
      });
   };
   self.removesoftlockVAEH = function () {
      if (self.sectionEntity) {
         DataService.get('api/va/asvaheader/vaheaderremovesoftlock/' + self.sectionEntity.vano + '/' + self.sectionEntity.vasuf, { busy: true }, function () { });
      }
   };
   self.loadSectionEntity = function () {
      var params = { vano: base.vaes.vano, vasuf: base.vaes.vasuf, seqno: base.vaes.seqno };
      DataService.get('api/va/vaes/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.sectionEntity = data;
            self.removesoftlockVAEH();
         }
      });
   };
   self.loadTies = function () {
      if (self.vaehHeader) {
         var tieCriteria = {
            tietype: "f",
            docorderno: self.vaehHeader.vano,
            docordersuf: self.vaehHeader.vasuf,
            doclineno: 0,
            docseqno: 0,
            cono2: 0,
            prod: self.vaehHeader.shipprod,
            nonstockty: self.vaehHeader.nonstockty
         };
         DataService.post('api/va/asvaheader/vaheaderties', { data: tieCriteria, busy: true }, function (data) {
            base.tieCreateResults = data;
         });
      }
   };
   self.loadHeader = function () {
      var params = { vano: base.vaes.vano, vasuf: base.vaes.vasuf };
      DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.vaehHeader = data;
            self.loadTies();
            self.pndInvInamt = self.vaehHeader.pndinvinamt * -1;
            self.wipInvInamt = self.vaehHeader.wipinvinamt * -1;
            self.pendTotal = self.vaehHeader.pndinvamt + self.vaehHeader.pndextrnamt;
            self.pendTotal = self.vaehHeader.pndintrnamt !== 0 || self.vaehHeader.wipintrnamt !== 0 ? self.pendTotal + self.vaehHeader.pndintrnamt : self.pendTotal + self.vaehHeader.pndintrnest;
            self.pendTotal += (self.vaehHeader.pndinvinamt * -1) + self.vaehHeader.pndaddons;
            self.wipTotal = self.vaehHeader.wipinvamt + self.vaehHeader.wipextrnamt + self.vaehHeader.wipintrnamt + (self.vaehHeader.wipinvinamt * -1) + self.vaehHeader.wipaddons;
            self.pendIntAmt = (self.vaehHeader.pndintrnamt !== 0 || self.vaehHeader.wipintrnamt !== 0) ? self.vaehHeader.pndintrnamt : self.pendIntAmt = self.vaehHeader.pndintrnest;
            if (Sasoo.superfl && Sasc.icglcost.toLowerCase() === 'a' && self.vaehHeader.transtype.toLowerCase() === 'va') {
               self.isWriteOffEnabled = true;
            }
            if (self.vaehHeader.pndintrnamt !== 0 || self.vaehHeader.wipintrnamt !== 0) {
               self.vaehActOrEst = MessageService.get('global.act.in.parenthesis');
            }
            else {
               self.vaehActOrEst = MessageService.get('global.est.in.parenthesis');
            }
         }
      });
   };
   self.loadLineItems = function () {
      var valinelistcriteria = {
         functionnm: 'vaes',
         vano: base.vaes.vano,
         vasuf: base.vaes.vasuf,
         seqno: base.vaes.seqno
      };
      DataService.post('api/va/asvaline/valineretrieve', { data: valinelistcriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               base.valinelistresults = data.valinelistresults;
               if (base.valinelistresults) {
                  base.valinelistresults.forEach(function (entity) {
                     entity.proddesc = entity.proddesc + ' ' + entity.proddesc2;
                  });
               }
            }

         }
      });
   };
   if (base.vaes) {
      self.vaesloadttcriteria = {
         vano: base.vaes.vano,
         vasuf: base.vaes.vasuf,
         seqno: base.vaes.seqno
      };
      self.loadVAES();
      self.loadSectionEntity();
      self.loadHeader();
      self.loadLineItems();
   }
   self.isExtendedEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord) {
         return false;
      }
      else {
         return true;
      }
   };
   self.isWarehouseManagerEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord) {
         var indexscntype = self.wmSectionTypes.indexOf(selectedRecord.sctntype.toLowerCase());
         if (selectedRecord.wmfl && indexscntype > -1) {
            return false;
         }
         else {
            return true;
         }
      }
      else {
         return true;
      }
   };
   self.isNonStockEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord && selectedRecord.nonstockty.toLowerCase() === 'n' && (selectedRecord.sctntype.toLowerCase() === 'in' || selectedRecord.sctntype.toLowerCase() === 'ii')) {
         return false;
      }
      else {
         return true;
      }
   };
   self.isSerialEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord && selectedRecord.serlottype.toLowerCase() === 's') {
         return false;
      }
      else {
         return true;
      }
   };
   self.isLotsEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord && selectedRecord.serlottype.toLowerCase() === 'l') {
         return false;
      }
      else {
         return true;
      }
   };
   self.isLineHistoryEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord && selectedRecord.sctntype.toLowerCase() === 'in') {
         return false;
      }
      else {
         return true;
      }
   };
   self.isSourcingEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord) {
         return false;
      }
      else {
         return true;
      }
   };
   self.isDeleteEnable = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord && selectedRecord.allowdelete) {
         return false;
      }
      else {
         return true;
      }
   };
   self.valineinitializeEdit = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord) {
         var vaLineInitializeCriteria = {
            pvFunctionnm: 'vaes',
            pvVano: selectedRecord.vano,
            pvVasuf: selectedRecord.vasuf,
            pvSeqno: selectedRecord.seqno,
            pvLineno: selectedRecord.lineno
         };
         DataService.post('api/va/asvaline/valineinitializeupdate', { data: vaLineInitializeCriteria, busy: true }, function (data) {
            MessageService.processMessaging(data.messaging);
            base.valineaddchg = data.valineaddchg;
         });
      }
   };
   self.getICSW = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      if (selectedRecord) {
         var params = {
            prod: selectedRecord.shipprod,
            whse: selectedRecord.whse,
            fillmode: true,
            fldlist: ''
         };
         DataService.get('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               if (data.serlottype.toLowerCase() === 's') {
                  if (!data.snpocd) {
                     base.isSerialAddVisible = Sasc.icsnpofl;
                  }
                  else if (data.snpocd && data.snpocd.toLowerCase() === 'r') {
                     base.isSerialAddVisible = false;
                  }
                  else if (data.snpocd && data.snpocd.toLowerCase() === 's') {
                     base.isSerialAddVisible = true;
                  }
               }
               else if (data.serlottype.toLowerCase() === 'l') {
                  base.isLotsAddVisible = true;
               }
            }
         });
      }
   };
   self.btnVisibleCondition = function () {
      self.isExtendedEnable();
      self.isWarehouseManagerEnable();
      self.isNonStockEnable();
      self.isSerialEnable();
      self.isLotsEnable();
      self.isLineHistoryEnable();
      self.isSourcingEnable();
      self.isDeleteEnable();
      self.valineinitializeEdit();
      self.getICSW();
   };
   //Extend
   self.extend = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      $state.go('^.extended', { vaesLine: selectedRecord });
   };

   //Warehouse Manager
   self.warehouseManager = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      wmbinassignCriteria = {
         altwhse: '',
         currproc: 'vaes',
         jrnlno: 0,
         kitfl: false,
         lineno: selectedRecord.lineno,
         ourproc: 'vaes',
         ordertype: 'f',
         orderno: selectedRecord.vano,
         ordersuf: selectedRecord.vasuf,
         potype: '',
         prod: selectedRecord.shipprod,
         seqno: selectedRecord.seqno,
         skipnonkitlogic: false,
         stkqtyship: selectedRecord.stkqtyship,
         stkqtyrcv: 0,
         unit: selectedRecord.unit,
         vamodule: 'va',
         wmadjtype: 'sell',
         wmqtyrcv: 0,
         whse: selectedRecord.whse
      };
      if (wmbinassignCriteria) {
         if (base.vaes.sctntype === 'ii') {
            wmbinassignCriteria.returnfl = true;
         }
         else { wmbinassignCriteria.returnfl = false; }
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
      wmbinassignCriteria.wmqtyrcv = wmbinassignment.wmqtyrcv;
      $state.go('^');
   };

   self.binAllocationActionsCallback = function (wmbinassignment) {
      wmbinAssignment = wmbinassignment;
      //By design, this function has no ability to Allocate/Deallocate in Bin Allocation.  (Leaving this function in here as a breadcrumb because
      //most places that the Bin Allocation will require this callback method.)
   };

   //Serial
   self.serial = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      base.seriallotTitle = $translate.instant('global.value.add.entry.shipping.feedback.serial');
      $state.go('^.seriallots', { vaesLine: selectedRecord });
   };

   //Lots
   self.lots = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      base.seriallotTitle = $translate.instant('global.value.add.entry.shipping.feedback.lots');
      $state.go('^.seriallots', { vaesLine: selectedRecord });
   };

   //Non-Stock
   self.nonstock = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      $state.go('^.nonstock', { vaesLine: selectedRecord });
   };

   //Line History
   self.linehistory = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      $state.go('^.linehistory', { vaesLine: selectedRecord });
   };
   self.checkProductforVASP = function (valinetie, valinelist) {
      base.vaspProductExist = false;
      if (valinelist && valinelist.length > 0) {
         var vaspheaderlistcriteria = {
            prod: valinelist[0].shipprod,
            whse: base.criteria.whse,
            verno: valinetie.vaverno,
            recordcountlimit: ConfigService.getLookupMaxResults()
         };
         DataService.post('api/va/asvasetup/vaspheaderlookup', { data: vaspheaderlistcriteria, busy: true }, function (data) {
            if (data) {
               data.vaspheaderlistresults.forEach(function (vasp) {
                  if (vasp.verno !== 0) {
                     base.vaspProductExist = true;
                  }
               });
               self.lMoreRecord = data.lMoreRecords;
               $state.go('^.sourcing', { vaesLine: valinetie, vaeslinelist: valinelist });
            }
         });
      }
   };
   //Sourcing
   self.sourcing = function () {
      var selectedRecords = GridService.getSelectedRecords(self.lineItemsGrid);
      if (selectedRecords) {
         if (selectedRecords.length > 1) {
            base.sourcingTitle = 'Value Add Entry Transaction - PO/WT Interface Multi-Line Sourcing';
         }
         else {
            base.sourcingTitle = 'Value Add Entry Transaction - PO/WT Interface';
         }
         DataService.post('api/va/asvaline/valinetieretrieve', { data: selectedRecords, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  if (data) {
                     self.checkProductforVASP(data.valinelinetie, selectedRecords);
                  }
               }
            }
         }, function errorCallback(response) {
            self.checkProductforVASP(response.valinelinetie, selectedRecords);
         });
      }
   };

   //Addons
   self.btnaddon = function () {
      $state.go('^.addon', {});
   };

   //Delete
   self.deleteline = function () {
      var selectedRecord = GridService.getSelectedRecord(self.lineItemsGrid);
      MessageService.yesNo('global.question', 'question.are.you.sure.you.want.to.delete',
            function () {
               // Yes processing
               DataService.post('api/va/asvaline/valinedelete', { data: selectedRecord, busy: true }, function (data) {
                  MessageService.processMessaging(data.Messaging);
                  self.loadLineItems();
               });
            }, function () {
               // No processing
               self.loadLineItems();
            });
   };

   //VAEH Header Update
   self.submit = function () {
      var method = 'PUT';
      DataService.send('api/va/vaeh', { method: method, data: self.vaehHeader, busy: true }, function (data) {
         self.vaehHeader = data;
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };
   self.navbacktomaster = function () {
      if (base.isQckshiOpen) {
         $state.go('vaes.quickship');
      }
      else {
         $state.go('^.master');
      }
   };

   // ICIP HyperLink
   self.productInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod > '') {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: currentRow.whse });
      }
   };
   // ICIA HyperLink
   self.productAvalilabilityInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod > '') {
         $state.go('icia.detail', { pk: currentRow.shipprod, pk2: currentRow.whse }, { reload: 'icia.detail' });
      }
   };

   // POIP HyperLink
   self.purchaseOrderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.orderaltno > '') {
         $state.go('poip.detail', { pk: currentRow.orderaltno });
      }
   };

   // POIP HyperLink
   self.backtoTieInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.powtorderaltno > '') {
         $state.go('poip.detail', { pk: currentRow.powtorderaltno });
      }
   };
});

app.controller('VaesSeriallotsCtrl', function ($scope, $state, $stateParams, Sasc, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.selectedLine = $stateParams.vaesLine;
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.line.number') + self.selectedLine.lineno;
   self.isSerial = false;
   self.isLot = false;
   if (self.selectedLine) {
      if (self.selectedLine.serlottype.toLowerCase() === 's') {
         self.isSerial = true;
         self.icEntrySerialsCriteria = {
            actionty: '',
            assignoldest: false,
            cost: 0,
            currproc: 'vaes',
            custno: 0,
            icspecrecno: self.selectedLine.icspecrecno,
            ictype: self.selectedLine.transtype,
            inquiryfl: false,
            jrnlno: 0,
            lineno: self.selectedLine.lineno,
            method: '',
            orderno: self.selectedLine.vano,
            ordersuf: self.selectedLine.vasuf,
            ordqty: self.selectedLine.stkqtyord,
            origqty: self.selectedLine.stkqtyship,
            ourproc: 'vaes',
            outqty: self.selectedLine.stkqtyship,
            prod: self.selectedLine.shipprod,
            proofqty: base.valineaddchg.nosnlots,
            qtyunavail: self.selectedLine.qtyunavail,
            reasunavty: self.selectedLine.reasunavty,
            retlineno: 0,
            retorderno: 0,
            retordersuf: 0,
            returnfl: self.selectedLine.sctntype === "ii" ? true : false,
            returnty: '',
            seqno: self.selectedLine.seqno,
            shipfmwhse: '',
            shipto: '',
            shiptowhse: '',
            type: 'VA',
            vendno: 0,
            whse: self.selectedLine.whse,
            wono: 0,
            wosuf: 0,
            btncreateenabled: base.isSerialAddVisible
         };
      } else if (self.selectedLine.serlottype.toLowerCase() === 'l') {
         self.isLot = true;
         self.icEntryLotsCriteria = {
            actionty: '',
            cost: 0,
            currproc: 'vaes',
            custno: 0,
            iclotrcptty: Sasc.iclotrcptty,
            icspecrecno: self.selectedLine.icspecrecno,
            ictype: self.selectedLine.transtype,
            inquiryfl: false,
            jrnlno: 0,
            lineno: self.selectedLine.lineno,
            method: '',
            orderno: self.selectedLine.vano,
            ordersuf: self.selectedLine.vasuf,
            ordqty: self.selectedLine.stkqtyord,
            origqty: self.selectedLine.stkqtyship,
            ourproc: 'vaes',
            outqty: self.selectedLine.stkqtyship,
            prod: self.selectedLine.shipprod,
            proofqty: base.valineaddchg.nosnlots,
            qtyunavail: self.selectedLine.qtyunavail,
            reasunavty: self.selectedLine.reasunavty,
            retlineno: 0,
            retorderno: 0,
            retordersuf: 0,
            retseqno: 0,
            returnfl: self.selectedLine.sctntype === "ii" ? true : false,
            returnty: '',
            seqno: self.selectedLine.seqno,
            shipfmwhse: '',
            shipto: '',
            shiptowhse: '',
            sQtyunavail: self.selectedLine.qtyunavail,
            type: 'VA',
            vendno: 0,
            whse: self.selectedLine.whse,
            wono: 0,
            wosuf: 0,
            btncreateenabled: false
         };
      }
   }
   self.serialControlReady = function () {
      if (self.isSerial) {
         var criteria = {
            icentryserialslist: [],
            icentryserialscriteria: self.icEntrySerialsCriteria
         };
         // Call initialize method on the Shared-Serials-Ctrl
         self.serialsControl.initialize(criteria);
      }
   };

   self.lotControlReady = function () {
      if (self.isLot) {
         // Call initialize method on the Shared-Lots-Ctrl
         self.lotsControl.initialize(self.icEntryLotsCriteria);
      }
   };

   self.serialDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      if (adjustQtyFl) {
         self.adjustQuantity(adjustQtyFl, adjustQtyShip);
      } else {
         $state.go('^.detail');
      }
   };

   self.lotDoneCallback = function (adjustQtyFl, adjustQtyShip) {
      if (adjustQtyFl) {
         self.adjustQuantity(adjustQtyFl, adjustQtyShip);
      } else {
         $state.go('^.detail');
      }
   };

   self.adjustQuantity = function (adjustQtyFl, adjustQtyShip) {
      self.prevNonstocktySensitive = self.selectedLine.nonstocktySensitive;

      self.selectedLine.stkqtyship = adjustQtyShip;
      self.selectedLine.qtyship = self.selectedLine.unitconv ? (adjustQtyShip / self.selectedLine.unitconv) : adjustQtyShip;
      self.selectedLine.nonstocktySensitive = true; // Allow a quantity ship change here

      var changeCriteria = {
         valineaddchg: self.selectedLine,
         pvFunctionname: 'vaes',
         pvFieldname: 'qtyship'  // This will aslo do a force a serial/lot allocation check as if you had sent nosnlots field too
      };

      // Update the qtyship if operator Increases/Decreases the Quantity
      DataService.post('api/va/asvaline/valineleavefield', { data: changeCriteria, busy: true }, function (data) {
         if (data) {

            // Update the data based upon the changed data
            self.selectedLine = data.valineaddchg;

            if (data.cWarningMessage) {
               MessageService.alert('global.warning', data.cWarningMessage);
            }

            // Update the Qty Ship Change on the Actual VA Line Record
            self.submitQtyChg();
         }
      });
   };

   self.submitQtyChg = function () {
      var lineUpdateRequest = {
         valineaddchg: self.selectedLine,
         pvFunctionnm: 'vaes',
         pvVano: base.vaes.vano,
         pvVasuf: base.vaes.vasuf,
         pvSeqno: base.vaes.seqno
      };
      DataService.post('api/va/asvaline/valineupdate', { data: lineUpdateRequest, busy: true }, function (data) {
         MessageService.processMessaging(data.messaging);
         data.messaging.forEach(function (err) {
            if (err.messagetype === 'e') {
               self.isErrorExist = true;
               return;
            }
            else { self.isErrorExist = false; }
         });
         if (!self.isErrorExist) {
            base.valineaddchg = data.valineaddchg;
            base.valinelistresults = data.valinelistresults;
            if (base.valinelistresults) {
               base.valinelistresults.forEach(function (entity) {
                  entity.proddesc = entity.proddesc + ' ' + entity.proddesc2;
               });
            }
            self.valinecriteria = data.valinelistcriteria;
         }
      });
      //grid.toggleRowDetail(self.row);
      $state.go('^.detail');
   };


});


app.controller('VaesQuickshipCtrl', function ($scope, $state, $stateParams, DataService, AuthService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.vanox = '0-00';
   self.qckvano = 0;
   self.qckvasuf = 0;
   self.qckseqno = 0;
   self.product = '';
   self.productDesc = '';
   self.vaehQuickshipHeader = {};
   self.sectionEntity = {};
   self.loadQckSectionEntity = function () {
      base.vaes.seqno = self.qckseqno;
      var params = {
         vano: self.qckvano,
         vasuf: self.qckvasuf,
         seqno: self.qckseqno
      };
      DataService.get('api/va/vaes/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.sectionEntity = data;
         }
         else {
            self.sectionEntity = {};
         }
      });
   };
   self.findSequenceNo = function () {
      var results = [];
      var vaesCriteria = {
         vano: self.qckvano,
         vasuf: self.qckvasuf
      };
      DataService.post('api/va/vaes/lookup', { data: vaesCriteria, busy: true }, function (data) {
         data.vasectionlookupresults.forEach(function (record) {
            if (record.sctntype.toLowerCase() === 'in' &&
               record.stagecdword.toLowerCase() !== 'complete' &&
               record.stagecd !== 9) {
               results.push(record);
            }
         });
         switch (results.length) {
            case 0:                                                                                              //ignore jslint - correct indentation
               self.qckseqno = 0;                                                                                //ignore jslint - correct indentation
               break;                                                                                            //ignore jslint - correct indentation
            case 1:                                                                                              //ignore jslint - correct indentation
               self.qckseqno = results[0].seqno;                                                                 //ignore jslint - correct indentation
               break;                                                                                            //ignore jslint - correct indentation
            default:                                                                                             //ignore jslint - correct indentation
               var firstOrdPrtINSection = JSLINQ(data.vasectionlookupresults).FirstOrDefault(function (item) {   //ignore jslint - correct indentation
                  if (item.stagecd === 1) {
                     return item;
                  }
               });
               if (firstOrdPrtINSection) {                                                                       //ignore jslint - correct indentation
                  self.qckseqno = firstOrdPrtINSection.seqno;                                                    //ignore jslint - correct indentation
               }                                                                                                 //ignore jslint - correct indentation
               else {                                                                                            //ignore jslint - correct indentation
                  self.qckseqno = JSLINQ(results).First().seqno;                                                 //ignore jslint - correct indentation
               }                                                                                                 //ignore jslint - correct indentation
               break;                                                                                            //ignore jslint - correct indentation
         }
         if (self.qckseqno) {
            base.vaes.seqno = self.qckseqno;
            self.loadQckSectionEntity();
         }
      });
   };
   self.loadQckHeader = function (args) {
      if (args.value) {
         if (args.source.toLowerCase() === 'entry') {
            if (args.value > 0) {
               self.qckvano = args.value;
               self.qckvasuf = args.value2;
            } else {
               self.qckvano = args.value;
               self.qckvasuf = 0;
            }
         } else {
            self.qckvano = args.value;
            self.qckvasuf = args.value2;
         }
         var params = { vano: self.qckvano, vasuf: self.qckvasuf };
         DataService.get('api/va/vaeh/getbypk',
            { params: params, busy: true },
            function (data) {
               if (data) {
                  self.vaehQuickshipHeader = data;
                  if (self.vaehQuickshipHeader) {
                     base.vaes = self.vaehQuickshipHeader;
                     base.vaes.vasuf = Utils.pad(base.vaes.vasuf, 2);
                     self.product = self.vaehQuickshipHeader.nonstockty + ' ' + self.vaehQuickshipHeader.shipprod;
                     if (self.vaehQuickshipHeader.nonstockty.toLowerCase() === 'n') {
                        self.productDesc = self.vaehQuickshipHeader.proddesc + ' ' + self.vaehQuickshipHeader.proddesc2;
                     } else {
                        var inputparams = { prod: self.vaehQuickshipHeader.shipprod };
                        DataService.get('api/ic/icsp/getbypk',
                           { params: inputparams },
                           function (data) {
                              self.productDesc = data.descrip1 + ' ' + data.descrip2;
                           });
                     }
                  }
                  self.findSequenceNo();
               }
            });
      } else {
         self.qckvano = 0;
         self.qckvasuf = 0;
         self.vaehQuickshipHeader = {};
         base.vaes = {};
         self.productDesc = '';
         self.qckseqno = 0;
      }
   };

   if (base.vaes && base.vaes.vano) {
      if (self.qckvano === 0) {
         self.qckvano = base.vaes.vano;
         self.qckvasuf = base.vaes.vasuf;
         self.vanox = self.qckvano + '-' + Utils.pad(self.qckvasuf, 2);
         var params = { vano: self.qckvano, vasuf: self.qckvasuf };
         DataService.get('api/va/vaeh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.vaehQuickshipHeader = data;
               if (self.vaehQuickshipHeader) {
                  base.vaes = self.vaehQuickshipHeader;
                  base.vaes.vasuf = Utils.pad(base.vaes.vasuf, 2);
                  self.product = self.vaehQuickshipHeader.nonstockty + ' ' + self.vaehQuickshipHeader.shipprod;
                  if (self.vaehQuickshipHeader.nonstockty.toLowerCase() === 'n') {
                     self.productDesc = self.vaehQuickshipHeader.proddesc + ' ' + self.vaehQuickshipHeader.proddesc2;
                  }
                  else {
                     var inputparams = { prod: self.vaehQuickshipHeader.shipprod };
                     DataService.get('api/ic/icsp/getbypk', { params: inputparams }, function (data) {
                        self.productDesc = data.descrip1 + ' ' + data.descrip2;
                     });
                  }
               }
               self.findSequenceNo();
            }
         });
      }
   }
   //Quick Ship - Ship/Unship
   self.qckshipunship = function () {
      var strInfo = '';
      if (base.vaes) {
         base.vaes.allowsectionBOfl = base.allowsectionBOfl;
         DataService.post('api/va/asvaentry/vaesshipunship', { data: base.vaes, busy: true }, function (data) {
            base.vaes = data;
            if (base.vaes.sctnstagex.toLowerCase() === 'print') {
               strInfo = MessageService.get('global.value.add.entry.shipping.feedback.unshipped');
            }
            else {
               strInfo = MessageService.get('global.value.add.entry.shipping.feedback.shipped');
            }
            MessageService.info(strInfo);
            self.loadQckSectionEntity();
            //base.search();
         });
      }
   };
   self.checkAuthPoint = function (wlaowhsecriteria) {
      if (wlaowhsecriteria) {
         DataService.post('api/wl/aswlinquiry/getwlaomanywhsesettings', { data: wlaowhsecriteria, busy: true }, function (data) {
            if (data) {
               self.authPointsRunning = 0;
               base.wlaowhsesettings = data.wlaowhsesettings;
               base.ismodwlfl = data.lModwlfl;
               base.isanywhsefl = data.lAnywlwhsefl;
               base.isanyesbfl = data.lAnywlesbfl;
               base.isanyrcvonlyfl = data.lAnywlrcvonlyfl;
               if (base.isanywhsefl) {
                  self.authPointsRunning++;
                  AuthService.createAuthPoint('wlord', '', '', '', '', null,
                     function () {
                        self.qckshipunship();
                     }, null);
               }
               else if (base.isanyesbfl) {

                  self.authPointsRunning++;
                  AuthService.createAuthPoint('esbwl', '', '', '', '', null,
                                       function () {
                                          self.qckshipunship();
                                       }, null);
               }
               else {
                  self.qckshipunship();
               }
            }
         });
      }
   };
   self.qckshipunshipVAOrder = function () {
      if (self.vaehQuickshipHeader && self.sectionEntity) {
         var wlaowhsecriteria = [];
         var vaescriteria = {
            vano: self.qckvano,
            vasuf: Utils.pad(self.qckvasuf, 2),
            allowSectionBOFl: base.allowsectionBOfl,
            seqno: self.qckseqno,
            whse: self.vaehQuickshipHeader.whse
         };
         wlaowhsecriteria.push(vaescriteria);
         self.checkAuthPoint(wlaowhsecriteria);
      }
   };

   //Quick Ship - Detail
   self.qckdetail = function () {
      base.isQckshiOpen = true;
      if (self.vaehQuickshipHeader) {
         var qckvaesdetailcriteria = {
            vano: self.qckvano,
            vasuf: Utils.pad(self.qckvasuf, 2),
            seqno: self.qckseqno,
            whse: self.vaehQuickshipHeader.whse
         };
         DataService.post('api/va/asvaentry/vaesprocesspredetail', { data: qckvaesdetailcriteria, busy: true }, function () {
            $state.go('^.detail');
         });
      }
   };

   //Quick Ship - FInal Update

   self.finalupdate = function () {
      base.vasectioncompletecriteria = {
         addonfl: true,
         vano: self.qckvano,
         vasuf: Utils.pad(self.qckvasuf, 2),
         seqno: self.qckseqno,
         wiplist: '',
         functionnm: base.functionName
      };
      DataService.post('api/va/asvasection/vasectioncompleteinitialize', { data: base.vasectioncompletecriteria, busy: true }, function (data) {
         if (data.messaging) {
            if (data.messaging.length > 0) {
               var errorMessage = JSLINQ(data.messaging).Where(function (errMsg) {
                  return errMsg.messagetype === 'e';
               });
               if (errorMessage && errorMessage.length > 0) {
                  MessageService.error('global.error', errorMessage[0].messagetxt);
               }
               else {
                  MessageService.processMessaging(data.messaging);
                  base.vasectioncompletecriteria = data.vasectioncompletecriteria;
                  base.search();
                  base.isQckshiOpen = true;
                  $state.go('^.finalupdate', {});
               }
            }
            else {
               base.vasectioncompletecriteria = data.vasectioncompletecriteria;
               base.search();
               base.isQckshiOpen = true;
               $state.go('^.finalupdate', {});
            }
         }
      });
   };
});

app.controller('VaesAddonCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.seq.number') + base.vaes.seqno;
   self.vaaddon = {};
   self.addonTitle = '';
   self.errormessage = '';
   self.vaaddoncriteria = $stateParams.addoncriteria;
   self.getaddons = function () {
      DataService.post('api/va/asvasection/vasectionretrieveaddons', { data: self.vaaddoncriteria, busy: true }, function (data) {
         MessageService.processMessaging(data.messaging);
         self.vaaddon = data.vaaddons[0];
      });
   };
   if (base.addonposition === 'master') {
      self.addonTitle = MessageService.get('global.addons.for.seq.number') + base.vaes.seqno;
      self.getaddons();
   }
   self.addonvalidation = function () {
      self.errormessage = '';
      if (self.vaaddon) {
         if (self.vaaddon.addonno1 !== 0 && (self.vaaddon.addonno1 === self.vaaddon.addonno2 ||
           self.vaaddon.addonno1 === self.vaaddon.addonno3 || self.vaaddon.addonno1 === self.vaaddon.addonno4)) {
            self.errormessage = MessageService.get('global.addon.type.is.duplicated');
         }
         else if (self.vaaddon.addonno2 !== 0 && (self.vaaddon.addonno2 === self.vaaddon.addonno3 ||
           self.vaaddon.addonno2 === self.vaaddon.addonno4)) {
            self.errormessage = MessageService.get('global.addon.type.is.duplicated');
         }
         else if (self.vaaddon.addonno3 !== 0 && self.vaaddon.addonno3 === self.vaaddon.addonno4) {
            self.errormessage = MessageService.get('global.addon.type.is.duplicated');
         }
         else if (self.vaaddon.addonamt1 !== 0 && self.vaaddon.addonno1 <= 0) {
            self.errormessage = MessageService.get('global.addon.amount.requires.addon.code');
         }
         else if (self.vaaddon.addonamt2 !== 0 && self.vaaddon.addonno2 <= 0) {
            self.errormessage = MessageService.get('global.addon.amount.requires.addon.code');
         }
         else if (self.vaaddon.addonamt3 !== 0 && self.vaaddon.addonno3 <= 0) {
            self.errormessage = MessageService.get('global.addon.amount.requires.addon.code');
         }
         else if (self.vaaddon.addonamt4 !== 0 && self.vaaddon.addonno4 <= 0) {
            self.errormessage = MessageService.get('global.addon.amount.requires.addon.code');
         }
      }
      if (self.errormessage) {
         MessageService.error('Error', self.errormessage);
         return false;
      }
      else {
         return true;
      }
   };
   self.submit = function () {
      if (self.addonvalidation()) {
         if (self.vaaddon) {
            var vaAddons = [];
            vaAddons.push(self.vaaddon);
            var addonrequest = { vaaddons: vaAddons, vaaddoncriteria: self.vaaddoncriteria };
            DataService.post('api/va/asvasection/vasectionsubmitaddons', { data: addonrequest, busy: true }, function (data) {
               MessageService.processMessaging(data);
               $state.go('^.master', {});
            });
         }
      }
   };
});

app.controller('VaesFinalUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   $scope.cdate = new Date();
   self.vasectioncompletecriteria = {
      vano: 0,
      vasuf: 0,
      seqno: 0,
      wiplist: '',
      functionnm: base.functionName,
      period: base.defaultPeriod.iGlDefPer,
      postdt: $scope.cdate,
      stkadjfl: false,
      stkadjenablefl: false,
      addonfl: true,
      addondisplayfl: false,
      autoshipprevfl: false,
      wlwhsechgfl: false,
      reviewlaborcostsfl: false
   };
   self.submit = function () {
      DataService.post('api/va/asvasection/vasectioncomplete', { data: self.vasectioncompletecriteria, busy: true }, function (data) {
         if (data) {
            if (data.length === 0) {
               MessageService.processMessaging(data);
               $state.go('vaes.master');
               base.search();
            }
            else if (data.length > 0) {
               if (data[0].messagetype === 'e') {
                  MessageService.error('global.error', data[0].messagetxt);
               }
               else {
                  MessageService.processMessaging(data);
                  if (!base.isQckshiOpen) {
                     $state.go('vaes.master');
                     base.search();
                  }
               }
            }
         }
      });
   };
   self.navbacktomaster = function () {
      if (base.isQckshiOpen) {
         $state.go('vaes.quickship');
      }
      else {
         $state.go('^.master');
      }
   };
});

//BREADCRUMB: Working on a shared control for this view.  It's shared between VAES, VAEI, and POEI (Finished Product).  It will be a control that you can drop
//into a form as a sub-view.  (reference:  "shared/extended-details-value-add").  Once it's complete, that's what you'll want to call.   -ajw
app.controller('VaesExtendedCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.selectedLine = $stateParams.vaesLine;
   self.isErrorExist = false;
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.sequence.number.poundsign') + self.selectedLine.seqno + ' | ' + MessageService.get('global.line.number') + self.selectedLine.lineno;
   self.vaextendedlinecriteria = {
      pvFunctionnm: 'vaes',
      pvVano: base.vaes.vano,
      pvVasuf: base.vaes.vasuf,
      pvSeqno: base.vaes.seqno,
      pvLineno: base.vaes.lineno
   };
   self.extendedDetailsValueAddControlDoneCallback = function () {
      $state.go('^.detail');
   };
   self.submit = function () {
      self.extendedDetailsValueAddControl.save();
   };
});

//BREADCRUMB: Working on a shared control for this view.  It's shared between VAES, VAEI, and POEI (Finished Product).  It will be a control that you can drop
//into a form as a sub-view.  (reference:  "shared/non-stock-details-value-add").  Once it's complete, that's what you'll want to call.  -ajw
app.controller('VaesNonStockCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.selectedLine = $stateParams.vaesLine;
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.line.number') + self.selectedLine.lineno;
   self.nonstockDetailsValueAddControlDoneCallback = function () {
      $state.go('^.detail');
   };
   self.submit = function () {
      self.nonstockDetailsValueAddControl.save();
   };
});

app.controller('VaesLineHistoryCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.selectedLine = $stateParams.vaesLine;
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.line.number') + self.selectedLine.lineno;
   self.valinehistresults = [];
   if (base.vaes) {
      var Valinehistcriteria = {
         functionnm: 'vaes',
         lineno: self.selectedLine.lineno,
         seqno: base.vaes.seqno,
         vano: base.vaes.vano,
         vasuf: base.vaes.vasuf
      };
      DataService.post('api/va/asvaline/valinehistoryretrieve', { data: Valinehistcriteria, busy: true }, function (data) {
         if (data) {

            if (!MessageService.processMessaging(data.messaging)) {
               self.valinehistresults = data.valinehist;
            }

         }
      });
   }
});

app.controller('VaesSourcingCtrl', function ($state, $scope, $stateParams, DataService, MessageService, AuthService, Utils) {
   var self = this;
   var base = $scope.base;
   self.valinelinetie = $stateParams.vaesLine;
   self.valinelinetieInitailData = {};
   Utils.replaceObject(self.valinelinetieInitailData, self.valinelinetie);
   self.valinelist = $stateParams.vaeslinelist;
   self.firstselectedLine = self.valinelist[0];
   self.lMoreRecord = false;
   self.isVernoEnable = false;
   var ORDER_TYPE_PO = "p";
   var ORDER_TYPE_VA = "f";
   var ORDER_TYPE_WT = "t";
   self.isPOVisible = false;
   self.isWTVisible = false;
   self.isVAVisible = false;
   self.pono = null;
   self.pono = self.valinelinetie.orderaltno + '-' + Utils.pad(0, 2);
   self.sourceTypeLookup = function () {
      self.isPOVisible = false;
      self.isWTVisible = false;
      self.isVAVisible = false;
      if (self.valinelinetie.ordertype.toLowerCase() === ORDER_TYPE_PO) {
         self.isPOVisible = true;
      }
      else if (self.valinelinetie.ordertype.toLowerCase() === ORDER_TYPE_WT) {
         self.isWTVisible = true;
      }
      else if (self.valinelinetie.ordertype.toLowerCase() === ORDER_TYPE_VA) {
         self.isVAVisible = true;
      }
   };
   if (self.valinelinetie) {
      self.sourceTypeLookup();
   }
   self.ponochanged = function () {
      var purchaseOrderDetails = self.pono.split('-');
      self.valinelinetie.orderaltno = purchaseOrderDetails[0];
   };

   if (self.valinelinetie.vavernoenabled && self.valinelinetie.orderaltno === 0 && base.vaspProductExist && base.operatorSecurity.vaveruse.toLowerCase() === 'y') {
      self.isVernoEnable = true;
   }
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.line.number') + self.firstselectedLine.lineno;
   var fieldname = '';
   var valineTieRequest = {};

   self.vaLineTieUpdate = function () {
      var vaLineTieUpdateRequest = {
         valinelistresults: self.valinelist,
         valinelinetie: self.valinelinetie
      };
      DataService.post('api/va/asvaline/valinetieupdate', { data: vaLineTieUpdateRequest, busy: true }, function (data) {
         if (data.messaging && data.messaging.length > 0) {
            MessageService.processMessaging(data.messaging);
         }
         self.valinelist = data.valinelistresults;
         // Check for override restrictions that need an auth point.
         self.valinelist.forEach(function (valine) {
            if (valine.restrictovrfl && valine.restricterrmess) {
               var strInfo = MessageService.get('global.product') + '=' + valine.shipprod + ' ' + valine.restricterrmess;
               MessageService.info(strInfo);
               valine.restricterrmess = '';
               AuthService.createAuthPoint('poet', 'lines', 'restrictovrfl', '', '', null, function () {
                  self.countinueSourcing();
               }, function () {
                  self.countinueSourcing();
               });
               return;
            }
         });
         $state.go('^.detail');
      });
   };
   self.countinueSourcing = function () {
      self.vaLineTieUpdate();
   };
   self.setvaLineTieRequest = function () {
      if ($stateParams.vaesLine.ordertype !== self.valinelinetie.ordertype) {
         $stateParams.vaesLine.ordertype = self.valinelinetie.ordertype;
      }
      valineTieRequest = {
         valinelistresults: self.valinelist,
         valinelinetie: $stateParams.vaesLine,
         pvFieldname: fieldname
      };
   };

   self.valinetieleave = function () {
      DataService.post('api/va/asvaline/valinetieleavefield', { data: valineTieRequest, busy: true }, function (data) {
         if (data.messaging && data.messaging.length > 0) {
            MessageService.processMessaging(data.messaging);
         }
         self.valinelinetie = data.valinelinetie;
         self.pono = self.valinelinetie.orderaltno + '-' + Utils.pad(0, 2);
      }, function errorCallback() {
         Utils.replaceObject(self.valinelinetie, self.valinelinetieInitailData);
         self.sourceTypeLookup();
      });
   };
   self.vasourceOrderChange = function () {
      fieldname = 'ordertype';
      self.sourceTypeLookup();
      self.setvaLineTieRequest();
      self.valinetieleave();
   };
   self.vadispositionChange = function () {
      fieldname = 'botype';
      self.setvaLineTieRequest();
      self.valinetieleave();
   };
   self.checkAuthPoint = function () {
      self.valinelist.forEach(function (valine) {
         if (valine.restrictovrfl && valine.restricterrmess) {
            var strInfo = MessageService.get('global.product') + '=' + valine.shipprod + ' ' + valine.restricterrmess;
            MessageService.info(strInfo);
            valine.restricterrmess = '';
            AuthService.createAuthPoint('poet', 'lines', 'restrictovrfl', '', '', null, function () {
               self.countinueSourcing();
            }, function () {
               self.countinueSourcing();
            });
            return;
         }
      });
      self.countinueSourcing();
   };
   self.submit = function () {
      self.checkAuthPoint();
   };
});

app.controller('VaesRowDetailTiesCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   var rowParams = $scope.dtl.rowParams;
   var grid = rowParams.grid;
   self.selectedTies = rowParams.item;
   self.row = rowParams.row;
   base.subtitle = base.vaes.vano + '-' + base.vaes.vasuf + ' | ' + MessageService.get('global.line.number') + self.selectedTies.lineno;
   self.cancel = function () {
      grid.toggleRowDetail(self.row);
   };
   self.submit = function () {
      var tiecreatecriteria = {
         tietype: 'f',
         docorderno: base.vaes.vano,
         docordersuf: base.vaes.vasuf,
         doclineno: 0,
         docseqno: 0,
         cono2: 0,
         prod: base.vaes.shipprod,
         nonstockty: base.vaes.nonstockty
      };
      if (self.selectedTies.cleartiefl) {
         self.selectedTies.modified = true;
      }
      var linetieRequest = { tiecreatetiettcriteria: tiecreatecriteria, tiecreatetiettresults: self.selectedTies };
      DataService.post('api/va/asvaheader/vaheadertieeditvalidate', { data: linetieRequest, busy: true }, function (data) {
         base.tieCreateResults = data;
      });
      grid.toggleRowDetail(self.row);
   };
});

app.controller('VaesRowDetailLineItemCtrl', function ($state, $scope, $stateParams, DataService, MessageService, GridService, Utils) {
   var self = this;
   var base = $scope.base;
   var rowParams = $scope.dtl.rowParams;
   var grid = rowParams.grid;
   self.selectedLine = rowParams.item;
   self.row = rowParams.row;
   self.valinecriteria = {};
   self.isErrorExist = false;
   self.cancel = function () {
      grid.toggleRowDetail(self.row);
   };
   self.submit = function () {

      var lineUpdateRequest = {
         valineaddchg: self.selectedLine,
         pvFunctionnm: 'vaes',
         pvVano: base.vaes.vano,
         pvVasuf: base.vaes.vasuf,
         pvSeqno: base.vaes.seqno
      };

      DataService.post('api/va/asvaline/valineupdate', { data: lineUpdateRequest, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               base.valineaddchg = data.valineaddchg;

               var indx = base.valinelistresults.indexOf(self.selectedLine);
               Utils.replaceObject(base.valinelistresults[indx], data.valinelistresults[0]);
               grid.updateRow(indx);

               if (base.valinelistresults) {
                  base.valinelistresults.forEach(function (entity) {
                     entity.proddesc = entity.proddesc + ' ' + entity.proddesc2;
                  });
               }
               self.valinecriteria = data.valinelistcriteria;
            }
         }
      });
      grid.toggleRowDetail(self.row);
   };
});