'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('rs', 'rssj', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('rs', 'rssj');

   /**
    * TODO: This detail state is a skeleton. Change it to what you need,
    * then remove this comment.
    */
   $stateProvider.state('rssj.create', {
      url: '/create',
      params: { rssjRecord: null, rssjcriteria: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssj/detail.json');
            },
            controller: 'RssjCreateCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rssj.detail', {
      url: '/detail',
      params: { rssjRecord: null, rssjcriteria: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssj/detail.json');
            },
            controller: 'RssjDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rssj.detail.edit', {
      url: '/edit',
      params: { rssjRecord: null, rssjcriteria: null }
   });

   $stateProvider.state('rssj.changequeue', {
      url: '/change-queue',
      params: { changeQueueRecords: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssj/change-queue.json');
            },
            controller: 'RssjChangeQueueCtrl as cq'
         }
      }
   });

   $stateProvider.state('rssj.jobgroupcomponents', {
      url: '/job-group-components',
      params: { groupnm: '', refreshSearch: true },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssj/job-group-components.json');
            },
            controller: 'RssjJobGroupComponentsCtrl as jgc'
         }
      }
   });

   $stateProvider.state('rssj.jobgroupcomponentdetail', {
      url: '/job-group-components-detail',
      params: { jobComponentRecord: null, isFormEnable: false },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssj/job-group-component-detail.json');
            },
            controller: 'RssjJobGroupComponentsDetailCtrl as jgcd'
         }
      }
   });

   $stateProvider.state('rssj.jobgroupcomponentdetail.edit', {
      url: '/edit'
      //params: { isFormEnable: true }
   });

   $stateProvider.state('rssj.jobgroupcomponentscreate', {
      url: '/job-group-components-create',
      params: { posno: null, isFormEnable: true },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssj/job-group-component-detail.json');
            },
            controller: 'RssjJobGroupComponentsCreateCtrl as jgcd'
         }
      }
   });

});

app.controller('RssjBaseCtrl', function ($state, DataService, Utils) {
   var self = this;

   self.dateToday = new Date();
   self.criteria = { fromTime: '00:00', toTime: '23:59' };

   // The time-zone offset is the difference, in minutes, between UTC and local time. Note that this means that
   // the offset is positive if the local timezone is behind UTC and negative if it is ahead.  This is the opposite
   // of how the backend expects it.
   self.criteria.timezoneclient = self.dateToday.getTimezoneOffset() * -1;

   self.isMaster = function () {
      return $state.is('rssj.master');
   };

   self.includesMaster = function () {
      return $state.includes('rssj.master');
   };

   self.isDetail = function () {
      return $state.is('rssj.detail');
   };

   self.isCreate = function () {
      return $state.is('rssj.create');
   };

   self.isJgcdDetail = function () {
      return $state.is('rssj.jobgroupcomponentdetail');
   };

   // Perform search and update data set for the grids
   self.search = function () {

      var fromTime = Utils.getTimePieces(self.criteria.fromTime);
      self.criteria.fromhour = fromTime.hour;
      self.criteria.fromminute = fromTime.min;
      self.criteria.fromampm = fromTime.ampm;

      var toTime = Utils.getTimePieces(self.criteria.toTime);
      self.criteria.tohour = toTime.hour;
      self.criteria.tominute = toTime.min;
      self.criteria.toampm = toTime.ampm;

      DataService.post('api/rs/asrssetup/rssjjobgroupload', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };
});

app.controller('RssjSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = { fromTime: '00:00', toTime: '23:55' };
      base.criteria.timezoneclient = base.dateToday.getTimezoneOffset() * -1;
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('rssj.master');
      }

      base.search();
   };
});

