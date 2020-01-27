'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsr',
      dataPath: 'api/ic/icsr',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsr/lookup',
      searchCriteria: { recordtype: '' },
      resultsRowIdField: 'icsrrowid',
      createStateView: 'ic/icsr/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icsr/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/icsrcopy',
      recentlyVisited: {
         title: { label: null, valueFunction: 'base.formatType' },
         description: [
            { label: null, value: 'whse' },
            { label: null, value: 'vendno' },
            { label: null, value: 'prodline' }
         ]
      }
   });
   $stateProvider.state('icsr.detail.costmatrix', {
      url: '/cost-matrix',
      params: {
         returnState: null
      },
      views: {
         costMatrix: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsr/cost-matrix.json');
            },
            controller: 'IcsrCostMatrixCtrl as cm'
         }
      }
   });
   $stateProvider.state('icsr.detail.costmatrix.create', {
      url: '/create',
      views: {
         cmDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsr/cost-matrix-detail.json');
            },
            controller: 'IcsrCostMatrixCreateCtrl as cmd'
         }
      }
   });
   $stateProvider.state('icsr.detail.costmatrix.detail', {
      url: '/detail',
      params: { icsru: null },
      views: {
         cmDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsr/cost-matrix-detail.json');
            },
            controller: 'IcsrCostMatrixDetailCtrl as cmd'
         }
      }
   });
   $stateProvider.state('icsr.detail.ranks', {
      url: '/ranks',
      params: {
         vendno: null,
         whse: null,
         prodline: null,
         recordtype: null,
         rankty: null,
         ranks: null,
         rankpct: null,
         pcthitfl: null,
         returnState: null
      },
      views: {
         detailRanks: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsr/detail-ranks.json');
            },
            controller: 'IcsrDetailRanksCtrl as dr'
         }
      }
   });
   $stateProvider.state('icsr.detail.ranks.create', {
      url: '/create',
      views: {
         drDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsr/detail-ranks-detail.json');
            },
            controller: 'IcsrDetailRanksCreateCtrl as drd'
         }
      }
   });
   $stateProvider.state('icsr.detail.ranks.detail', {
      url: '/detail',
      params: { icsr: null },
      views: {
         drDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icsr/detail-ranks-detail.json');
            },
            controller: 'IcsrDetailRanksDetailCtrl as drd'
         }
      }
   });
});

