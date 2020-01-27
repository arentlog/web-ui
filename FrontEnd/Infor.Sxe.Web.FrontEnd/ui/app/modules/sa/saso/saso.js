'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saso', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saso');

   $stateProvider.state('saso.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saso/create.json');
            },
            controller: 'SasoCreateCtrl as dtl'
         }
      }
   });

   $stateProvider.state('saso.drilldown', {
      url: '/drilldown',
      params: { drillDownRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saso/drilldown.json');
            },
            controller: 'SasoDrillDownCtrl as drldwn'
         }
      }
   });

   $stateProvider.state('saso.drilldown.subfunction', {
      url: '/sub-function',
      views: {
         linedetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saso/tabs/function-security-sub.json');
            },
            controller: 'SasoDrillDownSubFunctionCtrl as sub'
         }
      }
   });

   $stateProvider.state('saso.drilldown.dropboxkey', {
       url: '/dropbox-key',
       views: {
           linedetail: {
               templateProvider: function (JsonViewService) {
                   return JsonViewService.getView('sa/saso/tabs/dropboxkey.json');
               },
               controller: 'SasoDrillDownDropboxKeyCtrl as drp'
           }
       }
   });
});

app.controller('SasoBaseCtrl', function ($state, ConfigService, DataService, MessageService, OptionSetService, Sasoo, UserService, AodataService) {
   var self = this;
   self.sasoo = Sasoo;
   self.MENUSET_WEBUI = 'web';
   self.ORDERTYPE_CODEIDEN = 'ot';
   self.ORDERTYPE_CODEVAL_STOCKORDER = 'so';
   self.ORDERTYPE_CODEVAL_COUNTERSALE = 'cs';
   self.ORDERTYPE_CODEVAL_RETURNMERCHANDISE = 'rm';
   self.ORDERTYPE_CODEVAL_DIRECTORDER = 'do';
   self.ORDERTYPE_CODEVAL_STOCKORDER = 'so';
   self.ORDERTYPE_CODEVAL_FUTUREORDER = 'fo';
   self.ORDERTYPE_CODEVAL_BLANKETORDER = 'bl';
   self.ORDERTYPE_CODEVAL_STANDINGORDER = 'st';
   self.ORDERTYPE_CODEVAL_QUOTEORDER = 'qu';
   self.twlCoNum = UserService.getTwlCompany();

   self.ORDERTYPE_DESCRIP = 'descrip';
   self.FUNCTIONSECURITY_NO_ACCESS = 1;

   self.criteria = {
      operinit: '',
      whse: '',
      sysadminfl: self.sasoo.sysadminfl,
      profile: '',
      recordlimit: 0
   };

   self.operatorList = '';
   self.multiOperators = false;

   // Arrays for drop downs populated from meta options
   self.metaOptionYesNoOnly = {};
   self.metaOptionYesNoDoNotSet = {};
   self.metaOptionLoginOptions = {};
   self.metaOptionLoginOptionsDoNotSet = {};
   self.metaOptionCostOverride = {};
   self.metaOptionCostOverrideDoNotSet = {};
   self.metaOptionSalesrepOverride = {};
   self.metaOptionSalesrepOverrideDoNotSet = {};
   self.metaOptionQtyShipOverride = {};
   self.metaOptionQtyShipOverrideDoNotSet = {};
   self.metaOptionNonstockQtyOverride = {};
   self.metaOptionNonstockQtyOverrideDoNotSet = {};
   self.metaOptionPromoPriceOverride = {};
   self.metaOptionPromoPriceOverrideDoNotSet = {};
   self.metaOptionLimitOrderType = {};
   self.metaOptionPriceDiscount = {};
   self.metaOptionPriceDiscountDoNotSet = {};
   self.metaOptionPOWTTies = {};
   self.metaOptionPOWTTiesDoNotSet = {};
   self.metaOptionTenderingType = {};
   self.metaOptionTenderingTypeDoNotSet = {};
   self.metaOptionWLPickType = {};
   self.metaOptionHoldForAuth = {};
   self.metaOptionHoldForAuthDoNotSet = {};
   self.metaOptionKPEWPOWT = {};
   self.metaOptionKPEWPOWTDoNotSet = {};
   self.metaOptionOANNS = {};
   self.metaOptionOANNSDoNotSet = {};
   self.metaOptionJMPriceApproval = {};
   self.metaOptionJMPriceApprovalDoNotSet = {};
   self.metaOptionCatalogStocking = {};
   self.metaOptionCatalogStockingDoNotSet = {};
   self.metaOptionVAHeaderType = {};
   self.metaOptionVAHeaderTypeDoNotSet = {};
   self.metaOptionConfigAccess = {};
   self.metaOptionConfigAccessDoNotSet = {};
   self.metaOptionRebateCostMargin = {};
   self.metaOptionRebateCostMarginDoNotSet = {};
   self.metaOptionManualList = {};
   self.metaOptionManualListDoNotSet = {};
   self.metaOptionContactMgrSecurity = {};
   self.metaOptionContactMgrSecurityDoNotSet = {};
   self.metaOptionCreditCardNumbers = {};
   self.metaOptionCreditCardNumbersDoNotSet = {};
   self.metaOptionSaveLoadWeb = {};
   self.metaOptionSaveLoadWebDoNotSet = {};
   self.metaOptionExtendLevelWeb = {};
   self.metaOptionExtendLevelWebDoNotSet = {};
   self.metaOptionUpdateGL = {};
   self.metaOptionUpdateGLDoNotSet = {};
   self.metaOptionOrderFulfillment = {};
   self.metaOptionOrderFulfillmentDoNotSet = {};

   self.stockOrderType = MessageService.get('global.stock.order');
   self.counterSaleOrderType = MessageService.get('global.counter.sale');
   self.defaultFunctionSecurity = 0;
   self.functionSecuritySetForAvailList = false;
   self.userCoNum = UserService.getTwlCompany();

   // Check if Sales Warehouse is turned on
   self.isSalesWhseOn = AodataService.getValue("OE", "OESalesWarehouse").toLowerCase() === 'yes';

   // Check if Order Fulfillment is turned on
   self.isOrderFulfillmentOn = AodataService.getValue("OE", "OEOrderFulfillment").toLowerCase() === 'yes';

   self.isMaster = function () {
      return $state.is('saso.master');
   };

   self.includesMaster = function () {
      return $state.includes('saso.master');
   };

   self.isDetail = function () {
      return $state.is('saso.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saso.detail');
   };

   self.isDrillDown = function () {
      return $state.is('saso.drilldown');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {

      self.criteria.recordlimit = ConfigService.getLookupMaxResults();
      self.criteria.sysadminfl = self.sasoo.sysadminfl;

      if (!self.sasoo.sysadminfl) {
         self.criteria.operinit = self.sasoo.oper2;
         self.search();
      }

      OptionSetService.getGroup('sa', function () {
         // These meta calls are async, need to store this data in the base so it's available during the drill down.
         OptionSetService.get('sa', 'OperatorSetupYesNoOnly', function (optSet) {
            self.metaOptionYesNoOnly = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupYesNoDoNotSet', function (optSet) {
            self.metaOptionYesNoDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupLoginOptions', function (optSet) {
            self.metaOptionLoginOptions = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupLoginOptionsDoNotSet', function (optSet) {
            self.metaOptionLoginOptionsDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupCostOverride', function (optSet) {
            self.metaOptionCostOverride = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupCostOverrideDoNotSet', function (optSet) {
            self.metaOptionCostOverrideDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupSalesrepOverride', function (optSet) {
            self.metaOptionSalesrepOverride = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupSalesrepOverrideDoNotSet', function (optSet) {
            self.metaOptionSalesrepOverrideDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupQtyShipOverride', function (optSet) {
            self.metaOptionQtyShipOverride = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupQtyShipOverrideDoNotSet', function (optSet) {
            self.metaOptionQtyShipOverrideDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupNonstockQtyOverride', function (optSet) {
            self.metaOptionNonstockQtyOverride = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupNonstockQtyOverrideDoNotSet', function (optSet) {
            self.metaOptionNonstockQtyOverrideDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupPromoPriceOverride', function (optSet) {
            self.metaOptionPromoPriceOverride = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupPromoPriceOverrideDoNotSet', function (optSet) {
            self.metaOptionPromoPriceOverrideDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupPriceDiscount', function (optSet) {
            self.metaOptionPriceDiscount = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupPriceDiscountDoNotSet', function (optSet) {
            self.metaOptionPriceDiscountDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupPOWTTies', function (optSet) {
            self.metaOptionPOWTTies = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupPOWTTiesDoNotSet', function (optSet) {
            self.metaOptionPOWTTiesDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupTenderingType', function (optSet) {
            self.metaOptionTenderingType = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupTenderingTypeDoNotSet', function (optSet) {
            self.metaOptionTenderingTypeDoNotSet = optSet.children;
         });
         // There is not a DoNotSet choice for the following drop down (Set checkbox is used)
         OptionSetService.get('sa', 'OperatorSetupWLPickType', function (optSet) {
            self.metaOptionWLPickType = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupHoldForAuth', function (optSet) {
            self.metaOptionHoldForAuth = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupHoldForAuthDoNotSet', function (optSet) {
            self.metaOptionHoldForAuthDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupKPEWPOWT', function (optSet) {
            self.metaOptionKPEWPOWT = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupKPEWPOWTDoNotSet', function (optSet) {
            self.metaOptionKPEWPOWTDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupOANNS', function (optSet) {
            self.metaOptionOANNS = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupOANNSDoNotSet', function (optSet) {
            self.metaOptionOANNSDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupJMPriceApproval', function (optSet) {
            self.metaOptionJMPriceApproval = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupJMPriceApprovalDoNotSet', function (optSet) {
            self.metaOptionJMPriceApprovalDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupCatalogStocking', function (optSet) {
            self.metaOptionCatalogStocking = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupCatalogStockingDoNotSet', function (optSet) {
            self.metaOptionCatalogStockingDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupVAHeaderType', function (optSet) {
            self.metaOptionVAHeaderType = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupVAHeaderTypeDoNotSet', function (optSet) {
            self.metaOptionVAHeaderTypeDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupConfigAccess', function (optSet) {
            self.metaOptionConfigAccess = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupConfigAccessDoNotSet', function (optSet) {
            self.metaOptionConfigAccessDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupRebateCostMargin', function (optSet) {
            self.metaOptionRebateCostMargin = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupRebateCostMarginDoNotSet', function (optSet) {
            self.metaOptionRebateCostMarginDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupManualList', function (optSet) {
            self.metaOptionManualList = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupManualListDoNotSet', function (optSet) {
            self.metaOptionManualListDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupContactMgrSecurity', function (optSet) {
            self.metaOptionContactMgrSecurity = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupContactMgrSecurityDoNotSet', function (optSet) {
            self.metaOptionContactMgrSecurityDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupCreditCardNumbers', function (optSet) {
            self.metaOptionCreditCardNumbers = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupCreditCardNumbersDoNotSet', function (optSet) {
            self.metaOptionCreditCardNumbersDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupSaveLoadWeb', function (optSet) {
            self.metaOptionSaveLoadWeb = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupSaveLoadWebDoNotSet', function (optSet) {
            self.metaOptionSaveLoadWebDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupUpdateGL', function (optSet) {
            self.metaOptionUpdateGL = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupUpdateGLDoNotSet', function (optSet) {
            self.metaOptionUpdateGLDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupExtendWeb', function (optSet) {
            self.metaOptionExtendLevelWeb = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupExtendWebDoNotSet', function (optSet) {
            self.metaOptionExtendLevelWebDoNotSet = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupOrderFulfillment', function (optSet) {
            self.metaOptionOrderFulfillment = optSet.children;
         });
         OptionSetService.get('sa', 'OperatorSetupOrderFulfillmentDoNotSet', function (optSet) {
            self.metaOptionOrderFulfillmentDoNotSet = optSet.children;
         });
      });
      self.getOrderTypeLabelsStock();
   };

   self.getOrderTypeLabelsStock = function () {
      var sastaParams = {
         codeiden: self.ORDERTYPE_CODEIDEN,
         codeval: self.ORDERTYPE_CODEVAL_STOCKORDER,
         fldlist: self.ORDERTYPE_DESCRIP
      };
      DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
         if (sasta) {
            self.stockOrderType = sasta.descrip;
            self.getOrderTypeLabelsCounterSale();
         } else {
            self.getOrderTypeLabelsCounterSale();
         }
      });
   };

   self.getOrderTypeLabelsCounterSale = function () {
      var sastaParams = {
         codeiden: self.ORDERTYPE_CODEIDEN,
         codeval: self.ORDERTYPE_CODEVAL_COUNTERSALE,
         fldlist: self.ORDERTYPE_DESCRIP
      };
      DataService.get('api/sa/sasta/getbypk', { params: sastaParams, busy: true }, function (sasta) {
         if (sasta) {
            self.counterSaleOrderType = sasta.descrip;
            self.buildOrderLimitDropDown();
         } else {
            self.buildOrderLimitDropDown();
         }
      });
   };

   self.buildOrderLimitDropDown = function () {
      var fldListBuilt = [];

      var obj = {
         label: MessageService.get('global.no.limit'),
         type: 'OPT',
         value: ''
      };
      fldListBuilt.push(obj);

      obj = {
         label: self.stockOrderType,
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_STOCKORDER
      };
      fldListBuilt.push(obj);

      obj = {
         label: MessageService.get('global.return.merchandise'),
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_RETURNMERCHANDISE
      };
      fldListBuilt.push(obj);

      obj = {
         label: MessageService.get('global.direct.order'),
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_DIRECTORDER
      };
      fldListBuilt.push(obj);

      obj = {
         label: MessageService.get('global.standing.order'),
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_STANDINGORDER
      };
      fldListBuilt.push(obj);

      obj = {
         label: MessageService.get('global.future.order'),
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_FUTUREORDER
      };
      fldListBuilt.push(obj);

      obj = {
         label: self.counterSaleOrderType,
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_COUNTERSALE
      };
      fldListBuilt.push(obj);

      obj = {
         label: MessageService.get('global.blanket.order'),
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_BLANKETORDER
      };
      fldListBuilt.push(obj);

      obj = {
         label: MessageService.get('global.quote.order'),
         type: 'OPT',
         value: self.ORDERTYPE_CODEVAL_QUOTEORDER
      };
      fldListBuilt.push(obj);

      self.metaOptionLimitOrderType = fldListBuilt;
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/sa/assasetup/sasogetoperatorlist', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();

   self.create = function () {
      $state.go('^.create');
   };

   self.createNewOperatorComplete = function (operator) {
      self.criteria.operinit = operator;
      self.criteria.whse = '';
      self.criteria.profile = '';
      self.sysadminfl = false;
      self.search();
   };
});

