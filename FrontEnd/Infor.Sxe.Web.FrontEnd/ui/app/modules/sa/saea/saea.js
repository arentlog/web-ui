'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saea', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saea');

   $stateProvider.state('saea.detail', {
      url: '/detail',
      params: {
         saeaEvents: null,
         isSaveRefreshMode: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/detail.json');
            },
            controller: 'SaeaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('saea.actionDetail', {
      url: '/action-detail',
      params: {
         saeaEvents: null,
         saeaActionSummary: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/action-detail.json');
            },
            controller: 'SaeaActionDetailCtrl as actdtl'
         }
      }
   });

   //These are sub-actions, not a siblings. (because these Add screens can't stand on their own)
   $stateProvider.state('saea.actionDetail.addToCustomers', {
      url: '/add-customers',
      params: {
         saeaActionSummary: null,
         saeaListCust: null
      },
      views: {
         addCustomer: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/action-detail-add-cust.json');
            },
            controller: 'SaeaActionDetailAddToCustCtrl as actdtladdcust'
         }
      }
   });

   $stateProvider.state('saea.actionDetail.addToProducts', {
      url: '/add-products',
      params: {
         saeaActionSummary: null,
         saeaListProd: null
      },
      views: {
         addProduct: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/action-detail-add-prod.json');
            },
            controller: 'SaeaActionDetailAddToProdCtrl as actdtladdprod'
         }
      }
   });

   $stateProvider.state('saea.actionDetail.addToProdCats', {
      url: '/add-product-categories',
      params: {
         saeaActionSummary: null,
         saeaListPcat: null
      },
      views: {
         addProdCat: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/action-detail-add-prodcat.json');
            },
            controller: 'SaeaActionDetailAddToProdCatCtrl as actdtladdprodcat'
         }
      }
   });

   $stateProvider.state('saea.actionDetail.addToRegions', {
      url: '/add-regions',
      params: {
         saeaActionSummary: null,
         saeaListReg: null
      },
      views: {
         addRegion: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/action-detail-add-region.json');
            },
            controller: 'SaeaActionDetailAddToRegionCtrl as actdtladdreg'
         }
      }
   });

   $stateProvider.state('saea.actionDetail.addToVendors', {
      url: '/add-vendors',
      params: {
         saeaActionSummary: null,
         saeaListVend: null
      },
      views: {
         addVendor: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/action-detail-add-vend.json');
            },
            controller: 'SaeaActionDetailAddToVendorCtrl as actdtladdvend'
         }
      }
   });

   $stateProvider.state('saea.actionDetail.addToWarehouses', {
      url: '/add-warehouses',
      params: {
         saeaActionSummary: null,
         saeaListWhse: null
      },
      views: {
         addWhse: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saea/action-detail-add-whse.json');
            },
            controller: 'SaeaActionDetailAddToWhseCtrl as actdtladdwhse'
         }
      }
   });
});

app.controller('SaeaBaseCtrl', function ($state, DataService) {
   var self = this;
   self.LIST_TYPE_CUSTOMER = 'c';
   self.LIST_TYPE_PRODUCT = 'p';
   self.LIST_TYPE_PRODCAT = 't';
   self.LIST_TYPE_REGION = 'r';
   self.LIST_TYPE_VENDOR = 'v';
   self.LIST_TYPE_WAREHOUSE = 'w';
   self.RANGETYPE_ALL = 'a',
   self.RANGETYPE_RANGE = 'r',
   self.RANGETYPE_LIST = 'l',
   self.ACTIONSUBJECTTYPE_CONTACT = 'n';
   self.ACTIONSUBJECTTYPE_EMAIL = 'm';
   self.ACTIONSUBJECTTYPE_GROUP = 'g';
   self.ACTIONSUBJECTTYPE_OPERATOR = 'o';
   self.ACTIONSUBJECTTYPE_POSITION = 'p';
   self.ACTIONTYPE_EMAIL = 'e';
   self.ACTIONTYPE_ION = 'i';
   self.ACTIONTYPE_PROGRAM = 'r';
   self.ACTIVEFLAG_YES = 'Y';
   self.ACTIVEFLAG_NO = 'N';
   self.CONTACTS_CONTACTYPE_ALL = '';

   self.criteria = {};

   self.isMaster = function () {
      return $state.is('saea.master');
   };

   self.includesMaster = function () {
      return $state.includes('saea.master');
   };

   self.isDetail = function () {
      return $state.is('saea.detail');
   };

   self.includesDetail = function () {
      return $state.includes('saea.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      var requestCriteria = {
         cEventName: self.criteria.cEventName,
         cTriggerName: self.criteria.cTriggerName,
         lActiveOnly: self.criteria.lActiveOnly
      };

      DataService.post('api/sa/assaentry/saeaeventsload', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };
});

app.controller('SaeaSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saea.master');
      }

      base.search();
   };
});

