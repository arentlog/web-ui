'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('gl', 'glia', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('gl', 'glia');

   $stateProvider.state('glia.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glia/detail.json');
            },
            controller: 'GliaDetailCtrl as dtl'
         }
      },
      resolve: {
         accessTest: function ($q, $stateParams, DataService, MessageService, TabService) {
            var deferred = $q.defer();
            if ($stateParams.pk) {
               var crit = {
                  tablename: 'glsa',
                  glno: $stateParams.pk
               };

               DataService.post('/web/api/shared/checkhyperlinkaccess', { data: crit, busy: true }, function (data) {
                  if (data.success) {
                     deferred.resolve();
                  } else {
                     deferred.reject();
                     MessageService.error('global.error', 'global.security.violations.hyperlink');
                     TabService.closeTab('glia');
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

   $stateProvider.state('glia.detail.trans-detail', {
      url: '/trans-detail',
      params: { record: null },
      views: {
         childDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glia/tabs/transactions-detail.json');
            },
            controller: 'GliaTransDetailCtrl as transdtl'
         }
      }
   });
});

app.controller('GliaBaseCtrl', function ($state, ConfigService, DataService, MessageService, Utils, AuthService, Sasc) {
   var self = this;
   self.criteria = {};
   self.glsaRowID = 0;

   self.isMaster = function () {
      return $state.is('glia.master');
   };

   self.includesMaster = function () {
      return $state.includes('glia.master');
   };

   self.isDetail = function () {
      return $state.is('glia.detail');
   };

   self.includesDetail = function () {
      return $state.includes('glia.detail');
   };

   self.initCriteria = function () {
      self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      if (Sasc.glcurfisc === 0) {
         self.criteria.yr = Sasc.glcurfisc;
      } else if (Sasc.glcurfisc < 50) {
         self.criteria.yr = Sasc.glcurfisc + 2000;
      } else if (Sasc.glcurfisc <= 99) {
         self.criteria.yr = Sasc.glcurfisc + 1900;
      }
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      var glAcctAuthCriteria = {
         option1Account: self.criteria.glno
      };

      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: glAcctAuthCriteria, busy: true }, function (data) {
         if (data) {
            if (!data.userhassecurity) {
               AuthService.createAuthPoint('glia', '', 'account', '', '', null, self.submitAddAuthPointPassed, null);
            }
            else {
               $state.go('^.detail');
            }
         }
      });
   };

   self.submitAddAuthPointPassed = function () {
      $state.go('^.detail');
   };

   // Perform initialization of search criteria
   self.initCriteria();

   self.getMonth = function (code) {
      switch (code) {
         case 0:
            return MessageService.get('global.december');
         case 1:
            return MessageService.get('global.january');
         case 2:
            return MessageService.get('global.february');
         case 3:
            return MessageService.get('global.march');
         case 4:
            return MessageService.get('global.april');
         case 5:
            return MessageService.get('global.may');
         case 6:
            return MessageService.get('global.june');
         case 7:
            return MessageService.get('global.july');
         case 8:
            return MessageService.get('global.august');
         case 9:
            return MessageService.get('global.september');
         case 10:
            return MessageService.get('global.october');
         case 11:
            return MessageService.get('global.november');
      }
   };

});

app.controller('GliaSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('glia.master');
      }

      base.search();
   };
});

app.controller('GliaMasterCtrl', function ($scope) {
   var self = this;
   var base = $scope.base;
});

app.controller('GliaDetailCtrl', function ($scope, $state, $stateParams, Constants) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.pk) {
      base.criteria.glno = $stateParams.pk;
   }

   if ($stateParams.pk2) {
      base.criteria.yr = $stateParams.pk2;
   }

});