app.controller('SasoSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('saso.master');
      }

      base.search();
   };
});

app.controller('SasoMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.deleteOperator = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            DataService.post('api/sa/assasetup/sasodeleteoperator', { data: record, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');

               // Go back to master list and refresh the search
               base.search();
               $state.go('^.master', null, { reload: '^.master' });
            });
         });
      }
   };

   self.drilldown = function () {
      base.operatorList = '';
      base.multiOperators = false;
      var operCount = 0;
      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         records.forEach(function (record) {
            if (record.operinit) {
               if (base.operatorList) {
                  base.operatorList = base.operatorList + '|';
               }
               base.operatorList = base.operatorList + record.operinit;
               operCount++;
            }
         });
      }
      if (operCount > 1) {
         base.multiOperators = true;
      }

      $state.go('saso.drilldown');
   };
});

app.controller('SasoCreateCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.newOperator = {
      operinit: '',
      name: '',
      password: '',
      passwordconfirm: '',
      mustchangefl: false,
      cannotchangefl: false,
      disabledfl: false,
      copyoper: '',
      cloudprovisionfl: false
   };

   self.submit = function () {
      DataService.post('api/sa/assasetup/sasocreateoperator', { data: self.newOperator, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.createNewOperatorComplete(self.newOperator.operinit);
         $state.go('^.master');
      });
   };

   self.cancel = function () {
      $state.go('^.master');
   };

});

