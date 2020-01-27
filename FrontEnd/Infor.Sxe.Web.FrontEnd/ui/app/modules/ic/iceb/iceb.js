'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'iceb', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'iceb');

   $stateProvider.state('iceb.addbinlocation', {
      url: '/add-bin-location',
      params: { prod: null, whse: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceb/add-bin-location.json');
            },
            controller: 'IcebAddBinLocationCtrl as abl'
         }
      }
   });

   $stateProvider.state('iceb.detail', {
      url: '/detail?prod&whse',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/iceb/detail.json');
            },
            controller: 'IcebDetailCtrl as dtl'
         }
      }
   });
});

app.controller('IcebBaseCtrl', function ($state, DataService, ConfigService) {
   var self = this;
   self.criteria = {};
   self.criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
   self.isMaster = function () {
      return $state.is('iceb.master');
   };

   self.includesMaster = function () {
      return $state.includes('iceb.master');
   };

   self.isDetail = function () {
      return $state.is('iceb.detail');
   };

   self.includesDetail = function () {
      return $state.includes('iceb.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/ic/asicentry/icebbuildprodlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };
});

app.controller('IcebSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('iceb.master');
      }

      base.search();
   };
});

app.controller('IcebMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   self.drilldown = function (e, args) {
      var record = args[0].item;
      base.selectedRow = args[0].row;
      $state.go('^.detail', { prod: record.prod, whse: base.criteria.whse });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('IcebDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, UserService, ModalService, Utils) {
   var self = this;
   var base = $scope.base;
   self.Iceb = $stateParams.Icebrecord;
   self.isBinLocReadOnly = true;
   self.isSaveEnabled = false;
   self.binLocsCount = 0;
   self.binLocsgrid = [];
   self.icsw = {};
   // Get icsw record
   var params = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      fillmode: true
   };
   self.icsw = DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true });

   // Get additional bin locations
   params = {
      prod: $stateParams.prod,
      whse: $stateParams.whse
   };
   // self.binLocs = DataService.getList('api/ic/icswb/listbywhse', { params: params, busy: true });

   DataService.get('api/ic/icswb/listbywhse', { params: params, busy: true }, function (data) {
      if (data) {
         self.binLocs = data;
         if (!Number(self.binLocsCount) === 0)
            self.binLocsCount = self.binLocs.length;
         //self.isBinLocReadOnly = true;
      }
   });

   // New row requested
   self.newRow = function () {
      ModalService.showModal('ic/iceb/add-bin-location.json', 'IcebAddBinLocationCtrl as ablc', $scope, function (modal) {
         self.addAdditionalBinLocationModal = modal;
      });
   };

   self.onNavigationBack = function () {
      //$state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      self.onNavigationState();
   };

   self.onDeleteBin = function () {
      var rowIds = GridService.getSelectedRowIds(self.binLocsgrid, 'rowID');
      if (rowIds.length > 0) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            DataService.delete('api/ic/icswb/deletelistbyrowids', { data: rowIds, busy: true }, function () {

               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               var params = {
                  whse: self.icsw.whse,
                  prod: self.icsw.prod
               };

               //Load Grid
               DataService.get('api/ic/icswb/listbywhse', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.binLocs = data;
                     //self.isBinLocReadOnly = true;
                  }
               });
            });
         });
      }
   };

   //bin location cell changed
   self.onBinLocChanged = function (e, args) {
      if (args && args.value !== args.oldValue) {
         var record = args.rowData;
         if (record) {
            DataService.put('api/ic/icswb', { data: record, busy: true }, function (data) {
               if (data) {
                  self.icsw = data;
               }
            });
         }
      }
   };

   self.cancelBinLoc = function () {
      self.onNavigationState();
   };

   self.onNavigationState = function () {
      $state.go('^.master', { refreshSearch: false });
   };

   self.updateSelectedIceb = function () {
      var icebCriteria = {
         whse: $stateParams.whse,
         fromprod: $stateParams.prod,
         toprod: $stateParams.prod,
         //To get only selected record from search.
         recordcountlimit: 1
      };
      DataService.post('api/ic/asicentry/icebbuildprodlist', { data: icebCriteria, busy: true }, function (data) {
         if (data && data.length === 1) {
            Utils.replaceObject(base.dataset[base.selectedRow], data[0]);
            base.icebProdGrid.updateRow(base.selectedRow);
            $state.go('^.master', { refreshSearch: false });
         } else {
            $state.go('^.master', { refreshSearch: false });
         }
      });
   };

   // Save record
   self.submit = function () {
      DataService.update('api/ic/icsw', { data: self.icsw, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         if (base.dataset) {
            self.updateSelectedIceb();
         }
      });
   };
});

app.controller('IcebAddBinLocationCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService, UserService) {
   var self = this;
   self.Iceb = $stateParams.Icebrecord;
   self.addBinLoc = '';
   self.icsw = {};
   var popup = $scope.dtl;
   // Get icsw record
   var params = {
      prod: $stateParams.prod,
      whse: $stateParams.whse,
      fillmode: true
   };

   self.cancel = function () {
      popup.addAdditionalBinLocationModal.destroy();
   };

   self.submit = function () {
      self.icswb = { binloc: self.addBinLoc, prod: $stateParams.prod, whse: $stateParams.whse, cono: UserService.getCono() };

      //if (!record) {
      DataService.post('api/ic/icswb', { data: self.icswb, busy: true }, function (data) {
         if (data) {
            self.icsw = data;
            if (data) {
               var params = {
                  whse: self.icsw.whse,
                  prod: self.icsw.prod
               };

               //Load Grid
               DataService.get('api/ic/icswb/listbywhse', { params: params, busy: true }, function (data) {
                  if (data) {
                     self.binLocs = data;
                     popup.addAdditionalBinLocationModal.destroy();
                     $state.go('^.detail', { refreshSearch: true }, { reload: '^.detail' });
                  }
               });
            }
         }
      });
   };

});