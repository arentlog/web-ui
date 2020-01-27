'use strict';

app.controller('PdspRebateSearchCtrl', function ($scope, $state, DataService, Utils) { //as rsrch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
    
   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Clear all Search Fields
      base.criteria.prod = '';
      base.criteria.custno = 0;
      base.criteria.shipto = '';
      base.criteria.prodline = '';
      base.criteria.vendno = 0;
      base.criteria.prodcat = '';
      base.criteria.prodpricety = '';
      base.criteria.custpricety = '';
      base.criteria.rebtype = '';
      base.criteria.pdrecno = 0;
      base.criteria.clevelcd = 'r0';
      base.criteria.rebatecd = 's';
      base.criteria.shiptype = 'w';
      base.currentChangeLevelCd = 'r0';

      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('pdsp.rebateMaster');
      }

      base.rsearch(function (searchIsDone) {
      });
   };
}); //end RebateSearch (rsrch)


app.controller('PdspRebateMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, GridService, MessageService, Utils) { //as rmst
   var self = this;
   var base = $scope.base;
   
   if ($stateParams.pk || (base.criteria.clevelcd && base.criteria.clevelcd.substring(0, 1) !== 'r')) {
      base.criteria.clevelcd = 'r0';
      base.criteria.pdrecno = '0';
      base.criteria.rebatecd = base.rebatecdSave;
      base.criteria.shiptype = base.shiptypeSave;
      base.currentChangeLevelCd = 'r0';

      //Also assign the saved off values for the Advanced search.
      if (self.advCriteria) {
         self.advCriteria.rebatecd = base.advRebatecdSave;
         self.advCriteria.shiptype = base.advShiptypeSave;
      }

      // HyperLink off 'pk' versus 'id' (id loads when PDSP run directly
      if ($stateParams.pk) {

         // 'Inquiry' Security Minimum to see detail
         if (base.securityLevelPDSC >= 2) {

            base.criteria.pdrecno = $stateParams.pk;

            //Run the Search of the pdrecno
            base.rsearch(function (searchIsDone) {
               if (searchIsDone) {

                  // Go to detail state passing the id
                  $state.go('pdsp.rebateDetail', {
                     id: base.criteria.pdrecno
                  });
               }
            });
         }
      } else {
         base.criteria.pdrecno = '0';
      }
   }

   // Reset logic is done already - just set field visibility
   self.clear = function () {

      self.advCriteria.clevelcd = 'r0';

      // Set field sensitivity
      base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl, 'adv');

   };

   if (!base.currentChangeLevelCd) {
      base.currentChangeLevelCd = 'r0';
   }

   // Advanced search criteria object with initial values
   self.advCriteria = {
      clevelcd: base.currentChangeLevelCd,
      pdrecno: '0',
      rebatecd: base.advRebatecdSave ? base.advRebatecdSave : 'c',
      shiptype: base.advShiptypeSave ? base.advShiptypeSave : 'w',
      iRecordlimit: ConfigService.getDefaultRecordLimit()
   };

   // Load the Visble Settings - Adv Search
   base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl, 'adv');

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'expiredfl', label: MessageService.get('global.expired') },
      { value: 'iRecordlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['expiredfl', 'iRecordlimit'];

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
      base.rsearch(function (searchIsDone) {
      });
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      base.callType = '';

      // Go to detail state passing the row id
      $state.go('pdsp.rebateDetail', {
         id: record.rebrecno
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.rgrid);
      base.callType = '';

      if (record) {
         $state.go('pdsp.rebateDetail.edit', {
            id: record.rebrecno
         });
      }
   };

   self.create = function () {
      base.callType = 'create';
      $state.go('pdsp.rebateCreate');
   };

   self.copy = function () {
      base.callType = 'copy';
      $state.go('pdsp.rebateCopy');
   };

   self.delete = function () {

      var records = GridService.getSelectedRecords(base.rgrid);
      if (records) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            var pdsrRecord;
            var deleteList = [];

            // Process one Row at a Time
            records.forEach(function (record) {

               pdsrRecord = angular.copy(record);
               pdsrRecord.clevelcd = record.levelcd;
               pdsrRecord.iRecno = record.rebrecno;

               deleteList.push(pdsrRecord);

            });

            DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function () {

               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.rsearch(function (searchIsDone) {
               });
            });
         });
      }
   };

   self.searchFieldsVisible = function (useFl, useValue) {
      
      // Toggle the screen values when changed
      if (useFl === 'usecontfl') {

         self.advCriteria.userebsubtypefl = false;
         self.advCriteria.usepricevfl = false;

         if (base.UseRebSubTypeFl === true && useValue === false) {

            self.advCriteria.userebsubtypefl = true;
            self.advCriteria.usecontractvfl = false;
            self.advCriteria.usepricevfl = false;

         }

         // Set field sensitivity when values changed
         base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl, 'adv');

      }

      if (useFl === 'userebfl') {
                     
         self.advCriteria.usecontractvfl = false;
         self.advCriteria.usepricevfl = false;

         if (base.UseContractsFl === true && useValue === false) {

            self.advCriteria.usecontractvfl = true;
            self.advCriteria.userebsubtypefl = false;
            self.advCriteria.usepricevfl = false;
         }

         // Set field sensitivity when values changed
         base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl, 'adv');

      }
      
      if (useFl === 'usepricefl') {

         self.advCriteria.userebsubtypefl = false;
         self.advCriteria.usecontractvfl = false;

         if (base.UseContractsFl === true && useValue === false) {

            self.advCriteria.usepricevfl = false;
            self.advCriteria.usecontractvfl = true;
            self.advCriteria.userebsubtypefl = false;
            
         }

         // Set field sensitivity when values changed
         base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl, 'adv');

      }

      // Reset for message and default settings if changing Level Code or Rebate Code
      if (useFl === '') {
         self.advCriteria.usecontractvfl = null;
         self.advCriteria.userebsubtypefl = null;
         self.advCriteria.usepricevfl = null;

         // Set Defaults
         base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl, 'adv', self.visibilityCallback);

      }

   };

   // Load the Screen Values after the Visiblity call
   self.visibilityCallback = function () {
      
      var holdUseContractFl = self.advCriteria.usecontractvfl;
      var holdUseRebSubTyFl = self.advCriteria.userebsubtypefl;
      
      self.advCriteria.usecontractvfl = base.UseContractVFl;
      self.advCriteria.userebsubtypefl = base.UseRebSubTypeFl;
      self.advCriteria.usepricevfl = base.UsePriceFl;

      // Vendor on Sale Rebates (PDSR) - load defaults and display the messages
      if (self.advCriteria.rebatecd === 's') {

         if (base.UseContractsFl === true && self.advCriteria.userebsubtypefl === true) {

            if (self.advCriteria.usecontractvfl === true) {
               self.advCriteria.usecontractvfl = true;
               self.advCriteria.userebsubtypefl = false;
               self.advCriteria.usepricevfl = false;
            } else {
               self.advCriteria.usecontractvfl = false;
               self.advCriteria.usepricevfl = false;
               self.advCriteria.userebsubtypefl = true;
            }
         } else if (base.UseContractsFl === true) {

            self.advCriteria.usecontractvfl = true;
            self.advCriteria.userebsubtypefl = false;
         }

         // Only Display the Messages based on the Initial setting of the flags
         if (holdUseContractFl !== self.advCriteria.usecontractvfl || holdUseRebSubTyFl !== self.advCriteria.userebsubtypefl) {

            if (base.UseContractsFl === true && self.advCriteria.userebsubtypefl === true) {

               MessageService.alert('global.warning', "global.use.rebate.sub.type.or.contract.line.number");

            } else if (base.UseContractsFl === true) {

               MessageService.alert('global.warning', "global.use.contract.line.number");

            }
         }

      } else {
         self.advCriteria.usecontractvfl = false;
         self.advCriteria.userebsubtypefl = false;
         self.advCriteria.usepricevfl = false;
      }

      // Set field sensitivity when values changed
      base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl, 'adv');

   };

   // Advanced Search
   self.search = function () {

      if (self.advCriteria.shiptype === '') {
         self.advCriteria.shiptype = 'w,d';
      }

      var criteria = angular.copy(self.advCriteria);
      var searchLevelCode;
      var searchRebateCode;

      if (criteria.whse && criteria.region) {
         MessageService.alert('global.error', "message.the.entry.will.allow.either.a.whse.or.a.rebate.reg");
         return;
      }

      if (criteria.usecontractvfl === true && criteria.userebsubtypefl === true) {
         MessageService.alert('global.warning', "global.use.rebate.sub.type.or.contract.line.number");
         return;
      }

      base.rdataset = [];
      searchLevelCode = criteria.clevelcd;
      searchRebateCode = criteria.rebatecd;

      if (searchRebateCode && searchRebateCode.toLowerCase() === 's') {
         base.manualFlagVisibility = true;
      }
      else {
         base.manualFlagVisibility = false;
      }

      // Whse or Region - not Both
      if (criteria.region) {
         criteria.whse = 'RGN-' + criteria.region;
      }

      // Fields that differ from screen to table
      criteria.lUseContractvfl = criteria.usecontractvfl;
      criteria.expiredfl = criteria.expactivefl;
      criteria.rebcustty = criteria.custrebty;
      criteria.contractline = criteria.contractlineno;
      criteria.price = criteria.rebateprice;
      criteria.prccurrencyty = criteria.rebatecurrency;
      criteria.lUsePricevfl = criteria.usepricevfl;

      // Search screen - no Contract - clear Contract Line #
      if (criteria.contractno === '') {
         criteria.contractline = 0;
         criteria.contractlineno = 0;
         self.advCriteria.contractlineno = 0;
      }
      
      // Search screen - no price - clear currencyty
      if (criteria.contractno === '') {
         criteria.contractline = 0;
         criteria.contractlineno = 0;
         self.advCriteria.contractlineno = 0;
      }

      DataService.post('api/pd/aspdsetup/pdsprebatesearch', { data: criteria, busy: true }, function (data) {
         if (data) {

            // If pdrecno search, load the Type Description
            if (searchLevelCode === 'r0' && data.pdsprebateresults.length) {

               searchLevelCode = data.pdsprebateresults[0].levelcd;
               searchRebateCode = data.pdsprebateresults[0].rebatecd;

               // Load the Level Code Description
               data.pdsprebateresults[0].clevelcd = base.loadCodeDesc(searchLevelCode);
            }

            // Save off values so they can be reset if they drill down and back.
            base.advRebatecdSave = self.advCriteria.rebatecd;
            base.advShiptypeSave = self.advCriteria.shiptype;

            // Load the Column Visibility Settings
            base.searchFieldsVisible(searchLevelCode, searchRebateCode, criteria.usecontractvfl, criteria.usepricevfl, 'srch');

            base.rdataset = data.pdsprebateresults;

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }
         }
      });

   };

}); //end RebateMaster (rmst)


