'use strict';

app.config(function ($stateProvider, StateProvider) {
   var module = 'ot';
   var menuFn = 'otet';
   var baseState = 'otet';

   StateProvider.addTransactionBaseState(module, menuFn, {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState(module, baseState);

   $stateProvider.state(baseState + '.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otet/detail.json');
            },
            controller: 'OtetDetailCtrl as dtlc'
         }
      }
   });

   $stateProvider.state(baseState + '.detail', {
      url: '/detail',
      params: { otetRecord: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otet/detail.json');
            },
            controller: 'OtetDetailCtrl as dtlc'
         }
      }
   });

   $stateProvider.state(baseState + '.polines', {
      url: '/po-lines',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otet/po-lines.json');
            },
            controller: 'OtetPoLinesCtrl as plc'
         }
      }
   });

   // Addons state
   $stateProvider.state(baseState + '.detail.addons', {
      url: '/addons',
      views: {
         childView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otet/addons.json');
            },
            controller: 'OtetAddonsCtrl as add'
         }
      }
   });

   $stateProvider.state(baseState + '.trackingprocess', {
      url: '/tracking-process',
      params: { trackno: null, isQuickProcess: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otet/tracking-process.json');
            },
            controller: 'OtetTrackingProcessCtrl as otpc'
         }
      }
   });
});

app.controller('OtetBaseCtrl', function ($state, DataService, TabService, MessageService) {
   var self = this;
   self.criteria = { stagecd: '' };
   self.isMaster = function () {
      return $state.is('otet.master');
   };

   self.includesMaster = function () {
      return $state.includes('otet.master');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/ot/asotentry/otetbuildtracklist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.isDetail = function () {
      return $state.is('otet.detail');
   };

   self.isCreate = function () {
      return $state.is('otet.create');
   };

   self.isPoLines = function () {
      return $state.is('otet.polines');
   };

   TabService.canUserCloseTab('otet.master', function () {
      if (self.isDetail() || self.isCreate() || self.isPoLines()) {
         MessageService.error('global.error', 'message.unable.to.close.transaction.function');
         return false;
      } else {
         if (self.trackno) {
            DataService.get('api/ot/asotentry/otettrackdetailleave/' + self.trackno, { busy: true });
         }
         return true;
      }
   });
});

app.controller('OtetSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.stagecd = '';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('otet.master');
      }

      base.search();
   };
});

app.controller('OtetMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;

      DataService.get('api/ot/asotentry/otettrackdetailinitialize/' + selectedRecord.trackno, { busy: true }, function (data) {
         var record = data;
         record.trackno = selectedRecord.trackno;
         $state.go('^.detail', {
            otetRecord: record
         });
      });
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.navigateToTrack = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         var record = { trackno: currentRow.trackno };

         $state.go('otit.detail', { record: record });
      }
   };

   self.navigateToVendor = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.vendno) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.isDeleteDisabled = function () {
      var disabled = true;

      var record = GridService.getSelectedRecord(base.grid);

      if (record) {
         if (base.grid.isOneRowSelected() && record.stagecd < 3) {
            disabled = false;
         }
      }

      return disabled;
   };

   function finalDelete(question, trackdelete) {
      MessageService.yesNo('global.confirmation', question,
                           function () {
                              // Yes processing
                              trackdelete.deletefl = true;

                              DataService.post('api/ot/asotentry/otetdeletetrackno', { data: trackdelete, busy: true }, function (data) {
                                 base.datasetLines = [];
                                 if (data) {
                                    base.search();
                                 }
                              });
                           }, function () {
                              // No processing

                           });
   }

   self.deleteTrack = function () {
      var record = GridService.getSelectedRecord(base.grid);

      if (record) {
         var otettrackdelete = {};
         otettrackdelete.trackno = record.trackno;
         otettrackdelete.deletefl = false;

         DataService.post('api/ot/asotentry/otetdeletetrackno', { data: otettrackdelete, busy: true }, function (data) {
            if (data) {
               finalDelete(data.deletequestion, otettrackdelete);
            }
         });
      }
   };

   self.quickTrackingProcess = function () {
      $state.go('otet.trackingprocess', { trackno: null, isQuickProcess: true });
   };

   self.trackingProcess = function () {
      var record = GridService.getSelectedRecord(base.grid);
      if (record) {
         $state.go('otet.trackingprocess', { trackno: record.trackno, isQuickProcess: false });
      }
   };
});

