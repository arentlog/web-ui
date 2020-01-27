'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('etx', 'etxaq', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('etx', 'etxaq');

   $stateProvider.state('etxaq.detail', {
      url: '/detail',
      params: { object: null },
      sticky: true,
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('etx/etxaq/detail.json');
            },
            controller: 'EtxaqDetailCtrl as dtl'
         }
      }
   });
});

app.controller('EtxaqBaseCtrl', function ($state, DataService, UserService, ConfigService) {
   var self = this;
   self.criteria = {};

   // Initialize the search criteria object
   self.resetCriteria = function () {
      self.criteria.statusty = '<all>';
      self.criteria.type = '';

      // Add default record limit to specified field on criteria
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   self.drillDownRecord = {
      orderno: 0,
      ordersuf: 0,
      rwid: null,
      whse: "",
      whsename: "",
      dfltbatchsize: 0
   };

   self.drillDownLabel = '';
   self.drillDownSubLabel = '';

   self.addMode = false;
   self.isInAddMode = function () {
      return self.addMode;
   };

   self.isMaster = function () {
      return $state.is('etxaq.master');
   };

   self.includesMaster = function () {
      return $state.includes('etxaq.master');
   };

   self.isDetail = function () {
      return $state.is('etxaq.detail');
   };

   self.includesDetail = function () {
      return $state.includes('etxaq.detail');
   };

   self.isDrillDown = function () {
      return $state.is('etxaq.drilldown');
   };

   //Auto Search on Entry
   self.refreshSearch = false;

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/ptx/asptxentry/ptxgetqueuelist', { data: self.criteria, busy: true }, function (data) {

         // Populate the grid
         self.dataset = data.ptxqueuelistresults;

      });
   };

   // Perform initialization of search criteria
   self.resetCriteria();

});

app.controller('EtxaqSearchCtrl', function ($scope, $state, DataService, Utils, ConfigService) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.resetCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('etxaq.master');
      }

      base.search();
   };
});

