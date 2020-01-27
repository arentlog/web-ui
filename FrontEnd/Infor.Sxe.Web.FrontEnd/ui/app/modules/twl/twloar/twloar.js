'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twloar',
      dataPath: 'api/twl/drprules',
      searchMethod: 'POST',
      searchPath: 'api/twl/drprules/gettwlautodroprules',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twloar/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      detailSubTitle: [
         { label: 'global.warehouse', value: 'whNum' },
         { label: 'global.rule.code', value: 'ruleCode' }
      ],
      recentlyVisited: {
         title: { label: 'global.rule.code', value: 'ruleCode' },
         description: { label: 'global.warehouse', value: 'whNum' }
      }
   });

   $stateProvider.state('twloar.detail.detail-employee', {
      url: '/employee',
      views: {
         subDetail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twloar/detail-employee.json');
            },
            controller: 'TwloarEmployeeCtrl as empl'
         }
      }
   });

});

app.service('TwloarService', function ($state, DataService, MessageService, ModalService, UserService, Utils) {

   this.extendBaseController = function (self) {
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
      self.refreshSearch = false;
      self.testError = '';

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };

      self.isDetailOrEdit = function () {
         return $state.is('twloar.detail') || $state.is('twloar.detail.edit');
      };

      self.isDetailEmployee = function () {
         return $state.is('twloar.detail.detail-employee');
      };

   };

   this.extendSearchController = function (self, base, criteria) {
      self.clear = function () {
         Utils.clearObject(criteria);

         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;
      };
   };

   this.extendCreateController = function (self, base, twloar) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twloar.coNum = base.criteriaUsed.coNum;
      twloar.whNum = base.criteriaUsed.whNum;

      twloar.active = false;
      twloar.everyWhat = 'HRS';
      twloar.ruleCode = '';
   };

   this.extendDetailController = function (self, base, twloar, scope) {

      twloar.$promise.then(function () {

         self.setEveryDay = function () {
            if (twloar.drpDays8 === true) {
               twloar.drpDays1 = true;
               twloar.drpDays2 = true;
               twloar.drpDays3 = true;
               twloar.drpDays4 = true;
               twloar.drpDays5 = true;
               twloar.drpDays6 = true;
               twloar.drpDays7 = true;
            } else {
               twloar.drpDays1 = false;
               twloar.drpDays2 = false;
               twloar.drpDays3 = false;
               twloar.drpDays4 = false;
               twloar.drpDays5 = false;
               twloar.drpDays6 = false;
               twloar.drpDays7 = false;
            }
         };

         self.dropNowChanged = function () {
            twloar.drpDays8 = twloar.drpNow;
            self.setEveryDay();
         };

         self.saveTempFieldName = function () {
            if (twloar.tempFieldName) {
               if (twloar.criteria) {
                  twloar.criteria = twloar.criteria + ' and ' + twloar.tempFieldName + ' = ';
               } else {
                  twloar.criteria = twloar.tempFieldName + ' = ';
               }
            }
         };

         self.testRule = function (testing) {
            var testRuleCriteria = {
               coNum: twloar.coNum,
               whNum: twloar.whNum,
               ruleCode: twloar.ruleCode,
               criteria: twloar.criteria,
               criteriaList: twloar.criteriaList,
               redoCriteria: twloar.redoCriteria,
               redoList: twloar.redoList,
               undoList: twloar.undoList,
               testOnly: testing
            };

            DataService.post('api/twl/astwlsetup/testautodroprule', { data: testRuleCriteria, busy: true }, function (data) {
               if (data) {
                  base.testFlag = testing;
                  base.testError = data.queryError;
                  base.testResult = data.queryResults;
                  base.testQuery = data.drpQuery;

                  ModalService.showModal('twl/twloar/test-rule-result.json', 'TestRuleResultCtrl as test', scope, function (modal) {
                     base.testRuleModal = modal;
                  });

               }
            });
         };

         self.assignEmployees = function () {
            $state.go('twloar.detail.detail-employee');
         };

      });

      self.getSubTitle = function () {
         var subTitle = MessageService.get('global.warehouse') + ': ';
         subTitle += (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) + ' | ';
         subTitle += MessageService.get('global.rule') + ': ' + twloar.ruleCode;
         return subTitle;
      };

      self.customSubmit = function () {
         DataService.post('api/twl/astwlsetup/validateautodroprule', { data: twloar, busy: true }, function (data) {
            if (data) {

               // Load updated values
               twloar.criteriaList = data.criteriaList;
               twloar.redoCriteria = data.redoCriteria;
               twloar.undoList = data.undoList;

               // Verify that the criteria is good
               self.testRule(false);

            }
         });
      };

      self.finalSubmit = function () {

         twloar.drpQuery = base.testQuery;
         twloar.redoList = twloar.undoList;

         // Save the changes
         self.submit();

      };

   };
});