app.service('IcsrService', function ($translate, $state, Constants, DataService, MessageService, SecurityService) {

   this.extendBaseController = function (self) {

      self.ABCRANKS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      self.COMPANY = 'c';
      self.WHSE = 'w';
      self.VENDOR = 'v';
      self.PRODLINE = 'p';
      self.HITS = 'y';
      self.NO = 'n';
      self.ABC = 'a';
      self.PERCENT = 'p';
      self.MINHITS = 'm';
      self.DAYS = 'd';

      self.getRecordType = function (icsr) {
         var recordType = '';
         if (icsr.whse && !icsr.prodline) {
            recordType = self.WHSE;
         } else if (icsr.vendno && icsr.prodline) {
            recordType = self.PRODLINE;
         } else if (icsr.vendno) {
            recordType = self.VENDOR;
         } else if (!icsr.whse && !icsr.vendno && !icsr.prodline) {
            recordType = self.COMPANY;
         }
         return recordType;
      };

      // Format function for type in recently visited display
      self.formatType = function (icsr) {
         var icsrType = self.getRecordType(icsr);

         if (icsrType) {
            switch (icsrType.toLowerCase()) {
            case self.COMPANY:
               return $translate.instant('global.company');
            case self.VENDOR:
               return $translate.instant('global.vendor');
            case self.WHSE:
               return $translate.instant('global.warehouse');
            case self.PRODLINE:
               return $translate.instant('global.product.line');
            default:
               return icsrType;
            }
         } else {
            return icsrType;
         }
      };

      // Convert pcthitfl (yes/no) to pcthitcd (p/m)
      self.getPctHitCd = function (pctHitFl) {
         var pctHitCd = self.MINHITS;
         if (pctHitFl) {
            pctHitCd = self.PERCENT;
         }
         return pctHitCd;
      };
   };

   this.extendSearchController = function (self, base) {
      // If the Type changes - clear out the keys
      base.setResetTypeDefaults = function () {
         if (base.criteria.recordtype) {
            base.criteria.whse = '';
            base.criteria.vendno = '';
            base.criteria.prodline = '';
         }
      };
   };

   this.extendCreateController = function (self, base, icsr) {
      icsr.recordtype = base.COMPANY;
      icsr.whse = '';
      icsr.vendno = '';
      icsr.prodline = '';

      // If the Type changes - clear out the keys
      self.setResetTypeDefaults = function () {
         if (icsr.recordtype) {
            icsr.whse = '';
            icsr.vendno = '';
            icsr.prodline = '';
         }
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      var subTitle = '';
      request.torecordtype = stateParams.object.recordtype;
      request.towhse = '';
      request.tovendno = '';
      request.toprodline = '';
      request.fromvendno = stateParams.object.vendno;
      request.fromwhse = stateParams.object.whse;
      request.fromprodline = stateParams.object.prodline;

      // If the Type changes - clear out the keys
      self.setResetTypeDefaults = function () {
         if (request.torecordtype) {
            request.towhse = '';
            request.tovendno = '';
            request.toprodline = '';
         }
      };

      // Build subtitle
      if (stateParams.object.whse) {
         subTitle = $translate.instant('global.warehouse') + ' ' + stateParams.object.whse;
      }
      if (stateParams.object.vendno) {
         if (subTitle) {
            subTitle += Constants.SUB_TITLE_SEPARATOR;
         }
         subTitle += $translate.instant('global.vendor') + ' ' + stateParams.object.vendno.toString();
      }
      if (stateParams.object.prodline) {
         if (subTitle) {
            subTitle += Constants.SUB_TITLE_SEPARATOR;
         }
         subTitle += $translate.instant('global.product.line') + ' ' + stateParams.object.prodline;
      }
      if (!subTitle) {
         subTitle = $translate.instant('global.company');
      }

      self.getSubTitle = function () {
         return subTitle;
      };
   };

   this.extendDetailController = function (self, base, icsr) {
      var subTitle = '';
      self.priorityList = [];

      self.isRankingTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Ranking') < 3;
      self.isUsageTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Usage') < 3;
      self.isRoundingTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Rounding') < 3;
      self.isPriorityTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Priority') < 3;
      self.isExceptionsTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Exceptions') < 3;
      self.isAdjustersTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Adjusters') < 3;
      self.isLeadTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Lead Time') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icsr', 'Custom') < 3;

      // For New Product Rank Dropdown and Priority Minimum Product Ranks
      var allRanks = [
         { label: 'A', value: 'A' },
         { label: 'B', value: 'B' },
         { label: 'C', value: 'C' },
         { label: 'D', value: 'D' },
         { label: 'E', value: 'E' },
         { label: 'F', value: 'F' },
         { label: 'G', value: 'G' },
         { label: 'H', value: 'H' },
         { label: 'I', value: 'I' },
         { label: 'J', value: 'J' },
         { label: 'K', value: 'K' },
         { label: 'L', value: 'L' },
         { label: 'M', value: 'M' },
         { label: 'N', value: 'N' },
         { label: 'O', value: 'O' },
         { label: 'P', value: 'P' },
         { label: 'Q', value: 'Q' },
         { label: 'R', value: 'R' },
         { label: 'S', value: 'S' },
         { label: 'T', value: 'T' },
         { label: 'U', value: 'U' },
         { label: 'V', value: 'V' },
         { label: 'W', value: 'W' },
         { label: 'X', value: 'X' },
         { label: 'Y', value: 'Y' },
         { label: 'Z', value: 'Z' }
      ];

      // When the full icsr object has been resolved, fetch the ranking data
      icsr.$promise.then(function () {
         var rankcriteria = {
            whse: icsr.whse,
            vendno: icsr.vendno,
            prodline: icsr.prodline
         };
         DataService.post('api/ic/asicsetup/icsrloadrankdata', { data: rankcriteria, busy: true }, function (data) {
            if (data) {
               self.icsr.recordtype = data.icsrrankdata.recordtype;
               self.icsr.ranks = data.icsrrankdata.ranks;
               self.icsr.rankty = data.icsrrankdata.rankty;
               self.icsr.detailrankpct = data.icsrrankdata.detailrankpct;
               self.icsr.companyicusage = self.icsr.icusage;
               self.icsr.ranktySensitive = data.icsrrankdata.ranktySensitive;
               self.icsr.detailranks = data.icsrdetailranks;
               self.isCompanyRecord = false;
               self.isCompanyOrWhseRecord = false;
               self.isUseRanks = false;

               if (self.icsr.recordtype === base.COMPANY) {
                  self.isCompanyRecord = true;
               }
               if (self.icsr.recordtype === base.COMPANY || self.icsr.recordtype === base.WHSE) {
                  self.isCompanyOrWhseRecord = true;
               }
               if (self.icsr.rankty === base.HITS || self.icsr.rankty === base.ABC) {
                  self.isUseRanks = true;
               }

               // Build Ranks Dropdown based on the # of Ranks  ex. 3 = A, B, C
               self.newProdRankType = allRanks.slice(0, self.icsr.ranks);

               if (self.isCompanyRecord) {
                  self.detailRankingType = [
                     { label: MessageService.get('global.hits'), value: base.HITS },
                     { label: MessageService.get('global.no'), value: base.NO }
                  ];
               } else {
                  // Not Company Record - Get IC Usage from company
                  DataService.get('api/ic/icsr/geticsrzerovendorblankwhseline', { busy: false }, function (data) {
                     if (data) {
                        self.icsr.companyicusage = data.icusage;
                     }
                  });
                  self.detailRankingType = [
                     { label: MessageService.get('global.hits'), value: base.HITS },
                     { label: MessageService.get('global.no'), value: base.NO },
                     { label: MessageService.get('global.abc.stratification'), value: base.ABC }
                  ];
               }
            }
         });

         // build priority swap list
         self.priorityList = [
            { label: MessageService.get('global.rush.purchase.order'), value: self.icsr.rushpriority },
            { label: MessageService.get('global.critical.point'), value: self.icsr.critpriority },
            { label: MessageService.get('global.below.order.point'), value: self.icsr.beloppriority },
            { label: MessageService.get('global.negative.purchase.net.available'), value: self.icsr.bopriority },
            { label: MessageService.get('global.document.ties'), value: self.icsr.docpriority },
            { label: MessageService.get('global.normal.purchasing'), value: self.icsr.otherpriority }
         ];
         self.priorityList.sort(function (a, b) {
            return a.value - b.value;
         });

         // Build subtitle
         subTitle = base.formatType(self.icsr);
         if (subTitle === $translate.instant('global.warehouse')) {
            subTitle += ' '  + self.icsr.whse;
         } else if (subTitle === $translate.instant('global.vendor')) {
            subTitle += ' ' + self.icsr.vendno.toString();
         } else if (subTitle === $translate.instant('global.product.line')) {
            subTitle = $translate.instant('global.warehouse') + ' ' + self.icsr.whse + Constants.SUB_TITLE_SEPARATOR;
            subTitle += $translate.instant('global.vendor') + ' ' + self.icsr.vendno.toString() + Constants.SUB_TITLE_SEPARATOR;
            subTitle += $translate.instant('global.product.line') + ' ' + self.icsr.prodline;
         }
      });
      self.getSubTitle = function () {
         return subTitle;
      };

      self.costMatrixClick = function () {
         $state.go('icsr.detail.costmatrix', {
            returnState: $state.current.name
         });
      };

      self.detailRankClick = function () {
         $state.go('icsr.detail.ranks', {
            vendno: icsr.vendno,
            whse: icsr.whse,
            prodline: icsr.prodline,
            recordtype: icsr.recordtype,
            rankty: icsr.rankty,
            ranks: icsr.ranks,
            rankpct: icsr.detailrankpct,
            pcthitfl: icsr.pcthitfl,
            returnState: $state.current.name
         });
      };

      self.ranksChanged = function () {
         if (self.icsr.ranks) {
            DataService.get('api/ic/asicsetup/icsrrankleavefield/' + self.icsr.rankty + '/' + self.icsr.ranks, { busy: true }, function (data) {
               if (data) {
                  if (data.length > 0) {
                     MessageService.info('global.alert', data);
                  }
               }
               // rebuild Ranks drop down based on new # of Ranks
               self.newProdRankType = allRanks.slice(0, self.icsr.ranks);
            });
         }
      };

      self.rankTyChanged = function () {
         self.isUseRanks = false;
         if (self.icsr.rankty === base.HITS || self.icsr.rankty === base.ABC) {
            self.isUseRanks = true;
         }
      };

      self.pctHitChanged = function () {

         var pctHitCd = base.getPctHitCd(self.icsr.pcthitfl);
         DataService.get('api/ic/asicsetup/icsrpcthitleavefield/' + self.icsr.recordtype + '/' + self.icsr.rankty + '/' + pctHitCd, { busy: true }, function (data) {
            if (data) {
               MessageService.info('global.alert', data);
            }
         });
      };

      self.customSubmit = function () {
         if (self.isCompanyRecord) {
            for (var i = 0; i < self.priorityList.length; i++) {
               if (self.priorityList[i].label === MessageService.get('global.rush.purchase.order')) {
                  self.icsr.rushpriority = i + 1;
               } else if (self.priorityList[i].label === MessageService.get('global.critical.point')) {
                  self.icsr.critpriority = i + 1;
               } else if (self.priorityList[i].label === MessageService.get('global.below.order.point')) {
                  self.icsr.beloppriority = i + 1;
               } else if (self.priorityList[i].label === MessageService.get('global.negative.purchase.net.available')) {
                  self.icsr.bopriority = i + 1;
               } else if (self.priorityList[i].label === MessageService.get('global.document.ties')) {
                  self.icsr.docpriority = i + 1;
               } else if (self.priorityList[i].label === MessageService.get('global.normal.purchasing')) {
                  self.icsr.otherpriority = i + 1;
               }
            }
         }

         var newPctHitCd = base.getPctHitCd(icsr.pcthitfl);
         var checkrankdata = {
            vendno: icsr.vendno,
            whse: icsr.whse,
            prodline: icsr.prodline,
            ranks: icsr.ranks,
            rankty: icsr.rankty,
            newprodrank: icsr.newprodrank,
            newprodmonths: icsr.newprodmonths,
            monthshistory: icsr.monthshistory,
            pcthitcd: newPctHitCd
         };

         // This SI call will validate the ranking tab and detail ranks.  It does not save.
         DataService.post('api/ic/asicsetup/icsrsaverankdata', {
            data: {
               icsrdetailranks: icsr.detailranks,
               icsrrankdata: checkrankdata
            },
            busy: true
         }, function (data) {

            // Display any Messages/Errors - ttblmessaging
            if (!MessageService.processMessaging(data)) {

               // Move the Detail Ranks into the individual array fields for the save change
               for (var j = 0; j < icsr.detailranks.length; j++) {
                  var obj = icsr.detailranks[j];
                  var seqNum = j + 1;
                  icsr['maxleadtime' + seqNum] = obj.maxleadtime;          //1
                  icsr['maxleadtimewhse' + seqNum] = obj.maxleadtimewhse;  //2
                  icsr['maxsafety' + seqNum] = obj.maxsafety;              //3
                  icsr['maxsafevendty' + seqNum] = obj.maxsafevendty;      //4
                  icsr['maxsafewhsety' + seqNum] = obj.maxsafewhsety;      //5
                  icsr['midsafevendty' + seqNum] = obj.midsafevendty;      //6
                  icsr['midsafewhsety' + seqNum] = obj.midsafewhsety;      //7
                  icsr['minhits' + seqNum] = obj.minhits;                  //8
                  icsr['minleadtime' + seqNum] = obj.minleadtime;          //9
                  icsr['minleadtimewhse' + seqNum] = obj.minleadtimewhse;  //10
                  icsr['minsafety' + seqNum] = obj.minsafety;              //11
                  icsr['minsafevendty' + seqNum] = obj.minsafevendty;      //12
                  icsr['minsafewhsety' + seqNum] = obj.minsafewhsety;      //13
                  icsr['rankpct' + seqNum] = obj.rankpct;                  //14
                  icsr['safetymajority' + seqNum] = obj.safetymajority;    //15
                  icsr['safetymonths' + seqNum] = obj.safetymonths;        //16
                  icsr['safetyrcpts' + seqNum] = obj.safetyrcpts;          //17
                  icsr['safevendmax' + seqNum] = obj.safevendmax;          //18
                  icsr['safevendmid' + seqNum] = obj.safevendmid;          //19
                  icsr['safevendmin' + seqNum] = obj.safevendmin;          //20
                  icsr['safewhsemax' + seqNum] = obj.safewhsemax;          //21
                  icsr['safewhsemid' + seqNum] = obj.safewhsemid;          //22
                  icsr['safewhsemin' + seqNum] = obj.safewhsemin;          //23
                  icsr['usgmths' + seqNum] = obj.usgmths;                  //24
               }

               if (!self.isCompanyRecord) {
                  icsr.ranks = 0;
               }

               self.submit();
            }
         });
      };
   };
});

