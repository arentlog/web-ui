'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('pd', 'pdem', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('pd', 'pdem');

   $stateProvider.state('pdem.detail', {
      url: '/detail',
      params: { record: null },
      stricky: true,
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/detail.json');
            },
            controller: 'PdemDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('pdem.detail.edit', {
      url: '/edit',
      template: ''
   });

   $stateProvider.state('pdem.master.priceSheet', {
      url: '/price-sheet',
      params: {
         stateObject: null
      },
      views: {
         priceSheet: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('shared/price-sheet/price-sheet.json');
            },
            controller: 'PdspPriceSheetCtrl as psht'
         }
      }
   });

   $stateProvider.state('pdem.create', {
      url: '/create',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/create/create.json');
            },
            controller: 'PdemCreateCtrl as create'
         }
      }
   });

   $stateProvider.state('pdem.import', {
      url: '/import',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/import.json');
            },
            controller: 'PdemImportCtrl as imp'
         }
      }
   });

   $stateProvider.state('pdem.import.create', {
      url: '/create',
      params: { criteria: null },
      views: {
         addSet: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/import-create.json');
            },
            controller: 'PdemImportCreateCtrl as impcr'
         }
      }
   });

   $stateProvider.state('pdem.columnexport', {
      url: '/column-export',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/column-export.json');
            },
            controller: 'PdemColumnExportCtrl as colexp'
         }
      }
   });

   $stateProvider.state('pdem.coulmncalc', {
      url: '/column-calc',
      params: { viewType: null },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/columncalc.json');
            },
            controller: 'PdemColumnCalcCtrl as colcalc'
         }
      }
   });

   $stateProvider.state('pdem.update', {
      url: '/update',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/regions/final-update.json');
            },
            controller: 'PdemUpdateCtrl as updt'
         }
      }
   });

   $stateProvider.state('pdem.columndisable', {
      url: '/column-disable',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('pd/pdem/column-disable.json');
            },
            controller: 'PdemColumnDisableCtrl as coldable'
         }
      }
   });

});

app.controller('PdemBaseCtrl', function ($filter, $state, AodataService, Constants, DataService, MessageService, Sasc, Sasoo) {
   var self = this;

   self.pdemInitialLoadCriteria = {};
   self.pdemInitialLoadResults = {};
   self.isSearchEnabled = true;
   self.pdemNewSet = {};
   self.pdemHeader = {};
   self.newSetPrinterSettings = {};
   self.newSetPrinterControl = {};

   self.pdemloadpdsc1criteria = { lRefreshClick: true, cSetid: 0 };
   self.pdemloadpdsc2criteria = { lRefreshClick: true, cSetid: 0 };
   self.pdemloadpdsc3criteria = { lRefreshClick: true, cSetid: 0 };
   self.pdemloadpdsrcriteria = { lRefreshClick: true, cSetid: 0 };
   self.pdmerridpdsc1 = [];
   self.pdmerridpdsc2 = [];
   self.pdmerridpdsc3 = [];
   self.pdmerridpdsr = [];
   self.pdemloadpdsc1results = [];
   self.pdemloadpdsc2results = [];
   self.pdemloadpdsc3results = [];
   self.pdemloadpdsrresults = [];
   self.pdsc1ResultsGrid = {};
   self.pdsc2ResultsGrid = {};
   self.pdsc3ResultsGrid = {};
   self.pdsrResultsGrid = {};
   self.selectedPdsc1Records = [];
   self.selectedPdsc2Records = [];
   self.selectedPdsc3Records = [];
   self.selectedPdsrRecords = [];

   self.setname = '';

   self.pdscScreen1 = 'b-pdm-pdsc1';
   self.pdscScreen2 = 'b-pdm-pdsc2';
   self.pdscScreen3 = 'b-pdm-pdsc3';
   self.pdsrScreen = 'b-pdm-pdsr';

   self.pdemInitializePdsc1 = {};
   self.pdemInitializePdsc2 = {};
   self.pdemInitializePdsc3 = {};
   self.pdemInitializePdsr = {};

   self.isPdscScreen1Visible = false;
   self.isPdscScreen2Visible = false;
   self.isPdscScreen3Visible = false;
   self.isPdsrScreenVisible = false;

   self.MAIN = 'Main';
   self.DEFAULT = 'Default';
   self.SCHED = 'Sched';
   self.SORT = 'Sort';
   self.PROD = 'Prod';

   //Excel Import
   self.excelNewSetResultsDefault = [];
   self.defaultGrid = {};

   self.seecostfl = Sasoo.seecostfl;
   self.oepricefl = Sasoo.oepricefl;

   //Destination Codes
   self.PDSC_CUSTOMER_BY_PRODUCT = 'c1';
   self.PDSC_CUSTOMER_BY_PRODUCT_CATEGORY = 'c2c';
   self.PDSC_CUSTOMER_BY_PRODUCT_LINE = 'c2l';
   self.PDSC_CUSTOMER_BY_PRICE_TYPE = 'c2p';
   self.PDSC_CUSTOMER_BY_PRODUCT_REBATETYPE = 'c2r';
   self.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT = 'c3';
   self.PDSC_CUSTOMER_PRICE_TYPE_BY_PRODUCT_PRICE_TYPE = 'c4p';
   self.PDSC_CUSTOMER_PRICE_TYPE_BY_REBATE_TYPE = 'c4r';
   self.PDSC_CUSTOMER = 'c5';
   self.PDSC_CUSTOMER_PRICE_TYPE = 'c6';
   self.PDSC_PRODUCT = 'c7';
   self.PDSC_PRODUCT_PRICE_TYPE = 'c8';
   self.PDSR_REBATE_ON_PRODUCT = 'r1';
   self.PDSR_REBATE_ON_REBATE_TYPE = 'r2';
   self.PDSR_REBATE_ON_PRODUCT_PRICE = 'r3';
   self.PDSR_REBATE_ON_PRODUCT_LINE = 'r4';
   self.PDSR_REBATE_ON_PRODUCT_CATEGORY = 'r5';

   // Level Code Drop Down Lists
   self.levelCodePDSC = [];
   self.defaultPDSCCode = '';
   self.levelCodePDSR = [];
   self.defaultPDSRCode = '';
   self.defaultRecordType = '';

   // Column Field Drop Down Lists
   self.qtyBreakTyList = [];
   self.priceOnTyList = [];
   self.maxQtyTypeList = [];

   // New Record Import
   self.pdemExcelNewsetUpdtCInit = {};

   // Disabled Columns
   self.disabledColumnList = [];
   self.enabledColumnList = [];

   // Export Columns
   self.exportGrid = {};
   self.exportGridName = '';
   self.exportColumnList = [];

   // Pricing Settings
   self.sasc = Sasc;
   self.isPDPriceByRegion = AodataService.getValue('PD', 'pdpricebyregionfl').toUpperCase();
   self.isContractLineNoVisible = AodataService.getValue('PD', 'pDContractLineNoOptionFl');
   self.isPDRegion = false;
   if (self.isPDPriceByRegion === 'YES') {
      self.isPDRegion = true;
   }
   self.pdscRebSubTyAOData = AodataService.getValue("PD", "PDSCRebateSubType").toLowerCase() === 'yes';

   // Rebate Settings
   self.currencySymbol = Sasc.currsymbol;
   self.isPDRebateByRegion = AodataService.getValue('PD', 'pdrebatebyregionfl').toUpperCase();
   self.isRebateRegion = false;
   if (self.isPDRebateByRegion === 'YES') {
      self.isRebateRegion = true;
   }
   self.isRebateByPriceAoFl = AodataService.getValue("PD", "pDRebateByPriceOptionFl").toLowerCase() === 'yes';

   // Load the Levels allowed off AO Settings
   DataService.get('api/pd/aspdentry/pdemexcelimportnewinit/', { busy: true }, function (data) {

      if (data) {

         // Build the Drop Down data and Defaults
         data.pdemexcelimportdropdowns.forEach(function (record) {

            if (record.dropdowntype.toLowerCase() === 'price') {
               self.levelCodePDSC.push({ value: record.codeval, label: record.codedesc });
               if (!self.defaultPDSCCode) {
                  self.defaultPDSCCode = record.codeval;
                  self.defaultRecordType = 'P';
               }
            } else if (record.dropdowntype.toLowerCase() === 'rebate') {
               self.levelCodePDSR.push({ value: record.codeval, label: record.codedesc });
               if (!self.defaultPDSRCode) {
                  self.defaultPDSRCode = record.codeval;
                  if (!self.defaultRecordType) {
                     self.defaultRecordType = 'R';
                  }
               }
            }
         });
      }
   });

   // Load Customer Base Drop Down Column Values
   if (self.defaultRecordType = 'P') {

      // Qty Break Type - D, P or Blank - qtybreakty
      self.qtyBreakTyList.push({ key: 'D', value: MessageService.get('global.discount') });
      self.qtyBreakTyList.push({ key: 'P', value: MessageService.get('global.price') });

      // Max Qty Type - C, P, S, W - maxqtytype
      self.maxQtyTypeList.push({ key: 'C', value: MessageService.get('global.cube') });
      self.maxQtyTypeList.push({ key: 'P', value: MessageService.get('global.spc.unit') });
      self.maxQtyTypeList.push({ key: 'S', value: MessageService.get('global.stocking.unit') });
      self.maxQtyTypeList.push({ key: 'W', value: MessageService.get('global.weight') });

      // Basis - priceonty
      self.priceOnTyList.push({ key: 'B', value: MessageService.get('global.base.price') });
      self.priceOnTyList.push({ key: 'L', value: MessageService.get('global.list.price') });
      self.priceOnTyList.push({ key: 'C', value: MessageService.get('global.cost') });
      self.priceOnTyList.push({ key: 'M', value: MessageService.get('global.margin') });
      self.priceOnTyList.push({ key: 'RM', value: MessageService.get('global.rebated.margin') });
      self.priceOnTyList.push({ key: 'RC', value: MessageService.get('global.rebated.cost') });
      self.priceOnTyList.push({ key: 'CB', value: MessageService.get('global.rebate.cost') });
      self.priceOnTyList.push({ key: 'CR', value: MessageService.get('global.replacement.cost') });
      self.priceOnTyList.push({ key: 'CS', value: MessageService.get('global.standard.cost') });
      self.priceOnTyList.push({ key: 'MR', value: MessageService.get('global.margin.with.repl.cost') });
      self.priceOnTyList.push({ key: 'MS', value: MessageService.get('global.margin.with.std.cost') });
      self.priceOnTyList.push({ key: 'C1', value: MessageService.get('global.customer.sheet.column.1') });
      self.priceOnTyList.push({ key: 'C2', value: MessageService.get('global.customer.sheet.column.2') });
      self.priceOnTyList.push({ key: 'C3', value: MessageService.get('global.customer.sheet.column.3') });
      self.priceOnTyList.push({ key: 'C4', value: MessageService.get('global.customer.sheet.column.4') });
      self.priceOnTyList.push({ key: 'C5', value: MessageService.get('global.customer.sheet.column.5') });
      self.priceOnTyList.push({ key: 'C6', value: MessageService.get('global.customer.sheet.column.6') });
      self.priceOnTyList.push({ key: 'C7', value: MessageService.get('global.customer.sheet.column.7') });
      self.priceOnTyList.push({ key: 'C8', value: MessageService.get('global.customer.sheet.column.8') });
      self.priceOnTyList.push({ key: 'C9', value: MessageService.get('global.customer.sheet.column.9') });
      self.priceOnTyList.push({ key: 'V1', value: MessageService.get('global.vendor.sheet.column.1') });
      self.priceOnTyList.push({ key: 'V2', value: MessageService.get('global.vendor.sheet.column.2') });
      self.priceOnTyList.push({ key: 'V3', value: MessageService.get('global.vendor.sheet.column.3') });
      self.priceOnTyList.push({ key: 'V4', value: MessageService.get('global.vendor.sheet.column.4') });
      self.priceOnTyList.push({ key: 'V5', value: MessageService.get('global.vendor.sheet.column.5') });
      self.priceOnTyList.push({ key: 'V6', value: MessageService.get('global.vendor.sheet.column.6') });
      self.priceOnTyList.push({ key: 'V7', value: MessageService.get('global.vendor.sheet.column.7') });
      self.priceOnTyList.push({ key: 'V8', value: MessageService.get('global.vendor.sheet.column.8') });
      self.priceOnTyList.push({ key: 'V9', value: MessageService.get('global.vendor.sheet.column.9') });
   }

   self.isMaster = function () {
      return $state.is('pdem.master');
   };

   self.includesMaster = function () {
      return $state.includes('pdem.master');
   };

   self.isDetail = function () {
      return $state.is('pdem.detail');
   };

   self.includesDetail = function () {
      return $state.includes('pdem.detail');
   };

   self.isImport = function () {
      return $state.is('pdem.import');
   };

   self.includesImport = function () {
      return $state.includes('pdem.import');
   };

   self.isImportCreate = function () {
      return $state.is('pdem.import.create');
   };

   self.includesImportCreate = function () {
      return $state.includes('pdem.import.create');
   };

   self.initializePdemNewSet = function (pvType) {

      var dropDownType = self.pdemNewSet.dropdowntype;

      var newSetInitializeRequest = {
         pdemnewset: self.pdemNewSet,
         pvType: pvType
      };

      DataService.post('api/pd/aspdentry/pdemnewsetinitialize', { data: newSetInitializeRequest, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               self.pdemNewSet = data.pdemnewset;
               self.pdemNewSet.dropdowntype = dropDownType;
            }
         }
      });
   };

   self.isStep1 = function () {
      return $state.is('pdem.step1');
   };

   self.includesStep1 = function () {
      return $state.includes('pdem.step1');
   };

   self.isStep2 = function () {
      return $state.is('pdem.step2');
   };

   self.includesStep2 = function () {
      return $state.includes('pdem.step2');
   };

   self.isStep3 = function () {
      return $state.is('pdem.step3');
   };

   self.includesStep3 = function () {
      return $state.includes('pdem.step3');
   };

   self.isStep4 = function () {
      return $state.is('pdem.step4');
   };

   self.includesStep4 = function () {
      return $state.includes('pdem.step4');
   };

   self.isStep5 = function () {
      return $state.is('pdem.step5');
   };

   self.includesStep5 = function () {
      return $state.includes('pdem.step5');
   };

   self.isStep6 = function () {
      return $state.is('pdem.step6');
   };

   self.includesStep6 = function () {
      return $state.includes('pdem.step6');
   };

   self.continue = function () {
      var params = {
         cono: Sasc.cono,
         setID: self.pdemInitialLoadCriteria.cSetid
      };

      if (self.pdemInitialLoadCriteria.cSetid) {

         self.pdemInitialLoadCriteria.cDeletefl = '';
         self.pdemInitialLoadCriteria.cCancelfl = '';

         DataService.get('api/pv/pvpdmhdr/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.pdemHeader = data;
               if (data.pricerebfl && data.rebateCd.toLowerCase() === 's' && (data.source.toLowerCase() === 'r1' || data.source.toLowerCase() === 'r3')) {
                  self.priceRebFl = true;
               } else {
                  self.priceRebFl = false;
               }

               switch (self.pdemHeader.stagecd) {
                  case 2:                                                                                                     //ignore jslint - correct indentation
                     MessageService.error('global.error', 'message.an.extract.is.currently.in.process.on.this.set');          //ignore jslint - correct indentation
                     break;                                                                                                   //ignore jslint - correct indentation
                  case 5:                                                                                                     //ignore jslint - correct indentation
                     MessageService.error('global.error', 'message.an.update.is.currently.in.process.on.this.set');           //ignore jslint - correct indentation
                     break;                                                                                                   //ignore jslint - correct indentation
                  case 7:                                                                                                     //ignore jslint - correct indentation
                     MessageService.error('global.error', 'message.a.delete.is.currently.in.process.on.this.set');            //ignore jslint - correct indentation
                     break;                                                                                                   //ignore jslint - correct indentation
                  case 1:                                                                                                     //ignore jslint - correct indentation
                     self.pdemInitialLoadCriteria.cDeletefl = 'no';                                                           //ignore jslint - correct indentation
                     MessageService.yesNo('global.question', 'question.an.extract.is.currently.scheduled.on.this.set.do.', function () {  //ignore jslint - correct indentation
                        self.pdemInitialLoadCriteria.cDeletefl = 'yes';                                                       //ignore jslint - correct indentation
                        self.pdemInitialLoadEvent(false);                                                                     //ignore jslint - correct indentation
                     });                                                                                                      //ignore jslint - correct indentation
                     break;                                                                                                   //ignore jslint - correct indentation
                  case 4:                                                                                                     //ignore jslint - correct indentation
                     self.pdemInitialLoadCriteria.cCancelfl = 'no';                                                           //ignore jslint - correct indentation
                     MessageService.yesNo('global.question', 'question.an.update.is.currently.scheduled.on.this.set.do.y', function () {  //ignore jslint - correct indentation
                        self.pdemInitialLoadCriteria.cCancelfl = 'yes';                                                       //ignore jslint - correct indentation
                        self.pdemInitialLoadEvent(false);                                                                     //ignore jslint - correct indentation
                     });                                                                                                      //ignore jslint - correct indentation
                     break;                                                                                                   //ignore jslint - correct indentation
                  case 6:                                                                                                     //ignore jslint - correct indentation
                     self.pdemInitialLoadCriteria.cCancelfl = 'no';                                                           //ignore jslint - correct indentation
                     MessageService.yesNo('global.question', 'question.a.delete.is.currently.scheduled.on.this.set.do.you', function () {  //ignore jslint - correct indentation
                        self.pdemInitialLoadCriteria.cCancelfl = 'yes';                                                       //ignore jslint - correct indentation
                        self.pdemInitialLoadEvent(false);                                                                     //ignore jslint - correct indentation
                     });                                                                                                      //ignore jslint - correct indentation
                     break;                                                                                                   //ignore jslint - correct indentation
                  default:                                                                                                    //ignore jslint - correct indentation
                     self.pdemInitialLoadEvent(false);                                                                        //ignore jslint - correct indentation
                     break;                                                                                                   //ignore jslint - correct indentation
               }
            }
            else {
               var errorMsg = MessageService.get('global.pricing.set') + ' ' + self.pdemInitialLoadCriteria.cSetid + ' ' +
                              MessageService.get('message.does.not.exist.or.has.not.been.created');

               MessageService.error('global.error', errorMsg);
            }
         });
      }
   };

   self.pdemLoadColumnList = function (columnType) {

      // Reset the Disabled Column List with each New SetID
      self.disabledColumnList = [];
      self.enabledColumnList = [];

      if (columnType === 'pdsc') {
         self.enabledColumnList = [
            { label: MessageService.get('global.update'), value: 'updttype' },
            { label: MessageService.get('global.allow.with.rebate'), value: 'modifierrebfl' },
            { label: MessageService.get('global.basis'), value: 'priceonty' },
            { label: MessageService.get('global.contract.number'), value: 'contractno' },
            { label: MessageService.get('global.end.date'), value: 'enddt' },
            { label: MessageService.get('global.price.sheet.name'), value: 'pricesheet' },
            { label: MessageService.get('global.price.sheet.dt'), value: 'priceeffectivedate' },
            { label: MessageService.get('global.price.type'), value: 'prctype' },
            { label: MessageService.get('global.reference'), value: 'refer' },
            { label: MessageService.get('global.status'), value: 'statustype' },
            { label: MessageService.get('global.quantity.break.on'), value: 'qtybreakty' },
            { label: MessageService.get('global.modifier.name'), value: 'modifiernm' },
            { label: MessageService.get('global.price.1'), value: 'prcmult1' },
            { label: MessageService.get('global.price.2'), value: 'prcmult2' },
            { label: MessageService.get('global.price.3'), value: 'prcmult3' },
            { label: MessageService.get('global.price.4'), value: 'prcmult4' },
            { label: MessageService.get('global.price.5'), value: 'prcmult5' },
            { label: MessageService.get('global.price.6'), value: 'prcmult6' },
            { label: MessageService.get('global.price.7'), value: 'prcmult7' },
            { label: MessageService.get('global.price.8'), value: 'prcmult8' },
            { label: MessageService.get('global.price.9'), value: 'prcmult9' },
            { label: MessageService.get('global.quantity.1'), value: 'qtybrk1' },
            { label: MessageService.get('global.quantity.2'), value: 'qtybrk2' },
            { label: MessageService.get('global.quantity.3'), value: 'qtybrk3' },
            { label: MessageService.get('global.quantity.4'), value: 'qtybrk4' },
            { label: MessageService.get('global.quantity.5'), value: 'qtybrk5' },
            { label: MessageService.get('global.quantity.6'), value: 'qtybrk6' },
            { label: MessageService.get('global.quantity.7'), value: 'qtybrk7' },
            { label: MessageService.get('global.quantity.8'), value: 'qtybrk8' },
            { label: MessageService.get('global.discount.1'), value: 'prcdisc1' },
            { label: MessageService.get('global.discount.2'), value: 'prcdisc2' },
            { label: MessageService.get('global.discount.3'), value: 'prcdisc3' },
            { label: MessageService.get('global.discount.4'), value: 'prcdisc4' },
            { label: MessageService.get('global.discount.5'), value: 'prcdisc5' },
            { label: MessageService.get('global.discount.6'), value: 'prcdisc6' },
            { label: MessageService.get('global.discount.7'), value: 'prcdisc7' },
            { label: MessageService.get('global.discount.8'), value: 'prcdisc8' },
            { label: MessageService.get('global.discount.9'), value: 'prcdisc9' },
            { label: MessageService.get('global.hard.system.price'), value: 'hardpricefl' },
            { label: MessageService.get('global.hard.maximum'), value: 'hardmaxqtyfl' },
            { label: MessageService.get('global.based.on'), value: 'maxqtytype' },
            { label: MessageService.get('global.override.tolerance.up'), value: 'ovrridepctup' },
            { label: MessageService.get('global.override.tolerance.down'), value: 'ovrridepctdown' }
         ];
      }

      if (columnType === 'pdsr') {
         self.enabledColumnList = [
            { label: MessageService.get('global.update'), value: 'updttype' },
            { label: MessageService.get('global.end.date'), value: 'enddt' },
            { label: MessageService.get('global.contract.number'), value: 'contractno' },
            { label: MessageService.get('global.margin.basis'), value: 'margincostty' },
            { label: MessageService.get('global.price.sheet.name'), value: 'pricesheet' },
            { label: MessageService.get('global.price.sheet.dt'), value: 'priceeffectivedate' },
            { label: MessageService.get('global.price.sheet.name.to'), value: 'pricesheetto' },
            { label: MessageService.get('global.price.sheet.dt.to'), value: 'priceeffectivedateto' },
            { label: MessageService.get('global.rebate.amount'), value: 'rebateamt' },
            { label: MessageService.get('global.rebate.calculation.type'), value: 'rebcalcty' },
            { label: MessageService.get('global.rebate.down.to.basis'), value: 'rebdowntoty' },
            { label: MessageService.get('global.rebate.from.basis'), value: 'rebatecostty' },
            { label: MessageService.get('global.rebate.percent'), value: 'rebatepct' },
            { label: MessageService.get('global.reference'), value: 'refer' },
            { label: MessageService.get('global.share.rebate'), value: 'sharefl' },
            { label: MessageService.get('global.share.rebate.percent'), value: 'sharepct' },
            { label: MessageService.get('global.cap.sell.amount'), value: 'capsellamount' },
            { label: MessageService.get('global.cap.sell.type'), value: 'capselltypefl' },
            { label: MessageService.get('global.manual.rebate'), value: 'manualfl' },
            { label: MessageService.get('global.contract.line.number'), value: 'contractlineno' },
            { label: MessageService.get('global.contract.cost'), value: 'contractcostfl' }
         ];
      }

      // Sort by Column Label
      self.disabledColumnList = $filter('orderBy')(self.disabledColumnList, 'label');
      self.enabledColumnList = $filter('orderBy')(self.enabledColumnList, 'label');
      self.origEnabledColumnList = angular.copy(self.enabledColumnList);
   };

   self.pdemInDisabledColumnList = function (fieldName) {

      if (self.disabledColumnList.length) {
         for (var i = 0; i < self.disabledColumnList.length; i++) {
            var record = self.disabledColumnList[i];
            if (record.value === fieldName) {
               return true;
            }
         }
         return false;
      } else {
         return false;
      }
   };

   self.pdemInitialLoadEvent = function (isSetNameEvent) {

      DataService.post('api/pd/aspdentry/pdeminitialload', { data: self.pdemInitialLoadCriteria, busy: true }, function (data) {
         if (data) {

            // If the 'Continue' button is returned as 'true' then the Set ID was deleted - do not load the Grid Data (reset Search screen)
            if (data.btnContinueSensitive) {
               self.detailClose();
            } else if (!data.btnContinueSensitive) {

               self.pdemInitialLoadResults = data;

               if (self.pdemInitialLoadResults.cGridViewName) {
                  switch (self.pdemInitialLoadResults.cGridViewName) {
                     case self.pdscScreen1:                                                                                                                 //ignore jslint - correct indentation
                        DataService.get('api/pd/aspdentry/pdeminitializepdsc1/' + self.pdemInitialLoadCriteria.cSetid, { busy: true }, function (data) {    //ignore jslint - correct indentation
                           if (data) {
                              self.pdemInitializePdsc1 = data;
                              self.pdemInitializePdsc1.lblCustNoScreenValue = self.pdemInitializePdsc1.lblCustNoScreenValue.slice(0, -1);
                              self.pdemInitializePdsc1.lblProdScreenValue = self.pdemInitializePdsc1.lblProdScreenValue.slice(0, -1);
                              self.pdemInitializePdsc1.lblShipToScreenValue = self.pdemInitializePdsc1.lblShipToScreenValue.slice(0, -1);
                              self.isSearchEnabled = false;
                              self.setScreensVisibility(true, false, false, false);
                              self.pdemLoadColumnList('pdsc');

                              self.loadPdsc1ScreenData();
                           }
                        });
                        break;                                                                                                                              //ignore jslint - correct indentation
                     case self.pdscScreen2:                                                                                                                 //ignore jslint - correct indentation
                        DataService.get('api/pd/aspdentry/pdeminitializepdsc2/' + self.pdemInitialLoadCriteria.cSetid, { busy: true }, function (data) {    //ignore jslint - correct indentation
                           if (data) {
                              self.pdemInitializePdsc2 = data;
                              self.pdemInitializePdsc2.lblCustNoScreenValue = self.pdemInitializePdsc2.lblCustNoScreenValue.slice(0, -1);
                              self.pdemInitializePdsc2.lblShipToScreenValue = self.pdemInitializePdsc2.lblShipToScreenValue.slice(0, -1);
                              self.pdemInitializePdsc2.lblVendNoScreenValue = self.pdemInitializePdsc2.lblVendNoScreenValue.slice(0, -1);
                              self.isSearchEnabled = false;
                              self.setScreensVisibility(false, true, false, false);
                              self.pdemLoadColumnList('pdsc');

                              self.loadPdsc2ScreenData();
                           }
                        });
                        break;                                                                                                                              //ignore jslint - correct indentation
                     case self.pdscScreen3:                                                                                                                 //ignore jslint - correct indentation
                        DataService.get('api/pd/aspdentry/pdeminitializepdsc3/' + self.pdemInitialLoadCriteria.cSetid, { busy: true }, function (data) {    //ignore jslint - correct indentation
                           if (data) {
                              self.pdemInitializePdsc3 = data;
                              self.pdemInitializePdsc3.lblProdScreenValue = self.pdemInitializePdsc3.lblProdScreenValue.slice(0, -1);
                              self.isSearchEnabled = false;
                              self.setScreensVisibility(false, false, true, false);
                              self.pdemLoadColumnList('pdsc');

                              self.loadPdsc3ScreenData();
                           }
                        });
                        break;                                                                                                                              //ignore jslint - correct indentation
                     case self.pdsrScreen:                                                                                                                  //ignore jslint - correct indentation
                        DataService.get('api/pd/aspdentry/pdeminitializepdsr/' + self.pdemInitialLoadCriteria.cSetid, { busy: true }, function (data) {     //ignore jslint - correct indentation
                           if (data) {
                              self.pdemInitializePdsr = data;
                              self.pdemInitializePdsr.lblCustNoScreenValue = self.pdemInitializePdsr.lblCustNoScreenValue.slice(0, -1);
                              self.pdemInitializePdsr.lblShipToScreenValue = self.pdemInitializePdsr.lblShipToScreenValue.slice(0, -1);
                              self.pdemInitializePdsr.lblProdScreenValue = self.pdemInitializePdsr.lblProdScreenValue.slice(0, -1);
                              self.pdemInitializePdsr.lblVendNoScreenValue = self.pdemInitializePdsr.lblVendNoScreenValue.slice(0, -1);
                              self.isSearchEnabled = false;
                              self.setScreensVisibility(false, false, false, true);
                              self.pdemLoadColumnList('pdsr');

                              self.loadPdsrScreenData();
                           }
                        });
                        break;                                                         //ignore jslint - correct indentation
                     default:                                                          //ignore jslint - correct indentation
                        self.setScreensVisibility(false, false, false, false);         //ignore jslint - correct indentation
                        break;                                                         //ignore jslint - correct indentation
                  }
               }
            } 
         }
      });
   };

   self.loadPdsc1ScreenData = function (callMode) {

      if (!callMode) {
         // If Called from Main Search Criteria (callMode = "") load SetID only.
         self.pdmerridpdsc1 = [];
         self.pdemloadpdsc1criteria = {
            lRefreshClick: true,
            cSetid: self.pdemInitialLoadCriteria.cSetid
         };
      } else if (callMode === 'ADV') {
         // If Call from Criteria Search (callMode = "ADV") then leave criteria as is off Search Fields
         self.pdmerridpdsc1 = [];
         if (self.pdemloadpdsc1criteria.cWhse && self.pdemloadpdsc1criteria.cRegion) {
            MessageService.alert('global.warning', "message.the.entry.will.allow.either.a.whse.or.a.price.regi");
            return;
         }

         self.pdemloadpdsc1criteria.lRefreshClick = true;
      } else {
         // If Call from Detail Update Validation (callMode = "UPDT") use the Error File produced from the Validate call
         self.pdemloadpdsc1criteria.lRefreshClick = false;
      }

      //User Hook (do not rename)
      if (self.setPdemPdsc1Criteria) {
         self.setPdemPdsc1Criteria();
      }

      DataService.post('api/pd/aspdentry/pdemloadpdsc1', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: { pdmerridpdsc1: self.pdmerridpdsc1, pdemloadpdsc1criteria: self.pdemloadpdsc1criteria }, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.processMessaging(data.messaging);
            } else {
               self.pdemloadpdsc1results = data.pdemloadpdsc1results;
            }

            //User Hook (do not rename)
            if (self.pdemLoadPdsc1Continue) {
               self.pdemLoadPdsc1Continue(data);
            }
         }
      });
   };

   self.loadPdsc2ScreenData = function (callMode) {

      if (!callMode) {
         // If Called from Main Search Criteria (callMode = "") load SetID only.
         self.pdmerridpdsc2 = [];
         self.pdemloadpdsc2criteria = {
            lRefreshClick: true,
            cSetid: self.pdemInitialLoadCriteria.cSetid
         };
      } else if (callMode === 'ADV') {
         // If Call from Criteria Search (callMode = "ADV") then leave criteria as is off Search Fields
         self.pdmerridpdsc2 = [];

         //User Hook (do not rename)
         if (self.setPdemPdsc2AdvCriteria) {
            self.setPdemPdsc2AdvCriteria();
         }

         if (self.pdemloadpdsc2criteria.cWhse && self.pdemloadpdsc2criteria.cRegion) {
            MessageService.alert('global.warning', "message.the.entry.will.allow.either.a.whse.or.a.price.regi");
            return;
         }

         self.pdemloadpdsc2criteria.lRefreshClick = true;
      } else {
         // If Call from Detail Update Validation (callMode = "UPDT") use the Error File produced from the Validate call
         self.pdemloadpdsc2criteria.lRefreshClick = false;
      }

      //User Hook (do not rename)
      if (self.setPdemPdsc2Criteria) {
         self.setPdemPdsc2Criteria();
      }

      DataService.post('api/pd/aspdentry/pdemloadpdsc2', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: { pdmerridpdsc2: self.pdmerridpdsc2, pdemloadpdsc2criteria: self.pdemloadpdsc2criteria }, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.processMessaging(data.messaging);
            } else {
               self.pdemloadpdsc2results = data.pdemloadpdsc2results;
            }

            //User Hook (do not rename)
            if (self.pdemLoadPdsc2Continue) {
               self.pdemLoadPdsc2Continue(data);
            }
         }
      });
   };

   self.loadPdsc3ScreenData = function (callMode) {

      if (!callMode) {
         // If Called from Main Search Criteria (callMode = "") load SetID only.
         self.pdmerridpdsc3 = [];
         self.pdemloadpdsc3criteria = {
            lRefreshClick: true,
            cSetid: self.pdemInitialLoadCriteria.cSetid
         };
      } else if (callMode === 'ADV') {
         // If Call from Criteria Search (callMode = "ADV") then leave criteria as is off Search Fields
         self.pdmerridpdsc3 = [];

         //User Hook (do not rename)
         if (self.setPdemPdsc3AdvCriteria) {
            self.setPdemPdsc3AdvCriteria();
         }

         if (self.pdemloadpdsc3criteria.cWhse && self.pdemloadpdsc3criteria.cRegion) {
            MessageService.alert('global.warning', "message.the.entry.will.allow.either.a.whse.or.a.price.regi");
            return;
         }

         self.pdemloadpdsc3criteria.lRefreshClick = true;
      } else {
         // If Call from Detail Update Validation (callMode = "UPDT") use the Error File produced from the Validate call
         self.pdemloadpdsc3criteria.lRefreshClick = false;
      }

      //User Hook (do not rename)
      if (self.setPdemPdsc3Criteria) {
         self.setPdemPdsc3Criteria();
      }

      DataService.post('api/pd/aspdentry/pdemloadpdsc3', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: { pdmerridpdsc3: self.pdmerridpdsc3, pdemloadpdsc3criteria: self.pdemloadpdsc3criteria }, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.processMessaging(data.messaging);
            } else {
               self.pdemloadpdsc3results = data.pdemloadpdsc3results;
            }

            //User Hook (do not rename)
            if (self.pdemLoadPdsc3Continue) {
               self.pdemLoadPdsc3Continue(data);
            }
         }
      });
   };

   self.loadPdsrScreenData = function (callMode) {

      if (!callMode) {
         // If Called from Main Search Criteria (callMode = "") load SetID only.
         self.pdmerridpdsr = [];
         self.pdemloadpdsrcriteria = {
            lRefreshClick: true,
            cSetid: self.pdemInitialLoadCriteria.cSetid
         };
      } else if (callMode === 'ADV') {
         // If Call from Criteria Search (callMode = "ADV") then leave criteria as is off Search Fields
         self.pdmerridpdsr = [];
         if (self.pdemloadpdsrcriteria.cWhse && self.pdemloadpdsrcriteria.cRegion) {
            MessageService.alert('global.warning', "message.the.entry.will.allow.either.a.whse.or.a.price.regi");
            return;
         }

         self.pdemloadpdsrcriteria.lRefreshClick = true;
      } else {
         // If Call from Detail Update Validation (callMode = "UPDT") use the Error File produced from the Validate call
         self.pdemloadpdsrcriteria.lRefreshClick = false;
      }

      //User Hook (do not rename)
      if (self.setPdemPdsrCriteria) {
         self.setPdemPdsrCriteria();
      }

      DataService.post('api/pd/aspdentry/pdemloadpdsr', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: { pdmerridpdsr: self.pdmerridpdsr, pdemloadpdsrcriteria: self.pdemloadpdsrcriteria }, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.processMessaging(data.messaging);
            } else {
               self.pdemloadpdsrresults = data.pdemloadpdsrresults;
            }

            //User Hook (do not rename)
            if (self.pdemLoadPdsrContinue) {
               self.pdemLoadPdsrContinue(data);
            }
         }
      });
   };

   self.setScreensVisibility = function (isPdscScreen1Visible, isPdscScreen2Visible, isPdscScreen3Visible, isPdsrScreenVisible) {
      self.isPdscScreen1Visible = isPdscScreen1Visible;
      self.isPdscScreen2Visible = isPdscScreen2Visible;
      self.isPdscScreen3Visible = isPdscScreen3Visible;
      self.isPdsrScreenVisible = isPdsrScreenVisible;
   };

   self.reset = function () {
      self.pdemInitialLoadCriteria.cSetid = '';
      self.pdemInitialLoadResults.cSource = '';
      self.pdemInitialLoadResults.cDestination = '';
   };

   self.detailClose = function () {
      self.setScreensVisibility(false, false, false, false);
      self.isSearchEnabled = true;
      self.pdemInitialLoadCriteria.cSetid = '';
      self.pdemInitialLoadResults.cSource = '';
      self.pdemInitialLoadResults.cDestination = '';
   };

   self.loadNewRecordTypeChange = function (destination) {

      self.isRebateType = false;

      if (destination) {
         switch (destination) {
            case self.PDSR_REBATE_ON_PRODUCT:                           //ignore jslint - correct indentation
            case self.PDSR_REBATE_ON_REBATE_TYPE:                       //ignore jslint - correct indentation
            case self.PDSR_REBATE_ON_PRODUCT_PRICE:                     //ignore jslint - correct indentation
            case self.PDSR_REBATE_ON_PRODUCT_LINE:                      //ignore jslint - correct indentation
            case self.PDSR_REBATE_ON_PRODUCT_CATEGORY:                  //ignore jslint - correct indentation
               self.isRebateType = true;                                //ignore jslint - correct indentation
         }

         DataService.get('api/pd/aspdentry/pdemexcelnewsetupdtcinit/' + destination, { busy: true }, function (data) {
            if (data) {
               self.pdemExcelNewsetUpdtCInit = data;
            }
         });
      }
   };

   self.deleteSet = function () {
      var cDeleteMsg = MessageService.get('global.delete.entire.set') + '; ' + self.pdemInitialLoadCriteria.cSetid;

      // Allow the Delete off the Set ID.  Do Not require that the Set be loaded first
      if (self.pdemInitialLoadCriteria.cSetid) {

         MessageService.yesNo('global.question', cDeleteMsg, function () {
            self.pdemInitialLoadCriteria.cDeletefl = 'EntireSet';

            DataService.post('api/pd/aspdentry/pdeminitialload', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: self.pdemInitialLoadCriteria, busy: true }, function (data) {
               if (data) {
                  self.pdemInitialLoadCriteria.cDeletefl = '';
                  self.detailClose();
                  MessageService.info('global.information', 'message.delete.operation.has.been.scheduled');
               }
            });
         });
      }
   };

});