app.controller('GliaAccountCtrl', function ($scope, $state, $translate, $stateParams, Constants, DataService, MessageService, Sasc) {
   var self = this;
   var base = $scope.base;
   self.glAccountInfo = {};
   self.periodBalances = [];
   var dtl = $scope.dtl;

   self.loadAccountDetails = function () {
      var criteria = {
         glno: base.criteria.glno,
         glyear: base.criteria.yr
      };

      DataService.post('api/gl/asglinquiry/fetchacctdetail', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.glAccountInfo = data[0];
            base.glsaRowID = self.glAccountInfo.rowidGlsa;

            self.glAccountInfo.balty = (self.glAccountInfo.balty) ? $translate.instant('global.debit').toLowerCase() : $translate.instant('global.credit').toLowerCase();
            self.glAccountInfo.prtty = (self.glAccountInfo.prtty) ? $translate.instant('global.detail').toLowerCase() : $translate.instant('global.summary').toLowerCase();

            dtl.subTitle = self.glAccountInfo.glno + Constants.SUB_TITLE_SEPARATOR + self.glAccountInfo.gltitle + Constants.SUB_TITLE_SEPARATOR + self.glAccountInfo.glyear;
            
            self.loadPeriodBalances();
            self.checkNullBalances();
         }
      });
   };

   self.checkNullBalances = function () {
      var criteria = { glsarowid: base.glsaRowID };
      DataService.post('api/gl/asglinquiry/glsacheckfornull', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (data.warningmess) {
               MessageService.info('global.warning', data.warningmess);
            }
         }
      });
   };

   self.loadPeriodBalances = function () {
      if (Sasc.gl13perfl) {
         self.periodBalances = [
               { period: self.glAccountInfo.period1.trim(), ptd: self.glAccountInfo.ptd1, ytd: self.glAccountInfo.ytd1 },
               { period: self.glAccountInfo.period2.trim(), ptd: self.glAccountInfo.ptd2, ytd: self.glAccountInfo.ytd2 },
               { period: self.glAccountInfo.period3.trim(), ptd: self.glAccountInfo.ptd3, ytd: self.glAccountInfo.ytd3 },
               { period: self.glAccountInfo.period4.trim(), ptd: self.glAccountInfo.ptd4, ytd: self.glAccountInfo.ytd4 },
               { period: self.glAccountInfo.period5.trim(), ptd: self.glAccountInfo.ptd5, ytd: self.glAccountInfo.ytd5 },
               { period: self.glAccountInfo.period6.trim(), ptd: self.glAccountInfo.ptd6, ytd: self.glAccountInfo.ytd6 },
               { period: self.glAccountInfo.period7.trim(), ptd: self.glAccountInfo.ptd7, ytd: self.glAccountInfo.ytd7 },
               { period: self.glAccountInfo.period8.trim(), ptd: self.glAccountInfo.ptd8, ytd: self.glAccountInfo.ytd8 },
               { period: self.glAccountInfo.period9.trim(), ptd: self.glAccountInfo.ptd9, ytd: self.glAccountInfo.ytd9 },
               { period: self.glAccountInfo.period10.trim(), ptd: self.glAccountInfo.ptd10, ytd: self.glAccountInfo.ytd10 },
               { period: self.glAccountInfo.period11.trim(), ptd: self.glAccountInfo.ptd11, ytd: self.glAccountInfo.ytd11 },
               { period: self.glAccountInfo.period12.trim(), ptd: self.glAccountInfo.ptd12, ytd: self.glAccountInfo.ytd12 },
               { period: self.glAccountInfo.period13.trim(), ptd: self.glAccountInfo.ptd13, ytd: self.glAccountInfo.ytd13 }
         ];
      }
      else {
         self.periodBalances = [
               { period: base.getMonth((Sasc.glbegfisc + 0) % 12), ptd: self.glAccountInfo.ptd1, ytd: self.glAccountInfo.ytd1 },
               { period: base.getMonth((Sasc.glbegfisc + 1) % 12), ptd: self.glAccountInfo.ptd2, ytd: self.glAccountInfo.ytd2 },
               { period: base.getMonth((Sasc.glbegfisc + 2) % 12), ptd: self.glAccountInfo.ptd3, ytd: self.glAccountInfo.ytd3 },
               { period: base.getMonth((Sasc.glbegfisc + 3) % 12), ptd: self.glAccountInfo.ptd4, ytd: self.glAccountInfo.ytd4 },
               { period: base.getMonth((Sasc.glbegfisc + 4) % 12), ptd: self.glAccountInfo.ptd5, ytd: self.glAccountInfo.ytd5 },
               { period: base.getMonth((Sasc.glbegfisc + 5) % 12), ptd: self.glAccountInfo.ptd6, ytd: self.glAccountInfo.ytd6 },
               { period: base.getMonth((Sasc.glbegfisc + 6) % 12), ptd: self.glAccountInfo.ptd7, ytd: self.glAccountInfo.ytd7 },
               { period: base.getMonth((Sasc.glbegfisc + 7) % 12), ptd: self.glAccountInfo.ptd8, ytd: self.glAccountInfo.ytd8 },
               { period: base.getMonth((Sasc.glbegfisc + 8) % 12), ptd: self.glAccountInfo.ptd9, ytd: self.glAccountInfo.ytd9 },
               { period: base.getMonth((Sasc.glbegfisc + 9) % 12), ptd: self.glAccountInfo.ptd10, ytd: self.glAccountInfo.ytd10 },
               { period: base.getMonth((Sasc.glbegfisc + 10) % 12), ptd: self.glAccountInfo.ptd11, ytd: self.glAccountInfo.ytd11 },
               { period: base.getMonth((Sasc.glbegfisc + 11) % 12), ptd: self.glAccountInfo.ptd12, ytd: self.glAccountInfo.ytd12 }
         ];
      }
   };

   if (base.criteria.glno) {
      self.loadAccountDetails();
   }
});

