'use strict';

app.controller('PdspVendorSearchCtrl', function ($scope, $state, DataService, Utils) { //as vsrch
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Clear all Search Fields
      base.criteria.vendno = 0;
      base.criteria.prod = '';
      base.criteria.clevelcd = 'v1';

      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('pdsp.vendorMaster');
      }

      base.vsearch();
   };
}); //end VendorSearch (vsrch)


app.controller('PdspVendorMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, GridService, MessageService) {
   //as vmst
   var self = this;
   var base = $scope.base;

   if (base.criteria.clevelcd && base.criteria.clevelcd !== 'v1') {
      base.criteria.clevelcd = 'v1';
      base.criteria.vendno = 0;
   }

   // Advanced search criteria object with initial values
   self.advCriteria = {
      clevelcd: 'v1',
      vendno: 0,
      iRecordlimit: ConfigService.getDefaultRecordLimit()
   };

   // Load the Visble Settings - Adv Search
   base.searchFieldsVisible(self.advCriteria.clevelcd, '', '', '', 'adv');

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'inactivefl', label: MessageService.get('global.inactive') },
      { value: 'expactivefl', label: MessageService.get('global.expire.inactive') },
      { value: 'startdt', label: MessageService.get('global.start.date') },
      { value: 'iRecordlimit', label: MessageService.get('global.record.limit') }
   ];

   // List of default selected criteria fields
   self.defaultSelectedCriteria = ['startdt', 'inactivefl', 'expactivefl', 'iRecordlimit'];

   // Product hyperlink
   self.productHyperlink = function (e, args) {
      var currentRow = args[0].item;
      if (currentRow) {
         $state.go('icip.detail', { pk: currentRow.prod });
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
      base.vsearch();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      var stateObject = {};
      base.callType = '';

      stateObject = {
         prod: record.prod,
         vendno: record.vendno,
         startdt: record.startdt
      };

      // Go to detail state passing the row data
      $state.go('pdsp.vendorDetail', { stateObject: stateObject });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.vgrid);
      var stateObject = {};
      base.callType = '';

      stateObject = {
         prod: record.prod,
         vendno: record.vendno,
         startdt: record.startdt
      };

      if (record) {
         $state.go('pdsp.vendorDetail.edit', { stateObject: stateObject });
      }
   };

   self.create = function () {
      base.callType = 'create';
      $state.go('pdsp.vendorCreate');
   };

   self.copy = function () {
      base.callType = 'copy';
      $state.go('pdsp.vendorCopy');
   };

   self.delete = function () {

      var records = GridService.getSelectedRecords(base.vgrid);
      if (records) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            var pdsvRecord;
            var deleteList = [];

            // Process one Row at a Time
            records.forEach(function (record) {

               pdsvRecord = angular.copy(record);
               pdsvRecord.clevelcd = 'v1';

               deleteList.push(pdsvRecord);

            });

            DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function () {

               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.vsearch();
            });
         });
      }
   };

   // Advanced Search
   self.search = function () {

      var criteria = angular.copy(self.advCriteria);

      base.vdataset = [];

      DataService.post('api/pd/aspdsetup/pdspvendsearch', { data: criteria, busy: true }, function (data) {
         if (data) {

            base.vdataset = data.pdspvendresults;

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }
         }
      });

   };

}); //end VendorMaster (vmst)


