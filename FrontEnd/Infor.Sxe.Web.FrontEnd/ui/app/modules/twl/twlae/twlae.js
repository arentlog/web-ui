'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlae',
      dataPath: 'api/twl/empmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/empmst/gettwlemployees',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlae/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'twl/twlae/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/twl/astwlsetup/empmstcopy',
      copySubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.employee.id', value: 'empNum' }
      ],
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.employee.id', value: 'empNum' }
      ],
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: null
   });

   $stateProvider.state('twlae.master.empsecurity', {
      url: '/security',
      params: {
         twlae: null
      },
      views: {
         masterExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlae/empsecurity.json');
            },
            controller: 'TwlaeEmpSecurityMstCtrl as mstempsecurity'
         }
      }
   });

   $stateProvider.state('twlae.detail.empinqtransdtl', {
      url: '/inquiry-transaction-detail',
      params: {
         twlae: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlae/empinqtransdtl.json');
            },
            controller: 'TwlaeEmpInqTransDtlCtrl as dtlinqtransdtl'
         }
      }
   });

   $stateProvider.state('twlae.detail.empinqtranssum', {
      url: '/inquiry-transaction-summary',
      params: {
         twlae: null
      },
      views: {
         detailExtendView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlae/empinqtranssum.json');
            },
            controller: 'TwlaeEmpInqTransSumCtrl as dtlinqtranssum'
         }
      }
   });
});

app.service('TwlaeService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.refreshSearch = false;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };

      self.isMaster = function () {
         return $state.is('twlae.master');
      };

      self.isDetailOrEdit = function () {
         return $state.is('twlae.detail') || $state.is('twlae.detail.edit');
      };
   };

   this.extendMasterController = function (self, base) {
      self.showSetupSecurity = function () {
         $state.go('twlae.master.empsecurity');
      };
   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.coNum = base.criteria.CoNum;
         base.criteria.whNum = base.criteria.WhNum;
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      self.customSubmit = function () {
         var empmstToCopy = stateParams.object;

         request.coNumFrom = empmstToCopy.coNum;
         request.whNumFrom = empmstToCopy.whNum;
         request.empNumFrom = empmstToCopy.empNum;
         request.empNumTo = self.empNumTo;
         request.empNumPasswordTo = self.empNumPasswordTo;

         self.submit();
      };
   };

   this.extendCreateController = function (self, base, twlae) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlae.coNum = base.criteriaUsed.coNum;
      twlae.whNum = base.criteriaUsed.whNum;

      twlae.rowStatus = true;
      twlae.onlineLogonfl = true;
      twlae.empNum = '';
      twlae.empName = '';
      twlae.empTitle = '';
      twlae.deptNum = 0;
      twlae.sfhNum = 0;
      twlae.password = '';
      twlae.empMst = 'N';
      twlae.cycNum = 'N';
      twlae.utilMst = 'N';
      twlae.rfLoginCnt = 2;
   };

   this.extendDetailController = function (self, base, twlae) {
      base.isGdprRestricted = false;
      self.whZones = [];
      self.rushWhZoneArray = [];
      self.allWhseZones = false;

      DataService.post('api/twl/whzone/gettwlzones', { data: { coNum: base.criteria.coNum, whNum: base.criteria.whNum }, busy: true }, function (data) {
         if (data) {
            data.forEach(function (zone) {
               self.whZones.push({ label: (zone.whZone + '-' + zone.zoneDesc), value: zone.whZone });
            });
         }
      });

      twlae.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (twlae.empName === 'GDPR Restricted Data' || twlae.empName === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
            base.isGdprRestricted = true;
         }

         if (twlae.rushWhZone === '*') {
            self.allWhseZones = true;
         } else {
            self.allWhseZones = false;
            self.rushWhZoneArray = twlae.rushWhZone.split(',');
         }
      });

      self.setRFAdmin = function () {
         if (twlae.rfAdminfl === true) {
            MessageService.yesNo('global.question', 'question.do.you.want.to.make.rf.admin',
               function () {
                  twlae.rfInventory = true;
                  twlae.rfdelorddtlfl = true;
                  twlae.inventoryControl = true;
                  twlae.rfLogon = true;
                  twlae.rfMove = true;
                  twlae.rfnotesfl = true;
                  twlae.rfPack = true;
                  twlae.rfPick = true;
                  twlae.rfPicksort = true;
                  twlae.rfPutaway = true;
                  twlae.rfReceipt = true;
                  twlae.rfStkMove = true;
                  twlae.rfShip = true;
                  twlae.zonePickFl = true;
                  twlae.rfStkAdj = true;
               },
               function () {
                  twlae.rfAdminfl = false;
               });
         }
      };

      self.changeAllWhseZones = function () {
         if (self.allWhseZones === true) {
            twlae.rushWhZone = '*';
         } else {
            self.changeRushWhZoneArray(); // Resets to previous array
         }
      };

      self.changeRushWhZoneArray = function () {
         twlae.rushWhZone = '';
         self.rushWhZoneArray.forEach(function (zone) {
            if (twlae.rushWhZone.length) {
               twlae.rushWhZone = twlae.rushWhZone + ',';
            }
            twlae.rushWhZone = twlae.rushWhZone + zone;
         });
      };

      self.validateRfLogins = function () {
         if (twlae.rfLoginCnt > 4 ||
             twlae.rfLoginCnt < 1) {
            MessageService.error('Error', 'global.twl.rf.numlogins');
            twlae.rfLoginCnt = 2;
         }
      };

      self.showEmpInqTransDtl = function () {
         $state.go('twlae.detail.empinqtransdtl');
      };

      self.showEmpInqTransSum = function () {
         $state.go('twlae.detail.empinqtranssum');
      };
   };
});