app.controller('SaeaMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService) {
   var self = this;
   var base = $scope.base;

   self.setActiveFlag = function (selectionValue) {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      if (selectedRows) {
         var requestCriteria = {
            saeaevents: selectedRows,
            cActivateFl: selectionValue
         };

         DataService.post('api/sa/assaentry/saeaeventsupdate', { data: requestCriteria, busy: true }, function () {
            base.search();
         });
      }
   };

   self.setPurgeFlag = function (selectionValue) {
      var selectedRows = GridService.getSelectedRecords(base.grid);
      if (selectedRows) {
         selectedRows.forEach(function (saeaevents) {
            saeaevents.purgetransfl = selectionValue;
         });

         //Note: This is by design, not to set the cActiveFl for the call to set the Purge Flag.
         var requestCriteria = {
            saeaevents: selectedRows,
            cActivateFl: ''
         };

         DataService.post('api/sa/assaentry/saeaeventsupdate', { data: requestCriteria, busy: true }, function () {
            base.search();
         });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { saeaEvents: record, isSaveRefreshMode: false });
   };
});

//Sub section expander in the Master Grid.  Used for Edit mode.
//Alias: line
app.controller('SaeaMasterRowCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var mst = $scope.mst;

   //Gives us details for the current row.
   var saeaRow = mst.rowParams.item;
   var grid = mst.rowParams.grid;
   var rowNumber = mst.rowParams.row;

   self.eventSetup = {};

   var params = { eventname: saeaRow.eventname };
   DataService.get('api/shared/eventsetup/getbypk', { params: params, busy: true }, function (data) {
      if (data) {
         self.eventSetup = data;
      }
   });

});

//This is shown when the user drills down from the Master.
//Alias: dtl
app.controller('SaeaDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, SecurityService) {
   var self = this;
   var base = $scope.base;
   self.saeaEvents = $stateParams.saeaEvents;
   self.isSaveRefreshMode = $stateParams.isSaveRefreshMode;
   self.eventSetup = {};
   self.triggerSetup = {};
   self.saeaActionSummaryList = [];

   self.isEventTabReadonly = SecurityService.getSubSecurityLevel('saea', 'Event') < 3;
   self.isActionTabReadonly = SecurityService.getSubSecurityLevel('saea', 'Action') < 3;

   self.setActionFlag = function (value) {
      var selectedRows = GridService.getSelectedRecords(self.grid);
      if (selectedRows) {
         selectedRows.forEach(function (saeaactionsummary) {
            saeaactionsummary.lActive = value;
         });

         var saeaactionsummaryupdateRequest = {
            saeaactionsummary: selectedRows,
            cActivateFl: value === true ? base.ACTIVEFLAG_YES : base.ACTIVEFLAG_NO
         };

         DataService.post('api/sa/assaentry/saeaactionsummaryupdate', { data: saeaactionsummaryupdateRequest, busy: true }, function (data) {
            if (data) {
               self.grid.loadData(self.saeaActionSummaryList);
            }
         });
      }
   };

   self.createAction = function () {
      self.saeaActionSummary = {
         'actionseqno': 0,
         'actionrowid': 0,
         'eventname': self.saeaEvents.eventname
      };

      $state.go('^.actionDetail', { saeaActionSummary: self.saeaActionSummary, saeaEvents: self.saeaEvents });
   };

   self.updateAction = function () {
      var selectedRows = GridService.getSelectedRecords(self.grid);
      if (selectedRows) {
         //Only pull the 1st one out of the collection, we can only select one.
         var currentRow = selectedRows[0];
         $state.go('^.actionDetail', { saeaActionSummary: currentRow, saeaEvents: self.saeaEvents });
      }
   };

   self.deleteAction = function () {
      var selectedRows = GridService.getSelectedRecords(self.grid);
      if (selectedRows) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         // Yes processing
         function () {
            DataService.post('api/sa/assaentry/saeaactiondelete', { data: selectedRows, busy: true }, function () {
               self.searchActionSummary();
            });
         },
         function () {
            //Nothing is needed for 'No' processing.
         });
      }
   };

   self.searchActionSummary = function () {
      DataService.get('api/sa/assaentry/saeaactionsummaryload/' + self.saeaEvents.eventname, { busy: true }, function (data) {
         if (data) {
            self.saeaActionSummaryList = data;
         }
      });
   };

   if (self.saeaEvents) {
      var params = { eventname: self.saeaEvents.eventname };
      DataService.get('api/shared/eventsetup/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.eventSetup = data;
         }
      });

      params = { triggername: self.saeaEvents.triggername };
      DataService.get('api/shared/triggersetup/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.triggerSetup = data;
         }
      });

      //Build out results of the ActionSummary Grid.
      self.searchActionSummary();
   }

   self.qualifyEditableField = function (fieldName) {
      if (fieldName === 'expiredt' || fieldName === 'lActive') {
         return true;
      } else {
         return false;
      }
   };

   self.onGridCellChange = function (e, args) {
      if (args && args.value !== args.oldValue && self.qualifyEditableField(args.column.field)) {
         var saeaActionSummaryListRow = self.saeaActionSummaryList[args.row];
         var saeaActionSummaryListRowCollection = [];
         saeaActionSummaryListRowCollection.push(saeaActionSummaryListRow);
         if (saeaActionSummaryListRow) {
            var saeaactionsummaryupdateRequest = {
               saeaactionsummary: saeaActionSummaryListRowCollection,
               cActivateFl: saeaActionSummaryListRow.lActive ? base.ACTIVEFLAG_YES : base.ACTIVEFLAG_NO
            };
            DataService.post('api/sa/assaentry/saeaactionsummaryupdate', { data: saeaactionsummaryupdateRequest, busy: false });
         }
      }
   };
});