app.controller('PdspVendorDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService, UtilsData) { //as vdtl
   var self = this;
   var base = $scope.base;
   self.pdsv = {};

   // Buy Type
   self.buyTypeValue = function () {

      // Parse out the comma delimited field values and labels for the drop down list
      self.buyTypeList = [];
      var valueArray = [];
      var labelArray = [];
      var dropDownLabel;
      var dropDownValue;

      // Drop Down Data
      valueArray = self.pdsv.buytypeli.split(',');
      labelArray = self.pdsv.buytypepd.split(',');

      // Build the Drop Down paired data
      for (var i = 0; i < valueArray.length; i++) {
         dropDownLabel = valueArray[i];
         dropDownValue = labelArray[i];
         self.buyTypeList.push({ value: dropDownValue, label: dropDownLabel });
      }
   };


   self.qtyBreakChange = function () {

      if (self.pdsv.buytype.toLowerCase() === 'q') {
         self.qtyBreakLabel = $translate.instant('global.quantity');
      } else if (self.pdsv.buytype.toLowerCase() === 'w') {
         self.qtyBreakLabel = $translate.instant('global.weight');
      } else {
         self.qtyBreakLabel = $translate.instant('global.cubes');
      }
   };

   self.allowQtyBreakChg = function (row, cell, value, column, item) {

      if (item.seqno === 9) {
         return false;
      } else {
         return true;
      }
   };

   // If the user entered a shortcut to a SASTT reference value, apply the shortcut to get the reference value
   self.referenceLookupChanged = function () {
      UtilsData.getSastnDescriptionSpecial('R', self.pdsv.reference, function (descrip) {
         self.pdsv.reference = descrip;
      });
   }

   //Set local pdsv record
   self.loadRecord = function () {

      // From
      self.pdsvList = {
         prod: $stateParams.stateObject.prod,
         vendno: $stateParams.stateObject.vendno,
         startdt: $stateParams.stateObject.startdt
      };

      //User Hook (do not rename)
      if (self.loadRecordCriteria) {
         self.loadRecordCriteria();
      }

      DataService.post('api/pd/aspdsetup/pdspvendinit', { data: self.pdsvList, busy: true }, function (data) {
         if (data) {

            self.pdsv = data;
            self.pdsv.buytype = data.buytypesv;

            // Buy Type drop down
            self.buyTypeValue();

            // Load Quantity Break Label
            self.qtyBreakChange();

            // Level Code Display
            self.displayLevelCode = $translate.instant('global.vendor');


            // Load the Price Grid
            self.pricegrid = [
               { seqno: 1, prcmult: self.pdsv.prcmult1, qtybrk: self.pdsv.qtybrk1, prcdisc: self.pdsv.prcdisc1 },
               { seqno: 2, prcmult: self.pdsv.prcmult2, qtybrk: self.pdsv.qtybrk2, prcdisc: self.pdsv.prcdisc2 },
               { seqno: 3, prcmult: self.pdsv.prcmult3, qtybrk: self.pdsv.qtybrk3, prcdisc: self.pdsv.prcdisc3 },
               { seqno: 4, prcmult: self.pdsv.prcmult4, qtybrk: self.pdsv.qtybrk4, prcdisc: self.pdsv.prcdisc4 },
               { seqno: 5, prcmult: self.pdsv.prcmult5, qtybrk: self.pdsv.qtybrk5, prcdisc: self.pdsv.prcdisc5 },
               { seqno: 6, prcmult: self.pdsv.prcmult6, qtybrk: self.pdsv.qtybrk6, prcdisc: self.pdsv.prcdisc6 },
               { seqno: 7, prcmult: self.pdsv.prcmult7, qtybrk: self.pdsv.qtybrk7, prcdisc: self.pdsv.prcdisc7 },
               { seqno: 8, prcmult: self.pdsv.prcmult8, qtybrk: self.pdsv.qtybrk8, prcdisc: self.pdsv.prcdisc8 },
               { seqno: 9, prcmult: self.pdsv.prcmult9, qtybrk: '', prcdisc: self.pdsv.prcdisc9 }
            ];

            //User Hook (do not rename)
            if (self.loadRecordContinue) {
               self.loadRecordContinue();
            }
         }
      });
   };

   self.loadRecord();

   self.subtitle = function () {
      var keyData;

      keyData = $translate.instant('global.vendor.number') + ': ' + self.pdsv.vendno;

      return keyData;
   };

   self.edit = function () {
      $state.go('pdsp.vendorDetail.edit');
   };

   self.reset = function () {
      self.loadRecord();
      $state.go('pdsp.vendorDetail.edit');
   };

   self.create = function () {
      $state.go('pdsp.vendorCreate');
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
                  clevelcd: 'v1',
                  prod: self.pdsv.prod,
                  vendno: self.pdsv.vendno,
                  startdt: self.pdsv.startdt
               };

               DataService.post('api/pd/aspdsetup/cancelpdrecord', { data: cancelCriteria, busy: true }, function () {

                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  base.vsearch();
                  $state.go('pdsp.vendorMaster');

               });
            } else {
               return;
            }
         });
      } else {
         base.vsearch();
         $state.go('pdsp.vendorMaster');
      }

   };

   self.delete = function () {

      var pdsvRecord;
      var deleteList = [];

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

         pdsvRecord = angular.copy(self.pdsv);
         pdsvRecord.clevelcd = 'v1';
         pdsvRecord.iRecno = self.pdsv.pdrecno;
         pdsvRecord.prod = self.pdsv.prod;
         pdsvRecord.vendno = self.pdsv.vendno;
         pdsvRecord.startdt = self.pdsv.startdt;
         deleteList.push(pdsvRecord);

         // Detail level data not updated - delete the header data just created
         DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function (data) {

            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.vsearch();
            $state.go('pdsp.vendorMaster', null, { reload: 'pdsp.vendorMaster' });
         });
      });
   };

   self.submit = function () {

      var priceBreakTable = [];

      var pdsvUpdtRecord;

      pdsvUpdtRecord = angular.copy(self.pdsv);
      pdsvUpdtRecord.cLevelcd = self.pdsv.levelcd;

      DataService.post('api/pd/aspdsetup/vendorupd', { data: pdsvUpdtRecord, busy: true }, function (data) {

         // Load the Price Break Table data - separate Update
         for (var i = 0; i <= 8; i++) {
            var obj = self.pricegrid[i];
            var seqNum = i + 1;
            priceBreakTable.push({
               cLevelcd: 'v1',
               vendno: self.pdsv.vendno,
               prod: self.pdsv.prod,
               startdt: self.pdsv.startdt,
               seqno: seqNum,
               price: obj.prcmult,
               disc: obj.prcdisc,
               prcbreak: obj.qtybrk
            });
         }

         DataService.post('api/pd/aspdsetup/pdspupdatebrowser', { data: priceBreakTable, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            base.vsearch();
            $state.go('pdsp.vendorMaster');
         });
      });
   };

}); //end VendorDetail (vdtl)


