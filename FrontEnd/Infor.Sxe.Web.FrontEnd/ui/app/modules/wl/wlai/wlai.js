'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('wl', 'wlai');
   StateProvider.addMasterState('wl', 'wlai');
});

app.controller('WlaiBaseCtrl', function ($state) {
   var self = this;

   self.sidebarCollapsed = true;

   self.isMaster = function () {
      return $state.is('wlai.master');
   };

   self.includesMaster = function () {
      return $state.includes('wlai.master');
   };
});

app.controller('WlaiMasterCtrl', function ($scope, $state, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // New record to enter
   self.wlai = {};

   // Clear form
   self.clear = function () {
      self.wlai = {};
      self.wlai.blockBinCreation = false;
   };

   self.changeWarehouse = function () {
      var criteria = {
         whse: self.wlai.whse,
         prodcat: self.wlai.prodcat,
         prodbeg: self.wlai.prodbeg,
         prodend: self.wlai.prodend,
         crtmasterfl: self.wlai.crtmasterfl,
         crtitemfl: self.wlai.crtitemfl,
         crtbinsfl: self.wlai.crtbinsfl,
         crtxrefitemfl: self.wlai.crtxrefitemfl,
         crtvendorfl: self.wlai.crtvendorfl,
         crttablesfl: self.wlai.crttablesfl,
         wllivefl: self.wlai.wllivefl
      };

      DataService.post('api/wl/aswlinquiry/wlaifieldchangewhse', { data: criteria }, function (data) {
         if (data.messaging.length > 0) {
            MessageService.errorMessages(data.messaging);
         }
         if (data.wlaicriteria.wllivefl) {
            self.wlai.wllivefl = data.wlaicriteria.wllivefl;
         }
         if (!data.wlaicriteria.crtbinsflSensitive) {
            self.wlai.crtbinsfl = false;
            self.wlai.blockBinCreation = true;
         } else {
            self.wlai.blockBinCreation = false;
         }
      });
   };

   // Submit an entry
   self.submit = function () {
      var criteria = {
         whse: self.wlai.whse,
         prodcat: self.wlai.prodcat,
         prodbeg: self.wlai.prodbeg,
         prodend: self.wlai.prodend,
         crtmasterfl: self.wlai.crtmasterfl,
         crtitemfl: self.wlai.crtitemfl,
         crtbinsfl: self.wlai.crtbinsfl,
         crtxrefitemfl: self.wlai.crtxrefitemfl,
         crtvendorfl: self.wlai.crtvendorfl,
         crttablesfl: self.wlai.crttablesfl,
         wllivefl: self.wlai.wllivefl
      };

      if (self.wlai.wllivefl) {
         MessageService.yesNo('global.question', 'wl.whse.is.already.active.wlai.override.wl.data', function () {
            DataService.post('api/wl/aswlinquiry/wlaiupdate', { data: criteria, busy: true }, function () {
               // Do Not Delete This Comment:
               //     This process will take too long for the UI to wait for and it will time out, do not
               //     wait for a response, instead take the user instantly to the WLIT screen with the Master
               //     tab selected
            });
            self.processingGoToWLIT();
         });
      } else {
         DataService.post('api/wl/aswlinquiry/wlaiupdate', { data: criteria, busy: true }, function () {
            // Do Not Delete This Comment:
            //     This process will take too long for the UI to wait for and it will time out, do not
            //     wait for a response, instead take the user instantly to the WLIT screen with the Master
            //     tab selected
         });
         self.processingGoToWLIT();
      }
   };

   self.processingGoToWLIT = function () {
      MessageService.okCancel('global.information', 'wl.wlia.processing.inquire.using.wlit', function () {
         $state.go('wlit.master');
      });
   };
});
