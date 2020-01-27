'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('rs', 'rssq', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('rs', 'rssq');

   $stateProvider.state('rssq.detail', {
      url: '/detail',
      params: { rssqqueue: null },
      stricky: true,
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssq/detail.json');
            },
            controller: 'RssqDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rssq.detail.edit', {
      url: '/edit',
      template: ''
   });

   $stateProvider.state('rssq.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssq/detail.json');
            },
            controller: 'RssqCreateCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rssq.copy', {
      url: '/copy',
      params: { origQueueName: null, origDescrip: null, pageTitle: null, subTitle: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssq/modify.json');
            },
            controller: 'RssqCopyCtrl as rc'
         }
      }
   });

   $stateProvider.state('rssq.change', {
      url: '/change',
      params: { isChangePriority: false, isChangeLogDir: false, pageTitle: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rssq/modify.json');
            },
            controller: 'RssqChangeCtrl as rc'
         }
      }
   });
});

app.controller('RssqBaseCtrl', function ($state, DataService, GridService, MessageService, UserService) {
   var self = this;
   self.dateToday = new Date();
   self.criteria = {};
   // The time-zone offset is the difference, in minutes, between UTC and local time. Note that this means that
   // the offset is positive if the local timezone is behind UTC and negative if it is ahead.  This is the opposite
   // of how the backend expects it.
   self.criteria.timezoneclient = self.dateToday.getTimezoneOffset() * -1;
   self.criteria.statuscd = 'all';
   self.isLastChangedByVisible = true;

   self.isMaster = function () {
      return $state.is('rssq.master');
   };

   self.includesMaster = function () {
      return $state.includes('rssq.master');
   };

   self.isDetail = function () {
      return $state.is('rssq.detail');
   };

   self.includesDetail = function () {
      return $state.includes('rssq.detail');
   };

   self.search = function () {
      DataService.post('api/rs/asrssetup/rssqqueueload', { data: self.criteria, busy: true }, function (data) {
         if (data) {          
            // correct for midnight display, need 86400 not 0 to display properly
            data.forEach(function (dataset) {
               if (dataset.begintm === 0) {
                  dataset.begintm = 86400;
               }
               if (dataset.endtm === 0) {
                  dataset.endtm = 86400;
               }
            });         
         }
         self.dataset = data;
      });
   };

   self.simpleRequest = function (action, answer, messageHeader, message, queue) {

      var records = GridService.getSelectedRecords(self.grid);

      if (records.length === 0 && queue) {
         records.push(queue);
      }

      var requestCriteria = {
         rssqqueue: records,
         cAction: action,
         iNbrRcds: records.length,
         cAnswer: answer
      };

      DataService.post('api/rs/asrssetup/rssqqueuesimplerequests', { data: requestCriteria, busy: true }, function (data) {
         if (data) {
            MessageService.info(messageHeader, message);

            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
         }
      });
   };

   self.initializeQueue = function () {
      return self.queue = {
         begintmdisp: '12:00 AM',
         endtmdisp: '11:59 PM',
         begintm: 1,
         endtm: 86340,
         nomaxjobs: 1,
         queuepri: 0,
         statustype: false
      };
   };

   self.queueUpdate = function (queue, isUpdate) {

      queue.operinit = UserService.getUserName();
      var transDate = new Date();
      queue.transdt = transDate.getMonth() + '/' + transDate.getDate() + '/' + transDate.getFullYear();
      queue.transtm = ((transDate.getHours() === 0) ? '00' : (transDate.getHours() < 10) ? ('0' + transDate.getHours()) : transDate.getHours()) + ':' +
                      ((transDate.getMinutes() === 0) ? '00' : (transDate.getMinutes() < 10) ? ('0' + transDate.getMinutes()) : transDate.getMinutes());

      var updateCriteria = {
         queuenm: isUpdate ? queue.queuenm : null,
         inquiryfl: false,
         updatefl: isUpdate ? true : false,
         queuepri: queue.queuepri,
         timezoneclient: self.criteria.timezoneclient
      };

      // Issue with Midnight save, use 0 not 86400
      if (queue.begintm === 86400) {
         queue.begintm = 0;
      }
      if (queue.endtm === 86400) {
         queue.endtm = 0;
      }

      var AsrssetupRSSQQueueUpdateRequestAPI = { Rssqcriteria: updateCriteria, Rssqqueue: queue };

      DataService.post('api/rs/asrssetup/rssqqueueupdate', { data: AsrssetupRSSQQueueUpdateRequestAPI, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         $state.go('rssq.master', { refreshSearch: true }, { reload: 'rssq.master' });
      });
   };

   self.validateQueue = function (queue) {
      var queueErrMsg = '';
      var priErrMsg = '';
      var message = '';

      if (!queue.queuenm) {
         queueErrMsg = MessageService.get('global.queue.name') + MessageService.get('symbol.dash.with.spaces') + MessageService.get('message.this.is.a.required.field');
      }

      if (queue.queuepri === 0) {
         priErrMsg = MessageService.get('global.priority') + MessageService.get('symbol.dash.with.spaces') + MessageService.get('error.must.be.1.through.99.3134');
      }

      if (queueErrMsg || priErrMsg) {
         message = MessageService.get('global.validation.error.message') + '<br/>';

         if (queueErrMsg) {
            message += '<br/>' + queueErrMsg;
         }

         if (priErrMsg) {
            message += '<br/>' + priErrMsg;
         }
      }

      return message;
   };
});

