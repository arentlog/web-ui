'use strict';

/**
 * Report Wizard states are created lazily (when a particular report function is navigated to)
 * so that we don't unnecessarily create these states for all 600+ report functions.
 */
app.run(['$rootScope', 'State', 'MessageService', 'ReportService', function ($rootScope, StateProvider, MessageService, ReportService) {
   $rootScope.$on('$stateNotFound', function (event, unfoundState) {
      var baseState = unfoundState.to.split('.')[0];

      // If state not found and is a report function, then create the report function states "just in time"
      if (ReportService.isReportFunction(baseState)) {
         var reportFn = baseState;

         StateProvider.addBaseState('shared', reportFn, {
            baseView: 'ui/app/modules/shared/report-wizard/layout.html',
            baseController: 'ReportWizardBaseCtrl as base',
            tabTitle: 'title.report'
         });

         StateProvider.addMasterState('shared', reportFn, {
            view: 'shared/report-wizard/master.json',
            controller: 'ReportWizardMasterCtrl as mst',
            data: {
               screenId: 'sx_' + reportFn + '-master' // master screen id is specific, but the rest are generic
            }
         });

         StateProvider.addState(reportFn + '.info', {
            url: '/info',
            views: {
               detail: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/info.json');
                  },
                  controller: 'ReportWizardInfoCtrl as info'
               }
            },
            data: {
               screenId: 'sx_report-info'
            }
         });

         StateProvider.addState(reportFn + '.ranges', {
            url: '/ranges',
            views: {
               detail: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/ranges.json');
                  },
                  controller: 'ReportWizardRangesCtrl as rngs'
               }
            },
            data: {
               screenId: 'sx_report-ranges'
            }
         });

         StateProvider.addState(reportFn + '.options', {
            url: '/options',
            views: {
               detail: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/options.json');
                  },
                  controller: 'ReportWizardOptionsCtrl as opts'
               }
            },
            data: {
               screenId: 'sx_report-options'
            }
         });

         StateProvider.addState(reportFn + '.options.printer-options', {
            url: '/printer-options',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/printer-options.json');
                  },
                  controller: 'ReportWizardPrinterOptionsCtrl as print'
               }
            },
            data: {
               screenId: 'sx_report-options-printer-options'
            }
         });

         //Begin List Option States

         StateProvider.addState(reportFn + '.options.sapb4', {
            url: '/sapb4',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapb4.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbbn', {
            url: '/sapbbn',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbbn.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbc', {
            url: '/sapbc',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbc.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbf', {
            url: '/sapbf',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbf.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbh', {
            url: '/sapbh',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbh.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbj', {
            url: '/sapbj',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbj.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbjc', {
            url: '/sapbjc',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbjc.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbk', {
            url: '/sapbk',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbk.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbl', {
            url: '/sapbl',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbl.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbm', {
            url: '/sapbm',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbm.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbo', {
            url: '/sapbo',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbo.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbp', {
            url: '/sapbp',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbp.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbpl', {
            url: '/sapbpl',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbpl.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbpr', {
            url: '/sapbpr',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbpr.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbr', {
            url: '/sapbr',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbr.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbrp', {
            url: '/sapbrp',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbrp.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbs', {
            url: '/sapbs',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbs.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbtrans', {
            url: '/sapbtrans',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbtrans.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbuser', {
            url: '/sapbuser',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbuser.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbv', {
            url: '/sapbv',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbv.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbv.invoice-selection', {
            url: '/invoice-selection',
            views: {
               invoices: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/invoice-selection.json');
                  },
                  controller: 'VenderInvoiceSelectionCtrl as inv'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options-invoice-selection'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbva', {
            url: '/sapbva',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbva.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbvc', {
            url: '/sapbvc',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbvc.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbvn', {
            url: '/sapbvn',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbvn.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         StateProvider.addState(reportFn + '.options.sapbw', {
            url: '/sapbw',
            views: {
               listview: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/lists/sapbw.json');
                  },
                  controller: 'ReportWizardListProcCtrl as list'
               }
            },
            data: {
               screenId: 'sx_report-options-list-options'
            }
         });

         //End List Option States

         StateProvider.addState(reportFn + '.run', {
            url: '/run',
            views: {
               detail: {
                  templateProvider: function (JsonViewService) {
                     return JsonViewService.getView('shared/report-wizard/run.json');
                  },
                  controller: 'ReportWizardRunCtrl as run'
               }
            },
            data: {
               screenId: 'sx_report-run'
            }
         });
      }
   });
}
]);

app.controller('ReportWizardBaseCtrl', function ($scope, $state, AodataService, DataService, MessageService, ReportService, TabService) {
   var self = this;
   var baseState = TabService.getBaseState($scope);
   var menuFn = TabService.getMenuFunction($scope);

   // Set general info about report menu function
   var reportFunction = ReportService.getReportFunction(menuFn);
   self.functionName = menuFn;
   self.functionTitle = reportFunction.menutitle;

   // Order Fulfillment is turned on and Billing with Consolidated Invoicing
   self.isOrderFulfillmentOn = AodataService.getValue("OE", "OEOrderFulfillment").toLowerCase() === 'yes';
   self.isAOConsolFulfillmentOn = AodataService.getValue("OE", "OEFulfillmentBilling").toLowerCase() === 'yes';

   self.isMaster = function () {
      return $state.is(menuFn + '.master');
   };

   self.includesMaster = function () {
      return $state.includes(menuFn + '.master');
   };

   self.isInfo = function () {
      return $state.is(menuFn + '.info');
   };

   self.isRanges = function () {
      return $state.is(menuFn + '.ranges');
   };

   self.isOptions = function () {
      return $state.is(menuFn + '.options');
   };

   self.isList = function () {
      return $state.includes(menuFn + '.options') && !self.isOptions();
   };

   self.isRun = function () {
      return $state.is(menuFn + '.run');
   };

   self.isCreateOneTime = function () {
      return self.operation === 'ONCE';
   };

   self.isCreateStored = function () {
      return self.operation === 'STORED';
   };

   self.isCopyOneTime = function () {
      return self.operation === 'ONCE-COPY';
   };

   self.isCopyStored = function () {
      return self.operation === 'STORED-COPY';
   };

   self.isEdit = function () {
      return self.operation === 'Modify';
   };

   // Convenient way to know which step in the wizard process we are on
   self.getStep = function () {
      if (self.isMaster()) {
         return 1;
      }
      if (self.isInfo()) {
         return 2;
      }
      if (self.isRanges()) {
         return 3;
      }
      if (self.isOptions() || self.isList()) {
         return 4;
      }
      if (self.isRun()) {
         return 5;
      }
   };

   // Get the sub title to display in the header toolbar for info, ranges, options, run screens
   // which is either the name of the selected report, or New for new reports
   self.getSubTitle = function () {
      return self.selectedReport ? self.selectedReport.reportnm : MessageService.get('global.new');
   };

   // Cancel out of an operation
   self.cancel = function () {
      // Unlock report if was editing
      if (self.isEdit()) {
         var params = {
            cReportName: self.selectedReport.reportnm
         };
         DataService.get('api/shared/assharedentry/reportwizardunlockreportrecord/{cReportName}', { pathParams: params });
      }
      self.selectedReport = null;
      $state.go('^.master');
   };

   self.addPrinterOption = function (option) { //option is the option object
      var printerCriteria = {};
      if (!self.printerOptionSettings) {
         self.printerOptionSettings = [];
      }
      if (self.isEdit() || self.isCopyOneTime() || self.isCopyStored() || self.functionName.toLowerCase() === 'icepp') {
         printerCriteria = { cFunctionName: self.functionName, cSubFunction: option.optionname, cReportName: self.finishCriteria.origreportnm };
         DataService.post('api/shared/assharedentry/printerinitialize', { data: printerCriteria, busy: true }, function (data) {
            if (data) {
               var setting = {
                  emailaddr: data.emailaddr,
                  faxcom: data.faxcom,
                  faxfrom: data.faxfrom,
                  faxphoneno: data.faxphoneno,
                  faxpriority: data.faxpriorityfl,
                  faxto1: data.faxto1,
                  faxto2: data.faxto2,
                  printtype: data.printtype,
                  printoptfl: data.printoptfl,
                  printerinstance: option.optionname,
                  optionnumber: option.optionnumber,
                  queue: data.queue,
                  printtypes: data.printtypes
               };
               if (data.outputover && data.outputover.toLowerCase() === 'text') {
                  setting.outputover = true;
               }
               if (data.filefl) {
                  setting.flatfilenm = data.printernm;
               } else {
                  setting.printernm = data.printernm;
               }
               self.printerOptionSettings.push(setting);
            }
         });
      } else {
         printerCriteria = { cFunctionName: self.functionName, cSubFunction: option.optionname, cReportName: self.finishCriteria.origreportnm };
         DataService.post('api/shared/assharedentry/printerinitialize', { data: printerCriteria, busy: true }, function (data) {
            if (data) {
               var setting = {
                  printtype: data.printtype,
                  printerinstance: option.optionname,
                  printtypes: data.printtypes,
                  filefl: data.filefl
               };
               if (setting.printtype === 'o') {
                  setting.flatfilenm = data.printernm;
               }
               else if (data.printernm === '*whse*') { // *whse* is returned when no default forms printer is found
                  setting.printtype = 'v'; // set print type to 'view' so that validation will not require entering a valid printer
               } else if (self.functionName.toLowerCase() === 'apec') { // Check remittance print needs to allow blank printer
                  setting.printtype = 'v'; // set print type to 'view' so that validation will not require a check remittance printer
               } else {
                  setting.printernm = data.printernm;
               }
               self.printerOptionSettings.push(setting);
            }
         });
      }
   };

   // Set up tab closing prevention
   TabService.canUserCloseTab(baseState, function () {
      if (self.selectedReport) {
         MessageService.error('global.error', 'global.report.is.still.locked');
         return false;
      } else {
         return true;
      }
   });
});

app.controller('ReportWizardStepCtrl', function ($scope) {
   var self = this;
   var base = $scope.base;

   self.getStepClass = function (step) {
      var currentStep = base.getStep();

      if (base.isList() || currentStep < step) {
         return 'is-disabled';
      }
      if (currentStep === step) {
         return 'is-selected';
      }
      if (currentStep > step) {
         return '';
      }
   };

   self.getStepIcon = function (step) {
      var currentStep = base.getStep();

      if (currentStep < step) {
         return '#icon-empty-circle';
      }
      if (currentStep === step) {
         return '#icon-in-progress';
      }
      if (currentStep > step) {
         return '#icon-confirm';
      }
   };
});

