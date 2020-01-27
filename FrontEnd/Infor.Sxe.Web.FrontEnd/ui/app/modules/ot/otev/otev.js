'use strict';

app.config(function ($stateProvider, StateProvider) {
   var module = 'ot';
   var menuFn = 'otev';
   var baseState = 'otev';

   StateProvider.addTransactionBaseState(module, menuFn, {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState(module, baseState);

   $stateProvider.state(baseState + '.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otev/detail.json');
            },
            controller: 'OtevDetailCtrl as dtl'
         }
      }
   });
   $stateProvider.state(baseState + '.detail', {
      url: '/detail',
      params: { otevRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otev/detail.json');
            },
            controller: 'OtevDetailCtrl as dtl'
         }
      }
   });
   $stateProvider.state(baseState + '.lines', {
      url: '/lines',
      params: { otevRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otev/vessel-lines.json');
            },
            controller: 'OtevVesselLinesCtrl as vlc'
         }
      }
   });
});

app.controller('OtevBaseCtrl', function ($state, DataService) {
   var self = this;
   self.criteria = {
      vesselno: 0,
      vessnm: '',
      voyageno: '',
      stagecd: ''
   };

   self.isMaster = function () {
      return $state.is('otev.master');
   };

   self.includesMaster = function () {
      return $state.includes('otev.master');
   };

   self.isDetail = function () {
      return $state.is('otev.detail');
   };

   self.includesDetail = function () {
      return $state.includes('otev.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/ot/asotentry/otevbuildvessellist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.isCreate = function () {
      return $state.is('otev.create');
   };

   self.isLines = function () {
      return $state.is('otev.lines');
   };

});

app.controller('OtevSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('otev.master');
      }
      base.search();
   };
});

app.controller('OtevMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;

      DataService.get('api/ot/asotentry/otevvesselheaderload/' + selectedRecord.vesselno, { busy: true }, function (data) {
         var record = data;

         record.vesselno = selectedRecord.vesselno;

         $state.go('^.detail', {
            otevRecord: record
         });
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.vesselProcess = function (e, args) {
      var selectedRecord = base.dataset[args.row];
      var vesseldata = {
         vesselno: selectedRecord.vesselno,
         vessnm: selectedRecord.vessnm,
         voyageno: selectedRecord.voyageno
      };

      DataService.post('api/ot/asotentry/otevupdatevesselstage', {
         data: {
            otevvesseldata: vesseldata,
            iNewStage: args.value
         },
         busy: true
      }, function (data) {
         if (data) {
            if (data.cWarningMessage.length > 0) {
               MessageService.info('global.alert', data.cWarningMessage);
            }
            base.dataset[args.row] = data.otevvesseldata;
         }
      });
   };

   self.isDeleteEnabled = function () {
      if (base.grid.isOneRowSelected()) {

         var selectedRow = GridService.getSelectedRecord(base.grid);

         if (selectedRow.stagecd >= 2) {
            return false;
         } else {
            return true;
         }
      }
      return false;
   };

   self.delete = function () {
      var record = GridService.getSelectedRecord(base.grid);

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.get('api/ot/asotentry/otevdeletevessel/' + record.vesselno, { busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            base.search();
         });
      });
   };
});

