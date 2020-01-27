'use strict';

/**
 * Control for displaying address form fields.
 */
app.controller('AddressFormCtrl', function ($scope, $translate, Utils, UtilsData, DataService, Sasc, AodataService, MessageService, CacheService) {
   var self = this;
   self.COUNTRY_US = "us";
   self.COUNTRY_CA = "ca";
   self.TAXTYPE_BOTH = "b";
   self.TAXTYPE_ENTERPRISE = "e";
   self.TAXTYPE_SUT = "t";
   self.FUNCTIONNAME_TIATC = "tiatc";
   self.FUNCTIONNAME_TIATD = "tiatd";
   var customCtrl = $scope.customCtrl;
   var options = customCtrl.getOptions();
   self.taxMethodType = {};
   self.options = options;
   self.addressLabel = $translate.instant(options.addressLabel);
   self.functionName = options.functionName;
   self.isInternationalFormat = false;
   self.isVerizipInstalled = false;
   self.isOutOfCityEnabled = false;
   self.isGeoCodeEnabled = false;
   self.isGeoCodeEnterpriseVisible = false;
   self.isGeoCodeSalesUseTaxVisible = false;
   self.isTrackedFieldChanged = false;
   self.isGeoCodeVisible = false;
   self.addrMaxLength = 30;

   if (options.geoCodeVisible) {
      self.isGeoCodeVisible = true;
   }

   //Options that are function specific and not configured in the instance.
   self.isAddress1Hidden = false;
   self.isAddress1Enabled = true;
   self.isCountryEnabled = true;

   //NOTE: This pattern works because we marked it with "getter/Setter Model" flag in designer (Advanced section)
   if (options.addr1Model) {
      self.addr1 = function (newValue) {
         if (arguments.length) {
            //Utilizing the setNextedValue because it is good about handling complex objects
            Utils.setNestedValue($scope, options.addr1Model, newValue);
         } else {
            return Utils.getNestedValue($scope, options.addr1Model);
         }
      };
   }

   if (options.addr2Model) {
      self.addr2 = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.addr2Model, newValue);
         } else {
            return Utils.getNestedValue($scope, options.addr2Model);
         }
      };
   }

   if (options.addr3Model) {
      self.addr3 = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.addr3Model, newValue);
         } else {
            return Utils.getNestedValue($scope, options.addr3Model);
         }
      };
   }

   if (options.cityModel) {
      self.city = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.cityModel, newValue);
         } else {
            return Utils.getNestedValue($scope, options.cityModel);
         }
      };
   }

   if (options.stateModel) {
      self.state = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.stateModel, newValue);
         } else {
            return Utils.getNestedValue($scope, options.stateModel);
         }
      };
   }

   if (options.zipCodeModel) {
      self.zipCode = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.zipCodeModel, newValue);
         } else {
            return Utils.getNestedValue($scope, options.zipCodeModel);
         }
      };
   }

   if (options.countryCodeModel) {
      self.countryCd = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.countryCodeModel, newValue);
         } else {
            return Utils.getNestedValue($scope, options.countryCodeModel);
         }
      };
   }

   if (options.geoCodeModel) {
      self.geoCode = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.geoCodeModel, newValue);
         } else {
            return Utils.getNestedValue($scope, options.geoCodeModel);
         }
      };
   }

   if (options.outOfCityFlagModel) {
      self.isOutOfCity = function (newValue) {
         if (arguments.length) {
            Utils.setNestedValue($scope, options.outOfCityFlagModel, newValue);
         } else {
            return Utils.getNestedValue($scope, options.outOfCityFlagModel);
         }
      };
   }

   self.getVeriZipEnablement = function () {
      var veraData = CacheService.get(false, 'M', 'VERA', 'VERA');
      if (veraData === null) {
         DataService.get('api/ar/asarsetup/isverazipinstalledforenablement', { busy: true }, function (data) {
            CacheService.set(false, 'M', 'VERA', 'VERA', data, 240);
            self.isVerizipInstalled = data;
            self.initializeGeoCodeSensitivity();
         });
      } else {
         self.isVerizipInstalled = veraData;
         self.initializeGeoCodeSensitivity();
      }
   };

   self.getInternationalSettings = function () {
      self.isInternationalFormat = Sasc.freeformaddr;
   };

   self.getAdministrativeOptions = function () {
      self.taxMethodType = AodataService.getValue('TAX', 'TaxInterfaceTy');
      self.isOutOfCityEnabled = self.isVerizipInstalled ? true : false;
      //Check if Allow Expanded Name/Address      
      if (options.useExpandedAddr) {
         self.addrMaxLength = UtilsData.getNameAddressMaxLength();
      }
   };

   // We override a few settings because some tables have specific business rules that we can't utilize the
   // design time setup.  It makes it too complex to build these unique use-cases into the designer.
   self.setFunctionSpecificFlags = function () {
      if (self.functionName) {
         switch (self.functionName.toLowerCase()) {
            case self.FUNCTIONNAME_TIATC:
               if (self.taxMethodType.toLowerCase() === self.TAXTYPE_SUT) {
                  self.isAddress1Hidden = true;
                  self.isAddress1Enabled = false;
                  self.isCountryEnabled = false;
               } else {
                  //Enterprise (type is 'e')
                  self.isAddress1Hidden = false;
                  self.isAddress1Enabled = true;
                  self.isCountryEnabled = true;
               }

               break;
            case self.FUNCTIONNAME_TIATD:
               if (self.taxMethodType.toLowerCase() === self.TAXTYPE_SUT) {
                  self.isAddress1Hidden = true;
                  self.isAddress1Enabled = false;
                  self.isCountryEnabled = false;
               } else {
                  //Enterprise (type is 'e')
                  self.isAddress1Hidden = true;
                  self.isAddress1Enabled = false;
                  self.isCountryEnabled = true;
               }

               break;
         }
      }
   };

   self.isCountryQualifiedForGeoCodeFeature = function (countryCode) {
      if (countryCode) {
         if (countryCode.length === 0 || countryCode.toLowerCase() === self.COUNTRY_CA || countryCode.toLowerCase() === self.COUNTRY_US) {
            return true;
         } else {
            return false;
         }
      } else {
         return true;
      }
   };

   if (options.conditionReadonly) {
      $scope.$watch(options.conditionReadonly, function (newValue) {
         if (newValue) {
            self.isReadOnly = true;
         } else {
            self.isReadOnly = false;
         }
      });
   }

   //The purpose of this is to provide a function to the calling controller to reach into this
   //AddressControl validation logic. It returns true if validation passes and false if it fails.
   self.validate = function () {
      //Only show this error if the GeoCode is actually visible.  Some places (i.e. SASTT-Division), it's not.
      if (self.isGeoCodeVisible && self.isGeoCodeEnabled && self.isTrackedFieldChanged) {
         //TODO: Need to Auto-launch the lookup here when the LU's are more robust.  Remove the message after it's in place too.
         MessageService.error('global.error', 'message.address.fields.changed.launch.geocode.lookup');
         return false;
      } else {
         return true;
      }
   };

   //Take in the mode as input simply for using as pass-thru to the 'trackedFieldChanged'.
   self.zipCodeChanged = function (mode) {
      self.trackedFieldChanged(mode);

      //If instance is trapping for ZipCode change, call that function as well on
      //the calling controller (i.e. ARSC, ARSS has this). 
      self.zipCodeChangedCallback();
   };

   self.trackedFieldChanged = function (mode) {
      if (((mode === self.TAXTYPE_BOTH || mode === self.TAXTYPE_ENTERPRISE) && self.taxMethodType === self.TAXTYPE_ENTERPRISE) ||
         (mode === self.TAXTYPE_BOTH && self.taxMethodType === self.TAXTYPE_SUT && self.isCountryQualifiedForGeoCodeFeature())) {
         if (self.geoCode) {
            self.geoCode(0);
         }
         if (self.isOutofCity) {
            self.isOutOfCity(false);
         }
         self.isTrackedFieldChanged = true;

         //TODO: Some Additional use-cases we can add at some point when the LU's are more robust.
         //Another Use-case: "Auto Populate GeoCode if only One result in GEO Codes (i.e. "New Franken"  "WI").  It looks like GUI did this but not WebUI.
         //1) User enters Address, City and State.
         //2) Presses Save in calling program.
         //3) The calling program reaches in here.
         //4) If only one result exists from the LU call we auto-populate the Zip Code and the GEO Code.
      }
   };

   //This gets the name of dynamic function for the zipCodeChanged function in the consumer of this call.
   //That controller is responsible for handling the change of a ZipCode.  It's not common for this
   //function to be set.
   self.zipCodeChangedCallback = function () {
      if (options.zipCodeChangedFunction) {
         var fn = Utils.getNestedValue($scope, options.zipCodeChangedFunction);
         if (fn) {
            return fn();
         }
      } else {
         return null;
      }
   };

   //This gets the name of dynamic function for the getGeoCodeLookupCriteria function in the consumer of this call.
   //That controller is responsible for building out the Criteria object contents for the GeoCode Lookup.
   self.getGeoCodeLookupCriteria = function () {
      var fn = Utils.getNestedValue($scope, options.geoCodeLookupCriteriaFunction);
      if (fn) {
         return fn();
      }
   };

   //Depending on the license purchased for Taxware, some features are tied down. The "Sales Use Tax" is a lighter version than
   //the "Enterprise". Do not enable geo code if not visible.
   self.initializeGeoCodeSensitivity = function () {
      self.isOutOfCityEnabled = self.isVerizipInstalled && self.taxMethodType === self.TAXTYPE_ENTERPRISE ? true : false;
      self.isGeoCodeEnabled = self.isVerizipInstalled && self.isGeoCodeVisible &&
         (self.taxMethodType === self.TAXTYPE_ENTERPRISE ||
            (self.taxMethodType === self.TAXTYPE_SUT && self.isCountryQualifiedForGeoCodeFeature())) ? true : false;
   };

   //Anytime the GeoCode changes, we want to update other address fields from the results of the lookup.
   self.geoCodeChanged = function (args) {
      var geoCodeModel = args.record;
      if (geoCodeModel) {
         self.isTrackedFieldChanged = false;
         if (self.taxMethodType === self.TAXTYPE_ENTERPRISE) {
            self.state(geoCodeModel.state);
            self.countryCd(geoCodeModel.countrycd);
            self.isOutOfCity(geoCodeModel.outofcityfl);
            //Only overwrite the City if the address is in the US and the City was returned from TWE
            if (geoCodeModel.city && self.countryCd && (self.countryCd() === '' || self.countryCd().toLowerCase() === self.COUNTRY_US)) {
               self.city(geoCodeModel.city);
            }
            //Only overwrite the Zip Code if the address is in the US and the Zip Code was returned from TWE
            if (geoCodeModel.zipcd && self.countryCd && (self.countryCd() === '' || self.countryCd().toLowerCase() === self.COUNTRY_US)) {
               self.zipCode(geoCodeModel.zipcd);
            }
         } else if (self.taxMethodType === self.TAXTYPE_SUT) {
            //NOTE:  Yes, the SUT vs Enterprise has different fields we need to pull from the GEO Code Lookup.  They are inconsistent,
            //but that's the way it is.
            self.state(geoCodeModel.statecode);
            //For other countries, we don't want to overwrite the City or ZipCode
            if (self.countryCd && (self.countryCd() === '' || self.countryCd() === self.COUNTRY_US)) {
               self.city(geoCodeModel.cityname);
               self.zipCode(geoCodeModel.zip1);
            }
         }
      }
   };

   self.getAdministrativeOptions();
   self.getVeriZipEnablement();
   self.getInternationalSettings();
   self.setFunctionSpecificFlags();

   // Notify that the controller is now ready
   customCtrl.ready(self);
});