app.controller('PdemSearchCtrl', function ($scope, $state, DataService, Utils, Sasc) {
   var self = this;
   var base = $scope.base;
   var pdsc1 = $scope.pdsc1;

   self.reset = function () {
      base.reset();
   };

});

app.controller('PdemMasterCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      if (base.isPdscScreen1Visible) {
         base.loadPdsc1ScreenData();
      } else if (base.isPdscScreen2Visible) {
         base.loadPdsc2ScreenData();
      } else if (base.isPdscScreen3Visible) {
         base.loadPdsc3ScreenData();
      } else if (base.isPdsrScreenVisible) {
         base.loadPdsrScreenData();
      }
   }

   self.create = function () {
      $state.go('^.create');
   };

   self.importExcelWithNewRecords = function () {
      $state.go('^.import');
   };

   self.columnDisabled = function () {
      $state.go('^.columndisable');
   };

   // called from each of the grids
   self.columnExport = function (exportGridName, exportGrid) {


      var gridColumnsLength = exportGrid.settings.columns.length;
      base.exportColumnList = [];
      for (var i = 0; i < gridColumnsLength; i++) {
         if (exportGrid.settings.columns[i].field) {
            base.exportColumnList.push({ label: exportGrid.settings.columns[i].name, value: exportGrid.settings.columns[i].field, id: exportGrid.settings.columns[i].id });
         }
      }

      base.exportGridName = exportGridName;
      base.exportGrid = exportGrid;

      $state.go('^.columnexport');
   };

});

