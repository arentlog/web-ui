'use strict';

/**
 * Alias: base
 */
app.controller('SetupBaseCtrl', function ($scope, $state, $stateParams, menuMeta, menuService, ConfigService, DataService, MessageService, Sasoo, Utils) {
   var self = this;
   var menuFn = menuMeta.menuFn;
   var moreRecordsField = menuMeta.searchMoreRecordsField || 'lMoreRecords';

   // Set criteria on the base controller so both the search component and master component have access
   self.criteria = {};

   // Initialize criteria used object (to avoid undefined errors)
   self.criteriaUsed = {};

   // Flag to tell the master ctrl when to re-run the search call
   self.refreshSearch = false;

   // Recently Visited Options
   if (menuMeta.recentlyVisited) {
      self.recentlyVisitedOptions = {
         controlRef: 'base.recentlyVisitedControl',
         listKey: menuFn,
         rowIdField: menuMeta.recordRowIdField || 'rowID',
         stateRef: menuFn + '.detail',
         title: menuMeta.recentlyVisited.title,
         description: menuMeta.recentlyVisited.description
      };
   }

   self.isMaster = function () {
      return $state.is(menuFn + '.master');
   };

   self.includesMaster = function () {
      return $state.includes(menuFn + '.master');
   };

   self.isCreate = function () {
      return $state.is(menuFn + '.create');
   };

   self.includesCreate = function () {
      return $state.includes(menuFn + '.create');
   };

   self.isDetail = function () {
      return $state.is(menuFn + '.detail');
   };

   self.includesDetail = function () {
      return $state.includes(menuFn + '.detail');
   };

   self.isEdit = function () {
      return $state.is(menuFn + '.detail.edit');
   };

   self.isCopy = function () {
      return $state.is(menuFn + '.copy');
   };

   self.includesCopy = function () {
      return $state.includes(menuFn + '.copy');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      // Add any default criteria from 'searchCriteria' option
      if (menuMeta.searchCriteria) {
         for (var prop in menuMeta.searchCriteria) {
            if (menuMeta.searchCriteria.hasOwnProperty(prop)) {
               self.criteria[prop] = menuMeta.searchCriteria[prop];
            }
         }
      }

      // Add default record limit to specified field on criteria
      if (menuMeta.searchRecordLimitField) {
         self.criteria[menuMeta.searchRecordLimitField] = ConfigService.getDefaultRecordLimit();
      }

      // Add default warehouse if requested
      if (menuMeta.searchDefaultWarehouseField) {
         self.criteria[menuMeta.searchDefaultWarehouseField] = Sasoo.whse;
      }
   };

   // Perform search and update data set for the grid
   self.search = function (isRefresh) {

      // Store a copy of the used criteria since in some cases there is functionality that relies on the criteria
      // for more than just searching, and we need the used criteria (not the latest which the user might change)
      self.criteriaUsed = angular.copy(self.criteria);

      // Perform custom search or standard
      if (menuService && menuService.search) {
         menuService.search(self, self.criteria, $scope, function (dataset) {
            if (dataset) {
               self.dataset = dataset;
            } else {
               self.dataset = [];
            }
         });
      } else {
         var options = {
            method: menuMeta.searchMethod,
            busy: true
         };

         // GET calls send criteria as url/query params; others send criteria as request data
         if (menuMeta.searchMethod === 'GET') {
            options.params = self.criteria;
         } else {
            options.data = self.criteria;
         }

         // Get results & update grid
         DataService.send(menuMeta.searchPath, options, function (data) {
            self.dataset = menuMeta.searchResultsField ? Utils.getNestedValue(data, menuMeta.searchResultsField) : data;

            // Show record count limit warning if more records flag is true (but not on refresh search since redundant)
            if (data[moreRecordsField] && !isRefresh) {
               MessageService.alert('global.warning', 'global.record.count.limit.has.been.reached');
            }
         });
      }
   };

   // Perform initialization of search criteria
   self.initCriteria();

   // Call custom extend function if specified
   if (menuService && menuService.extendBaseController) {
      menuService.extendBaseController(self, self.criteria, $scope, $stateParams);
   }
});

/**
 * Alias: srch
 */
app.controller('SetupSearchCtrl', function ($scope, $state, $stateParams, menuMeta, menuService, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;
   var menuFn = menuMeta.menuFn;

   // Reset search criteria
   self.clear = function () {
      // Remove all properties from criteria object
      // Note: We don't want to simply assign a new object because other code has references to the object
      Utils.clearObject(criteria);

      // Re-initialize criteria (for default values and record limit)
      base.initCriteria();
   };

   // Perform search
   self.submit = function () {
      // Go back to master state if not already there
      if (!base.isMaster()) {
         $state.go(menuFn + '.master');
      }

      base.search();
   };

   // Call custom extend function if specified
   if (menuService && menuService.extendSearchController) {
      menuService.extendSearchController(self, base, criteria, $scope, $stateParams);
   }
});

