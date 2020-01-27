'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ic', 'icim', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icim');

   $stateProvider.state('icim.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icim/detail.json');
            },
            controller: 'IcimDetailCtrl as dtl'
         }
      }
   });
});

app.controller('IcimBaseCtrl', function ($state, ConfigService, DataService, Sasoo) {
   var self = this;
   self.criteria = {};
   self.looseInventoryRecordTemp = [];
   self.icimbundlescontrol = {
      columnhidden1: true,
      columnhidden2: true,
      columnhidden3: true,
      columnhidden4: true,
      columnhidden5: true,
      columnhidden6: true,
      columnhidden7: true,
      columnhidden8: true,
      columnhidden9: true,
      columnhidden10: true,
      columnhidden11: true,
      columnhidden12: true,
      columnhidden13: true,
      columnhidden14: true,
      columnhidden15: true,
      columnhidden16: true,
      columnhidden17: true,
      columnhidden18: true,
      columnhidden19: true,
      columnhidden20: true
   };
   self.selectedBundle = {};
   self.icseb = {};

   self.isMaster = function () {
      return $state.is('icim.master');
   };

   self.includesMaster = function () {
      return $state.includes('icim.master');
   };

   self.isDetail = function () {
      return $state.is('icim.detail');
   };

   self.includesDetail = function () {
      return $state.includes('icim.detail');
   };

   self.initCriteria = function () {
      self.criteria = {
         prod: '',
         whse: Sasoo.whse,
         status: 'all'
      };
   };

   self.search = function () {
      var bundleCriteria = {
         cProd: self.criteria.prod,
         cWhse: self.criteria.whse,
         cBundleStatusCd: (self.criteria.status === 'all') ? '' : self.criteria.status
      };

      DataService.post('api/ic/asicinquiry/icimbundlesload', { data: bundleCriteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data.icimbundles;
            self.icimbundlescontrol = data.icimbundlescontrol;

            //Format Loose Inventory record to be in sync with GUI application
            self.formatLooseInventoryRecord();
         }
      });
   };

   self.formatLooseInventoryRecord = function () {
      var looseInventoryRecord = self.dataset.filter(function (a) {
         return a.bundleid.trim() === 'LOOSE INVENTORY';
      });

      self.dataset.forEach(function (record) {

         record.totbf = record.totbf === 0 ? null : record.totbf;
         record.totlf = record.totlf === 0 ? null : record.totlf;
         record.qty1 = record.qty1 === 0 ? null : record.qty1;
         record.qty2 = record.qty2 === 0 ? null : record.qty2;
         record.qty3 = record.qty3 === 0 ? null : record.qty3;
         record.qty4 = record.qty4 === 0 ? null : record.qty4;
         record.qty5 = record.qty5 === 0 ? null : record.qty5;
         record.qty6 = record.qty6 === 0 ? null : record.qty6;
         record.qty7 = record.qty7 === 0 ? null : record.qty7;
         record.qty8 = record.qty8 === 0 ? null : record.qty8;
         record.qty9 = record.qty9 === 0 ? null : record.qty9;
         record.qty10 = record.qty10 === 0 ? null : record.qty10;
         record.qty11 = record.qty11 === 0 ? null : record.qty11;
         record.qty12 = record.qty12 === 0 ? null : record.qty12;
         record.qty13 = record.qty13 === 0 ? null : record.qty13;
         record.qty14 = record.qty14 === 0 ? null : record.qty14;
         record.qty15 = record.qty15 === 0 ? null : record.qty15;
         record.qty14 = record.qty16 === 0 ? null : record.qty16;
         record.qty17 = record.qty17 === 0 ? null : record.qty17;
         record.qty18 = record.qty18 === 0 ? null : record.qty18;
         record.qty19 = record.qty19 === 0 ? null : record.qty19;
         record.qty20 = record.qty20 === 0 ? null : record.qty20;

         self.looseInventoryRecordTemp.push(record);
      });

      self.dataset = [];
      self.dataset = self.looseInventoryRecordTemp;
      self.looseInventoryRecordTemp = [];
   };

   self.initCriteria();
});

app.controller('IcimSearchCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   self.clear = function () {
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('icim.master');
      }

      base.search();
   };
});

app.controller('IcimMasterCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;

   self.drilldown = function (e, args) {
      base.selectedBundle = args[0].item;
      if (base.selectedBundle && base.selectedBundle.bundleid.trim() !== 'LOOSE INVENTORY') {
         $state.go('^.detail', { id: base.selectedBundle.bundleid });
      }
   };

});

app.controller('IcimDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.subTitle = MessageService.get('global.bundle.id') + ': ' + base.selectedBundle.bundleid + ' | ' +
                   MessageService.get('global.status') + ': ' + base.selectedBundle.bundlestatus;

});

app.controller('IcimComponentsCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.components = [];

   self.loadComponentsData = function () {
      DataService.post('api/ic/asicinquiry/icimcomponentsload', { data: base.selectedBundle, busy: true }, function (data) {
         if (data) {
            self.components = data;

            var icsebParams = {
               whse: base.selectedBundle.whse,
               prod: base.selectedBundle.product,
               bundleid: base.selectedBundle.bundleid
            };

            DataService.get('api/ic/icseb/getbypk', { params: icsebParams, busy: true }, function (data) {
               if (data) {
                  base.icseb = data;
               }
            });
         }
      });
   };

   self.statusFormatter = function (row, cell, value) {
      switch (value.toUpperCase()) {
         case 'A':
            return MessageService.get('global.active');
         case 'I':
            return MessageService.get('global.inactive');
         case 'L':
            return MessageService.get('global.labor');
         case 'S':
            return MessageService.get('global.supersede');
         case 'D':
            return MessageService.get('global.delete');
      }
   };

   self.loadComponentsData();

});

app.controller('IcimCustomCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   self.icseb = base.icseb;
});