app.controller('RssqSearchCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      criteria.statuscd = 'all';
      criteria.queuenm = '';
      criteria.queuepri = null;
   };

   self.submit = function () {

      if (!base.isMaster()) {
         $state.go('rssq.master');
      }

      base.search();
   };
});

app.controller('RssqMasterCtrl', function ($scope, $state, $stateParams, GridService, MessageService, DataService) {
   var self = this;
   var base = $scope.base;

   var COPY = 'copy';
   var PRIORITY = 'priority';
   var LOG_DIR = 'logdir';
   var ACTIVE = 'Active';
   var INACTIVE = 'Inactive';
   var DELETE_QUEUES = 'DeleteQueues';

   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', { rssqqueue: record });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.grid);
      $state.go('^.detail.edit', { rssqqueue: record });
   };

   self.create = function () {
      $state.go('^.create');
   };

   self.doAction = function (mode) {

      switch (mode) {
         case COPY:
            var record = GridService.getSelectedRecord(base.grid);
            var subTitle = record.queuenm + ' | ' + record.descrip;
            $state.go('^.copy', {
               origQueueName: record.queuenm, origDescrip: record.descrip, pageTitle: 'global.copy.queue', subTitle: subTitle
            });
            break;
         case PRIORITY:
            $state.go('^.change', {
               isChangePriority: true, isChangeLogDir: false, pageTitle: 'global.change.queue.priority'
            });
            break;
         case LOG_DIR:
            $state.go('^.change', {
               isChangePriority: false, isChangeLogDir: true, pageTitle: 'global.change.log.directory'
            });
            break;
         default:
            $state.go('^');
            break;
      }
   };

   self.changeStatus = function (status) {
      if (status === ACTIVE) {
         MessageService.okCancel('global.confirmation', 'question.make.all.selected.queues.active', function () {
            base.simpleRequest(ACTIVE, 'Y', 'global.information',
               'message.save.operation.completed.successfully');
         });
      }
      else {
         MessageService.okCancel('global.confirmation', 'question.make.all.selected.queues.inactive', function () {
            base.simpleRequest(INACTIVE, 'Y', 'global.information',
               'message.save.operation.completed.successfully');
         });
      }
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         base.simpleRequest(DELETE_QUEUES, 'Y', 'global.information',
            'message.delete.operation.completed.successfully');
      });
   };

   self.statusFormatter = function (row, cell, value) {
      if (value) {
         return MessageService.get('global.active');
      } else {
         return MessageService.get('global.inactive');
      }
   };

   //priority cell changed
   self.onPriorityChanged = function (e, args) {
      var record = base.dataset[args.row];
      if (record) {
         var requestCriteria = {
            rssqqueue: [record],
            cAction: 'ChangePriority',
            iNbrRcds: 1,
            cAnswer: record.queuepri
         };

         DataService.post('api/rs/asrssetup/rssqqueuesimplerequests', { data: requestCriteria, busy: true }, function (data) {
            if (data) {
               base.search();
            }
         });
      }
   };

});

