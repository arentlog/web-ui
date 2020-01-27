'use strict';

app.controller('AoBaseCtrl', function ($scope, $state, $translate, ConfigService, DataService, MessageService, ModalService, UserService, Utils, AodataService) { //as base
   var self = this;
   self.multiTenant = ConfigService.isMultiTenant();

   self.criteria = {};

   self.selectedGroup = '';

   self.isMaster = function () {
      switch ($state.current.name) {
         case 'ao.products.alternate-rebate-methods.detail':
         case 'ao.system.function-types.detail':
            return false;
         default:
            return true;
      }
   };

   self.includesMaster = function () {
      switch ($state.current.name) {
         case 'ao.products.alternate-rebate-methods.detail':
         case 'ao.system.function-types.detail':
            return false;
         default:
            return true;
      }
   };

   self.isState = function (state) {
      return $state.is(state);
   };

   self.isTreeDisabled = function () {
      return ($state.current.url === '/edit' || $state.current.url === '/detail');
   };

   self.navChangeCheck = function () {
      return false;
   };

   self.goToGroup = function (group) {
      if (self.isTreeDisabled()) {
         MessageService.error('global.warning', 'message.current.tab.has.unsaved.changes.please.save.chang');
         return;
      }
      var current = $state.current.name.substr(3);
      if (current === group) {
         return;
      }
      if (current.startsWith('documents.')) {
         current = current.substr(10);
      }
      if (current.indexOf('.') >= 0) {
         current = current.substr(0, current.indexOf('.'));
      }
      var target = group;
      if (target.startsWith('documents.')) {
         target = target.substr(10);
      }
      if (target.indexOf('.') >= 0) {
         target = target.substr(0, target.indexOf('.'));
      }
      if (current === 'master') {
         $state.go('ao.' + group);
      } else if (target === current) {
         $state.go('ao.' + group);
      } else {
         if (self.navChangeCheck()) {
            MessageService.okCancel('global.alert', 'question.there.might.be.unsaved.changes.do.you.still.wish.', function () {
               $state.go('ao.' + group);
            });
         } else {
            $state.go('ao.' + group);
         }
      }
   };

   self.getConfigTitle = function () {
      var name = $state.current.url.substr(1).replace(/-/g, '.');
      switch (name) {
         case 'customers':
            return $translate.instant('global.customer.configuration.information');
         case 'vendors':
            return $translate.instant('global.vendor.configuration.information');
         case 'products':
            return $translate.instant('global.product.configuration.information');
         case 'financials':
            return $translate.instant('global.financials.configuration.information');
         case 'sales.history':
            return $translate.instant('global.sales.history.configuration.information');
         case 'system':
            return $translate.instant('global.system.configuration.information');
         case 'logistics':
            return $translate.instant('global.warehouse.logistics.configuration.information');
         case 'integrations':
            return $translate.instant('global.integrations.configuration.information');
         case 'kit.production':
            return $translate.instant('global.kit.production.configuration.information');
         case 'value.add':
            return $translate.instant('global.value.add.configuration.information');
         case 'job.management':
            return $translate.instant('global.job.management.configuration.information');
         case 'service.warranty':
            return $translate.instant('global.service.warranty.configuration.information');
         case 'transfer.orders':
            return $translate.instant('global.warehouse.transfers.configuration.information');
         case 'purchase.orders':
            return $translate.instant('global.purchase.orders.configuration.information');
         case 'sales.orders':
            return $translate.instant('global.sales.orders.configuration.information');
         default:
            return name;
      }
   };

   self.getConfigurationData = function (subject) {
      if (subject) {
         DataService.post('api/pv/pvadminlog/listbysubject', { data: { subject: subject, batchsize: -1 }, busy: true }, function (data) { //batchsize required as -1 to get all records.  For now all records are required because data is not sorted by date automatically in the table, so grabbing the top records will not work...
            if (data) {
               self.dataset = data;
               self.getinstallationNotesData(subject);
            }
         });
      }
   };

   self.getinstallationNotesData = function (subject) {
      DataService.get('api/pv/pvadminnotes/getbypk?subject=' + subject, { busy: true }, function (notesData) {
         if (notesData) {
            self.installationNotes = notesData;
            self.originalNotes = angular.copy(self.installationNotes.installnote);
         } else {
            self.installationNotes = {
               installnote: '',
               subject: subject,
               cono: UserService.getCono()
            };
            self.originalNotes = null;
         }
      });
   };

   self.getSubTitle = function () {
      if ($state.current.name.startsWith('ao.documents')) {
         if ($state.current.name.indexOf('.', 13) < 0) {
            return '';
         }
      } else {
         if ($state.current.name.indexOf('.', 3) < 0) {
            return '';
         }
      }
      var name = $state.current.url.substr(1).replace(/-/g, '.');
      var label = $translate.instant('global.' + name);
      if ('global.' + name === label) {
         label = $translate.instant(name);
      }
      return label;
   };

   self.reset = function () {
      self.installationNotes.installnote = angular.copy(self.originalNotes);
   };

   self.hasChanges = function (obj1, obj2, ignoreList) { //to show the difference between 2 objects ignoring certain elements
      if (!ignoreList) {
         ignoreList = [];
      }
      var results = Utils.deepCompare(obj1, obj2);
      if (!results.length) {
         return [];
      } else {
         results = results.split(',');
         ignoreList.forEach(function (element) {
            if (results.indexOf(element) >= 0) {
               results.splice(results.indexOf(element), 1);
            }
         });
         return results;
      }
   };

   self.fillNotes = function (newObj, origObj, dictionary, ignoreList, callback) {
      var list = [];
      var results = self.hasChanges(newObj, origObj, ignoreList);
      if (results.length) {
         results.forEach(function (diff) {
            //SL code had a list of unsaved notes, but there should never be unsaved notes, so that code is omitted here
            if (dictionary[diff]) {
               list.push({
                  Function: dictionary[diff],
                  Value: self.getConvertedValue(diff, newObj, newObj[diff]),
                  Oper: UserService.getUserName(),
                  Note: '' // would put unsaved note here, if any (see above comment)
               });
            }
         });
         self.notesPopup = {
            list: list,
            callback: callback
         };
         if (self.notesPopup.list.length) {
            ModalService.showModal('ao/ao/shared/notes-popup.json', 'AoNotesPopupModalCtrl as mod', $scope, function (modal) {
               self.notesPopup.modal = modal;
            });
         } else {
            callback();
         }
      }
      return results.length;
   };

   self.getConvertedValue = function (functionName, aoObj, newValue) {
      var convertedValue = newValue;
      var area = $state.current.name.substr(3);
      if (area.indexOf('.') > 0) {
         area = area.substr(0, area.indexOf('.'));
      }
      switch (area.toLowerCase()) {
         case 'customers':
            switch (functionName.toLowerCase()) {
               case 'arshiptosvc':
                  switch (newValue.toLowerCase()) {
                     case 'y':
                        convertedValue = $translate.instant('global.yes');
                        break;
                     case 'n':
                        convertedValue = $translate.instant('global.no');
                        break;
                     case 'c':
                        convertedValue = $translate.instant('global.from.customer');
                        break;
                  }
                  break;
               case 'arcodinbalfl':
               case 'arcrdiscfl':
               case 'arshipfl':
               case 'arstmtheadfl':
               case 'mcarrollcd':
               case 'scarrollcd':
               case 'sequcfl':
               case 'svcchgdivfl':
               case 'svcchgshipfl':
                  convertedValue = newValue ? $translate.instant('global.yes') : $translate.instant('global.no');
                  break;
            }
            break;
         case 'vendors':
            if (functionName === 'allocationTy') {
               switch (newValue.toLowerCase()) {
                  case 'in':
                     convertedValue = $translate.instant('global.invoice');
                     break;
                  case 'po':
                     convertedValue = $translate.instant('global.purchase.order');
                     break;
                  case 'bi':
                     convertedValue = $translate.instant('global.both.default.invoice');
                     break;
                  case 'bp':
                     convertedValue = $translate.instant('global.both.default.po');
                     break;
               }
            }
            break;
         case 'products':
            if (functionName === 'wtnsovrfillty' || functionName === 'ponsovrfillty') {
               convertedValue = (newValue.toLowerCase === 'y') ? $translate.instant('global.yes') : $translate.instant('global.no');
            }
            if (functionName === 'icMSDSPrt') {
               convertedValue = newValue ? $translate.instant('global.picking') : $translate.instant('global.mail.later');
            }
            break;
         case 'financials':
            if (functionName.startsWith('glenddt')) {
               convertedValue = Utils.formatDate(newValue);
            }
            break;
         case 'sales-history':
            if (functionName === 'smcommtype') {
               convertedValue = newValue ? $translate.instant('global.accrual') : $translate.instant('global.cash');
            }
            break;
         case 'integrations':
            if (functionName === 'finIntegrationTy') {
               switch (newValue.toLowerCase()) {
                  case 'no':
                     convertedValue = $translate.instant('global.no.financial.integration');
                     break;
                  case 'gl':
                     convertedValue = $translate.instant('gl.general.ledger');
                     break;
                  case 'gp':
                     convertedValue = $translate.instant('global.general.ledger.and.accounts.payable');
                     break;
                  case 'gr':
                     convertedValue = $translate.instant('global.general.ledger.and.accounts.receivable');
                     break;
                  case 'al':
                     convertedValue = $translate.instant('global.all');
                     break;
               }
            }
            break;
         default:
            break;
      }
      return convertedValue;
   };

   self.saveLog = function (subject) {
      if (self.notesPopup && self.notesPopup.list && self.notesPopup.list.length) {
         var notesToSave = [];
         var date = new Date();
         var time = ((date.getHours() * 60) + date.getMinutes()) * 60 + date.getSeconds();
         date = Utils.pad(date.getMonth() + 1, 2, '0') + '/' + Utils.pad(date.getDate(), 2, '0') + '/' + Utils.pad(date.getFullYear().toString().substr(2), 2, '0');
         self.notesPopup.list.forEach(function (note) {
            notesToSave.push({
               oper2: note.Oper,
               note: note.Note,
               function: note.Function,
               setting: note.Value,
               cono: UserService.getCono(),
               subject: subject,
               changedt: date,
               changetm: time
            });
         });
         DataService.post('api/pv/pvadminlog/pv_adminlogsave', { data: notesToSave, busy: true });
      }
      self.saveInstallationNotes(subject);
   };

   self.saveInstallationNotes = function (subject) {
      if (self.installationNotes.installnote !== self.originalNotes) {
         var method = !self.originalNotes ? 'POST' : 'PUT';
         DataService.send('api/pv/pvadminnotes', { method: method, data: self.installationNotes, busy: true }, function () {
            self.originalNotes = angular.copy(self.installationNotes.installnote);
            self.getConfigurationData(subject);
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            self.notesPopup = null;
         });
      } else {
         self.getConfigurationData(subject);
         MessageService.info('global.information', 'message.save.operation.completed.successfully');
         self.notesPopup = null;
      }
   };
});
//end base
// Added shared/common data in base ctrl. if required we will move to another ctrl.

