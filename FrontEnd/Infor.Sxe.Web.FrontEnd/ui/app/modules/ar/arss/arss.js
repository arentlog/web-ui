'use strict';

app.config(function ($stateProvider, EmailSelectStateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'ar',
      menuFn: 'arss',
      dataPath: 'api/ar/arss',
      searchMethod: 'POST',
      searchPath: 'api/ar/arss/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'arshiptolookupresults',
      resultsRowIdField: 'rowidArss',
      primaryKeyParams: ['custno', 'shipto'],
      createStateView: 'ar/arss/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ar/arss/copy.json',
      copyMethod: 'POST',
      copyRequest: [],
      copyPath: 'api/ar/asarsetup/arshiptocopy',
      copySubTitle: [
         {label: null, value: 'custno'},
         { label: null, value: 'name' },
         { label: null, value: 'shipto' }
      ],
      detailSubTitle: [
         {label: null, value: 'custno'},
         { label: null, value: 'name' },
         { label: null, value: 'shipto' }
      ],
      recentlyVisited: {
         title: {label: 'global.customer.ship.to', value: 'shipto'},
         description: [{ label: 'global.customer', value: 'custno' },
                       { label: 'global.ship.to', value: 'shipto' }]
      }
   });

   EmailSelectStateProvider.addStates('ar', 'arss', 'arss.detail');
});

