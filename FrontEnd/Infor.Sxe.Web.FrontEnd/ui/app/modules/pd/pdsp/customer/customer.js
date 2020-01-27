'use strict';

app.controller('PdspCustomerSearchCtrl', function ($scope, $state, $stateParams, $translate, ConfigService, DataService, Utils) { //as csrch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Clear all Search Fields
      base.criteria.custno = 0;
      base.criteria.shipto = '';
      base.criteria.prod = '';
      base.criteria.prodline = '';
      base.criteria.vendno = 0;
      base.criteria.prodcat = '';
      base.criteria.prodpricety = '';
      base.criteria.custpricety = '';
      base.criteria.rebtype = '';
      base.criteria.rebsubty = '';
      base.criteria.pdrecno = 0;
      base.criteria.clevelcd = 'c0';
      base.currentChangeLevelCd = 'c0';

      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('pdsp.customerMaster');
      }

      base.csearch(function (searchIsDone) {
      });
   };
}); //end CustomerSearch (csrch)


//Master Controllers
app.controller('PdspCustomerMasterCtrl', function ($scope, $state, $stateParams, $translate, ConfigService, DataService, GridService, MessageService, Utils) {
   //as cmst
   var self = this;
   var base = $scope.base;

   // Changing Types or Coming from Hyperlink
   if ($stateParams.pk || (base.criteria.clevelcd && base.criteria.clevelcd.substring(0, 1) !== 'c')) {
      base.criteria.clevelcd = 'c0';
      base.currentChangeLevelCd = 'c0';

      // HyperLink off 'pk' versus 'id' (id loads when PDSP run directly
      if ($stateParams.pk) {

         // 'Inquiry' Security Minimum to see detail
         if (base.securityLevelPDSC >= 2) {

            base.criteria.pdrecno = $stateParams.pk;

            // Run the Search of the pdrecno
            base.csearch(function (searchIsDone) {
               if (searchIsDone) {

                  // Go to detail state passing the id
                  var record = base.cdataset[0];
                  $state.go('pdsp.customerDetail', {
                     id: base.criteria.pdrecno
                  });
               }
            });
         }
      } else {
         base.criteria.pdrecno = '0';

         //User Hook (do not rename)
         if ($stateParams.pk2 && $stateParams.pk2.includes('doPricing')) {
            //User Hook (do not rename) - This is a variable for use in custom.
            base.doFlag = true;
         }
      }
   } else {
      //User Hook (do not rename)
      if ($stateParams.pk2 && $stateParams.pk2.includes('doPricing')) {
         //User Hook (do not rename) - This is a variable for use in custom.
         base.doFlag = true;
      }
   }

   // Reset logic is done already - just set field visibility
   self.clear = function () {

      self.advCriteria.clevelcd = 'c0';

      // Set field sensitivity
      base.searchFieldsVisible(self.advCriteria.clevelcd, '', '', '', 'adv');

   };

   if (!base.currentChangeLevelCd) {
      base.currentChangeLevelCd = 'c0';
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
      { value: 'iRecordlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['inactivefl', 'expactivefl', 'startdt', 'iRecordlimit'];

   // Product hyperlink
   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         if (currentRow.whse.substring(0, 4) === 'RGN-' || currentRow.whse.substring(0, 4) === 'rgn-') {
            $state.go('icip.detail', { pk: currentRow.prod });
         } else {
            $state.go('icip.detail', { pk: currentRow.prod, pk2: currentRow.whse });
         }
      }
   };

   // Customer hyperlink
   self.customerHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
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
      if (currentRow) {
         $state.go('apiv.detail', { pk: currentRow.vendno });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.csearch(function (searchIsDone) {
      });
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      base.callType = '';

      // Go to detail state passing the row id
      $state.go('pdsp.customerDetail', {
         id: record.pdrecno
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.cgrid);
      base.callType = '';

      if (record) {
         $state.go('pdsp.customerDetail.edit', {
            id: record.pdrecno
         });
      }
   };

   self.create = function () {
      base.callType = 'create';
      $state.go('pdsp.customerCreate');
   };

   self.copy = function () {
      base.callType = 'copy';
      $state.go('pdsp.customerCopy');
   };

   self.delete = function () {
      var records = GridService.getSelectedRecords(base.cgrid);
      if (records) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            var pdscRecord;
            var loadLevelCode;
            var codeList = [];
            var deleteList = [];

            // Process one Row at a Time
            records.forEach(function (record) {

               pdscRecord = angular.copy(record);
               pdscRecord.clevelcd = record.levelcd;
               pdscRecord.iRecno = record.pdrecno;

               //User Hook (do not rename)
               if (self.setPDSCDeleteCriteria) {
                  self.setPDSCDeleteCriteria(pdscRecord);
               };

               deleteList.push(pdscRecord);

            });

            DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function () {

               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.csearch(function (searchIsDone) {
               });
            });
         });
      }
   };

   //User Hook (do not rename)
   self.searchInitialize = function () {
      base.cdataset = [];
   };

   //User Hook (do not rename)
   self.searchResults = function (data) {
      base.cdataset = data.pdspcustprodresults;
   };

   // Advanced Search
   self.search = function () {

      var criteria = angular.copy(self.advCriteria);
      var searchLevelCode;

      if (criteria.whse && criteria.region) {
         MessageService.alert('global.warning', "message.the.entry.will.allow.either.a.whse.or.a.price.regi");
         //TODO: self.view.applyAutoFocus('whse');
         return;
      }

      //User Hook (do not rename)
      //Needed additional hook so we can initialize the standard or perhaps a custom results collection.
      self.searchInitialize();

      searchLevelCode = criteria.clevelcd;

      // Whse or Region - not Both
      if (criteria.region) {
         criteria.whse = 'RGN-' + criteria.region;
      }

      //User Hook (do not rename)
      if (self.setAdvancedSearchCriteria) {
         self.setAdvancedSearchCriteria(criteria);
      };

      DataService.post('api/pd/aspdsetup/pdspcustprodsearch', { data: criteria, busy: true }, function (data) {
         if (data) {

            // If pdrecno search, load the Type Description
            if (searchLevelCode === 'c0' && data.pdspcustprodresults.length) {

               searchLevelCode = data.pdspcustprodresults[0].levelcd;

               // Load the Level Code Description
               data.pdspcustprodresults[0].clevelcd = base.loadCodeDesc(searchLevelCode);
            }

            // Load the Column Visibility Settings
            base.searchFieldsVisible(searchLevelCode, '', '', '', 'srch');

            //User Hook (do not rename)
            base.pdspSearchContinue(data);

            //User Hook (do not rename)
            //Needed additional hook here because the 'pdspSearchContinue' was already in the code.
            //In this hook, we are taking the results and possibly setting a different collection.
            self.searchResults(data);

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }
         }
      });

   };

}); //end customerMaster (cmst)


