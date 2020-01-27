'use strict';

/* TWL Control for assigning employees to a batch/wave.
   Used in twlom and twloe
*/

app.controller('TwlWaveEmployeesCtrl', function ($filter, $scope, $state, $stateParams, $timeout, DataService, GridService, MessageService) {
   //dtlwemp
   var self = this;
   var base = $scope.base;
   self.criteria = $stateParams.criteria;
   self.fullEmployeeDataset = [];
   self.availableEmployees = [];
   self.selectedEmployees = [];
   self.employeeList = '';
   self.function = $stateParams.function;

   DataService.post('api/twl/astwladmin/getwavepickemployees', { data: self.criteria, busy: true }, function (data) {
      if (data) {
         self.fullEmployeeDataset = data;
         self.fullEmployeeDataset.forEach(function (record) {
            self.availableEmployees.push({ value: record.empNum, label: record.name ? (record.name + ' (' + record.empNum + ')') : record.empNum });
            if (record.selected) {
               self.employeeList = self.employeeList ? (self.employeeList + ',' + record.empNum) : record.empNum;
            }
         });
         self.selectedEmployees = self.employeeList.split(',');
      }
      $timeout(function () {
         self.availableEmployees = $filter('orderBy')(self.availableEmployees, 'label');
      });
   });

   self.back = function () {
      if (self.function === 'twlom2') {
         $state.go('twlom.master.review-drop');
      } else if (self.function === 'twlom') {
         $state.go('twlom.master');
      } else {
         $state.go('^', { refreshSearch: true });
      }
   };


   self.submit = function () {
      self.fullEmployeeDataset.forEach(function (record) {
         var found = $filter('filter')(self.selectedEmployees, record.empNum, true);
         if (found && found.length > 0) {
            record.selected = true;
         } else {
            record.selected = false;
         }
      });
      DataService.post('api/twl/astwladmin/setwavepickemployees', { data: { wavepickemployeecriteria: self.criteria, wavepickemployees: self.fullEmployeeDataset }, busy: true }, function () {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.back();
      });
   };

});