app.controller('OtevDetailCtrl', function ($scope, $state, $stateParams, DataService, $translate, GridService, MessageService, Utils, SecurityService) {
   var self = this;
   var base = $scope.base;
   var isCreate = base.isCreate();
   var isDetail = base.isDetail();

   self.otevRecord = $stateParams.otevRecord;
   self.isDepartureReadOnly = false;
   self.isArrivalReadOnly = false;
   self.isUnloadedReadOnly = false;
   self.todaysDate = Utils.getCurrentDate();

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('otev', 'Header') < 3;
   self.isLinesTabReadonly = SecurityService.getSubSecurityLevel('otev', 'Lines') < 3;
   self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('otev', 'Custom') < 3;

   function getLinesData() {
      DataService.get('api/ot/asotinquiry/otivbuildvessellinelist/' + self.otev.vesselno, {
         busy: true
      }, function (data) {
         base.datasetLines = data;
      });
   }

   if (isCreate) {
      DataService.get('api/ot/asotentry/otevaddvessel', { busy: true }, function (data) {
         self.otev = data.otevvesseldata;
         self.otevRecord = data.otevvesseldata;
         $scope.base.vesselno = data.iVesselNo;

         self.vesselDetailsHeader = $translate.instant('global.vessel.number') + ': ' + self.otev.vesselno;

         getLinesData();
      });
   }
   else if (isDetail) {
      self.otev = $stateParams.otevRecord;

      self.vesselDetailsHeader = $translate.instant('global.vessel.number') + ': ' + self.otev.vesselno;

      $scope.base.vesselno = self.otev.vesselno;
      $scope.base.vessnm = self.otev.vessnm;
      $scope.base.voyageno = self.otev.voyageno;
      $scope.base.empty = '';

      if (self.otev.actdeptdt) {
         self.isDepartureReadOnly = true;
      }
      if (self.otev.actarrdt) {
         self.isDepartureReadOnly = true;
         self.isArrivalReadOnly = true;
      }
      if (self.otev.actunldt) {
         self.isDepartureReadOnly = true;
         self.isArrivalReadOnly = true;
         self.isUnloadedReadOnly = true;
      }

      var params = {
         vesselno: self.otev.vesselno
      };
      DataService.get('api/ot/otevh/getbypk', { params: params, busy: true }, function (data) {
         self.otev = data;
      });

      getLinesData();
   }

   self.updateHeader = function () {
      var vesseldata = {
         vesselno: self.otev.vesselno,
         vessnm: self.otev.vessnm,
         voyageno: self.otev.voyageno
      };
      var vesselheader = {
         vesselno: self.otev.vesselno,
         vessnm: self.otev.vessnm,
         voyageno: self.otev.voyageno,
         shipid: self.otev.shipid,
         shipco: self.otev.shipco,
         countryorgcd: self.otev.countryorgcd,
         countrydestcd: self.otev.countrydestcd,
         actdeptdt: self.otev.actdeptdt,
         estdeptdt: self.otev.estdeptdt,
         revdeptdt: self.otev.revdeptdt,
         actarrdt: self.otev.actarrdt,
         estarrdt: self.otev.estarrdt,
         revarrdt: self.otev.revarrdt,
         actunldt: self.otev.actunldt,
         estunldt: self.otev.estunldt,
         revunldt: self.otev.revunldt
      };
      DataService.post('api/ot/asotentry/otevvesselheaderupdate', {
         data: {
            otevvesseldata: vesseldata,
            otevvesselheader: vesselheader
         },
         busy: true
      }, function (data) {
         if (data) {
            // Display any Messages/Errors - ttblmessaging
            if (!MessageService.processMessaging(data.messaging)) {
               self.otev.stagecd = data.otevvesseldata.stagecd;
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         }
      });
   };

   self.updateCustom = function () {
      if (isCreate) {
         DataService.post('api/ot/otevh', { data: self.otev, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         });
      }
      else if (isDetail) {
         DataService.put('api/ot/otevh', { data: self.otev, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         });
      }
   };

   self.deleteLines = function () {
      var records = GridService.getSelectedRecords(base.linesGrid);

      if (records) {
         records.forEach(function (record) {
            DataService.get('api/ot/asotentry/otevdeletevesselline/' + self.otev.vesselno + '/' + record.lineno, { busy: true }, function () {
               getLinesData();
            });
         });
      }
   };

   self.newLineClick = function () {
      $state.go('otev.lines', { otevRecord: self.otevRecord });
   };

   self.actualDepartureChanged = function () {
      if (self.otev.actdeptdt <= self.todaysDate) {
         self.isDepartureReadOnly = true;
      }
   };

   self.actualArrivalChanged = function () {
      if (self.otev.actarrdt <= self.todaysDate) {
         self.isArrivalReadOnly = true;
         self.isDepartureReadOnly = true;
         if (!self.otev.actdeptdt) {
            self.otev.actdeptdt = self.otev.actarrdt;
         }
      }
   };

   self.actualUnloadedChanged = function () {
      if (self.otev.actunldt <= self.todaysDate) {
         self.isArrivalReadOnly = true;
         self.isDepartureReadOnly = true;
         self.isUnloadedReadOnly = true;
         if (!self.otev.actdeptdt) {
            self.otev.actdeptdt = self.otev.actunldt;
         }
         if (!self.otev.actarrdt) {
            self.otev.actarrdt = self.otev.actunldt;
         }
      }
   };

   self.navigateToVendor = function (e, args) {
      if (args[0].item.vendno) {
         $state.go('apiv.detail', { pk: args[0].item.vendno });
      }
   };

   self.navigateToTrackNo = function (e, args) {
      var trackdata = {
         trackno: args[0].item.trackno
      };
      $state.go('otit.detail', { record: trackdata });
   };

});

app.controller('OtevVesselLinesCtrl', function ($scope, $state, $stateParams, DataService, MessageService, $translate) {
   var self = this;
   var base = $scope.base;

   self.otevRecord = $stateParams.otevRecord;
   self.otevaddtrackno = {};

   self.otevaddtrackno.vesselno = base.vesselno;
   self.otevaddtrackno.isCreateAnother = true;
   self.vesselDetailsHeader = $translate.instant('global.vessel.number') + ': ' + base.vesselno;

   self.back = function () {
      $state.go('^.detail', { otevRecord: self.otevRecord });
   };

   self.vesselInit = function () {
      var params = {
         trackno: self.otevaddtrackno.trackno
      };
      DataService.get('api/ot/oteh/getbypk', { params: params, busy: true }, function (data) {
         self.otevaddtrackno.vendno = data.vendno;
         self.otevaddtrackno.contno = data.contno;
         self.otevaddtrackno.stagecd = data.stagecd;
      });
   };

   self.submit = function () {
      DataService.get('api/ot/asotentry/otevaddvesselline/' + self.otevaddtrackno.vesselno + '/' + self.otevaddtrackno.trackno, { busy: true }, function (data) {
         if (data) {
            base.datasetLines = data;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            if (self.otevaddtrackno.isCreateAnother) {
               self.otevaddtrackno.trackno = '';
               self.otevaddtrackno.vendno = '';
               self.otevaddtrackno.contno = '';
               self.otevaddtrackno.stagecd = '';

            } else {
               $state.go('^.detail', { otevRecord: self.otevRecord });
            }
         }
      });
   };
});