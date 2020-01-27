'use strict';

app.config(function ($stateProvider, StateProvider, AdjustersInformationStateProvider, LeadTimeHistoryStateProvider, ProductWarehouseUsageStateProvider, TrendInformationStateProvider) {
   StateProvider.addTransactionBaseState('ic', 'icamr', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icamr');

   $stateProvider.state('icamr.detail', {
      url: '/detail',
      params: { icamapdetail: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icamr/detail.json');
            },
            controller: 'IcamrDetailCtrl as dtl'
         }
      }
   });
   ProductWarehouseUsageStateProvider.addStates('ic', 'icamr', 'icamr.detail');
   TrendInformationStateProvider.addStates('ic', 'icamr', 'icamr.detail');
   AdjustersInformationStateProvider.addStates('ic', 'icamr', 'icamr.detail');
   LeadTimeHistoryStateProvider.addStates('ic', 'icamr', 'icamr.detail');
});

app.controller('IcamrBaseCtrl', function ($state, ConfigService, DataService, Sasoo, Sasc, SecurityService) {
   var self = this;

   self.sasc = Sasc;
   self.sasoo = Sasoo;
   self.criteria = {};
   self.reportno = 0;

   self.RECALC = 'recalc';
   self.INIT = 'init';

   self.MENU_FUNCTION_ICAMR = 'icamr';
   //These are dependent on the SASSM (Menu Item) 'Label' field definitions for ICAMR.
   self.SUBMENU_ICAMR_METHODS = 'Methods';
   self.SUBMENU_ICAMR_USAGE_HISTORY = 'Usage History';
   self.SUBMENU_ICAMR_REQUIRED = 'Required';
   self.SUBMENU_ICAMR_ORDERING = 'Ordering';
   self.SUBMENU_ICAMR_TREND = 'Trend';
   self.SUBMENU_ICAMR_ADJUSTER = 'Adjuster Inquiry';

   self.securityTopLevel = 0;
   self.securitySubLevelMethods = 0;
   self.securitySubLevelUsageHistory = 0;
   self.securitySubLevelTrend = 0;
   self.securitySubLevelAdjuster = 0;
   self.securitySubLevelRequired = 0;
   self.securitySubLevelOrdering = 0;
   self.isUsageHistoryAllowed = false;
   self.isTrendAllowed = false;
   self.isAdjustersAllowed = false;
   self.isRequiredAllowed = false;
   self.isOrderingAllowed = false;

   self.isMaster = function () {
      return $state.is('icamr.master');
   };

   self.includesMaster = function () {
      return $state.includes('icamr.master');
   };

   self.isDetail = function () {
      return $state.is('icamr.detail');
   };

   self.includesDetail = function () {
      return $state.includes('icamr.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Used in shared/usage-analysis/usage-analysis.js
   self.usageAnalysis = {
      prod: '',
      whse: '',
      reportno: 0,
      secure: self.securitySubLevelMethods
   };

   self.getSecurity = function () {
      self.securityTopLevel = SecurityService.getSecurityLevel(self.MENU_FUNCTION_ICAMR);
      self.securitySubLevelMethods = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMR, self.SUBMENU_ICAMR_METHODS);
      self.securitySubLevelUsageHistory = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMR, self.SUBMENU_ICAMR_USAGE_HISTORY);
      self.securitySubLevelTrend = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMR, self.SUBMENU_ICAMR_TREND);
      self.securitySubLevelRequired = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMR, self.SUBMENU_ICAMR_REQUIRED);
      self.securitySubLevelOrdering = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMR, self.SUBMENU_ICAMR_ORDERING);
      self.securitySubLevelAdjusters = SecurityService.getSubSecurityLevel(self.MENU_FUNCTION_ICAMR, self.SUBMENU_ICAMR_ADJUSTER);

      self.isUsageHistoryAllowed = (self.securitySubLevelUsageHistory >= 3) ? true : false;
      self.isTrendAllowed = (self.securitySubLevelTrend >= 3) ? true : false;
      self.isAdjustersAllowed = (self.securitySubLevelAdjusters >= 3) ? true : false;
      self.isRequiredAllowed = (self.securitySubLevelRequired >= 3) ? true : false;
      self.isOrderingAllowed = (self.securitySubLevelOrdering >= 3) ? true : false;
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.reportno = 0;
      DataService.get('api/ic/asicadmin/icamrgetresults/' + self.criteria.reportno, {
         busy: true
      }, function (data) {
         self.dataset = data;
         self.reportno = self.criteria.reportno;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();

   self.getSecurity();

});