app.service('ArssService', function ($state, $translate, ConfigService, DataService, GridService, Sasa, Sasc, Utils, UtilsData, AodataService, MessageService, MruService, SecurityService, UserService) {

   this.extendBaseController = function (self) {

      self.criteria.includeallshiptos = false;
      self.criteria.activeOnly = true;

      self.isInternationalFormat = Sasc.freeformaddr;
      self.zipcdLabel = self.isInternationalFormat ? MessageService.get('global.postal.code') : MessageService.get('global.zip.code');

      // Check for Order Fulfillment
      self.isOrderFulfillmentOn = AodataService.getValue("OE", "OEOrderFulfillment").toLowerCase() === 'yes';

      //Check if Allow Expanded Name/Address      
      self.nameMaxLength = UtilsData.getNameAddressMaxLength();

      var criteria = {
         category: 'Show All',
         ruletype: 'ExcludeARSSFromList',
         rulelevel: 'Show All',
         direction: 'a',
         dochandler: '',
         nodenm: '',
         attrnm: '',
         rulevalue: '',
         recordcountlimit: 0,
         userfield: ''
      };

      // Load the main grid
      DataService.post('api/sa/assasetup/sasbrload/', { data: criteria, busy: true }, function (data) {

         if (data.sasbrresults[0]) {

            if (data.sasbrresults[0].rulevalue.toLowerCase() === 'yes') {
               self.excSXAPILstOn = true;
            } else {
               self.excSXAPILstOn = false;
            }
         } else {
            self.excSXAPILstOn = false;
         }
      });
   };

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordcountlimit: ConfigService.getDefaultRecordLimit(),
         includeallshiptos: false,
         activeOnly: true
      };

      // When a known customer is selected from the lookup, redirect to detail screen since we have the desired customer
      self.activeOnlyChanged = function () {
         self.advCriteria.includeallshiptos = !self.advCriteria.activeOnly;
      };

      // List of available search criteria fields
      if (base.isInternationalFormat) {
         self.criteriaList = [
            { value: 'custno', label: MessageService.get('global.customer.number') },
            { value: 'shipto', label: MessageService.get('global.customer.ship.to') },
            { value: 'activeOnly', label: MessageService.get('global.active.only') },
            { value: 'phoneno', label: MessageService.get('global.phone.number') },
            { value: 'zipcd', label: MessageService.get('global.postal.code') },
            { value: 'contact', label: MessageService.get('global.contacts.name') },
            { value: 'recordcountlimit', label: $translate.instant('global.record.limit') }
         ];
      } else {
         self.criteriaList = [
            { value: 'custno', label: MessageService.get('global.customer.number') },
            { value: 'shipto', label: MessageService.get('global.customer.ship.to') },
            { value: 'activeOnly', label: MessageService.get('global.active.only') },
            { value: 'phoneno', label: MessageService.get('global.phone.number') },
            { value: 'city', label: MessageService.get('global.city') },
            { value: 'state', label: MessageService.get('global.state') },
            { value: 'zipcd', label: MessageService.get('global.zip.code') },
            { value: 'contact', label: MessageService.get('global.contacts.name') },
            { value: 'recordcountlimit', label: $translate.instant('global.record.limit') }
         ];
      }

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['phoneno'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);

         DataService.post('api/ar/arss/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.arshiptolookupresults;
            }
         });
      };

      self.customEdit = function () {

         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         if (self.selectedRecord) {
            var crit = {
               tablename: 'arss',
               custno: self.selectedRecord.custno,
               shipto: self.selectedRecord.shipto
            };
            DataService.post('/web/api/shared/checkrestricteditaccess', { data: crit, busy: true }, function (data) {
               if (data) {
                  if (data.success) {
                     $state.go('arss.detail.edit', { id: self.selectedRecord.rowidArss, object: self.selectedRecord });
                  }
                  else {
                     MessageService.error('global.error', 'global.security.violation.restricted.editing');
                  }
               }
            });
         }
      };
   };

   this.extendSearchController = function (self, base) {

      // When a known customer is selected from the lookup, redirect to detail screen since we have the desired customer
      self.activeOnlyChanged = function () {
         base.criteria.includeallshiptos = !base.criteria.activeOnly;
      };
   };

   this.extendCreateController = function (self, base, arss) {

      //set default true values
      arss.statustype = true;

      // Load the "created" information
      var date = new Date();
      var time = Utils.pad(date.getHours().toString(), 2, '0') + Utils.pad(date.getMinutes().toString(), 2, '0');
      arss.createdby = UserService.getUserName();
      arss.createddt = Utils.pad(date.getMonth() + 1, 2, '0') + '/' + Utils.pad(date.getDate(), 2, '0') + '/' + Utils.pad(date.getFullYear().toString().substr(2), 2, '0');
      arss.createdproc = MessageService.get('global.arss.create');
      arss.createdtm = time;

      //default taxable setting
      arss.taxablety = 'y';

      //default pickable setting
      arss.picklabelsize = 'L';

      self.isDivisionRequired = Sasc.gldivfl;

      self.custNoChanged = function () {
         var arscparams = {
            custno: arss.custno
         };
         DataService.get('api/ar/arsc/getbypk', { params: arscparams, busy: true }, function (arsc) {
            if (arsc) {
               arss.name = arsc.name;
               arss.email = arsc.email;
               arss.taxablety = arsc.taxablety;

               //User Hook (do not rename)
               if (self.custNoChangedContinue) {
                  self.custNoChangedContinue(arsc);
               }
            }
         });
      };
   };

   this.extendDetailController = function (self, base, arss, scope, $stateParams) {

      // Initialize values
      self.taxInterfaceType = AodataService.getValue('TAX', 'taxinterfacety').toLowerCase();
      self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty').toLowerCase();
      self.refreshCAData = false;
      self.isConsolidationTypeRequired = false;
      self.isModibFlag = Sasa.modibfl;
      self.isDirectPOAddonVisible = AodataService.getValue('SO', 'oebilldirpoaddonfl') === 'yes' ? true : false;
      self.fullEmailDataSetForShipTo = [];
      self.fullEmailDataSetForCustomer = [];
      self.calculatedPercentage = 0;
      self.statecdSUTRequired = true;
      self.isDivisionRequired = Sasc.gldivfl;
      self.divnoDropDownOptions = [];
      self.banknoDropDownOptions = [];
      self.firstARSSEditCheck = true;
      self.editButtonVisible = true;

      self.securityLevelARSS = SecurityService.getSecurityLevel('arss');
      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('arss', 'General') < 3;
      self.isOrderingTabReadonly = SecurityService.getSubSecurityLevel('arss', 'Ordering') < 3;
      self.isTaxingTabReadonly = SecurityService.getSubSecurityLevel('arss', 'Taxing') < 3;
      self.isJobTabReadonly = SecurityService.getSubSecurityLevel('arss', 'Job') < 3;
      self.isEdiTabReadonly = SecurityService.getSubSecurityLevel('arss', 'EDI') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('arss', 'Custom') < 3;
      self.isRouteTabReadonly = SecurityService.getSubSecurityLevel('arss', 'Route') < 3;

      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('ar', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });

      if ($stateParams.pk || $stateParams.pk2) {
         base.criteria.custno = $stateParams.pk;
         base.criteria.shipto = $stateParams.pk2;
      }

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
         if (self.arss) {
            if (self.arss.custno) {
               // Only execute this SI call once, for the detail view access for the ARSS record.
               if (self.firstARSSEditCheck) {
                  self.firstARSSEditCheck = false;
                  var crit = {
                     tablename: 'arss',
                     custno: self.arss.custno,
                     shipto: self.arss.shipto
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
            zipcd: self.arss.zipcd,
            statecd: self.arss.statecd,
            countycd: self.arss.countycd,
            citycd: self.arss.citycd,
            other1cd: self.arss.other1cd,
            other2cd: self.arss.other2cd,
            whse: self.arss.whse
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
                  arss.whse = data.ttblsasstdefaults.whse;
                  arss.statecd = data.ttblsasstdefaults.statecd;

                  if (self.taxMethodType === 's') {
                     arss.statecdSUT = data.ttblsasstdefaults.statecd;   //This is what the dropdown is bound to.
                  } else if (self.taxMethodType === 'g') {
                     arss.statecdGST = arss.statecd;
                  } else if (self.taxMethodType === 'v') {
                     arss.statecdVAT = arss.statecd;
                  }

                  //Since the Statecd changed, we need to rebuild the dropdowns with the appropriate values based on the
                  //related parent keys.
                  //Only look for Standard Taxing since that's the only values that can be built in the dropdowns
                  if (self.taxMethodType === 's') {

                     //State changed, get the valid Counties.
                     DataService.getList('api/sa/sasgm/getlistbyquery/3/1?statecd=' + arss.statecd, function (countyData) {
                        if (countyData) {
                           self.taxingCounties = countyData;
                           arss.countycd = data.ttblsasstdefaults.countycd;

                           //County changed, get the valid Cities.
                           var params = {
                              statecd: arss.statecd,
                              countycd: arss.countycd
                           };
                           DataService.getList('api/sa/sasgm/getlistbyquery/4/1', { params: params }, function (cityData) {
                              if (cityData) {
                                 self.taxingCities = cityData;
                                 arss.citycd = data.ttblsasstdefaults.citycd;

                                 //City Changed, now find Other
                                 var params = {
                                    statecd: arss.statecd,
                                    countycd: arss.countycd,
                                    citycd: arss.citycd
                                 };
                                 DataService.getList('api/sa/sasgm/getlistbyquery/5/1?', { params: params }, function (otherData) {
                                    if (otherData) {
                                       self.taxingOthers = otherData;

                                       arss.other1cd = data.ttblsasstdefaults.other1cd;
                                       arss.other2cd = data.ttblsasstdefaults.other2cd;
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

      self.calculatePercentage = function () {
         if (!self.arss || self.arss.salesamt === 0 || self.arss.lienpreamt === 0) {
            self.calculatedPercentage = 0;
         } else {
            DataService.get('api/ar/asarsetup/arshiptocalcestcompletion/' + self.arss.salesamt + '/' + self.arss.lienpreamt + '/', { busy: true }, function (data) {
               if (data) {
                  self.calculatedPercentage = data;
               } else {
                  self.calculatedPercentage = 0;
               }
            });
         }
      };

      self.jobCloseCheck = function () {
         if (self.arss.statustype && self.arss.jobclosedt) {
            // Compare dates by changing them to date objects first
            var todayDate = new Date();
            var jobCloseAsDate = new Date(self.arss.jobclosedt);
            if (jobCloseAsDate < todayDate) {
               MessageService.alertOk('global.warning', 'warning.job.close');
            }
         }
      };

      self.lookupJobResults = function () {
         if (self.jobAndRevision) {
            self.arss.jmjobid = self.jobAndRevision.split('|')[0];
            self.arss.jobrevno = self.jobAndRevision.split('|')[1];
         } else {
            self.arss.jmjobid = '';
            self.arss.jobrevno = 0;
         }
      };

      self.changeInvtoflDisplay = function () {
         self.arss.invtofl = self.arss.invtoflDisplay === 'true' ? true : false;
      };

      self.changeSendToAckDisplay = function () {
         self.arss.eackto = self.arss.eacktoDisplay === 'true' ? true : false;
         self.arss.eacktype = '';
      };

      self.changeSendByAckDisplay = function () {
         var label = MessageService.get('global.acknowledgements');
         if (self.arss.eacktype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: self.arss.custno,
               shipto: self.arss.shipto,
               sendtocustomer: self.arss.eackto,
               vendno: 0,
               shipfmno: '',
               sendtovendor: false
            };
            $state.go('arss.detail.emailSelect', {
               subTitle: self.subTitle,
               sendType: 'ACKNOWLEDGEMENTS',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet,
               callback: function (count) {
                  if (!count) {
                     self.arss.eacktype = '';
                  }
               }
            });
         }
      };

      self.changeSendToInvDisplay = function () {
         self.arss.einvto = self.arss.einvtoDisplay === 'true' ? true : false;
         self.arss.einvtype = '';
      };

      self.changeSendByInvDisplay = function () {
         var label = MessageService.get('global.invoices');
         if (self.arss.einvtype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: self.arss.custno,
               shipto: self.arss.shipto,
               sendtocustomer: self.arss.einvto,
               vendno: 0,
               shipfmno: '',
               sendtovendor: false
            };
            $state.go('arss.detail.emailSelect', {
               subTitle: self.subTitle,
               sendType: 'INVOICES',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet,
               callback: function (count) {
                  if (!count) {
                     self.arss.eacktype = '';
                  }
               }
            });
         }
      };

      self.changeSendToPropDisplay = function () {
         self.arss.epropto = self.arss.eproptoDisplay === 'true' ? true : false;
         self.arss.eproptype = '';
      };

      self.changeSendByPropDisplay = function () {
         var label = MessageService.get('global.proposals');
         if (self.arss.eproptype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: self.arss.custno,
               shipto: self.arss.shipto,
               sendtocustomer: self.arss.epropto,
               vendno: 0,
               shipfmno: 0,
               sendtovendor: false
            };
            $state.go('arss.detail.emailSelect', {
               subTitle: self.subTitle,
               sendType: 'PROPOSALS',
               sendTypeLabel: label,
               criteriaDataSet: criteriaDataSet,
               callback: function (count) {
                  if (!count) {
                     self.arss.eacktype = '';
                  }
               }
            });
         }
      };

      self.getGeoCodeLookupCriteria = function () {
         return {
            tablename: 'arss',
            custno: arss.custno,
            shipto: arss.shipto,
            streetaddr: arss.addr1,
            city: arss.city,
            state: arss.state,
            zipcd: arss.zipcd,
            country: arss.countrycd,
            geocd: arss.geocd,
            outofcityfl: arss.outofcityfl
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

      self.bindTaxNullValuesToEmpty = function () {
         if (!self.arss.countycd) {
            self.arss.countycd = '';
         }
         if (!self.arss.nontaxtype) {
            self.arss.nontaxtype = '';
         }
         if (!self.arss.citycd) {
            self.arss.citycd = '';
         }
         if (!self.arss.other1cd) {
            self.arss.other1cd = '';
         }
         if (!self.arss.other2cd) {
            self.arss.other2cd = '';
         }
         if (!self.arss.taxauth) {
            self.arss.taxauth = '';
         }
      };

      self.customSubmitContinue = function () {
         self.bindTaxNullValuesToEmpty();
         // The OEDC (route) will only exist if it's tab has been activated
         // Note: If the user doesn't intend to create a Route, then allow them to proceed with saving the
         // Customer ship to without stopping them because of Route required fields (route fields are
         // conditionally required based on Route being the current active tab) (SXWEB-31450)
         if (self.oedc && self.oedc.dstarttm && self.oedc.dendtm) {
            // Handle create (POST) and update (PUT)
            var method = self.isOedcRecordNew ? 'POST' : 'PUT';

            // When saving OEDC, only save the ARSS after OEDC save succeeds
            DataService.send('api/oe/oedc', { method: method, data: self.oedc, busy: true }, function (oedc) {

               // Catch created oedc record (which is no longer new) since save of arss may fail
               self.oedc = oedc;
               self.isOedcRecordNew = false;

               // Proceed with email check
               self.submit();
            });
         } else {
            // Proceed with email check
            self.submit();
         }
      };

      // Perform custom submit which handles the multiple pieces of the save operation
      self.customSubmit = function () {

         // Perform UI validation
         var isValid = self.validateForm();

         if (isValid) {
            //Get a current copy of the ARSS so we deal with a possible concurrency issue with
            //Notes.  If we are in the process of creating (or updating) a shipto and they use
            //The WebPart to create/delete the Notes, that process will set the arss.notesfl
            //field for us.  The current one in memory is possibly stale data.  This will get us
            //latest data so we doin't stomp on good data.
            DataService.get('api/ar/arss/getbyrowid/' + self.arss.rowID, function (data) {
               if (data) {
                  self.arss.notesfl = data.notesfl;
               }

               self.customSubmitContinue();
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

      // After making sure the full arss object has been resolved, fetch the corresponding arsc record
      arss.$promise.then(function () {

         // Look for GDPR text - Display warning if found
         if (arss.gennm === 'GDPR Restricted Data' || arss.gennm === 'XXXXXXXXXXXXXXX' ||
             arss.lennm === 'GDPR Restricted Data' || arss.lennm === 'XXXXXXXXXXXXXXX' ||
             arss.ownnm === 'GDPR Restricted Data' || arss.ownnm === 'XXXXXXXXXXXXXXX' ||
             arss.pocontctnm === 'GDPR Restricted Data' || arss.pocontctnm === 'XXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }

         MruService.addToList('ShipTo', arss.rowpointer, arss.shipto + ' - ' + arss.name, arss.shipto, arss.custno);

         self.arss.invtoflDisplay = self.arss.invtofl ? 'true' : 'false';
         self.arss.eacktoDisplay = self.arss.eackto ? 'true' : 'false';
         self.arss.einvtoDisplay = self.arss.einvto ? 'true' : 'false';
         self.arss.eproptoDisplay = self.arss.epropto ? 'true' : 'false';
         self.jobAndRevision = self.arss.jmjobid + '-' + self.arss.jobrevno;

         var params = {
            custno: self.arss.custno
         };

         DataService.get('api/ar/arsc/getbypk/', { params: params, busy: true }, function (data) {
            if (data) {
               self.isConsolidationTypeRequired = (data.consolinvty.toUpperCase() === 'S');

               //User Hook (do not rename)
               if (self.arscContinue) {
                  self.arscContinue(data);
               }
            }
         });

         self.calculatePercentage();

         if (self.taxMethodType === 's') {

            self.arss.statecdSUT = self.arss.statecd;
            self.statecdSUTRequired = true;
            self.getSasgs();
            self.initialTaxingStateCd();
            self.initialTaxingCountyCd();
            self.initialTaxingCityCd();
            // Update taxing county list when taxing state changes
            scope.$watch('dtl.arss.statecdSUT', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arss.statecd = arss.statecdSUT;
                  arss.countycd = '';
                  arss.citycd = '';
                  arss.other1cd = '';
                  arss.other2cd = '';
                  self.taxingCounties = DataService.getList('api/sa/sasgm/getlistbyquery/3/1?statecd=' + newValue);
               }
            });

            // Update taxing city list when taxing county changes
            scope.$watch('dtl.arss.countycd', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arss.citycd = '';
                  arss.other1cd = '';
                  arss.other2cd = '';
                  self.taxingCities = DataService.getList('api/sa/sasgm/getlistbyquery/4/1?statecd=' + arss.statecd + '&countycd=' + newValue);
               }
            });

            // Update taxing other list when taxing city changes
            scope.$watch('dtl.arss.citycd', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arss.other1cd = '';
                  arss.other2cd = '';
                  self.taxingOthers = DataService.getList('api/sa/sasgm/getlistbyquery/5/1?statecd=' + arss.statecd + '&countycd=' + arss.countycd + '&citycd=' + newValue);
               }
            });
         } else if (self.taxMethodType === 'g') {

            self.arss.statecdGST = self.arss.statecd;
            self.statecdSUTRequired = false;

            var sasglfetchcriteria = { state: self.arss.statecd };
            DataService.post('api/sa/sasgl/getsasgllistallbystate', { data: sasglfetchcriteria, busy: true }, function (data) {
               if (data) {
                  self.taxingAuthorities = data;
               }
               self.getSasgs();
            });

            // Update taxing authority list when taxing state/province changes
            scope.$watch('dtl.arss.statecdGST', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arss.statecd = arss.statecdGST;
                  arss.taxauth = '';
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

            self.arss.statecdVAT = arss.statecd;
            self.arss.taxGroup = parseInt(self.arss.vattype, 10);
            self.statecdSUTRequired = false;
            self.arss.taxauth = 'gov';
            self.getSasgs();

            // Update taxing authority list when taxing state/province changes
            scope.$watch('dtl.arss.statecdVAT', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arss.statecd = arss.statecdVAT;
               }
            });

            // Update VAT Type when tax group changes
            scope.$watch('dtl.arss.taxGroup', function (newValue, oldValue) {
               if (newValue !== oldValue) {
                  arss.vattype = arss.taxGroup.toString();
               }
            });

         }

         // The default for a new ship to is that back orders are allowed
         // If the back order flag changes and it is now 'no', do not allow line ship complete
         scope.$watch('dtl.arss.bofl', function (newValue, oldValue) {
            if (newValue !== oldValue && !newValue) {
               self.arss.lnshipcompfl = false;
            }
         });

         // The upper limit of the back order limit is 98
         scope.$watch('dtl.arss.bolimit', function (newValue, oldValue) {
            if (newValue !== oldValue && newValue > 98) {
               self.arss.bolimit = 98;
            }
         });

      });

      self.initialTaxingStateCd = function () {
         if (self.taxMethodType === 's') {
            self.taxingCounties = DataService.getList('api/sa/sasgm/getlistbyquery/3/1?statecd=' + arss.statecd);
         }
      };

      self.initialTaxingCountyCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: arss.statecd,
               countycd: arss.countycd
            };
            self.taxingCities = DataService.getList('api/sa/sasgm/getlistbyquery/4/1', { params: params });
         }
      };

      self.initialTaxingCityCd = function () {
         if (self.taxMethodType === 's') {
            var params = {
               statecd: arss.statecd,
               countycd: arss.countycd,
               citycd: arss.citycd
            };
            self.taxingOthers = DataService.getList('api/sa/sasgm/getlistbyquery/5/1?', { params: params });
         }
      };

      self.changeConsolInvTy = function () {
         if (!arss.consolinvty) {
            arss.consolterms = "";
            arss.consolformat = "";
            arss.consolinterval = "";
            arss.nextconsoldt = "";
            arss.lastconsoldt = "";
         }
      };

      self.getSasgs = function () {
         var params = {
            state: arss.statecd,
            fldlist: 'harmonizedfl'
         };

         DataService.get('api/sa/sasgs/getbypk', { params: params }, function (data) {
            if (data) {
               self.sasgs = data;
               //Harmonized in Canada?
               if (self.refreshCAData && self.arss) {
                  if (data.harmonizedfl) {
                     arss.taxcert = 'HARMONIZED';
                     arss.taxablety = 'y';
                     arss.taxdt = '';
                  } else {
                     if (arss.taxcert.toUpperCase() === 'HARMONIZED') {
                        arss.taxcert = '';
                     }
                  }
                  self.refreshCAData = false;
               }
            } else {
               self.refreshCAData = false;
            }
         });
      };

   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      var arssToCopy = stateParams.object;

      // Load the "created" information
      var date = new Date();
      var time = Utils.pad(date.getHours().toString(), 2, '0') + Utils.pad(date.getMinutes().toString(), 2, '0');
      arssToCopy.createdby = UserService.getUserName();
      arssToCopy.createddt = Utils.pad(date.getMonth() + 1, 2, '0') + '/' + Utils.pad(date.getDate(), 2, '0') + '/' + Utils.pad(date.getFullYear().toString().substr(2), 2, '0');
      arssToCopy.createdproc = MessageService.get('global.arss.copy');
      arssToCopy.createdtm = time;

      // Create arss copy criteria object
      self.copyCriteria = {
         fromcustno: arssToCopy.custno,
         fromshipto: arssToCopy.shipto,
         tocustno: arssToCopy.custno,
         name: arssToCopy.name,
         toshipto: arssToCopy.shipto,
         createdby: arssToCopy.createdby,
         createddt: arssToCopy.createddt,
         createdproc: arssToCopy.createdproc,
         createdtm: arssToCopy.createdtm
      };

      // Push criteria object onto copy request (since this api call uses an array as request criteria)
      request.push(self.copyCriteria);
   };

});

/**
 * Controller for the Route tab view. We only need to fetch the OEDC record
 * when the user has activated this tab.
 */
app.controller('ArssDetailRouteCtrl', function ($scope, DataService, UserService) {
   var dtl = $scope.dtl;

   // After making sure the full arss object has been resolved, fetch the corresponding oedc record
   dtl.arss.$promise.then(function () {
      var params = {
         key1: dtl.arss.custno,
         key2: dtl.arss.shipto
      };

      DataService.get('api/oe/oedc/getbyquery/S', { params: params, busy: true }, function (oedc) {
         if (oedc) {
            dtl.oedc = oedc;
         } else {
            // If oedc doesn't exist, make a new one
            dtl.oedc = {
               cono: UserService.getCono(),
               key1: dtl.arss.custno,
               key2: dtl.arss.shipto,
               typecd: 'S'
            };

            // Set flag for submit to check
            dtl.isOedcRecordNew = true;
         }
      });
   });
});
