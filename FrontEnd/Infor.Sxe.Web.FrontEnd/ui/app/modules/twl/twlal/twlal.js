'use strict';

//TWL Label Setup Configuration
app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlal', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlal');

   $stateProvider.state('twlal.detail', {
      url: '/detail',
      params: {
         labelType: null,
         rowId: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlal/detail.json');
            },
            controller: 'TwlalDetailCtrl as dtl'
         }
      }
   });

   $stateProvider.state('twlal.externalLabelSetup', {
      url: '/external-label-setup',
      params: {
         sysName: null,
         appId: null
      },
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlal/external-label-setup.json');
            },
            controller: 'TwlalExternalLabelSetupCtrl as els'
         }
      }
   });
});

app.controller('TwlalBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.criteria = {};
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.USAGETYPE_LEGACY_ZEBRA = 'L';
   self.USAGETYPE_UNIBAR = 'U';
   self.RECORDTYPE_DEFAULT = 0;
   self.RECORDTYPE_SPECIFIC = 1;
   self.SYSNAME_TWL = 'TWL';
   self.APPID_UNIBAR = 'unibar';

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;

   self.criteriaUsed = {};
   self.isLegacyOnly = false;

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') +
         self.LABEL_DELIMITER +
         (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlal.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlal.master');
   };

   self.isDetail = function () {
      return $state.is('twlal.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlal.detail');
   };

   //NOTE: This will get called if the user changes the Warehouse in search, because the Warehouse
   //value will determine the values in the Dropdown.
   self.setCriteriaDefaults = function () {
      //We want to use the values on the Criteria because the 'CriteriaUsed' won't get set until
      //they actually perform the search.
      var params = {
         coNum: self.criteria.coNum,
         whNum: self.criteria.whNum
      };
      DataService.get('api/twl/parameters/getbypk', { params: params }, function (data) {
         //If they do not have any other label type turned on
         //at the warehouse level, then only show legacy setting.
         if (data) {
            if (data.labelPrintType.toUpperCase() !== self.USAGETYPE_UNIBAR) {
               self.isLegacyOnly = true;
            } else {
               self.isLegacyOnly = false;
            }
         } else {
            self.isLegacyOnly = true;
         }

         self.criteria.usageType = self.isLegacyOnly ? self.USAGETYPE_LEGACY_ZEBRA : self.USAGETYPE_UNIBAR;
         self.criteria.recordType = self.RECORDTYPE_SPECIFIC;
      });
   };

   //If the user changes any of the dropdowns, we want to clear the results.  It's too confusing to leave
   //residual data out there.  They can get confused seeing old data before hitting the Search.
   self.clearResults = function () {
      self.legacyDataset = [];
      self.unibarDataset = [];
   };

   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;

      self.setCriteriaDefaults();
   };

   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);

      var getlabeluserdefinedconfigurationsCriteria = {
         coNum: self.criteriaUsed.coNum,
         whNum: self.criteriaUsed.whNum,
         usageType: self.criteria.usageType,
         recordType: self.criteria.recordType,
         printerId: self.criteria.printerId
      };

      DataService.post('api/twl/astwladmin/getlabeluserdefinedconfigurations', { data: getlabeluserdefinedconfigurationsCriteria, busy: true }, function (data) {
         if (data) {
            if (self.criteria.usageType.toUpperCase() === self.USAGETYPE_LEGACY_ZEBRA) {
               self.legacyDataset = data;
            } else if (self.criteria.usageType.toUpperCase() === self.USAGETYPE_UNIBAR) {
               self.unibarDataset = data;
            }
         }
      });
   };

   self.initCriteria();
});

app.controller('TwlalSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('twlal.master');
      }

      base.search();
   };
});