app.controller('ReportWizardMasterCtrl', function ($scope, $state, $stateParams, AuthService, ConfigService, DataService, GridService, MessageService, UserService, Utils) {
   var self = this;
   var base = $scope.base;
   var params = {
      cono: UserService.getCono(),
      currproc: base.functionName,
      altproc: (base.functionName.toLowerCase() === 'apep') ? 'aprc' : '',
      batchsize: ConfigService.getReportRecordLimit()
   };

   // Get Server TZ setting
   DataService.get('/web/api/shared/TZRetrieveServer', { data: self, busy: true }, function (data) {
      if (data) {
         base.servertz = data.TimeZone * -1;
         self.refreshList();
      }
   });
   // Load DST Setting
   DataService.get('api/shared/assharedentry/aosystemload', { busy: true }, function (data) {
      if (data) {
         base.enableDST = data.lDSTEnableFl;
      }
   });

   // Get list of reports by function.  It will use the 'ReportRecordLimit' or if that is zero, then it
   // will fall back to the 'DefaultRecordLimit' business rule.
   self.getReports = function () {
      var dateToday = new Date();
      var clienttz = dateToday.getTimezoneOffset();
      var lastRunHour = "";
      var lastRunDecHour = 0.0;
      var i = 0;
      var length = 0;
      var offsetChange = (base.servertz - clienttz) / 60;
      if (base.enableDST) {
         offsetChange = offsetChange - 1;
      }
      DataService.post('api/sa/sapb/getsapbbyconoreportfunctionaltreport', { data: params, busy: true }, function (data) {

         length = data.length;
         for (i = 0; i < length; i++) {
            var record = data[i];
            if (offsetChange !== 0) {
               lastRunHour = record.lastruntm.substr(0, 2);
               lastRunDecHour = parseFloat(lastRunHour) + offsetChange;
               if (lastRunDecHour < 0) {
                  // Subtract a day from rundate
                  record.lastrundt = Utils.addSubtractDaysToDate(record.lastrundt, -1);
               }
               if (lastRunDecHour > 24) {
                  // Add a day to rundate
                  record.lastrundt = Utils.addSubtractDaysToDate(record.lastrundt, 1);
               }
            }

         }
         base.dataset = data;
         //Clear any residual data (i.e. after a copy occurred)
         base.selectedReport = null;
      });
   };

   self.refreshList = function () {
      var sassmparams = {
         menuSet: 'WEB',
         functionName: base.functionName,
         trmgrlang: '',
         fldlist: 'browseName'
      };
      DataService.get('api/pv/pvsassm/getbypk', { params: sassmparams, busy: true }, function (sassm) {
         if (sassm) {
            params.currproc = sassm.browseName;
            self.getReports();
         }
      });
   };

   self.create = function (isStored) {
      base.selectedReport = null;
      base.operation = isStored ? 'STORED' : 'ONCE';
      self.goToInfo();
   };

   self.copy = function (isStored) {
      var record = GridService.getSelectedRecord(base.grid);

      if (record) {
         base.selectedReport = record;
         base.operation = isStored ? 'STORED-COPY' : 'ONCE-COPY';
         self.goToInfo();
      }
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.grid);

      if (record) {
         var callback = function () {
            base.selectedReport = record;
            base.operation = 'Modify';
            self.goToInfo();
         };
         if (record.operinit !== UserService.getUserName()) {
            AuthService.createAuthPoint('sapb', 'report-wizard', 'stored-copy', '', '', null, function () {
               callback();
            });
         } else {
            callback();
         }
      }
   };

   self.delete = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var callback = function () {
               var pathParams = {
                  cReportName: record.reportnm
               };
               DataService.get('api/shared/assharedentry/reportwizarddeletereport/{cReportName}', { pathParams: pathParams, busy: true }, function () {
                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  $state.go('^.master', null, { reload: '^.master' });
               });
            };
            if (record.operinit !== UserService.getUserName()) {
               AuthService.createAuthPoint('sapb', 'report-wizard', 'stored-copy', '', '', null, function () {
                  callback();
               }, function () {
                  //fail
               });
            } else {
               callback();
            }

         });
      }
   };

   // Proceed to info state after operation is chosen
   self.goToInfo = function () {
      // Clear report data since we're doing a new operation
      base.reportDefn = null;
      base.finishCriteria = null;
      base.printerControlSettings = null; // the internal settings of the printer control that we hold onto
      base.printerSettingsValidated = null; // the validated settings to send to the finish api call
      self.printerOptionSettings = []; // the printer settings for any printer options (will be merged with printerSettingsValidated)

      $state.go('^.info');
   };
});

app.controller('ReportWizardInfoCtrl', function ($scope, $state, $stateParams, DataService) { //as info
   var self = this;
   var base = $scope.base;
   self.dateToday = new Date();

   // Get report definition data (unless it was already retrieved, like when going from ranges state back to info)
   if (!base.reportDefn) {
      var criteria = {
         currproc: base.functionName,
         operation: base.operation,
         origreportnm: base.selectedReport ? base.selectedReport.reportnm : '',
         timezoneclient: (self.dateToday.getTimezoneOffset() * -1)
      };

      DataService.post('api/shared/assharedentry/reportwizarddefinition', { data: criteria, busy: true }, function (data) {
         var i, length, fld;
         base.reportDefn = data;

         // Initialize the finish criteria object
         base.finishCriteria = {
            currproc: base.functionName,
            operation: base.operation,
            origreportnm: base.selectedReport ? base.selectedReport.reportnm : '',
            latestreportnm: base.selectedReport ? base.selectedReport.reportnm : '',
            onetimefl: base.isCreateOneTime() || base.isCopyOneTime() ? true : false,
            rpttitle: data.reptwizarddefnheader.rpttitle,
            batchnm: data.reptwizarddefnheader.batchnm,
            priority: data.reptwizarddefnheader.priority,
            removefl: (base.isCreateOneTime() || base.isCopyOneTime()),
            starttm: data.reptwizarddefnheader.starttm,
            starttm2: data.reptwizarddefnheader.starttm2,
            startdt: data.reptwizarddefnheader.startdt,
            starttype: data.reptwizarddefnheader.starttype,
            timezoneclient: criteria.timezoneclient
         };

         // unload report name for stored copy, will need new name
         if (base.isCopyStored()) {
            base.finishCriteria.latestreportnm = '';
         }


         // If one-time operation, get next available report name
         if (base.finishCriteria.removefl) {
            base.oneTime = true;
            DataService.get('api/shared/assharedentry/reportwizardnextreportname', function (data) {
               base.finishCriteria.latestreportnm = data;
            });
         } else {
            base.oneTime = false;
         }

         // Initialize current range field values
         base.ranges = {};
         length = base.reportDefn.reptwizarddefnranges.length;
         for (i = 0; i < length; i++) {
            fld = base.reportDefn.reptwizarddefnranges[i];
            if (fld.rangebegvalue === '0.00000') {
               fld.rangebegvalue = '';
            } else if (fld.rangebegvalue === '0' && fld.rangename !== 'Stage Code' && !fld.rangerequired) { // Don't blank out zeros for required fields
               fld.rangebegvalue = '';
            } else if (fld.rangebegvalue === '01/01/50') {
               fld.rangebegvalue = '';
            } else if (fld.rangebegvalue === '0150') {
               fld.rangebegvalue = '';
            } else if (fld.rangebegvalue === '1950') {
               fld.rangebegvalue = '';
            }
            if (fld.rangeendvalue === '~~~~~~~~~~~~~~~~~~~~~~~~') {
               fld.rangeendvalue = '';
            } else if (fld.rangeendvalue === '999999999999.99999') {
               fld.rangeendvalue = '';
            } else if (fld.rangeendvalue === '999999999999') {
               fld.rangeendvalue = '';
            } else if (fld.rangeendvalue === '12/31/49') {
               fld.rangeendvalue = '';
            } else if (fld.rangeendvalue === '1349') {
               fld.rangeendvalue = '';
            } else if (fld.rangeendvalue === '2049') {
               fld.rangeendvalue = '';
            }
            base.ranges['fieldBeg' + fld.rangenumber] = fld.rangebegvalue;
            base.ranges['fieldEnd' + fld.rangenumber] = fld.rangeendvalue;
         }

         // Initialize current option field values
         base.options = {};
         base.printerOptionSettings = [];
         length = base.reportDefn.reptwizarddefnoptions.length;
         for (i = 0; i < length; i++) {
            fld = base.reportDefn.reptwizarddefnoptions[i];
            base.options['field' + fld.optionnumber] = fld.optionvalue;
            if (fld.optiontype.toLowerCase() === 'r') {
               base.addPrinterOption(fld);
            }
         }

         // Initialize list option table
         base.listOptionValues = data.reptwizardlistproc;

         // Lock report if editing
         if (base.isEdit()) {
            var params = {
               cReportName: base.selectedReport.reportnm
            };
            // TODO: does backend allow slash chars in reportnm? if so need to change api to post (check delete call too)
            DataService.get('api/shared/assharedentry/reportwizardlockreportrecord/{cReportName}', { pathParams: params });
         }
      }, function error() {
         // If 'report currently in use' error happens, go back to master state
         // clear selected report as no report is being edited, like a save/cancel would do
         base.selectedReport = null;
         $state.go('^.master');
      });
   }

   self.goToPrevious = function () {
      base.cancel();
   };

   self.goToNext = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            base.printerSettingsValidated = data.printerDetails;
            if (base.reportDefn.reptwizarddefnranges.length) {
               $state.go('^.ranges');
            } else if (base.reportDefn.reptwizarddefnoptions.length) {
               $state.go('^.options');
            } else {
               $state.go('^.run');
            }
         }
      });
   };
});

