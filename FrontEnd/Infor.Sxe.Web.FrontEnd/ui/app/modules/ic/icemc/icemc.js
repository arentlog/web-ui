'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('ic', 'icemc', {
      widgets: ['JOURNAL']
   });

   StateProvider.addMasterState('ic', 'icemc');
});

app.controller('IcemcBaseCtrl', function ($state, Utils, Sasc, MessageService) {
   var self = this;
   self.IC_GL_COST_TYPE_A = "A";
   self.IC_GL_COST_TYPE_L = "L";
   self.IC_GL_COST_TYPE_S = "S";
   self.IC_GL_COST_TYPE_R = "R";

   if ((Sasc.icglcost.toUpperCase() === self.IC_GL_COST_TYPE_A || Sasc.icglcost.toUpperCase() === self.IC_GL_COST_TYPE_L)) {
      self.glAdjustedTitle = MessageService.get('message.g.l.has.been.automatically.adjusted.for');
   } else {
      self.glAdjustedTitle = MessageService.get('message.g.l.must.be.manually.adjusted.using.gl.entry.for');
   }

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'icemc',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'ic',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('icemc.master');
   };

   self.includesMaster = function () {
      return $state.includes('icemc.master');
   };
});

app.controller('IcemcMasterCtrl', function ($scope, $state, DataService, MessageService, Sasc, Utils) {
   var self = this;
   var base = $scope.base;
   self.MESSAGE_BUTTON_TYPE_YES_NO = 'Y/N';
   self.MESSAGE_BUTTON_TYPE_OK_CANCEL = 'O/C';
   self.criteria = {};
   self.inStock = 0;
   self.unit = '';
   self.costper = '';
   self.isCostperVisible = false;
   self.glAdjusted = 0;
   self.lastentry = 0;
   self.isClearTotalsEnabled = false;
   self.isUpdateMode = false;
   self.performUpdateOnClose = false;
   self.showGLWarning = true;
   self.validationList = [];
   self.messageButtonList = [];
   self.icemcupdateresults = [];

   // Clear form
   self.clear = function () {
      Utils.clearObject(self.criteria);
      self.initiateCriteria();
      self.clearTotals();
      self.inStock = 0;
      self.unit = '';
      self.costper = '';
      self.isCostperVisible = false;
      self.isClearTotalsEnabled = false;
      self.isUpdateMode = false;
      self.performUpdateOnClose = false;
   };

   self.initiateCriteria = function () {
      self.criteria.correctcost = 0;
      self.criteria.wrongcost = 0;
      self.criteria.quantity = 0;
      self.criteria.jrnlno = 0;
      self.criteria.lastcostfl = false;
      self.criteria.prod = '';
   };

   self.initiateCriteria();

   self.clearTotals = function () {
      self.glAdjusted = 0;
      self.lastentry = 0;
      self.isClearTotalsEnabled = false;
   };

   self.whseSelected = function () {
      self.getIcsw();
   };

   self.prodSelected = function () {
      if (self.criteria.prod) {
         self.getIcsw();
         self.getICLotSpecPriceLabel();
         var params = {
            prod: self.criteria.prod,
            fillmode: true,
            fldlist: 'unitstock'
         };

         DataService.get('api/ic/icsp/getbypk', { params: params }, function (data) {
            if (data) {
               self.unit = data.unitstock;
            }
         });
      }
   };

   self.getIcsw = function () {
      if (self.criteria.prod && self.criteria.whse) {
         var params = {
            prod: self.criteria.prod,
            whse: self.criteria.whse,
            fillmode: true,
            fldlist: 'qtyonhand,qtyunavail,qtyrcvd'
         };

         DataService.getResource('api/ic/icsw/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.inStock = Number(data.qtyonhand) + Number(data.qtyunavail) + Number(data.qtyrcvd);
            }
         });
      }
   };

   self.getICLotSpecPriceLabel = function () {
      self.isCostperVisible = false;
      var spcParams = {
         cProduct: self.criteria.prod
      };
      DataService.post('api/ic/asicsetup/geticlotspecpricelabel', { data: spcParams, busy: true }, function (data) {
         self.isCostperVisible = true;
         if (data) {
            self.costper = data;
         }
      });
   };

   // Submit an entry
   self.submit = function () {
      self.isUpdateMode = true;
      self.checkValidationAndUpdate();
   };

   self.checkValidationAndUpdate = function () {
      var valMsg = '';

      if (self.criteria) {
         if (self.criteria.quantity === 0 || self.criteria.quantity > self.inStock) {
            valMsg = valMsg + MessageService.get('error.quantity.must.be.less.thanequals.available.and.greater.than.0.6102') + '<br />';
         }
         if (self.criteria.wrongcost === 0 && self.criteria.correctcost === 0) {
            valMsg = valMsg + MessageService.get('error.both.costs.may.not.be.0.6101') + '<br />';
         }
      }
      if (valMsg) {
         MessageService.error('global.validation.list', valMsg);
      } else {
         self.update();
      }
   };

   self.update = function () {
      if (self.criteria && Sasc) {
         if (self.criteria.wrongcost !== 0 && self.criteria.correctcost === 0) {
            self.validationList.push(MessageService.get('question.warning.the.cost.is.0.is.this.a.free.product'));
            self.messageButtonList.push(self.MESSAGE_BUTTON_TYPE_YES_NO);
         }
         if (self.showGLWarning && (Sasc.icglcost.toUpperCase() === base.IC_GL_COST_TYPE_A || Sasc.icglcost.toUpperCase() === base.IC_GL_COST_TYPE_L)) {
            self.validationList.push(MessageService.get('message.warning.do.not.use.to.correct.po.receiving.error'));
            self.messageButtonList.push(self.MESSAGE_BUTTON_TYPE_OK_CANCEL);
         } else {
            self.showGLWarning = false;
         }
         if (Sasc.icglcost.toUpperCase() === base.IC_GL_COST_TYPE_S || Sasc.icglcost.toUpperCase() === base.IC_GL_COST_TYPE_R) {
            self.validationList.push(MessageService.get('message.warning.this.function.adjusts.avg.cost.only.pdec'));
            self.messageButtonList.push(self.MESSAGE_BUTTON_TYPE_OK_CANCEL);
         }

         if (self.validationList && self.validationList.length) {
            self.showCustomValidationMessage();
         } else {
            self.updateIcemc();
         }
      }
   };

   self.showCustomValidationMessage = function () {
      var msg = self.validationList[0];
      if (msg === MessageService.get('message.warning.this.function.adjusts.avg.cost.only.pdec')) {
         self.performUpdateOnClose = true;
      }
      var buttonType = self.messageButtonList[0];
      if (buttonType === self.MESSAGE_BUTTON_TYPE_YES_NO) {
         MessageService.yesNo('global.question', msg,
            function () {
               self.updateIcemc();
            }, function () {
               self.cancelUpdate();
            });
      } else {
         MessageService.okCancel('global.warning', msg,
            function () {
               self.updateIcemc();
            }, function () {
               self.cancelUpdate();
            });
      }
      self.validationList.splice(0, 1);
      self.messageButtonList.splice(0, 1);
   };

   self.updateIcemc = function () {
      if (self.validationList && self.validationList.length) {
         self.showCustomValidationMessage();
      } else if (self.showGLWarning && !base.journal) {
         self.showGLWarning = false;

         // Direct user to open a journal first
         base.journalControl.showOpenView(function (journal) {
            self.criteria.jrnlno = journal.gJrnlno;
            self.updateIcemc();
            self.isUpdateMode = false;
         });
      } else {
         if (Sasc.icglcost.toUpperCase() === base.IC_GL_COST_TYPE_A || Sasc.icglcost.toUpperCase() === base.IC_GL_COST_TYPE_L) {
            if (base.journal.gJrnlno !== 0) {
               self.criteria.jrnlno = base.journal.gJrnlno;
            }
         } else {
            self.criteria.jrnlno = 0;
         }
         DataService.post('api/ic/asicentry/icemcupdate', { data: self.criteria, busy: true }, function (data) {
            if (data.messaging && data.messaging.length !== 0) {
               MessageService.processMessaging(data.messaging);
            } else {
               var updatedRecord = data.icemcupdateresults;
               if (updatedRecord) {
                  self.lastentry = Number(updatedRecord.lastamt.toString().match(/^\d+(?:\.\d{0,2})?/));
                  self.glAdjusted = Number(self.glAdjusted) + Number(updatedRecord.lastamt.toString().match(/^\d+(?:\.\d{0,2})?/));
                  self.icemcupdateresults.push(updatedRecord);
                  self.icemcupdateresults.reverse();
                  self.isClearTotalsEnabled = false;
                  self.showGLWarning = true;
                  self.isClearTotalsEnabled = (self.lastentry === 0 && self.glAdjusted === 0) ? false : true;
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
               }
            }
         });
      }
   };

   self.cancelUpdate = function () {
      self.validationList = [];
      self.messageBoxButton = [];
      if (self.performUpdateOnClose === true) {
         self.updateIcemc();
      }
   };
});