app.controller('OtetDetailCtrl', function ($scope, $state, $stateParams, DataService, $translate, MessageService, GridService, SecurityService) {
   var self = this;
   var base = $scope.base;
   var isCreate = base.isCreate();
   var isDetail = base.isDetail();
   self.addonsCollection = [];

   self.isActwhseunldtVisible = true;
   self.isActemptydtVisible = true;
   self.isActretdtVisible = true;

   self.isHeaderTabReadonly = SecurityService.getSubSecurityLevel('otet', 'Header') < 3;
   self.isTotalsTabReadonly = SecurityService.getSubSecurityLevel('otet', 'Totals') < 3;
   self.isLinesTabReadonly = SecurityService.getSubSecurityLevel('otet', 'Lines') < 3;
   self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('otet', 'Custom') < 3;

   function formatStage(stage) {
      if (stage || stage === 0) {
         switch (stage.toString()) {
            case '0':
               return $translate.instant('global.entered');
            case '1':
               return $translate.instant('global.production');
            case '2':
               return $translate.instant('global.complete');
            case '3':
               return $translate.instant('global.shipped');
            case '4':
               return $translate.instant('global.arrived');
            case '5':
               return $translate.instant('global.demurrage');
            case '6':
               return $translate.instant('global.at.whse');
            case '7':
               return $translate.instant('global.received');
            case '8':
               return $translate.instant('global.empty');
            case '9':
               return $translate.instant('global.closed');
            default:
               return '';
         }
      } else {
         return '';
      }
   }

   function getLinesData() {
      DataService.get('api/ot/asotinquiry/otittracklineload/' + self.otet.trackno, { busy: true }, function (data) {
         base.datasetLines = data;
      });
   }

   function setDetails() {
      self.trackDetailsHeader = $translate.instant('global.tracking.number') + ': ' + self.otet.trackno;

      $scope.base.trackno = self.otet.trackno;
      $scope.base.otettrackdetail = self.otet.otettrackdetail;
      self.formattedStagecd = formatStage(self.otet.otettrackdetail.stagecd);
      if (!self.otet.otettrackdetail.afterrcvstg) {
         self.isActwhseunldtVisible = true;
         self.isActemptydtVisible = true;
         self.isActretdtVisible = true;
      }
      else if (self.otet.otettrackdetail.afterrcvstg) {
         if (self.otet.otettrackdetail.whseunldtenabled) {
            self.isActwhseunldtVisible = false;
            self.isActwhseunldtEnabled = false;
         }

         if (self.otet.otettrackdetail.emptydtenabled) {
            self.isActemptydtVisible = false;
            self.isActemptydtEnabled = false;
         }

         if (self.otet.otettrackdetail.retdtenabled) {
            self.isActretdtVisible = false;
            self.isActretdtEnabled = false;
         }
      }
      $scope.base.empty = '';
      self.addonsCollection = self.otet.otaddons;

      var params = { trackno: self.otet.trackno };
      DataService.get('api/ot/oteh/getbypk', { params: params, busy: true }, function (data) {
         self.oteh = data;
      });

      getLinesData();
   }

   if (isCreate) {
      DataService.get('api/ot/asotentry/otetaddtrackno', { busy: true }, function (data) {
         self.addonsCollection = data.otaddons;
         self.otet = {};
         self.otet.otettrackdetail = data.otettrackdetail;
         self.otet.trackno = data.iTrackNo;
         $scope.base.trackno = self.otet.trackno;
         $scope.base.otettrackdetail = data.otettrackdetail;
         self.formattedStagecd = formatStage(data.otettrackdetail.stagecd);

         self.trackDetailsHeader = $translate.instant('global.tracking.number') + ': ' + self.otet.trackno;

         if (self.otet) {
            var params = { trackno: self.otet.trackno };
            DataService.get('api/ot/oteh/getbypk', { params: params, busy: true }, function (data) {
               self.oteh = data;
            });
         }
      });
   }
   else if (isDetail) {
      self.otet = $stateParams.otetRecord;

      if (!self.otet) {
         if (base.trackno) {
            DataService.get('api/ot/asotentry/otettrackdetailinitialize/' + base.trackno, {
               busy: true
            }, function (data) {
               if (data) {
                  self.otet = data;
                  self.otet.trackno = base.trackno;

                  setDetails();
               }
            });
         }
      }
      else {
         setDetails();
      }
   }

   self.updateHeader = function () {
      DataService.post('api/ot/asotentry/otettrackheaderupdate', { data: self.otet.otettrackdetail, busy: true }, function (data) {
         if (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      });
   };

   self.updateTotals = function () {
      var totalsData = { otaddons: self.addonsCollection, otettrackdetail: self.otet.otettrackdetail };

      DataService.post('api/ot/asotentry/otettracktotalupdate', { data: totalsData, busy: true }, function (data) {
         if (data.messaging && data.messaging.length > 0) {
            MessageService.errorMessages(data.messaging);
         }
         else {
            self.otet.otettrackdetail = data.otettrackdetail;
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      });
   };

   self.updateCustom = function () {
      if (self.oteh && !self.oteh.rowID) {
         DataService.post('api/ot/oteh', { data: self.oteh, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         });
      }
      else if (self.oteh && self.oteh.rowID) {
         DataService.put('api/ot/oteh', { data: self.oteh, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
         });
      }
   };

   self.deleteLines = function () {
      MessageService.yesNo('global.question', 'question.are.you.sure.you.want.to.delete.the.selected.lines',
                           function () {
                              // Yes processing
                              var records = GridService.getSelectedRecords(base.linesGrid);
                              var lineData = {};

                              if (records) {
                                 records.forEach(function (record) {
                                    lineData = {
                                       otettrackdetail: self.otet.otettrackdetail,
                                       iLineNo: record.lineno
                                    };

                                    DataService.post('api/ot/asotentry/otetdeletepoline', { data: lineData, busy: true }, function (data) {
                                       if (data) {
                                          getLinesData();
                                       }
                                    });
                                 });
                              }
                           }, function () {
                              // No processing

                           });
   };

   self.isLinesTabSelected = function () {
      return true;
   };

   self.vendorChanged = function () {
      var params = { otettrackdetail: self.otet.otettrackdetail, cFieldName: 'vendno' };

      DataService.post('api/ot/asotentry/otettrackdetailfieldleave', { data: params, busy: true }, function (data) {
         if (data) {
            self.otet.otettrackdetail = data;
         }
      });
   };

   self.shipFromChanged = function () {
      var params = { otettrackdetail: self.otet.otettrackdetail, cFieldName: 'shipfmno' };

      DataService.post('api/ot/asotentry/otettrackdetailfieldleave', { data: params, busy: true }, function (data) {
         if (data) {
            self.otet.otettrackdetail = data;
         }
      });
   };

   self.onActualDtChanged = function (value) {
      var params = { otettrackdetail: '', cFieldName: '' };
      params = {
         otettrackdetail: self.otet.otettrackdetail,
         cFieldName: value
      };

      DataService.post('api/ot/asotentry/otettrackdetailfieldleave', { data: params, busy: true }, function (data) {
         if (data) {
            self.otet.otettrackdetail = data;
            self.getUpdatedStageValue(value);
         }
      });
   };

   self.getUpdatedStageValue = function (value) {

      if (value === 'actprodstdt')
      {  self.formattedStagecd = $translate.instant('global.production');  }
      else if (value === 'actcompdt')
      {  self.formattedStagecd = $translate.instant('global.complete'); }
      else if (value === 'actdeptdt')
      {  self.formattedStagecd = $translate.instant('global.shipped');  }
      else if (value === 'actdockarrdt')
      {  self.formattedStagecd = $translate.instant('global.arrived');  }
      else if (value === 'actdockdemudt')
      {  self.formattedStagecd = $translate.instant('global.demurrage');   }
      else if (value === 'actatwhsedt')
      {  self.formattedStagecd = $translate.instant('global.at.whse');  }
      else if (value === 'actemptydt')
      {  self.formattedStagecd = $translate.instant('global.empty'); }
      else if (value === 'actretdt')
      {  self.formattedStagecd = $translate.instant('global.closed');   }

      return self.formattedStagecd;
   };

   self.back = function () {
      if (base.trackno) {
         DataService.get('api/ot/asotentry/otettrackdetailleave/' + base.trackno, { busy: true }, function (data) {
            if (data) {
               $state.go('otet.master', { refreshSearch: true }, { reload: 'otet.master' });
            }
         });
      }
   };

   self.ponoClicked = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('poip.detail', { pk: currentRow.pono, pk2: currentRow.posuf });
      }
   };

   self.productClicked = function (e, args) {
      var currentRow = args[0].item;
      var warehouse = '';

      if (self.otet) {
         if (self.otet.otettrackdetail && self.otet.otettrackdetail.whse) {
            warehouse = self.otet.otettrackdetail.whse;
         }
      }

      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.shipprod, pk2: warehouse });
      }
   };
});