app.controller('PdemDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService, PdConverters) {
   var self = this;
   var base = $scope.base;

   base.pdemGridUpdatePdsc = {};
   base.pdemGridUpdatePdsr = {};
   self.statusTypeList = [];
   self.qtyBreakTyList = [];
   self.priceOnTyList = [];
   self.maxQtyTypeList = [];
   self.rebCalcTyList = [];
   self.rebDownToTyList = [];
   self.marginCostTyList = [];
   self.rebateCostTyList = [];
   self.resetData = {};

   self.loadPriceBreakData = function () {
      // Load the Price Grid
      base.pricegrd = [
         { seqno: 1, prcmult: base.pdemGridUpdatePdsc.prcmult1, qtybrk: base.pdemGridUpdatePdsc.qtybrk1, prcdisc: base.pdemGridUpdatePdsc.prcdisc1 },
         { seqno: 2, prcmult: base.pdemGridUpdatePdsc.prcmult2, qtybrk: base.pdemGridUpdatePdsc.qtybrk2, prcdisc: base.pdemGridUpdatePdsc.prcdisc2 },
         { seqno: 3, prcmult: base.pdemGridUpdatePdsc.prcmult3, qtybrk: base.pdemGridUpdatePdsc.qtybrk3, prcdisc: base.pdemGridUpdatePdsc.prcdisc3 },
         { seqno: 4, prcmult: base.pdemGridUpdatePdsc.prcmult4, qtybrk: base.pdemGridUpdatePdsc.qtybrk4, prcdisc: base.pdemGridUpdatePdsc.prcdisc4 },
         { seqno: 5, prcmult: base.pdemGridUpdatePdsc.prcmult5, qtybrk: base.pdemGridUpdatePdsc.qtybrk5, prcdisc: base.pdemGridUpdatePdsc.prcdisc5 },
         { seqno: 6, prcmult: base.pdemGridUpdatePdsc.prcmult6, qtybrk: base.pdemGridUpdatePdsc.qtybrk6, prcdisc: base.pdemGridUpdatePdsc.prcdisc6 },
         { seqno: 7, prcmult: base.pdemGridUpdatePdsc.prcmult7, qtybrk: base.pdemGridUpdatePdsc.qtybrk7, prcdisc: base.pdemGridUpdatePdsc.prcdisc7 },
         { seqno: 8, prcmult: base.pdemGridUpdatePdsc.prcmult8, qtybrk: base.pdemGridUpdatePdsc.qtybrk8, prcdisc: base.pdemGridUpdatePdsc.prcdisc8 },
         { seqno: 9, prcmult: base.pdemGridUpdatePdsc.prcmult9, qtybrk: '', prcdisc: base.pdemGridUpdatePdsc.prcdisc9 }
      ];
   };

   self.subTitle = function () {

      var detailTitle;
      var sourceValue;

      sourceValue = base.pdemHeader.source;

      if (base.isPdsrScreenVisible) {

         switch (sourceValue.toLowerCase()) {
            case 'r1':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.product') + ': ' + base.pdemGridUpdatePdsr.prod;                      //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'r2':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.rebate.type') + ': ' + base.pdemGridUpdatePdsr.rebatety;              //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'r3':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.product.price.type') + ': ' + base.pdemGridUpdatePdsr.prodprcty;      //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'r4':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.product.line') + ': ' + base.pdemGridUpdatePdsr.prodline;             //ignore jslint - correct indentation
               if (base.pdemGridUpdatePdsr.vendno) {                                                                          //ignore jslint - correct indentation
                  detailTitle += " | " + MessageService.get('global.vendor.number') + ': ' + base.pdemGridUpdatePdsr.vendno;  //ignore jslint - correct indentation
               }                                                                                                              //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'r5':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.product.category') + ': ' + base.pdemGridUpdatePdsr.prodcat;          //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
         }
      } else {
         switch (sourceValue.toLowerCase()) {
            case 'c1':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.number') + ': ' + base.pdemGridUpdatePdsc.custno;            //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.product') + ': ' + base.pdemGridUpdatePdsc.prod;             //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c2p':                                                                                                       //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.number') + ': ' + base.pdemGridUpdatePdsc.custno;            //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.product.price.type') + ': ' + base.pdemGridUpdatePdsc.prodprcty;   //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c2l':                                                                                                       //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.number') + ': ' + base.pdemGridUpdatePdsc.custno;            //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.product.line') + ': ' + base.pdemGridUpdatePdsc.prodline;    //ignore jslint - correct indentation
               if (base.pdemGridUpdatePdsc.vendno) {                                                                          //ignore jslint - correct indentation
                  detailTitle += " | " + MessageService.get('global.vendor.number') + ': ' + base.pdemGridUpdatePdsc.vendno;  //ignore jslint - correct indentation
               }                                                                                                              //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c2c':                                                                                                       //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.number') + ': ' + base.pdemGridUpdatePdsc.custno;            //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.product.category') + ': ' + base.pdemGridUpdatePdsc.prodcat; //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c2r':                                                                                                       //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.number') + ': ' + base.pdemGridUpdatePdsc.custno;            //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.rebate.type') + ': ' + base.pdemGridUpdatePdsc.rebatety;     //ignore jslint - correct indentation
               if (base.pdemGridUpdatePdsc.rebsubty) {                                                                        //ignore jslint - correct indentation
                  detailTitle += ' | ' +                                                                                      //ignore jslint - correct indentation
                     MessageService.get('global.sub.type') + ': ' + base.pdemGridUpdatePdsc.rebsubty;                         //ignore jslint - correct indentation
               }                                                                                                              //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c3':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.price.type') + ': ' + base.pdemGridUpdatePdsc.custtype;      //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.product') + ': ' + base.pdemGridUpdatePdsc.prod;             //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c4p':                                                                                                       //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.price.type') + ': ' + base.pdemGridUpdatePdsc.custtype;      //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.product.price.type') + ': ' + base.pdemGridUpdatePdsc.prodprcty;   //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c4r':                                                                                                       //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.price.type') + ': ' + base.pdemGridUpdatePdsc.custtype;      //ignore jslint - correct indentation
               detailTitle += " | " + MessageService.get('global.rebate.type') + ': ' + base.pdemGridUpdatePdsc.rebatety;     //ignore jslint - correct indentation
               if (base.pdemGridUpdatePdsc.rebsubty) {                                                                        //ignore jslint - correct indentation
                  detailTitle += ' | ' +                                                                                      //ignore jslint - correct indentation
                     MessageService.get('global.sub.type') + ': ' + base.pdemGridUpdatePdsc.rebsubty;                         //ignore jslint - correct indentation
               }                                                                                                              //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c5':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.number') + ': ' + base.pdemGridUpdatePdsc.custno;            //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c6':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.customer.price.type') + ': ' + base.pdemGridUpdatePdsc.custtype;      //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c7':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.product') + ': ' + base.pdemGridUpdatePdsc.prod;                      //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
            case 'c8':                                                                                                        //ignore jslint - correct indentation
               detailTitle = MessageService.get('global.product.price.type') + ': ' + base.pdemGridUpdatePdsc.prodprcty;      //ignore jslint - correct indentation
               break;                                                                                                         //ignore jslint - correct indentation
         }
      }

      return detailTitle;
   };

   if (base.isPdsrScreenVisible) {

      var valueArray = [];
      var dropDownValue;
      var rawData;

      base.pdemGridUpdatePdsr = $stateParams.record;
      self.resetData = angular.copy(base.pdemGridUpdatePdsr);

      // Rebate Calc Type - currency Symbol, %, N, M - rebcalcty
      rawData = '%,N,M';
      valueArray = rawData.split(',');
      self.rebCalcTyList.push({ value: '', label: MessageService.get('global.blank') });
      if (base.currencySymbol === '$') {
         self.rebCalcTyList.push({ value: '$', label: MessageService.get('global.amount') });
      } else {
         self.rebCalcTyList.push({ value: base.currencySymbol, label: MessageService.get('global.amount') });
      }
      for (var i = 0; i < valueArray.length; i++) {
         dropDownValue = valueArray[i];
         self.rebCalcTyList.push({ value: dropDownValue, label: PdConverters.RebateCalcTypeToName.convert(dropDownValue) });
      }

      // Add in Raw Data if no match - rebcalcty
      switch (base.pdemGridUpdatePdsr.rebcalcty.toUpperCase()) {
         case '':
         case'$':
         case base.currencySymbol:
         case '%':
         case 'N':
         case 'M':
            break;
         default:
            self.rebCalcTyList.push({ value: base.pdemGridUpdatePdsr.rebcalcty, label: base.pdemGridUpdatePdsr.rebcalcty });
            break;
      }

      // Rebate Down To Basis - rebdowntoty
      rawData = 'f,b,l,p,a,t,r,s,e,o,c,c1,c2,c3,c4,c5,c6,c7,c8,c9,v1,v2,v3,v4,v5,v6,v7,v8,v9';
      valueArray = rawData.split(',');
      self.rebDownToTyList.push({ value: '', label: MessageService.get('global.blank') });
      for (var i = 0; i < valueArray.length; i++) {
         dropDownValue = valueArray[i];
         self.rebDownToTyList.push({ value: dropDownValue, label: PdConverters.RebateDownToName.convert(dropDownValue) });
      }

      // Add in Raw Data if no match - rebdowntoty
      switch (base.pdemGridUpdatePdsr.rebdowntoty.toLowerCase()) {
         case '':
         case 'f':
         case 'b':
         case 'l':
         case 'p':
         case 'a':
         case 't':
         case 'r':
         case 's':
         case 'e':
         case 'o':
         case 'c':
         case 'c1':
         case 'c2':
         case 'c3':
         case 'c4':
         case 'c5':
         case 'c6':
         case 'c7':
         case 'c8':
         case 'c9':
         case 'v1':
         case 'v2':
         case 'v3':
         case 'v4':
         case 'v5':
         case 'v6':
         case 'v7':
         case 'v8':
         case 'v9':
            break;
         default:
            self.rebDownToTyList.push({ value: base.pdemGridUpdatePdsr.rebdowntoty, label: base.pdemGridUpdatePdsr.rebdowntoty });
            break;
      }

      // Margin Basis - margincostty
      rawData = 'a,t,r,s,e,o,c,c1,c2,c3,c4,c5,c6,c7,c8,c9,v1,v2,v3,v4,v5,v6,v7,v8,v9';
      valueArray = rawData.split(',');
      self.marginCostTyList.push({ value: '', label: MessageService.get('global.blank') });
      for (var i = 0; i < valueArray.length; i++) {
         dropDownValue = valueArray[i];
         self.marginCostTyList.push({ value: dropDownValue, label: PdConverters.MarginCostTypeToName.convert(dropDownValue) });
      }

      // Add in Raw Data if no match - margincostty
      switch (base.pdemGridUpdatePdsr.margincostty.toLowerCase()) {
         case '':
         case 'a':
         case 't':
         case 'r':
         case 's':
         case 'e':
         case 'o':
         case 'c':
         case 'c1':
         case 'c2':
         case 'c3':
         case 'c4':
         case 'c5':
         case 'c6':
         case 'c7':
         case 'c8':
         case 'c9':
         case 'v1':
         case 'v2':
         case 'v3':
         case 'v4':
         case 'v5':
         case 'v6':
         case 'v7':
         case 'v8':
         case 'v9':
            break;
         default:
            self.marginCostTyList.push({ value: base.pdemGridUpdatePdsr.margincostty, label: base.pdemGridUpdatePdsr.margincostty });
            break;
      }

      // Rebate From Basis - rebatecostty
      rawData = 'b,l,p,a,t,r,s,e,o,c,c1,c2,c3,c4,c5,c6,c7,c8,c9,v1,v2,v3,v4,v5,v6,v7,v8,v9';
      valueArray = rawData.split(',');
      self.rebateCostTyList.push({ value: '', label: MessageService.get('global.blank') });
      for (var i = 0; i < valueArray.length; i++) {
         dropDownValue = valueArray[i];
         self.rebateCostTyList.push({ value: dropDownValue, label: PdConverters.RebateCostTypeToName.convert(dropDownValue) });
      }

      // Add in Raw Data if no match - rebatecostty
      switch (base.pdemGridUpdatePdsr.rebatecostty.toLowerCase()) {
         case '':
         case 'b':
         case 'l':
         case 'p':
         case 'a':
         case 't':
         case 'r':
         case 's':
         case 'e':
         case 'o':
         case 'c':
         case 'c1':
         case 'c2':
         case 'c3':
         case 'c4':
         case 'c5':
         case 'c6':
         case 'c7':
         case 'c8':
         case 'c9':
         case 'v1':
         case 'v2':
         case 'v3':
         case 'v4':
         case 'v5':
         case 'v6':
         case 'v7':
         case 'v8':
         case 'v9':
            break;
         default:
            self.rebateCostTyList.push({ value: base.pdemGridUpdatePdsr.rebatecostty, label: base.pdemGridUpdatePdsr.rebatecostty });
            break;
      }

   } else {
      base.pdemGridUpdatePdsc = $stateParams.record;
      self.resetData = angular.copy(base.pdemGridUpdatePdsc);
      self.loadPriceBreakData();

      // Status Type Drop Down - pdee.i hardcodes statustype to 'Active' or 'Inactive' - no global validation
      if (base.pdemGridUpdatePdsc.statustype === '') {
         self.statusTypeList.push({ key: '', value: MessageService.get('global.blank') });
      }
      self.statusTypeList.push({ key: 'Active', value: 'Active' });
      self.statusTypeList.push({ key: 'Inactive', value: 'Inactive' });

      // Add in Raw Data if no match - qtybreakty
      if (base.pdemGridUpdatePdsc.statustype !== '' && base.pdemGridUpdatePdsc.statustype.toLowerCase() !== 'active' &&
         base.pdemGridUpdatePdsc.statustype.toLowerCase() !== 'inactive') {
         self.statusTypeList.push({ key: base.pdemGridUpdatePdsc.statustype, value: base.pdemGridUpdatePdsc.statustype });
      }

      // Qty Break Type - D, P or Blank - qtybreakty
      self.qtyBreakTyList.push({ key: '', value: MessageService.get('global.blank') });
      self.qtyBreakTyList.push({ key: 'D', value: MessageService.get('global.discount') });
      self.qtyBreakTyList.push({ key: 'P', value: MessageService.get('global.price') });

      // Add in Raw Data if no match
      if (base.pdemGridUpdatePdsc.qtybreakty !== '' && base.pdemGridUpdatePdsc.qtybreakty.toLowerCase() !== 'd' &&
         base.pdemGridUpdatePdsc.qtybreakty.toLowerCase() !== 'p') {
         self.qtyBreakTyList.push({ key: base.pdemGridUpdatePdsc.qtybreakty, value: base.pdemGridUpdatePdsc.qtybreakty });
      }

      // Max Qty Type - C, P, S, W - maxqtytype
      self.maxQtyTypeList.push({ key: '', value: MessageService.get('global.blank') });
      self.maxQtyTypeList.push({ key: 'C', value: MessageService.get('global.cube') });
      self.maxQtyTypeList.push({ key: 'P', value: MessageService.get('global.spc.unit') });
      self.maxQtyTypeList.push({ key: 'S', value: MessageService.get('global.stocking.unit') });
      self.maxQtyTypeList.push({ key: 'W', value: MessageService.get('global.weight') });

      // Add in Raw Data if no match - maxqtytype
      switch (base.pdemGridUpdatePdsc.maxqtytype.toUpperCase()) {
         case '':
         case 'C':
         case 'P':
         case 'S':
         case 'W':
            break;
         default:
            self.maxQtyTypeList.push({ key: base.pdemGridUpdatePdsc.maxqtytype, value: base.pdemGridUpdatePdsc.maxqtytype });
            break;
      }

      // Basis - priceonty
      self.priceOnTyList.push({ key: '', value: MessageService.get('global.blank') });
      self.priceOnTyList.push({ key: 'B', value: MessageService.get('global.base.price') });
      self.priceOnTyList.push({ key: 'L', value: MessageService.get('global.list.price') });
      self.priceOnTyList.push({ key: 'C', value: MessageService.get('global.cost') });
      self.priceOnTyList.push({ key: 'M', value: MessageService.get('global.margin') });
      self.priceOnTyList.push({ key: 'RM', value: MessageService.get('global.rebated.margin') });
      self.priceOnTyList.push({ key: 'RC', value: MessageService.get('global.rebated.cost') });
      self.priceOnTyList.push({ key: 'CB', value: MessageService.get('global.rebate.cost') });
      self.priceOnTyList.push({ key: 'CR', value: MessageService.get('global.replacement.cost') });
      self.priceOnTyList.push({ key: 'CS', value: MessageService.get('global.standard.cost') });
      self.priceOnTyList.push({ key: 'MR', value: MessageService.get('global.margin.with.repl.cost') });
      self.priceOnTyList.push({ key: 'MS', value: MessageService.get('global.margin.with.std.cost') });
      self.priceOnTyList.push({ key: 'C1', value: MessageService.get('global.customer.sheet.column.1') });
      self.priceOnTyList.push({ key: 'C2', value: MessageService.get('global.customer.sheet.column.2') });
      self.priceOnTyList.push({ key: 'C3', value: MessageService.get('global.customer.sheet.column.3') });
      self.priceOnTyList.push({ key: 'C4', value: MessageService.get('global.customer.sheet.column.4') });
      self.priceOnTyList.push({ key: 'C5', value: MessageService.get('global.customer.sheet.column.5') });
      self.priceOnTyList.push({ key: 'C6', value: MessageService.get('global.customer.sheet.column.6') });
      self.priceOnTyList.push({ key: 'C7', value: MessageService.get('global.customer.sheet.column.7') });
      self.priceOnTyList.push({ key: 'C8', value: MessageService.get('global.customer.sheet.column.8') });
      self.priceOnTyList.push({ key: 'C9', value: MessageService.get('global.customer.sheet.column.9') });
      self.priceOnTyList.push({ key: 'V1', value: MessageService.get('global.vendor.sheet.column.1') });
      self.priceOnTyList.push({ key: 'V2', value: MessageService.get('global.vendor.sheet.column.2') });
      self.priceOnTyList.push({ key: 'V3', value: MessageService.get('global.vendor.sheet.column.3') });
      self.priceOnTyList.push({ key: 'V4', value: MessageService.get('global.vendor.sheet.column.4') });
      self.priceOnTyList.push({ key: 'V5', value: MessageService.get('global.vendor.sheet.column.5') });
      self.priceOnTyList.push({ key: 'V6', value: MessageService.get('global.vendor.sheet.column.6') });
      self.priceOnTyList.push({ key: 'V7', value: MessageService.get('global.vendor.sheet.column.7') });
      self.priceOnTyList.push({ key: 'V8', value: MessageService.get('global.vendor.sheet.column.8') });
      self.priceOnTyList.push({ key: 'V9', value: MessageService.get('global.vendor.sheet.column.9') });

      // Add in Raw Data if no match - priceonty
      switch (base.pdemGridUpdatePdsc.priceonty.toUpperCase()) {
         case '':
         case 'B':
         case 'L':
         case 'C':
         case 'M':
         case 'RM':
         case 'RC':
         case 'CB':
         case 'CR':
         case 'CS':
         case 'MR':
         case 'MS':
         case 'C1':
         case 'C2':
         case 'C3':
         case 'C4':
         case 'C5':
         case 'C6':
         case 'C7':
         case 'C8':
         case 'C9':
         case 'V1':
         case 'V2':
         case 'V3':
         case 'V4':
         case 'V5':
         case 'V6':
         case 'V7':
         case 'V8':
         case 'V9':
            break;
         default:
            self.priceOnTyList.push({ key: base.pdemGridUpdatePdsc.priceonty, value: base.pdemGridUpdatePdsc.priceonty });
            break;
      }

   }

   self.reset = function () {
      if (self.isPdsrScreenVisible) {
         base.pdemGridUpdatePdsr = angular.copy(self.resetData);
      }
      else {
         base.pdemGridUpdatePdsc = angular.copy(self.resetData);
         self.loadPriceBreakData();
      }
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.submit = function () {

      var detailCriteria = {};

      // Load the Price Break Table data
      if (!base.isPdsrScreenVisible) {

         for (var i = 0; i <= 8; i++) {
            var obj = base.pricegrd[i];
            var prcMultField = 'prcmult' + (i + 1);
            var prcDiscField = 'prcdisc' + (i + 1);
            var qtyBrkField = 'qtybrk' + (i + 1);

            base.pdemGridUpdatePdsc[prcMultField] = obj.prcmult;
            base.pdemGridUpdatePdsc[prcDiscField] = obj.prcdisc;

            if (base.pdemGridUpdatePdsc.qtybreakty.toUpperCase() !== 'D' && base.pdemGridUpdatePdsc.qtybreakty.toUpperCase() !== 'P') {
               base.pdemGridUpdatePdsc[qtyBrkField] = 0;
            } else {
               base.pdemGridUpdatePdsc[qtyBrkField] = obj.qtybrk;
            }
         }
      }

      // DEV NOTE: In the proxygen for all three PDSC calls, the table used is pdsc1 since the ttbl tables in Progress are identical for PDSC1, PDSC2, PDSC3
      //     If a field is changed/added on the tables, the signature will change to the right table, then load the detailCriteria to the correct table, but
      //     for now all three point to pdsc1 to match the ProxyGen signature
      if (base.isPdscScreen1Visible) {
         detailCriteria = {
            pdemgridupdatepdsc1: base.pdemGridUpdatePdsc,
            lColOvrRd: false
         };
      } else if (base.isPdscScreen2Visible) {
         detailCriteria = {
            pdemgridupdatepdsc1: base.pdemGridUpdatePdsc,
            lColOvrRd: false
         };
      } else if (base.isPdscScreen3Visible) {
         detailCriteria = {
            pdemgridupdatepdsc1: base.pdemGridUpdatePdsc,
            lColOvrRd: false
         };
      } else {
         detailCriteria = {
            pdemgridupdatepdsr: base.pdemGridUpdatePdsr,
            lColOvrRd: false
         };
      }

      if (base.isPdscScreen1Visible) {
         DataService.post('api/pd/aspdentry/pdemgridupdatepdsc1', { data: detailCriteria, busy: true }, function (data) {
            if (data.length) {
               MessageService.processMessaging(data);
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
            }
         });
      }
      else if (base.isPdscScreen2Visible) {
         DataService.post('api/pd/aspdentry/pdemgridupdatepdsc2', { data: detailCriteria, busy: true }, function (data) {
            if (data.length) {
               MessageService.processMessaging(data);
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
            }
         });
      }
      else if (base.isPdscScreen3Visible) {
         DataService.post('api/pd/aspdentry/pdemgridupdatepdsc3', { data: detailCriteria, busy: true }, function (data) {
            if (data.length) {
               MessageService.processMessaging(data);
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
            }
         });
      }
      else if (base.isPdsrScreenVisible) {
         DataService.post('api/pd/aspdentry/pdemgridupdatepdsr', { data: detailCriteria, busy: true }, function (data) {
            if (data.length) {
               MessageService.processMessaging(data);
            } else {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
            }
         });
      }
   };

   self.allowFromDisabledList = function (row, cell, value, column, item) {

      var gridField;
      gridField = column.field + item.seqno;

      // Discount Cell 9 is always Un-Editable, all others look through Disabled List
      if (gridField.toLowerCase() === 'qtybrk9') {
         return false;
      } else if (base.disabledColumnList.length) {
         for (var i = 0; i < base.disabledColumnList.length; i++) {
            var record = base.disabledColumnList[i];
            if (record.value === gridField) {
               return false;
            }
         }
         return true;
      } else {
         return true;
      }
   };

});

