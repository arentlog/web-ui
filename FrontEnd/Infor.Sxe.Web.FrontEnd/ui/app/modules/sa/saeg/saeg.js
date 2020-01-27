'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('sa', 'saeg', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saeg');

   $stateProvider.state('saeg.addToGroup', {
      url: '/add-to-group?operatorList',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saeg/add-to-group.json');
            },
            controller: 'SaegAddToGroupCtrl as atgc'
         }
      }
   });

   $stateProvider.state('saeg.deleteGroup', {
      url: '/delete-group',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saeg/delete-group.json');
            },
            controller: 'SaegDeleteGroupCtrl as dgc'
         }
      }
   });

   $stateProvider.state('saeg.detail', {
      url: '/detail',
      params: { saegRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saeg/detail.json');
            },
            controller: 'SaegDetailCtrl as dtlc'
         }
      }
   });
});

app.controller('SaegBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('saeg.master');
   };

   self.includesMaster = function () {
      return $state.includes('saeg.master');
   };

   self.isAddToGroup = function () {
      return $state.is('saeg.addToGroup');
   };

   self.isDeleteGroup = function () {
      return $state.is('saeg.deleteGroup');
   };

   self.isDetail = function () {
      return $state.is('saeg.detail');
   };

   self.search = function () {
      DataService.post('api/sa/assaentry/saegoperatorlist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };
});

app.controller('SaegSearchCtrl', function ($scope, $state, Utils) {
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
      if (!$scope.base.isMaster()) {
         $state.go('saeg.master');
      }

      base.search();
   };
});

app.controller('SaegMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;

   self.drilldownFunction = function (e, args) {
      var record = args[0].item;

      DataService.get('api/sa/assaentry/saegoperatorgroups/' + record.oper, { busy: true }, function (data) {
         base.datasetDetail = data;

         $state.go('^.detail', { saegRecord: record });
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.addToGroupMasterFunction = function () {
      var operatorList = '';

      var records = GridService.getSelectedRecords(base.grid);

      if (records) {
         records.forEach(function (item) {
            operatorList = operatorList + item.oper + '|';
         });
         operatorList = operatorList.replace(/\|$/, '');
      }

      if (operatorList) {
         $state.go('^.addToGroup', { operatorList: operatorList });
      }
   };

   self.deleteGroupMasterFunction = function () {
      $state.go('^.deleteGroup');
   };
});

app.controller('SaegAddToGroupCtrl', function ($state, $stateParams, DataService, MessageService) {
   var self = this;
   self.operatorList = $stateParams.operatorList;

   self.cancel = function () {
      $state.go('^');
   };

   self.ok = function () {
      DataService.get('api/sa/assaentry/saegaddgroupoper/' + self.operatorList + '/' + self.addToGroup.groupname + '/' + self.addToGroup.description, { busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   self.onGroupNameSelected = function () {
      self.addToGroup.description = self.addToGroup.groupname;
   };
});

app.controller('SaegDeleteGroupCtrl', function ($state, DataService, MessageService) {
   var self = this;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.ok = function () {
      DataService.get('api/sa/assaentry/saegdeletegroup/' + self.deleteGroup.groupname, {
         busy: true
      }, function () {
         MessageService.info('global.information', 'message.delete.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   self.onGroupNameSelected = function () {
      self.deleteGroup.description = self.deleteGroup.groupname;
   };
});

app.controller('SaegDetailCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   self.saeg = $stateParams.saegRecord;
   var oper = self.saeg.oper;
   var base = $scope.base;

   self.addToGroupDetailFunction = function () {
      if (oper) {
         $state.go('^.addToGroup', { operatorList: oper });
      }
   };

   self.deleteGroupDetailFunction = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var records = GridService.getSelectedRecords(base.gridDetail);
         if (records) {
            var groupNames = [];
            var record;

            records.forEach(function (item) {
               groupNames.push(item.groupnm);
            });

            record = { groupNames: groupNames, oper: oper };

            DataService.post('api/sa/saeg/deletesaeggroupsbyoper', { data: record, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');

               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            });
         }
      }
      );
   };
});