app.controller('OtetPoLinesCtrl', function ($scope, $state, $stateParams, $timeout, DataService, MessageService, $translate) {
   var self = this;
   var base = $scope.base;
   self.otetaddpoheader = {};
   base.poLinesGrid = {};
   self.fullPono = '0-00';
   self.otetaddpoheader.trackno = base.trackno;
   self.trackDetailsHeader = $translate.instant('global.tracking.number') + ': ' + base.trackno;
   self.otetaddpoheader.loadtype = 'all';
   base.datasetPoLines = [];

   self.poLineInit = function () {
      var entirePono = self.fullPono.split('-');

      if (entirePono.length === 2) {
         self.otetaddpoheader.pono = entirePono[0];
         self.otetaddpoheader.posuf = entirePono[1];
      }

      base.datasetPoLines = [];
      self.otetaddpoheader.vendno = '';
      self.otetaddpoheader.whse = '';
      self.otetaddpoheader.stagecd = '';
      self.otetaddpoheader.stagecdname = '';

      if (self.otetaddpoheader.pono) {
         DataService.post('api/ot/asotentry/otetaddpolineinit', { data: self.otetaddpoheader, busy: true }, function (data) {
            if (data) {
               if (data.messaging && data.messaging.length > 0) {
                  MessageService.errorMessages(data.messaging);
               }

               else {
                  self.otetaddpoheader = data.otetaddpoheader;
                  self.otetaddpoheader.stagecdname = self.getPOStage(self.otetaddpoheader.stagecd);
                  base.datasetPoLines = data.otetaddpolines;

                  $timeout(function () {
                     if (self.otetaddpoheader.loadtype === 'all') {
                        base.poLinesGrid.selectAllRows();
                     }
                  });
               }
            }
         });

      }
   };

   self.submit = function () {
      var records = JSLINQ(base.datasetPoLines).Where(function (item) { return item.selectfl === true; }).ToArray();

      if (records.length > 0) {
         var linesData = {
            otetaddpolines: records,
            otettrackdetail: base.otettrackdetail
         };

         DataService.post('api/ot/asotentry/otetaddpolineupdate', { data: linesData, busy: true }, function (data) {
            if (data.messaging && data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               self.otittrackline = data.otittrackline;
               self.otettrackdetail = data.otettrackdetail;
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('^.detail');
            }
         });
      }
      else {
         $state.go('^.detail');
      }
   };

   self.getPOStage = function (stageCode) {
      switch (stageCode) {
         case 0:
            return $translate.instant('global.entered');
         case 1:
            return $translate.instant('global.ordered');
         case 2:
            return $translate.instant('global.printed');
         case 3:
            return $translate.instant('global.acknowledged');
         case 4:
            return $translate.instant('global.pre.received');
         case 5:
            return $translate.instant('global.received');
         case 6:
            return $translate.instant('global.costed');
         case 7:
            return $translate.instant('global.closed');
         case 9:
            return $translate.instant('global.cancelled');
         default:
            return '';
      }
   };

   self.loadTypeChanged = function () {
      if (base.datasetPoLines.length > 0) {
         if (self.otetaddpoheader.loadtype === 'all') {
            base.datasetPoLines.forEach(function (record) {
               record.selectfl = true;
            });
         }
         else {
            base.datasetPoLines.forEach(function (record) {
               record.selectfl = false;
            });
         }

         base.poLinesGrid.loadData(base.datasetPoLines);
      }
   };
});