//This is shown when the user drills down from the Detail Page from Action tab to do maintenance.
//Alias: actdtl
app.controller('SaeaActionDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, UserService, Utils) {
   var self = this;
   var base = $scope.base;

   self.saeaEvents = $stateParams.saeaEvents;
   self.saeaActionSummary = $stateParams.saeaActionSummary;
   self.saeaAction = [];
   self.saeaListCust = [];
   self.saeaListPcat = [];
   self.saeaListProd = [];
   self.saeaListReg = [];
   self.saeaListVend = [];
   self.saeaListWhse = [];
   self.saeaFldsAmt = {};
   self.saeaWho = {};
   self.amountFieldsList = [];
   self.priceFieldsList = [];
   self.characterFieldsList = [];
   self.dateFieldsList = [];
   self.actionWhoList = [];
   self.isCustomerCollapsed = false;
   self.isProdCatCollapsed = false;
   self.isProductCollapsed = false;
   self.isRegionCollapsed = false;
   self.isVendorCollapsed = false;
   self.isWarehouseCollapsed = false;
   self.additionalEffectiveDate = [];
   self.isGeneralContactVisible = false;
   self.isGeneralEmailVisible = false;
   self.isGeneralGroupVisible = false;
   self.isGeneralOperatorVisible = false;
   self.isGeneralPositionVisible = false;
   self.isGeneralEmailSectionVisible = false;
   self.isGeneralProgramSectionVisible = false;

   self.isActionDetail = function () {
      return $state.is('saea.actionDetail');
   };

   self.includesActionDetail = function () {
      return $state.includes('saea.actionDetail');
   };

   self.isAddToCustomer = function () {
      return $state.is('saea.actionDetail.addToCustomers');
   };

   self.includesAddToCustomer = function () {
      return $state.includes('saea.actionDetail.addToCustomers');
   };

   self.isAddToProduct = function () {
      return $state.is('saea.actionDetail.addToProducts');
   };

   self.includesAddToProduct = function () {
      return $state.includes('saea.actionDetail.addToProducts');
   };

   self.isAddToProdCat = function () {
      return $state.is('saea.actionDetail.addToProdCats');
   };

   self.includesAddToProdCat = function () {
      return $state.includes('saea.actionDetail.addToProdCats');
   };

   self.isAddToRegion = function () {
      return $state.is('saea.actionDetail.addToRegions');
   };

   self.includesAddToRegion = function () {
      return $state.includes('saea.actionDetail.addToRegions');
   };

   self.isAddToVendor = function () {
      return $state.is('saea.actionDetail.addToVendors');
   };

   self.includesAddToVendor = function () {
      return $state.includes('saea.actionDetail.addToVendors');
   };

   self.isAddToWhse = function () {
      return $state.is('saea.actionDetail.addToWarehouses');
   };

   self.includesAddToWhse = function () {
      return $state.includes('saea.actionDetail.addToWarehouses');
   };

   self.buildSaeaAction = function () {
      var newSaeaaction =
      {
         'cono': UserService.getCono(),
         'actionseqno': self.saeaActionSummary.actionseqno,
         'actionrowid': self.saeaActionSummary.actionrowid,
         'eventname': self.saeaActionSummary.eventname
      };

      return newSaeaaction;
   };

   if (self.saeaActionSummary) {
      self.saeaAction = self.buildSaeaAction();

      DataService.post('api/sa/assaentry/saeaactionsetup', { data: self.saeaAction, busy: true }, function (data) {
         if (data) {
            self.saeaAction = data.saeaaction;
            self.saeaListCust = data.saealistcust;
            self.saeaListPcat = data.saealistpcat;
            self.saeaListProd = data.saealistprod;
            self.saeaListReg = data.saealistreg;
            self.saeaListVend = data.saealistvend;
            self.saeaListWhse = data.saealistwhse;
            self.saeaFldsAmt = data.saeafldsamt;
            self.saeaFldsPrc = data.saeafldsprc;
            self.saeaFldsChar = data.saeafldschar;
            self.saeaFldsDate = data.saeafldsdate;
            self.saeaWho = data.saeawho;

            self.buildAmountFieldsDropdown();
            self.buildPriceFieldsDropdown();
            self.buildCharacterFieldsDropdown();
            self.buildDateFieldsDropdown();

            self.buildActionWhoDropdown();

            self.setAdditionalEffectiveDate();

            //If we're in Edit mode, collapse any sections that are not set to All as
            //this saves on real estate.  If in Add mode, expand all for convenience.
            if (self.saeaAction.actionseqno > 0) {
               self.setIsCustomerCollapsed();
               self.setIsProdCatCollapsed();
               self.setIsProductCollapsed();
               self.setIsRegionCollapsed();
               self.setIsVendorCollapsed();
               self.setIsWarehouseCollapsed();
            }

            self.setGeneralWhoSubjectVisibility();
         }
      });
   }

   //Fields related to the Action Additional info Tab.
   self.buildAmountFieldsDropdown = function () {
      if (self.saeaFldsAmt) {
         self.saeaFldsAmt.forEach(function (item) {
            if (item.fieldname) {
               var option = {
                  label: item.fieldname,
                  value: item.slctamountary
               };

               self.amountFieldsList.push(option);
            }
         });
      }
   };

   self.buildPriceFieldsDropdown = function () {
      if (self.saeaFldsPrc) {
         self.saeaFldsPrc.forEach(function (item) {
            if (item.fieldname) {
               var option = {
                  label: item.fieldname,
                  value: item.slctpriceary
               };

               self.priceFieldsList.push(option);
            }
         });
      }
   };

   self.buildCharacterFieldsDropdown = function () {
      if (self.saeaFldsChar) {
         self.saeaFldsChar.forEach(function (item) {
            if (item.fieldname) {
               var option = {
                  label: item.fieldname,
                  value: item.slctcharary
               };

               self.characterFieldsList.push(option);
            }
         });
      }
   };

   self.buildDateFieldsDropdown = function () {
      if (self.saeaFldsDate) {
         self.saeaFldsDate.forEach(function (item) {
            if (item.fieldname) {
               var option = {
                  label: item.fieldname,
                  value: item.slctdateary
               };

               self.dateFieldsList.push(option);
            }
         });
      }
   };

   self.buildActionWhoDropdown = function () {
      if (self.saeaWho) {
         self.saeaWho.forEach(function (item) {
            if (item.descr) {
               var option = {
                  label: item.descr,
                  value: item.type
               };

               self.actionWhoList.push(option);
            }
         });
      }
   };

   self.setAdditionalEffectiveDate = function () {
      if (self.saeaAction) {
         if (self.saeaAction.slctdateary > 0) {
            self.additionalEffectiveDate = Utils.addSubtractDaysToDate(Utils.getCurrentDate(), self.saeaAction.slctdateval);
         } else {
            self.additionalEffectiveDate = MessageService.get('global.after.before.system.date');
         }
      }
   };

   self.isActionRangeTabVisible = function () {
      return self.saeaAction && (
         self.saeaAction.whseenabled || self.saeaAction.custenabled ||
            self.saeaAction.regenabled || self.saeaAction.vendenabled ||
            self.saeaAction.prodenabled || self.saeaAction.prodenabled);
   };

   self.isActionAdditionalTabVisible = function () {
      return self.saeaAction && (
         self.saeaAction.amtenabled || self.saeaAction.prcenabled ||
            self.saeaAction.charenabled || self.saeaAction.dateenabled);
   };

   //Because of potentially hiding tabs, we need to have these Selected functions
   //called to Select the first visible tab, so it gets initialized and data shows.
   self.isActionRangeTabSelected = function() {
      return self.isActionRangeTabVisible();
   };

   self.isActionAdditionalTabSelected = function () {
      if (self.isActionRangeTabVisible()) {
         return false;
      } else {
         return self.isActionAdditionalTabVisible();
      }
   };

   //The General tab is always visible.  If neither of the others were visible, assume
   //this one should be initialized.
   self.isActionGeneralTabSelected = function () {
      if (!self.isActionRangeTabVisible() && !self.isActionAdditionalTabVisible()) {
         return true;
      } else {
         return false;
      }
   };

   //Fields related to the Action Ranges Tab
   self.setIsCustomerCollapsed = function () {
      if (self.saeaAction.custnorangety && (self.saeaAction.custnorangety.toLowerCase() === base.RANGETYPE_ALL || self.saeaAction.custnorangety === '')) {
         self.isCustomerCollapsed = true;
      } else {
         self.isCustomerCollapsed = false;
      }
   };

   self.isSubjectListVisible = function (value) {
      if (value) {
         switch (value.toLowerCase()) {
         case base.RANGETYPE_ALL:
            return false;
         case base.RANGETYPE_RANGE:
            return false;
         case base.RANGETYPE_LIST:
            return true;
         default:
            return false;
         }
      } else {
         return false;
      }
   };

   self.isSubjectRangeVisible = function (value) {
      if (value) {
         switch (value.toLowerCase()) {
         case base.RANGETYPE_ALL:
            return false;
         case base.RANGETYPE_RANGE:
            return true;
         case base.RANGETYPE_LIST:
            return false;
         default:
            return false;
         }
      } else {
         return false;
      }
   };

   self.isCustomerListVisible = function () {
      return self.isSubjectListVisible(self.saeaAction.custnorangety);
   };

   self.isCustomerRangeVisible = function () {
      return self.isSubjectRangeVisible(self.saeaAction.custnorangety);
   };

   self.setIsProductCollapsed = function () {
      if (self.saeaAction.prodrangety && (self.saeaAction.prodrangety.toLowerCase() === base.RANGETYPE_ALL || self.saeaAction.prodrangety === '')) {
         self.isProductCollapsed = true;
      } else {
         self.isProductCollapsed = false;
      }
   };

   self.isProductListVisible = function () {
      return self.isSubjectListVisible(self.saeaAction.prodrangety);
   };

   self.isProductRangeVisible = function () {
      return self.isSubjectRangeVisible(self.saeaAction.prodrangety);
   };

   self.setIsProdCatCollapsed = function () {
      if (self.saeaAction.prodcatrangety && (self.saeaAction.prodcatrangety.toLowerCase() === base.RANGETYPE_ALL || self.saeaAction.prodcatrangety === '')) {
         self.isProdCatCollapsed = true;
      } else {
         self.isProdCatCollapsed = false;
      }
   };

   self.isProdCatListVisible = function () {
      return self.isSubjectListVisible(self.saeaAction.prodcatrangety);
   };

   self.isProdCatRangeVisible = function () {
      return self.isSubjectRangeVisible(self.saeaAction.prodcatrangety);
   };

   self.setIsRegionCollapsed = function () {
      if (self.saeaAction.regionrangety && (self.saeaAction.regionrangety.toLowerCase() === base.RANGETYPE_ALL || self.saeaAction.regionrangety === '')) {
         self.isRegionCollapsed = true;
      } else {
         self.isRegionCollapsed = false;
      }
   };

   self.isRegionListVisible = function () {
      return self.isSubjectListVisible(self.saeaAction.regionrangety);
   };

   self.isRegionRangeVisible = function () {
      return self.isSubjectRangeVisible(self.saeaAction.regionrangety);
   };

   self.setIsVendorCollapsed = function () {
      if (self.saeaAction.vendnorangety && (self.saeaAction.vendnorangety.toLowerCase() === base.RANGETYPE_ALL || self.saeaAction.vendnorangety === '')) {
         self.isVendorCollapsed = true;
      } else {
         self.isVendorCollapsed = false;
      }
   };

   self.isVendorListVisible = function () {
      return self.isSubjectListVisible(self.saeaAction.vendnorangety);
   };

   self.isVendorRangeVisible = function () {
      return self.isSubjectRangeVisible(self.saeaAction.vendnorangety);
   };

   self.setIsWarehouseCollapsed = function () {
      if (self.saeaAction.whserangety && (self.saeaAction.whserangety && (self.saeaAction.whserangety.toLowerCase() === base.RANGETYPE_ALL || self.saeaAction.whserangety === ''))) {
         self.isWarehouseCollapsed = true;
      } else {
         self.isWarehouseCollapsed = false;
      }
   };

   self.isWarehouseListVisible = function () {
      return self.isSubjectListVisible(self.saeaAction.whserangety);
   };

   self.isWarehouseRangeVisible = function () {
      return self.isSubjectRangeVisible(self.saeaAction.whserangety);
   };

   self.setGeneralWhoSubjectVisibility = function () {
      self.setIsGeneralContactVisible();
      self.setIsGeneralEmailVisible();
      self.setIsGeneralGroupVisible();
      self.setIsGeneralOperatorVisible();
      self.setIsGeneralPositionVisible();
   };

   //Fields related to the Action General Information Tab
   self.setIsGeneralContactVisible = function () {
      if (self.saeaAction && self.saeaAction.actionsubjectty) {
         self.isGeneralContactVisible = self.saeaAction.actionsubjectty.toLowerCase() === base.ACTIONSUBJECTTYPE_CONTACT ? true : false;
      } else {
         self.isGeneralContactVisible = false;
      }
   };

   self.setIsGeneralEmailVisible = function () {
      if (self.saeaAction && self.saeaAction.actionsubjectty) {
         self.isGeneralEmailVisible = self.saeaAction.actionsubjectty.toLowerCase() === base.ACTIONSUBJECTTYPE_EMAIL ? true : false;
      } else {
         self.isGeneralEmailVisible = false;
      }
   };

   self.setIsGeneralGroupVisible = function () {
      if (self.saeaAction && self.saeaAction.actionsubjectty) {
         self.isGeneralGroupVisible = self.saeaAction.actionsubjectty.toLowerCase() === base.ACTIONSUBJECTTYPE_GROUP ? true : false;
      } else {
         self.isGeneralGroupVisible = false;
      }
   };

   self.setIsGeneralOperatorVisible = function () {
      if (self.saeaAction && self.saeaAction.actionsubjectty) {
         self.isGeneralOperatorVisible = self.saeaAction.actionsubjectty.toLowerCase() === base.ACTIONSUBJECTTYPE_OPERATOR ? true : false;
      } else {
         self.isGeneralOperatorVisible = false;
      }
   };

   self.setIsGeneralPositionVisible = function () {
      if (self.saeaAction && self.saeaAction.actionsubjectty) {
         self.isGeneralPositionVisible = self.saeaAction.actionsubjectty.toLowerCase() === base.ACTIONSUBJECTTYPE_POSITION ? true : false;
      } else {
         self.isGeneralPositionVisible = false;
      }
   };

   self.isGeneralEmailSectionVisible = function () {
      if (self.saeaAction && self.saeaAction.actiontype) {
         return self.saeaAction.actiontype.toLowerCase() === base.ACTIONTYPE_EMAIL || self.saeaAction.actiontype.toLowerCase() === base.ACTIONTYPE_ION ? true : false;
      } else {
         return false;
      }
   };

   self.isGeneralProgramSectionVisible = function () {
      if (self.saeaAction && self.saeaAction.actiontype) {
         return self.saeaAction.actiontype.toLowerCase() === base.ACTIONTYPE_PROGRAM ? true : false;
      } else {
         return false;
      }
   };

   self.back = function () {
      $state.go('^.detail', { saeaEvents: self.saeaEvents, isSaveRefreshMode: true });
   };

   self.cancelActionDetails = function () {
      self.back();
   };

   self.saveActionDetails = function () {

      //This makes sure we don't have any blank range types (those would be blank
      //if they are not visible).  Consider these of the type: All.
      if (self.saeaAction.custnorangety === '') {
         self.saeaAction.custnorangety = base.RANGETYPE_ALL;
      }
      if (self.saeaAction.prodrangety === '') {
         self.saeaAction.prodrangety = base.RANGETYPE_ALL;
      }
      if (self.saeaAction.prodcatrangety === '') {
         self.saeaAction.prodcatrangety = base.RANGETYPE_ALL;
      }
      if (self.saeaAction.regionrangety === '') {
         self.saeaAction.regionrangety = base.RANGETYPE_ALL;
      }
      if (self.saeaAction.vendnorangety === '') {
         self.saeaAction.vendnorangety = base.RANGETYPE_ALL;
      }
      if (self.saeaAction.whserangety === '') {
         self.saeaAction.whserangety = base.RANGETYPE_ALL;
      }

      var requestCriteria = {
         saealistcust: self.saeaListCust,
         saealistpcat: self.saeaListPcat,
         saealistprod: self.saeaListProd,
         saealistreg: self.saeaListReg,
         saealistvend: self.saeaListVend,
         saealistwhse: self.saeaListWhse,
         saeaaction: self.saeaAction
      };

      DataService.post('api/sa/assaentry/saeaactionupdate', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data)) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               self.back();
            }
         }
      });
   };

   self.deleteCustomerFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.custGrid);
      selectedRows.forEach(function (row) {
         var index = self.saeaListCust.indexOf(row);
         self.saeaListCust.splice(index, 1);
      });
   };

   self.addCustomerToList = function () {
      $state.go('.addToCustomers', {
         saeaActionSummary: self.saeaActionSummary,
         saeaListCust: self.saeaListCust
      });
   };

   self.deleteProductFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.prodGrid);
      selectedRows.forEach(function (row) {
         var index = self.saeaListProd.indexOf(row);
         self.saeaListProd.splice(index, 1);
      });
   };

   self.addProductToList = function () {
      $state.go('.addToProducts', {
         saeaActionSummary: self.saeaActionSummary,
         saeaListProd: self.saeaListProd
      });
   };

   self.deleteProdCatFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.prodcatGrid);
      selectedRows.forEach(function (row) {
         var index = self.saeaListPcat.indexOf(row);
         self.saeaListPcat.splice(index, 1);
      });
   };

   self.addProdCatToList = function () {
      $state.go('.addToProdCats', {
         saeaActionSummary: self.saeaActionSummary,
         saeaListPcat: self.saeaListPcat
      });
   };

   self.deleteRegionFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.regionGrid);
      selectedRows.forEach(function (row) {
         var index = self.saeaListReg.indexOf(row);
         self.saeaListReg.splice(index, 1);
      });
   };

   self.addRegionToList = function () {
      $state.go('.addToRegions', {
         saeaActionSummary: self.saeaActionSummary,
         saeaListReg: self.saeaListReg
      });
   };

   self.deleteVendorFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.vendGrid);
      selectedRows.forEach(function (row) {
         var index = self.saeaListVend.indexOf(row);
         self.saeaListVend.splice(index, 1);
      });
   };

   self.addVendorToList = function () {
      $state.go('.addToVendors', {
         saeaActionSummary: self.saeaActionSummary,
         saeaListVend: self.saeaListVend
      });
   };

   self.deleteWarehouseFromList = function () {
      var selectedRows = GridService.getSelectedRecords(self.whseGrid);
      selectedRows.forEach(function (row) {
         var index = self.saeaListWhse.indexOf(row);
         self.saeaListWhse.splice(index, 1);
      });
   };

   self.addWarehouseToList = function () {
      $state.go('.addToWarehouses', {
         saeaActionSummary: self.saeaActionSummary,
         saeaListWhse: self.saeaListWhse
      });
   };

   //Callbacks
   self.acceptUpdatedCustomerListCallback = function (saeaActionSummary, saeaListCust) {
      self.saeaListCust = saeaListCust;
      self.saeaActionSummary = saeaActionSummary;
   };

   self.acceptUpdatedProductListCallback = function (saeaActionSummary, saeaListProd) {
      self.saeaListProd = saeaListProd;
      self.saeaActionSummary = saeaActionSummary;
   };

   self.acceptUpdatedProdCatListCallback = function (saeaActionSummary, saeaListPcat) {
      self.saeaListPcat = saeaListPcat;
      self.saeaActionSummary = saeaActionSummary;
   };

   self.acceptUpdatedRegionListCallback = function (saeaActionSummary, saeaListReg) {
      self.saeaListReg = saeaListReg;
      self.saeaActionSummary = saeaActionSummary;
   };

   self.acceptUpdatedVendorListCallback = function (saeaActionSummary, saeaListVend) {
      self.saeaListVend = saeaListVend;
      self.saeaActionSummary = saeaActionSummary;
   };

   self.acceptUpdatedWarehouseListCallback = function (saeaActionSummary, saeaListWhse) {
      self.saeaListWhse = saeaListWhse;
      self.saeaActionSummary = saeaActionSummary;
   };
});

