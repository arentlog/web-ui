'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('wl', 'wlit');
   StateProvider.addMasterState('wl', 'wlit');

   $stateProvider.state('wlit.orderdetail', {
      url: '/order-detail',
      params: { ordDtlRecord: undefined },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wl/wlit/orddtl.json');
            },
            controller: 'WlitOrdDetailCtrl as orddtl'
         }
      }
   });

   $stateProvider.state('wlit.orderdetail.orderlinedetail', {
      url: '/line-detail',
      params: { ordLineDtlRecord: undefined },
      views: {
         detailSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wl/wlit/ordlndtl.json');
            },
            controller: 'WlitOrdLineDetailCtrl as ordlndtl'
         }
      }
   });

   $stateProvider.state('wlit.orderdetail.orderlinedetail.orderlinecomponentdetail', {
      url: '/component-detail',
      params: { ordLineCompDtlRecord: undefined },
      views: {
         compDetailSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wl/wlit/ordlncompdtl.json');
            },
            controller: 'WlitOrdLineCompDetailCtrl as ordlncompdtl'
         }
      }
   });

   $stateProvider.state('wlit.masterdatadetail', {
      url: '/master-data-detail',
      params: { mstDataDtlRecord: undefined },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wl/wlit/mstdatadtl.json');
            },
            controller: 'WlitMstDetailCtrl as mstdatadtl'
         }
      }
   });

   $stateProvider.state('wlit.returnpodetail', {
      url: '/return-po-detail',
      params: { rtnPoDtlRecord: undefined },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wl/wlit/rtnpodtl.json');
            },
            controller: 'WlitRtnPoDetailCtrl as rtnpodtl'
         }
      }
   });

   $stateProvider.state('wlit.returnpodetail.returnpolinedetail', {
      url: '/line-detail',
      params: { rtnPoLineDtlRecord: undefined },
      views: {
         detailSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wl/wlit/rtnpolndtl.json');
            },
            controller: 'WlitRtnPoLineDetailCtrl as rtnpolndtl'
         }
      }
   });

   $stateProvider.state('wlit.returnpodetail.returnpolinedetail.returnpolinecomponentdetail', {
      url: '/component-detail',
      params: { rtnPoLineCompDtlRecord: undefined },
      views: {
         compDetailSubView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('wl/wlit/rtnpolncompdtl.json');
            },
            controller: 'WlitRtnPoLineCompDetailCtrl as rtnpolncompdtl'
         }
      }
   });
});

