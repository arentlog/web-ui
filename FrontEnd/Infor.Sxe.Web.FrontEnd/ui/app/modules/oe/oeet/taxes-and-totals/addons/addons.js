'use-strict';

app.controller('OeetAddonsCtrl', function ($state, $scope, $translate, DataService, AodataService, GridService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var tat = $scope.tat;

   DataService.get('api/oe/asoeheader/loadoeaddonlist/' + base.oehdr.orderno + '/' + tat.orderSuffix, { busy: true }, function (data) {
      if (data) {
         self.addonTypeCollection = data;

         self.addonTypes = [];
         for (var i = 0; i < self.addonTypeCollection.length; i++) {
            var currentAddonType = self.addonTypeCollection[i];
            self.addonTypes.push({
               label: currentAddonType.addondesc,
               value: currentAddonType.addondesc
            });
         }

         if (tat.addonsCollection.length === 0) {
            self.loadOrderAddons();
         } else {
            self.rerenderData();
         }
      }
   });

   self.grid = {};
   self.rowParams = {};
   self.billDirectAddonValue = AodataService.getValue('so', 'oebilldirpoaddonfl');
   self.total = 0;

   self.loadOrderAddons = function () {
      DataService.get('api/oe/asoeinquiry/loadorderaddons/' + base.oehdr.orderno + '/' + tat.orderSuffix + '/false', { busy: true }, function (data) {
         if (data) {
            Utils.replaceArray(tat.addonsCollection, data);
            self.rerenderData();
         }
      });
   };

   self.rerenderData = function () {
      self.grid.loadData(tat.addonsCollection);

      self.recalculateTotal();
   };

   self.recalculateTotal = function () {
      var newTotal = 0;
      for (var i = 0; i < tat.addonsCollection.length; i++) {
         newTotal += tat.addonsCollection[i].addonnet;
      }

      self.total = newTotal;
   };

   self.updateTaxesAndTotals = function (skipContinue) {
      var taxesTotalsUpdateRequest = {
         oeaddons: tat.addonsCollection,
         oehdr: base.oehdr,
         lMaintMode: base.isAddOrderMode
      };
      DataService.post('api/oe/asoeheader/oetaxestotalsupdate', { data: taxesTotalsUpdateRequest, busy: true }, function (data) {
         if (!MessageService.processMessaging(data) && !skipContinue) {
            self.updateTaxesAndTotalsContinue();
         }
      });
   };

   self.updateTaxesAndTotalsContinue = function () {

      // If using AvaTax, don't calculate taxes on each addon
      // Override (O)rdered, (S)hipped or (B)oth to be X, Y or Z
      if (base.taxMethodType.toLowerCase() === 'a') {
         base.calcsob = 'z';
      } else {
         base.calcsob = 'b';
      }

      base.getOrderData();
      self.loadOrderAddons();
   };

   self.billDirectAddonsChanged = function () {
      self.updateTaxesAndTotals(true);
   };

   self.new = function () {
      tat.addonsCollection.push({
         isNewAddon: true,
         seqno: tat.addonsCollection.length + 1
      });
      self.rerenderData();

      self.grid.toggleRowDetail((tat.addonsCollection.length * 2) - 1);
   };

   self.delete = function () {
      var selectedRecords = GridService.getSelectedRecords(self.grid);

      if (selectedRecords) {
         for (var i = 0; i < selectedRecords.length; i++) {
            if (selectedRecords[i].ehffl) {
               MessageService.error('global.error', 'message.cannot.delete.environmental.hanlding.fee.addons');
               return;
            }
         }

         MessageService.yesNo('global.delete.items', 'question.delete.selected.addons', function () {
            for (var j = 0; j < selectedRecords.length; j++) {
               var currentRecord = selectedRecords[j];
               if (currentRecord.seqno <= 4) {
                  tat.addonsCollection[currentRecord.seqno - 1].addonno = 0;
                  tat.addonsCollection[currentRecord.seqno - 1].addonamt = 0;
                  tat.addonsCollection[currentRecord.seqno - 1].addondesc = '';
                  tat.addonsCollection[currentRecord.seqno - 1].addonnet = 0;
               } else {
                  //remove it from the collection
                  tat.addonsCollection.splice(currentRecord.seqno - 1, 1);
               }
            }

            self.rerenderData();
            self.updateTaxesAndTotals();
         }, null);
      }
   };

   self.back = function () {

      // Retotal order based on (O)rdered, (S)hipped or (B)oth
      base.calcsob = 'b';

      base.getOrderData(function () {
         if (tat.navFromState) {
            $state.go(tat.navFromState);
         } else {
            tat.loadTaxDetail();
            $state.go('^');  
         }
      });
   };
});

