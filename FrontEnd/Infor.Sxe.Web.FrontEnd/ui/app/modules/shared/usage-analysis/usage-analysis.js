'use strict';

app.controller('UsageAnalysisCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService, Utils) {
   var self = this;
   var base = $scope.base;

   self.backwardChoices = [];
   self.trendChoices = [];
   self.forwardChoices = [];
   self.monthrollChoices = [];
   self.exponsmoothChoices = [];

   self.selectedBackward = [];
   self.selectedTrend = [];
   self.selectedForward = [];
   self.selectedMonthroll = [];
   self.selectedExponsmooth = [];

   self.usageAnalysis = {
      prod: base.usageAnalysis.prod,
      whse: base.usageAnalysis.whse,
      reportno: base.usageAnalysis.reportno,
      secure: base.usageAnalysis.secure
   };

   self.icamrcalcmethodratesingle = {};
   self.icamrcalcmethodsingle = {};
   self.icamrusagesensitivitysingle = {};
   self.icamrloadusagerateprodtt = {};

   self.usageMethodList = [];
   self.usageGoal = 0;

   self.search = function () {
      self.populateGrid();
   };

   self.retrieveCurrentProductData = function () {
      DataService.post('api/ic/asicadmin/icamrloadcalcmethodrate', { data: self.usageAnalysis, busy: true }, function (data) {
         if (data) {

            if (data.icamrcalcmethodratesingle) {
               self.icamrcalcmethodratesingle = data.icamrcalcmethodratesingle;
               self.icamrcalcmethodratesingle.percent = Math.round(self.icamrcalcmethodratesingle.percent * 100) / 100;
               self.usageGoal = self.icamrcalcmethodratesingle.usagegoal;
            }
            if (data.icamrusagesensitivitysingle) {
               self.icamrusagesensitivitysingle = data.icamrusagesensitivitysingle
            }

            if (data.icamrcalcmethodsingle) {
               self.icamrcalcmethodsingle = data.icamrcalcmethodsingle;
            }

            if (data.icamrcalcmethodratesingle) {

               self.icamrcalcmethodratesingle = data.icamrcalcmethodratesingle;

               if (data.icamrcalcmethodsingle.backwrd) {
                  var splt = data.icamrcalcmethodsingle.backwrd.split(',');
                  self.backwardChoices = [];
                  self.selectedBackward = [];
                  splt.forEach(function (val) {
                     var option = {
                        label: val.trim(),
                        value: val.trim()
                     };
                     self.backwardChoices.push(option);
                     if (self.usageAnalysis.reportno === 0) {
                        if (option.label === '3 Months' || option.label === '6 Months' || option.label === '9 Months') {
                           self.selectedBackward.push(option.value);
                        }
                     }
                  });
               }

               if (data.icamrcalcmethodsingle.trend) {
                  var splt = data.icamrcalcmethodsingle.trend.split(',');
                  self.trendChoices = [];
                  self.selectedTrend = [];
                  splt.forEach(function (val) {
                     var option = {
                        label: val.trim(),
                        value: val.trim()
                     };
                     self.trendChoices.push(option);
                     if (self.usageAnalysis.reportno === 0) {
                        if (option.label === '3 Months' || option.label === '6 Months' || option.label === '9 Months') {
                           self.selectedTrend.push(option.value);
                        }
                     }
                  });
               }

               if (data.icamrcalcmethodsingle.forwrd) {
                  var splt = data.icamrcalcmethodsingle.forwrd.split(',');
                  self.forwardChoices = [];
                  self.selectedForward = [];
                  splt.forEach(function (val) {
                     var option = {
                        label: val.trim(),
                        value: val.trim()
                     };
                     self.forwardChoices.push(option);
                     if (self.usageAnalysis.reportno === 0) {
                        if (option.label === '3 Months' || option.label === '6 Months' || option.label === '9 Months') {
                           self.selectedForward.push(option.value);
                        }
                     }
                  });
               }

               if (data.icamrcalcmethodsingle.monthroll) {
                  var splt = data.icamrcalcmethodsingle.monthroll.split(',');
                  self.monthrollChoices = [];
                  self.selectedMonthroll = [];
                  splt.forEach(function (val) {
                     var option = {
                        label: val.trim(),
                        value: val.trim()
                     };
                     self.monthrollChoices.push(option);
                     if (self.usageAnalysis.reportno === 0) {
                        if (option.label === '3 Months' || option.label === '6 Months' || option.label === '9 Months') {
                           self.selectedMonthroll.push(option.value);
                        }
                     }
                  });
               }

               if (data.icamrcalcmethodsingle.exponsmooth) {
                  var splt = data.icamrcalcmethodsingle.exponsmooth.split(',');
                  self.exponsmoothChoices = [];
                  self.selectedExponsmooth = [];
                  splt.forEach(function (val) {
                     var option = {
                        label: val.trim(),
                        value: val.trim()
                     };
                     self.exponsmoothChoices.push(option);
                     if (self.usageAnalysis.reportno === 0) {
                        if (option.label === '3 Alpha Factor' || option.label === '6 Alpha Factor' || option.label === '9 Alpha Factor') {
                           self.selectedExponsmooth.push(option.value);
                        }
                     }
                  });
               }
            }
         }

         self.populateGrid();
      });
   };

   self.populateGridMethods = function (icamrloadusagerateanalysistt) {
      self.usageMethodList = [];

      icamrloadusagerateanalysistt.forEach(function (record) {
         self.usageMethodList.push(record);
      });

      var len = self.usageMethodList.length;
      for (var i = 0; i < len; i++) {
         self.usageMethodList[i].pct = Math.round(self.usageMethodList[i].pct * 100) / 100;
         self.usageMethodList[i].UsageGoal = self.usageGoal;
      }
   };

   self.populateGrid = function () {
      var backwardChoices = '';
      var trendChoices = '';
      var forwardChoices = '';
      var monthrollChoices = '';
      var exponsmoothChoices = '';

      self.selectedBackward.forEach(function (val) {
         backwardChoices = backwardChoices;
         if (backwardChoices) {
            backwardChoices = backwardChoices + ',';
         }
         backwardChoices = backwardChoices + val;
      });
      self.selectedTrend.forEach(function (val) {
         trendChoices = trendChoices;
         if (trendChoices) {
            trendChoices = trendChoices + ',';
         }
         trendChoices = trendChoices + val;
      });
      self.selectedForward.forEach(function (val) {
         forwardChoices = forwardChoices;
         if (forwardChoices) {
            forwardChoices = forwardChoices + ',';
         }
         forwardChoices = forwardChoices + val;
      });
      self.selectedMonthroll.forEach(function (val) {
         monthrollChoices = monthrollChoices;
         if (monthrollChoices) {
            monthrollChoices = monthrollChoices + ',';
         }
         monthrollChoices = monthrollChoices + val;
      });
      self.selectedExponsmooth.forEach(function (val) {
         exponsmoothChoices = exponsmoothChoices;
         if (exponsmoothChoices) {
            exponsmoothChoices = exponsmoothChoices + ',';
         }
         exponsmoothChoices = exponsmoothChoices + val;
      });

      var criteria = {
         reportno: self.usageAnalysis.reportno,
         whse: self.usageAnalysis.whse,
         prod: self.usageAnalysis.prod,
         unit: '',
         secure: self.usageAnalysis.secure,
         monthsbackward: backwardChoices,
         monthstrend: trendChoices,
         monthsforward: forwardChoices,
         monthsmonthroll: monthrollChoices,
         exponsmooth: exponsmoothChoices,
         rowidIcamapm: 0
      };

      DataService.post('api/ic/asicadmin/icamrloadusagerateanalysistt', { data: { icamrcriteria: criteria, icamrusagesensitivitysingle: self.icamrusagesensitivitysingle }, busy: true }, function (data) {
         if (data) {
            if (data.icamrloadusagerateanalysistt) {
               self.populateGridMethods(data.icamrloadusagerateanalysistt);
            }
            if (data.icamrloadusagerateprodtt) {
               self.icamrloadusagerateprodtt = data.icamrloadusagerateprodtt;
            }
         }
      });

   };

   // First time in here
   if (self.usageAnalysis) {
      self.retrieveCurrentProductData();
   }

   self.updateSelectedRow = function () {

      var singleRecord = GridService.getSelectedRecord(self.grid);
      if (singleRecord) {
         // Note: the icamrcriteria is not used in this SI call, providing a basic one.
         var icamrCriteria = {
            prod: base.usageAnalysis.prod,
            whse: base.usageAnalysis.whse,
            reportno: base.usageAnalysis.reportno
         };
         var singlemethodwasChosenCrit = {
            ttblseqno: singleRecord.ttblseqno
         };

         DataService.post('api/ic/asicadmin/icamrsinglemethodwaschosen', {
            data: {
               icamrloadusagerateanalysistt: self.usageMethodList,
               icamrloadusagerateprodtt: self.icamrloadusagerateprodtt,
               icamrcriteria: icamrCriteria,
               icamrusagesensitivitysingle: self.icamrusagesensitivitysingle,
               singlemethodwaschosencrit: singlemethodwasChosenCrit
            }, busy: true
         }, function (data) {
            if (data) {
               if (data.icamrloadusagerateanalysistt) {
                  self.populateGridMethods(data.icamrloadusagerateanalysistt);
               }
               if (data.icamrusagesensitivitysingle) {
                  self.icamrusagesensitivitysingle = data.icamrusagesensitivitysingle
               }
            }
         });
      }
   };

   self.submit = function () {

      var msg = MessageService.get('global.update.ordering.controls');
      MessageService.yesNoCancel('', msg, self.submitAfterPromptYes, self.submitAfterPromptNo, self.submitAfterPromptCancel);
   };

   self.submitAfterPromptYes = function () {
      self.submitSave(true);
   };

   self.submitAfterPromptNo = function () {
      self.submitSave(false);
   };

   self.submitAfterPromptCancel = function () {
      MessageService.info('global.information', 'global.update.aborted');
   };

   self.submitSave = function (updateOrderingControls) {

      // Note: the icamrusagerateanalysisupdtt temp-table is not used in this SI call
      var notUsedArray = [];
      var criteria = {
         reportno: self.usageAnalysis.reportno,
         whse: self.usageAnalysis.whse,
         prod: self.usageAnalysis.prod,
         unit: '',
         secure: self.usageAnalysis.secure,
         monthsbackward: '',
         monthstrend: '',
         monthsforward: '',
         monthsmonthroll: '',
         exponsmooth: '',
         rowidIcamapm: 0
      };
      DataService.post('api/ic/asicadmin/icamuupdateusageratefromanalysistt', {
         data: {
            icamrloadusagerateanalysistt: self.usageMethodList,
            icamrloadusagerateprodtt: self.icamrloadusagerateprodtt,
            icamrusagerateanalysisupdtt: notUsedArray,

            icamrcalcmethodcriteria: self.usageAnalysis,
            icamrcalcmethodratesingle: self.icamrcalcmethodratesingle,
            icamrcalcmethodsingle: self.icamrcalcmethodsingle,
            icamrcriteria: criteria,

            lUpdateCtrlFl: updateOrderingControls
         }, busy: true
      }, function (data) {
         if (data) {
            self.retrieveCurrentProductData()   ;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      });
   };
});