app.controller('TwlalMasterCtrl', function ($scope, $state, $stateParams, DataService, GridService, MessageService) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }

   //NOTE: There are 2 separate grids and only one is visible based on the UsageType: "Legacy" or "Unibar".

   self.createLegacyOverideRecord = function () {
      var selectedRows = GridService.getSelectedRecords(base.legacyGrid);
      if (selectedRows) {
         var requestCriteriaList = [];
         selectedRows.forEach(function (selectedRow) {
            var requestCriteria = {
               coNum: base.criteriaUsed.coNum,
               whNum: base.criteriaUsed.whNum,
               rowId: selectedRow.rowID
            };
            requestCriteriaList.push(requestCriteria);
         });


         DataService.post('api/twl/astwladmin/createlabelcompanylevelconfiguration', { data: requestCriteriaList, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            //Refresh so we get the Overridden flag properly set
            base.search();
         });
      }
   };

   self.createUnibarOverideRecord = function () {
      var selectedRows = GridService.getSelectedRecords(base.unibarGrid);
      if (selectedRows) {
         var requestCriteriaList = [];
         selectedRows.forEach(function(selectedRow) {
            var requestCriteria = {
               coNum: base.criteriaUsed.coNum,
               whNum: base.criteriaUsed.whNum,
               printerId: base.criteria.printerId,
               rowId: selectedRow.rowID
            };
            requestCriteriaList.push(requestCriteria);
         });

         DataService.post('api/twl/astwladmin/createlabelprinterlevelconfiguration', { data: requestCriteriaList, busy: true }, function () {
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
            //Refresh so we get the Overridden flag properly set
            base.search();
         });
      }
   };

   self.convertGridRowsToDeleteCriteria = function (selectedRows) {
      var rowsToDelete = [];
      selectedRows.forEach(function (row) {
         var rowToDelete = {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            recordType: base.criteria.recordType,
            rowId: row.rowID
         };
         rowsToDelete.push(rowToDelete);
      });

      return rowsToDelete;
   };

   self.deleteLegacy = function () {
      var rowsToDelete = self.convertGridRowsToDeleteCriteria(GridService.getSelectedRecords(base.legacyGrid));
      if (rowsToDelete && rowsToDelete.length > 0) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         // Yes processing
         function () {
            DataService.post('api/twl/astwladmin/deletelabeluserdefinedconfigurations', { data: rowsToDelete, busy: true }, function () {
               base.search();
            });
         });
      }
   };

   self.deleteUnibar = function () {
      var rowsToDelete = self.convertGridRowsToDeleteCriteria(GridService.getSelectedRecords(base.unibarGrid));
      if (rowsToDelete && rowsToDelete.length > 0) {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         // Yes processing
         function () {
            DataService.post('api/twl/astwladmin/deletelabeluserdefinedconfigurations', { data: rowsToDelete, busy: true }, function () {
               base.search();
            });
         });
      }
   };

   self.editLegacy = function () {
      var selectedRow = GridService.getSelectedRecord(base.legacyGrid);
      if (selectedRow) {
         $state.go('^.detail', { labelType: selectedRow.paramType, rowId: selectedRow.rowID });
      }
   };

   self.editUnibar = function () {
      var selectedRow = GridService.getSelectedRecord(base.unibarGrid);
      if (selectedRow) {
         $state.go('^.detail', { labelType: selectedRow.udcId, rowId: selectedRow.rowID });
      }
   };

   self.setupUnibar = function () {
      $state.go('^.externalLabelSetup', { sysName: base.SYSNAME_TWL, appId: base.APPID_UNIBAR });
   };

   //This will Copy All (override each default row).  This is only an option when 'Default' is selected.
   self.copyAll = function () {
      var requestCriteria = {
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         usageType: base.criteria.usageType,
         printerId: base.criteria.printerId
      };

      DataService.post('api/twl/astwladmin/copyalllabeluserdefinedconfigurations', { data: requestCriteria, busy: true }, function () {
         MessageService.info('global.information', 'message.all.records.were.successfuly.copied');
         //Refresh the results, so we get the 'Overridden' flag updated.
         base.search();
      });
   };

});

