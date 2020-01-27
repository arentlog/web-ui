'use strict';

app.controller('PdemPdsc1RegionCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.pdColumnOverrideModal = null;
   self.pdImportFromExcelModal = null;
   self.isPriceSheetDisabled = true;

   // Product hyperlink
   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow.prod > '' && currentRow.whse === '') {
         $state.go('icip.detail', { pk: currentRow.prod });
      } else if (currentRow.prod > '') {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
      }
   };

   // Customer hyperlink
   self.customerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno > 0) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   // Ship To
   self.shiptoHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno > 0 && currentRow.custtype > '') {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.custtype });
      }
   };

   self.coulmnCalculator = function () {
      $state.go('^.coulmncalc', { viewType: 'PDSC1' });
   };

   self.search = function () {
      base.loadPdsc1ScreenData('ADV');
   };

   self.reset = function () {
      base.pdemloadpdsc1criteria = {
         lRefreshClick: true,
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };
   };

   self.update = function () {

      base.pdmerridpdsc1 = [];

      var criteria = {
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };

      DataService.post('api/pd/aspdentry/pdemupdatevalpdsc1', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (data.lSuccessFL) {
               $state.go('^.update');
            }
            else {
               base.pdmerridpdsc1 = data.pdmerridpdsc1;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - uses base.pdmerridpdsc2
               base.loadPdsc1ScreenData('UPDT');
            }
         }
      });
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc1ResultsGrid);

      $state.go('^.detail.edit', { record: selectedRecord });
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var records = GridService.getSelectedRecords(base.pdsc1ResultsGrid);

         var deleteList = [];

         if (records) {
            records.forEach(function (record) {
               var pdemDeleteFromSet = {
                  pvPdmlineRowid: record.pvPdmlineRowid,
                  userfield: record.userfield
               };

               deleteList.push(pdemDeleteFromSet);
            });

            if (deleteList) {
               DataService.post('api/pd/aspdentry/pdemdeletefromset', { data: deleteList, busy: true }, function (data) {
                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
               });
            }
         }
      });
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;

      $state.go('^.detail', { record: selectedRecord });
   };

   self.priceSheet = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc1ResultsGrid);
      var stateObject = {
         prod: selectedRecord.prod,
         whse: selectedRecord.whse,
         pricesheet: selectedRecord.priceSheet,
         effectivedt: selectedRecord.priceEffectiveDate,
         pdrecno: selectedRecord.pdrecno,
         returnState: $state.current.name
      };
      $state.go('pdem.master.priceSheet', { stateObject: stateObject });
   };

   self.onSelected = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc1ResultsGrid);
      self.isPriceSheetDisabled = true;

      // prctype = false is Percent (allow Price Sheet), true is Amount
      if (selectedRecord && !selectedRecord.prctype && (selectedRecord.priceSheet || selectedRecord.priceEffectiveDate)) {
         self.isPriceSheetDisabled = false;
      }
   };

   self.columnOverride = function () {
      base.selectedPdsc1Records = GridService.getSelectedRecords(base.pdsc1ResultsGrid);

      ModalService.showModal('pd/pdem/regions/pdsc-override.json', 'PdscColumnOverrideCtrl as col', $scope, function (modal) {
         self.pdColumnOverrideModal = modal;
      });
   };

   self.importFromExcel = function () {
      base.selectedPdsc1Records = GridService.getSelectedRecords(base.pdsc1ResultsGrid);

      ModalService.showModal('pd/pdem/regions/import-detail.json', 'PdemImportFromExcelCtrl as imp', $scope, function (modal) {
         self.pdImportFromExcelModal = modal;
      });
   };

});

app.controller('PdemPdsc2RegionCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.pdColumnOverrideModal = null;
   self.isPriceSheetDisabled = true;

   // Customer hyperlink
   self.customerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno > 0) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   // Ship To
   self.shiptoHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno > 0 && currentRow.custtype > '') {
         $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.custtype });
      }
   };

   // Vendor hyperlink
   self.vendorHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.vendno > 0) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.coulmnCalculator = function () {
      $state.go('^.coulmncalc', { viewType: 'PDSC2' });
   };

   self.search = function () {
      base.loadPdsc2ScreenData('ADV');
   };

   self.reset = function () {
      base.pdemloadpdsc2criteria = {
         lRefreshClick: true,
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };
   };

   self.update = function () {

      base.pdmerridpdsc2 = [];

      var criteria = {
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };

      DataService.post('api/pd/aspdentry/pdemupdatevalpdsc2', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (data.lSuccessFL) {
               $state.go('^.update');
            }
            else {
               base.pdmerridpdsc2 = data.pdmerridpdsc2;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - uses base.pdmerridpdsc2
               base.loadPdsc2ScreenData('UPDT');
            }
         }
      });
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc2ResultsGrid);

      $state.go('^.detail.edit', { record: selectedRecord });
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var records = GridService.getSelectedRecords(base.pdsc2ResultsGrid);

         var deleteList = [];

         if (records) {
            records.forEach(function (record) {
               var pdemDeleteFromSet = {
                  pvPdmlineRowid: record.pvPdmlineRowid,
                  userfield: record.userfield
               };

               deleteList.push(pdemDeleteFromSet);
            });

            if (deleteList) {
               DataService.post('api/pd/aspdentry/pdemdeletefromset', { data: deleteList, busy: true }, function (data) {
                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
               });
            }
         }
      });
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;

      $state.go('^.detail', { record: selectedRecord });
   };

   self.priceSheet = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc2ResultsGrid);
      var stateObject = {
         prod: selectedRecord.prod,
         whse: selectedRecord.whse,
         pricesheet: selectedRecord.priceSheet,
         effectivedt: selectedRecord.priceEffectiveDate,
         pdrecno: selectedRecord.pdrecno,
         returnState: $state.current.name
      };
      $state.go('pdem.master.priceSheet', { stateObject: stateObject });
   };

   self.onSelected = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc2ResultsGrid);
      self.isPriceSheetDisabled = true;

      // prctype = false is Percent (allow Price Sheet), true is Amount
      if (selectedRecord && !selectedRecord.prctype && (selectedRecord.priceSheet || selectedRecord.priceEffectiveDate)) {
         self.isPriceSheetDisabled = false;
      }
   };

   self.columnOverride = function () {
      base.selectedPdsc2Records = GridService.getSelectedRecords(base.pdsc2ResultsGrid);

      ModalService.showModal('pd/pdem/regions/pdsc-override.json', 'PdscColumnOverrideCtrl as col', $scope, function (modal) {
         self.pdColumnOverrideModal = modal;
      });
   };

   self.importFromExcel = function () {
      base.selectedPdsc2Records = GridService.getSelectedRecords(base.pdsc2ResultsGrid);

      ModalService.showModal('pd/pdem/regions/import-detail.json', 'PdemImportFromExcelCtrl as imp', $scope, function (modal) {
         self.pdImportFromExcelModal = modal;
      });
   };

});

app.controller('PdemPdsc3RegionCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.pdColumnOverrideModal = null;
   self.isPriceSheetDisabled = true;

   // Product hyperlink
   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow.prod > '' && currentRow.whse === '') {
         $state.go('icip.detail', { pk: currentRow.prod });
      } else if (currentRow.prod > '') {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
      }
   };

   self.coulmnCalculator = function () {
      $state.go('^.coulmncalc', { viewType: 'PDSC3' });
   };

   self.search = function () {
      base.loadPdsc3ScreenData('ADV');
   };

   self.reset = function () {
      base.pdemloadpdsc3criteria = {
         lRefreshClick: true,
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };
   };

   self.update = function () {

      base.pdmerridpdsc3 = [];

      var criteria = {
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };

      DataService.post('api/pd/aspdentry/pdemupdatevalpdsc3', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (data.lSuccessFL) {
               $state.go('^.update');
            }
            else {
               base.pdmerridpdsc3 = data.pdmerridpdsc3;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - uses base.pdmerridpdsc2
               base.loadPdsc3ScreenData('UPDT');
            }
         }
      });
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc3ResultsGrid);

      $state.go('^.detail.edit', { record: selectedRecord });
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var records = GridService.getSelectedRecords(base.pdsc3ResultsGrid);

         var deleteList = [];

         if (records) {
            records.forEach(function (record) {
               var pdemDeleteFromSet = {
                  pvPdmlineRowid: record.pvPdmlineRowid,
                  userfield: record.userfield
               };

               deleteList.push(pdemDeleteFromSet);
            });

            if (deleteList) {
               DataService.post('api/pd/aspdentry/pdemdeletefromset', { data: deleteList, busy: true }, function (data) {
                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
               });
            }
         }
      });
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;

      $state.go('^.detail', { record: selectedRecord });
   };

   self.priceSheet = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc3ResultsGrid);
      var stateObject = {
         prod: selectedRecord.prod,
         whse: selectedRecord.whse,
         pricesheet: selectedRecord.priceSheet,
         effectivedt: selectedRecord.priceEffectiveDate,
         pdrecno: selectedRecord.pdrecno,
         returnState: $state.current.name
      };
      $state.go('pdem.master.priceSheet', { stateObject: stateObject });
   };

   self.onSelected = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsc3ResultsGrid);

      self.isPriceSheetDisabled = true;

      // prctype = false is Percent (allow Price Sheet), true is Amount
      if (selectedRecord && !selectedRecord.prctype && (selectedRecord.priceSheet || selectedRecord.priceEffectiveDate)) {
         self.isPriceSheetDisabled = false;
      }
   };

   self.columnOverride = function () {
      base.selectedPdsc3Records = GridService.getSelectedRecords(base.pdsc3ResultsGrid);

      ModalService.showModal('pd/pdem/regions/pdsc-override.json', 'PdscColumnOverrideCtrl as col', $scope, function (modal) {
         self.pdColumnOverrideModal = modal;
      });
   };

   self.importFromExcel = function () {
      base.selectedPdsc3Records = GridService.getSelectedRecords(base.pdsc3ResultsGrid);

      ModalService.showModal('pd/pdem/regions/import-detail.json', 'PdemImportFromExcelCtrl as imp', $scope, function (modal) {
         self.pdImportFromExcelModal = modal;
      });
   };

});

