'use strict';

app.controller('PdspContractSearchCtrl', function ($scope, $state, DataService, Utils) { //as vcsrch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      base.criteria.vendno = 0;
      base.criteria.prod = '';
      base.criteria.contractno = '';
      base.criteria.prodpricety = '';
      base.criteria.rebtype = '';
      base.criteria.clevelcd = 'v0';
      base.currentChangeLevelCd = 'v0';

      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('pdsp.contractMaster');
      }

      base.vcsearch();
   };
}); //end ContractSearch (vcsrch)


app.controller('PdspContractMasterCtrl', function ($scope, $state, $stateParams, $translate, ConfigService, DataService, GridService, MessageService) { //as vcmst
   var self = this;
   var base = $scope.base;

   if (base.criteria.clevelcd) {
      if (base.criteria.clevelcd.substring(0, 1) !== 'v' || base.criteria.clevelcd === 'v1') {
         base.criteria.clevelcd = 'v0';
         base.criteria.pdrecno = '0';
         base.currentChangeLevelCd = 'v0';
      }
   }

   // Reset logic is done already - just set field visibility
   self.clear = function () {

      self.advCriteria.clevelcd = 'v0';

      // Set field sensitivity
       base.searchFieldsVisible(self.advCriteria.clevelcd, '', '', '', 'adv');

   };

   if (!base.currentChangeLevelCd) {
      base.currentChangeLevelCd = 'v0';
   }

   // Advanced search criteria object with initial values
   self.advCriteria = {
      clevelcd: base.currentChangeLevelCd,
      pdrecno: '0',
      iRecordlimit: ConfigService.getDefaultRecordLimit()
   };

   // Load the Visble Settings - Adv Search
   base.searchFieldsVisible(self.advCriteria.clevelcd, '', '', '', 'adv');

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'contractno', label: MessageService.get('global.contract.number') },
      { value: 'whse', label: MessageService.get('global.warehouse') },
      { value: 'inactivefl', label: MessageService.get('global.inactive') },
      { value: 'startdt', label: MessageService.get('global.start.date') },
      { value: 'iRecordlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['contractno', 'whse', 'startdt', 'inactivefl', 'iRecordlimit'];

   // Product hyperlink
   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
      }
   };

   // Vendor hyperlink
   self.vendorHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.vcsearch();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      base.callType = '';

      // Go to detail state passing the row id
      $state.go('pdsp.contractDetail', {
         id: record.pdrecno
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.vcgrid);
      base.callType = '';

      if (record) {
         $state.go('pdsp.contractDetail.edit', {
            id: record.pdrecno
         });
      }
   };

   self.create = function () {
      base.callType = 'create';
      $state.go('pdsp.contractCreate');
   };

   self.copy = function () {
      base.callType = 'copy';
      $state.go('pdsp.contractCopy');
   };

   self.delete = function () {

      var records = GridService.getSelectedRecords(base.vcgrid);
      if (records) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            var pdsvcRecord;
            var deleteList = [];

            // Process one Row at a Time
            records.forEach(function (record) {

               pdsvcRecord = angular.copy(record);
               pdsvcRecord.clevelcd = record.levelcd;
               pdsvcRecord.iRecno = record.pdrecno;

               deleteList.push(pdsvcRecord);

            });

            DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function () {

               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.vcsearch();
            });
         });
      }
   };

   // Advanced Search
   self.search = function () {

      var searchLevelCode;
      var criteria = angular.copy(self.advCriteria);

      base.vcdataset = [];
      searchLevelCode = criteria.clevelcd;

      DataService.post('api/pd/aspdsetup/pdspvendcontsearch', { data: criteria, busy: true }, function (data) {
         if (data) {

            searchLevelCode = criteria.clevelcd;

            // Single Record found off Record# - load the Type found for the Grid Columns display
            if (searchLevelCode === 'v0' && data.pdspvendcontresults.length) {

               searchLevelCode = data.pdspvendcontresults[0].levelcd;

               // Load the Level Code Description
               data.pdspvendcontresults[0].leveldesc = base.loadCodeDesc(searchLevelCode);
            }

            // Load variable values not on the Results Table - leave prod 'as-is' with over stuffed data
            data.pdspvendcontresults.forEach(function (gridData) {

               if (gridData.levelcd === 'v2') {
                  gridData.leveldesc = base.loadCodeDesc(gridData.levelcd);
               } else if (gridData.levelcd === 'v2p') {
                  gridData.prodpricety = gridData.prod;
                  gridData.leveldesc = base.loadCodeDesc(gridData.levelcd);
               } else if (gridData.levelcd === 'v3') {
                  gridData.rebatety = gridData.prod.substring(0, 7);
                  gridData.subrebty = gridData.prod.substring(8);
                  gridData.leveldesc = base.loadCodeDesc(gridData.levelcd);
               } else if (gridData.levelcd === 'v4') {
                  gridData.leveldesc = base.loadCodeDesc(gridData.levelcd);
               } else {
                  gridData.leveldesc = $translate.instant('global.invalid');
               }
            });

            // Load the Column Visibility Settings
            base.searchFieldsVisible(searchLevelCode, '', '', '', 'srch');

            // Reload Changed data to the Grid data Set
            base.vcdataset = data.pdspvendcontresults;

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }
         }
      });
   };

}); //end ContractMaster (vcmst)


