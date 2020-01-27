'use strict';

app.controller('AoProductsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService) { //as proddtl
   var self = this;
   var base = $scope.base;
   var subject = 'Product';
   var dictionary = {
      //copied from SL (there are missing/expected space)
      allowAutoAssignLotsFl: 'AllowAutoAssignLots',
      allowexpandedproduct: 'AllowExpandedProductLength',
      allowexpandedvendprod: 'AllowExpandedVendProdLength',
      allowICSECLastCostOverride:'Allow Override of Last Cost Update in ICSEC',
      apvendcoregrcfl: 'VendorGracePeriodFlag',
      apvendgraceper: 'VendorGracePeriod',
      arcustcoregrcfl: 'CustomerGracePeriodFlag',
      arcustgraceper: 'CustomerGracePeriod',
      comminvcost: 'UseCurrentCommissionCostatInvoicing',
      dfltscraprsn: 'ScrapReturnReason',
      displayExtFl: 'DisplayExtendedProductDescriptiononReports',
      iCBackPstFl: 'PostCostofGoodsAdjustmentsinCosting',
      iCCatStockFl: 'CatalogStocked',
      iCLotRcptTy: 'ReceiveLotsInto',
      iCReqDOPOSerialFl: 'RequireSerialsonDirectPOs',
      iCReqWTSerialFl: 'RequireSerialson_non-DirectWTs',
      icAltVndFl: 'UseAlternateVendorCrossReferences',
      icBarCdFl: 'UseBarCodeCrossReferences',
      icCOGsAdjFl: 'COGSAdjustmentPosting',
      icCatKeyFl: 'UseKeywordsonCatalogItems',
      icClassPct1: 'ClassPctLevel1',
      icClassPct10: 'ClassPctLevel10',
      icClassPct11: 'ClassPctLevel11',
      icClassPct12: 'ClassPctLevel12',
      icClassPct2: 'ClassPctLevel2',
      icClassPct3: 'ClassPctLevel3',
      icClassPct4: 'ClassPctLevel4',
      icClassPct5: 'ClassPctLevel5',
      icClassPct6: 'ClassPctLevel6',
      icClassPct7: 'ClassPctLevel7',
      icClassPct8: 'ClassPctLevel8',
      icClassPct9: 'ClassPctLevel9',
      icCommCost: 'CommissionCost',
      icCostType: 'MarkUpFrom',
      icCstPrdFl: 'UseCustomerProductCrossReferences',
      icDATCCost: 'SurchargeAmount',
      icDATCLabel: 'SurchargeLabel',
      icDATCTy: 'SurchargeType',
      icDeadStk: 'DeadStockLevel',
      icExcpQty: 'LowUsageThreshold,Qty',
      icFIFOFl: 'UseFIFO',
      icGLBsTy: 'BalanceSheetUpdateType',
      icGLIncTy: 'IncomeStmtUpdateType',
      icIncAddAdjFl: 'IncludeAddons,COGSAdjustment',
      icIncAddCM: 'IncludeAddons,Commissions',
      icIncAddCP: 'IncludeAddons,Pricing',
      icIncAddGL: 'IncludeAddons,G/L',
      icIncAddSM: 'IncludeAddons,S/M',
      icIntchgFl: 'UseInterchangeCrossReferences',
      icLookupNm: 'LookupNameDefault',
      icMSDSPrt: 'MSDSPrintType',
      icNSDOFl: 'PurgeNS/DORecords',
      icNSDOWriteAmt: 'NS/DOWrite-OffAmount',
      icNSProdCat: 'NonStockProductCategory',
      icOptionFl: 'UseOptionalProductCrossReferences',
      icPartialFl: 'PartialUnitSale',
      icPhyadjam: 'PhysicalAdjustmentExceptionAmount',
      icRollCostFl: 'RollUpSerial/LotCosts',
      icSubFl: 'UseSubstituteCrossReferences',
      icSupCedFl: 'UseSupercedeCrossReferences',
      icTrdSrvFl: 'UseAutoPricingCrossReferences',
      icUPCDelim: 'UPCDelimiter',
      icUPCLabel1: 'UPCLabelSegment1',
      icUPCLabel2: 'UPCLabelSegment2',
      icUPCLabel3: 'UPCLabelSegment3',
      icUPCLabel4: 'UPCLabelSegment4',
      icUPCLabel5: 'UPCLabelSegment5',
      icUPCLabel6: 'UPCLabelSegment6',
      icUPCLength1: 'UPCLengthSegment1',
      icUPCLength2: 'UPCLengthSegment2',
      icUPCLength3: 'UPCLengthSegment3',
      icUPCLength4: 'UPCLengthSegment4',
      icUPCLength5: 'UPCLengthSegment5',
      icUPCLength6: 'UPCLengthSegment6',
      icUpgrFl: 'UseUpgradeCrossReferences',
      iccoredflt: 'CoreProductDefault',
      icdirtycorepre: 'DirtyCoreCharacter',
      icglcost: 'PosttoG/LBy',
      icgracefl1: 'EnableLevel1GraceTypes',
      icgracefl2: 'EnableLevel2GraceTypes',
      icgracefl3: 'EnableLevel3GraceTypes',
      icgracefl4: 'EnableLevel4GraceTypes',
      icgracefl5: 'EnableLevel5GraceTypes',
      icgracefl6: 'EnableLevel6GraceTypes',
      icgracefl7: 'EnableLevel7GraceTypes',
      icgracefl8: 'EnableLevel8GraceTypes',
      icgracefl9: 'EnableLevelGraceTypes',
      icimplcorepre: 'Implied Core Character',
      icrmFIFOFl: 'RemoveFIFOWhenEmpty',
      icsgnuscst: 'LowUsageThreshold,Amount',
      icsmcost: 'PosttoS/MBy',
      icsnpofl: 'AssignSerial#DuringReceiving',
      icvalidatemixfl: 'ControlSpecialPricingValuesForTallyProducts',
      icvendcost: 'VendorCostforImpliedandDirtyCores',
      limitAltVendorAccess: 'Limit Alternate Vendor Access',
      multlvlcntrfl: 'PricingbyRegion',
      multlvlprcfl: 'AllowOverrideofContractualLevelPricinginMultipleLevelSearch',
      multlvlprodfl: 'AllowOverrideofProductLevelRebatesinMultipleLevelSearch',
      multlvlrebty: 'MultipleLevelCustomerRebateTypesCalculated',
      npfl: 'Use National Programs',
      npCustProdFl: 'National Program Types',
      npCustModelFl: 'National Program Types',
      npCustBrandFl: 'National Program Types',
      npCustProdCatFl: 'National Program Types',
      npCustProdLineFl: 'National Program Types',
      npCustProdPriceTypeFl: 'National Program Types',
      npCustProdRebTypeSubTypeFl: 'National Program Types',
      npGroupProdFl: 'National Program Types',
      npGroupModelFl: 'National Program Types',
      npGroupBrandFl: 'National Program Types',
      npGroupProdCatFl: 'National Program Types',
      npGroupProdLineFl: 'National Program Types',
      npGroupProdPriceTypeFl: 'National Program Types',
      npGroupProdRebTypeSubTypeFl: 'National Program Types',
      npPriceTypeProdFl: 'National Program Types',
      npPriceTypeModelFl: 'National Program Types',
      npPriceTypeBrandFl: 'National Program Types',
      npPriceTypeProdCatFl: 'National Program Types',
      npPriceTypeProdLineFl: 'National Program Types',
      npPriceTypeProdPriceTypeFl: 'National Program Types',
      npPriceTypeProdRebTypeSubTypeFl: 'National Program Types',
      npCustAllProdFl: 'National Program Types',
      npGroupAllProdFl: 'National Program Types',
      npPriceTypeAllProdFl: 'National Program Types',
      npAllCustProdFl: 'National Program Types',
      npAllCustModelFl: 'National Program Types',
      npAllCustBrandFl: 'National Program Types',
      npAllCustProdCatFl: 'National Program Types',
      npAllCustProdLineFl: 'National Program Types',
      npAllCustProdPriceTypeFl: 'National Program Types',
      npAllCustProdRebTypeSubTypeFl: 'National Program Types',
      npAllCustAllProdFl: 'National Program Types',
      npshiptofl: 'National Program By Ship To/Job',
      oEUseOvrdCostFl: 'UseOverriddenSMCostWhenRe-PricingLineinOEEntry',
      pDContractLineNoOptionFl: 'PDRebateContractLineNumberFlag',
      pDForeignRebateFl: 'ForeignRebates',
      pDPriceByRegionFl: 'PricingbyRegion',
      pDShipmentOptionFl: 'PDShipmentOptionFlag',
      pdcustrebfl: 'CustomerRebateTypes',
      pdjobfl: 'PricingbyShipTo/Job',
      pdlastavailpricerec: 'Last Avail Price Rec',
      pdlastavailrebrec: 'Last Avail Rebate Rec',
      pdlevelfl1: 'Customer/Product',
      pdlevelfl2: 'Cust/ProdPriceType',
      pdlevelfl3: 'CustomerType/Product',
      pdlevelfl4: 'CustomerType/ProductPriceandRebateType',
      pdlevelfl5: 'Customer',
      pdlevelfl6: 'CustomerType',
      pdlevelfl7: 'Product',
      pdlevelfl8: 'ProductPriceType',
      pdlevelpc: 'Cust/ProdCat',
      pdlevelpl: 'Cust/ProdLine',
      pdlevelrt: 'Cust/RebateType',
      pdnextclmno: 'NextRebateClaimNumber',
      pdpromofl: 'PromotionalPricing',
      pdpround: 'PriceRounding',
      pdptarget: 'PriceTarget',
      pDRebateByPriceOptionFl: "PDRebateByPrice",
      pdrebhierty: 'HierarchyforRebateProcessing',
      pdrebjobfl: 'RebatebyShipTo/Job',
      pdreblevlfl1: 'Product',
      pdreblevlfl2: 'RebateType',
      pdreblevlfl3: 'ProductPriceType',
      pdreblevlfl4: 'ProductLine',
      pdreblevlfl5: 'ProductCategory',
      pdrebsubtyfl: 'RebateSubTypes',
      pdrebwhsefl: 'RebatebyWarehouse',
      pDUseRebateBeforeProductType: 'PDUseRebateBeforeProductType',
      pdscrebsubtyfl: 'Pricing: Rebate Sub Type',
      pdspecialfl: 'SpecialPriceTypeDiscounts',
      pdvenqtyfl: 'VendorProductPricing',
      pdwhsefl: 'PricingbyWarehouse',
      pocostcorechno: 'POVendorCoreChgNoCost',
      pocostcorechyes: 'POVendorCoreChgYesCost',
      ponsovrfillty: 'OverFillPOReceipts',
      potallyadjfl: 'UsethePOAdjustmentFactorForTallyComponents',
      prAltprodgrpfl: 'Restriction Product Type: Alternate Product Group',
      prBrandcdfl: 'Restriction Product Type : Brand Code',
      prBywhsefl: 'Restriction Product Type: Allow Restrictions by Warehouse',
      prCertlicensefl: 'Restriction Customer Type : Certificate Licence',
      prCitystatefl: 'Restriction Customer Type : CityState',
      prCountryfl: 'Restriction Customer Type : Country',
      prCustomerfl: 'Restriction Customer Type : Customer',
      prCustpricetyfl: 'Restriction Customer Type : Customer Price Type',
      prCustterritoryfl: 'Restriction Customer Type : Customer Territory',
      prCusttypefl: 'Restriction Customer Type : Customer Type',
      prHierarchycd: 'Restriction Hierarchy Default : Override Hierarchy',
      prHierarchydflt: 'Restriction Hierarchy Default : Default Hierarchy',
      prProdcatfl: 'Restriction Product Type : Product Category',
      prProdlinefl: 'Restriction Product Type : Product Line',
      prProdpricetyfl: 'Restriction Product Type : Product Price Type',
      prProductfl: 'Restriction Product Type : Product',
      prShiptofl: 'Restriction Customer Type : ShipTo',
      prZipcodefl: 'Restriction Customer Type : ZipCode',
      prodAutoCompFl: 'ProductAutoCompleteFlag',
      slimportdir: 'Import Directory',
      sminvcost: 'UseCurrentSMCostatInvoicing',
      wmdelfl: 'Delete Transactions When Complete',
      wmexfillfl: 'Refill Open Assigned Bins First',
      wmintfl: 'Warehouse Manager in Use',
      wmmultfl: 'Allow Multiple Products Per Bin',
      wmpprimfl: 'Pick Only Primary Bins',
      wmprfillfl: 'Fill Primary Bin First',
      wmprrmfl: 'Return Available Product to Primary Bin',
      wmputfl: 'Directed Bin Put Away',
      wmqtyfl: 'Count Commited Stock as Available Space',
      wmsboefl: 'Attempt Single Bin Pick',
      wmsbpofl: 'Attempt Single Bin Put Away',
      wtnsovrfillty: 'OverFillWTReceipts'
   };
   self.hierarchyOptions = {
      PR: $translate.instant('global.product'),
      PL: $translate.instant('global.product.line'),
      PC: $translate.instant('global.product.category'),
      PT: $translate.instant('global.product.price.type'),
      BC: $translate.instant('global.brand.code')
   };

   self.aoProduct = {};

   base.getConfigurationData(subject);

   self.calClassTotal = function () {
      self.classTotal = self.aoProduct.icClassPct1 + self.aoProduct.icClassPct2 + self.aoProduct.icClassPct3 +
         self.aoProduct.icClassPct4 + self.aoProduct.icClassPct5 + self.aoProduct.icClassPct6 +
         self.aoProduct.icClassPct7 + self.aoProduct.icClassPct8 + self.aoProduct.icClassPct9 +
         self.aoProduct.icClassPct10 + self.aoProduct.icClassPct11 + self.aoProduct.icClassPct12;
   };

   DataService.get('api/shared/assharedentry/aoproductload', { busy: true }, function (data) {
      if (data) {
         self.aoProduct = data;
         self.original = angular.copy(self.aoProduct);
         self.loadHierarchy();

         //User Hook (do not rename)
         if (self.aoProductLoadContinue) {
            self.aoProductLoadContinue(data);
         }
      }
   });

   base.navChangeCheck = function () {
      return (base.hasChanges(self.aoProduct, self.original).length);
   };

   var decatenateHierarchy = function (hierarchy) {
      if (!hierarchy) {
         hierarchy = 'PR,PC,PL,PT,BC';
      }
      var result = [];
      hierarchy.split(',').forEach(function (option) {
         result.push({
            label: self.hierarchyOptions[option],
            value: option
         });
      });
      return result;
   };

   self.loadHierarchy = function () {
      self.overrideHierarchyList = decatenateHierarchy(self.aoProduct.prHierarchycd);
      self.defaultHierarchyList = decatenateHierarchy(self.aoProduct.prHierarchydflt);
   };

   self.total = function () {
      return self.aoProduct.icClassPct1 + self.aoProduct.icClassPct2 + self.aoProduct.icClassPct3 +
         self.aoProduct.icClassPct4 + self.aoProduct.icClassPct5 + self.aoProduct.icClassPct6 +
         self.aoProduct.icClassPct7 + self.aoProduct.icClassPct8 + self.aoProduct.icClassPct9 +
         self.aoProduct.icClassPct10 + self.aoProduct.icClassPct11 + self.aoProduct.icClassPct12;
   };

   self.reset = function () {
      self.aoProduct = angular.copy(self.original);
      self.loadHierarchy();
      base.reset();
   };

   var concatHierarchy = function (hierarchy) {
      var string = '';
      hierarchy.forEach(function (option) {
         string += ',' + option.value;
      });
      return string.substr(1);
   };

   self.UPCTotal = function () {
      return self.aoProduct.icUPCLength1 + self.aoProduct.icUPCLength2 + self.aoProduct.icUPCLength3 +
         self.aoProduct.icUPCLength4 + self.aoProduct.icUPCLength5 + self.aoProduct.icUPCLength6;
   };

   self.onDirectBinPutAwayChange = function () {
      if (self.aoProduct.wmputfl && self.aoProduct.wmmultfl) {
         MessageService.error('global.error', 'message.multiple.products.per.bin.must.be.no.if.directed.b');
         self.aoProduct.wmmultfl = false;
      }
   };

   self.onMultipleProdPerBinChange = function () {
      if (self.aoProduct.wmputfl && self.aoProduct.wmmultfl) {
         MessageService.error('global.error', 'message.multiple.products.per.bin.must.be.no.if.directed.b');
         self.aoProduct.wmputfl = false;
      } else if (!self.aoProduct.wmmultfl) {
         MessageService.alertOk('global.alert', 'message.the.product.storage.method.has.been.changed.pleas');
      }
   };

   self.submit = function () {
      DataService.post('api/shared/assharedentry/aoproductsave', { data: self.aoProduct, busy: true }, function (data) {
         if (!MessageService.processMessaging(data)) {
            self.original = angular.copy(self.aoProduct);
            base.saveLog(subject);
         }
      });
   };

   self.save = function () {
      if (self.validate()) {
         self.aoProduct.prHierarchycd = concatHierarchy(self.overrideHierarchyList);
         self.aoProduct.prHierarchydflt = concatHierarchy(self.defaultHierarchyList);
         if (base.hasChanges(self.aoProduct, self.original).length) {
            base.fillNotes(self.aoProduct, self.original, dictionary, [''], self.submit);
         } else {
            base.saveInstallationNotes(subject);
         }
      }
   };

   self.validate = function () {
      if (self.total() !== 100) {
         MessageService.error('global.error', 'message.total.percentage.must.equal.100percent');
         $state.go('ao.products.replenishment');
         return false;
      }
      if (self.aoProduct.icUPCLength1 > 12) {
         MessageService.error('global.error', 'message.must.be.between.0.and.12');
         $state.go('ao.products.alternates-upc');
         return false;
      }
      if (self.aoProduct.icUPCLength2 > 12) {
         MessageService.error('global.error', 'message.must.be.between.0.and.12');
         $state.go('ao.products.alternates-upc');
         return false;
      }
      if (self.aoProduct.icUPCLength3 > 12) {
         MessageService.error('global.error', 'message.must.be.between.0.and.12');
         $state.go('ao.products.alternates-upc');
         return false;
      }
      if (self.aoProduct.icUPCLength4 > 12) {
         MessageService.error('global.error', 'message.must.be.between.0.and.12');
         $state.go('ao.products.alternates-upc');
         return false;
      }
      if (self.aoProduct.icUPCLength5 > 12) {
         MessageService.error('global.error', 'message.must.be.between.0.and.12');
         $state.go('ao.products.alternates-upc');
         return false;
      }
      if (self.aoProduct.icUPCLength6 > 12) {
         MessageService.error('global.error', 'message.must.be.between.0.and.12');
         $state.go('ao.products.alternates-upc');
         return false;
      }
      if (self.UPCTotal() > 24) {
         MessageService.error('global.error', 'message.upc.length.must.not.exceed.24.characters');
         $state.go('ao.products.alternates-upc');
         return false;
      }
      return true;
   };

   self.independent = function () {
      switch ($state.current.name) {
         case 'ao.products.alternate-rebate-methods':
         case 'ao.products.alternate-rebate-methods.detail':
            return true;
         default:
            return false;
      }
   };
}); //end proddtl

