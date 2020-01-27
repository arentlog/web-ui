'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsb',
      dataPath: 'api/ar/arsb',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/arsbbillinglist',
      searchResultsField: '',
      resultsRowIdField: 'pmsbrowid',
      searchCriteria: { billingtype: 'custno', billingprimarykey: '', billingsecondarykey: '' },
      recentlyVisited: {
         title: { label: 'global.billing.type', valueFunction: 'base.formatBillingType' },
         description: [
            { label: '', value: 'billingprimarykey' },
            { label: 'global.ship.to', value: 'billingsecondarykey' }
         ]
      }
   });
});

app.service('ArsbService', function ($state, $translate, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {

      self.criteria.billingtype = 'custno';
      self.criteria.billingprimarykey = '';
      self.criteria.billingsecondarykey = '';
      self.billingTypeLabel = MessageService.get('global.customer');
      self.billingTypeLabelShipTo = '';

      self.loadBillingType = function () {
         var billingType = self.criteria.billingtype;

         if (billingType) {
            switch (billingType.toLowerCase()) {
               case 'custno':
                  self.billingTypeLabel = MessageService.get('global.customer');
                  self.billingTypeLabelShipTo = '';
                  break;
               case 'shipto':
                  self.billingTypeLabel = MessageService.get('global.customer');
                  self.billingTypeLabelShipTo = MessageService.get('global.ship.to');
                  break;
               case 'carrier':
                  self.billingTypeLabel = MessageService.get('global.carrier');
                  self.billingTypeLabelShipTo = '';
                  break;
               case 'shipvia':
                  self.billingTypeLabel = MessageService.get('global.ship.via');
                  self.billingTypeLabelShipTo = '';
                  break;
               case 'custtype':
                  self.billingTypeLabel = MessageService.get('global.customer.type');
                  self.billingTypeLabelShipTo = '';
                  break;
               case 'whse':
                  self.billingTypeLabel = MessageService.get('global.warehouse');
                  self.billingTypeLabelShipTo = '';
                  break;
            }
         };
      };

      // Format function for billing type in recently visited display
      self.formatBillingType = function (arsb) {
         var billingType = arsb.billingtype;

         if (billingType) {
            switch (billingType.toLowerCase()) {
               case 'custno':
                  return $translate.instant('global.customer');
               case 'shipto':
                  return $translate.instant('global.ship.to');
               case 'carrier':
                  return $translate.instant('global.carrier');
               case 'shipvia':
                  return $translate.instant('global.ship.via');
               case 'custtype':
                  return $translate.instant('global.customer.type');
               case 'whse':
                  return $translate.instant('global.warehouse');
               default:
                  return billingType;
            }
         } else {
            return billingType;
         }
      };

   };

   this.extendCreateController = function (self, base, arsb, scope) {

      self.arsb.billingtype = 'custno';
      self.arsb.billingprimarykey = '';
      self.arsb.billingsecondarykey = '';

      // If the Billing Type changes - reset the billing type data - keep the billing type as is
      self.setResetBillingDefaults = function () {

         if (self.arsb.billingtype) {
            self.arsb.billingprimarykey = '';
            self.arsb.billingsecondarykey = '';
         }
      };
   };

   this.extendDetailController = function (self, base, arsb, scope) {

      // Detail Level - Sub Title Based on Billing Type
      self.getSubTitle = function () {

         var subTitleText;

         if (self.arsb.billingtype != null) {

            switch (self.arsb.billingtype.toLowerCase()) {
               case "custno":
                  subTitleText = MessageService.get('global.customer') + ': ' +
                                 self.arsb.billingprimarykey;
                  break;
               case "shipto":
                  subTitleText = MessageService.get('global.customer') + ': ' +
                                 self.arsb.billingprimarykey + ' | ' +
                                 MessageService.get('global.ship.to') + ': ' +
                                 self.arsb.billingsecondarykey;
                  break;
               case "carrier":
                  subTitleText = MessageService.get('global.carrier') + ': ' +
                                 self.arsb.billingprimarykey;
                  break;
               case "shipvia":
                  subTitleText = MessageService.get('global.ship.via') + ': ' +
                                 self.arsb.billingprimarykey;
                  break;
               case "custtype":
                  subTitleText = MessageService.get('global.customer.type') + ': ' +
                                 self.arsb.billingprimarykey;
                  break;
               case "whse":
                  subTitleText = MessageService.get('global.warehouse') + ': ' +
                                 self.arsb.billingprimarykey;
                  break;
            }
         }
         return subTitleText;
      };

   };

   this.extendSearchController = function (self, base, criteria, scope) {

      // If the Billing Type changes - reset the billing type data - keep the billing type as is
      base.setResetBillingDefaults = function () {

         if (base.criteria.billingtype) {
            base.criteria.billingprimarykey = '';
            base.criteria.billingsecondarykey = '';
         }
      };

      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go(menuFn + '.master');
         }

         // Load the Colum Label
         base.loadBillingType();

         base.search();
      };

   };

});