app.controller('PdemPdsrRegionCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService, ModalService) {
   var self = this;
   var base = $scope.base;

   self.pdColumnOverrideModal = null;
   self.isPriceSheetDisabled = true;
   self.isPriceSheetToDisabled = true;

   // Product hyperlink
   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow.prod > '' && currentRow.whse === '') {
         $state.go('icip.detail', { pk: currentRow.prod });
      } else if (currentRow.prod > '') {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
      }
   };

   // Customer hyperlink
   self.customerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno > 0) {
         $state.go('aric.detail', { pk: currentRow.custno });
      }
   };

   // Ship To
   self.shiptoHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.custno > 0 && currentRow.custtype > '') {
         $state.go('aric.detail', {
            pk: currentRow.custno, pk2: currentRow.custtype
         });
      }
   };

   // Vendor hyperlink
   self.vendorHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow && currentRow.vendno > 0) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   self.coulmnCalculator = function () {
      base.selectedPdsrRecords = GridService.getSelectedRecords(base.pdsrResultsGrid);
      $state.go('^.coulmncalc', { viewType: 'PDSR' });
   };

   self.search = function () {
      base.loadPdsrScreenData('ADV');
   };

   self.reset = function () {
      base.pdemloadpdsrcriteria = {
         lRefreshClick: true,
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };
   };

   self.update = function () {

      base.pdmerridpdsr = [];

      var criteria = {
         cSetid: base.pdemInitialLoadCriteria.cSetid
      };

      DataService.post('api/pd/aspdentry/pdemupdatevalpdsr', { data: criteria, busy: true }, function (data) {
         if (data) {
            if (data.lSuccessFL) {
               $state.go('^.update');
            }
            else {
               base.pdmerridpdsr = data.pdmerridpdsr;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - uses base.pdmerridpdsc2
               base.loadPdsrScreenData('UPDT');
            }
         }
      });
   };

   self.cancel = function () {
      $state.go('^', null, { reload: '^' });
   };

   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsrResultsGrid);

      $state.go('^.detail.edit', { record: selectedRecord });
   };

   self.delete = function () {
      MessageService.yesNo('global.question', 'question.confirm.delete', function () {
         var records = GridService.getSelectedRecords(base.pdsrResultsGrid);

         var deleteList = [];

         if (records) {
            records.forEach(function (record) {
               var pdemDeleteFromSet = {
                  pvPdmlineRowid: record.pvPdmlineRowid,
                  userfield: record.userfield
               };

               deleteList.push(pdemDeleteFromSet);
            });

            if (deleteList) {
               DataService.post('api/pd/aspdentry/pdemdeletefromset', {
                  data: deleteList, busy: true
               }, function (data) {
                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  $state.go('pdem.master', { refreshSearch: true }, { reload: 'pdem.master' });
               });
            }
         }
      });
   };

   self.drilldown = function (e, args) {
      var selectedRecord = args[0].item;

      $state.go('^.detail', { record: selectedRecord });
   };

   self.priceSheet = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsrResultsGrid);
      var stateObject = {
         prod: selectedRecord.prod,
         whse: selectedRecord.whse,
         pricesheet: selectedRecord.priceSheet,
         effectivedt: selectedRecord.priceEffectiveDate,
         pdrecno: selectedRecord.pdrecno,
         returnState: $state.current.name
      };
      $state.go('pdem.master.priceSheet', { stateObject: stateObject });
   };

   self.priceSheetTo = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsrResultsGrid);
      var stateObject = {
         prod: selectedRecord.prod,
         whse: selectedRecord.whse,
         pricesheet: selectedRecord.priceSheetTo,
         effectivedt: selectedRecord.priceEffectiveDateTo,
         pdrecno: selectedRecord.pdrecno,
         returnState: $state.current.name
      };
      $state.go('pdem.master.priceSheet', { stateObject: stateObject });
   };

   self.onSelected = function () {
      var selectedRecord = GridService.getSelectedRecord(base.pdsrResultsGrid);

      self.isPriceSheetDisabled = true;
      self.isPriceSheetToDisabled = true;

      // Rebate Calc Type = $ (Amount), % (Percent), N (Net), M (Margin)
      if (selectedRecord && selectedRecord.rebcalcty !== base.currencySymbol && selectedRecord.rebcalcty !== '$' &&
         (selectedRecord.priceSheet || selectedRecord.priceEffectiveDate)) {
         self.isPriceSheetDisabled = false;
      }

      if (selectedRecord && selectedRecord.rebcalcty.toUpperCase() === 'N' && (selectedRecord.priceSheet || selectedRecord.priceEffectiveDate)) {
         self.isPriceSheetToDisabled = false;
      }
   };

   self.columnOverride = function () {
      base.selectedPdsrRecords = GridService.getSelectedRecords(base.pdsrResultsGrid);

      ModalService.showModal('pd/pdem/regions/pdsr-override.json', 'PdsrColumnOverrideCtrl as col', $scope, function (modal) {
         self.pdColumnOverrideModal = modal;
      });
   };

   self.importFromExcel = function () {
      base.selectedPdsrRecords = GridService.getSelectedRecords(base.pdsrResultsGrid);

      ModalService.showModal('pd/pdem/regions/import-detail.json', 'PdemImportFromExcelCtrl as imp', $scope, function (modal) {
         self.pdImportFromExcelModal = modal;
      });
   };

});

