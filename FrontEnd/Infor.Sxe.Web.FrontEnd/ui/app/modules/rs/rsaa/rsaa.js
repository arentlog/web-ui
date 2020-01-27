'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('rs', 'rsaa', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('rs', 'rsaa');

   $stateProvider.state('rsaa.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rsaa/detail.json');
            },
            controller: 'RsaaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rsaa.jobs', {
      url: '/jobs',
      params: { record: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rsaa/job-detail.json');
            },
            controller: 'RsaaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rsaa.groups', {
      url: '/groups',
      params: {
         record: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rsaa/groups.json');
            },
            controller: 'RsaaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rsaa.systemload', {
      url: '/system-load',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rsaa/system-load.json');
            },
            controller: 'RsaaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rsaa.sendlog', {
      url: '/send-log',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rsaa/send-log.json');
            },
            controller: 'RsaaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rsaa.changeprinter', {
      url: '/change-printer',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rsaa/change-printer.json');
            },
            controller: 'RsaaDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('rsaa.rundatetime', {
      url: '/run-date-time',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('rs/rsaa/runtime-date.json');
            },
            controller: 'RsaaDetailCtrl as dtl'
         }
      }
   });
});

app.controller('RsaaBaseCtrl', function ($state, ConfigService, DataService, $translate, Utils, SecurityService) {
   var self = this;
   //self.criteria = {};
   self.criteria = {};
   self.statusType = [''];
   self.dateToday = new Date();
   var MENU_FUNCTION_RSAA = 'rsaa';

   self.isMaster = function () {
      return $state.is('rsaa.master');
   };

   self.includesMaster = function () {
      return $state.includes('rsaa.master');
   };

   self.isDetail = function () {
      return $state.is('rsaa.detail');
   };

   self.includesDetail = function () {
      return $state.includes('rsaa.detail');
   };

   self.getSecurity = function () {
      self.securityLevel = SecurityService.getSecurityLevel(MENU_FUNCTION_RSAA);
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria = { begintm: '', endtm: '', printtype: '', rpttype: 'b', fromTime: '00:00', toTime: '23:55', typefl: true, ladminfl: true, printerhidden: false };
      self.criteria.timezoneclient = self.dateToday.getTimezoneOffset() * -1;
   };

   self.rsaaCriteriaFieldChange = function () {
      var inputdata = { rsaacriteria: self.criteria, cField: 'QueueNm' };
      DataService.post('api/rs/asrssetup/rsaacriteriafieldchange', { data: inputdata, busy: true }, function (data) {
         self.criteria = data;
         self.criteria.fromTime = '00:00';
         self.criteria.toTime = '23:55';

         if (self.criteria.statustype === 'no')
            self.criteria.statustype = $translate.instant('global.inactive');
         else if (self.criteria.statustype === 'yes')
            self.criteria.statustype = $translate.instant('global.active');
      });
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      if (self.statusType) {
         var strStatus = self.statusType.join();
         self.criteria.statuscd = strStatus;
      }
      var fromTime = Utils.getTimePieces(self.criteria.fromTime);
      self.criteria.fromhour = fromTime.hour;
      self.criteria.fromminute = fromTime.min;
      self.criteria.fromam = fromTime.ampm;

      var toTime = Utils.getTimePieces(self.criteria.toTime);
      self.criteria.tohour = toTime.hour;
      self.criteria.tominute = toTime.min;
      self.criteria.toam = toTime.ampm;

      DataService.post('api/rs/asrssetup/rsaaactivityload', { data: self.criteria, busy: true }, function (data) {
         self.rsaaactivityList = data.rsaaactivity;
         self.dataset = data.rsaaactivity;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
   self.getSecurity();
});

app.controller('RsaaSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria = { begintm: '', endtm: '', rpttype: 'b', printtype: '', typefl: true, ladminfl: true, printerhidden: false };
      base.criteria.fromTime = '00:00';
      base.criteria.toTime = '23:55';
      base.statusType = [''];
      base.criteria.timezoneclient = base.dateToday.getTimezoneOffset() * -1;
      // base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('rsaa.master');
      }
      // Get data
      base.search();
   };
});