app.controller('GliaTransactionsCtrl', function ($scope, $state, $stateParams, Constants, DataService, StandardConverters, ConfigService) {
   var self = this;
   var base = $scope.base;
   self.transData = [];
   self.transGrid = {};
   self.criteria = { trcode: 0, recordlimit: ConfigService.getDefaultRecordLimit() };

   self.loadTransactionDetails = function () {
      self.criteria.glno = base.criteria.glno;
      self.criteria.glyear = base.criteria.yr;

      DataService.post('api/gl/asglinquiry/fetchaccttrans', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            data.gliatransresults.forEach(function (record) {
               if (record.currProc && record.currProc.toLowerCase() === 'apei') {
                  record.currProc = 'apece';
               }
            });
            self.transData = data.gliatransresults;
         }
      });
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;
      if (selectedRecord) {
         $state.go('^.detail.trans-detail', { record: selectedRecord });
      }
   };

   self.jrnlInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.jrnlno) {
         $state.go('glij.detail', { pk: currentRow.jrnlno, pk2: currentRow.setno });
      }
   };

   self.search = function () {
      self.loadTransactionDetails();
   };

   self.loadTransactionDetails();

   self.amountDispaly = function (row, cell, value, column, item) {
      if (column.name.toLowerCase() === item.cTransCd.toLowerCase()) {
         return StandardConverters.Decimal.convert(value, null, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else {
         return '';
      }
   };

});

app.controller('GliaTransDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, Utils, Sasc, MessageService) {
   var self = this;
   var base = $scope.base;
   self.transRecord = $stateParams.record;
   self.revalData = [];
   self.revalGrid = {};

   self.isEnableFields = (self.transRecord && self.transRecord.currProc && self.transRecord.currProc.toUpperCase() === 'GLIJ');
   self.extendedref = '';

   self.getSubTitle = function () {
      return (base.criteria.glno ? base.criteria.glno + Constants.SUB_TITLE_SEPARATOR : '') + base.criteria.yr + Constants.SUB_TITLE_SEPARATOR + self.transRecord.jrnlno;
   };

   self.cancel = function () {
      $state.go('glia.detail');
   };

   self.getGlee = function () {
      if (self.transRecord) {
         var keyno = Utils.pad(self.transRecord.jrnlno, 8);
         var gleeparams = {
            keyno: keyno,
            setno: self.transRecord.setno,
            transno: self.transRecord.transno
         };

         DataService.get('api/gl/glee/getbypk', { params: gleeparams, busy: true }, function (data) {
            if (data) {
               self.glee = data;
               self.extendedref = data.reference1 + data.reference2 + data.reference3 + data.reference4 + data.reference5 +
                  data.reference6 + data.reference7 + data.reference8 + data.reference9 + data.reference10;
            }
         });
      }
   };

   self.getRevalData = function () {
      var gletParams = {
         jrnlno: self.transRecord.jrnlno,
         setno: self.transRecord.setno,
         transno: self.transRecord.transno
      };

      DataService.get('api/gl/glet/getbypk', { params: gletParams, busy: true }, function (data) {
         if (data) {
            var glet = data;

            var revalCriteria = {
               rowidGlet: glet.rowID
            };

            DataService.post('api/gl/asglinquiry/fetchaccttransrev', { data: revalCriteria, busy: true }, function (data) {
               if (data) {
                  self.revalData = data;
               }
            });

            self.getGlee();
         }
      });
   };

   self.getRevalData();

});