app.controller('ReportWizardRangesCtrl', function ($scope, $state, DataService, MessageService, ReportWizardService) {
   var self = this;
   var base = $scope.base;

   if (base.reportDefn.reptwizarddefnranges.length === 0) {
      if (base.reportDefn.reptwizarddefnoptions.length) {
         $state.go('^.options');
      } else {
         $state.go('^.run');
      }
   }

   self.goToPrevious = function () {
      $state.go('^.info');
   };

   self.fieldBegLeave1 = function () {
      base.ranges.fieldEnd1 = base.ranges.fieldEnd1 ? base.ranges.fieldEnd1 : base.ranges.fieldBeg1;
   };
   self.fieldBegLeave2 = function () {
      base.ranges.fieldEnd2 = base.ranges.fieldEnd2 ? base.ranges.fieldEnd2 : base.ranges.fieldBeg2;
   };
   self.fieldBegLeave3 = function () {
      base.ranges.fieldEnd3 = base.ranges.fieldEnd3 ? base.ranges.fieldEnd3 : base.ranges.fieldBeg3;
   };
   self.fieldBegLeave4 = function () {
      base.ranges.fieldEnd4 = base.ranges.fieldEnd4 ? base.ranges.fieldEnd4 : base.ranges.fieldBeg4;
   };
   self.fieldBegLeave5 = function () {
      base.ranges.fieldEnd5 = base.ranges.fieldEnd5 ? base.ranges.fieldEnd5 : base.ranges.fieldBeg5;
      base.ranges.fieldbeg5 = base.ranges.fieldBeg5;
   };
   self.fieldBegLeave6 = function () {
      base.ranges.fieldEnd6 = base.ranges.fieldEnd6 ? base.ranges.fieldEnd6 : base.ranges.fieldBeg6;
   };
   self.fieldBegLeave7 = function () {
      base.ranges.fieldEnd7 = base.ranges.fieldEnd7 ? base.ranges.fieldEnd7 : base.ranges.fieldBeg7;
   };
   self.fieldBegLeave8 = function () {
      base.ranges.fieldEnd8 = base.ranges.fieldEnd8 ? base.ranges.fieldEnd8 : base.ranges.fieldBeg8;
   };
   self.fieldBegLeave9 = function () {
      base.ranges.fieldEnd9 = base.ranges.fieldEnd9 ? base.ranges.fieldEnd9 : base.ranges.fieldBeg9;
   };
   self.fieldBegLeave10 = function () {
      base.ranges.fieldEnd10 = base.ranges.fieldEnd10 ? base.ranges.fieldEnd10 : base.ranges.fieldBeg10;
   };
   self.fieldBegLeave11 = function () {
      base.ranges.fieldEnd11 = base.ranges.fieldEnd11 ? base.ranges.fieldEnd11 : base.ranges.fieldBeg11;
   };
   self.fieldBegLeave12 = function () {
      base.ranges.fieldEnd12 = base.ranges.fieldEnd12 ? base.ranges.fieldEnd12 : base.ranges.fieldBeg12;
   };
   self.fieldBegLeave13 = function () {
      base.ranges.fieldEnd13 = base.ranges.fieldEnd13 ? base.ranges.fieldEnd13 : base.ranges.fieldBeg13;
   };
   self.fieldBegLeave14 = function () {
      base.ranges.fieldEnd14 = base.ranges.fieldEnd14 ? base.ranges.fieldEnd14 : base.ranges.fieldBeg14;
   };
   self.fieldBegLeave15 = function () {
      base.ranges.fieldEnd15 = base.ranges.fieldEnd15 ? base.ranges.fieldEnd15 : base.ranges.fieldBeg15;
   };
   self.fieldBegLeave16 = function () {
      base.ranges.fieldEnd16 = base.ranges.fieldEnd16 ? base.ranges.fieldEnd16 : base.ranges.fieldBeg16;
   };
   self.fieldBegLeave17 = function () {
      base.ranges.fieldEnd17 = base.ranges.fieldEnd17 ? base.ranges.fieldEnd17 : base.ranges.fieldBeg17;
   };
   self.fieldBegLeave18 = function () {
      base.ranges.fieldEnd18 = base.ranges.fieldEnd18 ? base.ranges.fieldEnd18 : base.ranges.fieldBeg18;
   };
   self.fieldBegLeave19 = function () {
      base.ranges.fieldEnd19 = base.ranges.fieldEnd19 ? base.ranges.fieldEnd19 : base.ranges.fieldBeg19;
   };
   self.fieldBegLeave20 = function () {
      base.ranges.fieldEnd20 = base.ranges.fieldEnd20 ? base.ranges.fieldEnd20 : base.ranges.fieldBeg20;
   };

   self.goToNext = function () {
      if (base.reportDefn.reptwizarddefnranges.length > 0) {
         var criteria = {
            reptwizardfinishranges: ReportWizardService.getFinishRanges(base.ranges, base.reportDefn.reptwizarddefnranges),
            reptwizardfinishcriteria: base.finishCriteria
         };

         // Validate ranges
         DataService.post('api/shared/assharedentry/reportwizardvalidateranges', { data: criteria, busy: true }, function (data) {
            var hasErrors = MessageService.processMessaging(data);

            if (!hasErrors) {
               if (base.reportDefn.reptwizarddefnoptions.length) {
                  $state.go('^.options');
               } else {
                  $state.go('^.run');
               }
            }
         });
      } else {
         if (base.reportDefn.reptwizarddefnoptions.length) {
            $state.go('^.options');
         } else {
            $state.go('^.run');
         }
      }
   };
});

app.controller('ReportWizardOptionsCtrl', function ($scope, $state, $translate, DataService, MessageService, ModalService, ReportWizardService) { //as opts
   var self = this;
   var base = $scope.base;

   if (base.reportDefn.reptwizarddefnoptions.length === 0) {
      $state.go('^.run');
   } else if (base.functionName.toLowerCase() === 'icepp') {
      if (base.printerOptionSettings && base.printerOptionSettings.length) {
         base.printerOptionSettings.forEach(function (printerDetails) {
            switch (printerDetails.printtype.toLowerCase()) {
               case 'e': //email                                                                                        //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = printerDetails.emailaddr;                       //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'o': //file                                                                                         //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = printerDetails.flatfilenm;                      //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'v': //view                                                                                         //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = $translate.instant('global.view');              //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'i': //ion                                                                                          //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = $translate.instant('global.ion');               //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'p': //print                                                                                        //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = printerDetails.printernm;                       //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'r': //receipt                                                                                      //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = printerDetails.printernm;                       //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'd': //device                                                                                       //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = printerDetails.printernm;                       //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'b': //Dropbox                                                                                      //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = $translate.instant('global.dropbox.printer');   //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
               case 'f': //fax                                                                                          //ignore jslint - correct indentation
               default:                                                                                                 //ignore jslint - correct indentation
                  base.options['field' + printerDetails.optionnumber] = printerDetails.faxphoneno;                      //ignore jslint - correct indentation
                  break;                                                                                                //ignore jslint - correct indentation
            }
         });

      }
   }

   self.yesNoOptions = [
      { label: $translate.instant('global.yes'), value: 'yes' },
      { label: $translate.instant('global.no'), value: 'no' }
   ];

   self.goToPrevious = function () {
      if (base.reportDefn.reptwizarddefnranges.length) {
         $state.go('^.ranges');
      } else {
         $state.go('^.info');
      }
   };

   self.goToNext = function () {
      if (base.reportDefn.reptwizarddefnoptions.length > 0) {
         base.reportDefn.reptwizarddefnoptions.forEach(function (opt) {
            if (opt.optiontype.toLowerCase() === 'd') {
               if (base.options['field' + opt.optionnumber].length === 6) {
                  var tmp = base.options['field' + opt.optionnumber];
                  base.options['field' + opt.optionnumber] = tmp.substr(0, 2) + '/' + tmp.substr(2, 2) + '/' + tmp.substr(4, 2);
               }
            }
         });
         var criteria = {
            reptwizardfinishoptions: ReportWizardService.getFinishOptions(base.options, base.reportDefn.reptwizarddefnoptions),
            reptwizardfinishcriteria: base.finishCriteria
         };

         // Validate options
         DataService.post('api/shared/assharedentry/reportwizardvalidateoptions', { data: criteria, busy: true }, function (data) {
            var hasErrors = MessageService.processMessaging(data);

            if (!hasErrors) {
               $state.go('^.run');
            }
         });
      } else {
         $state.go('^.run');
      }
   };

   self.listButton = function (listProc) {
      if (listProc.toLowerCase() === 'sapbx') {
         self.typeList = [];
         if (base.functionName.toLowerCase() === 'poerm') {
            self.typeList.push({ name: $translate.instant('global.report.numbers'), type: 'sapbrp' }, { name: $translate.instant('global.warehouse'), type: 'sapbh' });
         } else if (base.functionName.toLowerCase() === 'ibrp') {
            self.typeList.push({ name: $translate.instant('global.order'), type: 'sapbo' }, { name: $translate.instant('do.transfer'), type: 'sapbw' });
         } else {
            self.typeList.push({ name: $translate.instant('global.product'), type: 'sapbpr' }, { name: $translate.instant('global.product.line'), type: 'sapbpl' });
         }
         self.selectedListType = null;
         base.listOptionValues.forEach(function (row) {
            if (self.typeList.indexOf(row.listproc) !== -1) {
               self.selectedListType = row.listproc;
            }
         });
         if (!self.selectedListType) {
            self.selectedListType = self.typeList[0].type;
         }
         ModalService.showModal('shared/report-wizard/list-type-modal.json', 'ReportWizardListTypeModalCtrl as mod', $scope, function (modal) {
            self.listTypeModal = modal;
         });
      } else {
         if (listProc.toLowerCase() === 'sapbvc') {
            if (base.options && base.options.field1) {
               listProc = (base.options.field1.toLowerCase() === 'c') ? 'sapbc' : 'sapbvn';
            } 
         }
         self.goToListProcState(listProc);
      }
   };

   self.printerOptionsButton = function (optionNum) {
      var option = base.reportDefn.reptwizarddefnoptions.find(function (row) {
         return row.optionnumber === optionNum;
      });
      if (!option) {
         MessageService.error('global.error', 'global.no.records.found');
         return;
      }
      var settings = base.printerOptionSettings.find(function (row) {
         return row.printerinstance === option.optionname;
      });
      self.printOptions = {
         option: option,
         settings: settings
      };
      $state.go('.printer-options');
   };

   self.goToListProcState = function (listProc) {
      $state.go('.' + listProc.toLowerCase());
   };
}); //end opts

app.controller('ReportWizardListTypeModalCtrl', function ($scope, $translate, MessageService) { //as mod
   var self = this;
   var base = $scope.base;
   var parent = $scope.opts;

   self.cancel = function () {
      parent.listTypeModal.destroy();
   };

   var getOpposite = function () {
      if (parent.selectedListType === parent.typeList[0].type) {
         return parent.typeList[1];
      } else {
         return parent.typeList[0];
      }
   };

   self.submit = function () {
      var oppositesExist = false;
      var opposite = getOpposite().type;
      base.listOptionValues.forEach(function (row) {
         if (row.listproc === opposite) {
            oppositesExist = true;
         }
      });
      if (oppositesExist) {
         var question = $translate.instant('message.you.already.have') +
            ' "' + getOpposite().name + '" ' +
            $translate.instant('message.selected.in.the.list') +
            $translate.instant('question.would.you.like.to.clear.these');
         MessageService.okCancel('global.clear.list', question, function () {
            var newList = [];
            base.listOptionValues.forEach(function (row) {
               if (row.listproc !== opposite) {
                  newList.push(row);
               }
            });
            base.listOptionValues = newList;
            self.continue();
         }, function () {
            self.continue();
         });
      } else {
         self.continue();
      }
   };

   self.continue = function () {
      parent.goToListProcState(parent.selectedListType);
      parent.listTypeModal.destroy();
   };
}); //end mod

app.controller('ReportWizardRunCtrl', function ($scope, $state, DataService, MessageService, ReportWizardService) {
   var self = this;
   var base = $scope.base;
   self.isRemoveDisabled = base.isCopyOneTime();

   self.goToPrevious = function () {
      if (base.reportDefn.reptwizarddefnoptions.length) {
         $state.go('^.options');
      } else if (base.reportDefn.reptwizarddefnranges.length) {
         $state.go('^.ranges');
      } else {
         $state.go('^.info');
      }
   };
   self.submit = function () {
      // Unlock report if editing
      if (base.isEdit()) {
         var params = {
            cReportName: base.selectedReport.reportnm
         };
         DataService.get('api/shared/assharedentry/reportwizardunlockreportrecord/{cReportName}', { pathParams: params }, function () { //report needs to be unlocked in order to run the finish call
            self.finish();
         });
      } else {
         self.finish();
      }
   };

   self.finish = function () {
      var finishPrinterSettings = [base.printerSettingsValidated];
      if (base.printerOptionSettings && base.printerOptionSettings.length) {
         finishPrinterSettings = finishPrinterSettings.concat(base.printerOptionSettings);
      }
      var finishReq = {
         printersettings: finishPrinterSettings,
         reptwizardfinishranges: ReportWizardService.getFinishRanges(base.ranges, base.reportDefn.reptwizarddefnranges),
         reptwizardfinishoptions: ReportWizardService.getFinishOptions(base.options, base.reportDefn.reptwizarddefnoptions),
         reptwizardlistproc: base.listOptionValues,
         reptwizardfinishcriteria: base.finishCriteria
      };

      DataService.post('api/shared/assharedentry/reportwizardfinish', { data: finishReq, busy: true }, function (data) {
         var hasErrors = MessageService.processMessaging(data);

         if (!hasErrors) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.selectedReport = null;
            // Reload master state
            $state.go('^.master', null, { reload: '^.master' });
         } else {
            self.relock();
         }
      }, function () {
         self.relock();
      });
   };

   self.relock = function () { //if the finish call fails, we need to re-lock the report
      if (base.isEdit()) {
         var params = {
            cReportName: base.selectedReport.reportnm
         };
         DataService.get('api/shared/assharedentry/reportwizardlockreportrecord/{cReportName}', { pathParams: params });
      }
   };
});

