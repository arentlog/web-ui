'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'saee',
      dataPath: 'api/shared/eventsetup',
      searchMethod: 'POST',
      searchPath: 'api/shared/eventsetup/lookup',
      searchResultsField: 'saeventlookupresults',
      resultsRowIdField: 'rowidEvent',
      primaryKeyParams: ['eventname'],
      searchRecordLimitField: 'recordcountlimit',
      copyStateView: 'sa/saee/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/sa/assasetup/saeecopyevent',
      copySubTitle: [
         { label: 'global.event', value: 'eventname' }
      ],
      detailSubTitle: [
         { label: 'global.event', value: 'eventname' }
      ],
      recentlyVisited: {
         title: { label: 'global.event', value: 'eventname' }
      }
   });
   $stateProvider.state('saee.detail.selectionfields', {
      url: '/selection-fields',
      params: {
         fieldType: null,
         returnState: null
      },
      views: {
         selectionFields: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saee/selection-fields.json');
            },
            controller: 'SaeeSelectionFieldsCtrl as sf'
         }
      }
   });
   $stateProvider.state('saee.detail.selectionfields.create', {
      url: '/create',
      views: {
         selectionFieldsCreate: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saee/selection-fields-create.json');
            },
            controller: 'SaeeSelectionFieldsCreateCtrl as sfcrt'
         }
      }
   });
});

app.service('SaeeService', function ($state, DataService, GridService, MessageService) {
   this.extendBaseController = function (self) {
      self.AMT = 'a';
      self.CHAR = 'c';
      self.PRC = 'p';
      self.DATE = 'd';
   };
   this.extendCreateController = function (self, base, saee) {
      saee.standardty = 'a';
   };
   this.extendCopyController = function (self, base, request, scope, stateParams) {
      request.fromeventname = stateParams.object.eventname;
   };
   this.extendDetailController = function (self, base, saee) {
      saee.$promise.then(function () {
         DataService.get('api/sa/assasetup/saeefloadeventflds/' + saee.eventname, { busy: true }, function (data) {
            self.saee.amtfields = data.saeefldsamt;
            self.saee.charfields = data.saeefldschar;
            self.saee.datefields = data.saeefldsdate;
            self.saee.prcfields = data.saeefldsprc;
         });
      });
      self.launchSelectionFieldsAmt = function () {
         $state.go('saee.detail.selectionfields', {
            fieldType: base.AMT,
            returnState: $state.current.name
         });
      };
      self.launchSelectionFieldsChar = function () {
         $state.go('saee.detail.selectionfields', {
            fieldType: base.CHAR,
            returnState: $state.current.name
         });
      };
      self.launchSelectionFieldsPrc = function () {
         $state.go('saee.detail.selectionfields', {
            fieldType: base.PRC,
            returnState: $state.current.name
         });
      };
      self.launchSelectionFieldsDate = function () {
         $state.go('saee.detail.selectionfields', {
            fieldType: base.DATE,
            returnState: $state.current.name
         });
      };
   };
   this.updateRecord = function (self, base, saee, scope, callback) {
      // standard save, then save selection fields
      DataService.put('api/shared/eventsetup', { data: saee }, function () {
         DataService.post('api/sa/assasetup/saeefsaveeventflds', {
            data: {
               saeefldsamt: saee.amtfields,
               saeefldschar: saee.charfields,
               saeefldsdate: saee.datefields,
               saeefldsprc: saee.prcfields,
               cEventName: saee.eventname
            },
            busy: true
         }, function () {
            callback();
         });
      });
   };
   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, saee, $scope, deleteCallback) {
      DataService.get('api/sa/assasetup/saeedeleteevent/' + saee.eventname, { busy: true }, function (data) {
         if (data) {
            MessageService.info('global.warning', data);
         }
         deleteCallback();
      });
   };
   // Custom Delete of Possible Multiple Records for Master Screen
   this.deleteMultiple = function (self, base, records, scope, deleteCallback) {
      records.forEach(function (record) {
         DataService.get('api/sa/assasetup/saeedeleteevent/' + record.eventname, { busy: true }, function (data) {
            if (data) {
               MessageService.info('global.warning', data);
            }
            deleteCallback();
         });
      });
   };
});

app.controller('SaeeSelectionFieldsCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, GridService) {
   var self = this;
   var dtl = $scope.dtl;
   var base = $scope.base;
   var saee = dtl.saee;

   self.fieldType = $stateParams.fieldType;

   if ($stateParams.fieldType === base.AMT) {
      self.dataset = saee.amtfields;
   } else if ($stateParams.fieldType === base.CHAR) {
      self.dataset = saee.charfields;
   } else if ($stateParams.fieldType === base.PRC) {
      self.dataset = saee.prcfields;
   } else if ($stateParams.fieldType === base.DATE) {
      self.dataset = saee.datefields;
   }

   var saveDataset = self.dataset.slice(0);

   self.formatType = function () {

      if ($stateParams.fieldType) {
         switch ($stateParams.fieldType) {
         case 'a':
            return $translate.instant('global.amount');
         case 'c':
            return $translate.instant('global.character');
         case 'd':
            return $translate.instant('global.date');
         case 'p':
            return $translate.instant('global.price');
         default:
            return $stateParams.fieldType;
         }
      } else {
         return $stateParams.fieldType;
      }
   };

   self.getLabel = function () {
      var rtn = $translate.instant('global.selection.fields.for.data.type') + ' ' + self.formatType();
      return rtn;
   };

   self.getSubTitle = function () {
      var rtn = $translate.instant('global.event') + ': ' + saee.eventname;
      return rtn;
   };

   self.back = function () {
      if ($stateParams.fieldType === base.AMT) {
         saee.amtfields = saveDataset.slice(0);
      } else if ($stateParams.fieldType === base.CHAR) {
         saee.charfields = saveDataset.slice(0);
      } else if ($stateParams.fieldType === base.PRC) {
         saee.prcfields = saveDataset.slice(0);
      } else if ($stateParams.fieldType === base.DATE) {
         saee.datefields = saveDataset.slice(0);
      }
      $state.go($stateParams.returnState);
   };

   self.submit = function () {
      $state.go($stateParams.returnState);
   };

   // This is needed so we can hide other views appropriately
   self.isSelectionFieldsMaster = function () {
      return $state.current.name.endsWith('.selectionfields');
   };
   self.isisSelectionFieldsCreate = function () {
      return $state.current.name.endsWith('.create');
   };

   // Delete selected records from working dataset
   self.delete = function () {
      var records = GridService.getSelectedRecords(self.grid);
      if (records.length) {
         MessageService.okCancel('global.delete.confirmation', 'question.are.you.sure.you.want.to.delete', function () {
            records.forEach(function (record) {
               var indx = self.dataset.indexOf(record);
               self.dataset.splice(indx, 1);
            });
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');
         });
      }
   };
});

//Separate View used for Selection Field Create mode.
app.controller('SaeeSelectionFieldsCreateCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var sf = $scope.sf;

   self.getNextArrayPos = function () {
      var nextArrayPos = 0;
      if (sf.dataset) {
         sf.dataset.forEach(function (record) {
            if (record.arraypos > nextArrayPos) {
               nextArrayPos = record.arraypos;
            }
         });
      }
      nextArrayPos++;
      return nextArrayPos;
   };

   // initialize new record
   self.fields = {
      arraypos: self.getNextArrayPos(),
      fieldname: '',
      fieldlabel: '',
      fieldlength: 1,
      allowblankfl: true,
      pricecostty: ''
   };

   self.cancel = function () {
      $state.go('^');
   };

   self.submit = function () {
      var message = self.validateArrayPos(self.fields.arraypos);

      if (message) {
         MessageService.error('global.validation.error', message);
      }
      else {
         sf.dataset.push(self.fields);
         $state.go('^');
      }
   };

   self.validateArrayPos = function () {
      var message = '';
      if (self.fields.arraypos === 0) {
         message = MessageService.get('global.array.position') + MessageService.get('symbol.dash.with.spaces') + MessageService.get('message.this.is.a.required.field');
      }
      else {
         for (var i = 0; i < sf.dataset.length; i++) {
            if (sf.dataset[i].arraypos === self.fields.arraypos) {
               message = MessageService.get('message.this.array.position.has.already.been.used');
               break;
            }
         }
      }
      return message;
   };
});