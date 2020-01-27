'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('va', 'vaea', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('va', 'vaea');

   $stateProvider.state('vaea.detail', {
      url: '/detail',
      params: { keydata: {} },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaea/detail.json');
            },
            controller: 'VaeaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('vaea.lot', {
      url: '/lot',
      params: { varow: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaea/lots.json');
            },
            controller: 'VaeaLotCtrl as lt'
         }
      }
   });

   $stateProvider.state('vaea.detail.cutpiece', {
      url: '/cut-piece',
      params: {
         seqrow: {},
         vaeasplitdata: {}
      },
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaea/cutpiece.json');
            },
            controller: 'VaeaCutPieceCtrl as cut'
         }
      }
   });

   $stateProvider.state('vaea.detail.changecondition', {
      url: '/change-condition',
      params: {},
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaea/changecondition.json');
            },
            controller: 'VaeaChangeConditionCtrl as cnd'
         }
      }
   });

   $stateProvider.state('vaea.detail.movetounavail', {
      url: '/move-to-unavailable',
      params: {},
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('va/vaea/movetounavail.json');
            },
            controller: 'VaeaMoveToUnavailCtrl as mtu'
         }
      }
   });

});

app.controller('VaeaBaseCtrl', function ($state, ConfigService, DataService, MessageService, Utils) {
   var self = this;
   self.criteria = {
      vanox: '0-00',
      vano: 0,
      vasuf: 0,
      whse: '',
      prod: '',
      stage: '',
      transtype: ''
   };

   /**
    * Return the formatted order number and suffix
    */
   self.getFullOrderNumber = function (vano, vasuf) {
      if (!vasuf) {
         vasuf = 0;
      }
      if (vano) {
         return vano + '-' + Utils.pad(vasuf, 2);
      } else {
         return '';
      }
   };

   self.getFullOrderNumber2 = function (e) {
      if (e.vano) {
         return self.getFullOrderNumber(e.vano, e.vasuf);
      }
      else {
         return '0-00';
      }
   };

   self.isMaster = function () {
      return $state.is('vaea.master');
   };

   self.includesMaster = function () {
      return $state.includes('vaea.master');
   };

   self.isDetail = function () {
      return $state.is('vaea.detail');
   };

   self.includesDetail = function () {
      return $state.includes('vaea.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordcount = ConfigService.getDefaultRecordLimit();
   };

   // Perform search and update data set for the grid
   self.search = function () {
      if (self.criteria.vano) {
         DataService.post('api/va/asvaentry/vaeabuildlist', { data: self.criteria, busy: true }, function (data) {
            if (data) {
               if (data.messaging) {
                  MessageService.processMessaging(data.messaging);
               }
               self.dataset = data.vaealistresults;
            }
         });
      }
   };

   self.changeOfVAOrder = function (args) {
      if (args.value) {
         if (args.source === 'entry') {
            var orderParts = self.criteria.vanox.split('-');
            if (orderParts.length === 2) {
               self.criteria.vano = orderParts[0];
               self.criteria.vasuf = orderParts[1];
            } else {
               self.criteria.vano = self.criteria.vanox;
               self.criteria.vasuf = 0;
            }
         } else {
            self.criteria.vano = args.value;
            self.criteria.vasuf = args.value2;
         }
      } else {
         self.criteria.vano = 0;
         self.criteria.vasuf = 0;
      }
   };

   self.updateAutocompleteCriteria = function (args) {
      // the VA Order # lookup autocomplete was sending the previously selected vano and vasuf in the FacetQuery and returning no results
      // this clears the FacetQuery so that only the currently entered order # is sent with the query
      if (args.source === 'autocomplete') {
         if (args.criteria.FacetQuery)
            args.criteria.FacetQuery = {};
      }
      return args.criteria;
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('VaeaSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('vaea.master');
      }

      base.search();
   };


});

app.controller('VaeaMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Advanced search criteria object with initial values
   self.advCriteria = {
      vanox: '0-00',
      vano: 0,
      vasuf: 0,
      whse: '',
      prod: '',
      stage: '',
      transtype: '',
      recordcount: ConfigService.getDefaultRecordLimit()
   };

   self.changeOfVAOrder = function (args) {
      if (args.value) {
         if (args.source === 'entry') {
            var orderParts = self.advCriteria.vanox.split('-');
            if (orderParts.length === 2) {
               self.advCriteria.vano = orderParts[0];
               self.advCriteria.vasuf = orderParts[1];
            } else {
               self.advCriteria.vano = self.advCriteria.vanox;
               self.advCriteria.vasuf = 0;
            }
         } else {
            self.advCriteria.vano = args.value;
            self.advCriteria.vasuf = args.value2;
         }
      } else {
         self.advCriteria.vano = 0;
         self.advCriteria.vasuf = 0;
      }
   };

   self.vaOrderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      // VAIF HyperLink
      if (currentRow && currentRow.vano) {
         $state.go('vaif.detail', { pk: currentRow.vano, pk2: currentRow.vasuf });
      }
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'vanox', label: MessageService.get('global.order.number') },
      { value: 'prod', label: MessageService.get('global.finished.product') },
      { value: 'compprod', label: MessageService.get('global.component.product') },
      { value: 'whse', label: MessageService.get('global.warehouse') },
      { value: 'lotno', label: MessageService.get('global.lot.number') }, //x
      { value: 'stage', label: MessageService.get('global.stage') },
      { value: 'transtype', label: MessageService.get('global.transaction.type') },
      { value: 'entereddate', label: MessageService.get('global.entered.date') },
      { value: 'promiseddate', label: MessageService.get('global.promised.date') },
      { value: 'reqshipdate', label: MessageService.get('global.requested.ship.date') },
      { value: 'estcompdt', label: MessageService.get('global.estimated.completion.date') },
      { value: 'recordcount', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['prod,compprod,whse'];

   self.fromenteredChanged = function () {
      self.advCriteria.toentereddate = self.advCriteria.fromentereddate;
   };
   self.frompromisedChanged = function () {
      self.advCriteria.topromiseddate = self.advCriteria.frompromiseddate;
   };
   self.fromreqshipChanged = function () {
      self.advCriteria.toreqshipdate = self.advCriteria.fromreqshipdate;
   };
   self.fromestcompChanged = function () {
      self.advCriteria.toestcompdt = self.advCriteria.fromestcompdt;
   };
   self.fromreceiptChanged = function () {
      self.advCriteria.toreceiptdt = self.advCriteria.fromreceiptdt;
   };

   /**
    * Drill down to detail
    */
   self.drilldown = function (e, args) {
      var record = args[0].item;
      var keydata = {
         cProd: record.shipprod,
         cLotno: record.lotno,
         cWhse: record.vawhse
      };
      $state.go('vaea.detail', { keydata: keydata });
   };

   self.setLot = function () {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      if (selectedRows && selectedRows.length === 1) {
         var record = selectedRows[0];
         $state.go('vaea.lot', { varow: record });
      }
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var base = $scope.base;

      var advCriteria = angular.copy(self.advCriteria);

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordcount) {
         advCriteria.recordcount = ConfigService.getDefaultRecordLimit();
      }

      // Load list of selected stages
      advCriteria.stage = advCriteria.stageList ? advCriteria.stageList.toString() : '';
      delete advCriteria.stageList;

      // Load list of selected transaction types
      advCriteria.transtype = advCriteria.transTypeList ? advCriteria.transTypeList.toString() : '';
      delete advCriteria.transTypeList;

      if (advCriteria.vano || (advCriteria.whse && advCriteria.compprod)) {
         DataService.post('api/va/asvaentry/vaeabuildlist', { data: advCriteria, busy: true }, function (data) {
            if (data) {
               if (data.messaging) {
                  MessageService.processMessaging(data.messaging);
               }
               base.dataset = data.vaealistresults;
            }
         });
      } else {
         MessageService.error('global.error', 'message.error.please.enter.valid.or.component.and.warehouse');
      }

   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('VaeaDetailCtrl', function ($state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   self.keydata = $stateParams.keydata;

   if (!self.keydata) {
      $state.go('vaea.master');
   }

   self.subTitle = self.keydata.cWhse + ' | ' + self.keydata.cProd + ' | ' + (self.keydata.cLotno ? self.keydata.cLotno : $translate.instant('global.no.lot.number'));

   self.loadGridData = function () {
      if (self.keydata.cWhse && self.keydata.cProd && self.keydata.cLotno) {
         DataService.post('api/ic/asicentry/icgetlotcutdata', { data: self.keydata, busy: true }, function (data) {
            if (data) {
               self.dataset = data;
            } else {
               self.dataset = [];
            }
         });
      } else {
         self.dataset = [];
      }
   };

   self.cutPieceEntry = function () {
      var selectedRows = GridService.getSelectedRecords(self.grid);
      if (selectedRows && selectedRows.length === 1) {
         var record = selectedRows[0];
         if (record) {
            DataService.post('api/va/asvaentry/vaeasplitinitialize', { data: record, busy: true }, function (data) {
               if (data && !MessageService.processMessaging(data.messaging)) {
                  if (data.vaeasplitdata) {
                     data.vaeasplitdata.conditioncddesc = '';
                     if (data.vaeasplitdata.conditioncd) {
                        var sastaParams = {
                           codeiden: 'CC',
                           codeval: data.vaeasplitdata.conditioncd,
                           fldlist: 'descrip'
                        };
                        DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
                           if (sasta) {
                              data.vaeasplitdata.conditioncddesc = sasta.descrip;
                           }
                           $state.go('vaea.detail.cutpiece', { seqrow: record, vaeasplitdata: data.vaeasplitdata });
                        });
                     } else {
                        $state.go('vaea.detail.cutpiece', { seqrow: record, vaeasplitdata: data.vaeasplitdata });
                     }
                  }
               }
            });
         }
      }
   };

   self.moveToUnavailSelect = function () {
      $state.go('vaea.detail.movetounavail');
   };

   self.moveToUnavail = function (selectedUnavailType) {
      var records = GridService.getSelectedRecords(self.grid);
      if (records) {
         var criteria = {
            lotcutresults: records,
            cReasUnavTy: selectedUnavailType
         };
         DataService.post('api/va/asvaentry/vaeaadjustunavailable', { data: criteria, busy: true }, function () {
            self.loadGridData();
         });
      }
   };

   self.moveToOnHand = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records) {
         var criteria = {
            lotcutresults: records,
            cReasUnavTy: ''
         };
         DataService.post('api/va/asvaentry/vaeaadjustunavailable', { data: criteria, busy: true }, function () {
            self.loadGridData();
         });
      }
   };

   self.changeConditionSelect = function () {
      $state.go('vaea.detail.changecondition');
   };

   self.changeCondition = function (conditionCode) {
      var records = GridService.getSelectedRecords(self.grid);
      if (records) {
         var criteria = {
            lotcutresults: records,
            cConditionCd: conditionCode
         };
         DataService.post('api/va/asvaentry/vaeaadjustcondition', { data: criteria, busy: true }, function () {
            self.loadGridData();
         });
      }
   };

   self.back = function () {
      $state.go('vaea.master');
   };

   self.loadGridData();

});