app.controller('RsaaMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService, GridService, ModalService, Utils) {
   var self = this;
   var base = $scope.base;
   self.dateToday = new Date();

   self.runSapbDateTime = {};
   self.rsaaactivityList = [];
   self.errorMessage = '';

   self.jobDetails = function () {
      var selectedRecord = GridService.getSelectedRecord(base.grid);
      if (selectedRecord.reportfl)
         $state.go('^.jobs', { record: selectedRecord });
      else
         $state.go('^.groups', { record: selectedRecord });
   };

   // Enable printer
   self.enablePrinter = function () {
      self.rsaaactivitySelectedList = GridService.getSelectedRecords(base.grid);
      var printerEnableList = JSLINQ(self.rsaaactivitySelectedList).Where(function (pl) { return pl.sapbrowid !== ''; }).ToArray();
      return (printerEnableList.length >= 1 && base.securityLevel >= 3) ? true : false;
   };

   // Change printer
   self.changePrinter = function () {
      $state.go('^.changeprinter');
   };

   // Change queue
   self.changeQueue = function () {

      self.rsaaactivityList = GridService.getSelectedRecords(base.grid);
      var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;
      var cActionParameter = 'InUse';
      var answer = '';
      self.newQueue = '';

      self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, answer, 'ChangeQueue');

      ModalService.showModal('rs/rsaa/popup-changequeue.json', null, $scope, function (modal) {
         self.changeQueueModel = modal;
      });
   };

   // Submit change queue
   self.submitChangeQueue = function () {

      var cActionParameter = 'ChangeQueue';
      var answer = self.newQueue;

      self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, self.rsaaactivityList.length, answer, 'IsFinal');

      self.changeQueueModel.destroy();
   };

   self.cancelChangeQueue = function () {
      self.changeQueueModel.destroy();
   };

   // system load
   self.systemload = function () {
      $state.go('^.systemload');
   };

   // send log
   self.sendlog = function () {
      $state.go('^.sendlog');
   };

   self.runDateTime = function () {

      self.rsaaactivityList = GridService.getSelectedRecords(base.grid);
      var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;
      var cActionParameter = 'InUse';
      var answer = '';

      self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, answer, 'ChangeDateTime');

      ModalService.showModal('rs/rsaa/runtime-date.json', null, $scope, function (modal) {
         self.runSapbDateTimeModal = modal;
      });
   };

   // RunTimeDate
   self.submitRunDateTime = function () {
      // need server method
      if (self.errorMessage !== '') {
         MessageService.info('global.information', self.errorMessage);
      }
      else {

         var clientTime = Utils.getTimePieces(self.runSapbDateTime.clientTime);
         self.runSapbDateTime.timehour = clientTime.hour;
         self.runSapbDateTime.timeminute = clientTime.min;
         self.runSapbDateTime.timeampm = clientTime.ampm;

         self.sapbDateTimeProcess('Update');
      }
      self.runSapbDateTimeModal.destroy();
   };

   self.cancelRunDateTime = function () {
      self.runSapbDateTimeModal.destroy();
   };

   self.sapbDateTimeProcess = function (action) {
      var criteria = { sapbdatetime: self.runSapbDateTime, cAction: action };
      DataService.post('api/rs/asrssetup/sapbdatetimeprocess', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.runSapbDateTime = data;

            if (data.timeampm === 'PM') {
               data.timehour = data.timehour + 12;
            }

            var clientHr = (data.timehour < 10) ? "0" + data.timehour : data.timehour;
            var clientmin = (data.timeminute < 10) ? "0" + data.timeminute : data.timeminute;

            // assign directly
            self.runSapbDateTime.clientTime = clientHr + ':' + clientmin;

            if (action === 'Update') {
               var cActionParameter = 'ChangeDateTime';
               var answer = self.runSapbDateTime.changestring;
               self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, self.rsaaactivityList.length, answer, 'IsFinal');
            }
         }
      });
   };

   self.setSAPBDateTime = function (rsaaactivityList) {

      var activity = JSLINQ(rsaaactivityList).FirstOrDefault();

      self.errorMessage = '';

      self.runSapbDateTime = {
         clientTime: activity.starttmdisp,
         changescheduletype: activity.changescheduletype,
         dateclient: activity.startdtclient,
         timeclient: activity.starttmclient,
         scheduletype: activity.startty,
         blankdateok: false,
         todayclient: Date.now,
         timezoneclient: self.dateToday.getTimezoneOffset() * -1
      };

      self.sapbDateTimeProcess('Initiate');
   };

   self.runDateChange = function () {
      var criteria = { sapbdatetime: self.runSapbDateTime, cField: 'DateClient' };
      DataService.post('api/rs/asrssetup/sapbdatetimefieldchange', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.runSapbDateTime = data;
            //Check time
         }
      });
   };

   // Delete Jobs
   self.deleteJobs = function () {
      var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;
      var confirmMsg = MessageService.get('global.confirm.delete') + '  ' + MessageService.get('global.for') + '  ' + selectedRecordCount + ' ' + MessageService.get('global.jobs');
      MessageService.yesNo('global.question', confirmMsg, function () {
         self.rsaaactivityList = GridService.getSelectedRecords(base.grid);
         var cActionParameter = 'DeleteJobs';
         var answer = 'Y';
         self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, answer, 'IsFinal');
      });
   };

   // Stop Jobs
   self.stopJobs = function () {
      self.rsaaactivityList = GridService.getSelectedRecords(base.grid);

      var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;
      var cActionParameter = 'StopJobs1';
      var answer = '';

      if (selectedRecordCount >= 1) {

         var rsaaActivity = JSLINQ(self.rsaaactivityList).Where(function (c) {
            return c.inusety !== 'In Use';
         }).FirstOrDefault();

         if (!rsaaActivity) {
            self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, answer, 'StopJobs');
         }
         else {
            MessageService.error('global.error', 'message.can.not.stop.jobs.unless.status.is.y.executing');

         }
      }
   };

   // run now
   self.runNow = function () {

      self.rsaaactivityList = GridService.getSelectedRecords(base.grid);
      var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;
      var cActionParameter = 'RunNow';
      var answer = '';
      self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, answer, 'IsFinal');
   };

   //Clear Status
   self.clearStatus = function () {
      self.rsaaactivityList = GridService.getSelectedRecords(base.grid);
      var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;
      var cActionParameter = 'ClearStatus1';
      var answer = '';


      self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, answer, 'ClearStatus');
   };

   // Main Action method
   self.activitySimpleRequests = function (rsaaactivity, cActionParameter, selectedRecordCount, answer, callFor) {

      var simpleRequesst = { rsaaactivity: rsaaactivity, cAction: cActionParameter, iNbrRcds: selectedRecordCount, cAnswer: answer };

      DataService.post('api/rs/asrssetup/rsaaactivitysimplerequests', { data: simpleRequesst, busy: true }, function (data) {
         if (data) {

            if (callFor === 'ChangeDateTime') {
               self.setSAPBDateTime(rsaaactivity);
            }
            else if (callFor === 'ChangeQueue') {
               self.newQueue = '';
            }
            else if (callFor === 'ClearStatus') {

               var firstActivity = JSLINQ(self.rsaaactivityList).FirstOrDefault();
               var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;

               if (firstActivity && !firstActivity.reportfl && firstActivity.inusety === "Error") {
                  MessageService.yesNoCancel('global.question', MessageService.get('global.clear.entire.group.no.only.clears.errors'),
                        function () {
                           var cActionParameter = 'ClearStatus2';
                           self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, 'Y', 'IsFinal');
                        },
                        function () {
                           var cActionParameter = 'ClearStatus2';
                           self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, 'N', 'IsFinal');
                        });
               }
               else {
                  MessageService.okCancel('global.question', MessageService.get('global.confirm.resetting.status.for') + ' ' + selectedRecordCount + ' ' + MessageService.get('global.jobs'),
                        function () {
                           var cActionParameter = 'ClearStatus2';
                           self.activitySimpleRequests(self.rsaaactivityList, cActionParameter, selectedRecordCount, 'Y', 'IsFinal');
                        });
               }
            }
            else if (callFor === 'StopJobs') {
               var recordsLen = GridService.getSelectedRecords(base.grid).length;

               MessageService.yesNo('global.question', MessageService.get('global.confirm.stop.for') + ' ' + recordsLen + ' ' + MessageService.get('global.jobs'), function () {
                  self.activitySimpleRequests(self.rsaaactivityList, 'StopJobs2', recordsLen, 'Y', 'IsFinal');
               });
            }
            else if (callFor === 'IsFinal') {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               base.search();
            }
         }
      });
   };

});

