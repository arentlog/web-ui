'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('gl', 'glif', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('gl', 'glif');

   $stateProvider.state('glif.detail', {
      url: '/detail',
      params: { rowid: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glif/detail.json');
            },
            controller: 'GlifDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('glif.detail.history', {
      url: '/history',
      params: { record: null },
      views: {
         history: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glif/history.json');
            },
            controller: 'GlifHistoryCtrl as his'
         }
      }
   });
});

app.controller('GlifBaseCtrl', function ($state, DataService, UserService) {
   var self = this;
   self.criteria = {};
   self.cono = UserService.getCono();

   self.isMaster = function () {
      return $state.is('glif.master');
   };

   self.includesMaster = function () {
      return $state.includes('glif.master');
   };

   self.isDetail = function () {
      return $state.is('glif.detail');
   };

   self.includesDetail = function () {
      return $state.includes('glif.detail');
   };

   // Perform search and update data set for the grid
   self.search = function () {
      DataService.post('api/gl/asglinquiry/glifsearch', { data: self.criteria, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };
});

app.controller('GlifSearchCtrl', function ($scope, $state, Utils) {
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
         $state.go('glif.master');
      }
      base.search();
   };
});

app.controller('GlifMasterCtrl', function ($scope, $state, $stateParams, MessageService) {
   var self = this;
   var base = $scope.base;

   /**
    * Drilldown to detail state - Only available on (d)etail records
    */
   self.drilldown = function (item) {
      if (item && item.recordty.toLowerCase() === 'd') {
         $state.go('^.detail', { rowid: item.rowidGlif });
      } else {
         MessageService.error('global.error', 'error.record.type.title.blank.summary.or.calculated.');
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

app.controller('GlifDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;

   /**
    * Drill down to history state
    */
   self.drilldown = function (e, args) {
      var record = args[0].item;

      if (record) {
         $state.go('^.detail.history', { record: record });
      }
   };

   /**
    * GLIA Hyperlink
    */
   self.glInquiryHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow) {
         $state.go('glia.detail', { pk: currentRow.glno });
      }
   };

   /**
    * Load the Detail tab grid data
    */
   self.loadDetailsGrid = function () {
      self.dataset = [];
      DataService.post('api/gl/asglinquiry/glifdetailbrowser', { data: self.banner, busy: true }, function (data) {
         if (data) {
            self.dataset = data;
         }
      });
   };

   // Private methods

   /**
    * Initialize the details view
    */
   function initialize() {
      var criteria = { rowidGlif: $stateParams.rowid || '' };
      if (criteria.rowidGlif) {
         DataService.post('api/gl/asglinquiry/glifdetailbanner', { data: criteria, busy: true }, function (data) {
            if (data) {
               self.banner = data.glifdetailbannerresults;
               self.glif = data.glif;
               self.subTitle = MessageService.get('global.design.name') + ': ' + self.banner.cdesign + ' | ' +
                  MessageService.get('global.report.name') + ': ' + self.banner.creportnm + ' | ' +
                  MessageService.get('global.line') + ': ' + self.banner.cprtline;
               self.loadDetailsGrid();
            }
         });
      }
   }

   initialize();
});

app.controller('GlifHistoryCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var banner = $scope.dtl.banner;

   self.record = $stateParams.record;
   self.subTitle = MessageService.get('global.account') + ': ' + self.record.glno + ' - ' + self.record.lookupnm;

   if (banner && self.record) {
      var criteria = {
         cacct: self.record.glno,
         cdesign: banner.cdesign,
         cprtline: banner.cprtline,
         creportnm: banner.creportnm,
         icolumnno: banner.icolumnno,
         icurryr: banner.icurryr,
         icyear: banner.icyear,
         iperfisc: banner.iperfisc,
         iperiod: banner.iperiod,
         iseqno: banner.iseqno
      };
      DataService.post('api/gl/asglinquiry/glifdetailhist', { data: criteria, busy: true }, function (data) {
         if (data) {
            // Sort by yr descending
            data.sort(function (a, b) {
               return b.yr - a.yr;
            });
            self.dataset = data;
         }
      });
   }
});
