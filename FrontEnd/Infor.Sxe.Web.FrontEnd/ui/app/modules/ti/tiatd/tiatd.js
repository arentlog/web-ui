'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('ti', 'tiatd');
   StateProvider.addMasterState('ti', 'tiatd');
});

app.controller('TiatdBaseCtrl', function ($state, Utils) {
   var self = this;

   self.sidebarCollapsed = true;

   self.isMaster = function () {
      return $state.is('tiatd.master');
   };

   self.includesMaster = function () {
      return $state.includes('tiatd.master');
   };
});

app.controller('TiatdMasterCtrl', function ($scope, $state, AodataService, DataService, Sasc) {
   var self = this;
   var base = $scope.base;
   self.sasc = Sasc;

   var usePOAType;
   var usePOOType;

   // New record to enter
   self.tiatd = {};

   // Clear form
   self.clear = function () {
      self.tiatd = {};

      // Reload the initial values
      self.loadInitialValues();
   };

   self.loadInitialValues = function () {
      var params = {
      };
      DataService.get('api/shared/assharedinquiry/tiatdload', { params: params }, function (data) {
         if (data) {
            self.tiatd.shiptocountry = data.shiptocountry.toLowerCase();
            self.tiatd.shipfrcountry = data.shipfrcountry.toLowerCase();
            self.tiatd.acceptcountry = data.acceptcountry.toLowerCase();
            self.tiatd.origincountry = data.origincountry.toLowerCase();
            self.tiatd.countrysensitive = data.countrysensitive;
            self.tiatd.canadaflsensitive = data.canadaflsensitive;
            self.tiatd.autofillfl = data.autofillfl;
            self.tiatd.outofcitysensitive = data.outofcitysensitive;
            self.tiatd.pointoftransfer = data.pointoftransfer;
            self.tiatd.rowpointer = data.rowpointer;
            self.tiatd.serviceind = data.serviceind;
            self.tiatd.taxinterfacety = data.taxinterfacety;
         }
         self.tiatd.shiptogeocd = 0;
         self.tiatd.shipfrgeocd = 0;
         self.tiatd.acceptgeocd = 0;
         self.tiatd.origingeocd = 0;
         self.tiatd.federalTax = 0;
         self.tiatd.stateTax = 0;
         self.tiatd.countyTax = 0;
         self.tiatd.cityTax = 0;
         self.tiatd.districtTax = 0;
         self.tiatd.secstateTax = 0;
         self.tiatd.seccountyTax = 0;
         self.tiatd.seccityTax = 0;
         self.tiatd.errorcd = '';
         self.tiatd.errorfl = false;
      });
   };

   // Load the initial values
   self.loadInitialValues();

   // Load autofill defaults based on Taxware or AvaTax
   if (AodataService.getValue('TAX', 'taxinterfacety').toLowerCase() === 'a') {
      if (AodataService.getValue('TAX', 'avataxpoaty')) {
         usePOAType = AodataService.getValue('TAX', 'avataxpoaty').toLowerCase();
      } else {
         usePOAType = 'f';
      }
      if (AodataService.getValue('TAX', 'avataxpooty')) {
         usePOOType = AodataService.getValue('TAX', 'avataxpooty').toLowerCase();
      } else {
         usePOOType = 't';
      }
   }
   else {
      if (self.sasc.poataxty) {
         usePOAType = self.sasc.poataxty.toLowerCase();
      } else {
         usePOAType = 'f';
      }
      if (self.sasc.pootaxty) {
         usePOOType = self.sasc.pootaxty.toLowerCase();
      } else {
         usePOOType = 'f';
      }
   }

   // If the autofill functionality is turned on, track changes to the address fields
   // SASC values determine which address should or should not be updated
   // This mimics the code found in server/AppserverLogic/shared/tiatdfieldchange.p
   $scope.$watch('mst.tiatd.shiptocity', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType === 't') {
            self.tiatd.acceptcity = self.tiatd.shiptocity;
         }
         if (usePOOType === 't') {
            self.tiatd.origincity = self.tiatd.shiptocity;
         }
      }
   });

   $scope.$watch('mst.tiatd.shipfrcity', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType !== 't') {
            self.tiatd.acceptcity = self.tiatd.shipfrcity;
         }
         if (usePOOType !== 't') {
            self.tiatd.origincity = self.tiatd.shipfrcity;
         }
      }
   });

   $scope.$watch('mst.tiatd.shiptostate', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType === 't') {
            self.tiatd.acceptstate = self.tiatd.shiptostate;
         }
         if (usePOOType === 't') {
            self.tiatd.originstate = self.tiatd.shiptostate;
         }
      }
   });

   $scope.$watch('mst.tiatd.shipfrstate', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType !== 't') {
            self.tiatd.acceptstate = self.tiatd.shipfrstate;
         }
         if (usePOOType !== 't') {
            self.tiatd.originstate = self.tiatd.shipfrstate;
         }
      }
   });

   $scope.$watch('mst.tiatd.shiptozipcd', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType === 't') {
            self.tiatd.acceptzipcd = self.tiatd.shiptozipcd;
         }
         if (usePOOType === 't') {
            self.tiatd.originzipcd = self.tiatd.shiptozipcd;
         }
      }
   });

   $scope.$watch('mst.tiatd.shipfrzipcd', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType !== 't') {
            self.tiatd.acceptzipcd = self.tiatd.shipfrzipcd;
         }
         if (usePOOType !== 't') {
            self.tiatd.originzipcd = self.tiatd.shipfrzipcd;
         }
      }
   });

   $scope.$watch('mst.tiatd.shiptogeocd', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType === 't') {
            self.tiatd.acceptgeocd = self.tiatd.shiptogeocd;
         }
         if (usePOOType === 't') {
            self.tiatd.origingeocd = self.tiatd.shiptogeocd;
         }
      }
   });

   $scope.$watch('mst.tiatd.shipfrgeocd', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType !== 't') {
            self.tiatd.acceptgeocd = self.tiatd.shipfrgeocd;
         }
         if (usePOOType !== 't') {
            self.tiatd.origingeocd = self.tiatd.shipfrgeocd;
         }
      }
   });

   $scope.$watch('mst.tiatd.shiptocountry', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType === 't') {
            self.tiatd.acceptcountry = self.tiatd.shiptocountry.toLowerCase();
         }
         if (usePOOType === 't') {
            self.tiatd.origincountry = self.tiatd.shiptocountry.toLowerCase();
         }
      }
   });

   $scope.$watch('mst.tiatd.shipfrcountry', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType !== 't') {
            self.tiatd.acceptcountry = self.tiatd.shipfrcountry.toLowerCase();
         }
         if (usePOOType !== 't') {
            self.tiatd.origincountry = self.tiatd.shipfrcountry.toLowerCase();
         }
      }
   });

   $scope.$watch('mst.tiatd.shiptooutofcityfl', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType === 't') {
            self.tiatd.acceptoutofcityfl = self.tiatd.shiptooutofcityfl;
         }
         if (usePOOType === 't') {
            self.tiatd.originoutofcityfl = self.tiatd.shiptooutofcityfl;
         }
      }
   });

   $scope.$watch('mst.tiatd.shipfroutofcityfl', function (newValue, oldValue) {
      if (self.tiatd.autofillfl && newValue !== oldValue) {
         if (usePOAType !== 't') {
            self.tiatd.acceptoutofcityfl = self.tiatd.shipfroutofcityfl;
         }
         if (usePOOType !== 't') {
            self.tiatd.originoutofcityfl = self.tiatd.shipfroutofcityfl;
         }
      }
   });

   // Ship From address geocode lookup parameters
   self.getShipFromGeoCodeLookupCriteria = function () {
      return {
         tablename: 'tiatd',
         streetaddr: self.tiatd.shipfraddr1,
         city: self.tiatd.shipfrcity,
         state: self.tiatd.shipfrstate,
         zipcd: self.tiatd.shipfrzipcd,
         country: self.tiatd.shipfrcountry,
         geocd: self.tiatd.shipfrgeocd,
         outofcityfl: self.tiatd.shipfroutofcityfl
      };
   };

   // Ship To address geocode lookup parameters
   self.getShipToGeoCodeLookupCriteria = function () {
      return {
         tablename: 'tiatd',
         streetaddr: self.tiatd.shiptoaddr1,
         city: self.tiatd.shiptocity,
         state: self.tiatd.shiptostate,
         zipcd: self.tiatd.shiptozipcd,
         country: self.tiatd.shiptocountry,
         geocd: self.tiatd.shiptogeocd,
         outofcityfl: self.tiatd.shiptooutofcityfl
      };
   };

   // Order Origin address geocode lookup parameters
   self.getOriginGeoCodeLookupCriteria = function () {
      return {
         tablename: 'tiatd',
         streetaddr: self.tiatd.originaddr1,
         city: self.tiatd.origincity,
         state: self.tiatd.originstate,
         zipcd: self.tiatd.originzipcd,
         country: self.tiatd.origincountry,
         geocd: self.tiatd.origingeocd,
         outofcityfl: self.tiatd.originoutofcityfl
      };
   };

   // Order Acceptance address geocode lookup parameters
   self.getAcceptGeoCodeLookupCriteria = function () {
      return {
         tablename: 'tiatd',
         streetaddr: self.tiatd.acceptaddr1,
         city: self.tiatd.acceptcity,
         state: self.tiatd.acceptstate,
         zipcd: self.tiatd.acceptzipcd,
         country: self.tiatd.acceptcountry,
         geocd: self.tiatd.acceptgeocd,
         outofcityfl: self.tiatd.acceptoutofcityfl
      };
   };

   // Submit an entry
   self.submit = function () {

      var calcCriteria = {
         rowpointer: self.tiatd.rowpointer,
         taxinterfacety: self.tiatd.taxinterfacety,
         shipfrcity: self.tiatd.shipfrcity,
         shipfrstate: self.tiatd.shipfrstate,
         shipfrzipcd: self.tiatd.shipfrzipcd,
         shipfrgeocd: self.tiatd.shipfrgeocd,
         shipfroutofcityfl: self.tiatd.shipfroutofcityfl,
         shipfrcountry: self.tiatd.shipfrcountry,
         shiptocity: self.tiatd.shiptocity,
         shiptostate: self.tiatd.shiptostate,
         shiptozipcd: self.tiatd.shiptozipcd,
         shiptogeocd: self.tiatd.shiptogeocd,
         shiptooutofcityfl: self.tiatd.shiptooutofcityfl,
         shiptocountry: self.tiatd.shiptocountry,
         acceptcity: self.tiatd.acceptcity,
         acceptstate: self.tiatd.acceptstate,
         acceptzipcd: self.tiatd.acceptzipcd,
         acceptgeocd: self.tiatd.acceptgeocd,
         acceptoutofcityfl: self.tiatd.acceptoutofcityfl,
         acceptcountry: self.tiatd.acceptcountry,
         origincity: self.tiatd.origincity,
         originstate: self.tiatd.originstate,
         originzipcd: self.tiatd.originzipcd,
         origingeocd: self.tiatd.origingeocd,
         originoutofcityfl: self.tiatd.originoutofcityfl,
         origincountry: self.tiatd.origincountry,
         canadafl: self.tiatd.canadafl,
         pointoftransfer: self.tiatd.pointoftransfer,
         prodcode: self.tiatd.prodcode,
         serviceind: self.tiatd.serviceind,
         grossamt: self.tiatd.grossamt,
         exemptamt: self.tiatd.exemptamt
      };

      DataService.post('api/shared/assharedinquiry/tiatdcalculate', { data: calcCriteria, busy: true }, function (data) {
         if (data) {
            self.tiatd.federalTax = data.federal;
            self.tiatd.stateTax = data.state;
            self.tiatd.countyTax = data.county;
            self.tiatd.cityTax = data.city;
            self.tiatd.districtTax = data.district;
            self.tiatd.secstateTax = data.secstate;
            self.tiatd.seccountyTax = data.seccounty;
            self.tiatd.seccityTax = data.seccity;
            self.tiatd.errorcd = data.errorcd;
            self.tiatd.errorfl = data.errorfl;
         }
      }, function errorCallback(response) {
         self.tiatd.federalTax = 0;
         self.tiatd.stateTax = 0;
         self.tiatd.countyTax = 0;
         self.tiatd.cityTax = 0;
         self.tiatd.districtTax = 0;
         self.tiatd.secstateTax = 0;
         self.tiatd.seccountyTax = 0;
         self.tiatd.seccityTax = 0;
         self.tiatd.errorcd = response.Message;
         self.tiatd.errorfl = true;
      });
   };

});
