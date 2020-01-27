'use strict';

app.controller('PoetReviewAndTotalsCtrl', function ($state, $scope, $translate, DataService, MessageService, RecoveryService, GridService, Utils) {
   var self = this;
   var base = $scope.base;
   self.isForcedRecalculate = false;

   self.performRecalculate = function () {
      if (base.pohdr) {
         if (base.pohdr.addonno1 === -1) {
            base.pohdr.addonamt1 = 0;
            base.pohdr.addonno1 = 0;
         }
         if (base.pohdr.addonno2 === -1) {
            base.pohdr.addonamt2 = 0;
            base.pohdr.addonno2 = 0;
         }
         if (base.pohdr.addonno3 === -1) {
            base.pohdr.addonamt3 = 0;
            base.pohdr.addonno3 = 0;
         }
         if (base.pohdr.addonno4 === -1) {
            base.pohdr.addonamt4 = 0;
            base.pohdr.addonno4 = 0;
         }

         self.poHeaderLeaveField(base.HEADERFIELD_LEAVE_FINISHADDONS);
      }
   };

   self.recalculate = function () {
      self.isForcedRecalculate = true;
      self.performRecalculate();
   };

   self.initiate = function () {
      self.isForcedRecalculate = false;
      self.performRecalculate();
   };

   self.updatePohdrCallback = function () {
      if (self.isForcedRecalculate) {
         MessageService.info('global.info', 'message.save.operation.completed.successfully');
      }
   };

   self.poHeaderLeaveField = function (fieldName) {
      var poheaderfieldleaveCriteria = {
         pohdr: base.pohdr,
         cField: fieldName
      };

      DataService.post('api/po/aspoheader/poheaderfieldleave', { data: poheaderfieldleaveCriteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarningMessage && data.cWarningMessage.length > 0) {
               MessageService.info('global.information', data.cWarningMessage);
            }

            base.pohdr = data.pohdr;

            //If this is the 'Recalculate' call, then we also need to persist the data after the call finishes.
            if (fieldName === base.HEADERFIELD_LEAVE_FINISHADDONS) {
               base.updatePohdr(self.updatePohdrCallback);
            }
         }
      });
   }

   self.addonsFieldChanged = function (fieldName, addonNumber) {
      if (addonNumber && addonNumber > 0) {
         fieldName = fieldName + addonNumber;
      }
      self.poHeaderLeaveField(fieldName);
   };

   self.initiate();
});