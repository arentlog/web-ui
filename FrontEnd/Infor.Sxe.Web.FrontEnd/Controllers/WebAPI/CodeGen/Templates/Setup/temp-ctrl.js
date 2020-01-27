'use strict';

app.config(function (StateProvider) {
   StateProvider.baseState('xx', 'xxxx', 'title.xxxx');
   StateProvider.masterState('xx', 'xxxx', 'master.json');
   StateProvider.createState('xx', 'xxxx', 'detail.json');
   StateProvider.detailState('xx', 'xxxx', 'detail.json');
   StateProvider.detailEditState('xx', 'xxxx');
});

app.controller('XxxxBaseCtrl', function ($state) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('xxxx.master');
   };

   self.includesMaster = function () {
      return $state.includes('xxxx.master');
   };

   self.isCreate = function () {
      return $state.is('xxxx.create');
   };

   self.isDetail = function () {
      return $state.is('xxxx.detail');
   };

   self.includesDetail = function () {
      return $state.includes('xxxx.detail');
   };

   self.isEdit = function () {
      return $state.is('xxxx.detail.edit');
   };
});

app.controller('XxxxSearchCtrl', function ($scope, $state, DataService) {
   var self = this;
   var criteria = $scope.base.criteria;

   self.search = function () {
      // Go back to master state if not already there
      if (!$scope.base.isMaster()) {
         $state.go('xxxx.master');
      }

      DataService.getList('api/xx/xxxx', {busy: true}, function (data) {
         var grid = $('#xxxx-master-grid').data('datagrid');
         grid.loadData(data);
      });
   };
});

app.controller('XxxxMasterCtrl', function (XxxxFactory, DataService) {
   var self = this;
   var grid = XxxxFactory.makeMasterGrid();

   DataService.getList('api/xx/xxxx', {busy: true}, function (data) {
      grid.loadData(data);
   });
});

app.controller('XxxxCreateCtrl', function ($state, DataService, MessageService, UserService) {
   var self = this;

   self.xxxx = {
      cono: UserService.getCono()
   };

   self.save = function () {
      DataService.create('api/xx/xxxx', {data: self.xxxx}, function (response) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // TODO: need rowID in response so can go to detail state?
         $state.go('xxxx.master', null, {reload: 'xxxx.master'});
      });
   };
});

app.controller('XxxxDetailCtrl', function ($state, $stateParams, XxxxFactory, DataService, MessageService) {
   var self = this;

   self.xxxx = DataService.getResource('api/xx/xxxx/getbyrowid/' + $stateParams.id, {busy: true});

   self.reset = function () {
      $state.go('xxxx.detail.edit', null, {reload: 'xxxx.detail'});
   };

   self.cancel = function () {
      $state.go('xxxx.detail', null, {reload: 'xxxx.detail'});
   };

   self.save = function () {
      DataService.update('api/xx/xxxx', {data: self.xxxx}, function (response) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('xxxx.detail', null, {reload: 'xxxx.detail'});
      });
   };

   self.delete = function () {
      DataService.delete('api/xx/xxxx', {data: self.xxxx, busy: true}, function () {
         MessageService.info('global.information', 'message.delete.operation.completed.successfully');

         $state.go('xxxx.master', null, {reload: 'xxxx.master'});
      });
   };
});

app.controller('XxxxEditCtrl', function () {

});