app.controller('IcsrCostMatrixCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService) {
   var self = this;
   var dtl = $scope.dtl;
   var icsr = dtl.icsr;

   self.back = function () {
      $state.go($stateParams.returnState);
   };

   // This is needed so we can hide other views appropriately
   self.isCostMatrixMaster = function () {
      return $state.current.name.endsWith('.costmatrix');
   };
   self.isCostMatrixCreate = function () {
      return $state.current.name.endsWith('.create');
   };

   self.searchIcsru = function () {
      var matrixcriteria = {
         whse: icsr.whse,
         vendno: icsr.vendno,
         prodline: icsr.prodline
      };
      DataService.post('api/ic/asicsetup/icsrloadcostmatrix', { data: matrixcriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   if (icsr) {
      self.searchIcsru();
   }

   self.edit = function () {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         $state.go('.detail', { icsru: record });
      }
   };

   self.isCellEditable = function (row) {
      if (row === 0) {
         return false;
      } else {
         return true;
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.detail', { icsru: record });
   };

   self.delete = function () {
      var rowIds = GridService.getSelectedRowIds(self.grid, 'icsrurowid');

      // Proceed if any rows are selected
      if (rowIds.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            DataService.delete('api/ic/icsru/deletelistbyrowids', { data: rowIds, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               self.searchIcsru();
            });
         });
      }
   };
   self.applyMatrix = function (matrix, icsru) {
      for (var i = 0; i <= 9; i++) {
         var obj = matrix[i];
         var seqNum = i + 1;
         icsru['costge' + seqNum] = obj.costge;
         icsru['newop' + seqNum] = obj.newop;
         icsru['newlp' + seqNum] = obj.newlp;
         icsru['newqty' + seqNum] = obj.newqty;
      }
   };
});