//This controller gets called when the user selects one row from the grid and clicks Edit.
//It allows the user to maintain some fields.
//Alias: dtl
app.controller('TwlalDetailCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.labelType = $stateParams.labelType;
   self.rowId = $stateParams.rowId;
   self.udcfg = null;

   self.getSubTitle = function () {
      var labelTypeLabel = base.criteria.usageType.toUpperCase() === base.USAGETYPE_LEGACY_ZEBRA ?
         MessageService.get('global.parameter.type') : MessageService.get('global.label.type');

      return MessageService.get('global.warehouse') + base.LABEL_DELIMITER +
         (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) +
         base.SUBMENU_DELIMITER +
         labelTypeLabel + base.LABEL_DELIMITER +
         self.labelType;
   };

   self.back = function () {
      $state.go('^.master');
   };

   self.initiate = function () {
      if (self.rowId) {
         DataService.get('api/twl/udcfg/getbyrowid/' + self.rowId, function (data) {
            if (data) {
               self.udcfg = data;
            }
         });
      }
   };

   self.refreshLegacyGridRow = function () {
      base.legacyDataset.forEach(function (originalRow) {
         if (originalRow.rowID === self.udcfg.rowID) {
            originalRow.udcValue = self.udcfg.udcValue;
            var rowIndex = base.legacyDataset.indexOf(originalRow);
            base.legacyGrid.updateRow(rowIndex);
         }
      });
   };

   self.refreshUnibarGridRow = function () {
      base.unibarDataset.forEach(function (originalRow) {
         if (originalRow.rowID === self.udcfg.rowID) {
            originalRow.udcValue = self.udcfg.udcValue;
            originalRow.legacyLabelfl = self.udcfg.legacyLabelfl;
            var rowIndex = base.unibarDataset.indexOf(originalRow);
            base.unibarGrid.updateRow(rowIndex);
         }
      });
   };

   self.submit = function () {
      if (self.udcfg) {
         DataService.put('api/twl/udcfg', { data: self.udcfg, busy: true }, function (data) {
            if (data) {
               MessageService.info('global.information', 'message.save.operation.completed.successfully');

               //After we Update row, we want to go find that row and update.
               //(Instead of re-opening query.  Don't want the user to lose their spot.)
               if (base.criteria.usageType.toUpperCase() === base.USAGETYPE_LEGACY_ZEBRA) {
                  self.refreshLegacyGridRow();
               } else {
                  self.refreshUnibarGridRow();
               }

               self.back();
            }
         });
      }
   };

   self.initiate();
});

//This controller gets called when the user selects the "Unibar Setup" from the main screen.  It's only
//available when we are working with Unibar Labels.  It calls a view that can be used for setting up
//any type of External Labels.
//Alias: els
app.controller('TwlalExternalLabelSetupCtrl', function ($scope, $state, $stateParams, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.sysName = $stateParams.sysName;
   self.appId = $stateParams.appId;
   self.bcswmst = null;
   self.newRow = false;

   self.getSubTitle = function () {
      var externalSoftware = self.appId ? (base.SUBMENU_DELIMITER +
         MessageService.get('global.external.software') +
         base.LABEL_DELIMITER +
         self.appId) : '';

      return MessageService.get('global.warehouse') +
         base.LABEL_DELIMITER +
         (base.criteriaUsed.whNum ? base.criteriaUsed.whNum : MessageService.get('global.unknown')) +
         externalSoftware;
   };

   self.back = function () {
      $state.go('^.master');
   };

   self.initiate = function () {
      var getbypkCriteria = {
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         sysName: self.sysName,
         appId: self.appId
      };

      DataService.get('api/twl/bcswmst/getbypk', { params: getbypkCriteria, busy: true }, function (data) {
         if (data) {
            self.bcswmst = data;
            self.newRow = false;
         } else {
            //If one doesn't exist, then we want to stub out one so it can be created when
            //the user saves.
            self.bcswmst = {
               coNum: base.criteriaUsed.coNum,
               whNum: base.criteriaUsed.whNum,
               sysName: self.sysName,
               appId: self.appId
            };
            self.newRow = true;
         }
      });
   };

   self.submit = function () {
      if (self.bcswmst) {
         if (self.newRow) {
            //Add Mode, the record didn't previously exist.
            DataService.post('api/twl/bcswmst', { data: self.bcswmst, busy: true }, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  self.back();
               }
            });
         } else {
            DataService.put('api/twl/bcswmst', { data: self.bcswmst, busy: true }, function (data) {
               if (data) {
                  MessageService.info('global.information', 'message.save.operation.completed.successfully');
                  self.back();
               }
            });
         }
      }
   };

   self.initiate();
});

//This controller gets called when the user expands a row on the Legacy Grid.  It shows the
//extended description.  It can not be edited, it's only for informational purposes.
//Alias: els
app.controller('TwlalLegacyShowDescriptionCtrl', function ($scope, $state, $stateParams, DataService) {
   var self = this;
   var mst = $scope.mst;

   //Gives us details for the current row.
   var udcfgRow = mst.legacyRowParams.item;
   var grid = mst.legacyRowParams.grid;
   var rowNumber = mst.legacyRowParams.row;

   self.udcfg = {};

   self.initiate = function () {
      if (udcfgRow && udcfgRow.rowID !== 0) {
         DataService.get('api/twl/udcfg/getbyrowid/' + udcfgRow.rowID, function (data) {
            if (data) {
               self.udcfg = data;
            }
         });
      }
   };

   self.cancel = function () {
      grid.toggleRowDetail(rowNumber);
   };

   self.initiate();
});
