'use strict';

app.controller('OeetAdvancedLineEntryManualRebateCtrl', function ($scope, $state, $translate, DataService, MessageService, GridService) {
   // alias => aleMr
   var self = this;
   var ale = $scope.ale;
   var base = $scope.base;
   self.PDSR_REBATE_ON_REBATE_TYPE = 'r2';
   self.VENDOR_ON_SALE = 's';
   self.isSearchVisible = true;
   self.isInquiryMode = false;
   self.rebateSubTypeDefault = '';

   self.criteria = {};
   self.widgetResults = {};

   DataService.get('api/shared/assharedentry/aoproductload', { busy: false }, function (data) {
      if (data) {
         self.aoProduct = data;
      }
   });

   DataService.get('api/sa/assasetup/sasttloadtablecodes', { busy: false }, function (codeData) {
      if (codeData) {
         codeData.forEach(function (sastt) {
            if (sastt.codeid.toUpperCase() === 'RG') {
               self.sastt = sastt;
            }
         });

         var sasttLoadDataRequest = {
            sasttcodes: self.sastt,
            sasttsearchcriteria: {
               codechar: '',
               codechar2: ''
            }
         };
         DataService.post('api/sa/assasetup/sasttloadtabledata', { data: sasttLoadDataRequest, busy: false }, function (dataData) {
            if (dataData) {
               self.rebateRegionTypes = [];
               dataData.forEach(function (sasttData) {
                  self.rebateRegionTypes.push({ label: sasttData.descrip, value: 'RGN-' + sasttData.codeval.toLowerCase() });
               });
            }
         });
      }
   });

   self.setupCriteria = function () {
      self.criteria.rebtype = '';
      self.criteria.vendno = ale.oeline.vendno;
      self.criteria.prod = ale.oeline.prod;
      self.criteria.prodline = ale.oeline.prodline;
      self.criteria.prodcat = ale.oeline.prodcat;
      self.criteria.custno = base.oehdr.custno;
      self.criteria.shipto = base.oehdr.shipto;
      self.criteria.rebatecd = 's';
      self.criteria.orderno = ale.oeline.orderno;
      self.criteria.ordersuf = ale.oeline.ordersuf;
      self.criteria.price = ale.oeline.price;
      self.criteria.lineno = ale.oeline.lineno;
      self.criteria.pdrecno = ale.oeline.pdrecno;
      self.criteria.qtyord = ale.oeline.qtyord;
      self.criteria.shipto = base.oehdr.shipto;
      self.criteria.specnstype = ale.oeline.specnstype;
      self.criteria.stkunit = ale.oeline.stkunit;
      self.criteria.unit = ale.oeline.unit;
      self.criteria.unitconv = ale.oeline.unitconv;
      self.criteria.rebsubty = '';
      self.criteria.shiptype = ale.oeline.botype === 'd' ? 'd' : 'w';
      self.criteria.contractno = '';
      self.criteria.contractline = 0;
      self.criteria.startdt = null;
      self.criteria.whse = '';
      self.selectedLevel = 'all';
      self.rebateRegion = '';
      self.widgetResults.lPDRecnofl = false;
      self.widgetResults.lUseContractvfl = false;
   };

   self.getWidgetResults = function (isChangedValue) {
      var widgetCriteria = {
         cLevelcd: self.selectedLevel,
         cRebatecd: self.criteria.rebatecd,
         lUseContractvfl: isChangedValue ? true : self.widgetResults.lUseContractvfl
      };
      DataService.post('api/pd/aspdsetup/pdspwidget', { data: widgetCriteria, busy: true }, function (data) {
         if (data) {
            if (data.cWarning) {
               MessageService.info('global.warning', data.cWarning);
            }

            self.widgetResults = data.pdspwidgetresults;

            if (self.widgetResults.lUseRebSubTypefl && isChangedValue) {
               if (self.selectedLevel !== 'all' && !self.widgetResults.lUseContractvfl) {
                  self.widgetResults.lUseContractvfl = true;
                  self.widgetResults.lContractlineno = true;
                  self.widgetResults.lContractNofl = true;
                  self.widgetResults.lSubRebtypefl = false;
               } else {
                  self.widgetResults.lUseContractvfl = false;
                  self.widgetResults.lContractlineno = false;
                  self.widgetResults.lContractNofl = false;
                  self.widgetResults.lSubRebtypefl = true;
               }
            }

            if (self.selectedLevel !== 'all') {
               self.widgetResults.lPDRecnofl = false;
            }

            if (isChangedValue && self.selectedLevel === self.PDSR_REBATE_ON_REBATE_TYPE) {
                self.widgetResults.lUseContractvfl = false;
                self.widgetResults.lContractlineno = false;
                self.widgetResults.lContractNofl = false;
                self.widgetResults.lSubRebtypefl = true;
               MessageService.error('global.information', 'global.use.rebate.sub.type.or.contract.line.number');
            }
         }
      });
   };

   //Finds an existing Rebate for this line.
   self.getPderData = function () {
      var requestCriteria = {
         orderno: ale.oeline.orderno,
         ordersuf: ale.oeline.ordersuf,
         lineno: ale.oeline.lineno,
         seqno: 0,
         rebatecd: self.VENDOR_ON_SALE,
         pdersuf: 0
      };

      DataService.get('api/pd/pder/getbypk', { params: requestCriteria, busy: true }, function (data) {
         if (data) {
            self.recordNumber = data.rebrecno;
            self.isInquiryMode = true;
            self.getRebateDetails();
         }
      });
   };

   //Only can continue Initialize after we've gotten defaults from ICSW or ICSC.
   self.initializeContinue = function() {
      self.getWidgetResults(false);
      self.getPderData();
   };

   self.getIcscData = function () {
      var requestCriteria = {
         prod: ale.oeline.prod
      };

      DataService.get('api/ic/icsc/getbypk', { params: requestCriteria, busy: true }, function (data) {
         if (data) {
            self.criteria.rebtype = data.rebatety;
            self.criteria.prodpricety = data.pricetype;
            self.rebateSubTypeDefault = data.rebsubty;

            //In Edit mode on the line, the ArpVendno doesn't get set on the line for a stocked item.
            //We are using the one from ICSC as a way to default it.
            self.criteria.vendno = self.criteria.vendo || data.vendno;
            self.criteria.prodline = self.criteria.prodline || data.prodline;;
         }

         self.initializeContinue();
      });
   };

   self.getIcswData = function () {
      var requestCriteria = {
         prod: ale.oeline.prod,
         whse: base.oehdr.whse
      };

      DataService.get('api/ic/icsw/getbypk', { params: requestCriteria, busy: true }, function (data) {
         if (data) {
            self.criteria.rebtype = data.rebatety;
            self.criteria.prodpricety = data.pricetype;
            self.rebateSubTypeDefault = data.rebsubty;

            //In Edit mode on the line, the ArpVendno doesn't get set on the line for a stocked item.
            //We are using the one from ICSW as a way to default it.
            self.criteria.vendno = self.criteria.vendo || data.arpvendno;
            self.criteria.prodline = self.criteria.prodline || data.prodline;;

            self.initializeContinue();
         } else {
            self.getIcscData();
         }
      });
   };

   self.initialize = function() {
      self.setupCriteria();
      self.getIcswData();
   };

   self.rebateLevelChanged = function () {
      self.recordNumber = 0;
      self.manualRebateCollection = [];

      self.getWidgetResults(true);

   };

   self.shipToChanged = function (args) {
      if (self.criteria.shipto) {
         if (self.criteria.shipto === base.oehdr.shipto) {
            MessageService.alertOk('global.alert', 'message.selected.ship.to.cannot.be.used', function () {
               //ok callback
               self.criteria.shipto = '';
            });
         } else {
            self.criteria.custno = args.value2;
         }
      }
   };

   self.warehouseChanged = function () {
      if (self.criteria.whse && self.criteria.whse !== base.oehdr.whse) {
         MessageService.alertOk('global.alert', 'message.selected.warehouse.cannot.be.used', function () {
            //ok callback
            self.criteria.whse = '';
         });
      }
   };

   self.drilldown = function (e, args) {
      var record = args[0].item;
      self.recordNumber = record.rebrecno;
      self.isInquiryMode = false;
      self.getRebateDetails();
   };

   self.search = function (isSelected) {
      self.currentGridLevel = self.selectedLevel;
      self.manualRebateCollection = [];
      if (self.selectedLevel === 'all') {
         self.searchRebate(self.selectedLevel, isSelected);
      } else if (self.selectedLevel === 'c0' || self.selectedLevel === 'v0' || self.selectedLevel === 'r0') {
         self.searchRebate('r0', isSelected);
      } else {
         self.searchRebate(null, isSelected);
      }
   };

   self.searchRebate = function (level, isSelected) {
      self.criteria.clevelcd = level ? level : self.selectedLevel;

      var searchCriteria = jQuery.extend({}, self.criteria);
      searchCriteria.lContractfl = self.widgetResults.lUseContractvfl || level === 'all' ? true : false; // Fetching all records using lUseContractvfl=true
      searchCriteria.prodline = self.widgetResults.lProdLinefl ? self.criteria.prodline : '';
      searchCriteria.prodcat = self.widgetResults.lProdCatfl ? self.criteria.prodcat : '';
      searchCriteria.prod = self.widgetResults.lProdfl ? self.criteria.prod : '';
      searchCriteria.rebtype = self.widgetResults.lRebTypefl ? self.criteria.rebtype : '';
      searchCriteria.prodpricety = self.widgetResults.lProdPricetypefl ? self.criteria.prodpricety : '';
      if (self.rebateRegion) {
         searchCriteria.whse = self.rebateRegion;
      }
      if (self.recordNumber > 0) {
         searchCriteria.pdsrrecno = self.recordNumber;
      }

      DataService.post('api/oe/asoeentry/oeetmanrebsearch', { data: searchCriteria, busy: true }, function (data) {
         if (data) {
            self.manualRebateCollection = data.manrebsearchresults;
            self.isSearchCollapsed = true;

            if (isSelected) {
               self.manualRebateCollection.forEach(function (manRebate) {
                  if (manRebate.rebrecno === self.recordNumber) {
                     manRebate.isSelected = true;
                  }
               });
            }
         }
      });
   };

   self.create = function () {
      var createCriteria = {
         clevelcd: self.selectedLevel,
         startdt: self.widgetResults.lStartdtfl ? self.criteria.startdt : null,
         whse: self.widgetResults.lWhsefl ? self.criteria.whse : null,
         rebatecd: self.widgetResults.lRebatecdfl ? self.criteria.rebatecd : null,
         rebcustty: self.widgetResults.lCustRebtypefl ? self.criteria.rebcustty : null,
         rebsubty: self.widgetResults.lSubRebtypefl ? self.criteria.rebsubty : null,
         shiptype: self.widgetResults.lShiptypefl ? self.criteria.shiptype : null,
         contractNo: self.widgetResults.lContractNofl ? self.criteria.contractno : null,
         contractLine: self.widgetResults.lContractlineno ? self.criteria.contractline : 0,
         lcontractfl: self.widgetResults.lUseContractvfl,
         prod: self.widgetResults.lProdfl ? self.criteria.prod : null,
         prodpricety: self.widgetResults.lProdPricetypefl ? self.criteria.prodpricety : null,
         prodline: self.widgetResults.lProdLinefl ? self.criteria.prodline : null,
         prodcat: self.widgetResults.lProdCatfl ? self.criteria.prodcat : null,
         custno: self.widgetResults.lCustNofl ? self.criteria.custno : 0,
         rebtype: self.widgetResults.lRebTypefl ? self.criteria.rebtype : null,
         vendno: self.widgetResults.lVendNofl ? self.criteria.vendno : 0,
         shipto: self.widgetResults.lShipTofl ? self.criteria.shipto : null,
         orderno: ale.oeline.orderno,
         ordersuf: ale.oeline.ordersuf,
         price: ale.oeline.price,
         baseprice: ale.oeline.baseprice,
         calcpdcost: ale.oeline.calcpdcost,
         icspecrecno: ale.oeline.icspecrecno,
         lineno: ale.oeline.lineno,
         listprice: ale.oeline.listprice,
         netamt: ale.oeline.netamt,
         pdrecno: ale.oeline.pdrecno,
         priceclty: ale.oeline.priceclty,
         pricelevel: ale.oeline.pricelevel,
         priceonty: ale.oeline.priceonty,
         qtyord: ale.oeline.qtyord,
         qtyship: ale.oeline.qtyship,
         specnstype: ale.oeline.specnstype,
         stkunit: ale.oeline.stkunit,
         unit: ale.oeline.unit,
         unitconv: ale.oeline.unitconv
      };
      if (self.rebateRegion) {
         createCriteria.whse = self.rebateRegion;
      }

      if (createCriteria.contractLine === 0 && self.widgetResults.lContractlineno && self.criteria.rebatecd === 's' && self.aoProduct.pDContractLineNoOptionFl) {
         MessageService.yesNo('global.warning', 'question.contract.line.num.is.zero.proceed', function () {
            //yes callback
            self.addRebate(createCriteria);
         });
      } else {
         self.addRebate(createCriteria);
      }
   };

   self.addRebate = function (createCriteria) {
      DataService.post('api/oe/asoeentry/oeetmanrebcreate', { data: createCriteria, busy: true }, function (data) {
         if (data) {
            if (data.iRebrecno) {
               if (data.cWarningMsg) {
                  if (data.cWarningMsg === $translate.instant('global.record.already.exists')) {
                     MessageService.error('global.error', 'global.record.already.exists');
                  } else {
                     MessageService.error('global.error', data.cWarningMsg + '. ' + $translate.instant('global.record.number') + ': ' + data.iRebrecno);
                  }
               }

               self.recordNumber = data.iRebrecno;
               self.rebateRecordLookup({
                  rebrecno: data.iRebrecno,
                  prod: createCriteria.prod,
                  whse: createCriteria.whse
               });
            } else {
               MessageService.error('global.error', 'global.record.already.exists');
            }
         }
      });
   };

   self.rebateRecordLookup = function (rebateRecord) {
      DataService.get('api/ic/icsw/existsbypk', { params: { prod: rebateRecord.prod, whse: rebateRecord.whse }, busy: true }, function (icswData) {
         if (icswData) {
            self.isInquiryMode = false;
            self.getRebateDetails(true);
         } else {
            DataService.get('api/ic/icsc/existsbypk', { params: { catalog: rebateRecord.prod }, busy: true }, function (icscData) {
               if (icscData) {
                  MessageService.yesNo('global.confirmation', 'question.product.found.in.catalog.accept.catalog.item', function () {
                     //yes callback
                     self.isInquiryMode = false;
                     self.getRebateDetails(true);
                  });
               } else {
                  self.isInquiryMode = false;
                  self.getRebateDetails(true);
               }
            });
         }
      });
   };

   self.getRebateDetails = function () {
      DataService.get('api/pd/pdsr/listbyrebrecno', { params: { rebrecno: self.recordNumber }, busy: true }, function (pdsrData) {
         if (pdsrData) {
            var pdsr = pdsrData[0];
            if (pdsr.manualfl) {
               var level = 'r' + pdsr.levelcd;
               pdsr.levelcd = level;
               var contractFl = pdsr.rebsubty.startsWith('LN#-');

               var widgetCriteria = {
                  cLevelcd: pdsr.levelcd,
                  cRebatecd: pdsr.rebatecd,
                  lUseContractvfl: contractFl
               };
               DataService.post('api/pd/aspdsetup/pdspwidget', { data: widgetCriteria, busy: true }, function (widgetData) {
                  if (widgetData) {
                     self.widgetDetailsResults = widgetData.pdspwidgetresults;

                     pdsr.Prod = self.widgetDetailsResults.lProdfl ? pdsr.levelkey : null;
                  }

                  var rebInitRequest = {
                     iRebRecNo: pdsr.rebrecno,
                     pdsprebateinitresults: {},
                     cCallType: 'detail'
                     //clevelcd: pdsr.level ??? not on the body params?
                  };
                  DataService.post('api/pd/aspdsetup/pdsprebateinit', { data: rebInitRequest, busy: true }, function (initData) {
                     if (initData) {
                        var detailsParams = {
                           pdsr: pdsr,
                           rebInit: initData,
                           isInquiryMode: self.isInquiryMode
                        };
                        $state.go('.details', { detailsParams: detailsParams });
                     }
                  });
               });
            }
         }
      });
   };

   self.attach = function () {
      var selectedRecord = GridService.getSelectedRecord(self.grid);
      var attachCriteria = {
         baseprice: ale.oeline.baseprice,
         calcpdcost: ale.oeline.calcpdcost,
         lineno: ale.oeline.lineno,
         listprice: ale.oeline.listprice,
         netamt: ale.oeline.netamt,
         orderno: ale.oeline.orderno,
         ordersuf: ale.oeline.ordersuf,
         pdrecno: ale.oeline.pdrecno,
         price: ale.oeline.price,
         priceclty: ale.oeline.priceclty,
         pricelevel: ale.oeline.pricelevel,
         priceonty: ale.oeline.priceonty,
         prod: selectedRecord.prod,
         prodcat: selectedRecord.prodcat,
         prodline: selectedRecord.prodline,
         prodpricety: selectedRecord.prodprcty,
         qtyord: ale.oeline.qtyord,
         qtyship: ale.oeline.qtyship,
         rebamt: ale.oeline.rebamt,
         rebtype: selectedRecord.rebatety,
         specnstype: ale.oeline.specnstype,
         stkunit: ale.oeline.stkunit,
         unit: ale.oeline.unit,
         unitconv: ale.oeline.unitconv,
         custno: self.criteria.custno,
         shipto: self.criteria.shipto,
         vendno: self.criteria.vendno,
         whse: self.criteria.whse,
         pdsrrecno: selectedRecord.rebrecno
      };
      DataService.post('api/oe/asoeentry/oeetmanrebattach', { data: attachCriteria, busy: true }, function (attachData) {
         self.recordNumber = selectedRecord.rebrecno;
         ale.oeline.price = attachData;

         self.isInquiryMode = true;
         self.getRebateDetails();
      });
   };

   self.reset = function () {
      self.setupCriteria();
   };

   self.initialize();
});

