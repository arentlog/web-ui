'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'ap',
      menuFn: 'apegs',
      dataPath: 'api/sa/sabs',
      recordName: 'sabs',
      searchMethod: 'POST',
      searchPath: 'api/sa/sabs/getsabsswithblankgroupname',
      resultsRowIdField: 'rowID',
      masterStateView: 'shared/sabs/master.json',
      createStateView: 'shared/sabs/create.json',
      detailStateView: 'shared/sabs/detail.json',
      copyStateView: 'shared/sabs/copy.json',
      detailSubTitle: [
         { label: null, value: 'batchnm' },
         { label: null, value: 'descrip' }
      ],
      searchCriteria: {
         modulename: 'ap'
      },
      primaryKeyParams: ['batchnm'],
      recentlyVisited: {
         title: { label: 'global.group', value: 'batchnm' },
         description: { label: 'global.description', value: 'descrip' }
      }
   });
});

app.service('ApegsService', function ($state, $translate, DataService, GridService, MessageService, UserService, TabService, Sasoo) {

   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {
      DataService.get('api/sa/assasetup/sabsbatchcopy/apegs/ap/' + request.frombatchname + '/' + request.tobatchname, { busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            } else if (data.pvCopydonefl) {
               callback(data.sabscopyresults);
            }
         }
      });
   };

   this.extendMasterController = function (self, base) {
      self.title = $translate.instant('title.apegs');
      self.gridTitle = $translate.instant('global.invoice.groups');
      base.operator = Sasoo.oper2;
      self.FrequencyFormatter = function (row, cell, value, column, item) {
         if (value) {
            switch (value.toUpperCase()) {
               case 'O':
                  return $translate.instant('global.one.time');
               case 'R':
                  return $translate.instant('global.recurring');
               default:
                  return value;
            }
         } else {
            return value;
         }
      };

      self.isAnyRowSelected = function () {
         self.selectedRecord = GridService.getSelectedRecord(base.grid);
      }

      self.drilldown = function (e, args) {
         self.selectedRecord = args[0].item;
         DataService.get('api/sa/assasetup/sabsbatchsetinuseby/' + self.selectedRecord.batchnm + '/', { busy: true }, function (data) {
            if (data) {
               if (data.length > 0) {
                  self.inUse = true;
                  MessageService.processMessaging(data);
               } else {
                  $state.go('apegs.detail', { id: self.selectedRecord.rowID, object: self.selectedRecord });
               }
            }
         });
      };

      TabService.canUserCloseTab('apegs.master', function () {
         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         if (self.selectedRecord) {
            DataService.get('api/sa/assasetup/sabsbatchclearinuseby/' + self.selectedRecord.batchnm + '/', {
               busy: true
            }, function (data) {
               if (data) {
                  if (data.length > 0) {
                     self.canEdit = false;
                     MessageService.processMessaging(data);
                  } else {
                     self.raiseCloseView();
                  }
               }
            });
         } else {
            TabService.closeTab('apegs.master');
         }
      });

      self.raiseCloseView = function () {
         TabService.closeTab('apegs.detail');
      };

      self.customEdit = function () {
         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         DataService.get('api/sa/assasetup/sabsbatchsetinuseby/' + self.selectedRecord.batchnm + '/', { busy: true }, function (data) {
            if (data) {
               if (data.length > 0) {
                  self.inUse = true;
                  MessageService.processMessaging(data);
               } else {
                  $state.go('apegs.detail.edit', { id: self.selectedRecord.rowID, object: self.selectedRecord });
               }
            }
         });
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      self.pageTitle = $translate.instant('global.invoice.group.copy.group');
      self.fromLabel = $translate.instant('global.from.group');
      self.toLabel = $translate.instant('global.to.group');

      request.module = 'ap';
      request.frombatchname = stateParams.object.batchnm;
      request.description = stateParams.object.descrip;
      request.type = stateParams.object.freqtype;
      request.tobatchname = '';

      self.fromBatchNameChanged = function () {
         var params = { batchnm: request.frombatchname };

         DataService.get('api/sa/sabs/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               request.description = data.descrip;
               request.type = data.freqtype;
            }
         });
      };
   };

   this.extendCreateController = function (self, base, sabs, scope) {
      self.title = $translate.instant('global.invoice.group');

      sabs.freqtype = 'O';
      sabs.proofdr = 0;
      sabs.proofcr = 0;
      sabs.modulenm = 'ap';
   };

   this.extendDetailController = function (self, base, sabs, scope) {
      sabs.$promise.then(function () {
         if (sabs && (sabs.modulenm.toLowerCase() !== 'ap' || (sabs.securinit && sabs.securinit !== base.operator))) {
            self.canEdit = false;
         } else {
            self.canEdit = true;
         }
      });

      self.navBack = function () {
         DataService.get('api/sa/assasetup/sabsbatchclearinuseby/' + sabs.batchnm + '/', {
            busy: true
         }, function (data) {
            if (data) {
               if (data.length > 0) {
                  self.canEdit = false;
                  MessageService.processMessaging(data);
               } else {
                  $state.go('apegs.master');
               }
            }
         });
      };

      self.customSubmit = function () {
         DataService.put('api/sa/sabs/', { data: sabs, busy: true }, function (data) {
            if (data) {
               //Clearing the inuseby property after successfull update
               DataService.get('api/sa/assasetup/sabsbatchclearinuseby/' + sabs.batchnm + '/', { busy: true }, function (data) {
                  if (data) {
                     if (data.length > 0) {
                        self.canEdit = false;
                        MessageService.processMessaging(data);
                     } else {
                        base.refreshSearch = true;
                        $state.go('apegs.master', null, { reload: 'apegs.master' });
                     }
                  } else {
                     base.refreshSearch = true;
                     $state.go('apegs.master', null, { reload: 'apegs.master' });
                  }
               });
            }
         });
      };

   };
});