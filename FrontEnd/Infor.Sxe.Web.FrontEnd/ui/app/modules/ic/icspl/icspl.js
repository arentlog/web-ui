'use strict';

app.config(function ($stateProvider, StateProvider, MultiLanguageStateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icspl',
      dataPath: 'api/ic/icsplp',
      searchMethod: 'GET',
      searchPath: 'api/ic/icsplp/listbyprod?fillmode=true',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      detailSubTitle: [
         { label: 'global.product.list', value: 'type' },
         { label: 'global.product', value: 'prod' }
      ],
      recentlyVisited: {
         title: { label: 'global.product.list', value: 'type' },
         description: { label: 'global.product', value: 'prod' }
      }
   });
   $stateProvider.state('icspl.master.maintaintypes', {
      url: '/maintain-types',
      params: {
         detailRecord: null
      },
      views: {
         maintainTypes: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icspl/maintain-types.json');
            },
            controller: 'IcsplMaintainTypesCtrl as mt'
         }
      }
   });
   MultiLanguageStateProvider.addStates('ic', 'icspl', 'icspl.detail');
});

app.service('IcsplService', function ($state, DataService, MessageService, Sasc) {
   this.extendSearchController = function (self, base) {
      // Manually build Product List Drop Down and select the first one
      DataService.get('api/ic/icspl', { busy: true }, function (data) {
         base.productListTypes = data;
         if (data.length > 0) {
            base.criteria.type = data[0].type;
         }
      });
   };
   this.extendCreateController = function (self, base, icspl) {
      icspl.type = '';
   };
   this.extendDetailController = function (self, base, icspl) {
      self.sasc = Sasc;

      self.multiLangClick = function () {

         var params = {
            prod: icspl.prod
         };

         // Get ICSP to pass descriptions to the Multi-Language Screen
         DataService.get('api/ic/icsp/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               $state.go('icspl.detail.multilanguage', {
                  codeiden: 'p',
                  codeval: icspl.prod,
                  descrip1: data.descrip1,
                  descrip2: data.descrip2,
                  extended: data.descrip3,
                  returnState: $state.current.name
               });
            }
         });
      };
   };
   this.extendMasterController = function (self) {
      self.maintainTypes = function () {
         $state.go('icspl.master.maintaintypes');
      };
   };
});

app.controller('IcsplMaintainTypesCtrl', function ($scope, $state, DataService, GridService, MessageService, UserService, ModalService) {
   var self = this;
   var base = $scope.base;

   DataService.get('api/ic/icspl', { busy: true }, function (data) {
      self.typeList = data;
   });
   self.changeDescrip = function (e, args) {
      var icspl = self.typeList[args.row];
      DataService.put('api/ic/icspl', { data: icspl, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
      });
   };
   self.create = function () {
      ModalService.showModal('ic/icspl/maintain-types-new.json', 'IcsplMaintainTypesNewCtrl as mtn', $scope, function (modal) {
         self.maintainTypesNew = modal;
      });
   };
   self.delete = function () {
      var rowIds = GridService.getSelectedRowIds(self.typeGrid, 'rowID');

      // Proceed if any rows are selected
      if (rowIds.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            DataService.delete('api/ic/icspl/deletelistbyrowids', { data: rowIds, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               DataService.get('api/ic/icspl', { busy: true }, function (data) {
                  self.typeList = data;
                  base.productListTypes = data;
               });
            });
         });
      }
   };
   self.createReturned = function (newtype, newdescrip) {
      var createData = {
         cono: UserService.getCono(),
         type: newtype,
         descrip: newdescrip
      };
      DataService.create('api/ic/icspl', { data: createData, busy: true }, function () {
         DataService.get('api/ic/icspl', { busy: true }, function (data) {
            self.typeList = data;
            base.productListTypes = data;
         });
      });
   };
});

app.controller('IcsplMaintainTypesNewCtrl', function ($scope) {
   var self = this;
   var mt = $scope.mt;

   // Cancel action
   self.cancel = function () {
      mt.maintainTypesNew.destroy();
   };

   // Submit action
   self.submit = function () {
      mt.createReturned(self.type, self.descrip);
      mt.maintainTypesNew.destroy();
   };
});