app.controller('PdscColumnOverrideCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var popup;

   self.textBoxValue = '';
   self.checkBoxValue = false;
   self.prcTypeValue = false;
   self.datePickerValue = Utils.getCurrentDate();
   self.qtyValue = 0;
   self.priceValue = 0.0;
   self.discountValue = 0.0;
   self.maxQtyTypeValue = 'S';
   self.overridePrctUpValue = 0.0;
   self.overridePrctDownValue = 0.0;

   self.isTextBoxVisible = false;
   self.isCheckBoxVisible = false;
   self.isDiscountVisible = false;
   self.isQtyVisible = false;
   self.isPriceVisible = false;
   self.isDatePickerVisible = false;
   self.isPrcTypeVisible = false;
   self.isMaxQtyTypeVisible = false;
   self.isOverridePrctUpVisible = false;
   self.isOverridePrctDownVisible = false;

   self.pdemGridUpdatePdsc = {};

   self.selectedColumn = '';

   if ($scope.pdsc1) {
      popup = $scope.pdsc1;
   }
   else if ($scope.pdsc2) {
      popup = $scope.pdsc2;
   }
   else if ($scope.pdsc3) {
      popup = $scope.pdsc3;
   }

   self.columnChanged = function () {
      switch (self.selectedColumn.toLowerCase()) {
         case 'updttype':
         case 'modifierrebfl':
         case 'hardpricefl':
         case 'hardmaxqtyfl':
            self.setControlsVisibility(false, true, false, false, false, false, false, false, false, false);
            break;

         case 'contractno':
         case 'pricesheet':
         case 'refer':
         case 'statustype':
         case 'qtybreakty':
         case 'priceonty':
         case 'modifiernm':
            self.setControlsVisibility(true, false, false, false, false, false, false, false, false, false);
            break;

         case 'prctype':
            self.setControlsVisibility(false, false, false, false, false, false, true, false, false, false);
            break;

         case 'priceeffectivedate':
         case 'enddt':
            self.setControlsVisibility(false, false, false, false, false, true, false, false, false, false);
            break;

         case 'prcmult1':
         case 'prcmult2':
         case 'prcmult3':
         case 'prcmult4':
         case 'prcmult5':
         case 'prcmult6':
         case 'prcmult7':
         case 'prcmult8':
         case 'prcmult9':
            self.setControlsVisibility(false, false, false, false, true, false, false, false, false, false);
            break;

         case 'qtybrk1':
         case 'qtybrk2':
         case 'qtybrk3':
         case 'qtybrk4':
         case 'qtybrk5':
         case 'qtybrk6':
         case 'qtybrk7':
         case 'qtybrk8':
            self.setControlsVisibility(false, false, false, true, false, false, false, false, false, false);
            break;

         case 'prcdisc1':
         case 'prcdisc2':
         case 'prcdisc3':
         case 'prcdisc4':
         case 'prcdisc5':
         case 'prcdisc6':
         case 'prcdisc7':
         case 'prcdisc8':
         case 'prcdisc9':
            self.setControlsVisibility(false, false, true, false, false, false, false, false, false, false);
            break;
         case 'maxqtytype':
            self.setControlsVisibility(false, false, false, false, false, false, false, true, false, false);
            break;
         case 'ovrridepctup':
            self.setControlsVisibility(false, false, false, false, false, false, false, false, true, false);
            break;
         case 'ovrridepctdown':
            self.setControlsVisibility(false, false, false, false, false, false, false, false, false, true);
            break;
         default:
            self.setControlsVisibility(true, false, false, false, false, false, false, false, false, false);
            break;
      }
   };

   self.setControlsVisibility = function (txtBoxVisible, chkBoxVisible, discountVisible, qtyVisible, priceVisible, datePickerVisible, prcTypeVisible, maxQtyVisible, overridePrctUpVisible, overridePrctDownVisible) {
      self.isTextBoxVisible = txtBoxVisible;
      self.isCheckBoxVisible = chkBoxVisible;
      self.isDiscountVisible = discountVisible;
      self.isQtyVisible = qtyVisible;
      self.isPriceVisible = priceVisible;
      self.isDatePickerVisible = datePickerVisible;
      self.isPrcTypeVisible = prcTypeVisible;
      self.isMaxQtyTypeVisible = maxQtyVisible;
      self.isOverridePrctUpVisible = overridePrctUpVisible;
      self.isOverridePrctDownVisible = overridePrctDownVisible;
   };

   self.returnUpdatedValue = function () {
      if (self.isTextBoxVisible) {
         return self.textBoxValue;
      }
      else if (self.isCheckBoxVisible) {
         return self.checkBoxValue;
      }
      else if (self.isDiscountVisible) {
         return self.discountValue;
      }
      else if (self.isQtyVisible) {
         return self.qtyValue;
      }
      else if (self.isPriceVisible) {
         return self.priceValue;
      }
      else if (self.isDatePickerVisible) {
         return self.datePickerValue;
      }
      else if (self.isPrcTypeVisible) {
         return self.prcTypeValue;
      }
      else if (self.isMaxQtyTypeVisible) {
         return self.maxQtyTypeValue;
      }
      else if (self.isOverridePrctUpVisible) {
         return self.overridePrctUpValue;
      }
      else if (self.isOverridePrctDownVisible) {
         return self.overridePrctDownValue;
      }
   };

   self.cancel = function () {
      popup.pdColumnOverrideModal.destroy();
   };

   self.recursiveSubmission = function (overrideArray, recursiveCounter, postCall) {
      var valuesPerPost = 100;
      var postArray = [];
      var markerStart = valuesPerPost * recursiveCounter;
      var markerEnd = markerStart + valuesPerPost;
      var timesToRun = Math.floor(overrideArray.length / valuesPerPost);
      var numPosts = overrideArray.length - markerStart;

      //If on the last recurrsive call, this will get the exact number of values left. 
      if (valuesPerPost > numPosts) {

         markerEnd = markerStart + numPosts + 1;

      }

      postArray = overrideArray.slice(markerStart, markerEnd);

      DataService.post(postCall, { data: postArray, busy: true }, function (messaging) {

         if (recursiveCounter < timesToRun) {
            recursiveCounter += 1;
            self.recursiveSubmission(overrideArray, recursiveCounter, postCall);

         } else {

            recursiveCounter += 1;
            if (messaging) {

               MessageService.processMessaging(messaging);

            }
            self.cancel();
            $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });

         }

         var percentage = Math.floor(recursiveCounter / (timesToRun + 1) * 100);
         MessageService.info('global.information', 'message.processing.continues.percentage', { percent: percentage });

         return "Call " + recursiveCounter + " completed. ";

      });
   };

   self.submit = function () {

      var overrideCriteria = {};
      var overrideArray = [];

      // DEV NOTE: In the proxygen for all three PDSC calls, the table used is pdsc1 since the ttbl tables in Progress are identical for PDSC1, PDSC2, PDSC3
      //     If a field is changed/added on the tables, the signature will change to the right table, then load the Criteria to the correct table, but
      //     for now all three point to pdsc1 to match the ProxyGen signature
      if (base.isPdscScreen1Visible) {

         base.selectedPdsc1Records.forEach(function (record) {
            self.setPdscObject(record);
            self.pdemGridUpdatePdsc[self.selectedColumn] = self.returnUpdatedValue();

            overrideCriteria = {
               pdemgridupdatepdsc1: self.pdemGridUpdatePdsc,
               lColOvrRd: true
            };
            overrideArray.push(overrideCriteria);
         });

         //User Hook (do not rename)
         if (self.setPdemGridUpdPdsc1MultipleCriteria) {
            self.setPdemGridUpdPdsc1MultipleCriteria(overrideArray);
         }

         self.recursiveSubmission(overrideArray, 0, 'api/pd/aspdentry/pdemgridupdatepdsc1multiple');
      }
      else if (base.isPdscScreen2Visible) {

         base.selectedPdsc2Records.forEach(function (record) {
            self.setPdscObject(record);
            self.pdemGridUpdatePdsc[self.selectedColumn] = self.returnUpdatedValue();

            overrideCriteria = {
               pdemgridupdatepdsc1: self.pdemGridUpdatePdsc,
               lColOvrRd: true
            };
            overrideArray.push(overrideCriteria);
         });

         //User Hook (do not rename)
         if (self.setPdemGridUpdPdsc2MultipleCriteria) {
            self.setPdemGridUpdPdsc2MultipleCriteria(overrideArray);
         }

         self.recursiveSubmission(overrideArray, 0, 'api/pd/aspdentry/pdemgridupdatepdsc2multiple');
      }
      else if (base.isPdscScreen3Visible) {

         base.selectedPdsc3Records.forEach(function (record) {
            self.setPdscObject(record);
            self.pdemGridUpdatePdsc[self.selectedColumn] = self.returnUpdatedValue();

            overrideCriteria = {
               pdemgridupdatepdsc1: self.pdemGridUpdatePdsc,
               lColOvrRd: true
            };
            overrideArray.push(overrideCriteria);
         });

         //User Hook (do not rename)
         if (self.setPdemGridUpdPdsc3MultipleCriteria) {
            self.setPdemGridUpdPdsc3MultipleCriteria(overrideArray);
         }

         self.recursiveSubmission(overrideArray, 0, 'api/pd/aspdentry/pdemgridupdatepdsc3multiple');
      }
   };

   self.setPdscObject = function (record) {
      self.pdemGridUpdatePdsc = {
         updttype: record.updttype,
         contractNo: record.contractNo,
         prctype: record.prctype,
         priceSheet: record.priceSheet,
         priceEffectiveDate: record.priceEffectiveDate,
         startdt: record.startdt,
         enddt: record.enddt,
         refer: record.refer,
         statustype: record.statustype,
         qtybreakty: record.qtybreakty,
         priceonty: record.priceonty,
         prcmult1: record.prcmult1,
         prcmult2: record.prcmult2,
         prcmult3: record.prcmult3,
         prcmult4: record.prcmult4,
         prcmult5: record.prcmult5,
         prcmult6: record.prcmult6,
         prcmult7: record.prcmult7,
         prcmult8: record.prcmult8,
         prcmult9: record.prcmult9,
         qtybrk1: record.qtybrk1,
         qtybrk2: record.qtybrk2,
         qtybrk3: record.qtybrk3,
         qtybrk4: record.qtybrk4,
         qtybrk5: record.qtybrk5,
         qtybrk6: record.qtybrk6,
         qtybrk7: record.qtybrk7,
         qtybrk8: record.qtybrk8,
         prcdisc1: record.prcdisc1,
         prcdisc2: record.prcdisc2,
         prcdisc3: record.prcdisc3,
         prcdisc4: record.prcdisc4,
         prcdisc5: record.prcdisc5,
         prcdisc6: record.prcdisc6,
         prcdisc7: record.prcdisc7,
         prcdisc8: record.prcdisc8,
         prcdisc9: record.prcdisc9,
         modifiernm: record.modifiernm,
         modifierrebfl: record.modifierrebfl,
         pvPdmlineRowid: record.pvPdmlineRowid,
         hardpricefl: record.hardpricefl,
         hardmaxqtyfl: record.hardmaxqtyfl,
         maxqtytype: record.maxqtytype,
         ovrridepctup: record.ovrridepctup,
         ovrridepctdown: record.ovrridepctdown,
         userfield: record.userfield
      };
   };

});

