'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'gl',
      menuFn: 'glebs',
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
         modulename: 'gl'
      },
      recentlyVisited: {
         title: { label: 'global.group', value: 'batchnm' },
         description: { label: 'global.description', value: 'descrip' }
      }
   });
});

app.service('GlebsService', function ($state, DataService, GridService, MessageService, UserService, Sasoo, TabService, Utils) {

   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {
      DataService.get('api/sa/assasetup/sabsbatchcopy/glebs/gl/' + request.frombatchname + '/' + request.tobatchname, { busy: true }, function (data) {
         if (data) {
            if (data.messaging.length > 0) {
               MessageService.errorMessages(data.messaging);
            }
            else if (data.pvCopydonefl) {
               callback(data.sabscopyresults);
            }
         }
      });
   };

   this.extendMasterController = function (self, base) {
      self.title = MessageService.get('title.glebs');
      self.gridTitle = MessageService.get('global.batches');
      base.operator = Sasoo.oper2;
      self.inUse = false;
      self.FrequencyFormatter = function (row, cell, value, column, item) {
         if (value) {
            switch (value.toUpperCase()) {
               case 'O':
                  return MessageService.get('global.one.time');
               case 'R':
                  return MessageService.get('global.recurring');
               case 'A':
                  return MessageService.get('global.auto.reversing.gl.batch');
               default:
                  return value;
            }
         } else {
            return value;
         }
      };

      self.isAnyRowSelected = function () {
         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         if (self.selectedRecord) {
            self.canEnable = false;
            if (self.selectedRecord && (self.selectedRecord.modulenm.toLowerCase() !== 'gl' || (self.selectedRecord.securinit && self.selectedRecord.securinit !== base.operator))) {
               self.canEnable = false;
            } else {
               self.canEnable = true;
            }
         }
      };

      self.drilldown = function (e, args) {
         self.selectedRecord = args[0].item;
         DataService.get('api/sa/assasetup/sabsbatchsetinuseby/' + self.selectedRecord.batchnm + '/', { busy: true }, function (data) {
            if (data) {
               if (data.length > 0) {
                  self.inUse = true;
                  MessageService.processMessaging(data);
               } else {
                  $state.go('glebs.detail', { id: self.selectedRecord.rowID, object: self.selectedRecord });
               }
            }
         });
      };

      TabService.canUserCloseTab('glebs.master', function () {
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
            TabService.closeTab('glebs.master');
         }
      });

      self.raiseCloseView = function () {
         TabService.closeTab('glebs.detail');
      };

      self.customEdit = function () {
         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         DataService.get('api/sa/assasetup/sabsbatchsetinuseby/' + self.selectedRecord.batchnm + '/', {
            busy: true
         }, function (data) {
            if (data) {
               if (data.length > 0) {
                  self.inUse = true;
                  MessageService.processMessaging(data);
               } else {
                  $state.go('glebs.detail.edit', { id: self.selectedRecord.rowID, object: self.selectedRecord });
               }
            }
         });
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      self.pageTitle = MessageService.get('global.batch.copy.batch');
      self.fromLabel = MessageService.get('global.from.batch');
      self.toLabel = MessageService.get('global.to.batch');

      request.module = 'gl';
      request.frombatchname = stateParams.object.batchnm;
      request.description = stateParams.object.descrip;
      request.type = stateParams.object.freqtype;
      request.tobatchname = '';

      self.fromBatchNameChanged = function () {
         var params = {
            batchnm: request.frombatchname
         };

         DataService.get('api/sa/sabs/getbypk', { params: params, busy: true }, function (data) {
            if (data) {
               request.description = data.descrip;
               request.type = data.freqtype;
            }
         });
      };
   };

   this.extendCreateController = function (self, base, sabs, scope) {
      self.title = MessageService.get('global.batch');

      sabs.freqtype = 'O';
      sabs.proofdr = 0;
      sabs.proofcr = 0;
      sabs.modulenm = 'gl';
      sabs.createdt = Utils.getCurrentDate();
      sabs.createinit = Sasoo.oper2;
   };

   this.extendDetailController = function (self, base, sabs, scope) {
      sabs.$promise.then(function () {
         self.isProofEnabled = false;
         if (sabs && (sabs.modulenm.toLowerCase() !== 'gl' || (sabs.securinit && sabs.securinit !== base.operator))) {
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
                  $state.go('glebs.master');
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
                        $state.go('glebs.master', null, { reload: 'glebs.master' });
                     }
                  } else {
                     base.refreshSearch = true;
                     $state.go('glebs.master', null, { reload: 'glebs.master' });
                  }
               });
            }
         });
      };

      self.customEdit = function () {
         $state.go('glebs.detail.edit');
      };
   };
});