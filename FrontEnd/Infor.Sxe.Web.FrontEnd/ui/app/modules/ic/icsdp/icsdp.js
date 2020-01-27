'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsdp',
      dataPath: 'api/ic/icsdp',
      searchMethod: 'POST',
      searchPath: 'api/ic/asicsetup/icsdploadtt',
      searchResultsField: 'icsdploadttresults',
      resultsRowIdField: 'icsdprowid',
      searchCriteria: { cWhse: '', iMediaCd: 0, iRecordLimit: 0 },
      recentlyVisited: {
      title: { label: 'global.warehouse', value: 'whse' },
      description: [
         { label: 'global.payment.type', value: 'mediacd' }
      ]
   }
   });
});

app.service('IcsdpService', function (DataService, MessageService, UserService, Utils, UtilsData, ConfigService) {

   this.extendSearchController = function (self, base) {

      var recLimit = ConfigService.getLookupMaxResults();
      if (base.criteria) {
         base.criteria.iRecordLimit = recLimit;
      }
   };

   this.extendDetailController = function (self, base, icsdp, scope) {
      self.merchantpswrd = '';
      self.banknoDropDownOptions = [];
      
      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + self.icsdp.whse + ' | ' +
            MessageService.get('global.payment.type') + ': ' + self.icsdp.mediacd;
      };
   };

   this.extendCreateController = function (self, base, icsdp, scope) {
      self.merchantpswrd = '';
      self.banknoDropDownOptions = [];

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });
   };

   this.createRecord = function (self, base, icsdp, scope, callback) {

      // Without this first - the SI call is run first and the update of the password is lost on a SaveChange
      DataService.post('api/ic/icsdp', { data: icsdp }, function (data) {

         if (scope.dtl.merchantpswrd && scope.dtl.merchantpswrd !== '') {

            var criteria = { cWhse: icsdp.whse, iMediaCd: icsdp.mediacd, cMerchantPassword: scope.dtl.merchantpswrd };

            DataService.post('api/ic/asicsetup/icsdpsavepw', { data: criteria, busy: true }, function () {
               callback(data);
            });
         } else {
            callback(data);
         }
      });
   }

   this.updateRecord = function (self, base, icsdp, scope, callback) {

      // Without this first - the SI call is run first and the update of the password is lost on a SaveChange
      DataService.put('api/ic/icsdp', { data: icsdp }, function () {

         if (scope.dtl.merchantpswrd && scope.dtl.merchantpswrd !== '') {

            var criteria = { cWhse: icsdp.whse, iMediaCd: icsdp.mediacd, cMerchantPassword: scope.dtl.merchantpswrd };

            DataService.post('api/ic/asicsetup/icsdpsavepw', { data: criteria, busy: true }, function () {
               callback();
            });
         } else {
            callback();
         }
      });
   }

});
