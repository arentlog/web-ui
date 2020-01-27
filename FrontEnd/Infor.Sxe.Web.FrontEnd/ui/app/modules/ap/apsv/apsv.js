'use strict';

app.config(function ($stateProvider, EmailSelectStateProvider, StateProvider) {
   StateProvider.addSetupStates({
      module: 'ap',
      menuFn: 'apsv',
      dataPath: 'api/ap/apsv',
      searchMethod: 'POST',
      searchPath: 'api/ap/apsv/lookup',
      searchRecordLimitField: 'recordcountlimit',
      searchResultsField: 'apvendorlookupresults',
      resultsRowIdField: 'rowidApsv',
      primaryKeyParams: ['vendno'],
      createStateView: 'ap/apsv/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'ap/apsv/copy.json',
      copyMethod: 'POST',
      copyRequest: [],
      copyPath: 'api/ap/asapsetup/apvendorcopy',
      copySubTitle: [
         { label: null, value: 'vendno' },
         { label: null, value: 'name' }
      ],
      detailSubTitle: [
         { label: null, value: 'vendno' },
         { label: null, value: 'name' }
      ],
      recentlyVisited: {
         title: { label: 'global.vendor.number', value: 'vendno' },
         description: { label: null, value: 'name' }
      }
   });
   EmailSelectStateProvider.addStates('ap', 'apsv', 'apsv.detail');
});

