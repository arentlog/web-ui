'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlea', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlea');
});

app.controller('TwleaBaseCtrl', function ($scope, $state, ConfigService, DataService, GridService, MessageService, UserService) {
   var self = this;

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.empNum = UserService.getTwlUserId();
   self.issueTypes = [
      { label: MessageService.get('global.active.receipt.lines'), value: 'activereceiptlines' },
      { label: MessageService.get('global.close.receipts'), value: 'closereceipts' }
   ];
   self.statusTypes = [
      { label: MessageService.get('global.open'), value: 'O' },
      { label: MessageService.get('global.active'), value: 'A' },
      { label: MessageService.get('global.open'), value: 'o' },
      { label: MessageService.get('global.active'), value: 'a' }
   ];

   self.isMaster = function () {
      return $state.is('twlea.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlea.master');
   };

   self.isDetail = function () {
      return $state.is('twlea.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlea.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.criteria.issueType = "activereceiptlines";
   };

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.updateActiveReceiptLines = function () {
      var records = GridService.getSelectedRecords(self.gridActiveReceiptLines);

      var rfadminlist = {
         ttbltwlrfadminmaintainlist: []
      };

      if (records) {
         records.forEach(function (record) {
            if (record.updated === false) {
               rfadminlist.ttbltwlrfadminmaintainlist.push(record);
            }
         });
      }
      DataService.post('/web/api/twl/twlrfadminmaintainupdate', { data: rfadminlist, busy: true }, function (data) {
         if (data) {
            self.datasetActiveReceiptLines = data.ttbltwlrfadminmaintainlist;
         }
      });

   };

   self.closeReceipts = function () {
      var records = GridService.getSelectedRecords(self.gridOpenedReceipts);

      var rfadminlist = {
         ttbltwlrfadminmaintainlist: []
      };

      if (records) {
         records.forEach(function (record) {
            if (record.updated === false) {
               rfadminlist.ttbltwlrfadminmaintainlist.push(record);
            }
         });
      }
      DataService.post('/web/api/twl/twlrfadminmaintainupdate', { data: rfadminlist, busy: true }, function (data) {
         if (data) {
            self.datasetOpenedReceipts = data.ttbltwlrfadminmaintainlist;
         }
      });

   };


   // Perform search and update data set for the grid
   self.search = function () {

      self.datasetActiveReceiptLines = [];

      switch (self.criteria.issueType) {
         case 'activereceiptlines':
            // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
            // for more than just searching, and we need the used criteria (not the latest which the user might change)
            var rfadmincriteria = {
               ttbltwlrfadminmaintaincriteria: angular.copy(self.criteria)
            };
            rfadmincriteria.ttbltwlrfadminmaintaincriteria.wh_num = self.criteria.whNum;

            DataService.post('/web/api/twl/twlrfadminmaintainlist', { data: rfadmincriteria, busy: true }, function (data) {
               if (data) {
                  self.datasetActiveReceiptLines = data.ttbltwlrfadminmaintainlist;
               }
            });
            // code block
            break;
         case 'closereceipts':
            // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
            // for more than just searching, and we need the used criteria (not the latest which the user might change)
            var rfadmincriteria = {
               ttbltwlrfadminmaintaincriteria: angular.copy(self.criteria)
            };
            rfadmincriteria.ttbltwlrfadminmaintaincriteria.wh_num = self.criteria.whNum;

            DataService.post('/web/api/twl/twlrfadminmaintainlist', { data: rfadmincriteria, busy: true }, function (data) {
               if (data) {
                  self.datasetOpenedReceipts = data.ttbltwlrfadminmaintainlist;
               }
            });
            // code block
            break;
         default:
         // code block
      }
   };
   
   self.update = function () {

   };
   
   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('TwleaSearchCtrl', function ($scope, $state, DataService, Utils) {
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
         $state.go('twlea.master');
      }

      base.search();
   };
});

app.controller('TwleaMasterCtrl', function ($scope, $state, $stateParams) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});