//Separate View used for Cost Matrix Create mode.
app.controller('IcsrCostMatrixCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService, UserService) {
   var self = this;
   var dtl = $scope.dtl;
   var icsr = dtl.icsr;
   var cm = $scope.cm;

   self.icsru = {
      cono: UserService.getCono(),
      whse: icsr.whse,
      vendno: icsr.vendno,
      prodline: icsr.prodline
   };

   self.matrix = [
      { seqno: MessageService.get('number.1'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.2'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.3'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.4'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.5'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.6'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.7'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.8'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.9'), costge: 0, newop: 0, newlp: 0, newqty: 0 },
      { seqno: MessageService.get('number.10'), costge: 0, newop: 0, newlp: 0, newqty: 0 }
   ];

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      cm.applyMatrix(self.matrix, self.icsru);
      DataService.post('api/ic/icsru', { data: self.icsru, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         cm.searchIcsru();
      });
   };
});

//Separate View used for Cost Matrix Update mode.
app.controller('IcsrCostMatrixDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var cm = $scope.cm;

   var rowID = $stateParams.icsru.icsrurowid;
   DataService.get('api/ic/icsru/getbyrowid/' + rowID, { busy: true }, function (data) {
      self.icsru = data;
      self.matrix = [
         { seqno: MessageService.get('number.1'), costge: self.icsru.costge1, newop: self.icsru.newop1, newlp: self.icsru.newlp1, newqty: self.icsru.newqty1 },
         { seqno: MessageService.get('number.2'), costge: self.icsru.costge2, newop: self.icsru.newop2, newlp: self.icsru.newlp2, newqty: self.icsru.newqty2 },
         { seqno: MessageService.get('number.3'), costge: self.icsru.costge3, newop: self.icsru.newop3, newlp: self.icsru.newlp3, newqty: self.icsru.newqty3 },
         { seqno: MessageService.get('number.4'), costge: self.icsru.costge4, newop: self.icsru.newop4, newlp: self.icsru.newlp4, newqty: self.icsru.newqty4 },
         { seqno: MessageService.get('number.5'), costge: self.icsru.costge5, newop: self.icsru.newop5, newlp: self.icsru.newlp5, newqty: self.icsru.newqty5 },
         { seqno: MessageService.get('number.6'), costge: self.icsru.costge6, newop: self.icsru.newop6, newlp: self.icsru.newlp6, newqty: self.icsru.newqty6 },
         { seqno: MessageService.get('number.7'), costge: self.icsru.costge7, newop: self.icsru.newop7, newlp: self.icsru.newlp7, newqty: self.icsru.newqty7 },
         { seqno: MessageService.get('number.8'), costge: self.icsru.costge8, newop: self.icsru.newop8, newlp: self.icsru.newlp8, newqty: self.icsru.newqty8 },
         { seqno: MessageService.get('number.9'), costge: self.icsru.costge9, newop: self.icsru.newop9, newlp: self.icsru.newlp9, newqty: self.icsru.newqty9 },
         { seqno: MessageService.get('number.10'), costge: self.icsru.costge10, newop: self.icsru.newop10, newlp: self.icsru.newlp10, newqty: self.icsru.newqty10 }
      ];
   });

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      cm.applyMatrix(self.matrix, self.icsru);
      DataService.put('api/ic/icsru', { data: self.icsru, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^');
         cm.searchIcsru();
      });
   };
});

