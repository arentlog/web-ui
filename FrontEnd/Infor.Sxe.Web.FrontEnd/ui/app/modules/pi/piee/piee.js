'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('pi', 'piee', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('pi', 'piee');

   $stateProvider.state('piee.detail', {
      url: '/detail',
      params: { pieeRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piee/create.json');
            },
            controller: 'PieeDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('piee.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piee/create.json');
            },
            controller: 'PieeCreateCtrl as dtl'
         }
      }
   });

   $stateProvider.state('piee.updatestatuscode', {
      url: '/update-status-code',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piee/updatestatuscode.json');
            },
            controller: 'PieeUpdateStatusCodeCtrl as usc'
         }
      }
   });

   $stateProvider.state('piee.errorandholdcode', {
      url: '/error-and-hold-code',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piee/errorandholdcodes.json');
            },
            controller: 'PieeErrorAndHoldCodeCtrl as ehc'
         }
      }
   });

   $stateProvider.state('piee.additionalDetails', {
      url: '/additional-details',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pi/piee/additionaldetails.json');
            },
            controller: 'PieeAdditionalDetailCtrl as ad'
         }
      }
   });
});

app.controller('PieeBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {
      dispdelete: true,
      disperror: true,
      disphold: true,
      dispignore: true,
      dispnewprod: false,
      disppricetypefl: true,
      dispprodcatfl: true,
      dispprodlinefl: true,
      dispslgroupfl: true,
      dispupdate: true,
      dispvendnofl: true,
      dispwhsefl: true,
      recordlimit: 50
   };

   self.isMaster = function () {
      return $state.is('piee.master');
   };

   self.includesMaster = function () {
      return $state.includes('piee.master');
   };

   self.isDetail = function () {
      return $state.is('piee.detail');
   };

   self.includesDetail = function () {
      return $state.includes('piee.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/sl/asslsetup/sleegetproductlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.sleeprodlistresults;
      });
   };
});

app.controller('PieeSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('piee.master');
      }

      base.search();
   };
});

app.controller('PieeMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { pieeRecord: record });
   };

   self.delete = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      DataService.post('api/sl/asslsetup/sleeproductlistdelete', { data: selectedRecords, busy: true }, function (data) {
         $scope.base.dataset = data;
         base.search();
      });
   };

   self.create = function () {
      $state.go('piee.create');
   };

   self.updateStatusCode = function () {
      $state.go('piee.updatestatuscode');
   };

   self.errorAndHoldCode = function () {
      $state.go('piee.errorandholdcode');
   };

   self.additionalDetails = function () {
      $state.go('^.additionalDetails');
   };
});

app.controller('PieeDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.fullProduct = {};
   self.tempfullProduct = {};
   // Retrive product full data
   if ($stateParams.pieeRecord) {
      DataService.post('api/sl/asslsetup/sleeproductfullretrieve', { data: $stateParams.pieeRecord, busy: true}, function (data) {
         self.fullProduct = data;
         self.tempfullProduct = angular.copy(data);
      });
   }

   self.productReset = function () {
      self.fullProduct = angular.copy(self.tempfullProduct);
   };

   self.productLookupChanged = function () {

      var inputData = {
         sleeproductfull: self.fullProduct, cFieldName: 'prod'
      };

      DataService.post('api/sl/asslsetup/sleeproductaddfieldchange', {
         data: inputData, busy: true
      }, function (data) {
         self.fullProduct = data;
      });
   };

   // Save
   self.productAddUpdate = function () {
      var sleeProductFullUpdateRequestAPI = {
         sleeprodlistcriteria: base.criteria, sleeprodlistresults: $stateParams.pieeRecord, sleeproductfull: self.fullProduct
      };

      DataService.post('api/sl/asslsetup/sleeproductfullupdate', {
         data: sleeProductFullUpdateRequestAPI, busy: true
      }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', {
            refreshSearch: true
         }, {
            reload: '^.master'
         });
      });
   };
});

app.controller('PieeCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.tempfullProduct = {};

   // slee product prepare
   DataService.get('api/sl/asslsetup/sleeproductaddprepare', { busy: true }, function (data) {
      self.fullProduct = data;
      self.fullProduct.imptype = base.criteria.imptype;
      self.fullProduct.slupdtno = base.criteria.slupdtno;
      self.tempfullProduct = angular.copy(self.fullProduct);
   });

   //Reset: TO DO: need to verify the issue
   ////self.productReset = function () {
   ////   self.fullProduct = angular.copy(self.tempfullProduct);
   ////};

   self.productLookupChanged = function () {

      var inputData = { sleeproductfull: self.fullProduct, cFieldName: 'prod' };

      DataService.post('api/sl/asslsetup/sleeproductaddfieldchange', { data: inputData, busy: true }, function (data) {
         self.fullProduct = data;
      });
   };

   // Save
   self.productAddUpdate = function () {
      var sleeProductAddUpdateRequestAPI = { sleeprodlistcriteria: base.criteria, sleeproductfull: self.fullProduct };

      DataService.post('api/sl/asslsetup/sleeproductaddupdate', { data: sleeProductAddUpdateRequestAPI, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };
});

app.controller('PieeUpdateStatusCodeCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   //Default values
   self.changeStatusCode = {};
   self.changeStatusCode.statuscdnew = 'u';
   self.changeStatusCode.imptype = base.criteria.imptype;
   self.changeStatusCode.slupdtno = base.criteria.slupdtno;

   self.tempchangeStatusCode = {};
   self.tempchangeStatusCode = angular.copy(self.changeStatusCode);

   //Reset
   self.changeStatusCodeReset = function () {
      self.changeStatusCode = angular.copy(self.tempchangeStatusCode);
   };

   self.changeStatusCodes = function () {
      DataService.post('api/sl/asslsetup/sleechangestatuscode', { data: self.changeStatusCode, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };
});

app.controller('PieeErrorAndHoldCodeCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;

   var selectedRecord = GridService.getSelectedRecord(base.grid);

   DataService.post('api/sl/asslsetup/sleeproducterrorholdcodes', { data: selectedRecord, busy: true }, function (data) {
      self.dataset = data;
   });

});

app.controller('PieeAdditionalDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;
   var selectedRecord = GridService.getSelectedRecord(base.grid);

   if (selectedRecord) {
       var params = {
           cImptype: selectedRecord.imptype,
           lStatusType: selectedRecord.statustype,
           cSLUpdtNo: selectedRecord.slupdtno,
           cProd: selectedRecord.prod,
           cWhse: selectedRecord.whse
       };

       DataService.get('api/sl/asslsetup/sledgetproddetail', { params: params, busy: true }, function (data) {
         self.sledProductDetail = data;
      });
   }
});