//This controller is used when the user clicks "Add Customer To List" from the Detail Page from Action tab to do maintenance.
//Alias: actdtladdcust
app.controller('SaeaActionDetailAddToCustCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var actdtl = $scope.actdtl;
   self.saeaActionSummary = $stateParams.saeaActionSummary;
   self.saeaListCust = $stateParams.saeaListCust;
   self.customerToAdd = [];
   self.shiptoToAdd = [];

   self.back = function () {
      $state.go('^', { saeaActionSummary: self.saeaActionSummary });
   };

   self.cancel = function () {
      self.back();
   };

   self.ok = function () {
      //The save will have issues if we try to send in a Null as the shipto.  This protects for that.
      if (!self.shiptoToAdd || self.shiptoToAdd.length === 0) {
         self.shiptoToAdd = '';
      }

      if (self.saeaListCust) {
         var results = self.saeaListCust.filter(function (row) {
            return row.listvalue === self.customerToAdd && row.listvalue2 === self.shiptoToAdd;
         });

         if (results && results.length > 0) {
            MessageService.error('global.error', 'message.duplicate.customer.shipto.not.allowed');
         } else {
            var requestCriteria = {
               cListType: base.LIST_TYPE_CUSTOMER,
               cListValue: self.customerToAdd,
               cListValue2: self.shiptoToAdd
            };

            DataService.post('api/sa/saea/getnamedescbykeys', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.saeaListCust.push({ listtype: base.LIST_TYPE_CUSTOMER, listvalue: self.customerToAdd, listvalue2: self.shiptoToAdd, namedesc: data });
                     actdtl.acceptUpdatedCustomerListCallback(self.saeaActionSummary, self.saeaListCust);
                     $state.go('^');
                  }
               }
            });
         }
      }
   };
});