app.controller('OtetAddonsCtrl', function ($state, $scope, $translate, DataService, AodataService, GridService, MessageService, OtConverters) {
   var self = this;
   var dtlc = $scope.dtlc;

   DataService.get('api/shared/assharedinquiry/tablecodenumeric/sastn=x', { busy: true }, function (data) {
      if (data) {
         self.addonTypeCollection = data;

         self.addonTypes = [];

         for (var i = 0; i < self.addonTypeCollection.length; i++) {
            var currentAddonType = self.addonTypeCollection[i];

            self.addonTypes.push({
               label: currentAddonType.descrip,
               value: currentAddonType.codeval
            });
         }

         if (dtlc.addonsCollection.length === 0) {
            self.loadOrderAddons();
         } else {
            self.rerenderData();
         }
      }
   });

   self.grid = {};
   self.rowParams = {};
   self.total = 0;

   //Since The Custom Formatter takes precedence over the WSYWIG formatter, we need
   //to mimic the formatter to carry the decimal place.
   self.convertToDecimal = function (value) {
      var opts = {
         style: 'decimal',
         round: true // Need this, otherwise SoHo truncates extra decimals
      };

      return Locale.formatNumber(value, opts);
   };

   self.addonNoFormatter = function (row, cell, value, column, item) {
      if (value) {
         return value;
      } else {
         return '';
      }
   };

   self.addonAmountsFormatter = function (row, cell, value, column, item) {
      if (item) {
         if (item.addonno) {
            return self.convertToDecimal(value);
         } else {
            return '';
         }
      } else {
         return '';
      }
   };

   self.addonTypeFormatter = function (row, cell, value, column, item) {
      if (item) {
         if (item.addonno) {
            return OtConverters.OtAddOnType.convert(value);
         } else {
            return '';
         }
      } else {
         return '';
      }
   };

   self.addonDistributedByFormatter = function (row, cell, value, column, item) {
      if (item) {
         if (item.addonno) {
            return OtConverters.OtDistributeBy.convert(value);
         } else {
            return '';
         }
      } else {
         return '';
      }
   };

   self.loadOrderAddons = function () {
      //TODO: Need to check whether similar call is available or not and/or required or not?
      //DataService.get('api/oe/asoeinquiry/loadorderaddons/' + base.oehdr.orderno + '/' + dtlc.orderSuffix + '/false', { busy: true }, function (data) {
      //   if (data) {
      //      Utils.replaceArray(dtlc.addonsCollection, data);
      //      self.rerenderData();
      //   }
      //});
   };

   self.rerenderData = function () {
      self.grid.loadData(dtlc.addonsCollection);

      self.recalculateTotal();
   };

   self.recalculateTotal = function () {
      var newTotal = 0;

      for (var i = 0; i < dtlc.addonsCollection.length; i++) {
         newTotal += dtlc.addonsCollection[i].addonnet;
      }

      self.total = newTotal;
   };

   self.newAddon = function () {
      dtlc.addonsCollection.push({ isNewAddon: true, addonnet: 0 });

      self.rerenderData();

      self.grid.toggleRowDetail((dtlc.addonsCollection.length * 2) - 1);
   };

   self.isDeleteAddonsDisabled = function () {
      var isDeleteDisabled = false;

      if (self.grid.isNoRowSelected() || dtlc.otet.otettrackdetail.afterrcvstg === true) {
         isDeleteDisabled = true;
      }

      return isDeleteDisabled;
   };

   self.deleteAddons = function () {
      var selectedRecords = GridService.getSelectedRecords(self.grid);

      if (selectedRecords) {
         MessageService.yesNo($translate.instant('global.delete.items'), $translate.instant('question.delete.selected.addons'), function () {
            var indexesArray = [];
            for (var j = 0; j < selectedRecords.length; j++) {
               var currentRecord = selectedRecords[j];

               if (currentRecord.addonseqno > 0 && currentRecord.addonseqno <= 4) {
                  //replace it with a new empty addon
                  dtlc.addonsCollection[currentRecord.addonseqno - 1].addonno = 0;
                  dtlc.addonsCollection[currentRecord.addonseqno - 1].addonamt = 0;
                  dtlc.addonsCollection[currentRecord.addonseqno - 1].addondesc = '';
                  dtlc.addonsCollection[currentRecord.addonseqno - 1].addondistr = '';
                  dtlc.addonsCollection[currentRecord.addonseqno - 1].addonnet = 0;
                  dtlc.addonsCollection[currentRecord.addonseqno - 1].addontype = false;
               } else if (currentRecord.distrenabled === true || currentRecord.isNewAddon === true || currentRecord.addonseqno === 0) {
                  //Store the indexes in an array, later will remove the items from the Addons collection.
                  var index = dtlc.addonsCollection.indexOf(currentRecord);
                  indexesArray.push(index);
               }
            }

            //remove it from the collection
            for (var i = indexesArray.length - 1; i >= 0; i--) {
               dtlc.addonsCollection.splice(indexesArray[i], 1);
            }

            self.rerenderData();
         }, null);
      }
   };

   self.back = function () {
      $state.go('^');
   };
});

