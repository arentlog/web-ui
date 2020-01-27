'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('oe', 'oeec', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('oe', 'oeec');

   $stateProvider.state('oeec.detail', {
      url: '/detail',
      params: { oeecRecord: null, oeecdetail: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('oe/oeec/detail.json');
            },
            controller: 'OeecDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('oeec.detail.edit', {
      url: '/edit'
   });
});

app.controller('OeecBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {};
   self.ordernox = '';

   self.isMaster = function () {
      return $state.is('oeec.master');
   };

   self.includesMaster = function () {
      return $state.includes('oeec.master');
   };

   self.isDetail = function () {
      return $state.is('oeec.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/oe/asoeentry/oeecloadlines', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;

         //TODO: Need to figure out issue with lookup not loading ordernosuf; hard-coded for time being
         self.criteria.ordersuf = (self.criteria.ordersuf === null) ? "00" : self.criteria.ordersuf;

         //TODO: SI Review -- To refactor the SI Call to get the customer name and number in single SI Call
         var params = {
            orderno: self.criteria.orderno,
            ordersuf: self.criteria.ordersuf
         };
         DataService.get('api/oe/oeeh/getbypk', { params: params, busy: true }, function (data) {
            self.criteria.custno = data.custno;

            var params = {
               custno: self.criteria.custno
            };
            DataService.get('api/ar/arsc/getbypk', { params: params, busy: true }, function (data) {
               self.criteria.custname = data.name;
            });
         });
      });
   };
});

app.controller('OeecSearchCtrl', function ($scope, $state, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
       Utils.clearObject(criteria);
       base.ordernox = '';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('oeec.master');
      }

      if (base.ordernox) {
         var orderDetails = base.ordernox.split('-');
         criteria.orderno = orderDetails[0];
         criteria.ordersuf = orderDetails[1];
         base.search();
      }
   };
});

app.controller('OeecMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { oeecdetail: record });
   };
  
});

app.controller('OeecDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, Constants, MessageService) {
   var self = this;
   var base = $scope.base;
   self.oeecdetail = $stateParams.oeecdetail;
   $scope.oeecdetail = self.oeecdetail;
   self.unpaid = $translate.instant('global.unpaid');
   //Reset Record
   if (self.oeecdetail) {
      self.subTitle = $translate.instant('global.order.number') + ': ' + base.ordernox + Constants.SUB_TITLE_SEPARATOR + $translate.instant('global.line.number') + ': ' + self.oeecdetail.lineno;
   }

   self.updateRebate = function () {
      self.oeecdetail.postrebcst = self.oeecdetail.commcost;
   };

   self.reset = function () {
      self.oeecdetail = $scope.oeecdetail;
   };

   self.cancel = function () {
      self.onNavigationState();
   };

   self.onNavigationState = function () {
      $state.go('^.master');
   };

   self.update = function () {
      DataService.post('api/oe/asoeentry/oeecupdatelines', { data: $scope.dtl.oeecdetail }, function () {
         MessageService.info('global.save', 'message.save.operation.completed.successfully');
         if (base.dataset) {
            base.dataset.forEach(function (record) {
               if (record.lineno === $scope.dtl.oeecdetail.lineno) {                 
                  record.commcost = $scope.dtl.oeecdetail.commcost;
                  record.slsrepout = $scope.dtl.oeecdetail.slsrepout;
                  record.slsrepin = $scope.dtl.oeecdetail.slsrepin;
                  record.commtype = $scope.dtl.oeecdetail.commtype;
                  record.commmanfl = $scope.dtl.oeecdetail.commmanfl;
                  record.commamtout = $scope.dtl.oeecdetail.commamtout;
                  record.commamtin = $scope.dtl.oeecdetail.commamtin;
                  record.commpaidfl = $scope.dtl.oeecdetail.commpaidfl;
                  record.commpaidinfl = $scope.dtl.oeecdetail.commpaidinfl;                  
                  var currentIndex = base.dataset.indexOf(record);
                  base.grid.updateRow(currentIndex);
               }
            });
         }
         self.onNavigationState();
      });
   };
});