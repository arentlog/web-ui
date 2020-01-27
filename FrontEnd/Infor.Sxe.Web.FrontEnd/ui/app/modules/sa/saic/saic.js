'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addInquiryBaseState('sa', 'saic', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('sa', 'saic');
});

app.controller('SaicBaseCtrl', function ($state, ConfigService, DataService) {
   var self = this;
   self.criteria = {};

   self.isMaster = function () {
      return $state.is('saic.master');
   };

   self.includesMaster = function () {
      return $state.includes('saic.master');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // TODO: check if correct field name for record limit
      self.criteria.recordlimit = ConfigService.getDefaultRecordLimit();
      self.criteria.connectionType = 'SX';
   };
   var connectionCollection = [];

   connectionCollection.push(self.criteria);

   // Perform simple search and update data set for the grid
   self.search = function () {
      DataService.post('api/sa/assainquiry/saicgetconnectlist', { data: connectionCollection, busy: true }, function (data) {
         self.dataset = data;
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
});

app.controller('SaicSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Re-initialize criteria (for static values and record limit)
      base.initCriteria();
   };

   // default search
   base.search();

   // Perform search when click on submit
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('saic.master');
      }

      // Get data
      base.search();
   };
});

app.controller('SaicMasterCtrl', function ($scope, $state, $translate, ConfigService, DataService, MessageService, GridService) {
   var self = this;
   var base = $scope.base;

   self.getSaicGetConnectSummary = function () {
      DataService.get('api/sa/assainquiry/saicgetconnectsummary', function (data) {
         self.connectSummary = data;
      });
   };

   self.getSaicGetConnectSummary();

   self.clearUsers = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);
      if (selectedRecords && selectedRecords.length > 0) {
         var disconnectList = [];
         var count = 0;
         selectedRecords.forEach(function (selectedRecord) {
            if (selectedRecord.connectName) {
               var isValidCono = isFinite(selectedRecord.connectName.substring(0, 4));
               if (isValidCono) {
                  if (selectedRecord.connectName.length > 4) {
                     disconnectList.push({ cGuid: selectedRecord.cGUID, userName: selectedRecord.connectName });
                     ++count;
                  }
               }
            }
         });
         var confirmationMsg = $translate.instant('question.are.you.sure.you.want.to.clear') + ' ' + $translate.instant('symbol.open.parenthesis') + count +
            $translate.instant('symbol.closed.parenthesis') + ' ' + $translate.instant('global.users').toLowerCase() + $translate.instant('symbol.questionmark');
         MessageService.okCancel('global.delete.confirmation', confirmationMsg, function () {
            DataService.post('api/sa/assainquiry/saiclistdisconnect', { data: disconnectList, busy: true }, function () {
               base.search();
            });
         });
      }
   };
});
