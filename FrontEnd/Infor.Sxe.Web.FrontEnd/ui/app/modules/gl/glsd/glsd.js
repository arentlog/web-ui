'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'gl',
      menuFn: 'glsd',
      dataPath: 'api/gl/glsd',
      searchMethod: 'POST',
      searchPath: 'api/gl/asglsetup/glsdloadtt',
      searchResultsField: 'glsdloadttresults',
      resultsRowIdField: 'glsdrowid',
      detailSubTitle: [
         { label: null, value: 'groupnm' },
         { label: null, value: 'setno' }
      ],
      recentlyVisited: null
   });
   $stateProvider.state('glsd.detail.transactions', {
      url: '/transactions',
      views: {
         transactions: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsd/transactions.json');
            },
            controller: 'GlsdTransactionCtrl as trans'
         }
      }
   });
   $stateProvider.state('glsd.detail.transactions.add', {
      url: '/add',
      views: {
         addtran: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('gl/glsd/addtran.json');
            },
            controller: 'GlsdAddTranCtrl as addt'
         }
      }
   });
});

app.service('GlsdService', function ($state, $translate, AuthService, DataService, GridService, MessageService) {
   this.extendSearchController = function (self, base) {
      base.criteria.reversety = 'offset';
   };

   this.extendBaseController = function (self) {
      self.reverseOptions = [
         {
            label: $translate.instant('global.offset'),
            value: false
         },
         {
            label: $translate.instant('global.reverse'),
            value: true
         }
      ];

      self.isTransactions = function () {
         return $state.is('glsd.detail.transactions');
      };

      self.includesTransactions = function () {
         return $state.includes('glsd.detail.transactions');
      };

      self.isTransactionAdd = function () {
         return $state.is('glsd.detail.transactions.add');
      };
   };

   this.extendMasterController = function (self, base) {
      self.delete = function () { //ignore jslint - delete is standard method name here
         var records = GridService.getSelectedRecords(base.grid);

         // Proceed if any rows are selected
         if (records && records.length) {
            var deleteCallback = function (rowIds) {
               MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
                  DataService.delete('api/gl/glsd/deletelistbyrowids', { data: rowIds, busy: true }, function () { //ignore jslint - delete is standard method name here
                     MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                     base.refreshSearch = true;
                     $state.go('^.master', null, { reload: '^.master' });
                  });
               });
            };
            var processedCount = 0;
            var rowIds = [];
            var permissionRequiredRowIds = [];
            records.forEach(function (row) {
               DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: row.glno }, busy: true }, function (data) {
                  if (!data.userhassecurity) {
                     permissionRequiredRowIds.push(row.glsdrowid);
                  } else {
                     rowIds.push(row.glsdrowid);
                  }
                  processedCount++;
                  if (processedCount >= records.length) {
                     if (permissionRequiredRowIds.length > 0) {
                        AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
                           deleteCallback(rowIds.concat(permissionRequiredRowIds));
                        }, function () {
                           deleteCallback(rowIds);
                        });
                     } else {
                        deleteCallback(rowIds);
                     }
                  }
               });
            });
         }
      };
   };

   this.extendDetailController = function (self, base) {
      //get the GL# as a complete value (required for lookup) and baltype
      self.glsd.$promise.then(function () {
         if (self.glsd && self.glsd.$resolved === true) {
            DataService.post('api/gl/asglsetup/glsdloadtt', { data: self.glsd, busy: true }, function (data) {
               data.glsdloadttresults.forEach(function (row) {
                  if (row.glsdrowid === self.glsd.rowID) {
                     DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.glsd, cFieldName: 'groupnm' }, busy: true }, function (data) {
                        self.glsd.glyr = data.glyr;
                     });
                     self.glsd.glno = row.glno;
                     self.glsd.glnm = row.glnm;
                     self.glsd.baltype = row.baltype;
                     if (base.isEdit()) {
                        DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.glsd.glno }, busy: true }, function (data) {
                           if (!data.userhassecurity) {
                              AuthService.createAuthPoint('glsd', '', 'account', '', '', null, null, function () {
                                 $state.go('^');
                              });
                           }
                        });
                     }
                  }
               });
            });
         }
      });

      self.edit = function () {
         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.glsd.glno }, busy: true }, function (data) {
            if (!data.userhassecurity) {
               AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
                  $state.go('.edit');
               }, null);
            } else {
               $state.go('.edit');
            }
         });
      };

      self.checkDeletePermission = function () {
         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.glsd.glno }, busy: true }, function (data) {
            if (!data.userhassecurity) {
               AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
                  self.delete(); //ignore jslint - delete is standard method name here
               }, null);
            } else {
               self.delete(); //ignore jslint - delete is standard method name here
            }
         });
      };

      //override default save
      self.submit = function () {
         var submitCallback = function () {
            self.glsd.reversety = (self.glsd.reversefl === true) ? 'Reverse' : 'Offset'; 
            DataService.post('api/gl/asglsetup/glsdsave', { data: self.glsd, busy: true }, function () {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               base.criteria.reversety = self.glsd.reversety;
               base.refreshSearch = true;
               $state.go('^.^.master', null, { reload: '^.^.master' });
            });
         };
         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.glsd.glno }, busy: true }, function (data) {
            if (!data.userhassecurity) {
               AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
                  submitCallback();
               }, null);
            } else {
               submitCallback();
            }
         });
      };

      self.glnoChanged = function () {
         DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.glsd, cFieldName: 'groupnm' }, busy: true }, function (data) {
            self.glsd.glyr = data.glyr;
         });
         DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.glsd, cFieldName: 'glno' }, busy: true }, function (data) {
            self.glsd.baltype = data.baltype;
            self.glsd.glnm = data.glnm;
         });
      };

      self.openTransactions = function () {
         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.glsd.glno }, busy: true }, function (data) {
            if (!data.userhassecurity) {
               AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
                  $state.go('.transactions');
               }, null);
            } else {
               $state.go('.transactions');
            }
         });
      };
   };

   this.extendCreateController = function (self, base) {
      self.glsd.reversefl = false;

      //override default save
      self.submit = function () {
         var submitCallback = function () {
            self.glsd.reversety = (self.glsd.reversefl === true) ? 'Reverse' : 'Offset'; 
            DataService.post('api/gl/asglsetup/glsdcreate', { data: self.glsd, busy: true }, function () {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               base.criteria.reversety = self.glsd.reversety;
               base.refreshSearch = true;
               $state.go('^.master', null, { reload: '^.master' });
            });
         };
         DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.glsd.glno }, busy: true }, function (data) {
            if (!data.userhassecurity) {
               AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
                  submitCallback();
               }, function () {
               });
            } else {
               submitCallback();
            }
         });
      };

      self.glnoChanged = function () {
         DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.glsd, cFieldName: 'groupnm' }, busy: true }, function (data) {
            self.glsd.glyr = data.glyr;
         });
         DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.glsd, cFieldName: 'glno' }, busy: true }, function (data) {
            self.glsd.baltype = data.baltype;
            self.glsd.glnm = data.glnm;
         });
      };
   };
});