/**
 * Alias: mst
 */
app.controller('SetupMasterCtrl', function ($scope, $state, $stateParams, menuMeta, menuService, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;
   var dataPath = menuMeta.dataPath;
   var resultsRowIdField = menuMeta.resultsRowIdField;

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if (base.refreshSearch) {
      base.search(true);

      // Reset refresh flag
      base.refreshSearch = false;
   }

   // Drill down
   self.drilldown = function (e, args) {
      var record = args[0].item;

      // Go to detail state passing the row id
      $state.go('^.detail', {
         id: record[resultsRowIdField],
         object: menuMeta.passGridRecord ? record : null // Pass the selected object for those special cases that need it
      });
   };

   // Create new
   self.create = function () {
      $state.go('^.create');
   };

   // Edit selected record in grid
   self.edit = function () {
      var record = GridService.getSelectedRecord(base.grid);

      // Proceed if one row is selected
      if (record) {
         // Go to detail.edit state passing the row id
         $state.go('^.detail.edit', {
            id: record[resultsRowIdField],
            object: menuMeta.passGridRecord ? record : null // Pass the selected object for those special cases that need it
         });
      }
   };

   // Copy selected record(s) in grid
   self.copy = function () {
      if (menuMeta.copyMultiple) {
         var records = GridService.getSelectedRecords(base.grid);

         // Proceed if at least one row is selected
         if (records && records.length) {
            $state.go('^.copy', { records: records, fromMaster: true });
         }
      } else {
         var record = GridService.getSelectedRecord(base.grid);

         // Proceed if one row is selected
         if (record) {
            $state.go('^.copy', { id: record[resultsRowIdField], object: record, fromMaster: true });
         }
      }
   };

   // Delete multiple from grid
   self.delete = function () {
      var records = GridService.getSelectedRecords(base.grid);

      // Proceed if any rows are selected
      if (records && records.length) {
         var message = menuMeta.deleteMultipleMessage || 'question.are.you.sure.you.want.to.delete';

         MessageService.okCancel('global.delete.confirmation', message, function () {
            var deleteCallback = function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');

               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('^.master', null, {reload: '^.master'});
            };

            var deleteCallbackWithFails = function () {
               MessageService.info('global.information', 'message.delete.operation.attempted');

               // Go back to master list and refresh the search
               base.refreshSearch = true;
               $state.go('^.master', null, { reload: '^.master' });
            };

            // Perform custom delete multiple or standard
            if (menuService && menuService.deleteMultiple) {
               menuService.deleteMultiple(self, base, records, $scope, deleteCallback);
            } else {
               var rowIds = GridService.getSelectedRowIds(base.grid, resultsRowIdField);

               DataService.delete(dataPath + '/deletelistbyrowids', { data: rowIds, busy: true }, deleteCallback, deleteCallbackWithFails);
            }
         });
      }
   };

   // Call custom extend function if specified
   if (menuService && menuService.extendMasterController) {
      menuService.extendMasterController(self, base, $scope, $stateParams);
   }
});

/**
 * Alias: dtl (since create and detail state often use the same view, they use the same alias "dtl")
 */
app.controller('SetupCreateCtrl', function ($scope, $state, $stateParams, $stickyState, menuMeta, menuService, DataService, MessageService, UserService) {
   var self = this;
   var base = $scope.base;
   var menuFn = menuMeta.menuFn;
   var recordName = menuMeta.recordName || menuFn;
   var rowIdField = menuMeta.recordRowIdField || 'rowID';
   var dataPath = menuMeta.dataPath;
   var subTitle = MessageService.get('global.new');

   // TODO: the cono should be set server-side for security purposes
   self[recordName] = {
      cono: UserService.getCono()
   };

   // Get sub title to display when in the create state
   self.getSubTitle = function () {
      return subTitle;
   };

   self.reset = function () {
      $state.go('^.create', null, {reload: '^.create'});
   };

   self.cancel = function () {
      $state.go('^.master');
   };

   // Perform save
   self.submit = function () {
      var saveCallback = function (newRecord) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // Update recently visited list with new record (if have new record with a row id)
         if (menuMeta.recentlyVisited && newRecord && newRecord[rowIdField]) {
            base.recentlyVisitedControl.addToList(newRecord);
         }

         // Set refresh search flag
         base.refreshSearch = true;

         // Reset the master state so that the search results will refresh (possibly with new record) next time we go back to master
         $stickyState.reset('^.master');

         // Go to post-create state (if specified); otherwise go back to master list and refresh the search
         // Note: normally postCreateState would be used to go to '^.detail.edit' to more fully edit the record (so we pass the id param)
         if (menuMeta.postCreateState) {
            $state.go(menuMeta.postCreateState, {id: newRecord[rowIdField]});
         } else {
            $state.go('^.master', null, {reload: '^.master'});
         }
      };

      // Perform custom save or standard
      if (menuService && menuService.createRecord) {
         menuService.createRecord(self, base, self[recordName], $scope, saveCallback);
      } else {
         DataService.create(dataPath, {data: self[recordName], busy: true}, saveCallback);
      }
   };

   // Call custom extend function if specified
   if (menuService && menuService.extendCreateController) {
      menuService.extendCreateController(self, base, self[recordName], $scope, $stateParams);
   }
});