app.controller('OeetAdvancedLineEntryManualRebateDetailsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, PdConverters) {
   // alias => aleMrD
   var self = this;
   var base = $scope.base;
   var ale = $scope.ale;
   var aleMr = $scope.aleMr;

   self.selectedManReb = $stateParams.detailsParams.pdsr;
   self.rebInit = $stateParams.detailsParams.rebInit;
   //Inquiry Mode happens when an OE Line is selected and there's already a Manual Rebate Tied to the line.
   //They can't search or do any editing of the data.  The only thing allowed is a remove of it.
   self.isInquiryMode = $stateParams.detailsParams.isInquiryMode;

   self.priceSheet = self.rebInit.pricesheet;
   self.priceSheetTo = self.rebInit.pricesheetto;
   self.sheetDate = self.rebInit.priceeffectivedate;
   self.sheetToDate = self.rebInit.priceeffectivedateto;

   self.buildDropdownList = function (listToBuild) {
      // Parse out the comma delimited field values and labels for the drop down list
      var newList = [];
      var valueArray = [];
      var dropDownValue;

      // Drop Down Data
      switch (listToBuild) {
         case 'rebcaclty':
            valueArray = self.rebInit.rebcalctypd.split(',');
            break;
         case 'rebcostty':
            valueArray = self.rebInit.rebatecosttypd.split(',');
            break;
         case 'marcost':
            valueArray = self.rebInit.margincosttypd.split(',');
            break;
         case 'rebdnto':
            valueArray = self.rebInit.rebdowntopd.split(',');
            break;
      }

      // Build the Drop Down paired data.  Pull the label from the Resource file.
      switch (listToBuild) {
         case 'rebcaclty':
            for (var i = 0; i < valueArray.length; i++) {
               dropDownValue = valueArray[i];
               newList.push({ value: dropDownValue, label: PdConverters.RebateCalcTypeToName.convert(dropDownValue) });
            }
            break;
         case 'rebcostty':
            for (var i = 0; i < valueArray.length; i++) {
               dropDownValue = valueArray[i];
               newList.push({ value: dropDownValue, label: PdConverters.RebateCostTypeToName.convert(dropDownValue) });
            }
            break;
         case 'marcost':
            for (var i = 0; i < valueArray.length; i++) {
               dropDownValue = valueArray[i];
               newList.push({ value: dropDownValue, label: PdConverters.MarginCostTypeToName.convert(dropDownValue) });
            }
            break;
         case 'rebdnto':
            for (var i = 0; i < valueArray.length; i++) {
               dropDownValue = valueArray[i];
               newList.push({ value: dropDownValue, label: PdConverters.RebateDownToName.convert(dropDownValue) });
            }
            break;
      }

      switch (listToBuild) {
         case 'rebcaclty':
            self.rebateCalcTypes = newList;
            break;
         case 'rebcostty':
            self.rebateCostTypes = newList;
            break;
         case 'marcost':
            self.marginCostTypes = newList;
            break;
         case 'rebdnto':
            self.rebateDownToTypes = newList;
            break;
      }
   };
   self.buildDropdownList('rebcaclty');
   self.buildDropdownList('rebcostty');
   self.buildDropdownList('marcost');
   self.buildDropdownList('rebdnto');

   if (aleMr.widgetDetailsResults.lProdPricetypefl) {
      self.levelKeyLabel = $translate.instant('global.product.price.type');
   }
   if (aleMr.widgetDetailsResults.lProdLinefl) {
      self.levelKeyLabel = $translate.instant('global.product.line');
   }
   if (aleMr.widgetDetailsResults.lProdCatfl) {
      self.levelKeyLabel = $translate.instant('global.product.category');
   }
   if (aleMr.widgetDetailsResults.lProdfl) {
      self.levelKeyLabel = $translate.instant('global.product');
   }
   if (aleMr.widgetDetailsResults.lRebTypefl) {
      self.levelKeyLabel = $translate.instant('global.rebate.type');
   }

   self.rebateCalcTypeChanged = function () {
      if (self.rebInit.rebcalcty) {
         switch (self.rebInit.rebcalcty.toLowerCase()) {
         case '%':
            self.rebateAmountPercentLabel = $translate.instant('global.rebate.percent');
            break;
         case 'n':
            self.rebateAmountPercentLabel = $translate.instant('global.percent');
            break;
         case 'm':
            self.rebateAmountPercentLabel = $translate.instant('global.margin.percent.guaranteed');
            break;
         case '$':
            self.rebateAmountPercentLabel = $translate.instant('global.rebate.amount');
            break;
         default:
            self.rebateAmountPercentLabel = '';
            break;
         }
      } else {
         self.rebateAmountPercentLabel = '';
      }
   };
   self.rebateCalcTypeChanged();

   self.contractNumberChanged = function () {
   }

   self.isManualRebateDetails = function () {
      return $state.is(base.baseState + '.selectProducts.advancedLineEntry.manualRebate.details');
   };

   self.rebateCalcTypeDescrip = function () {
      if (self.rebInit.rebcalcty === '%') {
         return $translate.instant('global.based.on');
      } else if (self.rebInit.rebcalcty && self.rebInit.rebcalcty.toLowerCase() === 'n') {
         return $translate.instant('global.based.from');
      } else {
         return '';
      }
   };

   self.marginCostDescrip = function () {
      if (self.rebInit.rebcalcty && self.rebInit.rebcalcty.toLowerCase() === 'n') {
         return $translate.instant('global.down.to');
      } else {
         return '';
      }
   };

   self.rebateAmountUnitPerDescrip = function () {
      if (self.rebInit.rebcalcty && self.rebInit.rebcalcty.toLowerCase() !== 'n') {
         return self.rebInit.unitper;
      } else {
         return '';
      }
   };

   //User Hook (do not rename)
   self.oeetManualRebAttachContinue = function () {
      $state.go('^');

      aleMr.search(true);
   };

   self.submit = function () {
      var updateCriteria = {
         caprebfl: self.rebInit.caprebfl,
         cLevelcd: self.selectedManReb.levelcd,
         contcostfl: self.rebInit.contcostfl,
         contractno: self.rebInit.contractno,
         contractlnno: self.rebInit.contractlineno,
         capsellamount: self.rebInit.capsellamount,
         capselltypefl: self.rebInit.capselltypefl,
         manualfl: self.rebInit.manualfl,
         sharefl: self.rebInit.sharefl,
         sharepct: self.rebInit.sharepct,
         enddt: self.rebInit.enddt,
         marcostty: self.rebInit.marcost,
         prceffdt: self.rebInit.priceeffectivedate,
         prcefftodt: self.rebInit.priceeffectivedateto,
         pricesheet: self.rebInit.pricesheet,
         priceshto: self.rebInit.pricesheetto,
         rebamt: self.rebInit.rebateamt,
         rebcalcty: self.rebInit.rebcalcty,
         rebcostty: self.rebInit.rebatecostty,
         rebdnto: self.rebInit.rebdowntoty,
         rebpct: self.rebInit.rebatepct,
         rebrecno: self.rebInit.rebrecno,
         reference: self.rebInit.reference,
         unitper: self.rebInit.unitper,
         user1: self.selectedManReb.user1,
         user2: self.selectedManReb.user2,
         user3: self.selectedManReb.user3,
         user4: self.selectedManReb.user4,
         user5: self.selectedManReb.user5,
         user6: self.selectedManReb.user6,
         user7: self.selectedManReb.user7,
         user8: self.selectedManReb.user8,
         user9: self.selectedManReb.user9,
         lCreateOpp: aleMr.aoProduct.pDShipmentOptionFl
      };

      //User Hook (do not rename)
      if (self.setRebateUpdateCriteria) {
         self.setRebateUpdateCriteria(updateCriteria);
      }

      DataService.post('api/pd/aspdsetup/rebateupd', { data: updateCriteria, busy: true }, function (updateData) {
         if (updateData) {
            MessageService.info('', updateData);
         }

         var attachCriteria = {
            baseprice: ale.oeline.baseprice,
            calcpdcost: ale.oeline.calcpdcost,
            lineno: ale.oeline.lineno,
            listprice: ale.oeline.listprice,
            netamt: ale.oeline.netamt,
            orderno: ale.oeline.orderno,
            ordersuf: ale.oeline.ordersuf,
            pdrecno: ale.oeline.pdrecno,
            price: ale.oeline.price,
            priceclty: ale.oeline.priceclty,
            pricelevel: ale.oeline.pricelevel,
            priceonty: ale.oeline.priceonty,
            prod: self.selectedManReb.prod,
            prodcat: self.selectedManReb.prodcat,
            prodline: self.selectedManReb.prodline,
            prodpricety: self.selectedManReb.prodprcty,
            qtyord: ale.oeline.qtyord,
            qtyship: ale.oeline.qtyship,
            rebamt: ale.oeline.rebamt,
            rebtype: self.selectedManReb.rebatety,
            specnstype: ale.oeline.specnstype,
            stkunit: ale.oeline.stkunit,
            unit: ale.oeline.unit,
            unitconv: ale.oeline.unitconv,
            custno: aleMr.criteria.custno,
            shipto: aleMr.criteria.shipto,
            vendno: aleMr.criteria.vendno,
            whse: aleMr.criteria.whse,
            pdsrrecno: self.rebInit.rebrecno
         };
         DataService.post('api/oe/asoeentry/oeetmanrebattach', { data: attachCriteria, busy: true }, function (attachData) {
            ale.oeline.price = attachData;

             //User Hook (do not rename)
            self.oeetManualRebAttachContinue();
         });
      });
   };

   //Back is only visible when in Inquiry Mode.
   self.back = function () {
      //Go all the way back to lines.  We don't want to take them back to the
      //Manual Rebates search page when in Inquiry Mode.
      $state.go(base.baseState + '.selectProducts.advancedLineEntry');
   }

   self.cancel = function () {
      $state.go('^');
   };

   self.remove = function () {
      var removeCriteria = {
         baseprice: ale.oeline.baseprice,
         calcpdcost: ale.oeline.calcpdcost,
         icspecrecno: ale.oeline.icspecrecno,
         lineno: ale.oeline.lineno,
         listprice: ale.oeline.listprice,
         netamt: ale.oeline.netamt,
         orderno: ale.oeline.orderno,
         ordersuf: ale.oeline.ordersuf,
         pdrecno: ale.oeline.pdrecno,
         pdsrrecno: self.rebInit ? self.rebInit.rebrecno : 0,
         price: ale.oeline.price,
         priceclty: ale.oeline.priceclty,
         pricelevel: ale.oeline.pricelevel,
         priceonty: ale.oeline.priceonty,
         qtyord: ale.oeline.qtyord,
         qtyship: ale.oeline.qtyship,
         specnstype: ale.oeline.specnstype,
         stkunit: ale.oeline.stkunit,
         unit: ale.oeline.unit,
         unitconv: ale.oeline.unitconv,
         botype: ale.oeline.botype,
         ordertype: ale.oeline.ordertype,
         prodcat: ale.oeline.prodcat,
         prodline: ale.oeline.prodline,
         prod: ale.oeline.prod,
         vendno: ale.oeline.vendno
      };

      //The rest of these properties are important for the 'Auto Assign Best Rebate' logic
      //that the backend call will do if we remove the Manual Rebate.  It acts the same
      //way as when a line is initated and one is assigned.
      if (base.oehdr) {
         removeCriteria.whse = base.oehdr.whse;
         removeCriteria.shipto = base.oehdr.shipto;
         removeCriteria.custno = base.oehdr.custno;
      }

      removeCriteria.custrebtype = '';

      if (self.selectedManReb) {
         removeCriteria.rebatecd = self.selectedManReb.rebatecd;
      }

      if (aleMr.setupCriteria) {
         removeCriteria.rebtype = aleMr.setupCriteria.rebtype;
         removeCriteria.prodpricety = aleMr.setupCriteria.prodpricety;
      }

      removeCriteria.rebsubty = aleMr.rebateSubTypeDefault;

      DataService.post('api/oe/asoeentry/oeetmanrebremove', { data: removeCriteria, busy: true }, function (data) {
         ale.oeline.price = data;
         $state.go('^');
      });
   };

   self.sheetPrices = function () {
      var stateObject = {
         prod: self.selectedManReb.prod,
         whse: self.selectedManReb.whse,
         pricesheet: self.rebInit.pricesheet,
         effectivedt: self.rebInit.prceffdt,
         pdrecno: self.rebInit.pdrecno,
         returnState: $state.current.name
      };
      $state.go('.priceSheet', { stateObject: stateObject });
   }

   self.toSheetPrices = function () {
      var stateObject = {
         prod: self.selectedManReb.prod,
         whse: self.selectedManReb.whse,
         pricesheet: self.rebInit.priceshto,
         effectivedt: self.rebInit.prcefftodt,
         pdrecno: self.rebInit.pdrecno,
         returnState: $state.current.name
      };
      $state.go('.toPriceSheet', { stateObject: stateObject });
   }
});