app.controller('OtetAddonDetailCtrl', function ($state, $scope, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var add = $scope.add;
   var dtlc = $scope.dtlc;
   var addonRowNumber = add.rowParams.row;

   self.addonRow = add.rowParams.item;

   self.isEmptyAddon = self.addonRow.addonno === 0;

   if (self.addonRow) {
      if (!self.addonRow.addonno) {
         self.addonRow.addontype = false;
      }
   }

   self.addonamtChanged = function () {
      if (!self.addonRow.isNewAddon) {
         dtlc.addonsCollection.forEach(function (addon) {
            if (addon.addonseqno === self.addonRow.addonseqno) {
               addon.addonamt = self.addonRow.addonamt;
            }
         });
         var addonsParam = { otaddons: dtlc.addonsCollection, pvSeqno: self.addonRow.addonseqno, pvFieldname: 'addonamt' };

         DataService.post('api/ot/asotentry/changeotaddonfieldleave', { data: addonsParam, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(dtlc.addonsCollection, data.otaddons);

               data.otaddons.forEach(function (addon) {
                  if (addon.addonseqno === self.addonRow.addonseqno) {
                     self.addonRow.addonnet = addon.addonnet;
                  }
               });

               if (data.cWarningMessage && data.cWarningMessage.length > 0) {
                  MessageService.error('global.error', data.cWarningMessage);
               }
            }
         });
      }
   };

   //We need to do this check in the UI before performing the backend call.  The backend
   //call checks this validation, but it throws an error which makes it imposible to trap
   //gracefully.  This check occurs if the user changes the Addon Number or clicks OK from the
   //Expanded row after editing.
   self.isDuplicateAddon = function () {
      var results = dtlc.addonsCollection.filter(function (row) {
         //See if a different row has this same Addon Number.  Don't check if blank, as the
         //user needs to be able to clear an Addon if they wish.
         return self.addonRow.addonno > 0 && row.addonno === self.addonRow.addonno && row.addonseqno !== self.addonRow.addonseqno;
      });

      if (results && results.length > 0) {
         MessageService.error('global.error', 'message.addon.is.a.duplicate');
         return true;
      } else {
         return false;
      }
   };

   self.addonnoChanged = function () {
      if (!self.addonRow.isNewAddon) {

         if (!self.isDuplicateAddon()) {
            dtlc.addonsCollection.forEach(function (addon) {
               if (addon.addonseqno === self.addonRow.addonseqno) {
                  addon.addonno = self.addonRow.addonno;
                  if (self.changedAddonno) {
                     addon.addonno = self.changedAddonno;
                  }
               }
            });

            var addonsParam = { otaddons: dtlc.addonsCollection, pvSeqno: self.addonRow.addonseqno, pvFieldname: 'addonno' };
            DataService.post('api/ot/asotentry/changeotaddonfieldleave', { data: addonsParam, busy: true }, function (data) {
               if (data) {
                  Utils.replaceArray(dtlc.addonsCollection, data.otaddons);

                  data.otaddons.forEach(function (addon) {
                     if (addon.addonseqno === self.addonRow.addonseqno) {
                        self.addonRow.addondesc = addon.addondesc;
                     }
                  });

                  if (data.cWarningMessage && data.cWarningMessage.length > 0) {
                     MessageService.error('global.error', data.cWarningMessage);
                  }
               }
            });
         }
      }
   };

   self.addontypeChanged = function () {
      if (!self.addonRow.isNewAddon) {
         dtlc.addonsCollection.forEach(function (addon) {
            if (addon.addonseqno === self.addonRow.addonseqno) {
               addon.addontype = self.addonRow.addontype;
               if (self.changedAddontype) {
                  addon.addontype = self.changedAddontype;
               }
            }
         });

         var addonsParam = { otaddons: dtlc.addonsCollection, pvSeqno: self.addonRow.addonseqno, pvFieldname: 'addontype' };
         DataService.post('api/ot/asotentry/changeotaddonfieldleave', { data: addonsParam, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(dtlc.addonsCollection, data.otaddons);

               data.otaddons.forEach(function (addon) {
                  if (addon.addonseqno === self.addonRow.addonseqno) {
                     self.addonRow.addonnet = addon.addonnet;
                  }
               });

               if (data.cWarningMessage && data.cWarningMessage.length > 0) {
                  MessageService.error('global.error', data.cWarningMessage);
               }
            }
         });
      }
   };

   self.isDistributeByDisabled = function () {
      var isDisabled = false;

      if (self.addonRow.addonseqno <= 4 || self.addonRow.addonno === 0) {
         isDisabled = true;
      }

      if (self.addonRow.addonno && self.addonRow.distrenabled) {
         if (self.addonRow.addonno > 0 && self.addonRow.distrenabled.toString().toLowerCase() === 'false') {
            isDisabled = true;
         }
      }

      return isDisabled;
   };

   self.isAddValid = function () {
      if (!self.addonRow.addonno) {
         MessageService.error('global.error', 'message.addon.is.required');
         return false;
      } else if (!self.addonRow.addondistr) {
         MessageService.error('global.error', 'message.distributed.by.required');
         return false;
      } else {
         return true;
      }
   };

   self.ok = function () {
      if (!self.isDuplicateAddon()) {
         if (self.addonRow.isNewAddon) {
            if (self.isAddValid()) {
               var addonsForCriteria = dtlc.addonsCollection;

               addonsForCriteria.pop();

               var addOtAddonRequest = {
                  otaddons: addonsForCriteria,
                  addotaddoncriteria: {
                     trackno: base.trackno,
                     addonno: self.addonRow.addonno,
                     addonamt: self.addonRow.addonamt,
                     addontype: self.addonRow.addontype,
                     addondistr: self.addonRow.addondistr
                  }
               };

               DataService.post('api/ot/asotentry/addotaddon', { data: addOtAddonRequest, busy: true }, function (data) {
                  if (data) {
                     Utils.replaceArray(dtlc.addonsCollection, data);
                     add.rerenderData();
                  }
               });
            }
         }
         else {
            for (var i = 0; i < dtlc.addonsCollection.length; i++) {
               var addon = dtlc.addonsCollection[i];

               if (addon.addonseqno === self.addonRow.addonseqno) {
                  dtlc.addonsCollection[i].addontype = self.addonRow.addontype;
                  //This is added as the addontype is getting cleared off while updating the grid.
                  self.changedAddontype = self.addonRow.addontype;
                  self.changedAddonno = self.addonRow.addonno;
                  break;
               }
            }

            add.rerenderData();
         }
      }
   };

   self.cancel = function () {
      add.grid.toggleRowDetail(addonRowNumber);
   };
});

