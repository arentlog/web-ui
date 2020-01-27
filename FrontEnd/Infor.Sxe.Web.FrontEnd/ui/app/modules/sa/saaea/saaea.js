'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'saaea',
      dataPath: '', // blank since not using any standard calls
      recordName: 'record',
      recordRowIdField: 'webextendRowID',
      searchMethod: 'POST',
      searchPath: 'api/shared/assharedinquiry/getwebextensionlist',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'webextendrecord',
      resultsRowIdField: 'webextendRowID',
      searchCriteria: { statustype: 'b', latestrevisiononly: true },
      createStateParams: { type: null },
      detailSubTitle: [
         {label: null, value: 'screenname'}
      ],
      recentlyVisited: {
         title: {label: null, value: 'screenname'},
         description: [
            {label: 'global.level', valueFunction: 'base.getLevelDisplay'},
            {label: 'global.type', valueFunction: 'base.getTypeDisplay'},
            {label: 'global.revision.number', value: 'revision'}
         ]
      }
   });

   $stateProvider.state('saaea.createFunction', {
      url: '/create-function',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saaea/create-function.json');
            },
            controller: 'SaaeaCreateFunctionCtrl as crtfn'
         }
      }
   });

   $stateProvider.state('saaea.import', {
      url: '/import',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saaea/import.json');
            },
            controller: 'SaaeaImportCtrl as imp'
         }
      }
   });

});