app.controller('WlitBaseCtrl', function ($state, $translate, SecurityService) {
   var self = this;
   self.sidebarCollapsed = true;
   self.wlAuthorizedFl = false;
   self.isOrderTabReadonly = SecurityService.getSubSecurityLevel('wlit', 'Order Data') < 3;
   self.isMasterTabReadonly = SecurityService.getSubSecurityLevel('wlit', 'Master') < 3;
   self.isReturnsTabReadonly = SecurityService.getSubSecurityLevel('wlit', 'Returns PO') < 3;

   self.includesMaster = function () {
      return $state.includes('wlit.master');
   };

   self.isMaster = function () {
      return $state.is('wlit.master');
   };

   self.isOneOfThreeDetailViews = function () {
      return ($state.is('wlit.orderdetail') ||
              $state.is('wlit.masterdatadetail') ||
              $state.is('wlit.returnpodetail'));
   };

   self.isOneOfTwoDetailSubViews = function () {
      return ($state.is('wlit.orderdetail.orderlinedetail') ||
              $state.is('wlit.returnpodetail.returnpolinedetail'));
   };

   self.isCompDetailSubView = function () {
      return ($state.is('wlit.orderdetail.orderlinedetail.orderlinecomponentdetail') ||
              $state.is('wlit.returnpodetail.returnpolinedetail.returnpolinecomponentdetail'));
   };

   self.functionFormatter = function (row, cell, value, column, item) {
      switch (item.processty.toUpperCase()) {
         case 'MST':
            switch (value.toUpperCase()) {
               case 'ICSW':
                  return $translate.instant('global.product');
               case 'WLICSW':
                  return $translate.instant('global.product');
               case 'ICSD':
                  return $translate.instant('global.warehouse');
               case 'SASTT':
                  return $translate.instant('global.return.adjust');
               case 'APSV':
                  return $translate.instant('global.vendor');
               case 'APSS':
                  return $translate.instant('global.ship.from');
               case 'ICSEC':
                  return $translate.instant('global.barcode');
               default:
                  return value;
            }
         case 'BCD':
            return $translate.instant('global.barcode');
         case 'CYC':
            return $translate.instant('wt.exception');
         case 'BIN':
            return $translate.instant('global.primary.bin');
         case 'STK':
            switch (value.toUpperCase()) {
               case 'ICET':
                  return $translate.instant('global.unavailable');
               case 'ICEAP':
                  return $translate.instant('global.stocked');
               case 'ICEAN':
                  return $translate.instant('global.non.stock');
               default:
                  return $translate.instant('global.stock.adjustment');
            }
         default:
            return value;
      }
   };

   self.prodVendWhseTypeFormatter = function (row, cell, value, column, item) {
      switch (item.processty.toUpperCase()) {
         case 'STK':
            return item.prod;
         case 'BIN':
            return item.prod;
         default:
            switch (item.function.toUpperCase()) {
               case 'ICSW':
                  return item.prod;
               case 'WLICSW':
                  return item.prod;
               case 'ICSEC':
                  return item.prod;
               case 'WTEE':
                  return item.prod;
               case 'APSV':
                  return item.vendno.toString();
               case 'APSS':
                  return item.vendno.toString();
               case 'ICSD':
                  return item.whse;
               case 'SASTT':
                  return item.field1;
               default:
                  return '';
            }
      }
   };

   self.navigateToInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.cWLETOrdertype) {
         switch (currentRow.cWLETOrdertype.toUpperCase()) { //ignore jslint - correct indentation
            case 'OE': //ignore jslint - correct indentation
               $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'KP': //ignore jslint - correct indentation
               $state.go('kpiw.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'PO': //ignore jslint - correct indentation
               $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'VA': //ignore jslint - correct indentation
               $state.go('vaif.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            case 'WT': //ignore jslint - correct indentation
               $state.go('wtit.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf }); //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
            default: //ignore jslint - correct indentation
               break; //ignore jslint - correct indentation
         }
      }
   };
});

app.controller('WlitMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService, Utils, GridService, AuthService, UserService, Sasoo, WlConverters, OptionSetService) {
   var self = this;
   var base = $scope.base;

   var wlFromDate = new Date();
   wlFromDate.setDate(wlFromDate.getDate() - 14);

   // Advanced search criteria object with initial values
   self.advCriteria = {
      cono: UserService.getCono(),
      whse: Sasoo.whse,
      transtype: 'r',
      statustype: 'aemopw',
      processty: '',
      updatety: '',
      ordertype: '',
      function: '',
      fmcreatedt: wlFromDate,
      tocreatedt: Utils.getCurrentDate(),
      recordcountlimit: ConfigService.getDefaultRecordLimit()
   };

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'whse', label: MessageService.get('global.warehouse') },
      { value: 'transtype', label: MessageService.get('global.trans.type') },
      { value: 'statustype', label: MessageService.get('global.status.type') },
      { value: 'processty', label: MessageService.get('global.process.type') },
      { value: 'fmcreatedt', label: MessageService.get('global.starting.date') },
      { value: 'tocreatedt', label: MessageService.get('global.ending.date') },
      { value: 'recordcountlimit', label: MessageService.get('global.record.limit') },
      { value: 'updatety', label: MessageService.get('global.update.type') },
      { value: 'vendno', label: MessageService.get('global.vendor') },
      { value: 'shipfmno', label: MessageService.get('global.ship.from') },
      { value: 'setno', label: MessageService.get('global.set.number') },
      { value: 'errormess', label: MessageService.get('global.error.message') },
      { value: 'ordertype', label: MessageService.get('global.order.type') },
      { value: 'orderno', label: MessageService.get('global.order.number') },
      { value: 'custno', label: MessageService.get('global.customer') },
      { value: 'shipto', label: MessageService.get('global.ship.to') },
      { value: 'nonstockfl', label: MessageService.get('global.non.stock') },
      { value: 'prodno', label: MessageService.get('global.product') },
      { value: 'function', label: MessageService.get('global.function') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['whse', 'transtype', 'statustype', 'processty', 'fmcreatedt', 'tocreatedt', 'recordcountlimit'];

   OptionSetService.get('WL', 'ProcessTypeReceive', function (optSet) {
      self.processTypeOptions = optSet.children;
   });

   self.changeProcessType = function () {
      if (self.advCriteria.transtype === 'r') {
         OptionSetService.get('WL', 'ProcessTypeReceive', function (optSet) {
            self.processTypeOptions = optSet.children;
            self.advCriteria.processty = '';
         });
      } else {
         OptionSetService.get('WL', 'ProcessTypeSend', function (optSet) {
            self.processTypeOptions = optSet.children;
            self.advCriteria.processty = '';
         });
      }
   };

   // Drill down
   self.orderDrillDown = function (e, args) {
      var record = args[0].item;
      $state.go('wlit.orderdetail', { ordDtlRecord: record });
   };

   self.masterDrillDown = function (e, args) {
      var record = args[0].item;
      $state.go('wlit.masterdatadetail', { mstDataDtlRecord: record });
   };

   self.returnsPoDrillDown = function (e, args) {
      var record = args[0].item;
      $state.go('wlit.returnpodetail', { rtnPoDtlRecord: record });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {

      var criteria = angular.copy(self.advCriteria);

      if (!criteria.whse) {
         MessageService.error('global.error', 'message.the.warehouse.is.required.for.a.search');
         return;
      }

      // Apply record limit (if cleared by user)
      if (!criteria.recordcountlimit) {
         criteria.recordcountlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/wl/aswlinquiry/wlitgetlist', { data: criteria, busy: true }, function (data) {
         if (data) {
            base.orderDataSet = data.wlitresults;
         }
      });

      DataService.post('api/wl/aswlinquiry/wlitmstrgetlist', { data: criteria, busy: true }, function (data) {
         if (data) {
            base.masterDataSet = data.wlitmstrresults;
         }
      });

      DataService.post('api/wl/aswlinquiry/wlitreturnspogetlist', { data: criteria, busy: true }, function (data) {
         if (data) {
            base.returnsPoDataSet = data.wlitresults;
         }
      });
   };

   self.setOrderStatus = function (status) {
      var selectedrecords = GridService.getSelectedRecords(base.orderGrid);
      var lUpdateFlag = false;

      if (selectedrecords) {

         selectedrecords.forEach(function (record) {
            lUpdateFlag = true;

            var criteria = {
               pvStatustype: status,
               wlitresults: record
            };

            DataService.post('api/wl/aswlinquiry/wlitupdatestatus', { data: criteria, busy: true }, function () {
            });
         });
         if (lUpdateFlag) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
         self.search();
      }
   };

   self.activateOrderAuthPointPassed = function () {
      self.setOrderStatus('A');
   };

   self.inactivateOrderAuthPointPassed = function () {
      self.setOrderStatus('I');
   };

   self.activateOrder = function () {
      AuthService.createAuthPoint('wlsta', String.Empty, String.Empty, String.Empty, String.Empty, null, self.activateOrderAuthPointPassed, null);
   };

   self.inactivateOrder = function () {
      AuthService.createAuthPoint('wlsta', String.Empty, String.Empty, String.Empty, String.Empty, null, self.inactivateOrderAuthPointPassed, null);
   };

   self.resetWipOrderData = function () {
      var selectedrecords = GridService.getSelectedRecords(base.orderGrid);

      if (selectedrecords) {
         var wlitWipList = [];

         selectedrecords.forEach(function (record) {
            if (record.cWLETstatus.toUpperCase() === 'WIP') {
               wlitWipList.push(record);
            }
         });

         if (wlitWipList.length > 0) {
            DataService.post('api/wl/aswlinquiry/wlitresetwiptrans', { data: wlitWipList, busy: true }, function () {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            });
         }
      }
      self.search();
   };

   self.setMasterDataStatus = function (status) {
      var selectedrecords = GridService.getSelectedRecords(base.masterGrid);
      var lUpdateFlag = false;
      var lastWlitSetNo = null;

      if (selectedrecords) {
         selectedrecords.forEach(function (record) {
            if (record.setno !== lastWlitSetNo) {
               lUpdateFlag = true;
               lastWlitSetNo = record.setno;

               var criteria = {
                  pvStatustype: status,
                  wlitmstrresults: record
               };

               DataService.post('api/wl/aswlinquiry/wlitmstrupdatestatus', { data: criteria, busy: true }, function () {
               });
            }
         });
         if (lUpdateFlag) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
         self.search();
      }
   };

   self.activateMasterDataAuthPointPassed = function () {
      self.setMasterDataStatus('A');
   };

   self.inactivateMasterDataAuthPointPassed = function () {
      self.setMasterDataStatus('I');
   };

   self.activateMasterData = function () {
      AuthService.createAuthPoint('wlsta', String.Empty, String.Empty, String.Empty, String.Empty, null, self.activateMasterDataAuthPointPassed, null);
   };

   self.inactivateMasterData = function () {
      AuthService.createAuthPoint('wlsta', String.Empty, String.Empty, String.Empty, String.Empty, null, self.inactivateMasterDataAuthPointPassed, null);
   };

   self.resetWipMasterData = function () {
      var selectedrecords = GridService.getSelectedRecords(base.masterGrid);
      var lastWlitSetNo = null;

      if (selectedrecords) {
         var wlitWipList = [];

         selectedrecords.forEach(function (record) {
            if (record.cWLETstatus.toUpperCase() === 'WIP' &&
                record.setno !== lastWlitSetNo) {
               lastWlitSetNo = record.setno;
               wlitWipList.push(record);
            }
         });

         if (wlitWipList.length > 0) {
            DataService.post('api/wl/aswlinquiry/wlitmstrresetwiptrans', { data: wlitWipList, busy: true }, function () {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            });
         }
      }
      self.search();
   };

   self.setReturnsPoStatus = function (status) {
      var selectedrecords = GridService.getSelectedRecords(base.masterGrid);
      var lUpdateFlag = false;

      if (selectedrecords) {
         selectedrecords.forEach(function (record) {
            lUpdateFlag = true;

            var criteria = {
               pvStatustype: status,
               wlitresults: record
            };

            DataService.post('api/wl/aswlinquiry/wlitreturnspoupdatestatus', { data: criteria, busy: true }, function () {
            });
         });
         if (lUpdateFlag) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
         self.search();
      }
   };

   //NOTE: No Authorization checks are necessary for ReturnsPo status changes.
   self.activateReturnsPo = function () {
      self.setReturnsPoStatus('A');
   };

   self.inactivateReturnsPo = function () {
      self.setReturnsPoStatus('I');
   };

});