app.controller('ReportWizardListProcCtrl', function ($filter, $scope, $state, $timeout, $translate, DataService, GridService, MessageService, ReportWizardService, UserService, Utils) { //as list
   /*
   Much of this is built using the logic in Silverlight (in report.client, "DynamicReportWizardListPopView[Model]")
   */
   var self = this;
   var base = $scope.base;
   self.listproc = $state.current.url.substr(1);
   self.record = {};
   self.allowFocus = true;
   self.selectedtype = '';

   self.initetccTransactionType = function () {
      DataService.post('api/edi/asedientry/etcctransactiontypedropdown', { data: { cModule: self.record.disponly1, cProcType: self.record.disponly2 }, busy: true }, function (data) {
         self.transactionTransactionTypes = [];
         self.transactionTransactionTypesList = [];
         data.forEach(function (item) {
            if (item.descrip !== '<All>') {
               self.transactionTransactionTypesList.push(item);
               self.transactionTransactionTypes.push({ label: item.descrip, value: item.id });
            }
         });
         //make disp3/selected value the first one in the list:
         self.record.disponly3 = self.transactionTransactionTypes[0].value;
      });
   };

   self.initetccProcessType = function () {
      DataService.post('api/edi/asedientry/etccprocesstypedropdown', { data: { cModule: self.record.disponly1 }, busy: true }, function (data) {
         self.transactionProcTypes = [];
         data.forEach(function (item) {
            self.transactionProcTypes.push({ label: item.descrip, value: item.id });
         });
         //make disp2/selected value the first one in the list:
         self.record.disponly2 = self.transactionProcTypes[0].value;
         //build Transaction Type Drop Down options (need the above):
         self.initetccTransactionType();
      });
   };

   self.initetccModule = function () {
      DataService.get('api/edi/asedientry/etccmoduledropdown', { busy: true }, function (data) {
         self.transactionModules = [];
         data.forEach(function (item) {
            if (item.descrip !== '<All>') {
               self.transactionModules.push({ label: item.descrip, value: item.id });
            }
         });
         //make disp1/selected value the first one in the list:
         self.record.disponly1 = self.transactionModules[0].value;
         //build Transacction Process Type Drop Down options (need the above):
         self.initetccProcessType();
      });
   };

   self.checkSapbs = function () {
      DataService.post('api/shared/assharedentry/reportwizardenablesapbs', { data: { reportnm: self.record.name }, busy: true }, function (data) {
         self.enableSapbsCono = data.enablecono;
         self.record.disponly2 = (data.cono > 0) ? data.cono : '';
      });
   };

   if (self.listproc) {
      switch (self.listproc.toLowerCase()) {
         case 'sapbl':                                            //ignore jslint - correct indentation
            self.record.selecttype = '';                          //ignore jslint - correct indentation
            break;                                                //ignore jslint - correct indentation
         case 'sapbs':                                            //ignore jslint - correct indentation
            self.checkSapbs();                                    //ignore jslint - correct indentation
            break;                                                //ignore jslint - correct indentation
         case 'sapbtrans':                                        //ignore jslint - correct indentation
            self.initetccModule();                                //ignore jslint - correct indentation
            break;                                                //ignore jslint - correct indentation
         case 'sapbm':                                            //ignore jslint - correct indentation
            self.selectedtype = self.record.selecttype = 'O';     //ignore jslint - correct indentation
            break;                                                //ignore jslint - correct indentation
      }
      //split out records for this list (in case more than one list option)
      self.dataset = []; //records for this list
      self.unused = []; //records for other lists
      self.invoices = []; //records for invoices for sapbv
      base.listOptionValues.forEach(function (row) {
         if (row.listproc.toLowerCase() === self.listproc) {
            if (self.listproc.toLowerCase() === 'sapbv' && !row.type) {
               self.invoices.push(row);
            } else {
               self.dataset.push(row);
            }
         } else {
            self.unused.push(row);
         }
      });
   }
   // This is used to get the Last Open Suffix in SAPBP
   self.getLastPOSuffix = function () {
      //getting the last purchase order suffix.
      var pono = 0;
      var posuf = 0;
      if (self.record.order) {
         var poParts = self.record.order.split('-');
         if (poParts.length === 2) {
            pono = parseInt(poParts[0], 10);
            posuf = parseInt(poParts[1], 10);
         }

         var criteria = {
            pono: pono,
            posuf: posuf,
            ponumbersuffix: ''
         };

         var crit = {
            ttblpoehposuffix: criteria
         };
         DataService.post('/web/api/po/poehgetlastposuffix', { data: crit, busy: true }, function (data) {
            if (data) {
               if (data.ttblpoehposuffix && data.ttblpoehposuffix.ponumbersuffix) {
                  self.record.order = data.ttblpoehposuffix.ponumbersuffix;
               }
            }
         });
      }
   };

   self.addRecord = function () {
      self.allowFocus = false;
      switch (self.listproc) {
         //in alphabetic order
         case 'sapb4':                                                                    //ignore jslint - correct indentation
            self.getSasta(self.record.prodcat);                                           //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbbn':                                                                   //ignore jslint - correct indentation
            if (self.record.prodcat.length === 10) {                                      //ignore jslint - correct indentation
               /* The following is code from Silverlight that does not seem to serve a purpose in the progress code or elsewhere:
                     self.record.disponly1 = self.record.prodcat.substr(8, 2)
                        + '/' + self.record.prodcat.substr(6, 2)
                        + '/' + self.record.prodcat.substr(4, 3)
                        + '/' + self.record.prodcat.substr(1, 3);
                  */
               self.addReportWizard();                                                    //ignore jslint - correct indentation
            } else {                                                                      //ignore jslint - correct indentation
               MessageService.error('global.error', 'global.bin.location.is.required');   //ignore jslint - correct indentation
            }                                                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbc':                                                                    //ignore jslint - correct indentation
            self.getArsc(self.record.custno);                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbf':                                                                    //ignore jslint - correct indentation
            self.getSmsn(self.record.prodcat);                                            //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbh':                                                                    //ignore jslint - correct indentation
            self.getIcsd(self.record.apinvno);                                            //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbj':                                                                    //ignore jslint - correct indentation
            self.getSasj(self.record.jrnlno);                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbjc':                                                                   //ignore jslint - correct indentation
            self.getArsc(self.record.vendno);                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbk':                                                                    //ignore jslint - correct indentation
            self.getKpet(self.record.order);                                              //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbl':                                                                    //ignore jslint - correct indentation
            self.getArsc(self.record.vendno);                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbm':                                                                    //ignore jslint - correct indentation
            switch (self.record.selecttype.toLowerCase()) {                               //ignore jslint - correct indentation
               case 'o':                                                                   //ignore jslint - correct indentation
                  self.oeehFetch(self.record.orderno, self.record.ordersuf);              //ignore jslint - correct indentation
                  break;                                                                  //ignore jslint - correct indentation
               case 't':                                                                  //ignore jslint - correct indentation
                  self.wtehFetch(self.record.orderno, self.record.ordersuf);              //ignore jslint - correct indentation
                  break;                                                                  //ignore jslint - correct indentation
               case 'p':                                                                  //ignore jslint - correct indentation
                  self.poehFetch(self.record.orderno, self.record.ordersuf);              //ignore jslint - correct indentation
                  break;                                                                  //ignore jslint - correct indentation
            }                                                                             //ignore jslint - correct indentation
            self.selectedtype = self.record.selecttype;
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbo':                                                                    //ignore jslint - correct indentation
            self.getOeeh(self.record.order);                                              //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbp':                                                                    //ignore jslint - correct indentation
            self.getPoeh(self.record.order);                                              //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbpl':                                                                   //ignore jslint - correct indentation
            if (self.record.disponly1) {                                                  //ignore jslint - correct indentation
               self.record.type = false;                                                  //ignore jslint - correct indentation
               self.record.apinvno = self.record.disponly1;                               //ignore jslint - correct indentation
               self.record.vendno = 0;                                                    //ignore jslint - correct indentation
               self.addReportWizard();                                                    //ignore jslint - correct indentation
            }                                                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbpr':                                                                   //ignore jslint - correct indentation
            self.getIcsp(self.record.apinvno);                                            //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbr':                                                                    //ignore jslint - correct indentation
            self.getWterah(self.record.vendno);                                           //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbrp':                                                                   //ignore jslint - correct indentation
            self.getPoerah(self.record.vendno);                                           //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbs':                                                                    //ignore jslint - correct indentation
            self.getSapb(self.record.name);                                               //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbtrans':                                                                //ignore jslint - correct indentation
            if (self.record.disponly1) {                                                  //ignore jslint - correct indentation
               self.record.type = true;                                                   //ignore jslint - correct indentation
               if (self.transactionTransactionTypesList) {                                //ignore jslint - correct indentation
                  self.transactionTransactionTypesList.forEach(function (type) {          //ignore jslint - correct indentation
                     if (type.id === self.record.disponly3) {                             //ignore jslint - correct indentation
                        self.record.disponly4 = type.descrip;                             //ignore jslint - correct indentation
                        self.record.name = type.descrip;                                  //ignore jslint - correct indentation
                        self.record.transtype = type.descrip;                             //ignore jslint - correct indentation
                     }                                                                    //ignore jslint - correct indentation
                  });                                                                     //ignore jslint - correct indentation
               }                                                                          //ignore jslint - correct indentation
               self.record.apinvno = self.record.disponly1 + '|' + self.record.disponly2 + '|' + self.record.disponly3;    //ignore jslint - correct indentation
               self.record.vendno = 0;                                                    //ignore jslint - correct indentation
               var currModule = self.record.disponly1;                                    //ignore jslint - correct indentation
               var currProcType = self.record.disponly2;                                  //ignore jslint - correct indentation
               var currTranType = self.record.disponly3;                                  //ignore jslint - correct indentation
               self.addReportWizard();                                                    //ignore jslint - correct indentation
               self.record.disponly1 = currModule;                                        //ignore jslint - correct indentation
               self.record.disponly2 = currProcType;                                      //ignore jslint - correct indentation
               self.record.disponly3 = currTranType;                                      //ignore jslint - correct indentation
            }                                                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbuser':                                                                 //ignore jslint - correct indentation
            self.getPvUser();                                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbv':                                                                    //ignore jslint - correct indentation
            self.getApsv(self.record.vendno);                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbva':                                                                   //ignore jslint - correct indentation
            self.getVaes(self.record.disponly2);                                          //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbvc':                                                                   //ignore jslint - correct indentation
            self.getApsv(self.record.vendno);                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbvn':                                                                   //ignore jslint - correct indentation
            self.getApsv(self.record.vendno);                                             //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         case 'sapbw':                                                                    //ignore jslint - correct indentation
            self.getWteh(self.record.orderno);                                            //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
         default:                                                                         //ignore jslint - correct indentation
            self.addReportWizard();                                                       //ignore jslint - correct indentation
            break;                                                                        //ignore jslint - correct indentation
      }                                                                                   //ignore jslint - correct indentation
   };

   //Begin supporting functions for addRecord

   self.checkSapbl = function () {
      if (self.record.selecttype.toLowerCase() === 'c') {
         DataService.get('api/ic/icsd/getbypk?whse=' + self.record.name, { busy: true }, function (data) {
            if (data && data.custno.toString() === self.record.vendno) {
               var selectedType = self.record.selecttype;
               self.addReportWizard();
               self.record.selecttype = selectedType;
            } else {
               MessageService.error('global.error', 'message.warehouse.entered.not.assigned.to.this.customer');
            }
         });
      } else if (self.record.selecttype.toLowerCase() === 't' || (!self.record.selecttype && self.record.name)) {
         DataService.get('api/ic/icspl/getbypk', { params: { type: self.record.name }, busy: true }, function (data) {
            if (data) {
               self.addReportWizard();
            } else {
               MessageService.error('global.error', 'message.list.name.does.not.exist');
            }
         });
      } else {
         self.addReportWizard();
      }
   };

   self.getApsv = function (vendorNumber) {
      DataService.get('api/ap/apsv/getbypk?vendno=' + vendorNumber, { busy: true }, function (data) {
         if (data) {
            switch (self.listproc) {
               case 'sapbp':                                                              //ignore jslint - correct indentation
                  self.record.disponly8 = data.notesfl;                                   //ignore jslint - correct indentation
                  self.record.disponly9 = data.name;                                      //ignore jslint - correct indentation
                  self.addReportWizard();                                                 //ignore jslint - correct indentation
                  break;                                                                  //ignore jslint - correct indentation
               case 'sapbv':                                                              //ignore jslint - correct indentation
                  var added = false;                                                      //ignore jslint - correct indentation
                  self.dataset.forEach(function (vendor) {                                //ignore jslint - correct indentation
                     if (vendor.vendno === data.vendno) {                                 //ignore jslint - correct indentation
                        added = true;                                                     //ignore jslint - correct indentation
                     }                                                                    //ignore jslint - correct indentation
                  });                                                                     //ignore jslint - correct indentation
                  if (!added) {                                                           //ignore jslint - correct indentation
                     self.record.disponly1 = data.vendno.toString();                      //ignore jslint - correct indentation
                     self.record.disponly2 = data.notesfl;                                //ignore jslint - correct indentation
                     self.record.disponly3 = data.name;                                   //ignore jslint - correct indentation
                     self.record.disponly4 = data.currbal.toString();                     //ignore jslint - correct indentation
                     self.record.type = true;                                             //ignore jslint - correct indentation
                     self.record.vendno = data.vendno;                                    //ignore jslint - correct indentation
                     self.record.transtype = 'v';                                         //ignore jslint - correct indentation
                     self.record.selecttype = 'c';                                        //ignore jslint - correct indentation
                     if (self.record.disponly5 === 'Yes') { //May need to use $translate version? case insensitive?     //ignore jslint - correct indentation
                        self.record.allfl = true;                                         //ignore jslint - correct indentation
                        self.selectInvoices(vendorNumber);
                        self.addReportWizard();                                           //ignore jslint - correct indentation
                     } else {                                                             //ignore jslint - correct indentation
                        self.record.disponly5 = $translate.instant('global.no'); //should be $translate version?      //ignore jslint - correct indentation
                        self.record.allfl = false;                                        //ignore jslint - correct indentation
                        self.openInvoiceSelection(data.vendno);                           //ignore jslint - correct indentation
                        self.addReportWizard();                                           //ignore jslint - correct indentation
                     }                                                                    //ignore jslint - correct indentation
                  } else {                                                                //ignore jslint - correct indentation
                     self.openInvoiceSelection(data.vendno);                              //ignore jslint - correct indentation
                     self.record = {};                                                    //ignore jslint - correct indentation
                  }                                                                       //ignore jslint - correct indentation
                  break;                                                                  //ignore jslint - correct indentation
               case 'sapbvc':                                                             //ignore jslint - correct indentation
                  self.record.vendno = data.vendno;                                       //ignore jslint - correct indentation
                  self.record.name = data.name;                                           //ignore jslint - correct indentation
                  self.record.type = true;                                                //ignore jslint - correct indentation
                  self.record.transtype = 'v';                                            //ignore jslint - correct indentation
                  self.record.selecttype = 'C';                                           //ignore jslint - correct indentation
                  self.addReportWizard();                                                 //ignore jslint - correct indentation
                  break;                                                                  //ignore jslint - correct indentation
               case 'sapbvn':                                                             //ignore jslint - correct indentation
                  self.record.disponly1 = data.vendno.toString();                         //ignore jslint - correct indentation
                  self.record.disponly2 = data.notesfl;                                   //ignore jslint - correct indentation
                  self.record.disponly3 = data.name;                                      //ignore jslint - correct indentation
                  self.record.allfl = true;                                               //ignore jslint - correct indentation
                  self.record.type = true;                                                //ignore jslint - correct indentation
                  self.record.transtype = 'v';                                            //ignore jslint - correct indentation
                  self.record.selecttype = 'C';                                           //ignore jslint - correct indentation
                  self.addReportWizard();                                                 //ignore jslint - correct indentation
                  break;                                                                  //ignore jslint - correct indentation
            }                                                                             //ignore jslint - correct indentation
         }
      });
   };

   self.selectInvoices = function (vendorNumber) {
      var list = $scope.list;
      var reptwizardlstprcapinvin = [];
      self.vendorInvoices = [];

      DataService.post('api/shared/assharedentry/reportwizardlistprocapinvlist', { data: { reptwizardlstprcapinvin: reptwizardlstprcapinvin, dVendNo: vendorNumber }, busy: true }, function (data) {
         self.vendorInvoices = data;

         var selectedInvoices = [];
         self.vendorInvoices.forEach(function (invoice) {
            if ("m" === invoice.transtype) {
               if ("n" === base.options.field8.toLowerCase()) {
                  return;
               }
            }
            selectedInvoices.push({
               type: false,
               listproc: list.listproc,
               vendno: vendorNumber,
               apinvno: invoice.apinvno,
               seqno: invoice.seqno,
               seqno2: invoice.seqno2,
               transtype: invoice.transtype,
               selecttype: 'c'
            });
         });

         var recordIndex = -1;
         list.dataset.forEach(function (vendor) {
            if (vendor.vendno === vendorNumber) {
               recordIndex = list.dataset.indexOf(vendor);
            }
         });

         if (recordIndex > -1) {
            list.dataset[recordIndex].allfl = true;
            list.dataset[recordIndex].disponly5 = $translate.instant('global.yes');
            list.grid.updateRow(recordIndex);
         }

         selectedInvoices.forEach(function (invoice) {
            list.invoices.push(invoice);
         });

         list.inInvoiceSelection = false;
      });
   };

   self.getArsc = function (custno) {
      if (custno > 0) {
         DataService.get('api/ar/arsc/getbypk', { params: { custno: custno, fillmode: false }, busy: true }, function (data) {
            if (data) {
               switch (self.listproc) {
                  case 'sapbc':                                                           //ignore jslint - correct indentation
                     self.record.disponly1 = data.name;                                   //ignore jslint - correct indentation
                     self.addReportWizard();                                              //ignore jslint - correct indentation
                     break;                                                               //ignore jslint - correct indentation
                  case 'sapbjc':                                                          //ignore jslint - correct indentation
                     self.record.vendno = data.custno;                                    //ignore jslint - correct indentation
                     self.record.apinvno = data.name;                                     //ignore jslint - correct indentation
                     self.record.transtype = 'v';                                         //ignore jslint - correct indentation
                     self.record.selecttype = 'c';                                        //ignore jslint - correct indentation
                     self.record.disponly1 = data.custno.toString();                      //ignore jslint - correct indentation
                     self.record.disponly2 = data.notesfl;                                //ignore jslint - correct indentation
                     self.record.disponly3 = data.name;                                   //ignore jslint - correct indentation
                     self.addReportWizard();                                              //ignore jslint - correct indentation
                     break;                                                               //ignore jslint - correct indentation
                  case 'sapbo':                                                           //ignore jslint - correct indentation
                     self.record.disponly6 = data.notesfl;                                //ignore jslint - correct indentation
                     self.record.disponly7 = data.name;                                   //ignore jslint - correct indentation
                     self.addReportWizard();                                              //ignore jslint - correct indentation
                     break;                                                               //ignore jslint - correct indentation
                  case 'sapbl':                                                           //ignore jslint - correct indentation
                     if (self.record.apinvno) {                                           //ignore jslint - correct indentation
                        DataService.get('api/ar/arss/getbypk', { params: { custno: data.custno, shipto: self.record.apinvno }, buy: true }, function (arss) {              //ignore jslint - correct indentation
                           self.record.disponly1 = arss.name;                             //ignore jslint - correct indentation
                           self.checkSapbl();                                             //ignore jslint - correct indentation
                        });                                                               //ignore jslint - correct indentation
                     } else {                                                             //ignore jslint - correct indentation
                        self.record.disponly1 = data.name;                                //ignore jslint - correct indentation
                        self.checkSapbl();                                                //ignore jslint - correct indentation
                     }                                                                    //ignore jslint - correct indentation
                     break;                                                               //ignore jslint - correct indentation
               }                                                                          //ignore jslint - correct indentation
            }                                                                             //ignore jslint - correct indentation
         });
      } else {
         if (self.listproc === 'sapbjc') {
            self.record.vendno = 0;
            self.record.apinvno = '0';
            self.record.disponly1 = '0';
            self.record.transtype = 'v';
            self.record.selecttype = 'c';
            self.addReportWizard();
         }
      }
   };

   self.getIcsd = function (whse) {
      DataService.get('api/ic/icsd/getbypk?whse=' + whse, { busy: true }, function (data) {
         if (data) {
            self.record.disponly1 = data.name;
            self.record.disponly2 = data.City;
            self.record.type = true;
            self.addReportWizard();
         }
      });
   };

   self.getIcsp = function (prod) {
      if (prod) {
         DataService.get('api/ic/icsp/getbypk', { params: { prod: prod, fillmode: true }, busy: true }, function (data) {
            if (data) {
               self.record.vendno = 0;
               self.record.type = true;
               self.record.apinvno = data.prod;
               self.record.disponly1 = data.prod;
               self.record.disponly2 = data.descrip2;
               self.addReportWizard();
            }
         });
      }
   };

   self.getKpet = function (order) {
      var params = {
         wono: order.substr(0, order.indexOf('-')),
         wosuf: order.substr(order.indexOf('-') + 1),
         fillmode: true //may not need this, but default is false?
      };
      DataService.get('api/kp/kpet/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            if (data.qtyship === 0) {
               MessageService.error('global.error', 'message.cannot.process.total.qty.shipped.equals.0');
            } else if (data.stagecd === 9) {
               MessageService.error('global.error', 'global.printing.cancelled.work.order');
            } else if (data.openinit && data.openinit.toLowerCase() !== UserService.getUserName().toLowerCase()) {
               MessageService.error('global.error', 'kp.in.use.by'); //SL does not display the operator, so not displayed here...
            } else {
               self.record = {
                  orderno: data.wono,
                  ordersuf: data.wosuf,
                  disponly1: order,
                  disponly2: data.shipprod,
                  disponly3: data.qtyord.toString(),
                  disponly4: data.whse
               };
               switch (data.stagecd.toString()) {
                  case '':                                                                                     //ignore jslint - correct indentation
                     self.record.disponly5 = $translate.instant('global.all');                                 //ignore jslint - correct indentation
                     break;                                                                                    //ignore jslint - correct indentation
                  case '1':                                                                                    //ignore jslint - correct indentation
                     self.record.disponly5 = $translate.instant('global.ordered');                             //ignore jslint - correct indentation
                     break;                                                                                    //ignore jslint - correct indentation
                  case '2':                                                                                    //ignore jslint - correct indentation
                     self.record.disponly5 = $translate.instant('global.printed');                             //ignore jslint - correct indentation
                     break;                                                                                    //ignore jslint - correct indentation
                  case '3':                                                                                    //ignore jslint - correct indentation
                     self.record.disponly5 = $translate.instant('global.built');                               //ignore jslint - correct indentation
                     break;                                                                                    //ignore jslint - correct indentation
                  case '9':                                                                                    //ignore jslint - correct indentation
                     self.record.disponly5 = $translate.instant('global.cancelled');                           //ignore jslint - correct indentation
                     break;                                                                                    //ignore jslint - correct indentation
               }
               self.addReportWizard();
            }
         }
      });
   };

   self.getOeeh = function (order) {
      if (order) {

         var suffix = order.substr(order.indexOf('-') + 1);
         var orderno = order.substr(0, order.indexOf('-'));
         var criteria = {
            orderno: orderno,
            ordersuf: suffix,
            currproc: base.functionName,
            fillmode: true
         };

         // Warning Messages Not Edited for on backend call - only processes hard errors
         if (base.functionName.toLowerCase() === 'oerd') {

            DataService.post('api/shared/assharedentry/reportwizardvalidatesapbo', { data: criteria, busy: true }, function () {

               DataService.get('api/oe/oeeh/getbypk?orderno=' + orderno + '&ordersuf=' + suffix + '&fldlist=fulfillmenttiedfl,consolorderno', { busy: true }, function (data) {
                  if (data) {
                     if (data.consolorderno) {
                        var consolMsg = MessageService.get('global.order.consolidated.to') + ' ' +
                           data.consolorderno + ', ' + MessageService.get('global.continue');
                        MessageService.yesNo('global.warning', consolMsg, function () {
                           self.oeehFetch(orderno, suffix);
                        });
                     } else if (data.fulfillmenttiedfl && base.isAOConsolFulfillmentOn && base.isOrderFulfillmentOn) {
                        MessageService.yesNo('global.warning', 'message.order.to.be.billed.through.consolidated.invoicing', function () {
                           self.oeehFetch(orderno, suffix);
                        });
                     } else {
                        self.oeehFetch(orderno, suffix);
                     }
                  } else {
                     self.oeehFetch(orderno, suffix);
                  }
               });
            });
         } else {
            DataService.post('api/shared/assharedentry/reportwizardvalidatesapbo', { data: criteria, busy: true }, function () {
               self.oeehFetch(orderno, suffix);
            });
         }
      }
   };

   self.getOEStage = function (stageCode) {
      switch (stageCode) {
         case 0:                                                                                      //ignore jslint - correct indentation
            return $translate.instant('global.entered');                                              //ignore jslint - correct indentation
         case 1:                                                                                      //ignore jslint - correct indentation
            return $translate.instant('global.ordered');                                              //ignore jslint - correct indentation
         case 2:                                                                                      //ignore jslint - correct indentation
            return $translate.instant('global.picked');                                               //ignore jslint - correct indentation
         case 3:                                                                                      //ignore jslint - correct indentation
            return $translate.instant('global.shipped');                                              //ignore jslint - correct indentation
         case 4:                                                                                      //ignore jslint - correct indentation
            return $translate.instant('global.invoiced');                                             //ignore jslint - correct indentation
         case 5:                                                                                      //ignore jslint - correct indentation
            return $translate.instant('global.paid');                                                 //ignore jslint - correct indentation
         case 9:                                                                                      //ignore jslint - correct indentation
            return $translate.instant('global.cancelled');                                            //ignore jslint - correct indentation
         default:                                                                                     //ignore jslint - correct indentation
            return '';                                                                                //ignore jslint - correct indentation
      }
   };

   self.getPoeh = function (order) {
      if (order) {
         var receiverNo = (base.functionName.toLowerCase() === 'porii') ? self.record.disponly2 : '';
         //Separate variables are created inorder not to clear the selected order from the lookup.
         //Slight delay is needed before clearing the lookup value, otherwise soho thinks it is empty when performing required field validation.
         var orderno = order.substr(0, order.indexOf('-'));
         var ordersuf = order.substr(order.indexOf('-') + 1);
         var disponly2 = receiverNo;

         var reptwizardvalsapbp = {
            pono: orderno,
            posuf: ordersuf,
            receiverno: disponly2,
            currproc: base.functionName
         };
         DataService.post('api/shared/assharedentry/reportwizardvalidatesapbp', { data: reptwizardvalsapbp, busy: true }, function () {
            self.poehFetch(orderno, ordersuf, disponly2);
         });
      }
   };

   self.getPoerah = function (reportnm) {
      if (reportnm > 0) {
         DataService.get('api/po/poerah/getbypk?reportno=' + reportnm, { busy: true }, function (data) {
            if (data) {
               if (data.mergefl) {
                  self.record.disponly1 = data.reportno.toString();
                  self.record.disponly2 = data.buyer;
                  self.record.disponly3 = data.vendno.toString();
                  self.record.disponly4 = data.prodline;
                  self.record.disponly5 = data.whse;
                  self.record.disponly6 = data.conslinefl ? $translate.instant('global.yes') : $translate.instant('global.no');
                  self.record.disponly7 = data.conswhsefl ? $translate.instant('global.yes') : $translate.instant('global.no');
                  self.addReportWizard();
               } else {
                  MessageService.error('global.error', 'message.cannot.process.rrar.merge.flag.set.to.no');
               }
            }
         });
      }
   };

   self.getPOStage = function (stageCode) {
      switch (stageCode) {
         case 0:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.entered');                                           //ignore jslint - correct indentation
         case 1:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.ordered');                                           //ignore jslint - correct indentation
         case 2:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.printed');                                           //ignore jslint - correct indentation
         case 3:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.acknowledged');                                      //ignore jslint - correct indentation
         case 4:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.pre.received');                                      //ignore jslint - correct indentation
         case 5:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.received');                                          //ignore jslint - correct indentation
         case 6:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.costed');                                            //ignore jslint - correct indentation
         case 7:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.closed');                                            //ignore jslint - correct indentation
         case 9:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.cancelled');                                         //ignore jslint - correct indentation
         default:                                                                                  //ignore jslint - correct indentation
            return '';                                                                             //ignore jslint - correct indentation
      }
   };

   self.getPvUser = function () {
      DataService.get('api/pv/pvuser/getbypkwithcono', { params: { cono: self.record.disponly1, oper2: self.record.name }, busy: true }, function (data) {
         if (data) {
            self.record.name = self.record.disponly1 + self.record.name;
            self.record.disponly1 = data.userName;
            self.addReportWizard();
         } else {
            MessageService.error('global.error', 'message.no.record.found.for.these.data');
         }
      });
   };

   self.getSapb = function (reportno) {
      if (reportno) {
         var reptwizardvalsapbs = {
            reportnm: reportno,
            cono: self.record.disponly2
         };
         DataService.post('api/shared/assharedentry/reportwizardvalidatesapbs', { data: reptwizardvalsapbs, busy: true }, function (data) {
            self.sapbFetch(reportno, data);
         });
      }
   };

   self.getSasj = function (jurnlNo) {
      if (jurnlNo > 0) {
         DataService.get('api/sa/sasj/getbypk?jrnlno=' + jurnlNo, { busy: true }, function (data) {
            if (data) {
               self.record = {
                  jrnlno: data.jrnlno,
                  disponly1: data.currproc,
                  disponly2: data.period.toString(),
                  disponly3: data.perfisc.toString(),
                  disponly4: data.postdt !== null ? data.postdt : '',
                  disponly5: data.oper2.toString(),
                  disponly6: data.nopostings.toString(),
                  disponly7: data.closedt !== null ? data.closedt : ''
               };
               self.addReportWizard();
            }
         });
      }
   };

   self.getSasta = function (codeValue) {
      if (codeValue) {
         DataService.get('api/sa/sasta/getbypk', { params: { codeiden: 'c', codeval: codeValue }, busy: true }, function (data) {
            if (data) {
               self.record.prodcat = data.codeval;
               self.record.disponly1 = data.descrip;
               self.addReportWizard();
            }
         });
      }
   };

   self.getSmsn = function (slsRep) {
      if (slsRep) {
         DataService.get('api/sm/smsn/getbypk?slsrep=' + slsRep, { busy: true }, function (data) {
            if (data) {
               self.record.disponly1 = data.name;
               self.addReportWizard();
            }
         });
      }
   };

   self.getVaes = function (seqNo) {
      var criteria = {
         vano: self.record.orderno,
         vasuf: self.record.ordersuf,
         seqno: seqNo,
         currproc: base.functionName
      };
      DataService.post('api/shared/assharedentry/reportwizardvalidatesapbva', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.vaesFetch(data);
         }
      });
   };

   self.getWteh = function (orderno) {
      var suffix = orderno.substr(orderno.indexOf('-') + 1);
      var wtNumber = orderno.substr(0, orderno.indexOf('-'));
      var criteria = {
         wtno: wtNumber,
         wtsuf: suffix,
         currproc: base.functionName
      };
      DataService.post('api/shared/assharedentry/reportwizardvalidatesapbw', { data: criteria, busy: true }, function () {
         self.wtehFetch(wtNumber, suffix);
      });
   };

   self.getWtehStage = function (stageCode) {
      switch (stageCode) {
         case 0:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.requested');                                         //ignore jslint - correct indentation
         case 1:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.ordered');                                           //ignore jslint - correct indentation
         case 2:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.printed');                                           //ignore jslint - correct indentation
         case 3:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.shipped');                                           //ignore jslint - correct indentation
         case 4:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.pre.received');                                      //ignore jslint - correct indentation
         case 5:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.exception');                                         //ignore jslint - correct indentation
         case 6:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.received');                                          //ignore jslint - correct indentation
         case 9:                                                                                   //ignore jslint - correct indentation
            return $translate.instant('global.canceled');                                          //ignore jslint - correct indentation
         default:                                                                                  //ignore jslint - correct indentation
            return '';                                                                             //ignore jslint - correct indentation
      }
   };

   self.getWterah = function (reportNo) {
      if (reportNo > 0) {
         DataService.get('api/wt/wterah/getbypk?reportno=' + reportNo, { busy: true }, function (data) {
            if (data) {
               self.record = {
                  type: false,
                  apinvno: '',
                  disponly1: data.reportno.toString(),
                  disponly2: data.cono.toString(),
                  disponly3: data.shipfmwhse,
                  disponly4: data.cono2.toString(),
                  disponly5: data.shiptowhse,
                  disponly6: data.rushfl ? 'yes' : 'no'
               };
               self.addReportWizard();
            }
         });
      }
   };

   self.oeehFetch = function (orderno, ordersuf) {
      var criteria = {
         orderno: orderno,
         ordersuf: ordersuf,
         fillmode: true
      };
      DataService.get('api/oe/oeeh/getbypk', { params: criteria, busy: true }, function (data) {
         if (data) {
            switch (self.listproc) {
               case 'sapbo':                                                                                      //ignore jslint - correct indentation
                  self.record = {                                                                                 //ignore jslint - correct indentation
                     disponly1: data.orderno.toString() + '-' + data.ordersuf.toString(),                         //ignore jslint - correct indentation
                     disponly2: data.promisedt !== null ? data.promisedt : '',                                    //ignore jslint - correct indentation
                     disponly3: self.getOEStage(data.stagecd),                                                    //ignore jslint - correct indentation
                     disponly4: data.transtype,                                                                   //ignore jslint - correct indentation
                     disponly5: data.custno.toString(),                                                           //ignore jslint - correct indentation
                     orderno: data.orderno,                                                                       //ignore jslint - correct indentation
                     ordersuf: data.ordersuf                                                                      //ignore jslint - correct indentation
                  };                                                                                              //ignore jslint - correct indentation
                  self.getArsc(data.custno);                                                                      //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'sapbm':
                  self.record.disponly1 = 'OE';
                  self.record.disponly2 = data.orderno.toString() + '-' + data.ordersuf.toString();               //ignore jslint - correct indentation
                  self.record.disponly3 = data.custno.toString();                                                 //ignore jslint - correct indentation
                  self.record.disponly4 = data.shiptonm;                                                          //ignore jslint - correct indentation
                  self.addReportWizard();                                                                         //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
            }
         } else {
            MessageService.error('global.error', 'error.order.does.not.exist');
         }
      });
   };

   self.poehFetch = function (orderno, ordersuf, receiverno) {
      DataService.get('api/po/poeh/getbypk', { params: { pono: orderno, posuf: ordersuf }, busy: true }, function (data) {
         if (data) {
            switch (self.listproc) {
               case 'sapbp':                                                                                      //ignore jslint - correct indentation
                  self.record = {                                                                                 //ignore jslint - correct indentation
                     disponly1: data.pono.toString() + '-' + Utils.pad(data.posuf, 2),                            //ignore jslint - correct indentation
                     disponly2: (receiverno) ? receiverno:data.receiverno,                                        //ignore jslint - correct indentation
                     disponly3: Utils.formatDate(data.orderdt),                                                   //ignore jslint - correct indentation
                     disponly5: self.getPOStage(data.stagecd),                                                    //ignore jslint - correct indentation
                     disponly6: data.transtype.toString(),                                                        //ignore jslint - correct indentation
                     disponly7: data.vendno.toString(),                                                           //ignore jslint - correct indentation
                     orderno: orderno,                                                                            //ignore jslint - correct indentation
                     ordersuf: ordersuf                                                                           //ignore jslint - correct indentation
                  };                                                                                              //ignore jslint - correct indentation
                  self.getApsv(data.vendno);                                                                      //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
               case 'sapbm':                                                                                      //ignore jslint - correct indentation
                  self.record.disponly1 = 'PO';                                                                   //ignore jslint - correct indentation
                  self.record.disponly2 = data.pono.toString() + '-' + Utils.pad(data.posuf, 2);                  //ignore jslint - correct indentation
                  self.record.disponly3 = data.vendno.toString();                                                 //ignore jslint - correct indentation
                  self.record.disponly4 = data.shiptonm;                                                          //ignore jslint - correct indentation
                  self.addReportWizard();                                                                         //ignore jslint - correct indentation
                  break;                                                                                          //ignore jslint - correct indentation
            }
         } else {
            MessageService.error('global.error', 'error.order.does.not.exist');
         }
      });
   };

   self.sapbFetch = function (reportNo, reptWizardValSapbs) {
      DataService.get('api/sa/sapb/getbypkwithcono?cono=' + reptWizardValSapbs.cono + '&reportnm=' + reportNo, { busy: true }, function (data) {
         if (data) {
            self.record = {
               disponly1: reptWizardValSapbs.currproc,
               disponly3: reptWizardValSapbs.queuenm,
               disponly4: reptWizardValSapbs.groupnm,
               disponly5: reptWizardValSapbs.startdatetime.toString(),
               disponly6: reptWizardValSapbs.printernm,
               disponly7: reptWizardValSapbs.statusty
            };
            self.addReportWizard();
         }
      });
   };

   self.vaesFetch = function (valSapbva) {
      self.record = {
         disponly1: self.record.orderno.toString() + '-' + self.record.ordersuf.toString(),
         disponly2: self.record.disponly2,
         disponly3: valSapbva.sctntype.toUpperCase(),
         disponly4: valSapbva.sctncode,
         disponly5: valSapbva.descrip,
         disponly6: valSapbva.vatype,
         disponly7: valSapbva.statustype,
         type: true,
         orderno: self.record.orderno,
         ordersuf: self.record.ordersuf
         /* apinvno and seqno set from orderno/ordersuf and displonly2 in ReportWizardFinish */
      };
      self.addReportWizard();
   };

   self.wtehFetch = function (wtno, wtsuf) {
      DataService.get('api/wt/wteh/getbypk', { params: { wtno: wtno, wtsuf: wtsuf }, busy: true }, function (data) {
         if (data) {
            switch (self.listproc) {
               case 'sapbm':                                                                                               //ignore jslint - correct indentation
                  self.record.disponly1 = 'WT';
                  self.record.disponly2 = data.wtno.toString() + '-' + data.wtsuf.toString();
                  self.record.disponly3 = data.shipfmwhse;
                  self.record.disponly4 = data.shiptonm;
                  self.addReportWizard();                                                                                  //ignore jslint - correct indentation
                  break;                                                                                                   //ignore jslint - correct indentation
               case 'sapbw':                                                                                               //ignore jslint - correct indentation
                  self.record = {                                                                                          //ignore jslint - correct indentation
                     disponly1: data.wtno.toString() + '-' + data.wtsuf.toString(),                                        //ignore jslint - correct indentation
                     disponly2: data.orderdt !== null ? data.orderdt : '',                                                 //ignore jslint - correct indentation
                     disponly3: self.getWtehStage(data.stagecd),                                                           //ignore jslint - correct indentation
                     disponly4: data.transtype,                                                                            //ignore jslint - correct indentation
                     disponly5: data.shipfmwhse,                                                                           //ignore jslint - correct indentation
                     disponly6: data.shiptowhse,                                                                           //ignore jslint - correct indentation
                     disponly7: data.notesfl,                                                                              //ignore jslint - correct indentation
                     outputty: 'p',                                                                                        //ignore jslint - correct indentation
                     orderno: data.wtno,                                                                                   //ignore jslint - correct indentation
                     ordersuf: data.wtsuf                                                                                  //ignore jslint - correct indentation
                  };                                                                                                       //ignore jslint - correct indentation
                  if (base.functionName.toLowerCase() === 'wtep' || base.functionName.toLowerCase() === 'ibrp') {          //ignore jslint - correct indentation
                     self.record.outputty = data.rushfl ? 'r' : 'w';                                                       //ignore jslint - correct indentation
                  }                                                                                                        //ignore jslint - correct indentation
                  self.addReportWizard();                                                                                  //ignore jslint - correct indentation
                  break;                                                                                                   //ignore jslint - correct indentation
            }
         } else {
            MessageService.error('global.error', 'error.transfer.does.not.exist');
         }
      });
   };

   //End supporting functions for addRecord

   self.addReportWizard = function () {
      self.record.listproc = self.listproc; //overwrites in many cases?
      self.record.outputty = self.record.outputty ? self.record.outputty : 'p';

      if (!Utils.objectExistsInArray(self.dataset, self.record)) {
         self.dataset.push(self.record);

         //Slight delay is needed before clearing the lookup value, otherwise soho thinks it is empty when performing required field validation.
         $timeout(function () {
            self.record = {};
            switch (self.listproc.toLowerCase()) {
               case 'sapbl':                                                                 //ignore jslint - correct indentation
                  self.record.selecttype = '';                                               //ignore jslint - correct indentation
                  break;                                                                     //ignore jslint - correct indentation
               case 'sapbm':                                                                 //ignore jslint - correct indentation
                  self.record.selecttype = self.selectedtype ? self.selectedtype : 'O';      //ignore jslint - correct indentation
                  break;                                                                     //ignore jslint - correct indentation
            }
         }, 50);
      } else {
         //NOTE: It's generic message here, and unfortunately not include the key, because
         //there are about 25 different types, and the display value can be from different values.
         MessageService.info('global.information', 'message.this.entry.already.exists.in.the.list');
         self.record = {};
         switch (self.listproc.toLowerCase()) {
            case 'sapbm':                                                                 //ignore jslint - correct indentation
               self.record.selecttype = self.selectedtype ? self.selectedtype : 'O';      //ignore jslint - correct indentation
               break;                                                                     //ignore jslint - correct indentation
         }
      }
   };

   self.openInvoiceSelection = function (vendno) {
      self.invoiceSelector = {
         vendno: vendno
      };
      $state.go('.invoice-selection');
   };

   self.drilldown = function (e, args) {
      self.openInvoiceSelection(args[0].item.vendno);
   };

   self.rcvNoField = function () {
      return (base.functionName.toLowerCase() === 'porii');
   };

   self.getVaSuff = function (args) {
      if (args.value) {
         if (args.source === 'entry') {
            var orderParts = self.record.vanox.split('-');
            if (orderParts.length === 2) {
               self.record.orderno = orderParts[0];
               self.record.ordersuf = orderParts[1];
            } else {
               self.record.orderno = self.record.vanox;
               self.record.ordersuf = 0;
            }
         } else {
            self.record.orderno = args.value;
            self.record.ordersuf = args.value2;
         }
      } else {
         self.record.orderno = 0;
         self.record.ordersuf = 0;
      }

      self.record.order = self.record.orderno + '-' + Utils.pad(self.record.ordersuf, 2);

      if (self.record.orderno) {
         var sctntype = '';
         if (base.functionName) {
            if (base.functionName.toLowerCase() === 'vaepp') {
               sctntype = 'in';
            } else if (base.functionName.toLowerCase() === 'vaepi') {
               sctntype = 'it';
            }
         }

         /* Default sequence number from VAES */
         var params = {
            completefl: false,
            sctntype: sctntype,
            vano: self.record.orderno,
            vasuf: self.record.ordersuf,
            seqno: null
         };
         DataService.get('api/va/vaes/listbysection', { params: params, busy: true }, function (data) {
            if (data && data.length) {
               // Sort results by sequence number
               data = $filter('orderBy')(data, 'seqno');
               self.record.disponly2 = data[0].seqno; /* Value Add Section Sequence */
            }
         });
      }
   };

   self.enablecono = function () {
      return self.enableSapbsCono;
   };

   self.delete = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var records = GridService.getSelectedRecords(self.grid); //get records to be removed
         records.forEach(function (record) {
            self.dataset.splice(self.dataset.indexOf(record), 1);
            if (self.listproc.toLowerCase() === 'sapbv') { //if there could be invoices
               var toRemove = [];
               self.invoices.forEach(function (row) { //get invoices to be removed
                  if (!row.type && row.vendno === record.vendno && row.transtype && (row.transtype.toLowerCase() === 'a' || row.transtype.toLowerCase() === 'i' || row.transtype.toLowerCase() === 'm')) {
                     toRemove.push(row);
                  }
               });
               toRemove.forEach(function (invoice) {
                  self.invoices.splice(self.invoices.indexOf(invoice), 1);
               });
            }
         });
      });
   };

   self.submit = function () {
      self.counter = 1;
      base.listOptionValues = self.unused.concat(self.dataset).concat(self.invoices);
      if (base.functionName.toUpperCase() === 'OEEPA' ||
         base.functionName.toUpperCase() === 'OEEPD' ||
         base.functionName.toUpperCase() === 'OEEPI' ||
         base.functionName.toUpperCase() === 'OEEPL' ||
         base.functionName.toUpperCase() === 'OEEPP' ||
         base.functionName.toUpperCase() === 'OEEPQ' ||
         base.functionName.toUpperCase() === 'OERD' ||
         base.functionName.toUpperCase() === 'POEPP' ||
         base.functionName.toUpperCase() === 'PORD' ||
         base.functionName.toUpperCase() === 'VAEPP' ||
         base.functionName.toUpperCase() === 'WTEP' ||
         base.functionName.toUpperCase() === 'OEEPM' ||
         base.functionName.toUpperCase() === 'OEEHD') {
         base.listOptionValues.forEach(function (record) {
            // stored reports will already have the sequence set, but new rows may get added
            if (base.functionName.toUpperCase() === 'VAEPP') {
               if (!record.seqno2 || record.seqno2 === 0) {
                  record.seqno2 = self.counter;
                  self.counter++;
               } else if (record.seqno2 && record.seqno2 >= self.counter) {
                  self.counter = record.seqno2 + 1;
               }
            } else {
               if (!record.seqno || record.seqno === 0) {
                  record.seqno = self.counter;
                  self.counter++;
               } else if (record.seqno && record.seqno >= self.counter) {
                  self.counter = record.seqno + 1;
               }
            }
         });
      }
      $state.go('^');
   };
}); //end list