app.service('SaaeaService', function ($state, DataService, JsonViewService, MessageService, PvUser,
                                      TabService, UserService, GridService, Utils) {

   this.extendBaseController = function (self, criteria) {
      self.LEVEL_BOTH = 'b';
      self.LEVEL_SYSTEM = 's';
      self.LEVEL_COMPANY = 'c';
      self.TYPE_EXTENDED_VIEW = 'extendedview';
      self.TYPE_NEW_VIEW = 'newview';
      self.TYPE_JAVASCRIPT = 'javascript';
      self.TYPE_CSS = 'css';

      // Determine which levels user has access to
      var accessLevel = PvUser.webextensiontype ? PvUser.webextensiontype.toLowerCase() : '';
      self.allowSystem = accessLevel === 's';
      self.allowCompany = accessLevel === 's' || accessLevel === 'c';

      // Level options for detail screen
      self.extensionLevelOptions = [];
      if (self.allowSystem) {
         self.extensionLevelOptions.push({ value: self.LEVEL_SYSTEM, label: MessageService.get('global.system') });
      }
      if (self.allowCompany) {
         self.extensionLevelOptions.push({ value: self.LEVEL_COMPANY, label: MessageService.get('global.company') });
      }

      // Level options for search (same but add the 'Both' option)
      self.extensionLevelSearchOptions = angular.copy(self.extensionLevelOptions);
      if (self.allowSystem) {
         self.extensionLevelSearchOptions.unshift({ value: self.LEVEL_BOTH, label: '' });
      }

      self.extensionTypeOptions = [
         { value: self.TYPE_EXTENDED_VIEW, label: MessageService.get('global.extended.view') },
         { value: self.TYPE_NEW_VIEW, label: MessageService.get('global.new.view') },
         { value: self.TYPE_JAVASCRIPT, label: MessageService.get('global.javascript') },
         { value: self.TYPE_CSS, label: MessageService.get('global.css') }
      ];

      // Set default values for level and cono
      self.initializeLevelCriteria = function () {
         if (self.allowSystem) {
            criteria.level = self.LEVEL_BOTH;
            criteria.cono = 0;
         } else if (self.allowCompany) {
            criteria.level = self.LEVEL_COMPANY;
            criteria.cono = UserService.getCono();
         }
      };

      // Formatter for level display in Recently Visited
      self.getLevelDisplay = function (record) {
         return record.cono ? MessageService.get('global.company') : MessageService.get('global.system');
      };

      // Formatter for type display in Recently Visited
      self.getTypeDisplay = function (record) {
         switch (record.extensiontype) {
         case self.TYPE_EXTENDED_VIEW:
            return MessageService.get('global.extended.view');
         case self.TYPE_NEW_VIEW:
            return MessageService.get('global.new.view');
         case self.TYPE_JAVASCRIPT:
            return MessageService.get('global.javascript');
         case self.TYPE_CSS:
               return MessageService.get('global.css');
         default:
            return record.extensiontype;
         }
      };

      // Extension/View ID must start with "extension-" (for new views, javascript, and css)
      self.validateExtensionId = function (record) {
         if (record.screenname.startsWith('extension-') || record.extensiontype === self.TYPE_EXTENDED_VIEW) {
            return true;
         } else {
            return MessageService.get('message.invalid.extension.id');
         }
      };

      // Validate the JSON or JavaScript
      self.validateExtensionValue = function (record) {

         // JavaScript and CSS validation is up to them
         if (record.extensiontype === self.TYPE_JAVASCRIPT || record.extensiontype === self.TYPE_CSS) {
            return true;
         }

         var json = record.settingvalue;
         if (json) {
            // Try to parse the json, and return error if it doesn't parse properly
            try {
               JSON.parse(json);
            } catch (error) {
               return MessageService.get(error.message);
            }
         }

         return true;
      };

      // Pre-process json/javascript value before save
      self.preprocessValueBeforeSave = function (record) {

         // For new views, insert/update the "viewId" in the json value (since expected to be there)
         if (record.extensiontype === self.TYPE_NEW_VIEW) {
            var jsonView = record.settingvalue ? JSON.parse(record.settingvalue) : { viewId: '', id: 1, type: 'VIEW', children: [] };
            jsonView.viewId = record.screenname;
            record.settingvalue = JSON.stringify(jsonView);
         }
      };

      // If user doesn't have a proper Extension Access Level, then boot them out of this function
      if (!self.allowSystem && !self.allowCompany) {
         MessageService.error('global.error', 'message.error.saaea.extension.access.level');
         TabService.closeTab('saaea');
      }
   };

   this.extendSearchController = function (self, base, criteria) {

      // Set initial values for level and cono
      base.initializeLevelCriteria();

      // Update cono when level changes
      self.levelChanged = function () {
         criteria.cono = criteria.level === base.LEVEL_SYSTEM ? 0 : UserService.getCono();
      };

      // Reset button should perform the standard clear then reset the level/cono
      self.customClear = function () {
         self.clear();
         base.initializeLevelCriteria();
      };
   };

   this.extendMasterController = function (self, base) {

      self.create = function (type) {
         $state.go('^.create', { type: type });
      };

      self.createFunction = function () {
         $state.go('^.createFunction');
      };

      self.levelFormatter = function (row, cell, value, column, item) {
         return item.cono ? MessageService.get('global.company') : MessageService.get('global.system');
      };

      self.download = function () {
         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length > 0) {
            var criteria = [];
            records.forEach(function (item) {
               criteria.push(item.webextendRowID);
            });
            DataService.post('api/shared/jsonview/exportextensions', { data: criteria, busy: true, method: 'POST', responseType: 'arraybuffer'}, function (data) {
               if (data) {
                  var blob = new Blob([data], { type: 'application/zip' });
                  saveAs(blob, 'extensions-' + Utils.returnDateTimeStamp() + '.zip');
               }
            });
         }
      };

      //By design, we do not ask the question "Create Revision" for this feature.
      //Additionally, we're not updating fields such as the 'Tag' or 'Description'
      //as to not allow the user to inadvertantly overwrite other data in those fields
      //from other enhancements for the Extension.  The user can use the buttons to
      //Activate/Inactivate multiples, or they can change a single row via the Editing
      //ability in the Grid.
      self.updateStatus = function (requestCriteria, isActive) {
         DataService.post('api/shared/assharedinquiry/webextensionstatusupdate', { data: requestCriteria, busy: true }, function (data) {
            if (base.dataset && data) {
               //Overwrite the ones updated into the selected rows.
               data.forEach(function (responseRow) {
                  base.dataset.forEach(function (gridRow, index) {
                     if (gridRow.webextendRowID === responseRow.webextensionrowid) {
                        gridRow.activefl = responseRow.activefl;
                        gridRow.operinit = responseRow.operinit;
                        gridRow.transdt = responseRow.transdt;
                        gridRow.transtm = responseRow.transtm;

                        base.grid.updateRow(index);
                     }
                  });
               });

               // Clear view cache
               JsonViewService.clearViewCache();
            }
         });
      };

      //Called from the click event.
      self.changeStatus = function (isActive) {
         var selectedRows = GridService.getSelectedRecords(base.grid);
         if (selectedRows && selectedRows.length > 0) {
            //Convert selected rows to a collection for the criteria.
            var requestCriteria = [];
            selectedRows.forEach(function (row) {
               var criteria = {
                  activefl: isActive,
                  webextensionrowid: row.webextendRowID,
                  operinit: row.operinit,
                  transdt: row.transdt,
                  transtm: row.transtm
               };
               requestCriteria.push(criteria);
            });

            self.updateStatus(requestCriteria, isActive);
         }
      };

      self.gridCellChange = function (e, args) {
         var record = base.dataset[args.row];
         if (args.column.field.toLowerCase() === 'activefl') {

            //The backend call expects a Collection.
            var requestCriteria = [];
            var criteria = {
               activefl: record.activefl,
               webextensionrowid: record.webextendRowID,
               operinit: record.operinit,
               transdt: record.transdt,
               transtm: record.transtm
            };
            requestCriteria.push(criteria);

            self.updateStatus(requestCriteria, record.activefl);
         }
      }
   };

   this.extendCreateController = function (self, base, record, scope, stateParams) {
      record.extensiontype = stateParams.type;
      record.screenname = record.extensiontype !== base.TYPE_EXTENDED_VIEW ? 'extension-' : '';
      record.functionname = record.extensiontype !== base.TYPE_EXTENDED_VIEW ? 'extension' : '';
      record.activefl = true;

      // Set initial values for level and cono
      if (base.allowSystem) {
         self.level = base.LEVEL_SYSTEM;
         record.cono = 0;
      } else if (base.allowCompany) {
         self.level = base.LEVEL_COMPANY;
         record.cono = UserService.getCono();
      }

      if (record.extensiontype === base.TYPE_NEW_VIEW) {
         self.template = 'BLANK';
      }

      // Update cono when level changes
      self.levelChanged = function () {
         record.cono = self.level === base.LEVEL_SYSTEM ? 0 : UserService.getCono();
      };

      self.validateExtensionId = function () {
         return base.validateExtensionId(record);
      };

      self.validateExtensionValue = function () {
         return base.validateExtensionValue(record);
      };

      self.customSubmit = function () {
         // Populate the json value before creating the record
         self.initializeJsonValue(function (value) {
            record.settingvalue = value;

            // Pre-process json/javascript value before save
            base.preprocessValueBeforeSave(record);

            // Proceed with standard submit
            self.submit();
         });
      };

      // Set initial json value before saving
      self.initializeJsonValue = function (callback) {

         // If they already put a value in there, don't overwrite it
         if (record.settingvalue) {
            callback(record.settingvalue);
            return;
         }

         if (record.extensiontype === base.TYPE_EXTENDED_VIEW) {
            callback(JSON.stringify({ additions: [], changes: [], deletions: [] }));
         } else if (record.extensiontype === base.TYPE_NEW_VIEW) {
            // Get template json
            DataService.get('api/shared/jsonview/gettemplate', { params: { type: self.template }, busy: true }, function (json) {
               callback(json);
            });
         } else {
            callback('');
         }
      };
   };

   this.extendDetailController = function (self, base, record) {

      // Set value to display for level
      record.$promise.then(function () {
         self.level = record.cono ? base.LEVEL_COMPANY : base.LEVEL_SYSTEM;
      });

      // Update cono when level changes
      self.levelChanged = function () {
         record.cono = self.level === base.LEVEL_SYSTEM ? 0 : UserService.getCono();
      };

      self.validateExtensionId = function () {
         return base.validateExtensionId(record);
      };

      self.validateExtensionValue = function () {
         return base.validateExtensionValue(record);
      };

      self.create = function (type) {
         $state.go('^.create', { type: type });
      };

      self.goToDeveloper = function () {
         if (record.extensiontype === base.TYPE_NEW_VIEW) {
            $state.go('wysiwyg.master', { viewPath: record.screenname, mode: 'new', cono: record.cono, extensionRowId: record.webextendRowID });
         } else if (record.extensiontype === base.TYPE_EXTENDED_VIEW) {
            var viewId = record.screenname;

            // For extended views we need to first get the default view path before going to the wysiwyg
            DataService.get('api/shared/jsonview/getviewpathfromid', { params: { id: viewId }, busy: true }, function (viewPath) {
               if (viewPath) {
                  $state.go('wysiwyg.master', { viewPath: viewPath, mode: 'extend', cono: record.cono, extensionRowId: record.webextendRowID });
               } else {
                  MessageService.error('global.error', 'message.unable.to.find.default.view.for.id');
               }
            });
         }
      };

      self.customSubmit = function () {
         // Pre-process json/javascript value before save
         base.preprocessValueBeforeSave(record);

         // Proceed with standard submit
         self.submit();
      };
   };

   this.getRecord = function (self, base, stateParams) {
      var criteria = {
         webextensionrowid: stateParams.id
      };
      return DataService.getResource('api/shared/assharedinquiry/webextensionretrieve', { data: criteria, method: 'POST', busy: true });
   };

   this.createRecord = function (self, base, record, scope, callback) {
      DataService.post('api/shared/assharedinquiry/webextensioncreate', { data: record, busy: true }, function (newRecord) {

         // View cache is keyed by viewPath (which we don't have here) so just clear whole cache
         JsonViewService.clearViewCache();

         callback(newRecord);

         // If creating a new view, open up the view in wysiwyg so can start editing it.
         // Note: We delay this until transition to master has finished.
         //       If think of a better and reliable way to do this, then do it.
         if (newRecord.extensiontype === base.TYPE_NEW_VIEW) {
            setTimeout(function () {
               $state.go('wysiwyg.master', { viewPath: newRecord.screenname, mode: 'new', cono: newRecord.cono, extensionRowId: newRecord.webextendRowID });
            }, 1300);
         }
      });
   };

   this.updateRecord = function (self, base, record, scope, callback) {
      var doUpdate = function (recordToUpdate) {
         DataService.post('api/shared/assharedinquiry/webextensionupdate', { data: recordToUpdate, busy: true }, function () {
            JsonViewService.clearViewCache();
            callback(recordToUpdate);
         });
      };

      // Create new revision or overwrite current
      MessageService.yesNo('global.new.revision', 'question.would.you.like.to.create.new.revision', function yes() {
         var criteria = { webextensionrowid: record.webextendRowID };
         DataService.post('api/shared/assharedinquiry/webextensioncreaterevision', { data: criteria, busy: true }, function (newRecord) {
            // Apply changes to the revision and proceed with update
            newRecord.activefl = record.activefl;
            newRecord.cono = record.cono;
            newRecord.descrip = record.descrip;
            newRecord.functionname = record.functionname;
            newRecord.screenname = record.screenname;
            newRecord.settingvalue = record.settingvalue;
            newRecord.tag = record.tag;
            doUpdate(newRecord);
         });
      }, function no() {
         doUpdate(record);
      });
   };

   this.deleteRecord = function (self, base, record, scope, callback) {
      DataService.post('api/shared/assharedinquiry/webextensiondelete', { data: [record], busy: true }, callback);
      JsonViewService.clearViewCache();
   };

   this.deleteMultiple = function (self, base, records, scope, callback) {
      DataService.post('api/shared/assharedinquiry/webextensiondelete', { data: records, busy: true }, callback);
      JsonViewService.clearViewCache();
   };

});