//This controller is used when the user clicks "Add Product To List" from the Detail Page from Action tab to do maintenance.
//Alias: actdtladdprod
app.controller('SaeaActionDetailAddToProdCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var actdtl = $scope.actdtl;
   self.saeaActionSummary = $stateParams.saeaActionSummary;
   self.saeaListProd = $stateParams.saeaListProd;
   self.productToAdd = [];

   self.back = function () {
      $state.go('^', { saeaActionSummary: self.saeaActionSummary });
   };

   self.cancel = function () {
      self.back();
   };

   self.ok = function () {
      if (self.saeaListProd) {
         var results = self.saeaListProd.filter(function (row) {
            return row.listvalue === self.productToAdd;
         });

         if (results && results.length > 0) {
            MessageService.error('global.error', 'message.duplicate.product.not.allowed');
         } else {
            var requestCriteria = {
               cListType: base.LIST_TYPE_PRODUCT,
               cListValue: self.productToAdd,
               cListValue2: ''
            };

            DataService.post('api/sa/saea/getnamedescbykeys', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.saeaListProd.push({ listtype: base.LIST_TYPE_PRODUCT, listvalue: self.productToAdd, listvalue2: '', namedesc: data });
                     actdtl.acceptUpdatedProductListCallback(self.saeaActionSummary, self.saeaListProd);
                     $state.go('^');
                  }
               }
            });
         }
      }
   };
});

