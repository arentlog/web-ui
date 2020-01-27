'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('pd', 'pdec', {
      widgets: ['SEARCH', 'JOURNAL']
   });
   StateProvider.addMasterState('pd', 'pdec');
});

app.controller('PdecBaseCtrl', function ($state, DataService, Utils, MessageService) {
   var self = this;

   self.getProdCriteria = {};
   self.getPricecostCriteria = { prod: '', whse: '' };
   self.updatePricecostCriteria = {};

   self.isAutomaticallyLoadNextProduct = true;
   self.isContinueClicked = false;
   self.isInContinueMode = false;
   self.arePricingFieldsReadOnly = true;
   self.isBaseTypeEnabled = true;
   self.isListTypeEnabled = true;
   self.isReplTypeEnabled = true;
   self.isStndTypeEnabled = true;

   // Journal options
   self.journalOptions = {
      controlRef: 'base.journalControl',
      journalRef: 'base.journal',
      criteria: {
         currproc: 'pdec',
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
      return $state.is('pdec.master');
   };

   self.includesMaster = function () {
      return $state.includes('pdec.master');
   };

   // Clear form
   self.clear = function () {
      self.getProdCriteria = {
         vendno: 0,
         whse: '',
         prod: '',
         action: ''
      };

      self.updatePricecostCriteria = {
         prod: '',
         whse: '',
         effectdt: Utils.getCurrentDate(),
         basetype: '',
         listtype: '',
         repltype: '',
         stndtype: '',
         ptarget: '0',
         pround: '',
         baseprice: 0,
         listprice: 0,
         replcost: 0,
         stndcost: 0
      };
   };

   self.warehouseSelected = function () {
      self.getPricecostCriteria.whse = self.getProdCriteria.whse;
   };

   self.productSelected = function () {
      self.getPricecostCriteria.prod = self.getProdCriteria.prod;
   };

   self.next = function () {
      self.getProdCriteria.action = 'NEXT';
      self.getProduct();
   };

   self.previous = function () {
      self.getProdCriteria.action = 'PREV';
      self.getProduct();
   };

   self.getProduct = function () {
      DataService.post('api/pd/aspdentry/pdecgetproduct', { data: self.getProdCriteria, busy: true }, function (data) {
         if (data && data.length) {
            var pdecGetProductResult = data[0];
            if (pdecGetProductResult) {
               self.getProdCriteria.prod = '';
               self.getProdCriteria.prod = pdecGetProductResult.prod;
               self.getPricecostCriteria.prod = self.getProdCriteria.prod;
               if (self.isContinueClicked) {
                  self.getPriceCost();
               }
            } else {
               self.getProdCriteria.prod = '';
               self.getPricecostCriteria.prod = self.getProdCriteria.prod;
               MessageService.info('global.information', 'message.no.records.were.found');
            }
            self.updatePricecostCriteria.pricetxt = '';
            self.isContinueClicked = false;
         }
      });
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.isContinueClicked = true;
      self.isInContinueMode = true;
      if (self.getProdCriteria.vendno && self.getProdCriteria.whse) {
         self.getProdCriteria.action = '';
         self.getProduct();
      } else if (self.getProdCriteria.prod) {
         self.getPriceCost();
      }

      self.setPricingFieldsFlag();
      self.priceTypeChange('b');
      self.priceTypeChange('l');
      self.priceTypeChange('r');
      self.priceTypeChange('s');
   };

   self.getPriceCost = function () {
      self.isContinueClicked = false;
      DataService.post('api/pd/aspdentry/pdecgetpricecost', { data: self.getPricecostCriteria, busy: true }, function (data) {
         if (data) {
            self.bindPdecUpdatePriceCostCriteria(data);
         }
      });
   };

   self.bindPdecUpdatePriceCostCriteria = function (pdecGetPriceCostResult) {
      var previousRecord = self.updatePricecostCriteria;
      self.updatePricecostCriteria = {
         prod: pdecGetPriceCostResult.prod,
         notesfl: pdecGetPriceCostResult.notesfl,
         descrip1: pdecGetPriceCostResult.descrip1,
         descrip2: pdecGetPriceCostResult.descrip2,
         whse: pdecGetPriceCostResult.whse,
         homewhsefl: pdecGetPriceCostResult.homewhsefl,
         homewhse: pdecGetPriceCostResult.homewhse,
         pricetxt: pdecGetPriceCostResult.pricetxt,
         effectdt: pdecGetPriceCostResult.effectdt === null ? Utils.getCurrentDate() : pdecGetPriceCostResult.effectdt,
         basetypedesc: pdecGetPriceCostResult.basetypedesc,
         baseprice: previousRecord.baseprice,
         basepricenew: pdecGetPriceCostResult.basepricenew,
         basepriceorig: pdecGetPriceCostResult.basepriceorig,
         basedt: pdecGetPriceCostResult.basedt,
         listtypedesc: pdecGetPriceCostResult.listtypedesc,
         listprice: previousRecord.listprice,
         listpricenew: pdecGetPriceCostResult.listpricenew,
         listpriceorig: pdecGetPriceCostResult.listpriceorig,
         listdt: pdecGetPriceCostResult.listdt,
         repltypedesc: pdecGetPriceCostResult.repltypedesc,
         replcost: previousRecord.replcost,
         replcostnew: pdecGetPriceCostResult.replcostnew,
         replcostorig: pdecGetPriceCostResult.replcostorig,
         repldt: pdecGetPriceCostResult.repldt,
         stndtypedesc: pdecGetPriceCostResult.stndtypedesc,
         stndcost: previousRecord.stndcost,
         stndcostnew: pdecGetPriceCostResult.stndcostnew,
         stndcostorig: pdecGetPriceCostResult.stndcostorig,
         stnddt: pdecGetPriceCostResult.stnddt,
         lastcost: pdecGetPriceCostResult.lastcost,
         th1: pdecGetPriceCostResult.th1,
         th2: pdecGetPriceCostResult.th2,
         th3: pdecGetPriceCostResult.th3,
         pround: pdecGetPriceCostResult.pround,
         prounddesc: pdecGetPriceCostResult.prounddesc,
         ptarget: pdecGetPriceCostResult.ptarget,
         ptargetdesc: pdecGetPriceCostResult.ptargetdesc,
         pexactrnd: pdecGetPriceCostResult.pexactrnd,
         pricetype: pdecGetPriceCostResult.pricetype,
         newdt: pdecGetPriceCostResult.newdt,
         icglcost: pdecGetPriceCostResult.icglcost,
         icglbsty: pdecGetPriceCostResult.icglbsty,
         updglty: pdecGetPriceCostResult.updglty,
         calcord1: pdecGetPriceCostResult.calcord1,
         calcord2: pdecGetPriceCostResult.calcord2,
         calcord3: pdecGetPriceCostResult.calcord3,
         msgtxt1: pdecGetPriceCostResult.msgtxt1,
         msgtxt2: pdecGetPriceCostResult.msgtxt2,
         msgtxt3: pdecGetPriceCostResult.msgtxt3,
         msgtxt4: pdecGetPriceCostResult.msgtxt4,
         ourproc: pdecGetPriceCostResult.ourproc,
         callproc: pdecGetPriceCostResult.callproc,
         secure: pdecGetPriceCostResult.secure,
         gldivfl: pdecGetPriceCostResult.gldivfl,
         divno: pdecGetPriceCostResult.divno,
         icincaddsm: pdecGetPriceCostResult.icincaddsm,
         icincaddgl: pdecGetPriceCostResult.icincaddgl,
         icscupdt: previousRecord.icscupdt
      };
      self.updatePricecostCriteria.basetype = previousRecord.basetype;
      self.updatePricecostCriteria.listtype = previousRecord.listtype;
      self.updatePricecostCriteria.repltype = previousRecord.repltype;
      self.updatePricecostCriteria.stndtype = previousRecord.stndtype;
   };

   self.setPricingFieldsFlag = function () {
      self.arePricingFieldsReadOnly = !self.isInContinueMode ? self.isInContinueMode : (self.updatePricecostCriteria.basetype === '' && self.updatePricecostCriteria.listtype === '');
   };

   self.priceTypeChange = function (priceType) {
      if (priceType === 'b') {
         self.isBaseTypeEnabled = (self.updatePricecostCriteria.basetype === '');
         self.setPricingFieldsFlag();
      } else if (priceType === 'l') {
         self.isListTypeEnabled = (self.updatePricecostCriteria.listtype === '');
         self.setPricingFieldsFlag();
      } else if (priceType === 'r') {
         self.isReplTypeEnabled = (self.updatePricecostCriteria.repltype === '');
      } else {
         self.isStndTypeEnabled = (self.updatePricecostCriteria.stndtype === '');
      }
   };
});

app.controller('PdecSearchCtrl', function ($scope, $state, DataService, Utils, Sasoo) {
   var self = this;
   var base = $scope.base;
   base.getProdCriteria.whse = Sasoo.whse;
   base.getPricecostCriteria.whse = base.getProdCriteria.whse;
   // Clear form
   self.clear = function () {
      base.clear();
   };

   // Perform search
   self.submit = function () {
      base.search();
   };
});

app.controller('PdecMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.pdecUpdatePriceCostResults = [];

   base.clear();

   self.enablePriceFields = function (isEnable) {
      base.isBaseTypeEnabled = isEnable;
      base.isListTypeEnabled = isEnable;
      base.isReplTypeEnabled = isEnable;
      base.isStndTypeEnabled = isEnable;
   };

   self.update = function () {
      if (base.journal && base.journal.gJrnlno !== 0) {
         base.updatePricecostCriteria.jrnlno = base.journal.gJrnlno;
      }
      DataService.post('api/pd/aspdentry/pdecupdatepricecost', { data: base.updatePricecostCriteria, busy: true }, function (data) {
         if (data && data.length) {
            base.isInContinueMode = false;
            self.enablePriceFields(true);
            var cMessage = '';
            data.forEach(function (item) {
               if (item.cMessage) {
                  cMessage = cMessage + item.cMessage + '<br />';
               }
               self.pdecUpdatePriceCostResults.push(item);
            });
            self.pdecUpdatePriceCostResults.reverse();
            if (cMessage) {
               MessageService.info('global.information', cMessage);
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            }
            if (base.isAutomaticallyLoadNextProduct) {
               base.next();
            }
         }
      });
   };

   self.reset = function () {
      base.updatePricecostCriteria.basetype = '';
      base.updatePricecostCriteria.listtype = '';
      base.updatePricecostCriteria.repltype = '';
      base.updatePricecostCriteria.stndtype = '';
      base.updatePricecostCriteria.pround = '';
      base.updatePricecostCriteria.ptarget = '';
      base.updatePricecostCriteria.pricetype = '';
      base.updatePricecostCriteria.pexactrnd = 0;
      base.updatePricecostCriteria.baseprice = 0;
      base.updatePricecostCriteria.listprice = 0;
      base.updatePricecostCriteria.replcost = 0;
      base.updatePricecostCriteria.stndcost = 0;
      base.updatePricecostCriteria.effectdt = Utils.getCurrentDate();
      base.setPricingFieldsFlag();
      self.enablePriceFields(true);
   };

   self.cancel = function () {
      base.isInContinueMode = false;
      base.updatePricecostCriteria = {
         effectdt: Utils.getCurrentDate(),
         basetype: '',
         listtype: '',
         repltype: '',
         stndtype: '',
         ptarget: '0',
         pround: ''
      };
      self.enablePriceFields(true);
   };

   self.typeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) {
            case 'N':
               return $translate.instant('global.new');
            case 'D':
               return $translate.instant('global.amount.change');
            case 'P':
               return $translate.instant('symbol.percent.change');
            case 'I':
               return $translate.instant('symbol.percent.of.list');
            case 'R':
               return $translate.instant('symbol.percent.of.replacement');
            case 'S':
               return $translate.instant('symbol.percent.of.standard');
            case 'L':
               return $translate.instant('symbol.percent.of.last');
            case 'B':
               return $translate.instant('symbol.percent.of.base');
            default:
               return value;
         }
      } else {
         return $translate.instant('global.no.change');
      }
   };

   self.roundTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value.toUpperCase()) {
            case 'U':
               return $translate.instant('global.up');
            case 'D':
               return $translate.instant('global.down');
            case 'N':
               return $translate.instant('global.nearest');
            default:
               return value;
         }
      } else {
         return $translate.instant('global.no.change');
      }
   };

   self.targetTypeFormatter = function (row, cell, value) {
      if (value) {
         switch (value) {
            case 1:
               return $translate.instant('number.100');
            case 2:
               return $translate.instant('number.10');
            case 3:
               return $translate.instant('number.1');
            case 4:
               return $translate.instant('number.0.1');
            case 5:
               return $translate.instant('number.0.01');
            case 6:
               return $translate.instant('number.0.001');
            case 7:
               return $translate.instant('number.0.0001');
            case 8:
               return $translate.instant('number.0.00001');
            case 9:
               return $translate.instant('global.user');
            default:
               return value;
         }
      } else {
         return $translate.instant('global.no.change');
      }
   };

});