app.controller('RssjMasterCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteriaData = angular.copy(base.criteria);

   self.drillDown = function (e, args) {
      var record = args[0].item;
      if (record) {
         criteriaData.inquiryfl = false;
         criteriaData.updatefl = true;
         criteriaData.groupnm = record.groupnm;
         criteriaData.timezoneclient = base.dateToday.getTimezoneOffset() * -1;
         var rssjRecord;
         // Load
         DataService.post('api/rs/asrssetup/rssjjobgroupdetail', { data: criteriaData, busy: true }, function (data) {
            if (data) {
               rssjRecord = data;

               $state.go('^.detail', { rssjRecord: rssjRecord, rssjcriteria: criteriaData });
            }
         });
      }
   };

   self.add = function () {
      criteriaData.inquiryfl = false;
      criteriaData.updatefl = false;
      $state.go('^.create', { rssjRecord: null, rssjcriteria: criteriaData });
   };

   self.edit = function () {
      var selectedRow = GridService.getSelectedRecord(base.grid);
      criteriaData.inquiryfl = false;
      criteriaData.updatefl = true;
      criteriaData.groupnm = selectedRow.groupnm;
      criteriaData.timezoneclient = base.dateToday.getTimezoneOffset() * -1;
      var rssjRecord;
      // Load
      DataService.post('api/rs/asrssetup/rssjjobgroupdetail', { data: criteriaData, busy: true }, function (data) {
         if (data) {
            rssjRecord = data;

            $state.go('^.detail.edit', { rssjRecord: rssjRecord, rssjcriteria: criteriaData });
         }
      });
   };

   self.onJobGroupDelete = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      var simpleRequestsCriteria = { rssjjobgroup: selectedRecords, cAction: 'DeleteJobGroups', iNbrRcds: selectedRecords.length, cAnswer: 'Y' };
      DataService.post('api/rs/asrssetup/rssjjobgroupsimplerequests', { data: simpleRequestsCriteria, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            base.search();
         }
      });
   };

   self.onChangeQueue = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      var changeQueueCollection = [];
      if (selectedRecords) {
         selectedRecords.forEach(function (rec) {
            changeQueueCollection.push(rec);
         });
      }
      $state.go('^.changequeue', { changeQueueRecords: changeQueueCollection });
   };

   self.onJobGroupComponents = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      $scope.base.groupnm = selectedRecord.groupnm;
      $state.go('^.jobgroupcomponents', { groupnm: selectedRecord.groupnm, refreshSearch: true });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('RssjCreateCtrl', function ($state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   self.criteria = $stateParams.rssjcriteria;
   self.rssj = $stateParams.rssjRecord;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.reset = function () {
      Utils.clearObject(self.rssj);
   };

   // Save
   self.submit = function () {
      var rssjCriteriaData = {
         queuenm: self.criteria.queuenm,
         fromhour: self.criteria.fromhour,
         fromminute: self.criteria.fromminute,
         fromampm: self.criteria.fromampm,
         tohour: self.criteria.tohour,
         tominute: self.criteria.tominute,
         toampm: self.criteria.toampm,
         inquiryfl: self.criteria.inquiryfl,
         updatefl: self.criteria.updatefl,
         timezoneclient: self.criteria.timezoneclient
      };

      DataService.post('api/rs/asrssetup/rssjjobgroupupdate', { data: { rssjcriteria: rssjCriteriaData, rssjjobgroup: self.rssj }, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };
});

app.controller('RssjDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   self.criteria = $stateParams.rssjcriteria;
   self.rssj = $stateParams.rssjRecord;

   self.cancel = function () {
      self.rssj = $stateParams.rssjRecord;
      $state.go('^.^.detail');
   };

   self.reset = function () {
      $state.go('^.edit', null, { reload: '^' });
   };

   // Save
   self.submit = function () {
      self.rssj.inquiryfl = false;
      self.rssj.updatefl = false;
      DataService.post('api/rs/asrssetup/rssjjobgroupupdate', { data: { rssjcriteria: self.criteria, rssjjobgroup: self.rssj }, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.^.master', { refreshSearch: true }, { reload: '^.^.master' });
         }
      });
   };
});

app.controller('RssjChangeQueueCtrl', function ($state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var changeQueueCollection = $stateParams.changeQueueRecords;

   self.cancel = function () {
      $state.go('^.master');
   };

   // Save
   self.submit = function () {
      var simpleRequestsCriteria = { rssjjobgroup: changeQueueCollection, cAction: 'ChangeQueue', iNbrRcds: changeQueueCollection.length, cAnswer: self.queuenm };
      DataService.post('api/rs/asrssetup/rssjjobgroupsimplerequests', { data: simpleRequestsCriteria, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }
      });
   };
});

app.controller('RssjJobGroupComponentsCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   self.jobGroup = $scope.base.groupnm;

   self.refreshGrid = function () {
      var rssjcomponentscontrol = { groupnm: $scope.base.groupnm };
      // Load
      DataService.post('api/rs/asrssetup/rssjcomponentsload', { data: rssjcomponentscontrol, busy: true }, function (data) {
         if (data) {
            self.jobComponentCollection = data;
         }
      });
   };

   if ($stateParams.refreshSearch) {
      if ($scope.base.groupnm) {
         self.refreshGrid();
      }
   }

   self.cancel = function () {
      $state.go('^.master');
   };

   self.edit = function (args) {
      var selectedRecord = GridService.getSelectedRecord(self.componentGrid);
      $state.go('^.jobgroupcomponentdetail.edit', { jobComponentRecord: selectedRecord, isFormEnable: true });
   };

   self.drillDown = function (e, args) {
      var record = args[0].item;
      $state.go('^.jobgroupcomponentdetail', { jobComponentRecord: record, isFormEnable: false });
   };

   self.createComponent = function () {
      var newposno = 0;
      if (self.jobComponentCollection.length > 0) {
         newposno = Number([self.jobComponentCollection[self.jobComponentCollection.length - 1].posno]) + Number(10);
      }
      self.reportfl = true;
      $state.go('^.jobgroupcomponentscreate', { posno: newposno, isFormEnable: true });
   };

   // Save
   self.submit = function () {
      DataService.post('api/rs/asrssetup/rssjjobgroupsimplerequests', { data: { rssjcriteria: simpleRequestsCriteria }, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   self.onReposition = function () {
      DataService.get('api/rs/asrssetup/rssjcomponentsreposition/' + $scope.base.groupnm, function () {
         self.refreshGrid();
         MessageService.info('global.information', 'Reposition done sucessfully');
      });
   };

   self.onJobComponentsDelete = function () {
      var selectedRecords = GridService.getSelectedRecords(self.componentGrid);
      if (selectedRecords) {
         DataService.post('api/rs/asrssetup/rssjcomponentsdelete', { data: selectedRecords, busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            self.refreshGrid();
         });
      }
   };
});

app.controller('RssjJobGroupComponentsDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.jobComponent = $stateParams.jobComponentRecord;
   self.jobComponent.isFormEnable = $stateParams.isFormEnable;

   var rssjcomponentscontrol = {
      groupmodifyfl: true,
      groupnm: self.jobComponent.groupnm,
      rssjcrowid: self.jobComponent.rssjcrowid,
      mode: self.jobComponent.rssjcrowid === 0 ? 'a' : 'c',
      updatefl: self.jobComponent.rssjcrowid === 0 ? false : true
   };

   self.edit = function () {
      $state.go('^.jobgroupcomponentdetail.edit', { isFormEnable: true });
   };

   self.cancel = function () {
      if ($state.current.name === 'rssj.jobgroupcomponentdetail') {
         $state.go('^.jobgroupcomponents', { refreshSearch: true });
      }
      else {
         $state.go('^', { jobComponentRecord: self.jobComponent, isFormEnable: false });
      }
   };

   self.reset = function () {
      $state.go('^', { jobComponentRecord: self.jobComponent, isFormEnable: false });
   };

   // Save
   self.submit = function () {
      DataService.post('api/rs/asrssetup/rssjcomponentsaddchange', { data: { rssjcomponentscontrol: rssjcomponentscontrol, rssjcomponents: self.jobComponent }, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            $state.go('^.^.jobgroupcomponents', { groupnm: $scope.base.groupnm, refreshSearch: true });
         }
      });
   };

});

app.controller('RssjJobGroupComponentsCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;

   var rssjcomponentscontrol = {
      groupmodifyfl: true,
      groupnm: base.groupnm,
      rssjcrowid: 0,
      mode: 'a',
      updatefl: false
   };

   self.jobComponent = {};
   self.jobComponent.posno = $stateParams.posno;
   self.jobComponent.isFormEnable = $stateParams.isFormEnable;
   self.jobComponent.priority = 1;
   self.jobComponent.reportfl = true;
   self.jobComponent.groupnm = base.groupnm;

   self.onReportChange = function (args) {
      if (args.value2) {
         self.jobComponent.cono = args.value2;
      } else {
         self.jobComponent.cono = 0;
      }
   };

   self.cancel = function () {
      $state.go('^.jobgroupcomponents', { groupnm: $scope.groupnm, refreshSearch: true });
   };

   // Save
   self.submit = function () {
      DataService.post('api/rs/asrssetup/rssjcomponentsaddchange', { data: { rssjcomponentscontrol: rssjcomponentscontrol, rssjcomponents: self.jobComponent }, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
         $state.go('^.jobgroupcomponents', { groupnm: $scope.groupnm, refreshSearch: true });
      });
   };

});