app.controller('SasoDrillDownCtrl', function ($state, $scope, $stateParams, AodataService, DataService, GridService, MessageService, ModalService, Sasoo) {
   var self = this;
   self.columnTitleOfTitle = MessageService.get('global.window.title');
   var base = $scope.base;
   self.sasoo = Sasoo;

   self.operatorSetupOper = {
      altoperinit: '',
      altoperinitenabled: false,
      apsuperfl: '',
      arecedbfl: '',
      arwrtofflim: 0,
      autobillwhsefl: '',
      bprvunlkfl: '',
      catconvertfl: '',
      caticcrtty: '',
      cfgaccesscd: '',
      chgbalfl: '',
      chgglcostfl: '',
      credpostfl: '',
      custno: 0,
      custnoenabled: false,
      custnotesfl: '',
      devloc: '',
      devlocset: false,
      extendfl: '',
      formprinternm: '',
      formprinternmset: false,
      helpfl: '',
      holdforauthdefault: '',
      holdoverfl: '',
      holdintlfl: '',
      homewhsefl: '',
      icacquiredtfl: '',
      icmanlistoverfl: '',
      icmanlistty: '',
      icmassmaintfl: '',
      icswstchgfl: '',
      ifsuser: '',
      ifsuserenabled: false,
      intercofl: '',
      jmapprvty: '',
      jmupdprtpofl: '',
      kptietype: '',
      kpverchg: '',
      kpveruse: '',
      langcd: '',
      langcdenabled: false,
      langcdset: false,
      limitholdcds: '',
      limitholdcdsset: false,
      limitslsrepfl: '',
      limittakenbyfl: '',
      ncnrfl: '',
      nonstockfl: '',
      notesfl: '',
      nsbinlocfl: '',
      nscommfl: '',
      nscrtoanty: '',
      oeautoapplyovrfl: '',
      oechglntypefl: '',
      oecostoverty: '',
      oedotyamtmax: 0,
      oedotyamtmin: 0,
      oedotymrgamtmax: 0,
      oedotymrgamtmin: 0,
      oedotymrgpctmax: 0,
      oedotymrgpctmin: 0,
      oehardprcovrfl: '',
      oetoleranceovrfl: '',
      oenoinvoicefl: '',
      oensqtyshpty: '',
      oeonlyfl: '',
      oeoptionfl: '',
      oeorigpromisefl: '',
      oepricefl: '',
      oeqtyshipty: '',
      oerebty: '',
      oeslsrepfl: '',
      oesotyamtmax: 0,
      oesotyamtmin: 0,
      oesotymrgamtmax: 0,
      oesotymrgamtmin: 0,
      oesotymrgpctmax: 0,
      oesotymrgpctmin: 0,
      oetietype: '',
      oetrntype: '',
      oeupdtcustpofl: '',
      operinit: '',
      originchangefl: '',
      ourproc: '',
      password: '',
      pocrctfl: '',
      podotyamtmax: 0,
      podotyamtmin: 0,
      popotyamtmax: 0,
      popotyamtmin: 0,
      printernm: '',
      printernmset: false,
      prodnotesfl: '',
      promoprcwin: '',
      reqtakenfl: '',
      resalefl: '',
      returnpostfl: '',
      rprinternm: '',
      rprinternmset: false,
      saspgroup: '',
      saspgroupset: false,
      secdeptno: 0,
      secdivno: 0,
      secnotefl: '',
      secsubno: 0,
      seecommfl: '',
      seecostfl: '',
      shippingpt: '',
      shippingptenabled: false,
      shiptofl: '',
      showroomuserfl: '',
      showroomuserflenabled: false,
      slsrep: '',
      storefrontuserid: '',
      storefrontuseridenabled: false,
      superfl: '',
      sysadminfl: '',
      taxoverfl: '',
      tenderty: '',
      termsoverfl: '',
      tqemailaddr: '',
      tqposition: '',
      transdt: '',
      transproc: '',
      transtm: '',
      unmaskccty: '',
      updglapty: '',
      updglarty: '',
      updglicty: '',
      updglkpty: '',
      updgloety: '',
      updglpoty: '',
      updglwtty: '',
      useprevnsfl: '',
      user1: '',
      user2: '',
      user3: '',
      user4: '',
      user5: '',
      user6: 0,
      user7: 0,
      user8: '',
      user9: '',
      userclearfl: '',
      usergroup: '',
      usergroupset: false,
      vaautolnentryty: '',
      vaautoshipty: '',
      vaheaderty: '',
      valinecancelfl: '',
      valtakenfl: '',
      vaverchg: '',
      vaveruse: '',
      vendpostfl: '',
      verrcvchgfl: '',
      whse: '',
      whseenabled: false,
      whsegroup: '',
      wlpicktype: '',
      wlpicktypeset: false,
      wtapprwhse: '',
      xconocostfl: '',
      cMyDayUser: '',
      cMyDayUserenabled: false,
      cMyDayTimer: '',
      cMyDayTimerenabled: false,
      twlwhse: '',
      twlrestrictwhsefl: false,
      twllastuseddt: '',
      logintype: '',
      userfield: ''
   };

   self.operatorSetupUser = {
      activityOtherOperFl: '',
      activitySecrLev: 0,
      addFavorites: '',
      addr: '',
      addrenabled: false,
      addr3: '',
      addr3enabled: false,
      aOSecurityset: false,
      apeiaddonfl: '',
      apeiexpensefl: '',
      apeiovertolfl: '',
      apeitradefl: '',
      apeiusecostfl: '',
      arrangeCols: '',
      cannotChange: '',
      cellph: '',
      cellphenabled: false,
      changeAppServer: '',
      changeProfiles: '',
      city: '',
      cityenabled: false,
      contactMgmntSecrLev: 0,
      dept: '',
      disabled: '',
      email: '',
      entryLayout: '',
      etsecurityset: false,
      faxph: '',
      homeph: '',
      homephenabled: false,
      JobTitle: '',
      maxwindows: 0,
      menuSet: '',
      menuSetenabled: false,
      mustChange: '',
      operinit: '',
      pagerph: '',
      webprofilename: '',
      webprofilenameenabled: false,
      profileuserset: '',
      profileusersetenabled: false,
      queueD: '',
      queueDset: false,
      queueS: '',
      queueSset: false,
      queuefl: '',
      seccredmgrfl: '',
      state: '',
      stateenabled: false,
      toolbarLayout: '',
      transdt: '',
      transproc: '',
      transtm: '',
      unlimitedWebAccess: '',
      updategltrans: '',
      user1: '',
      user2: '',
      user3: '',
      user4: '',
      user5: '',
      user6: 0,
      user7: 0,
      user8: '',
      user9: '',
      workph: '',
      webmodificationaccesslevel: '',
      websettingaccesslevel: '',
      zipcd: '',
      zipcdenabled: false,
      password: '',
      userName: '',
      userNameenabled: false,
      userid: '',
      userfield: ''

   };

   self.operatorSetupGL = {
      gloverfl: '',
      arcontrolglacct: '',
      arcontrolglacctdesc: '',
      arcontrolglacctset: false,
      arsalesglacct: '',
      arsalesglacctdesc: '',
      arsalesglacctset: false,
      arbankglacct: '',
      arbankglacctdesc: '',
      arbankglacctset: false,
      arservchgglacct: '',
      arservchgglacctdesc: '',
      arservchgglacctset: false,
      ardiscountglacct: '',
      ardiscountglacctdesc: '',
      ardiscountglacctset: false,
      arwriteoffglacct: '',
      arwriteoffglacctdesc: '',
      arwriteoffglacctset: false,
      apcontrolglacct: '',
      apcontrolglacctdesc: '',
      apcontrolglacctset: false,
      apbankglacct: '',
      apbankglacctdesc: '',
      apbankglacctset: false,
      apdiscountglacct: '',
      apdiscountglacctdesc: '',
      apdiscountglacctset: false,
      apexpenseglacct: '',
      apexpenseglacctdesc: '',
      apexpenseglacctset: false,
      apunmatchedglacct: '',
      apunmatchedglacctdesc: '',
      apunmatchedglacctset: false,
      apvarianceglacct: '',
      apvarianceglacctdesc: '',
      apvarianceglacctset: false,
      appartnerreimburseglacct: '',
      appartnerreimburseglacctdesc: '',
      appartnerreimburseglacctset: false,
      apwarrantyclaimglacct: '',
      apwarrantyclaimglacctdesc: '',
      apwarrantyclaimglacctset: false,
      npclaimvarianceglacct: '',
      npclaimvarianceglacctdesc: '',
      npclaimvarianceglacctset: false,
      iccontrolglacct: '',
      iccontrolglacctdesc: '',
      iccontrolglacctset: false,
      icdirectglacct: '',
      icdirectglacctdesc: '',
      icdirectglacctset: false,
      icnonstockglacct: '',
      icnonstockglacctdesc: '',
      icnonstockglacctset: false,
      iccostadjglacct: '',
      iccostadjglacctdesc: '',
      iccostadjglacctset: false,
      icuninvinvglacct: '',
      icuninvinvglacctdesc: '',
      icuninvinvglacctset: false,
      iccogsglacct: '',
      iccogsglacctdesc: '',
      iccogsglacctset: false,
      icuninvaddonglacct: '',
      icuninvaddonglacctdesc: '',
      icuninvaddonglacctset: false,
      icphyadjglacct: '',
      icphyadjglacctdesc: '',
      icphyadjglacctset: false,
      icrebatecostglacct: '',
      icrebatecostglacctdesc: '',
      icrebatecostglacctset: false,
      icrebatedueglacct: '',
      icrebatedueglacctdesc: '',
      icrebatedueglacctset: false,
      icwipglacct: '',
      icwipglacctdesc: '',
      icwipglacctset: false,
      icwipwriteoffglacct: '',
      icwipwriteoffglacctdesc: '',
      icwipwriteoffglacctset: false,
      icrebatewriteoffglacct: '',
      icrebatewriteoffglacctdesc: '',
      icrebatewriteoffglacctset: false,
      oegrosssalesglacct: '',
      oegrosssalesglacctdesc: '',
      oegrosssalesglacctset: false,
      oedirectsalesglacct: '',
      oedirectsalesglacctdesc: '',
      oedirectsalesglacctset: false,
      oecogsglacct: '',
      oecogsglacctdesc: '',
      oecogsglacctset: false,
      oedirectcogsglacct: '',
      oedirectcogsglacctdesc: '',
      oedirectcogsglacctset: false,
      oedownpayglacct: '',
      oedownpayglacctdesc: '',
      oedownpayglacctset: false,
      oeuninvcashglacct: '',
      oeuninvcashglacctdesc: '',
      oeuninvcashglacctset: false,
      oelinediscglacct: '',
      oelinediscglacctdesc: '',
      oelinediscglacctset: false,
      oeorderdiscglacct: '',
      oeorderdiscglacctdesc: '',
      oeorderdiscglacctset: false,
      oecodglacct: '',
      oecodglacctdesc: '',
      oecodglacctset: false,
      oecorechrgglacct: '',
      oecorechrgglacctdesc: '',
      oecorechrgglacctset: false,
      oelumpsumglacct: '',
      oelumpsumglacctdesc: '',
      oelumpsumglacctset: false,
      oerestockglacct: '',
      oerestockglacctdesc: '',
      oerestockglacctset: false,
      oereturnglacct: '',
      oereturnglacctdesc: '',
      oereturnglacctset: false,
      poorderdiscglacct: '',
      poorderdiscglacctdesc: '',
      poorderdiscglacctset: false,
      potallyglacct: '',
      potallyglacctdesc: '',
      potallyglacctset: false,
      wtcostadjglacct: '',
      wtcostadjglacctdesc: '',
      wtcostadjglacctset: false,
      coresdueglacct: '',
      coresdueglacctdesc: '',
      coresdueglacctset: false,
      corescustliabglacct: '',
      corescustliabglacctdesc: '',
      corescustliabglacctset: false,
      coresconvglacct: '',
      coresconvglacctdesc: '',
      coresconvglacctset: false,
      coresvendliabglacct: '',
      coresvendliabglacctdesc: '',
      coresvendliabglacctset: false,
      coresvarianceglacct: '',
      coresvarianceglacctdesc: '',
      coresvarianceglacctset: false
   };

   self.securityRecordCriteria = {
      cSelectionOperList: '',
      cSelectionMenuSet: base.MENUSET_WEBUI,
      cSelectionRecordType: '',
      cSelectionName: '*',
      cSelectionTitle: '*'
   };

   self.adminOptionRecordList = [];
   self.functionSecurityAvailableList = [];
   self.functionSecuritySetList = [];
   self.functionSecuritySubFuncList = [];
   self.functionSecurityRemoveEnabled = false;
   self.functionSecurityWorkingRecord = {};
   self.ecommerceRecordList = [];
   self.divnosecRecordList = [];
   self.functionSecurityTypes = [];
   self.dropboxCriteria = {};
   self.restrictedCategoriesList = [];

   self.newPassword = '';
   self.isSetCheckBoxVisible = false;
   self.nationalAccountAOData = AodataService.getValue("PD", "PDNationalProgramsFl").toLowerCase();

   // Local arrays for drop downs populated from meta options (in base controller)

   self.optionYesNoOnly = {};
   self.optionLoginOption = {};
   self.optionCostOverride = {};
   self.optionSalesrepOverride = {};
   self.optionQtyShipOverride = {};
   self.optionNonstockQtyOverride = {};
   self.optionPromoPriceOverride = {};
   self.optionLimitOrderType = {};
   self.optionPriceDiscount = {};
   self.optionPOWTTies = {};
   self.optionTenderingType = {};
   self.optionWLPickType = {};
   self.optionHoldForAuth = {};
   self.optionKPEWPOWT = {};
   self.optionOANNS = {};
   self.optionJMPriceApproval = {};
   self.optionCataogStocking = {};
   self.optionVAHeaderType = {};
   self.optionConfigAccess = {};
   self.optionRebateCostMargin = {};
   self.optionManualList = {};
   self.optionContactMgrSecurity = {};
   self.optionCreditCardNumbers = {};
   self.optionSaveLoadWeb = {};
   self.optionExtendWeb = {};
   self.optionUpdateGL = {};
   self.optionOrderFulfillment = {};

   // Flags to control which tab is in view
   self.isStaticInformation = true;
   self.isEntryOptions = false;
   self.isControls = false;
   self.isOtherOptions = false;
   self.isFunctionSecurity = false;

   // Check if ISM is live
   self.isIsmLive = AodataService.getValue("SM", "ismlive");

   self.isStaticInformationInView = function () {
      return self.isStaticInformation;
   };

   self.isEntryOptionsInView = function () {
      return self.isEntryOptions;
   };

   self.isControlsInView = function () {
      return self.isControls;
   };

   self.isOtherOptionsInView = function () {
      return self.isOtherOptions;
   };

   self.isFunctionSecurityInView = function () {
      return self.isFunctionSecurity;
   };

   self.isFunctionSecurityLoadCurrSettingEnabled = function () {
      var retn = false;
      if (!base.multiOperators) {
         retn = true;
      }
      return retn;
   };

   self.isFunctionSecuritySubFuncEnabled = function () {
      var retn = false;
      if (self.functionSecuritySetListGrid.isOneRowSelected()) {
         var record = GridService.getSelectedRecord(self.functionSecuritySetListGrid);
         if (record && record.folderfunctionnamesfl) {

            retn = true;
         }
      }

      return retn;
   };

   self.isFunctionSecurityRemoveEnabled = function () {
      var retn = false;

      if (self.functionSecurityRemoveEnabled && !self.functionSecuritySetListGrid.isNoRowSelected()) {
         retn = true;
      }
      return retn;
   };

   self.buildFunctionSecurityTypes = function () {
      var criteria = {
         typeCode: ''
      };
      DataService.post('api/pv/pvsassmtypes/getallpvsassmtypeslist', { data: criteria, busy: true }, function (data) {
         if (data) {
            var fldListBuilt = [];
            var obj = {
               label: '',
               type: 'OPT',
               value: ''
            };
            fldListBuilt.push(obj);
            data.forEach(function (record) {
               obj = {
                  label: record.name,
                  type: 'OPT',
                  value: record.typeCode
               };
               fldListBuilt.push(obj);
            });
            self.functionSecurityTypes = fldListBuilt;
         }
      });
   };

   //User Hook (do not rename)
   self.initializeDataContinue = function () {
      // Present the Static Information tab to the user (as the first tab)
      self.setTabScreen('static');
      self.buildFunctionSecurityTypes();
   };

   self.loadNoteCategories = function () {
      var loadTableDataRequest = {
         sasttcodes: {
            codeid: 'NC',
            filename: 'A',
         },
         sasttsearchcriteria: {
            searchname: 'usagefl',
            searchvalue: 'yes'
         }
      };
      DataService.post('api/sa/assasetup/sasttloadtabledata', { data: loadTableDataRequest, busy: true }, function (loadData) {
         if (loadData) {
            self.restrictedCategoriesList = loadData;
            // set checkboxes
            if (self.operatorSetupOper.contactnotety) {
               var permissionsArray = self.operatorSetupOper.contactnotety.split(',');
               self.restrictedCategoriesList.forEach(function (rec) {
                  if (permissionsArray.indexOf(rec.codeval) >= 0) {
                     rec.selectedfl = true;
                  }
               });
            }
         }
      });
   };

   // first time in here
   if (base.operatorList) {

      self.functionSecurityRemoveEnabled = true;
      self.isSetCheckBoxVisible = false;
      if (base.multiOperators) {
         self.isSetCheckBoxVisible = true;
      }

      self.loadNoteCategories();

      DataService.post('api/sa/assasetup/sasosetupretrieve', { data: { cOperList: base.operatorList }, busy: true }, function (data) {
         if (data) {
            self.operatorSetupOper = data.sasosetupoper;
            self.operatorSetupUser = data.sasosetupuser;
            self.operatorSetupGL = data.sasosetupgl;
            self.adminOptionRecordList = data.sasosetupaosecure;
            self.ecommerceRecordList = data.sasosetupetcc;
            self.operatorSetupOper.oetrntype = self.operatorSetupOper.oetrntype.split(',');
            self.divnosecRecordList = data.sasosetupdivnosec;

            // Setup the various drop down fields from the meta data populated from the base controller.
            if (!base.multiOperators) {
               // ****** Single Operator being updated
               self.optionYesNoOnly = base.metaOptionYesNoOnly;
               self.optionLoginOption = base.metaOptionLoginOptions;
               self.optionCostOverride = base.metaOptionCostOverride;
               self.optionSalesrepOverride = base.metaOptionSalesrepOverride;
               self.optionQtyShipOverride = base.metaOptionQtyShipOverride;
               self.optionNonstockQtyOverride = base.metaOptionNonstockQtyOverride;
               self.optionPromoPriceOverride = base.metaOptionPromoPriceOverride;
               self.optionLimitOrderType = base.metaOptionLimitOrderType;
               self.optionPriceDiscount = base.metaOptionPriceDiscount;
               self.optionPOWTTies = base.metaOptionPOWTTies;
               self.optionTenderingType = base.metaOptionTenderingType;
               self.optionWLPickType = base.metaOptionWLPickType;
               self.optionHoldForAuth = base.metaOptionHoldForAuth;
               self.optionKPEWPOWT = base.metaOptionKPEWPOWT;
               self.optionOANNS = base.metaOptionOANNS;
               self.optionJMPriceApproval = base.metaOptionJMPriceApproval;
               self.optionCatalogStocking = base.metaOptionCatalogStocking;
               self.optionVAHeaderType = base.metaOptionVAHeaderType;
               self.optionConfigAccess = base.metaOptionConfigAccess;
               self.optionRebateCostMargin = base.metaOptionRebateCostMargin;
               self.optionManualList = base.metaOptionManualList;
               self.optionContactMgrSecurity = base.metaOptionContactMgrSecurity;
               self.optionCreditCardNumbers = base.metaOptionCreditCardNumbers;
               self.optionSaveLoadWeb = base.metaOptionSaveLoadWeb;
               self.optionExtendWeb = base.metaOptionExtendLevelWeb;
               self.optionUpdateGL = base.metaOptionUpdateGL;
               self.optionOrderFulfillment = base.metaOptionOrderFulfillment;
            } else {
               // ****** Multiple Operators being updated
               self.optionYesNoOnly = base.metaOptionYesNoDoNotSet;
               self.optionLoginOption = base.metaOptionLoginOptionsDoNotSet;
               self.optionCostOverride = base.metaOptionCostOverrideDoNotSet;
               self.optionSalesrepOverride = base.metaOptionSalesrepOverrideDoNotSet;
               self.optionQtyShipOverride = base.metaOptionQtyShipOverrideDoNotSet;
               self.optionNonstockQtyOverride = base.metaOptionNonstockQtyOverrideDoNotSet;
               self.optionPromoPriceOverride = base.metaOptionPromoPriceOverrideDoNotSet;

               // Add a "Do Not Set" choice to the Limit Order Type drop down choice (not able to do this in the base controller)
               self.optionLimitOrderType = base.metaOptionLimitOrderType;

               var obj = {
                  label: MessageService.get('global.do.not.set'),
                  type: 'OPT',
                  value: 'd'
               };
               self.optionLimitOrderType.push(obj);

               self.optionPriceDiscount = base.metaOptionPriceDiscountDoNotSet;
               self.optionPOWTTies = base.metaOptionPOWTTiesDoNotSet;
               self.optionTenderingType = base.metaOptionTenderingTypeDoNotSet;
               // We don't need a DoNotSet option for the following drop down since there is a Set checkbox.
               self.optionWLPickType = base.metaOptionWLPickType;
               self.optionHoldForAuth = base.metaOptionHoldForAuthDoNotSet;
               self.optionKPEWPOWT = base.metaOptionKPEWPOWTDoNotSet;
               self.optionOANNS = base.metaOptionOANNSDoNotSet;
               self.optionJMPriceApproval = base.metaOptionJMPriceApprovalDoNotSet;
               self.optionCatalogStocking = base.metaOptionCatalogStockingDoNotSet;
               // SI call should be setting the following field to "d" (Do Not Set).
               self.operatorSetupOper.caticcrtty = 'd';
               self.optionVAHeaderType = base.metaOptionVAHeaderTypeDoNotSet;
               self.optionConfigAccess = base.metaOptionConfigAccessDoNotSet;
               self.optionRebateCostMargin = base.metaOptionRebateCostMarginDoNotSet;
               self.optionManualList = base.metaOptionManualListDoNotSet;
               self.optionContactMgrSecurity = base.metaOptionContactMgrSecurityDoNotSet;
               self.optionCreditCardNumbers = base.metaOptionCreditCardNumbersDoNotSet;
               self.optionSaveLoadWeb = base.metaOptionSaveLoadWebDoNotSet;
               self.optionExtendWeb = base.metaOptionExtendLevelWebDoNotSet;
               self.optionUpdateGL = base.metaOptionUpdateGLDoNotSet;
               self.optionOrderFulfillment = base.metaOptionOrderFulfillmentDoNotSet;
            }

            if (self.sasoo.sysadminfl) {
               if (self.operatorSetupUser.webprofilename && !self.operatorSetupUser.profileusersetenabled) {
                  self.operatorSetupUser.profileusersetenabled = true;
               }
            }

            // set checkboxes for Note Category Permissions grid
            if (self.operatorSetupOper.contactnotety) {
               var permissionsArray = self.operatorSetupOper.contactnotety.split(',');
               self.restrictedCategoriesList.forEach(function (record) {
                  if (permissionsArray.indexOf(record.codeval) >= 0) {
                     record.selectedfl = true;
                  }
               });
            }

            //User Hook (do not rename)
            self.initializeDataContinue();
         }
      });
   }

   self.exitDetail = function () {

      // don't force a refresh since no rows are changed
      $state.go('^.master', { refreshSearch: false }, { reload: '^.master' });
   };

   self.menuSetChanged = function () {
      if (self.securityRecordCriteria.cSelectionMenuSet === base.MENUSET_WEBUI) {
         self.columnTitleOfTitle = MessageService.get('global.window.title');
      } else {
         self.columnTitleOfTitle = MessageService.get('global.menu.title');
      }
   };

   self.setTabScreen = function (screenName) {
      if (screenName === 'static') {
         self.isStaticInformation = true;
         self.isEntryOptions = false;
         self.isControls = false;
         self.isOtherOptions = false;
         self.isFunctionSecurity = false;
      } else if (screenName === 'entry') {
         self.isStaticInformation = false;
         self.isEntryOptions = true;
         self.isControls = false;
         self.isOtherOptions = false;
         self.isFunctionSecurity = false;
      } else if (screenName === 'controls') {
         self.isStaticInformation = false;
         self.isEntryOptions = false;
         self.isControls = true;
         self.isOtherOptions = false;
         self.isFunctionSecurity = false;
      } else if (screenName === 'other') {
         self.isStaticInformation = false;
         self.isEntryOptions = false;
         self.isControls = false;
         self.isOtherOptions = true;
         self.isFunctionSecurity = false;
      } else {
         self.isStaticInformation = false;
         self.isEntryOptions = false;
         self.isControls = false;
         self.isOtherOptions = false;
         self.isFunctionSecurity = true;
      }
   };

   self.profileChanged = function () {

      if (self.sasoo.sysadminfl) {
         if (self.operatorSetupUser.webprofilename && !self.operatorSetupUser.profileusersetenabled) {
            self.operatorSetupUser.profileusersetenabled = true;
         }
      }
   };

   self.submit = function () {
      if (self.newPassword) {
         self.operatorSetupOper.password = self.newPassword;
         self.operatorSetupUser.password = self.newPassword;
      }

      self.operatorSetupOper.oetrntype = self.operatorSetupOper.oetrntype.toString();

      // Validate Static Information screen
      var screenName = 'static';
      self.setTabScreen('static');
      DataService.post('api/sa/assasetup/sasosetupvalidate', { data: { sasosetupgl: self.operatorSetupGL, sasosetupoper: self.operatorSetupOper, sasosetupuser: self.operatorSetupUser, cOperList: base.operatorList, cScreen: screenName }, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               self.submitValidateEntry();
            }
         } else {
            self.submitValidateEntry();
         }
      });
   };

   self.submitValidateEntry = function () {
      // Validate Entry Options screen
      var screenName = 'entry';
      self.setTabScreen('entry');
      DataService.post('api/sa/assasetup/sasosetupvalidate', { data: { sasosetupgl: self.operatorSetupGL, sasosetupoper: self.operatorSetupOper, sasosetupuser: self.operatorSetupUser, cOperList: base.operatorList, cScreen: screenName }, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               self.submitValidateControls();
            }
         } else {
            self.submitValidateControls();
         }
      });
   };

   self.submitValidateControls = function () {
      // Validate Entry Options screen
      var screenName = 'controls';
      self.setTabScreen('controls');
      DataService.post('api/sa/assasetup/sasosetupvalidate', { data: { sasosetupgl: self.operatorSetupGL, sasosetupoper: self.operatorSetupOper, sasosetupuser: self.operatorSetupUser, cOperList: base.operatorList, cScreen: screenName }, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               self.submitValidateOtherOptions();
            }
         } else {
            self.submitValidateOtherOptions();
         }
      });
   };

   self.submitValidateOtherOptions = function () {
      // Validate Other Options screen
      var screenName = 'other';
      self.setTabScreen('other');
      DataService.post('api/sa/assasetup/sasosetupvalidate', { data: { sasosetupgl: self.operatorSetupGL, sasosetupoper: self.operatorSetupOper, sasosetupuser: self.operatorSetupUser, cOperList: base.operatorList, cScreen: screenName }, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               self.submitValidateFunctionSecurity();
            }
         } else {
            self.submitValidateFunctionSecurity();
         }
      });
   };

   self.submitValidateFunctionSecurity = function () {
      // Validate Function Security screen
      var screenName = 'funcsec';
      self.setTabScreen('funcsec');
      DataService.post('api/sa/assasetup/sasosetupvalidate', { data: { sasosetupgl: self.operatorSetupGL, sasosetupoper: self.operatorSetupOper, sasosetupuser: self.operatorSetupUser, cOperList: base.operatorList, cScreen: screenName }, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               self.submitFinal();
            }
         } else {
            self.submitFinal();
         }
      });
   };

   self.submitFinal = function () {
      DataService.post('api/sa/assasetup/sasosetupfinalupdate', {
         data: {
            sasosetupaosecure: self.adminOptionRecordList,
            sasosetupetcc: self.ecommerceRecordList,
            sasosetupfuncsecset: self.functionSecuritySetList,
            sasosetupgl: self.operatorSetupGL,
            sasosetupoper: self.operatorSetupOper,
            sasosetupuser: self.operatorSetupUser,
            sasosetupdivnosec: self.divnosecRecordList,
            cOperList: base.operatorList
         }, busy: true
      }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   self.allowDisallowAOSettings = function (allowFlag) {
      var records = GridService.getSelectedRecords(self.adminOptionRecordListGrid);
      if (records) {
         records.forEach(function (record) {
            record.selectedfl = allowFlag;
            var indx = self.adminOptionRecordList.indexOf(record);
            self.adminOptionRecordListGrid.updateRow(indx);
         });
      }
   };

   self.allowDisallowElectronicControls = function (allowFlag) {
      var records = GridService.getSelectedRecords(self.ecommerceRecordListGrid);
      if (records) {
         records.forEach(function (record) {
            record.selectedfl = allowFlag;
            var indx = self.ecommerceRecordList.indexOf(record);
            self.ecommerceRecordListGrid.updateRow(indx);
         });
      }
   };

   self.allowDisallowNotePermissions = function (allowFlag) {
      self.operatorSetupOper.contactnotety = '';
      var records = GridService.getSelectedRecords(self.noteCategoriesRecordListGrid);
      if (records) {
         records.forEach(function (record) {
            record.selectedfl = allowFlag;
            var indx = self.restrictedCategoriesList.indexOf(record);
            self.noteCategoriesRecordListGrid.updateRow(indx);
         });
      }
      // load the selected note categories into sasoo field
      self.restrictedCategoriesList.forEach(function (record) {
         if (record.selectedfl) {
            self.operatorSetupOper.contactnotety += record.codeval + ',';
         }
      });
      // remove trailing comma
      self.operatorSetupOper.contactnotety = self.operatorSetupOper.contactnotety.substring(0, self.operatorSetupOper.contactnotety.length - 1);
   };

   self.allowDisallowDivNoSec = function (allowFlag) {
      var records = GridService.getSelectedRecords(self.divnosecRecordListGrid);
      if (records) {
         records.forEach(function (record) {
            record.selectedfl = allowFlag;
            var indx = self.divnosecRecordList.indexOf(record);
            self.divnosecRecordListGrid.updateRow(indx);
         });
      }
   };

   self.functionSecuritySearch = function () {
      self.securityRecordCriteria.cSelectionOperList = base.operatorList;
      DataService.post('api/sa/assasetup/sasosetupfuncsecureload', { data: self.securityRecordCriteria, busy: true }, function (data) {
         if (data) {
            self.functionSecurityAvailableList = data;
         }
      });
   };

   self.setFunctionSecurityAvailGrid = function () {
      var records = GridService.getSelectedRecords(self.functionSecurityAvailableListGrid);
      if (records) {
         base.defaultFunctionSecurity = base.FUNCTIONSECURITY_NO_ACCESS;
         // Check for security setting > 0 for the first row
         if (records[0].functionsecurity) {
            base.defaultFunctionSecurity = records[0].functionsecurity;
         }
         base.functionSecuritySetForAvailList = true;
         ModalService.showModal('sa/saso/tabs/function-security-set.json', 'SasoDrillDownSetCtrl as st', $scope, function (modal) {
            self.functionSecuritySetModal = modal;
         });
      }
   };

   self.setFunctionSecuritySetGrid = function () {
      var records = GridService.getSelectedRecords(self.functionSecuritySetListGrid);
      if (records) {
         base.defaultFunctionSecurity = base.FUNCTIONSECURITY_NO_ACCESS;
         // Check for security setting > 0 for the first row
         if (records[0].functionsecurity) {
            base.defaultFunctionSecurity = records[0].functionsecurity;
         }
         base.functionSecuritySetForAvailList = false;
         ModalService.showModal('sa/saso/tabs/function-security-set.json', 'SasoDrillDownSetCtrl as st', $scope, function (modal) {
            self.functionSecuritySetModal = modal;
         });
      }
   };

   self.setFunctionSecurityCompleted = function (functionSecurity) {
      if (base.functionSecuritySetForAvailList) {
         var records = GridService.getSelectedRecords(self.functionSecurityAvailableListGrid);
         if (records) {
            var listAvailable = [];
            records.forEach(function (record) {
               listAvailable.push(record);
            });

            DataService.post('api/sa/assasetup/sasosetupfuncsecureset', { data: { sasosetupfuncsecavail: listAvailable, iSecurity: functionSecurity }, busy: true }, function (data) {
               if (data) {

                  var setListEmpty = true;
                  if (self.functionSecuritySetList && self.functionSecuritySetList.length) {
                     setListEmpty = false;
                  }

                  if (setListEmpty) {
                     self.functionSecuritySetList = data;
                  } else {

                     // Loop through each returned record and either update an existing row, or add a new row to the list.
                     data.forEach(function (record) {

                        var foundExisting = false;
                        self.functionSecuritySetList.forEach(function (listRecord) {
                           if (record.pvsassmrowid === listRecord.pvsassmrowid) {
                              foundExisting = true;
                              listRecord.functionsecurity = record.functionsecurity;
                              listRecord.folderfunctionsecurity = record.folderfunctionsecurity;

                              var indx = self.functionSecuritySetList.indexOf(listRecord);
                              self.functionSecuritySetListGrid.updateRow(indx);
                           }
                        });

                        if (!foundExisting) {
                           self.functionSecuritySetList.push(record);
                        }
                     });
                  }
               }
            });
         }
      } else {
         var records = GridService.getSelectedRecords(self.functionSecuritySetListGrid);
         if (records) {

            records.forEach(function (record) {
               record.functionsecurity = functionSecurity;
               var indx = self.functionSecuritySetList.indexOf(record);
               self.functionSecuritySetListGrid.updateRow(indx);
            });
         }
      }
   };

   self.functionSecurityLoadCurrSettings = function () {
      self.functionSecuritySetList = [];
      // Once the Load Current settings button is clicked, the user can no longer use the remove button.
      // The remove button does not delete records from the SX backend, only remove records from "Set" grid.
      self.functionSecurityRemoveEnabled = false;
      DataService.get('api/sa/assasetup/sasosetupfuncsecurecurroper/' + base.operatorList, { busy: true }, function (data) {
         if (data) {
            self.functionSecuritySetList = data;
         }
      });
   };

   self.functionSecurityRemove = function () {
      var records = GridService.getSelectedRecords(self.functionSecuritySetListGrid);
      if (records) {
         records.forEach(function (record) {
            var indx = self.functionSecuritySetList.indexOf(record);
            self.functionSecuritySetList.splice(indx, 1);
         });
      }
   };

   self.functionSecuritySubFunctionLaunch = function () {
      self.functionSecurityWorkingRecord = GridService.getSelectedRecord(self.functionSecuritySetListGrid);
      if (self.functionSecurityWorkingRecord && self.functionSecurityWorkingRecord.folderfunctionnamesfl) {

         DataService.post('api/sa/assasetup/sasosetupfuncsecuresubfuncload', { data: self.functionSecurityWorkingRecord, busy: true }, function (data) {
            if (data) {
               self.functionSecuritySubFuncList = data;
               $state.go('saso.drilldown.subfunction');
            }
         });
      }
   };

   self.functionSecuritySubFunctionUpdate = function () {
      var subFunctionString = '';
      self.functionSecuritySubFuncList.forEach(function (record) {
         if (subFunctionString) {
            subFunctionString = subFunctionString + self.functionSecurityWorkingRecord.folderdelimiter;
         }
         subFunctionString = subFunctionString + record.subfunctionsecurity.toString();
      });
      var record = GridService.getSelectedRecord(self.functionSecuritySetListGrid);
      if (record) {
         record.folderfunctionsecurity = subFunctionString;
         var indx = self.functionSecuritySetList.indexOf(record);
         self.functionSecuritySetListGrid.updateRow(indx);
      }
   };

   self.dropboxTestAuthorization = function () {
      self.dropboxCriteria.finalauthcode = self.operatorSetupUser.dropboxkey;
      DataService.post('api/sa/assasetup/dropboxauthtestfinalkey', { data: self.dropboxCriteria, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'global.successful');
         }
      });
   };

   self.dropboxGenerateKey = function () {
      $state.go('saso.drilldown.dropboxkey');
   };

   self.dropboxKeyGenerated = function (finalKey) {
      if (finalKey) {
         self.operatorSetupUser.dropboxkey = finalKey;
      }
   }

});

