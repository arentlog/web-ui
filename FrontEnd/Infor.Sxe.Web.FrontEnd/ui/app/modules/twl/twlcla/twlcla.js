'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcla',
      dataPath: 'api/twl/astwlinquiry/getaltloc',
      searchMethod: 'POST',
      searchPath: 'api/twl/astwlinquiry/getaltloclist',
      searchResultsField: 'altloclistresults',
      resultsRowIdField: 'binmstRowID',
      recordRowIdField: 'binmstRowID',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      createStateView: 'twl/twlcla/create.json',
      postCreateState: '^.detail.edit',
      recentlyVisited: {
         title: { label: 'global.location', value: 'binNum' },
         description: { label: 'global.zone', value: 'whZone' }
      }
   });
});

app.service('TwlclaService', function ($state, DataService, GridService, MessageService, UserService, Utils) {

   // Custom Get for Detail Screen
   this.getRecord = function (self, base, stateParams) {
      var dummyObject = {
         binmstRowID: stateParams.id
      };

      return DataService.getResource('api/twl/astwlsetup/getaltloc', { data: dummyObject, method: 'POST' });
   };

   // Custom Create
   this.createRecord = function (self, base, twlcla, $scope, callback) {
      DataService.post('api/twl/astwlsetup/createaltloc', { data: twlcla }, function () {
         DataService.get('api/twl/binmst/getbypk', { params: { coNum: twlcla.coNum, whNum: twlcla.whNum, binNum: twlcla.binNum } }, function (data) {
            data.binmstRowID = data.rowID;
            callback(data);
         });
      });
   };

   // Custom Delete of Single Record for Detail Screen
   this.deleteRecord = function (self, base, twlcla, $scope, deleteCallback) {
      DataService.post('api/twl/astwlsetup/deletealtloc', { data: twlcla }, function () {
         deleteCallback();
      });
   };

   // Custom Delete of Possible Multiple Records for Master Screen
   this.deleteMultiple = function (self, base, records, $scope, deleteCallback) {
      //Should write a call that does multiple deletes instead, this will always be a very small dataset of 10 or less
      var rowIds = GridService.getSelectedRowIds(base.grid, 'binmstRowID');
      var i = 0;
      var rowId;
      while ((rowId = rowIds[i++])) {
         DataService.post('api/twl/astwlsetup/deletealtloc', { data: { binmstRowID: rowId } }, function () {
            deleteCallback();
         });
      }
   };

   // Custom Update of Detail Data
   this.updateRecord = function (self, base, twlcla, $scope, saveCallback) {
      if (twlcla.maxPal < twlcla.palletFootprint) {
         MessageService.error('global.error', 'twl.message.maximum.less.than.minimum.pallet');
      }
      else {
         DataService.post('api/twl/astwlsetup/updatealtloc', { data: twlcla }, function () {
            saveCallback();
         });
      }
   };


   this.extendBaseController = function (self) {

      // Sets defaults in search tab
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + (self.criteriaUsed.whNum ? self.criteriaUsed.whNum : MessageService.get('global.unknown'));
      };
   };

   this.extendSearchController = function (self, base, criteria) {

      self.clear = function () {
         // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
         Utils.clearObject(criteria);

         // Clear resets these defaults - need to set again
         base.criteria.coNum = base.userCoNum;
         base.criteria.whNum = base.userWhNum;

      };
   };

   this.extendCreateController = function (self, base, twlcla) {
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      if (!base.criteriaUsed.whNum) {
         base.criteriaUsed.whNum = base.criteria.whNum;
      }

      // Can only create in user's TWL warehouse
      twlcla.coNum = base.criteriaUsed.coNum;
      twlcla.whNum = base.criteriaUsed.whNum;

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + base.criteria.whNum;
      };

      // Mandatory fields are required by UI MT before getting to the Progress transaction logic
      // Several fields (aisle, primary pick and location type) are not part of the alternate location object and had to be updated in the SI create logic instead
      twlcla.whZone = '';
      twlcla.rowStatus = true;

   };

   this.extendDetailController = function (self, base, twlcla) {

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + twlcla.whNum + ' | ' +
            MessageService.get('global.location') + ': ' + twlcla.binNum;
      };

      // The Cube needs to recalculate as the user changes height/width/depth
      self.calculateCube = function () {
         twlcla.cube = twlcla.width * twlcla.height * twlcla.depth;
      };

   };

});