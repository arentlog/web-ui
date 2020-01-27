'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'saapa',
      dataPath: '', // blank since not using any standard calls
      recordName: 'record',
      recordRowIdField: 'webmodRowID',
      searchMethod: 'POST',
      searchPath: 'api/shared/assharedentry/getwebmodificationlist',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'webmodlistresults',
      resultsRowIdField: 'webmodRowID',
      copyStateView: 'sa/saapa/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/shared/assharedentry/webmodificationcreate',
      copyResponseRowIdField: 'webmodRowID',
      postCopyState: '^.detail',
      detailSubTitle: [
         {label: null, value: 'screenname'}
      ],
      recentlyVisited: {
         title: {label: null, value: 'screenname'},
         description: [
            {label: null, valueFunction: 'base.getLevelDisplay'}
         ]
      }
   });

   $stateProvider.state('saapa.import', {
      url: '/import',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('sa/saapa/import.json');
            },
            controller: 'SaapaImportCtrl as imp'
         }
      }
   });

});

app.service('SaapaService', function ($state, DataService, JsonViewService, MessageService, PvUser, TabService,
                                      UserService, Utils, GridService) {

   this.extendBaseController = function (self, criteria) {
      self.LEVEL_ALL = '';
      self.LEVEL_COMPANY = 'c';
      self.LEVEL_PROFILE = 'p';
      self.LEVEL_USER = 'o';

      // Determine which levels user has access to
      var accessLevel = PvUser.webmodificationaccesslevel ? PvUser.webmodificationaccesslevel.toLowerCase() : '';
      self.allowCompany = accessLevel === 'c';
      self.allowProfile = accessLevel === 'c' || accessLevel === 'p';
      self.allowUser = accessLevel === 'c' || accessLevel === 'p' || accessLevel === 'u';

      self.personalizationLevelOptions = [];
      if (self.allowCompany) {
         self.personalizationLevelOptions.push({ value: self.LEVEL_COMPANY, label: MessageService.get('global.company') });
      }
      if (self.allowProfile) {
         self.personalizationLevelOptions.push({ value: self.LEVEL_PROFILE, label: MessageService.get('global.profile') });
      }
      if (self.allowUser) {
         self.personalizationLevelOptions.push({ value: self.LEVEL_USER, label: MessageService.get('global.user') });
      }

      // Level options for search (same but add the all/blank option if all levels allowed)
      self.personalizationLevelSearchOptions = angular.copy(self.personalizationLevelOptions);
      if (self.allowCompany) {
         self.personalizationLevelSearchOptions.unshift({ value: self.LEVEL_ALL, label: '' });
      }

      // Set default values for level
      self.initializeLevelCriteria = function () {
         if (self.allowCompany) {
            criteria.level = self.LEVEL_ALL;
         } else if (self.allowProfile) {
            criteria.level = self.LEVEL_PROFILE;
         } else if (self.allowUser) {
            criteria.level = self.LEVEL_USER;
         }
      };

      self.levelFormatter = function (row, cell, value, column, item) {
         if (item.operator) {
            return MessageService.get('global.user');
         }
         if (item.profile) {
            return MessageService.get('global.profile');
         }
         if (item.cono) {
            return MessageService.get('global.company');
         }
      };

      // Formatter for level display in Recently Visited
      self.getLevelDisplay = function (record) {
         if (record.operator) {
            return MessageService.get('global.user') + ': ' + record.operator;
         }
         if (record.profile) {
            return MessageService.get('global.profile') + ': ' + record.profile;
         }
         if (record.cono) {
            return MessageService.get('global.company') + ': ' + record.cono;
         }
      };

      // Get the level of a record
      self.getLevelFromRecord = function (record) {
         if (record.operator) {
            return self.LEVEL_USER;
         }
         if (record.profile) {
            return self.LEVEL_PROFILE;
         }
         if (record.cono) {
            return self.LEVEL_COMPANY;
         }
      };

      // Validate the JSON
      self.validateJsonValue = function (record) {
         var json = record.settingvalue;

         if (json) {
            var errorMessages = '';
            var data;

            // Try to parse the json, and return error if it doesn't parse properly
            try {
               data = JSON.parse(json);
            } catch (error) {
               return MessageService.get(error.message);
            }

            // Check that "id" properties are valid numbers (not strings)
            for (var i = 0; i < data.changes.length; i++) {
               var change = data.changes[i];

               if (typeof change.id !== 'number' || change.id <= 0) {
                  errorMessages += MessageService.get('message.json.invalid.id', { id: change.id }) + ' ';
               }
            }

            // Return errors if any
            if (errorMessages) {
               return errorMessages;
            }
         }

         return true;
      };

      // If user doesn't have a proper Web Mod Access Level, then boot them out of this function
      if (!self.allowCompany && !self.allowProfile && !self.allowUser) {
         MessageService.error('global.error', 'message.error.saapa.webmod.access.level');
         TabService.closeTab('saapa');
      }
   };

   this.extendSearchController = function (self, base, criteria) {

      // Set initial values for level
      base.initializeLevelCriteria();

      // Clear certain fields when level changes
      self.levelChanged = function () {
         criteria.operator = '';
         criteria.profile = '';
      };

      // Reset button should perform the standard clear then reset the level
      self.customClear = function () {
         self.clear();
         base.initializeLevelCriteria();
      };

      // Search button should remember the level searched then perform the standard search
      self.customSubmit = function () {
         base.levelSearched = criteria.level;
         self.submit();
      };
   };

   this.extendMasterController = function (self, base) {

      self.download = function () {
         var records = GridService.getSelectedRecords(base.grid);
         if (records && records.length > 0) {
            var criteria = [];
            records.forEach(function (item) {
               criteria.push(item.webmodRowID);
            });
            DataService.post('api/shared/jsonview/exportwebmodifications', { data: criteria, busy: true, method: 'POST', responseType: 'arraybuffer' }, function (data) {
               if (data) {
                  var blob = new Blob([data], { type: 'application/zip' });
                  saveAs(blob, 'webmodifications-' + Utils.returnDateTimeStamp() + '.zip');
               }
            });
         }
      };
   };

   this.extendCreateController = function (self, base, record) {
      record.cono = UserService.getCono();
      record.settingvalue = JSON.stringify({ changes: [] });

      // Set initial level value (we first try to use current criteria value as a convenience)
      if (base.criteria.level) {
         self.level = base.criteria.level;
      } else if (base.allowCompany) {
         self.level = base.LEVEL_COMPANY;
      } else if (base.allowProfile) {
         self.level = base.LEVEL_PROFILE;
      } else if (base.allowUser) {
         self.level = base.LEVEL_USER;
      }

      // Clear certain fields when level changes
      self.levelChanged = function () {
         record.operator = '';
         record.profile = '';
      };

      self.validateJsonValue = function () {
         return base.validateJsonValue(record);
      };
   };

   this.extendDetailController = function (self, base, record) {

      // Set value to display for level
      record.$promise.then(function () {
         self.level = base.getLevelFromRecord(record);
      });

      // Clear certain fields when level changes
      self.levelChanged = function () {
         record.operator = '';
         record.profile = '';
      };

      self.validateJsonValue = function () {
         return base.validateJsonValue(record);
      };

      self.goToDeveloper = function () {
         var viewId = record.screenname;

         // If it's a personalization of a new extension view, then the viewId acts as the viewPath
         if (viewId.startsWith('extension-')) {
            $state.go('personalize.master', { viewPath: viewId, level: self.level, profile: record.profile, user: record.operator });
         } else {
            // We need to first get the default view path before going to the wysiwyg
            DataService.get('api/shared/jsonview/getviewpathfromid', { params: { id: viewId }, busy: true }, function (viewPath) {
               if (viewPath) {
                  $state.go('personalize.master', { viewPath: viewPath, level: self.level, profile: record.profile, user: record.operator });
               } else {
                  MessageService.error('global.error', 'message.unable.to.find.default.view.for.id');
               }
            });
         }
      };
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      // Get record to copy by row id (latest from database since grid could be stale)
      var criteria = { webmodRowID: stateParams.id };
      DataService.post('api/shared/assharedentry/webmodificationread', { data: criteria, busy: true }, function (recordToCopy) {
         // Initialize new record
         request.cono = recordToCopy.cono;
         request.profile = recordToCopy.profile;
         request.operator = recordToCopy.operator;
         request.screenname = recordToCopy.screenname;
         request.functionname = recordToCopy.functionname;
         request.settingvalue = recordToCopy.settingvalue;

         // Set initial level value
         self.level = base.getLevelFromRecord(recordToCopy);
      });

      // Clear certain fields when level changes
      self.levelChanged = function () {
         request.operator = '';
         request.profile = '';
      };

      self.customSubmit = function () {
         // Clear view cache since adding a new personalization record
         JsonViewService.clearViewCache();

         // Perform standard submit
         self.submit();
      };
   };

   this.getRecord = function (self, base, stateParams) {
      var criteria = {
         webmodRowID: stateParams.id
      };
      return DataService.getResource('api/shared/assharedentry/webmodificationread', { data: criteria, method: 'POST', busy: true });
   };

   this.createRecord = function (self, base, record, scope, callback) {
      DataService.post('api/shared/assharedentry/webmodificationcreate', { data: record, busy: true }, function (data) {

         // View cache is keyed by viewPath (which we don't have here) so just clear whole cache
         JsonViewService.clearViewCache();

         callback(data);
      });
   };

   this.updateRecord = function (self, base, record, scope, callback) {
      DataService.post('api/shared/assharedentry/webmodificationupdate', { data: record, busy: true }, function () {
         JsonViewService.clearViewCache();
         callback(record);
      });
   };

   this.deleteRecord = function (self, base, record, scope, callback) {
      DataService.post('api/shared/assharedentry/webmodificationdelete', { data: [record], busy: true }, callback);
      JsonViewService.clearViewCache();
   };

   this.deleteMultiple = function (self, base, records, scope, callback) {
      DataService.post('api/shared/assharedentry/webmodificationdelete', { data: records, busy: true }, callback);
      JsonViewService.clearViewCache();
   };

});

app.controller('SaapaImportCtrl', function ($scope, $state, $stateParams, $timeout, $translate, DataService, GridService, MessageService, Constants, Utils, UserService) {
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
               DataService.post('api/shared/jsonview/importwebmodificationspartone', { data: readData, headers: headers, busy: true, transformRequest: [] }, function (data) {
                  if (data) {
                     data.forEach(function (item) {
                        if (item.errorMessage) {
                           item.errorMessage = $translate.instant(item.errorMessage);
                        } else {
                           item.errorMessage = '';
                        }

                        if (item.willOverwrite) {
                           item.errorMessage = $translate.instant('special.saapa.import.duplicate') + '  ' + item.errorMessage;
                        }
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

         var resp = $.grep(records, function (p) { return p.willOverwrite; });
         if (resp && resp.length > 0) {
            MessageService.okCancel('global.warning',
               'special.saapa.import.duplicate',
               function() {
                  self.postRecords(records);
               });
         } else {
            self.postRecords(records);
         }
      }
   };

   self.postRecords = function (records) {
      DataService.post('api/shared/jsonview/importwebmodificationsparttwo', { data: records, busy: true }, function () {
         self.defaultGrid.loadData([]);
      });
   };

});