app.controller('PdspContractDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, UtilsData) { //as vcdtl
   var self = this;
   var base = $scope.base;
   self.pdsvc = {};

   // Max Qty Type
   self.maxQtyTyValue = function () {

      // Parse out the comma delimited field values and labels for the drop down list
      self.maxQtyTyList = [];
      var valueArray = [];
      var labelArray = [];
      var dropDownLabel;
      var dropDownValue;

      // Drop Down Data
      valueArray = self.pdsvc.maxqtytyli.split(',');
      labelArray = self.pdsvc.maxqtytypd.split(',');

      // Build the Drop Down paired data
      for (var i = 0; i < valueArray.length; i++) {
         dropDownLabel = valueArray[i];
         dropDownValue = labelArray[i];
         self.maxQtyTyList.push({ value: dropDownValue, label: dropDownLabel });
      }
   };

   // Qty Type
   self.qtyTypeValue = function () {

      // Parse out the comma delimited field values and labels for the drop down list
      self.qtyTypeList = [];
      var valueArray = [];
      var labelArray = [];
      var dropDownLabel;
      var dropDownValue;

      // Drop Down Data
      valueArray = self.pdsvc.qtytypeli.split(',');
      labelArray = self.pdsvc.qtytypepd.split(',');

      // Build the Drop Down paired data
      for (var i = 0; i < valueArray.length; i++) {
         dropDownLabel = valueArray[i];
         dropDownValue = labelArray[i];
         self.qtyTypeList.push({ value: dropDownValue, label: dropDownLabel });
      }
   };

   // Change Label
   self.loadMaxQtyLabel = function () {

      var maxLabel;

      maxLabel = $translate.instant('global.maximum.quantity');

      if (self.pdsvc.levelcd === 'v4') {
         maxLabel = $translate.instant('global.maximum.amount');
      }

      return maxLabel;
   };

   // Change Label
   self.loadActQtyLabel = function () {

      var actLabel;

      actLabel = $translate.instant('global.actual.quantity');

      if (self.pdsvc.levelcd === 'v4') {
         actLabel = $translate.instant('global.actual.amt');
      }

      return actLabel;
   };

   self.displayFields = function () {

      if (self.pdsvc.levelcd === 'v4') {
         return false;
      } else {
         return true;
      }
   };

   // SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function () {
      UtilsData.getSastnDescriptionSpecial('R', self.pdsvc.reference, function (descrip) {
         self.pdsvc.reference = descrip;
      });
   }

   //Set local pdsvc record
   self.loadRecord = function (callType) {

      var pdsvcList = {
         iRecNo: $stateParams.id
      };

      DataService.post('api/pd/aspdsetup/pdspvendcontinit', { data: pdsvcList, busy: true }, function (data) {
         if (data) {

            self.pdsvc = data;
            self.pdsvc.maxqtyty = data.maxqtytysv;
            self.pdsvc.qtytype = data.qtytypesv;
            base.currentChangeLevelCd = self.pdsvc.levelcd;

            // Max Qty type drop down
            self.maxQtyTyValue();

            // Qty type drop down
            self.qtyTypeValue();

            // Level Code Display
            self.displayLevelCode = '';
            for (var i = 0; i < base.levelCodeDetailPDSVC.length; i++) {
               var record = base.levelCodeDetailPDSVC[i];
               if (record.value === self.pdsvc.levelcd) {
                  self.displayLevelCode = record.label;
               }
            }
         }
      });
   };

   if ($stateParams.id) {
      self.loadRecord('detail');
   }

   self.subtitle = function () {
      var keyData;

      if (self.pdsvc.levelcd === 'v2') {
         keyData = $translate.instant('global.vendor.number') + ': ' + self.pdsvc.vendno + ' | ' +
                   $translate.instant('global.product') + ': ' + self.pdsvc.prod;
      } else if (self.pdsvc.levelcd === 'v2p') {
         keyData = $translate.instant('global.vendor.number') + ': ' + self.pdsvc.vendno + ' | ' +
                   $translate.instant('global.product.price.type') + ': ' + self.pdsvc.prodpricety;
      } else if (self.pdsvc.levelcd === 'v3') {
         keyData = $translate.instant('global.vendor.number') + ': ' + self.pdsvc.vendno + ' | ' +
                   $translate.instant('global.rebate.type') + ': ' + self.pdsvc.rebtype + ' ' + ' | ' + self.pdsvc.rebsubty;
      } else if (self.pdsvc.levelcd === 'v4') {
         keyData = $translate.instant('global.vendor.number') + ': ' + self.pdsvc.vendno + ' | ' +
                   $translate.instant('global.contract') + ': ' + self.pdsvc.contractno;
      }

      return keyData;
   };

   self.edit = function () {
      $state.go('pdsp.contractDetail.edit');
   };

   self.reset = function () {
      self.loadRecord();
      $state.go('pdsp.contractDetail.edit');
   };

   self.create = function () {
      base.callType = 'create';
      $state.go('pdsp.contractCreate');
   };

   // Trap for Response from Pop-up Question on Cancel
   self.editOKToCancel = function (callback) {

      MessageService.okCancel('global.question', base.cancelMessage, function () {
         callback(true);
         return true;
      },
      function () {
         callback(false);
         return false;
      });
   };

   self.cancel = function () {
      var cancelCriteria;

      if (base.callType === 'create') {

         // Ask a Question to Continue or not
         self.editOKToCancel(function (isOKFl) {
            if (isOKFl) {

               cancelCriteria = {
                  clevelcd: self.pdsvc.levelcd,
                  iRecno: self.pdsvc.pdrecno
               };

               DataService.post('api/pd/aspdsetup/cancelpdrecord', { data: cancelCriteria, busy: true }, function () {

                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  $state.go('pdsp.contractMaster');

               });
            } else {
               return;
            }
         });
      } else {
         $state.go('pdsp.contractMaster');
      }
   };

   self.delete = function () {

      var pdsvcRecord;
      var deleteList = [];

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

         pdsvcRecord = angular.copy(self.pdsvc);
         pdsvcRecord.iRecno = self.pdsvc.pdrecno;
         pdsvcRecord.clevelcd = self.pdsvc.levelcd;
         deleteList.push(pdsvcRecord);

         // Detail level data not updated - delete the header data just created
         DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function (data) {

            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.vcsearch();
            $state.go('pdsp.contractMaster', null, { reload: 'pdsp.contractrMaster' });
         });
      });
   };

   self.submit = function () {

      var pdsvcUpdtRecord;

      pdsvcUpdtRecord = angular.copy(self.pdsvc);

      // Load screen values to Criteria data names that differ
      pdsvcUpdtRecord.iRecno = self.pdsvc.pdrecno;
      pdsvcUpdtRecord.cLevelcd = self.pdsvc.levelcd;

      DataService.post('api/pd/aspdsetup/vendcontupd', { data: pdsvcUpdtRecord, busy: true }, function (data) {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.vcsearch();
            $state.go('pdsp.contractMaster');
      });
   };

}); //end contractDetail (vcdtl)


