'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ar', 'aremb', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ar', 'aremb');
});

app.controller('ArembBaseCtrl', function ($state, DataService, OptionSetService) {
   var self = this;
   self.criteria = {};

   self.criteria = {
      dCustno: 0,
      cShipTo: '',
      cFieldName: 'Total Period 1'
   };

   self.updaterecord = {
      custno: self.criteria.dcustno,
      shipto: self.criteria.cShipTo,
      changefield: self.criteria.cFieldName,
      changetype: 'c',
      newvalue: 0,
      oldvalue: 0
   };
   self.decimalValue = 0.00;
   self.searchLaunched = false;

   /* Change Field drop down - will have values from 2 different set of choices.
     One based on whether the customer # is entered and no ship to and the other set of choices
     if the customer # is entered and a ship to is entered.
    */
   self.changeFieldOptions;

   OptionSetService.get('ar', 'ChangeFieldType', function (optSet) {
      self.customerChangeFieldOptions = optSet.children;
      self.changeFieldOptions = self.customerChangeFieldOptions;
   });

   OptionSetService.get('ar', 'ShipToChangeFieldType', function (optSet) {
      self.shiptoChangeFieldOptions = optSet.children;
   });

   self.isMaster = function () {
      return $state.is('aremb.master');
   };

   self.includesMaster = function () {
      return $state.includes('aremb.master');
   };

   self.isDetail = function () {
      return $state.is('aremb.detail');
   };

   self.includesDetail = function () {
      return $state.includes('aremb.detail');
   };

   self.updateButtonDisabled = function () {
      var dis = false;
      if (!self.searchLaunched) {
         dis = true;
      } else {
         dis = self.grid.isOneRowSelected();
      }
      return dis;
   };

   // Perform search and update data set for the grid
   self.search = function () {
      // Make sure the ShipTo is not null (SI call does not deal with this).
      if (!self.criteria.cShipTo) {
         self.criteria.cShipTo = '';
      }

      // Clear out selection fields in case user entered data without doing the proper search operation first.
      self.decimalValue = '0.00';
      DataService.post('api/ar/asarentry/arembretrieve', { data: self.criteria, busy: true }, function (data) {
         var records = [];
         var recCount = -1;
         if (data !== null) {
            // Iterate through the returned array (backwards) to present the records in descending date sequence.
            if (data.length >= 1) {
               for (var i = data.length - 1; i >= 0; i--) {
                  var obj = data[i];
                  if (obj !== null) {
                     // strip off the first records (ttblapembsingle.appliedfl  = no)
                     if (obj.appliedfl) {
                        recCount++;
                        records[recCount] = obj;
                     } else {
                        self.searchLaunched = true;
                        self.updaterecord.newvalue = obj.newvalue;
                        self.updaterecord.oldvalue = obj.oldvalue;
                     }
                  }
               }
            }
         }
         self.dataset = records;
      });
   };

   self.customerNumberChanged = function () {
      self.searchLaunched = false;
   };

   self.shipToChanged = function () {
      self.searchLaunched = false;
      if (self.criteria.cShipTo) {
         self.criteria.cFieldName = 'Ship To Period 1';
         self.changeFieldOptions = self.shiptoChangeFieldOptions;
      } else {
         self.criteria.cFieldName = 'Total Period 1';
         self.changeFieldOptions = self.customerChangeFieldOptions;
      }
   };

   self.changeFieldChanged = function () {
      self.searchLaunched = false;

      if (self.criteria.cCustno > 0) {
         self.search();
      }
   };

   self.changeNewValue = function () {
      self.launchApembApply();
   };

   self.changeByValueModified = function () {
      self.launchApembApply();
   };

   self.launchApembApply = function () {

      // Make sure the ShipTo is not null (SI call does not deal with this).
      if (!self.criteria.cShipTo) {
         self.criteria.cShipTo = '';
      }

      var chgValue = self.decimalValue;

      if (self.criteria.dCustno > 0 && chgValue && chgValue !== '0.00') {
         self.updaterecord.changevalue = chgValue;
         self.updaterecord.custno = self.criteria.dCustno;
         self.updaterecord.shipto = self.criteria.cShipTo;
         self.updaterecord.changefield = self.criteria.cFieldName;

         DataService.post('api/ar/asarentry/arembapply', { data: self.updaterecord, busy: true }, function (data) {
            self.updaterecord.newvalue = data.newvalue;
            self.updaterecord.oldvalue = data.oldvalue;
         });
      }
   };
});

app.controller('ArembSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.dCustno = 0;
      criteria.cShipTo = '';
      base.changeFieldOptions = base.customerChangeFieldOptions;
      base.searchLaunched = false;
      criteria.cFieldName = 'Total Period 1';
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('aremb.master');
      }

      base.search();
   };
});

app.controller('ArembMasterCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.update = function () {

      var chgValue = base.decimalValue;

      // Make sure the ShipTo is not null (SI call does not deal with this).
      if (!base.criteria.cShipTo) {
         base.criteria.cShipTo = '';
      }

      base.updaterecord.changevalue = chgValue;
      base.updaterecord.custno = base.criteria.dCustno;
      base.updaterecord.shipto = base.criteria.cShipTo;
      base.updaterecord.changefield = base.criteria.cFieldName;

      DataService.post('api/ar/asarentry/arembupdate', { data: base.updaterecord, busy: true }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.updaterecord.changevalue = '0.00';
         base.decimalValue = '0.00';
         base.updaterecord.reason = '';
         base.search();
      });
   };
   self.cancel = function () {
      base.dateValue = '';
      base.decimalValue = 0;
      base.integerValue = 0;
      base.updaterecord.reason = '';
   };
});