'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('ot', 'otit', {
      widgets: ['SEARCH', 'RECENTLY_VISITED']
   });
   StateProvider.addMasterState('ot', 'otit', { params: { prod: undefined } });

   $stateProvider.state('otit.detail', {
      url: '/detail?id',
      params: { record: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otit/detail.json');
            },
            controller: 'OtitDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('otit.detail.comments', {
      url: '/comments',
      params: { linesRecord: null, commtype: null, callBack: null },
      views: {
         childView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ot/otit/comments.json');
            },
            controller: 'OtitCommentsCtrl as cmt'
         }
      }
   });
});

app.controller('OtitBaseCtrl', function ($state, ConfigService, DataService, $translate) {
   var self = this;
   self.criteria = {};

   // Recently Visited Options
   self.recentlyVisitedOptions = {
      controlRef: 'base.recentlyVisitedControl',
      listKey: 'otit',
      rowIdField: 'rowID',
      stateRef: 'otit.detail',
      title: { label: 'global.track.number', value: 'trackno' },
      description: { label: 'global.stage', valueFunction: 'base.formatStage' }
   };

   self.isMaster = function () {
      return $state.is('otit.master');
   };

   self.includesMaster = function () {
      return $state.includes('otit.master');
   };

   self.isDetail = function () {
      return $state.is('otit.detail');
   };

   self.includesDetail = function () {
      return $state.includes('otit.detail');
   };

   self.formatStage = function (otit) {
      if (otit.stagecd || otit.stagecd === 0) {
         //Keeping this comment to show the indentation change in switch/case as VS ignores this change through 'Show changes' option.
         switch (otit.stagecd.toString()) {
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
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
   };

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/ot/asotinquiry/otitbuildtracklist', { data: self.criteria, busy: true }, function (data) {
         self.dataset = data.otittrackresults1;
         self.dataset2 = data.otittrackresults2;
         self.dataset3 = data.otittrackresults3;
      });
   };

   self.navigatetoApiv = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.vendno > 0) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.navigatetoIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.shipprod) {
         $state.go('icip.detail', { pk: currentRow.shipprod });
      }
   };

   self.navigatetoPoip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.pono) {
         $state.go('poip.detail', { pk: currentRow.pono, pk2: currentRow.posuf });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('OtitSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('otit.master');
      }

      // Get data
      base.search();
   };
});

