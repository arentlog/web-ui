'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('ap', 'apemb', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('ap', 'apemb');
});

app.controller('ApembBaseCtrl', function ($state, DataService) {
   var self = this;

   // This allows for a deafult search
   self.criteria = {
      dVendno: 0,
      cFieldName: 'Current Balance'
   };

   self.updaterecord = {
      vendno: self.criteria.dVendno,
      changefield: self.criteria.cFieldName,
      changetype: 'c',
      newvalue: 0,
      oldvalue: 0
   };

   self.decimalValue = 0;
   self.decimalVisible = false;
   self.integerValue = 0;
   self.integerVisible = false;
   self.dateValue = '';
   self.dateVisible = false;
   self.searchLaunched = false;

   self.isDecimalVisible = function () {
      return self.decimalVisible;
   };
   self.isIntegerVisible = function () {
      return self.integerVisible;
   };
   self.isDateVisible = function () {
      return self.dateVisible;
   };

   self.setVisibility = function () {

      switch (self.criteria.cFieldName) {
      case 'Last Inv Date':
      case 'Last PO Date':
      case 'Last Pay Date':
         self.decimalVisible = false;
         self.integerVisible = false;
         self.dateVisible = true;
         break;
      case "# of PO's YTD":
      case "# of PO's Late":
         self.decimalVisible = false;
         self.integerVisible = true;
         self.dateVisible = false;
         break;
      default:
         self.decimalVisible = true;
         self.integerVisible = false;
         self.dateVisible = false;
         break;
      }
   };

   self.isMaster = function () {
      return $state.is('apemb.master');
   };

   self.includesMaster = function () {
      return $state.includes('apemb.master');
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
      self.setVisibility();

      // Clear out selection fields in case user entered data without doing the proper search operation first.
      self.decimalValue = '0.00';
      self.integerValue = '0';
      self.dateValue = '';
      DataService.post('api/ap/asapentry/apembretrieve', { data: self.criteria, busy: true }, function (data) {

         var records = [];
         var recCount = -1;
         if (data !== null)
         {
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

   self.vendorNumberChanged = function () {
      self.searchLaunched = false;
   };

   self.changeFieldChanged = function () {
      self.searchLaunched = false;
      if (self.criteria.dVendno > 0) {
         self.search();
      }
      else {
         self.setVisibility();
      }
   };

   self.changeNewValue = function () {
      self.launchApembApply();
   };

   self.changeByValueModified = function () {
      self.launchApembApply();
   };

   self.launchApembApply = function () {

      var chgValue = '';
      if (self.isDecimalVisible()) {
         chgValue = self.decimalValue;
      } else if (self.isIntegerVisible()) {
         chgValue = self.integerValue;
      } else {
         chgValue = self.dateValue;
      }

      if (self.criteria.dVendno > 0 && chgValue && chgValue !== '0.00') {
         self.updaterecord.changevalue = chgValue;
         self.updaterecord.vendno = self.criteria.dVendno;
         self.updaterecord.changefield = self.criteria.cFieldName;

         DataService.post('api/ap/asapentry/apembapply', { data: self.updaterecord, busy: true }, function (data) {
            self.updaterecord.newvalue = data.newvalue;
            self.updaterecord.oldvalue = data.oldvalue;
         });
      }
   };
});

app.controller('ApembSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   $scope.base.newvalue = 0;
   $scope.base.oldvalue = 0;

   criteria.dVendno = 0;
   criteria.cFieldName = 'Current Balance';
   base.setVisibility();

   // Clear form
   self.clear = function () {
      Utils.clearObject(criteria);
      criteria.dVendno = 0;
      criteria.cFieldName = 'Current Balance';
      base.setVisibility();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go('apemb.master');
      }

      base.search();
   };
});

app.controller('ApembMasterCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }

   self.isRecordSelected = function () {
      // no logic in selecting a record.  The users can't change it and no reason to show
      // the current data since they can see the Reason code in the grid.
   };

   self.update = function () {

      var chgValue = '';
      if (base.isDecimalVisible()) {
         chgValue = base.decimalValue;
      } else if (base.isIntegerVisible()) {
         chgValue = base.integerValue;
      } else {
         chgValue = base.dateValue;
      }

      base.updaterecord.changevalue = chgValue;
      base.updaterecord.vendno = base.criteria.dVendno;
      base.updaterecord.changefield = base.criteria.cFieldName;

      DataService.post('api/ap/asapentry/apembupdate', { data: base.updaterecord, busy: true }, function (data) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         base.updaterecord.changevalue = '0.00';
         base.decimalValue = '0.00';
         base.integerValue = '0';
         base.dateValue = '';
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