app.controller('ReportWizardPrinterOptionsCtrl', function ($scope, $state, $translate) { //as print
   var self = this;
   var base = $scope.base; //required for view
   self.printOptions = angular.copy($scope.opts.printOptions);

   if (self.printOptions.settings) {
      self.printSettings = self.printOptions.settings;
   } else {
      self.printSettings = {
         printtype: 'v',
         printinstance: self.printOptions.option.optionname
      };
   }
   self.originalSettings = angular.copy(self.printSettings);

   self.submit = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            var originalIndex = base.printerOptionSettings.indexOf($scope.opts.printOptions.settings);
            if (originalIndex === -1) {
               base.printerOptionSettings.push(data.printerDetails);
            } else {
               base.printerOptionSettings.splice(originalIndex, 1, data.printerDetails);
            }
            switch (data.printerDetails.printtype.toLowerCase()) {
               case 'e': //email                                                                                                          //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = data.printerDetails.emailaddr;                          //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
               case 'o': //file                                                                                                           //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = data.printerDetails.flatfilenm;                         //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
               case 'v': //view                                                                                                           //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = $translate.instant('global.view');                      //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
               case 'i': //ion                                                                                                            //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = $translate.instant('global.ion');                       //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
               case 'p': //print                                                                                                          //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = data.printerDetails.printernm;                          //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
               case 'r': //receipt                                                                                                        //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = data.printerDetails.printernm;                          //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
               case 'd': //device                                                                                                         //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = data.printerDetails.printernm;                          //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
               case 'b': //Dropbox                                                                                                        //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = $translate.instant('global.dropbox.printer');           //ignore jslint - correct indentation
                  break;
               case 'f': //fax                                                                                                            //ignore jslint - correct indentation
               default:                                                                                                                   //ignore jslint - correct indentation
                  base.options['field' + self.printOptions.option.optionnumber] = data.printerDetails.faxphoneno;                         //ignore jslint - correct indentation
                  break;                                                                                                                  //ignore jslint - correct indentation
            }
            $state.go('^');
         }
      });
   };
}); //end print

