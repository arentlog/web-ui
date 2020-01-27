'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('po', 'poitc', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('po', 'poitc');

   $stateProvider.state('poitc.detail', {
      url: '/detail',
      params: {
         item: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poitc/detail.json');
            },
            controller: 'PoitcDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('poitc.detail.edit', {
      url: '/edit'
   });

   $stateProvider.state('poitc.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('po/poitc/detail.json');
            },
            controller: 'PoitcCreateCtrl as dtl'
         }
      }
   });
});

app.controller('PoitcBaseCtrl', function ($state, $translate, ConfigService, DataService, Sasoo) { //as base
   var self = this;
   self.criteria = {};

   //state methods:
   self.isMaster = function () {
      return $state.is('poitc.master');
   };

   self.includesMaster = function () {
      return $state.includes('poitc.master');
   };

   self.isDetail = function () {
      return $state.is('poitc.detail');
   };

   self.includesDetail = function () {
      return $state.includes('poitc.detail');
   };

   self.search = function () {
      DataService.post('api/po/aspoinquiry/poitctallyload', { data: self.criteria, busy: true }, function (data) {
         self.header = data.poitcheader;
         self.dataset = data.poitccomponent;
      });
   };

   self.prodOrMemoProd = function () {
      if (self.header && self.header.memomixfl) {
         return $translate.instant('global.memo.tally.component');
      } else {
         return $translate.instant('global.product');
      }
   };

   self.calculate = function () {
      DataService.post('api/po/aspoinquiry/poitctallycalctotals', { data: { poitccomponent: self.dataset, poitcheader: self.header }, busy: true }, function (data) {
         self.dataset = data.poitccomponent;
         self.header = data.poitcheader;
      });
   };

   self.toolbarEnabled = function () {
      return self.header && (self.header.memomixfl || self.header.randommixfl);
   };

   self.initCriteria = function () {
      self.criteria.whse = Sasoo.whse;
   };
}); //end base

app.controller('PoitcSearchCtrl', function ($scope, $state, DataService, Utils) { //as srch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   base.initCriteria();

   self.clear = function () {
      Utils.clearObject(criteria);
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('poitc.master');
      }
      base.search();
   };
}); //end srch

app.controller('PoitcMasterCtrl', function ($scope, $state, DataService, GridService) { //as mst
   var self = this;
   var base = $scope.base;

   self.filter = function () {
      DataService.post('api/po/aspoinquiry/poitctallyload', { data: base.header, busy: true }, function (data) {
         base.header = data.poitcheader;
         base.dataset = data.poitccomponent;
      });
   };

   self.calculateNewMix = function () {
      DataService.post('api/po/aspoinquiry/poitctallyload', { data: base.header, busy: true }, function (data) {
         base.dataset = data.poitccomponent;
      });
   };

   self.unitChange = function () {
      DataService.post('api/po/aspoinquiry/poitctallyunitchange', { data: { poitccomponent: base.dataset, poitcheader: base.header }, busy: true }, function (data) {
         base.header = data;
      });
   };

   self.newMixAllowed = function () {
      return base.header && (base.header.ordersuf === 0 && base.header.recalcfl && !base.header.bundlefl);
   };

   self.delete = function () {
      var records = GridService.getSelectedRecords(base.grid);
      records.forEach(function (row) {
         base.dataset.splice(base.dataset.indexOf(row), 1);
      });
      base.calculate();
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', {
         item: record
      });
   };

   self.qtyChange = function (e, args) {
      DataService.post('api/po/aspoinquiry/poitccomponentfieldleave', { data: { poitccomponent: base.dataset[args.row], poitcheader: base.header, cField: 'qtyord' }, busy: true }, function (data) {
         base.dataset[args.row] = data;
         base.calculate();
      });
   };
}); //end mst

app.controller('PoitcDetailCtrl', function ($scope, $state, $stateParams, DataService) { //as dtl
   var self = this;
   var base = $scope.base;
   if ($stateParams.item) {
      self.component = $stateParams.item;
   }
   var item = angular.copy(self.component);

   self.componentChanged = function () {
      DataService.post('api/po/aspoinquiry/poitccomponentfieldleave', { data: { poitccomponent: self.component, poitcheader: base.header, cField: 'shipprod' }, busy: true }, function (data) {
         self.component = data;
      });
   };

   self.submit = function () {
      DataService.post('api/po/aspoinquiry/poitccomponentok', { data: { poitccomponent: self.component, poitcheader: base.header }, busy: true }, function (data) {
         base.header = data.poitcheader;
         base.dataset[base.dataset.indexOf(item)] = data.poitccomponent;
         base.calculate();
         $state.go('^.^.master', null, { reload: '^.^.master' });
      });
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.delete = function () {
      base.dataset.splice(base.dataset.indexOf(item), 1);
      base.calculate();
   };
}); //end dtl

app.controller('PoitcCreateCtrl', function ($scope, $state, DataService) { //as dtl
   var self = this;
   var base = $scope.base;
   self.component = {
      statustype: 'A',
      compseqno: base.dataset.length + 1,
      shipprod: '',
      shipprodhidden: base.header.memomixfl,
      qtyavailhidden: base.header.memomixfl,
      lengthenabled: base.header.memomixfl,
      qtyord: 1,
      length: 1
   };

   self.componentChanged = function () {
      DataService.post('api/po/aspoinquiry/poitccomponentfieldleave', { data: { poitccomponent: self.component, poitcheader: base.header, cField: 'shipprod' }, busy: true }, function (data) {
         self.component = data;
      });
   };

   self.submit = function () {
      DataService.post('api/po/aspoinquiry/poitccomponentok', { data: { poitccomponent: self.component, poitcheader: base.header }, busy: true }, function (data) {
         base.header = data.poitcheader;
         base.dataset.push(data.poitccomponent);
         base.calculate();
         $state.go('^.master', null, { reload: '^.master' });
      });
   };

   self.cancel = function () {
      $state.go('^.master', null, { reload: '^.master' });
   };
}); //end create as dtl