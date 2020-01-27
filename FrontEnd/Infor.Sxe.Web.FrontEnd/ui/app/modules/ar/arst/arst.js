'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arst',
      recordName: 'arstcreateupdate',
      dataPath: 'api/ar/arst',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arstgetlist',
      resultsRowIdField: 'arstrowpointer',
      recordRowIdField: 'arstrowpointer',
      recentlyVisited: {
         title: { label: 'global.customer', value: 'custno' },
         description: [{ label: 'global.ship.to.group', value: 'shiptogrp' }]
      }
   });
});

app.service('ArstService', function ($state, DataService, MessageService) {

   this.getRecord = function (self, base, stateParams, scope) {

      // Load the arstcreateupdate table off selected Grid Record
      var path = 'api/ar/asarsetup/arstload/' + stateParams.id;

      return DataService.getResource(path, { busy: true });

   };

   this.updateRecord = function (self, base, arstcreateupdate, scope, callback) {

      var arstUpdateList = {
         createfl: false,
         custno: self.arstcreateupdate.custno,
         shiptogrp: self.arstcreateupdate.shiptogrp,
         grpname: self.arstcreateupdate.grpname,
         arstrowid: self.arstcreateupdate.arstrowid,
         user1: self.arstcreateupdate.user1,
         user2: self.arstcreateupdate.user2,
         user3: self.arstcreateupdate.user3,
         user4: self.arstcreateupdate.user4,
         user5: self.arstcreateupdate.user5,
         user6: parseFloat(self.arstcreateupdate.user6),
         user7: parseFloat(self.arstcreateupdate.user7),
         user8: new Date(self.arstcreateupdate.user8),
         user9: new Date(self.arstcreateupdate.user9)
      };

      DataService.post('api/ar/asarsetup/arstcreateupdate', { data: arstUpdateList, busy: true }, function (data) {
         if (data) {
            callback(data);
         }
      });

   };


   this.createRecord = function (self, base, arstcreateupdate, scope, callback) {

      var arstCreateUpdate = {
         createfl: true,
         custno: self.arstcreateupdate.custno,
         shiptogrp: self.arstcreateupdate.shiptogrp,
         grpname: self.arstcreateupdate.grpname,
         user1: self.arstcreateupdate.user1,
         user2: self.arstcreateupdate.user2,
         user3: self.arstcreateupdate.user3,
         user4: self.arstcreateupdate.user4,
         user5: self.arstcreateupdate.user5,
         user6: parseFloat(self.arstcreateupdate.user6),
         user7: parseFloat(self.arstcreateupdate.user7),
         user8: new Date(self.arstcreateupdate.user8),
         user9: new Date(self.arstcreateupdate.user9)
      };

      DataService.post('api/ar/asarsetup/arstcreateupdate', { data: arstCreateUpdate, busy: true }, function (data) {
         if (data) {
            callback(data);
         }
      });

   };


   this.deleteMultiple = function (self, base, records, scope, callback) {

      var arstDelete = [];

      // Process one Row at a Time
      records.forEach(function (record) {
         arstDelete.push(record);
      });

      DataService.post('api/ar/asarsetup/arstdelete', { data: arstDelete, busy: true }, function (data) {
         if (data) {
            if (!MessageService.processMessaging(data.messaging)) {
               //No Error
               callback(data);
            }
         }
      });

   };

   this.extendMasterController = function (self, base, scope) {

      self.customerInquiryHyperlink = function (e, args) {
         var currentRow = args[0].item;

         // ARIC HyperLink
         if (currentRow && currentRow.custno > 0) {
            $state.go('aric.detail', { pk: currentRow.custno });
         }
      };

   };


   this.extendDetailController = function (self, base, arstcreateupdate, scope) {

      // Detail Level - Sub Title
      self.getSubTitle = function () {

         var subTitleText;

         subTitleText = MessageService.get('global.customer.number') + ': ' + self.arstcreateupdate.custno + ' | ' +
                        MessageService.get('global.ship.to.group') + ': ' + self.arstcreateupdate.shiptogrp;

         return subTitleText;
      };
      self.customDelete = function () {
         var arstDelete = [];
         arstDelete.push(self.arstcreateupdate);
         var message = 'question.are.you.sure.you.want.to.delete';

         MessageService.okCancel('global.delete.confirmation', message, function () {
            var deleteCallback = function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');

               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('^.master', null, { reload: '^.master' });
            };
            // Perform custom delete
            DataService.post('api/ar/asarsetup/arstdelete', { data: arstDelete, busy: true }, deleteCallback);
         });
      };
   };
});