app.controller('VaeaCutPieceCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var dtl = $scope.dtl;
   self.seqrow = $stateParams.seqrow;
   self.vaeasplitdata = $stateParams.vaeasplitdata;

   if ((!dtl) || (!self.vaeasplitdata)) {
      $state.go('vaea.detail');
   }
   self.subTitle = dtl.subTitle + ' | ' + self.seqrow.seqno;

   self.validate = function () {
      DataService.post('api/va/asvaentry/vaeasplitvalidate', { data: self.vaeasplitdata, busy: true }, function (data) {
         if (data && !MessageService.processMessaging(data.messaging)) {
            self.vaeasplitdata = data.vaeasplitdata;
         }
      });
   };

   self.ok = function () {
      DataService.post('api/va/asvaentry/vaeasplitsave', { data: self.vaeasplitdata, busy: true }, function (data) {
         if (data && !MessageService.processMessaging(data.messaging)) {
            dtl.loadGridData();
            $state.go('vaea.detail');
         }
      });
   };

   self.cancel = function () {
      $state.go('vaea.detail');
   };

});

app.controller('VaeaMoveToUnavailCtrl', function ($scope, $state) {
   var self = this;
   var dtl = $scope.dtl;

   if (!dtl) {
      $state.go('vaea.detail');
   }
   self.subTitle = dtl.subTitle;

   self.ok = function () {
      var dtl = $scope.dtl;
      dtl.moveToUnavail(self.unavailReasonType);
      $state.go('vaea.detail');
   };

   self.cancel = function () {
      $state.go('vaea.detail');
   };

});