app.controller('AoMasterCtrl', function () {
   //This is a required placeholder and is not used, but must be defined.
});

app.controller('AoNotesPopupModalCtrl', function ($scope, GridService, MessageService) { //as mod
   var self = this;
   var data = $scope.base.notesPopup;
   self.dataset = data.list;
   var callback = data.callback;
   self.masterNote = '';

   self.addNote = function () {
      MessageService.okCancel('global.confirm', 'question.are.you.sure.you.want.to.add.this.note.for.all.cha', function () {
         self.dataset.forEach(function (note, i) {
            note.Note = self.masterNote;
            self.grid.updateRow(i);
         });
      });
   };

   self.cancel = function () {
      data.modal.destroy();
   };

   self.submit = function () {
      var countBlank = 0;
      self.dataset.forEach(function (note) {
         if (note.Note === '') {
            countBlank++;
         }
      });
      if (countBlank) {
         MessageService.error('global.error', 'message.notes.are.required');
      } else {
         if (callback) {
            callback();
         }
         data.modal.destroy();
      }
   };
}); //end mod

app.controller('AoTreeCtrl', function ($scope, $state, $translate, DataService, UserService) { //as tree
   var self = this;
   var base = $scope.base; //ignore jslint - required for tree-widget.html
   self.menu = [
      {
         name: 'customers',
         secfl: false,
         children: [
            {
               name: 'defaults',
               children: []
            },
            {
               name: 'statements',
               children: []
            },
            {
               name: 'service-charges',
               children: []
            },
            {
               name: 'cash-receipts',
               children: []
            },
            {
               name: 'balances',
               children: []
            }
         ]
      },
      {
         name: 'vendors',
         secfl: false,
         children: [
            {
               name: 'print-formats',
               children: []
            },
            {
               name: 'invoice-defaults',
               children: []
            },
            {
               name: 'analysis',
               children: []
            },
            {
               name: 'receiving',
               children: []
            },
            {
               name: 'balances',
               children: []
            }
         ]
      },
      {
         name: 'products',
         secfl: false,
         children: [
            {
               name: 'defaults',
               children: []
            },
            {
               name: 'alternates-upc',
               children: []
            },
            {
               name: 'costs',
               children: []
            },
            {
               name: 'replenishment',
               children: []
            },
            {
               name: 'pricing',
               children: []
            },
            {
               name: 'multiple-level',
               children: []
            },
            {
               name: 'rebates',
               children: []
            },
            {
               name: 'alternate-rebate-methods',
               children: []
            },
            {
               name: 'cores',
               children: []
            },
            {
               name: 'product-restrictions',
               children: []
            },
            {
               name: 'warehouse-manager',
               children: []
            },
            {
               name: 'national-program',
               children: []
            }
         ]
      },
      {
         name: 'documents',
         secfl: false,
         children: [
            {
               name: 'kit-production',
               children: [
                  {
                     name: 'processing',
                     children: []
                  },
                  {
                     name: 'printing',
                     children: []
                  }
               ]
            },
            {
               name: 'sales-orders',
               children: [
                  {
                     name: 'entry-settings',
                     children: []
                  },
                  {
                     name: 'processing',
                     children: []
                  },
                  {
                     name: 'approval-process',
                     children: []
                  },
                  {
                     name: 'back-orders',
                     children: []
                  },
                  {
                     name: 'printing',
                     children: []
                  },
                  {
                     name: 'quote-orders',
                     children: []
                  },
                  {
                     name: 'highest-price',
                     children: []
                  }
               ]
            },
            {
               name: 'purchase-orders',
               children: [
                  {
                     name: 'entry-defaults',
                     children: []
                  },
                  {
                     name: 'replenishment',
                     children: []
                  },
                  {
                     name: 'accounting',
                     children: []
                  },
                  {
                     name: 'printing',
                     children: []
                  }
               ]
            },
            {
               name: 'job-management',
               children: [
                  {
                     name: 'printing',
                     children: []
                  },
                  {
                     name: 'processing',
                     children: []
                  }
               ]
            },
            {
               name: 'transfer-orders',
               children: [
                  {
                     name: 'processing',
                     children: []
                  },
                  {
                     name: 'replenishment',
                     children: []
                  },
                  {
                     name: 'printing',
                     children: []
                  }
               ]
            },
            {
               name: 'service-warranty',
               children: [
                  {
                     name: 'entry-settings',
                     children: []
                  },
                  {
                     name: 'printing',
                     children: []
                  }
               ]
            },
            {
               name: 'value-add',
               children: [
                  {
                     name: 'entry-settings',
                     children: []
                  },
                  {
                     name: 'printing',
                     children: []
                  }
               ]
            }
         ]
      },
      {
         name: 'financials',
         secfl: false,
         children: [
            {
               name: 'account-structure',
               children: []
            },
            {
               name: 'period-structure',
               children: []
            },
            {
               name: 'fiscal-year',
               children: []
            },
            {
               name: 'profit-distribution',
               children: []
            },
            {
               name: 'check-reconciliation',
               children: []
            }
         ]
      },
      {
         name: 'sales-history',
         secfl: false,
         children: [
            {
               name: 'levels',
               children: []
            },
            {
               name: 'rebates-basis',
               children: []
            },
            {
               name: 'customer',
               children: []
            }
         ]
      },
      {
         name: 'system',
         secfl: false,
         children: [
            {
               name: 'general',
               children: []
            },
            {
               name: 'options',
               children: []
            },
            {
               name: 'user-fields',
               children: []
            },
            {
               name: 'function-types',
               children: []
            },
            {
               name: 'menu-items',
               children: []
            },
            {
               name: 'report-items',
               children: []
            },
            {
               name: 'login-security',
               children: []
            },
            {
               name: 'report-scheduler',
               children: []
            }
         ]
      },
      {
         name: 'logistics',
         secfl: false,
         children: [
            {
               name: 'ibc-options',
               children: []
            },
            {
               name: 'wl-options',
               children: []
            },
            {
               name: 'wl-locations',
               children: []
            }
         ]
      },
      {
         name: 'integrations',
         secfl: false,
         children: [
            {
               name: 'configurator-options',
               children: []
            },
            {
               name: 'tax-interface-options',
               children: []
            },
            {
               name: 'financial-interface-options',
               children: []
            },
            {
               name: 'ion-interface-options',
               children: []
            },
            {
               name: 'billtrust-options',
               children: []
            },
            {
               name: 'dnbi-integration-options',
               children: []
            },
            {
               name: 'service-management',
               children: []
            },
            {
               name: 'lsp-interface-options',
               children: []
            }
         ]
      }
   ];

   self.getLabel = function (name) {
      name = name.replace(/-/g, '.');
      var label = $translate.instant('global.' + name);
      if (label === 'global.' + name) { //if the label is not a global, assume it is the full name
         label = $translate.instant(name);
      }
      return label;
   };

   self.getSASOSettings = function () {
      DataService.post('api/sa/assasetup/sasosetupretrieve', { data: { cOperList: UserService.getUserName() }, busy: true }, function (data) {
         if (data) {
            self.adminOptionRecordList = data.sasosetupaosecure;
            //Apply Security settings to Master Links
            self.menu.forEach(function (menuItem) {
               if (self.adminOptionRecordList) {
                  menuItem.name = menuItem.name.replace(/-/g, ' ');
                  var menuIndex = self.menu.indexOf(menuItem);
                  var menuItemFl = JSLINQ(self.adminOptionRecordList).Where(function (sasoSetting) { return sasoSetting.descrip.toLowerCase() === menuItem.name; }).Select(function (selfl) { return selfl.selectedfl });
                  self.menu[menuIndex].secfl = (menuItemFl && menuItemFl.items[0] && menuItemFl.items[0] === true) ? true : false;
                  if (menuItem.name === 'sales history') {
                     self.menu[menuIndex].name = 'sales-history';
                  }
               }
            });

         }
      });
   };
   self.getSASOSettings();
}); //end tree