app.controller('PdemColumnCalcCtrl', function ($filter, $scope, $state, $stateParams, DataService, GridService, MessageService, $translate, Utils) {
   var self = this;
   var base = $scope.base;
   self.columnValue = '';
   self.columnValue1 = '';
   self.step2ColValue = '';
   self.subTitle = MessageService.get('global.step.1');
   self.step2option = 'd';
   self.step3option = 'a';
   self.selectedColumnValue = '';
   self.isStep1 = true;
   self.isStep2 = false;
   self.isStep3 = false;
   self.isStep4 = false;
   self.isStep2WizardDisabled = false;
   self.isConstantFieldEnabled = true;
   self.isDataFieldEnable = false;
   self.columnDataType = '';
   self.postFixString = '';
   self.pdemStringDelimiter = String.fromCharCode(3);
   self.evaluationStack = [];
   self.precedence = 0;
   if ($stateParams.viewType) {
      self.viewType = $stateParams.viewType;
   }

   self.updatedPdsc1Records = [];
   self.updatedPdsc2Records = [];
   self.updatedPdsc3Records = [];
   self.updatedPdsrRecords = [];

   var PDEM_Column_Update = 'updttype';
   var PDEM_Column_CustNo = 'custno';
   var PDEM_Column_ShipTo = 'custtype';
   var PDEM_Column_Product = 'prod';
   var PDEM_Column_Description = 'proddesc';
   var PDEM_Column_Description2 = 'proddesc2';
   var PDEM_Column_CrossReference = 'xrefprod';
   var PDEM_Column_Units = 'units';
   var PDEM_Column_Whse = 'whse';
   var PDEM_Column_Region = 'region';
   var PDEM_Column_ProductTy = 'prodprcty';
   var PDEM_Column_ProdLine = 'prodline';
   var PDEM_Column_ProdCat = 'prodcat';
   var PDEM_Column_ContractNo = 'contractno';
   var PDEM_Column_PrcType = 'prctype';
   var PDEM_Column_PriceSheetName = 'pricesheet';
   var PDEM_Column_PriceSheetDt = 'priceeffectivedate';
   var PDEM_Column_StartDate = 'startdt';
   var PDEM_Column_EndDate = 'enddt';
   var PDEM_Column_Reference = 'refer';
   var PDEM_Column_Status = 'statustype';
   var PDEM_Column_QtyBrkOn = 'qtybreakty';
   var PDEM_Column_Basis = 'priceonty';
   var PDEM_Column_Price1 = 'prcmult1';
   var PDEM_Column_Price2 = 'prcmult2';
   var PDEM_Column_Price3 = 'prcmult3';
   var PDEM_Column_Price4 = 'prcmult4';
   var PDEM_Column_Price5 = 'prcmult5';
   var PDEM_Column_Price6 = 'prcmult6';
   var PDEM_Column_Price7 = 'prcmult7';
   var PDEM_Column_Price8 = 'prcmult8';
   var PDEM_Column_Price9 = 'prcmult9';
   var PDEM_Column_Qty1 = 'qtybrk1';
   var PDEM_Column_Qty2 = 'qtybrk2';
   var PDEM_Column_Qty3 = 'qtybrk3';
   var PDEM_Column_Qty4 = 'qtybrk4';
   var PDEM_Column_Qty5 = 'qtybrk5';
   var PDEM_Column_Qty6 = 'qtybrk6';
   var PDEM_Column_Qty7 = 'qtybrk7';
   var PDEM_Column_Qty8 = 'qtybrk8';
   var PDEM_Column_Discount1 = 'prcdisc1';
   var PDEM_Column_Discount2 = 'prcdisc2';
   var PDEM_Column_Discount3 = 'prcdisc3';
   var PDEM_Column_Discount4 = 'prcdisc4';
   var PDEM_Column_Discount5 = 'prcdisc5';
   var PDEM_Column_Discount6 = 'prcdisc6';
   var PDEM_Column_Discount7 = 'prcdisc7';
   var PDEM_Column_Discount8 = 'prcdisc8';
   var PDEM_Column_Discount9 = 'prcdisc9';
   var PDEM_Column_PricingRecNo = 'pdrecno';
   var PDEM_Column_Error = 'cupderrmsg';
   var PDEM_Column_Modifier = 'modifiernm';
   var PDEM_Column_AllowWithRebate = 'modifierrebfl';
   var PDEM_Column_HardPriceFlag = 'hardpricefl';
   var PDEM_Column_HardMaximumFlag = 'hardmaxqtyfl';
   var PDEM_Column_BasedOn = 'maxqtytype';
   var PDEM_Column_OverrideToleranceUp = 'ovrridepctup';
   var PDEM_Column_OverrideToleranceDown = 'ovrridepctdown';
   var PDEM_Column_LastUsedDate = 'lastuseddt';
   var PDEM_Column_RebCalc = 'rebcalcty';
   var PDEM_Column_MarginBasis = 'margincostty';
   var PDEM_Column_RebFromBasis = 'rebatecostty';
   var PDEM_Column_RebDownToBasis = 'rebdowntoty';
   var PDEM_Column_RebAmount = 'rebateamt';
   var PDEM_Column_RebPercent = 'rebatepct';
   var PDEM_Column_PriceSheetNameTo = 'pricesheetto';
   var PDEM_Column_PriceSheetDtTo = 'priceeffectivedateto';
   var PDEM_Column_VendorNo = 'vendno';
   var PDEM_Column_RebType = 'rebatety';
   var PDEM_Column_RebSubType = 'rebsubty';
   var PDEM_Column_CustRebTy = 'custrebty';
   var PDEM_Column_ShipTy = 'dropshipty';
   var PDEM_Column_RebCode = 'rebatecd';
   var PDEM_Column_RebateRecNo = 'rebrecno';
   var PDEM_Column_CustType = 'custtype';
   var PDEM_Column_ShareRebate = 'sharefl';
   var PDEM_Column_SharePercent = 'sharepct';
   var PDEM_Column_CapSellAmount = 'capsellamount';
   var PDEM_Column_CapSellType = 'capselltypefl';
   var PDEM_Column_ManualFlag = 'manualfl';
   var PDEM_Column_ContractLineNo = 'contractlineno';
   var PDEM_Column_ContractCostFlag = 'contractcostfl';
   var ADD = '+';
   var SUB = '-';
   var MUL = '*';
   var DIV = '/';
   var GREATER = '>';
   var LESS = '<';
   var EQUALTO = '===';
   var NOT_EQUAL = '!==';
   self.holdColumnValues = '';
   self.pdemColumnCalculator = {
      columnLabels: '',
      columnTypes: '',
      formula: '',
      formulaValidated: false,
      updateColumn: ''
   };

   if (base.selectedPdsrRecords && base.selectedPdsrRecords.length > 0) {
      var count = JSLINQ(base.selectedPdsrRecords).Count(function (pdsr) {
         return (!pdsr.usepricerebfl);
      });
      if (count == 0) {
         base.enabledColumnList = [
            { label: MessageService.get('global.update'), value: 'updttype' },
            { label: MessageService.get('global.end.date'), value: 'enddt' },
            { label: MessageService.get('global.contract.number'), value: 'contractno' },
            { label: MessageService.get('global.reference'), value: 'refer' },
            { label: MessageService.get('global.rebate.amount'), value: 'rebateamt' }];
      } else {
         base.enabledColumnList = angular.copy(base.origEnabledColumnList);
      }
   }

   // Full Column List By Type of Grid
   self.PDEMColumns = [];
   if (self.viewType === 'PDSC1' || self.viewType === 'PDSC2' || self.viewType === 'PDSC3') {

      if (self.viewType === 'PDSC1') {
         if (base.pdemInitializePdsc1.btnLookupCustnoVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.customer.number'), value: 'custno' });
         }
         if (base.pdemInitializePdsc1.fiShipToVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.ship.to'), value: 'custtype' });
         }
         if (base.pdemInitializePdsc1.btnLookupProdVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.product'), value: 'prod' });
         }
         if (base.pdemInitializePdsc1.btnLookupProdVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.description'), value: 'proddesc' });
         }
         if (base.pdemInitializePdsc1.btnLookupProdVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.description.2'), value: 'proddesc2' });
         }
         if (base.pdemInitializePdsc1.btnLookupWhseVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.warehouse'), value: 'whse' });
         }
         if (base.isPDPriceByRegion === 'YES') {
            self.PDEMColumns.push({ label: MessageService.get('global.region'), value: 'region' });
         }
         self.PDEMColumns.push({ label: MessageService.get('global.cross.reference'), value: 'xrefprod' });

         //User Hook (do not rename)
         if (self.setPdemPdsc1Columns) {
            self.setPdemPdsc1Columns();
         }
      }

      if (self.viewType === 'PDSC2') {
         self.PDEMColumns.push({ label: MessageService.get('global.customer.number'), value: 'custno' });
         if (base.pdemInitializePdsc2.fiShipToVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.ship.to'), value: 'custtype' });
         }
         if (base.pdemInitializePdsc2.fiLevel2TyLabel.toLowerCase() === 'c2p') {
            self.PDEMColumns.push({ label: MessageService.get('global.product.price.type'), value: 'prodprcty' });
         }
         if (base.pdemInitializePdsc2.fiLevel2TyLabel.toLowerCase() === 'c2c') {
            self.PDEMColumns.push({ label: MessageService.get('global.product.category'), value: 'prodcat' });
         }
         if (base.pdemInitializePdsc2.fiLevel2TyLabel.toLowerCase() === 'c2r') {
            self.PDEMColumns.push({ label: MessageService.get('global.rebate.type'), value: 'rebatety' });
         }
         if (base.pdemInitializePdsc2.fiLevel2TyLabel.toLowerCase() === 'c2l') {
            self.PDEMColumns.push({ label: MessageService.get('global.product.line'), value: 'prodline' });
         }
         if (base.pdemInitializePdsc2.fiLevel2TyLabel.toLowerCase() === 'c2l') {
            self.PDEMColumns.push({ label: MessageService.get('global.vendor.number'), value: 'vendno' });
         }
         if (base.pdemInitializePdsc2.btnLookupWhseVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.warehouse'), value: 'whse' });
         }
         if (base.isPDPriceByRegion === 'YES') {
            self.PDEMColumns.push({ label: MessageService.get('global.region'), value: 'region' });
         }
         //User Hook (do not rename)
         if (self.setPdemPdsc2Columns) {
            self.setPdemPdsc2Columns();
         }
      }

      if (self.viewType === 'PDSC3') {
         if (base.pdemInitializePdsc3.btnLookupCustTypeVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.customer.price.type'), value: 'custtype' });
         }
         if (base.pdemInitializePdsc3.fiLevel2TyLabel.toLowerCase() === 'c4p' || base.pdemInitializePdsc3.fiLevel2TyLabel.toLowerCase() === 'c8') {
            self.PDEMColumns.push({ label: MessageService.get('global.product.price.type'), value: 'prodprcty' });
         }
         if (base.pdemInitializePdsc3.fiLevel2TyLabel.toLowerCase() === 'c4r') {
            self.PDEMColumns.push({ label: MessageService.get('global.rebate.type'), value: 'rebatety' });
         }
         if (base.pdemInitializePdsc3.btnLookupProdVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.product'), value: 'prod' });
         }
         if (base.pdemInitializePdsc3.btnLookupProdVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.description'), value: 'proddesc' });
         }
         if (base.pdemInitializePdsc3.btnLookupProdVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.description.2'), value: 'proddesc2' });
         }
         if (base.pdemInitializePdsc3.btnLookupWhseVisible) {
            self.PDEMColumns.push({ label: MessageService.get('global.warehouse'), value: 'whse' });
         }
         if (base.isPDPriceByRegion === 'YES') {
            self.PDEMColumns.push({ label: MessageService.get('global.region'), value: 'region' });
         }

         //User Hook (do not rename)
         if (self.setPdemPdsc3Columns) {
            self.setPdemPdsc3Columns();
         }
      }

      self.PDEMColumns.push({ label: MessageService.get('global.units'), value: 'units' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.discounting.record.number'), value: 'pdrecno' });
      self.PDEMColumns.push({ label: MessageService.get('global.error'), value: 'cupderrmsg' });
      self.PDEMColumns.push({ label: MessageService.get('global.update'), value: 'updttype' });
      self.PDEMColumns.push({ label: MessageService.get('global.allow.with.rebate'), value: 'modifierrebfl' });
      self.PDEMColumns.push({ label: MessageService.get('global.basis'), value: 'priceonty' });
      self.PDEMColumns.push({ label: MessageService.get('global.contract.number'), value: 'contractno' });
      self.PDEMColumns.push({ label: MessageService.get('global.start.date'), value: 'startdt' });
      self.PDEMColumns.push({ label: MessageService.get('global.end.date'), value: 'enddt' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.sheet.name'), value: 'pricesheet' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.sheet.dt'), value: 'priceeffectivedate' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.type'), value: 'prctype' });
      self.PDEMColumns.push({ label: MessageService.get('global.reference'), value: 'refer' });
      self.PDEMColumns.push({ label: MessageService.get('global.status'), value: 'statustype' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.break.on'), value: 'qtybreakty' });
      self.PDEMColumns.push({ label: MessageService.get('global.modifier.name'), value: 'modifiernm' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.1'), value: 'prcmult1' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.2'), value: 'prcmult2' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.3'), value: 'prcmult3' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.4'), value: 'prcmult4' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.5'), value: 'prcmult5' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.6'), value: 'prcmult6' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.7'), value: 'prcmult7' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.8'), value: 'prcmult8' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.9'), value: 'prcmult9' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.1'), value: 'qtybrk1' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.2'), value: 'qtybrk2' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.3'), value: 'qtybrk3' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.4'), value: 'qtybrk4' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.5'), value: 'qtybrk5' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.6'), value: 'qtybrk6' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.7'), value: 'qtybrk7' });
      self.PDEMColumns.push({ label: MessageService.get('global.quantity.8'), value: 'qtybrk8' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.1'), value: 'prcdisc1' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.2'), value: 'prcdisc2' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.3'), value: 'prcdisc3' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.4'), value: 'prcdisc4' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.5'), value: 'prcdisc5' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.6'), value: 'prcdisc6' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.7'), value: 'prcdisc7' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.8'), value: 'prcdisc8' });
      self.PDEMColumns.push({ label: MessageService.get('global.discount.9'), value: 'prcdisc9' });
      self.PDEMColumns.push({ label: MessageService.get('global.hard.system.price'), value: 'hardpricefl' });
      self.PDEMColumns.push({ label: MessageService.get('global.hard.maximum'), value: 'hardmaxqtyfl' });
      self.PDEMColumns.push({ label: MessageService.get('global.based.on'), value: 'maxqtytype' });
      self.PDEMColumns.push({ label: MessageService.get('global.override.tolerance.up'), value: 'ovrridepctup' });
      self.PDEMColumns.push({ label: MessageService.get('global.override.tolerance.down'), value: 'ovrridepctdown' });
      self.PDEMColumns.push({ label: MessageService.get('global.last.used.date'), value: 'lastuseddt' });

   } else if (self.viewType === 'PDSR') {

      self.PDEMColumns.push({ label: MessageService.get('global.update'), value: 'updttype' });
      self.PDEMColumns.push({ label: MessageService.get('global.end.date'), value: 'enddt' });
      self.PDEMColumns.push({ label: MessageService.get('global.contract.number'), value: 'contractno' });
      self.PDEMColumns.push({ label: MessageService.get('global.margin.basis'), value: 'margincostty' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.sheet.name'), value: 'pricesheet' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.sheet.dt'), value: 'priceeffectivedate' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.sheet.name.to'), value: 'pricesheetto' });
      self.PDEMColumns.push({ label: MessageService.get('global.price.sheet.dt.to'), value: 'priceeffectivedateto' });
      self.PDEMColumns.push({ label: MessageService.get('global.rebate.amount'), value: 'rebateamt' });
      self.PDEMColumns.push({ label: MessageService.get('global.rebate.calculation.type'), value: 'rebcalcty' });
      self.PDEMColumns.push({ label: MessageService.get('global.rebate.down.to.basis'), value: 'rebdowntoty' });
      self.PDEMColumns.push({ label: MessageService.get('global.rebate.from.basis'), value: 'rebatecostty' });
      self.PDEMColumns.push({ label: MessageService.get('global.rebate.percent'), value: 'rebatepct' });
      self.PDEMColumns.push({ label: MessageService.get('global.reference'), value: 'refer' });
      if (base.pdemInitializePdsr.fiTypeFldLabel.toLowerCase() === 'r1') {
         self.PDEMColumns.push({ label: MessageService.get('global.product'), value: 'prod' });
         self.PDEMColumns.push({ label: MessageService.get('global.product.description'), value: 'proddesc' });
         self.PDEMColumns.push({ label: MessageService.get('global.product.description.2'), value: 'proddesc2' });
      }
      if (base.pdemInitializePdsr.btnLookupWhseVisible) {
         self.PDEMColumns.push({ label: MessageService.get('global.warehouse'), value: 'whse' });
      }
      if (base.isPDRebateByRegion === 'YES') {
         self.PDEMColumns.push({ label: MessageService.get('global.region'), value: 'region' });
      }
      if (base.pdemInitializePdsr.fiTypeFldLabel.toLowerCase() === 'r2') {
         self.PDEMColumns.push({ label: MessageService.get('global.rebate.type'), value: 'rebatety' });
      }
      if (base.pdemInitializePdsr.fiRebSubTypeVisible) {
         self.PDEMColumns.push({ label: MessageService.get('global.rebate.sub.type'), value: 'rebsubty' });
      }
      if (base.pdemInitializePdsr.fiTypeFldLabel.toLowerCase() === 'r3') {
         self.PDEMColumns.push({ label: MessageService.get('global.product.price.type'), value: 'prodprcty' });
      }
      if (base.pdemInitializePdsr.fiTypeFldLabel.toLowerCase() === 'r4') {
         self.PDEMColumns.push({ label: MessageService.get('global.product.line'), value: 'prodline' });
      }
      if (base.pdemInitializePdsr.fiTypeFldLabel.toLowerCase() === 'r5') {
         self.PDEMColumns.push({ label: MessageService.get('global.product.category'), value: 'prodcat' });
      }
      if (base.pdemInitializePdsr.fiRebateCdScreenValue.toLowerCase() === 'p' || base.pdemInitializePdsr.fiRebateCdScreenValue.toLowerCase() === 's') {
         self.PDEMColumns.push({ label: MessageService.get('global.vendor.number'), value: 'vendno' });
      }
      if (base.pdemInitializePdsr.fiRebateCdScreenValue.toLowerCase() === 'c' || base.pdemInitializePdsr.fiRebateCdScreenValue.toLowerCase() === 's') {
         self.PDEMColumns.push({ label: MessageService.get('global.customer.number'), value: 'custno' });
      }
      if (base.pdemInitializePdsr.btnLookupShipToVisible) {
         self.PDEMColumns.push({ label: MessageService.get('global.ship.to'), value: 'custtype' });
      }
      if (base.pdemInitializePdsr.btnLookupCustRebTypeVisible) {
         self.PDEMColumns.push({ label: MessageService.get('global.customer.rebate.type'), value: 'custrebty' });
      }
      self.PDEMColumns.push({ label: MessageService.get('global.cross.reference'), value: 'xrefprod' });
      self.PDEMColumns.push({ label: MessageService.get('global.start.date'), value: 'startdt' });
      self.PDEMColumns.push({ label: MessageService.get('global.drop.ship.type'), value: 'dropshipty' });
      self.PDEMColumns.push({ label: MessageService.get('global.rebate.code'), value: 'rebatecd' });
      self.PDEMColumns.push({ label: MessageService.get('global.rebate.record.number'), value: 'rebrecno' });
      self.PDEMColumns.push({ label: MessageService.get('global.share.rebate'), value: 'sharefl' });
      self.PDEMColumns.push({ label: MessageService.get('global.share.rebate.percent'), value: 'sharepct' });
      self.PDEMColumns.push({ label: MessageService.get('global.cap.sell.amount'), value: 'capsellamount' });
      self.PDEMColumns.push({ label: MessageService.get('global.cap.sell.type'), value: 'capselltypefl' });
      self.PDEMColumns.push({ label: MessageService.get('global.manual.rebate'), value: 'manualfl' });
      self.PDEMColumns.push({ label: MessageService.get('global.contract.line.number'), value: 'contractlineno' });
      self.PDEMColumns.push({ label: MessageService.get('global.contract.cost'), value: 'contractcostfl' });
      self.PDEMColumns.push({ label: MessageService.get('global.error'), value: 'cupderrmsg' });
   }

   // Sort by Column Label
   self.PDEMColumns = $filter('orderBy')(self.PDEMColumns, 'label');

   self.textMessage = MessageService.get('message.welcome.to.the.infor.distribution.sxe.column.calc');

   self.colLabelsEnabled = function () {

      // Data Type
      if (self.step2option === 'd') {
         self.isDataFieldEnable = false;
         self.isConstantFieldEnabled = true;
      }
         // Constant
      else if (self.step2option === 'c') {
         self.isConstantFieldEnabled = false;
         self.isDataFieldEnable = true;
      }
         // Open ()
      else if (self.step2option === 'o') {
         self.isConstantFieldEnabled = true;
         self.isDataFieldEnable = true;
      }
   };

   self.isSelected = function () {

      var lengthPDEMColumns = self.PDEMColumns.length;

      if (lengthPDEMColumns) {

         for (var i = 0; i < lengthPDEMColumns; i++) {

            var record = self.PDEMColumns[i];

            if (record.value === self.colToUpdate) {
               self.columnValue = record.label + ' ' + $translate.instant('symbol.equals');
               return;
            }
         }
      }

   };

   // Used to display the actual Label in the Visible formula on the screen
   self.getSelectedValue = function (colValue) {

      var lengthPDEMColumns = self.PDEMColumns.length;

      if (lengthPDEMColumns) {

         for (var i = 0; i < lengthPDEMColumns; i++) {

            var record = self.PDEMColumns[i];

            if (record.value === colValue) {
               self.step2ColValue = record.label;
               return;
            }
         }
      }
   };

   self.getColumnLabelTypes = function () {

      self.pdemColumnCalculator.columnLabels = '';
      self.pdemColumnCalculator.columnTypes = '';
      var lengthPDEMColumns = self.PDEMColumns.length;

      if (lengthPDEMColumns) {

         // Roll through the full list of enabled Column choices
         for (var i = 0; i < lengthPDEMColumns; i++) {

            var record = self.PDEMColumns[i];
            switch (record.value) {
               case PDEM_Column_Update:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_PrcType:                                                                    //ignore jslint - correct indentation
               case PDEM_Column_AllowWithRebate:                                                            //ignore jslint - correct indentation
               case PDEM_Column_HardPriceFlag:
               case PDEM_Column_HardMaximumFlag:
               case PDEM_Column_ShareRebate:
               case PDEM_Column_CapSellType:
               case PDEM_Column_ManualFlag:
               case PDEM_Column_ContractCostFlag:
                  self.pdemColumnCalculator.columnLabels += record.value + ',';                             //ignore jslint - correct indentation
                  self.pdemColumnCalculator.columnTypes += 'LOGICAL' + ',';                                 //ignore jslint - correct indentation
                  break;                                                                                    //ignore jslint - correct indentation
               case PDEM_Column_ShipTo:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Product:                                                                    //ignore jslint - correct indentation
               case PDEM_Column_Description:                                                                //ignore jslint - correct indentation
               case PDEM_Column_Description2:                                                               //ignore jslint - correct indentation
               case PDEM_Column_CrossReference:                                                             //ignore jslint - correct indentation
               case PDEM_Column_Units:                                                                      //ignore jslint - correct indentation
               case PDEM_Column_Whse:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Region:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_ProductTy:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_ProdLine:                                                                   //ignore jslint - correct indentation
               case PDEM_Column_ProdCat:                                                                    //ignore jslint - correct indentation
               case PDEM_Column_RebType:                                                                    //ignore jslint - correct indentation
               case PDEM_Column_RebSubType:                                                                 //ignore jslint - correct indentation
               case PDEM_Column_CustRebTy:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_ShipTy:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_RebCode:                                                                    //ignore jslint - correct indentation
               case PDEM_Column_CustType:                                                                   //ignore jslint - correct indentation
               case PDEM_Column_Error:                                                                      //ignore jslint - correct indentation
               case PDEM_Column_ContractNo:                                                                 //ignore jslint - correct indentation
               case PDEM_Column_PriceSheetName:                                                             //ignore jslint - correct indentation
               case PDEM_Column_PriceSheetNameTo:                                                           //ignore jslint - correct indentation
               case PDEM_Column_Reference:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Status:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_QtyBrkOn:                                                                   //ignore jslint - correct indentation
               case PDEM_Column_Basis:                                                                      //ignore jslint - correct indentation
               case PDEM_Column_Modifier:                                                                   //ignore jslint - correct indentation
               case PDEM_Column_RebCalc:                                                                    //ignore jslint - correct indentation
               case PDEM_Column_MarginBasis:                                                                //ignore jslint - correct indentation
               case PDEM_Column_RebFromBasis:                                                               //ignore jslint - correct indentation
               case PDEM_Column_RebDownToBasis:                                                             //ignore jslint - correct indentation
               case PDEM_Column_BasedOn:
                  self.pdemColumnCalculator.columnLabels += record.value + ',';                             //ignore jslint - correct indentation
                  self.pdemColumnCalculator.columnTypes += 'CHARACTER' + ',';                               //ignore jslint - correct indentation
                  break;                                                                                    //ignore jslint - correct indentation
               case PDEM_Column_PriceSheetDt:                                                               //ignore jslint - correct indentation
               case PDEM_Column_PriceSheetDtTo:                                                             //ignore jslint - correct indentation
               case PDEM_Column_EndDate:                                                                    //ignore jslint - correct indentation
               case PDEM_Column_StartDate:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_LastUsedDate:
                  self.pdemColumnCalculator.columnLabels += record.value + ',';                             //ignore jslint - correct indentation
                  self.pdemColumnCalculator.columnTypes += 'DATE' + ',';                                    //ignore jslint - correct indentation
                  break;                                                                                    //ignore jslint - correct indentation
               case PDEM_Column_Price1:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price2:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price3:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price4:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price5:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price6:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price7:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price8:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Price9:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_Discount1:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount2:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount3:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount4:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount5:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount6:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount7:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount8:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_Discount9:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_RebAmount:                                                                  //ignore jslint - correct indentation
               case PDEM_Column_RebPercent:                                                                 //ignore jslint - correct indentation
               case PDEM_Column_CustNo:                                                                     //ignore jslint - correct indentation
               case PDEM_Column_VendorNo:                                                                   //ignore jslint - correct indentation
               case PDEM_Column_OverrideToleranceUp:
               case PDEM_Column_OverrideToleranceDown:
               case PDEM_Column_SharePercent:
               case PDEM_Column_CapSellAmount:
                  self.pdemColumnCalculator.columnLabels += record.value + ',';                             //ignore jslint - correct indentation
                  self.pdemColumnCalculator.columnTypes += 'DECIMAL' + ',';                                 //ignore jslint - correct indentation
                  break;                                                                                    //ignore jslint - correct indentation
               case PDEM_Column_Qty1:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Qty2:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Qty3:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Qty4:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Qty5:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Qty6:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Qty7:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_Qty8:                                                                       //ignore jslint - correct indentation
               case PDEM_Column_PricingRecNo:                                                               //ignore jslint - correct indentation
               case PDEM_Column_RebateRecNo:                                                                //ignore jslint - correct indentation
               case PDEM_Column_ContractLineNo:
                  self.pdemColumnCalculator.columnLabels += record.value + ',';                             //ignore jslint - correct indentation
                  self.pdemColumnCalculator.columnTypes += 'INTEGER' + ',';                                 //ignore jslint - correct indentation
                  break;                                                                                    //ignore jslint - correct indentation
               default:                                                                                     //ignore jslint - correct indentation
                  break;                                                                                    //ignore jslint - correct indentation
            }
         }
      }
   };

   self.continue = function () {
      if (self.isStep1) {
         if (!self.colToUpdate) {
            MessageService.alertOk('global.alert', 'message.please.select.a.column.type');
            return;
         }
         self.getColumnValue(self.colToUpdate);
         self.pdemColumnCalculator.updateColumn = self.selectedColumnValue;
         self.pdemColumnCalculator.formula = '';
         self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.2'),
                                                            MessageService.get('message.please.enter.a.value.or.select.a.column.to.use.for'));
      }
      else if (self.isStep2) {
         if (self.step2option === 'o') {
            self.columnValue = self.columnValue + ' ' + '(';
            self.holdColumnValues = self.holdColumnValues + '(';
            if (self.pdemColumnCalculator.formula) {
               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + '(';
            }
            else {
               self.pdemColumnCalculator.formula = '(';
            }
         }
         else {
            if (self.colLabel && self.step2option === 'd') {
               // Data Type
               self.getSelectedValue(self.colLabel);
               self.columnValue1 = self.columnValue + ' ' + self.step2ColValue;
               self.holdColumnValues = self.holdColumnValues + self.step2ColValue;
               if (self.pdemColumnCalculator.formula) {
                  self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + self.colLabel;
               }
               else {
                  self.pdemColumnCalculator.formula = self.colLabel;
               }
            }
            else if (self.value && self.step2option === 'c') {
               // Constant
               self.columnValue1 = self.columnValue + ' ' + self.value;
               self.holdColumnValues = self.holdColumnValues + self.value;
               if (self.pdemColumnCalculator.formula) {
                  self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + self.value;
               }
               else {
                  self.pdemColumnCalculator.formula = self.value;
               }
            }
            else {
               self.columnValue1 = self.columnValue;
            }

            self.setStepsVisibility(false, false, true, false, MessageService.get('global.step.3'),
                                                   MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
         }
      }
      else if (self.isStep3) {

         if (self.step3option === 'd') {
            self.setStepsVisibility(false, false, false, true, MessageService.get('global.step.4'), '');
         }
         else {

            if (self.step3option === 'c') {
               self.columnValue1 = self.columnValue1 + ' ' + ')';
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + ')';

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + ')';
            }
            else if (self.step3option === 'a') {
               self.columnValue1 = self.columnValue1 + ' ' + ADD;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + ADD;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + ADD;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
            else if (self.step3option === 's') {
               self.columnValue1 = self.columnValue1 + ' ' + SUB;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + SUB;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + SUB;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
            else if (self.step3option === 'm') {
               self.columnValue1 = self.columnValue1 + ' ' + MUL;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + MUL;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + MUL;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
            else if (self.step3option === 'e') {
               self.columnValue1 = self.columnValue1 + ' ' + EQUALTO;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + EQUALTO;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + EQUALTO;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
            else if (self.step3option === 'b') {
               self.columnValue1 = self.columnValue1 + ' ' + DIV;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + DIV;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + DIV;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
            else if (self.step3option === 'l') {
               self.columnValue1 = self.columnValue1 + ' ' + LESS;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + LESS;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + LESS;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
            else if (self.step3option === 'g') {
               self.columnValue1 = self.columnValue1 + ' ' + GREATER;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + GREATER;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + GREATER;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
            else if (self.step3option === 'n') {
               self.columnValue1 = self.columnValue1 + ' ' + NOT_EQUAL;
               self.columnValue = self.columnValue1;
               self.holdColumnValues = self.holdColumnValues + NOT_EQUAL;

               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula + String.fromCharCode(3) + NOT_EQUAL;

               self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.3'),
                                                                     MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            }
         }
      }
   };

   self.back = function () {
      var currentToken = null;
      var length;
      var lastOperand;
      var lastOperandDelimIndex;

      if (self.isStep2) {
         if (self.pdemColumnCalculator.formula && self.pdemColumnCalculator.formula.indexOf(String.fromCharCode(3)) >= 0) {
            length = self.pdemColumnCalculator.formula.length;
            lastOperand = self.pdemColumnCalculator.formula.substring(self.pdemColumnCalculator.formula.lastIndexOf(String.fromCharCode(3)), length);
            lastOperandDelimIndex = lastOperand.indexOf(String.fromCharCode(3));
            if (lastOperandDelimIndex >= 0) {
               currentToken = lastOperand.substring(lastOperandDelimIndex + 1, lastOperand.length);
            } else {
               currentToken = lastOperand;
            }
            if (self.columnValue.indexOf(currentToken) >= 0) {
               self.columnValue = self.columnValue.substring(0, self.columnValue.lastIndexOf(currentToken));
            }
            self.columnValue1 = self.columnValue;
            if (self.holdColumnValues.indexOf(currentToken) >= 0) {
               self.holdColumnValues = self.holdColumnValues.substring(0, self.holdColumnValues.lastIndexOf(currentToken));
            }
            self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula.substring(0, self.pdemColumnCalculator.formula.lastIndexOf(String.fromCharCode(3)));
         } else {
            lastOperand = self.pdemColumnCalculator.formula;
            lastOperandDelimIndex = lastOperand.indexOf(String.fromCharCode(3));
            if (lastOperandDelimIndex >= 0) {
               currentToken = lastOperand.substring(lastOperandDelimIndex + 1, lastOperand.length);
            } else {
               currentToken = lastOperand;
            }
            if (self.columnValue.indexOf(currentToken) >= 0) {
               self.columnValue = self.columnValue.substring(0, self.columnValue.lastIndexOf(currentToken));
            }
            self.columnValue1 = self.columnValue;
            if (self.holdColumnValues.indexOf(currentToken) >= 0) {
               self.holdColumnValues = self.holdColumnValues.substring(0, self.holdColumnValues.lastIndexOf(currentToken));
            }
            self.pdemColumnCalculator.formula = '';
         }
         if (currentToken === '=' || !self.pdemColumnCalculator.formula) {
            self.isStep1 = true;
            self.isStep2 = false;
            self.isStep3 = false;
            self.isStep4 = false;
            self.subTitle = 'Step 1';
         } else {
            self.isStep3 = true;
            self.isStep1 = false;
            self.isStep2 = false;
            self.isStep4 = false;
            self.subTitle = 'Step 3';
         }
      }
      else if (self.isStep3) {
         if (self.pdemColumnCalculator.formula && self.pdemColumnCalculator.formula.indexOf(String.fromCharCode(3)) >= 0) {
            length = self.pdemColumnCalculator.formula.length;
            lastOperand = self.pdemColumnCalculator.formula.substring(self.pdemColumnCalculator.formula.lastIndexOf(String.fromCharCode(3)), length);
            lastOperandDelimIndex = lastOperand.indexOf(String.fromCharCode(3));
            if (lastOperandDelimIndex >= 0) {
               currentToken = lastOperand.substring(lastOperandDelimIndex + 1, lastOperand.length);
            } else {
               currentToken = lastOperand;
            }
            if (self.columnValue.indexOf(currentToken) >= 0) {
               self.columnValue = self.columnValue.substring(0, self.columnValue.lastIndexOf(currentToken));
            }
            self.columnValue1 = self.columnValue;
            if (self.holdColumnValues.indexOf(currentToken) >= 0) {
               self.holdColumnValues = self.holdColumnValues.substring(0, self.holdColumnValues.lastIndexOf(currentToken));
            }
            if (currentToken !== '=') {
               self.pdemColumnCalculator.formula = self.pdemColumnCalculator.formula.substring(0, self.pdemColumnCalculator.formula.lastIndexOf(String.fromCharCode(3)));
            }
         } else {
            lastOperand = self.pdemColumnCalculator.formula;
            lastOperandDelimIndex = lastOperand.indexOf(String.fromCharCode(3));
            if (lastOperandDelimIndex >= 0) {
               currentToken = lastOperand.substring(lastOperandDelimIndex + 1, lastOperand.length);
            } else {
               currentToken = lastOperand;
            }
            if (self.columnValue.indexOf(currentToken) >= 0) {
               self.columnValue = self.columnValue.substring(0, self.columnValue.lastIndexOf(currentToken));
            }
            self.columnValue1 = self.columnValue;
            if (self.holdColumnValues.indexOf(currentToken) >= 0) {
               self.holdColumnValues = self.holdColumnValues.substring(0, self.holdColumnValues.lastIndexOf(currentToken));
            }
            self.pdemColumnCalculator.formula = '';
         }
         self.isStep3 = false;
         self.isStep1 = false;
         self.isStep2 = true;
         self.isStep4 = false;
         self.subTitle = 'Step 2';
      }
      else if (self.isStep4) {
         self.isStep1 = false;
         self.isStep2 = false;
         self.isStep3 = true;
         self.isStep4 = false;
         self.subTitle = 'Step 3';
      }
   };

   self.navigateToStep = function (step) {
      switch (step) {
         case 1:                                                                                                        //ignore jslint - correct indentation
            self.setStepsVisibility(true, false, false, false, MessageService.get('global.step.1'),                     //ignore jslint - correct indentation
                                                               MessageService.get('message.welcome.to.the.infor.distribution.sxe.column.calc'));
            break;                                                                                                      //ignore jslint - correct indentation
         case 2:                                                                                                        //ignore jslint - correct indentation
            self.setStepsVisibility(false, true, false, false, MessageService.get('global.step.2'),                     //ignore jslint - correct indentation
                                                               MessageService.get('message.please.enter.a.value.or.select.a.column.to.use.for'));
            break;                                                                                                      //ignore jslint - correct indentation
         case 3:                                                                                                        //ignore jslint - correct indentation
            self.setStepsVisibility(false, false, true, false, MessageService.get('global.step.3'),                     //ignore jslint - correct indentation
                                                               MessageService.get('message.please.select.an.operation.if.you.are.finished.en'));
            break;                                                                                                      //ignore jslint - correct indentation
         case 4:                                                                                                        //ignore jslint - correct indentation
            self.setStepsVisibility(false, false, false, true, MessageService.get('global.step.4'), '');                //ignore jslint - correct indentation
            break;                                                                                                      //ignore jslint - correct indentation
      }
   };

   self.setStepsVisibility = function (step1, step2, step3, step4, subtitle, message) {
      self.isStep1 = step1;
      self.isStep2 = step2;
      self.isStep3 = step3;
      self.isStep4 = step4;
      self.subTitle = subtitle;
      self.textMessage = message;
   };

   self.finish = function () {
      var formula = '';
      self.postFixString = '';
      self.pdemColumnCalculatorFinal = {};
      self.destination = self.colToUpdate;
      self.getColumnLabelTypes();

      self.pdemColumnCalculator.columnLabels = self.pdemColumnCalculator.columnLabels.slice(0, -1);
      self.pdemColumnCalculator.columnTypes = self.pdemColumnCalculator.columnTypes.slice(0, -1);

      self.pdemColumnCalculatorFinal = {
         columnLabels: self.pdemColumnCalculator.columnLabels,
         columnTypes: self.pdemColumnCalculator.columnTypes,
         formula: '',
         updateColumn: self.pdemColumnCalculator.updateColumn,
         formulavalidated: false
      };

      formula = self.pdemColumnCalculator.formula + String.fromCharCode(3);

      self.pdemColumnCalculatorFinal.formula = self.getFormula(formula);

      if (self.isExpressionBalanced(formula)) {
         self.convertToPostFix(formula);
         if (self.validateExpressionLocal(self.postFixString)) {

            if (formula.includes(String.fromCharCode(3))) {
               formula = self.pdemColumnCalculator.formula.replace(new RegExp(String.fromCharCode(3), 'g'), ',');
            }

            DataService.post('api/pd/aspdentry/pdemcolumncalculatorvalidate', { data: self.pdemColumnCalculatorFinal, busy: true }, function (response) {
               if (response) {

                  var pdscRecords;
                  switch (self.viewType) {
                     case 'PDSC1':                                                                                         //ignore jslint - correct indentation
                        pdscRecords = GridService.getSelectedRecords(base.pdsc1ResultsGrid);                               //ignore jslint - correct indentation
                        self.evaluatePDSC1AndUpdate(pdscRecords, response.updateColumn, self.postFixString);               //ignore jslint - correct indentation
                        break;                                                                                             //ignore jslint - correct indentation
                     case 'PDSC2':                                                                                         //ignore jslint - correct indentation
                        pdscRecords = GridService.getSelectedRecords(base.pdsc2ResultsGrid);                               //ignore jslint - correct indentation
                        self.evaluatePDSC2AndUpdate(pdscRecords, response.updateColumn, self.postFixString);               //ignore jslint - correct indentation
                        break;                                                                                             //ignore jslint - correct indentation
                     case 'PDSC3':                                                                                         //ignore jslint - correct indentation
                        pdscRecords = GridService.getSelectedRecords(base.pdsc3ResultsGrid);                               //ignore jslint - correct indentation
                        self.evaluatePDSC3AndUpdate(pdscRecords, response.updateColumn, self.postFixString);               //ignore jslint - correct indentation
                        break;                                                                                             //ignore jslint - correct indentation
                     case 'PDSR':                                                                                          //ignore jslint - correct indentation
                        var pdsrRecords = GridService.getSelectedRecords(base.pdsrResultsGrid);                            //ignore jslint - correct indentation
                        self.evaluatePDSRAndUpdate(pdsrRecords, response.updateColumn, self.postFixString);                //ignore jslint - correct indentation
                        break;                                                                                             //ignore jslint - correct indentation
                  }
               }
            });
         }
      }
   };


   self.getFormula = function (input) {
      var formula = '';
      if (input !== String.fromCharCode(3) && input) {
         var inputTemp = input.slice(0, -1);
         formula = inputTemp.replace(new RegExp(String.fromCharCode(3), 'g'), ',');
      }
      return formula;
   };

   self.isExpressionBalanced = function (expression) {
      var isValid = true;
      self.tokenStack = [];
      while (expression !== String.fromCharCode(3) && expression) {
         if (expression.includes(String.fromCharCode(3))) {
            var length = expression.length;
            var token = expression.substring(0, expression.indexOf(String.fromCharCode(3)));
            if (token === '(') {
               self.tokenStack.push(token);
            }
            else if (token === ')') {
               if (self.tokenStack.length !== 0) {
                  self.tokenStack.pop();
               }
               else {
                  isValid = false;
                  break;
               }
            }
            expression = expression.substring(expression.indexOf(String.fromCharCode(3)) + 1, length);
         }
         else {
            expression = '';
         }
      }
      if (isValid) {
         isValid = self.evaluationStack.length === 0;
      }
      return isValid;
   };

   self.convertToPostFix = function (formula) {
      var token = '';
      while (formula !== String.fromCharCode(3) && formula) {
         if (formula.includes(String.fromCharCode(3))) {
            var length = formula.length;
            token = formula.substring(0, formula.indexOf(String.fromCharCode(3)));
            formula = formula.substring(formula.indexOf(String.fromCharCode(3)) + 1, length);
            self.manipulate(token);
         }
         else {
            token = formula;
            self.manipulate(token);
            formula = '';
         }
      }
      while (self.evaluationStack.length !== 0) {
         self.postFixString = self.postFixString + self.evaluationStack.pop() + String.fromCharCode(3);
      }
   };

   self.manipulate = function (token) {

      // Must Build Data to handle two operands -> sent to getResult function call via validateExpressionLocal
      // Example:  (1+2+3) * 4   Load as 123++4*  Preformed (3+2) = 5 puts back 5, (5+1) = 6, puts back 6, (6*4) = 24
      //           4*(1+2+3)     Load as 4123++*  Preformed (3+2) = 5 puts back 5, (5+1) = 6, puts back 6, (6*4) = 24
      //           1+4*7         Loads 147*+      Performed (4*7) = 28 puts 28 back, (28+1) = 29   (* is weighted so loads first)
      //           4*7+1         Loads 47*1+      Performed (4*7) = 28 puts 28 back, (28+1) = 29
      //           1+3*4/2       Loads 1342/*+    Performed (4/2) = 2 puts 2 back, (2*3) = 6, puts back 6, 6+1 = 7
      //           (1+2+3)*(2+3) Loads 123++23+*  Result is 30

      var type = self.getTokenType(token);
      var arrayValue;
      var tokenPrecedence;
      var previousPrecedence;

      switch (type) {
         case 'Operand':                                                                                             //ignore jslint - correct indentation
            self.postFixString = self.postFixString + token + String.fromCharCode(3);                                //ignore jslint - correct indentation
            break;                                                                                                   //ignore jslint - correct indentation
         case 'Operator':                                                                                            //ignore jslint - correct indentation

            // First Operator - Load it
            if (self.evaluationStack.length === 0) {                                                                 //ignore jslint - correct indentation
               self.evaluationStack.push(token);                                                                     //ignore jslint - correct indentation
            } else {                                                                                                 //ignore jslint - correct indentation

               // Last Operator Entry
               arrayValue = self.evaluationStack.length - 1;                                                         //ignore jslint - correct indentation

               // Current Weighted Value
               self.getPrecedence(token);                                                                            //ignore jslint - correct indentation
               tokenPrecedence = self.precedence;                                                                    //ignore jslint - correct indentation

               // Last Entry Weighted Value
               self.getPrecedence(self.evaluationStack[arrayValue]);                                                 //ignore jslint - correct indentation
               previousPrecedence = self.precedence;                                                                 //ignore jslint - correct indentation

               // Compare Values - If Higher Switch - Pull Out and Set
               if (tokenPrecedence && previousPrecedence && tokenPrecedence < previousPrecedence) {                  //ignore jslint - correct indentation
                  self.postFixString = self.postFixString + self.evaluationStack.pop() + String.fromCharCode(3);     //ignore jslint - correct indentation
                  self.evaluationStack.push(token);                                                                  //ignore jslint - correct indentation
               } else {                                                                                              //ignore jslint - correct indentation
                  self.evaluationStack.push(token);                                                                  //ignore jslint - correct indentation
               }                                                                                                     //ignore jslint - correct indentation
            }                                                                                                        //ignore jslint - correct indentation
            break;                                                                                                   //ignore jslint - correct indentation
         case 'LeftParentheses':                                                                                     //ignore jslint - correct indentation
            self.evaluationStack.push(token);                                                                        //ignore jslint - correct indentation
            break;                                                                                                   //ignore jslint - correct indentation
         case 'RightParentheses':                                                                                    //ignore jslint - correct indentation
            while (self.evaluationStack.length !== 0) {                                                              //ignore jslint - correct indentation

               arrayValue = self.evaluationStack.length - 1;                                                         //ignore jslint - correct indentation

               // Force the evalulation stack - what is inside the ()
               if (self.evaluationStack[arrayValue] !== '(') {                                                       //ignore jslint - correct indentation
                  self.postFixString = self.postFixString + self.evaluationStack.pop() + String.fromCharCode(3);     //ignore jslint - correct indentation
               } else {                                                                                              //ignore jslint - correct indentation
                  self.evaluationStack.pop();                                                                        //ignore jslint - correct indentation
                  return;                                                                                            //ignore jslint - correct indentation
               }                                                                                                     //ignore jslint - correct indentation
            }                                                                                                        //ignore jslint - correct indentation
            break;                                                                                                   //ignore jslint - correct indentation
         default:                                                                                                    //ignore jslint - correct indentation
            break;                                                                                                   //ignore jslint - correct indentation
      }
   };

   self.getPrecedence = function (oper) {

      self.precedence = 0;

      if (oper === MUL || oper === DIV) {
         self.precedence = 5;
      }
      else if (oper === ADD || oper === SUB) {
         self.precedence = 4;
      }
      else if (oper === GREATER || oper === LESS) {
         self.precedence = 3;
      }
      else if (oper === NOT_EQUAL || oper === EQUALTO) {
         self.precedence = 1;
      }
      return self.precedence;
   };

   self.evaluatePDSC1AndUpdate = function (records, updateColumn, formula) {
      self.updatedPdsc1Records = [];

      records.forEach(function (selectedRecord) {
         var resultValue = self.evaluatePDEM(selectedRecord, formula);
         if (resultValue) {
            var isValid = self.validateResult(self.destination, resultValue);
            if (isValid) {
               self.updatedPdsc1Records.push(self.updatePDSCRecord(selectedRecord, self.destination, resultValue));
            }
         }
      });

      if (self.updatedPdsc1Records.length) {
         self.finishCompleted(self.updatedPdsc1Records);
      }
   };

   self.evaluatePDSC2AndUpdate = function (records, updateColumn, formula) {
      self.updatedPdsc2Records = [];

      records.forEach(function (selectedRecord) {
         var resultValue = self.evaluatePDEM(selectedRecord, formula);
         if (resultValue) {
            var isValid = self.validateResult(self.destination, resultValue);
            if (isValid) {
               self.updatedPdsc2Records.push(self.updatePDSCRecord(selectedRecord, self.destination, resultValue));
            }
         }
      });

      if (self.updatedPdsc2Records.length) {
         self.finishCompleted(self.updatedPdsc2Records);
      }
   };

   self.evaluatePDSC3AndUpdate = function (records, updateColumn, formula) {
      self.updatedPdsc3Records = [];

      records.forEach(function (selectedRecord) {
         var resultValue = self.evaluatePDEM(selectedRecord, formula);
         if (resultValue) {
            var isValid = self.validateResult(self.destination, resultValue);
            if (isValid) {
               self.updatedPdsc3Records.push(self.updatePDSCRecord(selectedRecord, self.destination, resultValue));
            }
         }
      });

      if (self.updatedPdsc3Records.length) {
         self.finishCompleted(self.updatedPdsc3Records);
      }
   };

   self.evaluatePDSRAndUpdate = function (records, updateColumn, formula) {
      self.updatedPdsrRecords = [];

      records.forEach(function (selectedRecord) {
         var resultValue = self.evaluatePDEM(selectedRecord, formula);
         if (resultValue) {
            var isValid = self.validateResult(self.destination, resultValue);
            if (isValid) {
               self.updatedPdsrRecords.push(self.updatePDSRRecord(selectedRecord, self.destination, resultValue));
            }
         }
      });

      if (self.updatedPdsrRecords.length) {
         self.finishCompleted(self.updatedPdsrRecords);
      }
   };

   self.validateResult = function (selectedColumn, value) {
      var isValid = true;
      var errorMessage = MessageService.get('message.operand.on.both.side.should.be.of.same.type');
      var destinationType = self.getDataType(selectedColumn);

      if (destinationType === 'number') {
         isValid = isFinite(value);
      }
      else if (destinationType === 'boolean') {
         var returnObject = self.validateBooleanToStringColumn(selectedColumn, value);
         isValid = returnObject.isValid;
         errorMessage = returnObject.errorMessage;
      }
      else if (destinationType === 'object') {
         var timestamp = Date.parse(value);
         isValid = !isNaN(timestamp);
      }

      if (!isValid) {
         MessageService.alertOk('global.alert', errorMessage);
      }
      return isValid;
   };

   self.validateBooleanToStringColumn = function (selectedColumn, value) {
      var isValid = true;
      var errorMessage = '';

      switch (selectedColumn) {
         case PDEM_Column_Update:                                                                                             //ignore jslint - correct indentation
         case PDEM_Column_AllowWithRebate:                                                                                    //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                    //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                          //ignore jslint - correct indentation
               isValid = (value.toUpperCase() === 'YES' || value.toUpperCase() === 'NO') ? true : false;                      //ignore jslint - correct indentation
            }                                                                                                                 //ignore jslint - correct indentation
            errorMessage = MessageService.get('global.input.value') + ':' + value + ' ' + MessageService.get('global.value.should.be.yes.or.no');     //ignore jslint - correct indentation
            break;                                                                                                            //ignore jslint - correct indentation
         case PDEM_Column_PrcType:                                                                                            //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                    //ignore jslint - correct indentation
            isValid = (value === '$' || value === '%') ? true : false;                                                        //ignore jslint - correct indentation
            errorMessage = MessageService.get('global.input.value') + ':' + value + ' ' + MessageService.get('global.value.should.be.dollar.or.percent');   //ignore jslint - correct indentation
            break;                                                                                                            //ignore jslint - correct indentation
         default:                                                                                                             //ignore jslint - correct indentation
            isValid = Boolean(value);                                                                                         //ignore jslint - correct indentation
            errorMessage = MessageService.get('message.operand.on.both.side.should.be.of.same.type');                         //ignore jslint - correct indentation
            break;                                                                                                            //ignore jslint - correct indentation
      }

      return {
         isValid: isValid,
         errorMessage: errorMessage
      };
   };

   self.updatePDSCRecord = function (selectedRecord, selectedColumn, value) {
      var decimalValue;
      var result;

      switch (selectedColumn) {
         case PDEM_Column_Update:                                                                                          //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.updttype = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);    //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.updttype = value;                                                                            //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_ContractNo:                                                                                      //ignore jslint - correct indentation
            selectedRecord.contractNo = value;                                                                             //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_PrcType:                                                                                         //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            selectedRecord.prctype = value === '$' ? true : value === '%' ? false : Boolean(value);                        //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetName:                                                                                  //ignore jslint - correct indentation
            selectedRecord.priceSheet = value;                                                                             //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetDt:                                                                                    //ignore jslint - correct indentation
            selectedRecord.priceEffectiveDate = value;                                                                     //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_EndDate:                                                                                         //ignore jslint - correct indentation
            selectedRecord.enddt = value;                                                                                  //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Reference:                                                                                       //ignore jslint - correct indentation
            selectedRecord.refer = value;                                                                                  //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Status:                                                                                          //ignore jslint - correct indentation
            selectedRecord.statustype = value;                                                                             //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_QtyBrkOn:                                                                                        //ignore jslint - correct indentation
            selectedRecord.qtybreakty = value;                                                                             //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Basis:                                                                                           //ignore jslint - correct indentation
            selectedRecord.priceonty = value;                                                                              //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price1:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult1 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price2:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult2 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price3:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult3 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price4:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult4 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price5:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult5 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price6:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult6 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price7:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult7 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price8:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult8 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Price9:                                                                                          //ignore jslint - correct indentation
            selectedRecord.prcmult9 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty1:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk1 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty2:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk2 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty3:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk3 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty4:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk4 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty5:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk5 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty6:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk6 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty7:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk7 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Qty8:                                                                                            //ignore jslint - correct indentation
            selectedRecord.qtybrk8 = value;                                                                                //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount1:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc1 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount2:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc2 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount3:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc3 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount4:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc4 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount5:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc5 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount6:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc6 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount7:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc7 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount8:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc8 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount9:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc9 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Modifier:                                                                                        //ignore jslint - correct indentation
            selectedRecord.modifiernm = value;                                                                             //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_AllowWithRebate:                                                                                 //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.modifierrebfl = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);  //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.modifierrebfl = value;                                                                       //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_HardPriceFlag:                                                                                 //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.hardpricefl = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);  //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.hardpricefl = value;                                                                       //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;
         case PDEM_Column_HardMaximumFlag:                                                                                 //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.hardmaxqtyfl = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);  //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.hardmaxqtyfl = value;                                                                       //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;
         case PDEM_Column_BasedOn:                                                                                       //ignore jslint - correct indentation
            selectedRecord.maxqtytype = value;                                                                               //ignore jslint - correct indentation
            break;
         case PDEM_Column_OverrideToleranceUp:                                                                                       //ignore jslint - correct indentation
            selectedRecord.ovrridepctup = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_OverrideToleranceDown:                                                                                       //ignore jslint - correct indentation
            selectedRecord.ovrridepctdown = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Discount9:                                                                                       //ignore jslint - correct indentation
            selectedRecord.prcdisc9 = value;                                                                               //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Modifier:                                                                                        //ignore jslint - correct indentation
            selectedRecord.modifiernm = value;                                                                             //ignore jslint - correct indentation
            break;
         default:                                                                                                          //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
      }
      return selectedRecord;
   };

   self.updatePDSRRecord = function (selectedRecord, selectedColumn, value) {
      var result;

      switch (selectedColumn) {
         case PDEM_Column_Update:                                                                                          //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.updttype = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);    //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.updttype = value;                                                                            //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_ContractNo:                                                                                      //ignore jslint - correct indentation
            selectedRecord.contractNo = value;                                                                             //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_EndDate:                                                                                         //ignore jslint - correct indentation
            selectedRecord.enddt = value;                                                                                  //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetName:                                                                                  //ignore jslint - correct indentation
            selectedRecord.priceSheet = value;                                                                             //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetDt:                                                                                    //ignore jslint - correct indentation
            selectedRecord.priceEffectiveDate = value;                                                                     //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_Reference:                                                                                       //ignore jslint - correct indentation
            selectedRecord.refer = value;                                                                                  //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_RebCalc:                                                                                         //ignore jslint - correct indentation
            selectedRecord.rebcalcty = value;                                                                              //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_MarginBasis:                                                                                     //ignore jslint - correct indentation
            selectedRecord.margincostty = value;                                                                           //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_RebFromBasis:                                                                                    //ignore jslint - correct indentation
            selectedRecord.rebatecostty = value;                                                                           //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_RebDownToBasis:                                                                                  //ignore jslint - correct indentation
            selectedRecord.rebdowntoty = value;                                                                            //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_RebAmount:                                                                                       //ignore jslint - correct indentation
            selectedRecord.rebateamt = value;                                                                              //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_RebPercent:                                                                                      //ignore jslint - correct indentation
            selectedRecord.rebatepct = value;                                                                              //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetNameTo:                                                                                //ignore jslint - correct indentation
            selectedRecord.priceSheetTo = value;                                                                           //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetDtTo:                                                                                  //ignore jslint - correct indentation
            selectedRecord.priceEffectiveDateTo = value;                                                                   //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
         case PDEM_Column_ShareRebate:                                                                                          //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.sharefl = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);    //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.sharefl = value;                                                                            //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;
         case PDEM_Column_CapSellType:                                                                                         //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            selectedRecord.capselltypefl = value === '$' ? true : value === '%' ? false : Boolean(value);                        //ignore jslint - correct indentation
            break;
         case PDEM_Column_ContractCostFlag:                                                                                          //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.contractcostfl = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);    //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.contractcostfl = value;                                                                            //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;
         case PDEM_Column_ManualFlag:                                                                                          //ignore jslint - correct indentation
            value = value !== null ? ((value !== true && value !== false) ? value.trim() : value) : value;                 //ignore jslint - correct indentation
            result = false;                                                                                                //ignore jslint - correct indentation
            if (value !== true && value !== false) {                                                                       //ignore jslint - correct indentation
               selectedRecord.manualfl = value.toUpperCase() === 'YES' ? true : value.toUpperCase() === 'NO' ? false : Boolean(value);    //ignore jslint - correct indentation
            } else {                                                                                                       //ignore jslint - correct indentation
               selectedRecord.manualfl = value;                                                                            //ignore jslint - correct indentation
            }                                                                                                              //ignore jslint - correct indentation
            break;
         case PDEM_Column_SharePercent:                                                                                      //ignore jslint - correct indentation
            selectedRecord.sharepct = value;                                                                             //ignore jslint - correct indentation
            break;
         case PDEM_Column_CapSellAmount:                                                                                      //ignore jslint - correct indentation
            selectedRecord.capsellamount = value;                                                                             //ignore jslint - correct indentation
            break;
         case PDEM_Column_ContractLineNo:                                                                                      //ignore jslint - correct indentation
            selectedRecord.contractlineno = value;                                                                             //ignore jslint - correct indentation
            break;
         default:                                                                                                          //ignore jslint - correct indentation
            break;                                                                                                         //ignore jslint - correct indentation
      }
      return selectedRecord;

   };

   self.evaluatePDEM = function (selectedRecord, postFixResult) {
      var pdemStringDelimiter = ',';
      var evaluationStack = [];

      while (postFixResult !== String.fromCharCode(3) && postFixResult) {
         if (postFixResult.includes(String.fromCharCode(3))) {
            var length = postFixResult.length;
            var token = postFixResult.substring(0, postFixResult.indexOf(String.fromCharCode(3)));
            var tokenType = self.getTokenType(token);
            postFixResult = postFixResult.substring(postFixResult.indexOf(String.fromCharCode(3)) + 1, length);
            switch (tokenType) {
               case 'Operand':                                                                                             //ignore jslint - correct indentation
                  evaluationStack.push(self.getOperandValuePDEM(selectedRecord, token));                                   //ignore jslint - correct indentation
                  break;                                                                                                   //ignore jslint - correct indentation
               case 'Operator':                                                                                            //ignore jslint - correct indentation
                  var operand1 = evaluationStack.pop();                                                                    //ignore jslint - correct indentation
                  var operand1DataType = self.getDataType(operand1);                                                       //ignore jslint - correct indentation
                  var operand2 = evaluationStack.pop();                                                                    //ignore jslint - correct indentation
                  var operand2DataType = self.getDataType(operand2);                                                       //ignore jslint - correct indentation

                  // reverse the order of the data to reflect the order of the screen calculation
                  var result = self.getResult(operand2, operand1, token);                                                  //ignore jslint - correct indentation
                  if (result !== null) {                                                                                   //ignore jslint - correct indentation
                     evaluationStack.push(result);                                                                         //ignore jslint - correct indentation
                  }                                                                                                        //ignore jslint - correct indentation
                  break;                                                                                                   //ignore jslint - correct indentation
               default:                                                                                                    //ignore jslint - correct indentation
                  break;                                                                                                   //ignore jslint - correct indentation
            }
         }
         else {
            break;
         }
      }
      var stackData = null;
      if (evaluationStack.length) {
         stackData = evaluationStack.pop();
      }
      return stackData !== null ? stackData : null;
   };

   self.getTokenType = function (token) {
      var opers = [ADD, SUB, MUL, DIV, GREATER, LESS, EQUALTO, NOT_EQUAL];
      var tokenType;
      if (opers.indexOf(token) >= 0) {
         tokenType = 'Operator';
      } else if (token.indexOf('(') >= 0) {
         tokenType = 'LeftParentheses';
      } else if (token.indexOf(')') >= 0) {
         tokenType = 'RightParentheses';
      } else {
         tokenType = 'Operand';
      }
      return tokenType;
   };

   self.getOperandValuePDEM = function (selectedRecord, operand) {
      var result;
      switch (operand) {
         case PDEM_Column_Update:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.updttype;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_CustNo:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.custno;                                                                 //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_ShipTo:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.custtype;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Product:                                                                          //ignore jslint - correct indentation
            result = selectedRecord.prod;                                                                   //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Description:                                                                      //ignore jslint - correct indentation
            result = selectedRecord.proddesc;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Description2:                                                                     //ignore jslint - correct indentation
            result = selectedRecord.proddesc2;                                                              //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_CrossReference:                                                                   //ignore jslint - correct indentation
            result = selectedRecord.xrefprod;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Whse:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.whse;                                                                   //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Region:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.region;                                                                 //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_ProductTy:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prodprcty;                                                              //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_ProdLine:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.prodline;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_ProdCat:                                                                          //ignore jslint - correct indentation
            result = selectedRecord.prodcat;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_ContractNo:                                                                       //ignore jslint - correct indentation
            result = selectedRecord.contractNo;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_PrcType:                                                                          //ignore jslint - correct indentation
            result = selectedRecord.prctype;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetName:                                                                   //ignore jslint - correct indentation
            result = selectedRecord.priceSheet;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetDt:                                                                     //ignore jslint - correct indentation
            result = selectedRecord.priceEffectiveDate;                                                     //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_StartDate:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.startdt;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_EndDate:                                                                          //ignore jslint - correct indentation
            result = selectedRecord.enddt;                                                                  //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Reference:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.refer;                                                                  //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Error:                                                                            //ignore jslint - correct indentation
            result = selectedRecord.cUpdErrMsg;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         // PDSC Specific
         case PDEM_Column_Units:                                                                            //ignore jslint - correct indentation
            result = selectedRecord.units;                                                                  //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Status:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.statustype;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_QtyBrkOn:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.qtybreakty;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Basis:                                                                            //ignore jslint - correct indentation
            result = selectedRecord.priceonty;                                                              //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price1:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult1;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price2:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult2;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price3:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult3;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price4:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult4;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price5:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult5;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price6:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult6;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price7:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult7;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price8:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult8;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Price9:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.prcmult9;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty1:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk1;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty2:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk2;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty3:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk3;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty4:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk4;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty5:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk5;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty6:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk6;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty7:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk7;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Qty8:                                                                             //ignore jslint - correct indentation
            result = selectedRecord.qtybrk8;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount1:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc1;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount2:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc2;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount3:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc3;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount4:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc4;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount5:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc5;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount6:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc6;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount7:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc7;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount8:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc8;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Discount9:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.prcdisc9;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_PricingRecNo:                                                                     //ignore jslint - correct indentation
            result = selectedRecord.pdrecno;                                                                //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_Modifier:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.modifiernm;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_AllowWithRebate:                                                                  //ignore jslint - correct indentation
            result = selectedRecord.modifierrebfl;                                                          //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_HardPriceFlag:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.hardpricefl;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_HardMaximumFlag:                                                                  //ignore jslint - correct indentation
            result = selectedRecord.hardmaxqtyfl;                                                          //ignore jslint - correct indentation
            break;
         case PDEM_Column_BasedOn:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.maxqtytype;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_OverrideToleranceUp:                                                                  //ignore jslint - correct indentation
            result = selectedRecord.ovrridepctup;                                                          //ignore jslint - correct indentation
            break;
         case PDEM_Column_OverrideToleranceDown:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.ovrridepctdown;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
            // PDSR Specific
         case PDEM_Column_RebCalc:                                                                          //ignore jslint - correct indentation
            result = selectedRecord.rebcalcty;                                                              //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_MarginBasis:                                                                      //ignore jslint - correct indentation
            result = selectedRecord.margincostty;                                                           //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebFromBasis:                                                                     //ignore jslint - correct indentation
            result = selectedRecord.rebatecostty;                                                           //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebDownToBasis:                                                                   //ignore jslint - correct indentation
            result = selectedRecord.rebdowntoty;                                                            //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebAmount:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.rebateamt;                                                              //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebPercent:                                                                       //ignore jslint - correct indentation
            result = selectedRecord.rebatepct;                                                              //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_VendorNo:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.vendno;                                                                 //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebType:                                                                          //ignore jslint - correct indentation
            result = selectedRecord.rebatety;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebSubType:                                                                       //ignore jslint - correct indentation
            result = selectedRecord.rebsubty;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_CustRebTy:                                                                        //ignore jslint - correct indentation
            result = selectedRecord.custrebty;                                                              //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_ShipTy:                                                                           //ignore jslint - correct indentation
            result = selectedRecord.dropshipty;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebCode:                                                                          //ignore jslint - correct indentation
            result = selectedRecord.rebatecd;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_CustType:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.custtype;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetNameTo:                                                                 //ignore jslint - correct indentation
            result = selectedRecord.priceSheetTo;                                                           //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_PriceSheetDtTo:                                                                   //ignore jslint - correct indentation
            result = selectedRecord.priceEffectiveDateTo;                                                   //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_RebateRecNo:                                                                      //ignore jslint - correct indentation
            result = selectedRecord.rebrecno;                                                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_ShareRebate:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.sharefl;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_SharePercent:                                                                  //ignore jslint - correct indentation
            result = selectedRecord.sharepct;                                                          //ignore jslint - correct indentation
            break;
         case PDEM_Column_CapSellAmount:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.capsellamount;                                                             //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
         case PDEM_Column_CapSellType:                                                                  //ignore jslint - correct indentation
            result = selectedRecord.capselltypefl;                                                          //ignore jslint - correct indentation
            break;
         case PDEM_Column_ManualFlag:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.manualfl;                                                             //ignore jslint - correct indentation
            break;
         case PDEM_Column_ContractLineNo:                                                                  //ignore jslint - correct indentation
            result = selectedRecord.contractlineno;                                                          //ignore jslint - correct indentation
            break;
         case PDEM_Column_ContractCostFlag:                                                                         //ignore jslint - correct indentation
            result = selectedRecord.contractcostfl;                                                             //ignore jslint - correct indentation
            break;
         default:                                                                                           //ignore jslint - correct indentation
            result = typeof operand === 'number' ? Number(operand) : operand;                               //ignore jslint - correct indentation
            break;                                                                                          //ignore jslint - correct indentation
      }
      return result;
   };

   self.finishCompleted = function (records) {
      var criteria = [];

      switch (self.viewType) {
         case 'PDSC1':
            records.forEach(function (item) {
               criteria.push({ pdemgridupdatepdsc1: self.setGridUpdatePDSCValues(item), lColOvrRd: true });
            });

            //User Hook (do not rename)
            if (self.setPdemGridUpdPdsc1MultipleCriteria) {
               self.setPdemGridUpdPdsc1MultipleCriteria(criteria);
            }

            DataService.post('api/pd/aspdentry/pdemgridupdatepdsc1multiple', { data: criteria, busy: true }, function (messaging) {
               if (messaging) {
                  MessageService.processMessaging(messaging);
               }
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            });
            break;
         case 'PDSC2':
            records.forEach(function (item) {
               criteria.push({ pdemgridupdatepdsc1: self.setGridUpdatePDSCValues(item), lColOvrRd: true });
            });

            //User Hook (do not rename)
            if (self.setPdemGridUpdPdsc2MultipleCriteria) {
               self.setPdemGridUpdPdsc2MultipleCriteria(criteria);
            }

            DataService.post('api/pd/aspdentry/pdemgridupdatepdsc2multiple', { data: criteria, busy: true }, function (messaging) {
               if (messaging) {
                  MessageService.processMessaging(messaging);
               }
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            });
            break;
         case 'PDSC3':
            records.forEach(function (item) {
               criteria.push({ pdemgridupdatepdsc1: self.setGridUpdatePDSCValues(item), lColOvrRd: true });
            });

            //User Hook (do not rename)
            if (self.setPdemGridUpdPdsc3MultipleCriteria) {
               self.setPdemGridUpdPdsc3MultipleCriteria(criteria);
            }

            DataService.post('api/pd/aspdentry/pdemgridupdatepdsc3multiple', { data: criteria, busy: true }, function (messaging) {
               if (messaging) {
                  MessageService.processMessaging(messaging);
               }
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            });
            break;
         case 'PDSR':
            records.forEach(function (item) {
               criteria.push({ pdemgridupdatepdsr: self.setGridUpdatePDSRValues(item), lColOvrRd: true });
            });

            //User Hook (do not rename)
            if (self.setPdemGridUpdPdsrMultipleCriteria) {
               self.setPdemGridUpdPdsrMultipleCriteria(criteria);
            }

            DataService.post('api/pd/aspdentry/pdemgridupdatepdsrmultiple', { data: criteria, busy: true }, function (messaging) {
               if (messaging) {
                  MessageService.processMessaging(messaging);
               }
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            });
            break;
      }

   };

   self.setGridUpdatePDSCValues = function (source) {
      var destination = {};

      if (source) {
         destination.updttype = source.updttype;
         destination.contractNo = source.contractNo;
         destination.prctype = source.prctype;
         destination.priceSheet = source.priceSheet;
         destination.priceEffectiveDate = source.priceEffectiveDate;
         destination.startdt = source.startdt;
         destination.enddt = source.enddt;
         destination.refer = source.refer;
         destination.statustype = source.statustype;
         destination.qtybreakty = source.qtybreakty;
         destination.priceonty = source.priceonty;
         destination.prcmult1 = source.prcmult1;
         destination.prcmult2 = source.prcmult2;
         destination.prcmult3 = source.prcmult3;
         destination.prcmult4 = source.prcmult4;
         destination.prcmult5 = source.prcmult5;
         destination.prcmult6 = source.prcmult6;
         destination.prcmult7 = source.prcmult7;
         destination.prcmult8 = source.prcmult8;
         destination.prcmult9 = source.prcmult9;
         destination.qtybrk1 = source.qtybrk1;
         destination.qtybrk2 = source.qtybrk2;
         destination.qtybrk3 = source.qtybrk3;
         destination.qtybrk4 = source.qtybrk4;
         destination.qtybrk5 = source.qtybrk5;
         destination.qtybrk6 = source.qtybrk6;
         destination.qtybrk7 = source.qtybrk7;
         destination.qtybrk8 = source.qtybrk8;
         destination.prcdisc1 = source.prcdisc1;
         destination.prcdisc2 = source.prcdisc2;
         destination.prcdisc3 = source.prcdisc3;
         destination.prcdisc4 = source.prcdisc4;
         destination.prcdisc5 = source.prcdisc5;
         destination.prcdisc6 = source.prcdisc6;
         destination.prcdisc7 = source.prcdisc7;
         destination.prcdisc8 = source.prcdisc8;
         destination.prcdisc9 = source.prcdisc9;
         destination.modifiernm = source.modifiernm;
         destination.modifierrebfl = source.modifierrebfl;
         destination.hardpricefl = source.hardpricefl;
         destination.hardmaxqtyfl = source.hardmaxqtyfl;
         destination.maxqtytype = source.maxqtytype;
         destination.ovrridepctup = source.ovrridepctup;
         destination.ovrridepctdown = source.ovrridepctdown;
         destination.pvPdmlineRowid = source.pvPdmlineRowid;
         destination.userfield = source.userfield;

         //User Hook (do not rename)
         if (self.setGridUpdatePDSCValuesContinue) {
            self.setGridUpdatePDSCValuesContinue(source, destination);
         }
      }
      return destination;
   };

   self.setGridUpdatePDSRValues = function (source) {
      var destination = {};

      if (source) {
         destination.updttype = source.updttype;
         destination.contractNo = source.contractNo;
         destination.startdt = source.startdt;
         destination.enddt = source.enddt;
         destination.rebcalcty = source.rebcalcty;
         destination.margincostty = source.margincostty;
         destination.rebatecostty = source.rebatecostty;
         destination.rebdowntoty = source.rebdowntoty;
         destination.rebateamt = source.rebateamt;
         destination.rebatepct = source.rebatepct;
         destination.priceSheet = source.priceSheet;
         destination.priceEffectiveDate = source.priceEffectiveDate;
         destination.priceSheetTo = source.priceSheetTo;
         destination.priceEffectiveDateTo = source.priceEffectiveDateTo;
         destination.refer = source.refer;
         destination.sharefl = source.sharefl;
         destination.sharepct = source.sharepct;
         destination.capsellamount = source.capsellamount;
         destination.capselltypefl = source.capselltypefl;
         destination.manualfl = source.manualfl;
         destination.contractlineno = source.contractlineno;
         destination.contractcostfl = source.contractcostfl;
         destination.pvPdmlineRowid = source.pvPdmlineRowid;
         destination.userfield = source.userfield;

         //User Hook (do not rename)
         if (self.setGridUpdatePDSRValuesContinue) {
            self.setGridUpdatePDSRValuesContinue(source, destination);
         }
      }
      return destination;
   };

   self.getResult = function (value1, value2, oper) {

      var result = null;
      var dateField1;
      var dateField2;
      var dateFormat;
      var logicalField;
      var typeValue1 = self.isDefined(value1);
      var typeValue2 = self.isDefined(value2);

      switch (oper) {
         case ADD:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               result = Number(value1) + Number(value2);
            } else if (typeValue1 === 'object' && typeValue2 === 'number') {
               dateField1 = new Date(value1);
               result = Utils.addSubtractDaysToDate(dateField1, Number(value2));
               dateFormat = $filter('date')(new Date(result), 'MM/dd/yyyy');
               result = dateFormat;
            } else if (typeValue2 === 'object' && typeValue1 === 'number') {
               dateField2 = new Date(value2);
               result = Utils.addSubtractDaysToDate(dateField2, Number(value1));
               dateFormat = $filter('date')(new Date(result), 'MM/dd/yyyy');
               result = dateFormat;
            }
            break;
         case SUB:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               result = Number(value1) - Number(value2);
            } else if (typeValue1 === 'object' && typeValue2 === 'number') {
               dateField1 = new Date(value1);
               result = Utils.addSubtractDaysToDate(dateField1, Number(value2 * -1));
               dateFormat = $filter('date')(new Date(result), 'MM/dd/yyyy');
               result = dateFormat;
            }
            break;
         case MUL:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               result = Number(value1) * Number(value2);
            }
            break;
         case DIV:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               result = Number(value1) / Number(value2);
            }
            break;
         case GREATER:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               logicalField = Number(value1) > Number(value2);
               result = logicalField.toString();
            } else if (typeValue1 === 'object' && typeValue1 === 'object') {
               dateField1 = new Date(value1);
               dateField2 = new Date(value2);
               logicalField = dateField1 > dateField2;
               result = logicalField.toString();
            } else if (typeValue2 === 'string' && typeValue1 === 'string') {
               logicalField = value1 > value2;
               result = logicalField.toString();
            }
            break;
         case LESS:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               logicalField = Number(value1) < Number(value2);
               result = logicalField.toString();
            } else if (typeValue1 === 'object' && typeValue2 === 'object') {
               dateField1 = new Date(value1);
               dateField2 = new Date(value2);
               logicalField = dateField1 < dateField2;
               result = logicalField.toString();
            } else if (typeValue1 === 'string' && typeValue2 === 'string') {
               logicalField = value1 < value2;
               result = logicalField.toString();
            }
            break;
         case EQUALTO:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               logicalField = Number(value1) === Number(value2);
               result = logicalField.toString();
            } else if (typeValue1 === 'object' && typeValue1 === 'object') {
               dateField1 = new Date(value1);
               dateField2 = new Date(value2);
               logicalField = dateField1 === dateField2;
               result = logicalField.toString();
            } else if (typeValue1 === 'string' && typeValue2 === 'string') {
               logicalField = value1 === value2;
               result = logicalField.toString();
            } else if (typeValue1 === 'boolean' && typeValue2 === 'boolean') {
               logicalField = value1 === value2;
               result = logicalField.toString();
            }
            break;
         case NOT_EQUAL:
            if (typeValue1 === 'number' && typeValue2 === 'number') {
               logicalField = Number(value1) !== Number(value2);
               result = logicalField.toString();
            } else if (typeValue1 === 'object' && typeValue2 === 'object') {
               dateField1 = new Date(value1);
               dateField2 = new Date(value2);
               logicalField = dateField1 !== dateField2;
               result = logicalField.toString();
            } else if (typeValue1 === 'string' && typeValue2 === 'string') {
               logicalField = value1 !== value2;
               result = logicalField.toString();
            } else if (typeValue1 === 'boolean' && typeValue2 === 'boolean') {
               logicalField = value1 !== value2;
               result = logicalField.toString();
            }
            break;
         default:
            break;
      }
      return result;

   };

   self.getColumnValue = function (key) {

      var lengthPDEMColumns = self.PDEMColumns.length;

      if (lengthPDEMColumns) {

         // Roll through the full list of Column choices
         for (var i = 0; i < lengthPDEMColumns; i++) {

            var record = self.PDEMColumns[i];

            if (record.value === key) {
               self.selectedColumnValue = record.value;
               return key = self.selectedColumnValue;
            }
         }
      }
      self.selectedColumnValue = '';
      return key = self.selectedColumnValue;
   };

   self.validateExpressionLocal = function (postFixFormula) {

      var evaluationStack = [];

      while (postFixFormula !== String.fromCharCode(3) && postFixFormula) {

         if (postFixFormula.includes(String.fromCharCode(3))) {
            var length = postFixFormula.length;
            var token = postFixFormula.substring(0, postFixFormula.indexOf(String.fromCharCode(3)));
            var tokenType = self.getTokenType(token);
            postFixFormula = postFixFormula.substring(postFixFormula.indexOf(String.fromCharCode(3)) + 1, length);

            switch (tokenType) {
               case 'Operand':
                  evaluationStack.push(token);
                  break;
               case 'Operator':
                  if (evaluationStack.length > 1) {
                     var operand1 = evaluationStack.pop();
                     var operand2 = evaluationStack.pop();
                     var operand1Type = self.getDataType(operand1);
                     var operand2Type = self.getDataType(operand2);
                     var isOperand1Valid = false;
                     var isOperand2Valid = false;

                     if (!operand1Type) {
                        isOperand1Valid = parseFloat(operand1).toFixed(2);
                        if (isOperand1Valid) {
                           operand1Type = 'number';
                        }
                     }
                     if (!operand2Type) {
                        isOperand2Valid = parseFloat(operand2).toFixed(2);
                        if (isOperand2Valid) {
                           operand2Type = 'number';
                        }
                     }

                     // Reverse the Data in the order they are used for Validation
                     var error = self.validateOperands(operand2Type, operand1Type, token);

                     if (error) {
                        MessageService.alertOk('global.alert', error);
                        return false;
                     } else {
                        if (isOperand1Valid) {

                           if (operand1Type === 'number' & operand1 === '0' && token === DIV) {
                              error = MessageService.get('message.invalid.operation..divide.by.zero');
                              MessageService.alertOk('global.alert', error);
                              return false;
                           }
                        }
                     }
                  }
                  break;
            }
         } else {
            break;
         }
      }
      return true;
   };

   self.getDataType = function (column) {
      switch (column) {
         case PDEM_Column_Update:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_CustNo:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_ShipTo:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Product:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Description:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Description2:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_CrossReference:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Units:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Whse:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Region:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_ProductTy:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_ProdLine:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_ProdCat:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_ContractNo:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_PrcType:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_PriceSheetName:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_PriceSheetDt:
            self.columnDataType = 'object';
            break;
         case PDEM_Column_StartDate:
            self.columnDataType = 'object';
            break;
         case PDEM_Column_EndDate:
            self.columnDataType = 'object';
            break;
         case PDEM_Column_Reference:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Status:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_QtyBrkOn:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Basis:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_Price1:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price2:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price3:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price4:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price5:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price6:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price7:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price8:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Price9:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty1:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty2:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty3:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty4:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty5:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty6:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty7:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Qty8:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount1:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount2:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount3:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount4:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount5:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount6:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount7:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount8:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Discount9:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_Modifier:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_HardPriceFlag:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_HardMaximumFlag:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_BasedOn:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_OverrideToleranceUp:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_OverrideToleranceDown:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_AllowWithRebate:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_RebCalc:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_MarginBasis:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_RebFromBasis:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_RebDownToBasis:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_RebAmount:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_RebPercent:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_PriceSheetNameTo:
            self.columnDataType = 'string';
            break;
         case PDEM_Column_PriceSheetDtTo:
            self.columnDataType = 'object';
            break;
         case PDEM_Column_ShareRebate:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_SharePercent:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_CapSellAmount:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_CapSellType:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_ManualFlag:
            self.columnDataType = 'boolean';
            break;
         case PDEM_Column_ContractLineNo:
            self.columnDataType = 'number';
            break;
         case PDEM_Column_ContractCostFlag:
            self.columnDataType = 'boolean';
            break;
         default:
            // Field not on the Columns - just an entered value in the calculation
            self.columnDataType = self.isDefined(column);
            break;
      }
      return self.columnDataType;
   };

   self.isDefined = function (fieldValue) {

      var isValidNumber = isFinite(fieldValue);
      if (isValidNumber) {
         return 'number';
      }

      var timestamp = Date.parse(fieldValue);
      var isValidDate = !isNaN(timestamp);
      if (isValidDate) {
         return 'object';
      }

      var isValidString = angular.isString(fieldValue);
      if (isValidString) {
         return 'string';
      }

      if (fieldValue === 'true' || fieldValue === 'false' || fieldValue === 'yes' || fieldValue === 'no') {
         return 'boolean';
      }

      return 'undefined';
   };

   self.validateOperands = function (value1, value2, oper) {

      var errorMessage = '';

      switch (oper) {
         case ADD:
            if (value1 === 'boolean' || value2 === 'boolean') {
               errorMessage = MessageService.get('message.invalid.formula.logical.field.used') + MessageService.get('message.in.addition.calculation');
            }
            else if (value1 === 'string' || value2 === 'string') {
               errorMessage = MessageService.get('message.invalid.formula.character.field.used') + MessageService.get('message.in.addition.calculation');
            }
            break;
         case SUB:
            if (value1 === 'boolean' || value2 === 'boolean') {
               errorMessage = MessageService.get('message.invalid.formula.logical.field.used') + MessageService.get('message.in.subtraction.calculation');
            }
            else if (value1 !== 'object' && value2 === 'object') {
               errorMessage = MessageService.get('message.date.field.used.as.second.field.in.subtraction');
            }
            else if (value1 === 'string' || value2 === 'string') {
               errorMessage = MessageService.get('message.invalid.formula.character.field.used') + MessageService.get('message.in.subtraction.calculation');
            }
            break;
         case MUL:
            if (value1 === 'string' || value2 === 'string') {
               errorMessage = MessageService.get('message.invalid.formula.character.field.used') + MessageService.get('message.in.multiplication.calculation');
            }
            else if (value1 === 'object' || value2 === 'object') {
               errorMessage = MessageService.get('message.invalid.formula.date.field.used') + MessageService.get('message.in.multiplication.calculation');
            }
            else if (value1 === 'boolean' || value2 === 'boolean') {
               errorMessage = MessageService.get('message.invalid.formula.logical.field.used') + MessageService.get('message.in.multiplication.calculation');
            }
            break;
         case DIV:
            if (value1 !== 'number' || value2 !== 'number') {
               errorMessage = MessageService.get('message.invalid.formula.both.fields.in.division.must.be.numeric');
            }
            break;
         case GREATER:
         case LESS:
         case EQUALTO:
         case NOT_EQUAL:
            if ((value1 === 'string' && value2 !== 'string') || (value1 !== 'string' && value2 === 'string') ||
                (value1 === 'object' && value2 !== 'object') || (value1 !== 'object' && value2 === 'object') ||
                (value1 === 'boolean' && value2 !== 'boolean') || (value1 !== 'boolean' && value2 === 'boolean')) {
               errorMessage = MessageService.get('message.when.one.field.in.the.calculation.is.a.logical.character');
            }
            break;
      }
      return errorMessage;
   };

});