//Employee Security
app.controller('TwlaeEmpSecurityMstCtrl', function ($scope, $state, $stateParams, DataService, MessageService, UserService) {
   var self = this;
   var base = $scope.base;

   if (!base.criteriaUsed.coNum) {
      base.criteriaUsed.coNum = base.criteria.coNum;
   }

   if (!base.criteriaUsed.whNum) {
      base.criteriaUsed.whNum = base.criteria.whNum;
   }

   self.coNum = base.criteriaUsed.coNum;
   self.whNum = base.criteriaUsed.whNum;
   self.empNum = base.empNum;

   self.isEmployeeSecurity = function () {
      return $state.is('twlae.master.empsecurity');
   };

   self.returnToMaster = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   self.empSecurityApiCall = function () {
      DataService.get('api/twl/wlpasswd/gettwlsecurity', {
         data: {},
         busy: true
      }, function (data) {
         self.pwmaxdays = data.pwmaxdays;
         self.pwmindays = data.pwmindays;
         self.pwmaxlength = data.pwmaxlength;
         self.pwminlength = data.pwminlength;
         self.pwminnumeric = data.pwminnumeric;
         self.pwminspecial = data.pwminspecial;
         self.pwminprev = data.pwminprev;
         self.pwminalpha = data.pwminalpha;
         self.empNum = data.empNum;
         self.transDate = data.transDate;
      });
   };

   self.customSubmit = function () {
      DataService.post('api/twl/astwladmin/savesecurity', {
         data: {
            pwmaxdays: self.pwmaxdays,
            pwmindays: self.pwmindays,
            pwmaxlength: self.pwmaxlength,
            pwminlength: self.pwminlength,
            pwminnumeric: self.pwminnumeric,
            pwminspecial: self.pwminspecial,
            pwminprev: self.pwminprev,
            pwminalpha: self.pwminalpha,
            empNum: UserService.getTwlUserId()
         },
         busy: true
      }, function () {
         MessageService.info('global.information', 'message.saved.successfully');
      });
   };

   //If the user hits refresh twlae will be null, go back to master window
   if (!base) {
      self.returnToMaster();
   } else {
      self.empSecurityApiCall();
   }
});

//Inquiry - Employee Trans Detail
app.controller('TwlaeEmpInqTransDtlCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlae = $scope.dtl.twlae;

   self.coNum = twlae.coNum;
   self.whNum = twlae.whNum;
   self.empNum = twlae.empNum;
   self.rangeType = 'day';

   self.isItemInqEmpDtl = function () {
      return $state.is('twlae.detail.empinqtransdtl');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   self.empInqTransDtlApiCall = function () {
      DataService.post('api/twl/astwlinquiry/getemptransdetail', {
         data: {
            coNum: twlae.coNum,
            whNum: twlae.whNum,
            empNum: twlae.empNum,
            rangeType: self.rangeType
         },
         busy: true
      }, function (data) {
         self.dataset = data;
      });
   };

   //If the user hits refresh twlae will be null, go back to detail window
   if (!twlae) {
      self.returnToDetail();
   } else {
      self.empInqTransDtlApiCall();
   }
});

//Inquiry - Employee Trans Summary
app.controller('TwlaeEmpInqTransSumCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   var twlae = $scope.dtl.twlae;

   self.coNum = twlae.coNum;
   self.whNum = twlae.whNum;
   self.empNum = twlae.empNum;
   self.rangeType = 'day';

   self.isItemInqEmpSum = function () {
      return $state.is('twlae.detail.empinqtranssum');
   };

   self.returnToDetail = function () {
      base.refreshSearch = true;
      $state.go('^');
   };

   self.empInqTransSumApiCall = function () {
      DataService.post('api/twl/astwlinquiry/getemptranssummary', {
         data: {
            coNum: twlae.coNum,
            whNum: twlae.whNum,
            empNum: twlae.empNum,
            rangeType: self.rangeType
         },
         busy: true
      }, function (data) {
         self.dataset = data.emptranssummary;
         self.totalTransactions = data.iTotalTransactions;
      });
   };

   //If the user hits refresh twlae will be null, go back to detail window
   if (!twlae) {
      self.returnToDetail();
   } else {
      self.empInqTransSumApiCall();
   }
});