app.controller('PdspVendorCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, GridService, MessageService, ModalService, UserService) { //as vdtl
   var self = this;
   var base = $scope.base;
   self.pdsv = {};

   // If Copy - then load the screen values off the row selected
   if (base.callType === 'copy') {

      // Pull in Selected Rows
      var record = GridService.getSelectedRecord(base.vgrid);

      // Copy in the data selected
      self.pdsv.prod = record.prod;
      self.pdsv.vendno = record.vendno;
      self.pdsv.startdt = record.startdt;
      self.pdsv.pdRowid = record.pdRowid;
   }

   self.subtitle = function () {
      if (base.callType === 'create') {
         return $translate.instant('global.new');
      } else {
         return $translate.instant('global.copy');
      }
   };

   self.cancel = function () {
      base.callType = '';
      $state.go('pdsp.vendorMaster');
   };

   // Clear form
   self.reset = function () {
      Utils.clearObject(self.pdsv);
   };

   self.submit = function () {

      self.pdsv.clevelcd = 'v1';
      var stateObject = {};

      if (base.callType === 'create') {

         // Create PDSV
         DataService.post('api/pd/aspdsetup/pdspvendadd', { data: self.pdsv, busy: true }, function (data) {
            if (data) {

               if (data.cWarningMessage) {
                  MessageService.alert('global.warning', data.cWarningMessage);
               }

               stateObject = {
                  prod: self.pdsv.prod,
                  vendno: self.pdsv.vendno,
                  startdt: self.pdsv.startdt
               };

               // Go to detail - passing new data
               $state.go('pdsp.vendorDetail.edit', { stateObject: stateObject });
            }
         });
      } else {
         // Copy PDSV
         DataService.post('api/pd/aspdsetup/pdspvendcopy', { data: self.pdsv, busy: true }, function (data) {
            if (data) {

               if (data.cWarningMessage) {
                  MessageService.alert('global.warning', data.cWarningMessage);
               }

               stateObject = {
                  prod: self.pdsv.prod,
                  vendno: self.pdsv.vendno,
                  startdt: self.pdsv.startdt
               };

               // Go to detail - passing new data
               $state.go('pdsp.vendorDetail.edit', { stateObject: stateObject });
            }
         });
      }
   };

}); //end VendorCreate (cdtl)