app.controller('RssqDetailCtrl', function ($state, $scope, $stateParams, MessageService) {
   var self = this;
   var base = $scope.base;

   var DELETE_QUEUES = 'DeleteQueues';
   base.isLastChangedByVisible = true;

   self.rssqqueue = $stateParams.rssqqueue;

   self.tempRssqQueue = angular.copy(self.rssqqueue);

   self.reset = function () {
      self.rssqqueue = angular.copy(self.tempRssqQueue);
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.submit = function () {

      var message = base.validateQueue(self.rssqqueue);

      if (message) {
         MessageService.error('global.validation.error', message);
      }
      else {
         base.queueUpdate(self.rssqqueue, true);
      }
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         base.simpleRequest(DELETE_QUEUES, 'Y', 'global.information', 'message.delete.operation.completed.successfully', self.rssqqueue);
      });
   };

   self.getSubTitle = function () {
      return (self.rssqqueue.queuenm + ' | ' + self.rssqqueue.descrip);
   };

   self.isCreate = function () {
      return false;
   };

   self.create = function () {
      $state.go('^.create');
   };
});

app.controller('RssqCreateCtrl', function ($scope, $state, $stateParams, MessageService) {
   var self = this;
   var base = $scope.base;

   self.rssqqueue = base.initializeQueue();
   base.isLastChangedByVisible = false;

   self.reset = function () {
      self.rssqqueue = base.initializeQueue();
   };

   self.cancel = function () {
      $state.go('^.master');
   };

   self.submit = function () {
      var message = base.validateQueue(self.rssqqueue);

      if (message) {
         MessageService.error('global.validation.error', message);
      }
      else {
         base.queueUpdate(self.rssqqueue, false);
      }
   };

   self.getSubTitle = function () {
      return MessageService.get('global.new');
   };

   self.isCreate = function () {
      return true;
   };

});

app.controller('RssqCopyCtrl', function ($scope, $state, $stateParams, DataService, MessageService, $translate) {
   var self = this;
   var base = $scope.base;

   self.isCopyQueue = true;
   var origqueuenm = $stateParams.origQueueName;
   self.newqueuenm = $stateParams.origQueueName; //On load, copy original queuenm to new queuenm field
   self.newdescrip = $stateParams.origDescrip; //On load, copy original descrip to new descrip field
   self.pageTitle = $translate.instant($stateParams.pageTitle);
   self.subTitle = $stateParams.subTitle;

   self.cancel = function () {
      $state.go('^.master');
   };

   self.isCopy = function () {
      return self.isCopyQueue;
   };

   self.submit = function () {
      var copyRecord = { cOrigQueue:origqueuenm, cNewQueue:self.newqueuenm, cNewDesc:self.newdescrip };

      DataService.post('api/rs/asrssetup/rssqcopyrecord', { data: copyRecord, busy: true }, function (data) {
         if (data) {

            var searchCriteria = {
               statuscd: 'all',
               queuenm: self.newqueuenm,
               queuepri: 0,
               timezoneclient: base.criteria.timezoneclient
            };

            DataService.post('api/rs/asrssetup/rssqqueueload', { data: searchCriteria, busy: true }, function (data) {
               if (data) {
                  var searchResults = data;

                  var newRecord = JSLINQ(searchResults).Where(function (rssqRecord) { return rssqRecord.queuenm === self.newqueuenm; }).FirstOrDefault();

                  if (newRecord) {
                     $state.go('^.detail.edit', { rssqqueue: newRecord });
                     MessageService.info('global.information', 'message.copy.operation.completed.successfully');
                  }
               }
            });
         }
      });
   };

});

app.controller('RssqChangeCtrl', function ($scope, $state, $stateParams, $translate) {
   var self = this;
   var base = $scope.base;

   var CHANGE_PRIORITY = 'ChangePriority';
   var CHANGE_LOGDIR = 'ChangeLogDir';
   var isChangePriority = $stateParams.isChangePriority;
   var isChangeLogDir = $stateParams.isChangeLogDir;

   self.pageTitle = $translate.instant($stateParams.pageTitle);
   self.subTitle = '';
   self.queuepri = 1;
   self.logdir = '';

   self.cancel = function () {
      $state.go('^.master');
   };

   self.isPriority = function () {
      return isChangePriority;
   };

   self.isLogDir = function () {
      return isChangeLogDir;
   };

   self.submit = function () {
      if (isChangePriority) {
         base.simpleRequest(CHANGE_PRIORITY, self.queuepri, 'global.information', 'message.save.operation.completed.successfully');
      }
      else {
         base.simpleRequest(CHANGE_LOGDIR, self.logdir, 'global.information', 'message.save.operation.completed.successfully');
      }
   };

});