app.controller('AoProductsAltRebatesCtrl', function ($scope, $state, $stateParams, $translate, DataService, GridService, MessageService) { //as altrbt
   var self = this;

   self.dataset = [];

   self.load = function () {
      DataService.get('api/pd/pdar', { busy: true }, function (data) {
         self.dataset = data;
      });
   };

   self.load();

   self.drilldown = function (e, args) {
      $state.go('.detail', { record: args[0].item });
   };

   self.new = function () {
      $state.go('.detail', { record: null });
   };

   self.delete = function () {
      var records = GridService.getSelectedRowIds(self.grid, 'rowID');
      if (records.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            DataService.delete('api/pd/pdar/deletelistbyrowids', { data: records, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               self.load();
            });
         });
      }
   };
});

app.controller('AoProductsAltRebatesDetailCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, UserService) { //as armdtl
   var self = this;
   self.record = $stateParams.record;
   self.createMode = (!self.record);

   if (self.createMode) {
      self.record = {
         cono: UserService.getCono(),
         methodno: 0
      };
   }

   self.delete = function () {
      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
         DataService.delete('api/pd/pdar', { data: self.record, busy: true }, function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
            $state.go('^', null, { reload: '^' });
         });
      });
   };

   self.submit = function () {
      var callback = function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         $state.go('^', null, { reload: '^' });
      };
      if (self.createMode) {
         DataService.post('api/pd/pdar', { data: self.record, busy: true }, callback());
      } else {
         DataService.put('api/pd/pdar', { data: self.record, busy: true }, callback());
      }
   };
});