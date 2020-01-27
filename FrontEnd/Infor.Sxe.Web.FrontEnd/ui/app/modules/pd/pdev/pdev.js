'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('pd', 'pdev', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('pd', 'pdev');
});

app.controller('PdevBaseCtrl', function ($state, DataService, Utils) {
   var self = this;

   self.criteria = { prod: '', whse: '' };
   self.updatePricecostCriteria = {};
   self.pdevUpdateCostResults = [];
   self.pdevLoadCosts = {};
   self.NO_CHANGE = 'n/a';
   self.actionParameter = '';

   self.isAutomaticallyLoadNextProduct = true;
   self.isInContinueMode = false;
   self.isAverageTypeEnabled = true;
   self.isLastTypeEnabled = true;
   self.isReplTypeEnabled = true;
   self.isStndTypeEnabled = true;
   self.isRebateTypeEnabled = true;
   self.isAverageTypePercentVisible = false;
   self.isLastTypePercentVisible = false;
   self.isReplacementTypePercentVisible = false;
   self.isStandardPercentVisible = false;
   self.isRebateTypePercentVisible = false;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'pdev',
         period: '',
         postdt: Utils.getCurrentDate(),
         proofcr: 0.0,
         proofdr: 0.0,
         system: 'pd',
         prfchk: 0.0,
         warningok: true,
         jrnlno: 0.0
      }
   };

   self.isMaster = function () {
      return $state.is('pdev.master');
   };

   self.includesMaster = function () {
      return $state.includes('pdev.master');
   };

   // Clear form
   self.clear = function () {
      self.criteria = { prod: '', whse: '' };
      self.isAverageTypePercentVisible = false;
      self.isLastTypePercentVisible = false;
      self.isReplacementTypePercentVisible = false;
      self.isStandardPercentVisible = false;
      self.isRebateTypePercentVisible = false;
      self.resetUpdateCostCriteria();
   };

   self.bindVendorPriceNextPrevResult = function () {
      var pdevGetProd = { action: self.actionParameter, currentProd: self.criteria.prod, currentWhse: self.criteria.whse, newProd: '', arpvendno: 0 };
      DataService.post('api/pd/aspdentry/pdevgetprod', { data: pdevGetProd, busy: true }, function (data) {
         if (data) {
            if (self.actionParameter !== 'Continue') {
               // Clear out product string to ensure the new product displays properly.
               self.criteria.prod = '';
               self.criteria.prod = data.newProd;
            }
         }
      });
   };

   self.bindVendorPriceContinueResult = function () {
      self.pdevUpdateCostResults = [];
      var pdevLoadCost = { prod: self.criteria.prod, whse: self.criteria.whse };
      DataService.post('api/pd/aspdentry/pdevloadcosts', { data: pdevLoadCost, busy: true }, function (data) {
         if (data) {
            Utils.replaceObject(self.pdevLoadCosts, data);
            self.enableCostFieldsByAO();
         }
      });
   };

   self.enableCostFieldsByAO = function () {
      if (self.pdevLoadCosts) {
         self.isAverageTypeEnabled = (self.updatePricecostCriteria.avgcosttyp === self.NO_CHANGE && self.pdevLoadCosts.avgcostenabledfl);
         self.isLastTypeEnabled = (self.updatePricecostCriteria.lastcosttyp === self.NO_CHANGE && self.pdevLoadCosts.lastcostenabledfl);
         self.isReplTypeEnabled = (self.updatePricecostCriteria.replcosttyp === self.NO_CHANGE && self.pdevLoadCosts.replcostenabledfl);
         self.isStndTypeEnabled = (self.updatePricecostCriteria.stndcosttyp === self.NO_CHANGE && self.pdevLoadCosts.stndcostenabledfl);
         self.isRebateTypeEnabled = (self.updatePricecostCriteria.rebatecosttyp === self.NO_CHANGE && self.pdevLoadCosts.rebatecostenabledfl);
      }
   };

   self.resetUpdateCostCriteria = function () {
      self.updatePricecostCriteria = {
         avgcosttyp: self.NO_CHANGE,
         lastcosttyp: self.NO_CHANGE,
         replcosttyp: self.NO_CHANGE,
         stndcosttyp: self.NO_CHANGE,
         rebatecosttyp: self.NO_CHANGE,
         avgcostamt: 0,
         lastcostamt: 0,
         replcostamt: 0,
         stndcostamt: 0,
         rebatecostamt: 0
      };
   };
});

