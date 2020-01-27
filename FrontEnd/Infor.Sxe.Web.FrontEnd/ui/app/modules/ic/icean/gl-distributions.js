'use strict';

app.config(function ($stateProvider) {
   $stateProvider.state('icean.adjustWriteOff.gldistributions.detail', {
      url: '/detail',
      params: {
         iceanMaintRetrieveSingle: null,
         iceanTransactionsResult: null,
         proof: null,
         glModelList: null,
         glModel: null,
         detailOkCallback: null,
         detailCancelCallback: null
      },
      views: {
         glDistributionDetailView: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('ic/icean/gl-distribution-detail.json');
            },
            controller: 'IceanGLDistributionDetailCtrl as glda'
         }
      }
   });
});

app.controller('IceanGLDistributionCtrl', function ($scope, $state, $stateParams, DataService, Utils, MessageService, GridService) {
   var self = this;

   self.proof = 0;
   self.isReadonly = true;
   self.isAccountAuthorized = null;
   self.isManualPostAuthorized = null;
   self.iceanMaintUpdateGlAcctsesList = [];
   self.glModelList = [];

   self.iceanMaintRetrieveSingle = $stateParams.iceanMaintRetrieveSingle;
   self.iceanTransactionsResult = $stateParams.iceanTransactionsResult;
   self.journalNumber = $stateParams.journalNumber;
   self.icenhRowid = $stateParams.icenhRowid;

   self.isglDistribution = function () {
      return $state.is('icean.adjustWriteOff.gldistributions');
   };

   var criteria = { jrnlno: self.journalNumber, icenhRowid: self.icenhRowid };
   DataService.post('api/ic/asicentry/iceangetdefaultoffsetaccount', { data: criteria, busy: true }, function (data) {
      if (data.messaging !== null && data.messaging.length !== 0) {
         MessageService.processMessaging(data.messaging);
      } else if (data.iceandfltoffsetacctresults.length) {
         var camount = self.iceanMaintRetrieveSingle.total < 0 ? self.iceanMaintRetrieveSingle.total * -1 : self.iceanMaintRetrieveSingle.total;
         self.glModelList = [];
         data.iceandfltoffsetacctresults.forEach(function (record) {
            self.glModelList.push({ rowId: Utils.getTransientId(), accountType: ' ', accountNumber: record.glaccount, amount: camount, accountName: record.lookupnm });
         });
      }
   });

   self.calculateProof = function () {
      if (self.iceanMaintRetrieveSingle !== null) {
         self.proof = 0;
         if (self.glModelList.length) {
            var amountSum = Number(0);
            self.glModelList.forEach(function (model) {
               amountSum = Number(amountSum) + Number(model.amount);
            });
            self.proof = (Math.abs(self.iceanMaintRetrieveSingle.total) - amountSum);
         } else {
            self.proof = self.iceanMaintRetrieveSingle.total;
         }
      }
   };

   self.create = function () {
      var newModel = { rowId: Utils.getTransientId(), accountType: ' ', accountNumber: '', amount: 0, accountName: '' };

      $state.go('.detail', {
         iceanMaintRetrieveSingle: self.iceanMaintRetrieveSingle,
         iceanTransactionsResult: self.iceanTransactionsResult,
         proof: self.proof,
         glModelList: self.glModelList,
         glModel: newModel,
         detailOkCallback: 'glDistributionDetailCallback',
         detailCancelCallback: 'glDistributionDetailCallback'
      });
   };

   self.edit = function () {
      var selectedRecord = GridService.getSelectedRecord(self.grid);

      $state.go('.detail', {
         iceanMaintRetrieveSingle: self.iceanMaintRetrieveSingle,
         iceanTransactionsResult: self.iceanTransactionsResult,
         proof: self.proof,
         glModelList: self.glModelList,
         glModel: selectedRecord,
         detailOkCallback: 'glDistributionDetailCallback',
         detailCancelCallback: 'glDistributionDetailCallback'
      });
   };

   self.deleteRecord = function () {
      var selectedRecord = GridService.getSelectedRecord(self.grid);
      if (self.glModelList !== null && self.glModelList.length) {
         var index = self.glModelList.indexOf(selectedRecord);
         self.glModelList.splice(index, 1);
         self.calculateProof();
      }
   };

   self.glDistributionDetailCallback = function (data) {
      self.glModelList = data.glModelList;
      self.proof = data.proof;
      self.isAccountAuthorized = data.isAccountAuthorized;
      self.isManualPostAuthorized = data.isManualPostAuthorized;
      self.grid.loadData(self.glModelList);
      self.grid.renderRows();
      $state.go('^');
   };

   self.cancel = function (showUpdate) {
      var callbackFn = $scope.awc[$stateParams.cancelCallback];
      callbackFn(showUpdate);
   };

   self.update = function () {
      if (self.proof === 0) {
         if ((self.isAccountAuthorized === true && self.isManualPostAuthorized === true) || (self.isAccountAuthorized === null && self.isManualPostAuthorized === null)) {
               // If the user does not get/have the proper authorization then cancel the transaction

               self.iceanMaintUpdateGlAcctsesList = [];
               var seqNo = 1;
               if (self.glModelList && self.glModelList.length) {
                  self.glModelList.forEach(function (updateModel) {
                     self.iceanMaintUpdateGlAcctsesList.push({ amount: updateModel.amount, glaccount: updateModel.accountNumber, seqno: seqNo });
                     seqNo++;
                  });
               }
               var callbackFn = $scope.awc[$stateParams.okCallback];
               callbackFn(self.iceanMaintUpdateGlAcctsesList);
            } else {
               self.cancel(true);
         }
      } else {
         MessageService.error('global.error', 'error.proof.amount.must.be.zero.to.finish.5357');
      }
   };
});