app.controller('PdspContractCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, GridService, MessageService, ModalService, UserService) {
   //as vcdtl
   var self = this;
   var base = $scope.base;
   self.pdsvc = {};

   // If Copy - then load the screen values off the row selected
   if (base.callType === 'copy') {

      // Pull in Selected Rows
      var record = GridService.getSelectedRecord(base.vcgrid);

      // Copy in the data selected
      self.pdsvc.levelcd = record.levelcd;
      self.pdsvc.contractno = record.contractno;
      self.pdsvc.prod = record.prod;
      self.pdsvc.prodpricety = record.prodpricety;
      self.pdsvc.vendno = record.vendno;
      self.pdsvc.rebtype = record.rebatety;
      self.pdsvc.rebsubty = record.subrebty;
      self.pdsvc.unit = record.units;
      self.pdsvc.whse = record.whse;
      self.pdsvc.startdt = record.startdt;
      self.pdsvc.pdRowid = record.pdRowid;
      base.currentChangeLevelCd = self.pdsvc.levelcd;

   }

   // Loaded initially for 'New' - first record in Array
   self.resetLevelCode = function () {

      // Use the Level Code off the Search Criteria or Advanced Search - which ever was changed/used last
      if (base.currentChangeLevelCd !== 'v0') {
         self.pdsvc.levelcd = base.currentChangeLevelCd;
      } else if (base.levelCodeDetailPDSVC.length) {
         var record = base.levelCodeDetailPDSVC[0];
         self.pdsvc.levelcd = record.value;
         base.currentChangeLevelCd = self.pdsvc.levelcd;
      }

      // Load the Detail Field Visibility Settings
      base.searchFieldsVisible(self.pdsvc.levelcd, '', '', '', 'srch');
   };

   if (base.callType === 'create') {
      self.resetLevelCode();
   }

   self.changeLevelCode = function () {

      // Clear Field Values on fields that dynamically change
      self.pdsvc.prod = '';
      self.pdsvc.prodpricety = '';
      self.pdsvc.rebtype = '';
      self.pdsvc.rebsubty = '';
      self.pdsvc.unit = '';
      base.currentChangeLevelCd = self.pdsvc.levelcd;

      // Whse available for all except Vendor Contract
      if (self.pdsvc.levelcd === 'v4') {
         self.pdsvc.whse = '';
      }

      // Load the Detail Field Visibility Settings
      base.searchFieldsVisible(self.pdsvc.levelcd, '', '', '','srch');
   };

   self.subtitle = function () {
      if (base.callType === 'create') {
         return $translate.instant('global.new');
      } else {
         return $translate.instant('global.copy');
      }
   };

   self.cancel = function () {
      base.callType = '';
      $state.go('pdsp.contractMaster');
   };

   // Clear form
   self.reset = function () {
      Utils.clearObject(self.pdsvc);

      self.resetLevelCode();
   };

   // Load screen fields specific to the 'Add/Copy' call criteria table values (ones that differ)
   self.createPDSVCRecord = function (nonStockOKFl) {

      self.pdsvc.clevelcd = self.pdsvc.levelcd;
      self.pdsvc.nonstockokfl = nonStockOKFl;

      if (base.callType === 'create') {

         // Create PDSVC
         DataService.post('api/pd/aspdsetup/pdspvendcontadd', { data: self.pdsvc, busy: true }, function (hdrdata) {
            if (hdrdata) {

               if (hdrdata.cWarningMessage) {
                  MessageService.alert('global.warning', hdrdata.cWarningMessage);
               }

               // Go to detail state passing the row id
               $state.go('pdsp.contractDetail.edit', {
                  id: hdrdata.iPDrecno
               });
            }
         });
      } else {
         // Copy PDSVC
         DataService.post('api/pd/aspdsetup/pdspvendcontcopy', { data: self.pdsvc, busy: true }, function (hdrdata) {
            if (hdrdata) {

               if (hdrdata.cWarningMessage) {
                  MessageService.alert('global.warning', hdrdata.cWarningMessage);
               }

               // Go to detail state passing the row id
               $state.go('pdsp.contractDetail.edit', {
                  id: hdrdata.iPDrecno
               });
            }
         });
      }
   };

   self.submit = function () {

      var nonStockOKFl;

      // Validate Product and if NonStock Allowed
      nonStockOKFl = false;
      if (base.srchProdFl && self.pdsvc.prod) {

         base.validateProduct(self.pdsvc.prod, self.pdsvc.whse, function (isNonStock) {
            if (isNonStock) {
               self.isNonStock(true);
            } else {
               self.isNonStock(false);
            }
         });
      } else {
         self.createPDSVCRecord(nonStockOKFl);
      }

      self.isNonStock = function (returnValue) {
         nonStockOKFl = returnValue;
         self.createPDSVCRecord(nonStockOKFl);
      };
   };
}); //end contractCreate (vcdtl)