app.controller('PdsrColumnOverrideCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var popup;

   self.textBoxValue = '';
   self.checkBoxValue = false;
   self.datePickerValue = Utils.getCurrentDate();
   self.rebAmountValue = 0;
   self.rebPercentValue = 0;
   self.capSellTypeValue = true;
   self.capSellAmountValue = 0;
   self.sharePctValue = 0;
   self.contractLineNoValue = 0;

   self.isTextBoxVisible = false;
   self.isCheckBoxVisible = false;
   self.isDatePickerVisible = false;
   self.isRebAmountVisible = false;
   self.isRebPercentVisible = false;
   self.isCapSellTypeVisible = false;
   self.isCapSellAmountVisible = false;
   self.isSharePctVisible = false;
   self.isContractLineNoVisible = false;

   self.pdemGridUpdatePdsr = {};

   self.selectedColumn = '';

   if ($scope.pdsr) {
      popup = $scope.pdsr;
   }

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

   self.columnChanged = function () {
      switch (self.selectedColumn.toLowerCase()) {
         case 'updttype':
         case 'sharefl':
         case 'manualfl':
         case 'contractcostfl':
            self.setControlsVisibility(false, true, false, false, false, false, false, false, false);
            break;

         case 'contractno':
         case 'pricesheet':
         case 'refer':
         case 'rebcalcty':
         case 'margincostty':
         case 'rebatecostty':
         case 'rebdowntoty':
         case 'pricesheetto':
            self.setControlsVisibility(true, false, false, false, false, false, false, false, false);
            break;

         case 'priceeffectivedate':
         case 'enddt':
         case 'priceeffectivedateto':
            self.setControlsVisibility(false, false, true, false, false, false, false, false, false);
            break;

         case 'rebateamt':
            self.setControlsVisibility(false, false, false, true, false, false, false, false, false);
            break;
         case 'rebatepct':
            self.setControlsVisibility(false, false, false, false, true, false, false, false, false);
            break;
         case 'sharepct':
            self.setControlsVisibility(false, false, false, false, false, true, false, false, false);
            break;
         case 'capsellamount':
            self.setControlsVisibility(false, false, false, false, false, false, true, false, false);
            break;
         case 'capselltypefl':
            self.setControlsVisibility(false, false, false, false, false, false, false, true, false);
            break;
         case 'contractlineno':
            self.setControlsVisibility(false, false, false, false, false, false, false, false, true);
            break;
         default:
            self.setControlsVisibility(true, false, false, false, false, false, false, false, false);
            break;
      }
   };

   self.setControlsVisibility = function (txtBoxVisible, chkBoxVisible, datePickerVisible, rebAmountVisible, rebPercentVisible, sharePctVisible,
      capSellAmountVisible, capSellTypeVisible, contractLineNoVisible) {
      self.isTextBoxVisible = txtBoxVisible;
      self.isCheckBoxVisible = chkBoxVisible;
      self.isDatePickerVisible = datePickerVisible;
      self.isRebAmountVisible = rebAmountVisible;
      self.isRebPercentVisible = rebPercentVisible;
      self.isCapSellTypeVisible = capSellTypeVisible;
      self.isCapSellAmountVisible = capSellAmountVisible;
      self.isSharePctVisible = sharePctVisible;
      self.isContractLineNoVisible = contractLineNoVisible;
   };

   self.returnUpdatedValue = function () {
      if (self.isTextBoxVisible) {
         return self.textBoxValue;
      }
      else if (self.isCheckBoxVisible) {
         return self.checkBoxValue;
      }
      else if (self.isDatePickerVisible) {
         return self.datePickerValue;
      }
      else if (self.isRebAmountVisible) {
         return self.rebAmountValue;
      }
      else if (self.isRebPercentVisible) {
         return self.rebPercentValue;
      }
      else if (self.isCapSellTypeVisible) {
         return self.capSellTypeValue;
      }
      else if (self.isCapSellAmountVisible) {
         return self.capSellAmountValue;
      }
      else if (self.isSharePctVisible) {
         return self.sharePctValue;
      }
      else if (self.isContractLineNoVisible) {
         return self.contractLineNoValue;
      }
   };

   self.cancel = function () {
      popup.pdColumnOverrideModal.destroy();
   };

   self.submit = function () {

      var overrideCriteria = {};
      var overrideArray = [];

      base.selectedPdsrRecords.forEach(function (record) {
         self.setPdsrObject(record);
         self.pdemGridUpdatePdsr[self.selectedColumn] = self.returnUpdatedValue();

         overrideCriteria = {
            pdemgridupdatepdsr: self.pdemGridUpdatePdsr,
            lColOvrRd: true
         };
         overrideArray.push(overrideCriteria);
      });

      DataService.post('api/pd/aspdentry/pdemgridupdatepdsrmultiple', { data: overrideArray, busy: true }, function (messaging) {
         if (messaging) {
            MessageService.processMessaging(messaging);
         }
         self.cancel();
         $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
      });
   };

   self.setPdsrObject = function (record) {
      self.pdemGridUpdatePdsr = {
         updttype: record.updttype,
         contractNo: record.contractNo,
         startdt: record.startdt,
         enddt: record.enddt,
         rebcalcty: record.rebcalcty,
         refer: record.refer,
         margincostty: record.margincostty,
         rebatecostty: record.rebatecostty,
         rebdowntoty: record.rebdowntoty,
         rebateamt: record.rebateamt,
         rebatepct: record.rebatepct,
         priceSheet: record.priceSheet,
         priceEffectiveDate: record.priceEffectiveDate,
         priceSheetTo: record.priceSheetTo,
         priceEffectiveDateTo: record.priceEffectiveDateTo,
         pvPdmlineRowid: record.pvPdmlineRowid,
         sharefl: record.sharefl,
         sharepct: record.sharepct,
         capsellamount: record.capsellamount,
         capselltypefl: record.capselltypefl,
         manualfl: record.manualfl,
         contractlineno: record.contractlineno,
         contractcostfl: record.contractcostfl,
         userfield: record.userfield
      };
   };

});

app.controller('PdemUpdateCtrl', function ($scope, $state, $stateParams, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   self.pdemUpdateRptOK = {
      cSetID: base.pdemInitialLoadCriteria.cSetid,
      iDelete: 2
   };

   self.pdemUpdateRptInit = {};
   self.scheduleTime = '';
   self.printersettings = {};
   self.printerData = {};
   var printerCollection = [];

   self.questionMarkPost = false;
   self.questionMark = false;

   self.getDefaultData = function () {
      self.pdemUpdateRptInit = {};

      DataService.get('api/pd/aspdentry/pdemupdaterptinit/' + self.pdemUpdateRptOK.cSetID, {
         busy: true
      }, function (data) {
         if (data) {
            self.pdemUpdateRptInit = data;

            self.setInitialValues();
         }
      });
   };

   self.setInitialValues = function () {

      self.pdemUpdateRptOK.immediateFl = self.pdemUpdateRptInit.rsImmediateValue;
      self.pdemUpdateRptOK.iDelete = self.pdemUpdateRptInit.rsDeleteValue;
      self.pdemUpdateRptOK.currDateFl = self.pdemUpdateRptInit.tgCurrDateValue;
      self.pdemUpdateRptOK.currPeriodFl = self.pdemUpdateRptInit.tgCurrPeriodValue;

      if (self.pdemUpdateRptOK.currPeriodFl) {
         self.pdemUpdateRptOK.period = 0;
         self.questionMark = true;
      }
      else {
         self.questionMark = false;
         self.pdemUpdateRptOK.period = self.pdemUpdateRptInit.iGlDefPer;
      }

      if (self.pdemUpdateRptOK.currDateFl) {
         self.questionMarkPost = true;
         self.pdemUpdateRptOK.postDt = Utils.getCurrentDate();
      }
      else {
         self.questionMarkPost = false;
         self.pdemUpdateRptOK.postDt = Utils.getCurrentDate();
      }

      // Load Start Date/time Defaults
      self.initializeStartDate();
   };

   self.initializeStartDate = function () {

      var initializeRequest = {
         pdemnewset: self.pdemUpdateRptOK,
         pvType: 'sched'
      };

      DataService.post('api/pd/aspdentry/pdemnewsetinitialize', { data: initializeRequest, busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else {
               self.pdemUpdateRptOK.hour = data.pdemnewset.starttm;
               self.pdemUpdateRptOK.startDt = data.pdemnewset.startdt;
               self.pdemUpdateRptInit.fiStartdtSensitivity = !self.pdemUpdateRptOK.immediateFl;
               self.pdemUpdateRptInit.fiHourSensitivity = !self.pdemUpdateRptOK.immediateFl;
            }
         }
      });
   };

   self.submit = function () {
      self.printerControl.validatePrinterSettings(function (data) {
         if (data.isPrinterValid) {
            self.printersettings = data.printerDetails;
            self.updateWithPrinterSettings();
         }
      });
   };

   self.updateWithPrinterSettings = function () {
      printerCollection.push(self.printersettings);
      self.printerData = { printerSettings: printerCollection };

      // The time-zone offset is the difference, in minutes, between UTC and local time. Note that this means that
      // the offset is positive if the local timezone is behind UTC and negative if it is ahead.  This is the opposite
      // of how the backend expects it.
      self.dateToday = new Date();
      self.pdemUpdateRptOK.iTimeZoneClient = self.dateToday.getTimezoneOffset() * -1;

      var updateRptOKRequestAPI = {
         pdemupdaterptok: self.pdemUpdateRptOK,
         printersettings: self.printerData.printerSettings[0]
      };

      DataService.post('api/pd/aspdentry/pdemupdaterptok', {
         data: updateRptOKRequestAPI, busy: true
      }, function (data) {
         $state.go('pdem.master');
         MessageService.info('global.information', 'message.final.update.completed.successfully');
         base.detailClose();
      });
   };

   self.getDefaultData();
});

