'use strict';

app.config(function (StateProvider, $stateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icseb',
      dataPath: 'api/ic/icseb',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsebgetlist',
      searchResultsField: '',
      resultsRowIdField: 'rowidIcseb',
      detailSubTitle: [
         { label: null, value: 'prod' },
         { label: null, value: 'whse' },
         { label: null, value: 'bundleid' }
      ],
      recentlyVisited: {
         title: { label: 'global.product', value: 'prod' },
         description: [
            { label: 'global.warehouse', value: 'whse' },
            { label: 'global.bundle.id', value: 'bundleid' }
         ]
      }
   });
   $stateProvider.state('icseb.detail.components', {
      url: '/components',
      params: {
         icsebcompcriteria: null,
         icsebresults: null
      },
      views: {
         icsebComponents: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icseb/component-detail.json');
            },
            controller: 'IcsebComponentsCtrl as comp'
         }
      }
   });
});

app.service('IcsebService', function ($state, $stickyState, $translate, DataService, GridService, MessageService, UserService) {
   this.extendBaseController = function (self) {
      self.criteria.cono = UserService.getCono();
      self.columnInfo = {
         "columnlabel1": 'sample string 1',
         "columnlabel2": 'sample string 2',
         "columnlabel3": 'sample string 3',
         "columnlabel4": 'sample string 4',
         "columnlabel5": 'sample string 5',
         "columnlabel6": 'sample string 6',
         "columnlabel7": 'sample string 7',
         "columnlabel8": 'sample string 8',
         "columnlabel9": 'sample string 9',
         "columnlabel10": 'sample string 10',
         "columnlabel11": 'sample string 11',
         "columnlabel12": 'sample string 12',
         "columnlabel13": 'sample string 13',
         "columnlabel14": 'sample string 14',
         "columnlabel15": 'sample string 15',
         "columnlabel16": 'sample string 16',
         "columnlabel17": 'sample string 17',
         "columnlabel18": 'sample string 18',
         "columnlabel19": 'sample string 19',
         "columnlabel20": 'sample string 20',
         "columnhidden1": true,
         "columnhidden2": true,
         "columnhidden3": true,
         "columnhidden4": true,
         "columnhidden5": true,
         "columnhidden6": true,
         "columnhidden7": true,
         "columnhidden8": true,
         "columnhidden9": true,
         "columnhidden10": true,
         "columnhidden11": true,
         "columnhidden12": true,
         "columnhidden13": true,
         "columnhidden14": true,
         "columnhidden15": true,
         "columnhidden16": true,
         "columnhidden17": true,
         "columnhidden18": true,
         "columnhidden19": true,
         "columnhidden20": true,
         "lmemomixfl": true,
         "lrandommixfl": true,
         "inquirefl": true,
         "cKPSMwhse": 'sample string 44',
         "userfield": 'sample string 45'
      };

      self.isComponent = function () {
         return $state.is('icseb.detail.components');
      };

      self.getColumns = function () {
         DataService.post('api/ic/asicsetup/icsebgetcontrol', { data: self.criteria, busy: true }, function (data) {
            self.columnInfo = data;
         });
      };
   };

   this.extendSearchController = function (self, base) {
      //overwrite submit for additional columns
      self.submit = function () {
         if (!base.isMaster()) {
            $state.go('icseb.master');
         }
         base.getColumns();
         base.search();
      };
   };

   this.extendMasterController = function (self, base) {
      //overwrite drilldown to prevent drilling into " Loose inventory" record and to pass quantity
      self.drilldown = function (e, args) {
         var record = args[0].item;

         if (record.rowidIcseb === '') { //if static record (Loose Inventory), don't drill down
            return;
         }

         $state.go('^.detail', {
            id: record.rowidIcseb
         });
      };

      if (base.refreshColumns) {
         base.getColumns();
         base.refreshColumns = false;
      }

      self.delete = function () {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var records = GridService.getSelectedRecords(base.grid);
            var delRecord = null;
            var delCount = 0; //to be sure something was deleted
            records.forEach(function (row) { //no correct SI call for deleting multiple, so delete each
               if (row.rowidIcseb !== '') { //don't attempt to delete static record (Loose Inventory)
                  delRecord = {
                     bundleid: row.bundleid,
                     bundleseqno: row.bundleseqno,
                     intype: row.intype,
                     prod: row.pProd,
                     userfield: row.userfield,
                     whse: row.whse
                  };
                  DataService.post('api/ic/asicsetup/icsebdelete', { data: delRecord, busy: true }, function () {
                     base.refreshSearch = true;
                     base.refreshColumns = true;
                     $state.go('^.master', null, { reload: '^.master' });
                  });
                  delCount++;
               }
            });
            if (delCount > 0) {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            }
         });
      };
   };

   this.extendDetailController = function (self, base) {
      //pulling "Quantity" value and the extra data from the row
      self.icseb.$promise.then(function () {
         DataService.post('api/ic/asicsetup/icsebgetlist', { data: { cono: UserService.getCono(), prod: self.icseb.prod, whse: self.icseb.whse }, busy: true }, function (data) {
            if (!base.dataset) {
               base.dataset = data;
               base.criteria.prod = self.icseb.prod;
               base.criteria.whse = self.icseb.whse;
               base.getColumns();
            }
            data.forEach(function (row) {
               if (row.rowidIcseb === self.icseb.rowID) {
                  self.icseb.quantity = row.totlf;
                  self.icsebResult = row;
                  return;
               }
            });
            if (!self.icsebResult) {
               $state.go('^.master', null, { reload: '^.master' });
            }
         });
      });

      self.delete = function () {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            var delRecord = {
               bundleid: self.icsebResult.bundleid,
               bundleseqno: self.icsebResult.bundleseqno,
               intype: self.icsebResult.intype,
               prod: self.icsebResult.pProd,
               userfield: self.icsebResult.userfield,
               whse: self.icsebResult.whse
            };
            DataService.post('api/ic/asicsetup/icsebdelete', { data: delRecord, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.refreshSearch = true;
               base.refreshColumns = true;
               $state.go('^.master', null, { reload: '^.master' });
            });
         });
      };
   };

   this.extendCreateController = function (self, base) {
      //overwriting submit to use correct SI call
      self.submit = function () {
         DataService.post('api/ic/asicsetup/icsebadd', { data: self.icseb, busy: true }, function (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.criteria.prod = data.icsebcompcriteria.prod;
            base.criteria.whse = data.icsebcompcriteria.whse;
            base.refreshSearch = true;
            base.refreshColumns = true;
            $stickyState.reset('^.master');
            $state.go('^.detail.components', { id: data.icsebresults.rowidIcseb, icsebcompcriteria: data.icsebcompcriteria, icsebresults: data.icsebresults });
         });
      };
   };
});