app.controller('GliaBalHistoryCtrl', function ($scope, $state, $stateParams, Constants, DataService) {
   var self = this;
   var base = $scope.base;
   self.criteria = {};
   self.balHistData = [];
   self.balHistGrid = {};

   self.search = function () {

      self.criteria.glno = base.criteria.glno;
      self.criteria.glyear = base.criteria.yr;

      DataService.post('api/gl/asglinquiry/fetchhistbal', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.balHistData = data;
         }
      });
   };

   self.search();

});

app.controller('GliaBdgtCompCtrl', function ($scope, $state, $stateParams, DataService, Utils, Sasc) {
   var self = this;
   var base = $scope.base;
   self.glbdgyr = Utils.getCurrentYearFour();
   self.bdgtCmpResults = {};
   self.bdgtCmpData = [];
   self.bdgtCmpGrid = {};

   self.search = function () {
      if (base.criteria.glno) {
         var criteria = {
            glno: base.criteria.glno,
            glyear: base.criteria.yr,
            glbdgyr: self.glbdgyr
         };
         DataService.post('api/gl/asglinquiry/glbdgcmp', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.bdgtCmpResults = data;
               self.loadBdgtCmpData();
            }
         });
      }
   };

   self.loadBdgtCmpData = function () {
      self.bdgtCmpData = [
               { period: base.getMonth((Sasc.glbegfisc + 0) % 12), ptd: self.bdgtCmpResults.ptd1, ptdbdg: self.bdgtCmpResults.ptdbdg1, ptdpct: self.bdgtCmpResults.ptdpct1, ytd: self.bdgtCmpResults.ytd1, ytdbdg: self.bdgtCmpResults.ytdbdg1, ytdpct: self.bdgtCmpResults.ytdpct1 },
               { period: base.getMonth((Sasc.glbegfisc + 1) % 12), ptd: self.bdgtCmpResults.ptd2, ptdbdg: self.bdgtCmpResults.ptdbdg2, ptdpct: self.bdgtCmpResults.ptdpct2, ytd: self.bdgtCmpResults.ytd2, ytdbdg: self.bdgtCmpResults.ytdbdg2, ytdpct: self.bdgtCmpResults.ytdpct2 },
               { period: base.getMonth((Sasc.glbegfisc + 2) % 12), ptd: self.bdgtCmpResults.ptd3, ptdbdg: self.bdgtCmpResults.ptdbdg3, ptdpct: self.bdgtCmpResults.ptdpct3, ytd: self.bdgtCmpResults.ytd3, ytdbdg: self.bdgtCmpResults.ytdbdg3, ytdpct: self.bdgtCmpResults.ytdpct3 },
               { period: base.getMonth((Sasc.glbegfisc + 3) % 12), ptd: self.bdgtCmpResults.ptd4, ptdbdg: self.bdgtCmpResults.ptdbdg4, ptdpct: self.bdgtCmpResults.ptdpct4, ytd: self.bdgtCmpResults.ytd4, ytdbdg: self.bdgtCmpResults.ytdbdg4, ytdpct: self.bdgtCmpResults.ytdpct4 },
               { period: base.getMonth((Sasc.glbegfisc + 4) % 12), ptd: self.bdgtCmpResults.ptd5, ptdbdg: self.bdgtCmpResults.ptdbdg5, ptdpct: self.bdgtCmpResults.ptdpct5, ytd: self.bdgtCmpResults.ytd5, ytdbdg: self.bdgtCmpResults.ytdbdg5, ytdpct: self.bdgtCmpResults.ytdpct5 },
               { period: base.getMonth((Sasc.glbegfisc + 5) % 12), ptd: self.bdgtCmpResults.ptd6, ptdbdg: self.bdgtCmpResults.ptdbdg6, ptdpct: self.bdgtCmpResults.ptdpct6, ytd: self.bdgtCmpResults.ytd6, ytdbdg: self.bdgtCmpResults.ytdbdg6, ytdpct: self.bdgtCmpResults.ytdpct6 },
               { period: base.getMonth((Sasc.glbegfisc + 6) % 12), ptd: self.bdgtCmpResults.ptd7, ptdbdg: self.bdgtCmpResults.ptdbdg7, ptdpct: self.bdgtCmpResults.ptdpct7, ytd: self.bdgtCmpResults.ytd7, ytdbdg: self.bdgtCmpResults.ytdbdg7, ytdpct: self.bdgtCmpResults.ytdpct7 },
               { period: base.getMonth((Sasc.glbegfisc + 7) % 12), ptd: self.bdgtCmpResults.ptd8, ptdbdg: self.bdgtCmpResults.ptdbdg8, ptdpct: self.bdgtCmpResults.ptdpct8, ytd: self.bdgtCmpResults.ytd8, ytdbdg: self.bdgtCmpResults.ytdbdg8, ytdpct: self.bdgtCmpResults.ytdpct8 },
               { period: base.getMonth((Sasc.glbegfisc + 8) % 12), ptd: self.bdgtCmpResults.ptd9, ptdbdg: self.bdgtCmpResults.ptdbdg9, ptdpct: self.bdgtCmpResults.ptdpct9, ytd: self.bdgtCmpResults.ytd9, ytdbdg: self.bdgtCmpResults.ytdbdg9, ytdpct: self.bdgtCmpResults.ytdpct9 },
               { period: base.getMonth((Sasc.glbegfisc + 9) % 12), ptd: self.bdgtCmpResults.ptd10, ptdbdg: self.bdgtCmpResults.ptdbdg10, ptdpct: self.bdgtCmpResults.ptdpct10, ytd: self.bdgtCmpResults.ytd10, ytdbdg: self.bdgtCmpResults.ytdbdg10, ytdpct: self.bdgtCmpResults.ytdpct10 },
               { period: base.getMonth((Sasc.glbegfisc + 10) % 12), ptd: self.bdgtCmpResults.ptd11, ptdbdg: self.bdgtCmpResults.ptdbdg11, ptdpct: self.bdgtCmpResults.ptdpct11, ytd: self.bdgtCmpResults.ytd11, ytdbdg: self.bdgtCmpResults.ytdbdg11, ytdpct: self.bdgtCmpResults.ytdpct12 },
               { period: base.getMonth((Sasc.glbegfisc + 11) % 12), ptd: self.bdgtCmpResults.ptd12, ptdbdg: self.bdgtCmpResults.ptdbdg12, ptdpct: self.bdgtCmpResults.ptdpct12, ytd: self.bdgtCmpResults.ytd12, ytdbdg: self.bdgtCmpResults.ytdbdg12, ytdpct: self.bdgtCmpResults.ytdpct12 }
      ];
   };

   self.search();

});

