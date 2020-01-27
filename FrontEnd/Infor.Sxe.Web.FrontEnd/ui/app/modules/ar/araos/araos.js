'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'araos',
      dataPath: 'api/ar/araos',
      searchMethod: 'POST',
      searchPath: 'api/ar/asarsetup/araosfetch',
      searchResultsField: '',
      searchCriteria: { recty: 'S' },
      resultsRowIdField: 'rowidAraos',
      recentlyVisited: {
         title: { label: 'global.type', valueFunction: 'base.formatRecordType' },
         description: [
            { label: '', valueFunction: 'base.formatTypeKeyPrimary' },
            { label: '', valueFunction: 'base.formatTypeKeySecondary' }
         ]
      }
   });
});

app.service('AraosService', function ($state, $translate, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {

      self.VALUE_BLANK = '';
      self.VALUE_ZERO = 0;
      self.LABEL_DELIMITER = ': ';
      self.VALUE_PIPE = ' | ';
      self.PERCENT_SYMBOL = $translate.instant('symbol.percent');
      self.PERIOD_2_SERVICE_CHARGE = $translate.instant('global.period.2.service.charge');

      self.criteria.rectype = 'S';
      self.serviceChargeRateType = 'p';

      // Format function for billing type in recently visited display
      self.formatRecordType = function (araos) {
         var recordType = araos.recty;

         if (recordType) {
            switch (recordType.toLowerCase()) {
               case 's':
                  return $translate.instant('global.state');
               case 'g':
                  return $translate.instant('global.group');
               case 'c':
                  return $translate.instant('global.customer');
               case 'j':
                  return $translate.instant('global.ship.to.job');
               default:
                  return recordType;
            }
         } else {
            return recordType;
         }
      };

      self.formatTypeKeyPrimary = function (araos) {
         var TypeKeyPrimary = araos.state;
         var recordType = araos.recty;

         if (recordType) {
            switch (recordType.toLowerCase()) {
               case 's':
                  return araos.state;
               case 'g':
                  return araos.groupid;
               case 'c':
                  return araos.custno;
               case 'j':
                  return araos.shipto;
               default:
                  return TypeKeyPrimary;
            }
         } else {
            return self.VALUE_BLANK;
         }
      };

      self.formatTypeKeySecondary = function (araos) {
         var recordType = araos.recty;

         if (recordType && recordType === 'j') {
            return $translate.instant('global.customer') + self.LABEL_DELIMITER + araos.custno;
         } else {
            return self.VALUE_BLANK;
         }
      };

      self.formatTypeKeySecondaryLabel = function (araos) {
         var recordType = araos.recty;

         if (recordType && recordType === 'j') {
            return $translate.instant('global.customer');
         } else {
            return self.VALUE_BLANK;
         }
      };

      self.includeColumn = function (recordType) {

         self.includeState = false;
         self.includeCustomer = false;
         self.includeGroup = false;
         self.includeShipTo = false;

         if (recordType) {
            switch (recordType.toLowerCase()) {
               case 's':
                  self.includeState = true;
                  break;
               case 'g':
                  self.includeGroup = true;
                  break;
               case 'c':
                  self.includeCustomer = true;
                  break;
               case 'j':
                  self.includeShipTo = true;
                  self.includeCustomer = true;
                  break;
               default:
                  self.includeState = false;
                  self.includeGroup = false;
                  self.includeCustomer = false;
                  self.includeShipTo = false;
                  break;
            }
         }
      };

      self.getServiceChargeRateType = function (araos) {
         this.serviceChargeRateType = 'p';
         if (araos) {
            if (araos.arscpc21 !== 0.0 || araos.arscpc22 !== 0.0 || araos.arscpc23 !== 0.0 || araos.arscpc24 !== 0.0) {
               this.serviceChargeRateType = 'b';
            }
         }
         return this.serviceChargeRateType;
      };

      self.serviceChargeRateTypeChange = function (newServiceChargeRateType) {
         if (newServiceChargeRateType) {
            self.serviceChargeRateType = newServiceChargeRateType;
         }
      };
   };

   this.extendSearchController = function (self, base, criteria) {

      //base.includeColumn(base.criteria.recty);

      // Reset search criteria
      self.clear = function () {
         // Remove all properties from criteria object
         // Note: We don't want to simply assign a new object because other code has references to the object
         Utils.clearObject(criteria);

         // Re-initialize criteria (for default values and record limit)
         base.initCriteria();

      };


      // Perform search
      self.submit = function () {
         // Go back to master state if not already there
         if (!base.isMaster()) {
            $state.go('araos.master');
         }

         // Load the Column Display values
         base.includeColumn(base.criteria.recty);

         base.search();
      };

   };

   this.extendMasterController = function (self) {

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

         if (currentRow && currentRow.custno > 0 && currentRow.shipto > '') {
            $state.go('aric.detail', { pk: currentRow.custno, pk2: currentRow.shipto });
         }
      };

   };

   this.extendCreateController = function (self, base) {

      self.araos.recty = 's';
      self.araos.state = base.VALUE_BLANK;
      self.araos.groupid = base.VALUE_BLANK;
      self.araos.custno = base.VALUE_ZERO;
      self.araos.shipto = base.VALUE_BLANK;

   };

   this.extendDetailController = function (self, base, araos) {

      araos.$promise.then(function () {
         base.getServiceChargeRateType(self.araos);
      });

      self.getSubTitle = function () {
         var recordType = base.VALUE_BLANK;
         var primaryValue = base.VALUE_BLANK;
         var secondaryValue = base.VALUE_BLANK;
         var subTitle = base.VALUE_BLANK;

         recordType = base.formatRecordType(self.araos);
         primaryValue = base.formatTypeKeyPrimary(self.araos);
         secondaryValue = base.formatTypeKeySecondary(self.araos);
         subTitle = recordType + base.LABEL_DELIMITER + primaryValue;
         if (secondaryValue && secondaryValue !== base.VALUE_BLANK) {
            subTitle = subTitle + base.VALUE_PIPE + secondaryValue;
         }

         return subTitle;
      };

      self.serviceChargeRateTypeChange = function () {
         base.serviceChargeRateTypeChange(this.serviceChargeRateType);

      };

      self.customerInquiryHyperlink = function () {
         // ARIC HyperLink
         if (self.araos && self.araos.custno) {
            $state.go('aric.detail', { pk: self.araos.custno });
         }
      };

      self.shiptoInquiryHyperlink = function () {
         // ARIC HyperLink
         if (self.araos && self.araos.custno > 0 && self.araos.shipto > '') {
            $state.go('aric.detail', { pk: self.araos.custno, pk2: self.araos.shipto });
         }
      };

   };

});