app.controller('IcsebComponentsCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService) { //as comp
   var self = this;
   var dtl = $scope.dtl;
   var base = $scope.base;
   var icsebcontrol = base.columnInfo;
   var deletedComponents = [];
   self.icsebcompcriteria = null;


   if ($stateParams.icsebresults && !dtl.icsebResult) {
      dtl.icsebResult = $stateParams.icsebresults;
   }

   if (!$stateParams.icsebcompcriteria) {
      self.icsebcompcriteria = {
         bundleid: dtl.icsebResult.bundleid,
         prod: dtl.icsebResult.pProd,
         whse: dtl.icsebResult.whse,
         orderno: dtl.icsebResult.orderno,
         ordersuf: dtl.icsebResult.ordersuf,
         intype: dtl.icsebResult.intype
      };
   } else {
      self.icsebcompcriteria = $stateParams.icsebcompcriteria;
   }

   DataService.post('api/ic/asicsetup/icsebcompgetlist', { data: { icsebresults: [dtl.icsebResult], icsebcompcriteria: self.icsebcompcriteria }, busy: true }, function (data) {
      self.dataset = data.icsebcompresults;
      self.resultToSaveIcsebResults = data.icsebresults;
      self.topBanner = data.icsebcomptopbanner;
   });

   DataService.post('api/ic/asicsetup/icsebcompaddupdinitialize', { data: { icsebcompcriteria: self.icsebcompcriteria, icsebcontrol: icsebcontrol }, busy: true }, function (data) {
      self.icsebControl = data;
   });

   self.delete = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         var records = GridService.getSelectedRecords(self.grid);
         var icsebCompDelete = null;
         records.forEach(function (row) { //no SI call to handle multiple deletes, so for each
            icsebCompDelete = {
               rowidOeelm: row.rowidOeelm,
               cono: row.cono,
               ordertype: row.ordertype,
               orderno: row.orderno,
               ordersuf: row.ordersuf,
               lineno: row.lineno,
               seqno: row.seqno,
               bundleid: row.bundleid,
               compseqno: row.compseqno,
               userfield: row.userfield
            };
            DataService.post('api/ic/asicsetup/icsebcompdelete', { data: { icsebcompresults: [row], icsebcompcriteria: self.icsebcompcriteria, icsebcompdelete: icsebCompDelete }, busy: true }, function (data) {
               data.icsebcompresults.forEach(function (del) {
                  deletedComponents.push(del);
               });
               self.topBanner = data.icsebcomptopbanner;
               self.dataset.splice(self.dataset.indexOf(row), 1);
            });
         });
      });
   };

   self.newComponent = function () {
      ModalService.showModal('ic/icseb/add-comp.json', 'IcsebAddComponentModalCtrl as mod', $scope, function (modal) {
         self.addCompModal = modal;
      });
   };

   self.submit = function () {
      var saveRecords = [];
      self.dataset.forEach(function (record) {
         saveRecords.push(record);
      });
      deletedComponents.forEach(function (del) {
         saveRecords.push(del);
      });
      DataService.post('api/ic/asicsetup/icsebupdate', { data: { icsebcompresults: saveRecords, icsebresults: self.resultToSaveIcsebResults, icsebcompcriteria: self.icsebcompcriteria }, busy: true }, function (data) {
         DataService.post('api/ic/asicsetup/icsebsave', { data: { icsebcompresults: data.icsebcompresults, icsebresults: data.icsebresults, icsebcompcriteria: self.icsebcompcriteria }, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.criteria.prod = self.resultToSaveIcsebResults[0].pProd;
            base.criteria.whse = self.resultToSaveIcsebResults[0].whse;
            base.refreshSearch = true;
            base.refreshColumns = true;
            $state.go('^.^.master', null, { reload: '^.^.master' });
         });
      });
   };
});