app.controller('VaeaChangeConditionCtrl', function ($scope, $state) {
   var self = this;
   var dtl = $scope.dtl;

   if (!dtl) {
      $state.go('vaea.detail');
   }
   self.subTitle = dtl.subTitle;

   self.ok = function () {
      var dtl = $scope.dtl;
      dtl.changeCondition(self.conditionCode);
      $state.go('vaea.detail');
   };

   self.cancel = function () {
      $state.go('vaea.detail');
   };

});

app.controller('VaeaLotCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.vaRow = $stateParams.varow;
   self.subTitle = base.getFullOrderNumber(self.vaRow.vano, self.vaRow.vasuf);

   self.createIcEntryLotsCriteria = function () {
      var criteria =
      {
         actionty: '',
         cost: 0,
         currproc: 'vaea',
         custno: 0,
         iclotrcptty: '',
         ictype: self.vaRow.transtype,
         inquiryfl: false,
         jrnlno: 0,
         lineno: self.vaRow.lineno,
         method: '',
         orderno: self.vaRow.vano,
         ordersuf: self.vaRow.vasuf,
         ordqty: self.vaRow.stkqtyord,
         origqty: self.vaRow.stkqtyship,
         ourproc: 'vaea',
         outqty: self.vaRow.stkqtyship,
         prod: self.vaRow.shipprod,
         qtyunavail: self.vaRow.netavail,
         retlineno: 0,
         retorderno: 0,
         retordersuf: 0,
         retseqno: 0,
         returnfl: self.vaRow.sctntype === 'ii' ? true : false,
         returnty: '',
         seqno: self.vaRow.seqno,
         shipfmwhse: '',
         shipto: '',
         shiptowhse: '',
         type: 'VA',
         vendno: 0,
         whse: self.vaRow.vawhse,
         wono: 0,
         wosuf: 0,
         btncreateenabled: false,
         accesscutsenabled: false // This is for POEI/WTEI not for VAEA, you get a seperate grid in lots for cuts in VAEA
      };
      return criteria;
   };

   self.lotControlReady = function () {
      // format and add nesseccary criteria to object
      var criteria = self.createIcEntryLotsCriteria();

      // Call initialize method on the Shared-Serials-Ctrl
      self.lotsControl.initialize(criteria);
   };

   self.initialLot = function (originalCriteria) {
      self.lotsControl.initialize(originalCriteria);
   };

   self.lotDoneCallback = function () {
      MessageService.info('global.information', 'message.save.operation.completed.successfully');
      $state.go('vaea.master');
   };

   self.returnToMaster = function () {
      $state.go('vaea.master');
   };
});