app.controller('SasoDrillDownSetCtrl', function ($scope, DataService) {
   var self = this;
   var base = $scope.base;
   var drldwn = $scope.drldwn;
   self.functionSecurity = base.defaultFunctionSecurity;

   // Cancel action
   self.cancel = function () {
      drldwn.functionSecuritySetModal.destroy();
   };

   // Submit action
   self.submit = function () {
      drldwn.setFunctionSecurityCompleted(self.functionSecurity);
      drldwn.functionSecuritySetModal.destroy();
   };
});

app.controller('SasoDrillDownSubFunctionCtrl', function ($scope, $state, DataService, GridService, MessageService) {
   //sub
   var self = this;
   var base = $scope.base;
   var drldwn = $scope.drldwn;

   self.setting = base.FUNCTIONSECURITY_NO_ACCESS;
   self.dropDownOptions = [];

   // Cancel action
   self.cancel = function () {
      $state.go('^');
   };

   self.buildSettingsDropDown = function () {
      var fldListBuilt = [];

      var obj = {
         label: MessageService.get('global.1.no.access'),
         type: 'OPT',
         value: 1
      };
      fldListBuilt.push(obj);

      if (drldwn.functionSecurityWorkingRecord.functionsecurity >= 2) {
         obj = {
            label: MessageService.get('global.2.inquiry.only'),
            type: 'OPT',
            value: 2
         };
         fldListBuilt.push(obj);
      }
      if (drldwn.functionSecurityWorkingRecord.functionsecurity >= 3) {
         obj = {
            label: MessageService.get('global.3.inquiry.and.change'),
            type: 'OPT',
            value: 3
         };
         fldListBuilt.push(obj);
      }
      if (drldwn.functionSecurityWorkingRecord.functionsecurity >= 4) {
         obj = {
            label: MessageService.get('global.4.inquiry.change.and.add'),
            type: 'OPT',
            value: 4
         };
         fldListBuilt.push(obj);
      }
      if (drldwn.functionSecurityWorkingRecord.functionsecurity >= 5) {
         obj = {
            label: MessageService.get('global.5.full.security'),
            type: 'OPT',
            value: 5
         };
         fldListBuilt.push(obj);
      }

      self.dropDownOptions = fldListBuilt;
   };

   // Submit action
   self.submit = function () {
      drldwn.functionSecuritySubFunctionUpdate();
      $state.go('^');
   };

   self.setSecurity = function () {
      var records = GridService.getSelectedRecords(drldwn.functionSecuritySubFuncListGrid);
      if (records) {
         records.forEach(function (record) {
            record.subfunctionsecurity = self.setting;
            var indx = drldwn.functionSecuritySubFuncList.indexOf(record);
            drldwn.functionSecuritySubFuncListGrid.updateRow(indx);
         });
      }
   };

   // First time in here
   if (drldwn) {
      self.setting = drldwn.functionSecurityWorkingRecord.functionsecurity;
      self.buildSettingsDropDown();
   }
});

app.controller('SasoDrillDownDropboxKeyCtrl', function ($state, $scope, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.drldwn = $scope.drldwn;

   self.dropbox = {
      userkey: '',
      passwordkey: '',
      url: '',
      tempauthcode: '',
      finalauthcode: ''
   };

   self.cancel = function () {
      $state.go('saso.drilldown');
   };

   self.leaveUserNameField = function () {
      DataService.post('api/sa/assasetup/dropboxauthkeyfieldleave', { data: self.dropbox, busy: true }, function (data) {
         if (data) {
            self.dropbox = data;
         }
      });
   };

   self.submit = function () {
      DataService.post('api/sa/assasetup/dropboxauthgeneratekey', { data: self.dropbox, busy: true }, function (data) {
         if (data) {
            self.dropbox = data;
            self.drldwn.dropboxKeyGenerated(self.dropbox.finalauthcode);
            $state.go('saso.drilldown');
         }
      });
   };
});