//controller for the transactions view
app.controller('GlsdTransactionCtrl', function ($scope, $state, AuthService, Constants, DataService, GridService, MessageService) { //as trans
   var self = this;
   var dtl = $scope.dtl;
   self.glsd = dtl.glsd;
   self.oppositeOptions = [
      {
         label: 'Yes',
         value: true
      },
      {
         label: 'No',
         value: false
      }
   ];

   self.glsd.$promise.then(function () {
      if (self.glsd && self.glsd.$resolved === true) {
         DataService.post('api/gl/asglsetup/glsdtransloadtt', { data: self.glsd, busy: true }, function (data) {
            self.transactions = data.glsdtransloadttresults;
            self.infomsg = data.glsdtransloadttsingle.infomsg;
            self.proofcr = data.glsdtransloadttsingle.proofcr;
            self.proofdr = data.glsdtransloadttsingle.proofdr;
         });
      }
   });

   self.divName = function (row, cell, value) {
      if (value.startsWith('*Div*')) {
         return value.substring(6);
      } else {
         return value;
      }
   };

   self.subtitle = function () {
      return self.glsd.groupnm + Constants.SUB_TITLE_SEPARATOR + self.glsd.setno + Constants.SUB_TITLE_SEPARATOR + self.glsd.glno;
   };

   self.maxTransNo = function () {
      var tempMax = 0;
      if (self.transactions) {
         self.transactions.forEach(function (row) {
            if (row.transno > tempMax) {
               tempMax = row.transno;
            }
         });
      }
      return tempMax;
   };

   self.delete = function () { //ignore jslint - delete is standard method name here
      var records = GridService.getSelectedRecords(self.grid);

      if (records && records.length) {
         var deleteCallback = function (records) {
            MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
               var deleteCount = 0;
               records.forEach(function (row) {
                  row.changedfl = false;
                  row.deletedfl = true;
                  row.newfl = false;
                  row.rowid = row.glsdrowid;
                  DataService.post('api/gl/asglsetup/glsdtransupdate', { data: row, busy: true }, function () {
                     deleteCount++;
                     if (deleteCount === 1) {
                        MessageService.info('global.information', 'message.delete.operation.completed.successfully');
                     }
                     $state.reload($state.current);
                  });
               });
            });
         };
         var processedCount = 0;
         var rows = [];
         var permissionRequiredRows = [];
         records.forEach(function (row) {
            DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: row.glno }, busy: true }, function (data) {
               if (!data.userhassecurity) {
                  permissionRequiredRows.push(row);
               } else {
                  rows.push(row);
               }
               processedCount++;
               if (processedCount >= records.length) {
                  if (permissionRequiredRows.length > 0) {
                     AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
                        deleteCallback(rows.concat(permissionRequiredRows));
                     }, function () {
                        deleteCallback(rows);
                     });
                  } else {
                     deleteCallback(rows);
                  }
               }
            });
         });
      }
   };
});

