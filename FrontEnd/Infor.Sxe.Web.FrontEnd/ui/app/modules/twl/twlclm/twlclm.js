'use strict';

//TWL Multiple Bin Location Create
app.config(function ($stateProvider, StateProvider) {
   StateProvider.addTransactionBaseState('twl', 'twlclm', {
      widgets: ['SEARCH']
   });
   StateProvider.addMasterState('twl', 'twlclm');

   $stateProvider.state('twlclm.detail', {
      url: '/detail',
      views: {
         detail: {
            templateProvider: function (JsonViewService) {
               return JsonViewService.getView('twl/twlclm/detail.json');
            },
            controller: 'TwlclmDetailCtrl as dtl'
         }
      }
   });
});

app.controller('TwlclmBaseCtrl', function ($state, ConfigService, DataService, MessageService, UserService) {
   var self = this;
   self.API_CALL_TIMEOUT_MILLESECONDS_3HRS = 180 * 60000;
   self.FUNCTIONNAME_TWLCLM = 'twlclm';
   self.DOCUMENT_DELIMITER = '-';
   self.LABEL_DELIMITER = ': ';
   self.SUBMENU_DELIMITER = ' | ';
   self.STATUS_NONE = 0;
   self.STATUS_BUILDING = 1;
   self.STATUS_BUILT = 2;
   self.STATUS_CREATING = 3;
   self.STATUS_CREATED = 4;
   self.STATUS_DELETING = 5;
   self.LOCATIONTYPE_PALLET = 'P',
   self.LOCATIONTYPE_SHELF = 'S',
   self.LOCATIONTYPE_CAROUSEL = 'C',
   self.LOCATIONTYPE_FLOWRACK = 'F',
   self.RANGETYPE_DIGITS = 1,
   self.RANGETYPE_LETTERS = 2,
   self.binTypesWithoutDimensions = [self.LOCATIONTYPE_SHELF, self.LOCATIONTYPE_CAROUSEL, self.LOCATIONTYPE_FLOWRACK];
   self.criteria = {};

   self.userCoNum = UserService.getTwlCompany();
   self.userWhNum = UserService.getTwlWarehouse();
   self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
   self.criteria.coNum = self.userCoNum;
   self.criteria.whNum = self.userWhNum;

   self.positionFromAlpha = 'A';
   self.positionToAlpha = 'Z';
   self.positionFromNumeric = 1;
   self.positionToNumeric = 1;
   self.levelFromAlpha = 'A';
   self.levelToAlpha = 'Z';
   self.levelFromNumeric = 1;
   self.levelToNumeric = 1;
   self.controlData = {};
   self.maximumPallets = 0;

   self.isStackHeightDisabled = false;
   self.isPalletFootprintDisabled = false;

   self.isWorkingListFound = false;

   //If we're in process, then the criteria can't be changed.
   self.isCriteriaDisabled = function () {
      if (self.controlData) {
         if (self.controlData.statusCode === self.STATUS_NONE ||
            self.controlData.statusCode === self.STATUS_CREATED) {
            return false;
         } else {
            return true;
         }
      } else {
         return false;
      }
   };

   self.criteriaUsed = {};

   self.getSubTitle = function () {
      return MessageService.get('global.warehouse') +
         self.LABEL_DELIMITER +
         (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
   };

   self.isMaster = function () {
      return $state.is('twlclm.master');
   };

   self.includesMaster = function () {
      return $state.includes('twlclm.master');
   };

   self.isDetail = function () {
      return $state.is('twlclm.detail');
   };

   self.includesDetail = function () {
      return $state.includes('twlclm.detail');
   };

   // Initialize the search criteria object
   self.initCriteria = function () {
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
   };

   // Perform search and update data set for the grid
   self.search = function () {
      self.criteriaUsed = angular.copy(self.criteria);

      var criteria = {
         coNum: self.criteriaUsed.coNum,
         whNum: self.criteriaUsed.whNum,
         reportName: self.FUNCTIONNAME_TWLCLM
      };
      DataService.post('api/twl/astwladmin/getmultiplelocationworkingcontrol', { data: criteria, busy: true }, function (data) {
         if (data && data.statusCode) {
            self.controlData = data;
            if (self.controlData.statusCode === self.STATUS_NONE ||
               self.controlData.statusCode === self.STATUS_CREATED) {
               self.isWorkingListFound = false;
            } else {
               self.isWorkingListFound = true;
            }
         } else {
            self.initControlData();
            self.isWorkingListFound = false;
         }

         self.assignCubeDimension();
         self.assignMaximumPallets();
      });
   };

   // Based on the Types, different fields are visible.
   self.moveRangesToControlData = function () {
      if (self.controlData) {
         if (self.controlData.positionType === 1) {
            self.controlData.positionFrom = self.positionFromNumeric.toString();
            self.controlData.positionTo = self.positionToNumeric.toString();
         } else {
            self.controlData.positionFrom = self.positionFromAlpha;
            self.controlData.positionTo = self.positionToAlpha;
         }

         if (self.controlData.levelType === 1) {
            self.controlData.levelFrom = self.levelFromNumeric.toString();
            self.controlData.levelTo = self.levelToNumeric.toString();
         } else {
            self.controlData.levelFrom = self.levelFromAlpha;
            self.controlData.levelTo = self.levelToAlpha;
         }

         self.controlData.coNum = self.criteriaUsed.coNum;
         self.controlData.whNum = self.criteriaUsed.whNum;
         self.controlData.reportName = self.FUNCTIONNAME_TWLCLM;
      }
   };

   self.initControlData = function () {
      self.controlData = {
         whZone: '',
         aisle: 1,
         prefix: '',
         positionType: self.RANGETYPE_LETTERS,
         positionFrom: 'A',
         positionTo: 'Z',
         positionLength: 3,
         positionRangeType: 'All',
         levelType: self.RANGETYPE_DIGITS,
         levelFrom: '1',
         levelTo: '1',
         levelLength: 1,
         locType: self.LOCATIONTYPE_PALLET,
         abc: 'A',
         height: 0,
         width: 0,
         depth: 0,
         cube: 0,
         maxWeight: 0,
         palletFootprint: 1,
         stackHeight: 1,
         pickSequence: 0,
         putawayGroup: '',
         statusCode: self.STATUS_NONE
      };
   };

   self.assignCubeDimension = function () {
      self.controlData.cube = self.controlData.height * self.controlData.width * self.controlData.depth;
   };

   self.assignMaximumPallets = function () {
      self.maximumPallets = self.controlData.palletFootprint * self.controlData.stackHeight;
   };

   self.changeBinType = function () {
      if (self.binTypesWithoutDimensions.indexOf(self.controlData.locType.toUpperCase()) > -1) {
         self.maximumPallets = 0;
         self.controlData.stackHeight = 0;
         self.controlData.palletFootprint = 0;

         self.isStackHeightDisabled = true;
         self.isPalletFootprintDisabled = true;
      } else {
         self.maximumPallets = 1;
         self.controlData.stackHeight = 1;
         self.controlData.palletFootprint = 1;

         self.isStackHeightDisabled = false;
         self.isPalletFootprintDisabled = false;
      }

      var params = {
         coNum: self.criteriaUsed.coNum,
         whNum: self.criteriaUsed.whNum,
         locType: self.controlData.locType
      };
      DataService.get('api/twl/binsize/getbypk', { params: params }, function (binsize) {
         if (binsize) {
            self.controlData.maxWeight = binsize.maxWeight;
            self.controlData.height = binsize.height;
            self.controlData.width = binsize.width;
            self.controlData.depth = binsize.depth;
            self.assignCubeDimension();
         } else {
            self.controlData.maxWeight = 0;
            self.controlData.height = 0;
            self.controlData.width = 0;
            self.controlData.depth = 0;
            self.assignCubeDimension();
         }
      });
   };

   // Perform initialization of search criteria
   self.initCriteria();
   self.initControlData();
   self.search();
   self.changeBinType();
});

app.controller('TwlclmSearchCtrl', function ($scope, $state, DataService, Utils) {
   var self = this;
   var base = $scope.base;
   var criteria = base.criteria;

   self.clear = function () {
      Utils.clearObject(criteria);
      base.initCriteria();
   };

   self.submit = function () {
      if (!base.isMaster()) {
         $state.go('twlclm.master');
      }

      base.search();
   };
});

//This controller is the master state.  We don't have a Grid on this particular view.  It simply contains
//the criteria the user will enter to create Multiple Bin Locations.
//Alias: mst
app.controller('TwlclmMasterCtrl', function ($scope, $state, $stateParams, $translate, DataService, MessageService, StandardConverters) {
   var self = this;
   var base = $scope.base;

   if ($stateParams.refreshSearch) {
      base.search();
   }
   self.getStatusMessage = function () {
      if (base.controlData) {
         switch (base.controlData.statusCode) {                                  //ignore jslint - correct indentation
            case base.STATUS_BUILDING:                                           //ignore jslint - correct indentation
               return $translate.instant('message.multi.bin.building');          //ignore jslint - correct indentation
            case base.STATUS_BUILT:                                              //ignore jslint - correct indentation
               return $translate.instant('message.multi.bin.built');             //ignore jslint - correct indentation
            case base.STATUS_CREATING:                                           //ignore jslint - correct indentation
               return $translate.instant('message.multi.bin.creating');          //ignore jslint - correct indentation
            case base.STATUS_CREATED:                                            //ignore jslint - correct indentation
               return $translate.instant('message.multi.bin.last');              //ignore jslint - correct indentation
            case base.STATUS_DELETING:                                           //ignore jslint - correct indentation
               return $translate.instant('message.multi.bin.deleting');          //ignore jslint - correct indentation
            default:                                                             //ignore jslint - correct indentation
               return '';                                                        //ignore jslint - correct indentation
         }
      } else {
         return '';
      }
   };

   self.submitCreate = function () {
      if (!base.criteriaUsed.whNum) {
         MessageService.error('global.information', 'message.please.select.a.warehouse');
      } else {
         var criteria = {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            reportName: base.FUNCTIONNAME_TWLCLM
         };

         MessageService.info('global.information', 'message.multi.bin.creating');

         DataService.post('api/twl/astwladmin/createmultiplelocations', { timeout: base.API_CALL_TIMEOUT_MILLESECONDS_3HRS, data: criteria, busy: false }, function () {
            //Get the latest status
            base.search();
         });
      }
   };

   self.createListContinueConfirmation = function () {
      if (base.controlData) {
         var criteria = {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            reportName: base.FUNCTIONNAME_TWLCLM
         };
         DataService.post('api/twl/astwladmin/getmultiplelocationworkingcontrol', { data: criteria, busy: true }, function (data) {
            if (data) {
               var binLocationMask = data.binLocationMask;
               if (binLocationMask) {
                  //These numbers can be large, want commas to show.
                  var expectedRecordCount = StandardConverters.Integer.convert(data.expRecordCount);
                  var msg = $translate.instant('message.new.bin.locations.will.be.similar.to') +
                     ' "' + binLocationMask + '"' + "</br></br>" +
                     $translate.instant('message.new.bin.locations.will.be.similar.to.part.2') +
                     ' ' + expectedRecordCount + "</br></br>" +
                     $translate.instant('message.new.bin.locations.will.be.similar.to.part.3');

                  MessageService.yesNo('global.question', msg,
                     // Yes processing
                     function() {
                        self.createListContinue();
                     });
               } else {
                  MessageService.error('global.error', 'message.new.bin.locations.cannot.be.created');
               }
            } else {
               //Fallback if no record exists.  Simply continue on with processing.
               self.createListContinue();
            }
         });
      }
   };

   //Call the Build List call but only run it so it builds out the Mask of what will be created.
   //These are stored on the Control record by the backend and can be viewed by the user in the
   //next step.
   self.createListContinueShowMask = function () {
      if (base.controlData) {
         //There are some properties that are bound to controller level properties and not the Object.
         base.moveRangesToControlData();
         base.controlData.isOnlyShowFormat = true;
         DataService.post('api/twl/astwladmin/buildmultiplelocationworkinglist', { data: base.controlData, busy: false }, function () {
            self.createListContinueConfirmation();
         });
      }
   };

   self.createListContinue = function () {
      if (base.controlData) {
         //There are some properties that are bound to controller level properties and not the Object.
         base.moveRangesToControlData();
         base.controlData.isOnlyShowFormat = false;

         //We need to show the message first because we won't get this from the callback.
         MessageService.info('global.information', 'message.multi.bin.building');

         //NOTICE we have a timeout.  This call might take a long time to run.  It's "Set and Forget" type of call.
         DataService.post('api/twl/astwladmin/buildmultiplelocationworkinglist', { timeout: base.API_CALL_TIMEOUT_MILLESECONDS_3HRS, data: base.controlData, busy: false }, function () {
            //Get the latest status
            base.search();
         });
      }
   };

   self.createList = function () {
      if (!base.criteriaUsed.whNum) {
         MessageService.error('global.information', 'message.please.select.a.warehouse');
      } else {
         if (base.controlData) {
            //There are some properties that are bound to controller level properties and not the Object.
            base.moveRangesToControlData();

            DataService.post('api/twl/astwladmin/validatemultiplelocationcreate', { data: base.controlData, busy: false }, function () {
               //Passed validation, continue with create.
               self.createListContinueShowMask();
            });
         }
      }
   };

   self.viewDetails = function () {
      $state.go('^.detail');
   };

   self.deleteList = function () {
      if (!base.criteriaUsed.whNum) {
         MessageService.error('global.information', 'message.please.select.a.warehouse');
      } else {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         // Yes processing
         function () {
            var criteria = {
               coNum: base.criteriaUsed.coNum,
               whNum: base.criteriaUsed.whNum,
               reportName: base.FUNCTIONNAME_TWLCLM,
               binLoc: '' //Delete all bins, plus the list
            };

            var criteriaList = [];
            criteriaList.push(criteria);

            DataService.post('api/twl/astwladmin/deletemultiplelocationworkingbins', { data: criteriaList, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');

               //Get the latest status
               base.search();
            });
         });
      }
   };

   // If refresh search is requested, populate grid with an updated search call (with criteria from the base component)
   if ($stateParams.refreshSearch) {
      base.search();
   }
});

