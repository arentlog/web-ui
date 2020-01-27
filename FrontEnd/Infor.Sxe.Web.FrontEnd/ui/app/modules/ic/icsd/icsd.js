'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'ic',
      menuFn: 'icsd',
      dataPath: 'api/ic/icsd',
      searchMethod: 'POST',
      searchPath: 'api/ic/icsd/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'warehouselookupresults',
      searchDefaultWarehouseField: 'whse',
      resultsRowIdField: 'icsdRowid',
      createStateView: 'ic/icsd/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ic/icsd/copy.json',
      copyMethod: 'POST',
      copyPath: 'api/ic/asicsetup/icwarehousecopy',
      primaryKeyParams: ['whse'],
      recentlyVisited: {
         title: { label: 'global.warehouse', value: 'whse' },
         description: {
            label: null,
            value: 'name'
         }
      }
   });
});

app.service('IcsdService', function ($state, MessageService, MruService, AodataService, Sasoo, Sasc, DataService, ConfigService, CacheService, UtilsData, SecurityService) {

   this.extendMasterController = function (self, base) {

      //Check if Allow Expanded Name/Address      
      base.whseMaxLength = UtilsData.getNameAddressMaxLength();

      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      // List of available search criteria fields
      self.criteriaList = [
         { value: 'phoneno', label: MessageService.get('global.phone.number') },
         { value: 'city', label: MessageService.get('global.city') },
         { value: 'state', label: MessageService.get('global.state') },
         { value: 'recordcountlimit', label: MessageService.get('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['phoneno'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ic/icsd/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.warehouselookupresults;
            }
         });
      };
   };

   this.extendDetailController = function (self, base, icsd) {
      self.sasoo = Sasoo;
      self.divisional = Sasc.gldivfl;

      self.taxMethodType = AodataService.getValue("TAX", "taxmethodty");
      self.taxInterfaceType = AodataService.getValue("TAX", "taxinterfacety");
      self.markupAddons = AodataService.getValue("WT", "WTLineMarkupAddons");
      self.allowRental = AodataService.getValue("SM", "AllowRental");
      self.divnoDropDownOptions = [];
      self.banknoDropDownOptions = [];

      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'General') < 3;
      self.isCountTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'Count') < 3;
      self.isExtendedTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'Extended') < 3;
      self.isTaxingTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'Taxing') < 3;
      self.isOtherTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'Other') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'Custom') < 3;
      self.isRouteTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'Route') < 3;
      self.iseCommerceTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'eCommerce') < 3;
      self.isStoreroomTabReadonly = SecurityService.getSubSecurityLevel('icsd', 'Storeroom') < 3;
      
      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('ic', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });

      self.getVeriZipEnablement = function () {
         var veraData = CacheService.get(false, 'M', 'VERA', 'VERA');
         if (veraData === null) {
            DataService.get('api/ar/asarsetup/isverazipinstalledforenablement', { busy: true }, function (data) {
               CacheService.set(false, 'M', 'VERA', 'VERA', data, 240);
               self.isVerizipInstalled = data;
               self.initializeSpecialTaxCode();
            });
         } else {
            self.isVerizipInstalled = veraData;
            self.initializeSpecialTaxCode();
         }
      };

      self.initializeSpecialTaxCode = function () {
         self.isSpecialTaxCodeEnabled = self.isVerizipInstalled && (self.taxInterfaceType.toUpperCase() === 'E' || self.taxInterfaceType.toUpperCase() === 'T') ? true : false;
      };

      self.getGeoCodeLookupCriteria = function () {
         return {
            tablename: 'icsd',
            whse: icsd.whse,
            streetaddr: icsd.addr1,
            city: icsd.city,
            state: icsd.state,
            zipcd: icsd.zipcd,
            country: Sasc.country,
            geocd: icsd.geocd,
            outofcityfl: icsd.outofcityfl
         };
      };

      // When the full icsd object has been resolved, fetch the corresponding glacct data
      icsd.$promise.then(function () {
         MruService.addToList('Warehouse', icsd.rowpointer, icsd.whse + ' - ' + icsd.name, icsd.whse);

         self.getSasgs();
         self.autonotespickticket = icsd.srnoteprnt.includes('ap');
         self.autonotesinvoice = icsd.srnoteprnt.includes('ai');
         self.automansrnotespick = self.icsd.srnoteprnt.includes('sp');
         self.automansrnotesinvoice = self.icsd.srnoteprnt.includes('si');
         self.initialTaxingStateCd();
         self.initialTaxingCountyCd();
         self.initialTaxingCityCd();
         if (self.taxMethodType === 'v') {
            self.icsd.taxauth = 'gov';
         }

      });

      self.customSubmit = function () {
         // update icsd.srnoteprnt based on chechbox values
         icsd.srnoteprnt = '';
         if (self.autonotespickticket && !icsd.srnoteprnt.includes('ap')) {
            icsd.srnoteprnt += 'ap,';
         }
         if (self.autonotesinvoice && !icsd.srnoteprnt.includes('ai')) {
            icsd.srnoteprnt += 'ai,';
         }
         if (self.automansrnotespick && !icsd.srnoteprnt.includes('sp')) {
            icsd.srnoteprnt += 'sp,';
         }
         if (self.automansrnotesinvoice && !icsd.srnoteprnt.includes('si')) {
            icsd.srnoteprnt += 'si,';
         }
         if (icsd.srnoteprnt !== '') {
            icsd.srnoteprnt = icsd.srnoteprnt.slice(0, -1); // remove the trailing comma
         }

         // Perform UI validation
         var isValid = self.validateForm();

         if (isValid) {
            // The OEDC will only exist if it's tab has been activated
            if (self.oedc) {
               // Handle create (POST) and update (PUT)
               var method = self.isOedcRecordNew ? 'POST' : 'PUT';

               // When saving OEDC, only save the ICSD after OEDC save succeeds
               DataService.send('api/oe/oedc', { method: method, data: self.oedc, busy: true }, function (oedc) {

                  // Catch created oedc record (which is no longer new) since save of icsd may fail
                  self.oedc = oedc;
                  self.isOedcRecordNew = false;
                  self.submitGLDataAndICSD();

               });
               // else if not oedc
            } else {
               self.submitGLDataAndICSD();
            }
         }
      };

      // Perform any custom UI validation
      self.validateForm = function () {
         var isValid = true;

         // Validate the address control (address control will only exist if its tab has been activated)
         if (self.addressControl) {
            isValid = self.addressControl.validate();
         }

         return isValid;
      };

      self.submitGLDataAndICSD = function () {
         if (self.hasGLData) {

            var glsavecriteria = [{
               whse: icsd.whse,
               icaddonexpglacct: self.icaddonexpglacct,
               icaddonrevglacct: self.icaddonrevglacct,
               icinvintransitglacct: self.icinvintransitglacct,
               icaddonintransitglacct: self.icaddonintransitglacct,
               icinterdivisionalglacct: self.icinterdivisionalglacct,
               rowidIcsd: self.icsd.rowID
            }];

            DataService.post('api/ic/asicsetup/icwarehouseglsave', { data: glsavecriteria, busy: true }, function () {
               self.submit();
            });
         } else {
            self.submit();
         }
      };

      self.initialTaxingStateCd = function () {
         if (self.taxMethodType === 's') {
            self.taxingCounties = DataService.getList('api/sa/sasgm/getlistbyquery/3/1?statecd=' + icsd.statecd);

         } else if (self.taxMethodType === 'g') {
            var sasglfetchcriteria = { state: icsd.statecd };
            DataService.post('api/sa/sasgl/getsasgllistallbystate', { data: sasglfetchcriteria, busy: true }, function (data) {
               if (data) {
                  self.taxingAuthorities = data;
               }
            });
            self.getSasgs();
         }
      };

      self.initialTaxingCountyCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: icsd.statecd,
               countycd: icsd.countycd
            };
            self.taxingCities = DataService.getList('api/sa/sasgm/getlistbyquery/4/1', { params: params });
         }
      };

      self.initialTaxingCityCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: icsd.statecd,
               countycd: icsd.countycd,
               citycd: icsd.citycd
            };
            self.taxingOthers = DataService.getList('api/sa/sasgm/getlistbyquery/5/1?', { params: params });
         }
      };

      self.changeTaxingCountyCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: icsd.statecd,
               countycd: icsd.countycd
            };
            icsd.citycd = '';
            icsd.other1 = '';
            icsd.other2 = '';

            self.taxingCities = DataService.getList('api/sa/sasgm/getlistbyquery/4/1', { params: params });
         }
      };

      self.changeTaxingCityCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: icsd.statecd,
               countycd: icsd.countycd,
               citycd: icsd.citycd
            };
            icsd.other1 = '';
            icsd.other2 = '';

            self.taxingOthers = DataService.getList('api/sa/sasgm/getlistbyquery/5/1', { params: params });
         }
      };

      self.changeTaxingStateCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: icsd.statecd
            };
            icsd.countycd = '';
            icsd.citycd = '';
            icsd.other1 = '';
            icsd.other2 = '';

            self.taxingCounties = DataService.getList('api/sa/sasgm/getlistbyquery/3/1', { params: params });

         } else if (self.taxMethodType === 'g') {
            icsd.taxauth = '';
            var sasglfetchcriteria = { state: icsd.statecd };
            DataService.post('api/sa/sasgl/getsasgllistallbystate', { data: sasglfetchcriteria, busy: true }, function (data) {
               if (data) {
                  self.taxingAuthorities = data;
               }
            });
            self.getSasgs();
         }
      };

      self.getSasgs = function () {
         var params = {
            state: icsd.statecd,
            fldlist: 'harmonizedfl'
         };

         DataService.get('api/sa/sasgs/getbypk', { params: params }, function (data) {
            if (data) {
               self.sasgs = data;
            }
         });
      };

      self.getVeriZipEnablement();
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {

      request.fromwhse = stateParams.object.whse;
      request.fromname = stateParams.object.name;
      request.towhse = stateParams.object.whse;
      request.name = stateParams.object.name;

   };

   this.extendCreateController = function (self, base, icsd) {

      icsd.salesfl = true;
      icsd.ickcost = 0;
      icsd.icrcost = 0;
      icsd.vminweeks = 0;
      icsd.vmaxweeks = 0;
      icsd.wtkcost = 0;
      icsd.wtrcost = 0;
      icsd.tminweeks = 0;
      icsd.tmaxweeks = 0;
      icsd.revcycldays = 0;
      icsd.icpctfrmt1 = 1;
      icsd.icpctfrmt2 = 1;
      icsd.icpccfrmt1 = 1;
      icsd.icpccfrmt2 = 1;
      icsd.approvety = 'A';
      icsd.ibcoeshipdoc = 'P';
      icsd.ibcscanworkflow = false;
      icsd.bofl = true;
      icsd.addonamt1 = 0;
      icsd.addonamt2 = 0;
      icsd.addontype1 = '%';
      icsd.addontype2 = '%';
      icsd.addondist = 'N';
      icsd.arptype = 'V';
      icsd.begordno = 1;
      icsd.nextordno = 1;
      icsd.endordno = 99999999;
      icsd.begpono = 1;
      icsd.nextpono = 1;
      icsd.endpono = 9999999;
      icsd.begwono = 1;
      icsd.nextwono = 1;
      icsd.endwono = 9999999;
      icsd.begrcvno = 1;
      icsd.nextrcvno = 1;
      icsd.endrcvno = 9999999;
      icsd.begvano = 1;
      icsd.nextvano = 1;
      icsd.endvano = 9999999;
      icsd.begpono = 1;
      icsd.nextpono = 1;
      icsd.enddaycut = 2400;
      icsd.jitdays = 0;
      icsd.reservedays = 0;
      icsd.reservwknd = '';
      icsd.custno = 0;
      icsd.altwhsefillty = 'D';
      icsd.altwhsebotype = 'A';
      icsd.ecommercety = '';
      icsd.esourcebyty = '';
      icsd.srapprovety = 'Y';
      icsd.srautoinv = 'N';
      icsd.srbobillrcptcd = 'D';
      icsd.longitude = 0;
      icsd.latitude = 0;
      icsd.starttm = '00:00';
      icsd.endtm = '00:00';
      icsd.fixedtm = 0;
      icsd.unloadrate = 0;
      icsd.symbol = 0;
      icsd.size = 0;
      icsd.color = 0;
      icsd.fixedloc = false;
      icsd.divisional = Sasc.gldivfl;
      icsd.icpcrange = '';
      icsd.usagemovety = 'Y';
      self.divnoDropDownOptions = [];

      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('ic', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });

      self.getGeoCodeLookupCriteria = function () {
         return base.getGeoCodeLookupCriteria(icsd);
      };

      self.customSubmit = function () {
         if (!icsd.billtowhse) {
            icsd.billtowhse = icsd.whse;
         }
         self.submit();
      };
   };
});
/**
 * Controller for the Route tab view. We only need to fetch the OEDC record
 * when the user has activated this tab.
 */
