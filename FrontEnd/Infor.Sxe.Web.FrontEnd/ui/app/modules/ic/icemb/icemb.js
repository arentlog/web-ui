'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ic', 'icemb', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ic', 'icemb');
});

app.controller('IcembBaseCtrl', function ($state, DataService, SecurityService, Utils, Sasoo) {
   var self = this;
   self.securityLevel = SecurityService.getSecurityLevel('icemb');
   self.criteria = {};

   self.criteria = {
      product: '',
      whse: Sasoo.whse,
      fieldchanged: '',
      security: self.securityLevel
   };

   self.updaterecord = {
      product: self.criteria.product,
      whse: self.criteria.whse,
      fieldchanged: self.criteria.cFieldName,
      changeby: 'n',
      changeamtdate: '',
      changeamtdec: 0,
      newvalue: 0,
      oldvalue: 0,
      reason: '',
      security: 0
   };

   self.changeFieldOptions = [];
   self.firstChangeFieldOption;
   self.decimalValue = 0;
   self.decimalVisible = false;
   self.dateValue = '';
   self.dateVisible = false;
   self.searchLaunched = false;
   self.allowUpdate = false;

   self.isDecimalVisible = function () {
      return self.decimalVisible;
   };
   self.isDateVisible = function () {
      return self.dateVisible;
   };

   self.setVisibility = function () {

      switch (self.criteria.fieldchanged) {
      case 'Replacement Cost Date':
      case 'Standard Cost Date':
      case 'Last 852 Out Date':
      case 'Last Invoice Date':
      case 'Last Receipt Date':
      case 'Last PO or WT Date':
      case 'Last Price Date':
      case 'Last Count Date':
         self.decimalVisible = false;
         self.dateVisible = true;
         self.updaterecord.oldvalue = '';
         self.updaterecord.newvalue = '';
         break;
      default:
         self.decimalVisible = true;
         self.dateVisible = false;
         self.updaterecord.oldvalue = '0';
         self.updaterecord.newvalue = '0';
         break;
      }
   };

   self.isMaster = function () {
      return $state.is('icemb.master');
   };

   self.includesMaster = function () {
      return $state.includes('icemb.master');
   };

   self.isDetail = function () {
      return $state.is('icemb.detail');
   };

   self.includesDetail = function () {
      return $state.includes('icemb.detail');
   };

   self.populateFieldChangeList = function () {
      DataService.get('api/ic/asicentry/icembfieldchange', { busy: true }, function (data) {
         var fldList = [];
         var fldListBuilt = [];
         var firstChoice = true;
         fldList = data.cFieldchange.trim().split(',');
         var fldListLen = fldList.length;
         for (var i = 0; i < fldListLen; i++) {
            if (fldList[i]) {
               var obj = {
                  label: fldList[i],
                  type: 'OPT',
                  value: fldList[i]
               };
               fldListBuilt.push(obj);
               if (firstChoice) {
                  firstChoice = false;
                  self.criteria.fieldchanged = fldList[i];
                  self.firstChangeFieldOption = fldList[i];
               }
            }
         }
         self.changeFieldOptions = fldListBuilt;
         self.setVisibility();
      });
   };

   self.productChanged = function () {
       self.searchLaunched = false;
       if (self.criteria.product && self.criteria.whse) {
           self.search();
       }
   };

   self.warehouseChanged = function () {
       self.searchLaunched = false;
       if (self.criteria.product && self.criteria.whse) {
           self.search();
       }
   };

   self.changeFieldChanged = function () {
      self.searchLaunched = false;
      if (self.criteria.product && self.criteria.whse) {
         self.search();
      }
      else {
         self.setVisibility();
      }
   };

   self.changeNewValue = function () {
      self.loadOldNewValues(true);
   };

   self.changeByValueModified = function () {
      self.loadOldNewValues(true);
   };

   self.updateButtonDisabled = function () {
      var dis = false;
      if (!self.searchLaunched) {
         dis = true;
      } else {
         if (!self.allowUpdate) {
            dis = true;
         } else {
            dis = self.grid.isOneRowSelected();
         }
      }
      return dis;
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.setVisibility();

      // Clear out selection fields in case user entered data without doing the proper search operation first.
      self.decimalValue = '0.00';
      self.dateValue =  Utils.getCurrentDate();
      self.allowUpdate = false;

      self.criteria.security = self.securityLevel;
      // No sense in doing the search of the product and whse is not entered
      if (self.criteria.product && self.criteria.whse) {

         DataService.post('api/ic/asicentry/icembsearch', { data: self.criteria, busy: true }, function (data) {
            self.dataset = data.icembresults;
            self.searchLaunched = true;
            self.setUpdateButtonEnabled();
         });
      }
   };

   self.setUpdateButtonEnabled = function () {

      var fieldCriteria = {
         product: self.criteria.product,
         whse: self.criteria.whse,
         fieldchanged: self.criteria.fieldchanged
      };

      DataService.post('api/ic/asicentry/icembfield', { data: fieldCriteria, busy: true }, function (data) {
         var sensitiveFlag = data.pvSensitivefl;
         if (sensitiveFlag) {
            self.allowUpdate = true;
         } else {
            self.allowUpdate = false;
         }
         self.loadOldNewValues(false);
      });
   };

   self.loadOldNewValues = function (sendChangeBy) {

      var valueChange = {
         product: self.criteria.product,
         whse: self.criteria.whse,
         fieldchanged: self.criteria.fieldchanged,
         changeby: '',
         changeamtdate: '',
         changeamtdec: 0,
         security: self.criteria.security
      };

      if (sendChangeBy) {
         valueChange.changeby = self.updaterecord.changeby;
      }

      var chgValue = '';
      if (self.isDecimalVisible()) {
         chgValue = self.decimalValue;
         valueChange.changeamtdec = chgValue;
      } else {
         chgValue = self.dateValue;
         valueChange.changeamtdate = chgValue;
      }

      DataService.post('api/ic/asicentry/icembvalue', { data: valueChange, busy: true }, function (data) {
         self.updaterecord.newvalue = data.cNewValue;
         self.updaterecord.oldvalue = data.cOldValue;
      });
   };
});

app.controller('IcembSearchCtrl', function ($scope, $state, DataService, Utils, Sasoo) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // populate the Change Field drop down control
   base.populateFieldChangeList();

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      base.criteria.product = '';
      base.criteria.whse = Sasoo.whse;
      base.criteria.fieldchanged = base.firstChangeFieldOption;
      base.setVisibility();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('icemb.master');
      }

      base.search();
   };
});

app.controller('IcembMasterCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.update = function () {

      var chgValue = '';
      if (base.isDecimalVisible()) {
         chgValue = base.decimalValue;
         base.updaterecord.changeamtdec = chgValue;
      } else {
         chgValue = base.dateValue;
         base.updaterecord.changeamtdate = chgValue;
      }

      base.updaterecord.product = base.criteria.product;
      base.updaterecord.whse = base.criteria.whse;
      base.updaterecord.fieldchanged = base.criteria.fieldchanged;
      base.updaterecord.security = base.criteria.security;

      DataService.post('api/ic/asicentry/icembupdate', { data: base.updaterecord, busy: true }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.updaterecord.changeamtdec = '0.00';
         base.decimalValue = '0.00';
         base.dateValue = '';
         base.updaterecord.reason = '';
         base.search();
      });
   };

   self.cancel = function () {
      base.dateValue = '';
      base.decimalValue = 0;
      base.updaterecord.reason = '';
   };
});