//controller for entering a new transaction (seperate view)
app.controller('GlsdAddTranCtrl', function ($scope, $state, $translate, AuthService, DataService, MessageService) { //as addt
   var self = this;
   var trans = $scope.trans;
   self.glsd = trans.glsd;
   self.newRow = {
      changedfl: true,
      deletedfl: false,
      groupnm: self.glsd.groupnm,
      newfl: true,
      oppositefl: false,
      percent: 0,
      reversefl: self.glsd.reversefl,
      setno: self.glsd.setno,
      transno: trans.maxTransNo() + 1
   };
   self.reversefl = self.newRow.reversefl ? $translate.instant('global.reverse') : $translate.instant('global.offset');
   self.glBalType = '';

   self.glnoChanged = function () {
      DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.newRow, cFieldName: 'groupnm' }, busy: true }, function (data) {
         self.newRow.glyr = data.glyr;
      });
      DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.newRow, cFieldName: 'glno' }, busy: true }, function (data) {
         self.newRow.baltype = data.baltype;
         self.newRow.glnm = data.glnm;
      });
   };

   self.submit = function () {
      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.glsd.glno }, busy: true }, function (data) {
         if (!data.userhassecurity) {
            AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
               DataService.post('api/gl/asglsetup/glsdtransadd', { data: self.newRow, busy: true }, function () {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  $state.go('^', null, { reload: '^' });
               });
            }, null);
         } else {
            DataService.post('api/gl/asglsetup/glsdtransadd', { data: self.newRow, busy: true }, function () {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
               $state.go('^', null, { reload: '^' });
            });
         }
      });
   };
});

//controller for row expansion (seperate view)
app.controller('GlsdTransactionEdit', function ($scope, $state, AuthService, DataService) { //as row
   var self = this;
   var trans = $scope.trans;
   var rowInfo = trans.rowInfo;
   var grid = rowInfo.grid;
   var item = rowInfo.item;
   var row = rowInfo.row;
   self.glsd = trans.glsd;
   self.transaction = rowInfo.itemCopy;
   self.transaction.changedfl = true;
   self.transaction.deletedfl = false;
   self.transaction.newfl = false;
   self.transaction.rowid = self.transaction.glsdrowid;

   self.cancel = function () {
      grid.toggleRowDetail(row);
   };

   self.submit = function () {
      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.transaction.glno }, busy: true }, function (data) {
         if (!data.userhassecurity) {
            AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
               DataService.post('api/gl/asglsetup/glsdtransupdate', { data: self.transaction, busy: true }, function () {
                  grid.toggleRowDetail(row);
                  $state.reload($state.current);
               });
            }, null);
         } else {
            DataService.post('api/gl/asglsetup/glsdtransupdate', { data: self.transaction, busy: true }, function () {
               grid.toggleRowDetail(row);
               $state.reload($state.current);
            });
         }
      });
   };

   self.glnoChanged = function () {
      DataService.post('api/gl/asglinquiry/glaccountauthorizationinfo', { data: { option1Account: self.transaction.glno }, busy: true }, function (data) {
         if (!data.userhassecurity) {
            AuthService.createAuthPoint('glsd', '', 'account', '', '', null, function () {
               DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.transaction, cFieldName: 'glno' }, busy: true }, function (data) {
                  self.transaction.baltype = data.baltype;
                  self.transaction.glnm = data.glnm;
               });
            }, function () {
               self.transaction.glno = item.glno;
            });
         } else {
            DataService.post('api/gl/asglsetup/glsdleavefield', { data: { glsdtrans: self.transaction, cFieldName: 'glno' }, busy: true }, function (data) {
               self.transaction.baltype = data.baltype;
               self.transaction.glnm = data.glnm;
            });
         }
      });
   };
});