app.controller('OtitMasterCtrl', function ($scope, $state, ConfigService, DataService, MessageService, $translate) {
   var self = this;
   var base = $scope.base;

   // hyperlink from ICIA
   if ($state.params.prod) {
      var prodCriteria = {
         prod: $state.params.prod,
         recordlimit: ConfigService.getDefaultRecordLimit(),
         statuscd: 1
      };
      DataService.post('api/ot/asotinquiry/otitbuildtracklist', { data: prodCriteria, busy: true }, function (data) {
         base.dataset = data.otittrackresults1;
         base.dataset2 = data.otittrackresults2;
         base.dataset3 = data.otittrackresults3;
         self.gridType = 'p';
         self.isHeaderInfoVisible = false;
         self.isLineDetailVisible = false;
         self.isPoLineDetailVisible = true;
      });
   } else {
      self.isHeaderInfoVisible = true;
      self.isLineDetailVisible = false;
      self.isPoLineDetailVisible = false;
      self.gridType = 'h';
   }

   // Advanced search criteria object with initial values
   // TODO: default values
   self.advCriteria = {
      recordlimit: ConfigService.getDefaultRecordLimit(),
      statuscd: 1,
      stagecd: ['']
   };

   // List of available search criteria fields
   // TODO: finish
   self.criteriaList = [
      { value: 'vendno', label: $translate.instant('global.vendor.number') },
      { value: 'prod', label: $translate.instant('global.product') },
      { value: 'whse', label: $translate.instant('global.warehouse') },
      { value: 'shipfmno', label: $translate.instant('global.ship.from') },
      { value: 'ponox', label: $translate.instant('global.purchase.order.number') },
      { value: 'contno', label: $translate.instant('global.container.number') },
      { value: 'voyageno', label: $translate.instant('global.voyage.number') },
      { value: 'bolno', label: $translate.instant('global.bill.of.lading.number') },
      { value: 'shipco', label: $translate.instant('global.ship.company') },
      { value: 'vessnm', label: $translate.instant('global.vessel.name') },
      { value: 'producfm', label: $translate.instant('global.production.from') },
      { value: 'producto', label: $translate.instant('global.production.to') },
      { value: 'complfm', label: $translate.instant('global.complete.from') },
      { value: 'complto', label: $translate.instant('global.complete.to') },
      { value: 'shipfm', label: $translate.instant('global.shipped.from') },
      { value: 'shipto', label: $translate.instant('global.shipped.to') },
      { value: 'arrfm', label: $translate.instant('global.arrived.from') },
      { value: 'arrto', label: $translate.instant('global.arrived.to') },
      { value: 'rdfm', label: $translate.instant('global.ready.from') },
      { value: 'rdto', label: $translate.instant('global.ready.to') },
      { value: 'demufm', label: $translate.instant('global.demurrage.from') },
      { value: 'demuto', label: $translate.instant('global.demurrage.to') },
      { value: 'atwhsefm', label: $translate.instant('global.at.whse.from') },
      { value: 'atwhseto', label: $translate.instant('global.at.whse.to') },
      { value: 'countryorg', label: $translate.instant('global.country.of.origin') },
      { value: 'countrydest', label: $translate.instant('global.country.of.destination') },
      { value: 'statuscd', label: $translate.instant('global.status') },
      { value: 'stagecd', label: $translate.instant('global.stage') }
   ];

   // List of default selected criteria fields
   // TODO: any?
   self.defaultSelectedCriteria = ['vendno'];

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', {
         record: record
      });
   };

   self.drilldown2 = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', {
         record: record
      });
   };

   self.drilldown3 = function (e, args) {
      var record = args[0].item;
      $state.go('^.detail', {
         record: record
      });
   };

   // Perform advanced search and update data set for the grid
   self.search = function () {
      var advCriteria = angular.copy(self.advCriteria);

      if (advCriteria.stagecd) {
         advCriteria.stagecd = advCriteria.stagecd.join();
      }

      if (advCriteria.ponox) {
         var orderDetails = advCriteria.ponox.split('-');
         advCriteria.pono = orderDetails[0];
         advCriteria.posuf = orderDetails[1];
      }
      delete advCriteria.ponox;

      // Apply record limit (if cleared by user)
      if (!advCriteria.recordlimit) {
         advCriteria.recordlimit = ConfigService.getDefaultRecordLimit();
      }

      DataService.post('api/ot/asotinquiry/otitbuildtracklist', { data: advCriteria, busy: true }, function (data) {
         base.dataset = data.otittrackresults1;
         base.dataset2 = data.otittrackresults2;
         base.dataset3 = data.otittrackresults3;
      });
   };

   self.gridTypeChanged = function () {
      if (self.gridType === 'h') {
         self.isHeaderInfoVisible = true;
         self.isLineDetailVisible = false;
         self.isPoLineDetailVisible = false;
      }
      else if (self.gridType === 'l') {
         self.isHeaderInfoVisible = false;
         self.isLineDetailVisible = true;
         self.isPoLineDetailVisible = false;
      }
      else if (self.gridType === 'p') {
         self.isHeaderInfoVisible = false;
         self.isLineDetailVisible = false;
         self.isPoLineDetailVisible = true;
      }
   };

   self.navigatePoip = function () {
      var orderDetails = self.advCriteria.ponox.split('-');
      $state.go('poip.detail', { pk: orderDetails[0], pk2: orderDetails[1] });
   };

   self.navigatetoIcip = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.prod) {
         $state.go('icip.detail', { pk: currentRow.prod });
      }
   };

   self.navigatetoApiv = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.povendno) {
         $state.go('apiv.detail', { pk: currentRow.povendno });
      }
   };
});