app.controller('IcsrDetailRanksCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService, StandardConverters) {
   var self = this;
   var dtl = $scope.dtl;
   var base = $scope.base;
   var icsr = dtl.icsr;

   self.dataset = icsr.detailranks;
   var saveDataset = self.dataset.slice(0);

   self.criteria = {
      vendno: $stateParams.vendno,
      whse: $stateParams.whse,
      prodline: $stateParams.prodline,
      recordtype: $stateParams.recordtype,
      ranks: $stateParams.ranks,
      rankty: $stateParams.rankty,
      rankpct: $stateParams.rankpct,
      pcthitfl: $stateParams.pcthitfl,
      searchwhse: ''
   };

   self.back = function () {
      icsr.detailranks = saveDataset.slice(0);
      $state.go($stateParams.returnState);
   };

   // This is needed so we can hide other views appropriately
   self.isDetailRanksMaster = function () {
      return $state.current.name.endsWith('.ranks');
   };
   self.isDetailRanksCreate = function () {
      return $state.current.name.endsWith('.create');
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(self.grid);
      if (record) {
         $state.go('.detail', { icsr: record });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('.detail', { icsr: record });
   };

   self.search = function () {
      var searchcriteria = {
         whse: icsr.whse,
         vendno: icsr.vendno,
         prodline: icsr.prodline,
         searchwhse: self.criteria.searchwhse
      };
      DataService.post('api/ic/asicsetup/icsrbuildhierarchy', {
         data: {
            icsrdetailranks: self.dataset,
            icsrrankdata: searchcriteria
         },
         busy: true
      }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   self.submit = function () {

      var pctHitCd = base.getPctHitCd(self.criteria.pcthitfl);
      var rankdata = {
         vendno: self.criteria.vendno,
         whse: self.criteria.whse,
         prodline: self.criteria.prodline,
         ranks: self.criteria.ranks,
         rankty: self.criteria.rankty,
         pcthitcd: pctHitCd,
         searchwhse: self.criteria.searchwhse
      };

      DataService.post('api/ic/asicsetup/icsrrankoktoclose', {
         data: {
            icsrdetailranks: self.dataset,
            icsrrankdata: rankdata
         },
         busy: true
      }, function () {
         icsr.detailranks = self.dataset;
         icsr.detailrankpct = self.criteria.rankpct;
         $state.go($stateParams.returnState);
      });
   };

   // Delete selected records from working dataset
   self.delete = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            records.forEach(function (record) {
               self.criteria.rankpct -= record.rankpct;
               var indx = self.dataset.indexOf(record);
               self.dataset.splice(indx, 1);
            });
            if (self.dataset.length) {
               var deleteranks = {
                  rankty: self.criteria.rankty
               };
               // This SI call re-assigns the rank levels (A, B, C, etc)
               DataService.post('api/ic/asicsetup/icsrrankafterdelete', {
                  data: {
                     icsrdetailranks: self.dataset,
                     icsrrankdata: deleteranks
                  },
                  busy: true
               }, function (data) {
                  if (data) {
                     self.dataset = data;
                  }
               });
            }
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
         });
      }
   };

   self.getOrigin = function (type) {
      if (type) {
         switch (type.toLowerCase()) {
         case base.COMPANY:
            return ' (' + $translate.instant('global.company') + ')';
         case base.WHSE:
            return ' (' + $translate.instant('global.warehouse') + ')';
         case base.VENDOR:
            return ' (' + $translate.instant('global.vendor') + ')';
         default:
            return type;
         }
      } else {
         return '';
      }
   };

   self.getType = function (type) {
      if (type) {
         switch (type.toLowerCase()) {
         case base.DAYS:
            return $translate.instant('global.days');
         case base.PERCENT:
            return $translate.instant('symbol.percent');
         default:
            return type;
         }
      } else {
         return $translate.instant('global.ignore');
      }
   };

   /* Hierarch Display - fieldrec = source of field, fieldlev = display value, field = ICSR data */
   /* Integer Fields */
   self.minHitsFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.minhitsrec);
   };
   self.usgMthsFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.usgmthsrec);
   };
   self.minLeadFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.minleadrec);
   };
   self.maxLeadFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.maxleadrec);
   };
   self.minLeadTimeWhseFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.minleadtimewhserec);
   };
   self.maxLeadTimeWhseFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.maxleadtimewhserec);
   };
   self.rcptsFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.rcptsrec);
   };
   self.safeMthsFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.safemthsrec);
   };
   self.safeMajorFormatter = function (row, cell, value, column, item) {
      return value + self.getOrigin(item.safemajorrec);
   };
   /* Decimal Fields */
   self.rankPctFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.rankpctrec);
   };
   self.vendPctFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2}) + self.getOrigin(item.vendpctrec);
   };
   self.safeVendMaxFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.safevendmaxrec);
   };
   self.vendDaysFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.venddaysrec);
   };
   self.whsePctFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.whsepctrec);
   };
   self.whseDaysFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.whsedaysrec);
   };
   self.safeWhseMaxFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.safewhsemaxrec);
   };
   self.minSafeFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.minsaferec);
   };
   self.maxSafeFormatter = function (row, cell, value, column, item) {
      return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2 }) + self.getOrigin(item.maxsaferec);
   };
   /* Types - Drop Downs */
   self.minVendTyFormatter = function (row, cell, value, column, item) {
      return self.getType(value) + self.getOrigin(item.minvendtyrec);
   };
   self.maxVendTyFormatter = function (row, cell, value, column, item) {
      return self.getType(value) + self.getOrigin(item.maxvendtyrec);
   };
   self.midVendTyFormatter = function (row, cell, value, column, item) {
      return self.getType(value) + self.getOrigin(item.midvendtyrec);
   };
   self.minWhseTyFormatter = function (row, cell, value, column, item) {
      return self.getType(value) + self.getOrigin(item.minwhsetyrec);
   };
   self.maxWhseTyFormatter = function (row, cell, value, column, item) {
      return self.getType(value) + self.getOrigin(item.maxwhsetyrec);
   };
   self.midWhseTyFormatter = function (row, cell, value, column, item) {
      return self.getType(value) + self.getOrigin(item.midwhsetyrec);
   };
});

