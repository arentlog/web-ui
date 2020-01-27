'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('rs', 'rsas', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('rs', 'rsas');
});

app.controller('RsasBaseCtrl', function ($state, DataService, SecurityService, MessageService) {
   var self = this;
   self.isBtnStopStartEnabled = false;
   var MENU_FUNCTION_RSAS = 'rsas';

   // The time-zone offset is the difference, in minutes, between UTC and local time. Note that this means that
   // the offset is positive if the local timezone is behind UTC and negative if it is ahead.  This is the opposite
   // of how the backend expects it.
   self.dateToday = new Date();
   self.timezoneclient = self.dateToday.getTimezoneOffset() * -1;

   self.criteria = {};

   self.isMaster = function () {
      return $state.is('rsas.master');
   };

   self.includesMaster = function () {
      return $state.includes('rsas.master');
   };

   self.getSecurity = function () {
      self.securityLevel = SecurityService.getSecurityLevel(MENU_FUNCTION_RSAS);
      if (self.securityLevel >= 4) {
         self.isBtnStopStartEnabled = true;
      }
      else {
         self.isBtnStopStartEnabled = false;
      }
   };

   // Perform search and update data set for the grid
   self.search = function () {
      var rsasStatus = {
         pid: '',
         startenabled: false,
         statusmsg: '',
         stopenabled: false,
         timezoneclient: self.timezoneclient
      };
      DataService.post('api/rs/asrssetup/rsasload', { data: rsasStatus, busy: true }, function (data) {
         self.dataset = data.rsasdetail;
         self.rsasstatus = data.rsasstatus;

         if (self.securityLevel >= 4) {
            self.isBtnStopStartEnabled = true;
         }
         else {
            self.isBtnStopStartEnabled = false;
         }
      });
   };

   self.getSecurity();

   self.search();

});

app.controller('RsasSearchCtrl', function ($scope, $state, DataService) {
   var self = this;
   var base = $scope.base;

   // Perform refresh action with refresh button click event
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('rsas.master');
      }
      base.search();
   };

   self.rsasStartStop = function () {
      var isStartStop = '';
      if (base.rsasstatus.startenabled) {
         isStartStop = true;
      }
      else if (base.rsasstatus.stopenabled) {
         isStartStop = false;
      }
      var asrssetupRSASStartStopRequest = { rsasstatus: base.rsasstatus, lStartRS: isStartStop };
      DataService.post('api/rs/asrssetup/rsasstartstop', { data: asrssetupRSASStartStopRequest, busy: true }, function (data) {
         base.rsasstatus = data;
         base.isBtnStopStartEnabled = false;
      });
   };
});

app.controller('RsasMasterCtrl', function ($scope, $state, GridService, DataService) {
   var self = this;
   var base = $scope.base;

   self.stopJobs = function () {
      var selectedRecords = GridService.getSelectedRecords(base.grid);

      DataService.post('api/rs/asrssetup/rsasstopjobs', { data: selectedRecords, busy: true }, function (data) {
         $scope.base.dataset = data;
         base.search();
      });
   };
});