app.controller('GliaYearCompCtrl', function ($scope, $state, $stateParams, Constants, DataService, Utils, MessageService, Sasc) {
   var self = this;
   var base = $scope.base;
   self.cmpYear = Utils.getCurrentYearFour() - 1;
   self.ptdYear = MessageService.get('global.ptd') + ' ' + self.cmpYear;
   self.ytdYear = MessageService.get('global.ytd') + ' ' + self.cmpYear;

   self.periodBalances = [];
   self.yearCompareGrid = {};
   self.yearCmpResults = {};

   self.loadYearCompareDetails = function () {
      if (base.criteria.glno) {
         var criteria = {
            glno: base.criteria.glno,
            glyear: base.criteria.yr,
            glyrcmp: self.cmpYear
         };
         DataService.post('api/gl/asglinquiry/glyrcmp', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.ptdYear = MessageService.get('global.ptd') + ' ' + self.cmpYear;
               self.ytdYear = MessageService.get('global.ytd') + ' ' + self.cmpYear;
               self.yearCmpResults = data;

               self.loadYearCompareBalances();
            }
         });
      }
   };

   self.loadYearCompareBalances = function () {
      self.periodBalances = [
               {
                  period: base.getMonth((Sasc.glbegfisc + 0) % 12),
                  ptd: self.yearCmpResults.ptd1, ptdcmp: self.yearCmpResults.ptdcmp1, ptdpct: self.yearCmpResults.ptdpct1,
                  ytd: self.yearCmpResults.ytd1, ytdcmp: self.yearCmpResults.ytdcmp1, ytdpct: self.yearCmpResults.ytdpct1
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 1) % 12),
                  ptd: self.yearCmpResults.ptd2, ptdcmp: self.yearCmpResults.ptdcmp2, ptdpct: self.yearCmpResults.ptdpct2,
                  ytd: self.yearCmpResults.ytd2, ytdcmp: self.yearCmpResults.ytdcmp2, ytdpct: self.yearCmpResults.ytdpct2
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 2) % 12),
                  ptd: self.yearCmpResults.ptd3, ptdcmp: self.yearCmpResults.ptdcmp3, ptdpct: self.yearCmpResults.ptdpct3,
                  ytd: self.yearCmpResults.ytd3, ytdcmp: self.yearCmpResults.ytdcmp3, ytdpct: self.yearCmpResults.ytdpct3
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 3) % 12),
                  ptd: self.yearCmpResults.ptd4, ptdcmp: self.yearCmpResults.ptdcmp4, ptdpct: self.yearCmpResults.ptdpct4,
                  ytd: self.yearCmpResults.ytd4, ytdcmp: self.yearCmpResults.ytdcmp4, ytdpct: self.yearCmpResults.ytdpct4
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 4) % 12),
                  ptd: self.yearCmpResults.ptd5, ptdcmp: self.yearCmpResults.ptdcmp5, ptdpct: self.yearCmpResults.ptdpct5,
                  ytd: self.yearCmpResults.ytd5, ytdcmp: self.yearCmpResults.ytdcmp5, ytdpct: self.yearCmpResults.ytdpct5
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 5) % 12),
                  ptd: self.yearCmpResults.ptd6, ptdcmp: self.yearCmpResults.ptdcmp6, ptdpct: self.yearCmpResults.ptdpct6,
                  ytd: self.yearCmpResults.ytd6, ytdcmp: self.yearCmpResults.ytdcmp6, ytdpct: self.yearCmpResults.ytdpct6
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 6) % 12),
                  ptd: self.yearCmpResults.ptd7, ptdcmp: self.yearCmpResults.ptdcmp7, ptdpct: self.yearCmpResults.ptdpct7,
                  ytd: self.yearCmpResults.ytd7, ytdcmp: self.yearCmpResults.ytdcmp7, ytdpct: self.yearCmpResults.ytdpct7
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 7) % 12),
                  ptd: self.yearCmpResults.ptd8, ptdcmp: self.yearCmpResults.ptdcmp8, ptdpct: self.yearCmpResults.ptdpct8,
                  ytd: self.yearCmpResults.ytd8, ytdcmp: self.yearCmpResults.ytdcmp8, ytdpct: self.yearCmpResults.ytdpct8
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 8) % 12),
                  ptd: self.yearCmpResults.ptd9, ptdcmp: self.yearCmpResults.ptdcmp9, ptdpct: self.yearCmpResults.ptdpct9,
                  ytd: self.yearCmpResults.ytd9, ytdcmp: self.yearCmpResults.ytdcmp9, ytdpct: self.yearCmpResults.ytdpct9
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 9) % 12),
                  ptd: self.yearCmpResults.ptd10, ptdcmp: self.yearCmpResults.ptdcmp10, ptdpct: self.yearCmpResults.ptdpct10,
                  ytd: self.yearCmpResults.ytd10, ytdcmp: self.yearCmpResults.ytdcmp10, ytdpct: self.yearCmpResults.ytdpct10
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 10) % 12),
                  ptd: self.yearCmpResults.ptd11, ptdcmp: self.yearCmpResults.ptdcmp11, ptdpct: self.yearCmpResults.ptdpct11,
                  ytd: self.yearCmpResults.ytd11, ytdcmp: self.yearCmpResults.ytdcmp11, ytdpct: self.yearCmpResults.ytdpct11
               },
               {
                  period: base.getMonth((Sasc.glbegfisc + 11) % 12),
                  ptd: self.yearCmpResults.ptd12, ptdcmp: self.yearCmpResults.ptdcmp12, ptdpct: self.yearCmpResults.ptdpct12,
                  ytd: self.yearCmpResults.ytd12, ytdcmp: self.yearCmpResults.ytdcmp12, ytdpct: self.yearCmpResults.ytdpct12
               }
      ];
   };

   self.search = function () {
      self.loadYearCompareDetails();
   };

   self.loadYearCompareDetails();

});

app.controller('GliaCustomCtrl', function ($scope, $state, $stateParams, Constants, DataService) {
   var self = this;
   var base = $scope.base;
   self.glsa = {};

   self.loadGlsaRecord = function () {
      DataService.get('api/gl/glsa/getbyrowid/' + base.glsaRowID, { busy: true }, function (data) {
         if (data) {
            self.glsa = data;
         }
      });
   };
   if (base.glsaRowID) {
      self.loadGlsaRecord();
   }
});