app.controller('PdemImportCtrl', function ($scope, $state, $stateParams, $timeout, $translate, DataService, GridService, MessageService, Constants, Utils) {
   var self = this;
   var base = $scope.base;

   var defaultRecordType = '';
   var defaultDestination = '';
   var origHeaders = [];
   self.processing = false;
   var stringName = '';
   var runCSV = false;
   var runXLSX = false;

   // Load the PDSC or PDSR Default Values
   if (base.defaultRecordType === 'P' && base.defaultPDSCCode) {
      defaultRecordType = 'P';
      defaultDestination = base.defaultPDSCCode;
      base.isRebateType = false;
   } else if (base.defaultRecordType === 'R' && base.defaultPDSRCode) {
      defaultRecordType = 'R';
      defaultDestination = base.defaultPDSRCode;
      base.isRebateType = true;
   }

   // If nothing setup in AO for PDSC or PDSR - Leave Create
   if (!defaultRecordType) {
      MessageService.error('global.error', 'error.system.records.not.setup.for.pricing.rebate.records');
      $state.go('pdem.master');
   }

   self.fileState = function () {
      if (self.processing) {
         return $translate.instant('global.processing');
      }
   };

   // Product hyperlink
   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.cProd });
      }
   };

   // Customer hyperlink
   self.customerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('aric.detail', { pk: currentRow.iCustNo });
      }
   };

   // Ship To
   self.shiptoHyperlink = function (e, args) {
      var currentRow = args[0].item;

      if (currentRow && currentRow.iCustNo > 0 && currentRow.cShipTo > '') {
         $state.go('aric.detail', { pk: currentRow.iCustNo, pk2: currentRow.cShipTo });
      }
   };

   // Vendor hyperlink
   self.vendorHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.iCustNo });
      }
   };

   self.clear = function () {

      self.pdemExcelImportNewCriteria = {
         dtStartDt: Utils.getCurrentDate(),
         cDestination: defaultDestination,
         dropdowntype: defaultRecordType
      };

      base.excelNewSetResultsDefault = [];
      self.importedFile = '';
      origHeaders = [];

      self.visible = false;
      self.importNewFileData = [];
      self.importNewFileSingle = {
         btnLookupLookandFeel2Sensitive: true,
         btnLookupWhseSensitive: true,
         cbDestinationSensitive: true,
         fiEndDtSensitive: true,
         fiImportFileSensitive: true,
         fiStartDtSensitive: true,
         fiWhseSensitive: true,
         tgPriceRebFlSensitive:true
      };
   };

   self.clear();

   self.recordTypeChanged = function () {
      base.loadNewRecordTypeChange(self.pdemExcelImportNewCriteria.cDestination);
      base.excelNewSetResultsDefault = [];
   };

   // Load the Initial Defaults to the Screen
   self.recordTypeChanged();

   // Re-Load default if the Record Type Changes
   self.loadRecordTypeDefault = function (recordType) {

      if (recordType === 'P') {
         if (base.defaultPDSCCode) {
            self.pdemExcelImportNewCriteria.cDestination = base.defaultPDSCCode;
            self.recordTypeChanged();
         } else {
            MessageService.error('global.error', 'error.system.records.not.setup.for.pricing.records');
         }
      }

      if (recordType === 'R') {
         if (base.defaultPDSRCode) {
            self.pdemExcelImportNewCriteria.cDestination = base.defaultPDSRCode;
            self.recordTypeChanged();
         } else {
            MessageService.error('global.error', 'error.system.records.not.setup.for.rebate.records');
         }
      }
   };

   self.create = function () {

      self.pdemExcelImportNewCriteria.cImportFile = '';
      if (self.importedFile) {
         self.pdemExcelImportNewCriteria.cImportFile = self.importedFile.name;
      }

      DataService.post('api/pd/aspdentry/pdemexcelimportaddnewset', { data: self.pdemExcelImportNewCriteria, busy: true }, function (data) {
         if (data) {
            self.importNewFileSingle = data;
            $state.go('.create', {
               criteria: self.pdemExcelImportNewCriteria
            });
         }
      });
   };

   self.import = function () {
      if (self.importedFile) {
         stringName = self.importedFile.name.toLowerCase();
         runCSV = stringName.endsWith('.csv');
         runXLSX = stringName.endsWith('.xlsx');
         self.processing = true;
         $timeout(function () {
            Utils.readAsBinaryString(self.importedFile, self.fileReaderOnLoadCallback);
         });
      } else {
         MessageService.error('global.error', 'global.input.file.is.required');
      }
   };

   self.fileReaderOnLoadCallback = function (data) {
      var workbook;

      if (runCSV) {
         MessageService.error('global.error', 'message.error.convert.file.before.import');
         self.processing = false;
         return;
      } else if (runXLSX) {
         workbook = XLSX.read(data, { type: 'binary' });
      } else {
         workbook = XLS.read(data, { type: 'binary' });
      }

      var firstSheetName = workbook.SheetNames[0];

      self.importNewFileData = [];
      var columnsList = self.getHeaderRow(workbook.Sheets[firstSheetName]);

      if (runXLSX === true) {
         var importedRecords = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheetName]);
      } else {
         var importedRecords = XLS.utils.sheet_to_row_object_array(workbook.Sheets[firstSheetName]);
      }

      if (importedRecords) {
         var rowCount = 1;
         importedRecords.forEach(function (record) {
            var rowData = self.processRowData(record, origHeaders);

            var newFiledata = {
               cColValues: rowData,
               rowNumber: rowCount
            };

            self.importNewFileData.push(newFiledata);

            if (rowCount < importedRecords.length) {
               rowCount++;
            }
         });
      }

      self.importNewFileSingle.cColLabels = '';

      // Array starts at zero so shorten the length to avoid the 'undefined' value in an extra position
      var lengthColumns = columnsList.length - 1;

      for (var i = 0; i <= lengthColumns; i++) {
         self.importNewFileSingle.cColLabels += columnsList[i];

         // Only load the delimiter to the last position if another value will be loaded - do not load delimiter in last position
         // The back end logic trims off the delimiter if it exists for the Column Labels, but not the Values
         if (i < lengthColumns) {
            self.importNewFileSingle.cColLabels += String.fromCharCode(3);
         }
      }

      self.pdemExcelImportNewCriteria.cImportFile = self.importedFile.name;

      var excelimportnewresults = [];
      excelimportnewresults = base.excelNewSetResultsDefault;

      var excelImport = {
         pdemexcelimportnewresults: excelimportnewresults,
         pdemimportnewfiledata: self.importNewFileData,
         pdemexcelimportnewcriteria: self.pdemExcelImportNewCriteria,
         pdemimportnewfilesingle: self.importNewFileSingle
      };

      DataService.post('api/pd/aspdentry/pdemexcelimportnewok', { timeout: Constants.EXCEL_LOAD_UPDATE_ETENDED_TIMEOUT, data: excelImport, busy: true }, function (response) {
         if (response) {
            if (response.pdemimportnewexcelerrors && response.pdemimportnewexcelerrors.length) {

               MessageService.alertOk('global.error', 'message.errors.have.been.found.during.import', function () {
                  self.importErrorsToExcel(response.pdemimportnewexcelerrors);
               });
            } else {
               MessageService.info('global.information', 'global.set.import.complete');
               self.clear();
            }
         }
         self.processing = false;
      });
   };

   self.processRowData = function (record, columnsList) {
      var rowData = '';

      // Array starts at zero so shorten the length to avoid the 'undefined' value in an extra position
      var lengthColumns = columnsList.length - 1;

      for (var i = 0; i <= lengthColumns; i++) {
         var columnValue = columnsList[i];

         var dataValue = record[columnValue];
         var badData = undefined;

         if (dataValue === badData || dataValue === null) {
            dataValue = '';
         }

         if (columnValue === badData || columnValue === null || columnValue === 0) {
            columnValue = '';
         }

         // Overriding Column 'New Record' Import Values that are Descriptions in the Detail Grids

         // Pricing - prctype - Must be symbol/$/% raw data - actual field is True/False - foramtted as $/%
         if (columnValue === $translate.instant('global.price.type') || columnValue.toLowerCase() === 'price type') {
            if (dataValue.toLowerCase() === $translate.instant('global.amount').toLowerCase() || dataValue === '$' ||
               dataValue.toLowerCase() === $translate.instant('global.amt').toLowerCase() || dataValue === base.currencySymbol ||
               dataValue.toLowerCase() === 'amount' || dataValue.toLowerCase() === 'amt') {
               dataValue = base.currencySymbol;
            } else if (dataValue.toLowerCase() === $translate.instant('global.percent').toLowerCase() ||
               dataValue.toLowerCase() === $translate.instant('global.pct').toLowerCase() ||
               dataValue === '%' || dataValue.toLowerCase() === 'percent' || dataValue.toLowerCase() === 'pct') {
               dataValue = '%';
            }
         }

         // Pricing - statustype - must be A/I/Active/Inactive raw data - actual field is true/false - formatted as Active/Inactive
         if (columnValue === $translate.instant('global.status.type') || columnValue.toLowerCase() === 'status type') {
            if (dataValue.toLowerCase() === $translate.instant('global.active').toLowerCase() || dataValue.toLowerCase() === 'a' ||
               dataValue.toLowerCase() === 'active') {
               dataValue = 'Active';
            } else if (dataValue.toLowerCase() === $translate.instant('global.inactive').toLowerCase() || dataValue .toLowerCase() === 'i' ||
               dataValue.toLowerCase() === 'inactive') {
               dataValue = 'Inactive';
            }
         }

         // Pricing - qtybreakty - must be P/D/Blank raw data - Convert Valid Descriptions
         if (columnValue === $translate.instant('global.quantity.break.type') || columnValue.toLowerCase() === 'quantity break type') {
            if (dataValue.toLowerCase() === $translate.instant('global.price').toLowerCase() || dataValue.toLowerCase() === 'price') {
               dataValue = 'P';
            } else if (dataValue.toLowerCase() === $translate.instant('global.discount').toLowerCase() || dataValue.toLowerCase() === 'discount') {
               dataValue = 'D';
            }
         }

         // Drop Ship Type - dropshipty - must be W or D raw data - Convert Valid Descriptions
         if (columnValue === $translate.instant('global.drop.ship.type') || columnValue.toLowerCase() === 'drop ship type') {
            if (dataValue.toLowerCase() === $translate.instant('global.warehouse').toLowerCase() || dataValue.toLowerCase() === 'warehouse' ||
               dataValue.toLowerCase() === 'whse') {
               dataValue = 'W';
            } else if (dataValue.toLowerCase() === $translate.instant('global.drop.ship').toLowerCase() || dataValue.toLowerCase() === 'drop ship' ||
               dataValue.toLowerCase() === 'dropship') {
               dataValue = 'D';
            }
         }

         // Rebate Code - rebatecd - must be S/P/C raw data - Convert Valid Descriptions
         if (columnValue === $translate.instant('global.rebate.code') || columnValue.toLowerCase() === 'rebate code') {
            if (dataValue.toLowerCase() === $translate.instant('global.vendor.on.sale').toLowerCase() || dataValue.toLowerCase() === 'vendor on sale') {
               dataValue = 'S';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.on.purchase').toLowerCase() || dataValue.toLowerCase() === 'vendor on purchase') {
               dataValue = 'P';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.rebate').toLowerCase() || dataValue.toLowerCase() === 'customer rebate') {
               dataValue = 'C';
            }
         }

         // Pricing (Basis) - priceonty - must be B,C,L,M,RM,RC,CB,CR,CS,MR,MS,C1-9,V1-9/Blank raw data - Convert Valid Descriptions
         if (columnValue === $translate.instant('global.basis') || columnValue.toLowerCase() === 'basis') {
            if (dataValue.toLowerCase() === $translate.instant('global.base.price').toLowerCase() || dataValue.toLowerCase() === 'base price') {
               dataValue = 'B';
            } else if (dataValue.toLowerCase() === $translate.instant('global.cost').toLowerCase() || dataValue.toLowerCase() === 'cost') {
               dataValue = 'C';
            } else if (dataValue.toLowerCase() === $translate.instant('global.list.price').toLowerCase() || dataValue.toLowerCase() === 'list price') {
               dataValue = 'L';
            } else if (dataValue.toLowerCase() === $translate.instant('global.margin').toLowerCase() || dataValue.toLowerCase() === 'margin') {
               dataValue = 'M';
            } else if (dataValue.toLowerCase() === $translate.instant('global.rebated.margin').toLowerCase() || dataValue.toLowerCase() === 'rebated margin') {
               dataValue = 'RM';
            } else if (dataValue.toLowerCase() === $translate.instant('global.rebated.cost').toLowerCase() || dataValue.toLowerCase() === 'rebated cost') {
               dataValue = 'RC';
            } else if (dataValue.toLowerCase() === $translate.instant('global.rebate.cost').toLowerCase() || dataValue.toLowerCase() === 'rebate cost') {
               dataValue = 'CB';
            } else if (dataValue.toLowerCase() === $translate.instant('global.replacement.cost').toLowerCase() || dataValue.toLowerCase() === 'replacement cost') {
               dataValue = 'CR';
            } else if (dataValue.toLowerCase() === $translate.instant('global.standard.cost').toLowerCase() || dataValue.toLowerCase() === 'standard cost') {
               dataValue = 'CS';
            } else if (dataValue.toLowerCase() === $translate.instant('global.margin.with.repl.cost').toLowerCase() || dataValue.toLowerCase() === 'margin (with repl cost)') {
               dataValue = 'MR';
            } else if (dataValue.toLowerCase() === $translate.instant('global.margin.with.std.cost').toLowerCase() || dataValue.toLowerCase() === 'margin (with std cost)') {
               dataValue = 'MS';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.1').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 1') {
               dataValue = 'C1';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.2').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 2') {
               dataValue = 'C2';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.3').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 3') {
               dataValue = 'C3';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.4').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 4') {
               dataValue = 'C4';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.5').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 5') {
               dataValue = 'C5';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.6').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 6') {
               dataValue = 'C6';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.7').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 7') {
               dataValue = 'C7';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.8').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 8') {
               dataValue = 'C8';
            } else if (dataValue.toLowerCase() === $translate.instant('global.customer.sheet.column.9').toLowerCase() ||
               dataValue.toLowerCase() === 'customer sheet column 9') {
               dataValue = 'C9';
            }  else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.1').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 1') {
               dataValue = 'V1';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.2').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 2') {
               dataValue = 'V2';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.3').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 3') {
               dataValue = 'V3';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.4').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 4') {
               dataValue = 'V4';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.5').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 5') {
               dataValue = 'V5';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.6').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 6') {
               dataValue = 'V6';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.7').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 7') {
               dataValue = 'V7';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.8').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 8') {
               dataValue = 'V8';
            } else if (dataValue.toLowerCase() === $translate.instant('global.vendor.sheet.column.9').toLowerCase() ||
               dataValue.toLowerCase() === 'vendor sheet column 9') {
               dataValue = 'V9';
            }
         }

         // Pricing - maxqtytype - must be C/P/S/W raw data - Convert Valid Descriptions
         if (columnValue === $translate.instant('global.based.on') || columnValue.toLowerCase() === 'based on') {
            if (dataValue.toLowerCase() === $translate.instant('global.cube').toLowerCase() || dataValue.toLowerCase() === 'cube') {
               dataValue = 'C';
            } else if (dataValue.toLowerCase() === $translate.instant('global.spc.unit').toLowerCase() || dataValue.toLowerCase() === 'spc unit') {
               dataValue = 'P';
            } else if (dataValue.toLowerCase() === $translate.instant('global.stocking.unit').toLowerCase() || dataValue.toLowerCase() === 'stocking unit') {
               dataValue = 'S';
            } else if (dataValue.toLowerCase() === $translate.instant('global.weight').toLowerCase() || dataValue.toLowerCase() === 'weight') {
               dataValue = 'W';
            }
         }

         // Reabtes - rebcalcty - $, %, N, M
         if (columnValue === $translate.instant('global.rebate.calculation.type') ||
            columnValue === $translate.instant('global.rebate.calc.type') ||
            columnValue.toLowerCase() === 'rebate calculation type' || columnValue.toLowerCase() === 'rebate calc type') {
            if (dataValue.toLowerCase() === $translate.instant('global.amount').toLowerCase() || dataValue === '$' ||
               dataValue.toLowerCase() === $translate.instant('global.amt').toLowerCase() || dataValue === base.currencySymbol ||
               dataValue.toLowerCase() === 'amount' || dataValue.toLowerCase() === 'amt') {
               dataValue = base.currencySymbol;
            } else if (dataValue.toLowerCase() === $translate.instant('global.percent').toLowerCase() ||
               dataValue.toLowerCase() === $translate.instant('global.pct').toLowerCase() ||
               dataValue === '%' || dataValue.toLowerCase() === 'percent' || dataValue.toLowerCase() === 'pct') {
               dataValue = '%';
            } else if (dataValue.toLowerCase() === $translate.instant('global.net').toLowerCase() ||
               dataValue.toLowerCase() === 'net') {
               dataValue = 'N';
            } else if (dataValue.toLowerCase() === $translate.instant('global.margin.guaranteed').toLowerCase() ||
               dataValue.toLowerCase() === $translate.instant('global.margin').toLowerCase() ||
               dataValue.toLowerCase() === 'margin guaranteed' || dataValue.toLowerCase() === 'margin') {
               dataValue = 'M';
            }
         }

         // Rebates - capselltypefl - foramtted as $/% - Logical
         if (columnValue === $translate.instant('global.cap.sell.type') || columnValue.toLowerCase() === 'cap sell type') {
            if (dataValue.toLowerCase() === $translate.instant('global.amount').toLowerCase() || dataValue === '$' ||
               dataValue.toLowerCase() === $translate.instant('global.amt').toLowerCase() || dataValue === base.currencySymbol ||
               dataValue.toLowerCase() === 'amount' || dataValue.toLowerCase() === 'amt' ||
               dataValue.toLowerCase() === $translate.instant('global.yes').toLowerCase() ||
               dataValue.toLowerCase() === $translate.instant('global.true').toLowerCase() ||
               dataValue.toLowerCase() === $translate.instant('global.y').toLowerCase() ||
               dataValue.toLowerCase() === 'yes' ||
               dataValue.toLowerCase() === 'true' ||
               dataValue.toLowerCase() === 'y') {
               dataValue = true;
            } else {
               dataValue = false;
            }
         }

         // Logical Column Fields - load true or false
         if (columnValue === $translate.instant('global.update.type') || columnValue.toLowerCase() === 'update type') {
            dataValue = self.loadLogicalColValue(dataValue.toLowerCase());
         }
         if (columnValue === $translate.instant('global.share.rebate') || columnValue.toLowerCase() === 'share rebate') {
            dataValue = self.loadLogicalColValue(dataValue.toLowerCase());
         }
         if (columnValue === $translate.instant('global.manual.rebate') || columnValue.toLowerCase() === 'manual rebate') {
            dataValue = self.loadLogicalColValue(dataValue.toLowerCase());
         }
         if (columnValue === $translate.instant('global.contract.cost') || columnValue.toLowerCase() === 'contract cost') {
            dataValue = self.loadLogicalColValue(dataValue.toLowerCase());
         }
         if (columnValue === $translate.instant('global.allow.with.rebate') || columnValue.toLowerCase() === 'allow with rebate') {
            dataValue = self.loadLogicalColValue(dataValue.toLowerCase());
         }
         if (columnValue === $translate.instant('global.hard.system.price') || columnValue.toLowerCase() === 'hard system price') {
            dataValue = self.loadLogicalColValue(dataValue.toLowerCase());
         }
         if (columnValue === $translate.instant('global.hard.maximum') || columnValue.toLowerCase() === 'hard maximum') {
            dataValue = self.loadLogicalColValue(dataValue.toLowerCase());
         }

         // Rebates - rebatecostty
         if (columnValue === $translate.instant('global.rebate.from.basis') || columnValue.toLowerCase() === 'rebate from basis') {
            dataValue = self.loadRebateColValue(dataValue.toLowerCase());
         }

         // Rebates - margincostty
         if (columnValue === $translate.instant('global.margin.basis') || columnValue.toLowerCase() === 'margin basis') {
            dataValue = self.loadRebateColValue(dataValue.toLowerCase());
         }

         // Rebates - rebdowntoty
         if (columnValue === $translate.instant('global.rebate.down.to.basis') || columnValue.toLowerCase() === 'rebate down to basis') {
            dataValue = self.loadRebateColValue(dataValue.toLowerCase());
         }

         rowData += (dataValue) ? dataValue : '';

         // Only load the delimiter to the last position if another value will be loaded - do not load delimiter in last position
         // The back end logic trims off the delimiter if it exists for the Column Labels, but not the Values
         if (i < lengthColumns) {
            rowData += String.fromCharCode(3);
         }
      }
      return rowData;
   };

   self.loadLogicalColValue = function (columnValue) {
      if (columnValue === $translate.instant('global.yes').toLowerCase() ||
         columnValue === $translate.instant('global.true').toLowerCase() ||
         columnValue === $translate.instant('global.y').toLowerCase() ||
         columnValue === 'yes' ||
         columnValue === 'true' ||
         columnValue === 'y') {
         return true;
      } else {
         return false;
      }
   };

   self.loadRebateColValue = function (columnValue) {

      if (columnValue === $translate.instant('global.base.price').toLowerCase() || columnValue === 'base price') {
         return 'b';
      } else if (columnValue === $translate.instant('global.list.price').toLowerCase() || columnValue === 'list price') {
         return 'l';
      } else if (columnValue === $translate.instant('global.price').toLowerCase() || columnValue === 'price') {
         return 'p';
      } else if (columnValue === $translate.instant('global.average.cost').toLowerCase() || columnValue === 'average cost') {
         return 'a';
      } else if (columnValue === $translate.instant('global.last.cost').toLowerCase() || columnValue === 'last cost') {
         return 't';
      } else if (columnValue === $translate.instant('global.replacement.cost').toLowerCase() || columnValue === 'replacement cost') {
         return 'r';
      } else if (columnValue === $translate.instant('global.standard.cost').toLowerCase() || columnValue === 'standard cost') {
         return 's';
      } else if (columnValue === $translate.instant('global.rebate.cost').toLowerCase() || columnValue === 'rebate cost') {
         return 'e';
      } else if (columnValue === $translate.instant('global.last.foreign.cost').toLowerCase() || columnValue === 'last foreign cost') {
         return 'o';
      } else if (columnValue === $translate.instant('global.actual.cost').toLowerCase() || columnValue === 'actual cost') {
         return 'c';
      } else if (columnValue === $translate.instant('global.flat.rate').toLowerCase() || columnValue === 'flat rate') {
         return 'f';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.1').toLowerCase() || columnValue === 'customer sheet column 1') {
         return 'c1';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.2').toLowerCase() || columnValue === 'customer sheet column 2') {
         return 'c2';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.3').toLowerCase() || columnValue === 'customer sheet column 3') {
         return 'c3';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.4').toLowerCase() || columnValue === 'customer sheet column 4') {
         return 'c4';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.5').toLowerCase() || columnValue === 'customer sheet column 5') {
         return 'c5';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.6').toLowerCase() || columnValue === 'customer sheet column 6') {
         return 'c6';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.7').toLowerCase() || columnValue === 'customer sheet column 7') {
         return 'c7';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.8').toLowerCase() || columnValue === 'customer sheet column 8') {
         return 'c8';
      } else if (columnValue === $translate.instant('global.customer.sheet.column.9').toLowerCase() || columnValue === 'customer sheet column 9') {
         return 'c9';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.1').toLowerCase() || columnValue === 'vendor sheet column 1') {
         return 'v1';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.2').toLowerCase() || columnValue === 'vendor sheet column 2') {
         return 'v2';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.3').toLowerCase() || columnValue === 'vendor sheet column 3') {
         return 'v3';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.4').toLowerCase() || columnValue === 'vendor sheet column 4') {
         return 'v4';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.5').toLowerCase() || columnValue === 'vendor sheet column 5') {
         return 'v5';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.6').toLowerCase() || columnValue === 'vendor sheet column 6') {
         return 'v6';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.7').toLowerCase() || columnValue === 'vendor sheet column 7') {
         return 'v7';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.8').toLowerCase() || columnValue === 'vendor sheet column 8') {
         return 'v8';
      } else if (columnValue === $translate.instant('global.vendor.sheet.column.9').toLowerCase() || columnValue === 'vendor sheet column 9') {
         return 'v9';
      } else {
         return columnValue;
      }
   };

   self.getHeaderRow = function (sheet) {
      var headers = [];

      if (runXLSX === true) {
         var range = XLSX.utils.decode_range(sheet['!ref']);
      } else {
         var range = XLS.utils.decode_range(sheet['!ref']);
      }
      var C, R = range.s.r;
      origHeaders = [];

      for (C = range.s.c; C <= range.e.c; ++C) {
         if (runXLSX === true) {
            var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
         } else {
            var cell = sheet[XLS.utils.encode_cell({ c: C, r: R })];
         }

         var hdr = C;
         if (cell && cell.t) {
            if (runXLSX === true) {
               hdr = XLSX.utils.format_cell(cell);
            } else {
               hdr = XLS.utils.format_cell(cell);
            }
         }

         // Original Columns to Match with Row Data
         origHeaders.push(hdr);

         // Rebate Type edits on back end are different for PDSR versus PDSC ('rebate type' OK for PDSC)
         if (base.isRebateType) {
            if (hdr === $translate.instant('global.rebate.type')) {
               hdr = 'Reb Ty';
            } else if (hdr === $translate.instant('global.vendor.number') || hdr === $translate.instant('global.vendor')) {
               hdr = 'Vendor #';
            } else if (hdr === $translate.instant('global.ship.to')) {
               hdr = 'ShipTo';
            } else if (hdr === $translate.instant('global.rebate.sub.type')) {
               hdr = 'Reb Sub-Ty';
            } else if (hdr === $translate.instant('global.margin.basis')) {
               hdr = 'Margin Basis';
            } else if (hdr === $translate.instant('global.price.sheet.name.to')) {
               hdr = 'Price Sheet Name To';
            }

            //User Hook (do not rename)
            if (self.setPdemColumnHeaderRebateType) {
               self.setPdemColumnHeaderRebateType(hdr);
            };

         } else if (!base.isRebateType) {
            if (hdr === $translate.instant('global.rebate.type')) {
               hdr = 'Rebate Type';
            } else if (hdr === $translate.instant('global.vendor.number') || hdr === $translate.instant('global.vendor')) {
               hdr = 'Vendor';
            } else if (hdr === $translate.instant('global.ship.to')) {
               hdr = 'Ship To';
            } else if (hdr === $translate.instant('global.rebate.sub.type')) {
               hdr = 'RebSubTy';
            }

            //User Hook (do not rename)
            if (self.setPdemColumnHeaderNotRebateType) {
               self.setPdemColumnHeaderNotRebateType(hdr);
            };
         }

         // Labels that should match unless different languages loaded in 'global' values
         if (hdr === $translate.instant('global.update')) {
            hdr = 'Update';
         } else if (hdr === $translate.instant('global.status')) {
            hdr = 'Status';
         } else if (hdr === $translate.instant('global.contract.number')) {
            hdr = 'Contract #';
         } else if (hdr === $translate.instant('global.price.sheet.name')) {
            hdr = 'Price Sheet Name';
         } else if (hdr === $translate.instant('global.start.date')) {
            hdr = 'Start Date';
         } else if (hdr === $translate.instant('global.end.date')) {
            hdr = 'End Date';
         } else if (hdr === $translate.instant('global.reference')) {
            hdr = 'Reference';
         } else if (hdr === $translate.instant('global.basis')) {
            hdr = 'Basis';
         } else if (hdr === 'RowID') {
            hdr = 'RowID';
         } else if (hdr === $translate.instant('global.customer.number') || hdr === $translate.instant('global.customer')) {
            hdr = 'Customer #';
         } else if (hdr === $translate.instant('global.product')) {
            hdr = 'Product';
         }

         // Pulled from Detail Screens for Mapping - Change Column Label Differences
         if (hdr === $translate.instant('global.product.price.type')) {
            hdr = 'Prod Ty';
         } else if (hdr === $translate.instant('global.customer.price.type')) {
            hdr = 'Cust Type';
         } else if (hdr === $translate.instant('global.product.line')) {
            hdr = 'Prod Line';
         } else if (hdr === $translate.instant('global.product.category')) {
            hdr = 'Prod Cat';
         } else if (hdr === $translate.instant('global.price.type')) {
            hdr = 'Prc Type';
         } else if (hdr === $translate.instant('global.price.sheet.dt')) {
            hdr = 'Price Sheet Dt';
         } else if (hdr === $translate.instant('global.quantity.break.type')) {
            hdr = 'Qty Brk On';
         } else if (hdr === $translate.instant('global.price.1')) {
            hdr = 'Price[1]';
         } else if (hdr === $translate.instant('global.price.2')) {
            hdr = 'Price[2]';
         } else if (hdr === $translate.instant('global.price.3')) {
            hdr = 'Price[3]';
         } else if (hdr === $translate.instant('global.price.4')) {
            hdr = 'Price[4]';
         } else if (hdr === $translate.instant('global.price.5')) {
            hdr = 'Price[5]';
         } else if (hdr === $translate.instant('global.price.6')) {
            hdr = 'Price[6]';
         } else if (hdr === $translate.instant('global.price.7')) {
            hdr = 'Price[7]';
         } else if (hdr === $translate.instant('global.price.8')) {
            hdr = 'Price[8]';
         } else if (hdr === $translate.instant('global.price.9')) {
            hdr = 'Price[9]';
         } else if (hdr === $translate.instant('global.quantity.break.1')) {
            hdr = 'Qty[1]';
         } else if (hdr === $translate.instant('global.quantity.break.2')) {
            hdr = 'Qty[2]';
         } else if (hdr === $translate.instant('global.quantity.break.3')) {
            hdr = 'Qty[3]';
         } else if (hdr === $translate.instant('global.quantity.break.4')) {
            hdr = 'Qty[4]';
         } else if (hdr === $translate.instant('global.quantity.break.5')) {
            hdr = 'Qty[5]';
         } else if (hdr === $translate.instant('global.quantity.break.6')) {
            hdr = 'Qty[6]';
         } else if (hdr === $translate.instant('global.quantity.break.7')) {
            hdr = 'Qty[7]';
         } else if (hdr === $translate.instant('global.quantity.break.8')) {
            hdr = 'Qty[8]';
         } else if (hdr === $translate.instant('global.discount.1')) {
            hdr = 'Discount[1]';
         } else if (hdr === $translate.instant('global.discount.2')) {
            hdr = 'Discount[2]';
         } else if (hdr === $translate.instant('global.discount.3')) {
            hdr = 'Discount[3]';
         } else if (hdr === $translate.instant('global.discount.4')) {
            hdr = 'Discount[4]';
         } else if (hdr === $translate.instant('global.discount.5')) {
            hdr = 'Discount[5]';
         } else if (hdr === $translate.instant('global.discount.6')) {
            hdr = 'Discount[6]';
         } else if (hdr === $translate.instant('global.discount.7')) {
            hdr = 'Discount[7]';
         } else if (hdr === $translate.instant('global.discount.8')) {
            hdr = 'Discount[8]';
         } else if (hdr === $translate.instant('global.discount.9')) {
            hdr = 'Discount[9]';
         } else if (hdr === $translate.instant('global.price.sheet.dt.to')) {
            hdr = 'Price Sheet Dt To';
         } else if (hdr === $translate.instant('global.rebate.calculation.type')) {
            hdr = 'Reb Calc';
         } else if (hdr === $translate.instant('global.rebate.from.basis')) {
            hdr = 'Reb From Basis';
         } else if (hdr === $translate.instant('global.rebate.down.to.basis')) {
            hdr = 'Reb Down To Basis';
         } else if (hdr === $translate.instant('global.rebate.amount')) {
            hdr = 'Reb Amount';
         } else if (hdr === $translate.instant('global.rebate.percent')) {
            hdr = 'Reb Percent';
         } else if (hdr === $translate.instant('global.rebate.code')) {
            hdr = 'Reb Code';
         } else if (hdr === $translate.instant('global.drop.ship.type')) {
            hdr = 'Ship Ty';
         } else if (hdr === $translate.instant('global.customer.rebate.type')) {
            hdr = 'CustRebTy';
         } else if (hdr === $translate.instant('global.region')) {
            hdr = 'Region';
         } else if (hdr === $translate.instant('global.warehouse')) {
            hdr = 'Whse';
         } else if (hdr === $translate.instant('global.hard.system.price')) {
            hdr = 'Hard System Price';
         } else if (hdr === $translate.instant('global.hard.maximum')) {
            hdr = 'Hard Maximum';
         } else if (hdr === $translate.instant('global.based.on')) {
            hdr = 'Based On';
         } else if (hdr === $translate.instant('global.override.tolerance.up')) {
            hdr = 'Override Tolerance Up';
         } else if (hdr === $translate.instant('global.override.tolerance.down')) {
            hdr = 'Override Tolerance Down';
         } else if (hdr === $translate.instant('global.share.rebate')) {
            hdr = 'Share Rebate';
         } else if (hdr === $translate.instant('global.share.rebate.percent')) {
            hdr = 'Share Rebate Percent';
         } else if (hdr === $translate.instant('global.cap.sell.amount')) {
            hdr = 'Cap Sell Amount';
         } else if (hdr === $translate.instant('global.cap.sell.type')) {
            hdr = 'Cap Sell Type';
         } else if (hdr === $translate.instant('global.manual.rebate')) {
            hdr = 'Manual Rebate';
         } else if (hdr === $translate.instant('global.contract.line.number')) {
            hdr = 'Contract Line #';
         } else if (hdr === $translate.instant('global.contract.cost')) {
            hdr = 'Contract Cost';
         }
         headers.push(hdr);
      }
      return headers;
   }

   self.importErrorsToExcel = function (errors) {

      var arrData = typeof errors !== 'object' ? JSON.parse(errors) : errors;
      var CSV = '';
      var origLabel;
      var header = '';

      var columnsList = arrData[0].cColLabels.toString().split(String.fromCharCode(3));

      columnsList.forEach(function (column) {

         if (column === 'Prod Ty') {
            column = $translate.instant('global.product.price.type');
         } else if (column === 'Cust Type') {
            column = $translate.instant('global.customer.price.type');
         } else if (column === 'Prod Line') {
            column = $translate.instant('global.product.line');
         } else if (column === 'Prod Cat') {
            column = $translate.instant('global.product.category');
         } else if (column === 'ShipTo') {
            column = $translate.instant('global.ship.to');
         } else if (column === 'Reb Sub-Ty') {
            column = $translate.instant('global.rebate.sub.type');
         } else if (column === 'Reb Sub Ty') {
            column = $translate.instant('global.rebate.sub.type');
         } else if (column === 'Reb Ty') {
            column = $translate.instant('global.rebate.type');
         } else if (column === 'Rebate Type') {
            column = $translate.instant('global.rebate.type');
         }

         //User Hook (do not rename)
         if (self.setPdemImportColumnHeader) {
            self.setPdemImportColumnHeader(column);
         };

         // Detail Data
         if (column === 'Prc Type') {
            column = $translate.instant('global.price.type');
         } else if (column === 'Price Sheet Dt') {
            column = $translate.instant('global.price.sheet.dt');
         } else if (column === 'Qty Brk On') {
            column = $translate.instant('global.quantity.break.type');
         } else if (column === 'Price[1]') {
            column = $translate.instant('global.price.1');
         } else if (column === 'Price[2]') {
            column = $translate.instant('global.price.2');
         } else if (column === 'Price[3]') {
            column = $translate.instant('global.price.3');
         } else if (column === 'Price[4]') {
            column = $translate.instant('global.price.4');
         } else if (column === 'Price[5]') {
            column = $translate.instant('global.price.5');
         } else if (column === 'Price[6]') {
            column = $translate.instant('global.price.6');
         } else if (column === 'Price[7]') {
            column = $translate.instant('global.price.7');
         } else if (column === 'Price[8]') {
            column = $translate.instant('global.price.8');
         } else if (column === 'Price[9]') {
            column = $translate.instant('global.price.9');
         } else if (column === 'Qty[1]') {
            column = $translate.instant('global.quantity.break.1');
         } else if (column === 'Qty[2]') {
            column = $translate.instant('global.quantity.break.2');
         } else if (column === 'Qty[3]') {
            column = $translate.instant('global.quantity.break.3');
         } else if (column === 'Qty[4]') {
            column = $translate.instant('global.quantity.break.4');
         } else if (column === 'Qty[5]') {
            column = $translate.instant('global.quantity.break.5');
         } else if (column === 'Qty[6]') {
            column = $translate.instant('global.quantity.break.6');
         } else if (column === 'Qty[7]') {
            column = $translate.instant('global.quantity.break.7');
         } else if (column === 'Qty[8]') {
            column = $translate.instant('global.quantity.break.8');
         } else if (column === 'Discount[1]') {
            column = $translate.instant('global.discount.1');
         } else if (column === 'Discount[2]') {
            column = $translate.instant('global.discount.2');
         } else if (column === 'Discount[3]') {
            column = $translate.instant('global.discount.3');
         } else if (column === 'Discount[4]') {
            column = $translate.instant('global.discount.4');
         } else if (column === 'Discount[5]') {
            column = $translate.instant('global.discount.5');
         } else if (column === 'Discount[6]') {
            column = $translate.instant('global.discount.6');
         } else if (column === 'Discount[7]') {
            column = $translate.instant('global.discount.7');
         } else if (column === 'Discount[8]') {
            column = $translate.instant('global.discount.8');
         } else if (column === 'Discount[9]') {
            column = $translate.instant('global.discount.9');
         } else if (column === 'Hard System Price') {
            column = $translate.instant('global.hard.system.price');
         } else if (column === 'Hard Maximum') {
            column = $translate.instant('global.hard.maximum');
         } else if (column === 'Based On') {
            column = $translate.instant('global.based.on');
         } else if (column === 'Override Tolerance Up') {
            column = $translate.instant('global.override.tolerance.up');
         } else if (column === 'Override Tolerance Down') {
            column = $translate.instant('global.override.tolerance.down');
         } else if (column === 'Price Sheet Dt To') {
            column = $translate.instant('global.price.sheet.dt.to');
         } else if (column === 'Reb Calc') {
            column = $translate.instant('global.rebate.calculation.type');
         } else if (column === 'Reb From Basis') {
            column = $translate.instant('global.rebate.from.basis');
         } else if (column === 'Reb Down To Basis') {
            column = $translate.instant('global.rebate.down.to.basis');
         } else if (column === 'Reb Amount') {
            column = $translate.instant('global.rebate.amount');
         } else if (column === 'Reb Percent') {
            column = $translate.instant('global.rebate.percent');
         } else if (column === 'Reb Code') {
            column = $translate.instant('global.rebate.code');
         } else if (column === 'Ship Ty') {
            column = $translate.instant('global.drop.ship.type');
         } else if (column === 'CustRebTy') {
            column = $translate.instant('global.customer.rebate.type');
         } else if (column === 'Whse') {
            column = $translate.instant('global.warehouse');
         } else if (column === 'Region') {
            column = $translate.instant('global.region');
         } else if (column === 'Share Rebate"') {
            column = $translate.instant('global.share.rebate');
         } else if (column === 'Share Rebate Percent') {
            column = $translate.instant('global.share.rebate.percent');
         } else if (column === 'Cap Sell Amount') {
            column = $translate.instant('global.cap.sell.amount');
         } else if (column === 'Cap Sell Type') {
            column = $translate.instant('global.cap.sell.type');
         } else if (column === 'Manual Rebate') {
            column = $translate.instant('global.manual.rebate');
         } else if (column === 'Contract Line #') {
            column = $translate.instant('global.contract.line.number');
         } else if (column === 'Contract Cost') {
            column = $translate.instant('global.contract.cost');
         }

         // Label Column to Label Columns - only global difference
         if (column === 'Update') {
            column = $translate.instant('global.update');
         } else if (column === 'Status') {
            column = $translate.instant('global.status');
         } else if (column === 'Contract #') {
            column = $translate.instant('global.contract.number');
         } else if (column === 'Price Sheet Name') {
            column = $translate.instant('global.price.sheet.name');
         } else if (column === 'Start Date') {
            column = $translate.instant('global.start.date');
         } else if (column === 'End Date') {
            column = $translate.instant('global.end.date');
         } else if (column === 'Reference') {
            column = $translate.instant('global.reference');
         } else if (column === 'Basis') {
            column = $translate.instant('global.basis');
         } else if (column === 'RowID') {
            column = 'RowID';
         } else if (column === 'Customer #' || column === 'Customer') {
            column = $translate.instant('global.customer.number');
         } else if (column === 'Product') {
            column = $translate.instant('global.product');
         } else if (column === 'Vendor #' || column === 'Vendor') {
            column = $translate.instant('global.vendor.number');
         } else if (column === 'ShipTo' || column === 'Ship To') {
            column = $translate.instant('global.ship.to');
         } else if (column === 'Margin Basis') {
            column = $translate.instant('global.margin.basis');
         } else if (column === 'Price Sheet Name To') {
            column = $translate.instant('global.price.sheet.name.to');
         }

         header += '"' + column + '",';
      });

      header.slice(0, columnsList.length - 1);

      CSV += header + '\r\n';

      arrData.forEach(function (record) {
         var row = '';

         var columnValues = record.cColValues.toString().split(String.fromCharCode(3));

         columnValues.forEach(function (colValue) {

            // Clear Out " in the Product Name and Descriptions so Column Data stays with the Column Labels
            // Catches up to two instances in the column value
            colValue = colValue.replace('"', '-');
            colValue = colValue.replace('"', '-');

            row += '"' + colValue + '",';
         });

         row.slice(0, row.length - 1);

         CSV += row + '\r\n';
      });

      // Is the operating system Internet Explorer
      var isIE = $('html').is('.ie');

      var defaultFileName = "Error" + ".csv";

      if (isIE) {
         if (window.navigator.msSaveBlob) {
            var blob = new Blob([CSV], {
               type: 'application/csv;charset=utf-8;'
            });
            navigator.msSaveBlob(blob, defaultFileName);
         }
      }
      else {
         //Initialize file format you want - csv
         var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
         var link = document.createElement('a');
         link.href = uri;

         //set the visibility hidden so it will not effect on your web-layout
         link.style = "visibility:hidden";
         link.download = defaultFileName;

         //this part will append the anchor tag and remove it after automatic click
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      }
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var records = [];

         records = GridService.getSelectedRecords(base.defaultGrid);

         records.forEach(function (record) {
            var index = base.excelNewSetResultsDefault.indexOf(record);
            base.excelNewSetResultsDefault.splice(index, 1);
         });
      });
   };

   self.cancel = function () {
      base.excelNewSetResultsDefault = [];
      $state.go('^.master');
   };

});