app.controller('IcsdDetailRouteCtrl', function ($scope, DataService, UserService) {
   var self = this;
   var dtl = $scope.dtl;

   // After making sure the full icsd object has been resolved, fetch the corresponding oedc record
   dtl.icsd.$promise.then(function () {
      var params = {
         key1: dtl.icsd.whse
      };

      DataService.get('api/oe/oedc/getbyquery/W', { params: params, busy: true }, function (oedc) {
         if (oedc) {
            dtl.oedc = oedc;
         } else {
            // If oedc doesn't exist, make a new one
            dtl.oedc = {
               cono: UserService.getCono(),
               key1: dtl.icsd.whse,
               key2: '',
               typecd: 'W'
            };

            // Set flag for submit to check
            dtl.isOedcRecordNew = true;
         }
      });
   });
});

/*** Controller for the Other tab view. VAlidate the GL */
app.controller('IcsdDetailOtherCtrl', function ($scope, DataService) {
   var self = this;
   var dtl = $scope.dtl;

   // When the full crsb object has been resolved, fetch the corresponding glacct data
   dtl.icsd.$promise.then(function () {
      var glfetchcriteria = { whse: dtl.icsd.whse };

      DataService.post('api/ic/asicsetup/icwarehouseglfetch', { data: glfetchcriteria, busy: true }, function (data) {
         if (data) {
            dtl.icaddonexpglacct = data.icaddonexpglacct;
            dtl.icaddonrevglacct = data.icaddonrevglacct;
            dtl.icinvintransitglacct = data.icinvintransitglacct;
            dtl.icaddonintransitglacct = data.icaddonintransitglacct;
            dtl.icinterdivisionalglacct = data.icinterdivisionalglacct;
            dtl.hasGLData = true;
         }
      });
   });

   self.icaddonexpglacctChanged = function (args) {
      if (args.value) {
         DataService.get('api/ic/asicsetup/validateglaccount/' + args.value, { busy: true });
      }
   };

   self.icaddonrevglacctChanged = function (args) {
      if (args.value) {
         DataService.get('api/ic/asicsetup/validateglaccount/' + args.value, { busy: true });
      }
   };

   self.icinvintransitglacctChanged = function (args) {
      if (args.value) {
         DataService.get('api/ic/asicsetup/validateglaccount/' + args.value, { busy: true });
      }
   };

   self.icaddonintransitglacctChanged = function (args) {
      if (args.value) {
         DataService.get('api/ic/asicsetup/validateglaccount/' + args.value, { busy: true });
      }
   };

   self.icinterdivisionallacctChanged = function (args) {
      if (args.value) {
         DataService.get('api/ic/asicsetup/validateglaccount/' + args.value, { busy: true });
      }
   };
});
