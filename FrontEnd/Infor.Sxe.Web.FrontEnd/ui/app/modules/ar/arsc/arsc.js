'use strict';

app.config(function (StateProvider, EmailSelectStateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arsc',
      dataPath: 'api/ar/arsc',
      searchMethod: 'POST',
      searchPath: 'api/ar/arsc/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'arcustomerlookupresults',
      resultsRowIdField: 'rowidArsc',
      primaryKeyParams: ['custno'],
      createStateView: 'ar/arsc/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ar/arsc/copy.json',
      copyMethod: 'POST',
      copyRequest: [],
      copyPath: 'api/ar/asarsetup/arcustomercopy',
      copySubTitle: [
         { label: null, value: 'custno' },
         { label: null, value: 'name' }
      ],
      detailSubTitle: [
         { label: null, value: 'custno' },
         { label: null, value: 'name' }
      ],
      recentlyVisited: {
         title: { label: 'global.customer.number', value: 'custno' },
         description: { label: null, value: 'name' }
      }
   });

   EmailSelectStateProvider.addStates('ar', 'arsc', 'arsc.detail');
});

app.service('ArscService', function ($state, $stickyState, $translate, DataService, GridService, Utils, UtilsData, AodataService, MessageService, ModalService, MruService, ConfigService, Sasoo, Sasc, SecurityService, UserService) {

   this.extendBaseController = function (self) {
      // Check if National Programs is turned on
      self.isNationalProgramsOn = AodataService.getValue("PD", "PDNationalProgramsFl").toLowerCase() === 'yes';

      // Check for Order Fulfillment
      self.isOrderFulfillmentOn = AodataService.getValue("OE", "OEOrderFulfillment").toLowerCase() === 'yes';

      // Check for Validate Duplicate Lookup Name
      self.isValidateDupLookupNm = AodataService.getValue("AR", "ValidateDupLookupNm").toLowerCase() === 'yes';

      // Is Division Required
      self.isDivisionRequired = Sasc.gldivfl;

      //Check if Allow Expanded Name/Address
      self.custNameMaxLength = UtilsData.getNameAddressMaxLength();
   };

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordcountlimit: ConfigService.getDefaultRecordLimit()
      };

      self.criteriaList = [
         { value: 'custno', label: $translate.instant('global.customer.number') },
         { value: 'name', label: $translate.instant('global.customer.name') },
         { value: 'groupid', label: $translate.instant('global.group.number') },
         { value: 'firstnm', label: $translate.instant('global.first.name') },
         { value: 'lastnm', label: $translate.instant('global.last.name') },
         { value: 'city', label: $translate.instant('global.city') },
         { value: 'state', label: $translate.instant('global.state') },
         { value: 'zipcd', label: $translate.instant('global.zip.code') },
         { value: 'phoneno', label: $translate.instant('global.phone.number') },
         { value: 'lookupnm', label: $translate.instant('global.lookup.name') },
         { value: 'includeinactive', label: $translate.instant('global.include.inactive') },
         { value: 'recordcountlimit', label: $translate.instant('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['custno', 'name'];


      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);
         criteria.keywords = '';
         DataService.post('api/ar/arsc/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.arcustomerlookupresults;
            }
         });
      };

      self.customEdit = function () {

         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         if (self.selectedRecord) {
            var crit = {
               tablename: 'arsc',
               custno: self.selectedRecord.custno
            };
            DataService.post('/web/api/shared/checkrestricteditaccess', { data: crit, busy: true }, function (data) {
               if (data) {
                  if (data.success) {
                     $state.go('arsc.detail.edit', { id: self.selectedRecord.rowidArsc, object: self.selectedRecord });
                  }
                  else {
                     MessageService.error('global.error', 'global.security.violation.restricted.editing');
                  }
               }
            });
         }
      };
   };

   this.extendSearchController = function (self) {
      // When a known customer is selected from the lookup, redirect to detail screen since we have the desired customer
      self.customerSelected = function (args) {
         if (args.value) {
            $state.go('arsc.detail', { pk: args.value });
         }
      };
   };

   this.extendCreateController = function (self, base, arsc, scope) {

      //set default true values
      arsc.statustype = true;
      arsc.unearnedfl = true;
      arsc.synccrmfl = true;
      arsc.bofl = true;
      arsc.subfl = true;
      arsc.salesmgrfl = true;
      arsc.ardatcty = 'p';
      arsc.statementty = 'o';
      self.isDivisionRequired = Sasc.gldivfl;
      arsc.holdpercd = 2;
      arsc.enterdt = Utils.getCurrentDate();
      arsc.crestdt = Utils.getCurrentDate();
      //default taxable setting
      arsc.taxablety = 'y';
      arsc.noinvcopy = 1;
      arsc.easntype = 'e'; 
      self.divnoDropDownOptions = [];
      var lookupNameChg = false;

      // Load the "created" information
      var date = new Date();
      var time = Utils.pad(date.getHours().toString(), 2, '0') + Utils.pad(date.getMinutes().toString(),2,'0');
      arsc.createdby = UserService.getUserName();
      arsc.createddt = Utils.getCurrentDate(); 
      arsc.createdproc = MessageService.get('global.arsc.create');
      arsc.createdtm = time;

      self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty').toLowerCase();

      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('ar', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });

      self.changeTaxableType = function () {
         if (self.arsc.taxablety.toLowerCase() === 'y') {
            self.arsc.nontaxtype = '';
         }
      };

      self.changeLookupNm = function (fieldChanged) {
         if (fieldChanged === 'Lkup') {
            lookupNameChg = true;
         } else if (!lookupNameChg) {
            arsc.lookupnm = arsc.name.substring(0, 15);
         }
      };
   };

   this.extendDetailController = function (self, base, arsc, scope) {
      self.sasoo = Sasoo;
      self.taxInterfaceType = AodataService.getValue('TAX', 'taxinterfacety').toLowerCase();
      self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty').toLowerCase();
      self.refreshCAData = false;
      self.statecdSUTRequired = true;
      self.isDivisionRequired = Sasc.gldivfl;
      self.isCustProdAllowed = Sasc.iccstprdfl;
      self.canUpdateShipTo = false;
      self.divnoDropDownOptions = [];
      self.banknoDropDownOptions = [];
      self.firstARSCEditCheck = true;
      self.editButtonVisible = true;

      self.securityLevelARSC = SecurityService.getSecurityLevel('arsc');
      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'General') < 3;
      self.isOrderingTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'Ordering') < 3;
      self.isGLTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'GL') < 3;
      self.isCreditTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'Credit') < 3;
      self.isTaxingTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'Taxing') < 3;
      self.isEcommerceTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'Ecommerce') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'Custom') < 3;
      self.isRouteTabReadonly = SecurityService.getSubSecurityLevel('arsc', 'Route') < 3;

      // Check if ISM is live
      self.isIsmLive = AodataService.getValue("SM", "ismlive");

      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('ar', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });

      self.acknowledgeSendByTypes = [
         { label: MessageService.get('global.fax'), value: 'f' },
         { label: MessageService.get('global.edi'), value: 'e' },
         { label: MessageService.get('global.ion'), value: 'i' },
         { label: MessageService.get('global.xml'), value: 'x' },
         { label: MessageService.get('global.email'), value: 'm' }
      ];

      self.invoiceSendByTypes = [
         { label: MessageService.get('global.fax'), value: 'f' },
         { label: MessageService.get('global.edi'), value: 'e' },
         { label: MessageService.get('global.ion'), value: 'i' },
         { label: MessageService.get('global.xml'), value: 'x' },
         { label: MessageService.get('global.do.not.distribute'), value: 'd' },
         { label: MessageService.get('global.email'), value: 'm' }
      ];

      self.statementSendByTypes = [
         { label: MessageService.get('global.fax'), value: 'f' },
         { label: MessageService.get('global.edi'), value: 'e' },
         { label: MessageService.get('global.email'), value: 'm' }
      ];

      self.asnSendByTypes = [
         { label: MessageService.get('global.edi'), value: 'e' },
         { label: MessageService.get('global.ion'), value: 'i' }
      ];

      self.proposalSendByTypes = [
         { label: MessageService.get('global.fax'), value: 'f' },
         { label: MessageService.get('global.email'), value: 'm' }
      ];

      self.editButtonVisibility = function () {        
         if (self.arsc) {
            if (self.arsc.custno) {
               // Only execute this SI call once, for the detail view access for the ARSC record.
               if (self.firstARSCEditCheck) {
                  self.firstARSCEditCheck = false;
                  var crit = {
                     tablename: 'arsc',
                     custno: self.arsc.custno
                  };
                  DataService.post('/web/api/shared/checkrestricteditaccess', { data: crit, busy: true }, function (data) {
                     if (data) {
                        if (!data.success) {
                           self.editButtonVisible = false;
                        }
                     }
                  });
               }
            }
         }
         return self.editButtonVisible;
      };

      //User Hook (do not rename)
      self.zipCodeChangedContinue = function (data) {
         if (data.ttblsasstdefaults.warningMessage) {
            MessageService.info('global.information', data.ttblsasstdefaults.warningMessage);
         }
      };

      //Zipcode changes, we need to make a backend call to get default Taxing Authorities
      //and assign them on the record.
      self.zipCodeChanged = function () {
         var criteria = {
            zipcd: self.arsc.zipcd,
            statecd: self.arsc.statecd,
            countycd: self.arsc.countycd,
            citycd: self.arsc.citycd,
            other1cd: self.arsc.other1cd,
            other2cd: self.arsc.other2cd,
            whse: self.arsc.whse
         };

         //User Hook (do not rename)
         if (self.getSasstdefaultsCriteria) {
            self.getSasstdefaultsCriteria(criteria);
         }

         var crit = {
            ttblsasstdefaults: criteria
         };
         DataService.post('/web/api/sa/getsasstdefaults', { data: crit, busy: true }, function (data) {
            if (data) {
               if (data.ttblsasstdefaults) {
                  arsc.whse = data.ttblsasstdefaults.whse;
                  arsc.statecd = data.ttblsasstdefaults.statecd;

                  if (self.taxMethodType === 's') {
                     arsc.statecdSUT = data.ttblsasstdefaults.statecd;   //This is what the dropdown is bound to.
                  } else if (self.taxMethodType === 'g') {
                     arsc.statecdGST = arsc.statecd;
                  } else if (self.taxMethodType === 'v') {
                     arsc.statecdVAT = arsc.statecd;
                  }

                  //Since the Statecd changed, we need to rebuild the dropdowns with the appropriate values based on the
                  //related parent keys.
                  //Only look for Standard Taxing since that's the only values that can be built in the dropdowns
                  if (self.taxMethodType === 's') {

                     //State changed, get the valid Counties.
                     DataService.getList('api/sa/sasgm/getlistbyquery/3/1?statecd=' + arsc.statecd, function (countyData) {
                        if (countyData) {
                           self.taxingCounties = countyData;
                           arsc.countycd = data.ttblsasstdefaults.countycd;

                           //County changed, get the valid Cities.
                           var params = {
                              statecd: arsc.statecd,
                              countycd: arsc.countycd
                           };
                           DataService.getList('api/sa/sasgm/getlistbyquery/4/1', { params: params }, function (cityData) {
                              if (cityData) {
                                 self.taxingCities = cityData;
                                 arsc.citycd = data.ttblsasstdefaults.citycd;

                                 //City Changed, now find Other
                                 var params = {
                                    statecd: arsc.statecd,
                                    countycd: arsc.countycd,
                                    citycd: arsc.citycd
                                 };
                                 DataService.getList('api/sa/sasgm/getlistbyquery/5/1?', { params: params }, function (otherData) {
                                    if (otherData) {
                                       self.taxingOthers = otherData;

                                       arsc.other1cd = data.ttblsasstdefaults.other1cd;
                                       arsc.other2cd = data.ttblsasstdefaults.other2cd;
                                    }
                                 });
                              }
                           });
                        }
                     });
                  }

                  //User Hook (do not rename)
                  self.zipCodeChangedContinue(data);
               }
            }
         });
      };

      self.getGeoCodeLookupCriteria = function () {
         return {
            tablename: 'arsc',
            custno: arsc.custno,
            streetaddr: arsc.addr1,
            city: arsc.city,
            state: arsc.state,
            zipcd: arsc.zipcd,
            country: arsc.countrycd,
            geocd: arsc.geocd,
            outofcityfl: arsc.outofcityfl
         };
      };

      self.getTaxCertLabel = function () {
         if (self.taxMethodType === 's') {
            return $translate.instant('global.tax.certificate.number');
         } else if (self.taxMethodType === 'g') {
            return $translate.instant('pst.license.number');
         } else {
            return $translate.instant('global.blank');
         }
      };

      self.getTaxExpDateLabel = function () {
         if (self.taxMethodType === 's') {
            return $translate.instant('global.tax.certificate.exp.date');
         } else if (self.taxMethodType === 'g') {
            return $translate.instant('pst.lic.number.expiry.dt');
         } else {
            return $translate.instant('global.blank');
         }
      };

      self.getCanadianTaxCertLabel = function () {
         if (self.taxMethodType === 'g') {
            return $translate.instant('gst.certificate.number');
         } else if (self.taxMethodType === 'v') {
            return $translate.instant('vat.certificate.number');
         } else {
            return $translate.instant('global.blank');
         }
      };

      self.getCanadianTaxRegLabel = function () {
         if (self.taxMethodType === 'g') {
            return $translate.instant('gst.registration.number');
         } else if (self.taxMethodType === 'v') {
            return $translate.instant('vat.registration.number');
         } else {
            return $translate.instant('global.blank');
         }
      };

      // Need to submit the customer GL (if any) before moving forward
      self.glSubmit = function (updateDNBi) {
         //TODO: verify that there is no custom GL validation needed. if there is, add GL validation function
         if (self.arscGl) {
            DataService.post('api/ar/asarsetup/arcustomerglsave', { data: [self.arscGl], busy: true }, function (data) {
               if (data) {
                  self.submitandnav(updateDNBi);
               }
            });
         } else {
            // Proceed with standard save for the ARSC
            self.submitandnav(updateDNBi);
         }
      };

      self.submitandnav = function (updateDNBi) {
         if (updateDNBi) {
            DataService.update('api/ar/arsc', { data: arsc, busy: true }, function () {
               self.updateDNBiClicked();
               MessageService.info('global.information', 'message.save.operation.completed.successfully');
            });
         } else {
            self.submit();
         }
      };


      self.bindTaxNullValuesToEmpty = function () {
         if (!self.arsc.countycd) {
            self.arsc.countycd = '';
         }
         if (!self.arsc.nontaxtype) {
            self.arsc.nontaxtype = '';
         }
         if (!self.arsc.citycd) {
            self.arsc.citycd = '';
         }
         if (!self.arsc.other1cd) {
            self.arsc.other1cd = '';
         }
         if (!self.arsc.other2cd) {
            self.arsc.other2cd = '';
         }
         if (!self.arsc.taxauth) {
            self.arsc.taxauth = '';
         }
      };

      self.customSubmitContinue = function (updateDNBi) {
         // The OEDC will only exist if it's tab has been activated
         if (self.oedc) {
            // Handle create (POST) and update (PUT)
            var method = self.isOedcRecordNew ? 'POST' : 'PUT';

            // When saving OEDC, only save the ARSC after OEDC save succeeds
            DataService.send('api/oe/oedc', { method: method, data: self.oedc, busy: true }, function (oedc) {

               // Catch created oedc record (which is no longer new) since save of arsc may fail
               self.oedc = oedc;
               self.isOedcRecordNew = false;

               self.glSubmit(updateDNBi);
            });
         } else {
            self.glSubmit(updateDNBi);
         }
      };

      // Perform custom submit which handles the multiple pieces of the save operation
      self.customSubmit = function (updateDNBi) {
         
         if (self.validateForm()) { //TODO: if GL validation required, it might need to be here instead of in glSubmit
            self.bindTaxNullValuesToEmpty();
            //Update customer Ecom information in arss
            if (self.canUpdateShipTo) {
               DataService.post('api/ar/asarsetup/customersaveupateshiptos', { data: self.arsc, busy: true });
               self.canUpdateShipTo = false;
            }

            //Get a current copy of the ARSC so we deal with a possible concurrency issue with
            //Notes.  If we are in the process of creating (or updating) a customer and they use
            //The WebPart to create/delete the Notes, that process will set the arsc.notesfl
            //field for us.  The current one in memory is possibly stale data.  This will get us
            //latest data so we doin't stomp on good data.
            DataService.get('api/ar/arsc/getbyrowid/' + self.arsc.rowID, function (data) {
               if (data) {
                  self.arsc.notesfl = data.notesfl;
               }

               self.customSubmitContinue(updateDNBi);
            });
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

      // Load the GL settings for the ARSC record
      self.loadCustomerGL = function () {
         DataService.post('api/ar/asarsetup/arcustomerglfetch', { data: { custno: arsc.custno }, busy: true }, function (data) {
            if (data) {
               self.arscGl = data;
            }
         });
      };

      // When the full arsc object has been resolved, fetch the corresponding sasgs record
      arsc.$promise.then(function () {

         // Sync up the search field with the selected customer # (to avoid complaints about multiple entities in web parts - SXWEB-28788)
         base.criteria.custno = arsc.custno;

         // Look for GDPR text - Display warning if found
         if (arsc.apmgr === 'GDPR Restricted Data' || arsc.apmgr === 'XXXXXXXXXXXXXXX' ||
            arsc.bankmgr === 'GDPR Restricted Data' || arsc.bankmgr === 'XXXXXXXXXXXXXXX' ||
            arsc.pocontctnm === 'GDPR Restricted Data' || arsc.pocontctnm === 'XXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }

         self.loadCustomerGL();
         MruService.addToList('Customer', arsc.rowpointer, arsc.custno + ' - ' + arsc.name, arsc.custno);
         if (self.taxMethodType === 's') {
            self.statecdSUTRequired = true;
            self.arsc.statecdSUT = self.arsc.statecd;
            self.getSasgs();
            self.initialTaxingStateCd();
            self.initialTaxingCountyCd();
            self.initialTaxingCityCd();
         } else if (self.taxMethodType === 'g') {

            self.statecdSUTRequired = false;
            self.arsc.statecdGST = self.arsc.statecd;
            var sasglfetchcriteria = { state: self.arsc.statecd };
            DataService.post('api/sa/sasgl/getsasgllistallbystate', { data: sasglfetchcriteria, busy: true }, function (data) {
               if (data) {
                  self.taxingAuthorities = data;
               }
               self.getSasgs();
            });

            // Update taxing authority list when taxing state/province changes
            scope.$watch('dtl.arsc.statecdGST', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arsc.statecd = arsc.statecdGST;
                  arsc.taxauth = '';
                  var sasglfetchcriteria = { state: newValue };
                  DataService.post('api/sa/sasgl/getsasgllistallbystate', { data: sasglfetchcriteria, busy: true }, function (data) {
                     if (data) {
                        self.taxingAuthorities = data;
                     }
                     self.refreshCAData = true;
                     self.getSasgs();
                  });
               }
            });
         } else if (self.taxMethodType === 'v') {

            self.statecdSUTRequired = false;
            self.arsc.statecdVAT = self.arsc.statecd;
            self.arsc.taxGroup = parseInt(self.arsc.vattype, 10);
            self.arsc.taxauth = 'gov';
            self.getSasgs();

            // Update taxing authority list when taxing state/province changes
            scope.$watch('dtl.arsc.statecdVAT', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arsc.statecd = arsc.statecdVAT;
               }
            });

            // Update VAT Type when tax group changes
            scope.$watch('dtl.arsc.taxGroup', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arsc.vattype = arsc.taxGroup.toString();
               }
            });

         }

         // The default for a new customer is that back orders are allowed
         // If the back order flag changes and it is now 'no', do not allow line ship complete
         scope.$watch('dtl.arsc.bofl', function (newValue, oldValue) {
            if (newValue !== oldValue && !newValue) {
               self.arsc.lnshipcompfl = false;
            }
         });

         // The upper limit of the back order limit is 98
         scope.$watch('dtl.arsc.bolimit', function (newValue, oldValue) {
            if (newValue !== oldValue && newValue > 98) {
               self.arsc.bolimit = 98;
            }
         });

      });

      self.initialTaxingStateCd = function () {
         if (self.taxMethodType === 's') {
            self.taxingCounties = DataService.getList('api/sa/sasgm/getlistbyquery/3/1?statecd=' + arsc.statecd);
         }
      };

      self.initialTaxingCountyCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: arsc.statecd,
               countycd: arsc.countycd
            };
            self.taxingCities = DataService.getList('api/sa/sasgm/getlistbyquery/4/1', { params: params });
         }
      };

      self.initialTaxingCityCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: arsc.statecd,
               countycd: arsc.countycd,
               citycd: arsc.citycd
            };
            self.taxingOthers = DataService.getList('api/sa/sasgm/getlistbyquery/5/1?', { params: params });
         }
      };

      self.changeConsolInvTy = function () {
         if (!arsc.consolinvty) {
            arsc.consolterms = "";
            arsc.consolformat = "";
            arsc.consolinterval = "";
            arsc.nextconsoldt = "";
            arsc.lastconsoldt = "";
         }
      };

      self.changeTaxingStateCd = function () {
         if (self.taxMethodType === 's') {
            arsc.statecd = arsc.statecdSUT;
            arsc.countycd = '';
            arsc.citycd = '';
            arsc.other1cd = '';
            arsc.other2cd = '';
            self.taxingCounties = DataService.getList('api/sa/sasgm/getlistbyquery/3/1?statecd=' + arsc.statecd);
         }
      };

      self.changeTaxingCountyCd = function () {
         if (self.taxMethodType === 's') {
            arsc.citycd = '';
            arsc.other1cd = '';
            arsc.other2cd = '';
            self.taxingCities = DataService.getList('api/sa/sasgm/getlistbyquery/4/1?statecd=' + arsc.statecd + '&countycd=' + arsc.countycd);
         }
      };

      self.changeTaxingCityCd = function () {
         if (self.taxMethodType === 's') {
            arsc.other1cd = '';
            arsc.other2cd = '';
            self.taxingOthers = DataService.getList('api/sa/sasgm/getlistbyquery/5/1?statecd=' + arsc.statecd + '&countycd=' + arsc.countycd + '&citycd=' + arsc.citycd);
         }
      };

      self.getSasgs = function () {
         var params = {
            state: arsc.statecd,
            fldlist: 'harmonizedfl'
         };

         DataService.get('api/sa/sasgs/getbypk', { params: params }, function (data) {
            if (data) {
               self.sasgs = data;
               //Harmonized in Canada?
               if (self.refreshCAData && self.arsc) {
                  if (data.harmonizedfl) {
                     arsc.taxcert = 'HARMONIZED';
                     arsc.taxablety = 'y';
                     arsc.taxdt = '';
                  } else {
                     if (arsc.taxcert.toUpperCase() === 'HARMONIZED') {
                        arsc.taxcert = '';
                     }
                  }
                  self.refreshCAData = false;
               }
            } else {
               self.refreshCAData = false;
            }
         });
      };

      self.changeSendByAckDisplay = function () {
         var label = MessageService.get('global.acknowledgements');
         if (self.arsc.eacktype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: self.arsc.custno,
               shipto: '',
               sendtocustomer: true, /* For arsc = true, For arss = the sendto value (true = customer, false = ship to) */
               vendno: 0,
               shipfmno: '',
               sendtovendor: false /* For apsv = true, For apss = the sendto value (true = vendor, false = ship from) */
            };
            $state.go('arsc.detail.emailSelect', {
               subTitle: self.getSubTitle(),
               sendType: 'ACKNOWLEDGEMENTS',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      self.changeSendByInvDisplay = function () {
         var label = MessageService.get('global.invoices');
         if (self.arsc.einvtype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: self.arsc.custno,
               shipto: '',
               sendtocustomer: true,
               vendno: 0,
               shipfmno: '',
               sendtovendor: false
            };
            $state.go('arsc.detail.emailSelect', {
               subTitle: self.getSubTitle(),
               sendType: 'INVOICES',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      self.changeSendByStmtDisplay = function () {
         var label = MessageService.get('global.statements');
         if (self.arsc.estmttype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: self.arsc.custno,
               shipto: '',
               sendtocustomer: true,
               vendno: 0,
               shipfmno: 0,
               sendtovendor: false
            };
            $state.go('arsc.detail.emailSelect', {
               subTitle: self.getSubTitle(),
               sendType: 'STATEMENTS',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      self.changeSendByPropDisplay = function () {
         var label = MessageService.get('global.proposals');
         if (self.arsc.eproptype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: self.arsc.custno,
               shipto: '',
               sendtocustomer: true,
               vendno: 0,
               shipfmno: 0,
               sendtovendor: false
            };
            $state.go('arsc.detail.emailSelect', {
               subTitle: self.getSubTitle(),
               sendType: 'PROPOSALS',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      // Average Days to Pay button clicked
      self.averageDaysClicked = function () {
         // Show the Average Days to Pay modal
         ModalService.showModal('ar/arsc/average-days.json', 'ArAverageDaysModalCtrl as mod', scope, function (modal) {
            self.modal = modal;
         });
      };

      // Update DNBi button clicked
      self.updateDNBiClicked = function () {
         var dnbiParams = {
            requesttype: 'matchCompany',
            custno: self.arsc.custno
         };
         DataService.post('api/ar/asarsetup/dnbilaunch', { data: dnbiParams, busy: true }, function (dnbilaunchresponse) {
            if (dnbilaunchresponse) {
               self.arsc = DataService.getResource('api/ar/arsc/getbypk', { params: dnbiParams, busy: true });
            }
         });
      };

      // National Programs flag changed
      self.changeNationalProgramFlag = function () {
         // When turning off NP flag, clear all related fields
         if (!arsc.npclaimacctfl) {
            arsc.npclaimnoprefix = '';
            arsc.npclaimnobegin = 0;
            arsc.npclaimnonext = 0;
            arsc.npclaimnoend = 0;
            arsc.npretclaimnoprefix = '';
            arsc.npretclaimnobegin = 0;
            arsc.npretclaimnonext = 0;
            arsc.npretclaimnoend = 0;
         }
      };

   }; // extendDetailController

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      var arscToCopy = stateParams.object;

      var lookupNameChg = false;
      self.divnoDropDownOptions = [];

      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('ar', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });

      // If the Division # is visible, Load off the Copy From ARSC record.
      // Assume the Customer# list/grid data is already validated for Divi# Security for Selection
      // No need to cross check Customer Div# to the Div# Drop Down List
      if (base.isDivisionRequired) {
         var arscParams = {
            custno: arscToCopy.custno,
            fldlist: 'divno'            
         };
         DataService.get('api/ar/arsc/getbypk', { params: arscParams, busy: true }, function (data) {
            if (data) {
               self.copyCriteria.divno = data.divno;
            }
         });
      }

      // Create arsc copy criteria object
      self.copyCriteria = {
         fromcustno: arscToCopy.custno,
         lookupnmenterablefl: base.isValidateDupLookupNm,
         divnoenterablefl: base.isDivisionRequired
      };
     
      self.openCopyAdditionalModal = function () {
         ModalService.showModal('ar/arsc/two-list.json', 'ArscCopyAdditionalModalCtrl as mod', scope, function (modal) {
            self.modal = modal;
         });
      };

      self.goToEdit = function () {
         // Go to detail.edit
         if (self.editRowID) {
            $state.go('^.detail.edit', { id: self.editRowID });
         } else {
            // Log error to help developers
            console.log('Error: Cannot find "rowid" on the copy call response.');
         }
      };

      self.copyAdditionalRecords = function () {
         var multiSearchData = {};
         if (self.copyAddType) {
            if (self.copyAddType.toLowerCase() === 'arspt') {
               multiSearchData = {
                  custno: self.copyCriteria.fromcustno,
                  shipto: '',
                  multiplierpricetype: true
               };
               DataService.post('api/ar/asarsetup/arsptgetlist', { data: multiSearchData, busy: true }, function (data) {
                  self.listIn = data.arsptgetlistresults;
                  if (self.listIn.length > 0) {
                     self.openCopyAdditionalModal();
                  } else {
                     self.copyAddType = 'arsrt'; //need to check arsrt after
                     self.copyAdditionalRecords();
                  }
               });
            } else if (self.copyAddType.toLowerCase() === 'arsrt') {
               multiSearchData = {
                  custno: self.copyCriteria.fromcustno,
                  shipto: 'BLANK-ARSC-SEARCH'
               };
               DataService.post('api/ar/asarsetup/arsrtfetch', { data: multiSearchData, busy: true }, function (data) {
                  self.listIn = data;
                  if (self.listIn.length > 0) {
                     self.openCopyAdditionalModal();
                  } else {
                     self.copyAddType = null; //no additional record types to check
                     self.copyAdditionalRecords();
                  }
               });
            } else {
               // Log error to help developers
               console.log('Error: Unhandled type for copying additional records.');
            }
         } else {
            self.goToEdit();
         }
      };

      //overwrite basic submit to include copy of price and rebate records
      self.customSubmit = function () {
         var copyCallback = function (data) {
            MessageService.info('global.information', 'message.copy.operation.completed.successfully');
            // Set refresh search flag
            base.refreshSearch = true;

            $stickyState.reset('^.master');

            //Will need to give the option to copy arspt and arsrt records
            self.copyAddType = 'arspt'; //doing arspt fisrt
            //need to save the rowid for when we navigate to the edit state (after copying arspt/arsrt records)
            self.editRowID = null;
            if (data) {
               if (Array.isArray(data)) {
                  self.editRowID = data[0].rowid;
                  self.copyCriteria.tocustno = data[0].tocustno;
               } else {
                  self.editRowID = data.rowid;
                  self.copyCriteria.tocustno = data.tocustno;
               }
            }
            self.copyAdditionalRecords();
         };
                  
         // Load the "created" information
         var date = new Date();
         var time = Utils.pad(date.getHours().toString(), 2, '0') + Utils.pad(date.getMinutes().toString(), 2, '0');
         self.request[0].createdby = UserService.getUserName();
         self.request[0].createddt = Utils.getCurrentDate();
         self.request[0].createdproc = MessageService.get('global.arsc.copy');
         self.request[0].createdtm = time;
         
         var options = {
            method: 'POST',
            data: self.request, // others send criteria as request data
            busy: true
         };
         DataService.send('api/ar/asarsetup/arcustomercopy', options, copyCallback);
      };

      self.changeLookupNm = function (fieldChanged) {
         if (fieldChanged === 'Lkup') {
            lookupNameChg = true;
         } else if (!lookupNameChg) {
            self.copyCriteria.lookupnm = self.copyCriteria.name.substring(0, 15);
         }
      };

      // Push criteria object onto copy request (since this api call uses an array as request criteria)
      request.push(self.copyCriteria);
   };
});

app.controller('ArAverageDaysModalCtrl', function ($scope, DataService, MessageService) { // as mod
   var self = this;
   var dtl = $scope.dtl;
   var calculateParams;
   self.startDate = dtl.arsc.basisbegdt;
   self.endDate = dtl.arsc.basisenddt;
   self.okButtonEnabled = false;

   self.cancel = function () {
      dtl.modal.destroy();
   };

   self.calculate = function () {
      // validate

      if (!self.startDate || !self.endDate) {
         MessageService.alertOk('global.alert', 'message.the.date.fields.are.required');
         return;
      }

      if (self.startDate > self.endDate) {
         MessageService.alertOk('global.alert', 'message.end.date.must.come.after.start.date');
         return;
      }

      calculateParams = {
         custno: dtl.arsc.custno,
         startdt: self.startDate,
         enddt: self.endDate
      };
      DataService.post('api/ar/asarsetup/arscavgdaystopay', { data: calculateParams, busy: true }, function (arscavgdaystopayresults) {
         if (arscavgdaystopayresults) {
            self.okButtonEnabled = true;
            self.newBasisAvgPayDays = arscavgdaystopayresults.newavgpaydays;
            self.newBasisNoPay = arscavgdaystopayresults.newnopays;
            if (!arscavgdaystopayresults.lfoundrec) {
               MessageService.alertOk('global.warning', 'message.no.qualifying.records.found.for.calculation');
            }
         }
      });
   };

   self.submit = function () {

      // validate
      if (calculateParams && (self.newBasisAvgPayDays || self.newBasisAvgPayDays === 0) && (self.newBasisNoPay || self.newBasisNoPay === 0)) {
         dtl.arsc.basisavgpaydays = self.newBasisAvgPayDays;
         dtl.arsc.basisnopay = self.newBasisNoPay;
         dtl.arsc.basisbegdt = calculateParams.startdt;
         dtl.arsc.basisenddt = calculateParams.enddt;
         dtl.modal.destroy();
      } else {
         // need to run the Calculate button at least once to enable OK button
      }
   };
}); // end mod

/**
 * Controller for the Route tab view. We only need to fetch the OEDC record
 * when the user has activated this tab.
 */
app.controller('ArscDetailRouteCtrl', function ($scope, DataService, UserService) {
   var self = this;
   var dtl = $scope.dtl;

   // After making sure the full arsc object has been resolved, fetch the corresponding oedc record
   dtl.arsc.$promise.then(function () {
      var params = {
         key1: dtl.arsc.custno
      };

      DataService.get('api/oe/oedc/getbyquery/C', { params: params, busy: true }, function (oedc) {
         if (oedc) {
            dtl.oedc = oedc;
         } else {
            // If oedc doesn't exist, make a new one
            dtl.oedc = {
               cono: UserService.getCono(),
               key1: dtl.arsc.custno,
               key2: '',
               typecd: 'C'
            };

            // Set flag for submit to check
            dtl.isOedcRecordNew = true;
         }
      });
   });
});

app.controller('ArscCopyAdditionalModalCtrl', function ($scope, $state, $translate, DataService, MessageService, Sasc) { //as mod
   var self = this;
   //var base = $scope.base;
   var copy = $scope.cpy;
   var copyAddType = copy.copyAddType;

   self.listIn = copy.listIn;
   self.listOut = [];

   switch (copyAddType.toLowerCase()) {
      case 'arspt':
         self.title = $translate.instant('global.copy.customer.price.type.records');
         self.listIn.forEach(function (record) {
            record.cono = Sasc.cono;
            record.label = record.sastadescrip;
            record.value = record.pricetype;
         });
         break;
      case 'arsrt':
         self.title = $translate.instant('global.copy.customer.rebate.type.records');
         self.listIn.forEach(function (record) {
            record.label = record.rebatedesc;
            record.value = record.rebatety;
         });
         break;
      default:
         //if it's anything else, it's not set up yet, put a message for the developer and close
         console.log('Copy type not set up:', copyAddType);
         self.exitModal();
         break;
   }

   self.submit = function () {
      
      //create the records that were moved to the listOut
      var options = {
         method: 'POST',
         busy: true
      };
      //NOTE: if additional record types are added later, this model might not work and the call will have to be added dynamically as a string
      self.listOut.forEach(function (item) {
         options.data = item;
         options.data.custno = copy.copyCriteria.tocustno; //doing this here instead of on init to avoid repetition of code
         DataService.send('api/ar/' + copyAddType, options);
      });
      self.exitModal();
   };

   self.cancel = function () {
      self.exitModal();
   };

   self.exitModal = function () {
      if (copyAddType.toLowerCase() === 'arspt') {
         copy.copyAddType = 'arsrt'; //need to check arsrt next
      } else {
         copy.copyAddType = null; //no additional types to check
      }
      copy.modal.destroy();
      copy.copyAdditionalRecords();
   };
}); // end mod