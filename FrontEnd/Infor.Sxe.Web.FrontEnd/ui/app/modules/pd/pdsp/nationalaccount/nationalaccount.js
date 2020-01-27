'use strict';

app.controller('PdspNationalAccountSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   base.criteria.clevelcd = 'n0';

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);

      // Clear all Search Fields
      base.criteria.clevelcd = 'n0';
      self.advCriteria.clevelcd = base.criteria.clevelcd;
      base.criteria.vendno = 0;
      base.criteria.custno = 0;
      base.criteria.shipto = '';
      base.criteria.custgroup = '';
      base.criteria.custpricety = '';
      base.criteria.prod = '';
      base.criteria.modelcode = '';
      base.criteria.brandcode = '';
      base.criteria.prodcat = '';
      base.criteria.prodline = '';
      base.criteria.prodpricety = '';
      base.criteria.rebtype = '';
      base.criteria.rebsubty = '';
      base.criteria.pdsnrecno = 0;

      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('pdsp.nationalaccountMaster');
      }

      base.nasearch();
   };
}); //end NationalAccountSearch (nasrch)

app.controller('PdspNationalAccountMasterCtrl', function ($scope, $state, $stateParams, ConfigService, DataService, GridService, MessageService) {
   //as namst
   var self = this;
   var base = $scope.base;

   // Reset logic is done already - just set field visibility
   self.clear = function () {

       self.advCriteria.clevelcd = 'n0';

      // Set field sensitivity
      base.searchFieldsVisible(self.advCriteria.clevelcd, self.advCriteria.rebatecd, self.advCriteria.usecontractvfl, self.advCriteria.usepricevfl,'adv');
   };

   // Advanced search criteria object with initial values
   self.advCriteria = {
      clevelcd: 'n0',
      vendno: '0',
      iRecordlimit: ConfigService.getDefaultRecordLimit()
   };

   if (!base.currentChangeLevelCd) {
       base.currentChangeLevelCd = 'n0';
   }

    // Load the Visble Settings - Adv Search
   if (self.advCriteria.clevelcd !== 'n0') {
      base.searchFieldsVisible(self.advCriteria.clevelcd, '', '', '', 'adv');
   }

   // List of available search criteria fields
   self.criteriaList = [
      { value: 'inactivefl', label: MessageService.get('global.inactive') },
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

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.nasearch();
   }

   self.drilldown = function (e, args) {
      var record = args[0].item;
      self.advCriteria.clevelcd = record.clevelcd;
      var stateObject = {};
      base.callType = '';

      // Go to detail state passing the row data
      $state.go('pdsp.nationalaccountDetail', {
          id: record.pdrecno
      });
   };

   self.edit = function () {
      var record = GridService.getSelectedRecord(base.nagrid);
      var stateObject = {};
      base.callType = '';

      if (record) {
          $state.go('pdsp.nationalaccountDetail.edit', {
              id: record.pdrecno
          });
      }
   };

   self.create = function () {
      base.callType = 'create';
      $state.go('pdsp.nationalaccountCreate');
   };

   self.copy = function () {
      base.callType = 'copy';
      $state.go('pdsp.nationalaccountCopy');
   };

   self.delete = function () {

      var records = GridService.getSelectedRecords(base.nagrid);
      if (records) {

         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

            var pdsnRecord;
            var deleteList = [];

            // Process one Row at a Time
            records.forEach(function (record) {

               pdsnRecord = angular.copy(record);
               pdsnRecord.clevelcd = record.clevelcd;
               pdsnRecord.iRecno = record.pdrecno;

               deleteList.push(pdsnRecord);
            });

            DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function () {

               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               base.nasearch();
            });
         });
      }
   };

   // Advanced Search
   self.search = function () {

      var criteria = angular.copy(self.advCriteria);
      var searchLevelCode;

      base.nadataset = [];
      searchLevelCode = criteria.clevelcd;

      DataService.post('api/pd/aspdsetup/pdspnpsearch', { data: criteria, busy: true }, function (data) {
         if (data) {

            // Load the Column Visibility Settings
            base.searchFieldsVisible(searchLevelCode, '', '', '', 'srch');
            base.nadataset = data.pdspnpresults;

            if (data.lMorerecords) {
               MessageService.alert('global.warning', data.cWarningMsg);
            }
         }
      });
   };
}); //end NationalAccountMaster (namst)

app.controller('PdspNationalAccountDetailCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.pdsn = {};

   //Set local pdsn record
   self.loadRecord = function () {

      var pdsnList = {
          iRecNo: $stateParams.id
      };

      DataService.post('api/pd/aspdsetup/pdspnpinit', { data: pdsnList, busy: true }, function (data) {
         if (data) {

            self.pdsn = data;
            base.criteria.clevelcd = self.pdsn.clevelcd;
            base.currentChangeLevelCd = self.pdsn.clevelcd;

            // Level Code Display
            self.displayLevelCode = $translate.instant('global.vendor');
            base.searchFieldsVisible(self.pdsn.clevelcd, '', '', '', 'srch');
         }
      });
   };

   self.loadRecord();

   self.subtitle = function () {
      var keyData;

      keyData = $translate.instant('global.vendor.number') + ': ' + self.pdsn.vendno;

      return keyData;
   };

   self.edit = function () {
      $state.go('pdsp.nationalaccountDetail.edit');
   };

   self.reset = function () {
      self.loadRecord();
      $state.go('pdsp.nationalaccountDetail.edit');
   };

   self.create = function () {
      $state.go('pdsp.nationalaccountCreate');
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
                   clevelcd: self.pdsn.clevelcd,
                   iRecno: self.pdsn.pdsnrecno
               };
               DataService.post('api/pd/aspdsetup/cancelpdrecord', { data: cancelCriteria, busy: true }, function () {

                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                  base.nasearch();
                  $state.go('pdsp.nationalaccountMaster');

               });
            } else {
               return;
            }
         });
      } else {
         base.nasearch();
         $state.go('pdsp.nationalaccountMaster');
      }
   };

   self.delete = function () {

      var pdsnRecord;
      var deleteList = [];

      MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {

         pdsnRecord = angular.copy(self.pdsn);
         pdsnRecord.iRecno = self.pdsn.pdsnrecno;
         deleteList.push(pdsnRecord);

         // Detail level data not updated - delete the header data just created
         DataService.post('api/pd/aspdsetup/deletepdrecord', { data: deleteList, busy: true }, function (data) {

            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.nasearch();
            $state.go('pdsp.nationalaccountMaster', null, { reload: 'pdsp.nationalaccountMaster' });
         });
      });
   };

   self.submit = function () {

      var pdsnUpdtRecord;
      pdsnUpdtRecord = angular.copy(self.pdsn);
      pdsnUpdtRecord.iRecno = self.pdsn.pdsnrecno;

      DataService.post('api/pd/aspdsetup/pdspnpupd', { data: pdsnUpdtRecord, busy: true }, function (data) {

         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.nasearch();
         $state.go('pdsp.nationalaccountMaster');
      });
   };
}); //end NationalAccountDetail (nadtl)