app.controller('WlitOrdDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, CommonConverters, MessageService, WlConverters) {
   var self = this;
   self.wlet = $stateParams.ordDtlRecord;

   self.returnToMaster = function () {
      $state.go('wlit.master');
   };

   self.activateSingleOrder = function () {
      var criteria = {
         pvStatustype: 'A',
         wlitresults: self.wlet
      };

      DataService.post('api/wl/aswlinquiry/wlitupdatestatus', { data: criteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true });
      });
   };

   self.inactivateSingleOrder = function () {
      var criteria = {
         pvStatustype: 'I',
         wlitresults: self.wlet
      };

      DataService.post('api/wl/aswlinquiry/wlitupdatestatus', { data: criteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true });
      });
   };

   if (self.wlet) {
      //Get WLEH Record
      self.wleh = DataService.getResource('api/wl/wleh/getbyrowid/' + self.wlet.wlehrowid + '?fillmode=true', { busy: true });

      self.wleh.$promise.then(function () {
         if (self.wleh) {
            self.subTitle = self.wleh.whse + ' | ' + self.wleh.setno + ' | ' +
                            WlConverters.OrderType.convert(self.wleh.ordertype) + ' ' +
                            self.wleh.orderno + '-' + CommonConverters.Suffix.convert(self.wleh.ordersuf);

            var criteria = {
               cono: self.wleh.cono,
               whse: self.wleh.whse,
               setno: self.wleh.setno,
               ordertype: self.wleh.ordertype,
               orderno: self.wleh.orderno,
               ordersuf: self.wleh.ordersuf
            };

            // Get WLEL Records
            DataService.post('api/wl/aswlinquiry/wlitorderlinegetlist', { data: criteria, busy: true }, function (data) {
               if (data) {
                  self.wleh.wlelLineDataSet = data.wlitorderlineresults;
               }
            });
         }
      });
   }

   // Drill down
   self.lineDrillDown = function (e, args) {
      var record = args[0].item;
      $state.go('wlit.orderdetail.orderlinedetail', { ordLineDtlRecord: record });
   };
});