app.controller('IcsebAddComponentModalCtrl', function ($scope, DataService, MessageService) { //as mod
   var self = this;
   var comp = $scope.comp;
   self.qtyAvail = '';
   self.messages = [];
   self.newComp = {
      length: 1,
      quantity: 1,
      qtyord: 1,
      mode: 'add'
   };

   self.passedCheck = false;

   self.cancel = function () {
      comp.addCompModal.destroy();
   };

   self.submit = function () {
      DataService.post('api/ic/asicsetup/icsebcompaddupdsave', { data: { icsebcompresults: comp.dataset, icsebcompcriteria: comp.icsebcompcriteria, icsebcompnew: self.newComp, icsebcontrol: comp.icsebControl }, busy: true }, function (data) {
         comp.dataset = data.icsebcompresults;
         comp.topBanner = data.icsebcomptopbanner;
      });
      comp.addCompModal.destroy();
   };

   self.checkComponentAddUp = function () {
      comp.icsebcompcriteria.functionname = 'icseb';
      comp.icsebcompcriteria.ordertype = 'I';
      DataService.post('api/ic/asicsetup/icsebcompaddupdvalidate', { data: { icsebcompcriteria: comp.icsebcompcriteria, icsebcompnew: self.newComp, icsebcontrol: comp.icsebControl }, busy: true }, function (data) {
         self.qtyAvail = data.icsebcompnew.qtyavail;
         self.newComp = data.icsebcompnew;
         if (!MessageService.processMessaging(data.messaging)) {
            self.passedCheck = true;
         }
      });
   };
});