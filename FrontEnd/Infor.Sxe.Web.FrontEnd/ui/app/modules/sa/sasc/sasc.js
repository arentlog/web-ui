'use strict';

app.config(function (StateProvider) {
   StateProvider.addSetupStates({
      module: 'sa',
      menuFn: 'sasc',
      dataPath: 'api/sa/sasc',
      searchMethod: 'POST',
      searchPath: 'api/sa/sasc/getcompanylookup',
      searchResultsField: '',
      resultsRowIdField: 'rowID',
      primaryKeyParams: ['cono'],
      recordName: 'sasc',
      passGridRecord: true,
      createStateView: 'sa/sasc/create.json',
      postCreateState: '^.detail.edit',
      copyStateView: 'sa/sasc/copy.json',
      detailSubTitle: [
         {label: null, value: 'cono' },
         {label: null, value: 'conm' }
      ],
      copySubTitle: [
         {label: null, value: 'cono' },
         {label: null, value: 'conm' }
      ],
      recentlyVisited: {
         title: {label: 'global.company.number', value: 'cono' },
         description: {label: 'global.name', value: 'conm' }
      }
   });
});

app.service('SascService', function ($state, $translate, $filter, DataService, GridService, MessageService, AodataService, UserService, SecurityService) {

   this.getRecord = function (self, base, stateParams) {

      var company = {};
      var resourcePath = '';
      var params = {};

      /* rowid comes from drilling down to detail, recently visited or creating a new record */
      if (stateParams.id) {
         // user selected a different company or same company from the MRU while creating a new company so disable update
         if (base.newCompanyBeingCreated() && base.copyInProcess === false) {
            base.newcono = 0;
         }
         resourcePath = 'api/sa/sasc/getbyrowid/' + stateParams.id;
      } else if (stateParams.pk) {
         params.cono = stateParams.pk;
         resourcePath = 'api/sa/sasc/getbypkwithcono';
      } else if (base.sacompany.sascRowID) {
         resourcePath = 'api/sa/sasc/getbyrowid/' + base.sacompany.sascRowID;
      }

      // clear key values
      base.initKeyValues();

      // find sasc for recently visited functionality
      company = DataService.getResource(resourcePath, { params: params, busy: true });
      if (!company) { return null; }

      company.$promise.then(function () {
         if (company.$resolved === true) {

            base.cono = company.cono;
            base.conm = company.conm;
            base.name = company.name;

            // Data used for the detail screens
            DataService.getResource('api/sa/assasetup/sascretrieve/' + company.cono.toString(), { method: 'GET', busy: true }, function (data) {
               data.$promise.then(function () {
                  base.sacompany = data.sacompany;
                  base.sacompany.name = base.name;
               });
            });

         } // company.$resolved
      }); // company.$promise.then

      // Return for recently visited functionality
      return company;

   }; // getRecord

   this.extendBaseController = function (self) {

      self.isNewCompany = function () {
         return (self.newcono > 0 && (self.cono === self.newcono));
      };

      self.isLoginCompany = function () {
         return (self.cono === self.logincono);
      };

      // called from Search to temporarily disable Search access while a new company is in process of being entered
      self.newCompanyBeingCreated = function () {
         return self.newcono > 0;
      };

      self.canModifyCompany = function () {
         var canModify = false;
         if (self.isMaster()) {
            // only one row in the main grid can be selected and the selected company must be the login company or we are in the process of creating a new company
            var selectedRow = GridService.getSelectedRecord(self.grid);
            canModify = (selectedRow) ? ((selectedRow.cono === UserService.getCono()) || (self.newcono > 0)) : false;
         }
         return (canModify);
      }; // canModifyCompany

      // use to disable fields that should only be setup in the login company when doing a Copy/New
      self.isLoginCompanyOnly = function () {
         return (self.isDetail() || self.isNewCompany() || !self.isLoginCompany()) ? true : false;
      };

      self.initKeyValues = function () {
         self.cono = 0;
         self.conm = '';
         self.sacompany = [];
         self.copyInProcess = false;
      }; // initKeyValues

      self.initKeyValues();
      self.logincono = UserService.getCono();

      // keep track of a newly created company either view Create or Copy
      self.newcono = 0;

   }; // extendBaseController

   this.extendDetailController = function (self, base, sasc) {

      self.isRequiredTabReadonly = SecurityService.getSubSecurityLevel('sasc', 'Required') < 3;
      self.isTaxesTabReadonly = SecurityService.getSubSecurityLevel('sasc', 'Taxes') < 3;
      self.isFaxingTabReadonly = SecurityService.getSubSecurityLevel('sasc', 'Faxing') < 3;
      self.isCustomTabReadonly = SecurityService.getSubSecurityLevel('sasc', 'Custom') < 3;

      self.canModifyCompany = function () {
         return (base.isNewCompany() || base.isLoginCompany()) ? true : false;
      };

      self.getGeoCodeLookupCriteria = function () {
         return {
            tablename: 'sasc',
            sasccono: sasc.cono,
            streetaddr: sasc.addr1,
            city: sasc.city,
            state: sasc.state,
            zipcd: sasc.zipcd,
            country: sasc.country,
            geocd: sasc.geocd,
            outofcityfl: sasc.outofcityfl
         };
      };

      // called when the user changes the Tax Method on the Tax tab
      self.taxMethodChanged = function () {

         DataService.getResource('api/sa/assasetup/sascchangetaxdisplay', { data: base.sacompany, method: 'POST', busy: true }, function (data) {
            data.$promise.then(function () {
               if (!MessageService.processMessaging(data.messaging) && !MessageService.processMessaging(data)) {
                  base.sacompany = data.sacompany;
                  base.sacompany.name = base.name;
               }
            });
         });
      };

      // called when the user changes the Tax Interface on the Tax tab
      self.taxInterfaceChanged = function () {

         DataService.getResource('api/sa/assasetup/sascchangetaxdisplay', { data: base.sacompany, method: 'POST', busy: true }, function (data) {
            data.$promise.then(function () {
               if (!MessageService.processMessaging(data.messaging) && !MessageService.processMessaging(data)) {
                  base.sacompany = data.sacompany;
                  base.sacompany.name = base.name;
               }
            });
         });
      };

      // called when the user wants to test the HMRC API URL
      self.testHmrcUrl = function () {
         var crit = {
            hmrcurl: base.sacompany.vATHmrcUrl
         };

         DataService.post('/web/api/sa/SascTestHMRCApiUrl', { data: crit, busy: true }, function (data) {
            if (!MessageService.processMessaging(data.ttblmessaging)) {

               MessageService.info('global.information', 'message.ping.successful');

            }
         });
      };

      self.customCancel = function () {
         // once user cancels out of a newly created company they need to log in to that company to edit it
         base.newcono = 0;
         self.cancel();
      };

      self.customReturnToMasterState = function () {
         // once user returns to the main grid out of a newly created company they need to log in to that company to edit it
         base.newcono = 0;
         $state.go('sasc.master');
      };

   }; // extendDetailController

   this.extendCreateController = function (self) {

      // Perform any custom UI validation
      self.validateForm = function () {
         var isValid = true;
         // add specific validation here
         return isValid;
      }; // validateForm

      self.customSubmit = function () {
         // Perform UI validation
         var isValid = self.validateForm();
         if (isValid) {
            self.submit();
         }
      }; // customSubmit

   }; // extendCreateController

   this.createRecord = function (self, base, sasc, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      DataService.getResource('api/sa/assasetup/sasccreate/' + self.companycopy.newcono.toString() + '/' + self.companycopy.newconm + '/0', { method: 'GET', busy: true }, function (data) {
         data.$promise.then(function () {
            if (noHardErrors(data)) {
               base.cono = self.companycopy.newcono;
               base.conm = self.companycopy.newconm;
               base.name = self.companycopy.newname;

               base.newcono = self.companycopy.newcono;

               base.sacompany = data.sacompany;

               // assign the other required fields from the New screen - this is to prevent the user from cancelling out of the Detail screen during a Create without entering all required fields for SASC
               base.sacompany.currencyty = self.companycopy.newcurrencyty;
               base.sacompany.name = self.companycopy.newname;
               base.sacompany.oifaxdev1 = self.companycopy.newoifaxdev1;
               base.sacompany.oifaxdev2 = self.companycopy.newoifaxdev2;
               base.sacompany.oifaxdev3 = self.companycopy.newoifaxdev3;
               base.sacompany.oifaxdev4 = self.companycopy.newoifaxdev4;
               base.sacompany.oifaxdev5 = self.companycopy.newoifaxdev5;
               base.sacompany.oifaxdev6 = self.companycopy.newoifaxdev6;

               // update the new record with the required fields
               DataService.post('api/sa/assasetup/sascupdate', { data: base.sacompany, busy: true }, function (data) {
                  if (noHardErrors(data)) {
                     callback(base.sacompany);
                  }
               });
            }
         });

      });

   }; // createRecord

   this.updateRecord = function (self, base, sasc, scope, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      DataService.post('api/sa/assasetup/sascupdate', { data: base.sacompany, busy: true }, function (data) {
         if (noHardErrors(data)) {
            // once saved after a creating a new company it can only be edited by logging in to that company
            base.newcono = 0;
            callback();
         }
      });

   }; // updateRecord

   this.extendCopyController = function (self, base, request, scope, stateParams) {
      var sascToCopy = stateParams.object;

      self.companycopy = {
         newcono: sascToCopy.cono,
         newconm: sascToCopy.conm
      };

      // Initialize copy request object
      request.fromcono = sascToCopy.cono;

   }; // extendCopyController

   this.submitCopyRequest = function (self, base, request, scope, stateParams, callback) {

      function noHardErrors(datacheck) {
         return (!MessageService.processMessaging(datacheck.messaging) && !MessageService.processMessaging(datacheck));
      }

      DataService.getResource('api/sa/assasetup/sasccreate/' + self.companycopy.newcono.toString() + '/' + self.companycopy.newconm + '/' + request.fromcono.toString(), { method: 'GET', busy: true }, function (data) {

         data.$promise.then(function () {
            if (noHardErrors(data)) {
               base.copyInProcess = true;

               base.cono = self.companycopy.newcono;
               base.conm = self.companycopy.newconm;
               base.name = self.companycopy.newname;

               // allow update to new company
               base.newcono = self.companycopy.newcono;

               base.sacompany = data.sacompany;

               // If the user is creating a new company and entered the required 1099 name use it
               base.sacompany.name = base.name;

               callback(data.companycopy);
            }
         });

      });

   }; // submitCopyRequest

});  // SascService