//This controller is used when the user clicks "Add ProdCat To List" from the Detail Page from Action tab to do maintenance.
//Alias: actdtladdpcat
app.controller('SaeaActionDetailAddToProdCatCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var actdtl = $scope.actdtl;
   self.saeaActionSummary = $stateParams.saeaActionSummary;
   self.saeaListPcat = $stateParams.saeaListPcat;
   self.prodcatToAdd = [];

   self.back = function () {
      $state.go('^', { saeaActionSummary: self.saeaActionSummary });
   };

   self.cancel = function () {
      self.back();
   };

   self.ok = function () {
      if (self.saeaListPcat) {
         var results = self.saeaListPcat.filter(function (row) {
            return row.listvalue === self.prodcatToAdd;
         });

         if (results && results.length > 0) {
            MessageService.error('global.error', 'message.duplicate.product.category.not.allowed');
         } else {
            var requestCriteria = {
               cListType: base.LIST_TYPE_PRODCAT,
               cListValue: self.prodcatToAdd,
               cListValue2: ''
            };

            DataService.post('api/sa/saea/getnamedescbykeys', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.saeaListPcat.push({ listtype: base.LIST_TYPE_PRODCAT, listvalue: self.prodcatToAdd, listvalue2: '', namedesc: data });
                     actdtl.acceptUpdatedProdCatListCallback(self.saeaActionSummary, self.saeaListPcat);
                     $state.go('^');
                  }
               }
            });
         }
      }
   };
});