//Detail Controllers
app.controller('PdspCustomerDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, UtilsData) {
   //as cdtl
   var self = this;
   var base = $scope.base;

   // Clearing on Return from Price Sheet - Because Defined here
   self.pdsc = {};
   self.priceTypeList = [];
   self.priceBasedOnList = [];
   self.qtyBreakTypeList = [];
   self.qtyBreakPerList = [];
   self.maxQtyTypeList = [];
   self.roundTypeList = [];
   self.targetTypeList = [];
   self.holdPriceOnTy = '';


   self.priceTypeValue = function (priceTypeData) {

      // Parse out the Pipe delimited field value and label for the drop down list - changes based on levelcd
      var priceTypeArray = [];
      var dropDownDataArray = [];
      var priceTypeLabel;
      var priceTypeValue;

      priceTypeArray = priceTypeData.split('|');

      // Build the Drop Down data
      for (var i = 0; i < priceTypeArray.length; i++) {

         dropDownDataArray = priceTypeArray[i].split(',');
         priceTypeLabel = dropDownDataArray[0];
         priceTypeValue = dropDownDataArray[1];

         self.priceTypeList.push({ value: priceTypeValue, label: priceTypeLabel });
      }
   };

   self.priceBasedOn = function (priceType) {

      // Parse out the comma delimited field values and labels for the drop down list - changes based on prctype field
      self.priceBasedOnList = [];
      var priceValueArray = [];
      var priceLabelArray = [];
      var priceLabel;
      var priceValue;
      var editHoldValue = false;

      // Price Based On Drop Down Data
      if (priceType === 'S') {
         priceValueArray = self.pdsc.prcontyshpd.split(',');
         priceLabelArray = self.pdsc.prcontyshli.split(',');
      } else {
         priceLabelArray = self.pdsc.prcontyli.split(',');
         priceValueArray = self.pdsc.prcontypd.split(',');
      }

      // Build the Drop Down data
      for (var i = 0; i < priceValueArray.length; i++) {
         priceLabel = priceLabelArray[i];
         priceValue = priceValueArray[i].toLowerCase();


         if (self.holdPriceOnTy.toLowerCase() === priceValue) {
            editHoldValue = true;
         }

         self.priceBasedOnList.push({ value: priceValue, label: priceLabel });
      }

      // If the initial PriceOnTy PDSC value is not on the current list of choices change to, then load to 'b' as the default
      if (editHoldValue === false) {
         self.pdsc.priceonty = 'b';
      } else {
         self.pdsc.priceonty = self.holdPriceOnTy;
      }
   };

   self.qtyBreakType = function () {

      // Parse out the comma delimited field values and labels for the drop down list - changes based on prctype field
      self.qtyBreakTypeList = [];
      var qtyValueArray = [];
      var qtyLabelArray = [];
      var qtyLabel;
      var qtyValue;

      // Qty Break On Drop Down Data
      qtyValueArray = self.pdsc.qtybrktyli.split(',');
      qtyLabelArray = self.pdsc.qtybrktypd.split(',');

      // Build the Drop Down data
      for (var i = 0; i < qtyValueArray.length; i++) {
         qtyLabel = qtyValueArray[i];
         qtyValue = qtyLabelArray[i];
         self.qtyBreakTypeList.push({ value: qtyValue, label: qtyLabel });
      }
   };

   self.qtyBreakPer = function () {

      // Parse out the comma delimited field values and labels for the drop down list - changes based on prctype field
      self.qtyBreakPerList = [];
      var qtyValueArray = [];
      var qtyLabelArray = [];
      var qtyLabel;
      var qtyValue;

      // Qty Break On Drop Down Data
      qtyValueArray = self.pdsc.qtytyli.split(',');
      qtyLabelArray = self.pdsc.qtytypd.split(',');

      // Build the Drop Down data
      for (var i = 0; i < qtyValueArray.length; i++) {
         qtyLabel = qtyValueArray[i];
         qtyValue = qtyLabelArray[i];
         self.qtyBreakPerList.push({ value: qtyValue, label: qtyLabel });
      }
   };

   self.maxQtyType = function () {

      // Parse out the comma delimited field values and labels for the drop down list - changes based on prctype field
      self.maxQtyTypeList = [];
      var qtyValueArray = [];
      var qtyLabelArray = [];
      var qtyLabel;
      var qtyValue;

      // Qty Break On Drop Down Data
      qtyValueArray = self.pdsc.maxqtytyli.split(',');
      qtyLabelArray = self.pdsc.maxqtytypd.split(',');

      // Build the Drop Down data
      for (var i = 0; i < qtyValueArray.length; i++) {
         qtyLabel = qtyValueArray[i];
         qtyValue = qtyLabelArray[i];
         self.maxQtyTypeList.push({ value: qtyValue, label: qtyLabel });
      }
   };

   self.roundType = function () {

      // Parse out the comma delimited field values and labels for the drop down list - changes based on prctype field
      self.roundTypeList = [];
      var rndValueArray = [];
      var rndLabelArray = [];
      var rndLabel;
      var rndValue;

      // Qty Break On Drop Down Data
      rndValueArray = self.pdsc.proundli.split(',');
      rndLabelArray = self.pdsc.proundpd.split(',');

      // Build the Drop Down data
      for (var i = 0; i < rndValueArray.length; i++) {
         rndLabel = rndValueArray[i];
         rndValue = rndLabelArray[i];
         self.roundTypeList.push({ value: rndValue, label: rndLabel });
      }
   };

   self.targetType = function () {

      // Parse out the comma delimited field values and labels for the drop down list - changes based on prctype field
      self.targetTypeList = [];
      var trgtValueArray = [];
      var trgtLabelArray = [];
      var trgtLabel;
      var trgtValue;

      // Qty Break On Drop Down Data
      trgtValueArray = self.pdsc.ptargetpd.split(',');
      trgtLabelArray = self.pdsc.ptargetli.split(',');

      // Build the Drop Down data
      for (var i = 0; i < trgtValueArray.length; i++) {
         trgtLabel = trgtLabelArray[i];
         trgtValue = trgtValueArray[i];
         self.targetTypeList.push({ value: parseFloat(trgtValue), label: trgtLabel });
      }
   };

   self.qtyBreakChange = function () {

      if (self.pdsc.qtybreakty === '') {
         self.qtyBreakLabel = '';
      } else {
         self.qtyBreakLabel = $translate.instant('global.price.break');
      }
   };

   self.allowQtyBreakChg = function (row, cell, value, column, item) {

      if (self.pdsc.qtybreakty === '') {
         return false;
      } else if (item.seqno === 9) {
         return false;
      } else {
         return true;
      }
   };

   // Set local pdsc record - Drill Down
   self.loadRecord = function () {

      if ($stateParams.id) {

         DataService.getResource('api/pd/aspdsetup/pdspcustprodload/' + $stateParams.id + '?fillmode=true', { busy: true }, function (data) {
            if (data) {

               self.pdsc = data;
               self.holdPriceOnTy = self.pdsc.priceonty;
               self.pdsc.reference = self.pdsc.refer;
               base.currentChangeLevelCd = self.pdsc.clevelcd;

               // Load Price Type Drowp Down List
               self.priceTypeValue(data.prctyperb);

               // Load Price Based On List (P-Percent, A-Amount, S-Sheet Pct
               self.priceBasedOn(data.prctype);

               // Load Break On - Drowp Down List
               self.qtyBreakType();

               // Load Break Per - Drowp Down List
               self.qtyBreakPer();

               // Load Max Qty Type - Drop Down List
               self.maxQtyType();

               // Load Round Type - Drop Down List
               self.roundType();

               // Load Target Type - Drop Down List
               self.targetType();

               // Load Quantity Break Label
               self.qtyBreakChange();

               // Level Code Display
               self.displayLevelCode = '';
               for (var i = 0; i < base.levelCodeDetailPDSC.length; i++) {
                  var record = base.levelCodeDetailPDSC[i];
                  if (record.value === self.pdsc.clevelcd) {
                     self.displayLevelCode = record.label;
                  }
               }

               // Load the Price Grid
               self.pricegrid = [
                  { seqno: 1, prcmult: self.pdsc.prcmult1, qtybrk: self.pdsc.qtybrk1, prcdisc: self.pdsc.prcdisc1 },
                  { seqno: 2, prcmult: self.pdsc.prcmult2, qtybrk: self.pdsc.qtybrk2, prcdisc: self.pdsc.prcdisc2 },
                  { seqno: 3, prcmult: self.pdsc.prcmult3, qtybrk: self.pdsc.qtybrk3, prcdisc: self.pdsc.prcdisc3 },
                  { seqno: 4, prcmult: self.pdsc.prcmult4, qtybrk: self.pdsc.qtybrk4, prcdisc: self.pdsc.prcdisc4 },
                  { seqno: 5, prcmult: self.pdsc.prcmult5, qtybrk: self.pdsc.qtybrk5, prcdisc: self.pdsc.prcdisc5 },
                  { seqno: 6, prcmult: self.pdsc.prcmult6, qtybrk: self.pdsc.qtybrk6, prcdisc: self.pdsc.prcdisc6 },
                  { seqno: 7, prcmult: self.pdsc.prcmult7, qtybrk: self.pdsc.qtybrk7, prcdisc: self.pdsc.prcdisc7 },
                  { seqno: 8, prcmult: self.pdsc.prcmult8, qtybrk: self.pdsc.qtybrk8, prcdisc: self.pdsc.prcdisc8 },
                  { seqno: 9, prcmult: self.pdsc.prcmult9, qtybrk: '', prcdisc: self.pdsc.prcdisc9 }
               ];

               //User Hook (do not rename)
               if (self.loadRecordContinue) {
                  self.loadRecordContinue(self.pdsc);
               };
            }
         });
      }
   };

   // HyperLink from other Functions and original Drill Down
   if ($stateParams.id) {
      self.loadRecord();
   }

   // Display the Price Sheet Screen
   self.goToPriceSheet = function () {
      var stateObject = {
         prod: self.pdsc.prod,
         whse: self.pdsc.whse,
         pricesheet: self.pdsc.pricesheet,
         effectivedt: self.pdsc.priceeffectivedate,
         pdrecno: self.pdsc.pdrecno,
         returnState: $state.current.name
      };

      $state.go('pdsp.customerDetail.priceSheet', { stateObject: stateObject });
   };

   // SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function () {
      UtilsData.getSastnDescriptionSpecial('R', self.pdsc.reference, function (descrip) {
         self.pdsc.reference = descrip;
      });
   }

   // Page subtitle
   self.subtitle = function () {
      var keyData;

      if (self.pdsc.clevelcd === 'c1') {
         keyData = $translate.instant('global.customer.number') + ': ' + self.pdsc.custno + ' | ' +
                   $translate.instant('global.product') + ': ' + self.pdsc.prod;
      } else if (self.pdsc.clevelcd === 'c2p') {
         keyData = $translate.instant('global.customer.number') + ': ' + self.pdsc.custno + ' | ' +
                   $translate.instant('global.product.price.type') + ': ' + self.pdsc.prodprcty;
      } else if (self.pdsc.clevelcd === 'c2l') {
         keyData = $translate.instant('global.customer.number') + ': ' + self.pdsc.custno + ' | ' +
                   $translate.instant('global.product.line') + ': ' + self.pdsc.prodline;
      } else if (self.pdsc.clevelcd === 'c2c') {
         keyData = $translate.instant('global.customer.number') + ': ' + self.pdsc.custno + ' | ' +
                   $translate.instant('global.product.category') + ': ' + self.pdsc.prodcat;
      } else if (self.pdsc.clevelcd === 'c2r') {
         keyData = $translate.instant('global.customer.number') + ': ' + self.pdsc.custno + ' | ' +
                   $translate.instant('global.rebate.type') + ': ' + self.pdsc.rebatety;
         if (self.pdsc.rebsubty) {
            keyData = keyData + ' | ' +
               $translate.instant('global.sub.type') + ': ' + self.pdsc.rebsubty;
         }    
      } else if (self.pdsc.clevelcd === 'c3') {
         keyData = $translate.instant('global.customer.price.type') + ': ' + self.pdsc.custprcty + ' | ' +
                   $translate.instant('global.product') + ': ' + self.pdsc.prod;
      } else if (self.pdsc.clevelcd === 'c4p') {
         keyData = $translate.instant('global.customer.price.type') + ': ' + self.pdsc.custprcty + ' | ' +
                   $translate.instant('global.product.price.type') + ': ' + self.pdsc.prodprcty;
      } else if (self.pdsc.clevelcd === 'c4r') {
         keyData = $translate.instant('global.customer.price.type') + ': ' + self.pdsc.custprcty + ' | ' +
            $translate.instant('global.rebate.type') + ': ' + self.pdsc.rebatety;
         if (self.pdsc.rebsubty) {
            keyData = keyData + ' | ' +
               $translate.instant('global.sub.type') + ': ' + self.pdsc.rebsubty;
         } 
      } else if (self.pdsc.clevelcd === 'c5') {
         keyData = $translate.instant('global.customer.number') + ': ' + self.pdsc.custno;
      } else if (self.pdsc.clevelcd === 'c6') {
         keyData = $translate.instant('global.customer.price.type') + ': ' + self.pdsc.custprcty;
      } else if (self.pdsc.clevelcd === 'c7') {
         keyData = $translate.instant('global.product') + ': ' + self.pdsc.prod;
      } else if (self.pdsc.clevelcd === 'c8') {
         keyData = $translate.instant('global.product.price.type') + ': ' + self.pdsc.prodprcty;
      }

      return keyData;
   };

   self.edit = function () {
      $state.go('pdsp.customerDetail.edit');
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

   //User Hook (do not rename)
   self.cancelPdRecordContinue = function () {
      $state.go('pdsp.customerMaster');
   };

   //User Hook (do not rename)
   self.cancelPdRecordNoneContinue = function () {
      $state.go('pdsp.customerMaster');
   };

   self.cancel = function () {

      var cancelCriteria;

      if (base.callType === 'create') {

         // Ask a Question to Continue or not
         self.editOKToCancel(function (isOKFl) {
            if (isOKFl) {

               cancelCriteria = {
                  clevelcd: self.pdsc.clevelcd,
                  iRecno: self.pdsc.pdrecno
               };

               //User Hook (do not rename)
               if (self.setCancelPdRecordCriteria) {
                  self.setCancelPdRecordCriteria(cancelCriteria);
               }

               DataService.post('api/pd/aspdsetup/cancelpdrecord', { data: cancelCriteria, busy: true }, function () {

                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');

                  //User Hook (do not rename)
                  self.cancelPdRecordContinue();
               });
            } else {
               return;
            }
         });
      } else {
         //User Hook (do not rename)
         self.cancelPdRecordNoneContinue();
      }
   };

   self.reset = function () {
      self.loadRecord();
      $state.go('pdsp.customerDetail.edit');
   };

   //User Hook (do not rename)
   self.createContinue = function () {
      $state.go('pdsp.customerCreate');
   };

   self.create = function () {
      base.callType = 'create';

      //User Hook (do not rename)
      self.createContinue();
   };

   //User Hook (do not rename)
   self.deletepdrecordContinue = function () {
      $state.go('pdsp.customerMaster', null, { reload: 'pdsp.customerMaster' });
   };

   self.delete = function () {

      var pdscRecord;
      var deleteList = [];

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

         pdscRecord = angular.copy(self.pdsc);
         pdscRecord.iRecno = self.pdsc.pdrecno;
         pdscRecord.clevelcd = self.pdsc.clevelcd;

         //User Hook (do not rename)
         if (self.setPDSCDetailDeleteCriteria) {
            self.setPDSCDetailDeleteCriteria(pdscRecord);
         };

         deleteList.push(pdscRecord);

         // Detail level data not updated - delete the header data just created
         DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function (data) {

            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.csearch(function (searchIsDone) {
            });

            //User Hook (do not rename)
            self.deletepdrecordContinue();
         });
      });
   };

   //User Hook (do not rename)
   self.pdspUpdateBrowserContinue = function () {
      $state.go('pdsp.customerMaster');
   };

   self.submit = function () {

      var priceBreakTable = [];

      var pdscUpdtRecord;

      pdscUpdtRecord = angular.copy(self.pdsc);

      // Load screen values to Criteria data names that differ
      pdscUpdtRecord.irecno = self.pdsc.pdrecno;
      pdscUpdtRecord.modifier = self.pdsc.modifiernm;
      pdscUpdtRecord.modrebfl = self.pdsc.modifierrebfl;
      pdscUpdtRecord.usertarget = self.pdsc.pexactrnd;
      pdscUpdtRecord.hardmaxfl = self.pdsc.hardmaxqtyfl;
      pdscUpdtRecord.hardsysprfl = self.pdsc.hardpricefl;
      pdscUpdtRecord.overridepctup = self.pdsc.ovrridepctup;
      pdscUpdtRecord.overridepctdown = self.pdsc.ovrridepctdown;

      pdscUpdtRecord.statusty = 'no';
      if (self.pdsc.statustype === true) {
         pdscUpdtRecord.statusty = 'yes';
      }

      pdscUpdtRecord.priceeffdt = self.pdsc.priceeffectivedate;
      if (self.pdsc.prctype !== 'S') {
         pdscUpdtRecord.priceeffdt = null;
         pdscUpdtRecord.pricesheet = '';
      }

      //User Hook (do not rename)
      if (self.setCustProdUpdCriteria) {
         self.setCustProdUpdCriteria(pdscUpdtRecord);
      }

      DataService.post('api/pd/aspdsetup/custprodupd', { data: pdscUpdtRecord, busy: true }, function (data) {

         // Load the Price Break Table data - separate Update
         for (var i = 0; i <= 8; i++) {
            var obj = self.pricegrid[i];
            var seqNum = i + 1;
            priceBreakTable.push({ pdrecno: self.pdsc.pdrecno, cLevelcd: self.pdsc.clevelcd, seqno: seqNum, price: obj.prcmult, disc: obj.prcdisc, prcbreak: obj.qtybrk });
         }

         //User Hook (do not rename)
         if (self.setPdspUpdateBrowserCriteria) {
            self.setPdspUpdateBrowserCriteria(priceBreakTable);
         }

         DataService.post('api/pd/aspdsetup/pdspupdatebrowser', { data: priceBreakTable, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.csearch(function (searchIsDone) {
            });

            //User Hook (do not rename)
            self.pdspUpdateBrowserContinue();
         });
      });
   };

}); //end CustomerDetail (cdtl)