app.controller('SaaeaCreateFunctionCtrl', function ($scope, $state, DataService, JsonViewService, MessageService, UserService) {
   var self = this;
   var base = $scope.base;
   self.TYPE_SETUP = 'setup';
   self.TYPE_INQUIRY = 'inquiry';
   self.TYPE_TRANSACTION = 'transaction';
   self.criteria = {
      template: self.TYPE_SETUP,
      level: base.allowSystem ? base.LEVEL_SYSTEM : base.LEVEL_COMPANY,
      activefl: true
   };

   self.moduleChanged = function () {
      self.criteria.module = self.criteria.module.toLowerCase();
   };

   self.functionChanged = function () {
      self.criteria.menuFn = self.criteria.menuFn.toLowerCase();
   };

   self.checkForExistingRecords = function (records, callback) {
      var existingRecords = [];
      var numFinished = 0;

      for (var i = 0; i < records.length; i++) {
         var record = records[i];
         var criteria = {
            level: record.cono ? 'c' : 's',
            screenname: record.screenname,
            statustype: 'b',
            latestrevisiononly: true
         };

         DataService.post('api/shared/assharedinquiry/getwebextensionlist', { data: criteria, busy: true }, function (data) {
            var results = data.webextendrecord;
            numFinished++;

            // Add existing record
            if (results.length > 0) {
               existingRecords.push(results[0]);
            }

            // Do callback after all calls have completed
            if (numFinished === records.length) {
               callback(existingRecords);
            }
         });
      }
   };

   self.createRecords = function (records, callback) {
      var newRecords = [];
      var numFinished = 0;

      for (var i = 0; i < records.length; i++) {
         DataService.post('api/shared/assharedinquiry/webextensioncreate', { data: records[i], busy: true }, function (newRecord) {
            newRecords.push(newRecord);
            numFinished++;

            // Do callback after all calls have completed
            if (numFinished === records.length) {
               callback(newRecords);
            }
         });
      }
   };

   self.submit = function () {

      // Generate source code
      self.generateCode(self.criteria, function (sourceData) {

         // Build extension records
         var records = self.buildExtensionRecords(sourceData);

         // Check if records exist first
         self.checkForExistingRecords(records, function (existingRecords) {
            // If any existing records then throw error and don't proceed
            if (existingRecords.length > 0) {
               var str = MessageService.get('message.the.following.records.already.exist.deleted');
               MessageService.error('global.error', str + '<br>' + self.getExtensionListDisplay(existingRecords));
            } else {
               // Create extension records
               self.createRecords(records, function (newRecords) {
                  // Show confirmation message with extension records
                  var msg = MessageService.get('message.the.following.records.were.created');
                  MessageService.confirmation('global.success', msg + '<br>' + self.getExtensionListDisplay(newRecords));

                  // View cache is keyed by viewPath (which we don't have here) so just clear whole cache
                  JsonViewService.clearViewCache();

                  // Go back to master list and refresh the search
                  base.refreshSearch = true;
                  $state.go('^.master', null, {reload: '^.master'});
               });
            }
         });
      });
   };

   self.generateCode = function (criteria, callback) {
      var path;
      var params = {
         module: criteria.module,
         menuFn: criteria.menuFn,
         keyField: 'field', // something generic
         recordName: 'record' // something generic
      };

      if (criteria.template === self.TYPE_SETUP) {
         path = 'api/shared/jsonview/getcustomsource/setup';
      } else if (criteria.template === self.TYPE_INQUIRY) {
         path = 'api/shared/jsonview/getcustomsource/inquiry';
      } else if (criteria.template === self.TYPE_TRANSACTION) {
         path = 'api/shared/jsonview/getcustomsource/transaction';
      }

      DataService.post(path, { params: params, busy: true }, function (sourceData) {
         callback(sourceData);
      });
   };

   self.buildExtensionRecords = function (sourceData) {
      var module = self.criteria.module;
      var menuFn = self.criteria.menuFn;
      var record, records = [];
      var recordTemplate = {
         activefl: self.criteria.activefl,
         cono: self.criteria.level === base.LEVEL_SYSTEM ? 0 : UserService.getCono(),
         descrip: self.criteria.descrip,
         extensiontype: '',
         functionname: self.criteria.menuFn,
         screenname: '',
         settingvalue: '',
         tag: self.criteria.tag
      };

      // Note: Currently all the template types generate the same 4 records (js, search, master, detail)

      // JS extension
      record = angular.copy(recordTemplate);
      record.screenname = 'extension-' + module + '-' + menuFn + '-js';
      record.settingvalue = sourceData.jsCode;
      record.extensiontype = base.TYPE_JAVASCRIPT;
      records.push(record);

      // Search view extension
      record = angular.copy(recordTemplate);
      record.screenname = 'extension-' + module + '-' + menuFn + '-search';
      record.settingvalue = sourceData.searchView;
      record.extensiontype = base.TYPE_NEW_VIEW;
      records.push(record);

      // Master view extension
      record = angular.copy(recordTemplate);
      record.screenname = 'extension-' + module + '-' + menuFn + '-master';
      record.settingvalue = sourceData.masterView;
      record.extensiontype = base.TYPE_NEW_VIEW;
      records.push(record);

      // Detail view extension
      record = angular.copy(recordTemplate);
      record.screenname = 'extension-' + module + '-' + menuFn + '-detail';
      record.settingvalue = sourceData.detailView;
      record.extensiontype = base.TYPE_NEW_VIEW;
      records.push(record);

      return records;
   };

   self.getExtensionListDisplay = function (records) {
      var extensionList = '';

      // Get list of extension ids
      records.forEach(function (rec) {
         extensionList += '<br>' + rec.screenname;
      });

      return extensionList;
   };
});