app.controller('PdevSearchCtrl', function ($scope, $state, DataService, Utils, Sasoo) {
   var self = this;
   var base = $scope.base;
   base.criteria.whse = Sasoo.whse;

   // Clear form
   self.clear = function () {
      base.clear();
   };

   // Perform search
   self.submit = function () {
      base.isInContinueMode = true;
      if (!($scope.base.journal && $scope.base.journal.gJrnlno !== 0)) {
         base.journalControl.showOpenView(function () {
            base.bindVendorPriceContinueResult();
         });
      } else {
         base.bindVendorPriceContinueResult();
      }
   };

   self.next = function () {
      base.actionParameter = 'NEXT';
      base.bindVendorPriceNextPrevResult();
      base.pdevLoadCosts.costtxt = '';
   };

   self.previous = function () {
      base.actionParameter = 'PREV';
      base.bindVendorPriceNextPrevResult();
   };
});

app.controller('PdevMasterCtrl', function ($scope, $state, $translate, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.pdevUpdateCostResults = [];

   base.clear();

   self.update = function () {
      if (base.journal && base.journal.gJrnlno !== 0) {
         base.updatePricecostCriteria.jrnlno = base.journal.gJrnlno;
      }
      base.updatePricecostCriteria.prod = base.criteria.prod;
      base.updatePricecostCriteria.whse = base.criteria.whse;

      DataService.post('api/pd/aspdentry/pdevupdatecosts', { data: base.updatePricecostCriteria, busy: true }, function (data) {
         if (data) {
            base.isInContinueMode = false;
            self.enableCostFields(true);
            data.forEach(function (updateCost) {
               self.pdevUpdateCostResults.push(updateCost);
            });
            if (base.isAutomaticallyLoadNextProduct) {
               base.actionParameter = 'Next';
               base.bindVendorPriceNextPrevResult(true);
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
            base.resetUpdateCostCriteria();
            base.pdevLoadCosts = {};
         }
      });
   };

   self.checkValidationAndUpdate = function () {
      var valMsg = '';
      var NEW = 'new';
      var PI = 'pi';
      var PD = 'pd';
      var DI = 'di';
      var DD = 'dd';
      var BREAK = '<br />';

      if (base.updatePricecostCriteria.avgcosttyp !== base.NO_CHANGE && base.updatePricecostCriteria.avgcosttyp === NEW && (base.updatePricecostCriteria.avgcostamt === 0 || base.updatePricecostCriteria.avgcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.average.cost.new.price.or.cost.must.be.greater.than.0.5895') + BREAK;
      }
      if (base.updatePricecostCriteria.avgcosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.avgcosttyp === PI || base.updatePricecostCriteria.avgcosttyp === PD) && (base.updatePricecostCriteria.avgcostamt === 0 || base.updatePricecostCriteria.avgcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.average.cost.percent.based.changes.cannot.be.zer') + BREAK;
      }

      if (base.updatePricecostCriteria.lastcosttyp !== base.NO_CHANGE && base.updatePricecostCriteria.lastcosttyp === NEW && (base.updatePricecostCriteria.lastcostamt === 0 || base.updatePricecostCriteria.lastcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.last.cost.new.price.or.cost.must.be.greater.than.0.5895') + BREAK;
      }
      if (base.updatePricecostCriteria.lastcosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.lastcosttyp === PI || base.updatePricecostCriteria.avgcosttyp === PD) && (base.updatePricecostCriteria.lastcostamt === 0 || base.updatePricecostCriteria.lastcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.last.cost.percent.based.changes.cannot.be.zero.') + BREAK;
      }

      if (base.updatePricecostCriteria.replcosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.replcosttyp === NEW || base.updatePricecostCriteria.replcosttyp === DI || base.updatePricecostCriteria.replcosttyp === DD) && (base.updatePricecostCriteria.replcostamt === 0 || base.updatePricecostCriteria.replcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.replacement.cost.new.price.or.cost.must.be.greater.than.0.') + BREAK;
      }
      if (base.updatePricecostCriteria.replcosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.replcosttyp === PI || base.updatePricecostCriteria.replcosttyp === PD) && (base.updatePricecostCriteria.replcostamt === 0 || base.updatePricecostCriteria.replcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.replacement.cost.percent.based.changes.cannot.be') + BREAK;
      }

      if (base.updatePricecostCriteria.stndcosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.stndcosttyp === NEW || base.updatePricecostCriteria.stndcosttyp === DI || base.updatePricecostCriteria.stndcosttyp === DD) && (base.updatePricecostCriteria.stndcostamt === 0 || base.updatePricecostCriteria.stndcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.standard.cost.new.price.or.cost.must.be.greater.than.0.589') + BREAK;
      }
      if (base.updatePricecostCriteria.stndcosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.stndcosttyp === PI || base.updatePricecostCriteria.stndcosttyp === PD) && (base.updatePricecostCriteria.stndcostamt === 0 || base.updatePricecostCriteria.stndcostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.standard.cost.percent.based.changes.be.zero.amou') + BREAK;
      }

      if (base.updatePricecostCriteria.rebatecosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.rebatecosttyp === NEW || base.updatePricecostCriteria.rebatecosttyp === DI || base.updatePricecostCriteria.rebatecosttyp === DD) && (base.updatePricecostCriteria.rebatecostamt === 0 || base.updatePricecostCriteria.rebatecostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.rebate.cost.new.price.or.cost.must.be.greater.than.0.5895') + BREAK;
      }
      if (base.updatePricecostCriteria.rebatecosttyp !== base.NO_CHANGE && (base.updatePricecostCriteria.rebatecosttyp === PI || base.updatePricecostCriteria.rebatecosttyp === PD) && (base.updatePricecostCriteria.rebatecostamt === 0 || base.updatePricecostCriteria.rebatecostamt === undefined)) {
         valMsg = valMsg + MessageService.get('error.rebate.cost.percent.based.changes.be.zero.amount') + BREAK;
      }

      if (valMsg !== '') {
         MessageService.error('global.error', valMsg);
      } else {
         self.update();
      }
   };

   self.reset = function () {
      base.resetUpdateCostCriteria();
   };

   self.cancel = function () {
      base.isInContinueMode = false;
      base.resetUpdateCostCriteria();
      base.pdevLoadCosts = {};
      self.enableCostFields(true);
   };

   self.enableCostFields = function (isEnable) {
      base.isAverageTypeEnabled = isEnable;
      base.isLastTypeEnabled = isEnable;
      base.isReplTypeEnabled = isEnable;
      base.isStndTypeEnabled = isEnable;
      base.isRebateTypeEnabled = isEnable;
   };

   self.priceTypeChange = function (priceType) {
      var PI = 'pi';
      var PD = 'pd';

      if (base.pdevLoadCosts) {
         if (priceType === 'a') {
            base.isAverageTypeEnabled = (base.updatePricecostCriteria.avgcosttyp === base.NO_CHANGE && base.pdevLoadCosts.avgcostenabledfl);
            base.isAverageTypePercentVisible = (base.updatePricecostCriteria.avgcosttyp === PI || base.updatePricecostCriteria.avgcosttyp === PD);
         } else if (priceType === 'l') {
            base.isLastTypeEnabled = (base.updatePricecostCriteria.lastcosttyp === base.NO_CHANGE && base.pdevLoadCosts.lastcostenabledfl);
            base.isLastTypePercentVisible = (base.updatePricecostCriteria.lastcosttyp === PI || base.updatePricecostCriteria.lastcosttyp === PD);
         } else if (priceType === 'r') {
            base.isReplTypeEnabled = (base.updatePricecostCriteria.replcosttyp === base.NO_CHANGE && base.pdevLoadCosts.replcostenabledfl);
            base.isReplacementTypePercentVisible = (base.updatePricecostCriteria.replcosttyp === PI || base.updatePricecostCriteria.replcosttyp === PD);
         } else if (priceType === 's') {
            base.isStndTypeEnabled = (base.updatePricecostCriteria.stndcosttyp === base.NO_CHANGE && base.pdevLoadCosts.stndcostenabledfl);
            base.isStandardPercentVisible = (base.updatePricecostCriteria.stndcosttyp === PI || base.updatePricecostCriteria.stndcosttyp === PD);
         } else if (priceType === 'b') {
            base.isRebateTypeEnabled = (base.updatePricecostCriteria.rebatecosttyp === self.NO_CHANGE && base.pdevLoadCosts.rebatecostenabledfl);
            base.isRebateTypePercentVisible = (base.updatePricecostCriteria.rebatecosttyp === PI || base.updatePricecostCriteria.rebatecosttyp === PD);
         }
      }
   };

   self.typeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toLowerCase()) {
            case 'n/a':
               return $translate.instant('global.no.change');
            case 'new':
               return $translate.instant('global.new.cost');
            case 'di':
               return $translate.instant('symbol.dollar.change.increase');
            case 'dd':
               return $translate.instant('symbol.dollar.change.decrease');
            case 'pi':
               return $translate.instant('symbol.percent.change.increase');
            case 'pd':
               return $translate.instant('symbol.percent.change.decrease');
            default:
               return value;
         }
      } else {
         return value;
      }
   };
});