app.controller('PdemImportCreateCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService, ConfigService) {
   var self = this;
   var base = $scope.base;
   var imp = $scope.imp;

   self.setID = '';
   self.description = '';

   self.back = function () {
      $state.go('pdem.import');
   };

   self.clear = function () {
      self.pdemExcelNewsetUpdtCAdd = { cShipTo: '' };
      self.pdemExcelNewsetUpdtRAdd = { cRebateCd: 's' };
      if (imp.pdemExcelImportNewCriteria) {
         self.pdemExcelNewsetUpdtRAdd.lPriceRebFl = imp.pdemExcelImportNewCriteria.lPriceRebFl;
      }
   };

   // Initially reset the Defaults
   self.clear();

   self.cancel = function () {
      $state.go('pdem.import');
   };

   self.submit = function () {

      var newSetIDValidate = {};
      var excelimportnewresults = base.excelNewSetResultsDefault;

      if (base.isRebateType) {
         // Load Rebate Data - No Init table
         newSetIDValidate = {
            pdemexcelimportnewresults: excelimportnewresults,
            pdemexcelnewsetupdtradd: self.pdemExcelNewsetUpdtRAdd
         };

         DataService.post('api/pd/aspdentry/pdemexcelnewsetupdtradd', { data: newSetIDValidate, busy: true }, function (data) {
            if (data) {

               // NOTE: When loading the results table cCustType = cRebateCd and iCustNo = deVendNo off the SetID Create screen
               if (data.messaging.length > 0) {
                  MessageService.errorMessages(data.messaging);
               } else if (data.pdemexcelimportnewresults) {
                  base.defaultGrid.loadData(data.pdemexcelimportnewresults);
                  base.excelNewSetResultsDefault = data.pdemexcelimportnewresults;
                  MessageService.info('global.information', 'message.record.successfully.created');
                  self.clear();
               }
            }
         });
      } else {
         // Load Pricing Data
         newSetIDValidate = {
            pdemexcelimportnewresults: excelimportnewresults,
            pdemexcelnewsetupdtcadd: self.pdemExcelNewsetUpdtCAdd,
            pdemexcelnewsetupdtcinit: base.pdemExcelNewsetUpdtCInit
         };

         DataService.post('api/pd/aspdentry/pdemexcelnewsetupdtcadd', { data: newSetIDValidate, busy: true }, function (data) {
            if (data) {

               if (data.messaging.length > 0) {
                  MessageService.errorMessages(data.messaging);
               } else if (data.pdemexcelimportnewresults) {
                  base.defaultGrid.loadData(data.pdemexcelimportnewresults);
                  base.excelNewSetResultsDefault = data.pdemexcelimportnewresults;
                  MessageService.info('global.information', 'message.record.successfully.created');
                  self.clear();
               }
            }
         });
      }
   };

});

