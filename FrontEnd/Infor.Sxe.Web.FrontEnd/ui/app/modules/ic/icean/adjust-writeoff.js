'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('icean.adjustWriteOff.gldistributions', {
      url: '/gl-distributions',
      params: {
         iceanMaintRetrieveSingle: null,
         iceanTransactionsResult: null,
         journalNumber: null,
         icenhRowid: null,
         okCallback: null,
         cancelCallback: null
      },
      views: {
         glDistributionView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icean/gl-distributions.json');
            },
            controller: 'IceanGLDistributionCtrl as gldc'
         }
      }
   });

   $stateProvider.state('icean.adjustWriteOff.updatewhseprod', {
      url: '/update-warehouse-product',
      params: {
         iceanMaintRetrieveSingle: null,
         iceanTransactionsResult: null,
         icenhRowid: null,
         okCallback: null,
         cancelCallback: null
      },
      views: {
         whseProdDetailsView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icean/updatewhseprod.json');
            },
            controller: 'IceanUpdateWhseProdCtrl as uwpc'
         }
      }
   });
});

app.controller('IceanAdjustWriteOffCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.OPERATION_ADJUST = 'A';
   self.OPERATION_WRITEOFF = 'W';
   self.OPERATION_MASSUPDATE = 'M';
   self.OPERATION_INVENTORY = 'I';

   self.title = '';
   self.icsw = null;
   self.binloc = '';
   self.iceanMaintRetrieveSingle = {};
   self.iceanMaintUpdateGlAcctsesList = [];
   self.currentLevels = [];

   self.iceanTransactionsCriteria = $stateParams.iceanTransactionsCriteria;
   self.journalNumber = $stateParams.journalNumber;
   self.iceanTransactionsResult = $stateParams.iceanTransactionsResult;
   self.operation = $stateParams.operation;
   self.iceanMaintUpdateOperation = $stateParams.iceanMaintUpdateOperation;
   self.iceanMaintRetrieveTransList = $stateParams.iceanMaintRetrieveTransList;
   self.iceanMaintUpdateTransList = $stateParams.iceanMaintUpdateTransList;
   self.canLoad = $stateParams.canLoad;
   self.iceanMaintRetrieveSingle = $stateParams.iceanMaintRetrieveSingle;

   if (self.operation === self.OPERATION_ADJUST) {
      self.title = MessageService.get('ic.entry.adjust.non.stock.direct.order.adjust');
   } else if (self.operation === self.OPERATION_WRITEOFF) {
      self.title = MessageService.get('ic.entry.adjust.non.stock.direct.order.write.off');
   } else {
      self.title = MessageService.get('ic.entry.adjust.non.stock.direct.order.inventory');
   }

   if (self.iceanMaintUpdateOperation === null) {
      self.iceanMaintUpdateOperation = {
         jrnlno: 0,
         operation: null,
         typecd: null,
         whse: null,
         qty: null,
         unit: null,
         total: null,
         binloc: null,
         closefl: false,
         vendno: 0,
         prodline: null,
         invprod: null,
         invprodcat: null,
         invdescrip1: null,
         invdescrip2: null,
         invextdescrip: null,
         invstatus: null,
         invvendno: 0,
         invprodline: null,
         invacquiredt: null,
         invncnr: null,
         inveccnclasscd: null,
         invupdatecost: false,
         invupdatenewlastcost: 0,
         invupdatebinloc: false,
         invcountryoforigin: null,
         invtariffcd: null,
         invaltprodgrp: null,
         restrictovrfl: null,
         restricterrmess: null
      };
   }

   self.pushCurrentLevels = function (qty, unit, amount, total) {
      if (qty || unit || amount || total) {
         self.currentLevels.push({ qty: qty, unit: unit, amount: amount, total: total });
      }
   };

   self.bindCurrentLevelsGrid = function () {
      if (self.iceanMaintRetrieveSingle) {
         self.pushCurrentLevels(self.iceanMaintRetrieveSingle.qty1, self.iceanMaintRetrieveSingle.unit1, self.iceanMaintRetrieveSingle.amount1, self.iceanMaintRetrieveSingle.total1);
         self.pushCurrentLevels(self.iceanMaintRetrieveSingle.qty2, self.iceanMaintRetrieveSingle.unit2, self.iceanMaintRetrieveSingle.amount2, self.iceanMaintRetrieveSingle.total2);
         self.pushCurrentLevels(self.iceanMaintRetrieveSingle.qty3, self.iceanMaintRetrieveSingle.unit3, self.iceanMaintRetrieveSingle.amount3, self.iceanMaintRetrieveSingle.total3);
         self.pushCurrentLevels(self.iceanMaintRetrieveSingle.qty4, self.iceanMaintRetrieveSingle.unit4, self.iceanMaintRetrieveSingle.amount4, self.iceanMaintRetrieveSingle.total4);
         self.pushCurrentLevels(self.iceanMaintRetrieveSingle.qty5, self.iceanMaintRetrieveSingle.unit5, self.iceanMaintRetrieveSingle.amount5, self.iceanMaintRetrieveSingle.total5);
      }
   };

   if (self.canLoad) {
      if (self.iceanMaintRetrieveSingle) {
         self.bindCurrentLevelsGrid();
         self.binloc = self.iceanMaintRetrieveSingle.binloc;
      }
   }

   self.isadjustWriteoff = function () {
      return $state.is('icean.adjustWriteOff');
   };

   self.submit = function () {
      switch (self.operation) {
         case self.OPERATION_WRITEOFF:
         case self.OPERATION_INVENTORY:
         case self.OPERATION_MASSUPDATE:
            self.calculateTotal(self.operation);
            break;
         default:
            self.finalUpdate();
            break;
      }
   };

   self.finalUpdate = function () {
      var iceanmaintupdateoperationList = [];
      var tempUpdateOperation = self.iceanMaintUpdateOperation;

      tempUpdateOperation.jrnlno = self.journalNumber;
      tempUpdateOperation.operation = self.operation;
      tempUpdateOperation.typecd = self.iceanTransactionsCriteria.typecode;
      tempUpdateOperation.whse = self.iceanTransactionsCriteria.whse;
      tempUpdateOperation.qty = self.iceanMaintRetrieveSingle.qty;
      tempUpdateOperation.unit = self.iceanMaintRetrieveSingle.unit;
      tempUpdateOperation.total = self.iceanMaintRetrieveSingle.total;
      tempUpdateOperation.binloc = self.iceanMaintRetrieveSingle.binloc;
      iceanmaintupdateoperationList.push(tempUpdateOperation);

      var request = { iceanmaintupdateglaccts: self.iceanMaintUpdateGlAcctsesList, iceanmaintupdateoperation: iceanmaintupdateoperationList, iceanmaintupdatetrans: self.iceanMaintUpdateTransList };
      DataService.post('api/ic/asicentry/iceanmaintenanceupdate', { data: request, busy: true }, function (messaging) {
         if (messaging && messaging.length !== 0) {
            MessageService.processMessaging(messaging);
            if (!self.isadjustWriteoff() && self.operation === self.OPERATION_WRITEOFF) {
               $state.go('^');
            } else if (self.isadjustWriteoff && MessageService.getQuestionMessages(messaging)) {
               base.search(true);
               $state.go('icean.master');
            } 
         } else {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.search(true);
            $state.go('icean.master');
         }
      });
   };

   self.calculateTotal = function (currentOperation) {
      var balstring = self.iceanMaintRetrieveSingle.balancetotal.trim();
      var balanceTotal = parseFloat(self.iceanMaintRetrieveSingle.balancetotal.trim());

      if (balstring.length === (balstring.indexOf('-') + 1)) {
         balanceTotal = balanceTotal * -1;
      }
      switch (currentOperation) {
         case self.OPERATION_WRITEOFF:
            if (self.iceanMaintRetrieveSingle.total !== 0 && (balanceTotal + self.iceanMaintRetrieveSingle.total) === 0) {
               self.handleOperation(self.OPERATION_WRITEOFF);
            } else {
               self.handleWriteOff();
            }
            break;
         case self.OPERATION_INVENTORY:
            if (self.iceanMaintRetrieveSingle.total !== 0 && (balanceTotal - self.iceanMaintRetrieveSingle.total) === 0) {
               self.handleOperation(self.OPERATION_INVENTORY);
            } else {
               self.handleInventory();
            }
            break;
         case self.OPERATION_MASSUPDATE:
            self.handleInventory();
            break;
         default:
            break;
      }
   };

   self.handleOperation = function (operation) {
      MessageService.yesNo('global.question', 'question.close.this.item',
         function () {
            // Yes processing
            self.iceanMaintUpdateOperation.closefl = true;
            if (operation === self.OPERATION_WRITEOFF) {
               self.handleWriteOff();
            } else {
               self.handleInventory();
            }
         }, function () {
            // No processing
            self.iceanMaintUpdateOperation.closefl = false;
            self.finalUpdate();
         });
   };

   self.handleWriteOff = function () {
      $state.go('.gldistributions', {
         iceanMaintRetrieveSingle: self.iceanMaintRetrieveSingle,
         iceanTransactionsResult: self.iceanTransactionsResult,
         journalNumber: self.journalNumber,
         icenhRowid: self.iceanTransactionsResult.icenhRowid,
         okCallback: 'glDistributionOkCallback',
         cancelCallback: 'glDistributionCancelCallback'
      });
   };

   self.glDistributionOkCallback = function (data) {
      self.iceanMaintUpdateGlAcctsesList = data;
      self.finalUpdate();
   };

   self.glDistributionCancelCallback = function (showAbortMsg) {
      if (showAbortMsg) {
         MessageService.info('global.information', 'global.update.aborted');
         base.search(true);
         $state.go('icean.master');
      } else {
         $state.go('icean.adjustWriteOff');
      }
   };

   self.handleInventory = function () {
      var params = {
         prod: self.iceanTransactionsResult.prod,
         whse: self.iceanTransactionsResult.whse,
         fillmode: true
      };

      DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
         if (data) {
            self.icsw = data;
            $state.go('.updatewhseprod', {
               iceanMaintRetrieveSingle: self.iceanMaintRetrieveSingle,
               iceanTransactionsResult: self.iceanTransactionsResult,
               icenhRowid: self.iceanTransactionsResult.icenhRowid,
               okCallback: 'updateWhseProdOkCallback',
               cancelCallback: 'updateWhseProdCancelCallback'
            });
         } else {
            self.finalUpdate();
         }
      });
   };

   self.updateWhseProdOkCallback = function (data) {
      self.iceanMaintUpdateOperation.invupdatecost = data.canUpdateLastCost;
      self.iceanMaintUpdateOperation.invupdatenewlastcost = data.newlastcost;
      self.updateWhseProdFinalUpdate();
   };

   self.updateWhseProdCancelCallback = function () {
      self.updateWhseProdFinalUpdate();
   };

   self.updateWhseProdFinalUpdate = function () {
      if (self.iceanMaintRetrieveSingle.enablebinloc && self.iceanMaintRetrieveSingle.binloc !== self.binloc) {
         if (self.icsw.binloc1 !== 'New Part') {
            var msg = MessageService.get('global.default.location.is') + self.icsw.binloc1 + MessageService.get('icean.update.whse.prod.default.location.to') + self.iceanMaintRetrieveSingle.binloc;
            MessageService.yesNo('global.question', msg,
               function () {
                  // Yes processing
                  self.finalUpdate();
               }, function () {
                  // No processing
                  $state.go('^');
               });
         } else {
            self.finalUpdate();
         }
      } else {
         self.finalUpdate();
      }
   };
});