//This controller is used when the user clicks "Add Region To List" from the Detail Page from Action tab to do maintenance.
//Alias: actdtladdreg
app.controller('SaeaActionDetailAddToRegionCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var actdtl = $scope.actdtl;
   self.saeaActionSummary = $stateParams.saeaActionSummary;
   self.saeaListReg = $stateParams.saeaListReg;
   self.regionToAdd = [];

   self.back = function () {
      $state.go('^', { saeaActionSummary: self.saeaActionSummary });
   };

   self.cancel = function () {
      self.back();
   };

   self.ok = function () {
      if (self.saeaListReg) {
         var results = self.saeaListReg.filter(function (row) {
            return row.listvalue === self.regionToAdd;
         });

         if (results && results.length > 0) {
            MessageService.error('global.error', 'message.duplicate.region.not.allowed');
         } else {
            var requestCriteria = {
               cListType: base.LIST_TYPE_REGION,
               cListValue: self.regionToAdd,
               cListValue2: ''
            };

            DataService.post('api/sa/saea/getnamedescbykeys', { data: requestCriteria, busy: true }, function (data) {
               //NOTE: For Region, there is no NameDesc value coming the backend call.  All we are doing is making sure it's not a duplicate.
               if (!MessageService.processMessaging(data.messaging)) {
                  self.saeaListReg.push({ listtype: base.LIST_TYPE_REGION, listvalue: self.regionToAdd, listvalue2: '', namedesc: '' });
                  actdtl.acceptUpdatedRegionListCallback(self.saeaActionSummary, self.saeaListReg);
                  $state.go('^');
               }
            });
         }
      }
   };
});