app.controller('PdemImportFromExcelCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var popup;
   var stringName = '';
   var runCSV = false;
   var runXLSX = false;

   if ($scope.pdsc1) {
      popup = $scope.pdsc1;
   }
   else if ($scope.pdsc2) {
      popup = $scope.pdsc2;
   }
   else if ($scope.pdsc3) {
      popup = $scope.pdsc3;
   }
   else if ($scope.pdsr) {
      popup = $scope.pdsr;
   }

   self.cancel = function () {
      popup.pdImportFromExcelModal.destroy();
   };

   self.import = function () {
      if (self.importedFile) {
         stringName = self.importedFile.name.toLowerCase();
         runCSV = stringName.endsWith('.csv');
         runXLSX = stringName.endsWith('.xlsx');
         Utils.readAsBinaryString(self.importedFile, self.fileReaderOnLoadCallback);
      } else {
         MessageService.error('global.error', 'global.input.file.is.required');
      }
   };

   self.fileReaderOnLoadCallback = function (data) {
      var workbook;

      if (runCSV) {
         MessageService.error('global.error', 'message.error.convert.file.before.import');
         return;
      } else if (runXLSX) {
         workbook = XLSX.read(data, { type: 'binary' });
      } else {
         workbook = XLS.read(data, { type: 'binary' });
      }
      var importFiles = [];
      var loadRecord = {};
      var sheets = [];
      var columns = [];
      var iRow = 0;
      var columnsList = '';
      var cImportFieldList = '';
      var sheetCount = 0;
      var currentSheetLabels = '';
      var excelImport = {};

      // This is for Multiple Work Sheets
      $.each(workbook.Sheets, function (index, value) { //ignore jslint - Defined in library.
         sheets.push(value);
         columnsList = self.getHeaderRow(value);
         columns.push(columnsList);
      });


      // This is all the Sheets - Pulling in the Objects (rows) on each sheet
      sheets.forEach(function (sheet, index) {

         // Pull in the current Work Sheet Column Labels - Build a Comma delimted field list for the Back End Update
         currentSheetLabels = columns[sheetCount];
         cImportFieldList = self.loadColumnLabels(currentSheetLabels);
         sheetCount = sheetCount + 1;

         if (runXLSX === true) {
            var rowObjects = XLSX.utils.sheet_to_row_object_array(sheet);
         } else {
            var rowObjects = XLS.utils.sheet_to_row_object_array(sheet);
         }

         rowObjects.forEach(function (row) {
            iRow = row.__rowNum__;

            var updttype = false;
            var statustype = false;
            var prctype = false;
            var capselltypefl = false;
            var sharefl = false;
            var manualfl = false;
            var contractcostfl = false;
            var modifierrebfl = false;
            var hardpricefl = false;
            var hardmaxqtyfl = false;
            var usepricerebfl = false;

            // Common Fields
            var updttypeChar = row[$translate.instant('global.update')] ? row[$translate.instant('global.update')] : ' ';
            var contractno = row[$translate.instant('global.contract.number')] ? row[$translate.instant('global.contract.number')] : ' ';
            var prctypeChar = row[$translate.instant('global.price.type')] ? row[$translate.instant('global.price.type')] : ' ';
            var pricesheet = row[$translate.instant('global.price.sheet.name')] ? row[$translate.instant('global.price.sheet.name')] : ' ';
            var priceeffectivedate = row[$translate.instant('global.price.sheet.dt')] ? row[$translate.instant('global.price.sheet.dt')] : ' ';
            var startdt = row[$translate.instant('global.start.date')] ? row[$translate.instant('global.start.date')] : ' ';
            var enddt = row[$translate.instant('global.end.date')] ? row[$translate.instant('global.end.date')] : ' ';
            var refer = row[$translate.instant('global.reference')] ? row[$translate.instant('global.reference')] : ' ';
            var rowid = row['RowID'] ? row['RowID'] : ' ';

            // PDSC Specific
            var statustypeChar = row[$translate.instant('global.status')] ? row[$translate.instant('global.status')] : ' ';
            var qtybreakty = row[$translate.instant('global.quantity.break.type')] ? row[$translate.instant('global.quantity.break.type')] : ' ';
            var priceonty = row[$translate.instant('global.basis')] ? row[$translate.instant('global.basis')] : ' ';
            var prcmult1 = row[$translate.instant('global.price.1')] ? row[$translate.instant('global.price.1')] : ' ';
            var prcmult2 = row[$translate.instant('global.price.2')] ? row[$translate.instant('global.price.2')] : ' ';
            var prcmult3 = row[$translate.instant('global.price.3')] ? row[$translate.instant('global.price.3')] : ' ';
            var prcmult4 = row[$translate.instant('global.price.4')] ? row[$translate.instant('global.price.4')] : ' ';
            var prcmult5 = row[$translate.instant('global.price.5')] ? row[$translate.instant('global.price.5')] : ' ';
            var prcmult6 = row[$translate.instant('global.price.6')] ? row[$translate.instant('global.price.6')] : ' ';
            var prcmult7 = row[$translate.instant('global.price.7')] ? row[$translate.instant('global.price.7')] : ' ';
            var prcmult8 = row[$translate.instant('global.price.8')] ? row[$translate.instant('global.price.8')] : ' ';
            var prcmult9 = row[$translate.instant('global.price.9')] ? row[$translate.instant('global.price.9')] : ' ';
            var qtybrk1 = row[$translate.instant('global.quantity.break.1')] ? row[$translate.instant('global.quantity.break.1')] : ' ';
            var qtybrk2 = row[$translate.instant('global.quantity.break.2')] ? row[$translate.instant('global.quantity.break.2')] : ' ';
            var qtybrk3 = row[$translate.instant('global.quantity.break.3')] ? row[$translate.instant('global.quantity.break.3')] : ' ';
            var qtybrk4 = row[$translate.instant('global.quantity.break.4')] ? row[$translate.instant('global.quantity.break.4')] : ' ';
            var qtybrk5 = row[$translate.instant('global.quantity.break.5')] ? row[$translate.instant('global.quantity.break.5')] : ' ';
            var qtybrk6 = row[$translate.instant('global.quantity.break.6')] ? row[$translate.instant('global.quantity.break.6')] : ' ';
            var qtybrk7 = row[$translate.instant('global.quantity.break.7')] ? row[$translate.instant('global.quantity.break.7')] : ' ';
            var qtybrk8 = row[$translate.instant('global.quantity.break.8')] ? row[$translate.instant('global.quantity.break.8')] : ' ';
            var prcdisc1 = row[$translate.instant('global.discount.1')] ? row[$translate.instant('global.discount.1')] : ' ';
            var prcdisc2 = row[$translate.instant('global.discount.2')] ? row[$translate.instant('global.discount.2')] : ' ';
            var prcdisc3 = row[$translate.instant('global.discount.3')] ? row[$translate.instant('global.discount.3')] : ' ';
            var prcdisc4 = row[$translate.instant('global.discount.4')] ? row[$translate.instant('global.discount.4')] : ' ';
            var prcdisc5 = row[$translate.instant('global.discount.5')] ? row[$translate.instant('global.discount.5')] : ' ';
            var prcdisc6 = row[$translate.instant('global.discount.6')] ? row[$translate.instant('global.discount.6')] : ' ';
            var prcdisc7 = row[$translate.instant('global.discount.7')] ? row[$translate.instant('global.discount.7')] : ' ';
            var prcdisc8 = row[$translate.instant('global.discount.8')] ? row[$translate.instant('global.discount.8')] : ' ';
            var prcdisc9 = row[$translate.instant('global.discount.9')] ? row[$translate.instant('global.discount.9')] : ' ';
            var modifiernm = row[$translate.instant('global.modifier.name')] ? row[$translate.instant('global.modifier.name')] : ' ';
            var modifierrebflChar = row[$translate.instant('global.allow.with.rebate')] ? row[$translate.instant('global.allow.with.rebate')] : ' ';
            var hardpriceflChar = row[$translate.instant('global.hard.system.price')] ? row[$translate.instant('global.hard.system.price')] : ' ';
            var hardmaxqtyflChar = row[$translate.instant('global.hard.maximum')] ? row[$translate.instant('global.hard.maximum')] : ' ';
            var maxqtytype = row[$translate.instant('global.based.on')] ? row[$translate.instant('global.based.on')] : ' ';
            var ovrridepctup = row[$translate.instant('global.override.tolerance.up')] ? row[$translate.instant('global.override.tolerance.up')] : ' ';
            var ovrridepctdown = row[$translate.instant('global.override.tolerance.down')] ? row[$translate.instant('global.override.tolerance.down')] : ' ';
            var lastuseddt = row[$translate.instant('global.last.used.date')] ? row[$translate.instant('global.last.used.date')] : ' ';

            // Rebate Spcific
            var rebcalcty = row[$translate.instant('global.rebate.calculation.type')] ? row[$translate.instant('global.rebate.calculation.type')] : ' ';
            var margincostty = row[$translate.instant('global.margin.basis')] ? row[$translate.instant('global.margin.basis')] : ' ';
            var rebatecostty = row[$translate.instant('global.rebate.from.basis')] ? row[$translate.instant('global.rebate.from.basis')] : ' ';
            var rebdowntoty = row[$translate.instant('global.rebate.down.to.basis')] ? row[$translate.instant('global.rebate.down.to.basis')] : ' ';
            var rebateamt = row[$translate.instant('global.rebate.amount')] ? row[$translate.instant('global.rebate.amount')] : ' ';
            var rebatepct = row[$translate.instant('global.rebate.percent')] ? row[$translate.instant('global.rebate.percent')] : ' ';
            var pricesheetto = row[$translate.instant('global.price.sheet.name.to')] ? row[$translate.instant('global.price.sheet.name.to')] : ' ';
            var priceeffectivedateto = row[$translate.instant('global.price.sheet.dt.to')] ? row[$translate.instant('global.price.sheet.dt.to')] : ' ';
            var shareflChar = row[$translate.instant('global.share.rebate')] ? row[$translate.instant('global.share.rebate')] : ' ';
            var sharepct = row[$translate.instant('global.share.rebate.percent')] ? row[$translate.instant('global.share.rebate.percent')] : ' ';
            var capsellamount = row[$translate.instant('global.cap.sell.amount')] ? row[$translate.instant('global.cap.sell.amount')] : ' ';
            var capselltypeflChar = row[$translate.instant('global.cap.sell.type')] ? row[$translate.instant('global.cap.sell.type')] : ' ';
            var manualflChar = row[$translate.instant('global.manual.rebate')] ? row[$translate.instant('global.manual.rebate')] : ' ';
            var contractlineno = row[$translate.instant('global.contract.line.number')] ? row[$translate.instant('global.contract.line.number')] : ' ';
            var contractcostflChar = row[$translate.instant('global.contract.cost')] ? row[$translate.instant('global.contract.cost')] : ' ';

            var usepricerebflChar = row[$translate.instant('global.use.rebate.price')] ? row[$translate.instant('global.use.rebate.price')] : ' ';
            var price = row[$translate.instant('global.rebate.price')] ? row[$translate.instant('global.rebate.price')] : ' ';
            var prccurrencyty = row[$translate.instant('global.rebate.price.currency')] ? row[$translate.instant('global.rebate.price.currency')] : ' ';

            // Set Values For Back End Validation - If Column Data Using Descriptions and Not Raw Data

            if (prctypeChar.toLowerCase() === $translate.instant('global.amount').toLowerCase() ||
               prctypeChar.toLowerCase() === $translate.instant('global.amt').toLowerCase() ||
               prctypeChar.toLowerCase() === base.currencySymbol ||
               prctypeChar.toLowerCase() === 'amount' ||
               prctypeChar.toLowerCase() === 'amt' ||
               prctypeChar.toLowerCase() === '$') {
               prctype = true;
            } else {
               prctype = false;
            }

            if (statustypeChar.toLowerCase() === 'active' || statustypeChar.toLowerCase() === 'a' ||
               statustypeChar.toLowerCase() === $translate.instant('global.active').toLowerCase()) {
               statustype = 'Active';
            } else {
               statustype = 'Inactive';
            }

            if (capselltypeflChar.toLowerCase() === $translate.instant('global.amount').toLowerCase() || capselltypeflChar === '$' ||
               capselltypeflChar.toLowerCase() === $translate.instant('global.amt').toLowerCase() || capselltypeflChar === base.currencySymbol ||
               capselltypeflChar.toLowerCase() === 'amount' || capselltypeflChar.toLowerCase() === 'amt' ||
               capselltypeflChar.toLowerCase() === $translate.instant('global.yes').toLowerCase() ||
               capselltypeflChar.toLowerCase() === $translate.instant('global.true').toLowerCase() ||
               capselltypeflChar.toLowerCase() === $translate.instant('global.y').toLowerCase() ||
               capselltypeflChar.toLowerCase() === 'yes' ||
               capselltypeflChar.toLowerCase() === 'true' ||
               capselltypeflChar.toLowerCase() === 'y') {
               capselltypefl = true;
            } else {
               capselltypefl = false;
            }

            // Logical yes/no fields
            updttype = self.loadLogicalColValue(updttypeChar.toLowerCase());
            sharefl = self.loadLogicalColValue(shareflChar.toLowerCase());
            manualfl = self.loadLogicalColValue(manualflChar.toLowerCase());
            contractcostfl = self.loadLogicalColValue(contractcostflChar.toLowerCase());
            modifierrebfl = self.loadLogicalColValue(modifierrebflChar.toLowerCase());
            hardpricefl = self.loadLogicalColValue(hardpriceflChar.toLowerCase());
            hardmaxqtyfl = self.loadLogicalColValue(hardmaxqtyflChar.toLowerCase());
            usepricerebfl = self.loadLogicalColValue(usepricerebflChar.toLowerCase());

            // Pricing - qtybreakty - must be P/D/Blank raw data - Convert Valid Descriptions
            if (qtybreakty.toLowerCase() === $translate.instant('global.price').toLowerCase() || qtybreakty.toLowerCase() === 'price') {
               qtybreakty = 'P';
            } else if (qtybreakty.toLowerCase() === $translate.instant('global.discount').toLowerCase() || qtybreakty.toLowerCase() === 'discount') {
               qtybreakty = 'D';
            }

            // Pricing (Basis) - priceonty - must be B,C,L,M,RM,RC,CB,CR,CS,MR,MS,C1-9,V1-9/Blank raw data - Convert Valid Descriptions
            if (priceonty.toLowerCase() === $translate.instant('global.base.price').toLowerCase() || priceonty.toLowerCase() === 'base price') {
               priceonty = 'B';
            } else if (priceonty.toLowerCase() === $translate.instant('global.cost').toLowerCase() || priceonty.toLowerCase() === 'cost') {
               priceonty = 'C';
            } else if (priceonty.toLowerCase() === $translate.instant('global.list.price').toLowerCase() || priceonty.toLowerCase() === 'list price') {
               priceonty = 'L';
            } else if (priceonty.toLowerCase() === $translate.instant('global.margin').toLowerCase() || priceonty.toLowerCase() === 'margin') {
               priceonty = 'M';
            } else if (priceonty.toLowerCase() === $translate.instant('global.rebated.margin').toLowerCase() || priceonty.toLowerCase() === 'rebated margin') {
               priceonty = 'RM';
            } else if (priceonty.toLowerCase() === $translate.instant('global.rebated.cost').toLowerCase() || priceonty.toLowerCase() === 'rebated cost') {
               priceonty = 'RC';
            } else if (priceonty.toLowerCase() === $translate.instant('global.rebate.cost').toLowerCase() || priceonty.toLowerCase() === 'rebate cost') {
               priceonty = 'CB';
            } else if (priceonty.toLowerCase() === $translate.instant('global.replacement.cost').toLowerCase() || priceonty.toLowerCase() === 'replacement cost') {
               priceonty = 'CR';
            } else if (priceonty.toLowerCase() === $translate.instant('global.standard.cost').toLowerCase() || priceonty.toLowerCase() === 'standard cost') {
               priceonty = 'CS';
            } else if (priceonty.toLowerCase() === $translate.instant('global.margin.with.repl.cost').toLowerCase() || priceonty.toLowerCase() === 'margin (with repl cost)') {
               priceonty = 'MR';
            } else if (priceonty.toLowerCase() === $translate.instant('global.margin.with.std.cost').toLowerCase() || priceonty.toLowerCase() === 'margin (with std cost)') {
               priceonty = 'MS';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.1').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 1') {
               priceonty = 'C1';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.2').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 2') {
               priceonty = 'C2';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.3').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 3') {
               priceonty = 'C3';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.4').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 4') {
               priceonty = 'C4';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.5').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 5') {
               priceonty = 'C5';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.6').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 6') {
               priceonty = 'C6';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.7').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 7') {
               priceonty = 'C7';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.8').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 8') {
               priceonty = 'C8';
            } else if (priceonty.toLowerCase() === $translate.instant('global.customer.sheet.column.9').toLowerCase() ||
               priceonty.toLowerCase() === 'customer sheet column 9') {
               priceonty = 'C9';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.1').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 1') {
               priceonty = 'V1';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.2').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 2') {
               priceonty = 'V2';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.3').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 3') {
               priceonty = 'V3';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.4').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 4') {
               priceonty = 'V4';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.5').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 5') {
               priceonty = 'V5';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.6').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 6') {
               priceonty = 'V6';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.7').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 7') {
               priceonty = 'V7';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.8').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 8') {
               priceonty = 'V8';
            } else if (priceonty.toLowerCase() === $translate.instant('global.vendor.sheet.column.9').toLowerCase() ||
               priceonty.toLowerCase() === 'vendor sheet column 9') {
               priceonty = 'V9';
            }

            // Pricing - maxqtytype - must be C/P/S/W raw data - Convert Valid Descriptions
            if (maxqtytype.toLowerCase() === $translate.instant('global.cube').toLowerCase() || maxqtytype.toLowerCase() === 'cube') {
               maxqtytype = 'C';
            } else if (maxqtytype.toLowerCase() === $translate.instant('global.spc.unit').toLowerCase() || maxqtytype.toLowerCase() === 'spc unit') {
               maxqtytype = 'P';
            } else if (maxqtytype.toLowerCase() === $translate.instant('global.stocking.unit').toLowerCase() || maxqtytype.toLowerCase() === 'stocking unit') {
               maxqtytype = 'S';
            } else if (maxqtytype.toLowerCase() === $translate.instant('global.weight').toLowerCase() || maxqtytype.toLowerCase() === 'weight') {
               maxqtytype = 'W';
            }

            // Reabtes - rebcalcty - $, %, N, M
            if (rebcalcty.toLowerCase() === $translate.instant('global.amount').toLowerCase() || rebcalcty === '$' ||
               rebcalcty.toLowerCase() === $translate.instant('global.amt').toLowerCase() || rebcalcty === base.currencySymbol ||
               rebcalcty.toLowerCase() === 'amount' || rebcalcty.toLowerCase() === 'amt') {
               rebcalcty = base.currencySymbol;
            } else if (rebcalcty.toLowerCase() === $translate.instant('global.percent').toLowerCase() ||
               rebcalcty.toLowerCase() === $translate.instant('global.pct').toLowerCase() ||
               rebcalcty === '%' || rebcalcty.toLowerCase() === 'percent' || rebcalcty.toLowerCase() === 'pct') {
               rebcalcty = '%';
            } else if (rebcalcty.toLowerCase() === $translate.instant('global.net').toLowerCase() ||
               rebcalcty.toLowerCase() === 'net') {
               rebcalcty = 'N';
            } else if (rebcalcty.toLowerCase() === $translate.instant('global.margin.guaranteed').toLowerCase() ||
               rebcalcty.toLowerCase() === $translate.instant('global.margin').toLowerCase() ||
               rebcalcty.toLowerCase() === 'margin guaranteed' || rebcalcty.toLowerCase() === 'margin') {
               rebcalcty = 'M';
            }

            // Rebates - rebatecostty
            rebatecostty = self.loadRebateColValue(rebatecostty.toLowerCase());

            // Rebates - margincostty
            margincostty = self.loadRebateColValue(margincostty.toLowerCase());

            // Rebates - rebdowntoty
            rebdowntoty = self.loadRebateColValue(rebdowntoty.toLowerCase());

            if ($scope.pdsc1 || $scope.pdsc2 || $scope.pdsc3) {

               loadRecord = {
                  updttype: updttype,
                  ContractNo: contractno,
                  prctype: prctype,
                  PriceSheet: pricesheet,
                  PriceEffectiveDate: priceeffectivedate,
                  startdt: startdt,
                  enddt: enddt,
                  refer: refer,
                  statustype: statustype,
                  qtybreakty: qtybreakty,
                  priceonty: priceonty,
                  prcmult1: prcmult1,
                  prcmult2: prcmult2,
                  prcmult3: prcmult3,
                  prcmult4: prcmult4,
                  prcmult5: prcmult5,
                  prcmult6: prcmult6,
                  prcmult7: prcmult7,
                  prcmult8: prcmult8,
                  prcmult9: prcmult9,
                  qtybrk1: qtybrk1,
                  qtybrk2: qtybrk2,
                  qtybrk3: qtybrk3,
                  qtybrk4: qtybrk4,
                  qtybrk5: qtybrk5,
                  qtybrk6: qtybrk6,
                  qtybrk7: qtybrk7,
                  qtybrk8: qtybrk8,
                  prcdisc1: prcdisc1,
                  prcdisc2: prcdisc2,
                  prcdisc3: prcdisc3,
                  prcdisc4: prcdisc4,
                  prcdisc5: prcdisc5,
                  prcdisc6: prcdisc6,
                  prcdisc7: prcdisc7,
                  prcdisc8: prcdisc8,
                  prcdisc9: prcdisc9,
                  modifiernm: modifiernm,
                  modifierrebfl: modifierrebfl,
                  pvPdmlineRowid: '',
                  excelrowid: rowid,
                  hardpricefl: hardpricefl,
                  hardmaxqtyfl: hardmaxqtyfl,
                  maxqtytype: maxqtytype,
                  ovrridepctup: ovrridepctup,
                  ovrridepctdown: ovrridepctdown,
                  lastuseddt: lastuseddt,
                  userfield: ''
               };

               //User Hook (do not rename)
               if (self.setPricingRowObject) {
                  self.setPricingRowObject(row, loadRecord);
               }
            }
            else if ($scope.pdsr) {
               loadRecord = {
                  updttype: updttype,
                  ContractNo: contractno,
                  startdt: startdt,
                  enddt: enddt,
                  refer: refer,
                  rebcalcty: rebcalcty,
                  margincostty: margincostty,
                  rebatecostty: rebatecostty,
                  rebdowntoty: rebdowntoty,
                  rebateamt: rebateamt,
                  rebatepct: rebatepct,
                  PriceSheet: pricesheet,
                  PriceEffectiveDate: priceeffectivedate,
                  PriceSheetTo: pricesheetto,
                  PriceEffectiveDateTo: priceeffectivedateto,
                  sharefl: sharefl,
                  sharepct: sharepct,
                  capsellamount: capsellamount,
                  capselltypefl: capselltypefl,
                  manualfl: manualfl,
                  contractlineno: contractlineno,
                  contractcostfl: contractcostfl,
                  prccurrencyty: prccurrencyty,
                  price: price,
                  usepricerebfl: usepricerebfl,
                  pvPdmlineRowid: '',
                  excelrowid: rowid,
                  userfield: ''
               };

               //User Hook (do not rename)
               if (self.setRebateRowObject) {
                  self.setRebateRowObject(row, loadRecord);
               }
            }

            importFiles.push(loadRecord);
         });
      });

      if ($scope.pdsc1 && importFiles) {

         self.pdemloadpdsc1criteria = {
            cSetid: base.pdemInitialLoadCriteria.cSetid
         };
         self.pdmerridpdsc1 = [];

         // Make sure cImportFieldList stays empty to load errors to Row data not back to Excel
         excelImport = {
            pdemloadpdsc1results: importFiles,
            pdmerridpdsc1: self.pdmerridpdsc1,
            pdemloadpdsc1criteria: self.pdemloadpdsc1criteria,
            cSetID: base.pdemInitialLoadCriteria.cSetid,
            cImportFieldList: cImportFieldList
         };

         DataService.post('api/pd/aspdentry/pdemexcelimportupdtpdsc1', { data: excelImport, busy: true }, function (data) {
            if (data) {

               base.pdmerridpdsc1 = data.pdmerridpdsc1;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - using the error table
               base.loadPdsc1ScreenData('UPDT');
            } else {

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Refresh Grid data with updated values
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
         });
      }

      if ($scope.pdsc2 && importFiles) {

         self.pdemloadpdsc2criteria = {
            cSetid: base.pdemInitialLoadCriteria.cSetid
         };
         self.pdmerridpdsc2 = [];

         // Make sure cImportFieldList stays empty to load errors to Row data not back to Excel
         excelImport = {
            pdemloadpdsc2results: importFiles,
            pdmerridpdsc2: self.pdmerridpdsc2,
            pdemloadpdsc2criteria: self.pdemloadpdsc2criteria,
            cSetID: base.pdemInitialLoadCriteria.cSetid,
            cImportFieldList: cImportFieldList
         };

         DataService.post('api/pd/aspdentry/pdemexcelimportupdtpdsc2', { data: excelImport, busy: true }, function (data) {
            if (data) {

               base.pdmerridpdsc2 = data.pdmerridpdsc2;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - using the error table
               base.loadPdsc2ScreenData('UPDT');
            } else {

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Refresh Grid data with updated values
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
         });
      }

      if ($scope.pdsc3 && importFiles) {

         self.pdemloadpdsc3criteria = {
            cSetid: base.pdemInitialLoadCriteria.cSetid
         };
         self.pdmerridpdsc3 = [];

         // Make sure cImportFieldList stays empty to load errors to Row data not back to Excel
         excelImport = {
            pdemloadpdsc3results: importFiles,
            pdmerridpdsc3: self.pdmerridpdsc3,
            pdemloadpdsc3criteria: self.pdemloadpdsc3criteria,
            cSetID: base.pdemInitialLoadCriteria.cSetid,
            cImportFieldList: cImportFieldList
         };

         DataService.post('api/pd/aspdentry/pdemexcelimportupdtpdsc3', { data: excelImport, busy: true }, function (data) {
            if (data) {

               base.pdmerridpdsc3 = data.pdmerridpdsc3;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - using the error table
               base.loadPdsc3ScreenData('UPDT');
            } else {

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Refresh Grid data with updated values
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
         });
      }

      if ($scope.pdsr && importFiles) {

         self.pdemloadpdsrcriteria = {
            cSetid: base.pdemInitialLoadCriteria.cSetid
         };
         self.pdmerridpdsr = [];

         // Make sure cImportFieldList stays empty to load errors to Row data not back to Excel
         excelImport = {
            pdemloadpdsrresults: importFiles,
            pdmerridpdsr: self.pdmerridpdsr,
            pdemloadpdsrcriteria: self.pdemloadpdsrcriteria,
            cSetID: base.pdemInitialLoadCriteria.cSetid,
            cImportFieldList: cImportFieldList
         };

         DataService.post('api/pd/aspdentry/pdemexcelimportupdtpdsr', { data: excelImport, busy: true }, function (data) {
            if (data) {

               base.pdmerridpdsr = data.pdmerridpdsr;

               // If there are Errors - should be a single Error pop-up with the counts (ex. 10 of 300 lines)
               MessageService.processMessaging(data.messaging);

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Load Errors into the Grid records - by RowID - and Refresh the Grid - using the error table
               base.loadPdsrScreenData('UPDT');
            } else {

               // Hide/Cancel the Popup Screen
               self.cancel();

               // Refresh Grid data with updated values
               $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
            }
         });
      }

   };

   self.loadLogicalColValue = function (columnValue) {
      if (columnValue.toLowerCase() === $translate.instant('global.yes').toLowerCase() ||
         columnValue.toLowerCase() === $translate.instant('global.true').toLowerCase() ||
         columnValue.toLowerCase() === $translate.instant('global.y').toLowerCase() ||
         columnValue.toLowerCase() === 'yes' ||
         columnValue.toLowerCase() === 'true' ||
         columnValue.toLowerCase() === 'y') {
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

   self.loadColumnLabels = function (colList) {

      var colLabel = '';
      var fieldList = '';

      for (var i = 0; i < colList.length; i++) {

         colLabel = colList[i];

         switch (colLabel) {

            // Common
            case 'RowID':
               fieldList += 'RowID' + ',';
               break;
            case $translate.instant('global.update'):
               fieldList += 'updttype' + ',';
               break;
            case $translate.instant('global.contract.number'):
               fieldList += 'contractno' + ',';
               break;
            case $translate.instant('global.price.type'):
               fieldList += 'prctype' + ',';
               break;
            case $translate.instant('global.price.sheet.name'):
               fieldList += 'pricesheet' + ',';
               break;
            case $translate.instant('global.price.sheet.dt'):
               fieldList += 'priceeffectivedate' + ',';
               break;
            case $translate.instant('global.start.date'):
               fieldList += 'startdt' + ',';
               break;
            case $translate.instant('global.end.date'):
               fieldList += 'enddt' + ',';
               break;
            case $translate.instant('global.reference'):
               fieldList += 'refer' + ',';
               break;

            // Pricing Specific
            case $translate.instant('global.status'):
               fieldList += 'statustype' + ',';
               break;
            case $translate.instant('global.quantity.break.type'):
               fieldList += 'qtybreakty' + ',';
               break;
            case $translate.instant('global.basis'):
               fieldList += 'priceonty' + ',';
               break;
            case $translate.instant('global.price.1'):
               fieldList += 'prcmult1' + ',';
               break;
            case $translate.instant('global.price.2'):
               fieldList += 'prcmult2' + ',';
               break;
            case $translate.instant('global.price.3'):
               fieldList += 'prcmult3' + ',';
               break;
            case $translate.instant('global.price.4'):
               fieldList += 'prcmult4' + ',';
               break;
            case $translate.instant('global.price.5'):
               fieldList += 'prcmult5' + ',';
               break;
            case $translate.instant('global.price.6'):
               fieldList += 'prcmult6' + ',';
               break;
            case $translate.instant('global.price.7'):
               fieldList += 'prcmult7' + ',';
               break;
            case $translate.instant('global.price.8'):
               fieldList += 'prcmult8' + ',';
               break;
            case $translate.instant('global.price.9'):
               fieldList += 'prcmult9' + ',';
               break;
            case $translate.instant('global.quantity.break.1'):
               fieldList += 'qtybrk1' + ',';
               break;
            case $translate.instant('global.quantity.break.2'):
               fieldList += 'qtybrk2' + ',';
               break;
            case $translate.instant('global.quantity.break.3'):
               fieldList += 'qtybrk3' + ',';
               break;
            case $translate.instant('global.quantity.break.4'):
               fieldList += 'qtybrk4' + ',';
               break;
            case $translate.instant('global.quantity.break.5'):
               fieldList += 'qtybrk5' + ',';
               break;
            case $translate.instant('global.quantity.break.6'):
               fieldList += 'qtybrk6' + ',';
               break;
            case $translate.instant('global.quantity.break.7'):
               fieldList += 'qtybrk7' + ',';
               break;
            case $translate.instant('global.quantity.break.8'):
               fieldList += 'qtybrk8' + ',';
               break;
            case $translate.instant('global.discount.1'):
               fieldList += 'prcdisc1' + ',';
               break;
            case $translate.instant('global.discount.2'):
               fieldList += 'prcdisc2' + ',';
               break;
            case $translate.instant('global.discount.3'):
               fieldList += 'prcdisc3' + ',';
               break;
            case $translate.instant('global.discount.4'):
               fieldList += 'prcdisc4' + ',';
               break;
            case $translate.instant('global.discount.5'):
               fieldList += 'prcdisc5' + ',';
               break;
            case $translate.instant('global.discount.6'):
               fieldList += 'prcdisc6' + ',';
               break;
            case $translate.instant('global.discount.7'):
               fieldList += 'prcdisc7' + ',';
               break;
            case $translate.instant('global.discount.8'):
               fieldList += 'prcdisc8' + ',';
               break;
            case $translate.instant('global.discount.9'):
               fieldList += 'prcdisc9' + ',';
               break;
            case $translate.instant('global.modifier.name'):
               fieldList += 'modifiernm' + ',';
               break;
            case $translate.instant('global.allow.with.rebate'):
               fieldList += 'modifierrebfl' + ',';
               break;
            case $translate.instant('global.hard.system.price'):
               fieldList += 'hardpricefl' + ',';
               break;
            case $translate.instant('global.hard.maximum'):
               fieldList += 'hardmaxqtyfl' + ',';
               break;
            case $translate.instant('global.based.on'):
               fieldList += 'maxqtytype' + ',';
               break;
            case $translate.instant('global.override.tolerance.up'):
               fieldList += 'ovrridepctup' + ',';
               break;
            case $translate.instant('global.override.tolerance.down'):
               fieldList += 'ovrridepctdown' + ',';
               break;
            case $translate.instant('global.last.used.date'):
               fieldList += 'lastuseddt' + ',';
               break;

            // Rebate Spcific
            case $translate.instant('global.rebate.calculation.type'):
               fieldList += 'rebcalcty' + ',';
               break;
            case $translate.instant('global.margin.basis'):
               fieldList += 'margincostty' + ',';
               break;
            case $translate.instant('global.rebate.from.basis'):
               fieldList += 'rebatecostty' + ',';
               break;
            case $translate.instant('global.rebate.down.to.basis'):
               fieldList += 'rebdowntoty' + ',';
               break;
            case $translate.instant('global.rebate.amount'):
               fieldList += 'rebateamt' + ',';
               break;
            case $translate.instant('global.rebate.percent'):
               fieldList += 'rebatepct' + ',';
               break;
            case $translate.instant('global.price.sheet.name.to'):
               fieldList += 'pricesheetto' + ',';
               break;
            case $translate.instant('global.price.sheet.dt.to'):
               fieldList += 'priceeffectivedateto' + ',';
               break;
            case $translate.instant('global.share.rebate'):
               fieldList += 'sharefl' + ',';
               break;
            case $translate.instant('global.share.rebate.percent'):
               fieldList += 'sharepct' + ',';
               break;
            case $translate.instant('global.cap.sell.amount'):
               fieldList += 'capsellamount' + ',';
               break;
            case $translate.instant('global.cap.sell.type'):
               fieldList += 'capselltypefl' + ',';
               break;
            case $translate.instant('global.manual.rebate'):
               fieldList += 'manualfl' + ',';
               break;
            case $translate.instant('global.contract.line.number'):
               fieldList += 'contractlineno' + ',';
               break;
            case $translate.instant('global.contract.cost'):
               fieldList += 'contractcostfl' + ',';
               break;
            case $translate.instant('global.use.rebate.price'):
               fieldList += 'usepricerebfl' + ',';
               break;
            case $translate.instant('global.rebate.price'):
               fieldList += 'price' + ',';
               break;
            case $translate.instant('global.rebate.price.currency'):
               fieldList += 'prccurrencyty' + ',';
               break;
         }
      }
      return fieldList;
   };

   self.getHeaderRow = function (sheet) {
      var headers = [];

      if (runXLSX === true) {
         var range = XLSX.utils.decode_range(sheet['!ref']);
      } else {
         var range = XLS.utils.decode_range(sheet['!ref']);
      }
      var C, R = range.s.r;

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

         headers.push(hdr);
      }
      return headers;
   };

});