//This Controller is used when the user drills down from a Working List to view the details and all
//bin locations that qualify and will potentially be created.  They an also delete ones from here too.
//Alias: dtl
app.controller('TwlclmDetailCtrl', function ($scope, $state, $stateParams, GridService, DataService, MessageService) {
   var self = this;
   var base = $scope.base;
   self.binLocationResults = [];
   self.binLocSearch = '';

   self.back = function () {
      $state.go('^.master', { refreshSearch: true }, { reload: '^.master' });
   };

   //Search.  If binloc passed is blank, then all rows.  If it's passed, then anywhere the
   //value contains the passed value is searched.
   self.search = function (binLocContains) {
      var criteria = {
         coNum: base.criteriaUsed.coNum,
         whNum: base.criteriaUsed.whNum,
         reportName: base.FUNCTIONNAME_TWLCLM,
         binLoc: binLocContains
      };

      DataService.post('api/twl/astwladmin/getmultiplelocationworkinglist', { data: criteria, busy: true }, function (data) {
         if (data) {
            self.binLocationResults = data.getmultiloclistresults;
            //NOTE: We have Control Data available from the backend call if we need it.
         }
      });
   };

   self.deleteBins = function () {
      if (!base.criteriaUsed.whNum) {
         MessageService.error('global.information', 'message.please.select.a.warehouse');
      } else {
         MessageService.yesNo('global.question', 'question.confirm.delete',
         // Yes processing
         function () {
            var criteriaList = [];
            var selectedRows = GridService.getSelectedRecords(self.grid);
            selectedRows.forEach(function (row) {
               var criteria = {
                  coNum: base.criteriaUsed.coNum,
                  whNum: base.criteriaUsed.whNum,
                  reportName: base.FUNCTIONNAME_TWLCLM,
                  binLoc: row.binLoc
               };
               criteriaList.push(criteria);
            });

            DataService.post('api/twl/astwladmin/deletemultiplelocationworkingbins', { data: criteriaList, busy: true }, function () {
               MessageService.info('global.information', 'message.delete.operation.completed.successfully');
               //Refresh the grid after the delete.
               self.binLocSearch = '';
               self.search();
            });
         });
      }
   };

   // Save
   self.submitCreate = function () {
      if (!base.criteriaUsed.whNum) {
         MessageService.error('global.information', 'message.please.select.a.warehouse');
      } else {
         var criteria = {
            coNum: base.criteriaUsed.coNum,
            whNum: base.criteriaUsed.whNum,
            reportName: base.FUNCTIONNAME_TWLCLM
         };

         MessageService.info('global.information', 'message.multi.bin.creating');

         DataService.post('api/twl/astwladmin/createmultiplelocations', { timeout: base.API_CALL_TIMEOUT_MILLESECONDS_3HRS, data: criteria, busy: false }, function () {
            self.back();
         });
      }
   };

   //Search for all Bin Locations.
   self.search('');
});