//Create Customer Controllers
app.controller('PdspCustomerCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, GridService, MessageService, ModalService, Utils, UserService) { //as cdtl
   var self = this;
   var base = $scope.base;
   self.pdsc = {};

   // If Copy - then load the screen values off the row selected
   if (base.callType === 'copy') {

      // Pull in Selected Rows
      var record = GridService.getSelectedRecord(base.cgrid);

      //User Hook (do not rename)
      if (base.getDOSelectedRecord) {
         record = base.getDOSelectedRecord();
      }

      // Copy in the data selected
      self.pdsc.clevelcd = record.levelcd;
      self.pdsc.custno = record.custno;
      self.pdsc.shipto = record.custtype,
      self.pdsc.prod = record.prod;
      self.pdsc.prodprcty = record.prodprcty;
      self.pdsc.prodline = record.prodline;
      self.pdsc.vendno = record.vendno;
      self.pdsc.prodcat = record.prodcat;
      self.pdsc.rebatety = record.rebatety;
      self.pdsc.rebsubty = record.rebsubty;
      self.pdsc.custprcty = record.typecode;
      self.pdsc.unit = record.units;
      self.pdsc.startdt = record.startdt;
      self.pdsc.pdRowid = record.pdRowid;
      base.currentChangeLevelCd = self.pdsc.clevelcd;

      if (record.whse.substring(0, 4) === 'RGN-' || record.whse.substring(0, 4) === 'rgn-') {
         self.pdsc.screenwhse = '';
         self.pdsc.region = record.whse.substring(4);
      } else {
         self.pdsc.screenwhse = record.whse;
         self.pdsc.region = '';
      }
   }

   // Loaded initially for 'New' - first record in Array
   self.resetLevelCode = function () {

      // Use the Level Code off the Search Criteria or Advanced Search - which ever was changed/used last
      if (base.currentChangeLevelCd !== 'c0') {
         self.pdsc.clevelcd = base.currentChangeLevelCd;
      } else if (base.levelCodeDetailPDSC.length) {
         var record = base.levelCodeDetailPDSC[0];
         self.pdsc.clevelcd = record.value;
         base.currentChangeLevelCd = self.pdsc.clevelcd;
      }
      self.pdrecnoDisplay = '';

      // Load the Detail Field Visibility Settings
      base.searchFieldsVisible(self.pdsc.clevelcd, '', '', '', 'srch');
   };

   if (base.callType === 'create') {
      self.resetLevelCode();
   }

   self.changeLevelCode = function () {

      // Clear Field Values on fields that dynamically change
      self.pdsc.custno = '';
      self.pdsc.shipto = '',
      self.pdsc.prod = '';
      self.pdsc.prodprcty = '';
      self.pdsc.prodline = '';
      self.pdsc.vendno = '';
      self.pdsc.prodcat = '';
      self.pdsc.rebatety = '';
      self.pdsc.custprcty = '';
      self.pdsc.unit = '';
      base.currentChangeLevelCd = self.pdsc.clevelcd;

      // Load the Detail Field Visibility Settings
      base.searchFieldsVisible(self.pdsc.clevelcd, '', '', '', 'srch');

   };

   self.subtitle = function () {
      if (base.callType === 'create') {
         return $translate.instant('global.new');
      } else {
         return $translate.instant('global.copy');
      }
   };

   //User Hook (do not rename)
   self.cancelPdCreateContinue = function () {
      $state.go('pdsp.customerMaster');
   };

   self.cancel = function () {
      base.callType = '';

      //User Hook (do not rename)
      self.cancelPdCreateContinue();
   };

   // Clear form
   self.reset = function () {
      Utils.clearObject(self.pdsc);

      self.resetLevelCode();
   };

   //User Hook (do not rename)
   self.createPDSCRecordContinue = function (hdrdata) {
      // Go to detail state passing the row id
      $state.go('pdsp.customerDetail.edit', {
         id: hdrdata.iPDrecno
      });
   };

   // Load screen fields specific to the 'Add/Copy' call criteria table values (ones that differ)
   self.createPDSCRecord = function (nonStockOKFl) {

      self.pdsc.prodpricety = self.pdsc.prodprcty;
      self.pdsc.custpricety = self.pdsc.custprcty;
      self.pdsc.rebtype = self.pdsc.rebatety;
      self.pdsc.nonstockokfl = nonStockOKFl;

      // Region is stored in the Whse Field.
      if (self.pdsc.region) {
         self.pdsc.whse = 'RGN-' + self.pdsc.region;
      } else {
         self.pdsc.whse = self.pdsc.screenwhse;
      }

      if (base.callType === 'create') {

         //User Hook (do not rename)
         if (self.createPDSCRecordCriteria) {
            self.createPDSCRecordCriteria();
         }

         // Create PDSC
         DataService.post('api/pd/aspdsetup/pdspcustprodadd', { data: self.pdsc, busy: true }, function (hdrdata) {
            if (hdrdata) {

               if (hdrdata.cWarningMessage) {
                  MessageService.alert('global.warning', hdrdata.cWarningMessage);
               }

               //User Hook (do not rename)
               self.createPDSCRecordContinue(hdrdata);
            }
         });
      } else {

         //User Hook (do not rename)
         if (self.copyPDSCRecordCriteria) {
            self.copyPDSCRecordCriteria();
         }

         // Copy PDSC
         DataService.post('api/pd/aspdsetup/pdspcustprodcopy', { data: self.pdsc, busy: true }, function (hdrdata) {
            if (hdrdata) {

               if (hdrdata.cWarningMessage) {
                  MessageService.alert('global.warning', hdrdata.cWarningMessage);
               }

               //User Hook (do not rename)
               self.createPDSCRecordContinue(hdrdata);
            }
         });
      }
   };

   self.submit = function () {

      var nonStockOKFl;

      if (self.pdsc.screenwhse && self.pdsc.region) {
         MessageService.alert('global.error', "message.the.entry.will.allow.either.a.whse.or.a.rebate.reg");
         return;
      }

      // Validate Product and if NonStock Allowed
      nonStockOKFl = false;
      if (base.srchProdFl && self.pdsc.prod) {

         base.validateProduct(self.pdsc.prod, self.pdsc.screenwhse, function (isNonStock) {
            if (isNonStock) {
               self.isNonStock(true);
            } else {
               self.isNonStock(false);
            }
         });
      } else {
         self.createPDSCRecord(nonStockOKFl);
      }

      self.isNonStock = function (returnValue) {
         nonStockOKFl = returnValue;
         self.createPDSCRecord(nonStockOKFl);
      };
   };

}); //end CustomerCreate (cdtl)