app.controller('VenderInvoiceSelectionCtrl', function ($scope, $state, $translate, DataService) { //as inv
   var self = this;
   var list = $scope.list;
   list.inInvoiceSelection = true;
   var vendno = list.invoiceSelector.vendno;
   self.dataset = [];
   self.unused = [];

   //build the criteria required to populate the dataset
   var reptwizardlstprcapinvin = [];
   list.invoices.forEach(function (row) {
      if (!row.type && row.vendno === vendno && row.transtype && (row.transtype.toLowerCase() === 'a' || row.transtype.toLowerCase() === 'i' || row.transtype.toLowerCase() === 'm')) {
         reptwizardlstprcapinvin.push({ apinvno: row.apinvno, seqno: row.seqno });
      } else {
         self.unused.push(row);
      }
   });

   //populate the dataset using the criteria
   DataService.post('api/shared/assharedentry/reportwizardlistprocapinvlist', { data: { reptwizardlstprcapinvin: reptwizardlstprcapinvin, dVendNo: vendno }, busy: true }, function (data) {
      self.dataset = data;
   });

   self.done = function () {
      var selectedInvoices = [];
      self.dataset.forEach(function (invoice) {
         if (invoice.includefl) {
            selectedInvoices.push({
               type: false,
               listproc: list.listproc,
               vendno: vendno,
               apinvno: invoice.apinvno,
               seqno: invoice.seqno,
               seqno2: invoice.seqno2,
               transtype: invoice.transtype,
               selecttype: 'c'
            });
         }
      });
      var recordIndex = -1;
      list.dataset.forEach(function (vendor) {
         if (vendor.vendno === vendno) {
            recordIndex = list.dataset.indexOf(vendor);
         }
      });
      if (recordIndex > -1) {
         list.dataset[recordIndex].allfl = (selectedInvoices.length === self.dataset.length);
         list.dataset[recordIndex].disponly5 = (selectedInvoices.length === self.dataset.length) ? $translate.instant('global.yes') : $translate.instant('global.no'); //should be $translate version?
         list.grid.updateRow(recordIndex);
      }
      list.invoices = self.unused.concat(selectedInvoices);
      list.inInvoiceSelection = false;
      $state.go('^');
   };
}); //end inv