app.controller('OeetAddonDetailCtrl', function ($state, $scope, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var add = $scope.add;
   var tat = $scope.tat;
   var addonRowNumber = add.rowParams.row;

   self.addonRow = add.rowParams.item;

   self.isEmptyAddon = self.addonRow.addonno === 0;

   if (self.addonRow.ehffl) {
      add.grid.toggleRowDetail(addonRowNumber);
      MessageService.error('global.error', 'message.cannot.edit.environmental.hanlding.fee.addons');
   }

   $scope.$watch('adddtl.addonRow.addondesc', function (newValue, oldValue) {
      if (oldValue !== newValue) {
         var addonType;
         for (var i = 0; i < add.addonTypeCollection.length; i++) {
            var currentAddonType = add.addonTypeCollection[i];
            if (currentAddonType.addondesc === newValue) {
               addonType = currentAddonType;
               break;
            }
         }

         if (addonType) {
            if (addonType.ehffl && base.oehdr.oetype !== 'cr' && !self.isEmptyAddon && !self.addonRow.isNewAddon) {
               add.grid.toggleRowDetail(addonRowNumber);
               MessageService.error('global.error', 'message.cannot.change.to.an.environmental.hanlding.fee.addon');
            } else {
               self.addonRow.addonno = addonType.addonno;
               self.addonRow.addonamt = addonType.addonamt;
               self.addonRow.addontype = addonType.addontype;
               self.addonRow.addonnet = addonType.addonnet;
            }
         } else {
            self.addonRow.addonno = 0;
            self.addonRow.addonamt = 0;
            self.addonRow.addontype = false;
            self.addonRow.addonnet = 0;
         }

         //User Hook (do not rename)
         if (self.addonDescriptionChangeContinue) {
            self.addonDescriptionChangeContinue(addonType);
         }

      }
   });

   self.submit = function () {
      if (self.addonRow.isNewAddon) {
         var addonsForCriteria = tat.addonsCollection;
         addonsForCriteria.pop();
         var addOeAddonRequest = {
            oeaddons: addonsForCriteria,
            addoeaddoncriteria: {
               addonno: self.addonRow.addonno,
               addonamt: self.addonRow.addonamt,
               addontype: self.addonRow.addontype,
               orderno: base.oehdr.orderno,
               ordersuf: base.oehdr.ordersuf
            }
         };
         DataService.post('api/oe/asoeheader/addoeaddon', { data: addOeAddonRequest, busy: true }, function (data) {
            if (data) {
               Utils.replaceArray(tat.addonsCollection, data);
               add.rerenderData();
               add.updateTaxesAndTotals();
            }
         });
      } else {
         var changeOeAddonRequest = {
            oeaddons: self.addonRow,
            iNewAddonNo: self.addonRow.addonno,
            dNewAddonAmt: self.addonRow.addonamt,
            lNewAddonType: self.addonRow.addontype
         };
         DataService.post('api/oe/asoeheader/changeoeaddon', { data: changeOeAddonRequest, busy: true }, function (data) {
            if (data) {
               var index = tat.addonsCollection[addonRowNumber];
               if (index) {
                  tat.addonsCollection.splice(addonRowNumber, 1, data);
                  add.rerenderData();
                  add.updateTaxesAndTotals();
               }
            }
         });
      }
   };

   self.cancel = function () {
      add.grid.toggleRowDetail(addonRowNumber);
   };
});