app.controller('IceanGLDistributionDetailCtrl', function ($scope, $stateParams, DataService, MessageService, AuthService) {
   var self = this;

   self.isPercentToAmount = true;
   self.isAccountAuthorized = null;
   self.isManualPostAuthorized = null;

   self.iceanMaintRetrieveSingle = $stateParams.iceanMaintRetrieveSingle;
   self.iceanTransactionsResult = $stateParams.iceanTransactionsResult;
   self.proof = $stateParams.proof;
   self.glModelList = $stateParams.glModelList;
   self.glModel = $stateParams.glModel;
   self.btnConvertPecentTitle = MessageService.get('global.convert.percent.to.amount');

   self.checkForAuth = function (isSaving) {
      var authCriteria = {
         option1Account: self.glModel.accountNumber
      };
      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: authCriteria, busy: true }, function (data) {
         if (data) {
            // User is not authorized for the account passed in
            if (!data.userhassecurity && self.isAccountAuthorized === false || self.isAccountAuthorized === null) {
               self.isAccountAuthorized = false;
               AuthService.createAuthPoint('gleta', '', 'account', '', '', null,
                  function () {
                     self.isAccountAuthorized = true;
                     if (!data.manpostfl && self.isManualPostAuthorized === false || self.isManualPostAuthorized === null) {
                        self.isManualPostAuthorized = false;
                        AuthService.createAuthPoint('gleta', '', 'manpostfl', '', '', null,
                           function () {
                              self.isManualPostAuthorized = true;
                              if (self.isAccountAuthorized === null) {
                                 self.isAccountAuthorized = true;
                                 if (isSaving) {
                                    self.save();
                                 }
                              }
                           }, null);
                     }
                     if (self.isManualPostAuthorized === null || self.isManualPostAuthorized === true) {
                        self.isManualPostAuthorized = true;
                        if (isSaving) {
                           self.save();
                        }
                     }
                  }, null);
            }
            // The account does not allow for manual posting
            if (data.userhassecurity && data.manpostfl) {
               self.isAccountAuthorized = true;
               self.isManualPostAuthorized = true;
            }
         }
      });
   };

   if (self.glModel !== null && self.glModel.accountNumber !== '') {
      if (self.isAccountAuthorized === null && self.isManualPostAuthorized === null) {
         // Should get into here the first time the account number is set, must do an Auth check at this point
         self.checkForAuth(false);
      } else if (self.isAccountAuthorized === false || self.isManualPostAuthorized === false) {
         // Athorization was canceled or fialed need to run auth again
         self.checkForAuth(false);
      }
   }

   self.convertAmountToPercent = function () {
      if (self.isPercentToAmount === true) {
         self.glModel.amount = self.iceanMaintRetrieveSingle.total * (self.glModel.amount / 100);
         self.btnConvertPecentTitle = MessageService.get('global.convert.amount.to.percent');
         self.isPercentToAmount = false;
      } else {
         self.glModel.amount = (self.glModel.amount * 100) / self.iceanMaintRetrieveSingle.total;
         self.btnConvertPecentTitle = MessageService.get('global.convert.percent.to.amount');
         self.isPercentToAmount = true;
      }
   };

   self.calculateProof = function () {
      if (self.iceanMaintRetrieveSingle !== null) {
         self.proof = 0;
         if (self.glModelList.length) {
            var amountSum = Number(0);
            self.glModelList.forEach(function (model) {
               amountSum = Number(amountSum) + Number(model.amount);
            });
            self.proof = (Math.abs(self.iceanMaintRetrieveSingle.total) - amountSum);
         } else {
            self.proof = self.iceanMaintRetrieveSingle.total;
         }
      }
   };

   self.amountChanged = function () {
      self.calculateProof();
      if (!JSLINQ(self.glModelList).Any(function (item1) { return item1.rowId === self.glModel.rowId; })) {
         self.proof = self.proof - Number(self.glModel.amount);
      }
   };

   self.setAmountEqualtoProof = function () {
      self.glModel.amount = self.proof;
      self.calculateProof();
   };

   self.save = function () {
      // Only continue to save if the user has or has been granted the proper authorization
      if (self.isAccountAuthorized === true && self.isManualPostAuthorized === true) {
         if (!JSLINQ(self.glModelList).Any(function (item1) { return item1.rowId === self.glModel.rowId; })) {
            self.glModelList.push(self.glModel);
         }
         self.calculateProof();

         var returnData = { glModelList: self.glModelList, proof: self.proof, isAccountAuthorized: self.isAccountAuthorized, isManualPostAuthorized: self.isManualPostAuthorized };
         var callbackFn = $scope.gldc[$stateParams.detailOkCallback];
         callbackFn(returnData);
      }
   };

   self.cancel = function () {
      var returnData = { glModelList: $stateParams.glModelList, proof: $stateParams.proof, isAccountAuthorized: self.isAccountAuthorized, isManualPostAuthorized: self.isManualPostAuthorized };
      var callbackFn = $scope.gldc[$stateParams.detailOkCallback];
      callbackFn(returnData);
   };

   self.submit = function () {
      // Need to check to see if the user is authorized to perform this action
      if (self.isAccountAuthorized === null || self.isManualPostAuthorized === null) {
         self.checkForAuth(true);
      } else if (self.isAccountAuthorized === false || self.isManualPostAuthorized === false) {
         self.checkForAuth(true);
      } else {
         self.save();
      }
   };
});