app.controller('PdemColumnExportCtrl', function ($scope, $state, $stateParams, DataService, GridService) {
   var self = this;
   var base = $scope.base;

   self.exportFileName = base.pdemInitialLoadResults.cDestination.replace('/', '-');
   self.availableFieldList = angular.copy(base.exportColumnList);
   self.selectedFieldList = [];
   self.includedColumns = [];

   self.exportGridpdsc1 = [];
   self.exportGridpdsc2 = [];
   self.exportGridpdsc3 = [];
   self.exportGridpdsr = [];
   self.dataset = GridService.getSelectedRecords(base.exportGrid);

   // Called when a change is made in the columns swap list
   self.exportGridChanged = function () {
      self.includedColumns = [];

      for (var i = 0; i < self.selectedFieldList.length; i++) {
         self.includedColumns.push(self.selectedFieldList[i].value);
      }
   };

   self.isColumnIncluded = function (field) {
      return self.includedColumns.indexOf(field) >= 0;
   };


   self.LaunchExportToExcel = function () {

      switch (base.exportGridName) {
         case 'pdsc1':
            self.exportGridpdsc1.exportToCsv(self.exportFileName);
            break;
         case 'pdsc2':
            self.exportGridpdsc2.exportToCsv(self.exportFileName);
            break;
         case 'pdsc3':
            self.exportGridpdsc3.exportToCsv(self.exportFileName);
            break;
         case 'pdsr':
            self.exportGridpdsr.exportToCsv(self.exportFileName);
            break;
      } // switch
   };

   self.cancel = function () {
      $state.go('pdem.master');
   };
});

app.controller('PdemColumnDisableCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, $translate) { // coldable
   var self = this;
   var base = $scope.base;

   self.disabledList = angular.copy(base.disabledColumnList);
   self.enabledList = angular.copy(base.enabledColumnList);

   self.submit = function () {
      base.disabledColumnList = self.disabledList;
      base.enabledColumnList = self.enabledList;
      $state.go('pdem.master');
   };

   self.cancel = function () {
      $state.go('pdem.master');
   };

});