app.controller('PdspRebateDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, UtilsData) {
   //as rdtl
   var self = this;
   var base = $scope.base;
   self.pdsr = {};

   self.rebCalcTyList = [];
   self.rebDownToTyList = [];
   self.marginCostTyList = [];
   self.rebCostTyList = [];

   // Rebate Calc Type
   self.rebCalcTyValue = function () {

      // Parse out the comma delimited field values and labels for the drop down list
      self.rebCalcTyList = [];
      var valueArray = [];
      var labelArray = [];
      var dropDownLabel;
      var dropDownValue;

      // Drop Down Data
      valueArray = self.pdsr.rebcalctyli.split(',');
      labelArray = self.pdsr.rebcalctypd.split(',');

      // Build the Drop Down paired data
      for (var i = 0; i < valueArray.length; i++) {
         dropDownLabel = valueArray[i];
         dropDownValue = labelArray[i];
         self.rebCalcTyList.push({ value: dropDownValue, label: dropDownLabel });
      }
   };

   // Rebate Down To Type
   self.rebDownToTyValue = function () {

      // Parse out the comma delimited field values and labels for the drop down list
      self.rebDownToTyList = [];
      var valueArray = [];
      var labelArray = [];
      var dropDownLabel;
      var dropDownValue;

      // Drop Down Data
      valueArray = self.pdsr.rebdowntoli.split(',');
      labelArray = self.pdsr.rebdowntopd.split(',');

      // Build the Drop Down paired data
      for (var i = 0; i < valueArray.length; i++) {
         dropDownLabel = valueArray[i];
         dropDownValue = labelArray[i];
         self.rebDownToTyList.push({ value: dropDownValue, label: dropDownLabel });
      }
   };

   // Rebate Cost Type
   self.rebCostTyValue = function () {

      // Parse out the comma delimited field values and labels for the drop down list
      self.rebCostTyList = [];
      var valueArray = [];
      var labelArray = [];
      var dropDownLabel;
      var dropDownValue;

      // Drop Down Data
      valueArray = self.pdsr.rebatecosttyli.split(',');
      labelArray = self.pdsr.rebatecosttypd.split(',');

      // Build the Drop Down paired data
      for (var i = 0; i < valueArray.length; i++) {
         dropDownLabel = valueArray[i];
         dropDownValue = labelArray[i];
         self.rebCostTyList.push({ value: dropDownValue, label: dropDownLabel });
      }
   };

   // Margin Cost Type
   self.marginCostTyValue = function () {

      // Parse out the comma delimited field values and labels for the drop down list
      self.marginCostTyList = [];
      var valueArray = [];
      var labelArray = [];
      var dropDownLabel;
      var dropDownValue;

      // Drop Down Data
      valueArray = self.pdsr.margincosttyli.split(',');
      labelArray = self.pdsr.margincosttypd.split(',');

      // Build the Drop Down paired data
      for (var i = 0; i < valueArray.length; i++) {
         dropDownLabel = valueArray[i];
         dropDownValue = labelArray[i];
         self.marginCostTyList.push({ value: dropDownValue, label: dropDownLabel });
      }
   };

   // Set local pdsr record - Drill Down
   self.loadRecord = function (callType) {

      var pdsrList = {};

      if (callType !== 'detail') {
         pdsrList = angular.copy(self.pdsr);
      }
      
      DataService.post('api/pd/aspdsetup/pdsprebateinit', { data: { pdsprebateinitresults: pdsrList, iRebRecNo: $stateParams.id, cCallType: callType }, busy: true }, function (data) {
         if (data) {
            self.pdsr = data;
            base.criteria.clevelcd = self.pdsr.clevelcd;
            base.currentChangeLevelCd = self.pdsr.clevelcd;

            self.usecontractfl = false;
            if (self.pdsr.rebsubty.substring(0, 4) === 'LN#-' || self.pdsr.rebsubty.substring(0, 4) === 'ln#-') {
               self.usecontractfl = true;
            }

            self.usepricevfl = false;
            if (self.pdsr.rebsubty.substring(0, 4) === 'PRC-') {
               self.usepricevfl = true;
            }
            
            // Rebate Calc type drop down
            self.rebCalcTyValue();

            // Rebate Down To drop down
            self.rebDownToTyValue();

            // Margin Cost Type
            self.marginCostTyValue();

            // Rebate Cost Type
            self.rebCostTyValue();

            // Level Code Display
            self.displayLevelCode = '';
            for (var i = 0; i < base.levelCodeDetailPDSR.length; i++) {
               var record = base.levelCodeDetailPDSR[i];
               if (record.value === self.pdsr.clevelcd) {
                  self.displayLevelCode = record.label;
               }
            }

            // Rebate Code
            self.displayRebateCode = '';
            if (self.pdsr.rebatecd.toLowerCase() === 's') {
               self.displayRebateCode = $translate.instant('global.vendor.on.sale');
            } else if (self.pdsr.rebatecd.toLowerCase() === 'c') {
               self.displayRebateCode = $translate.instant('global.customer.rebate');
            } else if (self.pdsr.rebatecd.toLowerCase() === 'p') {
               self.displayRebateCode = $translate.instant('global.vendor.on.purchase');
            }

            // Drop Ship Type
            self.displayShipType = '';
            if (self.pdsr.dropshipty.toLowerCase() === 'd') {
               self.displayShipType = $translate.instant('global.drop.ship');
            } else if (self.pdsr.dropshipty.toLowerCase() === 'w') {
               self.displayShipType = $translate.instant('global.warehouse');
            }

            //User Hook (do not rename)
            if (self.pdspRebateInitContinue) {
               self.pdspRebateInitContinue(data);
            }
         }
      });
   };

   if ($stateParams.id) {
      self.loadRecord('detail');
   }

   // Display the Price Sheet Screen
   self.goToPriceSheet = function (sheetType) {

      var stateObject = {};

      if (sheetType === 'to') {
         stateObject = {
            prod: self.pdsr.prod,
            whse: self.pdsr.whse,
            pricesheet: self.pdsr.pricesheetto,
            effectivedt: self.pdsr.priceeffectivedateto,
            pdrecno: self.pdsr.rebrecno,
            returnState: $state.current.name
         };
      } else {
         stateObject = {
            prod: self.pdsr.prod,
            whse: self.pdsr.whse,
            pricesheet: self.pdsr.pricesheet,
            effectivedt: self.pdsr.priceeffectivedate,
            pdrecno: self.pdsr.rebrecno,
            returnState: $state.current.name
         };
      }

      $state.go('pdsp.rebateDetail.priceSheet', { stateObject: stateObject });
   };

   // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function () {
      UtilsData.getSastnDescriptionSpecial('R', self.pdsr.refer, function (descrip) {
         self.pdsr.refer = descrip;
      });
   }

   self.subtitle = function () {

      var keyData;

      if (self.pdsr.clevelcd === 'r1') {
         keyData = $translate.instant('global.product') + ': ' + self.pdsr.prod;
      } else if (self.pdsr.clevelcd === 'r2') {
         keyData = $translate.instant('global.rebate.type') + ': ' + self.pdsr.rebatety;
      } else if (self.pdsr.clevelcd === 'r3') {
         keyData = $translate.instant('global.product.price.type') + ': ' + self.pdsr.prodprcty;
      } else if (self.pdsr.clevelcd === 'r4') {
         keyData = $translate.instant('global.product.line') + ': ' + self.pdsr.prodline;
      } else if (self.pdsr.clevelcd === 'r5') {
         keyData = $translate.instant('global.product.category') + ': ' + self.pdsr.prodcat;
      }

      return keyData;
   };

   self.edit = function () {
      $state.go('pdsp.rebateDetail.edit');
   };

   self.cancel = function () {

      var cancelCriteria;

      if (base.callType === 'create') {

         MessageService.okCancel('global.question', base.cancelMessage, function () {

            cancelCriteria = {
               clevelcd: self.pdsr.clevelcd,
               iRecno: self.pdsr.rebrecno
            };

            DataService.post('api/pd/aspdsetup/cancelpdrecord', { data: cancelCriteria, busy: true }, function () {

               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               $state.go('pdsp.rebateMaster');

            });
         });
      } else {
         $state.go('pdsp.rebateMaster');
      }
   };

   self.reset = function () {
      self.loadRecord('detail');
      $state.go('pdsp.rebateDetail.edit');
   };

   self.create = function () {
      base.callType = 'create';
      $state.go('pdsp.rebateCreate');
   };

   self.delete = function () {

      var pdsrRecord;
      var deleteList = [];

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

         pdsrRecord = angular.copy(self.pdsr);
         pdsrRecord.iRecno = self.pdsr.rebrecno;
         pdsrRecord.clevelcd = self.pdsr.clevelcd;
         deleteList.push(pdsrRecord);

         // Detail level data not updated - delete the header data just created
         DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function (data) {

            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.rsearch(function (searchIsDone) {
            });
            $state.go('pdsp.rebateMaster', null, { reload: 'pdsp.rebateMaster' });
         });
      });
   };

   // Trap for Response from Pop-up Question on Submit - Auto Update Opposite record on Create
   self.editOppositePDSR = function (callback) {

      MessageService.yesNo('global.question', 'question.do.you.wish.to.create.a.duplicate.record.for.the.o', function () {
         callback(true);
         return true;
      },
      function () {
         callback(false);
         return false;
      });
   };

   self.updatePDSRRecord = function (oppositeFlag) {

      var pdsrUpdtRecord;

      pdsrUpdtRecord = angular.copy(self.pdsr);

      // Clear the Shared Flag fields
      if (!self.pdsr.shareokfl) {
         self.pdsr.sharefl = false;
         self.pdsr.sharepct = 0;
         self.pdsr.capsellamount = 0;
         self.pdsr.capselltypefl = false;
      }

      // Load screen values to Criteria data names that differ
      pdsrUpdtRecord.reference = self.pdsr.refer;
      pdsrUpdtRecord.contcostfl = self.pdsr.contractcostfl;
      pdsrUpdtRecord.contractlnno = self.pdsr.contractlineno;
      pdsrUpdtRecord.rebcostty = self.pdsr.rebatecostty;
      pdsrUpdtRecord.marcostty = self.pdsr.margincostty;
      pdsrUpdtRecord.rebdnto = self.pdsr.rebdowntoty;
      pdsrUpdtRecord.rebamt = self.pdsr.rebateamt;
      pdsrUpdtRecord.rebpct = self.pdsr.rebatepct;
      pdsrUpdtRecord.prceffdt = self.pdsr.priceeffectivedate;
      pdsrUpdtRecord.prcefftodt = self.pdsr.priceeffectivedateto;
      pdsrUpdtRecord.priceshto = self.pdsr.pricesheetto;
      pdsrUpdtRecord.lCreateOpp = oppositeFlag;

      //Need to set both values in some cases.  The backend will handle the fields properly if both
      //are set.  In cases like: Net, Flat-Rate this is required, otherwise 0 will be stored.
      if (self.pdsr.rebatepctokfl) {
         pdsrUpdtRecord.rebamt = self.pdsr.rebatepct;
         pdsrUpdtRecord.rebateamt = self.pdsr.rebatepct;
      };
      if (self.pdsr.rebateamtokfl) {
         pdsrUpdtRecord.rebpct = self.pdsr.rebateamt;
         pdsrUpdtRecord.rebatepct = self.pdsr.rebateamt;
      };

      DataService.post('api/pd/aspdsetup/rebateupd', { data: pdsrUpdtRecord, busy: true }, function (data) {

         // This is just a String response for the Wanring Message
         if (data) {
            MessageService.alert('global.warning', data);
         }

         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.rsearch(function (searchIsDone) {
         });
         $state.go('pdsp.rebateMaster');
      });

   };

   self.submit = function () {

      var pdsrDropShipTy;
      var levelNumber;
      var newCodeID;
      var pdsrLevelKey;

      if (base.callType === 'create') {

         // Opposite dropshipty
         if (self.pdsr.dropshipty.toLowerCase() === 'd') {
            pdsrDropShipTy = 'w';
         } else if (self.pdsr.dropshipty.toLowerCase() === 'w') {
            pdsrDropShipTy = 'd';
         }

         levelNumber = self.pdsr.clevelcd.substring(1);

         // New Code ID
         newCodeID = levelNumber + self.pdsr.rebatecd + pdsrDropShipTy;

         switch (levelNumber) {
            case '1':
               pdsrLevelKey = self.pdsr.prod;
               break;
            case '2':
               pdsrLevelKey = self.pdsr.rebatety;
               break;
            case '3':
               pdsrLevelKey = self.pdsr.prodprcty;
               break;
            case '4':
               pdsrLevelKey = self.pdsr.prodline;
               break;
            case '5':
               pdsrLevelKey = self.pdsr.prodcat;
               break;
            default:
               pdsrLevelKey = '';
         };

         // Look for Opposite record
         var params = {
            codeid: newCodeID,
            levelkey: pdsrLevelKey,
            vendno: self.pdsr.vendno,
            rebsubty: self.pdsr.rebsubty,
            custno: self.pdsr.custno,
            shipto: self.pdsr.shipto,
            custrebty: self.pdsr.custrebty,
            whse: self.pdsr.whse,
            startdt: self.pdsr.startdt
         };

         // True/False Response - if Data, then true (opposite already exists)
         DataService.get('api/pd/pdsr/existsbypk', { params: params, busy: true }, function (data) {
            if (data) {
               self.updatePDSRRecord(false);
            } else {
               // Ask a Question to Auto Create Opposite Record or Not
               self.editOppositePDSR(function (isOKFl) {
                  if (isOKFl) {
                     self.updatePDSRRecord(true);
                  } else {
                     self.updatePDSRRecord(false);
                  }
               });
            }
         });
      } else {
         self.updatePDSRRecord(false);
      }
   };

}); //end RebateDetail (rdtl)