app.controller('WlitOrdLineDetailCtrl', function ($filter, $scope, $state, $stateParams, Constants, DataService, CommonConverters, WlConverters) {
   var self = this;
   self.wlelfromlist = $stateParams.ordLineDtlRecord;

   self.returnToDetail = function () {
      $state.go('wlit.orderdetail');
   };

   if (self.wlelfromlist) {
      //Get WLEL Record
      self.wlel = DataService.getResource('api/wl/wlel/getbyrowid/' + self.wlelfromlist.wlelrowid + '?fillmode=true', { busy: true });

      self.wlel.$promise.then(function () {
         if (self.wlel) {

            self.subTitle = self.wlel.whse + ' | ' + self.wlel.setno + ' | ' +
                            WlConverters.OrderType.convert(self.wlel.ordertype) + ' ' +
                            self.wlel.orderno + '-' + CommonConverters.Suffix.convert(self.wlel.ordersuf) +
                            ' | ' + self.wlel.lineno + ' | ' + self.wlel.shipprod;

            var params = {
               cono: self.wlel.cono,
               whse: self.wlel.whse,
               setno: self.wlel.setno,
               ordertype: self.wlel.ordertype,
               orderno: self.wlel.orderno,
               ordersuf: self.wlel.ordersuf,
               lineno: self.wlel.lineno
            };

            // Get Component Records
            self.wlel.kitRecordsFlag = false;
            DataService.get('api/wl/wlelk/listbyorder', { params: params, busy: true }, function (data) {
               if (data) {
                  self.wlel.wlelCompDataSet = $filter('filter')(data, { 'setno': self.wlel.setno });
                  if (self.wlel.wlelCompDataSet.length > 0) { self.wlel.kitRecordsFlag = true; }
               }
            });

            // Get Serial/Lot Records
            self.wlel.serLotRecordsFlag = false;
            DataService.get('api/wl/wlels/listbyorder', { params: params, busy: true }, function (data) {
               if (data) {
                  var data2 = $filter('filter')(data, { 'setno': self.wlel.setno });
                  self.wlel.wlelSerLotDataSet = $filter('filter')(data2, { 'seqno': 0 });  // They can see the sequences by selecting components and drilling down
                  if (self.wlel.wlelSerLotDataSet.length > 0) { self.wlel.serLotRecordsFlag = true; }
               }
            });
         }
      });
   }

   // Drill down
   self.lineCompDtlDrillDown = function (e, args) {
      var record = args[0].item;
      $state.go('wlit.orderdetail.orderlinedetail.orderlinecomponentdetail', { ordLineCompDtlRecord: record });
   };
});

