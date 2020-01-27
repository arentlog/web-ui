'use strict';

app.config(function ($stateProvider, StateProvider) {
   StateProvider.addSimpleEntryBaseState('ti', 'tiatc');
   StateProvider.addMasterState('ti', 'tiatc');
});

app.controller('TiatcBaseCtrl', function ($state, Utils) {
   var self = this;

   self.sidebarCollapsed = true;

   self.isMaster = function () {
      return $state.is('tiatc.master');
   };

   self.includesMaster = function () {
      return $state.includes('tiatc.master');
   };
});

app.controller('TiatcMasterCtrl', function ($scope, $state, DataService) {
   var self = this;
   var base = $scope.base;

   // New record to enter
   self.tiatc = {};

   // Clear form
   self.clear = function () {
      self.tiatc = {};

      // Reload the initial values
      self.loadInitialValues();
   };

   // Primary address geocode lookup parameters
   self.getGeoCodeLookupCriteria = function () {
      return {
         tablename: 'tiatc',
         streetaddr: self.tiatc.addr1,
         city: self.tiatc.city,
         state: self.tiatc.state,
         zipcd: self.tiatc.zipcd,
         country: self.tiatc.country,
         geocd: self.tiatc.geocd,
         outofcityfl: self.tiatc.outofcityfl
      };
   };

   // Secondary geocode lookup parameters
   self.getSecGeoCodeLookupCriteria = function () {
      return {
         tablename: 'tiatc',
         streetaddr: self.tiatc.addr1,
         city: self.tiatc.seccity,
         state: self.tiatc.state,
         zipcd: self.tiatc.seczipcd,
         country: self.tiatc.country,
         geocd: self.tiatc.secgeocd,
         outofcityfl: self.tiatc.outofcityfl
      };
   };

   self.secGeoCodeChanged = function (args) {
      var geoCodeModel = args.record;
      if (geoCodeModel) {
         self.isTrackedFieldChanged = false;
         if (self.tiatc.taxinterfacety.toLowerCase() === 't') {
            if (!self.tiatc.country || self.tiatc.country.toLowerCase() === 'us') {
               self.tiatc.seccity = geoCodeModel.cityname;
               self.tiatc.seczipcd = geoCodeModel.zip1;
            }
         }
      }
   };

   self.loadInitialValues = function () {
      var params = {
      };
      DataService.get('api/shared/assharedinquiry/tiatcload', { params: params }, function (data) {
         if (data) {
            self.tiatc.addresssensitive = data.addresssensitive;
            self.tiatc.country = data.country.toLowerCase();
            self.tiatc.countrysensitive = data.countrysensitive;
            self.tiatc.locationsensitive = data.locationsensitive;
            self.tiatc.outofcitysensitive = data.outofcitysensitive;
            self.tiatc.rowpointer = data.rowpointer;
            self.tiatc.seccitysensitive = data.seccitysensitive;
            self.tiatc.seccountysensitive = data.seccountysensitive;
            self.tiatc.secgeocdsensitive = data.secgeocdsensitive;
            self.tiatc.seczipcdsensitive = data.seczipcdsensitive;
            self.tiatc.serviceind = data.serviceind;
            self.tiatc.taxinterfacety = data.taxinterfacety;
         }
         self.tiatc.geocd = 0;
         self.tiatc.secgeocd = 0;
         self.tiatc.location = 'T';
         self.tiatc.federalTax = 0;
         self.tiatc.stateTax = 0;
         self.tiatc.countyTax = 0;
         self.tiatc.cityTax = 0;
         self.tiatc.districtTax = 0;
         self.tiatc.secstateTax = 0;
         self.tiatc.seccountyTax = 0;
         self.tiatc.seccityTax = 0;
         self.tiatc.errorcd = '';
         self.tiatc.errorfl = false;
      });
   };

   // Load the initial values
   self.loadInitialValues();

   // Submit data for the tax calculation
   self.submit = function () {

      var calcCriteria = {
         rowpointer: self.tiatc.rowpointer,
         taxinterfacety: self.tiatc.taxinterfacety,
         address: self.tiatc.addr1,
         city: self.tiatc.city,
         county: self.tiatc.county,
         state: self.tiatc.state,
         zipcd: self.tiatc.zipcd,
         geocd: self.tiatc.geocd,
         outofcityfl: self.tiatc.outofcityfl,
         country: self.tiatc.country,
         seccity: self.tiatc.seccity,
         seccounty: self.tiatc.seccounty,
         seczipcd: self.tiatc.seczipcd,
         secgeocd: self.tiatc.secgeocd,
         location: self.tiatc.location,
         prodcode: self.tiatc.prodcode,
         serviceind: self.tiatc.serviceind,
         grossamt: self.tiatc.grossamt,
         exemptamt: self.tiatc.exemptamt
      };

      DataService.post('api/shared/assharedinquiry/tiatccalculate', { data: calcCriteria, busy: true }, function (data) {
         if (data) {
            self.tiatc.federalTax = data.federal;
            self.tiatc.stateTax = data.state;
            self.tiatc.countyTax = data.county;
            self.tiatc.cityTax = data.city;
            self.tiatc.districtTax = data.district;
            self.tiatc.secstateTax = data.secstate;
            self.tiatc.seccountyTax = data.seccounty;
            self.tiatc.seccityTax = data.seccity;
            self.tiatc.errorcd = data.errorcd;
            self.tiatc.errorfl = data.errorfl;
         }
      }, function errorCallback(response) {
         self.tiatc.federalTax = 0;
         self.tiatc.stateTax = 0;
         self.tiatc.countyTax = 0;
         self.tiatc.cityTax = 0;
         self.tiatc.districtTax = 0;
         self.tiatc.secstateTax = 0;
         self.tiatc.seccountyTax = 0;
         self.tiatc.seccityTax = 0;
         self.tiatc.errorcd = response.Message;
         self.tiatc.errorfl = true;
      });

   };

});