//This controller is used when the user clicks "Add Vendor To List" from the Detail Page from Action tab to do maintenance.
//Alias: actdtladdvend
app.controller('SaeaActionDetailAddToVendorCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var actdtl = $scope.actdtl;
   self.saeaActionSummary = $stateParams.saeaActionSummary;
   self.saeaListVend = $stateParams.saeaListVend;
   self.vendorToAdd = [];

   self.back = function () {
      $state.go('^', { saeaActionSummary: self.saeaActionSummary });
   };

   self.cancel = function () {
      self.back();
   };

   self.ok = function () {
      if (self.saeaListVend) {
         var results = self.saeaListVend.filter(function (row) {
            return row.listvalue === self.vendorToAdd;
         });

         if (results && results.length > 0) {
            MessageService.error('global.error', 'message.duplicate.vendor.not.allowed');
         } else {
            var requestCriteria = {
               cListType: base.LIST_TYPE_VENDOR,
               cListValue: self.vendorToAdd,
               cListValue2: ''
            };

            DataService.post('api/sa/saea/getnamedescbykeys', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.saeaListVend.push({ listtype: base.LIST_TYPE_VENDOR, listvalue: self.vendorToAdd, listvalue2: '', namedesc: data });
                     actdtl.acceptUpdatedVendorListCallback(self.saeaActionSummary, self.saeaListVend);
                     $state.go('^');
                  }
               }
            });
         }
      }
   };
});

//This controller is used when the user clicks "Add Whse To List" from the Detail Page from Action tab to do maintenance.
//Alias: actdtladdwhse
app.controller('SaeaActionDetailAddToWhseCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var actdtl = $scope.actdtl;
   self.saeaActionSummary = $stateParams.saeaActionSummary;
   self.saeaListWhse = $stateParams.saeaListWhse;
   self.warehouseToAdd = [];

   self.back = function () {
      $state.go('^', { saeaActionSummary: self.saeaActionSummary });
   };

   self.cancel = function () {
      self.back();
   };

   self.ok = function () {
      if (self.saeaListWhse) {
         var results = self.saeaListWhse.filter(function (row) {
            return row.listvalue === self.warehouseToAdd;
         });

         if (results && results.length > 0) {
            MessageService.error('global.error', 'message.duplicate.warehouse.not.allowed');
         } else {
            var requestCriteria = {
               cListType: base.LIST_TYPE_WAREHOUSE,
               cListValue: self.warehouseToAdd,
               cListValue2: ''
            };

            DataService.post('api/sa/saea/getnamedescbykeys', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  if (!MessageService.processMessaging(data.messaging)) {
                     self.saeaListWhse.push({ listtype: base.LIST_TYPE_WAREHOUSE, listvalue: self.warehouseToAdd, listvalue2: '', namedesc: data });
                     actdtl.acceptUpdatedWarehouseListCallback(self.saeaActionSummary, self.saeaListWhse);
                     $state.go('^');
                  }
               }
            });
         }
      }
   };
});