app.controller('WlitOrdLineCompDetailCtrl', function ($filter, $scope, $state, $stateParams, Constants, DataService, CommonConverters, WlConverters) {
   var self = this;
   self.wlelkfromlist = $stateParams.ordLineCompDtlRecord;

   self.returnToDetail = function () {
      $state.go('wlit.orderdetail.orderlinedetail');
   };

   if (self.wlelkfromlist) {
      //Get WLELK Record
      self.wlelk = DataService.getResource('api/wl/wlelk/getbyrowid/' + self.wlelkfromlist.rowID + '?fillmode=true', { busy: true });

      self.wlelk.$promise.then(function () {
         if (self.wlelk) {

            self.subTitle = self.wlelk.whse + ' | ' + self.wlelk.setno + ' | ' +
                            WlConverters.OrderType.convert(self.wlelk.ordertype) + ' ' +
                            self.wlelk.orderno + '-' + CommonConverters.Suffix.convert(self.wlelk.ordersuf) +
                            ' | ' + self.wlelk.lineno + ' | ' + self.wlelk.seqno + ' | ' +
                            self.wlelk.shipprod;

            var params = {
               cono: self.wlelk.cono,
               whse: self.wlelk.whse,
               setno: self.wlelk.setno,
               ordertype: self.wlelk.ordertype,
               orderno: self.wlelk.orderno,
               ordersuf: self.wlelk.ordersuf,
               lineno: self.wlelk.lineno,
               seqno: self.wlelk.seqno
            };

            // Get Serial/Lot Records
            self.wlelk.serLotRecordsFlag = false;
            DataService.get('api/wl/wlels/listbyorder', { params: params, busy: true }, function (data) {
               if (data) {
                  self.wlelk.wlelkSerLotDataSet = $filter('filter')(data, { 'setno': self.wlelk.setno });
                  if (self.wlelk.wlelkSerLotDataSet.length > 0) { self.wlelk.serLotRecordsFlag = true; }
               }
            });
         }
      });
   }
});

