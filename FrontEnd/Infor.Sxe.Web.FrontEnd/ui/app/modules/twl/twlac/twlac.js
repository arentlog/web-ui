'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlac',
      dataPath: 'api/twl/cmpmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/cmpmst/gettwlcompanies',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlac/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      recentlyVisited: {
         title: { label: 'global.company', value: 'coNum' },
         description: { label: null, value: 'coName' }
      }
   });
});


app.service('TwlacService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {

      // Sets defaults in search tab, can only search in Current Company - can look at any warehouse there but by default the logged in warehouse
      self.userCoNum = UserService.getTwlCompany();
      self.criteria.coNum = self.userCoNum;

   };

   this.extendSearchController = function (self, base, criteria) {

      self.clear = function () {
         // Clear by setting all properties to null (want to retain property names in case DataService needs to iterate over properties on criteria)
         Utils.clearObject(criteria);

         // Clear resets these defaults - need to set again
         base.criteria.coNum = base.userCoNum;

      };

   };

   this.extendDetailController = function (self, base, twlac) {

      self.getSubTitle = function () {
         return MessageService.get('global.company') + ': ' + twlac.coNum;
      };

      // When the full twlas object has been resolved, get the full parameters record
      twlac.$promise.then(function () {
         DataService.get('api/twl/parameters/getforcompany/' + twlac.coNum, function (parameters) {
            if (parameters && parameters.coNum) {
               if (!parameters.labelPrintType || parameters.labelPrintType === '') {
                  parameters.labelPrintType = 'L';
               }
               twlac.parameters = parameters;
               twlac.parameters.updatetype = 'update';
            } else {
               twlac.parameters = {
                  updatetype: 'create',  // What to run when we save
                  coNum: twlac.coNum,
                  whNum: '',  // Company record - so this would be blank
                  whType: 'R',
                  rcvPalletIdFlag: 'S', // System Assigned
                  rcvQtyCheck: 'L',
                  rcvBackOrders: 'A',
                  rcvRmaPrefix: 'R',
                  matPutAway: 'D', // Directed
                  matReplFlag: 'O',
                  picReleaseFlag: 'M',
                  picReleaseTime: 1600,
                  picHoldLines: 25,
                  picHoldTypes: '',
                  picLabelFlag: 'P', // Pre-Printed
                  picFromDock: 'N', // No
                  isPickFromDock: false,  // Match isPickFromDock
                  pacType: 'P', // Pick to pack
                  pacListFlag: 'B',
                  shpHoldFlag: 'Y',
                  shpForceFlag: 'N', // No
                  isForceShip: false, // Match shpForceFlag
                  physicalFlag: false,
                  comments: '',
                  empNum: '',
                  rowStatus: true,
                  displayCycleQty: false,
                  displayPhysQty: false,
                  cycleAdj: false,
                  physAdj: false,
                  cycleAdjCodeIn: '',
                  cycleAdjCodeOut: '',
                  physAdjCodeIn: '',
                  physAdjCodeOut: '',
                  labelPrintType: 'L' // Zebra - Legacy
               };
            }

            twlac.parameters.isPickFromDock = twlac.parameters.picFromDock === 'Y' ? true : false;
            twlac.parameters.isForceShip = twlac.parameters.shpForceFlag === 'Y' ? true : false;
         });
      });

      this.createRecord = function (self, base, twlac, $scope, callback) {
         twlac.rowStatus = true;

         DataService.post('api/twl/cmpmst', { data: twlac }, function (data) {
            if (twlac.parameters) {
               twlac.parameters.picFromDock = twlac.parameters.isPickFromDock ? 'Y' : 'N';
               twlac.parameters.shpForceFlag = twlac.parameters.isForceShip ? 'Y' : 'N';
               if (twlac.parameters.updatetype === 'create') {
                  DataService.create('api/twl/parameters', { data: twlac.parameters, busy: true }, function () {
                     callback(data);
                  });

               } else {
                  DataService.update('api/twl/parameters', { data: twlac.parameters, busy: true }, function () {
                     callback(data);
                  });
               }
            }
            else {
               callback(data);
            }
         });
      };

      this.updateRecord = function (self, base, twlac, $scope, callback) {
         DataService.put('api/twl/cmpmst', { data: twlac }, function () {
            if (twlac.parameters) {
               twlac.parameters.picFromDock = twlac.parameters.isPickFromDock ? 'Y' : 'N';
               twlac.parameters.shpForceFlag = twlac.parameters.isForceShip ? 'Y' : 'N';
               if (twlac.parameters.updatetype === 'create') {
                  DataService.create('api/twl/parameters', { data: twlac.parameters, busy: true }, function () {
                     callback();
                  });

               } else {
                  DataService.update('api/twl/parameters', { data: twlac.parameters, busy: true }, function () {
                     callback();
                  });
               }
            }
            else {
               callback();
            }
         });
      };

   };

});