app.controller('PdspNationalAccountCreateCtrl', function ($scope, $state, $stateParams, $translate, Constants, DataService, GridService, MessageService, ModalService, UserService) {
   var self = this;
   var base = $scope.base;
   self.pdsn = {};

   // If Copy - then load the screen values off the row selected
   if (base.callType === 'copy') {

      // Pull in Selected Rows
      var record = GridService.getSelectedRecord(base.nagrid);

      // Copy in the data selected
      self.pdsn.clevelcd = record.clevelcd;
      base.criteria.clevelcd = self.pdsn.clevelcd;
      base.currentChangeLevelCd = self.pdsn.clevelcd;

      self.pdsn.vendno = record.vendno;
      self.pdsn.custno = record.custno;
      self.pdsn.shipto = record.shipto;
      self.pdsn.custgroup = record.custgroup;
      self.pdsn.custpricety = record.custpricety;
      self.pdsn.prod = record.prod;
      self.pdsn.modelcode = record.modelcode;
      self.pdsn.brandcode = record.brandcode;
      self.pdsn.prodline = record.prodline;
      self.pdsn.prodcat = record.prodcat;
      self.pdsn.prodpricety = record.prodprcty;
      self.pdsn.rebtype = record.rebatety;
      self.pdsn.rebsubty = record.rebsubty;
      self.pdsn.startdt = record.startdt;
      self.pdsn.pdRowid = record.pdRowid;
   }

   self.subtitle = function () {
      if (base.callType === 'create') {
         return $translate.instant('global.new');
      } else {
         return $translate.instant('global.copy');
      }
   };

   // Loaded initially for 'New' - first record in Array
   self.resetLevelCode = function () {

       // Use the Level Code off the Search Criteria or Advanced Search - which ever was changed/used last
       if (base.criteria.clevelcd !== 'n0') {
           self.pdsn.clevelcd = base.criteria.clevelcd;
       } else if (base.levelCodeDetailPDSN.length) {
           var record = base.levelCodeDetailPDSN[0];
           self.pdsn.clevelcd = record.value;
           base.currentChangeLevelCd = self.pdsn.clevelcd;
       }
       //self.pdrecnoDisplay = '';

       base.criteria.clevelcd = self.pdsn.clevelcd;
       base.currentChangeLevelCd = self.pdsn.clevelcd;
       // Load the Detail Field Visibility Settings
       base.searchFieldsVisible(self.pdsn.clevelcd, '', '', '', 'srch');
   };

   if (base.callType === 'create') {
       self.resetLevelCode();
   }

   self.changeLevelCode = function () {
       // Clear Field Values on fields that dynamically change
       self.pdsn.vendno = '';
       self.pdsn.custno = '';
       self.pdsn.shipto = '',
       self.pdsn.custgroup = '',
       self.pdsn.custpricety = '',
       self.pdsn.prod = '';
       self.pdsn.modelcode = '',
       self.pdsn.brandcode = '',
       self.pdsn.prodcat = '';
       self.pdsn.prodline = '';
       self.pdsn.prodpricety = '';
       self.pdsn.rebtype = '';
       self.pdsn.rebsubty = '';

       base.currentChangeLevelCd = self.pdsn.clevelcd;

       // Load the Detail Field Visibility Settings
       base.searchFieldsVisible(self.pdsn.clevelcd, '', '', '', 'srch');
   };

   self.cancel = function () {
      base.callType = '';
      $state.go('pdsp.nationalaccountMaster');
   };

   // Clear form
   self.reset = function () {
      Utils.clearObject(self.pdsn);
   };

   self.submit = function () {

      var stateObject = {};

      if (base.callType === 'create') {

         // Create PDSV
          DataService.post('api/pd/aspdsetup/pdspnpadd', { data: self.pdsn, busy: true }, function (data) {
            if (data) {

               if (data.cWarningMessage) {
                  MessageService.alert('global.warning', data.cWarningMessage);
               }

               // Go to detail - passing pdsnrecno
               $state.go('pdsp.nationalaccountDetail.edit', {
                   id: data
               });
            }
         });
      } else {
         // Copy PDSN
         DataService.post('api/pd/aspdsetup/pdspnpcopy', { data: self.pdsn, busy: true }, function (data) {
            if (data) {

               if (data.iPDrecno) {
                   $state.go('pdsp.nationalaccountDetail.edit', {
                       id: data.iPDrecno
                   });
               }
            }
         });
      }
   };
}); //end NationalAccountCreate (nadtl)