/**
 * Directive for the dynamic fields in the Ranges view
 */
app.directive('reportWizardRanges', function reportWizardRanges($compile, JsonViewService, ReportWizardService) {

   return {
      restrict: 'E',
      scope: false,
      link: function (scope, element) {
         var $element = $(element);
         var base = scope.base;

         var id = 1;
         var jsonContainer = { id: id++, type: 'CONTAINER', children: [] };

         var rangeFields = base.reportDefn.reptwizarddefnranges;
         for (var i = 0; i < rangeFields.length; i++) {
            var fieldData = rangeFields[i];

            // Each pair of fields in their own row with 2 columns so that fields align and focus/tab order is in pairs
            var row = { id: id++, type: 'ROW', children: [] };
            var column1 = { id: id++, type: 'COL', subType: '1/3', children: [] };
            var column2 = { id: id++, type: 'COL', subType: '1/3', children: [] };

            // Create json control
            var field1 = ReportWizardService.createJsonControl(id++, fieldData.rangetype, fieldData.rangename,
               fieldData.rangelength, fieldData.rangerequired);

            // Copy field1 for field2
            var field2 = angular.copy(field1);
            field2.id = id++;

            if (i === 0) {
               field1.autoFocus = true;
            }

            field1.eventChange = 'rngs.fieldBegLeave' + fieldData.rangenumber + '()';
            // Blur is important, especially for Date and String fields.  Only want the change to trigger when they complete entry.
            field1.modelOptions = { updateOn: "blur", debounce: 1 };

            // Add model references
            field1.model = 'base.ranges.fieldBeg' + fieldData.rangenumber;
            field2.model = 'base.ranges.fieldEnd' + fieldData.rangenumber;

            // Add range # as prefix of first label (since backend errors may refer to #, and best way to easily achieve alignment)
            field1.label = fieldData.rangenumber + '. ' + field1.label;

            // For 'Customer' type ranges, need to allow the user to enter invalid customer #'s in both ranges.
            if (fieldData.rangetype.toLowerCase() === 'c') {
               field1.options = { allowEntry: true };
               field2.options = { allowEntry: true };
            }

            jsonContainer.children.push(row);
            row.children.push(column1);
            row.children.push(column2);
            column1.children.push(field1);
            column2.children.push(field2);
         }

         // Convert to html
         var html = JsonViewService.convertToHtml(jsonContainer);

         // Add html to DOM
         $element.html(html);

         // Tell Angular to compile it
         $compile($element.contents())(scope.$new());
      }
   };

});