app.controller('IcamrSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('icamr.master');
      }
      base.search();
   };
});

app.controller('IcamrMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService, UserService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;

      // For Methods (Usage Analysis) Tab
      base.usageAnalysis.prod = record.prod;
      base.usageAnalysis.whse = record.whse;
      base.usageAnalysis.reportno = record.reportno;

      $state.go('^.detail', { icamapdetail: record });
   };

   self.finalUpdate = function () {

      var msg = MessageService.get('question.update.ordering.controls.also');
      MessageService.yesNoCancel('', msg, self.submitAfterPromptYes, self.submitAfterPromptNo, self.submitAfterPromptCancel);
   };

   self.submitAfterPromptYes = function () {
      self.submitSave(true);
   };

   self.submitAfterPromptNo = function () {
      self.submitSave(false);
   };

   self.submitAfterPromptCancel = function () {
      MessageService.info('global.information', 'global.update.aborted');
   };

   self.submitSave = function (updateOrderingControls) {

      var criteria = {
         reportno: base.reportno,
         updatecontrolsfl: updateOrderingControls
      };
      DataService.post('api/ic/asicadmin/icamrupdateusagerateanalysis', {
         data: criteria,
         busy: true
      }, function () {
         base.criteria.reportno = '';
         base.dataset = [];
      });
   };

   self.selectMethod = function () {
      ModalService.showModal('ic/icamr/select-method.json', 'IcamrSelectMethodCtrl as smctrl', $scope, function (modal) {
         self.selectMethodNew = modal;
      });
   };

   self.selectMethodUpdate = function (newmethod, isupdateall) {
      var records = GridService.getSelectedRecords(base.grid);

      // Proceed if any rows are selected
      if (records && records.length) {

         var pos = newmethod.indexOf("|");
         var selectMethodList = [];
         var selectMethodCriteria = {
            cono: UserService.getCono(),
            reportno: base.reportno,
            usagectrl: newmethod.slice(pos + 1),
            usagemonths: newmethod.slice(0, pos),
            updateallfl: isupdateall
         };

         records.forEach(function (record) {
            selectMethodList.push({
               reportno: record.reportno,
               prod: record.prod,
               whse: record.whse,
               icamapRowID: record.icamaprowid
            });
         });

         DataService.post('api/ic/asicadmin/icamrupdateselectmethod', {
            data: {
               icamrupdselectmethod: selectMethodList,
               icamrupdselectmethodcriteria: selectMethodCriteria
            },
            busy: true
         }, function () {
            base.search();
         });
      }
   };

   self.delete = function () {
      var records = GridService.getSelectedRecords(base.grid);

      // Proceed if any rows are selected
      if (records && records.length) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            var selectMethodList = [];
            var selectMethodCriteria = {
               cono: UserService.getCono(),
               reportno: base.reportno,
               usagectrl: '',
               usagemonths: '',
               updateallfl: false
            };

            records.forEach(function (record) {
               selectMethodList.push({
                  reportno: record.reportno,
                  prod: record.prod,
                  whse: record.whse,
                  icamapRowID: record.icamaprowid
               });
            });

            DataService.post('api/ic/asicadmin/icamrdeleterecords', {
               data: {
                  icamrupdselectmethod: selectMethodList,
                  icamrupdselectmethodcriteria: selectMethodCriteria
               },
               busy: true
            }, function () {
               base.dataset = [];
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.search();
            });
         });
      }
   };

});