app.controller('EtxaqMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, UserService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   // Release the record(s) to the ETX Queue
   self.releaseFunction = function () {
      MessageService.okCancel('global.confirmation', 'question.release.selected.records',
          function () {
             var selectedrecords = GridService.getSelectedRecords(base.grid);

             if (selectedrecords) {
                var currCono = UserService.getCono();
                var recordstochange = [];

                // Build the criteria records
                selectedrecords.forEach(function (record) {
                   recordstochange.push({ "cono": currCono, "orderno": record.orderno, "ordersuf": record.ordersuf, "rwid": record.rwid });
                });

                if (recordstochange) {
                   DataService.post('api/ptx/asptxentry/ptxqueuestatuschange', { data: { "ptxqueuedeletecriteria": recordstochange, "cStatusTy": "" }, busy: true }, function (data) {
                      base.search();
                   });
                }
             };
          }, null);
   };

   // Hold the record(s) in the ETX Queue to work on later
   self.holdFunction = function () {
      MessageService.okCancel('global.confirmation', 'question.hold.selected.records',
          function () {
             var selectedrecords = GridService.getSelectedRecords(base.grid);

             if (selectedrecords) {
                var currCono = UserService.getCono();
                var recordstochange = [];

                // Build the criteria records
                selectedrecords.forEach(function (record) {
                   if (record.statusty !== "err" && record.statusty !== "wip") {
                      recordstochange.push({ "cono": currCono, "orderno": record.orderno, "ordersuf": record.ordersuf, "rwid": record.rwid });
                   }
                });

                if (recordstochange) {
                   DataService.post('api/ptx/asptxentry/ptxqueuestatuschange', { data: { "ptxqueuedeletecriteria": recordstochange, "cStatusTy": "hld" }, busy: true }, function (data) {
                      base.search();
                   });
                }
             };
          }, null);
   };

   // Delete the record(s) in the ETX Queue
   self.deleteRows = function () {

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete',
         function () {
            var selectedrecords = GridService.getSelectedRecords(base.grid);

            if (selectedrecords) {
               var currCono = UserService.getCono();
               var recordstodelete = [];

               // Build the criteria records
               selectedrecords.forEach(function (record) {
                  recordstodelete.push({ "cono": currCono, "orderno": record.orderno, "ordersuf": record.ordersuf, "rwid": record.rwid });
               });

               if (recordstodelete) {
                  DataService.post('api/ptx/asptxentry/ptxqueuedelete', { data: recordstodelete, busy: true }, function (data) {
                     base.search();
                  });
               }
            };
      });
   };

   // ARIC/APIV hyperlink
   self.vendcustInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         switch (currentRow.doctype.toLowerCase()) {
            case 'oe':
               $state.go('aric.detail', { pk: currentRow.custvendno, pk2: currentRow.shiptoshipfmno });
               break;
            case 'ap':
            case 'po':
               $state.go('apiv.detail', { pk: currentRow.custvendno, pk2: currentRow.shiptoshipfmno });
               break;
         }
      }
   };

   // Order hyperlink
   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         switch (currentRow.doctype.toLowerCase()) {
            case 'oe':
               $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
               break;

            case 'ap':
            case 'po':
               $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
               break;
         }
      }
   };


   self.drilldown = function (e, args) {
      var record = args[0].item;
      var type = '';

      if (record) {
         if (record.type === "oerouting") {
            type = MessageService.get('global.oerouting');
         } else if (record.type === "rlyclose") {
            type = MessageService.get('global.rlyclose');
         }
         else {
            type = record.type;
         }

         base.drillDownRecord.orderno = record.orderno;
         base.drillDownRecord.ordersuf = record.ordersuf;
         base.drillDownRecord.whse = record.whse;
         base.drillDownRecord.whsename = record.whsename;
         base.drillDownRecord.rwid = record.rwid;

         base.drillDownLabel = type + ' ' + MessageService.get('global.batch.detail');
         base.drillDownSubLabel = MessageService.get('global.date.time') + ": " + record.transdttmz;
         base.drillDownCriteria = { rwid: record.rwid, orderno: record.orderno, ordersuf: record.ordersuf };

         DataService.post('api/ptx/asptxentry/ptxgetqueuebatchdetail', { data: base.drillDownCriteria, busy: true }, function (data) {

            // Populate the grid
            base.drilldowndataset = data.ptxqueuebatchdetailresults;

            if (data.ptxqueuebatchdetailhdr) {
               base.drillDownRecord.dfltbatchsize = data.ptxqueuebatchdetailhdr.dfltbatchsize;
            }
         });

         $state.go('etxaq.detail', { detailRecord: record });
      }
   };

   self.stageFormatter = function (row, cell, value) {
      if (value) {
         switch (value) {
            case 'Ack':
               return $translate.instant('global.acknowledged');
            case 'Can':
               return $translate.instant('global.cancelled');
            case 'Cst':
               return $translate.instant('global.costed');
            case 'Cls':
               return $translate.instant('global.closed');
            case 'Ent':
               return $translate.instant('global.entered');
            case 'Inv':
               return $translate.instant('global.invoiced');
            case 'Ord':
               return $translate.instant('global.ordered');
            case 'Pck':
               return $translate.instant('global.picked');
            case 'Pd':
               return $translate.instant('global.paid');
            case 'Pre':
               return $translate.instant('global.pre.received');
            case 'Prt':
               return $translate.instant('global.printed');
            case 'Rec':
               return $translate.instant('global.received');
            case 'Shp':
               return $translate.instant('global.shipped');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.statusFormatter = function (row, cell, value) {
      if (value) {
         switch (value) {
            case 'err':
               return $translate.instant('global.error');
            case 'hld':
               return $translate.instant('global.hold');
            case 'pnd':
               return $translate.instant('global.pending');
            case 'wip':
               return $translate.instant('global.work.in.process');
             default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.processtypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value) {
            case 'oerouting':
               return $translate.instant('global.oerouting');
            case 'rlyclose':
               return $translate.instant('global.rlyclose');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.transtypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toLowerCase()) {
            case 'so':
               return $translate.instant('global.stock.order');
            case 'do':
               return $translate.instant('global.direct.order');
            case 'do':
               return $translate.instant('global.direct.order');
            case 'fo':
               return $translate.instant('global.future.order');
            case 'st':
               return $translate.instant('global.standing.order');
            case 'cs':
               return $translate.instant('global.counter.sale');
            case 'qu':
               return $translate.instant('global.quote.order');
            case 'rm':
               return $translate.instant('global.return.merchandise');
            case 'cr':
               return $translate.instant('global.correction');
            case 'bl':
               return $translate.instant('global.blanket.order');
            case 'br':
               return $translate.instant('global.blanket.release');
            case 'ra':
               return $translate.instant('global.receive.on.account');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.doctypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) {
            case 'OE':
               return $translate.instant('global.order.entry');
            case 'PO':
               return $translate.instant('global.purchase.order');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

});

app.controller('EtxaqDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   // ARIC/APIV hyperlink
   self.vendcustInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         switch (currentRow.doctype.toLowerCase()) {
            case 'oe':
               $state.go('aric.detail', { pk: currentRow.custvendno, pk2: currentRow.shiptoshipfmno });
               break;
            case 'ap':
            case 'po':
               $state.go('apiv.detail', { pk: currentRow.custvendno, pk2: currentRow.shiptoshipfmno });
               break;
         }
      }
   };

   // Order hyperlink
   self.orderInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         switch (currentRow.doctype.toLowerCase()) {
            case 'oe':
               $state.go('oeio.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
               break;

            case 'ap':
            case 'po':
               $state.go('poip.detail', { pk: currentRow.orderno, pk2: currentRow.ordersuf });
               break;
         }
      }
   };

   self.stageFormatter = function (row, cell, value) {
      if (value) {
         switch (value) {
            case 'Ack':
               return $translate.instant('global.acknowledged');
            case 'Can':
               return $translate.instant('global.cancelled');
            case 'Cst':
               return $translate.instant('global.costed');
            case 'Cls':
               return $translate.instant('global.closed');
            case 'Ent':
               return $translate.instant('global.entered');
            case 'Inv':
               return $translate.instant('global.invoiced');
            case 'Ord':
               return $translate.instant('global.ordered');
            case 'Pck':
               return $translate.instant('global.picked');
            case 'Pd':
               return $translate.instant('global.paid');
            case 'Pre':
               return $translate.instant('global.pre.received');
            case 'Prt':
               return $translate.instant('global.printed');
            case 'Rec':
               return $translate.instant('global.received');
            case 'Shp':
               return $translate.instant('global.shipped');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.doctypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) {
            case 'OE':
               return $translate.instant('global.sales.order');
            case 'PO':
               return $translate.instant('global.purchase.order');
            default:
               return value;
         }
      } else {
         return value;
      }
   };

   self.createdbyFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toLowerCase()) {
            case 'ordmnt':
               return $translate.instant('global.sxapi');
            case 'poepp':
               return $translate.instant('global.purchase.order.print');
            case 'oeet':
               return $translate.instant('global.order.entry');
            case 'poasn':
               return $translate.instant('global.advanced.shipping.notice');
            case 'poack':
               return $translate.instant('global.purchase.order.acknowledgement');

            default:
               return value;
         }
      } else {
         return value;
      }
   };

});