app.controller('OtetTrackingProcessCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService) {
   var self = this;
   self.trackno = $stateParams.trackno;
   self.isQuickProcess = $stateParams.isQuickProcess;
   self.subTitle = '';
   self.oeetTrackData = null;
   self.newStage = '0';

   self.tracknochange = function () {
      if (self.trackno) {
         var params = { trackno: self.trackno };
         DataService.get('api/ot/oteh/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.oeetTrackData = {
                  trackno: data.trackno,
                  vendno: data.vendno,
                  stagecd: data.stagecd,
                  whse: data.whse
               };
            } else {
               self.oeetTrackData = null;
            }
         });
      }
   };

   if (self.trackno) {
      self.subTitle = $translate.instant('global.tracking.number') + Constants.LABEL_DELIMITER + self.trackno;
      self.tracknochange();
   }

   self.submit = function () {
      if (self.oeetTrackData) {
         var params = {
            iTrackNo: self.oeetTrackData.trackno,
            iNewStage: self.newStage
         };
         DataService.getResource('api/ot/asotentry/otetupdatetrackstage/{iTrackNo}/{iNewStage}', { pathParams: params, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               self.oeetTrackData.stagecd = data.stagecd;
               if (!self.isQuickProcess) {
                  self.back();
               }
            }
         });
      }
   };

   self.back = function () {
      $state.go('otet.master', { refreshSearch: true }, { reload: 'otet.master' });
   };
});