app.controller('WlitMstDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.wlet = $stateParams.mstDataDtlRecord;

   self.activateSingleMasterData = function () {
      var criteria = {
         pvStatustype: 'A',
         wlitmstrresults: self.wlet
      };

      DataService.post('api/wl/aswlinquiry/wlitmstrupdatestatus', { data: criteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true });
      });
   };

   self.inactivateSingleMasterData = function () {
      var criteria = {
         pvStatustype: 'I',
         wlitmstrresults: self.wlet
      };

      DataService.post('api/wl/aswlinquiry/wlitmstrupdatestatus', { data: criteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true });
      });
   };

   if (self.wlet) {
      //Get WLEM Record
      self.wlem = DataService.getResource('api/wl/wlem/getbyrowid/' + self.wlet.wlemrowid + '?fillmode=true', { busy: true });

      self.returnToMaster = function () {
         $state.go('wlit.master');
      };

      self.wlem.$promise.then(function () {
         if (self.wlem) {

            self.wlem.prodVendWhseType = base.prodVendWhseTypeFormatter(0, 0, self.wlem.prod, 0, self.wlem);
            self.subTitle = self.wlem.whse + ' | ' + self.wlem.setno + ' | ' + self.wlem.prodVendWhseType;
            self.wlem.functDesc = base.functionFormatter(0, 0, self.wlem.function, 0, self.wlem);
            self.wlem.adjustQty = self.wlem.actualqty - self.wlem.expectqty;

            var params = {
               cono: self.wlem.cono,
               whse: self.wlem.whse,
               setno: self.wlem.setno,
               prod: self.wlem.prod
            };

            // Get Serial/Lot Records
            self.wlem.serLotRecordsFlag = false;
            DataService.get('api/wl/wlels/listbyprod', { params: params, busy: true }, function (data) {
               if (data) {
                  if (data.length > 0) { self.wlem.serLotRecordsFlag = true; }
                  self.wlem.wlemSerLotDataSet = data;
               }
            });
         }
      });
   }
});

app.controller('WlitRtnPoDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, CommonConverters, MessageService, WlConverters) {
   var self = this;
   self.wlet = $stateParams.rtnPoDtlRecord;

   self.returnToMaster = function () {
      $state.go('wlit.master');
   };

   self.activateSingleReturnsPo = function () {
      var criteria = {
         pvStatustype: 'A',
         wlitresults: self.wlet
      };

      DataService.post('api/wl/aswlinquiry/wlitreturnspoupdatestatus', { data: criteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true });
      });
   };

   self.inactivateSingleReturnsPo = function () {
      var criteria = {
         pvStatustype: 'I',
         wlitresults: self.wlet
      };

      DataService.post('api/wl/aswlinquiry/wlitreturnspoupdatestatus', { data: criteria, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^.master', { refreshSearch: true });
      });
   };

   if (self.wlet) {
      //Get WLEH Record
      self.wleh = DataService.getResource('api/wl/wleh/getbyrowid/' + self.wlet.wlehrowid + '?fillmode=true', { busy: true });

      self.wleh.$promise.then(function () {
         if (self.wleh) {
            self.subTitle = self.wleh.whse + ' | ' +
                            WlConverters.OrderType.convert(self.wleh.ordertype) + ' ' +
                            self.wleh.orderno + '-' + CommonConverters.Suffix.convert(self.wleh.ordersuf);

            var criteria = {
               cono: self.wleh.cono,
               whse: self.wleh.whse,
               setno: self.wleh.setno,
               ordertype: self.wleh.ordertype,
               orderno: self.wleh.orderno,
               ordersuf: self.wleh.ordersuf
            };

            // Get WLEL Records
            DataService.post('api/wl/aswlinquiry/wlitorderlinegetlist', { data: criteria, busy: true }, function (data) {
               if (data) {
                  self.wleh.wlelLineDataSet = data.wlitorderlineresults;
               }
            });
         }
      });
   }

   // Drill down
   self.lineDrillDown = function (e, args) {
      var record = args[0].item;
      $state.go('wlit.returnpodetail.returnpolinedetail', { rtnPoLineDtlRecord: record });
   };
});