//Create Rebate Controller
app.controller('PdspRebateCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, GridService, MessageService, ModalService, Utils, UserService) {
   //as rdtl

   var self = this;
   var base = $scope.base;
   self.pdsr = {};

   // Load the Screen Values after the Visiblity call
   self.visibilityCallback = function () {

      var holdUseContractFl = self.pdsr.usecontractvfl;
      var holdUseRebSubTyFl = self.pdsr.userebsubtypefl;

      self.pdsr.usecontractvfl = base.srchUseContractVFl;
      self.pdsr.userebsubtypefl = base.srchUseRebSubTypeFl;
      
      // Vendor on Sale Rebates (PDSR) - load defaults and display the messages
      if (self.pdsr.rebatecd === 's') {

         if (base.srchUsePriceVFl === true && self.pdsr.price > 0) {

            self.pdsr.usepricevfl = true;
            self.pdsr.usecontractvfl = false;
            self.pdsr.userebsubtypefl = false;
            self.pdsr.manualfl = false; 

         }
         else if (base.srchUseContractsFl === true && self.pdsr.userebsubtypefl === true) {

            if (self.pdsr.usecontractvfl === true) {
               self.pdsr.usecontractvfl = true;
               self.pdsr.manualfl = true;
               self.pdsr.userebsubtypefl = false;
            } else {
               self.pdsr.usecontractvfl = false;
               self.pdsr.manualfl = false;
               self.pdsr.userebsubtypefl = true;
            }

         } else if (base.srchUseContractsFl === true) {

            self.pdsr.usecontractvfl = true;
            self.pdsr.manualfl = true;
            self.pdsr.userebsubtypefl = false;
         }

         // Only Display the Messages based on the Initial setting of the flags
         if (holdUseContractFl !== self.pdsr.usecontractvfl || holdUseRebSubTyFl !== self.pdsr.userebsubtypefl) {

            if (base.srchUseContractsFl === true && self.pdsr.userebsubtypefl === true) {

               MessageService.alert('global.warning', "global.use.rebate.sub.type.or.contract.line.number");

            } else if (base.srchUseContractsFl === true) {

               MessageService.alert('global.warning', "global.use.contract.line.number");

            }
         }

      } else {
         self.pdsr.usecontractvfl = false;
         self.pdsr.userebsubtypefl = false;
         self.pdsr.manualfl = false;
      }      

      // Set field sensitivity when values changed
      base.searchFieldsVisible(self.pdsr.clevelcd, self.pdsr.rebatecd, self.pdsr.usecontractvfl, self.pdsr.usepricevfl, 'srch');
      
   };

   self.setManualFlag = function () {
      if (!base.srchUseContractsFl) {
         self.pdsr.manualfl = false;
      } else if (self.pdsr.custno && self.pdsr.contractno) {
         self.pdsr.manualfl = true;
      } else {
         self.pdsr.manualfl = false;
      }
   };

   self.searchFieldsVisible = function (useFl, useValue) {

      // Toggle the screen values when changed
      if (useFl === 'usecontfl') {

         self.pdsr.userebsubtypefl = false;
         self.pdsr.usepricevfl = false;

         if (base.srchUseRebSubTypeFl === true && useValue === false) {

            self.pdsr.userebsubtypefl = true;
            self.pdsr.usecontractvfl = false;
            self.pdsr.manualfl = false;
            self.pdsr.usepricevfl = false;

         } else if (useValue === false) {
            self.setManualFlag();
         } else {
            self.pdsr.manualfl = true;
         }

         // Set field sensitivity when values changed
         base.searchFieldsVisible(self.pdsr.clevelcd, self.pdsr.rebatecd, self.pdsr.usecontractvfl, self.pdsr.usepricevfl, 'srch');
      }

      if (useFl === 'userebfl') {

         self.pdsr.usecontractvfl = false;
         self.pdsr.usepricevfl = false;
                

         if (base.srchUseContractsFl === true && useValue === false) {

            self.pdsr.usecontractvfl = true;
            self.pdsr.manualfl = true;
            self.pdsr.userebsubtypefl = false;
         }

         // Set field sensitivity when values changed
         base.searchFieldsVisible(self.pdsr.clevelcd, self.pdsr.rebatecd, self.pdsr.usecontractvfl, self.pdsr.usepricevfl, 'srch');
      }

      if (useFl === 'usepricefl') {

         self.pdsr.userebsubtypefl = false;
         self.pdsr.usecontractvfl = false;
         self.pdsr.manualfl = false;

         if (base.srchUseContractsFl === true && useValue === false) {

            self.pdsr.userebsubtypefl = false;
            self.pdsr.usepricevfl = false;

         }
         
         // Set field sensitivity when values changed
         base.searchFieldsVisible(self.pdsr.clevelcd, self.pdsr.rebatecd, self.pdsr.usecontractvfl, self.pdsr.usepricevfl, 'srch');

      }

      // Reset for message and default settings if changing Level Code or Rebate Code
      if (useFl === '') {
         self.pdsr.usecontractvfl = null;
         self.pdsr.userebsubtypefl = null;

         if (base.calltype === 'copy' && self.pdsr.price === true && self.prccurrencyty === true) {
            self.pdsr.usepricevfl = true;
         }
         else {
            self.pdsr.usepricevfl = null;
         }

         // Set field defaults
         base.searchFieldsVisible(self.pdsr.clevelcd, self.pdsr.rebatecd, self.pdsr.usecontractvfl, self.pdsr.usepricevfl, 'srch', self.visibilityCallback);
         
      }

   };

   // If Copy - then load the screen values off the row selected
   if (base.callType === 'copy') {

      // Pull in Selected Rows
      var record = GridService.getSelectedRecord(base.rgrid);

      // Copy in the data selected
      self.pdsr.clevelcd = record.levelcd;
      self.pdsr.custno = record.custno;
      self.pdsr.shipto = record.custtype,
      self.pdsr.prod = record.prod;
      self.pdsr.prodprcty = record.prodprcty;
      self.pdsr.prodline = record.prodline;
      self.pdsr.vendno = record.vendno;
      self.pdsr.prodcat = record.prodcat;
      self.pdsr.rebtype = record.rebatety;
      self.pdsr.custrebty = record.custrebty;
      self.pdsr.startdt = record.startdt;
      self.pdsr.contractno = record.contractno;
      self.pdsr.contractlineno = record.contractlineno;
      self.pdsr.rebatecd = record.rebatecd;
      self.pdsr.shiptype = record.dropshipty;
      self.pdsr.pdRowid = record.pdRowid;
      self.pdsr.price = record.price;
      self.pdsr.prccurrencyty = record.prccurrencyty;

      base.currentChangeLevelCd = self.pdsr.clevelcd;
            
      // Whse or Region
      if (record.whse.substring(0, 4) === 'RGN-' || record.whse.substring(0, 4) === 'rgn-') {
         self.pdsr.screenwhse = '';
         self.pdsr.region = record.whse.substring(4);
      } else {
         self.pdsr.screenwhse = record.whse;
         self.pdsr.region = '';
      }

      // Look for the Use Contract pop-up
      self.searchFieldsVisible('', '');

   }

   // Loaded initially for 'New' - first record in Array
   self.resetLevelCode = function () {

      // Use the Level Code off the Search Criteria or Advanced Search - which ever was changed/used last
      if (base.currentChangeLevelCd !== 'r0') {
         self.pdsr.clevelcd = base.currentChangeLevelCd;
      } else if (base.levelCodeDetailPDSR.length) {
         var record = base.levelCodeDetailPDSR[0];
         self.pdsr.clevelcd = record.value;
         base.currentChangeLevelCd = self.pdsr.clevelcd;
      }

      // Keep 'customer' rebate for default - use Contract settings load for 'on sale'
      self.rebrecnoDisplay = '';
      self.pdsr.rebatecd = 'c';
      self.pdsr.shiptype = 'w';

      // Load the Detail Field Visibility Settings
      base.searchFieldsVisible(self.pdsr.clevelcd, self.pdsr.rebatecd, '', '', 'srch', self.visibilityCallback);
   };

   if (base.callType === 'create') {
      self.resetLevelCode();
   }

   self.changeLevelCode = function () {

      // Clear Field Values on fields that dynamically change
      self.pdsr.custno = '';
      self.pdsr.shipto = '',
      self.pdsr.prod = '';
      self.pdsr.prodprcty = '';
      self.pdsr.prodline = '';
      self.pdsr.vendno = '';
      self.pdsr.prodcat = '';
      self.pdsr.rebatety = '';
      self.pdsr.custrebty = '';
      self.pdsr.rebsubty = '';
      base.currentChangeLevelCd = self.pdsr.clevelcd;

      // Load the Detail Field Visibility Settings
      base.searchFieldsVisible(self.pdsr.clevelcd, '', '', '', 'srch', self.visibilityCallback);
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
      $state.go('pdsp.rebateMaster');
   };

   // Clear form
   self.reset = function () {
      Utils.clearObject(self.pdsr);

      self.resetLevelCode();
   };

   // Trap for Response from Pop-up Question on Submit
   self.editContractLine = function (callback) {

      MessageService.okCancel('global.question', 'question.contract.line.num.is.zero.proceed', function () {
         callback(true);
         return true;
      },
      function () {
         callback(false);
         return false;
      });
   };

   self.createPDSRRecord = function () {

      // Region is stored in the Whse Field
      if (self.pdsr.region) {
         self.pdsr.whse = 'RGN-' + self.pdsr.region;
      } else {
         self.pdsr.whse = self.pdsr.screenwhse;
      }

      // Use Contract or Use Sub Rebate Type - co-dev fields
      if (!base.srchCustRebTypeFl) {
         self.pdsr.custrebty = '';
      }

      if (!base.srchContractNoFl) {
         self.pdsr.contractno = '';
         self.pdsr.contractlineno = 0;
      }

      if (!base.srchUseContractsFl) {
         self.pdsr.usecontractvfl = false;
      }

      // Fields that differ to 'add/copy' tables
      self.pdsr.rebcustty = self.pdsr.custrebty;
      self.pdsr.prodpricety = self.pdsr.prodprcty;
      self.pdsr.contractLine = self.pdsr.contractlineno;

      if (base.callType === 'create') {

         self.pdsr.lUseContractvfl = self.pdsr.usecontractvfl;
         self.pdsr.lUsePricevfl = self.pdsr.usepricevfl;


         // Create PDSR
         DataService.post('api/pd/aspdsetup/pdsprebateadd', { data: self.pdsr, busy: true }, function (hdrdata) {
            if (hdrdata) {

               if (hdrdata.cWarningMessage) {
                  MessageService.alert('global.warning', hdrdata.cWarningMessage);
               }

               // Go to detail state passing the row id
               $state.go('pdsp.rebateDetail.edit', {
                  id: hdrdata.iRebrecno
               });
            }
         });
      } else {

         // Specific to Copy
         if (!self.pdsr.custno && !self.pdsr.contractno) {
            self.pdsr.manualfl = false;
         }

         self.pdsr.lusecontract = self.pdsr.usecontractvfl;
         self.pdsr.lUsePricevfl = self.pdsr.usepricevfl;

         // Copy PDSR
         DataService.post('api/pd/aspdsetup/pdsprebatecopy', { data: self.pdsr, busy: true }, function (hdrdata) {
            if (hdrdata) {

               if (hdrdata.cWarningMessage) {
                  MessageService.alert('global.warning', hdrdata.cWarningMessage);
               }

               // Go to detail state passing the row id
               $state.go('pdsp.rebateDetail.edit', {
                  id: hdrdata.iRebrecno
               });
            }
         });
      }
   };

   self.submit = function () {

      if (self.pdsr.screenwhse && self.pdsr.region) {
         MessageService.alert('global.error', "message.the.entry.will.allow.either.a.whse.or.a.rebate.reg");
         return;
      }

      if (self.pdsr.usecontractvfl === true && self.pdsr.userebsubtypefl === true) {
         MessageService.alert('global.error', "global.use.rebate.sub.type.or.contract.line.number");
         return;
      }

      if (self.pdsr.usepricevfl === true && !self.pdsr.price > 0) {
         MessageService.alert('global.error', "global.use.rebate.price.required");
         return;
      }

      if (self.pdsr.usecontractvfl === true && self.pdsr.contractno && !self.pdsr.contractlineno) {

         // Ask a Question to Continue or not
         self.editContractLine(function (isOKFl) {
            if (isOKFl) {
               self.createPDSRRecord();
            } else {
               return;
            }
         });
      } else {
         self.createPDSRRecord();
      }
   };

}); //end RebateCreate (rdtl)