//Separate View used for Create mode.
app.controller('IcsrDetailRanksCreateCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;
   var dr = $scope.dr;

   self.isUpdateMode = true;
   self.isRankPctEnabled = true;
   self.isMinHitsEnabled = true;

   self.getNextRank = function () {
      var nextIndex = 0;
      if (dr.dataset) {
         dr.dataset.forEach(function (record) {
            if (base.ABCRANKS.indexOf(record.ranklevel) >= nextIndex) {
               nextIndex = base.ABCRANKS.indexOf(record.ranklevel) + 1;
            }
         });
      }
      return base.ABCRANKS[nextIndex];
   };

   self.icsr = {
      ranklevel: self.getNextRank(),
      rankpct: Math.max(0, 100 - dr.criteria.rankpct),
      minhits: 0,
      usgmths: 6,
      maxleadtime: 0,
      minleadtime: 0,
      safewhsemid: 0,
      safewhsemin: 0,
      safevendmid: 0,
      safevendmin: 0,
      minsafety: '',
      maxsafety: '',
      safetymonths: 0,
      safetymajority: 0,
      safetyrcpts: 0,
      safevendmax: 0,
      safewhsemax: 0,
      maxleadtimewhse: 0,
      minleadtimewhse: 0,
      minsafevendty: '',
      midsafevendty: '',
      maxsafevendty: '',
      minsafewhsety: '',
      midsafewhsety: '',
      maxsafewhsety: ''
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {

      var validranks = {
         rankty: dr.criteria.rankty
      };
      var updateranks = {
         ranklevel: self.icsr.ranklevel,
         rankpct: self.icsr.rankpct,
         minhits: self.icsr.minhits,
         usgmths: self.icsr.usgmths,
         maxleadtime: self.icsr.maxleadtime,
         minleadtime: self.icsr.minleadtime,
         safewhsemid: self.icsr.safewhsemid,
         safewhsemin: self.icsr.safewhsemin,
         safevendmid: self.icsr.safevendmid,
         safevendmin: self.icsr.safevendmin,
         minsafety: self.icsr.minsafety,
         maxsafety: self.icsr.maxsafety,
         safetymonths: self.icsr.safetymonths,
         safetymajority: self.icsr.safetymajority,
         safetyrcpts: self.icsr.safetyrcpts,
         safevendmax: self.icsr.safevendmax,
         safewhsemax: self.icsr.safewhsemax,
         maxleadtimewhse: self.icsr.maxleadtimewhse,
         minleadtimewhse: self.icsr.minleadtimewhse,
         minsafevendty: self.icsr.minsafevendty,
         midsafevendty: self.icsr.midsafevendty,
         maxsafevendty: self.icsr.maxsafevendty,
         minsafewhsety: self.icsr.minsafewhsety,
         midsafewhsety: self.icsr.midsafewhsety,
         maxsafewhsety: self.icsr.maxsafewhsety
      };
      DataService.post('api/ic/asicsetup/icsrrankvalidate', {
         data: {
            icsrdetailranks: updateranks,
            icsrrankdata: validranks
         },
         busy: true
      }, function () {
         dr.dataset.push(self.icsr);
         var pctHitCd = base.getPctHitCd(dr.criteria.pcthitfl);
         var pctranks = {
            vendno: dr.criteria.vendno,
            whse: dr.criteria.whse,
            prodline: dr.criteria.prodline,
            pcthitcd: pctHitCd,
            searchwhse: dr.criteria.searchwhse
         };
         // This SI call rebuilds the detail rank grid records
         DataService.post('api/ic/asicsetup/icsrrankaftersave', {
            data: {
               icsrdetailranks: dr.dataset,
               icsrrankdata: pctranks
            },
            busy: true
         }, function (data) {
            if (data) {
               dr.criteria.rankpct += self.icsr.rankpct;
               dr.dataset = data;
            }
         });
         $state.go('^');
      });
   };
});