app.service('ApsvService', function ($state, $translate, DataService, GridService, Sasa, Sasc, Utils, AodataService, MessageService, MruService, Sasoo, ConfigService, CenPosService, UtilsData, SecurityService) {
   this.extendSearchController = function (self) {
      // When a known vendor is selected from the lookup, redirect to detail screen since we have the desired vendor
      self.vendorSelected = function (args) {
         if (args.value) {
            $state.go('apsv.detail', { pk: args.value });
         }
      };
   };

   this.extendCreateController = function (self, base, apsv, scope) {
      apsv.bofl = true;
      apsv.subfl = true;
      apsv.resalefl = true;
      apsv.freightexpectedty = "Y";
      apsv.centbuyfl = true;
      apsv.synccrmfl = true;
      apsv.supaccesscommty = "Http";
      apsv.supaccessprodidty = "UP";
      apsv.paymethod = "S";
      apsv.gststatus = true;
      apsv.nopocopies = 1;
      apsv.statustype = true;
      apsv.allowpofl = true;
      apsv.taxgroupno = 1;
      apsv.enterdt = Utils.getCurrentDate();
      self.taxInterfaceType = AodataService.getValue('TAX', 'taxinterfacety').toLowerCase();
      self.taxMethodType = AodataService.getValue('TAX', 'taxmethodty');
      self.banknoDropDownOptions = [];

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });

      scope.$watch('dtl.apsv.name', function (newValue, oldValue) {
         if (newValue !== oldValue && newValue) {
            apsv.lookupnm = newValue.substring(0, 15);
         }
      });
   };

   this.extendMasterController = function (self, base) {

      // Advanced search criteria object with initial values
      self.advCriteria = {
         recordcountlimit: ConfigService.getDefaultRecordLimit(),
         includeinactive: false,
         keywords: ''
      };

      self.criteriaList = [
         { value: 'vendno', label: $translate.instant('global.vendor.number') },
         { value: 'lookupnm', label: $translate.instant('global.lookup.name') },
         { value: 'name', label: $translate.instant('global.name') },
         { value: 'phoneno', label: $translate.instant('global.phone.number') },
         { value: 'city', label: $translate.instant('global.city') },
         { value: 'state', label: $translate.instant('global.state') },
         { value: 'zipcd', label: $translate.instant('global.zip') },
         { value: 'vendtype', label: $translate.instant('global.vendor.type') },
         { value: 'includeinactive', label: $translate.instant('global.include.inactive') },
         { value: 'firstnm', label: $translate.instant('global.first.name') },
         { value: 'lastnm', label: $translate.instant('global.last.name') },
         { value: 'keywords', label: $translate.instant('global.keyword') },
         { value: 'recordcountlimit', label: $translate.instant('global.record.limit') }
      ];

      // List of default selected criteria fields
      self.defaultSelectedCriteria = ['vendno'];

      // Advanced search and update data set for the grid
      self.search = function () {
         var criteria = angular.copy(self.advCriteria);
         DataService.post('api/ap/apsv/lookup', { data: criteria, busy: true }, function (data) {
            if (data) {
               base.dataset = data.apvendorlookupresults;
            }
         });
      };

      self.customEdit = function () {

         self.selectedRecord = GridService.getSelectedRecord(base.grid);
         if (self.selectedRecord) {
            var crit = {
               tablename: 'apsv',
               vendno: self.selectedRecord.vendno
            };
            DataService.post('/web/api/shared/checkrestricteditaccess', { data: crit, busy: true }, function (data) {
               if (data) {
                  if (data.success) {
                     $state.go('apsv.detail.edit', { id: self.selectedRecord.rowidApsv, object: self.selectedRecord });
                  }
                  else {
                     MessageService.error('global.error', 'global.security.violation.restricted.editing');
                  }
               }
            });
         }
      };
   };


   this.extendDetailController = function (self, base, apsv) {
      self.sasoo = Sasoo;

      // Check if ISM is live
      self.isIsmLive = AodataService.getValue("SM", "ismlive");

      // Check if AP Inbound Invoice Processing (810) is live
      self.isIonEdi810InLive = AodataService.getValue("ION", "ionedi810inlive");

      // Check if PO Inbound Purchase Order Acknowledgement Processing (855) is live
      self.isIonEdi855InLive = AodataService.getValue("ION", "ionedi855inlive");

      self.taxInterfaceType = AodataService.getValue('TAX', 'taxinterfacety').toLowerCase();
      self.taxMethodType = AodataService.getValue("TAX", "taxmethodty");

      self.canTaxingCAFieldsVisible = false;
      self.canTaxingVAFieldsVisible = false;
      self.canTaxingUSFieldsVisible = false;
      self.divnoDropDownOptions = [];
      self.banknoDropDownOptions = [];
      self.firstAPSVEditCheck = true;
      self.editButtonVisible = true;

      self.securityLevelAPSV = SecurityService.getSecurityLevel('apsv');
      self.isGeneralTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'General') < 3;
      self.isOrderingTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'Ordering') < 3;
      self.isGLTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'GL') < 3;
      self.isTaxingTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'Taxing') < 3;
      self.isEcommerceTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'Ecommerce') < 3;
      self.isReconcileTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'Reconcile') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'Custom') < 3;
      self.isRouteTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'Route') < 3;
      self.isSupplierTabReadonly = SecurityService.getSubSecurityLevel('apsv', 'Supplier Access') < 3;

      // The Bank # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getBankNoDropDown(function (dropDownList) {
         self.banknoDropDownOptions = dropDownList;
      });

      // The Division # drop down will be rebuilt each time (not cached) due to div# security.
      UtilsData.getDivNoDropDown('ap', function (dropDownList) {
         self.divnoDropDownOptions = dropDownList;
      });

      if (self.taxMethodType === 'g') {
         self.canTaxingCAFieldsVisible = true;
         self.canTaxingVAFieldsVisible = false;
         self.canTaxingUSFieldsVisible = false;
      }
      else if (self.taxMethodType === 's') {
         self.canTaxingCAFieldsVisible = false;
         self.canTaxingVAFieldsVisible = false;
         self.canTaxingUSFieldsVisible = true;
      }
      else if (self.taxMethodType === 'v') {
         self.canTaxingCAFieldsVisible = false;
         self.canTaxingVAFieldsVisible = true;
         self.canTaxingUSFieldsVisible = false;
      }

      self.editButtonVisibility = function () {
         if (self.apsv) {
            if (self.apsv.vendno) {
               // Only execute this SI call once, for the detail view access for the APSV record.
               if (self.firstAPSVEditCheck) {
                  self.firstAPSVEditCheck = false;
                  var crit = {
                     tablename: 'apsv',
                     vendno: self.apsv.vendno
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

      self.getCanadianTaxRegLabel = function () {
         if (self.taxMethodType === 'g') {
            return $translate.instant('global.reg.number');
         } else if (self.taxMethodType === 'v') {
            return $translate.instant('vat.registration.number');
         }
         else if (self.taxMethodType === 's') {
            return $translate.instant('global.id.number');
         }
         else {
            return $translate.instant('global.blank');
         }
      };

      self.getEDIDropdowns = function () {
         DataService.get('api/ap/asapsetup/apvendoredidropdowns', { busy: true }, function (data) {
            if (data) {
               self.ediDropdowns = data;

               var netRebateBasedFrom = data[0].netrebatebasedfrom;
               var netRebateDownto = data[0].netrebatedownto;
               var pctRebateBasedon = data[0].pctrebatebasedon;

               netRebateBasedFrom = netRebateBasedFrom.replace('<empty>', '');
               netRebateDownto = netRebateDownto.replace('<empty>', '');
               pctRebateBasedon = pctRebateBasedon.replace('<empty>', '');

               self.getnetRebateBasedFrom(netRebateBasedFrom);
               self.getnetRebateDownto(netRebateDownto);
               self.getpctRebateBasedon(pctRebateBasedon);
            }
         });
      };

      self.getEDIDropdowns();

      // RebateBasedFrom object prepare
      self.getnetRebateBasedFrom = function (rebateBasedFrom) {
         self.rebateBasedFromList = [];
         var rebateBasedFromData = rebateBasedFrom.split(',');
         for (var i = 0; i < rebateBasedFromData.length; i++) {
            var obj = rebateBasedFromData[i].split('=');
            self.rebateBasedFromList.push({
               key: obj[1],
               value: obj[0]
            });
         }
      };

      // RebateDownto object prepare
      self.getnetRebateDownto = function (netRebateDownto) {
         self.netRebateDowntoList = [];
         var netRebateDowntoData = netRebateDownto.split(',');
         for (var i = 0; i < netRebateDowntoData.length; i++) {
            var obj = netRebateDowntoData[i].split('=');
            self.netRebateDowntoList.push({
               key: obj[1],
               value: obj[0]
            });
         }
      };

      // RebateBasedon object prepare
      self.getpctRebateBasedon = function (pctRebateBasedon) {
         self.pctRebateBasedonList = [];
         var pctRebateBasedonData = pctRebateBasedon.split(',');
         for (var i = 0; i < pctRebateBasedonData.length; i++) {
            var obj = pctRebateBasedonData[i].split('=');
            self.pctRebateBasedonList.push({
               key: obj[1],
               value: obj[0]
            });
         }
      };

      // When the full APSV object has been resolved, fetch the corresponding oedc and sasgs records
      apsv.$promise.then(function () {
         //  self.oedc = DataService.getResource('api/oe/oedc/getbyquery/V?key1=' + apsv.vendno);

         // Look for GDPR text - Display warning if found
         if (apsv.expednm === 'GDPR Restricted Data' || apsv.expednm === 'XXXXXXXXXXXXXXXXXXXX' ||
            apsv.slsnm === 'GDPR Restricted Data' || apsv.slsnm === 'XXXXXXXXXXXXXXXXXXXX') {
            MessageService.alert('global.warning', 'message.warning.gdpr.restrictions');
         }

         MruService.addToList('Vendor', apsv.rowpointer, apsv.vendno + ' - ' + apsv.name, apsv.vendno);
         var apvendorGLfetchCriteria = { vendno: apsv.vendno };
         DataService.post('api/ap/asapsetup/apvendorglfetch', { data: apvendorGLfetchCriteria, busy: true }, function (data) {
            if (data) {
               self.apvendorGL = data;
            }
         });
      });

      self.vendorSaveUpateShipFroms = function () {
         if (self.apsv) {
            DataService.post('api/ap/asapsetup/vendorsaveupateshipfroms', { data: self.apsv, busy: true }, function () { });
            MessageService.info('global.information', 'message.save.operation.completed.successfully');
         }
      };

      self.ediPurchaseOrdersSendByDocument = function () {
         if (self.apsv.epotype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: 0,
               shipto: '',
               sendtocustomer: false,
               vendno: self.apsv.vendno,
               shipfmno: 0,
               sendtovendor: true
            };

            $state.go('apsv.detail.emailSelect', {
               subTitle: self.subTitle, // need to verify subtitle display
               sendType: 'PURCHASE ORDERS',
               sendTypeLabel: 'Purchase Orders',
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      self.ediQuotesSendByDocument = function () {
         if (self.apsv.equotetype.toUpperCase() === 'M') {
            var criteriaDataSet = {
               custno: 0,
               shipto: '',
               sendtocustomer: false,
               vendno: self.apsv.vendno,
               shipfmno: 0,
               sendtovendor: true
            };

            //Need to verify subtitle display
            $state.go('apsv.detail.emailSelect', {
               subTitle: self.subTitle,
               sendType: 'QUOTES',
               sendTypeLabel: 'Quotes',
               criteriaDataSet: criteriaDataSet
            });
         }
      };

      self.saveOEDCTab = function () {
         var method = self.isOedcRecordNew ? 'POST' : 'PUT';
         DataService.send('api/oe/oedc', { method: method, data: self.oedc, busy: true }, function (oedc) {
            self.oedc = oedc;
            self.isOedcRecordNew = false;

         });
      };

      self.getGeoCodeLookupCriteria = function () {
         return {
            tablename: 'apsv',
            vendno: apsv.vendno,
            streetaddr: apsv.addr1,
            city: apsv.city,
            state: apsv.state,
            zipcd: apsv.zipcd,
            country: apsv.countrycd,
            geocd: apsv.geocd,
            outofcityfl: apsv.outofcityfl
         };
      };

      self.loadApsvGLDataFromDB = function (tempApsv) {
         apsv.gldivno1 = tempApsv.gldivno1;
         apsv.gldivno2 = tempApsv.gldivno2;
         apsv.gldivno3 = tempApsv.gldivno3;
         apsv.gldivno4 = tempApsv.gldivno4;
         apsv.gldivno5 = tempApsv.gldivno5;
         apsv.gldivno6 = tempApsv.gldivno6;
         apsv.gldeptno1 = tempApsv.gldeptno1;
         apsv.gldeptno2 = tempApsv.gldeptno2;
         apsv.gldeptno3 = tempApsv.gldeptno3;
         apsv.gldeptno4 = tempApsv.gldeptno4;
         apsv.gldeptno5 = tempApsv.gldeptno5;
         apsv.gldeptno6 = tempApsv.gldeptno6;
         apsv.glacctno1 = tempApsv.glacctno1;
         apsv.glacctno2 = tempApsv.glacctno2;
         apsv.glacctno3 = tempApsv.glacctno3;
         apsv.glacctno4 = tempApsv.glacctno4;
         apsv.glacctno5 = tempApsv.glacctno5;
         apsv.glacctno6 = tempApsv.glacctno6;
         apsv.glsubno1 = tempApsv.glsubno1;
         apsv.glsubno2 = tempApsv.glsubno2;
         apsv.glsubno3 = tempApsv.glsubno3;
         apsv.glsubno4 = tempApsv.glsubno4;
         apsv.glsubno5 = tempApsv.glsubno5;
         apsv.glsubno6 = tempApsv.glsubno6;
      };


      self.saveAPVendor = function () {
         if (self.apvendorGL) {
            var apVendorGLsave = [];
            apVendorGLsave.push(self.apvendorGL);
            DataService.post('api/ap/asapsetup/apvendorglsave', { data: apVendorGLsave, busy: true }, function () {
               var params = {
                  vendno: apsv.vendno,
                  fillmode: true
               };
               DataService.get('api/ap/apsv/getbypk', { params: params, busy: true }, function (tempApsv) {
                  if (tempApsv) {
                     self.loadApsvGLDataFromDB(tempApsv);

                     //Need this so we don't lose an update that might happen on the Notes WebPart.
                     //This makes sure we have the latest value for the Notes Flag.
                     apsv.notesfl = tempApsv.notesfl;
                     // Save the OEDC Route if it exists and required fields are populated
                     // Note: If the user doesn't intend to create a Route, then allow them to proceed with saving the
                     //       vendor without stopping them because of Route required fields (route fields are
                     //       conditionally required based on Route being the current active tab) (SXWEB-25371)
                     if (self.oedc && self.oedc.dstarttm && self.oedc.dendtm) {
                        self.saveOEDCTab();
                     } else {
                        self.submit();
                     }
                  }
               });
            });
         } else if (self.oedc && self.oedc.dstarttm && self.oedc.dendtm) {
            self.saveOEDCTab();
         } else {
            self.submit();
         }
      };

      self.changeStatus = function () {
         if (!self.apsv.statustype) {
            var requestCriteria = {
               ttblapsvvalidatestatuscriteria: {
                  vendno: self.apsv.vendno,
                  statustype: self.apsv.statustype
               }
            };

            //WebHandler call
            DataService.post('/web/api/ap/APSVValidateStatusType', { data: requestCriteria, busy: true }, function (data) {
               if (data) {
                  if (data.ttblapsvvalidatestatusresult && data.ttblapsvvalidatestatusresult.length > 0) {
                     var isvalid = data.ttblapsvvalidatestatusresult[0].isvalid;
                     if (!isvalid) {
                        MessageService.error('global.error', 'message.active.balances.or.transactions.exist');
                        self.apsv.statustype = true;
                     }
                  }
               }
            });
         }
      };

      self.customSubmit = function () {

         // Perform UI validation
         var isValid = self.validateForm();
         if (isValid) {
            self.saveAPVendor();
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
   };

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      var apsvToCopy = stateParams.object;

      // Create apsv copy criteria object
      self.copyCriteria = {
         fromvendno: apsvToCopy.vendno,
         tovendno: apsvToCopy.vendno,
         name: apsvToCopy.name
      };

      // Push criteria object onto copy request (since this api call uses an array as request criteria)
      request.push(self.copyCriteria);
   };
});

app.controller('ApsvDetailRouteCtrl', function ($scope, DataService, UserService) {
   var dtl = $scope.dtl;

   // After making sure the full apsv object has been resolved, fetch the corresponding oedc record
   dtl.apsv.$promise.then(function () {
      var params = {
         key1: dtl.apsv.vendno
      };

      DataService.get('api/oe/oedc/getbyquery/V', { params: params, busy: true }, function (oedc) {
         if (oedc) {
            dtl.oedc = oedc;
         } else {
            // If oedc doesn't exist, make a new one
            dtl.oedc = {
               cono: UserService.getCono(),
               key1: dtl.apsv.vendno,
               key2: '',
               typecd: 'V'
            };

            // Set flag for submit to check
            dtl.isOedcRecordNew = true;
         }
      });
   });
});

app.controller('ApsvDetailECommerceCtrl', function ($scope, $translate, AodataService, CenPosService, DataService, MessageService) {
   var self = this;
   var dtl = $scope.dtl;
   self.isallowAPCreditACHOn = AodataService.getValue('AP', 'AllowAPCreditACH').toLowerCase() === 'yes';

   if (dtl.apsv.vendbanksortcode && dtl.apsv.epmttype.toLowerCase() === 'a') {
      self.vendorHasToken = true;
   } else {
      self.vendorHasToken = false;
   }

   self.paymentOptions = [];
   if (!self.multitenantfl) {
      self.paymentOptions.push({ 'label': MessageService.get('global.edi'), 'value': 'e' });
   }

   if (self.isallowAPCreditACHOn) {
      self.paymentOptions.push({ 'label': MessageService.get('global.credit.ach'), 'value': 'a' });
      self.paymentOptions.push({ 'label': MessageService.get('global.ion'), 'value': 'i' });
   }
   self.accountTypes = [
      { 'label': MessageService.get('global.current.account'), 'value': 'C' },
      { 'label': MessageService.get('global.deposit.account'), 'value': 'D' }
   ];

   self.getAccountTypes = function () {
      self.accountTypes = [
         { 'label': MessageService.get('global.current.account'), 'value': 'C' },
         { 'label': MessageService.get('global.deposit.account'), 'value': 'D' }
      ];

      if (self.isallowAPCreditACHOn && dtl.apsv.epmttype.toLowerCase() === 'a') {
         self.accountTypes = [
            { 'label': MessageService.get('global.personal'), 'value': 'p' },
            { 'label': MessageService.get('global.corporate'), 'value': 'r' }
         ];
      }
   };

   self.getSortCodeLabel = function () {
      if (dtl.apsv.epmttype.toLowerCase() === 'a') {
         return $translate.instant('global.token.id');
      } else {
         return $translate.instant('global.bank.sort.code');
      }
   };
   self.getAccountTypes();

   self.addCardCallBack = function () {
      //save vendor token add token to the vendor
      var pvVendno = dtl.apsv.vendno;

      DataService.get('api/ap/asapsetup/apsvaddtoken/' + pvVendno, { busy: true }, function (data) {
         if (data) {
            dtl.apsv.vendbanksortcode = data.token;
            dtl.apsv.vendbankacct = data.acctno;
            MessageService.alert('global.alert', 'global.vendor.token.added.successfully');
            dtl.customSubmit();
         }
      });
   };

   // Token
   self.addCard = function () {
      if (!self.completePaymentTypeList) {
         DataService.post('api/sa/sastn/getsastnlist', { data: { codeiden: 'p', fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,descrip,ccaddon,processor' }, busy: true }, function (data) {
            if (data) {
               self.completePaymentTypeList = data;
               self.addCardProcessor();
            }
         });
      } else {
         self.addCardProcessor();
      }
   };

   self.addCardProcessor = function (iLoop) {
      if (!iLoop) {
         iLoop = 0;
      }
      // find the first payment type with a processor with a web url 
      var currentPaymentType = self.completePaymentTypeList[iLoop];
      if (currentPaymentType.processor && currentPaymentType.processor !== "0" && currentPaymentType.chkauth) {
         DataService.getResource('api/sa/assasetup/sastpretrieve/' + currentPaymentType.processor, { method: 'GET', busy: true }, function (data) {
            if (data.callingURLH5) {
               self.addCardPopup(currentPaymentType.codeval);
            } else {
               iLoop++;
               self.addCardProcessor(iLoop);
            }
         });
      } else {
         iLoop++;
         self.addCardProcessor(iLoop);
      }
   };

   self.addCardPopup = function (SigMediaCd) {
      CenPosService.showModal({
         type: 'add',
         mediacd: SigMediaCd,
         shipto: 'OnVendorRecord',
         custno: dtl.apsv.vendno,
         invoiceno: '0-0',
         tokenid: '',
         successCallback: self.addCardCallBack
      });
   };
   // Token
   self.deleteCard = function () {
      if (!self.completePaymentTypeList) {
         DataService.post('api/sa/sastn/getsastnlist', { data: { codeiden: 'p', fldlist: 'codeval,codeiden,addtaxfl,chkauth,addonmin,descrip,ccaddon,processor' }, busy: true }, function (data) {
            if (data) {
               self.completePaymentTypeList = data;
               self.deleteCardProcessor();
            }
         });
      } else {
         self.deleteCardProcessor();
      }
   };

   self.deleteCardProcessor = function (iLoop) {
      if (!iLoop) {
         iLoop = 0;
      }
      // find the first payment type with a processor with a web url 
      var currentPaymentType = self.completePaymentTypeList[iLoop];
      if (currentPaymentType.processor && currentPaymentType.processor !== "0" && currentPaymentType.chkauth) {
         DataService.getResource('api/sa/assasetup/sastpretrieve/' + currentPaymentType.processor, { method: 'GET', busy: true }, function (data) {
            if (data.callingURLH5) {
               self.deleteTokenPopup(currentPaymentType.codeval);
            } else {
               iLoop++;
               self.deleteCardProcessor(iLoop);
            }
         });
      } else {
         iLoop++;
         self.deleteCardProcessor(iLoop);
      }
   };
   self.deleteTokenPopup = function (SigMediaCd) {

      CenPosService.showModal({
         type: 'delete',
         mediacd: SigMediaCd,
         shipto: 'OnVendorRecord',
         custno: dtl.apsv.vendno,
         invoiceno: '0-0',
         tokenid: dtl.apsv.vendbanksortcode,
         successCallback: self.deleteAPSVCallBack
      });
   };
   self.deleteAPSVCallBack = function () {
      var pvVendno = dtl.apsv.vendno;
      DataService.get('api/ap/asapsetup/apsvdeletetoken/' + pvVendno, { busy: true }, function (data) {
         if (data) {
            if (data.deletefl) {
               dtl.apsv.vendbanksortcode = '';
               dtl.apsv.vendbankacct = '';
               MessageService.alert('global.alert', 'global.vendor.token.deleted.successfully');
               dtl.customSubmit();
            }
         }
      });

   };
});
