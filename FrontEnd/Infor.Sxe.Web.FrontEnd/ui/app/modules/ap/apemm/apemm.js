'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ap',
      menuFn: 'apemm',
      dataPath: 'api/ap/apemm',
      searchMethod: 'POST',
      searchPath: 'api/ap/asapsetup/apemmbuildtransactions',
      searchResultsField: 'apemmresults',
      resultsRowIdField: 'apemmRowID',
      recordRowIdField: 'apemmRowID',
      detailSubTitle: [
         { label: 'global.journal', value: 'jrnlno' },
         { label: 'global.set', value: 'setno' },
         { label: 'global.vendor', value: 'vendno' }
      ],
      primaryKeyParams: ['jrnlno', 'setno'],
      recentlyVisited: null
   });
});

app.service('ApemmService', function (MessageService, Sasoo, Sasc, Utils, DataService, GridService, $state, $translate) {

   this.extendBaseController = function (self) {
      self.apemmresults = [];
      self.apemmupatecriteria = {};
      self.apemmupdatesingle = {};
      self.selectedApemm = {};

      self.searchManualAddresses = function () {
         //Reset Grid results for each search operation
         self.apemmresults = [];

         var buildTransactionsRequest = {
            apemmresults: self.apemmresults,
            apemmupatecriteria: self.apemmupatecriteria,
            apemmupdatesingle: self.apemmupdatesingle,
            pvJrnlno: self.criteria.jrnlno
         };

         DataService.post('api/ap/asapsetup/apemmbuildtransactions', { data: buildTransactionsRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  self.apemmresults = data.apemmresults;
                  if (data.apemmupdatesingle) {
                     self.apemmupdatesingle = data.apemmupdatesingle;
                  }
               }
            }
         });
      };

      self.setSelectedApemm = function (updateSingle) {
         if (updateSingle) {
            self.selectedApemm.jrnlno = updateSingle.jrnlno;
            self.selectedApemm.cono = updateSingle.cono;
            self.selectedApemm.setno = updateSingle.setno;
            self.selectedApemm.addr1 = updateSingle.addr1;
            self.selectedApemm.addr2 = updateSingle.addr2;
            self.selectedApemm.addr3 = updateSingle.addr3;
            self.selectedApemm.amount = updateSingle.amount;
            self.selectedApemm.apemmRowID = updateSingle.apemmRowID;
            self.selectedApemm.apinvno = updateSingle.apinvno;
            self.selectedApemm.city = updateSingle.city;
            self.selectedApemm.name = updateSingle.name;
            self.selectedApemm.refer = updateSingle.refer;
            self.selectedApemm.state = updateSingle.state;
            self.selectedApemm.transdt = updateSingle.transdt;
            self.selectedApemm.transproc = updateSingle.transproc;
            self.selectedApemm.transtm = updateSingle.transtm;
            self.selectedApemm.vendno = updateSingle.vendno;
            self.selectedApemm.zipcd = updateSingle.zipcd;
         }
      };

      self.setUpdateSingleData = function () {
         self.apemmupdatesingle = {
            addr1: '',
            addr2: '',
            addr3: '',
            amount: 0.0,
            apinvno: '',
            city: '',
            cono: 0,
            jrnlno: 0,
            name: '',
            operinit: '',
            refer: '',
            setno: 0,
            state: '',
            transdt: '',
            transproc: '',
            transtm: '',
            user1: '',
            user2: '',
            user3: '',
            user4: '',
            user5: '',
            user6: 0.0,
            user7: 0.0,
            user8: '',
            user9: '',
            vendno: 0,
            zipcd: '',
            apemmRowID: '',
            apsvRowID: ''
         };
      };

      self.setUpdateSingleData();
   };

   this.extendMasterController = function (self, base, $stateParams) {

      self.refreshSearch = false;

      if ($stateParams.refreshSearch) {
         base.searchManualAddresses();
      }

      self.customDrilldown = function (e, args) {
         var record = args[0].item;

         base.currentRowID = record.apemmRowID;
         self.getApemmRecord(record);
         $state.go('^.detail', { id: record.apemmRowID, object: record });
      };

      self.customEdit = function () {
         var record = GridService.getSelectedRecord(base.grid);

         base.currentRowID = record.apemmRowID;
         self.getApemmRecord(record);
         $state.go('^.detail.edit', { id: record.apemmRowID, object: record });
      };

      self.getApemmRecord = function (record) {
         if (record.apemmRowID) {
            DataService.get('api/ap/apemm/getbyrowid/' + record.apemmRowID, { busy: true }, function (data) {
               if (data) {
                  base.selectedApemm = data;
                  self.validateApemm(record);
               }
            });
         }
         else {
            self.validateApemm(record);
         }
      };

      self.validateApemm = function (record) {
         var validateLoadRequest = {
            apemmresults: base.apemmresults,
            apemmupatecriteria: { apetRowID: record.apetRowID },
            apemmupdatesingle: base.apemmupdatesingle
         };

         DataService.post('api/ap/asapsetup/apemmvalidateload', { data: validateLoadRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.setSelectedApemm(data.apemmupdatesingle);
               }
            }
         });
      };

      self.customDelete = function () {
         var selectedRowIDs = GridService.getSelectedRowIds(base.grid, 'apemmRowID');

         // Process based upon whether any of the selected rows have a manual address
         if (selectedRowIDs.length) {
            MessageService.yesNo('global.question', 'question.confirm.delete', function () {

               DataService.delete('api/ap/apemm/deletelistbyrowids', { data: selectedRowIDs, busy: true }, function () {
                  MessageService.info('global.information', 'message.delete.operation.completed.successfully');

                  base.searchManualAddresses();
               });

            });
         } else {
            MessageService.info('global.information', 'message.nothing.to.delete.manual.address.does.not.exist.f');
         }

      };
   };

   this.extendDetailController = function (self, base, apemm, scope, $stateParams) {
      self.selectedApemmRecord = $stateParams.object ? $stateParams.object : {};

      self.getSubTitle = function () {
         var subTitle = $translate.instant('global.journal') + ' ' + base.selectedApemm.jrnlno + ' | ';
         subTitle += $translate.instant('global.set') + ' ' + base.selectedApemm.setno + ' | ';
         subTitle += $translate.instant('global.vendor') + ' ' + base.selectedApemm.vendno;
         return subTitle;
      };

      self.copyVendorAddress = function () {
         var apemmupdatesingle = {
            apsvRowID: self.selectedApemmRecord.apsvRowID,
            apemmRowID: self.selectedApemmRecord.apemmRowID,
            cono: self.selectedApemmRecord.cono,
            jrnlno: self.selectedApemmRecord.jrnlno,
            setno: self.selectedApemmRecord.setno,
            vendno: self.selectedApemmRecord.vendno
         };

         var copyVendorAddressRequest = {
            apemmresults: base.apemmresults,
            apemmupatecriteria: { apetRowID: self.selectedApemmRecord.apetRowID },
            apemmupdatesingle: apemmupdatesingle
         };

         DataService.post('api/ap/asapsetup/apemmcopyvendoraddress', { data: copyVendorAddressRequest, busy: true }, function (data) {
            if (data) {
               if (!MessageService.processMessaging(data.messaging)) {
                  base.setSelectedApemm(data.apemmupdatesingle);
               }
            }
         });
      };

      self.submitApemm = function () {
         if (base.selectedApemm.apemmRowID) {

            // Use PUT if the record already exists and we need to apply changes to the record
            DataService.put('api/ap/apemm', { data: base.selectedApemm, busy: true }, function (data) {
               if (data) {
                  base.searchManualAddresses();
                  $state.go('apemm.master', { refreshSearch: true }, { reload: 'apemm.master' });
               }
            });
         } else {

            // Use POST if the record does not exist and we need to create a new record
            DataService.post('api/ap/apemm', { data: base.selectedApemm, busy: true }, function (data) {
               if (data) {
                  base.searchManualAddresses();
                  $state.go('apemm.master', { refreshSearch: true }, { reload: 'apemm.master' });
               }
            });
         }
      };

      self.customDelete = function () {
         MessageService.yesNo('global.question', 'question.confirm.delete', function () {
            DataService.delete('api/ap/apemm', { data: base.selectedApemm, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               $state.go('apemm.master', null, { reload: 'apemm.master' });
               base.searchManualAddresses();
            });
         });
      };

      self.customReset = function () {

         // Get the initial data from the record to redisplay in the fields
         if (base.currentRowID) {
            DataService.get('api/ap/apemm/getbyrowid/' + base.currentRowID, { busy: true }, function (data) {
               if (data) {
                  base.selectedApemm = data;
               }
            });
         } else {
            base.selectedApemm.addr1 = '';
            base.selectedApemm.addr2 = '';
            base.selectedApemm.addr3 = '';
            base.selectedApemm.city = '';
            base.selectedApemm.state = '';
            base.selectedApemm.zipcd = '';
         }

      };

      self.customCancel = function () {

         // Get the initial data from the record to redisplay in the address fields before going out of edit mode
         if (base.currentRowID) {
            DataService.get('api/ap/apemm/getbyrowid/' + base.currentRowID, { busy: true }, function (data) {
               if (data) {
                  base.selectedApemm = data;
               }
            });
         } else {
            base.selectedApemm.addr1 = '';
            base.selectedApemm.addr2 = '';
            base.selectedApemm.addr3 = '';
            base.selectedApemm.city = '';
            base.selectedApemm.state = '';
            base.selectedApemm.zipcd = '';
         }

         self.cancel();
      };

   };

});