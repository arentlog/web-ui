'use strict';

app.config(function ($stateProvider, StateProvider) {

   StateProvider.addSetupStates({
      module: 'twl',
      menuFn: 'twlcw',
      dataPath: 'api/twl/whmst',
      searchMethod: 'POST',
      searchPath: 'api/twl/whmst/gettwlwarehouses',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      createStateView: 'twl/twlcw/create.json',
      postCreateState: '^.detail.edit',
      searchCriteria: { searchType: 'all', keyField: 'all' },
      primaryKeyParams: ['whNum'],
      recentlyVisited: {
         title: { label: 'global.warehouse', value: 'whNum' },
         description: { label: null, value: 'whDesc' }
      }
   });

});

app.service('TwlcwService', function ($state, DataService, MessageService, UserService, Utils) {

   this.extendBaseController = function (self) {

      // Sets defaults in search tab, can only search in Current Company - can look at any warehouse there but by default the logged in warehouse
      self.userCoNum = UserService.getTwlCompany();
      self.userWhNum = UserService.getTwlWarehouse();
      self.restrictTWLWarehouse = UserService.getTwlRestrictWarehouse();
      self.criteria.coNum = self.userCoNum;
      self.criteria.whNum = self.userWhNum;
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

   this.extendCreateController = function (self, base, twlcw) {
      // Can only create in user's TWL warehouse
      if (!base.criteriaUsed.coNum) {
         base.criteriaUsed.coNum = base.criteria.coNum;
      }

      // Can only create in user's TWL company
      twlcw.coNum = base.criteriaUsed.coNum;

      //Initial fields from database ttblwhmst.i in SI
      twlcw.boBin = 'BKORD';
      twlcw.carrierid = '';
      twlcw.consolidate = false;
      twlcw.csStage = 'counter';
      twlcw.pmIrms = 'TWL';
      twlcw.qaInspection = false;
      twlcw.rcvZoneDefault = ''; // This should get set to the first valid one in the SI Transaction logic
      twlcw.rcvZoneHold = ''; // This should get set to the first valid one in the SI Transaction logic
      twlcw.rowStatus = false;
      twlcw.ytdPhyDollarVar = 0;
      twlcw.ytdPhyUnitVar = 100;

   };


   this.extendDetailController = function (self, base, twlcw) {

      // When the full twlas object has been resolved, get the full parameters record
      twlcw.$promise.then(function () {

         if (twlcw.pmIrms.toUpperCase() === 'IRMS') {
            twlcw.pmIrms = 'TWL';
         }

         var params = {
            coNum: twlcw.coNum,
            whNum: twlcw.whNum
         };
         DataService.get('api/twl/parameters/getbypk', { params: params }, function (parameters) {
            if (parameters) {
               if (!parameters.labelPrintType || parameters.labelPrintType === '') {
                  parameters.labelPrintType = 'L';
               }
               twlcw.parameters = parameters;
               twlcw.parameters.updatetype = 'update';
            } else {
               twlcw.parameters = {
                  updatetype: 'create',  // What to run when we save
                  coNum: twlcw.coNum,
                  whNum: twlcw.whNum,
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

            twlcw.parameters.isPickFromDock = twlcw.parameters.picFromDock === 'Y' ? true : false;
            twlcw.parameters.isForceShip = twlcw.parameters.shpForceFlag === 'Y' ? true : false;
         });
      });

      this.createRecord = function (self, base, twlcw, $scope, callback) {
         DataService.post('api/twl/whmst', { data: twlcw }, function (data) {
            if (twlcw.parameters) {
               twlcw.parameters.picFromDock = twlcw.parameters.isPickFromDock ? 'Y' : 'N';
               twlcw.parameters.shpForceFlag = twlcw.parameters.isForceShip ? 'Y' : 'N';
               if (twlcw.parameters.updatetype === 'create') {
                  DataService.create('api/twl/parameters', { data: twlcw.parameters, busy: true }, function () {
                     callback(data);
                  });

               } else {
                  DataService.update('api/twl/parameters', { data: twlcw.parameters, busy: true }, function () {
                     callback(data);
                  });
               }
            }
            else {
               callback(data);
            }
         });
      };

      this.updateRecord = function (self, base, twlcw, $scope, callback) {
         DataService.put('api/twl/whmst', { data: twlcw }, function () {
            if (twlcw.parameters) {
               twlcw.parameters.picFromDock = twlcw.parameters.isPickFromDock ? 'Y' : 'N';
               twlcw.parameters.shpForceFlag = twlcw.parameters.isForceShip ? 'Y' : 'N';
               if (twlcw.parameters.updatetype === 'create') {
                  DataService.create('api/twl/parameters', { data: twlcw.parameters, busy: true }, function () {
                     callback();
                  });

               } else {
                  DataService.update('api/twl/parameters', { data: twlcw.parameters, busy: true }, function () {
                     callback();
                  });
               }
            }
            else {
               callback();
            }
         });
      };

      self.getSubTitle = function () {
         return MessageService.get('global.warehouse') + ': ' + self.twlcw.whNum;
      };

   };

});
