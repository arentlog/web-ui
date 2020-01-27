'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('pd', 'pdin', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('pd', 'pdin');

   $stateProvider.state('pdin.detail', {
      url: '/detail?id&pk&pk2',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdin/detail.json');
            },
            controller: 'PdinDetailCtrl as dtl'
         }
      }
   });
});

app.controller('PdinBaseCtrl', function ($state, ConfigService, DataService, MessageService) {
   var self = this;
   self.criteria = {};
   self.drilldownRecord = {};

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'pdin',
      rowIdField: 'rowID',
      stateRef: 'pdin.detail',
      title: {label: 'global.CHANGE_ME', value: ''},
      description: {label: 'global.CHANGE_ME', value: ''}
   };

   self.isMaster = function () {
      return $state.is('pdin.master');
   };

   self.includesMaster = function () {
      return $state.includes('pdin.master');
   };

   self.isDetail = function () {
      return $state.is('pdin.detail');
   };

   self.includesDetail = function () {
      return $state.includes('pdin.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.statusty = '';
   };

   // Perform simple search and update data set for the grid
   self.search = function () {

      if (self.criteria && self.criteria.searchOrderNo) {
         var orderNoParts = self.criteria.searchOrderNo.trim().split('-');
         if (orderNoParts.length === 2) {
            var criteria = {
               orderno: orderNoParts[0],
               ordersuf: orderNoParts[1],
               seqno: 0
            };
            DataService.post('api/pd/aspdinquiry/pdinheader', { data: criteria, busy: true }, function (data) {
               if (data) {
                  if (data.orderno) {
                     // data.orderno contains the order #, "-" and suffix
                     self.drilldownRecord.orderno = data.orderno;
                     self.drilldownRecord.seqno = data.seqno;
                     $state.go('^.detail');
                  } else {
                     MessageService.info('global.information', 'message.there.is.no.national.account.claim');
                  }
               } else {
                  MessageService.info('global.information', 'message.there.is.no.national.account.claim');
               }
            });
         }
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('PdinSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('pdin.master');
      }

      // Get data
      base.search();
   };
});

app.controller('PdinMasterCtrl', function ($scope, $state, ConfigService, GridService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // Drill down
   self.drilldown = function (e, args) {
      base.drilldownRecord = args[0].item;
      if (base.drilldownRecord && base.drilldownRecord.orderno) {
         var orderNoParts = base.drilldownRecord.orderno.trim().split('-');
         if (orderNoParts.length === 2 && orderNoParts[0] !== '0') {
            $state.go('^.detail');
         }
      }
   };

   // Perform Master grid search and update data set for the grid
   self.search = function () {
      var criteria = {
         orderno: base.criteria.orderno,
         vendno: base.criteria.vendno,
         claimno: base.criteria.claimno,
         invfrdt: base.criteria.invfrdt,
         invtodt: base.criteria.invtodt,
         origordno: base.criteria.origordno,
         paidfrdt: base.criteria.paidfrdt,
         paidtodt: base.criteria.paidtodt,
         origordpo: base.criteria.origordpo,
         statusty: base.criteria.statusty,
         tolexpfl: base.criteria.tolexpfl,
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      DataService.post('api/pd/aspdinquiry/pdinsearch', { data: criteria, busy: true }, function (data) {
         base.dataset = data.pdinsearchresults;
      });
   };

   self.buttonAction = function (action) {

      var records = GridService.getSelectedRecords(base.grid);
      if (records) {
         var recordsToProcess = [];
         var error = false;
         records.forEach(function (record) {
            if (record.statusty !== 'Suspended') {
               error = true;
            } else {
               recordsToProcess.push(
               {
                  orderno: record.orderno,
                  seqno: record.seqno,
                 btntype: action
               });
            }
         });

         if (error) {
            MessageService.error('global.error', 'message.only.suspended.records.may.be.selected');
            return;
         }
         DataService.post('api/pd/aspdinquiry/pdinaction', { data: recordsToProcess, busy: true }, function (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            self.search();
         });
      }
   };

   self.onVendorInquiry = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.vendno, pk2: currentRow.shipfmno });
      }
   };

   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         var orderNoParts = currentRow.orderno.trim().split('-');
         if (orderNoParts.length === 2 && orderNoParts[0] !== '0') {
            $state.go('oeio.detail', { pk: orderNoParts[0], pk2: orderNoParts[1]});
         }
      }
   };
});

app.controller('PdinDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.header = {};
   self.subTitle = '';
   self.lines = [];

   // Get header record and line items
   if (base.drilldownRecord) {
      var orderNoParts = base.drilldownRecord.orderno.trim().split('-');
      if (orderNoParts.length === 2) {
         var criteria = {
            orderno: orderNoParts[0],
            ordersuf: orderNoParts[1],
            seqno: base.drilldownRecord.seqno
         };
         DataService.post('api/pd/aspdinquiry/pdinheader', { data: criteria, busy: true }, function (data) {
            self.header = data;
            self.subTitle = MessageService.get('global.order.number') + ': ' + self.header.orderno.trim();
         });
         DataService.post('api/pd/aspdinquiry/pdinlines', { data: criteria, busy: true }, function (dataLines) {
            self.lines = dataLines;
         });
      }
   }
});