app.controller('OtitDetailCtrl', function ($scope, $state, $stateParams, Constants, DataService, $translate, GridService, SecurityService) {
   var self = this;
   var base = $scope.base;

   self.isLinesTabReadonly = SecurityService.getSubSecurityLevel('otit', 'Lines') < 3;

   if ($stateParams.id) {
      self.oteh = DataService.getResource('api/ot/oteh/getbyrowid/' + $stateParams.id, { busy: true });
   } else if ($stateParams.record) {
      var record = { trackno: $stateParams.record.trackno };
      self.oteh = DataService.getResource('api/ot/oteh/getbypk', { params: record, busy: true });
   }

   function formatStage(stage) {
      if (stage || stage === 0) {
         //Keeping this comment to show the indentation change in switch/case as VS ignores this change through 'Show changes' option.
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

   self.loadLines = function () {
      self.datasetLines = [];
      DataService.get('api/ot/asotinquiry/otittracklineload/' + self.oteh.trackno, { busy: true }, function (data) {
         if (data) {
            self.datasetLines = data;
         }
      });
   };

   // After record has resolved...
   self.oteh.$promise.then(function () {
      if (self.oteh) {
         base.criteria.trackno = self.oteh.trackno;
         self.subTitle = $translate.instant('global.tracking.number') + Constants.LABEL_DELIMITER + self.oteh.trackno + Constants.SUB_TITLE_SEPARATOR +
                  $translate.instant('global.vendor.number') + Constants.LABEL_DELIMITER + self.oteh.vendno + Constants.SUB_TITLE_SEPARATOR +
                  $translate.instant('global.warehouse') + Constants.LABEL_DELIMITER + self.oteh.whse + Constants.SUB_TITLE_SEPARATOR +
                  $translate.instant('global.stage') + Constants.LABEL_DELIMITER + formatStage(self.oteh.stagecd);

         // Add to recently visited list
         base.recentlyVisitedControl.addToList(self.oteh);

         DataService.getResource('api/ot/asotinquiry/otittrackheaderload/' + self.oteh.trackno, { busy: true }, function (data) {
            if (data) {
               self.otittrackheader = data;
            }
         });

         DataService.getResource('api/ot/asotinquiry/otittracktotalsload/' + self.oteh.trackno, { busy: true }, function (data) {
            if (data) {
               self.otittracktotals = data;

               self.addonsDataset = [];
               self.addonsDataset.push({ addonno: 1, cAddonNm: self.otittracktotals.addondesc1, addonamt: self.otittracktotals.addonamt1, addontype: self.otittracktotals.addontype1, addonnet: self.otittracktotals.addonnet1 });
               self.addonsDataset.push({ addonno: 2, cAddonNm: self.otittracktotals.addondesc2, addonamt: self.otittracktotals.addonamt2, addontype: self.otittracktotals.addontype2, addonnet: self.otittracktotals.addonnet2 });
               self.addonsDataset.push({ addonno: 3, cAddonNm: self.otittracktotals.addondesc3, addonamt: self.otittracktotals.addonamt3, addontype: self.otittracktotals.addontype3, addonnet: self.otittracktotals.addonnet3 });
               self.addonsDataset.push({ addonno: 4, cAddonNm: self.otittracktotals.addondesc4, addonamt: self.otittracktotals.addonamt4, addontype: self.otittracktotals.addontype4, addonnet: self.otittracktotals.addonnet4 });
            }
         });

         self.dataset = [];
         var params = { ordertype: 'OT', pono: self.oteh.trackno, posuf: 0, lineno: 0 };

         DataService.post('api/po/aspoinquiry/loadpoaddons', { data: params, busy: true }, function (data) {
            self.dataset = data.loadpoaddonsresults;
         });
         self.loadLines();
      }
   });

   self.navigateToCommentsScreen = function (commtype) {
      var selectedRecord = GridService.getSelectedRecord(self.linesGrid);
      if (selectedRecord) {
         $state.go('.comments', { linesRecord: selectedRecord, commtype: commtype, callBack: self.callBack });
      }
   };

   self.callBack = function () {
      self.loadLines();
      $state.go('^');
   };
});

app.controller('OtitCommentsCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   self.commtype = $stateParams.commtype;
   if ($stateParams.linesRecord) {
      self.selectedLine = $stateParams.linesRecord;
   }

   self.back = function () {
      if ($stateParams.callBack) {
         $stateParams.callBack();
      }
   };
});