//Separate View used for Update mode.
app.controller('IcsrDetailRanksDetailCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var dr = $scope.dr;
   var dtl = $scope.dtl;
   var base = $scope.base;
   self.icsr = $stateParams.icsr;

   var rankIndex = base.ABCRANKS.indexOf(self.icsr.ranklevel);

   self.isUpdateMode = true;
   self.isRankPctEnabled = false;
   self.isMinHitsEnabled = false;
   self.oldRankPct = self.icsr.rankpct;

   // For ABC Stratification many fields can't be updated
   if (dr.criteria.rankty === base.ABC &&
      self.icsr.ranklevel &&
      (rankIndex < 0 || rankIndex > 3))
   {
      self.isUpdateMode = false;
   }
   if ((self.isUpdateMode || dr.criteria.rankty === base.ABC) && dtl.isCompanyOrWhseRecord) {
      self.isRankPctEnabled = true;
   }
   if (self.isUpdateMode  && dtl.isCompanyOrWhseRecord) {
      self.isMinHitsEnabled = true;
   }

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {

      var validranks = {
         rankty: dr.criteria.rankty
      };
      var updateranks = {
         ranklevel: self.icsr.ranklevel,
         rankpct: self.icsr.rankpct,
         minhits: self.icsr.minhits,
         usgmths: self.icsr.usgmths,
         maxleadtime: self.icsr.maxleadtime,
         minleadtime: self.icsr.minleadtime,
         safewhsemid: self.icsr.safewhsemid,
         safewhsemin: self.icsr.safewhsemin,
         safevendmid: self.icsr.safevendmid,
         safevendmin: self.icsr.safevendmin,
         minsafety: self.icsr.minsafety,
         maxsafety: self.icsr.maxsafety,
         safetymonths: self.icsr.safetymonths,
         safetymajority: self.icsr.safetymajority,
         safetyrcpts: self.icsr.safetyrcpts,
         safevendmax: self.icsr.safevendmax,
         safewhsemax: self.icsr.safewhsemax,
         maxleadtimewhse: self.icsr.maxleadtimewhse,
         minleadtimewhse: self.icsr.minleadtimewhse,
         minsafevendty: self.icsr.minsafevendty,
         midsafevendty: self.icsr.midsafevendty,
         maxsafevendty: self.icsr.maxsafevendty,
         minsafewhsety: self.icsr.minsafewhsety,
         midsafewhsety: self.icsr.midsafewhsety,
         maxsafewhsety: self.icsr.maxsafewhsety
      };
      DataService.post('api/ic/asicsetup/icsrrankvalidate', {
         data: {
            icsrdetailranks: updateranks,
            icsrrankdata: validranks
         },
         busy: true
      }, function () {

         var pctHitCd = base.getPctHitCd(dr.criteria.pcthitfl);
         var pctranks = {
            vendno: dr.criteria.vendno,
            whse: dr.criteria.whse,
            prodline: dr.criteria.prodline,
            pcthitcd: pctHitCd,
            searchwhse: dr.criteria.searchwhse
         };
         // This SI call rebuilds the detail rank grid records
         DataService.post('api/ic/asicsetup/icsrrankaftersave', {
            data: {
               icsrdetailranks: dr.dataset,
               icsrrankdata: pctranks
            },
            busy: true
         }, function (data) {
            if (data) {
               dr.criteria.rankpct -= self.oldRankPct;
               dr.criteria.rankpct += self.icsr.rankpct;
               dr.dataset = data;
            }
         });
         $state.go('^');
      });
   };
});