app.controller('TwloarEmployeeCtrl', function ($scope, $state, DataService) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;
   var twloar = $scope.dtl.twloar;
   var newList = '';

   self.allEmployees = [];
   self.selectEmployees = [];

   self.getEmployeeData = function (employee) {
      // Get the information for that employee
      var params = {
         empNum: employee
      };
      DataService.get('api/twl/empmst/getbypk', { params: params }, function (empmst) {
         if (empmst) {
            self.selectEmployees.push({ number: empmst.empNum, name: empmst.empName });
         }
      });
   };

   if (!twloar) {
      $state.go('^');
   } else {

      // Get the list of all employees not assigned to the auto drop
      var employeeCriteria = {
         coNum: twloar.coNum,
         whNum: twloar.whNum
      };
      DataService.post('api/twl/empmst/gettwlemployees', { data: employeeCriteria, busy: true }, function (data) {
         if (data) {

            // Roll through all employees
            for (var i = 0; i < data.length; i++) {
               var currentEmpmst = data[i];

               // Employee must be active and able to pick orders
               if (currentEmpmst.rfPick && currentEmpmst.rowStatus) {

                  // If the employee has already been selected, do not include
                  if (!twloar.employee) {
                     self.allEmployees.push({ number: currentEmpmst.empNum, name: currentEmpmst.empName });
                  } else {
                     if (twloar.employee.indexOf(currentEmpmst.empNum) === -1) {
                        self.allEmployees.push({ number: currentEmpmst.empNum, name: currentEmpmst.empName });
                     }
                  }
               }
            }
         }
      });

      // Get the list of employees already assigned to the auto drop
      if (twloar.employee) {
         var empArray = twloar.employee.split(",");

         // Roll through the employees on the rule
         for (var i = 0; i < empArray.length; i++) {
            var currentEmployee = empArray[i];
            self.getEmployeeData(currentEmployee);
         }
      }
   }

   self.returnToDetail = function () {
      $state.go('twloar.detail.edit');
   };

   self.swapListChange = function () {
      newList = '';

      for (var i = 0; i < self.selectEmployees.length; i++) {
         if (i === 0) {
            newList = self.selectEmployees[i].number;
         } else {
            newList += ',' + self.selectEmployees[i].number;
         }
      }

   };

   self.submit = function () {
      twloar.employee = newList;

      $state.go('twloar.detail.edit');
   };

});

app.controller('TestRuleResultCtrl', function ($scope, $state) {
   var self = this;
   var base = $scope.base;
   var dtl = $scope.dtl;

   self.submit = function () {
      if (base.testFlag) {
         $state.go('^');
      } else if (base.testError) {
         $state.go('^');
      } else {
         dtl.finalSubmit();
      }
      base.testRuleModal.destroy();
   };

   self.cancel = function () {
      if (base.testFlag) {
         $state.go('^');
      } else if (base.testError) {
         $state.go('^');
      } else {
         dtl.finalSubmit();
      }
      base.testRuleModal.destroy();
   };
});