/**
 * Alias: dtl
 */
app.controller('SetupDetailCtrl', function ($scope, $state, $stateParams, $stickyState, menuMeta, menuService, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var dataPath = menuMeta.dataPath;
   var menuFn = menuMeta.menuFn;
   var recordName = menuMeta.recordName || menuFn;
   var rowIdField = menuMeta.recordRowIdField || 'rowID';
   var subTitle = '';

   // Perform custom fetch of record or standard
   if (menuService && menuService.getRecord) {
      self[recordName] = menuService.getRecord(self, base, $stateParams, $scope);
   } else {
      var resourcePath;
      var params = {};

      // Handle both id param and pk params (pk is useful for hyperlinks)
      if ($stateParams.id) {
         resourcePath = dataPath + '/getbyrowid/' + $stateParams.id;
      } else {
         resourcePath = dataPath + '/getbypk';
         var pkArray = menuMeta.primaryKeyParams;

         // Add pk params (as they exist) for use as url/query params in the 'getbypk' api call.
         // pk, pk2, etc. stateParams match up with the order of the primaryKeyParams array ['orderno', 'ordersuf']
         if (pkArray) {
            if (pkArray.length >= 0 && $stateParams.pk !== undefined) {
               params[pkArray[0]] = $stateParams.pk;
            }
            if (pkArray.length >= 1 && $stateParams.pk2 !== undefined) {
               params[pkArray[1]] = $stateParams.pk2;
            }
            if (pkArray.length >= 2 && $stateParams.pk3 !== undefined) {
               params[pkArray[2]] = $stateParams.pk3;
            }
            if (pkArray.length >= 3 && $stateParams.pk4 !== undefined) {
               params[pkArray[3]] = $stateParams.pk4;
            }
            if (pkArray.length >= 4 && $stateParams.pk5 !== undefined) {
               params[pkArray[4]] = $stateParams.pk5;
            }
            if (pkArray.length >= 5 && $stateParams.pk6 !== undefined) {
               params[pkArray[5]] = $stateParams.pk6;
            }
         } else {
            // Help developers with a clear message of how to get hyperlinks working
            console.error('In order for a Setup function to handle hyperlinks, the metadata must contain the "primaryKeyParams" array option.');
         }
      }

      // Add fillmode=true if requested (to fetch additional data)
      if (menuMeta.fillmode) {
         resourcePath += '?fillmode=true';
      }

      // Get record
      self[recordName] = DataService.getResource(resourcePath, { params: params, busy: true });
   }

   // After the record is resolved
   self[recordName].$promise.then(function () {
      if (!self[recordName] || self[recordName].$resolved === false) {
         // If record could not be found, notify the user
         MessageService.error('global.error', 'error.record.not.found');

         // Go back to master list (may be in detail or in edit state)
         $state.go(menuFn + '.master');
      } else {
         // Update recently visited list
         if (self[recordName] && menuMeta.recentlyVisited) {
            base.recentlyVisitedControl.addToList(self[recordName]);
         }

         // Build sub title (using the array of sub title pieces defined in the metadata)
         if (menuMeta.detailSubTitle) {
            subTitle = Utils.buildSubTitle(self[recordName], menuMeta.detailSubTitle);
         }
      }
   });

   // Get sub title to display when in the detail state
   self.getSubTitle = function () {
      return subTitle;
   };

   // Create new
   self.create = function () {
      $state.go('^.create');
   };

   // Reset
   self.reset = function () {
      $state.go('^.edit', null, {reload: '^'});
   };

   // Cancel
   self.cancel = function () {
      $state.go('^', null, {reload: '^'});
   };

   // Copy
   self.copy = function () {
      $state.go('^.copy', {id: self[recordName][rowIdField], object: self[recordName]});
   };

   // Delete
   self.delete = function () {
      var message = menuMeta.deleteRecordMessage || 'question.are.you.sure.you.want.to.delete';

      MessageService.okCancel('global.delete.confirmation', message, function () {
         var deleteCallback = function () {
            MessageService.info('global.information', 'message.delete.operation.completed.successfully');

            // Go back to master list and refresh the search
            base.refreshSearch = true;
            $state.go('^.master', null, {reload: '^.master'});
         };

         // Perform custom delete or standard
         if (menuService && menuService.deleteRecord) {
            menuService.deleteRecord(self, base, self[recordName], $scope, deleteCallback);
         } else {
            DataService.delete(dataPath, {data: self[recordName], busy: true}, deleteCallback);
         }
      });
   };

   // Perform save
   self.submit = function () {
      var saveCallback = function (updatedRecord) {
         MessageService.info('global.information', 'message.save.operation.completed.successfully');

         // Update recently visited list with updated record (since key display values may have changed)
         if (updatedRecord && menuMeta.recentlyVisited) {
            base.recentlyVisitedControl.addToList(updatedRecord);
         }

         // Go back to master list and refresh the search
         base.refreshSearch = true;
         $state.go('^.^.master', null, {reload: '^.^.master'});
      };

      // Perform custom save or standard
      if (menuService && menuService.updateRecord) {
         menuService.updateRecord(self, base, self[recordName], $scope, saveCallback);
      } else {
         DataService.update(dataPath, {data: self[recordName], busy: true}, saveCallback);
      }
   };

   // Call custom extend function if specified
   if (menuService && menuService.extendDetailController) {
      menuService.extendDetailController(self, base, self[recordName], $scope, $stateParams);
   }
});