/**
 * Directive for the dynamic fields in the Options view
 */
app.directive('reportWizardOptions', function reportWizardOptions($compile, $translate, JsonViewService, ReportWizardService) {

   return {
      restrict: 'E',
      scope: false,
      link: function (scope, element) {
         var $element = $(element);
         var base = scope.base;

         var id = 1;
         var jsonContainer = { id: id++, type: 'CONTAINER', children: [] };
         var row = { id: id++, type: 'ROW', children: [] };
         var column1 = { id: id++, type: 'COL', subType: '1/2', children: [] };
         var column2 = { id: id++, type: 'COL', subType: '1/2', children: [] };
         var useTwoColumns = true; //leaving in for future use

         jsonContainer.children.push(row);
         row.children.push(column1);
         row.children.push(column2);

         var optionFields = base.reportDefn.reptwizarddefnoptions;
         var halfWayPoint = Math.ceil(optionFields.length / 2);
         for (var i = 0; i < optionFields.length; i++) {
            var fieldData = optionFields[i];

            // Create json control
            var field = ReportWizardService.createJsonControl(id++, fieldData.optiontype, fieldData.optionname,
               fieldData.optionlength, fieldData.optionrequired);

            if (i === 0) {
               field.autoFocus = true;
            }

            // Add model reference
            field.model = 'base.options.field' + fieldData.optionnumber;

            // Add option # as prefix of the label (since backend errors may refer to #, and best way to easily achieve alignment)
            field.label = fieldData.optionnumber + '. ' + field.label;

            if (fieldData.optiontype.toLowerCase() === 'q' && (fieldData.optionlistproc !== '' || fieldData.optionlistproc2 !== '' || fieldData.optionlistproc3 !== '')) {
               field = {
                  id: id++,
                  type: 'COMP_FLD',
                  children: [
                     field,
                     {
                        id: id++,
                        type: 'BTN',
                        subType: 'SEC',
                        label: 'global.list',
                        conditionDisabled: 'base.options.field' + fieldData.optionnumber + '.toLowerCase() === \'no\'',
                        eventClick: 'opts.listButton(\'' + fieldData.optionlistproc + fieldData.optionlistproc2 + fieldData.optionlistproc3 + '\')'
                     }
                  ]
               };
            } else if (fieldData.optiontype.toLowerCase() === 'r') {
               field = {
                  id: id++,
                  type: 'COMP_FLD',
                  children: [
                     field,
                     {
                        id: id++,
                        type: 'BTN',
                        subType: 'SEC',
                        label: 'global.printer.options',
                        eventClick: 'opts.printerOptionsButton(' + fieldData.optionnumber + ')'
                     }
                  ]
               };
            }

            // Add to 1st or 2nd column
            if (!useTwoColumns || i < halfWayPoint) {
               column1.children.push(field);
            } else {
               column2.children.push(field);
            }
         }

         // Convert to html
         var html = JsonViewService.convertToHtml(jsonContainer);

         // Add html to DOM
         $element.html(html);

         // Tell Angular to compile it
         $compile($element.contents())(scope.$new());
      }
   };

});