app.controller('SaaeaImportCtrl', function ($scope, $state, $stateParams, $timeout, $translate, DataService, GridService, MessageService, Constants, Utils, UserService) {
   var self = this;
   var base = $scope.base;

   self.importExtensions = [];
   self.defaultGrid = {};
   self.dataSet = [];

   self.importedFile = null;

   self.importFile = function () {
      if (self.importedFile) {
         $timeout(function () {
            Utils.readAsArrayBuffer(self.importedFile, function (readData) {
               var headers = {
                  'Content-Type': 'application/binary'
               };
               DataService.post('api/shared/jsonview/importextensionspartone', { data: readData, headers: headers, busy: true, transformRequest: [] }, function (data) {
                  if (data) {
                     data.forEach(function (item) {
                        item.level = item.cono === 0 ? base.LEVEL_SYSTEM : base.LEVEL_COMPANY;
                     });
                     self.dataSet = data;
                  }
               });
            });
         });
      }
   };

   self.importRecords = function () {
      if (!self.defaultGrid.isNoRowSelected()) {
         var records = GridService.getSelectedRecords(self.defaultGrid);
         records.forEach(function (item) {
            item.cono = item.level === base.LEVEL_SYSTEM ? 0 : UserService.getCono();
         });
         DataService.post('api/shared/jsonview/importextensionsparttwo', { data: records, busy: true }, function () {
            self.defaultGrid.loadData([]);
         });
      }
   };
});