app.controller('WlitRtnPoLineDetailCtrl', function ($filter, $scope, $state, $stateParams, Constants, DataService, CommonConverters, WlConverters) {
   var self = this;
   self.wlelfromlist = $stateParams.rtnPoLineDtlRecord;

   self.returnToDetail = function () {
      $state.go('wlit.returnpodetail');
   };

   if (self.wlelfromlist) {
      //Get WLEL Record
      self.wlel = DataService.getResource('api/wl/wlel/getbyrowid/' + self.wlelfromlist.wlelrowid + '?fillmode=true', { busy: true });

      self.wlel.$promise.then(function () {
         if (self.wlel) {

            self.subTitle = self.wlel.whse + ' | ' +
                            WlConverters.OrderType.convert(self.wlel.ordertype) + ' ' +
                            self.wlel.orderno + '-' + CommonConverters.Suffix.convert(self.wlel.ordersuf) +
                            ' | ' + self.wlel.lineno + ' | ' + self.wlel.shipprod;

            var params = {
               cono: self.wlel.cono,
               whse: self.wlel.whse,
               setno: self.wlel.setno,
               ordertype: self.wlel.ordertype,
               orderno: self.wlel.orderno,
               ordersuf: self.wlel.ordersuf,
               lineno: self.wlel.lineno
            };

            // Get Component Records
            self.wlel.kitRecordsFlag = false;
            DataService.get('api/wl/wlelk/listbyorder', { params: params, busy: true }, function (data) {
               if (data) {
                  self.wlel.wlelCompDataSet = $filter('filter')(data, { 'setno': self.wlel.setno });
                  if (self.wlel.wlelCompDataSet.length > 0) { self.wlel.kitRecordsFlag = true; }
               }
            });

            // Get Serial/Lot Records
            self.wlel.serLotRecordsFlag = false;
            DataService.get('api/wl/wlels/listbyorder', { params: params, busy: true }, function (data) {
               if (data) {
                  var data2 = $filter('filter')(data, { 'setno': self.wlel.setno });
                  self.wlel.wlelSerLotDataSet = $filter('filter')(data2, { 'seqno': 0 });  // They can see the sequences by selecting components and drilling down
                  if (self.wlel.wlelSerLotDataSet.length > 0) { self.wlel.serLotRecordsFlag = true; }
               }
            });
         }
      });
   }

   // Drill down
   self.lineCompDtlDrillDown = function (e, args) {
      var record = args[0].item;
      $state.go('wlit.returnpodetail.returnpolinedetail.returnpolinecomponentdetail', { rtnPoLineCompDtlRecord: record });
   };
});

app.controller('WlitRtnPoLineCompDetailCtrl', function ($filter, $scope, $state, $stateParams, Constants, DataService, CommonConverters, WlConverters) {
   var self = this;
   self.wlelkfromlist = $stateParams.rtnPoLineCompDtlRecord;

   self.returnToDetail = function () {
      $state.go('wlit.returnpodetail.returnpolinedetail');
   };

   if (self.wlelkfromlist) {
      //Get WLELK Record
      self.wlelk = DataService.getResource('api/wl/wlelk/getbyrowid/' + self.wlelkfromlist.rowID + '?fillmode=true', { busy: true });

      self.wlelk.$promise.then(function () {
         if (self.wlelk) {

            self.subTitle = self.wlelk.whse + ' | ' + self.wlelk.setno + ' | ' +
                            WlConverters.OrderType.convert(self.wlelk.ordertype) + ' ' +
                            self.wlelk.orderno + '-' + CommonConverters.Suffix.convert(self.wlelk.ordersuf) +
                            ' | ' + self.wlelk.lineno + ' | ' + self.wlelk.seqno + ' | ' +
                            self.wlelk.shipprod;

            var params = {
               cono: self.wlelk.cono,
               whse: self.wlelk.whse,
               setno: self.wlelk.setno,
               ordertype: self.wlelk.ordertype,
               orderno: self.wlelk.orderno,
               ordersuf: self.wlelk.ordersuf,
               lineno: self.wlelk.lineno,
               seqno: self.wlelk.seqno
            };

            // Get Serial/Lot Records
            self.wlelk.serLotRecordsFlag = false;
            DataService.get('api/wl/wlels/listbyorder', { params: params, busy: true }, function (data) {
               if (data) {
                  self.wlelk.wlelkSerLotDataSet = $filter('filter')(data, { 'setno': self.wlelk.setno });
                  if (self.wlelk.wlelkSerLotDataSet.length > 0) { self.wlelk.serLotRecordsFlag = true; }
               }
            });
         }
      });
   }
});