/**
 * Alias: cpy
 */
app.controller('SetupCopyCtrl', function ($scope, $state, $stateParams, $stickyState, menuMeta, menuService, DataService, MessageService, Utils) {
   var self = this;
   var base = $scope.base;
   var recordToCopy = $stateParams.object;
   var resultsRowIdField = menuMeta.resultsRowIdField || 'rowID';

   // Create the object to hold the data to send to the copy request api call
   // Note: it can be a defined object (or array) from the metadata (make a fresh copy to avoid residual data),
   // or it will just default to an empty object
   self.request = menuMeta.copyRequest ? angular.copy(menuMeta.copyRequest) : {};

   // Build sub title (using the array of sub title pieces defined in the metadata)
   var subTitle = menuMeta.copySubTitle && recordToCopy ? Utils.buildSubTitle(recordToCopy, menuMeta.copySubTitle) : '';

   // Get sub title to display when in the copy state
   self.getSubTitle = function () {
      return subTitle;
   };

   // Cancel
   self.cancel = function () {
      // We may have come into copy from master or from detail
      if ($stateParams.fromMaster) {
         $state.go('^.master');
      } else {
         $state.go('^.detail', {id: recordToCopy[resultsRowIdField]});
      }
   };

   // Perform copy
   self.submit = function () {
      var copyCallback = function (data) {
         MessageService.info('global.information', 'message.copy.operation.completed.successfully');

         // Set refresh search flag
         base.refreshSearch = true;

         // Reset the master state so that the search results will refresh (possibly with new record) next time we go back to master
         $stickyState.reset('^.master');

         // Our standard is that all copy api calls have a 'rowid' field on the response object (or array of objects)
         var copyResponseRowIdField = menuMeta.copyResponseRowIdField || 'rowid';
         var rowid = null;
         if (data) {
            if (Array.isArray(data)) {
               rowid = data[0][copyResponseRowIdField];
            } else {
               rowid = data[copyResponseRowIdField];
            }
         }

         // Go to post-copy state (if specified); otherwise the default is to go to detail.edit
         if (menuMeta.postCopyState) {
            $state.go(menuMeta.postCopyState, {id: rowid});
         } else {
            if (rowid) {
               $state.go('^.detail.edit', {id: rowid});
            } else {
               // Log error to help developers and go back to master
               console.log('Error: Cannot find "rowid" on the copy call response.');
               $state.go('^.master', null, {reload: '^.master'});
            }
         }
      };

      // Perform custom copy or standard
      if (menuService && menuService.submitCopyRequest) {
         menuService.submitCopyRequest(self, base, self.request, $scope, $stateParams, copyCallback);
      } else {
         var options = {
            method: menuMeta.copyMethod, // call maybe be GET, POST, etc.
            pathParams: self.request, // some calls (GET calls) apply criteria to params on the path
            data: self.request, // others send criteria as request data
            busy: true
         };

         DataService.send(menuMeta.copyPath, options, copyCallback);
      }
   };

   // Call custom extend function if specified
   if (menuService && menuService.extendCopyController) {
      menuService.extendCopyController(self, base, self.request, $scope, $stateParams);
   }
});