app.controller('RsaaDetailCtrl', function ($scope, Utils, $state, $stateParams, Constants, DataService, MessageService, GridService) {
   var self = this;
   //var mst = $scope.mst;
   var base = $scope.base;

   self.queueNumber = '';
   self.rngoptfl = false;
   self.logdir = ' ';
   self.emailhidden = true;
   self.faxhidden = true;
   self.isFirstTime = true;
   self.subtitle = '';

   // system-load
   //TODO: need to figureout timeZoneClient value
   var timeZoneClient = 330;
   DataService.get('api/rs/asrssetup/rsaasystemload/' + timeZoneClient, { busy: true }, function (data) {
      if (data) {
         self.rsaaSystemLoaddataset = data.rsaasystemload;
         self.currActivityJobs = data.iSysCur;
         self.maxActivityJobs = data.iSysMax;
      }
   });

   //Get send log screen functionalities

   self.getLogScreenvalues = function () {
      var params = {
         queuenm: self.queueNumber
      };

      DataService.getResource('api/rs/rssq/getbypk', { params: params, busy: true }, function (data) {
         self.rngoptfl = data.rngoptfl;
         self.logdir = data.logdir;
      });
   };

   self.saveLogScreen = function () {
      DataService.get('api/rs/asrssetup/rsaasendlog/' + self.queueNumber, { busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('rsaa.master');
      });
   };

   // job-details
   if ($stateParams.record) {
      var reportnumber = ($stateParams.record.reportfl === true) ? $stateParams.record.cono.toString() + '|' + $stateParams.record.reportnm : $stateParams.record.reportnm;
      self.selectedRecord = $stateParams.record;
      if (reportnumber) {
         self.subtitle = $stateParams.record.reportnm + ' - ' + $stateParams.record.rpttitle;
         DataService.get('api/rs/asrssetup/sapjjobdetail/' + reportnumber, { busy: true }, function (data) {
            self.jobDetaildataset = data.sapjjobdetail;
            if (self.jobDetaildataset) {
               self.selectedSAPJobDetail = self.jobDetaildataset[0];
               //self.jobDetailGrid.selectRow(self.jobDetaildataset.indexOf(self.selectedSAPJobDetail));
               if (self.selectedSAPJobDetail) {
                  self.isFirstTime = true;
                  if (!self.selectedSAPJobDetail.emailhidden) {
                     self.emailhidden = false;
                  }
                  if (!self.selectedSAPJobDetail.faxhidden) {
                     self.faxhidden = false;
                  }
               }
               else {
                  self.emailhidden = true;
                  self.faxhidden = true;
               }
            }
         });
      }
      else if (self.selectedRecord) {

         self.rssjCriteria = {inquiry: true, groupnm: self.selectedRecord.jobnm, timezoneclient: base.criteria.timezoneclient
         };
         self.subtitle = self.selectedRecord.jobnm;
         DataService.post('api/rs/asrssetup/rssjjobgroupdetail', { data: self.rssjCriteria, busy: true }, function (data) {
            if (data) {
               self.selectedGroupRecord = data;
               if (!data.lastruntm) {
                  self.selectedGroupRecord.lastruntm = '00:00';
               }
            }
         });
      }
   }

   self.jobDetailSelected = function () {
      if (!self.isFirstTime) {
         self.selectedSAPJobDetail = GridService.getSelectedRecord(self.jobDetailGrid);

         if (self.selectedSAPJobDetail) {
            if (!self.selectedSAPJobDetail.emailhidden) {
               self.emailhidden = false;
            }
            if (!self.selectedSAPJobDetail.faxhidden) {
               self.faxhidden = false;
            }
         }
         else {
            self.emailhidden = true;
            self.faxhidden = true;
         }
      }
      else {
         self.isFirstTime = false;
      }

   };

   // Change printer
   self.validatePrinterSettings = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printerFinalSettings = data.printerDetails;
         }
      });
   };

   self.rsaaChangeSelectedPrinters = function () {
      var selectedRecordCount = GridService.getSelectedRecords(base.grid).length;
      var rsaaactivityChangePrinterList = GridService.getSelectedRecords(base.grid);

      // TO DO: need to verify why it is not validating.vl look into the same later.
      // Now it vl do server side validation
      // self.validatePrinterSettings();

      var printerCollection = [];
      self.printerFinalSettings = self.printerControl.printerSettings;

      printerCollection.push(self.printerFinalSettings);

      var printerObject = { rsaaactivity: rsaaactivityChangePrinterList, printersettings: self.printerFinalSettings, iNbrRcds: selectedRecordCount };

      DataService.post('api/rs/asrssetup/rsaachangeselectedprinters', { data: printerObject, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('rsaa.master');
      });
   };
});