app.controller('IcamrDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService, $translate) {
   var self = this;
   var base = $scope.base;
   var subTitle = '';

   self.showOAN = false;
   self.showRank = true;
   self.showAdjusters = true;

   self.icamapdetail = $stateParams.icamapdetail;
   var params = {
      prod: self.icamapdetail.prod,
      whse: self.icamapdetail.whse
   };
   DataService.get('api/ic/icsw/getbypk', { params: params }, function (data) {
      if (data) {
         self.icsw = data;
         self.icamapdetail.statustype = data.statustype;
         self.criticalpoint = self.icsw.usagerate * self.icsw.leadtmavg / 28;

         var safetyInit = {
            calctype: base.INIT,
            origsafeallamt: self.icsw.safeallamt,
            origsafeallpct: self.icsw.safeallpct,
            origsafealldays: self.icsw.safealldays,
            latestleadtmavg: self.icsw.leadtmavg,
            latestusagerate: self.icsw.usagerate,
            safeallowty: self.icsw.safeallty,
            safeallamt: 0,
            safeallamt2: 0
         };
         DataService.post('api/ic/asicadmin/icswdisplaysafetyallowance', { data: safetyInit, busy: true }, function (data) {
            if (data) {
               self.icsw.safeallamt1 = data.safeallamt;
               self.icsw.safeallamt2 = Math.round(data.safeallamt2);
            }
         });

         if (data.statustype.toLowerCase() === 'o') {
            self.icamapdetail.statustype += data.nonstockty;
         }
         var criteria = {
            product: self.icsw.prod,
            unitbuy: self.icsw.unitbuy,
            unitstnd: self.icsw.unitstnd,
            unitwt: self.icsw.unitwt
         };
         DataService.post('api/ic/asicsetup/icswordunit', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.dataUnits = data;
            }
            self.setStatusEnablement();
         });
         DataService.get('api/ic/icsr/geticsrzerovendorblankwhseline', { busy: false }, function (data) {
            if (data) {
               self.icUsage = data.icusage;
               self.rankTy = data.rankty;

               if ((self.icsw.arptype.includes('c') || self.icsw.arptype.includes('w')) &&
                  self.icsw.statustype.toUpperCase() === 'O' && self.icUsage.toUpperCase() === 'A')
               {
                  self.showOAN = true;
               } else {
                  self.showOAN = false;
               }
               if (self.rankTy.toUpperCase() !== 'Y') {
                  self.showRank = false;
               }

            } else {
               self.showAdjusters = false;
               self.showRank = false;
            }
         });
         self.setStatusEnablement = function () {

            if (base.sasoo.superfl) {
               self.allowStatusChange = true;
            } else if (self.icsw.qtyreservd ||
                  self.icsw.qtyintrans ||
                  self.icsw.qtyonorder ||
                  self.icsw.qtyrcvd ||
                  self.icsw.qtyreqshp ||
                  self.icsw.qtyreqrcv ||
                  self.icsw.qtydemand ||
                  self.icsw.qtybo ||
                  self.icsw.custqtyonorder ||
                  self.icsw.custqtyrcvd) {
               self.allowStatusChange = false;

            } else {
               self.allowStatusChange = true;
            }

            if (!base.sasoo.icswstchgfl && self.icsw.statustype.toUpperCase() === 'O' && self.icsw.nonstockty.toUpperCase() === 'N') {
               self.statusTypeEnablement = false;
            } else {
               self.statusTypeEnablement = self.allowStatusChange;
            }
         };
      }
   });

   // Build subtitle
   subTitle = $translate.instant('global.report') + Constants.LABEL_DELIMITER + ' ' + self.icamapdetail.reportno + Constants.SUB_TITLE_SEPARATOR;
   subTitle += $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + ' ' + self.icamapdetail.whse + Constants.SUB_TITLE_SEPARATOR;
   subTitle += $translate.instant('global.product') + Constants.LABEL_DELIMITER + ' ' + self.icamapdetail.prod;

   self.getSubTitle = function () {
      return subTitle;
   };

   self.usageHistoryClicked = function () {
      $state.go('icamr.detail.productWarehouseUsage', { enabled: true, prod: self.icamapdetail.prod, whse: self.icamapdetail.whse, unit: '', recalcEnabled: false, returnState: $state.current.name });
   };
   self.trendClicked = function () {
      $state.go('icamr.detail.trendInformation', { prod: self.icamapdetail.prod, whse: self.icamapdetail.whse, returnState: $state.current.name });
   };
   self.adjusterInquiryClicked = function () {
      $state.go('icamr.detail.adjustersInformation', { prod: self.icamapdetail.prod, whse: self.icamapdetail.whse });
   };

   self.goToLeadTime = function () {
      $state.go('icamr.detail.leadTimeHistory', { enabled: self.isOrderingAllowed, prod: self.icamapdetail.prod, whse: self.icamapdetail.whse, frozenty: self.icsw.frozenltty, leadtimeavg: self.icsw.leadtmavg, leadtimedt: self.icsw.avgltdt, callback: self.leadTimeFinished, returnState: $state.current.name });
   };

   self.leadTimeFinished = function (leadtimeavg, leadtimedt, leadtimeupdated) {
      if (leadtimeupdated) {
         self.icsw.leadtmavg = leadtimeavg;
         self.icsw.avgltdt = leadtimedt;
      }
   };

   self.safetyChanged = function () {
      var safetyRecalc = {
         calctype: base.RECALC,
         origsafeallamt: self.icsw.safeallamt,
         origsafeallpct: self.icsw.safeallpct,
         origsafealldays: self.icsw.safealldays,
         latestleadtmavg: self.icsw.leadtmavg,
         latestusagerate: self.icsw.usagerate,
         safeallowty: self.icsw.safeallty,
         safeallamt: self.icsw.safeallamt1,
         safeallamt2: self.icsw.safeallamt2
      };
      DataService.post('api/ic/asicadmin/icswdisplaysafetyallowance', { data: safetyRecalc, busy: true }, function (data) {
         if (data) {
            self.icsw.safeallamt1 = data.safeallamt;
            self.icsw.safeallamt2 = Math.round(data.safeallamt2);
         }
      });
   };

   self.back = function () {
      $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
   };

   self.clickUpdateButton = function () {
      self.updateICSW(false);
   };

   self.clickUpdateRecalcButton = function () {
      self.updateICSW(true);
   };

   self.updateICSW = function (recalcControls) {

      if (self.icsw.safeallty === 'Q') {
         self.icsw.safeallamt = self.icsw.safeallamt1;
         self.icsw.safeallpct = self.icsw.safeallamt2;
      } else if (self.icsw.safeallty === '%') {
         self.icsw.safeallpct = self.icsw.safeallamt1;
         self.icsw.safeallamt = self.icsw.safeallamt2;
      } else {
         self.icsw.safealldays = self.icsw.safeallamt1;
         self.icsw.safeallamt = self.icsw.safeallamt2;
      }

      DataService.put('api/ic/icsw', { data: self.icsw, busy: true }, function (data) {
         if (data) {
            if (recalcControls) {
               var criteriaList = [];
               criteriaList.push(
               {
                  prod: self.icsw.prod,
                  whse: self.icsw.whse
               });
               DataService.post('api/ic/asicadmin/icamrrecalcorderingcontrols', { data: criteriaList, busy: true }, function () {
                  var params = {
                     prod: self.icamapdetail.prod,
                     whse: self.icamapdetail.whse
                  };
                  DataService.get('api/ic/icsw/getbypk', { params: params }, function (data) {
                     if (data) {
                        // redisplay the recalculated ICSW Ordering data
                        self.icsw = data;
                        MessageService.info('global.information', 'message.save.operation.completed.successfully');
                     }
                  });
               });
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         }
      });
   };
});

app.controller('IcamrSelectMethodCtrl', function ($scope, DataService) {
   var self = this;
   var mst = $scope.mst;
   var base = $scope.base;

   self.isupdateall = false;

   // Manually build New Method Drop Down
   var dropDownCriteria = {
      reportno: base.reportno,
      dropdowntype: 'icamrselectmethod'
   };

   DataService.post('api/ic/asicadmin/icamrloaddropdowns', { data: dropDownCriteria, busy: true }, function (data) {
      if (data) {
         self.newMethodList = data;
         if (data.length > 0) {
            self.newmethod = data[0].codeval;
         }
      }
   });

   // Cancel action
   self.cancel = function () {
      mst.selectMethodNew.destroy();
   };

   // Submit action
   self.submit = function () {
      mst.selectMethodUpdate(self.newmethod, self.isupdateall);
      mst.selectMethodNew.destroy();
   };
});

