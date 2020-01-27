'use strict';

app.controller('AoLogisticsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as logdtl
   var self = this;
   var base = $scope.base;
   var HOLDOERM_ALL = 'A';
   var HOLDOERM_VENDOR = 'V';
   var HOLDOEAPPRTY_Y = 'Y';
   var ZEROAPPRTY_Y = 'Y';
   var ZEROAPPRTY_H = 'H';

   var subject = 'Warehouse Logistics';
   var dictionary = {
      shiplabelfl: 'IBC:OEES Label Print',
      screenposfl: 'IBC:Centered Screen',
      iBCutToleranceQty: 'IBC: Rounding Tolerance',
      iBDfltForceCutQtyFl: 'IBC:Default Force Cut Qty Flag',
      iBCutScrapOverFl: 'IBC:Allow Scrap Qty Override Flag',
      unibardir: 'IBC:Unibar Directory',
      unibarcfg: 'IBC:Unibar Printer Config',
      unibarexec: 'IBC:Unibar Executable Program',
      unibardelim: 'IBC:Unibar Delimiter',
      unibardebug: 'IBC:Unibar Debug Mode',
      unibarlog: 'IBC:Unibar Debug Log',
      jrnloperinit: 'Default Operator',
      zeroqtyfl: 'Download 0 Qty',
      whzone: 'Default Zone',
      custnotesfl: 'Customer Notes',
      icspnotesfl: 'Customer Notes', //from SL - does not seem right
      icsp2notesfl: 'Customer Notes', //from SL - does not seem right
      twlAddrLine3Fl: 'Use 3rd Line of Address in TWL Interface',
      holdoerm: 'Returns to Hold',
      holdporm: 'Hold PO/RMs',
      holdoeapprty: 'Approve Type',
      zeroapprty: 'Zero Appr. Type',
      delinactfl: 'Purge WL Trans',
      vastex: 'VAST EX',
      vastit: 'VAST IT'
   };

   self.aoLogistics = {};

   base.getConfigurationData(subject);

   DataService.get('api/shared/assharedentry/aologisticsload', { busy: true }, function (data) {
      if (data) {
         self.aoLogistics = data;
         self.original = angular.copy(self.aoLogistics);
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoLogistics, self.original).length);
   };

   self.independent = function () {
      return $state.current.name === 'ao.logistics.wl-locations';
   };

   self.reset = function () {
      self.aoLogistics = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aoLogistics, self.original).length) {
            base.fillNotes(self.aoLogistics, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aologisticssave', { data: self.aoLogistics, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoLogistics);
            base.saveLog(subject);
         }
      });
   };

   self.validate = function () {
      if (self.aoLogistics.iBCutToleranceQty < 0 || self.aoLogistics.iBCutToleranceQty > 1) {
         MessageService.error('global.error', 'message.must.be.between.0.and.1');
         $state.go('ao.logistics.ibc-options');
         return false;
      }

      if (self.aoLogistics.holdoerm === HOLDOERM_ALL || self.aoLogistics.holdoerm === HOLDOERM_VENDOR) {

         if (!self.aoLogistics.holdoeapprty) {
            MessageService.error('global.error', 'message.approve.type.is.required.when.oe.returns.are.to.be');
            $state.go('ao.logistics.wl-options');
            return false;
         } else if (self.aoLogistics.holdoeapprty.toUpperCase() === HOLDOEAPPRTY_Y) {
            MessageService.error('global.error', 'message.customer.return.hold.approve.cannot.be.y.for.app');
            $state.go('ao.logistics.wl-options');
            return false;
         }
      }

      if (self.aoLogistics.zeroapprty.toUpperCase() === ZEROAPPRTY_Y || self.aoLogistics.zeroapprty.toUpperCase() === ZEROAPPRTY_H) {
         MessageService.error('global.error', 'message.zero.shipped.hold.approve.type.cannot.be.y.or.h');
         $state.go('ao.logistics.wl-options');
         return false;
      }

      return true;
   };
}); //end logdtl

app.controller('AoLogisticsLocationCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, ModalService) { //as logwlloc
   var self = this;
   var base = $scope.base;
   var subject = 'Warehouse Logistics';
   var dictionary = {
      descrip: 'Description',
      esbwlfl: 'ESB WL Implementation'
   };

   self.selectedWLLocation = '';
   self.aologisticswlloc = { wlloc: '' };

   self.aologisticsWLLocLoad = function (selectedWLLocation) {
      self.aologisticswlloc = { wlloc: selectedWLLocation };
      DataService.post('api/shared/assharedentry/aologisticswllocload', { data: self.aologisticswlloc, busy: true }, function (data) {
         if (data) {
            self.aologisticswlloc = data;
            self.selectedWLLocation = self.aologisticswlloc.wlloc;
            self.original = angular.copy(self.aologisticswlloc);
         } else {
            self.aologisticswlloc = { wlloc: '' };
         }
      });
   };

   self.delete = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.post('api/shared/assharedentry/aologisticswllocdelete', { data: self.aologisticswlloc, busy: true }, function (data) {
            if (!MessageService.processMessaging(data)) {
               // Back end returns info message.  No need to display another one here.
               self.selectedWLLocation = '';
               self.aologisticswlloc = { wlloc: '' };
            }
         });
      });
   };

   self.reset = function () {
      self.aologisticswlloc = angular.copy(self.original);
      base.reset();
   };

   self.save = function () {
      if (self.validate()) {
         if (base.hasChanges(self.aologisticswlloc, self.original).length) {
            base.fillNotes(self.aologisticswlloc, self.original, dictionary, null, self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aologisticswllocsave', { data: self.aologisticswlloc, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aologisticswlloc);
            base.saveLog(subject);
         }
      });
   };

   self.create = function () {
      ModalService.showModal('ao/ao/logistics/wl-locations-create.json', 'AoLogisticsLocationCreateModalCtrl as mod', $scope, function (modal) {
         self.createModal = modal;
      });
   };

   self.validate = function () {
      // No validations here - Future use only.
      return true;
   };
}); //end logwlloc

app.controller('AoLogisticsLocationCreateModalCtrl', function ($scope, $translate, DataService, MessageService) { //as mod
   var self = this;
   var base = $scope.base;
   var modalParent = $scope.logwlloc;

   self.create = function() {
      DataService.post('api/shared/assharedentry/aologisticswllocsave', { data: { wlloc: self.name, descrip: self.descrip }, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            base.saveLog('Warehouse Logistics');
            modalParent.aologisticswlloc = { wlloc: self.name, descrip: self.descrip };
            modalParent.selectedWLLocation = modalParent.aologisticswlloc.wlloc;
            modalParent.original = angular.copy(modalParent.aologisticswlloc);
            modalParent.createModal.destroy();
         }
      });
   };

   self.cancel = function () {
      modalParent.createModal.destroy();
   };
});